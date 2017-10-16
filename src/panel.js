var Monkberry       = require('monkberry'),
    MonkberryEvents = require('monkberry-events'),
    Panel           = require('../view/panel.monk'),
    Listener        = require('../src/listener.js');

const filters = {
    count: function(array) {
        return array.length;
    }
};

var toggleRequestList = function(event) {
    this.querySelector('.request-header').classList.toggle("expanded");
    this.querySelector('.request-list').classList.toggle('collapsed');
};

const view = Monkberry.render(Panel, document.body, {filters: filters});
view.on('click', '.header-root', toggleRequestList, false);
const listener = new Listener(view);