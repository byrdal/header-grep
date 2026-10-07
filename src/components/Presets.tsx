import { useRef, useState } from 'preact/hooks';
import { draft, presets } from '../state';

export function Presets() {
    const menu = useRef<HTMLDivElement>(null);
    const [name, setName] = useState('');

    function save(e: SubmitEvent) {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) {
            return;
        }
        presets.value = [...presets.value.filter(p => p.name !== trimmed), { name: trimmed, filter: draft.value }]
            .sort((a, b) => a.name.localeCompare(b.name));
        setName('');
    }

    return (
        <>
            <button class="presets-button" popovertarget="presets-menu">Saved filters ▾</button>
            <div id="presets-menu" class="menu" popover="auto" ref={menu}>
                {presets.value.length === 0 && <div class="menu-empty">No saved filters yet</div>}
                {presets.value.map(preset => (
                    <div class="menu-item" key={preset.name}>
                        <button
                            class="menu-apply"
                            title={`Name: ${preset.filter.name || '*'}\nValue: ${preset.filter.value || '*'}`}
                            onClick={() => {
                                draft.value = preset.filter;
                                menu.current?.hidePopover();
                            }}
                        >{preset.name}</button>
                        <button
                            class="icon-button"
                            title="Delete"
                            onClick={() => presets.value = presets.value.filter(p => p !== preset)}
                        >×</button>
                    </div>
                ))}
                <form class="menu-save" onSubmit={save}>
                    <input
                        placeholder="Save current filter as…"
                        value={name}
                        onInput={e => setName(e.currentTarget.value)}
                    />
                    <button type="submit" disabled={!name.trim()}>Save</button>
                </form>
            </div>
        </>
    );
}
