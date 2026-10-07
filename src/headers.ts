import type { Entry as HarEntry } from 'har-format';

export type Source = 'request' | 'response';

export interface Header {
    name: string;
    value: string;
    source: Source;
}

export interface Entry {
    id: number;
    method: string;
    url: string;
    status: number;
    type: string;
    time: number;
    headers: Header[];
}

export interface Filter {
    name: string;
    value: string;
    source: Source | 'both';
    ignoreCase: boolean;
}

export interface Match {
    entry: Entry;
    headers: Header[];
}

export interface HeaderGroup {
    key: string;
    header: Header;
    entries: Entry[];
}

export interface Fragment {
    text: string;
    match: boolean;
}

export function toEntry(har: HarEntry, id: number): Entry {
    return {
        id,
        method: har.request.method,
        url: har.request.url,
        status: har.response.status,
        type: har._resourceType ?? '',
        time: har.time,
        headers: [
            ...har.request.headers.map((h): Header => ({ name: h.name, value: h.value, source: 'request' })),
            ...har.response.headers.map((h): Header => ({ name: h.name, value: h.value, source: 'response' })),
        ],
    };
}

// Returns the compiled regex, or the syntax error message when the pattern is invalid
export function toRegExp(pattern: string, ignoreCase: boolean): RegExp | string {
    try {
        return new RegExp(pattern, ignoreCase ? 'i' : '');
    } catch (e) {
        return (e as Error).message;
    }
}

export function match(entries: Entry[], source: Filter['source'], name: RegExp, value: RegExp): Match[] {
    const matches: Match[] = [];
    for (const entry of entries) {
        const headers = entry.headers.filter(h =>
            (source === 'both' || h.source === source) && name.test(h.name) && value.test(h.value),
        );
        if (headers.length > 0) {
            matches.push({ entry, headers });
        }
    }
    return matches;
}

export function groupByHeader(matches: Match[]): HeaderGroup[] {
    const groups = new Map<string, HeaderGroup>();
    for (const { entry, headers } of matches) {
        for (const header of headers) {
            const key = `${header.source}\n${header.name.toLowerCase()}\n${header.value}`;
            const group = groups.get(key) ?? { key, header, entries: [] };
            group.entries.push(entry);
            groups.set(key, group);
        }
    }
    return [...groups.values()].sort((a, b) =>
        a.header.name.localeCompare(b.header.name) || a.header.value.localeCompare(b.header.value),
    );
}

export function highlight(text: string, regex: RegExp): Fragment[] {
    const global = new RegExp(regex.source, regex.flags + 'g');
    const fragments: Fragment[] = [];
    let last = 0;
    for (const m of text.matchAll(global)) {
        if (m[0] === '') {
            continue;
        }
        if (m.index > last) {
            fragments.push({ text: text.slice(last, m.index), match: false });
        }
        fragments.push({ text: m[0], match: true });
        last = m.index + m[0].length;
    }
    if (last < text.length) {
        fragments.push({ text: text.slice(last), match: false });
    }
    return fragments;
}
