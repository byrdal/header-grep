/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**                                      _    _
 *                     /\/\   ___  _ __ | | _| |__   ___ _ __ _ __ _   _
 *                    /    \ / _ \| '_ \| |/ / '_ \ / _ \ '__| '__| | | |
 *                   / /\/\ \ (_) | | | |   <| |_) |  __/ |  | |  | |_| |
 *                   \/    \/\___/|_| |_|_|\_\_.__/ \___|_|  |_|   \__, |
 *                                                                 |___/
 *
 *        +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
 *  Enter ->  |       |                                   |           |           |       |
 *        +   +   +   +---+   +---+---+   +---+---+   +   +   +---+   +   +---+   +   +   +
 *        |       |           |                   |   |       |       |   |   |       |   |
 *        +---+---+---+---+---+   +---+---+---+---+   +---+---+   +---+   +   +---+---+   +
 *        |       |               |       |           |       |       |   |           |   |
 *        +   +   +   +---+---+---+   +   +   +---+---+   +   +---+   +   +---+---+   +   +
 *        |   |       |           |   |   |       |       |               |   |           |
 *        +   +---+---+   +---+   +   +   +---+   +   +---+---+---+---+---+   +   +   +---+
 *        |   |       |       |       |       |   |   |       |       |   |       |   |   |
 *        +   +---+   +---+   +---+---+---+   +   +   +   +   +   +   +   +---+---+   +   +
 *        |           |       |       |   |       |       |   |   |   |           |   |   |
 *        +---+---+---+   +---+   +   +   +   +---+---+---+   +---+   +---+---+   +   +   +
 *        |   |       |           |       |   |       |       |       |               |   |
 *        +   +   +   +---+---+---+   +---+   +   +   +   +---+   +---+---+   +---+---+   +
 *        |   |   |           |           |   |   |   |       |   |       |   |           |
 *        +   +   +---+---+   +---+---+---+   +---+   +---+   +   +   +   +   +   +---+   +
 *        |       |                           |       |   |       |   |       |   |       |
 *        +---+---+   +   +   +---+---+---+---+   +---+   +---+   +   +---+---+   +   +---+
 *        |           |   |                               |       |               |       -> Exit
 *        +---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
 */
