var Filter = require('./filter');

function RequestListener(view) {
    this.requests = [];
    this.headerMap = {};
    this.view = view;
    this.headerSelect = document.querySelector('#headerSelect');
    this.nameRegex = document.querySelector('#nameRegex');
    this.valueRegex = document.querySelector('#valueRegex');
    this.filter = new Filter();
}

RequestListener.prototype.constructor = RequestListener;
module.exports = RequestListener;

RequestListener.prototype.addListeners = function() {
    chrome.devtools.network.onNavigated.addListener(
        function(details) {
            this.headerMap = {};
            this.requests = [];
            this.updateView();
        }.bind(this)
    );

    chrome.devtools.network.onRequestFinished.addListener(this.onRequestFinished.bind(this));
};

RequestListener.prototype.onRequestFinished = function(request) {
    request[this.headerSelect.value].headers = this.filter.filterHeaders(request[this.headerSelect.value].headers, 'name', this.nameRegex.value);
    request[this.headerSelect.value].headers = this.filter.filterHeaders(request[this.headerSelect.value].headers, 'value', this.valueRegex.value);
    if(request[this.headerSelect.value].headers.length > 0) {
        this.addToResult(request);
        request.headers = request[this.headerSelect.value].headers;
        this.requests.push(request);
        this.updateView();
    }
};

RequestListener.prototype.addToResult = function(request) {
    var headers = request[this.headerSelect.value].headers;
    for (var i = 0; i < headers.length; i++) {
        var propertyName = headers[i].name + ': ' + headers[i].value;
        if(!this.headerMap.hasOwnProperty(propertyName)) {
            this.headerMap[propertyName] = { header: { name: headers[i].name, value: headers[i].value }, requests: [] };
        }
        this.headerMap[propertyName].requests.push({ method: request.request.method, url: request.request.url });
    }
};

RequestListener.prototype.updateView = function() {
    this.view.update({ requests: this.requests, headerMap: this.headerMap });
};