var __commonJS = (callback, module) =>
  () => {
    if (!module) {
      module = { exports: {} };
      callback(module.exports, module);
    }
    return module.exports;
  };

// ../../node_modules/nevis/src/extend.js
var require_extend = __commonJS((exports, module) => {
  "use strict";
  var Constructor = function () {
  };
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var slice = Array.prototype.slice;
  function createObject(prototype, properties) {
    var result;
    if (typeof Object.create === "function") {
      result = Object.create(prototype);
    } else {
      Constructor.prototype = prototype;
      result = new Constructor();
      Constructor.prototype = null;
    }
    if (properties) {
      extendObject(true, result, properties);
    }
    return result;
  }
  function extend(name, constructor, prototype, statics) {
    var superConstructor = this;
    if (typeof name !== "string") {
      statics = prototype;
      prototype = constructor;
      constructor = name;
      name = null;
    }
    if (typeof constructor !== "function") {
      statics = prototype;
      prototype = constructor;
      constructor = function () {
        return superConstructor.apply(this, arguments);
      };
    }
    extendObject(false, constructor, superConstructor, statics);
    constructor.prototype = createObject(superConstructor.prototype, prototype);
    constructor.prototype.constructor = constructor;
    constructor.class_ = name || superConstructor.class_;
    constructor.super_ = superConstructor;
    return constructor;
  }
  function extendObject(own, target, sources) {
    sources = slice.call(arguments, 2);
    var property;
    var source;
    for (var i = 0, length = sources.length; i < length; i++) {
      source = sources[i];
      for (property in source) {
        if (!own || hasOwnProperty.call(source, property)) {
          target[property] = source[property];
        }
      }
    }
  }
  module.exports = extend;
});

// ../../node_modules/nevis/src/nevis.js
var require_nevis = __commonJS((exports, module) => {
  "use strict";
  var extend = require_extend();
  function Nevis() {
  }
  Nevis.class_ = "Nevis";
  Nevis.super_ = Object;
  Nevis.extend = extend;
  module.exports = Nevis;
});

// ../../node_modules/nevis/lite.js
var require_lite = __commonJS((exports, module) => {
  "use strict";
  module.exports = require_nevis();
});

// ../../node_modules/qrious-core/src/renderer/Renderer.js
var require_Renderer = __commonJS((exports, module) => {
  "use strict";
  var Nevis = require_lite();
  var Renderer = Nevis.extend(function (qrious, element, enabled) {
    this.qrious = qrious;
    this.element = element;
    this.element.qrious = qrious;
    this.enabled = Boolean(enabled);
  }, {
    draw: function (frame) {
    },
    getElement: function () {
      if (!this.enabled) {
        this.enabled = true;
        this.render();
      }
      return this.element;
    },
    getModuleSize: function (frame) {
      var qrious = this.qrious;
      var padding = qrious.padding || 0;
      var pixels = Math.floor((qrious.size - padding * 2) / frame.width);
      return Math.max(1, pixels);
    },
    getOffset: function (frame) {
      var qrious = this.qrious;
      var padding = qrious.padding;
      if (padding != null) {
        return padding;
      }
      var moduleSize = this.getModuleSize(frame);
      var offset = Math.floor((qrious.size - moduleSize * frame.width) / 2);
      return Math.max(0, offset);
    },
    render: function (frame) {
      if (this.enabled) {
        this.resize();
        this.reset();
        this.draw(frame);
      }
    },
    reset: function () {
    },
    resize: function () {
    },
  });
  module.exports = Renderer;
});

// ../../node_modules/qrious-core/src/renderer/CanvasRenderer.js
var require_CanvasRenderer = __commonJS((exports, module) => {
  "use strict";
  var Renderer = require_Renderer();
  var CanvasRenderer = Renderer.extend({
    draw: function (frame) {
      var i, j;
      var qrious = this.qrious;
      var moduleSize = this.getModuleSize(frame);
      var offset = this.getOffset(frame);
      var context = this.element.getContext("2d");
      context.fillStyle = qrious.foreground;
      context.globalAlpha = qrious.foregroundAlpha;
      for (i = 0; i < frame.width; i++) {
        for (j = 0; j < frame.width; j++) {
          if (frame.buffer[j * frame.width + i]) {
            context.fillRect(
              moduleSize * i + offset,
              moduleSize * j + offset,
              moduleSize,
              moduleSize,
            );
          }
        }
      }
    },
    reset: function () {
      var qrious = this.qrious;
      var context = this.element.getContext("2d");
      var size = qrious.size;
      context.lineWidth = 1;
      context.clearRect(0, 0, size, size);
      context.fillStyle = qrious.background;
      context.globalAlpha = qrious.backgroundAlpha;
      context.fillRect(0, 0, size, size);
    },
    resize: function () {
      var element = this.element;
      element.width = element.height = this.qrious.size;
    },
  });
  module.exports = CanvasRenderer;
});

// ../../node_modules/qrious-core/src/Alignment.js
var require_Alignment = __commonJS((exports, module) => {
  "use strict";
  var Nevis = require_lite();
  var Alignment = Nevis.extend(null, {
    BLOCK: [
      0,
      11,
      15,
      19,
      23,
      27,
      31,
      16,
      18,
      20,
      22,
      24,
      26,
      28,
      20,
      22,
      24,
      24,
      26,
      28,
      28,
      22,
      24,
      24,
      26,
      26,
      28,
      28,
      24,
      24,
      26,
      26,
      26,
      28,
      28,
      24,
      26,
      26,
      26,
      28,
      28,
    ],
  });
  module.exports = Alignment;
});

