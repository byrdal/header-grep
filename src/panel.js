import Monkberry from 'monkberry';
import Template from 'template.monk';

const view = Monkberry.render(Template, document.body);
view.update({name: 'World'});


chrome.devtools.network.onNavigated.addListener(
    function(details) {
        document.querySelector('#events').innerHTML = '';
    }
);

chrome.devtools.network.onRequestFinished.addListener(
    function(request) {
        console.log(request.response.headers);
        for (var i=0, len=request.response.headers.length; i < len; i++) {
            var node = document.createElement("div");
            node.innerHTML = request.response.headers[i].name + ': ' + request.response.headers[i].value;
            document.querySelector('#events').appendChild(node);
        }
    }
);