"use strict";
!function (e, r) {
    "object" == typeof exports && "undefined" != typeof module
        ? r(exports, require("react/jsx-runtime"), require("react"))
        : "function" == typeof define && define.amd
            ? define(["exports", "react/jsx-runtime", "react"], r)
            : r((e = "undefined" != typeof globalThis ? globalThis : e || self)
                .emotionReactJSXRuntime = this, e.ReactJSX, e.React);
}(this, (function (e, r, t) {
    "use strict";
    var n = function () {
        function e(e) {
            var r = this;
            this._insertTag = function (e) {
                var t;
                t = 0 === r.tags.length
                    ? r.prepend ? r.container.firstChild : r.before
                    : r.tags[r.tags.length - 1].nextSibling,
                    r.container.insertBefore(e, t),
                    r.tags.push(e);
            },
                this.isSpeedy = void 0 === e.speedy || e.speedy,
                this.tags = [],
                this.ctr = 0,
                this.nonce = e.nonce,
                this.key = e.key,
                this.container = e.container,
                this.prepend = e.prepend,
                this.before = null;
        }
        var r = e.prototype;
        return r.hydrate = function (e) {
            e.forEach(this._insertTag);
        },
            r.insert = function (e) {
                this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 &&
                    this._insertTag(function (e) {
                        var r = document.createElement("style");
                        return r.setAttribute("data-emotion", e.key),
                            void 0 !== e.nonce && r.setAttribute("nonce", e.nonce),
                            r.appendChild(document.createTextNode("")),
                            r.setAttribute("data-s", ""),
                            r;
                    }(this));
                var r = this.tags[this.tags.length - 1];
                if (this.isSpeedy) {
                    var t = function (e) {
                        if (e.sheet)
                            return e.sheet;
                        for (var r = 0; r < document.styleSheets.length; r++) {
                            if (document.styleSheets[r].ownerNode === e) {
                                return document.styleSheets[r];
                            }
                        }
                    }(r);
                    try {
                        t.insertRule(e, t.cssRules.length);
                    }
                    catch (e) {
                        0;
                    }
                }
                else
                    r.appendChild(document.createTextNode(e));
                this.ctr++;
            },
            r.flush = function () {
                this.tags.forEach((function (e) {
                    return e.parentNode.removeChild(e);
                })),
                    this.tags = [],
                    this.ctr = 0;
            },
            e;
    }(), a = "-ms-", s = "-moz-", c = "-webkit-", o = "comm", i = "rule", u = "decl", l = Math.abs, f = String.fromCharCode;
    function d(e) {
        return e.trim();
    }
    function p(e, r, t) {
        return e.replace(r, t);
    }
    function h(e, r) {
        return 0 | e.charCodeAt(r);
    }
    function v(e, r, t) {
        return e.slice(r, t);
    }
    function m(e) {
        return e.length;
    }
    function y(e) {
        return e.length;
    }
    function g(e, r) {
        return r.push(e), e;
    }
    var b = 1, x = 1, w = 0, k = 0, $ = 0, C = "";
    function A(e, r, t, n, a, s, c) {
        return {
            value: e,
            root: r,
            parent: t,
            type: n,
            props: a,
            children: s,
            line: b,
            column: x,
            length: c,
            return: "",
        };
    }
    function S(e, r, t) {
        return A(e, r.root, r.parent, t, r.props, r.children, 0);
    }
    function _() {
        return $ = k < w ? h(C, k++) : 0, x++, 10 === $ && (x = 1, b++), $;
    }
    function j() {
        return h(C, k);
    }
    function O() {
        return k;
    }
    function E(e, r) {
        return v(C, e, r);
    }
    function N(e) {
        switch (e) {
            case 0:
            case 9:
            case 10:
            case 13:
            case 32:
                return 5;
            case 33:
            case 43:
            case 44:
            case 47:
            case 62:
            case 64:
            case 126:
            case 59:
            case 123:
            case 125:
                return 4;
            case 58:
                return 3;
            case 34:
            case 39:
            case 40:
            case 91:
                return 2;
            case 41:
            case 93:
                return 1;
        }
        return 0;
    }
    function R(e) {
        return b = x = 1, w = m(C = e), k = 0, [];
    }
    function T(e) {
        return C = "", e;
    }
    function z(e) {
        return d(E(k - 1, P(91 === e ? e + 2 : 40 === e ? e + 1 : e)));
    }
    function M(e) {
        for (; ($ = j()) && $ < 33;)
            _();
        return N(e) > 2 || N($) > 3 ? "" : " ";
    }
    function P(e) {
        for (; _();) {
            switch ($) {
                case e:
                    return k;
                case 34:
                case 39:
                    return P(34 === e || 39 === e ? e : $);
                case 40:
                    41 === e && P(e);
                    break;
                case 92:
                    _();
            }
        }
        return k;
    }
    function G(e, r) {
        for (; _() && e + $ !== 57 && (e + $ !== 84 || 47 !== j());)
            ;
        return "/*" + E(r, k - 1) + "*" + f(47 === e ? e : _());
    }
    function I(e) {
        for (; !N(j());)
            _();
        return E(e, k);
    }
    function q(e) {
        return T(W("", null, null, null, [""], e = R(e), 0, [0], e));
    }
    function W(e, r, t, n, a, s, c, o, i) {
        for (var u = 0, l = 0, d = c, h = 0, v = 0, y = 0, b = 1, x = 1, w = 1, k = 0, $ = "", C = a, A = s, S = n, E = $; x;) {
            switch (y = k, k = _()) {
                case 34:
                case 39:
                case 91:
                case 40:
                    E += z(k);
                    break;
                case 9:
                case 10:
                case 13:
                case 32:
                    E += M(y);
                    break;
                case 47:
                    switch (j()) {
                        case 42:
                        case 47:
                            g(F(G(_(), O()), r, t), i);
                            break;
                        default:
                            E += "/";
                    }
                    break;
                case 123 * b:
                    o[u++] = m(E) * w;
                case 125 * b:
                case 59:
                case 0:
                    switch (k) {
                        case 0:
                        case 125:
                            x = 0;
                        case 59 + l:
                            v > 0 && g(v > 32
                                ? L(E + ";", n, t, d - 1)
                                : L(p(E, " ", "") + ";", n, t, d - 2), i);
                            break;
                        case 59:
                            E += ";";
                        default:
                            if (g(S = D(E, r, t, u, l, a, o, $, C = [], A = [], d), s),
                                123 === k) {
                                if (0 === l)
                                    W(E, r, S, S, C, s, d, o, A);
                                else {
                                    switch (h) {
                                        case 100:
                                        case 109:
                                        case 115:
                                            W(e, S, S, n && g(D(e, S, S, 0, 0, a, o, $, a, C = [], d), A), a, A, d, o, n ? C : A);
                                            break;
                                        default:
                                            W(E, S, S, S, [""], A, d, o, A);
                                    }
                                }
                            }
                    }
                    u = l = v = 0, b = w = 1, $ = E = "", d = c;
                    break;
                case 58:
                    d = 1 + m(E), v = y;
                default:
                    switch (E += f(k), k * b) {
                        case 38:
                            w = l > 0 ? 1 : (E += "\f", -1);
                            break;
                        case 44:
                            o[u++] = (m(E) - 1) * w, w = 1;
                            break;
                        case 64:
                            45 === j() && (E += z(_())),
                                h = j(),
                                l = m($ = E += I(O())),
                                k++;
                            break;
                        case 45:
                            45 === y && 2 == m(E) && (b = 0);
                    }
            }
        }
        return s;
    }
    function D(e, r, t, n, a, s, c, o, u, f, h) {
        for (var m = a - 1, g = 0 === a ? s : [""], b = y(g), x = 0, w = 0, k = 0; x < n; ++x) {
            for (var $ = 0, C = v(e, m + 1, m = l(w = c[x])), S = e; $ < b; ++$) {
                (S = d(w > 0 ? g[$] + " " + C : p(C, /&\f/g, g[$]))) && (u[k++] = S);
            }
        }
        return A(e, r, t, 0 === a ? i : o, u, f, h);
    }
    function F(e, r, t) {
        return A(e, r, t, o, f($), v(e, 2, -2), 0);
    }
    function L(e, r, t, n) {
        return A(e, r, t, u, v(e, 0, n), v(e, n + 1, -1), n);
    }
    function H(e, r) {
        switch (function (e, r) {
            return (((r << 2 ^ h(e, 0)) << 2 ^ h(e, 1)) << 2 ^ h(e, 2)) << 2 ^
                h(e, 3);
        }(e, r)) {
            case 5737:
            case 4201:
            case 3177:
            case 3433:
            case 1641:
            case 4457:
            case 2921:
            case 5572:
            case 6356:
            case 5844:
            case 3191:
            case 6645:
            case 3005:
            case 6391:
            case 5879:
            case 5623:
            case 6135:
            case 4599:
            case 4855:
            case 4215:
            case 6389:
            case 5109:
            case 5365:
            case 5621:
            case 3829:
                return c + e + e;
            case 5349:
            case 4246:
            case 4810:
            case 6968:
            case 2756:
                return c + e + s + e + a + e + e;
            case 6828:
            case 4268:
                return c + e + a + e + e;
            case 6165:
                return c + e + a + "flex-" + e + e;
            case 5187:
                return c + e +
                    p(e, /(\w+).+(:[^]+)/, c + "box-$1$2" + a + "flex-$1$2") + e;
            case 5443:
                return c + e + a + "flex-item-" + p(e, /flex-|-self/, "") + e;
            case 4675:
                return c + e + a + "flex-line-pack" +
                    p(e, /align-content|flex-|-self/, "") + e;
            case 5548:
                return c + e + a + p(e, "shrink", "negative") + e;
            case 5292:
                return c + e + a + p(e, "basis", "preferred-size") + e;
            case 6060:
                return c + "box-" + p(e, "-grow", "") + c + e + a +
                    p(e, "grow", "positive") + e;
            case 4554:
                return c + p(e, /([^-])(transform)/g, "$1" + c + "$2") + e;
            case 6187:
                return p(p(p(e, /(zoom-|grab)/, c + "$1"), /(image-set)/, c + "$1"), e, "") + e;
            case 5495:
            case 3959:
                return p(e, /(image-set\([^]*)/, c + "$1$`$1");
            case 4968:
                return p(p(e, /(.+:)(flex-)?(.*)/, c + "box-pack:$3" + a + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + c + e + e;
            case 4095:
            case 3583:
            case 4068:
            case 2532:
                return p(e, /(.+)-inline(.+)/, c + "$1$2") + e;
            case 8116:
            case 7059:
            case 5753:
            case 5535:
            case 5445:
            case 5701:
            case 4933:
            case 4677:
            case 5533:
            case 5789:
            case 5021:
            case 4765:
                if (m(e) - 1 - r > 6) {
                    switch (h(e, r + 1)) {
                        case 109:
                            return p(e, /(.+:)(.+)-([^]+)/, "$1" + c + "$2-$3$1" + s + "$2-$3") + e;
                        case 102:
                            return p(e, /(.+:)(.+)-([^]+)/, "$1" + c + "$2-$3$1" + s + "$3") + e;
                        case 115:
                            return H(p(e, "stretch", "fill-available"), r) + e;
                    }
                }
                break;
            case 4949:
                if (115 !== h(e, r + 1))
                    break;
            case 6444:
                switch (h(e, m(e) - 3 - (~function (e, r) {
                    return e.indexOf(r);
                }(e, "!important") && 10))) {
                    case 107:
                    case 111:
                        return p(e, e, c + e) + e;
                    case 101:
                        return p(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + c + (45 === h(e, 14) ? "inline-" : "") + "box$3$1" + c +
                            "$2$3$1" + a + "$2box$3") + e;
                }
                break;
            case 5936:
                switch (h(e, r + 11)) {
                    case 114:
                        return c + e + a + p(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
                    case 108:
                        return c + e + a + p(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
                    case 45:
                        return c + e + a + p(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
                }
                return c + e + a + e + e;
        }
        return e;
    }
    function J(e, r) {
        for (var t = "", n = y(e), a = 0; a < n; a++)
            t += r(e[a], a, e, r) || "";
        return t;
    }
    function X(e, r, t, n) {
        switch (e.type) {
            case "@import":
            case u:
                return e.return = e.return || e.value;
            case o:
                return "";
            case i:
                e.value = e.props.join(",");
        }
        return m(t = J(e.children, n)) ? e.return = e.value + "{" + t + "}" : "";
    }
    function B(e) {
        return function (r) {
            r.root || (r = r.return) && e(r);
        };
    }
    function U(e) {
        var r = Object.create(null);
        return function (t) {
            return void 0 === r[t] && (r[t] = e(t)), r[t];
        };
    }
    var Y = function (e, r) {
        return T(function (e, r) {
            var t = -1, n = 44;
            do {
                switch (N(n)) {
                    case 0:
                        38 === n && 12 === j() && (r[t] = 1), e[t] += I(k - 1);
                        break;
                    case 2:
                        e[t] += z(n);
                        break;
                    case 4:
                        if (44 === n) {
                            e[++t] = 58 === j() ? "&\f" : "", r[t] = e[t].length;
                            break;
                        }
                    default:
                        e[t] += f(n);
                }
            } while (n = _());
            return e;
        }(R(e), r));
    }, Z = new WeakMap(), K = function (e) {
        if ("rule" === e.type && e.parent && e.length) {
            for (var r = e.value, t = e.parent, n = e.column === t.column && e.line === t.line; "rule" !== t.type;) {
                if (!(t = t.parent))
                    return;
            }
            if ((1 !== e.props.length || 58 === r.charCodeAt(0) || Z.get(t)) && !n) {
                Z.set(e, !0);
                for (var a = [], s = Y(r, a), c = t.props, o = 0, i = 0; o < s.length; o++) {
                    for (var u = 0; u < c.length; u++, i++) {
                        e.props[i] = a[o]
                            ? s[o].replace(/&\f/g, c[u])
                            : c[u] + " " + s[o];
                    }
                }
            }
        }
    }, Q = function (e) {
        if ("decl" === e.type) {
            var r = e.value;
            108 === r.charCodeAt(0) && 98 === r.charCodeAt(2) &&
                (e.return = "", e.value = "");
        }
    }, V = [function (e, r, t, n) {
            if (!e.return) {
                switch (e.type) {
                    case u:
                        e.return = H(e.value, e.length);
                        break;
                    case "@keyframes":
                        return J([S(p(e.value, "@", "@" + c), e, "")], n);
                    case i:
                        if (e.length) {
                            return function (e, r) {
                                return e.map(r).join("");
                            }(e.props, (function (r) {
                                switch (function (e, r) {
                                    return (e = r.exec(e)) ? e[0] : e;
                                }(r, /(::plac\w+|:read-\w+)/)) {
                                    case ":read-only":
                                    case ":read-write":
                                        return J([S(p(r, /:(read-\w+)/, ":-moz-$1"), e, "")], n);
                                    case "::placeholder":
                                        return J([
                                            S(p(r, /:(plac\w+)/, ":" + c + "input-$1"), e, ""),
                                            S(p(r, /:(plac\w+)/, ":-moz-$1"), e, ""),
                                            S(p(r, /:(plac\w+)/, a + "input-$1"), e, ""),
                                        ], n);
                                }
                                return "";
                            }));
                        }
                }
            }
        }], ee = function (e) {
        var r = e.key;
        if ("css" === r) {
            var t = document.querySelectorAll("style[data-emotion]:not([data-s])");
            Array.forEach.call(t, (function (e) {
                document.head.appendChild(e), e.setAttribute("data-s", "");
            }));
        }
        var a = e.stylisPlugins || V;
        var s, c, o = {}, i = [];
        s = e.container || document.head,
            Array.forEach.call(document.querySelectorAll("style[data-emotion]"), (function (e) {
                var t = e.getAttribute("data-emotion").split(" ");
                if (t[0] === r) {
                    for (var n = 1; n < t.length; n++)
                        o[t[n]] = !0;
                    i.push(e);
                }
            }));
        var u = [K, Q];
        var l, f = [
            X,
            B((function (e) {
                l.insert(e);
            })),
        ], d = function (e) {
            var r = y(e);
            return function (t, n, a, s) {
                for (var c = "", o = 0; o < r; o++)
                    c += e[o](t, n, a, s) || "";
                return c;
            };
        }(u.concat(a, f));
        c = function (e, r, t, n) {
            l = t,
                J(q(e ? e + "{" + r.styles + "}" : r.styles), d),
                n && (p.inserted[r.name] = !0);
        };
        var p = {
            key: r,
            sheet: new n({
                key: r,
                container: s,
                nonce: e.nonce,
                speedy: e.speedy,
                prepend: e.prepend,
            }),
            nonce: e.nonce,
            inserted: o,
            registered: {},
            insert: c,
        };
        return p.sheet.hydrate(i), p;
    }, re = Object.hasOwnProperty, te = t.createContext("undefined" != typeof HTMLElement ? ee({ key: "css" }) : null), ne = (te.Provider, function (e) {
        return t.forwardRef((function (r, n) {
            var a = t.useContext(te);
            return e(r, a, n);
        }));
    });
    !function (e, r, t) {
        e(t = {
            path: r,
            exports: {},
            require: function (e, r) {
                return function () {
                    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
                }(null == r && t.path);
            },
        }, t.exports), t.exports;
    }((function (e) {
        function r() {
            return e.exports = r = Object.assign || function (e) {
                for (var r = 1; r < arguments.length; r++) {
                    var t = arguments[r];
                    for (var n in t) {
                        Object.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    }
                }
                return e;
            },
                r.apply(this, arguments);
        }
        e.exports = r;
    }));
    var ae = t.createContext({});
    var se = {
        animationIterationCount: 1,
        borderImageOutset: 1,
        borderImageSlice: 1,
        borderImageWidth: 1,
        boxFlex: 1,
        boxFlexGroup: 1,
        boxOrdinalGroup: 1,
        columnCount: 1,
        columns: 1,
        flex: 1,
        flexGrow: 1,
        flexPositive: 1,
        flexShrink: 1,
        flexNegative: 1,
        flexOrder: 1,
        gridRow: 1,
        gridRowEnd: 1,
        gridRowSpan: 1,
        gridRowStart: 1,
        gridColumn: 1,
        gridColumnEnd: 1,
        gridColumnSpan: 1,
        gridColumnStart: 1,
        msGridRow: 1,
        msGridRowSpan: 1,
        msGridColumn: 1,
        msGridColumnSpan: 1,
        fontWeight: 1,
        lineHeight: 1,
        opacity: 1,
        order: 1,
        orphans: 1,
        tabSize: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1,
        WebkitLineClamp: 1,
        fillOpacity: 1,
        floodOpacity: 1,
        stopOpacity: 1,
        strokeDasharray: 1,
        strokeDashoffset: 1,
        strokeMiterlimit: 1,
        strokeOpacity: 1,
        strokeWidth: 1,
    }, ce = /[A-Z]|^ms/g, oe = /_EMO_([^_]+?)_([^]*?)_EMO_/g, ie = function (e) {
        return 45 === e.charCodeAt(1);
    }, ue = function (e) {
        return null != e && "boolean" != typeof e;
    }, le = U((function (e) {
        return ie(e) ? e : e.replace(ce, "-$&").toLowerCase();
    })), fe = function (e, r) {
        switch (e) {
            case "animation":
            case "animationName":
                if ("string" == typeof r) {
                    return r.replace(oe, (function (e, r, t) {
                        return pe = { name: r, styles: t, next: pe }, r;
                    }));
                }
        }
        return 1 === se[e] || ie(e) || "number" != typeof r || 0 === r
            ? r
            : r + "px";
    };
    function de(e, r, t) {
        if (null == t)
            return "";
        if (void 0 !== t.__emotion_styles)
            return t;
        switch (typeof t) {
            case "boolean":
                return "";
            case "object":
                if (1 === t.anim) {
                    return pe = { name: t.name, styles: t.styles, next: pe }, t.name;
                }
                if (void 0 !== t.styles) {
                    var n = t.next;
                    if (void 0 !== n) {
                        for (; void 0 !== n;) {
                            pe = { name: n.name, styles: n.styles, next: pe }, n = n.next;
                        }
                    }
                    var a = t.styles + ";";
                    return a;
                }
                return function (e, r, t) {
                    var n = "";
                    if (Array.isArray(t)) {
                        for (var a = 0; a < t.length; a++)
                            n += de(e, r, t[a]) + ";";
                    }
                    else {
                        for (var s in t) {
                            var c = t[s];
                            if ("object" != typeof c) {
                                null != r && void 0 !== r[c]
                                    ? n += s + "{" + r[c] + "}"
                                    : ue(c) && (n += le(s) + ":" + fe(s, c) + ";");
                            }
                            else if (!Array.isArray(c) || "string" != typeof c[0] ||
                                null != r && void 0 !== r[c[0]]) {
                                var o = de(e, r, c);
                                switch (s) {
                                    case "animation":
                                    case "animationName":
                                        n += le(s) + ":" + o + ";";
                                        break;
                                    default:
                                        n += s + "{" + o + "}";
                                }
                            }
                            else {
                                for (var i = 0; i < c.length; i++) {
                                    ue(c[i]) &&
                                        (n += le(s) + ":" + fe(s, c[i]) + ";");
                                }
                            }
                        }
                    }
                    return n;
                }(e, r, t);
            case "function":
                if (void 0 !== e) {
                    var s = pe, c = t(e);
                    return pe = s, de(e, r, c);
                }
                break;
            case "string":
        }
        if (null == r)
            return t;
        var o = r[t];
        return void 0 !== o ? o : t;
    }
    var pe, he = /label:\s*([^\s;\n{]+)\s*;/g;
    var ve = function (e, r, t) {
        if (1 === e.length && "object" == typeof e[0] && null !== e[0] &&
            void 0 !== e[0].styles) {
            return e[0];
        }
        var n = !0, a = "";
        pe = void 0;
        var s = e[0];
        null == s || void 0 === s.raw ? (n = !1, a += de(t, r, s)) : a += s[0];
        for (var c = 1; c < e.length; c++) {
            a += de(t, r, e[c]), n && (a += s[c]);
        }
        he.lastIndex = 0;
        for (var o, i = ""; null !== (o = he.exec(a));)
            i += "-" + o[1];
        var u = function (e) {
            for (var r, t = 0, n = 0, a = e.length; a >= 4; ++n, a -= 4) {
                r = 1540483477 *
                    (65535 &
                        (r = 255 & e.charCodeAt(n) | (255 & e.charCodeAt(++n)) << 8 |
                            (255 & e.charCodeAt(++n)) << 16 |
                            (255 & e.charCodeAt(++n)) << 24)) +
                    (59797 * (r >>> 16) << 16),
                    t = 1540483477 * (65535 & (r ^= r >>> 24)) +
                        (59797 * (r >>> 16) << 16) ^
                        1540483477 * (65535 & t) + (59797 * (t >>> 16) << 16);
            }
            switch (a) {
                case 3:
                    t ^= (255 & e.charCodeAt(n + 2)) << 16;
                case 2:
                    t ^= (255 & e.charCodeAt(n + 1)) << 8;
                case 1:
                    t = 1540483477 * (65535 & (t ^= 255 & e.charCodeAt(n))) +
                        (59797 * (t >>> 16) << 16);
            }
            return (((t = 1540483477 * (65535 & (t ^= t >>> 13)) +
                (59797 * (t >>> 16) << 16)) ^ t >>> 15) >>> 0).toString(36);
        }(a) + i;
        return { name: u, styles: a, next: pe };
    }, me = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", ye = function (e, r) {
        var t = {};
        for (var n in r)
            re.call(r, n) && (t[n] = r[n]);
        return t[me] = e, t;
    }, ge = ne((function (e, r, n) {
        var a = e.css;
        "string" == typeof a && void 0 !== r.registered[a] &&
            (a = r.registered[a]);
        var s = e[me], c = [a], o = "";
        "string" == typeof e.className
            ? o = function (e, r, t) {
                var n = "";
                return t.split(" ").forEach((function (t) {
                    void 0 !== e[t] ? r.push(e[t] + ";") : n += t + " ";
                })),
                    n;
            }(r.registered, c, e.className)
            : null != e.className && (o = e.className + " ");
        var i = ve(c, void 0, "function" == typeof a || Array.isArray(a)
            ? t.useContext(ae)
            : void 0);
        !function (e, r, t) {
            var n = e.key + "-" + r.name;
            if (!1 === t && void 0 === e.registered[n] &&
                (e.registered[n] = r.styles), void 0 === e.inserted[r.name]) {
                var a = r;
                do {
                    e.insert(r === a ? "." + n : "", a, e.sheet, !0), a = a.next;
                } while (void 0 !== a);
            }
        }(r, i, "string" == typeof s);
        o += r.key + "-" + i.name;
        var u = {};
        for (var l in e) {
            re.call(e, l) && "css" !== l && l !== me &&
                (u[l] = e[l]);
        }
        return u.ref = n, u.className = o, t.createElement(s, u);
    }));
    var be = r.Fragment;
    e.Fragment = be,
        e.jsx = function (e, t, n) {
            return re.call(t, "css") ? r.jsx(ge, ye(e, t), n) : r.jsx(e, t, n);
        },
        e.jsxs = function (e, t, n) {
            return re.call(t, "css") ? r.jsxs(ge, ye(e, t), n) : r.jsxs(e, t, n);
        },
        Object.defineProperty(e, "__esModule", { value: !0 });
}));
//# sourceMappingURL=emotion-react-jsx-runtime.umd.min.js.map
