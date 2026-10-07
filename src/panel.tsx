import { render } from 'preact';
import { Results, StatusBar } from './components/Results';
import { Toolbar } from './components/Toolbar';
import { init } from './state';

function applyTheme(theme: chrome.devtools.panels.Theme) {
    document.documentElement.dataset.theme = theme;
}

applyTheme(chrome.devtools.panels.themeName);
chrome.devtools.panels.setThemeChangeHandler?.(applyTheme);

await init();

render(
    <>
        <Toolbar/>
        <Results/>
        <StatusBar/>
    </>,
    document.getElementById('app')!,
);