(function (document) {
  /**
   * Monkberry
   * @class
   */
  function Monkberry() {
    this.parent = null;
    this.nested = [];
    this.nodes = [];
    this.filters = null;
    this.directives = null;
    this.context = null;
    this.unbind = null;
    this.onRender = null;
    this.onUpdate = null;
    this.onRemove = null;
    this.noCache = false;
  }

  /**
   * Render template and attach it to node.
   * @param {Monkberry} template
   * @param {Element} node
   * @param {Object=} options
   * @return {Monkberry}
   */
  Monkberry.render = function (template, node, options) {
    var view;

    if (options && options.noCache) {
      view = new template();
    } else {
      view = template.pool.pop() || new template();
    }

    if (node.nodeType == 8) {
      view.insertBefore(node);
    } else {
      view.appendTo(node);
    }

    if (options) {
      if (options.parent) {
        view.parent = options.parent;
      }

      if (options.context) {
        view.context = options.context;
      }

      if (options.filters) {
        view.filters = options.filters;
      }

      if (options.directives) {
        view.directives = options.directives;
      }

      if (options.noCache) {
        view.noCache = options.noCache;
      }
    }

    if (view.onRender) {
      view.onRender();
    }

    return view;
  };

  /**
   * Prerepder template for future usage.
   * @param {Monkberry} template - Template name.
   * @param {Number} times - Times of prerender.
   */
  Monkberry.prerender = function (template, times) {
    while (times--) {
      template.pool.push(new template());
    }
  };

  /**
   * Main loops processor.
   */
  Monkberry.loop = function (parent, node, map, template, array, options) {
    var i, j, len, keys, transform, arrayLength, childrenSize = map.length;

    // Get array length, and convert object to array if needed.
    if (Array.isArray(array)) {
      transform = transformArray;
      arrayLength = array.length;
    } else {
      transform = transformObject;
      keys = Object.keys(array);
      arrayLength = keys.length;
    }

    // If new array contains less items what before, remove surpluses.
    len = childrenSize - arrayLength;
    for (i in map.items) {
      if (len-- > 0) {
        map.items[i].remove();
      } else {
        break;
      }
    }

    // If there is already some views, update there loop state.
    j = 0;
    for (i in map.items) {
      map.items[i].__state__ = transform(array, keys, j, options);
      j++;
    }

    // If new array contains more items when previous, render new views and append them.
    for (j = childrenSize, len = arrayLength; j < len; j++) {
      // Render new view.
      var view = Monkberry.render(template, node, {parent: parent, context: parent.context, filters: parent.filters, directives: parent.directives, noCache: parent.noCache});

      // Set view hierarchy.
      parent.nested.push(view);

      // Remember to remove from children map on view remove.
      i = map.push(view);
      view.unbind = (function (i) {
        return function () {
          map.remove(i);
        };
      })(i);

      // Set view state for later update in onUpdate.
      view.__state__ = transform(array, keys, j, options);
    }
  };

  /**
   * Main if processor.
   */
  Monkberry.cond = function (parent, node, child/*.ref*/, template, test) {
    if (child.ref) { // If view was already inserted, update or remove it.
      if (!test) {
        child.ref.remove();
      }
    } else if (test) {
      // Render new view.
      var view = Monkberry.render(template, node, {parent: parent, context: parent.context, filters: parent.filters, directives: parent.directives, noCache: parent.noCache});

      // Set view hierarchy.
      parent.nested.push(view);

      // Remember to remove child ref on remove of view.
      child.ref = view;
      view.unbind = function () {
        child.ref = null;
      };
    }

    return test;
  };

  /**
   * Main custom tags processor.
   */
  Monkberry.insert = function (parent, node, child/*.ref*/, template, data) {
    if (child.ref) { // If view was already inserted, update or remove it.
      child.ref.update(data);
    } else {
      // Render new view.
      var view = Monkberry.render(template, node, {parent: parent, context: parent.context, filters: parent.filters, directives: parent.directives, noCache: parent.noCache});

      // Set view hierarchy.
      parent.nested.push(view);

      // Remember to remove child ref on remove of view.
      child.ref = view;
      view.unbind = function () {
        child.ref = null;
      };

      // Set view data (note what it must be after adding nodes to DOM).
      view.update(data);
    }
  };

  /**
   * Remove view from DOM.
   */
  Monkberry.prototype.remove = function () {
    // Remove appended nodes.
    var i = this.nodes.length;
    while (i--) {
      this.nodes[i].parentNode.removeChild(this.nodes[i]);
    }

    // Remove self from parent's children map or child ref.
    if (this.unbind) {
      this.unbind();
    }

    // Remove all nested views.
    i = this.nested.length;
    while (i--) {
      this.nested[i].remove();
    }

    // Remove this view from parent's nested views.
    if (this.parent) {
      i = this.parent.nested.indexOf(this);
      this.parent.nested.splice(i, 1);
      this.parent = null;
    }

    // Call on remove callback.
    if (this.onRemove) {
      this.onRemove();
    }

    // Store view in pool for reuse in future.
    if (!this.noCache) {
      this.constructor.pool.push(this);
    }
  };

  /**
   * @param {Element} toNode
   */
  Monkberry.prototype.appendTo = function (toNode) {
    for (var i = 0, len = this.nodes.length; i < len; i++) {
      toNode.appendChild(this.nodes[i]);
    }
  };

  /**
   * @param {Element} toNode
   */
  Monkberry.prototype.insertBefore = function (toNode) {
    if (toNode.parentNode) {
      for (var i = 0, len = this.nodes.length; i < len; i++) {
        toNode.parentNode.insertBefore(this.nodes[i], toNode);
      }
    } else {
      throw new Error(
        "Can not insert child view into parent node. " +
        "You need append your view first and then update."
      );
    }
  };

  /**
   * Return rendered node, or DocumentFragment of rendered nodes if more then one root node in template.
   * @returns {Element|DocumentFragment}
   */
  Monkberry.prototype.createDocument = function () {
    if (this.nodes.length == 1) {
      return this.nodes[0];
    } else {
      var fragment = document.createDocumentFragment();
      for (var i = 0, len = this.nodes.length; i < len; i++) {
        fragment.appendChild(this.nodes[i]);
      }
      return fragment;
    }
  };

  /**
   * @param {string} query
   * @returns {Element}
   */
  Monkberry.prototype.querySelector = function (query) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].matches && this.nodes[i].matches(query)) {
        return this.nodes[i];
      }

      if (this.nodes[i].nodeType === 8) {
        throw new Error('Can not use querySelector with non-element nodes on first level.');
      }

      if (this.nodes[i].querySelector) {
        var element = this.nodes[i].querySelector(query);
        if (element) {
          return element;
        }
      }
    }
    return null;
  };


  /**
   * Simple Map implementation with length property.
   */
  function Map() {
    this.items = Object.create(null);
    this.length = 0;
    this.next = 0;
  }

  Map.prototype.push = function (element) {
    this.items[this.next] = element;
    this.length += 1;
    this.next += 1;
    return this.next - 1;
  };

  Map.prototype.remove = function (i) {
    if (i in this.items) {
      delete this.items[i];
      this.length -= 1;
    } else {
      throw new Error('You are trying to delete not existing element "' + i + '" form map.');
    }
  };

  Map.prototype.forEach = function (callback) {
    for (var i in this.items) {
      callback(this.items[i]);
    }
  };

  Monkberry.Map = Map;

  //
  // Helper function for working with foreach loops data.
  // Will transform data for "key, value of array" constructions.
  //

  function transformArray(array, keys, i, options) {
    if (options) {
      var t = {__index__: i};
      t[options.value] = array[i];

      if (options.key) {
        t[options.key] = i;
      }

      return t;
    } else {
      return array[i];
    }
  }

  function transformObject(array, keys, i, options) {
    if (options) {
      var t = {__index__: i};
      t[options.value] = array[keys[i]];

      if (options.key) {
        t[options.key] = keys[i];
      }

      return t;
    } else {
      return array[keys[i]];
    }
  }

  if (true) {
    module.exports = Monkberry;
  } else {
    window.Monkberry = Monkberry;
  }
})(window.document);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Monkberry = __webpack_require__(0),
    Panel     = __webpack_require__(3),
    Listener  = __webpack_require__(5);

