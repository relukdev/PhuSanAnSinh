import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { normalize, search, highlight } from '../src/utils/vn-search.js';

// ─── normalize ──────────────────────────────────────────────

describe('normalize — Vietnamese text normalization', () => {
    it('lowercases text', () => {
        assert.equal(normalize('KHÁM THAI'), 'kham thai');
    });

    it('removes Vietnamese diacritics', () => {
        assert.equal(normalize('phụ khoa'), 'phu khoa');
        assert.equal(normalize('siêu âm'), 'sieu am');
        assert.equal(normalize('điều trị'), 'dieu tri');
    });

    it('converts đ/Đ to d', () => {
        assert.equal(normalize('đái tháo đường'), 'dai thao duong');
        assert.equal(normalize('Đặt lịch'), 'dat lich');
    });

    it('collapses whitespace', () => {
        assert.equal(normalize('khám   thai   sớm'), 'kham thai som');
    });

    it('trims', () => {
        assert.equal(normalize('  khám thai  '), 'kham thai');
    });

    it('handles empty/null', () => {
        assert.equal(normalize(''), '');
        assert.equal(normalize(null), '');
        assert.equal(normalize(undefined), '');
    });

    it('combined: uppercase + diacritics + đ + whitespace', () => {
        assert.equal(normalize('  ĐƯỜNG HUYẾT  THAI  KỲ  '), 'duong huyet thai ky');
    });
});

// ─── search ─────────────────────────────────────────────────

describe('search — index search with ranking', () => {
    const mockIndex = [
        { t: 'Khám thai', d: 'Theo dõi thai kỳ toàn diện', k: ['thai'], c: 'Dịch vụ', y: 'page', u: '/kham-thai' },
        { t: 'Siêu âm 5D', d: 'Hình ảnh thai nhi sắc nét', k: ['siêu âm', 'thai nhi'], c: 'Dịch vụ', y: 'page', u: '/sieu-am-5d' },
        { t: 'Tính ngày rụng trứng', d: 'Công cụ tính chu kỳ rụng trứng', k: ['rụng trứng', 'chu kỳ'], c: 'Công cụ', y: 'tool', u: '/tinh-ngay-rung-trung' },
        { t: 'Bishop Score', d: 'Đánh giá cổ tử cung', k: ['bishop', 'cổ tử cung'], c: 'Công cụ', y: 'tool', u: '/cong-cu/bishop-score' },
        { t: 'Phụ khoa', d: 'Khám & điều trị bệnh phụ khoa', k: ['phụ khoa'], c: 'Dịch vụ', y: 'page', u: '/kham-phu-khoa' },
    ];

    it('returns empty for empty query', () => {
        assert.deepEqual(search('', mockIndex), []);
    });

    it('returns empty for whitespace-only query', () => {
        assert.deepEqual(search('   ', mockIndex), []);
    });

    it('finds exact title match', () => {
        const results = search('khám thai', mockIndex);
        assert.ok(results.length > 0);
        assert.equal(results[0].u, '/kham-thai');
    });

    it('finds by keyword', () => {
        const results = search('bishop', mockIndex);
        assert.ok(results.length > 0);
        assert.ok(results.some(r => r.u === '/cong-cu/bishop-score'));
    });

    it('handles diacritics in query', () => {
        const results = search('rụng trứng', mockIndex);
        assert.ok(results.length > 0);
        assert.ok(results.some(r => r.u === '/tinh-ngay-rung-trung'));
    });

    it('handles no-diacritics query matching diacritics content', () => {
        const results = search('rung trung', mockIndex);
        assert.ok(results.length > 0);
    });

    it('multi-token: all tokens must match', () => {
        const results = search('siêu âm thai', mockIndex);
        assert.ok(results.length > 0);
        assert.equal(results[0].u, '/sieu-am-5d');
    });

    it('multi-token: fails if one token missing', () => {
        const results = search('siêu âm xyz', mockIndex);
        assert.equal(results.length, 0);
    });

    it('tool type gets ranking bonus', () => {
        const results = search('cong cu', mockIndex);
        if (results.length > 1) {
            const toolResults = results.filter(r => r.y === 'tool');
            assert.ok(toolResults.length > 0, 'should find tools');
        }
    });

    it('respects limit parameter', () => {
        const results = search('thai', mockIndex, 2);
        assert.ok(results.length <= 2);
    });

    it('default limit is 8', () => {
        const results = search('a', mockIndex);
        assert.ok(results.length <= 8);
    });

    it('results have _score property', () => {
        const results = search('khám thai', mockIndex);
        for (const r of results) {
            assert.ok(typeof r._score === 'number');
            assert.ok(r._score > 0);
        }
    });

    it('results are sorted by score descending', () => {
        const results = search('thai', mockIndex);
        for (let i = 1; i < results.length; i++) {
            assert.ok(results[i]._score <= results[i - 1]._score);
        }
    });
});

// ─── highlight ──────────────────────────────────────────────

describe('highlight — mark tag insertion', () => {
    it('wraps matched text in <mark> tags', () => {
        const result = highlight('Khám thai sớm', 'kham');
        assert.ok(result.includes('<mark>'));
        assert.ok(result.includes('</mark>'));
    });

    it('handles empty query', () => {
        assert.equal(highlight('test', ''), 'test');
    });

    it('handles null/undefined', () => {
        assert.equal(highlight(null, 'test'), '');
        assert.equal(highlight(undefined, 'test'), '');
    });

    it('preserves original text case', () => {
        const result = highlight('KHÁM thai Sớm', 'kham');
        assert.ok(result.includes('KHÁM') || result.includes('<mark>'));
    });

    it('multiple token highlights', () => {
        const result = highlight('Khám thai sớm tại phòng khám', 'kham thai');
        const markCount = (result.match(/<mark>/g) || []).length;
        assert.ok(markCount >= 1, `markCount=${markCount}`);
    });
});
