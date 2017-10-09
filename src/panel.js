var Monkberry = require('monkberry'),
    Panel     = require('../view/panel.monk'),
    Listener  = require('../src/listener.js');

const view = Monkberry.render(Panel, document.body);
const listener = new Listener(view);