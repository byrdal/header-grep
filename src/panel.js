var Monkberry       = require('monkberry'),
    MonkberryEvents = require('monkberry-events'),
    Panel           = require('../view/panel.monk'),
    RequestListener = require('./requestlistener.js');

const filters = {
    count: function(array) {
        return array.length;
    }
};

var toggleRequestList = function(event) {
    this.parentNode.querySelector('.request-header').classList.toggle("expanded");
    this.parentNode.querySelector('.request-list').classList.toggle('collapsed');
};

var view = Monkberry.render(Panel, document.body, {filters: filters});
view.on('click', '.header-root', toggleRequestList, false);

var listener = new RequestListener(view);
listener.addListeners();

view.on('change', '#nameRegex', listener.onFilterChange.bind(listener), false);
view.on('change', '#valueRegex', listener.onFilterChange.bind(listener), false);
view.on('change', '#requestResponseSelect', listener.onFilterChange.bind(listener), false);
