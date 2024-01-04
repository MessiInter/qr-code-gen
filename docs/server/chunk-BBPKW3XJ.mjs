import './polyfills.server.mjs';
import {
  $ as ht,
  $a as rr,
  A as ti,
  Aa as ii,
  B as N,
  Ba as nn,
  C,
  Ca as tt,
  D as y,
  Da as $o,
  E as I,
  Ea as F,
  F as O,
  Fa as Y,
  G as Q,
  Ga as gt,
  H as E,
  Ha as D,
  I as T,
  Ia as Ko,
  J as St,
  K as $i,
  L as Ki,
  M as jo,
  N as zo,
  O as Ji,
  P as $t,
  Pa as X,
  Q as Ho,
  Qa as ni,
  R as ut,
  Ra as Jo,
  S as Go,
  Sa as on,
  T as ce,
  Ta as pt,
  U as Qo,
  V as A,
  Va as tr,
  W as Me,
  Wa as er,
  X as ei,
  Xa as ir,
  Y as k,
  Ya as nr,
  Z as m,
  Za as or,
  _ as tn,
  _a as oi,
  a as Ce,
  aa as z,
  ab as ar,
  b as $e,
  ba as S,
  bb as sr,
  c as nt,
  ca as $,
  cb as rn,
  d as To,
  da as ft,
  db as dr,
  e as Ao,
  ea as U,
  eb as cr,
  f as Fo,
  fa as B,
  fb as lr,
  g as Dt,
  ga as Wo,
  h as Do,
  ha as M,
  i as vt,
  ia as It,
  ib as mr,
  j as So,
  ja as W,
  k as Ro,
  ka as q,
  l as Ke,
  la as qo,
  m as Oo,
  ma as Yo,
  mb as ur,
  n as Zi,
  na as Zo,
  o as Lo,
  oa as p,
  p as Xi,
  pa as g,
  pb as hr,
  q as Ee,
  qa as w,
  qb as fr,
  r as Vo,
  ra as en,
  s as No,
  sa as Kt,
  t as Bo,
  ta as Xo,
  u as Po,
  ua as H,
  v as Je,
  va as K,
  w as Uo,
  wa as dt,
  x as Et,
  xa as L,
  y as Ie,
  ya as Rt,
  z as xt,
  za as at,
} from './chunk-7YSW2TDQ.mjs';
import {
  a as G,
  b as Xt,
  c as it,
  e as f,
  g as Ac,
  h as Yi,
} from './chunk-4S7LW3SP.mjs';
var Nn = f((G_, cs) => {
  'use strict';
  cs.exports = function () {
    return (
      typeof Promise == 'function' &&
      Promise.prototype &&
      Promise.prototype.then
    );
  };
});
var Ht = f((ee) => {
  'use strict';
  var Bn,
    cu = [
      0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655,
      733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921,
      2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706,
    ];
  ee.getSymbolSize = function (t) {
    if (!t) throw new Error('"version" cannot be null or undefined');
    if (t < 1 || t > 40)
      throw new Error('"version" should be in range from 1 to 40');
    return t * 4 + 17;
  };
  ee.getSymbolTotalCodewords = function (t) {
    return cu[t];
  };
  ee.getBCHDigit = function (i) {
    let t = 0;
    for (; i !== 0; ) t++, (i >>>= 1);
    return t;
  };
  ee.setToSJISFunction = function (t) {
    if (typeof t != 'function')
      throw new Error('"toSJISFunc" is not a valid function.');
    Bn = t;
  };
  ee.isKanjiModeEnabled = function () {
    return typeof Bn < 'u';
  };
  ee.toSJIS = function (t) {
    return Bn(t);
  };
});
var Ri = f((yt) => {
  'use strict';
  yt.L = { bit: 1 };
  yt.M = { bit: 0 };
  yt.Q = { bit: 3 };
  yt.H = { bit: 2 };
  function lu(i) {
    if (typeof i != 'string') throw new Error('Param is not a string');
    switch (i.toLowerCase()) {
      case 'l':
      case 'low':
        return yt.L;
      case 'm':
      case 'medium':
        return yt.M;
      case 'q':
      case 'quartile':
        return yt.Q;
      case 'h':
      case 'high':
        return yt.H;
      default:
        throw new Error('Unknown EC Level: ' + i);
    }
  }
  yt.isValid = function (t) {
    return t && typeof t.bit < 'u' && t.bit >= 0 && t.bit < 4;
  };
  yt.from = function (t, r) {
    if (yt.isValid(t)) return t;
    try {
      return lu(t);
    } catch {
      return r;
    }
  };
});
var us = f((q_, ms) => {
  'use strict';
  function ls() {
    (this.buffer = []), (this.length = 0);
  }
  ls.prototype = {
    get: function (i) {
      let t = Math.floor(i / 8);
      return ((this.buffer[t] >>> (7 - (i % 8))) & 1) === 1;
    },
    put: function (i, t) {
      for (let r = 0; r < t; r++) this.putBit(((i >>> (t - r - 1)) & 1) === 1);
    },
    getLengthInBits: function () {
      return this.length;
    },
    putBit: function (i) {
      let t = Math.floor(this.length / 8);
      this.buffer.length <= t && this.buffer.push(0),
        i && (this.buffer[t] |= 128 >>> this.length % 8),
        this.length++;
    },
  };
  ms.exports = ls;
});
var fs = f((Y_, hs) => {
  'use strict';
  function Pe(i) {
    if (!i || i < 1)
      throw new Error('BitMatrix size must be defined and greater than 0');
    (this.size = i),
      (this.data = new Uint8Array(i * i)),
      (this.reservedBit = new Uint8Array(i * i));
  }
  Pe.prototype.set = function (i, t, r, e) {
    let n = i * this.size + t;
    (this.data[n] = r), e && (this.reservedBit[n] = !0);
  };
  Pe.prototype.get = function (i, t) {
    return this.data[i * this.size + t];
  };
  Pe.prototype.xor = function (i, t, r) {
    this.data[i * this.size + t] ^= r;
  };
  Pe.prototype.isReserved = function (i, t) {
    return this.reservedBit[i * this.size + t];
  };
  hs.exports = Pe;
});
var ps = f((Oi) => {
  'use strict';
  var mu = Ht().getSymbolSize;
  Oi.getRowColCoords = function (t) {
    if (t === 1) return [];
    let r = Math.floor(t / 7) + 2,
      e = mu(t),
      n = e === 145 ? 26 : Math.ceil((e - 13) / (2 * r - 2)) * 2,
      o = [e - 7];
    for (let a = 1; a < r - 1; a++) o[a] = o[a - 1] - n;
    return o.push(6), o.reverse();
  };
  Oi.getPositions = function (t) {
    let r = [],
      e = Oi.getRowColCoords(t),
      n = e.length;
    for (let o = 0; o < n; o++)
      for (let a = 0; a < n; a++)
        (o === 0 && a === 0) ||
          (o === 0 && a === n - 1) ||
          (o === n - 1 && a === 0) ||
          r.push([e[o], e[a]]);
    return r;
  };
});
var _s = f((gs) => {
  'use strict';
  var uu = Ht().getSymbolSize,
    bs = 7;
  gs.getPositions = function (t) {
    let r = uu(t);
    return [
      [0, 0],
      [r - bs, 0],
      [0, r - bs],
    ];
  };
});
var vs = f((P) => {
  'use strict';
  P.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7,
  };
  var ie = { N1: 3, N2: 3, N3: 40, N4: 10 };
  P.isValid = function (t) {
    return t != null && t !== '' && !isNaN(t) && t >= 0 && t <= 7;
  };
  P.from = function (t) {
    return P.isValid(t) ? parseInt(t, 10) : void 0;
  };
  P.getPenaltyN1 = function (t) {
    let r = t.size,
      e = 0,
      n = 0,
      o = 0,
      a = null,
      s = null;
    for (let d = 0; d < r; d++) {
      (n = o = 0), (a = s = null);
      for (let c = 0; c < r; c++) {
        let l = t.get(d, c);
        l === a ? n++ : (n >= 5 && (e += ie.N1 + (n - 5)), (a = l), (n = 1)),
          (l = t.get(c, d)),
          l === s ? o++ : (o >= 5 && (e += ie.N1 + (o - 5)), (s = l), (o = 1));
      }
      n >= 5 && (e += ie.N1 + (n - 5)), o >= 5 && (e += ie.N1 + (o - 5));
    }
    return e;
  };
  P.getPenaltyN2 = function (t) {
    let r = t.size,
      e = 0;
    for (let n = 0; n < r - 1; n++)
      for (let o = 0; o < r - 1; o++) {
        let a =
          t.get(n, o) + t.get(n, o + 1) + t.get(n + 1, o) + t.get(n + 1, o + 1);
        (a === 4 || a === 0) && e++;
      }
    return e * ie.N2;
  };
  P.getPenaltyN3 = function (t) {
    let r = t.size,
      e = 0,
      n = 0,
      o = 0;
    for (let a = 0; a < r; a++) {
      n = o = 0;
      for (let s = 0; s < r; s++)
        (n = ((n << 1) & 2047) | t.get(a, s)),
          s >= 10 && (n === 1488 || n === 93) && e++,
          (o = ((o << 1) & 2047) | t.get(s, a)),
          s >= 10 && (o === 1488 || o === 93) && e++;
    }
    return e * ie.N3;
  };
  P.getPenaltyN4 = function (t) {
    let r = 0,
      e = t.data.length;
    for (let o = 0; o < e; o++) r += t.data[o];
    return Math.abs(Math.ceil((r * 100) / e / 5) - 10) * ie.N4;
  };
  function hu(i, t, r) {
    switch (i) {
      case P.Patterns.PATTERN000:
        return (t + r) % 2 === 0;
      case P.Patterns.PATTERN001:
        return t % 2 === 0;
      case P.Patterns.PATTERN010:
        return r % 3 === 0;
      case P.Patterns.PATTERN011:
        return (t + r) % 3 === 0;
      case P.Patterns.PATTERN100:
        return (Math.floor(t / 2) + Math.floor(r / 3)) % 2 === 0;
      case P.Patterns.PATTERN101:
        return ((t * r) % 2) + ((t * r) % 3) === 0;
      case P.Patterns.PATTERN110:
        return (((t * r) % 2) + ((t * r) % 3)) % 2 === 0;
      case P.Patterns.PATTERN111:
        return (((t * r) % 3) + ((t + r) % 2)) % 2 === 0;
      default:
        throw new Error('bad maskPattern:' + i);
    }
  }
  P.applyMask = function (t, r) {
    let e = r.size;
    for (let n = 0; n < e; n++)
      for (let o = 0; o < e; o++)
        r.isReserved(o, n) || r.xor(o, n, hu(t, o, n));
  };
  P.getBestMask = function (t, r) {
    let e = Object.keys(P.Patterns).length,
      n = 0,
      o = 1 / 0;
    for (let a = 0; a < e; a++) {
      r(a), P.applyMask(a, t);
      let s =
        P.getPenaltyN1(t) +
        P.getPenaltyN2(t) +
        P.getPenaltyN3(t) +
        P.getPenaltyN4(t);
      P.applyMask(a, t), s < o && ((o = s), (n = a));
    }
    return n;
  };
});
var Un = f((Pn) => {
  'use strict';
  var Gt = Ri(),
    Li = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2,
      4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4,
      9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6,
      13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9,
      18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34,
      40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17,
      33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56,
      66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81,
    ],
    Vi = [
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
  Pn.getBlocksCount = function (t, r) {
    switch (r) {
      case Gt.L:
        return Li[(t - 1) * 4 + 0];
      case Gt.M:
        return Li[(t - 1) * 4 + 1];
      case Gt.Q:
        return Li[(t - 1) * 4 + 2];
      case Gt.H:
        return Li[(t - 1) * 4 + 3];
      default:
        return;
    }
  };
  Pn.getTotalCodewordsCount = function (t, r) {
    switch (r) {
      case Gt.L:
        return Vi[(t - 1) * 4 + 0];
      case Gt.M:
        return Vi[(t - 1) * 4 + 1];
      case Gt.Q:
        return Vi[(t - 1) * 4 + 2];
      case Gt.H:
        return Vi[(t - 1) * 4 + 3];
      default:
        return;
    }
  };
});
var xs = f((Bi) => {
  'use strict';
  var Ue = new Uint8Array(512),
    Ni = new Uint8Array(256);
  (function () {
    let t = 1;
    for (let r = 0; r < 255; r++)
      (Ue[r] = t), (Ni[t] = r), (t <<= 1), t & 256 && (t ^= 285);
    for (let r = 255; r < 512; r++) Ue[r] = Ue[r - 255];
  })();
  Bi.log = function (t) {
    if (t < 1) throw new Error('log(' + t + ')');
    return Ni[t];
  };
  Bi.exp = function (t) {
    return Ue[t];
  };
  Bi.mul = function (t, r) {
    return t === 0 || r === 0 ? 0 : Ue[Ni[t] + Ni[r]];
  };
});
var ys = f((je) => {
  'use strict';
  var jn = xs();
  je.mul = function (t, r) {
    let e = new Uint8Array(t.length + r.length - 1);
    for (let n = 0; n < t.length; n++)
      for (let o = 0; o < r.length; o++) e[n + o] ^= jn.mul(t[n], r[o]);
    return e;
  };
  je.mod = function (t, r) {
    let e = new Uint8Array(t);
    for (; e.length - r.length >= 0; ) {
      let n = e[0];
      for (let a = 0; a < r.length; a++) e[a] ^= jn.mul(r[a], n);
      let o = 0;
      for (; o < e.length && e[o] === 0; ) o++;
      e = e.slice(o);
    }
    return e;
  };
  je.generateECPolynomial = function (t) {
    let r = new Uint8Array([1]);
    for (let e = 0; e < t; e++) r = je.mul(r, new Uint8Array([1, jn.exp(e)]));
    return r;
  };
});
var Cs = f((e0, ws) => {
  'use strict';
  var ks = ys();
  function zn(i) {
    (this.genPoly = void 0),
      (this.degree = i),
      this.degree && this.initialize(this.degree);
  }
  zn.prototype.initialize = function (t) {
    (this.degree = t), (this.genPoly = ks.generateECPolynomial(this.degree));
  };
  zn.prototype.encode = function (t) {
    if (!this.genPoly) throw new Error('Encoder not initialized');
    let r = new Uint8Array(t.length + this.degree);
    r.set(t);
    let e = ks.mod(r, this.genPoly),
      n = this.degree - e.length;
    if (n > 0) {
      let o = new Uint8Array(this.degree);
      return o.set(e, n), o;
    }
    return e;
  };
  ws.exports = zn;
});
var Hn = f((Es) => {
  'use strict';
  Es.isValid = function (t) {
    return !isNaN(t) && t >= 1 && t <= 40;
  };
});
var Gn = f((Nt) => {
  'use strict';
  var Is = '[0-9]+',
    fu = '[A-Z $%*+\\-./:]+',
    ze =
      '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
  ze = ze.replace(/u/g, '\\u');
  var pu =
    '(?:(?![A-Z0-9 $%*+\\-./:]|' +
    ze +
    `)(?:.|[\r
]))+`;
  Nt.KANJI = new RegExp(ze, 'g');
  Nt.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
  Nt.BYTE = new RegExp(pu, 'g');
  Nt.NUMERIC = new RegExp(Is, 'g');
  Nt.ALPHANUMERIC = new RegExp(fu, 'g');
  var bu = new RegExp('^' + ze + '$'),
    gu = new RegExp('^' + Is + '$'),
    _u = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');
  Nt.testKanji = function (t) {
    return bu.test(t);
  };
  Nt.testNumeric = function (t) {
    return gu.test(t);
  };
  Nt.testAlphanumeric = function (t) {
    return _u.test(t);
  };
});
var Qt = f((et) => {
  'use strict';
  var vu = Hn(),
    Qn = Gn();
  et.NUMERIC = { id: 'Numeric', bit: 1, ccBits: [10, 12, 14] };
  et.ALPHANUMERIC = { id: 'Alphanumeric', bit: 2, ccBits: [9, 11, 13] };
  et.BYTE = { id: 'Byte', bit: 4, ccBits: [8, 16, 16] };
  et.KANJI = { id: 'Kanji', bit: 8, ccBits: [8, 10, 12] };
  et.MIXED = { bit: -1 };
  et.getCharCountIndicator = function (t, r) {
    if (!t.ccBits) throw new Error('Invalid mode: ' + t);
    if (!vu.isValid(r)) throw new Error('Invalid version: ' + r);
    return r >= 1 && r < 10 ? t.ccBits[0] : r < 27 ? t.ccBits[1] : t.ccBits[2];
  };
  et.getBestModeForData = function (t) {
    return Qn.testNumeric(t)
      ? et.NUMERIC
      : Qn.testAlphanumeric(t)
      ? et.ALPHANUMERIC
      : Qn.testKanji(t)
      ? et.KANJI
      : et.BYTE;
  };
  et.toString = function (t) {
    if (t && t.id) return t.id;
    throw new Error('Invalid mode');
  };
  et.isValid = function (t) {
    return t && t.bit && t.ccBits;
  };
  function xu(i) {
    if (typeof i != 'string') throw new Error('Param is not a string');
    switch (i.toLowerCase()) {
      case 'numeric':
        return et.NUMERIC;
      case 'alphanumeric':
        return et.ALPHANUMERIC;
      case 'kanji':
        return et.KANJI;
      case 'byte':
        return et.BYTE;
      default:
        throw new Error('Unknown mode: ' + i);
    }
  }
  et.from = function (t, r) {
    if (et.isValid(t)) return t;
    try {
      return xu(t);
    } catch {
      return r;
    }
  };
});
var Ds = f((ne) => {
  'use strict';
  var Pi = Ht(),
    yu = Un(),
    Ms = Ri(),
    Wt = Qt(),
    Wn = Hn(),
    As = 7973,
    Ts = Pi.getBCHDigit(As);
  function ku(i, t, r) {
    for (let e = 1; e <= 40; e++) if (t <= ne.getCapacity(e, r, i)) return e;
  }
  function Fs(i, t) {
    return Wt.getCharCountIndicator(i, t) + 4;
  }
  function wu(i, t) {
    let r = 0;
    return (
      i.forEach(function (e) {
        let n = Fs(e.mode, t);
        r += n + e.getBitsLength();
      }),
      r
    );
  }
  function Cu(i, t) {
    for (let r = 1; r <= 40; r++)
      if (wu(i, r) <= ne.getCapacity(r, t, Wt.MIXED)) return r;
  }
  ne.from = function (t, r) {
    return Wn.isValid(t) ? parseInt(t, 10) : r;
  };
  ne.getCapacity = function (t, r, e) {
    if (!Wn.isValid(t)) throw new Error('Invalid QR Code version');
    typeof e > 'u' && (e = Wt.BYTE);
    let n = Pi.getSymbolTotalCodewords(t),
      o = yu.getTotalCodewordsCount(t, r),
      a = (n - o) * 8;
    if (e === Wt.MIXED) return a;
    let s = a - Fs(e, t);
    switch (e) {
      case Wt.NUMERIC:
        return Math.floor((s / 10) * 3);
      case Wt.ALPHANUMERIC:
        return Math.floor((s / 11) * 2);
      case Wt.KANJI:
        return Math.floor(s / 13);
      case Wt.BYTE:
      default:
        return Math.floor(s / 8);
    }
  };
  ne.getBestVersionForData = function (t, r) {
    let e,
      n = Ms.from(r, Ms.M);
    if (Array.isArray(t)) {
      if (t.length > 1) return Cu(t, n);
      if (t.length === 0) return 1;
      e = t[0];
    } else e = t;
    return ku(e.mode, e.getLength(), n);
  };
  ne.getEncodedBits = function (t) {
    if (!Wn.isValid(t) || t < 7) throw new Error('Invalid QR Code version');
    let r = t << 12;
    for (; Pi.getBCHDigit(r) - Ts >= 0; ) r ^= As << (Pi.getBCHDigit(r) - Ts);
    return (t << 12) | r;
  };
});
var Ls = f((Os) => {
  'use strict';
  var qn = Ht(),
    Rs = 1335,
    Eu = 21522,
    Ss = qn.getBCHDigit(Rs);
  Os.getEncodedBits = function (t, r) {
    let e = (t.bit << 3) | r,
      n = e << 10;
    for (; qn.getBCHDigit(n) - Ss >= 0; ) n ^= Rs << (qn.getBCHDigit(n) - Ss);
    return ((e << 10) | n) ^ Eu;
  };
});
var Ns = f((s0, Vs) => {
  'use strict';
  var Iu = Qt();
  function fe(i) {
    (this.mode = Iu.NUMERIC), (this.data = i.toString());
  }
  fe.getBitsLength = function (t) {
    return 10 * Math.floor(t / 3) + (t % 3 ? (t % 3) * 3 + 1 : 0);
  };
  fe.prototype.getLength = function () {
    return this.data.length;
  };
  fe.prototype.getBitsLength = function () {
    return fe.getBitsLength(this.data.length);
  };
  fe.prototype.write = function (t) {
    let r, e, n;
    for (r = 0; r + 3 <= this.data.length; r += 3)
      (e = this.data.substr(r, 3)), (n = parseInt(e, 10)), t.put(n, 10);
    let o = this.data.length - r;
    o > 0 &&
      ((e = this.data.substr(r)), (n = parseInt(e, 10)), t.put(n, o * 3 + 1));
  };
  Vs.exports = fe;
});
var Ps = f((d0, Bs) => {
  'use strict';
  var Mu = Qt(),
    Yn = [
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
  function pe(i) {
    (this.mode = Mu.ALPHANUMERIC), (this.data = i);
  }
  pe.getBitsLength = function (t) {
    return 11 * Math.floor(t / 2) + 6 * (t % 2);
  };
  pe.prototype.getLength = function () {
    return this.data.length;
  };
  pe.prototype.getBitsLength = function () {
    return pe.getBitsLength(this.data.length);
  };
  pe.prototype.write = function (t) {
    let r;
    for (r = 0; r + 2 <= this.data.length; r += 2) {
      let e = Yn.indexOf(this.data[r]) * 45;
      (e += Yn.indexOf(this.data[r + 1])), t.put(e, 11);
    }
    this.data.length % 2 && t.put(Yn.indexOf(this.data[r]), 6);
  };
  Bs.exports = pe;
});
var js = f((c0, Us) => {
  'use strict';
  Us.exports = function (t) {
    for (var r = [], e = t.length, n = 0; n < e; n++) {
      var o = t.charCodeAt(n);
      if (o >= 55296 && o <= 56319 && e > n + 1) {
        var a = t.charCodeAt(n + 1);
        a >= 56320 &&
          a <= 57343 &&
          ((o = (o - 55296) * 1024 + a - 56320 + 65536), (n += 1));
      }
      if (o < 128) {
        r.push(o);
        continue;
      }
      if (o < 2048) {
        r.push((o >> 6) | 192), r.push((o & 63) | 128);
        continue;
      }
      if (o < 55296 || (o >= 57344 && o < 65536)) {
        r.push((o >> 12) | 224),
          r.push(((o >> 6) & 63) | 128),
          r.push((o & 63) | 128);
        continue;
      }
      if (o >= 65536 && o <= 1114111) {
        r.push((o >> 18) | 240),
          r.push(((o >> 12) & 63) | 128),
          r.push(((o >> 6) & 63) | 128),
          r.push((o & 63) | 128);
        continue;
      }
      r.push(239, 191, 189);
    }
    return new Uint8Array(r).buffer;
  };
});
var Hs = f((l0, zs) => {
  'use strict';
  var Tu = js(),
    Au = Qt();
  function be(i) {
    (this.mode = Au.BYTE),
      typeof i == 'string' && (i = Tu(i)),
      (this.data = new Uint8Array(i));
  }
  be.getBitsLength = function (t) {
    return t * 8;
  };
  be.prototype.getLength = function () {
    return this.data.length;
  };
  be.prototype.getBitsLength = function () {
    return be.getBitsLength(this.data.length);
  };
  be.prototype.write = function (i) {
    for (let t = 0, r = this.data.length; t < r; t++) i.put(this.data[t], 8);
  };
  zs.exports = be;
});
var Qs = f((m0, Gs) => {
  'use strict';
  var Fu = Qt(),
    Du = Ht();
  function ge(i) {
    (this.mode = Fu.KANJI), (this.data = i);
  }
  ge.getBitsLength = function (t) {
    return t * 13;
  };
  ge.prototype.getLength = function () {
    return this.data.length;
  };
  ge.prototype.getBitsLength = function () {
    return ge.getBitsLength(this.data.length);
  };
  ge.prototype.write = function (i) {
    let t;
    for (t = 0; t < this.data.length; t++) {
      let r = Du.toSJIS(this.data[t]);
      if (r >= 33088 && r <= 40956) r -= 33088;
      else if (r >= 57408 && r <= 60351) r -= 49472;
      else
        throw new Error(
          'Invalid SJIS character: ' +
            this.data[t] +
            `
Make sure your charset is UTF-8`
        );
      (r = ((r >>> 8) & 255) * 192 + (r & 255)), i.put(r, 13);
    }
  };
  Gs.exports = ge;
});
var Ws = f((u0, Zn) => {
  'use strict';
  var He = {
    single_source_shortest_paths: function (i, t, r) {
      var e = {},
        n = {};
      n[t] = 0;
      var o = He.PriorityQueue.make();
      o.push(t, 0);
      for (var a, s, d, c, l, u, h, b, v; !o.empty(); ) {
        (a = o.pop()), (s = a.value), (c = a.cost), (l = i[s] || {});
        for (d in l)
          l.hasOwnProperty(d) &&
            ((u = l[d]),
            (h = c + u),
            (b = n[d]),
            (v = typeof n[d] > 'u'),
            (v || b > h) && ((n[d] = h), o.push(d, h), (e[d] = s)));
      }
      if (typeof r < 'u' && typeof n[r] > 'u') {
        var x = ['Could not find a path from ', t, ' to ', r, '.'].join('');
        throw new Error(x);
      }
      return e;
    },
    extract_shortest_path_from_predecessor_list: function (i, t) {
      for (var r = [], e = t, n; e; ) r.push(e), (n = i[e]), (e = i[e]);
      return r.reverse(), r;
    },
    find_path: function (i, t, r) {
      var e = He.single_source_shortest_paths(i, t, r);
      return He.extract_shortest_path_from_predecessor_list(e, r);
    },
    PriorityQueue: {
      make: function (i) {
        var t = He.PriorityQueue,
          r = {},
          e;
        i = i || {};
        for (e in t) t.hasOwnProperty(e) && (r[e] = t[e]);
        return (r.queue = []), (r.sorter = i.sorter || t.default_sorter), r;
      },
      default_sorter: function (i, t) {
        return i.cost - t.cost;
      },
      push: function (i, t) {
        var r = { value: i, cost: t };
        this.queue.push(r), this.queue.sort(this.sorter);
      },
      pop: function () {
        return this.queue.shift();
      },
      empty: function () {
        return this.queue.length === 0;
      },
    },
  };
  typeof Zn < 'u' && (Zn.exports = He);
});
var td = f((_e) => {
  'use strict';
  var V = Qt(),
    Zs = Ns(),
    Xs = Ps(),
    $s = Hs(),
    Ks = Qs(),
    Ge = Gn(),
    Ui = Ht(),
    Su = Ws();
  function qs(i) {
    return unescape(encodeURIComponent(i)).length;
  }
  function Qe(i, t, r) {
    let e = [],
      n;
    for (; (n = i.exec(r)) !== null; )
      e.push({ data: n[0], index: n.index, mode: t, length: n[0].length });
    return e;
  }
  function Js(i) {
    let t = Qe(Ge.NUMERIC, V.NUMERIC, i),
      r = Qe(Ge.ALPHANUMERIC, V.ALPHANUMERIC, i),
      e,
      n;
    return (
      Ui.isKanjiModeEnabled()
        ? ((e = Qe(Ge.BYTE, V.BYTE, i)), (n = Qe(Ge.KANJI, V.KANJI, i)))
        : ((e = Qe(Ge.BYTE_KANJI, V.BYTE, i)), (n = [])),
      t
        .concat(r, e, n)
        .sort(function (a, s) {
          return a.index - s.index;
        })
        .map(function (a) {
          return { data: a.data, mode: a.mode, length: a.length };
        })
    );
  }
  function Xn(i, t) {
    switch (t) {
      case V.NUMERIC:
        return Zs.getBitsLength(i);
      case V.ALPHANUMERIC:
        return Xs.getBitsLength(i);
      case V.KANJI:
        return Ks.getBitsLength(i);
      case V.BYTE:
        return $s.getBitsLength(i);
    }
  }
  function Ru(i) {
    return i.reduce(function (t, r) {
      let e = t.length - 1 >= 0 ? t[t.length - 1] : null;
      return e && e.mode === r.mode
        ? ((t[t.length - 1].data += r.data), t)
        : (t.push(r), t);
    }, []);
  }
  function Ou(i) {
    let t = [];
    for (let r = 0; r < i.length; r++) {
      let e = i[r];
      switch (e.mode) {
        case V.NUMERIC:
          t.push([
            e,
            { data: e.data, mode: V.ALPHANUMERIC, length: e.length },
            { data: e.data, mode: V.BYTE, length: e.length },
          ]);
          break;
        case V.ALPHANUMERIC:
          t.push([e, { data: e.data, mode: V.BYTE, length: e.length }]);
          break;
        case V.KANJI:
          t.push([e, { data: e.data, mode: V.BYTE, length: qs(e.data) }]);
          break;
        case V.BYTE:
          t.push([{ data: e.data, mode: V.BYTE, length: qs(e.data) }]);
      }
    }
    return t;
  }
  function Lu(i, t) {
    let r = {},
      e = { start: {} },
      n = ['start'];
    for (let o = 0; o < i.length; o++) {
      let a = i[o],
        s = [];
      for (let d = 0; d < a.length; d++) {
        let c = a[d],
          l = '' + o + d;
        s.push(l), (r[l] = { node: c, lastCount: 0 }), (e[l] = {});
        for (let u = 0; u < n.length; u++) {
          let h = n[u];
          r[h] && r[h].node.mode === c.mode
            ? ((e[h][l] =
                Xn(r[h].lastCount + c.length, c.mode) -
                Xn(r[h].lastCount, c.mode)),
              (r[h].lastCount += c.length))
            : (r[h] && (r[h].lastCount = c.length),
              (e[h][l] =
                Xn(c.length, c.mode) + 4 + V.getCharCountIndicator(c.mode, t)));
        }
      }
      n = s;
    }
    for (let o = 0; o < n.length; o++) e[n[o]].end = 0;
    return { map: e, table: r };
  }
  function Ys(i, t) {
    let r,
      e = V.getBestModeForData(i);
    if (((r = V.from(t, e)), r !== V.BYTE && r.bit < e.bit))
      throw new Error(
        '"' +
          i +
          '" cannot be encoded with mode ' +
          V.toString(r) +
          `.
 Suggested mode is: ` +
          V.toString(e)
      );
    switch ((r === V.KANJI && !Ui.isKanjiModeEnabled() && (r = V.BYTE), r)) {
      case V.NUMERIC:
        return new Zs(i);
      case V.ALPHANUMERIC:
        return new Xs(i);
      case V.KANJI:
        return new Ks(i);
      case V.BYTE:
        return new $s(i);
    }
  }
  _e.fromArray = function (t) {
    return t.reduce(function (r, e) {
      return (
        typeof e == 'string'
          ? r.push(Ys(e, null))
          : e.data && r.push(Ys(e.data, e.mode)),
        r
      );
    }, []);
  };
  _e.fromString = function (t, r) {
    let e = Js(t, Ui.isKanjiModeEnabled()),
      n = Ou(e),
      o = Lu(n, r),
      a = Su.find_path(o.map, 'start', 'end'),
      s = [];
    for (let d = 1; d < a.length - 1; d++) s.push(o.table[a[d]].node);
    return _e.fromArray(Ru(s));
  };
  _e.rawSplit = function (t) {
    return _e.fromArray(Js(t, Ui.isKanjiModeEnabled()));
  };
});
var io = f((ed) => {
  'use strict';
  var zi = Ht(),
    $n = Ri(),
    Vu = us(),
    Nu = fs(),
    Bu = ps(),
    Pu = _s(),
    to = vs(),
    eo = Un(),
    Uu = Cs(),
    ji = Ds(),
    ju = Ls(),
    zu = Qt(),
    Kn = td();
  function Hu(i, t) {
    let r = i.size,
      e = Pu.getPositions(t);
    for (let n = 0; n < e.length; n++) {
      let o = e[n][0],
        a = e[n][1];
      for (let s = -1; s <= 7; s++)
        if (!(o + s <= -1 || r <= o + s))
          for (let d = -1; d <= 7; d++)
            a + d <= -1 ||
              r <= a + d ||
              ((s >= 0 && s <= 6 && (d === 0 || d === 6)) ||
              (d >= 0 && d <= 6 && (s === 0 || s === 6)) ||
              (s >= 2 && s <= 4 && d >= 2 && d <= 4)
                ? i.set(o + s, a + d, !0, !0)
                : i.set(o + s, a + d, !1, !0));
    }
  }
  function Gu(i) {
    let t = i.size;
    for (let r = 8; r < t - 8; r++) {
      let e = r % 2 === 0;
      i.set(r, 6, e, !0), i.set(6, r, e, !0);
    }
  }
  function Qu(i, t) {
    let r = Bu.getPositions(t);
    for (let e = 0; e < r.length; e++) {
      let n = r[e][0],
        o = r[e][1];
      for (let a = -2; a <= 2; a++)
        for (let s = -2; s <= 2; s++)
          a === -2 || a === 2 || s === -2 || s === 2 || (a === 0 && s === 0)
            ? i.set(n + a, o + s, !0, !0)
            : i.set(n + a, o + s, !1, !0);
    }
  }
  function Wu(i, t) {
    let r = i.size,
      e = ji.getEncodedBits(t),
      n,
      o,
      a;
    for (let s = 0; s < 18; s++)
      (n = Math.floor(s / 3)),
        (o = (s % 3) + r - 8 - 3),
        (a = ((e >> s) & 1) === 1),
        i.set(n, o, a, !0),
        i.set(o, n, a, !0);
  }
  function Jn(i, t, r) {
    let e = i.size,
      n = ju.getEncodedBits(t, r),
      o,
      a;
    for (o = 0; o < 15; o++)
      (a = ((n >> o) & 1) === 1),
        o < 6
          ? i.set(o, 8, a, !0)
          : o < 8
          ? i.set(o + 1, 8, a, !0)
          : i.set(e - 15 + o, 8, a, !0),
        o < 8
          ? i.set(8, e - o - 1, a, !0)
          : o < 9
          ? i.set(8, 15 - o - 1 + 1, a, !0)
          : i.set(8, 15 - o - 1, a, !0);
    i.set(e - 8, 8, 1, !0);
  }
  function qu(i, t) {
    let r = i.size,
      e = -1,
      n = r - 1,
      o = 7,
      a = 0;
    for (let s = r - 1; s > 0; s -= 2)
      for (s === 6 && s--; ; ) {
        for (let d = 0; d < 2; d++)
          if (!i.isReserved(n, s - d)) {
            let c = !1;
            a < t.length && (c = ((t[a] >>> o) & 1) === 1),
              i.set(n, s - d, c),
              o--,
              o === -1 && (a++, (o = 7));
          }
        if (((n += e), n < 0 || r <= n)) {
          (n -= e), (e = -e);
          break;
        }
      }
  }
  function Yu(i, t, r) {
    let e = new Vu();
    r.forEach(function (d) {
      e.put(d.mode.bit, 4),
        e.put(d.getLength(), zu.getCharCountIndicator(d.mode, i)),
        d.write(e);
    });
    let n = zi.getSymbolTotalCodewords(i),
      o = eo.getTotalCodewordsCount(i, t),
      a = (n - o) * 8;
    for (
      e.getLengthInBits() + 4 <= a && e.put(0, 4);
      e.getLengthInBits() % 8 !== 0;

    )
      e.putBit(0);
    let s = (a - e.getLengthInBits()) / 8;
    for (let d = 0; d < s; d++) e.put(d % 2 ? 17 : 236, 8);
    return Zu(e, i, t);
  }
  function Zu(i, t, r) {
    let e = zi.getSymbolTotalCodewords(t),
      n = eo.getTotalCodewordsCount(t, r),
      o = e - n,
      a = eo.getBlocksCount(t, r),
      s = e % a,
      d = a - s,
      c = Math.floor(e / a),
      l = Math.floor(o / a),
      u = l + 1,
      h = c - l,
      b = new Uu(h),
      v = 0,
      x = new Array(a),
      _ = new Array(a),
      R = 0,
      se = new Uint8Array(i.buffer);
    for (let de = 0; de < a; de++) {
      let qi = de < d ? l : u;
      (x[de] = se.slice(v, v + qi)),
        (_[de] = b.encode(x[de])),
        (v += qi),
        (R = Math.max(R, qi));
    }
    let we = new Uint8Array(e),
      lt = 0,
      _t,
      Ft;
    for (_t = 0; _t < R; _t++)
      for (Ft = 0; Ft < a; Ft++) _t < x[Ft].length && (we[lt++] = x[Ft][_t]);
    for (_t = 0; _t < h; _t++) for (Ft = 0; Ft < a; Ft++) we[lt++] = _[Ft][_t];
    return we;
  }
  function Xu(i, t, r, e) {
    let n;
    if (Array.isArray(i)) n = Kn.fromArray(i);
    else if (typeof i == 'string') {
      let c = t;
      if (!c) {
        let l = Kn.rawSplit(i);
        c = ji.getBestVersionForData(l, r);
      }
      n = Kn.fromString(i, c || 40);
    } else throw new Error('Invalid data');
    let o = ji.getBestVersionForData(n, r);
    if (!o)
      throw new Error(
        'The amount of data is too big to be stored in a QR Code'
      );
    if (!t) t = o;
    else if (t < o)
      throw new Error(
        `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` +
          o +
          `.
`
      );
    let a = Yu(t, r, n),
      s = zi.getSymbolSize(t),
      d = new Nu(s);
    return (
      Hu(d, t),
      Gu(d),
      Qu(d, t),
      Jn(d, r, 0),
      t >= 7 && Wu(d, t),
      qu(d, a),
      isNaN(e) && (e = to.getBestMask(d, Jn.bind(null, d, r))),
      to.applyMask(e, d),
      Jn(d, r, e),
      {
        modules: d,
        version: t,
        errorCorrectionLevel: r,
        maskPattern: e,
        segments: n,
      }
    );
  }
  ed.create = function (t, r) {
    if (typeof t > 'u' || t === '') throw new Error('No input text');
    let e = $n.M,
      n,
      o;
    return (
      typeof r < 'u' &&
        ((e = $n.from(r.errorCorrectionLevel, $n.M)),
        (n = ji.from(r.version)),
        (o = to.from(r.maskPattern)),
        r.toSJISFunc && zi.setToSJISFunction(r.toSJISFunc)),
      Xu(t, n, e, o)
    );
  };
});
var no = f((p0, nd) => {
  'use strict';
  var $u = it('util'),
    id = it('stream'),
    Ct = (nd.exports = function () {
      id.call(this),
        (this._buffers = []),
        (this._buffered = 0),
        (this._reads = []),
        (this._paused = !1),
        (this._encoding = 'utf8'),
        (this.writable = !0);
    });
  $u.inherits(Ct, id);
  Ct.prototype.read = function (i, t) {
    this._reads.push({ length: Math.abs(i), allowLess: i < 0, func: t }),
      process.nextTick(
        function () {
          this._process(),
            this._paused &&
              this._reads &&
              this._reads.length > 0 &&
              ((this._paused = !1), this.emit('drain'));
        }.bind(this)
      );
  };
  Ct.prototype.write = function (i, t) {
    if (!this.writable)
      return this.emit('error', new Error('Stream not writable')), !1;
    let r;
    return (
      Buffer.isBuffer(i) ? (r = i) : (r = Buffer.from(i, t || this._encoding)),
      this._buffers.push(r),
      (this._buffered += r.length),
      this._process(),
      this._reads && this._reads.length === 0 && (this._paused = !0),
      this.writable && !this._paused
    );
  };
  Ct.prototype.end = function (i, t) {
    i && this.write(i, t),
      (this.writable = !1),
      this._buffers &&
        (this._buffers.length === 0
          ? this._end()
          : (this._buffers.push(null), this._process()));
  };
  Ct.prototype.destroySoon = Ct.prototype.end;
  Ct.prototype._end = function () {
    this._reads.length > 0 &&
      this.emit('error', new Error('Unexpected end of input')),
      this.destroy();
  };
  Ct.prototype.destroy = function () {
    this._buffers &&
      ((this.writable = !1),
      (this._reads = null),
      (this._buffers = null),
      this.emit('close'));
  };
  Ct.prototype._processReadAllowingLess = function (i) {
    this._reads.shift();
    let t = this._buffers[0];
    t.length > i.length
      ? ((this._buffered -= i.length),
        (this._buffers[0] = t.slice(i.length)),
        i.func.call(this, t.slice(0, i.length)))
      : ((this._buffered -= t.length),
        this._buffers.shift(),
        i.func.call(this, t));
  };
  Ct.prototype._processRead = function (i) {
    this._reads.shift();
    let t = 0,
      r = 0,
      e = Buffer.alloc(i.length);
    for (; t < i.length; ) {
      let n = this._buffers[r++],
        o = Math.min(n.length, i.length - t);
      n.copy(e, t, 0, o),
        (t += o),
        o !== n.length && (this._buffers[--r] = n.slice(o));
    }
    r > 0 && this._buffers.splice(0, r),
      (this._buffered -= i.length),
      i.func.call(this, e);
  };
  Ct.prototype._process = function () {
    try {
      for (; this._buffered > 0 && this._reads && this._reads.length > 0; ) {
        let i = this._reads[0];
        if (i.allowLess) this._processReadAllowingLess(i);
        else if (this._buffered >= i.length) this._processRead(i);
        else break;
      }
      this._buffers && !this.writable && this._end();
    } catch (i) {
      this.emit('error', i);
    }
  };
});
var ro = f((oo) => {
  'use strict';
  var qt = [
    { x: [0], y: [0] },
    { x: [4], y: [0] },
    { x: [0, 4], y: [4] },
    { x: [2, 6], y: [0, 4] },
    { x: [0, 2, 4, 6], y: [2, 6] },
    { x: [1, 3, 5, 7], y: [0, 2, 4, 6] },
    { x: [0, 1, 2, 3, 4, 5, 6, 7], y: [1, 3, 5, 7] },
  ];
  oo.getImagePasses = function (i, t) {
    let r = [],
      e = i % 8,
      n = t % 8,
      o = (i - e) / 8,
      a = (t - n) / 8;
    for (let s = 0; s < qt.length; s++) {
      let d = qt[s],
        c = o * d.x.length,
        l = a * d.y.length;
      for (let u = 0; u < d.x.length && d.x[u] < e; u++) c++;
      for (let u = 0; u < d.y.length && d.y[u] < n; u++) l++;
      c > 0 && l > 0 && r.push({ width: c, height: l, index: s });
    }
    return r;
  };
  oo.getInterlaceIterator = function (i) {
    return function (t, r, e) {
      let n = t % qt[e].x.length,
        o = ((t - n) / qt[e].x.length) * 8 + qt[e].x[n],
        a = r % qt[e].y.length,
        s = ((r - a) / qt[e].y.length) * 8 + qt[e].y[a];
      return o * 4 + s * i * 4;
    };
  };
});
var ao = f((g0, od) => {
  'use strict';
  od.exports = function (t, r, e) {
    let n = t + r - e,
      o = Math.abs(n - t),
      a = Math.abs(n - r),
      s = Math.abs(n - e);
    return o <= a && o <= s ? t : a <= s ? r : e;
  };
});
var so = f((_0, ad) => {
  'use strict';
  var Ku = ro(),
    Ju = ao();
  function rd(i, t, r) {
    let e = i * t;
    return r !== 8 && (e = Math.ceil(e / (8 / r))), e;
  }
  var ve = (ad.exports = function (i, t) {
    let r = i.width,
      e = i.height,
      n = i.interlace,
      o = i.bpp,
      a = i.depth;
    if (
      ((this.read = t.read),
      (this.write = t.write),
      (this.complete = t.complete),
      (this._imageIndex = 0),
      (this._images = []),
      n)
    ) {
      let s = Ku.getImagePasses(r, e);
      for (let d = 0; d < s.length; d++)
        this._images.push({
          byteWidth: rd(s[d].width, o, a),
          height: s[d].height,
          lineIndex: 0,
        });
    } else
      this._images.push({ byteWidth: rd(r, o, a), height: e, lineIndex: 0 });
    a === 8
      ? (this._xComparison = o)
      : a === 16
      ? (this._xComparison = o * 2)
      : (this._xComparison = 1);
  });
  ve.prototype.start = function () {
    this.read(
      this._images[this._imageIndex].byteWidth + 1,
      this._reverseFilterLine.bind(this)
    );
  };
  ve.prototype._unFilterType1 = function (i, t, r) {
    let e = this._xComparison,
      n = e - 1;
    for (let o = 0; o < r; o++) {
      let a = i[1 + o],
        s = o > n ? t[o - e] : 0;
      t[o] = a + s;
    }
  };
  ve.prototype._unFilterType2 = function (i, t, r) {
    let e = this._lastLine;
    for (let n = 0; n < r; n++) {
      let o = i[1 + n],
        a = e ? e[n] : 0;
      t[n] = o + a;
    }
  };
  ve.prototype._unFilterType3 = function (i, t, r) {
    let e = this._xComparison,
      n = e - 1,
      o = this._lastLine;
    for (let a = 0; a < r; a++) {
      let s = i[1 + a],
        d = o ? o[a] : 0,
        c = a > n ? t[a - e] : 0,
        l = Math.floor((c + d) / 2);
      t[a] = s + l;
    }
  };
  ve.prototype._unFilterType4 = function (i, t, r) {
    let e = this._xComparison,
      n = e - 1,
      o = this._lastLine;
    for (let a = 0; a < r; a++) {
      let s = i[1 + a],
        d = o ? o[a] : 0,
        c = a > n ? t[a - e] : 0,
        l = a > n && o ? o[a - e] : 0,
        u = Ju(c, d, l);
      t[a] = s + u;
    }
  };
  ve.prototype._reverseFilterLine = function (i) {
    let t = i[0],
      r,
      e = this._images[this._imageIndex],
      n = e.byteWidth;
    if (t === 0) r = i.slice(1, n + 1);
    else
      switch (((r = Buffer.alloc(n)), t)) {
        case 1:
          this._unFilterType1(i, r, n);
          break;
        case 2:
          this._unFilterType2(i, r, n);
          break;
        case 3:
          this._unFilterType3(i, r, n);
          break;
        case 4:
          this._unFilterType4(i, r, n);
          break;
        default:
          throw new Error('Unrecognised filter type - ' + t);
      }
    this.write(r),
      e.lineIndex++,
      e.lineIndex >= e.height
        ? ((this._lastLine = null),
          this._imageIndex++,
          (e = this._images[this._imageIndex]))
        : (this._lastLine = r),
      e
        ? this.read(e.byteWidth + 1, this._reverseFilterLine.bind(this))
        : ((this._lastLine = null), this.complete());
  };
});
var cd = f((v0, dd) => {
  'use strict';
  var th = it('util'),
    sd = no(),
    eh = so(),
    ih = (dd.exports = function (i) {
      sd.call(this);
      let t = [],
        r = this;
      (this._filter = new eh(i, {
        read: this.read.bind(this),
        write: function (e) {
          t.push(e);
        },
        complete: function () {
          r.emit('complete', Buffer.concat(t));
        },
      })),
        this._filter.start();
    });
  th.inherits(ih, sd);
});
var xe = f((x0, ld) => {
  'use strict';
  ld.exports = {
    PNG_SIGNATURE: [137, 80, 78, 71, 13, 10, 26, 10],
    TYPE_IHDR: 1229472850,
    TYPE_IEND: 1229278788,
    TYPE_IDAT: 1229209940,
    TYPE_PLTE: 1347179589,
    TYPE_tRNS: 1951551059,
    TYPE_gAMA: 1732332865,
    COLORTYPE_GRAYSCALE: 0,
    COLORTYPE_PALETTE: 1,
    COLORTYPE_COLOR: 2,
    COLORTYPE_ALPHA: 4,
    COLORTYPE_PALETTE_COLOR: 3,
    COLORTYPE_COLOR_ALPHA: 6,
    COLORTYPE_TO_BPP_MAP: { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 },
    GAMMA_DIVISION: 1e5,
  };
});
var mo = f((y0, md) => {
  'use strict';
  var co = [];
  (function () {
    for (let i = 0; i < 256; i++) {
      let t = i;
      for (let r = 0; r < 8; r++)
        t & 1 ? (t = 3988292384 ^ (t >>> 1)) : (t = t >>> 1);
      co[i] = t;
    }
  })();
  var lo = (md.exports = function () {
    this._crc = -1;
  });
  lo.prototype.write = function (i) {
    for (let t = 0; t < i.length; t++)
      this._crc = co[(this._crc ^ i[t]) & 255] ^ (this._crc >>> 8);
    return !0;
  };
  lo.prototype.crc32 = function () {
    return this._crc ^ -1;
  };
  lo.crc32 = function (i) {
    let t = -1;
    for (let r = 0; r < i.length; r++) t = co[(t ^ i[r]) & 255] ^ (t >>> 8);
    return t ^ -1;
  };
});
var uo = f((k0, ud) => {
  'use strict';
  var rt = xe(),
    nh = mo(),
    st = (ud.exports = function (i, t) {
      (this._options = i),
        (i.checkCRC = i.checkCRC !== !1),
        (this._hasIHDR = !1),
        (this._hasIEND = !1),
        (this._emittedHeadersFinished = !1),
        (this._palette = []),
        (this._colorType = 0),
        (this._chunks = {}),
        (this._chunks[rt.TYPE_IHDR] = this._handleIHDR.bind(this)),
        (this._chunks[rt.TYPE_IEND] = this._handleIEND.bind(this)),
        (this._chunks[rt.TYPE_IDAT] = this._handleIDAT.bind(this)),
        (this._chunks[rt.TYPE_PLTE] = this._handlePLTE.bind(this)),
        (this._chunks[rt.TYPE_tRNS] = this._handleTRNS.bind(this)),
        (this._chunks[rt.TYPE_gAMA] = this._handleGAMA.bind(this)),
        (this.read = t.read),
        (this.error = t.error),
        (this.metadata = t.metadata),
        (this.gamma = t.gamma),
        (this.transColor = t.transColor),
        (this.palette = t.palette),
        (this.parsed = t.parsed),
        (this.inflateData = t.inflateData),
        (this.finished = t.finished),
        (this.simpleTransparency = t.simpleTransparency),
        (this.headersFinished = t.headersFinished || function () {});
    });
  st.prototype.start = function () {
    this.read(rt.PNG_SIGNATURE.length, this._parseSignature.bind(this));
  };
  st.prototype._parseSignature = function (i) {
    let t = rt.PNG_SIGNATURE;
    for (let r = 0; r < t.length; r++)
      if (i[r] !== t[r]) {
        this.error(new Error('Invalid file signature'));
        return;
      }
    this.read(8, this._parseChunkBegin.bind(this));
  };
  st.prototype._parseChunkBegin = function (i) {
    let t = i.readUInt32BE(0),
      r = i.readUInt32BE(4),
      e = '';
    for (let o = 4; o < 8; o++) e += String.fromCharCode(i[o]);
    let n = !!(i[4] & 32);
    if (!this._hasIHDR && r !== rt.TYPE_IHDR) {
      this.error(new Error('Expected IHDR on beggining'));
      return;
    }
    if (
      ((this._crc = new nh()), this._crc.write(Buffer.from(e)), this._chunks[r])
    )
      return this._chunks[r](t);
    if (!n) {
      this.error(new Error('Unsupported critical chunk type ' + e));
      return;
    }
    this.read(t + 4, this._skipChunk.bind(this));
  };
  st.prototype._skipChunk = function () {
    this.read(8, this._parseChunkBegin.bind(this));
  };
  st.prototype._handleChunkEnd = function () {
    this.read(4, this._parseChunkEnd.bind(this));
  };
  st.prototype._parseChunkEnd = function (i) {
    let t = i.readInt32BE(0),
      r = this._crc.crc32();
    if (this._options.checkCRC && r !== t) {
      this.error(new Error('Crc error - ' + t + ' - ' + r));
      return;
    }
    this._hasIEND || this.read(8, this._parseChunkBegin.bind(this));
  };
  st.prototype._handleIHDR = function (i) {
    this.read(i, this._parseIHDR.bind(this));
  };
  st.prototype._parseIHDR = function (i) {
    this._crc.write(i);
    let t = i.readUInt32BE(0),
      r = i.readUInt32BE(4),
      e = i[8],
      n = i[9],
      o = i[10],
      a = i[11],
      s = i[12];
    if (e !== 8 && e !== 4 && e !== 2 && e !== 1 && e !== 16) {
      this.error(new Error('Unsupported bit depth ' + e));
      return;
    }
    if (!(n in rt.COLORTYPE_TO_BPP_MAP)) {
      this.error(new Error('Unsupported color type'));
      return;
    }
    if (o !== 0) {
      this.error(new Error('Unsupported compression method'));
      return;
    }
    if (a !== 0) {
      this.error(new Error('Unsupported filter method'));
      return;
    }
    if (s !== 0 && s !== 1) {
      this.error(new Error('Unsupported interlace method'));
      return;
    }
    this._colorType = n;
    let d = rt.COLORTYPE_TO_BPP_MAP[this._colorType];
    (this._hasIHDR = !0),
      this.metadata({
        width: t,
        height: r,
        depth: e,
        interlace: !!s,
        palette: !!(n & rt.COLORTYPE_PALETTE),
        color: !!(n & rt.COLORTYPE_COLOR),
        alpha: !!(n & rt.COLORTYPE_ALPHA),
        bpp: d,
        colorType: n,
      }),
      this._handleChunkEnd();
  };
  st.prototype._handlePLTE = function (i) {
    this.read(i, this._parsePLTE.bind(this));
  };
  st.prototype._parsePLTE = function (i) {
    this._crc.write(i);
    let t = Math.floor(i.length / 3);
    for (let r = 0; r < t; r++)
      this._palette.push([i[r * 3], i[r * 3 + 1], i[r * 3 + 2], 255]);
    this.palette(this._palette), this._handleChunkEnd();
  };
  st.prototype._handleTRNS = function (i) {
    this.simpleTransparency(), this.read(i, this._parseTRNS.bind(this));
  };
  st.prototype._parseTRNS = function (i) {
    if ((this._crc.write(i), this._colorType === rt.COLORTYPE_PALETTE_COLOR)) {
      if (this._palette.length === 0) {
        this.error(new Error('Transparency chunk must be after palette'));
        return;
      }
      if (i.length > this._palette.length) {
        this.error(new Error('More transparent colors than palette size'));
        return;
      }
      for (let t = 0; t < i.length; t++) this._palette[t][3] = i[t];
      this.palette(this._palette);
    }
    this._colorType === rt.COLORTYPE_GRAYSCALE &&
      this.transColor([i.readUInt16BE(0)]),
      this._colorType === rt.COLORTYPE_COLOR &&
        this.transColor([
          i.readUInt16BE(0),
          i.readUInt16BE(2),
          i.readUInt16BE(4),
        ]),
      this._handleChunkEnd();
  };
  st.prototype._handleGAMA = function (i) {
    this.read(i, this._parseGAMA.bind(this));
  };
  st.prototype._parseGAMA = function (i) {
    this._crc.write(i),
      this.gamma(i.readUInt32BE(0) / rt.GAMMA_DIVISION),
      this._handleChunkEnd();
  };
  st.prototype._handleIDAT = function (i) {
    this._emittedHeadersFinished ||
      ((this._emittedHeadersFinished = !0), this.headersFinished()),
      this.read(-i, this._parseIDAT.bind(this, i));
  };
  st.prototype._parseIDAT = function (i, t) {
    if (
      (this._crc.write(t),
      this._colorType === rt.COLORTYPE_PALETTE_COLOR &&
        this._palette.length === 0)
    )
      throw new Error('Expected palette not found');
    this.inflateData(t);
    let r = i - t.length;
    r > 0 ? this._handleIDAT(r) : this._handleChunkEnd();
  };
  st.prototype._handleIEND = function (i) {
    this.read(i, this._parseIEND.bind(this));
  };
  st.prototype._parseIEND = function (i) {
    this._crc.write(i),
      (this._hasIEND = !0),
      this._handleChunkEnd(),
      this.finished && this.finished();
  };
});
var ho = f((fd) => {
  'use strict';
  var hd = ro(),
    oh = [
      function () {},
      function (i, t, r, e) {
        if (e === t.length) throw new Error('Ran out of data');
        let n = t[e];
        (i[r] = n), (i[r + 1] = n), (i[r + 2] = n), (i[r + 3] = 255);
      },
      function (i, t, r, e) {
        if (e + 1 >= t.length) throw new Error('Ran out of data');
        let n = t[e];
        (i[r] = n), (i[r + 1] = n), (i[r + 2] = n), (i[r + 3] = t[e + 1]);
      },
      function (i, t, r, e) {
        if (e + 2 >= t.length) throw new Error('Ran out of data');
        (i[r] = t[e]),
          (i[r + 1] = t[e + 1]),
          (i[r + 2] = t[e + 2]),
          (i[r + 3] = 255);
      },
      function (i, t, r, e) {
        if (e + 3 >= t.length) throw new Error('Ran out of data');
        (i[r] = t[e]),
          (i[r + 1] = t[e + 1]),
          (i[r + 2] = t[e + 2]),
          (i[r + 3] = t[e + 3]);
      },
    ],
    rh = [
      function () {},
      function (i, t, r, e) {
        let n = t[0];
        (i[r] = n), (i[r + 1] = n), (i[r + 2] = n), (i[r + 3] = e);
      },
      function (i, t, r) {
        let e = t[0];
        (i[r] = e), (i[r + 1] = e), (i[r + 2] = e), (i[r + 3] = t[1]);
      },
      function (i, t, r, e) {
        (i[r] = t[0]), (i[r + 1] = t[1]), (i[r + 2] = t[2]), (i[r + 3] = e);
      },
      function (i, t, r) {
        (i[r] = t[0]), (i[r + 1] = t[1]), (i[r + 2] = t[2]), (i[r + 3] = t[3]);
      },
    ];
  function ah(i, t) {
    let r = [],
      e = 0;
    function n() {
      if (e === i.length) throw new Error('Ran out of data');
      let o = i[e];
      e++;
      let a, s, d, c, l, u, h, b;
      switch (t) {
        default:
          throw new Error('unrecognised depth');
        case 16:
          (h = i[e]), e++, r.push((o << 8) + h);
          break;
        case 4:
          (h = o & 15), (b = o >> 4), r.push(b, h);
          break;
        case 2:
          (l = o & 3),
            (u = (o >> 2) & 3),
            (h = (o >> 4) & 3),
            (b = (o >> 6) & 3),
            r.push(b, h, u, l);
          break;
        case 1:
          (a = o & 1),
            (s = (o >> 1) & 1),
            (d = (o >> 2) & 1),
            (c = (o >> 3) & 1),
            (l = (o >> 4) & 1),
            (u = (o >> 5) & 1),
            (h = (o >> 6) & 1),
            (b = (o >> 7) & 1),
            r.push(b, h, u, l, c, d, s, a);
          break;
      }
    }
    return {
      get: function (o) {
        for (; r.length < o; ) n();
        let a = r.slice(0, o);
        return (r = r.slice(o)), a;
      },
      resetAfterLine: function () {
        r.length = 0;
      },
      end: function () {
        if (e !== i.length) throw new Error('extra data found');
      },
    };
  }
  function sh(i, t, r, e, n, o) {
    let a = i.width,
      s = i.height,
      d = i.index;
    for (let c = 0; c < s; c++)
      for (let l = 0; l < a; l++) {
        let u = r(l, c, d);
        oh[e](t, n, u, o), (o += e);
      }
    return o;
  }
  function dh(i, t, r, e, n, o) {
    let a = i.width,
      s = i.height,
      d = i.index;
    for (let c = 0; c < s; c++) {
      for (let l = 0; l < a; l++) {
        let u = n.get(e),
          h = r(l, c, d);
        rh[e](t, u, h, o);
      }
      n.resetAfterLine();
    }
  }
  fd.dataToBitMap = function (i, t) {
    let r = t.width,
      e = t.height,
      n = t.depth,
      o = t.bpp,
      a = t.interlace,
      s;
    n !== 8 && (s = ah(i, n));
    let d;
    n <= 8 ? (d = Buffer.alloc(r * e * 4)) : (d = new Uint16Array(r * e * 4));
    let c = Math.pow(2, n) - 1,
      l = 0,
      u,
      h;
    if (a) (u = hd.getImagePasses(r, e)), (h = hd.getInterlaceIterator(r, e));
    else {
      let b = 0;
      (h = function () {
        let v = b;
        return (b += 4), v;
      }),
        (u = [{ width: r, height: e }]);
    }
    for (let b = 0; b < u.length; b++)
      n === 8 ? (l = sh(u[b], d, h, o, i, l)) : dh(u[b], d, h, o, s, c);
    if (n === 8) {
      if (l !== i.length) throw new Error('extra data found');
    } else s.end();
    return d;
  };
});
var fo = f((C0, pd) => {
  'use strict';
  function ch(i, t, r, e, n) {
    let o = 0;
    for (let a = 0; a < e; a++)
      for (let s = 0; s < r; s++) {
        let d = n[i[o]];
        if (!d) throw new Error('index ' + i[o] + ' not in palette');
        for (let c = 0; c < 4; c++) t[o + c] = d[c];
        o += 4;
      }
  }
  function lh(i, t, r, e, n) {
    let o = 0;
    for (let a = 0; a < e; a++)
      for (let s = 0; s < r; s++) {
        let d = !1;
        if (
          (n.length === 1
            ? n[0] === i[o] && (d = !0)
            : n[0] === i[o] &&
              n[1] === i[o + 1] &&
              n[2] === i[o + 2] &&
              (d = !0),
          d)
        )
          for (let c = 0; c < 4; c++) t[o + c] = 0;
        o += 4;
      }
  }
  function mh(i, t, r, e, n) {
    let o = 255,
      a = Math.pow(2, n) - 1,
      s = 0;
    for (let d = 0; d < e; d++)
      for (let c = 0; c < r; c++) {
        for (let l = 0; l < 4; l++)
          t[s + l] = Math.floor((i[s + l] * o) / a + 0.5);
        s += 4;
      }
  }
  pd.exports = function (i, t) {
    let r = t.depth,
      e = t.width,
      n = t.height,
      o = t.colorType,
      a = t.transColor,
      s = t.palette,
      d = i;
    return (
      o === 3
        ? ch(i, d, e, n, s)
        : (a && lh(i, d, e, n, a),
          r !== 8 &&
            (r === 16 && (d = Buffer.alloc(e * n * 4)), mh(i, d, e, n, r))),
      d
    );
  };
});
var _d = f((E0, gd) => {
  'use strict';
  var uh = it('util'),
    po = it('zlib'),
    bd = no(),
    hh = cd(),
    fh = uo(),
    ph = ho(),
    bh = fo(),
    Tt = (gd.exports = function (i) {
      bd.call(this),
        (this._parser = new fh(i, {
          read: this.read.bind(this),
          error: this._handleError.bind(this),
          metadata: this._handleMetaData.bind(this),
          gamma: this.emit.bind(this, 'gamma'),
          palette: this._handlePalette.bind(this),
          transColor: this._handleTransColor.bind(this),
          finished: this._finished.bind(this),
          inflateData: this._inflateData.bind(this),
          simpleTransparency: this._simpleTransparency.bind(this),
          headersFinished: this._headersFinished.bind(this),
        })),
        (this._options = i),
        (this.writable = !0),
        this._parser.start();
    });
  uh.inherits(Tt, bd);
  Tt.prototype._handleError = function (i) {
    this.emit('error', i),
      (this.writable = !1),
      this.destroy(),
      this._inflate && this._inflate.destroy && this._inflate.destroy(),
      this._filter &&
        (this._filter.destroy(), this._filter.on('error', function () {})),
      (this.errord = !0);
  };
  Tt.prototype._inflateData = function (i) {
    if (!this._inflate)
      if (this._bitmapInfo.interlace)
        (this._inflate = po.createInflate()),
          this._inflate.on('error', this.emit.bind(this, 'error')),
          this._filter.on('complete', this._complete.bind(this)),
          this._inflate.pipe(this._filter);
      else {
        let r =
            (((this._bitmapInfo.width *
              this._bitmapInfo.bpp *
              this._bitmapInfo.depth +
              7) >>
              3) +
              1) *
            this._bitmapInfo.height,
          e = Math.max(r, po.Z_MIN_CHUNK);
        this._inflate = po.createInflate({ chunkSize: e });
        let n = r,
          o = this.emit.bind(this, 'error');
        this._inflate.on('error', function (s) {
          n && o(s);
        }),
          this._filter.on('complete', this._complete.bind(this));
        let a = this._filter.write.bind(this._filter);
        this._inflate.on('data', function (s) {
          n && (s.length > n && (s = s.slice(0, n)), (n -= s.length), a(s));
        }),
          this._inflate.on('end', this._filter.end.bind(this._filter));
      }
    this._inflate.write(i);
  };
  Tt.prototype._handleMetaData = function (i) {
    (this._metaData = i),
      (this._bitmapInfo = Object.create(i)),
      (this._filter = new hh(this._bitmapInfo));
  };
  Tt.prototype._handleTransColor = function (i) {
    this._bitmapInfo.transColor = i;
  };
  Tt.prototype._handlePalette = function (i) {
    this._bitmapInfo.palette = i;
  };
  Tt.prototype._simpleTransparency = function () {
    this._metaData.alpha = !0;
  };
  Tt.prototype._headersFinished = function () {
    this.emit('metadata', this._metaData);
  };
  Tt.prototype._finished = function () {
    this.errord ||
      (this._inflate
        ? this._inflate.end()
        : this.emit('error', 'No Inflate block'));
  };
  Tt.prototype._complete = function (i) {
    if (this.errord) return;
    let t;
    try {
      let r = ph.dataToBitMap(i, this._bitmapInfo);
      (t = bh(r, this._bitmapInfo)), (r = null);
    } catch (r) {
      this._handleError(r);
      return;
    }
    this.emit('parsed', t);
  };
});
var xd = f((I0, vd) => {
  'use strict';
  var kt = xe();
  vd.exports = function (i, t, r, e) {
    let n =
      [kt.COLORTYPE_COLOR_ALPHA, kt.COLORTYPE_ALPHA].indexOf(e.colorType) !==
      -1;
    if (e.colorType === e.inputColorType) {
      let v = (function () {
        let x = new ArrayBuffer(2);
        return (
          new DataView(x).setInt16(0, 256, !0), new Int16Array(x)[0] !== 256
        );
      })();
      if (e.bitDepth === 8 || (e.bitDepth === 16 && v)) return i;
    }
    let o = e.bitDepth !== 16 ? i : new Uint16Array(i.buffer),
      a = 255,
      s = kt.COLORTYPE_TO_BPP_MAP[e.inputColorType];
    s === 4 && !e.inputHasAlpha && (s = 3);
    let d = kt.COLORTYPE_TO_BPP_MAP[e.colorType];
    e.bitDepth === 16 && ((a = 65535), (d *= 2));
    let c = Buffer.alloc(t * r * d),
      l = 0,
      u = 0,
      h = e.bgColor || {};
    h.red === void 0 && (h.red = a),
      h.green === void 0 && (h.green = a),
      h.blue === void 0 && (h.blue = a);
    function b() {
      let v,
        x,
        _,
        R = a;
      switch (e.inputColorType) {
        case kt.COLORTYPE_COLOR_ALPHA:
          (R = o[l + 3]), (v = o[l]), (x = o[l + 1]), (_ = o[l + 2]);
          break;
        case kt.COLORTYPE_COLOR:
          (v = o[l]), (x = o[l + 1]), (_ = o[l + 2]);
          break;
        case kt.COLORTYPE_ALPHA:
          (R = o[l + 1]), (v = o[l]), (x = v), (_ = v);
          break;
        case kt.COLORTYPE_GRAYSCALE:
          (v = o[l]), (x = v), (_ = v);
          break;
        default:
          throw new Error(
            'input color type:' +
              e.inputColorType +
              ' is not supported at present'
          );
      }
      return (
        e.inputHasAlpha &&
          (n ||
            ((R /= a),
            (v = Math.min(Math.max(Math.round((1 - R) * h.red + R * v), 0), a)),
            (x = Math.min(
              Math.max(Math.round((1 - R) * h.green + R * x), 0),
              a
            )),
            (_ = Math.min(
              Math.max(Math.round((1 - R) * h.blue + R * _), 0),
              a
            )))),
        { red: v, green: x, blue: _, alpha: R }
      );
    }
    for (let v = 0; v < r; v++)
      for (let x = 0; x < t; x++) {
        let _ = b(o, l);
        switch (e.colorType) {
          case kt.COLORTYPE_COLOR_ALPHA:
          case kt.COLORTYPE_COLOR:
            e.bitDepth === 8
              ? ((c[u] = _.red),
                (c[u + 1] = _.green),
                (c[u + 2] = _.blue),
                n && (c[u + 3] = _.alpha))
              : (c.writeUInt16BE(_.red, u),
                c.writeUInt16BE(_.green, u + 2),
                c.writeUInt16BE(_.blue, u + 4),
                n && c.writeUInt16BE(_.alpha, u + 6));
            break;
          case kt.COLORTYPE_ALPHA:
          case kt.COLORTYPE_GRAYSCALE: {
            let R = (_.red + _.green + _.blue) / 3;
            e.bitDepth === 8
              ? ((c[u] = R), n && (c[u + 1] = _.alpha))
              : (c.writeUInt16BE(R, u), n && c.writeUInt16BE(_.alpha, u + 2));
            break;
          }
          default:
            throw new Error('unrecognised color Type ' + e.colorType);
        }
        (l += s), (u += d);
      }
    return c;
  };
});
var wd = f((M0, kd) => {
  'use strict';
  var yd = ao();
  function gh(i, t, r, e, n) {
    for (let o = 0; o < r; o++) e[n + o] = i[t + o];
  }
  function _h(i, t, r) {
    let e = 0,
      n = t + r;
    for (let o = t; o < n; o++) e += Math.abs(i[o]);
    return e;
  }
  function vh(i, t, r, e, n, o) {
    for (let a = 0; a < r; a++) {
      let s = a >= o ? i[t + a - o] : 0,
        d = i[t + a] - s;
      e[n + a] = d;
    }
  }
  function xh(i, t, r, e) {
    let n = 0;
    for (let o = 0; o < r; o++) {
      let a = o >= e ? i[t + o - e] : 0,
        s = i[t + o] - a;
      n += Math.abs(s);
    }
    return n;
  }
  function yh(i, t, r, e, n) {
    for (let o = 0; o < r; o++) {
      let a = t > 0 ? i[t + o - r] : 0,
        s = i[t + o] - a;
      e[n + o] = s;
    }
  }
  function kh(i, t, r) {
    let e = 0,
      n = t + r;
    for (let o = t; o < n; o++) {
      let a = t > 0 ? i[o - r] : 0,
        s = i[o] - a;
      e += Math.abs(s);
    }
    return e;
  }
  function wh(i, t, r, e, n, o) {
    for (let a = 0; a < r; a++) {
      let s = a >= o ? i[t + a - o] : 0,
        d = t > 0 ? i[t + a - r] : 0,
        c = i[t + a] - ((s + d) >> 1);
      e[n + a] = c;
    }
  }
  function Ch(i, t, r, e) {
    let n = 0;
    for (let o = 0; o < r; o++) {
      let a = o >= e ? i[t + o - e] : 0,
        s = t > 0 ? i[t + o - r] : 0,
        d = i[t + o] - ((a + s) >> 1);
      n += Math.abs(d);
    }
    return n;
  }
  function Eh(i, t, r, e, n, o) {
    for (let a = 0; a < r; a++) {
      let s = a >= o ? i[t + a - o] : 0,
        d = t > 0 ? i[t + a - r] : 0,
        c = t > 0 && a >= o ? i[t + a - (r + o)] : 0,
        l = i[t + a] - yd(s, d, c);
      e[n + a] = l;
    }
  }
  function Ih(i, t, r, e) {
    let n = 0;
    for (let o = 0; o < r; o++) {
      let a = o >= e ? i[t + o - e] : 0,
        s = t > 0 ? i[t + o - r] : 0,
        d = t > 0 && o >= e ? i[t + o - (r + e)] : 0,
        c = i[t + o] - yd(a, s, d);
      n += Math.abs(c);
    }
    return n;
  }
  var Mh = { 0: gh, 1: vh, 2: yh, 3: wh, 4: Eh },
    Th = { 0: _h, 1: xh, 2: kh, 3: Ch, 4: Ih };
  kd.exports = function (i, t, r, e, n) {
    let o;
    if (!('filterType' in e) || e.filterType === -1) o = [0, 1, 2, 3, 4];
    else if (typeof e.filterType == 'number') o = [e.filterType];
    else throw new Error('unrecognised filter types');
    e.bitDepth === 16 && (n *= 2);
    let a = t * n,
      s = 0,
      d = 0,
      c = Buffer.alloc((a + 1) * r),
      l = o[0];
    for (let u = 0; u < r; u++) {
      if (o.length > 1) {
        let h = 1 / 0;
        for (let b = 0; b < o.length; b++) {
          let v = Th[o[b]](i, d, a, n);
          v < h && ((l = o[b]), (h = v));
        }
      }
      (c[s] = l), s++, Mh[l](i, d, a, c, s, n), (s += a), (d += a);
    }
    return c;
  };
});
var bo = f((T0, Cd) => {
  'use strict';
  var ct = xe(),
    Ah = mo(),
    Fh = xd(),
    Dh = wd(),
    Sh = it('zlib'),
    Yt = (Cd.exports = function (i) {
      if (
        ((this._options = i),
        (i.deflateChunkSize = i.deflateChunkSize || 32 * 1024),
        (i.deflateLevel = i.deflateLevel != null ? i.deflateLevel : 9),
        (i.deflateStrategy = i.deflateStrategy != null ? i.deflateStrategy : 3),
        (i.inputHasAlpha = i.inputHasAlpha != null ? i.inputHasAlpha : !0),
        (i.deflateFactory = i.deflateFactory || Sh.createDeflate),
        (i.bitDepth = i.bitDepth || 8),
        (i.colorType =
          typeof i.colorType == 'number'
            ? i.colorType
            : ct.COLORTYPE_COLOR_ALPHA),
        (i.inputColorType =
          typeof i.inputColorType == 'number'
            ? i.inputColorType
            : ct.COLORTYPE_COLOR_ALPHA),
        [
          ct.COLORTYPE_GRAYSCALE,
          ct.COLORTYPE_COLOR,
          ct.COLORTYPE_COLOR_ALPHA,
          ct.COLORTYPE_ALPHA,
        ].indexOf(i.colorType) === -1)
      )
        throw new Error(
          'option color type:' + i.colorType + ' is not supported at present'
        );
      if (
        [
          ct.COLORTYPE_GRAYSCALE,
          ct.COLORTYPE_COLOR,
          ct.COLORTYPE_COLOR_ALPHA,
          ct.COLORTYPE_ALPHA,
        ].indexOf(i.inputColorType) === -1
      )
        throw new Error(
          'option input color type:' +
            i.inputColorType +
            ' is not supported at present'
        );
      if (i.bitDepth !== 8 && i.bitDepth !== 16)
        throw new Error(
          'option bit depth:' + i.bitDepth + ' is not supported at present'
        );
    });
  Yt.prototype.getDeflateOptions = function () {
    return {
      chunkSize: this._options.deflateChunkSize,
      level: this._options.deflateLevel,
      strategy: this._options.deflateStrategy,
    };
  };
  Yt.prototype.createDeflate = function () {
    return this._options.deflateFactory(this.getDeflateOptions());
  };
  Yt.prototype.filterData = function (i, t, r) {
    let e = Fh(i, t, r, this._options),
      n = ct.COLORTYPE_TO_BPP_MAP[this._options.colorType];
    return Dh(e, t, r, this._options, n);
  };
  Yt.prototype._packChunk = function (i, t) {
    let r = t ? t.length : 0,
      e = Buffer.alloc(r + 12);
    return (
      e.writeUInt32BE(r, 0),
      e.writeUInt32BE(i, 4),
      t && t.copy(e, 8),
      e.writeInt32BE(Ah.crc32(e.slice(4, e.length - 4)), e.length - 4),
      e
    );
  };
  Yt.prototype.packGAMA = function (i) {
    let t = Buffer.alloc(4);
    return (
      t.writeUInt32BE(Math.floor(i * ct.GAMMA_DIVISION), 0),
      this._packChunk(ct.TYPE_gAMA, t)
    );
  };
  Yt.prototype.packIHDR = function (i, t) {
    let r = Buffer.alloc(13);
    return (
      r.writeUInt32BE(i, 0),
      r.writeUInt32BE(t, 4),
      (r[8] = this._options.bitDepth),
      (r[9] = this._options.colorType),
      (r[10] = 0),
      (r[11] = 0),
      (r[12] = 0),
      this._packChunk(ct.TYPE_IHDR, r)
    );
  };
  Yt.prototype.packIDAT = function (i) {
    return this._packChunk(ct.TYPE_IDAT, i);
  };
  Yt.prototype.packIEND = function () {
    return this._packChunk(ct.TYPE_IEND, null);
  };
});
var Td = f((A0, Md) => {
  'use strict';
  var Rh = it('util'),
    Ed = it('stream'),
    Oh = xe(),
    Lh = bo(),
    Id = (Md.exports = function (i) {
      Ed.call(this);
      let t = i || {};
      (this._packer = new Lh(t)),
        (this._deflate = this._packer.createDeflate()),
        (this.readable = !0);
    });
  Rh.inherits(Id, Ed);
  Id.prototype.pack = function (i, t, r, e) {
    this.emit('data', Buffer.from(Oh.PNG_SIGNATURE)),
      this.emit('data', this._packer.packIHDR(t, r)),
      e && this.emit('data', this._packer.packGAMA(e));
    let n = this._packer.filterData(i, t, r);
    this._deflate.on('error', this.emit.bind(this, 'error')),
      this._deflate.on(
        'data',
        function (o) {
          this.emit('data', this._packer.packIDAT(o));
        }.bind(this)
      ),
      this._deflate.on(
        'end',
        function () {
          this.emit('data', this._packer.packIEND()), this.emit('end');
        }.bind(this)
      ),
      this._deflate.end(n);
  };
});
var Od = f((We, Rd) => {
  'use strict';
  var Ad = it('assert').ok,
    ye = it('zlib'),
    Vh = it('util'),
    Fd = it('buffer').kMaxLength;
  function oe(i) {
    if (!(this instanceof oe)) return new oe(i);
    i && i.chunkSize < ye.Z_MIN_CHUNK && (i.chunkSize = ye.Z_MIN_CHUNK),
      ye.Inflate.call(this, i),
      (this._offset = this._offset === void 0 ? this._outOffset : this._offset),
      (this._buffer = this._buffer || this._outBuffer),
      i && i.maxLength != null && (this._maxLength = i.maxLength);
  }
  function Nh(i) {
    return new oe(i);
  }
  function Dd(i, t) {
    t && process.nextTick(t),
      i._handle && (i._handle.close(), (i._handle = null));
  }
  oe.prototype._processChunk = function (i, t, r) {
    if (typeof r == 'function')
      return ye.Inflate._processChunk.call(this, i, t, r);
    let e = this,
      n = i && i.length,
      o = this._chunkSize - this._offset,
      a = this._maxLength,
      s = 0,
      d = [],
      c = 0,
      l;
    this.on('error', function (v) {
      l = v;
    });
    function u(v, x) {
      if (e._hadError) return;
      let _ = o - x;
      if ((Ad(_ >= 0, 'have should not go down'), _ > 0)) {
        let R = e._buffer.slice(e._offset, e._offset + _);
        if (
          ((e._offset += _),
          R.length > a && (R = R.slice(0, a)),
          d.push(R),
          (c += R.length),
          (a -= R.length),
          a === 0)
        )
          return !1;
      }
      return (
        (x === 0 || e._offset >= e._chunkSize) &&
          ((o = e._chunkSize),
          (e._offset = 0),
          (e._buffer = Buffer.allocUnsafe(e._chunkSize))),
        x === 0 ? ((s += n - v), (n = v), !0) : !1
      );
    }
    Ad(this._handle, 'zlib binding closed');
    let h;
    do
      (h = this._handle.writeSync(t, i, s, n, this._buffer, this._offset, o)),
        (h = h || this._writeState);
    while (!this._hadError && u(h[0], h[1]));
    if (this._hadError) throw l;
    if (c >= Fd)
      throw (
        (Dd(this),
        new RangeError(
          'Cannot create final Buffer. It would be larger than 0x' +
            Fd.toString(16) +
            ' bytes'
        ))
      );
    let b = Buffer.concat(d, c);
    return Dd(this), b;
  };
  Vh.inherits(oe, ye.Inflate);
  function Bh(i, t) {
    if ((typeof t == 'string' && (t = Buffer.from(t)), !(t instanceof Buffer)))
      throw new TypeError('Not a string or buffer');
    let r = i._finishFlushFlag;
    return r == null && (r = ye.Z_FINISH), i._processChunk(t, r);
  }
  function Sd(i, t) {
    return Bh(new oe(t), i);
  }
  Rd.exports = We = Sd;
  We.Inflate = oe;
  We.createInflate = Nh;
  We.inflateSync = Sd;
});
var go = f((F0, Vd) => {
  'use strict';
  var Ld = (Vd.exports = function (i) {
    (this._buffer = i), (this._reads = []);
  });
  Ld.prototype.read = function (i, t) {
    this._reads.push({ length: Math.abs(i), allowLess: i < 0, func: t });
  };
  Ld.prototype.process = function () {
    for (; this._reads.length > 0 && this._buffer.length; ) {
      let i = this._reads[0];
      if (
        this._buffer.length &&
        (this._buffer.length >= i.length || i.allowLess)
      ) {
        this._reads.shift();
        let t = this._buffer;
        (this._buffer = t.slice(i.length)),
          i.func.call(this, t.slice(0, i.length));
      } else break;
    }
    if (this._reads.length > 0)
      return new Error(
        'There are some read requests waitng on finished stream'
      );
    if (this._buffer.length > 0)
      return new Error('unrecognised content at end of stream');
  };
});
var Bd = f((Nd) => {
  'use strict';
  var Ph = go(),
    Uh = so();
  Nd.process = function (i, t) {
    let r = [],
      e = new Ph(i);
    return (
      new Uh(t, {
        read: e.read.bind(e),
        write: function (o) {
          r.push(o);
        },
        complete: function () {},
      }).start(),
      e.process(),
      Buffer.concat(r)
    );
  };
});
var zd = f((S0, jd) => {
  'use strict';
  var Pd = !0,
    Ud = it('zlib'),
    jh = Od();
  Ud.deflateSync || (Pd = !1);
  var zh = go(),
    Hh = Bd(),
    Gh = uo(),
    Qh = ho(),
    Wh = fo();
  jd.exports = function (i, t) {
    if (!Pd)
      throw new Error(
        'To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0'
      );
    let r;
    function e(lt) {
      r = lt;
    }
    let n;
    function o(lt) {
      n = lt;
    }
    function a(lt) {
      n.transColor = lt;
    }
    function s(lt) {
      n.palette = lt;
    }
    function d() {
      n.alpha = !0;
    }
    let c;
    function l(lt) {
      c = lt;
    }
    let u = [];
    function h(lt) {
      u.push(lt);
    }
    let b = new zh(i);
    if (
      (new Gh(t, {
        read: b.read.bind(b),
        error: e,
        metadata: o,
        gamma: l,
        palette: s,
        transColor: a,
        inflateData: h,
        simpleTransparency: d,
      }).start(),
      b.process(),
      r)
    )
      throw r;
    let x = Buffer.concat(u);
    u.length = 0;
    let _;
    if (n.interlace) _ = Ud.inflateSync(x);
    else {
      let _t = (((n.width * n.bpp * n.depth + 7) >> 3) + 1) * n.height;
      _ = jh(x, { chunkSize: _t, maxLength: _t });
    }
    if (((x = null), !_ || !_.length))
      throw new Error('bad png - invalid inflate data response');
    let R = Hh.process(_, n);
    x = null;
    let se = Qh.dataToBitMap(R, n);
    R = null;
    let we = Wh(se, n);
    return (n.data = we), (n.gamma = c || 0), n;
  };
});
var Wd = f((R0, Qd) => {
  'use strict';
  var Hd = !0,
    Gd = it('zlib');
  Gd.deflateSync || (Hd = !1);
  var qh = xe(),
    Yh = bo();
  Qd.exports = function (i, t) {
    if (!Hd)
      throw new Error(
        'To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0'
      );
    let r = t || {},
      e = new Yh(r),
      n = [];
    n.push(Buffer.from(qh.PNG_SIGNATURE)),
      n.push(e.packIHDR(i.width, i.height)),
      i.gamma && n.push(e.packGAMA(i.gamma));
    let o = e.filterData(i.data, i.width, i.height),
      a = Gd.deflateSync(o, e.getDeflateOptions());
    if (((o = null), !a || !a.length))
      throw new Error('bad png - invalid compressed data response');
    return n.push(e.packIDAT(a)), n.push(e.packIEND()), Buffer.concat(n);
  };
});
var qd = f((_o) => {
  'use strict';
  var Zh = zd(),
    Xh = Wd();
  _o.read = function (i, t) {
    return Zh(i, t || {});
  };
  _o.write = function (i, t) {
    return Xh(i, t);
  };
});
var Xd = f((Zd) => {
  'use strict';
  var $h = it('util'),
    Yd = it('stream'),
    Kh = _d(),
    Jh = Td(),
    tf = qd(),
    mt = (Zd.PNG = function (i) {
      Yd.call(this),
        (i = i || {}),
        (this.width = i.width | 0),
        (this.height = i.height | 0),
        (this.data =
          this.width > 0 && this.height > 0
            ? Buffer.alloc(4 * this.width * this.height)
            : null),
        i.fill && this.data && this.data.fill(0),
        (this.gamma = 0),
        (this.readable = this.writable = !0),
        (this._parser = new Kh(i)),
        this._parser.on('error', this.emit.bind(this, 'error')),
        this._parser.on('close', this._handleClose.bind(this)),
        this._parser.on('metadata', this._metadata.bind(this)),
        this._parser.on('gamma', this._gamma.bind(this)),
        this._parser.on(
          'parsed',
          function (t) {
            (this.data = t), this.emit('parsed', t);
          }.bind(this)
        ),
        (this._packer = new Jh(i)),
        this._packer.on('data', this.emit.bind(this, 'data')),
        this._packer.on('end', this.emit.bind(this, 'end')),
        this._parser.on('close', this._handleClose.bind(this)),
        this._packer.on('error', this.emit.bind(this, 'error'));
    });
  $h.inherits(mt, Yd);
  mt.sync = tf;
  mt.prototype.pack = function () {
    return !this.data || !this.data.length
      ? (this.emit('error', 'No data provided'), this)
      : (process.nextTick(
          function () {
            this._packer.pack(this.data, this.width, this.height, this.gamma);
          }.bind(this)
        ),
        this);
  };
  mt.prototype.parse = function (i, t) {
    if (t) {
      let r, e;
      (r = function (n) {
        this.removeListener('error', e), (this.data = n), t(null, this);
      }.bind(this)),
        (e = function (n) {
          this.removeListener('parsed', r), t(n, null);
        }.bind(this)),
        this.once('parsed', r),
        this.once('error', e);
    }
    return this.end(i), this;
  };
  mt.prototype.write = function (i) {
    return this._parser.write(i), !0;
  };
  mt.prototype.end = function (i) {
    this._parser.end(i);
  };
  mt.prototype._metadata = function (i) {
    (this.width = i.width), (this.height = i.height), this.emit('metadata', i);
  };
  mt.prototype._gamma = function (i) {
    this.gamma = i;
  };
  mt.prototype._handleClose = function () {
    !this._parser.writable && !this._packer.readable && this.emit('close');
  };
  mt.bitblt = function (i, t, r, e, n, o, a, s) {
    if (
      ((r |= 0),
      (e |= 0),
      (n |= 0),
      (o |= 0),
      (a |= 0),
      (s |= 0),
      r > i.width || e > i.height || r + n > i.width || e + o > i.height)
    )
      throw new Error('bitblt reading outside image');
    if (a > t.width || s > t.height || a + n > t.width || s + o > t.height)
      throw new Error('bitblt writing outside image');
    for (let d = 0; d < o; d++)
      i.data.copy(
        t.data,
        ((s + d) * t.width + a) << 2,
        ((e + d) * i.width + r) << 2,
        ((e + d) * i.width + r + n) << 2
      );
  };
  mt.prototype.bitblt = function (i, t, r, e, n, o, a) {
    return mt.bitblt(this, i, t, r, e, n, o, a), this;
  };
  mt.adjustGamma = function (i) {
    if (i.gamma) {
      for (let t = 0; t < i.height; t++)
        for (let r = 0; r < i.width; r++) {
          let e = (i.width * t + r) << 2;
          for (let n = 0; n < 3; n++) {
            let o = i.data[e + n] / 255;
            (o = Math.pow(o, 1 / 2.2 / i.gamma)),
              (i.data[e + n] = Math.round(o * 255));
          }
        }
      i.gamma = 0;
    }
  };
  mt.prototype.adjustGamma = function () {
    mt.adjustGamma(this);
  };
});
var qe = f((re) => {
  'use strict';
  function $d(i) {
    if ((typeof i == 'number' && (i = i.toString()), typeof i != 'string'))
      throw new Error('Color should be defined as hex string');
    let t = i.slice().replace('#', '').split('');
    if (t.length < 3 || t.length === 5 || t.length > 8)
      throw new Error('Invalid hex color: ' + i);
    (t.length === 3 || t.length === 4) &&
      (t = Array.prototype.concat.apply(
        [],
        t.map(function (e) {
          return [e, e];
        })
      )),
      t.length === 6 && t.push('F', 'F');
    let r = parseInt(t.join(''), 16);
    return {
      r: (r >> 24) & 255,
      g: (r >> 16) & 255,
      b: (r >> 8) & 255,
      a: r & 255,
      hex: '#' + t.slice(0, 6).join(''),
    };
  }
  re.getOptions = function (t) {
    t || (t = {}), t.color || (t.color = {});
    let r =
        typeof t.margin > 'u' || t.margin === null || t.margin < 0
          ? 4
          : t.margin,
      e = t.width && t.width >= 21 ? t.width : void 0,
      n = t.scale || 4;
    return {
      width: e,
      scale: e ? 4 : n,
      margin: r,
      color: {
        dark: $d(t.color.dark || '#000000ff'),
        light: $d(t.color.light || '#ffffffff'),
      },
      type: t.type,
      rendererOpts: t.rendererOpts || {},
    };
  };
  re.getScale = function (t, r) {
    return r.width && r.width >= t + r.margin * 2
      ? r.width / (t + r.margin * 2)
      : r.scale;
  };
  re.getImageWidth = function (t, r) {
    let e = re.getScale(t, r);
    return Math.floor((t + r.margin * 2) * e);
  };
  re.qrToImageData = function (t, r, e) {
    let n = r.modules.size,
      o = r.modules.data,
      a = re.getScale(n, e),
      s = Math.floor((n + e.margin * 2) * a),
      d = e.margin * a,
      c = [e.color.light, e.color.dark];
    for (let l = 0; l < s; l++)
      for (let u = 0; u < s; u++) {
        let h = (l * s + u) * 4,
          b = e.color.light;
        if (l >= d && u >= d && l < s - d && u < s - d) {
          let v = Math.floor((l - d) / a),
            x = Math.floor((u - d) / a);
          b = c[o[v * n + x] ? 1 : 0];
        }
        (t[h++] = b.r), (t[h++] = b.g), (t[h++] = b.b), (t[h] = b.a);
      }
  };
});
var Kd = f((At) => {
  'use strict';
  var ef = it('fs'),
    nf = Xd().PNG,
    vo = qe();
  At.render = function (t, r) {
    let e = vo.getOptions(r),
      n = e.rendererOpts,
      o = vo.getImageWidth(t.modules.size, e);
    (n.width = o), (n.height = o);
    let a = new nf(n);
    return vo.qrToImageData(a.data, t, e), a;
  };
  At.renderToDataURL = function (t, r, e) {
    typeof e > 'u' && ((e = r), (r = void 0)),
      At.renderToBuffer(t, r, function (n, o) {
        n && e(n);
        let a = 'data:image/png;base64,';
        (a += o.toString('base64')), e(null, a);
      });
  };
  At.renderToBuffer = function (t, r, e) {
    typeof e > 'u' && ((e = r), (r = void 0));
    let n = At.render(t, r),
      o = [];
    n.on('error', e),
      n.on('data', function (a) {
        o.push(a);
      }),
      n.on('end', function () {
        e(null, Buffer.concat(o));
      }),
      n.pack();
  };
  At.renderToFile = function (t, r, e, n) {
    typeof n > 'u' && ((n = e), (e = void 0));
    let o = !1,
      a = (...d) => {
        o || ((o = !0), n.apply(null, d));
      },
      s = ef.createWriteStream(t);
    s.on('error', a), s.on('close', a), At.renderToFileStream(s, r, e);
  };
  At.renderToFileStream = function (t, r, e) {
    At.render(r, e).pack().pipe(t);
  };
});
var Jd = f((Hi) => {
  'use strict';
  var of = qe(),
    rf = { WW: ' ', WB: '\u2584', BB: '\u2588', BW: '\u2580' },
    af = { BB: ' ', BW: '\u2584', WW: '\u2588', WB: '\u2580' };
  function sf(i, t, r) {
    return i && t ? r.BB : i && !t ? r.BW : !i && t ? r.WB : r.WW;
  }
  Hi.render = function (i, t, r) {
    let e = of.getOptions(t),
      n = rf;
    (e.color.dark.hex === '#ffffff' || e.color.light.hex === '#000000') &&
      (n = af);
    let o = i.modules.size,
      a = i.modules.data,
      s = '',
      d = Array(o + e.margin * 2 + 1).join(n.WW);
    d = Array(e.margin / 2 + 1).join(
      d +
        `
`
    );
    let c = Array(e.margin + 1).join(n.WW);
    s += d;
    for (let l = 0; l < o; l += 2) {
      s += c;
      for (let u = 0; u < o; u++) {
        let h = a[l * o + u],
          b = a[(l + 1) * o + u];
        s += sf(h, b, n);
      }
      s +=
        c +
        `
`;
    }
    return (s += d.slice(0, -1)), typeof r == 'function' && r(null, s), s;
  };
  Hi.renderToFile = function (t, r, e, n) {
    typeof n > 'u' && ((n = e), (e = void 0));
    let o = it('fs'),
      a = Hi.render(r, e);
    o.writeFile(t, a, n);
  };
});
var ec = f((tc) => {
  'use strict';
  tc.render = function (i, t, r) {
    let e = i.modules.size,
      n = i.modules.data,
      o = '\x1B[40m  \x1B[0m',
      a = '\x1B[47m  \x1B[0m',
      s = '',
      d = Array(e + 3).join(a),
      c = Array(2).join(a);
    s +=
      d +
      `
`;
    for (let l = 0; l < e; ++l) {
      s += a;
      for (let u = 0; u < e; u++) s += n[l * e + u] ? o : a;
      s +=
        c +
        `
`;
    }
    return (
      (s +=
        d +
        `
`),
      typeof r == 'function' && r(null, s),
      s
    );
  };
});
var rc = f((oc) => {
  'use strict';
  var df = '\x1B[47m',
    cf = '\x1B[40m',
    xo = '\x1B[37m',
    yo = '\x1B[30m',
    ae = '\x1B[0m',
    lf = df + yo,
    mf = cf + xo,
    uf = function (i, t, r) {
      return {
        '00': ae + ' ' + i,
        '01': ae + t + '\u2584' + i,
        '02': ae + r + '\u2584' + i,
        10: ae + t + '\u2580' + i,
        11: ' ',
        12: '\u2584',
        20: ae + r + '\u2580' + i,
        21: '\u2580',
        22: '\u2588',
      };
    },
    ic = function (i, t, r, e) {
      let n = t + 1;
      if (r >= n || e >= n || e < -1 || r < -1) return '0';
      if (r >= t || e >= t || e < 0 || r < 0) return '1';
      let o = e * t + r;
      return i[o] ? '2' : '1';
    },
    nc = function (i, t, r, e) {
      return ic(i, t, r, e) + ic(i, t, r, e + 1);
    };
  oc.render = function (i, t, r) {
    let e = i.modules.size,
      n = i.modules.data,
      o = !!(t && t.inverse),
      a = t && t.inverse ? mf : lf,
      c = uf(a, o ? yo : xo, o ? xo : yo),
      l =
        ae +
        `
` +
        a,
      u = a;
    for (let h = -1; h < e + 1; h += 2) {
      for (let b = -1; b < e; b++) u += c[nc(n, e, b, h)];
      u += c[nc(n, e, e, h)] + l;
    }
    return (u += ae), typeof r == 'function' && r(null, u), u;
  };
});
var sc = f((ac) => {
  'use strict';
  var hf = ec(),
    ff = rc();
  ac.render = function (i, t, r) {
    return t && t.small ? ff.render(i, t, r) : hf.render(i, t, r);
  };
});
var wo = f((cc) => {
  'use strict';
  var pf = qe();
  function dc(i, t) {
    let r = i.a / 255,
      e = t + '="' + i.hex + '"';
    return r < 1 ? e + ' ' + t + '-opacity="' + r.toFixed(2).slice(1) + '"' : e;
  }
  function ko(i, t, r) {
    let e = i + t;
    return typeof r < 'u' && (e += ' ' + r), e;
  }
  function bf(i, t, r) {
    let e = '',
      n = 0,
      o = !1,
      a = 0;
    for (let s = 0; s < i.length; s++) {
      let d = Math.floor(s % t),
        c = Math.floor(s / t);
      !d && !o && (o = !0),
        i[s]
          ? (a++,
            (s > 0 && d > 0 && i[s - 1]) ||
              ((e += o ? ko('M', d + r, 0.5 + c + r) : ko('m', n, 0)),
              (n = 0),
              (o = !1)),
            (d + 1 < t && i[s + 1]) || ((e += ko('h', a)), (a = 0)))
          : n++;
    }
    return e;
  }
  cc.render = function (t, r, e) {
    let n = pf.getOptions(r),
      o = t.modules.size,
      a = t.modules.data,
      s = o + n.margin * 2,
      d = n.color.light.a
        ? '<path ' +
          dc(n.color.light, 'fill') +
          ' d="M0 0h' +
          s +
          'v' +
          s +
          'H0z"/>'
        : '',
      c =
        '<path ' +
        dc(n.color.dark, 'stroke') +
        ' d="' +
        bf(a, o, n.margin) +
        '"/>',
      l = 'viewBox="0 0 ' + s + ' ' + s + '"',
      h =
        '<svg xmlns="http://www.w3.org/2000/svg" ' +
        (n.width ? 'width="' + n.width + '" height="' + n.width + '" ' : '') +
        l +
        ' shape-rendering="crispEdges">' +
        d +
        c +
        `</svg>
`;
    return typeof e == 'function' && e(null, h), h;
  };
});
var lc = f((Gi) => {
  'use strict';
  var gf = wo();
  Gi.render = gf.render;
  Gi.renderToFile = function (t, r, e, n) {
    typeof n > 'u' && ((n = e), (e = void 0));
    let o = it('fs'),
      s =
        '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
        Gi.render(r, e);
    o.writeFile(t, s, n);
  };
});
var mc = f((Qi) => {
  'use strict';
  var Co = qe();
  function _f(i, t, r) {
    i.clearRect(0, 0, t.width, t.height),
      t.style || (t.style = {}),
      (t.height = r),
      (t.width = r),
      (t.style.height = r + 'px'),
      (t.style.width = r + 'px');
  }
  function vf() {
    try {
      return document.createElement('canvas');
    } catch {
      throw new Error('You need to specify a canvas element');
    }
  }
  Qi.render = function (t, r, e) {
    let n = e,
      o = r;
    typeof n > 'u' && (!r || !r.getContext) && ((n = r), (r = void 0)),
      r || (o = vf()),
      (n = Co.getOptions(n));
    let a = Co.getImageWidth(t.modules.size, n),
      s = o.getContext('2d'),
      d = s.createImageData(a, a);
    return (
      Co.qrToImageData(d.data, t, n), _f(s, o, a), s.putImageData(d, 0, 0), o
    );
  };
  Qi.renderToDataURL = function (t, r, e) {
    let n = e;
    typeof n > 'u' && (!r || !r.getContext) && ((n = r), (r = void 0)),
      n || (n = {});
    let o = Qi.render(t, r, n),
      a = n.type || 'image/png',
      s = n.rendererOpts || {};
    return o.toDataURL(a, s.quality);
  };
});
var hc = f((Ye) => {
  'use strict';
  var xf = Nn(),
    Eo = io(),
    uc = mc(),
    yf = wo();
  function Io(i, t, r, e, n) {
    let o = [].slice.call(arguments, 1),
      a = o.length,
      s = typeof o[a - 1] == 'function';
    if (!s && !xf()) throw new Error('Callback required as last argument');
    if (s) {
      if (a < 2) throw new Error('Too few arguments provided');
      a === 2
        ? ((n = r), (r = t), (t = e = void 0))
        : a === 3 &&
          (t.getContext && typeof n > 'u'
            ? ((n = e), (e = void 0))
            : ((n = e), (e = r), (r = t), (t = void 0)));
    } else {
      if (a < 1) throw new Error('Too few arguments provided');
      return (
        a === 1
          ? ((r = t), (t = e = void 0))
          : a === 2 && !t.getContext && ((e = r), (r = t), (t = void 0)),
        new Promise(function (d, c) {
          try {
            let l = Eo.create(r, e);
            d(i(l, t, e));
          } catch (l) {
            c(l);
          }
        })
      );
    }
    try {
      let d = Eo.create(r, e);
      n(null, i(d, t, e));
    } catch (d) {
      n(d);
    }
  }
  Ye.create = Eo.create;
  Ye.toCanvas = Io.bind(null, uc.render);
  Ye.toDataURL = Io.bind(null, uc.renderToDataURL);
  Ye.toString = Io.bind(null, function (i, t, r) {
    return yf.render(i, r);
  });
});
var gc = f((Zt) => {
  'use strict';
  var fc = Nn(),
    Mo = io(),
    kf = Kd(),
    pc = Jd(),
    wf = sc(),
    bc = lc();
  function Ze(i, t, r) {
    if (typeof i > 'u') throw new Error('String required as first argument');
    if ((typeof r > 'u' && ((r = t), (t = {})), typeof r != 'function'))
      if (fc()) (t = r || {}), (r = null);
      else throw new Error('Callback required as last argument');
    return { opts: t, cb: r };
  }
  function Cf(i) {
    return i.slice(((i.lastIndexOf('.') - 1) >>> 0) + 2).toLowerCase();
  }
  function Wi(i) {
    switch (i) {
      case 'svg':
        return bc;
      case 'txt':
      case 'utf8':
        return pc;
      case 'png':
      case 'image/png':
      default:
        return kf;
    }
  }
  function Ef(i) {
    switch (i) {
      case 'svg':
        return bc;
      case 'terminal':
        return wf;
      case 'utf8':
      default:
        return pc;
    }
  }
  function Xe(i, t, r) {
    if (!r.cb)
      return new Promise(function (e, n) {
        try {
          let o = Mo.create(t, r.opts);
          return i(o, r.opts, function (a, s) {
            return a ? n(a) : e(s);
          });
        } catch (o) {
          n(o);
        }
      });
    try {
      let e = Mo.create(t, r.opts);
      return i(e, r.opts, r.cb);
    } catch (e) {
      r.cb(e);
    }
  }
  Zt.create = Mo.create;
  Zt.toCanvas = hc().toCanvas;
  Zt.toString = function (t, r, e) {
    let n = Ze(t, r, e),
      o = n.opts ? n.opts.type : void 0,
      a = Ef(o);
    return Xe(a.render, t, n);
  };
  Zt.toDataURL = function (t, r, e) {
    let n = Ze(t, r, e),
      o = Wi(n.opts.type);
    return Xe(o.renderToDataURL, t, n);
  };
  Zt.toBuffer = function (t, r, e) {
    let n = Ze(t, r, e),
      o = Wi(n.opts.type);
    return Xe(o.renderToBuffer, t, n);
  };
  Zt.toFile = function (t, r, e, n) {
    if (typeof t != 'string' || !(typeof r == 'string' || typeof r == 'object'))
      throw new Error('Invalid argument');
    if (arguments.length < 3 && !fc())
      throw new Error('Too few arguments provided');
    let o = Ze(r, e, n),
      a = o.opts.type || Cf(t),
      d = Wi(a).renderToFile.bind(null, t);
    return Xe(d, r, o);
  };
  Zt.toFileStream = function (t, r, e) {
    if (arguments.length < 2) throw new Error('Too few arguments provided');
    let n = Ze(r, e, t.emit.bind(t, 'error')),
      a = Wi('png').renderToFileStream.bind(null, t);
    Xe(a, r, n);
  };
});
var vc = f((q0, _c) => {
  'use strict';
  _c.exports = gc();
});
var yr = (() => {
    let t = class t {
      constructor(e, n) {
        (this._renderer = e),
          (this._elementRef = n),
          (this.onChange = (o) => {}),
          (this.onTouched = () => {});
      }
      setProperty(e, n) {
        this._renderer.setProperty(this._elementRef.nativeElement, e, n);
      }
      registerOnTouched(e) {
        this.onTouched = e;
      }
      registerOnChange(e) {
        this.onChange = e;
      }
      setDisabledState(e) {
        this.setProperty('disabled', e);
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(m(Me), m(A));
    }),
      (t.ɵdir = T({ type: t }));
    let i = t;
    return i;
  })(),
  Dc = (() => {
    let t = class t extends yr {};
    (t.ɵfac = (() => {
      let e;
      return function (o) {
        return (e || (e = Ji(t)))(o || t);
      };
    })()),
      (t.ɵdir = T({ type: t, features: [$] }));
    let i = t;
    return i;
  })(),
  Lt = new y('NgValueAccessor');
var Sc = { provide: Lt, useExisting: xt(() => pi), multi: !0 };
function Rc() {
  let i = on() ? on().getUserAgent() : '';
  return /android (\d+)/.test(i.toLowerCase());
}
var Oc = new y('CompositionEventMode'),
  pi = (() => {
    let t = class t extends yr {
      constructor(e, n, o) {
        super(e, n),
          (this._compositionMode = o),
          (this._composing = !1),
          this._compositionMode == null && (this._compositionMode = !Rc());
      }
      writeValue(e) {
        let n = e ?? '';
        this.setProperty('value', n);
      }
      _handleInput(e) {
        (!this._compositionMode ||
          (this._compositionMode && !this._composing)) &&
          this.onChange(e);
      }
      _compositionStart() {
        this._composing = !0;
      }
      _compositionEnd(e) {
        (this._composing = !1), this._compositionMode && this.onChange(e);
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(m(Me), m(A), m(Oc, 8));
    }),
      (t.ɵdir = T({
        type: t,
        selectors: [
          ['input', 'formControlName', '', 3, 'type', 'checkbox'],
          ['textarea', 'formControlName', ''],
          ['input', 'formControl', '', 3, 'type', 'checkbox'],
          ['textarea', 'formControl', ''],
          ['input', 'ngModel', '', 3, 'type', 'checkbox'],
          ['textarea', 'ngModel', ''],
          ['', 'ngDefaultControl', ''],
        ],
        hostBindings: function (n, o) {
          n & 1 &&
            H('input', function (s) {
              return o._handleInput(s.target.value);
            })('blur', function () {
              return o.onTouched();
            })('compositionstart', function () {
              return o._compositionStart();
            })('compositionend', function (s) {
              return o._compositionEnd(s.target.value);
            });
        },
        features: [tt([Sc]), $],
      }));
    let i = t;
    return i;
  })();
function Bt(i) {
  return (
    i == null || ((typeof i == 'string' || Array.isArray(i)) && i.length === 0)
  );
}
function kr(i) {
  return i != null && typeof i.length == 'number';
}
var Se = new y('NgValidators'),
  bi = new y('NgAsyncValidators'),
  Lc =
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  ai = class {
    static min(t) {
      return Vc(t);
    }
    static max(t) {
      return Nc(t);
    }
    static required(t) {
      return Bc(t);
    }
    static requiredTrue(t) {
      return Pc(t);
    }
    static email(t) {
      return Uc(t);
    }
    static minLength(t) {
      return jc(t);
    }
    static maxLength(t) {
      return zc(t);
    }
    static pattern(t) {
      return Hc(t);
    }
    static nullValidator(t) {
      return wr(t);
    }
    static compose(t) {
      return Ar(t);
    }
    static composeAsync(t) {
      return Fr(t);
    }
  };
function Vc(i) {
  return (t) => {
    if (Bt(t.value) || Bt(i)) return null;
    let r = parseFloat(t.value);
    return !isNaN(r) && r < i ? { min: { min: i, actual: t.value } } : null;
  };
}
function Nc(i) {
  return (t) => {
    if (Bt(t.value) || Bt(i)) return null;
    let r = parseFloat(t.value);
    return !isNaN(r) && r > i ? { max: { max: i, actual: t.value } } : null;
  };
}
function Bc(i) {
  return Bt(i.value) ? { required: !0 } : null;
}
function Pc(i) {
  return i.value === !0 ? null : { required: !0 };
}
function Uc(i) {
  return Bt(i.value) || Lc.test(i.value) ? null : { email: !0 };
}
function jc(i) {
  return (t) =>
    Bt(t.value) || !kr(t.value)
      ? null
      : t.value.length < i
      ? { minlength: { requiredLength: i, actualLength: t.value.length } }
      : null;
}
function zc(i) {
  return (t) =>
    kr(t.value) && t.value.length > i
      ? { maxlength: { requiredLength: i, actualLength: t.value.length } }
      : null;
}
function Hc(i) {
  if (!i) return wr;
  let t, r;
  return (
    typeof i == 'string'
      ? ((r = ''),
        i.charAt(0) !== '^' && (r += '^'),
        (r += i),
        i.charAt(i.length - 1) !== '$' && (r += '$'),
        (t = new RegExp(r)))
      : ((r = i.toString()), (t = i)),
    (e) => {
      if (Bt(e.value)) return null;
      let n = e.value;
      return t.test(n)
        ? null
        : { pattern: { requiredPattern: r, actualValue: n } };
    }
  );
}
function wr(i) {
  return null;
}
function Cr(i) {
  return i != null;
}
function Er(i) {
  return Xo(i) ? Fo(i) : i;
}
function Ir(i) {
  let t = {};
  return (
    i.forEach((r) => {
      t = r != null ? G(G({}, t), r) : t;
    }),
    Object.keys(t).length === 0 ? null : t
  );
}
function Mr(i, t) {
  return t.map((r) => r(i));
}
function Gc(i) {
  return !i.validate;
}
function Tr(i) {
  return i.map((t) => (Gc(t) ? t : (r) => t.validate(r)));
}
function Ar(i) {
  if (!i) return null;
  let t = i.filter(Cr);
  return t.length == 0
    ? null
    : function (r) {
        return Ir(Mr(r, t));
      };
}
function sn(i) {
  return i != null ? Ar(Tr(i)) : null;
}
function Fr(i) {
  if (!i) return null;
  let t = i.filter(Cr);
  return t.length == 0
    ? null
    : function (r) {
        let e = Mr(r, t).map(Er);
        return Ke(e).pipe(vt(Ir));
      };
}
function dn(i) {
  return i != null ? Fr(Tr(i)) : null;
}
function pr(i, t) {
  return i === null ? [t] : Array.isArray(i) ? [...i, t] : [i, t];
}
function Dr(i) {
  return i._rawValidators;
}
function Sr(i) {
  return i._rawAsyncValidators;
}
function an(i) {
  return i ? (Array.isArray(i) ? i : [i]) : [];
}
function si(i, t) {
  return Array.isArray(i) ? i.includes(t) : i === t;
}
function br(i, t) {
  let r = an(t);
  return (
    an(i).forEach((n) => {
      si(r, n) || r.push(n);
    }),
    r
  );
}
function gr(i, t) {
  return an(t).filter((r) => !si(i, r));
}
var di = class {
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
    _setValidators(t) {
      (this._rawValidators = t || []),
        (this._composedValidatorFn = sn(this._rawValidators));
    }
    _setAsyncValidators(t) {
      (this._rawAsyncValidators = t || []),
        (this._composedAsyncValidatorFn = dn(this._rawAsyncValidators));
    }
    get validator() {
      return this._composedValidatorFn || null;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn || null;
    }
    _registerOnDestroy(t) {
      this._onDestroyCallbacks.push(t);
    }
    _invokeOnDestroyCallbacks() {
      this._onDestroyCallbacks.forEach((t) => t()),
        (this._onDestroyCallbacks = []);
    }
    reset(t = void 0) {
      this.control && this.control.reset(t);
    }
    hasError(t, r) {
      return this.control ? this.control.hasError(t, r) : !1;
    }
    getError(t, r) {
      return this.control ? this.control.getError(t, r) : null;
    }
  },
  Pt = class extends di {
    get formDirective() {
      return null;
    }
    get path() {
      return null;
    }
  },
  Ot = class extends di {
    constructor() {
      super(...arguments),
        (this._parent = null),
        (this.name = null),
        (this.valueAccessor = null);
    }
  },
  ci = class {
    constructor(t) {
      this._cd = t;
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
  Qc = {
    '[class.ng-untouched]': 'isUntouched',
    '[class.ng-touched]': 'isTouched',
    '[class.ng-pristine]': 'isPristine',
    '[class.ng-dirty]': 'isDirty',
    '[class.ng-valid]': 'isValid',
    '[class.ng-invalid]': 'isInvalid',
    '[class.ng-pending]': 'isPending',
  },
  Zf = Xt(G({}, Qc), { '[class.ng-submitted]': 'isSubmitted' }),
  Rr = (() => {
    let t = class t extends ci {
      constructor(e) {
        super(e);
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(m(Ot, 2));
    }),
      (t.ɵdir = T({
        type: t,
        selectors: [
          ['', 'formControlName', ''],
          ['', 'ngModel', ''],
          ['', 'formControl', ''],
        ],
        hostVars: 14,
        hostBindings: function (n, o) {
          n & 2 &&
            M('ng-untouched', o.isUntouched)('ng-touched', o.isTouched)(
              'ng-pristine',
              o.isPristine
            )('ng-dirty', o.isDirty)('ng-valid', o.isValid)(
              'ng-invalid',
              o.isInvalid
            )('ng-pending', o.isPending);
        },
        features: [$],
      }));
    let i = t;
    return i;
  })(),
  Or = (() => {
    let t = class t extends ci {
      constructor(e) {
        super(e);
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(m(Pt, 10));
    }),
      (t.ɵdir = T({
        type: t,
        selectors: [
          ['', 'formGroupName', ''],
          ['', 'formArrayName', ''],
          ['', 'ngModelGroup', ''],
          ['', 'formGroup', ''],
          ['form', 3, 'ngNoForm', ''],
          ['', 'ngForm', ''],
        ],
        hostVars: 16,
        hostBindings: function (n, o) {
          n & 2 &&
            M('ng-untouched', o.isUntouched)('ng-touched', o.isTouched)(
              'ng-pristine',
              o.isPristine
            )('ng-dirty', o.isDirty)('ng-valid', o.isValid)(
              'ng-invalid',
              o.isInvalid
            )('ng-pending', o.isPending)('ng-submitted', o.isSubmitted);
        },
        features: [$],
      }));
    let i = t;
    return i;
  })();
var Te = 'VALID',
  ri = 'INVALID',
  le = 'PENDING',
  Ae = 'DISABLED';
function Lr(i) {
  return (gi(i) ? i.validators : i) || null;
}
function Wc(i) {
  return Array.isArray(i) ? sn(i) : i || null;
}
function Vr(i, t) {
  return (gi(t) ? t.asyncValidators : i) || null;
}
function qc(i) {
  return Array.isArray(i) ? dn(i) : i || null;
}
function gi(i) {
  return i != null && !Array.isArray(i) && typeof i == 'object';
}
function Yc(i, t, r) {
  let e = i.controls;
  if (!(t ? Object.keys(e) : e).length) throw new ti(1e3, '');
  if (!e[r]) throw new ti(1001, '');
}
function Zc(i, t, r) {
  i._forEachChild((e, n) => {
    if (r[n] === void 0) throw new ti(1002, '');
  });
}
var li = class {
    constructor(t, r) {
      (this._pendingDirty = !1),
        (this._hasOwnPendingAsyncValidator = !1),
        (this._pendingTouched = !1),
        (this._onCollectionChange = () => {}),
        (this._parent = null),
        (this.pristine = !0),
        (this.touched = !1),
        (this._onDisabledChange = []),
        this._assignValidators(t),
        this._assignAsyncValidators(r);
    }
    get validator() {
      return this._composedValidatorFn;
    }
    set validator(t) {
      this._rawValidators = this._composedValidatorFn = t;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn;
    }
    set asyncValidator(t) {
      this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
    }
    get parent() {
      return this._parent;
    }
    get valid() {
      return this.status === Te;
    }
    get invalid() {
      return this.status === ri;
    }
    get pending() {
      return this.status == le;
    }
    get disabled() {
      return this.status === Ae;
    }
    get enabled() {
      return this.status !== Ae;
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
    setValidators(t) {
      this._assignValidators(t);
    }
    setAsyncValidators(t) {
      this._assignAsyncValidators(t);
    }
    addValidators(t) {
      this.setValidators(br(t, this._rawValidators));
    }
    addAsyncValidators(t) {
      this.setAsyncValidators(br(t, this._rawAsyncValidators));
    }
    removeValidators(t) {
      this.setValidators(gr(t, this._rawValidators));
    }
    removeAsyncValidators(t) {
      this.setAsyncValidators(gr(t, this._rawAsyncValidators));
    }
    hasValidator(t) {
      return si(this._rawValidators, t);
    }
    hasAsyncValidator(t) {
      return si(this._rawAsyncValidators, t);
    }
    clearValidators() {
      this.validator = null;
    }
    clearAsyncValidators() {
      this.asyncValidator = null;
    }
    markAsTouched(t = {}) {
      (this.touched = !0),
        this._parent && !t.onlySelf && this._parent.markAsTouched(t);
    }
    markAllAsTouched() {
      this.markAsTouched({ onlySelf: !0 }),
        this._forEachChild((t) => t.markAllAsTouched());
    }
    markAsUntouched(t = {}) {
      (this.touched = !1),
        (this._pendingTouched = !1),
        this._forEachChild((r) => {
          r.markAsUntouched({ onlySelf: !0 });
        }),
        this._parent && !t.onlySelf && this._parent._updateTouched(t);
    }
    markAsDirty(t = {}) {
      (this.pristine = !1),
        this._parent && !t.onlySelf && this._parent.markAsDirty(t);
    }
    markAsPristine(t = {}) {
      (this.pristine = !0),
        (this._pendingDirty = !1),
        this._forEachChild((r) => {
          r.markAsPristine({ onlySelf: !0 });
        }),
        this._parent && !t.onlySelf && this._parent._updatePristine(t);
    }
    markAsPending(t = {}) {
      (this.status = le),
        t.emitEvent !== !1 && this.statusChanges.emit(this.status),
        this._parent && !t.onlySelf && this._parent.markAsPending(t);
    }
    disable(t = {}) {
      let r = this._parentMarkedDirty(t.onlySelf);
      (this.status = Ae),
        (this.errors = null),
        this._forEachChild((e) => {
          e.disable(Xt(G({}, t), { onlySelf: !0 }));
        }),
        this._updateValue(),
        t.emitEvent !== !1 &&
          (this.valueChanges.emit(this.value),
          this.statusChanges.emit(this.status)),
        this._updateAncestors(Xt(G({}, t), { skipPristineCheck: r })),
        this._onDisabledChange.forEach((e) => e(!0));
    }
    enable(t = {}) {
      let r = this._parentMarkedDirty(t.onlySelf);
      (this.status = Te),
        this._forEachChild((e) => {
          e.enable(Xt(G({}, t), { onlySelf: !0 }));
        }),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: t.emitEvent }),
        this._updateAncestors(Xt(G({}, t), { skipPristineCheck: r })),
        this._onDisabledChange.forEach((e) => e(!1));
    }
    _updateAncestors(t) {
      this._parent &&
        !t.onlySelf &&
        (this._parent.updateValueAndValidity(t),
        t.skipPristineCheck || this._parent._updatePristine(),
        this._parent._updateTouched());
    }
    setParent(t) {
      this._parent = t;
    }
    getRawValue() {
      return this.value;
    }
    updateValueAndValidity(t = {}) {
      this._setInitialStatus(),
        this._updateValue(),
        this.enabled &&
          (this._cancelExistingSubscription(),
          (this.errors = this._runValidator()),
          (this.status = this._calculateStatus()),
          (this.status === Te || this.status === le) &&
            this._runAsyncValidator(t.emitEvent)),
        t.emitEvent !== !1 &&
          (this.valueChanges.emit(this.value),
          this.statusChanges.emit(this.status)),
        this._parent && !t.onlySelf && this._parent.updateValueAndValidity(t);
    }
    _updateTreeValidity(t = { emitEvent: !0 }) {
      this._forEachChild((r) => r._updateTreeValidity(t)),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: t.emitEvent });
    }
    _setInitialStatus() {
      this.status = this._allControlsDisabled() ? Ae : Te;
    }
    _runValidator() {
      return this.validator ? this.validator(this) : null;
    }
    _runAsyncValidator(t) {
      if (this.asyncValidator) {
        (this.status = le), (this._hasOwnPendingAsyncValidator = !0);
        let r = Er(this.asyncValidator(this));
        this._asyncValidationSubscription = r.subscribe((e) => {
          (this._hasOwnPendingAsyncValidator = !1),
            this.setErrors(e, { emitEvent: t });
        });
      }
    }
    _cancelExistingSubscription() {
      this._asyncValidationSubscription &&
        (this._asyncValidationSubscription.unsubscribe(),
        (this._hasOwnPendingAsyncValidator = !1));
    }
    setErrors(t, r = {}) {
      (this.errors = t), this._updateControlsErrors(r.emitEvent !== !1);
    }
    get(t) {
      let r = t;
      return r == null ||
        (Array.isArray(r) || (r = r.split('.')), r.length === 0)
        ? null
        : r.reduce((e, n) => e && e._find(n), this);
    }
    getError(t, r) {
      let e = r ? this.get(r) : this;
      return e && e.errors ? e.errors[t] : null;
    }
    hasError(t, r) {
      return !!this.getError(t, r);
    }
    get root() {
      let t = this;
      for (; t._parent; ) t = t._parent;
      return t;
    }
    _updateControlsErrors(t) {
      (this.status = this._calculateStatus()),
        t && this.statusChanges.emit(this.status),
        this._parent && this._parent._updateControlsErrors(t);
    }
    _initObservables() {
      (this.valueChanges = new z()), (this.statusChanges = new z());
    }
    _calculateStatus() {
      return this._allControlsDisabled()
        ? Ae
        : this.errors
        ? ri
        : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(le)
        ? le
        : this._anyControlsHaveStatus(ri)
        ? ri
        : Te;
    }
    _anyControlsHaveStatus(t) {
      return this._anyControls((r) => r.status === t);
    }
    _anyControlsDirty() {
      return this._anyControls((t) => t.dirty);
    }
    _anyControlsTouched() {
      return this._anyControls((t) => t.touched);
    }
    _updatePristine(t = {}) {
      (this.pristine = !this._anyControlsDirty()),
        this._parent && !t.onlySelf && this._parent._updatePristine(t);
    }
    _updateTouched(t = {}) {
      (this.touched = this._anyControlsTouched()),
        this._parent && !t.onlySelf && this._parent._updateTouched(t);
    }
    _registerOnCollectionChange(t) {
      this._onCollectionChange = t;
    }
    _setUpdateStrategy(t) {
      gi(t) && t.updateOn != null && (this._updateOn = t.updateOn);
    }
    _parentMarkedDirty(t) {
      let r = this._parent && this._parent.dirty;
      return !t && !!r && !this._parent._anyControlsDirty();
    }
    _find(t) {
      return null;
    }
    _assignValidators(t) {
      (this._rawValidators = Array.isArray(t) ? t.slice() : t),
        (this._composedValidatorFn = Wc(this._rawValidators));
    }
    _assignAsyncValidators(t) {
      (this._rawAsyncValidators = Array.isArray(t) ? t.slice() : t),
        (this._composedAsyncValidatorFn = qc(this._rawAsyncValidators));
    }
  },
  mi = class extends li {
    constructor(t, r, e) {
      super(Lr(r), Vr(e, r)),
        (this.controls = t),
        this._initObservables(),
        this._setUpdateStrategy(r),
        this._setUpControls(),
        this.updateValueAndValidity({
          onlySelf: !0,
          emitEvent: !!this.asyncValidator,
        });
    }
    registerControl(t, r) {
      return this.controls[t]
        ? this.controls[t]
        : ((this.controls[t] = r),
          r.setParent(this),
          r._registerOnCollectionChange(this._onCollectionChange),
          r);
    }
    addControl(t, r, e = {}) {
      this.registerControl(t, r),
        this.updateValueAndValidity({ emitEvent: e.emitEvent }),
        this._onCollectionChange();
    }
    removeControl(t, r = {}) {
      this.controls[t] &&
        this.controls[t]._registerOnCollectionChange(() => {}),
        delete this.controls[t],
        this.updateValueAndValidity({ emitEvent: r.emitEvent }),
        this._onCollectionChange();
    }
    setControl(t, r, e = {}) {
      this.controls[t] &&
        this.controls[t]._registerOnCollectionChange(() => {}),
        delete this.controls[t],
        r && this.registerControl(t, r),
        this.updateValueAndValidity({ emitEvent: e.emitEvent }),
        this._onCollectionChange();
    }
    contains(t) {
      return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
    }
    setValue(t, r = {}) {
      Zc(this, !0, t),
        Object.keys(t).forEach((e) => {
          Yc(this, !0, e),
            this.controls[e].setValue(t[e], {
              onlySelf: !0,
              emitEvent: r.emitEvent,
            });
        }),
        this.updateValueAndValidity(r);
    }
    patchValue(t, r = {}) {
      t != null &&
        (Object.keys(t).forEach((e) => {
          let n = this.controls[e];
          n && n.patchValue(t[e], { onlySelf: !0, emitEvent: r.emitEvent });
        }),
        this.updateValueAndValidity(r));
    }
    reset(t = {}, r = {}) {
      this._forEachChild((e, n) => {
        e.reset(t ? t[n] : null, { onlySelf: !0, emitEvent: r.emitEvent });
      }),
        this._updatePristine(r),
        this._updateTouched(r),
        this.updateValueAndValidity(r);
    }
    getRawValue() {
      return this._reduceChildren(
        {},
        (t, r, e) => ((t[e] = r.getRawValue()), t)
      );
    }
    _syncPendingControls() {
      let t = this._reduceChildren(!1, (r, e) =>
        e._syncPendingControls() ? !0 : r
      );
      return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
    }
    _forEachChild(t) {
      Object.keys(this.controls).forEach((r) => {
        let e = this.controls[r];
        e && t(e, r);
      });
    }
    _setUpControls() {
      this._forEachChild((t) => {
        t.setParent(this),
          t._registerOnCollectionChange(this._onCollectionChange);
      });
    }
    _updateValue() {
      this.value = this._reduceValue();
    }
    _anyControls(t) {
      for (let [r, e] of Object.entries(this.controls))
        if (this.contains(r) && t(e)) return !0;
      return !1;
    }
    _reduceValue() {
      let t = {};
      return this._reduceChildren(
        t,
        (r, e, n) => ((e.enabled || this.disabled) && (r[n] = e.value), r)
      );
    }
    _reduceChildren(t, r) {
      let e = t;
      return (
        this._forEachChild((n, o) => {
          e = r(e, n, o);
        }),
        e
      );
    }
    _allControlsDisabled() {
      for (let t of Object.keys(this.controls))
        if (this.controls[t].enabled) return !1;
      return Object.keys(this.controls).length > 0 || this.disabled;
    }
    _find(t) {
      return this.controls.hasOwnProperty(t) ? this.controls[t] : null;
    }
  };
var me = new y('CallSetDisabledState', {
    providedIn: 'root',
    factory: () => _i,
  }),
  _i = 'always';
function Xc(i, t) {
  return [...t.path, i];
}
function De(i, t, r = _i) {
  cn(i, t),
    t.valueAccessor.writeValue(i.value),
    (i.disabled || r === 'always') &&
      t.valueAccessor.setDisabledState?.(i.disabled),
    Kc(i, t),
    tl(i, t),
    Jc(i, t),
    $c(i, t);
}
function ui(i, t, r = !0) {
  let e = () => {};
  t.valueAccessor &&
    (t.valueAccessor.registerOnChange(e), t.valueAccessor.registerOnTouched(e)),
    fi(i, t),
    i &&
      (t._invokeOnDestroyCallbacks(), i._registerOnCollectionChange(() => {}));
}
function hi(i, t) {
  i.forEach((r) => {
    r.registerOnValidatorChange && r.registerOnValidatorChange(t);
  });
}
function $c(i, t) {
  if (t.valueAccessor.setDisabledState) {
    let r = (e) => {
      t.valueAccessor.setDisabledState(e);
    };
    i.registerOnDisabledChange(r),
      t._registerOnDestroy(() => {
        i._unregisterOnDisabledChange(r);
      });
  }
}
function cn(i, t) {
  let r = Dr(i);
  t.validator !== null
    ? i.setValidators(pr(r, t.validator))
    : typeof r == 'function' && i.setValidators([r]);
  let e = Sr(i);
  t.asyncValidator !== null
    ? i.setAsyncValidators(pr(e, t.asyncValidator))
    : typeof e == 'function' && i.setAsyncValidators([e]);
  let n = () => i.updateValueAndValidity();
  hi(t._rawValidators, n), hi(t._rawAsyncValidators, n);
}
function fi(i, t) {
  let r = !1;
  if (i !== null) {
    if (t.validator !== null) {
      let n = Dr(i);
      if (Array.isArray(n) && n.length > 0) {
        let o = n.filter((a) => a !== t.validator);
        o.length !== n.length && ((r = !0), i.setValidators(o));
      }
    }
    if (t.asyncValidator !== null) {
      let n = Sr(i);
      if (Array.isArray(n) && n.length > 0) {
        let o = n.filter((a) => a !== t.asyncValidator);
        o.length !== n.length && ((r = !0), i.setAsyncValidators(o));
      }
    }
  }
  let e = () => {};
  return hi(t._rawValidators, e), hi(t._rawAsyncValidators, e), r;
}
function Kc(i, t) {
  t.valueAccessor.registerOnChange((r) => {
    (i._pendingValue = r),
      (i._pendingChange = !0),
      (i._pendingDirty = !0),
      i.updateOn === 'change' && Nr(i, t);
  });
}
function Jc(i, t) {
  t.valueAccessor.registerOnTouched(() => {
    (i._pendingTouched = !0),
      i.updateOn === 'blur' && i._pendingChange && Nr(i, t),
      i.updateOn !== 'submit' && i.markAsTouched();
  });
}
function Nr(i, t) {
  i._pendingDirty && i.markAsDirty(),
    i.setValue(i._pendingValue, { emitModelToViewChange: !1 }),
    t.viewToModelUpdate(i._pendingValue),
    (i._pendingChange = !1);
}
function tl(i, t) {
  let r = (e, n) => {
    t.valueAccessor.writeValue(e), n && t.viewToModelUpdate(e);
  };
  i.registerOnChange(r),
    t._registerOnDestroy(() => {
      i._unregisterOnChange(r);
    });
}
function Br(i, t) {
  i == null, cn(i, t);
}
function el(i, t) {
  return fi(i, t);
}
function Pr(i, t) {
  if (!i.hasOwnProperty('model')) return !1;
  let r = i.model;
  return r.isFirstChange() ? !0 : !Object.is(t, r.currentValue);
}
function il(i) {
  return Object.getPrototypeOf(i.constructor) === Dc;
}
function Ur(i, t) {
  i._syncPendingControls(),
    t.forEach((r) => {
      let e = r.control;
      e.updateOn === 'submit' &&
        e._pendingChange &&
        (r.viewToModelUpdate(e._pendingValue), (e._pendingChange = !1));
    });
}
function jr(i, t) {
  if (!t) return null;
  Array.isArray(t);
  let r, e, n;
  return (
    t.forEach((o) => {
      o.constructor === pi ? (r = o) : il(o) ? (e = o) : (n = o);
    }),
    n || e || r || null
  );
}
function nl(i, t) {
  let r = i.indexOf(t);
  r > -1 && i.splice(r, 1);
}
var ol = { provide: Pt, useExisting: xt(() => Re) },
  Fe = (() => Promise.resolve())(),
  Re = (() => {
    let t = class t extends Pt {
      constructor(e, n, o) {
        super(),
          (this.callSetDisabledState = o),
          (this.submitted = !1),
          (this._directives = new Set()),
          (this.ngSubmit = new z()),
          (this.form = new mi({}, sn(e), dn(n)));
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
      addControl(e) {
        Fe.then(() => {
          let n = this._findContainer(e.path);
          (e.control = n.registerControl(e.name, e.control)),
            De(e.control, e, this.callSetDisabledState),
            e.control.updateValueAndValidity({ emitEvent: !1 }),
            this._directives.add(e);
        });
      }
      getControl(e) {
        return this.form.get(e.path);
      }
      removeControl(e) {
        Fe.then(() => {
          let n = this._findContainer(e.path);
          n && n.removeControl(e.name), this._directives.delete(e);
        });
      }
      addFormGroup(e) {
        Fe.then(() => {
          let n = this._findContainer(e.path),
            o = new mi({});
          Br(o, e),
            n.registerControl(e.name, o),
            o.updateValueAndValidity({ emitEvent: !1 });
        });
      }
      removeFormGroup(e) {
        Fe.then(() => {
          let n = this._findContainer(e.path);
          n && n.removeControl(e.name);
        });
      }
      getFormGroup(e) {
        return this.form.get(e.path);
      }
      updateModel(e, n) {
        Fe.then(() => {
          this.form.get(e.path).setValue(n);
        });
      }
      setValue(e) {
        this.control.setValue(e);
      }
      onSubmit(e) {
        return (
          (this.submitted = !0),
          Ur(this.form, this._directives),
          this.ngSubmit.emit(e),
          e?.target?.method === 'dialog'
        );
      }
      onReset() {
        this.resetForm();
      }
      resetForm(e = void 0) {
        this.form.reset(e), (this.submitted = !1);
      }
      _setUpdateStrategy() {
        this.options &&
          this.options.updateOn != null &&
          (this.form._updateOn = this.options.updateOn);
      }
      _findContainer(e) {
        return e.pop(), e.length ? this.form.get(e) : this.form;
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(m(Se, 10), m(bi, 10), m(me, 8));
    }),
      (t.ɵdir = T({
        type: t,
        selectors: [
          ['form', 3, 'ngNoForm', '', 3, 'formGroup', ''],
          ['ng-form'],
          ['', 'ngForm', ''],
        ],
        hostBindings: function (n, o) {
          n & 1 &&
            H('submit', function (s) {
              return o.onSubmit(s);
            })('reset', function () {
              return o.onReset();
            });
        },
        inputs: { options: ['ngFormOptions', 'options'] },
        outputs: { ngSubmit: 'ngSubmit' },
        exportAs: ['ngForm'],
        features: [tt([ol]), $],
      }));
    let i = t;
    return i;
  })();
function _r(i, t) {
  let r = i.indexOf(t);
  r > -1 && i.splice(r, 1);
}
function vr(i) {
  return (
    typeof i == 'object' &&
    i !== null &&
    Object.keys(i).length === 2 &&
    'value' in i &&
    'disabled' in i
  );
}
var Oe = class extends li {
  constructor(t = null, r, e) {
    super(Lr(r), Vr(e, r)),
      (this.defaultValue = null),
      (this._onChange = []),
      (this._pendingChange = !1),
      this._applyFormState(t),
      this._setUpdateStrategy(r),
      this._initObservables(),
      this.updateValueAndValidity({
        onlySelf: !0,
        emitEvent: !!this.asyncValidator,
      }),
      gi(r) &&
        (r.nonNullable || r.initialValueIsDefault) &&
        (vr(t) ? (this.defaultValue = t.value) : (this.defaultValue = t));
  }
  setValue(t, r = {}) {
    (this.value = this._pendingValue = t),
      this._onChange.length &&
        r.emitModelToViewChange !== !1 &&
        this._onChange.forEach((e) =>
          e(this.value, r.emitViewToModelChange !== !1)
        ),
      this.updateValueAndValidity(r);
  }
  patchValue(t, r = {}) {
    this.setValue(t, r);
  }
  reset(t = this.defaultValue, r = {}) {
    this._applyFormState(t),
      this.markAsPristine(r),
      this.markAsUntouched(r),
      this.setValue(this.value, r),
      (this._pendingChange = !1);
  }
  _updateValue() {}
  _anyControls(t) {
    return !1;
  }
  _allControlsDisabled() {
    return this.disabled;
  }
  registerOnChange(t) {
    this._onChange.push(t);
  }
  _unregisterOnChange(t) {
    _r(this._onChange, t);
  }
  registerOnDisabledChange(t) {
    this._onDisabledChange.push(t);
  }
  _unregisterOnDisabledChange(t) {
    _r(this._onDisabledChange, t);
  }
  _forEachChild(t) {}
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
  _applyFormState(t) {
    vr(t)
      ? ((this.value = this._pendingValue = t.value),
        t.disabled
          ? this.disable({ onlySelf: !0, emitEvent: !1 })
          : this.enable({ onlySelf: !0, emitEvent: !1 }))
      : (this.value = this._pendingValue = t);
  }
};
var rl = (i) => i instanceof Oe;
var al = { provide: Ot, useExisting: xt(() => ln) },
  xr = (() => Promise.resolve())(),
  ln = (() => {
    let t = class t extends Ot {
      constructor(e, n, o, a, s, d) {
        super(),
          (this._changeDetectorRef = s),
          (this.callSetDisabledState = d),
          (this.control = new Oe()),
          (this._registered = !1),
          (this.name = ''),
          (this.update = new z()),
          (this._parent = e),
          this._setValidators(n),
          this._setAsyncValidators(o),
          (this.valueAccessor = jr(this, a));
      }
      ngOnChanges(e) {
        if ((this._checkForErrors(), !this._registered || 'name' in e)) {
          if (this._registered && (this._checkName(), this.formDirective)) {
            let n = e.name.previousValue;
            this.formDirective.removeControl({
              name: n,
              path: this._getPath(n),
            });
          }
          this._setUpControl();
        }
        'isDisabled' in e && this._updateDisabled(e),
          Pr(e, this.viewModel) &&
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
      viewToModelUpdate(e) {
        (this.viewModel = e), this.update.emit(e);
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
        De(this.control, this, this.callSetDisabledState),
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
      _updateValue(e) {
        xr.then(() => {
          this.control.setValue(e, { emitViewToModelChange: !1 }),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _updateDisabled(e) {
        let n = e.isDisabled.currentValue,
          o = n !== 0 && X(n);
        xr.then(() => {
          o && !this.control.disabled
            ? this.control.disable()
            : !o && this.control.disabled && this.control.enable(),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _getPath(e) {
        return this._parent ? Xc(e, this._parent) : [e];
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(
        m(Pt, 9),
        m(Se, 10),
        m(bi, 10),
        m(Lt, 10),
        m(ht, 8),
        m(me, 8)
      );
    }),
      (t.ɵdir = T({
        type: t,
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
        features: [tt([al]), $, St],
      }));
    let i = t;
    return i;
  })(),
  zr = (() => {
    let t = class t {};
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵdir = T({
        type: t,
        selectors: [['form', 3, 'ngNoForm', '', 3, 'ngNativeValidate', '']],
        hostAttrs: ['novalidate', ''],
      }));
    let i = t;
    return i;
  })();
var sl = (() => {
  let t = class t {};
  (t.ɵfac = function (n) {
    return new (n || t)();
  }),
    (t.ɵmod = E({ type: t })),
    (t.ɵinj = C({}));
  let i = t;
  return i;
})();
var Hr = new y('NgModelWithFormControlWarning'),
  dl = { provide: Ot, useExisting: xt(() => mn) },
  mn = (() => {
    let t = class t extends Ot {
      set isDisabled(e) {}
      constructor(e, n, o, a, s) {
        super(),
          (this._ngModelWarningConfig = a),
          (this.callSetDisabledState = s),
          (this.update = new z()),
          (this._ngModelWarningSent = !1),
          this._setValidators(e),
          this._setAsyncValidators(n),
          (this.valueAccessor = jr(this, o));
      }
      ngOnChanges(e) {
        if (this._isControlChanged(e)) {
          let n = e.form.previousValue;
          n && ui(n, this, !1),
            De(this.form, this, this.callSetDisabledState),
            this.form.updateValueAndValidity({ emitEvent: !1 });
        }
        Pr(e, this.viewModel) &&
          (this.form.setValue(this.model), (this.viewModel = this.model));
      }
      ngOnDestroy() {
        this.form && ui(this.form, this, !1);
      }
      get path() {
        return [];
      }
      get control() {
        return this.form;
      }
      viewToModelUpdate(e) {
        (this.viewModel = e), this.update.emit(e);
      }
      _isControlChanged(e) {
        return e.hasOwnProperty('form');
      }
    };
    (t._ngModelWarningSentOnce = !1),
      (t.ɵfac = function (n) {
        return new (n || t)(
          m(Se, 10),
          m(bi, 10),
          m(Lt, 10),
          m(Hr, 8),
          m(me, 8)
        );
      }),
      (t.ɵdir = T({
        type: t,
        selectors: [['', 'formControl', '']],
        inputs: {
          form: ['formControl', 'form'],
          isDisabled: ['disabled', 'isDisabled'],
          model: ['ngModel', 'model'],
        },
        outputs: { update: 'ngModelChange' },
        exportAs: ['ngForm'],
        features: [tt([dl]), $, St],
      }));
    let i = t;
    return i;
  })(),
  cl = { provide: Pt, useExisting: xt(() => un) },
  un = (() => {
    let t = class t extends Pt {
      constructor(e, n, o) {
        super(),
          (this.callSetDisabledState = o),
          (this.submitted = !1),
          (this._onCollectionChange = () => this._updateDomValue()),
          (this.directives = []),
          (this.form = null),
          (this.ngSubmit = new z()),
          this._setValidators(e),
          this._setAsyncValidators(n);
      }
      ngOnChanges(e) {
        this._checkFormPresent(),
          e.hasOwnProperty('form') &&
            (this._updateValidators(),
            this._updateDomValue(),
            this._updateRegistrations(),
            (this._oldForm = this.form));
      }
      ngOnDestroy() {
        this.form &&
          (fi(this.form, this),
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
      addControl(e) {
        let n = this.form.get(e.path);
        return (
          De(n, e, this.callSetDisabledState),
          n.updateValueAndValidity({ emitEvent: !1 }),
          this.directives.push(e),
          n
        );
      }
      getControl(e) {
        return this.form.get(e.path);
      }
      removeControl(e) {
        ui(e.control || null, e, !1), nl(this.directives, e);
      }
      addFormGroup(e) {
        this._setUpFormContainer(e);
      }
      removeFormGroup(e) {
        this._cleanUpFormContainer(e);
      }
      getFormGroup(e) {
        return this.form.get(e.path);
      }
      addFormArray(e) {
        this._setUpFormContainer(e);
      }
      removeFormArray(e) {
        this._cleanUpFormContainer(e);
      }
      getFormArray(e) {
        return this.form.get(e.path);
      }
      updateModel(e, n) {
        this.form.get(e.path).setValue(n);
      }
      onSubmit(e) {
        return (
          (this.submitted = !0),
          Ur(this.form, this.directives),
          this.ngSubmit.emit(e),
          e?.target?.method === 'dialog'
        );
      }
      onReset() {
        this.resetForm();
      }
      resetForm(e = void 0) {
        this.form.reset(e), (this.submitted = !1);
      }
      _updateDomValue() {
        this.directives.forEach((e) => {
          let n = e.control,
            o = this.form.get(e.path);
          n !== o &&
            (ui(n || null, e),
            rl(o) && (De(o, e, this.callSetDisabledState), (e.control = o)));
        }),
          this.form._updateTreeValidity({ emitEvent: !1 });
      }
      _setUpFormContainer(e) {
        let n = this.form.get(e.path);
        Br(n, e), n.updateValueAndValidity({ emitEvent: !1 });
      }
      _cleanUpFormContainer(e) {
        if (this.form) {
          let n = this.form.get(e.path);
          n && el(n, e) && n.updateValueAndValidity({ emitEvent: !1 });
        }
      }
      _updateRegistrations() {
        this.form._registerOnCollectionChange(this._onCollectionChange),
          this._oldForm && this._oldForm._registerOnCollectionChange(() => {});
      }
      _updateValidators() {
        cn(this.form, this), this._oldForm && fi(this._oldForm, this);
      }
      _checkFormPresent() {
        this.form;
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(m(Se, 10), m(bi, 10), m(me, 8));
    }),
      (t.ɵdir = T({
        type: t,
        selectors: [['', 'formGroup', '']],
        hostBindings: function (n, o) {
          n & 1 &&
            H('submit', function (s) {
              return o.onSubmit(s);
            })('reset', function () {
              return o.onReset();
            });
        },
        inputs: { form: ['formGroup', 'form'] },
        outputs: { ngSubmit: 'ngSubmit' },
        exportAs: ['ngForm'],
        features: [tt([cl]), $, St],
      }));
    let i = t;
    return i;
  })();
var Gr = (() => {
  let t = class t {};
  (t.ɵfac = function (n) {
    return new (n || t)();
  }),
    (t.ɵmod = E({ type: t })),
    (t.ɵinj = C({ imports: [sl] }));
  let i = t;
  return i;
})();
var Qr = (() => {
    let t = class t {
      static withConfig(e) {
        return {
          ngModule: t,
          providers: [{ provide: me, useValue: e.callSetDisabledState ?? _i }],
        };
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵmod = E({ type: t })),
      (t.ɵinj = C({ imports: [Gr] }));
    let i = t;
    return i;
  })(),
  Wr = (() => {
    let t = class t {
      static withConfig(e) {
        return {
          ngModule: t,
          providers: [
            {
              provide: Hr,
              useValue: e.warnOnNgModelWithFormControl ?? 'always',
            },
            { provide: me, useValue: e.callSetDisabledState ?? _i },
          ],
        };
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵmod = E({ type: t })),
      (t.ɵinj = C({ imports: [Gr] }));
    let i = t;
    return i;
  })();
var fn;
try {
  fn = typeof Intl < 'u' && Intl.v8BreakIterator;
} catch {
  fn = !1;
}
var Z = (() => {
  let t = class t {
    constructor(e) {
      (this._platformId = e),
        (this.isBrowser = this._platformId
          ? ir(this._platformId)
          : typeof document == 'object' && !!document),
        (this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent)),
        (this.TRIDENT =
          this.isBrowser && /(msie|trident)/i.test(navigator.userAgent)),
        (this.BLINK =
          this.isBrowser &&
          !!(window.chrome || fn) &&
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
  (t.ɵfac = function (n) {
    return new (n || t)(I(Ho));
  }),
    (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
  let i = t;
  return i;
})();
var ue,
  Yr = [
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
function pn() {
  if (ue) return ue;
  if (typeof document != 'object' || !document) return (ue = new Set(Yr)), ue;
  let i = document.createElement('input');
  return (
    (ue = new Set(Yr.filter((t) => (i.setAttribute('type', t), i.type === t)))),
    ue
  );
}
var Le;
function ll() {
  if (Le == null && typeof window < 'u')
    try {
      window.addEventListener(
        'test',
        null,
        Object.defineProperty({}, 'passive', { get: () => (Le = !0) })
      );
    } finally {
      Le = Le || !1;
    }
  return Le;
}
function Ut(i) {
  return ll() ? i : !!i.capture;
}
var hn;
function ml() {
  if (hn == null) {
    let i = typeof document < 'u' ? document.head : null;
    hn = !!(i && (i.createShadowRoot || i.attachShadow));
  }
  return hn;
}
function Zr(i) {
  if (ml()) {
    let t = i.getRootNode ? i.getRootNode() : null;
    if (typeof ShadowRoot < 'u' && ShadowRoot && t instanceof ShadowRoot)
      return t;
  }
  return null;
}
function jt(i) {
  return i.composedPath ? i.composedPath()[0] : i.target;
}
function Xr() {
  return (
    (typeof __karma__ < 'u' && !!__karma__) ||
    (typeof jasmine < 'u' && !!jasmine) ||
    (typeof jest < 'u' && !!jest) ||
    (typeof Mocha < 'u' && !!Mocha)
  );
}
function ot(i) {
  return i != null && `${i}` != 'false';
}
function bt(i, t = 0) {
  return ul(i) ? Number(i) : t;
}
function ul(i) {
  return !isNaN(parseFloat(i)) && !isNaN(Number(i));
}
function bn(i) {
  return Array.isArray(i) ? i : [i];
}
function Mt(i) {
  return i instanceof A ? i.nativeElement : i;
}
var hl = (() => {
  let t = class t {
    create(e) {
      return typeof MutationObserver > 'u' ? null : new MutationObserver(e);
    }
  };
  (t.ɵfac = function (n) {
    return new (n || t)();
  }),
    (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
  let i = t;
  return i;
})();
var $r = (() => {
  let t = class t {};
  (t.ɵfac = function (n) {
    return new (n || t)();
  }),
    (t.ɵmod = E({ type: t })),
    (t.ɵinj = C({ providers: [hl] }));
  let i = t;
  return i;
})();
var Kr = new Set(),
  te,
  fl = (() => {
    let t = class t {
      constructor(e, n) {
        (this._platform = e),
          (this._nonce = n),
          (this._matchMedia =
            this._platform.isBrowser && window.matchMedia
              ? window.matchMedia.bind(window)
              : bl);
      }
      matchMedia(e) {
        return (
          (this._platform.WEBKIT || this._platform.BLINK) && pl(e, this._nonce),
          this._matchMedia(e)
        );
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(I(Z), I(Go, 8));
    }),
      (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let i = t;
    return i;
  })();
function pl(i, t) {
  if (!Kr.has(i))
    try {
      te ||
        ((te = document.createElement('style')),
        t && (te.nonce = t),
        te.setAttribute('type', 'text/css'),
        document.head.appendChild(te)),
        te.sheet &&
          (te.sheet.insertRule(`@media ${i} {body{ }}`, 0), Kr.add(i));
    } catch (r) {
      console.error(r);
    }
}
function bl(i) {
  return {
    matches: i === 'all' || i === '',
    media: i,
    addListener: () => {},
    removeListener: () => {},
  };
}
var ta = (() => {
  let t = class t {
    constructor(e, n) {
      (this._mediaMatcher = e),
        (this._zone = n),
        (this._queries = new Map()),
        (this._destroySubject = new nt());
    }
    ngOnDestroy() {
      this._destroySubject.next(), this._destroySubject.complete();
    }
    isMatched(e) {
      return Jr(bn(e)).some((o) => this._registerQuery(o).mql.matches);
    }
    observe(e) {
      let o = Jr(bn(e)).map((s) => this._registerQuery(s).observable),
        a = So(o);
      return (
        (a = Ro(a.pipe(Ee(1)), a.pipe(Je(1), Xi(0)))),
        a.pipe(
          vt((s) => {
            let d = { matches: !1, breakpoints: {} };
            return (
              s.forEach(({ matches: c, query: l }) => {
                (d.matches = d.matches || c), (d.breakpoints[l] = c);
              }),
              d
            );
          })
        )
      );
    }
    _registerQuery(e) {
      if (this._queries.has(e)) return this._queries.get(e);
      let n = this._mediaMatcher.matchMedia(e),
        a = {
          observable: new $e((s) => {
            let d = (c) => this._zone.run(() => s.next(c));
            return (
              n.addListener(d),
              () => {
                n.removeListener(d);
              }
            );
          }).pipe(
            Uo(n),
            vt(({ matches: s }) => ({ query: e, matches: s })),
            Et(this._destroySubject)
          ),
          mql: n,
        };
      return this._queries.set(e, a), a;
    }
  };
  (t.ɵfac = function (n) {
    return new (n || t)(I(fl), I(S));
  }),
    (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
  let i = t;
  return i;
})();
function Jr(i) {
  return i
    .map((t) => t.split(','))
    .reduce((t, r) => t.concat(r))
    .map((t) => t.trim());
}
function _n(i) {
  return i.buttons === 0 || i.detail === 0;
}
function vn(i) {
  let t =
    (i.touches && i.touches[0]) || (i.changedTouches && i.changedTouches[0]);
  return (
    !!t &&
    t.identifier === -1 &&
    (t.radiusX == null || t.radiusX === 1) &&
    (t.radiusY == null || t.radiusY === 1)
  );
}
var gl = new y('cdk-input-modality-detector-options'),
  _l = { ignoreKeys: [18, 17, 224, 91, 16] },
  na = 650,
  he = Ut({ passive: !0, capture: !0 }),
  vl = (() => {
    let t = class t {
      get mostRecentModality() {
        return this._modality.value;
      }
      constructor(e, n, o, a) {
        (this._platform = e),
          (this._mostRecentTarget = null),
          (this._modality = new To(null)),
          (this._lastTouchMs = 0),
          (this._onKeydown = (s) => {
            this._options?.ignoreKeys?.some((d) => d === s.keyCode) ||
              (this._modality.next('keyboard'),
              (this._mostRecentTarget = jt(s)));
          }),
          (this._onMousedown = (s) => {
            Date.now() - this._lastTouchMs < na ||
              (this._modality.next(_n(s) ? 'keyboard' : 'mouse'),
              (this._mostRecentTarget = jt(s)));
          }),
          (this._onTouchstart = (s) => {
            if (vn(s)) {
              this._modality.next('keyboard');
              return;
            }
            (this._lastTouchMs = Date.now()),
              this._modality.next('touch'),
              (this._mostRecentTarget = jt(s));
          }),
          (this._options = G(G({}, _l), a)),
          (this.modalityDetected = this._modality.pipe(Je(1))),
          (this.modalityChanged = this.modalityDetected.pipe(Vo())),
          e.isBrowser &&
            n.runOutsideAngular(() => {
              o.addEventListener('keydown', this._onKeydown, he),
                o.addEventListener('mousedown', this._onMousedown, he),
                o.addEventListener('touchstart', this._onTouchstart, he);
            });
      }
      ngOnDestroy() {
        this._modality.complete(),
          this._platform.isBrowser &&
            (document.removeEventListener('keydown', this._onKeydown, he),
            document.removeEventListener('mousedown', this._onMousedown, he),
            document.removeEventListener('touchstart', this._onTouchstart, he));
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(I(Z), I(S), I(pt), I(gl, 8));
    }),
      (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let i = t;
    return i;
  })();
var xl = new y('cdk-focus-monitor-default-options'),
  vi = Ut({ passive: !0, capture: !0 }),
  xi = (() => {
    let t = class t {
      constructor(e, n, o, a, s) {
        (this._ngZone = e),
          (this._platform = n),
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
          (this._stopInputModalityDetector = new nt()),
          (this._rootNodeFocusAndBlurListener = (d) => {
            let c = jt(d);
            for (let l = c; l; l = l.parentElement)
              d.type === 'focus' ? this._onFocus(d, l) : this._onBlur(d, l);
          }),
          (this._document = a),
          (this._detectionMode = s?.detectionMode || 0);
      }
      monitor(e, n = !1) {
        let o = Mt(e);
        if (!this._platform.isBrowser || o.nodeType !== 1) return Dt();
        let a = Zr(o) || this._getDocument(),
          s = this._elementInfo.get(o);
        if (s) return n && (s.checkChildren = !0), s.subject;
        let d = { checkChildren: n, subject: new nt(), rootNode: a };
        return (
          this._elementInfo.set(o, d),
          this._registerGlobalListeners(d),
          d.subject
        );
      }
      stopMonitoring(e) {
        let n = Mt(e),
          o = this._elementInfo.get(n);
        o &&
          (o.subject.complete(),
          this._setClasses(n),
          this._elementInfo.delete(n),
          this._removeGlobalListeners(o));
      }
      focusVia(e, n, o) {
        let a = Mt(e),
          s = this._getDocument().activeElement;
        a === s
          ? this._getClosestElementsInfo(a).forEach(([d, c]) =>
              this._originChanged(d, n, c)
            )
          : (this._setOrigin(n), typeof a.focus == 'function' && a.focus(o));
      }
      ngOnDestroy() {
        this._elementInfo.forEach((e, n) => this.stopMonitoring(n));
      }
      _getDocument() {
        return this._document || document;
      }
      _getWindow() {
        return this._getDocument().defaultView || window;
      }
      _getFocusOrigin(e) {
        return this._origin
          ? this._originFromTouchInteraction
            ? this._shouldBeAttributedToTouch(e)
              ? 'touch'
              : 'program'
            : this._origin
          : this._windowFocused && this._lastFocusOrigin
          ? this._lastFocusOrigin
          : e && this._isLastInteractionFromInputLabel(e)
          ? 'mouse'
          : 'program';
      }
      _shouldBeAttributedToTouch(e) {
        return (
          this._detectionMode === 1 ||
          !!e?.contains(this._inputModalityDetector._mostRecentTarget)
        );
      }
      _setClasses(e, n) {
        e.classList.toggle('cdk-focused', !!n),
          e.classList.toggle('cdk-touch-focused', n === 'touch'),
          e.classList.toggle('cdk-keyboard-focused', n === 'keyboard'),
          e.classList.toggle('cdk-mouse-focused', n === 'mouse'),
          e.classList.toggle('cdk-program-focused', n === 'program');
      }
      _setOrigin(e, n = !1) {
        this._ngZone.runOutsideAngular(() => {
          if (
            ((this._origin = e),
            (this._originFromTouchInteraction = e === 'touch' && n),
            this._detectionMode === 0)
          ) {
            clearTimeout(this._originTimeoutId);
            let o = this._originFromTouchInteraction ? na : 1;
            this._originTimeoutId = setTimeout(() => (this._origin = null), o);
          }
        });
      }
      _onFocus(e, n) {
        let o = this._elementInfo.get(n),
          a = jt(e);
        !o ||
          (!o.checkChildren && n !== a) ||
          this._originChanged(n, this._getFocusOrigin(a), o);
      }
      _onBlur(e, n) {
        let o = this._elementInfo.get(n);
        !o ||
          (o.checkChildren &&
            e.relatedTarget instanceof Node &&
            n.contains(e.relatedTarget)) ||
          (this._setClasses(n), this._emitOrigin(o, null));
      }
      _emitOrigin(e, n) {
        e.subject.observers.length && this._ngZone.run(() => e.subject.next(n));
      }
      _registerGlobalListeners(e) {
        if (!this._platform.isBrowser) return;
        let n = e.rootNode,
          o = this._rootNodeFocusListenerCount.get(n) || 0;
        o ||
          this._ngZone.runOutsideAngular(() => {
            n.addEventListener('focus', this._rootNodeFocusAndBlurListener, vi),
              n.addEventListener(
                'blur',
                this._rootNodeFocusAndBlurListener,
                vi
              );
          }),
          this._rootNodeFocusListenerCount.set(n, o + 1),
          ++this._monitoredElementCount === 1 &&
            (this._ngZone.runOutsideAngular(() => {
              this._getWindow().addEventListener(
                'focus',
                this._windowFocusListener
              );
            }),
            this._inputModalityDetector.modalityDetected
              .pipe(Et(this._stopInputModalityDetector))
              .subscribe((a) => {
                this._setOrigin(a, !0);
              }));
      }
      _removeGlobalListeners(e) {
        let n = e.rootNode;
        if (this._rootNodeFocusListenerCount.has(n)) {
          let o = this._rootNodeFocusListenerCount.get(n);
          o > 1
            ? this._rootNodeFocusListenerCount.set(n, o - 1)
            : (n.removeEventListener(
                'focus',
                this._rootNodeFocusAndBlurListener,
                vi
              ),
              n.removeEventListener(
                'blur',
                this._rootNodeFocusAndBlurListener,
                vi
              ),
              this._rootNodeFocusListenerCount.delete(n));
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
      _originChanged(e, n, o) {
        this._setClasses(e, n),
          this._emitOrigin(o, n),
          (this._lastFocusOrigin = n);
      }
      _getClosestElementsInfo(e) {
        let n = [];
        return (
          this._elementInfo.forEach((o, a) => {
            (a === e || (o.checkChildren && a.contains(e))) && n.push([a, o]);
          }),
          n
        );
      }
      _isLastInteractionFromInputLabel(e) {
        let { _mostRecentTarget: n, mostRecentModality: o } =
          this._inputModalityDetector;
        if (
          o !== 'mouse' ||
          !n ||
          n === e ||
          (e.nodeName !== 'INPUT' && e.nodeName !== 'TEXTAREA') ||
          e.disabled
        )
          return !1;
        let a = e.labels;
        if (a) {
          for (let s = 0; s < a.length; s++) if (a[s].contains(n)) return !0;
        }
        return !1;
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(I(S), I(Z), I(vl), I(pt, 8), I(xl, 8));
    }),
      (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let i = t;
    return i;
  })();
var ea = 'cdk-high-contrast-black-on-white',
  ia = 'cdk-high-contrast-white-on-black',
  gn = 'cdk-high-contrast-active',
  oa = (() => {
    let t = class t {
      constructor(e, n) {
        (this._platform = e),
          (this._document = n),
          (this._breakpointSubscription = O(ta)
            .observe('(forced-colors: active)')
            .subscribe(() => {
              this._hasCheckedHighContrastMode &&
                ((this._hasCheckedHighContrastMode = !1),
                this._applyBodyHighContrastModeCssClasses());
            }));
      }
      getHighContrastMode() {
        if (!this._platform.isBrowser) return 0;
        let e = this._document.createElement('div');
        (e.style.backgroundColor = 'rgb(1,2,3)'),
          (e.style.position = 'absolute'),
          this._document.body.appendChild(e);
        let n = this._document.defaultView || window,
          o = n && n.getComputedStyle ? n.getComputedStyle(e) : null,
          a = ((o && o.backgroundColor) || '').replace(/ /g, '');
        switch ((e.remove(), a)) {
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
          let e = this._document.body.classList;
          e.remove(gn, ea, ia), (this._hasCheckedHighContrastMode = !0);
          let n = this.getHighContrastMode();
          n === 1 ? e.add(gn, ea) : n === 2 && e.add(gn, ia);
        }
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(I(Z), I(pt));
    }),
      (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let i = t;
    return i;
  })();
var yl = new y('cdk-dir-doc', { providedIn: 'root', factory: kl });
function kl() {
  return O(pt);
}
var wl =
  /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
function Cl(i) {
  let t = i?.toLowerCase() || '';
  return t === 'auto' && typeof navigator < 'u' && navigator?.language
    ? wl.test(navigator.language)
      ? 'rtl'
      : 'ltr'
    : t === 'rtl'
    ? 'rtl'
    : 'ltr';
}
var yi = (() => {
  let t = class t {
    constructor(e) {
      if (((this.value = 'ltr'), (this.change = new z()), e)) {
        let n = e.body ? e.body.dir : null,
          o = e.documentElement ? e.documentElement.dir : null;
        this.value = Cl(n || o || 'ltr');
      }
    }
    ngOnDestroy() {
      this.change.complete();
    }
  };
  (t.ɵfac = function (n) {
    return new (n || t)(I(yl, 8));
  }),
    (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
  let i = t;
  return i;
})();
var xn = (() => {
  let t = class t {};
  (t.ɵfac = function (n) {
    return new (n || t)();
  }),
    (t.ɵmod = E({ type: t })),
    (t.ɵinj = C({}));
  let i = t;
  return i;
})();
function El() {
  return !0;
}
var Il = new y('mat-sanity-checks', { providedIn: 'root', factory: El }),
  j = (() => {
    let t = class t {
      constructor(e, n, o) {
        (this._sanityChecks = n),
          (this._document = o),
          (this._hasDoneGlobalChecks = !1),
          e._applyBodyHighContrastModeCssClasses(),
          this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0);
      }
      _checkIsEnabled(e) {
        return Xr()
          ? !1
          : typeof this._sanityChecks == 'boolean'
          ? this._sanityChecks
          : !!this._sanityChecks[e];
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(I(oa), I(Il, 8), I(pt));
    }),
      (t.ɵmod = E({ type: t })),
      (t.ɵinj = C({ imports: [xn, xn] }));
    let i = t;
    return i;
  })();
function wi(i, t) {
  return class extends i {
    get color() {
      return this._color;
    }
    set color(r) {
      let e = r || this.defaultColor;
      e !== this._color &&
        (this._color &&
          this._elementRef.nativeElement.classList.remove(`mat-${this._color}`),
        e && this._elementRef.nativeElement.classList.add(`mat-${e}`),
        (this._color = e));
    }
    constructor(...r) {
      super(...r), (this.defaultColor = t), (this.color = t);
    }
  };
}
function pa(i) {
  return class extends i {
    get disableRipple() {
      return this._disableRipple;
    }
    set disableRipple(t) {
      this._disableRipple = ot(t);
    }
    constructor(...t) {
      super(...t), (this._disableRipple = !1);
    }
  };
}
function ba(i) {
  return class extends i {
    updateErrorState() {
      let t = this.errorState,
        r = this._parentFormGroup || this._parentForm,
        e = this.errorStateMatcher || this._defaultErrorStateMatcher,
        n = this.ngControl ? this.ngControl.control : null,
        o = e.isErrorState(n, r);
      o !== t && ((this.errorState = o), this.stateChanges.next());
    }
    constructor(...t) {
      super(...t), (this.errorState = !1);
    }
  };
}
var ga = (() => {
  let t = class t {
    isErrorState(e, n) {
      return !!(e && e.invalid && (e.touched || (n && n.submitted)));
    }
  };
  (t.ɵfac = function (n) {
    return new (n || t)();
  }),
    (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
  let i = t;
  return i;
})();
var wn = class {
    constructor(t, r, e, n = !1) {
      (this._renderer = t),
        (this.element = r),
        (this.config = e),
        (this._animationForciblyDisabledThroughCss = n),
        (this.state = 3);
    }
    fadeOut() {
      this._renderer.fadeOutRipple(this);
    }
  },
  sa = Ut({ passive: !0, capture: !0 }),
  Cn = class {
    constructor() {
      (this._events = new Map()),
        (this._delegateEventHandler = (t) => {
          let r = jt(t);
          r &&
            this._events.get(t.type)?.forEach((e, n) => {
              (n === r || n.contains(r)) && e.forEach((o) => o.handleEvent(t));
            });
        });
    }
    addHandler(t, r, e, n) {
      let o = this._events.get(r);
      if (o) {
        let a = o.get(e);
        a ? a.add(n) : o.set(e, new Set([n]));
      } else
        this._events.set(r, new Map([[e, new Set([n])]])),
          t.runOutsideAngular(() => {
            document.addEventListener(r, this._delegateEventHandler, sa);
          });
    }
    removeHandler(t, r, e) {
      let n = this._events.get(t);
      if (!n) return;
      let o = n.get(r);
      o &&
        (o.delete(e),
        o.size === 0 && n.delete(r),
        n.size === 0 &&
          (this._events.delete(t),
          document.removeEventListener(t, this._delegateEventHandler, sa)));
    }
  },
  da = { enterDuration: 225, exitDuration: 150 },
  Ml = 800,
  ca = Ut({ passive: !0, capture: !0 }),
  la = ['mousedown', 'touchstart'],
  ma = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'],
  Ve = class Ve {
    constructor(t, r, e, n) {
      (this._target = t),
        (this._ngZone = r),
        (this._platform = n),
        (this._isPointerDown = !1),
        (this._activeRipples = new Map()),
        (this._pointerUpEventsRegistered = !1),
        n.isBrowser && (this._containerElement = Mt(e));
    }
    fadeInRipple(t, r, e = {}) {
      let n = (this._containerRect =
          this._containerRect ||
          this._containerElement.getBoundingClientRect()),
        o = G(G({}, da), e.animation);
      e.centered && ((t = n.left + n.width / 2), (r = n.top + n.height / 2));
      let a = e.radius || Tl(t, r, n),
        s = t - n.left,
        d = r - n.top,
        c = o.enterDuration,
        l = document.createElement('div');
      l.classList.add('mat-ripple-element'),
        (l.style.left = `${s - a}px`),
        (l.style.top = `${d - a}px`),
        (l.style.height = `${a * 2}px`),
        (l.style.width = `${a * 2}px`),
        e.color != null && (l.style.backgroundColor = e.color),
        (l.style.transitionDuration = `${c}ms`),
        this._containerElement.appendChild(l);
      let u = window.getComputedStyle(l),
        h = u.transitionProperty,
        b = u.transitionDuration,
        v =
          h === 'none' ||
          b === '0s' ||
          b === '0s, 0s' ||
          (n.width === 0 && n.height === 0),
        x = new wn(this, l, e, v);
      (l.style.transform = 'scale3d(1, 1, 1)'),
        (x.state = 0),
        e.persistent || (this._mostRecentTransientRipple = x);
      let _ = null;
      return (
        !v &&
          (c || o.exitDuration) &&
          this._ngZone.runOutsideAngular(() => {
            let R = () => this._finishRippleTransition(x),
              se = () => this._destroyRipple(x);
            l.addEventListener('transitionend', R),
              l.addEventListener('transitioncancel', se),
              (_ = { onTransitionEnd: R, onTransitionCancel: se });
          }),
        this._activeRipples.set(x, _),
        (v || !c) && this._finishRippleTransition(x),
        x
      );
    }
    fadeOutRipple(t) {
      if (t.state === 2 || t.state === 3) return;
      let r = t.element,
        e = G(G({}, da), t.config.animation);
      (r.style.transitionDuration = `${e.exitDuration}ms`),
        (r.style.opacity = '0'),
        (t.state = 2),
        (t._animationForciblyDisabledThroughCss || !e.exitDuration) &&
          this._finishRippleTransition(t);
    }
    fadeOutAll() {
      this._getActiveRipples().forEach((t) => t.fadeOut());
    }
    fadeOutAllNonPersistent() {
      this._getActiveRipples().forEach((t) => {
        t.config.persistent || t.fadeOut();
      });
    }
    setupTriggerEvents(t) {
      let r = Mt(t);
      !this._platform.isBrowser ||
        !r ||
        r === this._triggerElement ||
        (this._removeTriggerEvents(),
        (this._triggerElement = r),
        la.forEach((e) => {
          Ve._eventManager.addHandler(this._ngZone, e, r, this);
        }));
    }
    handleEvent(t) {
      t.type === 'mousedown'
        ? this._onMousedown(t)
        : t.type === 'touchstart'
        ? this._onTouchStart(t)
        : this._onPointerUp(),
        this._pointerUpEventsRegistered ||
          (this._ngZone.runOutsideAngular(() => {
            ma.forEach((r) => {
              this._triggerElement.addEventListener(r, this, ca);
            });
          }),
          (this._pointerUpEventsRegistered = !0));
    }
    _finishRippleTransition(t) {
      t.state === 0
        ? this._startFadeOutTransition(t)
        : t.state === 2 && this._destroyRipple(t);
    }
    _startFadeOutTransition(t) {
      let r = t === this._mostRecentTransientRipple,
        { persistent: e } = t.config;
      (t.state = 1), !e && (!r || !this._isPointerDown) && t.fadeOut();
    }
    _destroyRipple(t) {
      let r = this._activeRipples.get(t) ?? null;
      this._activeRipples.delete(t),
        this._activeRipples.size || (this._containerRect = null),
        t === this._mostRecentTransientRipple &&
          (this._mostRecentTransientRipple = null),
        (t.state = 3),
        r !== null &&
          (t.element.removeEventListener('transitionend', r.onTransitionEnd),
          t.element.removeEventListener(
            'transitioncancel',
            r.onTransitionCancel
          )),
        t.element.remove();
    }
    _onMousedown(t) {
      let r = _n(t),
        e =
          this._lastTouchStartEvent &&
          Date.now() < this._lastTouchStartEvent + Ml;
      !this._target.rippleDisabled &&
        !r &&
        !e &&
        ((this._isPointerDown = !0),
        this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
    }
    _onTouchStart(t) {
      if (!this._target.rippleDisabled && !vn(t)) {
        (this._lastTouchStartEvent = Date.now()), (this._isPointerDown = !0);
        let r = t.changedTouches;
        if (r)
          for (let e = 0; e < r.length; e++)
            this.fadeInRipple(
              r[e].clientX,
              r[e].clientY,
              this._target.rippleConfig
            );
      }
    }
    _onPointerUp() {
      this._isPointerDown &&
        ((this._isPointerDown = !1),
        this._getActiveRipples().forEach((t) => {
          let r =
            t.state === 1 || (t.config.terminateOnPointerUp && t.state === 0);
          !t.config.persistent && r && t.fadeOut();
        }));
    }
    _getActiveRipples() {
      return Array.from(this._activeRipples.keys());
    }
    _removeTriggerEvents() {
      let t = this._triggerElement;
      t &&
        (la.forEach((r) => Ve._eventManager.removeHandler(r, t, this)),
        this._pointerUpEventsRegistered &&
          ma.forEach((r) => t.removeEventListener(r, this, ca)));
    }
  };
Ve._eventManager = new Cn();
var En = Ve;
function Tl(i, t, r) {
  let e = Math.max(Math.abs(i - r.left), Math.abs(i - r.right)),
    n = Math.max(Math.abs(t - r.top), Math.abs(t - r.bottom));
  return Math.sqrt(e * e + n * n);
}
var Ci = new y('mat-ripple-global-options'),
  wt = (() => {
    let t = class t {
      get disabled() {
        return this._disabled;
      }
      set disabled(e) {
        e && this.fadeOutAllNonPersistent(),
          (this._disabled = e),
          this._setupTriggerEventsIfEnabled();
      }
      get trigger() {
        return this._trigger || this._elementRef.nativeElement;
      }
      set trigger(e) {
        (this._trigger = e), this._setupTriggerEventsIfEnabled();
      }
      constructor(e, n, o, a, s) {
        (this._elementRef = e),
          (this._animationMode = s),
          (this.radius = 0),
          (this._disabled = !1),
          (this._isInitialized = !1),
          (this._globalOptions = a || {}),
          (this._rippleRenderer = new En(this, n, e, o));
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
          animation: G(
            G(
              G({}, this._globalOptions.animation),
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
      launch(e, n = 0, o) {
        return typeof e == 'number'
          ? this._rippleRenderer.fadeInRipple(
              e,
              n,
              G(G({}, this.rippleConfig), o)
            )
          : this._rippleRenderer.fadeInRipple(
              0,
              0,
              G(G({}, this.rippleConfig), e)
            );
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(m(A), m(S), m(Z), m(Ci, 8), m(ut, 8));
    }),
      (t.ɵdir = T({
        type: t,
        selectors: [
          ['', 'mat-ripple', ''],
          ['', 'matRipple', ''],
        ],
        hostAttrs: [1, 'mat-ripple'],
        hostVars: 2,
        hostBindings: function (n, o) {
          n & 2 && M('mat-ripple-unbounded', o.unbounded);
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
    let i = t;
    return i;
  })(),
  zt = (() => {
    let t = class t {};
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵmod = E({ type: t })),
      (t.ɵinj = C({ imports: [j, j] }));
    let i = t;
    return i;
  })();
var ua = { capture: !0 },
  ha = ['focus', 'click', 'mouseenter', 'touchstart'],
  yn = 'mat-ripple-loader-uninitialized',
  kn = 'mat-ripple-loader-class-name',
  fa = 'mat-ripple-loader-centered',
  ki = 'mat-ripple-loader-disabled',
  _a = (() => {
    let t = class t {
      constructor() {
        (this._document = O(pt, { optional: !0 })),
          (this._animationMode = O(ut, { optional: !0 })),
          (this._globalRippleOptions = O(Ci, { optional: !0 })),
          (this._platform = O(Z)),
          (this._ngZone = O(S)),
          (this._hosts = new Map()),
          (this._onInteraction = (e) => {
            if (!(e.target instanceof HTMLElement)) return;
            let o = e.target.closest(`[${yn}]`);
            o && this._createRipple(o);
          }),
          this._ngZone.runOutsideAngular(() => {
            for (let e of ha)
              this._document?.addEventListener(e, this._onInteraction, ua);
          });
      }
      ngOnDestroy() {
        let e = this._hosts.keys();
        for (let n of e) this.destroyRipple(n);
        for (let n of ha)
          this._document?.removeEventListener(n, this._onInteraction, ua);
      }
      configureRipple(e, n) {
        e.setAttribute(yn, ''),
          (n.className || !e.hasAttribute(kn)) &&
            e.setAttribute(kn, n.className || ''),
          n.centered && e.setAttribute(fa, ''),
          n.disabled && e.setAttribute(ki, '');
      }
      getRipple(e) {
        return this._hosts.get(e) || this._createRipple(e);
      }
      setDisabled(e, n) {
        let o = this._hosts.get(e);
        if (o) {
          o.disabled = n;
          return;
        }
        n ? e.setAttribute(ki, '') : e.removeAttribute(ki);
      }
      _createRipple(e) {
        if (!this._document) return;
        let n = this._hosts.get(e);
        if (n) return n;
        e.querySelector('.mat-ripple')?.remove();
        let o = this._document.createElement('span');
        o.classList.add('mat-ripple', e.getAttribute(kn)), e.append(o);
        let a = new wt(
          new A(o),
          this._ngZone,
          this._platform,
          this._globalRippleOptions ? this._globalRippleOptions : void 0,
          this._animationMode ? this._animationMode : void 0
        );
        return (
          (a._isInitialized = !0),
          (a.trigger = e),
          (a.centered = e.hasAttribute(fa)),
          (a.disabled = e.hasAttribute(ki)),
          this.attachRipple(e, a),
          a
        );
      }
      attachRipple(e, n) {
        e.removeAttribute(yn), this._hosts.set(e, n);
      }
      destroyRipple(e) {
        let n = this._hosts.get(e);
        n && (n.ngOnDestroy(), this._hosts.delete(e));
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let i = t;
    return i;
  })();
var Al = ['mat-button', ''],
  In = [
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
  Mn = [
    '.material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])',
    '*',
    '.material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]',
  ],
  Fl =
    '.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity, 0);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button{position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;overflow:visible;vertical-align:middle;background:rgba(0,0,0,0)}.mdc-button .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button[hidden]{display:none}.mdc-button .mdc-button__icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top}[dir=rtl] .mdc-button .mdc-button__icon,.mdc-button .mdc-button__icon[dir=rtl]{margin-left:8px;margin-right:0}.mdc-button .mdc-button__progress-indicator{font-size:0;position:absolute;transform:translate(-50%, -50%);top:50%;left:50%;line-height:initial}.mdc-button .mdc-button__label{position:relative}.mdc-button .mdc-button__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px);display:none}@media screen and (forced-colors: active){.mdc-button .mdc-button__focus-ring{border-color:CanvasText}}.mdc-button .mdc-button__focus-ring::after{content:"";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-button .mdc-button__focus-ring::after{border-color:CanvasText}}@media screen and (forced-colors: active){.mdc-button.mdc-ripple-upgraded--background-focused .mdc-button__focus-ring,.mdc-button:not(.mdc-ripple-upgraded):focus .mdc-button__focus-ring{display:block}}.mdc-button .mdc-button__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mdc-button__label+.mdc-button__icon{margin-left:8px;margin-right:0}[dir=rtl] .mdc-button__label+.mdc-button__icon,.mdc-button__label+.mdc-button__icon[dir=rtl]{margin-left:0;margin-right:8px}svg.mdc-button__icon{fill:currentColor}.mdc-button--touch{margin-top:6px;margin-bottom:6px}.mdc-button{padding:0 8px 0 8px}.mdc-button--unelevated{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--unelevated.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--unelevated.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--raised{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);padding:0 16px 0 16px}.mdc-button--raised.mdc-button--icon-trailing{padding:0 12px 0 16px}.mdc-button--raised.mdc-button--icon-leading{padding:0 16px 0 12px}.mdc-button--outlined{border-style:solid;transition:border 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-button--outlined .mdc-button__ripple{border-style:solid;border-color:rgba(0,0,0,0)}.mat-mdc-button{font-family:var(--mdc-text-button-label-text-font);font-size:var(--mdc-text-button-label-text-size);letter-spacing:var(--mdc-text-button-label-text-tracking);font-weight:var(--mdc-text-button-label-text-weight);text-transform:var(--mdc-text-button-label-text-transform);height:var(--mdc-text-button-container-height);border-radius:var(--mdc-text-button-container-shape);--mdc-text-button-container-shape:4px;--mdc-text-button-container-height:36px;--mdc-text-button-keep-touch-target:false}.mat-mdc-button:not(:disabled){color:var(--mdc-text-button-label-text-color)}.mat-mdc-button:disabled{color:var(--mdc-text-button-disabled-label-text-color)}.mat-mdc-button .mdc-button__ripple{border-radius:var(--mdc-text-button-container-shape)}.mat-mdc-button .mat-ripple-element{background-color:var(--mat-text-button-ripple-color)}.mat-mdc-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-text-button-state-layer-color)}.mat-mdc-button:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-text-button-hover-state-layer-opacity)}.mat-mdc-button.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-button.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-text-button-focus-state-layer-opacity)}.mat-mdc-button:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-text-button-pressed-state-layer-opacity)}.mat-mdc-button[disabled]{cursor:default;pointer-events:none;color:var(--mdc-text-button-disabled-label-text-color)}.mat-mdc-unelevated-button{font-family:var(--mdc-filled-button-label-text-font);font-size:var(--mdc-filled-button-label-text-size);letter-spacing:var(--mdc-filled-button-label-text-tracking);font-weight:var(--mdc-filled-button-label-text-weight);text-transform:var(--mdc-filled-button-label-text-transform);height:var(--mdc-filled-button-container-height);border-radius:var(--mdc-filled-button-container-shape);--mdc-filled-button-container-shape:4px;--mdc-filled-button-container-elevation:0;--mdc-filled-button-disabled-container-elevation:0;--mdc-filled-button-focus-container-elevation:0;--mdc-filled-button-hover-container-elevation:0;--mdc-filled-button-keep-touch-target:false;--mdc-filled-button-pressed-container-elevation:0}.mat-mdc-unelevated-button:not(:disabled){background-color:var(--mdc-filled-button-container-color)}.mat-mdc-unelevated-button:disabled{background-color:var(--mdc-filled-button-disabled-container-color)}.mat-mdc-unelevated-button:not(:disabled){color:var(--mdc-filled-button-label-text-color)}.mat-mdc-unelevated-button:disabled{color:var(--mdc-filled-button-disabled-label-text-color)}.mat-mdc-unelevated-button .mdc-button__ripple{border-radius:var(--mdc-filled-button-container-shape)}.mat-mdc-unelevated-button .mat-ripple-element{background-color:var(--mat-filled-button-ripple-color)}.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-filled-button-state-layer-color)}.mat-mdc-unelevated-button:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-filled-button-hover-state-layer-opacity)}.mat-mdc-unelevated-button.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-filled-button-focus-state-layer-opacity)}.mat-mdc-unelevated-button:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-filled-button-pressed-state-layer-opacity)}.mat-mdc-unelevated-button[disabled]{cursor:default;pointer-events:none;color:var(--mdc-filled-button-disabled-label-text-color);background-color:var(--mdc-filled-button-disabled-container-color)}.mat-mdc-raised-button{font-family:var(--mdc-protected-button-label-text-font);font-size:var(--mdc-protected-button-label-text-size);letter-spacing:var(--mdc-protected-button-label-text-tracking);font-weight:var(--mdc-protected-button-label-text-weight);text-transform:var(--mdc-protected-button-label-text-transform);height:var(--mdc-protected-button-container-height);border-radius:var(--mdc-protected-button-container-shape);--mdc-protected-button-container-shape:4px;--mdc-protected-button-keep-touch-target:false}.mat-mdc-raised-button:not(:disabled){background-color:var(--mdc-protected-button-container-color)}.mat-mdc-raised-button:disabled{background-color:var(--mdc-protected-button-disabled-container-color)}.mat-mdc-raised-button:not(:disabled){color:var(--mdc-protected-button-label-text-color)}.mat-mdc-raised-button:disabled{color:var(--mdc-protected-button-disabled-label-text-color)}.mat-mdc-raised-button .mdc-button__ripple{border-radius:var(--mdc-protected-button-container-shape)}.mat-mdc-raised-button .mat-ripple-element{background-color:var(--mat-protected-button-ripple-color)}.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-protected-button-state-layer-color)}.mat-mdc-raised-button:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-protected-button-hover-state-layer-opacity)}.mat-mdc-raised-button.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-protected-button-focus-state-layer-opacity)}.mat-mdc-raised-button:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-protected-button-pressed-state-layer-opacity)}.mat-mdc-raised-button[disabled]{cursor:default;pointer-events:none;color:var(--mdc-protected-button-disabled-label-text-color);background-color:var(--mdc-protected-button-disabled-container-color)}.mat-mdc-raised-button[disabled][disabled]{box-shadow:none}.mat-mdc-outlined-button{font-family:var(--mdc-outlined-button-label-text-font);font-size:var(--mdc-outlined-button-label-text-size);letter-spacing:var(--mdc-outlined-button-label-text-tracking);font-weight:var(--mdc-outlined-button-label-text-weight);text-transform:var(--mdc-outlined-button-label-text-transform);height:var(--mdc-outlined-button-container-height);border-radius:var(--mdc-outlined-button-container-shape);padding:0 15px 0 15px;border-width:var(--mdc-outlined-button-outline-width);--mdc-outlined-button-keep-touch-target:false;--mdc-outlined-button-outline-width:1px;--mdc-outlined-button-container-shape:4px}.mat-mdc-outlined-button:not(:disabled){color:var(--mdc-outlined-button-label-text-color)}.mat-mdc-outlined-button:disabled{color:var(--mdc-outlined-button-disabled-label-text-color)}.mat-mdc-outlined-button .mdc-button__ripple{border-radius:var(--mdc-outlined-button-container-shape)}.mat-mdc-outlined-button:not(:disabled){border-color:var(--mdc-outlined-button-outline-color)}.mat-mdc-outlined-button:disabled{border-color:var(--mdc-outlined-button-disabled-outline-color)}.mat-mdc-outlined-button.mdc-button--icon-trailing{padding:0 11px 0 15px}.mat-mdc-outlined-button.mdc-button--icon-leading{padding:0 15px 0 11px}.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border-width:var(--mdc-outlined-button-outline-width)}.mat-mdc-outlined-button .mdc-button__touch{left:calc(-1 * var(--mdc-outlined-button-outline-width));width:calc(100% + 2 * var(--mdc-outlined-button-outline-width))}.mat-mdc-outlined-button .mat-ripple-element{background-color:var(--mat-outlined-button-ripple-color)}.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-outlined-button-state-layer-color)}.mat-mdc-outlined-button:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-outlined-button-hover-state-layer-opacity)}.mat-mdc-outlined-button.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-outlined-button-focus-state-layer-opacity)}.mat-mdc-outlined-button:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-outlined-button-pressed-state-layer-opacity)}.mat-mdc-outlined-button[disabled]{cursor:default;pointer-events:none;color:var(--mdc-outlined-button-disabled-label-text-color);border-color:var(--mdc-outlined-button-disabled-outline-color)}.mat-mdc-button-base{text-decoration:none}.mat-mdc-button,.mat-mdc-unelevated-button,.mat-mdc-raised-button,.mat-mdc-outlined-button{-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-button .mdc-button__label,.mat-mdc-unelevated-button .mdc-button__label,.mat-mdc-raised-button .mdc-button__label,.mat-mdc-outlined-button .mdc-button__label{z-index:1}.mat-mdc-button .mat-mdc-focus-indicator,.mat-mdc-unelevated-button .mat-mdc-focus-indicator,.mat-mdc-raised-button .mat-mdc-focus-indicator,.mat-mdc-outlined-button .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-unelevated-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-raised-button:focus .mat-mdc-focus-indicator::before,.mat-mdc-outlined-button:focus .mat-mdc-focus-indicator::before{content:""}.mat-mdc-button .mat-mdc-button-touch-target,.mat-mdc-unelevated-button .mat-mdc-button-touch-target,.mat-mdc-raised-button .mat-mdc-button-touch-target,.mat-mdc-outlined-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}.mat-mdc-button._mat-animation-noopable,.mat-mdc-unelevated-button._mat-animation-noopable,.mat-mdc-raised-button._mat-animation-noopable,.mat-mdc-outlined-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-button>.mat-icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem}[dir=rtl] .mat-mdc-button>.mat-icon,.mat-mdc-button>.mat-icon[dir=rtl]{margin-left:8px;margin-right:0}.mat-mdc-button .mdc-button__label+.mat-icon{margin-left:8px;margin-right:0}[dir=rtl] .mat-mdc-button .mdc-button__label+.mat-icon,.mat-mdc-button .mdc-button__label+.mat-icon[dir=rtl]{margin-left:0;margin-right:8px}.mat-mdc-unelevated-button>.mat-icon,.mat-mdc-raised-button>.mat-icon,.mat-mdc-outlined-button>.mat-icon{margin-left:0;margin-right:8px;display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem;margin-left:-4px;margin-right:8px}[dir=rtl] .mat-mdc-unelevated-button>.mat-icon,[dir=rtl] .mat-mdc-raised-button>.mat-icon,[dir=rtl] .mat-mdc-outlined-button>.mat-icon,.mat-mdc-unelevated-button>.mat-icon[dir=rtl],.mat-mdc-raised-button>.mat-icon[dir=rtl],.mat-mdc-outlined-button>.mat-icon[dir=rtl]{margin-left:8px;margin-right:0}[dir=rtl] .mat-mdc-unelevated-button>.mat-icon,[dir=rtl] .mat-mdc-raised-button>.mat-icon,[dir=rtl] .mat-mdc-outlined-button>.mat-icon,.mat-mdc-unelevated-button>.mat-icon[dir=rtl],.mat-mdc-raised-button>.mat-icon[dir=rtl],.mat-mdc-outlined-button>.mat-icon[dir=rtl]{margin-left:8px;margin-right:-4px}.mat-mdc-unelevated-button .mdc-button__label+.mat-icon,.mat-mdc-raised-button .mdc-button__label+.mat-icon,.mat-mdc-outlined-button .mdc-button__label+.mat-icon{margin-left:8px;margin-right:-4px}[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-raised-button .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-outlined-button .mdc-button__label+.mat-icon,.mat-mdc-unelevated-button .mdc-button__label+.mat-icon[dir=rtl],.mat-mdc-raised-button .mdc-button__label+.mat-icon[dir=rtl],.mat-mdc-outlined-button .mdc-button__label+.mat-icon[dir=rtl]{margin-left:-4px;margin-right:8px}.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px;border-width:-1px}.mat-mdc-unelevated-button .mat-mdc-focus-indicator::before,.mat-mdc-raised-button .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px)*-1)}.mat-mdc-outlined-button .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 3px)*-1)}',
  Dl =
    '.cdk-high-contrast-active .mat-mdc-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-unelevated-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-raised-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-outlined-button:not(.mdc-button--outlined),.cdk-high-contrast-active .mat-mdc-icon-button{outline:solid 1px}',
  va = ['mat-fab', ''];
var Sl =
  '.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:var(--mdc-elevation-overlay-color)}.mdc-fab{position:relative;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;user-select:none;-moz-appearance:none;-webkit-appearance:none;overflow:visible;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-fab .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-fab[hidden]{display:none}.mdc-fab::-moz-focus-inner{padding:0;border:0}.mdc-fab:hover{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mdc-fab.mdc-ripple-upgraded--background-focused,.mdc-fab:not(.mdc-ripple-upgraded):focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mdc-fab .mdc-fab__focus-ring{position:absolute}.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring{border-color:CanvasText}}.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring::after,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring::after{content:"";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring::after,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring::after{border-color:CanvasText}}.mdc-fab:active,.mdc-fab:focus:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)}.mdc-fab:active,.mdc-fab:focus{outline:none}.mdc-fab:hover{cursor:pointer}.mdc-fab>svg{width:100%}.mdc-fab--mini{width:40px;height:40px}.mdc-fab--extended{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-button-font-family);font-size:var(--mdc-typography-button-font-size);line-height:var(--mdc-typography-button-line-height);font-weight:var(--mdc-typography-button-font-weight);letter-spacing:var(--mdc-typography-button-letter-spacing);text-decoration:var(--mdc-typography-button-text-decoration);text-transform:var(--mdc-typography-button-text-transform);border-radius:24px;padding-left:20px;padding-right:20px;width:auto;max-width:100%;height:48px;line-height:normal}.mdc-fab--extended .mdc-fab__ripple{border-radius:24px}.mdc-fab--extended .mdc-fab__icon{margin-left:calc(12px - 20px);margin-right:12px}[dir=rtl] .mdc-fab--extended .mdc-fab__icon,.mdc-fab--extended .mdc-fab__icon[dir=rtl]{margin-left:12px;margin-right:calc(12px - 20px)}.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon{margin-left:12px;margin-right:calc(12px - 20px)}[dir=rtl] .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon,.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon[dir=rtl]{margin-left:calc(12px - 20px);margin-right:12px}.mdc-fab--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-fab--touch .mdc-fab__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-fab::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-fab::before{border-color:CanvasText}}.mdc-fab__label{justify-content:flex-start;text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden;overflow-y:visible}.mdc-fab__icon{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mdc-fab .mdc-fab__icon{display:inline-flex;align-items:center;justify-content:center}.mdc-fab--exited{transform:scale(0);opacity:0;transition:opacity 15ms linear 150ms,transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-fab--exited .mdc-fab__icon{transform:scale(0);transition:transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mat-mdc-fab,.mat-mdc-mini-fab{background-color:var(--mdc-fab-container-color)}.mat-mdc-fab .mdc-fab__icon,.mat-mdc-mini-fab .mdc-fab__icon{width:var(--mdc-fab-icon-size);height:var(--mdc-fab-icon-size);font-size:var(--mdc-fab-icon-size)}.mat-mdc-fab:not(.mdc-fab--extended),.mat-mdc-mini-fab:not(.mdc-fab--extended){border-radius:var(--mdc-fab-container-shape)}.mat-mdc-fab:not(.mdc-fab--extended) .mdc-fab__ripple,.mat-mdc-mini-fab:not(.mdc-fab--extended) .mdc-fab__ripple{border-radius:var(--mdc-fab-container-shape)}.mat-mdc-extended-fab{font-family:var(--mdc-extended-fab-label-text-font);font-size:var(--mdc-extended-fab-label-text-size);font-weight:var(--mdc-extended-fab-label-text-weight);letter-spacing:var(--mdc-extended-fab-label-text-tracking)}.mat-mdc-fab,.mat-mdc-mini-fab{-webkit-tap-highlight-color:rgba(0,0,0,0);box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);flex-shrink:0;color:var(--mat-fab-foreground-color, inherit)}.mat-mdc-fab .mat-mdc-button-ripple,.mat-mdc-fab .mat-mdc-button-persistent-ripple,.mat-mdc-fab .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab .mat-mdc-button-ripple,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-fab .mat-mdc-button-ripple,.mat-mdc-mini-fab .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-fab .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-fab .mdc-button__label,.mat-mdc-mini-fab .mdc-button__label{z-index:1}.mat-mdc-fab .mat-mdc-focus-indicator,.mat-mdc-mini-fab .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-fab:focus .mat-mdc-focus-indicator::before,.mat-mdc-mini-fab:focus .mat-mdc-focus-indicator::before{content:""}.mat-mdc-fab .mat-mdc-button-touch-target,.mat-mdc-mini-fab .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mat-mdc-fab .mat-ripple-element,.mat-mdc-mini-fab .mat-ripple-element{background-color:var(--mat-fab-ripple-color)}.mat-mdc-fab .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-state-layer-color)}.mat-mdc-fab:hover .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-hover-state-layer-opacity)}.mat-mdc-fab.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-fab.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-focus-state-layer-opacity)}.mat-mdc-fab:active .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-pressed-state-layer-opacity)}.mat-mdc-fab._mat-animation-noopable,.mat-mdc-mini-fab._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-fab:hover,.mat-mdc-fab:focus,.mat-mdc-mini-fab:hover,.mat-mdc-mini-fab:focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mat-mdc-fab:active,.mat-mdc-fab:focus:active,.mat-mdc-mini-fab:active,.mat-mdc-mini-fab:focus:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)}.mat-mdc-fab[disabled],.mat-mdc-mini-fab[disabled]{cursor:default;pointer-events:none;box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);color:var(--mat-fab-disabled-state-foreground-color);background-color:var(--mat-fab-disabled-state-container-color)}.mat-mdc-fab:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-mini-fab:not(.mdc-ripple-upgraded):focus::before{background:rgba(0,0,0,0);opacity:1}.mat-mdc-fab .mat-icon,.mat-mdc-fab .material-icons,.mat-mdc-mini-fab .mat-icon,.mat-mdc-mini-fab .material-icons{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mat-mdc-fab .mat-mdc-focus-indicator::before,.mat-mdc-mini-fab .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px)*-1)}.mat-mdc-extended-fab>.mat-icon,.mat-mdc-extended-fab>.material-icons{margin-left:calc(12px - 20px);margin-right:12px}[dir=rtl] .mat-mdc-extended-fab>.mat-icon,[dir=rtl] .mat-mdc-extended-fab>.material-icons,.mat-mdc-extended-fab>.mat-icon[dir=rtl],.mat-mdc-extended-fab>.material-icons[dir=rtl]{margin-left:12px;margin-right:calc(12px - 20px)}.mat-mdc-extended-fab .mdc-button__label+.mat-icon,.mat-mdc-extended-fab .mdc-button__label+.material-icons{margin-left:12px;margin-right:calc(12px - 20px)}[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.material-icons,.mat-mdc-extended-fab .mdc-button__label+.mat-icon[dir=rtl],.mat-mdc-extended-fab .mdc-button__label+.material-icons[dir=rtl]{margin-left:calc(12px - 20px);margin-right:12px}.mat-mdc-extended-fab .mat-mdc-button-touch-target{width:100%}';
var Rl = [
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
  xa = (() => {
    let t = class t {
      get ripple() {
        return this._rippleLoader?.getRipple(this._elementRef.nativeElement);
      }
      set ripple(e) {
        this._rippleLoader?.attachRipple(this._elementRef.nativeElement, e);
      }
      get disableRipple() {
        return this._disableRipple;
      }
      set disableRipple(e) {
        (this._disableRipple = e), this._updateRippleDisabled();
      }
      get disabled() {
        return this._disabled;
      }
      set disabled(e) {
        (this._disabled = e), this._updateRippleDisabled();
      }
      constructor(e, n, o, a) {
        (this._elementRef = e),
          (this._platform = n),
          (this._ngZone = o),
          (this._animationMode = a),
          (this._focusMonitor = O(xi)),
          (this._rippleLoader = O(_a)),
          (this._isFab = !1),
          (this._disableRipple = !1),
          (this._disabled = !1),
          this._rippleLoader?.configureRipple(this._elementRef.nativeElement, {
            className: 'mat-mdc-button-ripple',
          });
        let s = this._elementRef.nativeElement,
          d = s.classList;
        for (let { attribute: c, mdcClasses: l } of Rl)
          s.hasAttribute(c) && d.add(...l);
      }
      ngAfterViewInit() {
        this._focusMonitor.monitor(this._elementRef, !0);
      }
      ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef),
          this._rippleLoader?.destroyRipple(this._elementRef.nativeElement);
      }
      focus(e = 'program', n) {
        e
          ? this._focusMonitor.focusVia(this._elementRef.nativeElement, e, n)
          : this._elementRef.nativeElement.focus(n);
      }
      _updateRippleDisabled() {
        this._rippleLoader?.setDisabled(
          this._elementRef.nativeElement,
          this.disableRipple || this.disabled
        );
      }
    };
    (t.ɵfac = function (n) {
      tn();
    }),
      (t.ɵdir = T({
        type: t,
        inputs: {
          color: 'color',
          disableRipple: ['disableRipple', 'disableRipple', X],
          disabled: ['disabled', 'disabled', X],
        },
        features: [ft],
      }));
    let i = t;
    return i;
  })();
var Ol = (() => {
  let t = class t extends xa {
    constructor(e, n, o, a) {
      super(e, n, o, a),
        (this._haltDisabledEvents = (s) => {
          this.disabled && (s.preventDefault(), s.stopImmediatePropagation());
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
  (t.ɵfac = function (n) {
    tn();
  }),
    (t.ɵdir = T({
      type: t,
      inputs: {
        tabIndex: ['tabIndex', 'tabIndex', (e) => (e == null ? void 0 : ni(e))],
      },
      features: [ft, $],
    }));
  let i = t;
  return i;
})();
var Ll = (() => {
    let t = class t extends Ol {
      constructor(e, n, o, a) {
        super(e, n, o, a);
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(m(A), m(Z), m(S), m(ut, 8));
    }),
      (t.ɵcmp = Q({
        type: t,
        selectors: [
          ['a', 'mat-button', ''],
          ['a', 'mat-raised-button', ''],
          ['a', 'mat-flat-button', ''],
          ['a', 'mat-stroked-button', ''],
        ],
        hostVars: 11,
        hostBindings: function (n, o) {
          n & 2 &&
            (U('disabled', o.disabled || null)(
              'tabindex',
              o.disabled ? -1 : o.tabIndex
            )('aria-disabled', o.disabled.toString()),
            It(o.color ? 'mat-' + o.color : ''),
            M('_mat-animation-noopable', o._animationMode === 'NoopAnimations')(
              'mat-unthemed',
              !o.color
            )('mat-mdc-button-base', !0));
        },
        exportAs: ['matButton', 'matAnchor'],
        features: [$],
        attrs: Al,
        ngContentSelectors: Mn,
        decls: 7,
        vars: 4,
        consts: [
          [1, 'mat-mdc-button-persistent-ripple'],
          [1, 'mdc-button__label'],
          [1, 'mat-mdc-focus-indicator'],
          [1, 'mat-mdc-button-touch-target'],
        ],
        template: function (n, o) {
          n & 1 &&
            (dt(In),
            w(0, 'span', 0),
            L(1),
            p(2, 'span', 1),
            L(3, 1),
            g(),
            L(4, 2),
            w(5, 'span', 2)(6, 'span', 3)),
            n & 2 &&
              M('mdc-button__ripple', !o._isFab)('mdc-fab__ripple', o._isFab);
        },
        styles: [Fl, Dl],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let i = t;
    return i;
  })(),
  ya = new y('mat-mdc-fab-default-options', {
    providedIn: 'root',
    factory: ka,
  });
function ka() {
  return { color: 'accent' };
}
var Ii = ka(),
  wa = (() => {
    let t = class t extends xa {
      constructor(e, n, o, a, s) {
        super(e, n, o, a),
          (this._options = s),
          (this._isFab = !0),
          (this._options = this._options || Ii),
          (this.color = this._options.color || Ii.color);
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(m(A), m(Z), m(S), m(ut, 8), m(ya, 8));
    }),
      (t.ɵcmp = Q({
        type: t,
        selectors: [['button', 'mat-fab', '']],
        hostVars: 13,
        hostBindings: function (n, o) {
          n & 2 &&
            (U('disabled', o.disabled || null),
            It(o.color ? 'mat-' + o.color : ''),
            M('_mat-animation-noopable', o._animationMode === 'NoopAnimations')(
              'mat-unthemed',
              !o.color
            )('mat-mdc-button-base', !0)('mdc-fab--extended', o.extended)(
              'mat-mdc-extended-fab',
              o.extended
            ));
        },
        inputs: { extended: ['extended', 'extended', X] },
        exportAs: ['matButton'],
        features: [ft, $],
        attrs: va,
        ngContentSelectors: Mn,
        decls: 7,
        vars: 4,
        consts: [
          [1, 'mat-mdc-button-persistent-ripple'],
          [1, 'mdc-button__label'],
          [1, 'mat-mdc-focus-indicator'],
          [1, 'mat-mdc-button-touch-target'],
        ],
        template: function (n, o) {
          n & 1 &&
            (dt(In),
            w(0, 'span', 0),
            L(1),
            p(2, 'span', 1),
            L(3, 1),
            g(),
            L(4, 2),
            w(5, 'span', 2)(6, 'span', 3)),
            n & 2 &&
              M('mdc-button__ripple', !o._isFab)('mdc-fab__ripple', o._isFab);
        },
        styles: [
          '.mdc-touch-target-wrapper{display:inline}.mdc-elevation-overlay{position:absolute;border-radius:inherit;pointer-events:none;opacity:var(--mdc-elevation-overlay-opacity);transition:opacity 280ms cubic-bezier(0.4, 0, 0.2, 1);background-color:var(--mdc-elevation-overlay-color)}.mdc-fab{position:relative;display:inline-flex;position:relative;align-items:center;justify-content:center;box-sizing:border-box;width:56px;height:56px;padding:0;border:none;fill:currentColor;text-decoration:none;cursor:pointer;user-select:none;-moz-appearance:none;-webkit-appearance:none;overflow:visible;transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1),opacity 15ms linear 30ms,transform 270ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-fab .mdc-elevation-overlay{width:100%;height:100%;top:0;left:0}.mdc-fab[hidden]{display:none}.mdc-fab::-moz-focus-inner{padding:0;border:0}.mdc-fab:hover{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mdc-fab.mdc-ripple-upgraded--background-focused,.mdc-fab:not(.mdc-ripple-upgraded):focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mdc-fab .mdc-fab__focus-ring{position:absolute}.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring{border-color:CanvasText}}.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring::after,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring::after{content:"";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-fab.mdc-ripple-upgraded--background-focused .mdc-fab__focus-ring::after,.mdc-fab:not(.mdc-ripple-upgraded):focus .mdc-fab__focus-ring::after{border-color:CanvasText}}.mdc-fab:active,.mdc-fab:focus:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)}.mdc-fab:active,.mdc-fab:focus{outline:none}.mdc-fab:hover{cursor:pointer}.mdc-fab>svg{width:100%}.mdc-fab--mini{width:40px;height:40px}.mdc-fab--extended{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mdc-typography-button-font-family);font-size:var(--mdc-typography-button-font-size);line-height:var(--mdc-typography-button-line-height);font-weight:var(--mdc-typography-button-font-weight);letter-spacing:var(--mdc-typography-button-letter-spacing);text-decoration:var(--mdc-typography-button-text-decoration);text-transform:var(--mdc-typography-button-text-transform);border-radius:24px;padding-left:20px;padding-right:20px;width:auto;max-width:100%;height:48px;line-height:normal}.mdc-fab--extended .mdc-fab__ripple{border-radius:24px}.mdc-fab--extended .mdc-fab__icon{margin-left:calc(12px - 20px);margin-right:12px}[dir=rtl] .mdc-fab--extended .mdc-fab__icon,.mdc-fab--extended .mdc-fab__icon[dir=rtl]{margin-left:12px;margin-right:calc(12px - 20px)}.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon{margin-left:12px;margin-right:calc(12px - 20px)}[dir=rtl] .mdc-fab--extended .mdc-fab__label+.mdc-fab__icon,.mdc-fab--extended .mdc-fab__label+.mdc-fab__icon[dir=rtl]{margin-left:calc(12px - 20px);margin-right:12px}.mdc-fab--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-fab--touch .mdc-fab__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mdc-fab::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-fab::before{border-color:CanvasText}}.mdc-fab__label{justify-content:flex-start;text-overflow:ellipsis;white-space:nowrap;overflow-x:hidden;overflow-y:visible}.mdc-fab__icon{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mdc-fab .mdc-fab__icon{display:inline-flex;align-items:center;justify-content:center}.mdc-fab--exited{transform:scale(0);opacity:0;transition:opacity 15ms linear 150ms,transform 180ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-fab--exited .mdc-fab__icon{transform:scale(0);transition:transform 135ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mat-mdc-fab,.mat-mdc-mini-fab{background-color:var(--mdc-fab-container-color)}.mat-mdc-fab .mdc-fab__icon,.mat-mdc-mini-fab .mdc-fab__icon{width:var(--mdc-fab-icon-size);height:var(--mdc-fab-icon-size);font-size:var(--mdc-fab-icon-size)}.mat-mdc-fab:not(.mdc-fab--extended),.mat-mdc-mini-fab:not(.mdc-fab--extended){border-radius:var(--mdc-fab-container-shape)}.mat-mdc-fab:not(.mdc-fab--extended) .mdc-fab__ripple,.mat-mdc-mini-fab:not(.mdc-fab--extended) .mdc-fab__ripple{border-radius:var(--mdc-fab-container-shape)}.mat-mdc-extended-fab{font-family:var(--mdc-extended-fab-label-text-font);font-size:var(--mdc-extended-fab-label-text-size);font-weight:var(--mdc-extended-fab-label-text-weight);letter-spacing:var(--mdc-extended-fab-label-text-tracking)}.mat-mdc-fab,.mat-mdc-mini-fab{-webkit-tap-highlight-color:rgba(0,0,0,0);box-shadow:0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);flex-shrink:0;color:var(--mat-fab-foreground-color, inherit)}.mat-mdc-fab .mat-mdc-button-ripple,.mat-mdc-fab .mat-mdc-button-persistent-ripple,.mat-mdc-fab .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab .mat-mdc-button-ripple,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-fab .mat-mdc-button-ripple,.mat-mdc-mini-fab .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-fab .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-fab .mdc-button__label,.mat-mdc-mini-fab .mdc-button__label{z-index:1}.mat-mdc-fab .mat-mdc-focus-indicator,.mat-mdc-mini-fab .mat-mdc-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute}.mat-mdc-fab:focus .mat-mdc-focus-indicator::before,.mat-mdc-mini-fab:focus .mat-mdc-focus-indicator::before{content:""}.mat-mdc-fab .mat-mdc-button-touch-target,.mat-mdc-mini-fab .mat-mdc-button-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mat-mdc-fab .mat-ripple-element,.mat-mdc-mini-fab .mat-ripple-element{background-color:var(--mat-fab-ripple-color)}.mat-mdc-fab .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-fab-state-layer-color)}.mat-mdc-fab:hover .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab:hover .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-hover-state-layer-opacity)}.mat-mdc-fab.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-fab.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab.cdk-program-focused .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab.cdk-keyboard-focused .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-focus-state-layer-opacity)}.mat-mdc-fab:active .mat-mdc-button-persistent-ripple::before,.mat-mdc-mini-fab:active .mat-mdc-button-persistent-ripple::before{opacity:var(--mat-fab-pressed-state-layer-opacity)}.mat-mdc-fab._mat-animation-noopable,.mat-mdc-mini-fab._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-fab:hover,.mat-mdc-fab:focus,.mat-mdc-mini-fab:hover,.mat-mdc-mini-fab:focus{box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)}.mat-mdc-fab:active,.mat-mdc-fab:focus:active,.mat-mdc-mini-fab:active,.mat-mdc-mini-fab:focus:active{box-shadow:0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)}.mat-mdc-fab[disabled],.mat-mdc-mini-fab[disabled]{cursor:default;pointer-events:none;box-shadow:0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);color:var(--mat-fab-disabled-state-foreground-color);background-color:var(--mat-fab-disabled-state-container-color)}.mat-mdc-fab:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-mini-fab:not(.mdc-ripple-upgraded):focus::before{background:rgba(0,0,0,0);opacity:1}.mat-mdc-fab .mat-icon,.mat-mdc-fab .material-icons,.mat-mdc-mini-fab .mat-icon,.mat-mdc-mini-fab .material-icons{transition:transform 180ms 90ms cubic-bezier(0, 0, 0.2, 1);fill:currentColor;will-change:transform}.mat-mdc-fab .mat-mdc-focus-indicator::before,.mat-mdc-mini-fab .mat-mdc-focus-indicator::before{margin:calc(calc(var(--mat-mdc-focus-indicator-border-width, 3px) + 2px)*-1)}.mat-mdc-extended-fab>.mat-icon,.mat-mdc-extended-fab>.material-icons{margin-left:calc(12px - 20px);margin-right:12px}[dir=rtl] .mat-mdc-extended-fab>.mat-icon,[dir=rtl] .mat-mdc-extended-fab>.material-icons,.mat-mdc-extended-fab>.mat-icon[dir=rtl],.mat-mdc-extended-fab>.material-icons[dir=rtl]{margin-left:12px;margin-right:calc(12px - 20px)}.mat-mdc-extended-fab .mdc-button__label+.mat-icon,.mat-mdc-extended-fab .mdc-button__label+.material-icons{margin-left:12px;margin-right:calc(12px - 20px)}[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.mat-icon,[dir=rtl] .mat-mdc-extended-fab .mdc-button__label+.material-icons,.mat-mdc-extended-fab .mdc-button__label+.mat-icon[dir=rtl],.mat-mdc-extended-fab .mdc-button__label+.material-icons[dir=rtl]{margin-left:calc(12px - 20px);margin-right:12px}.mat-mdc-extended-fab .mat-mdc-button-touch-target{width:100%}',
        ],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let i = t;
    return i;
  })();
var Ca = (() => {
  let t = class t extends Ll {
    constructor(e, n, o, a, s) {
      super(e, n, o, a),
        (this._options = s),
        (this._isFab = !0),
        (this._options = this._options || Ii),
        (this.color = this._options.color || Ii.color);
    }
  };
  (t.ɵfac = function (n) {
    return new (n || t)(m(A), m(Z), m(S), m(ut, 8), m(ya, 8));
  }),
    (t.ɵcmp = Q({
      type: t,
      selectors: [['a', 'mat-fab', '']],
      hostVars: 15,
      hostBindings: function (n, o) {
        n & 2 &&
          (U('disabled', o.disabled || null)(
            'tabindex',
            o.disabled ? -1 : o.tabIndex
          )('aria-disabled', o.disabled.toString()),
          It(o.color ? 'mat-' + o.color : ''),
          M('_mat-animation-noopable', o._animationMode === 'NoopAnimations')(
            'mat-unthemed',
            !o.color
          )('mat-mdc-button-base', !0)('mdc-fab--extended', o.extended)(
            'mat-mdc-extended-fab',
            o.extended
          ));
      },
      inputs: { extended: ['extended', 'extended', X] },
      exportAs: ['matButton', 'matAnchor'],
      features: [ft, $],
      attrs: va,
      ngContentSelectors: Mn,
      decls: 7,
      vars: 4,
      consts: [
        [1, 'mat-mdc-button-persistent-ripple'],
        [1, 'mdc-button__label'],
        [1, 'mat-mdc-focus-indicator'],
        [1, 'mat-mdc-button-touch-target'],
      ],
      template: function (n, o) {
        n & 1 &&
          (dt(In),
          w(0, 'span', 0),
          L(1),
          p(2, 'span', 1),
          L(3, 1),
          g(),
          L(4, 2),
          w(5, 'span', 2)(6, 'span', 3)),
          n & 2 &&
            M('mdc-button__ripple', !o._isFab)('mdc-fab__ripple', o._isFab);
      },
      styles: [Sl],
      encapsulation: 2,
      changeDetection: 0,
    }));
  let i = t;
  return i;
})();
var Ea = (() => {
  let t = class t {};
  (t.ɵfac = function (n) {
    return new (n || t)();
  }),
    (t.ɵmod = E({ type: t })),
    (t.ɵinj = C({ imports: [j, zt, j] }));
  let i = t;
  return i;
})();
var Mi = class {
  get selected() {
    return (
      this._selected || (this._selected = Array.from(this._selection.values())),
      this._selected
    );
  }
  constructor(t = !1, r, e = !0, n) {
    (this._multiple = t),
      (this._emitChanges = e),
      (this.compareWith = n),
      (this._selection = new Set()),
      (this._deselectedToEmit = []),
      (this._selectedToEmit = []),
      (this.changed = new nt()),
      r &&
        r.length &&
        (t ? r.forEach((o) => this._markSelected(o)) : this._markSelected(r[0]),
        (this._selectedToEmit.length = 0));
  }
  select(...t) {
    this._verifyValueAssignment(t), t.forEach((e) => this._markSelected(e));
    let r = this._hasQueuedChanges();
    return this._emitChangeEvent(), r;
  }
  deselect(...t) {
    this._verifyValueAssignment(t), t.forEach((e) => this._unmarkSelected(e));
    let r = this._hasQueuedChanges();
    return this._emitChangeEvent(), r;
  }
  setSelection(...t) {
    this._verifyValueAssignment(t);
    let r = this.selected,
      e = new Set(t);
    t.forEach((o) => this._markSelected(o)),
      r.filter((o) => !e.has(o)).forEach((o) => this._unmarkSelected(o));
    let n = this._hasQueuedChanges();
    return this._emitChangeEvent(), n;
  }
  toggle(t) {
    return this.isSelected(t) ? this.deselect(t) : this.select(t);
  }
  clear(t = !0) {
    this._unmarkAll();
    let r = this._hasQueuedChanges();
    return t && this._emitChangeEvent(), r;
  }
  isSelected(t) {
    return this._selection.has(this._getConcreteValue(t));
  }
  isEmpty() {
    return this._selection.size === 0;
  }
  hasValue() {
    return !this.isEmpty();
  }
  sort(t) {
    this._multiple && this.selected && this._selected.sort(t);
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
  _markSelected(t) {
    (t = this._getConcreteValue(t)),
      this.isSelected(t) ||
        (this._multiple || this._unmarkAll(),
        this.isSelected(t) || this._selection.add(t),
        this._emitChanges && this._selectedToEmit.push(t));
  }
  _unmarkSelected(t) {
    (t = this._getConcreteValue(t)),
      this.isSelected(t) &&
        (this._selection.delete(t),
        this._emitChanges && this._deselectedToEmit.push(t));
  }
  _unmarkAll() {
    this.isEmpty() || this._selection.forEach((t) => this._unmarkSelected(t));
  }
  _verifyValueAssignment(t) {
    t.length > 1 && this._multiple;
  }
  _hasQueuedChanges() {
    return !!(this._deselectedToEmit.length || this._selectedToEmit.length);
  }
  _getConcreteValue(t) {
    if (this.compareWith) {
      for (let r of this._selection) if (this.compareWith(t, r)) return r;
      return t;
    } else return t;
  }
};
var Nl = ['button'],
  Bl = ['*'],
  Ia = new y('MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS'),
  Ma = new y('MatButtonToggleGroup'),
  Pl = { provide: Lt, useExisting: xt(() => Tn), multi: !0 },
  Ta = 0,
  Ti = class {
    constructor(t, r) {
      (this.source = t), (this.value = r);
    }
  },
  Tn = (() => {
    let t = class t {
      get name() {
        return this._name;
      }
      set name(e) {
        (this._name = e), this._markButtonsForCheck();
      }
      get value() {
        let e = this._selectionModel ? this._selectionModel.selected : [];
        return this.multiple
          ? e.map((n) => n.value)
          : e[0]
          ? e[0].value
          : void 0;
      }
      set value(e) {
        this._setSelectionByValue(e), this.valueChange.emit(this.value);
      }
      get selected() {
        let e = this._selectionModel ? this._selectionModel.selected : [];
        return this.multiple ? e : e[0] || null;
      }
      get multiple() {
        return this._multiple;
      }
      set multiple(e) {
        (this._multiple = e), this._markButtonsForCheck();
      }
      get disabled() {
        return this._disabled;
      }
      set disabled(e) {
        (this._disabled = e), this._markButtonsForCheck();
      }
      constructor(e, n) {
        (this._changeDetector = e),
          (this._multiple = !1),
          (this._disabled = !1),
          (this._controlValueAccessorChangeFn = () => {}),
          (this._onTouched = () => {}),
          (this._name = `mat-button-toggle-group-${Ta++}`),
          (this.valueChange = new z()),
          (this.change = new z()),
          (this.appearance = n && n.appearance ? n.appearance : 'standard');
      }
      ngOnInit() {
        this._selectionModel = new Mi(this.multiple, void 0, !1);
      }
      ngAfterContentInit() {
        this._selectionModel.select(
          ...this._buttonToggles.filter((e) => e.checked)
        );
      }
      writeValue(e) {
        (this.value = e), this._changeDetector.markForCheck();
      }
      registerOnChange(e) {
        this._controlValueAccessorChangeFn = e;
      }
      registerOnTouched(e) {
        this._onTouched = e;
      }
      setDisabledState(e) {
        this.disabled = e;
      }
      _emitChangeEvent(e) {
        let n = new Ti(e, this.value);
        (this._rawValue = n.value),
          this._controlValueAccessorChangeFn(n.value),
          this.change.emit(n);
      }
      _syncButtonToggle(e, n, o = !1, a = !1) {
        !this.multiple &&
          this.selected &&
          !e.checked &&
          (this.selected.checked = !1),
          this._selectionModel
            ? n
              ? this._selectionModel.select(e)
              : this._selectionModel.deselect(e)
            : (a = !0),
          a
            ? Promise.resolve().then(() => this._updateModelValue(e, o))
            : this._updateModelValue(e, o);
      }
      _isSelected(e) {
        return this._selectionModel && this._selectionModel.isSelected(e);
      }
      _isPrechecked(e) {
        return typeof this._rawValue > 'u'
          ? !1
          : this.multiple && Array.isArray(this._rawValue)
          ? this._rawValue.some((n) => e.value != null && n === e.value)
          : e.value === this._rawValue;
      }
      _setSelectionByValue(e) {
        (this._rawValue = e),
          this._buttonToggles &&
            (this.multiple && e
              ? (Array.isArray(e),
                this._clearSelection(),
                e.forEach((n) => this._selectValue(n)))
              : (this._clearSelection(), this._selectValue(e)));
      }
      _clearSelection() {
        this._selectionModel.clear(),
          this._buttonToggles.forEach((e) => (e.checked = !1));
      }
      _selectValue(e) {
        let n = this._buttonToggles.find(
          (o) => o.value != null && o.value === e
        );
        n && ((n.checked = !0), this._selectionModel.select(n));
      }
      _updateModelValue(e, n) {
        n && this._emitChangeEvent(e), this.valueChange.emit(this.value);
      }
      _markButtonsForCheck() {
        this._buttonToggles?.forEach((e) => e._markForCheck());
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(m(ht), m(Ia, 8));
    }),
      (t.ɵdir = T({
        type: t,
        selectors: [['mat-button-toggle-group']],
        contentQueries: function (n, o, a) {
          if ((n & 1 && gt(a, An, 5), n & 2)) {
            let s;
            F((s = D())) && (o._buttonToggles = s);
          }
        },
        hostAttrs: ['role', 'group', 1, 'mat-button-toggle-group'],
        hostVars: 5,
        hostBindings: function (n, o) {
          n & 2 &&
            (U('aria-disabled', o.disabled),
            M('mat-button-toggle-vertical', o.vertical)(
              'mat-button-toggle-group-appearance-standard',
              o.appearance === 'standard'
            ));
        },
        inputs: {
          appearance: 'appearance',
          name: 'name',
          vertical: ['vertical', 'vertical', X],
          value: 'value',
          multiple: ['multiple', 'multiple', X],
          disabled: ['disabled', 'disabled', X],
        },
        outputs: { valueChange: 'valueChange', change: 'change' },
        exportAs: ['matButtonToggleGroup'],
        features: [tt([Pl, { provide: Ma, useExisting: t }]), ft],
      }));
    let i = t;
    return i;
  })(),
  An = (() => {
    let t = class t {
      get buttonId() {
        return `${this.id}-button`;
      }
      get appearance() {
        return this.buttonToggleGroup
          ? this.buttonToggleGroup.appearance
          : this._appearance;
      }
      set appearance(e) {
        this._appearance = e;
      }
      get checked() {
        return this.buttonToggleGroup
          ? this.buttonToggleGroup._isSelected(this)
          : this._checked;
      }
      set checked(e) {
        e !== this._checked &&
          ((this._checked = e),
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
      set disabled(e) {
        this._disabled = e;
      }
      constructor(e, n, o, a, s, d) {
        (this._changeDetectorRef = n),
          (this._elementRef = o),
          (this._focusMonitor = a),
          (this._checked = !1),
          (this.ariaLabelledby = null),
          (this._disabled = !1),
          (this.change = new z());
        let c = Number(s);
        (this.tabIndex = c || c === 0 ? c : null),
          (this.buttonToggleGroup = e),
          (this.appearance = d && d.appearance ? d.appearance : 'standard');
      }
      ngOnInit() {
        let e = this.buttonToggleGroup;
        (this.id = this.id || `mat-button-toggle-${Ta++}`),
          e &&
            (e._isPrechecked(this)
              ? (this.checked = !0)
              : e._isSelected(this) !== this._checked &&
                e._syncButtonToggle(this, this._checked));
      }
      ngAfterViewInit() {
        this._focusMonitor.monitor(this._elementRef, !0);
      }
      ngOnDestroy() {
        let e = this.buttonToggleGroup;
        this._focusMonitor.stopMonitoring(this._elementRef),
          e && e._isSelected(this) && e._syncButtonToggle(this, !1, !1, !0);
      }
      focus(e) {
        this._buttonElement.nativeElement.focus(e);
      }
      _onButtonClick() {
        let e = this._isSingleSelector() ? !0 : !this._checked;
        e !== this._checked &&
          ((this._checked = e),
          this.buttonToggleGroup &&
            (this.buttonToggleGroup._syncButtonToggle(this, this._checked, !0),
            this.buttonToggleGroup._onTouched())),
          this.change.emit(new Ti(this, this.value));
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
    (t.ɵfac = function (n) {
      return new (n || t)(
        m(Ma, 8),
        m(ht),
        m(A),
        m(xi),
        $t('tabindex'),
        m(Ia, 8)
      );
    }),
      (t.ɵcmp = Q({
        type: t,
        selectors: [['mat-button-toggle']],
        viewQuery: function (n, o) {
          if ((n & 1 && Y(Nl, 5), n & 2)) {
            let a;
            F((a = D())) && (o._buttonElement = a.first);
          }
        },
        hostAttrs: ['role', 'presentation', 1, 'mat-button-toggle'],
        hostVars: 12,
        hostBindings: function (n, o) {
          n & 1 &&
            H('focus', function () {
              return o.focus();
            }),
            n & 2 &&
              (U('aria-label', null)('aria-labelledby', null)('id', o.id)(
                'name',
                null
              ),
              M('mat-button-toggle-standalone', !o.buttonToggleGroup)(
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
          disableRipple: ['disableRipple', 'disableRipple', X],
          appearance: 'appearance',
          checked: ['checked', 'checked', X],
          disabled: ['disabled', 'disabled', X],
        },
        outputs: { change: 'change' },
        exportAs: ['matButtonToggle'],
        features: [ft],
        ngContentSelectors: Bl,
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
        template: function (n, o) {
          if (
            (n & 1 &&
              (dt(),
              p(0, 'button', 0, 1),
              H('click', function () {
                return o._onButtonClick();
              }),
              p(2, 'span', 2),
              L(3),
              g()(),
              w(4, 'span', 3)(5, 'span', 4)),
            n & 2)
          ) {
            let a = Rt(1);
            B('id', o.buttonId)('disabled', o.disabled || null),
              U('tabindex', o.disabled ? -1 : o.tabIndex)(
                'aria-pressed',
                o.checked
              )('name', o._getButtonName())('aria-label', o.ariaLabel)(
                'aria-labelledby',
                o.ariaLabelledby
              ),
              k(5),
              B('matRippleTrigger', a)(
                'matRippleDisabled',
                o.disableRipple || o.disabled
              );
          }
        },
        dependencies: [wt],
        styles: [
          '.mat-button-toggle-standalone,.mat-button-toggle-group{position:relative;display:inline-flex;flex-direction:row;white-space:nowrap;overflow:hidden;-webkit-tap-highlight-color:rgba(0,0,0,0);transform:translateZ(0);border-radius:var(--mat-legacy-button-toggle-shape)}.mat-button-toggle-standalone:not([class*=mat-elevation-z]),.mat-button-toggle-group:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.cdk-high-contrast-active .mat-button-toggle-standalone,.cdk-high-contrast-active .mat-button-toggle-group{outline:solid 1px}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.mat-button-toggle-group-appearance-standard{border-radius:var(--mat-standard-button-toggle-shape);border:solid 1px var(--mat-standard-button-toggle-divider-color)}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]){box-shadow:none}.cdk-high-contrast-active .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.cdk-high-contrast-active .mat-button-toggle-group-appearance-standard{outline:0}.mat-button-toggle-vertical{flex-direction:column}.mat-button-toggle-vertical .mat-button-toggle-label-content{display:block}.mat-button-toggle{white-space:nowrap;position:relative;color:var(--mat-legacy-button-toggle-text-color);font-family:var(--mat-legacy-button-toggle-text-font)}.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:var(--mat-legacy-button-toggle-focus-state-layer-opacity)}.mat-button-toggle .mat-icon svg{vertical-align:top}.mat-button-toggle-checked{color:var(--mat-legacy-button-toggle-selected-state-text-color);background-color:var(--mat-legacy-button-toggle-selected-state-background-color)}.mat-button-toggle-disabled{color:var(--mat-legacy-button-toggle-disabled-state-text-color);background-color:var(--mat-legacy-button-toggle-disabled-state-background-color)}.mat-button-toggle-disabled.mat-button-toggle-checked{background-color:var(--mat-legacy-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-appearance-standard{color:var(--mat-standard-button-toggle-text-color);background-color:var(--mat-standard-button-toggle-background-color);font-family:var(--mat-standard-button-toggle-text-font)}.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:solid 1px var(--mat-standard-button-toggle-divider-color)}[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:solid 1px var(--mat-standard-button-toggle-divider-color)}.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:none;border-top:solid 1px var(--mat-standard-button-toggle-divider-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-selected-state-text-color);background-color:var(--mat-standard-button-toggle-selected-state-background-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled{color:var(--mat-standard-button-toggle-disabled-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-state-background-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-disabled-selected-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{background-color:var(--mat-standard-button-toggle-state-layer-color)}.mat-button-toggle-appearance-standard:not(.mat-button-toggle-disabled):hover .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-hover-state-layer-opacity)}.mat-button-toggle-appearance-standard.cdk-keyboard-focused:not(.mat-button-toggle-disabled) .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-focus-state-layer-opacity)}@media(hover: none){.mat-button-toggle-appearance-standard:not(.mat-button-toggle-disabled):hover .mat-button-toggle-focus-overlay{display:none}}.mat-button-toggle-label-content{-webkit-user-select:none;user-select:none;display:inline-block;padding:0 16px;line-height:var(--mat-legacy-button-toggle-height);position:relative}.mat-button-toggle-appearance-standard .mat-button-toggle-label-content{padding:0 12px;line-height:var(--mat-standard-button-toggle-height)}.mat-button-toggle-label-content>*{vertical-align:middle}.mat-button-toggle-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;pointer-events:none;opacity:0;background-color:var(--mat-legacy-button-toggle-state-layer-color)}.cdk-high-contrast-active .mat-button-toggle-checked .mat-button-toggle-focus-overlay{border-bottom:solid 500px;opacity:.5;height:0}.cdk-high-contrast-active .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay{opacity:.6}.cdk-high-contrast-active .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{border-bottom:solid 500px}.mat-button-toggle .mat-button-toggle-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-button-toggle-button{border:0;background:none;color:inherit;padding:0;margin:0;font:inherit;outline:none;width:100%;cursor:pointer}.mat-button-toggle-disabled .mat-button-toggle-button{cursor:default}.mat-button-toggle-button::-moz-focus-inner{border:0}',
        ],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let i = t;
    return i;
  })(),
  Aa = (() => {
    let t = class t {};
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵmod = E({ type: t })),
      (t.ɵinj = C({ imports: [j, zt, j] }));
    let i = t;
    return i;
  })();
var jl = ['input'],
  zl = ['label'],
  Hl = ['*'],
  Gl = new y('mat-checkbox-default-options', {
    providedIn: 'root',
    factory: Sa,
  });
function Sa() {
  return { color: 'accent', clickAction: 'check-indeterminate' };
}
var Ql = { provide: Lt, useExisting: xt(() => Dn), multi: !0 },
  Fn = class {},
  Wl = 0,
  Fa = Sa(),
  Dn = (() => {
    let t = class t {
      focus() {
        this._inputElement.nativeElement.focus();
      }
      _createChangeEvent(e) {
        let n = new Fn();
        return (n.source = this), (n.checked = e), n;
      }
      _getAnimationTargetElement() {
        return this._inputElement?.nativeElement;
      }
      get inputId() {
        return `${this.id || this._uniqueId}-input`;
      }
      constructor(e, n, o, a, s, d) {
        (this._elementRef = e),
          (this._changeDetectorRef = n),
          (this._ngZone = o),
          (this._animationMode = s),
          (this._options = d),
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
          (this.change = new z()),
          (this.indeterminateChange = new z()),
          (this._onTouched = () => {}),
          (this._currentAnimationClass = ''),
          (this._currentCheckState = 0),
          (this._controlValueAccessorChangeFn = () => {}),
          (this._checked = !1),
          (this._disabled = !1),
          (this._indeterminate = !1),
          (this._options = this._options || Fa),
          (this.color = this._options.color || Fa.color),
          (this.tabIndex = parseInt(a) || 0),
          (this.id = this._uniqueId = `mat-mdc-checkbox-${++Wl}`);
      }
      ngAfterViewInit() {
        this._syncIndeterminate(this._indeterminate);
      }
      get checked() {
        return this._checked;
      }
      set checked(e) {
        e != this.checked &&
          ((this._checked = e), this._changeDetectorRef.markForCheck());
      }
      get disabled() {
        return this._disabled;
      }
      set disabled(e) {
        e !== this.disabled &&
          ((this._disabled = e), this._changeDetectorRef.markForCheck());
      }
      get indeterminate() {
        return this._indeterminate;
      }
      set indeterminate(e) {
        let n = e != this._indeterminate;
        (this._indeterminate = e),
          n &&
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
      writeValue(e) {
        this.checked = !!e;
      }
      registerOnChange(e) {
        this._controlValueAccessorChangeFn = e;
      }
      registerOnTouched(e) {
        this._onTouched = e;
      }
      setDisabledState(e) {
        this.disabled = e;
      }
      _transitionCheckState(e) {
        let n = this._currentCheckState,
          o = this._getAnimationTargetElement();
        if (
          !(n === e || !o) &&
          (this._currentAnimationClass &&
            o.classList.remove(this._currentAnimationClass),
          (this._currentAnimationClass =
            this._getAnimationClassForCheckStateTransition(n, e)),
          (this._currentCheckState = e),
          this._currentAnimationClass.length > 0)
        ) {
          o.classList.add(this._currentAnimationClass);
          let a = this._currentAnimationClass;
          this._ngZone.runOutsideAngular(() => {
            setTimeout(() => {
              o.classList.remove(a);
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
        let e = this._options?.clickAction;
        !this.disabled && e !== 'noop'
          ? (this.indeterminate &&
              e !== 'check' &&
              Promise.resolve().then(() => {
                (this._indeterminate = !1),
                  this.indeterminateChange.emit(this._indeterminate);
              }),
            (this._checked = !this._checked),
            this._transitionCheckState(this._checked ? 1 : 2),
            this._emitChangeEvent())
          : !this.disabled &&
            e === 'noop' &&
            ((this._inputElement.nativeElement.checked = this.checked),
            (this._inputElement.nativeElement.indeterminate =
              this.indeterminate));
      }
      _onInteractionEvent(e) {
        e.stopPropagation();
      }
      _onBlur() {
        Promise.resolve().then(() => {
          this._onTouched(), this._changeDetectorRef.markForCheck();
        });
      }
      _getAnimationClassForCheckStateTransition(e, n) {
        if (this._animationMode === 'NoopAnimations') return '';
        switch (e) {
          case 0:
            if (n === 1) return this._animationClasses.uncheckedToChecked;
            if (n == 3)
              return this._checked
                ? this._animationClasses.checkedToIndeterminate
                : this._animationClasses.uncheckedToIndeterminate;
            break;
          case 2:
            return n === 1
              ? this._animationClasses.uncheckedToChecked
              : this._animationClasses.uncheckedToIndeterminate;
          case 1:
            return n === 2
              ? this._animationClasses.checkedToUnchecked
              : this._animationClasses.checkedToIndeterminate;
          case 3:
            return n === 1
              ? this._animationClasses.indeterminateToChecked
              : this._animationClasses.indeterminateToUnchecked;
        }
        return '';
      }
      _syncIndeterminate(e) {
        let n = this._inputElement;
        n && (n.nativeElement.indeterminate = e);
      }
      _onInputClick() {
        this._handleInputClick();
      }
      _onTouchTargetClick() {
        this._handleInputClick(),
          this.disabled || this._inputElement.nativeElement.focus();
      }
      _preventBubblingFromLabel(e) {
        e.target &&
          this._labelElement.nativeElement.contains(e.target) &&
          e.stopPropagation();
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(
        m(A),
        m(ht),
        m(S),
        $t('tabindex'),
        m(ut, 8),
        m(Gl, 8)
      );
    }),
      (t.ɵcmp = Q({
        type: t,
        selectors: [['mat-checkbox']],
        viewQuery: function (n, o) {
          if ((n & 1 && (Y(jl, 5), Y(zl, 5), Y(wt, 5)), n & 2)) {
            let a;
            F((a = D())) && (o._inputElement = a.first),
              F((a = D())) && (o._labelElement = a.first),
              F((a = D())) && (o.ripple = a.first);
          }
        },
        hostAttrs: [1, 'mat-mdc-checkbox'],
        hostVars: 14,
        hostBindings: function (n, o) {
          n & 2 &&
            (Kt('id', o.id),
            U('tabindex', null)('aria-label', null)('aria-labelledby', null),
            It(o.color ? 'mat-' + o.color : 'mat-accent'),
            M('_mat-animation-noopable', o._animationMode === 'NoopAnimations')(
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
          required: ['required', 'required', X],
          labelPosition: 'labelPosition',
          name: 'name',
          value: 'value',
          disableRipple: ['disableRipple', 'disableRipple', X],
          tabIndex: [
            'tabIndex',
            'tabIndex',
            (e) => (e == null ? void 0 : ni(e)),
          ],
          color: 'color',
          checked: ['checked', 'checked', X],
          disabled: ['disabled', 'disabled', X],
          indeterminate: ['indeterminate', 'indeterminate', X],
        },
        outputs: {
          change: 'change',
          indeterminateChange: 'indeterminateChange',
        },
        exportAs: ['matCheckbox'],
        features: [tt([Ql]), ft],
        ngContentSelectors: Hl,
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
        template: function (n, o) {
          if (
            (n & 1 &&
              (dt(),
              p(0, 'div', 0),
              H('click', function (s) {
                return o._preventBubblingFromLabel(s);
              }),
              p(1, 'div', 1, 2)(3, 'div', 3),
              H('click', function () {
                return o._onTouchTargetClick();
              }),
              g(),
              p(4, 'input', 4, 5),
              H('blur', function () {
                return o._onBlur();
              })('click', function () {
                return o._onInputClick();
              })('change', function (s) {
                return o._onInteractionEvent(s);
              }),
              g(),
              w(6, 'div', 6),
              p(7, 'div', 7),
              jo(),
              p(8, 'svg', 8),
              w(9, 'path', 9),
              g(),
              zo(),
              w(10, 'div', 10),
              g(),
              w(11, 'div', 11),
              g(),
              p(12, 'label', 12, 13),
              L(14),
              g()()),
            n & 2)
          ) {
            let a = Rt(2);
            M('mdc-form-field--align-end', o.labelPosition == 'before'),
              k(4),
              M('mdc-checkbox--selected', o.checked),
              B('checked', o.checked)('indeterminate', o.indeterminate)(
                'disabled',
                o.disabled
              )('id', o.inputId)('required', o.required)(
                'tabIndex',
                o.disabled ? -1 : o.tabIndex
              ),
              U('aria-label', o.ariaLabel || null)(
                'aria-labelledby',
                o.ariaLabelledby
              )('aria-describedby', o.ariaDescribedby)(
                'aria-checked',
                o.indeterminate ? 'mixed' : null
              )('name', o.name)('value', o.value),
              k(7),
              B('matRippleTrigger', a)(
                'matRippleDisabled',
                o.disableRipple || o.disabled
              )('matRippleCentered', !0),
              k(1),
              B('for', o.inputId);
          }
        },
        dependencies: [wt],
        styles: [
          '.mdc-touch-target-wrapper{display:inline}@keyframes mdc-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:29.7833385}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 1)}100%{stroke-dashoffset:0}}@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mdc-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);opacity:1;stroke-dashoffset:0}to{opacity:0;stroke-dashoffset:-29.7833385}}@keyframes mdc-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(45deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(45deg);opacity:0}to{transform:rotate(360deg);opacity:1}}@keyframes mdc-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:mdc-animation-deceleration-curve-timing-function;transform:rotate(-45deg);opacity:0}to{transform:rotate(0deg);opacity:1}}@keyframes mdc-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);transform:rotate(0deg);opacity:1}to{transform:rotate(315deg);opacity:0}}@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;transform:scaleX(1);opacity:1}32.8%,100%{transform:scaleX(0);opacity:0}}.mdc-checkbox{display:inline-block;position:relative;flex:0 0 18px;box-sizing:content-box;width:18px;height:18px;line-height:0;white-space:nowrap;cursor:pointer;vertical-align:bottom}.mdc-checkbox[hidden]{display:none}.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring{pointer-events:none;border:2px solid rgba(0,0,0,0);border-radius:6px;box-sizing:content-box;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:100%;width:100%}@media screen and (forced-colors: active){.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring{border-color:CanvasText}}.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring::after,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring::after{content:"";border:2px solid rgba(0,0,0,0);border-radius:8px;display:block;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);height:calc(100% + 4px);width:calc(100% + 4px)}@media screen and (forced-colors: active){.mdc-checkbox.mdc-ripple-upgraded--background-focused .mdc-checkbox__focus-ring::after,.mdc-checkbox:not(.mdc-ripple-upgraded):focus .mdc-checkbox__focus-ring::after{border-color:CanvasText}}@media all and (-ms-high-contrast: none){.mdc-checkbox .mdc-checkbox__focus-ring{display:none}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-checkbox__mixedmark{margin:0 1px}}.mdc-checkbox--disabled{cursor:default;pointer-events:none}.mdc-checkbox__background{display:inline-flex;position:absolute;align-items:center;justify-content:center;box-sizing:border-box;width:18px;height:18px;border:2px solid currentColor;border-radius:2px;background-color:rgba(0,0,0,0);pointer-events:none;will-change:background-color,border-color;transition:background-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__checkmark{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;opacity:0;transition:opacity 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--upgraded .mdc-checkbox__checkmark{opacity:1}.mdc-checkbox__checkmark-path{transition:stroke-dashoffset 180ms 0ms cubic-bezier(0.4, 0, 0.6, 1);stroke:currentColor;stroke-width:3.12px;stroke-dashoffset:29.7833385;stroke-dasharray:29.7833385}.mdc-checkbox__mixedmark{width:100%;height:0;transform:scaleX(0) rotate(0deg);border-width:1px;border-style:solid;opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background{animation-duration:180ms;animation-timing-function:linear}.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-unchecked-checked-checkmark-path 180ms linear 0s;transition:none}.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path{animation:mdc-checkbox-checked-unchecked-checkmark-path 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark{animation:mdc-checkbox-checked-indeterminate-checkmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark{animation:mdc-checkbox-checked-indeterminate-mixedmark 90ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark{animation:mdc-checkbox-indeterminate-checked-checkmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-checked-mixedmark 500ms linear 0s;transition:none}.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark{animation:mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear 0s;transition:none}.mdc-checkbox__native-control:checked~.mdc-checkbox__background,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background{transition:border-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1),background-color 90ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark-path,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark-path{stroke-dashoffset:0}.mdc-checkbox__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit}.mdc-checkbox__native-control:disabled{cursor:default;pointer-events:none}.mdc-checkbox--touch{margin:calc((var(--mdc-checkbox-state-layer-size) - var(--mdc-checkbox-state-layer-size)) / 2)}.mdc-checkbox--touch .mdc-checkbox__native-control{top:calc((var(--mdc-checkbox-state-layer-size) - var(--mdc-checkbox-state-layer-size)) / 2);right:calc((var(--mdc-checkbox-state-layer-size) - var(--mdc-checkbox-state-layer-size)) / 2);left:calc((var(--mdc-checkbox-state-layer-size) - var(--mdc-checkbox-state-layer-size)) / 2);width:var(--mdc-checkbox-state-layer-size);height:var(--mdc-checkbox-state-layer-size)}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__checkmark{transition:opacity 180ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 180ms 0ms cubic-bezier(0, 0, 0.2, 1);opacity:1}.mdc-checkbox__native-control:checked~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(-45deg)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__checkmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__checkmark{transform:rotate(45deg);opacity:0;transition:opacity 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 90ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-checkbox__native-control:indeterminate~.mdc-checkbox__background .mdc-checkbox__mixedmark,.mdc-checkbox__native-control[data-indeterminate=true]~.mdc-checkbox__background .mdc-checkbox__mixedmark{transform:scaleX(1) rotate(0deg);opacity:1}.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__checkmark-path,.mdc-checkbox.mdc-checkbox--upgraded .mdc-checkbox__mixedmark{transition:none}.mdc-form-field{display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field[hidden]{display:none}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}.mdc-checkbox{padding:calc((var(--mdc-checkbox-state-layer-size) - 18px) / 2);margin:calc((var(--mdc-checkbox-state-layer-size) - var(--mdc-checkbox-state-layer-size)) / 2)}.mdc-checkbox .mdc-checkbox__native-control[disabled]:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:var(--mdc-checkbox-disabled-unselected-icon-color);background-color:transparent}.mdc-checkbox .mdc-checkbox__native-control[disabled]:checked~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control[disabled]:indeterminate~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true][disabled]~.mdc-checkbox__background{border-color:transparent;background-color:var(--mdc-checkbox-disabled-selected-icon-color)}.mdc-checkbox .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:var(--mdc-checkbox-selected-checkmark-color)}.mdc-checkbox .mdc-checkbox__native-control:enabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:var(--mdc-checkbox-selected-checkmark-color)}.mdc-checkbox .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__checkmark{color:var(--mdc-checkbox-disabled-selected-checkmark-color)}.mdc-checkbox .mdc-checkbox__native-control:disabled~.mdc-checkbox__background .mdc-checkbox__mixedmark{border-color:var(--mdc-checkbox-disabled-selected-checkmark-color)}.mdc-checkbox .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:var(--mdc-checkbox-unselected-icon-color);background-color:transparent}.mdc-checkbox .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-icon-color);background-color:var(--mdc-checkbox-selected-icon-color)}@keyframes mdc-checkbox-fade-in-background-8A000000FFF4433600000000FFF44336{0%{border-color:var(--mdc-checkbox-unselected-icon-color);background-color:transparent}50%{border-color:var(--mdc-checkbox-selected-icon-color);background-color:var(--mdc-checkbox-selected-icon-color)}}@keyframes mdc-checkbox-fade-out-background-8A000000FFF4433600000000FFF44336{0%,80%{border-color:var(--mdc-checkbox-selected-icon-color);background-color:var(--mdc-checkbox-selected-icon-color)}100%{border-color:var(--mdc-checkbox-unselected-icon-color);background-color:transparent}}.mdc-checkbox.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FFF4433600000000FFF44336}.mdc-checkbox.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FFF4433600000000FFF44336}.mdc-checkbox:hover .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:var(--mdc-checkbox-unselected-hover-icon-color);background-color:transparent}.mdc-checkbox:hover .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-checkbox:hover .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mdc-checkbox:hover .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-hover-icon-color);background-color:var(--mdc-checkbox-selected-hover-icon-color)}@keyframes mdc-checkbox-fade-in-background-FF212121FFF4433600000000FFF44336{0%{border-color:var(--mdc-checkbox-unselected-hover-icon-color);background-color:transparent}50%{border-color:var(--mdc-checkbox-selected-hover-icon-color);background-color:var(--mdc-checkbox-selected-hover-icon-color)}}@keyframes mdc-checkbox-fade-out-background-FF212121FFF4433600000000FFF44336{0%,80%{border-color:var(--mdc-checkbox-selected-hover-icon-color);background-color:var(--mdc-checkbox-selected-hover-icon-color)}100%{border-color:var(--mdc-checkbox-unselected-hover-icon-color);background-color:transparent}}.mdc-checkbox:hover.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox:hover.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-FF212121FFF4433600000000FFF44336}.mdc-checkbox:hover.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox:hover.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-FF212121FFF4433600000000FFF44336}.mdc-checkbox:not(:disabled):active .mdc-checkbox__native-control:enabled:not(:checked):not(:indeterminate):not([data-indeterminate=true])~.mdc-checkbox__background{border-color:var(--mdc-checkbox-unselected-pressed-icon-color);background-color:transparent}.mdc-checkbox:not(:disabled):active .mdc-checkbox__native-control:enabled:checked~.mdc-checkbox__background,.mdc-checkbox:not(:disabled):active .mdc-checkbox__native-control:enabled:indeterminate~.mdc-checkbox__background,.mdc-checkbox:not(:disabled):active .mdc-checkbox__native-control[data-indeterminate=true]:enabled~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-pressed-icon-color);background-color:var(--mdc-checkbox-selected-pressed-icon-color)}@keyframes mdc-checkbox-fade-in-background-8A000000FFF4433600000000FFF44336{0%{border-color:var(--mdc-checkbox-unselected-pressed-icon-color);background-color:transparent}50%{border-color:var(--mdc-checkbox-selected-pressed-icon-color);background-color:var(--mdc-checkbox-selected-pressed-icon-color)}}@keyframes mdc-checkbox-fade-out-background-8A000000FFF4433600000000FFF44336{0%,80%{border-color:var(--mdc-checkbox-selected-pressed-icon-color);background-color:var(--mdc-checkbox-selected-pressed-icon-color)}100%{border-color:var(--mdc-checkbox-unselected-pressed-icon-color);background-color:transparent}}.mdc-checkbox:not(:disabled):active.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox:not(:disabled):active.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-in-background-8A000000FFF4433600000000FFF44336}.mdc-checkbox:not(:disabled):active.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background,.mdc-checkbox:not(:disabled):active.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__native-control:enabled~.mdc-checkbox__background{animation-name:mdc-checkbox-fade-out-background-8A000000FFF4433600000000FFF44336}.mdc-checkbox .mdc-checkbox__background{top:calc((var(--mdc-checkbox-state-layer-size) - 18px) / 2);left:calc((var(--mdc-checkbox-state-layer-size) - 18px) / 2)}.mdc-checkbox .mdc-checkbox__native-control{top:calc((var(--mdc-checkbox-state-layer-size) - var(--mdc-checkbox-state-layer-size)) / 2);right:calc((var(--mdc-checkbox-state-layer-size) - var(--mdc-checkbox-state-layer-size)) / 2);left:calc((var(--mdc-checkbox-state-layer-size) - var(--mdc-checkbox-state-layer-size)) / 2);width:var(--mdc-checkbox-state-layer-size);height:var(--mdc-checkbox-state-layer-size)}.mdc-checkbox .mdc-checkbox__native-control:enabled:focus:focus:not(:checked):not(:indeterminate)~.mdc-checkbox__background{border-color:var(--mdc-checkbox-unselected-focus-icon-color)}.mdc-checkbox .mdc-checkbox__native-control:enabled:focus:checked~.mdc-checkbox__background,.mdc-checkbox .mdc-checkbox__native-control:enabled:focus:indeterminate~.mdc-checkbox__background{border-color:var(--mdc-checkbox-selected-focus-icon-color);background-color:var(--mdc-checkbox-selected-focus-icon-color)}.mdc-checkbox:hover .mdc-checkbox__ripple{opacity:var(--mdc-checkbox-unselected-hover-state-layer-opacity);background-color:var(--mdc-checkbox-unselected-hover-state-layer-color)}.mdc-checkbox:hover .mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-unselected-hover-state-layer-color)}.mdc-checkbox .mdc-checkbox__native-control:focus~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-unselected-focus-state-layer-opacity);background-color:var(--mdc-checkbox-unselected-focus-state-layer-color)}.mdc-checkbox .mdc-checkbox__native-control:focus~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-unselected-focus-state-layer-color)}.mdc-checkbox:active .mdc-checkbox__native-control~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-unselected-pressed-state-layer-opacity);background-color:var(--mdc-checkbox-unselected-pressed-state-layer-color)}.mdc-checkbox:active .mdc-checkbox__native-control~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-unselected-pressed-state-layer-color)}.mdc-checkbox:hover .mdc-checkbox__native-control:checked~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-selected-hover-state-layer-opacity);background-color:var(--mdc-checkbox-selected-hover-state-layer-color)}.mdc-checkbox:hover .mdc-checkbox__native-control:checked~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-selected-hover-state-layer-color)}.mdc-checkbox .mdc-checkbox__native-control:focus:checked~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-selected-focus-state-layer-opacity);background-color:var(--mdc-checkbox-selected-focus-state-layer-color)}.mdc-checkbox .mdc-checkbox__native-control:focus:checked~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-selected-focus-state-layer-color)}.mdc-checkbox:active .mdc-checkbox__native-control:checked~.mdc-checkbox__ripple{opacity:var(--mdc-checkbox-selected-pressed-state-layer-opacity);background-color:var(--mdc-checkbox-selected-pressed-state-layer-color)}.mdc-checkbox:active .mdc-checkbox__native-control:checked~.mat-mdc-checkbox-ripple .mat-ripple-element{background-color:var(--mdc-checkbox-selected-pressed-state-layer-color)}.mat-mdc-checkbox{display:inline-block;position:relative;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-checkbox .mdc-checkbox__background{-webkit-print-color-adjust:exact;color-adjust:exact}.mat-mdc-checkbox._mat-animation-noopable *,.mat-mdc-checkbox._mat-animation-noopable *::before{transition:none !important;animation:none !important}.mat-mdc-checkbox label{cursor:pointer}.mat-mdc-checkbox.mat-mdc-checkbox-disabled label{cursor:default}.mat-mdc-checkbox label:empty{display:none}.cdk-high-contrast-active .mat-mdc-checkbox.mat-mdc-checkbox-disabled{opacity:.5}.cdk-high-contrast-active .mat-mdc-checkbox .mdc-checkbox__checkmark{--mdc-checkbox-selected-checkmark-color: CanvasText;--mdc-checkbox-disabled-selected-checkmark-color: CanvasText}.mat-mdc-checkbox .mdc-checkbox__ripple{opacity:0}.mat-mdc-checkbox-ripple,.mdc-checkbox__ripple{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-checkbox-ripple:not(:empty),.mdc-checkbox__ripple:not(:empty){transform:translateZ(0)}.mat-mdc-checkbox-ripple .mat-ripple-element{opacity:.1}.mat-mdc-checkbox-touch-target{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.mat-mdc-checkbox-ripple::before{border-radius:50%}.mdc-checkbox__native-control:focus~.mat-mdc-focus-indicator::before{content:""}',
        ],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let i = t;
    return i;
  })();
var Da = (() => {
    let t = class t {};
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵmod = E({ type: t })),
      (t.ɵinj = C({}));
    let i = t;
    return i;
  })(),
  Ra = (() => {
    let t = class t {};
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵmod = E({ type: t })),
      (t.ɵinj = C({ imports: [j, zt, Da, j, Da] }));
    let i = t;
    return i;
  })();
var Oa = (() => {
    let t = class t {
      constructor() {
        (this._vertical = !1), (this._inset = !1);
      }
      get vertical() {
        return this._vertical;
      }
      set vertical(e) {
        this._vertical = ot(e);
      }
      get inset() {
        return this._inset;
      }
      set inset(e) {
        this._inset = ot(e);
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵcmp = Q({
        type: t,
        selectors: [['mat-divider']],
        hostAttrs: ['role', 'separator', 1, 'mat-divider'],
        hostVars: 7,
        hostBindings: function (n, o) {
          n & 2 &&
            (U('aria-orientation', o.vertical ? 'vertical' : 'horizontal'),
            M('mat-divider-vertical', o.vertical)(
              'mat-divider-horizontal',
              !o.vertical
            )('mat-divider-inset', o.inset));
        },
        inputs: { vertical: 'vertical', inset: 'inset' },
        decls: 0,
        vars: 0,
        template: function (n, o) {},
        styles: [
          '.mat-divider{display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color);border-top-width:var(--mat-divider-width)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color);border-right-width:var(--mat-divider-width)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}',
        ],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let i = t;
    return i;
  })(),
  La = (() => {
    let t = class t {};
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵmod = E({ type: t })),
      (t.ɵinj = C({ imports: [j, j] }));
    let i = t;
    return i;
  })();
var Sn = class {
    constructor(t) {
      (this._box = t),
        (this._destroyed = new nt()),
        (this._resizeSubject = new nt()),
        (this._elementObservables = new Map()),
        typeof ResizeObserver < 'u' &&
          (this._resizeObserver = new ResizeObserver((r) =>
            this._resizeSubject.next(r)
          ));
    }
    observe(t) {
      return (
        this._elementObservables.has(t) ||
          this._elementObservables.set(
            t,
            new $e((r) => {
              let e = this._resizeSubject.subscribe(r);
              return (
                this._resizeObserver?.observe(t, { box: this._box }),
                () => {
                  this._resizeObserver?.unobserve(t),
                    e.unsubscribe(),
                    this._elementObservables.delete(t);
                }
              );
            }).pipe(
              Zi((r) => r.some((e) => e.target === t)),
              Po({ bufferSize: 1, refCount: !0 }),
              Et(this._destroyed)
            )
          ),
        this._elementObservables.get(t)
      );
    }
    destroy() {
      this._destroyed.next(),
        this._destroyed.complete(),
        this._resizeSubject.complete(),
        this._elementObservables.clear();
    }
  },
  Va = (() => {
    let t = class t {
      constructor() {
        (this._observers = new Map()),
          (this._ngZone = O(S)),
          typeof ResizeObserver < 'u';
      }
      ngOnDestroy() {
        for (let [, e] of this._observers) e.destroy();
        this._observers.clear(), typeof ResizeObserver < 'u';
      }
      observe(e, n) {
        let o = n?.box || 'content-box';
        return (
          this._observers.has(o) || this._observers.set(o, new Sn(o)),
          this._observers.get(o).observe(e)
        );
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let i = t;
    return i;
  })();
var Zl = ['notch'],
  Xl = ['matFormFieldNotchedOutline', ''],
  $l = ['*'],
  Kl = ['textField'],
  Jl = ['iconPrefixContainer'],
  tm = ['textPrefixContainer'];
function em(i, t) {
  i & 1 && w(0, 'span', 16);
}
function im(i, t) {
  if (
    (i & 1 && (p(0, 'label', 14), L(1, 1), W(2, em, 1, 0, 'span', 15), g()),
    i & 2)
  ) {
    let r = K(2);
    B('floating', r._shouldLabelFloat())('monitorResize', r._hasOutline())(
      'id',
      r._labelId
    ),
      U('for', r._control.id),
      k(2),
      q(2, !r.hideRequiredMarker && r._control.required ? 2 : -1);
  }
}
function nm(i, t) {
  if ((i & 1 && W(0, im, 3, 5, 'label', 14), i & 2)) {
    let r = K();
    q(0, r._hasFloatingLabel() ? 0 : -1);
  }
}
function om(i, t) {
  i & 1 && w(0, 'div', 17);
}
function rm(i, t) {}
function am(i, t) {
  if ((i & 1 && W(0, rm, 0, 0, 'ng-template', 9), i & 2)) {
    K(2);
    let r = Rt(1);
    B('ngTemplateOutlet', r);
  }
}
function sm(i, t) {
  if ((i & 1 && (p(0, 'div', 5), W(1, am, 1, 1, null, 9), g()), i & 2)) {
    let r = K();
    B('matFormFieldNotchedOutlineOpen', r._shouldLabelFloat()),
      k(1),
      q(1, r._forceDisplayInfixLabel() ? -1 : 1);
  }
}
function dm(i, t) {
  i & 1 && (p(0, 'div', 18, 19), L(2, 2), g());
}
function cm(i, t) {
  i & 1 && (p(0, 'div', 20, 21), L(2, 3), g());
}
function lm(i, t) {}
function mm(i, t) {
  if ((i & 1 && W(0, lm, 0, 0, 'ng-template', 9), i & 2)) {
    K();
    let r = Rt(1);
    B('ngTemplateOutlet', r);
  }
}
function um(i, t) {
  i & 1 && (p(0, 'div', 22), L(1, 4), g());
}
function hm(i, t) {
  i & 1 && (p(0, 'div', 23), L(1, 5), g());
}
function fm(i, t) {
  i & 1 && w(0, 'div', 12);
}
function pm(i, t) {
  if ((i & 1 && (p(0, 'div', 24), L(1, 6), g()), i & 2)) {
    let r = K();
    B('@transitionMessages', r._subscriptAnimationState);
  }
}
function bm(i, t) {
  if ((i & 1 && (p(0, 'mat-hint', 26), at(1), g()), i & 2)) {
    let r = K(2);
    B('id', r._hintLabelId), k(1), ii(r.hintLabel);
  }
}
function gm(i, t) {
  if (
    (i & 1 &&
      (p(0, 'div', 25),
      W(1, bm, 2, 2, 'mat-hint', 26),
      L(2, 7),
      w(3, 'div', 27),
      L(4, 8),
      g()),
    i & 2)
  ) {
    let r = K();
    B('@transitionMessages', r._subscriptAnimationState),
      k(1),
      q(1, r.hintLabel ? 1 : -1);
  }
}
var _m = [
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
  vm = [
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
  Fi = (() => {
    let t = class t {};
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵdir = T({ type: t, selectors: [['mat-label']] }));
    let i = t;
    return i;
  })();
var xm = new y('MatError');
var ym = 0,
  Na = (() => {
    let t = class t {
      constructor() {
        (this.align = 'start'), (this.id = `mat-mdc-hint-${ym++}`);
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵdir = T({
        type: t,
        selectors: [['mat-hint']],
        hostAttrs: [
          1,
          'mat-mdc-form-field-hint',
          'mat-mdc-form-field-bottom-align',
        ],
        hostVars: 4,
        hostBindings: function (n, o) {
          n & 2 &&
            (Kt('id', o.id),
            U('align', null),
            M('mat-mdc-form-field-hint-end', o.align === 'end'));
        },
        inputs: { align: 'align', id: 'id' },
      }));
    let i = t;
    return i;
  })(),
  km = new y('MatPrefix');
var wm = new y('MatSuffix');
var Qa = new y('FloatingLabelParent'),
  Ba = (() => {
    let t = class t {
      get floating() {
        return this._floating;
      }
      set floating(e) {
        (this._floating = e), this.monitorResize && this._handleResize();
      }
      get monitorResize() {
        return this._monitorResize;
      }
      set monitorResize(e) {
        (this._monitorResize = e),
          this._monitorResize
            ? this._subscribeToResize()
            : this._resizeSubscription.unsubscribe();
      }
      constructor(e) {
        (this._elementRef = e),
          (this._floating = !1),
          (this._monitorResize = !1),
          (this._resizeObserver = O(Va)),
          (this._ngZone = O(S)),
          (this._parent = O(Qa)),
          (this._resizeSubscription = new Ce());
      }
      ngOnDestroy() {
        this._resizeSubscription.unsubscribe();
      }
      getWidth() {
        return Cm(this._elementRef.nativeElement);
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
    (t.ɵfac = function (n) {
      return new (n || t)(m(A));
    }),
      (t.ɵdir = T({
        type: t,
        selectors: [['label', 'matFormFieldFloatingLabel', '']],
        hostAttrs: [1, 'mdc-floating-label', 'mat-mdc-floating-label'],
        hostVars: 2,
        hostBindings: function (n, o) {
          n & 2 && M('mdc-floating-label--float-above', o.floating);
        },
        inputs: { floating: 'floating', monitorResize: 'monitorResize' },
      }));
    let i = t;
    return i;
  })();
function Cm(i) {
  let t = i;
  if (t.offsetParent !== null) return t.scrollWidth;
  let r = t.cloneNode(!0);
  r.style.setProperty('position', 'absolute'),
    r.style.setProperty('transform', 'translate(-9999px, -9999px)'),
    document.documentElement.appendChild(r);
  let e = r.scrollWidth;
  return r.remove(), e;
}
var Pa = 'mdc-line-ripple--active',
  Ai = 'mdc-line-ripple--deactivating',
  Ua = (() => {
    let t = class t {
      constructor(e, n) {
        (this._elementRef = e),
          (this._handleTransitionEnd = (o) => {
            let a = this._elementRef.nativeElement.classList,
              s = a.contains(Ai);
            o.propertyName === 'opacity' && s && a.remove(Pa, Ai);
          }),
          n.runOutsideAngular(() => {
            e.nativeElement.addEventListener(
              'transitionend',
              this._handleTransitionEnd
            );
          });
      }
      activate() {
        let e = this._elementRef.nativeElement.classList;
        e.remove(Ai), e.add(Pa);
      }
      deactivate() {
        this._elementRef.nativeElement.classList.add(Ai);
      }
      ngOnDestroy() {
        this._elementRef.nativeElement.removeEventListener(
          'transitionend',
          this._handleTransitionEnd
        );
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(m(A), m(S));
    }),
      (t.ɵdir = T({
        type: t,
        selectors: [['div', 'matFormFieldLineRipple', '']],
        hostAttrs: [1, 'mdc-line-ripple'],
      }));
    let i = t;
    return i;
  })(),
  ja = (() => {
    let t = class t {
      constructor(e, n) {
        (this._elementRef = e), (this._ngZone = n), (this.open = !1);
      }
      ngAfterViewInit() {
        let e = this._elementRef.nativeElement.querySelector(
          '.mdc-floating-label'
        );
        e
          ? (this._elementRef.nativeElement.classList.add(
              'mdc-notched-outline--upgraded'
            ),
            typeof requestAnimationFrame == 'function' &&
              ((e.style.transitionDuration = '0s'),
              this._ngZone.runOutsideAngular(() => {
                requestAnimationFrame(() => (e.style.transitionDuration = ''));
              })))
          : this._elementRef.nativeElement.classList.add(
              'mdc-notched-outline--no-label'
            );
      }
      _setNotchWidth(e) {
        !this.open || !e
          ? (this._notch.nativeElement.style.width = '')
          : (this._notch.nativeElement.style.width = `calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + ${
              8 + 1
            }px)`);
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(m(A), m(S));
    }),
      (t.ɵcmp = Q({
        type: t,
        selectors: [['div', 'matFormFieldNotchedOutline', '']],
        viewQuery: function (n, o) {
          if ((n & 1 && Y(Zl, 5), n & 2)) {
            let a;
            F((a = D())) && (o._notch = a.first);
          }
        },
        hostAttrs: [1, 'mdc-notched-outline'],
        hostVars: 2,
        hostBindings: function (n, o) {
          n & 2 && M('mdc-notched-outline--notched', o.open);
        },
        inputs: { open: ['matFormFieldNotchedOutlineOpen', 'open'] },
        attrs: Xl,
        ngContentSelectors: $l,
        decls: 5,
        vars: 0,
        consts: [
          [1, 'mdc-notched-outline__leading'],
          [1, 'mdc-notched-outline__notch'],
          ['notch', ''],
          [1, 'mdc-notched-outline__trailing'],
        ],
        template: function (n, o) {
          n & 1 &&
            (dt(),
            w(0, 'div', 0),
            p(1, 'div', 1, 2),
            L(3),
            g(),
            w(4, 'div', 3));
        },
        encapsulation: 2,
        changeDetection: 0,
      }));
    let i = t;
    return i;
  })(),
  Em = {
    transitionMessages: ar('transitionMessages', [
      dr('enter', rn({ opacity: 1, transform: 'translateY(0%)' })),
      cr('void => enter', [
        rn({ opacity: 0, transform: 'translateY(-5px)' }),
        sr('300ms cubic-bezier(0.55, 0, 0.55, 0.2)'),
      ]),
    ]),
  },
  Rn = (() => {
    let t = class t {};
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵdir = T({ type: t }));
    let i = t;
    return i;
  })();
var On = new y('MatFormField'),
  Im = new y('MAT_FORM_FIELD_DEFAULT_OPTIONS'),
  za = 0,
  Ha = 'fill',
  Mm = 'auto',
  Ga = 'fixed',
  Tm = 'translateY(-50%)',
  Wa = (() => {
    let t = class t {
      get hideRequiredMarker() {
        return this._hideRequiredMarker;
      }
      set hideRequiredMarker(e) {
        this._hideRequiredMarker = ot(e);
      }
      get floatLabel() {
        return this._floatLabel || this._defaults?.floatLabel || Mm;
      }
      set floatLabel(e) {
        e !== this._floatLabel &&
          ((this._floatLabel = e), this._changeDetectorRef.markForCheck());
      }
      get appearance() {
        return this._appearance;
      }
      set appearance(e) {
        let n = this._appearance,
          o = e || this._defaults?.appearance || Ha;
        (this._appearance = o),
          this._appearance === 'outline' &&
            this._appearance !== n &&
            (this._needsOutlineLabelOffsetUpdateOnStable = !0);
      }
      get subscriptSizing() {
        return this._subscriptSizing || this._defaults?.subscriptSizing || Ga;
      }
      set subscriptSizing(e) {
        this._subscriptSizing = e || this._defaults?.subscriptSizing || Ga;
      }
      get hintLabel() {
        return this._hintLabel;
      }
      set hintLabel(e) {
        (this._hintLabel = e), this._processHints();
      }
      get _control() {
        return this._explicitFormFieldControl || this._formFieldControl;
      }
      set _control(e) {
        this._explicitFormFieldControl = e;
      }
      constructor(e, n, o, a, s, d, c, l) {
        (this._elementRef = e),
          (this._changeDetectorRef = n),
          (this._ngZone = o),
          (this._dir = a),
          (this._platform = s),
          (this._defaults = d),
          (this._animationMode = c),
          (this._hideRequiredMarker = !1),
          (this.color = 'primary'),
          (this._appearance = Ha),
          (this._subscriptSizing = null),
          (this._hintLabel = ''),
          (this._hasIconPrefix = !1),
          (this._hasTextPrefix = !1),
          (this._hasIconSuffix = !1),
          (this._hasTextSuffix = !1),
          (this._labelId = `mat-mdc-form-field-label-${za++}`),
          (this._hintLabelId = `mat-mdc-hint-${za++}`),
          (this._subscriptAnimationState = ''),
          (this._destroyed = new nt()),
          (this._isFocused = null),
          (this._needsOutlineLabelOffsetUpdateOnStable = !1),
          d &&
            (d.appearance && (this.appearance = d.appearance),
            (this._hideRequiredMarker = !!d?.hideRequiredMarker),
            d.color && (this.color = d.color));
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
        let e = this._control;
        e.controlType &&
          this._elementRef.nativeElement.classList.add(
            `mat-mdc-form-field-type-${e.controlType}`
          ),
          e.stateChanges.subscribe(() => {
            this._updateFocusState(),
              this._syncDescribedByIds(),
              this._changeDetectorRef.markForCheck();
          }),
          e.ngControl &&
            e.ngControl.valueChanges &&
            e.ngControl.valueChanges
              .pipe(Et(this._destroyed))
              .subscribe(() => this._changeDetectorRef.markForCheck());
      }
      _checkPrefixAndSuffixTypes() {
        (this._hasIconPrefix = !!this._prefixChildren.find((e) => !e._isText)),
          (this._hasTextPrefix = !!this._prefixChildren.find((e) => e._isText)),
          (this._hasIconSuffix = !!this._suffixChildren.find(
            (e) => !e._isText
          )),
          (this._hasTextSuffix = !!this._suffixChildren.find((e) => e._isText));
      }
      _initializePrefixAndSuffix() {
        this._checkPrefixAndSuffixTypes(),
          Oo(
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
            this._ngZone.onStable.pipe(Et(this._destroyed)).subscribe(() => {
              this._needsOutlineLabelOffsetUpdateOnStable &&
                ((this._needsOutlineLabelOffsetUpdateOnStable = !1),
                this._updateOutlineLabelOffset());
            });
          }),
          this._dir.change
            .pipe(Et(this._destroyed))
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
      _shouldForward(e) {
        let n = this._control ? this._control.ngControl : null;
        return n && n[e];
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
          let e = [];
          if (
            (this._control.userAriaDescribedBy &&
              typeof this._control.userAriaDescribedBy == 'string' &&
              e.push(...this._control.userAriaDescribedBy.split(' ')),
            this._getDisplayedMessages() === 'hint')
          ) {
            let n = this._hintChildren
                ? this._hintChildren.find((a) => a.align === 'start')
                : null,
              o = this._hintChildren
                ? this._hintChildren.find((a) => a.align === 'end')
                : null;
            n ? e.push(n.id) : this._hintLabel && e.push(this._hintLabelId),
              o && e.push(o.id);
          } else
            this._errorChildren &&
              e.push(...this._errorChildren.map((n) => n.id));
          this._control.setDescribedByIds(e);
        }
      }
      _updateOutlineLabelOffset() {
        if (
          !this._platform.isBrowser ||
          !this._hasOutline() ||
          !this._floatingLabel
        )
          return;
        let e = this._floatingLabel.element;
        if (!(this._iconPrefixContainer || this._textPrefixContainer)) {
          e.style.transform = '';
          return;
        }
        if (!this._isAttachedToDom()) {
          this._needsOutlineLabelOffsetUpdateOnStable = !0;
          return;
        }
        let n = this._iconPrefixContainer?.nativeElement,
          o = this._textPrefixContainer?.nativeElement,
          a = n?.getBoundingClientRect().width ?? 0,
          s = o?.getBoundingClientRect().width ?? 0,
          d = this._dir.value === 'rtl' ? '-1' : '1',
          c = `${a + s}px`,
          u = `calc(${d} * (${c} + var(--mat-mdc-form-field-label-offset-x, 0px)))`;
        e.style.transform = `var(
        --mat-mdc-form-field-label-transform,
        ${Tm} translateX(${u})
    )`;
      }
      _isAttachedToDom() {
        let e = this._elementRef.nativeElement;
        if (e.getRootNode) {
          let n = e.getRootNode();
          return n && n !== e;
        }
        return document.documentElement.contains(e);
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(
        m(A),
        m(ht),
        m(S),
        m(yi),
        m(Z),
        m(Im, 8),
        m(ut, 8),
        m(pt)
      );
    }),
      (t.ɵcmp = Q({
        type: t,
        selectors: [['mat-form-field']],
        contentQueries: function (n, o, a) {
          if (
            (n & 1 &&
              (gt(a, Fi, 5),
              gt(a, Fi, 7),
              gt(a, Rn, 5),
              gt(a, km, 5),
              gt(a, wm, 5),
              gt(a, xm, 5),
              gt(a, Na, 5)),
            n & 2)
          ) {
            let s;
            F((s = D())) && (o._labelChildNonStatic = s.first),
              F((s = D())) && (o._labelChildStatic = s.first),
              F((s = D())) && (o._formFieldControl = s.first),
              F((s = D())) && (o._prefixChildren = s),
              F((s = D())) && (o._suffixChildren = s),
              F((s = D())) && (o._errorChildren = s),
              F((s = D())) && (o._hintChildren = s);
          }
        },
        viewQuery: function (n, o) {
          if (
            (n & 1 &&
              (Y(Kl, 5), Y(Jl, 5), Y(tm, 5), Y(Ba, 5), Y(ja, 5), Y(Ua, 5)),
            n & 2)
          ) {
            let a;
            F((a = D())) && (o._textField = a.first),
              F((a = D())) && (o._iconPrefixContainer = a.first),
              F((a = D())) && (o._textPrefixContainer = a.first),
              F((a = D())) && (o._floatingLabel = a.first),
              F((a = D())) && (o._notchedOutline = a.first),
              F((a = D())) && (o._lineRipple = a.first);
          }
        },
        hostAttrs: [1, 'mat-mdc-form-field'],
        hostVars: 42,
        hostBindings: function (n, o) {
          n & 2 &&
            M('mat-mdc-form-field-label-always-float', o._shouldAlwaysFloat())(
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
          tt([
            { provide: On, useExisting: t },
            { provide: Qa, useExisting: t },
          ]),
        ],
        ngContentSelectors: vm,
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
        template: function (n, o) {
          if (
            (n & 1 &&
              (dt(_m),
              W(0, nm, 1, 1, 'ng-template', null, 0, Ko),
              p(2, 'div', 1, 2),
              H('click', function (s) {
                return o._control.onContainerClick(s);
              }),
              W(4, om, 1, 0, 'div', 3),
              p(5, 'div', 4),
              W(6, sm, 2, 2, 'div', 5)(7, dm, 3, 0, 'div', 6)(
                8,
                cm,
                3,
                0,
                'div',
                7
              ),
              p(9, 'div', 8),
              W(10, mm, 1, 1, null, 9),
              L(11),
              g(),
              W(12, um, 2, 0, 'div', 10)(13, hm, 2, 0, 'div', 11),
              g(),
              W(14, fm, 1, 0, 'div', 12),
              g(),
              p(15, 'div', 13),
              W(16, pm, 2, 1)(17, gm, 5, 2),
              g()),
            n & 2)
          ) {
            let a;
            k(2),
              M('mdc-text-field--filled', !o._hasOutline())(
                'mdc-text-field--outlined',
                o._hasOutline()
              )('mdc-text-field--no-label', !o._hasFloatingLabel())(
                'mdc-text-field--disabled',
                o._control.disabled
              )('mdc-text-field--invalid', o._control.errorState),
              k(2),
              q(4, !o._hasOutline() && !o._control.disabled ? 4 : -1),
              k(2),
              q(6, o._hasOutline() ? 6 : -1),
              k(1),
              q(7, o._hasIconPrefix ? 7 : -1),
              k(1),
              q(8, o._hasTextPrefix ? 8 : -1),
              k(2),
              q(10, !o._hasOutline() || o._forceDisplayInfixLabel() ? 10 : -1),
              k(2),
              q(12, o._hasTextSuffix ? 12 : -1),
              k(1),
              q(13, o._hasIconSuffix ? 13 : -1),
              k(1),
              q(14, o._hasOutline() ? -1 : 14),
              k(1),
              M(
                'mat-mdc-form-field-subscript-dynamic-size',
                o.subscriptSizing === 'dynamic'
              ),
              k(1),
              q(
                16,
                (a = o._getDisplayedMessages()) === 'error'
                  ? 16
                  : a === 'hint'
                  ? 17
                  : -1
              );
          }
        },
        dependencies: [tr, Na, Ba, ja, Ua],
        styles: [
          '.mdc-text-field{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0;display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-text-field__input{height:28px;width:100%;min-width:0;border:none;border-radius:0;background:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}@media all{.mdc-text-field__input::placeholder{opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{opacity:0}}@media all{.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{opacity:1}}@media all{.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{opacity:1}}.mdc-text-field__affix{height:28px;opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}@supports(-webkit-hyphens: none){.mdc-text-field--outlined .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field--filled{height:56px}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}@supports(-webkit-hyphens: none){.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px,var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px,var(--mdc-shape-small, 4px))*2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px,var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px,var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px,var(--mdc-shape-small, 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px,var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:rgba(0,0,0,0)}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mdc-text-field--textarea{flex-direction:column;align-items:center;width:auto;height:auto;padding:0}.mdc-text-field--textarea .mdc-floating-label{top:19px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--filled::before{display:none}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-10.25px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input{margin-top:23px;margin-bottom:9px}.mdc-text-field--textarea.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label{top:18px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:"";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both}.mdc-text-field--filled .mdc-text-field__resizer{transform:translateY(-1px)}.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateY(1px)}.mdc-text-field--outlined .mdc-text-field__resizer{transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{transform:translateX(-1px) translateY(1px)}.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 64px/0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field--with-trailing-icon,.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 64px/0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 96px/0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}@media screen and (forced-colors: active){.mdc-text-field--disabled .mdc-text-field__input{background-color:Window}.mdc-text-field--disabled .mdc-floating-label{z-index:1}}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--disabled.mdc-text-field--filled .mdc-text-field__ripple{display:none}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-floating-label{position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after,.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;pointer-events:none}.mdc-notched-outline__trailing{flex-grow:1}.mdc-notched-outline__notch{flex:0 0 auto;width:auto}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:133.3333333333%}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{z-index:1}.mdc-line-ripple::after{transform:scaleX(0);opacity:0;z-index:2}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{border-top:1px solid;border-bottom:1px solid}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{max-width:calc(100% - 12px*2)}.mdc-line-ripple::before{border-bottom-width:1px}.mdc-line-ripple::after{border-bottom-width:2px}.mdc-text-field--filled{border-top-left-radius:var(--mdc-filled-text-field-container-shape);border-top-right-radius:var(--mdc-filled-text-field-container-shape);border-bottom-right-radius:0;border-bottom-left-radius:0}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-filled-text-field-caret-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-filled-text-field-error-caret-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-filled-text-field-input-text-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-filled-text-field-disabled-input-text-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-label-text-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-focus-label-text-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-disabled-label-text-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-error-label-text-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-error-focus-label-text-color)}.mdc-text-field--filled .mdc-floating-label{font-family:var(--mdc-filled-text-field-label-text-font);font-size:var(--mdc-filled-text-field-label-text-size);font-weight:var(--mdc-filled-text-field-label-text-weight);letter-spacing:var(--mdc-filled-text-field-label-text-tracking)}@media all{.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}}@media all{.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:var(--mdc-filled-text-field-container-color)}.mdc-text-field--filled.mdc-text-field--disabled{background-color:var(--mdc-filled-text-field-disabled-container-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-active-indicator-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-hover-active-indicator-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-focus-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-disabled-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-hover-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-error-focus-active-indicator-color)}.mdc-text-field--filled .mdc-line-ripple::before{border-bottom-width:var(--mdc-filled-text-field-active-indicator-height)}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-width:var(--mdc-filled-text-field-focus-active-indicator-height)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-outlined-text-field-caret-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-outlined-text-field-error-caret-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-outlined-text-field-input-text-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-outlined-text-field-disabled-input-text-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-label-text-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-focus-label-text-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-disabled-label-text-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-error-label-text-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-error-focus-label-text-color)}.mdc-text-field--outlined .mdc-floating-label{font-family:var(--mdc-outlined-text-field-label-text-font);font-size:var(--mdc-outlined-text-field-label-text-size);font-weight:var(--mdc-outlined-text-field-label-text-weight);letter-spacing:var(--mdc-outlined-text-field-label-text-tracking)}@media all{.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color)}}@media all{.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:var(--mdc-outlined-text-field-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px,var(--mdc-outlined-text-field-container-shape))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px,var(--mdc-outlined-text-field-container-shape))*2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:var(--mdc-outlined-text-field-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px,var(--mdc-outlined-text-field-container-shape))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-hover-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-focus-outline-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-disabled-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-hover-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-focus-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__trailing{border-width:var(--mdc-outlined-text-field-outline-width)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:var(--mdc-outlined-text-field-focus-outline-width)}.mat-mdc-form-field-textarea-control{vertical-align:middle;resize:vertical;box-sizing:border-box;height:auto;margin:0;padding:0;border:none;overflow:auto}.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font:inherit;letter-spacing:inherit;text-decoration:inherit;text-transform:inherit;border:none}.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;line-height:normal;pointer-events:all}.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label{cursor:inherit}.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control{height:auto}.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color]{height:23px}.mat-mdc-text-field-wrapper{height:auto;flex:auto}.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-left:0;--mat-mdc-form-field-label-offset-x: -16px}.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-right:0}[dir=rtl] .mat-mdc-text-field-wrapper{padding-left:16px;padding-right:16px}[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-left:0}[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-right:0}.mat-form-field-disabled .mdc-text-field__input::placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label{left:auto;right:auto}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input{display:inline-block}.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch{padding-top:0}.mat-mdc-text-field-wrapper::before{content:none}.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:1px solid rgba(0,0,0,0)}[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:none;border-right:1px solid rgba(0,0,0,0)}.mat-mdc-form-field-subscript-wrapper{box-sizing:border-box;width:100%;position:relative}.mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-error-wrapper{position:absolute;top:0;left:0;right:0;padding:0 16px}.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper{position:static}.mat-mdc-form-field-bottom-align::before{content:"";display:inline-block;height:16px}.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before{content:unset}.mat-mdc-form-field-hint-end{order:1}.mat-mdc-form-field-hint-wrapper{display:flex}.mat-mdc-form-field-hint-spacer{flex:1 0 1em}.mat-mdc-form-field-error{display:block;color:var(--mat-form-field-error-text-color)}.mat-mdc-form-field-subscript-wrapper,.mat-mdc-form-field-bottom-align::before{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-subscript-text-font);line-height:var(--mat-form-field-subscript-text-line-height);font-size:var(--mat-form-field-subscript-text-size);letter-spacing:var(--mat-form-field-subscript-text-tracking);font-weight:var(--mat-form-field-subscript-text-weight)}.mat-mdc-form-field-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;opacity:0;pointer-events:none;background-color:var(--mat-form-field-state-layer-color)}.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-hover-state-layer-opacity)}.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-focus-state-layer-opacity)}select.mat-mdc-form-field-input-control{-moz-appearance:none;-webkit-appearance:none;background-color:rgba(0,0,0,0);display:inline-flex;box-sizing:border-box}select.mat-mdc-form-field-input-control:not(:disabled){cursor:pointer}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option{color:var(--mat-form-field-select-option-text-color)}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled{color:var(--mat-form-field-select-disabled-option-text-color)}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;position:absolute;right:0;top:50%;margin-top:-2.5px;pointer-events:none;color:var(--mat-form-field-enabled-select-arrow-color)}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{right:auto;left:0}.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after{color:var(--mat-form-field-focus-select-arrow-color)}.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after{color:var(--mat-form-field-disabled-select-arrow-color)}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:15px}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:0;padding-left:15px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper{outline:solid 1px}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper{outline-color:GrayText}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper{outline:dashed 3px}.cdk-high-contrast-active .mat-mdc-form-field.mat-focused .mdc-notched-outline{border:dashed 3px}.mat-mdc-form-field-input-control[type=date],.mat-mdc-form-field-input-control[type=datetime],.mat-mdc-form-field-input-control[type=datetime-local],.mat-mdc-form-field-input-control[type=month],.mat-mdc-form-field-input-control[type=week],.mat-mdc-form-field-input-control[type=time]{line-height:1}.mat-mdc-form-field-input-control::-webkit-datetime-edit{line-height:1;padding:0;margin-bottom:-2px}.mat-mdc-form-field{--mat-mdc-form-field-floating-label-scale: 0.75;display:inline-flex;flex-direction:column;min-width:0;text-align:left;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-container-text-font);line-height:var(--mat-form-field-container-text-line-height);font-size:var(--mat-form-field-container-text-size);letter-spacing:var(--mat-form-field-container-text-tracking);font-weight:var(--mat-form-field-container-text-weight)}[dir=rtl] .mat-mdc-form-field{text-align:right}.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above{font-size:calc(var(--mat-form-field-outlined-label-text-populated-size)*var(--mat-mdc-form-field-floating-label-scale))}.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:var(--mat-form-field-outlined-label-text-populated-size)}.mat-mdc-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-mdc-text-field-wrapper{width:100%}.mat-mdc-form-field-icon-prefix,.mat-mdc-form-field-icon-suffix{align-self:center;line-height:0;pointer-events:auto;position:relative;z-index:1}.mat-mdc-form-field-icon-prefix,[dir=rtl] .mat-mdc-form-field-icon-suffix{padding:0 4px 0 0}.mat-mdc-form-field-icon-suffix,[dir=rtl] .mat-mdc-form-field-icon-prefix{padding:0 0 0 4px}.mat-mdc-form-field-icon-prefix>.mat-icon,.mat-mdc-form-field-icon-suffix>.mat-icon{padding:12px;box-sizing:content-box}.mat-mdc-form-field-subscript-wrapper .mat-icon,.mat-mdc-form-field label .mat-icon{width:1em;height:1em;font-size:inherit}.mat-mdc-form-field-infix{flex:auto;min-width:0;width:180px;position:relative;box-sizing:border-box}.mat-mdc-form-field .mdc-notched-outline__notch{margin-left:-1px;-webkit-clip-path:inset(-9em -999em -9em 1px);clip-path:inset(-9em -999em -9em 1px)}[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch{margin-left:0;margin-right:-1px;-webkit-clip-path:inset(-9em 1px -9em -999em);clip-path:inset(-9em 1px -9em -999em)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input{transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms}}@media all{.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__affix{transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea{transition:none}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}}[dir=rtl] .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-floating-label{transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-notched-outline .mdc-floating-label{max-width:calc(100% + 1px)}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(133.3333333333% + 1px)}',
        ],
        encapsulation: 2,
        data: { animation: [Em.transitionMessages] },
        changeDetection: 0,
      }));
    let i = t;
    return i;
  })(),
  Ne = (() => {
    let t = class t {};
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵmod = E({ type: t })),
      (t.ɵinj = C({ imports: [j, er, $r, j] }));
    let i = t;
    return i;
  })();
var Dm = ['*'],
  Di;
function Sm() {
  if (Di === void 0 && ((Di = null), typeof window < 'u')) {
    let i = window;
    i.trustedTypes !== void 0 &&
      (Di = i.trustedTypes.createPolicy('angular#components', {
        createHTML: (t) => t,
      }));
  }
  return Di;
}
function Be(i) {
  return Sm()?.createHTML(i) || i;
}
function qa(i) {
  return Error(`Unable to find icon with the name "${i}"`);
}
function Rm() {
  return Error(
    'Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports.'
  );
}
function Ya(i) {
  return Error(
    `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${i}".`
  );
}
function Za(i) {
  return Error(
    `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${i}".`
  );
}
var Vt = class {
    constructor(t, r, e) {
      (this.url = t), (this.svgText = r), (this.options = e);
    }
  },
  Om = (() => {
    let t = class t {
      constructor(e, n, o, a) {
        (this._httpClient = e),
          (this._sanitizer = n),
          (this._errorHandler = a),
          (this._svgIconConfigs = new Map()),
          (this._iconSetConfigs = new Map()),
          (this._cachedIconsByUrl = new Map()),
          (this._inProgressUrlFetches = new Map()),
          (this._fontCssClassesByAlias = new Map()),
          (this._resolvers = []),
          (this._defaultFontSetClass = ['material-icons', 'mat-ligature-font']),
          (this._document = o);
      }
      addSvgIcon(e, n, o) {
        return this.addSvgIconInNamespace('', e, n, o);
      }
      addSvgIconLiteral(e, n, o) {
        return this.addSvgIconLiteralInNamespace('', e, n, o);
      }
      addSvgIconInNamespace(e, n, o, a) {
        return this._addSvgIconConfig(e, n, new Vt(o, null, a));
      }
      addSvgIconResolver(e) {
        return this._resolvers.push(e), this;
      }
      addSvgIconLiteralInNamespace(e, n, o, a) {
        let s = this._sanitizer.sanitize(ce.HTML, o);
        if (!s) throw Za(o);
        let d = Be(s);
        return this._addSvgIconConfig(e, n, new Vt('', d, a));
      }
      addSvgIconSet(e, n) {
        return this.addSvgIconSetInNamespace('', e, n);
      }
      addSvgIconSetLiteral(e, n) {
        return this.addSvgIconSetLiteralInNamespace('', e, n);
      }
      addSvgIconSetInNamespace(e, n, o) {
        return this._addSvgIconSetConfig(e, new Vt(n, null, o));
      }
      addSvgIconSetLiteralInNamespace(e, n, o) {
        let a = this._sanitizer.sanitize(ce.HTML, n);
        if (!a) throw Za(n);
        let s = Be(a);
        return this._addSvgIconSetConfig(e, new Vt('', s, o));
      }
      registerFontClassAlias(e, n = e) {
        return this._fontCssClassesByAlias.set(e, n), this;
      }
      classNameForFontAlias(e) {
        return this._fontCssClassesByAlias.get(e) || e;
      }
      setDefaultFontSetClass(...e) {
        return (this._defaultFontSetClass = e), this;
      }
      getDefaultFontSetClass() {
        return this._defaultFontSetClass;
      }
      getSvgIconFromUrl(e) {
        let n = this._sanitizer.sanitize(ce.RESOURCE_URL, e);
        if (!n) throw Ya(e);
        let o = this._cachedIconsByUrl.get(n);
        return o
          ? Dt(Si(o))
          : this._loadSvgIconFromConfig(new Vt(e, null)).pipe(
              Ie((a) => this._cachedIconsByUrl.set(n, a)),
              vt((a) => Si(a))
            );
      }
      getNamedSvgIcon(e, n = '') {
        let o = Xa(n, e),
          a = this._svgIconConfigs.get(o);
        if (a) return this._getSvgFromConfig(a);
        if (((a = this._getIconConfigFromResolvers(n, e)), a))
          return this._svgIconConfigs.set(o, a), this._getSvgFromConfig(a);
        let s = this._iconSetConfigs.get(n);
        return s ? this._getSvgFromIconSetConfigs(e, s) : Do(qa(o));
      }
      ngOnDestroy() {
        (this._resolvers = []),
          this._svgIconConfigs.clear(),
          this._iconSetConfigs.clear(),
          this._cachedIconsByUrl.clear();
      }
      _getSvgFromConfig(e) {
        return e.svgText
          ? Dt(Si(this._svgElementFromConfig(e)))
          : this._loadSvgIconFromConfig(e).pipe(vt((n) => Si(n)));
      }
      _getSvgFromIconSetConfigs(e, n) {
        let o = this._extractIconWithNameFromAnySet(e, n);
        if (o) return Dt(o);
        let a = n
          .filter((s) => !s.svgText)
          .map((s) =>
            this._loadSvgIconSetFromConfig(s).pipe(
              Lo((d) => {
                let l = `Loading icon set URL: ${this._sanitizer.sanitize(
                  ce.RESOURCE_URL,
                  s.url
                )} failed: ${d.message}`;
                return this._errorHandler.handleError(new Error(l)), Dt(null);
              })
            )
          );
        return Ke(a).pipe(
          vt(() => {
            let s = this._extractIconWithNameFromAnySet(e, n);
            if (!s) throw qa(e);
            return s;
          })
        );
      }
      _extractIconWithNameFromAnySet(e, n) {
        for (let o = n.length - 1; o >= 0; o--) {
          let a = n[o];
          if (a.svgText && a.svgText.toString().indexOf(e) > -1) {
            let s = this._svgElementFromConfig(a),
              d = this._extractSvgIconFromSet(s, e, a.options);
            if (d) return d;
          }
        }
        return null;
      }
      _loadSvgIconFromConfig(e) {
        return this._fetchIcon(e).pipe(
          Ie((n) => (e.svgText = n)),
          vt(() => this._svgElementFromConfig(e))
        );
      }
      _loadSvgIconSetFromConfig(e) {
        return e.svgText
          ? Dt(null)
          : this._fetchIcon(e).pipe(Ie((n) => (e.svgText = n)));
      }
      _extractSvgIconFromSet(e, n, o) {
        let a = e.querySelector(`[id="${n}"]`);
        if (!a) return null;
        let s = a.cloneNode(!0);
        if ((s.removeAttribute('id'), s.nodeName.toLowerCase() === 'svg'))
          return this._setSvgAttributes(s, o);
        if (s.nodeName.toLowerCase() === 'symbol')
          return this._setSvgAttributes(this._toSvgElement(s), o);
        let d = this._svgElementFromString(Be('<svg></svg>'));
        return d.appendChild(s), this._setSvgAttributes(d, o);
      }
      _svgElementFromString(e) {
        let n = this._document.createElement('DIV');
        n.innerHTML = e;
        let o = n.querySelector('svg');
        if (!o) throw Error('<svg> tag not found');
        return o;
      }
      _toSvgElement(e) {
        let n = this._svgElementFromString(Be('<svg></svg>')),
          o = e.attributes;
        for (let a = 0; a < o.length; a++) {
          let { name: s, value: d } = o[a];
          s !== 'id' && n.setAttribute(s, d);
        }
        for (let a = 0; a < e.childNodes.length; a++)
          e.childNodes[a].nodeType === this._document.ELEMENT_NODE &&
            n.appendChild(e.childNodes[a].cloneNode(!0));
        return n;
      }
      _setSvgAttributes(e, n) {
        return (
          e.setAttribute('fit', ''),
          e.setAttribute('height', '100%'),
          e.setAttribute('width', '100%'),
          e.setAttribute('preserveAspectRatio', 'xMidYMid meet'),
          e.setAttribute('focusable', 'false'),
          n && n.viewBox && e.setAttribute('viewBox', n.viewBox),
          e
        );
      }
      _fetchIcon(e) {
        let { url: n, options: o } = e,
          a = o?.withCredentials ?? !1;
        if (!this._httpClient) throw Rm();
        if (n == null) throw Error(`Cannot fetch icon from URL "${n}".`);
        let s = this._sanitizer.sanitize(ce.RESOURCE_URL, n);
        if (!s) throw Ya(n);
        let d = this._inProgressUrlFetches.get(s);
        if (d) return d;
        let c = this._httpClient
          .get(s, { responseType: 'text', withCredentials: a })
          .pipe(
            vt((l) => Be(l)),
            No(() => this._inProgressUrlFetches.delete(s)),
            Bo()
          );
        return this._inProgressUrlFetches.set(s, c), c;
      }
      _addSvgIconConfig(e, n, o) {
        return this._svgIconConfigs.set(Xa(e, n), o), this;
      }
      _addSvgIconSetConfig(e, n) {
        let o = this._iconSetConfigs.get(e);
        return o ? o.push(n) : this._iconSetConfigs.set(e, [n]), this;
      }
      _svgElementFromConfig(e) {
        if (!e.svgElement) {
          let n = this._svgElementFromString(e.svgText);
          this._setSvgAttributes(n, e.options), (e.svgElement = n);
        }
        return e.svgElement;
      }
      _getIconConfigFromResolvers(e, n) {
        for (let o = 0; o < this._resolvers.length; o++) {
          let a = this._resolvers[o](n, e);
          if (a)
            return Lm(a) ? new Vt(a.url, null, a.options) : new Vt(a, null);
        }
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(I(nr, 8), I(oi), I(pt, 8), I(ei));
    }),
      (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let i = t;
    return i;
  })();
function Si(i) {
  return i.cloneNode(!0);
}
function Xa(i, t) {
  return i + ':' + t;
}
function Lm(i) {
  return !!(i.url && i.options);
}
var Vm = wi(
    class {
      constructor(i) {
        this._elementRef = i;
      }
    }
  ),
  Nm = new y('MAT_ICON_DEFAULT_OPTIONS'),
  Bm = new y('mat-icon-location', { providedIn: 'root', factory: Pm });
function Pm() {
  let i = O(pt),
    t = i ? i.location : null;
  return { getPathname: () => (t ? t.pathname + t.search : '') };
}
var $a = [
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
  Um = $a.map((i) => `[${i}]`).join(', '),
  jm = /^url\(['"]?#(.*?)['"]?\)$/,
  Ka = (() => {
    let t = class t extends Vm {
      get inline() {
        return this._inline;
      }
      set inline(e) {
        this._inline = ot(e);
      }
      get svgIcon() {
        return this._svgIcon;
      }
      set svgIcon(e) {
        e !== this._svgIcon &&
          (e
            ? this._updateSvgIcon(e)
            : this._svgIcon && this._clearSvgElement(),
          (this._svgIcon = e));
      }
      get fontSet() {
        return this._fontSet;
      }
      set fontSet(e) {
        let n = this._cleanupFontValue(e);
        n !== this._fontSet &&
          ((this._fontSet = n), this._updateFontIconClasses());
      }
      get fontIcon() {
        return this._fontIcon;
      }
      set fontIcon(e) {
        let n = this._cleanupFontValue(e);
        n !== this._fontIcon &&
          ((this._fontIcon = n), this._updateFontIconClasses());
      }
      constructor(e, n, o, a, s, d) {
        super(e),
          (this._iconRegistry = n),
          (this._location = a),
          (this._errorHandler = s),
          (this._inline = !1),
          (this._previousFontSetClass = []),
          (this._currentIconFetch = Ce.EMPTY),
          d &&
            (d.color && (this.color = this.defaultColor = d.color),
            d.fontSet && (this.fontSet = d.fontSet)),
          o || e.nativeElement.setAttribute('aria-hidden', 'true');
      }
      _splitIconName(e) {
        if (!e) return ['', ''];
        let n = e.split(':');
        switch (n.length) {
          case 1:
            return ['', n[0]];
          case 2:
            return n;
          default:
            throw Error(`Invalid icon name: "${e}"`);
        }
      }
      ngOnInit() {
        this._updateFontIconClasses();
      }
      ngAfterViewChecked() {
        let e = this._elementsWithExternalReferences;
        if (e && e.size) {
          let n = this._location.getPathname();
          n !== this._previousPath &&
            ((this._previousPath = n), this._prependPathToReferences(n));
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
      _setSvgElement(e) {
        this._clearSvgElement();
        let n = this._location.getPathname();
        (this._previousPath = n),
          this._cacheChildrenWithExternalReferences(e),
          this._prependPathToReferences(n),
          this._elementRef.nativeElement.appendChild(e);
      }
      _clearSvgElement() {
        let e = this._elementRef.nativeElement,
          n = e.childNodes.length;
        for (
          this._elementsWithExternalReferences &&
          this._elementsWithExternalReferences.clear();
          n--;

        ) {
          let o = e.childNodes[n];
          (o.nodeType !== 1 || o.nodeName.toLowerCase() === 'svg') &&
            o.remove();
        }
      }
      _updateFontIconClasses() {
        if (!this._usingFontIcon()) return;
        let e = this._elementRef.nativeElement,
          n = (
            this.fontSet
              ? this._iconRegistry
                  .classNameForFontAlias(this.fontSet)
                  .split(/ +/)
              : this._iconRegistry.getDefaultFontSetClass()
          ).filter((o) => o.length > 0);
        this._previousFontSetClass.forEach((o) => e.classList.remove(o)),
          n.forEach((o) => e.classList.add(o)),
          (this._previousFontSetClass = n),
          this.fontIcon !== this._previousFontIconClass &&
            !n.includes('mat-ligature-font') &&
            (this._previousFontIconClass &&
              e.classList.remove(this._previousFontIconClass),
            this.fontIcon && e.classList.add(this.fontIcon),
            (this._previousFontIconClass = this.fontIcon));
      }
      _cleanupFontValue(e) {
        return typeof e == 'string' ? e.trim().split(' ')[0] : e;
      }
      _prependPathToReferences(e) {
        let n = this._elementsWithExternalReferences;
        n &&
          n.forEach((o, a) => {
            o.forEach((s) => {
              a.setAttribute(s.name, `url('${e}#${s.value}')`);
            });
          });
      }
      _cacheChildrenWithExternalReferences(e) {
        let n = e.querySelectorAll(Um),
          o = (this._elementsWithExternalReferences =
            this._elementsWithExternalReferences || new Map());
        for (let a = 0; a < n.length; a++)
          $a.forEach((s) => {
            let d = n[a],
              c = d.getAttribute(s),
              l = c ? c.match(jm) : null;
            if (l) {
              let u = o.get(d);
              u || ((u = []), o.set(d, u)), u.push({ name: s, value: l[1] });
            }
          });
      }
      _updateSvgIcon(e) {
        if (
          ((this._svgNamespace = null),
          (this._svgName = null),
          this._currentIconFetch.unsubscribe(),
          e)
        ) {
          let [n, o] = this._splitIconName(e);
          n && (this._svgNamespace = n),
            o && (this._svgName = o),
            (this._currentIconFetch = this._iconRegistry
              .getNamedSvgIcon(o, n)
              .pipe(Ee(1))
              .subscribe(
                (a) => this._setSvgElement(a),
                (a) => {
                  let s = `Error retrieving icon ${n}:${o}! ${a.message}`;
                  this._errorHandler.handleError(new Error(s));
                }
              ));
        }
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(
        m(A),
        m(Om),
        $t('aria-hidden'),
        m(Bm),
        m(ei),
        m(Nm, 8)
      );
    }),
      (t.ɵcmp = Q({
        type: t,
        selectors: [['mat-icon']],
        hostAttrs: ['role', 'img', 1, 'mat-icon', 'notranslate'],
        hostVars: 8,
        hostBindings: function (n, o) {
          n & 2 &&
            (U('data-mat-icon-type', o._usingFontIcon() ? 'font' : 'svg')(
              'data-mat-icon-name',
              o._svgName || o.fontIcon
            )('data-mat-icon-namespace', o._svgNamespace || o.fontSet)(
              'fontIcon',
              o._usingFontIcon() ? o.fontIcon : null
            ),
            M('mat-icon-inline', o.inline)(
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
        features: [$],
        ngContentSelectors: Dm,
        decls: 1,
        vars: 0,
        template: function (n, o) {
          n & 1 && (dt(), L(0));
        },
        styles: [
          'mat-icon,mat-icon.mat-primary,mat-icon.mat-accent,mat-icon.mat-warn{color:var(--mat-icon-color)}.mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}',
        ],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let i = t;
    return i;
  })(),
  Ja = (() => {
    let t = class t {};
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵmod = E({ type: t })),
      (t.ɵinj = C({ imports: [j, j] }));
    let i = t;
    return i;
  })();
var ts = Ut({ passive: !0 }),
  es = (() => {
    let t = class t {
      constructor(e, n) {
        (this._platform = e),
          (this._ngZone = n),
          (this._monitoredElements = new Map());
      }
      monitor(e) {
        if (!this._platform.isBrowser) return Ao;
        let n = Mt(e),
          o = this._monitoredElements.get(n);
        if (o) return o.subject;
        let a = new nt(),
          s = 'cdk-text-field-autofilled',
          d = (c) => {
            c.animationName === 'cdk-text-field-autofill-start' &&
            !n.classList.contains(s)
              ? (n.classList.add(s),
                this._ngZone.run(() =>
                  a.next({ target: c.target, isAutofilled: !0 })
                ))
              : c.animationName === 'cdk-text-field-autofill-end' &&
                n.classList.contains(s) &&
                (n.classList.remove(s),
                this._ngZone.run(() =>
                  a.next({ target: c.target, isAutofilled: !1 })
                ));
          };
        return (
          this._ngZone.runOutsideAngular(() => {
            n.addEventListener('animationstart', d, ts),
              n.classList.add('cdk-text-field-autofill-monitored');
          }),
          this._monitoredElements.set(n, {
            subject: a,
            unlisten: () => {
              n.removeEventListener('animationstart', d, ts);
            },
          }),
          a
        );
      }
      stopMonitoring(e) {
        let n = Mt(e),
          o = this._monitoredElements.get(n);
        o &&
          (o.unlisten(),
          o.subject.complete(),
          n.classList.remove('cdk-text-field-autofill-monitored'),
          n.classList.remove('cdk-text-field-autofilled'),
          this._monitoredElements.delete(n));
      }
      ngOnDestroy() {
        this._monitoredElements.forEach((e, n) => this.stopMonitoring(n));
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(I(Z), I(S));
    }),
      (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
    let i = t;
    return i;
  })();
var is = (() => {
  let t = class t {};
  (t.ɵfac = function (n) {
    return new (n || t)();
  }),
    (t.ɵmod = E({ type: t })),
    (t.ɵinj = C({}));
  let i = t;
  return i;
})();
var Gm = new y('MAT_INPUT_VALUE_ACCESSOR'),
  Qm = [
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
  Wm = 0,
  qm = ba(
    class {
      constructor(i, t, r, e) {
        (this._defaultErrorStateMatcher = i),
          (this._parentForm = t),
          (this._parentFormGroup = r),
          (this.ngControl = e),
          (this.stateChanges = new nt());
      }
    }
  ),
  ns = (() => {
    let t = class t extends qm {
      get disabled() {
        return this._disabled;
      }
      set disabled(e) {
        (this._disabled = ot(e)),
          this.focused && ((this.focused = !1), this.stateChanges.next());
      }
      get id() {
        return this._id;
      }
      set id(e) {
        this._id = e || this._uid;
      }
      get required() {
        return (
          this._required ??
          this.ngControl?.control?.hasValidator(ai.required) ??
          !1
        );
      }
      set required(e) {
        this._required = ot(e);
      }
      get type() {
        return this._type;
      }
      set type(e) {
        (this._type = e || 'text'),
          this._validateType(),
          !this._isTextarea &&
            pn().has(this._type) &&
            (this._elementRef.nativeElement.type = this._type);
      }
      get value() {
        return this._inputValueAccessor.value;
      }
      set value(e) {
        e !== this.value &&
          ((this._inputValueAccessor.value = e), this.stateChanges.next());
      }
      get readonly() {
        return this._readonly;
      }
      set readonly(e) {
        this._readonly = ot(e);
      }
      constructor(e, n, o, a, s, d, c, l, u, h) {
        super(d, a, s, o),
          (this._elementRef = e),
          (this._platform = n),
          (this._autofillMonitor = l),
          (this._formField = h),
          (this._uid = `mat-input-${Wm++}`),
          (this.focused = !1),
          (this.stateChanges = new nt()),
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
          ].filter((x) => pn().has(x))),
          (this._iOSKeyupListener = (x) => {
            let _ = x.target;
            !_.value &&
              _.selectionStart === 0 &&
              _.selectionEnd === 0 &&
              (_.setSelectionRange(1, 1), _.setSelectionRange(0, 0));
          });
        let b = this._elementRef.nativeElement,
          v = b.nodeName.toLowerCase();
        (this._inputValueAccessor = c || b),
          (this._previousNativeValue = this.value),
          (this.id = this.id),
          n.IOS &&
            u.runOutsideAngular(() => {
              e.nativeElement.addEventListener('keyup', this._iOSKeyupListener);
            }),
          (this._isServer = !this._platform.isBrowser),
          (this._isNativeSelect = v === 'select'),
          (this._isTextarea = v === 'textarea'),
          (this._isInFormField = !!h),
          this._isNativeSelect &&
            (this.controlType = b.multiple
              ? 'mat-native-select-multiple'
              : 'mat-native-select');
      }
      ngAfterViewInit() {
        this._platform.isBrowser &&
          this._autofillMonitor
            .monitor(this._elementRef.nativeElement)
            .subscribe((e) => {
              (this.autofilled = e.isAutofilled), this.stateChanges.next();
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
      focus(e) {
        this._elementRef.nativeElement.focus(e);
      }
      _focusChanged(e) {
        e !== this.focused && ((this.focused = e), this.stateChanges.next());
      }
      _onInput() {}
      _dirtyCheckNativeValue() {
        let e = this._elementRef.nativeElement.value;
        this._previousNativeValue !== e &&
          ((this._previousNativeValue = e), this.stateChanges.next());
      }
      _dirtyCheckPlaceholder() {
        let e = this._getPlaceholder();
        if (e !== this._previousPlaceholder) {
          let n = this._elementRef.nativeElement;
          (this._previousPlaceholder = e),
            e
              ? n.setAttribute('placeholder', e)
              : n.removeAttribute('placeholder');
        }
      }
      _getPlaceholder() {
        return this.placeholder || null;
      }
      _validateType() {
        Qm.indexOf(this._type) > -1;
      }
      _isNeverEmpty() {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
      }
      _isBadInput() {
        let e = this._elementRef.nativeElement.validity;
        return e && e.badInput;
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
          let e = this._elementRef.nativeElement,
            n = e.options[0];
          return (
            this.focused ||
            e.multiple ||
            !this.empty ||
            !!(e.selectedIndex > -1 && n && n.label)
          );
        } else return this.focused || !this.empty;
      }
      setDescribedByIds(e) {
        e.length
          ? this._elementRef.nativeElement.setAttribute(
              'aria-describedby',
              e.join(' ')
            )
          : this._elementRef.nativeElement.removeAttribute('aria-describedby');
      }
      onContainerClick() {
        this.focused || this.focus();
      }
      _isInlineSelect() {
        let e = this._elementRef.nativeElement;
        return this._isNativeSelect && (e.multiple || e.size > 1);
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(
        m(A),
        m(Z),
        m(Ot, 10),
        m(Re, 8),
        m(un, 8),
        m(ga),
        m(Gm, 10),
        m(es),
        m(S),
        m(On, 8)
      );
    }),
      (t.ɵdir = T({
        type: t,
        selectors: [
          ['input', 'matInput', ''],
          ['textarea', 'matInput', ''],
          ['select', 'matNativeControl', ''],
          ['input', 'matNativeControl', ''],
          ['textarea', 'matNativeControl', ''],
        ],
        hostAttrs: [1, 'mat-mdc-input-element'],
        hostVars: 18,
        hostBindings: function (n, o) {
          n & 1 &&
            H('focus', function () {
              return o._focusChanged(!0);
            })('blur', function () {
              return o._focusChanged(!1);
            })('input', function () {
              return o._onInput();
            }),
            n & 2 &&
              (Kt('id', o.id)('disabled', o.disabled)('required', o.required),
              U('name', o.name || null)(
                'readonly',
                (o.readonly && !o._isNativeSelect) || null
              )('aria-invalid', o.empty && o.required ? null : o.errorState)(
                'aria-required',
                o.required
              )('id', o.id),
              M('mat-input-server', o._isServer)(
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
        features: [tt([{ provide: Rn, useExisting: t }]), $, St],
      }));
    let i = t;
    return i;
  })(),
  os = (() => {
    let t = class t {};
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵmod = E({ type: t })),
      (t.ɵinj = C({ imports: [j, Ne, Ne, is, j] }));
    let i = t;
    return i;
  })();
var Zm = ['knob'],
  Xm = ['valueIndicatorContainer'];
function $m(i, t) {
  if (
    (i & 1 && (p(0, 'div', 4, 5)(2, 'div', 6)(3, 'span', 7), at(4), g()()()),
    i & 2)
  ) {
    let r = K();
    k(4), ii(r.valueIndicatorText);
  }
}
var Km = ['trackActive'];
function Jm(i, t) {
  if ((i & 1 && w(0, 'div'), i & 2)) {
    let r = t.$implicit,
      e = t.$index,
      n = K(3);
    It(
      r === 0
        ? 'mdc-slider__tick-mark--active'
        : 'mdc-slider__tick-mark--inactive'
    ),
      Wo('transform', n._calcTickMarkTransform(e));
  }
}
function tu(i, t) {
  if ((i & 1 && Yo(0, Jm, 1, 4, 'div', 9, qo), i & 2)) {
    let r = K(2);
    Zo(r._tickMarks);
  }
}
function eu(i, t) {
  if ((i & 1 && (p(0, 'div', 7, 8), W(2, tu, 2, 0), g()), i & 2)) {
    let r = K();
    k(2), q(2, r._cachedWidth ? 2 : -1);
  }
}
function iu(i, t) {
  if ((i & 1 && w(0, 'mat-slider-visual-thumb', 6), i & 2)) {
    let r = K();
    B('discrete', r.discrete)('thumbPosition', 1)(
      'valueIndicatorText',
      r.startValueIndicatorText
    );
  }
}
var nu = ['*'],
  Ln = new y('_MatSlider'),
  rs = new y('_MatSliderThumb'),
  ou = new y('_MatSliderRangeThumb'),
  as = new y('_MatSliderVisualThumb');
var ru = (() => {
    let t = class t {
      constructor(e, n, o, a) {
        (this._cdr = e),
          (this._ngZone = n),
          (this._slider = a),
          (this._isHovered = !1),
          (this._isActive = !1),
          (this._isValueIndicatorVisible = !1),
          (this._onPointerMove = (s) => {
            if (this._sliderInput._isFocused) return;
            let d = this._hostElement.getBoundingClientRect(),
              c = this._slider._isCursorOnSliderThumb(s, d);
            (this._isHovered = c),
              c
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
          (this._onDragStart = (s) => {
            s.button === 0 && ((this._isActive = !0), this._showActiveRipple());
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
        let e = this._sliderInputEl;
        this._ngZone.runOutsideAngular(() => {
          e.addEventListener('pointermove', this._onPointerMove),
            e.addEventListener('pointerdown', this._onDragStart),
            e.addEventListener('pointerup', this._onDragEnd),
            e.addEventListener('pointerleave', this._onMouseLeave),
            e.addEventListener('focus', this._onFocus),
            e.addEventListener('blur', this._onBlur);
        });
      }
      ngOnDestroy() {
        let e = this._sliderInputEl;
        e.removeEventListener('pointermove', this._onPointerMove),
          e.removeEventListener('pointerdown', this._onDragStart),
          e.removeEventListener('pointerup', this._onDragEnd),
          e.removeEventListener('pointerleave', this._onMouseLeave),
          e.removeEventListener('focus', this._onFocus),
          e.removeEventListener('blur', this._onBlur);
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
      _isShowingRipple(e) {
        return e?.state === 0 || e?.state === 1;
      }
      _showRipple(e, n) {
        if (
          !this._slider.disabled &&
          (this._showValueIndicator(),
          this._slider._isRange &&
            this._slider
              ._getThumb(this.thumbPosition === 1 ? 2 : 1)
              ._showValueIndicator(),
          !(this._slider._globalRippleOptions?.disabled && !n))
        )
          return this._ripple.launch({
            animation: this._slider._noopAnimations
              ? { enterDuration: 0, exitDuration: 0 }
              : e,
            centered: !0,
            persistent: !0,
          });
      }
      _hideRipple(e) {
        if ((e?.fadeOut(), this._isShowingAnyRipple())) return;
        this._slider._isRange || this._hideValueIndicator();
        let n = this._getSibling();
        n._isShowingAnyRipple() ||
          (this._hideValueIndicator(), n._hideValueIndicator());
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
    (t.ɵfac = function (n) {
      return new (n || t)(m(ht), m(S), m(A), m(Ln));
    }),
      (t.ɵcmp = Q({
        type: t,
        selectors: [['mat-slider-visual-thumb']],
        viewQuery: function (n, o) {
          if ((n & 1 && (Y(wt, 5), Y(Zm, 5), Y(Xm, 5)), n & 2)) {
            let a;
            F((a = D())) && (o._ripple = a.first),
              F((a = D())) && (o._knob = a.first),
              F((a = D())) && (o._valueIndicatorContainer = a.first);
          }
        },
        hostAttrs: [1, 'mdc-slider__thumb', 'mat-mdc-slider-visual-thumb'],
        inputs: {
          discrete: 'discrete',
          thumbPosition: 'thumbPosition',
          valueIndicatorText: 'valueIndicatorText',
        },
        features: [tt([{ provide: as, useExisting: t }])],
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
        template: function (n, o) {
          n & 1 && (W(0, $m, 5, 1, 'div', 0), w(1, 'div', 1, 2)(3, 'div', 3)),
            n & 2 &&
              (q(0, o.discrete ? 0 : -1), k(3), B('matRippleDisabled', !0));
        },
        dependencies: [wt],
        styles: [
          '.mat-mdc-slider-visual-thumb .mat-ripple{height:100%;width:100%}.mat-mdc-slider .mdc-slider__tick-marks{justify-content:start}.mat-mdc-slider .mdc-slider__tick-marks .mdc-slider__tick-mark--active,.mat-mdc-slider .mdc-slider__tick-marks .mdc-slider__tick-mark--inactive{position:absolute;left:2px}',
        ],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let i = t;
    return i;
  })(),
  au = wi(
    pa(
      class {
        constructor(i) {
          this._elementRef = i;
        }
      }
    ),
    'primary'
  ),
  ss = (() => {
    let t = class t extends au {
      get disabled() {
        return this._disabled;
      }
      set disabled(e) {
        this._disabled = ot(e);
        let n = this._getInput(2),
          o = this._getInput(1);
        n && (n.disabled = this._disabled), o && (o.disabled = this._disabled);
      }
      get discrete() {
        return this._discrete;
      }
      set discrete(e) {
        (this._discrete = ot(e)), this._updateValueIndicatorUIs();
      }
      get showTickMarks() {
        return this._showTickMarks;
      }
      set showTickMarks(e) {
        this._showTickMarks = ot(e);
      }
      get min() {
        return this._min;
      }
      set min(e) {
        let n = bt(e, this._min);
        this._min !== n && this._updateMin(n);
      }
      _updateMin(e) {
        let n = this._min;
        (this._min = e),
          this._isRange
            ? this._updateMinRange({ old: n, new: e })
            : this._updateMinNonRange(e),
          this._onMinMaxOrStepChange();
      }
      _updateMinRange(e) {
        let n = this._getInput(2),
          o = this._getInput(1),
          a = n.value,
          s = o.value;
        (o.min = e.new),
          (n.min = Math.max(e.new, o.value)),
          (o.max = Math.min(n.max, n.value)),
          o._updateWidthInactive(),
          n._updateWidthInactive(),
          e.new < e.old
            ? this._onTranslateXChangeBySideEffect(n, o)
            : this._onTranslateXChangeBySideEffect(o, n),
          a !== n.value && this._onValueChange(n),
          s !== o.value && this._onValueChange(o);
      }
      _updateMinNonRange(e) {
        let n = this._getInput(2);
        if (n) {
          let o = n.value;
          (n.min = e),
            n._updateThumbUIByValue(),
            this._updateTrackUI(n),
            o !== n.value && this._onValueChange(n);
        }
      }
      get max() {
        return this._max;
      }
      set max(e) {
        let n = bt(e, this._max);
        this._max !== n && this._updateMax(n);
      }
      _updateMax(e) {
        let n = this._max;
        (this._max = e),
          this._isRange
            ? this._updateMaxRange({ old: n, new: e })
            : this._updateMaxNonRange(e),
          this._onMinMaxOrStepChange();
      }
      _updateMaxRange(e) {
        let n = this._getInput(2),
          o = this._getInput(1),
          a = n.value,
          s = o.value;
        (n.max = e.new),
          (o.max = Math.min(e.new, n.value)),
          (n.min = o.value),
          n._updateWidthInactive(),
          o._updateWidthInactive(),
          e.new > e.old
            ? this._onTranslateXChangeBySideEffect(o, n)
            : this._onTranslateXChangeBySideEffect(n, o),
          a !== n.value && this._onValueChange(n),
          s !== o.value && this._onValueChange(o);
      }
      _updateMaxNonRange(e) {
        let n = this._getInput(2);
        if (n) {
          let o = n.value;
          (n.max = e),
            n._updateThumbUIByValue(),
            this._updateTrackUI(n),
            o !== n.value && this._onValueChange(n);
        }
      }
      get step() {
        return this._step;
      }
      set step(e) {
        let n = bt(e, this._step);
        this._step !== n && this._updateStep(n);
      }
      _updateStep(e) {
        (this._step = e),
          this._isRange ? this._updateStepRange() : this._updateStepNonRange(),
          this._onMinMaxOrStepChange();
      }
      _updateStepRange() {
        let e = this._getInput(2),
          n = this._getInput(1),
          o = e.value,
          a = n.value,
          s = n.value;
        (e.min = this._min),
          (n.max = this._max),
          (e.step = this._step),
          (n.step = this._step),
          this._platform.SAFARI && ((e.value = e.value), (n.value = n.value)),
          (e.min = Math.max(this._min, n.value)),
          (n.max = Math.min(this._max, e.value)),
          n._updateWidthInactive(),
          e._updateWidthInactive(),
          e.value < s
            ? this._onTranslateXChangeBySideEffect(n, e)
            : this._onTranslateXChangeBySideEffect(e, n),
          o !== e.value && this._onValueChange(e),
          a !== n.value && this._onValueChange(n);
      }
      _updateStepNonRange() {
        let e = this._getInput(2);
        if (e) {
          let n = e.value;
          (e.step = this._step),
            this._platform.SAFARI && (e.value = e.value),
            e._updateThumbUIByValue(),
            n !== e.value && this._onValueChange(e);
        }
      }
      constructor(e, n, o, a, s, d) {
        super(o),
          (this._ngZone = e),
          (this._cdr = n),
          (this._dir = a),
          (this._globalRippleOptions = s),
          (this._disabled = !1),
          (this._discrete = !1),
          (this._showTickMarks = !1),
          (this._min = 0),
          (this._max = 100),
          (this._step = 1),
          (this.displayWith = (c) => `${c}`),
          (this._rippleRadius = 24),
          (this.startValueIndicatorText = ''),
          (this.endValueIndicatorText = ''),
          (this._isRange = !1),
          (this._isRtl = !1),
          (this._hasViewInitialized = !1),
          (this._tickMarkTrackWidth = 0),
          (this._hasAnimation = !1),
          (this._resizeTimer = null),
          (this._platform = O(Z)),
          (this._knobRadius = 8),
          (this._thumbsOverlap = !1),
          (this._noopAnimations = d === 'NoopAnimations'),
          (this._dirChangeSubscription = this._dir.change.subscribe(() =>
            this._onDirChange()
          )),
          (this._isRtl = this._dir.value === 'rtl');
      }
      ngAfterViewInit() {
        this._platform.isBrowser && this._updateDimensions();
        let e = this._getInput(2),
          n = this._getInput(1);
        (this._isRange = !!e && !!n), this._cdr.detectChanges();
        let o = this._getThumb(2);
        (this._rippleRadius = o._ripple.radius),
          (this._inputPadding = this._rippleRadius - this._knobRadius),
          (this._inputOffset = this._knobRadius),
          this._isRange ? this._initUIRange(e, n) : this._initUINonRange(e),
          this._updateTrackUI(e),
          this._updateTickMarkUI(),
          this._updateTickMarkTrackUI(),
          this._observeHostResize(),
          this._cdr.detectChanges();
      }
      _initUINonRange(e) {
        e.initProps(),
          e.initUI(),
          this._updateValueIndicatorUI(e),
          (this._hasViewInitialized = !0),
          e._updateThumbUIByValue();
      }
      _initUIRange(e, n) {
        e.initProps(),
          e.initUI(),
          n.initProps(),
          n.initUI(),
          e._updateMinMax(),
          n._updateMinMax(),
          e._updateStaticStyles(),
          n._updateStaticStyles(),
          this._updateValueIndicatorUIs(),
          (this._hasViewInitialized = !0),
          e._updateThumbUIByValue(),
          n._updateThumbUIByValue();
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
        let e = this._getInput(2),
          n = this._getInput(1);
        e._setIsLeftThumb(),
          n._setIsLeftThumb(),
          (e.translateX = e._calcTranslateXByValue()),
          (n.translateX = n._calcTranslateXByValue()),
          e._updateStaticStyles(),
          n._updateStaticStyles(),
          e._updateWidthInactive(),
          n._updateWidthInactive(),
          e._updateThumbUIByValue(),
          n._updateThumbUIByValue();
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
      _getValue(e = 2) {
        let n = this._getInput(e);
        return n ? n.value : this.min;
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
      _setTrackActiveStyles(e) {
        let n = this._trackActive.nativeElement.style;
        (n.left = e.left),
          (n.right = e.right),
          (n.transformOrigin = e.transformOrigin),
          (n.transform = e.transform);
      }
      _calcTickMarkTransform(e) {
        return `translateX(${
          e * (this._tickMarkTrackWidth / (this._tickMarks.length - 1))
        }px`;
      }
      _onTranslateXChange(e) {
        this._hasViewInitialized &&
          (this._updateThumbUI(e),
          this._updateTrackUI(e),
          this._updateOverlappingThumbUI(e));
      }
      _onTranslateXChangeBySideEffect(e, n) {
        this._hasViewInitialized &&
          (e._updateThumbUIByValue(), n._updateThumbUIByValue());
      }
      _onValueChange(e) {
        this._hasViewInitialized &&
          (this._updateValueIndicatorUI(e),
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
            let e = this._getInput(2),
              n = this._getInput(1);
            e._updateThumbUIByValue(),
              n._updateThumbUIByValue(),
              e._updateStaticStyles(),
              n._updateStaticStyles(),
              e._updateMinMax(),
              n._updateMinMax(),
              e._updateWidthInactive(),
              n._updateWidthInactive();
          } else {
            let e = this._getInput(2);
            e && e._updateThumbUIByValue();
          }
          this._updateTickMarkUI(),
            this._updateTickMarkTrackUI(),
            this._cdr.detectChanges();
        }
      }
      _areThumbsOverlapping() {
        let e = this._getInput(1),
          n = this._getInput(2);
        return !e || !n ? !1 : n.translateX - e.translateX < 20;
      }
      _updateOverlappingThumbClassNames(e) {
        let n = e.getSibling(),
          o = this._getThumb(e.thumbPosition);
        this._getThumb(n.thumbPosition)._hostElement.classList.remove(
          'mdc-slider__thumb--top'
        ),
          o._hostElement.classList.toggle(
            'mdc-slider__thumb--top',
            this._thumbsOverlap
          );
      }
      _updateOverlappingThumbUI(e) {
        !this._isRange ||
          this._skipUpdate() ||
          (this._thumbsOverlap !== this._areThumbsOverlapping() &&
            ((this._thumbsOverlap = !this._thumbsOverlap),
            this._updateOverlappingThumbClassNames(e)));
      }
      _updateThumbUI(e) {
        if (this._skipUpdate()) return;
        let n = this._getThumb(e.thumbPosition === 2 ? 2 : 1);
        n._hostElement.style.transform = `translateX(${e.translateX}px)`;
      }
      _updateValueIndicatorUI(e) {
        if (this._skipUpdate()) return;
        let n = this.displayWith(e.value);
        if (
          (this._hasViewInitialized
            ? (e._valuetext = n)
            : e._hostElement.setAttribute('aria-valuetext', n),
          this.discrete)
        ) {
          e.thumbPosition === 1
            ? (this.startValueIndicatorText = n)
            : (this.endValueIndicatorText = n);
          let o = this._getThumb(e.thumbPosition);
          n.length < 3
            ? o._hostElement.classList.add('mdc-slider__thumb--short-value')
            : o._hostElement.classList.remove('mdc-slider__thumb--short-value');
        }
      }
      _updateValueIndicatorUIs() {
        let e = this._getInput(2),
          n = this._getInput(1);
        e && this._updateValueIndicatorUI(e),
          n && this._updateValueIndicatorUI(n);
      }
      _updateTickMarkTrackUI() {
        if (!this.showTickMarks || this._skipUpdate()) return;
        let e = this._step && this._step > 0 ? this._step : 1,
          o = (Math.floor(this.max / e) * e - this.min) / (this.max - this.min);
        this._tickMarkTrackWidth = this._cachedWidth * o - 6;
      }
      _updateTrackUI(e) {
        this._skipUpdate() ||
          (this._isRange
            ? this._updateTrackUIRange(e)
            : this._updateTrackUINonRange(e));
      }
      _updateTrackUIRange(e) {
        let n = e.getSibling();
        if (!n || !this._cachedWidth) return;
        let o = Math.abs(n.translateX - e.translateX) / this._cachedWidth;
        e._isLeftThumb && this._cachedWidth
          ? this._setTrackActiveStyles({
              left: 'auto',
              right: `${this._cachedWidth - n.translateX}px`,
              transformOrigin: 'right',
              transform: `scaleX(${o})`,
            })
          : this._setTrackActiveStyles({
              left: `${n.translateX}px`,
              right: 'auto',
              transformOrigin: 'left',
              transform: `scaleX(${o})`,
            });
      }
      _updateTrackUINonRange(e) {
        this._isRtl
          ? this._setTrackActiveStyles({
              left: 'auto',
              right: '0px',
              transformOrigin: 'right',
              transform: `scaleX(${1 - e.fillPercentage})`,
            })
          : this._setTrackActiveStyles({
              left: '0px',
              right: 'auto',
              transformOrigin: 'left',
              transform: `scaleX(${e.fillPercentage})`,
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
        let e = this.step > 0 ? this.step : 1;
        this._isRange
          ? this._updateTickMarkUIRange(e)
          : this._updateTickMarkUINonRange(e),
          this._isRtl && this._tickMarks.reverse();
      }
      _updateTickMarkUINonRange(e) {
        let n = this._getValue(),
          o = Math.max(Math.floor((n - this.min) / e), 0),
          a = Math.max(Math.floor((this.max - n) / e), 0);
        this._isRtl ? o++ : a++,
          (this._tickMarks = Array(o).fill(0).concat(Array(a).fill(1)));
      }
      _updateTickMarkUIRange(e) {
        let n = this._getValue(),
          o = this._getValue(1),
          a = Math.max(Math.floor((o - this.min) / e), 0),
          s = Math.max(Math.floor((n - o) / e) + 1, 0),
          d = Math.max(Math.floor((this.max - n) / e), 0);
        this._tickMarks = Array(a)
          .fill(1)
          .concat(Array(s).fill(0), Array(d).fill(1));
      }
      _getInput(e) {
        if (e === 2 && this._input) return this._input;
        if (this._inputs?.length)
          return e === 1 ? this._inputs.first : this._inputs.last;
      }
      _getThumb(e) {
        return e === 2 ? this._thumbs?.last : this._thumbs?.first;
      }
      _setTransition(e) {
        (this._hasAnimation =
          !this._platform.IOS && e && !this._noopAnimations),
          this._elementRef.nativeElement.classList.toggle(
            'mat-mdc-slider-with-animation',
            this._hasAnimation
          );
      }
      _isCursorOnSliderThumb(e, n) {
        let o = n.width / 2,
          a = n.x + o,
          s = n.y + o,
          d = e.clientX - a,
          c = e.clientY - s;
        return Math.pow(d, 2) + Math.pow(c, 2) < Math.pow(o, 2);
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(m(S), m(ht), m(A), m(yi, 8), m(Ci, 8), m(ut, 8));
    }),
      (t.ɵcmp = Q({
        type: t,
        selectors: [['mat-slider']],
        contentQueries: function (n, o, a) {
          if ((n & 1 && (gt(a, rs, 5), gt(a, ou, 4)), n & 2)) {
            let s;
            F((s = D())) && (o._input = s.first),
              F((s = D())) && (o._inputs = s);
          }
        },
        viewQuery: function (n, o) {
          if ((n & 1 && (Y(Km, 5), Y(as, 5)), n & 2)) {
            let a;
            F((a = D())) && (o._trackActive = a.first),
              F((a = D())) && (o._thumbs = a);
          }
        },
        hostAttrs: [1, 'mat-mdc-slider', 'mdc-slider'],
        hostVars: 10,
        hostBindings: function (n, o) {
          n & 2 &&
            M('mdc-slider--range', o._isRange)(
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
        features: [tt([{ provide: Ln, useExisting: t }]), $],
        ngContentSelectors: nu,
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
        template: function (n, o) {
          n & 1 &&
            (dt(),
            L(0),
            p(1, 'div', 0),
            w(2, 'div', 1),
            p(3, 'div', 2),
            w(4, 'div', 3, 4),
            g(),
            W(6, eu, 3, 1, 'div', 5),
            g(),
            W(7, iu, 1, 3, 'mat-slider-visual-thumb', 6),
            w(8, 'mat-slider-visual-thumb', 6)),
            n & 2 &&
              (k(6),
              q(6, o.showTickMarks ? 6 : -1),
              k(1),
              q(7, o._isRange ? 7 : -1),
              k(1),
              B('discrete', o.discrete)('thumbPosition', 2)(
                'valueIndicatorText',
                o.endValueIndicatorText
              ));
        },
        dependencies: [ru],
        styles: [
          '.mdc-slider{cursor:pointer;height:48px;margin:0 24px;position:relative;touch-action:pan-y}.mdc-slider .mdc-slider__track{position:absolute;top:50%;transform:translateY(-50%);width:100%}.mdc-slider .mdc-slider__track--active,.mdc-slider .mdc-slider__track--inactive{display:flex;height:100%;position:absolute;width:100%}.mdc-slider .mdc-slider__track--active{overflow:hidden}.mdc-slider .mdc-slider__track--active_fill{border-top-style:solid;box-sizing:border-box;height:100%;width:100%;position:relative;-webkit-transform-origin:left;transform-origin:left}[dir=rtl] .mdc-slider .mdc-slider__track--active_fill,.mdc-slider .mdc-slider__track--active_fill[dir=rtl]{-webkit-transform-origin:right;transform-origin:right}.mdc-slider .mdc-slider__track--inactive{left:0;top:0}.mdc-slider .mdc-slider__track--inactive::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-slider .mdc-slider__track--inactive::before{border-color:CanvasText}}.mdc-slider .mdc-slider__value-indicator-container{bottom:44px;left:50%;left:var(--slider-value-indicator-container-left, 50%);pointer-events:none;position:absolute;right:var(--slider-value-indicator-container-right);transform:translateX(-50%);transform:var(--slider-value-indicator-container-transform, translateX(-50%))}.mdc-slider .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0.4, 0, 1, 1);align-items:center;border-radius:4px;display:flex;height:32px;padding:0 12px;transform:scale(0);transform-origin:bottom}.mdc-slider .mdc-slider__value-indicator::before{border-left:6px solid rgba(0,0,0,0);border-right:6px solid rgba(0,0,0,0);border-top:6px solid;bottom:-5px;content:"";height:0;left:50%;left:var(--slider-value-indicator-caret-left, 50%);position:absolute;right:var(--slider-value-indicator-caret-right);transform:translateX(-50%);transform:var(--slider-value-indicator-caret-transform, translateX(-50%));width:0}.mdc-slider .mdc-slider__value-indicator::after{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}@media screen and (forced-colors: active){.mdc-slider .mdc-slider__value-indicator::after{border-color:CanvasText}}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator-container{pointer-events:auto}.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:transform 100ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:scale(1)}@media(prefers-reduced-motion){.mdc-slider .mdc-slider__value-indicator,.mdc-slider .mdc-slider__thumb--with-indicator .mdc-slider__value-indicator{transition:none}}.mdc-slider .mdc-slider__thumb{display:flex;left:-24px;outline:none;position:absolute;user-select:none;height:48px;width:48px}.mdc-slider .mdc-slider__thumb--top{z-index:1}.mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-style:solid;border-width:1px;box-sizing:content-box}.mdc-slider .mdc-slider__thumb-knob{box-sizing:border-box;left:50%;position:absolute;top:50%;transform:translate(-50%, -50%)}.mdc-slider .mdc-slider__tick-marks{align-items:center;box-sizing:border-box;display:flex;height:100%;justify-content:space-between;padding:0 1px;position:absolute;width:100%}.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:transform 80ms ease}@media(prefers-reduced-motion){.mdc-slider--discrete .mdc-slider__thumb,.mdc-slider--discrete .mdc-slider__track--active_fill{transition:none}}.mdc-slider--disabled{cursor:auto}.mdc-slider--disabled .mdc-slider__thumb{pointer-events:none}.mdc-slider__input{cursor:pointer;left:2px;margin:0;height:44px;opacity:0;pointer-events:none;position:absolute;top:2px;width:44px}.mat-mdc-slider{display:inline-block;box-sizing:border-box;outline:none;vertical-align:middle;margin-left:8px;margin-right:8px;width:auto;min-width:112px;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-slider .mdc-slider__thumb-knob{background-color:var(--mdc-slider-handle-color);border-color:var(--mdc-slider-handle-color)}.mat-mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:#fff}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__thumb-knob{background-color:var(--mdc-slider-disabled-handle-color);border-color:var(--mdc-slider-disabled-handle-color)}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider.mdc-slider--disabled .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider.mdc-slider--disabled .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:#fff}.mat-mdc-slider .mdc-slider__thumb::before,.mat-mdc-slider .mdc-slider__thumb::after{background-color:var(--mdc-slider-handle-color)}.mat-mdc-slider .mdc-slider__thumb:hover::before,.mat-mdc-slider .mdc-slider__thumb.mdc-ripple-surface--hover::before{opacity:var(--mdc-ripple-hover-opacity)}.mat-mdc-slider .mdc-slider__thumb.mdc-ripple-upgraded--background-focused::before,.mat-mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:var(--mdc-ripple-focus-opacity)}.mat-mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mat-mdc-slider .mdc-slider__thumb:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:var(--mdc-ripple-press-opacity)}.mat-mdc-slider .mdc-slider__thumb.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity)}.mat-mdc-slider .mdc-slider__track--active_fill{border-color:var(--mdc-slider-active-track-color)}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__track--active_fill{border-color:var(--mdc-slider-disabled-active-track-color)}.mat-mdc-slider .mdc-slider__track--inactive{background-color:var(--mdc-slider-inactive-track-color);opacity:.24}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__track--inactive{background-color:var(--mdc-slider-disabled-inactive-track-color);opacity:.24}.mat-mdc-slider .mdc-slider__tick-mark--active{background-color:var(--mdc-slider-with-tick-marks-active-container-color);opacity:var(--mdc-slider-with-tick-marks-active-container-opacity)}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__tick-mark--active{background-color:var(--mdc-slider-with-tick-marks-active-container-color);opacity:var(--mdc-slider-with-tick-marks-active-container-opacity)}.mat-mdc-slider .mdc-slider__tick-mark--inactive{background-color:var(--mdc-slider-with-tick-marks-inactive-container-color);opacity:var(--mdc-slider-with-tick-marks-inactive-container-opacity)}.mat-mdc-slider.mdc-slider--disabled .mdc-slider__tick-mark--inactive{background-color:var(--mdc-slider-with-tick-marks-disabled-container-color);opacity:var(--mdc-slider-with-tick-marks-inactive-container-opacity)}.mat-mdc-slider .mdc-slider__value-indicator{background-color:var(--mdc-slider-label-container-color);opacity:1}.mat-mdc-slider .mdc-slider__value-indicator::before{border-top-color:var(--mdc-slider-label-container-color)}.mat-mdc-slider .mdc-slider__value-indicator{color:var(--mdc-slider-label-label-text-color)}.mat-mdc-slider .mdc-slider__track{height:var(--mdc-slider-inactive-track-height)}.mat-mdc-slider .mdc-slider__track--active{height:var(--mdc-slider-active-track-height);top:calc((var(--mdc-slider-inactive-track-height) - var(--mdc-slider-active-track-height)) / 2)}.mat-mdc-slider .mdc-slider__track--active_fill{border-top-width:var(--mdc-slider-active-track-height)}.mat-mdc-slider .mdc-slider__track--inactive{height:var(--mdc-slider-inactive-track-height)}.mat-mdc-slider .mdc-slider__tick-mark--active,.mat-mdc-slider .mdc-slider__tick-mark--inactive{height:var(--mdc-slider-with-tick-marks-container-size);width:var(--mdc-slider-with-tick-marks-container-size)}.mat-mdc-slider.mdc-slider--disabled{opacity:0.38}.mat-mdc-slider .mdc-slider__value-indicator-text{letter-spacing:var(--mdc-slider-label-label-text-tracking);font-size:var(--mdc-slider-label-label-text-size);font-family:var(--mdc-slider-label-label-text-font);font-weight:var(--mdc-slider-label-label-text-weight);line-height:var(--mdc-slider-label-label-text-line-height)}.mat-mdc-slider .mdc-slider__track--active{border-radius:var(--mdc-slider-active-track-shape)}.mat-mdc-slider .mdc-slider__track--inactive{border-radius:var(--mdc-slider-inactive-track-shape)}.mat-mdc-slider .mdc-slider__thumb-knob{border-radius:var(--mdc-slider-handle-shape);width:var(--mdc-slider-handle-width);height:var(--mdc-slider-handle-height);border-style:solid;border-width:calc(var(--mdc-slider-handle-height) / 2) calc(var(--mdc-slider-handle-width) / 2)}.mat-mdc-slider .mdc-slider__tick-mark--active,.mat-mdc-slider .mdc-slider__tick-mark--inactive{border-radius:var(--mdc-slider-with-tick-marks-container-shape)}.mat-mdc-slider .mdc-slider__thumb:hover .mdc-slider__thumb-knob{background-color:var(--mdc-slider-hover-handle-color);border-color:var(--mdc-slider-hover-handle-color)}.mat-mdc-slider .mdc-slider__thumb:hover .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb:hover .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb:hover .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:#fff}.mat-mdc-slider .mdc-slider__thumb--focused .mdc-slider__thumb-knob{background-color:var(--mdc-slider-focus-handle-color);border-color:var(--mdc-slider-focus-handle-color)}.mat-mdc-slider .mdc-slider__thumb--focused .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--focused .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--focused .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:#fff}.mat-mdc-slider .mdc-slider__thumb:not(:disabled):active .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb:not(:disabled):active .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb:not(:disabled):active .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:#fff}.mat-mdc-slider .mdc-slider__thumb--top .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb:hover .mdc-slider__thumb-knob,.mat-mdc-slider .mdc-slider__thumb--top.mdc-slider__thumb--focused .mdc-slider__thumb-knob{border-color:var(--mdc-slider-with-overlap-handle-outline-color);border-width:var(--mdc-slider-with-overlap-handle-outline-width)}.mat-mdc-slider .mdc-slider__thumb-knob{box-shadow:var(--mdc-slider-handle-elevation)}.mat-mdc-slider .mdc-slider__input{box-sizing:content-box;pointer-events:auto}.mat-mdc-slider .mdc-slider__input.mat-mdc-slider-input-no-pointer-events{pointer-events:none}.mat-mdc-slider .mdc-slider__input.mat-slider__right-input{left:auto;right:0}.mat-mdc-slider .mdc-slider__thumb,.mat-mdc-slider .mdc-slider__track--active_fill{transition-duration:0ms}.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__thumb,.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__track--active_fill{transition-duration:80ms}.mat-mdc-slider.mdc-slider--discrete .mdc-slider__thumb,.mat-mdc-slider.mdc-slider--discrete .mdc-slider__track--active_fill{transition-duration:0ms}.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__thumb,.mat-mdc-slider.mat-mdc-slider-with-animation .mdc-slider__track--active_fill{transition-duration:80ms}.mat-mdc-slider .mdc-slider__track,.mat-mdc-slider .mdc-slider__thumb{pointer-events:none}.mat-mdc-slider .mdc-slider__value-indicator{opacity:var(--mat-slider-value-indicator-opacity)}.mat-mdc-slider .mat-ripple .mat-ripple-element{background-color:var(--mat-mdc-slider-ripple-color, transparent)}.mat-mdc-slider .mat-ripple .mat-mdc-slider-hover-ripple{background-color:var(--mat-mdc-slider-hover-ripple-color, transparent)}.mat-mdc-slider .mat-ripple .mat-mdc-slider-focus-ripple,.mat-mdc-slider .mat-ripple .mat-mdc-slider-active-ripple{background-color:var(--mat-mdc-slider-focus-ripple-color, transparent)}.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__thumb,.mat-mdc-slider._mat-animation-noopable.mdc-slider--discrete .mdc-slider__track--active_fill,.mat-mdc-slider._mat-animation-noopable .mdc-slider__value-indicator{transition:none}.mat-mdc-slider .mat-mdc-focus-indicator::before{border-radius:50%}.mat-mdc-slider .mdc-slider__value-indicator{word-break:normal}.mdc-slider__thumb--focused .mat-mdc-focus-indicator::before{content:""}',
        ],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let i = t;
    return i;
  })();
var su = { provide: Lt, useExisting: xt(() => Vn), multi: !0 };
var Vn = (() => {
  let t = class t {
    get value() {
      return bt(this._hostElement.value);
    }
    set value(e) {
      let n = bt(e).toString();
      if (!this._hasSetInitialValue) {
        this._initialValue = n;
        return;
      }
      this._isActive ||
        ((this._hostElement.value = n),
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
    set translateX(e) {
      this._translateX = e;
    }
    get min() {
      return bt(this._hostElement.min);
    }
    set min(e) {
      (this._hostElement.min = bt(e).toString()), this._cdr.detectChanges();
    }
    get max() {
      return bt(this._hostElement.max);
    }
    set max(e) {
      (this._hostElement.max = bt(e).toString()), this._cdr.detectChanges();
    }
    get step() {
      return bt(this._hostElement.step);
    }
    set step(e) {
      (this._hostElement.step = bt(e).toString()), this._cdr.detectChanges();
    }
    get disabled() {
      return ot(this._hostElement.disabled);
    }
    set disabled(e) {
      (this._hostElement.disabled = ot(e)),
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
    _setIsFocused(e) {
      this._isFocused = e;
    }
    constructor(e, n, o, a) {
      (this._ngZone = e),
        (this._elementRef = n),
        (this._cdr = o),
        (this._slider = a),
        (this.valueChange = new z()),
        (this.dragStart = new z()),
        (this.dragEnd = new z()),
        (this.thumbPosition = 2),
        (this._knobRadius = 8),
        (this._isActive = !1),
        (this._isFocused = !1),
        (this._hasSetInitialValue = !1),
        (this._destroyed = new nt()),
        (this._skipUIUpdate = !1),
        (this._onTouchedFn = () => {}),
        (this._isControlInitialized = !1),
        (this._platform = O(Z)),
        (this._hostElement = n.nativeElement),
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
    _onPointerDown(e) {
      if (!(this.disabled || e.button !== 0)) {
        if (this._platform.IOS) {
          let n = this._slider._isCursorOnSliderThumb(
            e,
            this._slider
              ._getThumb(this.thumbPosition)
              ._hostElement.getBoundingClientRect()
          );
          (this._isActive = n),
            this._updateWidthActive(),
            this._slider._updateDimensions();
          return;
        }
        (this._isActive = !0),
          this._setIsFocused(!0),
          this._updateWidthActive(),
          this._slider._updateDimensions(),
          this._slider.step ||
            this._updateThumbUIByPointerEvent(e, { withAnimation: !0 }),
          this.disabled ||
            (this._handleValueCorrection(e),
            this.dragStart.emit({
              source: this,
              parent: this._slider,
              value: this.value,
            }));
      }
    }
    _handleValueCorrection(e) {
      (this._skipUIUpdate = !0),
        setTimeout(() => {
          (this._skipUIUpdate = !1), this._fixValue(e);
        }, 0);
    }
    _fixValue(e) {
      let n = e.clientX - this._slider._cachedLeft,
        o = this._slider._cachedWidth,
        a = this._slider.step === 0 ? 1 : this._slider.step,
        s = Math.floor((this._slider.max - this._slider.min) / a),
        d = this._slider._isRtl ? 1 - n / o : n / o,
        l =
          (Math.round(d * s) / s) * (this._slider.max - this._slider.min) +
          this._slider.min,
        u = Math.round(l / a) * a,
        h = this.value;
      if (u === h) {
        this._slider._onValueChange(this),
          this._slider.step > 0
            ? this._updateThumbUIByValue()
            : this._updateThumbUIByPointerEvent(e, {
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
          : this._updateThumbUIByPointerEvent(e, {
              withAnimation: this._slider._hasAnimation,
            });
    }
    _onPointerMove(e) {
      !this._slider.step &&
        this._isActive &&
        this._updateThumbUIByPointerEvent(e);
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
    _clamp(e) {
      return Math.max(Math.min(e, this._slider._cachedWidth), 0);
    }
    _calcTranslateXByValue() {
      if (this._slider._isRtl)
        return (1 - this.percentage) * this._slider._cachedWidth;
      let e = 3;
      return this.percentage * (this._slider._cachedWidth - e * 2) + e;
    }
    _calcTranslateXByPointerEvent(e) {
      return e.clientX - this._slider._cachedLeft;
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
    _updateThumbUIByValue(e) {
      (this.translateX = this._clamp(this._calcTranslateXByValue())),
        this._updateThumbUI(e);
    }
    _updateThumbUIByPointerEvent(e, n) {
      (this.translateX = this._clamp(this._calcTranslateXByPointerEvent(e))),
        this._updateThumbUI(n);
    }
    _updateThumbUI(e) {
      this._slider._setTransition(!!e?.withAnimation),
        this._slider._onTranslateXChange(this);
    }
    writeValue(e) {
      (this._isControlInitialized || e !== null) && (this.value = e);
    }
    registerOnChange(e) {
      (this._onChangeFn = e), (this._isControlInitialized = !0);
    }
    registerOnTouched(e) {
      this._onTouchedFn = e;
    }
    setDisabledState(e) {
      this.disabled = e;
    }
    focus() {
      this._hostElement.focus();
    }
    blur() {
      this._hostElement.blur();
    }
  };
  (t.ɵfac = function (n) {
    return new (n || t)(m(S), m(A), m(ht), m(Ln));
  }),
    (t.ɵdir = T({
      type: t,
      selectors: [['input', 'matSliderThumb', '']],
      hostAttrs: ['type', 'range', 1, 'mdc-slider__input'],
      hostVars: 1,
      hostBindings: function (n, o) {
        n & 1 &&
          H('change', function () {
            return o._onChange();
          })('input', function () {
            return o._onInput();
          })('blur', function () {
            return o._onBlur();
          })('focus', function () {
            return o._onFocus();
          }),
          n & 2 && U('aria-valuetext', o._valuetext);
      },
      inputs: { value: 'value' },
      outputs: {
        valueChange: 'valueChange',
        dragStart: 'dragStart',
        dragEnd: 'dragEnd',
      },
      exportAs: ['matSliderThumb'],
      features: [tt([su, { provide: rs, useExisting: t }])],
    }));
  let i = t;
  return i;
})();
var ds = (() => {
  let t = class t {};
  (t.ɵfac = function (n) {
    return new (n || t)();
  }),
    (t.ɵmod = E({ type: t })),
    (t.ɵinj = C({ imports: [j, zt] }));
  let i = t;
  return i;
})();
var ke = Ac(vc(), 1);
var If = ['qrcElement'],
  xc = (() => {
    let t = class t {
      constructor(e, n) {
        (this.renderer = e),
          (this.sanitizer = n),
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
          (this.qrCodeURL = new z()),
          (this.context = null);
      }
      ngOnChanges() {
        return Yi(this, null, function* () {
          yield this.createQRCode();
        });
      }
      isValidQrCodeText(e) {
        return this.allowEmptyString === !1
          ? !(typeof e > 'u' || e === '' || e === 'null' || e === null)
          : !(typeof e > 'u');
      }
      toDataURL(e) {
        return new Promise((n, o) => {
          (0, ke.toDataURL)(this.qrdata, e, (a, s) => {
            a ? o(a) : n(s);
          });
        });
      }
      toCanvas(e, n) {
        return new Promise((o, a) => {
          (0, ke.toCanvas)(e, this.qrdata, n, (s) => {
            s ? a(s) : o('success');
          });
        });
      }
      toSVG(e) {
        return new Promise((n, o) => {
          (0, ke.toString)(this.qrdata, e, (a, s) => {
            a ? o(a) : n(s);
          });
        });
      }
      renderElement(e) {
        for (let n of this.qrcElement.nativeElement.childNodes)
          this.renderer.removeChild(this.qrcElement.nativeElement, n);
        this.renderer.appendChild(this.qrcElement.nativeElement, e);
      }
      createQRCode() {
        return Yi(this, null, function* () {
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
            let e = {
                color: { dark: this.colorDark, light: this.colorLight },
                errorCorrectionLevel: this.errorCorrectionLevel,
                margin: this.margin,
                scale: this.scale,
                version: this.version,
                width: this.width,
              },
              n = this.imageSrc,
              o = this.imageHeight || 40,
              a = this.imageWidth || 40;
            switch (this.elementType) {
              case 'canvas': {
                let s = this.renderer.createElement('canvas');
                (this.context = s.getContext('2d')),
                  this.toCanvas(s, e)
                    .then(() => {
                      if (
                        (this.ariaLabel &&
                          this.renderer.setAttribute(
                            s,
                            'aria-label',
                            `${this.ariaLabel}`
                          ),
                        this.title &&
                          this.renderer.setAttribute(
                            s,
                            'title',
                            `${this.title}`
                          ),
                        n && this.context)
                      ) {
                        (this.centerImage = new Image(a, o)),
                          n !== this.centerImage.src &&
                            (this.centerImage.src = n),
                          o !== this.centerImage.height &&
                            (this.centerImage.height = o),
                          a !== this.centerImage.width &&
                            (this.centerImage.width = a);
                        let d = this.centerImage;
                        d &&
                          (d.onload = () => {
                            this.context?.drawImage(
                              d,
                              s.width / 2 - a / 2,
                              s.height / 2 - o / 2,
                              a,
                              o
                            );
                          });
                      }
                      this.renderElement(s), this.emitQRCodeURL(s);
                    })
                    .catch((d) => {
                      console.error('[angularx-qrcode] canvas error:', d);
                    });
                break;
              }
              case 'svg': {
                let s = this.renderer.createElement('div');
                this.toSVG(e)
                  .then((d) => {
                    this.renderer.setProperty(s, 'innerHTML', d);
                    let c = s.firstChild;
                    this.renderer.setAttribute(c, 'height', `${this.width}`),
                      this.renderer.setAttribute(c, 'width', `${this.width}`),
                      this.renderElement(c),
                      this.emitQRCodeURL(c);
                  })
                  .catch((d) => {
                    console.error('[angularx-qrcode] svg error:', d);
                  });
                break;
              }
              case 'url':
              case 'img':
              default: {
                let s = this.renderer.createElement('img');
                this.toDataURL(e)
                  .then((d) => {
                    this.alt && s.setAttribute('alt', this.alt),
                      this.ariaLabel &&
                        s.setAttribute('aria-label', this.ariaLabel),
                      s.setAttribute('src', d),
                      this.title && s.setAttribute('title', this.title),
                      this.renderElement(s),
                      this.emitQRCodeURL(s);
                  })
                  .catch((d) => {
                    console.error('[angularx-qrcode] img/url error:', d);
                  });
              }
            }
          } catch (e) {
            console.error(
              '[angularx-qrcode] Error generating QR Code:',
              e.message
            );
          }
        });
      }
      emitQRCodeURL(e) {
        let n = e.constructor.name;
        if (n === SVGSVGElement.name) {
          let a = e.outerHTML,
            s = new Blob([a], { type: 'image/svg+xml' }),
            d = URL.createObjectURL(s),
            c = this.sanitizer.bypassSecurityTrustUrl(d);
          this.qrCodeURL.emit(c);
          return;
        }
        let o = '';
        n === HTMLCanvasElement.name && (o = e.toDataURL('image/png')),
          n === HTMLImageElement.name && (o = e.src),
          fetch(o)
            .then((a) => a.blob())
            .then((a) => URL.createObjectURL(a))
            .then((a) => this.sanitizer.bypassSecurityTrustUrl(a))
            .then((a) => {
              this.qrCodeURL.emit(a);
            })
            .catch((a) => {
              console.error(
                '[angularx-qrcode] Error when fetching image/png URL: ' + a
              );
            });
      }
    };
    (t.ɵfac = function (n) {
      return new (n || t)(m(Me), m(oi));
    }),
      (t.ɵcmp = Q({
        type: t,
        selectors: [['qrcode']],
        viewQuery: function (n, o) {
          if ((n & 1 && Y(If, 7), n & 2)) {
            let a;
            F((a = D())) && (o.qrcElement = a.first);
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
        features: [St],
        decls: 2,
        vars: 2,
        consts: [['qrcElement', '']],
        template: function (n, o) {
          n & 1 && w(0, 'div', null, 0), n & 2 && It(o.cssClass);
        },
        encapsulation: 2,
        changeDetection: 0,
      }));
    let i = t;
    return i;
  })(),
  yc = (() => {
    let t = class t {};
    (t.ɵfac = function (n) {
      return new (n || t)();
    }),
      (t.ɵmod = E({ type: t })),
      (t.ɵinj = C({}));
    let i = t;
    return i;
  })();
var kc = (() => {
  let t = class t {
    generateFilename() {
      let e = new Date(),
        n = e.getFullYear().toString(),
        o = (e.getMonth() + 1).toString(),
        a = e.getDate().toString().padStart(2, '0'),
        s = e.getHours().toString().padStart(2, '0'),
        d = e.getMinutes().toString().padStart(2, '0'),
        c = e.getSeconds().toString().padStart(2, '0'),
        l = Math.floor(Math.random() * (999999 - 1e5 + 1) + 1e5).toString();
      return `QR_Code_${n}${o}${a}_${s}${d}${c}_${l}`;
    }
  };
  (t.ɵfac = function (n) {
    return new (n || t)();
  }),
    (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
  let i = t;
  return i;
})();
var wc = (() => {
  let t = class t {
    base64ToBlob(e) {
      let n = e.split(';base64,'),
        o = n[0].split(':')[1],
        a = window.atob(n[1]),
        s = new Uint8Array(a.length);
      for (let d = 0; d < a.length; d++) s[d] = a.charCodeAt(d);
      return new Blob([s], { type: o });
    }
  };
  (t.ɵfac = function (n) {
    return new (n || t)();
  }),
    (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
  let i = t;
  return i;
})();
var Cc = (() => {
  let t = class t {
    constructor() {
      (this.fileService = O(kc)), (this.urlService = O(wc));
    }
    saveAsImage(e, n) {
      let o = null;
      if (
        (n === 'canvas'
          ? (o = e.qrcElement.nativeElement
              .querySelector('canvas')
              .toDataURL('image/png'))
          : n === 'img' || n === 'url'
          ? (o = e.qrcElement.nativeElement.querySelector('img').src)
          : alert('Please set the element type (format) to img!'),
        o)
      ) {
        let a = this.urlService.base64ToBlob(o),
          s = new Blob([a], { type: 'image/png' }),
          d = URL.createObjectURL(s),
          c = document.createElement('a');
        (c.href = d),
          (c.target = '_self'),
          (c.download = this.fileService.generateFilename()),
          c.click();
      }
    }
  };
  (t.ɵfac = function (n) {
    return new (n || t)();
  }),
    (t.ɵprov = N({ token: t, factory: t.ɵfac, providedIn: 'root' }));
  let i = t;
  return i;
})();
function Tf(i, t) {
  if (i & 1) {
    let r = en();
    p(0, 'button', 13),
      H('click', function () {
        $i(r);
        let n = K(),
          o = Rt(10);
        return Ki(n.imgService.saveAsImage(o, n.elementType));
      }),
      p(1, 'mat-icon'),
      at(2, 'file_download'),
      g()();
  }
}
function Af(i, t) {
  if (
    (i & 1 && (p(0, 'a', 14)(1, 'mat-icon'), at(2, 'file_download'), g()()),
    i & 2)
  ) {
    let r = K();
    B('href', r.qrCodeUrl, Qo);
  }
}
function Ff(i, t) {
  if (i & 1) {
    let r = en();
    p(0, 'section')(1, 'h3'),
      at(2, 'Options'),
      g(),
      p(3, 'div', 15)(4, 'label', 16),
      at(5, 'Width & Height'),
      g(),
      p(6, 'mat-slider', 17),
      w(7, 'input', 18),
      g(),
      p(8, 'label', 19),
      at(9),
      g()(),
      p(10, 'div', 20)(11, 'p', 21),
      at(12, 'Format:'),
      g(),
      p(13, 'mat-button-toggle-group', 22),
      H('ngModelChange', function (n) {
        $i(r);
        let o = K();
        return Ki((o.elementType = n));
      }),
      p(14, 'mat-button-toggle', 23),
      at(15, 'img (Default)'),
      g(),
      p(16, 'mat-button-toggle', 24),
      at(17, 'svg'),
      g()()()();
  }
  if (i & 2) {
    let r = K();
    k(7),
      B('formControl', r.widthHeightForm),
      k(2),
      nn(' ', r.widthHeight + 'px', ' '),
      k(4),
      B('ngModel', r.elementType);
  }
}
var Ec = (() => {
  let t = class t {
    constructor() {
      (this.imgService = O(Cc)),
        (this.qrCodeOptions = {
          alt: 'QR Code',
          ariaLabel: 'QR Code',
          initialQRData: 'https://github.com/MessiInter/qr-code-gen',
          initialWidthHeight: 100,
          margin: 1,
        }),
        (this.qrDataForm = new Oe()),
        (this.qrData = this.qrCodeOptions.initialQRData),
        (this.qrCodeUrl = ''),
        (this.widthHeightForm = new Oe()),
        (this.widthHeight = this.qrCodeOptions.initialWidthHeight),
        (this.elementType = 'img'),
        (this.showAdvancedOptions = !1);
    }
    onUrlChange(e) {
      this.qrCodeUrl = e;
    }
    onCheckboxChange(e) {
      this.showAdvancedOptions = e;
    }
    ngOnInit() {
      [this.qrDataForm, this.widthHeightForm].forEach((e) => {
        e.valueChanges.subscribe((n) => {
          e === this.qrDataForm
            ? (this.qrData = n || this.qrCodeOptions.initialQRData)
            : (this.widthHeight =
                Number(n) || this.qrCodeOptions.initialWidthHeight);
        });
      });
    }
  };
  (t.ɵfac = function (n) {
    return new (n || t)();
  }),
    (t.ɵcmp = Q({
      type: t,
      selectors: [['qr-code-gen-root']],
      standalone: !0,
      features: [$o],
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
      template: function (n, o) {
        n & 1 &&
          (p(0, 'header', 0)(1, 'a', 1)(2, 'mat-icon', 2),
          at(3, 'qr_code_2'),
          g(),
          p(4, 'h1'),
          at(5, 'QR Code Generator'),
          g()()(),
          w(6, 'br'),
          p(7, 'main')(8, 'div', 3)(9, 'qrcode', 4, 5),
          H('qrCodeURL', function (s) {
            return o.onUrlChange(s);
          }),
          g()(),
          w(11, 'br')(12, 'mat-divider')(13, 'br'),
          p(14, 'div', 6),
          W(15, Tf, 3, 0, 'button', 7)(16, Af, 3, 1),
          g(),
          w(17, 'br')(18, 'mat-divider')(19, 'br'),
          p(20, 'mat-checkbox', 8),
          H('change', function (s) {
            return o.onCheckboxChange(s.checked);
          }),
          at(21, 'Show Advanced Options'),
          g(),
          p(22, 'div', 9)(23, 'form', 10),
          W(24, Ff, 18, 3, 'section'),
          w(25, 'br')(26, 'mat-divider')(27, 'br'),
          p(28, 'mat-form-field', 11)(29, 'mat-label'),
          at(30, 'QR Data'),
          g(),
          w(31, 'input', 12),
          g()()()(),
          w(32, 'router-outlet')),
          n & 2 &&
            (k(9),
            B('alt', o.qrCodeOptions.alt)(
              'ariaLabel',
              o.qrCodeOptions.ariaLabel
            )('qrdata', o.qrData)('elementType', o.elementType)(
              'imageWidth',
              o.widthHeight
            )('imageHeight', o.widthHeight)('width', o.widthHeight)(
              'margin',
              o.qrCodeOptions.margin
            ),
            k(6),
            q(15, o.elementType !== 'svg' ? 15 : 16),
            k(5),
            B('checked', o.showAdvancedOptions),
            k(4),
            q(24, o.showAdvancedOptions ? 24 : -1),
            k(7),
            B('placeholder', o.qrCodeOptions.initialQRData)(
              'formControl',
              o.qrDataForm
            ));
      },
      dependencies: [
        Qr,
        zr,
        pi,
        Rr,
        Or,
        ln,
        Re,
        Wr,
        mn,
        Ea,
        Ca,
        wa,
        Aa,
        Tn,
        An,
        Ra,
        Dn,
        La,
        Oa,
        Ne,
        Wa,
        Fi,
        Ja,
        Ka,
        os,
        ns,
        ds,
        ss,
        Vn,
        fr,
        ur,
        yc,
        xc,
      ],
      styles: [
        `main[_ngcontent-%COMP%]{text-align:center}header.app-header[_ngcontent-%COMP%]{background:#3f51b5;overflow-y:auto;padding-left:20px}header.app-header[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{align-items:center;display:flex;justify-content:center}header.app-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}header.app-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#fff;font-size:20px;font-weight:300;margin:0;padding:20px 8px}header.app-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   mat-icon.qr-icon[_ngcontent-%COMP%]{color:#fff}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]{align-items:center;display:flex;justify-content:center}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form.app-form[_ngcontent-%COMP%]{max-width:500px;min-width:150px;width:100%}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form.app-form[_ngcontent-%COMP%]   mat-form-field.form-field[_ngcontent-%COMP%]{width:100%}main[_ngcontent-%COMP%]   .qrcode[_ngcontent-%COMP%]{align-items:center;display:flex;justify-content:center}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form.app-form[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   .width-height[_ngcontent-%COMP%]   label.width-height-label[_ngcontent-%COMP%]{margin-right:5px}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form.app-form[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   .width-height[_ngcontent-%COMP%]   mat-slider[_ngcontent-%COMP%]   input.width-height-input[_ngcontent-%COMP%]{margin-left:5px}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form.app-form[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   .width-height[_ngcontent-%COMP%]   label.width-height-px-label[_ngcontent-%COMP%]{margin-left:5px}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form.app-form[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{align-items:center;display:flex;justify-content:center}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form.app-form[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   .format-btn[_ngcontent-%COMP%]   p.format-label[_ngcontent-%COMP%]{margin-right:5px}main[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%]   form.app-form[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   .format-btn[_ngcontent-%COMP%]   mat-button-toggle-group.format-toggle-btn[_ngcontent-%COMP%]{margin-left:5px}main[_ngcontent-%COMP%]   mat-checkbox.options-checkbox[_ngcontent-%COMP%]{align-items:center;display:flex;justify-content:center}
/*# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2FwcC9hcHAuY29tcG9uZW50LmNzcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsibWFpbiB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuaGVhZGVyLmFwcC1oZWFkZXIge1xuICBiYWNrZ3JvdW5kOiAjM2Y1MWI1O1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XG59XG5cbmhlYWRlci5hcHAtaGVhZGVyICoge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuaGVhZGVyLmFwcC1oZWFkZXIgYSB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn1cblxuaGVhZGVyLmFwcC1oZWFkZXIgYSBoMSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBmb250LXdlaWdodDogMzAwO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDIwcHggOHB4O1xufVxuXG5oZWFkZXIuYXBwLWhlYWRlciBhIG1hdC1pY29uLnFyLWljb24ge1xuICBjb2xvcjogd2hpdGU7XG59XG5cbm1haW4gLmZvcm0tY29udGFpbmVyIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbm1haW4gLmZvcm0tY29udGFpbmVyIGZvcm0uYXBwLWZvcm0ge1xuICBtYXgtd2lkdGg6IDUwMHB4O1xuICBtaW4td2lkdGg6IDE1MHB4O1xuICB3aWR0aDogMTAwJTtcbn1cblxubWFpbiAuZm9ybS1jb250YWluZXIgZm9ybS5hcHAtZm9ybSBtYXQtZm9ybS1maWVsZC5mb3JtLWZpZWxkIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbm1haW4gLnFyY29kZSB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG5tYWluXG4gIC5mb3JtLWNvbnRhaW5lclxuICBmb3JtLmFwcC1mb3JtXG4gIHNlY3Rpb25cbiAgLndpZHRoLWhlaWdodFxuICBsYWJlbC53aWR0aC1oZWlnaHQtbGFiZWwge1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cblxubWFpblxuICAuZm9ybS1jb250YWluZXJcbiAgZm9ybS5hcHAtZm9ybVxuICBzZWN0aW9uXG4gIC53aWR0aC1oZWlnaHRcbiAgbWF0LXNsaWRlclxuICBpbnB1dC53aWR0aC1oZWlnaHQtaW5wdXQge1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuXG5tYWluXG4gIC5mb3JtLWNvbnRhaW5lclxuICBmb3JtLmFwcC1mb3JtXG4gIHNlY3Rpb25cbiAgLndpZHRoLWhlaWdodFxuICBsYWJlbC53aWR0aC1oZWlnaHQtcHgtbGFiZWwge1xuICBtYXJnaW4tbGVmdDogNXB4O1xufVxuXG5tYWluIC5mb3JtLWNvbnRhaW5lciBmb3JtLmFwcC1mb3JtIHNlY3Rpb24gKiB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG5tYWluIC5mb3JtLWNvbnRhaW5lciBmb3JtLmFwcC1mb3JtIHNlY3Rpb24gLmZvcm1hdC1idG4gcC5mb3JtYXQtbGFiZWwge1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cblxubWFpblxuICAuZm9ybS1jb250YWluZXJcbiAgZm9ybS5hcHAtZm9ybVxuICBzZWN0aW9uXG4gIC5mb3JtYXQtYnRuXG4gIG1hdC1idXR0b24tdG9nZ2xlLWdyb3VwLmZvcm1hdC10b2dnbGUtYnRuIHtcbiAgbWFyZ2luLWxlZnQ6IDVweDtcbn1cblxubWFpbiBtYXQtY2hlY2tib3gub3B0aW9ucy1jaGVja2JveCB7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIkFBQUEsS0FDRSxXQUFZLE1BQ2QsQ0FFQSxNQUFNLENBQUMsV0FDTCxXQUFZLFFBQ1osV0FBWSxLQUNaLGFBQWMsSUFDaEIsQ0FFQSxNQUFNLENBTkMsV0FNVyxFQUNoQixZQUFhLE9BQ2IsUUFBUyxLQUNULGdCQUFpQixNQUNuQixDQUVBLE1BQU0sQ0FaQyxXQVlXLEVBQ2hCLGdCQUFpQixJQUNuQixDQUVBLE1BQU0sQ0FoQkMsV0FnQlcsRUFBRSxHQUNsQixNQUFPLEtBQ1AsVUFBVyxLQUNYLFlBQWEsSUF2QmYsT0F3QlUsRUF4QlYsUUF5QlcsS0FBSyxHQUNoQixDQUVBLE1BQU0sQ0F4QkMsV0F3QlcsRUFBRSxRQUFRLENBQUMsUUFDM0IsTUFBTyxJQUNULENBRUEsS0FBSyxDQUFDLGVBQ0osWUFBYSxPQUNiLFFBQVMsS0FDVCxnQkFBaUIsTUFDbkIsQ0FFQSxLQUFLLENBTkMsZUFNZSxJQUFJLENBQUMsU0FDeEIsVUFBVyxNQUNYLFVBQVcsTUFDWCxNQUFPLElBQ1QsQ0FFQSxLQUFLLENBWkMsZUFZZSxJQUFJLENBTkMsU0FNUyxjQUFjLENBQUMsV0FDaEQsTUFBTyxJQUNULENBRUEsS0FBSyxDQUFDLE9BQ0osWUFBYSxPQUNiLFFBQVMsS0FDVCxnQkFBaUIsTUFDbkIsQ0FFQSxLQUNFLENBdkJJLGVBd0JKLElBQUksQ0FsQm9CLFNBbUJ4QixRQUNBLENBQUMsYUFDRCxLQUFLLENBQUMsbUJBQ04sYUFBYyxHQUNoQixDQUVBLEtBQ0UsQ0FoQ0ksZUFpQ0osSUFBSSxDQTNCb0IsU0E0QnhCLFFBQ0EsQ0FUQyxhQVVELFdBQ0EsS0FBSyxDQUFDLG1CQUNOLFlBQWEsR0FDZixDQUVBLEtBQ0UsQ0ExQ0ksZUEyQ0osSUFBSSxDQXJDb0IsU0FzQ3hCLFFBQ0EsQ0FuQkMsYUFvQkQsS0FBSyxDQUFDLHNCQUNOLFlBQWEsR0FDZixDQUVBLEtBQUssQ0FsREMsZUFrRGUsSUFBSSxDQTVDQyxTQTRDUyxRQUFRLEVBQ3pDLFlBQWEsT0FDYixRQUFTLEtBQ1QsZ0JBQWlCLE1BQ25CLENBRUEsS0FBSyxDQXhEQyxlQXdEZSxJQUFJLENBbERDLFNBa0RTLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxhQUN2RCxhQUFjLEdBQ2hCLENBRUEsS0FDRSxDQTdESSxlQThESixJQUFJLENBeERvQixTQXlEeEIsUUFDQSxDQVIwQyxXQVMxQyx1QkFBdUIsQ0FBQyxrQkFDeEIsWUFBYSxHQUNmLENBRUEsS0FBSyxZQUFZLENBQUMsaUJBQ2hCLFlBQWEsT0FDYixRQUFTLEtBQ1QsZ0JBQWlCLE1BQ25CIiwKICAibmFtZXMiOiBbXQp9Cg== */`,
      ],
    }));
  let i = t;
  return i;
})();
var Ic = [];
var Mc = { providers: [rr(), hr(Ic), lr()] };
var Df = { providers: [mr()] },
  Tc = Jo(Mc, Df);
var Sf = () => or(Ec, Tc),
  Bv = Sf;
export { Bv as a };
//# sourceMappingURL=chunk-BBPKW3XJ.mjs.map