// ../../node_modules/qrious-core/src/ErrorCorrection.js
var require_ErrorCorrection = __commonJS((exports, module) => {
  "use strict";
  var Nevis = require_lite();
  var ErrorCorrection = Nevis.extend(null, {
    BLOCKS: [
      1,
      0,
      19,
      7,
      1,
      0,
      16,
      10,
      1,
      0,
      13,
      13,
      1,
      0,
      9,
      17,
      1,
      0,
      34,
      10,
      1,
      0,
      28,
      16,
      1,
      0,
      22,
      22,
      1,
      0,
      16,
      28,
      1,
      0,
      55,
      15,
      1,
      0,
      44,
      26,
      2,
      0,
      17,
      18,
      2,
      0,
      13,
      22,
      1,
      0,
      80,
      20,
      2,
      0,
      32,
      18,
      2,
      0,
      24,
      26,
      4,
      0,
      9,
      16,
      1,
      0,
      108,
      26,
      2,
      0,
      43,
      24,
      2,
      2,
      15,
      18,
      2,
      2,
      11,
      22,
      2,
      0,
      68,
      18,
      4,
      0,
      27,
      16,
      4,
      0,
      19,
      24,
      4,
      0,
      15,
      28,
      2,
      0,
      78,
      20,
      4,
      0,
      31,
      18,
      2,
      4,
      14,
      18,
      4,
      1,
      13,
      26,
      2,
      0,
      97,
      24,
      2,
      2,
      38,
      22,
      4,
      2,
      18,
      22,
      4,
      2,
      14,
      26,
      2,
      0,
      116,
      30,
      3,
      2,
      36,
      22,
      4,
      4,
      16,
      20,
      4,
      4,
      12,
      24,
      2,
      2,
      68,
      18,
      4,
      1,
      43,
      26,
      6,
      2,
      19,
      24,
      6,
      2,
      15,
      28,
      4,
      0,
      81,
      20,
      1,
      4,
      50,
      30,
      4,
      4,
      22,
      28,
      3,
      8,
      12,
      24,
      2,
      2,
      92,
      24,
      6,
      2,
      36,
      22,
      4,
      6,
      20,
      26,
      7,
      4,
      14,
      28,
      4,
      0,
      107,
      26,
      8,
      1,
      37,
      22,
      8,
      4,
      20,
      24,
      12,
      4,
      11,
      22,
      3,
      1,
      115,
      30,
      4,
      5,
      40,
      24,
      11,
      5,
      16,
      20,
      11,
      5,
      12,
      24,
      5,
      1,
      87,
      22,
      5,
      5,
      41,
      24,
      5,
      7,
      24,
      30,
      11,
      7,
      12,
      24,
      5,
      1,
      98,
      24,
      7,
      3,
      45,
      28,
      15,
      2,
      19,
      24,
      3,
      13,
      15,
      30,
      1,
      5,
      107,
      28,
      10,
      1,
      46,
      28,
      1,
      15,
      22,
      28,
      2,
      17,
      14,
      28,
      5,
      1,
      120,
      30,
      9,
      4,
      43,
      26,
      17,
      1,
      22,
      28,
      2,
      19,
      14,
      28,
      3,
      4,
      113,
      28,
      3,
      11,
      44,
      26,
      17,
      4,
      21,
      26,
      9,
      16,
      13,
      26,
      3,
      5,
      107,
      28,
      3,
      13,
      41,
      26,
      15,
      5,
      24,
      30,
      15,
      10,
      15,
      28,
      4,
      4,
      116,
      28,
      17,
      0,
      42,
      26,
      17,
      6,
      22,
      28,
      19,
      6,
      16,
      30,
      2,
      7,
      111,
      28,
      17,
      0,
      46,
      28,
      7,
      16,
      24,
      30,
      34,
      0,
      13,
      24,
      4,
      5,
      121,
      30,
      4,
      14,
      47,
      28,
      11,
      14,
      24,
      30,
      16,
      14,
      15,
      30,
      6,
      4,
      117,
      30,
      6,
      14,
      45,
      28,
      11,
      16,
      24,
      30,
      30,
      2,
      16,
      30,
      8,
      4,
      106,
      26,
      8,
      13,
      47,
      28,
      7,
      22,
      24,
      30,
      22,
      13,
      15,
      30,
      10,
      2,
      114,
      28,
      19,
      4,
      46,
      28,
      28,
      6,
      22,
      28,
      33,
      4,
      16,
      30,
      8,
      4,
      122,
      30,
      22,
      3,
      45,
      28,
      8,
      26,
      23,
      30,
      12,
      28,
      15,
      30,
      3,
      10,
      117,
      30,
      3,
      23,
      45,
      28,
      4,
      31,
      24,
      30,
      11,
      31,
      15,
      30,
      7,
      7,
      116,
      30,
      21,
      7,
      45,
      28,
      1,
      37,
      23,
      30,
      19,
      26,
      15,
      30,
      5,
      10,
      115,
      30,
      19,
      10,
      47,
      28,
      15,
      25,
      24,
      30,
      23,
      25,
      15,
      30,
      13,
      3,
      115,
      30,
      2,
      29,
      46,
      28,
      42,
      1,
      24,
      30,
      23,
      28,
      15,
      30,
      17,
      0,
      115,
      30,
      10,
      23,
      46,
      28,
      10,
      35,
      24,
      30,
      19,
      35,
      15,
      30,
      17,
      1,
      115,
      30,
      14,
      21,
      46,
      28,
      29,
      19,
      24,
      30,
      11,
      46,
      15,
      30,
      13,
      6,
      115,
      30,
      14,
      23,
      46,
      28,
      44,
      7,
      24,
      30,
      59,
      1,
      16,
      30,
      12,
      7,
      121,
      30,
      12,
      26,
      47,
      28,
      39,
      14,
      24,
      30,
      22,
      41,
      15,
      30,
      6,
      14,
      121,
      30,
      6,
      34,
      47,
      28,
      46,
      10,
      24,
      30,
      2,
      64,
      15,
      30,
      17,
      4,
      122,
      30,
      29,
      14,
      46,
      28,
      49,
      10,
      24,
      30,
      24,
      46,
      15,
      30,
      4,
      18,
      122,
      30,
      13,
      32,
      46,
      28,
      48,
      14,
      24,
      30,
      42,
      32,
      15,
      30,
      20,
      4,
      117,
      30,
      40,
      7,
      47,
      28,
      43,
      22,
      24,
      30,
      10,
      67,
      15,
      30,
      19,
      6,
      118,
      30,
      18,
      31,
      47,
      28,
      34,
      34,
      24,
      30,
      20,
      61,
      15,
      30,
    ],
    FINAL_FORMAT: [
      30660,
      29427,
      32170,
      30877,
      26159,
      25368,
      27713,
      26998,
      21522,
      20773,
      24188,
      23371,
      17913,
      16590,
      20375,
      19104,
      13663,
      12392,
      16177,
      14854,
      9396,
      8579,
      11994,
      11245,
      5769,
      5054,
      7399,
      6608,
      1890,
      597,
      3340,
      2107,
    ],
    LEVELS: {
      L: 1,
      M: 2,
      Q: 3,
      H: 4,
    },
  });
  module.exports = ErrorCorrection;
});

