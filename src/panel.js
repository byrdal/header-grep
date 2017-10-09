var Monkberry = require('monkberry'),
    Panel = require('../view/panel.monk');

const view = Monkberry.render(Panel, document.body);
view.update({name: 'World'});