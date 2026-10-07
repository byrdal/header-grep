import { computed, effect, signal } from '@preact/signals';
import type { Entry as HarEntry } from 'har-format';
import { type Entry, type Filter, type Match, groupByHeader, match, toEntry, toRegExp } from './headers';

export type GroupBy = 'header' | 'request';

export interface Preset {
    name: string;
    filter: Filter;
}

interface Settings {
    filter: Filter;
    groupBy: GroupBy;
    preserveLog: boolean;
    presets: Preset[];
}

const FLUSH_DELAY = 100;
const DEBOUNCE_DELAY = 150;

export const entries = signal<Entry[]>([]);
// What the toolbar shows; `filter` follows it with a debounce
export const draft = signal<Filter>({ name: '', value: '', source: 'both', ignoreCase: true });
export const filter = signal<Filter>(draft.value);
export const groupBy = signal<GroupBy>('header');
export const preserveLog = signal(false);
export const presets = signal<Preset[]>([]);

export const nameRegex = computed(() => toRegExp(filter.value.name, filter.value.ignoreCase));
export const valueRegex = computed(() => toRegExp(filter.value.value, filter.value.ignoreCase));

export const matches = computed((): Match[] => {
    if (typeof nameRegex.value === 'string' || typeof valueRegex.value === 'string') {
        return [];
    }
    return match(entries.value, filter.value.source, nameRegex.value, valueRegex.value);
});
export const headerGroups = computed(() => groupByHeader(matches.value));

let nextId = 0;
let pending: Entry[] = [];

function add(entry: HarEntry) {
    pending.push(toEntry(entry, nextId++));
    if (pending.length > 1) {
        return;
    }
    // Batch bursts of requests into a single update
    setTimeout(() => {
        entries.value = [...entries.value, ...pending];
        pending = [];
    }, FLUSH_DELAY);
}

export function clear() {
    pending = [];
    entries.value = [];
}

export async function init() {
    const stored = (await chrome.storage.local.get('settings')).settings as Partial<Settings> | undefined;
    draft.value = filter.value = stored?.filter ?? draft.value;
    groupBy.value = stored?.groupBy ?? groupBy.value;
    preserveLog.value = stored?.preserveLog ?? preserveLog.value;
    presets.value = stored?.presets ?? presets.value;

    effect(() => {
        const next = draft.value;
        const timer = setTimeout(() => filter.value = next, DEBOUNCE_DELAY);
        return () => clearTimeout(timer);
    });
    effect(() => {
        const settings: Settings = {
            filter: filter.value,
            groupBy: groupBy.value,
            preserveLog: preserveLog.value,
            presets: presets.value,
        };
        chrome.storage.local.set({ settings });
    });

    chrome.devtools.network.getHAR(har => {
        har.entries.forEach(add);
        chrome.devtools.network.onRequestFinished.addListener(add);
    });
    chrome.devtools.network.onNavigated.addListener(() => {
        if (!preserveLog.value) {
            clear();
        }
    });
}
