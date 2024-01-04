var zE = Object.create;
var Zl = Object.defineProperty,
  WE = Object.defineProperties,
  GE = Object.getOwnPropertyDescriptor,
  qE = Object.getOwnPropertyDescriptors,
  QE = Object.getOwnPropertyNames,
  Rs = Object.getOwnPropertySymbols,
  ZE = Object.getPrototypeOf,
  Yl = Object.prototype.hasOwnProperty,
  up = Object.prototype.propertyIsEnumerable;
var dp = (t, e, i) =>
    e in t
      ? Zl(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i })
      : (t[e] = i),
  x = (t, e) => {
    for (var i in (e ||= {})) Yl.call(e, i) && dp(t, i, e[i]);
    if (Rs) for (var i of Rs(e)) up.call(e, i) && dp(t, i, e[i]);
    return t;
  },
  he = (t, e) => WE(t, qE(e));
var fp = (t, e) => {
  var i = {};
  for (var n in t) Yl.call(t, n) && e.indexOf(n) < 0 && (i[n] = t[n]);
  if (t != null && Rs)
    for (var n of Rs(t)) e.indexOf(n) < 0 && up.call(t, n) && (i[n] = t[n]);
  return i;
};
var le = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var YE = (t, e, i, n) => {
  if ((e && typeof e == 'object') || typeof e == 'function')
    for (let r of QE(e))
      !Yl.call(t, r) &&
        r !== i &&
        Zl(t, r, {
          get: () => e[r],
          enumerable: !(n = GE(e, r)) || n.enumerable,
        });
  return t;
};
var XE = (t, e, i) => (
  (i = t != null ? zE(ZE(t)) : {}),
  YE(
    e || !t || !t.__esModule
      ? Zl(i, 'default', { value: t, enumerable: !0 })
      : i,
    t
  )
);
var Fs = (t, e, i) =>
  new Promise((n, r) => {
    var o = (c) => {
        try {
          a(i.next(c));
        } catch (l) {
          r(l);
        }
      },
      s = (c) => {
        try {
          a(i.throw(c));
        } catch (l) {
          r(l);
        }
      },
      a = (c) => (c.done ? n(c.value) : Promise.resolve(c.value).then(o, s));
    a((i = i.apply(t, e)).next());
  });
var Fw = le((k8, Rw) => {
  'use strict';
  Rw.exports = function () {
    return (
      typeof Promise == 'function' &&
      Promise.prototype &&
      Promise.prototype.then
    );
  };
});
var ri = le((zi) => {
  'use strict';
  var Lm,
    dP = [
      0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655,
      733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921,
      2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706,
    ];
  zi.getSymbolSize = function (e) {
    if (!e) throw new Error('"version" cannot be null or undefined');
    if (e < 1 || e > 40)
      throw new Error('"version" should be in range from 1 to 40');
    return e * 4 + 17;
  };
  zi.getSymbolTotalCodewords = function (e) {
    return dP[e];
  };
  zi.getBCHDigit = function (t) {
    let e = 0;
    for (; t !== 0; ) e++, (t >>>= 1);
    return e;
  };
  zi.setToSJISFunction = function (e) {
    if (typeof e != 'function')
      throw new Error('"toSJISFunc" is not a valid function.');
    Lm = e;
  };
  zi.isKanjiModeEnabled = function () {
    return typeof Lm < 'u';
  };
  zi.toSJIS = function (e) {
    return Lm(e);
  };
});
var Ll = le((At) => {
  'use strict';
  At.L = { bit: 1 };
  At.M = { bit: 0 };
  At.Q = { bit: 3 };
  At.H = { bit: 2 };
  function uP(t) {
    if (typeof t != 'string') throw new Error('Param is not a string');
    switch (t.toLowerCase()) {
      case 'l':
      case 'low':
        return At.L;
      case 'm':
      case 'medium':
        return At.M;
      case 'q':
      case 'quartile':
        return At.Q;
      case 'h':
      case 'high':
        return At.H;
      default:
        throw new Error('Unknown EC Level: ' + t);
    }
  }
  At.isValid = function (e) {
    return e && typeof e.bit < 'u' && e.bit >= 0 && e.bit < 4;
  };
  At.from = function (e, i) {
    if (At.isValid(e)) return e;
    try {
      return uP(e);
    } catch {
      return i;
    }
  };
});
var Pw = le((F8, Ow) => {
  'use strict';
  function Nw() {
    (this.buffer = []), (this.length = 0);
  }
  Nw.prototype = {
    get: function (t) {
      let e = Math.floor(t / 8);
      return ((this.buffer[e] >>> (7 - (t % 8))) & 1) === 1;
    },
    put: function (t, e) {
      for (let i = 0; i < e; i++) this.putBit(((t >>> (e - i - 1)) & 1) === 1);
    },
    getLengthInBits: function () {
      return this.length;
    },
    putBit: function (t) {
      let e = Math.floor(this.length / 8);
      this.buffer.length <= e && this.buffer.push(0),
        t && (this.buffer[e] |= 128 >>> this.length % 8),
        this.length++;
    },
  };
  Ow.exports = Nw;
});
var Vw = le((N8, Lw) => {
  'use strict';
  function Es(t) {
    if (!t || t < 1)
      throw new Error('BitMatrix size must be defined and greater than 0');
    (this.size = t),
      (this.data = new Uint8Array(t * t)),
      (this.reservedBit = new Uint8Array(t * t));
  }
  Es.prototype.set = function (t, e, i, n) {
    let r = t * this.size + e;
    (this.data[r] = i), n && (this.reservedBit[r] = !0);
  };
  Es.prototype.get = function (t, e) {
    return this.data[t * this.size + e];
  };
  Es.prototype.xor = function (t, e, i) {
    this.data[t * this.size + e] ^= i;
  };
  Es.prototype.isReserved = function (t, e) {
    return this.reservedBit[t * this.size + e];
  };
  Lw.exports = Es;
});
var jw = le((Vl) => {
  'use strict';
  var fP = ri().getSymbolSize;
  Vl.getRowColCoords = function (e) {
    if (e === 1) return [];
    let i = Math.floor(e / 7) + 2,
      n = fP(e),
      r = n === 145 ? 26 : Math.ceil((n - 13) / (2 * i - 2)) * 2,
      o = [n - 7];
    for (let s = 1; s < i - 1; s++) o[s] = o[s - 1] - r;
    return o.push(6), o.reverse();
  };
  Vl.getPositions = function (e) {
    let i = [],
      n = Vl.getRowColCoords(e),
      r = n.length;
    for (let o = 0; o < r; o++)
      for (let s = 0; s < r; s++)
        (o === 0 && s === 0) ||
          (o === 0 && s === r - 1) ||
          (o === r - 1 && s === 0) ||
          i.push([n[o], n[s]]);
    return i;
  };
});
var Hw = le((Uw) => {
  'use strict';
  var hP = ri().getSymbolSize,
    Bw = 7;
  Uw.getPositions = function (e) {
    let i = hP(e);
    return [
      [0, 0],
      [i - Bw, 0],
      [0, i - Bw],
    ];
  };
});
var $w = le((xe) => {
  'use strict';
  xe.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7,
  };
  var Wi = { N1: 3, N2: 3, N3: 40, N4: 10 };
  xe.isValid = function (e) {
    return e != null && e !== '' && !isNaN(e) && e >= 0 && e <= 7;
  };
  xe.from = function (e) {
    return xe.isValid(e) ? parseInt(e, 10) : void 0;
  };
  xe.getPenaltyN1 = function (e) {
    let i = e.size,
      n = 0,
      r = 0,
      o = 0,
      s = null,
      a = null;
    for (let c = 0; c < i; c++) {
      (r = o = 0), (s = a = null);
      for (let l = 0; l < i; l++) {
        let d = e.get(c, l);
        d === s ? r++ : (r >= 5 && (n += Wi.N1 + (r - 5)), (s = d), (r = 1)),
          (d = e.get(l, c)),
          d === a ? o++ : (o >= 5 && (n += Wi.N1 + (o - 5)), (a = d), (o = 1));
      }
      r >= 5 && (n += Wi.N1 + (r - 5)), o >= 5 && (n += Wi.N1 + (o - 5));
    }
    return n;
  };
  xe.getPenaltyN2 = function (e) {
    let i = e.size,
      n = 0;
    for (let r = 0; r < i - 1; r++)
      for (let o = 0; o < i - 1; o++) {
        let s =
          e.get(r, o) + e.get(r, o + 1) + e.get(r + 1, o) + e.get(r + 1, o + 1);
        (s === 4 || s === 0) && n++;
      }
    return n * Wi.N2;
  };
  xe.getPenaltyN3 = function (e) {
    let i = e.size,
      n = 0,
      r = 0,
      o = 0;
    for (let s = 0; s < i; s++) {
      r = o = 0;
      for (let a = 0; a < i; a++)
        (r = ((r << 1) & 2047) | e.get(s, a)),
          a >= 10 && (r === 1488 || r === 93) && n++,
          (o = ((o << 1) & 2047) | e.get(a, s)),
          a >= 10 && (o === 1488 || o === 93) && n++;
    }
    return n * Wi.N3;
  };
  xe.getPenaltyN4 = function (e) {
    let i = 0,
      n = e.data.length;
    for (let o = 0; o < n; o++) i += e.data[o];
    return Math.abs(Math.ceil((i * 100) / n / 5) - 10) * Wi.N4;
  };
  function mP(t, e, i) {
    switch (t) {
      case xe.Patterns.PATTERN000:
        return (e + i) % 2 === 0;
      case xe.Patterns.PATTERN001:
        return e % 2 === 0;
      case xe.Patterns.PATTERN010:
        return i % 3 === 0;
      case xe.Patterns.PATTERN011:
        return (e + i) % 3 === 0;
      case xe.Patterns.PATTERN100:
        return (Math.floor(e / 2) + Math.floor(i / 3)) % 2 === 0;
      case xe.Patterns.PATTERN101:
        return ((e * i) % 2) + ((e * i) % 3) === 0;
      case xe.Patterns.PATTERN110:
        return (((e * i) % 2) + ((e * i) % 3)) % 2 === 0;
      case xe.Patterns.PATTERN111:
        return (((e * i) % 3) + ((e + i) % 2)) % 2 === 0;
      default:
        throw new Error('bad maskPattern:' + t);
    }
  }
  xe.applyMask = function (e, i) {
    let n = i.size;
    for (let r = 0; r < n; r++)
      for (let o = 0; o < n; o++)
        i.isReserved(o, r) || i.xor(o, r, mP(e, o, r));
  };
  xe.getBestMask = function (e, i) {
    let n = Object.keys(xe.Patterns).length,
      r = 0,
      o = 1 / 0;
    for (let s = 0; s < n; s++) {
      i(s), xe.applyMask(s, e);
      let a =
        xe.getPenaltyN1(e) +
        xe.getPenaltyN2(e) +
        xe.getPenaltyN3(e) +
        xe.getPenaltyN4(e);
      xe.applyMask(s, e), a < o && ((o = a), (r = s));
    }
    return r;
  };
});
var jm = le((Vm) => {
  'use strict';
  var oi = Ll(),
    jl = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2,
      4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4,
      9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6,
      13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9,
      18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34,
      40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17,
      33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56,
      66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81,
    ],
    Bl = [
      7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72,
      88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160,
      192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198,
      288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168,
      308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700,
      224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810,
      960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390,
      728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868,
      1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530,
      1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100,
      660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430,
    ];
  Vm.getBlocksCount = function (e, i) {
    switch (i) {
      case oi.L:
        return jl[(e - 1) * 4 + 0];
      case oi.M:
        return jl[(e - 1) * 4 + 1];
      case oi.Q:
        return jl[(e - 1) * 4 + 2];
      case oi.H:
        return jl[(e - 1) * 4 + 3];
      default:
        return;
    }
  };
  Vm.getTotalCodewordsCount = function (e, i) {
    switch (i) {
      case oi.L:
        return Bl[(e - 1) * 4 + 0];
      case oi.M:
        return Bl[(e - 1) * 4 + 1];
      case oi.Q:
        return Bl[(e - 1) * 4 + 2];
      case oi.H:
        return Bl[(e - 1) * 4 + 3];
      default:
        return;
    }
  };
});
var zw = le((Hl) => {
  'use strict';
  var Cs = new Uint8Array(512),
    Ul = new Uint8Array(256);
  (function () {
    let e = 1;
    for (let i = 0; i < 255; i++)
      (Cs[i] = e), (Ul[e] = i), (e <<= 1), e & 256 && (e ^= 285);
    for (let i = 255; i < 512; i++) Cs[i] = Cs[i - 255];
  })();
  Hl.log = function (e) {
    if (e < 1) throw new Error('log(' + e + ')');
    return Ul[e];
  };
  Hl.exp = function (e) {
    return Cs[e];
  };
  Hl.mul = function (e, i) {
    return e === 0 || i === 0 ? 0 : Cs[Ul[e] + Ul[i]];
  };
});
var Ww = le((Ds) => {
  'use strict';
  var Bm = zw();
  Ds.mul = function (e, i) {
    let n = new Uint8Array(e.length + i.length - 1);
    for (let r = 0; r < e.length; r++)
      for (let o = 0; o < i.length; o++) n[r + o] ^= Bm.mul(e[r], i[o]);
    return n;
  };
  Ds.mod = function (e, i) {
    let n = new Uint8Array(e);
    for (; n.length - i.length >= 0; ) {
      let r = n[0];
      for (let s = 0; s < i.length; s++) n[s] ^= Bm.mul(i[s], r);
      let o = 0;
      for (; o < n.length && n[o] === 0; ) o++;
      n = n.slice(o);
    }
    return n;
  };
  Ds.generateECPolynomial = function (e) {
    let i = new Uint8Array([1]);
    for (let n = 0; n < e; n++) i = Ds.mul(i, new Uint8Array([1, Bm.exp(n)]));
    return i;
  };
});
var Qw = le((U8, qw) => {
  'use strict';
  var Gw = Ww();
  function Um(t) {
    (this.genPoly = void 0),
      (this.degree = t),
      this.degree && this.initialize(this.degree);
  }
  Um.prototype.initialize = function (e) {
    (this.degree = e), (this.genPoly = Gw.generateECPolynomial(this.degree));
  };
  Um.prototype.encode = function (e) {
    if (!this.genPoly) throw new Error('Encoder not initialized');
    let i = new Uint8Array(e.length + this.degree);
    i.set(e);
    let n = Gw.mod(i, this.genPoly),
      r = this.degree - n.length;
    if (r > 0) {
      let o = new Uint8Array(this.degree);
      return o.set(n, r), o;
    }
    return n;
  };
  qw.exports = Um;
});
var Hm = le((Zw) => {
  'use strict';
  Zw.isValid = function (e) {
    return !isNaN(e) && e >= 1 && e <= 40;
  };
});
var $m = le((Dn) => {
  'use strict';
  var Yw = '[0-9]+',
    pP = '[A-Z $%*+\\-./:]+',
    Is =
      '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
  Is = Is.replace(/u/g, '\\u');
  var gP =
    '(?:(?![A-Z0-9 $%*+\\-./:]|' +
    Is +
    `)(?:.|[\r
]))+`;
  Dn.KANJI = new RegExp(Is, 'g');
  Dn.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
  Dn.BYTE = new RegExp(gP, 'g');
  Dn.NUMERIC = new RegExp(Yw, 'g');
  Dn.ALPHANUMERIC = new RegExp(pP, 'g');
  var bP = new RegExp('^' + Is + '$'),
    vP = new RegExp('^' + Yw + '$'),
    _P = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');
  Dn.testKanji = function (e) {
    return bP.test(e);
  };
  Dn.testNumeric = function (e) {
    return vP.test(e);
  };
  Dn.testAlphanumeric = function (e) {
    return _P.test(e);
  };
});
var si = le((Le) => {
  'use strict';
  var yP = Hm(),
    zm = $m();
  Le.NUMERIC = { id: 'Numeric', bit: 1, ccBits: [10, 12, 14] };
  Le.ALPHANUMERIC = { id: 'Alphanumeric', bit: 2, ccBits: [9, 11, 13] };
  Le.BYTE = { id: 'Byte', bit: 4, ccBits: [8, 16, 16] };
  Le.KANJI = { id: 'Kanji', bit: 8, ccBits: [8, 10, 12] };
  Le.MIXED = { bit: -1 };
  Le.getCharCountIndicator = function (e, i) {
    if (!e.ccBits) throw new Error('Invalid mode: ' + e);
    if (!yP.isValid(i)) throw new Error('Invalid version: ' + i);
    return i >= 1 && i < 10 ? e.ccBits[0] : i < 27 ? e.ccBits[1] : e.ccBits[2];
  };
  Le.getBestModeForData = function (e) {
    return zm.testNumeric(e)
      ? Le.NUMERIC
      : zm.testAlphanumeric(e)
      ? Le.ALPHANUMERIC
      : zm.testKanji(e)
      ? Le.KANJI
      : Le.BYTE;
  };
  Le.toString = function (e) {
    if (e && e.id) return e.id;
    throw new Error('Invalid mode');
  };
  Le.isValid = function (e) {
    return e && e.bit && e.ccBits;
  };
  function xP(t) {
    if (typeof t != 'string') throw new Error('Param is not a string');
    switch (t.toLowerCase()) {
      case 'numeric':
        return Le.NUMERIC;
      case 'alphanumeric':
        return Le.ALPHANUMERIC;
      case 'kanji':
        return Le.KANJI;
      case 'byte':
        return Le.BYTE;
      default:
        throw new Error('Unknown mode: ' + t);
    }
  }
  Le.from = function (e, i) {
    if (Le.isValid(e)) return e;
    try {
      return xP(e);
    } catch {
      return i;
    }
  };
});
var tE = le((Gi) => {
  'use strict';
  var $l = ri(),
    wP = jm(),
    Xw = Ll(),
    ai = si(),
    Wm = Hm(),
    Jw = 7973,
    Kw = $l.getBCHDigit(Jw);
  function EP(t, e, i) {
    for (let n = 1; n <= 40; n++) if (e <= Gi.getCapacity(n, i, t)) return n;
  }
  function eE(t, e) {
    return ai.getCharCountIndicator(t, e) + 4;
  }
  function CP(t, e) {
    let i = 0;
    return (
      t.forEach(function (n) {
        let r = eE(n.mode, e);
        i += r + n.getBitsLength();
      }),
      i
    );
  }
  function DP(t, e) {
    for (let i = 1; i <= 40; i++)
      if (CP(t, i) <= Gi.getCapacity(i, e, ai.MIXED)) return i;
  }
  Gi.from = function (e, i) {
    return Wm.isValid(e) ? parseInt(e, 10) : i;
  };
  Gi.getCapacity = function (e, i, n) {
    if (!Wm.isValid(e)) throw new Error('Invalid QR Code version');
    typeof n > 'u' && (n = ai.BYTE);
    let r = $l.getSymbolTotalCodewords(e),
      o = wP.getTotalCodewordsCount(e, i),
      s = (r - o) * 8;
    if (n === ai.MIXED) return s;
    let a = s - eE(n, e);
    switch (n) {
      case ai.NUMERIC:
        return Math.floor((a / 10) * 3);
      case ai.ALPHANUMERIC:
        return Math.floor((a / 11) * 2);
      case ai.KANJI:
        return Math.floor(a / 13);
      case ai.BYTE:
      default:
        return Math.floor(a / 8);
    }
  };
  Gi.getBestVersionForData = function (e, i) {
    let n,
      r = Xw.from(i, Xw.M);
    if (Array.isArray(e)) {
      if (e.length > 1) return DP(e, r);
      if (e.length === 0) return 1;
      n = e[0];
    } else n = e;
    return EP(n.mode, n.getLength(), r);
  };
  Gi.getEncodedBits = function (e) {
    if (!Wm.isValid(e) || e < 7) throw new Error('Invalid QR Code version');
    let i = e << 12;
    for (; $l.getBCHDigit(i) - Kw >= 0; ) i ^= Jw << ($l.getBCHDigit(i) - Kw);
    return (e << 12) | i;
  };
});
var oE = le((rE) => {
  'use strict';
  var Gm = ri(),
    iE = 1335,
    IP = 21522,
    nE = Gm.getBCHDigit(iE);
  rE.getEncodedBits = function (e, i) {
    let n = (e.bit << 3) | i,
      r = n << 10;
    for (; Gm.getBCHDigit(r) - nE >= 0; ) r ^= iE << (Gm.getBCHDigit(r) - nE);
    return ((n << 10) | r) ^ IP;
  };
});
var aE = le((q8, sE) => {
  'use strict';
  var MP = si();
  function Vr(t) {
    (this.mode = MP.NUMERIC), (this.data = t.toString());
  }
  Vr.getBitsLength = function (e) {
    return 10 * Math.floor(e / 3) + (e % 3 ? (e % 3) * 3 + 1 : 0);
  };
  Vr.prototype.getLength = function () {
    return this.data.length;
  };
  Vr.prototype.getBitsLength = function () {
    return Vr.getBitsLength(this.data.length);
  };
  Vr.prototype.write = function (e) {
    let i, n, r;
    for (i = 0; i + 3 <= this.data.length; i += 3)
      (n = this.data.substr(i, 3)), (r = parseInt(n, 10)), e.put(r, 10);
    let o = this.data.length - i;
    o > 0 &&
      ((n = this.data.substr(i)), (r = parseInt(n, 10)), e.put(r, o * 3 + 1));
  };
  sE.exports = Vr;
});
var lE = le((Q8, cE) => {
  'use strict';
  var SP = si(),
    qm = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      ' ',
      '$',
      '%',
      '*',
      '+',
      '-',
      '.',
      '/',
      ':',
    ];
  function jr(t) {
    (this.mode = SP.ALPHANUMERIC), (this.data = t);
  }
  jr.getBitsLength = function (e) {
    return 11 * Math.floor(e / 2) + 6 * (e % 2);
  };
  jr.prototype.getLength = function () {
    return this.data.length;
  };
  jr.prototype.getBitsLength = function () {
    return jr.getBitsLength(this.data.length);
  };
  jr.prototype.write = function (e) {
    let i;
    for (i = 0; i + 2 <= this.data.length; i += 2) {
      let n = qm.indexOf(this.data[i]) * 45;
      (n += qm.indexOf(this.data[i + 1])), e.put(n, 11);
    }
    this.data.length % 2 && e.put(qm.indexOf(this.data[i]), 6);
  };
  cE.exports = jr;
});
var uE = le((Z8, dE) => {
  'use strict';
  dE.exports = function (e) {
    for (var i = [], n = e.length, r = 0; r < n; r++) {
      var o = e.charCodeAt(r);
      if (o >= 55296 && o <= 56319 && n > r + 1) {
        var s = e.charCodeAt(r + 1);
        s >= 56320 &&
          s <= 57343 &&
          ((o = (o - 55296) * 1024 + s - 56320 + 65536), (r += 1));
      }
      if (o < 128) {
        i.push(o);
        continue;
      }
      if (o < 2048) {
        i.push((o >> 6) | 192), i.push((o & 63) | 128);
        continue;
      }
      if (o < 55296 || (o >= 57344 && o < 65536)) {
        i.push((o >> 12) | 224),
          i.push(((o >> 6) & 63) | 128),
          i.push((o & 63) | 128);
        continue;
      }
      if (o >= 65536 && o <= 1114111) {
        i.push((o >> 18) | 240),
          i.push(((o >> 12) & 63) | 128),
          i.push(((o >> 6) & 63) | 128),
          i.push((o & 63) | 128);
        continue;
      }
      i.push(239, 191, 189);
    }
    return new Uint8Array(i).buffer;
  };
});
var hE = le((Y8, fE) => {
  'use strict';
  var TP = uE(),
    kP = si();
  function Br(t) {
    (this.mode = kP.BYTE),
      typeof t == 'string' && (t = TP(t)),
      (this.data = new Uint8Array(t));
  }
  Br.getBitsLength = function (e) {
    return e * 8;
  };
  Br.prototype.getLength = function () {
    return this.data.length;
  };
  Br.prototype.getBitsLength = function () {
    return Br.getBitsLength(this.data.length);
  };
  Br.prototype.write = function (t) {
    for (let e = 0, i = this.data.length; e < i; e++) t.put(this.data[e], 8);
  };
  fE.exports = Br;
});
var pE = le((X8, mE) => {
  'use strict';
  var AP = si(),
    RP = ri();
  function Ur(t) {
    (this.mode = AP.KANJI), (this.data = t);
  }
  Ur.getBitsLength = function (e) {
    return e * 13;
  };
  Ur.prototype.getLength = function () {
    return this.data.length;
  };
  Ur.prototype.getBitsLength = function () {
    return Ur.getBitsLength(this.data.length);
  };
  Ur.prototype.write = function (t) {
    let e;
    for (e = 0; e < this.data.length; e++) {
      let i = RP.toSJIS(this.data[e]);
      if (i >= 33088 && i <= 40956) i -= 33088;
      else if (i >= 57408 && i <= 60351) i -= 49472;
      else
        throw new Error(
          'Invalid SJIS character: ' +
            this.data[e] +
            `
Make sure your charset is UTF-8`
        );
      (i = ((i >>> 8) & 255) * 192 + (i & 255)), t.put(i, 13);
    }
  };
  mE.exports = Ur;
});
var gE = le((K8, Qm) => {
  'use strict';
  var Ms = {
    single_source_shortest_paths: function (t, e, i) {
      var n = {},
        r = {};
      r[e] = 0;
      var o = Ms.PriorityQueue.make();
      o.push(e, 0);
      for (var s, a, c, l, d, u, f, h, m; !o.empty(); ) {
        (s = o.pop()), (a = s.value), (l = s.cost), (d = t[a] || {});
        for (c in d)
          d.hasOwnProperty(c) &&
            ((u = d[c]),
            (f = l + u),
            (h = r[c]),
            (m = typeof r[c] > 'u'),
            (m || h > f) && ((r[c] = f), o.push(c, f), (n[c] = a)));
      }
      if (typeof i < 'u' && typeof r[i] > 'u') {
        var g = ['Could not find a path from ', e, ' to ', i, '.'].join('');
        throw new Error(g);
      }
      return n;
    },
    extract_shortest_path_from_predecessor_list: function (t, e) {
      for (var i = [], n = e, r; n; ) i.push(n), (r = t[n]), (n = t[n]);
      return i.reverse(), i;
    },
    find_path: function (t, e, i) {
      var n = Ms.single_source_shortest_paths(t, e, i);
      return Ms.extract_shortest_path_from_predecessor_list(n, i);
    },
    PriorityQueue: {
      make: function (t) {
        var e = Ms.PriorityQueue,
          i = {},
          n;
        t = t || {};
        for (n in e) e.hasOwnProperty(n) && (i[n] = e[n]);
        return (i.queue = []), (i.sorter = t.sorter || e.default_sorter), i;
      },
      default_sorter: function (t, e) {
        return t.cost - e.cost;
      },
      push: function (t, e) {
        var i = { value: t, cost: e };
        this.queue.push(i), this.queue.sort(this.sorter);
      },
      pop: function () {
        return this.queue.shift();
      },
      empty: function () {
        return this.queue.length === 0;
      },
    },
  };
  typeof Qm < 'u' && (Qm.exports = Ms);
});
var CE = le((Hr) => {
  'use strict';
  var ae = si(),
    _E = aE(),
    yE = lE(),
    xE = hE(),
    wE = pE(),
    Ss = $m(),
    zl = ri(),
    FP = gE();
  function bE(t) {
    return unescape(encodeURIComponent(t)).length;
  }
  function Ts(t, e, i) {
    let n = [],
      r;
    for (; (r = t.exec(i)) !== null; )
      n.push({ data: r[0], index: r.index, mode: e, length: r[0].length });
    return n;
  }
  function EE(t) {
    let e = Ts(Ss.NUMERIC, ae.NUMERIC, t),
      i = Ts(Ss.ALPHANUMERIC, ae.ALPHANUMERIC, t),
      n,
      r;
    return (
      zl.isKanjiModeEnabled()
        ? ((n = Ts(Ss.BYTE, ae.BYTE, t)), (r = Ts(Ss.KANJI, ae.KANJI, t)))
        : ((n = Ts(Ss.BYTE_KANJI, ae.BYTE, t)), (r = [])),
      e
        .concat(i, n, r)
        .sort(function (s, a) {
          return s.index - a.index;
        })
        .map(function (s) {
          return { data: s.data, mode: s.mode, length: s.length };
        })
    );
  }
  function Zm(t, e) {
    switch (e) {
      case ae.NUMERIC:
        return _E.getBitsLength(t);
      case ae.ALPHANUMERIC:
        return yE.getBitsLength(t);
      case ae.KANJI:
        return wE.getBitsLength(t);
      case ae.BYTE:
        return xE.getBitsLength(t);
    }
  }
  function NP(t) {
    return t.reduce(function (e, i) {
      let n = e.length - 1 >= 0 ? e[e.length - 1] : null;
      return n && n.mode === i.mode
        ? ((e[e.length - 1].data += i.data), e)
        : (e.push(i), e);
    }, []);
  }
  function OP(t) {
    let e = [];
    for (let i = 0; i < t.length; i++) {
      let n = t[i];
      switch (n.mode) {
        case ae.NUMERIC:
          e.push([
            n,
            { data: n.data, mode: ae.ALPHANUMERIC, length: n.length },
            { data: n.data, mode: ae.BYTE, length: n.length },
          ]);
          break;
        case ae.ALPHANUMERIC:
          e.push([n, { data: n.data, mode: ae.BYTE, length: n.length }]);
          break;
        case ae.KANJI:
          e.push([n, { data: n.data, mode: ae.BYTE, length: bE(n.data) }]);
          break;
        case ae.BYTE:
          e.push([{ data: n.data, mode: ae.BYTE, length: bE(n.data) }]);
      }
    }
    return e;
  }
  function PP(t, e) {
    let i = {},
      n = { start: {} },
      r = ['start'];
    for (let o = 0; o < t.length; o++) {
      let s = t[o],
        a = [];
      for (let c = 0; c < s.length; c++) {
        let l = s[c],
          d = '' + o + c;
        a.push(d), (i[d] = { node: l, lastCount: 0 }), (n[d] = {});
        for (let u = 0; u < r.length; u++) {
          let f = r[u];
          i[f] && i[f].node.mode === l.mode
            ? ((n[f][d] =
                Zm(i[f].lastCount + l.length, l.mode) -
                Zm(i[f].lastCount, l.mode)),
              (i[f].lastCount += l.length))
            : (i[f] && (i[f].lastCount = l.length),
              (n[f][d] =
                Zm(l.length, l.mode) +
                4 +
                ae.getCharCountIndicator(l.mode, e)));
        }
      }
      r = a;
    }
    for (let o = 0; o < r.length; o++) n[r[o]].end = 0;
    return { map: n, table: i };
  }
  function vE(t, e) {
    let i,
      n = ae.getBestModeForData(t);
    if (((i = ae.from(e, n)), i !== ae.BYTE && i.bit < n.bit))
      throw new Error(
        '"' +
          t +
          '" cannot be encoded with mode ' +
          ae.toString(i) +
          `.
 Suggested mode is: ` +
          ae.toString(n)
      );
    switch ((i === ae.KANJI && !zl.isKanjiModeEnabled() && (i = ae.BYTE), i)) {
      case ae.NUMERIC:
        return new _E(t);
      case ae.ALPHANUMERIC:
        return new yE(t);
      case ae.KANJI:
        return new wE(t);
      case ae.BYTE:
        return new xE(t);
    }
  }
  Hr.fromArray = function (e) {
    return e.reduce(function (i, n) {
      return (
        typeof n == 'string'
          ? i.push(vE(n, null))
          : n.data && i.push(vE(n.data, n.mode)),
        i
      );
    }, []);
  };
  Hr.fromString = function (e, i) {
    let n = EE(e, zl.isKanjiModeEnabled()),
      r = OP(n),
      o = PP(r, i),
      s = FP.find_path(o.map, 'start', 'end'),
      a = [];
    for (let c = 1; c < s.length - 1; c++) a.push(o.table[s[c]].node);
    return Hr.fromArray(NP(a));
  };
  Hr.rawSplit = function (e) {
    return Hr.fromArray(EE(e, zl.isKanjiModeEnabled()));
  };
});
var IE = le((DE) => {
  'use strict';
  var Gl = ri(),
    Ym = Ll(),
    LP = Pw(),
    VP = Vw(),
    jP = jw(),
    BP = Hw(),
    Jm = $w(),
    ep = jm(),
    UP = Qw(),
    Wl = tE(),
    HP = oE(),
    $P = si(),
    Xm = CE();
  function zP(t, e) {
    let i = t.size,
      n = BP.getPositions(e);
    for (let r = 0; r < n.length; r++) {
      let o = n[r][0],
        s = n[r][1];
      for (let a = -1; a <= 7; a++)
        if (!(o + a <= -1 || i <= o + a))
          for (let c = -1; c <= 7; c++)
            s + c <= -1 ||
              i <= s + c ||
              ((a >= 0 && a <= 6 && (c === 0 || c === 6)) ||
              (c >= 0 && c <= 6 && (a === 0 || a === 6)) ||
              (a >= 2 && a <= 4 && c >= 2 && c <= 4)
                ? t.set(o + a, s + c, !0, !0)
                : t.set(o + a, s + c, !1, !0));
    }
  }
  function WP(t) {
    let e = t.size;
    for (let i = 8; i < e - 8; i++) {
      let n = i % 2 === 0;
      t.set(i, 6, n, !0), t.set(6, i, n, !0);
    }
  }
  function GP(t, e) {
    let i = jP.getPositions(e);
    for (let n = 0; n < i.length; n++) {
      let r = i[n][0],
        o = i[n][1];
      for (let s = -2; s <= 2; s++)
        for (let a = -2; a <= 2; a++)
          s === -2 || s === 2 || a === -2 || a === 2 || (s === 0 && a === 0)
            ? t.set(r + s, o + a, !0, !0)
            : t.set(r + s, o + a, !1, !0);
    }
  }
  function qP(t, e) {
    let i = t.size,
      n = Wl.getEncodedBits(e),
      r,
      o,
      s;
    for (let a = 0; a < 18; a++)
      (r = Math.floor(a / 3)),
        (o = (a % 3) + i - 8 - 3),
        (s = ((n >> a) & 1) === 1),
        t.set(r, o, s, !0),
        t.set(o, r, s, !0);
  }
  function Km(t, e, i) {
    let n = t.size,
      r = HP.getEncodedBits(e, i),
      o,
      s;
    for (o = 0; o < 15; o++)
      (s = ((r >> o) & 1) === 1),
        o < 6
          ? t.set(o, 8, s, !0)
          : o < 8
          ? t.set(o + 1, 8, s, !0)
          : t.set(n - 15 + o, 8, s, !0),
        o < 8
          ? t.set(8, n - o - 1, s, !0)
          : o < 9
          ? t.set(8, 15 - o - 1 + 1, s, !0)
          : t.set(8, 15 - o - 1, s, !0);
    t.set(n - 8, 8, 1, !0);
  }
  function QP(t, e) {
    let i = t.size,
      n = -1,
      r = i - 1,
      o = 7,
      s = 0;
    for (let a = i - 1; a > 0; a -= 2)
      for (a === 6 && a--; ; ) {
        for (let c = 0; c < 2; c++)
          if (!t.isReserved(r, a - c)) {
            let l = !1;
            s < e.length && (l = ((e[s] >>> o) & 1) === 1),
              t.set(r, a - c, l),
              o--,
              o === -1 && (s++, (o = 7));
          }
        if (((r += n), r < 0 || i <= r)) {
          (r -= n), (n = -n);
          break;
        }
      }
  }
  function ZP(t, e, i) {
    let n = new LP();
    i.forEach(function (c) {
      n.put(c.mode.bit, 4),
        n.put(c.getLength(), $P.getCharCountIndicator(c.mode, t)),
        c.write(n);
    });
    let r = Gl.getSymbolTotalCodewords(t),
      o = ep.getTotalCodewordsCount(t, e),
      s = (r - o) * 8;
    for (
      n.getLengthInBits() + 4 <= s && n.put(0, 4);
      n.getLengthInBits() % 8 !== 0;

    )
      n.putBit(0);
    let a = (s - n.getLengthInBits()) / 8;
    for (let c = 0; c < a; c++) n.put(c % 2 ? 17 : 236, 8);
    return YP(n, t, e);
  }
  function YP(t, e, i) {
    let n = Gl.getSymbolTotalCodewords(e),
      r = ep.getTotalCodewordsCount(e, i),
      o = n - r,
      s = ep.getBlocksCount(e, i),
      a = n % s,
      c = s - a,
      l = Math.floor(n / s),
      d = Math.floor(o / s),
      u = d + 1,
      f = l - d,
      h = new UP(f),
      m = 0,
      g = new Array(s),
      C = new Array(s),
      E = 0,
      N = new Uint8Array(t.buffer);
    for (let ge = 0; ge < s; ge++) {
      let et = ge < c ? d : u;
      (g[ge] = N.slice(m, m + et)),
        (C[ge] = h.encode(g[ge])),
        (m += et),
        (E = Math.max(E, et));
    }
    let ce = new Uint8Array(n),
      ie = 0,
      fe,
      re;
    for (fe = 0; fe < E; fe++)
      for (re = 0; re < s; re++) fe < g[re].length && (ce[ie++] = g[re][fe]);
    for (fe = 0; fe < f; fe++) for (re = 0; re < s; re++) ce[ie++] = C[re][fe];
    return ce;
  }
  function XP(t, e, i, n) {
    let r;
    if (Array.isArray(t)) r = Xm.fromArray(t);
    else if (typeof t == 'string') {
      let l = e;
      if (!l) {
        let d = Xm.rawSplit(t);
        l = Wl.getBestVersionForData(d, i);
      }
      r = Xm.fromString(t, l || 40);
    } else throw new Error('Invalid data');
    let o = Wl.getBestVersionForData(r, i);
    if (!o)
      throw new Error(
        'The amount of data is too big to be stored in a QR Code'
      );
    if (!e) e = o;
    else if (e < o)
      throw new Error(
        `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` +
          o +
          `.
`
      );
    let s = ZP(e, i, r),
      a = Gl.getSymbolSize(e),
      c = new VP(a);
    return (
      zP(c, e),
      WP(c),
      GP(c, e),
      Km(c, i, 0),
      e >= 7 && qP(c, e),
      QP(c, s),
      isNaN(n) && (n = Jm.getBestMask(c, Km.bind(null, c, i))),
      Jm.applyMask(n, c),
      Km(c, i, n),
      {
        modules: c,
        version: e,
        errorCorrectionLevel: i,
        maskPattern: n,
        segments: r,
      }
    );
  }
  DE.create = function (e, i) {
    if (typeof e > 'u' || e === '') throw new Error('No input text');
    let n = Ym.M,
      r,
      o;
    return (
      typeof i < 'u' &&
        ((n = Ym.from(i.errorCorrectionLevel, Ym.M)),
        (r = Wl.from(i.version)),
        (o = Jm.from(i.maskPattern)),
        i.toSJISFunc && Gl.setToSJISFunction(i.toSJISFunc)),
      XP(e, r, n, o)
    );
  };
});
var tp = le((qi) => {
  'use strict';
  function ME(t) {
    if ((typeof t == 'number' && (t = t.toString()), typeof t != 'string'))
      throw new Error('Color should be defined as hex string');
    let e = t.slice().replace('#', '').split('');
    if (e.length < 3 || e.length === 5 || e.length > 8)
      throw new Error('Invalid hex color: ' + t);
    (e.length === 3 || e.length === 4) &&
      (e = Array.prototype.concat.apply(
        [],
        e.map(function (n) {
          return [n, n];
        })
      )),
      e.length === 6 && e.push('F', 'F');
    let i = parseInt(e.join(''), 16);
    return {
      r: (i >> 24) & 255,
      g: (i >> 16) & 255,
      b: (i >> 8) & 255,
      a: i & 255,
      hex: '#' + e.slice(0, 6).join(''),
    };
  }
  qi.getOptions = function (e) {
    e || (e = {}), e.color || (e.color = {});
    let i =
        typeof e.margin > 'u' || e.margin === null || e.margin < 0
          ? 4
          : e.margin,
      n = e.width && e.width >= 21 ? e.width : void 0,
      r = e.scale || 4;
    return {
      width: n,
      scale: n ? 4 : r,
      margin: i,
      color: {
        dark: ME(e.color.dark || '#000000ff'),
        light: ME(e.color.light || '#ffffffff'),
      },
      type: e.type,
      rendererOpts: e.rendererOpts || {},
    };
  };
  qi.getScale = function (e, i) {
    return i.width && i.width >= e + i.margin * 2
      ? i.width / (e + i.margin * 2)
      : i.scale;
  };
  qi.getImageWidth = function (e, i) {
    let n = qi.getScale(e, i);
    return Math.floor((e + i.margin * 2) * n);
  };
  qi.qrToImageData = function (e, i, n) {
    let r = i.modules.size,
      o = i.modules.data,
      s = qi.getScale(r, n),
      a = Math.floor((r + n.margin * 2) * s),
      c = n.margin * s,
      l = [n.color.light, n.color.dark];
    for (let d = 0; d < a; d++)
      for (let u = 0; u < a; u++) {
        let f = (d * a + u) * 4,
          h = n.color.light;
        if (d >= c && u >= c && d < a - c && u < a - c) {
          let m = Math.floor((d - c) / s),
            g = Math.floor((u - c) / s);
          h = l[o[m * r + g] ? 1 : 0];
        }
        (e[f++] = h.r), (e[f++] = h.g), (e[f++] = h.b), (e[f] = h.a);
      }
  };
});
var SE = le((ql) => {
  'use strict';
  var np = tp();
  function KP(t, e, i) {
    t.clearRect(0, 0, e.width, e.height),
      e.style || (e.style = {}),
      (e.height = i),
      (e.width = i),
      (e.style.height = i + 'px'),
      (e.style.width = i + 'px');
  }
  function JP() {
    try {
      return document.createElement('canvas');
    } catch {
      throw new Error('You need to specify a canvas element');
    }
  }
  ql.render = function (e, i, n) {
    let r = n,
      o = i;
    typeof r > 'u' && (!i || !i.getContext) && ((r = i), (i = void 0)),
      i || (o = JP()),
      (r = np.getOptions(r));
    let s = np.getImageWidth(e.modules.size, r),
      a = o.getContext('2d'),
      c = a.createImageData(s, s);
    return (
      np.qrToImageData(c.data, e, r), KP(a, o, s), a.putImageData(c, 0, 0), o
    );
  };
  ql.renderToDataURL = function (e, i, n) {
    let r = n;
    typeof r > 'u' && (!i || !i.getContext) && ((r = i), (i = void 0)),
      r || (r = {});
    let o = ql.render(e, i, r),
      s = r.type || 'image/png',
      a = r.rendererOpts || {};
    return o.toDataURL(s, a.quality);
  };
});
var AE = le((kE) => {
  'use strict';
  var eL = tp();
  function TE(t, e) {
    let i = t.a / 255,
      n = e + '="' + t.hex + '"';
    return i < 1 ? n + ' ' + e + '-opacity="' + i.toFixed(2).slice(1) + '"' : n;
  }
  function ip(t, e, i) {
    let n = t + e;
    return typeof i < 'u' && (n += ' ' + i), n;
  }
  function tL(t, e, i) {
    let n = '',
      r = 0,
      o = !1,
      s = 0;
    for (let a = 0; a < t.length; a++) {
      let c = Math.floor(a % e),
        l = Math.floor(a / e);
      !c && !o && (o = !0),
        t[a]
          ? (s++,
            (a > 0 && c > 0 && t[a - 1]) ||
              ((n += o ? ip('M', c + i, 0.5 + l + i) : ip('m', r, 0)),
              (r = 0),
              (o = !1)),
            (c + 1 < e && t[a + 1]) || ((n += ip('h', s)), (s = 0)))
          : r++;
    }
    return n;
  }
  kE.render = function (e, i, n) {
    let r = eL.getOptions(i),
      o = e.modules.size,
      s = e.modules.data,
      a = o + r.margin * 2,
      c = r.color.light.a
        ? '<path ' +
          TE(r.color.light, 'fill') +
          ' d="M0 0h' +
          a +
          'v' +
          a +
          'H0z"/>'
        : '',
      l =
        '<path ' +
        TE(r.color.dark, 'stroke') +
        ' d="' +
        tL(s, o, r.margin) +
        '"/>',
      d = 'viewBox="0 0 ' + a + ' ' + a + '"',
      f =
        '<svg xmlns="http://www.w3.org/2000/svg" ' +
        (r.width ? 'width="' + r.width + '" height="' + r.width + '" ' : '') +
        d +
        ' shape-rendering="crispEdges">' +
        c +
        l +
        `</svg>
`;
    return typeof n == 'function' && n(null, f), f;
  };
});
var FE = le((ks) => {
  'use strict';
  var nL = Fw(),
    rp = IE(),
    RE = SE(),
    iL = AE();
  function op(t, e, i, n, r) {
    let o = [].slice.call(arguments, 1),
      s = o.length,
      a = typeof o[s - 1] == 'function';
    if (!a && !nL()) throw new Error('Callback required as last argument');
    if (a) {
      if (s < 2) throw new Error('Too few arguments provided');
      s === 2
        ? ((r = i), (i = e), (e = n = void 0))
        : s === 3 &&
          (e.getContext && typeof r > 'u'
            ? ((r = n), (n = void 0))
            : ((r = n), (n = i), (i = e), (e = void 0)));
    } else {
      if (s < 1) throw new Error('Too few arguments provided');
      return (
        s === 1
          ? ((i = e), (e = n = void 0))
          : s === 2 && !e.getContext && ((n = i), (i = e), (e = void 0)),
        new Promise(function (c, l) {
          try {
            let d = rp.create(i, n);
            c(t(d, e, n));
          } catch (d) {
            l(d);
          }
        })
      );
    }
    try {
      let c = rp.create(i, n);
      r(null, t(c, e, n));
    } catch (c) {
      r(c);
    }
  }
  ks.create = rp.create;
  ks.toCanvas = op.bind(null, RE.render);
  ks.toDataURL = op.bind(null, RE.renderToDataURL);
  ks.toString = op.bind(null, function (t, e, i) {
    return iL.render(t, i);
  });
});
var hp = null;
var Xl = 1;
function Ge(t) {
  let e = hp;
  return (hp = t), e;
}
var mp = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function KE(t) {
  if (!(ed(t) && !t.dirty) && !(!t.dirty && t.lastCleanEpoch === Xl)) {
    if (!t.producerMustRecompute(t) && !Kl(t)) {
      (t.dirty = !1), (t.lastCleanEpoch = Xl);
      return;
    }
    t.producerRecomputeValue(t), (t.dirty = !1), (t.lastCleanEpoch = Xl);
  }
}
function pp(t) {
  return t && (t.nextProducerIndex = 0), Ge(t);
}
function gp(t, e) {
  if (
    (Ge(e),
    !(
      !t ||
      t.producerNode === void 0 ||
      t.producerIndexOfThis === void 0 ||
      t.producerLastReadVersion === void 0
    ))
  ) {
    if (ed(t))
      for (let i = t.nextProducerIndex; i < t.producerNode.length; i++)
        Jl(t.producerNode[i], t.producerIndexOfThis[i]);
    for (; t.producerNode.length > t.nextProducerIndex; )
      t.producerNode.pop(),
        t.producerLastReadVersion.pop(),
        t.producerIndexOfThis.pop();
  }
}
function Kl(t) {
  Ns(t);
  for (let e = 0; e < t.producerNode.length; e++) {
    let i = t.producerNode[e],
      n = t.producerLastReadVersion[e];
    if (n !== i.version || (KE(i), n !== i.version)) return !0;
  }
  return !1;
}
function bp(t) {
  if ((Ns(t), ed(t)))
    for (let e = 0; e < t.producerNode.length; e++)
      Jl(t.producerNode[e], t.producerIndexOfThis[e]);
  (t.producerNode.length =
    t.producerLastReadVersion.length =
    t.producerIndexOfThis.length =
      0),
    t.liveConsumerNode &&
      (t.liveConsumerNode.length = t.liveConsumerIndexOfThis.length = 0);
}
function Jl(t, e) {
  if ((JE(t), Ns(t), t.liveConsumerNode.length === 1))
    for (let n = 0; n < t.producerNode.length; n++)
      Jl(t.producerNode[n], t.producerIndexOfThis[n]);
  let i = t.liveConsumerNode.length - 1;
  if (
    ((t.liveConsumerNode[e] = t.liveConsumerNode[i]),
    (t.liveConsumerIndexOfThis[e] = t.liveConsumerIndexOfThis[i]),
    t.liveConsumerNode.length--,
    t.liveConsumerIndexOfThis.length--,
    e < t.liveConsumerNode.length)
  ) {
    let n = t.liveConsumerIndexOfThis[e],
      r = t.liveConsumerNode[e];
    Ns(r), (r.producerIndexOfThis[n] = e);
  }
}
function ed(t) {
  return t.consumerIsAlwaysLive || (t?.liveConsumerNode?.length ?? 0) > 0;
}
function Ns(t) {
  (t.producerNode ??= []),
    (t.producerIndexOfThis ??= []),
    (t.producerLastReadVersion ??= []);
}
function JE(t) {
  (t.liveConsumerNode ??= []), (t.liveConsumerIndexOfThis ??= []);
}
function eC() {
  throw new Error();
}
var tC = eC;
function vp(t) {
  tC = t;
}
function P(t) {
  return typeof t == 'function';
}
function Qi(t) {
  let i = t((n) => {
    Error.call(n), (n.stack = new Error().stack);
  });
  return (
    (i.prototype = Object.create(Error.prototype)),
    (i.prototype.constructor = i),
    i
  );
}
var Os = Qi(
  (t) =>
    function (i) {
      t(this),
        (this.message = i
          ? `${i.length} errors occurred during unsubscription:
${i.map((n, r) => `${r + 1}) ${n.toString()}`).join(`
  `)}`
          : ''),
        (this.name = 'UnsubscriptionError'),
        (this.errors = i);
    }
);
function di(t, e) {
  if (t) {
    let i = t.indexOf(e);
    0 <= i && t.splice(i, 1);
  }
}
var be = class t {
  constructor(e) {
    (this.initialTeardown = e),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  unsubscribe() {
    let e;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: i } = this;
      if (i)
        if (((this._parentage = null), Array.isArray(i)))
          for (let o of i) o.remove(this);
        else i.remove(this);
      let { initialTeardown: n } = this;
      if (P(n))
        try {
          n();
        } catch (o) {
          e = o instanceof Os ? o.errors : [o];
        }
      let { _finalizers: r } = this;
      if (r) {
        this._finalizers = null;
        for (let o of r)
          try {
            _p(o);
          } catch (s) {
            (e = e ?? []),
              s instanceof Os ? (e = [...e, ...s.errors]) : e.push(s);
          }
      }
      if (e) throw new Os(e);
    }
  }
  add(e) {
    var i;
    if (e && e !== this)
      if (this.closed) _p(e);
      else {
        if (e instanceof t) {
          if (e.closed || e._hasParent(this)) return;
          e._addParent(this);
        }
        (this._finalizers =
          (i = this._finalizers) !== null && i !== void 0 ? i : []).push(e);
      }
  }
  _hasParent(e) {
    let { _parentage: i } = this;
    return i === e || (Array.isArray(i) && i.includes(e));
  }
  _addParent(e) {
    let { _parentage: i } = this;
    this._parentage = Array.isArray(i) ? (i.push(e), i) : i ? [i, e] : e;
  }
  _removeParent(e) {
    let { _parentage: i } = this;
    i === e ? (this._parentage = null) : Array.isArray(i) && di(i, e);
  }
  remove(e) {
    let { _finalizers: i } = this;
    i && di(i, e), e instanceof t && e._removeParent(this);
  }
};
be.EMPTY = (() => {
  let t = new be();
  return (t.closed = !0), t;
})();
var td = be.EMPTY;
function Ps(t) {
  return (
    t instanceof be ||
    (t && 'closed' in t && P(t.remove) && P(t.add) && P(t.unsubscribe))
  );
}
function _p(t) {
  P(t) ? t() : t.unsubscribe();
}
var Ft = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var Zi = {
  setTimeout(t, e, ...i) {
    let { delegate: n } = Zi;
    return n?.setTimeout ? n.setTimeout(t, e, ...i) : setTimeout(t, e, ...i);
  },
  clearTimeout(t) {
    let { delegate: e } = Zi;
    return (e?.clearTimeout || clearTimeout)(t);
  },
  delegate: void 0,
};
function Ls(t) {
  Zi.setTimeout(() => {
    let { onUnhandledError: e } = Ft;
    if (e) e(t);
    else throw t;
  });
}
function Wr() {}
var yp = (() => nd('C', void 0, void 0))();
function xp(t) {
  return nd('E', void 0, t);
}
function wp(t) {
  return nd('N', t, void 0);
}
function nd(t, e, i) {
  return { kind: t, value: e, error: i };
}
var ui = null;
function Yi(t) {
  if (Ft.useDeprecatedSynchronousErrorHandling) {
    let e = !ui;
    if ((e && (ui = { errorThrown: !1, error: null }), t(), e)) {
      let { errorThrown: i, error: n } = ui;
      if (((ui = null), i)) throw n;
    }
  } else t();
}
function Ep(t) {
  Ft.useDeprecatedSynchronousErrorHandling &&
    ui &&
    ((ui.errorThrown = !0), (ui.error = t));
}
var fi = class extends be {
    constructor(e) {
      super(),
        (this.isStopped = !1),
        e
          ? ((this.destination = e), Ps(e) && e.add(this))
          : (this.destination = rC);
    }
    static create(e, i, n) {
      return new an(e, i, n);
    }
    next(e) {
      this.isStopped ? rd(wp(e), this) : this._next(e);
    }
    error(e) {
      this.isStopped
        ? rd(xp(e), this)
        : ((this.isStopped = !0), this._error(e));
    }
    complete() {
      this.isStopped ? rd(yp, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed ||
        ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(e) {
      this.destination.next(e);
    }
    _error(e) {
      try {
        this.destination.error(e);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  },
  nC = Function.prototype.bind;
function id(t, e) {
  return nC.call(t, e);
}
var od = class {
    constructor(e) {
      this.partialObserver = e;
    }
    next(e) {
      let { partialObserver: i } = this;
      if (i.next)
        try {
          i.next(e);
        } catch (n) {
          Vs(n);
        }
    }
    error(e) {
      let { partialObserver: i } = this;
      if (i.error)
        try {
          i.error(e);
        } catch (n) {
          Vs(n);
        }
      else Vs(e);
    }
    complete() {
      let { partialObserver: e } = this;
      if (e.complete)
        try {
          e.complete();
        } catch (i) {
          Vs(i);
        }
    }
  },
  an = class extends fi {
    constructor(e, i, n) {
      super();
      let r;
      if (P(e) || !e)
        r = { next: e ?? void 0, error: i ?? void 0, complete: n ?? void 0 };
      else {
        let o;
        this && Ft.useDeprecatedNextContext
          ? ((o = Object.create(e)),
            (o.unsubscribe = () => this.unsubscribe()),
            (r = {
              next: e.next && id(e.next, o),
              error: e.error && id(e.error, o),
              complete: e.complete && id(e.complete, o),
            }))
          : (r = e);
      }
      this.destination = new od(r);
    }
  };
function Vs(t) {
  Ft.useDeprecatedSynchronousErrorHandling ? Ep(t) : Ls(t);
}
function iC(t) {
  throw t;
}
function rd(t, e) {
  let { onStoppedNotification: i } = Ft;
  i && Zi.setTimeout(() => i(t, e));
}
var rC = { closed: !0, next: Wr, error: iC, complete: Wr };
var Xi = (() =>
  (typeof Symbol == 'function' && Symbol.observable) || '@@observable')();
function tt(t) {
  return t;
}
function sd(...t) {
  return ad(t);
}
function ad(t) {
  return t.length === 0
    ? tt
    : t.length === 1
    ? t[0]
    : function (i) {
        return t.reduce((n, r) => r(n), i);
      };
}
var Q = (() => {
  class t {
    constructor(i) {
      i && (this._subscribe = i);
    }
    lift(i) {
      let n = new t();
      return (n.source = this), (n.operator = i), n;
    }
    subscribe(i, n, r) {
      let o = sC(i) ? i : new an(i, n, r);
      return (
        Yi(() => {
          let { operator: s, source: a } = this;
          o.add(
            s ? s.call(o, a) : a ? this._subscribe(o) : this._trySubscribe(o)
          );
        }),
        o
      );
    }
    _trySubscribe(i) {
      try {
        return this._subscribe(i);
      } catch (n) {
        i.error(n);
      }
    }
    forEach(i, n) {
      return (
        (n = Cp(n)),
        new n((r, o) => {
          let s = new an({
            next: (a) => {
              try {
                i(a);
              } catch (c) {
                o(c), s.unsubscribe();
              }
            },
            error: o,
            complete: r,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(i) {
      var n;
      return (n = this.source) === null || n === void 0
        ? void 0
        : n.subscribe(i);
    }
    [Xi]() {
      return this;
    }
    pipe(...i) {
      return ad(i)(this);
    }
    toPromise(i) {
      return (
        (i = Cp(i)),
        new i((n, r) => {
          let o;
          this.subscribe(
            (s) => (o = s),
            (s) => r(s),
            () => n(o)
          );
        })
      );
    }
  }
  return (t.create = (e) => new t(e)), t;
})();
function Cp(t) {
  var e;
  return (e = t ?? Ft.Promise) !== null && e !== void 0 ? e : Promise;
}
function oC(t) {
  return t && P(t.next) && P(t.error) && P(t.complete);
}
function sC(t) {
  return (t && t instanceof fi) || (oC(t) && Ps(t));
}
function cd(t) {
  return P(t?.lift);
}
function H(t) {
  return (e) => {
    if (cd(e))
      return e.lift(function (i) {
        try {
          return t(i, this);
        } catch (n) {
          this.error(n);
        }
      });
    throw new TypeError('Unable to lift unknown Observable type');
  };
}
function $(t, e, i, n, r) {
  return new ld(t, e, i, n, r);
}
var ld = class extends fi {
  constructor(e, i, n, r, o, s) {
    super(e),
      (this.onFinalize = o),
      (this.shouldUnsubscribe = s),
      (this._next = i
        ? function (a) {
            try {
              i(a);
            } catch (c) {
              e.error(c);
            }
          }
        : super._next),
      (this._error = r
        ? function (a) {
            try {
              r(a);
            } catch (c) {
              e.error(c);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = n
        ? function () {
            try {
              n();
            } catch (a) {
              e.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var e;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: i } = this;
      super.unsubscribe(),
        !i && ((e = this.onFinalize) === null || e === void 0 || e.call(this));
    }
  }
};
function Ki() {
  return H((t, e) => {
    let i = null;
    t._refCount++;
    let n = $(e, void 0, void 0, void 0, () => {
      if (!t || t._refCount <= 0 || 0 < --t._refCount) {
        i = null;
        return;
      }
      let r = t._connection,
        o = i;
      (i = null), r && (!o || r === o) && r.unsubscribe(), e.unsubscribe();
    });
    t.subscribe(n), n.closed || (i = t.connect());
  });
}
var hi = class extends Q {
  constructor(e, i) {
    super(),
      (this.source = e),
      (this.subjectFactory = i),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      cd(e) && (this.lift = e.lift);
  }
  _subscribe(e) {
    return this.getSubject().subscribe(e);
  }
  getSubject() {
    let e = this._subject;
    return (
      (!e || e.isStopped) && (this._subject = this.subjectFactory()),
      this._subject
    );
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: e } = this;
    (this._subject = this._connection = null), e?.unsubscribe();
  }
  connect() {
    let e = this._connection;
    if (!e) {
      e = this._connection = new be();
      let i = this.getSubject();
      e.add(
        this.source.subscribe(
          $(
            i,
            void 0,
            () => {
              this._teardown(), i.complete();
            },
            (n) => {
              this._teardown(), i.error(n);
            },
            () => this._teardown()
          )
        )
      ),
        e.closed && ((this._connection = null), (e = be.EMPTY));
    }
    return e;
  }
  refCount() {
    return Ki()(this);
  }
};
var Dp = Qi(
  (t) =>
    function () {
      t(this),
        (this.name = 'ObjectUnsubscribedError'),
        (this.message = 'object unsubscribed');
    }
);
var Z = (() => {
    class t extends Q {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(i) {
        let n = new js(this, this);
        return (n.operator = i), n;
      }
      _throwIfClosed() {
        if (this.closed) throw new Dp();
      }
      next(i) {
        Yi(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let n of this.currentObservers) n.next(i);
          }
        });
      }
      error(i) {
        Yi(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = i);
            let { observers: n } = this;
            for (; n.length; ) n.shift().error(i);
          }
        });
      }
      complete() {
        Yi(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: i } = this;
            for (; i.length; ) i.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }
      get observed() {
        var i;
        return (
          ((i = this.observers) === null || i === void 0 ? void 0 : i.length) >
          0
        );
      }
      _trySubscribe(i) {
        return this._throwIfClosed(), super._trySubscribe(i);
      }
      _subscribe(i) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(i),
          this._innerSubscribe(i)
        );
      }
      _innerSubscribe(i) {
        let { hasError: n, isStopped: r, observers: o } = this;
        return n || r
          ? td
          : ((this.currentObservers = null),
            o.push(i),
            new be(() => {
              (this.currentObservers = null), di(o, i);
            }));
      }
      _checkFinalizedStatuses(i) {
        let { hasError: n, thrownError: r, isStopped: o } = this;
        n ? i.error(r) : o && i.complete();
      }
      asObservable() {
        let i = new Q();
        return (i.source = this), i;
      }
    }
    return (t.create = (e, i) => new js(e, i)), t;
  })(),
  js = class extends Z {
    constructor(e, i) {
      super(), (this.destination = e), (this.source = i);
    }
    next(e) {
      var i, n;
      (n =
        (i = this.destination) === null || i === void 0 ? void 0 : i.next) ===
        null ||
        n === void 0 ||
        n.call(i, e);
    }
    error(e) {
      var i, n;
      (n =
        (i = this.destination) === null || i === void 0 ? void 0 : i.error) ===
        null ||
        n === void 0 ||
        n.call(i, e);
    }
    complete() {
      var e, i;
      (i =
        (e = this.destination) === null || e === void 0
          ? void 0
          : e.complete) === null ||
        i === void 0 ||
        i.call(e);
    }
    _subscribe(e) {
      var i, n;
      return (n =
        (i = this.source) === null || i === void 0
          ? void 0
          : i.subscribe(e)) !== null && n !== void 0
        ? n
        : td;
    }
  };
var Ve = class extends Z {
  constructor(e) {
    super(), (this._value = e);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(e) {
    let i = super._subscribe(e);
    return !i.closed && e.next(this._value), i;
  }
  getValue() {
    let { hasError: e, thrownError: i, _value: n } = this;
    if (e) throw i;
    return this._throwIfClosed(), n;
  }
  next(e) {
    super.next((this._value = e));
  }
};
var Gr = {
  now() {
    return (Gr.delegate || Date).now();
  },
  delegate: void 0,
};
var Bs = class extends Z {
  constructor(e = 1 / 0, i = 1 / 0, n = Gr) {
    super(),
      (this._bufferSize = e),
      (this._windowTime = i),
      (this._timestampProvider = n),
      (this._buffer = []),
      (this._infiniteTimeWindow = !0),
      (this._infiniteTimeWindow = i === 1 / 0),
      (this._bufferSize = Math.max(1, e)),
      (this._windowTime = Math.max(1, i));
  }
  next(e) {
    let {
      isStopped: i,
      _buffer: n,
      _infiniteTimeWindow: r,
      _timestampProvider: o,
      _windowTime: s,
    } = this;
    i || (n.push(e), !r && n.push(o.now() + s)),
      this._trimBuffer(),
      super.next(e);
  }
  _subscribe(e) {
    this._throwIfClosed(), this._trimBuffer();
    let i = this._innerSubscribe(e),
      { _infiniteTimeWindow: n, _buffer: r } = this,
      o = r.slice();
    for (let s = 0; s < o.length && !e.closed; s += n ? 1 : 2) e.next(o[s]);
    return this._checkFinalizedStatuses(e), i;
  }
  _trimBuffer() {
    let {
        _bufferSize: e,
        _timestampProvider: i,
        _buffer: n,
        _infiniteTimeWindow: r,
      } = this,
      o = (r ? 1 : 2) * e;
    if ((e < 1 / 0 && o < n.length && n.splice(0, n.length - o), !r)) {
      let s = i.now(),
        a = 0;
      for (let c = 1; c < n.length && n[c] <= s; c += 2) a = c;
      a && n.splice(0, a + 1);
    }
  }
};
var Us = class extends be {
  constructor(e, i) {
    super();
  }
  schedule(e, i = 0) {
    return this;
  }
};
var qr = {
  setInterval(t, e, ...i) {
    let { delegate: n } = qr;
    return n?.setInterval ? n.setInterval(t, e, ...i) : setInterval(t, e, ...i);
  },
  clearInterval(t) {
    let { delegate: e } = qr;
    return (e?.clearInterval || clearInterval)(t);
  },
  delegate: void 0,
};
var Hs = class extends Us {
  constructor(e, i) {
    super(e, i), (this.scheduler = e), (this.work = i), (this.pending = !1);
  }
  schedule(e, i = 0) {
    var n;
    if (this.closed) return this;
    this.state = e;
    let r = this.id,
      o = this.scheduler;
    return (
      r != null && (this.id = this.recycleAsyncId(o, r, i)),
      (this.pending = !0),
      (this.delay = i),
      (this.id =
        (n = this.id) !== null && n !== void 0
          ? n
          : this.requestAsyncId(o, this.id, i)),
      this
    );
  }
  requestAsyncId(e, i, n = 0) {
    return qr.setInterval(e.flush.bind(e, this), n);
  }
  recycleAsyncId(e, i, n = 0) {
    if (n != null && this.delay === n && this.pending === !1) return i;
    i != null && qr.clearInterval(i);
  }
  execute(e, i) {
    if (this.closed) return new Error('executing a cancelled action');
    this.pending = !1;
    let n = this._execute(e, i);
    if (n) return n;
    this.pending === !1 &&
      this.id != null &&
      (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }
  _execute(e, i) {
    let n = !1,
      r;
    try {
      this.work(e);
    } catch (o) {
      (n = !0), (r = o || new Error('Scheduled action threw falsy error'));
    }
    if (n) return this.unsubscribe(), r;
  }
  unsubscribe() {
    if (!this.closed) {
      let { id: e, scheduler: i } = this,
        { actions: n } = i;
      (this.work = this.state = this.scheduler = null),
        (this.pending = !1),
        di(n, this),
        e != null && (this.id = this.recycleAsyncId(i, e, null)),
        (this.delay = null),
        super.unsubscribe();
    }
  }
};
var Ji = class t {
  constructor(e, i = t.now) {
    (this.schedulerActionCtor = e), (this.now = i);
  }
  schedule(e, i = 0, n) {
    return new this.schedulerActionCtor(this, e).schedule(n, i);
  }
};
Ji.now = Gr.now;
var $s = class extends Ji {
  constructor(e, i = Ji.now) {
    super(e, i), (this.actions = []), (this._active = !1);
  }
  flush(e) {
    let { actions: i } = this;
    if (this._active) {
      i.push(e);
      return;
    }
    let n;
    this._active = !0;
    do if ((n = e.execute(e.state, e.delay))) break;
    while ((e = i.shift()));
    if (((this._active = !1), n)) {
      for (; (e = i.shift()); ) e.unsubscribe();
      throw n;
    }
  }
};
var Ip = new $s(Hs);
var Ye = new Q((t) => t.complete());
function Mp(t) {
  return t && P(t.schedule);
}
function dd(t) {
  return t[t.length - 1];
}
function zs(t) {
  return P(dd(t)) ? t.pop() : void 0;
}
function zt(t) {
  return Mp(dd(t)) ? t.pop() : void 0;
}
function Sp(t, e) {
  return typeof dd(t) == 'number' ? t.pop() : e;
}
function kp(t, e, i, n) {
  function r(o) {
    return o instanceof i
      ? o
      : new i(function (s) {
          s(o);
        });
  }
  return new (i || (i = Promise))(function (o, s) {
    function a(d) {
      try {
        l(n.next(d));
      } catch (u) {
        s(u);
      }
    }
    function c(d) {
      try {
        l(n.throw(d));
      } catch (u) {
        s(u);
      }
    }
    function l(d) {
      d.done ? o(d.value) : r(d.value).then(a, c);
    }
    l((n = n.apply(t, e || [])).next());
  });
}
function Tp(t) {
  var e = typeof Symbol == 'function' && Symbol.iterator,
    i = e && t[e],
    n = 0;
  if (i) return i.call(t);
  if (t && typeof t.length == 'number')
    return {
      next: function () {
        return (
          t && n >= t.length && (t = void 0), { value: t && t[n++], done: !t }
        );
      },
    };
  throw new TypeError(
    e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
  );
}
function mi(t) {
  return this instanceof mi ? ((this.v = t), this) : new mi(t);
}
function Ap(t, e, i) {
  if (!Symbol.asyncIterator)
    throw new TypeError('Symbol.asyncIterator is not defined.');
  var n = i.apply(t, e || []),
    r,
    o = [];
  return (
    (r = {}),
    s('next'),
    s('throw'),
    s('return'),
    (r[Symbol.asyncIterator] = function () {
      return this;
    }),
    r
  );
  function s(f) {
    n[f] &&
      (r[f] = function (h) {
        return new Promise(function (m, g) {
          o.push([f, h, m, g]) > 1 || a(f, h);
        });
      });
  }
  function a(f, h) {
    try {
      c(n[f](h));
    } catch (m) {
      u(o[0][3], m);
    }
  }
  function c(f) {
    f.value instanceof mi
      ? Promise.resolve(f.value.v).then(l, d)
      : u(o[0][2], f);
  }
  function l(f) {
    a('next', f);
  }
  function d(f) {
    a('throw', f);
  }
  function u(f, h) {
    f(h), o.shift(), o.length && a(o[0][0], o[0][1]);
  }
}
function Rp(t) {
  if (!Symbol.asyncIterator)
    throw new TypeError('Symbol.asyncIterator is not defined.');
  var e = t[Symbol.asyncIterator],
    i;
  return e
    ? e.call(t)
    : ((t = typeof Tp == 'function' ? Tp(t) : t[Symbol.iterator]()),
      (i = {}),
      n('next'),
      n('throw'),
      n('return'),
      (i[Symbol.asyncIterator] = function () {
        return this;
      }),
      i);
  function n(o) {
    i[o] =
      t[o] &&
      function (s) {
        return new Promise(function (a, c) {
          (s = t[o](s)), r(a, c, s.done, s.value);
        });
      };
  }
  function r(o, s, a, c) {
    Promise.resolve(c).then(function (l) {
      o({ value: l, done: a });
    }, s);
  }
}
var Ws = (t) => t && typeof t.length == 'number' && typeof t != 'function';
function Gs(t) {
  return P(t?.then);
}
function qs(t) {
  return P(t[Xi]);
}
function Qs(t) {
  return Symbol.asyncIterator && P(t?.[Symbol.asyncIterator]);
}
function Zs(t) {
  return new TypeError(
    `You provided ${
      t !== null && typeof t == 'object' ? 'an invalid object' : `'${t}'`
    } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function aC() {
  return typeof Symbol != 'function' || !Symbol.iterator
    ? '@@iterator'
    : Symbol.iterator;
}
var Ys = aC();
function Xs(t) {
  return P(t?.[Ys]);
}
function Ks(t) {
  return Ap(this, arguments, function* () {
    let i = t.getReader();
    try {
      for (;;) {
        let { value: n, done: r } = yield mi(i.read());
        if (r) return yield mi(void 0);
        yield yield mi(n);
      }
    } finally {
      i.releaseLock();
    }
  });
}
function Js(t) {
  return P(t?.getReader);
}
function we(t) {
  if (t instanceof Q) return t;
  if (t != null) {
    if (qs(t)) return cC(t);
    if (Ws(t)) return lC(t);
    if (Gs(t)) return dC(t);
    if (Qs(t)) return Fp(t);
    if (Xs(t)) return uC(t);
    if (Js(t)) return fC(t);
  }
  throw Zs(t);
}
function cC(t) {
  return new Q((e) => {
    let i = t[Xi]();
    if (P(i.subscribe)) return i.subscribe(e);
    throw new TypeError(
      'Provided object does not correctly implement Symbol.observable'
    );
  });
}
function lC(t) {
  return new Q((e) => {
    for (let i = 0; i < t.length && !e.closed; i++) e.next(t[i]);
    e.complete();
  });
}
function dC(t) {
  return new Q((e) => {
    t.then(
      (i) => {
        e.closed || (e.next(i), e.complete());
      },
      (i) => e.error(i)
    ).then(null, Ls);
  });
}
function uC(t) {
  return new Q((e) => {
    for (let i of t) if ((e.next(i), e.closed)) return;
    e.complete();
  });
}
function Fp(t) {
  return new Q((e) => {
    hC(t, e).catch((i) => e.error(i));
  });
}
function fC(t) {
  return Fp(Ks(t));
}
function hC(t, e) {
  var i, n, r, o;
  return kp(this, void 0, void 0, function* () {
    try {
      for (i = Rp(t); (n = yield i.next()), !n.done; ) {
        let s = n.value;
        if ((e.next(s), e.closed)) return;
      }
    } catch (s) {
      r = { error: s };
    } finally {
      try {
        n && !n.done && (o = i.return) && (yield o.call(i));
      } finally {
        if (r) throw r.error;
      }
    }
    e.complete();
  });
}
function st(t, e, i, n = 0, r = !1) {
  let o = e.schedule(function () {
    i(), r ? t.add(this.schedule(null, n)) : this.unsubscribe();
  }, n);
  if ((t.add(o), !r)) return o;
}
function ea(t, e = 0) {
  return H((i, n) => {
    i.subscribe(
      $(
        n,
        (r) => st(n, t, () => n.next(r), e),
        () => st(n, t, () => n.complete(), e),
        (r) => st(n, t, () => n.error(r), e)
      )
    );
  });
}
function ta(t, e = 0) {
  return H((i, n) => {
    n.add(t.schedule(() => i.subscribe(n), e));
  });
}
function Np(t, e) {
  return we(t).pipe(ta(e), ea(e));
}
function Op(t, e) {
  return we(t).pipe(ta(e), ea(e));
}
function Pp(t, e) {
  return new Q((i) => {
    let n = 0;
    return e.schedule(function () {
      n === t.length
        ? i.complete()
        : (i.next(t[n++]), i.closed || this.schedule());
    });
  });
}
function Lp(t, e) {
  return new Q((i) => {
    let n;
    return (
      st(i, e, () => {
        (n = t[Ys]()),
          st(
            i,
            e,
            () => {
              let r, o;
              try {
                ({ value: r, done: o } = n.next());
              } catch (s) {
                i.error(s);
                return;
              }
              o ? i.complete() : i.next(r);
            },
            0,
            !0
          );
      }),
      () => P(n?.return) && n.return()
    );
  });
}
function na(t, e) {
  if (!t) throw new Error('Iterable cannot be null');
  return new Q((i) => {
    st(i, e, () => {
      let n = t[Symbol.asyncIterator]();
      st(
        i,
        e,
        () => {
          n.next().then((r) => {
            r.done ? i.complete() : i.next(r.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function Vp(t, e) {
  return na(Ks(t), e);
}
function jp(t, e) {
  if (t != null) {
    if (qs(t)) return Np(t, e);
    if (Ws(t)) return Pp(t, e);
    if (Gs(t)) return Op(t, e);
    if (Qs(t)) return na(t, e);
    if (Xs(t)) return Lp(t, e);
    if (Js(t)) return Vp(t, e);
  }
  throw Zs(t);
}
function ve(t, e) {
  return e ? jp(t, e) : we(t);
}
function M(...t) {
  let e = zt(t);
  return ve(t, e);
}
function Mn(t, e) {
  let i = P(t) ? t : () => t,
    n = (r) => r.error(i());
  return new Q(e ? (r) => e.schedule(n, 0, r) : n);
}
function ia(t) {
  return !!t && (t instanceof Q || (P(t.lift) && P(t.subscribe)));
}
var cn = Qi(
  (t) =>
    function () {
      t(this),
        (this.name = 'EmptyError'),
        (this.message = 'no elements in sequence');
    }
);
function A(t, e) {
  return H((i, n) => {
    let r = 0;
    i.subscribe(
      $(n, (o) => {
        n.next(t.call(e, o, r++));
      })
    );
  });
}
var { isArray: mC } = Array;
function pC(t, e) {
  return mC(e) ? t(...e) : t(e);
}
function ra(t) {
  return A((e) => pC(t, e));
}
var { isArray: gC } = Array,
  { getPrototypeOf: bC, prototype: vC, keys: _C } = Object;
function oa(t) {
  if (t.length === 1) {
    let e = t[0];
    if (gC(e)) return { args: e, keys: null };
    if (yC(e)) {
      let i = _C(e);
      return { args: i.map((n) => e[n]), keys: i };
    }
  }
  return { args: t, keys: null };
}
function yC(t) {
  return t && typeof t == 'object' && bC(t) === vC;
}
function sa(t, e) {
  return t.reduce((i, n, r) => ((i[n] = e[r]), i), {});
}
function pi(...t) {
  let e = zt(t),
    i = zs(t),
    { args: n, keys: r } = oa(t);
  if (n.length === 0) return ve([], e);
  let o = new Q(xC(n, e, r ? (s) => sa(r, s) : tt));
  return i ? o.pipe(ra(i)) : o;
}
function xC(t, e, i = tt) {
  return (n) => {
    Bp(
      e,
      () => {
        let { length: r } = t,
          o = new Array(r),
          s = r,
          a = r;
        for (let c = 0; c < r; c++)
          Bp(
            e,
            () => {
              let l = ve(t[c], e),
                d = !1;
              l.subscribe(
                $(
                  n,
                  (u) => {
                    (o[c] = u), d || ((d = !0), a--), a || n.next(i(o.slice()));
                  },
                  () => {
                    --s || n.complete();
                  }
                )
              );
            },
            n
          );
      },
      n
    );
  };
}
function Bp(t, e, i) {
  t ? st(i, t, e) : e();
}
function Up(t, e, i, n, r, o, s, a) {
  let c = [],
    l = 0,
    d = 0,
    u = !1,
    f = () => {
      u && !c.length && !l && e.complete();
    },
    h = (g) => (l < n ? m(g) : c.push(g)),
    m = (g) => {
      o && e.next(g), l++;
      let C = !1;
      we(i(g, d++)).subscribe(
        $(
          e,
          (E) => {
            r?.(E), o ? h(E) : e.next(E);
          },
          () => {
            C = !0;
          },
          void 0,
          () => {
            if (C)
              try {
                for (l--; c.length && l < n; ) {
                  let E = c.shift();
                  s ? st(e, s, () => m(E)) : m(E);
                }
                f();
              } catch (E) {
                e.error(E);
              }
          }
        )
      );
    };
  return (
    t.subscribe(
      $(e, h, () => {
        (u = !0), f();
      })
    ),
    () => {
      a?.();
    }
  );
}
function Oe(t, e, i = 1 / 0) {
  return P(e)
    ? Oe((n, r) => A((o, s) => e(n, o, r, s))(we(t(n, r))), i)
    : (typeof e == 'number' && (i = e), H((n, r) => Up(n, r, t, i)));
}
function Sn(t = 1 / 0) {
  return Oe(tt, t);
}
function Hp() {
  return Sn(1);
}
function Tn(...t) {
  return Hp()(ve(t, zt(t)));
}
function aa(t) {
  return new Q((e) => {
    we(t()).subscribe(e);
  });
}
function Qr(...t) {
  let e = zs(t),
    { args: i, keys: n } = oa(t),
    r = new Q((o) => {
      let { length: s } = i;
      if (!s) {
        o.complete();
        return;
      }
      let a = new Array(s),
        c = s,
        l = s;
      for (let d = 0; d < s; d++) {
        let u = !1;
        we(i[d]).subscribe(
          $(
            o,
            (f) => {
              u || ((u = !0), l--), (a[d] = f);
            },
            () => c--,
            void 0,
            () => {
              (!c || !u) && (l || o.next(n ? sa(n, a) : a), o.complete());
            }
          )
        );
      }
    });
  return e ? r.pipe(ra(e)) : r;
}
function ud(...t) {
  let e = zt(t),
    i = Sp(t, 1 / 0),
    n = t;
  return n.length ? (n.length === 1 ? we(n[0]) : Sn(i)(ve(n, e))) : Ye;
}
function je(t, e) {
  return H((i, n) => {
    let r = 0;
    i.subscribe($(n, (o) => t.call(e, o, r++) && n.next(o)));
  });
}
function Wt(t) {
  return H((e, i) => {
    let n = null,
      r = !1,
      o;
    (n = e.subscribe(
      $(i, void 0, void 0, (s) => {
        (o = we(t(s, Wt(t)(e)))),
          n ? (n.unsubscribe(), (n = null), o.subscribe(i)) : (r = !0);
      })
    )),
      r && (n.unsubscribe(), (n = null), o.subscribe(i));
  });
}
function $p(t, e, i, n, r) {
  return (o, s) => {
    let a = i,
      c = e,
      l = 0;
    o.subscribe(
      $(
        s,
        (d) => {
          let u = l++;
          (c = a ? t(c, d, u) : ((a = !0), d)), n && s.next(c);
        },
        r &&
          (() => {
            a && s.next(c), s.complete();
          })
      )
    );
  };
}
function ln(t, e) {
  return P(e) ? Oe(t, e, 1) : Oe(t, 1);
}
function ca(t, e = Ip) {
  return H((i, n) => {
    let r = null,
      o = null,
      s = null,
      a = () => {
        if (r) {
          r.unsubscribe(), (r = null);
          let l = o;
          (o = null), n.next(l);
        }
      };
    function c() {
      let l = s + t,
        d = e.now();
      if (d < l) {
        (r = this.schedule(void 0, l - d)), n.add(r);
        return;
      }
      a();
    }
    i.subscribe(
      $(
        n,
        (l) => {
          (o = l), (s = e.now()), r || ((r = e.schedule(c, t)), n.add(r));
        },
        () => {
          a(), n.complete();
        },
        void 0,
        () => {
          o = r = null;
        }
      )
    );
  });
}
function kn(t) {
  return H((e, i) => {
    let n = !1;
    e.subscribe(
      $(
        i,
        (r) => {
          (n = !0), i.next(r);
        },
        () => {
          n || i.next(t), i.complete();
        }
      )
    );
  });
}
function at(t) {
  return t <= 0
    ? () => Ye
    : H((e, i) => {
        let n = 0;
        e.subscribe(
          $(i, (r) => {
            ++n <= t && (i.next(r), t <= n && i.complete());
          })
        );
      });
}
function fd(t) {
  return A(() => t);
}
function hd(t, e = tt) {
  return (
    (t = t ?? wC),
    H((i, n) => {
      let r,
        o = !0;
      i.subscribe(
        $(n, (s) => {
          let a = e(s);
          (o || !t(r, a)) && ((o = !1), (r = a), n.next(s));
        })
      );
    })
  );
}
function wC(t, e) {
  return t === e;
}
function la(t = EC) {
  return H((e, i) => {
    let n = !1;
    e.subscribe(
      $(
        i,
        (r) => {
          (n = !0), i.next(r);
        },
        () => (n ? i.complete() : i.error(t()))
      )
    );
  });
}
function EC() {
  return new cn();
}
function An(t) {
  return H((e, i) => {
    try {
      e.subscribe(i);
    } finally {
      i.add(t);
    }
  });
}
function Nt(t, e) {
  let i = arguments.length >= 2;
  return (n) =>
    n.pipe(
      t ? je((r, o) => t(r, o, n)) : tt,
      at(1),
      i ? kn(e) : la(() => new cn())
    );
}
function er(t) {
  return t <= 0
    ? () => Ye
    : H((e, i) => {
        let n = [];
        e.subscribe(
          $(
            i,
            (r) => {
              n.push(r), t < n.length && n.shift();
            },
            () => {
              for (let r of n) i.next(r);
              i.complete();
            },
            void 0,
            () => {
              n = null;
            }
          )
        );
      });
}
function md(t, e) {
  let i = arguments.length >= 2;
  return (n) =>
    n.pipe(
      t ? je((r, o) => t(r, o, n)) : tt,
      er(1),
      i ? kn(e) : la(() => new cn())
    );
}
function pd(t, e) {
  return H($p(t, e, arguments.length >= 2, !0));
}
function Zr(t = {}) {
  let {
    connector: e = () => new Z(),
    resetOnError: i = !0,
    resetOnComplete: n = !0,
    resetOnRefCountZero: r = !0,
  } = t;
  return (o) => {
    let s,
      a,
      c,
      l = 0,
      d = !1,
      u = !1,
      f = () => {
        a?.unsubscribe(), (a = void 0);
      },
      h = () => {
        f(), (s = c = void 0), (d = u = !1);
      },
      m = () => {
        let g = s;
        h(), g?.unsubscribe();
      };
    return H((g, C) => {
      l++, !u && !d && f();
      let E = (c = c ?? e());
      C.add(() => {
        l--, l === 0 && !u && !d && (a = gd(m, r));
      }),
        E.subscribe(C),
        !s &&
          l > 0 &&
          ((s = new an({
            next: (N) => E.next(N),
            error: (N) => {
              (u = !0), f(), (a = gd(h, i, N)), E.error(N);
            },
            complete: () => {
              (d = !0), f(), (a = gd(h, n)), E.complete();
            },
          })),
          we(g).subscribe(s));
    })(o);
  };
}
function gd(t, e, ...i) {
  if (e === !0) {
    t();
    return;
  }
  if (e === !1) return;
  let n = new an({
    next: () => {
      n.unsubscribe(), t();
    },
  });
  return we(e(...i)).subscribe(n);
}
function bd(t, e, i) {
  let n,
    r = !1;
  return (
    t && typeof t == 'object'
      ? ({
          bufferSize: n = 1 / 0,
          windowTime: e = 1 / 0,
          refCount: r = !1,
          scheduler: i,
        } = t)
      : (n = t ?? 1 / 0),
    Zr({
      connector: () => new Bs(n, e, i),
      resetOnError: !0,
      resetOnComplete: !1,
      resetOnRefCountZero: r,
    })
  );
}
function Yr(t) {
  return je((e, i) => t <= i);
}
function Xr(...t) {
  let e = zt(t);
  return H((i, n) => {
    (e ? Tn(t, i, e) : Tn(t, i)).subscribe(n);
  });
}
function bt(t, e) {
  return H((i, n) => {
    let r = null,
      o = 0,
      s = !1,
      a = () => s && !r && n.complete();
    i.subscribe(
      $(
        n,
        (c) => {
          r?.unsubscribe();
          let l = 0,
            d = o++;
          we(t(c, d)).subscribe(
            (r = $(
              n,
              (u) => n.next(e ? e(c, u, d, l++) : u),
              () => {
                (r = null), a();
              }
            ))
          );
        },
        () => {
          (s = !0), a();
        }
      )
    );
  });
}
function vt(t) {
  return H((e, i) => {
    we(t).subscribe($(i, () => i.complete(), Wr)), !i.closed && e.subscribe(i);
  });
}
function Ee(t, e, i) {
  let n = P(t) || e || i ? { next: t, error: e, complete: i } : t;
  return n
    ? H((r, o) => {
        var s;
        (s = n.subscribe) === null || s === void 0 || s.call(n);
        let a = !0;
        r.subscribe(
          $(
            o,
            (c) => {
              var l;
              (l = n.next) === null || l === void 0 || l.call(n, c), o.next(c);
            },
            () => {
              var c;
              (a = !1),
                (c = n.complete) === null || c === void 0 || c.call(n),
                o.complete();
            },
            (c) => {
              var l;
              (a = !1),
                (l = n.error) === null || l === void 0 || l.call(n, c),
                o.error(c);
            },
            () => {
              var c, l;
              a && ((c = n.unsubscribe) === null || c === void 0 || c.call(n)),
                (l = n.finalize) === null || l === void 0 || l.call(n);
            }
          )
        );
      })
    : tt;
}
function me(t) {
  for (let e in t) if (t[e] === me) return e;
  throw Error('Could not find renamed property on target object.');
}
function da(t, e) {
  for (let i in e) e.hasOwnProperty(i) && !t.hasOwnProperty(i) && (t[i] = e[i]);
}
function rt(t) {
  if (typeof t == 'string') return t;
  if (Array.isArray(t)) return '[' + t.map(rt).join(', ') + ']';
  if (t == null) return '' + t;
  if (t.overriddenName) return `${t.overriddenName}`;
  if (t.name) return `${t.name}`;
  let e = t.toString();
  if (e == null) return '' + e;
  let i = e.indexOf(`
`);
  return i === -1 ? e : e.substring(0, i);
}
function Pd(t, e) {
  return t == null || t === ''
    ? e === null
      ? ''
      : e
    : e == null || e === ''
    ? t
    : t + ' ' + e;
}
var CC = me({ __forward_ref__: me });
function ut(t) {
  return (
    (t.__forward_ref__ = ut),
    (t.toString = function () {
      return rt(this());
    }),
    t
  );
}
function nt(t) {
  return Mg(t) ? t() : t;
}
function Mg(t) {
  return (
    typeof t == 'function' && t.hasOwnProperty(CC) && t.__forward_ref__ === ut
  );
}
function Sg(t) {
  return t && !!t.ɵproviders;
}
var Tg = 'https://g.co/ng/security#xss',
  _ = class extends Error {
    constructor(e, i) {
      super(Ga(e, i)), (this.code = e);
    }
  };
function Ga(t, e) {
  return `${`NG0${Math.abs(t)}`}${e ? ': ' + e : ''}`;
}
var DC = me({ ɵcmp: me }),
  IC = me({ ɵdir: me }),
  MC = me({ ɵpipe: me }),
  SC = me({ ɵmod: me }),
  Ca = me({ ɵfac: me }),
  Jr = me({ __NG_ELEMENT_ID__: me }),
  zp = me({ __NG_ENV_ID__: me });
function qa(t) {
  return typeof t == 'string' ? t : t == null ? '' : String(t);
}
function TC(t) {
  return typeof t == 'function'
    ? t.name || t.toString()
    : typeof t == 'object' && t != null && typeof t.type == 'function'
    ? t.type.name || t.type.toString()
    : qa(t);
}
function kC(t, e) {
  let i = e ? `. Dependency path: ${e.join(' > ')} > ${t}` : '';
  throw new _(-200, `Circular dependency in DI detected for ${t}${i}`);
}
function Hu(t, e) {
  let i = e ? ` in ${e}` : '';
  throw new _(-201, !1);
}
function AC(t, e) {
  t == null && RC(e, t, null, '!=');
}
function RC(t, e, i, n) {
  throw new Error(
    `ASSERTION ERROR: ${t}` +
      (n == null ? '' : ` [Expected=> ${i} ${n} ${e} <=Actual]`)
  );
}
function y(t) {
  return {
    token: t.token,
    providedIn: t.providedIn || null,
    factory: t.factory,
    value: void 0,
  };
}
function L(t) {
  return { providers: t.providers || [], imports: t.imports || [] };
}
function Qa(t) {
  return Wp(t, Ag) || Wp(t, Rg);
}
function kg(t) {
  return Qa(t) !== null;
}
function Wp(t, e) {
  return t.hasOwnProperty(e) ? t[e] : null;
}
function FC(t) {
  let e = t && (t[Ag] || t[Rg]);
  return e || null;
}
function Gp(t) {
  return t && (t.hasOwnProperty(qp) || t.hasOwnProperty(NC)) ? t[qp] : null;
}
var Ag = me({ ɵprov: me }),
  qp = me({ ɵinj: me }),
  Rg = me({ ngInjectableDef: me }),
  NC = me({ ngInjectorDef: me }),
  G = (function (t) {
    return (
      (t[(t.Default = 0)] = 'Default'),
      (t[(t.Host = 1)] = 'Host'),
      (t[(t.Self = 2)] = 'Self'),
      (t[(t.SkipSelf = 4)] = 'SkipSelf'),
      (t[(t.Optional = 8)] = 'Optional'),
      t
    );
  })(G || {}),
  Ld;
function Fg() {
  return Ld;
}
function It(t) {
  let e = Ld;
  return (Ld = t), e;
}
function Ng(t, e, i) {
  let n = Qa(t);
  if (n && n.providedIn == 'root')
    return n.value === void 0 ? (n.value = n.factory()) : n.value;
  if (i & G.Optional) return null;
  if (e !== void 0) return e;
  Hu(rt(t), 'Injector');
}
var gi = globalThis;
var w = class {
  constructor(e, i) {
    (this._desc = e),
      (this.ngMetadataName = 'InjectionToken'),
      (this.ɵprov = void 0),
      typeof i == 'number'
        ? (this.__NG_ELEMENT_ID__ = i)
        : i !== void 0 &&
          (this.ɵprov = y({
            token: this,
            providedIn: i.providedIn || 'root',
            factory: i.factory,
          }));
  }
  get multi() {
    return this;
  }
  toString() {
    return `InjectionToken ${this._desc}`;
  }
};
var OC = {},
  eo = OC,
  Vd = '__NG_DI_FLAG__',
  Da = 'ngTempTokenPath',
  PC = 'ngTokenPath',
  LC = /\n/gm,
  VC = '\u0275',
  Qp = '__source',
  or;
function jC() {
  return or;
}
function Rn(t) {
  let e = or;
  return (or = t), e;
}
function BC(t, e = G.Default) {
  if (or === void 0) throw new _(-203, !1);
  return or === null
    ? Ng(t, void 0, e)
    : or.get(t, e & G.Optional ? null : void 0, e);
}
function v(t, e = G.Default) {
  return (Fg() || BC)(nt(t), e);
}
function b(t, e = G.Default) {
  return v(t, Za(e));
}
function Za(t) {
  return typeof t > 'u' || typeof t == 'number'
    ? t
    : 0 | (t.optional && 8) | (t.host && 1) | (t.self && 2) | (t.skipSelf && 4);
}
function jd(t) {
  let e = [];
  for (let i = 0; i < t.length; i++) {
    let n = nt(t[i]);
    if (Array.isArray(n)) {
      if (n.length === 0) throw new _(900, !1);
      let r,
        o = G.Default;
      for (let s = 0; s < n.length; s++) {
        let a = n[s],
          c = UC(a);
        typeof c == 'number' ? (c === -1 ? (r = a.token) : (o |= c)) : (r = a);
      }
      e.push(v(r, o));
    } else e.push(v(n));
  }
  return e;
}
function Og(t, e) {
  return (t[Vd] = e), (t.prototype[Vd] = e), t;
}
function UC(t) {
  return t[Vd];
}
function HC(t, e, i, n) {
  let r = t[Da];
  throw (
    (e[Qp] && r.unshift(e[Qp]),
    (t.message = $C(
      `
` + t.message,
      r,
      i,
      n
    )),
    (t[PC] = r),
    (t[Da] = null),
    t)
  );
}
function $C(t, e, i, n = null) {
  t =
    t &&
    t.charAt(0) ===
      `
` &&
    t.charAt(1) == VC
      ? t.slice(2)
      : t;
  let r = rt(e);
  if (Array.isArray(e)) r = e.map(rt).join(' -> ');
  else if (typeof e == 'object') {
    let o = [];
    for (let s in e)
      if (e.hasOwnProperty(s)) {
        let a = e[s];
        o.push(s + ':' + (typeof a == 'string' ? JSON.stringify(a) : rt(a)));
      }
    r = `{${o.join(', ')}}`;
  }
  return `${i}${n ? '(' + n + ')' : ''}[${r}]: ${t.replace(
    LC,
    `
  `
  )}`;
}
function mo(t) {
  return { toString: t }.toString();
}
var Pg = (function (t) {
    return (t[(t.OnPush = 0)] = 'OnPush'), (t[(t.Default = 1)] = 'Default'), t;
  })(Pg || {}),
  Yt = (function (t) {
    return (
      (t[(t.Emulated = 0)] = 'Emulated'),
      (t[(t.None = 2)] = 'None'),
      (t[(t.ShadowDom = 3)] = 'ShadowDom'),
      t
    );
  })(Yt || {}),
  ar = {},
  it = [];
function Lg(t, e, i) {
  let n = t.length;
  for (;;) {
    let r = t.indexOf(e, i);
    if (r === -1) return r;
    if (r === 0 || t.charCodeAt(r - 1) <= 32) {
      let o = e.length;
      if (r + o === n || t.charCodeAt(r + o) <= 32) return r;
    }
    i = r + 1;
  }
}
function Bd(t, e, i) {
  let n = 0;
  for (; n < i.length; ) {
    let r = i[n];
    if (typeof r == 'number') {
      if (r !== 0) break;
      n++;
      let o = i[n++],
        s = i[n++],
        a = i[n++];
      t.setAttribute(e, s, a, o);
    } else {
      let o = r,
        s = i[++n];
      zC(o) ? t.setProperty(e, o, s) : t.setAttribute(e, o, s), n++;
    }
  }
  return n;
}
function Vg(t) {
  return t === 3 || t === 4 || t === 6;
}
function zC(t) {
  return t.charCodeAt(0) === 64;
}
function to(t, e) {
  if (!(e === null || e.length === 0))
    if (t === null || t.length === 0) t = e.slice();
    else {
      let i = -1;
      for (let n = 0; n < e.length; n++) {
        let r = e[n];
        typeof r == 'number'
          ? (i = r)
          : i === 0 ||
            (i === -1 || i === 2
              ? Zp(t, i, r, null, e[++n])
              : Zp(t, i, r, null, null));
      }
    }
  return t;
}
function Zp(t, e, i, n, r) {
  let o = 0,
    s = t.length;
  if (e === -1) s = -1;
  else
    for (; o < t.length; ) {
      let a = t[o++];
      if (typeof a == 'number') {
        if (a === e) {
          s = -1;
          break;
        } else if (a > e) {
          s = o - 1;
          break;
        }
      }
    }
  for (; o < t.length; ) {
    let a = t[o];
    if (typeof a == 'number') break;
    if (a === i) {
      if (n === null) {
        r !== null && (t[o + 1] = r);
        return;
      } else if (n === t[o + 1]) {
        t[o + 2] = r;
        return;
      }
    }
    o++, n !== null && o++, r !== null && o++;
  }
  s !== -1 && (t.splice(s, 0, e), (o = s + 1)),
    t.splice(o++, 0, i),
    n !== null && t.splice(o++, 0, n),
    r !== null && t.splice(o++, 0, r);
}
var jg = 'ng-template';
function WC(t, e, i) {
  let n = 0,
    r = !0;
  for (; n < t.length; ) {
    let o = t[n++];
    if (typeof o == 'string' && r) {
      let s = t[n++];
      if (i && o === 'class' && Lg(s.toLowerCase(), e, 0) !== -1) return !0;
    } else if (o === 1) {
      for (; n < t.length && typeof (o = t[n++]) == 'string'; )
        if (o.toLowerCase() === e) return !0;
      return !1;
    } else typeof o == 'number' && (r = !1);
  }
  return !1;
}
function Bg(t) {
  return t.type === 4 && t.value !== jg;
}
function GC(t, e, i) {
  let n = t.type === 4 && !i ? jg : t.value;
  return e === n;
}
function qC(t, e, i) {
  let n = 4,
    r = t.attrs || [],
    o = YC(r),
    s = !1;
  for (let a = 0; a < e.length; a++) {
    let c = e[a];
    if (typeof c == 'number') {
      if (!s && !Ot(n) && !Ot(c)) return !1;
      if (s && Ot(c)) continue;
      (s = !1), (n = c | (n & 1));
      continue;
    }
    if (!s)
      if (n & 4) {
        if (
          ((n = 2 | (n & 1)),
          (c !== '' && !GC(t, c, i)) || (c === '' && e.length === 1))
        ) {
          if (Ot(n)) return !1;
          s = !0;
        }
      } else {
        let l = n & 8 ? c : e[++a];
        if (n & 8 && t.attrs !== null) {
          if (!WC(t.attrs, l, i)) {
            if (Ot(n)) return !1;
            s = !0;
          }
          continue;
        }
        let d = n & 8 ? 'class' : c,
          u = QC(d, r, Bg(t), i);
        if (u === -1) {
          if (Ot(n)) return !1;
          s = !0;
          continue;
        }
        if (l !== '') {
          let f;
          u > o ? (f = '') : (f = r[u + 1].toLowerCase());
          let h = n & 8 ? f : null;
          if ((h && Lg(h, l, 0) !== -1) || (n & 2 && l !== f)) {
            if (Ot(n)) return !1;
            s = !0;
          }
        }
      }
  }
  return Ot(n) || s;
}
function Ot(t) {
  return (t & 1) === 0;
}
function QC(t, e, i, n) {
  if (e === null) return -1;
  let r = 0;
  if (n || !i) {
    let o = !1;
    for (; r < e.length; ) {
      let s = e[r];
      if (s === t) return r;
      if (s === 3 || s === 6) o = !0;
      else if (s === 1 || s === 2) {
        let a = e[++r];
        for (; typeof a == 'string'; ) a = e[++r];
        continue;
      } else {
        if (s === 4) break;
        if (s === 0) {
          r += 4;
          continue;
        }
      }
      r += o ? 1 : 2;
    }
    return -1;
  } else return XC(e, t);
}
function Ug(t, e, i = !1) {
  for (let n = 0; n < e.length; n++) if (qC(t, e[n], i)) return !0;
  return !1;
}
function ZC(t) {
  let e = t.attrs;
  if (e != null) {
    let i = e.indexOf(5);
    if (!(i & 1)) return e[i + 1];
  }
  return null;
}
function YC(t) {
  for (let e = 0; e < t.length; e++) {
    let i = t[e];
    if (Vg(i)) return e;
  }
  return t.length;
}
function XC(t, e) {
  let i = t.indexOf(4);
  if (i > -1)
    for (i++; i < t.length; ) {
      let n = t[i];
      if (typeof n == 'number') return -1;
      if (n === e) return i;
      i++;
    }
  return -1;
}
function KC(t, e) {
  e: for (let i = 0; i < e.length; i++) {
    let n = e[i];
    if (t.length === n.length) {
      for (let r = 0; r < t.length; r++) if (t[r] !== n[r]) continue e;
      return !0;
    }
  }
  return !1;
}
function Yp(t, e) {
  return t ? ':not(' + e.trim() + ')' : e;
}
function JC(t) {
  let e = t[0],
    i = 1,
    n = 2,
    r = '',
    o = !1;
  for (; i < t.length; ) {
    let s = t[i];
    if (typeof s == 'string')
      if (n & 2) {
        let a = t[++i];
        r += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']';
      } else n & 8 ? (r += '.' + s) : n & 4 && (r += ' ' + s);
    else
      r !== '' && !Ot(s) && ((e += Yp(o, r)), (r = '')),
        (n = s),
        (o = o || !Ot(n));
    i++;
  }
  return r !== '' && (e += Yp(o, r)), e;
}
function eD(t) {
  return t.map(JC).join(',');
}
function tD(t) {
  let e = [],
    i = [],
    n = 1,
    r = 2;
  for (; n < t.length; ) {
    let o = t[n];
    if (typeof o == 'string')
      r === 2 ? o !== '' && e.push(o, t[++n]) : r === 8 && i.push(o);
    else {
      if (!Ot(r)) break;
      r = o;
    }
    n++;
  }
  return { attrs: e, classes: i };
}
function De(t) {
  return mo(() => {
    let e = Gg(t),
      i = he(x({}, e), {
        decls: t.decls,
        vars: t.vars,
        template: t.template,
        consts: t.consts || null,
        ngContentSelectors: t.ngContentSelectors,
        onPush: t.changeDetection === Pg.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (e.standalone && t.dependencies) || null,
        getStandaloneInjector: null,
        signals: t.signals ?? !1,
        data: t.data || {},
        encapsulation: t.encapsulation || Yt.Emulated,
        styles: t.styles || it,
        _: null,
        schemas: t.schemas || null,
        tView: null,
        id: '',
      });
    qg(i);
    let n = t.dependencies;
    return (
      (i.directiveDefs = Kp(n, !1)), (i.pipeDefs = Kp(n, !0)), (i.id = rD(i)), i
    );
  });
}
function nD(t) {
  return Nn(t) || Hg(t);
}
function iD(t) {
  return t !== null;
}
function V(t) {
  return mo(() => ({
    type: t.type,
    bootstrap: t.bootstrap || it,
    declarations: t.declarations || it,
    imports: t.imports || it,
    exports: t.exports || it,
    transitiveCompileScopes: null,
    schemas: t.schemas || null,
    id: t.id || null,
  }));
}
function Xp(t, e) {
  if (t == null) return ar;
  let i = {};
  for (let n in t)
    if (t.hasOwnProperty(n)) {
      let r = t[n],
        o = r;
      Array.isArray(r) && ((o = r[1]), (r = r[0])), (i[r] = n), e && (e[r] = o);
    }
  return i;
}
function q(t) {
  return mo(() => {
    let e = Gg(t);
    return qg(e), e;
  });
}
function Nn(t) {
  return t[DC] || null;
}
function Hg(t) {
  return t[IC] || null;
}
function $g(t) {
  return t[MC] || null;
}
function zg(t) {
  let e = Nn(t) || Hg(t) || $g(t);
  return e !== null ? e.standalone : !1;
}
function Wg(t, e) {
  let i = t[SC] || null;
  if (!i && e === !0)
    throw new Error(`Type ${rt(t)} does not have '\u0275mod' property.`);
  return i;
}
function Gg(t) {
  let e = {};
  return {
    type: t.type,
    providersResolver: null,
    factory: null,
    hostBindings: t.hostBindings || null,
    hostVars: t.hostVars || 0,
    hostAttrs: t.hostAttrs || null,
    contentQueries: t.contentQueries || null,
    declaredInputs: e,
    inputTransforms: null,
    inputConfig: t.inputs || ar,
    exportAs: t.exportAs || null,
    standalone: t.standalone === !0,
    signals: t.signals === !0,
    selectors: t.selectors || it,
    viewQuery: t.viewQuery || null,
    features: t.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: Xp(t.inputs, e),
    outputs: Xp(t.outputs),
    debugInfo: null,
  };
}
function qg(t) {
  t.features?.forEach((e) => e(t));
}
function Kp(t, e) {
  if (!t) return null;
  let i = e ? $g : nD;
  return () => (typeof t == 'function' ? t() : t).map((n) => i(n)).filter(iD);
}
function rD(t) {
  let e = 0,
    i = [
      t.selectors,
      t.ngContentSelectors,
      t.hostVars,
      t.hostAttrs,
      t.consts,
      t.vars,
      t.decls,
      t.encapsulation,
      t.standalone,
      t.signals,
      t.exportAs,
      JSON.stringify(t.inputs),
      JSON.stringify(t.outputs),
      Object.getOwnPropertyNames(t.type.prototype),
      !!t.contentQueries,
      !!t.viewQuery,
    ].join('|');
  for (let r of i) e = (Math.imul(31, e) + r.charCodeAt(0)) << 0;
  return (e += 2147483647 + 1), 'c' + e;
}
var _t = 0,
  O = 1,
  F = 2,
  Fe = 3,
  Lt = 4,
  yt = 5,
  Vt = 6,
  no = 7,
  Xe = 8,
  cr = 9,
  dn = 10,
  Ce = 11,
  io = 12,
  Jp = 13,
  pr = 14,
  ct = 15,
  po = 16,
  tr = 17,
  Qt = 18,
  Ya = 19,
  Qg = 20,
  Fn = 21,
  vd = 22,
  vi = 23,
  He = 25,
  Zg = 1,
  ro = 6,
  un = 7,
  Ia = 8,
  lr = 9,
  qe = 10,
  dr = (function (t) {
    return (
      (t[(t.None = 0)] = 'None'),
      (t[(t.HasTransplantedViews = 2)] = 'HasTransplantedViews'),
      (t[(t.HasChildViewsToRefresh = 4)] = 'HasChildViewsToRefresh'),
      t
    );
  })(dr || {});
function Zt(t) {
  return Array.isArray(t) && typeof t[Zg] == 'object';
}
function Mt(t) {
  return Array.isArray(t) && t[Zg] === !0;
}
function Yg(t) {
  return (t.flags & 4) !== 0;
}
function go(t) {
  return t.componentOffset > -1;
}
function $u(t) {
  return (t.flags & 1) === 1;
}
function On(t) {
  return !!t.template;
}
function Xg(t) {
  return (t[F] & 512) !== 0;
}
function ur(t, e) {
  let i = t.hasOwnProperty(Ca);
  return i ? t[Ca] : null;
}
var Ud = class {
  constructor(e, i, n) {
    (this.previousValue = e), (this.currentValue = i), (this.firstChange = n);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function ft() {
  return Kg;
}
function Kg(t) {
  return t.type.prototype.ngOnChanges && (t.setInput = sD), oD;
}
ft.ngInherit = !0;
function oD() {
  let t = eb(this),
    e = t?.current;
  if (e) {
    let i = t.previous;
    if (i === ar) t.previous = e;
    else for (let n in e) i[n] = e[n];
    (t.current = null), this.ngOnChanges(e);
  }
}
function sD(t, e, i, n) {
  let r = this.declaredInputs[i],
    o = eb(t) || aD(t, { previous: ar, current: null }),
    s = o.current || (o.current = {}),
    a = o.previous,
    c = a[r];
  (s[r] = new Ud(c && c.currentValue, e, a === ar)), (t[n] = e);
}
var Jg = '__ngSimpleChanges__';
function eb(t) {
  return t[Jg] || null;
}
function aD(t, e) {
  return (t[Jg] = e);
}
var eg = null;
var Gt = function (t, e, i) {
    eg?.(t, e, i);
  },
  tb = 'svg',
  cD = 'math',
  lD = !1;
function dD() {
  return lD;
}
function jt(t) {
  for (; Array.isArray(t); ) t = t[_t];
  return t;
}
function nb(t, e) {
  return jt(e[t]);
}
function xt(t, e) {
  return jt(e[t.index]);
}
function zu(t, e) {
  return t.data[e];
}
function uD(t, e) {
  return t[e];
}
function Ln(t, e) {
  let i = e[t];
  return Zt(i) ? i : i[_t];
}
function fD(t) {
  return (t[F] & 4) === 4;
}
function Wu(t) {
  return (t[F] & 128) === 128;
}
function hD(t) {
  return Mt(t[Fe]);
}
function Ma(t, e) {
  return e == null ? null : t[e];
}
function ib(t) {
  t[tr] = 0;
}
function mD(t) {
  t[F] & 1024 || ((t[F] |= 1024), Wu(t) && oo(t));
}
function pD(t, e) {
  for (; t > 0; ) (e = e[pr]), t--;
  return e;
}
function rb(t) {
  return t[F] & 9216 || t[vi]?.dirty;
}
function Hd(t) {
  rb(t)
    ? oo(t)
    : t[F] & 64 &&
      (dD()
        ? ((t[F] |= 1024), oo(t))
        : t[dn].changeDetectionScheduler?.notify());
}
function oo(t) {
  t[dn].changeDetectionScheduler?.notify();
  let e = t[Fe];
  for (
    ;
    e !== null &&
    !((Mt(e) && e[F] & dr.HasChildViewsToRefresh) || (Zt(e) && e[F] & 8192));

  ) {
    if (Mt(e)) e[F] |= dr.HasChildViewsToRefresh;
    else if (((e[F] |= 8192), !Wu(e))) break;
    e = e[Fe];
  }
}
function ob(t, e) {
  if ((t[F] & 256) === 256) throw new _(911, !1);
  t[Fn] === null && (t[Fn] = []), t[Fn].push(e);
}
function gD(t, e) {
  if (t[Fn] === null) return;
  let i = t[Fn].indexOf(e);
  i !== -1 && t[Fn].splice(i, 1);
}
var B = { lFrame: mb(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
function bD() {
  return B.lFrame.elementDepthCount;
}
function vD() {
  B.lFrame.elementDepthCount++;
}
function _D() {
  B.lFrame.elementDepthCount--;
}
function sb() {
  return B.bindingsEnabled;
}
function gr() {
  return B.skipHydrationRootTNode !== null;
}
function yD(t) {
  return B.skipHydrationRootTNode === t;
}
function xD(t) {
  B.skipHydrationRootTNode = t;
}
function wD() {
  B.skipHydrationRootTNode = null;
}
function K() {
  return B.lFrame.lView;
}
function Qe() {
  return B.lFrame.tView;
}
function Gu(t) {
  return (B.lFrame.contextLView = t), t[Xe];
}
function qu(t) {
  return (B.lFrame.contextLView = null), t;
}
function ht() {
  let t = ab();
  for (; t !== null && t.type === 64; ) t = t.parent;
  return t;
}
function ab() {
  return B.lFrame.currentTNode;
}
function ED() {
  let t = B.lFrame,
    e = t.currentTNode;
  return t.isParent ? e : e.parent;
}
function bo(t, e) {
  let i = B.lFrame;
  (i.currentTNode = t), (i.isParent = e);
}
function cb() {
  return B.lFrame.isParent;
}
function lb() {
  B.lFrame.isParent = !1;
}
function CD() {
  return B.lFrame.contextLView;
}
function DD(t) {
  return (B.lFrame.bindingIndex = t);
}
function br() {
  return B.lFrame.bindingIndex++;
}
function db(t) {
  let e = B.lFrame,
    i = e.bindingIndex;
  return (e.bindingIndex = e.bindingIndex + t), i;
}
function ID() {
  return B.lFrame.inI18n;
}
function MD(t, e) {
  let i = B.lFrame;
  (i.bindingIndex = i.bindingRootIndex = t), $d(e);
}
function SD() {
  return B.lFrame.currentDirectiveIndex;
}
function $d(t) {
  B.lFrame.currentDirectiveIndex = t;
}
function TD(t) {
  let e = B.lFrame.currentDirectiveIndex;
  return e === -1 ? null : t[e];
}
function ub() {
  return B.lFrame.currentQueryIndex;
}
function Qu(t) {
  B.lFrame.currentQueryIndex = t;
}
function kD(t) {
  let e = t[O];
  return e.type === 2 ? e.declTNode : e.type === 1 ? t[yt] : null;
}
function fb(t, e, i) {
  if (i & G.SkipSelf) {
    let r = e,
      o = t;
    for (; (r = r.parent), r === null && !(i & G.Host); )
      if (((r = kD(o)), r === null || ((o = o[pr]), r.type & 10))) break;
    if (r === null) return !1;
    (e = r), (t = o);
  }
  let n = (B.lFrame = hb());
  return (n.currentTNode = e), (n.lView = t), !0;
}
function Zu(t) {
  let e = hb(),
    i = t[O];
  (B.lFrame = e),
    (e.currentTNode = i.firstChild),
    (e.lView = t),
    (e.tView = i),
    (e.contextLView = t),
    (e.bindingIndex = i.bindingStartIndex),
    (e.inI18n = !1);
}
function hb() {
  let t = B.lFrame,
    e = t === null ? null : t.child;
  return e === null ? mb(t) : e;
}
function mb(t) {
  let e = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: t,
    child: null,
    inI18n: !1,
  };
  return t !== null && (t.child = e), e;
}
function pb() {
  let t = B.lFrame;
  return (B.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t;
}
var gb = pb;
function Yu() {
  let t = pb();
  (t.isParent = !0),
    (t.tView = null),
    (t.selectedIndex = -1),
    (t.contextLView = null),
    (t.elementDepthCount = 0),
    (t.currentDirectiveIndex = -1),
    (t.currentNamespace = null),
    (t.bindingRootIndex = -1),
    (t.bindingIndex = -1),
    (t.currentQueryIndex = 0);
}
function AD(t) {
  return (B.lFrame.contextLView = pD(t, B.lFrame.contextLView))[Xe];
}
function Vn() {
  return B.lFrame.selectedIndex;
}
function _i(t) {
  B.lFrame.selectedIndex = t;
}
function Xu() {
  let t = B.lFrame;
  return zu(t.tView, t.selectedIndex);
}
function bb() {
  B.lFrame.currentNamespace = tb;
}
function vb() {
  RD();
}
function RD() {
  B.lFrame.currentNamespace = null;
}
function _b() {
  return B.lFrame.currentNamespace;
}
var yb = !0;
function Ku() {
  return yb;
}
function jn(t) {
  yb = t;
}
function FD(t, e, i) {
  let { ngOnChanges: n, ngOnInit: r, ngDoCheck: o } = e.type.prototype;
  if (n) {
    let s = Kg(e);
    (i.preOrderHooks ??= []).push(t, s),
      (i.preOrderCheckHooks ??= []).push(t, s);
  }
  r && (i.preOrderHooks ??= []).push(0 - t, r),
    o &&
      ((i.preOrderHooks ??= []).push(t, o),
      (i.preOrderCheckHooks ??= []).push(t, o));
}
function Ju(t, e) {
  for (let i = e.directiveStart, n = e.directiveEnd; i < n; i++) {
    let o = t.data[i].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: c,
        ngAfterViewChecked: l,
        ngOnDestroy: d,
      } = o;
    s && (t.contentHooks ??= []).push(-i, s),
      a &&
        ((t.contentHooks ??= []).push(i, a),
        (t.contentCheckHooks ??= []).push(i, a)),
      c && (t.viewHooks ??= []).push(-i, c),
      l &&
        ((t.viewHooks ??= []).push(i, l), (t.viewCheckHooks ??= []).push(i, l)),
      d != null && (t.destroyHooks ??= []).push(i, d);
  }
}
function va(t, e, i) {
  xb(t, e, 3, i);
}
function _a(t, e, i, n) {
  (t[F] & 3) === i && xb(t, e, i, n);
}
function _d(t, e) {
  let i = t[F];
  (i & 3) === e && ((i &= 16383), (i += 1), (t[F] = i));
}
function xb(t, e, i, n) {
  let r = n !== void 0 ? t[tr] & 65535 : 0,
    o = n ?? -1,
    s = e.length - 1,
    a = 0;
  for (let c = r; c < s; c++)
    if (typeof e[c + 1] == 'number') {
      if (((a = e[c]), n != null && a >= n)) break;
    } else
      e[c] < 0 && (t[tr] += 65536),
        (a < o || o == -1) &&
          (ND(t, i, e, c), (t[tr] = (t[tr] & 4294901760) + c + 2)),
        c++;
}
function tg(t, e) {
  Gt(4, t, e);
  let i = Ge(null);
  try {
    e.call(t);
  } finally {
    Ge(i), Gt(5, t, e);
  }
}
function ND(t, e, i, n) {
  let r = i[n] < 0,
    o = i[n + 1],
    s = r ? -i[n] : i[n],
    a = t[s];
  r
    ? t[F] >> 14 < t[tr] >> 16 &&
      (t[F] & 3) === e &&
      ((t[F] += 16384), tg(a, o))
    : tg(a, o);
}
var sr = -1,
  yi = class {
    constructor(e, i, n) {
      (this.factory = e),
        (this.resolving = !1),
        (this.canSeeViewProviders = i),
        (this.injectImpl = n);
    }
  };
function OD(t) {
  return t instanceof yi;
}
function PD(t) {
  return (t.flags & 8) !== 0;
}
function LD(t) {
  return (t.flags & 16) !== 0;
}
function wb(t) {
  return t !== sr;
}
function Sa(t) {
  let e = t & 32767;
  return t & 32767;
}
function VD(t) {
  return t >> 16;
}
function Ta(t, e) {
  let i = VD(t),
    n = e;
  for (; i > 0; ) (n = n[pr]), i--;
  return n;
}
var zd = !0;
function ng(t) {
  let e = zd;
  return (zd = t), e;
}
var jD = 256,
  Eb = jD - 1,
  Cb = 5,
  BD = 0,
  qt = {};
function UD(t, e, i) {
  let n;
  typeof i == 'string'
    ? (n = i.charCodeAt(0) || 0)
    : i.hasOwnProperty(Jr) && (n = i[Jr]),
    n == null && (n = i[Jr] = BD++);
  let r = n & Eb,
    o = 1 << r;
  e.data[t + (r >> Cb)] |= o;
}
function ka(t, e) {
  let i = Db(t, e);
  if (i !== -1) return i;
  let n = e[O];
  n.firstCreatePass &&
    ((t.injectorIndex = e.length),
    yd(n.data, t),
    yd(e, null),
    yd(n.blueprint, null));
  let r = ef(t, e),
    o = t.injectorIndex;
  if (wb(r)) {
    let s = Sa(r),
      a = Ta(r, e),
      c = a[O].data;
    for (let l = 0; l < 8; l++) e[o + l] = a[s + l] | c[s + l];
  }
  return (e[o + 8] = r), o;
}
function yd(t, e) {
  t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
}
function Db(t, e) {
  return t.injectorIndex === -1 ||
    (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
    e[t.injectorIndex + 8] === null
    ? -1
    : t.injectorIndex;
}
function ef(t, e) {
  if (t.parent && t.parent.injectorIndex !== -1) return t.parent.injectorIndex;
  let i = 0,
    n = null,
    r = e;
  for (; r !== null; ) {
    if (((n = kb(r)), n === null)) return sr;
    if ((i++, (r = r[pr]), n.injectorIndex !== -1))
      return n.injectorIndex | (i << 16);
  }
  return sr;
}
function Wd(t, e, i) {
  UD(t, e, i);
}
function HD(t, e) {
  if (e === 'class') return t.classes;
  if (e === 'style') return t.styles;
  let i = t.attrs;
  if (i) {
    let n = i.length,
      r = 0;
    for (; r < n; ) {
      let o = i[r];
      if (Vg(o)) break;
      if (o === 0) r = r + 2;
      else if (typeof o == 'number')
        for (r++; r < n && typeof i[r] == 'string'; ) r++;
      else {
        if (o === e) return i[r + 1];
        r = r + 2;
      }
    }
  }
  return null;
}
function Ib(t, e, i) {
  if (i & G.Optional || t !== void 0) return t;
  Hu(e, 'NodeInjector');
}
function Mb(t, e, i, n) {
  if (
    (i & G.Optional && n === void 0 && (n = null), !(i & (G.Self | G.Host)))
  ) {
    let r = t[cr],
      o = It(void 0);
    try {
      return r ? r.get(e, n, i & G.Optional) : Ng(e, n, i & G.Optional);
    } finally {
      It(o);
    }
  }
  return Ib(n, e, i);
}
function Sb(t, e, i, n = G.Default, r) {
  if (t !== null) {
    if (e[F] & 2048 && !(n & G.Self)) {
      let s = GD(t, e, i, n, qt);
      if (s !== qt) return s;
    }
    let o = Tb(t, e, i, n, qt);
    if (o !== qt) return o;
  }
  return Mb(e, i, n, r);
}
function Tb(t, e, i, n, r) {
  let o = zD(i);
  if (typeof o == 'function') {
    if (!fb(e, t, n)) return n & G.Host ? Ib(r, i, n) : Mb(e, i, n, r);
    try {
      let s;
      if (((s = o(n)), s == null && !(n & G.Optional))) Hu(i);
      else return s;
    } finally {
      gb();
    }
  } else if (typeof o == 'number') {
    let s = null,
      a = Db(t, e),
      c = sr,
      l = n & G.Host ? e[ct][yt] : null;
    for (
      (a === -1 || n & G.SkipSelf) &&
      ((c = a === -1 ? ef(t, e) : e[a + 8]),
      c === sr || !rg(n, !1)
        ? (a = -1)
        : ((s = e[O]), (a = Sa(c)), (e = Ta(c, e))));
      a !== -1;

    ) {
      let d = e[O];
      if (ig(o, a, d.data)) {
        let u = $D(a, e, i, s, n, l);
        if (u !== qt) return u;
      }
      (c = e[a + 8]),
        c !== sr && rg(n, e[O].data[a + 8] === l) && ig(o, a, e)
          ? ((s = d), (a = Sa(c)), (e = Ta(c, e)))
          : (a = -1);
    }
  }
  return r;
}
function $D(t, e, i, n, r, o) {
  let s = e[O],
    a = s.data[t + 8],
    c = n == null ? go(a) && zd : n != s && (a.type & 3) !== 0,
    l = r & G.Host && o === a,
    d = ya(a, s, i, c, l);
  return d !== null ? xi(e, s, d, a) : qt;
}
function ya(t, e, i, n, r) {
  let o = t.providerIndexes,
    s = e.data,
    a = o & 1048575,
    c = t.directiveStart,
    l = t.directiveEnd,
    d = o >> 20,
    u = n ? a : a + d,
    f = r ? a + d : l;
  for (let h = u; h < f; h++) {
    let m = s[h];
    if ((h < c && i === m) || (h >= c && m.type === i)) return h;
  }
  if (r) {
    let h = s[c];
    if (h && On(h) && h.type === i) return c;
  }
  return null;
}
function xi(t, e, i, n) {
  let r = t[i],
    o = e.data;
  if (OD(r)) {
    let s = r;
    s.resolving && kC(TC(o[i]));
    let a = ng(s.canSeeViewProviders);
    s.resolving = !0;
    let c,
      l = s.injectImpl ? It(s.injectImpl) : null,
      d = fb(t, n, G.Default);
    try {
      (r = t[i] = s.factory(void 0, o, t, n)),
        e.firstCreatePass && i >= n.directiveStart && FD(i, o[i], e);
    } finally {
      l !== null && It(l), ng(a), (s.resolving = !1), gb();
    }
  }
  return r;
}
function zD(t) {
  if (typeof t == 'string') return t.charCodeAt(0) || 0;
  let e = t.hasOwnProperty(Jr) ? t[Jr] : void 0;
  return typeof e == 'number' ? (e >= 0 ? e & Eb : WD) : e;
}
function ig(t, e, i) {
  let n = 1 << t;
  return !!(i[e + (t >> Cb)] & n);
}
function rg(t, e) {
  return !(t & G.Self) && !(t & G.Host && e);
}
var bi = class {
  constructor(e, i) {
    (this._tNode = e), (this._lView = i);
  }
  get(e, i, n) {
    return Sb(this._tNode, this._lView, e, Za(n), i);
  }
};
function WD() {
  return new bi(ht(), K());
}
function vr(t) {
  return mo(() => {
    let e = t.prototype.constructor,
      i = e[Ca] || Gd(e),
      n = Object.prototype,
      r = Object.getPrototypeOf(t.prototype).constructor;
    for (; r && r !== n; ) {
      let o = r[Ca] || Gd(r);
      if (o && o !== i) return o;
      r = Object.getPrototypeOf(r);
    }
    return (o) => new o();
  });
}
function Gd(t) {
  return Mg(t)
    ? () => {
        let e = Gd(nt(t));
        return e && e();
      }
    : ur(t);
}
function GD(t, e, i, n, r) {
  let o = t,
    s = e;
  for (; o !== null && s !== null && s[F] & 2048 && !(s[F] & 512); ) {
    let a = Tb(o, s, i, n | G.Self, qt);
    if (a !== qt) return a;
    let c = o.parent;
    if (!c) {
      let l = s[Qg];
      if (l) {
        let d = l.get(i, qt, n);
        if (d !== qt) return d;
      }
      (c = kb(s)), (s = s[pr]);
    }
    o = c;
  }
  return r;
}
function kb(t) {
  let e = t[O],
    i = e.type;
  return i === 2 ? e.declTNode : i === 1 ? t[yt] : null;
}
function mn(t) {
  return HD(ht(), t);
}
var ua = '__parameters__';
function qD(t) {
  return function (...i) {
    if (t) {
      let n = t(...i);
      for (let r in n) this[r] = n[r];
    }
  };
}
function Ab(t, e, i) {
  return mo(() => {
    let n = qD(e);
    function r(...o) {
      if (this instanceof r) return n.apply(this, o), this;
      let s = new r(...o);
      return (a.annotation = s), a;
      function a(c, l, d) {
        let u = c.hasOwnProperty(ua)
          ? c[ua]
          : Object.defineProperty(c, ua, { value: [] })[ua];
        for (; u.length <= d; ) u.push(null);
        return (u[d] = u[d] || []).push(s), c;
      }
    }
    return (
      i && (r.prototype = Object.create(i.prototype)),
      (r.prototype.ngMetadataName = t),
      (r.annotationCls = r),
      r
    );
  });
}
function QD(t) {
  return typeof t == 'function';
}
function ZD(t, e, i) {
  if (t.length !== e.length) return !1;
  for (let n = 0; n < t.length; n++) {
    let r = t[n],
      o = e[n];
    if ((i && ((r = i(r)), (o = i(o))), o !== r)) return !1;
  }
  return !0;
}
function YD(t) {
  return t.flat(Number.POSITIVE_INFINITY);
}
function tf(t, e) {
  t.forEach((i) => (Array.isArray(i) ? tf(i, e) : e(i)));
}
function Rb(t, e, i) {
  e >= t.length ? t.push(i) : t.splice(e, 0, i);
}
function Aa(t, e) {
  return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
}
function Fb(t, e) {
  let i = [];
  for (let n = 0; n < t; n++) i.push(e);
  return i;
}
function XD(t, e, i, n) {
  let r = t.length;
  if (r == e) t.push(i, n);
  else if (r === 1) t.push(n, t[0]), (t[0] = i);
  else {
    for (r--, t.push(t[r - 1], t[r]); r > e; ) {
      let o = r - 2;
      (t[r] = t[o]), r--;
    }
    (t[e] = i), (t[e + 1] = n);
  }
}
function nf(t, e, i) {
  let n = vo(t, e);
  return n >= 0 ? (t[n | 1] = i) : ((n = ~n), XD(t, n, e, i)), n;
}
function xd(t, e) {
  let i = vo(t, e);
  if (i >= 0) return t[i | 1];
}
function vo(t, e) {
  return KD(t, e, 1);
}
function KD(t, e, i) {
  let n = 0,
    r = t.length >> i;
  for (; r !== n; ) {
    let o = n + ((r - n) >> 1),
      s = t[o << i];
    if (e === s) return o << i;
    s > e ? (r = o) : (n = o + 1);
  }
  return ~(r << i);
}
var Xa = Og(Ab('Optional'), 8);
var rf = Og(Ab('SkipSelf'), 4);
var wi = new w('ENVIRONMENT_INITIALIZER'),
  Nb = new w('INJECTOR', -1),
  Ob = new w('INJECTOR_DEF_TYPES'),
  Ra = class {
    get(e, i = eo) {
      if (i === eo) {
        let n = new Error(`NullInjectorError: No provider for ${rt(e)}!`);
        throw ((n.name = 'NullInjectorError'), n);
      }
      return i;
    }
  };
function Mi(t) {
  return { ɵproviders: t };
}
function JD(...t) {
  return { ɵproviders: Pb(!0, t), ɵfromNgModule: !0 };
}
function Pb(t, ...e) {
  let i = [],
    n = new Set(),
    r,
    o = (s) => {
      i.push(s);
    };
  return (
    tf(e, (s) => {
      let a = s;
      qd(a, o, [], n) && ((r ||= []), r.push(a));
    }),
    r !== void 0 && Lb(r, o),
    i
  );
}
function Lb(t, e) {
  for (let i = 0; i < t.length; i++) {
    let { ngModule: n, providers: r } = t[i];
    of(r, (o) => {
      e(o, n);
    });
  }
}
function qd(t, e, i, n) {
  if (((t = nt(t)), !t)) return !1;
  let r = null,
    o = Gp(t),
    s = !o && Nn(t);
  if (!o && !s) {
    let c = t.ngModule;
    if (((o = Gp(c)), o)) r = c;
    else return !1;
  } else {
    if (s && !s.standalone) return !1;
    r = t;
  }
  let a = n.has(r);
  if (s) {
    if (a) return !1;
    if ((n.add(r), s.dependencies)) {
      let c =
        typeof s.dependencies == 'function' ? s.dependencies() : s.dependencies;
      for (let l of c) qd(l, e, i, n);
    }
  } else if (o) {
    if (o.imports != null && !a) {
      n.add(r);
      let l;
      try {
        tf(o.imports, (d) => {
          qd(d, e, i, n) && ((l ||= []), l.push(d));
        });
      } finally {
      }
      l !== void 0 && Lb(l, e);
    }
    if (!a) {
      let l = ur(r) || (() => new r());
      e({ provide: r, useFactory: l, deps: it }, r),
        e({ provide: Ob, useValue: r, multi: !0 }, r),
        e({ provide: wi, useValue: () => v(r), multi: !0 }, r);
    }
    let c = o.providers;
    if (c != null && !a) {
      let l = t;
      of(c, (d) => {
        e(d, l);
      });
    }
  } else return !1;
  return r !== t && t.providers !== void 0;
}
function of(t, e) {
  for (let i of t)
    Sg(i) && (i = i.ɵproviders), Array.isArray(i) ? of(i, e) : e(i);
}
var eI = me({ provide: String, useValue: me });
function Vb(t) {
  return t !== null && typeof t == 'object' && eI in t;
}
function tI(t) {
  return !!(t && t.useExisting);
}
function nI(t) {
  return !!(t && t.useFactory);
}
function fr(t) {
  return typeof t == 'function';
}
function iI(t) {
  return !!t.useClass;
}
var Ka = new w('Set Injector scope.'),
  xa = {},
  rI = {},
  wd;
function sf() {
  return wd === void 0 && (wd = new Ra()), wd;
}
var lt = class {},
  so = class extends lt {
    get destroyed() {
      return this._destroyed;
    }
    constructor(e, i, n, r) {
      super(),
        (this.parent = i),
        (this.source = n),
        (this.scopes = r),
        (this.records = new Map()),
        (this._ngOnDestroyHooks = new Set()),
        (this._onDestroyHooks = []),
        (this._destroyed = !1),
        Zd(e, (s) => this.processProvider(s)),
        this.records.set(Nb, nr(void 0, this)),
        r.has('environment') && this.records.set(lt, nr(void 0, this));
      let o = this.records.get(Ka);
      o != null && typeof o.value == 'string' && this.scopes.add(o.value),
        (this.injectorDefTypes = new Set(this.get(Ob, it, G.Self)));
    }
    destroy() {
      this.assertNotDestroyed(), (this._destroyed = !0);
      try {
        for (let i of this._ngOnDestroyHooks) i.ngOnDestroy();
        let e = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let i of e) i();
      } finally {
        this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear();
      }
    }
    onDestroy(e) {
      return (
        this.assertNotDestroyed(),
        this._onDestroyHooks.push(e),
        () => this.removeOnDestroy(e)
      );
    }
    runInContext(e) {
      this.assertNotDestroyed();
      let i = Rn(this),
        n = It(void 0),
        r;
      try {
        return e();
      } finally {
        Rn(i), It(n);
      }
    }
    get(e, i = eo, n = G.Default) {
      if ((this.assertNotDestroyed(), e.hasOwnProperty(zp))) return e[zp](this);
      n = Za(n);
      let r,
        o = Rn(this),
        s = It(void 0);
      try {
        if (!(n & G.SkipSelf)) {
          let c = this.records.get(e);
          if (c === void 0) {
            let l = lI(e) && Qa(e);
            l && this.injectableDefInScope(l)
              ? (c = nr(Qd(e), xa))
              : (c = null),
              this.records.set(e, c);
          }
          if (c != null) return this.hydrate(e, c);
        }
        let a = n & G.Self ? sf() : this.parent;
        return (i = n & G.Optional && i === eo ? null : i), a.get(e, i);
      } catch (a) {
        if (a.name === 'NullInjectorError') {
          if (((a[Da] = a[Da] || []).unshift(rt(e)), o)) throw a;
          return HC(a, e, 'R3InjectorError', this.source);
        } else throw a;
      } finally {
        It(s), Rn(o);
      }
    }
    resolveInjectorInitializers() {
      let e = Rn(this),
        i = It(void 0),
        n;
      try {
        let r = this.get(wi, it, G.Self);
        for (let o of r) o();
      } finally {
        Rn(e), It(i);
      }
    }
    toString() {
      let e = [],
        i = this.records;
      for (let n of i.keys()) e.push(rt(n));
      return `R3Injector[${e.join(', ')}]`;
    }
    assertNotDestroyed() {
      if (this._destroyed) throw new _(205, !1);
    }
    processProvider(e) {
      e = nt(e);
      let i = fr(e) ? e : nt(e && e.provide),
        n = sI(e);
      if (!fr(e) && e.multi === !0) {
        let r = this.records.get(i);
        r ||
          ((r = nr(void 0, xa, !0)),
          (r.factory = () => jd(r.multi)),
          this.records.set(i, r)),
          (i = e),
          r.multi.push(e);
      } else {
        let r = this.records.get(i);
      }
      this.records.set(i, n);
    }
    hydrate(e, i) {
      return (
        i.value === xa && ((i.value = rI), (i.value = i.factory())),
        typeof i.value == 'object' &&
          i.value &&
          cI(i.value) &&
          this._ngOnDestroyHooks.add(i.value),
        i.value
      );
    }
    injectableDefInScope(e) {
      if (!e.providedIn) return !1;
      let i = nt(e.providedIn);
      return typeof i == 'string'
        ? i === 'any' || this.scopes.has(i)
        : this.injectorDefTypes.has(i);
    }
    removeOnDestroy(e) {
      let i = this._onDestroyHooks.indexOf(e);
      i !== -1 && this._onDestroyHooks.splice(i, 1);
    }
  };
function Qd(t) {
  let e = Qa(t),
    i = e !== null ? e.factory : ur(t);
  if (i !== null) return i;
  if (t instanceof w) throw new _(204, !1);
  if (t instanceof Function) return oI(t);
  throw new _(204, !1);
}
function oI(t) {
  let e = t.length;
  if (e > 0) {
    let n = Fb(e, '?');
    throw new _(204, !1);
  }
  let i = FC(t);
  return i !== null ? () => i.factory(t) : () => new t();
}
function sI(t) {
  if (Vb(t)) return nr(void 0, t.useValue);
  {
    let e = jb(t);
    return nr(e, xa);
  }
}
function jb(t, e, i) {
  let n;
  if (fr(t)) {
    let r = nt(t);
    return ur(r) || Qd(r);
  } else if (Vb(t)) n = () => nt(t.useValue);
  else if (nI(t)) n = () => t.useFactory(...jd(t.deps || []));
  else if (tI(t)) n = () => v(nt(t.useExisting));
  else {
    let r = nt(t && (t.useClass || t.provide));
    if (aI(t)) n = () => new r(...jd(t.deps));
    else return ur(r) || Qd(r);
  }
  return n;
}
function nr(t, e, i = !1) {
  return { factory: t, value: e, multi: i ? [] : void 0 };
}
function aI(t) {
  return !!t.deps;
}
function cI(t) {
  return (
    t !== null && typeof t == 'object' && typeof t.ngOnDestroy == 'function'
  );
}
function lI(t) {
  return typeof t == 'function' || (typeof t == 'object' && t instanceof w);
}
function Zd(t, e) {
  for (let i of t)
    Array.isArray(i) ? Zd(i, e) : i && Sg(i) ? Zd(i.ɵproviders, e) : e(i);
}
function pn(t, e) {
  t instanceof so && t.assertNotDestroyed();
  let i,
    n = Rn(t),
    r = It(void 0);
  try {
    return e();
  } finally {
    Rn(n), It(r);
  }
}
function dI(t) {
  if (!Fg() && !jC()) throw new _(-203, !1);
}
function og(t, e = null, i = null, n) {
  let r = Bb(t, e, i, n);
  return r.resolveInjectorInitializers(), r;
}
function Bb(t, e = null, i = null, n, r = new Set()) {
  let o = [i || it, JD(t)];
  return (
    (n = n || (typeof t == 'object' ? void 0 : rt(t))),
    new so(o, e || sf(), n || null, r)
  );
}
var St = (() => {
  let e = class e {
    static create(n, r) {
      if (Array.isArray(n)) return og({ name: '' }, r, n, '');
      {
        let o = n.name ?? '';
        return og({ name: o }, n.parent, n.providers, o);
      }
    }
  };
  (e.THROW_IF_NOT_FOUND = eo),
    (e.NULL = new Ra()),
    (e.ɵprov = y({ token: e, providedIn: 'any', factory: () => v(Nb) })),
    (e.__NG_ELEMENT_ID__ = -1);
  let t = e;
  return t;
})();
var Yd;
function Ub(t) {
  Yd = t;
}
function Ja() {
  if (Yd !== void 0) return Yd;
  if (typeof document < 'u') return document;
  throw new _(210, !1);
}
var _o = new w('AppId', { providedIn: 'root', factory: () => uI }),
  uI = 'ng',
  af = new w('Platform Initializer'),
  Bt = new w('Platform ID', {
    providedIn: 'platform',
    factory: () => 'unknown',
  });
var $e = new w('AnimationModuleType'),
  yo = new w('CSP nonce', {
    providedIn: 'root',
    factory: () =>
      Ja().body?.querySelector('[ngCspNonce]')?.getAttribute('ngCspNonce') ||
      null,
  });
function fI(t) {
  return t.ownerDocument.body;
}
function Hb(t) {
  return t instanceof Function ? t() : t;
}
function Kr(t) {
  return (t ?? b(St)).get(Bt) === 'browser';
}
var hI = 'ngSkipHydration',
  mI = 'ngskiphydration';
function $b(t) {
  let e = t.mergedAttrs;
  if (e === null) return !1;
  for (let i = 0; i < e.length; i += 2) {
    let n = e[i];
    if (typeof n == 'number') return !1;
    if (typeof n == 'string' && n.toLowerCase() === mI) return !0;
  }
  return !1;
}
function zb(t) {
  return t.hasAttribute(hI);
}
function Fa(t) {
  return (t.flags & 128) === 128;
}
function pI(t) {
  if (Fa(t)) return !0;
  let e = t.parent;
  for (; e; ) {
    if (Fa(t) || $b(e)) return !0;
    e = e.parent;
  }
  return !1;
}
var fn = (function (t) {
    return (
      (t[(t.Important = 1)] = 'Important'),
      (t[(t.DashCase = 2)] = 'DashCase'),
      t
    );
  })(fn || {}),
  gI = /^>|^->|<!--|-->|--!>|<!-$/g,
  bI = /(<|>)/g,
  vI = '\u200B$1\u200B';
function _I(t) {
  return t.replace(gI, (e) => e.replace(bI, vI));
}
var Wb = new Map(),
  yI = 0;
function xI() {
  return yI++;
}
function wI(t) {
  Wb.set(t[Ya], t);
}
function EI(t) {
  Wb.delete(t[Ya]);
}
var sg = '__ngContext__';
function Ei(t, e) {
  Zt(e) ? ((t[sg] = e[Ya]), wI(e)) : (t[sg] = e);
}
var CI;
function cf(t, e) {
  return CI(t, e);
}
function lf(t) {
  let e = t[Fe];
  return Mt(e) ? e[Fe] : e;
}
function Gb(t) {
  return Qb(t[io]);
}
function qb(t) {
  return Qb(t[Lt]);
}
function Qb(t) {
  for (; t !== null && !Mt(t); ) t = t[Lt];
  return t;
}
function ir(t, e, i, n, r) {
  if (n != null) {
    let o,
      s = !1;
    Mt(n) ? (o = n) : Zt(n) && ((s = !0), (n = n[_t]));
    let a = jt(n);
    t === 0 && i !== null
      ? r == null
        ? Jb(e, i, a)
        : Na(e, i, a, r || null, !0)
      : t === 1 && i !== null
      ? Na(e, i, a, r || null, !0)
      : t === 2
      ? nv(e, a, s)
      : t === 3 && e.destroyNode(a),
      o != null && BI(e, t, o, i, r);
  }
}
function Zb(t, e) {
  return t.createText(e);
}
function DI(t, e, i) {
  t.setValue(e, i);
}
function Yb(t, e) {
  return t.createComment(_I(e));
}
function df(t, e, i) {
  return t.createElement(e, i);
}
function II(t, e) {
  let i = e[Ce];
  xo(t, e, i, 2, null, null), (e[_t] = null), (e[yt] = null);
}
function MI(t, e, i, n, r, o) {
  (n[_t] = r), (n[yt] = e), xo(t, n, i, 1, r, o);
}
function SI(t, e) {
  xo(t, e, e[Ce], 2, null, null);
}
function TI(t) {
  let e = t[io];
  if (!e) return Ed(t[O], t);
  for (; e; ) {
    let i = null;
    if (Zt(e)) i = e[io];
    else {
      let n = e[qe];
      n && (i = n);
    }
    if (!i) {
      for (; e && !e[Lt] && e !== t; ) Zt(e) && Ed(e[O], e), (e = e[Fe]);
      e === null && (e = t), Zt(e) && Ed(e[O], e), (i = e && e[Lt]);
    }
    e = i;
  }
}
function kI(t, e, i, n) {
  let r = qe + n,
    o = i.length;
  n > 0 && (i[r - 1][Lt] = e),
    n < o - qe
      ? ((e[Lt] = i[r]), Rb(i, qe + n, e))
      : (i.push(e), (e[Lt] = null)),
    (e[Fe] = i);
  let s = e[po];
  s !== null && i !== s && AI(s, e);
  let a = e[Qt];
  a !== null && a.insertView(t), Hd(e), (e[F] |= 128);
}
function AI(t, e) {
  let i = t[lr],
    r = e[Fe][Fe][ct];
  e[ct] !== r && (t[F] |= dr.HasTransplantedViews),
    i === null ? (t[lr] = [e]) : i.push(e);
}
function Xb(t, e) {
  let i = t[lr],
    n = i.indexOf(e),
    r = e[Fe];
  i.splice(n, 1);
}
function ao(t, e) {
  if (t.length <= qe) return;
  let i = qe + e,
    n = t[i];
  if (n) {
    let r = n[po];
    r !== null && r !== t && Xb(r, n), e > 0 && (t[i - 1][Lt] = n[Lt]);
    let o = Aa(t, qe + e);
    II(n[O], n);
    let s = o[Qt];
    s !== null && s.detachView(o[O]),
      (n[Fe] = null),
      (n[Lt] = null),
      (n[F] &= -129);
  }
  return n;
}
function ec(t, e) {
  if (!(e[F] & 256)) {
    let i = e[Ce];
    i.destroyNode && xo(t, e, i, 3, null, null), TI(e);
  }
}
function Ed(t, e) {
  if (!(e[F] & 256)) {
    (e[F] &= -129),
      (e[F] |= 256),
      e[vi] && bp(e[vi]),
      FI(t, e),
      RI(t, e),
      e[O].type === 1 && e[Ce].destroy();
    let i = e[po];
    if (i !== null && Mt(e[Fe])) {
      i !== e[Fe] && Xb(i, e);
      let n = e[Qt];
      n !== null && n.detachView(t);
    }
    EI(e);
  }
}
function RI(t, e) {
  let i = t.cleanup,
    n = e[no];
  if (i !== null)
    for (let o = 0; o < i.length - 1; o += 2)
      if (typeof i[o] == 'string') {
        let s = i[o + 3];
        s >= 0 ? n[s]() : n[-s].unsubscribe(), (o += 2);
      } else {
        let s = n[i[o + 1]];
        i[o].call(s);
      }
  n !== null && (e[no] = null);
  let r = e[Fn];
  if (r !== null) {
    e[Fn] = null;
    for (let o = 0; o < r.length; o++) {
      let s = r[o];
      s();
    }
  }
}
function FI(t, e) {
  let i;
  if (t != null && (i = t.destroyHooks) != null)
    for (let n = 0; n < i.length; n += 2) {
      let r = e[i[n]];
      if (!(r instanceof yi)) {
        let o = i[n + 1];
        if (Array.isArray(o))
          for (let s = 0; s < o.length; s += 2) {
            let a = r[o[s]],
              c = o[s + 1];
            Gt(4, a, c);
            try {
              c.call(a);
            } finally {
              Gt(5, a, c);
            }
          }
        else {
          Gt(4, r, o);
          try {
            o.call(r);
          } finally {
            Gt(5, r, o);
          }
        }
      }
    }
}
function Kb(t, e, i) {
  return NI(t, e.parent, i);
}
function NI(t, e, i) {
  let n = e;
  for (; n !== null && n.type & 40; ) (e = n), (n = e.parent);
  if (n === null) return i[_t];
  {
    let { componentOffset: r } = n;
    if (r > -1) {
      let { encapsulation: o } = t.data[n.directiveStart + r];
      if (o === Yt.None || o === Yt.Emulated) return null;
    }
    return xt(n, i);
  }
}
function Na(t, e, i, n, r) {
  t.insertBefore(e, i, n, r);
}
function Jb(t, e, i) {
  t.appendChild(e, i);
}
function ag(t, e, i, n, r) {
  n !== null ? Na(t, e, i, n, r) : Jb(t, e, i);
}
function OI(t, e, i, n) {
  t.removeChild(e, i, n);
}
function uf(t, e) {
  return t.parentNode(e);
}
function PI(t, e) {
  return t.nextSibling(e);
}
function ev(t, e, i) {
  return VI(t, e, i);
}
function LI(t, e, i) {
  return t.type & 40 ? xt(t, i) : null;
}
var VI = LI,
  cg;
function ff(t, e, i, n) {
  let r = Kb(t, n, e),
    o = e[Ce],
    s = n.parent || e[yt],
    a = ev(s, n, e);
  if (r != null)
    if (Array.isArray(i))
      for (let c = 0; c < i.length; c++) ag(o, r, i[c], a, !1);
    else ag(o, r, i, a, !1);
  cg !== void 0 && cg(o, n, e, i, r);
}
function wa(t, e) {
  if (e !== null) {
    let i = e.type;
    if (i & 3) return xt(e, t);
    if (i & 4) return Xd(-1, t[e.index]);
    if (i & 8) {
      let n = e.child;
      if (n !== null) return wa(t, n);
      {
        let r = t[e.index];
        return Mt(r) ? Xd(-1, r) : jt(r);
      }
    } else {
      if (i & 32) return cf(e, t)() || jt(t[e.index]);
      {
        let n = tv(t, e);
        if (n !== null) {
          if (Array.isArray(n)) return n[0];
          let r = lf(t[ct]);
          return wa(r, n);
        } else return wa(t, e.next);
      }
    }
  }
  return null;
}
function tv(t, e) {
  if (e !== null) {
    let n = t[ct][yt],
      r = e.projection;
    return n.projection[r];
  }
  return null;
}
function Xd(t, e) {
  let i = qe + t + 1;
  if (i < e.length) {
    let n = e[i],
      r = n[O].firstChild;
    if (r !== null) return wa(n, r);
  }
  return e[un];
}
function nv(t, e, i) {
  let n = uf(t, e);
  n && OI(t, n, e, i);
}
function iv(t) {
  t.textContent = '';
}
function hf(t, e, i, n, r, o, s) {
  for (; i != null; ) {
    let a = n[i.index],
      c = i.type;
    if (
      (s && e === 0 && (a && Ei(jt(a), n), (i.flags |= 2)),
      (i.flags & 32) !== 32)
    )
      if (c & 8) hf(t, e, i.child, n, r, o, !1), ir(e, t, r, a, o);
      else if (c & 32) {
        let l = cf(i, n),
          d;
        for (; (d = l()); ) ir(e, t, r, d, o);
        ir(e, t, r, a, o);
      } else c & 16 ? rv(t, e, n, i, r, o) : ir(e, t, r, a, o);
    i = s ? i.projectionNext : i.next;
  }
}
function xo(t, e, i, n, r, o) {
  hf(i, n, t.firstChild, e, r, o, !1);
}
function jI(t, e, i) {
  let n = e[Ce],
    r = Kb(t, i, e),
    o = i.parent || e[yt],
    s = ev(o, i, e);
  rv(n, 0, e, i, r, s);
}
function rv(t, e, i, n, r, o) {
  let s = i[ct],
    c = s[yt].projection[n.projection];
  if (Array.isArray(c))
    for (let l = 0; l < c.length; l++) {
      let d = c[l];
      ir(e, t, r, d, o);
    }
  else {
    let l = c,
      d = s[Fe];
    Fa(n) && (l.flags |= 128), hf(t, e, l, d, r, o, !0);
  }
}
function BI(t, e, i, n, r) {
  let o = i[un],
    s = jt(i);
  o !== s && ir(e, t, n, o, r);
  for (let a = qe; a < i.length; a++) {
    let c = i[a];
    xo(c[O], c, t, e, n, o);
  }
}
function UI(t, e, i, n, r) {
  if (e) r ? t.addClass(i, n) : t.removeClass(i, n);
  else {
    let o = n.indexOf('-') === -1 ? void 0 : fn.DashCase;
    r == null
      ? t.removeStyle(i, n, o)
      : (typeof r == 'string' &&
          r.endsWith('!important') &&
          ((r = r.slice(0, -10)), (o |= fn.Important)),
        t.setStyle(i, n, r, o));
  }
}
function HI(t, e, i) {
  t.setAttribute(e, 'style', i);
}
function ov(t, e, i) {
  i === '' ? t.removeAttribute(e, 'class') : t.setAttribute(e, 'class', i);
}
function sv(t, e, i) {
  let { mergedAttrs: n, classes: r, styles: o } = i;
  n !== null && Bd(t, e, n),
    r !== null && ov(t, e, r),
    o !== null && HI(t, e, o);
}
var fa;
function $I() {
  if (fa === void 0 && ((fa = null), gi.trustedTypes))
    try {
      fa = gi.trustedTypes.createPolicy('angular', {
        createHTML: (t) => t,
        createScript: (t) => t,
        createScriptURL: (t) => t,
      });
    } catch {}
  return fa;
}
function tc(t) {
  return $I()?.createHTML(t) || t;
}
var hn = class {
    constructor(e) {
      this.changingThisBreaksApplicationSecurity = e;
    }
    toString() {
      return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Tg})`;
    }
  },
  Kd = class extends hn {
    getTypeName() {
      return 'HTML';
    }
  },
  Jd = class extends hn {
    getTypeName() {
      return 'Style';
    }
  },
  eu = class extends hn {
    getTypeName() {
      return 'Script';
    }
  },
  tu = class extends hn {
    getTypeName() {
      return 'URL';
    }
  },
  nu = class extends hn {
    getTypeName() {
      return 'ResourceURL';
    }
  };
function Xt(t) {
  return t instanceof hn ? t.changingThisBreaksApplicationSecurity : t;
}
function Si(t, e) {
  let i = zI(t);
  if (i != null && i !== e) {
    if (i === 'ResourceURL' && e === 'URL') return !0;
    throw new Error(`Required a safe ${e}, got a ${i} (see ${Tg})`);
  }
  return i === e;
}
function zI(t) {
  return (t instanceof hn && t.getTypeName()) || null;
}
function av(t) {
  return new Kd(t);
}
function cv(t) {
  return new Jd(t);
}
function lv(t) {
  return new eu(t);
}
function dv(t) {
  return new tu(t);
}
function uv(t) {
  return new nu(t);
}
function WI(t) {
  let e = new ru(t);
  return GI() ? new iu(e) : e;
}
var iu = class {
    constructor(e) {
      this.inertDocumentHelper = e;
    }
    getInertBodyElement(e) {
      e = '<body><remove></remove>' + e;
      try {
        let i = new window.DOMParser().parseFromString(tc(e), 'text/html').body;
        return i === null
          ? this.inertDocumentHelper.getInertBodyElement(e)
          : (i.removeChild(i.firstChild), i);
      } catch {
        return null;
      }
    }
  },
  ru = class {
    constructor(e) {
      (this.defaultDoc = e),
        (this.inertDocument =
          this.defaultDoc.implementation.createHTMLDocument(
            'sanitization-inert'
          ));
    }
    getInertBodyElement(e) {
      let i = this.inertDocument.createElement('template');
      return (i.innerHTML = tc(e)), i;
    }
  };
function GI() {
  try {
    return !!new window.DOMParser().parseFromString(tc(''), 'text/html');
  } catch {
    return !1;
  }
}
var qI = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function nc(t) {
  return (t = String(t)), t.match(qI) ? t : 'unsafe:' + t;
}
function gn(t) {
  let e = {};
  for (let i of t.split(',')) e[i] = !0;
  return e;
}
function wo(...t) {
  let e = {};
  for (let i of t) for (let n in i) i.hasOwnProperty(n) && (e[n] = !0);
  return e;
}
var fv = gn('area,br,col,hr,img,wbr'),
  hv = gn('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
  mv = gn('rp,rt'),
  QI = wo(mv, hv),
  ZI = wo(
    hv,
    gn(
      'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
    )
  ),
  YI = wo(
    mv,
    gn(
      'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
    )
  ),
  lg = wo(fv, ZI, YI, QI),
  pv = gn('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
  XI = gn(
    'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
  ),
  KI = gn(
    'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
  ),
  JI = wo(pv, XI, KI),
  eM = gn('script,style,template'),
  ou = class {
    constructor() {
      (this.sanitizedSomething = !1), (this.buf = []);
    }
    sanitizeChildren(e) {
      let i = e.firstChild,
        n = !0;
      for (; i; ) {
        if (
          (i.nodeType === Node.ELEMENT_NODE
            ? (n = this.startElement(i))
            : i.nodeType === Node.TEXT_NODE
            ? this.chars(i.nodeValue)
            : (this.sanitizedSomething = !0),
          n && i.firstChild)
        ) {
          i = i.firstChild;
          continue;
        }
        for (; i; ) {
          i.nodeType === Node.ELEMENT_NODE && this.endElement(i);
          let r = this.checkClobberedElement(i, i.nextSibling);
          if (r) {
            i = r;
            break;
          }
          i = this.checkClobberedElement(i, i.parentNode);
        }
      }
      return this.buf.join('');
    }
    startElement(e) {
      let i = e.nodeName.toLowerCase();
      if (!lg.hasOwnProperty(i))
        return (this.sanitizedSomething = !0), !eM.hasOwnProperty(i);
      this.buf.push('<'), this.buf.push(i);
      let n = e.attributes;
      for (let r = 0; r < n.length; r++) {
        let o = n.item(r),
          s = o.name,
          a = s.toLowerCase();
        if (!JI.hasOwnProperty(a)) {
          this.sanitizedSomething = !0;
          continue;
        }
        let c = o.value;
        pv[a] && (c = nc(c)), this.buf.push(' ', s, '="', dg(c), '"');
      }
      return this.buf.push('>'), !0;
    }
    endElement(e) {
      let i = e.nodeName.toLowerCase();
      lg.hasOwnProperty(i) &&
        !fv.hasOwnProperty(i) &&
        (this.buf.push('</'), this.buf.push(i), this.buf.push('>'));
    }
    chars(e) {
      this.buf.push(dg(e));
    }
    checkClobberedElement(e, i) {
      if (
        i &&
        (e.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY) ===
          Node.DOCUMENT_POSITION_CONTAINED_BY
      )
        throw new Error(
          `Failed to sanitize html because the element is clobbered: ${e.outerHTML}`
        );
      return i;
    }
  },
  tM = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
  nM = /([^\#-~ |!])/g;
function dg(t) {
  return t
    .replace(/&/g, '&amp;')
    .replace(tM, function (e) {
      let i = e.charCodeAt(0),
        n = e.charCodeAt(1);
      return '&#' + ((i - 55296) * 1024 + (n - 56320) + 65536) + ';';
    })
    .replace(nM, function (e) {
      return '&#' + e.charCodeAt(0) + ';';
    })
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
var ha;
function gv(t, e) {
  let i = null;
  try {
    ha = ha || WI(t);
    let n = e ? String(e) : '';
    i = ha.getInertBodyElement(n);
    let r = 5,
      o = n;
    do {
      if (r === 0)
        throw new Error(
          'Failed to sanitize html because the input is unstable'
        );
      r--, (n = o), (o = i.innerHTML), (i = ha.getInertBodyElement(n));
    } while (n !== o);
    let a = new ou().sanitizeChildren(ug(i) || i);
    return tc(a);
  } finally {
    if (i) {
      let n = ug(i) || i;
      for (; n.firstChild; ) n.removeChild(n.firstChild);
    }
  }
}
function ug(t) {
  return 'content' in t && iM(t) ? t.content : null;
}
function iM(t) {
  return t.nodeType === Node.ELEMENT_NODE && t.nodeName === 'TEMPLATE';
}
var ot = (function (t) {
  return (
    (t[(t.NONE = 0)] = 'NONE'),
    (t[(t.HTML = 1)] = 'HTML'),
    (t[(t.STYLE = 2)] = 'STYLE'),
    (t[(t.SCRIPT = 3)] = 'SCRIPT'),
    (t[(t.URL = 4)] = 'URL'),
    (t[(t.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
    t
  );
})(ot || {});
function bv(t) {
  let e = rM();
  return e ? e.sanitize(ot.URL, t) || '' : Si(t, 'URL') ? Xt(t) : nc(qa(t));
}
function rM() {
  let t = K();
  return t && t[dn].sanitizer;
}
var su = class {};
function oM() {
  let t = new Ti();
  return b(Bt) === 'browser' && (t.store = sM(Ja(), b(_o))), t;
}
var Ti = (() => {
  let e = class e {
    constructor() {
      (this.store = {}), (this.onSerializeCallbacks = {});
    }
    get(n, r) {
      return this.store[n] !== void 0 ? this.store[n] : r;
    }
    set(n, r) {
      this.store[n] = r;
    }
    remove(n) {
      delete this.store[n];
    }
    hasKey(n) {
      return this.store.hasOwnProperty(n);
    }
    get isEmpty() {
      return Object.keys(this.store).length === 0;
    }
    onSerialize(n, r) {
      this.onSerializeCallbacks[n] = r;
    }
    toJson() {
      for (let n in this.onSerializeCallbacks)
        if (this.onSerializeCallbacks.hasOwnProperty(n))
          try {
            this.store[n] = this.onSerializeCallbacks[n]();
          } catch (r) {
            console.warn('Exception in onSerialize callback: ', r);
          }
      return JSON.stringify(this.store).replace(/</g, '\\u003C');
    }
  };
  e.ɵprov = y({ token: e, providedIn: 'root', factory: oM });
  let t = e;
  return t;
})();
function sM(t, e) {
  let i = t.getElementById(e + '-state');
  if (i?.textContent)
    try {
      return JSON.parse(i.textContent);
    } catch (n) {
      console.warn('Exception while restoring TransferState for app ' + e, n);
    }
  return {};
}
var vv = 'h',
  _v = 'b',
  au = (function (t) {
    return (t.FirstChild = 'f'), (t.NextSibling = 'n'), t;
  })(au || {}),
  aM = 'e',
  cM = 't',
  mf = 'c',
  yv = 'x',
  Oa = 'r',
  lM = 'i',
  dM = 'n',
  uM = 'd',
  fM = '__nghData__',
  xv = fM,
  Cd = 'ngh',
  hM = 'nghm',
  wv = (t, e, i) => null;
function mM(t, e, i = !1) {
  let n = t.getAttribute(Cd);
  if (n == null) return null;
  let [r, o] = n.split('|');
  if (((n = i ? o : r), !n)) return null;
  let s = i ? r : o ? `|${o}` : '',
    a = {};
  if (n !== '') {
    let l = e.get(Ti, null, { optional: !0 });
    l !== null && (a = l.get(xv, [])[Number(n)]);
  }
  let c = { data: a, firstChild: t.firstChild ?? null };
  return (
    i && ((c.firstChild = t), ic(c, 0, t.nextSibling)),
    s ? t.setAttribute(Cd, s) : t.removeAttribute(Cd),
    c
  );
}
function pM() {
  wv = mM;
}
function pf(t, e, i = !1) {
  return wv(t, e, i);
}
function gM(t) {
  let e = t._lView;
  return e[O].type === 2 ? null : (Xg(e) && (e = e[He]), e);
}
function bM(t) {
  return t.textContent?.replace(/\s/gm, '');
}
function vM(t) {
  let e = Ja(),
    i = e.createNodeIterator(t, NodeFilter.SHOW_COMMENT, {
      acceptNode(o) {
        let s = bM(o);
        return s === 'ngetn' || s === 'ngtns'
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    }),
    n,
    r = [];
  for (; (n = i.nextNode()); ) r.push(n);
  for (let o of r)
    o.textContent === 'ngetn'
      ? o.replaceWith(e.createTextNode(''))
      : o.remove();
}
function ic(t, e, i) {
  (t.segmentHeads ??= {}), (t.segmentHeads[e] = i);
}
function cu(t, e) {
  return t.segmentHeads?.[e] ?? null;
}
function _M(t, e) {
  let i = t.data,
    n = i[aM]?.[e] ?? null;
  return n === null && i[mf]?.[e] && (n = gf(t, e)), n;
}
function Ev(t, e) {
  return t.data[mf]?.[e] ?? null;
}
function gf(t, e) {
  let i = Ev(t, e) ?? [],
    n = 0;
  for (let r of i) n += r[Oa] * (r[yv] ?? 1);
  return n;
}
function rc(t, e) {
  if (typeof t.disconnectedNodes > 'u') {
    let i = t.data[uM];
    t.disconnectedNodes = i ? new Set(i) : null;
  }
  return !!t.disconnectedNodes?.has(e);
}
var lu = class {},
  Pa = class {};
function yM(t) {
  let e = Error(`No component factory found for ${rt(t)}.`);
  return (e[xM] = t), e;
}
var xM = 'ngComponent';
var du = class {
    resolveComponentFactory(e) {
      throw yM(e);
    }
  },
  oc = (() => {
    let e = class e {};
    e.NULL = new du();
    let t = e;
    return t;
  })();
function wM() {
  return _r(ht(), K());
}
function _r(t, e) {
  return new z(xt(t, e));
}
var z = (() => {
  let e = class e {
    constructor(n) {
      this.nativeElement = n;
    }
  };
  e.__NG_ELEMENT_ID__ = wM;
  let t = e;
  return t;
})();
function EM(t) {
  return t instanceof z ? t.nativeElement : t;
}
var Ci = class {},
  Bn = (() => {
    let e = class e {
      constructor() {
        this.destroyNode = null;
      }
    };
    e.__NG_ELEMENT_ID__ = () => CM();
    let t = e;
    return t;
  })();
function CM() {
  let t = K(),
    e = ht(),
    i = Ln(e.index, t);
  return (Zt(i) ? i : t)[Ce];
}
var DM = (() => {
    let e = class e {};
    e.ɵprov = y({ token: e, providedIn: 'root', factory: () => null });
    let t = e;
    return t;
  })(),
  Dd = {};
function La(t, e, i, n, r = !1) {
  for (; i !== null; ) {
    let o = e[i.index];
    o !== null && n.push(jt(o)), Mt(o) && IM(o, n);
    let s = i.type;
    if (s & 8) La(t, e, i.child, n);
    else if (s & 32) {
      let a = cf(i, e),
        c;
      for (; (c = a()); ) n.push(c);
    } else if (s & 16) {
      let a = tv(e, i);
      if (Array.isArray(a)) n.push(...a);
      else {
        let c = lf(e[ct]);
        La(c[O], c, a, n, !0);
      }
    }
    i = r ? i.projectionNext : i.next;
  }
  return n;
}
function IM(t, e) {
  for (let i = qe; i < t.length; i++) {
    let n = t[i],
      r = n[O].firstChild;
    r !== null && La(n[O], n, r, e);
  }
  t[un] !== t[_t] && e.push(t[un]);
}
var Cv = [];
function MM(t) {
  return t[vi] ?? SM(t);
}
function SM(t) {
  let e = Cv.pop() ?? Object.create(kM);
  return (e.lView = t), e;
}
function TM(t) {
  t.lView[vi] !== t && ((t.lView = null), Cv.push(t));
}
var kM = he(x({}, mp), {
    consumerIsAlwaysLive: !0,
    consumerMarkedDirty: (t) => {
      oo(t.lView);
    },
    consumerOnSignalRead() {
      this.lView[vi] = this;
    },
  }),
  AM = 'ngOriginalError';
function Id(t) {
  return t[AM];
}
var dt = class {
    constructor() {
      this._console = console;
    }
    handleError(e) {
      let i = this._findOriginalError(e);
      this._console.error('ERROR', e),
        i && this._console.error('ORIGINAL ERROR', i);
    }
    _findOriginalError(e) {
      let i = e && Id(e);
      for (; i && Id(i); ) i = Id(i);
      return i || null;
    }
  },
  Dv = new w('', {
    providedIn: 'root',
    factory: () => b(dt).handleError.bind(void 0),
  }),
  ma = new w(''),
  Iv = !1,
  Mv = new w('', { providedIn: 'root', factory: () => Iv });
var Un = {};
function W(t) {
  Sv(Qe(), K(), Vn() + t, !1);
}
function Sv(t, e, i, n) {
  if (!n)
    if ((e[F] & 3) === 3) {
      let o = t.preOrderCheckHooks;
      o !== null && va(e, o, i);
    } else {
      let o = t.preOrderHooks;
      o !== null && _a(e, o, 0, i);
    }
  _i(i);
}
function p(t, e = G.Default) {
  let i = K();
  if (i === null) return v(t, e);
  let n = ht();
  return Sb(n, i, nt(t), e);
}
function Eo() {
  let t = 'invalid';
  throw new Error(t);
}
function RM(t, e) {
  let i = t.hostBindingOpCodes;
  if (i !== null)
    try {
      for (let n = 0; n < i.length; n++) {
        let r = i[n];
        if (r < 0) _i(~r);
        else {
          let o = r,
            s = i[++n],
            a = i[++n];
          MD(s, o);
          let c = e[o];
          a(2, c);
        }
      }
    } finally {
      _i(-1);
    }
}
function sc(t, e, i, n, r, o, s, a, c, l, d) {
  let u = e.blueprint.slice();
  return (
    (u[_t] = r),
    (u[F] = n | 4 | 128 | 8 | 64),
    (l !== null || (t && t[F] & 2048)) && (u[F] |= 2048),
    ib(u),
    (u[Fe] = u[pr] = t),
    (u[Xe] = i),
    (u[dn] = s || (t && t[dn])),
    (u[Ce] = a || (t && t[Ce])),
    (u[cr] = c || (t && t[cr]) || null),
    (u[yt] = o),
    (u[Ya] = xI()),
    (u[Vt] = d),
    (u[Qg] = l),
    (u[ct] = e.type == 2 ? t[ct] : u),
    u
  );
}
function Co(t, e, i, n, r) {
  let o = t.data[e];
  if (o === null) (o = FM(t, e, i, n, r)), ID() && (o.flags |= 32);
  else if (o.type & 64) {
    (o.type = i), (o.value = n), (o.attrs = r);
    let s = ED();
    o.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return bo(o, !0), o;
}
function FM(t, e, i, n, r) {
  let o = ab(),
    s = cb(),
    a = s ? o : o && o.parent,
    c = (t.data[e] = BM(t, a, i, e, n, r));
  return (
    t.firstChild === null && (t.firstChild = c),
    o !== null &&
      (s
        ? o.child == null && c.parent !== null && (o.child = c)
        : o.next === null && ((o.next = c), (c.prev = o))),
    c
  );
}
function Tv(t, e, i, n) {
  if (i === 0) return -1;
  let r = e.length;
  for (let o = 0; o < i; o++) e.push(n), t.blueprint.push(n), t.data.push(null);
  return r;
}
function kv(t, e, i, n, r) {
  let o = Vn(),
    s = n & 2;
  try {
    _i(-1), s && e.length > He && Sv(t, e, He, !1), Gt(s ? 2 : 0, r), i(n, r);
  } finally {
    _i(o), Gt(s ? 3 : 1, r);
  }
}
function Av(t, e, i) {
  if (Yg(e)) {
    let n = Ge(null);
    try {
      let r = e.directiveStart,
        o = e.directiveEnd;
      for (let s = r; s < o; s++) {
        let a = t.data[s];
        a.contentQueries && a.contentQueries(1, i[s], s);
      }
    } finally {
      Ge(n);
    }
  }
}
function Rv(t, e, i) {
  sb() && (GM(t, e, i, xt(i, e)), (i.flags & 64) === 64 && jv(t, e, i));
}
function Fv(t, e, i = xt) {
  let n = e.localNames;
  if (n !== null) {
    let r = e.index + 1;
    for (let o = 0; o < n.length; o += 2) {
      let s = n[o + 1],
        a = s === -1 ? i(e, t) : t[s];
      t[r++] = a;
    }
  }
}
function Nv(t) {
  let e = t.tView;
  return e === null || e.incompleteFirstPass
    ? (t.tView = bf(
        1,
        null,
        t.template,
        t.decls,
        t.vars,
        t.directiveDefs,
        t.pipeDefs,
        t.viewQuery,
        t.schemas,
        t.consts,
        t.id
      ))
    : e;
}
function bf(t, e, i, n, r, o, s, a, c, l, d) {
  let u = He + n,
    f = u + r,
    h = NM(u, f),
    m = typeof l == 'function' ? l() : l;
  return (h[O] = {
    type: t,
    blueprint: h,
    template: i,
    queries: null,
    viewQuery: a,
    declTNode: e,
    data: h.slice().fill(null, u),
    bindingStartIndex: u,
    expandoStartIndex: f,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof o == 'function' ? o() : o,
    pipeRegistry: typeof s == 'function' ? s() : s,
    firstChild: null,
    schemas: c,
    consts: m,
    incompleteFirstPass: !1,
    ssrId: d,
  });
}
function NM(t, e) {
  let i = [];
  for (let n = 0; n < e; n++) i.push(n < t ? null : Un);
  return i;
}
function OM(t, e, i, n) {
  let o = n.get(Mv, Iv) || i === Yt.ShadowDom,
    s = t.selectRootElement(e, o);
  return PM(s), s;
}
function PM(t) {
  Ov(t);
}
var Ov = (t) => null;
function LM(t) {
  zb(t) ? iv(t) : vM(t);
}
function VM() {
  Ov = LM;
}
function jM(t, e, i, n) {
  let r = $v(e);
  r.push(i), t.firstCreatePass && zv(t).push(n, r.length - 1);
}
function BM(t, e, i, n, r, o) {
  let s = e ? e.injectorIndex : -1,
    a = 0;
  return (
    gr() && (a |= 128),
    {
      type: i,
      index: n,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: r,
      attrs: o,
      mergedAttrs: null,
      localNames: null,
      initialInputs: void 0,
      inputs: null,
      outputs: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: e,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
function fg(t, e, i, n) {
  for (let r in t)
    if (t.hasOwnProperty(r)) {
      i = i === null ? {} : i;
      let o = t[r];
      n === null ? hg(i, e, r, o) : n.hasOwnProperty(r) && hg(i, e, n[r], o);
    }
  return i;
}
function hg(t, e, i, n) {
  t.hasOwnProperty(i) ? t[i].push(e, n) : (t[i] = [e, n]);
}
function UM(t, e, i) {
  let n = e.directiveStart,
    r = e.directiveEnd,
    o = t.data,
    s = e.attrs,
    a = [],
    c = null,
    l = null;
  for (let d = n; d < r; d++) {
    let u = o[d],
      f = i ? i.get(u) : null,
      h = f ? f.inputs : null,
      m = f ? f.outputs : null;
    (c = fg(u.inputs, d, c, h)), (l = fg(u.outputs, d, l, m));
    let g = c !== null && s !== null && !Bg(e) ? iS(c, d, s) : null;
    a.push(g);
  }
  c !== null &&
    (c.hasOwnProperty('class') && (e.flags |= 8),
    c.hasOwnProperty('style') && (e.flags |= 16)),
    (e.initialInputs = a),
    (e.inputs = c),
    (e.outputs = l);
}
function HM(t) {
  return t === 'class'
    ? 'className'
    : t === 'for'
    ? 'htmlFor'
    : t === 'formaction'
    ? 'formAction'
    : t === 'innerHtml'
    ? 'innerHTML'
    : t === 'readonly'
    ? 'readOnly'
    : t === 'tabindex'
    ? 'tabIndex'
    : t;
}
function Pv(t, e, i, n, r, o, s, a) {
  let c = xt(e, i),
    l = e.inputs,
    d;
  !a && l != null && (d = l[n])
    ? (vf(t, i, d, n, r), go(e) && $M(i, e.index))
    : e.type & 3
    ? ((n = HM(n)),
      (r = s != null ? s(r, e.value || '', n) : r),
      o.setProperty(c, n, r))
    : e.type & 12;
}
function $M(t, e) {
  let i = Ln(e, t);
  i[F] & 16 || (i[F] |= 64);
}
function Lv(t, e, i, n) {
  if (sb()) {
    let r = n === null ? null : { '': -1 },
      o = QM(t, i),
      s,
      a;
    o === null ? (s = a = null) : ([s, a] = o),
      s !== null && Vv(t, e, i, s, r, a),
      r && ZM(i, n, r);
  }
  i.mergedAttrs = to(i.mergedAttrs, i.attrs);
}
function Vv(t, e, i, n, r, o) {
  for (let l = 0; l < n.length; l++) Wd(ka(i, e), t, n[l].type);
  XM(i, t.data.length, n.length);
  for (let l = 0; l < n.length; l++) {
    let d = n[l];
    d.providersResolver && d.providersResolver(d);
  }
  let s = !1,
    a = !1,
    c = Tv(t, e, n.length, null);
  for (let l = 0; l < n.length; l++) {
    let d = n[l];
    (i.mergedAttrs = to(i.mergedAttrs, d.hostAttrs)),
      KM(t, i, e, c, d),
      YM(c, d, r),
      d.contentQueries !== null && (i.flags |= 4),
      (d.hostBindings !== null || d.hostAttrs !== null || d.hostVars !== 0) &&
        (i.flags |= 64);
    let u = d.type.prototype;
    !s &&
      (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
      ((t.preOrderHooks ??= []).push(i.index), (s = !0)),
      !a &&
        (u.ngOnChanges || u.ngDoCheck) &&
        ((t.preOrderCheckHooks ??= []).push(i.index), (a = !0)),
      c++;
  }
  UM(t, i, o);
}
function zM(t, e, i, n, r) {
  let o = r.hostBindings;
  if (o) {
    let s = t.hostBindingOpCodes;
    s === null && (s = t.hostBindingOpCodes = []);
    let a = ~e.index;
    WM(s) != a && s.push(a), s.push(i, n, o);
  }
}
function WM(t) {
  let e = t.length;
  for (; e > 0; ) {
    let i = t[--e];
    if (typeof i == 'number' && i < 0) return i;
  }
  return 0;
}
function GM(t, e, i, n) {
  let r = i.directiveStart,
    o = i.directiveEnd;
  go(i) && JM(e, i, t.data[r + i.componentOffset]),
    t.firstCreatePass || ka(i, e),
    Ei(n, e);
  let s = i.initialInputs;
  for (let a = r; a < o; a++) {
    let c = t.data[a],
      l = xi(e, t, a, i);
    if ((Ei(l, e), s !== null && nS(e, a - r, l, c, i, s), On(c))) {
      let d = Ln(i.index, e);
      d[Xe] = xi(e, t, a, i);
    }
  }
}
function jv(t, e, i) {
  let n = i.directiveStart,
    r = i.directiveEnd,
    o = i.index,
    s = SD();
  try {
    _i(o);
    for (let a = n; a < r; a++) {
      let c = t.data[a],
        l = e[a];
      $d(a),
        (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) &&
          qM(c, l);
    }
  } finally {
    _i(-1), $d(s);
  }
}
function qM(t, e) {
  t.hostBindings !== null && t.hostBindings(1, e);
}
function QM(t, e) {
  let i = t.directiveRegistry,
    n = null,
    r = null;
  if (i)
    for (let o = 0; o < i.length; o++) {
      let s = i[o];
      if (Ug(e, s.selectors, !1))
        if ((n || (n = []), On(s)))
          if (s.findHostDirectiveDefs !== null) {
            let a = [];
            (r = r || new Map()),
              s.findHostDirectiveDefs(s, a, r),
              n.unshift(...a, s);
            let c = a.length;
            uu(t, e, c);
          } else n.unshift(s), uu(t, e, 0);
        else
          (r = r || new Map()), s.findHostDirectiveDefs?.(s, n, r), n.push(s);
    }
  return n === null ? null : [n, r];
}
function uu(t, e, i) {
  (e.componentOffset = i), (t.components ??= []).push(e.index);
}
function ZM(t, e, i) {
  if (e) {
    let n = (t.localNames = []);
    for (let r = 0; r < e.length; r += 2) {
      let o = i[e[r + 1]];
      if (o == null) throw new _(-301, !1);
      n.push(e[r], o);
    }
  }
}
function YM(t, e, i) {
  if (i) {
    if (e.exportAs)
      for (let n = 0; n < e.exportAs.length; n++) i[e.exportAs[n]] = t;
    On(e) && (i[''] = t);
  }
}
function XM(t, e, i) {
  (t.flags |= 1),
    (t.directiveStart = e),
    (t.directiveEnd = e + i),
    (t.providerIndexes = e);
}
function KM(t, e, i, n, r) {
  t.data[n] = r;
  let o = r.factory || (r.factory = ur(r.type, !0)),
    s = new yi(o, On(r), p);
  (t.blueprint[n] = s), (i[n] = s), zM(t, e, n, Tv(t, i, r.hostVars, Un), r);
}
function JM(t, e, i) {
  let n = xt(e, t),
    r = Nv(i),
    o = t[dn].rendererFactory,
    s = 16;
  i.signals ? (s = 4096) : i.onPush && (s = 64);
  let a = ac(
    t,
    sc(t, r, null, s, n, e, null, o.createRenderer(n, i), null, null, null)
  );
  t[e.index] = a;
}
function eS(t, e, i, n, r, o) {
  let s = xt(t, e);
  tS(e[Ce], s, o, t.value, i, n, r);
}
function tS(t, e, i, n, r, o, s) {
  if (o == null) t.removeAttribute(e, r, i);
  else {
    let a = s == null ? qa(o) : s(o, n || '', r);
    t.setAttribute(e, r, a, i);
  }
}
function nS(t, e, i, n, r, o) {
  let s = o[e];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      let c = s[a++],
        l = s[a++],
        d = s[a++];
      Bv(n, i, c, l, d);
    }
}
function Bv(t, e, i, n, r) {
  let o = Ge(null);
  try {
    let s = t.inputTransforms;
    s !== null && s.hasOwnProperty(n) && (r = s[n].call(e, r)),
      t.setInput !== null ? t.setInput(e, r, i, n) : (e[n] = r);
  } finally {
    Ge(o);
  }
}
function iS(t, e, i) {
  let n = null,
    r = 0;
  for (; r < i.length; ) {
    let o = i[r];
    if (o === 0) {
      r += 4;
      continue;
    } else if (o === 5) {
      r += 2;
      continue;
    }
    if (typeof o == 'number') break;
    if (t.hasOwnProperty(o)) {
      n === null && (n = []);
      let s = t[o];
      for (let a = 0; a < s.length; a += 2)
        if (s[a] === e) {
          n.push(o, s[a + 1], i[r + 1]);
          break;
        }
    }
    r += 2;
  }
  return n;
}
function Uv(t, e, i, n) {
  return [t, !0, 0, e, null, n, null, i, null, null];
}
function Hv(t, e) {
  let i = t.contentQueries;
  if (i !== null) {
    let n = Ge(null);
    try {
      for (let r = 0; r < i.length; r += 2) {
        let o = i[r],
          s = i[r + 1];
        if (s !== -1) {
          let a = t.data[s];
          Qu(o), a.contentQueries(2, e[s], s);
        }
      }
    } finally {
      Ge(n);
    }
  }
}
function ac(t, e) {
  return t[io] ? (t[Jp][Lt] = e) : (t[io] = e), (t[Jp] = e), e;
}
function fu(t, e, i) {
  Qu(0);
  let n = Ge(null);
  try {
    e(t, i);
  } finally {
    Ge(n);
  }
}
function $v(t) {
  return t[no] || (t[no] = []);
}
function zv(t) {
  return t.cleanup || (t.cleanup = []);
}
function Wv(t, e) {
  let i = t[cr],
    n = i ? i.get(dt, null) : null;
  n && n.handleError(e);
}
function vf(t, e, i, n, r) {
  for (let o = 0; o < i.length; ) {
    let s = i[o++],
      a = i[o++],
      c = e[s],
      l = t.data[s];
    Bv(l, c, n, a, r);
  }
}
function rS(t, e, i) {
  let n = nb(e, t);
  DI(t[Ce], n, i);
}
var oS = 100;
function sS(t, e = !0) {
  let i = t[dn],
    n = i.rendererFactory,
    r = i.afterRenderEventManager,
    o = !1;
  o || (n.begin?.(), r?.begin());
  try {
    aS(t);
  } catch (s) {
    throw (e && Wv(t, s), s);
  } finally {
    o || (n.end?.(), i.inlineEffectRunner?.flush(), r?.end());
  }
}
function aS(t) {
  hu(t, 0);
  let e = 0;
  for (; rb(t); ) {
    if (e === oS) throw new _(103, !1);
    e++, hu(t, 1);
  }
}
function cS(t, e, i, n) {
  let r = e[F];
  if ((r & 256) === 256) return;
  let o = !1;
  !o && e[dn].inlineEffectRunner?.flush(), Zu(e);
  let s = null,
    a = null;
  !o && lS(t) && ((a = MM(e)), (s = pp(a)));
  try {
    ib(e), DD(t.bindingStartIndex), i !== null && kv(t, e, i, 2, n);
    let c = (r & 3) === 3;
    if (!o)
      if (c) {
        let u = t.preOrderCheckHooks;
        u !== null && va(e, u, null);
      } else {
        let u = t.preOrderHooks;
        u !== null && _a(e, u, 0, null), _d(e, 0);
      }
    if ((dS(e), Gv(e, 0), t.contentQueries !== null && Hv(t, e), !o))
      if (c) {
        let u = t.contentCheckHooks;
        u !== null && va(e, u);
      } else {
        let u = t.contentHooks;
        u !== null && _a(e, u, 1), _d(e, 1);
      }
    RM(t, e);
    let l = t.components;
    l !== null && Qv(e, l, 0);
    let d = t.viewQuery;
    if ((d !== null && fu(2, d, n), !o))
      if (c) {
        let u = t.viewCheckHooks;
        u !== null && va(e, u);
      } else {
        let u = t.viewHooks;
        u !== null && _a(e, u, 2), _d(e, 2);
      }
    if ((t.firstUpdatePass === !0 && (t.firstUpdatePass = !1), e[vd])) {
      for (let u of e[vd]) u();
      e[vd] = null;
    }
    o || (e[F] &= -73);
  } catch (c) {
    throw (oo(e), c);
  } finally {
    a !== null && (gp(a, s), TM(a)), Yu();
  }
}
function lS(t) {
  return t.type !== 2;
}
function Gv(t, e) {
  for (let i = Gb(t); i !== null; i = qb(i)) {
    i[F] &= ~dr.HasChildViewsToRefresh;
    for (let n = qe; n < i.length; n++) {
      let r = i[n];
      qv(r, e);
    }
  }
}
function dS(t) {
  for (let e = Gb(t); e !== null; e = qb(e)) {
    if (!(e[F] & dr.HasTransplantedViews)) continue;
    let i = e[lr];
    for (let n = 0; n < i.length; n++) {
      let r = i[n],
        o = r[Fe];
      mD(r);
    }
  }
}
function uS(t, e, i) {
  let n = Ln(e, t);
  qv(n, i);
}
function qv(t, e) {
  Wu(t) && hu(t, e);
}
function hu(t, e) {
  let n = t[O],
    r = t[F],
    o = t[vi],
    s = !!(e === 0 && r & 16);
  if (
    ((s ||= !!(r & 64 && e === 0)),
    (s ||= !!(r & 1024)),
    (s ||= !!(o?.dirty && Kl(o))),
    o && (o.dirty = !1),
    (t[F] &= -9217),
    s)
  )
    cS(n, t, n.template, t[Xe]);
  else if (r & 8192) {
    Gv(t, 1);
    let a = n.components;
    a !== null && Qv(t, a, 1);
  }
}
function Qv(t, e, i) {
  for (let n = 0; n < e.length; n++) uS(t, e[n], i);
}
function _f(t) {
  for (t[dn].changeDetectionScheduler?.notify(); t; ) {
    t[F] |= 64;
    let e = lf(t);
    if (Xg(t) && !e) return t;
    t = e;
  }
  return null;
}
var Di = class {
    get rootNodes() {
      let e = this._lView,
        i = e[O];
      return La(i, e, i.firstChild, []);
    }
    constructor(e, i, n = !0) {
      (this._lView = e),
        (this._cdRefInjectingView = i),
        (this.notifyErrorHandler = n),
        (this._appRef = null),
        (this._attachedToViewContainer = !1);
    }
    get context() {
      return this._lView[Xe];
    }
    set context(e) {
      this._lView[Xe] = e;
    }
    get destroyed() {
      return (this._lView[F] & 256) === 256;
    }
    destroy() {
      if (this._appRef) this._appRef.detachView(this);
      else if (this._attachedToViewContainer) {
        let e = this._lView[Fe];
        if (Mt(e)) {
          let i = e[Ia],
            n = i ? i.indexOf(this) : -1;
          n > -1 && (ao(e, n), Aa(i, n));
        }
        this._attachedToViewContainer = !1;
      }
      ec(this._lView[O], this._lView);
    }
    onDestroy(e) {
      ob(this._lView, e);
    }
    markForCheck() {
      _f(this._cdRefInjectingView || this._lView);
    }
    detach() {
      this._lView[F] &= -129;
    }
    reattach() {
      Hd(this._lView), (this._lView[F] |= 128);
    }
    detectChanges() {
      (this._lView[F] |= 1024), sS(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new _(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      (this._appRef = null), SI(this._lView[O], this._lView);
    }
    attachToAppRef(e) {
      if (this._attachedToViewContainer) throw new _(902, !1);
      (this._appRef = e), Hd(this._lView);
    }
  },
  ze = (() => {
    let e = class e {};
    e.__NG_ELEMENT_ID__ = fS;
    let t = e;
    return t;
  })();
function fS(t) {
  return hS(ht(), K(), (t & 16) === 16);
}
function hS(t, e, i) {
  if (go(t) && !i) {
    let n = Ln(t.index, e);
    return new Di(n, n);
  } else if (t.type & 47) {
    let n = e[ct];
    return new Di(n, e);
  }
  return null;
}
var Zv = (() => {
    let e = class e {};
    (e.__NG_ELEMENT_ID__ = mS), (e.__NG_ENV_ID__ = (n) => n);
    let t = e;
    return t;
  })(),
  mu = class extends Zv {
    constructor(e) {
      super(), (this._lView = e);
    }
    onDestroy(e) {
      return ob(this._lView, e), () => gD(this._lView, e);
    }
  };
function mS() {
  return new mu(K());
}
var mg = new Set();
function Hn(t) {
  mg.has(t) ||
    (mg.add(t),
    performance?.mark?.('mark_feature_usage', { detail: { feature: t } }));
}
var pu = class extends Z {
  constructor(e = !1) {
    super(), (this.__isAsync = e);
  }
  emit(e) {
    super.next(e);
  }
  subscribe(e, i, n) {
    let r = e,
      o = i || (() => null),
      s = n;
    if (e && typeof e == 'object') {
      let c = e;
      (r = c.next?.bind(c)), (o = c.error?.bind(c)), (s = c.complete?.bind(c));
    }
    this.__isAsync && ((o = Md(o)), r && (r = Md(r)), s && (s = Md(s)));
    let a = super.subscribe({ next: r, error: o, complete: s });
    return e instanceof be && e.add(a), a;
  }
};
function Md(t) {
  return (e) => {
    setTimeout(t, void 0, e);
  };
}
var Y = pu;
function pg(...t) {}
function pS() {
  let t = typeof gi.requestAnimationFrame == 'function',
    e = gi[t ? 'requestAnimationFrame' : 'setTimeout'],
    i = gi[t ? 'cancelAnimationFrame' : 'clearTimeout'];
  if (typeof Zone < 'u' && e && i) {
    let n = e[Zone.__symbol__('OriginalDelegate')];
    n && (e = n);
    let r = i[Zone.__symbol__('OriginalDelegate')];
    r && (i = r);
  }
  return { nativeRequestAnimationFrame: e, nativeCancelAnimationFrame: i };
}
var I = class t {
    constructor({
      enableLongStackTrace: e = !1,
      shouldCoalesceEventChangeDetection: i = !1,
      shouldCoalesceRunChangeDetection: n = !1,
    }) {
      if (
        ((this.hasPendingMacrotasks = !1),
        (this.hasPendingMicrotasks = !1),
        (this.isStable = !0),
        (this.onUnstable = new Y(!1)),
        (this.onMicrotaskEmpty = new Y(!1)),
        (this.onStable = new Y(!1)),
        (this.onError = new Y(!1)),
        typeof Zone > 'u')
      )
        throw new _(908, !1);
      Zone.assertZonePatched();
      let r = this;
      (r._nesting = 0),
        (r._outer = r._inner = Zone.current),
        Zone.TaskTrackingZoneSpec &&
          (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
        e &&
          Zone.longStackTraceZoneSpec &&
          (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
        (r.shouldCoalesceEventChangeDetection = !n && i),
        (r.shouldCoalesceRunChangeDetection = n),
        (r.lastRequestAnimationFrameId = -1),
        (r.nativeRequestAnimationFrame = pS().nativeRequestAnimationFrame),
        vS(r);
    }
    static isInAngularZone() {
      return typeof Zone < 'u' && Zone.current.get('isAngularZone') === !0;
    }
    static assertInAngularZone() {
      if (!t.isInAngularZone()) throw new _(909, !1);
    }
    static assertNotInAngularZone() {
      if (t.isInAngularZone()) throw new _(909, !1);
    }
    run(e, i, n) {
      return this._inner.run(e, i, n);
    }
    runTask(e, i, n, r) {
      let o = this._inner,
        s = o.scheduleEventTask('NgZoneEvent: ' + r, e, gS, pg, pg);
      try {
        return o.runTask(s, i, n);
      } finally {
        o.cancelTask(s);
      }
    }
    runGuarded(e, i, n) {
      return this._inner.runGuarded(e, i, n);
    }
    runOutsideAngular(e) {
      return this._outer.run(e);
    }
  },
  gS = {};
function yf(t) {
  if (t._nesting == 0 && !t.hasPendingMicrotasks && !t.isStable)
    try {
      t._nesting++, t.onMicrotaskEmpty.emit(null);
    } finally {
      if ((t._nesting--, !t.hasPendingMicrotasks))
        try {
          t.runOutsideAngular(() => t.onStable.emit(null));
        } finally {
          t.isStable = !0;
        }
    }
}
function bS(t) {
  t.isCheckStableRunning ||
    t.lastRequestAnimationFrameId !== -1 ||
    ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
      gi,
      () => {
        t.fakeTopEventTask ||
          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
            'fakeTopEventTask',
            () => {
              (t.lastRequestAnimationFrameId = -1),
                gu(t),
                (t.isCheckStableRunning = !0),
                yf(t),
                (t.isCheckStableRunning = !1);
            },
            void 0,
            () => {},
            () => {}
          )),
          t.fakeTopEventTask.invoke();
      }
    )),
    gu(t));
}
function vS(t) {
  let e = () => {
    bS(t);
  };
  t._inner = t._inner.fork({
    name: 'angular',
    properties: { isAngularZone: !0 },
    onInvokeTask: (i, n, r, o, s, a) => {
      if (_S(a)) return i.invokeTask(r, o, s, a);
      try {
        return gg(t), i.invokeTask(r, o, s, a);
      } finally {
        ((t.shouldCoalesceEventChangeDetection && o.type === 'eventTask') ||
          t.shouldCoalesceRunChangeDetection) &&
          e(),
          bg(t);
      }
    },
    onInvoke: (i, n, r, o, s, a, c) => {
      try {
        return gg(t), i.invoke(r, o, s, a, c);
      } finally {
        t.shouldCoalesceRunChangeDetection && e(), bg(t);
      }
    },
    onHasTask: (i, n, r, o) => {
      i.hasTask(r, o),
        n === r &&
          (o.change == 'microTask'
            ? ((t._hasPendingMicrotasks = o.microTask), gu(t), yf(t))
            : o.change == 'macroTask' &&
              (t.hasPendingMacrotasks = o.macroTask));
    },
    onHandleError: (i, n, r, o) => (
      i.handleError(r, o), t.runOutsideAngular(() => t.onError.emit(o)), !1
    ),
  });
}
function gu(t) {
  t._hasPendingMicrotasks ||
  ((t.shouldCoalesceEventChangeDetection ||
    t.shouldCoalesceRunChangeDetection) &&
    t.lastRequestAnimationFrameId !== -1)
    ? (t.hasPendingMicrotasks = !0)
    : (t.hasPendingMicrotasks = !1);
}
function gg(t) {
  t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
}
function bg(t) {
  t._nesting--, yf(t);
}
function _S(t) {
  return !Array.isArray(t) || t.length !== 1
    ? !1
    : t[0].data?.__ignore_ng_zone__ === !0;
}
var rr = (function (t) {
    return (
      (t[(t.EarlyRead = 0)] = 'EarlyRead'),
      (t[(t.Write = 1)] = 'Write'),
      (t[(t.MixedReadWrite = 2)] = 'MixedReadWrite'),
      (t[(t.Read = 3)] = 'Read'),
      t
    );
  })(rr || {}),
  yS = { destroy() {} };
function xf(t, e) {
  !e && dI(xf);
  let i = e?.injector ?? b(St);
  if (!Kr(i)) return yS;
  Hn('NgAfterNextRender');
  let n = i.get(Yv),
    r = (n.handler ??= new vu()),
    o = e?.phase ?? rr.MixedReadWrite,
    s = () => {
      r.unregister(c), a();
    },
    a = i.get(Zv).onDestroy(s),
    c = new bu(i, o, () => {
      s(), t();
    });
  return r.register(c), { destroy: s };
}
var bu = class {
    constructor(e, i, n) {
      (this.phase = i),
        (this.callbackFn = n),
        (this.zone = e.get(I)),
        (this.errorHandler = e.get(dt, null, { optional: !0 }));
    }
    invoke() {
      try {
        this.zone.runOutsideAngular(this.callbackFn);
      } catch (e) {
        this.errorHandler?.handleError(e);
      }
    }
  },
  vu = class {
    constructor() {
      (this.executingCallbacks = !1),
        (this.buckets = {
          [rr.EarlyRead]: new Set(),
          [rr.Write]: new Set(),
          [rr.MixedReadWrite]: new Set(),
          [rr.Read]: new Set(),
        }),
        (this.deferredCallbacks = new Set());
    }
    validateBegin() {
      if (this.executingCallbacks) throw new _(102, !1);
    }
    register(e) {
      (this.executingCallbacks
        ? this.deferredCallbacks
        : this.buckets[e.phase]
      ).add(e);
    }
    unregister(e) {
      this.buckets[e.phase].delete(e), this.deferredCallbacks.delete(e);
    }
    execute() {
      this.executingCallbacks = !0;
      for (let e of Object.values(this.buckets)) for (let i of e) i.invoke();
      this.executingCallbacks = !1;
      for (let e of this.deferredCallbacks) this.buckets[e.phase].add(e);
      this.deferredCallbacks.clear();
    }
    destroy() {
      for (let e of Object.values(this.buckets)) e.clear();
      this.deferredCallbacks.clear();
    }
  },
  Yv = (() => {
    let e = class e {
      constructor() {
        (this.renderDepth = 0),
          (this.handler = null),
          (this.internalCallbacks = []);
      }
      begin() {
        this.handler?.validateBegin(), this.renderDepth++;
      }
      end() {
        if ((this.renderDepth--, this.renderDepth === 0)) {
          for (let n of this.internalCallbacks) n();
          (this.internalCallbacks.length = 0), this.handler?.execute();
        }
      }
      ngOnDestroy() {
        this.handler?.destroy(),
          (this.handler = null),
          (this.internalCallbacks.length = 0);
      }
    };
    e.ɵprov = y({ token: e, providedIn: 'root', factory: () => new e() });
    let t = e;
    return t;
  })();
function xS(t, e) {
  let i = Ln(e, t),
    n = i[O];
  wS(n, i);
  let r = i[_t];
  r !== null && i[Vt] === null && (i[Vt] = pf(r, i[cr])), wf(n, i, i[Xe]);
}
function wS(t, e) {
  for (let i = e.length; i < t.blueprint.length; i++) e.push(t.blueprint[i]);
}
function wf(t, e, i) {
  Zu(e);
  try {
    let n = t.viewQuery;
    n !== null && fu(1, n, i);
    let r = t.template;
    r !== null && kv(t, e, r, 1, i),
      t.firstCreatePass && (t.firstCreatePass = !1),
      t.staticContentQueries && Hv(t, e),
      t.staticViewQueries && fu(2, t.viewQuery, i);
    let o = t.components;
    o !== null && ES(e, o);
  } catch (n) {
    throw (
      (t.firstCreatePass &&
        ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)),
      n)
    );
  } finally {
    (e[F] &= -5), Yu();
  }
}
function ES(t, e) {
  for (let i = 0; i < e.length; i++) xS(t, e[i]);
}
function _u(t, e, i) {
  let n = i ? t.styles : null,
    r = i ? t.classes : null,
    o = 0;
  if (e !== null)
    for (let s = 0; s < e.length; s++) {
      let a = e[s];
      if (typeof a == 'number') o = a;
      else if (o == 1) r = Pd(r, a);
      else if (o == 2) {
        let c = a,
          l = e[++s];
        n = Pd(n, c + ': ' + l + ';');
      }
    }
  i ? (t.styles = n) : (t.stylesWithoutHost = n),
    i ? (t.classes = r) : (t.classesWithoutHost = r);
}
var Va = class extends oc {
  constructor(e) {
    super(), (this.ngModule = e);
  }
  resolveComponentFactory(e) {
    let i = Nn(e);
    return new hr(i, this.ngModule);
  }
};
function vg(t) {
  let e = [];
  for (let i in t)
    if (t.hasOwnProperty(i)) {
      let n = t[i];
      e.push({ propName: n, templateName: i });
    }
  return e;
}
function CS(t) {
  let e = t.toLowerCase();
  return e === 'svg' ? tb : e === 'math' ? cD : null;
}
var yu = class {
    constructor(e, i) {
      (this.injector = e), (this.parentInjector = i);
    }
    get(e, i, n) {
      n = Za(n);
      let r = this.injector.get(e, Dd, n);
      return r !== Dd || i === Dd ? r : this.parentInjector.get(e, i, n);
    }
  },
  hr = class extends Pa {
    get inputs() {
      let e = this.componentDef,
        i = e.inputTransforms,
        n = vg(e.inputs);
      if (i !== null)
        for (let r of n)
          i.hasOwnProperty(r.propName) && (r.transform = i[r.propName]);
      return n;
    }
    get outputs() {
      return vg(this.componentDef.outputs);
    }
    constructor(e, i) {
      super(),
        (this.componentDef = e),
        (this.ngModule = i),
        (this.componentType = e.type),
        (this.selector = eD(e.selectors)),
        (this.ngContentSelectors = e.ngContentSelectors
          ? e.ngContentSelectors
          : []),
        (this.isBoundToModule = !!i);
    }
    create(e, i, n, r) {
      r = r || this.ngModule;
      let o = r instanceof lt ? r : r?.injector;
      o &&
        this.componentDef.getStandaloneInjector !== null &&
        (o = this.componentDef.getStandaloneInjector(o) || o);
      let s = o ? new yu(e, o) : e,
        a = s.get(Ci, null);
      if (a === null) throw new _(407, !1);
      let c = s.get(DM, null),
        l = s.get(Yv, null),
        d = s.get(su, null),
        u = {
          rendererFactory: a,
          sanitizer: c,
          inlineEffectRunner: null,
          afterRenderEventManager: l,
          changeDetectionScheduler: d,
        },
        f = a.createRenderer(null, this.componentDef),
        h = this.componentDef.selectors[0][0] || 'div',
        m = n ? OM(f, n, this.componentDef.encapsulation, s) : df(f, h, CS(h)),
        g = 512;
      this.componentDef.signals
        ? (g |= 4096)
        : this.componentDef.onPush || (g |= 16);
      let C = null;
      m !== null && (C = pf(m, s, !0));
      let E = bf(0, null, null, 1, 0, null, null, null, null, null, null),
        N = sc(null, E, null, g, null, null, u, f, s, null, C);
      Zu(N);
      let ce, ie;
      try {
        let fe = this.componentDef,
          re,
          ge = null;
        fe.findHostDirectiveDefs
          ? ((re = []),
            (ge = new Map()),
            fe.findHostDirectiveDefs(fe, re, ge),
            re.push(fe))
          : (re = [fe]);
        let et = DS(N, m),
          Rt = IS(et, m, fe, re, N, u, f);
        (ie = zu(E, He)),
          m && TS(f, fe, m, n),
          i !== void 0 && kS(ie, this.ngContentSelectors, i),
          (ce = SS(Rt, fe, re, ge, N, [AS])),
          wf(E, N, null);
      } finally {
        Yu();
      }
      return new xu(this.componentType, ce, _r(ie, N), N, ie);
    }
  },
  xu = class extends lu {
    constructor(e, i, n, r, o) {
      super(),
        (this.location = n),
        (this._rootLView = r),
        (this._tNode = o),
        (this.previousInputValues = null),
        (this.instance = i),
        (this.hostView = this.changeDetectorRef = new Di(r, void 0, !1)),
        (this.componentType = e);
    }
    setInput(e, i) {
      let n = this._tNode.inputs,
        r;
      if (n !== null && (r = n[e])) {
        if (
          ((this.previousInputValues ??= new Map()),
          this.previousInputValues.has(e) &&
            Object.is(this.previousInputValues.get(e), i))
        )
          return;
        let o = this._rootLView;
        vf(o[O], o, r, e, i), this.previousInputValues.set(e, i);
        let s = Ln(this._tNode.index, o);
        _f(s);
      }
    }
    get injector() {
      return new bi(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(e) {
      this.hostView.onDestroy(e);
    }
  };
function DS(t, e) {
  let i = t[O],
    n = He;
  return (t[n] = e), Co(i, n, 2, '#host', null);
}
function IS(t, e, i, n, r, o, s) {
  let a = r[O];
  MS(n, t, e, s);
  let c = null;
  e !== null && (c = pf(e, r[cr]));
  let l = o.rendererFactory.createRenderer(e, i),
    d = 16;
  i.signals ? (d = 4096) : i.onPush && (d = 64);
  let u = sc(r, Nv(i), null, d, r[t.index], t, o, l, null, null, c);
  return (
    a.firstCreatePass && uu(a, t, n.length - 1), ac(r, u), (r[t.index] = u)
  );
}
function MS(t, e, i, n) {
  for (let r of t) e.mergedAttrs = to(e.mergedAttrs, r.hostAttrs);
  e.mergedAttrs !== null &&
    (_u(e, e.mergedAttrs, !0), i !== null && sv(n, i, e));
}
function SS(t, e, i, n, r, o) {
  let s = ht(),
    a = r[O],
    c = xt(s, r);
  Vv(a, r, s, i, null, n);
  for (let d = 0; d < i.length; d++) {
    let u = s.directiveStart + d,
      f = xi(r, a, u, s);
    Ei(f, r);
  }
  jv(a, r, s), c && Ei(c, r);
  let l = xi(r, a, s.directiveStart + s.componentOffset, s);
  if (((t[Xe] = r[Xe] = l), o !== null)) for (let d of o) d(l, e);
  return Av(a, s, t), l;
}
function TS(t, e, i, n) {
  if (n) Bd(t, i, ['ng-version', '17.0.8']);
  else {
    let { attrs: r, classes: o } = tD(e.selectors[0]);
    r && Bd(t, i, r), o && o.length > 0 && ov(t, i, o.join(' '));
  }
}
function kS(t, e, i) {
  let n = (t.projection = []);
  for (let r = 0; r < e.length; r++) {
    let o = i[r];
    n.push(o != null ? Array.from(o) : null);
  }
}
function AS() {
  let t = ht();
  Ju(K()[O], t);
}
function RS(t) {
  return Object.getPrototypeOf(t.prototype).constructor;
}
function Re(t) {
  let e = RS(t.type),
    i = !0,
    n = [t];
  for (; e; ) {
    let r;
    if (On(t)) r = e.ɵcmp || e.ɵdir;
    else {
      if (e.ɵcmp) throw new _(903, !1);
      r = e.ɵdir;
    }
    if (r) {
      if (i) {
        n.push(r);
        let s = t;
        (s.inputs = pa(t.inputs)),
          (s.inputTransforms = pa(t.inputTransforms)),
          (s.declaredInputs = pa(t.declaredInputs)),
          (s.outputs = pa(t.outputs));
        let a = r.hostBindings;
        a && PS(t, a);
        let c = r.viewQuery,
          l = r.contentQueries;
        if (
          (c && NS(t, c),
          l && OS(t, l),
          da(t.inputs, r.inputs),
          da(t.declaredInputs, r.declaredInputs),
          da(t.outputs, r.outputs),
          r.inputTransforms !== null &&
            (s.inputTransforms === null && (s.inputTransforms = {}),
            da(s.inputTransforms, r.inputTransforms)),
          On(r) && r.data.animation)
        ) {
          let d = t.data;
          d.animation = (d.animation || []).concat(r.data.animation);
        }
      }
      let o = r.features;
      if (o)
        for (let s = 0; s < o.length; s++) {
          let a = o[s];
          a && a.ngInherit && a(t), a === Re && (i = !1);
        }
    }
    e = Object.getPrototypeOf(e);
  }
  FS(n);
}
function FS(t) {
  let e = 0,
    i = null;
  for (let n = t.length - 1; n >= 0; n--) {
    let r = t[n];
    (r.hostVars = e += r.hostVars),
      (r.hostAttrs = to(r.hostAttrs, (i = to(i, r.hostAttrs))));
  }
}
function pa(t) {
  return t === ar ? {} : t === it ? [] : t;
}
function NS(t, e) {
  let i = t.viewQuery;
  i
    ? (t.viewQuery = (n, r) => {
        e(n, r), i(n, r);
      })
    : (t.viewQuery = e);
}
function OS(t, e) {
  let i = t.contentQueries;
  i
    ? (t.contentQueries = (n, r, o) => {
        e(n, r, o), i(n, r, o);
      })
    : (t.contentQueries = e);
}
function PS(t, e) {
  let i = t.hostBindings;
  i
    ? (t.hostBindings = (n, r) => {
        e(n, r), i(n, r);
      })
    : (t.hostBindings = e);
}
function Ke(t) {
  let e = t.inputConfig,
    i = {};
  for (let n in e)
    if (e.hasOwnProperty(n)) {
      let r = e[n];
      Array.isArray(r) && r[2] && (i[n] = r[2]);
    }
  t.inputTransforms = i;
}
function $n(t, e, i) {
  let n = t[e];
  return Object.is(n, i) ? !1 : ((t[e] = i), !0);
}
function pe(t, e, i, n) {
  let r = K(),
    o = br();
  if ($n(r, o, e)) {
    let s = Qe(),
      a = Xu();
    eS(a, r, t, e, i, n);
  }
  return pe;
}
function LS(t, e, i, n) {
  return $n(t, br(), i) ? e + qa(i) + n : Un;
}
function ga(t, e) {
  return (t << 17) | (e << 2);
}
function Ii(t) {
  return (t >> 17) & 32767;
}
function VS(t) {
  return (t & 2) == 2;
}
function jS(t, e) {
  return (t & 131071) | (e << 17);
}
function wu(t) {
  return t | 2;
}
function mr(t) {
  return (t & 131068) >> 2;
}
function Sd(t, e) {
  return (t & -131069) | (e << 2);
}
function BS(t) {
  return (t & 1) === 1;
}
function Eu(t) {
  return t | 1;
}
function US(t, e, i, n, r, o) {
  let s = o ? e.classBindings : e.styleBindings,
    a = Ii(s),
    c = mr(s);
  t[n] = i;
  let l = !1,
    d;
  if (Array.isArray(i)) {
    let u = i;
    (d = u[1]), (d === null || vo(u, d) > 0) && (l = !0);
  } else d = i;
  if (r)
    if (c !== 0) {
      let f = Ii(t[a + 1]);
      (t[n + 1] = ga(f, a)),
        f !== 0 && (t[f + 1] = Sd(t[f + 1], n)),
        (t[a + 1] = jS(t[a + 1], n));
    } else
      (t[n + 1] = ga(a, 0)), a !== 0 && (t[a + 1] = Sd(t[a + 1], n)), (a = n);
  else
    (t[n + 1] = ga(c, 0)),
      a === 0 ? (a = n) : (t[c + 1] = Sd(t[c + 1], n)),
      (c = n);
  l && (t[n + 1] = wu(t[n + 1])),
    _g(t, d, n, !0, o),
    _g(t, d, n, !1, o),
    HS(e, d, t, n, o),
    (s = ga(a, c)),
    o ? (e.classBindings = s) : (e.styleBindings = s);
}
function HS(t, e, i, n, r) {
  let o = r ? t.residualClasses : t.residualStyles;
  o != null &&
    typeof e == 'string' &&
    vo(o, e) >= 0 &&
    (i[n + 1] = Eu(i[n + 1]));
}
function _g(t, e, i, n, r) {
  let o = t[i + 1],
    s = e === null,
    a = n ? Ii(o) : mr(o),
    c = !1;
  for (; a !== 0 && (c === !1 || s); ) {
    let l = t[a],
      d = t[a + 1];
    $S(l, e) && ((c = !0), (t[a + 1] = n ? Eu(d) : wu(d))),
      (a = n ? Ii(d) : mr(d));
  }
  c && (t[i + 1] = n ? wu(o) : Eu(o));
}
function $S(t, e) {
  return t === null || e == null || (Array.isArray(t) ? t[1] : t) === e
    ? !0
    : Array.isArray(t) && typeof e == 'string'
    ? vo(t, e) >= 0
    : !1;
}
var Pt = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function zS(t) {
  return t.substring(Pt.key, Pt.keyEnd);
}
function WS(t) {
  return GS(t), Xv(t, Kv(t, 0, Pt.textEnd));
}
function Xv(t, e) {
  let i = Pt.textEnd;
  return i === e ? -1 : ((e = Pt.keyEnd = qS(t, (Pt.key = e), i)), Kv(t, e, i));
}
function GS(t) {
  (Pt.key = 0),
    (Pt.keyEnd = 0),
    (Pt.value = 0),
    (Pt.valueEnd = 0),
    (Pt.textEnd = t.length);
}
function Kv(t, e, i) {
  for (; e < i && t.charCodeAt(e) <= 32; ) e++;
  return e;
}
function qS(t, e, i) {
  for (; e < i && t.charCodeAt(e) > 32; ) e++;
  return e;
}
function de(t, e, i) {
  let n = K(),
    r = br();
  if ($n(n, r, e)) {
    let o = Qe(),
      s = Xu();
    Pv(o, s, n, t, e, n[Ce], i, !1);
  }
  return de;
}
function Cu(t, e, i, n, r) {
  let o = e.inputs,
    s = r ? 'class' : 'style';
  vf(t, i, o[s], s, n);
}
function cc(t, e, i) {
  return Jv(t, e, i, !1), cc;
}
function X(t, e) {
  return Jv(t, e, null, !0), X;
}
function Kt(t) {
  ZS(tT, QS, t, !0);
}
function QS(t, e) {
  for (let i = WS(e); i >= 0; i = Xv(e, i)) nf(t, zS(e), !0);
}
function Jv(t, e, i, n) {
  let r = K(),
    o = Qe(),
    s = db(2);
  if ((o.firstUpdatePass && t_(o, t, s, n), e !== Un && $n(r, s, e))) {
    let a = o.data[Vn()];
    n_(o, a, r, r[Ce], t, (r[s + 1] = iT(e, i)), n, s);
  }
}
function ZS(t, e, i, n) {
  let r = Qe(),
    o = db(2);
  r.firstUpdatePass && t_(r, null, o, n);
  let s = K();
  if (i !== Un && $n(s, o, i)) {
    let a = r.data[Vn()];
    if (i_(a, n) && !e_(r, o)) {
      let c = n ? a.classesWithoutHost : a.stylesWithoutHost;
      c !== null && (i = Pd(c, i || '')), Cu(r, a, s, i, n);
    } else nT(r, a, s, s[Ce], s[o + 1], (s[o + 1] = eT(t, e, i)), n, o);
  }
}
function e_(t, e) {
  return e >= t.expandoStartIndex;
}
function t_(t, e, i, n) {
  let r = t.data;
  if (r[i + 1] === null) {
    let o = r[Vn()],
      s = e_(t, i);
    i_(o, n) && e === null && !s && (e = !1),
      (e = YS(r, o, e, n)),
      US(r, o, e, i, s, n);
  }
}
function YS(t, e, i, n) {
  let r = TD(t),
    o = n ? e.residualClasses : e.residualStyles;
  if (r === null)
    (n ? e.classBindings : e.styleBindings) === 0 &&
      ((i = Td(null, t, e, i, n)), (i = co(i, e.attrs, n)), (o = null));
  else {
    let s = e.directiveStylingLast;
    if (s === -1 || t[s] !== r)
      if (((i = Td(r, t, e, i, n)), o === null)) {
        let c = XS(t, e, n);
        c !== void 0 &&
          Array.isArray(c) &&
          ((c = Td(null, t, e, c[1], n)),
          (c = co(c, e.attrs, n)),
          KS(t, e, n, c));
      } else o = JS(t, e, n);
  }
  return (
    o !== void 0 && (n ? (e.residualClasses = o) : (e.residualStyles = o)), i
  );
}
function XS(t, e, i) {
  let n = i ? e.classBindings : e.styleBindings;
  if (mr(n) !== 0) return t[Ii(n)];
}
function KS(t, e, i, n) {
  let r = i ? e.classBindings : e.styleBindings;
  t[Ii(r)] = n;
}
function JS(t, e, i) {
  let n,
    r = e.directiveEnd;
  for (let o = 1 + e.directiveStylingLast; o < r; o++) {
    let s = t[o].hostAttrs;
    n = co(n, s, i);
  }
  return co(n, e.attrs, i);
}
function Td(t, e, i, n, r) {
  let o = null,
    s = i.directiveEnd,
    a = i.directiveStylingLast;
  for (
    a === -1 ? (a = i.directiveStart) : a++;
    a < s && ((o = e[a]), (n = co(n, o.hostAttrs, r)), o !== t);

  )
    a++;
  return t !== null && (i.directiveStylingLast = a), n;
}
function co(t, e, i) {
  let n = i ? 1 : 2,
    r = -1;
  if (e !== null)
    for (let o = 0; o < e.length; o++) {
      let s = e[o];
      typeof s == 'number'
        ? (r = s)
        : r === n &&
          (Array.isArray(t) || (t = t === void 0 ? [] : ['', t]),
          nf(t, s, i ? !0 : e[++o]));
    }
  return t === void 0 ? null : t;
}
function eT(t, e, i) {
  if (i == null || i === '') return it;
  let n = [],
    r = Xt(i);
  if (Array.isArray(r)) for (let o = 0; o < r.length; o++) t(n, r[o], !0);
  else if (typeof r == 'object')
    for (let o in r) r.hasOwnProperty(o) && t(n, o, r[o]);
  else typeof r == 'string' && e(n, r);
  return n;
}
function tT(t, e, i) {
  let n = String(e);
  n !== '' && !n.includes(' ') && nf(t, n, i);
}
function nT(t, e, i, n, r, o, s, a) {
  r === Un && (r = it);
  let c = 0,
    l = 0,
    d = 0 < r.length ? r[0] : null,
    u = 0 < o.length ? o[0] : null;
  for (; d !== null || u !== null; ) {
    let f = c < r.length ? r[c + 1] : void 0,
      h = l < o.length ? o[l + 1] : void 0,
      m = null,
      g;
    d === u
      ? ((c += 2), (l += 2), f !== h && ((m = u), (g = h)))
      : u === null || (d !== null && d < u)
      ? ((c += 2), (m = d))
      : ((l += 2), (m = u), (g = h)),
      m !== null && n_(t, e, i, n, m, g, s, a),
      (d = c < r.length ? r[c] : null),
      (u = l < o.length ? o[l] : null);
  }
}
function n_(t, e, i, n, r, o, s, a) {
  if (!(e.type & 3)) return;
  let c = t.data,
    l = c[a + 1],
    d = BS(l) ? yg(c, e, i, r, mr(l), s) : void 0;
  if (!ja(d)) {
    ja(o) || (VS(l) && (o = yg(c, null, i, r, a, s)));
    let u = nb(Vn(), i);
    UI(n, s, u, r, o);
  }
}
function yg(t, e, i, n, r, o) {
  let s = e === null,
    a;
  for (; r > 0; ) {
    let c = t[r],
      l = Array.isArray(c),
      d = l ? c[1] : c,
      u = d === null,
      f = i[r + 1];
    f === Un && (f = u ? it : void 0);
    let h = u ? xd(f, n) : d === n ? f : void 0;
    if ((l && !ja(h) && (h = xd(c, n)), ja(h) && ((a = h), s))) return a;
    let m = t[r + 1];
    r = s ? Ii(m) : mr(m);
  }
  if (e !== null) {
    let c = o ? e.residualClasses : e.residualStyles;
    c != null && (a = xd(c, n));
  }
  return a;
}
function ja(t) {
  return t !== void 0;
}
function iT(t, e) {
  return (
    t == null ||
      t === '' ||
      (typeof e == 'string'
        ? (t = t + e)
        : typeof t == 'object' && (t = rt(Xt(t)))),
    t
  );
}
function i_(t, e) {
  return (t.flags & (e ? 8 : 16)) !== 0;
}
function r_(t) {
  let e = t[ro] ?? [],
    n = t[Fe][Ce];
  for (let r of e) rT(r, n);
  t[ro] = it;
}
function rT(t, e) {
  let i = 0,
    n = t.firstChild;
  if (n) {
    let r = t.data[Oa];
    for (; i < r; ) {
      let o = n.nextSibling;
      nv(e, n, !1), (n = o), i++;
    }
  }
}
function o_(t) {
  r_(t);
  for (let e = qe; e < t.length; e++) Ba(t[e]);
}
function Ba(t) {
  let e = t[O];
  for (let i = He; i < e.bindingStartIndex; i++)
    if (Mt(t[i])) {
      let n = t[i];
      o_(n);
    } else Zt(t[i]) && Ba(t[i]);
}
function oT(t) {
  let e = t._views;
  for (let i of e) {
    let n = gM(i);
    if (n !== null && n[_t] !== null)
      if (Zt(n)) Ba(n);
      else {
        let r = n[_t];
        Ba(r), o_(n);
      }
  }
}
var sT = new RegExp(`^(\\d+)*(${_v}|${vv})*(.*)`);
function aT(t) {
  let e = t.match(sT),
    [i, n, r, o] = e,
    s = n ? parseInt(n, 10) : r,
    a = [];
  for (let [c, l, d] of o.matchAll(/(f|n)(\d*)/g)) {
    let u = parseInt(d, 10) || 1;
    a.push(l, u);
  }
  return [s, ...a];
}
function cT(t) {
  return !t.prev && t.parent?.type === 8;
}
function kd(t) {
  return t.index - He;
}
function lc(t, e, i, n) {
  let r = null,
    o = kd(n),
    s = t.data[dM];
  if (s?.[o]) r = dT(s[o], i);
  else if (e.firstChild === n) r = t.firstChild;
  else {
    let a = n.prev === null,
      c = n.prev ?? n.parent;
    if (cT(n)) {
      let l = kd(n.parent);
      r = cu(t, l);
    } else {
      let l = xt(c, i);
      if (a) r = l.firstChild;
      else {
        let d = kd(c),
          u = cu(t, d);
        if (c.type === 2 && u) {
          let h = gf(t, d) + 1;
          r = dc(h, u);
        } else r = l.nextSibling;
      }
    }
  }
  return r;
}
function dc(t, e) {
  let i = e;
  for (let n = 0; n < t; n++) i = i.nextSibling;
  return i;
}
function lT(t, e) {
  let i = t;
  for (let n = 0; n < e.length; n += 2) {
    let r = e[n],
      o = e[n + 1];
    for (let s = 0; s < o; s++)
      switch (r) {
        case au.FirstChild:
          i = i.firstChild;
          break;
        case au.NextSibling:
          i = i.nextSibling;
          break;
      }
  }
  return i;
}
function dT(t, e) {
  let [i, ...n] = aT(t),
    r;
  if (i === vv) r = e[ct][_t];
  else if (i === _v) r = fI(e[ct][_t]);
  else {
    let o = Number(i);
    r = jt(e[o + He]);
  }
  return lT(r, n);
}
function uT(t, e) {
  let i = [];
  for (let n of e)
    for (let r = 0; r < (n[yv] ?? 1); r++) {
      let o = { data: n, firstChild: null };
      n[Oa] > 0 && ((o.firstChild = t), (t = dc(n[Oa], t))), i.push(o);
    }
  return [t, i];
}
var s_ = (t, e) => null;
function fT(t, e) {
  let i = t[ro];
  return !e || i === null || i.length === 0
    ? null
    : i[0].data[lM] === e
    ? i.shift()
    : (r_(t), null);
}
function hT() {
  s_ = fT;
}
function lo(t, e) {
  return s_(t, e);
}
var Du = class {
  destroy(e) {}
  updateValue(e, i) {}
  swap(e, i) {
    let n = Math.min(e, i),
      r = Math.max(e, i),
      o = this.detach(r);
    if (r - n > 1) {
      let s = this.detach(n);
      this.attach(n, o), this.attach(r, s);
    } else this.attach(n, o);
  }
  move(e, i) {
    this.attach(i, this.detach(e));
  }
};
function Ad(t, e, i, n, r) {
  return t === i && Object.is(e, n) ? 1 : Object.is(r(t, e), r(i, n)) ? -1 : 0;
}
function mT(t, e, i) {
  let n,
    r,
    o = 0,
    s = t.length - 1;
  if (Array.isArray(e)) {
    let a = e.length - 1;
    for (; o <= s && o <= a; ) {
      let c = t.at(o),
        l = e[o],
        d = Ad(o, c, o, l, i);
      if (d !== 0) {
        d < 0 && t.updateValue(o, l), o++;
        continue;
      }
      let u = t.at(s),
        f = e[a],
        h = Ad(s, u, a, f, i);
      if (h !== 0) {
        h < 0 && t.updateValue(s, f), s--, a--;
        continue;
      }
      let m = i(o, c),
        g = i(s, u),
        C = i(o, l);
      if (Object.is(C, g)) {
        let E = i(a, f);
        Object.is(E, m)
          ? (t.swap(o, s), t.updateValue(s, f), a--, s--)
          : t.move(s, o),
          t.updateValue(o, l),
          o++;
        continue;
      }
      if (((n ??= new Ua()), (r ??= wg(t, o, s, i)), Iu(t, n, o, C)))
        t.updateValue(o, l), o++, s++;
      else if (r.has(C)) n.set(m, t.detach(o)), s--;
      else {
        let E = t.create(o, e[o]);
        t.attach(o, E), o++, s++;
      }
    }
    for (; o <= a; ) xg(t, n, i, o, e[o]), o++;
  } else if (e != null) {
    let a = e[Symbol.iterator](),
      c = a.next();
    for (; !c.done && o <= s; ) {
      let l = t.at(o),
        d = c.value,
        u = Ad(o, l, o, d, i);
      if (u !== 0) u < 0 && t.updateValue(o, d), o++, (c = a.next());
      else {
        (n ??= new Ua()), (r ??= wg(t, o, s, i));
        let f = i(o, d);
        if (Iu(t, n, o, f)) t.updateValue(o, d), o++, s++, (c = a.next());
        else if (!r.has(f))
          t.attach(o, t.create(o, d)), o++, s++, (c = a.next());
        else {
          let h = i(o, l);
          n.set(h, t.detach(o)), s--;
        }
      }
    }
    for (; !c.done; ) xg(t, n, i, t.length, c.value), (c = a.next());
  }
  for (; o <= s; ) t.destroy(t.detach(s--));
  n?.forEach((a) => {
    t.destroy(a);
  });
}
function Iu(t, e, i, n) {
  return e !== void 0 && e.has(n)
    ? (t.attach(i, e.get(n)), e.delete(n), !0)
    : !1;
}
function xg(t, e, i, n, r) {
  if (Iu(t, e, n, i(n, r))) t.updateValue(n, r);
  else {
    let o = t.create(n, r);
    t.attach(n, o);
  }
}
function wg(t, e, i, n) {
  let r = new Set();
  for (let o = e; o <= i; o++) r.add(n(o, t.at(o)));
  return r;
}
var Ua = class {
  constructor() {
    (this.kvMap = new Map()), (this._vMap = void 0);
  }
  has(e) {
    return this.kvMap.has(e);
  }
  delete(e) {
    if (!this.has(e)) return !1;
    let i = this.kvMap.get(e);
    return (
      this._vMap !== void 0 && this._vMap.has(i)
        ? (this.kvMap.set(e, this._vMap.get(i)), this._vMap.delete(i))
        : this.kvMap.delete(e),
      !0
    );
  }
  get(e) {
    return this.kvMap.get(e);
  }
  set(e, i) {
    if (this.kvMap.has(e)) {
      let n = this.kvMap.get(e);
      this._vMap === void 0 && (this._vMap = new Map());
      let r = this._vMap;
      for (; r.has(n); ) n = r.get(n);
      r.set(n, i);
    } else this.kvMap.set(e, i);
  }
  forEach(e) {
    for (let [i, n] of this.kvMap)
      if ((e(n, i), this._vMap !== void 0)) {
        let r = this._vMap;
        for (; r.has(n); ) (n = r.get(n)), e(n, i);
      }
  }
};
function uc(t, e, i, n) {
  let r = e.tView,
    s = t[F] & 4096 ? 4096 : 16,
    a = sc(
      t,
      r,
      i,
      s,
      null,
      e,
      null,
      null,
      null,
      n?.injector ?? null,
      n?.dehydratedView ?? null
    ),
    c = t[e.index];
  a[po] = c;
  let l = t[Qt];
  return l !== null && (a[Qt] = l.createEmbeddedView(r)), wf(r, a, i), a;
}
function a_(t, e) {
  let i = qe + e;
  if (i < t.length) return t[i];
}
function uo(t, e) {
  return !e || e.firstChild === null || Fa(t);
}
function fc(t, e, i, n = !0) {
  let r = e[O];
  if ((kI(r, e, t, i), n)) {
    let s = Xd(i, t),
      a = e[Ce],
      c = uf(a, t[un]);
    c !== null && MI(r, t[yt], a, e, c, s);
  }
  let o = e[Vt];
  o !== null && o.firstChild !== null && (o.firstChild = null);
}
function c_(t, e) {
  let i = ao(t, e);
  return i !== void 0 && ec(i[O], i), i;
}
var ki = (() => {
  let e = class e {};
  e.__NG_ELEMENT_ID__ = pT;
  let t = e;
  return t;
})();
function pT() {
  let t = ht();
  return d_(t, K());
}
var gT = ki,
  l_ = class extends gT {
    constructor(e, i, n) {
      super(),
        (this._lContainer = e),
        (this._hostTNode = i),
        (this._hostLView = n);
    }
    get element() {
      return _r(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new bi(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let e = ef(this._hostTNode, this._hostLView);
      if (wb(e)) {
        let i = Ta(e, this._hostLView),
          n = Sa(e),
          r = i[O].data[n + 8];
        return new bi(r, i);
      } else return new bi(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(e) {
      let i = Eg(this._lContainer);
      return (i !== null && i[e]) || null;
    }
    get length() {
      return this._lContainer.length - qe;
    }
    createEmbeddedView(e, i, n) {
      let r, o;
      typeof n == 'number'
        ? (r = n)
        : n != null && ((r = n.index), (o = n.injector));
      let s = lo(this._lContainer, e.ssrId),
        a = e.createEmbeddedViewImpl(i || {}, o, s);
      return this.insertImpl(a, r, uo(this._hostTNode, s)), a;
    }
    createComponent(e, i, n, r, o) {
      let s = e && !QD(e),
        a;
      if (s) a = i;
      else {
        let m = i || {};
        (a = m.index),
          (n = m.injector),
          (r = m.projectableNodes),
          (o = m.environmentInjector || m.ngModuleRef);
      }
      let c = s ? e : new hr(Nn(e)),
        l = n || this.parentInjector;
      if (!o && c.ngModule == null) {
        let g = (s ? l : this.parentInjector).get(lt, null);
        g && (o = g);
      }
      let d = Nn(c.componentType ?? {}),
        u = lo(this._lContainer, d?.id ?? null),
        f = u?.firstChild ?? null,
        h = c.create(l, r, f, o);
      return this.insertImpl(h.hostView, a, uo(this._hostTNode, u)), h;
    }
    insert(e, i) {
      return this.insertImpl(e, i, !0);
    }
    insertImpl(e, i, n) {
      let r = e._lView;
      if (hD(r)) {
        let a = this.indexOf(e);
        if (a !== -1) this.detach(a);
        else {
          let c = r[Fe],
            l = new l_(c, c[yt], c[Fe]);
          l.detach(l.indexOf(e));
        }
      }
      let o = this._adjustIndex(i),
        s = this._lContainer;
      return fc(s, r, o, n), e.attachToViewContainerRef(), Rb(Rd(s), o, e), e;
    }
    move(e, i) {
      return this.insert(e, i);
    }
    indexOf(e) {
      let i = Eg(this._lContainer);
      return i !== null ? i.indexOf(e) : -1;
    }
    remove(e) {
      let i = this._adjustIndex(e, -1),
        n = ao(this._lContainer, i);
      n && (Aa(Rd(this._lContainer), i), ec(n[O], n));
    }
    detach(e) {
      let i = this._adjustIndex(e, -1),
        n = ao(this._lContainer, i);
      return n && Aa(Rd(this._lContainer), i) != null ? new Di(n) : null;
    }
    _adjustIndex(e, i = 0) {
      return e ?? this.length + i;
    }
  };
function Eg(t) {
  return t[Ia];
}
function Rd(t) {
  return t[Ia] || (t[Ia] = []);
}
function d_(t, e) {
  let i,
    n = e[t.index];
  return (
    Mt(n) ? (i = n) : ((i = Uv(n, e, null, t)), (e[t.index] = i), ac(e, i)),
    u_(i, e, t, n),
    new l_(i, t, e)
  );
}
function bT(t, e) {
  let i = t[Ce],
    n = i.createComment(''),
    r = xt(e, t),
    o = uf(i, r);
  return Na(i, o, n, PI(i, r), !1), n;
}
var u_ = f_,
  Ef = (t, e, i) => !1;
function vT(t, e, i) {
  return Ef(t, e, i);
}
function f_(t, e, i, n) {
  if (t[un]) return;
  let r;
  i.type & 8 ? (r = jt(n)) : (r = bT(e, i)), (t[un] = r);
}
function _T(t, e, i) {
  if (t[un] && t[ro]) return !0;
  let n = i[Vt],
    r = e.index - He;
  if (!n || pI(e) || rc(n, r)) return !1;
  let s = cu(n, r),
    a = n.data[mf]?.[r],
    [c, l] = uT(s, a);
  return (t[un] = c), (t[ro] = l), !0;
}
function yT(t, e, i, n) {
  Ef(t, i, e) || f_(t, e, i, n);
}
function xT() {
  (u_ = yT), (Ef = _T);
}
function wT(t, e, i, n, r, o, s, a, c) {
  let l = e.consts,
    d = Co(e, t, 4, s || null, Ma(l, a));
  Lv(e, i, d, Ma(l, c)), Ju(e, d);
  let u = (d.tView = bf(
    2,
    d,
    n,
    r,
    o,
    e.directiveRegistry,
    e.pipeRegistry,
    null,
    e.schemas,
    l,
    null
  ));
  return (
    e.queries !== null &&
      (e.queries.template(e, d), (u.queries = e.queries.embeddedTView(d))),
    d
  );
}
function _e(t, e, i, n, r, o, s, a) {
  let c = K(),
    l = Qe(),
    d = t + He,
    u = l.firstCreatePass ? wT(d, l, c, e, i, n, r, o, s) : l.data[d];
  bo(u, !1);
  let f = h_(l, c, u, t);
  Ku() && ff(l, c, f, u), Ei(f, c);
  let h = Uv(f, c, f, u);
  return (
    (c[d] = h),
    ac(c, h),
    vT(h, u, c),
    $u(u) && Rv(l, c, u),
    s != null && Fv(c, u, a),
    _e
  );
}
var h_ = m_;
function m_(t, e, i, n) {
  return jn(!0), e[Ce].createComment('');
}
function ET(t, e, i, n) {
  let r = e[Vt],
    o = !r || gr() || rc(r, n);
  if ((jn(o), o)) return m_(t, e, i, n);
  let s = r.data[cM]?.[n] ?? null;
  s !== null &&
    i.tView !== null &&
    i.tView.ssrId === null &&
    (i.tView.ssrId = s);
  let a = lc(r, t, e, i);
  ic(r, n, a);
  let c = gf(r, n);
  return dc(c, a);
}
function CT() {
  h_ = ET;
}
function Te(t, e, i) {
  Hn('NgControlFlow');
  let n = K(),
    r = br(),
    o = ku(n, He + t),
    s = 0;
  if ($n(n, r, e)) {
    let a = Ge(null);
    try {
      if ((c_(o, s), e !== -1)) {
        let c = Au(n[O], He + e),
          l = lo(o, c.tView.ssrId),
          d = uc(n, c, i, { dehydratedView: l });
        fc(o, d, s, uo(c, l));
      }
    } finally {
      Ge(a);
    }
  } else {
    let a = a_(o, s);
    a !== void 0 && (a[Xe] = i);
  }
}
var Mu = class {
  constructor(e, i, n) {
    (this.lContainer = e), (this.$implicit = i), (this.$index = n);
  }
  get $count() {
    return this.lContainer.length - qe;
  }
};
function p_(t, e) {
  return e;
}
var Su = class {
  constructor(e, i, n) {
    (this.hasEmptyBlock = e), (this.trackByFn = i), (this.liveCollection = n);
  }
};
function g_(t, e, i, n, r, o, s, a, c, l, d) {
  Hn('NgControlFlow');
  let u = c !== void 0,
    f = K(),
    h = a ? s.bind(f[ct][Xe]) : s,
    m = new Su(u, h);
  (f[He + t] = m), _e(t + 1, e, i, n, r, o), u && _e(t + 2, c, l, d);
}
var Tu = class extends Du {
  constructor(e, i, n) {
    super(),
      (this.lContainer = e),
      (this.hostLView = i),
      (this.templateTNode = n),
      (this.needsIndexUpdate = !1);
  }
  get length() {
    return this.lContainer.length - qe;
  }
  at(e) {
    return this.getLView(e)[Xe].$implicit;
  }
  attach(e, i) {
    let n = i[Vt];
    (this.needsIndexUpdate ||= e !== this.length),
      fc(this.lContainer, i, e, uo(this.templateTNode, n));
  }
  detach(e) {
    return (
      (this.needsIndexUpdate ||= e !== this.length - 1), DT(this.lContainer, e)
    );
  }
  create(e, i) {
    let n = lo(this.lContainer, this.templateTNode.tView.ssrId);
    return uc(
      this.hostLView,
      this.templateTNode,
      new Mu(this.lContainer, i, e),
      { dehydratedView: n }
    );
  }
  destroy(e) {
    ec(e[O], e);
  }
  updateValue(e, i) {
    this.getLView(e)[Xe].$implicit = i;
  }
  reset() {
    this.needsIndexUpdate = !1;
  }
  updateIndexes() {
    if (this.needsIndexUpdate)
      for (let e = 0; e < this.length; e++) this.getLView(e)[Xe].$index = e;
  }
  getLView(e) {
    return IT(this.lContainer, e);
  }
};
function b_(t) {
  let e = Ge(null),
    i = Vn();
  try {
    let n = K(),
      r = n[O],
      o = n[i];
    if (o.liveCollection === void 0) {
      let a = i + 1,
        c = ku(n, a),
        l = Au(r, a);
      o.liveCollection = new Tu(c, n, l);
    } else o.liveCollection.reset();
    let s = o.liveCollection;
    if ((mT(s, t, o.trackByFn), s.updateIndexes(), o.hasEmptyBlock)) {
      let a = br(),
        c = s.length === 0;
      if ($n(n, a, c)) {
        let l = i + 2,
          d = ku(n, l);
        if (c) {
          let u = Au(r, l),
            f = lo(d, u.tView.ssrId),
            h = uc(n, u, void 0, { dehydratedView: f });
          fc(d, h, 0, uo(u, f));
        } else c_(d, 0);
      }
    }
  } finally {
    Ge(e);
  }
}
function ku(t, e) {
  return t[e];
}
function DT(t, e) {
  return ao(t, e);
}
function IT(t, e) {
  return a_(t, e);
}
function Au(t, e) {
  return zu(t, e);
}
function MT(t, e, i, n, r, o) {
  let s = e.consts,
    a = Ma(s, r),
    c = Co(e, t, 2, n, a);
  return (
    Lv(e, i, c, Ma(s, o)),
    c.attrs !== null && _u(c, c.attrs, !1),
    c.mergedAttrs !== null && _u(c, c.mergedAttrs, !0),
    e.queries !== null && e.queries.elementStart(e, c),
    c
  );
}
function S(t, e, i, n) {
  let r = K(),
    o = Qe(),
    s = He + t,
    a = r[Ce],
    c = o.firstCreatePass ? MT(s, o, r, e, i, n) : o.data[s],
    l = v_(o, r, c, a, e, t);
  r[s] = l;
  let d = $u(c);
  return (
    bo(c, !0),
    sv(a, l, c),
    (c.flags & 32) !== 32 && Ku() && ff(o, r, l, c),
    bD() === 0 && Ei(l, r),
    vD(),
    d && (Rv(o, r, c), Av(o, c, r)),
    n !== null && Fv(r, c),
    S
  );
}
function k() {
  let t = ht();
  cb() ? lb() : ((t = t.parent), bo(t, !1));
  let e = t;
  yD(e) && wD(), _D();
  let i = Qe();
  return (
    i.firstCreatePass && (Ju(i, t), Yg(t) && i.queries.elementEnd(t)),
    e.classesWithoutHost != null &&
      PD(e) &&
      Cu(i, e, K(), e.classesWithoutHost, !0),
    e.stylesWithoutHost != null &&
      LD(e) &&
      Cu(i, e, K(), e.stylesWithoutHost, !1),
    k
  );
}
function j(t, e, i, n) {
  return S(t, e, i, n), k(), j;
}
var v_ = (t, e, i, n, r, o) => (jn(!0), df(n, r, _b()));
function ST(t, e, i, n, r, o) {
  let s = e[Vt],
    a = !s || gr() || rc(s, o);
  if ((jn(a), a)) return df(n, r, _b());
  let c = lc(s, t, e, i);
  return (
    Ev(s, o) && ic(s, o, c.nextSibling),
    s && ($b(i) || zb(c)) && go(i) && (xD(i), iv(c)),
    c
  );
}
function TT() {
  v_ = ST;
}
var kT = (t, e, i, n) => (jn(!0), Yb(e[Ce], ''));
function AT(t, e, i, n) {
  let r,
    o = e[Vt],
    s = !o || gr();
  if ((jn(s), s)) return Yb(e[Ce], '');
  let a = lc(o, t, e, i),
    c = _M(o, n);
  return ic(o, n, a), (r = dc(c, a)), r;
}
function RT() {
  kT = AT;
}
function Cf() {
  return K();
}
function zn(t, e, i) {
  let n = K(),
    r = br();
  if ($n(n, r, e)) {
    let o = Qe(),
      s = Xu();
    Pv(o, s, n, t, e, n[Ce], i, !0);
  }
  return zn;
}
var Ha = 'en-US';
var FT = Ha;
function NT(t) {
  AC(t, 'Expected localeId to be defined'),
    typeof t == 'string' && (FT = t.toLowerCase().replace(/_/g, '-'));
}
function Ai(t) {
  return !!t && typeof t.then == 'function';
}
function __(t) {
  return !!t && typeof t.subscribe == 'function';
}
function ye(t, e, i, n) {
  let r = K(),
    o = Qe(),
    s = ht();
  return PT(o, r, r[Ce], s, t, e, n), ye;
}
function OT(t, e, i, n) {
  let r = t.cleanup;
  if (r != null)
    for (let o = 0; o < r.length - 1; o += 2) {
      let s = r[o];
      if (s === i && r[o + 1] === n) {
        let a = e[no],
          c = r[o + 2];
        return a.length > c ? a[c] : null;
      }
      typeof s == 'string' && (o += 2);
    }
  return null;
}
function PT(t, e, i, n, r, o, s) {
  let a = $u(n),
    l = t.firstCreatePass && zv(t),
    d = e[Xe],
    u = $v(e),
    f = !0;
  if (n.type & 3 || s) {
    let g = xt(n, e),
      C = s ? s(g) : g,
      E = u.length,
      N = s ? (ie) => s(jt(ie[n.index])) : n.index,
      ce = null;
    if ((!s && a && (ce = OT(t, e, r, n.index)), ce !== null)) {
      let ie = ce.__ngLastListenerFn__ || ce;
      (ie.__ngNextListenerFn__ = o), (ce.__ngLastListenerFn__ = o), (f = !1);
    } else {
      o = Dg(n, e, d, o, !1);
      let ie = i.listen(C, r, o);
      u.push(o, ie), l && l.push(r, N, E, E + 1);
    }
  } else o = Dg(n, e, d, o, !1);
  let h = n.outputs,
    m;
  if (f && h !== null && (m = h[r])) {
    let g = m.length;
    if (g)
      for (let C = 0; C < g; C += 2) {
        let E = m[C],
          N = m[C + 1],
          fe = e[E][N].subscribe(o),
          re = u.length;
        u.push(o, fe), l && l.push(r, n.index, re, -(re + 1));
      }
  }
}
function Cg(t, e, i, n) {
  try {
    return Gt(6, e, i), i(n) !== !1;
  } catch (r) {
    return Wv(t, r), !1;
  } finally {
    Gt(7, e, i);
  }
}
function Dg(t, e, i, n, r) {
  return function o(s) {
    if (s === Function) return n;
    let a = t.componentOffset > -1 ? Ln(t.index, e) : e;
    _f(a);
    let c = Cg(e, i, n, s),
      l = o.__ngNextListenerFn__;
    for (; l; ) (c = Cg(e, i, l, s) && c), (l = l.__ngNextListenerFn__);
    return r && c === !1 && s.preventDefault(), c;
  };
}
function Ne(t = 1) {
  return AD(t);
}
function LT(t, e) {
  let i = null,
    n = ZC(t);
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    if (o === '*') {
      i = r;
      continue;
    }
    if (n === null ? Ug(t, o, !0) : KC(n, o)) return r;
  }
  return i;
}
function Je(t) {
  let e = K()[ct][yt];
  if (!e.projection) {
    let i = t ? t.length : 1,
      n = (e.projection = Fb(i, null)),
      r = n.slice(),
      o = e.child;
    for (; o !== null; ) {
      let s = t ? LT(o, t) : 0;
      s !== null && (r[s] ? (r[s].projectionNext = o) : (n[s] = o), (r[s] = o)),
        (o = o.next);
    }
  }
}
function oe(t, e = 0, i) {
  let n = K(),
    r = Qe(),
    o = Co(r, He + t, 16, null, i || null);
  o.projection === null && (o.projection = e),
    lb(),
    (!n[Vt] || gr()) && (o.flags & 32) !== 32 && jI(r, n, o);
}
function bn(t) {
  let e = CD();
  return uD(e, He + t);
}
function We(t, e = '') {
  let i = K(),
    n = Qe(),
    r = t + He,
    o = n.firstCreatePass ? Co(n, r, 1, e, null) : n.data[r],
    s = y_(n, i, o, e, t);
  (i[r] = s), Ku() && ff(n, i, s, o), bo(o, !1);
}
var y_ = (t, e, i, n, r) => (jn(!0), Zb(e[Ce], n));
function VT(t, e, i, n, r) {
  let o = e[Vt],
    s = !o || gr() || rc(o, r);
  return jn(s), s ? Zb(e[Ce], n) : lc(o, t, e, i);
}
function jT() {
  y_ = VT;
}
function Do(t) {
  return Io('', t, ''), Do;
}
function Io(t, e, i) {
  let n = K(),
    r = LS(n, t, e, i);
  return r !== Un && rS(n, Vn(), r), Io;
}
function BT(t, e, i) {
  let n = Qe();
  if (n.firstCreatePass) {
    let r = On(t);
    Ru(i, n.data, n.blueprint, r, !0), Ru(e, n.data, n.blueprint, r, !1);
  }
}
function Ru(t, e, i, n, r) {
  if (((t = nt(t)), Array.isArray(t)))
    for (let o = 0; o < t.length; o++) Ru(t[o], e, i, n, r);
  else {
    let o = Qe(),
      s = K(),
      a = ht(),
      c = fr(t) ? t : nt(t.provide),
      l = jb(t),
      d = a.providerIndexes & 1048575,
      u = a.directiveStart,
      f = a.providerIndexes >> 20;
    if (fr(t) || !t.multi) {
      let h = new yi(l, r, p),
        m = Nd(c, e, r ? d : d + f, u);
      m === -1
        ? (Wd(ka(a, s), o, c),
          Fd(o, t, e.length),
          e.push(c),
          a.directiveStart++,
          a.directiveEnd++,
          r && (a.providerIndexes += 1048576),
          i.push(h),
          s.push(h))
        : ((i[m] = h), (s[m] = h));
    } else {
      let h = Nd(c, e, d + f, u),
        m = Nd(c, e, d, d + f),
        g = h >= 0 && i[h],
        C = m >= 0 && i[m];
      if ((r && !C) || (!r && !g)) {
        Wd(ka(a, s), o, c);
        let E = $T(r ? HT : UT, i.length, r, n, l);
        !r && C && (i[m].providerFactory = E),
          Fd(o, t, e.length, 0),
          e.push(c),
          a.directiveStart++,
          a.directiveEnd++,
          r && (a.providerIndexes += 1048576),
          i.push(E),
          s.push(E);
      } else {
        let E = x_(i[r ? m : h], l, !r && n);
        Fd(o, t, h > -1 ? h : m, E);
      }
      !r && n && C && i[m].componentProviders++;
    }
  }
}
function Fd(t, e, i, n) {
  let r = fr(e),
    o = iI(e);
  if (r || o) {
    let c = (o ? nt(e.useClass) : e).prototype.ngOnDestroy;
    if (c) {
      let l = t.destroyHooks || (t.destroyHooks = []);
      if (!r && e.multi) {
        let d = l.indexOf(i);
        d === -1 ? l.push(i, [n, c]) : l[d + 1].push(n, c);
      } else l.push(i, c);
    }
  }
}
function x_(t, e, i) {
  return i && t.componentProviders++, t.multi.push(e) - 1;
}
function Nd(t, e, i, n) {
  for (let r = i; r < n; r++) if (e[r] === t) return r;
  return -1;
}
function UT(t, e, i, n) {
  return Fu(this.multi, []);
}
function HT(t, e, i, n) {
  let r = this.multi,
    o;
  if (this.providerFactory) {
    let s = this.providerFactory.componentProviders,
      a = xi(i, i[O], this.providerFactory.index, n);
    (o = a.slice(0, s)), Fu(r, o);
    for (let c = s; c < a.length; c++) o.push(a[c]);
  } else (o = []), Fu(r, o);
  return o;
}
function Fu(t, e) {
  for (let i = 0; i < t.length; i++) {
    let n = t[i];
    e.push(n());
  }
  return e;
}
function $T(t, e, i, n, r) {
  let o = new yi(t, i, p);
  return (
    (o.multi = []),
    (o.index = e),
    (o.componentProviders = 0),
    x_(o, r, n && !i),
    o
  );
}
function Pe(t, e = []) {
  return (i) => {
    i.providersResolver = (n, r) => BT(n, r ? r(t) : t, e);
  };
}
var Pn = class {},
  fo = class {};
var Nu = class extends Pn {
    constructor(e, i, n) {
      super(),
        (this._parent = i),
        (this._bootstrapComponents = []),
        (this.destroyCbs = []),
        (this.componentFactoryResolver = new Va(this));
      let r = Wg(e);
      (this._bootstrapComponents = Hb(r.bootstrap)),
        (this._r3Injector = Bb(
          e,
          i,
          [
            { provide: Pn, useValue: this },
            { provide: oc, useValue: this.componentFactoryResolver },
            ...n,
          ],
          rt(e),
          new Set(['environment'])
        )),
        this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(e));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let e = this._r3Injector;
      !e.destroyed && e.destroy(),
        this.destroyCbs.forEach((i) => i()),
        (this.destroyCbs = null);
    }
    onDestroy(e) {
      this.destroyCbs.push(e);
    }
  },
  Ou = class extends fo {
    constructor(e) {
      super(), (this.moduleType = e);
    }
    create(e) {
      return new Nu(this.moduleType, e, []);
    }
  };
var $a = class extends Pn {
  constructor(e) {
    super(),
      (this.componentFactoryResolver = new Va(this)),
      (this.instance = null);
    let i = new so(
      [
        ...e.providers,
        { provide: Pn, useValue: this },
        { provide: oc, useValue: this.componentFactoryResolver },
      ],
      e.parent || sf(),
      e.debugName,
      new Set(['environment'])
    );
    (this.injector = i),
      e.runEnvironmentInitializers && i.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(e) {
    this.injector.onDestroy(e);
  }
};
function hc(t, e, i = null) {
  return new $a({
    providers: t,
    parent: e,
    debugName: i,
    runEnvironmentInitializers: !0,
  }).injector;
}
var zT = (() => {
  let e = class e {
    constructor(n) {
      (this._injector = n), (this.cachedInjectors = new Map());
    }
    getOrCreateStandaloneInjector(n) {
      if (!n.standalone) return null;
      if (!this.cachedInjectors.has(n)) {
        let r = Pb(!1, n.type),
          o =
            r.length > 0
              ? hc([r], this._injector, `Standalone[${n.type.name}]`)
              : null;
        this.cachedInjectors.set(n, o);
      }
      return this.cachedInjectors.get(n);
    }
    ngOnDestroy() {
      try {
        for (let n of this.cachedInjectors.values()) n !== null && n.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
  };
  e.ɵprov = y({
    token: e,
    providedIn: 'environment',
    factory: () => new e(v(lt)),
  });
  let t = e;
  return t;
})();
function mc(t) {
  Hn('NgStandalone'),
    (t.getStandaloneInjector = (e) =>
      e.get(zT).getOrCreateStandaloneInjector(t));
}
function WT() {
  return this._results[Symbol.iterator]();
}
var za = class t {
    get changes() {
      return (this._changes ??= new Y());
    }
    constructor(e = !1) {
      (this._emitDistinctChangesOnly = e),
        (this.dirty = !0),
        (this._results = []),
        (this._changesDetected = !1),
        (this._changes = void 0),
        (this.length = 0),
        (this.first = void 0),
        (this.last = void 0);
      let i = t.prototype;
      i[Symbol.iterator] || (i[Symbol.iterator] = WT);
    }
    get(e) {
      return this._results[e];
    }
    map(e) {
      return this._results.map(e);
    }
    filter(e) {
      return this._results.filter(e);
    }
    find(e) {
      return this._results.find(e);
    }
    reduce(e, i) {
      return this._results.reduce(e, i);
    }
    forEach(e) {
      this._results.forEach(e);
    }
    some(e) {
      return this._results.some(e);
    }
    toArray() {
      return this._results.slice();
    }
    toString() {
      return this._results.toString();
    }
    reset(e, i) {
      this.dirty = !1;
      let n = YD(e);
      (this._changesDetected = !ZD(this._results, n, i)) &&
        ((this._results = n),
        (this.length = n.length),
        (this.last = n[this.length - 1]),
        (this.first = n[0]));
    }
    notifyOnChanges() {
      this._changes !== void 0 &&
        (this._changesDetected || !this._emitDistinctChangesOnly) &&
        this._changes.emit(this);
    }
    setDirty() {
      this.dirty = !0;
    }
    destroy() {
      this._changes !== void 0 &&
        (this._changes.complete(), this._changes.unsubscribe());
    }
  },
  ho = (() => {
    let e = class e {};
    e.__NG_ELEMENT_ID__ = QT;
    let t = e;
    return t;
  })(),
  GT = ho,
  qT = class extends GT {
    constructor(e, i, n) {
      super(),
        (this._declarationLView = e),
        (this._declarationTContainer = i),
        (this.elementRef = n);
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(e, i) {
      return this.createEmbeddedViewImpl(e, i);
    }
    createEmbeddedViewImpl(e, i, n) {
      let r = uc(this._declarationLView, this._declarationTContainer, e, {
        injector: i,
        dehydratedView: n,
      });
      return new Di(r);
    }
  };
function QT() {
  return pc(ht(), K());
}
function pc(t, e) {
  return t.type & 4 ? new qT(e, t, _r(t, e)) : null;
}
var Pu = class t {
    constructor(e) {
      (this.queryList = e), (this.matches = null);
    }
    clone() {
      return new t(this.queryList);
    }
    setDirty() {
      this.queryList.setDirty();
    }
  },
  Lu = class t {
    constructor(e = []) {
      this.queries = e;
    }
    createEmbeddedView(e) {
      let i = e.queries;
      if (i !== null) {
        let n = e.contentQueries !== null ? e.contentQueries[0] : i.length,
          r = [];
        for (let o = 0; o < n; o++) {
          let s = i.getByIndex(o),
            a = this.queries[s.indexInDeclarationView];
          r.push(a.clone());
        }
        return new t(r);
      }
      return null;
    }
    insertView(e) {
      this.dirtyQueriesWithMatches(e);
    }
    detachView(e) {
      this.dirtyQueriesWithMatches(e);
    }
    dirtyQueriesWithMatches(e) {
      for (let i = 0; i < this.queries.length; i++)
        D_(e, i).matches !== null && this.queries[i].setDirty();
    }
  },
  Wa = class {
    constructor(e, i, n = null) {
      (this.predicate = e), (this.flags = i), (this.read = n);
    }
  },
  Vu = class t {
    constructor(e = []) {
      this.queries = e;
    }
    elementStart(e, i) {
      for (let n = 0; n < this.queries.length; n++)
        this.queries[n].elementStart(e, i);
    }
    elementEnd(e) {
      for (let i = 0; i < this.queries.length; i++)
        this.queries[i].elementEnd(e);
    }
    embeddedTView(e) {
      let i = null;
      for (let n = 0; n < this.length; n++) {
        let r = i !== null ? i.length : 0,
          o = this.getByIndex(n).embeddedTView(e, r);
        o &&
          ((o.indexInDeclarationView = n), i !== null ? i.push(o) : (i = [o]));
      }
      return i !== null ? new t(i) : null;
    }
    template(e, i) {
      for (let n = 0; n < this.queries.length; n++)
        this.queries[n].template(e, i);
    }
    getByIndex(e) {
      return this.queries[e];
    }
    get length() {
      return this.queries.length;
    }
    track(e) {
      this.queries.push(e);
    }
  },
  ju = class t {
    constructor(e, i = -1) {
      (this.metadata = e),
        (this.matches = null),
        (this.indexInDeclarationView = -1),
        (this.crossesNgTemplate = !1),
        (this._appliesToNextNode = !0),
        (this._declarationNodeIndex = i);
    }
    elementStart(e, i) {
      this.isApplyingToNode(i) && this.matchTNode(e, i);
    }
    elementEnd(e) {
      this._declarationNodeIndex === e.index && (this._appliesToNextNode = !1);
    }
    template(e, i) {
      this.elementStart(e, i);
    }
    embeddedTView(e, i) {
      return this.isApplyingToNode(e)
        ? ((this.crossesNgTemplate = !0),
          this.addMatch(-e.index, i),
          new t(this.metadata))
        : null;
    }
    isApplyingToNode(e) {
      if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
        let i = this._declarationNodeIndex,
          n = e.parent;
        for (; n !== null && n.type & 8 && n.index !== i; ) n = n.parent;
        return i === (n !== null ? n.index : -1);
      }
      return this._appliesToNextNode;
    }
    matchTNode(e, i) {
      let n = this.metadata.predicate;
      if (Array.isArray(n))
        for (let r = 0; r < n.length; r++) {
          let o = n[r];
          this.matchTNodeWithReadOption(e, i, ZT(i, o)),
            this.matchTNodeWithReadOption(e, i, ya(i, e, o, !1, !1));
        }
      else
        n === ho
          ? i.type & 4 && this.matchTNodeWithReadOption(e, i, -1)
          : this.matchTNodeWithReadOption(e, i, ya(i, e, n, !1, !1));
    }
    matchTNodeWithReadOption(e, i, n) {
      if (n !== null) {
        let r = this.metadata.read;
        if (r !== null)
          if (r === z || r === ki || (r === ho && i.type & 4))
            this.addMatch(i.index, -2);
          else {
            let o = ya(i, e, r, !1, !1);
            o !== null && this.addMatch(i.index, o);
          }
        else this.addMatch(i.index, n);
      }
    }
    addMatch(e, i) {
      this.matches === null ? (this.matches = [e, i]) : this.matches.push(e, i);
    }
  };
function ZT(t, e) {
  let i = t.localNames;
  if (i !== null) {
    for (let n = 0; n < i.length; n += 2) if (i[n] === e) return i[n + 1];
  }
  return null;
}
function YT(t, e) {
  return t.type & 11 ? _r(t, e) : t.type & 4 ? pc(t, e) : null;
}
function XT(t, e, i, n) {
  return i === -1 ? YT(e, t) : i === -2 ? KT(t, e, n) : xi(t, t[O], i, e);
}
function KT(t, e, i) {
  if (i === z) return _r(e, t);
  if (i === ho) return pc(e, t);
  if (i === ki) return d_(e, t);
}
function w_(t, e, i, n) {
  let r = e[Qt].queries[n];
  if (r.matches === null) {
    let o = t.data,
      s = i.matches,
      a = [];
    for (let c = 0; c < s.length; c += 2) {
      let l = s[c];
      if (l < 0) a.push(null);
      else {
        let d = o[l];
        a.push(XT(e, d, s[c + 1], i.metadata.read));
      }
    }
    r.matches = a;
  }
  return r.matches;
}
function Bu(t, e, i, n) {
  let r = t.queries.getByIndex(i),
    o = r.matches;
  if (o !== null) {
    let s = w_(t, e, r, i);
    for (let a = 0; a < o.length; a += 2) {
      let c = o[a];
      if (c > 0) n.push(s[a / 2]);
      else {
        let l = o[a + 1],
          d = e[-c];
        for (let u = qe; u < d.length; u++) {
          let f = d[u];
          f[po] === f[Fe] && Bu(f[O], f, l, n);
        }
        if (d[lr] !== null) {
          let u = d[lr];
          for (let f = 0; f < u.length; f++) {
            let h = u[f];
            Bu(h[O], h, l, n);
          }
        }
      }
    }
  }
  return n;
}
function J(t) {
  let e = K(),
    i = Qe(),
    n = ub();
  Qu(n + 1);
  let r = D_(i, n);
  if (t.dirty && fD(e) === ((r.metadata.flags & 2) === 2)) {
    if (r.matches === null) t.reset([]);
    else {
      let o = r.crossesNgTemplate ? Bu(i, e, n, []) : w_(i, e, r, n);
      t.reset(o, EM), t.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function ke(t, e, i) {
  let n = Qe();
  n.firstCreatePass &&
    (C_(n, new Wa(t, e, i), -1), (e & 2) === 2 && (n.staticViewQueries = !0)),
    E_(n, K(), e);
}
function mt(t, e, i, n) {
  let r = Qe();
  if (r.firstCreatePass) {
    let o = ht();
    C_(r, new Wa(e, i, n), o.index),
      ek(r, t),
      (i & 2) === 2 && (r.staticContentQueries = !0);
  }
  E_(r, K(), i);
}
function ee() {
  return JT(K(), ub());
}
function JT(t, e) {
  return t[Qt].queries[e].queryList;
}
function E_(t, e, i) {
  let n = new za((i & 4) === 4);
  jM(t, e, n, n.destroy),
    e[Qt] === null && (e[Qt] = new Lu()),
    e[Qt].queries.push(new Pu(n));
}
function C_(t, e, i) {
  t.queries === null && (t.queries = new Vu()), t.queries.track(new ju(e, i));
}
function ek(t, e) {
  let i = t.contentQueries || (t.contentQueries = []),
    n = i.length ? i[i.length - 1] : -1;
  e !== n && i.push(t.queries.length - 1, e);
}
function D_(t, e) {
  return t.queries.getByIndex(e);
}
function I_(t, e) {
  return pc(t, e);
}
var gc = (() => {
    let e = class e {
      log(n) {
        console.log(n);
      }
      warn(n) {
        console.warn(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'platform' }));
    let t = e;
    return t;
  })(),
  Uu = class {
    constructor(e, i) {
      (this.ngModuleFactory = e), (this.componentFactories = i);
    }
  },
  bc = (() => {
    let e = class e {
      compileModuleSync(n) {
        return new Ou(n);
      }
      compileModuleAsync(n) {
        return Promise.resolve(this.compileModuleSync(n));
      }
      compileModuleAndAllComponentsSync(n) {
        let r = this.compileModuleSync(n),
          o = Wg(n),
          s = Hb(o.declarations).reduce((a, c) => {
            let l = Nn(c);
            return l && a.push(new hr(l)), a;
          }, []);
        return new Uu(r, s);
      }
      compileModuleAndAllComponentsAsync(n) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
      }
      clearCache() {}
      clearCacheFor(n) {}
      getModuleId(n) {}
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })();
var Mo = (() => {
  let e = class e {
    constructor() {
      (this.taskId = 0),
        (this.pendingTasks = new Set()),
        (this.hasPendingTasks = new Ve(!1));
    }
    get _hasPendingTasks() {
      return this.hasPendingTasks.value;
    }
    add() {
      this._hasPendingTasks || this.hasPendingTasks.next(!0);
      let n = this.taskId++;
      return this.pendingTasks.add(n), n;
    }
    remove(n) {
      this.pendingTasks.delete(n),
        this.pendingTasks.size === 0 &&
          this._hasPendingTasks &&
          this.hasPendingTasks.next(!1);
    }
    ngOnDestroy() {
      this.pendingTasks.clear(),
        this._hasPendingTasks && this.hasPendingTasks.next(!1);
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
var M_ = new w('');
var vc = new w('Application Initializer'),
  S_ = (() => {
    let e = class e {
      constructor() {
        (this.initialized = !1),
          (this.done = !1),
          (this.donePromise = new Promise((n, r) => {
            (this.resolve = n), (this.reject = r);
          })),
          (this.appInits = b(vc, { optional: !0 }) ?? []);
      }
      runInitializers() {
        if (this.initialized) return;
        let n = [];
        for (let o of this.appInits) {
          let s = o();
          if (Ai(s)) n.push(s);
          else if (__(s)) {
            let a = new Promise((c, l) => {
              s.subscribe({ complete: c, error: l });
            });
            n.push(a);
          }
        }
        let r = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(n)
          .then(() => {
            r();
          })
          .catch((o) => {
            this.reject(o);
          }),
          n.length === 0 && r(),
          (this.initialized = !0);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  Ri = new w('appBootstrapListener');
function tk() {
  vp(() => {
    throw new _(600, !1);
  });
}
function nk(t) {
  return t.isBoundToModule;
}
function ik(t, e, i) {
  try {
    let n = i();
    return Ai(n)
      ? n.catch((r) => {
          throw (e.runOutsideAngular(() => t.handleError(r)), r);
        })
      : n;
  } catch (n) {
    throw (e.runOutsideAngular(() => t.handleError(n)), n);
  }
}
var Jt = (() => {
  let e = class e {
    constructor() {
      (this._bootstrapListeners = []),
        (this._runningTick = !1),
        (this._destroyed = !1),
        (this._destroyListeners = []),
        (this._views = []),
        (this.internalErrorHandler = b(Dv)),
        (this.componentTypes = []),
        (this.components = []),
        (this.isStable = b(Mo).hasPendingTasks.pipe(A((n) => !n))),
        (this._injector = b(lt));
    }
    get destroyed() {
      return this._destroyed;
    }
    get injector() {
      return this._injector;
    }
    bootstrap(n, r) {
      let o = n instanceof Pa;
      if (!this._injector.get(S_).done) {
        let m =
          'Cannot bootstrap as there are still asynchronous initializers running.' +
          (!o && zg(n)
            ? ''
            : ' Bootstrap components in the `ngDoBootstrap` method of the root module.');
        throw new _(405, !1);
      }
      let a;
      o ? (a = n) : (a = this._injector.get(oc).resolveComponentFactory(n)),
        this.componentTypes.push(a.componentType);
      let c = nk(a) ? void 0 : this._injector.get(Pn),
        l = r || a.selector,
        d = a.create(St.NULL, [], l, c),
        u = d.location.nativeElement,
        f = d.injector.get(M_, null);
      return (
        f?.registerApplication(u),
        d.onDestroy(() => {
          this.detachView(d.hostView),
            Od(this.components, d),
            f?.unregisterApplication(u);
        }),
        this._loadComponent(d),
        d
      );
    }
    tick() {
      if (this._runningTick) throw new _(101, !1);
      try {
        this._runningTick = !0;
        for (let n of this._views) n.detectChanges();
      } catch (n) {
        this.internalErrorHandler(n);
      } finally {
        this._runningTick = !1;
      }
    }
    attachView(n) {
      let r = n;
      this._views.push(r), r.attachToAppRef(this);
    }
    detachView(n) {
      let r = n;
      Od(this._views, r), r.detachFromAppRef();
    }
    _loadComponent(n) {
      this.attachView(n.hostView), this.tick(), this.components.push(n);
      let r = this._injector.get(Ri, []);
      [...this._bootstrapListeners, ...r].forEach((o) => o(n));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach((n) => n()),
            this._views.slice().forEach((n) => n.destroy());
        } finally {
          (this._destroyed = !0),
            (this._views = []),
            (this._bootstrapListeners = []),
            (this._destroyListeners = []);
        }
    }
    onDestroy(n) {
      return (
        this._destroyListeners.push(n), () => Od(this._destroyListeners, n)
      );
    }
    destroy() {
      if (this._destroyed) throw new _(406, !1);
      let n = this._injector;
      n.destroy && !n.destroyed && n.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    warnIfDestroyed() {}
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
function Od(t, e) {
  let i = t.indexOf(e);
  i > -1 && t.splice(i, 1);
}
var ba;
function Df(t) {
  ba ??= new WeakMap();
  let e = ba.get(t);
  if (e) return e;
  let i = t.isStable
    .pipe(Nt((n) => n))
    .toPromise()
    .then(() => {});
  return ba.set(t, i), t.onDestroy(() => ba?.delete(t)), i;
}
var rk = (() => {
  let e = class e {
    constructor() {
      (this.zone = b(I)), (this.applicationRef = b(Jt));
    }
    initialize() {
      this._onMicrotaskEmptySubscription ||
        (this._onMicrotaskEmptySubscription =
          this.zone.onMicrotaskEmpty.subscribe({
            next: () => {
              this.zone.run(() => {
                this.applicationRef.tick();
              });
            },
          }));
    }
    ngOnDestroy() {
      this._onMicrotaskEmptySubscription?.unsubscribe();
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
function ok(t) {
  return [
    { provide: I, useFactory: t },
    {
      provide: wi,
      multi: !0,
      useFactory: () => {
        let e = b(rk, { optional: !0 });
        return () => e.initialize();
      },
    },
    {
      provide: wi,
      multi: !0,
      useFactory: () => {
        let e = b(lk);
        return () => {
          e.initialize();
        };
      },
    },
    { provide: Dv, useFactory: sk },
  ];
}
function sk() {
  let t = b(I),
    e = b(dt);
  return (i) => t.runOutsideAngular(() => e.handleError(i));
}
function ak(t) {
  let e = ok(() => new I(ck(t)));
  return Mi([[], e]);
}
function ck(t) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: t?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: t?.runCoalescing ?? !1,
  };
}
var lk = (() => {
  let e = class e {
    constructor() {
      (this.subscription = new be()),
        (this.initialized = !1),
        (this.zone = b(I)),
        (this.pendingTasks = b(Mo));
    }
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let n = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (n = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              I.assertNotInAngularZone(),
                queueMicrotask(() => {
                  n !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(n), (n = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            I.assertInAngularZone(), (n ??= this.pendingTasks.add());
          })
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
function dk() {
  return (typeof $localize < 'u' && $localize.locale) || Ha;
}
var _c = new w('LocaleId', {
  providedIn: 'root',
  factory: () => b(_c, G.Optional | G.SkipSelf) || dk(),
});
var T_ = new w('PlatformDestroyListeners');
var Ea = null;
function uk(t = [], e) {
  return St.create({
    name: e,
    providers: [
      { provide: Ka, useValue: 'platform' },
      { provide: T_, useValue: new Set([() => (Ea = null)]) },
      ...t,
    ],
  });
}
function fk(t = []) {
  if (Ea) return Ea;
  let e = uk(t);
  return (Ea = e), tk(), hk(e), e;
}
function hk(t) {
  t.get(af, null)?.forEach((i) => i());
}
function k_(t) {
  try {
    let { rootComponent: e, appProviders: i, platformProviders: n } = t,
      r = fk(n),
      o = [ak(), ...(i || [])],
      a = new $a({
        providers: o,
        parent: r,
        debugName: '',
        runEnvironmentInitializers: !1,
      }).injector,
      c = a.get(I);
    return c.run(() => {
      a.resolveInjectorInitializers();
      let l = a.get(dt, null),
        d;
      c.runOutsideAngular(() => {
        d = c.onError.subscribe({
          next: (h) => {
            l.handleError(h);
          },
        });
      });
      let u = () => a.destroy(),
        f = r.get(T_);
      return (
        f.add(u),
        a.onDestroy(() => {
          d.unsubscribe(), f.delete(u);
        }),
        ik(l, c, () => {
          let h = a.get(S_);
          return (
            h.runInitializers(),
            h.donePromise.then(() => {
              let m = a.get(_c, Ha);
              NT(m || Ha);
              let g = a.get(Jt);
              return e !== void 0 && g.bootstrap(e), g;
            })
          );
        })
      );
    });
  } catch (e) {
    return Promise.reject(e);
  }
}
var Ig = !1;
function mk() {
  Ig || ((Ig = !0), pM(), TT(), jT(), RT(), CT(), xT(), hT(), VM());
}
function pk(t, e) {
  return Df(t);
}
function A_() {
  return Mi([
    {
      provide: ma,
      useFactory: () => {
        let t = !0;
        return (
          Kr() && (t = !!b(Ti, { optional: !0 })?.get(xv, null)),
          t && Hn('NgHydration'),
          t
        );
      },
    },
    {
      provide: wi,
      useValue: () => {
        Kr() && b(ma) && (gk(), mk());
      },
      multi: !0,
    },
    { provide: Mv, useFactory: () => Kr() && b(ma) },
    {
      provide: Ri,
      useFactory: () => {
        if (Kr() && b(ma)) {
          let t = b(Jt),
            e = b(St);
          return () => {
            pk(t, e).then(() => {
              I.assertInAngularZone(), oT(t);
            });
          };
        }
        return () => {};
      },
      multi: !0,
    },
  ]);
}
function gk() {
  let t = Ja(),
    e;
  for (let i of t.body.childNodes)
    if (i.nodeType === Node.COMMENT_NODE && i.textContent?.trim() === hM) {
      e = i;
      break;
    }
  if (!e) throw new _(-507, !1);
}
function Me(t) {
  return typeof t == 'boolean' ? t : t != null && t !== 'false';
}
function So(t, e = NaN) {
  return !isNaN(parseFloat(t)) && !isNaN(Number(t)) ? Number(t) : e;
}
function R_(t) {
  let e = Nn(t);
  if (!e) return null;
  let i = new hr(e);
  return {
    get selector() {
      return i.selector;
    },
    get type() {
      return i.componentType;
    },
    get inputs() {
      return i.inputs;
    },
    get outputs() {
      return i.outputs;
    },
    get ngContentSelectors() {
      return i.ngContentSelectors;
    },
    get isStandalone() {
      return e.standalone;
    },
    get isSignal() {
      return e.signals;
    },
  };
}
var If = null;
function _n() {
  return If;
}
function O_(t) {
  If || (If = t);
}
var yc = class {},
  ne = new w('DocumentToken'),
  Sf = (() => {
    let e = class e {
      historyGo(n) {
        throw new Error('Not implemented');
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({
        token: e,
        factory: () => (() => b(bk))(),
        providedIn: 'platform',
      }));
    let t = e;
    return t;
  })(),
  P_ = new w('Location Initialized'),
  bk = (() => {
    let e = class e extends Sf {
      constructor() {
        super(),
          (this._doc = b(ne)),
          (this._location = window.location),
          (this._history = window.history);
      }
      getBaseHrefFromDOM() {
        return _n().getBaseHref(this._doc);
      }
      onPopState(n) {
        let r = _n().getGlobalEventTarget(this._doc, 'window');
        return (
          r.addEventListener('popstate', n, !1),
          () => r.removeEventListener('popstate', n)
        );
      }
      onHashChange(n) {
        let r = _n().getGlobalEventTarget(this._doc, 'window');
        return (
          r.addEventListener('hashchange', n, !1),
          () => r.removeEventListener('hashchange', n)
        );
      }
      get href() {
        return this._location.href;
      }
      get protocol() {
        return this._location.protocol;
      }
      get hostname() {
        return this._location.hostname;
      }
      get port() {
        return this._location.port;
      }
      get pathname() {
        return this._location.pathname;
      }
      get search() {
        return this._location.search;
      }
      get hash() {
        return this._location.hash;
      }
      set pathname(n) {
        this._location.pathname = n;
      }
      pushState(n, r, o) {
        this._history.pushState(n, r, o);
      }
      replaceState(n, r, o) {
        this._history.replaceState(n, r, o);
      }
      forward() {
        this._history.forward();
      }
      back() {
        this._history.back();
      }
      historyGo(n = 0) {
        this._history.go(n);
      }
      getState() {
        return this._history.state;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({
        token: e,
        factory: () => (() => new e())(),
        providedIn: 'platform',
      }));
    let t = e;
    return t;
  })();
function Tf(t, e) {
  if (t.length == 0) return e;
  if (e.length == 0) return t;
  let i = 0;
  return (
    t.endsWith('/') && i++,
    e.startsWith('/') && i++,
    i == 2 ? t + e.substring(1) : i == 1 ? t + e : t + '/' + e
  );
}
function F_(t) {
  let e = t.match(/#|\?|$/),
    i = (e && e.index) || t.length,
    n = i - (t[i - 1] === '/' ? 1 : 0);
  return t.slice(0, n) + t.slice(i);
}
function vn(t) {
  return t && t[0] !== '?' ? '?' + t : t;
}
var Fi = (() => {
    let e = class e {
      historyGo(n) {
        throw new Error('Not implemented');
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({
        token: e,
        factory: () => (() => b(kf))(),
        providedIn: 'root',
      }));
    let t = e;
    return t;
  })(),
  L_ = new w('appBaseHref'),
  kf = (() => {
    let e = class e extends Fi {
      constructor(n, r) {
        super(),
          (this._platformLocation = n),
          (this._removeListenerFns = []),
          (this._baseHref =
            r ??
            this._platformLocation.getBaseHrefFromDOM() ??
            b(ne).location?.origin ??
            '');
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(n) {
        return Tf(this._baseHref, n);
      }
      path(n = !1) {
        let r =
            this._platformLocation.pathname + vn(this._platformLocation.search),
          o = this._platformLocation.hash;
        return o && n ? `${r}${o}` : r;
      }
      pushState(n, r, o, s) {
        let a = this.prepareExternalUrl(o + vn(s));
        this._platformLocation.pushState(n, r, a);
      }
      replaceState(n, r, o, s) {
        let a = this.prepareExternalUrl(o + vn(s));
        this._platformLocation.replaceState(n, r, a);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(Sf), v(L_, 8));
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  V_ = (() => {
    let e = class e extends Fi {
      constructor(n, r) {
        super(),
          (this._platformLocation = n),
          (this._baseHref = ''),
          (this._removeListenerFns = []),
          r != null && (this._baseHref = r);
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      path(n = !1) {
        let r = this._platformLocation.hash;
        return r == null && (r = '#'), r.length > 0 ? r.substring(1) : r;
      }
      prepareExternalUrl(n) {
        let r = Tf(this._baseHref, n);
        return r.length > 0 ? '#' + r : r;
      }
      pushState(n, r, o, s) {
        let a = this.prepareExternalUrl(o + vn(s));
        a.length == 0 && (a = this._platformLocation.pathname),
          this._platformLocation.pushState(n, r, a);
      }
      replaceState(n, r, o, s) {
        let a = this.prepareExternalUrl(o + vn(s));
        a.length == 0 && (a = this._platformLocation.pathname),
          this._platformLocation.replaceState(n, r, a);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(Sf), v(L_, 8));
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  yr = (() => {
    let e = class e {
      constructor(n) {
        (this._subject = new Y()),
          (this._urlChangeListeners = []),
          (this._urlChangeSubscription = null),
          (this._locationStrategy = n);
        let r = this._locationStrategy.getBaseHref();
        (this._basePath = yk(F_(N_(r)))),
          this._locationStrategy.onPopState((o) => {
            this._subject.emit({
              url: this.path(!0),
              pop: !0,
              state: o.state,
              type: o.type,
            });
          });
      }
      ngOnDestroy() {
        this._urlChangeSubscription?.unsubscribe(),
          (this._urlChangeListeners = []);
      }
      path(n = !1) {
        return this.normalize(this._locationStrategy.path(n));
      }
      getState() {
        return this._locationStrategy.getState();
      }
      isCurrentPathEqualTo(n, r = '') {
        return this.path() == this.normalize(n + vn(r));
      }
      normalize(n) {
        return e.stripTrailingSlash(_k(this._basePath, N_(n)));
      }
      prepareExternalUrl(n) {
        return (
          n && n[0] !== '/' && (n = '/' + n),
          this._locationStrategy.prepareExternalUrl(n)
        );
      }
      go(n, r = '', o = null) {
        this._locationStrategy.pushState(o, '', n, r),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(n + vn(r)), o);
      }
      replaceState(n, r = '', o = null) {
        this._locationStrategy.replaceState(o, '', n, r),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(n + vn(r)), o);
      }
      forward() {
        this._locationStrategy.forward();
      }
      back() {
        this._locationStrategy.back();
      }
      historyGo(n = 0) {
        this._locationStrategy.historyGo?.(n);
      }
      onUrlChange(n) {
        return (
          this._urlChangeListeners.push(n),
          this._urlChangeSubscription ||
            (this._urlChangeSubscription = this.subscribe((r) => {
              this._notifyUrlChangeListeners(r.url, r.state);
            })),
          () => {
            let r = this._urlChangeListeners.indexOf(n);
            this._urlChangeListeners.splice(r, 1),
              this._urlChangeListeners.length === 0 &&
                (this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeSubscription = null));
          }
        );
      }
      _notifyUrlChangeListeners(n = '', r) {
        this._urlChangeListeners.forEach((o) => o(n, r));
      }
      subscribe(n, r, o) {
        return this._subject.subscribe({ next: n, error: r, complete: o });
      }
    };
    (e.normalizeQueryParams = vn),
      (e.joinWithSlash = Tf),
      (e.stripTrailingSlash = F_),
      (e.ɵfac = function (r) {
        return new (r || e)(v(Fi));
      }),
      (e.ɵprov = y({ token: e, factory: () => vk(), providedIn: 'root' }));
    let t = e;
    return t;
  })();
function vk() {
  return new yr(v(Fi));
}
function _k(t, e) {
  if (!t || !e.startsWith(t)) return e;
  let i = e.substring(t.length);
  return i === '' || ['/', ';', '?', '#'].includes(i[0]) ? i : e;
}
function N_(t) {
  return t.replace(/\/index.html$/, '');
}
function yk(t) {
  if (new RegExp('^(https?:)?//').test(t)) {
    let [, i] = t.split(/\/\/[^\/]+/);
    return i;
  }
  return t;
}
function j_(t, e) {
  e = encodeURIComponent(e);
  for (let i of t.split(';')) {
    let n = i.indexOf('='),
      [r, o] = n == -1 ? [i, ''] : [i.slice(0, n), i.slice(n + 1)];
    if (r.trim() === e) return decodeURIComponent(o);
  }
  return null;
}
var B_ = (() => {
  let e = class e {
    constructor(n) {
      (this._viewContainerRef = n),
        (this._viewRef = null),
        (this.ngTemplateOutletContext = null),
        (this.ngTemplateOutlet = null),
        (this.ngTemplateOutletInjector = null);
    }
    ngOnChanges(n) {
      if (this._shouldRecreateView(n)) {
        let r = this._viewContainerRef;
        if (
          (this._viewRef && r.remove(r.indexOf(this._viewRef)),
          !this.ngTemplateOutlet)
        ) {
          this._viewRef = null;
          return;
        }
        let o = this._createContextForwardProxy();
        this._viewRef = r.createEmbeddedView(this.ngTemplateOutlet, o, {
          injector: this.ngTemplateOutletInjector ?? void 0,
        });
      }
    }
    _shouldRecreateView(n) {
      return !!n.ngTemplateOutlet || !!n.ngTemplateOutletInjector;
    }
    _createContextForwardProxy() {
      return new Proxy(
        {},
        {
          set: (n, r, o) =>
            this.ngTemplateOutletContext
              ? Reflect.set(this.ngTemplateOutletContext, r, o)
              : !1,
          get: (n, r, o) => {
            if (this.ngTemplateOutletContext)
              return Reflect.get(this.ngTemplateOutletContext, r, o);
          },
        }
      );
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(p(ki));
  }),
    (e.ɵdir = q({
      type: e,
      selectors: [['', 'ngTemplateOutlet', '']],
      inputs: {
        ngTemplateOutletContext: 'ngTemplateOutletContext',
        ngTemplateOutlet: 'ngTemplateOutlet',
        ngTemplateOutletInjector: 'ngTemplateOutletInjector',
      },
      standalone: !0,
      features: [ft],
    }));
  let t = e;
  return t;
})();
var Af = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = V({ type: e })),
      (e.ɵinj = L({}));
    let t = e;
    return t;
  })(),
  Rf = 'browser',
  xk = 'server';
function U_(t) {
  return t === Rf;
}
function Ff(t) {
  return t === xk;
}
var H_ = (() => {
    let e = class e {};
    e.ɵprov = y({
      token: e,
      providedIn: 'root',
      factory: () => new Mf(v(ne), window),
    });
    let t = e;
    return t;
  })(),
  Mf = class {
    constructor(e, i) {
      (this.document = e), (this.window = i), (this.offset = () => [0, 0]);
    }
    setOffset(e) {
      Array.isArray(e) ? (this.offset = () => e) : (this.offset = e);
    }
    getScrollPosition() {
      return this.supportsScrolling()
        ? [this.window.pageXOffset, this.window.pageYOffset]
        : [0, 0];
    }
    scrollToPosition(e) {
      this.supportsScrolling() && this.window.scrollTo(e[0], e[1]);
    }
    scrollToAnchor(e) {
      if (!this.supportsScrolling()) return;
      let i = wk(this.document, e);
      i && (this.scrollToElement(i), i.focus());
    }
    setHistoryScrollRestoration(e) {
      this.supportsScrolling() && (this.window.history.scrollRestoration = e);
    }
    scrollToElement(e) {
      let i = e.getBoundingClientRect(),
        n = i.left + this.window.pageXOffset,
        r = i.top + this.window.pageYOffset,
        o = this.offset();
      this.window.scrollTo(n - o[0], r - o[1]);
    }
    supportsScrolling() {
      try {
        return (
          !!this.window &&
          !!this.window.scrollTo &&
          'pageXOffset' in this.window
        );
      } catch {
        return !1;
      }
    }
  };
function wk(t, e) {
  let i = t.getElementById(e) || t.getElementsByName(e)[0];
  if (i) return i;
  if (
    typeof t.createTreeWalker == 'function' &&
    t.body &&
    typeof t.body.attachShadow == 'function'
  ) {
    let n = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT),
      r = n.currentNode;
    for (; r; ) {
      let o = r.shadowRoot;
      if (o) {
        let s = o.getElementById(e) || o.querySelector(`[name="${e}"]`);
        if (s) return s;
      }
      r = n.nextNode();
    }
  }
  return null;
}
var xc = class {};
var Of = class {};
var Ni = class t {
  constructor(e) {
    (this.normalizedNames = new Map()),
      (this.lazyUpdate = null),
      e
        ? typeof e == 'string'
          ? (this.lazyInit = () => {
              (this.headers = new Map()),
                e
                  .split(
                    `
`
                  )
                  .forEach((i) => {
                    let n = i.indexOf(':');
                    if (n > 0) {
                      let r = i.slice(0, n),
                        o = r.toLowerCase(),
                        s = i.slice(n + 1).trim();
                      this.maybeSetNormalizedName(r, o),
                        this.headers.has(o)
                          ? this.headers.get(o).push(s)
                          : this.headers.set(o, [s]);
                    }
                  });
            })
          : typeof Headers < 'u' && e instanceof Headers
          ? ((this.headers = new Map()),
            e.forEach((i, n) => {
              this.setHeaderEntries(n, i);
            }))
          : (this.lazyInit = () => {
              (this.headers = new Map()),
                Object.entries(e).forEach(([i, n]) => {
                  this.setHeaderEntries(i, n);
                });
            })
        : (this.headers = new Map());
  }
  has(e) {
    return this.init(), this.headers.has(e.toLowerCase());
  }
  get(e) {
    this.init();
    let i = this.headers.get(e.toLowerCase());
    return i && i.length > 0 ? i[0] : null;
  }
  keys() {
    return this.init(), Array.from(this.normalizedNames.values());
  }
  getAll(e) {
    return this.init(), this.headers.get(e.toLowerCase()) || null;
  }
  append(e, i) {
    return this.clone({ name: e, value: i, op: 'a' });
  }
  set(e, i) {
    return this.clone({ name: e, value: i, op: 's' });
  }
  delete(e, i) {
    return this.clone({ name: e, value: i, op: 'd' });
  }
  maybeSetNormalizedName(e, i) {
    this.normalizedNames.has(i) || this.normalizedNames.set(i, e);
  }
  init() {
    this.lazyInit &&
      (this.lazyInit instanceof t
        ? this.copyFrom(this.lazyInit)
        : this.lazyInit(),
      (this.lazyInit = null),
      this.lazyUpdate &&
        (this.lazyUpdate.forEach((e) => this.applyUpdate(e)),
        (this.lazyUpdate = null)));
  }
  copyFrom(e) {
    e.init(),
      Array.from(e.headers.keys()).forEach((i) => {
        this.headers.set(i, e.headers.get(i)),
          this.normalizedNames.set(i, e.normalizedNames.get(i));
      });
  }
  clone(e) {
    let i = new t();
    return (
      (i.lazyInit =
        this.lazyInit && this.lazyInit instanceof t ? this.lazyInit : this),
      (i.lazyUpdate = (this.lazyUpdate || []).concat([e])),
      i
    );
  }
  applyUpdate(e) {
    let i = e.name.toLowerCase();
    switch (e.op) {
      case 'a':
      case 's':
        let n = e.value;
        if ((typeof n == 'string' && (n = [n]), n.length === 0)) return;
        this.maybeSetNormalizedName(e.name, i);
        let r = (e.op === 'a' ? this.headers.get(i) : void 0) || [];
        r.push(...n), this.headers.set(i, r);
        break;
      case 'd':
        let o = e.value;
        if (!o) this.headers.delete(i), this.normalizedNames.delete(i);
        else {
          let s = this.headers.get(i);
          if (!s) return;
          (s = s.filter((a) => o.indexOf(a) === -1)),
            s.length === 0
              ? (this.headers.delete(i), this.normalizedNames.delete(i))
              : this.headers.set(i, s);
        }
        break;
    }
  }
  setHeaderEntries(e, i) {
    let n = (Array.isArray(i) ? i : [i]).map((o) => o.toString()),
      r = e.toLowerCase();
    this.headers.set(r, n), this.maybeSetNormalizedName(e, r);
  }
  forEach(e) {
    this.init(),
      Array.from(this.normalizedNames.keys()).forEach((i) =>
        e(this.normalizedNames.get(i), this.headers.get(i))
      );
  }
};
var Pf = class {
  encodeKey(e) {
    return $_(e);
  }
  encodeValue(e) {
    return $_(e);
  }
  decodeKey(e) {
    return decodeURIComponent(e);
  }
  decodeValue(e) {
    return decodeURIComponent(e);
  }
};
function Dk(t, e) {
  let i = new Map();
  return (
    t.length > 0 &&
      t
        .replace(/^\?/, '')
        .split('&')
        .forEach((r) => {
          let o = r.indexOf('='),
            [s, a] =
              o == -1
                ? [e.decodeKey(r), '']
                : [e.decodeKey(r.slice(0, o)), e.decodeValue(r.slice(o + 1))],
            c = i.get(s) || [];
          c.push(a), i.set(s, c);
        }),
    i
  );
}
var Ik = /%(\d[a-f0-9])/gi,
  Mk = {
    40: '@',
    '3A': ':',
    24: '$',
    '2C': ',',
    '3B': ';',
    '3D': '=',
    '3F': '?',
    '2F': '/',
  };
function $_(t) {
  return encodeURIComponent(t).replace(Ik, (e, i) => Mk[i] ?? e);
}
function Ec(t) {
  return `${t}`;
}
var Wn = class t {
  constructor(e = {}) {
    if (
      ((this.updates = null),
      (this.cloneFrom = null),
      (this.encoder = e.encoder || new Pf()),
      e.fromString)
    ) {
      if (e.fromObject)
        throw new Error('Cannot specify both fromString and fromObject.');
      this.map = Dk(e.fromString, this.encoder);
    } else
      e.fromObject
        ? ((this.map = new Map()),
          Object.keys(e.fromObject).forEach((i) => {
            let n = e.fromObject[i],
              r = Array.isArray(n) ? n.map(Ec) : [Ec(n)];
            this.map.set(i, r);
          }))
        : (this.map = null);
  }
  has(e) {
    return this.init(), this.map.has(e);
  }
  get(e) {
    this.init();
    let i = this.map.get(e);
    return i ? i[0] : null;
  }
  getAll(e) {
    return this.init(), this.map.get(e) || null;
  }
  keys() {
    return this.init(), Array.from(this.map.keys());
  }
  append(e, i) {
    return this.clone({ param: e, value: i, op: 'a' });
  }
  appendAll(e) {
    let i = [];
    return (
      Object.keys(e).forEach((n) => {
        let r = e[n];
        Array.isArray(r)
          ? r.forEach((o) => {
              i.push({ param: n, value: o, op: 'a' });
            })
          : i.push({ param: n, value: r, op: 'a' });
      }),
      this.clone(i)
    );
  }
  set(e, i) {
    return this.clone({ param: e, value: i, op: 's' });
  }
  delete(e, i) {
    return this.clone({ param: e, value: i, op: 'd' });
  }
  toString() {
    return (
      this.init(),
      this.keys()
        .map((e) => {
          let i = this.encoder.encodeKey(e);
          return this.map
            .get(e)
            .map((n) => i + '=' + this.encoder.encodeValue(n))
            .join('&');
        })
        .filter((e) => e !== '')
        .join('&')
    );
  }
  clone(e) {
    let i = new t({ encoder: this.encoder });
    return (
      (i.cloneFrom = this.cloneFrom || this),
      (i.updates = (this.updates || []).concat(e)),
      i
    );
  }
  init() {
    this.map === null && (this.map = new Map()),
      this.cloneFrom !== null &&
        (this.cloneFrom.init(),
        this.cloneFrom
          .keys()
          .forEach((e) => this.map.set(e, this.cloneFrom.map.get(e))),
        this.updates.forEach((e) => {
          switch (e.op) {
            case 'a':
            case 's':
              let i = (e.op === 'a' ? this.map.get(e.param) : void 0) || [];
              i.push(Ec(e.value)), this.map.set(e.param, i);
              break;
            case 'd':
              if (e.value !== void 0) {
                let n = this.map.get(e.param) || [],
                  r = n.indexOf(Ec(e.value));
                r !== -1 && n.splice(r, 1),
                  n.length > 0
                    ? this.map.set(e.param, n)
                    : this.map.delete(e.param);
              } else {
                this.map.delete(e.param);
                break;
              }
          }
        }),
        (this.cloneFrom = this.updates = null));
  }
};
var Lf = class {
  constructor() {
    this.map = new Map();
  }
  set(e, i) {
    return this.map.set(e, i), this;
  }
  get(e) {
    return (
      this.map.has(e) || this.map.set(e, e.defaultValue()), this.map.get(e)
    );
  }
  delete(e) {
    return this.map.delete(e), this;
  }
  has(e) {
    return this.map.has(e);
  }
  keys() {
    return this.map.keys();
  }
};
function Sk(t) {
  switch (t) {
    case 'DELETE':
    case 'GET':
    case 'HEAD':
    case 'OPTIONS':
    case 'JSONP':
      return !1;
    default:
      return !0;
  }
}
function z_(t) {
  return typeof ArrayBuffer < 'u' && t instanceof ArrayBuffer;
}
function W_(t) {
  return typeof Blob < 'u' && t instanceof Blob;
}
function G_(t) {
  return typeof FormData < 'u' && t instanceof FormData;
}
function Tk(t) {
  return typeof URLSearchParams < 'u' && t instanceof URLSearchParams;
}
var To = class t {
    constructor(e, i, n, r) {
      (this.url = i),
        (this.body = null),
        (this.reportProgress = !1),
        (this.withCredentials = !1),
        (this.responseType = 'json'),
        (this.method = e.toUpperCase());
      let o;
      if (
        (Sk(this.method) || r
          ? ((this.body = n !== void 0 ? n : null), (o = r))
          : (o = n),
        o &&
          ((this.reportProgress = !!o.reportProgress),
          (this.withCredentials = !!o.withCredentials),
          o.responseType && (this.responseType = o.responseType),
          o.headers && (this.headers = o.headers),
          o.context && (this.context = o.context),
          o.params && (this.params = o.params),
          (this.transferCache = o.transferCache)),
        this.headers || (this.headers = new Ni()),
        this.context || (this.context = new Lf()),
        !this.params)
      )
        (this.params = new Wn()), (this.urlWithParams = i);
      else {
        let s = this.params.toString();
        if (s.length === 0) this.urlWithParams = i;
        else {
          let a = i.indexOf('?'),
            c = a === -1 ? '?' : a < i.length - 1 ? '&' : '';
          this.urlWithParams = i + c + s;
        }
      }
    }
    serializeBody() {
      return this.body === null
        ? null
        : z_(this.body) ||
          W_(this.body) ||
          G_(this.body) ||
          Tk(this.body) ||
          typeof this.body == 'string'
        ? this.body
        : this.body instanceof Wn
        ? this.body.toString()
        : typeof this.body == 'object' ||
          typeof this.body == 'boolean' ||
          Array.isArray(this.body)
        ? JSON.stringify(this.body)
        : this.body.toString();
    }
    detectContentTypeHeader() {
      return this.body === null || G_(this.body)
        ? null
        : W_(this.body)
        ? this.body.type || null
        : z_(this.body)
        ? null
        : typeof this.body == 'string'
        ? 'text/plain'
        : this.body instanceof Wn
        ? 'application/x-www-form-urlencoded;charset=UTF-8'
        : typeof this.body == 'object' ||
          typeof this.body == 'number' ||
          typeof this.body == 'boolean'
        ? 'application/json'
        : null;
    }
    clone(e = {}) {
      let i = e.method || this.method,
        n = e.url || this.url,
        r = e.responseType || this.responseType,
        o = e.body !== void 0 ? e.body : this.body,
        s =
          e.withCredentials !== void 0
            ? e.withCredentials
            : this.withCredentials,
        a =
          e.reportProgress !== void 0 ? e.reportProgress : this.reportProgress,
        c = e.headers || this.headers,
        l = e.params || this.params,
        d = e.context ?? this.context;
      return (
        e.setHeaders !== void 0 &&
          (c = Object.keys(e.setHeaders).reduce(
            (u, f) => u.set(f, e.setHeaders[f]),
            c
          )),
        e.setParams &&
          (l = Object.keys(e.setParams).reduce(
            (u, f) => u.set(f, e.setParams[f]),
            l
          )),
        new t(i, n, o, {
          params: l,
          headers: c,
          context: d,
          reportProgress: a,
          responseType: r,
          withCredentials: s,
        })
      );
    }
  },
  J_ = (function (t) {
    return (
      (t[(t.Sent = 0)] = 'Sent'),
      (t[(t.UploadProgress = 1)] = 'UploadProgress'),
      (t[(t.ResponseHeader = 2)] = 'ResponseHeader'),
      (t[(t.DownloadProgress = 3)] = 'DownloadProgress'),
      (t[(t.Response = 4)] = 'Response'),
      (t[(t.User = 5)] = 'User'),
      t
    );
  })(J_ || {}),
  Vf = class {
    constructor(e, i = 200, n = 'OK') {
      (this.headers = e.headers || new Ni()),
        (this.status = e.status !== void 0 ? e.status : i),
        (this.statusText = e.statusText || n),
        (this.url = e.url || null),
        (this.ok = this.status >= 200 && this.status < 300);
    }
  };
var ko = class t extends Vf {
  constructor(e = {}) {
    super(e),
      (this.type = J_.Response),
      (this.body = e.body !== void 0 ? e.body : null);
  }
  clone(e = {}) {
    return new t({
      body: e.body !== void 0 ? e.body : this.body,
      headers: e.headers || this.headers,
      status: e.status !== void 0 ? e.status : this.status,
      statusText: e.statusText || this.statusText,
      url: e.url || this.url || void 0,
    });
  }
};
function Nf(t, e) {
  return {
    body: e,
    headers: t.headers,
    context: t.context,
    observe: t.observe,
    params: t.params,
    reportProgress: t.reportProgress,
    responseType: t.responseType,
    withCredentials: t.withCredentials,
    transferCache: t.transferCache,
  };
}
var ey = (() => {
  let e = class e {
    constructor(n) {
      this.handler = n;
    }
    request(n, r, o = {}) {
      let s;
      if (n instanceof To) s = n;
      else {
        let l;
        o.headers instanceof Ni ? (l = o.headers) : (l = new Ni(o.headers));
        let d;
        o.params &&
          (o.params instanceof Wn
            ? (d = o.params)
            : (d = new Wn({ fromObject: o.params }))),
          (s = new To(n, r, o.body !== void 0 ? o.body : null, {
            headers: l,
            context: o.context,
            params: d,
            reportProgress: o.reportProgress,
            responseType: o.responseType || 'json',
            withCredentials: o.withCredentials,
            transferCache: o.transferCache,
          }));
      }
      let a = M(s).pipe(ln((l) => this.handler.handle(l)));
      if (n instanceof To || o.observe === 'events') return a;
      let c = a.pipe(je((l) => l instanceof ko));
      switch (o.observe || 'body') {
        case 'body':
          switch (s.responseType) {
            case 'arraybuffer':
              return c.pipe(
                A((l) => {
                  if (l.body !== null && !(l.body instanceof ArrayBuffer))
                    throw new Error('Response is not an ArrayBuffer.');
                  return l.body;
                })
              );
            case 'blob':
              return c.pipe(
                A((l) => {
                  if (l.body !== null && !(l.body instanceof Blob))
                    throw new Error('Response is not a Blob.');
                  return l.body;
                })
              );
            case 'text':
              return c.pipe(
                A((l) => {
                  if (l.body !== null && typeof l.body != 'string')
                    throw new Error('Response is not a string.');
                  return l.body;
                })
              );
            case 'json':
            default:
              return c.pipe(A((l) => l.body));
          }
        case 'response':
          return c;
        default:
          throw new Error(`Unreachable: unhandled observe type ${o.observe}}`);
      }
    }
    delete(n, r = {}) {
      return this.request('DELETE', n, r);
    }
    get(n, r = {}) {
      return this.request('GET', n, r);
    }
    head(n, r = {}) {
      return this.request('HEAD', n, r);
    }
    jsonp(n, r) {
      return this.request('JSONP', n, {
        params: new Wn().append(r, 'JSONP_CALLBACK'),
        observe: 'body',
        responseType: 'json',
      });
    }
    options(n, r = {}) {
      return this.request('OPTIONS', n, r);
    }
    patch(n, r, o = {}) {
      return this.request('PATCH', n, Nf(o, r));
    }
    post(n, r, o = {}) {
      return this.request('POST', n, Nf(o, r));
    }
    put(n, r, o = {}) {
      return this.request('PUT', n, Nf(o, r));
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(v(Of));
  }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac }));
  let t = e;
  return t;
})();
var kk = new w('');
var q_ = 'b',
  Q_ = 'h',
  Z_ = 's',
  Y_ = 'st',
  X_ = 'u',
  K_ = 'rt',
  Cc = new w(''),
  Ak = ['GET', 'HEAD'];
function Rk(t, e) {
  let d = b(Cc),
    { isCacheActive: i } = d,
    n = fp(d, ['isCacheActive']),
    { transferCache: r, method: o } = t;
  if (
    !i ||
    (o === 'POST' && !n.includePostRequests && !r) ||
    (o !== 'POST' && !Ak.includes(o)) ||
    r === !1 ||
    n.filter?.(t) === !1
  )
    return e(t);
  let s = b(Ti),
    a = Nk(t),
    c = s.get(a, null),
    l = n.includeHeaders;
  if ((typeof r == 'object' && r.includeHeaders && (l = r.includeHeaders), c)) {
    let { [q_]: u, [K_]: f, [Q_]: h, [Z_]: m, [Y_]: g, [X_]: C } = c,
      E = u;
    switch (f) {
      case 'arraybuffer':
        E = new TextEncoder().encode(u).buffer;
        break;
      case 'blob':
        E = new Blob([u]);
        break;
    }
    let N = new Ni(h);
    return M(new ko({ body: E, headers: N, status: m, statusText: g, url: C }));
  }
  return e(t).pipe(
    Ee((u) => {
      u instanceof ko &&
        s.set(a, {
          [q_]: u.body,
          [Q_]: Fk(u.headers, l),
          [Z_]: u.status,
          [Y_]: u.statusText,
          [X_]: u.url || '',
          [K_]: t.responseType,
        });
    })
  );
}
function Fk(t, e) {
  if (!e) return {};
  let i = {};
  for (let n of e) {
    let r = t.getAll(n);
    r !== null && (i[n] = r);
  }
  return i;
}
function Nk(t) {
  let { params: e, method: i, responseType: n, url: r } = t,
    o = e
      .keys()
      .sort()
      .map((c) => `${c}=${e.getAll(c)}`)
      .join('&'),
    s = i + '.' + n + '.' + r + '?' + o,
    a = Ok(s);
  return a;
}
function Ok(t) {
  let e = 0;
  for (let i of t) e = (Math.imul(31, e) + i.charCodeAt(0)) << 0;
  return (e += 2147483647 + 1), e.toString();
}
function ty(t) {
  return [
    {
      provide: Cc,
      useFactory: () => (
        Hn('NgHttpTransferCache'), x({ isCacheActive: !0 }, t)
      ),
    },
    { provide: kk, useValue: Rk, multi: !0, deps: [Ti, Cc] },
    {
      provide: Ri,
      multi: !0,
      useFactory: () => {
        let e = b(Jt),
          i = b(Cc);
        return () => {
          Df(e).then(() => {
            i.isCacheActive = !1;
          });
        };
      },
    },
  ];
}
var Uf = class extends yc {
    constructor() {
      super(...arguments), (this.supportsDOMEvents = !0);
    }
  },
  Hf = class t extends Uf {
    static makeCurrent() {
      O_(new t());
    }
    onAndCancel(e, i, n) {
      return (
        e.addEventListener(i, n),
        () => {
          e.removeEventListener(i, n);
        }
      );
    }
    dispatchEvent(e, i) {
      e.dispatchEvent(i);
    }
    remove(e) {
      e.parentNode && e.parentNode.removeChild(e);
    }
    createElement(e, i) {
      return (i = i || this.getDefaultDocument()), i.createElement(e);
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument('fakeTitle');
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(e) {
      return e.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(e) {
      return e instanceof DocumentFragment;
    }
    getGlobalEventTarget(e, i) {
      return i === 'window'
        ? window
        : i === 'document'
        ? e
        : i === 'body'
        ? e.body
        : null;
    }
    getBaseHref(e) {
      let i = Lk();
      return i == null ? null : Vk(i);
    }
    resetBaseElement() {
      Ao = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(e) {
      return j_(document.cookie, e);
    }
  },
  Ao = null;
function Lk() {
  return (
    (Ao = Ao || document.querySelector('base')),
    Ao ? Ao.getAttribute('href') : null
  );
}
function Vk(t) {
  return new URL(t, document.baseURI).pathname;
}
var jk = (() => {
    let e = class e {
      build() {
        return new XMLHttpRequest();
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  $f = new w('EventManagerPlugins'),
  ry = (() => {
    let e = class e {
      constructor(n, r) {
        (this._zone = r),
          (this._eventNameToPlugin = new Map()),
          n.forEach((o) => {
            o.manager = this;
          }),
          (this._plugins = n.slice().reverse());
      }
      addEventListener(n, r, o) {
        return this._findPluginFor(r).addEventListener(n, r, o);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(n) {
        let r = this._eventNameToPlugin.get(n);
        if (r) return r;
        if (((r = this._plugins.find((s) => s.supports(n))), !r))
          throw new _(5101, !1);
        return this._eventNameToPlugin.set(n, r), r;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v($f), v(I));
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  Dc = class {
    constructor(e) {
      this._doc = e;
    }
  },
  jf = 'ng-app-id',
  oy = (() => {
    let e = class e {
      constructor(n, r, o, s = {}) {
        (this.doc = n),
          (this.appId = r),
          (this.nonce = o),
          (this.platformId = s),
          (this.styleRef = new Map()),
          (this.hostNodes = new Set()),
          (this.styleNodesInDOM = this.collectServerRenderedStyles()),
          (this.platformIsServer = Ff(s)),
          this.resetHostNodes();
      }
      addStyles(n) {
        for (let r of n)
          this.changeUsageCount(r, 1) === 1 && this.onStyleAdded(r);
      }
      removeStyles(n) {
        for (let r of n)
          this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
      }
      ngOnDestroy() {
        let n = this.styleNodesInDOM;
        n && (n.forEach((r) => r.remove()), n.clear());
        for (let r of this.getAllStyles()) this.onStyleRemoved(r);
        this.resetHostNodes();
      }
      addHost(n) {
        this.hostNodes.add(n);
        for (let r of this.getAllStyles()) this.addStyleToHost(n, r);
      }
      removeHost(n) {
        this.hostNodes.delete(n);
      }
      getAllStyles() {
        return this.styleRef.keys();
      }
      onStyleAdded(n) {
        for (let r of this.hostNodes) this.addStyleToHost(r, n);
      }
      onStyleRemoved(n) {
        let r = this.styleRef;
        r.get(n)?.elements?.forEach((o) => o.remove()), r.delete(n);
      }
      collectServerRenderedStyles() {
        let n = this.doc.head?.querySelectorAll(`style[${jf}="${this.appId}"]`);
        if (n?.length) {
          let r = new Map();
          return (
            n.forEach((o) => {
              o.textContent != null && r.set(o.textContent, o);
            }),
            r
          );
        }
        return null;
      }
      changeUsageCount(n, r) {
        let o = this.styleRef;
        if (o.has(n)) {
          let s = o.get(n);
          return (s.usage += r), s.usage;
        }
        return o.set(n, { usage: r, elements: [] }), r;
      }
      getStyleElement(n, r) {
        let o = this.styleNodesInDOM,
          s = o?.get(r);
        if (s?.parentNode === n) return o.delete(r), s.removeAttribute(jf), s;
        {
          let a = this.doc.createElement('style');
          return (
            this.nonce && a.setAttribute('nonce', this.nonce),
            (a.textContent = r),
            this.platformIsServer && a.setAttribute(jf, this.appId),
            n.appendChild(a),
            a
          );
        }
      }
      addStyleToHost(n, r) {
        let o = this.getStyleElement(n, r),
          s = this.styleRef,
          a = s.get(r)?.elements;
        a ? a.push(o) : s.set(r, { elements: [o], usage: 1 });
      }
      resetHostNodes() {
        let n = this.hostNodes;
        n.clear(), n.add(this.doc.head);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(ne), v(_o), v(yo, 8), v(Bt));
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  Bf = {
    svg: 'http://www.w3.org/2000/svg',
    xhtml: 'http://www.w3.org/1999/xhtml',
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace',
    xmlns: 'http://www.w3.org/2000/xmlns/',
    math: 'http://www.w3.org/1998/MathML/',
  },
  Wf = /%COMP%/g,
  sy = '%COMP%',
  Bk = `_nghost-${sy}`,
  Uk = `_ngcontent-${sy}`,
  Hk = !0,
  $k = new w('RemoveStylesOnCompDestroy', {
    providedIn: 'root',
    factory: () => Hk,
  });
function zk(t) {
  return Uk.replace(Wf, t);
}
function Wk(t) {
  return Bk.replace(Wf, t);
}
function ay(t, e) {
  return e.map((i) => i.replace(Wf, t));
}
var Ic = (() => {
    let e = class e {
      constructor(n, r, o, s, a, c, l, d = null) {
        (this.eventManager = n),
          (this.sharedStylesHost = r),
          (this.appId = o),
          (this.removeStylesOnCompDestroy = s),
          (this.doc = a),
          (this.platformId = c),
          (this.ngZone = l),
          (this.nonce = d),
          (this.rendererByCompId = new Map()),
          (this.platformIsServer = Ff(c)),
          (this.defaultRenderer = new Ro(n, a, l, this.platformIsServer));
      }
      createRenderer(n, r) {
        if (!n || !r) return this.defaultRenderer;
        this.platformIsServer &&
          r.encapsulation === Yt.ShadowDom &&
          (r = he(x({}, r), { encapsulation: Yt.Emulated }));
        let o = this.getOrCreateRenderer(n, r);
        return (
          o instanceof Mc
            ? o.applyToHost(n)
            : o instanceof Fo && o.applyStyles(),
          o
        );
      }
      getOrCreateRenderer(n, r) {
        let o = this.rendererByCompId,
          s = o.get(r.id);
        if (!s) {
          let a = this.doc,
            c = this.ngZone,
            l = this.eventManager,
            d = this.sharedStylesHost,
            u = this.removeStylesOnCompDestroy,
            f = this.platformIsServer;
          switch (r.encapsulation) {
            case Yt.Emulated:
              s = new Mc(l, d, r, this.appId, u, a, c, f);
              break;
            case Yt.ShadowDom:
              return new zf(l, d, n, r, a, c, this.nonce, f);
            default:
              s = new Fo(l, d, r, u, a, c, f);
              break;
          }
          o.set(r.id, s);
        }
        return s;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(
        v(ry),
        v(oy),
        v(_o),
        v($k),
        v(ne),
        v(Bt),
        v(I),
        v(yo)
      );
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  Ro = class {
    constructor(e, i, n, r) {
      (this.eventManager = e),
        (this.doc = i),
        (this.ngZone = n),
        (this.platformIsServer = r),
        (this.data = Object.create(null)),
        (this.throwOnSyntheticProps = !0),
        (this.destroyNode = null);
    }
    destroy() {}
    createElement(e, i) {
      return i
        ? this.doc.createElementNS(Bf[i] || i, e)
        : this.doc.createElement(e);
    }
    createComment(e) {
      return this.doc.createComment(e);
    }
    createText(e) {
      return this.doc.createTextNode(e);
    }
    appendChild(e, i) {
      (ny(e) ? e.content : e).appendChild(i);
    }
    insertBefore(e, i, n) {
      e && (ny(e) ? e.content : e).insertBefore(i, n);
    }
    removeChild(e, i) {
      e && e.removeChild(i);
    }
    selectRootElement(e, i) {
      let n = typeof e == 'string' ? this.doc.querySelector(e) : e;
      if (!n) throw new _(-5104, !1);
      return i || (n.textContent = ''), n;
    }
    parentNode(e) {
      return e.parentNode;
    }
    nextSibling(e) {
      return e.nextSibling;
    }
    setAttribute(e, i, n, r) {
      if (r) {
        i = r + ':' + i;
        let o = Bf[r];
        o ? e.setAttributeNS(o, i, n) : e.setAttribute(i, n);
      } else e.setAttribute(i, n);
    }
    removeAttribute(e, i, n) {
      if (n) {
        let r = Bf[n];
        r ? e.removeAttributeNS(r, i) : e.removeAttribute(`${n}:${i}`);
      } else e.removeAttribute(i);
    }
    addClass(e, i) {
      e.classList.add(i);
    }
    removeClass(e, i) {
      e.classList.remove(i);
    }
    setStyle(e, i, n, r) {
      r & (fn.DashCase | fn.Important)
        ? e.style.setProperty(i, n, r & fn.Important ? 'important' : '')
        : (e.style[i] = n);
    }
    removeStyle(e, i, n) {
      n & fn.DashCase ? e.style.removeProperty(i) : (e.style[i] = '');
    }
    setProperty(e, i, n) {
      e != null && (e[i] = n);
    }
    setValue(e, i) {
      e.nodeValue = i;
    }
    listen(e, i, n) {
      if (
        typeof e == 'string' &&
        ((e = _n().getGlobalEventTarget(this.doc, e)), !e)
      )
        throw new Error(`Unsupported event target ${e} for event ${i}`);
      return this.eventManager.addEventListener(
        e,
        i,
        this.decoratePreventDefault(n)
      );
    }
    decoratePreventDefault(e) {
      return (i) => {
        if (i === '__ngUnwrap__') return e;
        (this.platformIsServer ? this.ngZone.runGuarded(() => e(i)) : e(i)) ===
          !1 && i.preventDefault();
      };
    }
  };
function ny(t) {
  return t.tagName === 'TEMPLATE' && t.content !== void 0;
}
var zf = class extends Ro {
    constructor(e, i, n, r, o, s, a, c) {
      super(e, o, s, c),
        (this.sharedStylesHost = i),
        (this.hostEl = n),
        (this.shadowRoot = n.attachShadow({ mode: 'open' })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let l = ay(r.id, r.styles);
      for (let d of l) {
        let u = document.createElement('style');
        a && u.setAttribute('nonce', a),
          (u.textContent = d),
          this.shadowRoot.appendChild(u);
      }
    }
    nodeOrShadowRoot(e) {
      return e === this.hostEl ? this.shadowRoot : e;
    }
    appendChild(e, i) {
      return super.appendChild(this.nodeOrShadowRoot(e), i);
    }
    insertBefore(e, i, n) {
      return super.insertBefore(this.nodeOrShadowRoot(e), i, n);
    }
    removeChild(e, i) {
      return super.removeChild(this.nodeOrShadowRoot(e), i);
    }
    parentNode(e) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  Fo = class extends Ro {
    constructor(e, i, n, r, o, s, a, c) {
      super(e, o, s, a),
        (this.sharedStylesHost = i),
        (this.removeStylesOnCompDestroy = r),
        (this.styles = c ? ay(c, n.styles) : n.styles);
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        this.sharedStylesHost.removeStyles(this.styles);
    }
  },
  Mc = class extends Fo {
    constructor(e, i, n, r, o, s, a, c) {
      let l = r + '-' + n.id;
      super(e, i, n, o, s, a, c, l),
        (this.contentAttr = zk(l)),
        (this.hostAttr = Wk(l));
    }
    applyToHost(e) {
      this.applyStyles(), this.setAttribute(e, this.hostAttr, '');
    }
    createElement(e, i) {
      let n = super.createElement(e, i);
      return super.setAttribute(n, this.contentAttr, ''), n;
    }
  },
  Gk = (() => {
    let e = class e extends Dc {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return !0;
      }
      addEventListener(n, r, o) {
        return (
          n.addEventListener(r, o, !1), () => this.removeEventListener(n, r, o)
        );
      }
      removeEventListener(n, r, o) {
        return n.removeEventListener(r, o);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(ne));
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  iy = ['alt', 'control', 'meta', 'shift'],
  qk = {
    '\b': 'Backspace',
    '	': 'Tab',
    '\x7F': 'Delete',
    '\x1B': 'Escape',
    Del: 'Delete',
    Esc: 'Escape',
    Left: 'ArrowLeft',
    Right: 'ArrowRight',
    Up: 'ArrowUp',
    Down: 'ArrowDown',
    Menu: 'ContextMenu',
    Scroll: 'ScrollLock',
    Win: 'OS',
  },
  Qk = {
    alt: (t) => t.altKey,
    control: (t) => t.ctrlKey,
    meta: (t) => t.metaKey,
    shift: (t) => t.shiftKey,
  },
  Zk = (() => {
    let e = class e extends Dc {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return e.parseEventName(n) != null;
      }
      addEventListener(n, r, o) {
        let s = e.parseEventName(r),
          a = e.eventCallback(s.fullKey, o, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => _n().onAndCancel(n, s.domEventName, a));
      }
      static parseEventName(n) {
        let r = n.toLowerCase().split('.'),
          o = r.shift();
        if (r.length === 0 || !(o === 'keydown' || o === 'keyup')) return null;
        let s = e._normalizeKey(r.pop()),
          a = '',
          c = r.indexOf('code');
        if (
          (c > -1 && (r.splice(c, 1), (a = 'code.')),
          iy.forEach((d) => {
            let u = r.indexOf(d);
            u > -1 && (r.splice(u, 1), (a += d + '.'));
          }),
          (a += s),
          r.length != 0 || s.length === 0)
        )
          return null;
        let l = {};
        return (l.domEventName = o), (l.fullKey = a), l;
      }
      static matchEventFullKeyCode(n, r) {
        let o = qk[n.key] || n.key,
          s = '';
        return (
          r.indexOf('code.') > -1 && ((o = n.code), (s = 'code.')),
          o == null || !o
            ? !1
            : ((o = o.toLowerCase()),
              o === ' ' ? (o = 'space') : o === '.' && (o = 'dot'),
              iy.forEach((a) => {
                if (a !== o) {
                  let c = Qk[a];
                  c(n) && (s += a + '.');
                }
              }),
              (s += o),
              s === r)
        );
      }
      static eventCallback(n, r, o) {
        return (s) => {
          e.matchEventFullKeyCode(s, n) && o.runGuarded(() => r(s));
        };
      }
      static _normalizeKey(n) {
        return n === 'esc' ? 'escape' : n;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(ne));
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })();
function cy(t, e) {
  return k_(x({ rootComponent: t }, Yk(e)));
}
function Yk(t) {
  return {
    appProviders: [...tA, ...(t?.providers ?? [])],
    platformProviders: eA,
  };
}
function Xk() {
  Hf.makeCurrent();
}
function Kk() {
  return new dt();
}
function Jk() {
  return Ub(document), document;
}
var eA = [
  { provide: Bt, useValue: Rf },
  { provide: af, useValue: Xk, multi: !0 },
  { provide: ne, useFactory: Jk, deps: [] },
];
var tA = [
  { provide: Ka, useValue: 'root' },
  { provide: dt, useFactory: Kk, deps: [] },
  { provide: $f, useClass: Gk, multi: !0, deps: [ne, I, Bt] },
  { provide: $f, useClass: Zk, multi: !0, deps: [ne] },
  Ic,
  oy,
  ry,
  { provide: Ci, useExisting: Ic },
  { provide: xc, useClass: jk, deps: [] },
  [],
];
function nA() {
  return new Gf(v(ne));
}
var Gf = (() => {
  let e = class e {
    constructor(n) {
      this._doc = n;
    }
    getTitle() {
      return this._doc.title;
    }
    setTitle(n) {
      this._doc.title = n || '';
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(v(ne));
  }),
    (e.ɵprov = y({
      token: e,
      factory: function (r) {
        let o = null;
        return r ? (o = new r()) : (o = nA()), o;
      },
      providedIn: 'root',
    }));
  let t = e;
  return t;
})();
var No = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = y({
      token: e,
      factory: function (r) {
        let o = null;
        return r ? (o = new (r || e)()) : (o = v(ly)), o;
      },
      providedIn: 'root',
    }));
  let t = e;
  return t;
})();
function iA(t) {
  return new ly(t.get(ne));
}
var ly = (() => {
  let e = class e extends No {
    constructor(n) {
      super(), (this._doc = n);
    }
    sanitize(n, r) {
      if (r == null) return null;
      switch (n) {
        case ot.NONE:
          return r;
        case ot.HTML:
          return Si(r, 'HTML') ? Xt(r) : gv(this._doc, String(r)).toString();
        case ot.STYLE:
          return Si(r, 'Style') ? Xt(r) : r;
        case ot.SCRIPT:
          if (Si(r, 'Script')) return Xt(r);
          throw new _(5200, !1);
        case ot.URL:
          return Si(r, 'URL') ? Xt(r) : nc(String(r));
        case ot.RESOURCE_URL:
          if (Si(r, 'ResourceURL')) return Xt(r);
          throw new _(5201, !1);
        default:
          throw new _(5202, !1);
      }
    }
    bypassSecurityTrustHtml(n) {
      return av(n);
    }
    bypassSecurityTrustStyle(n) {
      return cv(n);
    }
    bypassSecurityTrustScript(n) {
      return lv(n);
    }
    bypassSecurityTrustUrl(n) {
      return dv(n);
    }
    bypassSecurityTrustResourceUrl(n) {
      return uv(n);
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(v(ne));
  }),
    (e.ɵprov = y({
      token: e,
      factory: function (r) {
        let o = null;
        return r ? (o = new r()) : (o = iA(v(St))), o;
      },
      providedIn: 'root',
    }));
  let t = e;
  return t;
})();
function dy(...t) {
  let e = [],
    i = new Set(),
    n = i.has(1);
  for (let { ɵproviders: r, ɵkind: o } of t) i.add(o), r.length && e.push(r);
  return Mi([[], A_(), i.has(0) || n ? [] : ty({}), e]);
}
var by = (() => {
    let e = class e {
      constructor(n, r) {
        (this._renderer = n),
          (this._elementRef = r),
          (this.onChange = (o) => {}),
          (this.onTouched = () => {});
      }
      setProperty(n, r) {
        this._renderer.setProperty(this._elementRef.nativeElement, n, r);
      }
      registerOnTouched(n) {
        this.onTouched = n;
      }
      registerOnChange(n) {
        this.onChange = n;
      }
      setDisabledState(n) {
        this.setProperty('disabled', n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(p(Bn), p(z));
    }),
      (e.ɵdir = q({ type: e }));
    let t = e;
    return t;
  })(),
  rA = (() => {
    let e = class e extends by {};
    (e.ɵfac = (() => {
      let n;
      return function (o) {
        return (n || (n = vr(e)))(o || e);
      };
    })()),
      (e.ɵdir = q({ type: e, features: [Re] }));
    let t = e;
    return t;
  })(),
  xn = new w('NgValueAccessor');
var oA = { provide: xn, useExisting: ut(() => Vc), multi: !0 };
function sA() {
  let t = _n() ? _n().getUserAgent() : '';
  return /android (\d+)/.test(t.toLowerCase());
}
var aA = new w('CompositionEventMode'),
  Vc = (() => {
    let e = class e extends by {
      constructor(n, r, o) {
        super(n, r),
          (this._compositionMode = o),
          (this._composing = !1),
          this._compositionMode == null && (this._compositionMode = !sA());
      }
      writeValue(n) {
        let r = n ?? '';
        this.setProperty('value', r);
      }
      _handleInput(n) {
        (!this._compositionMode ||
          (this._compositionMode && !this._composing)) &&
          this.onChange(n);
      }
      _compositionStart() {
        this._composing = !0;
      }
      _compositionEnd(n) {
        (this._composing = !1), this._compositionMode && this.onChange(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(p(Bn), p(z), p(aA, 8));
    }),
      (e.ɵdir = q({
        type: e,
        selectors: [
          ['input', 'formControlName', '', 3, 'type', 'checkbox'],
          ['textarea', 'formControlName', ''],
          ['input', 'formControl', '', 3, 'type', 'checkbox'],
          ['textarea', 'formControl', ''],
          ['input', 'ngModel', '', 3, 'type', 'checkbox'],
          ['textarea', 'ngModel', ''],
          ['', 'ngDefaultControl', ''],
        ],
        hostBindings: function (r, o) {
          r & 1 &&
            ye('input', function (a) {
              return o._handleInput(a.target.value);
            })('blur', function () {
              return o.onTouched();
            })('compositionstart', function () {
              return o._compositionStart();
            })('compositionend', function (a) {
              return o._compositionEnd(a.target.value);
            });
        },
        features: [Pe([oA]), Re],
      }));
    let t = e;
    return t;
  })();
function Gn(t) {
  return (
    t == null || ((typeof t == 'string' || Array.isArray(t)) && t.length === 0)
  );
}
function vy(t) {
  return t != null && typeof t.length == 'number';
}
var jo = new w('NgValidators'),
  jc = new w('NgAsyncValidators'),
  cA =
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  Tc = class {
    static min(e) {
      return lA(e);
    }
    static max(e) {
      return dA(e);
    }
    static required(e) {
      return uA(e);
    }
    static requiredTrue(e) {
      return fA(e);
    }
    static email(e) {
      return hA(e);
    }
    static minLength(e) {
      return mA(e);
    }
    static maxLength(e) {
      return pA(e);
    }
    static pattern(e) {
      return gA(e);
    }
    static nullValidator(e) {
      return _y(e);
    }
    static compose(e) {
      return Dy(e);
    }
    static composeAsync(e) {
      return Iy(e);
    }
  };
function lA(t) {
  return (e) => {
    if (Gn(e.value) || Gn(t)) return null;
    let i = parseFloat(e.value);
    return !isNaN(i) && i < t ? { min: { min: t, actual: e.value } } : null;
  };
}
function dA(t) {
  return (e) => {
    if (Gn(e.value) || Gn(t)) return null;
    let i = parseFloat(e.value);
    return !isNaN(i) && i > t ? { max: { max: t, actual: e.value } } : null;
  };
}
function uA(t) {
  return Gn(t.value) ? { required: !0 } : null;
}
function fA(t) {
  return t.value === !0 ? null : { required: !0 };
}
function hA(t) {
  return Gn(t.value) || cA.test(t.value) ? null : { email: !0 };
}
function mA(t) {
  return (e) =>
    Gn(e.value) || !vy(e.value)
      ? null
      : e.value.length < t
      ? { minlength: { requiredLength: t, actualLength: e.value.length } }
      : null;
}
function pA(t) {
  return (e) =>
    vy(e.value) && e.value.length > t
      ? { maxlength: { requiredLength: t, actualLength: e.value.length } }
      : null;
}
function gA(t) {
  if (!t) return _y;
  let e, i;
  return (
    typeof t == 'string'
      ? ((i = ''),
        t.charAt(0) !== '^' && (i += '^'),
        (i += t),
        t.charAt(t.length - 1) !== '$' && (i += '$'),
        (e = new RegExp(i)))
      : ((i = t.toString()), (e = t)),
    (n) => {
      if (Gn(n.value)) return null;
      let r = n.value;
      return e.test(r)
        ? null
        : { pattern: { requiredPattern: i, actualValue: r } };
    }
  );
}
function _y(t) {
  return null;
}
function yy(t) {
  return t != null;
}
function xy(t) {
  return Ai(t) ? ve(t) : t;
}
function wy(t) {
  let e = {};
  return (
    t.forEach((i) => {
      e = i != null ? x(x({}, e), i) : e;
    }),
    Object.keys(e).length === 0 ? null : e
  );
}
function Ey(t, e) {
  return e.map((i) => i(t));
}
function bA(t) {
  return !t.validate;
}
function Cy(t) {
  return t.map((e) => (bA(e) ? e : (i) => e.validate(i)));
}
function Dy(t) {
  if (!t) return null;
  let e = t.filter(yy);
  return e.length == 0
    ? null
    : function (i) {
        return wy(Ey(i, e));
      };
}
function Zf(t) {
  return t != null ? Dy(Cy(t)) : null;
}
function Iy(t) {
  if (!t) return null;
  let e = t.filter(yy);
  return e.length == 0
    ? null
    : function (i) {
        let n = Ey(i, e).map(xy);
        return Qr(n).pipe(A(wy));
      };
}
function Yf(t) {
  return t != null ? Iy(Cy(t)) : null;
}
function uy(t, e) {
  return t === null ? [e] : Array.isArray(t) ? [...t, e] : [t, e];
}
function My(t) {
  return t._rawValidators;
}
function Sy(t) {
  return t._rawAsyncValidators;
}
function Qf(t) {
  return t ? (Array.isArray(t) ? t : [t]) : [];
}
function kc(t, e) {
  return Array.isArray(t) ? t.includes(e) : t === e;
}
function fy(t, e) {
  let i = Qf(e);
  return (
    Qf(t).forEach((r) => {
      kc(i, r) || i.push(r);
    }),
    i
  );
}
function hy(t, e) {
  return Qf(e).filter((i) => !kc(t, i));
}
var Ac = class {
    constructor() {
      (this._rawValidators = []),
        (this._rawAsyncValidators = []),
        (this._onDestroyCallbacks = []);
    }
    get value() {
      return this.control ? this.control.value : null;
    }
    get valid() {
      return this.control ? this.control.valid : null;
    }
    get invalid() {
      return this.control ? this.control.invalid : null;
    }
    get pending() {
      return this.control ? this.control.pending : null;
    }
    get disabled() {
      return this.control ? this.control.disabled : null;
    }
    get enabled() {
      return this.control ? this.control.enabled : null;
    }
    get errors() {
      return this.control ? this.control.errors : null;
    }
    get pristine() {
      return this.control ? this.control.pristine : null;
    }
    get dirty() {
      return this.control ? this.control.dirty : null;
    }
    get touched() {
      return this.control ? this.control.touched : null;
    }
    get status() {
      return this.control ? this.control.status : null;
    }
    get untouched() {
      return this.control ? this.control.untouched : null;
    }
    get statusChanges() {
      return this.control ? this.control.statusChanges : null;
    }
    get valueChanges() {
      return this.control ? this.control.valueChanges : null;
    }
    get path() {
      return null;
    }
    _setValidators(e) {
      (this._rawValidators = e || []),
        (this._composedValidatorFn = Zf(this._rawValidators));
    }
    _setAsyncValidators(e) {
      (this._rawAsyncValidators = e || []),
        (this._composedAsyncValidatorFn = Yf(this._rawAsyncValidators));
    }
    get validator() {
      return this._composedValidatorFn || null;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn || null;
    }
    _registerOnDestroy(e) {
      this._onDestroyCallbacks.push(e);
    }
    _invokeOnDestroyCallbacks() {
      this._onDestroyCallbacks.forEach((e) => e()),
        (this._onDestroyCallbacks = []);
    }
    reset(e = void 0) {
      this.control && this.control.reset(e);
    }
    hasError(e, i) {
      return this.control ? this.control.hasError(e, i) : !1;
    }
    getError(e, i) {
      return this.control ? this.control.getError(e, i) : null;
    }
  },
  qn = class extends Ac {
    get formDirective() {
      return null;
    }
    get path() {
      return null;
    }
  },
  yn = class extends Ac {
    constructor() {
      super(...arguments),
        (this._parent = null),
        (this.name = null),
        (this.valueAccessor = null);
    }
  },
  Rc = class {
    constructor(e) {
      this._cd = e;
    }
    get isTouched() {
      return !!this._cd?.control?.touched;
    }
    get isUntouched() {
      return !!this._cd?.control?.untouched;
    }
    get isPristine() {
      return !!this._cd?.control?.pristine;
    }
    get isDirty() {
      return !!this._cd?.control?.dirty;
    }
    get isValid() {
      return !!this._cd?.control?.valid;
    }
    get isInvalid() {
      return !!this._cd?.control?.invalid;
    }
    get isPending() {
      return !!this._cd?.control?.pending;
    }
    get isSubmitted() {
      return !!this._cd?.submitted;
    }
  },
  vA = {
    '[class.ng-untouched]': 'isUntouched',
    '[class.ng-touched]': 'isTouched',
    '[class.ng-pristine]': 'isPristine',
    '[class.ng-dirty]': 'isDirty',
    '[class.ng-valid]': 'isValid',
    '[class.ng-invalid]': 'isInvalid',
    '[class.ng-pending]': 'isPending',
  },
  uz = he(x({}, vA), { '[class.ng-submitted]': 'isSubmitted' }),
  Ty = (() => {
    let e = class e extends Rc {
      constructor(n) {
        super(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(p(yn, 2));
    }),
      (e.ɵdir = q({
        type: e,
        selectors: [
          ['', 'formControlName', ''],
          ['', 'ngModel', ''],
          ['', 'formControl', ''],
        ],
        hostVars: 14,
        hostBindings: function (r, o) {
          r & 2 &&
            X('ng-untouched', o.isUntouched)('ng-touched', o.isTouched)(
              'ng-pristine',
              o.isPristine
            )('ng-dirty', o.isDirty)('ng-valid', o.isValid)(
              'ng-invalid',
              o.isInvalid
            )('ng-pending', o.isPending);
        },
        features: [Re],
      }));
    let t = e;
    return t;
  })(),
  ky = (() => {
    let e = class e extends Rc {
      constructor(n) {
        super(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(p(qn, 10));
    }),
      (e.ɵdir = q({
        type: e,
        selectors: [
          ['', 'formGroupName', ''],
          ['', 'formArrayName', ''],
          ['', 'ngModelGroup', ''],
          ['', 'formGroup', ''],
          ['form', 3, 'ngNoForm', ''],
          ['', 'ngForm', ''],
        ],
        hostVars: 16,
        hostBindings: function (r, o) {
          r & 2 &&
            X('ng-untouched', o.isUntouched)('ng-touched', o.isTouched)(
              'ng-pristine',
              o.isPristine
            )('ng-dirty', o.isDirty)('ng-valid', o.isValid)(
              'ng-invalid',
              o.isInvalid
            )('ng-pending', o.isPending)('ng-submitted', o.isSubmitted);
        },
        features: [Re],
      }));
    let t = e;
    return t;
  })();
var Oo = 'VALID',
  Sc = 'INVALID',
  xr = 'PENDING',
  Po = 'DISABLED';
function Ay(t) {
  return (Bc(t) ? t.validators : t) || null;
}
function _A(t) {
  return Array.isArray(t) ? Zf(t) : t || null;
}
function Ry(t, e) {
  return (Bc(e) ? e.asyncValidators : t) || null;
}
function yA(t) {
  return Array.isArray(t) ? Yf(t) : t || null;
}
function Bc(t) {
  return t != null && !Array.isArray(t) && typeof t == 'object';
}
function xA(t, e, i) {
  let n = t.controls;
  if (!(e ? Object.keys(n) : n).length) throw new _(1e3, '');
  if (!n[i]) throw new _(1001, '');
}
function wA(t, e, i) {
  t._forEachChild((n, r) => {
    if (i[r] === void 0) throw new _(1002, '');
  });
}
var Fc = class {
    constructor(e, i) {
      (this._pendingDirty = !1),
        (this._hasOwnPendingAsyncValidator = !1),
        (this._pendingTouched = !1),
        (this._onCollectionChange = () => {}),
        (this._parent = null),
        (this.pristine = !0),
        (this.touched = !1),
        (this._onDisabledChange = []),
        this._assignValidators(e),
        this._assignAsyncValidators(i);
    }
    get validator() {
      return this._composedValidatorFn;
    }
    set validator(e) {
      this._rawValidators = this._composedValidatorFn = e;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn;
    }
    set asyncValidator(e) {
      this._rawAsyncValidators = this._composedAsyncValidatorFn = e;
    }
    get parent() {
      return this._parent;
    }
    get valid() {
      return this.status === Oo;
    }
    get invalid() {
      return this.status === Sc;
    }
    get pending() {
      return this.status == xr;
    }
    get disabled() {
      return this.status === Po;
    }
    get enabled() {
      return this.status !== Po;
    }
    get dirty() {
      return !this.pristine;
    }
    get untouched() {
      return !this.touched;
    }
    get updateOn() {
      return this._updateOn
        ? this._updateOn
        : this.parent
        ? this.parent.updateOn
        : 'change';
    }
    setValidators(e) {
      this._assignValidators(e);
    }
    setAsyncValidators(e) {
      this._assignAsyncValidators(e);
    }
    addValidators(e) {
      this.setValidators(fy(e, this._rawValidators));
    }
    addAsyncValidators(e) {
      this.setAsyncValidators(fy(e, this._rawAsyncValidators));
    }
    removeValidators(e) {
      this.setValidators(hy(e, this._rawValidators));
    }
    removeAsyncValidators(e) {
      this.setAsyncValidators(hy(e, this._rawAsyncValidators));
    }
    hasValidator(e) {
      return kc(this._rawValidators, e);
    }
    hasAsyncValidator(e) {
      return kc(this._rawAsyncValidators, e);
    }
    clearValidators() {
      this.validator = null;
    }
    clearAsyncValidators() {
      this.asyncValidator = null;
    }
    markAsTouched(e = {}) {
      (this.touched = !0),
        this._parent && !e.onlySelf && this._parent.markAsTouched(e);
    }
    markAllAsTouched() {
      this.markAsTouched({ onlySelf: !0 }),
        this._forEachChild((e) => e.markAllAsTouched());
    }
    markAsUntouched(e = {}) {
      (this.touched = !1),
        (this._pendingTouched = !1),
        this._forEachChild((i) => {
          i.markAsUntouched({ onlySelf: !0 });
        }),
        this._parent && !e.onlySelf && this._parent._updateTouched(e);
    }
    markAsDirty(e = {}) {
      (this.pristine = !1),
        this._parent && !e.onlySelf && this._parent.markAsDirty(e);
    }
    markAsPristine(e = {}) {
      (this.pristine = !0),
        (this._pendingDirty = !1),
        this._forEachChild((i) => {
          i.markAsPristine({ onlySelf: !0 });
        }),
        this._parent && !e.onlySelf && this._parent._updatePristine(e);
    }
    markAsPending(e = {}) {
      (this.status = xr),
        e.emitEvent !== !1 && this.statusChanges.emit(this.status),
        this._parent && !e.onlySelf && this._parent.markAsPending(e);
    }
    disable(e = {}) {
      let i = this._parentMarkedDirty(e.onlySelf);
      (this.status = Po),
        (this.errors = null),
        this._forEachChild((n) => {
          n.disable(he(x({}, e), { onlySelf: !0 }));
        }),
        this._updateValue(),
        e.emitEvent !== !1 &&
          (this.valueChanges.emit(this.value),
          this.statusChanges.emit(this.status)),
        this._updateAncestors(he(x({}, e), { skipPristineCheck: i })),
        this._onDisabledChange.forEach((n) => n(!0));
    }
    enable(e = {}) {
      let i = this._parentMarkedDirty(e.onlySelf);
      (this.status = Oo),
        this._forEachChild((n) => {
          n.enable(he(x({}, e), { onlySelf: !0 }));
        }),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: e.emitEvent }),
        this._updateAncestors(he(x({}, e), { skipPristineCheck: i })),
        this._onDisabledChange.forEach((n) => n(!1));
    }
    _updateAncestors(e) {
      this._parent &&
        !e.onlySelf &&
        (this._parent.updateValueAndValidity(e),
        e.skipPristineCheck || this._parent._updatePristine(),
        this._parent._updateTouched());
    }
    setParent(e) {
      this._parent = e;
    }
    getRawValue() {
      return this.value;
    }
    updateValueAndValidity(e = {}) {
      this._setInitialStatus(),
        this._updateValue(),
        this.enabled &&
          (this._cancelExistingSubscription(),
          (this.errors = this._runValidator()),
          (this.status = this._calculateStatus()),
          (this.status === Oo || this.status === xr) &&
            this._runAsyncValidator(e.emitEvent)),
        e.emitEvent !== !1 &&
          (this.valueChanges.emit(this.value),
          this.statusChanges.emit(this.status)),
        this._parent && !e.onlySelf && this._parent.updateValueAndValidity(e);
    }
    _updateTreeValidity(e = { emitEvent: !0 }) {
      this._forEachChild((i) => i._updateTreeValidity(e)),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: e.emitEvent });
    }
    _setInitialStatus() {
      this.status = this._allControlsDisabled() ? Po : Oo;
    }
    _runValidator() {
      return this.validator ? this.validator(this) : null;
    }
    _runAsyncValidator(e) {
      if (this.asyncValidator) {
        (this.status = xr), (this._hasOwnPendingAsyncValidator = !0);
        let i = xy(this.asyncValidator(this));
        this._asyncValidationSubscription = i.subscribe((n) => {
          (this._hasOwnPendingAsyncValidator = !1),
            this.setErrors(n, { emitEvent: e });
        });
      }
    }
    _cancelExistingSubscription() {
      this._asyncValidationSubscription &&
        (this._asyncValidationSubscription.unsubscribe(),
        (this._hasOwnPendingAsyncValidator = !1));
    }
    setErrors(e, i = {}) {
      (this.errors = e), this._updateControlsErrors(i.emitEvent !== !1);
    }
    get(e) {
      let i = e;
      return i == null ||
        (Array.isArray(i) || (i = i.split('.')), i.length === 0)
        ? null
        : i.reduce((n, r) => n && n._find(r), this);
    }
    getError(e, i) {
      let n = i ? this.get(i) : this;
      return n && n.errors ? n.errors[e] : null;
    }
    hasError(e, i) {
      return !!this.getError(e, i);
    }
    get root() {
      let e = this;
      for (; e._parent; ) e = e._parent;
      return e;
    }
    _updateControlsErrors(e) {
      (this.status = this._calculateStatus()),
        e && this.statusChanges.emit(this.status),
        this._parent && this._parent._updateControlsErrors(e);
    }
    _initObservables() {
      (this.valueChanges = new Y()), (this.statusChanges = new Y());
    }
    _calculateStatus() {
      return this._allControlsDisabled()
        ? Po
        : this.errors
        ? Sc
        : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(xr)
        ? xr
        : this._anyControlsHaveStatus(Sc)
        ? Sc
        : Oo;
    }
    _anyControlsHaveStatus(e) {
      return this._anyControls((i) => i.status === e);
    }
    _anyControlsDirty() {
      return this._anyControls((e) => e.dirty);
    }
    _anyControlsTouched() {
      return this._anyControls((e) => e.touched);
    }
    _updatePristine(e = {}) {
      (this.pristine = !this._anyControlsDirty()),
        this._parent && !e.onlySelf && this._parent._updatePristine(e);
    }
    _updateTouched(e = {}) {
      (this.touched = this._anyControlsTouched()),
        this._parent && !e.onlySelf && this._parent._updateTouched(e);
    }
    _registerOnCollectionChange(e) {
      this._onCollectionChange = e;
    }
    _setUpdateStrategy(e) {
      Bc(e) && e.updateOn != null && (this._updateOn = e.updateOn);
    }
    _parentMarkedDirty(e) {
      let i = this._parent && this._parent.dirty;
      return !e && !!i && !this._parent._anyControlsDirty();
    }
    _find(e) {
      return null;
    }
    _assignValidators(e) {
      (this._rawValidators = Array.isArray(e) ? e.slice() : e),
        (this._composedValidatorFn = _A(this._rawValidators));
    }
    _assignAsyncValidators(e) {
      (this._rawAsyncValidators = Array.isArray(e) ? e.slice() : e),
        (this._composedAsyncValidatorFn = yA(this._rawAsyncValidators));
    }
  },
  Nc = class extends Fc {
    constructor(e, i, n) {
      super(Ay(i), Ry(n, i)),
        (this.controls = e),
        this._initObservables(),
        this._setUpdateStrategy(i),
        this._setUpControls(),
        this.updateValueAndValidity({
          onlySelf: !0,
          emitEvent: !!this.asyncValidator,
        });
    }
    registerControl(e, i) {
      return this.controls[e]
        ? this.controls[e]
        : ((this.controls[e] = i),
          i.setParent(this),
          i._registerOnCollectionChange(this._onCollectionChange),
          i);
    }
    addControl(e, i, n = {}) {
      this.registerControl(e, i),
        this.updateValueAndValidity({ emitEvent: n.emitEvent }),
        this._onCollectionChange();
    }
    removeControl(e, i = {}) {
      this.controls[e] &&
        this.controls[e]._registerOnCollectionChange(() => {}),
        delete this.controls[e],
        this.updateValueAndValidity({ emitEvent: i.emitEvent }),
        this._onCollectionChange();
    }
    setControl(e, i, n = {}) {
      this.controls[e] &&
        this.controls[e]._registerOnCollectionChange(() => {}),
        delete this.controls[e],
        i && this.registerControl(e, i),
        this.updateValueAndValidity({ emitEvent: n.emitEvent }),
        this._onCollectionChange();
    }
    contains(e) {
      return this.controls.hasOwnProperty(e) && this.controls[e].enabled;
    }
    setValue(e, i = {}) {
      wA(this, !0, e),
        Object.keys(e).forEach((n) => {
          xA(this, !0, n),
            this.controls[n].setValue(e[n], {
              onlySelf: !0,
              emitEvent: i.emitEvent,
            });
        }),
        this.updateValueAndValidity(i);
    }
    patchValue(e, i = {}) {
      e != null &&
        (Object.keys(e).forEach((n) => {
          let r = this.controls[n];
          r && r.patchValue(e[n], { onlySelf: !0, emitEvent: i.emitEvent });
        }),
        this.updateValueAndValidity(i));
    }
    reset(e = {}, i = {}) {
      this._forEachChild((n, r) => {
        n.reset(e ? e[r] : null, { onlySelf: !0, emitEvent: i.emitEvent });
      }),
        this._updatePristine(i),
        this._updateTouched(i),
        this.updateValueAndValidity(i);
    }
    getRawValue() {
      return this._reduceChildren(
        {},
        (e, i, n) => ((e[n] = i.getRawValue()), e)
      );
    }
    _syncPendingControls() {
      let e = this._reduceChildren(!1, (i, n) =>
        n._syncPendingControls() ? !0 : i
      );
      return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
    }
    _forEachChild(e) {
      Object.keys(this.controls).forEach((i) => {
        let n = this.controls[i];
        n && e(n, i);
      });
    }
    _setUpControls() {
      this._forEachChild((e) => {
        e.setParent(this),
          e._registerOnCollectionChange(this._onCollectionChange);
      });
    }
    _updateValue() {
      this.value = this._reduceValue();
    }
    _anyControls(e) {
      for (let [i, n] of Object.entries(this.controls))
        if (this.contains(i) && e(n)) return !0;
      return !1;
    }
    _reduceValue() {
      let e = {};
      return this._reduceChildren(
        e,
        (i, n, r) => ((n.enabled || this.disabled) && (i[r] = n.value), i)
      );
    }
    _reduceChildren(e, i) {
      let n = e;
      return (
        this._forEachChild((r, o) => {
          n = i(n, r, o);
        }),
        n
      );
    }
    _allControlsDisabled() {
      for (let e of Object.keys(this.controls))
        if (this.controls[e].enabled) return !1;
      return Object.keys(this.controls).length > 0 || this.disabled;
    }
    _find(e) {
      return this.controls.hasOwnProperty(e) ? this.controls[e] : null;
    }
  };
var wr = new w('CallSetDisabledState', {
    providedIn: 'root',
    factory: () => Uc,
  }),
  Uc = 'always';
function EA(t, e) {
  return [...e.path, t];
}
function Vo(t, e, i = Uc) {
  Xf(t, e),
    e.valueAccessor.writeValue(t.value),
    (t.disabled || i === 'always') &&
      e.valueAccessor.setDisabledState?.(t.disabled),
    DA(t, e),
    MA(t, e),
    IA(t, e),
    CA(t, e);
}
function Oc(t, e, i = !0) {
  let n = () => {};
  e.valueAccessor &&
    (e.valueAccessor.registerOnChange(n), e.valueAccessor.registerOnTouched(n)),
    Lc(t, e),
    t &&
      (e._invokeOnDestroyCallbacks(), t._registerOnCollectionChange(() => {}));
}
function Pc(t, e) {
  t.forEach((i) => {
    i.registerOnValidatorChange && i.registerOnValidatorChange(e);
  });
}
function CA(t, e) {
  if (e.valueAccessor.setDisabledState) {
    let i = (n) => {
      e.valueAccessor.setDisabledState(n);
    };
    t.registerOnDisabledChange(i),
      e._registerOnDestroy(() => {
        t._unregisterOnDisabledChange(i);
      });
  }
}
function Xf(t, e) {
  let i = My(t);
  e.validator !== null
    ? t.setValidators(uy(i, e.validator))
    : typeof i == 'function' && t.setValidators([i]);
  let n = Sy(t);
  e.asyncValidator !== null
    ? t.setAsyncValidators(uy(n, e.asyncValidator))
    : typeof n == 'function' && t.setAsyncValidators([n]);
  let r = () => t.updateValueAndValidity();
  Pc(e._rawValidators, r), Pc(e._rawAsyncValidators, r);
}
function Lc(t, e) {
  let i = !1;
  if (t !== null) {
    if (e.validator !== null) {
      let r = My(t);
      if (Array.isArray(r) && r.length > 0) {
        let o = r.filter((s) => s !== e.validator);
        o.length !== r.length && ((i = !0), t.setValidators(o));
      }
    }
    if (e.asyncValidator !== null) {
      let r = Sy(t);
      if (Array.isArray(r) && r.length > 0) {
        let o = r.filter((s) => s !== e.asyncValidator);
        o.length !== r.length && ((i = !0), t.setAsyncValidators(o));
      }
    }
  }
  let n = () => {};
  return Pc(e._rawValidators, n), Pc(e._rawAsyncValidators, n), i;
}
function DA(t, e) {
  e.valueAccessor.registerOnChange((i) => {
    (t._pendingValue = i),
      (t._pendingChange = !0),
      (t._pendingDirty = !0),
      t.updateOn === 'change' && Fy(t, e);
  });
}
function IA(t, e) {
  e.valueAccessor.registerOnTouched(() => {
    (t._pendingTouched = !0),
      t.updateOn === 'blur' && t._pendingChange && Fy(t, e),
      t.updateOn !== 'submit' && t.markAsTouched();
  });
}
function Fy(t, e) {
  t._pendingDirty && t.markAsDirty(),
    t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
    e.viewToModelUpdate(t._pendingValue),
    (t._pendingChange = !1);
}
function MA(t, e) {
  let i = (n, r) => {
    e.valueAccessor.writeValue(n), r && e.viewToModelUpdate(n);
  };
  t.registerOnChange(i),
    e._registerOnDestroy(() => {
      t._unregisterOnChange(i);
    });
}
function Ny(t, e) {
  t == null, Xf(t, e);
}
function SA(t, e) {
  return Lc(t, e);
}
function Oy(t, e) {
  if (!t.hasOwnProperty('model')) return !1;
  let i = t.model;
  return i.isFirstChange() ? !0 : !Object.is(e, i.currentValue);
}
function TA(t) {
  return Object.getPrototypeOf(t.constructor) === rA;
}
function Py(t, e) {
  t._syncPendingControls(),
    e.forEach((i) => {
      let n = i.control;
      n.updateOn === 'submit' &&
        n._pendingChange &&
        (i.viewToModelUpdate(n._pendingValue), (n._pendingChange = !1));
    });
}
function Ly(t, e) {
  if (!e) return null;
  Array.isArray(e);
  let i, n, r;
  return (
    e.forEach((o) => {
      o.constructor === Vc ? (i = o) : TA(o) ? (n = o) : (r = o);
    }),
    r || n || i || null
  );
}
function kA(t, e) {
  let i = t.indexOf(e);
  i > -1 && t.splice(i, 1);
}
var AA = { provide: qn, useExisting: ut(() => Bo) },
  Lo = (() => Promise.resolve())(),
  Bo = (() => {
    let e = class e extends qn {
      constructor(n, r, o) {
        super(),
          (this.callSetDisabledState = o),
          (this.submitted = !1),
          (this._directives = new Set()),
          (this.ngSubmit = new Y()),
          (this.form = new Nc({}, Zf(n), Yf(r)));
      }
      ngAfterViewInit() {
        this._setUpdateStrategy();
      }
      get formDirective() {
        return this;
      }
      get control() {
        return this.form;
      }
      get path() {
        return [];
      }
      get controls() {
        return this.form.controls;
      }
      addControl(n) {
        Lo.then(() => {
          let r = this._findContainer(n.path);
          (n.control = r.registerControl(n.name, n.control)),
            Vo(n.control, n, this.callSetDisabledState),
            n.control.updateValueAndValidity({ emitEvent: !1 }),
            this._directives.add(n);
        });
      }
      getControl(n) {
        return this.form.get(n.path);
      }
      removeControl(n) {
        Lo.then(() => {
          let r = this._findContainer(n.path);
          r && r.removeControl(n.name), this._directives.delete(n);
        });
      }
      addFormGroup(n) {
        Lo.then(() => {
          let r = this._findContainer(n.path),
            o = new Nc({});
          Ny(o, n),
            r.registerControl(n.name, o),
            o.updateValueAndValidity({ emitEvent: !1 });
        });
      }
      removeFormGroup(n) {
        Lo.then(() => {
          let r = this._findContainer(n.path);
          r && r.removeControl(n.name);
        });
      }
      getFormGroup(n) {
        return this.form.get(n.path);
      }
      updateModel(n, r) {
        Lo.then(() => {
          this.form.get(n.path).setValue(r);
        });
      }
      setValue(n) {
        this.control.setValue(n);
      }
      onSubmit(n) {
        return (
          (this.submitted = !0),
          Py(this.form, this._directives),
          this.ngSubmit.emit(n),
          n?.target?.method === 'dialog'
        );
      }
      onReset() {
        this.resetForm();
      }
      resetForm(n = void 0) {
        this.form.reset(n), (this.submitted = !1);
      }
      _setUpdateStrategy() {
        this.options &&
          this.options.updateOn != null &&
          (this.form._updateOn = this.options.updateOn);
      }
      _findContainer(n) {
        return n.pop(), n.length ? this.form.get(n) : this.form;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(p(jo, 10), p(jc, 10), p(wr, 8));
    }),
      (e.ɵdir = q({
        type: e,
        selectors: [
          ['form', 3, 'ngNoForm', '', 3, 'formGroup', ''],
          ['ng-form'],
          ['', 'ngForm', ''],
        ],
        hostBindings: function (r, o) {
          r & 1 &&
            ye('submit', function (a) {
              return o.onSubmit(a);
            })('reset', function () {
              return o.onReset();
            });
        },
        inputs: { options: ['ngFormOptions', 'options'] },
        outputs: { ngSubmit: 'ngSubmit' },
        exportAs: ['ngForm'],
        features: [Pe([AA]), Re],
      }));
    let t = e;
    return t;
  })();
function my(t, e) {
  let i = t.indexOf(e);
  i > -1 && t.splice(i, 1);
}
function py(t) {
  return (
    typeof t == 'object' &&
    t !== null &&
    Object.keys(t).length === 2 &&
    'value' in t &&
    'disabled' in t
  );
}
var Uo = class extends Fc {
  constructor(e = null, i, n) {
    super(Ay(i), Ry(n, i)),
      (this.defaultValue = null),
      (this._onChange = []),
      (this._pendingChange = !1),
      this._applyFormState(e),
      this._setUpdateStrategy(i),
      this._initObservables(),
      this.updateValueAndValidity({
        onlySelf: !0,
        emitEvent: !!this.asyncValidator,
      }),
      Bc(i) &&
        (i.nonNullable || i.initialValueIsDefault) &&
        (py(e) ? (this.defaultValue = e.value) : (this.defaultValue = e));
  }
  setValue(e, i = {}) {
    (this.value = this._pendingValue = e),
      this._onChange.length &&
        i.emitModelToViewChange !== !1 &&
        this._onChange.forEach((n) =>
          n(this.value, i.emitViewToModelChange !== !1)
        ),
      this.updateValueAndValidity(i);
  }
  patchValue(e, i = {}) {
    this.setValue(e, i);
  }
  reset(e = this.defaultValue, i = {}) {
    this._applyFormState(e),
      this.markAsPristine(i),
      this.markAsUntouched(i),
      this.setValue(this.value, i),
      (this._pendingChange = !1);
  }
  _updateValue() {}
  _anyControls(e) {
    return !1;
  }
  _allControlsDisabled() {
    return this.disabled;
  }
  registerOnChange(e) {
    this._onChange.push(e);
  }
  _unregisterOnChange(e) {
    my(this._onChange, e);
  }
  registerOnDisabledChange(e) {
    this._onDisabledChange.push(e);
  }
  _unregisterOnDisabledChange(e) {
    my(this._onDisabledChange, e);
  }
  _forEachChild(e) {}
  _syncPendingControls() {
    return this.updateOn === 'submit' &&
      (this._pendingDirty && this.markAsDirty(),
      this._pendingTouched && this.markAsTouched(),
      this._pendingChange)
      ? (this.setValue(this._pendingValue, {
          onlySelf: !0,
          emitModelToViewChange: !1,
        }),
        !0)
      : !1;
  }
  _applyFormState(e) {
    py(e)
      ? ((this.value = this._pendingValue = e.value),
        e.disabled
          ? this.disable({ onlySelf: !0, emitEvent: !1 })
          : this.enable({ onlySelf: !0, emitEvent: !1 }))
      : (this.value = this._pendingValue = e);
  }
};
var RA = (t) => t instanceof Uo;
var FA = { provide: yn, useExisting: ut(() => Kf) },
  gy = (() => Promise.resolve())(),
  Kf = (() => {
    let e = class e extends yn {
      constructor(n, r, o, s, a, c) {
        super(),
          (this._changeDetectorRef = a),
          (this.callSetDisabledState = c),
          (this.control = new Uo()),
          (this._registered = !1),
          (this.name = ''),
          (this.update = new Y()),
          (this._parent = n),
          this._setValidators(r),
          this._setAsyncValidators(o),
          (this.valueAccessor = Ly(this, s));
      }
      ngOnChanges(n) {
        if ((this._checkForErrors(), !this._registered || 'name' in n)) {
          if (this._registered && (this._checkName(), this.formDirective)) {
            let r = n.name.previousValue;
            this.formDirective.removeControl({
              name: r,
              path: this._getPath(r),
            });
          }
          this._setUpControl();
        }
        'isDisabled' in n && this._updateDisabled(n),
          Oy(n, this.viewModel) &&
            (this._updateValue(this.model), (this.viewModel = this.model));
      }
      ngOnDestroy() {
        this.formDirective && this.formDirective.removeControl(this);
      }
      get path() {
        return this._getPath(this.name);
      }
      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      viewToModelUpdate(n) {
        (this.viewModel = n), this.update.emit(n);
      }
      _setUpControl() {
        this._setUpdateStrategy(),
          this._isStandalone()
            ? this._setUpStandalone()
            : this.formDirective.addControl(this),
          (this._registered = !0);
      }
      _setUpdateStrategy() {
        this.options &&
          this.options.updateOn != null &&
          (this.control._updateOn = this.options.updateOn);
      }
      _isStandalone() {
        return !this._parent || !!(this.options && this.options.standalone);
      }
      _setUpStandalone() {
        Vo(this.control, this, this.callSetDisabledState),
          this.control.updateValueAndValidity({ emitEvent: !1 });
      }
      _checkForErrors() {
        this._isStandalone() || this._checkParentType(), this._checkName();
      }
      _checkParentType() {}
      _checkName() {
        this.options && this.options.name && (this.name = this.options.name),
          !this._isStandalone() && this.name;
      }
      _updateValue(n) {
        gy.then(() => {
          this.control.setValue(n, { emitViewToModelChange: !1 }),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _updateDisabled(n) {
        let r = n.isDisabled.currentValue,
          o = r !== 0 && Me(r);
        gy.then(() => {
          o && !this.control.disabled
            ? this.control.disable()
            : !o && this.control.disabled && this.control.enable(),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _getPath(n) {
        return this._parent ? EA(n, this._parent) : [n];
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(
        p(qn, 9),
        p(jo, 10),
        p(jc, 10),
        p(xn, 10),
        p(ze, 8),
        p(wr, 8)
      );
    }),
      (e.ɵdir = q({
        type: e,
        selectors: [
          ['', 'ngModel', '', 3, 'formControlName', '', 3, 'formControl', ''],
        ],
        inputs: {
          name: 'name',
          isDisabled: ['disabled', 'isDisabled'],
          model: ['ngModel', 'model'],
          options: ['ngModelOptions', 'options'],
        },
        outputs: { update: 'ngModelChange' },
        exportAs: ['ngModel'],
        features: [Pe([FA]), Re, ft],
      }));
    let t = e;
    return t;
  })(),
  Vy = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵdir = q({
        type: e,
        selectors: [['form', 3, 'ngNoForm', '', 3, 'ngNativeValidate', '']],
        hostAttrs: ['novalidate', ''],
      }));
    let t = e;
    return t;
  })();
var NA = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = V({ type: e })),
    (e.ɵinj = L({}));
  let t = e;
  return t;
})();
var jy = new w('NgModelWithFormControlWarning'),
  OA = { provide: yn, useExisting: ut(() => Jf) },
  Jf = (() => {
    let e = class e extends yn {
      set isDisabled(n) {}
      constructor(n, r, o, s, a) {
        super(),
          (this._ngModelWarningConfig = s),
          (this.callSetDisabledState = a),
          (this.update = new Y()),
          (this._ngModelWarningSent = !1),
          this._setValidators(n),
          this._setAsyncValidators(r),
          (this.valueAccessor = Ly(this, o));
      }
      ngOnChanges(n) {
        if (this._isControlChanged(n)) {
          let r = n.form.previousValue;
          r && Oc(r, this, !1),
            Vo(this.form, this, this.callSetDisabledState),
            this.form.updateValueAndValidity({ emitEvent: !1 });
        }
        Oy(n, this.viewModel) &&
          (this.form.setValue(this.model), (this.viewModel = this.model));
      }
      ngOnDestroy() {
        this.form && Oc(this.form, this, !1);
      }
      get path() {
        return [];
      }
      get control() {
        return this.form;
      }
      viewToModelUpdate(n) {
        (this.viewModel = n), this.update.emit(n);
      }
      _isControlChanged(n) {
        return n.hasOwnProperty('form');
      }
    };
    (e._ngModelWarningSentOnce = !1),
      (e.ɵfac = function (r) {
        return new (r || e)(
          p(jo, 10),
          p(jc, 10),
          p(xn, 10),
          p(jy, 8),
          p(wr, 8)
        );
      }),
      (e.ɵdir = q({
        type: e,
        selectors: [['', 'formControl', '']],
        inputs: {
          form: ['formControl', 'form'],
          isDisabled: ['disabled', 'isDisabled'],
          model: ['ngModel', 'model'],
        },
        outputs: { update: 'ngModelChange' },
        exportAs: ['ngForm'],
        features: [Pe([OA]), Re, ft],
      }));
    let t = e;
    return t;
  })(),
  PA = { provide: qn, useExisting: ut(() => eh) },
  eh = (() => {
    let e = class e extends qn {
      constructor(n, r, o) {
        super(),
          (this.callSetDisabledState = o),
          (this.submitted = !1),
          (this._onCollectionChange = () => this._updateDomValue()),
          (this.directives = []),
          (this.form = null),
          (this.ngSubmit = new Y()),
          this._setValidators(n),
          this._setAsyncValidators(r);
      }
      ngOnChanges(n) {
        this._checkFormPresent(),
          n.hasOwnProperty('form') &&
            (this._updateValidators(),
            this._updateDomValue(),
            this._updateRegistrations(),
            (this._oldForm = this.form));
      }
      ngOnDestroy() {
        this.form &&
          (Lc(this.form, this),
          this.form._onCollectionChange === this._onCollectionChange &&
            this.form._registerOnCollectionChange(() => {}));
      }
      get formDirective() {
        return this;
      }
      get control() {
        return this.form;
      }
      get path() {
        return [];
      }
      addControl(n) {
        let r = this.form.get(n.path);
        return (
          Vo(r, n, this.callSetDisabledState),
          r.updateValueAndValidity({ emitEvent: !1 }),
          this.directives.push(n),
          r
        );
      }
      getControl(n) {
        return this.form.get(n.path);
      }
      removeControl(n) {
        Oc(n.control || null, n, !1), kA(this.directives, n);
      }
      addFormGroup(n) {
        this._setUpFormContainer(n);
      }
      removeFormGroup(n) {
        this._cleanUpFormContainer(n);
      }
      getFormGroup(n) {
        return this.form.get(n.path);
      }
      addFormArray(n) {
        this._setUpFormContainer(n);
      }
      removeFormArray(n) {
        this._cleanUpFormContainer(n);
      }
      getFormArray(n) {
        return this.form.get(n.path);
      }
      updateModel(n, r) {
        this.form.get(n.path).setValue(r);
      }
      onSubmit(n) {
        return (
          (this.submitted = !0),
          Py(this.form, this.directives),
          this.ngSubmit.emit(n),
          n?.target?.method === 'dialog'
        );
      }
      onReset() {
        this.resetForm();
      }
      resetForm(n = void 0) {
        this.form.reset(n), (this.submitted = !1);
      }
      _updateDomValue() {
        this.directives.forEach((n) => {
          let r = n.control,
            o = this.form.get(n.path);
          r !== o &&
            (Oc(r || null, n),
            RA(o) && (Vo(o, n, this.callSetDisabledState), (n.control = o)));
        }),
          this.form._updateTreeValidity({ emitEvent: !1 });
      }
      _setUpFormContainer(n) {
        let r = this.form.get(n.path);
        Ny(r, n), r.updateValueAndValidity({ emitEvent: !1 });
      }
      _cleanUpFormContainer(n) {
        if (this.form) {
          let r = this.form.get(n.path);
          r && SA(r, n) && r.updateValueAndValidity({ emitEvent: !1 });
        }
      }
      _updateRegistrations() {
        this.form._registerOnCollectionChange(this._onCollectionChange),
          this._oldForm && this._oldForm._registerOnCollectionChange(() => {});
      }
      _updateValidators() {
        Xf(this.form, this), this._oldForm && Lc(this._oldForm, this);
      }
      _checkFormPresent() {
        this.form;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(p(jo, 10), p(jc, 10), p(wr, 8));
    }),
      (e.ɵdir = q({
        type: e,
        selectors: [['', 'formGroup', '']],
        hostBindings: function (r, o) {
          r & 1 &&
            ye('submit', function (a) {
              return o.onSubmit(a);
            })('reset', function () {
              return o.onReset();
            });
        },
        inputs: { form: ['formGroup', 'form'] },
        outputs: { ngSubmit: 'ngSubmit' },
        exportAs: ['ngForm'],
        features: [Pe([PA]), Re, ft],
      }));
    let t = e;
    return t;
  })();
var By = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = V({ type: e })),
    (e.ɵinj = L({ imports: [NA] }));
  let t = e;
  return t;
})();
var Uy = (() => {
    let e = class e {
      static withConfig(n) {
        return {
          ngModule: e,
          providers: [{ provide: wr, useValue: n.callSetDisabledState ?? Uc }],
        };
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = V({ type: e })),
      (e.ɵinj = L({ imports: [By] }));
    let t = e;
    return t;
  })(),
  Hy = (() => {
    let e = class e {
      static withConfig(n) {
        return {
          ngModule: e,
          providers: [
            {
              provide: jy,
              useValue: n.warnOnNgModelWithFormControl ?? 'always',
            },
            { provide: wr, useValue: n.callSetDisabledState ?? Uc },
          ],
        };
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = V({ type: e })),
      (e.ɵinj = L({ imports: [By] }));
    let t = e;
    return t;
  })();
var nh;
try {
  nh = typeof Intl < 'u' && Intl.v8BreakIterator;
} catch {
  nh = !1;
}
var Ae = (() => {
  let e = class e {
    constructor(n) {
      (this._platformId = n),
        (this.isBrowser = this._platformId
          ? U_(this._platformId)
          : typeof document == 'object' && !!document),
        (this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent)),
        (this.TRIDENT =
          this.isBrowser && /(msie|trident)/i.test(navigator.userAgent)),
        (this.BLINK =
          this.isBrowser &&
          !!(window.chrome || nh) &&
          typeof CSS < 'u' &&
          !this.EDGE &&
          !this.TRIDENT),
        (this.WEBKIT =
          this.isBrowser &&
          /AppleWebKit/i.test(navigator.userAgent) &&
          !this.BLINK &&
          !this.EDGE &&
          !this.TRIDENT),
        (this.IOS =
          this.isBrowser &&
          /iPad|iPhone|iPod/.test(navigator.userAgent) &&
          !('MSStream' in window)),
        (this.FIREFOX =
          this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent)),
        (this.ANDROID =
          this.isBrowser &&
          /android/i.test(navigator.userAgent) &&
          !this.TRIDENT),
        (this.SAFARI =
          this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT);
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(v(Bt));
  }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
var Er,
  zy = [
    'color',
    'button',
    'checkbox',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ];
function ih() {
  if (Er) return Er;
  if (typeof document != 'object' || !document) return (Er = new Set(zy)), Er;
  let t = document.createElement('input');
  return (
    (Er = new Set(zy.filter((e) => (t.setAttribute('type', e), t.type === e)))),
    Er
  );
}
var Ho;
function LA() {
  if (Ho == null && typeof window < 'u')
    try {
      window.addEventListener(
        'test',
        null,
        Object.defineProperty({}, 'passive', { get: () => (Ho = !0) })
      );
    } finally {
      Ho = Ho || !1;
    }
  return Ho;
}
function Qn(t) {
  return LA() ? t : !!t.capture;
}
var th;
function VA() {
  if (th == null) {
    let t = typeof document < 'u' ? document.head : null;
    th = !!(t && (t.createShadowRoot || t.attachShadow));
  }
  return th;
}
function Wy(t) {
  if (VA()) {
    let e = t.getRootNode ? t.getRootNode() : null;
    if (typeof ShadowRoot < 'u' && ShadowRoot && e instanceof ShadowRoot)
      return e;
  }
  return null;
}
function Zn(t) {
  return t.composedPath ? t.composedPath()[0] : t.target;
}
function Gy() {
  return (
    (typeof __karma__ < 'u' && !!__karma__) ||
    (typeof jasmine < 'u' && !!jasmine) ||
    (typeof jest < 'u' && !!jest) ||
    (typeof Mocha < 'u' && !!Mocha)
  );
}
var en = '*';
function qy(t, e) {
  return { type: 7, name: t, definitions: e, options: {} };
}
function Qy(t, e = null) {
  return { type: 4, styles: e, timings: t };
}
function Zy(t, e = null) {
  return { type: 2, steps: t, options: e };
}
function Cr(t) {
  return { type: 6, styles: t, offset: null };
}
function Yy(t, e, i) {
  return { type: 0, name: t, styles: e, options: i };
}
function Xy(t, e, i = null) {
  return { type: 1, expr: t, animation: e, options: i };
}
var Yn = class {
    constructor(e = 0, i = 0) {
      (this._onDoneFns = []),
        (this._onStartFns = []),
        (this._onDestroyFns = []),
        (this._originalOnDoneFns = []),
        (this._originalOnStartFns = []),
        (this._started = !1),
        (this._destroyed = !1),
        (this._finished = !1),
        (this._position = 0),
        (this.parentPlayer = null),
        (this.totalTime = e + i);
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((e) => e()),
        (this._onDoneFns = []));
    }
    onStart(e) {
      this._originalOnStartFns.push(e), this._onStartFns.push(e);
    }
    onDone(e) {
      this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
    }
    onDestroy(e) {
      this._onDestroyFns.push(e);
    }
    hasStarted() {
      return this._started;
    }
    init() {}
    play() {
      this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
        (this._started = !0);
    }
    triggerMicrotask() {
      queueMicrotask(() => this._onFinish());
    }
    _onStart() {
      this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
    }
    pause() {}
    restart() {}
    finish() {
      this._onFinish();
    }
    destroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this.hasStarted() || this._onStart(),
        this.finish(),
        this._onDestroyFns.forEach((e) => e()),
        (this._onDestroyFns = []));
    }
    reset() {
      (this._started = !1),
        (this._finished = !1),
        (this._onStartFns = this._originalOnStartFns),
        (this._onDoneFns = this._originalOnDoneFns);
    }
    setPosition(e) {
      this._position = this.totalTime ? e * this.totalTime : 1;
    }
    getPosition() {
      return this.totalTime ? this._position / this.totalTime : 1;
    }
    triggerCallback(e) {
      let i = e == 'start' ? this._onStartFns : this._onDoneFns;
      i.forEach((n) => n()), (i.length = 0);
    }
  },
  $o = class {
    constructor(e) {
      (this._onDoneFns = []),
        (this._onStartFns = []),
        (this._finished = !1),
        (this._started = !1),
        (this._destroyed = !1),
        (this._onDestroyFns = []),
        (this.parentPlayer = null),
        (this.totalTime = 0),
        (this.players = e);
      let i = 0,
        n = 0,
        r = 0,
        o = this.players.length;
      o == 0
        ? queueMicrotask(() => this._onFinish())
        : this.players.forEach((s) => {
            s.onDone(() => {
              ++i == o && this._onFinish();
            }),
              s.onDestroy(() => {
                ++n == o && this._onDestroy();
              }),
              s.onStart(() => {
                ++r == o && this._onStart();
              });
          }),
        (this.totalTime = this.players.reduce(
          (s, a) => Math.max(s, a.totalTime),
          0
        ));
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((e) => e()),
        (this._onDoneFns = []));
    }
    init() {
      this.players.forEach((e) => e.init());
    }
    onStart(e) {
      this._onStartFns.push(e);
    }
    _onStart() {
      this.hasStarted() ||
        ((this._started = !0),
        this._onStartFns.forEach((e) => e()),
        (this._onStartFns = []));
    }
    onDone(e) {
      this._onDoneFns.push(e);
    }
    onDestroy(e) {
      this._onDestroyFns.push(e);
    }
    hasStarted() {
      return this._started;
    }
    play() {
      this.parentPlayer || this.init(),
        this._onStart(),
        this.players.forEach((e) => e.play());
    }
    pause() {
      this.players.forEach((e) => e.pause());
    }
    restart() {
      this.players.forEach((e) => e.restart());
    }
    finish() {
      this._onFinish(), this.players.forEach((e) => e.finish());
    }
    destroy() {
      this._onDestroy();
    }
    _onDestroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this._onFinish(),
        this.players.forEach((e) => e.destroy()),
        this._onDestroyFns.forEach((e) => e()),
        (this._onDestroyFns = []));
    }
    reset() {
      this.players.forEach((e) => e.reset()),
        (this._destroyed = !1),
        (this._finished = !1),
        (this._started = !1);
    }
    setPosition(e) {
      let i = e * this.totalTime;
      this.players.forEach((n) => {
        let r = n.totalTime ? Math.min(1, i / n.totalTime) : 1;
        n.setPosition(r);
      });
    }
    getPosition() {
      let e = this.players.reduce(
        (i, n) => (i === null || n.totalTime > i.totalTime ? n : i),
        null
      );
      return e != null ? e.getPosition() : 0;
    }
    beforeDestroy() {
      this.players.forEach((e) => {
        e.beforeDestroy && e.beforeDestroy();
      });
    }
    triggerCallback(e) {
      let i = e == 'start' ? this._onStartFns : this._onDoneFns;
      i.forEach((n) => n()), (i.length = 0);
    }
  },
  Hc = '!';
function Ky(t) {
  return new _(3e3, !1);
}
function jA() {
  return new _(3100, !1);
}
function BA() {
  return new _(3101, !1);
}
function UA(t) {
  return new _(3001, !1);
}
function HA(t) {
  return new _(3003, !1);
}
function $A(t) {
  return new _(3004, !1);
}
function zA(t, e) {
  return new _(3005, !1);
}
function WA() {
  return new _(3006, !1);
}
function GA() {
  return new _(3007, !1);
}
function qA(t, e) {
  return new _(3008, !1);
}
function QA(t) {
  return new _(3002, !1);
}
function ZA(t, e, i, n, r) {
  return new _(3010, !1);
}
function YA() {
  return new _(3011, !1);
}
function XA() {
  return new _(3012, !1);
}
function KA() {
  return new _(3200, !1);
}
function JA() {
  return new _(3202, !1);
}
function e1() {
  return new _(3013, !1);
}
function t1(t) {
  return new _(3014, !1);
}
function n1(t) {
  return new _(3015, !1);
}
function i1(t) {
  return new _(3016, !1);
}
function r1(t, e) {
  return new _(3404, !1);
}
function o1(t) {
  return new _(3502, !1);
}
function s1(t) {
  return new _(3503, !1);
}
function a1() {
  return new _(3300, !1);
}
function c1(t) {
  return new _(3504, !1);
}
function l1(t) {
  return new _(3301, !1);
}
function d1(t, e) {
  return new _(3302, !1);
}
function u1(t) {
  return new _(3303, !1);
}
function f1(t, e) {
  return new _(3400, !1);
}
function h1(t) {
  return new _(3401, !1);
}
function m1(t) {
  return new _(3402, !1);
}
function p1(t, e) {
  return new _(3505, !1);
}
function Xn(t) {
  switch (t.length) {
    case 0:
      return new Yn();
    case 1:
      return t[0];
    default:
      return new $o(t);
  }
}
function f0(t, e, i = new Map(), n = new Map()) {
  let r = [],
    o = [],
    s = -1,
    a = null;
  if (
    (e.forEach((c) => {
      let l = c.get('offset'),
        d = l == s,
        u = (d && a) || new Map();
      c.forEach((f, h) => {
        let m = h,
          g = f;
        if (h !== 'offset')
          switch (((m = t.normalizePropertyName(m, r)), g)) {
            case Hc:
              g = i.get(h);
              break;
            case en:
              g = n.get(h);
              break;
            default:
              g = t.normalizeStyleValue(h, m, g, r);
              break;
          }
        u.set(m, g);
      }),
        d || o.push(u),
        (a = u),
        (s = l);
    }),
    r.length)
  )
    throw o1(r);
  return o;
}
function Dh(t, e, i, n) {
  switch (e) {
    case 'start':
      t.onStart(() => n(i && rh(i, 'start', t)));
      break;
    case 'done':
      t.onDone(() => n(i && rh(i, 'done', t)));
      break;
    case 'destroy':
      t.onDestroy(() => n(i && rh(i, 'destroy', t)));
      break;
  }
}
function rh(t, e, i) {
  let n = i.totalTime,
    r = !!i.disabled,
    o = Ih(
      t.element,
      t.triggerName,
      t.fromState,
      t.toState,
      e || t.phaseName,
      n ?? t.totalTime,
      r
    ),
    s = t._data;
  return s != null && (o._data = s), o;
}
function Ih(t, e, i, n, r = '', o = 0, s) {
  return {
    element: t,
    triggerName: e,
    fromState: i,
    toState: n,
    phaseName: r,
    totalTime: o,
    disabled: !!s,
  };
}
function Et(t, e, i) {
  let n = t.get(e);
  return n || t.set(e, (n = i)), n;
}
function Jy(t) {
  let e = t.indexOf(':'),
    i = t.substring(1, e),
    n = t.slice(e + 1);
  return [i, n];
}
var g1 = (() => (typeof document > 'u' ? null : document.documentElement))();
function Mh(t) {
  let e = t.parentNode || t.host || null;
  return e === g1 ? null : e;
}
function b1(t) {
  return t.substring(1, 6) == 'ebkit';
}
var Pi = null,
  e0 = !1;
function v1(t) {
  Pi ||
    ((Pi = _1() || {}), (e0 = Pi.style ? 'WebkitAppearance' in Pi.style : !1));
  let e = !0;
  return (
    Pi.style &&
      !b1(t) &&
      ((e = t in Pi.style),
      !e &&
        e0 &&
        (e = 'Webkit' + t.charAt(0).toUpperCase() + t.slice(1) in Pi.style)),
    e
  );
}
function _1() {
  return typeof document < 'u' ? document.body : null;
}
function h0(t, e) {
  for (; e; ) {
    if (e === t) return !0;
    e = Mh(e);
  }
  return !1;
}
function m0(t, e, i) {
  if (i) return Array.from(t.querySelectorAll(e));
  let n = t.querySelector(e);
  return n ? [n] : [];
}
var Sh = (() => {
    let e = class e {
      validateStyleProperty(n) {
        return v1(n);
      }
      matchesElement(n, r) {
        return !1;
      }
      containsElement(n, r) {
        return h0(n, r);
      }
      getParentElement(n) {
        return Mh(n);
      }
      query(n, r, o) {
        return m0(n, r, o);
      }
      computeStyle(n, r, o) {
        return o || '';
      }
      animate(n, r, o, s, a, c = [], l) {
        return new Yn(o, s);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  Yo = (() => {
    let e = class e {};
    e.NOOP = new Sh();
    let t = e;
    return t;
  })(),
  ji = class {};
var y1 = 1e3,
  p0 = '{{',
  x1 = '}}',
  g0 = 'ng-enter',
  dh = 'ng-leave',
  $c = 'ng-trigger',
  Qc = '.ng-trigger',
  t0 = 'ng-animating',
  uh = '.ng-animating';
function wn(t) {
  if (typeof t == 'number') return t;
  let e = t.match(/^(-?[\.\d]+)(m?s)/);
  return !e || e.length < 2 ? 0 : fh(parseFloat(e[1]), e[2]);
}
function fh(t, e) {
  switch (e) {
    case 's':
      return t * y1;
    default:
      return t;
  }
}
function Zc(t, e, i) {
  return t.hasOwnProperty('duration') ? t : w1(t, e, i);
}
function w1(t, e, i) {
  let n =
      /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i,
    r,
    o = 0,
    s = '';
  if (typeof t == 'string') {
    let a = t.match(n);
    if (a === null) return e.push(Ky(t)), { duration: 0, delay: 0, easing: '' };
    r = fh(parseFloat(a[1]), a[2]);
    let c = a[3];
    c != null && (o = fh(parseFloat(c), a[4]));
    let l = a[5];
    l && (s = l);
  } else r = t;
  if (!i) {
    let a = !1,
      c = e.length;
    r < 0 && (e.push(jA()), (a = !0)),
      o < 0 && (e.push(BA()), (a = !0)),
      a && e.splice(c, 0, Ky(t));
  }
  return { duration: r, delay: o, easing: s };
}
function Xo(t, e = {}) {
  return (
    Object.keys(t).forEach((i) => {
      e[i] = t[i];
    }),
    e
  );
}
function b0(t) {
  let e = new Map();
  return (
    Object.keys(t).forEach((i) => {
      let n = t[i];
      e.set(i, n);
    }),
    e
  );
}
function E1(t) {
  return t.length ? (t[0] instanceof Map ? t : t.map((e) => b0(e))) : [];
}
function Ir(t, e = new Map(), i) {
  if (i) for (let [n, r] of i) e.set(n, r);
  for (let [n, r] of t) e.set(n, r);
  return e;
}
function tn(t, e, i) {
  e.forEach((n, r) => {
    let o = Th(r);
    i && !i.has(r) && i.set(r, t.style[o]), (t.style[o] = n);
  });
}
function Vi(t, e) {
  e.forEach((i, n) => {
    let r = Th(n);
    t.style[r] = '';
  });
}
function zo(t) {
  return Array.isArray(t) ? (t.length == 1 ? t[0] : Zy(t)) : t;
}
function C1(t, e, i) {
  let n = e.params || {},
    r = v0(t);
  r.length &&
    r.forEach((o) => {
      n.hasOwnProperty(o) || i.push(UA(o));
    });
}
var hh = new RegExp(`${p0}\\s*(.+?)\\s*${x1}`, 'g');
function v0(t) {
  let e = [];
  if (typeof t == 'string') {
    let i;
    for (; (i = hh.exec(t)); ) e.push(i[1]);
    hh.lastIndex = 0;
  }
  return e;
}
function Go(t, e, i) {
  let n = t.toString(),
    r = n.replace(hh, (o, s) => {
      let a = e[s];
      return a == null && (i.push(HA(s)), (a = '')), a.toString();
    });
  return r == n ? t : r;
}
function Yc(t) {
  let e = [],
    i = t.next();
  for (; !i.done; ) e.push(i.value), (i = t.next());
  return e;
}
var D1 = /-+([a-z0-9])/g;
function Th(t) {
  return t.replace(D1, (...e) => e[1].toUpperCase());
}
function I1(t, e) {
  return t === 0 || e === 0;
}
function M1(t, e, i) {
  if (i.size && e.length) {
    let n = e[0],
      r = [];
    if (
      (i.forEach((o, s) => {
        n.has(s) || r.push(s), n.set(s, o);
      }),
      r.length)
    )
      for (let o = 1; o < e.length; o++) {
        let s = e[o];
        r.forEach((a) => s.set(a, _0(t, a)));
      }
  }
  return e;
}
function wt(t, e, i) {
  switch (e.type) {
    case 7:
      return t.visitTrigger(e, i);
    case 0:
      return t.visitState(e, i);
    case 1:
      return t.visitTransition(e, i);
    case 2:
      return t.visitSequence(e, i);
    case 3:
      return t.visitGroup(e, i);
    case 4:
      return t.visitAnimate(e, i);
    case 5:
      return t.visitKeyframes(e, i);
    case 6:
      return t.visitStyle(e, i);
    case 8:
      return t.visitReference(e, i);
    case 9:
      return t.visitAnimateChild(e, i);
    case 10:
      return t.visitAnimateRef(e, i);
    case 11:
      return t.visitQuery(e, i);
    case 12:
      return t.visitStagger(e, i);
    default:
      throw $A(e.type);
  }
}
function _0(t, e) {
  return window.getComputedStyle(t)[e];
}
var S1 = new Set([
    'width',
    'height',
    'minWidth',
    'minHeight',
    'maxWidth',
    'maxHeight',
    'left',
    'top',
    'bottom',
    'right',
    'fontSize',
    'outlineWidth',
    'outlineOffset',
    'paddingTop',
    'paddingLeft',
    'paddingBottom',
    'paddingRight',
    'marginTop',
    'marginLeft',
    'marginBottom',
    'marginRight',
    'borderRadius',
    'borderWidth',
    'borderTopWidth',
    'borderLeftWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'textIndent',
    'perspective',
  ]),
  Xc = class extends ji {
    normalizePropertyName(e, i) {
      return Th(e);
    }
    normalizeStyleValue(e, i, n, r) {
      let o = '',
        s = n.toString().trim();
      if (S1.has(i) && n !== 0 && n !== '0')
        if (typeof n == 'number') o = 'px';
        else {
          let a = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
          a && a[1].length == 0 && r.push(zA(e, n));
        }
      return s + o;
    }
  };
var Kc = '*';
function T1(t, e) {
  let i = [];
  return (
    typeof t == 'string'
      ? t.split(/\s*,\s*/).forEach((n) => k1(n, i, e))
      : i.push(t),
    i
  );
}
function k1(t, e, i) {
  if (t[0] == ':') {
    let c = A1(t, i);
    if (typeof c == 'function') {
      e.push(c);
      return;
    }
    t = c;
  }
  let n = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
  if (n == null || n.length < 4) return i.push(n1(t)), e;
  let r = n[1],
    o = n[2],
    s = n[3];
  e.push(n0(r, s));
  let a = r == Kc && s == Kc;
  o[0] == '<' && !a && e.push(n0(s, r));
}
function A1(t, e) {
  switch (t) {
    case ':enter':
      return 'void => *';
    case ':leave':
      return '* => void';
    case ':increment':
      return (i, n) => parseFloat(n) > parseFloat(i);
    case ':decrement':
      return (i, n) => parseFloat(n) < parseFloat(i);
    default:
      return e.push(i1(t)), '* => *';
  }
}
var zc = new Set(['true', '1']),
  Wc = new Set(['false', '0']);
function n0(t, e) {
  let i = zc.has(t) || Wc.has(t),
    n = zc.has(e) || Wc.has(e);
  return (r, o) => {
    let s = t == Kc || t == r,
      a = e == Kc || e == o;
    return (
      !s && i && typeof r == 'boolean' && (s = r ? zc.has(t) : Wc.has(t)),
      !a && n && typeof o == 'boolean' && (a = o ? zc.has(e) : Wc.has(e)),
      s && a
    );
  };
}
var y0 = ':self',
  R1 = new RegExp(`s*${y0}s*,?`, 'g');
function x0(t, e, i, n) {
  return new mh(t).build(e, i, n);
}
var i0 = '',
  mh = class {
    constructor(e) {
      this._driver = e;
    }
    build(e, i, n) {
      let r = new ph(i);
      return this._resetContextStyleTimingState(r), wt(this, zo(e), r);
    }
    _resetContextStyleTimingState(e) {
      (e.currentQuerySelector = i0),
        (e.collectedStyles = new Map()),
        e.collectedStyles.set(i0, new Map()),
        (e.currentTime = 0);
    }
    visitTrigger(e, i) {
      let n = (i.queryCount = 0),
        r = (i.depCount = 0),
        o = [],
        s = [];
      return (
        e.name.charAt(0) == '@' && i.errors.push(WA()),
        e.definitions.forEach((a) => {
          if ((this._resetContextStyleTimingState(i), a.type == 0)) {
            let c = a,
              l = c.name;
            l
              .toString()
              .split(/\s*,\s*/)
              .forEach((d) => {
                (c.name = d), o.push(this.visitState(c, i));
              }),
              (c.name = l);
          } else if (a.type == 1) {
            let c = this.visitTransition(a, i);
            (n += c.queryCount), (r += c.depCount), s.push(c);
          } else i.errors.push(GA());
        }),
        {
          type: 7,
          name: e.name,
          states: o,
          transitions: s,
          queryCount: n,
          depCount: r,
          options: null,
        }
      );
    }
    visitState(e, i) {
      let n = this.visitStyle(e.styles, i),
        r = (e.options && e.options.params) || null;
      if (n.containsDynamicStyles) {
        let o = new Set(),
          s = r || {};
        if (
          (n.styles.forEach((a) => {
            a instanceof Map &&
              a.forEach((c) => {
                v0(c).forEach((l) => {
                  s.hasOwnProperty(l) || o.add(l);
                });
              });
          }),
          o.size)
        ) {
          let a = Yc(o.values());
          i.errors.push(qA(e.name, a));
        }
      }
      return {
        type: 0,
        name: e.name,
        style: n,
        options: r ? { params: r } : null,
      };
    }
    visitTransition(e, i) {
      (i.queryCount = 0), (i.depCount = 0);
      let n = wt(this, zo(e.animation), i);
      return {
        type: 1,
        matchers: T1(e.expr, i.errors),
        animation: n,
        queryCount: i.queryCount,
        depCount: i.depCount,
        options: Li(e.options),
      };
    }
    visitSequence(e, i) {
      return {
        type: 2,
        steps: e.steps.map((n) => wt(this, n, i)),
        options: Li(e.options),
      };
    }
    visitGroup(e, i) {
      let n = i.currentTime,
        r = 0,
        o = e.steps.map((s) => {
          i.currentTime = n;
          let a = wt(this, s, i);
          return (r = Math.max(r, i.currentTime)), a;
        });
      return (i.currentTime = r), { type: 3, steps: o, options: Li(e.options) };
    }
    visitAnimate(e, i) {
      let n = P1(e.timings, i.errors);
      i.currentAnimateTimings = n;
      let r,
        o = e.styles ? e.styles : Cr({});
      if (o.type == 5) r = this.visitKeyframes(o, i);
      else {
        let s = e.styles,
          a = !1;
        if (!s) {
          a = !0;
          let l = {};
          n.easing && (l.easing = n.easing), (s = Cr(l));
        }
        i.currentTime += n.duration + n.delay;
        let c = this.visitStyle(s, i);
        (c.isEmptyStep = a), (r = c);
      }
      return (
        (i.currentAnimateTimings = null),
        { type: 4, timings: n, style: r, options: null }
      );
    }
    visitStyle(e, i) {
      let n = this._makeStyleAst(e, i);
      return this._validateStyleAst(n, i), n;
    }
    _makeStyleAst(e, i) {
      let n = [],
        r = Array.isArray(e.styles) ? e.styles : [e.styles];
      for (let a of r)
        typeof a == 'string'
          ? a === en
            ? n.push(a)
            : i.errors.push(QA(a))
          : n.push(b0(a));
      let o = !1,
        s = null;
      return (
        n.forEach((a) => {
          if (
            a instanceof Map &&
            (a.has('easing') && ((s = a.get('easing')), a.delete('easing')), !o)
          ) {
            for (let c of a.values())
              if (c.toString().indexOf(p0) >= 0) {
                o = !0;
                break;
              }
          }
        }),
        {
          type: 6,
          styles: n,
          easing: s,
          offset: e.offset,
          containsDynamicStyles: o,
          options: null,
        }
      );
    }
    _validateStyleAst(e, i) {
      let n = i.currentAnimateTimings,
        r = i.currentTime,
        o = i.currentTime;
      n && o > 0 && (o -= n.duration + n.delay),
        e.styles.forEach((s) => {
          typeof s != 'string' &&
            s.forEach((a, c) => {
              let l = i.collectedStyles.get(i.currentQuerySelector),
                d = l.get(c),
                u = !0;
              d &&
                (o != r &&
                  o >= d.startTime &&
                  r <= d.endTime &&
                  (i.errors.push(ZA(c, d.startTime, d.endTime, o, r)),
                  (u = !1)),
                (o = d.startTime)),
                u && l.set(c, { startTime: o, endTime: r }),
                i.options && C1(a, i.options, i.errors);
            });
        });
    }
    visitKeyframes(e, i) {
      let n = { type: 5, styles: [], options: null };
      if (!i.currentAnimateTimings) return i.errors.push(YA()), n;
      let r = 1,
        o = 0,
        s = [],
        a = !1,
        c = !1,
        l = 0,
        d = e.steps.map((E) => {
          let N = this._makeStyleAst(E, i),
            ce = N.offset != null ? N.offset : O1(N.styles),
            ie = 0;
          return (
            ce != null && (o++, (ie = N.offset = ce)),
            (c = c || ie < 0 || ie > 1),
            (a = a || ie < l),
            (l = ie),
            s.push(ie),
            N
          );
        });
      c && i.errors.push(XA()), a && i.errors.push(KA());
      let u = e.steps.length,
        f = 0;
      o > 0 && o < u ? i.errors.push(JA()) : o == 0 && (f = r / (u - 1));
      let h = u - 1,
        m = i.currentTime,
        g = i.currentAnimateTimings,
        C = g.duration;
      return (
        d.forEach((E, N) => {
          let ce = f > 0 ? (N == h ? 1 : f * N) : s[N],
            ie = ce * C;
          (i.currentTime = m + g.delay + ie),
            (g.duration = ie),
            this._validateStyleAst(E, i),
            (E.offset = ce),
            n.styles.push(E);
        }),
        n
      );
    }
    visitReference(e, i) {
      return {
        type: 8,
        animation: wt(this, zo(e.animation), i),
        options: Li(e.options),
      };
    }
    visitAnimateChild(e, i) {
      return i.depCount++, { type: 9, options: Li(e.options) };
    }
    visitAnimateRef(e, i) {
      return {
        type: 10,
        animation: this.visitReference(e.animation, i),
        options: Li(e.options),
      };
    }
    visitQuery(e, i) {
      let n = i.currentQuerySelector,
        r = e.options || {};
      i.queryCount++, (i.currentQuery = e);
      let [o, s] = F1(e.selector);
      (i.currentQuerySelector = n.length ? n + ' ' + o : o),
        Et(i.collectedStyles, i.currentQuerySelector, new Map());
      let a = wt(this, zo(e.animation), i);
      return (
        (i.currentQuery = null),
        (i.currentQuerySelector = n),
        {
          type: 11,
          selector: o,
          limit: r.limit || 0,
          optional: !!r.optional,
          includeSelf: s,
          animation: a,
          originalSelector: e.selector,
          options: Li(e.options),
        }
      );
    }
    visitStagger(e, i) {
      i.currentQuery || i.errors.push(e1());
      let n =
        e.timings === 'full'
          ? { duration: 0, delay: 0, easing: 'full' }
          : Zc(e.timings, i.errors, !0);
      return {
        type: 12,
        animation: wt(this, zo(e.animation), i),
        timings: n,
        options: null,
      };
    }
  };
function F1(t) {
  let e = !!t.split(/\s*,\s*/).find((i) => i == y0);
  return (
    e && (t = t.replace(R1, '')),
    (t = t
      .replace(/@\*/g, Qc)
      .replace(/@\w+/g, (i) => Qc + '-' + i.slice(1))
      .replace(/:animating/g, uh)),
    [t, e]
  );
}
function N1(t) {
  return t ? Xo(t) : null;
}
var ph = class {
  constructor(e) {
    (this.errors = e),
      (this.queryCount = 0),
      (this.depCount = 0),
      (this.currentTransition = null),
      (this.currentQuery = null),
      (this.currentQuerySelector = null),
      (this.currentAnimateTimings = null),
      (this.currentTime = 0),
      (this.collectedStyles = new Map()),
      (this.options = null),
      (this.unsupportedCSSPropertiesFound = new Set());
  }
};
function O1(t) {
  if (typeof t == 'string') return null;
  let e = null;
  if (Array.isArray(t))
    t.forEach((i) => {
      if (i instanceof Map && i.has('offset')) {
        let n = i;
        (e = parseFloat(n.get('offset'))), n.delete('offset');
      }
    });
  else if (t instanceof Map && t.has('offset')) {
    let i = t;
    (e = parseFloat(i.get('offset'))), i.delete('offset');
  }
  return e;
}
function P1(t, e) {
  if (t.hasOwnProperty('duration')) return t;
  if (typeof t == 'number') {
    let o = Zc(t, e).duration;
    return oh(o, 0, '');
  }
  let i = t;
  if (i.split(/\s+/).some((o) => o.charAt(0) == '{' && o.charAt(1) == '{')) {
    let o = oh(0, 0, '');
    return (o.dynamic = !0), (o.strValue = i), o;
  }
  let r = Zc(i, e);
  return oh(r.duration, r.delay, r.easing);
}
function Li(t) {
  return t ? ((t = Xo(t)), t.params && (t.params = N1(t.params))) : (t = {}), t;
}
function oh(t, e, i) {
  return { duration: t, delay: e, easing: i };
}
function kh(t, e, i, n, r, o, s = null, a = !1) {
  return {
    type: 1,
    element: t,
    keyframes: e,
    preStyleProps: i,
    postStyleProps: n,
    duration: r,
    delay: o,
    totalTime: r + o,
    easing: s,
    subTimeline: a,
  };
}
var qo = class {
    constructor() {
      this._map = new Map();
    }
    get(e) {
      return this._map.get(e) || [];
    }
    append(e, i) {
      let n = this._map.get(e);
      n || this._map.set(e, (n = [])), n.push(...i);
    }
    has(e) {
      return this._map.has(e);
    }
    clear() {
      this._map.clear();
    }
  },
  L1 = 1,
  V1 = ':enter',
  j1 = new RegExp(V1, 'g'),
  B1 = ':leave',
  U1 = new RegExp(B1, 'g');
function w0(t, e, i, n, r, o = new Map(), s = new Map(), a, c, l = []) {
  return new gh().buildKeyframes(t, e, i, n, r, o, s, a, c, l);
}
var gh = class {
    buildKeyframes(e, i, n, r, o, s, a, c, l, d = []) {
      l = l || new qo();
      let u = new bh(e, i, l, r, o, d, []);
      u.options = c;
      let f = c.delay ? wn(c.delay) : 0;
      u.currentTimeline.delayNextStep(f),
        u.currentTimeline.setStyles([s], null, u.errors, c),
        wt(this, n, u);
      let h = u.timelines.filter((m) => m.containsAnimation());
      if (h.length && a.size) {
        let m;
        for (let g = h.length - 1; g >= 0; g--) {
          let C = h[g];
          if (C.element === i) {
            m = C;
            break;
          }
        }
        m &&
          !m.allowOnlyTimelineStyles() &&
          m.setStyles([a], null, u.errors, c);
      }
      return h.length
        ? h.map((m) => m.buildKeyframes())
        : [kh(i, [], [], [], 0, f, '', !1)];
    }
    visitTrigger(e, i) {}
    visitState(e, i) {}
    visitTransition(e, i) {}
    visitAnimateChild(e, i) {
      let n = i.subInstructions.get(i.element);
      if (n) {
        let r = i.createSubContext(e.options),
          o = i.currentTimeline.currentTime,
          s = this._visitSubInstructions(n, r, r.options);
        o != s && i.transformIntoNewTimeline(s);
      }
      i.previousNode = e;
    }
    visitAnimateRef(e, i) {
      let n = i.createSubContext(e.options);
      n.transformIntoNewTimeline(),
        this._applyAnimationRefDelays([e.options, e.animation.options], i, n),
        this.visitReference(e.animation, n),
        i.transformIntoNewTimeline(n.currentTimeline.currentTime),
        (i.previousNode = e);
    }
    _applyAnimationRefDelays(e, i, n) {
      for (let r of e) {
        let o = r?.delay;
        if (o) {
          let s =
            typeof o == 'number' ? o : wn(Go(o, r?.params ?? {}, i.errors));
          n.delayNextStep(s);
        }
      }
    }
    _visitSubInstructions(e, i, n) {
      let o = i.currentTimeline.currentTime,
        s = n.duration != null ? wn(n.duration) : null,
        a = n.delay != null ? wn(n.delay) : null;
      return (
        s !== 0 &&
          e.forEach((c) => {
            let l = i.appendInstructionToTimeline(c, s, a);
            o = Math.max(o, l.duration + l.delay);
          }),
        o
      );
    }
    visitReference(e, i) {
      i.updateOptions(e.options, !0),
        wt(this, e.animation, i),
        (i.previousNode = e);
    }
    visitSequence(e, i) {
      let n = i.subContextCount,
        r = i,
        o = e.options;
      if (
        o &&
        (o.params || o.delay) &&
        ((r = i.createSubContext(o)),
        r.transformIntoNewTimeline(),
        o.delay != null)
      ) {
        r.previousNode.type == 6 &&
          (r.currentTimeline.snapshotCurrentStyles(), (r.previousNode = Jc));
        let s = wn(o.delay);
        r.delayNextStep(s);
      }
      e.steps.length &&
        (e.steps.forEach((s) => wt(this, s, r)),
        r.currentTimeline.applyStylesToKeyframe(),
        r.subContextCount > n && r.transformIntoNewTimeline()),
        (i.previousNode = e);
    }
    visitGroup(e, i) {
      let n = [],
        r = i.currentTimeline.currentTime,
        o = e.options && e.options.delay ? wn(e.options.delay) : 0;
      e.steps.forEach((s) => {
        let a = i.createSubContext(e.options);
        o && a.delayNextStep(o),
          wt(this, s, a),
          (r = Math.max(r, a.currentTimeline.currentTime)),
          n.push(a.currentTimeline);
      }),
        n.forEach((s) => i.currentTimeline.mergeTimelineCollectedStyles(s)),
        i.transformIntoNewTimeline(r),
        (i.previousNode = e);
    }
    _visitTiming(e, i) {
      if (e.dynamic) {
        let n = e.strValue,
          r = i.params ? Go(n, i.params, i.errors) : n;
        return Zc(r, i.errors);
      } else return { duration: e.duration, delay: e.delay, easing: e.easing };
    }
    visitAnimate(e, i) {
      let n = (i.currentAnimateTimings = this._visitTiming(e.timings, i)),
        r = i.currentTimeline;
      n.delay && (i.incrementTime(n.delay), r.snapshotCurrentStyles());
      let o = e.style;
      o.type == 5
        ? this.visitKeyframes(o, i)
        : (i.incrementTime(n.duration),
          this.visitStyle(o, i),
          r.applyStylesToKeyframe()),
        (i.currentAnimateTimings = null),
        (i.previousNode = e);
    }
    visitStyle(e, i) {
      let n = i.currentTimeline,
        r = i.currentAnimateTimings;
      !r && n.hasCurrentStyleProperties() && n.forwardFrame();
      let o = (r && r.easing) || e.easing;
      e.isEmptyStep
        ? n.applyEmptyStep(o)
        : n.setStyles(e.styles, o, i.errors, i.options),
        (i.previousNode = e);
    }
    visitKeyframes(e, i) {
      let n = i.currentAnimateTimings,
        r = i.currentTimeline.duration,
        o = n.duration,
        a = i.createSubContext().currentTimeline;
      (a.easing = n.easing),
        e.styles.forEach((c) => {
          let l = c.offset || 0;
          a.forwardTime(l * o),
            a.setStyles(c.styles, c.easing, i.errors, i.options),
            a.applyStylesToKeyframe();
        }),
        i.currentTimeline.mergeTimelineCollectedStyles(a),
        i.transformIntoNewTimeline(r + o),
        (i.previousNode = e);
    }
    visitQuery(e, i) {
      let n = i.currentTimeline.currentTime,
        r = e.options || {},
        o = r.delay ? wn(r.delay) : 0;
      o &&
        (i.previousNode.type === 6 ||
          (n == 0 && i.currentTimeline.hasCurrentStyleProperties())) &&
        (i.currentTimeline.snapshotCurrentStyles(), (i.previousNode = Jc));
      let s = n,
        a = i.invokeQuery(
          e.selector,
          e.originalSelector,
          e.limit,
          e.includeSelf,
          !!r.optional,
          i.errors
        );
      i.currentQueryTotal = a.length;
      let c = null;
      a.forEach((l, d) => {
        i.currentQueryIndex = d;
        let u = i.createSubContext(e.options, l);
        o && u.delayNextStep(o),
          l === i.element && (c = u.currentTimeline),
          wt(this, e.animation, u),
          u.currentTimeline.applyStylesToKeyframe();
        let f = u.currentTimeline.currentTime;
        s = Math.max(s, f);
      }),
        (i.currentQueryIndex = 0),
        (i.currentQueryTotal = 0),
        i.transformIntoNewTimeline(s),
        c &&
          (i.currentTimeline.mergeTimelineCollectedStyles(c),
          i.currentTimeline.snapshotCurrentStyles()),
        (i.previousNode = e);
    }
    visitStagger(e, i) {
      let n = i.parentContext,
        r = i.currentTimeline,
        o = e.timings,
        s = Math.abs(o.duration),
        a = s * (i.currentQueryTotal - 1),
        c = s * i.currentQueryIndex;
      switch (o.duration < 0 ? 'reverse' : o.easing) {
        case 'reverse':
          c = a - c;
          break;
        case 'full':
          c = n.currentStaggerTime;
          break;
      }
      let d = i.currentTimeline;
      c && d.delayNextStep(c);
      let u = d.currentTime;
      wt(this, e.animation, i),
        (i.previousNode = e),
        (n.currentStaggerTime =
          r.currentTime - u + (r.startTime - n.currentTimeline.startTime));
    }
  },
  Jc = {},
  bh = class t {
    constructor(e, i, n, r, o, s, a, c) {
      (this._driver = e),
        (this.element = i),
        (this.subInstructions = n),
        (this._enterClassName = r),
        (this._leaveClassName = o),
        (this.errors = s),
        (this.timelines = a),
        (this.parentContext = null),
        (this.currentAnimateTimings = null),
        (this.previousNode = Jc),
        (this.subContextCount = 0),
        (this.options = {}),
        (this.currentQueryIndex = 0),
        (this.currentQueryTotal = 0),
        (this.currentStaggerTime = 0),
        (this.currentTimeline = c || new el(this._driver, i, 0)),
        a.push(this.currentTimeline);
    }
    get params() {
      return this.options.params;
    }
    updateOptions(e, i) {
      if (!e) return;
      let n = e,
        r = this.options;
      n.duration != null && (r.duration = wn(n.duration)),
        n.delay != null && (r.delay = wn(n.delay));
      let o = n.params;
      if (o) {
        let s = r.params;
        s || (s = this.options.params = {}),
          Object.keys(o).forEach((a) => {
            (!i || !s.hasOwnProperty(a)) && (s[a] = Go(o[a], s, this.errors));
          });
      }
    }
    _copyOptions() {
      let e = {};
      if (this.options) {
        let i = this.options.params;
        if (i) {
          let n = (e.params = {});
          Object.keys(i).forEach((r) => {
            n[r] = i[r];
          });
        }
      }
      return e;
    }
    createSubContext(e = null, i, n) {
      let r = i || this.element,
        o = new t(
          this._driver,
          r,
          this.subInstructions,
          this._enterClassName,
          this._leaveClassName,
          this.errors,
          this.timelines,
          this.currentTimeline.fork(r, n || 0)
        );
      return (
        (o.previousNode = this.previousNode),
        (o.currentAnimateTimings = this.currentAnimateTimings),
        (o.options = this._copyOptions()),
        o.updateOptions(e),
        (o.currentQueryIndex = this.currentQueryIndex),
        (o.currentQueryTotal = this.currentQueryTotal),
        (o.parentContext = this),
        this.subContextCount++,
        o
      );
    }
    transformIntoNewTimeline(e) {
      return (
        (this.previousNode = Jc),
        (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
        this.timelines.push(this.currentTimeline),
        this.currentTimeline
      );
    }
    appendInstructionToTimeline(e, i, n) {
      let r = {
          duration: i ?? e.duration,
          delay: this.currentTimeline.currentTime + (n ?? 0) + e.delay,
          easing: '',
        },
        o = new vh(
          this._driver,
          e.element,
          e.keyframes,
          e.preStyleProps,
          e.postStyleProps,
          r,
          e.stretchStartingKeyframe
        );
      return this.timelines.push(o), r;
    }
    incrementTime(e) {
      this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
    }
    delayNextStep(e) {
      e > 0 && this.currentTimeline.delayNextStep(e);
    }
    invokeQuery(e, i, n, r, o, s) {
      let a = [];
      if ((r && a.push(this.element), e.length > 0)) {
        (e = e.replace(j1, '.' + this._enterClassName)),
          (e = e.replace(U1, '.' + this._leaveClassName));
        let c = n != 1,
          l = this._driver.query(this.element, e, c);
        n !== 0 &&
          (l = n < 0 ? l.slice(l.length + n, l.length) : l.slice(0, n)),
          a.push(...l);
      }
      return !o && a.length == 0 && s.push(t1(i)), a;
    }
  },
  el = class t {
    constructor(e, i, n, r) {
      (this._driver = e),
        (this.element = i),
        (this.startTime = n),
        (this._elementTimelineStylesLookup = r),
        (this.duration = 0),
        (this.easing = null),
        (this._previousKeyframe = new Map()),
        (this._currentKeyframe = new Map()),
        (this._keyframes = new Map()),
        (this._styleSummary = new Map()),
        (this._localTimelineStyles = new Map()),
        (this._pendingStyles = new Map()),
        (this._backFill = new Map()),
        (this._currentEmptyStepKeyframe = null),
        this._elementTimelineStylesLookup ||
          (this._elementTimelineStylesLookup = new Map()),
        (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(i)),
        this._globalTimelineStyles ||
          ((this._globalTimelineStyles = this._localTimelineStyles),
          this._elementTimelineStylesLookup.set(i, this._localTimelineStyles)),
        this._loadKeyframe();
    }
    containsAnimation() {
      switch (this._keyframes.size) {
        case 0:
          return !1;
        case 1:
          return this.hasCurrentStyleProperties();
        default:
          return !0;
      }
    }
    hasCurrentStyleProperties() {
      return this._currentKeyframe.size > 0;
    }
    get currentTime() {
      return this.startTime + this.duration;
    }
    delayNextStep(e) {
      let i = this._keyframes.size === 1 && this._pendingStyles.size;
      this.duration || i
        ? (this.forwardTime(this.currentTime + e),
          i && this.snapshotCurrentStyles())
        : (this.startTime += e);
    }
    fork(e, i) {
      return (
        this.applyStylesToKeyframe(),
        new t(
          this._driver,
          e,
          i || this.currentTime,
          this._elementTimelineStylesLookup
        )
      );
    }
    _loadKeyframe() {
      this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe),
        (this._currentKeyframe = this._keyframes.get(this.duration)),
        this._currentKeyframe ||
          ((this._currentKeyframe = new Map()),
          this._keyframes.set(this.duration, this._currentKeyframe));
    }
    forwardFrame() {
      (this.duration += L1), this._loadKeyframe();
    }
    forwardTime(e) {
      this.applyStylesToKeyframe(), (this.duration = e), this._loadKeyframe();
    }
    _updateStyle(e, i) {
      this._localTimelineStyles.set(e, i),
        this._globalTimelineStyles.set(e, i),
        this._styleSummary.set(e, { time: this.currentTime, value: i });
    }
    allowOnlyTimelineStyles() {
      return this._currentEmptyStepKeyframe !== this._currentKeyframe;
    }
    applyEmptyStep(e) {
      e && this._previousKeyframe.set('easing', e);
      for (let [i, n] of this._globalTimelineStyles)
        this._backFill.set(i, n || en), this._currentKeyframe.set(i, en);
      this._currentEmptyStepKeyframe = this._currentKeyframe;
    }
    setStyles(e, i, n, r) {
      i && this._previousKeyframe.set('easing', i);
      let o = (r && r.params) || {},
        s = H1(e, this._globalTimelineStyles);
      for (let [a, c] of s) {
        let l = Go(c, o, n);
        this._pendingStyles.set(a, l),
          this._localTimelineStyles.has(a) ||
            this._backFill.set(a, this._globalTimelineStyles.get(a) ?? en),
          this._updateStyle(a, l);
      }
    }
    applyStylesToKeyframe() {
      this._pendingStyles.size != 0 &&
        (this._pendingStyles.forEach((e, i) => {
          this._currentKeyframe.set(i, e);
        }),
        this._pendingStyles.clear(),
        this._localTimelineStyles.forEach((e, i) => {
          this._currentKeyframe.has(i) || this._currentKeyframe.set(i, e);
        }));
    }
    snapshotCurrentStyles() {
      for (let [e, i] of this._localTimelineStyles)
        this._pendingStyles.set(e, i), this._updateStyle(e, i);
    }
    getFinalKeyframe() {
      return this._keyframes.get(this.duration);
    }
    get properties() {
      let e = [];
      for (let i in this._currentKeyframe) e.push(i);
      return e;
    }
    mergeTimelineCollectedStyles(e) {
      e._styleSummary.forEach((i, n) => {
        let r = this._styleSummary.get(n);
        (!r || i.time > r.time) && this._updateStyle(n, i.value);
      });
    }
    buildKeyframes() {
      this.applyStylesToKeyframe();
      let e = new Set(),
        i = new Set(),
        n = this._keyframes.size === 1 && this.duration === 0,
        r = [];
      this._keyframes.forEach((a, c) => {
        let l = Ir(a, new Map(), this._backFill);
        l.forEach((d, u) => {
          d === Hc ? e.add(u) : d === en && i.add(u);
        }),
          n || l.set('offset', c / this.duration),
          r.push(l);
      });
      let o = e.size ? Yc(e.values()) : [],
        s = i.size ? Yc(i.values()) : [];
      if (n) {
        let a = r[0],
          c = new Map(a);
        a.set('offset', 0), c.set('offset', 1), (r = [a, c]);
      }
      return kh(
        this.element,
        r,
        o,
        s,
        this.duration,
        this.startTime,
        this.easing,
        !1
      );
    }
  },
  vh = class extends el {
    constructor(e, i, n, r, o, s, a = !1) {
      super(e, i, s.delay),
        (this.keyframes = n),
        (this.preStyleProps = r),
        (this.postStyleProps = o),
        (this._stretchStartingKeyframe = a),
        (this.timings = {
          duration: s.duration,
          delay: s.delay,
          easing: s.easing,
        });
    }
    containsAnimation() {
      return this.keyframes.length > 1;
    }
    buildKeyframes() {
      let e = this.keyframes,
        { delay: i, duration: n, easing: r } = this.timings;
      if (this._stretchStartingKeyframe && i) {
        let o = [],
          s = n + i,
          a = i / s,
          c = Ir(e[0]);
        c.set('offset', 0), o.push(c);
        let l = Ir(e[0]);
        l.set('offset', r0(a)), o.push(l);
        let d = e.length - 1;
        for (let u = 1; u <= d; u++) {
          let f = Ir(e[u]),
            h = f.get('offset'),
            m = i + h * n;
          f.set('offset', r0(m / s)), o.push(f);
        }
        (n = s), (i = 0), (r = ''), (e = o);
      }
      return kh(
        this.element,
        e,
        this.preStyleProps,
        this.postStyleProps,
        n,
        i,
        r,
        !0
      );
    }
  };
function r0(t, e = 3) {
  let i = Math.pow(10, e - 1);
  return Math.round(t * i) / i;
}
function H1(t, e) {
  let i = new Map(),
    n;
  return (
    t.forEach((r) => {
      if (r === '*') {
        n = n || e.keys();
        for (let o of n) i.set(o, en);
      } else Ir(r, i);
    }),
    i
  );
}
function o0(t, e, i, n, r, o, s, a, c, l, d, u, f) {
  return {
    type: 0,
    element: t,
    triggerName: e,
    isRemovalTransition: r,
    fromState: i,
    fromStyles: o,
    toState: n,
    toStyles: s,
    timelines: a,
    queriedElements: c,
    preStyleProps: l,
    postStyleProps: d,
    totalTime: u,
    errors: f,
  };
}
var sh = {},
  tl = class {
    constructor(e, i, n) {
      (this._triggerName = e), (this.ast = i), (this._stateStyles = n);
    }
    match(e, i, n, r) {
      return $1(this.ast.matchers, e, i, n, r);
    }
    buildStyles(e, i, n) {
      let r = this._stateStyles.get('*');
      return (
        e !== void 0 && (r = this._stateStyles.get(e?.toString()) || r),
        r ? r.buildStyles(i, n) : new Map()
      );
    }
    build(e, i, n, r, o, s, a, c, l, d) {
      let u = [],
        f = (this.ast.options && this.ast.options.params) || sh,
        h = (a && a.params) || sh,
        m = this.buildStyles(n, h, u),
        g = (c && c.params) || sh,
        C = this.buildStyles(r, g, u),
        E = new Set(),
        N = new Map(),
        ce = new Map(),
        ie = r === 'void',
        fe = { params: z1(g, f), delay: this.ast.options?.delay },
        re = d ? [] : w0(e, i, this.ast.animation, o, s, m, C, fe, l, u),
        ge = 0;
      if (
        (re.forEach((Rt) => {
          ge = Math.max(Rt.duration + Rt.delay, ge);
        }),
        u.length)
      )
        return o0(i, this._triggerName, n, r, ie, m, C, [], [], N, ce, ge, u);
      re.forEach((Rt) => {
        let sn = Rt.element,
          sp = Et(N, sn, new Set());
        Rt.preStyleProps.forEach((ci) => sp.add(ci));
        let zr = Et(ce, sn, new Set());
        Rt.postStyleProps.forEach((ci) => zr.add(ci)), sn !== i && E.add(sn);
      });
      let et = Yc(E.values());
      return o0(i, this._triggerName, n, r, ie, m, C, re, et, N, ce, ge);
    }
  };
function $1(t, e, i, n, r) {
  return t.some((o) => o(e, i, n, r));
}
function z1(t, e) {
  let i = Xo(e);
  for (let n in t) t.hasOwnProperty(n) && t[n] != null && (i[n] = t[n]);
  return i;
}
var _h = class {
  constructor(e, i, n) {
    (this.styles = e), (this.defaultParams = i), (this.normalizer = n);
  }
  buildStyles(e, i) {
    let n = new Map(),
      r = Xo(this.defaultParams);
    return (
      Object.keys(e).forEach((o) => {
        let s = e[o];
        s !== null && (r[o] = s);
      }),
      this.styles.styles.forEach((o) => {
        typeof o != 'string' &&
          o.forEach((s, a) => {
            s && (s = Go(s, r, i));
            let c = this.normalizer.normalizePropertyName(a, i);
            (s = this.normalizer.normalizeStyleValue(a, c, s, i)), n.set(a, s);
          });
      }),
      n
    );
  }
};
function W1(t, e, i) {
  return new yh(t, e, i);
}
var yh = class {
  constructor(e, i, n) {
    (this.name = e),
      (this.ast = i),
      (this._normalizer = n),
      (this.transitionFactories = []),
      (this.states = new Map()),
      i.states.forEach((r) => {
        let o = (r.options && r.options.params) || {};
        this.states.set(r.name, new _h(r.style, o, n));
      }),
      s0(this.states, 'true', '1'),
      s0(this.states, 'false', '0'),
      i.transitions.forEach((r) => {
        this.transitionFactories.push(new tl(e, r, this.states));
      }),
      (this.fallbackTransition = G1(e, this.states, this._normalizer));
  }
  get containsQueries() {
    return this.ast.queryCount > 0;
  }
  matchTransition(e, i, n, r) {
    return this.transitionFactories.find((s) => s.match(e, i, n, r)) || null;
  }
  matchStyles(e, i, n) {
    return this.fallbackTransition.buildStyles(e, i, n);
  }
};
function G1(t, e, i) {
  let o = {
    type: 1,
    animation: { type: 2, steps: [], options: null },
    matchers: [(s, a) => !0],
    options: null,
    queryCount: 0,
    depCount: 0,
  };
  return new tl(t, o, e);
}
function s0(t, e, i) {
  t.has(e) ? t.has(i) || t.set(i, t.get(e)) : t.has(i) && t.set(e, t.get(i));
}
var q1 = new qo(),
  xh = class {
    constructor(e, i, n) {
      (this.bodyNode = e),
        (this._driver = i),
        (this._normalizer = n),
        (this._animations = new Map()),
        (this._playersById = new Map()),
        (this.players = []);
    }
    register(e, i) {
      let n = [],
        r = [],
        o = x0(this._driver, i, n, r);
      if (n.length) throw s1(n);
      r.length && void 0, this._animations.set(e, o);
    }
    _buildPlayer(e, i, n) {
      let r = e.element,
        o = f0(this._normalizer, e.keyframes, i, n);
      return this._driver.animate(r, o, e.duration, e.delay, e.easing, [], !0);
    }
    create(e, i, n = {}) {
      let r = [],
        o = this._animations.get(e),
        s,
        a = new Map();
      if (
        (o
          ? ((s = w0(
              this._driver,
              i,
              o,
              g0,
              dh,
              new Map(),
              new Map(),
              n,
              q1,
              r
            )),
            s.forEach((d) => {
              let u = Et(a, d.element, new Map());
              d.postStyleProps.forEach((f) => u.set(f, null));
            }))
          : (r.push(a1()), (s = [])),
        r.length)
      )
        throw c1(r);
      a.forEach((d, u) => {
        d.forEach((f, h) => {
          d.set(h, this._driver.computeStyle(u, h, en));
        });
      });
      let c = s.map((d) => {
          let u = a.get(d.element);
          return this._buildPlayer(d, new Map(), u);
        }),
        l = Xn(c);
      return (
        this._playersById.set(e, l),
        l.onDestroy(() => this.destroy(e)),
        this.players.push(l),
        l
      );
    }
    destroy(e) {
      let i = this._getPlayer(e);
      i.destroy(), this._playersById.delete(e);
      let n = this.players.indexOf(i);
      n >= 0 && this.players.splice(n, 1);
    }
    _getPlayer(e) {
      let i = this._playersById.get(e);
      if (!i) throw l1(e);
      return i;
    }
    listen(e, i, n, r) {
      let o = Ih(i, '', '', '');
      return Dh(this._getPlayer(e), n, o, r), () => {};
    }
    command(e, i, n, r) {
      if (n == 'register') {
        this.register(e, r[0]);
        return;
      }
      if (n == 'create') {
        let s = r[0] || {};
        this.create(e, i, s);
        return;
      }
      let o = this._getPlayer(e);
      switch (n) {
        case 'play':
          o.play();
          break;
        case 'pause':
          o.pause();
          break;
        case 'reset':
          o.reset();
          break;
        case 'restart':
          o.restart();
          break;
        case 'finish':
          o.finish();
          break;
        case 'init':
          o.init();
          break;
        case 'setPosition':
          o.setPosition(parseFloat(r[0]));
          break;
        case 'destroy':
          this.destroy(e);
          break;
      }
    }
  },
  a0 = 'ng-animate-queued',
  Q1 = '.ng-animate-queued',
  ah = 'ng-animate-disabled',
  Z1 = '.ng-animate-disabled',
  Y1 = 'ng-star-inserted',
  X1 = '.ng-star-inserted',
  K1 = [],
  E0 = {
    namespaceId: '',
    setForRemoval: !1,
    setForMove: !1,
    hasAnimation: !1,
    removedBeforeQueried: !1,
  },
  J1 = {
    namespaceId: '',
    setForMove: !1,
    setForRemoval: !1,
    hasAnimation: !1,
    removedBeforeQueried: !0,
  },
  Ut = '__ng_removed',
  Qo = class {
    get params() {
      return this.options.params;
    }
    constructor(e, i = '') {
      this.namespaceId = i;
      let n = e && e.hasOwnProperty('value'),
        r = n ? e.value : e;
      if (((this.value = tR(r)), n)) {
        let o = Xo(e);
        delete o.value, (this.options = o);
      } else this.options = {};
      this.options.params || (this.options.params = {});
    }
    absorbOptions(e) {
      let i = e.params;
      if (i) {
        let n = this.options.params;
        Object.keys(i).forEach((r) => {
          n[r] == null && (n[r] = i[r]);
        });
      }
    }
  },
  Wo = 'void',
  ch = new Qo(Wo),
  wh = class {
    constructor(e, i, n) {
      (this.id = e),
        (this.hostElement = i),
        (this._engine = n),
        (this.players = []),
        (this._triggers = new Map()),
        (this._queue = []),
        (this._elementListeners = new Map()),
        (this._hostClassName = 'ng-tns-' + e),
        Tt(i, this._hostClassName);
    }
    listen(e, i, n, r) {
      if (!this._triggers.has(i)) throw d1(n, i);
      if (n == null || n.length == 0) throw u1(i);
      if (!nR(n)) throw f1(n, i);
      let o = Et(this._elementListeners, e, []),
        s = { name: i, phase: n, callback: r };
      o.push(s);
      let a = Et(this._engine.statesByElement, e, new Map());
      return (
        a.has(i) || (Tt(e, $c), Tt(e, $c + '-' + i), a.set(i, ch)),
        () => {
          this._engine.afterFlush(() => {
            let c = o.indexOf(s);
            c >= 0 && o.splice(c, 1), this._triggers.has(i) || a.delete(i);
          });
        }
      );
    }
    register(e, i) {
      return this._triggers.has(e) ? !1 : (this._triggers.set(e, i), !0);
    }
    _getTrigger(e) {
      let i = this._triggers.get(e);
      if (!i) throw h1(e);
      return i;
    }
    trigger(e, i, n, r = !0) {
      let o = this._getTrigger(i),
        s = new Zo(this.id, i, e),
        a = this._engine.statesByElement.get(e);
      a ||
        (Tt(e, $c),
        Tt(e, $c + '-' + i),
        this._engine.statesByElement.set(e, (a = new Map())));
      let c = a.get(i),
        l = new Qo(n, this.id);
      if (
        (!(n && n.hasOwnProperty('value')) && c && l.absorbOptions(c.options),
        a.set(i, l),
        c || (c = ch),
        !(l.value === Wo) && c.value === l.value)
      ) {
        if (!oR(c.params, l.params)) {
          let g = [],
            C = o.matchStyles(c.value, c.params, g),
            E = o.matchStyles(l.value, l.params, g);
          g.length
            ? this._engine.reportError(g)
            : this._engine.afterFlush(() => {
                Vi(e, C), tn(e, E);
              });
        }
        return;
      }
      let f = Et(this._engine.playersByElement, e, []);
      f.forEach((g) => {
        g.namespaceId == this.id &&
          g.triggerName == i &&
          g.queued &&
          g.destroy();
      });
      let h = o.matchTransition(c.value, l.value, e, l.params),
        m = !1;
      if (!h) {
        if (!r) return;
        (h = o.fallbackTransition), (m = !0);
      }
      return (
        this._engine.totalQueuedPlayers++,
        this._queue.push({
          element: e,
          triggerName: i,
          transition: h,
          fromState: c,
          toState: l,
          player: s,
          isFallbackTransition: m,
        }),
        m ||
          (Tt(e, a0),
          s.onStart(() => {
            Dr(e, a0);
          })),
        s.onDone(() => {
          let g = this.players.indexOf(s);
          g >= 0 && this.players.splice(g, 1);
          let C = this._engine.playersByElement.get(e);
          if (C) {
            let E = C.indexOf(s);
            E >= 0 && C.splice(E, 1);
          }
        }),
        this.players.push(s),
        f.push(s),
        s
      );
    }
    deregister(e) {
      this._triggers.delete(e),
        this._engine.statesByElement.forEach((i) => i.delete(e)),
        this._elementListeners.forEach((i, n) => {
          this._elementListeners.set(
            n,
            i.filter((r) => r.name != e)
          );
        });
    }
    clearElementCache(e) {
      this._engine.statesByElement.delete(e), this._elementListeners.delete(e);
      let i = this._engine.playersByElement.get(e);
      i &&
        (i.forEach((n) => n.destroy()),
        this._engine.playersByElement.delete(e));
    }
    _signalRemovalForInnerTriggers(e, i) {
      let n = this._engine.driver.query(e, Qc, !0);
      n.forEach((r) => {
        if (r[Ut]) return;
        let o = this._engine.fetchNamespacesByElement(r);
        o.size
          ? o.forEach((s) => s.triggerLeaveAnimation(r, i, !1, !0))
          : this.clearElementCache(r);
      }),
        this._engine.afterFlushAnimationsDone(() =>
          n.forEach((r) => this.clearElementCache(r))
        );
    }
    triggerLeaveAnimation(e, i, n, r) {
      let o = this._engine.statesByElement.get(e),
        s = new Map();
      if (o) {
        let a = [];
        if (
          (o.forEach((c, l) => {
            if ((s.set(l, c.value), this._triggers.has(l))) {
              let d = this.trigger(e, l, Wo, r);
              d && a.push(d);
            }
          }),
          a.length)
        )
          return (
            this._engine.markElementAsRemoved(this.id, e, !0, i, s),
            n && Xn(a).onDone(() => this._engine.processLeaveNode(e)),
            !0
          );
      }
      return !1;
    }
    prepareLeaveAnimationListeners(e) {
      let i = this._elementListeners.get(e),
        n = this._engine.statesByElement.get(e);
      if (i && n) {
        let r = new Set();
        i.forEach((o) => {
          let s = o.name;
          if (r.has(s)) return;
          r.add(s);
          let c = this._triggers.get(s).fallbackTransition,
            l = n.get(s) || ch,
            d = new Qo(Wo),
            u = new Zo(this.id, s, e);
          this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: e,
              triggerName: s,
              transition: c,
              fromState: l,
              toState: d,
              player: u,
              isFallbackTransition: !0,
            });
        });
      }
    }
    removeNode(e, i) {
      let n = this._engine;
      if (
        (e.childElementCount && this._signalRemovalForInnerTriggers(e, i),
        this.triggerLeaveAnimation(e, i, !0))
      )
        return;
      let r = !1;
      if (n.totalAnimations) {
        let o = n.players.length ? n.playersByQueriedElement.get(e) : [];
        if (o && o.length) r = !0;
        else {
          let s = e;
          for (; (s = s.parentNode); )
            if (n.statesByElement.get(s)) {
              r = !0;
              break;
            }
        }
      }
      if ((this.prepareLeaveAnimationListeners(e), r))
        n.markElementAsRemoved(this.id, e, !1, i);
      else {
        let o = e[Ut];
        (!o || o === E0) &&
          (n.afterFlush(() => this.clearElementCache(e)),
          n.destroyInnerAnimations(e),
          n._onRemovalComplete(e, i));
      }
    }
    insertNode(e, i) {
      Tt(e, this._hostClassName);
    }
    drainQueuedTransitions(e) {
      let i = [];
      return (
        this._queue.forEach((n) => {
          let r = n.player;
          if (r.destroyed) return;
          let o = n.element,
            s = this._elementListeners.get(o);
          s &&
            s.forEach((a) => {
              if (a.name == n.triggerName) {
                let c = Ih(
                  o,
                  n.triggerName,
                  n.fromState.value,
                  n.toState.value
                );
                (c._data = e), Dh(n.player, a.phase, c, a.callback);
              }
            }),
            r.markedForDestroy
              ? this._engine.afterFlush(() => {
                  r.destroy();
                })
              : i.push(n);
        }),
        (this._queue = []),
        i.sort((n, r) => {
          let o = n.transition.ast.depCount,
            s = r.transition.ast.depCount;
          return o == 0 || s == 0
            ? o - s
            : this._engine.driver.containsElement(n.element, r.element)
            ? 1
            : -1;
        })
      );
    }
    destroy(e) {
      this.players.forEach((i) => i.destroy()),
        this._signalRemovalForInnerTriggers(this.hostElement, e);
    }
  },
  Eh = class {
    _onRemovalComplete(e, i) {
      this.onRemovalComplete(e, i);
    }
    constructor(e, i, n) {
      (this.bodyNode = e),
        (this.driver = i),
        (this._normalizer = n),
        (this.players = []),
        (this.newHostElements = new Map()),
        (this.playersByElement = new Map()),
        (this.playersByQueriedElement = new Map()),
        (this.statesByElement = new Map()),
        (this.disabledNodes = new Set()),
        (this.totalAnimations = 0),
        (this.totalQueuedPlayers = 0),
        (this._namespaceLookup = {}),
        (this._namespaceList = []),
        (this._flushFns = []),
        (this._whenQuietFns = []),
        (this.namespacesByHostElement = new Map()),
        (this.collectedEnterElements = []),
        (this.collectedLeaveElements = []),
        (this.onRemovalComplete = (r, o) => {});
    }
    get queuedPlayers() {
      let e = [];
      return (
        this._namespaceList.forEach((i) => {
          i.players.forEach((n) => {
            n.queued && e.push(n);
          });
        }),
        e
      );
    }
    createNamespace(e, i) {
      let n = new wh(e, i, this);
      return (
        this.bodyNode && this.driver.containsElement(this.bodyNode, i)
          ? this._balanceNamespaceList(n, i)
          : (this.newHostElements.set(i, n), this.collectEnterElement(i)),
        (this._namespaceLookup[e] = n)
      );
    }
    _balanceNamespaceList(e, i) {
      let n = this._namespaceList,
        r = this.namespacesByHostElement;
      if (n.length - 1 >= 0) {
        let s = !1,
          a = this.driver.getParentElement(i);
        for (; a; ) {
          let c = r.get(a);
          if (c) {
            let l = n.indexOf(c);
            n.splice(l + 1, 0, e), (s = !0);
            break;
          }
          a = this.driver.getParentElement(a);
        }
        s || n.unshift(e);
      } else n.push(e);
      return r.set(i, e), e;
    }
    register(e, i) {
      let n = this._namespaceLookup[e];
      return n || (n = this.createNamespace(e, i)), n;
    }
    registerTrigger(e, i, n) {
      let r = this._namespaceLookup[e];
      r && r.register(i, n) && this.totalAnimations++;
    }
    destroy(e, i) {
      e &&
        (this.afterFlush(() => {}),
        this.afterFlushAnimationsDone(() => {
          let n = this._fetchNamespace(e);
          this.namespacesByHostElement.delete(n.hostElement);
          let r = this._namespaceList.indexOf(n);
          r >= 0 && this._namespaceList.splice(r, 1),
            n.destroy(i),
            delete this._namespaceLookup[e];
        }));
    }
    _fetchNamespace(e) {
      return this._namespaceLookup[e];
    }
    fetchNamespacesByElement(e) {
      let i = new Set(),
        n = this.statesByElement.get(e);
      if (n) {
        for (let r of n.values())
          if (r.namespaceId) {
            let o = this._fetchNamespace(r.namespaceId);
            o && i.add(o);
          }
      }
      return i;
    }
    trigger(e, i, n, r) {
      if (Gc(i)) {
        let o = this._fetchNamespace(e);
        if (o) return o.trigger(i, n, r), !0;
      }
      return !1;
    }
    insertNode(e, i, n, r) {
      if (!Gc(i)) return;
      let o = i[Ut];
      if (o && o.setForRemoval) {
        (o.setForRemoval = !1), (o.setForMove = !0);
        let s = this.collectedLeaveElements.indexOf(i);
        s >= 0 && this.collectedLeaveElements.splice(s, 1);
      }
      if (e) {
        let s = this._fetchNamespace(e);
        s && s.insertNode(i, n);
      }
      r && this.collectEnterElement(i);
    }
    collectEnterElement(e) {
      this.collectedEnterElements.push(e);
    }
    markElementAsDisabled(e, i) {
      i
        ? this.disabledNodes.has(e) || (this.disabledNodes.add(e), Tt(e, ah))
        : this.disabledNodes.has(e) &&
          (this.disabledNodes.delete(e), Dr(e, ah));
    }
    removeNode(e, i, n) {
      if (Gc(i)) {
        let r = e ? this._fetchNamespace(e) : null;
        r ? r.removeNode(i, n) : this.markElementAsRemoved(e, i, !1, n);
        let o = this.namespacesByHostElement.get(i);
        o && o.id !== e && o.removeNode(i, n);
      } else this._onRemovalComplete(i, n);
    }
    markElementAsRemoved(e, i, n, r, o) {
      this.collectedLeaveElements.push(i),
        (i[Ut] = {
          namespaceId: e,
          setForRemoval: r,
          hasAnimation: n,
          removedBeforeQueried: !1,
          previousTriggersValues: o,
        });
    }
    listen(e, i, n, r, o) {
      return Gc(i) ? this._fetchNamespace(e).listen(i, n, r, o) : () => {};
    }
    _buildInstruction(e, i, n, r, o) {
      return e.transition.build(
        this.driver,
        e.element,
        e.fromState.value,
        e.toState.value,
        n,
        r,
        e.fromState.options,
        e.toState.options,
        i,
        o
      );
    }
    destroyInnerAnimations(e) {
      let i = this.driver.query(e, Qc, !0);
      i.forEach((n) => this.destroyActiveAnimationsForElement(n)),
        this.playersByQueriedElement.size != 0 &&
          ((i = this.driver.query(e, uh, !0)),
          i.forEach((n) => this.finishActiveQueriedAnimationOnElement(n)));
    }
    destroyActiveAnimationsForElement(e) {
      let i = this.playersByElement.get(e);
      i &&
        i.forEach((n) => {
          n.queued ? (n.markedForDestroy = !0) : n.destroy();
        });
    }
    finishActiveQueriedAnimationOnElement(e) {
      let i = this.playersByQueriedElement.get(e);
      i && i.forEach((n) => n.finish());
    }
    whenRenderingDone() {
      return new Promise((e) => {
        if (this.players.length) return Xn(this.players).onDone(() => e());
        e();
      });
    }
    processLeaveNode(e) {
      let i = e[Ut];
      if (i && i.setForRemoval) {
        if (((e[Ut] = E0), i.namespaceId)) {
          this.destroyInnerAnimations(e);
          let n = this._fetchNamespace(i.namespaceId);
          n && n.clearElementCache(e);
        }
        this._onRemovalComplete(e, i.setForRemoval);
      }
      e.classList?.contains(ah) && this.markElementAsDisabled(e, !1),
        this.driver.query(e, Z1, !0).forEach((n) => {
          this.markElementAsDisabled(n, !1);
        });
    }
    flush(e = -1) {
      let i = [];
      if (
        (this.newHostElements.size &&
          (this.newHostElements.forEach((n, r) =>
            this._balanceNamespaceList(n, r)
          ),
          this.newHostElements.clear()),
        this.totalAnimations && this.collectedEnterElements.length)
      )
        for (let n = 0; n < this.collectedEnterElements.length; n++) {
          let r = this.collectedEnterElements[n];
          Tt(r, Y1);
        }
      if (
        this._namespaceList.length &&
        (this.totalQueuedPlayers || this.collectedLeaveElements.length)
      ) {
        let n = [];
        try {
          i = this._flushAnimations(n, e);
        } finally {
          for (let r = 0; r < n.length; r++) n[r]();
        }
      } else
        for (let n = 0; n < this.collectedLeaveElements.length; n++) {
          let r = this.collectedLeaveElements[n];
          this.processLeaveNode(r);
        }
      if (
        ((this.totalQueuedPlayers = 0),
        (this.collectedEnterElements.length = 0),
        (this.collectedLeaveElements.length = 0),
        this._flushFns.forEach((n) => n()),
        (this._flushFns = []),
        this._whenQuietFns.length)
      ) {
        let n = this._whenQuietFns;
        (this._whenQuietFns = []),
          i.length
            ? Xn(i).onDone(() => {
                n.forEach((r) => r());
              })
            : n.forEach((r) => r());
      }
    }
    reportError(e) {
      throw m1(e);
    }
    _flushAnimations(e, i) {
      let n = new qo(),
        r = [],
        o = new Map(),
        s = [],
        a = new Map(),
        c = new Map(),
        l = new Map(),
        d = new Set();
      this.disabledNodes.forEach((D) => {
        d.add(D);
        let T = this.driver.query(D, Q1, !0);
        for (let R = 0; R < T.length; R++) d.add(T[R]);
      });
      let u = this.bodyNode,
        f = Array.from(this.statesByElement.keys()),
        h = d0(f, this.collectedEnterElements),
        m = new Map(),
        g = 0;
      h.forEach((D, T) => {
        let R = g0 + g++;
        m.set(T, R), D.forEach((te) => Tt(te, R));
      });
      let C = [],
        E = new Set(),
        N = new Set();
      for (let D = 0; D < this.collectedLeaveElements.length; D++) {
        let T = this.collectedLeaveElements[D],
          R = T[Ut];
        R &&
          R.setForRemoval &&
          (C.push(T),
          E.add(T),
          R.hasAnimation
            ? this.driver.query(T, X1, !0).forEach((te) => E.add(te))
            : N.add(T));
      }
      let ce = new Map(),
        ie = d0(f, Array.from(E));
      ie.forEach((D, T) => {
        let R = dh + g++;
        ce.set(T, R), D.forEach((te) => Tt(te, R));
      }),
        e.push(() => {
          h.forEach((D, T) => {
            let R = m.get(T);
            D.forEach((te) => Dr(te, R));
          }),
            ie.forEach((D, T) => {
              let R = ce.get(T);
              D.forEach((te) => Dr(te, R));
            }),
            C.forEach((D) => {
              this.processLeaveNode(D);
            });
        });
      let fe = [],
        re = [];
      for (let D = this._namespaceList.length - 1; D >= 0; D--)
        this._namespaceList[D].drainQueuedTransitions(i).forEach((R) => {
          let te = R.player,
            Ue = R.element;
          if ((fe.push(te), this.collectedEnterElements.length)) {
            let Ze = Ue[Ut];
            if (Ze && Ze.setForMove) {
              if (
                Ze.previousTriggersValues &&
                Ze.previousTriggersValues.has(R.triggerName)
              ) {
                let li = Ze.previousTriggersValues.get(R.triggerName),
                  Dt = this.statesByElement.get(R.element);
                if (Dt && Dt.has(R.triggerName)) {
                  let As = Dt.get(R.triggerName);
                  (As.value = li), Dt.set(R.triggerName, As);
                }
              }
              te.destroy();
              return;
            }
          }
          let $t = !u || !this.driver.containsElement(u, Ue),
            gt = ce.get(Ue),
            In = m.get(Ue),
            Se = this._buildInstruction(R, n, In, gt, $t);
          if (Se.errors && Se.errors.length) {
            re.push(Se);
            return;
          }
          if ($t) {
            te.onStart(() => Vi(Ue, Se.fromStyles)),
              te.onDestroy(() => tn(Ue, Se.toStyles)),
              r.push(te);
            return;
          }
          if (R.isFallbackTransition) {
            te.onStart(() => Vi(Ue, Se.fromStyles)),
              te.onDestroy(() => tn(Ue, Se.toStyles)),
              r.push(te);
            return;
          }
          let lp = [];
          Se.timelines.forEach((Ze) => {
            (Ze.stretchStartingKeyframe = !0),
              this.disabledNodes.has(Ze.element) || lp.push(Ze);
          }),
            (Se.timelines = lp),
            n.append(Ue, Se.timelines);
          let $E = { instruction: Se, player: te, element: Ue };
          s.push($E),
            Se.queriedElements.forEach((Ze) => Et(a, Ze, []).push(te)),
            Se.preStyleProps.forEach((Ze, li) => {
              if (Ze.size) {
                let Dt = c.get(li);
                Dt || c.set(li, (Dt = new Set())),
                  Ze.forEach((As, Ql) => Dt.add(Ql));
              }
            }),
            Se.postStyleProps.forEach((Ze, li) => {
              let Dt = l.get(li);
              Dt || l.set(li, (Dt = new Set())),
                Ze.forEach((As, Ql) => Dt.add(Ql));
            });
        });
      if (re.length) {
        let D = [];
        re.forEach((T) => {
          D.push(p1(T.triggerName, T.errors));
        }),
          fe.forEach((T) => T.destroy()),
          this.reportError(D);
      }
      let ge = new Map(),
        et = new Map();
      s.forEach((D) => {
        let T = D.element;
        n.has(T) &&
          (et.set(T, T),
          this._beforeAnimationBuild(D.player.namespaceId, D.instruction, ge));
      }),
        r.forEach((D) => {
          let T = D.element;
          this._getPreviousPlayers(
            T,
            !1,
            D.namespaceId,
            D.triggerName,
            null
          ).forEach((te) => {
            Et(ge, T, []).push(te), te.destroy();
          });
        });
      let Rt = C.filter((D) => u0(D, c, l)),
        sn = new Map();
      l0(sn, this.driver, N, l, en).forEach((D) => {
        u0(D, c, l) && Rt.push(D);
      });
      let zr = new Map();
      h.forEach((D, T) => {
        l0(zr, this.driver, new Set(D), c, Hc);
      }),
        Rt.forEach((D) => {
          let T = sn.get(D),
            R = zr.get(D);
          sn.set(
            D,
            new Map([...(T?.entries() ?? []), ...(R?.entries() ?? [])])
          );
        });
      let ci = [],
        ap = [],
        cp = {};
      s.forEach((D) => {
        let { element: T, player: R, instruction: te } = D;
        if (n.has(T)) {
          if (d.has(T)) {
            R.onDestroy(() => tn(T, te.toStyles)),
              (R.disabled = !0),
              R.overrideTotalTime(te.totalTime),
              r.push(R);
            return;
          }
          let Ue = cp;
          if (et.size > 1) {
            let gt = T,
              In = [];
            for (; (gt = gt.parentNode); ) {
              let Se = et.get(gt);
              if (Se) {
                Ue = Se;
                break;
              }
              In.push(gt);
            }
            In.forEach((Se) => et.set(Se, Ue));
          }
          let $t = this._buildAnimation(R.namespaceId, te, ge, o, zr, sn);
          if ((R.setRealPlayer($t), Ue === cp)) ci.push(R);
          else {
            let gt = this.playersByElement.get(Ue);
            gt && gt.length && (R.parentPlayer = Xn(gt)), r.push(R);
          }
        } else
          Vi(T, te.fromStyles),
            R.onDestroy(() => tn(T, te.toStyles)),
            ap.push(R),
            d.has(T) && r.push(R);
      }),
        ap.forEach((D) => {
          let T = o.get(D.element);
          if (T && T.length) {
            let R = Xn(T);
            D.setRealPlayer(R);
          }
        }),
        r.forEach((D) => {
          D.parentPlayer ? D.syncPlayerEvents(D.parentPlayer) : D.destroy();
        });
      for (let D = 0; D < C.length; D++) {
        let T = C[D],
          R = T[Ut];
        if ((Dr(T, dh), R && R.hasAnimation)) continue;
        let te = [];
        if (a.size) {
          let $t = a.get(T);
          $t && $t.length && te.push(...$t);
          let gt = this.driver.query(T, uh, !0);
          for (let In = 0; In < gt.length; In++) {
            let Se = a.get(gt[In]);
            Se && Se.length && te.push(...Se);
          }
        }
        let Ue = te.filter(($t) => !$t.destroyed);
        Ue.length ? iR(this, T, Ue) : this.processLeaveNode(T);
      }
      return (
        (C.length = 0),
        ci.forEach((D) => {
          this.players.push(D),
            D.onDone(() => {
              D.destroy();
              let T = this.players.indexOf(D);
              this.players.splice(T, 1);
            }),
            D.play();
        }),
        ci
      );
    }
    afterFlush(e) {
      this._flushFns.push(e);
    }
    afterFlushAnimationsDone(e) {
      this._whenQuietFns.push(e);
    }
    _getPreviousPlayers(e, i, n, r, o) {
      let s = [];
      if (i) {
        let a = this.playersByQueriedElement.get(e);
        a && (s = a);
      } else {
        let a = this.playersByElement.get(e);
        if (a) {
          let c = !o || o == Wo;
          a.forEach((l) => {
            l.queued || (!c && l.triggerName != r) || s.push(l);
          });
        }
      }
      return (
        (n || r) &&
          (s = s.filter(
            (a) => !((n && n != a.namespaceId) || (r && r != a.triggerName))
          )),
        s
      );
    }
    _beforeAnimationBuild(e, i, n) {
      let r = i.triggerName,
        o = i.element,
        s = i.isRemovalTransition ? void 0 : e,
        a = i.isRemovalTransition ? void 0 : r;
      for (let c of i.timelines) {
        let l = c.element,
          d = l !== o,
          u = Et(n, l, []);
        this._getPreviousPlayers(l, d, s, a, i.toState).forEach((h) => {
          let m = h.getRealPlayer();
          m.beforeDestroy && m.beforeDestroy(), h.destroy(), u.push(h);
        });
      }
      Vi(o, i.fromStyles);
    }
    _buildAnimation(e, i, n, r, o, s) {
      let a = i.triggerName,
        c = i.element,
        l = [],
        d = new Set(),
        u = new Set(),
        f = i.timelines.map((m) => {
          let g = m.element;
          d.add(g);
          let C = g[Ut];
          if (C && C.removedBeforeQueried) return new Yn(m.duration, m.delay);
          let E = g !== c,
            N = rR((n.get(g) || K1).map((ge) => ge.getRealPlayer())).filter(
              (ge) => {
                let et = ge;
                return et.element ? et.element === g : !1;
              }
            ),
            ce = o.get(g),
            ie = s.get(g),
            fe = f0(this._normalizer, m.keyframes, ce, ie),
            re = this._buildPlayer(m, fe, N);
          if ((m.subTimeline && r && u.add(g), E)) {
            let ge = new Zo(e, a, g);
            ge.setRealPlayer(re), l.push(ge);
          }
          return re;
        });
      l.forEach((m) => {
        Et(this.playersByQueriedElement, m.element, []).push(m),
          m.onDone(() => eR(this.playersByQueriedElement, m.element, m));
      }),
        d.forEach((m) => Tt(m, t0));
      let h = Xn(f);
      return (
        h.onDestroy(() => {
          d.forEach((m) => Dr(m, t0)), tn(c, i.toStyles);
        }),
        u.forEach((m) => {
          Et(r, m, []).push(h);
        }),
        h
      );
    }
    _buildPlayer(e, i, n) {
      return i.length > 0
        ? this.driver.animate(e.element, i, e.duration, e.delay, e.easing, n)
        : new Yn(e.duration, e.delay);
    }
  },
  Zo = class {
    constructor(e, i, n) {
      (this.namespaceId = e),
        (this.triggerName = i),
        (this.element = n),
        (this._player = new Yn()),
        (this._containsRealPlayer = !1),
        (this._queuedCallbacks = new Map()),
        (this.destroyed = !1),
        (this.parentPlayer = null),
        (this.markedForDestroy = !1),
        (this.disabled = !1),
        (this.queued = !0),
        (this.totalTime = 0);
    }
    setRealPlayer(e) {
      this._containsRealPlayer ||
        ((this._player = e),
        this._queuedCallbacks.forEach((i, n) => {
          i.forEach((r) => Dh(e, n, void 0, r));
        }),
        this._queuedCallbacks.clear(),
        (this._containsRealPlayer = !0),
        this.overrideTotalTime(e.totalTime),
        (this.queued = !1));
    }
    getRealPlayer() {
      return this._player;
    }
    overrideTotalTime(e) {
      this.totalTime = e;
    }
    syncPlayerEvents(e) {
      let i = this._player;
      i.triggerCallback && e.onStart(() => i.triggerCallback('start')),
        e.onDone(() => this.finish()),
        e.onDestroy(() => this.destroy());
    }
    _queueEvent(e, i) {
      Et(this._queuedCallbacks, e, []).push(i);
    }
    onDone(e) {
      this.queued && this._queueEvent('done', e), this._player.onDone(e);
    }
    onStart(e) {
      this.queued && this._queueEvent('start', e), this._player.onStart(e);
    }
    onDestroy(e) {
      this.queued && this._queueEvent('destroy', e), this._player.onDestroy(e);
    }
    init() {
      this._player.init();
    }
    hasStarted() {
      return this.queued ? !1 : this._player.hasStarted();
    }
    play() {
      !this.queued && this._player.play();
    }
    pause() {
      !this.queued && this._player.pause();
    }
    restart() {
      !this.queued && this._player.restart();
    }
    finish() {
      this._player.finish();
    }
    destroy() {
      (this.destroyed = !0), this._player.destroy();
    }
    reset() {
      !this.queued && this._player.reset();
    }
    setPosition(e) {
      this.queued || this._player.setPosition(e);
    }
    getPosition() {
      return this.queued ? 0 : this._player.getPosition();
    }
    triggerCallback(e) {
      let i = this._player;
      i.triggerCallback && i.triggerCallback(e);
    }
  };
function eR(t, e, i) {
  let n = t.get(e);
  if (n) {
    if (n.length) {
      let r = n.indexOf(i);
      n.splice(r, 1);
    }
    n.length == 0 && t.delete(e);
  }
  return n;
}
function tR(t) {
  return t ?? null;
}
function Gc(t) {
  return t && t.nodeType === 1;
}
function nR(t) {
  return t == 'start' || t == 'done';
}
function c0(t, e) {
  let i = t.style.display;
  return (t.style.display = e ?? 'none'), i;
}
function l0(t, e, i, n, r) {
  let o = [];
  i.forEach((c) => o.push(c0(c)));
  let s = [];
  n.forEach((c, l) => {
    let d = new Map();
    c.forEach((u) => {
      let f = e.computeStyle(l, u, r);
      d.set(u, f), (!f || f.length == 0) && ((l[Ut] = J1), s.push(l));
    }),
      t.set(l, d);
  });
  let a = 0;
  return i.forEach((c) => c0(c, o[a++])), s;
}
function d0(t, e) {
  let i = new Map();
  if ((t.forEach((a) => i.set(a, [])), e.length == 0)) return i;
  let n = 1,
    r = new Set(e),
    o = new Map();
  function s(a) {
    if (!a) return n;
    let c = o.get(a);
    if (c) return c;
    let l = a.parentNode;
    return i.has(l) ? (c = l) : r.has(l) ? (c = n) : (c = s(l)), o.set(a, c), c;
  }
  return (
    e.forEach((a) => {
      let c = s(a);
      c !== n && i.get(c).push(a);
    }),
    i
  );
}
function Tt(t, e) {
  t.classList?.add(e);
}
function Dr(t, e) {
  t.classList?.remove(e);
}
function iR(t, e, i) {
  Xn(i).onDone(() => t.processLeaveNode(e));
}
function rR(t) {
  let e = [];
  return C0(t, e), e;
}
function C0(t, e) {
  for (let i = 0; i < t.length; i++) {
    let n = t[i];
    n instanceof $o ? C0(n.players, e) : e.push(n);
  }
}
function oR(t, e) {
  let i = Object.keys(t),
    n = Object.keys(e);
  if (i.length != n.length) return !1;
  for (let r = 0; r < i.length; r++) {
    let o = i[r];
    if (!e.hasOwnProperty(o) || t[o] !== e[o]) return !1;
  }
  return !0;
}
function u0(t, e, i) {
  let n = i.get(t);
  if (!n) return !1;
  let r = e.get(t);
  return r ? n.forEach((o) => r.add(o)) : e.set(t, n), i.delete(t), !0;
}
var Mr = class {
  constructor(e, i, n) {
    (this._driver = i),
      (this._normalizer = n),
      (this._triggerCache = {}),
      (this.onRemovalComplete = (r, o) => {}),
      (this._transitionEngine = new Eh(e.body, i, n)),
      (this._timelineEngine = new xh(e.body, i, n)),
      (this._transitionEngine.onRemovalComplete = (r, o) =>
        this.onRemovalComplete(r, o));
  }
  registerTrigger(e, i, n, r, o) {
    let s = e + '-' + r,
      a = this._triggerCache[s];
    if (!a) {
      let c = [],
        l = [],
        d = x0(this._driver, o, c, l);
      if (c.length) throw r1(r, c);
      l.length && void 0,
        (a = W1(r, d, this._normalizer)),
        (this._triggerCache[s] = a);
    }
    this._transitionEngine.registerTrigger(i, r, a);
  }
  register(e, i) {
    this._transitionEngine.register(e, i);
  }
  destroy(e, i) {
    this._transitionEngine.destroy(e, i);
  }
  onInsert(e, i, n, r) {
    this._transitionEngine.insertNode(e, i, n, r);
  }
  onRemove(e, i, n) {
    this._transitionEngine.removeNode(e, i, n);
  }
  disableAnimations(e, i) {
    this._transitionEngine.markElementAsDisabled(e, i);
  }
  process(e, i, n, r) {
    if (n.charAt(0) == '@') {
      let [o, s] = Jy(n),
        a = r;
      this._timelineEngine.command(o, i, s, a);
    } else this._transitionEngine.trigger(e, i, n, r);
  }
  listen(e, i, n, r, o) {
    if (n.charAt(0) == '@') {
      let [s, a] = Jy(n);
      return this._timelineEngine.listen(s, i, a, o);
    }
    return this._transitionEngine.listen(e, i, n, r, o);
  }
  flush(e = -1) {
    this._transitionEngine.flush(e);
  }
  get players() {
    return [...this._transitionEngine.players, ...this._timelineEngine.players];
  }
  whenRenderingDone() {
    return this._transitionEngine.whenRenderingDone();
  }
  afterFlushAnimationsDone(e) {
    this._transitionEngine.afterFlushAnimationsDone(e);
  }
};
function sR(t, e) {
  let i = null,
    n = null;
  return (
    Array.isArray(e) && e.length
      ? ((i = lh(e[0])), e.length > 1 && (n = lh(e[e.length - 1])))
      : e instanceof Map && (i = lh(e)),
    i || n ? new aR(t, i, n) : null
  );
}
var aR = (() => {
  let e = class e {
    constructor(n, r, o) {
      (this._element = n),
        (this._startStyles = r),
        (this._endStyles = o),
        (this._state = 0);
      let s = e.initialStylesByElement.get(n);
      s || e.initialStylesByElement.set(n, (s = new Map())),
        (this._initialStyles = s);
    }
    start() {
      this._state < 1 &&
        (this._startStyles &&
          tn(this._element, this._startStyles, this._initialStyles),
        (this._state = 1));
    }
    finish() {
      this.start(),
        this._state < 2 &&
          (tn(this._element, this._initialStyles),
          this._endStyles &&
            (tn(this._element, this._endStyles), (this._endStyles = null)),
          (this._state = 1));
    }
    destroy() {
      this.finish(),
        this._state < 3 &&
          (e.initialStylesByElement.delete(this._element),
          this._startStyles &&
            (Vi(this._element, this._startStyles), (this._endStyles = null)),
          this._endStyles &&
            (Vi(this._element, this._endStyles), (this._endStyles = null)),
          tn(this._element, this._initialStyles),
          (this._state = 3));
    }
  };
  e.initialStylesByElement = new WeakMap();
  let t = e;
  return t;
})();
function lh(t) {
  let e = null;
  return (
    t.forEach((i, n) => {
      cR(n) && ((e = e || new Map()), e.set(n, i));
    }),
    e
  );
}
function cR(t) {
  return t === 'display' || t === 'position';
}
var nl = class {
    constructor(e, i, n, r) {
      (this.element = e),
        (this.keyframes = i),
        (this.options = n),
        (this._specialStyles = r),
        (this._onDoneFns = []),
        (this._onStartFns = []),
        (this._onDestroyFns = []),
        (this._initialized = !1),
        (this._finished = !1),
        (this._started = !1),
        (this._destroyed = !1),
        (this._originalOnDoneFns = []),
        (this._originalOnStartFns = []),
        (this.time = 0),
        (this.parentPlayer = null),
        (this.currentSnapshot = new Map()),
        (this._duration = n.duration),
        (this._delay = n.delay || 0),
        (this.time = this._duration + this._delay);
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((e) => e()),
        (this._onDoneFns = []));
    }
    init() {
      this._buildPlayer(), this._preparePlayerBeforeStart();
    }
    _buildPlayer() {
      if (this._initialized) return;
      this._initialized = !0;
      let e = this.keyframes;
      (this.domPlayer = this._triggerWebAnimation(
        this.element,
        e,
        this.options
      )),
        (this._finalKeyframe = e.length ? e[e.length - 1] : new Map());
      let i = () => this._onFinish();
      this.domPlayer.addEventListener('finish', i),
        this.onDestroy(() => {
          this.domPlayer.removeEventListener('finish', i);
        });
    }
    _preparePlayerBeforeStart() {
      this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
    }
    _convertKeyframesToObject(e) {
      let i = [];
      return (
        e.forEach((n) => {
          i.push(Object.fromEntries(n));
        }),
        i
      );
    }
    _triggerWebAnimation(e, i, n) {
      return e.animate(this._convertKeyframesToObject(i), n);
    }
    onStart(e) {
      this._originalOnStartFns.push(e), this._onStartFns.push(e);
    }
    onDone(e) {
      this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
    }
    onDestroy(e) {
      this._onDestroyFns.push(e);
    }
    play() {
      this._buildPlayer(),
        this.hasStarted() ||
          (this._onStartFns.forEach((e) => e()),
          (this._onStartFns = []),
          (this._started = !0),
          this._specialStyles && this._specialStyles.start()),
        this.domPlayer.play();
    }
    pause() {
      this.init(), this.domPlayer.pause();
    }
    finish() {
      this.init(),
        this._specialStyles && this._specialStyles.finish(),
        this._onFinish(),
        this.domPlayer.finish();
    }
    reset() {
      this._resetDomPlayerState(),
        (this._destroyed = !1),
        (this._finished = !1),
        (this._started = !1),
        (this._onStartFns = this._originalOnStartFns),
        (this._onDoneFns = this._originalOnDoneFns);
    }
    _resetDomPlayerState() {
      this.domPlayer && this.domPlayer.cancel();
    }
    restart() {
      this.reset(), this.play();
    }
    hasStarted() {
      return this._started;
    }
    destroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this._resetDomPlayerState(),
        this._onFinish(),
        this._specialStyles && this._specialStyles.destroy(),
        this._onDestroyFns.forEach((e) => e()),
        (this._onDestroyFns = []));
    }
    setPosition(e) {
      this.domPlayer === void 0 && this.init(),
        (this.domPlayer.currentTime = e * this.time);
    }
    getPosition() {
      return +(this.domPlayer.currentTime ?? 0) / this.time;
    }
    get totalTime() {
      return this._delay + this._duration;
    }
    beforeDestroy() {
      let e = new Map();
      this.hasStarted() &&
        this._finalKeyframe.forEach((n, r) => {
          r !== 'offset' && e.set(r, this._finished ? n : _0(this.element, r));
        }),
        (this.currentSnapshot = e);
    }
    triggerCallback(e) {
      let i = e === 'start' ? this._onStartFns : this._onDoneFns;
      i.forEach((n) => n()), (i.length = 0);
    }
  },
  il = class {
    validateStyleProperty(e) {
      return !0;
    }
    validateAnimatableStyleProperty(e) {
      return !0;
    }
    matchesElement(e, i) {
      return !1;
    }
    containsElement(e, i) {
      return h0(e, i);
    }
    getParentElement(e) {
      return Mh(e);
    }
    query(e, i, n) {
      return m0(e, i, n);
    }
    computeStyle(e, i, n) {
      return window.getComputedStyle(e)[i];
    }
    animate(e, i, n, r, o, s = []) {
      let a = r == 0 ? 'both' : 'forwards',
        c = { duration: n, delay: r, fill: a };
      o && (c.easing = o);
      let l = new Map(),
        d = s.filter((h) => h instanceof nl);
      I1(n, r) &&
        d.forEach((h) => {
          h.currentSnapshot.forEach((m, g) => l.set(g, m));
        });
      let u = E1(i).map((h) => Ir(h));
      u = M1(e, u, l);
      let f = sR(e, u);
      return new nl(e, u, c, f);
    }
  };
var qc = '@',
  D0 = '@.disabled',
  rl = class {
    constructor(e, i, n, r) {
      (this.namespaceId = e),
        (this.delegate = i),
        (this.engine = n),
        (this._onDestroy = r),
        (this.ɵtype = 0);
    }
    get data() {
      return this.delegate.data;
    }
    destroyNode(e) {
      this.delegate.destroyNode?.(e);
    }
    destroy() {
      this.engine.destroy(this.namespaceId, this.delegate),
        this.engine.afterFlushAnimationsDone(() => {
          queueMicrotask(() => {
            this.delegate.destroy();
          });
        }),
        this._onDestroy?.();
    }
    createElement(e, i) {
      return this.delegate.createElement(e, i);
    }
    createComment(e) {
      return this.delegate.createComment(e);
    }
    createText(e) {
      return this.delegate.createText(e);
    }
    appendChild(e, i) {
      this.delegate.appendChild(e, i),
        this.engine.onInsert(this.namespaceId, i, e, !1);
    }
    insertBefore(e, i, n, r = !0) {
      this.delegate.insertBefore(e, i, n),
        this.engine.onInsert(this.namespaceId, i, e, r);
    }
    removeChild(e, i, n) {
      this.engine.onRemove(this.namespaceId, i, this.delegate);
    }
    selectRootElement(e, i) {
      return this.delegate.selectRootElement(e, i);
    }
    parentNode(e) {
      return this.delegate.parentNode(e);
    }
    nextSibling(e) {
      return this.delegate.nextSibling(e);
    }
    setAttribute(e, i, n, r) {
      this.delegate.setAttribute(e, i, n, r);
    }
    removeAttribute(e, i, n) {
      this.delegate.removeAttribute(e, i, n);
    }
    addClass(e, i) {
      this.delegate.addClass(e, i);
    }
    removeClass(e, i) {
      this.delegate.removeClass(e, i);
    }
    setStyle(e, i, n, r) {
      this.delegate.setStyle(e, i, n, r);
    }
    removeStyle(e, i, n) {
      this.delegate.removeStyle(e, i, n);
    }
    setProperty(e, i, n) {
      i.charAt(0) == qc && i == D0
        ? this.disableAnimations(e, !!n)
        : this.delegate.setProperty(e, i, n);
    }
    setValue(e, i) {
      this.delegate.setValue(e, i);
    }
    listen(e, i, n) {
      return this.delegate.listen(e, i, n);
    }
    disableAnimations(e, i) {
      this.engine.disableAnimations(e, i);
    }
  },
  Ch = class extends rl {
    constructor(e, i, n, r, o) {
      super(i, n, r, o), (this.factory = e), (this.namespaceId = i);
    }
    setProperty(e, i, n) {
      i.charAt(0) == qc
        ? i.charAt(1) == '.' && i == D0
          ? ((n = n === void 0 ? !0 : !!n), this.disableAnimations(e, n))
          : this.engine.process(this.namespaceId, e, i.slice(1), n)
        : this.delegate.setProperty(e, i, n);
    }
    listen(e, i, n) {
      if (i.charAt(0) == qc) {
        let r = lR(e),
          o = i.slice(1),
          s = '';
        return (
          o.charAt(0) != qc && ([o, s] = dR(o)),
          this.engine.listen(this.namespaceId, r, o, s, (a) => {
            let c = a._data || -1;
            this.factory.scheduleListenerCallback(c, n, a);
          })
        );
      }
      return this.delegate.listen(e, i, n);
    }
  };
function lR(t) {
  switch (t) {
    case 'body':
      return document.body;
    case 'document':
      return document;
    case 'window':
      return window;
    default:
      return t;
  }
}
function dR(t) {
  let e = t.indexOf('.'),
    i = t.substring(0, e),
    n = t.slice(e + 1);
  return [i, n];
}
var ol = class {
  constructor(e, i, n) {
    (this.delegate = e),
      (this.engine = i),
      (this._zone = n),
      (this._currentId = 0),
      (this._microtaskId = 1),
      (this._animationCallbacksBuffer = []),
      (this._rendererCache = new Map()),
      (this._cdRecurDepth = 0),
      (i.onRemovalComplete = (r, o) => {
        let s = o?.parentNode(r);
        s && o.removeChild(s, r);
      });
  }
  createRenderer(e, i) {
    let n = '',
      r = this.delegate.createRenderer(e, i);
    if (!e || !i?.data?.animation) {
      let l = this._rendererCache,
        d = l.get(r);
      if (!d) {
        let u = () => l.delete(r);
        (d = new rl(n, r, this.engine, u)), l.set(r, d);
      }
      return d;
    }
    let o = i.id,
      s = i.id + '-' + this._currentId;
    this._currentId++, this.engine.register(s, e);
    let a = (l) => {
      Array.isArray(l)
        ? l.forEach(a)
        : this.engine.registerTrigger(o, s, e, l.name, l);
    };
    return i.data.animation.forEach(a), new Ch(this, s, r, this.engine);
  }
  begin() {
    this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
  }
  _scheduleCountTask() {
    queueMicrotask(() => {
      this._microtaskId++;
    });
  }
  scheduleListenerCallback(e, i, n) {
    if (e >= 0 && e < this._microtaskId) {
      this._zone.run(() => i(n));
      return;
    }
    let r = this._animationCallbacksBuffer;
    r.length == 0 &&
      queueMicrotask(() => {
        this._zone.run(() => {
          r.forEach((o) => {
            let [s, a] = o;
            s(a);
          }),
            (this._animationCallbacksBuffer = []);
        });
      }),
      r.push([i, n]);
  }
  end() {
    this._cdRecurDepth--,
      this._cdRecurDepth == 0 &&
        this._zone.runOutsideAngular(() => {
          this._scheduleCountTask(), this.engine.flush(this._microtaskId);
        }),
      this.delegate.end && this.delegate.end();
  }
  whenRenderingDone() {
    return this.engine.whenRenderingDone();
  }
};
var fR = (() => {
  let e = class e extends Mr {
    constructor(n, r, o, s) {
      super(n, r, o);
    }
    ngOnDestroy() {
      this.flush();
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(v(ne), v(Yo), v(ji), v(Jt));
  }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac }));
  let t = e;
  return t;
})();
function hR() {
  return new Xc();
}
function mR(t, e, i) {
  return new ol(t, e, i);
}
var I0 = [
    { provide: ji, useFactory: hR },
    { provide: Mr, useClass: fR },
    { provide: Ci, useFactory: mR, deps: [Ic, Mr, I] },
  ],
  pR = [
    { provide: Yo, useFactory: () => new il() },
    { provide: $e, useValue: 'BrowserAnimations' },
    ...I0,
  ],
  Az = [
    { provide: Yo, useClass: Sh },
    { provide: $e, useValue: 'NoopAnimations' },
    ...I0,
  ];
function M0() {
  return [...pR];
}
function Be(t) {
  return t != null && `${t}` != 'false';
}
function pt(t, e = 0) {
  return gR(t) ? Number(t) : e;
}
function gR(t) {
  return !isNaN(parseFloat(t)) && !isNaN(Number(t));
}
function Ah(t) {
  return Array.isArray(t) ? t : [t];
}
function nn(t) {
  return t instanceof z ? t.nativeElement : t;
}
var bR = (() => {
  let e = class e {
    create(n) {
      return typeof MutationObserver > 'u' ? null : new MutationObserver(n);
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
var S0 = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = V({ type: e })),
    (e.ɵinj = L({ providers: [bR] }));
  let t = e;
  return t;
})();
var T0 = new Set(),
  Bi,
  vR = (() => {
    let e = class e {
      constructor(n, r) {
        (this._platform = n),
          (this._nonce = r),
          (this._matchMedia =
            this._platform.isBrowser && window.matchMedia
              ? window.matchMedia.bind(window)
              : yR);
      }
      matchMedia(n) {
        return (
          (this._platform.WEBKIT || this._platform.BLINK) && _R(n, this._nonce),
          this._matchMedia(n)
        );
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(Ae), v(yo, 8));
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })();
function _R(t, e) {
  if (!T0.has(t))
    try {
      Bi ||
        ((Bi = document.createElement('style')),
        e && (Bi.nonce = e),
        Bi.setAttribute('type', 'text/css'),
        document.head.appendChild(Bi)),
        Bi.sheet &&
          (Bi.sheet.insertRule(`@media ${t} {body{ }}`, 0), T0.add(t));
    } catch (i) {
      console.error(i);
    }
}
function yR(t) {
  return {
    matches: t === 'all' || t === '',
    media: t,
    addListener: () => {},
    removeListener: () => {},
  };
}
var A0 = (() => {
  let e = class e {
    constructor(n, r) {
      (this._mediaMatcher = n),
        (this._zone = r),
        (this._queries = new Map()),
        (this._destroySubject = new Z());
    }
    ngOnDestroy() {
      this._destroySubject.next(), this._destroySubject.complete();
    }
    isMatched(n) {
      return k0(Ah(n)).some((o) => this._registerQuery(o).mql.matches);
    }
    observe(n) {
      let o = k0(Ah(n)).map((a) => this._registerQuery(a).observable),
        s = pi(o);
      return (
        (s = Tn(s.pipe(at(1)), s.pipe(Yr(1), ca(0)))),
        s.pipe(
          A((a) => {
            let c = { matches: !1, breakpoints: {} };
            return (
              a.forEach(({ matches: l, query: d }) => {
                (c.matches = c.matches || l), (c.breakpoints[d] = l);
              }),
              c
            );
          })
        )
      );
    }
    _registerQuery(n) {
      if (this._queries.has(n)) return this._queries.get(n);
      let r = this._mediaMatcher.matchMedia(n),
        s = {
          observable: new Q((a) => {
            let c = (l) => this._zone.run(() => a.next(l));
            return (
              r.addListener(c),
              () => {
                r.removeListener(c);
              }
            );
          }).pipe(
            Xr(r),
            A(({ matches: a }) => ({ query: n, matches: a })),
            vt(this._destroySubject)
          ),
          mql: r,
        };
      return this._queries.set(n, s), s;
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(v(vR), v(I));
  }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
function k0(t) {
  return t
    .map((e) => e.split(','))
    .reduce((e, i) => e.concat(i))
    .map((e) => e.trim());
}
function Fh(t) {
  return t.buttons === 0 || t.detail === 0;
}
function Nh(t) {
  let e =
    (t.touches && t.touches[0]) || (t.changedTouches && t.changedTouches[0]);
  return (
    !!e &&
    e.identifier === -1 &&
    (e.radiusX == null || e.radiusX === 1) &&
    (e.radiusY == null || e.radiusY === 1)
  );
}
var xR = new w('cdk-input-modality-detector-options'),
  wR = { ignoreKeys: [18, 17, 224, 91, 16] },
  N0 = 650,
  Sr = Qn({ passive: !0, capture: !0 }),
  ER = (() => {
    let e = class e {
      get mostRecentModality() {
        return this._modality.value;
      }
      constructor(n, r, o, s) {
        (this._platform = n),
          (this._mostRecentTarget = null),
          (this._modality = new Ve(null)),
          (this._lastTouchMs = 0),
          (this._onKeydown = (a) => {
            this._options?.ignoreKeys?.some((c) => c === a.keyCode) ||
              (this._modality.next('keyboard'),
              (this._mostRecentTarget = Zn(a)));
          }),
          (this._onMousedown = (a) => {
            Date.now() - this._lastTouchMs < N0 ||
              (this._modality.next(Fh(a) ? 'keyboard' : 'mouse'),
              (this._mostRecentTarget = Zn(a)));
          }),
          (this._onTouchstart = (a) => {
            if (Nh(a)) {
              this._modality.next('keyboard');
              return;
            }
            (this._lastTouchMs = Date.now()),
              this._modality.next('touch'),
              (this._mostRecentTarget = Zn(a));
          }),
          (this._options = x(x({}, wR), s)),
          (this.modalityDetected = this._modality.pipe(Yr(1))),
          (this.modalityChanged = this.modalityDetected.pipe(hd())),
          n.isBrowser &&
            r.runOutsideAngular(() => {
              o.addEventListener('keydown', this._onKeydown, Sr),
                o.addEventListener('mousedown', this._onMousedown, Sr),
                o.addEventListener('touchstart', this._onTouchstart, Sr);
            });
      }
      ngOnDestroy() {
        this._modality.complete(),
          this._platform.isBrowser &&
            (document.removeEventListener('keydown', this._onKeydown, Sr),
            document.removeEventListener('mousedown', this._onMousedown, Sr),
            document.removeEventListener('touchstart', this._onTouchstart, Sr));
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(Ae), v(I), v(ne), v(xR, 8));
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })();
var CR = new w('cdk-focus-monitor-default-options'),
  sl = Qn({ passive: !0, capture: !0 }),
  al = (() => {
    let e = class e {
      constructor(n, r, o, s, a) {
        (this._ngZone = n),
          (this._platform = r),
          (this._inputModalityDetector = o),
          (this._origin = null),
          (this._windowFocused = !1),
          (this._originFromTouchInteraction = !1),
          (this._elementInfo = new Map()),
          (this._monitoredElementCount = 0),
          (this._rootNodeFocusListenerCount = new Map()),
          (this._windowFocusListener = () => {
            (this._windowFocused = !0),
              (this._windowFocusTimeoutId = window.setTimeout(
                () => (this._windowFocused = !1)
              ));
          }),
          (this._stopInputModalityDetector = new Z()),
          (this._rootNodeFocusAndBlurListener = (c) => {
            let l = Zn(c);
            for (let d = l; d; d = d.parentElement)
              c.type === 'focus' ? this._onFocus(c, d) : this._onBlur(c, d);
          }),
          (this._document = s),
          (this._detectionMode = a?.detectionMode || 0);
      }
      monitor(n, r = !1) {
        let o = nn(n);
        if (!this._platform.isBrowser || o.nodeType !== 1) return M();
        let s = Wy(o) || this._getDocument(),
          a = this._elementInfo.get(o);
        if (a) return r && (a.checkChildren = !0), a.subject;
        let c = { checkChildren: r, subject: new Z(), rootNode: s };
        return (
          this._elementInfo.set(o, c),
          this._registerGlobalListeners(c),
          c.subject
        );
      }
      stopMonitoring(n) {
        let r = nn(n),
          o = this._elementInfo.get(r);
        o &&
          (o.subject.complete(),
          this._setClasses(r),
          this._elementInfo.delete(r),
          this._removeGlobalListeners(o));
      }
      focusVia(n, r, o) {
        let s = nn(n),
          a = this._getDocument().activeElement;
        s === a
          ? this._getClosestElementsInfo(s).forEach(([c, l]) =>
              this._originChanged(c, r, l)
            )
          : (this._setOrigin(r), typeof s.focus == 'function' && s.focus(o));
      }
      ngOnDestroy() {
        this._elementInfo.forEach((n, r) => this.stopMonitoring(r));
      }
      _getDocument() {
        return this._document || document;
      }
      _getWindow() {
        return this._getDocument().defaultView || window;
      }
      _getFocusOrigin(n) {
        return this._origin
          ? this._originFromTouchInteraction
            ? this._shouldBeAttributedToTouch(n)
              ? 'touch'
              : 'program'
            : this._origin
          : this._windowFocused && this._lastFocusOrigin
          ? this._lastFocusOrigin
          : n && this._isLastInteractionFromInputLabel(n)
          ? 'mouse'
          : 'program';
      }
      _shouldBeAttributedToTouch(n) {
        return (
          this._detectionMode === 1 ||
          !!n?.contains(this._inputModalityDetector._mostRecentTarget)
        );
      }
      _setClasses(n, r) {
        n.classList.toggle('cdk-focused', !!r),
          n.classList.toggle('cdk-touch-focused', r === 'touch'),
          n.classList.toggle('cdk-keyboard-focused', r === 'keyboard'),
          n.classList.toggle('cdk-mouse-focused', r === 'mouse'),
          n.classList.toggle('cdk-program-focused', r === 'program');
      }
      _setOrigin(n, r = !1) {
        this._ngZone.runOutsideAngular(() => {
          if (
            ((this._origin = n),
            (this._originFromTouchInteraction = n === 'touch' && r),
            this._detectionMode === 0)
          ) {
            clearTimeout(this._originTimeoutId);
            let o = this._originFromTouchInteraction ? N0 : 1;
            this._originTimeoutId = setTimeout(() => (this._origin = null), o);
          }
        });
      }
      _onFocus(n, r) {
        let o = this._elementInfo.get(r),
          s = Zn(n);
        !o ||
          (!o.checkChildren && r !== s) ||
          this._originChanged(r, this._getFocusOrigin(s), o);
      }
      _onBlur(n, r) {
        let o = this._elementInfo.get(r);
        !o ||
          (o.checkChildren &&
            n.relatedTarget instanceof Node &&
            r.contains(n.relatedTarget)) ||
          (this._setClasses(r), this._emitOrigin(o, null));
      }
      _emitOrigin(n, r) {
        n.subject.observers.length && this._ngZone.run(() => n.subject.next(r));
      }
      _registerGlobalListeners(n) {
        if (!this._platform.isBrowser) return;
        let r = n.rootNode,
          o = this._rootNodeFocusListenerCount.get(r) || 0;
        o ||
          this._ngZone.runOutsideAngular(() => {
            r.addEventListener('focus', this._rootNodeFocusAndBlurListener, sl),
              r.addEventListener(
                'blur',
                this._rootNodeFocusAndBlurListener,
                sl
              );
          }),
          this._rootNodeFocusListenerCount.set(r, o + 1),
          ++this._monitoredElementCount === 1 &&
            (this._ngZone.runOutsideAngular(() => {
              this._getWindow().addEventListener(
                'focus',
                this._windowFocusListener
              );
            }),
            this._inputModalityDetector.modalityDetected
              .pipe(vt(this._stopInputModalityDetector))
              .subscribe((s) => {
                this._setOrigin(s, !0);
              }));
      }
      _removeGlobalListeners(n) {
        let r = n.rootNode;
        if (this._rootNodeFocusListenerCount.has(r)) {
          let o = this._rootNodeFocusListenerCount.get(r);
          o > 1
            ? this._rootNodeFocusListenerCount.set(r, o - 1)
            : (r.removeEventListener(
                'focus',
                this._rootNodeFocusAndBlurListener,
                sl
              ),
              r.removeEventListener(
                'blur',
                this._rootNodeFocusAndBlurListener,
                sl
              ),
              this._rootNodeFocusListenerCount.delete(r));
        }
        --this._monitoredElementCount ||
          (this._getWindow().removeEventListener(
            'focus',
            this._windowFocusListener
          ),
          this._stopInputModalityDetector.next(),
          clearTimeout(this._windowFocusTimeoutId),
          clearTimeout(this._originTimeoutId));
      }
      _originChanged(n, r, o) {
        this._setClasses(n, r),
          this._emitOrigin(o, r),
          (this._lastFocusOrigin = r);
      }
      _getClosestElementsInfo(n) {
        let r = [];
        return (
          this._elementInfo.forEach((o, s) => {
            (s === n || (o.checkChildren && s.contains(n))) && r.push([s, o]);
          }),
          r
        );
      }
      _isLastInteractionFromInputLabel(n) {
        let { _mostRecentTarget: r, mostRecentModality: o } =
          this._inputModalityDetector;
        if (
          o !== 'mouse' ||
          !r ||
          r === n ||
          (n.nodeName !== 'INPUT' && n.nodeName !== 'TEXTAREA') ||
          n.disabled
        )
          return !1;
        let s = n.labels;
        if (s) {
          for (let a = 0; a < s.length; a++) if (s[a].contains(r)) return !0;
        }
        return !1;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(I), v(Ae), v(ER), v(ne, 8), v(CR, 8));
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })();
var R0 = 'cdk-high-contrast-black-on-white',
  F0 = 'cdk-high-contrast-white-on-black',
  Rh = 'cdk-high-contrast-active',
  O0 = (() => {
    let e = class e {
      constructor(n, r) {
        (this._platform = n),
          (this._document = r),
          (this._breakpointSubscription = b(A0)
            .observe('(forced-colors: active)')
            .subscribe(() => {
              this._hasCheckedHighContrastMode &&
                ((this._hasCheckedHighContrastMode = !1),
                this._applyBodyHighContrastModeCssClasses());
            }));
      }
      getHighContrastMode() {
        if (!this._platform.isBrowser) return 0;
        let n = this._document.createElement('div');
        (n.style.backgroundColor = 'rgb(1,2,3)'),
          (n.style.position = 'absolute'),
          this._document.body.appendChild(n);
        let r = this._document.defaultView || window,
          o = r && r.getComputedStyle ? r.getComputedStyle(n) : null,
          s = ((o && o.backgroundColor) || '').replace(/ /g, '');
        switch ((n.remove(), s)) {
          case 'rgb(0,0,0)':
          case 'rgb(45,50,54)':
          case 'rgb(32,32,32)':
            return 2;
          case 'rgb(255,255,255)':
          case 'rgb(255,250,239)':
            return 1;
        }
        return 0;
      }
      ngOnDestroy() {
        this._breakpointSubscription.unsubscribe();
      }
      _applyBodyHighContrastModeCssClasses() {
        if (
          !this._hasCheckedHighContrastMode &&
          this._platform.isBrowser &&
          this._document.body
        ) {
          let n = this._document.body.classList;
          n.remove(Rh, R0, F0), (this._hasCheckedHighContrastMode = !0);
          let r = this.getHighContrastMode();
          r === 1 ? n.add(Rh, R0) : r === 2 && n.add(Rh, F0);
        }
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(Ae), v(ne));
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })();
var DR = new w('cdk-dir-doc', { providedIn: 'root', factory: IR });
function IR() {
  return b(ne);
}
var MR =
  /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
function SR(t) {
  let e = t?.toLowerCase() || '';
  return e === 'auto' && typeof navigator < 'u' && navigator?.language
    ? MR.test(navigator.language)
      ? 'rtl'
      : 'ltr'
    : e === 'rtl'
    ? 'rtl'
    : 'ltr';
}
var cl = (() => {
  let e = class e {
    constructor(n) {
      if (((this.value = 'ltr'), (this.change = new Y()), n)) {
        let r = n.body ? n.body.dir : null,
          o = n.documentElement ? n.documentElement.dir : null;
        this.value = SR(r || o || 'ltr');
      }
    }
    ngOnDestroy() {
      this.change.complete();
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(v(DR, 8));
  }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
var Oh = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = V({ type: e })),
    (e.ɵinj = L({}));
  let t = e;
  return t;
})();
function TR() {
  return !0;
}
var kR = new w('mat-sanity-checks', { providedIn: 'root', factory: TR }),
  Ie = (() => {
    let e = class e {
      constructor(n, r, o) {
        (this._sanityChecks = r),
          (this._document = o),
          (this._hasDoneGlobalChecks = !1),
          n._applyBodyHighContrastModeCssClasses(),
          this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0);
      }
      _checkIsEnabled(n) {
        return Gy()
          ? !1
          : typeof this._sanityChecks == 'boolean'
          ? this._sanityChecks
          : !!this._sanityChecks[n];
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(O0), v(kR, 8), v(ne));
    }),
      (e.ɵmod = V({ type: e })),
      (e.ɵinj = L({ imports: [Oh, Oh] }));
    let t = e;
    return t;
  })();
function dl(t, e) {
  return class extends t {
    get color() {
      return this._color;
    }
    set color(i) {
      let n = i || this.defaultColor;
      n !== this._color &&
        (this._color &&
          this._elementRef.nativeElement.classList.remove(`mat-${this._color}`),
        n && this._elementRef.nativeElement.classList.add(`mat-${n}`),
        (this._color = n));
    }
    constructor(...i) {
      super(...i), (this.defaultColor = e), (this.color = e);
    }
  };
}
function G0(t) {
  return class extends t {
    get disableRipple() {
      return this._disableRipple;
    }
    set disableRipple(e) {
      this._disableRipple = Be(e);
    }
    constructor(...e) {
      super(...e), (this._disableRipple = !1);
    }
  };
}
function q0(t) {
  return class extends t {
    updateErrorState() {
      let e = this.errorState,
        i = this._parentFormGroup || this._parentForm,
        n = this.errorStateMatcher || this._defaultErrorStateMatcher,
        r = this.ngControl ? this.ngControl.control : null,
        o = n.isErrorState(r, i);
      o !== e && ((this.errorState = o), this.stateChanges.next());
    }
    constructor(...e) {
      super(...e), (this.errorState = !1);
    }
  };
}
var Q0 = (() => {
  let e = class e {
    isErrorState(n, r) {
      return !!(n && n.invalid && (n.touched || (r && r.submitted)));
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
var Vh = class {
    constructor(e, i, n, r = !1) {
      (this._renderer = e),
        (this.element = i),
        (this.config = n),
        (this._animationForciblyDisabledThroughCss = r),
        (this.state = 3);
    }
    fadeOut() {
      this._renderer.fadeOutRipple(this);
    }
  },
  V0 = Qn({ passive: !0, capture: !0 }),
  jh = class {
    constructor() {
      (this._events = new Map()),
        (this._delegateEventHandler = (e) => {
          let i = Zn(e);
          i &&
            this._events.get(e.type)?.forEach((n, r) => {
              (r === i || r.contains(i)) && n.forEach((o) => o.handleEvent(e));
            });
        });
    }
    addHandler(e, i, n, r) {
      let o = this._events.get(i);
      if (o) {
        let s = o.get(n);
        s ? s.add(r) : o.set(n, new Set([r]));
      } else
        this._events.set(i, new Map([[n, new Set([r])]])),
          e.runOutsideAngular(() => {
            document.addEventListener(i, this._delegateEventHandler, V0);
          });
    }
    removeHandler(e, i, n) {
      let r = this._events.get(e);
      if (!r) return;
      let o = r.get(i);
      o &&
        (o.delete(n),
        o.size === 0 && r.delete(i),
        r.size === 0 &&
          (this._events.delete(e),
          document.removeEventListener(e, this._delegateEventHandler, V0)));
    }
  },
  j0 = { enterDuration: 225, exitDuration: 150 },
  AR = 800,
  B0 = Qn({ passive: !0, capture: !0 }),
  U0 = ['mousedown', 'touchstart'],
  H0 = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'],
  Ko = class Ko {
    constructor(e, i, n, r) {
      (this._target = e),
        (this._ngZone = i),
        (this._platform = r),
        (this._isPointerDown = !1),
        (this._activeRipples = new Map()),
        (this._pointerUpEventsRegistered = !1),
        r.isBrowser && (this._containerElement = nn(n));
    }
    fadeInRipple(e, i, n = {}) {
      let r = (this._containerRect =
          this._containerRect ||
          this._containerElement.getBoundingClientRect()),
        o = x(x({}, j0), n.animation);
      n.centered && ((e = r.left + r.width / 2), (i = r.top + r.height / 2));
      let s = n.radius || RR(e, i, r),
        a = e - r.left,
        c = i - r.top,
        l = o.enterDuration,
        d = document.createElement('div');
      d.classList.add('mat-ripple-element'),
        (d.style.left = `${a - s}px`),
        (d.style.top = `${c - s}px`),
        (d.style.height = `${s * 2}px`),
        (d.style.width = `${s * 2}px`),
        n.color != null && (d.style.backgroundColor = n.color),
        (d.style.transitionDuration = `${l}ms`),
        this._containerElement.appendChild(d);
      let u = window.getComputedStyle(d),
        f = u.transitionProperty,
        h = u.transitionDuration,
        m =
          f === 'none' ||
          h === '0s' ||
          h === '0s, 0s' ||
          (r.width === 0 && r.height === 0),
        g = new Vh(this, d, n, m);
      (d.style.transform = 'scale3d(1, 1, 1)'),
        (g.state = 0),
        n.persistent || (this._mostRecentTransientRipple = g);
      let C = null;
      return (
        !m &&
          (l || o.exitDuration) &&
          this._ngZone.runOutsideAngular(() => {
            let E = () => this._finishRippleTransition(g),
              N = () => this._destroyRipple(g);
            d.addEventListener('transitionend', E),
              d.addEventListener('transitioncancel', N),
              (C = { onTransitionEnd: E, onTransitionCancel: N });
          }),
        this._activeRipples.set(g, C),
        (m || !l) && this._finishRippleTransition(g),
        g
      );
    }
    fadeOutRipple(e) {
      if (e.state === 2 || e.state === 3) return;
      let i = e.element,
        n = x(x({}, j0), e.config.animation);
      (i.style.transitionDuration = `${n.exitDuration}ms`),
        (i.style.opacity = '0'),
        (e.state = 2),
        (e._animationForciblyDisabledThroughCss || !n.exitDuration) &&
          this._finishRippleTransition(e);
    }
    fadeOutAll() {
      this._getActiveRipples().forEach((e) => e.fadeOut());
    }
    fadeOutAllNonPersistent() {
      this._getActiveRipples().forEach((e) => {
        e.config.persistent || e.fadeOut();
      });
    }
    setupTriggerEvents(e) {
      let i = nn(e);
      !this._platform.isBrowser ||
        !i ||
        i === this._triggerElement ||
        (this._removeTriggerEvents(),
        (this._triggerElement = i),
        U0.forEach((n) => {
          Ko._eventManager.addHandler(this._ngZone, n, i, this);
        }));
    }
    handleEvent(e) {
      e.type === 'mousedown'
        ? this._onMousedown(e)
        : e.type === 'touchstart'
        ? this._onTouchStart(e)
        : this._onPointerUp(),
        this._pointerUpEventsRegistered ||
          (this._ngZone.runOutsideAngular(() => {
            H0.forEach((i) => {
              this._triggerElement.addEventListener(i, this, B0);
            });
          }),
          (this._pointerUpEventsRegistered = !0));
    }
    _finishRippleTransition(e) {
      e.state === 0
        ? this._startFadeOutTransition(e)
        : e.state === 2 && this._destroyRipple(e);
    }
    _startFadeOutTransition(e) {
      let i = e === this._mostRecentTransientRipple,
        { persistent: n } = e.config;
      (e.state = 1), !n && (!i || !this._isPointerDown) && e.fadeOut();
    }
    _destroyRipple(e) {
      let i = this._activeRipples.get(e) ?? null;
      this._activeRipples.delete(e),
        this._activeRipples.size || (this._containerRect = null),
        e === this._mostRecentTransientRipple &&
          (this._mostRecentTransientRipple = null),
        (e.state = 3),
        i !== null &&
          (e.element.removeEventListener('transitionend', i.onTransitionEnd),
          e.element.removeEventListener(
            'transitioncancel',
            i.onTransitionCancel
          )),
        e.element.remove();
    }
    _onMousedown(e) {
      let i = Fh(e),
        n =
          this._lastTouchStartEvent &&
          Date.now() < this._lastTouchStartEvent + AR;
      !this._target.rippleDisabled &&
        !i &&
        !n &&
        ((this._isPointerDown = !0),
        this.fadeInRipple(e.clientX, e.clientY, this._target.rippleConfig));
    }
    _onTouchStart(e) {
      if (!this._target.rippleDisabled && !Nh(e)) {
        (this._lastTouchStartEvent = Date.now()), (this._isPointerDown = !0);
        let i = e.changedTouches;
        if (i)
          for (let n = 0; n < i.length; n++)
            this.fadeInRipple(
              i[n].clientX,
              i[n].clientY,
              this._target.rippleConfig
            );
      }
    }
    _onPointerUp() {
      this._isPointerDown &&
        ((this._isPointerDown = !1),
        this._getActiveRipples().forEach((e) => {
          let i =
            e.state === 1 || (e.config.terminateOnPointerUp && e.state === 0);
          !e.config.persistent && i && e.fadeOut();
        }));
    }
    _getActiveRipples() {
      return Array.from(this._activeRipples.keys());
    }
    _removeTriggerEvents() {
      let e = this._triggerElement;
      e &&
        (U0.forEach((i) => Ko._eventManager.removeHandler(i, e, this)),
        this._pointerUpEventsRegistered &&
          H0.forEach((i) => e.removeEventListener(i, this, B0)));
    }
  };
Ko._eventManager = new jh();
var Bh = Ko;
function RR(t, e, i) {
  let n = Math.max(Math.abs(t - i.left), Math.abs(t - i.right)),
    r = Math.max(Math.abs(e - i.top), Math.abs(e - i.bottom));
  return Math.sqrt(n * n + r * r);
}
var ul = new w('mat-ripple-global-options'),
  Ht = (() => {
    let e = class e {
      get disabled() {
        return this._disabled;
      }
      set disabled(n) {
        n && this.fadeOutAllNonPersistent(),
          (this._disabled = n),
          this._setupTriggerEventsIfEnabled();
      }
      get trigger() {
        return this._trigger || this._elementRef.nativeElement;
      }
      set trigger(n) {
        (this._trigger = n), this._setupTriggerEventsIfEnabled();
      }
      constructor(n, r, o, s, a) {
        (this._elementRef = n),
          (this._animationMode = a),
          (this.radius = 0),
          (this._disabled = !1),
          (this._isInitialized = !1),
          (this._globalOptions = s || {}),
          (this._rippleRenderer = new Bh(this, r, n, o));
      }
      ngOnInit() {
        (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
      }
      ngOnDestroy() {
        this._rippleRenderer._removeTriggerEvents();
      }
      fadeOutAll() {
        this._rippleRenderer.fadeOutAll();
      }
      fadeOutAllNonPersistent() {
        this._rippleRenderer.fadeOutAllNonPersistent();
      }
      get rippleConfig() {
        return {
          centered: this.centered,
          radius: this.radius,
          color: this.color,
          animation: x(
            x(
              x({}, this._globalOptions.animation),
              this._animationMode === 'NoopAnimations'
                ? { enterDuration: 0, exitDuration: 0 }
                : {}
            ),
            this.animation
          ),
          terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
        };
      }
      get rippleDisabled() {
        return this.disabled || !!this._globalOptions.disabled;
      }
      _setupTriggerEventsIfEnabled() {
        !this.disabled &&
          this._isInitialized &&
          this._rippleRenderer.setupTriggerEvents(this.trigger);
      }
      launch(n, r = 0, o) {
        return typeof n == 'number'
          ? this._rippleRenderer.fadeInRipple(
              n,
              r,
              x(x({}, this.rippleConfig), o)
            )
          : this._rippleRenderer.fadeInRipple(
              0,
              0,
              x(x({}, this.rippleConfig), n)
            );
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(p(z), p(I), p(Ae), p(ul, 8), p($e, 8));
    }),
      (e.ɵdir = q({
        type: e,
        selectors: [
          ['', 'mat-ripple', ''],
          ['', 'matRipple', ''],
        ],
        hostAttrs: [1, 'mat-ripple'],
        hostVars: 2,
        hostBindings: function (r, o) {
          r & 2 && X('mat-ripple-unbounded', o.unbounded);
        },
        inputs: {
          color: ['matRippleColor', 'color'],
          unbounded: ['matRippleUnbounded', 'unbounded'],
          centered: ['matRippleCentered', 'centered'],
          radius: ['matRippleRadius', 'radius'],
          animation: ['matRippleAnimation', 'animation'],
          disabled: ['matRippleDisabled', 'disabled'],
          trigger: ['matRippleTrigger', 'trigger'],
        },
        exportAs: ['matRipple'],
      }));
    let t = e;
    return t;
  })(),
  Kn = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = V({ type: e })),
      (e.ɵinj = L({ imports: [Ie, Ie] }));
    let t = e;
    return t;
  })();
var $0 = { capture: !0 },
  z0 = ['focus', 'click', 'mouseenter', 'touchstart'],
  Ph = 'mat-ripple-loader-uninitialized',
  Lh = 'mat-ripple-loader-class-name',
  W0 = 'mat-ripple-loader-centered',
  ll = 'mat-ripple-loader-disabled',
  Z0 = (() => {
    let e = class e {
      constructor() {
        (this._document = b(ne, { optional: !0 })),
          (this._animationMode = b($e, { optional: !0 })),
          (this._globalRippleOptions = b(ul, { optional: !0 })),
          (this._platform = b(Ae)),
          (this._ngZone = b(I)),
          (this._hosts = new Map()),
          (this._onInteraction = (n) => {
            if (!(n.target instanceof HTMLElement)) return;
            let o = n.target.closest(`[${Ph}]`);
            o && this._createRipple(o);
          }),
          this._ngZone.runOutsideAngular(() => {
            for (let n of z0)
              this._document?.addEventListener(n, this._onInteraction, $0);
          });
      }
      ngOnDestroy() {
        let n = this._hosts.keys();
        for (let r of n) this.destroyRipple(r);
        for (let r of z0)
          this._document?.removeEventListener(r, this._onInteraction, $0);
      }
      configureRipple(n, r) {
        n.setAttribute(Ph, ''),
          (r.className || !n.hasAttribute(Lh)) &&
            n.setAttribute(Lh, r.className || ''),
          r.centered && n.setAttribute(W0, ''),
          r.disabled && n.setAttribute(ll, '');
      }
      getRipple(n) {
        return this._hosts.get(n) || this._createRipple(n);
      }
      setDisabled(n, r) {
        let o = this._hosts.get(n);
        if (o) {
          o.disabled = r;
          return;
        }
        r ? n.setAttribute(ll, '') : n.removeAttribute(ll);
      }
      _createRipple(n) {
        if (!this._document) return;
        let r = this._hosts.get(n);
        if (r) return r;
        n.querySelector('.mat-ripple')?.remove();
        let o = this._document.createElement('span');
        o.classList.add('mat-ripple', n.getAttribute(Lh)), n.append(o);
        let s = new Ht(
          new z(o),
          this._ngZone,
          this._platform,
          this._globalRippleOptions ? this._globalRippleOptions : void 0,
          this._animationMode ? this._animationMode : void 0
        );
        return (
          (s._isInitialized = !0),
          (s.trigger = n),
          (s.centered = n.hasAttribute(W0)),
          (s.disabled = n.hasAttribute(ll)),
          this.attachRipple(n, s),
          s
        );
      }
      attachRipple(n, r) {
        n.removeAttribute(Ph), this._hosts.set(n, r);
      }
      destroyRipple(n) {
        let r = this._hosts.get(n);
        r && (r.ngOnDestroy(), this._hosts.delete(n));
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })();
var FR = ['mat-button', ''],
  Uh = [
    [
      ['', 8, 'material-icons', 3, 'iconPositionEnd', ''],
      ['mat-icon', 3, 'iconPositionEnd', ''],
      ['', 'matButtonIcon', '', 3, 'iconPositionEnd', ''],
    ],
    '*',
    [
      ['', 'iconPositionEnd', '', 8, 'material-icons'],
      ['mat-icon', 'iconPositionEnd', ''],
      ['', 'matButtonIcon', '', 'iconPositionEnd', ''],
    ],
  ],
  Hh = [
    '.material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])',
    '*',
    '.material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]',
  ],
  NR =
    '.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button{position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;background:rgba(0,0,0,0)}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button[hidden]{display:none}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__progress-indicator{font-size:0;position:absolute;transform:translate(-50%, -50%);top:50%;left:50%;line-height:initial}.mdc-button .mdc-button__label{position:relative}.mdc-button .mdc-button__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px);display:none}@media screen and (forced-colors: active){.mdc-button .mdc-button__focus-ring{border-color:CanvasText}}.mdc-button .mdc-button__focus-ring::after{content:"";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-button .mdc-button__focus-ring::after{border-color:CanvasText}}@media screen and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring{display:block}}.mdc-button .mdc-button__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mdc-button{padding:0 8px 0 8px}.mdc-button--unelevated{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--unelevated.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--unelevated.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--raised.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--raised.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--outlined{border-style:solid;transition:border 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--outlined .mdc-button__ripple{border-style:solid;border-color:rgba(0,0,0,0)}.mat-mdc-button{font-family:var(--mdc-text-button-label-text-font);font-size:var(--mdc-text-button-label-text-size);letter-spacing:var(--mdc-text-button-label-text-tracking);font-weight:var(--mdc-text-button-label-text-weight);text-transform:var(--mdc-text-button-label-text-transform);height:var(--mdc-text-button-container-height);border-radius:var(--mdc-text-button-container-shape);--mdc-text-button-container-shape:4px;--mdc-text-button-container-height:36px;--mdc-text-button-keep-touch-target:false}.mat-mdc-button:not(:disabled){color:var(--mdc-text-button-label-text-color)}.mat-mdc-button:disabled{color:var(--mdc-text-button-disabled-label-text-color)}.mat-mdc-button .mdc-button__ripple{border-radius:var(--mdc-text-button-container-shape)}.mat-mdc-button .mat-ripple-element{background-color:var(--mat-text-button-ripple-color)}.mat-mdc-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-text-button-state-layer-color)}.mat-mdc-button:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-text-button-hover-state-layer-opacity)}.mat-mdc-button.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-button.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-text-button-focus-state-layer-opacity)}.mat-mdc-button:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-text-button-pressed-state-layer-opacity)}.mat-mdc-button[disabled]{cursor:default;pointer-events:none;color:var(--mdc-text-button-disabled-label-text-color)}.mat-mdc-unelevated-button{font-family:var(--mdc-filled-button-label-text-font);font-size:var(--mdc-filled-button-label-text-size);letter-spacing:var(--mdc-filled-button-label-text-tracking);font-weight:var(--mdc-filled-button-label-text-weight);text-transform:var(--mdc-filled-button-label-text-transform);height:var(--mdc-filled-button-container-height);border-radius:var(--mdc-filled-button-container-shape);--mdc-filled-button-container-shape:4px;--mdc-filled-button-container-elevation:0;--mdc-filled-button-disabled-container-elevation:0;--mdc-filled-button-focus-container-elevation:0;--mdc-filled-button-hover-container-elevation:0;--mdc-filled-button-keep-touch-target:false;--mdc-filled-button-pressed-container-elevation:0}.mat-mdc-unelevated-button:not(:disabled){background-color:var(--mdc-filled-button-container-color)}.mat-mdc-unelevated-button:disabled{background-color:var(--mdc-filled-button-disabled-container-color)}.mat-mdc-unelevated-button:not(:disabled){color:var(--mdc-filled-button-label-text-color)}.mat-mdc-unelevated-button:disabled{color:var(--mdc-filled-button-disabled-label-text-color)}.mat-mdc-unelevated-button .mdc-button__ripple{border-radius:var(--mdc-filled-button-container-shape)}.mat-mdc-unelevated-button .mat-ripple-element{background-color:var(--mat-filled-button-ripple-color)}.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-filled-button-state-layer-color)}.mat-mdc-unelevated-button:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-filled-button-hover-state-layer-opacity)}.mat-mdc-unelevated-button.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-filled-button-focus-state-layer-opacity)}.mat-mdc-unelevated-button:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-filled-button-pressed-state-layer-opacity)}.mat-mdc-unelevated-button[disabled]{cursor:default;pointer-events:none;color:var(--mdc-filled-button-disabled-label-text-color);background-color:var(--mdc-filled-button-disabled-container-color)}.mat-mdc-raised-button{font-family:var(--mdc-protected-button-label-text-font);font-size:var(--mdc-protected-button-label-text-size);letter-spacing:var(--mdc-protected-button-label-text-tracking);font-weight:var(--mdc-protected-button-label-text-weight);text-transform:var(--mdc-protected-button-label-text-transform);height:var(--mdc-protected-button-container-height);border-radius:var(--mdc-protected-button-container-shape);--mdc-protected-button-container-shape:4px;--mdc-protected-button-keep-touch-target:false}.mat-mdc-raised-button:not(:disabled){background-color:var(--mdc-protected-button-container-color)}.mat-mdc-raised-button:disabled{background-color:var(--mdc-protected-button-disabled-container-color)}.mat-mdc-raised-button:not(:disabled){color:var(--mdc-protected-button-label-text-color)}.mat-mdc-raised-button:disabled{color:var(--mdc-protected-button-disabled-label-text-color)}.mat-mdc-raised-button .mdc-button__ripple{border-radius:var(--mdc-protected-button-container-shape)}.mat-mdc-raised-button .mat-ripple-element{background-color:var(--mat-protected-button-ripple-color)}.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-protected-button-state-layer-color)}.mat-mdc-raised-button:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-protected-button-hover-state-layer-opacity)}.mat-mdc-raised-button.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-protected-button-focus-state-layer-opacity)}.mat-mdc-raised-button:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-protected-button-pressed-state-layer-opacity)}.mat-mdc-raised-button[disabled]{cursor:default;pointer-events:none;color:var(--mdc-protected-button-disabled-label-text-color);background-color:var(--mdc-protected-button-disabled-container-color)}.mat-mdc-raised-button[disabled][disabled]{box-shadow:none}.mat-mdc-outlined-button{font-family:var(--mdc-outlined-button-label-text-font);font-size:var(--mdc-outlined-button-label-text-size);letter-spacing:var(--mdc-outlined-button-label-text-tracking);font-weight:var(--mdc-outlined-button-label-text-weight);text-transform:var(--mdc-outlined-button-label-text-transform);height:var(--mdc-outlined-button-container-height);border-radius:var(--mdc-outlined-button-container-shape);padding:0 15px 0 15px;border-width:var(--mdc-outlined-button-outline-width);--mdc-outlined-button-keep-touch-target:false;--mdc-outlined-button-outline-width:1px;--mdc-outlined-button-container-shape:4px}.mat-mdc-outlined-button:not(:disabled){color:var(--mdc-outlined-button-label-text-color)}.mat-mdc-outlined-button:disabled{color:var(--mdc-outlined-button-disabled-label-text-color)}.mat-mdc-outlined-button .mdc-button__ripple{border-radius:var(--mdc-outlined-button-container-shape)}.mat-mdc-outlined-button:not(:disabled){border-color:var(--mdc-outlined-button-outline-color)}.mat-mdc-outlined-button:disabled{border-color:var(--mdc-outlined-button-disabled-outline-color)}.mat-mdc-outlined-button.mdc-button--icon-trailing{padding:0 11px 0 15px}.mat-mdc-outlined-button.mdc-button--icon-leading{padding:0 15px 0 11px}.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border-width:var(--mdc-outlined-button-outline-width)}.mat-mdc-outlined-button .mdc-button__touch{left:calc(-1 * var(--mdc-outlined-button-outline-width));width:calc(100% + 2 * var(--mdc-outlined-button-outline-width))}.mat-mdc-outlined-button .mat-ripple-element{background-color:var(--mat-outlined-button-ripple-color)}.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-outlined-button-state-layer-color)}.mat-mdc-outlined-button:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-outlined-button-hover-state-layer-opacity)}.mat-mdc-outlined-button.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-outlined-button-focus-state-layer-opacity)}.mat-mdc-outlined-button:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-outlined-button-pressed-state-layer-opacity)}.mat-mdc-outlined-button[disabled]{cursor:default;pointer-events:none;color:var(--mdc-outlined-button-disabled-label-text-color);border-color:var(--mdc-outlined-button-disabled-outline-color)}.mat-mdc-button-base{text-decoration:none}.mat-mdc-button,.mat-mdc-unelevated-button,.mat-mdc-raised-button,.mat-mdc-outlined-button{-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-button .mdc-button__label,.mat-mdc-unelevated-button .mdc-button__label,.mat-mdc-raised-button .mdc-button__label,.mat-mdc-outlined-button .mdc-button__label{z-index:1}.mat-mdc-button .mat-mdc-focus-indicator,.mat-mdc-unelevated-button .mat-mdc-focus-indicator,.mat-mdc-raised-button .mat-mdc-focus-indicator,.mat-mdc-outlined-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-unelevated-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-raised-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-outlined-button:focus .mat-mdc-focus-indicator::before{content:""}.mat-mdc-button .mat-mdc-button-touch-target,.mat-mdc-unelevated-button .mat-mdc-button-touch-target,.mat-mdc-raised-button .mat-mdc-button-touch-target,.mat-mdc-outlined-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mat-mdc-button._mat-animation-noopable,.mat-mdc-unelevated-button._mat-animation-noopable,.mat-mdc-raised-button._mat-animation-noopable,.mat-mdc-outlined-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-button>.mat-icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem}[dir=rtl] .mat-mdc-button>.mat-icon,.mat-mdc-button>.mat-icon[dir=rtl]{margin-left:8px;margin-right:0}.mat-mdc-button .mdc-button__label+.mat-icon{margin-left:8px;margin-right:0}[dir=rtl] .mat-mdc-button .mdc-button__label+.mat-icon,.mat-mdc-button .mdc-button__label+.mat-icon[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-unelevated-button>.mat-icon,.mat-mdc-raised-button>.mat-icon,.mat-mdc-outlined-button>.mat-icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem;margin-left:-4px;margin-right:8px}[dir=rtl] .mat-mdc-unelevated-button>.mat-icon,[dir=rtl] .mat-mdc-raised-button>.mat-icon,[dir=rtl] .mat-mdc-outlined-button>.mat-icon,.mat-mdc-unelevated-button>.mat-icon[dir=rtl],.mat-mdc-raised-button>.mat-icon[dir=rtl],.mat-mdc-outlined-button>.mat-icon[dir=rtl]{margin-left:8px;margin-right:0}[dir=rtl] .mat-mdc-unelevated-button>.mat-icon,[dir=rtl] .mat-mdc-raised-button>.mat-icon,[dir=rtl] .mat-mdc-outlined-button>.mat-icon,.mat-mdc-unelevated-button>.mat-icon[dir=rtl],.mat-mdc-raised-button>.mat-icon[dir=rtl],.mat-mdc-outlined-button>.mat-icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mat-mdc-unelevated-button .mdc-button__label+.mat-icon,.mat-mdc-raised-button .mdc-button__label+.mat-icon,.mat-mdc-outlined-button .mdc-button__label+.mat-icon{margin-left:8px;margin-right:-4px}[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-raised-button .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-outlined-button .mdc-button__label+.mat-icon,.mat-mdc-unelevated-button .mdc-button__label+.mat-icon[dir=rtl],.mat-mdc-raised-button .mdc-button__label+.mat-icon[dir=rtl],.mat-mdc-outlined-button .mdc-button__label+.mat-icon[dir=rtl]{margin-left:-4px;margin-right:8px}.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border-width:-1px}.mat-mdc-unelevated-button .mat-mdc-focus-indicator::before,.mat-mdc-raised-button .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px)*-1)}.mat-mdc-outlined-button .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 3px)*-1)}',
  OR =
    '.cdk-high-contrast-active .mat-mdc-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-unelevated-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-raised-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-outlined-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-icon-button{outline:solid 1px}',
  Y0 = ['mat-fab', ''];
var PR =
  '.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:var(--mdc-elevation-overlay-color)}.mdc-fab{position:relative;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;user-select:none;-moz-appearance:none;-webkit-appearance:none;overflow:visible;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-fab .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-fab[hidden]{display:none}.mdc-fab::-moz-focus-inner{padding:0;border:0}.mdc-fab:hover{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mdc-fab.mdc-ripple-upgraded--background-focused,.mdc-fab:not(.mdc-ripple-upgraded):focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mdc-fab .mdc-fab__focus-ring{position:absolute}.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring{border-color:CanvasText}}.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring::after,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring::after{content:"";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring::after,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring::after{border-color:CanvasText}}.mdc-fab:active,.mdc-fab:focus:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)}.mdc-fab:active,.mdc-fab:focus{outline:none}.mdc-fab:hover{cursor:pointer}.mdc-fab>svg{width:100%}.mdc-fab--mini{width:40px;height:40px}.mdc-fab--extended{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-button-font-family);font-size:var(--mdc-typography-button-font-size);line-height:var(--mdc-typography-button-line-height);font-weight:var(--mdc-typography-button-font-weight);letter-spacing:var(--mdc-typography-button-letter-spacing);text-decoration:var(--mdc-typography-button-text-decoration);text-transform:var(--mdc-typography-button-text-transform);border-radius:24px;padding-left:20px;padding-right:20px;width:auto;max-width:100%;height:48px;line-height:normal}.mdc-fab--extended .mdc-fab__ripple{border-radius:24px}.mdc-fab--extended .mdc-fab__icon{margin-left:calc(12px - 20px);margin-right:12px}[dir=rtl] .mdc-fab--extended .mdc-fab__icon,.mdc-fab--extended .mdc-fab__icon[dir=rtl]{margin-left:12px;margin-right:calc(12px - 20px)}.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon{margin-left:12px;margin-right:calc(12px - 20px)}[dir=rtl] .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon,.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon[dir=rtl]{margin-left:calc(12px - 20px);margin-right:12px}.mdc-fab--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-fab--touch .mdc-fab__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-fab::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-fab::before{border-color:CanvasText}}.mdc-fab__label{justify-content:flex-start;text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden;overflow-y:visible}.mdc-fab__icon{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mdc-fab .mdc-fab__icon{display:inline-flex;align-items:center;justify-content:center}.mdc-fab--exited{transform:scale(0);opacity:0;transition:opacity 15ms linear 150ms,transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-fab--exited .mdc-fab__icon{transform:scale(0);transition:transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mat-mdc-fab,.mat-mdc-mini-fab{background-color:var(--mdc-fab-container-color)}.mat-mdc-fab .mdc-fab__icon,.mat-mdc-mini-fab .mdc-fab__icon{width:var(--mdc-fab-icon-size);height:var(--mdc-fab-icon-size);font-size:var(--mdc-fab-icon-size)}.mat-mdc-fab:not(.mdc-fab--extended),.mat-mdc-mini-fab:not(.mdc-fab--extended){border-radius:var(--mdc-fab-container-shape)}.mat-mdc-fab:not(.mdc-fab--extended) .mdc-fab__ripple,.mat-mdc-mini-fab:not(.mdc-fab--extended) .mdc-fab__ripple{border-radius:var(--mdc-fab-container-shape)}.mat-mdc-extended-fab{font-family:var(--mdc-extended-fab-label-text-font);font-size:var(--mdc-extended-fab-label-text-size);font-weight:var(--mdc-extended-fab-label-text-weight);letter-spacing:var(--mdc-extended-fab-label-text-tracking)}.mat-mdc-fab,.mat-mdc-mini-fab{-webkit-tap-highlight-color:rgba(0,0,0,0);box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);flex-shrink:0;color:var(--mat-fab-foreground-color, inherit)}.mat-mdc-fab .mat-mdc-button-ripple,.mat-mdc-fab .mat-mdc-button-persistent-ripple,.mat-mdc-fab .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab .mat-mdc-button-ripple,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-fab .mat-mdc-button-ripple,.mat-mdc-mini-fab .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-fab .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-fab .mdc-button__label,.mat-mdc-mini-fab .mdc-button__label{z-index:1}.mat-mdc-fab .mat-mdc-focus-indicator,.mat-mdc-mini-fab .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-fab:focus .mat-mdc-focus-indicator::before,.mat-mdc-mini-fab:focus .mat-mdc-focus-indicator::before{content:""}.mat-mdc-fab .mat-mdc-button-touch-target,.mat-mdc-mini-fab .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mat-mdc-fab .mat-ripple-element,.mat-mdc-mini-fab .mat-ripple-element{background-color:var(--mat-fab-ripple-color)}.mat-mdc-fab .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-state-layer-color)}.mat-mdc-fab:hover .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-hover-state-layer-opacity)}.mat-mdc-fab.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-fab.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-focus-state-layer-opacity)}.mat-mdc-fab:active .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-pressed-state-layer-opacity)}.mat-mdc-fab._mat-animation-noopable,.mat-mdc-mini-fab._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-fab:hover,.mat-mdc-fab:focus,.mat-mdc-mini-fab:hover,.mat-mdc-mini-fab:focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mat-mdc-fab:active,.mat-mdc-fab:focus:active,.mat-mdc-mini-fab:active,.mat-mdc-mini-fab:focus:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)}.mat-mdc-fab[disabled],.mat-mdc-mini-fab[disabled]{cursor:default;pointer-events:none;box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);color:var(--mat-fab-disabled-state-foreground-color);background-color:var(--mat-fab-disabled-state-container-color)}.mat-mdc-fab:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-mini-fab:not(.mdc-ripple-upgraded):focus::before{background:rgba(0,0,0,0);opacity:1}.mat-mdc-fab .mat-icon,.mat-mdc-fab .material-icons,.mat-mdc-mini-fab .mat-icon,.mat-mdc-mini-fab .material-icons{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mat-mdc-fab .mat-mdc-focus-indicator::before,.mat-mdc-mini-fab .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px)*-1)}.mat-mdc-extended-fab>.mat-icon,.mat-mdc-extended-fab>.material-icons{margin-left:calc(12px - 20px);margin-right:12px}[dir=rtl] .mat-mdc-extended-fab>.mat-icon,[dir=rtl] .mat-mdc-extended-fab>.material-icons,.mat-mdc-extended-fab>.mat-icon[dir=rtl],.mat-mdc-extended-fab>.material-icons[dir=rtl]{margin-left:12px;margin-right:calc(12px - 20px)}.mat-mdc-extended-fab .mdc-button__label+.mat-icon,.mat-mdc-extended-fab .mdc-button__label+.material-icons{margin-left:12px;margin-right:calc(12px - 20px)}[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.material-icons,.mat-mdc-extended-fab .mdc-button__label+.mat-icon[dir=rtl],.mat-mdc-extended-fab .mdc-button__label+.material-icons[dir=rtl]{margin-left:calc(12px - 20px);margin-right:12px}.mat-mdc-extended-fab .mat-mdc-button-touch-target{width:100%}';
var LR = [
    { attribute: 'mat-button', mdcClasses: ['mdc-button', 'mat-mdc-button'] },
    {
      attribute: 'mat-flat-button',
      mdcClasses: [
        'mdc-button',
        'mdc-button--unelevated',
        'mat-mdc-unelevated-button',
      ],
    },
    {
      attribute: 'mat-raised-button',
      mdcClasses: ['mdc-button', 'mdc-button--raised', 'mat-mdc-raised-button'],
    },
    {
      attribute: 'mat-stroked-button',
      mdcClasses: [
        'mdc-button',
        'mdc-button--outlined',
        'mat-mdc-outlined-button',
      ],
    },
    { attribute: 'mat-fab', mdcClasses: ['mdc-fab', 'mat-mdc-fab'] },
    {
      attribute: 'mat-mini-fab',
      mdcClasses: ['mdc-fab', 'mdc-fab--mini', 'mat-mdc-mini-fab'],
    },
    {
      attribute: 'mat-icon-button',
      mdcClasses: ['mdc-icon-button', 'mat-mdc-icon-button'],
    },
  ],
  X0 = (() => {
    let e = class e {
      get ripple() {
        return this._rippleLoader?.getRipple(this._elementRef.nativeElement);
      }
      set ripple(n) {
        this._rippleLoader?.attachRipple(this._elementRef.nativeElement, n);
      }
      get disableRipple() {
        return this._disableRipple;
      }
      set disableRipple(n) {
        (this._disableRipple = n), this._updateRippleDisabled();
      }
      get disabled() {
        return this._disabled;
      }
      set disabled(n) {
        (this._disabled = n), this._updateRippleDisabled();
      }
      constructor(n, r, o, s) {
        (this._elementRef = n),
          (this._platform = r),
          (this._ngZone = o),
          (this._animationMode = s),
          (this._focusMonitor = b(al)),
          (this._rippleLoader = b(Z0)),
          (this._isFab = !1),
          (this._disableRipple = !1),
          (this._disabled = !1),
          this._rippleLoader?.configureRipple(this._elementRef.nativeElement, {
            className: 'mat-mdc-button-ripple',
          });
        let a = this._elementRef.nativeElement,
          c = a.classList;
        for (let { attribute: l, mdcClasses: d } of LR)
          a.hasAttribute(l) && c.add(...d);
      }
      ngAfterViewInit() {
        this._focusMonitor.monitor(this._elementRef, !0);
      }
      ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef),
          this._rippleLoader?.destroyRipple(this._elementRef.nativeElement);
      }
      focus(n = 'program', r) {
        n
          ? this._focusMonitor.focusVia(this._elementRef.nativeElement, n, r)
          : this._elementRef.nativeElement.focus(r);
      }
      _updateRippleDisabled() {
        this._rippleLoader?.setDisabled(
          this._elementRef.nativeElement,
          this.disableRipple || this.disabled
        );
      }
    };
    (e.ɵfac = function (r) {
      Eo();
    }),
      (e.ɵdir = q({
        type: e,
        inputs: {
          color: 'color',
          disableRipple: ['disableRipple', 'disableRipple', Me],
          disabled: ['disabled', 'disabled', Me],
        },
        features: [Ke],
      }));
    let t = e;
    return t;
  })();
var VR = (() => {
  let e = class e extends X0 {
    constructor(n, r, o, s) {
      super(n, r, o, s),
        (this._haltDisabledEvents = (a) => {
          this.disabled && (a.preventDefault(), a.stopImmediatePropagation());
        });
    }
    ngOnInit() {
      this._ngZone.runOutsideAngular(() => {
        this._elementRef.nativeElement.addEventListener(
          'click',
          this._haltDisabledEvents
        );
      });
    }
    ngOnDestroy() {
      super.ngOnDestroy(),
        this._elementRef.nativeElement.removeEventListener(
          'click',
          this._haltDisabledEvents
        );
    }
  };
  (e.ɵfac = function (r) {
    Eo();
  }),
    (e.ɵdir = q({
      type: e,
      inputs: {
        tabIndex: ['tabIndex', 'tabIndex', (n) => (n == null ? void 0 : So(n))],
      },
      features: [Ke, Re],
    }));
  let t = e;
  return t;
})();
var jR = (() => {
    let e = class e extends VR {
      constructor(n, r, o, s) {
        super(n, r, o, s);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(p(z), p(Ae), p(I), p($e, 8));
    }),
      (e.ɵcmp = De({
        type: e,
        selectors: [
          ['a', 'mat-button', ''],
          ['a', 'mat-raised-button', ''],
          ['a', 'mat-flat-button', ''],
          ['a', 'mat-stroked-button', ''],
        ],
        hostVars: 11,
        hostBindings: function (r, o) {
          r & 2 &&
            (pe('disabled', o.disabled || null)(
              'tabindex',
              o.disabled ? -1 : o.tabIndex
            )('aria-disabled', o.disabled.toString()),
            Kt(o.color ? 'mat-' + o.color : ''),
            X('_mat-animation-noopable', o._animationMode === 'NoopAnimations')(
              'mat-unthemed',
              !o.color
            )('mat-mdc-button-base', !0));
        },
        exportAs: ['matButton', 'matAnchor'],
        features: [Re],
        attrs: FR,
        ngContentSelectors: Hh,
        decls: 7,
        vars: 4,
        consts: [
          [1, 'mat-mdc-button-persistent-ripple'],
          [1, 'mdc-button__label'],
          [1, 'mat-mdc-focus-indicator'],
          [1, 'mat-mdc-button-touch-target'],
        ],
        template: function (r, o) {
          r & 1 &&
            (Je(Uh),
            j(0, 'span', 0),
            oe(1),
            S(2, 'span', 1),
            oe(3, 1),
            k(),
            oe(4, 2),
            j(5, 'span', 2)(6, 'span', 3)),
            r & 2 &&
              X('mdc-button__ripple', !o._isFab)('mdc-fab__ripple', o._isFab);
        },
        styles: [NR, OR],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })(),
  K0 = new w('mat-mdc-fab-default-options', {
    providedIn: 'root',
    factory: J0,
  });
function J0() {
  return { color: 'accent' };
}
var hl = J0(),
  ex = (() => {
    let e = class e extends X0 {
      constructor(n, r, o, s, a) {
        super(n, r, o, s),
          (this._options = a),
          (this._isFab = !0),
          (this._options = this._options || hl),
          (this.color = this._options.color || hl.color);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(p(z), p(Ae), p(I), p($e, 8), p(K0, 8));
    }),
      (e.ɵcmp = De({
        type: e,
        selectors: [['button', 'mat-fab', '']],
        hostVars: 13,
        hostBindings: function (r, o) {
          r & 2 &&
            (pe('disabled', o.disabled || null),
            Kt(o.color ? 'mat-' + o.color : ''),
            X('_mat-animation-noopable', o._animationMode === 'NoopAnimations')(
              'mat-unthemed',
              !o.color
            )('mat-mdc-button-base', !0)('mdc-fab--extended', o.extended)(
              'mat-mdc-extended-fab',
              o.extended
            ));
        },
        inputs: { extended: ['extended', 'extended', Me] },
        exportAs: ['matButton'],
        features: [Ke, Re],
        attrs: Y0,
        ngContentSelectors: Hh,
        decls: 7,
        vars: 4,
        consts: [
          [1, 'mat-mdc-button-persistent-ripple'],
          [1, 'mdc-button__label'],
          [1, 'mat-mdc-focus-indicator'],
          [1, 'mat-mdc-button-touch-target'],
        ],
        template: function (r, o) {
          r & 1 &&
            (Je(Uh),
            j(0, 'span', 0),
            oe(1),
            S(2, 'span', 1),
            oe(3, 1),
            k(),
            oe(4, 2),
            j(5, 'span', 2)(6, 'span', 3)),
            r & 2 &&
              X('mdc-button__ripple', !o._isFab)('mdc-fab__ripple', o._isFab);
        },
        styles: [
          '.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:var(--mdc-elevation-overlay-color)}.mdc-fab{position:relative;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;user-select:none;-moz-appearance:none;-webkit-appearance:none;overflow:visible;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-fab .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-fab[hidden]{display:none}.mdc-fab::-moz-focus-inner{padding:0;border:0}.mdc-fab:hover{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mdc-fab.mdc-ripple-upgraded--background-focused,.mdc-fab:not(.mdc-ripple-upgraded):focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mdc-fab .mdc-fab__focus-ring{position:absolute}.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring{border-color:CanvasText}}.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring::after,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring::after{content:"";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring::after,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring::after{border-color:CanvasText}}.mdc-fab:active,.mdc-fab:focus:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)}.mdc-fab:active,.mdc-fab:focus{outline:none}.mdc-fab:hover{cursor:pointer}.mdc-fab>svg{width:100%}.mdc-fab--mini{width:40px;height:40px}.mdc-fab--extended{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-button-font-family);font-size:var(--mdc-typography-button-font-size);line-height:var(--mdc-typography-button-line-height);font-weight:var(--mdc-typography-button-font-weight);letter-spacing:var(--mdc-typography-button-letter-spacing);text-decoration:var(--mdc-typography-button-text-decoration);text-transform:var(--mdc-typography-button-text-transform);border-radius:24px;padding-left:20px;padding-right:20px;width:auto;max-width:100%;height:48px;line-height:normal}.mdc-fab--extended .mdc-fab__ripple{border-radius:24px}.mdc-fab--extended .mdc-fab__icon{margin-left:calc(12px - 20px);margin-right:12px}[dir=rtl] .mdc-fab--extended .mdc-fab__icon,.mdc-fab--extended .mdc-fab__icon[dir=rtl]{margin-left:12px;margin-right:calc(12px - 20px)}.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon{margin-left:12px;margin-right:calc(12px - 20px)}[dir=rtl] .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon,.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon[dir=rtl]{margin-left:calc(12px - 20px);margin-right:12px}.mdc-fab--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-fab--touch .mdc-fab__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-fab::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-fab::before{border-color:CanvasText}}.mdc-fab__label{justify-content:flex-start;text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden;overflow-y:visible}.mdc-fab__icon{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mdc-fab .mdc-fab__icon{display:inline-flex;align-items:center;justify-content:center}.mdc-fab--exited{transform:scale(0);opacity:0;transition:opacity 15ms linear 150ms,transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-fab--exited .mdc-fab__icon{transform:scale(0);transition:transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mat-mdc-fab,.mat-mdc-mini-fab{background-color:var(--mdc-fab-container-color)}.mat-mdc-fab .mdc-fab__icon,.mat-mdc-mini-fab .mdc-fab__icon{width:var(--mdc-fab-icon-size);height:var(--mdc-fab-icon-size);font-size:var(--mdc-fab-icon-size)}.mat-mdc-fab:not(.mdc-fab--extended),.mat-mdc-mini-fab:not(.mdc-fab--extended){border-radius:var(--mdc-fab-container-shape)}.mat-mdc-fab:not(.mdc-fab--extended) .mdc-fab__ripple,.mat-mdc-mini-fab:not(.mdc-fab--extended) .mdc-fab__ripple{border-radius:var(--mdc-fab-container-shape)}.mat-mdc-extended-fab{font-family:var(--mdc-extended-fab-label-text-font);font-size:var(--mdc-extended-fab-label-text-size);font-weight:var(--mdc-extended-fab-label-text-weight);letter-spacing:var(--mdc-extended-fab-label-text-tracking)}.mat-mdc-fab,.mat-mdc-mini-fab{-webkit-tap-highlight-color:rgba(0,0,0,0);box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);flex-shrink:0;color:var(--mat-fab-foreground-color, inherit)}.mat-mdc-fab .mat-mdc-button-ripple,.mat-mdc-fab .mat-mdc-button-persistent-ripple,.mat-mdc-fab .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab .mat-mdc-button-ripple,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-fab .mat-mdc-button-ripple,.mat-mdc-mini-fab .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-fab .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-fab .mdc-button__label,.mat-mdc-mini-fab .mdc-button__label{z-index:1}.mat-mdc-fab .mat-mdc-focus-indicator,.mat-mdc-mini-fab .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-fab:focus .mat-mdc-focus-indicator::before,.mat-mdc-mini-fab:focus .mat-mdc-focus-indicator::before{content:""}.mat-mdc-fab .mat-mdc-button-touch-target,.mat-mdc-mini-fab .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mat-mdc-fab .mat-ripple-element,.mat-mdc-mini-fab .mat-ripple-element{background-color:var(--mat-fab-ripple-color)}.mat-mdc-fab .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-state-layer-color)}.mat-mdc-fab:hover .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-hover-state-layer-opacity)}.mat-mdc-fab.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-fab.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-focus-state-layer-opacity)}.mat-mdc-fab:active .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-pressed-state-layer-opacity)}.mat-mdc-fab._mat-animation-noopable,.mat-mdc-mini-fab._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-fab:hover,.mat-mdc-fab:focus,.mat-mdc-mini-fab:hover,.mat-mdc-mini-fab:focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mat-mdc-fab:active,.mat-mdc-fab:focus:active,.mat-mdc-mini-fab:active,.mat-mdc-mini-fab:focus:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)}.mat-mdc-fab[disabled],.mat-mdc-mini-fab[disabled]{cursor:default;pointer-events:none;box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);color:var(--mat-fab-disabled-state-foreground-color);background-color:var(--mat-fab-disabled-state-container-color)}.mat-mdc-fab:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-mini-fab:not(.mdc-ripple-upgraded):focus::before{background:rgba(0,0,0,0);opacity:1}.mat-mdc-fab .mat-icon,.mat-mdc-fab .material-icons,.mat-mdc-mini-fab .mat-icon,.mat-mdc-mini-fab .material-icons{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mat-mdc-fab .mat-mdc-focus-indicator::before,.mat-mdc-mini-fab .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px)*-1)}.mat-mdc-extended-fab>.mat-icon,.mat-mdc-extended-fab>.material-icons{margin-left:calc(12px - 20px);margin-right:12px}[dir=rtl] .mat-mdc-extended-fab>.mat-icon,[dir=rtl] .mat-mdc-extended-fab>.material-icons,.mat-mdc-extended-fab>.mat-icon[dir=rtl],.mat-mdc-extended-fab>.material-icons[dir=rtl]{margin-left:12px;margin-right:calc(12px - 20px)}.mat-mdc-extended-fab .mdc-button__label+.mat-icon,.mat-mdc-extended-fab .mdc-button__label+.material-icons{margin-left:12px;margin-right:calc(12px - 20px)}[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.material-icons,.mat-mdc-extended-fab .mdc-button__label+.mat-icon[dir=rtl],.mat-mdc-extended-fab .mdc-button__label+.material-icons[dir=rtl]{margin-left:calc(12px - 20px);margin-right:12px}.mat-mdc-extended-fab .mat-mdc-button-touch-target{width:100%}',
        ],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })();
var tx = (() => {
  let e = class e extends jR {
    constructor(n, r, o, s, a) {
      super(n, r, o, s),
        (this._options = a),
        (this._isFab = !0),
        (this._options = this._options || hl),
        (this.color = this._options.color || hl.color);
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(p(z), p(Ae), p(I), p($e, 8), p(K0, 8));
  }),
    (e.ɵcmp = De({
      type: e,
      selectors: [['a', 'mat-fab', '']],
      hostVars: 15,
      hostBindings: function (r, o) {
        r & 2 &&
          (pe('disabled', o.disabled || null)(
            'tabindex',
            o.disabled ? -1 : o.tabIndex
          )('aria-disabled', o.disabled.toString()),
          Kt(o.color ? 'mat-' + o.color : ''),
          X('_mat-animation-noopable', o._animationMode === 'NoopAnimations')(
            'mat-unthemed',
            !o.color
          )('mat-mdc-button-base', !0)('mdc-fab--extended', o.extended)(
            'mat-mdc-extended-fab',
            o.extended
          ));
      },
      inputs: { extended: ['extended', 'extended', Me] },
      exportAs: ['matButton', 'matAnchor'],
      features: [Ke, Re],
      attrs: Y0,
      ngContentSelectors: Hh,
      decls: 7,
      vars: 4,
      consts: [
        [1, 'mat-mdc-button-persistent-ripple'],
        [1, 'mdc-button__label'],
        [1, 'mat-mdc-focus-indicator'],
        [1, 'mat-mdc-button-touch-target'],
      ],
      template: function (r, o) {
        r & 1 &&
          (Je(Uh),
          j(0, 'span', 0),
          oe(1),
          S(2, 'span', 1),
          oe(3, 1),
          k(),
          oe(4, 2),
          j(5, 'span', 2)(6, 'span', 3)),
          r & 2 &&
            X('mdc-button__ripple', !o._isFab)('mdc-fab__ripple', o._isFab);
      },
      styles: [PR],
      encapsulation: 2,
      changeDetection: 0,
    }));
  let t = e;
  return t;
})();
var nx = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = V({ type: e })),
    (e.ɵinj = L({ imports: [Ie, Kn, Ie] }));
  let t = e;
  return t;
})();
var ml = class {
  get selected() {
    return (
      this._selected || (this._selected = Array.from(this._selection.values())),
      this._selected
    );
  }
  constructor(e = !1, i, n = !0, r) {
    (this._multiple = e),
      (this._emitChanges = n),
      (this.compareWith = r),
      (this._selection = new Set()),
      (this._deselectedToEmit = []),
      (this._selectedToEmit = []),
      (this.changed = new Z()),
      i &&
        i.length &&
        (e ? i.forEach((o) => this._markSelected(o)) : this._markSelected(i[0]),
        (this._selectedToEmit.length = 0));
  }
  select(...e) {
    this._verifyValueAssignment(e), e.forEach((n) => this._markSelected(n));
    let i = this._hasQueuedChanges();
    return this._emitChangeEvent(), i;
  }
  deselect(...e) {
    this._verifyValueAssignment(e), e.forEach((n) => this._unmarkSelected(n));
    let i = this._hasQueuedChanges();
    return this._emitChangeEvent(), i;
  }
  setSelection(...e) {
    this._verifyValueAssignment(e);
    let i = this.selected,
      n = new Set(e);
    e.forEach((o) => this._markSelected(o)),
      i.filter((o) => !n.has(o)).forEach((o) => this._unmarkSelected(o));
    let r = this._hasQueuedChanges();
    return this._emitChangeEvent(), r;
  }
  toggle(e) {
    return this.isSelected(e) ? this.deselect(e) : this.select(e);
  }
  clear(e = !0) {
    this._unmarkAll();
    let i = this._hasQueuedChanges();
    return e && this._emitChangeEvent(), i;
  }
  isSelected(e) {
    return this._selection.has(this._getConcreteValue(e));
  }
  isEmpty() {
    return this._selection.size === 0;
  }
  hasValue() {
    return !this.isEmpty();
  }
  sort(e) {
    this._multiple && this.selected && this._selected.sort(e);
  }
  isMultipleSelection() {
    return this._multiple;
  }
  _emitChangeEvent() {
    (this._selected = null),
      (this._selectedToEmit.length || this._deselectedToEmit.length) &&
        (this.changed.next({
          source: this,
          added: this._selectedToEmit,
          removed: this._deselectedToEmit,
        }),
        (this._deselectedToEmit = []),
        (this._selectedToEmit = []));
  }
  _markSelected(e) {
    (e = this._getConcreteValue(e)),
      this.isSelected(e) ||
        (this._multiple || this._unmarkAll(),
        this.isSelected(e) || this._selection.add(e),
        this._emitChanges && this._selectedToEmit.push(e));
  }
  _unmarkSelected(e) {
    (e = this._getConcreteValue(e)),
      this.isSelected(e) &&
        (this._selection.delete(e),
        this._emitChanges && this._deselectedToEmit.push(e));
  }
  _unmarkAll() {
    this.isEmpty() || this._selection.forEach((e) => this._unmarkSelected(e));
  }
  _verifyValueAssignment(e) {
    e.length > 1 && this._multiple;
  }
  _hasQueuedChanges() {
    return !!(this._deselectedToEmit.length || this._selectedToEmit.length);
  }
  _getConcreteValue(e) {
    if (this.compareWith) {
      for (let i of this._selection) if (this.compareWith(e, i)) return i;
      return e;
    } else return e;
  }
};
var UR = ['button'],
  HR = ['*'],
  ix = new w('MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS'),
  rx = new w('MatButtonToggleGroup'),
  $R = { provide: xn, useExisting: ut(() => $h), multi: !0 },
  ox = 0,
  pl = class {
    constructor(e, i) {
      (this.source = e), (this.value = i);
    }
  },
  $h = (() => {
    let e = class e {
      get name() {
        return this._name;
      }
      set name(n) {
        (this._name = n), this._markButtonsForCheck();
      }
      get value() {
        let n = this._selectionModel ? this._selectionModel.selected : [];
        return this.multiple
          ? n.map((r) => r.value)
          : n[0]
          ? n[0].value
          : void 0;
      }
      set value(n) {
        this._setSelectionByValue(n), this.valueChange.emit(this.value);
      }
      get selected() {
        let n = this._selectionModel ? this._selectionModel.selected : [];
        return this.multiple ? n : n[0] || null;
      }
      get multiple() {
        return this._multiple;
      }
      set multiple(n) {
        (this._multiple = n), this._markButtonsForCheck();
      }
      get disabled() {
        return this._disabled;
      }
      set disabled(n) {
        (this._disabled = n), this._markButtonsForCheck();
      }
      constructor(n, r) {
        (this._changeDetector = n),
          (this._multiple = !1),
          (this._disabled = !1),
          (this._controlValueAccessorChangeFn = () => {}),
          (this._onTouched = () => {}),
          (this._name = `mat-button-toggle-group-${ox++}`),
          (this.valueChange = new Y()),
          (this.change = new Y()),
          (this.appearance = r && r.appearance ? r.appearance : 'standard');
      }
      ngOnInit() {
        this._selectionModel = new ml(this.multiple, void 0, !1);
      }
      ngAfterContentInit() {
        this._selectionModel.select(
          ...this._buttonToggles.filter((n) => n.checked)
        );
      }
      writeValue(n) {
        (this.value = n), this._changeDetector.markForCheck();
      }
      registerOnChange(n) {
        this._controlValueAccessorChangeFn = n;
      }
      registerOnTouched(n) {
        this._onTouched = n;
      }
      setDisabledState(n) {
        this.disabled = n;
      }
      _emitChangeEvent(n) {
        let r = new pl(n, this.value);
        (this._rawValue = r.value),
          this._controlValueAccessorChangeFn(r.value),
          this.change.emit(r);
      }
      _syncButtonToggle(n, r, o = !1, s = !1) {
        !this.multiple &&
          this.selected &&
          !n.checked &&
          (this.selected.checked = !1),
          this._selectionModel
            ? r
              ? this._selectionModel.select(n)
              : this._selectionModel.deselect(n)
            : (s = !0),
          s
            ? Promise.resolve().then(() => this._updateModelValue(n, o))
            : this._updateModelValue(n, o);
      }
      _isSelected(n) {
        return this._selectionModel && this._selectionModel.isSelected(n);
      }
      _isPrechecked(n) {
        return typeof this._rawValue > 'u'
          ? !1
          : this.multiple && Array.isArray(this._rawValue)
          ? this._rawValue.some((r) => n.value != null && r === n.value)
          : n.value === this._rawValue;
      }
      _setSelectionByValue(n) {
        (this._rawValue = n),
          this._buttonToggles &&
            (this.multiple && n
              ? (Array.isArray(n),
                this._clearSelection(),
                n.forEach((r) => this._selectValue(r)))
              : (this._clearSelection(), this._selectValue(n)));
      }
      _clearSelection() {
        this._selectionModel.clear(),
          this._buttonToggles.forEach((n) => (n.checked = !1));
      }
      _selectValue(n) {
        let r = this._buttonToggles.find(
          (o) => o.value != null && o.value === n
        );
        r && ((r.checked = !0), this._selectionModel.select(r));
      }
      _updateModelValue(n, r) {
        r && this._emitChangeEvent(n), this.valueChange.emit(this.value);
      }
      _markButtonsForCheck() {
        this._buttonToggles?.forEach((n) => n._markForCheck());
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(p(ze), p(ix, 8));
    }),
      (e.ɵdir = q({
        type: e,
        selectors: [['mat-button-toggle-group']],
        contentQueries: function (r, o, s) {
          if ((r & 1 && mt(s, zh, 5), r & 2)) {
            let a;
            J((a = ee())) && (o._buttonToggles = a);
          }
        },
        hostAttrs: ['role', 'group', 1, 'mat-button-toggle-group'],
        hostVars: 5,
        hostBindings: function (r, o) {
          r & 2 &&
            (pe('aria-disabled', o.disabled),
            X('mat-button-toggle-vertical', o.vertical)(
              'mat-button-toggle-group-appearance-standard',
              o.appearance === 'standard'
            ));
        },
        inputs: {
          appearance: 'appearance',
          name: 'name',
          vertical: ['vertical', 'vertical', Me],
          value: 'value',
          multiple: ['multiple', 'multiple', Me],
          disabled: ['disabled', 'disabled', Me],
        },
        outputs: { valueChange: 'valueChange', change: 'change' },
        exportAs: ['matButtonToggleGroup'],
        features: [Pe([$R, { provide: rx, useExisting: e }]), Ke],
      }));
    let t = e;
    return t;
  })(),
  zh = (() => {
    let e = class e {
      get buttonId() {
        return `${this.id}-button`;
      }
      get appearance() {
        return this.buttonToggleGroup
          ? this.buttonToggleGroup.appearance
          : this._appearance;
      }
      set appearance(n) {
        this._appearance = n;
      }
      get checked() {
        return this.buttonToggleGroup
          ? this.buttonToggleGroup._isSelected(this)
          : this._checked;
      }
      set checked(n) {
        n !== this._checked &&
          ((this._checked = n),
          this.buttonToggleGroup &&
            this.buttonToggleGroup._syncButtonToggle(this, this._checked),
          this._changeDetectorRef.markForCheck());
      }
      get disabled() {
        return (
          this._disabled ||
          (this.buttonToggleGroup && this.buttonToggleGroup.disabled)
        );
      }
      set disabled(n) {
        this._disabled = n;
      }
      constructor(n, r, o, s, a, c) {
        (this._changeDetectorRef = r),
          (this._elementRef = o),
          (this._focusMonitor = s),
          (this._checked = !1),
          (this.ariaLabelledby = null),
          (this._disabled = !1),
          (this.change = new Y());
        let l = Number(a);
        (this.tabIndex = l || l === 0 ? l : null),
          (this.buttonToggleGroup = n),
          (this.appearance = c && c.appearance ? c.appearance : 'standard');
      }
      ngOnInit() {
        let n = this.buttonToggleGroup;
        (this.id = this.id || `mat-button-toggle-${ox++}`),
          n &&
            (n._isPrechecked(this)
              ? (this.checked = !0)
              : n._isSelected(this) !== this._checked &&
                n._syncButtonToggle(this, this._checked));
      }
      ngAfterViewInit() {
        this._focusMonitor.monitor(this._elementRef, !0);
      }
      ngOnDestroy() {
        let n = this.buttonToggleGroup;
        this._focusMonitor.stopMonitoring(this._elementRef),
          n && n._isSelected(this) && n._syncButtonToggle(this, !1, !1, !0);
      }
      focus(n) {
        this._buttonElement.nativeElement.focus(n);
      }
      _onButtonClick() {
        let n = this._isSingleSelector() ? !0 : !this._checked;
        n !== this._checked &&
          ((this._checked = n),
          this.buttonToggleGroup &&
            (this.buttonToggleGroup._syncButtonToggle(this, this._checked, !0),
            this.buttonToggleGroup._onTouched())),
          this.change.emit(new pl(this, this.value));
      }
      _markForCheck() {
        this._changeDetectorRef.markForCheck();
      }
      _getButtonName() {
        return this._isSingleSelector()
          ? this.buttonToggleGroup.name
          : this.name || null;
      }
      _isSingleSelector() {
        return this.buttonToggleGroup && !this.buttonToggleGroup.multiple;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(
        p(rx, 8),
        p(ze),
        p(z),
        p(al),
        mn('tabindex'),
        p(ix, 8)
      );
    }),
      (e.ɵcmp = De({
        type: e,
        selectors: [['mat-button-toggle']],
        viewQuery: function (r, o) {
          if ((r & 1 && ke(UR, 5), r & 2)) {
            let s;
            J((s = ee())) && (o._buttonElement = s.first);
          }
        },
        hostAttrs: ['role', 'presentation', 1, 'mat-button-toggle'],
        hostVars: 12,
        hostBindings: function (r, o) {
          r & 1 &&
            ye('focus', function () {
              return o.focus();
            }),
            r & 2 &&
              (pe('aria-label', null)('aria-labelledby', null)('id', o.id)(
                'name',
                null
              ),
              X('mat-button-toggle-standalone', !o.buttonToggleGroup)(
                'mat-button-toggle-checked',
                o.checked
              )('mat-button-toggle-disabled', o.disabled)(
                'mat-button-toggle-appearance-standard',
                o.appearance === 'standard'
              ));
        },
        inputs: {
          ariaLabel: ['aria-label', 'ariaLabel'],
          ariaLabelledby: ['aria-labelledby', 'ariaLabelledby'],
          id: 'id',
          name: 'name',
          value: 'value',
          tabIndex: 'tabIndex',
          disableRipple: ['disableRipple', 'disableRipple', Me],
          appearance: 'appearance',
          checked: ['checked', 'checked', Me],
          disabled: ['disabled', 'disabled', Me],
        },
        outputs: { change: 'change' },
        exportAs: ['matButtonToggle'],
        features: [Ke],
        ngContentSelectors: HR,
        decls: 6,
        vars: 9,
        consts: [
          [
            'type',
            'button',
            1,
            'mat-button-toggle-button',
            'mat-focus-indicator',
            3,
            'id',
            'disabled',
            'click',
          ],
          ['button', ''],
          [1, 'mat-button-toggle-label-content'],
          [1, 'mat-button-toggle-focus-overlay'],
          [
            'matRipple',
            '',
            1,
            'mat-button-toggle-ripple',
            3,
            'matRippleTrigger',
            'matRippleDisabled',
          ],
        ],
        template: function (r, o) {
          if (
            (r & 1 &&
              (Je(),
              S(0, 'button', 0, 1),
              ye('click', function () {
                return o._onButtonClick();
              }),
              S(2, 'span', 2),
              oe(3),
              k()(),
              j(4, 'span', 3)(5, 'span', 4)),
            r & 2)
          ) {
            let s = bn(1);
            de('id', o.buttonId)('disabled', o.disabled || null),
              pe('tabindex', o.disabled ? -1 : o.tabIndex)(
                'aria-pressed',
                o.checked
              )('name', o._getButtonName())('aria-label', o.ariaLabel)(
                'aria-labelledby',
                o.ariaLabelledby
              ),
              W(5),
              de('matRippleTrigger', s)(
                'matRippleDisabled',
                o.disableRipple || o.disabled
              );
          }
        },
        dependencies: [Ht],
        styles: [
          '.mat-button-toggle-standalone,.mat-button-toggle-group{position:relative;display:inline-flex;flex-direction:row;white-space:nowrap;overflow:hidden;-webkit-tap-highlight-color:rgba(0,0,0,0);transform:translateZ(0);border-radius:var(--mat-legacy-button-toggle-shape)}.mat-button-toggle-standalone:not([class*=mat-elevation-z]),.mat-button-toggle-group:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.cdk-high-contrast-active .mat-button-toggle-standalone,.cdk-high-contrast-active .mat-button-toggle-group{outline:solid 1px}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.mat-button-toggle-group-appearance-standard{border-radius:var(--mat-standard-button-toggle-shape);border:solid 1px var(--mat-standard-button-toggle-divider-color)}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]){box-shadow:none}.cdk-high-contrast-active .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.cdk-high-contrast-active .mat-button-toggle-group-appearance-standard{outline:0}.mat-button-toggle-vertical{flex-direction:column}.mat-button-toggle-vertical .mat-button-toggle-label-content{display:block}.mat-button-toggle{white-space:nowrap;position:relative;color:var(--mat-legacy-button-toggle-text-color);font-family:var(--mat-legacy-button-toggle-text-font)}.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:var(--mat-legacy-button-toggle-focus-state-layer-opacity)}.mat-button-toggle .mat-icon svg{vertical-align:top}.mat-button-toggle-checked{color:var(--mat-legacy-button-toggle-selected-state-text-color);background-color:var(--mat-legacy-button-toggle-selected-state-background-color)}.mat-button-toggle-disabled{color:var(--mat-legacy-button-toggle-disabled-state-text-color);background-color:var(--mat-legacy-button-toggle-disabled-state-background-color)}.mat-button-toggle-disabled.mat-button-toggle-checked{background-color:var(--mat-legacy-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-appearance-standard{color:var(--mat-standard-button-toggle-text-color);background-color:var(--mat-standard-button-toggle-background-color);font-family:var(--mat-standard-button-toggle-text-font)}.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:solid 1px var(--mat-standard-button-toggle-divider-color)}[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:solid 1px var(--mat-standard-button-toggle-divider-color)}.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:none;border-top:solid 1px var(--mat-standard-button-toggle-divider-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-selected-state-text-color);background-color:var(--mat-standard-button-toggle-selected-state-background-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled{color:var(--mat-standard-button-toggle-disabled-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-state-background-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-disabled-selected-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{background-color:var(--mat-standard-button-toggle-state-layer-color)}.mat-button-toggle-appearance-standard:not(.mat-button-toggle-disabled):hover .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-hover-state-layer-opacity)}.mat-button-toggle-appearance-standard.cdk-keyboard-focused:not(.mat-button-toggle-disabled) .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-focus-state-layer-opacity)}@media(hover: none){.mat-button-toggle-appearance-standard:not(.mat-button-toggle-disabled):hover .mat-button-toggle-focus-overlay{display:none}}.mat-button-toggle-label-content{-webkit-user-select:none;user-select:none;display:inline-block;padding:0 16px;line-height:var(--mat-legacy-button-toggle-height);position:relative}.mat-button-toggle-appearance-standard .mat-button-toggle-label-content{padding:0 12px;line-height:var(--mat-standard-button-toggle-height)}.mat-button-toggle-label-content>*{vertical-align:middle}.mat-button-toggle-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;pointer-events:none;opacity:0;background-color:var(--mat-legacy-button-toggle-state-layer-color)}.cdk-high-contrast-active .mat-button-toggle-checked .mat-button-toggle-focus-overlay{border-bottom:solid 500px;opacity:.5;height:0}.cdk-high-contrast-active .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay{opacity:.6}.cdk-high-contrast-active .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{border-bottom:solid 500px}.mat-button-toggle .mat-button-toggle-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-button-toggle-button{border:0;background:none;color:inherit;padding:0;margin:0;font:inherit;outline:none;width:100%;cursor:pointer}.mat-button-toggle-disabled .mat-button-toggle-button{cursor:default}.mat-button-toggle-button::-moz-focus-inner{border:0}',
        ],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })(),
  sx = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = V({ type: e })),
      (e.ɵinj = L({ imports: [Ie, Kn, Ie] }));
    let t = e;
    return t;
  })();
var WR = ['input'],
  GR = ['label'],
  qR = ['*'],
  QR = new w('mat-checkbox-default-options', {
    providedIn: 'root',
    factory: lx,
  });
function lx() {
  return { color: 'accent', clickAction: 'check-indeterminate' };
}
var ZR = { provide: xn, useExisting: ut(() => Gh), multi: !0 },
  Wh = class {},
  YR = 0,
  ax = lx(),
  Gh = (() => {
    let e = class e {
      focus() {
        this._inputElement.nativeElement.focus();
      }
      _createChangeEvent(n) {
        let r = new Wh();
        return (r.source = this), (r.checked = n), r;
      }
      _getAnimationTargetElement() {
        return this._inputElement?.nativeElement;
      }
      get inputId() {
        return `${this.id || this._uniqueId}-input`;
      }
      constructor(n, r, o, s, a, c) {
        (this._elementRef = n),
          (this._changeDetectorRef = r),
          (this._ngZone = o),
          (this._animationMode = a),
          (this._options = c),
          (this._animationClasses = {
            uncheckedToChecked: 'mdc-checkbox--anim-unchecked-checked',
            uncheckedToIndeterminate:
              'mdc-checkbox--anim-unchecked-indeterminate',
            checkedToUnchecked: 'mdc-checkbox--anim-checked-unchecked',
            checkedToIndeterminate: 'mdc-checkbox--anim-checked-indeterminate',
            indeterminateToChecked: 'mdc-checkbox--anim-indeterminate-checked',
            indeterminateToUnchecked:
              'mdc-checkbox--anim-indeterminate-unchecked',
          }),
          (this.ariaLabel = ''),
          (this.ariaLabelledby = null),
          (this.labelPosition = 'after'),
          (this.name = null),
          (this.change = new Y()),
          (this.indeterminateChange = new Y()),
          (this._onTouched = () => {}),
          (this._currentAnimationClass = ''),
          (this._currentCheckState = 0),
          (this._controlValueAccessorChangeFn = () => {}),
          (this._checked = !1),
          (this._disabled = !1),
          (this._indeterminate = !1),
          (this._options = this._options || ax),
          (this.color = this._options.color || ax.color),
          (this.tabIndex = parseInt(s) || 0),
          (this.id = this._uniqueId = `mat-mdc-checkbox-${++YR}`);
      }
      ngAfterViewInit() {
        this._syncIndeterminate(this._indeterminate);
      }
      get checked() {
        return this._checked;
      }
      set checked(n) {
        n != this.checked &&
          ((this._checked = n), this._changeDetectorRef.markForCheck());
      }
      get disabled() {
        return this._disabled;
      }
      set disabled(n) {
        n !== this.disabled &&
          ((this._disabled = n), this._changeDetectorRef.markForCheck());
      }
      get indeterminate() {
        return this._indeterminate;
      }
      set indeterminate(n) {
        let r = n != this._indeterminate;
        (this._indeterminate = n),
          r &&
            (this._indeterminate
              ? this._transitionCheckState(3)
              : this._transitionCheckState(this.checked ? 1 : 2),
            this.indeterminateChange.emit(this._indeterminate)),
          this._syncIndeterminate(this._indeterminate);
      }
      _isRippleDisabled() {
        return this.disableRipple || this.disabled;
      }
      _onLabelTextChange() {
        this._changeDetectorRef.detectChanges();
      }
      writeValue(n) {
        this.checked = !!n;
      }
      registerOnChange(n) {
        this._controlValueAccessorChangeFn = n;
      }
      registerOnTouched(n) {
        this._onTouched = n;
      }
      setDisabledState(n) {
        this.disabled = n;
      }
      _transitionCheckState(n) {
        let r = this._currentCheckState,
          o = this._getAnimationTargetElement();
        if (
          !(r === n || !o) &&
          (this._currentAnimationClass &&
            o.classList.remove(this._currentAnimationClass),
          (this._currentAnimationClass =
            this._getAnimationClassForCheckStateTransition(r, n)),
          (this._currentCheckState = n),
          this._currentAnimationClass.length > 0)
        ) {
          o.classList.add(this._currentAnimationClass);
          let s = this._currentAnimationClass;
          this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
              o.classList.remove(s);
            }, 1e3);
          });
        }
      }
      _emitChangeEvent() {
        this._controlValueAccessorChangeFn(this.checked),
          this.change.emit(this._createChangeEvent(this.checked)),
          this._inputElement &&
            (this._inputElement.nativeElement.checked = this.checked);
      }
      toggle() {
        (this.checked = !this.checked),
          this._controlValueAccessorChangeFn(this.checked);
      }
      _handleInputClick() {
        let n = this._options?.clickAction;
        !this.disabled && n !== 'noop'
          ? (this.indeterminate &&
              n !== 'check' &&
              Promise.resolve().then(() => {
                (this._indeterminate = !1),
                  this.indeterminateChange.emit(this._indeterminate);
              }),
            (this._checked = !this._checked),
            this._transitionCheckState(this._checked ? 1 : 2),
            this._emitChangeEvent())
          : !this.disabled &&
            n === 'noop' &&
            ((this._inputElement.nativeElement.checked = this.checked),
            (this._inputElement.nativeElement.indeterminate =
              this.indeterminate));
      }
      _onInteractionEvent(n) {
        n.stopPropagation();
      }
      _onBlur() {
        Promise.resolve().then(() => {
          this._onTouched(), this._changeDetectorRef.markForCheck();
        });
      }
      _getAnimationClassForCheckStateTransition(n, r) {
        if (this._animationMode === 'NoopAnimations') return '';
        switch (n) {
          case 0:
            if (r === 1) return this._animationClasses.uncheckedToChecked;
            if (r == 3)
              return this._checked
                ? this._animationClasses.checkedToIndeterminate
                : this._animationClasses.uncheckedToIndeterminate;
            break;
          case 2:
            return r === 1
              ? this._animationClasses.uncheckedToChecked
              : this._animationClasses.uncheckedToIndeterminate;
          case 1:
            return r === 2
              ? this._animationClasses.checkedToUnchecked
              : this._animationClasses.checkedToIndeterminate;
          case 3:
            return r === 1
              ? this._animationClasses.indeterminateToChecked
              : this._animationClasses.indeterminateToUnchecked;
        }
        return '';
      }
      _syncIndeterminate(n) {
        let r = this._inputElement;
        r && (r.nativeElement.indeterminate = n);
      }
      _onInputClick() {
        this._handleInputClick();
      }
      _onTouchTargetClick() {
        this._handleInputClick(),
          this.disabled || this._inputElement.nativeElement.focus();
      }
      _preventBubblingFromLabel(n) {
        n.target &&
          this._labelElement.nativeElement.contains(n.target) &&
          n.stopPropagation();
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(
        p(z),
        p(ze),
        p(I),
        mn('tabindex'),
        p($e, 8),
        p(QR, 8)
      );
    }),
      (e.ɵcmp = De({
        type: e,
        selectors: [['mat-checkbox']],
        viewQuery: function (r, o) {
          if ((r & 1 && (ke(WR, 5), ke(GR, 5), ke(Ht, 5)), r & 2)) {
            let s;
            J((s = ee())) && (o._inputElement = s.first),
              J((s = ee())) && (o._labelElement = s.first),
              J((s = ee())) && (o.ripple = s.first);
          }
        },
        hostAttrs: [1, 'mat-mdc-checkbox'],
        hostVars: 14,
        hostBindings: function (r, o) {
          r & 2 &&
            (zn('id', o.id),
            pe('tabindex', null)('aria-label', null)('aria-labelledby', null),
            Kt(o.color ? 'mat-' + o.color : 'mat-accent'),
            X('_mat-animation-noopable', o._animationMode === 'NoopAnimations')(
              'mdc-checkbox--disabled',
              o.disabled
            )('mat-mdc-checkbox-disabled', o.disabled)(
              'mat-mdc-checkbox-checked',
              o.checked
            ));
        },
        inputs: {
          ariaLabel: ['aria-label', 'ariaLabel'],
          ariaLabelledby: ['aria-labelledby', 'ariaLabelledby'],
          ariaDescribedby: ['aria-describedby', 'ariaDescribedby'],
          id: 'id',
          required: ['required', 'required', Me],
          labelPosition: 'labelPosition',
          name: 'name',
          value: 'value',
          disableRipple: ['disableRipple', 'disableRipple', Me],
          tabIndex: [
            'tabIndex',
            'tabIndex',
            (n) => (n == null ? void 0 : So(n)),
          ],
          color: 'color',
          checked: ['checked', 'checked', Me],
          disabled: ['disabled', 'disabled', Me],
          indeterminate: ['indeterminate', 'indeterminate', Me],
        },
        outputs: {
          change: 'change',
          indeterminateChange: 'indeterminateChange',
        },
        exportAs: ['matCheckbox'],
        features: [Pe([ZR]), Ke],
        ngContentSelectors: qR,
        decls: 15,
        vars: 20,
        consts: [
          [1, 'mdc-form-field', 3, 'click'],
          [1, 'mdc-checkbox'],
          ['checkbox', ''],
          [1, 'mat-mdc-checkbox-touch-target', 3, 'click'],
          [
            'type',
            'checkbox',
            1,
            'mdc-checkbox__native-control',
            3,
            'checked',
            'indeterminate',
            'disabled',
            'id',
            'required',
            'tabIndex',
            'blur',
            'click',
            'change',
          ],
          ['input', ''],
          [1, 'mdc-checkbox__ripple'],
          [1, 'mdc-checkbox__background'],
          [
            'focusable',
            'false',
            'viewBox',
            '0 0 24 24',
            'aria-hidden',
            'true',
            1,
            'mdc-checkbox__checkmark',
          ],
          [
            'fill',
            'none',
            'd',
            'M1.73,12.91 8.1,19.28 22.79,4.59',
            1,
            'mdc-checkbox__checkmark-path',
          ],
          [1, 'mdc-checkbox__mixedmark'],
          [
            'mat-ripple',
            '',
            1,
            'mat-mdc-checkbox-ripple',
            'mat-mdc-focus-indicator',
            3,
            'matRippleTrigger',
            'matRippleDisabled',
            'matRippleCentered',
          ],
          [1, 'mdc-label', 3, 'for'],
          ['label', ''],
        ],
        template: function (r, o) {
          if (
            (r & 1 &&
              (Je(),
              S(0, 'div', 0),
              ye('click', function (a) {
                return o._preventBubblingFromLabel(a);
              }),
              S(1, 'div', 1, 2)(3, 'div', 3),
              ye('click', function () {
                return o._onTouchTargetClick();
              }),
              k(),
              S(4, 'input', 4, 5),
              ye('blur', function () {
                return o._onBlur();
              })('click', function () {
                return o._onInputClick();
              })('change', function (a) {
                return o._onInteractionEvent(a);
              }),
              k(),
              j(6, 'div', 6),
              S(7, 'div', 7),
              bb(),
              S(8, 'svg', 8),
              j(9, 'path', 9),
              k(),
              vb(),
              j(10, 'div', 10),
              k(),
              j(11, 'div', 11),
              k(),
              S(12, 'label', 12, 13),
              oe(14),
              k()()),
            r & 2)
          ) {
            let s = bn(2);
            X('mdc-form-field--align-end', o.labelPosition == 'before'),
              W(4),
              X('mdc-checkbox--selected', o.checked),
              de('checked', o.checked)('indeterminate', o.indeterminate)(
                'disabled',
                o.disabled
              )('id', o.inputId)('required', o.required)(
                'tabIndex',
                o.disabled ? -1 : o.tabIndex
              ),
              pe('aria-label', o.ariaLabel || null)(
                'aria-labelledby',
                o.ariaLabelledby
              )('aria-describedby', o.ariaDescribedby)(
                'aria-checked',
                o.indeterminate ? 'mixed' : null
              )('name', o.name)('value', o.value),
              W(7),
              de('matRippleTrigger', s)(
                'matRippleDisabled',
                o.disableRipple || o.disabled
              )('matRippleCentered', !0),
              W(1),
              de('for', o.inputId);
          }
        },
        dependencies: [Ht],
        styles: [
          '.mdc-touch-target-wrapper{display:inline}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom}.mdc-checkbox[hidden]{display:none}.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}@media screen and (forced-colors: active){.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring{border-color:CanvasText}}.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring::after,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring::after{content:"";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring::after,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring::after{border-color:CanvasText}}@media all and (-ms-high-contrast: none){.mdc-checkbox .mdc-checkbox__focus-ring{display:none}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-checkbox__mixedmark{margin:0 1px}}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:rgba(0,0,0,0);pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__checkmark{opacity:1}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mdc-checkbox--touch{margin:calc((var(--mdc-checkbox-state-layer-size) - var(--mdc-checkbox-state-layer-size)) / 2)}.mdc-checkbox--touch .mdc-checkbox__native-control{top:calc((var(--mdc-checkbox-state-layer-size) - var(--mdc-checkbox-state-layer-size)) / 2);right:calc((var(--mdc-checkbox-state-layer-size) - var(--mdc-checkbox-state-layer-size)) / 2);left:calc((var(--mdc-checkbox-state-layer-size) - var(--mdc-checkbox-state-layer-size)) / 2);width:var(--mdc-checkbox-state-layer-size);height:var(--mdc-checkbox-state-layer-size)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field[hidden]{display:none}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mdc-checkbox{padding:calc((var(--mdc-checkbox-state-layer-size) - 18px) / 2);margin:calc((var(--mdc-checkbox-state-layer-size) - var(--mdc-checkbox-state-layer-size)) / 2)}.mdc-checkbox .mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:var(--mdc-checkbox-disabled-unselected-icon-color);background-color:transparent}.mdc-checkbox .mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true][disabled]~.mdc-checkbox__background{border-color:transparent;background-color:var(--mdc-checkbox-disabled-selected-icon-color)}.mdc-checkbox .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:var(--mdc-checkbox-selected-checkmark-color)}.mdc-checkbox .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:var(--mdc-checkbox-selected-checkmark-color)}.mdc-checkbox .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:var(--mdc-checkbox-disabled-selected-checkmark-color)}.mdc-checkbox .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:var(--mdc-checkbox-disabled-selected-checkmark-color)}.mdc-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:var(--mdc-checkbox-unselected-icon-color);background-color:transparent}.mdc-checkbox .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-icon-color);background-color:var(--mdc-checkbox-selected-icon-color)}@keyframes mdc-checkbox-fade-in-background-8A000000FFF4433600000000FFF44336{0%{border-color:var(--mdc-checkbox-unselected-icon-color);background-color:transparent}50%{border-color:var(--mdc-checkbox-selected-icon-color);background-color:var(--mdc-checkbox-selected-icon-color)}}@keyframes mdc-checkbox-fade-out-background-8A000000FFF4433600000000FFF44336{0%,80%{border-color:var(--mdc-checkbox-selected-icon-color);background-color:var(--mdc-checkbox-selected-icon-color)}100%{border-color:var(--mdc-checkbox-unselected-icon-color);background-color:transparent}}.mdc-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FFF4433600000000FFF44336}.mdc-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FFF4433600000000FFF44336}.mdc-checkbox:hover .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:var(--mdc-checkbox-unselected-hover-icon-color);background-color:transparent}.mdc-checkbox:hover .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-checkbox:hover .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mdc-checkbox:hover .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-hover-icon-color);background-color:var(--mdc-checkbox-selected-hover-icon-color)}@keyframes mdc-checkbox-fade-in-background-FF212121FFF4433600000000FFF44336{0%{border-color:var(--mdc-checkbox-unselected-hover-icon-color);background-color:transparent}50%{border-color:var(--mdc-checkbox-selected-hover-icon-color);background-color:var(--mdc-checkbox-selected-hover-icon-color)}}@keyframes mdc-checkbox-fade-out-background-FF212121FFF4433600000000FFF44336{0%,80%{border-color:var(--mdc-checkbox-selected-hover-icon-color);background-color:var(--mdc-checkbox-selected-hover-icon-color)}100%{border-color:var(--mdc-checkbox-unselected-hover-icon-color);background-color:transparent}}.mdc-checkbox:hover.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox:hover.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-FF212121FFF4433600000000FFF44336}.mdc-checkbox:hover.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox:hover.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-FF212121FFF4433600000000FFF44336}.mdc-checkbox:not(:disabled):active .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:var(--mdc-checkbox-unselected-pressed-icon-color);background-color:transparent}.mdc-checkbox:not(:disabled):active .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-checkbox:not(:disabled):active .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mdc-checkbox:not(:disabled):active .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-pressed-icon-color);background-color:var(--mdc-checkbox-selected-pressed-icon-color)}@keyframes mdc-checkbox-fade-in-background-8A000000FFF4433600000000FFF44336{0%{border-color:var(--mdc-checkbox-unselected-pressed-icon-color);background-color:transparent}50%{border-color:var(--mdc-checkbox-selected-pressed-icon-color);background-color:var(--mdc-checkbox-selected-pressed-icon-color)}}@keyframes mdc-checkbox-fade-out-background-8A000000FFF4433600000000FFF44336{0%,80%{border-color:var(--mdc-checkbox-selected-pressed-icon-color);background-color:var(--mdc-checkbox-selected-pressed-icon-color)}100%{border-color:var(--mdc-checkbox-unselected-pressed-icon-color);background-color:transparent}}.mdc-checkbox:not(:disabled):active.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox:not(:disabled):active.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FFF4433600000000FFF44336}.mdc-checkbox:not(:disabled):active.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox:not(:disabled):active.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FFF4433600000000FFF44336}.mdc-checkbox .mdc-checkbox__background{top:calc((var(--mdc-checkbox-state-layer-size) - 18px) / 2);left:calc((var(--mdc-checkbox-state-layer-size) - 18px) / 2)}.mdc-checkbox .mdc-checkbox__native-control{top:calc((var(--mdc-checkbox-state-layer-size) - var(--mdc-checkbox-state-layer-size)) / 2);right:calc((var(--mdc-checkbox-state-layer-size) - var(--mdc-checkbox-state-layer-size)) / 2);left:calc((var(--mdc-checkbox-state-layer-size) - var(--mdc-checkbox-state-layer-size)) / 2);width:var(--mdc-checkbox-state-layer-size);height:var(--mdc-checkbox-state-layer-size)}.mdc-checkbox .mdc-checkbox__native-control:enabled:focus:focus:not(:checked):not(:indeterminate)~.mdc-checkbox__background{border-color:var(--mdc-checkbox-unselected-focus-icon-color)}.mdc-checkbox .mdc-checkbox__native-control:enabled:focus:checked~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control:enabled:focus:indeterminate~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-focus-icon-color);background-color:var(--mdc-checkbox-selected-focus-icon-color)}.mdc-checkbox:hover .mdc-checkbox__ripple{opacity:var(--mdc-checkbox-unselected-hover-state-layer-opacity);background-color:var(--mdc-checkbox-unselected-hover-state-layer-color)}.mdc-checkbox:hover .mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-unselected-hover-state-layer-color)}.mdc-checkbox .mdc-checkbox__native-control:focus~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-unselected-focus-state-layer-opacity);background-color:var(--mdc-checkbox-unselected-focus-state-layer-color)}.mdc-checkbox .mdc-checkbox__native-control:focus~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-unselected-focus-state-layer-color)}.mdc-checkbox:active .mdc-checkbox__native-control~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-unselected-pressed-state-layer-opacity);background-color:var(--mdc-checkbox-unselected-pressed-state-layer-color)}.mdc-checkbox:active .mdc-checkbox__native-control~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-unselected-pressed-state-layer-color)}.mdc-checkbox:hover .mdc-checkbox__native-control:checked~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-selected-hover-state-layer-opacity);background-color:var(--mdc-checkbox-selected-hover-state-layer-color)}.mdc-checkbox:hover .mdc-checkbox__native-control:checked~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-selected-hover-state-layer-color)}.mdc-checkbox .mdc-checkbox__native-control:focus:checked~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-selected-focus-state-layer-opacity);background-color:var(--mdc-checkbox-selected-focus-state-layer-color)}.mdc-checkbox .mdc-checkbox__native-control:focus:checked~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-selected-focus-state-layer-color)}.mdc-checkbox:active .mdc-checkbox__native-control:checked~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-selected-pressed-state-layer-opacity);background-color:var(--mdc-checkbox-selected-pressed-state-layer-color)}.mdc-checkbox:active .mdc-checkbox__native-control:checked~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-selected-pressed-state-layer-color)}.mat-mdc-checkbox{display:inline-block;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-checkbox .mdc-checkbox__background{-webkit-print-color-adjust:exact;color-adjust:exact}.mat-mdc-checkbox._mat-animation-noopable *,.mat-mdc-checkbox._mat-animation-noopable *::before{transition:none !important;animation:none !important}.mat-mdc-checkbox label{cursor:pointer}.mat-mdc-checkbox.mat-mdc-checkbox-disabled label{cursor:default}.mat-mdc-checkbox label:empty{display:none}.cdk-high-contrast-active .mat-mdc-checkbox.mat-mdc-checkbox-disabled{opacity:.5}.cdk-high-contrast-active .mat-mdc-checkbox .mdc-checkbox__checkmark{--mdc-checkbox-selected-checkmark-color: CanvasText;--mdc-checkbox-disabled-selected-checkmark-color: CanvasText}.mat-mdc-checkbox .mdc-checkbox__ripple{opacity:0}.mat-mdc-checkbox-ripple,.mdc-checkbox__ripple{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-checkbox-ripple:not(:empty),.mdc-checkbox__ripple:not(:empty){transform:translateZ(0)}.mat-mdc-checkbox-ripple .mat-ripple-element{opacity:.1}.mat-mdc-checkbox-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mat-mdc-checkbox-ripple::before{border-radius:50%}.mdc-checkbox__native-control:focus~.mat-mdc-focus-indicator::before{content:""}',
        ],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })();
var cx = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = V({ type: e })),
      (e.ɵinj = L({}));
    let t = e;
    return t;
  })(),
  dx = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = V({ type: e })),
      (e.ɵinj = L({ imports: [Ie, Kn, cx, Ie, cx] }));
    let t = e;
    return t;
  })();
var ux = (() => {
    let e = class e {
      constructor() {
        (this._vertical = !1), (this._inset = !1);
      }
      get vertical() {
        return this._vertical;
      }
      set vertical(n) {
        this._vertical = Be(n);
      }
      get inset() {
        return this._inset;
      }
      set inset(n) {
        this._inset = Be(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵcmp = De({
        type: e,
        selectors: [['mat-divider']],
        hostAttrs: ['role', 'separator', 1, 'mat-divider'],
        hostVars: 7,
        hostBindings: function (r, o) {
          r & 2 &&
            (pe('aria-orientation', o.vertical ? 'vertical' : 'horizontal'),
            X('mat-divider-vertical', o.vertical)(
              'mat-divider-horizontal',
              !o.vertical
            )('mat-divider-inset', o.inset));
        },
        inputs: { vertical: 'vertical', inset: 'inset' },
        decls: 0,
        vars: 0,
        template: function (r, o) {},
        styles: [
          '.mat-divider{display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color);border-top-width:var(--mat-divider-width)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color);border-right-width:var(--mat-divider-width)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}',
        ],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })(),
  fx = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = V({ type: e })),
      (e.ɵinj = L({ imports: [Ie, Ie] }));
    let t = e;
    return t;
  })();
var qh = class {
    constructor(e) {
      (this._box = e),
        (this._destroyed = new Z()),
        (this._resizeSubject = new Z()),
        (this._elementObservables = new Map()),
        typeof ResizeObserver < 'u' &&
          (this._resizeObserver = new ResizeObserver((i) =>
            this._resizeSubject.next(i)
          ));
    }
    observe(e) {
      return (
        this._elementObservables.has(e) ||
          this._elementObservables.set(
            e,
            new Q((i) => {
              let n = this._resizeSubject.subscribe(i);
              return (
                this._resizeObserver?.observe(e, { box: this._box }),
                () => {
                  this._resizeObserver?.unobserve(e),
                    n.unsubscribe(),
                    this._elementObservables.delete(e);
                }
              );
            }).pipe(
              je((i) => i.some((n) => n.target === e)),
              bd({ bufferSize: 1, refCount: !0 }),
              vt(this._destroyed)
            )
          ),
        this._elementObservables.get(e)
      );
    }
    destroy() {
      this._destroyed.next(),
        this._destroyed.complete(),
        this._resizeSubject.complete(),
        this._elementObservables.clear();
    }
  },
  hx = (() => {
    let e = class e {
      constructor() {
        (this._observers = new Map()),
          (this._ngZone = b(I)),
          typeof ResizeObserver < 'u';
      }
      ngOnDestroy() {
        for (let [, n] of this._observers) n.destroy();
        this._observers.clear(), typeof ResizeObserver < 'u';
      }
      observe(n, r) {
        let o = r?.box || 'content-box';
        return (
          this._observers.has(o) || this._observers.set(o, new qh(o)),
          this._observers.get(o).observe(n)
        );
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })();
var JR = ['notch'],
  eF = ['matFormFieldNotchedOutline', ''],
  tF = ['*'],
  nF = ['textField'],
  iF = ['iconPrefixContainer'],
  rF = ['textPrefixContainer'];
function oF(t, e) {
  t & 1 && j(0, 'span', 16);
}
function sF(t, e) {
  if (
    (t & 1 && (S(0, 'label', 14), oe(1, 1), _e(2, oF, 1, 0, 'span', 15), k()),
    t & 2)
  ) {
    let i = Ne(2);
    de('floating', i._shouldLabelFloat())('monitorResize', i._hasOutline())(
      'id',
      i._labelId
    ),
      pe('for', i._control.id),
      W(2),
      Te(2, !i.hideRequiredMarker && i._control.required ? 2 : -1);
  }
}
function aF(t, e) {
  if ((t & 1 && _e(0, sF, 3, 5, 'label', 14), t & 2)) {
    let i = Ne();
    Te(0, i._hasFloatingLabel() ? 0 : -1);
  }
}
function cF(t, e) {
  t & 1 && j(0, 'div', 17);
}
function lF(t, e) {}
function dF(t, e) {
  if ((t & 1 && _e(0, lF, 0, 0, 'ng-template', 9), t & 2)) {
    Ne(2);
    let i = bn(1);
    de('ngTemplateOutlet', i);
  }
}
function uF(t, e) {
  if ((t & 1 && (S(0, 'div', 5), _e(1, dF, 1, 1, null, 9), k()), t & 2)) {
    let i = Ne();
    de('matFormFieldNotchedOutlineOpen', i._shouldLabelFloat()),
      W(1),
      Te(1, i._forceDisplayInfixLabel() ? -1 : 1);
  }
}
function fF(t, e) {
  t & 1 && (S(0, 'div', 18, 19), oe(2, 2), k());
}
function hF(t, e) {
  t & 1 && (S(0, 'div', 20, 21), oe(2, 3), k());
}
function mF(t, e) {}
function pF(t, e) {
  if ((t & 1 && _e(0, mF, 0, 0, 'ng-template', 9), t & 2)) {
    Ne();
    let i = bn(1);
    de('ngTemplateOutlet', i);
  }
}
function gF(t, e) {
  t & 1 && (S(0, 'div', 22), oe(1, 4), k());
}
function bF(t, e) {
  t & 1 && (S(0, 'div', 23), oe(1, 5), k());
}
function vF(t, e) {
  t & 1 && j(0, 'div', 12);
}
function _F(t, e) {
  if ((t & 1 && (S(0, 'div', 24), oe(1, 6), k()), t & 2)) {
    let i = Ne();
    de('@transitionMessages', i._subscriptAnimationState);
  }
}
function yF(t, e) {
  if ((t & 1 && (S(0, 'mat-hint', 26), We(1), k()), t & 2)) {
    let i = Ne(2);
    de('id', i._hintLabelId), W(1), Do(i.hintLabel);
  }
}
function xF(t, e) {
  if (
    (t & 1 &&
      (S(0, 'div', 25),
      _e(1, yF, 2, 2, 'mat-hint', 26),
      oe(2, 7),
      j(3, 'div', 27),
      oe(4, 8),
      k()),
    t & 2)
  ) {
    let i = Ne();
    de('@transitionMessages', i._subscriptAnimationState),
      W(1),
      Te(1, i.hintLabel ? 1 : -1);
  }
}
var wF = [
    '*',
    [['mat-label']],
    [
      ['', 'matPrefix', ''],
      ['', 'matIconPrefix', ''],
    ],
    [['', 'matTextPrefix', '']],
    [['', 'matTextSuffix', '']],
    [
      ['', 'matSuffix', ''],
      ['', 'matIconSuffix', ''],
    ],
    [['mat-error'], ['', 'matError', '']],
    [['mat-hint', 3, 'align', 'end']],
    [['mat-hint', 'align', 'end']],
  ],
  EF = [
    '*',
    'mat-label',
    '[matPrefix], [matIconPrefix]',
    '[matTextPrefix]',
    '[matTextSuffix]',
    '[matSuffix], [matIconSuffix]',
    'mat-error, [matError]',
    "mat-hint:not([align='end'])",
    "mat-hint[align='end']",
  ],
  bl = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵdir = q({ type: e, selectors: [['mat-label']] }));
    let t = e;
    return t;
  })();
var CF = new w('MatError');
var DF = 0,
  mx = (() => {
    let e = class e {
      constructor() {
        (this.align = 'start'), (this.id = `mat-mdc-hint-${DF++}`);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵdir = q({
        type: e,
        selectors: [['mat-hint']],
        hostAttrs: [
          1,
          'mat-mdc-form-field-hint',
          'mat-mdc-form-field-bottom-align',
        ],
        hostVars: 4,
        hostBindings: function (r, o) {
          r & 2 &&
            (zn('id', o.id),
            pe('align', null),
            X('mat-mdc-form-field-hint-end', o.align === 'end'));
        },
        inputs: { align: 'align', id: 'id' },
      }));
    let t = e;
    return t;
  })(),
  IF = new w('MatPrefix');
var MF = new w('MatSuffix');
var wx = new w('FloatingLabelParent'),
  px = (() => {
    let e = class e {
      get floating() {
        return this._floating;
      }
      set floating(n) {
        (this._floating = n), this.monitorResize && this._handleResize();
      }
      get monitorResize() {
        return this._monitorResize;
      }
      set monitorResize(n) {
        (this._monitorResize = n),
          this._monitorResize
            ? this._subscribeToResize()
            : this._resizeSubscription.unsubscribe();
      }
      constructor(n) {
        (this._elementRef = n),
          (this._floating = !1),
          (this._monitorResize = !1),
          (this._resizeObserver = b(hx)),
          (this._ngZone = b(I)),
          (this._parent = b(wx)),
          (this._resizeSubscription = new be());
      }
      ngOnDestroy() {
        this._resizeSubscription.unsubscribe();
      }
      getWidth() {
        return SF(this._elementRef.nativeElement);
      }
      get element() {
        return this._elementRef.nativeElement;
      }
      _handleResize() {
        setTimeout(() => this._parent._handleLabelResized());
      }
      _subscribeToResize() {
        this._resizeSubscription.unsubscribe(),
          this._ngZone.runOutsideAngular(() => {
            this._resizeSubscription = this._resizeObserver
              .observe(this._elementRef.nativeElement, { box: 'border-box' })
              .subscribe(() => this._handleResize());
          });
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(p(z));
    }),
      (e.ɵdir = q({
        type: e,
        selectors: [['label', 'matFormFieldFloatingLabel', '']],
        hostAttrs: [1, 'mdc-floating-label', 'mat-mdc-floating-label'],
        hostVars: 2,
        hostBindings: function (r, o) {
          r & 2 && X('mdc-floating-label--float-above', o.floating);
        },
        inputs: { floating: 'floating', monitorResize: 'monitorResize' },
      }));
    let t = e;
    return t;
  })();
function SF(t) {
  let e = t;
  if (e.offsetParent !== null) return e.scrollWidth;
  let i = e.cloneNode(!0);
  i.style.setProperty('position', 'absolute'),
    i.style.setProperty('transform', 'translate(-9999px, -9999px)'),
    document.documentElement.appendChild(i);
  let n = i.scrollWidth;
  return i.remove(), n;
}
var gx = 'mdc-line-ripple--active',
  gl = 'mdc-line-ripple--deactivating',
  bx = (() => {
    let e = class e {
      constructor(n, r) {
        (this._elementRef = n),
          (this._handleTransitionEnd = (o) => {
            let s = this._elementRef.nativeElement.classList,
              a = s.contains(gl);
            o.propertyName === 'opacity' && a && s.remove(gx, gl);
          }),
          r.runOutsideAngular(() => {
            n.nativeElement.addEventListener(
              'transitionend',
              this._handleTransitionEnd
            );
          });
      }
      activate() {
        let n = this._elementRef.nativeElement.classList;
        n.remove(gl), n.add(gx);
      }
      deactivate() {
        this._elementRef.nativeElement.classList.add(gl);
      }
      ngOnDestroy() {
        this._elementRef.nativeElement.removeEventListener(
          'transitionend',
          this._handleTransitionEnd
        );
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(p(z), p(I));
    }),
      (e.ɵdir = q({
        type: e,
        selectors: [['div', 'matFormFieldLineRipple', '']],
        hostAttrs: [1, 'mdc-line-ripple'],
      }));
    let t = e;
    return t;
  })(),
  vx = (() => {
    let e = class e {
      constructor(n, r) {
        (this._elementRef = n), (this._ngZone = r), (this.open = !1);
      }
      ngAfterViewInit() {
        let n = this._elementRef.nativeElement.querySelector(
          '.mdc-floating-label'
        );
        n
          ? (this._elementRef.nativeElement.classList.add(
              'mdc-notched-outline--upgraded'
            ),
            typeof requestAnimationFrame == 'function' &&
              ((n.style.transitionDuration = '0s'),
              this._ngZone.runOutsideAngular(() => {
                requestAnimationFrame(() => (n.style.transitionDuration = ''));
              })))
          : this._elementRef.nativeElement.classList.add(
              'mdc-notched-outline--no-label'
            );
      }
      _setNotchWidth(n) {
        !this.open || !n
          ? (this._notch.nativeElement.style.width = '')
          : (this._notch.nativeElement.style.width = `calc(${n}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + ${
              8 + 1
            }px)`);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(p(z), p(I));
    }),
      (e.ɵcmp = De({
        type: e,
        selectors: [['div', 'matFormFieldNotchedOutline', '']],
        viewQuery: function (r, o) {
          if ((r & 1 && ke(JR, 5), r & 2)) {
            let s;
            J((s = ee())) && (o._notch = s.first);
          }
        },
        hostAttrs: [1, 'mdc-notched-outline'],
        hostVars: 2,
        hostBindings: function (r, o) {
          r & 2 && X('mdc-notched-outline--notched', o.open);
        },
        inputs: { open: ['matFormFieldNotchedOutlineOpen', 'open'] },
        attrs: eF,
        ngContentSelectors: tF,
        decls: 5,
        vars: 0,
        consts: [
          [1, 'mdc-notched-outline__leading'],
          [1, 'mdc-notched-outline__notch'],
          ['notch', ''],
          [1, 'mdc-notched-outline__trailing'],
        ],
        template: function (r, o) {
          r & 1 &&
            (Je(),
            j(0, 'div', 0),
            S(1, 'div', 1, 2),
            oe(3),
            k(),
            j(4, 'div', 3));
        },
        encapsulation: 2,
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })(),
  TF = {
    transitionMessages: qy('transitionMessages', [
      Yy('enter', Cr({ opacity: 1, transform: 'translateY(0%)' })),
      Xy('void => enter', [
        Cr({ opacity: 0, transform: 'translateY(-5px)' }),
        Qy('300ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
      ]),
    ]),
  },
  Qh = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵdir = q({ type: e }));
    let t = e;
    return t;
  })();
var Zh = new w('MatFormField'),
  kF = new w('MAT_FORM_FIELD_DEFAULT_OPTIONS'),
  _x = 0,
  yx = 'fill',
  AF = 'auto',
  xx = 'fixed',
  RF = 'translateY(-50%)',
  Ex = (() => {
    let e = class e {
      get hideRequiredMarker() {
        return this._hideRequiredMarker;
      }
      set hideRequiredMarker(n) {
        this._hideRequiredMarker = Be(n);
      }
      get floatLabel() {
        return this._floatLabel || this._defaults?.floatLabel || AF;
      }
      set floatLabel(n) {
        n !== this._floatLabel &&
          ((this._floatLabel = n), this._changeDetectorRef.markForCheck());
      }
      get appearance() {
        return this._appearance;
      }
      set appearance(n) {
        let r = this._appearance,
          o = n || this._defaults?.appearance || yx;
        (this._appearance = o),
          this._appearance === 'outline' &&
            this._appearance !== r &&
            (this._needsOutlineLabelOffsetUpdateOnStable = !0);
      }
      get subscriptSizing() {
        return this._subscriptSizing || this._defaults?.subscriptSizing || xx;
      }
      set subscriptSizing(n) {
        this._subscriptSizing = n || this._defaults?.subscriptSizing || xx;
      }
      get hintLabel() {
        return this._hintLabel;
      }
      set hintLabel(n) {
        (this._hintLabel = n), this._processHints();
      }
      get _control() {
        return this._explicitFormFieldControl || this._formFieldControl;
      }
      set _control(n) {
        this._explicitFormFieldControl = n;
      }
      constructor(n, r, o, s, a, c, l, d) {
        (this._elementRef = n),
          (this._changeDetectorRef = r),
          (this._ngZone = o),
          (this._dir = s),
          (this._platform = a),
          (this._defaults = c),
          (this._animationMode = l),
          (this._hideRequiredMarker = !1),
          (this.color = 'primary'),
          (this._appearance = yx),
          (this._subscriptSizing = null),
          (this._hintLabel = ''),
          (this._hasIconPrefix = !1),
          (this._hasTextPrefix = !1),
          (this._hasIconSuffix = !1),
          (this._hasTextSuffix = !1),
          (this._labelId = `mat-mdc-form-field-label-${_x++}`),
          (this._hintLabelId = `mat-mdc-hint-${_x++}`),
          (this._subscriptAnimationState = ''),
          (this._destroyed = new Z()),
          (this._isFocused = null),
          (this._needsOutlineLabelOffsetUpdateOnStable = !1),
          c &&
            (c.appearance && (this.appearance = c.appearance),
            (this._hideRequiredMarker = !!c?.hideRequiredMarker),
            c.color && (this.color = c.color));
      }
      ngAfterViewInit() {
        this._updateFocusState(),
          (this._subscriptAnimationState = 'enter'),
          this._changeDetectorRef.detectChanges();
      }
      ngAfterContentInit() {
        this._assertFormFieldControl(),
          this._initializeControl(),
          this._initializeSubscript(),
          this._initializePrefixAndSuffix(),
          this._initializeOutlineLabelOffsetSubscriptions();
      }
      ngAfterContentChecked() {
        this._assertFormFieldControl();
      }
      ngOnDestroy() {
        this._destroyed.next(), this._destroyed.complete();
      }
      getLabelId() {
        return this._hasFloatingLabel() ? this._labelId : null;
      }
      getConnectedOverlayOrigin() {
        return this._textField || this._elementRef;
      }
      _animateAndLockLabel() {
        this._hasFloatingLabel() && (this.floatLabel = 'always');
      }
      _initializeControl() {
        let n = this._control;
        n.controlType &&
          this._elementRef.nativeElement.classList.add(
            `mat-mdc-form-field-type-${n.controlType}`
          ),
          n.stateChanges.subscribe(() => {
            this._updateFocusState(),
              this._syncDescribedByIds(),
              this._changeDetectorRef.markForCheck();
          }),
          n.ngControl &&
            n.ngControl.valueChanges &&
            n.ngControl.valueChanges
              .pipe(vt(this._destroyed))
              .subscribe(() => this._changeDetectorRef.markForCheck());
      }
      _checkPrefixAndSuffixTypes() {
        (this._hasIconPrefix = !!this._prefixChildren.find((n) => !n._isText)),
          (this._hasTextPrefix = !!this._prefixChildren.find((n) => n._isText)),
          (this._hasIconSuffix = !!this._suffixChildren.find(
            (n) => !n._isText
          )),
          (this._hasTextSuffix = !!this._suffixChildren.find((n) => n._isText));
      }
      _initializePrefixAndSuffix() {
        this._checkPrefixAndSuffixTypes(),
          ud(
            this._prefixChildren.changes,
            this._suffixChildren.changes
          ).subscribe(() => {
            this._checkPrefixAndSuffixTypes(),
              this._changeDetectorRef.markForCheck();
          });
      }
      _initializeSubscript() {
        this._hintChildren.changes.subscribe(() => {
          this._processHints(), this._changeDetectorRef.markForCheck();
        }),
          this._errorChildren.changes.subscribe(() => {
            this._syncDescribedByIds(), this._changeDetectorRef.markForCheck();
          }),
          this._validateHints(),
          this._syncDescribedByIds();
      }
      _assertFormFieldControl() {
        this._control;
      }
      _updateFocusState() {
        this._control.focused && !this._isFocused
          ? ((this._isFocused = !0), this._lineRipple?.activate())
          : !this._control.focused &&
            (this._isFocused || this._isFocused === null) &&
            ((this._isFocused = !1), this._lineRipple?.deactivate()),
          this._textField?.nativeElement.classList.toggle(
            'mdc-text-field--focused',
            this._control.focused
          );
      }
      _initializeOutlineLabelOffsetSubscriptions() {
        this._prefixChildren.changes.subscribe(
          () => (this._needsOutlineLabelOffsetUpdateOnStable = !0)
        ),
          this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable.pipe(vt(this._destroyed)).subscribe(() => {
              this._needsOutlineLabelOffsetUpdateOnStable &&
                ((this._needsOutlineLabelOffsetUpdateOnStable = !1),
                this._updateOutlineLabelOffset());
            });
          }),
          this._dir.change
            .pipe(vt(this._destroyed))
            .subscribe(
              () => (this._needsOutlineLabelOffsetUpdateOnStable = !0)
            );
      }
      _shouldAlwaysFloat() {
        return this.floatLabel === 'always';
      }
      _hasOutline() {
        return this.appearance === 'outline';
      }
      _forceDisplayInfixLabel() {
        return (
          !this._platform.isBrowser &&
          this._prefixChildren.length &&
          !this._shouldLabelFloat()
        );
      }
      _hasFloatingLabel() {
        return !!this._labelChildNonStatic || !!this._labelChildStatic;
      }
      _shouldLabelFloat() {
        return this._control.shouldLabelFloat || this._shouldAlwaysFloat();
      }
      _shouldForward(n) {
        let r = this._control ? this._control.ngControl : null;
        return r && r[n];
      }
      _getDisplayedMessages() {
        return this._errorChildren &&
          this._errorChildren.length > 0 &&
          this._control.errorState
          ? 'error'
          : 'hint';
      }
      _handleLabelResized() {
        this._refreshOutlineNotchWidth();
      }
      _refreshOutlineNotchWidth() {
        !this._hasOutline() || !this._floatingLabel || !this._shouldLabelFloat()
          ? this._notchedOutline?._setNotchWidth(0)
          : this._notchedOutline?._setNotchWidth(
              this._floatingLabel.getWidth()
            );
      }
      _processHints() {
        this._validateHints(), this._syncDescribedByIds();
      }
      _validateHints() {
        this._hintChildren;
      }
      _syncDescribedByIds() {
        if (this._control) {
          let n = [];
          if (
            (this._control.userAriaDescribedBy &&
              typeof this._control.userAriaDescribedBy == 'string' &&
              n.push(...this._control.userAriaDescribedBy.split(' ')),
            this._getDisplayedMessages() === 'hint')
          ) {
            let r = this._hintChildren
                ? this._hintChildren.find((s) => s.align === 'start')
                : null,
              o = this._hintChildren
                ? this._hintChildren.find((s) => s.align === 'end')
                : null;
            r ? n.push(r.id) : this._hintLabel && n.push(this._hintLabelId),
              o && n.push(o.id);
          } else
            this._errorChildren &&
              n.push(...this._errorChildren.map((r) => r.id));
          this._control.setDescribedByIds(n);
        }
      }
      _updateOutlineLabelOffset() {
        if (
          !this._platform.isBrowser ||
          !this._hasOutline() ||
          !this._floatingLabel
        )
          return;
        let n = this._floatingLabel.element;
        if (!(this._iconPrefixContainer || this._textPrefixContainer)) {
          n.style.transform = '';
          return;
        }
        if (!this._isAttachedToDom()) {
          this._needsOutlineLabelOffsetUpdateOnStable = !0;
          return;
        }
        let r = this._iconPrefixContainer?.nativeElement,
          o = this._textPrefixContainer?.nativeElement,
          s = r?.getBoundingClientRect().width ?? 0,
          a = o?.getBoundingClientRect().width ?? 0,
          c = this._dir.value === 'rtl' ? '-1' : '1',
          l = `${s + a}px`,
          u = `calc(${c} * (${l} + var(--mat-mdc-form-field-label-offset-x, 0px)))`;
        n.style.transform = `var(
        --mat-mdc-form-field-label-transform,
        ${RF} translateX(${u})
    )`;
      }
      _isAttachedToDom() {
        let n = this._elementRef.nativeElement;
        if (n.getRootNode) {
          let r = n.getRootNode();
          return r && r !== n;
        }
        return document.documentElement.contains(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(
        p(z),
        p(ze),
        p(I),
        p(cl),
        p(Ae),
        p(kF, 8),
        p($e, 8),
        p(ne)
      );
    }),
      (e.ɵcmp = De({
        type: e,
        selectors: [['mat-form-field']],
        contentQueries: function (r, o, s) {
          if (
            (r & 1 &&
              (mt(s, bl, 5),
              mt(s, bl, 7),
              mt(s, Qh, 5),
              mt(s, IF, 5),
              mt(s, MF, 5),
              mt(s, CF, 5),
              mt(s, mx, 5)),
            r & 2)
          ) {
            let a;
            J((a = ee())) && (o._labelChildNonStatic = a.first),
              J((a = ee())) && (o._labelChildStatic = a.first),
              J((a = ee())) && (o._formFieldControl = a.first),
              J((a = ee())) && (o._prefixChildren = a),
              J((a = ee())) && (o._suffixChildren = a),
              J((a = ee())) && (o._errorChildren = a),
              J((a = ee())) && (o._hintChildren = a);
          }
        },
        viewQuery: function (r, o) {
          if (
            (r & 1 &&
              (ke(nF, 5),
              ke(iF, 5),
              ke(rF, 5),
              ke(px, 5),
              ke(vx, 5),
              ke(bx, 5)),
            r & 2)
          ) {
            let s;
            J((s = ee())) && (o._textField = s.first),
              J((s = ee())) && (o._iconPrefixContainer = s.first),
              J((s = ee())) && (o._textPrefixContainer = s.first),
              J((s = ee())) && (o._floatingLabel = s.first),
              J((s = ee())) && (o._notchedOutline = s.first),
              J((s = ee())) && (o._lineRipple = s.first);
          }
        },
        hostAttrs: [1, 'mat-mdc-form-field'],
        hostVars: 42,
        hostBindings: function (r, o) {
          r & 2 &&
            X('mat-mdc-form-field-label-always-float', o._shouldAlwaysFloat())(
              'mat-mdc-form-field-has-icon-prefix',
              o._hasIconPrefix
            )('mat-mdc-form-field-has-icon-suffix', o._hasIconSuffix)(
              'mat-form-field-invalid',
              o._control.errorState
            )('mat-form-field-disabled', o._control.disabled)(
              'mat-form-field-autofilled',
              o._control.autofilled
            )(
              'mat-form-field-no-animations',
              o._animationMode === 'NoopAnimations'
            )('mat-form-field-appearance-fill', o.appearance == 'fill')(
              'mat-form-field-appearance-outline',
              o.appearance == 'outline'
            )(
              'mat-form-field-hide-placeholder',
              o._hasFloatingLabel() && !o._shouldLabelFloat()
            )('mat-focused', o._control.focused)(
              'mat-primary',
              o.color !== 'accent' && o.color !== 'warn'
            )('mat-accent', o.color === 'accent')(
              'mat-warn',
              o.color === 'warn'
            )('ng-untouched', o._shouldForward('untouched'))(
              'ng-touched',
              o._shouldForward('touched')
            )('ng-pristine', o._shouldForward('pristine'))(
              'ng-dirty',
              o._shouldForward('dirty')
            )('ng-valid', o._shouldForward('valid'))(
              'ng-invalid',
              o._shouldForward('invalid')
            )('ng-pending', o._shouldForward('pending'));
        },
        inputs: {
          hideRequiredMarker: 'hideRequiredMarker',
          color: 'color',
          floatLabel: 'floatLabel',
          appearance: 'appearance',
          subscriptSizing: 'subscriptSizing',
          hintLabel: 'hintLabel',
        },
        exportAs: ['matFormField'],
        features: [
          Pe([
            { provide: Zh, useExisting: e },
            { provide: wx, useExisting: e },
          ]),
        ],
        ngContentSelectors: EF,
        decls: 18,
        vars: 21,
        consts: [
          ['labelTemplate', ''],
          [1, 'mat-mdc-text-field-wrapper', 'mdc-text-field', 3, 'click'],
          ['textField', ''],
          ['class', 'mat-mdc-form-field-focus-overlay'],
          [1, 'mat-mdc-form-field-flex'],
          [
            'matFormFieldNotchedOutline',
            '',
            3,
            'matFormFieldNotchedOutlineOpen',
          ],
          ['class', 'mat-mdc-form-field-icon-prefix'],
          ['class', 'mat-mdc-form-field-text-prefix'],
          [1, 'mat-mdc-form-field-infix'],
          [3, 'ngTemplateOutlet'],
          ['class', 'mat-mdc-form-field-text-suffix'],
          ['class', 'mat-mdc-form-field-icon-suffix'],
          ['matFormFieldLineRipple', ''],
          [
            1,
            'mat-mdc-form-field-subscript-wrapper',
            'mat-mdc-form-field-bottom-align',
          ],
          [
            'matFormFieldFloatingLabel',
            '',
            3,
            'floating',
            'monitorResize',
            'id',
          ],
          [
            'aria-hidden',
            'true',
            'class',
            'mat-mdc-form-field-required-marker mdc-floating-label--required',
          ],
          [
            'aria-hidden',
            'true',
            1,
            'mat-mdc-form-field-required-marker',
            'mdc-floating-label--required',
          ],
          [1, 'mat-mdc-form-field-focus-overlay'],
          [1, 'mat-mdc-form-field-icon-prefix'],
          ['iconPrefixContainer', ''],
          [1, 'mat-mdc-form-field-text-prefix'],
          ['textPrefixContainer', ''],
          [1, 'mat-mdc-form-field-text-suffix'],
          [1, 'mat-mdc-form-field-icon-suffix'],
          [1, 'mat-mdc-form-field-error-wrapper'],
          [1, 'mat-mdc-form-field-hint-wrapper'],
          [3, 'id'],
          [1, 'mat-mdc-form-field-hint-spacer'],
        ],
        template: function (r, o) {
          if (
            (r & 1 &&
              (Je(wF),
              _e(0, aF, 1, 1, 'ng-template', null, 0, I_),
              S(2, 'div', 1, 2),
              ye('click', function (a) {
                return o._control.onContainerClick(a);
              }),
              _e(4, cF, 1, 0, 'div', 3),
              S(5, 'div', 4),
              _e(6, uF, 2, 2, 'div', 5)(7, fF, 3, 0, 'div', 6)(
                8,
                hF,
                3,
                0,
                'div',
                7
              ),
              S(9, 'div', 8),
              _e(10, pF, 1, 1, null, 9),
              oe(11),
              k(),
              _e(12, gF, 2, 0, 'div', 10)(13, bF, 2, 0, 'div', 11),
              k(),
              _e(14, vF, 1, 0, 'div', 12),
              k(),
              S(15, 'div', 13),
              _e(16, _F, 2, 1)(17, xF, 5, 2),
              k()),
            r & 2)
          ) {
            let s;
            W(2),
              X('mdc-text-field--filled', !o._hasOutline())(
                'mdc-text-field--outlined',
                o._hasOutline()
              )('mdc-text-field--no-label', !o._hasFloatingLabel())(
                'mdc-text-field--disabled',
                o._control.disabled
              )('mdc-text-field--invalid', o._control.errorState),
              W(2),
              Te(4, !o._hasOutline() && !o._control.disabled ? 4 : -1),
              W(2),
              Te(6, o._hasOutline() ? 6 : -1),
              W(1),
              Te(7, o._hasIconPrefix ? 7 : -1),
              W(1),
              Te(8, o._hasTextPrefix ? 8 : -1),
              W(2),
              Te(10, !o._hasOutline() || o._forceDisplayInfixLabel() ? 10 : -1),
              W(2),
              Te(12, o._hasTextSuffix ? 12 : -1),
              W(1),
              Te(13, o._hasIconSuffix ? 13 : -1),
              W(1),
              Te(14, o._hasOutline() ? -1 : 14),
              W(1),
              X(
                'mat-mdc-form-field-subscript-dynamic-size',
                o.subscriptSizing === 'dynamic'
              ),
              W(1),
              Te(
                16,
                (s = o._getDisplayedMessages()) === 'error'
                  ? 16
                  : s === 'hint'
                  ? 17
                  : -1
              );
          }
        },
        dependencies: [B_, mx, px, vx, bx],
        styles: [
          '.mdc-text-field{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0;display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-text-field__input{height:28px;width:100%;min-width:0;border:none;border-radius:0;background:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}@media all{.mdc-text-field__input::placeholder{opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{opacity:0}}@media all{.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{opacity:1}}@media all{.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{opacity:1}}.mdc-text-field__affix{height:28px;opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}@supports(-webkit-hyphens: none){.mdc-text-field--outlined .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field--filled{height:56px}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}@supports(-webkit-hyphens: none){.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px,var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px,var(--mdc-shape-small, 4px))*2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px,var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px,var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px,var(--mdc-shape-small, 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px,var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:rgba(0,0,0,0)}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mdc-text-field--textarea{flex-direction:column;align-items:center;width:auto;height:auto;padding:0}.mdc-text-field--textarea .mdc-floating-label{top:19px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--filled::before{display:none}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-10.25px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input{margin-top:23px;margin-bottom:9px}.mdc-text-field--textarea.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label{top:18px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:"";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both}.mdc-text-field--filled .mdc-text-field__resizer{transform:translateY(-1px)}.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateY(1px)}.mdc-text-field--outlined .mdc-text-field__resizer{transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{transform:translateX(-1px) translateY(1px)}.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 64px/0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field--with-trailing-icon,.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 64px/0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 96px/0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}@media screen and (forced-colors: active){.mdc-text-field--disabled .mdc-text-field__input{background-color:Window}.mdc-text-field--disabled .mdc-floating-label{z-index:1}}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--disabled.mdc-text-field--filled .mdc-text-field__ripple{display:none}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-floating-label{position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after,.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;pointer-events:none}.mdc-notched-outline__trailing{flex-grow:1}.mdc-notched-outline__notch{flex:0 0 auto;width:auto}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:133.3333333333%}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{z-index:1}.mdc-line-ripple::after{transform:scaleX(0);opacity:0;z-index:2}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{border-top:1px solid;border-bottom:1px solid}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{max-width:calc(100% - 12px*2)}.mdc-line-ripple::before{border-bottom-width:1px}.mdc-line-ripple::after{border-bottom-width:2px}.mdc-text-field--filled{border-top-left-radius:var(--mdc-filled-text-field-container-shape);border-top-right-radius:var(--mdc-filled-text-field-container-shape);border-bottom-right-radius:0;border-bottom-left-radius:0}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-filled-text-field-caret-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-filled-text-field-error-caret-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-filled-text-field-input-text-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-filled-text-field-disabled-input-text-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-label-text-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-focus-label-text-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-disabled-label-text-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-error-label-text-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-error-focus-label-text-color)}.mdc-text-field--filled .mdc-floating-label{font-family:var(--mdc-filled-text-field-label-text-font);font-size:var(--mdc-filled-text-field-label-text-size);font-weight:var(--mdc-filled-text-field-label-text-weight);letter-spacing:var(--mdc-filled-text-field-label-text-tracking)}@media all{.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}}@media all{.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:var(--mdc-filled-text-field-container-color)}.mdc-text-field--filled.mdc-text-field--disabled{background-color:var(--mdc-filled-text-field-disabled-container-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-active-indicator-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-hover-active-indicator-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-focus-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-disabled-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-hover-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-error-focus-active-indicator-color)}.mdc-text-field--filled .mdc-line-ripple::before{border-bottom-width:var(--mdc-filled-text-field-active-indicator-height)}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-width:var(--mdc-filled-text-field-focus-active-indicator-height)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-outlined-text-field-caret-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-outlined-text-field-error-caret-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-outlined-text-field-input-text-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-outlined-text-field-disabled-input-text-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-label-text-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-focus-label-text-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-disabled-label-text-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-error-label-text-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-error-focus-label-text-color)}.mdc-text-field--outlined .mdc-floating-label{font-family:var(--mdc-outlined-text-field-label-text-font);font-size:var(--mdc-outlined-text-field-label-text-size);font-weight:var(--mdc-outlined-text-field-label-text-weight);letter-spacing:var(--mdc-outlined-text-field-label-text-tracking)}@media all{.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color)}}@media all{.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:var(--mdc-outlined-text-field-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px,var(--mdc-outlined-text-field-container-shape))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px,var(--mdc-outlined-text-field-container-shape))*2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:var(--mdc-outlined-text-field-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px,var(--mdc-outlined-text-field-container-shape))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-hover-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-focus-outline-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-disabled-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-hover-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-focus-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__trailing{border-width:var(--mdc-outlined-text-field-outline-width)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:var(--mdc-outlined-text-field-focus-outline-width)}.mat-mdc-form-field-textarea-control{vertical-align:middle;resize:vertical;box-sizing:border-box;height:auto;margin:0;padding:0;border:none;overflow:auto}.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font:inherit;letter-spacing:inherit;text-decoration:inherit;text-transform:inherit;border:none}.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;line-height:normal;pointer-events:all}.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label{cursor:inherit}.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control{height:auto}.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color]{height:23px}.mat-mdc-text-field-wrapper{height:auto;flex:auto}.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-left:0;--mat-mdc-form-field-label-offset-x: -16px}.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-right:0}[dir=rtl] .mat-mdc-text-field-wrapper{padding-left:16px;padding-right:16px}[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-left:0}[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-right:0}.mat-form-field-disabled .mdc-text-field__input::placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label{left:auto;right:auto}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input{display:inline-block}.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch{padding-top:0}.mat-mdc-text-field-wrapper::before{content:none}.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:1px solid rgba(0,0,0,0)}[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:none;border-right:1px solid rgba(0,0,0,0)}.mat-mdc-form-field-subscript-wrapper{box-sizing:border-box;width:100%;position:relative}.mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-error-wrapper{position:absolute;top:0;left:0;right:0;padding:0 16px}.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper{position:static}.mat-mdc-form-field-bottom-align::before{content:"";display:inline-block;height:16px}.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before{content:unset}.mat-mdc-form-field-hint-end{order:1}.mat-mdc-form-field-hint-wrapper{display:flex}.mat-mdc-form-field-hint-spacer{flex:1 0 1em}.mat-mdc-form-field-error{display:block;color:var(--mat-form-field-error-text-color)}.mat-mdc-form-field-subscript-wrapper,.mat-mdc-form-field-bottom-align::before{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-subscript-text-font);line-height:var(--mat-form-field-subscript-text-line-height);font-size:var(--mat-form-field-subscript-text-size);letter-spacing:var(--mat-form-field-subscript-text-tracking);font-weight:var(--mat-form-field-subscript-text-weight)}.mat-mdc-form-field-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;opacity:0;pointer-events:none;background-color:var(--mat-form-field-state-layer-color)}.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-hover-state-layer-opacity)}.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-focus-state-layer-opacity)}select.mat-mdc-form-field-input-control{-moz-appearance:none;-webkit-appearance:none;background-color:rgba(0,0,0,0);display:inline-flex;box-sizing:border-box}select.mat-mdc-form-field-input-control:not(:disabled){cursor:pointer}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option{color:var(--mat-form-field-select-option-text-color)}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled{color:var(--mat-form-field-select-disabled-option-text-color)}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;position:absolute;right:0;top:50%;margin-top:-2.5px;pointer-events:none;color:var(--mat-form-field-enabled-select-arrow-color)}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{right:auto;left:0}.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after{color:var(--mat-form-field-focus-select-arrow-color)}.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after{color:var(--mat-form-field-disabled-select-arrow-color)}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:15px}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:0;padding-left:15px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper{outline:solid 1px}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper{outline-color:GrayText}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper{outline:dashed 3px}.cdk-high-contrast-active .mat-mdc-form-field.mat-focused .mdc-notched-outline{border:dashed 3px}.mat-mdc-form-field-input-control[type=date],.mat-mdc-form-field-input-control[type=datetime],.mat-mdc-form-field-input-control[type=datetime-local],.mat-mdc-form-field-input-control[type=month],.mat-mdc-form-field-input-control[type=week],.mat-mdc-form-field-input-control[type=time]{line-height:1}.mat-mdc-form-field-input-control::-webkit-datetime-edit{line-height:1;padding:0;margin-bottom:-2px}.mat-mdc-form-field{--mat-mdc-form-field-floating-label-scale: 0.75;display:inline-flex;flex-direction:column;min-width:0;text-align:left;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-container-text-font);line-height:var(--mat-form-field-container-text-line-height);font-size:var(--mat-form-field-container-text-size);letter-spacing:var(--mat-form-field-container-text-tracking);font-weight:var(--mat-form-field-container-text-weight)}[dir=rtl] .mat-mdc-form-field{text-align:right}.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above{font-size:calc(var(--mat-form-field-outlined-label-text-populated-size)*var(--mat-mdc-form-field-floating-label-scale))}.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:var(--mat-form-field-outlined-label-text-populated-size)}.mat-mdc-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-mdc-text-field-wrapper{width:100%}.mat-mdc-form-field-icon-prefix,.mat-mdc-form-field-icon-suffix{align-self:center;line-height:0;pointer-events:auto;position:relative;z-index:1}.mat-mdc-form-field-icon-prefix,[dir=rtl] .mat-mdc-form-field-icon-suffix{padding:0 4px 0 0}.mat-mdc-form-field-icon-suffix,[dir=rtl] .mat-mdc-form-field-icon-prefix{padding:0 0 0 4px}.mat-mdc-form-field-icon-prefix>.mat-icon,.mat-mdc-form-field-icon-suffix>.mat-icon{padding:12px;box-sizing:content-box}.mat-mdc-form-field-subscript-wrapper .mat-icon,.mat-mdc-form-field label .mat-icon{width:1em;height:1em;font-size:inherit}.mat-mdc-form-field-infix{flex:auto;min-width:0;width:180px;position:relative;box-sizing:border-box}.mat-mdc-form-field .mdc-notched-outline__notch{margin-left:-1px;-webkit-clip-path:inset(-9em -999em -9em 1px);clip-path:inset(-9em -999em -9em 1px)}[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch{margin-left:0;margin-right:-1px;-webkit-clip-path:inset(-9em 1px -9em -999em);clip-path:inset(-9em 1px -9em -999em)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input{transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms}}@media all{.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__affix{transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea{transition:none}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}}[dir=rtl] .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-floating-label{transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-notched-outline .mdc-floating-label{max-width:calc(100% + 1px)}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(133.3333333333% + 1px)}',
        ],
        encapsulation: 2,
        data: { animation: [TF.transitionMessages] },
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })(),
  Jo = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = V({ type: e })),
      (e.ɵinj = L({ imports: [Ie, Af, S0, Ie] }));
    let t = e;
    return t;
  })();
var NF = ['*'],
  vl;
function OF() {
  if (vl === void 0 && ((vl = null), typeof window < 'u')) {
    let t = window;
    t.trustedTypes !== void 0 &&
      (vl = t.trustedTypes.createPolicy('angular#components', {
        createHTML: (e) => e,
      }));
  }
  return vl;
}
function es(t) {
  return OF()?.createHTML(t) || t;
}
function Cx(t) {
  return Error(`Unable to find icon with the name "${t}"`);
}
function PF() {
  return Error(
    'Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports.'
  );
}
function Dx(t) {
  return Error(
    `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`
  );
}
function Ix(t) {
  return Error(
    `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`
  );
}
var En = class {
    constructor(e, i, n) {
      (this.url = e), (this.svgText = i), (this.options = n);
    }
  },
  LF = (() => {
    let e = class e {
      constructor(n, r, o, s) {
        (this._httpClient = n),
          (this._sanitizer = r),
          (this._errorHandler = s),
          (this._svgIconConfigs = new Map()),
          (this._iconSetConfigs = new Map()),
          (this._cachedIconsByUrl = new Map()),
          (this._inProgressUrlFetches = new Map()),
          (this._fontCssClassesByAlias = new Map()),
          (this._resolvers = []),
          (this._defaultFontSetClass = ['material-icons', 'mat-ligature-font']),
          (this._document = o);
      }
      addSvgIcon(n, r, o) {
        return this.addSvgIconInNamespace('', n, r, o);
      }
      addSvgIconLiteral(n, r, o) {
        return this.addSvgIconLiteralInNamespace('', n, r, o);
      }
      addSvgIconInNamespace(n, r, o, s) {
        return this._addSvgIconConfig(n, r, new En(o, null, s));
      }
      addSvgIconResolver(n) {
        return this._resolvers.push(n), this;
      }
      addSvgIconLiteralInNamespace(n, r, o, s) {
        let a = this._sanitizer.sanitize(ot.HTML, o);
        if (!a) throw Ix(o);
        let c = es(a);
        return this._addSvgIconConfig(n, r, new En('', c, s));
      }
      addSvgIconSet(n, r) {
        return this.addSvgIconSetInNamespace('', n, r);
      }
      addSvgIconSetLiteral(n, r) {
        return this.addSvgIconSetLiteralInNamespace('', n, r);
      }
      addSvgIconSetInNamespace(n, r, o) {
        return this._addSvgIconSetConfig(n, new En(r, null, o));
      }
      addSvgIconSetLiteralInNamespace(n, r, o) {
        let s = this._sanitizer.sanitize(ot.HTML, r);
        if (!s) throw Ix(r);
        let a = es(s);
        return this._addSvgIconSetConfig(n, new En('', a, o));
      }
      registerFontClassAlias(n, r = n) {
        return this._fontCssClassesByAlias.set(n, r), this;
      }
      classNameForFontAlias(n) {
        return this._fontCssClassesByAlias.get(n) || n;
      }
      setDefaultFontSetClass(...n) {
        return (this._defaultFontSetClass = n), this;
      }
      getDefaultFontSetClass() {
        return this._defaultFontSetClass;
      }
      getSvgIconFromUrl(n) {
        let r = this._sanitizer.sanitize(ot.RESOURCE_URL, n);
        if (!r) throw Dx(n);
        let o = this._cachedIconsByUrl.get(r);
        return o
          ? M(_l(o))
          : this._loadSvgIconFromConfig(new En(n, null)).pipe(
              Ee((s) => this._cachedIconsByUrl.set(r, s)),
              A((s) => _l(s))
            );
      }
      getNamedSvgIcon(n, r = '') {
        let o = Mx(r, n),
          s = this._svgIconConfigs.get(o);
        if (s) return this._getSvgFromConfig(s);
        if (((s = this._getIconConfigFromResolvers(r, n)), s))
          return this._svgIconConfigs.set(o, s), this._getSvgFromConfig(s);
        let a = this._iconSetConfigs.get(r);
        return a ? this._getSvgFromIconSetConfigs(n, a) : Mn(Cx(o));
      }
      ngOnDestroy() {
        (this._resolvers = []),
          this._svgIconConfigs.clear(),
          this._iconSetConfigs.clear(),
          this._cachedIconsByUrl.clear();
      }
      _getSvgFromConfig(n) {
        return n.svgText
          ? M(_l(this._svgElementFromConfig(n)))
          : this._loadSvgIconFromConfig(n).pipe(A((r) => _l(r)));
      }
      _getSvgFromIconSetConfigs(n, r) {
        let o = this._extractIconWithNameFromAnySet(n, r);
        if (o) return M(o);
        let s = r
          .filter((a) => !a.svgText)
          .map((a) =>
            this._loadSvgIconSetFromConfig(a).pipe(
              Wt((c) => {
                let d = `Loading icon set URL: ${this._sanitizer.sanitize(
                  ot.RESOURCE_URL,
                  a.url
                )} failed: ${c.message}`;
                return this._errorHandler.handleError(new Error(d)), M(null);
              })
            )
          );
        return Qr(s).pipe(
          A(() => {
            let a = this._extractIconWithNameFromAnySet(n, r);
            if (!a) throw Cx(n);
            return a;
          })
        );
      }
      _extractIconWithNameFromAnySet(n, r) {
        for (let o = r.length - 1; o >= 0; o--) {
          let s = r[o];
          if (s.svgText && s.svgText.toString().indexOf(n) > -1) {
            let a = this._svgElementFromConfig(s),
              c = this._extractSvgIconFromSet(a, n, s.options);
            if (c) return c;
          }
        }
        return null;
      }
      _loadSvgIconFromConfig(n) {
        return this._fetchIcon(n).pipe(
          Ee((r) => (n.svgText = r)),
          A(() => this._svgElementFromConfig(n))
        );
      }
      _loadSvgIconSetFromConfig(n) {
        return n.svgText
          ? M(null)
          : this._fetchIcon(n).pipe(Ee((r) => (n.svgText = r)));
      }
      _extractSvgIconFromSet(n, r, o) {
        let s = n.querySelector(`[id="${r}"]`);
        if (!s) return null;
        let a = s.cloneNode(!0);
        if ((a.removeAttribute('id'), a.nodeName.toLowerCase() === 'svg'))
          return this._setSvgAttributes(a, o);
        if (a.nodeName.toLowerCase() === 'symbol')
          return this._setSvgAttributes(this._toSvgElement(a), o);
        let c = this._svgElementFromString(es('<svg></svg>'));
        return c.appendChild(a), this._setSvgAttributes(c, o);
      }
      _svgElementFromString(n) {
        let r = this._document.createElement('DIV');
        r.innerHTML = n;
        let o = r.querySelector('svg');
        if (!o) throw Error('<svg> tag not found');
        return o;
      }
      _toSvgElement(n) {
        let r = this._svgElementFromString(es('<svg></svg>')),
          o = n.attributes;
        for (let s = 0; s < o.length; s++) {
          let { name: a, value: c } = o[s];
          a !== 'id' && r.setAttribute(a, c);
        }
        for (let s = 0; s < n.childNodes.length; s++)
          n.childNodes[s].nodeType === this._document.ELEMENT_NODE &&
            r.appendChild(n.childNodes[s].cloneNode(!0));
        return r;
      }
      _setSvgAttributes(n, r) {
        return (
          n.setAttribute('fit', ''),
          n.setAttribute('height', '100%'),
          n.setAttribute('width', '100%'),
          n.setAttribute('preserveAspectRatio', 'xMidYMid meet'),
          n.setAttribute('focusable', 'false'),
          r && r.viewBox && n.setAttribute('viewBox', r.viewBox),
          n
        );
      }
      _fetchIcon(n) {
        let { url: r, options: o } = n,
          s = o?.withCredentials ?? !1;
        if (!this._httpClient) throw PF();
        if (r == null) throw Error(`Cannot fetch icon from URL "${r}".`);
        let a = this._sanitizer.sanitize(ot.RESOURCE_URL, r);
        if (!a) throw Dx(r);
        let c = this._inProgressUrlFetches.get(a);
        if (c) return c;
        let l = this._httpClient
          .get(a, { responseType: 'text', withCredentials: s })
          .pipe(
            A((d) => es(d)),
            An(() => this._inProgressUrlFetches.delete(a)),
            Zr()
          );
        return this._inProgressUrlFetches.set(a, l), l;
      }
      _addSvgIconConfig(n, r, o) {
        return this._svgIconConfigs.set(Mx(n, r), o), this;
      }
      _addSvgIconSetConfig(n, r) {
        let o = this._iconSetConfigs.get(n);
        return o ? o.push(r) : this._iconSetConfigs.set(n, [r]), this;
      }
      _svgElementFromConfig(n) {
        if (!n.svgElement) {
          let r = this._svgElementFromString(n.svgText);
          this._setSvgAttributes(r, n.options), (n.svgElement = r);
        }
        return n.svgElement;
      }
      _getIconConfigFromResolvers(n, r) {
        for (let o = 0; o < this._resolvers.length; o++) {
          let s = this._resolvers[o](r, n);
          if (s)
            return VF(s) ? new En(s.url, null, s.options) : new En(s, null);
        }
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(ey, 8), v(No), v(ne, 8), v(dt));
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })();
function _l(t) {
  return t.cloneNode(!0);
}
function Mx(t, e) {
  return t + ':' + e;
}
function VF(t) {
  return !!(t.url && t.options);
}
var jF = dl(
    class {
      constructor(t) {
        this._elementRef = t;
      }
    }
  ),
  BF = new w('MAT_ICON_DEFAULT_OPTIONS'),
  UF = new w('mat-icon-location', { providedIn: 'root', factory: HF });
function HF() {
  let t = b(ne),
    e = t ? t.location : null;
  return { getPathname: () => (e ? e.pathname + e.search : '') };
}
var Sx = [
    'clip-path',
    'color-profile',
    'src',
    'cursor',
    'fill',
    'filter',
    'marker',
    'marker-start',
    'marker-mid',
    'marker-end',
    'mask',
    'stroke',
  ],
  $F = Sx.map((t) => `[${t}]`).join(', '),
  zF = /^url\(['"]?#(.*?)['"]?\)$/,
  Tx = (() => {
    let e = class e extends jF {
      get inline() {
        return this._inline;
      }
      set inline(n) {
        this._inline = Be(n);
      }
      get svgIcon() {
        return this._svgIcon;
      }
      set svgIcon(n) {
        n !== this._svgIcon &&
          (n
            ? this._updateSvgIcon(n)
            : this._svgIcon && this._clearSvgElement(),
          (this._svgIcon = n));
      }
      get fontSet() {
        return this._fontSet;
      }
      set fontSet(n) {
        let r = this._cleanupFontValue(n);
        r !== this._fontSet &&
          ((this._fontSet = r), this._updateFontIconClasses());
      }
      get fontIcon() {
        return this._fontIcon;
      }
      set fontIcon(n) {
        let r = this._cleanupFontValue(n);
        r !== this._fontIcon &&
          ((this._fontIcon = r), this._updateFontIconClasses());
      }
      constructor(n, r, o, s, a, c) {
        super(n),
          (this._iconRegistry = r),
          (this._location = s),
          (this._errorHandler = a),
          (this._inline = !1),
          (this._previousFontSetClass = []),
          (this._currentIconFetch = be.EMPTY),
          c &&
            (c.color && (this.color = this.defaultColor = c.color),
            c.fontSet && (this.fontSet = c.fontSet)),
          o || n.nativeElement.setAttribute('aria-hidden', 'true');
      }
      _splitIconName(n) {
        if (!n) return ['', ''];
        let r = n.split(':');
        switch (r.length) {
          case 1:
            return ['', r[0]];
          case 2:
            return r;
          default:
            throw Error(`Invalid icon name: "${n}"`);
        }
      }
      ngOnInit() {
        this._updateFontIconClasses();
      }
      ngAfterViewChecked() {
        let n = this._elementsWithExternalReferences;
        if (n && n.size) {
          let r = this._location.getPathname();
          r !== this._previousPath &&
            ((this._previousPath = r), this._prependPathToReferences(r));
        }
      }
      ngOnDestroy() {
        this._currentIconFetch.unsubscribe(),
          this._elementsWithExternalReferences &&
            this._elementsWithExternalReferences.clear();
      }
      _usingFontIcon() {
        return !this.svgIcon;
      }
      _setSvgElement(n) {
        this._clearSvgElement();
        let r = this._location.getPathname();
        (this._previousPath = r),
          this._cacheChildrenWithExternalReferences(n),
          this._prependPathToReferences(r),
          this._elementRef.nativeElement.appendChild(n);
      }
      _clearSvgElement() {
        let n = this._elementRef.nativeElement,
          r = n.childNodes.length;
        for (
          this._elementsWithExternalReferences &&
          this._elementsWithExternalReferences.clear();
          r--;

        ) {
          let o = n.childNodes[r];
          (o.nodeType !== 1 || o.nodeName.toLowerCase() === 'svg') &&
            o.remove();
        }
      }
      _updateFontIconClasses() {
        if (!this._usingFontIcon()) return;
        let n = this._elementRef.nativeElement,
          r = (
            this.fontSet
              ? this._iconRegistry
                  .classNameForFontAlias(this.fontSet)
                  .split(/ +/)
              : this._iconRegistry.getDefaultFontSetClass()
          ).filter((o) => o.length > 0);
        this._previousFontSetClass.forEach((o) => n.classList.remove(o)),
          r.forEach((o) => n.classList.add(o)),
          (this._previousFontSetClass = r),
          this.fontIcon !== this._previousFontIconClass &&
            !r.includes('mat-ligature-font') &&
            (this._previousFontIconClass &&
              n.classList.remove(this._previousFontIconClass),
            this.fontIcon && n.classList.add(this.fontIcon),
            (this._previousFontIconClass = this.fontIcon));
      }
      _cleanupFontValue(n) {
        return typeof n == 'string' ? n.trim().split(' ')[0] : n;
      }
      _prependPathToReferences(n) {
        let r = this._elementsWithExternalReferences;
        r &&
          r.forEach((o, s) => {
            o.forEach((a) => {
              s.setAttribute(a.name, `url('${n}#${a.value}')`);
            });
          });
      }
      _cacheChildrenWithExternalReferences(n) {
        let r = n.querySelectorAll($F),
          o = (this._elementsWithExternalReferences =
            this._elementsWithExternalReferences || new Map());
        for (let s = 0; s < r.length; s++)
          Sx.forEach((a) => {
            let c = r[s],
              l = c.getAttribute(a),
              d = l ? l.match(zF) : null;
            if (d) {
              let u = o.get(c);
              u || ((u = []), o.set(c, u)), u.push({ name: a, value: d[1] });
            }
          });
      }
      _updateSvgIcon(n) {
        if (
          ((this._svgNamespace = null),
          (this._svgName = null),
          this._currentIconFetch.unsubscribe(),
          n)
        ) {
          let [r, o] = this._splitIconName(n);
          r && (this._svgNamespace = r),
            o && (this._svgName = o),
            (this._currentIconFetch = this._iconRegistry
              .getNamedSvgIcon(o, r)
              .pipe(at(1))
              .subscribe(
                (s) => this._setSvgElement(s),
                (s) => {
                  let a = `Error retrieving icon ${r}:${o}! ${s.message}`;
                  this._errorHandler.handleError(new Error(a));
                }
              ));
        }
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(
        p(z),
        p(LF),
        mn('aria-hidden'),
        p(UF),
        p(dt),
        p(BF, 8)
      );
    }),
      (e.ɵcmp = De({
        type: e,
        selectors: [['mat-icon']],
        hostAttrs: ['role', 'img', 1, 'mat-icon', 'notranslate'],
        hostVars: 8,
        hostBindings: function (r, o) {
          r & 2 &&
            (pe('data-mat-icon-type', o._usingFontIcon() ? 'font' : 'svg')(
              'data-mat-icon-name',
              o._svgName || o.fontIcon
            )('data-mat-icon-namespace', o._svgNamespace || o.fontSet)(
              'fontIcon',
              o._usingFontIcon() ? o.fontIcon : null
            ),
            X('mat-icon-inline', o.inline)(
              'mat-icon-no-color',
              o.color !== 'primary' &&
                o.color !== 'accent' &&
                o.color !== 'warn'
            ));
        },
        inputs: {
          color: 'color',
          inline: 'inline',
          svgIcon: 'svgIcon',
          fontSet: 'fontSet',
          fontIcon: 'fontIcon',
        },
        exportAs: ['matIcon'],
        features: [Re],
        ngContentSelectors: NF,
        decls: 1,
        vars: 0,
        template: function (r, o) {
          r & 1 && (Je(), oe(0));
        },
        styles: [
          'mat-icon,mat-icon.mat-primary,mat-icon.mat-accent,mat-icon.mat-warn{color:var(--mat-icon-color)}.mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}',
        ],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })(),
  kx = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = V({ type: e })),
      (e.ɵinj = L({ imports: [Ie, Ie] }));
    let t = e;
    return t;
  })();
var Ax = Qn({ passive: !0 }),
  Rx = (() => {
    let e = class e {
      constructor(n, r) {
        (this._platform = n),
          (this._ngZone = r),
          (this._monitoredElements = new Map());
      }
      monitor(n) {
        if (!this._platform.isBrowser) return Ye;
        let r = nn(n),
          o = this._monitoredElements.get(r);
        if (o) return o.subject;
        let s = new Z(),
          a = 'cdk-text-field-autofilled',
          c = (l) => {
            l.animationName === 'cdk-text-field-autofill-start' &&
            !r.classList.contains(a)
              ? (r.classList.add(a),
                this._ngZone.run(() =>
                  s.next({ target: l.target, isAutofilled: !0 })
                ))
              : l.animationName === 'cdk-text-field-autofill-end' &&
                r.classList.contains(a) &&
                (r.classList.remove(a),
                this._ngZone.run(() =>
                  s.next({ target: l.target, isAutofilled: !1 })
                ));
          };
        return (
          this._ngZone.runOutsideAngular(() => {
            r.addEventListener('animationstart', c, Ax),
              r.classList.add('cdk-text-field-autofill-monitored');
          }),
          this._monitoredElements.set(r, {
            subject: s,
            unlisten: () => {
              r.removeEventListener('animationstart', c, Ax);
            },
          }),
          s
        );
      }
      stopMonitoring(n) {
        let r = nn(n),
          o = this._monitoredElements.get(r);
        o &&
          (o.unlisten(),
          o.subject.complete(),
          r.classList.remove('cdk-text-field-autofill-monitored'),
          r.classList.remove('cdk-text-field-autofilled'),
          this._monitoredElements.delete(r));
      }
      ngOnDestroy() {
        this._monitoredElements.forEach((n, r) => this.stopMonitoring(r));
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(Ae), v(I));
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })();
var Fx = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = V({ type: e })),
    (e.ɵinj = L({}));
  let t = e;
  return t;
})();
var qF = new w('MAT_INPUT_VALUE_ACCESSOR'),
  QF = [
    'button',
    'checkbox',
    'file',
    'hidden',
    'image',
    'radio',
    'range',
    'reset',
    'submit',
  ],
  ZF = 0,
  YF = q0(
    class {
      constructor(t, e, i, n) {
        (this._defaultErrorStateMatcher = t),
          (this._parentForm = e),
          (this._parentFormGroup = i),
          (this.ngControl = n),
          (this.stateChanges = new Z());
      }
    }
  ),
  Nx = (() => {
    let e = class e extends YF {
      get disabled() {
        return this._disabled;
      }
      set disabled(n) {
        (this._disabled = Be(n)),
          this.focused && ((this.focused = !1), this.stateChanges.next());
      }
      get id() {
        return this._id;
      }
      set id(n) {
        this._id = n || this._uid;
      }
      get required() {
        return (
          this._required ??
          this.ngControl?.control?.hasValidator(Tc.required) ??
          !1
        );
      }
      set required(n) {
        this._required = Be(n);
      }
      get type() {
        return this._type;
      }
      set type(n) {
        (this._type = n || 'text'),
          this._validateType(),
          !this._isTextarea &&
            ih().has(this._type) &&
            (this._elementRef.nativeElement.type = this._type);
      }
      get value() {
        return this._inputValueAccessor.value;
      }
      set value(n) {
        n !== this.value &&
          ((this._inputValueAccessor.value = n), this.stateChanges.next());
      }
      get readonly() {
        return this._readonly;
      }
      set readonly(n) {
        this._readonly = Be(n);
      }
      constructor(n, r, o, s, a, c, l, d, u, f) {
        super(c, s, a, o),
          (this._elementRef = n),
          (this._platform = r),
          (this._autofillMonitor = d),
          (this._formField = f),
          (this._uid = `mat-input-${ZF++}`),
          (this.focused = !1),
          (this.stateChanges = new Z()),
          (this.controlType = 'mat-input'),
          (this.autofilled = !1),
          (this._disabled = !1),
          (this._type = 'text'),
          (this._readonly = !1),
          (this._neverEmptyInputTypes = [
            'date',
            'datetime',
            'datetime-local',
            'month',
            'time',
            'week',
          ].filter((g) => ih().has(g))),
          (this._iOSKeyupListener = (g) => {
            let C = g.target;
            !C.value &&
              C.selectionStart === 0 &&
              C.selectionEnd === 0 &&
              (C.setSelectionRange(1, 1), C.setSelectionRange(0, 0));
          });
        let h = this._elementRef.nativeElement,
          m = h.nodeName.toLowerCase();
        (this._inputValueAccessor = l || h),
          (this._previousNativeValue = this.value),
          (this.id = this.id),
          r.IOS &&
            u.runOutsideAngular(() => {
              n.nativeElement.addEventListener('keyup', this._iOSKeyupListener);
            }),
          (this._isServer = !this._platform.isBrowser),
          (this._isNativeSelect = m === 'select'),
          (this._isTextarea = m === 'textarea'),
          (this._isInFormField = !!f),
          this._isNativeSelect &&
            (this.controlType = h.multiple
              ? 'mat-native-select-multiple'
              : 'mat-native-select');
      }
      ngAfterViewInit() {
        this._platform.isBrowser &&
          this._autofillMonitor
            .monitor(this._elementRef.nativeElement)
            .subscribe((n) => {
              (this.autofilled = n.isAutofilled), this.stateChanges.next();
            });
      }
      ngOnChanges() {
        this.stateChanges.next();
      }
      ngOnDestroy() {
        this.stateChanges.complete(),
          this._platform.isBrowser &&
            this._autofillMonitor.stopMonitoring(
              this._elementRef.nativeElement
            ),
          this._platform.IOS &&
            this._elementRef.nativeElement.removeEventListener(
              'keyup',
              this._iOSKeyupListener
            );
      }
      ngDoCheck() {
        this.ngControl &&
          (this.updateErrorState(),
          this.ngControl.disabled !== null &&
            this.ngControl.disabled !== this.disabled &&
            ((this.disabled = this.ngControl.disabled),
            this.stateChanges.next())),
          this._dirtyCheckNativeValue(),
          this._dirtyCheckPlaceholder();
      }
      focus(n) {
        this._elementRef.nativeElement.focus(n);
      }
      _focusChanged(n) {
        n !== this.focused && ((this.focused = n), this.stateChanges.next());
      }
      _onInput() {}
      _dirtyCheckNativeValue() {
        let n = this._elementRef.nativeElement.value;
        this._previousNativeValue !== n &&
          ((this._previousNativeValue = n), this.stateChanges.next());
      }
      _dirtyCheckPlaceholder() {
        let n = this._getPlaceholder();
        if (n !== this._previousPlaceholder) {
          let r = this._elementRef.nativeElement;
          (this._previousPlaceholder = n),
            n
              ? r.setAttribute('placeholder', n)
              : r.removeAttribute('placeholder');
        }
      }
      _getPlaceholder() {
        return this.placeholder || null;
      }
      _validateType() {
        QF.indexOf(this._type) > -1;
      }
      _isNeverEmpty() {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
      }
      _isBadInput() {
        let n = this._elementRef.nativeElement.validity;
        return n && n.badInput;
      }
      get empty() {
        return (
          !this._isNeverEmpty() &&
          !this._elementRef.nativeElement.value &&
          !this._isBadInput() &&
          !this.autofilled
        );
      }
      get shouldLabelFloat() {
        if (this._isNativeSelect) {
          let n = this._elementRef.nativeElement,
            r = n.options[0];
          return (
            this.focused ||
            n.multiple ||
            !this.empty ||
            !!(n.selectedIndex > -1 && r && r.label)
          );
        } else return this.focused || !this.empty;
      }
      setDescribedByIds(n) {
        n.length
          ? this._elementRef.nativeElement.setAttribute(
              'aria-describedby',
              n.join(' ')
            )
          : this._elementRef.nativeElement.removeAttribute('aria-describedby');
      }
      onContainerClick() {
        this.focused || this.focus();
      }
      _isInlineSelect() {
        let n = this._elementRef.nativeElement;
        return this._isNativeSelect && (n.multiple || n.size > 1);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(
        p(z),
        p(Ae),
        p(yn, 10),
        p(Bo, 8),
        p(eh, 8),
        p(Q0),
        p(qF, 10),
        p(Rx),
        p(I),
        p(Zh, 8)
      );
    }),
      (e.ɵdir = q({
        type: e,
        selectors: [
          ['input', 'matInput', ''],
          ['textarea', 'matInput', ''],
          ['select', 'matNativeControl', ''],
          ['input', 'matNativeControl', ''],
          ['textarea', 'matNativeControl', ''],
        ],
        hostAttrs: [1, 'mat-mdc-input-element'],
        hostVars: 18,
        hostBindings: function (r, o) {
          r & 1 &&
            ye('focus', function () {
              return o._focusChanged(!0);
            })('blur', function () {
              return o._focusChanged(!1);
            })('input', function () {
              return o._onInput();
            }),
            r & 2 &&
              (zn('id', o.id)('disabled', o.disabled)('required', o.required),
              pe('name', o.name || null)(
                'readonly',
                (o.readonly && !o._isNativeSelect) || null
              )('aria-invalid', o.empty && o.required ? null : o.errorState)(
                'aria-required',
                o.required
              )('id', o.id),
              X('mat-input-server', o._isServer)(
                'mat-mdc-form-field-textarea-control',
                o._isInFormField && o._isTextarea
              )('mat-mdc-form-field-input-control', o._isInFormField)(
                'mdc-text-field__input',
                o._isInFormField
              )('mat-mdc-native-select-inline', o._isInlineSelect()));
        },
        inputs: {
          disabled: 'disabled',
          id: 'id',
          placeholder: 'placeholder',
          name: 'name',
          required: 'required',
          type: 'type',
          errorStateMatcher: 'errorStateMatcher',
          userAriaDescribedBy: ['aria-describedby', 'userAriaDescribedBy'],
          value: 'value',
          readonly: 'readonly',
        },
        exportAs: ['matInput'],
        features: [Pe([{ provide: Qh, useExisting: e }]), Re, ft],
      }));
    let t = e;
    return t;
  })(),
  Ox = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = V({ type: e })),
      (e.ɵinj = L({ imports: [Ie, Jo, Jo, Fx, Ie] }));
    let t = e;
    return t;
  })();
var KF = ['knob'],
  JF = ['valueIndicatorContainer'];
function eN(t, e) {
  if (
    (t & 1 && (S(0, 'div', 4, 5)(2, 'div', 6)(3, 'span', 7), We(4), k()()()),
    t & 2)
  ) {
    let i = Ne();
    W(4), Do(i.valueIndicatorText);
  }
}
var tN = ['trackActive'];
function nN(t, e) {
  if ((t & 1 && j(0, 'div'), t & 2)) {
    let i = e.$implicit,
      n = e.$index,
      r = Ne(3);
    Kt(
      i === 0
        ? 'mdc-slider__tick-mark--active'
        : 'mdc-slider__tick-mark--inactive'
    ),
      cc('transform', r._calcTickMarkTransform(n));
  }
}
function iN(t, e) {
  if ((t & 1 && g_(0, nN, 1, 4, 'div', 9, p_), t & 2)) {
    let i = Ne(2);
    b_(i._tickMarks);
  }
}
function rN(t, e) {
  if ((t & 1 && (S(0, 'div', 7, 8), _e(2, iN, 2, 0), k()), t & 2)) {
    let i = Ne();
    W(2), Te(2, i._cachedWidth ? 2 : -1);
  }
}
function oN(t, e) {
  if ((t & 1 && j(0, 'mat-slider-visual-thumb', 6), t & 2)) {
    let i = Ne();
    de('discrete', i.discrete)('thumbPosition', 1)(
      'valueIndicatorText',
      i.startValueIndicatorText
    );
  }
}
var sN = ['*'],
  Yh = new w('_MatSlider'),
  Px = new w('_MatSliderThumb'),
  aN = new w('_MatSliderRangeThumb'),
  Lx = new w('_MatSliderVisualThumb');
var cN = (() => {
    let e = class e {
      constructor(n, r, o, s) {
        (this._cdr = n),
          (this._ngZone = r),
          (this._slider = s),
          (this._isHovered = !1),
          (this._isActive = !1),
          (this._isValueIndicatorVisible = !1),
          (this._onPointerMove = (a) => {
            if (this._sliderInput._isFocused) return;
            let c = this._hostElement.getBoundingClientRect(),
              l = this._slider._isCursorOnSliderThumb(a, c);
            (this._isHovered = l),
              l
                ? this._showHoverRipple()
                : this._hideRipple(this._hoverRippleRef);
          }),
          (this._onMouseLeave = () => {
            (this._isHovered = !1), this._hideRipple(this._hoverRippleRef);
          }),
          (this._onFocus = () => {
            this._hideRipple(this._hoverRippleRef),
              this._showFocusRipple(),
              this._hostElement.classList.add('mdc-slider__thumb--focused');
          }),
          (this._onBlur = () => {
            this._isActive || this._hideRipple(this._focusRippleRef),
              this._isHovered && this._showHoverRipple(),
              this._hostElement.classList.remove('mdc-slider__thumb--focused');
          }),
          (this._onDragStart = (a) => {
            a.button === 0 && ((this._isActive = !0), this._showActiveRipple());
          }),
          (this._onDragEnd = () => {
            (this._isActive = !1),
              this._hideRipple(this._activeRippleRef),
              this._sliderInput._isFocused ||
                this._hideRipple(this._focusRippleRef);
          }),
          (this._hostElement = o.nativeElement);
      }
      ngAfterViewInit() {
        (this._ripple.radius = 24),
          (this._sliderInput = this._slider._getInput(this.thumbPosition)),
          (this._sliderInputEl = this._sliderInput._hostElement);
        let n = this._sliderInputEl;
        this._ngZone.runOutsideAngular(() => {
          n.addEventListener('pointermove', this._onPointerMove),
            n.addEventListener('pointerdown', this._onDragStart),
            n.addEventListener('pointerup', this._onDragEnd),
            n.addEventListener('pointerleave', this._onMouseLeave),
            n.addEventListener('focus', this._onFocus),
            n.addEventListener('blur', this._onBlur);
        });
      }
      ngOnDestroy() {
        let n = this._sliderInputEl;
        n.removeEventListener('pointermove', this._onPointerMove),
          n.removeEventListener('pointerdown', this._onDragStart),
          n.removeEventListener('pointerup', this._onDragEnd),
          n.removeEventListener('pointerleave', this._onMouseLeave),
          n.removeEventListener('focus', this._onFocus),
          n.removeEventListener('blur', this._onBlur);
      }
      _showHoverRipple() {
        this._isShowingRipple(this._hoverRippleRef) ||
          ((this._hoverRippleRef = this._showRipple({
            enterDuration: 0,
            exitDuration: 0,
          })),
          this._hoverRippleRef?.element.classList.add(
            'mat-mdc-slider-hover-ripple'
          ));
      }
      _showFocusRipple() {
        this._isShowingRipple(this._focusRippleRef) ||
          ((this._focusRippleRef = this._showRipple(
            { enterDuration: 0, exitDuration: 0 },
            !0
          )),
          this._focusRippleRef?.element.classList.add(
            'mat-mdc-slider-focus-ripple'
          ));
      }
      _showActiveRipple() {
        this._isShowingRipple(this._activeRippleRef) ||
          ((this._activeRippleRef = this._showRipple({
            enterDuration: 225,
            exitDuration: 400,
          })),
          this._activeRippleRef?.element.classList.add(
            'mat-mdc-slider-active-ripple'
          ));
      }
      _isShowingRipple(n) {
        return n?.state === 0 || n?.state === 1;
      }
      _showRipple(n, r) {
        if (
          !this._slider.disabled &&
          (this._showValueIndicator(),
          this._slider._isRange &&
            this._slider
              ._getThumb(this.thumbPosition === 1 ? 2 : 1)
              ._showValueIndicator(),
          !(this._slider._globalRippleOptions?.disabled && !r))
        )
          return this._ripple.launch({
            animation: this._slider._noopAnimations
              ? { enterDuration: 0, exitDuration: 0 }
              : n,
            centered: !0,
            persistent: !0,
          });
      }
      _hideRipple(n) {
        if ((n?.fadeOut(), this._isShowingAnyRipple())) return;
        this._slider._isRange || this._hideValueIndicator();
        let r = this._getSibling();
        r._isShowingAnyRipple() ||
          (this._hideValueIndicator(), r._hideValueIndicator());
      }
      _showValueIndicator() {
        this._hostElement.classList.add('mdc-slider__thumb--with-indicator');
      }
      _hideValueIndicator() {
        this._hostElement.classList.remove('mdc-slider__thumb--with-indicator');
      }
      _getSibling() {
        return this._slider._getThumb(this.thumbPosition === 1 ? 2 : 1);
      }
      _getValueIndicatorContainer() {
        return this._valueIndicatorContainer?.nativeElement;
      }
      _getKnob() {
        return this._knob.nativeElement;
      }
      _isShowingAnyRipple() {
        return (
          this._isShowingRipple(this._hoverRippleRef) ||
          this._isShowingRipple(this._focusRippleRef) ||
          this._isShowingRipple(this._activeRippleRef)
        );
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(p(ze), p(I), p(z), p(Yh));
    }),
      (e.ɵcmp = De({
        type: e,
        selectors: [['mat-slider-visual-thumb']],
        viewQuery: function (r, o) {
          if ((r & 1 && (ke(Ht, 5), ke(KF, 5), ke(JF, 5)), r & 2)) {
            let s;
            J((s = ee())) && (o._ripple = s.first),
              J((s = ee())) && (o._knob = s.first),
              J((s = ee())) && (o._valueIndicatorContainer = s.first);
          }
        },
        hostAttrs: [1, 'mdc-slider__thumb', 'mat-mdc-slider-visual-thumb'],
        inputs: {
          discrete: 'discrete',
          thumbPosition: 'thumbPosition',
          valueIndicatorText: 'valueIndicatorText',
        },
        features: [Pe([{ provide: Lx, useExisting: e }])],
        decls: 4,
        vars: 2,
        consts: [
          ['class', 'mdc-slider__value-indicator-container'],
          [1, 'mdc-slider__thumb-knob'],
          ['knob', ''],
          [
            'matRipple',
            '',
            1,
            'mat-mdc-focus-indicator',
            3,
            'matRippleDisabled',
          ],
          [1, 'mdc-slider__value-indicator-container'],
          ['valueIndicatorContainer', ''],
          [1, 'mdc-slider__value-indicator'],
          [1, 'mdc-slider__value-indicator-text'],
        ],
        template: function (r, o) {
          r & 1 && (_e(0, eN, 5, 1, 'div', 0), j(1, 'div', 1, 2)(3, 'div', 3)),
            r & 2 &&
              (Te(0, o.discrete ? 0 : -1), W(3), de('matRippleDisabled', !0));
        },
        dependencies: [Ht],
        styles: [
          '.mat-mdc-slider-visual-thumb .mat-ripple{height:100%;width:100%}.mat-mdc-slider .mdc-slider__tick-marks{justify-content:start}.mat-mdc-slider .mdc-slider__tick-marks .mdc-slider__tick-mark--active,.mat-mdc-slider .mdc-slider__tick-marks .mdc-slider__tick-mark--inactive{position:absolute;left:2px}',
        ],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })(),
  lN = dl(
    G0(
      class {
        constructor(t) {
          this._elementRef = t;
        }
      }
    ),
    'primary'
  ),
  Vx = (() => {
    let e = class e extends lN {
      get disabled() {
        return this._disabled;
      }
      set disabled(n) {
        this._disabled = Be(n);
        let r = this._getInput(2),
          o = this._getInput(1);
        r && (r.disabled = this._disabled), o && (o.disabled = this._disabled);
      }
      get discrete() {
        return this._discrete;
      }
      set discrete(n) {
        (this._discrete = Be(n)), this._updateValueIndicatorUIs();
      }
      get showTickMarks() {
        return this._showTickMarks;
      }
      set showTickMarks(n) {
        this._showTickMarks = Be(n);
      }
      get min() {
        return this._min;
      }
      set min(n) {
        let r = pt(n, this._min);
        this._min !== r && this._updateMin(r);
      }
      _updateMin(n) {
        let r = this._min;
        (this._min = n),
          this._isRange
            ? this._updateMinRange({ old: r, new: n })
            : this._updateMinNonRange(n),
          this._onMinMaxOrStepChange();
      }
      _updateMinRange(n) {
        let r = this._getInput(2),
          o = this._getInput(1),
          s = r.value,
          a = o.value;
        (o.min = n.new),
          (r.min = Math.max(n.new, o.value)),
          (o.max = Math.min(r.max, r.value)),
          o._updateWidthInactive(),
          r._updateWidthInactive(),
          n.new < n.old
            ? this._onTranslateXChangeBySideEffect(r, o)
            : this._onTranslateXChangeBySideEffect(o, r),
          s !== r.value && this._onValueChange(r),
          a !== o.value && this._onValueChange(o);
      }
      _updateMinNonRange(n) {
        let r = this._getInput(2);
        if (r) {
          let o = r.value;
          (r.min = n),
            r._updateThumbUIByValue(),
            this._updateTrackUI(r),
            o !== r.value && this._onValueChange(r);
        }
      }
      get max() {
        return this._max;
      }
      set max(n) {
        let r = pt(n, this._max);
        this._max !== r && this._updateMax(r);
      }
      _updateMax(n) {
        let r = this._max;
        (this._max = n),
          this._isRange
            ? this._updateMaxRange({ old: r, new: n })
            : this._updateMaxNonRange(n),
          this._onMinMaxOrStepChange();
      }
      _updateMaxRange(n) {
        let r = this._getInput(2),
          o = this._getInput(1),
          s = r.value,
          a = o.value;
        (r.max = n.new),
          (o.max = Math.min(n.new, r.value)),
          (r.min = o.value),
          r._updateWidthInactive(),
          o._updateWidthInactive(),
          n.new > n.old
            ? this._onTranslateXChangeBySideEffect(o, r)
            : this._onTranslateXChangeBySideEffect(r, o),
          s !== r.value && this._onValueChange(r),
          a !== o.value && this._onValueChange(o);
      }
      _updateMaxNonRange(n) {
        let r = this._getInput(2);
        if (r) {
          let o = r.value;
          (r.max = n),
            r._updateThumbUIByValue(),
            this._updateTrackUI(r),
            o !== r.value && this._onValueChange(r);
        }
      }
      get step() {
        return this._step;
      }
      set step(n) {
        let r = pt(n, this._step);
        this._step !== r && this._updateStep(r);
      }
      _updateStep(n) {
        (this._step = n),
          this._isRange ? this._updateStepRange() : this._updateStepNonRange(),
          this._onMinMaxOrStepChange();
      }
      _updateStepRange() {
        let n = this._getInput(2),
          r = this._getInput(1),
          o = n.value,
          s = r.value,
          a = r.value;
        (n.min = this._min),
          (r.max = this._max),
          (n.step = this._step),
          (r.step = this._step),
          this._platform.SAFARI && ((n.value = n.value), (r.value = r.value)),
          (n.min = Math.max(this._min, r.value)),
          (r.max = Math.min(this._max, n.value)),
          r._updateWidthInactive(),
          n._updateWidthInactive(),
          n.value < a
            ? this._onTranslateXChangeBySideEffect(r, n)
            : this._onTranslateXChangeBySideEffect(n, r),
          o !== n.value && this._onValueChange(n),
          s !== r.value && this._onValueChange(r);
      }
      _updateStepNonRange() {
        let n = this._getInput(2);
        if (n) {
          let r = n.value;
          (n.step = this._step),
            this._platform.SAFARI && (n.value = n.value),
            n._updateThumbUIByValue(),
            r !== n.value && this._onValueChange(n);
        }
      }
      constructor(n, r, o, s, a, c) {
        super(o),
          (this._ngZone = n),
          (this._cdr = r),
          (this._dir = s),
          (this._globalRippleOptions = a),
          (this._disabled = !1),
          (this._discrete = !1),
          (this._showTickMarks = !1),
          (this._min = 0),
          (this._max = 100),
          (this._step = 1),
          (this.displayWith = (l) => `${l}`),
          (this._rippleRadius = 24),
          (this.startValueIndicatorText = ''),
          (this.endValueIndicatorText = ''),
          (this._isRange = !1),
          (this._isRtl = !1),
          (this._hasViewInitialized = !1),
          (this._tickMarkTrackWidth = 0),
          (this._hasAnimation = !1),
          (this._resizeTimer = null),
          (this._platform = b(Ae)),
          (this._knobRadius = 8),
          (this._thumbsOverlap = !1),
          (this._noopAnimations = c === 'NoopAnimations'),
          (this._dirChangeSubscription = this._dir.change.subscribe(() =>
            this._onDirChange()
          )),
          (this._isRtl = this._dir.value === 'rtl');
      }
      ngAfterViewInit() {
        this._platform.isBrowser && this._updateDimensions();
        let n = this._getInput(2),
          r = this._getInput(1);
        (this._isRange = !!n && !!r), this._cdr.detectChanges();
        let o = this._getThumb(2);
        (this._rippleRadius = o._ripple.radius),
          (this._inputPadding = this._rippleRadius - this._knobRadius),
          (this._inputOffset = this._knobRadius),
          this._isRange ? this._initUIRange(n, r) : this._initUINonRange(n),
          this._updateTrackUI(n),
          this._updateTickMarkUI(),
          this._updateTickMarkTrackUI(),
          this._observeHostResize(),
          this._cdr.detectChanges();
      }
      _initUINonRange(n) {
        n.initProps(),
          n.initUI(),
          this._updateValueIndicatorUI(n),
          (this._hasViewInitialized = !0),
          n._updateThumbUIByValue();
      }
      _initUIRange(n, r) {
        n.initProps(),
          n.initUI(),
          r.initProps(),
          r.initUI(),
          n._updateMinMax(),
          r._updateMinMax(),
          n._updateStaticStyles(),
          r._updateStaticStyles(),
          this._updateValueIndicatorUIs(),
          (this._hasViewInitialized = !0),
          n._updateThumbUIByValue(),
          r._updateThumbUIByValue();
      }
      ngOnDestroy() {
        this._dirChangeSubscription.unsubscribe(),
          this._resizeObserver?.disconnect(),
          (this._resizeObserver = null);
      }
      _onDirChange() {
        (this._isRtl = this._dir.value === 'rtl'),
          this._isRange
            ? this._onDirChangeRange()
            : this._onDirChangeNonRange(),
          this._updateTickMarkUI();
      }
      _onDirChangeRange() {
        let n = this._getInput(2),
          r = this._getInput(1);
        n._setIsLeftThumb(),
          r._setIsLeftThumb(),
          (n.translateX = n._calcTranslateXByValue()),
          (r.translateX = r._calcTranslateXByValue()),
          n._updateStaticStyles(),
          r._updateStaticStyles(),
          n._updateWidthInactive(),
          r._updateWidthInactive(),
          n._updateThumbUIByValue(),
          r._updateThumbUIByValue();
      }
      _onDirChangeNonRange() {
        this._getInput(2)._updateThumbUIByValue();
      }
      _observeHostResize() {
        typeof ResizeObserver > 'u' ||
          !ResizeObserver ||
          this._ngZone.runOutsideAngular(() => {
            (this._resizeObserver = new ResizeObserver(() => {
              this._isActive() ||
                (this._resizeTimer && clearTimeout(this._resizeTimer),
                this._onResize());
            })),
              this._resizeObserver.observe(this._elementRef.nativeElement);
          });
      }
      _isActive() {
        return this._getThumb(1)._isActive || this._getThumb(2)._isActive;
      }
      _getValue(n = 2) {
        let r = this._getInput(n);
        return r ? r.value : this.min;
      }
      _skipUpdate() {
        return !!(
          this._getInput(1)?._skipUIUpdate || this._getInput(2)?._skipUIUpdate
        );
      }
      _updateDimensions() {
        (this._cachedWidth = this._elementRef.nativeElement.offsetWidth),
          (this._cachedLeft =
            this._elementRef.nativeElement.getBoundingClientRect().left);
      }
      _setTrackActiveStyles(n) {
        let r = this._trackActive.nativeElement.style;
        (r.left = n.left),
          (r.right = n.right),
          (r.transformOrigin = n.transformOrigin),
          (r.transform = n.transform);
      }
      _calcTickMarkTransform(n) {
        return `translateX(${
          n * (this._tickMarkTrackWidth / (this._tickMarks.length - 1))
        }px`;
      }
      _onTranslateXChange(n) {
        this._hasViewInitialized &&
          (this._updateThumbUI(n),
          this._updateTrackUI(n),
          this._updateOverlappingThumbUI(n));
      }
      _onTranslateXChangeBySideEffect(n, r) {
        this._hasViewInitialized &&
          (n._updateThumbUIByValue(), r._updateThumbUIByValue());
      }
      _onValueChange(n) {
        this._hasViewInitialized &&
          (this._updateValueIndicatorUI(n),
          this._updateTickMarkUI(),
          this._cdr.detectChanges());
      }
      _onMinMaxOrStepChange() {
        this._hasViewInitialized &&
          (this._updateTickMarkUI(),
          this._updateTickMarkTrackUI(),
          this._cdr.markForCheck());
      }
      _onResize() {
        if (this._hasViewInitialized) {
          if ((this._updateDimensions(), this._isRange)) {
            let n = this._getInput(2),
              r = this._getInput(1);
            n._updateThumbUIByValue(),
              r._updateThumbUIByValue(),
              n._updateStaticStyles(),
              r._updateStaticStyles(),
              n._updateMinMax(),
              r._updateMinMax(),
              n._updateWidthInactive(),
              r._updateWidthInactive();
          } else {
            let n = this._getInput(2);
            n && n._updateThumbUIByValue();
          }
          this._updateTickMarkUI(),
            this._updateTickMarkTrackUI(),
            this._cdr.detectChanges();
        }
      }
      _areThumbsOverlapping() {
        let n = this._getInput(1),
          r = this._getInput(2);
        return !n || !r ? !1 : r.translateX - n.translateX < 20;
      }
      _updateOverlappingThumbClassNames(n) {
        let r = n.getSibling(),
          o = this._getThumb(n.thumbPosition);
        this._getThumb(r.thumbPosition)._hostElement.classList.remove(
          'mdc-slider__thumb--top'
        ),
          o._hostElement.classList.toggle(
            'mdc-slider__thumb--top',
            this._thumbsOverlap
          );
      }
      _updateOverlappingThumbUI(n) {
        !this._isRange ||
          this._skipUpdate() ||
          (this._thumbsOverlap !== this._areThumbsOverlapping() &&
            ((this._thumbsOverlap = !this._thumbsOverlap),
            this._updateOverlappingThumbClassNames(n)));
      }
      _updateThumbUI(n) {
        if (this._skipUpdate()) return;
        let r = this._getThumb(n.thumbPosition === 2 ? 2 : 1);
        r._hostElement.style.transform = `translateX(${n.translateX}px)`;
      }
      _updateValueIndicatorUI(n) {
        if (this._skipUpdate()) return;
        let r = this.displayWith(n.value);
        if (
          (this._hasViewInitialized
            ? (n._valuetext = r)
            : n._hostElement.setAttribute('aria-valuetext', r),
          this.discrete)
        ) {
          n.thumbPosition === 1
            ? (this.startValueIndicatorText = r)
            : (this.endValueIndicatorText = r);
          let o = this._getThumb(n.thumbPosition);
          r.length < 3
            ? o._hostElement.classList.add('mdc-slider__thumb--short-value')
            : o._hostElement.classList.remove('mdc-slider__thumb--short-value');
        }
      }
      _updateValueIndicatorUIs() {
        let n = this._getInput(2),
          r = this._getInput(1);
        n && this._updateValueIndicatorUI(n),
          r && this._updateValueIndicatorUI(r);
      }
      _updateTickMarkTrackUI() {
        if (!this.showTickMarks || this._skipUpdate()) return;
        let n = this._step && this._step > 0 ? this._step : 1,
          o = (Math.floor(this.max / n) * n - this.min) / (this.max - this.min);
        this._tickMarkTrackWidth = this._cachedWidth * o - 6;
      }
      _updateTrackUI(n) {
        this._skipUpdate() ||
          (this._isRange
            ? this._updateTrackUIRange(n)
            : this._updateTrackUINonRange(n));
      }
      _updateTrackUIRange(n) {
        let r = n.getSibling();
        if (!r || !this._cachedWidth) return;
        let o = Math.abs(r.translateX - n.translateX) / this._cachedWidth;
        n._isLeftThumb && this._cachedWidth
          ? this._setTrackActiveStyles({
              left: 'auto',
              right: `${this._cachedWidth - r.translateX}px`,
              transformOrigin: 'right',
              transform: `scaleX(${o})`,
            })
          : this._setTrackActiveStyles({
              left: `${r.translateX}px`,
              right: 'auto',
              transformOrigin: 'left',
              transform: `scaleX(${o})`,
            });
      }
      _updateTrackUINonRange(n) {
        this._isRtl
          ? this._setTrackActiveStyles({
              left: 'auto',
              right: '0px',
              transformOrigin: 'right',
              transform: `scaleX(${1 - n.fillPercentage})`,
            })
          : this._setTrackActiveStyles({
              left: '0px',
              right: 'auto',
              transformOrigin: 'left',
              transform: `scaleX(${n.fillPercentage})`,
            });
      }
      _updateTickMarkUI() {
        if (
          !this.showTickMarks ||
          this.step === void 0 ||
          this.min === void 0 ||
          this.max === void 0
        )
          return;
        let n = this.step > 0 ? this.step : 1;
        this._isRange
          ? this._updateTickMarkUIRange(n)
          : this._updateTickMarkUINonRange(n),
          this._isRtl && this._tickMarks.reverse();
      }
      _updateTickMarkUINonRange(n) {
        let r = this._getValue(),
          o = Math.max(Math.floor((r - this.min) / n), 0),
          s = Math.max(Math.floor((this.max - r) / n), 0);
        this._isRtl ? o++ : s++,
          (this._tickMarks = Array(o).fill(0).concat(Array(s).fill(1)));
      }
      _updateTickMarkUIRange(n) {
        let r = this._getValue(),
          o = this._getValue(1),
          s = Math.max(Math.floor((o - this.min) / n), 0),
          a = Math.max(Math.floor((r - o) / n) + 1, 0),
          c = Math.max(Math.floor((this.max - r) / n), 0);
        this._tickMarks = Array(s)
          .fill(1)
          .concat(Array(a).fill(0), Array(c).fill(1));
      }
      _getInput(n) {
        if (n === 2 && this._input) return this._input;
        if (this._inputs?.length)
          return n === 1 ? this._inputs.first : this._inputs.last;
      }
      _getThumb(n) {
        return n === 2 ? this._thumbs?.last : this._thumbs?.first;
      }
      _setTransition(n) {
        (this._hasAnimation =
          !this._platform.IOS && n && !this._noopAnimations),
          this._elementRef.nativeElement.classList.toggle(
            'mat-mdc-slider-with-animation',
            this._hasAnimation
          );
      }
      _isCursorOnSliderThumb(n, r) {
        let o = r.width / 2,
          s = r.x + o,
          a = r.y + o,
          c = n.clientX - s,
          l = n.clientY - a;
        return Math.pow(c, 2) + Math.pow(l, 2) < Math.pow(o, 2);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(p(I), p(ze), p(z), p(cl, 8), p(ul, 8), p($e, 8));
    }),
      (e.ɵcmp = De({
        type: e,
        selectors: [['mat-slider']],
        contentQueries: function (r, o, s) {
          if ((r & 1 && (mt(s, Px, 5), mt(s, aN, 4)), r & 2)) {
            let a;
            J((a = ee())) && (o._input = a.first),
              J((a = ee())) && (o._inputs = a);
          }
        },
        viewQuery: function (r, o) {
          if ((r & 1 && (ke(tN, 5), ke(Lx, 5)), r & 2)) {
            let s;
            J((s = ee())) && (o._trackActive = s.first),
              J((s = ee())) && (o._thumbs = s);
          }
        },
        hostAttrs: [1, 'mat-mdc-slider', 'mdc-slider'],
        hostVars: 10,
        hostBindings: function (r, o) {
          r & 2 &&
            X('mdc-slider--range', o._isRange)(
              'mdc-slider--disabled',
              o.disabled
            )('mdc-slider--discrete', o.discrete)(
              'mdc-slider--tick-marks',
              o.showTickMarks
            )('_mat-animation-noopable', o._noopAnimations);
        },
        inputs: {
          color: 'color',
          disableRipple: 'disableRipple',
          disabled: 'disabled',
          discrete: 'discrete',
          showTickMarks: 'showTickMarks',
          min: 'min',
          max: 'max',
          step: 'step',
          displayWith: 'displayWith',
        },
        exportAs: ['matSlider'],
        features: [Pe([{ provide: Yh, useExisting: e }]), Re],
        ngContentSelectors: sN,
        decls: 9,
        vars: 5,
        consts: [
          [1, 'mdc-slider__track'],
          [1, 'mdc-slider__track--inactive'],
          [1, 'mdc-slider__track--active'],
          [1, 'mdc-slider__track--active_fill'],
          ['trackActive', ''],
          ['class', 'mdc-slider__tick-marks'],
          [3, 'discrete', 'thumbPosition', 'valueIndicatorText'],
          [1, 'mdc-slider__tick-marks'],
          ['tickMarkContainer', ''],
          [3, 'class', 'transform'],
        ],
        template: function (r, o) {
          r & 1 &&
            (Je(),
            oe(0),
            S(1, 'div', 0),
            j(2, 'div', 1),
            S(3, 'div', 2),
            j(4, 'div', 3, 4),
            k(),
            _e(6, rN, 3, 1, 'div', 5),
            k(),
            _e(7, oN, 1, 3, 'mat-slider-visual-thumb', 6),
            j(8, 'mat-slider-visual-thumb', 6)),
            r & 2 &&
              (W(6),
              Te(6, o.showTickMarks ? 6 : -1),
              W(1),
              Te(7, o._isRange ? 7 : -1),
              W(1),
              de('discrete', o.discrete)('thumbPosition', 2)(
                'valueIndicatorText',
                o.endValueIndicatorText
              ));
        },
        dependencies: [cN],
        styles: [
          '.mdc-slider{cursor:pointer;height:48px;margin:0 24px;position:relative;touch-action:pan-y}.mdc-slider .mdc-slider__track{position:absolute;top:50%;transform:translateY(-50%);width:100%}.mdc-slider .mdc-slider__track--active,.mdc-slider .mdc-slider__track--inactive{display:flex;height:100%;position:absolute;width:100%}.mdc-slider .mdc-slider__track--active{overflow:hidden}.mdc-slider .mdc-slider__track--active_fill{border-top-style:solid;box-sizing:border-box;height:100%;width:100%;position:relative;-webkit-transform-origin:left;transform-origin:left}[dir=rtl] .mdc-slider .mdc-slider__track--active_fill,.mdc-slider .mdc-slider__track--active_fill[dir=rtl]{-webkit-transform-origin:right;transform-origin:right}.mdc-slider .mdc-slider__track--inactive{left:0;top:0}.mdc-slider .mdc-slider__track--inactive::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-slider .mdc-slider__track--inactive::before{border-color:CanvasText}}.mdc-slider .mdc-slider__value-indicator-container{bottom:44px;left:50%;left:var(--slider-value-indicator-container-left, 50%);pointer-events:none;position:absolute;right:var(--slider-value-indicator-container-right);transform:translateX(-50%);transform:var(--slider-value-indicator-container-transform, translateX(-50%))}.mdc-slider .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0.4, 0, 1, 1);align-items:center;border-radius:4px;display:flex;height:32px;padding:0 12px;transform:scale(0);transform-origin:bottom}.mdc-slider .mdc-slider__value-indicator::before{border-left:6px solid rgba(0,0,0,0);border-right:6px solid rgba(0,0,0,0);border-top:6px solid;bottom:-5px;content:"";height:0;left:50%;left:var(--slider-value-indicator-caret-left, 50%);position:absolute;right:var(--slider-value-indicator-caret-right);transform:translateX(-50%);transform:var(--slider-value-indicator-caret-transform, translateX(-50%));width:0}.mdc-slider .mdc-slider__value-indicator::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-slider .mdc-slider__value-indicator::after{border-color:CanvasText}}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator-container{pointer-events:auto}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:scale(1)}@media(prefers-reduced-motion){.mdc-slider .mdc-slider__value-indicator,.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:none}}.mdc-slider .mdc-slider__thumb{display:flex;left:-24px;outline:none;position:absolute;user-select:none;height:48px;width:48px}.mdc-slider .mdc-slider__thumb--top{z-index:1}.mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-style:solid;border-width:1px;box-sizing:content-box}.mdc-slider .mdc-slider__thumb-knob{box-sizing:border-box;left:50%;position:absolute;top:50%;transform:translate(-50%, -50%)}.mdc-slider .mdc-slider__tick-marks{align-items:center;box-sizing:border-box;display:flex;height:100%;justify-content:space-between;padding:0 1px;position:absolute;width:100%}.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:transform 80ms ease}@media(prefers-reduced-motion){.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:none}}.mdc-slider--disabled{cursor:auto}.mdc-slider--disabled .mdc-slider__thumb{pointer-events:none}.mdc-slider__input{cursor:pointer;left:2px;margin:0;height:44px;opacity:0;pointer-events:none;position:absolute;top:2px;width:44px}.mat-mdc-slider{display:inline-block;box-sizing:border-box;outline:none;vertical-align:middle;margin-left:8px;margin-right:8px;width:auto;min-width:112px;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-slider .mdc-slider__thumb-knob{background-color:var(--mdc-slider-handle-color);border-color:var(--mdc-slider-handle-color)}.mat-mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:#fff}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__thumb-knob{background-color:var(--mdc-slider-disabled-handle-color);border-color:var(--mdc-slider-disabled-handle-color)}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider.mdc-slider--disabled .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider.mdc-slider--disabled .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:#fff}.mat-mdc-slider .mdc-slider__thumb::before,.mat-mdc-slider .mdc-slider__thumb::after{background-color:var(--mdc-slider-handle-color)}.mat-mdc-slider .mdc-slider__thumb:hover::before,.mat-mdc-slider .mdc-slider__thumb.mdc-ripple-surface--hover::before{opacity:var(--mdc-ripple-hover-opacity)}.mat-mdc-slider .mdc-slider__thumb.mdc-ripple-upgraded--background-focused::before,.mat-mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:var(--mdc-ripple-focus-opacity)}.mat-mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mat-mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:var(--mdc-ripple-press-opacity)}.mat-mdc-slider .mdc-slider__thumb.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity)}.mat-mdc-slider .mdc-slider__track--active_fill{border-color:var(--mdc-slider-active-track-color)}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__track--active_fill{border-color:var(--mdc-slider-disabled-active-track-color)}.mat-mdc-slider .mdc-slider__track--inactive{background-color:var(--mdc-slider-inactive-track-color);opacity:.24}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__track--inactive{background-color:var(--mdc-slider-disabled-inactive-track-color);opacity:.24}.mat-mdc-slider .mdc-slider__tick-mark--active{background-color:var(--mdc-slider-with-tick-marks-active-container-color);opacity:var(--mdc-slider-with-tick-marks-active-container-opacity)}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__tick-mark--active{background-color:var(--mdc-slider-with-tick-marks-active-container-color);opacity:var(--mdc-slider-with-tick-marks-active-container-opacity)}.mat-mdc-slider .mdc-slider__tick-mark--inactive{background-color:var(--mdc-slider-with-tick-marks-inactive-container-color);opacity:var(--mdc-slider-with-tick-marks-inactive-container-opacity)}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__tick-mark--inactive{background-color:var(--mdc-slider-with-tick-marks-disabled-container-color);opacity:var(--mdc-slider-with-tick-marks-inactive-container-opacity)}.mat-mdc-slider .mdc-slider__value-indicator{background-color:var(--mdc-slider-label-container-color);opacity:1}.mat-mdc-slider .mdc-slider__value-indicator::before{border-top-color:var(--mdc-slider-label-container-color)}.mat-mdc-slider .mdc-slider__value-indicator{color:var(--mdc-slider-label-label-text-color)}.mat-mdc-slider .mdc-slider__track{height:var(--mdc-slider-inactive-track-height)}.mat-mdc-slider .mdc-slider__track--active{height:var(--mdc-slider-active-track-height);top:calc((var(--mdc-slider-inactive-track-height) - var(--mdc-slider-active-track-height)) / 2)}.mat-mdc-slider .mdc-slider__track--active_fill{border-top-width:var(--mdc-slider-active-track-height)}.mat-mdc-slider .mdc-slider__track--inactive{height:var(--mdc-slider-inactive-track-height)}.mat-mdc-slider .mdc-slider__tick-mark--active,.mat-mdc-slider .mdc-slider__tick-mark--inactive{height:var(--mdc-slider-with-tick-marks-container-size);width:var(--mdc-slider-with-tick-marks-container-size)}.mat-mdc-slider.mdc-slider--disabled{opacity:0.38}.mat-mdc-slider .mdc-slider__value-indicator-text{letter-spacing:var(--mdc-slider-label-label-text-tracking);font-size:var(--mdc-slider-label-label-text-size);font-family:var(--mdc-slider-label-label-text-font);font-weight:var(--mdc-slider-label-label-text-weight);line-height:var(--mdc-slider-label-label-text-line-height)}.mat-mdc-slider .mdc-slider__track--active{border-radius:var(--mdc-slider-active-track-shape)}.mat-mdc-slider .mdc-slider__track--inactive{border-radius:var(--mdc-slider-inactive-track-shape)}.mat-mdc-slider .mdc-slider__thumb-knob{border-radius:var(--mdc-slider-handle-shape);width:var(--mdc-slider-handle-width);height:var(--mdc-slider-handle-height);border-style:solid;border-width:calc(var(--mdc-slider-handle-height) / 2) calc(var(--mdc-slider-handle-width) / 2)}.mat-mdc-slider .mdc-slider__tick-mark--active,.mat-mdc-slider .mdc-slider__tick-mark--inactive{border-radius:var(--mdc-slider-with-tick-marks-container-shape)}.mat-mdc-slider .mdc-slider__thumb:hover .mdc-slider__thumb-knob{background-color:var(--mdc-slider-hover-handle-color);border-color:var(--mdc-slider-hover-handle-color)}.mat-mdc-slider .mdc-slider__thumb:hover .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb:hover .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb:hover .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:#fff}.mat-mdc-slider .mdc-slider__thumb--focused .mdc-slider__thumb-knob{background-color:var(--mdc-slider-focus-handle-color);border-color:var(--mdc-slider-focus-handle-color)}.mat-mdc-slider .mdc-slider__thumb--focused .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--focused .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--focused .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:#fff}.mat-mdc-slider .mdc-slider__thumb:not(:disabled):active .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb:not(:disabled):active .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb:not(:disabled):active .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:#fff}.mat-mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:var(--mdc-slider-with-overlap-handle-outline-color);border-width:var(--mdc-slider-with-overlap-handle-outline-width)}.mat-mdc-slider .mdc-slider__thumb-knob{box-shadow:var(--mdc-slider-handle-elevation)}.mat-mdc-slider .mdc-slider__input{box-sizing:content-box;pointer-events:auto}.mat-mdc-slider .mdc-slider__input.mat-mdc-slider-input-no-pointer-events{pointer-events:none}.mat-mdc-slider .mdc-slider__input.mat-slider__right-input{left:auto;right:0}.mat-mdc-slider .mdc-slider__thumb,.mat-mdc-slider .mdc-slider__track--active_fill{transition-duration:0ms}.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__thumb,.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__track--active_fill{transition-duration:80ms}.mat-mdc-slider.mdc-slider--discrete .mdc-slider__thumb,.mat-mdc-slider.mdc-slider--discrete .mdc-slider__track--active_fill{transition-duration:0ms}.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__thumb,.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__track--active_fill{transition-duration:80ms}.mat-mdc-slider .mdc-slider__track,.mat-mdc-slider .mdc-slider__thumb{pointer-events:none}.mat-mdc-slider .mdc-slider__value-indicator{opacity:var(--mat-slider-value-indicator-opacity)}.mat-mdc-slider .mat-ripple .mat-ripple-element{background-color:var(--mat-mdc-slider-ripple-color, transparent)}.mat-mdc-slider .mat-ripple .mat-mdc-slider-hover-ripple{background-color:var(--mat-mdc-slider-hover-ripple-color, transparent)}.mat-mdc-slider .mat-ripple .mat-mdc-slider-focus-ripple,.mat-mdc-slider .mat-ripple .mat-mdc-slider-active-ripple{background-color:var(--mat-mdc-slider-focus-ripple-color, transparent)}.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__thumb,.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__track--active_fill,.mat-mdc-slider._mat-animation-noopable .mdc-slider__value-indicator{transition:none}.mat-mdc-slider .mat-mdc-focus-indicator::before{border-radius:50%}.mat-mdc-slider .mdc-slider__value-indicator{word-break:normal}.mdc-slider__thumb--focused .mat-mdc-focus-indicator::before{content:""}',
        ],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })();
var dN = { provide: xn, useExisting: ut(() => Xh), multi: !0 };
var Xh = (() => {
  let e = class e {
    get value() {
      return pt(this._hostElement.value);
    }
    set value(n) {
      let r = pt(n).toString();
      if (!this._hasSetInitialValue) {
        this._initialValue = r;
        return;
      }
      this._isActive ||
        ((this._hostElement.value = r),
        this._updateThumbUIByValue(),
        this._slider._onValueChange(this),
        this._cdr.detectChanges(),
        this._slider._cdr.markForCheck());
    }
    get translateX() {
      return this._slider.min >= this._slider.max
        ? ((this._translateX = 0), this._translateX)
        : (this._translateX === void 0 &&
            (this._translateX = this._calcTranslateXByValue()),
          this._translateX);
    }
    set translateX(n) {
      this._translateX = n;
    }
    get min() {
      return pt(this._hostElement.min);
    }
    set min(n) {
      (this._hostElement.min = pt(n).toString()), this._cdr.detectChanges();
    }
    get max() {
      return pt(this._hostElement.max);
    }
    set max(n) {
      (this._hostElement.max = pt(n).toString()), this._cdr.detectChanges();
    }
    get step() {
      return pt(this._hostElement.step);
    }
    set step(n) {
      (this._hostElement.step = pt(n).toString()), this._cdr.detectChanges();
    }
    get disabled() {
      return Be(this._hostElement.disabled);
    }
    set disabled(n) {
      (this._hostElement.disabled = Be(n)),
        this._cdr.detectChanges(),
        this._slider.disabled !== this.disabled &&
          (this._slider.disabled = this.disabled);
    }
    get percentage() {
      return this._slider.min >= this._slider.max
        ? this._slider._isRtl
          ? 1
          : 0
        : (this.value - this._slider.min) /
            (this._slider.max - this._slider.min);
    }
    get fillPercentage() {
      return this._slider._cachedWidth
        ? this._translateX === 0
          ? 0
          : this.translateX / this._slider._cachedWidth
        : this._slider._isRtl
        ? 1
        : 0;
    }
    _setIsFocused(n) {
      this._isFocused = n;
    }
    constructor(n, r, o, s) {
      (this._ngZone = n),
        (this._elementRef = r),
        (this._cdr = o),
        (this._slider = s),
        (this.valueChange = new Y()),
        (this.dragStart = new Y()),
        (this.dragEnd = new Y()),
        (this.thumbPosition = 2),
        (this._knobRadius = 8),
        (this._isActive = !1),
        (this._isFocused = !1),
        (this._hasSetInitialValue = !1),
        (this._destroyed = new Z()),
        (this._skipUIUpdate = !1),
        (this._onTouchedFn = () => {}),
        (this._isControlInitialized = !1),
        (this._platform = b(Ae)),
        (this._hostElement = r.nativeElement),
        this._ngZone.runOutsideAngular(() => {
          this._hostElement.addEventListener(
            'pointerdown',
            this._onPointerDown.bind(this)
          ),
            this._hostElement.addEventListener(
              'pointermove',
              this._onPointerMove.bind(this)
            ),
            this._hostElement.addEventListener(
              'pointerup',
              this._onPointerUp.bind(this)
            );
        });
    }
    ngOnDestroy() {
      this._hostElement.removeEventListener('pointerdown', this._onPointerDown),
        this._hostElement.removeEventListener(
          'pointermove',
          this._onPointerMove
        ),
        this._hostElement.removeEventListener('pointerup', this._onPointerUp),
        this._destroyed.next(),
        this._destroyed.complete(),
        this.dragStart.complete(),
        this.dragEnd.complete();
    }
    initProps() {
      this._updateWidthInactive(),
        this.disabled !== this._slider.disabled && (this._slider.disabled = !0),
        (this.step = this._slider.step),
        (this.min = this._slider.min),
        (this.max = this._slider.max),
        this._initValue();
    }
    initUI() {
      this._updateThumbUIByValue();
    }
    _initValue() {
      (this._hasSetInitialValue = !0),
        this._initialValue === void 0
          ? (this.value = this._getDefaultValue())
          : ((this._hostElement.value = this._initialValue),
            this._updateThumbUIByValue(),
            this._slider._onValueChange(this),
            this._cdr.detectChanges());
    }
    _getDefaultValue() {
      return this.min;
    }
    _onBlur() {
      this._setIsFocused(!1), this._onTouchedFn();
    }
    _onFocus() {
      this._setIsFocused(!0);
    }
    _onChange() {
      this.valueChange.emit(this.value),
        this._isActive && this._updateThumbUIByValue({ withAnimation: !0 });
    }
    _onInput() {
      this._onChangeFn?.(this.value),
        (this._slider.step || !this._isActive) &&
          this._updateThumbUIByValue({ withAnimation: !0 }),
        this._slider._onValueChange(this);
    }
    _onNgControlValueChange() {
      (!this._isActive || !this._isFocused) &&
        (this._slider._onValueChange(this), this._updateThumbUIByValue()),
        (this._slider.disabled = this._formControl.disabled);
    }
    _onPointerDown(n) {
      if (!(this.disabled || n.button !== 0)) {
        if (this._platform.IOS) {
          let r = this._slider._isCursorOnSliderThumb(
            n,
            this._slider
              ._getThumb(this.thumbPosition)
              ._hostElement.getBoundingClientRect()
          );
          (this._isActive = r),
            this._updateWidthActive(),
            this._slider._updateDimensions();
          return;
        }
        (this._isActive = !0),
          this._setIsFocused(!0),
          this._updateWidthActive(),
          this._slider._updateDimensions(),
          this._slider.step ||
            this._updateThumbUIByPointerEvent(n, { withAnimation: !0 }),
          this.disabled ||
            (this._handleValueCorrection(n),
            this.dragStart.emit({
              source: this,
              parent: this._slider,
              value: this.value,
            }));
      }
    }
    _handleValueCorrection(n) {
      (this._skipUIUpdate = !0),
        setTimeout(() => {
          (this._skipUIUpdate = !1), this._fixValue(n);
        }, 0);
    }
    _fixValue(n) {
      let r = n.clientX - this._slider._cachedLeft,
        o = this._slider._cachedWidth,
        s = this._slider.step === 0 ? 1 : this._slider.step,
        a = Math.floor((this._slider.max - this._slider.min) / s),
        c = this._slider._isRtl ? 1 - r / o : r / o,
        d =
          (Math.round(c * a) / a) * (this._slider.max - this._slider.min) +
          this._slider.min,
        u = Math.round(d / s) * s,
        f = this.value;
      if (u === f) {
        this._slider._onValueChange(this),
          this._slider.step > 0
            ? this._updateThumbUIByValue()
            : this._updateThumbUIByPointerEvent(n, {
                withAnimation: this._slider._hasAnimation,
              });
        return;
      }
      (this.value = u),
        this.valueChange.emit(this.value),
        this._onChangeFn?.(this.value),
        this._slider._onValueChange(this),
        this._slider.step > 0
          ? this._updateThumbUIByValue()
          : this._updateThumbUIByPointerEvent(n, {
              withAnimation: this._slider._hasAnimation,
            });
    }
    _onPointerMove(n) {
      !this._slider.step &&
        this._isActive &&
        this._updateThumbUIByPointerEvent(n);
    }
    _onPointerUp() {
      this._isActive &&
        ((this._isActive = !1),
        this.dragEnd.emit({
          source: this,
          parent: this._slider,
          value: this.value,
        }),
        setTimeout(
          () => this._updateWidthInactive(),
          this._platform.IOS ? 10 : 0
        ));
    }
    _clamp(n) {
      return Math.max(Math.min(n, this._slider._cachedWidth), 0);
    }
    _calcTranslateXByValue() {
      if (this._slider._isRtl)
        return (1 - this.percentage) * this._slider._cachedWidth;
      let n = 3;
      return this.percentage * (this._slider._cachedWidth - n * 2) + n;
    }
    _calcTranslateXByPointerEvent(n) {
      return n.clientX - this._slider._cachedLeft;
    }
    _updateWidthActive() {
      (this._hostElement.style.padding = `0 ${this._slider._inputPadding}px`),
        (this._hostElement.style.width = `calc(100% + ${this._slider._inputPadding}px)`);
    }
    _updateWidthInactive() {
      (this._hostElement.style.padding = '0px'),
        (this._hostElement.style.width = 'calc(100% + 48px)'),
        (this._hostElement.style.left = '-24px');
    }
    _updateThumbUIByValue(n) {
      (this.translateX = this._clamp(this._calcTranslateXByValue())),
        this._updateThumbUI(n);
    }
    _updateThumbUIByPointerEvent(n, r) {
      (this.translateX = this._clamp(this._calcTranslateXByPointerEvent(n))),
        this._updateThumbUI(r);
    }
    _updateThumbUI(n) {
      this._slider._setTransition(!!n?.withAnimation),
        this._slider._onTranslateXChange(this);
    }
    writeValue(n) {
      (this._isControlInitialized || n !== null) && (this.value = n);
    }
    registerOnChange(n) {
      (this._onChangeFn = n), (this._isControlInitialized = !0);
    }
    registerOnTouched(n) {
      this._onTouchedFn = n;
    }
    setDisabledState(n) {
      this.disabled = n;
    }
    focus() {
      this._hostElement.focus();
    }
    blur() {
      this._hostElement.blur();
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(p(I), p(z), p(ze), p(Yh));
  }),
    (e.ɵdir = q({
      type: e,
      selectors: [['input', 'matSliderThumb', '']],
      hostAttrs: ['type', 'range', 1, 'mdc-slider__input'],
      hostVars: 1,
      hostBindings: function (r, o) {
        r & 1 &&
          ye('change', function () {
            return o._onChange();
          })('input', function () {
            return o._onInput();
          })('blur', function () {
            return o._onBlur();
          })('focus', function () {
            return o._onFocus();
          }),
          r & 2 && pe('aria-valuetext', o._valuetext);
      },
      inputs: { value: 'value' },
      outputs: {
        valueChange: 'valueChange',
        dragStart: 'dragStart',
        dragEnd: 'dragEnd',
      },
      exportAs: ['matSliderThumb'],
      features: [Pe([dN, { provide: Px, useExisting: e }])],
    }));
  let t = e;
  return t;
})();
var jx = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = V({ type: e })),
    (e.ɵinj = L({ imports: [Ie, Kn] }));
  let t = e;
  return t;
})();
var U = 'primary',
  gs = Symbol('RouteTitle'),
  nm = class {
    constructor(e) {
      this.params = e || {};
    }
    has(e) {
      return Object.prototype.hasOwnProperty.call(this.params, e);
    }
    get(e) {
      if (this.has(e)) {
        let i = this.params[e];
        return Array.isArray(i) ? i[0] : i;
      }
      return null;
    }
    getAll(e) {
      if (this.has(e)) {
        let i = this.params[e];
        return Array.isArray(i) ? i : [i];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function Fr(t) {
  return new nm(t);
}
function fN(t, e, i) {
  let n = i.path.split('/');
  if (
    n.length > t.length ||
    (i.pathMatch === 'full' && (e.hasChildren() || n.length < t.length))
  )
    return null;
  let r = {};
  for (let o = 0; o < n.length; o++) {
    let s = n[o],
      a = t[o];
    if (s.startsWith(':')) r[s.substring(1)] = a;
    else if (s !== a.path) return null;
  }
  return { consumed: t.slice(0, n.length), posParams: r };
}
function hN(t, e) {
  if (t.length !== e.length) return !1;
  for (let i = 0; i < t.length; ++i) if (!rn(t[i], e[i])) return !1;
  return !0;
}
function rn(t, e) {
  let i = t ? im(t) : void 0,
    n = e ? im(e) : void 0;
  if (!i || !n || i.length != n.length) return !1;
  let r;
  for (let o = 0; o < i.length; o++)
    if (((r = i[o]), !Qx(t[r], e[r]))) return !1;
  return !0;
}
function im(t) {
  return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)];
}
function Qx(t, e) {
  if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length) return !1;
    let i = [...t].sort(),
      n = [...e].sort();
    return i.every((r, o) => n[o] === r);
  } else return t === e;
}
function Zx(t) {
  return t.length > 0 ? t[t.length - 1] : null;
}
function ii(t) {
  return ia(t) ? t : Ai(t) ? ve(Promise.resolve(t)) : M(t);
}
var mN = { exact: Xx, subset: Kx },
  Yx = { exact: pN, subset: gN, ignored: () => !0 };
function Bx(t, e, i) {
  return (
    mN[i.paths](t.root, e.root, i.matrixParams) &&
    Yx[i.queryParams](t.queryParams, e.queryParams) &&
    !(i.fragment === 'exact' && t.fragment !== e.fragment)
  );
}
function pN(t, e) {
  return rn(t, e);
}
function Xx(t, e, i) {
  if (
    !Hi(t.segments, e.segments) ||
    !wl(t.segments, e.segments, i) ||
    t.numberOfChildren !== e.numberOfChildren
  )
    return !1;
  for (let n in e.children)
    if (!t.children[n] || !Xx(t.children[n], e.children[n], i)) return !1;
  return !0;
}
function gN(t, e) {
  return (
    Object.keys(e).length <= Object.keys(t).length &&
    Object.keys(e).every((i) => Qx(t[i], e[i]))
  );
}
function Kx(t, e, i) {
  return Jx(t, e, e.segments, i);
}
function Jx(t, e, i, n) {
  if (t.segments.length > i.length) {
    let r = t.segments.slice(0, i.length);
    return !(!Hi(r, i) || e.hasChildren() || !wl(r, i, n));
  } else if (t.segments.length === i.length) {
    if (!Hi(t.segments, i) || !wl(t.segments, i, n)) return !1;
    for (let r in e.children)
      if (!t.children[r] || !Kx(t.children[r], e.children[r], n)) return !1;
    return !0;
  } else {
    let r = i.slice(0, t.segments.length),
      o = i.slice(t.segments.length);
    return !Hi(t.segments, r) || !wl(t.segments, r, n) || !t.children[U]
      ? !1
      : Jx(t.children[U], e, o, n);
  }
}
function wl(t, e, i) {
  return e.every((n, r) => Yx[i](t[r].parameters, n.parameters));
}
var Jn = class {
    constructor(e = new se([], {}), i = {}, n = null) {
      (this.root = e), (this.queryParams = i), (this.fragment = n);
    }
    get queryParamMap() {
      return (
        this._queryParamMap || (this._queryParamMap = Fr(this.queryParams)),
        this._queryParamMap
      );
    }
    toString() {
      return _N.serialize(this);
    }
  },
  se = class {
    constructor(e, i) {
      (this.segments = e),
        (this.children = i),
        (this.parent = null),
        Object.values(i).forEach((n) => (n.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return El(this);
    }
  },
  Ui = class {
    constructor(e, i) {
      (this.path = e), (this.parameters = i);
    }
    get parameterMap() {
      return (
        this._parameterMap || (this._parameterMap = Fr(this.parameters)),
        this._parameterMap
      );
    }
    toString() {
      return tw(this);
    }
  };
function bN(t, e) {
  return Hi(t, e) && t.every((i, n) => rn(i.parameters, e[n].parameters));
}
function Hi(t, e) {
  return t.length !== e.length ? !1 : t.every((i, n) => i.path === e[n].path);
}
function vN(t, e) {
  let i = [];
  return (
    Object.entries(t.children).forEach(([n, r]) => {
      n === U && (i = i.concat(e(r, n)));
    }),
    Object.entries(t.children).forEach(([n, r]) => {
      n !== U && (i = i.concat(e(r, n)));
    }),
    i
  );
}
var bs = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({
        token: e,
        factory: () => (() => new as())(),
        providedIn: 'root',
      }));
    let t = e;
    return t;
  })(),
  as = class {
    parse(e) {
      let i = new om(e);
      return new Jn(
        i.parseRootSegment(),
        i.parseQueryParams(),
        i.parseFragment()
      );
    }
    serialize(e) {
      let i = `/${ts(e.root, !0)}`,
        n = wN(e.queryParams),
        r = typeof e.fragment == 'string' ? `#${yN(e.fragment)}` : '';
      return `${i}${n}${r}`;
    }
  },
  _N = new as();
function El(t) {
  return t.segments.map((e) => tw(e)).join('/');
}
function ts(t, e) {
  if (!t.hasChildren()) return El(t);
  if (e) {
    let i = t.children[U] ? ts(t.children[U], !1) : '',
      n = [];
    return (
      Object.entries(t.children).forEach(([r, o]) => {
        r !== U && n.push(`${r}:${ts(o, !1)}`);
      }),
      n.length > 0 ? `${i}(${n.join('//')})` : i
    );
  } else {
    let i = vN(t, (n, r) =>
      r === U ? [ts(t.children[U], !1)] : [`${r}:${ts(n, !1)}`]
    );
    return Object.keys(t.children).length === 1 && t.children[U] != null
      ? `${El(t)}/${i[0]}`
      : `${El(t)}/(${i.join('//')})`;
  }
}
function ew(t) {
  return encodeURIComponent(t)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',');
}
function yl(t) {
  return ew(t).replace(/%3B/gi, ';');
}
function yN(t) {
  return encodeURI(t);
}
function rm(t) {
  return ew(t)
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/%26/gi, '&');
}
function Cl(t) {
  return decodeURIComponent(t);
}
function Ux(t) {
  return Cl(t.replace(/\+/g, '%20'));
}
function tw(t) {
  return `${rm(t.path)}${xN(t.parameters)}`;
}
function xN(t) {
  return Object.keys(t)
    .map((e) => `;${rm(e)}=${rm(t[e])}`)
    .join('');
}
function wN(t) {
  let e = Object.keys(t)
    .map((i) => {
      let n = t[i];
      return Array.isArray(n)
        ? n.map((r) => `${yl(i)}=${yl(r)}`).join('&')
        : `${yl(i)}=${yl(n)}`;
    })
    .filter((i) => !!i);
  return e.length ? `?${e.join('&')}` : '';
}
var EN = /^[^\/()?;#]+/;
function Kh(t) {
  let e = t.match(EN);
  return e ? e[0] : '';
}
var CN = /^[^\/()?;=#]+/;
function DN(t) {
  let e = t.match(CN);
  return e ? e[0] : '';
}
var IN = /^[^=?&#]+/;
function MN(t) {
  let e = t.match(IN);
  return e ? e[0] : '';
}
var SN = /^[^&#]+/;
function TN(t) {
  let e = t.match(SN);
  return e ? e[0] : '';
}
var om = class {
  constructor(e) {
    (this.url = e), (this.remaining = e);
  }
  parseRootSegment() {
    return (
      this.consumeOptional('/'),
      this.remaining === '' ||
      this.peekStartsWith('?') ||
      this.peekStartsWith('#')
        ? new se([], {})
        : new se([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let e = {};
    if (this.consumeOptional('?'))
      do this.parseQueryParam(e);
      while (this.consumeOptional('&'));
    return e;
  }
  parseFragment() {
    return this.consumeOptional('#')
      ? decodeURIComponent(this.remaining)
      : null;
  }
  parseChildren() {
    if (this.remaining === '') return {};
    this.consumeOptional('/');
    let e = [];
    for (
      this.peekStartsWith('(') || e.push(this.parseSegment());
      this.peekStartsWith('/') &&
      !this.peekStartsWith('//') &&
      !this.peekStartsWith('/(');

    )
      this.capture('/'), e.push(this.parseSegment());
    let i = {};
    this.peekStartsWith('/(') &&
      (this.capture('/'), (i = this.parseParens(!0)));
    let n = {};
    return (
      this.peekStartsWith('(') && (n = this.parseParens(!1)),
      (e.length > 0 || Object.keys(i).length > 0) && (n[U] = new se(e, i)),
      n
    );
  }
  parseSegment() {
    let e = Kh(this.remaining);
    if (e === '' && this.peekStartsWith(';')) throw new _(4009, !1);
    return this.capture(e), new Ui(Cl(e), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let e = {};
    for (; this.consumeOptional(';'); ) this.parseParam(e);
    return e;
  }
  parseParam(e) {
    let i = DN(this.remaining);
    if (!i) return;
    this.capture(i);
    let n = '';
    if (this.consumeOptional('=')) {
      let r = Kh(this.remaining);
      r && ((n = r), this.capture(n));
    }
    e[Cl(i)] = Cl(n);
  }
  parseQueryParam(e) {
    let i = MN(this.remaining);
    if (!i) return;
    this.capture(i);
    let n = '';
    if (this.consumeOptional('=')) {
      let s = TN(this.remaining);
      s && ((n = s), this.capture(n));
    }
    let r = Ux(i),
      o = Ux(n);
    if (e.hasOwnProperty(r)) {
      let s = e[r];
      Array.isArray(s) || ((s = [s]), (e[r] = s)), s.push(o);
    } else e[r] = o;
  }
  parseParens(e) {
    let i = {};
    for (
      this.capture('(');
      !this.consumeOptional(')') && this.remaining.length > 0;

    ) {
      let n = Kh(this.remaining),
        r = this.remaining[n.length];
      if (r !== '/' && r !== ')' && r !== ';') throw new _(4010, !1);
      let o;
      n.indexOf(':') > -1
        ? ((o = n.slice(0, n.indexOf(':'))), this.capture(o), this.capture(':'))
        : e && (o = U);
      let s = this.parseChildren();
      (i[o] = Object.keys(s).length === 1 ? s[U] : new se([], s)),
        this.consumeOptional('//');
    }
    return i;
  }
  peekStartsWith(e) {
    return this.remaining.startsWith(e);
  }
  consumeOptional(e) {
    return this.peekStartsWith(e)
      ? ((this.remaining = this.remaining.substring(e.length)), !0)
      : !1;
  }
  capture(e) {
    if (!this.consumeOptional(e)) throw new _(4011, !1);
  }
};
function nw(t) {
  return t.segments.length > 0 ? new se([], { [U]: t }) : t;
}
function iw(t) {
  let e = {};
  for (let n of Object.keys(t.children)) {
    let r = t.children[n],
      o = iw(r);
    if (n === U && o.segments.length === 0 && o.hasChildren())
      for (let [s, a] of Object.entries(o.children)) e[s] = a;
    else (o.segments.length > 0 || o.hasChildren()) && (e[n] = o);
  }
  let i = new se(t.segments, e);
  return kN(i);
}
function kN(t) {
  if (t.numberOfChildren === 1 && t.children[U]) {
    let e = t.children[U];
    return new se(t.segments.concat(e.segments), e.children);
  }
  return t;
}
function Nr(t) {
  return t instanceof Jn;
}
function AN(t, e, i = null, n = null) {
  let r = rw(t);
  return ow(r, e, i, n);
}
function rw(t) {
  let e;
  function i(o) {
    let s = {};
    for (let c of o.children) {
      let l = i(c);
      s[c.outlet] = l;
    }
    let a = new se(o.url, s);
    return o === t && (e = a), a;
  }
  let n = i(t.root),
    r = nw(n);
  return e ?? r;
}
function ow(t, e, i, n) {
  let r = t;
  for (; r.parent; ) r = r.parent;
  if (e.length === 0) return Jh(r, r, r, i, n);
  let o = RN(e);
  if (o.toRoot()) return Jh(r, r, new se([], {}), i, n);
  let s = FN(o, r, t),
    a = s.processChildren
      ? rs(s.segmentGroup, s.index, o.commands)
      : aw(s.segmentGroup, s.index, o.commands);
  return Jh(r, s.segmentGroup, a, i, n);
}
function Dl(t) {
  return typeof t == 'object' && t != null && !t.outlets && !t.segmentPath;
}
function cs(t) {
  return typeof t == 'object' && t != null && t.outlets;
}
function Jh(t, e, i, n, r) {
  let o = {};
  n &&
    Object.entries(n).forEach(([c, l]) => {
      o[c] = Array.isArray(l) ? l.map((d) => `${d}`) : `${l}`;
    });
  let s;
  t === e ? (s = i) : (s = sw(t, e, i));
  let a = nw(iw(s));
  return new Jn(a, o, r);
}
function sw(t, e, i) {
  let n = {};
  return (
    Object.entries(t.children).forEach(([r, o]) => {
      o === e ? (n[r] = i) : (n[r] = sw(o, e, i));
    }),
    new se(t.segments, n)
  );
}
var Il = class {
  constructor(e, i, n) {
    if (
      ((this.isAbsolute = e),
      (this.numberOfDoubleDots = i),
      (this.commands = n),
      e && n.length > 0 && Dl(n[0]))
    )
      throw new _(4003, !1);
    let r = n.find(cs);
    if (r && r !== Zx(n)) throw new _(4004, !1);
  }
  toRoot() {
    return (
      this.isAbsolute && this.commands.length === 1 && this.commands[0] == '/'
    );
  }
};
function RN(t) {
  if (typeof t[0] == 'string' && t.length === 1 && t[0] === '/')
    return new Il(!0, 0, t);
  let e = 0,
    i = !1,
    n = t.reduce((r, o, s) => {
      if (typeof o == 'object' && o != null) {
        if (o.outlets) {
          let a = {};
          return (
            Object.entries(o.outlets).forEach(([c, l]) => {
              a[c] = typeof l == 'string' ? l.split('/') : l;
            }),
            [...r, { outlets: a }]
          );
        }
        if (o.segmentPath) return [...r, o.segmentPath];
      }
      return typeof o != 'string'
        ? [...r, o]
        : s === 0
        ? (o.split('/').forEach((a, c) => {
            (c == 0 && a === '.') ||
              (c == 0 && a === ''
                ? (i = !0)
                : a === '..'
                ? e++
                : a != '' && r.push(a));
          }),
          r)
        : [...r, o];
    }, []);
  return new Il(i, e, n);
}
var Ar = class {
  constructor(e, i, n) {
    (this.segmentGroup = e), (this.processChildren = i), (this.index = n);
  }
};
function FN(t, e, i) {
  if (t.isAbsolute) return new Ar(e, !0, 0);
  if (!i) return new Ar(e, !1, NaN);
  if (i.parent === null) return new Ar(i, !0, 0);
  let n = Dl(t.commands[0]) ? 0 : 1,
    r = i.segments.length - 1 + n;
  return NN(i, r, t.numberOfDoubleDots);
}
function NN(t, e, i) {
  let n = t,
    r = e,
    o = i;
  for (; o > r; ) {
    if (((o -= r), (n = n.parent), !n)) throw new _(4005, !1);
    r = n.segments.length;
  }
  return new Ar(n, !1, r - o);
}
function ON(t) {
  return cs(t[0]) ? t[0].outlets : { [U]: t };
}
function aw(t, e, i) {
  if ((t || (t = new se([], {})), t.segments.length === 0 && t.hasChildren()))
    return rs(t, e, i);
  let n = PN(t, e, i),
    r = i.slice(n.commandIndex);
  if (n.match && n.pathIndex < t.segments.length) {
    let o = new se(t.segments.slice(0, n.pathIndex), {});
    return (
      (o.children[U] = new se(t.segments.slice(n.pathIndex), t.children)),
      rs(o, 0, r)
    );
  } else
    return n.match && r.length === 0
      ? new se(t.segments, {})
      : n.match && !t.hasChildren()
      ? sm(t, e, i)
      : n.match
      ? rs(t, 0, r)
      : sm(t, e, i);
}
function rs(t, e, i) {
  if (i.length === 0) return new se(t.segments, {});
  {
    let n = ON(i),
      r = {};
    if (
      Object.keys(n).some((o) => o !== U) &&
      t.children[U] &&
      t.numberOfChildren === 1 &&
      t.children[U].segments.length === 0
    ) {
      let o = rs(t.children[U], e, i);
      return new se(t.segments, o.children);
    }
    return (
      Object.entries(n).forEach(([o, s]) => {
        typeof s == 'string' && (s = [s]),
          s !== null && (r[o] = aw(t.children[o], e, s));
      }),
      Object.entries(t.children).forEach(([o, s]) => {
        n[o] === void 0 && (r[o] = s);
      }),
      new se(t.segments, r)
    );
  }
}
function PN(t, e, i) {
  let n = 0,
    r = e,
    o = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; r < t.segments.length; ) {
    if (n >= i.length) return o;
    let s = t.segments[r],
      a = i[n];
    if (cs(a)) break;
    let c = `${a}`,
      l = n < i.length - 1 ? i[n + 1] : null;
    if (r > 0 && c === void 0) break;
    if (c && l && typeof l == 'object' && l.outlets === void 0) {
      if (!$x(c, l, s)) return o;
      n += 2;
    } else {
      if (!$x(c, {}, s)) return o;
      n++;
    }
    r++;
  }
  return { match: !0, pathIndex: r, commandIndex: n };
}
function sm(t, e, i) {
  let n = t.segments.slice(0, e),
    r = 0;
  for (; r < i.length; ) {
    let o = i[r];
    if (cs(o)) {
      let c = LN(o.outlets);
      return new se(n, c);
    }
    if (r === 0 && Dl(i[0])) {
      let c = t.segments[e];
      n.push(new Ui(c.path, Hx(i[0]))), r++;
      continue;
    }
    let s = cs(o) ? o.outlets[U] : `${o}`,
      a = r < i.length - 1 ? i[r + 1] : null;
    s && a && Dl(a)
      ? (n.push(new Ui(s, Hx(a))), (r += 2))
      : (n.push(new Ui(s, {})), r++);
  }
  return new se(n, {});
}
function LN(t) {
  let e = {};
  return (
    Object.entries(t).forEach(([i, n]) => {
      typeof n == 'string' && (n = [n]),
        n !== null && (e[i] = sm(new se([], {}), 0, n));
    }),
    e
  );
}
function Hx(t) {
  let e = {};
  return Object.entries(t).forEach(([i, n]) => (e[i] = `${n}`)), e;
}
function $x(t, e, i) {
  return t == i.path && rn(e, i.parameters);
}
var os = 'imperative',
  kt = class {
    constructor(e, i) {
      (this.id = e), (this.url = i);
    }
  },
  Or = class extends kt {
    constructor(e, i, n = 'imperative', r = null) {
      super(e, i),
        (this.type = 0),
        (this.navigationTrigger = n),
        (this.restoredState = r);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  Cn = class extends kt {
    constructor(e, i, n) {
      super(e, i), (this.urlAfterRedirects = n), (this.type = 1);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  ei = class extends kt {
    constructor(e, i, n, r) {
      super(e, i), (this.reason = n), (this.code = r), (this.type = 2);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  ti = class extends kt {
    constructor(e, i, n, r) {
      super(e, i), (this.reason = n), (this.code = r), (this.type = 16);
    }
  },
  ls = class extends kt {
    constructor(e, i, n, r) {
      super(e, i), (this.error = n), (this.target = r), (this.type = 3);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  Ml = class extends kt {
    constructor(e, i, n, r) {
      super(e, i),
        (this.urlAfterRedirects = n),
        (this.state = r),
        (this.type = 4);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  am = class extends kt {
    constructor(e, i, n, r) {
      super(e, i),
        (this.urlAfterRedirects = n),
        (this.state = r),
        (this.type = 7);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  cm = class extends kt {
    constructor(e, i, n, r, o) {
      super(e, i),
        (this.urlAfterRedirects = n),
        (this.state = r),
        (this.shouldActivate = o),
        (this.type = 8);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  lm = class extends kt {
    constructor(e, i, n, r) {
      super(e, i),
        (this.urlAfterRedirects = n),
        (this.state = r),
        (this.type = 5);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  dm = class extends kt {
    constructor(e, i, n, r) {
      super(e, i),
        (this.urlAfterRedirects = n),
        (this.state = r),
        (this.type = 6);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  um = class {
    constructor(e) {
      (this.route = e), (this.type = 9);
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  fm = class {
    constructor(e) {
      (this.route = e), (this.type = 10);
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  hm = class {
    constructor(e) {
      (this.snapshot = e), (this.type = 11);
    }
    toString() {
      return `ChildActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
      }')`;
    }
  },
  mm = class {
    constructor(e) {
      (this.snapshot = e), (this.type = 12);
    }
    toString() {
      return `ChildActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
      }')`;
    }
  },
  pm = class {
    constructor(e) {
      (this.snapshot = e), (this.type = 13);
    }
    toString() {
      return `ActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
      }')`;
    }
  },
  gm = class {
    constructor(e) {
      (this.snapshot = e), (this.type = 14);
    }
    toString() {
      return `ActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
      }')`;
    }
  },
  Sl = class {
    constructor(e, i, n) {
      (this.routerEvent = e),
        (this.position = i),
        (this.anchor = n),
        (this.type = 15);
    }
    toString() {
      let e = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
      return `Scroll(anchor: '${this.anchor}', position: '${e}')`;
    }
  },
  ds = class {},
  us = class {
    constructor(e) {
      this.url = e;
    }
  };
var bm = class {
    constructor() {
      (this.outlet = null),
        (this.route = null),
        (this.injector = null),
        (this.children = new vs()),
        (this.attachRef = null);
    }
  },
  vs = (() => {
    let e = class e {
      constructor() {
        this.contexts = new Map();
      }
      onChildOutletCreated(n, r) {
        let o = this.getOrCreateContext(n);
        (o.outlet = r), this.contexts.set(n, o);
      }
      onChildOutletDestroyed(n) {
        let r = this.getContext(n);
        r && ((r.outlet = null), (r.attachRef = null));
      }
      onOutletDeactivated() {
        let n = this.contexts;
        return (this.contexts = new Map()), n;
      }
      onOutletReAttached(n) {
        this.contexts = n;
      }
      getOrCreateContext(n) {
        let r = this.getContext(n);
        return r || ((r = new bm()), this.contexts.set(n, r)), r;
      }
      getContext(n) {
        return this.contexts.get(n) || null;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  Tl = class {
    constructor(e) {
      this._root = e;
    }
    get root() {
      return this._root.value;
    }
    parent(e) {
      let i = this.pathFromRoot(e);
      return i.length > 1 ? i[i.length - 2] : null;
    }
    children(e) {
      let i = vm(e, this._root);
      return i ? i.children.map((n) => n.value) : [];
    }
    firstChild(e) {
      let i = vm(e, this._root);
      return i && i.children.length > 0 ? i.children[0].value : null;
    }
    siblings(e) {
      let i = _m(e, this._root);
      return i.length < 2
        ? []
        : i[i.length - 2].children.map((r) => r.value).filter((r) => r !== e);
    }
    pathFromRoot(e) {
      return _m(e, this._root).map((i) => i.value);
    }
  };
function vm(t, e) {
  if (t === e.value) return e;
  for (let i of e.children) {
    let n = vm(t, i);
    if (n) return n;
  }
  return null;
}
function _m(t, e) {
  if (t === e.value) return [e];
  for (let i of e.children) {
    let n = _m(t, i);
    if (n.length) return n.unshift(e), n;
  }
  return [];
}
var Ct = class {
  constructor(e, i) {
    (this.value = e), (this.children = i);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function kr(t) {
  let e = {};
  return t && t.children.forEach((i) => (e[i.value.outlet] = i)), e;
}
var kl = class extends Tl {
  constructor(e, i) {
    super(e), (this.snapshot = i), Tm(this, e);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function cw(t, e) {
  let i = VN(t, e),
    n = new Ve([new Ui('', {})]),
    r = new Ve({}),
    o = new Ve({}),
    s = new Ve({}),
    a = new Ve(''),
    c = new $i(n, r, s, a, o, U, e, i.root);
  return (c.snapshot = i.root), new kl(new Ct(c, []), i);
}
function VN(t, e) {
  let i = {},
    n = {},
    r = {},
    o = '',
    s = new fs([], i, r, o, n, U, e, null, {});
  return new Al('', new Ct(s, []));
}
var $i = class {
  constructor(e, i, n, r, o, s, a, c) {
    (this.urlSubject = e),
      (this.paramsSubject = i),
      (this.queryParamsSubject = n),
      (this.fragmentSubject = r),
      (this.dataSubject = o),
      (this.outlet = s),
      (this.component = a),
      (this._futureSnapshot = c),
      (this.title = this.dataSubject?.pipe(A((l) => l[gs])) ?? M(void 0)),
      (this.url = e),
      (this.params = i),
      (this.queryParams = n),
      (this.fragment = r),
      (this.data = o);
  }
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  get root() {
    return this._routerState.root;
  }
  get parent() {
    return this._routerState.parent(this);
  }
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  get children() {
    return this._routerState.children(this);
  }
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    return (
      this._paramMap || (this._paramMap = this.params.pipe(A((e) => Fr(e)))),
      this._paramMap
    );
  }
  get queryParamMap() {
    return (
      this._queryParamMap ||
        (this._queryParamMap = this.queryParams.pipe(A((e) => Fr(e)))),
      this._queryParamMap
    );
  }
  toString() {
    return this.snapshot
      ? this.snapshot.toString()
      : `Future(${this._futureSnapshot})`;
  }
};
function Sm(t, e, i = 'emptyOnly') {
  let n,
    { routeConfig: r } = t;
  return (
    e !== null &&
    (i === 'always' ||
      r?.path === '' ||
      (!e.component && !e.routeConfig?.loadComponent))
      ? (n = {
          params: x(x({}, e.params), t.params),
          data: x(x({}, e.data), t.data),
          resolve: x(x(x(x({}, t.data), e.data), r?.data), t._resolvedData),
        })
      : (n = {
          params: x({}, t.params),
          data: x({}, t.data),
          resolve: x(x({}, t.data), t._resolvedData ?? {}),
        }),
    r && dw(r) && (n.resolve[gs] = r.title),
    n
  );
}
var fs = class {
    get title() {
      return this.data?.[gs];
    }
    constructor(e, i, n, r, o, s, a, c, l) {
      (this.url = e),
        (this.params = i),
        (this.queryParams = n),
        (this.fragment = r),
        (this.data = o),
        (this.outlet = s),
        (this.component = a),
        (this.routeConfig = c),
        (this._resolve = l);
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return (
        this._paramMap || (this._paramMap = Fr(this.params)), this._paramMap
      );
    }
    get queryParamMap() {
      return (
        this._queryParamMap || (this._queryParamMap = Fr(this.queryParams)),
        this._queryParamMap
      );
    }
    toString() {
      let e = this.url.map((n) => n.toString()).join('/'),
        i = this.routeConfig ? this.routeConfig.path : '';
      return `Route(url:'${e}', path:'${i}')`;
    }
  },
  Al = class extends Tl {
    constructor(e, i) {
      super(i), (this.url = e), Tm(this, i);
    }
    toString() {
      return lw(this._root);
    }
  };
function Tm(t, e) {
  (e.value._routerState = t), e.children.forEach((i) => Tm(t, i));
}
function lw(t) {
  let e = t.children.length > 0 ? ` { ${t.children.map(lw).join(', ')} } ` : '';
  return `${t.value}${e}`;
}
function em(t) {
  if (t.snapshot) {
    let e = t.snapshot,
      i = t._futureSnapshot;
    (t.snapshot = i),
      rn(e.queryParams, i.queryParams) ||
        t.queryParamsSubject.next(i.queryParams),
      e.fragment !== i.fragment && t.fragmentSubject.next(i.fragment),
      rn(e.params, i.params) || t.paramsSubject.next(i.params),
      hN(e.url, i.url) || t.urlSubject.next(i.url),
      rn(e.data, i.data) || t.dataSubject.next(i.data);
  } else
    (t.snapshot = t._futureSnapshot),
      t.dataSubject.next(t._futureSnapshot.data);
}
function ym(t, e) {
  let i = rn(t.params, e.params) && bN(t.url, e.url),
    n = !t.parent != !e.parent;
  return i && !n && (!t.parent || ym(t.parent, e.parent));
}
function dw(t) {
  return typeof t.title == 'string' || t.title === null;
}
var km = (() => {
    let e = class e {
      constructor() {
        (this.activated = null),
          (this._activatedRoute = null),
          (this.name = U),
          (this.activateEvents = new Y()),
          (this.deactivateEvents = new Y()),
          (this.attachEvents = new Y()),
          (this.detachEvents = new Y()),
          (this.parentContexts = b(vs)),
          (this.location = b(ki)),
          (this.changeDetector = b(ze)),
          (this.environmentInjector = b(lt)),
          (this.inputBinder = b(Ol, { optional: !0 })),
          (this.supportsBindingToComponentInputs = !0);
      }
      get activatedComponentRef() {
        return this.activated;
      }
      ngOnChanges(n) {
        if (n.name) {
          let { firstChange: r, previousValue: o } = n.name;
          if (r) return;
          this.isTrackedInParentContexts(o) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)),
            this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        this.isTrackedInParentContexts(this.name) &&
          this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(n) {
        return this.parentContexts.getContext(n)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        if (
          (this.parentContexts.onChildOutletCreated(this.name, this),
          this.activated)
        )
          return;
        let n = this.parentContexts.getContext(this.name);
        n?.route &&
          (n.attachRef
            ? this.attach(n.attachRef, n.route)
            : this.activateWith(n.route, n.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new _(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new _(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new _(4012, !1);
        this.location.detach();
        let n = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(n.instance),
          n
        );
      }
      attach(n, r) {
        (this.activated = n),
          (this._activatedRoute = r),
          this.location.insert(n.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(n.instance);
      }
      deactivate() {
        if (this.activated) {
          let n = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(n);
        }
      }
      activateWith(n, r) {
        if (this.isActivated) throw new _(4013, !1);
        this._activatedRoute = n;
        let o = this.location,
          a = n.snapshot.component,
          c = this.parentContexts.getOrCreateContext(this.name).children,
          l = new xm(n, c, o.injector);
        (this.activated = o.createComponent(a, {
          index: o.length,
          injector: l,
          environmentInjector: r ?? this.environmentInjector,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵdir = q({
        type: e,
        selectors: [['router-outlet']],
        inputs: { name: 'name' },
        outputs: {
          activateEvents: 'activate',
          deactivateEvents: 'deactivate',
          attachEvents: 'attach',
          detachEvents: 'detach',
        },
        exportAs: ['outlet'],
        standalone: !0,
        features: [ft],
      }));
    let t = e;
    return t;
  })(),
  xm = class {
    constructor(e, i, n) {
      (this.route = e), (this.childContexts = i), (this.parent = n);
    }
    get(e, i) {
      return e === $i
        ? this.route
        : e === vs
        ? this.childContexts
        : this.parent.get(e, i);
    }
  },
  Ol = new w(''),
  zx = (() => {
    let e = class e {
      constructor() {
        this.outletDataSubscriptions = new Map();
      }
      bindActivatedRouteToOutletComponent(n) {
        this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
      }
      unsubscribeFromRouteData(n) {
        this.outletDataSubscriptions.get(n)?.unsubscribe(),
          this.outletDataSubscriptions.delete(n);
      }
      subscribeToRouteData(n) {
        let { activatedRoute: r } = n,
          o = pi([r.queryParams, r.params, r.data])
            .pipe(
              bt(
                ([s, a, c], l) => (
                  (c = x(x(x({}, s), a), c)),
                  l === 0 ? M(c) : Promise.resolve(c)
                )
              )
            )
            .subscribe((s) => {
              if (
                !n.isActivated ||
                !n.activatedComponentRef ||
                n.activatedRoute !== r ||
                r.component === null
              ) {
                this.unsubscribeFromRouteData(n);
                return;
              }
              let a = R_(r.component);
              if (!a) {
                this.unsubscribeFromRouteData(n);
                return;
              }
              for (let { templateName: c } of a.inputs)
                n.activatedComponentRef.setInput(c, s[c]);
            });
        this.outletDataSubscriptions.set(n, o);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })();
function jN(t, e, i) {
  let n = hs(t, e._root, i ? i._root : void 0);
  return new kl(n, e);
}
function hs(t, e, i) {
  if (i && t.shouldReuseRoute(e.value, i.value.snapshot)) {
    let n = i.value;
    n._futureSnapshot = e.value;
    let r = BN(t, e, i);
    return new Ct(n, r);
  } else {
    if (t.shouldAttach(e.value)) {
      let o = t.retrieve(e.value);
      if (o !== null) {
        let s = o.route;
        return (
          (s.value._futureSnapshot = e.value),
          (s.children = e.children.map((a) => hs(t, a))),
          s
        );
      }
    }
    let n = UN(e.value),
      r = e.children.map((o) => hs(t, o));
    return new Ct(n, r);
  }
}
function BN(t, e, i) {
  return e.children.map((n) => {
    for (let r of i.children)
      if (t.shouldReuseRoute(n.value, r.value.snapshot)) return hs(t, n, r);
    return hs(t, n);
  });
}
function UN(t) {
  return new $i(
    new Ve(t.url),
    new Ve(t.params),
    new Ve(t.queryParams),
    new Ve(t.fragment),
    new Ve(t.data),
    t.outlet,
    t.component,
    t
  );
}
var uw = 'ngNavigationCancelingError';
function fw(t, e) {
  let { redirectTo: i, navigationBehaviorOptions: n } = Nr(e)
      ? { redirectTo: e, navigationBehaviorOptions: void 0 }
      : e,
    r = hw(!1, 0, e);
  return (r.url = i), (r.navigationBehaviorOptions = n), r;
}
function hw(t, e, i) {
  let n = new Error('NavigationCancelingError: ' + (t || ''));
  return (n[uw] = !0), (n.cancellationCode = e), i && (n.url = i), n;
}
function HN(t) {
  return mw(t) && Nr(t.url);
}
function mw(t) {
  return t && t[uw];
}
var $N = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵcmp = De({
      type: e,
      selectors: [['ng-component']],
      standalone: !0,
      features: [mc],
      decls: 1,
      vars: 0,
      template: function (r, o) {
        r & 1 && j(0, 'router-outlet');
      },
      dependencies: [km],
      encapsulation: 2,
    }));
  let t = e;
  return t;
})();
function zN(t, e) {
  return (
    t.providers &&
      !t._injector &&
      (t._injector = hc(t.providers, e, `Route: ${t.path}`)),
    t._injector ?? e
  );
}
function Am(t) {
  let e = t.children && t.children.map(Am),
    i = e ? he(x({}, t), { children: e }) : x({}, t);
  return (
    !i.component &&
      !i.loadComponent &&
      (e || i.loadChildren) &&
      i.outlet &&
      i.outlet !== U &&
      (i.component = $N),
    i
  );
}
function on(t) {
  return t.outlet || U;
}
function WN(t, e) {
  let i = t.filter((n) => on(n) === e);
  return i.push(...t.filter((n) => on(n) !== e)), i;
}
function _s(t) {
  if (!t) return null;
  if (t.routeConfig?._injector) return t.routeConfig._injector;
  for (let e = t.parent; e; e = e.parent) {
    let i = e.routeConfig;
    if (i?._loadedInjector) return i._loadedInjector;
    if (i?._injector) return i._injector;
  }
  return null;
}
var GN = (t, e, i, n) =>
    A(
      (r) => (
        new wm(e, r.targetRouterState, r.currentRouterState, i, n).activate(t),
        r
      )
    ),
  wm = class {
    constructor(e, i, n, r, o) {
      (this.routeReuseStrategy = e),
        (this.futureState = i),
        (this.currState = n),
        (this.forwardEvent = r),
        (this.inputBindingEnabled = o);
    }
    activate(e) {
      let i = this.futureState._root,
        n = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(i, n, e),
        em(this.futureState.root),
        this.activateChildRoutes(i, n, e);
    }
    deactivateChildRoutes(e, i, n) {
      let r = kr(i);
      e.children.forEach((o) => {
        let s = o.value.outlet;
        this.deactivateRoutes(o, r[s], n), delete r[s];
      }),
        Object.values(r).forEach((o) => {
          this.deactivateRouteAndItsChildren(o, n);
        });
    }
    deactivateRoutes(e, i, n) {
      let r = e.value,
        o = i ? i.value : null;
      if (r === o)
        if (r.component) {
          let s = n.getContext(r.outlet);
          s && this.deactivateChildRoutes(e, i, s.children);
        } else this.deactivateChildRoutes(e, i, n);
      else o && this.deactivateRouteAndItsChildren(i, n);
    }
    deactivateRouteAndItsChildren(e, i) {
      e.value.component &&
      this.routeReuseStrategy.shouldDetach(e.value.snapshot)
        ? this.detachAndStoreRouteSubtree(e, i)
        : this.deactivateRouteAndOutlet(e, i);
    }
    detachAndStoreRouteSubtree(e, i) {
      let n = i.getContext(e.value.outlet),
        r = n && e.value.component ? n.children : i,
        o = kr(e);
      for (let s of Object.keys(o)) this.deactivateRouteAndItsChildren(o[s], r);
      if (n && n.outlet) {
        let s = n.outlet.detach(),
          a = n.children.onOutletDeactivated();
        this.routeReuseStrategy.store(e.value.snapshot, {
          componentRef: s,
          route: e,
          contexts: a,
        });
      }
    }
    deactivateRouteAndOutlet(e, i) {
      let n = i.getContext(e.value.outlet),
        r = n && e.value.component ? n.children : i,
        o = kr(e);
      for (let s of Object.keys(o)) this.deactivateRouteAndItsChildren(o[s], r);
      n &&
        (n.outlet && (n.outlet.deactivate(), n.children.onOutletDeactivated()),
        (n.attachRef = null),
        (n.route = null));
    }
    activateChildRoutes(e, i, n) {
      let r = kr(i);
      e.children.forEach((o) => {
        this.activateRoutes(o, r[o.value.outlet], n),
          this.forwardEvent(new gm(o.value.snapshot));
      }),
        e.children.length && this.forwardEvent(new mm(e.value.snapshot));
    }
    activateRoutes(e, i, n) {
      let r = e.value,
        o = i ? i.value : null;
      if ((em(r), r === o))
        if (r.component) {
          let s = n.getOrCreateContext(r.outlet);
          this.activateChildRoutes(e, i, s.children);
        } else this.activateChildRoutes(e, i, n);
      else if (r.component) {
        let s = n.getOrCreateContext(r.outlet);
        if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(r.snapshot);
          this.routeReuseStrategy.store(r.snapshot, null),
            s.children.onOutletReAttached(a.contexts),
            (s.attachRef = a.componentRef),
            (s.route = a.route.value),
            s.outlet && s.outlet.attach(a.componentRef, a.route.value),
            em(a.route.value),
            this.activateChildRoutes(e, null, s.children);
        } else {
          let a = _s(r.snapshot);
          (s.attachRef = null),
            (s.route = r),
            (s.injector = a),
            s.outlet && s.outlet.activateWith(r, s.injector),
            this.activateChildRoutes(e, null, s.children);
        }
      } else this.activateChildRoutes(e, null, n);
    }
  },
  Rl = class {
    constructor(e) {
      (this.path = e), (this.route = this.path[this.path.length - 1]);
    }
  },
  Rr = class {
    constructor(e, i) {
      (this.component = e), (this.route = i);
    }
  };
function qN(t, e, i) {
  let n = t._root,
    r = e ? e._root : null;
  return ns(n, r, i, [n.value]);
}
function QN(t) {
  let e = t.routeConfig ? t.routeConfig.canActivateChild : null;
  return !e || e.length === 0 ? null : { node: t, guards: e };
}
function Lr(t, e) {
  let i = Symbol(),
    n = e.get(t, i);
  return n === i ? (typeof t == 'function' && !kg(t) ? t : e.get(t)) : n;
}
function ns(
  t,
  e,
  i,
  n,
  r = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let o = kr(e);
  return (
    t.children.forEach((s) => {
      ZN(s, o[s.value.outlet], i, n.concat([s.value]), r),
        delete o[s.value.outlet];
    }),
    Object.entries(o).forEach(([s, a]) => ss(a, i.getContext(s), r)),
    r
  );
}
function ZN(
  t,
  e,
  i,
  n,
  r = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let o = t.value,
    s = e ? e.value : null,
    a = i ? i.getContext(t.value.outlet) : null;
  if (s && o.routeConfig === s.routeConfig) {
    let c = YN(s, o, o.routeConfig.runGuardsAndResolvers);
    c
      ? r.canActivateChecks.push(new Rl(n))
      : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
      o.component ? ns(t, e, a ? a.children : null, n, r) : ns(t, e, i, n, r),
      c &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        r.canDeactivateChecks.push(new Rr(a.outlet.component, s));
  } else
    s && ss(e, a, r),
      r.canActivateChecks.push(new Rl(n)),
      o.component
        ? ns(t, null, a ? a.children : null, n, r)
        : ns(t, null, i, n, r);
  return r;
}
function YN(t, e, i) {
  if (typeof i == 'function') return i(t, e);
  switch (i) {
    case 'pathParamsChange':
      return !Hi(t.url, e.url);
    case 'pathParamsOrQueryParamsChange':
      return !Hi(t.url, e.url) || !rn(t.queryParams, e.queryParams);
    case 'always':
      return !0;
    case 'paramsOrQueryParamsChange':
      return !ym(t, e) || !rn(t.queryParams, e.queryParams);
    case 'paramsChange':
    default:
      return !ym(t, e);
  }
}
function ss(t, e, i) {
  let n = kr(t),
    r = t.value;
  Object.entries(n).forEach(([o, s]) => {
    r.component
      ? e
        ? ss(s, e.children.getContext(o), i)
        : ss(s, null, i)
      : ss(s, e, i);
  }),
    r.component
      ? e && e.outlet && e.outlet.isActivated
        ? i.canDeactivateChecks.push(new Rr(e.outlet.component, r))
        : i.canDeactivateChecks.push(new Rr(null, r))
      : i.canDeactivateChecks.push(new Rr(null, r));
}
function ys(t) {
  return typeof t == 'function';
}
function XN(t) {
  return typeof t == 'boolean';
}
function KN(t) {
  return t && ys(t.canLoad);
}
function JN(t) {
  return t && ys(t.canActivate);
}
function eO(t) {
  return t && ys(t.canActivateChild);
}
function tO(t) {
  return t && ys(t.canDeactivate);
}
function nO(t) {
  return t && ys(t.canMatch);
}
function pw(t) {
  return t instanceof cn || t?.name === 'EmptyError';
}
var xl = Symbol('INITIAL_VALUE');
function Pr() {
  return bt((t) =>
    pi(t.map((e) => e.pipe(at(1), Xr(xl)))).pipe(
      A((e) => {
        for (let i of e)
          if (i !== !0) {
            if (i === xl) return xl;
            if (i === !1 || i instanceof Jn) return i;
          }
        return !0;
      }),
      je((e) => e !== xl),
      at(1)
    )
  );
}
function iO(t, e) {
  return Oe((i) => {
    let {
      targetSnapshot: n,
      currentSnapshot: r,
      guards: { canActivateChecks: o, canDeactivateChecks: s },
    } = i;
    return s.length === 0 && o.length === 0
      ? M(he(x({}, i), { guardsResult: !0 }))
      : rO(s, n, r, t).pipe(
          Oe((a) => (a && XN(a) ? oO(n, o, t, e) : M(a))),
          A((a) => he(x({}, i), { guardsResult: a }))
        );
  });
}
function rO(t, e, i, n) {
  return ve(t).pipe(
    Oe((r) => dO(r.component, r.route, i, e, n)),
    Nt((r) => r !== !0, !0)
  );
}
function oO(t, e, i, n) {
  return ve(e).pipe(
    ln((r) =>
      Tn(
        aO(r.route.parent, n),
        sO(r.route, n),
        lO(t, r.path, i),
        cO(t, r.route, i)
      )
    ),
    Nt((r) => r !== !0, !0)
  );
}
function sO(t, e) {
  return t !== null && e && e(new pm(t)), M(!0);
}
function aO(t, e) {
  return t !== null && e && e(new hm(t)), M(!0);
}
function cO(t, e, i) {
  let n = e.routeConfig ? e.routeConfig.canActivate : null;
  if (!n || n.length === 0) return M(!0);
  let r = n.map((o) =>
    aa(() => {
      let s = _s(e) ?? i,
        a = Lr(o, s),
        c = JN(a) ? a.canActivate(e, t) : pn(s, () => a(e, t));
      return ii(c).pipe(Nt());
    })
  );
  return M(r).pipe(Pr());
}
function lO(t, e, i) {
  let n = e[e.length - 1],
    o = e
      .slice(0, e.length - 1)
      .reverse()
      .map((s) => QN(s))
      .filter((s) => s !== null)
      .map((s) =>
        aa(() => {
          let a = s.guards.map((c) => {
            let l = _s(s.node) ?? i,
              d = Lr(c, l),
              u = eO(d) ? d.canActivateChild(n, t) : pn(l, () => d(n, t));
            return ii(u).pipe(Nt());
          });
          return M(a).pipe(Pr());
        })
      );
  return M(o).pipe(Pr());
}
function dO(t, e, i, n, r) {
  let o = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
  if (!o || o.length === 0) return M(!0);
  let s = o.map((a) => {
    let c = _s(e) ?? r,
      l = Lr(a, c),
      d = tO(l) ? l.canDeactivate(t, e, i, n) : pn(c, () => l(t, e, i, n));
    return ii(d).pipe(Nt());
  });
  return M(s).pipe(Pr());
}
function uO(t, e, i, n) {
  let r = e.canLoad;
  if (r === void 0 || r.length === 0) return M(!0);
  let o = r.map((s) => {
    let a = Lr(s, t),
      c = KN(a) ? a.canLoad(e, i) : pn(t, () => a(e, i));
    return ii(c);
  });
  return M(o).pipe(Pr(), gw(n));
}
function gw(t) {
  return sd(
    Ee((e) => {
      if (Nr(e)) throw fw(t, e);
    }),
    A((e) => e === !0)
  );
}
function fO(t, e, i, n) {
  let r = e.canMatch;
  if (!r || r.length === 0) return M(!0);
  let o = r.map((s) => {
    let a = Lr(s, t),
      c = nO(a) ? a.canMatch(e, i) : pn(t, () => a(e, i));
    return ii(c);
  });
  return M(o).pipe(Pr(), gw(n));
}
var ms = class {
    constructor(e) {
      this.segmentGroup = e || null;
    }
  },
  Fl = class extends Error {
    constructor(e) {
      super(), (this.urlTree = e);
    }
  };
function Tr(t) {
  return Mn(new ms(t));
}
function hO(t) {
  return Mn(new _(4e3, !1));
}
function mO(t) {
  return Mn(hw(!1, 3));
}
var Em = class {
    constructor(e, i) {
      (this.urlSerializer = e), (this.urlTree = i);
    }
    lineralizeSegments(e, i) {
      let n = [],
        r = i.root;
      for (;;) {
        if (((n = n.concat(r.segments)), r.numberOfChildren === 0)) return M(n);
        if (r.numberOfChildren > 1 || !r.children[U]) return hO(e.redirectTo);
        r = r.children[U];
      }
    }
    applyRedirectCommands(e, i, n) {
      let r = this.applyRedirectCreateUrlTree(
        i,
        this.urlSerializer.parse(i),
        e,
        n
      );
      if (i.startsWith('/')) throw new Fl(r);
      return r;
    }
    applyRedirectCreateUrlTree(e, i, n, r) {
      let o = this.createSegmentGroup(e, i.root, n, r);
      return new Jn(
        o,
        this.createQueryParams(i.queryParams, this.urlTree.queryParams),
        i.fragment
      );
    }
    createQueryParams(e, i) {
      let n = {};
      return (
        Object.entries(e).forEach(([r, o]) => {
          if (typeof o == 'string' && o.startsWith(':')) {
            let a = o.substring(1);
            n[r] = i[a];
          } else n[r] = o;
        }),
        n
      );
    }
    createSegmentGroup(e, i, n, r) {
      let o = this.createSegments(e, i.segments, n, r),
        s = {};
      return (
        Object.entries(i.children).forEach(([a, c]) => {
          s[a] = this.createSegmentGroup(e, c, n, r);
        }),
        new se(o, s)
      );
    }
    createSegments(e, i, n, r) {
      return i.map((o) =>
        o.path.startsWith(':')
          ? this.findPosParam(e, o, r)
          : this.findOrReturn(o, n)
      );
    }
    findPosParam(e, i, n) {
      let r = n[i.path.substring(1)];
      if (!r) throw new _(4001, !1);
      return r;
    }
    findOrReturn(e, i) {
      let n = 0;
      for (let r of i) {
        if (r.path === e.path) return i.splice(n), r;
        n++;
      }
      return e;
    }
  },
  Cm = {
    matched: !1,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {},
  };
function pO(t, e, i, n, r) {
  let o = Rm(t, e, i);
  return o.matched
    ? ((n = zN(e, n)),
      fO(n, e, i, r).pipe(A((s) => (s === !0 ? o : x({}, Cm)))))
    : M(o);
}
function Rm(t, e, i) {
  if (e.path === '**') return gO(i);
  if (e.path === '')
    return e.pathMatch === 'full' && (t.hasChildren() || i.length > 0)
      ? x({}, Cm)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: i,
          parameters: {},
          positionalParamSegments: {},
        };
  let r = (e.matcher || fN)(i, t, e);
  if (!r) return x({}, Cm);
  let o = {};
  Object.entries(r.posParams ?? {}).forEach(([a, c]) => {
    o[a] = c.path;
  });
  let s =
    r.consumed.length > 0
      ? x(x({}, o), r.consumed[r.consumed.length - 1].parameters)
      : o;
  return {
    matched: !0,
    consumedSegments: r.consumed,
    remainingSegments: i.slice(r.consumed.length),
    parameters: s,
    positionalParamSegments: r.posParams ?? {},
  };
}
function gO(t) {
  return {
    matched: !0,
    parameters: t.length > 0 ? Zx(t).parameters : {},
    consumedSegments: t,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function Wx(t, e, i, n) {
  return i.length > 0 && _O(t, i, n)
    ? {
        segmentGroup: new se(e, vO(n, new se(i, t.children))),
        slicedSegments: [],
      }
    : i.length === 0 && yO(t, i, n)
    ? {
        segmentGroup: new se(t.segments, bO(t, e, i, n, t.children)),
        slicedSegments: i,
      }
    : { segmentGroup: new se(t.segments, t.children), slicedSegments: i };
}
function bO(t, e, i, n, r) {
  let o = {};
  for (let s of n)
    if (Pl(t, i, s) && !r[on(s)]) {
      let a = new se([], {});
      o[on(s)] = a;
    }
  return x(x({}, r), o);
}
function vO(t, e) {
  let i = {};
  i[U] = e;
  for (let n of t)
    if (n.path === '' && on(n) !== U) {
      let r = new se([], {});
      i[on(n)] = r;
    }
  return i;
}
function _O(t, e, i) {
  return i.some((n) => Pl(t, e, n) && on(n) !== U);
}
function yO(t, e, i) {
  return i.some((n) => Pl(t, e, n));
}
function Pl(t, e, i) {
  return (t.hasChildren() || e.length > 0) && i.pathMatch === 'full'
    ? !1
    : i.path === '';
}
function xO(t, e, i, n) {
  return on(t) !== n && (n === U || !Pl(e, i, t)) ? !1 : Rm(e, t, i).matched;
}
function wO(t, e, i) {
  return e.length === 0 && !t.children[i];
}
var Dm = class {};
function EO(t, e, i, n, r, o, s = 'emptyOnly') {
  return new Im(t, e, i, n, r, s, o).recognize();
}
var CO = 31,
  Im = class {
    constructor(e, i, n, r, o, s, a) {
      (this.injector = e),
        (this.configLoader = i),
        (this.rootComponentType = n),
        (this.config = r),
        (this.urlTree = o),
        (this.paramsInheritanceStrategy = s),
        (this.urlSerializer = a),
        (this.applyRedirects = new Em(this.urlSerializer, this.urlTree)),
        (this.absoluteRedirectCount = 0),
        (this.allowRedirects = !0);
    }
    noMatchError(e) {
      return new _(4002, `'${e.segmentGroup}'`);
    }
    recognize() {
      let e = Wx(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(e).pipe(
        A((i) => {
          let n = new fs(
              [],
              Object.freeze({}),
              Object.freeze(x({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              U,
              this.rootComponentType,
              null,
              {}
            ),
            r = new Ct(n, i),
            o = new Al('', r),
            s = AN(n, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (s.queryParams = this.urlTree.queryParams),
            (o.url = this.urlSerializer.serialize(s)),
            this.inheritParamsAndData(o._root, null),
            { state: o, tree: s }
          );
        })
      );
    }
    match(e) {
      return this.processSegmentGroup(this.injector, this.config, e, U).pipe(
        Wt((n) => {
          if (n instanceof Fl)
            return (this.urlTree = n.urlTree), this.match(n.urlTree.root);
          throw n instanceof ms ? this.noMatchError(n) : n;
        })
      );
    }
    inheritParamsAndData(e, i) {
      let n = e.value,
        r = Sm(n, i, this.paramsInheritanceStrategy);
      (n.params = Object.freeze(r.params)),
        (n.data = Object.freeze(r.data)),
        e.children.forEach((o) => this.inheritParamsAndData(o, n));
    }
    processSegmentGroup(e, i, n, r) {
      return n.segments.length === 0 && n.hasChildren()
        ? this.processChildren(e, i, n)
        : this.processSegment(e, i, n, n.segments, r, !0).pipe(
            A((o) => (o instanceof Ct ? [o] : []))
          );
    }
    processChildren(e, i, n) {
      let r = [];
      for (let o of Object.keys(n.children))
        o === 'primary' ? r.unshift(o) : r.push(o);
      return ve(r).pipe(
        ln((o) => {
          let s = n.children[o],
            a = WN(i, o);
          return this.processSegmentGroup(e, a, s, o);
        }),
        pd((o, s) => (o.push(...s), o)),
        kn(null),
        md(),
        Oe((o) => {
          if (o === null) return Tr(n);
          let s = bw(o);
          return DO(s), M(s);
        })
      );
    }
    processSegment(e, i, n, r, o, s) {
      return ve(i).pipe(
        ln((a) =>
          this.processSegmentAgainstRoute(
            a._injector ?? e,
            i,
            a,
            n,
            r,
            o,
            s
          ).pipe(
            Wt((c) => {
              if (c instanceof ms) return M(null);
              throw c;
            })
          )
        ),
        Nt((a) => !!a),
        Wt((a) => {
          if (pw(a)) return wO(n, r, o) ? M(new Dm()) : Tr(n);
          throw a;
        })
      );
    }
    processSegmentAgainstRoute(e, i, n, r, o, s, a) {
      return xO(n, r, o, s)
        ? n.redirectTo === void 0
          ? this.matchSegmentAgainstRoute(e, r, n, o, s)
          : this.allowRedirects && a
          ? this.expandSegmentAgainstRouteUsingRedirect(e, r, i, n, o, s)
          : Tr(r)
        : Tr(r);
    }
    expandSegmentAgainstRouteUsingRedirect(e, i, n, r, o, s) {
      let {
        matched: a,
        consumedSegments: c,
        positionalParamSegments: l,
        remainingSegments: d,
      } = Rm(i, r, o);
      if (!a) return Tr(i);
      r.redirectTo.startsWith('/') &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > CO && (this.allowRedirects = !1));
      let u = this.applyRedirects.applyRedirectCommands(c, r.redirectTo, l);
      return this.applyRedirects
        .lineralizeSegments(r, u)
        .pipe(Oe((f) => this.processSegment(e, n, i, f.concat(d), s, !1)));
    }
    matchSegmentAgainstRoute(e, i, n, r, o) {
      let s = pO(i, n, r, e, this.urlSerializer);
      return (
        n.path === '**' && (i.children = {}),
        s.pipe(
          bt((a) =>
            a.matched
              ? ((e = n._injector ?? e),
                this.getChildConfig(e, n, r).pipe(
                  bt(({ routes: c }) => {
                    let l = n._loadedInjector ?? e,
                      {
                        consumedSegments: d,
                        remainingSegments: u,
                        parameters: f,
                      } = a,
                      h = new fs(
                        d,
                        f,
                        Object.freeze(x({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        MO(n),
                        on(n),
                        n.component ?? n._loadedComponent ?? null,
                        n,
                        SO(n)
                      ),
                      { segmentGroup: m, slicedSegments: g } = Wx(i, d, u, c);
                    if (g.length === 0 && m.hasChildren())
                      return this.processChildren(l, c, m).pipe(
                        A((E) => (E === null ? null : new Ct(h, E)))
                      );
                    if (c.length === 0 && g.length === 0)
                      return M(new Ct(h, []));
                    let C = on(n) === o;
                    return this.processSegment(l, c, m, g, C ? U : o, !0).pipe(
                      A((E) => new Ct(h, E instanceof Ct ? [E] : []))
                    );
                  })
                ))
              : Tr(i)
          )
        )
      );
    }
    getChildConfig(e, i, n) {
      return i.children
        ? M({ routes: i.children, injector: e })
        : i.loadChildren
        ? i._loadedRoutes !== void 0
          ? M({ routes: i._loadedRoutes, injector: i._loadedInjector })
          : uO(e, i, n, this.urlSerializer).pipe(
              Oe((r) =>
                r
                  ? this.configLoader.loadChildren(e, i).pipe(
                      Ee((o) => {
                        (i._loadedRoutes = o.routes),
                          (i._loadedInjector = o.injector);
                      })
                    )
                  : mO(i)
              )
            )
        : M({ routes: [], injector: e });
    }
  };
function DO(t) {
  t.sort((e, i) =>
    e.value.outlet === U
      ? -1
      : i.value.outlet === U
      ? 1
      : e.value.outlet.localeCompare(i.value.outlet)
  );
}
function IO(t) {
  let e = t.value.routeConfig;
  return e && e.path === '';
}
function bw(t) {
  let e = [],
    i = new Set();
  for (let n of t) {
    if (!IO(n)) {
      e.push(n);
      continue;
    }
    let r = e.find((o) => n.value.routeConfig === o.value.routeConfig);
    r !== void 0 ? (r.children.push(...n.children), i.add(r)) : e.push(n);
  }
  for (let n of i) {
    let r = bw(n.children);
    e.push(new Ct(n.value, r));
  }
  return e.filter((n) => !i.has(n));
}
function MO(t) {
  return t.data || {};
}
function SO(t) {
  return t.resolve || {};
}
function TO(t, e, i, n, r, o) {
  return Oe((s) =>
    EO(t, e, i, n, s.extractedUrl, r, o).pipe(
      A(({ state: a, tree: c }) =>
        he(x({}, s), { targetSnapshot: a, urlAfterRedirects: c })
      )
    )
  );
}
function kO(t, e) {
  return Oe((i) => {
    let {
      targetSnapshot: n,
      guards: { canActivateChecks: r },
    } = i;
    if (!r.length) return M(i);
    let o = new Set(r.map((c) => c.route)),
      s = new Set();
    for (let c of o) if (!s.has(c)) for (let l of vw(c)) s.add(l);
    let a = 0;
    return ve(s).pipe(
      ln((c) =>
        o.has(c)
          ? AO(c, n, t, e)
          : ((c.data = Sm(c, c.parent, t).resolve), M(void 0))
      ),
      Ee(() => a++),
      er(1),
      Oe((c) => (a === s.size ? M(i) : Ye))
    );
  });
}
function vw(t) {
  let e = t.children.map((i) => vw(i)).flat();
  return [t, ...e];
}
function AO(t, e, i, n) {
  let r = t.routeConfig,
    o = t._resolve;
  return (
    r?.title !== void 0 && !dw(r) && (o[gs] = r.title),
    RO(o, t, e, n).pipe(
      A(
        (s) => (
          (t._resolvedData = s), (t.data = Sm(t, t.parent, i).resolve), null
        )
      )
    )
  );
}
function RO(t, e, i, n) {
  let r = im(t);
  if (r.length === 0) return M({});
  let o = {};
  return ve(r).pipe(
    Oe((s) =>
      FO(t[s], e, i, n).pipe(
        Nt(),
        Ee((a) => {
          o[s] = a;
        })
      )
    ),
    er(1),
    fd(o),
    Wt((s) => (pw(s) ? Ye : Mn(s)))
  );
}
function FO(t, e, i, n) {
  let r = _s(e) ?? n,
    o = Lr(t, r),
    s = o.resolve ? o.resolve(e, i) : pn(r, () => o(e, i));
  return ii(s);
}
function tm(t) {
  return bt((e) => {
    let i = t(e);
    return i ? ve(i).pipe(A(() => e)) : M(e);
  });
}
var _w = (() => {
    let e = class e {
      buildTitle(n) {
        let r,
          o = n.root;
        for (; o !== void 0; )
          (r = this.getResolvedTitleForRoute(o) ?? r),
            (o = o.children.find((s) => s.outlet === U));
        return r;
      }
      getResolvedTitleForRoute(n) {
        return n.data[gs];
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({
        token: e,
        factory: () => (() => b(NO))(),
        providedIn: 'root',
      }));
    let t = e;
    return t;
  })(),
  NO = (() => {
    let e = class e extends _w {
      constructor(n) {
        super(), (this.title = n);
      }
      updateTitle(n) {
        let r = this.buildTitle(n);
        r !== void 0 && this.title.setTitle(r);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(Gf));
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  xs = new w('', { providedIn: 'root', factory: () => ({}) }),
  ps = new w('ROUTES'),
  Fm = (() => {
    let e = class e {
      constructor() {
        (this.componentLoaders = new WeakMap()),
          (this.childrenLoaders = new WeakMap()),
          (this.compiler = b(bc));
      }
      loadComponent(n) {
        if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
        if (n._loadedComponent) return M(n._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(n);
        let r = ii(n.loadComponent()).pipe(
            A(yw),
            Ee((s) => {
              this.onLoadEndListener && this.onLoadEndListener(n),
                (n._loadedComponent = s);
            }),
            An(() => {
              this.componentLoaders.delete(n);
            })
          ),
          o = new hi(r, () => new Z()).pipe(Ki());
        return this.componentLoaders.set(n, o), o;
      }
      loadChildren(n, r) {
        if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
        if (r._loadedRoutes)
          return M({ routes: r._loadedRoutes, injector: r._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(r);
        let s = OO(r, this.compiler, n, this.onLoadEndListener).pipe(
            An(() => {
              this.childrenLoaders.delete(r);
            })
          ),
          a = new hi(s, () => new Z()).pipe(Ki());
        return this.childrenLoaders.set(r, a), a;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })();
function OO(t, e, i, n) {
  return ii(t.loadChildren()).pipe(
    A(yw),
    Oe((r) =>
      r instanceof fo || Array.isArray(r) ? M(r) : ve(e.compileModuleAsync(r))
    ),
    A((r) => {
      n && n(t);
      let o,
        s,
        a = !1;
      return (
        Array.isArray(r)
          ? ((s = r), (a = !0))
          : ((o = r.create(i).injector),
            (s = o.get(ps, [], { optional: !0, self: !0 }).flat())),
        { routes: s.map(Am), injector: o }
      );
    })
  );
}
function PO(t) {
  return t && typeof t == 'object' && 'default' in t;
}
function yw(t) {
  return PO(t) ? t.default : t;
}
var Nm = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({
        token: e,
        factory: () => (() => b(LO))(),
        providedIn: 'root',
      }));
    let t = e;
    return t;
  })(),
  LO = (() => {
    let e = class e {
      shouldProcessUrl(n) {
        return !0;
      }
      extract(n) {
        return n;
      }
      merge(n, r) {
        return n;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  xw = new w(''),
  ww = new w('');
function VO(t, e, i) {
  let n = t.get(ww),
    r = t.get(ne);
  return t.get(I).runOutsideAngular(() => {
    if (!r.startViewTransition || n.skipNextTransition)
      return (n.skipNextTransition = !1), Promise.resolve();
    let o,
      s = new Promise((l) => {
        o = l;
      }),
      a = r.startViewTransition(() => (o(), jO(t))),
      { onViewTransitionCreated: c } = n;
    return c && pn(t, () => c({ transition: a, from: e, to: i })), s;
  });
}
function jO(t) {
  return new Promise((e) => {
    xf(e, { injector: t });
  });
}
var Om = (() => {
  let e = class e {
    get hasRequestedNavigation() {
      return this.navigationId !== 0;
    }
    constructor() {
      (this.currentNavigation = null),
        (this.currentTransition = null),
        (this.lastSuccessfulNavigation = null),
        (this.events = new Z()),
        (this.transitionAbortSubject = new Z()),
        (this.configLoader = b(Fm)),
        (this.environmentInjector = b(lt)),
        (this.urlSerializer = b(bs)),
        (this.rootContexts = b(vs)),
        (this.location = b(yr)),
        (this.inputBindingEnabled = b(Ol, { optional: !0 }) !== null),
        (this.titleStrategy = b(_w)),
        (this.options = b(xs, { optional: !0 }) || {}),
        (this.paramsInheritanceStrategy =
          this.options.paramsInheritanceStrategy || 'emptyOnly'),
        (this.urlHandlingStrategy = b(Nm)),
        (this.createViewTransition = b(xw, { optional: !0 })),
        (this.navigationId = 0),
        (this.afterPreactivation = () => M(void 0)),
        (this.rootComponentType = null);
      let n = (o) => this.events.next(new um(o)),
        r = (o) => this.events.next(new fm(o));
      (this.configLoader.onLoadEndListener = r),
        (this.configLoader.onLoadStartListener = n);
    }
    complete() {
      this.transitions?.complete();
    }
    handleNavigationRequest(n) {
      let r = ++this.navigationId;
      this.transitions?.next(
        he(x(x({}, this.transitions.value), n), { id: r })
      );
    }
    setupNavigations(n, r, o) {
      return (
        (this.transitions = new Ve({
          id: 0,
          currentUrlTree: r,
          currentRawUrl: r,
          extractedUrl: this.urlHandlingStrategy.extract(r),
          urlAfterRedirects: this.urlHandlingStrategy.extract(r),
          rawUrl: r,
          extras: {},
          resolve: null,
          reject: null,
          promise: Promise.resolve(!0),
          source: os,
          restoredState: null,
          currentSnapshot: o.snapshot,
          targetSnapshot: null,
          currentRouterState: o,
          targetRouterState: null,
          guards: { canActivateChecks: [], canDeactivateChecks: [] },
          guardsResult: null,
        })),
        this.transitions.pipe(
          je((s) => s.id !== 0),
          A((s) =>
            he(x({}, s), {
              extractedUrl: this.urlHandlingStrategy.extract(s.rawUrl),
            })
          ),
          bt((s) => {
            this.currentTransition = s;
            let a = !1,
              c = !1;
            return M(s).pipe(
              Ee((l) => {
                this.currentNavigation = {
                  id: l.id,
                  initialUrl: l.rawUrl,
                  extractedUrl: l.extractedUrl,
                  trigger: l.source,
                  extras: l.extras,
                  previousNavigation: this.lastSuccessfulNavigation
                    ? he(x({}, this.lastSuccessfulNavigation), {
                        previousNavigation: null,
                      })
                    : null,
                };
              }),
              bt((l) => {
                let d =
                    !n.navigated ||
                    this.isUpdatingInternalState() ||
                    this.isUpdatedBrowserUrl(),
                  u = l.extras.onSameUrlNavigation ?? n.onSameUrlNavigation;
                if (!d && u !== 'reload') {
                  let f = '';
                  return (
                    this.events.next(
                      new ti(l.id, this.urlSerializer.serialize(l.rawUrl), f, 0)
                    ),
                    l.resolve(null),
                    Ye
                  );
                }
                if (this.urlHandlingStrategy.shouldProcessUrl(l.rawUrl))
                  return M(l).pipe(
                    bt((f) => {
                      let h = this.transitions?.getValue();
                      return (
                        this.events.next(
                          new Or(
                            f.id,
                            this.urlSerializer.serialize(f.extractedUrl),
                            f.source,
                            f.restoredState
                          )
                        ),
                        h !== this.transitions?.getValue()
                          ? Ye
                          : Promise.resolve(f)
                      );
                    }),
                    TO(
                      this.environmentInjector,
                      this.configLoader,
                      this.rootComponentType,
                      n.config,
                      this.urlSerializer,
                      this.paramsInheritanceStrategy
                    ),
                    Ee((f) => {
                      (s.targetSnapshot = f.targetSnapshot),
                        (s.urlAfterRedirects = f.urlAfterRedirects),
                        (this.currentNavigation = he(
                          x({}, this.currentNavigation),
                          { finalUrl: f.urlAfterRedirects }
                        ));
                      let h = new Ml(
                        f.id,
                        this.urlSerializer.serialize(f.extractedUrl),
                        this.urlSerializer.serialize(f.urlAfterRedirects),
                        f.targetSnapshot
                      );
                      this.events.next(h);
                    })
                  );
                if (
                  d &&
                  this.urlHandlingStrategy.shouldProcessUrl(l.currentRawUrl)
                ) {
                  let {
                      id: f,
                      extractedUrl: h,
                      source: m,
                      restoredState: g,
                      extras: C,
                    } = l,
                    E = new Or(f, this.urlSerializer.serialize(h), m, g);
                  this.events.next(E);
                  let N = cw(h, this.rootComponentType).snapshot;
                  return (
                    (this.currentTransition = s =
                      he(x({}, l), {
                        targetSnapshot: N,
                        urlAfterRedirects: h,
                        extras: he(x({}, C), {
                          skipLocationChange: !1,
                          replaceUrl: !1,
                        }),
                      })),
                    (this.currentNavigation.finalUrl = h),
                    M(s)
                  );
                } else {
                  let f = '';
                  return (
                    this.events.next(
                      new ti(
                        l.id,
                        this.urlSerializer.serialize(l.extractedUrl),
                        f,
                        1
                      )
                    ),
                    l.resolve(null),
                    Ye
                  );
                }
              }),
              Ee((l) => {
                let d = new am(
                  l.id,
                  this.urlSerializer.serialize(l.extractedUrl),
                  this.urlSerializer.serialize(l.urlAfterRedirects),
                  l.targetSnapshot
                );
                this.events.next(d);
              }),
              A(
                (l) => (
                  (this.currentTransition = s =
                    he(x({}, l), {
                      guards: qN(
                        l.targetSnapshot,
                        l.currentSnapshot,
                        this.rootContexts
                      ),
                    })),
                  s
                )
              ),
              iO(this.environmentInjector, (l) => this.events.next(l)),
              Ee((l) => {
                if (((s.guardsResult = l.guardsResult), Nr(l.guardsResult)))
                  throw fw(this.urlSerializer, l.guardsResult);
                let d = new cm(
                  l.id,
                  this.urlSerializer.serialize(l.extractedUrl),
                  this.urlSerializer.serialize(l.urlAfterRedirects),
                  l.targetSnapshot,
                  !!l.guardsResult
                );
                this.events.next(d);
              }),
              je((l) =>
                l.guardsResult
                  ? !0
                  : (this.cancelNavigationTransition(l, '', 3), !1)
              ),
              tm((l) => {
                if (l.guards.canActivateChecks.length)
                  return M(l).pipe(
                    Ee((d) => {
                      let u = new lm(
                        d.id,
                        this.urlSerializer.serialize(d.extractedUrl),
                        this.urlSerializer.serialize(d.urlAfterRedirects),
                        d.targetSnapshot
                      );
                      this.events.next(u);
                    }),
                    bt((d) => {
                      let u = !1;
                      return M(d).pipe(
                        kO(
                          this.paramsInheritanceStrategy,
                          this.environmentInjector
                        ),
                        Ee({
                          next: () => (u = !0),
                          complete: () => {
                            u || this.cancelNavigationTransition(d, '', 2);
                          },
                        })
                      );
                    }),
                    Ee((d) => {
                      let u = new dm(
                        d.id,
                        this.urlSerializer.serialize(d.extractedUrl),
                        this.urlSerializer.serialize(d.urlAfterRedirects),
                        d.targetSnapshot
                      );
                      this.events.next(u);
                    })
                  );
              }),
              tm((l) => {
                let d = (u) => {
                  let f = [];
                  u.routeConfig?.loadComponent &&
                    !u.routeConfig._loadedComponent &&
                    f.push(
                      this.configLoader.loadComponent(u.routeConfig).pipe(
                        Ee((h) => {
                          u.component = h;
                        }),
                        A(() => {})
                      )
                    );
                  for (let h of u.children) f.push(...d(h));
                  return f;
                };
                return pi(d(l.targetSnapshot.root)).pipe(kn(null), at(1));
              }),
              tm(() => this.afterPreactivation()),
              bt(() => {
                let { currentSnapshot: l, targetSnapshot: d } = s,
                  u = this.createViewTransition?.(
                    this.environmentInjector,
                    l.root,
                    d.root
                  );
                return u ? ve(u).pipe(A(() => s)) : M(s);
              }),
              A((l) => {
                let d = jN(
                  n.routeReuseStrategy,
                  l.targetSnapshot,
                  l.currentRouterState
                );
                return (
                  (this.currentTransition = s =
                    he(x({}, l), { targetRouterState: d })),
                  (this.currentNavigation.targetRouterState = d),
                  s
                );
              }),
              Ee(() => {
                this.events.next(new ds());
              }),
              GN(
                this.rootContexts,
                n.routeReuseStrategy,
                (l) => this.events.next(l),
                this.inputBindingEnabled
              ),
              at(1),
              Ee({
                next: (l) => {
                  (a = !0),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    this.events.next(
                      new Cn(
                        l.id,
                        this.urlSerializer.serialize(l.extractedUrl),
                        this.urlSerializer.serialize(l.urlAfterRedirects)
                      )
                    ),
                    this.titleStrategy?.updateTitle(
                      l.targetRouterState.snapshot
                    ),
                    l.resolve(!0);
                },
                complete: () => {
                  a = !0;
                },
              }),
              vt(
                this.transitionAbortSubject.pipe(
                  Ee((l) => {
                    throw l;
                  })
                )
              ),
              An(() => {
                if (!a && !c) {
                  let l = '';
                  this.cancelNavigationTransition(s, l, 1);
                }
                this.currentNavigation?.id === s.id &&
                  (this.currentNavigation = null);
              }),
              Wt((l) => {
                if (((c = !0), mw(l)))
                  this.events.next(
                    new ei(
                      s.id,
                      this.urlSerializer.serialize(s.extractedUrl),
                      l.message,
                      l.cancellationCode
                    )
                  ),
                    HN(l) ? this.events.next(new us(l.url)) : s.resolve(!1);
                else {
                  this.events.next(
                    new ls(
                      s.id,
                      this.urlSerializer.serialize(s.extractedUrl),
                      l,
                      s.targetSnapshot ?? void 0
                    )
                  );
                  try {
                    s.resolve(n.errorHandler(l));
                  } catch (d) {
                    s.reject(d);
                  }
                }
                return Ye;
              })
            );
          })
        )
      );
    }
    cancelNavigationTransition(n, r, o) {
      let s = new ei(n.id, this.urlSerializer.serialize(n.extractedUrl), r, o);
      this.events.next(s), n.resolve(!1);
    }
    isUpdatingInternalState() {
      return (
        this.currentTransition?.extractedUrl.toString() !==
        this.currentTransition?.currentUrlTree.toString()
      );
    }
    isUpdatedBrowserUrl() {
      return (
        this.urlHandlingStrategy
          .extract(this.urlSerializer.parse(this.location.path(!0)))
          .toString() !== this.currentTransition?.extractedUrl.toString() &&
        !this.currentTransition?.extras.skipLocationChange
      );
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
function BO(t) {
  return t !== os;
}
var UO = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({
        token: e,
        factory: () => (() => b(HO))(),
        providedIn: 'root',
      }));
    let t = e;
    return t;
  })(),
  Mm = class {
    shouldDetach(e) {
      return !1;
    }
    store(e, i) {}
    shouldAttach(e) {
      return !1;
    }
    retrieve(e) {
      return null;
    }
    shouldReuseRoute(e, i) {
      return e.routeConfig === i.routeConfig;
    }
  },
  HO = (() => {
    let e = class e extends Mm {};
    (e.ɵfac = (() => {
      let n;
      return function (o) {
        return (n || (n = vr(e)))(o || e);
      };
    })()),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  Ew = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({
        token: e,
        factory: () => (() => b($O))(),
        providedIn: 'root',
      }));
    let t = e;
    return t;
  })(),
  $O = (() => {
    let e = class e extends Ew {
      constructor() {
        super(...arguments),
          (this.location = b(yr)),
          (this.urlSerializer = b(bs)),
          (this.options = b(xs, { optional: !0 }) || {}),
          (this.canceledNavigationResolution =
            this.options.canceledNavigationResolution || 'replace'),
          (this.urlHandlingStrategy = b(Nm)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || 'deferred'),
          (this.currentUrlTree = new Jn()),
          (this.rawUrlTree = this.currentUrlTree),
          (this.currentPageId = 0),
          (this.lastSuccessfulId = -1),
          (this.routerState = cw(this.currentUrlTree, null)),
          (this.stateMemento = this.createStateMemento());
      }
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      restoredState() {
        return this.location.getState();
      }
      get browserPageId() {
        return this.canceledNavigationResolution !== 'computed'
          ? this.currentPageId
          : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
      }
      getRouterState() {
        return this.routerState;
      }
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState,
        };
      }
      registerNonRouterCurrentEntryChangeListener(n) {
        return this.location.subscribe((r) => {
          r.type === 'popstate' && n(r.url, r.state);
        });
      }
      handleRouterEvent(n, r) {
        if (n instanceof Or) this.stateMemento = this.createStateMemento();
        else if (n instanceof ti) this.rawUrlTree = r.initialUrl;
        else if (n instanceof Ml) {
          if (
            this.urlUpdateStrategy === 'eager' &&
            !r.extras.skipLocationChange
          ) {
            let o = this.urlHandlingStrategy.merge(r.finalUrl, r.initialUrl);
            this.setBrowserUrl(o, r);
          }
        } else
          n instanceof ds
            ? ((this.currentUrlTree = r.finalUrl),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                r.finalUrl,
                r.initialUrl
              )),
              (this.routerState = r.targetRouterState),
              this.urlUpdateStrategy === 'deferred' &&
                (r.extras.skipLocationChange ||
                  this.setBrowserUrl(this.rawUrlTree, r)))
            : n instanceof ei && (n.code === 3 || n.code === 2)
            ? this.restoreHistory(r)
            : n instanceof ls
            ? this.restoreHistory(r, !0)
            : n instanceof Cn &&
              ((this.lastSuccessfulId = n.id),
              (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(n, r) {
        let o = this.urlSerializer.serialize(n);
        if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
          let s = this.browserPageId,
            a = x(x({}, r.extras.state), this.generateNgRouterState(r.id, s));
          this.location.replaceState(o, '', a);
        } else {
          let s = x(
            x({}, r.extras.state),
            this.generateNgRouterState(r.id, this.browserPageId + 1)
          );
          this.location.go(o, '', s);
        }
      }
      restoreHistory(n, r = !1) {
        if (this.canceledNavigationResolution === 'computed') {
          let o = this.browserPageId,
            s = this.currentPageId - o;
          s !== 0
            ? this.location.historyGo(s)
            : this.currentUrlTree === n.finalUrl &&
              s === 0 &&
              (this.resetState(n), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === 'replace' &&
            (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
      }
      resetState(n) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            n.finalUrl ?? this.rawUrlTree
          ));
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.rawUrlTree),
          '',
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(n, r) {
        return this.canceledNavigationResolution === 'computed'
          ? { navigationId: n, ɵrouterPageId: r }
          : { navigationId: n };
      }
    };
    (e.ɵfac = (() => {
      let n;
      return function (o) {
        return (n || (n = vr(e)))(o || e);
      };
    })()),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  is = (function (t) {
    return (
      (t[(t.COMPLETE = 0)] = 'COMPLETE'),
      (t[(t.FAILED = 1)] = 'FAILED'),
      (t[(t.REDIRECTING = 2)] = 'REDIRECTING'),
      t
    );
  })(is || {});
function Cw(t, e) {
  t.events
    .pipe(
      je(
        (i) =>
          i instanceof Cn ||
          i instanceof ei ||
          i instanceof ls ||
          i instanceof ti
      ),
      A((i) =>
        i instanceof Cn || i instanceof ti
          ? is.COMPLETE
          : (i instanceof ei ? i.code === 0 || i.code === 1 : !1)
          ? is.REDIRECTING
          : is.FAILED
      ),
      je((i) => i !== is.REDIRECTING),
      at(1)
    )
    .subscribe(() => {
      e();
    });
}
function zO(t) {
  throw t;
}
var WO = {
    paths: 'exact',
    fragment: 'ignored',
    matrixParams: 'ignored',
    queryParams: 'exact',
  },
  GO = {
    paths: 'subset',
    fragment: 'ignored',
    matrixParams: 'ignored',
    queryParams: 'subset',
  },
  ni = (() => {
    let e = class e {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      constructor() {
        (this.disposed = !1),
          (this.isNgZoneEnabled = !1),
          (this.console = b(gc)),
          (this.stateManager = b(Ew)),
          (this.options = b(xs, { optional: !0 }) || {}),
          (this.pendingTasks = b(Mo)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || 'deferred'),
          (this.navigationTransitions = b(Om)),
          (this.urlSerializer = b(bs)),
          (this.location = b(yr)),
          (this.urlHandlingStrategy = b(Nm)),
          (this._events = new Z()),
          (this.errorHandler = this.options.errorHandler || zO),
          (this.navigated = !1),
          (this.routeReuseStrategy = b(UO)),
          (this.onSameUrlNavigation =
            this.options.onSameUrlNavigation || 'ignore'),
          (this.config = b(ps, { optional: !0 })?.flat() ?? []),
          (this.componentInputBindingEnabled = !!b(Ol, { optional: !0 })),
          (this.eventsSubscription = new be()),
          (this.isNgZoneEnabled = b(I) instanceof I && I.isInAngularZone()),
          this.resetConfig(this.config),
          this.navigationTransitions
            .setupNavigations(this, this.currentUrlTree, this.routerState)
            .subscribe({
              error: (n) => {
                this.console.warn(n);
              },
            }),
          this.subscribeToNavigationEvents();
      }
      subscribeToNavigationEvents() {
        let n = this.navigationTransitions.events.subscribe((r) => {
          try {
            let o = this.navigationTransitions.currentTransition,
              s = this.navigationTransitions.currentNavigation;
            if (o !== null && s !== null) {
              if (
                (this.stateManager.handleRouterEvent(r, s),
                r instanceof ei && r.code !== 0 && r.code !== 1)
              )
                this.navigated = !0;
              else if (r instanceof Cn) this.navigated = !0;
              else if (r instanceof us) {
                let a = this.urlHandlingStrategy.merge(r.url, o.currentRawUrl),
                  c = {
                    skipLocationChange: o.extras.skipLocationChange,
                    replaceUrl:
                      this.urlUpdateStrategy === 'eager' || BO(o.source),
                  };
                this.scheduleNavigation(a, os, null, c, {
                  resolve: o.resolve,
                  reject: o.reject,
                  promise: o.promise,
                });
              }
            }
            QO(r) && this._events.next(r);
          } catch (o) {
            this.navigationTransitions.transitionAbortSubject.next(o);
          }
        });
        this.eventsSubscription.add(n);
      }
      resetRootComponentType(n) {
        (this.routerState.root.component = n),
          (this.navigationTransitions.rootComponentType = n);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              os,
              this.stateManager.restoredState()
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ||
          (this.nonRouterCurrentEntryChangeSubscription =
            this.stateManager.registerNonRouterCurrentEntryChangeListener(
              (n, r) => {
                setTimeout(() => {
                  this.navigateToSyncWithBrowser(n, 'popstate', r);
                }, 0);
              }
            ));
      }
      navigateToSyncWithBrowser(n, r, o) {
        let s = { replaceUrl: !0 },
          a = o?.navigationId ? o : null;
        if (o) {
          let l = x({}, o);
          delete l.navigationId,
            delete l.ɵrouterPageId,
            Object.keys(l).length !== 0 && (s.state = l);
        }
        let c = this.parseUrl(n);
        this.scheduleNavigation(c, r, a, s);
      }
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      getCurrentNavigation() {
        return this.navigationTransitions.currentNavigation;
      }
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      resetConfig(n) {
        (this.config = n.map(Am)), (this.navigated = !1);
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this.navigationTransitions.complete(),
          this.nonRouterCurrentEntryChangeSubscription &&
            (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
            (this.nonRouterCurrentEntryChangeSubscription = void 0)),
          (this.disposed = !0),
          this.eventsSubscription.unsubscribe();
      }
      createUrlTree(n, r = {}) {
        let {
            relativeTo: o,
            queryParams: s,
            fragment: a,
            queryParamsHandling: c,
            preserveFragment: l,
          } = r,
          d = l ? this.currentUrlTree.fragment : a,
          u = null;
        switch (c) {
          case 'merge':
            u = x(x({}, this.currentUrlTree.queryParams), s);
            break;
          case 'preserve':
            u = this.currentUrlTree.queryParams;
            break;
          default:
            u = s || null;
        }
        u !== null && (u = this.removeEmptyProps(u));
        let f;
        try {
          let h = o ? o.snapshot : this.routerState.snapshot.root;
          f = rw(h);
        } catch {
          (typeof n[0] != 'string' || !n[0].startsWith('/')) && (n = []),
            (f = this.currentUrlTree.root);
        }
        return ow(f, n, u, d ?? null);
      }
      navigateByUrl(n, r = { skipLocationChange: !1 }) {
        let o = Nr(n) ? n : this.parseUrl(n),
          s = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
        return this.scheduleNavigation(s, os, null, r);
      }
      navigate(n, r = { skipLocationChange: !1 }) {
        return qO(n), this.navigateByUrl(this.createUrlTree(n, r), r);
      }
      serializeUrl(n) {
        return this.urlSerializer.serialize(n);
      }
      parseUrl(n) {
        try {
          return this.urlSerializer.parse(n);
        } catch {
          return this.urlSerializer.parse('/');
        }
      }
      isActive(n, r) {
        let o;
        if (
          (r === !0 ? (o = x({}, WO)) : r === !1 ? (o = x({}, GO)) : (o = r),
          Nr(n))
        )
          return Bx(this.currentUrlTree, n, o);
        let s = this.parseUrl(n);
        return Bx(this.currentUrlTree, s, o);
      }
      removeEmptyProps(n) {
        return Object.keys(n).reduce((r, o) => {
          let s = n[o];
          return s != null && (r[o] = s), r;
        }, {});
      }
      scheduleNavigation(n, r, o, s, a) {
        if (this.disposed) return Promise.resolve(!1);
        let c, l, d;
        a
          ? ((c = a.resolve), (l = a.reject), (d = a.promise))
          : (d = new Promise((f, h) => {
              (c = f), (l = h);
            }));
        let u = this.pendingTasks.add();
        return (
          Cw(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(u));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: r,
            restoredState: o,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: n,
            extras: s,
            resolve: c,
            reject: l,
            promise: d,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          d.catch((f) => Promise.reject(f))
        );
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })();
function qO(t) {
  for (let e = 0; e < t.length; e++) if (t[e] == null) throw new _(4008, !1);
}
function QO(t) {
  return !(t instanceof ds) && !(t instanceof us);
}
var Nl = class {};
var ZO = (() => {
    let e = class e {
      constructor(n, r, o, s, a) {
        (this.router = n),
          (this.injector = o),
          (this.preloadingStrategy = s),
          (this.loader = a);
      }
      setUpPreloading() {
        this.subscription = this.router.events
          .pipe(
            je((n) => n instanceof Cn),
            ln(() => this.preload())
          )
          .subscribe(() => {});
      }
      preload() {
        return this.processRoutes(this.injector, this.router.config);
      }
      ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
      }
      processRoutes(n, r) {
        let o = [];
        for (let s of r) {
          s.providers &&
            !s._injector &&
            (s._injector = hc(s.providers, n, `Route: ${s.path}`));
          let a = s._injector ?? n,
            c = s._loadedInjector ?? a;
          ((s.loadChildren && !s._loadedRoutes && s.canLoad === void 0) ||
            (s.loadComponent && !s._loadedComponent)) &&
            o.push(this.preloadConfig(a, s)),
            (s.children || s._loadedRoutes) &&
              o.push(this.processRoutes(c, s.children ?? s._loadedRoutes));
        }
        return ve(o).pipe(Sn());
      }
      preloadConfig(n, r) {
        return this.preloadingStrategy.preload(r, () => {
          let o;
          r.loadChildren && r.canLoad === void 0
            ? (o = this.loader.loadChildren(n, r))
            : (o = M(null));
          let s = o.pipe(
            Oe((a) =>
              a === null
                ? M(void 0)
                : ((r._loadedRoutes = a.routes),
                  (r._loadedInjector = a.injector),
                  this.processRoutes(a.injector ?? n, a.routes))
            )
          );
          if (r.loadComponent && !r._loadedComponent) {
            let a = this.loader.loadComponent(r);
            return ve([s, a]).pipe(Sn());
          } else return s;
        });
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(ni), v(bc), v(lt), v(Nl), v(Fm));
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  Dw = new w(''),
  YO = (() => {
    let e = class e {
      constructor(n, r, o, s, a = {}) {
        (this.urlSerializer = n),
          (this.transitions = r),
          (this.viewportScroller = o),
          (this.zone = s),
          (this.options = a),
          (this.lastId = 0),
          (this.lastSource = 'imperative'),
          (this.restoredId = 0),
          (this.store = {}),
          (a.scrollPositionRestoration =
            a.scrollPositionRestoration || 'disabled'),
          (a.anchorScrolling = a.anchorScrolling || 'disabled');
      }
      init() {
        this.options.scrollPositionRestoration !== 'disabled' &&
          this.viewportScroller.setHistoryScrollRestoration('manual'),
          (this.routerEventsSubscription = this.createScrollEvents()),
          (this.scrollEventsSubscription = this.consumeScrollEvents());
      }
      createScrollEvents() {
        return this.transitions.events.subscribe((n) => {
          n instanceof Or
            ? ((this.store[this.lastId] =
                this.viewportScroller.getScrollPosition()),
              (this.lastSource = n.navigationTrigger),
              (this.restoredId = n.restoredState
                ? n.restoredState.navigationId
                : 0))
            : n instanceof Cn
            ? ((this.lastId = n.id),
              this.scheduleScrollEvent(
                n,
                this.urlSerializer.parse(n.urlAfterRedirects).fragment
              ))
            : n instanceof ti &&
              n.code === 0 &&
              ((this.lastSource = void 0),
              (this.restoredId = 0),
              this.scheduleScrollEvent(
                n,
                this.urlSerializer.parse(n.url).fragment
              ));
        });
      }
      consumeScrollEvents() {
        return this.transitions.events.subscribe((n) => {
          n instanceof Sl &&
            (n.position
              ? this.options.scrollPositionRestoration === 'top'
                ? this.viewportScroller.scrollToPosition([0, 0])
                : this.options.scrollPositionRestoration === 'enabled' &&
                  this.viewportScroller.scrollToPosition(n.position)
              : n.anchor && this.options.anchorScrolling === 'enabled'
              ? this.viewportScroller.scrollToAnchor(n.anchor)
              : this.options.scrollPositionRestoration !== 'disabled' &&
                this.viewportScroller.scrollToPosition([0, 0]));
        });
      }
      scheduleScrollEvent(n, r) {
        this.zone.runOutsideAngular(() => {
          setTimeout(() => {
            this.zone.run(() => {
              this.transitions.events.next(
                new Sl(
                  n,
                  this.lastSource === 'popstate'
                    ? this.store[this.restoredId]
                    : null,
                  r
                )
              );
            });
          }, 0);
        });
      }
      ngOnDestroy() {
        this.routerEventsSubscription?.unsubscribe(),
          this.scrollEventsSubscription?.unsubscribe();
      }
    };
    (e.ɵfac = function (r) {
      Eo();
    }),
      (e.ɵprov = y({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })();
function Iw(t, ...e) {
  return Mi([
    { provide: ps, multi: !0, useValue: t },
    [],
    { provide: $i, useFactory: Mw, deps: [ni] },
    { provide: Ri, multi: !0, useFactory: Sw },
    e.map((i) => i.ɵproviders),
  ]);
}
function Mw(t) {
  return t.routerState.root;
}
function ws(t, e) {
  return { ɵkind: t, ɵproviders: e };
}
function Sw() {
  let t = b(St);
  return (e) => {
    let i = t.get(Jt);
    if (e !== i.components[0]) return;
    let n = t.get(ni),
      r = t.get(Tw);
    t.get(Pm) === 1 && n.initialNavigation(),
      t.get(kw, null, G.Optional)?.setUpPreloading(),
      t.get(Dw, null, G.Optional)?.init(),
      n.resetRootComponentType(i.componentTypes[0]),
      r.closed || (r.next(), r.complete(), r.unsubscribe());
  };
}
var Tw = new w('', { factory: () => new Z() }),
  Pm = new w('', { providedIn: 'root', factory: () => 1 });
function XO() {
  return ws(2, [
    { provide: Pm, useValue: 0 },
    {
      provide: vc,
      multi: !0,
      deps: [St],
      useFactory: (e) => {
        let i = e.get(P_, Promise.resolve());
        return () =>
          i.then(
            () =>
              new Promise((n) => {
                let r = e.get(ni),
                  o = e.get(Tw);
                Cw(r, () => {
                  n(!0);
                }),
                  (e.get(Om).afterPreactivation = () => (
                    n(!0), o.closed ? M(void 0) : o
                  )),
                  r.initialNavigation();
              })
          );
      },
    },
  ]);
}
function KO() {
  return ws(3, [
    {
      provide: vc,
      multi: !0,
      useFactory: () => {
        let e = b(ni);
        return () => {
          e.setUpLocationChangeListener();
        };
      },
    },
    { provide: Pm, useValue: 2 },
  ]);
}
var kw = new w('');
function JO(t) {
  return ws(0, [
    { provide: kw, useExisting: ZO },
    { provide: Nl, useExisting: t },
  ]);
}
function eP() {
  return ws(8, [zx, { provide: Ol, useExisting: zx }]);
}
function tP(t) {
  let e = [
    { provide: xw, useValue: VO },
    {
      provide: ww,
      useValue: x({ skipNextTransition: !!t?.skipInitialTransition }, t),
    },
  ];
  return ws(9, e);
}
var Gx = new w('ROUTER_FORROOT_GUARD'),
  nP = [
    yr,
    { provide: bs, useClass: as },
    ni,
    vs,
    { provide: $i, useFactory: Mw, deps: [ni] },
    Fm,
    [],
  ],
  Aw = (() => {
    let e = class e {
      constructor(n) {}
      static forRoot(n, r) {
        return {
          ngModule: e,
          providers: [
            nP,
            [],
            { provide: ps, multi: !0, useValue: n },
            { provide: Gx, useFactory: sP, deps: [[ni, new Xa(), new rf()]] },
            { provide: xs, useValue: r || {} },
            r?.useHash ? rP() : oP(),
            iP(),
            r?.preloadingStrategy ? JO(r.preloadingStrategy).ɵproviders : [],
            r?.initialNavigation ? aP(r) : [],
            r?.bindToComponentInputs ? eP().ɵproviders : [],
            r?.enableViewTransitions ? tP().ɵproviders : [],
            cP(),
          ],
        };
      }
      static forChild(n) {
        return {
          ngModule: e,
          providers: [{ provide: ps, multi: !0, useValue: n }],
        };
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(Gx, 8));
    }),
      (e.ɵmod = V({ type: e })),
      (e.ɵinj = L({}));
    let t = e;
    return t;
  })();
function iP() {
  return {
    provide: Dw,
    useFactory: () => {
      let t = b(H_),
        e = b(I),
        i = b(xs),
        n = b(Om),
        r = b(bs);
      return (
        i.scrollOffset && t.setOffset(i.scrollOffset), new YO(r, n, t, e, i)
      );
    },
  };
}
function rP() {
  return { provide: Fi, useClass: V_ };
}
function oP() {
  return { provide: Fi, useClass: kf };
}
function sP(t) {
  return 'guarded';
}
function aP(t) {
  return [
    t.initialNavigation === 'disabled' ? KO().ɵproviders : [],
    t.initialNavigation === 'enabledBlocking' ? XO().ɵproviders : [],
  ];
}
var qx = new w('');
function cP() {
  return [
    { provide: qx, useFactory: Sw },
    { provide: Ri, multi: !0, useExisting: qx },
  ];
}
var $r = XE(FE(), 1);
var rL = ['qrcElement'],
  NE = (() => {
    let e = class e {
      constructor(n, r) {
        (this.renderer = n),
          (this.sanitizer = r),
          (this.allowEmptyString = !1),
          (this.colorDark = '#000000ff'),
          (this.colorLight = '#ffffffff'),
          (this.cssClass = 'qrcode'),
          (this.elementType = 'canvas'),
          (this.errorCorrectionLevel = 'M'),
          (this.margin = 4),
          (this.qrdata = ''),
          (this.scale = 4),
          (this.width = 10),
          (this.qrCodeURL = new Y()),
          (this.context = null);
      }
      ngOnChanges() {
        return Fs(this, null, function* () {
          yield this.createQRCode();
        });
      }
      isValidQrCodeText(n) {
        return this.allowEmptyString === !1
          ? !(typeof n > 'u' || n === '' || n === 'null' || n === null)
          : !(typeof n > 'u');
      }
      toDataURL(n) {
        return new Promise((r, o) => {
          (0, $r.toDataURL)(this.qrdata, n, (s, a) => {
            s ? o(s) : r(a);
          });
        });
      }
      toCanvas(n, r) {
        return new Promise((o, s) => {
          (0, $r.toCanvas)(n, this.qrdata, r, (a) => {
            a ? s(a) : o('success');
          });
        });
      }
      toSVG(n) {
        return new Promise((r, o) => {
          (0, $r.toString)(this.qrdata, n, (s, a) => {
            s ? o(s) : r(a);
          });
        });
      }
      renderElement(n) {
        for (let r of this.qrcElement.nativeElement.childNodes)
          this.renderer.removeChild(this.qrcElement.nativeElement, r);
        this.renderer.appendChild(this.qrcElement.nativeElement, n);
      }
      createQRCode() {
        return Fs(this, null, function* () {
          this.version && this.version > 40
            ? (console.warn('[angularx-qrcode] max value for `version` is 40'),
              (this.version = 40))
            : this.version && this.version < 1
            ? (console.warn('[angularx-qrcode]`min value for `version` is 1'),
              (this.version = 1))
            : this.version !== void 0 &&
              isNaN(this.version) &&
              (console.warn(
                '[angularx-qrcode] version should be a number, defaulting to auto.'
              ),
              (this.version = void 0));
          try {
            if (!this.isValidQrCodeText(this.qrdata))
              throw new Error(
                '[angularx-qrcode] Field `qrdata` is empty, set \'allowEmptyString="true"\' to overwrite this behaviour.'
              );
            this.isValidQrCodeText(this.qrdata) &&
              this.qrdata === '' &&
              (this.qrdata = ' ');
            let n = {
                color: { dark: this.colorDark, light: this.colorLight },
                errorCorrectionLevel: this.errorCorrectionLevel,
                margin: this.margin,
                scale: this.scale,
                version: this.version,
                width: this.width,
              },
              r = this.imageSrc,
              o = this.imageHeight || 40,
              s = this.imageWidth || 40;
            switch (this.elementType) {
              case 'canvas': {
                let a = this.renderer.createElement('canvas');
                (this.context = a.getContext('2d')),
                  this.toCanvas(a, n)
                    .then(() => {
                      if (
                        (this.ariaLabel &&
                          this.renderer.setAttribute(
                            a,
                            'aria-label',
                            `${this.ariaLabel}`
                          ),
                        this.title &&
                          this.renderer.setAttribute(
                            a,
                            'title',
                            `${this.title}`
                          ),
                        r && this.context)
                      ) {
                        (this.centerImage = new Image(s, o)),
                          r !== this.centerImage.src &&
                            (this.centerImage.src = r),
                          o !== this.centerImage.height &&
                            (this.centerImage.height = o),
                          s !== this.centerImage.width &&
                            (this.centerImage.width = s);
                        let c = this.centerImage;
                        c &&
                          (c.onload = () => {
                            this.context?.drawImage(
                              c,
                              a.width / 2 - s / 2,
                              a.height / 2 - o / 2,
                              s,
                              o
                            );
                          });
                      }
                      this.renderElement(a), this.emitQRCodeURL(a);
                    })
                    .catch((c) => {
                      console.error('[angularx-qrcode] canvas error:', c);
                    });
                break;
              }
              case 'svg': {
                let a = this.renderer.createElement('div');
                this.toSVG(n)
                  .then((c) => {
                    this.renderer.setProperty(a, 'innerHTML', c);
                    let l = a.firstChild;
                    this.renderer.setAttribute(l, 'height', `${this.width}`),
                      this.renderer.setAttribute(l, 'width', `${this.width}`),
                      this.renderElement(l),
                      this.emitQRCodeURL(l);
                  })
                  .catch((c) => {
                    console.error('[angularx-qrcode] svg error:', c);
                  });
                break;
              }
              case 'url':
              case 'img':
              default: {
                let a = this.renderer.createElement('img');
                this.toDataURL(n)
                  .then((c) => {
                    this.alt && a.setAttribute('alt', this.alt),
                      this.ariaLabel &&
                        a.setAttribute('aria-label', this.ariaLabel),
                      a.setAttribute('src', c),
                      this.title && a.setAttribute('title', this.title),
                      this.renderElement(a),
                      this.emitQRCodeURL(a);
                  })
                  .catch((c) => {
                    console.error('[angularx-qrcode] img/url error:', c);
                  });
              }
            }
          } catch (n) {
            console.error(
              '[angularx-qrcode] Error generating QR Code:',
              n.message
            );
          }
        });
      }
      emitQRCodeURL(n) {
        let r = n.constructor.name;
        if (r === SVGSVGElement.name) {
          let s = n.outerHTML,
            a = new Blob([s], { type: 'image/svg+xml' }),
            c = URL.createObjectURL(a),
            l = this.sanitizer.bypassSecurityTrustUrl(c);
          this.qrCodeURL.emit(l);
          return;
        }
        let o = '';
        r === HTMLCanvasElement.name && (o = n.toDataURL('image/png')),
          r === HTMLImageElement.name && (o = n.src),
          fetch(o)
            .then((s) => s.blob())
            .then((s) => URL.createObjectURL(s))
            .then((s) => this.sanitizer.bypassSecurityTrustUrl(s))
            .then((s) => {
              this.qrCodeURL.emit(s);
            })
            .catch((s) => {
              console.error(
                '[angularx-qrcode] Error when fetching image/png URL: ' + s
              );
            });
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(p(Bn), p(No));
    }),
      (e.ɵcmp = De({
        type: e,
        selectors: [['qrcode']],
        viewQuery: function (r, o) {
          if ((r & 1 && ke(rL, 7), r & 2)) {
            let s;
            J((s = ee())) && (o.qrcElement = s.first);
          }
        },
        inputs: {
          allowEmptyString: 'allowEmptyString',
          colorDark: 'colorDark',
          colorLight: 'colorLight',
          cssClass: 'cssClass',
          elementType: 'elementType',
          errorCorrectionLevel: 'errorCorrectionLevel',
          imageSrc: 'imageSrc',
          imageHeight: 'imageHeight',
          imageWidth: 'imageWidth',
          margin: 'margin',
          qrdata: 'qrdata',
          scale: 'scale',
          version: 'version',
          width: 'width',
          alt: 'alt',
          ariaLabel: 'ariaLabel',
          title: 'title',
        },
        outputs: { qrCodeURL: 'qrCodeURL' },
        features: [ft],
        decls: 2,
        vars: 2,
        consts: [['qrcElement', '']],
        template: function (r, o) {
          r & 1 && j(0, 'div', null, 0), r & 2 && Kt(o.cssClass);
        },
        encapsulation: 2,
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })(),
  OE = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = V({ type: e })),
      (e.ɵinj = L({}));
    let t = e;
    return t;
  })();
var PE = (() => {
  let e = class e {
    generateFilename() {
      let n = new Date(),
        r = n.getFullYear().toString(),
        o = (n.getMonth() + 1).toString(),
        s = n.getDate().toString().padStart(2, '0'),
        a = n.getHours().toString().padStart(2, '0'),
        c = n.getMinutes().toString().padStart(2, '0'),
        l = n.getSeconds().toString().padStart(2, '0'),
        d = Math.floor(Math.random() * (999999 - 1e5 + 1) + 1e5).toString();
      return `QR_Code_${r}${o}${s}_${a}${c}${l}_${d}`;
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
var LE = (() => {
  let e = class e {
    base64ToBlob(n) {
      let r = n.split(';base64,'),
        o = r[0].split(':')[1],
        s = window.atob(r[1]),
        a = new Uint8Array(s.length);
      for (let c = 0; c < s.length; c++) a[c] = s.charCodeAt(c);
      return new Blob([a], { type: o });
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
var VE = (() => {
  let e = class e {
    constructor() {
      (this.fileService = b(PE)), (this.urlService = b(LE));
    }
    saveAsImage(n, r) {
      let o = null;
      if (
        (r === 'canvas'
          ? (o = n.qrcElement.nativeElement
              .querySelector('canvas')
              .toDataURL('image/png'))
          : r === 'img' || r === 'url'
          ? (o = n.qrcElement.nativeElement.querySelector('img').src)
          : alert('Please set the element type (format) to img!'),
        o)
      ) {
        let s = this.urlService.base64ToBlob(o),
          a = new Blob([s], { type: 'image/png' }),
          c = URL.createObjectURL(a),
          l = document.createElement('a');
        (l.href = c),
          (l.target = '_self'),
          (l.download = this.fileService.generateFilename()),
          l.click();
      }
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = y({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
function sL(t, e) {
  if (t & 1) {
    let i = Cf();
    S(0, 'button', 13),
      ye('click', function () {
        Gu(i);
        let r = Ne(),
          o = bn(10);
        return qu(r.imgService.saveAsImage(o, r.elementType));
      }),
      S(1, 'mat-icon'),
      We(2, 'file_download'),
      k()();
  }
}
function aL(t, e) {
  if (
    (t & 1 && (S(0, 'a', 14)(1, 'mat-icon'), We(2, 'file_download'), k()()),
    t & 2)
  ) {
    let i = Ne();
    de('href', i.qrCodeUrl, bv);
  }
}
function cL(t, e) {
  if (t & 1) {
    let i = Cf();
    S(0, 'section')(1, 'h3'),
      We(2, 'Options'),
      k(),
      S(3, 'div', 15)(4, 'label', 16),
      We(5, 'Width & Height'),
      k(),
      S(6, 'mat-slider', 17),
      j(7, 'input', 18),
      k(),
      S(8, 'label', 19),
      We(9),
      k()(),
      S(10, 'div', 20)(11, 'p', 21),
      We(12, 'Format:'),
      k(),
      S(13, 'mat-button-toggle-group', 22),
      ye('ngModelChange', function (r) {
        Gu(i);
        let o = Ne();
        return qu((o.elementType = r));
      }),
      S(14, 'mat-button-toggle', 23),
      We(15, 'img (Default)'),
      k(),
      S(16, 'mat-button-toggle', 24),
      We(17, 'svg'),
      k()()()();
  }
  if (t & 2) {
    let i = Ne();
    W(7),
      de('formControl', i.widthHeightForm),
      W(2),
      Io(' ', i.widthHeight + 'px', ' '),
      W(4),
      de('ngModel', i.elementType);
  }
}
var jE = (() => {
  let e = class e {
    constructor() {
      (this.imgService = b(VE)),
        (this.qrCodeOptions = {
          alt: 'QR Code',
          ariaLabel: 'QR Code',
          initialQRData: 'https://github.com/MessiInter/qr-code-gen',
          initialWidthHeight: 100,
          margin: 1,
        }),
        (this.qrDataForm = new Uo()),
        (this.qrData = this.qrCodeOptions.initialQRData),
        (this.qrCodeUrl = ''),
        (this.widthHeightForm = new Uo()),
        (this.widthHeight = this.qrCodeOptions.initialWidthHeight),
        (this.elementType = 'img'),
        (this.showAdvancedOptions = !1);
    }
    onUrlChange(n) {
      this.qrCodeUrl = n;
    }
    onCheckboxChange(n) {
      this.showAdvancedOptions = n;
    }
    ngOnInit() {
      [this.qrDataForm, this.widthHeightForm].forEach((n) => {
        n.valueChanges.subscribe((r) => {
          n === this.qrDataForm
            ? (this.qrData = r || this.qrCodeOptions.initialQRData)
            : (this.widthHeight =
                Number(r) || this.qrCodeOptions.initialWidthHeight);
        });
      });
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵcmp = De({
      type: e,
      selectors: [['qr-code-gen-root']],
      standalone: !0,
      features: [mc],
      decls: 33,
      vars: 13,
      consts: [
        [1, 'app-header'],
        ['href', '/', 'aria-label', 'Home'],
        [1, 'qr-icon'],
        [1, 'qrcode'],
        [
          3,
          'alt',
          'ariaLabel',
          'qrdata',
          'elementType',
          'imageWidth',
          'imageHeight',
          'width',
          'margin',
          'qrCodeURL',
        ],
        ['parent', ''],
        [1, 'download-btn'],
        ['mat-fab', '', 'color', 'primary'],
        [1, 'options-checkbox', 3, 'checked', 'change'],
        [1, 'form-container'],
        [1, 'app-form'],
        [1, 'form-field'],
        [
          'matInput',
          '',
          'type',
          'text',
          'aria-label',
          'QR Data',
          3,
          'placeholder',
          'formControl',
        ],
        ['mat-fab', '', 'color', 'primary', 3, 'click'],
        [
          'mat-fab',
          '',
          'color',
          'primary',
          'target',
          '_self',
          'download',
          'QR_Code_SVG',
          3,
          'href',
        ],
        [1, 'width-height'],
        ['for', 'widthHeight', 1, 'width-height-label'],
        ['min', '100', 'max', '200', 'value', '100'],
        [
          'matSliderThumb',
          '',
          'name',
          'widthHeight',
          1,
          'width-height-input',
          3,
          'formControl',
        ],
        ['for', 'widthHeight', 1, 'width-height-px-label'],
        [1, 'format-btn'],
        [1, 'format-label'],
        [
          'name',
          'elementType',
          'aria-label',
          'Format (elementType)',
          'selected',
          'elementType',
          1,
          'format-toggle-btn',
          3,
          'ngModel',
          'ngModelChange',
        ],
        ['value', 'img'],
        ['value', 'svg'],
      ],
      template: function (r, o) {
        r & 1 &&
          (S(0, 'header', 0)(1, 'a', 1)(2, 'mat-icon', 2),
          We(3, 'qr_code_2'),
          k(),
          S(4, 'h1'),
          We(5, 'QR Code Generator'),
          k()()(),
          j(6, 'br'),
          S(7, 'main')(8, 'div', 3)(9, 'qrcode', 4, 5),
          ye('qrCodeURL', function (a) {
            return o.onUrlChange(a);
          }),
          k()(),
          j(11, 'br')(12, 'mat-divider')(13, 'br'),
          S(14, 'div', 6),
          _e(15, sL, 3, 0, 'button', 7)(16, aL, 3, 1),
          k(),
          j(17, 'br')(18, 'mat-divider')(19, 'br'),
          S(20, 'mat-checkbox', 8),
          ye('change', function (a) {
            return o.onCheckboxChange(a.checked);
          }),
          We(21, 'Show Advanced Options'),
          k(),
          S(22, 'div', 9)(23, 'form', 10),
          _e(24, cL, 18, 3, 'section'),
          j(25, 'br')(26, 'mat-divider')(27, 'br'),
          S(28, 'mat-form-field', 11)(29, 'mat-label'),
          We(30, 'QR Data'),
          k(),
          j(31, 'input', 12),
          k()()()(),
          j(32, 'router-outlet')),
          r & 2 &&
            (W(9),
            de('alt', o.qrCodeOptions.alt)(
              'ariaLabel',
              o.qrCodeOptions.ariaLabel
            )('qrdata', o.qrData)('elementType', o.elementType)(
              'imageWidth',
              o.widthHeight
            )('imageHeight', o.widthHeight)('width', o.widthHeight)(
              'margin',
              o.qrCodeOptions.margin
            ),
            W(6),
            Te(15, o.elementType !== 'svg' ? 15 : 16),
            W(5),
            de('checked', o.showAdvancedOptions),
            W(4),
            Te(24, o.showAdvancedOptions ? 24 : -1),
            W(7),
            de('placeholder', o.qrCodeOptions.initialQRData)(
              'formControl',
              o.qrDataForm
            ));
      },
      dependencies: [
        Uy,
        Vy,
        Vc,
        Ty,
        ky,
        Kf,
        Bo,
        Hy,
        Jf,
        nx,
        tx,
        ex,
        sx,
        $h,
        zh,
        dx,
        Gh,
        fx,
        ux,
        Jo,
        Ex,
        bl,
        kx,
        Tx,
        Ox,
        Nx,
        jx,
        Vx,
        Xh,
        Aw,
        km,
        OE,
        NE,
      ],
      styles: [
        `main[_ngcontent-%COMP%]{text-align:center}header.app-header[_ngcontent-%COMP%]{background:#3f51b5;overflow-y:auto;padding-left:20px}header.app-header[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{align-items:center;display:flex;justify-content:center}header.app-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}header.app-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#fff;font-size:20px;font-weight:300;margin:0;padding:20px 8px}header.app-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   mat-icon.qr-icon[_ngcontent-%COMP%]{color:#fff}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]{align-items:center;display:flex;justify-content:center}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form.app-form[_ngcontent-%COMP%]{max-width:500px;min-width:150px;width:100%}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form.app-form[_ngcontent-%COMP%]   mat-form-field.form-field[_ngcontent-%COMP%]{width:100%}main[_ngcontent-%COMP%]   .qrcode[_ngcontent-%COMP%]{align-items:center;display:flex;justify-content:center}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form.app-form[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   .width-height[_ngcontent-%COMP%]   label.width-height-label[_ngcontent-%COMP%]{margin-right:5px}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form.app-form[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   .width-height[_ngcontent-%COMP%]   mat-slider[_ngcontent-%COMP%]   input.width-height-input[_ngcontent-%COMP%]{margin-left:5px}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form.app-form[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   .width-height[_ngcontent-%COMP%]   label.width-height-px-label[_ngcontent-%COMP%]{margin-left:5px}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form.app-form[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{align-items:center;display:flex;justify-content:center}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form.app-form[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   .format-btn[_ngcontent-%COMP%]   p.format-label[_ngcontent-%COMP%]{margin-right:5px}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form.app-form[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   .format-btn[_ngcontent-%COMP%]   mat-button-toggle-group.format-toggle-btn[_ngcontent-%COMP%]{margin-left:5px}main[_ngcontent-%COMP%]   mat-checkbox.options-checkbox[_ngcontent-%COMP%]{align-items:center;display:flex;justify-content:center}
/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsibWFpbiB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuaGVhZGVyLmFwcC1oZWFkZXIge1xuICBiYWNrZ3JvdW5kOiAjM2Y1MWI1O1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG59XG5cbmhlYWRlci5hcHAtaGVhZGVyICoge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuaGVhZGVyLmFwcC1oZWFkZXIgYSB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuaGVhZGVyLmFwcC1oZWFkZXIgYSBoMSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBmb250LXdlaWdodDogMzAwO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDIwcHggOHB4O1xufVxuXG5oZWFkZXIuYXBwLWhlYWRlciBhIG1hdC1pY29uLnFyLWljb24ge1xuICBjb2xvcjogd2hpdGU7XG59XG5cbm1haW4gLmZvcm0tY29udGFpbmVyIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbm1haW4gLmZvcm0tY29udGFpbmVyIGZvcm0uYXBwLWZvcm0ge1xuICBtYXgtd2lkdGg6IDUwMHB4O1xuICBtaW4td2lkdGg6IDE1MHB4O1xuICB3aWR0aDogMTAwJTtcbn1cblxubWFpbiAuZm9ybS1jb250YWluZXIgZm9ybS5hcHAtZm9ybSBtYXQtZm9ybS1maWVsZC5mb3JtLWZpZWxkIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbm1haW4gLnFyY29kZSB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG5tYWluXG4gIC5mb3JtLWNvbnRhaW5lclxuICBmb3JtLmFwcC1mb3JtXG4gIHNlY3Rpb25cbiAgLndpZHRoLWhlaWdodFxuICBsYWJlbC53aWR0aC1oZWlnaHQtbGFiZWwge1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cblxubWFpblxuICAuZm9ybS1jb250YWluZXJcbiAgZm9ybS5hcHAtZm9ybVxuICBzZWN0aW9uXG4gIC53aWR0aC1oZWlnaHRcbiAgbWF0LXNsaWRlclxuICBpbnB1dC53aWR0aC1oZWlnaHQtaW5wdXQge1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuXG5tYWluXG4gIC5mb3JtLWNvbnRhaW5lclxuICBmb3JtLmFwcC1mb3JtXG4gIHNlY3Rpb25cbiAgLndpZHRoLWhlaWdodFxuICBsYWJlbC53aWR0aC1oZWlnaHQtcHgtbGFiZWwge1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuXG5tYWluIC5mb3JtLWNvbnRhaW5lciBmb3JtLmFwcC1mb3JtIHNlY3Rpb24gKiB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG5tYWluIC5mb3JtLWNvbnRhaW5lciBmb3JtLmFwcC1mb3JtIHNlY3Rpb24gLmZvcm1hdC1idG4gcC5mb3JtYXQtbGFiZWwge1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cblxubWFpblxuICAuZm9ybS1jb250YWluZXJcbiAgZm9ybS5hcHAtZm9ybVxuICBzZWN0aW9uXG4gIC5mb3JtYXQtYnRuXG4gIG1hdC1idXR0b24tdG9nZ2xlLWdyb3VwLmZvcm1hdC10b2dnbGUtYnRuIHtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cblxubWFpbiBtYXQtY2hlY2tib3gub3B0aW9ucy1jaGVja2JveCB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIkFBQUEsS0FDRSxXQUFZLE1BQ2QsQ0FFQSxNQUFNLENBQUMsV0FDTCxXQUFZLFFBQ1osV0FBWSxLQUNaLGFBQWMsSUFDaEIsQ0FFQSxNQUFNLENBTkMsV0FNVyxFQUNoQixZQUFhLE9BQ2IsUUFBUyxLQUNULGdCQUFpQixNQUNuQixDQUVBLE1BQU0sQ0FaQyxXQVlXLEVBQ2hCLGdCQUFpQixJQUNuQixDQUVBLE1BQU0sQ0FoQkMsV0FnQlcsRUFBRSxHQUNsQixNQUFPLEtBQ1AsVUFBVyxLQUNYLFlBQWEsSUF2QmYsT0F3QlUsRUF4QlYsUUF5QlcsS0FBSyxHQUNoQixDQUVBLE1BQU0sQ0F4QkMsV0F3QlcsRUFBRSxRQUFRLENBQUMsUUFDM0IsTUFBTyxJQUNULENBRUEsS0FBSyxDQUFDLGVBQ0osWUFBYSxPQUNiLFFBQVMsS0FDVCxnQkFBaUIsTUFDbkIsQ0FFQSxLQUFLLENBTkMsZUFNZSxJQUFJLENBQUMsU0FDeEIsVUFBVyxNQUNYLFVBQVcsTUFDWCxNQUFPLElBQ1QsQ0FFQSxLQUFLLENBWkMsZUFZZSxJQUFJLENBTkMsU0FNUyxjQUFjLENBQUMsV0FDaEQsTUFBTyxJQUNULENBRUEsS0FBSyxDQUFDLE9BQ0osWUFBYSxPQUNiLFFBQVMsS0FDVCxnQkFBaUIsTUFDbkIsQ0FFQSxLQUNFLENBdkJJLGVBd0JKLElBQUksQ0FsQm9CLFNBbUJ4QixRQUNBLENBQUMsYUFDRCxLQUFLLENBQUMsbUJBQ04sYUFBYyxHQUNoQixDQUVBLEtBQ0UsQ0FoQ0ksZUFpQ0osSUFBSSxDQTNCb0IsU0E0QnhCLFFBQ0EsQ0FUQyxhQVVELFdBQ0EsS0FBSyxDQUFDLG1CQUNOLFlBQWEsR0FDZixDQUVBLEtBQ0UsQ0ExQ0ksZUEyQ0osSUFBSSxDQXJDb0IsU0FzQ3hCLFFBQ0EsQ0FuQkMsYUFvQkQsS0FBSyxDQUFDLHNCQUNOLFlBQWEsR0FDZixDQUVBLEtBQUssQ0FsREMsZUFrRGUsSUFBSSxDQTVDQyxTQTRDUyxRQUFRLEVBQ3pDLFlBQWEsT0FDYixRQUFTLEtBQ1QsZ0JBQWlCLE1BQ25CLENBRUEsS0FBSyxDQXhEQyxlQXdEZSxJQUFJLENBbERDLFNBa0RTLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUN2RCxhQUFjLEdBQ2hCLENBRUEsS0FDRSxDQTdESSxlQThESixJQUFJLENBeERvQixTQXlEeEIsUUFDQSxDQVIwQyxXQVMxQyx1QkFBdUIsQ0FBQyxrQkFDeEIsWUFBYSxHQUNmLENBRUEsS0FBSyxZQUFZLENBQUMsaUJBQ2hCLFlBQWEsT0FDYixRQUFTLEtBQ1QsZ0JBQWlCLE1BQ25CIiwKICAibmFtZXMiOiBbXQp9Cg== */`,
      ],
    }));
  let t = e;
  return t;
})();
var BE = [];
var UE = { providers: [dy(), Iw(BE), M0()] };
var HE = { production: !0 };
HE.production && void 0;
cy(jE, UE).catch((t) => console.error(t));
//# sourceMappingURL=main-HNG56N7C.js.map
