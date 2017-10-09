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
    Panel = __webpack_require__(3);

const view = Monkberry.render(Panel, document.body);
view.update({name: 'World'});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Monkberry = __webpack_require__(0);

/**
 * @class
 */
function panel() {
  Monkberry.call(this);

  // Create elements
  var div0 = document.createElement('div');
  var input1 = document.createElement('input');
  var div2 = document.createElement('div');

  // Construct dom
  input1.setAttribute("type", "text");
  div2.id = "events";
  div0.appendChild(input1);
  div0.appendChild(div2);

  // Set root nodes
  this.nodes = [div0];
}
panel.prototype = Object.create(Monkberry.prototype);
panel.prototype.constructor = panel;
panel.pool = [];
panel.prototype.update = function (__data__) {
};

module.exports = panel;


/***/ })
/******/ ]);