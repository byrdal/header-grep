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

var Monkberry       = __webpack_require__(0),
    MonkberryEvents = __webpack_require__(3),
    Panel           = __webpack_require__(6),
    RequestListener = __webpack_require__(8);

const filters = {
    count: function(array) {
        return array.length;
    }
};

var toggleRequestList = function(event) {
    this.parentNode.querySelector('.request-header').classList.toggle("expanded");
    this.parentNode.querySelector('.request-list').classList.toggle('collapsed');
};

var view = Monkberry.render(Panel, document.body, {filters: filters});
view.on('click', '.header-root', toggleRequestList, false);

var listener = new RequestListener(view);
listener.addListeners();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _monkberry = __webpack_require__(0);

var _monkberry2 = _interopRequireDefault(_monkberry);

var _domDelegate = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_monkberry2.default.prototype.on = function (eventType, selector, handler) {
  var _this = this;

  var useCapture = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];

  if (!this.delegates) {
    this.delegates = [];
    this.nodes.forEach(function (node, i) {
      if (node.nodeType === 8) {
        throw 'Can not use event delegating with non-element nodes on first level.';
      }

      _this.delegates[i] = new _domDelegate.Delegate(node);
    });
  }

  this.delegates.forEach(function (delegate) {
    return delegate.on(eventType, selector, handler, useCapture);
  });
};

_monkberry2.default.prototype.off = function () {
  var eventType = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
  var selector = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
  var handler = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];
  var useCapture = arguments.length <= 3 || arguments[3] === undefined ? undefined : arguments[3];

  this.delegates.forEach(function (delegate) {
    return delegate.off(eventType, selector, handler, useCapture);
  });
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jshint browser:true, node:true*/



/**
 * @preserve Create and manage a DOM event delegator.
 *
 * @version 0.3.0
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */
var Delegate = __webpack_require__(5);

module.exports = function(root) {
  return new Delegate(root);
};

module.exports.Delegate = Delegate;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jshint browser:true, node:true*/



module.exports = Delegate;

/**
 * DOM event delegator
 *
 * The delegator will listen
 * for events that bubble up
 * to the root node.
 *
 * @constructor
 * @param {Node|string} [root] The root node or a selector string matching the root node
 */
function Delegate(root) {

  /**
   * Maintain a map of listener
   * lists, keyed by event name.
   *
   * @type Object
   */
  this.listenerMap = [{}, {}];
  if (root) {
    this.root(root);
  }

  /** @type function() */
  this.handle = Delegate.prototype.handle.bind(this);
}

/**
 * Start listening for events
 * on the provided DOM element
 *
 * @param  {Node|string} [root] The root node or a selector string matching the root node
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.root = function(root) {
  var listenerMap = this.listenerMap;
  var eventType;

  // Remove master event listeners
  if (this.rootElement) {
    for (eventType in listenerMap[1]) {
      if (listenerMap[1].hasOwnProperty(eventType)) {
        this.rootElement.removeEventListener(eventType, this.handle, true);
      }
    }
    for (eventType in listenerMap[0]) {
      if (listenerMap[0].hasOwnProperty(eventType)) {
        this.rootElement.removeEventListener(eventType, this.handle, false);
      }
    }
  }

  // If no root or root is not
  // a dom node, then remove internal
  // root reference and exit here
  if (!root || !root.addEventListener) {
    if (this.rootElement) {
      delete this.rootElement;
    }
    return this;
  }

  /**
   * The root node at which
   * listeners are attached.
   *
   * @type Node
   */
  this.rootElement = root;

  // Set up master event listeners
  for (eventType in listenerMap[1]) {
    if (listenerMap[1].hasOwnProperty(eventType)) {
      this.rootElement.addEventListener(eventType, this.handle, true);
    }
  }
  for (eventType in listenerMap[0]) {
    if (listenerMap[0].hasOwnProperty(eventType)) {
      this.rootElement.addEventListener(eventType, this.handle, false);
    }
  }

  return this;
};

/**
 * @param {string} eventType
 * @returns boolean
 */
Delegate.prototype.captureForType = function(eventType) {
  return ['blur', 'error', 'focus', 'load', 'resize', 'scroll'].indexOf(eventType) !== -1;
};

