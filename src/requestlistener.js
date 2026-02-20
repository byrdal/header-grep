var Filter = require('./filter');

function RequestListener(view) {
    this.requests = [];
    this.filtered = {};
    this.view = view;
    this.requestResponseSelect = document.querySelector('#requestResponseSelect');
    this.nameRegex = document.querySelector('#nameRegex');
    this.valueRegex = document.querySelector('#valueRegex');
    this.filter = new Filter();
}

RequestListener.prototype.constructor = RequestListener;
module.exports = RequestListener;

RequestListener.prototype.addListeners = function() {
    chrome.devtools.network.onNavigated.addListener(
        function() {
            this.requests = [];
            this.resetView();
        }.bind(this)
    );

    chrome.devtools.network.onRequestFinished.addListener(this.onRequestFinished.bind(this));
};

RequestListener.prototype.resetView = function() {
    this.filtered = {};
    this.updateView();
};

RequestListener.prototype.onRequestFinished = function(request) {
    this.requests.push(request);
    this.filterRequest(request);
};

RequestListener.prototype.filterRequest = function(request) {
    let filtered;
    if (this.requestResponseSelect.value === 'both') {
        filtered = this.filterHeaders(request['request'].headers.concat(request['response'].headers));
    } else {
        filtered = this.filterHeaders(request[this.requestResponseSelect.value].headers);
    }

    if (filtered.length > 0) {
        this.updateView(request, filtered);
    }
};

RequestListener.prototype.filterHeaders = function(headers) {
    headers = this.filter.filterHeaders(headers, 'name', this.nameRegex.value);
    headers = this.filter.filterHeaders(headers, 'value', this.valueRegex.value);
    return headers;
};

RequestListener.prototype.updateView = function(request, headers) {
    if (request && headers) {
        for (let i = 0; i < headers.length; i++) {
            let propertyName = headers[i].name + ': ' + headers[i].value;
            if(!Object.prototype.hasOwnProperty.call(this.filtered, propertyName)) {
                this.filtered[propertyName] = { header: { name: headers[i].name, value: headers[i].value }, requests: [] };
            }
            this.filtered[propertyName].requests.push({ method: request.request.method, url: request.request.url });
        }
    }

    this.view.update({ requests: this.requests, headerMap: this.filtered });
};

RequestListener.prototype.onFilterChange = function() {
    this.resetView();

    this.requests.forEach(function (request) {
        this.filterRequest(request);
    }, this);
};
