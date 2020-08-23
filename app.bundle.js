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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "body, html {\n    margin: 0px;\n    overflow: hidden;\n}\n\ncanvas {\n    background-color: black;\n}", "",{"version":3,"sources":["style.css"],"names":[],"mappings":"AAAA;IACI,WAAW;IACX,gBAAgB;AACpB;;AAEA;IACI,uBAAuB;AAC3B","file":"style.css","sourcesContent":["body, html {\n    margin: 0px;\n    overflow: hidden;\n}\n\ncanvas {\n    background-color: black;\n}"]}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/rand-seed/dist/rand-seed.es.js":
/*!*****************************************************!*\
  !*** ./node_modules/rand-seed/dist/rand-seed.es.js ***!
  \*****************************************************/
/*! exports provided: default, PRNG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRNG", function() { return n; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var t=function(r,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var n in r)r.hasOwnProperty(n)&&(t[n]=r[n])})(r,n)};function r(r,n){function i(){this.constructor=r}t(r,n),r.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}var n,i=function(){function t(){}return t._xfnv1a=function(t){for(var r=2166136261,n=0;n<t.length;n++)r=Math.imul(r^t.charCodeAt(n),16777619);return function(){return r+=r<<13,r^=r>>>7,r+=r<<3,r^=r>>>17,(r+=r<<5)>>>0}},t}(),s=function(t){function n(r){var i=t.call(this)||this;return i._a=n._xfnv1a(r)(),i}return r(n,t),n.prototype.next=function(){var t=this._a+=1831565813;return t=Math.imul(t^t>>>15,1|t),(((t^=t+Math.imul(t^t>>>7,61|t))^t>>>14)>>>0)/4294967296},n}(i),e=function(t){function n(r){var i=t.call(this)||this,s=n._xfnv1a(r);return i._a=s(),i._b=s(),i._c=s(),i._d=s(),i}return r(n,t),n.prototype.next=function(){this._a>>>=0,this._b>>>=0,this._c>>>=0,this._d>>>=0;var t=this._a+this._b|0;return this._a=this._b^this._b>>>9,this._b=this._c+(this._c<<3)|0,this._c=this._c<<21|this._c>>>11,this._d=this._d+1|0,t=t+this._d|0,this._c=this._c+t|0,(t>>>0)/4294967296},n}(i),o=function(t){function n(r){var i=t.call(this)||this,s=n._xfnv1a(r);return i._a=s(),i._b=s(),i._c=s(),i._d=s(),i}return r(n,t),n.prototype.next=function(){var t=this._b<<9,r=5*this._a;return r=9*(r<<7|r>>>25),this._c^=this._a,this._d^=this._b,this._b^=this._c,this._a^=this._d,this._c^=t,this._d=this._d<<11|this._d>>>21,(r>>>0)/4294967296},n}(i);!function(t){t.sfc32="sfc32",t.mulberry32="mulberry32",t.xoshiro128ss="xoshiro128ss"}(n||(n={}));var _=function(){function t(t,r){void 0===r&&(r=n.sfc32),this._str=t,this._prng=r,this._generator=this._initializeGenerator()}return t.prototype.next=function(){return this._generator.next()},t.prototype._initializeGenerator=function(){if(function(t){return null===t}(t=this._str)||function(t){return void 0===t}(t))return this._wrap();var t;switch(this._prng){case"sfc32":return new e(this._str);case"mulberry32":return new s(this._str);case"xoshiro128ss":return new o(this._str);default:return this._wrap()}},t.prototype._wrap=function(){return{next:function(){return Math.random()}}},t}();/* harmony default export */ __webpack_exports__["default"] = (_);
//# sourceMappingURL=rand-seed.es.js.map


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stars__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stars */ "./src/stars.ts");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_1__);


