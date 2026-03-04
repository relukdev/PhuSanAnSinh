import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
    calcIG21,
    calcMcaPsv,
    calcFmfDoppler,
    calcUtaPi,
    classifyDoppler,
    getManagement,
    validateDopplerInputs,
    analyzeDoppler,
} from '../src/utils/fetal-doppler-calc.js';

// ─── calcIG21 — INTERGROWTH-21st z-scores ────────────────────

describe('calcIG21 — INTERGROWTH-21st LMS z-scores', () => {
    it('returns z-score, centile, median, mom for UA-PI at 30w', () => {
        const r = calcIG21(1.0, 'PI', 30);
        assert.ok(r, 'should return result');
        assert.ok(typeof r.z === 'number');
        assert.ok(typeof r.centile === 'number');
        assert.ok(r.centile >= 0 && r.centile <= 100);
        assert.ok(typeof r.median === 'number');
        assert.ok(typeof r.mom === 'number');
    });

    it('returns null for unknown index', () => {
        assert.equal(calcIG21(1.0, 'INVALID', 30), null);
    });

    it('PI median at 30w is around 1.0', () => {
        const r = calcIG21(1.0, 'PI', 30);
        assert.ok(r.median > 0.8 && r.median < 1.3, `median=${r.median}`);
    });

    it('observed == median → z near 0, centile near 50', () => {
        const r = calcIG21(1.0, 'PI', 30);
        const atMedian = calcIG21(r.median, 'PI', 30);
        assert.ok(Math.abs(atMedian.z) < 0.5, `z=${atMedian.z}`);
        assert.ok(atMedian.centile > 30 && atMedian.centile < 70, `centile=${atMedian.centile}`);
    });

    it('high observed → high z-score', () => {
        const r = calcIG21(2.0, 'PI', 30);
        assert.ok(r.z > 1, `z=${r.z}`);
        assert.ok(r.centile > 80);
    });

    it('low observed → low z-score', () => {
        const r = calcIG21(0.5, 'PI', 30);
        assert.ok(r.z < -1, `z=${r.z}`);
        assert.ok(r.centile < 20);
    });

    it('works for RI index', () => {
        const r = calcIG21(0.7, 'RI', 30);
        assert.ok(r, 'should return result');
        assert.ok(typeof r.z === 'number');
    });

    it('works for SD index', () => {
        const r = calcIG21(3.0, 'SD', 30);
        assert.ok(r, 'should return result');
        assert.ok(typeof r.z === 'number');
    });
});

// ─── calcMcaPsv — MCA-PSV anemia classification ────────────

describe('calcMcaPsv — Mari formula for fetal anemia', () => {
    it('returns median, mom, thresholds, anemiaClass', () => {
        const r = calcMcaPsv(40, 30);
        assert.ok(typeof r.median === 'number');
        assert.ok(typeof r.mom === 'number');
        assert.ok(typeof r.threshold_1_29 === 'number');
        assert.ok(typeof r.threshold_1_50 === 'number');
        assert.ok(typeof r.anemiaClass === 'string');
    });

    it('normal PSV → NORMAL', () => {
        const r = calcMcaPsv(30, 30);
        assert.equal(r.anemiaClass, 'NORMAL');
        assert.ok(r.mom < 1.29);
    });

    it('high PSV (MoM >= 1.5) → SEVERE_MODERATE', () => {
        const r = calcMcaPsv(30, 30);
        const severeThreshold = r.threshold_1_50;
        const rSevere = calcMcaPsv(severeThreshold + 5, 30);
        assert.equal(rSevere.anemiaClass, 'SEVERE_MODERATE');
    });

    it('moderate PSV (MoM 1.29-1.5) → MILD', () => {
        const r = calcMcaPsv(30, 30);
        const mildValue = (r.threshold_1_29 + r.threshold_1_50) / 2;
        const rMild = calcMcaPsv(mildValue, 30);
        assert.equal(rMild.anemiaClass, 'MILD');
    });

    it('median increases with GA', () => {
        const r24 = calcMcaPsv(40, 24);
        const r36 = calcMcaPsv(40, 36);
        assert.ok(r36.median > r24.median, 'median should increase with GA');
    });
});

// ─── calcFmfDoppler — FMF Ciobanu 2019 ─────────────────────

