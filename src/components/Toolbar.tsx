import type { Filter } from '../headers';
import { clear, draft, groupBy, nameRegex, preserveLog, valueRegex } from '../state';
import { Presets } from './Presets';

function update(patch: Partial<Filter>) {
    draft.value = { ...draft.value, ...patch };
}

export function Toolbar() {
    const nameError = typeof nameRegex.value === 'string' ? nameRegex.value : undefined;
    const valueError = typeof valueRegex.value === 'string' ? valueRegex.value : undefined;

    return (
        <div class="toolbar">
            <button class="icon-button" title="Clear" onClick={clear}>⊘</button>
            <span class="divider"/>
            <select
                value={draft.value.source}
                onChange={e => update({ source: e.currentTarget.value as Filter['source'] })}
            >
                <option value="both">Request &amp; response</option>
                <option value="request">Request headers</option>
                <option value="response">Response headers</option>
            </select>
            <input
                class={nameError ? 'invalid' : ''}
                title={nameError}
                placeholder="Header name regex"
                spellcheck={false}
                value={draft.value.name}
                onInput={e => update({ name: e.currentTarget.value })}
            />
            <input
                class={valueError ? 'invalid' : ''}
                title={valueError}
                placeholder="Header value regex"
                spellcheck={false}
                value={draft.value.value}
                onInput={e => update({ value: e.currentTarget.value })}
            />
            <button
                class="toggle"
                title="Match case"
                aria-pressed={!draft.value.ignoreCase}
                onClick={() => update({ ignoreCase: !draft.value.ignoreCase })}
            >Aa</button>
            <span class="divider"/>
            <span class="label">Group by</span>
            <div class="segmented">
                <button aria-pressed={groupBy.value === 'header'} onClick={() => groupBy.value = 'header'}>Header</button>
                <button aria-pressed={groupBy.value === 'request'} onClick={() => groupBy.value = 'request'}>Request</button>
            </div>
            <span class="divider"/>
            <label class="checkbox">
                <input
                    type="checkbox"
                    checked={preserveLog.value}
                    onChange={e => preserveLog.value = e.currentTarget.checked}
                />
                Preserve log
            </label>
            <Presets/>
        </div>
    );
}