var MAP_SIZE = 1000, SECTOR_SIZE = 500, STAR_DENSITY = 15;
var db = _stars__WEBPACK_IMPORTED_MODULE_0__["StarDB"].generateUniverse('stars! is awesome', MAP_SIZE, SECTOR_SIZE, STAR_DENSITY);
var mapState = {
    translateX: 0,
    translateY: 0,
    scale: 1.0,
    scalePointX: 0,
    scalePointY: 0,
};
var lastMouse = null;
function resize_canvas() {
    var canvas = document.getElementById("canvas");
    if (canvas.width < window.innerWidth) {
        canvas.width = window.innerWidth;
    }
    if (canvas.height < window.innerHeight) {
        canvas.height = window.innerHeight;
    }
}
function transform(point) {
    return {
        x: point.x * mapState.scale + mapState.translateX,
        y: point.y * mapState.scale + mapState.translateY
    };
}
function transformScreenToMap(point) {
    return {
        x: (point.x - mapState.translateX) / mapState.scale,
        y: (point.y - mapState.translateY) / mapState.scale
    };
}
function draw() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    // project screen viewport into map coordinates
    var tlScreen = { x: 0, y: 0 };
    var brScreen = { x: canvas.width, y: canvas.height };
    var tlMap = transformScreenToMap(tlScreen);
    var brMap = transformScreenToMap(brScreen);
    var sxMin = Math.floor(tlMap.x / SECTOR_SIZE);
    var syMin = Math.floor(tlMap.y / SECTOR_SIZE);
    var sxMax = Math.ceil(brMap.x / SECTOR_SIZE);
    var syMax = Math.ceil(brMap.y / SECTOR_SIZE);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "blue";
    //ctx.strokeRect(tlScreen.x, tlScreen.y, brScreen.x - tlScreen.x, brScreen.y - tlScreen.y);
    ctx.strokeStyle = "gray";
    ctx.setLineDash([10, 10]);
    var sectors = db.getSectors(sxMin, syMin, sxMax, syMax);
    for (var sx = sxMin; sx < sxMax; sx++) {
        var sectX = sectors[sx];
        if (!sectX)
            continue;
        for (var sy = syMin; sy < syMax; sy++) {
            var sectY = sectX[sy];
            if (!sectY)
                continue;
            var tlSect = transform({ x: sx * SECTOR_SIZE, y: sy * SECTOR_SIZE });
            var brSect = transform({ x: (sx + 1) * SECTOR_SIZE, y: (sy + 1) * SECTOR_SIZE });
            //ctx.strokeRect(tlSect.x, tlSect.y, brSect.x - tlSect.x, brSect.y - tlSect.y);
            for (var _i = 0, sectY_1 = sectY; _i < sectY_1.length; _i++) {
                var star = sectY_1[_i];
                var tp = transform(star);
                ctx.fillStyle = "white";
                ctx.beginPath();
                var r = 5 * mapState.scale;
                ctx.arc(tp.x, tp.y, r, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }
    ctx.font = "16px Courier New";
    ctx.fillStyle = "red";
    ctx.fillText("translate: (" + mapState.translateX + ", " + mapState.translateY + ")", 10, 16);
    ctx.fillText("    scale: " + mapState.scale, 10, 32);
    ctx.fillText(" viewport: (" + tlMap.x + ", " + tlMap.y + "), (" + brMap.x + ", " + brMap.y + ")", 10, 48);
    ctx.fillText("  sectors: (" + sxMin + ", " + syMin + "), (" + sxMax + ", " + syMax + ")", 10, 64);
}
window.onload = function () {
    var canvas = document.getElementById('canvas');
    resize_canvas();
    mapState.translateX = canvas.width / 2;
    mapState.translateY = canvas.height / 2;
    draw();
    canvas.addEventListener('contextmenu', function (event) { return event.preventDefault(); });
    canvas.addEventListener('mousedown', function (e) {
        if (e.buttons == 2) {
            lastMouse = { x: e.clientX, y: e.clientY };
        }
    });
    canvas.addEventListener('mouseup', function (e) {
        if (lastMouse != null) {
            lastMouse = null;
            return;
        }
        //console.log(`click: (${e.clientX}, ${e.clientY})`);
        //points.push({x: e.clientX, y: e.clientY});
        //draw();
    });
    canvas.addEventListener('mousemove', function (e) {
        if (e.buttons != 2) {
            return;
        }
        var deltaX = e.clientX - lastMouse.x;
        var deltaY = e.clientY - lastMouse.y;
        mapState.translateX += deltaX;
        mapState.translateY += deltaY;
        draw();
        lastMouse = { x: e.clientX, y: e.clientY };
    });
    canvas.addEventListener('wheel', function (e) {
        // mapState.scale = Math.max(0.05, Math.min(mapState.scale + 0.001 * e.deltaY, 3));
        // mapState.scalePointX = e.clientX;
        // mapState.scalePointY = e.clientY;
        var oldScale = mapState.scale;
        var newScale = Math.max(0.3, Math.min(mapState.scale + (mapState.scale * 0.005) * e.deltaY, 30));
        var zoomPoint = transformScreenToMap({ x: e.clientX, y: e.clientY });
        var scaleDelta = newScale - oldScale;
        mapState.scale = newScale;
        mapState.translateX -= zoomPoint.x * scaleDelta;
        mapState.translateY -= zoomPoint.y * scaleDelta;
        draw();
    });
};


/***/ }),

/***/ "./src/stars.ts":
/*!**********************!*\
  !*** ./src/stars.ts ***!
  \**********************/
/*! exports provided: StarDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StarDB", function() { return StarDB; });
/* harmony import */ var rand_seed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rand-seed */ "./node_modules/rand-seed/dist/rand-seed.es.js");

var StarDB = /** @class */ (function () {
    function StarDB(seed, sectorSize, starDensity) {
        this._stars = [];
        this._sectors = [];
        this._sectorSize = sectorSize;
        this._starDensity = starDensity;
        this._rand = new rand_seed__WEBPACK_IMPORTED_MODULE_0__["default"](seed);
    }
    StarDB.prototype.getSectors = function (minX, minY, maxX, maxY) {
        var block = [];
        for (var sx = minX; sx < maxX; sx++) {
            block[sx] = [];
            for (var sy = minY; sy < maxY; sy++) {
                block[sx][sy] = this.getSectorStars(sx, sy);
            }
        }
        return block;
    };
    StarDB.prototype.getSectorStars = function (sx, sy) {
        var sectX = this._sectors[sx];
        if (!sectX) {
            // we've never generated this sector column
            sectX = [];
            this._sectors[sx] = sectX;
        }
        var sector = sectX[sy];
        if (!sector) {
            // we've never generated this sector, time to do it
            sector = this.generateSector(sx, sy);
            sectX[sy] = sector;
        }
        var stars = [];
        for (var _i = 0, sector_1 = sector; _i < sector_1.length; _i++) {
            var starIdx = sector_1[_i];
            stars.push(this._stars[starIdx]);
        }
        return stars;
    };
    StarDB.prototype.generateStar = function (x, y) {
        var s = {
            id: this._stars.length,
            x: x, y: y,
            sx: Math.floor(x / this._sectorSize),
            sy: Math.floor(y / this._sectorSize)
        };
        this._stars.push(s);
        return s;
    };
    StarDB.prototype.generateSector = function (sx, sy) {
        // each sector has +/-10% of _starDensity
        var count = Math.floor(this._rand.next() * 2 * this._starDensity * 0.1 + this._starDensity * 0.9);
        var sector = [];
        console.log("Generating sector (" + sx + ", " + sy + ") with " + count + " stars");
        // generate 'count' random stars with random positions
        for (var i = 0; i < count; i++) {
            var x = Math.floor((this._rand.next() + sx) * this._sectorSize);
            var y = Math.floor((this._rand.next() + sy) * this._sectorSize);
            var s = this.generateStar(x, y);
            sector.push(s.id);
        }
        // now we do a little bit of gravity clumping - for each star, calculate
        // the average of all vectors to each other star in the sector, weighted
        // by distance (closer stars have more of an effect), then move the star
        // 50% of the average.
        for (var _i = 0, sector_2 = sector; _i < sector_2.length; _i++) {
            var starIdx = sector_2[_i];
            var star = this._stars[starIdx];
            var avg = { x: 0, y: 0 };
            for (var _a = 0, sector_3 = sector; _a < sector_3.length; _a++) {
                var otherStarIdx = sector_3[_a];
                var otherStar = this._stars[otherStarIdx];
                if (star.id === otherStar.id)
                    continue; // skip ourselves
                // get vector and magnitude from star to otherStar
                var v = { x: otherStar.x - star.x, y: otherStar.y - star.y };
                var d = Math.sqrt(v.x * v.x + v.y * v.y);
                // add vector into running total, weight by distance
                avg.x += v.x / d;
                avg.y += v.y / d;
            }
            // calculate average
            avg.x = avg.x / (sector.length - 1);
            avg.y = avg.y / (sector.length - 1);
            // move our star along the average vector 50%
            star.x += avg.x * 0.5;
            star.y += avg.y * 0.5;
        }
        return sector;
    };
    StarDB.generateUniverse = function (seed, mapSize, sectorSize, starDensity) {
        var db = new StarDB(seed, sectorSize, starDensity);
        var sectorCount = mapSize / sectorSize;
        for (var sx = -sectorCount; sx < sectorCount; sx++) {
            db._sectors[sx] = [];
            for (var sy = -sectorCount; sy < sectorCount; sy++) {
                var sector = db.generateSector(sx, sy);
                db._sectors[sx][sy] = sector;
            }
        }
        return db;
    };
    return StarDB;
}());