describe('calcFmfDoppler — FMF UA-PI, MCA-PI, CPR', () => {
    it('returns all expected fields', () => {
        const r = calcFmfDoppler(1.0, 1.8, 30);
        assert.ok('uaPi_measured' in r);
        assert.ok('uaPi_50th' in r);
        assert.ok('uaPi_95th' in r);
        assert.ok('uaPi_status' in r);
        assert.ok('mcaPi_measured' in r);
        assert.ok('mcaPi_5th' in r);
        assert.ok('mcaPi_status' in r);
        assert.ok('cpr' in r);
        assert.ok('cpr_status' in r);
    });

    it('normal UA-PI at 30w → NORMAL', () => {
        const r = calcFmfDoppler(1.0, 1.8, 30);
        assert.equal(r.uaPi_status, 'NORMAL');
    });

    it('high UA-PI > 95th → ABNORMAL', () => {
        const r = calcFmfDoppler(1.5, 1.8, 30);
        assert.equal(r.uaPi_status, 'ABNORMAL');
    });

    it('low MCA-PI < 5th → ABNORMAL', () => {
        const r = calcFmfDoppler(1.0, 0.5, 30);
        assert.equal(r.mcaPi_status, 'ABNORMAL');
    });

    it('CPR = MCA-PI / UA-PI', () => {
        const r = calcFmfDoppler(1.0, 2.0, 30);
        assert.equal(r.cpr, 2.0);
    });

    it('interpolates between table GA weeks', () => {
        const r = calcFmfDoppler(1.0, 1.5, 26);
        assert.ok(r.uaPi_50th > 0);
        assert.ok(r.mcaPi_50th > 0);
    });

    it('clamps to table bounds for GA < 20', () => {
        const r = calcFmfDoppler(1.0, 1.5, 18);
        assert.ok(r.uaPi_50th > 0);
    });
});

// ─── calcUtaPi — Uterine Artery PI ─────────────────────────

describe('calcUtaPi — Gómez 2008', () => {
    it('returns expected fields', () => {
        const r = calcUtaPi(1.0, 1.2, 24, 'none');
        assert.ok('piMean' in r);
        assert.ok('refMean' in r);
        assert.ok('ref95th' in r);
        assert.ok('mom' in r);
        assert.ok('status' in r);
        assert.ok('notching' in r);
        assert.ok('highRisk' in r);
    });

    it('piMean is average of left and right', () => {
        const r = calcUtaPi(1.0, 1.4, 24, 'none');
        assert.equal(r.piMean, 1.2);
    });

    it('normal UtA-PI at 24w → NORMAL', () => {
        const r = calcUtaPi(0.9, 1.0, 24, 'none');
        assert.equal(r.status, 'NORMAL');
        assert.equal(r.highRisk, false);
    });

    it('high UtA-PI > p95 → ABNORMAL', () => {
        const r = calcUtaPi(1.5, 1.5, 24, 'none');
        assert.equal(r.status, 'ABNORMAL');
    });

    it('abnormal + bilateral notching → highRisk true', () => {
        const r = calcUtaPi(1.5, 1.5, 24, 'bilateral');
        assert.equal(r.highRisk, true);
    });

    it('abnormal + none/unilateral notching → highRisk false', () => {
        const r = calcUtaPi(1.5, 1.5, 24, 'none');
        assert.equal(r.highRisk, false);
    });
});

// ─── classifyDoppler — Overall severity ─────────────────────

describe('classifyDoppler — overall severity classification', () => {
    it('all normal → NORMAL, no alerts', () => {
        const r = classifyDoppler({
            uaIG21: null, mcaPsv: null, fmf: null, uta: null,
            endDiastolic: 'present', gaWeeks: 30, clinicalScenario: 'routine'
        });
        assert.equal(r.severity, 'NORMAL');
        assert.equal(r.alerts.length, 0);
        assert.equal(r.fgrStage, null);
    });

    it('REDF → CRITICAL', () => {
        const r = classifyDoppler({
            uaIG21: null, mcaPsv: null, fmf: null, uta: null,
            endDiastolic: 'REDF', gaWeeks: 30, clinicalScenario: 'routine'
        });
        assert.equal(r.severity, 'CRITICAL');
        assert.ok(r.alerts.some(a => a.includes('REDF')));
    });

    it('AEDF → SEVERE', () => {
        const r = classifyDoppler({
            uaIG21: null, mcaPsv: null, fmf: null, uta: null,
            endDiastolic: 'AEDF', gaWeeks: 30, clinicalScenario: 'routine'
        });
        assert.equal(r.severity, 'SEVERE');
    });

    it('UA-PI > 95th → ABNORMAL with alert', () => {
        const r = classifyDoppler({
            uaIG21: { centile: 97, z: 2.1, median: 1.0, mom: 1.3 },
            mcaPsv: null, fmf: null, uta: null,
            endDiastolic: 'present', gaWeeks: 30, clinicalScenario: 'routine'
        });
        assert.equal(r.severity, 'ABNORMAL');
        assert.ok(r.alerts.some(a => a.includes('UA-PI')));
    });

    it('MCA-PSV severe anemia → SEVERE', () => {
        const r = classifyDoppler({
            uaIG21: null,
            mcaPsv: { anemiaClass: 'SEVERE_MODERATE', mom: 1.6 },
            fmf: null, uta: null,
            endDiastolic: 'present', gaWeeks: 30, clinicalScenario: 'routine'
        });
        assert.equal(r.severity, 'SEVERE');
    });

    it('FGR staging: REDF at <32w → EARLY_ONSET_STAGE_III', () => {
        const r = classifyDoppler({
            uaIG21: null, mcaPsv: null, fmf: null, uta: null,
            endDiastolic: 'REDF', gaWeeks: 28, clinicalScenario: 'fgr'
        });
        assert.equal(r.fgrStage, 'EARLY_ONSET_STAGE_III');
    });

    it('FGR staging: AEDF at >=32w → LATE_ONSET_STAGE_II', () => {
        const r = classifyDoppler({
            uaIG21: null, mcaPsv: null, fmf: null, uta: null,
            endDiastolic: 'AEDF', gaWeeks: 34, clinicalScenario: 'fgr'
        });
        assert.equal(r.fgrStage, 'LATE_ONSET_STAGE_II');
    });

    it('FGR staging: UA-PI >95th at <32w → EARLY_ONSET_STAGE_I', () => {
        const r = classifyDoppler({
            uaIG21: { centile: 97 }, mcaPsv: null, fmf: null, uta: null,
            endDiastolic: 'present', gaWeeks: 28, clinicalScenario: 'fgr'
        });
        assert.equal(r.fgrStage, 'EARLY_ONSET_STAGE_I');
    });

    it('no fgrStage when clinicalScenario is routine', () => {
        const r = classifyDoppler({
            uaIG21: null, mcaPsv: null, fmf: null, uta: null,
            endDiastolic: 'REDF', gaWeeks: 28, clinicalScenario: 'routine'
        });
        assert.equal(r.fgrStage, null);
    });
});

