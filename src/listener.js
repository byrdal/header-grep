function RequestListener(view) {
    this.requests = [];
    this.view = view;
    this.nameRegex = document.querySelector('#nameRegex');
    this.valueRegex = document.querySelector('#valueRegex');
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
    this.filterHeaderNames(request);
    this.filterHeaderValues(request);
    if(request.response.headers.length > 0) {
        this.requests.push(request);
        this.updateView();
    }
};

RequestListener.prototype.filterHeaderNames = function(request) {
    var nameRegex = new RegExp(this.nameRegex.value);
    var filtered = [];
    for (var i = 0; i < request.response.headers.length; i++) {
        if (nameRegex.exec(request.response.headers[i].name)) {
            filtered.push(request.response.headers[i]);
        }
    }
    request.response.headers = filtered;
};

RequestListener.prototype.filterHeaderValues = function(request) {
    var valueRegex = new RegExp(this.valueRegex.value);
    var filtered = [];
    for (var i = 0; i < request.response.headers.length; i++) {
        if (valueRegex.exec(request.response.headers[i].value)) {
            filtered.push(request.response.headers[i]);
        }
    }
    request.response.headers = filtered;
};

RequestListener.prototype.updateView = function() {
    this.view.update({ requests: this.requests});
};