// ../../node_modules/qrious-core/src/Galois.js
var require_Galois = __commonJS((exports, module) => {
  "use strict";
  var Nevis = require_lite();
  var Galois = Nevis.extend(null, {
    EXPONENT: [
      1,
      2,
      4,
      8,
      16,
      32,
      64,
      128,
      29,
      58,
      116,
      232,
      205,
      135,
      19,
      38,
      76,
      152,
      45,
      90,
      180,
      117,
      234,
      201,
      143,
      3,
      6,
      12,
      24,
      48,
      96,
      192,
      157,
      39,
      78,
      156,
      37,
      74,
      148,
      53,
      106,
      212,
      181,
      119,
      238,
      193,
      159,
      35,
      70,
      140,
      5,
      10,
      20,
      40,
      80,
      160,
      93,
      186,
      105,
      210,
      185,
      111,
      222,
      161,
      95,
      190,
      97,
      194,
      153,
      47,
      94,
      188,
      101,
      202,
      137,
      15,
      30,
      60,
      120,
      240,
      253,
      231,
      211,
      187,
      107,
      214,
      177,
      127,
      254,
      225,
      223,
      163,
      91,
      182,
      113,
      226,
      217,
      175,
      67,
      134,
      17,
      34,
      68,
      136,
      13,
      26,
      52,
      104,
      208,
      189,
      103,
      206,
      129,
      31,
      62,
      124,
      248,
      237,
      199,
      147,
      59,
      118,
      236,
      197,
      151,
      51,
      102,
      204,
      133,
      23,
      46,
      92,
      184,
      109,
      218,
      169,
      79,
      158,
      33,
      66,
      132,
      21,
      42,
      84,
      168,
      77,
      154,
      41,
      82,
      164,
      85,
      170,
      73,
      146,
      57,
      114,
      228,
      213,
      183,
      115,
      230,
      209,
      191,
      99,
      198,
      145,
      63,
      126,
      252,
      229,
      215,
      179,
      123,
      246,
      241,
      255,
      227,
      219,
      171,
      75,
      150,
      49,
      98,
      196,
      149,
      55,
      110,
      220,
      165,
      87,
      174,
      65,
      130,
      25,
      50,
      100,
      200,
      141,
      7,
      14,
      28,
      56,
      112,
      224,
      221,
      167,
      83,
      166,
      81,
      162,
      89,
      178,
      121,
      242,
      249,
      239,
      195,
      155,
      43,
      86,
      172,
      69,
      138,
      9,
      18,
      36,
      72,
      144,
      61,
      122,
      244,
      245,
      247,
      243,
      251,
      235,
      203,
      139,
      11,
      22,
      44,
      88,
      176,
      125,
      250,
      233,
      207,
      131,
      27,
      54,
      108,
      216,
      173,
      71,
      142,
      0,
    ],
    LOG: [
      255,
      0,
      1,
      25,
      2,
      50,
      26,
      198,
      3,
      223,
      51,
      238,
      27,
      104,
      199,
      75,
      4,
      100,
      224,
      14,
      52,
      141,
      239,
      129,
      28,
      193,
      105,
      248,
      200,
      8,
      76,
      113,
      5,
      138,
      101,
      47,
      225,
      36,
      15,
      33,
      53,
      147,
      142,
      218,
      240,
      18,
      130,
      69,
      29,
      181,
      194,
      125,
      106,
      39,
      249,
      185,
      201,
      154,
      9,
      120,
      77,
      228,
      114,
      166,
      6,
      191,
      139,
      98,
      102,
      221,
      48,
      253,
      226,
      152,
      37,
      179,
      16,
      145,
      34,
      136,
      54,
      208,
      148,
      206,
      143,
      150,
      219,
      189,
      241,
      210,
      19,
      92,
      131,
      56,
      70,
      64,
      30,
      66,
      182,
      163,
      195,
      72,
      126,
      110,
      107,
      58,
      40,
      84,
      250,
      133,
      186,
      61,
      202,
      94,
      155,
      159,
      10,
      21,
      121,
      43,
      78,
      212,
      229,
      172,
      115,
      243,
      167,
      87,
      7,
      112,
      192,
      247,
      140,
      128,
      99,
      13,
      103,
      74,
      222,
      237,
      49,
      197,
      254,
      24,
      227,
      165,
      153,
      119,
      38,
      184,
      180,
      124,
      17,
      68,
      146,
      217,
      35,
      32,
      137,
      46,
      55,
      63,
      209,
      91,
      149,
      188,
      207,
      205,
      144,
      135,
      151,
      178,
      220,
      252,
      190,
      97,
      242,
      86,
      211,
      171,
      20,
      42,
      93,
      158,
      132,
      60,
      57,
      83,
      71,
      109,
      65,
      162,
      31,
      45,
      67,
      216,
      183,
      123,
      164,
      118,
      196,
      23,
      73,
      236,
      127,
      12,
      111,
      246,
      108,
      161,
      59,
      82,
      41,
      157,
      85,
      170,
      251,
      96,
      134,
      177,
      187,
      204,
      62,
      90,
      203,
      89,
      95,
      176,
      156,
      169,
      160,
      81,
      11,
      245,
      22,
      235,
      122,
      117,
      44,
      215,
      79,
      174,
      213,
      233,
      230,
      231,
      173,
      232,
      116,
      214,
      244,
      234,
      168,
      80,
      88,
      175,
    ],
  });
  module.exports = Galois;
});

