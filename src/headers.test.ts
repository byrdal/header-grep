import { describe, expect, it } from 'vitest';
import type { Entry as HarEntry } from 'har-format';
import { type Entry, groupByHeader, highlight, match, toEntry, toRegExp } from './headers';

function entry(id: number, url: string, headers: Entry['headers']): Entry {
    return { id, method: 'GET', url, status: 200, type: 'fetch', time: 1, headers };
}

const a = entry(1, 'https://a.test/', [
    { name: 'Content-Type', value: 'text/html', source: 'response' },
    { name: 'accept', value: '*/*', source: 'request' },
]);
const b = entry(2, 'https://b.test/', [
    { name: 'content-type', value: 'text/html', source: 'response' },
    { name: 'cache-control', value: 'no-cache', source: 'response' },
]);

describe('toEntry', () => {
    it('flattens request and response headers', () => {
        const har = {
            request: { method: 'POST', url: 'https://x.test/', headers: [{ name: 'a', value: '1' }] },
            response: { status: 404, headers: [{ name: 'b', value: '2' }] },
            time: 12.5,
            _resourceType: 'xhr',
        } as unknown as HarEntry;

        expect(toEntry(har, 7)).toEqual({
            id: 7,
            method: 'POST',
            url: 'https://x.test/',
            status: 404,
            type: 'xhr',
            time: 12.5,
            headers: [
                { name: 'a', value: '1', source: 'request' },
                { name: 'b', value: '2', source: 'response' },
            ],
        });
    });
});

describe('toRegExp', () => {
    it('honours the ignore case flag', () => {
        expect((toRegExp('abc', true) as RegExp).test('ABC')).toBe(true);
        expect((toRegExp('abc', false) as RegExp).test('ABC')).toBe(false);
    });

    it('returns the error message for invalid patterns', () => {
        expect(toRegExp('(', false)).toBeTypeOf('string');
    });
});

describe('match', () => {
    it('matches on name and value', () => {
        const result = match([a, b], 'both', /content/i, /html/);
        expect(result.map(m => m.entry.id)).toEqual([1, 2]);
        expect(result[0].headers).toEqual([a.headers[0]]);
    });

    it('filters on source', () => {
        expect(match([a, b], 'request', /./, /./).map(m => m.entry.id)).toEqual([1]);
    });

    it('drops entries without matching headers', () => {
        expect(match([a, b], 'both', /cache/, /./).map(m => m.entry.id)).toEqual([2]);
    });
});

describe('groupByHeader', () => {
    it('groups case-insensitively by name and sorts by name', () => {
        const groups = groupByHeader(match([a, b], 'both', /./, /./));
        expect(groups.map(g => [g.header.name, g.entries.length])).toEqual([
            ['accept', 1],
            ['cache-control', 1],
            ['Content-Type', 2],
        ]);
    });
});

describe('highlight', () => {
    it('splits text into matching and non matching fragments', () => {
        expect(highlight('text/html; charset=html', /html/i)).toEqual([
            { text: 'text/', match: false },
            { text: 'html', match: true },
            { text: '; charset=', match: false },
            { text: 'html', match: true },
        ]);
    });

    it('ignores empty matches', () => {
        expect(highlight('abc', /(?:)/)).toEqual([{ text: 'abc', match: false }]);
    });
});
