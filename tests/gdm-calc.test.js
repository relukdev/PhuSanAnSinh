import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    calcFmfPrevGDM,
    calcFmfGDMRisk,
    stratifyFmfRisk,
    calcPersonalGDMOutcomes,
    stratifyOutcomesRisk,
    calcIowaGDMRisk,
    stratifyIowaRisk,
    validateFmfInputs,
    validateOutcomesInputs,
    validateIowaInputs,
    mgdlToMmol,
    mmolToMgdl,
    calcBMI,
} from '../src/utils/gdm-calc.js';

// ─── calcFmfPrevGDM ─────────────────────────────────────────

describe('calcFmfPrevGDM — previous GDM weight-based risk', () => {
    it('returns a probability between 0 and 1', () => {
        const r = calcFmfPrevGDM(69);
        assert.ok(r > 0 && r < 1, `risk=${r}`);
    });

    it('baseline weight 69kg → exp(-4.005)', () => {
        const r = calcFmfPrevGDM(69);
        const expected = 1 / (1 + Math.exp(4.005));
        assert.ok(Math.abs(r - expected) < 0.001);
    });

    it('higher weight → higher risk', () => {
        const r69 = calcFmfPrevGDM(69);
        const r100 = calcFmfPrevGDM(100);
        assert.ok(r100 > r69, 'heavier → more risk');
    });

    it('lower weight → lower risk', () => {
        const r50 = calcFmfPrevGDM(50);
        const r69 = calcFmfPrevGDM(69);
        assert.ok(r50 < r69);
    });
});

// ─── calcFmfGDMRisk ─────────────────────────────────────────

describe('calcFmfGDMRisk — FMF Syngelaki 2014 model', () => {
    const baseInput = {
        age: 30, weight: 65, height: 160, ethnicity: 'caucasian',
        conception: 'natural', familyDM: 'none', obsHistory: 'nulliparous',
    };

    it('returns logOdds, risk, contributions', () => {
        const r = calcFmfGDMRisk(baseInput);
        assert.ok(typeof r.logOdds === 'number');
        assert.ok(r.risk > 0 && r.risk < 1);
        assert.ok(typeof r.contributions === 'object');
    });

    it('higher age → higher risk', () => {
        const r30 = calcFmfGDMRisk({ ...baseInput, age: 30 });
        const r40 = calcFmfGDMRisk({ ...baseInput, age: 40 });
        assert.ok(r40.risk > r30.risk);
    });

    it('higher weight → higher risk', () => {
        const r60 = calcFmfGDMRisk({ ...baseInput, weight: 60 });
        const r90 = calcFmfGDMRisk({ ...baseInput, weight: 90 });
        assert.ok(r90.risk > r60.risk);
    });

    it('east_asian ethnicity → higher risk', () => {
        const rCauc = calcFmfGDMRisk({ ...baseInput, ethnicity: 'caucasian' });
        const rEA = calcFmfGDMRisk({ ...baseInput, ethnicity: 'east_asian' });
        assert.ok(rEA.risk > rCauc.risk);
    });

    it('family DM degree1 → higher risk than none', () => {
        const rNone = calcFmfGDMRisk({ ...baseInput, familyDM: 'none' });
        const rDeg1 = calcFmfGDMRisk({ ...baseInput, familyDM: 'degree1' });
        assert.ok(rDeg1.risk > rNone.risk);
    });

    it('parous_no_gdm reduces risk', () => {
        const rNulli = calcFmfGDMRisk({ ...baseInput, obsHistory: 'nulliparous' });
        const rParous = calcFmfGDMRisk({ ...baseInput, obsHistory: 'parous_no_gdm' });
        assert.ok(rParous.risk < rNulli.risk);
    });

    it('ovulation_drugs conception → higher risk', () => {
        const rNat = calcFmfGDMRisk({ ...baseInput, conception: 'natural' });
        const rOvul = calcFmfGDMRisk({ ...baseInput, conception: 'ovulation_drugs' });
        assert.ok(rOvul.risk > rNat.risk);
    });
});

// ─── stratifyFmfRisk ────────────────────────────────────────