/**
 * Attach a handler to one
 * event for all elements
 * that match the selector,
 * now or in the future
 *
 * The handler function receives
 * three arguments: the DOM event
 * object, the node that matched
 * the selector while the event
 * was bubbling and a reference
 * to itself. Within the handler,
 * 'this' is equal to the second
 * argument.
 *
 * The node that actually received
 * the event can be accessed via
 * 'event.target'.
 *
 * @param {string} eventType Listen for these events
 * @param {string|undefined} selector Only handle events on elements matching this selector, if undefined match root element
 * @param {function()} handler Handler function - event data passed here will be in event.data
 * @param {Object} [eventData] Data to pass in event.data
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.on = function(eventType, selector, handler, useCapture) {
  var root, listenerMap, matcher, matcherParam;

  if (!eventType) {
    throw new TypeError('Invalid event type: ' + eventType);
  }

  // handler can be passed as
  // the second or third argument
  if (typeof selector === 'function') {
    useCapture = handler;
    handler = selector;
    selector = null;
  }

  // Fallback to sensible defaults
  // if useCapture not set
  if (useCapture === undefined) {
    useCapture = this.captureForType(eventType);
  }

  if (typeof handler !== 'function') {
    throw new TypeError('Handler must be a type of Function');
  }

  root = this.rootElement;
  listenerMap = this.listenerMap[useCapture ? 1 : 0];

  // Add master handler for type if not created yet
  if (!listenerMap[eventType]) {
    if (root) {
      root.addEventListener(eventType, this.handle, useCapture);
    }
    listenerMap[eventType] = [];
  }

  if (!selector) {
    matcherParam = null;

    // COMPLEX - matchesRoot needs to have access to
    // this.rootElement, so bind the function to this.
    matcher = matchesRoot.bind(this);

  // Compile a matcher for the given selector
  } else if (/^[a-z]+$/i.test(selector)) {
    matcherParam = selector;
    matcher = matchesTag;
  } else if (/^#[a-z0-9\-_]+$/i.test(selector)) {
    matcherParam = selector.slice(1);
    matcher = matchesId;
  } else {
    matcherParam = selector;
    matcher = matches;
  }

  // Add to the list of listeners
  listenerMap[eventType].push({
    selector: selector,
    handler: handler,
    matcher: matcher,
    matcherParam: matcherParam
  });

  return this;
};

/**
 * Remove an event handler
 * for elements that match
 * the selector, forever
 *
 * @param {string} [eventType] Remove handlers for events matching this type, considering the other parameters
 * @param {string} [selector] If this parameter is omitted, only handlers which match the other two will be removed
 * @param {function()} [handler] If this parameter is omitted, only handlers which match the previous two will be removed
 * @returns {Delegate} This method is chainable
 */
Delegate.prototype.off = function(eventType, selector, handler, useCapture) {
  var i, listener, listenerMap, listenerList, singleEventType;

  // Handler can be passed as
  // the second or third argument
  if (typeof selector === 'function') {
    useCapture = handler;
    handler = selector;
    selector = null;
  }

  // If useCapture not set, remove
  // all event listeners
  if (useCapture === undefined) {
    this.off(eventType, selector, handler, true);
    this.off(eventType, selector, handler, false);
    return this;
  }

  listenerMap = this.listenerMap[useCapture ? 1 : 0];
  if (!eventType) {
    for (singleEventType in listenerMap) {
      if (listenerMap.hasOwnProperty(singleEventType)) {
        this.off(singleEventType, selector, handler);
      }
    }

    return this;
  }

  listenerList = listenerMap[eventType];
  if (!listenerList || !listenerList.length) {
    return this;
  }

  // Remove only parameter matches
  // if specified
  for (i = listenerList.length - 1; i >= 0; i--) {
    listener = listenerList[i];

    if ((!selector || selector === listener.selector) && (!handler || handler === listener.handler)) {
      listenerList.splice(i, 1);
    }
  }

  // All listeners removed
  if (!listenerList.length) {
    delete listenerMap[eventType];

    // Remove the main handler
    if (this.rootElement) {
      this.rootElement.removeEventListener(eventType, this.handle, useCapture);
    }
  }

  return this;
};