/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yYW5kLXNlZWQvZGlzdC9yYW5kLXNlZWQuZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlLmNzcz83MTYzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtB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ckQsSUFBTSxXQUFXLEdBQUcsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUV6QyxLQUFLLElBQUksRUFBRSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxXQUFXLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDaEQsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDckIsS0FBSyxJQUFJLEVBQUUsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFLEdBQUcsV0FBVyxFQUFFLEVBQUUsRUFBRSxFQUFFO2dCQUNoRCxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDekMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUM7YUFDaEM7U0FDSjtRQUVELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDOzs7Ozs7Ozs7Ozs7O0FDOUhELFVBQVUsbUJBQU8sQ0FBQyxtSkFBd0U7QUFDMUYsMEJBQTBCLG1CQUFPLENBQUMsa0hBQXNEOztBQUV4Rjs7QUFFQTtBQUNBLDBCQUEwQixRQUFTO0FBQ25DOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7QUFJQSxzQyIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18odHJ1ZSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJib2R5LCBodG1sIHtcXG4gICAgbWFyZ2luOiAwcHg7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbmNhbnZhcyB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJzdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxXQUFXO0lBQ1gsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksdUJBQXVCO0FBQzNCXCIsXCJmaWxlXCI6XCJzdHlsZS5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSwgaHRtbCB7XFxuICAgIG1hcmdpbjogMHB4O1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG5jYW52YXMge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XCJdfV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXNlU291cmNlTWFwKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKTtcblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmV0dXJuIFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChjb250ZW50LCBcIn1cIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oJycpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnksIGRlZHVwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgJyddXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG1vZHVsZXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYVF1ZXJ5KSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMl0gPSBcIlwiLmNvbmNhdChtZWRpYVF1ZXJ5LCBcIiBhbmQgXCIpLmNvbmNhdChpdGVtWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTtcblxuZnVuY3Rpb24gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdIHx8ICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcblxuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCAnJykuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufSAvLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5cblxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG4gIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgcmV0dXJuIFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbn0iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cbnZhciB0PWZ1bmN0aW9uKHIsbil7cmV0dXJuKHQ9T2JqZWN0LnNldFByb3RvdHlwZU9mfHx7X19wcm90b19fOltdfWluc3RhbmNlb2YgQXJyYXkmJmZ1bmN0aW9uKHQscil7dC5fX3Byb3RvX189cn18fGZ1bmN0aW9uKHQscil7Zm9yKHZhciBuIGluIHIpci5oYXNPd25Qcm9wZXJ0eShuKSYmKHRbbl09cltuXSl9KShyLG4pfTtmdW5jdGlvbiByKHIsbil7ZnVuY3Rpb24gaSgpe3RoaXMuY29uc3RydWN0b3I9cn10KHIsbiksci5wcm90b3R5cGU9bnVsbD09PW4/T2JqZWN0LmNyZWF0ZShuKTooaS5wcm90b3R5cGU9bi5wcm90b3R5cGUsbmV3IGkpfXZhciBuLGk9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KCl7fXJldHVybiB0Ll94Zm52MWE9ZnVuY3Rpb24odCl7Zm9yKHZhciByPTIxNjYxMzYyNjEsbj0wO248dC5sZW5ndGg7bisrKXI9TWF0aC5pbXVsKHJedC5jaGFyQ29kZUF0KG4pLDE2Nzc3NjE5KTtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gcis9cjw8MTMscl49cj4+Pjcscis9cjw8MyxyXj1yPj4+MTcsKHIrPXI8PDUpPj4+MH19LHR9KCkscz1mdW5jdGlvbih0KXtmdW5jdGlvbiBuKHIpe3ZhciBpPXQuY2FsbCh0aGlzKXx8dGhpcztyZXR1cm4gaS5fYT1uLl94Zm52MWEocikoKSxpfXJldHVybiByKG4sdCksbi5wcm90b3R5cGUubmV4dD1mdW5jdGlvbigpe3ZhciB0PXRoaXMuX2ErPTE4MzE1NjU4MTM7cmV0dXJuIHQ9TWF0aC5pbXVsKHRedD4+PjE1LDF8dCksKCgodF49dCtNYXRoLmltdWwodF50Pj4+Nyw2MXx0KSledD4+PjE0KT4+PjApLzQyOTQ5NjcyOTZ9LG59KGkpLGU9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gbihyKXt2YXIgaT10LmNhbGwodGhpcyl8fHRoaXMscz1uLl94Zm52MWEocik7cmV0dXJuIGkuX2E9cygpLGkuX2I9cygpLGkuX2M9cygpLGkuX2Q9cygpLGl9cmV0dXJuIHIobix0KSxuLnByb3RvdHlwZS5uZXh0PWZ1bmN0aW9uKCl7dGhpcy5fYT4+Pj0wLHRoaXMuX2I+Pj49MCx0aGlzLl9jPj4+PTAsdGhpcy5fZD4+Pj0wO3ZhciB0PXRoaXMuX2ErdGhpcy5fYnwwO3JldHVybiB0aGlzLl9hPXRoaXMuX2JedGhpcy5fYj4+PjksdGhpcy5fYj10aGlzLl9jKyh0aGlzLl9jPDwzKXwwLHRoaXMuX2M9dGhpcy5fYzw8MjF8dGhpcy5fYz4+PjExLHRoaXMuX2Q9dGhpcy5fZCsxfDAsdD10K3RoaXMuX2R8MCx0aGlzLl9jPXRoaXMuX2MrdHwwLCh0Pj4+MCkvNDI5NDk2NzI5Nn0sbn0oaSksbz1mdW5jdGlvbih0KXtmdW5jdGlvbiBuKHIpe3ZhciBpPXQuY2FsbCh0aGlzKXx8dGhpcyxzPW4uX3hmbnYxYShyKTtyZXR1cm4gaS5fYT1zKCksaS5fYj1zKCksaS5fYz1zKCksaS5fZD1zKCksaX1yZXR1cm4gcihuLHQpLG4ucHJvdG90eXBlLm5leHQ9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLl9iPDw5LHI9NSp0aGlzLl9hO3JldHVybiByPTkqKHI8PDd8cj4+PjI1KSx0aGlzLl9jXj10aGlzLl9hLHRoaXMuX2RePXRoaXMuX2IsdGhpcy5fYl49dGhpcy5fYyx0aGlzLl9hXj10aGlzLl9kLHRoaXMuX2NePXQsdGhpcy5fZD10aGlzLl9kPDwxMXx0aGlzLl9kPj4+MjEsKHI+Pj4wKS80Mjk0OTY3Mjk2fSxufShpKTshZnVuY3Rpb24odCl7dC5zZmMzMj1cInNmYzMyXCIsdC5tdWxiZXJyeTMyPVwibXVsYmVycnkzMlwiLHQueG9zaGlybzEyOHNzPVwieG9zaGlybzEyOHNzXCJ9KG58fChuPXt9KSk7dmFyIF89ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KHQscil7dm9pZCAwPT09ciYmKHI9bi5zZmMzMiksdGhpcy5fc3RyPXQsdGhpcy5fcHJuZz1yLHRoaXMuX2dlbmVyYXRvcj10aGlzLl9pbml0aWFsaXplR2VuZXJhdG9yKCl9cmV0dXJuIHQucHJvdG90eXBlLm5leHQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fZ2VuZXJhdG9yLm5leHQoKX0sdC5wcm90b3R5cGUuX2luaXRpYWxpemVHZW5lcmF0b3I9ZnVuY3Rpb24oKXtpZihmdW5jdGlvbih0KXtyZXR1cm4gbnVsbD09PXR9KHQ9dGhpcy5fc3RyKXx8ZnVuY3Rpb24odCl7cmV0dXJuIHZvaWQgMD09PXR9KHQpKXJldHVybiB0aGlzLl93cmFwKCk7dmFyIHQ7c3dpdGNoKHRoaXMuX3Bybmcpe2Nhc2VcInNmYzMyXCI6cmV0dXJuIG5ldyBlKHRoaXMuX3N0cik7Y2FzZVwibXVsYmVycnkzMlwiOnJldHVybiBuZXcgcyh0aGlzLl9zdHIpO2Nhc2VcInhvc2hpcm8xMjhzc1wiOnJldHVybiBuZXcgbyh0aGlzLl9zdHIpO2RlZmF1bHQ6cmV0dXJuIHRoaXMuX3dyYXAoKX19LHQucHJvdG90eXBlLl93cmFwPWZ1bmN0aW9uKCl7cmV0dXJue25leHQ6ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC5yYW5kb20oKX19fSx0fSgpO2V4cG9ydCBkZWZhdWx0IF87ZXhwb3J0e24gYXMgUFJOR307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yYW5kLXNlZWQuZXMuanMubWFwXG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGlzT2xkSUUgPSBmdW5jdGlvbiBpc09sZElFKCkge1xuICB2YXIgbWVtbztcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lbW9yaXplKCkge1xuICAgIGlmICh0eXBlb2YgbWVtbyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG4gICAgICAvLyBUZXN0cyBmb3IgZXhpc3RlbmNlIG9mIHN0YW5kYXJkIGdsb2JhbHMgaXMgdG8gYWxsb3cgc3R5bGUtbG9hZGVyXG4gICAgICAvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcbiAgICAgIC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuICAgICAgbWVtbyA9IEJvb2xlYW4od2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2IpO1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vO1xuICB9O1xufSgpO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gZ2V0VGFyZ2V0KCkge1xuICB2YXIgbWVtbyA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb24gbWVtb3JpemUodGFyZ2V0KSB7XG4gICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBtZW1vW3RhcmdldF07XG4gIH07XG59KCk7XG5cbnZhciBzdHlsZXNJbkRvbSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRG9tLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRG9tW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM11cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlc0luRG9tLnB1c2goe1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiBhZGRTdHlsZShvYmosIG9wdGlvbnMpLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICB2YXIgYXR0cmlidXRlcyA9IG9wdGlvbnMuYXR0cmlidXRlcyB8fCB7fTtcblxuICBpZiAodHlwZW9mIGF0dHJpYnV0ZXMubm9uY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSAndW5kZWZpbmVkJyA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICAgIGlmIChub25jZSkge1xuICAgICAgYXR0cmlidXRlcy5ub25jZSA9IG5vbmNlO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHN0eWxlLnNldEF0dHJpYnV0ZShrZXksIGF0dHJpYnV0ZXNba2V5XSk7XG4gIH0pO1xuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvcHRpb25zLmluc2VydChzdHlsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhcmdldCA9IGdldFRhcmdldChvcHRpb25zLmluc2VydCB8fCAnaGVhZCcpO1xuXG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gICAgfVxuXG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlKSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGUucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxudmFyIHJlcGxhY2VUZXh0ID0gZnVuY3Rpb24gcmVwbGFjZVRleHQoKSB7XG4gIHZhciB0ZXh0U3RvcmUgPSBbXTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJlcGxhY2UoaW5kZXgsIHJlcGxhY2VtZW50KSB7XG4gICAgdGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xuICAgIHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuICB9O1xufSgpO1xuXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcbiAgdmFyIGNzcyA9IHJlbW92ZSA/ICcnIDogb2JqLm1lZGlhID8gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKS5jb25jYXQob2JqLmNzcywgXCJ9XCIpIDogb2JqLmNzczsgLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcbiAgICB2YXIgY2hpbGROb2RlcyA9IHN0eWxlLmNoaWxkTm9kZXM7XG5cbiAgICBpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcbiAgICB9XG5cbiAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlLCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3M7XG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYTtcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKCdtZWRpYScsIG1lZGlhKTtcbiAgfSBlbHNlIHtcbiAgICBzdHlsZS5yZW1vdmVBdHRyaWJ1dGUoJ21lZGlhJyk7XG4gIH1cblxuICBpZiAoc291cmNlTWFwICYmIGJ0b2EpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyIHNpbmdsZXRvbkNvdW50ZXIgPSAwO1xuXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlO1xuICB2YXIgdXBkYXRlO1xuICB2YXIgcmVtb3ZlO1xuXG4gIGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuICAgIHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuICAgIHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuICAgIHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgZmFsc2UpO1xuICAgIHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZSwgc3R5bGVJbmRleCwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUgPSBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gICAgdXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblxuICAgIHJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG4gICAgfTtcbiAgfVxuXG4gIHVwZGF0ZShvYmopO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307IC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxuICAvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXG5cbiAgaWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09ICdib29sZWFuJykge1xuICAgIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuICB9XG5cbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuZXdMaXN0KSAhPT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRvbVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5Eb21bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5Eb20uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJpbXBvcnQgKiBhcyBzZWVkcmFuZG9tIGZyb20gJ3NlZWRyYW5kb20nO1xuaW1wb3J0IHsgU3RhckRCLCBTdGFyIH0gZnJvbSAnLi9zdGFycyc7XG5pbXBvcnQgJy4vc3R5bGUuY3NzJztcblxuY29uc3QgTUFQX1NJWkUgPSAxMDAwLFxuICAgICAgU0VDVE9SX1NJWkUgPSA1MDAsXG4gICAgICBTVEFSX0RFTlNJVFkgPSAxNTtcbmNvbnN0IGRiID0gU3RhckRCLmdlbmVyYXRlVW5pdmVyc2UoJ3N0YXJzISBpcyBhd2Vzb21lJywgTUFQX1NJWkUsIFNFQ1RPUl9TSVpFLCBTVEFSX0RFTlNJVFkpO1xuXG50eXBlIFBvaW50ID0ge3g6IG51bWJlciwgeTogbnVtYmVyfTtcblxuY29uc3QgbWFwU3RhdGUgPSB7XG4gICAgdHJhbnNsYXRlWDogMCxcbiAgICB0cmFuc2xhdGVZOiAwLFxuICAgIHNjYWxlOiAxLjAsXG4gICAgc2NhbGVQb2ludFg6IDAsXG4gICAgc2NhbGVQb2ludFk6IDAsXG59O1xubGV0IGxhc3RNb3VzZTogUG9pbnR8bnVsbCA9IG51bGw7XG5cbmZ1bmN0aW9uIHJlc2l6ZV9jYW52YXMoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIikgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgaWYgKGNhbnZhcy53aWR0aCAgPCB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgICBjYW52YXMud2lkdGggID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKGNhbnZhcy5oZWlnaHQgPCB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybShwb2ludDogUG9pbnQpOiBQb2ludCB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogcG9pbnQueCAqIG1hcFN0YXRlLnNjYWxlICsgbWFwU3RhdGUudHJhbnNsYXRlWCxcbiAgICAgICAgeTogcG9pbnQueSAqIG1hcFN0YXRlLnNjYWxlICsgbWFwU3RhdGUudHJhbnNsYXRlWVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybVNjcmVlblRvTWFwKHBvaW50OiBQb2ludCk6IFBvaW50IHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiAocG9pbnQueCAtIG1hcFN0YXRlLnRyYW5zbGF0ZVgpIC8gbWFwU3RhdGUuc2NhbGUsXG4gICAgICAgIHk6IChwb2ludC55IC0gbWFwU3RhdGUudHJhbnNsYXRlWSkgLyBtYXBTdGF0ZS5zY2FsZVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGRyYXcoKSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIFxuICAgIC8vIHByb2plY3Qgc2NyZWVuIHZpZXdwb3J0IGludG8gbWFwIGNvb3JkaW5hdGVzXG4gICAgY29uc3QgdGxTY3JlZW4gPSB7eDogMCwgeTogMH07XG4gICAgY29uc3QgYnJTY3JlZW4gPSB7eDogY2FudmFzLndpZHRoLCB5OiBjYW52YXMuaGVpZ2h0fTtcbiAgICBjb25zdCB0bE1hcCA9IHRyYW5zZm9ybVNjcmVlblRvTWFwKHRsU2NyZWVuKTtcbiAgICBjb25zdCBick1hcCA9IHRyYW5zZm9ybVNjcmVlblRvTWFwKGJyU2NyZWVuKTtcbiAgICBjb25zdCBzeE1pbiA9IE1hdGguZmxvb3IodGxNYXAueCAvIFNFQ1RPUl9TSVpFKTtcbiAgICBjb25zdCBzeU1pbiA9IE1hdGguZmxvb3IodGxNYXAueSAvIFNFQ1RPUl9TSVpFKTtcbiAgICBjb25zdCBzeE1heCA9IE1hdGguY2VpbChick1hcC54IC8gU0VDVE9SX1NJWkUpO1xuICAgIGNvbnN0IHN5TWF4ID0gTWF0aC5jZWlsKGJyTWFwLnkgLyBTRUNUT1JfU0laRSk7XG5cbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImJsdWVcIjtcbiAgICAvL2N0eC5zdHJva2VSZWN0KHRsU2NyZWVuLngsIHRsU2NyZWVuLnksIGJyU2NyZWVuLnggLSB0bFNjcmVlbi54LCBiclNjcmVlbi55IC0gdGxTY3JlZW4ueSk7XG5cbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcImdyYXlcIjtcbiAgICBjdHguc2V0TGluZURhc2goWzEwLCAxMF0pO1xuXG4gICAgY29uc3Qgc2VjdG9ycyA9IGRiLmdldFNlY3RvcnMoc3hNaW4sIHN5TWluLCBzeE1heCwgc3lNYXgpO1xuXG4gICAgZm9yIChsZXQgc3ggPSBzeE1pbjsgc3ggPCBzeE1heDsgc3grKykge1xuICAgICAgICBjb25zdCBzZWN0WCA9IHNlY3RvcnNbc3hdO1xuICAgICAgICBpZiAoIXNlY3RYKSBjb250aW51ZTtcblxuICAgICAgICBmb3IgKGxldCBzeSA9IHN5TWluOyBzeSA8IHN5TWF4OyBzeSsrKSB7XG4gICAgICAgICAgICBjb25zdCBzZWN0WSA9IHNlY3RYW3N5XTtcbiAgICAgICAgICAgIGlmICghc2VjdFkpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBjb25zdCB0bFNlY3QgPSB0cmFuc2Zvcm0oe3g6IHN4ICogU0VDVE9SX1NJWkUsIHk6IHN5ICogU0VDVE9SX1NJWkV9KTtcbiAgICAgICAgICAgIGNvbnN0IGJyU2VjdCA9IHRyYW5zZm9ybSh7eDogKHN4KzEpICogU0VDVE9SX1NJWkUsIHk6IChzeSsxKSAqIFNFQ1RPUl9TSVpFfSk7XG4gICAgICAgICAgICAvL2N0eC5zdHJva2VSZWN0KHRsU2VjdC54LCB0bFNlY3QueSwgYnJTZWN0LnggLSB0bFNlY3QueCwgYnJTZWN0LnkgLSB0bFNlY3QueSk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3Qgc3RhciBvZiBzZWN0WSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRwID0gdHJhbnNmb3JtKHN0YXIpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHIgPSA1ICogbWFwU3RhdGUuc2NhbGU7XG4gICAgICAgICAgICAgICAgY3R4LmFyYyh0cC54LCB0cC55LCByLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGN0eC5mb250ID0gXCIxNnB4IENvdXJpZXIgTmV3XCI7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XG4gICAgY3R4LmZpbGxUZXh0KGB0cmFuc2xhdGU6ICgke21hcFN0YXRlLnRyYW5zbGF0ZVh9LCAke21hcFN0YXRlLnRyYW5zbGF0ZVl9KWAsIDEwLCAxNik7XG4gICAgY3R4LmZpbGxUZXh0KGAgICAgc2NhbGU6ICR7bWFwU3RhdGUuc2NhbGV9YCwgMTAsIDMyKTtcbiAgICBjdHguZmlsbFRleHQoYCB2aWV3cG9ydDogKCR7dGxNYXAueH0sICR7dGxNYXAueX0pLCAoJHtick1hcC54fSwgJHtick1hcC55fSlgLCAxMCwgNDgpO1xuICAgIGN0eC5maWxsVGV4dChgICBzZWN0b3JzOiAoJHtzeE1pbn0sICR7c3lNaW59KSwgKCR7c3hNYXh9LCAke3N5TWF4fSlgLCAxMCwgNjQpOyAgICBcbn1cblxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcblxuICAgIHJlc2l6ZV9jYW52YXMoKTtcbiAgICBtYXBTdGF0ZS50cmFuc2xhdGVYID0gY2FudmFzLndpZHRoIC8gMjtcbiAgICBtYXBTdGF0ZS50cmFuc2xhdGVZID0gY2FudmFzLmhlaWdodCAvIDI7XG4gICAgZHJhdygpO1xuXG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRleHRtZW51JywgZXZlbnQgPT4gZXZlbnQucHJldmVudERlZmF1bHQoKSk7XG5cbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUuYnV0dG9ucyA9PSAyKSB7XG4gICAgICAgICAgICBsYXN0TW91c2UgPSB7eDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFl9O1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIChlKSA9PiB7XG4gICAgICAgIGlmIChsYXN0TW91c2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgbGFzdE1vdXNlID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKGBjbGljazogKCR7ZS5jbGllbnRYfSwgJHtlLmNsaWVudFl9KWApO1xuICAgICAgICAvL3BvaW50cy5wdXNoKHt4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WX0pO1xuICAgICAgICAvL2RyYXcoKTtcbiAgICB9KTtcblxuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS5idXR0b25zICE9IDIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRlbHRhWCA9IGUuY2xpZW50WCAtIGxhc3RNb3VzZS54O1xuICAgICAgICBjb25zdCBkZWx0YVkgPSBlLmNsaWVudFkgLSBsYXN0TW91c2UueTtcbiAgICAgICAgbWFwU3RhdGUudHJhbnNsYXRlWCArPSBkZWx0YVg7XG4gICAgICAgIG1hcFN0YXRlLnRyYW5zbGF0ZVkgKz0gZGVsdGFZO1xuICAgICAgICBkcmF3KCk7XG5cbiAgICAgICAgbGFzdE1vdXNlID0ge3g6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZfTtcbiAgICB9KTtcblxuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIChlKSA9PiB7XG4gICAgICAgIC8vIG1hcFN0YXRlLnNjYWxlID0gTWF0aC5tYXgoMC4wNSwgTWF0aC5taW4obWFwU3RhdGUuc2NhbGUgKyAwLjAwMSAqIGUuZGVsdGFZLCAzKSk7XG4gICAgICAgIC8vIG1hcFN0YXRlLnNjYWxlUG9pbnRYID0gZS5jbGllbnRYO1xuICAgICAgICAvLyBtYXBTdGF0ZS5zY2FsZVBvaW50WSA9IGUuY2xpZW50WTtcbiAgICAgICAgY29uc3Qgb2xkU2NhbGUgPSBtYXBTdGF0ZS5zY2FsZTtcbiAgICAgICAgY29uc3QgbmV3U2NhbGUgPSBNYXRoLm1heCgwLjMsIE1hdGgubWluKG1hcFN0YXRlLnNjYWxlICsgKG1hcFN0YXRlLnNjYWxlICogMC4wMDUpICogZS5kZWx0YVksIDMwKSk7XG4gICAgICAgIGNvbnN0IHpvb21Qb2ludCA9IHRyYW5zZm9ybVNjcmVlblRvTWFwKHt4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WX0pO1xuICAgICAgICBjb25zdCBzY2FsZURlbHRhID0gbmV3U2NhbGUgLSBvbGRTY2FsZTtcblxuICAgICAgICBtYXBTdGF0ZS5zY2FsZSA9IG5ld1NjYWxlO1xuICAgICAgICBtYXBTdGF0ZS50cmFuc2xhdGVYIC09IHpvb21Qb2ludC54ICogc2NhbGVEZWx0YTtcbiAgICAgICAgbWFwU3RhdGUudHJhbnNsYXRlWSAtPSB6b29tUG9pbnQueSAqIHNjYWxlRGVsdGE7XG4gICAgICAgIGRyYXcoKTtcbiAgICB9KTtcbn1cbiIsImltcG9ydCBSYW5kLCB7UFJOR30gZnJvbSAncmFuZC1zZWVkJztcblxuZXhwb3J0IHR5cGUgU3RhciA9IHtcbiAgICBpZDogbnVtYmVyLFxuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgc3g6IG51bWJlcixcbiAgICBzeTogbnVtYmVyLFxufTtcblxuZXhwb3J0IGNsYXNzIFN0YXJEQiB7XG4gICAgcHJpdmF0ZSByZWFkb25seSBfc3RhcnM6IFN0YXJbXSA9IFtdO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NlY3RvcnM6IG51bWJlcltdW11bXSA9IFtdO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX3NlY3RvclNpemU6IG51bWJlcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9zdGFyRGVuc2l0eTogbnVtYmVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX3JhbmQ6IHsgbmV4dDogKCkgPT4gbnVtYmVyIH07XG5cbiAgICBjb25zdHJ1Y3RvcihzZWVkOiBzdHJpbmcsIHNlY3RvclNpemU6IG51bWJlciwgc3RhckRlbnNpdHk6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zZWN0b3JTaXplID0gc2VjdG9yU2l6ZTtcbiAgICAgICAgdGhpcy5fc3RhckRlbnNpdHkgPSBzdGFyRGVuc2l0eTtcbiAgICAgICAgdGhpcy5fcmFuZCA9IG5ldyBSYW5kKHNlZWQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZWN0b3JzKG1pblg6IG51bWJlciwgbWluWTogbnVtYmVyLCBtYXhYOiBudW1iZXIsIG1heFk6IG51bWJlcik6IFN0YXJbXVtdW10ge1xuICAgICAgICBjb25zdCBibG9jazogU3RhcltdW11bXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBzeCA9IG1pblg7IHN4IDwgbWF4WDsgc3grKykge1xuICAgICAgICAgICAgYmxvY2tbc3hdID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBzeSA9IG1pblk7IHN5IDwgbWF4WTsgc3krKykge1xuICAgICAgICAgICAgICAgIGJsb2NrW3N4XVtzeV0gPSB0aGlzLmdldFNlY3RvclN0YXJzKHN4LCBzeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJsb2NrO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0U2VjdG9yU3RhcnMoc3g6IG51bWJlciwgc3k6IG51bWJlcik6IFN0YXJbXSB7XG4gICAgICAgIGxldCBzZWN0WCA9IHRoaXMuX3NlY3RvcnNbc3hdO1xuICAgICAgICBpZiAoIXNlY3RYKSB7XG4gICAgICAgICAgICAvLyB3ZSd2ZSBuZXZlciBnZW5lcmF0ZWQgdGhpcyBzZWN0b3IgY29sdW1uXG4gICAgICAgICAgICBzZWN0WCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fc2VjdG9yc1tzeF0gPSBzZWN0WDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWN0b3IgPSBzZWN0WFtzeV07XG4gICAgICAgIGlmICghc2VjdG9yKSB7XG4gICAgICAgICAgICAvLyB3ZSd2ZSBuZXZlciBnZW5lcmF0ZWQgdGhpcyBzZWN0b3IsIHRpbWUgdG8gZG8gaXRcbiAgICAgICAgICAgIHNlY3RvciA9IHRoaXMuZ2VuZXJhdGVTZWN0b3Ioc3gsIHN5KTtcbiAgICAgICAgICAgIHNlY3RYW3N5XSA9IHNlY3RvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN0YXJzOiBTdGFyW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBzdGFySWR4IG9mIHNlY3Rvcikge1xuICAgICAgICAgICAgc3RhcnMucHVzaCh0aGlzLl9zdGFyc1tzdGFySWR4XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0YXJzO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2VuZXJhdGVTdGFyKHg6IG51bWJlciwgeTogbnVtYmVyKTogU3RhciB7XG4gICAgICAgIGNvbnN0IHMgPSB7XG4gICAgICAgICAgICBpZDogdGhpcy5fc3RhcnMubGVuZ3RoLFxuICAgICAgICAgICAgeCwgeSxcbiAgICAgICAgICAgIHN4OiBNYXRoLmZsb29yKHggLyB0aGlzLl9zZWN0b3JTaXplKSxcbiAgICAgICAgICAgIHN5OiBNYXRoLmZsb29yKHkgLyB0aGlzLl9zZWN0b3JTaXplKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9zdGFycy5wdXNoKHMpO1xuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdlbmVyYXRlU2VjdG9yKHN4OiBudW1iZXIsIHN5OiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgICAgIC8vIGVhY2ggc2VjdG9yIGhhcyArLy0xMCUgb2YgX3N0YXJEZW5zaXR5XG4gICAgICAgIGNvbnN0IGNvdW50ID0gTWF0aC5mbG9vcih0aGlzLl9yYW5kLm5leHQoKSAqIDIgKiB0aGlzLl9zdGFyRGVuc2l0eSAqIDAuMSArIHRoaXMuX3N0YXJEZW5zaXR5ICogMC45KTtcbiAgICAgICAgY29uc3Qgc2VjdG9yOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBjb25zb2xlLmxvZyhgR2VuZXJhdGluZyBzZWN0b3IgKCR7c3h9LCAke3N5fSkgd2l0aCAke2NvdW50fSBzdGFyc2ApO1xuXG4gICAgICAgIC8vIGdlbmVyYXRlICdjb3VudCcgcmFuZG9tIHN0YXJzIHdpdGggcmFuZG9tIHBvc2l0aW9uc1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKCh0aGlzLl9yYW5kLm5leHQoKSArIHN4KSAqIHRoaXMuX3NlY3RvclNpemUpO1xuICAgICAgICAgICAgY29uc3QgeSA9IE1hdGguZmxvb3IoKHRoaXMuX3JhbmQubmV4dCgpICsgc3kpICogdGhpcy5fc2VjdG9yU2l6ZSk7XG4gICAgICAgICAgICBjb25zdCBzID0gdGhpcy5nZW5lcmF0ZVN0YXIoeCwgeSk7XG4gICAgICAgICAgICBzZWN0b3IucHVzaChzLmlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vdyB3ZSBkbyBhIGxpdHRsZSBiaXQgb2YgZ3Jhdml0eSBjbHVtcGluZyAtIGZvciBlYWNoIHN0YXIsIGNhbGN1bGF0ZVxuICAgICAgICAvLyB0aGUgYXZlcmFnZSBvZiBhbGwgdmVjdG9ycyB0byBlYWNoIG90aGVyIHN0YXIgaW4gdGhlIHNlY3Rvciwgd2VpZ2h0ZWRcbiAgICAgICAgLy8gYnkgZGlzdGFuY2UgKGNsb3NlciBzdGFycyBoYXZlIG1vcmUgb2YgYW4gZWZmZWN0KSwgdGhlbiBtb3ZlIHRoZSBzdGFyXG4gICAgICAgIC8vIDUwJSBvZiB0aGUgYXZlcmFnZS5cbiAgICAgICAgZm9yIChjb25zdCBzdGFySWR4IG9mIHNlY3Rvcikge1xuICAgICAgICAgICAgY29uc3Qgc3RhciA9IHRoaXMuX3N0YXJzW3N0YXJJZHhdO1xuICAgICAgICAgICAgY29uc3QgYXZnID0geyB4OiAwLCB5OiAwIH07XG5cbiAgICAgICAgICAgIGZvciAoY29uc3Qgb3RoZXJTdGFySWR4IG9mIHNlY3Rvcikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG90aGVyU3RhciA9IHRoaXMuX3N0YXJzW290aGVyU3RhcklkeF07XG4gICAgICAgICAgICAgICAgaWYgKHN0YXIuaWQgPT09IG90aGVyU3Rhci5pZCkgY29udGludWU7ICAvLyBza2lwIG91cnNlbHZlc1xuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IHZlY3RvciBhbmQgbWFnbml0dWRlIGZyb20gc3RhciB0byBvdGhlclN0YXJcbiAgICAgICAgICAgICAgICBjb25zdCB2ID0geyB4OiBvdGhlclN0YXIueCAtIHN0YXIueCwgeTogb3RoZXJTdGFyLnkgLSBzdGFyLnkgfTtcbiAgICAgICAgICAgICAgICBjb25zdCBkID0gTWF0aC5zcXJ0KHYueCAqIHYueCArIHYueSAqIHYueSk7XG4gICAgICAgICAgICAgICAgLy8gYWRkIHZlY3RvciBpbnRvIHJ1bm5pbmcgdG90YWwsIHdlaWdodCBieSBkaXN0YW5jZVxuICAgICAgICAgICAgICAgIGF2Zy54ICs9IHYueCAvIGQ7XG4gICAgICAgICAgICAgICAgYXZnLnkgKz0gdi55IC8gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSBhdmVyYWdlXG4gICAgICAgICAgICBhdmcueCA9IGF2Zy54IC8gKHNlY3Rvci5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIGF2Zy55ID0gYXZnLnkgLyAoc2VjdG9yLmxlbmd0aCAtIDEpO1xuXG4gICAgICAgICAgICAvLyBtb3ZlIG91ciBzdGFyIGFsb25nIHRoZSBhdmVyYWdlIHZlY3RvciA1MCVcbiAgICAgICAgICAgIHN0YXIueCArPSBhdmcueCAqIDAuNTtcbiAgICAgICAgICAgIHN0YXIueSArPSBhdmcueSAqIDAuNTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWN0b3I7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyBnZW5lcmF0ZVVuaXZlcnNlKHNlZWQ6IHN0cmluZywgbWFwU2l6ZTogbnVtYmVyLCBzZWN0b3JTaXplOiBudW1iZXIsIHN0YXJEZW5zaXR5OiBudW1iZXIpOiBTdGFyREIge1xuICAgICAgICBjb25zdCBkYiA9IG5ldyBTdGFyREIoc2VlZCwgc2VjdG9yU2l6ZSwgc3RhckRlbnNpdHkpO1xuICAgICAgICBjb25zdCBzZWN0b3JDb3VudCA9IG1hcFNpemUgLyBzZWN0b3JTaXplO1xuXG4gICAgICAgIGZvciAobGV0IHN4ID0gLXNlY3RvckNvdW50OyBzeCA8IHNlY3RvckNvdW50OyBzeCsrKSB7XG4gICAgICAgICAgICBkYi5fc2VjdG9yc1tzeF0gPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IHN5ID0gLXNlY3RvckNvdW50OyBzeSA8IHNlY3RvckNvdW50OyBzeSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VjdG9yID0gZGIuZ2VuZXJhdGVTZWN0b3Ioc3gsIHN5KTtcbiAgICAgICAgICAgICAgICBkYi5fc2VjdG9yc1tzeF1bc3ldID0gc2VjdG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRiO1xuICAgIH1cbn0iLCJ2YXIgYXBpID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIik7XG4gICAgICAgICAgICB2YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCIpO1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5fX2VzTW9kdWxlID8gY29udGVudC5kZWZhdWx0IDogY29udGVudDtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgICAgICB9XG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuaW5zZXJ0ID0gXCJoZWFkXCI7XG5vcHRpb25zLnNpbmdsZXRvbiA9IGZhbHNlO1xuXG52YXIgdXBkYXRlID0gYXBpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscyB8fCB7fTsiXSwic291cmNlUm9vdCI6IiJ9