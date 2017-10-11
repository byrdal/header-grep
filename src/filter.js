function Filter() {
}

Filter.prototype.constructor = Filter;
module.exports = Filter;

Filter.prototype.filterHeaders = function(headers, property, regex) {
    var regexp = new RegExp(regex);
    var filtered = [];
    for (var i = 0; i < headers.length; i++) {
        if (regexp.exec(headers[i][property])) {
            filtered.push(headers[i]);
        }
    }
    return filtered;
};