/**
 * Handle an arbitrary event.
 *
 * @param {Event} event
 */
Delegate.prototype.handle = function(event) {
  var i, l, type = event.type, root, phase, listener, returned, listenerList = [], target, /** @const */ EVENTIGNORE = 'ftLabsDelegateIgnore';

  if (event[EVENTIGNORE] === true) {
    return;
  }

  target = event.target;

  // Hardcode value of Node.TEXT_NODE
  // as not defined in IE8
  if (target.nodeType === 3) {
    target = target.parentNode;
  }

  root = this.rootElement;

  phase = event.eventPhase || ( event.target !== event.currentTarget ? 3 : 2 );
  
  switch (phase) {
    case 1: //Event.CAPTURING_PHASE:
      listenerList = this.listenerMap[1][type];
    break;
    case 2: //Event.AT_TARGET:
      if (this.listenerMap[0] && this.listenerMap[0][type]) listenerList = listenerList.concat(this.listenerMap[0][type]);
      if (this.listenerMap[1] && this.listenerMap[1][type]) listenerList = listenerList.concat(this.listenerMap[1][type]);
    break;
    case 3: //Event.BUBBLING_PHASE:
      listenerList = this.listenerMap[0][type];
    break;
  }

  // Need to continuously check
  // that the specific list is
  // still populated in case one
  // of the callbacks actually
  // causes the list to be destroyed.
  l = listenerList.length;
  while (target && l) {
    for (i = 0; i < l; i++) {
      listener = listenerList[i];

      // Bail from this loop if
      // the length changed and
      // no more listeners are
      // defined between i and l.
      if (!listener) {
        break;
      }

      // Check for match and fire
      // the event if there's one
      //
      // TODO:MCG:20120117: Need a way
      // to check if event#stopImmediatePropagation
      // was called. If so, break both loops.
      if (listener.matcher.call(target, listener.matcherParam, target)) {
        returned = this.fire(event, target, listener);
      }

      // Stop propagation to subsequent
      // callbacks if the callback returned
      // false
      if (returned === false) {
        event[EVENTIGNORE] = true;
        event.preventDefault();
        return;
      }
    }

    // TODO:MCG:20120117: Need a way to
    // check if event#stopPropagation
    // was called. If so, break looping
    // through the DOM. Stop if the
    // delegation root has been reached
    if (target === root) {
      break;
    }

    l = listenerList.length;
    target = target.parentElement;
  }
};

/**
 * Fire a listener on a target.
 *
 * @param {Event} event
 * @param {Node} target
 * @param {Object} listener
 * @returns {boolean}
 */
Delegate.prototype.fire = function(event, target, listener) {
  return listener.handler.call(target, event, target);
};

/**
 * Check whether an element
 * matches a generic selector.
 *
 * @type function()
 * @param {string} selector A CSS selector
 */
var matches = (function(el) {
  if (!el) return;
  var p = el.prototype;
  return (p.matches || p.matchesSelector || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || p.oMatchesSelector);
}(Element));

/**
 * Check whether an element
 * matches a tag selector.
 *
 * Tags are NOT case-sensitive,
 * except in XML (and XML-based
 * languages such as XHTML).
 *
 * @param {string} tagName The tag name to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */
function matchesTag(tagName, element) {
  return tagName.toLowerCase() === element.tagName.toLowerCase();
}

/**
 * Check whether an element
 * matches the root.
 *
 * @param {?String} selector In this case this is always passed through as null and not used
 * @param {Element} element The element to test with
 * @returns boolean
 */
function matchesRoot(selector, element) {
  /*jshint validthis:true*/
  if (this.rootElement === window) return element === document;
  return this.rootElement === element;
}

/**
 * Check whether the ID of
 * the element in 'this'
 * matches the given ID.
 *
 * IDs are case-sensitive.
 *
 * @param {string} id The ID to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */
function matchesId(id, element) {
  return id === element.id;
}

/**
 * Short hand for off()
 * and root(), ie both
 * with no parameters
 *
 * @return void
 */
