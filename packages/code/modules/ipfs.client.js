var Ps = Object.create,
  xe = Object.defineProperty,
  Gs = Object.getPrototypeOf,
  Qs = Object.prototype.hasOwnProperty,
  Js = Object.getOwnPropertyNames,
  $s = Object.getOwnPropertyDescriptor;
var Ks = (e) => xe(e, "__esModule", { value: !0 });
var b = (e, t) =>
  () => (t || (t = { exports: {} }, e(t.exports, t)), t.exports);
var Hs = (e, t, s) => {
    if (t && typeof t == "object" || typeof t == "function") {
      for (let r of Js(t)) {
        !Qs.call(e, r) && r !== "default" && xe(e, r, {
          get: () => t[r],
          enumerable: !(s = $s(t, r)) || s.enumerable,
        });
      }
    }
    return e;
  },
  J = (e) =>
    Hs(
      Ks(xe(
        e != null
          ? Ps(Gs(e))
          : {},
        "default",
        e && e.__esModule && "default" in e
          ? { get: () => e.default, enumerable: !0 }
          : { value: e, enumerable: !0 },
      )),
      e,
    );
var Me = b(($i, Be) => {
  "use strict";
  var Xs = async (e) => {
    let t = [];
    for await (let s of e) t.push(s);
    return t;
  };
  Be.exports = Xs;
});
var $ = b((le) => {
  "use strict";
  var Zs = (e) => {
    let { name: t, message: s, stack: r, code: n, detail: i } = e;
    return { name: t, message: s, stack: r, code: n, detail: i };
  };
  le.encodeError = Zs;
  var Ys = (e) => {
    if (e instanceof Error) return e;
    {
      let { name: t, message: s, stack: r, code: n } = e;
      return Object.assign(Ws(t, s), { name: t, stack: r, code: n });
    }
  };
  le.decodeError = Ys;
  var Ws = (e, t) => {
    switch (e) {
      case "RangeError":
        return new RangeError(t);
      case "ReferenceError":
        return ReferenceError(t);
      case "SyntaxError":
        return new SyntaxError(t);
      case "TypeError":
        return new TypeError(t);
      case "URIError":
        return new URIError(t);
      default:
        return new Error(t);
    }
  };
});
var ze = b((K) => {
  "use strict";
  K.TimeoutError = class extends Error {
    get name() {
      return this.constructor.name;
    }
  };
  K.AbortError = class extends Error {
    get name() {
      return this.constructor.name;
    }
  };
  K.DisconnectError = class extends Error {
    get name() {
      return this.constructor.name;
    }
  };
});
var Fe = b((Yi, Oe) => {
  "use strict";
  var { decodeError: _s } = $(),
    { DisconnectError: er, TimeoutError: tr, AbortError: sr } = ze();
  Oe.exports = class H {
    constructor(t) {
      this.port = null,
        this.id = Math.random().toString(32).slice(2),
        this.nextID = 0,
        this.queries = Object.create(null),
        t && this.connect(t);
    }
    execute(t) {
      let s = `${this.id}@${this.nextID++}`;
      return this.queries[s] = t,
        t.timeout > 0 && t.timeout < Infinity &&
        (t.timerID = setTimeout(H.timeout, t.timeout, this, s)),
        t.signal &&
        t.signal.addEventListener("abort", () => this.abort(s), { once: !0 }),
        this.port && H.postQuery(this.port, s, t),
        t.result;
    }
    connect(t) {
      if (this.port) throw new Error("Transport is already open");
      this.port = t,
        this.port.addEventListener("message", this),
        this.port.start();
      for (let [s, r] of Object.entries(this.queries)) H.postQuery(t, s, r);
    }
    disconnect() {
      let t = new er();
      for (let [s, r] of Object.entries(this.queries)) r.fail(t), this.abort(s);
      this.port &&
        (this.port.removeEventListener("message", this), this.port.close());
    }
    static timeout(t, s) {
      let { queries: r } = t, n = r[s];
      n &&
        (delete r[s],
          n.fail(new tr("request timed out")),
          t.port && t.port.postMessage({ type: "abort", id: s }));
    }
    abort(t) {
      let { queries: s } = this, r = s[t];
      r &&
        (delete s[t],
          r.fail(new sr()),
          this.port && this.port.postMessage({ type: "abort", id: t }),
          r.timerID != null && clearTimeout(r.timerID));
    }
    static postQuery(t, s, r) {
      t.postMessage({
        type: "query",
        namespace: r.namespace,
        method: r.method,
        id: s,
        input: r.toJSON(),
      }, [...new Set(r.transfer() || [])]);
    }
    handleEvent(t) {
      let { id: s, result: r } = t.data, n = this.queries[s];
      n &&
        (delete this.queries[s],
          r.ok ? n.succeed(r.value) : n.fail(_s(r.error)),
          n.timerID != null && clearTimeout(n.timerID));
    }
  };
});
var Le = b((e0, Re) => {
  "use strict";
  Re.exports = class {
    constructor(t, s, r) {
      this.result = new Promise((n, i) => {
        this.succeed = n,
          this.fail = i,
          this.signal = r.signal,
          this.input = r,
          this.namespace = t,
          this.method = s,
          this.timeout = r.timeout == null ? Infinity : r.timeout,
          this.timerID = null;
      });
    }
    toJSON() {
      return this.input;
    }
    transfer() {
      return this.input.transfer;
    }
  };
});
var Pe = b((s0, Ve) => {
  "use strict";
  var rr = Le();
  Ve.exports = class {
    constructor(t, s, r) {
      this.transport = r;
      let n = this;
      for (let i of s) {
        n[i] = (o) => this.transport.execute(new rr(t, i.toString(), o));
      }
    }
  };
});
var B = b((n0, Ge) => {
  "use strict";
  var nr = Pe();
  Ge.exports = class {
    constructor(t, s, r) {
      this.remote = new nr(t, s, r);
    }
  };
});
var Je = b((i0, Qe) => {
  "use strict";
  function ir(e) {
    if (e.length >= 255) throw new TypeError("Alphabet too long");
    for (var t = new Uint8Array(256), s = 0; s < t.length; s++) t[s] = 255;
    for (var r = 0; r < e.length; r++) {
      var n = e.charAt(r), i = n.charCodeAt(0);
      if (t[i] !== 255) throw new TypeError(n + " is ambiguous");
      t[i] = r;
    }
    var o = e.length,
      a = e.charAt(0),
      l = Math.log(o) / Math.log(256),
      k = Math.log(256) / Math.log(o);
    function G(c) {
      if (
        c instanceof Uint8Array || (ArrayBuffer.isView(c)
          ? c = new Uint8Array(c.buffer, c.byteOffset, c.byteLength)
          : Array.isArray(c) && (c = Uint8Array.from(c))),
          !(c instanceof Uint8Array)
      ) {
        throw new TypeError("Expected Uint8Array");
      }
      if (c.length === 0) return "";
      for (var d = 0, I = 0, f = 0, m = c.length; f !== m && c[f] === 0;) {
        f++, d++;
      }
      for (var g = (m - f) * k + 1 >>> 0, u = new Uint8Array(g); f !== m;) {
        for (
          var y = c[f], C = 0, h = g - 1;
          (y !== 0 || C < I) && h !== -1;
          h--, C++
        ) {
          y += 256 * u[h] >>> 0, u[h] = y % o >>> 0, y = y / o >>> 0;
        }
        if (y !== 0) throw new Error("Non-zero carry");
        I = C, f++;
      }
      for (var w = g - I; w !== g && u[w] === 0;) w++;
      for (var Q = a.repeat(d); w < g; ++w) Q += e.charAt(u[w]);
      return Q;
    }
    function Ne(c) {
      if (typeof c != "string") throw new TypeError("Expected String");
      if (c.length === 0) return new Uint8Array();
      var d = 0;
      if (c[d] !== " ") {
        for (var I = 0, f = 0; c[d] === a;) I++, d++;
        for (
          var m = (c.length - d) * l + 1 >>> 0, g = new Uint8Array(m); c[d];
        ) {
          var u = t[c.charCodeAt(d)];
          if (u === 255) return;
          for (var y = 0, C = m - 1; (u !== 0 || y < f) && C !== -1; C--, y++) {
            u += o * g[C] >>> 0, g[C] = u % 256 >>> 0, u = u / 256 >>> 0;
          }
          if (u !== 0) throw new Error("Non-zero carry");
          f = y, d++;
        }
        if (c[d] !== " ") {
          for (var h = m - f; h !== m && g[h] === 0;) h++;
          for (var w = new Uint8Array(I + (m - h)), Q = I; h !== m;) {
            w[Q++] = g[h++];
          }
          return w;
        }
      }
    }
    function Vs(c) {
      var d = Ne(c);
      if (d) return d;
      throw new Error("Non-base" + o + " character");
    }
    return { encode: G, decodeUnsafe: Ne, decode: Vs };
  }
  Qe.exports = ir;
});
var X = b((de) => {
  "use strict";
  de.TextEncoder = TextEncoder;
  de.TextDecoder = TextDecoder;
});
var Z = b((b0, $e) => {
  "use strict";
  var { TextEncoder: or, TextDecoder: br } = X(),
    ar = new br(),
    cr = (e) => ar.decode(e),
    xr = new or(),
    lr = (e) => xr.encode(e);
  function dr(e, t) {
    let s = new Uint8Array(t), r = 0;
    for (let n of e) s.set(n, r), r += n.length;
    return s;
  }
  $e.exports = { decodeText: cr, encodeText: lr, concat: dr };
});
var Xe = b((a0, Ke) => {
  "use strict";
  var { encodeText: kr } = Z(),
    He = class {
      constructor(t, s, r, n) {
        this.name = t,
          this.code = s,
          this.codeBuf = kr(this.code),
          this.alphabet = n,
          this.codec = r(n);
      }
      encode(t) {
        return this.codec.encode(t);
      }
      decode(t) {
        for (let s of t) {
          if (this.alphabet && this.alphabet.indexOf(s) < 0) {
            throw new Error(`invalid character '${s}' in '${t}'`);
          }
        }
        return this.codec.decode(t);
      }
    };
  Ke.exports = He;
});
var We = b((c0, Ze) => {
  "use strict";
  var ur = (e, t, s) => {
      let r = {};
      for (let k = 0; k < t.length; ++k) r[t[k]] = k;
      let n = e.length;
      for (; e[n - 1] === "=";) --n;
      let i = new Uint8Array(n * s / 8 | 0), o = 0, a = 0, l = 0;
      for (let k = 0; k < n; ++k) {
        let G = r[e[k]];
        if (G === void 0) throw new SyntaxError("Invalid character " + e[k]);
        a = a << s | G, o += s, o >= 8 && (o -= 8, i[l++] = 255 & a >> o);
      }
      if (o >= s || 255 & a << 8 - o) {
        throw new SyntaxError("Unexpected end of data");
      }
      return i;
    },
    fr = (e, t, s) => {
      let r = t[t.length - 1] === "=", n = (1 << s) - 1, i = "", o = 0, a = 0;
      for (let l = 0; l < e.length; ++l) {
        for (a = a << 8 | e[l], o += 8; o > s;) o -= s, i += t[n & a >> o];
      }
      if (o && (i += t[n & a << s - o]), r) {
        for (; i.length * s & 7;) i += "=";
      }
      return i;
    },
    hr = (e) =>
      (t) => ({
        encode(s) {
          return fr(s, t, e);
        },
        decode(s) {
          return ur(s, t, e);
        },
      });
  Ze.exports = { rfc4648: hr };
});
var tt = b((x0, Ye) => {
  "use strict";
  var M = Je(),
    pr = Xe(),
    { rfc4648: x } = We(),
    { decodeText: mr, encodeText: gr } = Z(),
    yr = () => ({ encode: mr, decode: gr }),
    _e = [
      ["identity", "\0", yr, ""],
      ["base2", "0", x(1), "01"],
      ["base8", "7", x(3), "01234567"],
      ["base10", "9", M, "0123456789"],
      ["base16", "f", x(4), "0123456789abcdef"],
      ["base16upper", "F", x(4), "0123456789ABCDEF"],
      ["base32hex", "v", x(5), "0123456789abcdefghijklmnopqrstuv"],
      ["base32hexupper", "V", x(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV"],
      ["base32hexpad", "t", x(5), "0123456789abcdefghijklmnopqrstuv="],
      ["base32hexpadupper", "T", x(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV="],
      ["base32", "b", x(5), "abcdefghijklmnopqrstuvwxyz234567"],
      ["base32upper", "B", x(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"],
      ["base32pad", "c", x(5), "abcdefghijklmnopqrstuvwxyz234567="],
      ["base32padupper", "C", x(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="],
      ["base32z", "h", x(5), "ybndrfg8ejkmcpqxot1uwisza345h769"],
      ["base36", "k", M, "0123456789abcdefghijklmnopqrstuvwxyz"],
      ["base36upper", "K", M, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
      [
        "base58btc",
        "z",
        M,
        "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
      ],
      [
        "base58flickr",
        "Z",
        M,
        "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
      ],
      [
        "base64",
        "m",
        x(6),
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      ],
      [
        "base64pad",
        "M",
        x(6),
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      ],
      [
        "base64url",
        "u",
        x(6),
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
      ],
      [
        "base64urlpad",
        "U",
        x(6),
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
      ],
    ],
    et = _e.reduce((e, t) => (e[t[0]] = new pr(t[0], t[1], t[2], t[3]), e), {}),
    wr = _e.reduce((e, t) => (e[t[1]] = et[t[0]], e), {});
  Ye.exports = { names: et, codes: wr };
});
var z = b((v, st) => {
  "use strict";
  var S = tt(), { encodeText: vr, decodeText: W, concat: rt } = Z();
  function Cr(e, t) {
    if (!t) throw new Error("requires an encoded Uint8Array");
    let { name: s, codeBuf: r } = A(e);
    return Er(s, t), rt([r, t], r.length + t.length);
  }
  function Ir(e, t) {
    let s = A(e), r = vr(s.encode(t));
    return rt([s.codeBuf, r], s.codeBuf.length + r.length);
  }
  function Ar(e) {
    e instanceof Uint8Array && (e = W(e));
    let t = e[0];
    return ["f", "F", "v", "V", "t", "T", "b", "B", "c", "C", "h", "k", "K"]
      .includes(t) && (e = e.toLowerCase()),
      A(e[0]).decode(e.substring(1));
  }
  function qr(e) {
    if (
      e instanceof Uint8Array && (e = W(e)),
        Object.prototype.toString.call(e) !== "[object String]"
    ) {
      return !1;
    }
    try {
      return A(e[0]).name;
    } catch (t) {
      return !1;
    }
  }
  function Er(e, t) {
    A(e).decode(W(t));
  }
  function A(e) {
    if (Object.prototype.hasOwnProperty.call(S.names, e)) return S.names[e];
    if (Object.prototype.hasOwnProperty.call(S.codes, e)) return S.codes[e];
    throw new Error(`Unsupported encoding: ${e}`);
  }
  function Dr(e) {
    return e instanceof Uint8Array && (e = W(e)), A(e[0]);
  }
  v = st.exports = Cr;
  v.encode = Ir;
  v.decode = Ar;
  v.isEncoded = qr;
  v.encoding = A;
  v.encodingFromData = Dr;
  var Sr = Object.freeze(S.names), Tr = Object.freeze(S.codes);
  v.names = Sr;
  v.codes = Tr;
});
var bt = b((l0, nt) => {
  nt.exports = it;
  var ot = 128, Ur = 127, jr = ~Ur, Nr = Math.pow(2, 31);
  function it(e, t, s) {
    t = t || [], s = s || 0;
    for (var r = s; e >= Nr;) t[s++] = e & 255 | ot, e /= 128;
    for (; e & jr;) t[s++] = e & 255 | ot, e >>>= 7;
    return t[s] = e | 0, it.bytes = s - r + 1, t;
  }
});
var xt = b((d0, at) => {
  at.exports = ke;
  var Br = 128, ct = 127;
  function ke(e, t) {
    var s = 0, t = t || 0, r = 0, n = t, i, o = e.length;
    do {
      if (n >= o) throw ke.bytes = 0, new RangeError("Could not decode varint");
      i = e[n++],
        s += r < 28 ? (i & ct) << r : (i & ct) * Math.pow(2, r),
        r += 7;
    } while (i >= Br);
    return ke.bytes = n - t, s;
  }
});
var dt = b((k0, lt) => {
  var Mr = Math.pow(2, 7),
    zr = Math.pow(2, 14),
    Or = Math.pow(2, 21),
    Fr = Math.pow(2, 28),
    Rr = Math.pow(2, 35),
    Lr = Math.pow(2, 42),
    Vr = Math.pow(2, 49),
    Pr = Math.pow(2, 56),
    Gr = Math.pow(2, 63);
  lt.exports = function (e) {
    return e < Mr
      ? 1
      : e < zr
      ? 2
      : e < Or
      ? 3
      : e < Fr
      ? 4
      : e < Rr
      ? 5
      : e < Lr
      ? 6
      : e < Vr
      ? 7
      : e < Pr
      ? 8
      : e < Gr
      ? 9
      : 10;
  };
});
var Y = b((u0, kt) => {
  kt.exports = { encode: bt(), decode: xt(), encodingLength: dt() };
});
var ft = b((f0, ut) => {
  "use strict";
  var Qr = Object.freeze({
    identity: 0,
    sha1: 17,
    "sha2-256": 18,
    "sha2-512": 19,
    "sha3-512": 20,
    "sha3-384": 21,
    "sha3-256": 22,
    "sha3-224": 23,
    "shake-128": 24,
    "shake-256": 25,
    "keccak-224": 26,
    "keccak-256": 27,
    "keccak-384": 28,
    "keccak-512": 29,
    blake3: 30,
    "murmur3-128": 34,
    "murmur3-32": 35,
    "dbl-sha2-256": 86,
    md4: 212,
    md5: 213,
    bmt: 214,
    "sha2-256-trunc254-padded": 4114,
    "ripemd-128": 4178,
    "ripemd-160": 4179,
    "ripemd-256": 4180,
    "ripemd-320": 4181,
    x11: 4352,
    kangarootwelve: 7425,
    "sm3-256": 21325,
    "blake2b-8": 45569,
    "blake2b-16": 45570,
    "blake2b-24": 45571,
    "blake2b-32": 45572,
    "blake2b-40": 45573,
    "blake2b-48": 45574,
    "blake2b-56": 45575,
    "blake2b-64": 45576,
    "blake2b-72": 45577,
    "blake2b-80": 45578,
    "blake2b-88": 45579,
    "blake2b-96": 45580,
    "blake2b-104": 45581,
    "blake2b-112": 45582,
    "blake2b-120": 45583,
    "blake2b-128": 45584,
    "blake2b-136": 45585,
    "blake2b-144": 45586,
    "blake2b-152": 45587,
    "blake2b-160": 45588,
    "blake2b-168": 45589,
    "blake2b-176": 45590,
    "blake2b-184": 45591,
    "blake2b-192": 45592,
    "blake2b-200": 45593,
    "blake2b-208": 45594,
    "blake2b-216": 45595,
    "blake2b-224": 45596,
    "blake2b-232": 45597,
    "blake2b-240": 45598,
    "blake2b-248": 45599,
    "blake2b-256": 45600,
    "blake2b-264": 45601,
    "blake2b-272": 45602,
    "blake2b-280": 45603,
    "blake2b-288": 45604,
    "blake2b-296": 45605,
    "blake2b-304": 45606,
    "blake2b-312": 45607,
    "blake2b-320": 45608,
    "blake2b-328": 45609,
    "blake2b-336": 45610,
    "blake2b-344": 45611,
    "blake2b-352": 45612,
    "blake2b-360": 45613,
    "blake2b-368": 45614,
    "blake2b-376": 45615,
    "blake2b-384": 45616,
    "blake2b-392": 45617,
    "blake2b-400": 45618,
    "blake2b-408": 45619,
    "blake2b-416": 45620,
    "blake2b-424": 45621,
    "blake2b-432": 45622,
    "blake2b-440": 45623,
    "blake2b-448": 45624,
    "blake2b-456": 45625,
    "blake2b-464": 45626,
    "blake2b-472": 45627,
    "blake2b-480": 45628,
    "blake2b-488": 45629,
    "blake2b-496": 45630,
    "blake2b-504": 45631,
    "blake2b-512": 45632,
    "blake2s-8": 45633,
    "blake2s-16": 45634,
    "blake2s-24": 45635,
    "blake2s-32": 45636,
    "blake2s-40": 45637,
    "blake2s-48": 45638,
    "blake2s-56": 45639,
    "blake2s-64": 45640,
    "blake2s-72": 45641,
    "blake2s-80": 45642,
    "blake2s-88": 45643,
    "blake2s-96": 45644,
    "blake2s-104": 45645,
    "blake2s-112": 45646,
    "blake2s-120": 45647,
    "blake2s-128": 45648,
    "blake2s-136": 45649,
    "blake2s-144": 45650,
    "blake2s-152": 45651,
    "blake2s-160": 45652,
    "blake2s-168": 45653,
    "blake2s-176": 45654,
    "blake2s-184": 45655,
    "blake2s-192": 45656,
    "blake2s-200": 45657,
    "blake2s-208": 45658,
    "blake2s-216": 45659,
    "blake2s-224": 45660,
    "blake2s-232": 45661,
    "blake2s-240": 45662,
    "blake2s-248": 45663,
    "blake2s-256": 45664,
    "skein256-8": 45825,
    "skein256-16": 45826,
    "skein256-24": 45827,
    "skein256-32": 45828,
    "skein256-40": 45829,
    "skein256-48": 45830,
    "skein256-56": 45831,
    "skein256-64": 45832,
    "skein256-72": 45833,
    "skein256-80": 45834,
    "skein256-88": 45835,
    "skein256-96": 45836,
    "skein256-104": 45837,
    "skein256-112": 45838,
    "skein256-120": 45839,
    "skein256-128": 45840,
    "skein256-136": 45841,
    "skein256-144": 45842,
    "skein256-152": 45843,
    "skein256-160": 45844,
    "skein256-168": 45845,
    "skein256-176": 45846,
    "skein256-184": 45847,
    "skein256-192": 45848,
    "skein256-200": 45849,
    "skein256-208": 45850,
    "skein256-216": 45851,
    "skein256-224": 45852,
    "skein256-232": 45853,
    "skein256-240": 45854,
    "skein256-248": 45855,
    "skein256-256": 45856,
    "skein512-8": 45857,
    "skein512-16": 45858,
    "skein512-24": 45859,
    "skein512-32": 45860,
    "skein512-40": 45861,
    "skein512-48": 45862,
    "skein512-56": 45863,
    "skein512-64": 45864,
    "skein512-72": 45865,
    "skein512-80": 45866,
    "skein512-88": 45867,
    "skein512-96": 45868,
    "skein512-104": 45869,
    "skein512-112": 45870,
    "skein512-120": 45871,
    "skein512-128": 45872,
    "skein512-136": 45873,
    "skein512-144": 45874,
    "skein512-152": 45875,
    "skein512-160": 45876,
    "skein512-168": 45877,
    "skein512-176": 45878,
    "skein512-184": 45879,
    "skein512-192": 45880,
    "skein512-200": 45881,
    "skein512-208": 45882,
    "skein512-216": 45883,
    "skein512-224": 45884,
    "skein512-232": 45885,
    "skein512-240": 45886,
    "skein512-248": 45887,
    "skein512-256": 45888,
    "skein512-264": 45889,
    "skein512-272": 45890,
    "skein512-280": 45891,
    "skein512-288": 45892,
    "skein512-296": 45893,
    "skein512-304": 45894,
    "skein512-312": 45895,
    "skein512-320": 45896,
    "skein512-328": 45897,
    "skein512-336": 45898,
    "skein512-344": 45899,
    "skein512-352": 45900,
    "skein512-360": 45901,
    "skein512-368": 45902,
    "skein512-376": 45903,
    "skein512-384": 45904,
    "skein512-392": 45905,
    "skein512-400": 45906,
    "skein512-408": 45907,
    "skein512-416": 45908,
    "skein512-424": 45909,
    "skein512-432": 45910,
    "skein512-440": 45911,
    "skein512-448": 45912,
    "skein512-456": 45913,
    "skein512-464": 45914,
    "skein512-472": 45915,
    "skein512-480": 45916,
    "skein512-488": 45917,
    "skein512-496": 45918,
    "skein512-504": 45919,
    "skein512-512": 45920,
    "skein1024-8": 45921,
    "skein1024-16": 45922,
    "skein1024-24": 45923,
    "skein1024-32": 45924,
    "skein1024-40": 45925,
    "skein1024-48": 45926,
    "skein1024-56": 45927,
    "skein1024-64": 45928,
    "skein1024-72": 45929,
    "skein1024-80": 45930,
    "skein1024-88": 45931,
    "skein1024-96": 45932,
    "skein1024-104": 45933,
    "skein1024-112": 45934,
    "skein1024-120": 45935,
    "skein1024-128": 45936,
    "skein1024-136": 45937,
    "skein1024-144": 45938,
    "skein1024-152": 45939,
    "skein1024-160": 45940,
    "skein1024-168": 45941,
    "skein1024-176": 45942,
    "skein1024-184": 45943,
    "skein1024-192": 45944,
    "skein1024-200": 45945,
    "skein1024-208": 45946,
    "skein1024-216": 45947,
    "skein1024-224": 45948,
    "skein1024-232": 45949,
    "skein1024-240": 45950,
    "skein1024-248": 45951,
    "skein1024-256": 45952,
    "skein1024-264": 45953,
    "skein1024-272": 45954,
    "skein1024-280": 45955,
    "skein1024-288": 45956,
    "skein1024-296": 45957,
    "skein1024-304": 45958,
    "skein1024-312": 45959,
    "skein1024-320": 45960,
    "skein1024-328": 45961,
    "skein1024-336": 45962,
    "skein1024-344": 45963,
    "skein1024-352": 45964,
    "skein1024-360": 45965,
    "skein1024-368": 45966,
    "skein1024-376": 45967,
    "skein1024-384": 45968,
    "skein1024-392": 45969,
    "skein1024-400": 45970,
    "skein1024-408": 45971,
    "skein1024-416": 45972,
    "skein1024-424": 45973,
    "skein1024-432": 45974,
    "skein1024-440": 45975,
    "skein1024-448": 45976,
    "skein1024-456": 45977,
    "skein1024-464": 45978,
    "skein1024-472": 45979,
    "skein1024-480": 45980,
    "skein1024-488": 45981,
    "skein1024-496": 45982,
    "skein1024-504": 45983,
    "skein1024-512": 45984,
    "skein1024-520": 45985,
    "skein1024-528": 45986,
    "skein1024-536": 45987,
    "skein1024-544": 45988,
    "skein1024-552": 45989,
    "skein1024-560": 45990,
    "skein1024-568": 45991,
    "skein1024-576": 45992,
    "skein1024-584": 45993,
    "skein1024-592": 45994,
    "skein1024-600": 45995,
    "skein1024-608": 45996,
    "skein1024-616": 45997,
    "skein1024-624": 45998,
    "skein1024-632": 45999,
    "skein1024-640": 46e3,
    "skein1024-648": 46001,
    "skein1024-656": 46002,
    "skein1024-664": 46003,
    "skein1024-672": 46004,
    "skein1024-680": 46005,
    "skein1024-688": 46006,
    "skein1024-696": 46007,
    "skein1024-704": 46008,
    "skein1024-712": 46009,
    "skein1024-720": 46010,
    "skein1024-728": 46011,
    "skein1024-736": 46012,
    "skein1024-744": 46013,
    "skein1024-752": 46014,
    "skein1024-760": 46015,
    "skein1024-768": 46016,
    "skein1024-776": 46017,
    "skein1024-784": 46018,
    "skein1024-792": 46019,
    "skein1024-800": 46020,
    "skein1024-808": 46021,
    "skein1024-816": 46022,
    "skein1024-824": 46023,
    "skein1024-832": 46024,
    "skein1024-840": 46025,
    "skein1024-848": 46026,
    "skein1024-856": 46027,
    "skein1024-864": 46028,
    "skein1024-872": 46029,
    "skein1024-880": 46030,
    "skein1024-888": 46031,
    "skein1024-896": 46032,
    "skein1024-904": 46033,
    "skein1024-912": 46034,
    "skein1024-920": 46035,
    "skein1024-928": 46036,
    "skein1024-936": 46037,
    "skein1024-944": 46038,
    "skein1024-952": 46039,
    "skein1024-960": 46040,
    "skein1024-968": 46041,
    "skein1024-976": 46042,
    "skein1024-984": 46043,
    "skein1024-992": 46044,
    "skein1024-1000": 46045,
    "skein1024-1008": 46046,
    "skein1024-1016": 46047,
    "skein1024-1024": 46048,
    "poseidon-bls12_381-a2-fc1": 46081,
    "poseidon-bls12_381-a2-fc1-sc": 46082,
  });
  ut.exports = { names: Qr };
});
var O = b((h0, ht) => {
  "use strict";
  var { encoding: Jr } = z(), { TextDecoder: $r } = X(), Kr = new $r("utf8");
  function Hr(e) {
    let t = "";
    for (let s = 0; s < e.length; s++) t += String.fromCharCode(e[s]);
    return t;
  }
  function Xr(e, t = "utf8") {
    return t === "utf8" || t === "utf-8"
      ? Kr.decode(e)
      : t === "ascii"
      ? Hr(e)
      : Jr(t).encode(e);
  }
  ht.exports = Xr;
});
var _ = b((p0, pt) => {
  "use strict";
  var { encoding: Zr } = z(), { TextEncoder: Wr } = X(), Yr = new Wr();
  function _r(e) {
    let t = new Uint8Array(e.length);
    for (let s = 0; s < e.length; s++) t[s] = e.charCodeAt(s);
    return t;
  }
  function en(e, t = "utf8") {
    return t === "utf8" || t === "utf-8"
      ? Yr.encode(e)
      : t === "ascii"
      ? _r(e)
      : Zr(t).decode(e);
  }
  pt.exports = en;
});
var F = b((m0, mt) => {
  "use strict";
  function tn(e, t) {
    t || (t = e.reduce((n, i) => n + i.length, 0));
    let s = new Uint8Array(t), r = 0;
    for (let n of e) s.set(n, r), r += n.length;
    return s;
  }
  mt.exports = tn;
});
var fe = b((g0, gt) => {
  "use strict";
  var yt = z(),
    T = Y(),
    { names: R } = ft(),
    ee = O(),
    sn = _(),
    rn = F(),
    U = {};
  for (let e in R) {
    let t = e;
    U[R[t]] = t;
  }
  Object.freeze(U);
  function nn(e) {
    if (!(e instanceof Uint8Array)) {
      throw new Error("must be passed a Uint8Array");
    }
    return ee(e, "base16");
  }
  function on(e) {
    return sn(e, "base16");
  }
  function bn(e) {
    if (!(e instanceof Uint8Array)) {
      throw new Error("must be passed a Uint8Array");
    }
    return ee(yt.encode("base58btc", e)).slice(1);
  }
  function an(e) {
    let t = e instanceof Uint8Array ? ee(e) : e;
    return yt.decode("z" + t);
  }
  function vt(e) {
    if (!(e instanceof Uint8Array)) {
      throw new Error("multihash must be a Uint8Array");
    }
    if (e.length < 2) {
      throw new Error("multihash too short. must be > 2 bytes.");
    }
    let t = T.decode(e);
    if (!wt(t)) {
      throw new Error(`multihash unknown function code: 0x${t.toString(16)}`);
    }
    e = e.slice(T.decode.bytes);
    let s = T.decode(e);
    if (s < 0) throw new Error(`multihash invalid length: ${s}`);
    if (e = e.slice(T.decode.bytes), e.length !== s) {
      throw new Error(`multihash length inconsistent: 0x${ee(e, "base16")}`);
    }
    return { code: t, name: U[t], length: s, digest: e };
  }
  function cn(e, t, s) {
    if (!e || t === void 0) {
      throw new Error(
        "multihash encode requires at least two args: digest, code",
      );
    }
    let r = Et(t);
    if (!(e instanceof Uint8Array)) {
      throw new Error("digest should be a Uint8Array");
    }
    if (s == null && (s = e.length), s && e.length !== s) {
      throw new Error("digest length should be equal to specified length.");
    }
    let n = T.encode(r), i = T.encode(s);
    return rn([n, i, e], n.length + i.length + e.length);
  }
  function Et(e) {
    let t = e;
    if (typeof e == "string") {
      if (R[e] === void 0) {
        throw new Error(`Unrecognized hash function named: ${e}`);
      }
      t = R[e];
    }
    if (typeof t != "number") {
      throw new Error(`Hash function code should be a number. Got: ${t}`);
    }
    if (U[t] === void 0 && !ue(t)) {
      throw new Error(`Unrecognized function code: ${t}`);
    }
    return t;
  }
  function ue(e) {
    return e > 0 && e < 16;
  }
  function wt(e) {
    return !!(ue(e) || U[e]);
  }
  function Ct(e) {
    vt(e);
  }
  function xn(e) {
    return Ct(e), e.subarray(0, 2);
  }
  gt.exports = {
    names: R,
    codes: U,
    toHexString: nn,
    fromHexString: on,
    toB58String: bn,
    fromB58String: an,
    decode: vt,
    encode: cn,
    coerceCode: Et,
    isAppCode: ue,
    validate: Ct,
    prefix: xn,
    isValidCode: wt,
  };
});
var he = b((y0, It) => {
  "use strict";
  var At = Y(), ln = O(), dn = _();
  It.exports = {
    numberToUint8Array: kn,
    uint8ArrayToNumber: qt,
    varintUint8ArrayEncode: un,
    varintEncode: fn,
  };
  function qt(e) {
    return parseInt(ln(e, "base16"), 16);
  }
  function kn(e) {
    let t = e.toString(16);
    return t.length % 2 == 1 && (t = "0" + t), dn(t, "base16");
  }
  function un(e) {
    return Uint8Array.from(At.encode(qt(e)));
  }
  function fn(e) {
    return Uint8Array.from(At.encode(e));
  }
});
var St = b((w0, Dt) => {
  "use strict";
  var hn = Object.freeze({
    identity: 0,
    cidv1: 1,
    cidv2: 2,
    cidv3: 3,
    ip4: 4,
    tcp: 6,
    sha1: 17,
    "sha2-256": 18,
    "sha2-512": 19,
    "sha3-512": 20,
    "sha3-384": 21,
    "sha3-256": 22,
    "sha3-224": 23,
    "shake-128": 24,
    "shake-256": 25,
    "keccak-224": 26,
    "keccak-256": 27,
    "keccak-384": 28,
    "keccak-512": 29,
    blake3: 30,
    dccp: 33,
    "murmur3-128": 34,
    "murmur3-32": 35,
    ip6: 41,
    ip6zone: 42,
    path: 47,
    multicodec: 48,
    multihash: 49,
    multiaddr: 50,
    multibase: 51,
    dns: 53,
    dns4: 54,
    dns6: 55,
    dnsaddr: 56,
    protobuf: 80,
    cbor: 81,
    raw: 85,
    "dbl-sha2-256": 86,
    rlp: 96,
    bencode: 99,
    "dag-pb": 112,
    "dag-cbor": 113,
    "libp2p-key": 114,
    "git-raw": 120,
    "torrent-info": 123,
    "torrent-file": 124,
    "leofcoin-block": 129,
    "leofcoin-tx": 130,
    "leofcoin-pr": 131,
    sctp: 132,
    "dag-jose": 133,
    "dag-cose": 134,
    "eth-block": 144,
    "eth-block-list": 145,
    "eth-tx-trie": 146,
    "eth-tx": 147,
    "eth-tx-receipt-trie": 148,
    "eth-tx-receipt": 149,
    "eth-state-trie": 150,
    "eth-account-snapshot": 151,
    "eth-storage-trie": 152,
    "bitcoin-block": 176,
    "bitcoin-tx": 177,
    "bitcoin-witness-commitment": 178,
    "zcash-block": 192,
    "zcash-tx": 193,
    docid: 206,
    "stellar-block": 208,
    "stellar-tx": 209,
    md4: 212,
    md5: 213,
    bmt: 214,
    "decred-block": 224,
    "decred-tx": 225,
    "ipld-ns": 226,
    "ipfs-ns": 227,
    "swarm-ns": 228,
    "ipns-ns": 229,
    zeronet: 230,
    "secp256k1-pub": 231,
    "bls12_381-g1-pub": 234,
    "bls12_381-g2-pub": 235,
    "x25519-pub": 236,
    "ed25519-pub": 237,
    "bls12_381-g1g2-pub": 238,
    "dash-block": 240,
    "dash-tx": 241,
    "swarm-manifest": 250,
    "swarm-feed": 251,
    udp: 273,
    "p2p-webrtc-star": 275,
    "p2p-webrtc-direct": 276,
    "p2p-stardust": 277,
    "p2p-circuit": 290,
    "dag-json": 297,
    udt: 301,
    utp: 302,
    unix: 400,
    thread: 406,
    p2p: 421,
    ipfs: 421,
    https: 443,
    onion: 444,
    onion3: 445,
    garlic64: 446,
    garlic32: 447,
    tls: 448,
    quic: 460,
    ws: 477,
    wss: 478,
    "p2p-websocket-star": 479,
    http: 480,
    json: 512,
    messagepack: 513,
    "libp2p-peer-record": 769,
    "sha2-256-trunc254-padded": 4114,
    "ripemd-128": 4178,
    "ripemd-160": 4179,
    "ripemd-256": 4180,
    "ripemd-320": 4181,
    x11: 4352,
    "p256-pub": 4608,
    "p384-pub": 4609,
    "p521-pub": 4610,
    "ed448-pub": 4611,
    "x448-pub": 4612,
    "ed25519-priv": 4864,
    kangarootwelve: 7425,
    "sm3-256": 21325,
    "blake2b-8": 45569,
    "blake2b-16": 45570,
    "blake2b-24": 45571,
    "blake2b-32": 45572,
    "blake2b-40": 45573,
    "blake2b-48": 45574,
    "blake2b-56": 45575,
    "blake2b-64": 45576,
    "blake2b-72": 45577,
    "blake2b-80": 45578,
    "blake2b-88": 45579,
    "blake2b-96": 45580,
    "blake2b-104": 45581,
    "blake2b-112": 45582,
    "blake2b-120": 45583,
    "blake2b-128": 45584,
    "blake2b-136": 45585,
    "blake2b-144": 45586,
    "blake2b-152": 45587,
    "blake2b-160": 45588,
    "blake2b-168": 45589,
    "blake2b-176": 45590,
    "blake2b-184": 45591,
    "blake2b-192": 45592,
    "blake2b-200": 45593,
    "blake2b-208": 45594,
    "blake2b-216": 45595,
    "blake2b-224": 45596,
    "blake2b-232": 45597,
    "blake2b-240": 45598,
    "blake2b-248": 45599,
    "blake2b-256": 45600,
    "blake2b-264": 45601,
    "blake2b-272": 45602,
    "blake2b-280": 45603,
    "blake2b-288": 45604,
    "blake2b-296": 45605,
    "blake2b-304": 45606,
    "blake2b-312": 45607,
    "blake2b-320": 45608,
    "blake2b-328": 45609,
    "blake2b-336": 45610,
    "blake2b-344": 45611,
    "blake2b-352": 45612,
    "blake2b-360": 45613,
    "blake2b-368": 45614,
    "blake2b-376": 45615,
    "blake2b-384": 45616,
    "blake2b-392": 45617,
    "blake2b-400": 45618,
    "blake2b-408": 45619,
    "blake2b-416": 45620,
    "blake2b-424": 45621,
    "blake2b-432": 45622,
    "blake2b-440": 45623,
    "blake2b-448": 45624,
    "blake2b-456": 45625,
    "blake2b-464": 45626,
    "blake2b-472": 45627,
    "blake2b-480": 45628,
    "blake2b-488": 45629,
    "blake2b-496": 45630,
    "blake2b-504": 45631,
    "blake2b-512": 45632,
    "blake2s-8": 45633,
    "blake2s-16": 45634,
    "blake2s-24": 45635,
    "blake2s-32": 45636,
    "blake2s-40": 45637,
    "blake2s-48": 45638,
    "blake2s-56": 45639,
    "blake2s-64": 45640,
    "blake2s-72": 45641,
    "blake2s-80": 45642,
    "blake2s-88": 45643,
    "blake2s-96": 45644,
    "blake2s-104": 45645,
    "blake2s-112": 45646,
    "blake2s-120": 45647,
    "blake2s-128": 45648,
    "blake2s-136": 45649,
    "blake2s-144": 45650,
    "blake2s-152": 45651,
    "blake2s-160": 45652,
    "blake2s-168": 45653,
    "blake2s-176": 45654,
    "blake2s-184": 45655,
    "blake2s-192": 45656,
    "blake2s-200": 45657,
    "blake2s-208": 45658,
    "blake2s-216": 45659,
    "blake2s-224": 45660,
    "blake2s-232": 45661,
    "blake2s-240": 45662,
    "blake2s-248": 45663,
    "blake2s-256": 45664,
    "skein256-8": 45825,
    "skein256-16": 45826,
    "skein256-24": 45827,
    "skein256-32": 45828,
    "skein256-40": 45829,
    "skein256-48": 45830,
    "skein256-56": 45831,
    "skein256-64": 45832,
    "skein256-72": 45833,
    "skein256-80": 45834,
    "skein256-88": 45835,
    "skein256-96": 45836,
    "skein256-104": 45837,
    "skein256-112": 45838,
    "skein256-120": 45839,
    "skein256-128": 45840,
    "skein256-136": 45841,
    "skein256-144": 45842,
    "skein256-152": 45843,
    "skein256-160": 45844,
    "skein256-168": 45845,
    "skein256-176": 45846,
    "skein256-184": 45847,
    "skein256-192": 45848,
    "skein256-200": 45849,
    "skein256-208": 45850,
    "skein256-216": 45851,
    "skein256-224": 45852,
    "skein256-232": 45853,
    "skein256-240": 45854,
    "skein256-248": 45855,
    "skein256-256": 45856,
    "skein512-8": 45857,
    "skein512-16": 45858,
    "skein512-24": 45859,
    "skein512-32": 45860,
    "skein512-40": 45861,
    "skein512-48": 45862,
    "skein512-56": 45863,
    "skein512-64": 45864,
    "skein512-72": 45865,
    "skein512-80": 45866,
    "skein512-88": 45867,
    "skein512-96": 45868,
    "skein512-104": 45869,
    "skein512-112": 45870,
    "skein512-120": 45871,
    "skein512-128": 45872,
    "skein512-136": 45873,
    "skein512-144": 45874,
    "skein512-152": 45875,
    "skein512-160": 45876,
    "skein512-168": 45877,
    "skein512-176": 45878,
    "skein512-184": 45879,
    "skein512-192": 45880,
    "skein512-200": 45881,
    "skein512-208": 45882,
    "skein512-216": 45883,
    "skein512-224": 45884,
    "skein512-232": 45885,
    "skein512-240": 45886,
    "skein512-248": 45887,
    "skein512-256": 45888,
    "skein512-264": 45889,
    "skein512-272": 45890,
    "skein512-280": 45891,
    "skein512-288": 45892,
    "skein512-296": 45893,
    "skein512-304": 45894,
    "skein512-312": 45895,
    "skein512-320": 45896,
    "skein512-328": 45897,
    "skein512-336": 45898,
    "skein512-344": 45899,
    "skein512-352": 45900,
    "skein512-360": 45901,
    "skein512-368": 45902,
    "skein512-376": 45903,
    "skein512-384": 45904,
    "skein512-392": 45905,
    "skein512-400": 45906,
    "skein512-408": 45907,
    "skein512-416": 45908,
    "skein512-424": 45909,
    "skein512-432": 45910,
    "skein512-440": 45911,
    "skein512-448": 45912,
    "skein512-456": 45913,
    "skein512-464": 45914,
    "skein512-472": 45915,
    "skein512-480": 45916,
    "skein512-488": 45917,
    "skein512-496": 45918,
    "skein512-504": 45919,
    "skein512-512": 45920,
    "skein1024-8": 45921,
    "skein1024-16": 45922,
    "skein1024-24": 45923,
    "skein1024-32": 45924,
    "skein1024-40": 45925,
    "skein1024-48": 45926,
    "skein1024-56": 45927,
    "skein1024-64": 45928,
    "skein1024-72": 45929,
    "skein1024-80": 45930,
    "skein1024-88": 45931,
    "skein1024-96": 45932,
    "skein1024-104": 45933,
    "skein1024-112": 45934,
    "skein1024-120": 45935,
    "skein1024-128": 45936,
    "skein1024-136": 45937,
    "skein1024-144": 45938,
    "skein1024-152": 45939,
    "skein1024-160": 45940,
    "skein1024-168": 45941,
    "skein1024-176": 45942,
    "skein1024-184": 45943,
    "skein1024-192": 45944,
    "skein1024-200": 45945,
    "skein1024-208": 45946,
    "skein1024-216": 45947,
    "skein1024-224": 45948,
    "skein1024-232": 45949,
    "skein1024-240": 45950,
    "skein1024-248": 45951,
    "skein1024-256": 45952,
    "skein1024-264": 45953,
    "skein1024-272": 45954,
    "skein1024-280": 45955,
    "skein1024-288": 45956,
    "skein1024-296": 45957,
    "skein1024-304": 45958,
    "skein1024-312": 45959,
    "skein1024-320": 45960,
    "skein1024-328": 45961,
    "skein1024-336": 45962,
    "skein1024-344": 45963,
    "skein1024-352": 45964,
    "skein1024-360": 45965,
    "skein1024-368": 45966,
    "skein1024-376": 45967,
    "skein1024-384": 45968,
    "skein1024-392": 45969,
    "skein1024-400": 45970,
    "skein1024-408": 45971,
    "skein1024-416": 45972,
    "skein1024-424": 45973,
    "skein1024-432": 45974,
    "skein1024-440": 45975,
    "skein1024-448": 45976,
    "skein1024-456": 45977,
    "skein1024-464": 45978,
    "skein1024-472": 45979,
    "skein1024-480": 45980,
    "skein1024-488": 45981,
    "skein1024-496": 45982,
    "skein1024-504": 45983,
    "skein1024-512": 45984,
    "skein1024-520": 45985,
    "skein1024-528": 45986,
    "skein1024-536": 45987,
    "skein1024-544": 45988,
    "skein1024-552": 45989,
    "skein1024-560": 45990,
    "skein1024-568": 45991,
    "skein1024-576": 45992,
    "skein1024-584": 45993,
    "skein1024-592": 45994,
    "skein1024-600": 45995,
    "skein1024-608": 45996,
    "skein1024-616": 45997,
    "skein1024-624": 45998,
    "skein1024-632": 45999,
    "skein1024-640": 46e3,
    "skein1024-648": 46001,
    "skein1024-656": 46002,
    "skein1024-664": 46003,
    "skein1024-672": 46004,
    "skein1024-680": 46005,
    "skein1024-688": 46006,
    "skein1024-696": 46007,
    "skein1024-704": 46008,
    "skein1024-712": 46009,
    "skein1024-720": 46010,
    "skein1024-728": 46011,
    "skein1024-736": 46012,
    "skein1024-744": 46013,
    "skein1024-752": 46014,
    "skein1024-760": 46015,
    "skein1024-768": 46016,
    "skein1024-776": 46017,
    "skein1024-784": 46018,
    "skein1024-792": 46019,
    "skein1024-800": 46020,
    "skein1024-808": 46021,
    "skein1024-816": 46022,
    "skein1024-824": 46023,
    "skein1024-832": 46024,
    "skein1024-840": 46025,
    "skein1024-848": 46026,
    "skein1024-856": 46027,
    "skein1024-864": 46028,
    "skein1024-872": 46029,
    "skein1024-880": 46030,
    "skein1024-888": 46031,
    "skein1024-896": 46032,
    "skein1024-904": 46033,
    "skein1024-912": 46034,
    "skein1024-920": 46035,
    "skein1024-928": 46036,
    "skein1024-936": 46037,
    "skein1024-944": 46038,
    "skein1024-952": 46039,
    "skein1024-960": 46040,
    "skein1024-968": 46041,
    "skein1024-976": 46042,
    "skein1024-984": 46043,
    "skein1024-992": 46044,
    "skein1024-1000": 46045,
    "skein1024-1008": 46046,
    "skein1024-1016": 46047,
    "skein1024-1024": 46048,
    "poseidon-bls12_381-a2-fc1": 46081,
    "poseidon-bls12_381-a2-fc1-sc": 46082,
    "zeroxcert-imprint-256": 52753,
    "fil-commitment-unsealed": 61697,
    "fil-commitment-sealed": 61698,
    "holochain-adr-v0": 8417572,
    "holochain-adr-v1": 8483108,
    "holochain-key-v0": 9728292,
    "holochain-key-v1": 9793828,
    "holochain-sig-v0": 10645796,
    "holochain-sig-v1": 10711332,
    "skynet-ns": 11639056,
  });
  Dt.exports = { baseTable: hn };
});
var Ut = b((v0, Tt) => {
  "use strict";
  var { baseTable: pe } = St(),
    pn = he().varintEncode,
    me = {},
    ge = {},
    te = {};
  for (let e in pe) {
    let t = e, s = pe[t];
    me[t] = pn(s);
    let r = t.toUpperCase().replace(/-/g, "_");
    ge[r] = s, te[s] || (te[s] = t);
  }
  Object.freeze(me);
  Object.freeze(ge);
  Object.freeze(te);
  var mn = Object.freeze(pe);
  Tt.exports = {
    nameToVarint: me,
    constantToCode: ge,
    nameToCode: mn,
    codeToName: te,
  };
});
var Vt = b((E0, jt) => {
  "use strict";
  var se = Y(),
    gn = F(),
    Nt = he(),
    { nameToVarint: re, constantToCode: yn, nameToCode: Bt, codeToName: ye } =
      Ut();
  function wn(e, t) {
    let s;
    if (e instanceof Uint8Array) s = Nt.varintUint8ArrayEncode(e);
    else if (re[e]) s = re[e];
    else throw new Error("multicodec not recognized");
    return gn([s, t], s.length + t.length);
  }
  function vn(e) {
    return se.decode(e), e.slice(se.decode.bytes);
  }
  function Mt(e) {
    let t = se.decode(e), s = ye[t];
    if (s === void 0) throw new Error(`Code "${t}" not found`);
    return s;
  }
  function zt(e) {
    return ye[e];
  }
  function Ot(e) {
    let t = Bt[e];
    if (t === void 0) throw new Error(`Codec "${e}" not found`);
    return t;
  }
  function Ft(e) {
    return se.decode(e);
  }
  function Rt(e) {
    let t = re[e];
    if (t === void 0) throw new Error(`Codec "${e}" not found`);
    return t;
  }
  function Lt(e) {
    return Nt.varintEncode(e);
  }
  function En(e) {
    return Mt(e);
  }
  function Cn(e) {
    return zt(e);
  }
  function In(e) {
    return Ot(e);
  }
  function An(e) {
    return Ft(e);
  }
  function qn(e) {
    return Rt(e);
  }
  function Dn(e) {
    return Array.from(Lt(e));
  }
  jt.exports = {
    addPrefix: wn,
    rmPrefix: vn,
    getNameFromData: Mt,
    getNameFromCode: zt,
    getCodeFromName: Ot,
    getCodeFromData: Ft,
    getVarintFromName: Rt,
    getVarintFromCode: Lt,
    getCodec: En,
    getName: Cn,
    getNumber: In,
    getCode: An,
    getCodeVarint: qn,
    getVarint: Dn,
    ...yn,
    nameToVarint: re,
    nameToCode: Bt,
    codeToName: ye,
  };
});
var Gt = b((C0, Pt) => {
  "use strict";
  var Sn = fe(),
    Tn = {
      checkCIDComponents: function (e) {
        if (e == null) return "null values are not valid CIDs";
        if (
          !(e.version === 0 || e.version === 1)
        ) {
          return "Invalid version, must be a number equal to 1 or 0";
        }
        if (typeof e.codec != "string") return "codec must be string";
        if (e.version === 0) {
          if (e.codec !== "dag-pb") return "codec must be 'dag-pb' for CIDv0";
          if (
            e.multibaseName !== "base58btc"
          ) {
            return "multibaseName must be 'base58btc' for CIDv0";
          }
        }
        if (
          !(e.multihash instanceof Uint8Array)
        ) {
          return "multihash must be a Uint8Array";
        }
        try {
          Sn.validate(e.multihash);
        } catch (t) {
          let s = t.message;
          return s || (s = "Multihash validation failed"), s;
        }
      },
    };
  Pt.exports = Tn;
});
var we = b((I0, Qt) => {
  "use strict";
  function Un(e, t) {
    if (e === t) return !0;
    if (e.byteLength !== t.byteLength) return !1;
    for (let s = 0; s < e.byteLength; s++) if (e[s] !== t[s]) return !1;
    return !0;
  }
  Qt.exports = Un;
});
var oe = b((A0, Jt) => {
  "use strict";
  var ne = fe(),
    ve = z(),
    q = Vt(),
    jn = Gt(),
    $t = F(),
    Nn = O(),
    Bn = we(),
    ie = q.nameToCode,
    Mn = Object.keys(ie).reduce((e, t) => (e[ie[t]] = t, e), {}),
    Kt = Symbol.for("@ipld/js-cid/CID"),
    p = class {
      constructor(t, s, r, n) {
        if (
          this.version,
            this.codec,
            this.multihash,
            Object.defineProperty(this, Kt, { value: !0 }),
            p.isCID(t)
        ) {
          let i = t;
          this.version = i.version,
            this.codec = i.codec,
            this.multihash = i.multihash,
            this.multibaseName = i.multibaseName ||
              (i.version === 0 ? "base58btc" : "base32");
          return;
        }
        if (typeof t == "string") {
          let i = ve.isEncoded(t);
          if (i) {
            let o = ve.decode(t);
            this.version = parseInt(o[0].toString(), 16),
              this.codec = q.getCodec(o.slice(1)),
              this.multihash = q.rmPrefix(o.slice(1)),
              this.multibaseName = i;
          } else {
            this.version = 0,
              this.codec = "dag-pb",
              this.multihash = ne.fromB58String(t),
              this.multibaseName = "base58btc";
          }
          p.validateCID(this),
            Object.defineProperty(this, "string", { value: t });
          return;
        }
        if (t instanceof Uint8Array) {
          let i = parseInt(t[0].toString(), 16);
          if (i === 1) {
            let o = t;
            this.version = i,
              this.codec = q.getCodec(o.slice(1)),
              this.multihash = q.rmPrefix(o.slice(1)),
              this.multibaseName = "base32";
          } else {
            this.version = 0,
              this.codec = "dag-pb",
              this.multihash = t,
              this.multibaseName = "base58btc";
          }
          p.validateCID(this);
          return;
        }
        this.version = t,
          typeof s == "number" && (s = Mn[s]),
          this.codec = s,
          this.multihash = r,
          this.multibaseName = n || (t === 0 ? "base58btc" : "base32"),
          p.validateCID(this);
      }
      get bytes() {
        let t = this._bytes;
        if (!t) {
          if (this.version === 0) t = this.multihash;
          else if (this.version === 1) {
            let s = q.getCodeVarint(this.codec);
            t = $t(
              [[1], s, this.multihash],
              1 + s.byteLength + this.multihash.byteLength,
            );
          } else throw new Error("unsupported version");
          Object.defineProperty(this, "_bytes", { value: t });
        }
        return t;
      }
      get prefix() {
        let t = q.getCodeVarint(this.codec), s = ne.prefix(this.multihash);
        return $t([[this.version], t, s], 1 + t.byteLength + s.byteLength);
      }
      get code() {
        return ie[this.codec];
      }
      toV0() {
        if (this.codec !== "dag-pb") {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        let { name: t, length: s } = ne.decode(this.multihash);
        if (t !== "sha2-256") {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        if (s !== 32) {
          throw new Error("Cannot convert non 32 byte multihash CID to CIDv0");
        }
        return new p(0, this.codec, this.multihash);
      }
      toV1() {
        return new p(1, this.codec, this.multihash);
      }
      toBaseEncodedString(t = this.multibaseName) {
        if (
          this.string && this.string.length !== 0 && t === this.multibaseName
        ) {
          return this.string;
        }
        let s;
        if (this.version === 0) {
          if (t !== "base58btc") {
            throw new Error(
              "not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()",
            );
          }
          s = ne.toB58String(this.multihash);
        } else if (this.version === 1) s = Nn(ve.encode(t, this.bytes));
        else throw new Error("unsupported version");
        return t === this.multibaseName &&
          Object.defineProperty(this, "string", { value: s }),
          s;
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return "CID(" + this.toString() + ")";
      }
      toString(t) {
        return this.toBaseEncodedString(t);
      }
      toJSON() {
        return {
          codec: this.codec,
          version: this.version,
          hash: this.multihash,
        };
      }
      equals(t) {
        return this.codec === t.codec && this.version === t.version &&
          Bn(this.multihash, t.multihash);
      }
      static validateCID(t) {
        let s = jn.checkCIDComponents(t);
        if (s) throw new Error(s);
      }
      static isCID(t) {
        return t instanceof p || Boolean(t && t[Kt]);
      }
    };
  p.codecs = ie;
  Jt.exports = p;
});
var D = b((be) => {
  "use strict";
  var Ht = oe(), zn = (e, t) => (t && t.push(e.multihash.buffer), e);
  be.encodeCID = zn;
  var On = (e) => {
    let t = e;
    return Object.setPrototypeOf(t.multihash, Uint8Array.prototype),
      Object.setPrototypeOf(t, Ht.prototype),
      Object.defineProperty(t, Symbol.for("@ipld/js-cid/CID"), { value: !0 }),
      t;
  };
  be.decodeCID = On;
  be.CID = Ht;
});
var Zt = b((D0, Xt) => {
  Xt.exports = {
    name: "ipld-block",
    version: "0.11.1",
    description: "JavaScript Implementation of IPLD Block",
    leadMaintainer: "Volker Mische <volker.mische@gmail.com>",
    main: "src/index.js",
    types: "dist/src/index.d.ts",
    scripts: {
      lint: "aegir lint",
      check: "tsc --noEmit --noErrorTruncation",
      test: "aegir test",
      "test:node": "aegir test --target node",
      "test:browser": "aegir test --target browser",
      release: "aegir release --docs",
      "release-minor": "aegir release --type minor --docs",
      "release-major": "aegir release --type major --docs",
      coverage: "aegir coverage",
      "coverage-publish": "aegir coverage --provider coveralls",
      docs: "aegir docs",
      prepare: "aegir build --no-bundle",
      prepublishOnly: "aegir build",
    },
    "pre-push": ["lint", "test"],
    repository: {
      type: "git",
      url: "git+https://github.com/ipld/js-ipld-block.git",
    },
    keywords: ["IPLD"],
    license: "MIT",
    bugs: { url: "https://github.com/ipld/js-ipld-block/issues" },
    homepage: "https://github.com/ipld/js-ipld-block#readme",
    devDependencies: { aegir: "^31.0.4", uint8arrays: "^2.1.3" },
    dependencies: { cids: "^1.0.0" },
    engines: { node: ">=6.0.0", npm: ">=3.0.0" },
    contributors: [
      "David Dias <daviddias.p@gmail.com>",
      "Volker Mische <volker.mische@gmail.com>",
      "Friedel Ziegelmayer <dignifiedquire@gmail.com>",
      "Irakli Gozalishvili <contact@gozala.io>",
      "achingbrain <alex@achingbrain.net>",
      "\u1D20\u026A\u1D04\u1D1B\u1D0F\u0280 \u0299\u1D0A\u1D07\u029F\u1D0B\u029C\u1D0F\u029F\u1D0D <victorbjelkholm@gmail.com>",
      "Alan Shaw <alan.shaw@protocol.ai>",
      "Charlie <the_charlie_daly@hotmail.co.uk>",
      "Diogo Silva <fsdiogo@gmail.com>",
      "Hugo Dias <hugomrdias@gmail.com>",
      "Mikeal Rogers <mikeal.rogers@gmail.com>",
      "Richard Littauer <richard.littauer@gmail.com>",
      "Richard Schneider <makaretu@gmail.com>",
      "Xmader <xmader@outlook.com>",
    ],
  };
});
var ss = b((S0, Wt) => {
  "use strict";
  var Fn = oe(),
    { version: Rn } = Zt(),
    Yt = Symbol.for("@ipld/js-ipld-block/block"),
    _t = { writable: !1, configurable: !1, enumerable: !0 },
    es = class {
      constructor(t, s) {
        if (!t || !(t instanceof Uint8Array)) {
          throw new Error("first argument  must be a Uint8Array");
        }
        if (!s || !Fn.isCID(s)) {
          throw new Error("second argument must be a CID");
        }
        this.data = t,
          this.cid = s,
          Object.defineProperties(this, { data: _t, cid: _t });
      }
      get _data() {
        return Vn(), this.data;
      }
      get _cid() {
        return Ln(), this.cid;
      }
      get [Symbol.toStringTag]() {
        return "Block";
      }
      get [Yt]() {
        return !0;
      }
      static isBlock(t) {
        return Boolean(t && t[Yt]);
      }
    },
    ts = (e, t) => {
      let s = !1;
      return () => {
        if (e.test(Rn)) s || (s = !0, console.warn(t));
        else throw new Error(t);
      };
    },
    Ln = ts(
      /^0\.10|^0\.11/,
      "block._cid is deprecated and will be removed in 0.12 release. Please use block.cid instead",
    ),
    Vn = ts(
      /^0\.10|^0.11/,
      "block._data is deprecated and will be removed in 0.12 release. Please use block.data instead",
    );
  Wt.exports = es;
});
var ns = b((ae) => {
  "use strict";
  var { encodeCID: Pn, decodeCID: Gn } = D(),
    rs = ss(),
    Qn = (
      { cid: e, data: t },
      s,
    ) => (s && s.push(t.buffer), { cid: Pn(e, s), data: t });
  ae.encodeBlock = Qn;
  var Jn = ({ cid: e, data: t }) => new rs(t, Gn(e));
  ae.decodeBlock = Jn;
  ae.Block = rs;
});
var cs = b((U0, is) => {
  "use strict";
  var $n = B(),
    { encodeCID: L, decodeCID: os } = D(),
    { decodeError: Kn } = $(),
    { encodeBlock: Hn, decodeBlock: bs } = ns(),
    as = class extends $n {
      constructor(t) {
        super("block", ["put", "get", "rm", "stat"], t);
      }
      async get(t, s = {}) {
        let { transfer: r } = s,
          { block: n } = await this.remote.get({ ...s, cid: L(t, r) });
        return bs(n);
      }
      async put(t, s = {}) {
        let { transfer: r } = s;
        delete s.progress;
        let n = await this.remote.put({
          ...s,
          cid: s.cid == null ? void 0 : L(s.cid, r),
          block: t instanceof Uint8Array ? t : Hn(t, r),
        });
        return bs(n.block);
      }
      async *rm(t, s = {}) {
        let { transfer: r } = s;
        yield* (await this.remote.rm({
          ...s,
          cids: Array.isArray(t) ? t.map((i) => L(i, r)) : [L(t, r)],
        })).map(Xn);
      }
      async stat(t, s = {}) {
        let { transfer: r } = s,
          n = await this.remote.stat({ ...s, cid: L(t, r) });
        return { ...n, cid: os(n.cid) };
      }
    },
    Xn = (e) => {
      let t = os(e.cid);
      return e.error ? { cid: t, error: Kn(e.error) } : { cid: t };
    };
  is.exports = as;
});
var xs = b((Ee) => {
  "use strict";
  var { encodeCID: Zn, decodeCID: Wn, CID: Yn } = D(),
    _n = ({ dagNode: e, cids: t }) => {
      for (let s of t) Wn(s);
      return e;
    };
  Ee.decodeNode = _n;
  var ei = (e, t) => {
    let s = [];
    return Ce(e, s, t), { dagNode: e, cids: s };
  };
  Ee.encodeNode = ei;
  var Ce = (e, t, s) => {
    if (e != null && typeof e == "object") {
      if (Yn.isCID(e)) t.push(e), Zn(e, s);
      else if (e instanceof ArrayBuffer) s && s.push(e);
      else if (ArrayBuffer.isView(e)) s && s.push(e.buffer);
      else if (Array.isArray(e)) for (let r of e) Ce(r, t, s);
      else for (let r of Object.values(e)) Ce(r, t, s);
    }
  };
});
var us = b((N0, ls) => {
  "use strict";
  var ti = B(),
    { encodeCID: ce, decodeCID: ds } = D(),
    { encodeNode: si, decodeNode: ri } = xs(),
    ks = class extends ti {
      constructor(t) {
        super("dag", ["put", "get", "resolve", "tree"], t);
      }
      async put(t, s = {}) {
        let { cid: r } = s,
          n = await this.remote.put({
            ...s,
            cid: r != null ? ce(r) : void 0,
            dagNode: si(t, s.transfer),
          });
        return ds(n);
      }
      async get(t, s = {}) {
        let { value: r, remainderPath: n } = await this.remote.get({
          ...s,
          cid: ce(t, s.transfer),
        });
        return { value: ri(r), remainderPath: n };
      }
      async resolve(t, s = {}) {
        let { cid: r, remainderPath: n } = await this.remote.resolve({
          ...s,
          cid: ni(t, s.transfer),
        });
        return { cid: ds(r), remainderPath: n };
      }
      async *tree(t, s = {}) {
        yield* await this.remote.tree({ ...s, cid: ce(t, s.transfer) });
      }
    },
    ni = (e, t) => typeof e == "string" ? e : ce(e, t);
  ls.exports = ks;
});
var fs = b((V) => {
  "use strict";
  var { encodeError: ii, decodeError: oi } = $(),
    bi = async function* ({ port: e }, t) {
      let s = (o) => {},
        r = () => new Promise((o) => s = o),
        n = () => (e.postMessage({ method: "next" }), r());
      e.onmessage = (o) => s(o.data);
      let i = !1;
      try {
        for (; !i;) {
          let { done: o, value: a, error: l } = await n();
          if (i = o, l != null) throw oi(l);
          a != null && (yield t(a));
        }
      } finally {
        i || e.postMessage({ method: "return" }), e.close();
      }
    };
  V.decodeIterable = bi;
  var ci = (e, t, s) => {
    let { port1: r, port2: n } = new MessageChannel(), i = [], o = ai(e);
    return r.onmessage = async ({ data: { method: a } }) => {
      switch (a) {
        case "next": {
          try {
            let { done: l, value: k } = await o.next();
            l
              ? (r.postMessage({ type: "next", done: !0 }), r.close())
              : (i.length = 0,
                r.postMessage({ type: "next", done: !1, value: t(k, i) }, i));
          } catch (l) {
            r.postMessage({ type: "throw", error: ii(l) }), r.close();
          }
          break;
        }
        case "return": {
          r.close(), o.return && o.return();
          break;
        }
        default:
          break;
      }
    },
      r.start(),
      s.push(n),
      { type: "RemoteIterable", port: n };
  };
  V.encodeIterable = ci;
  var ai = (e) => {
      if (e != null) {
        if (typeof e[Symbol.asyncIterator] == "function") {
          return e[Symbol.asyncIterator]();
        }
        if (typeof e[Symbol.iterator] == "function") {
          return e[Symbol.iterator]();
        }
      }
      throw TypeError("Value must be async or sync iterable");
    },
    xi = (e, t) => {
      let { port1: s, port2: r } = new MessageChannel();
      return s.onmessage = ({ data: n }) => e.apply(null, n),
        t.push(r),
        { type: "RemoteCallback", port: r };
    };
  V.encodeCallback = xi;
  var li = ({ port: e }) =>
    (s, r = []) => {
      e.postMessage(s, [...new Set(r)]);
    };
  V.decodeCallback = li;
});
var ps = b((M0, hs) => {
  "use strict";
  async function* di(e, t = {}) {
    let s = e.getReader();
    try {
      for (;;) {
        let r = await s.read();
        if (r.done) return;
        yield r.value;
      }
    } finally {
      t.preventCancel !== !0 && s.cancel(), s.releaseLock();
    }
  }
  hs.exports = di;
});
var Is = b((z0, ms) => {
  "use strict";
  var ki = B(),
    { encodeCID: gs, decodeCID: ys, CID: ws } = D(),
    { decodeIterable: Ie, encodeIterable: E, encodeCallback: vs } = fs(),
    Ae = ps(),
    Es = class extends ki {
      constructor(t) {
        super("core", ["add", "addAll", "cat", "ls"], t);
      }
      async *addAll(t, s = {}) {
        let { timeout: r, signal: n } = s,
          i = [...s.transfer || []],
          o = s.progress ? vs(s.progress, i) : void 0,
          a = await this.remote.addAll({
            ...s,
            input: pi(t, i),
            progress: o,
            transfer: i,
            timeout: r,
            signal: n,
          });
        yield* Ie(a.data, Cs);
      }
      async add(t, s = {}) {
        let { timeout: r, signal: n } = s,
          i = [...s.transfer || []],
          o = s.progress ? vs(s.progress, i) : void 0,
          a = await this.remote.add({
            ...s,
            input: hi(t, i),
            progress: o,
            transfer: i,
            timeout: r,
            signal: n,
          });
        return Cs(a.data);
      }
      async *cat(t, s = {}) {
        let r = ws.isCID(t) ? gs(t) : t,
          n = await this.remote.cat({ ...s, path: r });
        yield* Ie(n.data, fi);
      }
      async *ls(t, s = {}) {
        let r = ws.isCID(t) ? gs(t) : t,
          n = await this.remote.ls({ ...s, path: r });
        yield* Ie(n.data, ui);
      }
    },
    Cs = ({ path: e, cid: t, mode: s, mtime: r, size: n }) => ({
      path: e,
      cid: ys(t),
      mode: s,
      mtime: r,
      size: n,
    }),
    ui = (
      {
        depth: e,
        name: t,
        path: s,
        size: r,
        cid: n,
        type: i,
        mode: o,
        mtime: a,
      },
    ) => ({
      cid: ys(n),
      type: i,
      name: t,
      path: s,
      mode: o,
      mtime: a,
      size: r,
      depth: e,
    }),
    fi = (e) => e,
    hi = (e, t) => {
      if (e instanceof Blob) return e;
      if (typeof e == "string") return e;
      if (e instanceof ArrayBuffer) return e;
      if (ArrayBuffer.isView(e)) return e;
      {
        let s = Se(e);
        if (s) return E(s, qe, t);
        let r = Te(e);
        if (r) return E(r, j, t);
        let n = Ue(e);
        if (n) return E(Ae(n), j, t);
        let i = je(e);
        if (i) return De(i, t);
        throw TypeError("Unexpected input: " + typeof e);
      }
    },
    pi = (e, t) => {
      let s = Se(e);
      if (s) return E(s, qe, t);
      let r = Te(e);
      if (r) return E(r, j, t);
      let n = Ue(e);
      if (n) return E(Ae(n), j, t);
      throw TypeError("Unexpected input: " + typeof e);
    },
    j = (e, t) => {
      if (e instanceof ArrayBuffer) return e;
      if (ArrayBuffer.isView(e)) return e;
      if (e instanceof Blob) return { path: "", content: e };
      if (typeof e == "string") return { path: "", content: e };
      {
        let s = je(e);
        if (s) return De(s, t);
        throw TypeError("Unexpected input: " + typeof e);
      }
    },
    qe = (e, t) => {
      if (typeof e == "number") {
        throw TypeError("Iterable of numbers is not supported");
      }
      if (e instanceof ArrayBuffer) return e;
      if (ArrayBuffer.isView(e)) return e;
      if (e instanceof Blob) return { path: "", content: e };
      if (typeof e == "string") return { path: "", content: e };
      {
        let s = je(e);
        if (s) return De(s, t);
        throw TypeError("Unexpected input: " + typeof e);
      }
    },
    De = ({ path: e, mode: t, mtime: s, content: r }, n) => ({
      path: e,
      mode: t,
      mtime: s,
      content: r ? mi(r, n) : void 0,
    }),
    mi = (e, t) => {
      if (e == null) return "";
      if (e instanceof ArrayBuffer || ArrayBuffer.isView(e)) return e;
      if (e instanceof Blob) return e;
      if (typeof e == "string") return e;
      {
        let s = Se(e);
        if (s) return E(s, qe, t);
        let r = Te(e);
        if (r) return E(r, j, t);
        let n = Ue(e);
        if (n) return E(Ae(n), j, t);
        throw TypeError("Unexpected input: " + typeof e);
      }
    },
    Se = (e) => {
      let t = e;
      return t && typeof t[Symbol.iterator] == "function" ? t : null;
    },
    Te = (e) => {
      let t = e;
      return t && typeof t[Symbol.asyncIterator] == "function" ? t : null;
    },
    Ue = (e) => e && typeof e.getReader == "function" ? e : null,
    je = (e) => typeof e == "object" && (e.path || e.content) ? e : null;
  ms.exports = Es;
});
var Ds = b((O0, As) => {
  "use strict";
  var gi = B(),
    { decodeCID: yi, CID: wi } = D(),
    qs = class extends gi {
      constructor(t) {
        super("files", ["stat"], t);
      }
      async stat(t, s = {}) {
        let { size: r, hash: n, withLocal: i, timeout: o, signal: a } = s,
          { stat: l } = await this.remote.stat({
            path: vi(t),
            size: r,
            hash: n,
            withLocal: i,
            timeout: o,
            signal: a,
          });
        return Ei(l);
      }
    };
  As.exports = qs;
  var vi = (e) => wi.isCID(e) ? `/ipfs/${e.toString()}` : e,
    Ei = (e) => ({ ...e, cid: yi(e.cid) });
});
var Us = b((F0, Ss) => {
  "use strict";
  var Ts = Fe(),
    Ci = cs(),
    Ii = us(),
    Ai = Is(),
    qi = Ds(),
    P = class extends Ai {
      constructor(t) {
        super(t);
        this.transport = t,
          this.dag = new Ii(this.transport),
          this.files = new qi(this.transport),
          this.block = new Ci(this.transport);
      }
      static attach(t, s) {
        t.transport.connect(s);
      }
      static detached() {
        return new P(new Ts(void 0));
      }
      static from(t) {
        return new P(new Ts(t));
      }
    };
  Ss.exports = P;
});
var Ns = b((L0, js) => {
  "use strict";
  function Ti(e, t) {
    for (let s = 0; s < e.byteLength; s++) {
      if (e[s] < t[s]) return -1;
      if (e[s] > t[s]) return 1;
    }
    return e.byteLength > t.byteLength
      ? 1
      : e.byteLength < t.byteLength
      ? -1
      : 0;
  }
  js.exports = Ti;
});
var Ms = b((V0, Bs) => {
  "use strict";
  function Ui(e, t) {
    if (e.length !== t.length) {
      throw new Error("Inputs should have the same length");
    }
    let s = new Uint8Array(e.length);
    for (let r = 0; r < e.length; r++) s[r] = e[r] ^ t[r];
    return s;
  }
  Bs.exports = Ui;
});
var Os = b((P0, zs) => {
  "use strict";
  var ji = Ns(), Ni = F(), Bi = we(), Mi = _(), zi = O(), Oi = Ms();
  zs.exports = {
    compare: ji,
    concat: Ni,
    equals: Bi,
    fromString: Mi,
    toString: zi,
    xor: Oi,
  };
});
var Fs = J(Me()), Rs = J(Us()), Ls = J(oe());
var Di = [
  "https://ipfs.io/ipfs/:hash",
  "https://dweb.link/ipfs/:hash",
  "https://gateway.ipfs.io/ipfs/:hash",
  "https://ipfs.infura.io/ipfs/:hash",
  "https://ninetailed.ninja/ipfs/:hash",
  "https://10.via0.com/ipfs/:hash",
  "https://ipfs.eternum.io/ipfs/:hash",
  "https://hardbin.com/ipfs/:hash",
  "https://cloudflare-ipfs.com/ipfs/:hash",
  "https://cf-ipfs.com/ipfs/:hash",
  "https://gateway.pinata.cloud/ipfs/:hash",
  "https://ipfs.sloppyta.co/ipfs/:hash",
  "https://ipfs.greyh.at/ipfs/:hash",
  "https://jorropo.ovh/ipfs/:hash",
  "https://jorropo.net/ipfs/:hash",
  "https://gateway.temporal.cloud/ipfs/:hash",
  "https://ipfs.runfission.com/ipfs/:hash",
  "https://trusti.id/ipfs/:hash",
  "https://ipfs.overpi.com/ipfs/:hash",
  "https://ipfs.ink/ipfs/:hash",
  "https://gateway.ravenland.org/ipfs/:hash",
  "https://ipfs.smartsignature.io/ipfs/:hash",
  "https://ipfs.telos.miami/ipfs/:hash",
  "https://robotizing.net/ipfs/:hash",
  "https://ipfs.mttk.net/ipfs/:hash",
  "https://ipfs.fleek.co/ipfs/:hash",
  "https://ipfs.jbb.one/ipfs/:hash",
  "https://ipfs.k1ic.com/ipfs/:hash",
  "https://ipfs.drink.cafe/ipfs/:hash",
  "https://ipfs.azurewebsites.net/ipfs/:hash",
  "https://gw.ipfspin.com/ipfs/:hash",
  "https://ipfs.denarius.io/ipfs/:hash",
];
function Si(e) {
  let t = 0;
  return new Promise((s, r) =>
    e.forEach((n) =>
      n.then(s).catch(() => {
        ++t === e.length && r();
      })
    )
  );
}
var N = J(Os());
var Fi = (e) =>
  new Uint8Array((e.match(/.{1,2}/g) || []).map((t) => parseInt(t, 16)));
var Ri = Ls.default;
var Li = Rs.default;
var Vi = Fs.default;
var Pi = N.concat;
var Gi = N.fromString;
var Qi = N.toString;
export {
  Di as publicIpfsGateways,
  Fi as fromHexString,
  Gi as fromString,
  Li as IpfsClient,
  Pi as concat,
  Qi as toString,
  Ri as CID,
  Si as raceToSuccess,
  Vi as all,
};