const view = Monkberry.render(Panel, document.body);
const listener = new Listener(view);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Monkberry = __webpack_require__(0);
var Toolbar = __requireDefault(__webpack_require__(4));
function __requireDefault(obj) { return obj && obj.__esModule ? obj.default : obj; }

/**
 * @class
 */
function panel() {
  Monkberry.call(this);
  var _this = this;

  // Create elements
  var custom0 = document.createComment('Toolbar');
  var child0 = {};
  var table0 = document.createElement('table');
  var tbody1 = document.createElement('tbody');
  var children1 = new Monkberry.Map();

  // Construct dom
  table0.appendChild(tbody1);
  table0.setAttribute("class", "pure-table pure-table-striped request-table");

  // Update functions
  this.__update__ = {
    requests: function (requests) {
      Monkberry.loop(_this, tbody1, children1, panel_for0, requests);
    }
  };

  // Extra render actions
  this.onRender = function () {
    Monkberry.insert(_this, custom0, child0, Toolbar, {});
  };

  // On update actions
  this.onUpdate = function (__data__) {
    children1.forEach(function (view) {
      view.update(view.__state__);
    });
  };

  // Set root nodes
  this.nodes = [custom0, table0];
}
panel.prototype = Object.create(Monkberry.prototype);
panel.prototype.constructor = panel;
panel.pool = [];
panel.prototype.update = function (__data__) {
  if (__data__.requests !== undefined) {
    this.__update__.requests(__data__.requests);
  }
  this.onUpdate(__data__);
};

/**
 * @class
 */
