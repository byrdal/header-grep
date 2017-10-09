function RequestListener(view) {
    this.requests = [];
    this.view = view;
    this.addListeners();
}

RequestListener.prototype.constructor = RequestListener;
module.exports = RequestListener;

RequestListener.prototype.addListeners = function() {
    chrome.devtools.network.onNavigated.addListener(
        function(details) {
            this.requests = [];
        }.bind(this)
    );

    chrome.devtools.network.onRequestFinished.addListener(
        function(request) {
            this.requests.push(request);
            this.view.update({ requests: this.requests});
        }.bind(this)
    );
};