describe('stratifyFmfRisk — risk stratification', () => {
    it('<5% → LOW', () => assert.equal(stratifyFmfRisk(3).level, 'LOW'));
    it('5-15% → MODERATE', () => assert.equal(stratifyFmfRisk(10).level, 'MODERATE'));
    it('15-30% → HIGH', () => assert.equal(stratifyFmfRisk(20).level, 'HIGH'));
    it('>=30% → VERY_HIGH', () => assert.equal(stratifyFmfRisk(35).level, 'VERY_HIGH'));
    it('returns label, color, action', () => {
        const r = stratifyFmfRisk(10);
        assert.ok(r.label.length > 0);
        assert.ok(r.color.length > 0);
        assert.ok(r.action.length > 0);
    });
});

// ─── calcPersonalGDMOutcomes ────────────────────────────────

describe('calcPersonalGDMOutcomes — Monash 2022', () => {
    const baseInput = {
        bmi: 28, age: 32, fastingGlucose: 5.1, glucose1h: 10.5,
        gaAtDiagnosis: 26, ethnicity: 'east_asian', nulliparous: true,
        prevLGA: false, prevPreeclampsia: false, familyDM: false, weightGainPerWeek: 0.4,
    };

    it('returns Y, risk, contributions', () => {
        const r = calcPersonalGDMOutcomes(baseInput);
        assert.ok(typeof r.Y === 'number');
        assert.ok(r.risk > 0 && r.risk < 1);
        assert.ok(typeof r.contributions === 'object');
    });

    it('higher fasting glucose → higher risk', () => {
        const rLow = calcPersonalGDMOutcomes({ ...baseInput, fastingGlucose: 4.5 });
        const rHigh = calcPersonalGDMOutcomes({ ...baseInput, fastingGlucose: 6.5 });
        assert.ok(rHigh.risk > rLow.risk);
    });

    it('prevPreeclampsia → much higher risk (0.93)', () => {
        const rNo = calcPersonalGDMOutcomes({ ...baseInput, prevPreeclampsia: false });
        const rYes = calcPersonalGDMOutcomes({ ...baseInput, prevPreeclampsia: true });
        assert.ok(rYes.risk > rNo.risk);
    });

    it('prevLGA → higher risk', () => {
        const rNo = calcPersonalGDMOutcomes({ ...baseInput, prevLGA: false });
        const rYes = calcPersonalGDMOutcomes({ ...baseInput, prevLGA: true });
        assert.ok(rYes.risk > rNo.risk);
    });

    it('nulliparous → slightly higher risk', () => {
        const rMulti = calcPersonalGDMOutcomes({ ...baseInput, nulliparous: false });
        const rNulli = calcPersonalGDMOutcomes({ ...baseInput, nulliparous: true });
        assert.ok(rNulli.risk > rMulti.risk);
    });
});

// ─── stratifyOutcomesRisk ───────────────────────────────────

describe('stratifyOutcomesRisk', () => {
    it('<15% → LOW', () => assert.equal(stratifyOutcomesRisk(10).level, 'LOW'));
    it('15-30% → MODERATE', () => assert.equal(stratifyOutcomesRisk(20).level, 'MODERATE'));
    it('30-50% → HIGH', () => assert.equal(stratifyOutcomesRisk(40).level, 'HIGH'));
    it('>=50% → VERY_HIGH', () => assert.equal(stratifyOutcomesRisk(55).level, 'VERY_HIGH'));
});

// ─── calcIowaGDMRisk ────────────────────────────────────────

describe('calcIowaGDMRisk — Iowa nulliparous model', () => {
    const baseInput = {
        ethnicity: 'white', age: 28, bmi: 24,
        familyDM: false, preexistingHTN: false,
    };

    it('returns t, risk, contributions', () => {
        const r = calcIowaGDMRisk(baseInput);
        assert.ok(typeof r.t === 'number');
        assert.ok(r.risk > 0 && r.risk < 1);
        assert.ok(typeof r.contributions === 'object');
    });

    it('asian ethnicity → higher risk (coeff 1.064)', () => {
        const rWhite = calcIowaGDMRisk({ ...baseInput, ethnicity: 'white' });
        const rAsian = calcIowaGDMRisk({ ...baseInput, ethnicity: 'asian' });
        assert.ok(rAsian.risk > rWhite.risk);
    });

    it('higher BMI → higher risk', () => {
        const rLo = calcIowaGDMRisk({ ...baseInput, bmi: 22 });
        const rHi = calcIowaGDMRisk({ ...baseInput, bmi: 35 });
        assert.ok(rHi.risk > rLo.risk);
    });

    it('older age → higher risk', () => {
        const r25 = calcIowaGDMRisk({ ...baseInput, age: 25 });
        const r38 = calcIowaGDMRisk({ ...baseInput, age: 38 });
        assert.ok(r38.risk > r25.risk);
    });

    it('family DM → higher risk', () => {
        const rNo = calcIowaGDMRisk({ ...baseInput, familyDM: false });
        const rYes = calcIowaGDMRisk({ ...baseInput, familyDM: true });
        assert.ok(rYes.risk > rNo.risk);
    });

    it('preexisting HTN → higher risk', () => {
        const rNo = calcIowaGDMRisk({ ...baseInput, preexistingHTN: false });
        const rYes = calcIowaGDMRisk({ ...baseInput, preexistingHTN: true });
        assert.ok(rYes.risk > rNo.risk);
    });
});