function panel_for0() {
  Monkberry.call(this);
  this.__state__ = {};
  var _this = this;

  // Create elements
  var tr0 = document.createElement('tr');
  var td1 = document.createElement('td');
  var children0 = new Monkberry.Map();
  var td2 = document.createElement('td');
  var text3 = document.createTextNode('');
  var text4 = document.createTextNode('');

  // Construct dom
  td2.appendChild(text3);
  td2.appendChild(document.createTextNode(" "));
  td2.appendChild(text4);
  tr0.appendChild(td1);
  tr0.appendChild(td2);

  // Update functions
  this.__update__ = {
    response: function (response) {
      Monkberry.loop(_this, td1, children0, panel_for0_for0, response.headers);
    },
    request: function (request) {
      text3.textContent = request.method;
      text4.textContent = request.url;
    }
  };

  // On update actions
  this.onUpdate = function (__data__) {
    children0.forEach(function (view) {
      view.update(view.__state__);
    });
  };

  // Set root nodes
  this.nodes = [tr0];
}
panel_for0.prototype = Object.create(Monkberry.prototype);
panel_for0.prototype.constructor = panel_for0;
panel_for0.pool = [];
panel_for0.prototype.update = function (__data__) {
  if (__data__.response !== undefined) {
    this.__update__.response(__data__.response);
  }
  if (__data__.request !== undefined) {
    this.__update__.request(__data__.request);
  }
  this.onUpdate(__data__);
};

/**
 * @class
 */
function panel_for0_for0() {
  Monkberry.call(this);
  this.__state__ = {};

  // Create elements
  var strong0 = document.createElement('strong');
  var text1 = document.createTextNode('');
  var text2 = document.createTextNode('');
  var br3 = document.createElement('br');

  // Construct dom
  strong0.appendChild(text1);

  // Update functions
  this.__update__ = {
    name: function (name) {
      text1.textContent = name;
    },
    value: function (value) {
      text2.textContent = value;
    }
  };

  // Set root nodes
  this.nodes = [strong0, document.createTextNode(": "), text2, br3];
}
panel_for0_for0.prototype = Object.create(Monkberry.prototype);
panel_for0_for0.prototype.constructor = panel_for0_for0;
panel_for0_for0.pool = [];
panel_for0_for0.prototype.update = function (__data__) {
  if (__data__.name !== undefined) {
    this.__update__.name(__data__.name);
  }
  if (__data__.value !== undefined) {
    this.__update__.value(__data__.value);
  }
};

module.exports = panel;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Monkberry = __webpack_require__(0);

/**
 * @class
 */
function toolbar() {
  Monkberry.call(this);

  // Create elements
  var div0 = document.createElement('div');
  var div1 = document.createElement('div');
  var select2 = document.createElement('select');
  var option3 = document.createElement('option');
  var option4 = document.createElement('option');
  var div5 = document.createElement('div');
  var input6 = document.createElement('input');
  var div7 = document.createElement('div');
  var input8 = document.createElement('input');

  // Construct dom
  option3.appendChild(document.createTextNode("Reponse headers"));
  option3.value = "response";
  option3.selected = true;
  option4.appendChild(document.createTextNode("Request headers"));
  option4.value = "request";
  select2.appendChild(option3);
  select2.appendChild(option4);
  select2.setAttribute("class", "pure-input-1");
  div1.appendChild(select2);
  div1.setAttribute("class", "pure-u-1-3");
  input6.id = "nameRegex";
  input6.setAttribute("type", "text");
  input6.setAttribute("class", "pure-input-1");
  input6.setAttribute("placeholder", "Header name regex");
  div5.appendChild(input6);
  div5.setAttribute("class", "pure-u-1-3");
  input8.id = "valueRegex";
  input8.setAttribute("type", "text");
  input8.setAttribute("class", "pure-input-1");
  input8.setAttribute("placeholder", "Header value regex");
  div7.appendChild(input8);
  div7.setAttribute("class", "pure-u-1-3");
  div0.appendChild(div1);
  div0.appendChild(div5);
  div0.appendChild(div7);
  div0.setAttribute("class", "pure-g pure-form toolbar");

  // Set root nodes
  this.nodes = [div0];
}
toolbar.prototype = Object.create(Monkberry.prototype);
toolbar.prototype.constructor = toolbar;
toolbar.pool = [];
toolbar.prototype.update = function (__data__) {
};

module.exports = toolbar;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Filter = __webpack_require__(6);

function RequestListener(view) {
    this.requests = [];
    this.view = view;
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
    request.response.headers = this.filter.filterHeaders(request.response.headers, 'name', this.nameRegex.value);
    request.response.headers = this.filter.filterHeaders(request.response.headers, 'value', this.valueRegex.value);
    if(request.response.headers.length > 0) {
        this.requests.push(request);
        this.updateView();
    }
};

RequestListener.prototype.updateView = function() {
    this.view.update({ requests: this.requests});
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);