// ../../node_modules/qrious-core/src/Version.js
var require_Version = __commonJS((exports, module) => {
  "use strict";
  var Nevis = require_lite();
  var Version = Nevis.extend(null, {
    BLOCK: [
      3220,
      1468,
      2713,
      1235,
      3062,
      1890,
      2119,
      1549,
      2344,
      2936,
      1117,
      2583,
      1330,
      2470,
      1667,
      2249,
      2028,
      3780,
      481,
      4011,
      142,
      3098,
      831,
      3445,
      592,
      2517,
      1776,
      2234,
      1951,
      2827,
      1070,
      2660,
      1345,
      3177,
    ],
  });
  module.exports = Version;
});

// ../../node_modules/qrious-core/src/Frame.js
var require_Frame = __commonJS((exports, module) => {
  "use strict";
  var Nevis = require_lite();
  var Alignment = require_Alignment();
  var ErrorCorrection = require_ErrorCorrection();
  var Galois = require_Galois();
  var Version = require_Version();
  var Frame = Nevis.extend(function (options) {
    var dataBlock, eccBlock, index, neccBlock1, neccBlock2;
    var valueLength = options.value.length;
    this._badness = [];
    this._level = ErrorCorrection.LEVELS[options.level];
    this._polynomial = [];
    this._value = options.value;
    this._version = 0;
    this._stringBuffer = [];
    while (this._version < 40) {
      this._version++;
      index = (this._level - 1) * 4 + (this._version - 1) * 16;
      neccBlock1 = ErrorCorrection.BLOCKS[index++];
      neccBlock2 = ErrorCorrection.BLOCKS[index++];
      dataBlock = ErrorCorrection.BLOCKS[index++];
      eccBlock = ErrorCorrection.BLOCKS[index];
      index = dataBlock * (neccBlock1 + neccBlock2) + neccBlock2 - 3 +
        (this._version <= 9);
      if (valueLength <= index) {
        break;
      }
    }
    this._dataBlock = dataBlock;
    this._eccBlock = eccBlock;
    this._neccBlock1 = neccBlock1;
    this._neccBlock2 = neccBlock2;
    var width = this.width = 17 + 4 * this._version;
    this.buffer = Frame._createArray(width * width);
    this._ecc = Frame._createArray(
      dataBlock + (dataBlock + eccBlock) * (neccBlock1 + neccBlock2) +
        neccBlock2,
    );
    this._mask = Frame._createArray((width * (width + 1) + 1) / 2);
    this._insertFinders();
    this._insertAlignments();
    this.buffer[8 + width * (width - 8)] = 1;
    this._insertTimingGap();
    this._reverseMask();
    this._insertTimingRowAndColumn();
    this._insertVersion();
    this._syncMask();
    this._convertBitStream(valueLength);
    this._calculatePolynomial();
    this._appendEccToData();
    this._interleaveBlocks();
    this._pack();
    this._finish();
  }, {
    _addAlignment: function (x, y) {
      var i;
      var buffer = this.buffer;
      var width = this.width;
      buffer[x + width * y] = 1;
      for (i = -2; i < 2; i++) {
        buffer[x + i + width * (y - 2)] = 1;
        buffer[x - 2 + width * (y + i + 1)] = 1;
        buffer[x + 2 + width * (y + i)] = 1;
        buffer[x + i + 1 + width * (y + 2)] = 1;
      }
      for (i = 0; i < 2; i++) {
        this._setMask(x - 1, y + i);
        this._setMask(x + 1, y - i);
        this._setMask(x - i, y - 1);
        this._setMask(x + i, y + 1);
      }
    },
    _appendData: function (data, dataLength, ecc, eccLength) {
      var bit, i, j;
      var polynomial = this._polynomial;
      var stringBuffer = this._stringBuffer;
      for (i = 0; i < eccLength; i++) {
        stringBuffer[ecc + i] = 0;
      }
      for (i = 0; i < dataLength; i++) {
        bit = Galois.LOG[stringBuffer[data + i] ^ stringBuffer[ecc]];
        if (bit !== 255) {
          for (j = 1; j < eccLength; j++) {
            stringBuffer[ecc + j - 1] = stringBuffer[ecc + j] ^
              Galois.EXPONENT[Frame._modN(bit + polynomial[eccLength - j])];
          }
        } else {
          for (j = ecc; j < ecc + eccLength; j++) {
            stringBuffer[j] = stringBuffer[j + 1];
          }
        }
        stringBuffer[ecc + eccLength - 1] = bit === 255
          ? 0
          : Galois.EXPONENT[Frame._modN(bit + polynomial[0])];
      }
    },
    _appendEccToData: function () {
      var i;
      var data = 0;
      var dataBlock = this._dataBlock;
      var ecc = this._calculateMaxLength();
      var eccBlock = this._eccBlock;
      for (i = 0; i < this._neccBlock1; i++) {
        this._appendData(data, dataBlock, ecc, eccBlock);
        data += dataBlock;
        ecc += eccBlock;
      }
      for (i = 0; i < this._neccBlock2; i++) {
        this._appendData(data, dataBlock + 1, ecc, eccBlock);
        data += dataBlock + 1;
        ecc += eccBlock;
      }
    },
    _applyMask: function (mask) {
      var r3x, r3y, x, y;
      var buffer = this.buffer;
      var width = this.width;
      switch (mask) {
        case 0:
          for (y = 0; y < width; y++) {
            for (x = 0; x < width; x++) {
              if (!(x + y & 1) && !this._isMasked(x, y)) {
                buffer[x + y * width] ^= 1;
              }
            }
          }
          break;
        case 1:
          for (y = 0; y < width; y++) {
            for (x = 0; x < width; x++) {
              if (!(y & 1) && !this._isMasked(x, y)) {
                buffer[x + y * width] ^= 1;
              }
            }
          }
          break;
        case 2:
          for (y = 0; y < width; y++) {
            for (r3x = 0, x = 0; x < width; x++, r3x++) {
              if (r3x === 3) {
                r3x = 0;
              }
              if (!r3x && !this._isMasked(x, y)) {
                buffer[x + y * width] ^= 1;
              }
            }
          }
          break;
        case 3:
          for (r3y = 0, y = 0; y < width; y++, r3y++) {
            if (r3y === 3) {
              r3y = 0;
            }
            for (r3x = r3y, x = 0; x < width; x++, r3x++) {
              if (r3x === 3) {
                r3x = 0;
              }
              if (!r3x && !this._isMasked(x, y)) {
                buffer[x + y * width] ^= 1;
              }
            }
          }
          break;
        case 4:
          for (y = 0; y < width; y++) {
            for (r3x = 0, r3y = y >> 1 & 1, x = 0; x < width; x++, r3x++) {
              if (r3x === 3) {
                r3x = 0;
                r3y = !r3y;
              }
              if (!r3y && !this._isMasked(x, y)) {
                buffer[x + y * width] ^= 1;
              }
            }
          }
          break;
        case 5:
          for (r3y = 0, y = 0; y < width; y++, r3y++) {
            if (r3y === 3) {
              r3y = 0;
            }
            for (r3x = 0, x = 0; x < width; x++, r3x++) {
              if (r3x === 3) {
                r3x = 0;
              }
              if (!((x & y & 1) + !(!r3x | !r3y)) && !this._isMasked(x, y)) {
                buffer[x + y * width] ^= 1;
              }
            }
          }
          break;
        case 6:
          for (r3y = 0, y = 0; y < width; y++, r3y++) {
            if (r3y === 3) {
              r3y = 0;
            }
            for (r3x = 0, x = 0; x < width; x++, r3x++) {
              if (r3x === 3) {
                r3x = 0;
              }
              if (
                !((x & y & 1) + (r3x && r3x === r3y) & 1) &&
                !this._isMasked(x, y)
              ) {
                buffer[x + y * width] ^= 1;
              }
            }
          }
          break;
        case 7:
          for (r3y = 0, y = 0; y < width; y++, r3y++) {
            if (r3y === 3) {
              r3y = 0;
            }
            for (r3x = 0, x = 0; x < width; x++, r3x++) {
              if (r3x === 3) {
                r3x = 0;
              }
              if (
                !((r3x && r3x === r3y) + (x + y & 1) & 1) &&
                !this._isMasked(x, y)
              ) {
                buffer[x + y * width] ^= 1;
              }
            }
          }
          break;
      }
    },
    _calculateMaxLength: function () {
      return this._dataBlock * (this._neccBlock1 + this._neccBlock2) +
        this._neccBlock2;
    },
    _calculatePolynomial: function () {
      var i, j;
      var eccBlock = this._eccBlock;
      var polynomial = this._polynomial;
      polynomial[0] = 1;
      for (i = 0; i < eccBlock; i++) {
        polynomial[i + 1] = 1;
        for (j = i; j > 0; j--) {
          polynomial[j] = polynomial[j]
            ? polynomial[j - 1] ^
              Galois.EXPONENT[Frame._modN(Galois.LOG[polynomial[j]] + i)]
            : polynomial[j - 1];
        }
        polynomial[0] =
          Galois.EXPONENT[Frame._modN(Galois.LOG[polynomial[0]] + i)];
      }
      for (i = 0; i <= eccBlock; i++) {
        polynomial[i] = Galois.LOG[polynomial[i]];
      }
    },
    _checkBadness: function () {
      var b, b1, h, x, y;
      var bad = 0;
      var badness = this._badness;
      var buffer = this.buffer;
      var width = this.width;
      for (y = 0; y < width - 1; y++) {
        for (x = 0; x < width - 1; x++) {
          if (
            buffer[x + width * y] && buffer[x + 1 + width * y] &&
              buffer[x + width * (y + 1)] && buffer[x + 1 + width * (y + 1)] ||
            !(buffer[x + width * y] || buffer[x + 1 + width * y] ||
              buffer[x + width * (y + 1)] || buffer[x + 1 + width * (y + 1)])
          ) {
            bad += Frame.N2;
          }
        }
      }
      var bw = 0;
      for (y = 0; y < width; y++) {
        h = 0;
        badness[0] = 0;
        for (b = 0, x = 0; x < width; x++) {
          b1 = buffer[x + width * y];
          if (b === b1) {
            badness[h]++;
          } else {
            badness[++h] = 1;
          }
          b = b1;
          bw += b ? 1 : -1;
        }
        bad += this._getBadness(h);
      }
      if (bw < 0) {
        bw = -bw;
      }
      var count = 0;
      var big = bw;
      big += big << 2;
      big <<= 1;
      while (big > width * width) {
        big -= width * width;
        count++;
      }
      bad += count * Frame.N4;
      for (x = 0; x < width; x++) {
        h = 0;
        badness[0] = 0;
        for (b = 0, y = 0; y < width; y++) {
          b1 = buffer[x + width * y];
          if (b === b1) {
            badness[h]++;
          } else {
            badness[++h] = 1;
          }
          b = b1;
        }
        bad += this._getBadness(h);
      }
      return bad;
    },
    _convertBitStream: function (length) {
      var bit, i;
      var ecc = this._ecc;
      var version = this._version;
      for (i = 0; i < length; i++) {
        ecc[i] = this._value.charCodeAt(i);
      }
      var stringBuffer = this._stringBuffer = ecc.slice();
      var maxLength = this._calculateMaxLength();
      if (length >= maxLength - 2) {
        length = maxLength - 2;
        if (version > 9) {
          length--;
        }
      }
      var index = length;
      if (version > 9) {
        stringBuffer[index + 2] = 0;
        stringBuffer[index + 3] = 0;
        while (index--) {
          bit = stringBuffer[index];
          stringBuffer[index + 3] |= 255 & bit << 4;
          stringBuffer[index + 2] = bit >> 4;
        }
        stringBuffer[2] |= 255 & length << 4;
        stringBuffer[1] = length >> 4;
        stringBuffer[0] = 64 | length >> 12;
      } else {
        stringBuffer[index + 1] = 0;
        stringBuffer[index + 2] = 0;
        while (index--) {
          bit = stringBuffer[index];
          stringBuffer[index + 2] |= 255 & bit << 4;
          stringBuffer[index + 1] = bit >> 4;
        }
        stringBuffer[1] |= 255 & length << 4;
        stringBuffer[0] = 64 | length >> 4;
      }
      index = length + 3 - (version < 10);
      while (index < maxLength) {
        stringBuffer[index++] = 236;
        stringBuffer[index++] = 17;
      }
    },
    _getBadness: function (length) {
      var i;
      var badRuns = 0;
      var badness = this._badness;
      for (i = 0; i <= length; i++) {
        if (badness[i] >= 5) {
          badRuns += Frame.N1 + badness[i] - 5;
        }
      }
      for (i = 3; i < length - 1; i += 2) {
        if (
          badness[i - 2] === badness[i + 2] &&
          badness[i + 2] === badness[i - 1] &&
          badness[i - 1] === badness[i + 1] &&
          badness[i - 1] * 3 === badness[i] &&
          (badness[i - 3] === 0 || i + 3 > length ||
            badness[i - 3] * 3 >= badness[i] * 4 ||
            badness[i + 3] * 3 >= badness[i] * 4)
        ) {
          badRuns += Frame.N3;
        }
      }
      return badRuns;
    },
    _finish: function () {
      this._stringBuffer = this.buffer.slice();
      var currentMask, i;
      var bit = 0;
      var mask = 3e4;
      for (i = 0; i < 8; i++) {
        this._applyMask(i);
        currentMask = this._checkBadness();
        if (currentMask < mask) {
          mask = currentMask;
          bit = i;
        }
        if (bit === 7) {
          break;
        }
        this.buffer = this._stringBuffer.slice();
      }
      if (bit !== i) {
        this._applyMask(bit);
      }
      mask = ErrorCorrection.FINAL_FORMAT[bit + (this._level - 1 << 3)];
      var buffer = this.buffer;
      var width = this.width;
      for (i = 0; i < 8; i++, mask >>= 1) {
        if (mask & 1) {
          buffer[width - 1 - i + width * 8] = 1;
          if (i < 6) {
            buffer[8 + width * i] = 1;
          } else {
            buffer[8 + width * (i + 1)] = 1;
          }
        }
      }
      for (i = 0; i < 7; i++, mask >>= 1) {
        if (mask & 1) {
          buffer[8 + width * (width - 7 + i)] = 1;
          if (i) {
            buffer[6 - i + width * 8] = 1;
          } else {
            buffer[7 + width * 8] = 1;
          }
        }
      }
    },
    _interleaveBlocks: function () {
      var i, j;
      var dataBlock = this._dataBlock;
      var ecc = this._ecc;
      var eccBlock = this._eccBlock;
      var k = 0;
      var maxLength = this._calculateMaxLength();
      var neccBlock1 = this._neccBlock1;
      var neccBlock2 = this._neccBlock2;
      var stringBuffer = this._stringBuffer;
      for (i = 0; i < dataBlock; i++) {
        for (j = 0; j < neccBlock1; j++) {
          ecc[k++] = stringBuffer[i + j * dataBlock];
        }
        for (j = 0; j < neccBlock2; j++) {
          ecc[k++] =
            stringBuffer[neccBlock1 * dataBlock + i + j * (dataBlock + 1)];
        }
      }
      for (j = 0; j < neccBlock2; j++) {
        ecc[k++] =
          stringBuffer[neccBlock1 * dataBlock + i + j * (dataBlock + 1)];
      }
      for (i = 0; i < eccBlock; i++) {
        for (j = 0; j < neccBlock1 + neccBlock2; j++) {
          ecc[k++] = stringBuffer[maxLength + i + j * eccBlock];
        }
      }
      this._stringBuffer = ecc;
    },
    _insertAlignments: function () {
      var i, x, y;
      var version = this._version;
      var width = this.width;
      if (version > 1) {
        i = Alignment.BLOCK[version];
        y = width - 7;
        for (;;) {
          x = width - 7;
          while (x > i - 3) {
            this._addAlignment(x, y);
            if (x < i) {
              break;
            }
            x -= i;
          }
          if (y <= i + 9) {
            break;
          }
          y -= i;
          this._addAlignment(6, y);
          this._addAlignment(y, 6);
        }
      }
    },
    _insertFinders: function () {
      var i, j, x, y;
      var buffer = this.buffer;
      var width = this.width;
      for (i = 0; i < 3; i++) {
        j = 0;
        y = 0;
        if (i === 1) {
          j = width - 7;
        }
        if (i === 2) {
          y = width - 7;
        }
        buffer[y + 3 + width * (j + 3)] = 1;
        for (x = 0; x < 6; x++) {
          buffer[y + x + width * j] = 1;
          buffer[y + width * (j + x + 1)] = 1;
          buffer[y + 6 + width * (j + x)] = 1;
          buffer[y + x + 1 + width * (j + 6)] = 1;
        }
        for (x = 1; x < 5; x++) {
          this._setMask(y + x, j + 1);
          this._setMask(y + 1, j + x + 1);
          this._setMask(y + 5, j + x);
          this._setMask(y + x + 1, j + 5);
        }
        for (x = 2; x < 4; x++) {
          buffer[y + x + width * (j + 2)] = 1;
          buffer[y + 2 + width * (j + x + 1)] = 1;
          buffer[y + 4 + width * (j + x)] = 1;
          buffer[y + x + 1 + width * (j + 4)] = 1;
        }
      }
    },
    _insertTimingGap: function () {
      var x, y;
      var width = this.width;
      for (y = 0; y < 7; y++) {
        this._setMask(7, y);
        this._setMask(width - 8, y);
        this._setMask(7, y + width - 7);
      }
      for (x = 0; x < 8; x++) {
        this._setMask(x, 7);
        this._setMask(x + width - 8, 7);
        this._setMask(x, width - 8);
      }
    },
    _insertTimingRowAndColumn: function () {
      var x;
      var buffer = this.buffer;
      var width = this.width;
      for (x = 0; x < width - 14; x++) {
        if (x & 1) {
          this._setMask(8 + x, 6);
          this._setMask(6, 8 + x);
        } else {
          buffer[8 + x + width * 6] = 1;
          buffer[6 + width * (8 + x)] = 1;
        }
      }
    },
    _insertVersion: function () {
      var i, j, x, y;
      var buffer = this.buffer;
      var version = this._version;
      var width = this.width;
      if (version > 6) {
        i = Version.BLOCK[version - 7];
        j = 17;
        for (x = 0; x < 6; x++) {
          for (y = 0; y < 3; y++, j--) {
            if (1 & (j > 11 ? version >> j - 12 : i >> j)) {
              buffer[5 - x + width * (2 - y + width - 11)] = 1;
              buffer[2 - y + width - 11 + width * (5 - x)] = 1;
            } else {
              this._setMask(5 - x, 2 - y + width - 11);
              this._setMask(2 - y + width - 11, 5 - x);
            }
          }
        }
      }
    },
    _isMasked: function (x, y) {
      var bit = Frame._getMaskBit(x, y);
      return this._mask[bit] === 1;
    },
    _pack: function () {
      var bit, i, j;
      var k = 1;
      var v = 1;
      var width = this.width;
      var x = width - 1;
      var y = width - 1;
      var length =
        (this._dataBlock + this._eccBlock) *
          (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
      for (i = 0; i < length; i++) {
        bit = this._stringBuffer[i];
        for (j = 0; j < 8; j++, bit <<= 1) {
          if (128 & bit) {
            this.buffer[x + width * y] = 1;
          }
          do {
            if (v) {
              x--;
            } else {
              x++;
              if (k) {
                if (y !== 0) {
                  y--;
                } else {
                  x -= 2;
                  k = !k;
                  if (x === 6) {
                    x--;
                    y = 9;
                  }
                }
              } else if (y !== width - 1) {
                y++;
              } else {
                x -= 2;
                k = !k;
                if (x === 6) {
                  x--;
                  y -= 8;
                }
              }
            }
            v = !v;
          } while (this._isMasked(x, y));
        }
      }
    },
    _reverseMask: function () {
      var x, y;
      var width = this.width;
      for (x = 0; x < 9; x++) {
        this._setMask(x, 8);
      }
      for (x = 0; x < 8; x++) {
        this._setMask(x + width - 8, 8);
        this._setMask(8, x);
      }
      for (y = 0; y < 7; y++) {
        this._setMask(8, y + width - 7);
      }
    },
    _setMask: function (x, y) {
      var bit = Frame._getMaskBit(x, y);
      this._mask[bit] = 1;
    },
    _syncMask: function () {
      var x, y;
      var width = this.width;
      for (y = 0; y < width; y++) {
        for (x = 0; x <= y; x++) {
          if (this.buffer[x + width * y]) {
            this._setMask(x, y);
          }
        }
      }
    },
  }, {
    _createArray: function (length) {
      var i;
      var array = [];
      for (i = 0; i < length; i++) {
        array[i] = 0;
      }
      return array;
    },
    _getMaskBit: function (x, y) {
      var bit;
      if (x > y) {
        bit = x;
        x = y;
        y = bit;
      }
      bit = y;
      bit += y * y;
      bit >>= 1;
      bit += x;
      return bit;
    },
    _modN: function (x) {
      while (x >= 255) {
        x -= 255;
        x = (x >> 8) + (x & 255);
      }
      return x;
    },
    N1: 3,
    N2: 3,
    N3: 40,
    N4: 10,
  });
  module.exports = Frame;
});

// ../../node_modules/qrious-core/src/renderer/ImageRenderer.js
var require_ImageRenderer = __commonJS((exports, module) => {
  "use strict";
  var Renderer = require_Renderer();
  var ImageRenderer = Renderer.extend({
    draw: function () {
      this.element.src = this.qrious.toDataURL();
    },
    reset: function () {
      this.element.src = "";
    },
    resize: function () {
      var element = this.element;
      element.width = element.height = this.qrious.size;
    },
  });
  module.exports = ImageRenderer;
});

// ../../node_modules/qrious-core/src/option/Option.js
var require_Option = __commonJS((exports, module) => {
  "use strict";
  var Nevis = require_lite();
  var Option = Nevis.extend(
    function (name, modifiable, defaultValue, valueTransformer) {
      this.name = name;
      this.modifiable = Boolean(modifiable);
      this.defaultValue = defaultValue;
      this._valueTransformer = valueTransformer;
    },
    {
      transform: function (value) {
        var transformer = this._valueTransformer;
        if (typeof transformer === "function") {
          return transformer(value, this);
        }
        return value;
      },
    },
  );
  module.exports = Option;
});

// ../../node_modules/qrious-core/src/util/Utilities.js
var require_Utilities = __commonJS((exports, module) => {
  "use strict";
  var Nevis = require_lite();
  var Utilities = Nevis.extend(null, {
    abs: function (value) {
      return value != null ? Math.abs(value) : null;
    },
    hasOwn: function (object, name) {
      return Object.prototype.hasOwnProperty.call(object, name);
    },
    noop: function () {
    },
    toUpperCase: function (string) {
      return string != null ? string.toUpperCase() : null;
    },
  });
  module.exports = Utilities;
});

// ../../node_modules/qrious-core/src/option/OptionManager.js
var require_OptionManager = __commonJS((exports, module) => {
  "use strict";
  var Nevis = require_lite();
  var Utilities = require_Utilities();
  var OptionManager = Nevis.extend(function (options) {
    this.options = {};
    options.forEach(function (option) {
      this.options[option.name] = option;
    }, this);
  }, {
    exists: function (name) {
      return this.options[name] != null;
    },
    get: function (name, target) {
      return OptionManager._get(this.options[name], target);
    },
    getAll: function (target) {
      var name;
      var options = this.options;
      var result = {};
      for (name in options) {
        if (Utilities.hasOwn(options, name)) {
          result[name] = OptionManager._get(options[name], target);
        }
      }
      return result;
    },
    init: function (options, target, changeHandler) {
      if (typeof changeHandler !== "function") {
        changeHandler = Utilities.noop;
      }
      var name, option;
      for (name in this.options) {
        if (Utilities.hasOwn(this.options, name)) {
          option = this.options[name];
          OptionManager._set(option, option.defaultValue, target);
          OptionManager._createAccessor(option, target, changeHandler);
        }
      }
      this._setAll(options, target, true);
    },
    set: function (name, value, target) {
      return this._set(name, value, target);
    },
    setAll: function (options, target) {
      return this._setAll(options, target);
    },
    _set: function (name, value, target, allowUnmodifiable) {
      var option = this.options[name];
      if (!option) {
        throw new Error("Invalid option: " + name);
      }
      if (!option.modifiable && !allowUnmodifiable) {
        throw new Error("Option cannot be modified: " + name);
      }
      return OptionManager._set(option, value, target);
    },
    _setAll: function (options, target, allowUnmodifiable) {
      if (!options) {
        return false;
      }
      var name;
      var changed = false;
      for (name in options) {
        if (
          Utilities.hasOwn(options, name) &&
          this._set(name, options[name], target, allowUnmodifiable)
        ) {
          changed = true;
        }
      }
      return changed;
    },
  }, {
    _createAccessor: function (option, target, changeHandler) {
      var descriptor = {
        get: function () {
          return OptionManager._get(option, target);
        },
      };
      if (option.modifiable) {
        descriptor.set = function (value) {
          if (OptionManager._set(option, value, target)) {
            changeHandler(value, option);
          }
        };
      }
      Object.defineProperty(target, option.name, descriptor);
    },
    _get: function (option, target) {
      return target["_" + option.name];
    },
    _set: function (option, value, target) {
      var fieldName = "_" + option.name;
      var oldValue = target[fieldName];
      var newValue = option.transform(
        value != null ? value : option.defaultValue,
      );
      target[fieldName] = newValue;
      return newValue !== oldValue;
    },
  });
  module.exports = OptionManager;
});

// ../../node_modules/qrious-core/src/service/ServiceManager.js
var require_ServiceManager = __commonJS((exports, module) => {
  "use strict";
  var Nevis = require_lite();
  var ServiceManager = Nevis.extend(function () {
    this._services = {};
  }, {
    getService: function (name) {
      var service = this._services[name];
      if (!service) {
        throw new Error("Service is not being managed with name: " + name);
      }
      return service;
    },
    setService: function (name, service) {
      if (this._services[name]) {
        throw new Error("Service is already managed with name: " + name);
      }
      if (service) {
        this._services[name] = service;
      }
    },
  });
  module.exports = ServiceManager;
});

// ../../node_modules/qrious-core/src/QRious.js
var require_QRious = __commonJS((exports, module) => {
  "use strict";
  var Nevis = require_lite();
  var CanvasRenderer = require_CanvasRenderer();
  var Frame = require_Frame();
  var ImageRenderer = require_ImageRenderer();
  var Option = require_Option();
  var OptionManager = require_OptionManager();
  var ServiceManager = require_ServiceManager();
  var Utilities = require_Utilities();
  var optionManager = new OptionManager([
    new Option("background", true, "white"),
    new Option("backgroundAlpha", true, 1, Utilities.abs),
    new Option("element"),
    new Option("foreground", true, "black"),
    new Option("foregroundAlpha", true, 1, Utilities.abs),
    new Option("level", true, "L", Utilities.toUpperCase),
    new Option("mime", true, "image/png"),
    new Option("padding", true, null, Utilities.abs),
    new Option("size", true, 100, Utilities.abs),
    new Option("value", true, ""),
  ]);
  var serviceManager = new ServiceManager();
  var QRious = Nevis.extend(function (options) {
    optionManager.init(options, this, this.update.bind(this));
    var element = optionManager.get("element", this);
    var elementService = serviceManager.getService("element");
    var canvas = element && elementService.isCanvas(element)
      ? element
      : elementService.createCanvas();
    var image = element && elementService.isImage(element)
      ? element
      : elementService.createImage();
    this._canvasRenderer = new CanvasRenderer(this, canvas, true);
    this._imageRenderer = new ImageRenderer(this, image, image === element);
    this.update();
  }, {
    get: function () {
      return optionManager.getAll(this);
    },
    set: function (options) {
      if (optionManager.setAll(options, this)) {
        this.update();
      }
    },
    toDataURL: function (mime) {
      return this.canvas.toDataURL(mime || this.mime);
    },
    update: function () {
      var frame = new Frame({
        level: this.level,
        value: this.value,
      });
      this._canvasRenderer.render(frame);
      this._imageRenderer.render(frame);
    },
  }, {
    use: function (service) {
      serviceManager.setService(service.getName(), service);
    },
  });
  Object.defineProperties(QRious.prototype, {
    canvas: {
      get: function () {
        return this._canvasRenderer.getElement();
      },
    },
    image: {
      get: function () {
        return this._imageRenderer.getElement();
      },
    },
  });
  module.exports = QRious;
});

// ../../node_modules/qrious-core/index.js
var require_qrious_core = __commonJS((exports, module) => {
  "use strict";
  module.exports = require_QRious();
});

// ../../node_modules/qrious-core/src/service/Service.js
var require_Service = __commonJS((exports, module) => {
  "use strict";
  var Nevis = require_lite();
  var Service = Nevis.extend({
    getName: function () {
    },
  });
  module.exports = Service;
});

// ../../node_modules/qrious-core/src/service/element/ElementService.js
var require_ElementService = __commonJS((exports, module) => {
  "use strict";
  var Service = require_Service();
  var ElementService = Service.extend({
    createCanvas: function () {
    },
    createImage: function () {
    },
    getName: function () {
      return "element";
    },
    isCanvas: function (element) {
    },
    isImage: function (element) {
    },
  });
  module.exports = ElementService;
});

// src/service/element/BrowserElementService.js
var require_BrowserElementService = __commonJS((exports, module) => {
  "use strict";
  var ElementService = require_ElementService();
  var BrowserElementService = ElementService.extend({
    createCanvas: function () {
      return document.createElement("canvas");
    },
    createImage: function () {
      return document.createElement("img");
    },
    isCanvas: function (element) {
      return element instanceof HTMLCanvasElement;
    },
    isImage: function (element) {
      return element instanceof HTMLImageElement;
    },
  });
  module.exports = BrowserElementService;
});

// src/QRious.js
var require_QRious2 = __commonJS((exports, module) => {
  "use strict";
  var QRious = require_qrious_core();
  var BrowserElementService = require_BrowserElementService();
  QRious.use(new BrowserElementService());
  module.exports = QRious;
  try {
    window.QRious = QRious;
  } catch (e) {
    console.log(e);
  }
});
export default require_QRious2();