function h() {}
h.prototype = {
  diff: function (e, t) {
    var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      u = o.callback;
    typeof o == "function" && (u = o, o = {}), this.options = o;
    var r = this;
    function s(l) {
      return u
        ? (setTimeout(function () {
          u(void 0, l);
        }, 0),
          !0)
        : l;
    }
    e = this.castInput(e),
      t = this.castInput(t),
      e = this.removeEmpty(this.tokenize(e)),
      t = this.removeEmpty(this.tokenize(t));
    var p = t.length,
      i = e.length,
      f = 1,
      d = p + i,
      c = [{ newPos: -1, components: [] }],
      a = this.extractCommon(c[0], t, e, 0);
    if (c[0].newPos + 1 >= p && a + 1 >= i) {
      return s([{ value: this.join(t), count: t.length }]);
    }
    function w() {
      for (var l = -1 * f; l <= f; l += 2) {
        var v = void 0, y = c[l - 1], C = c[l + 1], z = (C ? C.newPos : 0) - l;
        y && (c[l - 1] = void 0);
        var g = y && y.newPos + 1 < p, q = C && 0 <= z && z < i;
        if (!g && !q) {
          c[l] = void 0;
          continue;
        }
        if (
          !g || q && y.newPos < C.newPos
            ? (v = N(C), r.pushComponent(v.components, void 0, !0))
            : (v = y, v.newPos++, r.pushComponent(v.components, !0, void 0)),
            z = r.extractCommon(v, t, e, l),
            v.newPos + 1 >= p && z + 1 >= i
        ) {
          return s(F(r, v.components, t, e, r.useLongestToken));
        }
        c[l] = v;
      }
      f++;
    }
    if (u) {
      (function l() {
        setTimeout(function () {
          if (f > d) {
            return u();
          }
          w() || l();
        }, 0);
      })();
    } else {
      for (; f <= d;) {
        var L = w();
        if (L) {
          return L;
        }
      }
    }
  },
  pushComponent: function (e, t, o) {
    var u = e[e.length - 1];
    u && u.added === t && u.removed === o
      ? e[e.length - 1] = { count: u.count + 1, added: t, removed: o }
      : e.push({ count: 1, added: t, removed: o });
  },
  extractCommon: function (e, t, o, u) {
    for (
      var r = t.length, s = o.length, p = e.newPos, i = p - u, f = 0;
      p + 1 < r && i + 1 < s && this.equals(t[p + 1], o[i + 1]);
    ) {
      p++, i++, f++;
    }
    return f && e.components.push({ count: f }), e.newPos = p, i;
  },
  equals: function (e, t) {
    return this.options.comparator ? this.options.comparator(e, t)
    : e === t || this.options.ignoreCase && e.toLowerCase() === t.toLowerCase();
  },
  removeEmpty: function (e) {
    for (var t = [], o = 0; o < e.length; o++) {
      e[o] && t.push(e[o]);
    }
    return t;
  },
  castInput: function (e) {
    return e;
  },
  tokenize: function (e) {
    return e.split("");
  },
  join: function (e) {
    return e.join("");
  },
};
function F(n, e, t, o, u) {
  for (var r = 0, s = e.length, p = 0, i = 0; r < s; r++) {
    var f = e[r];
    if (f.removed) {
      if (
        f.value = n.join(o.slice(i, i + f.count)),
          i += f.count,
          r && e[r - 1].added
      ) {
        var c = e[r - 1];
        e[r - 1] = e[r], e[r] = c;
      }
    } else {
      if (!f.added && u) {
        var d = t.slice(p, p + f.count);
        d = d.map(function (w, L) {
          var l = o[i + L];
          return l.length > w.length ? l : w;
        }), f.value = n.join(d);
      } else {
        f.value = n.join(t.slice(p, p + f.count));
      }
      p += f.count, f.added || (i += f.count);
    }
  }
  var a = e[s - 1];
  return s > 1 && typeof a.value == "string" && (a.added || a.removed) &&
    n.equals("", a.value) && (e[s - 2].value += a.value, e.pop()),
    e;
}
function N(n) {
  return { newPos: n.newPos, components: n.components.slice(0) };
}
var W = new h();
function A(n, e, t) {
  return W.diff(n, e, t);
}
var $ = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,
  I = /\S/,
  O = new h();
O.equals = function (n, e) {
  return this.options.ignoreCase && (n = n.toLowerCase(), e = e.toLowerCase()),
    n === e || this.options.ignoreWhitespace && !I.test(n) && !I.test(e);
},
  O.tokenize = function (n) {
    for (
      var e = n.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/), t = 0;
      t < e.length - 1;
      t++
    ) {
      !e[t + 1] && e[t + 2] && $.test(e[t]) && $.test(e[t + 2]) &&
        (e[t] += e[t + 2], e.splice(t + 1, 2), t--);
    }
    return e;
  };
var T = new h();
T.tokenize = function (n) {
  var e = [], t = n.split(/(\n|\r\n)/);
  t[t.length - 1] || t.pop();
  for (var o = 0; o < t.length; o++) {
    var u = t[o];
    o % 2 && !this.options.newlineIsToken
      ? e[e.length - 1] += u
      : (this.options.ignoreWhitespace && (u = u.trim()), e.push(u));
  }
  return e;
};
var J = new h();
J.tokenize = function (n) {
  return n.split(/(\S.+?[.!?])(?=\s+|$)/);
};
var R = new h();
R.tokenize = function (n) {
  return n.split(/([{}:;,]|\s+)/);
};
function x(n) {
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
    ? x = function (e) {
      return typeof e;
    }
    : x = function (e) {
      return e && typeof Symbol == "function" && e.constructor === Symbol &&
          e !== Symbol.prototype
        ? "symbol"
        : typeof e;
    },
    x(n);
}
var V = Object.prototype.toString, m = new h();
m.useLongestToken = !0,
  m.tokenize = T.tokenize,
  m.castInput = function (n) {
    var e = this.options,
      t = e.undefinedReplacement,
      o = e.stringifyReplacer,
      u = o === void 0
        ? function (r, s) {
          return typeof s == "undefined" ? t : s;
        }
        : o;
    return typeof n == "string" ? n
    : JSON.stringify(D(n, null, null, u), u, "  ");
  },
  m.equals = function (n, e) {
    return h.prototype.equals.call(
      m,
      n.replace(/,([\r\n])/g, "$1"),
      e.replace(/,([\r\n])/g, "$1"),
    );
  };
function D(n, e, t, o, u) {
  e = e || [], t = t || [], o && (n = o(u, n));
  var r;
  for (r = 0; r < e.length; r += 1) {
    if (e[r] === n) {
      return t[r];
    }
  }
  var s;
  if (V.call(n) === "[object Array]") {
    for (
      e.push(n), s = new Array(n.length), t.push(s), r = 0; r < n.length; r += 1
    ) {
      s[r] = D(n[r], e, t, o, u);
    }
    return e.pop(), t.pop(), s;
  }
  if (n && n.toJSON && (n = n.toJSON()), x(n) === "object" && n !== null) {
    e.push(n), s = {}, t.push(s);
    var p = [], i;
    for (i in n) {
      n.hasOwnProperty(i) && p.push(i);
    }
    for (p.sort(), r = 0; r < p.length; r += 1) {
      i = p[r], s[i] = D(n[i], e, t, o, i);
    }
    e.pop(), t.pop();
  } else {
    s = n;
  }
  return s;
}
var E = new h();
E.tokenize = function (n) {
  return n.slice();
},
  E.join = E.removeEmpty = function (n) {
    return n;
  };
export { A as diffChars };
