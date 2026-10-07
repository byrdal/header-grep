import { useState } from 'preact/hooks';
import { type Entry, type Header, type HeaderGroup, type Match, highlight } from '../headers';
import { entries, groupBy, headerGroups, matches, nameRegex, valueRegex } from '../state';

function copy(text: string) {
    // The Clipboard API is blocked in DevTools panels, so fall back to execCommand
    const area = document.createElement('textarea');
    area.value = text;
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
}

function formatTime(ms: number) {
    return ms < 1000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(2)} s`;
}

function CopyButton({ text, title }: { text: string; title: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <button
            class="icon-button copy"
            title={title}
            onClick={e => {
                e.stopPropagation();
                copy(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 1000);
            }}
        >{copied ? '✓' : '⧉'}</button>
    );
}

function Highlight({ text, regex }: { text: string; regex: RegExp | string }) {
    if (typeof regex === 'string' || regex.source === '(?:)') {
        return <>{text}</>;
    }
    return <>{highlight(text, regex).map(f => f.match ? <mark>{f.text}</mark> : f.text)}</>;
}

function HeaderLine({ header }: { header: Header }) {
    return (
        <span class="header-line">
            <span class={`tag ${header.source}`}>{header.source === 'request' ? 'req' : 'res'}</span>
            <span class="header-name"><Highlight text={header.name} regex={nameRegex.value}/></span>
            <span class="header-value"><Highlight text={header.value} regex={valueRegex.value}/></span>
            <CopyButton text={`${header.name}: ${header.value}`} title="Copy header"/>
        </span>
    );
}

function RequestCells({ entry, link }: { entry: Entry; link: boolean }) {
    return (
        <>
            <span class="method">{entry.method}</span>
            <span class={`status status-${Math.floor(entry.status / 100)}`}>{entry.status || 'failed'}</span>
            {link
                ? <a class="url" href={entry.url} target="_blank" title={entry.url}>{entry.url}</a>
                : <span class="url" title={entry.url}>{entry.url}</span>}
            <span class="type">{entry.type}</span>
            <span class="time">{formatTime(entry.time)}</span>
        </>
    );
}

function Group({ summary, count, children }: { summary: preact.ComponentChildren; count: number; children: () => preact.ComponentChildren }) {
    const [expanded, setExpanded] = useState(false);
    const toggle = () => setExpanded(!expanded);
    return (
        <div class="group">
            <div
                class="group-summary"
                role="button"
                tabIndex={0}
                aria-expanded={expanded}
                onClick={toggle}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggle())}
            >
                <span class="chevron"/>
                {summary}
                <span class="badge">{count}</span>
            </div>
            {expanded && <div class="group-body">{children()}</div>}
        </div>
    );
}

function ByHeader({ groups }: { groups: HeaderGroup[] }) {
    return (
        <>
            {groups.map(group => (
                <Group key={group.key} summary={<HeaderLine header={group.header}/>} count={group.entries.length}>
                    {() => group.entries.map(entry => (
                        <div class="row request-row" key={entry.id}>
                            <RequestCells entry={entry} link/>
                            <CopyButton text={entry.url} title="Copy URL"/>
                        </div>
                    ))}
                </Group>
            ))}
        </>
    );
}

function ByRequest({ matches }: { matches: Match[] }) {
    return (
        <>
            {matches.map(({ entry, headers }) => (
                <Group key={entry.id} summary={<span class="request-row"><RequestCells entry={entry} link={false}/></span>} count={headers.length}>
                    {() => headers.map((header, i) => <div class="row" key={i}><HeaderLine header={header}/></div>)}
                </Group>
            ))}
        </>
    );
}

export function Results() {
    if (typeof nameRegex.value === 'string' || typeof valueRegex.value === 'string') {
        return <div class="empty">Invalid regular expression</div>;
    }
    if (entries.value.length === 0) {
        return <div class="empty">Waiting for requests…<br/>Reload the page to capture all requests.</div>;
    }
    if (matches.value.length === 0) {
        return <div class="empty">No headers match the filter</div>;
    }
    return (
        <div class="results">
            {groupBy.value === 'header' ? <ByHeader groups={headerGroups.value}/> : <ByRequest matches={matches.value}/>}
        </div>
    );
}

export function StatusBar() {
    return (
        <div class="status-bar">
            {matches.value.length} / {entries.value.length} requests
            {groupBy.value === 'header' && ` · ${headerGroups.value.length} unique headers`}
        </div>
    );
}
