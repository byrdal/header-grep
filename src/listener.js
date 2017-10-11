var Filter = require('./filter');

function RequestListener(view) {
    this.requests = [];
    this.view = view;
    this.headerSelect = document.querySelector('#headerSelect');
    this.nameRegex = document.querySelector('#nameRegex');
    this.valueRegex = document.querySelector('#valueRegex');
    this.filter = new Filter();
    this.addListeners();
}

RequestListener.prototype.constructor = RequestListener;
module.exports = RequestListener;

RequestListener.prototype.addListeners = function() {
    chrome.devtools.network.onNavigated.addListener(
        function(details) {
            this.requests = [];
            this.updateView();
        }.bind(this)
    );

    chrome.devtools.network.onRequestFinished.addListener(this.onRequestFinished.bind(this));
};

RequestListener.prototype.onRequestFinished = function(request) {
    console.log(this.headerSelect.value);
    request[this.headerSelect.value].headers = this.filter.filterHeaders(request[this.headerSelect.value].headers, 'name', this.nameRegex.value);
    request[this.headerSelect.value].headers = this.filter.filterHeaders(request[this.headerSelect.value].headers, 'value', this.valueRegex.value);
    if(request[this.headerSelect.value].headers.length > 0) {
        request.headers = request[this.headerSelect.value].headers;
        this.requests.push(request);
        this.updateView();
    }
};

RequestListener.prototype.updateView = function() {
    this.view.update({ requests: this.requests });
};