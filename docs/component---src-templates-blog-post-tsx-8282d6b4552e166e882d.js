(self["webpackChunk_zedvision_zedvision_site"] = self["webpackChunk_zedvision_zedvision_site"] || []).push([[7],{

/***/ 3692:
/***/ (function(module) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 6662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(3692);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 389:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(2124);

var isNativeReflectConstruct = __webpack_require__(7969);

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
    module.exports.default = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };

    module.exports.default = module.exports, module.exports.__esModule = true;
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 6122:
/***/ (function(module) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 7969:
/***/ (function(module) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 65:
/***/ (function(module) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 4449:
/***/ (function(module) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 3689:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(6662);

var iterableToArray = __webpack_require__(65);

var unsupportedIterableToArray = __webpack_require__(9352);

var nonIterableSpread = __webpack_require__(4449);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 9352:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(3692);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 2922:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ blog_post; }
});

// EXTERNAL MODULE: ../../.yarn/cache/@babel-runtime-npm-7.13.10-d9a6e8f765-22014226b9.zip/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteralLoose.js
var taggedTemplateLiteralLoose = __webpack_require__(9411);
// EXTERNAL MODULE: ../../.yarn/$$virtual/@emotion-react-virtual-06ba5ec380/0/cache/@emotion-react-npm-11.1.5-bb508e1993-4e78f694df.zip/node_modules/@emotion/react/dist/emotion-react.browser.esm.js + 15 modules
var emotion_react_browser_esm = __webpack_require__(8751);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js
var gatsby_browser_entry = __webpack_require__(8665);
// EXTERNAL MODULE: ./src/components/bio.tsx + 1 modules
var bio = __webpack_require__(8982);
// EXTERNAL MODULE: ./src/components/layout.tsx
var layout = __webpack_require__(5925);
// EXTERNAL MODULE: ./src/components/seo.tsx + 1 modules
var seo = __webpack_require__(6792);
// EXTERNAL MODULE: ./src/components/utils/typography.ts
var typography = __webpack_require__(2253);
// EXTERNAL MODULE: ../../.yarn/$$virtual/gatsby-plugin-mdx-virtual-5ca5aea69d/0/cache/gatsby-plugin-mdx-npm-2.0.0-bf9e39de7d-e8d14c9488.zip/node_modules/gatsby-plugin-mdx/index.js
var gatsby_plugin_mdx = __webpack_require__(1783);
// EXTERNAL MODULE: ../../.yarn/cache/@babel-runtime-npm-7.13.10-d9a6e8f765-22014226b9.zip/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(7577);
// EXTERNAL MODULE: ../../.yarn/cache/@babel-runtime-npm-7.13.10-d9a6e8f765-22014226b9.zip/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(3718);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
// EXTERNAL MODULE: ../../.yarn/cache/react-npm-17.0.1-98658812fc-a76d86ec97.zip/node_modules/react/index.js
var react = __webpack_require__(7693);
;// CONCATENATED MODULE: ./src/components/codeBox/CodeBox.tsx



var CodeBox = function CodeBox(_ref) {
  var title = _ref.title,
      children = _ref.children;
  var starterCode = children === null || children === void 0 ? void 0 : children.toString().trim();
  if (typeof window === "undefined") return /*#__PURE__*/react.createElement("pre", null, "Loading");
  react.useEffect(function () {
    function start() {
      return _start.apply(this, arguments);
    }

    function _start() {
      _start = (0,asyncToGenerator/* default */.Z)( /*#__PURE__*/regenerator_default().mark(function _callee() {
        var _yield$Function, run;

        return regenerator_default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return new Function("return import(\"https://code.zed.vision/js/codeLoader.mjs\")")();

              case 2:
                _yield$Function = _context.sent;
                run = _yield$Function.run;
                run("embedded", window, starterCode);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _start.apply(this, arguments);
    }

    start();
  }, []);
  return /*#__PURE__*/react.createElement("div", null, !!title && /*#__PURE__*/react.createElement("div", {
    style: {
      background: "#3f51b5",
      fontFamily: "Roboto",
      margin: 0,
      padding: "10px 20px 10px",
      color: "white"
    }
  }, /*#__PURE__*/react.createElement("span", null, title), /*#__PURE__*/react.createElement("button", {
    onClick: function onClick() {
      //@ts-ignore
      var _window = window,
          monaco = _window.monaco;
      monaco.editor.getModel("file:///main.tsx").setValue(starterCode);
    }
  }, "Reset")), /*#__PURE__*/react.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/react.createElement("div", {
    style: {
      width: "100%",
      height: "70vh"
    },
    id: "editor"
  }), /*#__PURE__*/react.createElement("div", {
    style: {
      height: "0px"
    },
    id: "preview"
  })));
};
// EXTERNAL MODULE: ../../.yarn/$$virtual/@mdx-js-react-virtual-97892cdf0d/0/cache/@mdx-js-react-npm-1.6.22-57e4c05c2b-3a0a189aa0.zip/node_modules/@mdx-js/react/dist/esm.js
var esm = __webpack_require__(8990);
;// CONCATENATED MODULE: ./src/templates/blog-post.tsx


var _templateObject, _templateObject2, _templateObject3;

/** @jsx jsx */









var components = {
  pre: function PreComp(props) {
    return (0,emotion_react_browser_esm/* jsx */.tZ)("div", props);
  },
  code: CodeBox
};

var _scale = (0,typography/* scale */.bA)(1 / 5),
    fontSize = _scale.fontSize,
    lineHeight = _scale.lineHeight;

var BlogPostTemplate = function BlogPostTemplate(_ref) {
  var data = _ref.data,
      pageContext = _ref.pageContext;
  var post = data.mdx;
  var previous = pageContext.previous,
      next = pageContext.next;

  var BlogPost = function BlogPost() {
    return (0,emotion_react_browser_esm/* jsx */.tZ)(esm.MDXProvider, {
      components: components
    }, (0,emotion_react_browser_esm/* jsx */.tZ)(gatsby_plugin_mdx.MDXRenderer, null, post.body));
  };

  return (0,emotion_react_browser_esm/* jsx */.tZ)(layout/* Layout */.A, null, (0,emotion_react_browser_esm/* jsx */.tZ)(seo/* SEO */.H, {
    title: post.frontmatter.title,
    description: post.frontmatter.description || post.excerpt
  }), (0,emotion_react_browser_esm/* jsx */.tZ)("header", null, (0,emotion_react_browser_esm/* jsx */.tZ)("h1", {
    css: (0,emotion_react_browser_esm/* css */.iv)(_templateObject || (_templateObject = (0,taggedTemplateLiteralLoose/* default */.Z)(["\n                  margin-top: ", ";\n                  margin-bottom: 0;\n                  "])), (0,typography/* rhythm */.qZ)(1))
  }, post.frontmatter.title), (0,emotion_react_browser_esm/* jsx */.tZ)("p", {
    css: (0,emotion_react_browser_esm/* css */.iv)(_templateObject2 || (_templateObject2 = (0,taggedTemplateLiteralLoose/* default */.Z)(["\n                    font-size: ", ";\n                    line-height: ", ";\n                    display: block;\n                    margin-bottom: ", ";"])), fontSize, lineHeight, (0,typography/* rhythm */.qZ)(1))
  }, post.frontmatter.date)), (0,emotion_react_browser_esm/* jsx */.tZ)(BlogPost, null), (0,emotion_react_browser_esm/* jsx */.tZ)("hr", {
    css: (0,emotion_react_browser_esm/* css */.iv)(_templateObject3 || (_templateObject3 = (0,taggedTemplateLiteralLoose/* default */.Z)(["\n                  margin-bottom: ", ";\n                  "])), (0,typography/* rhythm */.qZ)(1))
  }), (0,emotion_react_browser_esm/* jsx */.tZ)("footer", null, (0,emotion_react_browser_esm/* jsx */.tZ)(bio/* Bio */.w, null)), (0,emotion_react_browser_esm/* jsx */.tZ)("nav", null, (0,emotion_react_browser_esm/* jsx */.tZ)("ul", null, previous && (0,emotion_react_browser_esm/* jsx */.tZ)("li", null, (0,emotion_react_browser_esm/* jsx */.tZ)(gatsby_browser_entry.Link, {
    to: previous.fields.slug,
    rel: "prev"
  }, "\u2190 ", previous.frontmatter.title)), next && (0,emotion_react_browser_esm/* jsx */.tZ)("li", null, (0,emotion_react_browser_esm/* jsx */.tZ)(gatsby_browser_entry.Link, {
    to: next.fields.slug,
    rel: "next"
  }, next.frontmatter.title, " \u2192")))));
};

/* harmony default export */ var blog_post = (BlogPostTemplate);
var pageQuery = "2168380918";

/***/ }),

/***/ 1783:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Welcome to gatsby-plugin-mdx!
 *
 * Start reading in gatsby-node.js
 */var MDXRenderer=__webpack_require__(2871);module.exports={MDXRenderer:MDXRenderer};

/***/ }),

/***/ 2871:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _construct=__webpack_require__(389);var _toConsumableArray=__webpack_require__(3689);var _defineProperty=__webpack_require__(6122);var _objectWithoutPropertiesLoose=__webpack_require__(1774);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}var React=__webpack_require__(7693);var _require=__webpack_require__(8990),mdx=_require.mdx;var _require2=__webpack_require__(1779),useMDXScope=_require2.useMDXScope;module.exports=function MDXRenderer(_ref){var scope=_ref.scope,children=_ref.children,props=_objectWithoutPropertiesLoose(_ref,["scope","children"]);var mdxScope=useMDXScope(scope);// Memoize the compiled component
var End=React.useMemo(function(){if(!children){return null;}var fullScope=_objectSpread({// React is here just in case the user doesn't pass them in
// in a manual usage of the renderer
React:React,mdx:mdx},mdxScope);var keys=Object.keys(fullScope);var values=keys.map(function(key){return fullScope[key];});var fn=_construct(Function,["_fn"].concat(_toConsumableArray(keys),[""+children]));return fn.apply(void 0,[{}].concat(_toConsumableArray(values)));},[children,scope]);return React.createElement(End,_objectSpread({},props));};

/***/ })

}]);
//# sourceMappingURL=component---src-templates-blog-post-tsx-8282d6b4552e166e882d.js.map