// ─── stratifyIowaRisk ───────────────────────────────────────

describe('stratifyIowaRisk', () => {
    it('<6% → LOW', () => assert.equal(stratifyIowaRisk(4).level, 'LOW'));
    it('6-10% → MODERATE', () => assert.equal(stratifyIowaRisk(8).level, 'MODERATE'));
    it('10-20% → HIGH', () => assert.equal(stratifyIowaRisk(15).level, 'HIGH'));
    it('>=20% → VERY_HIGH', () => assert.equal(stratifyIowaRisk(25).level, 'VERY_HIGH'));
});

// ─── Validation ─────────────────────────────────────────────

describe('validateFmfInputs', () => {
    it('valid input passes', () => {
        assert.ok(validateFmfInputs({ age: 30, weight: 65, height: 160 }).valid);
    });
    it('age too low fails', () => {
        assert.ok(!validateFmfInputs({ age: 10, weight: 65, height: 160 }).valid);
    });
    it('age too high fails', () => {
        assert.ok(!validateFmfInputs({ age: 65, weight: 65, height: 160 }).valid);
    });
    it('weight out of range fails', () => {
        assert.ok(!validateFmfInputs({ age: 30, weight: 250, height: 160 }).valid);
    });
    it('height out of range fails', () => {
        assert.ok(!validateFmfInputs({ age: 30, weight: 65, height: 100 }).valid);
    });
});

describe('validateOutcomesInputs', () => {
    const validInput = {
        age: 30, bmi: 28, fastingGlucose: 5.1, glucose1h: 10.5,
        gaAtDiagnosis: 26, weightGainPerWeek: 0.4,
    };
    it('valid input passes', () => {
        assert.ok(validateOutcomesInputs(validInput).valid);
    });
    it('missing fasting glucose fails', () => {
        assert.ok(!validateOutcomesInputs({ ...validInput, fastingGlucose: null }).valid);
    });
    it('GA too low fails', () => {
        assert.ok(!validateOutcomesInputs({ ...validInput, gaAtDiagnosis: 5 }).valid);
    });
    it('negative weight gain fails', () => {
        assert.ok(!validateOutcomesInputs({ ...validInput, weightGainPerWeek: -1 }).valid);
    });
});

describe('validateIowaInputs', () => {
    it('valid input passes', () => {
        assert.ok(validateIowaInputs({ age: 28, bmi: 24 }).valid);
    });
    it('BMI out of range fails', () => {
        assert.ok(!validateIowaInputs({ age: 28, bmi: 5 }).valid);
    });
});

// ─── Utility Functions ──────────────────────────────────────

describe('mgdlToMmol / mmolToMgdl', () => {
    it('mg/dL → mmol/L conversion', () => {
        const mmol = mgdlToMmol(90);
        assert.ok(mmol > 4.9 && mmol < 5.1, `mmol=${mmol}`);
    });
    it('mmol/L → mg/dL conversion', () => {
        const mgdl = mmolToMgdl(5.0);
        assert.ok(mgdl > 88 && mgdl < 92, `mgdl=${mgdl}`);
    });
    it('round-trip: mg/dL → mmol → mg/dL', () => {
        const original = 100;
        const roundTrip = mmolToMgdl(mgdlToMmol(original));
        assert.ok(Math.abs(roundTrip - original) < 0.1);
    });
});

describe('calcBMI', () => {
    it('normal BMI calculation', () => {
        const bmi = calcBMI(70, 175);
        assert.ok(bmi > 22 && bmi < 24, `bmi=${bmi}`);
    });
    it('obese BMI', () => {
        const bmi = calcBMI(100, 170);
        assert.ok(bmi > 34);
    });
    it('underweight BMI', () => {
        const bmi = calcBMI(45, 170);
        assert.ok(bmi < 16);
    });
});
