var Monkberry = require('monkberry'),
    Panel     = require('../view/panel.monk'),
    Listener  = require('../src/listener.js');

const filters = {
    count: function(array) {
        return array.length;
    }
};

const view = Monkberry.render(Panel, document.body, {filters: filters});
const listener = new Listener(view);