// ─── getManagement ──────────────────────────────────────────

describe('getManagement — management items', () => {
    it('CRITICAL → includes immediate action', () => {
        const items = getManagement('CRITICAL', null, 30);
        assert.ok(items.some(i => i.includes('NGAY')));
        assert.ok(items.length >= 4);
    });

    it('CRITICAL at <34w → includes corticosteroid', () => {
        const items = getManagement('CRITICAL', null, 30);
        assert.ok(items.some(i => i.toLowerCase().includes('corticosteroid')));
    });

    it('SEVERE → includes Doppler hàng ngày', () => {
        const items = getManagement('SEVERE', null, 30);
        assert.ok(items.some(i => i.includes('hàng ngày')));
    });

    it('ABNORMAL → includes theo dõi 1-2/tuần', () => {
        const items = getManagement('ABNORMAL', null, 30);
        assert.ok(items.some(i => i.includes('1-2 lần/tuần')));
    });

    it('NORMAL → routine follow-up', () => {
        const items = getManagement('NORMAL', null, 30);
        assert.ok(items.some(i => i.includes('thường quy')));
    });
});

// ─── validateDopplerInputs ──────────────────────────────────

describe('validateDopplerInputs', () => {
    it('valid with UA-PI only', () => {
        assert.ok(validateDopplerInputs({ gaWeeks: 30, uaPi: 1.0 }).valid);
    });

    it('valid with MCA-PSV only', () => {
        assert.ok(validateDopplerInputs({ gaWeeks: 30, mcaPsv: 40 }).valid);
    });

    it('valid with UtA-PI only', () => {
        assert.ok(validateDopplerInputs({ gaWeeks: 30, utaPiLeft: 1.0, utaPiRight: 1.1 }).valid);
    });

    it('invalid: no GA', () => {
        const r = validateDopplerInputs({ uaPi: 1.0 });
        assert.ok(!r.valid);
    });

    it('invalid: GA < 18', () => {
        const r = validateDopplerInputs({ gaWeeks: 15, uaPi: 1.0 });
        assert.ok(!r.valid);
    });

    it('invalid: GA > 42', () => {
        const r = validateDopplerInputs({ gaWeeks: 45, uaPi: 1.0 });
        assert.ok(!r.valid);
    });

    it('invalid: no Doppler values', () => {
        const r = validateDopplerInputs({ gaWeeks: 30 });
        assert.ok(!r.valid);
    });
});

// ─── analyzeDoppler — full pipeline ─────────────────────────

describe('analyzeDoppler — full pipeline', () => {
    it('minimal input: UA-PI only', () => {
        const r = analyzeDoppler({ gaWeeks: '30', gaDays: '0', uaPi: '1.0' });
        assert.ok(r.gaWeeks > 0);
        assert.ok(r.uaIG21_PI, 'should compute UA-PI IG21');
        assert.equal(r.mcaPsv, null);
        assert.equal(r.fmf, null);
        assert.ok(r.classification);
        assert.ok(Array.isArray(r.management));
    });

    it('full input: all indices', () => {
        const r = analyzeDoppler({
            gaWeeks: '30', gaDays: '3',
            uaPi: '1.1', uaRi: '0.7', uaSd: '3.0',
            mcaPsv: '40', mcaPi: '1.8',
            utaPiLeft: '1.0', utaPiRight: '1.1',
            notching: 'none', endDiastolic: 'present',
            clinicalScenario: 'routine',
        });
        assert.ok(r.uaIG21_PI);
        assert.ok(r.uaIG21_RI);
        assert.ok(r.uaIG21_SD);
        assert.ok(r.mcaPsv);
        assert.ok(r.fmf);
        assert.ok(r.uta);
        assert.equal(r.endDiastolic, 'present');
    });

    it('gaWeeks includes partial days', () => {
        const r = analyzeDoppler({ gaWeeks: '30', gaDays: '3', uaPi: '1.0' });
        assert.ok(r.gaWeeks > 30 && r.gaWeeks < 31, `gaWeeks=${r.gaWeeks}`);
    });
});