Delegate.prototype.destroy = function() {
  this.off();
  this.root();
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Monkberry = __webpack_require__(0);
var Toolbar = __requireDefault(__webpack_require__(7));
function __requireDefault(obj) { return obj && obj.__esModule ? obj.default : obj; }

/**
 * @class
 */
function panel() {
  Monkberry.call(this);
  var _this = this;

  // Create elements
  var div0 = document.createElement('div');
  var custom0 = document.createComment('Toolbar');
  var child0 = {};
  var for1 = document.createComment('for');
  var children1 = new Monkberry.Map();

  // Construct dom
  div0.appendChild(custom0);
  div0.appendChild(for1);

  // Update functions
  this.__update__ = {
    headerMap: function (headerMap) {
      Monkberry.loop(_this, for1, children1, panel_for0, headerMap);
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
  this.nodes = [div0];
}
panel.prototype = Object.create(Monkberry.prototype);
panel.prototype.constructor = panel;
panel.pool = [];
panel.prototype.update = function (__data__) {
  if (__data__.headerMap !== undefined) {
    this.__update__.headerMap(__data__.headerMap);
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
  var div0 = document.createElement('div');
  var div1 = document.createElement('div');
  var span2 = document.createElement('span');
  var strong3 = document.createElement('strong');
  var text4 = document.createTextNode('');
  var text5 = document.createTextNode('');
  var span6 = document.createElement('span');
  var text7 = document.createTextNode('');
  var div8 = document.createElement('div');
  var table9 = document.createElement('table');
  var tbody10 = document.createElement('tbody');
  var children0 = new Monkberry.Map();

  // Construct dom
  strong3.appendChild(text4);
  span2.appendChild(strong3);
  span2.appendChild(document.createTextNode(": "));
  span2.appendChild(text5);
  span2.setAttribute("class", "request-header");
  span6.appendChild(text7);
  span6.setAttribute("class", "badge");
  div1.appendChild(span2);
  div1.appendChild(span6);
  div1.setAttribute("class", "header-root");
  table9.appendChild(tbody10);
  table9.setAttribute("class", "pure-table pure-table-striped request-table");
  div8.appendChild(table9);
  div8.setAttribute("class", "request-list collapsed");
  div0.appendChild(div1);
  div0.appendChild(div8);

  // Update functions
  this.__update__ = {
    header: function (header) {
      text4.textContent = header.name;
      text5.textContent = header.value;
    },
    requests: function (requests) {
      text7.textContent = _this.filters.count(requests);
      Monkberry.loop(_this, tbody10, children0, panel_for0_for0, requests);
    }
  };

  // On update actions
  this.onUpdate = function (__data__) {
    children0.forEach(function (view) {
      view.update(view.__state__);
    });
  };

  // Set root nodes
  this.nodes = [div0];
}
panel_for0.prototype = Object.create(Monkberry.prototype);
panel_for0.prototype.constructor = panel_for0;
panel_for0.pool = [];
panel_for0.prototype.update = function (__data__) {
  if (__data__.header !== undefined) {
    this.__update__.header(__data__.header);
  }
  if (__data__.requests !== undefined) {
    this.__update__.requests(__data__.requests);
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
  var tr0 = document.createElement('tr');
  var td1 = document.createElement('td');
  var text2 = document.createTextNode('');
  var td3 = document.createElement('td');
  var text4 = document.createTextNode('');

  // Construct dom
  td1.appendChild(text2);
  td3.appendChild(text4);
  tr0.appendChild(td1);
  tr0.appendChild(td3);

  // Update functions
  this.__update__ = {
    method: function (method) {
      text2.textContent = method;
    },
    url: function (url) {
      text4.textContent = url;
    }
  };

  // Set root nodes
  this.nodes = [tr0];
}
panel_for0_for0.prototype = Object.create(Monkberry.prototype);
panel_for0_for0.prototype.constructor = panel_for0_for0;
panel_for0_for0.pool = [];
panel_for0_for0.prototype.update = function (__data__) {
  if (__data__.method !== undefined) {
    this.__update__.method(__data__.method);
  }
  if (__data__.url !== undefined) {
    this.__update__.url(__data__.url);
  }
};

module.exports = panel;


/***/ }),
/* 7 */
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
  select2.id = "headerSelect";
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Filter = __webpack_require__(9);

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

/***/ }),
/* 9 */
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