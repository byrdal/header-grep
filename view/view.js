
/**
 * @class
 */
function panel() {
  Monkberry.call(this);

  // Create elements
  var div0 = document.createElement('div');
  var span1 = document.createElement('span');
  var input2 = document.createElement('input');
  var div3 = document.createElement('div');

  // Construct dom
  span1.appendChild(document.createTextNode("Header name: "));
  input2.setAttribute("type", "text");
  div3.id = "events";
  div0.appendChild(span1);
  div0.appendChild(input2);
  div0.appendChild(div3);

  // Set root nodes
  this.nodes = [div0];
}
panel.prototype = Object.create(Monkberry.prototype);
panel.prototype.constructor = panel;
panel.pool = [];
panel.prototype.update = function (__data__) {
};

window.panel = panel;
//# sourceMappingURL=view.js.map
