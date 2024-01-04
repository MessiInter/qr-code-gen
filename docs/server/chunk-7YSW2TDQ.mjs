import './polyfills.server.mjs';
import { a as te, b as nt, d as Km, h as _i } from './chunk-4S7LW3SP.mjs';
var Qm = null;
var Hu = 1;
function ut(t) {
  let e = Qm;
  return (Qm = t), e;
}
var Ym = {
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
function lD(t) {
  if (!(Uu(t) && !t.dirty) && !(!t.dirty && t.lastCleanEpoch === Hu)) {
    if (!t.producerMustRecompute(t) && !Bu(t)) {
      (t.dirty = !1), (t.lastCleanEpoch = Hu);
      return;
    }
    t.producerRecomputeValue(t), (t.dirty = !1), (t.lastCleanEpoch = Hu);
  }
}
function Zm(t) {
  return t && (t.nextProducerIndex = 0), ut(t);
}
function Xm(t, e) {
  if (
    (ut(e),
    !(
      !t ||
      t.producerNode === void 0 ||
      t.producerIndexOfThis === void 0 ||
      t.producerLastReadVersion === void 0
    ))
  ) {
    if (Uu(t))
      for (let n = t.nextProducerIndex; n < t.producerNode.length; n++)
        Vu(t.producerNode[n], t.producerIndexOfThis[n]);
    for (; t.producerNode.length > t.nextProducerIndex; )
      t.producerNode.pop(),
        t.producerLastReadVersion.pop(),
        t.producerIndexOfThis.pop();
  }
}
function Bu(t) {
  Ra(t);
  for (let e = 0; e < t.producerNode.length; e++) {
    let n = t.producerNode[e],
      r = t.producerLastReadVersion[e];
    if (r !== n.version || (lD(n), r !== n.version)) return !0;
  }
  return !1;
}
function Jm(t) {
  if ((Ra(t), Uu(t)))
    for (let e = 0; e < t.producerNode.length; e++)
      Vu(t.producerNode[e], t.producerIndexOfThis[e]);
  (t.producerNode.length =
    t.producerLastReadVersion.length =
    t.producerIndexOfThis.length =
      0),
    t.liveConsumerNode &&
      (t.liveConsumerNode.length = t.liveConsumerIndexOfThis.length = 0);
}
function Vu(t, e) {
  if ((uD(t), Ra(t), t.liveConsumerNode.length === 1))
    for (let r = 0; r < t.producerNode.length; r++)
      Vu(t.producerNode[r], t.producerIndexOfThis[r]);
  let n = t.liveConsumerNode.length - 1;
  if (
    ((t.liveConsumerNode[e] = t.liveConsumerNode[n]),
    (t.liveConsumerIndexOfThis[e] = t.liveConsumerIndexOfThis[n]),
    t.liveConsumerNode.length--,
    t.liveConsumerIndexOfThis.length--,
    e < t.liveConsumerNode.length)
  ) {
    let r = t.liveConsumerIndexOfThis[e],
      i = t.liveConsumerNode[e];
    Ra(i), (i.producerIndexOfThis[r] = e);
  }
}
function Uu(t) {
  return t.consumerIsAlwaysLive || (t?.liveConsumerNode?.length ?? 0) > 0;
}
function Ra(t) {
  (t.producerNode ??= []),
    (t.producerIndexOfThis ??= []),
    (t.producerLastReadVersion ??= []);
}
function uD(t) {
  (t.liveConsumerNode ??= []), (t.liveConsumerIndexOfThis ??= []);
}
function dD() {
  throw new Error();
}
var fD = dD;
function eg(t) {
  fD = t;
}
function me(t) {
  return typeof t == 'function';
}
function Di(t) {
  let n = t((r) => {
    Error.call(r), (r.stack = new Error().stack);
  });
  return (
    (n.prototype = Object.create(Error.prototype)),
    (n.prototype.constructor = n),
    n
  );
}
var Oa = Di(
  (t) =>
    function (n) {
      t(this),
        (this.message = n
          ? `${n.length} errors occurred during unsubscription:
${n.map((r, i) => `${i + 1}) ${r.toString()}`).join(`
  `)}`
          : ''),
        (this.name = 'UnsubscriptionError'),
        (this.errors = n);
    }
);
function qr(t, e) {
  if (t) {
    let n = t.indexOf(e);
    0 <= n && t.splice(n, 1);
  }
}
var Je = class t {
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
      let { _parentage: n } = this;
      if (n)
        if (((this._parentage = null), Array.isArray(n)))
          for (let s of n) s.remove(this);
        else n.remove(this);
      let { initialTeardown: r } = this;
      if (me(r))
        try {
          r();
        } catch (s) {
          e = s instanceof Oa ? s.errors : [s];
        }
      let { _finalizers: i } = this;
      if (i) {
        this._finalizers = null;
        for (let s of i)
          try {
            tg(s);
          } catch (o) {
            (e = e ?? []),
              o instanceof Oa ? (e = [...e, ...o.errors]) : e.push(o);
          }
      }
      if (e) throw new Oa(e);
    }
  }
  add(e) {
    var n;
    if (e && e !== this)
      if (this.closed) tg(e);
      else {
        if (e instanceof t) {
          if (e.closed || e._hasParent(this)) return;
          e._addParent(this);
        }
        (this._finalizers =
          (n = this._finalizers) !== null && n !== void 0 ? n : []).push(e);
      }
  }
  _hasParent(e) {
    let { _parentage: n } = this;
    return n === e || (Array.isArray(n) && n.includes(e));
  }
  _addParent(e) {
    let { _parentage: n } = this;
    this._parentage = Array.isArray(n) ? (n.push(e), n) : n ? [n, e] : e;
  }
  _removeParent(e) {
    let { _parentage: n } = this;
    n === e ? (this._parentage = null) : Array.isArray(n) && qr(n, e);
  }
  remove(e) {
    let { _finalizers: n } = this;
    n && qr(n, e), e instanceof t && e._removeParent(this);
  }
};
Je.EMPTY = (() => {
  let t = new Je();
  return (t.closed = !0), t;
})();
var $u = Je.EMPTY;
function ka(t) {
  return (
    t instanceof Je ||
    (t && 'closed' in t && me(t.remove) && me(t.add) && me(t.unsubscribe))
  );
}
function tg(t) {
  me(t) ? t() : t.unsubscribe();
}
var Yt = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var Ti = {
  setTimeout(t, e, ...n) {
    let { delegate: r } = Ti;
    return r?.setTimeout ? r.setTimeout(t, e, ...n) : setTimeout(t, e, ...n);
  },
  clearTimeout(t) {
    let { delegate: e } = Ti;
    return (e?.clearTimeout || clearTimeout)(t);
  },
  delegate: void 0,
};
function La(t) {
  Ti.setTimeout(() => {
    let { onUnhandledError: e } = Yt;
    if (e) e(t);
    else throw t;
  });
}
function Rs() {}
var ng = (() => qu('C', void 0, void 0))();
function rg(t) {
  return qu('E', void 0, t);
}
function ig(t) {
  return qu('N', t, void 0);
}
function qu(t, e, n) {
  return { kind: t, value: e, error: n };
}
var zr = null;
function Si(t) {
  if (Yt.useDeprecatedSynchronousErrorHandling) {
    let e = !zr;
    if ((e && (zr = { errorThrown: !1, error: null }), t(), e)) {
      let { errorThrown: n, error: r } = zr;
      if (((zr = null), n)) throw r;
    }
  } else t();
}
function sg(t) {
  Yt.useDeprecatedSynchronousErrorHandling &&
    zr &&
    ((zr.errorThrown = !0), (zr.error = t));
}
var Gr = class extends Je {
    constructor(e) {
      super(),
        (this.isStopped = !1),
        e
          ? ((this.destination = e), ka(e) && e.add(this))
          : (this.destination = mD);
    }
    static create(e, n, r) {
      return new xn(e, n, r);
    }
    next(e) {
      this.isStopped ? Gu(ig(e), this) : this._next(e);
    }
    error(e) {
      this.isStopped
        ? Gu(rg(e), this)
        : ((this.isStopped = !0), this._error(e));
    }
    complete() {
      this.isStopped ? Gu(ng, this) : ((this.isStopped = !0), this._complete());
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
  hD = Function.prototype.bind;
function zu(t, e) {
  return hD.call(t, e);
}
var Wu = class {
    constructor(e) {
      this.partialObserver = e;
    }
    next(e) {
      let { partialObserver: n } = this;
      if (n.next)
        try {
          n.next(e);
        } catch (r) {
          Pa(r);
        }
    }
    error(e) {
      let { partialObserver: n } = this;
      if (n.error)
        try {
          n.error(e);
        } catch (r) {
          Pa(r);
        }
      else Pa(e);
    }
    complete() {
      let { partialObserver: e } = this;
      if (e.complete)
        try {
          e.complete();
        } catch (n) {
          Pa(n);
        }
    }
  },
  xn = class extends Gr {
    constructor(e, n, r) {
      super();
      let i;
      if (me(e) || !e)
        i = { next: e ?? void 0, error: n ?? void 0, complete: r ?? void 0 };
      else {
        let s;
        this && Yt.useDeprecatedNextContext
          ? ((s = Object.create(e)),
            (s.unsubscribe = () => this.unsubscribe()),
            (i = {
              next: e.next && zu(e.next, s),
              error: e.error && zu(e.error, s),
              complete: e.complete && zu(e.complete, s),
            }))
          : (i = e);
      }
      this.destination = new Wu(i);
    }
  };
function Pa(t) {
  Yt.useDeprecatedSynchronousErrorHandling ? sg(t) : La(t);
}
function pD(t) {
  throw t;
}
function Gu(t, e) {
  let { onStoppedNotification: n } = Yt;
  n && Ti.setTimeout(() => n(t, e));
}
var mD = { closed: !0, next: Rs, error: pD, complete: Rs };
var Ci = (() =>
  (typeof Symbol == 'function' && Symbol.observable) || '@@observable')();
function bt(t) {
  return t;
}
function Ku(...t) {
  return Qu(t);
}
function Qu(t) {
  return t.length === 0
    ? bt
    : t.length === 1
    ? t[0]
    : function (n) {
        return t.reduce((r, i) => i(r), n);
      };
}
var xe = (() => {
  class t {
    constructor(n) {
      n && (this._subscribe = n);
    }
    lift(n) {
      let r = new t();
      return (r.source = this), (r.operator = n), r;
    }
    subscribe(n, r, i) {
      let s = yD(n) ? n : new xn(n, r, i);
      return (
        Si(() => {
          let { operator: o, source: a } = this;
          s.add(
            o ? o.call(s, a) : a ? this._subscribe(s) : this._trySubscribe(s)
          );
        }),
        s
      );
    }
    _trySubscribe(n) {
      try {
        return this._subscribe(n);
      } catch (r) {
        n.error(r);
      }
    }
    forEach(n, r) {
      return (
        (r = og(r)),
        new r((i, s) => {
          let o = new xn({
            next: (a) => {
              try {
                n(a);
              } catch (c) {
                s(c), o.unsubscribe();
              }
            },
            error: s,
            complete: i,
          });
          this.subscribe(o);
        })
      );
    }
    _subscribe(n) {
      var r;
      return (r = this.source) === null || r === void 0
        ? void 0
        : r.subscribe(n);
    }
    [Ci]() {
      return this;
    }
    pipe(...n) {
      return Qu(n)(this);
    }
    toPromise(n) {
      return (
        (n = og(n)),
        new n((r, i) => {
          let s;
          this.subscribe(
            (o) => (s = o),
            (o) => i(o),
            () => r(s)
          );
        })
      );
    }
  }
  return (t.create = (e) => new t(e)), t;
})();
function og(t) {
  var e;
  return (e = t ?? Yt.Promise) !== null && e !== void 0 ? e : Promise;
}
function gD(t) {
  return t && me(t.next) && me(t.error) && me(t.complete);
}
function yD(t) {
  return (t && t instanceof Gr) || (gD(t) && ka(t));
}
function Yu(t) {
  return me(t?.lift);
}
function Ee(t) {
  return (e) => {
    if (Yu(e))
      return e.lift(function (n) {
        try {
          return t(n, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError('Unable to lift unknown Observable type');
  };
}
function be(t, e, n, r, i) {
  return new Zu(t, e, n, r, i);
}
var Zu = class extends Gr {
  constructor(e, n, r, i, s, o) {
    super(e),
      (this.onFinalize = s),
      (this.shouldUnsubscribe = o),
      (this._next = n
        ? function (a) {
            try {
              n(a);
            } catch (c) {
              e.error(c);
            }
          }
        : super._next),
      (this._error = i
        ? function (a) {
            try {
              i(a);
            } catch (c) {
              e.error(c);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = r
        ? function () {
            try {
              r();
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
      let { closed: n } = this;
      super.unsubscribe(),
        !n && ((e = this.onFinalize) === null || e === void 0 || e.call(this));
    }
  }
};
function Ii() {
  return Ee((t, e) => {
    let n = null;
    t._refCount++;
    let r = be(e, void 0, void 0, void 0, () => {
      if (!t || t._refCount <= 0 || 0 < --t._refCount) {
        n = null;
        return;
      }
      let i = t._connection,
        s = n;
      (n = null), i && (!s || i === s) && i.unsubscribe(), e.unsubscribe();
    });
    t.subscribe(r), r.closed || (n = t.connect());
  });
}
var Mi = class extends xe {
  constructor(e, n) {
    super(),
      (this.source = e),
      (this.subjectFactory = n),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      Yu(e) && (this.lift = e.lift);
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
      e = this._connection = new Je();
      let n = this.getSubject();
      e.add(
        this.source.subscribe(
          be(
            n,
            void 0,
            () => {
              this._teardown(), n.complete();
            },
            (r) => {
              this._teardown(), n.error(r);
            },
            () => this._teardown()
          )
        )
      ),
        e.closed && ((this._connection = null), (e = Je.EMPTY));
    }
    return e;
  }
  refCount() {
    return Ii()(this);
  }
};
var ag = Di(
  (t) =>
    function () {
      t(this),
        (this.name = 'ObjectUnsubscribedError'),
        (this.message = 'object unsubscribed');
    }
);
var st = (() => {
    class t extends xe {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(n) {
        let r = new Fa(this, this);
        return (r.operator = n), r;
      }
      _throwIfClosed() {
        if (this.closed) throw new ag();
      }
      next(n) {
        Si(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let r of this.currentObservers) r.next(n);
          }
        });
      }
      error(n) {
        Si(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = n);
            let { observers: r } = this;
            for (; r.length; ) r.shift().error(n);
          }
        });
      }
      complete() {
        Si(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: n } = this;
            for (; n.length; ) n.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }
      get observed() {
        var n;
        return (
          ((n = this.observers) === null || n === void 0 ? void 0 : n.length) >
          0
        );
      }
      _trySubscribe(n) {
        return this._throwIfClosed(), super._trySubscribe(n);
      }
      _subscribe(n) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(n),
          this._innerSubscribe(n)
        );
      }
      _innerSubscribe(n) {
        let { hasError: r, isStopped: i, observers: s } = this;
        return r || i
          ? $u
          : ((this.currentObservers = null),
            s.push(n),
            new Je(() => {
              (this.currentObservers = null), qr(s, n);
            }));
      }
      _checkFinalizedStatuses(n) {
        let { hasError: r, thrownError: i, isStopped: s } = this;
        r ? n.error(i) : s && n.complete();
      }
      asObservable() {
        let n = new xe();
        return (n.source = this), n;
      }
    }
    return (t.create = (e, n) => new Fa(e, n)), t;
  })(),
  Fa = class extends st {
    constructor(e, n) {
      super(), (this.destination = e), (this.source = n);
    }
    next(e) {
      var n, r;
      (r =
        (n = this.destination) === null || n === void 0 ? void 0 : n.next) ===
        null ||
        r === void 0 ||
        r.call(n, e);
    }
    error(e) {
      var n, r;
      (r =
        (n = this.destination) === null || n === void 0 ? void 0 : n.error) ===
        null ||
        r === void 0 ||
        r.call(n, e);
    }
    complete() {
      var e, n;
      (n =
        (e = this.destination) === null || e === void 0
          ? void 0
          : e.complete) === null ||
        n === void 0 ||
        n.call(e);
    }
    _subscribe(e) {
      var n, r;
      return (r =
        (n = this.source) === null || n === void 0
          ? void 0
          : n.subscribe(e)) !== null && r !== void 0
        ? r
        : $u;
    }
  };
var dt = class extends st {
  constructor(e) {
    super(), (this._value = e);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(e) {
    let n = super._subscribe(e);
    return !n.closed && e.next(this._value), n;
  }
  getValue() {
    let { hasError: e, thrownError: n, _value: r } = this;
    if (e) throw n;
    return this._throwIfClosed(), r;
  }
  next(e) {
    super.next((this._value = e));
  }
};
var Os = {
  now() {
    return (Os.delegate || Date).now();
  },
  delegate: void 0,
};
var ja = class extends st {
  constructor(e = 1 / 0, n = 1 / 0, r = Os) {
    super(),
      (this._bufferSize = e),
      (this._windowTime = n),
      (this._timestampProvider = r),
      (this._buffer = []),
      (this._infiniteTimeWindow = !0),
      (this._infiniteTimeWindow = n === 1 / 0),
      (this._bufferSize = Math.max(1, e)),
      (this._windowTime = Math.max(1, n));
  }
  next(e) {
    let {
      isStopped: n,
      _buffer: r,
      _infiniteTimeWindow: i,
      _timestampProvider: s,
      _windowTime: o,
    } = this;
    n || (r.push(e), !i && r.push(s.now() + o)),
      this._trimBuffer(),
      super.next(e);
  }
  _subscribe(e) {
    this._throwIfClosed(), this._trimBuffer();
    let n = this._innerSubscribe(e),
      { _infiniteTimeWindow: r, _buffer: i } = this,
      s = i.slice();
    for (let o = 0; o < s.length && !e.closed; o += r ? 1 : 2) e.next(s[o]);
    return this._checkFinalizedStatuses(e), n;
  }
  _trimBuffer() {
    let {
        _bufferSize: e,
        _timestampProvider: n,
        _buffer: r,
        _infiniteTimeWindow: i,
      } = this,
      s = (i ? 1 : 2) * e;
    if ((e < 1 / 0 && s < r.length && r.splice(0, r.length - s), !i)) {
      let o = n.now(),
        a = 0;
      for (let c = 1; c < r.length && r[c] <= o; c += 2) a = c;
      a && r.splice(0, a + 1);
    }
  }
};
var Ha = class extends Je {
  constructor(e, n) {
    super();
  }
  schedule(e, n = 0) {
    return this;
  }
};
var ks = {
  setInterval(t, e, ...n) {
    let { delegate: r } = ks;
    return r?.setInterval ? r.setInterval(t, e, ...n) : setInterval(t, e, ...n);
  },
  clearInterval(t) {
    let { delegate: e } = ks;
    return (e?.clearInterval || clearInterval)(t);
  },
  delegate: void 0,
};
var Ba = class extends Ha {
  constructor(e, n) {
    super(e, n), (this.scheduler = e), (this.work = n), (this.pending = !1);
  }
  schedule(e, n = 0) {
    var r;
    if (this.closed) return this;
    this.state = e;
    let i = this.id,
      s = this.scheduler;
    return (
      i != null && (this.id = this.recycleAsyncId(s, i, n)),
      (this.pending = !0),
      (this.delay = n),
      (this.id =
        (r = this.id) !== null && r !== void 0
          ? r
          : this.requestAsyncId(s, this.id, n)),
      this
    );
  }
  requestAsyncId(e, n, r = 0) {
    return ks.setInterval(e.flush.bind(e, this), r);
  }
  recycleAsyncId(e, n, r = 0) {
    if (r != null && this.delay === r && this.pending === !1) return n;
    n != null && ks.clearInterval(n);
  }
  execute(e, n) {
    if (this.closed) return new Error('executing a cancelled action');
    this.pending = !1;
    let r = this._execute(e, n);
    if (r) return r;
    this.pending === !1 &&
      this.id != null &&
      (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }
  _execute(e, n) {
    let r = !1,
      i;
    try {
      this.work(e);
    } catch (s) {
      (r = !0), (i = s || new Error('Scheduled action threw falsy error'));
    }
    if (r) return this.unsubscribe(), i;
  }
  unsubscribe() {
    if (!this.closed) {
      let { id: e, scheduler: n } = this,
        { actions: r } = n;
      (this.work = this.state = this.scheduler = null),
        (this.pending = !1),
        qr(r, this),
        e != null && (this.id = this.recycleAsyncId(n, e, null)),
        (this.delay = null),
        super.unsubscribe();
    }
  }
};
var Ni = class t {
  constructor(e, n = t.now) {
    (this.schedulerActionCtor = e), (this.now = n);
  }
  schedule(e, n = 0, r) {
    return new this.schedulerActionCtor(this, e).schedule(r, n);
  }
};
Ni.now = Os.now;
var Va = class extends Ni {
  constructor(e, n = Ni.now) {
    super(e, n), (this.actions = []), (this._active = !1);
  }
  flush(e) {
    let { actions: n } = this;
    if (this._active) {
      n.push(e);
      return;
    }
    let r;
    this._active = !0;
    do if ((r = e.execute(e.state, e.delay))) break;
    while ((e = n.shift()));
    if (((this._active = !1), r)) {
      for (; (e = n.shift()); ) e.unsubscribe();
      throw r;
    }
  }
};
var cg = new Va(Ba);
var At = new xe((t) => t.complete());
function lg(t) {
  return t && me(t.schedule);
}
function Xu(t) {
  return t[t.length - 1];
}
function Ua(t) {
  return me(Xu(t)) ? t.pop() : void 0;
}
function dn(t) {
  return lg(Xu(t)) ? t.pop() : void 0;
}
function ug(t, e) {
  return typeof Xu(t) == 'number' ? t.pop() : e;
}
function fg(t, e, n, r) {
  function i(s) {
    return s instanceof n
      ? s
      : new n(function (o) {
          o(s);
        });
  }
  return new (n || (n = Promise))(function (s, o) {
    function a(u) {
      try {
        l(r.next(u));
      } catch (d) {
        o(d);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (d) {
        o(d);
      }
    }
    function l(u) {
      u.done ? s(u.value) : i(u.value).then(a, c);
    }
    l((r = r.apply(t, e || [])).next());
  });
}
function dg(t) {
  var e = typeof Symbol == 'function' && Symbol.iterator,
    n = e && t[e],
    r = 0;
  if (n) return n.call(t);
  if (t && typeof t.length == 'number')
    return {
      next: function () {
        return (
          t && r >= t.length && (t = void 0), { value: t && t[r++], done: !t }
        );
      },
    };
  throw new TypeError(
    e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
  );
}
function Wr(t) {
  return this instanceof Wr ? ((this.v = t), this) : new Wr(t);
}
function hg(t, e, n) {
  if (!Symbol.asyncIterator)
    throw new TypeError('Symbol.asyncIterator is not defined.');
  var r = n.apply(t, e || []),
    i,
    s = [];
  return (
    (i = {}),
    o('next'),
    o('throw'),
    o('return'),
    (i[Symbol.asyncIterator] = function () {
      return this;
    }),
    i
  );
  function o(m) {
    r[m] &&
      (i[m] = function (E) {
        return new Promise(function (I, M) {
          s.push([m, E, I, M]) > 1 || a(m, E);
        });
      });
  }
  function a(m, E) {
    try {
      c(r[m](E));
    } catch (I) {
      d(s[0][3], I);
    }
  }
  function c(m) {
    m.value instanceof Wr
      ? Promise.resolve(m.value.v).then(l, u)
      : d(s[0][2], m);
  }
  function l(m) {
    a('next', m);
  }
  function u(m) {
    a('throw', m);
  }
  function d(m, E) {
    m(E), s.shift(), s.length && a(s[0][0], s[0][1]);
  }
}
function pg(t) {
  if (!Symbol.asyncIterator)
    throw new TypeError('Symbol.asyncIterator is not defined.');
  var e = t[Symbol.asyncIterator],
    n;
  return e
    ? e.call(t)
    : ((t = typeof dg == 'function' ? dg(t) : t[Symbol.iterator]()),
      (n = {}),
      r('next'),
      r('throw'),
      r('return'),
      (n[Symbol.asyncIterator] = function () {
        return this;
      }),
      n);
  function r(s) {
    n[s] =
      t[s] &&
      function (o) {
        return new Promise(function (a, c) {
          (o = t[s](o)), i(a, c, o.done, o.value);
        });
      };
  }
  function i(s, o, a, c) {
    Promise.resolve(c).then(function (l) {
      s({ value: l, done: a });
    }, o);
  }
}
var $a = (t) => t && typeof t.length == 'number' && typeof t != 'function';
function qa(t) {
  return me(t?.then);
}
function za(t) {
  return me(t[Ci]);
}
function Ga(t) {
  return Symbol.asyncIterator && me(t?.[Symbol.asyncIterator]);
}
function Wa(t) {
  return new TypeError(
    `You provided ${
      t !== null && typeof t == 'object' ? 'an invalid object' : `'${t}'`
    } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function vD() {
  return typeof Symbol != 'function' || !Symbol.iterator
    ? '@@iterator'
    : Symbol.iterator;
}
var Ka = vD();
function Qa(t) {
  return me(t?.[Ka]);
}
function Ya(t) {
  return hg(this, arguments, function* () {
    let n = t.getReader();
    try {
      for (;;) {
        let { value: r, done: i } = yield Wr(n.read());
        if (i) return yield Wr(void 0);
        yield yield Wr(r);
      }
    } finally {
      n.releaseLock();
    }
  });
}
function Za(t) {
  return me(t?.getReader);
}
function qe(t) {
  if (t instanceof xe) return t;
  if (t != null) {
    if (za(t)) return ED(t);
    if ($a(t)) return bD(t);
    if (qa(t)) return wD(t);
    if (Ga(t)) return mg(t);
    if (Qa(t)) return _D(t);
    if (Za(t)) return DD(t);
  }
  throw Wa(t);
}
function ED(t) {
  return new xe((e) => {
    let n = t[Ci]();
    if (me(n.subscribe)) return n.subscribe(e);
    throw new TypeError(
      'Provided object does not correctly implement Symbol.observable'
    );
  });
}
function bD(t) {
  return new xe((e) => {
    for (let n = 0; n < t.length && !e.closed; n++) e.next(t[n]);
    e.complete();
  });
}
function wD(t) {
  return new xe((e) => {
    t.then(
      (n) => {
        e.closed || (e.next(n), e.complete());
      },
      (n) => e.error(n)
    ).then(null, La);
  });
}
function _D(t) {
  return new xe((e) => {
    for (let n of t) if ((e.next(n), e.closed)) return;
    e.complete();
  });
}
function mg(t) {
  return new xe((e) => {
    TD(t, e).catch((n) => e.error(n));
  });
}
function DD(t) {
  return mg(Ya(t));
}
function TD(t, e) {
  var n, r, i, s;
  return fg(this, void 0, void 0, function* () {
    try {
      for (n = pg(t); (r = yield n.next()), !r.done; ) {
        let o = r.value;
        if ((e.next(o), e.closed)) return;
      }
    } catch (o) {
      i = { error: o };
    } finally {
      try {
        r && !r.done && (s = n.return) && (yield s.call(n));
      } finally {
        if (i) throw i.error;
      }
    }
    e.complete();
  });
}
function xt(t, e, n, r = 0, i = !1) {
  let s = e.schedule(function () {
    n(), i ? t.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if ((t.add(s), !i)) return s;
}
function Xa(t, e = 0) {
  return Ee((n, r) => {
    n.subscribe(
      be(
        r,
        (i) => xt(r, t, () => r.next(i), e),
        () => xt(r, t, () => r.complete(), e),
        (i) => xt(r, t, () => r.error(i), e)
      )
    );
  });
}
function Ja(t, e = 0) {
  return Ee((n, r) => {
    r.add(t.schedule(() => n.subscribe(r), e));
  });
}
function gg(t, e) {
  return qe(t).pipe(Ja(e), Xa(e));
}
function yg(t, e) {
  return qe(t).pipe(Ja(e), Xa(e));
}
function vg(t, e) {
  return new xe((n) => {
    let r = 0;
    return e.schedule(function () {
      r === t.length
        ? n.complete()
        : (n.next(t[r++]), n.closed || this.schedule());
    });
  });
}
function Eg(t, e) {
  return new xe((n) => {
    let r;
    return (
      xt(n, e, () => {
        (r = t[Ka]()),
          xt(
            n,
            e,
            () => {
              let i, s;
              try {
                ({ value: i, done: s } = r.next());
              } catch (o) {
                n.error(o);
                return;
              }
              s ? n.complete() : n.next(i);
            },
            0,
            !0
          );
      }),
      () => me(r?.return) && r.return()
    );
  });
}
function ec(t, e) {
  if (!t) throw new Error('Iterable cannot be null');
  return new xe((n) => {
    xt(n, e, () => {
      let r = t[Symbol.asyncIterator]();
      xt(
        n,
        e,
        () => {
          r.next().then((i) => {
            i.done ? n.complete() : n.next(i.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function bg(t, e) {
  return ec(Ya(t), e);
}
function wg(t, e) {
  if (t != null) {
    if (za(t)) return gg(t, e);
    if ($a(t)) return vg(t, e);
    if (qa(t)) return yg(t, e);
    if (Ga(t)) return ec(t, e);
    if (Qa(t)) return Eg(t, e);
    if (Za(t)) return bg(t, e);
  }
  throw Wa(t);
}
function ze(t, e) {
  return e ? wg(t, e) : qe(t);
}
function ue(...t) {
  let e = dn(t);
  return ze(t, e);
}
function Ai(t, e) {
  let n = me(t) ? t : () => t,
    r = (i) => i.error(n());
  return new xe(e ? (i) => e.schedule(r, 0, i) : r);
}
function Ju(t) {
  return !!t && (t instanceof xe || (me(t.lift) && me(t.subscribe)));
}
var Rn = Di(
  (t) =>
    function () {
      t(this),
        (this.name = 'EmptyError'),
        (this.message = 'no elements in sequence');
    }
);
function we(t, e) {
  return Ee((n, r) => {
    let i = 0;
    n.subscribe(
      be(r, (s) => {
        r.next(t.call(e, s, i++));
      })
    );
  });
}
var { isArray: SD } = Array;
function CD(t, e) {
  return SD(e) ? t(...e) : t(e);
}
function tc(t) {
  return we((e) => CD(t, e));
}
var { isArray: ID } = Array,
  { getPrototypeOf: MD, prototype: ND, keys: AD } = Object;
function nc(t) {
  if (t.length === 1) {
    let e = t[0];
    if (ID(e)) return { args: e, keys: null };
    if (xD(e)) {
      let n = AD(e);
      return { args: n.map((r) => e[r]), keys: n };
    }
  }
  return { args: t, keys: null };
}
function xD(t) {
  return t && typeof t == 'object' && MD(t) === ND;
}
function rc(t, e) {
  return t.reduce((n, r, i) => ((n[r] = e[i]), n), {});
}
function Ls(...t) {
  let e = dn(t),
    n = Ua(t),
    { args: r, keys: i } = nc(t);
  if (r.length === 0) return ze([], e);
  let s = new xe(RD(r, e, i ? (o) => rc(i, o) : bt));
  return n ? s.pipe(tc(n)) : s;
}
function RD(t, e, n = bt) {
  return (r) => {
    _g(
      e,
      () => {
        let { length: i } = t,
          s = new Array(i),
          o = i,
          a = i;
        for (let c = 0; c < i; c++)
          _g(
            e,
            () => {
              let l = ze(t[c], e),
                u = !1;
              l.subscribe(
                be(
                  r,
                  (d) => {
                    (s[c] = d), u || ((u = !0), a--), a || r.next(n(s.slice()));
                  },
                  () => {
                    --o || r.complete();
                  }
                )
              );
            },
            r
          );
      },
      r
    );
  };
}
function _g(t, e, n) {
  t ? xt(n, t, e) : e();
}
function Dg(t, e, n, r, i, s, o, a) {
  let c = [],
    l = 0,
    u = 0,
    d = !1,
    m = () => {
      d && !c.length && !l && e.complete();
    },
    E = (M) => (l < r ? I(M) : c.push(M)),
    I = (M) => {
      s && e.next(M), l++;
      let j = !1;
      qe(n(M, u++)).subscribe(
        be(
          e,
          (O) => {
            i?.(O), s ? E(O) : e.next(O);
          },
          () => {
            j = !0;
          },
          void 0,
          () => {
            if (j)
              try {
                for (l--; c.length && l < r; ) {
                  let O = c.shift();
                  o ? xt(e, o, () => I(O)) : I(O);
                }
                m();
              } catch (O) {
                e.error(O);
              }
          }
        )
      );
    };
  return (
    t.subscribe(
      be(e, E, () => {
        (d = !0), m();
      })
    ),
    () => {
      a?.();
    }
  );
}
function rt(t, e, n = 1 / 0) {
  return me(e)
    ? rt((r, i) => we((s, o) => e(r, s, i, o))(qe(t(r, i))), n)
    : (typeof e == 'number' && (n = e), Ee((r, i) => Dg(r, i, t, n)));
}
function cr(t = 1 / 0) {
  return rt(bt, t);
}
function Tg() {
  return cr(1);
}
function xi(...t) {
  return Tg()(ze(t, dn(t)));
}
function ic(t) {
  return new xe((e) => {
    qe(t()).subscribe(e);
  });
}
function OD(...t) {
  let e = Ua(t),
    { args: n, keys: r } = nc(t),
    i = new xe((s) => {
      let { length: o } = n;
      if (!o) {
        s.complete();
        return;
      }
      let a = new Array(o),
        c = o,
        l = o;
      for (let u = 0; u < o; u++) {
        let d = !1;
        qe(n[u]).subscribe(
          be(
            s,
            (m) => {
              d || ((d = !0), l--), (a[u] = m);
            },
            () => c--,
            void 0,
            () => {
              (!c || !d) && (l || s.next(r ? rc(r, a) : a), s.complete());
            }
          )
        );
      }
    });
  return e ? i.pipe(tc(e)) : i;
}
function kD(...t) {
  let e = dn(t),
    n = ug(t, 1 / 0),
    r = t;
  return r.length ? (r.length === 1 ? qe(r[0]) : cr(n)(ze(r, e))) : At;
}
function mt(t, e) {
  return Ee((n, r) => {
    let i = 0;
    n.subscribe(be(r, (s) => t.call(e, s, i++) && r.next(s)));
  });
}
function lr(t) {
  return Ee((e, n) => {
    let r = null,
      i = !1,
      s;
    (r = e.subscribe(
      be(n, void 0, void 0, (o) => {
        (s = qe(t(o, lr(t)(e)))),
          r ? (r.unsubscribe(), (r = null), s.subscribe(n)) : (i = !0);
      })
    )),
      i && (r.unsubscribe(), (r = null), s.subscribe(n));
  });
}
function Sg(t, e, n, r, i) {
  return (s, o) => {
    let a = n,
      c = e,
      l = 0;
    s.subscribe(
      be(
        o,
        (u) => {
          let d = l++;
          (c = a ? t(c, u, d) : ((a = !0), u)), r && o.next(c);
        },
        i &&
          (() => {
            a && o.next(c), o.complete();
          })
      )
    );
  };
}
function On(t, e) {
  return me(e) ? rt(t, e, 1) : rt(t, 1);
}
function LD(t, e = cg) {
  return Ee((n, r) => {
    let i = null,
      s = null,
      o = null,
      a = () => {
        if (i) {
          i.unsubscribe(), (i = null);
          let l = s;
          (s = null), r.next(l);
        }
      };
    function c() {
      let l = o + t,
        u = e.now();
      if (u < l) {
        (i = this.schedule(void 0, l - u)), r.add(i);
        return;
      }
      a();
    }
    n.subscribe(
      be(
        r,
        (l) => {
          (s = l), (o = e.now()), i || ((i = e.schedule(c, t)), r.add(i));
        },
        () => {
          a(), r.complete();
        },
        void 0,
        () => {
          s = i = null;
        }
      )
    );
  });
}
function ur(t) {
  return Ee((e, n) => {
    let r = !1;
    e.subscribe(
      be(
        n,
        (i) => {
          (r = !0), n.next(i);
        },
        () => {
          r || n.next(t), n.complete();
        }
      )
    );
  });
}
function kn(t) {
  return t <= 0
    ? () => At
    : Ee((e, n) => {
        let r = 0;
        e.subscribe(
          be(n, (i) => {
            ++r <= t && (n.next(i), t <= r && n.complete());
          })
        );
      });
}
function ed(t) {
  return we(() => t);
}
function PD(t, e = bt) {
  return (
    (t = t ?? FD),
    Ee((n, r) => {
      let i,
        s = !0;
      n.subscribe(
        be(r, (o) => {
          let a = e(o);
          (s || !t(i, a)) && ((s = !1), (i = a), r.next(o));
        })
      );
    })
  );
}
function FD(t, e) {
  return t === e;
}
function sc(t = jD) {
  return Ee((e, n) => {
    let r = !1;
    e.subscribe(
      be(
        n,
        (i) => {
          (r = !0), n.next(i);
        },
        () => (r ? n.complete() : n.error(t()))
      )
    );
  });
}
function jD() {
  return new Rn();
}
function Ri(t) {
  return Ee((e, n) => {
    try {
      e.subscribe(n);
    } finally {
      n.add(t);
    }
  });
}
function Zt(t, e) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(
      t ? mt((i, s) => t(i, s, r)) : bt,
      kn(1),
      n ? ur(e) : sc(() => new Rn())
    );
}
function Oi(t) {
  return t <= 0
    ? () => At
    : Ee((e, n) => {
        let r = [];
        e.subscribe(
          be(
            n,
            (i) => {
              r.push(i), t < r.length && r.shift();
            },
            () => {
              for (let i of r) n.next(i);
              n.complete();
            },
            void 0,
            () => {
              r = null;
            }
          )
        );
      });
}
function td(t, e) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(
      t ? mt((i, s) => t(i, s, r)) : bt,
      Oi(1),
      n ? ur(e) : sc(() => new Rn())
    );
}
function nd(t, e) {
  return Ee(Sg(t, e, arguments.length >= 2, !0));
}
function id(t = {}) {
  let {
    connector: e = () => new st(),
    resetOnError: n = !0,
    resetOnComplete: r = !0,
    resetOnRefCountZero: i = !0,
  } = t;
  return (s) => {
    let o,
      a,
      c,
      l = 0,
      u = !1,
      d = !1,
      m = () => {
        a?.unsubscribe(), (a = void 0);
      },
      E = () => {
        m(), (o = c = void 0), (u = d = !1);
      },
      I = () => {
        let M = o;
        E(), M?.unsubscribe();
      };
    return Ee((M, j) => {
      l++, !d && !u && m();
      let O = (c = c ?? e());
      j.add(() => {
        l--, l === 0 && !d && !u && (a = rd(I, i));
      }),
        O.subscribe(j),
        !o &&
          l > 0 &&
          ((o = new xn({
            next: (D) => O.next(D),
            error: (D) => {
              (d = !0), m(), (a = rd(E, n, D)), O.error(D);
            },
            complete: () => {
              (u = !0), m(), (a = rd(E, r)), O.complete();
            },
          })),
          qe(M).subscribe(o));
    })(s);
  };
}
function rd(t, e, ...n) {
  if (e === !0) {
    t();
    return;
  }
  if (e === !1) return;
  let r = new xn({
    next: () => {
      r.unsubscribe(), t();
    },
  });
  return qe(e(...n)).subscribe(r);
}
function HD(t, e, n) {
  let r,
    i = !1;
  return (
    t && typeof t == 'object'
      ? ({
          bufferSize: r = 1 / 0,
          windowTime: e = 1 / 0,
          refCount: i = !1,
          scheduler: n,
        } = t)
      : (r = t ?? 1 / 0),
    id({
      connector: () => new ja(r, e, n),
      resetOnError: !0,
      resetOnComplete: !1,
      resetOnRefCountZero: i,
    })
  );
}
function BD(t) {
  return mt((e, n) => t <= n);
}
function sd(...t) {
  let e = dn(t);
  return Ee((n, r) => {
    (e ? xi(t, n, e) : xi(t, n)).subscribe(r);
  });
}
function Lt(t, e) {
  return Ee((n, r) => {
    let i = null,
      s = 0,
      o = !1,
      a = () => o && !i && r.complete();
    n.subscribe(
      be(
        r,
        (c) => {
          i?.unsubscribe();
          let l = 0,
            u = s++;
          qe(t(c, u)).subscribe(
            (i = be(
              r,
              (d) => r.next(e ? e(c, d, u, l++) : d),
              () => {
                (i = null), a();
              }
            ))
          );
        },
        () => {
          (o = !0), a();
        }
      )
    );
  });
}
function od(t) {
  return Ee((e, n) => {
    qe(t).subscribe(be(n, () => n.complete(), Rs)), !n.closed && e.subscribe(n);
  });
}
function it(t, e, n) {
  let r = me(t) || e || n ? { next: t, error: e, complete: n } : t;
  return r
    ? Ee((i, s) => {
        var o;
        (o = r.subscribe) === null || o === void 0 || o.call(r);
        let a = !0;
        i.subscribe(
          be(
            s,
            (c) => {
              var l;
              (l = r.next) === null || l === void 0 || l.call(r, c), s.next(c);
            },
            () => {
              var c;
              (a = !1),
                (c = r.complete) === null || c === void 0 || c.call(r),
                s.complete();
            },
            (c) => {
              var l;
              (a = !1),
                (l = r.error) === null || l === void 0 || l.call(r, c),
                s.error(c);
            },
            () => {
              var c, l;
              a && ((c = r.unsubscribe) === null || c === void 0 || c.call(r)),
                (l = r.finalize) === null || l === void 0 || l.call(r);
            }
          )
        );
      })
    : bt;
}
function He(t) {
  for (let e in t) if (t[e] === He) return e;
  throw Error('Could not find renamed property on target object.');
}
function oc(t, e) {
  for (let n in e) e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
}
function Dt(t) {
  if (typeof t == 'string') return t;
  if (Array.isArray(t)) return '[' + t.map(Dt).join(', ') + ']';
  if (t == null) return '' + t;
  if (t.overriddenName) return `${t.overriddenName}`;
  if (t.name) return `${t.name}`;
  let e = t.toString();
  if (e == null) return '' + e;
  let n = e.indexOf(`
`);
  return n === -1 ? e : e.substring(0, n);
}
function Td(t, e) {
  return t == null || t === ''
    ? e === null
      ? ''
      : e
    : e == null || e === ''
    ? t
    : t + ' ' + e;
}
var VD = He({ __forward_ref__: He });
function fy(t) {
  return (
    (t.__forward_ref__ = fy),
    (t.toString = function () {
      return Dt(this());
    }),
    t
  );
}
function wt(t) {
  return hy(t) ? t() : t;
}
function hy(t) {
  return (
    typeof t == 'function' && t.hasOwnProperty(VD) && t.__forward_ref__ === fy
  );
}
function py(t) {
  return t && !!t.ɵproviders;
}
var my = 'https://g.co/ng/security#xss',
  z = class extends Error {
    constructor(e, n) {
      super(Wc(e, n)), (this.code = e);
    }
  };
function Wc(t, e) {
  return `${`NG0${Math.abs(t)}`}${e ? ': ' + e : ''}`;
}
var UD = He({ ɵcmp: He }),
  $D = He({ ɵdir: He }),
  qD = He({ ɵpipe: He }),
  zD = He({ ɵmod: He }),
  wc = He({ ɵfac: He }),
  Fs = He({ __NG_ELEMENT_ID__: He }),
  Cg = He({ __NG_ENV_ID__: He });
function io(t) {
  return typeof t == 'string' ? t : t == null ? '' : String(t);
}
function GD(t) {
  return typeof t == 'function'
    ? t.name || t.toString()
    : typeof t == 'object' && t != null && typeof t.type == 'function'
    ? t.type.name || t.type.toString()
    : io(t);
}
function WD(t, e) {
  let n = e ? `. Dependency path: ${e.join(' > ')} > ${t}` : '';
  throw new z(-200, `Circular dependency in DI detected for ${t}${n}`);
}
function jf(t, e) {
  let n = e ? ` in ${e}` : '';
  throw new z(-201, !1);
}
function KD(t, e) {
  t == null && QD(e, t, null, '!=');
}
function QD(t, e, n, r) {
  throw new Error(
    `ASSERTION ERROR: ${t}` +
      (r == null ? '' : ` [Expected=> ${n} ${r} ${e} <=Actual]`)
  );
}
function J(t) {
  return {
    token: t.token,
    providedIn: t.providedIn || null,
    factory: t.factory,
    value: void 0,
  };
}
function yr(t) {
  return { providers: t.providers || [], imports: t.imports || [] };
}
function Kc(t) {
  return Ig(t, yy) || Ig(t, vy);
}
function gy(t) {
  return Kc(t) !== null;
}
function Ig(t, e) {
  return t.hasOwnProperty(e) ? t[e] : null;
}
function YD(t) {
  let e = t && (t[yy] || t[vy]);
  return e || null;
}
function Mg(t) {
  return t && (t.hasOwnProperty(Ng) || t.hasOwnProperty(ZD)) ? t[Ng] : null;
}
var yy = He({ ɵprov: He }),
  Ng = He({ ɵinj: He }),
  vy = He({ ngInjectableDef: He }),
  ZD = He({ ngInjectorDef: He }),
  De = (function (t) {
    return (
      (t[(t.Default = 0)] = 'Default'),
      (t[(t.Host = 1)] = 'Host'),
      (t[(t.Self = 2)] = 'Self'),
      (t[(t.SkipSelf = 4)] = 'SkipSelf'),
      (t[(t.Optional = 8)] = 'Optional'),
      t
    );
  })(De || {}),
  Sd;
function Ey() {
  return Sd;
}
function zt(t) {
  let e = Sd;
  return (Sd = t), e;
}
function by(t, e, n) {
  let r = Kc(t);
  if (r && r.providedIn == 'root')
    return r.value === void 0 ? (r.value = r.factory()) : r.value;
  if (n & De.Optional) return null;
  if (e !== void 0) return e;
  jf(Dt(t), 'Injector');
}
var fr = globalThis;
var le = class {
  constructor(e, n) {
    (this._desc = e),
      (this.ngMetadataName = 'InjectionToken'),
      (this.ɵprov = void 0),
      typeof n == 'number'
        ? (this.__NG_ELEMENT_ID__ = n)
        : n !== void 0 &&
          (this.ɵprov = J({
            token: this,
            providedIn: n.providedIn || 'root',
            factory: n.factory,
          }));
  }
  get multi() {
    return this;
  }
  toString() {
    return `InjectionToken ${this._desc}`;
  }
};
var XD = {},
  Bs = XD,
  Cd = '__NG_DI_FLAG__',
  _c = 'ngTempTokenPath',
  JD = 'ngTokenPath',
  eT = /\n/gm,
  tT = '\u0275',
  Ag = '__source',
  Hi;
function nT() {
  return Hi;
}
function dr(t) {
  let e = Hi;
  return (Hi = t), e;
}
function rT(t, e = De.Default) {
  if (Hi === void 0) throw new z(-203, !1);
  return Hi === null
    ? by(t, void 0, e)
    : Hi.get(t, e & De.Optional ? null : void 0, e);
}
function X(t, e = De.Default) {
  return (Ey() || rT)(wt(t), e);
}
function W(t, e = De.Default) {
  return X(t, Qc(e));
}
function Qc(t) {
  return typeof t > 'u' || typeof t == 'number'
    ? t
    : 0 | (t.optional && 8) | (t.host && 1) | (t.self && 2) | (t.skipSelf && 4);
}
function Id(t) {
  let e = [];
  for (let n = 0; n < t.length; n++) {
    let r = wt(t[n]);
    if (Array.isArray(r)) {
      if (r.length === 0) throw new z(900, !1);
      let i,
        s = De.Default;
      for (let o = 0; o < r.length; o++) {
        let a = r[o],
          c = iT(a);
        typeof c == 'number' ? (c === -1 ? (i = a.token) : (s |= c)) : (i = a);
      }
      e.push(X(i, s));
    } else e.push(X(r));
  }
  return e;
}
function wy(t, e) {
  return (t[Cd] = e), (t.prototype[Cd] = e), t;
}
function iT(t) {
  return t[Cd];
}
function sT(t, e, n, r) {
  let i = t[_c];
  throw (
    (e[Ag] && i.unshift(e[Ag]),
    (t.message = oT(
      `
` + t.message,
      i,
      n,
      r
    )),
    (t[JD] = i),
    (t[_c] = null),
    t)
  );
}
function oT(t, e, n, r = null) {
  t =
    t &&
    t.charAt(0) ===
      `
` &&
    t.charAt(1) == tT
      ? t.slice(2)
      : t;
  let i = Dt(e);
  if (Array.isArray(e)) i = e.map(Dt).join(' -> ');
  else if (typeof e == 'object') {
    let s = [];
    for (let o in e)
      if (e.hasOwnProperty(o)) {
        let a = e[o];
        s.push(o + ':' + (typeof a == 'string' ? JSON.stringify(a) : Dt(a)));
      }
    i = `{${s.join(', ')}}`;
  }
  return `${n}${r ? '(' + r + ')' : ''}[${i}]: ${t.replace(
    eT,
    `
  `
  )}`;
}
function so(t) {
  return { toString: t }.toString();
}
var _y = (function (t) {
    return (t[(t.OnPush = 0)] = 'OnPush'), (t[(t.Default = 1)] = 'Default'), t;
  })(_y || {}),
  tn = (function (t) {
    return (
      (t[(t.Emulated = 0)] = 'Emulated'),
      (t[(t.None = 2)] = 'None'),
      (t[(t.ShadowDom = 3)] = 'ShadowDom'),
      t
    );
  })(tn || {}),
  Vi = {},
  _t = [];
function Dy(t, e, n) {
  let r = t.length;
  for (;;) {
    let i = t.indexOf(e, n);
    if (i === -1) return i;
    if (i === 0 || t.charCodeAt(i - 1) <= 32) {
      let s = e.length;
      if (i + s === r || t.charCodeAt(i + s) <= 32) return i;
    }
    n = i + 1;
  }
}
function Md(t, e, n) {
  let r = 0;
  for (; r < n.length; ) {
    let i = n[r];
    if (typeof i == 'number') {
      if (i !== 0) break;
      r++;
      let s = n[r++],
        o = n[r++],
        a = n[r++];
      t.setAttribute(e, o, a, s);
    } else {
      let s = i,
        o = n[++r];
      aT(s) ? t.setProperty(e, s, o) : t.setAttribute(e, s, o), r++;
    }
  }
  return r;
}
function Ty(t) {
  return t === 3 || t === 4 || t === 6;
}
function aT(t) {
  return t.charCodeAt(0) === 64;
}
function Vs(t, e) {
  if (!(e === null || e.length === 0))
    if (t === null || t.length === 0) t = e.slice();
    else {
      let n = -1;
      for (let r = 0; r < e.length; r++) {
        let i = e[r];
        typeof i == 'number'
          ? (n = i)
          : n === 0 ||
            (n === -1 || n === 2
              ? xg(t, n, i, null, e[++r])
              : xg(t, n, i, null, null));
      }
    }
  return t;
}
function xg(t, e, n, r, i) {
  let s = 0,
    o = t.length;
  if (e === -1) o = -1;
  else
    for (; s < t.length; ) {
      let a = t[s++];
      if (typeof a == 'number') {
        if (a === e) {
          o = -1;
          break;
        } else if (a > e) {
          o = s - 1;
          break;
        }
      }
    }
  for (; s < t.length; ) {
    let a = t[s];
    if (typeof a == 'number') break;
    if (a === n) {
      if (r === null) {
        i !== null && (t[s + 1] = i);
        return;
      } else if (r === t[s + 1]) {
        t[s + 2] = i;
        return;
      }
    }
    s++, r !== null && s++, i !== null && s++;
  }
  o !== -1 && (t.splice(o, 0, e), (s = o + 1)),
    t.splice(s++, 0, n),
    r !== null && t.splice(s++, 0, r),
    i !== null && t.splice(s++, 0, i);
}
var Sy = 'ng-template';
function cT(t, e, n) {
  let r = 0,
    i = !0;
  for (; r < t.length; ) {
    let s = t[r++];
    if (typeof s == 'string' && i) {
      let o = t[r++];
      if (n && s === 'class' && Dy(o.toLowerCase(), e, 0) !== -1) return !0;
    } else if (s === 1) {
      for (; r < t.length && typeof (s = t[r++]) == 'string'; )
        if (s.toLowerCase() === e) return !0;
      return !1;
    } else typeof s == 'number' && (i = !1);
  }
  return !1;
}
function Cy(t) {
  return t.type === 4 && t.value !== Sy;
}
function lT(t, e, n) {
  let r = t.type === 4 && !n ? Sy : t.value;
  return e === r;
}
function uT(t, e, n) {
  let r = 4,
    i = t.attrs || [],
    s = hT(i),
    o = !1;
  for (let a = 0; a < e.length; a++) {
    let c = e[a];
    if (typeof c == 'number') {
      if (!o && !Xt(r) && !Xt(c)) return !1;
      if (o && Xt(c)) continue;
      (o = !1), (r = c | (r & 1));
      continue;
    }
    if (!o)
      if (r & 4) {
        if (
          ((r = 2 | (r & 1)),
          (c !== '' && !lT(t, c, n)) || (c === '' && e.length === 1))
        ) {
          if (Xt(r)) return !1;
          o = !0;
        }
      } else {
        let l = r & 8 ? c : e[++a];
        if (r & 8 && t.attrs !== null) {
          if (!cT(t.attrs, l, n)) {
            if (Xt(r)) return !1;
            o = !0;
          }
          continue;
        }
        let u = r & 8 ? 'class' : c,
          d = dT(u, i, Cy(t), n);
        if (d === -1) {
          if (Xt(r)) return !1;
          o = !0;
          continue;
        }
        if (l !== '') {
          let m;
          d > s ? (m = '') : (m = i[d + 1].toLowerCase());
          let E = r & 8 ? m : null;
          if ((E && Dy(E, l, 0) !== -1) || (r & 2 && l !== m)) {
            if (Xt(r)) return !1;
            o = !0;
          }
        }
      }
  }
  return Xt(r) || o;
}
function Xt(t) {
  return (t & 1) === 0;
}
function dT(t, e, n, r) {
  if (e === null) return -1;
  let i = 0;
  if (r || !n) {
    let s = !1;
    for (; i < e.length; ) {
      let o = e[i];
      if (o === t) return i;
      if (o === 3 || o === 6) s = !0;
      else if (o === 1 || o === 2) {
        let a = e[++i];
        for (; typeof a == 'string'; ) a = e[++i];
        continue;
      } else {
        if (o === 4) break;
        if (o === 0) {
          i += 4;
          continue;
        }
      }
      i += s ? 1 : 2;
    }
    return -1;
  } else return pT(e, t);
}
function Iy(t, e, n = !1) {
  for (let r = 0; r < e.length; r++) if (uT(t, e[r], n)) return !0;
  return !1;
}
function fT(t) {
  let e = t.attrs;
  if (e != null) {
    let n = e.indexOf(5);
    if (!(n & 1)) return e[n + 1];
  }
  return null;
}
function hT(t) {
  for (let e = 0; e < t.length; e++) {
    let n = t[e];
    if (Ty(n)) return e;
  }
  return t.length;
}
function pT(t, e) {
  let n = t.indexOf(4);
  if (n > -1)
    for (n++; n < t.length; ) {
      let r = t[n];
      if (typeof r == 'number') return -1;
      if (r === e) return n;
      n++;
    }
  return -1;
}
function mT(t, e) {
  e: for (let n = 0; n < e.length; n++) {
    let r = e[n];
    if (t.length === r.length) {
      for (let i = 0; i < t.length; i++) if (t[i] !== r[i]) continue e;
      return !0;
    }
  }
  return !1;
}
function Rg(t, e) {
  return t ? ':not(' + e.trim() + ')' : e;
}
function gT(t) {
  let e = t[0],
    n = 1,
    r = 2,
    i = '',
    s = !1;
  for (; n < t.length; ) {
    let o = t[n];
    if (typeof o == 'string')
      if (r & 2) {
        let a = t[++n];
        i += '[' + o + (a.length > 0 ? '="' + a + '"' : '') + ']';
      } else r & 8 ? (i += '.' + o) : r & 4 && (i += ' ' + o);
    else
      i !== '' && !Xt(o) && ((e += Rg(s, i)), (i = '')),
        (r = o),
        (s = s || !Xt(r));
    n++;
  }
  return i !== '' && (e += Rg(s, i)), e;
}
function yT(t) {
  return t.map(gT).join(',');
}
function vT(t) {
  let e = [],
    n = [],
    r = 1,
    i = 2;
  for (; r < t.length; ) {
    let s = t[r];
    if (typeof s == 'string')
      i === 2 ? s !== '' && e.push(s, t[++r]) : i === 8 && n.push(s);
    else {
      if (!Xt(i)) break;
      i = s;
    }
    r++;
  }
  return { attrs: e, classes: n };
}
function My(t) {
  return so(() => {
    let e = Oy(t),
      n = nt(te({}, e), {
        decls: t.decls,
        vars: t.vars,
        template: t.template,
        consts: t.consts || null,
        ngContentSelectors: t.ngContentSelectors,
        onPush: t.changeDetection === _y.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (e.standalone && t.dependencies) || null,
        getStandaloneInjector: null,
        signals: t.signals ?? !1,
        data: t.data || {},
        encapsulation: t.encapsulation || tn.Emulated,
        styles: t.styles || _t,
        _: null,
        schemas: t.schemas || null,
        tView: null,
        id: '',
      });
    ky(n);
    let r = t.dependencies;
    return (
      (n.directiveDefs = kg(r, !1)), (n.pipeDefs = kg(r, !0)), (n.id = wT(n)), n
    );
  });
}
function ET(t) {
  return Ln(t) || Ny(t);
}
function bT(t) {
  return t !== null;
}
function vr(t) {
  return so(() => ({
    type: t.type,
    bootstrap: t.bootstrap || _t,
    declarations: t.declarations || _t,
    imports: t.imports || _t,
    exports: t.exports || _t,
    transitiveCompileScopes: null,
    schemas: t.schemas || null,
    id: t.id || null,
  }));
}
function Og(t, e) {
  if (t == null) return Vi;
  let n = {};
  for (let r in t)
    if (t.hasOwnProperty(r)) {
      let i = t[r],
        s = i;
      Array.isArray(i) && ((s = i[1]), (i = i[0])), (n[i] = r), e && (e[i] = s);
    }
  return n;
}
function Yc(t) {
  return so(() => {
    let e = Oy(t);
    return ky(e), e;
  });
}
function Ln(t) {
  return t[UD] || null;
}
function Ny(t) {
  return t[$D] || null;
}
function Ay(t) {
  return t[qD] || null;
}
function xy(t) {
  let e = Ln(t) || Ny(t) || Ay(t);
  return e !== null ? e.standalone : !1;
}
function Ry(t, e) {
  let n = t[zD] || null;
  if (!n && e === !0)
    throw new Error(`Type ${Dt(t)} does not have '\u0275mod' property.`);
  return n;
}
function Oy(t) {
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
    inputConfig: t.inputs || Vi,
    exportAs: t.exportAs || null,
    standalone: t.standalone === !0,
    signals: t.signals === !0,
    selectors: t.selectors || _t,
    viewQuery: t.viewQuery || null,
    features: t.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: Og(t.inputs, e),
    outputs: Og(t.outputs),
    debugInfo: null,
  };
}
function ky(t) {
  t.features?.forEach((e) => e(t));
}
function kg(t, e) {
  if (!t) return null;
  let n = e ? Ay : ET;
  return () => (typeof t == 'function' ? t() : t).map((r) => n(r)).filter(bT);
}
function wT(t) {
  let e = 0,
    n = [
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
  for (let i of n) e = (Math.imul(31, e) + i.charCodeAt(0)) << 0;
  return (e += 2147483647 + 1), 'c' + e;
}
var et = 0,
  fe = 1,
  de = 2,
  Ze = 3,
  en = 4,
  Pt = 5,
  nn = 6,
  Us = 7,
  ft = 8,
  Ui = 9,
  Pn = 10,
  Be = 11,
  $s = 12,
  Lg = 13,
  Zi = 14,
  Tt = 15,
  oo = 16,
  ki = 17,
  pn = 18,
  Zc = 19,
  Ly = 20,
  hr = 21,
  ad = 22,
  Qr = 23,
  Ge = 25,
  Hf = 1,
  qs = 6,
  Fn = 7,
  Dc = 8,
  $i = 9,
  ct = 10,
  qi = (function (t) {
    return (
      (t[(t.None = 0)] = 'None'),
      (t[(t.HasTransplantedViews = 2)] = 'HasTransplantedViews'),
      (t[(t.HasChildViewsToRefresh = 4)] = 'HasChildViewsToRefresh'),
      t
    );
  })(qi || {});
function mn(t) {
  return Array.isArray(t) && typeof t[Hf] == 'object';
}
function St(t) {
  return Array.isArray(t) && t[Hf] === !0;
}
function Py(t) {
  return (t.flags & 4) !== 0;
}
function Xi(t) {
  return t.componentOffset > -1;
}
function Bf(t) {
  return (t.flags & 1) === 1;
}
function mr(t) {
  return !!t.template;
}
function Vf(t) {
  return (t[de] & 512) !== 0;
}
function _T(t) {
  return (t.type & 16) === 16;
}
function DT(t) {
  return (t[de] & 32) === 32;
}
function zi(t, e) {
  let n = t.hasOwnProperty(wc);
  return n ? t[wc] : null;
}
var Nd = class {
  constructor(e, n, r) {
    (this.previousValue = e), (this.currentValue = n), (this.firstChange = r);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function ao() {
  return Fy;
}
function Fy(t) {
  return t.type.prototype.ngOnChanges && (t.setInput = ST), TT;
}
ao.ngInherit = !0;
function TT() {
  let t = Hy(this),
    e = t?.current;
  if (e) {
    let n = t.previous;
    if (n === Vi) t.previous = e;
    else for (let r in e) n[r] = e[r];
    (t.current = null), this.ngOnChanges(e);
  }
}
function ST(t, e, n, r) {
  let i = this.declaredInputs[n],
    s = Hy(t) || CT(t, { previous: Vi, current: null }),
    o = s.current || (s.current = {}),
    a = s.previous,
    c = a[i];
  (o[i] = new Nd(c && c.currentValue, e, a === Vi)), (t[r] = e);
}
var jy = '__ngSimpleChanges__';
function Hy(t) {
  return t[jy] || null;
}
function CT(t, e) {
  return (t[jy] = e);
}
var Pg = null;
var fn = function (t, e, n) {
    Pg?.(t, e, n);
  },
  By = 'svg',
  IT = 'math',
  MT = !1;
function NT() {
  return MT;
}
function ot(t) {
  for (; Array.isArray(t); ) t = t[et];
  return t;
}
function Vy(t) {
  for (; Array.isArray(t); ) {
    if (typeof t[Hf] == 'object') return t;
    t = t[et];
  }
  return null;
}
function Uy(t, e) {
  return ot(e[t]);
}
function Ft(t, e) {
  return ot(e[t.index]);
}
function Uf(t, e) {
  return t.data[e];
}
function AT(t, e) {
  return t[e];
}
function Er(t, e) {
  let n = e[t];
  return mn(n) ? n : n[et];
}
function xT(t) {
  return (t[de] & 4) === 4;
}
function $f(t) {
  return (t[de] & 128) === 128;
}
function RT(t) {
  return St(t[Ze]);
}
function Tc(t, e) {
  return e == null ? null : t[e];
}
function $y(t) {
  t[ki] = 0;
}
function OT(t) {
  t[de] & 1024 || ((t[de] |= 1024), $f(t) && zs(t));
}
function kT(t, e) {
  for (; t > 0; ) (e = e[Zi]), t--;
  return e;
}
function qy(t) {
  return t[de] & 9216 || t[Qr]?.dirty;
}
function Ad(t) {
  qy(t)
    ? zs(t)
    : t[de] & 64 &&
      (NT()
        ? ((t[de] |= 1024), zs(t))
        : t[Pn].changeDetectionScheduler?.notify());
}
function zs(t) {
  t[Pn].changeDetectionScheduler?.notify();
  let e = t[Ze];
  for (
    ;
    e !== null &&
    !((St(e) && e[de] & qi.HasChildViewsToRefresh) || (mn(e) && e[de] & 8192));

  ) {
    if (St(e)) e[de] |= qi.HasChildViewsToRefresh;
    else if (((e[de] |= 8192), !$f(e))) break;
    e = e[Ze];
  }
}
function zy(t, e) {
  if ((t[de] & 256) === 256) throw new z(911, !1);
  t[hr] === null && (t[hr] = []), t[hr].push(e);
}
function LT(t, e) {
  if (t[hr] === null) return;
  let n = t[hr].indexOf(e);
  n !== -1 && t[hr].splice(n, 1);
}
var ye = {
  lFrame: ev(null),
  bindingsEnabled: !0,
  skipHydrationRootTNode: null,
};
function PT() {
  return ye.lFrame.elementDepthCount;
}
function FT() {
  ye.lFrame.elementDepthCount++;
}
function jT() {
  ye.lFrame.elementDepthCount--;
}
function Gy() {
  return ye.bindingsEnabled;
}
function Ji() {
  return ye.skipHydrationRootTNode !== null;
}
function HT(t) {
  return ye.skipHydrationRootTNode === t;
}
function BT(t) {
  ye.skipHydrationRootTNode = t;
}
function VT() {
  ye.skipHydrationRootTNode = null;
}
function Me() {
  return ye.lFrame.lView;
}
function ht() {
  return ye.lFrame.tView;
}
function K5(t) {
  return (ye.lFrame.contextLView = t), t[ft];
}
function Q5(t) {
  return (ye.lFrame.contextLView = null), t;
}
function Ot() {
  let t = Wy();
  for (; t !== null && t.type === 64; ) t = t.parent;
  return t;
}
function Wy() {
  return ye.lFrame.currentTNode;
}
function UT() {
  let t = ye.lFrame,
    e = t.currentTNode;
  return t.isParent ? e : e.parent;
}
function co(t, e) {
  let n = ye.lFrame;
  (n.currentTNode = t), (n.isParent = e);
}
function Ky() {
  return ye.lFrame.isParent;
}
function Qy() {
  ye.lFrame.isParent = !1;
}
function $T() {
  return ye.lFrame.contextLView;
}
function qT(t) {
  return (ye.lFrame.bindingIndex = t);
}
function es() {
  return ye.lFrame.bindingIndex++;
}
function Yy(t) {
  let e = ye.lFrame,
    n = e.bindingIndex;
  return (e.bindingIndex = e.bindingIndex + t), n;
}
function zT() {
  return ye.lFrame.inI18n;
}
function GT(t, e) {
  let n = ye.lFrame;
  (n.bindingIndex = n.bindingRootIndex = t), xd(e);
}
function WT() {
  return ye.lFrame.currentDirectiveIndex;
}
function xd(t) {
  ye.lFrame.currentDirectiveIndex = t;
}
function KT(t) {
  let e = ye.lFrame.currentDirectiveIndex;
  return e === -1 ? null : t[e];
}
function Zy() {
  return ye.lFrame.currentQueryIndex;
}
function qf(t) {
  ye.lFrame.currentQueryIndex = t;
}
function QT(t) {
  let e = t[fe];
  return e.type === 2 ? e.declTNode : e.type === 1 ? t[Pt] : null;
}
function Xy(t, e, n) {
  if (n & De.SkipSelf) {
    let i = e,
      s = t;
    for (; (i = i.parent), i === null && !(n & De.Host); )
      if (((i = QT(s)), i === null || ((s = s[Zi]), i.type & 10))) break;
    if (i === null) return !1;
    (e = i), (t = s);
  }
  let r = (ye.lFrame = Jy());
  return (r.currentTNode = e), (r.lView = t), !0;
}
function zf(t) {
  let e = Jy(),
    n = t[fe];
  (ye.lFrame = e),
    (e.currentTNode = n.firstChild),
    (e.lView = t),
    (e.tView = n),
    (e.contextLView = t),
    (e.bindingIndex = n.bindingStartIndex),
    (e.inI18n = !1);
}
function Jy() {
  let t = ye.lFrame,
    e = t === null ? null : t.child;
  return e === null ? ev(t) : e;
}
function ev(t) {
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
function tv() {
  let t = ye.lFrame;
  return (ye.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t;
}
var nv = tv;
function Gf() {
  let t = tv();
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
function YT(t) {
  return (ye.lFrame.contextLView = kT(t, ye.lFrame.contextLView))[ft];
}
function br() {
  return ye.lFrame.selectedIndex;
}
function Yr(t) {
  ye.lFrame.selectedIndex = t;
}
function Wf() {
  let t = ye.lFrame;
  return Uf(t.tView, t.selectedIndex);
}
function Y5() {
  ye.lFrame.currentNamespace = By;
}
function Z5() {
  ZT();
}
function ZT() {
  ye.lFrame.currentNamespace = null;
}
function rv() {
  return ye.lFrame.currentNamespace;
}
var iv = !0;
function Kf() {
  return iv;
}
function wr(t) {
  iv = t;
}
function XT(t, e, n) {
  let { ngOnChanges: r, ngOnInit: i, ngDoCheck: s } = e.type.prototype;
  if (r) {
    let o = Fy(e);
    (n.preOrderHooks ??= []).push(t, o),
      (n.preOrderCheckHooks ??= []).push(t, o);
  }
  i && (n.preOrderHooks ??= []).push(0 - t, i),
    s &&
      ((n.preOrderHooks ??= []).push(t, s),
      (n.preOrderCheckHooks ??= []).push(t, s));
}
function Qf(t, e) {
  for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
    let s = t.data[n].type.prototype,
      {
        ngAfterContentInit: o,
        ngAfterContentChecked: a,
        ngAfterViewInit: c,
        ngAfterViewChecked: l,
        ngOnDestroy: u,
      } = s;
    o && (t.contentHooks ??= []).push(-n, o),
      a &&
        ((t.contentHooks ??= []).push(n, a),
        (t.contentCheckHooks ??= []).push(n, a)),
      c && (t.viewHooks ??= []).push(-n, c),
      l &&
        ((t.viewHooks ??= []).push(n, l), (t.viewCheckHooks ??= []).push(n, l)),
      u != null && (t.destroyHooks ??= []).push(n, u);
  }
}
function pc(t, e, n) {
  sv(t, e, 3, n);
}
function mc(t, e, n, r) {
  (t[de] & 3) === n && sv(t, e, n, r);
}
function cd(t, e) {
  let n = t[de];
  (n & 3) === e && ((n &= 16383), (n += 1), (t[de] = n));
}
function sv(t, e, n, r) {
  let i = r !== void 0 ? t[ki] & 65535 : 0,
    s = r ?? -1,
    o = e.length - 1,
    a = 0;
  for (let c = i; c < o; c++)
    if (typeof e[c + 1] == 'number') {
      if (((a = e[c]), r != null && a >= r)) break;
    } else
      e[c] < 0 && (t[ki] += 65536),
        (a < s || s == -1) &&
          (JT(t, n, e, c), (t[ki] = (t[ki] & 4294901760) + c + 2)),
        c++;
}
function Fg(t, e) {
  fn(4, t, e);
  let n = ut(null);
  try {
    e.call(t);
  } finally {
    ut(n), fn(5, t, e);
  }
}
function JT(t, e, n, r) {
  let i = n[r] < 0,
    s = n[r + 1],
    o = i ? -n[r] : n[r],
    a = t[o];
  i
    ? t[de] >> 14 < t[ki] >> 16 &&
      (t[de] & 3) === e &&
      ((t[de] += 16384), Fg(a, s))
    : Fg(a, s);
}
var Bi = -1,
  Zr = class {
    constructor(e, n, r) {
      (this.factory = e),
        (this.resolving = !1),
        (this.canSeeViewProviders = n),
        (this.injectImpl = r);
    }
  };
function eS(t) {
  return t instanceof Zr;
}
function tS(t) {
  return (
    t != null &&
    typeof t == 'object' &&
    (t.insertBeforeIndex === null ||
      typeof t.insertBeforeIndex == 'number' ||
      Array.isArray(t.insertBeforeIndex))
  );
}
function nS(t) {
  return (t.flags & 8) !== 0;
}
function rS(t) {
  return (t.flags & 16) !== 0;
}
function ov(t) {
  return t !== Bi;
}
function Sc(t) {
  let e = t & 32767;
  return t & 32767;
}
function iS(t) {
  return t >> 16;
}
function Cc(t, e) {
  let n = iS(t),
    r = e;
  for (; n > 0; ) (r = r[Zi]), n--;
  return r;
}
var Rd = !0;
function jg(t) {
  let e = Rd;
  return (Rd = t), e;
}
var sS = 256,
  av = sS - 1,
  cv = 5,
  oS = 0,
  hn = {};
function aS(t, e, n) {
  let r;
  typeof n == 'string'
    ? (r = n.charCodeAt(0) || 0)
    : n.hasOwnProperty(Fs) && (r = n[Fs]),
    r == null && (r = n[Fs] = oS++);
  let i = r & av,
    s = 1 << i;
  e.data[t + (i >> cv)] |= s;
}
function Ic(t, e) {
  let n = lv(t, e);
  if (n !== -1) return n;
  let r = e[fe];
  r.firstCreatePass &&
    ((t.injectorIndex = e.length),
    ld(r.data, t),
    ld(e, null),
    ld(r.blueprint, null));
  let i = Yf(t, e),
    s = t.injectorIndex;
  if (ov(i)) {
    let o = Sc(i),
      a = Cc(i, e),
      c = a[fe].data;
    for (let l = 0; l < 8; l++) e[s + l] = a[o + l] | c[o + l];
  }
  return (e[s + 8] = i), s;
}
function ld(t, e) {
  t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
}
function lv(t, e) {
  return t.injectorIndex === -1 ||
    (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
    e[t.injectorIndex + 8] === null
    ? -1
    : t.injectorIndex;
}
function Yf(t, e) {
  if (t.parent && t.parent.injectorIndex !== -1) return t.parent.injectorIndex;
  let n = 0,
    r = null,
    i = e;
  for (; i !== null; ) {
    if (((r = pv(i)), r === null)) return Bi;
    if ((n++, (i = i[Zi]), r.injectorIndex !== -1))
      return r.injectorIndex | (n << 16);
  }
  return Bi;
}
function Od(t, e, n) {
  aS(t, e, n);
}
function cS(t, e) {
  if (e === 'class') return t.classes;
  if (e === 'style') return t.styles;
  let n = t.attrs;
  if (n) {
    let r = n.length,
      i = 0;
    for (; i < r; ) {
      let s = n[i];
      if (Ty(s)) break;
      if (s === 0) i = i + 2;
      else if (typeof s == 'number')
        for (i++; i < r && typeof n[i] == 'string'; ) i++;
      else {
        if (s === e) return n[i + 1];
        i = i + 2;
      }
    }
  }
  return null;
}
function uv(t, e, n) {
  if (n & De.Optional || t !== void 0) return t;
  jf(e, 'NodeInjector');
}
function dv(t, e, n, r) {
  if (
    (n & De.Optional && r === void 0 && (r = null), !(n & (De.Self | De.Host)))
  ) {
    let i = t[Ui],
      s = zt(void 0);
    try {
      return i ? i.get(e, r, n & De.Optional) : by(e, r, n & De.Optional);
    } finally {
      zt(s);
    }
  }
  return uv(r, e, n);
}
function fv(t, e, n, r = De.Default, i) {
  if (t !== null) {
    if (e[de] & 2048 && !(r & De.Self)) {
      let o = fS(t, e, n, r, hn);
      if (o !== hn) return o;
    }
    let s = hv(t, e, n, r, hn);
    if (s !== hn) return s;
  }
  return dv(e, n, r, i);
}
function hv(t, e, n, r, i) {
  let s = uS(n);
  if (typeof s == 'function') {
    if (!Xy(e, t, r)) return r & De.Host ? uv(i, n, r) : dv(e, n, r, i);
    try {
      let o;
      if (((o = s(r)), o == null && !(r & De.Optional))) jf(n);
      else return o;
    } finally {
      nv();
    }
  } else if (typeof s == 'number') {
    let o = null,
      a = lv(t, e),
      c = Bi,
      l = r & De.Host ? e[Tt][Pt] : null;
    for (
      (a === -1 || r & De.SkipSelf) &&
      ((c = a === -1 ? Yf(t, e) : e[a + 8]),
      c === Bi || !Bg(r, !1)
        ? (a = -1)
        : ((o = e[fe]), (a = Sc(c)), (e = Cc(c, e))));
      a !== -1;

    ) {
      let u = e[fe];
      if (Hg(s, a, u.data)) {
        let d = lS(a, e, n, o, r, l);
        if (d !== hn) return d;
      }
      (c = e[a + 8]),
        c !== Bi && Bg(r, e[fe].data[a + 8] === l) && Hg(s, a, e)
          ? ((o = u), (a = Sc(c)), (e = Cc(c, e)))
          : (a = -1);
    }
  }
  return i;
}
function lS(t, e, n, r, i, s) {
  let o = e[fe],
    a = o.data[t + 8],
    c = r == null ? Xi(a) && Rd : r != o && (a.type & 3) !== 0,
    l = i & De.Host && s === a,
    u = gc(a, o, n, c, l);
  return u !== null ? Xr(e, o, u, a) : hn;
}
function gc(t, e, n, r, i) {
  let s = t.providerIndexes,
    o = e.data,
    a = s & 1048575,
    c = t.directiveStart,
    l = t.directiveEnd,
    u = s >> 20,
    d = r ? a : a + u,
    m = i ? a + u : l;
  for (let E = d; E < m; E++) {
    let I = o[E];
    if ((E < c && n === I) || (E >= c && I.type === n)) return E;
  }
  if (i) {
    let E = o[c];
    if (E && mr(E) && E.type === n) return c;
  }
  return null;
}
function Xr(t, e, n, r) {
  let i = t[n],
    s = e.data;
  if (eS(i)) {
    let o = i;
    o.resolving && WD(GD(s[n]));
    let a = jg(o.canSeeViewProviders);
    o.resolving = !0;
    let c,
      l = o.injectImpl ? zt(o.injectImpl) : null,
      u = Xy(t, r, De.Default);
    try {
      (i = t[n] = o.factory(void 0, s, t, r)),
        e.firstCreatePass && n >= r.directiveStart && XT(n, s[n], e);
    } finally {
      l !== null && zt(l), jg(a), (o.resolving = !1), nv();
    }
  }
  return i;
}
function uS(t) {
  if (typeof t == 'string') return t.charCodeAt(0) || 0;
  let e = t.hasOwnProperty(Fs) ? t[Fs] : void 0;
  return typeof e == 'number' ? (e >= 0 ? e & av : dS) : e;
}
function Hg(t, e, n) {
  let r = 1 << t;
  return !!(n[e + (t >> cv)] & r);
}
function Bg(t, e) {
  return !(t & De.Self) && !(t & De.Host && e);
}
var Kr = class {
  constructor(e, n) {
    (this._tNode = e), (this._lView = n);
  }
  get(e, n, r) {
    return fv(this._tNode, this._lView, e, Qc(r), n);
  }
};
function dS() {
  return new Kr(Ot(), Me());
}
function Zf(t) {
  return so(() => {
    let e = t.prototype.constructor,
      n = e[wc] || kd(e),
      r = Object.prototype,
      i = Object.getPrototypeOf(t.prototype).constructor;
    for (; i && i !== r; ) {
      let s = i[wc] || kd(i);
      if (s && s !== n) return s;
      i = Object.getPrototypeOf(i);
    }
    return (s) => new s();
  });
}
function kd(t) {
  return hy(t)
    ? () => {
        let e = kd(wt(t));
        return e && e();
      }
    : zi(t);
}
function fS(t, e, n, r, i) {
  let s = t,
    o = e;
  for (; s !== null && o !== null && o[de] & 2048 && !(o[de] & 512); ) {
    let a = hv(s, o, n, r | De.Self, hn);
    if (a !== hn) return a;
    let c = s.parent;
    if (!c) {
      let l = o[Ly];
      if (l) {
        let u = l.get(n, hn, r);
        if (u !== hn) return u;
      }
      (c = pv(o)), (o = o[Zi]);
    }
    s = c;
  }
  return i;
}
function pv(t) {
  let e = t[fe],
    n = e.type;
  return n === 2 ? e.declTNode : n === 1 ? t[Pt] : null;
}
function mv(t) {
  return cS(Ot(), t);
}
var ac = '__parameters__';
function hS(t) {
  return function (...n) {
    if (t) {
      let r = t(...n);
      for (let i in r) this[i] = r[i];
    }
  };
}
function gv(t, e, n) {
  return so(() => {
    let r = hS(e);
    function i(...s) {
      if (this instanceof i) return r.apply(this, s), this;
      let o = new i(...s);
      return (a.annotation = o), a;
      function a(c, l, u) {
        let d = c.hasOwnProperty(ac)
          ? c[ac]
          : Object.defineProperty(c, ac, { value: [] })[ac];
        for (; d.length <= u; ) d.push(null);
        return (d[u] = d[u] || []).push(o), c;
      }
    }
    return (
      n && (i.prototype = Object.create(n.prototype)),
      (i.prototype.ngMetadataName = t),
      (i.annotationCls = i),
      i
    );
  });
}
function pS(t) {
  let e = fr.ng;
  if (e && e.ɵcompilerFacade) return e.ɵcompilerFacade;
  throw new Error('JIT compiler unavailable');
}
function mS(t) {
  return typeof t == 'function';
}
function gS(t, e, n) {
  if (t.length !== e.length) return !1;
  for (let r = 0; r < t.length; r++) {
    let i = t[r],
      s = e[r];
    if ((n && ((i = n(i)), (s = n(s))), s !== i)) return !1;
  }
  return !0;
}
function yS(t) {
  return t.flat(Number.POSITIVE_INFINITY);
}
function Xf(t, e) {
  t.forEach((n) => (Array.isArray(n) ? Xf(n, e) : e(n)));
}
function yv(t, e, n) {
  e >= t.length ? t.push(n) : t.splice(e, 0, n);
}
function Mc(t, e) {
  return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
}
function vv(t, e) {
  let n = [];
  for (let r = 0; r < t; r++) n.push(e);
  return n;
}
function vS(t, e, n, r) {
  let i = t.length;
  if (i == e) t.push(n, r);
  else if (i === 1) t.push(r, t[0]), (t[0] = n);
  else {
    for (i--, t.push(t[i - 1], t[i]); i > e; ) {
      let s = i - 2;
      (t[i] = t[s]), i--;
    }
    (t[e] = n), (t[e + 1] = r);
  }
}
function Jf(t, e, n) {
  let r = lo(t, e);
  return r >= 0 ? (t[r | 1] = n) : ((r = ~r), vS(t, r, e, n)), r;
}
function ud(t, e) {
  let n = lo(t, e);
  if (n >= 0) return t[n | 1];
}
function lo(t, e) {
  return ES(t, e, 1);
}
function ES(t, e, n) {
  let r = 0,
    i = t.length >> n;
  for (; i !== r; ) {
    let s = r + ((i - r) >> 1),
      o = t[s << n];
    if (e === o) return s << n;
    o > e ? (i = s) : (r = s + 1);
  }
  return ~(i << n);
}
var uo = wy(gv('Optional'), 8);
var Ev = wy(gv('SkipSelf'), 4);
function bS(t) {
  let e = [],
    n = new Map();
  function r(i) {
    let s = n.get(i);
    if (!s) {
      let o = t(i);
      n.set(i, (s = o.then(TS)));
    }
    return s;
  }
  return (
    Nc.forEach((i, s) => {
      let o = [];
      i.templateUrl &&
        o.push(
          r(i.templateUrl).then((l) => {
            i.template = l;
          })
        );
      let a = typeof i.styles == 'string' ? [i.styles] : i.styles || [];
      if (((i.styles = a), i.styleUrl && i.styleUrls?.length))
        throw new Error(
          '@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple'
        );
      if (i.styleUrls?.length) {
        let l = i.styles.length,
          u = i.styleUrls;
        i.styleUrls.forEach((d, m) => {
          a.push(''),
            o.push(
              r(d).then((E) => {
                (a[l + m] = E),
                  u.splice(u.indexOf(d), 1),
                  u.length == 0 && (i.styleUrls = void 0);
              })
            );
        });
      } else
        i.styleUrl &&
          o.push(
            r(i.styleUrl).then((l) => {
              a.push(l), (i.styleUrl = void 0);
            })
          );
      let c = Promise.all(o).then(() => SS(s));
      e.push(c);
    }),
    _S(),
    Promise.all(e).then(() => {})
  );
}
var Nc = new Map(),
  wS = new Set();
function _S() {
  let t = Nc;
  return (Nc = new Map()), t;
}
function DS() {
  return Nc.size === 0;
}
function TS(t) {
  return typeof t == 'string' ? t : t.text();
}
function SS(t) {
  wS.delete(t);
}
var Jr = new le('ENVIRONMENT_INITIALIZER'),
  bv = new le('INJECTOR', -1),
  wv = new le('INJECTOR_DEF_TYPES'),
  Ac = class {
    get(e, n = Bs) {
      if (n === Bs) {
        let r = new Error(`NullInjectorError: No provider for ${Dt(e)}!`);
        throw ((r.name = 'NullInjectorError'), r);
      }
      return n;
    }
  };
function Bn(t) {
  return { ɵproviders: t };
}
function CS(...t) {
  return { ɵproviders: _v(!0, t), ɵfromNgModule: !0 };
}
function _v(t, ...e) {
  let n = [],
    r = new Set(),
    i,
    s = (o) => {
      n.push(o);
    };
  return (
    Xf(e, (o) => {
      let a = o;
      Ld(a, s, [], r) && ((i ||= []), i.push(a));
    }),
    i !== void 0 && Dv(i, s),
    n
  );
}
function Dv(t, e) {
  for (let n = 0; n < t.length; n++) {
    let { ngModule: r, providers: i } = t[n];
    eh(i, (s) => {
      e(s, r);
    });
  }
}
function Ld(t, e, n, r) {
  if (((t = wt(t)), !t)) return !1;
  let i = null,
    s = Mg(t),
    o = !s && Ln(t);
  if (!s && !o) {
    let c = t.ngModule;
    if (((s = Mg(c)), s)) i = c;
    else return !1;
  } else {
    if (o && !o.standalone) return !1;
    i = t;
  }
  let a = r.has(i);
  if (o) {
    if (a) return !1;
    if ((r.add(i), o.dependencies)) {
      let c =
        typeof o.dependencies == 'function' ? o.dependencies() : o.dependencies;
      for (let l of c) Ld(l, e, n, r);
    }
  } else if (s) {
    if (s.imports != null && !a) {
      r.add(i);
      let l;
      try {
        Xf(s.imports, (u) => {
          Ld(u, e, n, r) && ((l ||= []), l.push(u));
        });
      } finally {
      }
      l !== void 0 && Dv(l, e);
    }
    if (!a) {
      let l = zi(i) || (() => new i());
      e({ provide: i, useFactory: l, deps: _t }, i),
        e({ provide: wv, useValue: i, multi: !0 }, i),
        e({ provide: Jr, useValue: () => X(i), multi: !0 }, i);
    }
    let c = s.providers;
    if (c != null && !a) {
      let l = t;
      eh(c, (u) => {
        e(u, l);
      });
    }
  } else return !1;
  return i !== t && t.providers !== void 0;
}
function eh(t, e) {
  for (let n of t)
    py(n) && (n = n.ɵproviders), Array.isArray(n) ? eh(n, e) : e(n);
}
var IS = He({ provide: String, useValue: He });
function Tv(t) {
  return t !== null && typeof t == 'object' && IS in t;
}
function MS(t) {
  return !!(t && t.useExisting);
}
function NS(t) {
  return !!(t && t.useFactory);
}
function Gi(t) {
  return typeof t == 'function';
}
function AS(t) {
  return !!t.useClass;
}
var Xc = new le('Set Injector scope.'),
  yc = {},
  xS = {},
  dd;
function th() {
  return dd === void 0 && (dd = new Ac()), dd;
}
var Rt = class {},
  Gs = class extends Rt {
    get destroyed() {
      return this._destroyed;
    }
    constructor(e, n, r, i) {
      super(),
        (this.parent = n),
        (this.source = r),
        (this.scopes = i),
        (this.records = new Map()),
        (this._ngOnDestroyHooks = new Set()),
        (this._onDestroyHooks = []),
        (this._destroyed = !1),
        Fd(e, (o) => this.processProvider(o)),
        this.records.set(bv, Li(void 0, this)),
        i.has('environment') && this.records.set(Rt, Li(void 0, this));
      let s = this.records.get(Xc);
      s != null && typeof s.value == 'string' && this.scopes.add(s.value),
        (this.injectorDefTypes = new Set(this.get(wv, _t, De.Self)));
    }
    destroy() {
      this.assertNotDestroyed(), (this._destroyed = !0);
      try {
        for (let n of this._ngOnDestroyHooks) n.ngOnDestroy();
        let e = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let n of e) n();
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
      let n = dr(this),
        r = zt(void 0),
        i;
      try {
        return e();
      } finally {
        dr(n), zt(r);
      }
    }
    get(e, n = Bs, r = De.Default) {
      if ((this.assertNotDestroyed(), e.hasOwnProperty(Cg))) return e[Cg](this);
      r = Qc(r);
      let i,
        s = dr(this),
        o = zt(void 0);
      try {
        if (!(r & De.SkipSelf)) {
          let c = this.records.get(e);
          if (c === void 0) {
            let l = PS(e) && Kc(e);
            l && this.injectableDefInScope(l)
              ? (c = Li(Pd(e), yc))
              : (c = null),
              this.records.set(e, c);
          }
          if (c != null) return this.hydrate(e, c);
        }
        let a = r & De.Self ? th() : this.parent;
        return (n = r & De.Optional && n === Bs ? null : n), a.get(e, n);
      } catch (a) {
        if (a.name === 'NullInjectorError') {
          if (((a[_c] = a[_c] || []).unshift(Dt(e)), s)) throw a;
          return sT(a, e, 'R3InjectorError', this.source);
        } else throw a;
      } finally {
        zt(o), dr(s);
      }
    }
    resolveInjectorInitializers() {
      let e = dr(this),
        n = zt(void 0),
        r;
      try {
        let i = this.get(Jr, _t, De.Self);
        for (let s of i) s();
      } finally {
        dr(e), zt(n);
      }
    }
    toString() {
      let e = [],
        n = this.records;
      for (let r of n.keys()) e.push(Dt(r));
      return `R3Injector[${e.join(', ')}]`;
    }
    assertNotDestroyed() {
      if (this._destroyed) throw new z(205, !1);
    }
    processProvider(e) {
      e = wt(e);
      let n = Gi(e) ? e : wt(e && e.provide),
        r = OS(e);
      if (!Gi(e) && e.multi === !0) {
        let i = this.records.get(n);
        i ||
          ((i = Li(void 0, yc, !0)),
          (i.factory = () => Id(i.multi)),
          this.records.set(n, i)),
          (n = e),
          i.multi.push(e);
      } else {
        let i = this.records.get(n);
      }
      this.records.set(n, r);
    }
    hydrate(e, n) {
      return (
        n.value === yc && ((n.value = xS), (n.value = n.factory())),
        typeof n.value == 'object' &&
          n.value &&
          LS(n.value) &&
          this._ngOnDestroyHooks.add(n.value),
        n.value
      );
    }
    injectableDefInScope(e) {
      if (!e.providedIn) return !1;
      let n = wt(e.providedIn);
      return typeof n == 'string'
        ? n === 'any' || this.scopes.has(n)
        : this.injectorDefTypes.has(n);
    }
    removeOnDestroy(e) {
      let n = this._onDestroyHooks.indexOf(e);
      n !== -1 && this._onDestroyHooks.splice(n, 1);
    }
  };
function Pd(t) {
  let e = Kc(t),
    n = e !== null ? e.factory : zi(t);
  if (n !== null) return n;
  if (t instanceof le) throw new z(204, !1);
  if (t instanceof Function) return RS(t);
  throw new z(204, !1);
}
function RS(t) {
  let e = t.length;
  if (e > 0) {
    let r = vv(e, '?');
    throw new z(204, !1);
  }
  let n = YD(t);
  return n !== null ? () => n.factory(t) : () => new t();
}
function OS(t) {
  if (Tv(t)) return Li(void 0, t.useValue);
  {
    let e = Sv(t);
    return Li(e, yc);
  }
}
function Sv(t, e, n) {
  let r;
  if (Gi(t)) {
    let i = wt(t);
    return zi(i) || Pd(i);
  } else if (Tv(t)) r = () => wt(t.useValue);
  else if (NS(t)) r = () => t.useFactory(...Id(t.deps || []));
  else if (MS(t)) r = () => X(wt(t.useExisting));
  else {
    let i = wt(t && (t.useClass || t.provide));
    if (kS(t)) r = () => new i(...Id(t.deps));
    else return zi(i) || Pd(i);
  }
  return r;
}
function Li(t, e, n = !1) {
  return { factory: t, value: e, multi: n ? [] : void 0 };
}
function kS(t) {
  return !!t.deps;
}
function LS(t) {
  return (
    t !== null && typeof t == 'object' && typeof t.ngOnDestroy == 'function'
  );
}
function PS(t) {
  return typeof t == 'function' || (typeof t == 'object' && t instanceof le);
}
function Fd(t, e) {
  for (let n of t)
    Array.isArray(n) ? Fd(n, e) : n && py(n) ? Fd(n.ɵproviders, e) : e(n);
}
function Vn(t, e) {
  t instanceof Gs && t.assertNotDestroyed();
  let n,
    r = dr(t),
    i = zt(void 0);
  try {
    return e();
  } finally {
    dr(r), zt(i);
  }
}
function FS(t) {
  if (!Ey() && !nT()) throw new z(-203, !1);
}
function Vg(t, e = null, n = null, r) {
  let i = Cv(t, e, n, r);
  return i.resolveInjectorInitializers(), i;
}
function Cv(t, e = null, n = null, r, i = new Set()) {
  let s = [n || _t, CS(t)];
  return (
    (r = r || (typeof t == 'object' ? void 0 : Dt(t))),
    new Gs(s, e || th(), r || null, i)
  );
}
var Ct = (() => {
  let e = class e {
    static create(r, i) {
      if (Array.isArray(r)) return Vg({ name: '' }, i, r, '');
      {
        let s = r.name ?? '';
        return Vg({ name: s }, r.parent, r.providers, s);
      }
    }
  };
  (e.THROW_IF_NOT_FOUND = Bs),
    (e.NULL = new Ac()),
    (e.ɵprov = J({ token: e, providedIn: 'any', factory: () => X(bv) })),
    (e.__NG_ELEMENT_ID__ = -1);
  let t = e;
  return t;
})();
var jd;
function Jc(t) {
  jd = t;
}
function el() {
  if (jd !== void 0) return jd;
  if (typeof document < 'u') return document;
  throw new z(210, !1);
}
var ts = new le('AppId', { providedIn: 'root', factory: () => jS }),
  jS = 'ng',
  fo = new le('Platform Initializer'),
  sn = new le('Platform ID', {
    providedIn: 'platform',
    factory: () => 'unknown',
  });
var tl = new le('AnimationModuleType'),
  nh = new le('CSP nonce', {
    providedIn: 'root',
    factory: () =>
      el().body?.querySelector('[ngCspNonce]')?.getAttribute('ngCspNonce') ||
      null,
  });
function HS(t) {
  return t.ownerDocument.body;
}
function Iv(t) {
  return t instanceof Function ? t() : t;
}
function Ps(t) {
  return (t ?? W(Ct)).get(sn) === 'browser';
}
var Ws = 'ngSkipHydration',
  BS = 'ngskiphydration';
function Mv(t) {
  let e = t.mergedAttrs;
  if (e === null) return !1;
  for (let n = 0; n < e.length; n += 2) {
    let r = e[n];
    if (typeof r == 'number') return !1;
    if (typeof r == 'string' && r.toLowerCase() === BS) return !0;
  }
  return !1;
}
function Nv(t) {
  return t.hasAttribute(Ws);
}
function xc(t) {
  return (t.flags & 128) === 128;
}
function Rc(t) {
  if (xc(t)) return !0;
  let e = t.parent;
  for (; e; ) {
    if (xc(t) || Mv(e)) return !0;
    e = e.parent;
  }
  return !1;
}
var jn = (function (t) {
    return (
      (t[(t.Important = 1)] = 'Important'),
      (t[(t.DashCase = 2)] = 'DashCase'),
      t
    );
  })(jn || {}),
  VS = /^>|^->|<!--|-->|--!>|<!-$/g,
  US = /(<|>)/g,
  $S = '\u200B$1\u200B';
function qS(t) {
  return t.replace(VS, (e) => e.replace(US, $S));
}
var Av = new Map(),
  zS = 0;
function GS() {
  return zS++;
}
function WS(t) {
  Av.set(t[Zc], t);
}
function KS(t) {
  Av.delete(t[Zc]);
}
var Ug = '__ngContext__';
function ei(t, e) {
  mn(e) ? ((t[Ug] = e[Zc]), WS(e)) : (t[Ug] = e);
}
var QS;
function rh(t, e) {
  return QS(t, e);
}
function ih(t) {
  let e = t[Ze];
  return St(e) ? e[Ze] : e;
}
function xv(t) {
  return Ov(t[$s]);
}
function Rv(t) {
  return Ov(t[en]);
}
function Ov(t) {
  for (; t !== null && !St(t); ) t = t[en];
  return t;
}
function Pi(t, e, n, r, i) {
  if (r != null) {
    let s,
      o = !1;
    St(r) ? (s = r) : mn(r) && ((o = !0), (r = r[et]));
    let a = ot(r);
    t === 0 && n !== null
      ? i == null
        ? Fv(e, n, a)
        : Oc(e, n, a, i || null, !0)
      : t === 1 && n !== null
      ? Oc(e, n, a, i || null, !0)
      : t === 2
      ? Bv(e, a, o)
      : t === 3 && e.destroyNode(a),
      s != null && dC(e, t, s, n, i);
  }
}
function kv(t, e) {
  return t.createText(e);
}
function YS(t, e, n) {
  t.setValue(e, n);
}
function Lv(t, e) {
  return t.createComment(qS(e));
}
function sh(t, e, n) {
  return t.createElement(e, n);
}
function ZS(t, e) {
  let n = e[Be];
  ho(t, e, n, 2, null, null), (e[et] = null), (e[Pt] = null);
}
function XS(t, e, n, r, i, s) {
  (r[et] = i), (r[Pt] = e), ho(t, r, n, 1, i, s);
}
function JS(t, e) {
  ho(t, e, e[Be], 2, null, null);
}
function eC(t) {
  let e = t[$s];
  if (!e) return fd(t[fe], t);
  for (; e; ) {
    let n = null;
    if (mn(e)) n = e[$s];
    else {
      let r = e[ct];
      r && (n = r);
    }
    if (!n) {
      for (; e && !e[en] && e !== t; ) mn(e) && fd(e[fe], e), (e = e[Ze]);
      e === null && (e = t), mn(e) && fd(e[fe], e), (n = e && e[en]);
    }
    e = n;
  }
}
function tC(t, e, n, r) {
  let i = ct + r,
    s = n.length;
  r > 0 && (n[i - 1][en] = e),
    r < s - ct
      ? ((e[en] = n[i]), yv(n, ct + r, e))
      : (n.push(e), (e[en] = null)),
    (e[Ze] = n);
  let o = e[oo];
  o !== null && n !== o && nC(o, e);
  let a = e[pn];
  a !== null && a.insertView(t), Ad(e), (e[de] |= 128);
}
function nC(t, e) {
  let n = t[$i],
    i = e[Ze][Ze][Tt];
  e[Tt] !== i && (t[de] |= qi.HasTransplantedViews),
    n === null ? (t[$i] = [e]) : n.push(e);
}
function Pv(t, e) {
  let n = t[$i],
    r = n.indexOf(e),
    i = e[Ze];
  n.splice(r, 1);
}
function Ks(t, e) {
  if (t.length <= ct) return;
  let n = ct + e,
    r = t[n];
  if (r) {
    let i = r[oo];
    i !== null && i !== t && Pv(i, r), e > 0 && (t[n - 1][en] = r[en]);
    let s = Mc(t, ct + e);
    ZS(r[fe], r);
    let o = s[pn];
    o !== null && o.detachView(s[fe]),
      (r[Ze] = null),
      (r[en] = null),
      (r[de] &= -129);
  }
  return r;
}
function nl(t, e) {
  if (!(e[de] & 256)) {
    let n = e[Be];
    n.destroyNode && ho(t, e, n, 3, null, null), eC(e);
  }
}
function fd(t, e) {
  if (!(e[de] & 256)) {
    (e[de] &= -129),
      (e[de] |= 256),
      e[Qr] && Jm(e[Qr]),
      iC(t, e),
      rC(t, e),
      e[fe].type === 1 && e[Be].destroy();
    let n = e[oo];
    if (n !== null && St(e[Ze])) {
      n !== e[Ze] && Pv(n, e);
      let r = e[pn];
      r !== null && r.detachView(t);
    }
    KS(e);
  }
}
function rC(t, e) {
  let n = t.cleanup,
    r = e[Us];
  if (n !== null)
    for (let s = 0; s < n.length - 1; s += 2)
      if (typeof n[s] == 'string') {
        let o = n[s + 3];
        o >= 0 ? r[o]() : r[-o].unsubscribe(), (s += 2);
      } else {
        let o = r[n[s + 1]];
        n[s].call(o);
      }
  r !== null && (e[Us] = null);
  let i = e[hr];
  if (i !== null) {
    e[hr] = null;
    for (let s = 0; s < i.length; s++) {
      let o = i[s];
      o();
    }
  }
}
function iC(t, e) {
  let n;
  if (t != null && (n = t.destroyHooks) != null)
    for (let r = 0; r < n.length; r += 2) {
      let i = e[n[r]];
      if (!(i instanceof Zr)) {
        let s = n[r + 1];
        if (Array.isArray(s))
          for (let o = 0; o < s.length; o += 2) {
            let a = i[s[o]],
              c = s[o + 1];
            fn(4, a, c);
            try {
              c.call(a);
            } finally {
              fn(5, a, c);
            }
          }
        else {
          fn(4, i, s);
          try {
            s.call(i);
          } finally {
            fn(5, i, s);
          }
        }
      }
    }
}
function oh(t, e, n) {
  return sC(t, e.parent, n);
}
function sC(t, e, n) {
  let r = e;
  for (; r !== null && r.type & 40; ) (e = r), (r = e.parent);
  if (r === null) return n[et];
  {
    let { componentOffset: i } = r;
    if (i > -1) {
      let { encapsulation: s } = t.data[r.directiveStart + i];
      if (s === tn.None || s === tn.Emulated) return null;
    }
    return Ft(r, n);
  }
}
function Oc(t, e, n, r, i) {
  t.insertBefore(e, n, r, i);
}
function Fv(t, e, n) {
  t.appendChild(e, n);
}
function $g(t, e, n, r, i) {
  r !== null ? Oc(t, e, n, r, i) : Fv(t, e, n);
}
function oC(t, e, n, r) {
  t.removeChild(e, n, r);
}
function ah(t, e) {
  return t.parentNode(e);
}
function aC(t, e) {
  return t.nextSibling(e);
}
function jv(t, e, n) {
  return lC(t, e, n);
}
function cC(t, e, n) {
  return t.type & 40 ? Ft(t, n) : null;
}
var lC = cC,
  qg;
function ch(t, e, n, r) {
  let i = oh(t, r, e),
    s = e[Be],
    o = r.parent || e[Pt],
    a = jv(o, r, e);
  if (i != null)
    if (Array.isArray(n))
      for (let c = 0; c < n.length; c++) $g(s, i, n[c], a, !1);
    else $g(s, i, n, a, !1);
  qg !== void 0 && qg(s, r, e, n, i);
}
function js(t, e) {
  if (e !== null) {
    let n = e.type;
    if (n & 3) return Ft(e, t);
    if (n & 4) return Hd(-1, t[e.index]);
    if (n & 8) {
      let r = e.child;
      if (r !== null) return js(t, r);
      {
        let i = t[e.index];
        return St(i) ? Hd(-1, i) : ot(i);
      }
    } else {
      if (n & 32) return rh(e, t)() || ot(t[e.index]);
      {
        let r = Hv(t, e);
        if (r !== null) {
          if (Array.isArray(r)) return r[0];
          let i = ih(t[Tt]);
          return js(i, r);
        } else return js(t, e.next);
      }
    }
  }
  return null;
}
function Hv(t, e) {
  if (e !== null) {
    let r = t[Tt][Pt],
      i = e.projection;
    return r.projection[i];
  }
  return null;
}
function Hd(t, e) {
  let n = ct + t + 1;
  if (n < e.length) {
    let r = e[n],
      i = r[fe].firstChild;
    if (i !== null) return js(r, i);
  }
  return e[Fn];
}
function Bv(t, e, n) {
  let r = ah(t, e);
  r && oC(t, r, e, n);
}
function Vv(t) {
  t.textContent = '';
}
function lh(t, e, n, r, i, s, o) {
  for (; n != null; ) {
    let a = r[n.index],
      c = n.type;
    if (
      (o && e === 0 && (a && ei(ot(a), r), (n.flags |= 2)),
      (n.flags & 32) !== 32)
    )
      if (c & 8) lh(t, e, n.child, r, i, s, !1), Pi(e, t, i, a, s);
      else if (c & 32) {
        let l = rh(n, r),
          u;
        for (; (u = l()); ) Pi(e, t, i, u, s);
        Pi(e, t, i, a, s);
      } else c & 16 ? Uv(t, e, r, n, i, s) : Pi(e, t, i, a, s);
    n = o ? n.projectionNext : n.next;
  }
}
function ho(t, e, n, r, i, s) {
  lh(n, r, t.firstChild, e, i, s, !1);
}
function uC(t, e, n) {
  let r = e[Be],
    i = oh(t, n, e),
    s = n.parent || e[Pt],
    o = jv(s, n, e);
  Uv(r, 0, e, n, i, o);
}
function Uv(t, e, n, r, i, s) {
  let o = n[Tt],
    c = o[Pt].projection[r.projection];
  if (Array.isArray(c))
    for (let l = 0; l < c.length; l++) {
      let u = c[l];
      Pi(e, t, i, u, s);
    }
  else {
    let l = c,
      u = o[Ze];
    xc(r) && (l.flags |= 128), lh(t, e, l, u, i, s, !0);
  }
}
function dC(t, e, n, r, i) {
  let s = n[Fn],
    o = ot(n);
  s !== o && Pi(e, t, r, s, i);
  for (let a = ct; a < n.length; a++) {
    let c = n[a];
    ho(c[fe], c, t, e, r, s);
  }
}
function fC(t, e, n, r, i) {
  if (e) i ? t.addClass(n, r) : t.removeClass(n, r);
  else {
    let s = r.indexOf('-') === -1 ? void 0 : jn.DashCase;
    i == null
      ? t.removeStyle(n, r, s)
      : (typeof i == 'string' &&
          i.endsWith('!important') &&
          ((i = i.slice(0, -10)), (s |= jn.Important)),
        t.setStyle(n, r, i, s));
  }
}
function hC(t, e, n) {
  t.setAttribute(e, 'style', n);
}
function $v(t, e, n) {
  n === '' ? t.removeAttribute(e, 'class') : t.setAttribute(e, 'class', n);
}
function qv(t, e, n) {
  let { mergedAttrs: r, classes: i, styles: s } = n;
  r !== null && Md(t, e, r),
    i !== null && $v(t, e, i),
    s !== null && hC(t, e, s);
}
var cc;
function pC() {
  if (cc === void 0 && ((cc = null), fr.trustedTypes))
    try {
      cc = fr.trustedTypes.createPolicy('angular', {
        createHTML: (t) => t,
        createScript: (t) => t,
        createScriptURL: (t) => t,
      });
    } catch {}
  return cc;
}
function rl(t) {
  return pC()?.createHTML(t) || t;
}
var Hn = class {
    constructor(e) {
      this.changingThisBreaksApplicationSecurity = e;
    }
    toString() {
      return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${my})`;
    }
  },
  Bd = class extends Hn {
    getTypeName() {
      return 'HTML';
    }
  },
  Vd = class extends Hn {
    getTypeName() {
      return 'Style';
    }
  },
  Ud = class extends Hn {
    getTypeName() {
      return 'Script';
    }
  },
  $d = class extends Hn {
    getTypeName() {
      return 'URL';
    }
  },
  qd = class extends Hn {
    getTypeName() {
      return 'ResourceURL';
    }
  };
function gn(t) {
  return t instanceof Hn ? t.changingThisBreaksApplicationSecurity : t;
}
function ii(t, e) {
  let n = mC(t);
  if (n != null && n !== e) {
    if (n === 'ResourceURL' && e === 'URL') return !0;
    throw new Error(`Required a safe ${e}, got a ${n} (see ${my})`);
  }
  return n === e;
}
function mC(t) {
  return (t instanceof Hn && t.getTypeName()) || null;
}
function zv(t) {
  return new Bd(t);
}
function Gv(t) {
  return new Vd(t);
}
function Wv(t) {
  return new Ud(t);
}
function Kv(t) {
  return new $d(t);
}
function Qv(t) {
  return new qd(t);
}
function gC(t) {
  let e = new Gd(t);
  return yC() ? new zd(e) : e;
}
var zd = class {
    constructor(e) {
      this.inertDocumentHelper = e;
    }
    getInertBodyElement(e) {
      e = '<body><remove></remove>' + e;
      try {
        let n = new window.DOMParser().parseFromString(rl(e), 'text/html').body;
        return n === null
          ? this.inertDocumentHelper.getInertBodyElement(e)
          : (n.removeChild(n.firstChild), n);
      } catch {
        return null;
      }
    }
  },
  Gd = class {
    constructor(e) {
      (this.defaultDoc = e),
        (this.inertDocument =
          this.defaultDoc.implementation.createHTMLDocument(
            'sanitization-inert'
          ));
    }
    getInertBodyElement(e) {
      let n = this.inertDocument.createElement('template');
      return (n.innerHTML = rl(e)), n;
    }
  };
function yC() {
  try {
    return !!new window.DOMParser().parseFromString(rl(''), 'text/html');
  } catch {
    return !1;
  }
}
var vC = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function il(t) {
  return (t = String(t)), t.match(vC) ? t : 'unsafe:' + t;
}
function Un(t) {
  let e = {};
  for (let n of t.split(',')) e[n] = !0;
  return e;
}
function po(...t) {
  let e = {};
  for (let n of t) for (let r in n) n.hasOwnProperty(r) && (e[r] = !0);
  return e;
}
var Yv = Un('area,br,col,hr,img,wbr'),
  Zv = Un('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
  Xv = Un('rp,rt'),
  EC = po(Xv, Zv),
  bC = po(
    Zv,
    Un(
      'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
    )
  ),
  wC = po(
    Xv,
    Un(
      'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
    )
  ),
  zg = po(Yv, bC, wC, EC),
  Jv = Un('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
  _C = Un(
    'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
  ),
  DC = Un(
    'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
  ),
  TC = po(Jv, _C, DC),
  SC = Un('script,style,template'),
  Wd = class {
    constructor() {
      (this.sanitizedSomething = !1), (this.buf = []);
    }
    sanitizeChildren(e) {
      let n = e.firstChild,
        r = !0;
      for (; n; ) {
        if (
          (n.nodeType === Node.ELEMENT_NODE
            ? (r = this.startElement(n))
            : n.nodeType === Node.TEXT_NODE
            ? this.chars(n.nodeValue)
            : (this.sanitizedSomething = !0),
          r && n.firstChild)
        ) {
          n = n.firstChild;
          continue;
        }
        for (; n; ) {
          n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
          let i = this.checkClobberedElement(n, n.nextSibling);
          if (i) {
            n = i;
            break;
          }
          n = this.checkClobberedElement(n, n.parentNode);
        }
      }
      return this.buf.join('');
    }
    startElement(e) {
      let n = e.nodeName.toLowerCase();
      if (!zg.hasOwnProperty(n))
        return (this.sanitizedSomething = !0), !SC.hasOwnProperty(n);
      this.buf.push('<'), this.buf.push(n);
      let r = e.attributes;
      for (let i = 0; i < r.length; i++) {
        let s = r.item(i),
          o = s.name,
          a = o.toLowerCase();
        if (!TC.hasOwnProperty(a)) {
          this.sanitizedSomething = !0;
          continue;
        }
        let c = s.value;
        Jv[a] && (c = il(c)), this.buf.push(' ', o, '="', Gg(c), '"');
      }
      return this.buf.push('>'), !0;
    }
    endElement(e) {
      let n = e.nodeName.toLowerCase();
      zg.hasOwnProperty(n) &&
        !Yv.hasOwnProperty(n) &&
        (this.buf.push('</'), this.buf.push(n), this.buf.push('>'));
    }
    chars(e) {
      this.buf.push(Gg(e));
    }
    checkClobberedElement(e, n) {
      if (
        n &&
        (e.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY) ===
          Node.DOCUMENT_POSITION_CONTAINED_BY
      )
        throw new Error(
          `Failed to sanitize html because the element is clobbered: ${e.outerHTML}`
        );
      return n;
    }
  },
  CC = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
  IC = /([^\#-~ |!])/g;
function Gg(t) {
  return t
    .replace(/&/g, '&amp;')
    .replace(CC, function (e) {
      let n = e.charCodeAt(0),
        r = e.charCodeAt(1);
      return '&#' + ((n - 55296) * 1024 + (r - 56320) + 65536) + ';';
    })
    .replace(IC, function (e) {
      return '&#' + e.charCodeAt(0) + ';';
    })
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
var lc;
function eE(t, e) {
  let n = null;
  try {
    lc = lc || gC(t);
    let r = e ? String(e) : '';
    n = lc.getInertBodyElement(r);
    let i = 5,
      s = r;
    do {
      if (i === 0)
        throw new Error(
          'Failed to sanitize html because the input is unstable'
        );
      i--, (r = s), (s = n.innerHTML), (n = lc.getInertBodyElement(r));
    } while (r !== s);
    let a = new Wd().sanitizeChildren(Wg(n) || n);
    return rl(a);
  } finally {
    if (n) {
      let r = Wg(n) || n;
      for (; r.firstChild; ) r.removeChild(r.firstChild);
    }
  }
}
function Wg(t) {
  return 'content' in t && MC(t) ? t.content : null;
}
function MC(t) {
  return t.nodeType === Node.ELEMENT_NODE && t.nodeName === 'TEMPLATE';
}
var $n = (function (t) {
  return (
    (t[(t.NONE = 0)] = 'NONE'),
    (t[(t.HTML = 1)] = 'HTML'),
    (t[(t.STYLE = 2)] = 'STYLE'),
    (t[(t.SCRIPT = 3)] = 'SCRIPT'),
    (t[(t.URL = 4)] = 'URL'),
    (t[(t.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
    t
  );
})($n || {});
function X5(t) {
  let e = NC();
  return e ? e.sanitize($n.URL, t) || '' : ii(t, 'URL') ? gn(t) : il(io(t));
}
function NC() {
  let t = Me();
  return t && t[Pn].sanitizer;
}
var Kd = class {};
function AC() {
  let t = new yn();
  return W(sn) === 'browser' && (t.store = xC(el(), W(ts))), t;
}
var yn = (() => {
  let e = class e {
    constructor() {
      (this.store = {}), (this.onSerializeCallbacks = {});
    }
    get(r, i) {
      return this.store[r] !== void 0 ? this.store[r] : i;
    }
    set(r, i) {
      this.store[r] = i;
    }
    remove(r) {
      delete this.store[r];
    }
    hasKey(r) {
      return this.store.hasOwnProperty(r);
    }
    get isEmpty() {
      return Object.keys(this.store).length === 0;
    }
    onSerialize(r, i) {
      this.onSerializeCallbacks[r] = i;
    }
    toJson() {
      for (let r in this.onSerializeCallbacks)
        if (this.onSerializeCallbacks.hasOwnProperty(r))
          try {
            this.store[r] = this.onSerializeCallbacks[r]();
          } catch (i) {
            console.warn('Exception in onSerialize callback: ', i);
          }
      return JSON.stringify(this.store).replace(/</g, '\\u003C');
    }
  };
  e.ɵprov = J({ token: e, providedIn: 'root', factory: AC });
  let t = e;
  return t;
})();
function xC(t, e) {
  let n = t.getElementById(e + '-state');
  if (n?.textContent)
    try {
      return JSON.parse(n.textContent);
    } catch (r) {
      console.warn('Exception while restoring TransferState for app ' + e, r);
    }
  return {};
}
var uh = 'h',
  dh = 'b',
  Qs = (function (t) {
    return (t.FirstChild = 'f'), (t.NextSibling = 'n'), t;
  })(Qs || {}),
  Qd = 'e',
  Yd = 't',
  Ys = 'c',
  kc = 'x',
  Wi = 'r',
  Zd = 'i',
  Xd = 'n',
  vc = 'd',
  RC = '__nghData__',
  fh = RC,
  Hs = 'ngh',
  hh = 'nghm',
  tE = (t, e, n) => null;
function OC(t, e, n = !1) {
  let r = t.getAttribute(Hs);
  if (r == null) return null;
  let [i, s] = r.split('|');
  if (((r = n ? s : i), !r)) return null;
  let o = n ? i : s ? `|${s}` : '',
    a = {};
  if (r !== '') {
    let l = e.get(yn, null, { optional: !0 });
    l !== null && (a = l.get(fh, [])[Number(r)]);
  }
  let c = { data: a, firstChild: t.firstChild ?? null };
  return (
    n && ((c.firstChild = t), sl(c, 0, t.nextSibling)),
    o ? t.setAttribute(Hs, o) : t.removeAttribute(Hs),
    c
  );
}
function kC() {
  tE = OC;
}
function ph(t, e, n = !1) {
  return tE(t, e, n);
}
function nE(t) {
  let e = t._lView;
  return e[fe].type === 2 ? null : (Vf(e) && (e = e[Ge]), e);
}
function LC(t) {
  return t.textContent?.replace(/\s/gm, '');
}
function PC(t) {
  let e = el(),
    n = e.createNodeIterator(t, NodeFilter.SHOW_COMMENT, {
      acceptNode(s) {
        let o = LC(s);
        return o === 'ngetn' || o === 'ngtns'
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    }),
    r,
    i = [];
  for (; (r = n.nextNode()); ) i.push(r);
  for (let s of i)
    s.textContent === 'ngetn'
      ? s.replaceWith(e.createTextNode(''))
      : s.remove();
}
function sl(t, e, n) {
  (t.segmentHeads ??= {}), (t.segmentHeads[e] = n);
}
function Jd(t, e) {
  return t.segmentHeads?.[e] ?? null;
}
function FC(t, e) {
  let n = t.data,
    r = n[Qd]?.[e] ?? null;
  return r === null && n[Ys]?.[e] && (r = mh(t, e)), r;
}
function rE(t, e) {
  return t.data[Ys]?.[e] ?? null;
}
function mh(t, e) {
  let n = rE(t, e) ?? [],
    r = 0;
  for (let i of n) r += i[Wi] * (i[kc] ?? 1);
  return r;
}
function ol(t, e) {
  if (typeof t.disconnectedNodes > 'u') {
    let n = t.data[vc];
    t.disconnectedNodes = n ? new Set(n) : null;
  }
  return !!t.disconnectedNodes?.has(e);
}
var ef = class {},
  Lc = class {};
function jC(t) {
  let e = Error(`No component factory found for ${Dt(t)}.`);
  return (e[HC] = t), e;
}
var HC = 'ngComponent';
var tf = class {
    resolveComponentFactory(e) {
      throw jC(e);
    }
  },
  al = (() => {
    let e = class e {};
    e.NULL = new tf();
    let t = e;
    return t;
  })();
function BC() {
  return ns(Ot(), Me());
}
function ns(t, e) {
  return new si(Ft(t, e));
}
var si = (() => {
  let e = class e {
    constructor(r) {
      this.nativeElement = r;
    }
  };
  e.__NG_ELEMENT_ID__ = BC;
  let t = e;
  return t;
})();
function VC(t) {
  return t instanceof si ? t.nativeElement : t;
}
var ti = class {},
  mo = (() => {
    let e = class e {
      constructor() {
        this.destroyNode = null;
      }
    };
    e.__NG_ELEMENT_ID__ = () => UC();
    let t = e;
    return t;
  })();
function UC() {
  let t = Me(),
    e = Ot(),
    n = Er(e.index, t);
  return (mn(n) ? n : t)[Be];
}
var $C = (() => {
    let e = class e {};
    e.ɵprov = J({ token: e, providedIn: 'root', factory: () => null });
    let t = e;
    return t;
  })(),
  hd = {};
function Zs(t, e, n, r, i = !1) {
  for (; n !== null; ) {
    let s = e[n.index];
    s !== null && r.push(ot(s)), St(s) && iE(s, r);
    let o = n.type;
    if (o & 8) Zs(t, e, n.child, r);
    else if (o & 32) {
      let a = rh(n, e),
        c;
      for (; (c = a()); ) r.push(c);
    } else if (o & 16) {
      let a = Hv(e, n);
      if (Array.isArray(a)) r.push(...a);
      else {
        let c = ih(e[Tt]);
        Zs(c[fe], c, a, r, !0);
      }
    }
    n = i ? n.projectionNext : n.next;
  }
  return r;
}
function iE(t, e) {
  for (let n = ct; n < t.length; n++) {
    let r = t[n],
      i = r[fe].firstChild;
    i !== null && Zs(r[fe], r, i, e);
  }
  t[Fn] !== t[et] && e.push(t[Fn]);
}
var sE = [];
function qC(t) {
  return t[Qr] ?? zC(t);
}
function zC(t) {
  let e = sE.pop() ?? Object.create(WC);
  return (e.lView = t), e;
}
function GC(t) {
  t.lView[Qr] !== t && ((t.lView = null), sE.push(t));
}
var WC = nt(te({}, Ym), {
    consumerIsAlwaysLive: !0,
    consumerMarkedDirty: (t) => {
      zs(t.lView);
    },
    consumerOnSignalRead() {
      this.lView[Qr] = this;
    },
  }),
  KC = 'ngOriginalError';
function pd(t) {
  return t[KC];
}
var rn = class {
    constructor() {
      this._console = console;
    }
    handleError(e) {
      let n = this._findOriginalError(e);
      this._console.error('ERROR', e),
        n && this._console.error('ORIGINAL ERROR', n);
    }
    _findOriginalError(e) {
      let n = e && pd(e);
      for (; n && pd(n); ) n = pd(n);
      return n || null;
    }
  },
  oE = new le('', {
    providedIn: 'root',
    factory: () => W(rn).handleError.bind(void 0),
  }),
  Fi = new le(''),
  aE = !1,
  cE = new le('', { providedIn: 'root', factory: () => aE });
var _r = {};
function J5(t) {
  lE(ht(), Me(), br() + t, !1);
}
function lE(t, e, n, r) {
  if (!r)
    if ((e[de] & 3) === 3) {
      let s = t.preOrderCheckHooks;
      s !== null && pc(e, s, n);
    } else {
      let s = t.preOrderHooks;
      s !== null && mc(e, s, 0, n);
    }
  Yr(n);
}
function rs(t, e = De.Default) {
  let n = Me();
  if (n === null) return X(t, e);
  let r = Ot();
  return fv(r, n, wt(t), e);
}
function uE() {
  let t = 'invalid';
  throw new Error(t);
}
function QC(t, e) {
  let n = t.hostBindingOpCodes;
  if (n !== null)
    try {
      for (let r = 0; r < n.length; r++) {
        let i = n[r];
        if (i < 0) Yr(~i);
        else {
          let s = i,
            o = n[++r],
            a = n[++r];
          GT(o, s);
          let c = e[s];
          a(2, c);
        }
      }
    } finally {
      Yr(-1);
    }
}
function cl(t, e, n, r, i, s, o, a, c, l, u) {
  let d = e.blueprint.slice();
  return (
    (d[et] = i),
    (d[de] = r | 4 | 128 | 8 | 64),
    (l !== null || (t && t[de] & 2048)) && (d[de] |= 2048),
    $y(d),
    (d[Ze] = d[Zi] = t),
    (d[ft] = n),
    (d[Pn] = o || (t && t[Pn])),
    (d[Be] = a || (t && t[Be])),
    (d[Ui] = c || (t && t[Ui]) || null),
    (d[Pt] = s),
    (d[Zc] = GS()),
    (d[nn] = u),
    (d[Ly] = l),
    (d[Tt] = e.type == 2 ? t[Tt] : d),
    d
  );
}
function go(t, e, n, r, i) {
  let s = t.data[e];
  if (s === null) (s = YC(t, e, n, r, i)), zT() && (s.flags |= 32);
  else if (s.type & 64) {
    (s.type = n), (s.value = r), (s.attrs = i);
    let o = UT();
    s.injectorIndex = o === null ? -1 : o.injectorIndex;
  }
  return co(s, !0), s;
}
function YC(t, e, n, r, i) {
  let s = Wy(),
    o = Ky(),
    a = o ? s : s && s.parent,
    c = (t.data[e] = r1(t, a, n, e, r, i));
  return (
    t.firstChild === null && (t.firstChild = c),
    s !== null &&
      (o
        ? s.child == null && c.parent !== null && (s.child = c)
        : s.next === null && ((s.next = c), (c.prev = s))),
    c
  );
}
function dE(t, e, n, r) {
  if (n === 0) return -1;
  let i = e.length;
  for (let s = 0; s < n; s++) e.push(r), t.blueprint.push(r), t.data.push(null);
  return i;
}
function fE(t, e, n, r, i) {
  let s = br(),
    o = r & 2;
  try {
    Yr(-1), o && e.length > Ge && lE(t, e, Ge, !1), fn(o ? 2 : 0, i), n(r, i);
  } finally {
    Yr(s), fn(o ? 3 : 1, i);
  }
}
function hE(t, e, n) {
  if (Py(e)) {
    let r = ut(null);
    try {
      let i = e.directiveStart,
        s = e.directiveEnd;
      for (let o = i; o < s; o++) {
        let a = t.data[o];
        a.contentQueries && a.contentQueries(1, n[o], o);
      }
    } finally {
      ut(r);
    }
  }
}
function pE(t, e, n) {
  Gy() && (l1(t, e, n, Ft(n, e)), (n.flags & 64) === 64 && wE(t, e, n));
}
function mE(t, e, n = Ft) {
  let r = e.localNames;
  if (r !== null) {
    let i = e.index + 1;
    for (let s = 0; s < r.length; s += 2) {
      let o = r[s + 1],
        a = o === -1 ? n(e, t) : t[o];
      t[i++] = a;
    }
  }
}
function gE(t) {
  let e = t.tView;
  return e === null || e.incompleteFirstPass
    ? (t.tView = gh(
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
function gh(t, e, n, r, i, s, o, a, c, l, u) {
  let d = Ge + r,
    m = d + i,
    E = ZC(d, m),
    I = typeof l == 'function' ? l() : l;
  return (E[fe] = {
    type: t,
    blueprint: E,
    template: n,
    queries: null,
    viewQuery: a,
    declTNode: e,
    data: E.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: m,
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
    directiveRegistry: typeof s == 'function' ? s() : s,
    pipeRegistry: typeof o == 'function' ? o() : o,
    firstChild: null,
    schemas: c,
    consts: I,
    incompleteFirstPass: !1,
    ssrId: u,
  });
}
function ZC(t, e) {
  let n = [];
  for (let r = 0; r < e; r++) n.push(r < t ? null : _r);
  return n;
}
function XC(t, e, n, r) {
  let s = r.get(cE, aE) || n === tn.ShadowDom,
    o = t.selectRootElement(e, s);
  return JC(o), o;
}
function JC(t) {
  yE(t);
}
var yE = (t) => null;
function e1(t) {
  Nv(t) ? Vv(t) : PC(t);
}
function t1() {
  yE = e1;
}
function n1(t, e, n, r) {
  let i = SE(e);
  i.push(n), t.firstCreatePass && CE(t).push(r, i.length - 1);
}
function r1(t, e, n, r, i, s) {
  let o = e ? e.injectorIndex : -1,
    a = 0;
  return (
    Ji() && (a |= 128),
    {
      type: n,
      index: r,
      insertBeforeIndex: null,
      injectorIndex: o,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: i,
      attrs: s,
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
function Kg(t, e, n, r) {
  for (let i in t)
    if (t.hasOwnProperty(i)) {
      n = n === null ? {} : n;
      let s = t[i];
      r === null ? Qg(n, e, i, s) : r.hasOwnProperty(i) && Qg(n, e, r[i], s);
    }
  return n;
}
function Qg(t, e, n, r) {
  t.hasOwnProperty(n) ? t[n].push(e, r) : (t[n] = [e, r]);
}
function i1(t, e, n) {
  let r = e.directiveStart,
    i = e.directiveEnd,
    s = t.data,
    o = e.attrs,
    a = [],
    c = null,
    l = null;
  for (let u = r; u < i; u++) {
    let d = s[u],
      m = n ? n.get(d) : null,
      E = m ? m.inputs : null,
      I = m ? m.outputs : null;
    (c = Kg(d.inputs, u, c, E)), (l = Kg(d.outputs, u, l, I));
    let M = c !== null && o !== null && !Cy(e) ? b1(c, u, o) : null;
    a.push(M);
  }
  c !== null &&
    (c.hasOwnProperty('class') && (e.flags |= 8),
    c.hasOwnProperty('style') && (e.flags |= 16)),
    (e.initialInputs = a),
    (e.inputs = c),
    (e.outputs = l);
}
function s1(t) {
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
function vE(t, e, n, r, i, s, o, a) {
  let c = Ft(e, n),
    l = e.inputs,
    u;
  !a && l != null && (u = l[r])
    ? (yh(t, n, u, r, i), Xi(e) && o1(n, e.index))
    : e.type & 3
    ? ((r = s1(r)),
      (i = o != null ? o(i, e.value || '', r) : i),
      s.setProperty(c, r, i))
    : e.type & 12;
}
function o1(t, e) {
  let n = Er(e, t);
  n[de] & 16 || (n[de] |= 64);
}
function EE(t, e, n, r) {
  if (Gy()) {
    let i = r === null ? null : { '': -1 },
      s = d1(t, n),
      o,
      a;
    s === null ? (o = a = null) : ([o, a] = s),
      o !== null && bE(t, e, n, o, i, a),
      i && f1(n, r, i);
  }
  n.mergedAttrs = Vs(n.mergedAttrs, n.attrs);
}
function bE(t, e, n, r, i, s) {
  for (let l = 0; l < r.length; l++) Od(Ic(n, e), t, r[l].type);
  p1(n, t.data.length, r.length);
  for (let l = 0; l < r.length; l++) {
    let u = r[l];
    u.providersResolver && u.providersResolver(u);
  }
  let o = !1,
    a = !1,
    c = dE(t, e, r.length, null);
  for (let l = 0; l < r.length; l++) {
    let u = r[l];
    (n.mergedAttrs = Vs(n.mergedAttrs, u.hostAttrs)),
      m1(t, n, e, c, u),
      h1(c, u, i),
      u.contentQueries !== null && (n.flags |= 4),
      (u.hostBindings !== null || u.hostAttrs !== null || u.hostVars !== 0) &&
        (n.flags |= 64);
    let d = u.type.prototype;
    !o &&
      (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
      ((t.preOrderHooks ??= []).push(n.index), (o = !0)),
      !a &&
        (d.ngOnChanges || d.ngDoCheck) &&
        ((t.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
      c++;
  }
  i1(t, n, s);
}
function a1(t, e, n, r, i) {
  let s = i.hostBindings;
  if (s) {
    let o = t.hostBindingOpCodes;
    o === null && (o = t.hostBindingOpCodes = []);
    let a = ~e.index;
    c1(o) != a && o.push(a), o.push(n, r, s);
  }
}
function c1(t) {
  let e = t.length;
  for (; e > 0; ) {
    let n = t[--e];
    if (typeof n == 'number' && n < 0) return n;
  }
  return 0;
}
function l1(t, e, n, r) {
  let i = n.directiveStart,
    s = n.directiveEnd;
  Xi(n) && g1(e, n, t.data[i + n.componentOffset]),
    t.firstCreatePass || Ic(n, e),
    ei(r, e);
  let o = n.initialInputs;
  for (let a = i; a < s; a++) {
    let c = t.data[a],
      l = Xr(e, t, a, n);
    if ((ei(l, e), o !== null && E1(e, a - i, l, c, n, o), mr(c))) {
      let u = Er(n.index, e);
      u[ft] = Xr(e, t, a, n);
    }
  }
}
function wE(t, e, n) {
  let r = n.directiveStart,
    i = n.directiveEnd,
    s = n.index,
    o = WT();
  try {
    Yr(s);
    for (let a = r; a < i; a++) {
      let c = t.data[a],
        l = e[a];
      xd(a),
        (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) &&
          u1(c, l);
    }
  } finally {
    Yr(-1), xd(o);
  }
}
function u1(t, e) {
  t.hostBindings !== null && t.hostBindings(1, e);
}
function d1(t, e) {
  let n = t.directiveRegistry,
    r = null,
    i = null;
  if (n)
    for (let s = 0; s < n.length; s++) {
      let o = n[s];
      if (Iy(e, o.selectors, !1))
        if ((r || (r = []), mr(o)))
          if (o.findHostDirectiveDefs !== null) {
            let a = [];
            (i = i || new Map()),
              o.findHostDirectiveDefs(o, a, i),
              r.unshift(...a, o);
            let c = a.length;
            nf(t, e, c);
          } else r.unshift(o), nf(t, e, 0);
        else
          (i = i || new Map()), o.findHostDirectiveDefs?.(o, r, i), r.push(o);
    }
  return r === null ? null : [r, i];
}
function nf(t, e, n) {
  (e.componentOffset = n), (t.components ??= []).push(e.index);
}
function f1(t, e, n) {
  if (e) {
    let r = (t.localNames = []);
    for (let i = 0; i < e.length; i += 2) {
      let s = n[e[i + 1]];
      if (s == null) throw new z(-301, !1);
      r.push(e[i], s);
    }
  }
}
function h1(t, e, n) {
  if (n) {
    if (e.exportAs)
      for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
    mr(e) && (n[''] = t);
  }
}
function p1(t, e, n) {
  (t.flags |= 1),
    (t.directiveStart = e),
    (t.directiveEnd = e + n),
    (t.providerIndexes = e);
}
function m1(t, e, n, r, i) {
  t.data[r] = i;
  let s = i.factory || (i.factory = zi(i.type, !0)),
    o = new Zr(s, mr(i), rs);
  (t.blueprint[r] = o), (n[r] = o), a1(t, e, r, dE(t, n, i.hostVars, _r), i);
}
function g1(t, e, n) {
  let r = Ft(e, t),
    i = gE(n),
    s = t[Pn].rendererFactory,
    o = 16;
  n.signals ? (o = 4096) : n.onPush && (o = 64);
  let a = ll(
    t,
    cl(t, i, null, o, r, e, null, s.createRenderer(r, n), null, null, null)
  );
  t[e.index] = a;
}
function y1(t, e, n, r, i, s) {
  let o = Ft(t, e);
  v1(e[Be], o, s, t.value, n, r, i);
}
function v1(t, e, n, r, i, s, o) {
  if (s == null) t.removeAttribute(e, i, n);
  else {
    let a = o == null ? io(s) : o(s, r || '', i);
    t.setAttribute(e, i, a, n);
  }
}
function E1(t, e, n, r, i, s) {
  let o = s[e];
  if (o !== null)
    for (let a = 0; a < o.length; ) {
      let c = o[a++],
        l = o[a++],
        u = o[a++];
      _E(r, n, c, l, u);
    }
}
function _E(t, e, n, r, i) {
  let s = ut(null);
  try {
    let o = t.inputTransforms;
    o !== null && o.hasOwnProperty(r) && (i = o[r].call(e, i)),
      t.setInput !== null ? t.setInput(e, i, n, r) : (e[r] = i);
  } finally {
    ut(s);
  }
}
function b1(t, e, n) {
  let r = null,
    i = 0;
  for (; i < n.length; ) {
    let s = n[i];
    if (s === 0) {
      i += 4;
      continue;
    } else if (s === 5) {
      i += 2;
      continue;
    }
    if (typeof s == 'number') break;
    if (t.hasOwnProperty(s)) {
      r === null && (r = []);
      let o = t[s];
      for (let a = 0; a < o.length; a += 2)
        if (o[a] === e) {
          r.push(s, o[a + 1], n[i + 1]);
          break;
        }
    }
    i += 2;
  }
  return r;
}
function DE(t, e, n, r) {
  return [t, !0, 0, e, null, r, null, n, null, null];
}
function TE(t, e) {
  let n = t.contentQueries;
  if (n !== null) {
    let r = ut(null);
    try {
      for (let i = 0; i < n.length; i += 2) {
        let s = n[i],
          o = n[i + 1];
        if (o !== -1) {
          let a = t.data[o];
          qf(s), a.contentQueries(2, e[o], o);
        }
      }
    } finally {
      ut(r);
    }
  }
}
function ll(t, e) {
  return t[$s] ? (t[Lg][en] = e) : (t[$s] = e), (t[Lg] = e), e;
}
function rf(t, e, n) {
  qf(0);
  let r = ut(null);
  try {
    e(t, n);
  } finally {
    ut(r);
  }
}
function SE(t) {
  return t[Us] || (t[Us] = []);
}
function CE(t) {
  return t.cleanup || (t.cleanup = []);
}
function IE(t, e) {
  let n = t[Ui],
    r = n ? n.get(rn, null) : null;
  r && r.handleError(e);
}
function yh(t, e, n, r, i) {
  for (let s = 0; s < n.length; ) {
    let o = n[s++],
      a = n[s++],
      c = e[o],
      l = t.data[o];
    _E(l, c, r, a, i);
  }
}
function w1(t, e, n) {
  let r = Uy(e, t);
  YS(t[Be], r, n);
}
var _1 = 100;
function D1(t, e = !0) {
  let n = t[Pn],
    r = n.rendererFactory,
    i = n.afterRenderEventManager,
    s = !1;
  s || (r.begin?.(), i?.begin());
  try {
    T1(t);
  } catch (o) {
    throw (e && IE(t, o), o);
  } finally {
    s || (r.end?.(), n.inlineEffectRunner?.flush(), i?.end());
  }
}
function T1(t) {
  sf(t, 0);
  let e = 0;
  for (; qy(t); ) {
    if (e === _1) throw new z(103, !1);
    e++, sf(t, 1);
  }
}
function S1(t, e, n, r) {
  let i = e[de];
  if ((i & 256) === 256) return;
  let s = !1;
  !s && e[Pn].inlineEffectRunner?.flush(), zf(e);
  let o = null,
    a = null;
  !s && C1(t) && ((a = qC(e)), (o = Zm(a)));
  try {
    $y(e), qT(t.bindingStartIndex), n !== null && fE(t, e, n, 2, r);
    let c = (i & 3) === 3;
    if (!s)
      if (c) {
        let d = t.preOrderCheckHooks;
        d !== null && pc(e, d, null);
      } else {
        let d = t.preOrderHooks;
        d !== null && mc(e, d, 0, null), cd(e, 0);
      }
    if ((I1(e), ME(e, 0), t.contentQueries !== null && TE(t, e), !s))
      if (c) {
        let d = t.contentCheckHooks;
        d !== null && pc(e, d);
      } else {
        let d = t.contentHooks;
        d !== null && mc(e, d, 1), cd(e, 1);
      }
    QC(t, e);
    let l = t.components;
    l !== null && AE(e, l, 0);
    let u = t.viewQuery;
    if ((u !== null && rf(2, u, r), !s))
      if (c) {
        let d = t.viewCheckHooks;
        d !== null && pc(e, d);
      } else {
        let d = t.viewHooks;
        d !== null && mc(e, d, 2), cd(e, 2);
      }
    if ((t.firstUpdatePass === !0 && (t.firstUpdatePass = !1), e[ad])) {
      for (let d of e[ad]) d();
      e[ad] = null;
    }
    s || (e[de] &= -73);
  } catch (c) {
    throw (zs(e), c);
  } finally {
    a !== null && (Xm(a, o), GC(a)), Gf();
  }
}
function C1(t) {
  return t.type !== 2;
}
function ME(t, e) {
  for (let n = xv(t); n !== null; n = Rv(n)) {
    n[de] &= ~qi.HasChildViewsToRefresh;
    for (let r = ct; r < n.length; r++) {
      let i = n[r];
      NE(i, e);
    }
  }
}
function I1(t) {
  for (let e = xv(t); e !== null; e = Rv(e)) {
    if (!(e[de] & qi.HasTransplantedViews)) continue;
    let n = e[$i];
    for (let r = 0; r < n.length; r++) {
      let i = n[r],
        s = i[Ze];
      OT(i);
    }
  }
}
function M1(t, e, n) {
  let r = Er(e, t);
  NE(r, n);
}
function NE(t, e) {
  $f(t) && sf(t, e);
}
function sf(t, e) {
  let r = t[fe],
    i = t[de],
    s = t[Qr],
    o = !!(e === 0 && i & 16);
  if (
    ((o ||= !!(i & 64 && e === 0)),
    (o ||= !!(i & 1024)),
    (o ||= !!(s?.dirty && Bu(s))),
    s && (s.dirty = !1),
    (t[de] &= -9217),
    o)
  )
    S1(r, t, r.template, t[ft]);
  else if (i & 8192) {
    ME(t, 1);
    let a = r.components;
    a !== null && AE(t, a, 1);
  }
}
function AE(t, e, n) {
  for (let r = 0; r < e.length; r++) M1(t, e[r], n);
}
function vh(t) {
  for (t[Pn].changeDetectionScheduler?.notify(); t; ) {
    t[de] |= 64;
    let e = ih(t);
    if (Vf(t) && !e) return t;
    t = e;
  }
  return null;
}
var ni = class {
    get rootNodes() {
      let e = this._lView,
        n = e[fe];
      return Zs(n, e, n.firstChild, []);
    }
    constructor(e, n, r = !0) {
      (this._lView = e),
        (this._cdRefInjectingView = n),
        (this.notifyErrorHandler = r),
        (this._appRef = null),
        (this._attachedToViewContainer = !1);
    }
    get context() {
      return this._lView[ft];
    }
    set context(e) {
      this._lView[ft] = e;
    }
    get destroyed() {
      return (this._lView[de] & 256) === 256;
    }
    destroy() {
      if (this._appRef) this._appRef.detachView(this);
      else if (this._attachedToViewContainer) {
        let e = this._lView[Ze];
        if (St(e)) {
          let n = e[Dc],
            r = n ? n.indexOf(this) : -1;
          r > -1 && (Ks(e, r), Mc(n, r));
        }
        this._attachedToViewContainer = !1;
      }
      nl(this._lView[fe], this._lView);
    }
    onDestroy(e) {
      zy(this._lView, e);
    }
    markForCheck() {
      vh(this._cdRefInjectingView || this._lView);
    }
    detach() {
      this._lView[de] &= -129;
    }
    reattach() {
      Ad(this._lView), (this._lView[de] |= 128);
    }
    detectChanges() {
      (this._lView[de] |= 1024), D1(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new z(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      (this._appRef = null), JS(this._lView[fe], this._lView);
    }
    attachToAppRef(e) {
      if (this._attachedToViewContainer) throw new z(902, !1);
      (this._appRef = e), Ad(this._lView);
    }
  },
  ul = (() => {
    let e = class e {};
    e.__NG_ELEMENT_ID__ = N1;
    let t = e;
    return t;
  })();
function N1(t) {
  return A1(Ot(), Me(), (t & 16) === 16);
}
function A1(t, e, n) {
  if (Xi(t) && !n) {
    let r = Er(t.index, e);
    return new ni(r, r);
  } else if (t.type & 47) {
    let r = e[Tt];
    return new ni(r, e);
  }
  return null;
}
var xE = (() => {
    let e = class e {};
    (e.__NG_ELEMENT_ID__ = x1), (e.__NG_ENV_ID__ = (r) => r);
    let t = e;
    return t;
  })(),
  of = class extends xE {
    constructor(e) {
      super(), (this._lView = e);
    }
    onDestroy(e) {
      return zy(this._lView, e), () => LT(this._lView, e);
    }
  };
function x1() {
  return new of(Me());
}
var Yg = new Set();
function Dr(t) {
  Yg.has(t) ||
    (Yg.add(t),
    performance?.mark?.('mark_feature_usage', { detail: { feature: t } }));
}
var af = class extends st {
  constructor(e = !1) {
    super(), (this.__isAsync = e);
  }
  emit(e) {
    super.next(e);
  }
  subscribe(e, n, r) {
    let i = e,
      s = n || (() => null),
      o = r;
    if (e && typeof e == 'object') {
      let c = e;
      (i = c.next?.bind(c)), (s = c.error?.bind(c)), (o = c.complete?.bind(c));
    }
    this.__isAsync && ((s = md(s)), i && (i = md(i)), o && (o = md(o)));
    let a = super.subscribe({ next: i, error: s, complete: o });
    return e instanceof Je && e.add(a), a;
  }
};
function md(t) {
  return (e) => {
    setTimeout(t, void 0, e);
  };
}
var gt = af;
function Zg(...t) {}
function R1() {
  let t = typeof fr.requestAnimationFrame == 'function',
    e = fr[t ? 'requestAnimationFrame' : 'setTimeout'],
    n = fr[t ? 'cancelAnimationFrame' : 'clearTimeout'];
  if (typeof Zone < 'u' && e && n) {
    let r = e[Zone.__symbol__('OriginalDelegate')];
    r && (e = r);
    let i = n[Zone.__symbol__('OriginalDelegate')];
    i && (n = i);
  }
  return { nativeRequestAnimationFrame: e, nativeCancelAnimationFrame: n };
}
var Fe = class t {
    constructor({
      enableLongStackTrace: e = !1,
      shouldCoalesceEventChangeDetection: n = !1,
      shouldCoalesceRunChangeDetection: r = !1,
    }) {
      if (
        ((this.hasPendingMacrotasks = !1),
        (this.hasPendingMicrotasks = !1),
        (this.isStable = !0),
        (this.onUnstable = new gt(!1)),
        (this.onMicrotaskEmpty = new gt(!1)),
        (this.onStable = new gt(!1)),
        (this.onError = new gt(!1)),
        typeof Zone > 'u')
      )
        throw new z(908, !1);
      Zone.assertZonePatched();
      let i = this;
      (i._nesting = 0),
        (i._outer = i._inner = Zone.current),
        Zone.TaskTrackingZoneSpec &&
          (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
        e &&
          Zone.longStackTraceZoneSpec &&
          (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
        (i.shouldCoalesceEventChangeDetection = !r && n),
        (i.shouldCoalesceRunChangeDetection = r),
        (i.lastRequestAnimationFrameId = -1),
        (i.nativeRequestAnimationFrame = R1().nativeRequestAnimationFrame),
        L1(i);
    }
    static isInAngularZone() {
      return typeof Zone < 'u' && Zone.current.get('isAngularZone') === !0;
    }
    static assertInAngularZone() {
      if (!t.isInAngularZone()) throw new z(909, !1);
    }
    static assertNotInAngularZone() {
      if (t.isInAngularZone()) throw new z(909, !1);
    }
    run(e, n, r) {
      return this._inner.run(e, n, r);
    }
    runTask(e, n, r, i) {
      let s = this._inner,
        o = s.scheduleEventTask('NgZoneEvent: ' + i, e, O1, Zg, Zg);
      try {
        return s.runTask(o, n, r);
      } finally {
        s.cancelTask(o);
      }
    }
    runGuarded(e, n, r) {
      return this._inner.runGuarded(e, n, r);
    }
    runOutsideAngular(e) {
      return this._outer.run(e);
    }
  },
  O1 = {};
function Eh(t) {
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
function k1(t) {
  t.isCheckStableRunning ||
    t.lastRequestAnimationFrameId !== -1 ||
    ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
      fr,
      () => {
        t.fakeTopEventTask ||
          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
            'fakeTopEventTask',
            () => {
              (t.lastRequestAnimationFrameId = -1),
                cf(t),
                (t.isCheckStableRunning = !0),
                Eh(t),
                (t.isCheckStableRunning = !1);
            },
            void 0,
            () => {},
            () => {}
          )),
          t.fakeTopEventTask.invoke();
      }
    )),
    cf(t));
}
function L1(t) {
  let e = () => {
    k1(t);
  };
  t._inner = t._inner.fork({
    name: 'angular',
    properties: { isAngularZone: !0 },
    onInvokeTask: (n, r, i, s, o, a) => {
      if (P1(a)) return n.invokeTask(i, s, o, a);
      try {
        return Xg(t), n.invokeTask(i, s, o, a);
      } finally {
        ((t.shouldCoalesceEventChangeDetection && s.type === 'eventTask') ||
          t.shouldCoalesceRunChangeDetection) &&
          e(),
          Jg(t);
      }
    },
    onInvoke: (n, r, i, s, o, a, c) => {
      try {
        return Xg(t), n.invoke(i, s, o, a, c);
      } finally {
        t.shouldCoalesceRunChangeDetection && e(), Jg(t);
      }
    },
    onHasTask: (n, r, i, s) => {
      n.hasTask(i, s),
        r === i &&
          (s.change == 'microTask'
            ? ((t._hasPendingMicrotasks = s.microTask), cf(t), Eh(t))
            : s.change == 'macroTask' &&
              (t.hasPendingMacrotasks = s.macroTask));
    },
    onHandleError: (n, r, i, s) => (
      n.handleError(i, s), t.runOutsideAngular(() => t.onError.emit(s)), !1
    ),
  });
}
function cf(t) {
  t._hasPendingMicrotasks ||
  ((t.shouldCoalesceEventChangeDetection ||
    t.shouldCoalesceRunChangeDetection) &&
    t.lastRequestAnimationFrameId !== -1)
    ? (t.hasPendingMicrotasks = !0)
    : (t.hasPendingMicrotasks = !1);
}
function Xg(t) {
  t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
}
function Jg(t) {
  t._nesting--, Eh(t);
}
var lf = class {
  constructor() {
    (this.hasPendingMicrotasks = !1),
      (this.hasPendingMacrotasks = !1),
      (this.isStable = !0),
      (this.onUnstable = new gt()),
      (this.onMicrotaskEmpty = new gt()),
      (this.onStable = new gt()),
      (this.onError = new gt());
  }
  run(e, n, r) {
    return e.apply(n, r);
  }
  runGuarded(e, n, r) {
    return e.apply(n, r);
  }
  runOutsideAngular(e) {
    return e();
  }
  runTask(e, n, r, i) {
    return e.apply(n, r);
  }
};
function P1(t) {
  return !Array.isArray(t) || t.length !== 1
    ? !1
    : t[0].data?.__ignore_ng_zone__ === !0;
}
function F1(t = 'zone.js', e) {
  return t === 'noop' ? new lf() : t === 'zone.js' ? new Fe(e) : t;
}
var ji = (function (t) {
    return (
      (t[(t.EarlyRead = 0)] = 'EarlyRead'),
      (t[(t.Write = 1)] = 'Write'),
      (t[(t.MixedReadWrite = 2)] = 'MixedReadWrite'),
      (t[(t.Read = 3)] = 'Read'),
      t
    );
  })(ji || {}),
  j1 = { destroy() {} };
function bh(t, e) {
  !e && FS(bh);
  let n = e?.injector ?? W(Ct);
  if (!Ps(n)) return j1;
  Dr('NgAfterNextRender');
  let r = n.get(RE),
    i = (r.handler ??= new df()),
    s = e?.phase ?? ji.MixedReadWrite,
    o = () => {
      i.unregister(c), a();
    },
    a = n.get(xE).onDestroy(o),
    c = new uf(n, s, () => {
      o(), t();
    });
  return i.register(c), { destroy: o };
}
var uf = class {
    constructor(e, n, r) {
      (this.phase = n),
        (this.callbackFn = r),
        (this.zone = e.get(Fe)),
        (this.errorHandler = e.get(rn, null, { optional: !0 }));
    }
    invoke() {
      try {
        this.zone.runOutsideAngular(this.callbackFn);
      } catch (e) {
        this.errorHandler?.handleError(e);
      }
    }
  },
  df = class {
    constructor() {
      (this.executingCallbacks = !1),
        (this.buckets = {
          [ji.EarlyRead]: new Set(),
          [ji.Write]: new Set(),
          [ji.MixedReadWrite]: new Set(),
          [ji.Read]: new Set(),
        }),
        (this.deferredCallbacks = new Set());
    }
    validateBegin() {
      if (this.executingCallbacks) throw new z(102, !1);
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
      for (let e of Object.values(this.buckets)) for (let n of e) n.invoke();
      this.executingCallbacks = !1;
      for (let e of this.deferredCallbacks) this.buckets[e.phase].add(e);
      this.deferredCallbacks.clear();
    }
    destroy() {
      for (let e of Object.values(this.buckets)) e.clear();
      this.deferredCallbacks.clear();
    }
  },
  RE = (() => {
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
          for (let r of this.internalCallbacks) r();
          (this.internalCallbacks.length = 0), this.handler?.execute();
        }
      }
      ngOnDestroy() {
        this.handler?.destroy(),
          (this.handler = null),
          (this.internalCallbacks.length = 0);
      }
    };
    e.ɵprov = J({ token: e, providedIn: 'root', factory: () => new e() });
    let t = e;
    return t;
  })();
function H1(t, e) {
  let n = Er(e, t),
    r = n[fe];
  B1(r, n);
  let i = n[et];
  i !== null && n[nn] === null && (n[nn] = ph(i, n[Ui])), wh(r, n, n[ft]);
}
function B1(t, e) {
  for (let n = e.length; n < t.blueprint.length; n++) e.push(t.blueprint[n]);
}
function wh(t, e, n) {
  zf(e);
  try {
    let r = t.viewQuery;
    r !== null && rf(1, r, n);
    let i = t.template;
    i !== null && fE(t, e, i, 1, n),
      t.firstCreatePass && (t.firstCreatePass = !1),
      t.staticContentQueries && TE(t, e),
      t.staticViewQueries && rf(2, t.viewQuery, n);
    let s = t.components;
    s !== null && V1(e, s);
  } catch (r) {
    throw (
      (t.firstCreatePass &&
        ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)),
      r)
    );
  } finally {
    (e[de] &= -5), Gf();
  }
}
function V1(t, e) {
  for (let n = 0; n < e.length; n++) H1(t, e[n]);
}
function ff(t, e, n) {
  let r = n ? t.styles : null,
    i = n ? t.classes : null,
    s = 0;
  if (e !== null)
    for (let o = 0; o < e.length; o++) {
      let a = e[o];
      if (typeof a == 'number') s = a;
      else if (s == 1) i = Td(i, a);
      else if (s == 2) {
        let c = a,
          l = e[++o];
        r = Td(r, c + ': ' + l + ';');
      }
    }
  n ? (t.styles = r) : (t.stylesWithoutHost = r),
    n ? (t.classes = i) : (t.classesWithoutHost = i);
}
var Pc = class extends al {
  constructor(e) {
    super(), (this.ngModule = e);
  }
  resolveComponentFactory(e) {
    let n = Ln(e);
    return new Ki(n, this.ngModule);
  }
};
function ey(t) {
  let e = [];
  for (let n in t)
    if (t.hasOwnProperty(n)) {
      let r = t[n];
      e.push({ propName: r, templateName: n });
    }
  return e;
}
function U1(t) {
  let e = t.toLowerCase();
  return e === 'svg' ? By : e === 'math' ? IT : null;
}
var hf = class {
    constructor(e, n) {
      (this.injector = e), (this.parentInjector = n);
    }
    get(e, n, r) {
      r = Qc(r);
      let i = this.injector.get(e, hd, r);
      return i !== hd || n === hd ? i : this.parentInjector.get(e, n, r);
    }
  },
  Ki = class extends Lc {
    get inputs() {
      let e = this.componentDef,
        n = e.inputTransforms,
        r = ey(e.inputs);
      if (n !== null)
        for (let i of r)
          n.hasOwnProperty(i.propName) && (i.transform = n[i.propName]);
      return r;
    }
    get outputs() {
      return ey(this.componentDef.outputs);
    }
    constructor(e, n) {
      super(),
        (this.componentDef = e),
        (this.ngModule = n),
        (this.componentType = e.type),
        (this.selector = yT(e.selectors)),
        (this.ngContentSelectors = e.ngContentSelectors
          ? e.ngContentSelectors
          : []),
        (this.isBoundToModule = !!n);
    }
    create(e, n, r, i) {
      i = i || this.ngModule;
      let s = i instanceof Rt ? i : i?.injector;
      s &&
        this.componentDef.getStandaloneInjector !== null &&
        (s = this.componentDef.getStandaloneInjector(s) || s);
      let o = s ? new hf(e, s) : e,
        a = o.get(ti, null);
      if (a === null) throw new z(407, !1);
      let c = o.get($C, null),
        l = o.get(RE, null),
        u = o.get(Kd, null),
        d = {
          rendererFactory: a,
          sanitizer: c,
          inlineEffectRunner: null,
          afterRenderEventManager: l,
          changeDetectionScheduler: u,
        },
        m = a.createRenderer(null, this.componentDef),
        E = this.componentDef.selectors[0][0] || 'div',
        I = r ? XC(m, r, this.componentDef.encapsulation, o) : sh(m, E, U1(E)),
        M = 512;
      this.componentDef.signals
        ? (M |= 4096)
        : this.componentDef.onPush || (M |= 16);
      let j = null;
      I !== null && (j = ph(I, o, !0));
      let O = gh(0, null, null, 1, 0, null, null, null, null, null, null),
        D = cl(null, O, null, M, null, null, d, m, o, null, j);
      zf(D);
      let _, S;
      try {
        let b = this.componentDef,
          ne,
          se = null;
        b.findHostDirectiveDefs
          ? ((ne = []),
            (se = new Map()),
            b.findHostDirectiveDefs(b, ne, se),
            ne.push(b))
          : (ne = [b]);
        let Ie = $1(D, I),
          q = q1(Ie, I, b, ne, D, d, m);
        (S = Uf(O, Ge)),
          I && W1(m, b, I, r),
          n !== void 0 && K1(S, this.ngContentSelectors, n),
          (_ = G1(q, b, ne, se, D, [Q1])),
          wh(O, D, null);
      } finally {
        Gf();
      }
      return new pf(this.componentType, _, ns(S, D), D, S);
    }
  },
  pf = class extends ef {
    constructor(e, n, r, i, s) {
      super(),
        (this.location = r),
        (this._rootLView = i),
        (this._tNode = s),
        (this.previousInputValues = null),
        (this.instance = n),
        (this.hostView = this.changeDetectorRef = new ni(i, void 0, !1)),
        (this.componentType = e);
    }
    setInput(e, n) {
      let r = this._tNode.inputs,
        i;
      if (r !== null && (i = r[e])) {
        if (
          ((this.previousInputValues ??= new Map()),
          this.previousInputValues.has(e) &&
            Object.is(this.previousInputValues.get(e), n))
        )
          return;
        let s = this._rootLView;
        yh(s[fe], s, i, e, n), this.previousInputValues.set(e, n);
        let o = Er(this._tNode.index, s);
        vh(o);
      }
    }
    get injector() {
      return new Kr(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(e) {
      this.hostView.onDestroy(e);
    }
  };
function $1(t, e) {
  let n = t[fe],
    r = Ge;
  return (t[r] = e), go(n, r, 2, '#host', null);
}
function q1(t, e, n, r, i, s, o) {
  let a = i[fe];
  z1(r, t, e, o);
  let c = null;
  e !== null && (c = ph(e, i[Ui]));
  let l = s.rendererFactory.createRenderer(e, n),
    u = 16;
  n.signals ? (u = 4096) : n.onPush && (u = 64);
  let d = cl(i, gE(n), null, u, i[t.index], t, s, l, null, null, c);
  return (
    a.firstCreatePass && nf(a, t, r.length - 1), ll(i, d), (i[t.index] = d)
  );
}
function z1(t, e, n, r) {
  for (let i of t) e.mergedAttrs = Vs(e.mergedAttrs, i.hostAttrs);
  e.mergedAttrs !== null &&
    (ff(e, e.mergedAttrs, !0), n !== null && qv(r, n, e));
}
function G1(t, e, n, r, i, s) {
  let o = Ot(),
    a = i[fe],
    c = Ft(o, i);
  bE(a, i, o, n, null, r);
  for (let u = 0; u < n.length; u++) {
    let d = o.directiveStart + u,
      m = Xr(i, a, d, o);
    ei(m, i);
  }
  wE(a, i, o), c && ei(c, i);
  let l = Xr(i, a, o.directiveStart + o.componentOffset, o);
  if (((t[ft] = i[ft] = l), s !== null)) for (let u of s) u(l, e);
  return hE(a, o, t), l;
}
function W1(t, e, n, r) {
  if (r) Md(t, n, ['ng-version', '17.0.8']);
  else {
    let { attrs: i, classes: s } = vT(e.selectors[0]);
    i && Md(t, n, i), s && s.length > 0 && $v(t, n, s.join(' '));
  }
}
function K1(t, e, n) {
  let r = (t.projection = []);
  for (let i = 0; i < e.length; i++) {
    let s = n[i];
    r.push(s != null ? Array.from(s) : null);
  }
}
function Q1() {
  let t = Ot();
  Qf(Me()[fe], t);
}
function Y1(t) {
  return Object.getPrototypeOf(t.prototype).constructor;
}
function Z1(t) {
  let e = Y1(t.type),
    n = !0,
    r = [t];
  for (; e; ) {
    let i;
    if (mr(t)) i = e.ɵcmp || e.ɵdir;
    else {
      if (e.ɵcmp) throw new z(903, !1);
      i = e.ɵdir;
    }
    if (i) {
      if (n) {
        r.push(i);
        let o = t;
        (o.inputs = uc(t.inputs)),
          (o.inputTransforms = uc(t.inputTransforms)),
          (o.declaredInputs = uc(t.declaredInputs)),
          (o.outputs = uc(t.outputs));
        let a = i.hostBindings;
        a && tI(t, a);
        let c = i.viewQuery,
          l = i.contentQueries;
        if (
          (c && J1(t, c),
          l && eI(t, l),
          oc(t.inputs, i.inputs),
          oc(t.declaredInputs, i.declaredInputs),
          oc(t.outputs, i.outputs),
          i.inputTransforms !== null &&
            (o.inputTransforms === null && (o.inputTransforms = {}),
            oc(o.inputTransforms, i.inputTransforms)),
          mr(i) && i.data.animation)
        ) {
          let u = t.data;
          u.animation = (u.animation || []).concat(i.data.animation);
        }
      }
      let s = i.features;
      if (s)
        for (let o = 0; o < s.length; o++) {
          let a = s[o];
          a && a.ngInherit && a(t), a === Z1 && (n = !1);
        }
    }
    e = Object.getPrototypeOf(e);
  }
  X1(r);
}
function X1(t) {
  let e = 0,
    n = null;
  for (let r = t.length - 1; r >= 0; r--) {
    let i = t[r];
    (i.hostVars = e += i.hostVars),
      (i.hostAttrs = Vs(i.hostAttrs, (n = Vs(n, i.hostAttrs))));
  }
}
function uc(t) {
  return t === Vi ? {} : t === _t ? [] : t;
}
function J1(t, e) {
  let n = t.viewQuery;
  n
    ? (t.viewQuery = (r, i) => {
        e(r, i), n(r, i);
      })
    : (t.viewQuery = e);
}
function eI(t, e) {
  let n = t.contentQueries;
  n
    ? (t.contentQueries = (r, i, s) => {
        e(r, i, s), n(r, i, s);
      })
    : (t.contentQueries = e);
}
function tI(t, e) {
  let n = t.hostBindings;
  n
    ? (t.hostBindings = (r, i) => {
        e(r, i), n(r, i);
      })
    : (t.hostBindings = e);
}
function OE(t) {
  let e = t.inputConfig,
    n = {};
  for (let r in e)
    if (e.hasOwnProperty(r)) {
      let i = e[r];
      Array.isArray(i) && i[2] && (n[r] = i[2]);
    }
  t.inputTransforms = n;
}
function Tr(t, e, n) {
  let r = t[e];
  return Object.is(r, n) ? !1 : ((t[e] = n), !0);
}
function kE(t, e, n, r) {
  let i = Me(),
    s = es();
  if (Tr(i, s, e)) {
    let o = ht(),
      a = Wf();
    y1(a, i, t, e, n, r);
  }
  return kE;
}
function nI(t, e, n, r) {
  return Tr(t, es(), n) ? e + io(n) + r : _r;
}
function dc(t, e) {
  return (t << 17) | (e << 2);
}
function ri(t) {
  return (t >> 17) & 32767;
}
function rI(t) {
  return (t & 2) == 2;
}
function iI(t, e) {
  return (t & 131071) | (e << 17);
}
function mf(t) {
  return t | 2;
}
function Qi(t) {
  return (t & 131068) >> 2;
}
function gd(t, e) {
  return (t & -131069) | (e << 2);
}
function sI(t) {
  return (t & 1) === 1;
}
function gf(t) {
  return t | 1;
}
function oI(t, e, n, r, i, s) {
  let o = s ? e.classBindings : e.styleBindings,
    a = ri(o),
    c = Qi(o);
  t[r] = n;
  let l = !1,
    u;
  if (Array.isArray(n)) {
    let d = n;
    (u = d[1]), (u === null || lo(d, u) > 0) && (l = !0);
  } else u = n;
  if (i)
    if (c !== 0) {
      let m = ri(t[a + 1]);
      (t[r + 1] = dc(m, a)),
        m !== 0 && (t[m + 1] = gd(t[m + 1], r)),
        (t[a + 1] = iI(t[a + 1], r));
    } else
      (t[r + 1] = dc(a, 0)), a !== 0 && (t[a + 1] = gd(t[a + 1], r)), (a = r);
  else
    (t[r + 1] = dc(c, 0)),
      a === 0 ? (a = r) : (t[c + 1] = gd(t[c + 1], r)),
      (c = r);
  l && (t[r + 1] = mf(t[r + 1])),
    ty(t, u, r, !0, s),
    ty(t, u, r, !1, s),
    aI(e, u, t, r, s),
    (o = dc(a, c)),
    s ? (e.classBindings = o) : (e.styleBindings = o);
}
function aI(t, e, n, r, i) {
  let s = i ? t.residualClasses : t.residualStyles;
  s != null &&
    typeof e == 'string' &&
    lo(s, e) >= 0 &&
    (n[r + 1] = gf(n[r + 1]));
}
function ty(t, e, n, r, i) {
  let s = t[n + 1],
    o = e === null,
    a = r ? ri(s) : Qi(s),
    c = !1;
  for (; a !== 0 && (c === !1 || o); ) {
    let l = t[a],
      u = t[a + 1];
    cI(l, e) && ((c = !0), (t[a + 1] = r ? gf(u) : mf(u))),
      (a = r ? ri(u) : Qi(u));
  }
  c && (t[n + 1] = r ? mf(s) : gf(s));
}
function cI(t, e) {
  return t === null || e == null || (Array.isArray(t) ? t[1] : t) === e
    ? !0
    : Array.isArray(t) && typeof e == 'string'
    ? lo(t, e) >= 0
    : !1;
}
var Jt = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function lI(t) {
  return t.substring(Jt.key, Jt.keyEnd);
}
function uI(t) {
  return dI(t), LE(t, PE(t, 0, Jt.textEnd));
}
function LE(t, e) {
  let n = Jt.textEnd;
  return n === e ? -1 : ((e = Jt.keyEnd = fI(t, (Jt.key = e), n)), PE(t, e, n));
}
function dI(t) {
  (Jt.key = 0),
    (Jt.keyEnd = 0),
    (Jt.value = 0),
    (Jt.valueEnd = 0),
    (Jt.textEnd = t.length);
}
function PE(t, e, n) {
  for (; e < n && t.charCodeAt(e) <= 32; ) e++;
  return e;
}
function fI(t, e, n) {
  for (; e < n && t.charCodeAt(e) > 32; ) e++;
  return e;
}
function hI(t, e, n) {
  let r = Me(),
    i = es();
  if (Tr(r, i, e)) {
    let s = ht(),
      o = Wf();
    vE(s, o, r, t, e, r[Be], n, !1);
  }
  return hI;
}
function yf(t, e, n, r, i) {
  let s = e.inputs,
    o = i ? 'class' : 'style';
  yh(t, n, s[o], o, r);
}
function FE(t, e, n) {
  return jE(t, e, n, !1), FE;
}
function pI(t, e) {
  return jE(t, e, null, !0), pI;
}
function e6(t) {
  gI(_I, mI, t, !0);
}
function mI(t, e) {
  for (let n = uI(e); n >= 0; n = LE(e, n)) Jf(t, lI(e), !0);
}
function jE(t, e, n, r) {
  let i = Me(),
    s = ht(),
    o = Yy(2);
  if ((s.firstUpdatePass && BE(s, t, o, r), e !== _r && Tr(i, o, e))) {
    let a = s.data[br()];
    VE(s, a, i, i[Be], t, (i[o + 1] = TI(e, n)), r, o);
  }
}
function gI(t, e, n, r) {
  let i = ht(),
    s = Yy(2);
  i.firstUpdatePass && BE(i, null, s, r);
  let o = Me();
  if (n !== _r && Tr(o, s, n)) {
    let a = i.data[br()];
    if (UE(a, r) && !HE(i, s)) {
      let c = r ? a.classesWithoutHost : a.stylesWithoutHost;
      c !== null && (n = Td(c, n || '')), yf(i, a, o, n, r);
    } else DI(i, a, o, o[Be], o[s + 1], (o[s + 1] = wI(t, e, n)), r, s);
  }
}
function HE(t, e) {
  return e >= t.expandoStartIndex;
}
function BE(t, e, n, r) {
  let i = t.data;
  if (i[n + 1] === null) {
    let s = i[br()],
      o = HE(t, n);
    UE(s, r) && e === null && !o && (e = !1),
      (e = yI(i, s, e, r)),
      oI(i, s, e, n, o, r);
  }
}
function yI(t, e, n, r) {
  let i = KT(t),
    s = r ? e.residualClasses : e.residualStyles;
  if (i === null)
    (r ? e.classBindings : e.styleBindings) === 0 &&
      ((n = yd(null, t, e, n, r)), (n = Xs(n, e.attrs, r)), (s = null));
  else {
    let o = e.directiveStylingLast;
    if (o === -1 || t[o] !== i)
      if (((n = yd(i, t, e, n, r)), s === null)) {
        let c = vI(t, e, r);
        c !== void 0 &&
          Array.isArray(c) &&
          ((c = yd(null, t, e, c[1], r)),
          (c = Xs(c, e.attrs, r)),
          EI(t, e, r, c));
      } else s = bI(t, e, r);
  }
  return (
    s !== void 0 && (r ? (e.residualClasses = s) : (e.residualStyles = s)), n
  );
}
function vI(t, e, n) {
  let r = n ? e.classBindings : e.styleBindings;
  if (Qi(r) !== 0) return t[ri(r)];
}
function EI(t, e, n, r) {
  let i = n ? e.classBindings : e.styleBindings;
  t[ri(i)] = r;
}
function bI(t, e, n) {
  let r,
    i = e.directiveEnd;
  for (let s = 1 + e.directiveStylingLast; s < i; s++) {
    let o = t[s].hostAttrs;
    r = Xs(r, o, n);
  }
  return Xs(r, e.attrs, n);
}
function yd(t, e, n, r, i) {
  let s = null,
    o = n.directiveEnd,
    a = n.directiveStylingLast;
  for (
    a === -1 ? (a = n.directiveStart) : a++;
    a < o && ((s = e[a]), (r = Xs(r, s.hostAttrs, i)), s !== t);

  )
    a++;
  return t !== null && (n.directiveStylingLast = a), r;
}
function Xs(t, e, n) {
  let r = n ? 1 : 2,
    i = -1;
  if (e !== null)
    for (let s = 0; s < e.length; s++) {
      let o = e[s];
      typeof o == 'number'
        ? (i = o)
        : i === r &&
          (Array.isArray(t) || (t = t === void 0 ? [] : ['', t]),
          Jf(t, o, n ? !0 : e[++s]));
    }
  return t === void 0 ? null : t;
}
function wI(t, e, n) {
  if (n == null || n === '') return _t;
  let r = [],
    i = gn(n);
  if (Array.isArray(i)) for (let s = 0; s < i.length; s++) t(r, i[s], !0);
  else if (typeof i == 'object')
    for (let s in i) i.hasOwnProperty(s) && t(r, s, i[s]);
  else typeof i == 'string' && e(r, i);
  return r;
}
function _I(t, e, n) {
  let r = String(e);
  r !== '' && !r.includes(' ') && Jf(t, r, n);
}
function DI(t, e, n, r, i, s, o, a) {
  i === _r && (i = _t);
  let c = 0,
    l = 0,
    u = 0 < i.length ? i[0] : null,
    d = 0 < s.length ? s[0] : null;
  for (; u !== null || d !== null; ) {
    let m = c < i.length ? i[c + 1] : void 0,
      E = l < s.length ? s[l + 1] : void 0,
      I = null,
      M;
    u === d
      ? ((c += 2), (l += 2), m !== E && ((I = d), (M = E)))
      : d === null || (u !== null && u < d)
      ? ((c += 2), (I = u))
      : ((l += 2), (I = d), (M = E)),
      I !== null && VE(t, e, n, r, I, M, o, a),
      (u = c < i.length ? i[c] : null),
      (d = l < s.length ? s[l] : null);
  }
}
function VE(t, e, n, r, i, s, o, a) {
  if (!(e.type & 3)) return;
  let c = t.data,
    l = c[a + 1],
    u = sI(l) ? ny(c, e, n, i, Qi(l), o) : void 0;
  if (!Fc(u)) {
    Fc(s) || (rI(l) && (s = ny(c, null, n, i, a, o)));
    let d = Uy(br(), n);
    fC(r, o, d, i, s);
  }
}
function ny(t, e, n, r, i, s) {
  let o = e === null,
    a;
  for (; i > 0; ) {
    let c = t[i],
      l = Array.isArray(c),
      u = l ? c[1] : c,
      d = u === null,
      m = n[i + 1];
    m === _r && (m = d ? _t : void 0);
    let E = d ? ud(m, r) : u === r ? m : void 0;
    if ((l && !Fc(E) && (E = ud(c, r)), Fc(E) && ((a = E), o))) return a;
    let I = t[i + 1];
    i = o ? ri(I) : Qi(I);
  }
  if (e !== null) {
    let c = s ? e.residualClasses : e.residualStyles;
    c != null && (a = ud(c, r));
  }
  return a;
}
function Fc(t) {
  return t !== void 0;
}
function TI(t, e) {
  return (
    t == null ||
      t === '' ||
      (typeof e == 'string'
        ? (t = t + e)
        : typeof t == 'object' && (t = Dt(gn(t)))),
    t
  );
}
function UE(t, e) {
  return (t.flags & (e ? 8 : 16)) !== 0;
}
var vf = '<-- AT THIS LOCATION';
function SI(t) {
  switch (t) {
    case 4:
      return 'view container';
    case 2:
      return 'element';
    case 8:
      return 'ng-container';
    case 32:
      return 'icu';
    case 64:
      return 'i18n';
    case 16:
      return 'projection';
    case 1:
      return 'text';
    default:
      return '<unknown>';
  }
}
function CI(t, e) {
  let n = `During serialization, Angular was unable to find an element in the DOM:

`,
    r = `${xI(t, e, !1)}

`,
    i = OI();
  throw new z(-502, n + r + i);
}
function II(t) {
  let e =
      'During serialization, Angular detected DOM nodes that were created outside of Angular context and provided as projectable nodes (likely via `ViewContainerRef.createComponent` or `createComponent` APIs). Hydration is not supported for such cases, consider refactoring the code to avoid this pattern or using `ngSkipHydration` on the host element of the component.\n\n',
    n = `${RI(t)}

`,
    r = e + n + kI();
  return new z(-503, r);
}
function MI(t) {
  let e = [];
  if (t.attrs)
    for (let n = 0; n < t.attrs.length; ) {
      let r = t.attrs[n++];
      if (typeof r == 'number') break;
      let i = t.attrs[n++];
      e.push(`${r}="${jc(i)}"`);
    }
  return e.join(' ');
}
var NI = new Set(['ngh', 'ng-version', 'ng-server-context']);
function AI(t) {
  let e = [];
  for (let n = 0; n < t.attributes.length; n++) {
    let r = t.attributes[n];
    NI.has(r.name) || e.push(`${r.name}="${jc(r.value)}"`);
  }
  return e.join(' ');
}
function vd(t, e = '\u2026') {
  switch (t.type) {
    case 1:
      return `#text${t.value ? `(${t.value})` : ''}`;
    case 2:
      let r = MI(t),
        i = t.value.toLowerCase();
      return `<${i}${r ? ' ' + r : ''}>${e}</${i}>`;
    case 8:
      return '<!-- ng-container -->';
    case 4:
      return '<!-- container -->';
    default:
      return `#node(${SI(t.type)})`;
  }
}
function Ec(t, e = '\u2026') {
  let n = t;
  switch (n.nodeType) {
    case Node.ELEMENT_NODE:
      let r = n.tagName.toLowerCase(),
        i = AI(n);
      return `<${r}${i ? ' ' + i : ''}>${e}</${r}>`;
    case Node.TEXT_NODE:
      let s = n.textContent ? jc(n.textContent) : '';
      return `#text${s ? `(${s})` : ''}`;
    case Node.COMMENT_NODE:
      return `<!-- ${jc(n.textContent ?? '')} -->`;
    default:
      return `#node(${n.nodeType})`;
  }
}
function xI(t, e, n) {
  let r = '  ',
    i = '';
  e.prev
    ? ((i +=
        r +
        `\u2026
`),
      (i +=
        r +
        vd(e.prev) +
        `
`))
    : e.type &&
      e.type & 12 &&
      (i +=
        r +
        `\u2026
`),
    n
      ? ((i +=
          r +
          vd(e) +
          `
`),
        (i +=
          r +
          `<!-- container -->  ${vf}
`))
      : (i +=
          r +
          vd(e) +
          `  ${vf}
`),
    (i +=
      r +
      `\u2026
`);
  let s = e.type ? oh(t[fe], e, t) : null;
  return (
    s &&
      (i = Ec(
        s,
        `
` + i
      )),
    i
  );
}
function RI(t) {
  let e = '  ',
    n = '',
    r = t;
  return (
    r.previousSibling &&
      ((n +=
        e +
        `\u2026
`),
      (n +=
        e +
        Ec(r.previousSibling) +
        `
`)),
    (n +=
      e +
      Ec(r) +
      `  ${vf}
`),
    t.nextSibling &&
      (n +=
        e +
        `\u2026
`),
    t.parentNode &&
      (n = Ec(
        r.parentNode,
        `
` + n
      )),
    n
  );
}
function OI(t) {
  return `To fix this problem:
  * check ${
    t ? `the "${t}"` : 'corresponding'
  } component for hydration-related issues
  * check to see if your template has valid HTML structure
  * or skip hydration by adding the \`ngSkipHydration\` attribute to its host node in a template

`;
}
function kI() {
  return `Note: attributes are only displayed to better represent the DOM but have no effect on hydration mismatches.

`;
}
function LI(t) {
  return t.replace(/\s+/gm, '');
}
function jc(t, e = 50) {
  return t
    ? ((t = LI(t)), t.length > e ? `${t.substring(0, e - 1)}\u2026` : t)
    : '';
}
function $E(t) {
  let e = t[qs] ?? [],
    r = t[Ze][Be];
  for (let i of e) PI(i, r);
  t[qs] = _t;
}
function PI(t, e) {
  let n = 0,
    r = t.firstChild;
  if (r) {
    let i = t.data[Wi];
    for (; n < i; ) {
      let s = r.nextSibling;
      Bv(e, r, !1), (r = s), n++;
    }
  }
}
function qE(t) {
  $E(t);
  for (let e = ct; e < t.length; e++) Hc(t[e]);
}
function Hc(t) {
  let e = t[fe];
  for (let n = Ge; n < e.bindingStartIndex; n++)
    if (St(t[n])) {
      let r = t[n];
      qE(r);
    } else mn(t[n]) && Hc(t[n]);
}
function FI(t) {
  let e = t._views;
  for (let n of e) {
    let r = nE(n);
    if (r !== null && r[et] !== null)
      if (mn(r)) Hc(r);
      else {
        let i = r[et];
        Hc(i), qE(r);
      }
  }
}
var jI = new RegExp(`^(\\d+)*(${dh}|${uh})*(.*)`);
function HI(t, e) {
  let n = [t];
  for (let r of e) {
    let i = n.length - 1;
    if (i > 0 && n[i - 1] === r) {
      let s = n[i] || 1;
      n[i] = s + 1;
    } else n.push(r, '');
  }
  return n.join('');
}
function BI(t) {
  let e = t.match(jI),
    [n, r, i, s] = e,
    o = r ? parseInt(r, 10) : i,
    a = [];
  for (let [c, l, u] of s.matchAll(/(f|n)(\d*)/g)) {
    let d = parseInt(u, 10) || 1;
    a.push(l, d);
  }
  return [o, ...a];
}
function VI(t) {
  return !t.prev && t.parent?.type === 8;
}
function Ed(t) {
  return t.index - Ge;
}
function Js(t, e) {
  return !(t.type & 16) && !!e[t.index] && !ot(e[t.index])?.isConnected;
}
function dl(t, e, n, r) {
  let i = null,
    s = Ed(r),
    o = t.data[Xd];
  if (o?.[s]) i = $I(o[s], n);
  else if (e.firstChild === r) i = t.firstChild;
  else {
    let a = r.prev === null,
      c = r.prev ?? r.parent;
    if (VI(r)) {
      let l = Ed(r.parent);
      i = Jd(t, l);
    } else {
      let l = Ft(c, n);
      if (a) i = l.firstChild;
      else {
        let u = Ed(c),
          d = Jd(t, u);
        if (c.type === 2 && d) {
          let E = mh(t, u) + 1;
          i = fl(E, d);
        } else i = l.nextSibling;
      }
    }
  }
  return i;
}
function fl(t, e) {
  let n = e;
  for (let r = 0; r < t; r++) n = n.nextSibling;
  return n;
}
function UI(t, e) {
  let n = t;
  for (let r = 0; r < e.length; r += 2) {
    let i = e[r],
      s = e[r + 1];
    for (let o = 0; o < s; o++)
      switch (i) {
        case Qs.FirstChild:
          n = n.firstChild;
          break;
        case Qs.NextSibling:
          n = n.nextSibling;
          break;
      }
  }
  return n;
}
function $I(t, e) {
  let [n, ...r] = BI(t),
    i;
  if (n === uh) i = e[Tt][et];
  else if (n === dh) i = HS(e[Tt][et]);
  else {
    let s = Number(n);
    i = ot(e[s + Ge]);
  }
  return UI(i, r);
}
function Ef(t, e) {
  if (t === e) return [];
  if (t.parentElement == null || e.parentElement == null) return null;
  if (t.parentElement === e.parentElement) return qI(t, e);
  {
    let n = e.parentElement,
      r = Ef(t, n),
      i = Ef(n.firstChild, e);
    return !r || !i ? null : [...r, Qs.FirstChild, ...i];
  }
}
function qI(t, e) {
  let n = [],
    r = null;
  for (r = t; r != null && r !== e; r = r.nextSibling) n.push(Qs.NextSibling);
  return r == null ? null : n;
}
function ry(t, e, n) {
  let r = Ef(t, e);
  return r === null ? null : HI(n, r);
}
function zI(t, e) {
  let n = t.parent,
    r,
    i,
    s;
  for (; n !== null && Js(n, e); ) n = n.parent;
  n === null || !(n.type & 3)
    ? ((r = s = uh), (i = e[Tt][et]))
    : ((r = n.index), (i = ot(e[r])), (s = io(r - Ge)));
  let o = ot(e[t.index]);
  if (t.type & 12) {
    let c = js(e, t);
    c && (o = c);
  }
  let a = ry(i, o, s);
  if (a === null && i !== o) {
    let c = i.ownerDocument.body;
    if (((a = ry(c, o, dh)), a === null)) throw CI(e, t);
  }
  return a;
}
function GI(t, e) {
  let n = [];
  for (let r of e)
    for (let i = 0; i < (r[kc] ?? 1); i++) {
      let s = { data: r, firstChild: null };
      r[Wi] > 0 && ((s.firstChild = t), (t = fl(r[Wi], t))), n.push(s);
    }
  return [t, n];
}
var zE = (t, e) => null;
function WI(t, e) {
  let n = t[qs];
  return !e || n === null || n.length === 0
    ? null
    : n[0].data[Zd] === e
    ? n.shift()
    : ($E(t), null);
}
function KI() {
  zE = WI;
}
function eo(t, e) {
  return zE(t, e);
}
var bf = class {
  destroy(e) {}
  updateValue(e, n) {}
  swap(e, n) {
    let r = Math.min(e, n),
      i = Math.max(e, n),
      s = this.detach(i);
    if (i - r > 1) {
      let o = this.detach(r);
      this.attach(r, s), this.attach(i, o);
    } else this.attach(r, s);
  }
  move(e, n) {
    this.attach(n, this.detach(e));
  }
};
function bd(t, e, n, r, i) {
  return t === n && Object.is(e, r) ? 1 : Object.is(i(t, e), i(n, r)) ? -1 : 0;
}
function QI(t, e, n) {
  let r,
    i,
    s = 0,
    o = t.length - 1;
  if (Array.isArray(e)) {
    let a = e.length - 1;
    for (; s <= o && s <= a; ) {
      let c = t.at(s),
        l = e[s],
        u = bd(s, c, s, l, n);
      if (u !== 0) {
        u < 0 && t.updateValue(s, l), s++;
        continue;
      }
      let d = t.at(o),
        m = e[a],
        E = bd(o, d, a, m, n);
      if (E !== 0) {
        E < 0 && t.updateValue(o, m), o--, a--;
        continue;
      }
      let I = n(s, c),
        M = n(o, d),
        j = n(s, l);
      if (Object.is(j, M)) {
        let O = n(a, m);
        Object.is(O, I)
          ? (t.swap(s, o), t.updateValue(o, m), a--, o--)
          : t.move(o, s),
          t.updateValue(s, l),
          s++;
        continue;
      }
      if (((r ??= new Bc()), (i ??= sy(t, s, o, n)), wf(t, r, s, j)))
        t.updateValue(s, l), s++, o++;
      else if (i.has(j)) r.set(I, t.detach(s)), o--;
      else {
        let O = t.create(s, e[s]);
        t.attach(s, O), s++, o++;
      }
    }
    for (; s <= a; ) iy(t, r, n, s, e[s]), s++;
  } else if (e != null) {
    let a = e[Symbol.iterator](),
      c = a.next();
    for (; !c.done && s <= o; ) {
      let l = t.at(s),
        u = c.value,
        d = bd(s, l, s, u, n);
      if (d !== 0) d < 0 && t.updateValue(s, u), s++, (c = a.next());
      else {
        (r ??= new Bc()), (i ??= sy(t, s, o, n));
        let m = n(s, u);
        if (wf(t, r, s, m)) t.updateValue(s, u), s++, o++, (c = a.next());
        else if (!i.has(m))
          t.attach(s, t.create(s, u)), s++, o++, (c = a.next());
        else {
          let E = n(s, l);
          r.set(E, t.detach(s)), o--;
        }
      }
    }
    for (; !c.done; ) iy(t, r, n, t.length, c.value), (c = a.next());
  }
  for (; s <= o; ) t.destroy(t.detach(o--));
  r?.forEach((a) => {
    t.destroy(a);
  });
}
function wf(t, e, n, r) {
  return e !== void 0 && e.has(r)
    ? (t.attach(n, e.get(r)), e.delete(r), !0)
    : !1;
}
function iy(t, e, n, r, i) {
  if (wf(t, e, r, n(r, i))) t.updateValue(r, i);
  else {
    let s = t.create(r, i);
    t.attach(r, s);
  }
}
function sy(t, e, n, r) {
  let i = new Set();
  for (let s = e; s <= n; s++) i.add(r(s, t.at(s)));
  return i;
}
var Bc = class {
  constructor() {
    (this.kvMap = new Map()), (this._vMap = void 0);
  }
  has(e) {
    return this.kvMap.has(e);
  }
  delete(e) {
    if (!this.has(e)) return !1;
    let n = this.kvMap.get(e);
    return (
      this._vMap !== void 0 && this._vMap.has(n)
        ? (this.kvMap.set(e, this._vMap.get(n)), this._vMap.delete(n))
        : this.kvMap.delete(e),
      !0
    );
  }
  get(e) {
    return this.kvMap.get(e);
  }
  set(e, n) {
    if (this.kvMap.has(e)) {
      let r = this.kvMap.get(e);
      this._vMap === void 0 && (this._vMap = new Map());
      let i = this._vMap;
      for (; i.has(r); ) r = i.get(r);
      i.set(r, n);
    } else this.kvMap.set(e, n);
  }
  forEach(e) {
    for (let [n, r] of this.kvMap)
      if ((e(r, n), this._vMap !== void 0)) {
        let i = this._vMap;
        for (; i.has(r); ) (r = i.get(r)), e(r, n);
      }
  }
};
function hl(t, e, n, r) {
  let i = e.tView,
    o = t[de] & 4096 ? 4096 : 16,
    a = cl(
      t,
      i,
      n,
      o,
      null,
      e,
      null,
      null,
      null,
      r?.injector ?? null,
      r?.dehydratedView ?? null
    ),
    c = t[e.index];
  a[oo] = c;
  let l = t[pn];
  return l !== null && (a[pn] = l.createEmbeddedView(i)), wh(i, a, n), a;
}
function GE(t, e) {
  let n = ct + e;
  if (n < t.length) return t[n];
}
function to(t, e) {
  return !e || e.firstChild === null || xc(t);
}
function pl(t, e, n, r = !0) {
  let i = e[fe];
  if ((tC(i, e, t, n), r)) {
    let o = Hd(n, t),
      a = e[Be],
      c = ah(a, t[Fn]);
    c !== null && XS(i, t[Pt], a, e, c, o);
  }
  let s = e[nn];
  s !== null && s.firstChild !== null && (s.firstChild = null);
}
function WE(t, e) {
  let n = Ks(t, e);
  return n !== void 0 && nl(n[fe], n), n;
}
var oi = (() => {
  let e = class e {};
  e.__NG_ELEMENT_ID__ = YI;
  let t = e;
  return t;
})();
function YI() {
  let t = Ot();
  return QE(t, Me());
}
var ZI = oi,
  KE = class extends ZI {
    constructor(e, n, r) {
      super(),
        (this._lContainer = e),
        (this._hostTNode = n),
        (this._hostLView = r);
    }
    get element() {
      return ns(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new Kr(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let e = Yf(this._hostTNode, this._hostLView);
      if (ov(e)) {
        let n = Cc(e, this._hostLView),
          r = Sc(e),
          i = n[fe].data[r + 8];
        return new Kr(i, n);
      } else return new Kr(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(e) {
      let n = oy(this._lContainer);
      return (n !== null && n[e]) || null;
    }
    get length() {
      return this._lContainer.length - ct;
    }
    createEmbeddedView(e, n, r) {
      let i, s;
      typeof r == 'number'
        ? (i = r)
        : r != null && ((i = r.index), (s = r.injector));
      let o = eo(this._lContainer, e.ssrId),
        a = e.createEmbeddedViewImpl(n || {}, s, o);
      return this.insertImpl(a, i, to(this._hostTNode, o)), a;
    }
    createComponent(e, n, r, i, s) {
      let o = e && !mS(e),
        a;
      if (o) a = n;
      else {
        let I = n || {};
        (a = I.index),
          (r = I.injector),
          (i = I.projectableNodes),
          (s = I.environmentInjector || I.ngModuleRef);
      }
      let c = o ? e : new Ki(Ln(e)),
        l = r || this.parentInjector;
      if (!s && c.ngModule == null) {
        let M = (o ? l : this.parentInjector).get(Rt, null);
        M && (s = M);
      }
      let u = Ln(c.componentType ?? {}),
        d = eo(this._lContainer, u?.id ?? null),
        m = d?.firstChild ?? null,
        E = c.create(l, i, m, s);
      return this.insertImpl(E.hostView, a, to(this._hostTNode, d)), E;
    }
    insert(e, n) {
      return this.insertImpl(e, n, !0);
    }
    insertImpl(e, n, r) {
      let i = e._lView;
      if (RT(i)) {
        let a = this.indexOf(e);
        if (a !== -1) this.detach(a);
        else {
          let c = i[Ze],
            l = new KE(c, c[Pt], c[Ze]);
          l.detach(l.indexOf(e));
        }
      }
      let s = this._adjustIndex(n),
        o = this._lContainer;
      return pl(o, i, s, r), e.attachToViewContainerRef(), yv(wd(o), s, e), e;
    }
    move(e, n) {
      return this.insert(e, n);
    }
    indexOf(e) {
      let n = oy(this._lContainer);
      return n !== null ? n.indexOf(e) : -1;
    }
    remove(e) {
      let n = this._adjustIndex(e, -1),
        r = Ks(this._lContainer, n);
      r && (Mc(wd(this._lContainer), n), nl(r[fe], r));
    }
    detach(e) {
      let n = this._adjustIndex(e, -1),
        r = Ks(this._lContainer, n);
      return r && Mc(wd(this._lContainer), n) != null ? new ni(r) : null;
    }
    _adjustIndex(e, n = 0) {
      return e ?? this.length + n;
    }
  };
function oy(t) {
  return t[Dc];
}
function wd(t) {
  return t[Dc] || (t[Dc] = []);
}
function QE(t, e) {
  let n,
    r = e[t.index];
  return (
    St(r) ? (n = r) : ((n = DE(r, e, null, t)), (e[t.index] = n), ll(e, n)),
    YE(n, e, t, r),
    new KE(n, t, e)
  );
}
function XI(t, e) {
  let n = t[Be],
    r = n.createComment(''),
    i = Ft(e, t),
    s = ah(n, i);
  return Oc(n, s, r, aC(n, i), !1), r;
}
var YE = ZE,
  _h = (t, e, n) => !1;
function JI(t, e, n) {
  return _h(t, e, n);
}
function ZE(t, e, n, r) {
  if (t[Fn]) return;
  let i;
  n.type & 8 ? (i = ot(r)) : (i = XI(e, n)), (t[Fn] = i);
}
function eM(t, e, n) {
  if (t[Fn] && t[qs]) return !0;
  let r = n[nn],
    i = e.index - Ge;
  if (!r || Rc(e) || ol(r, i)) return !1;
  let o = Jd(r, i),
    a = r.data[Ys]?.[i],
    [c, l] = GI(o, a);
  return (t[Fn] = c), (t[qs] = l), !0;
}
function tM(t, e, n, r) {
  _h(t, n, e) || ZE(t, e, n, r);
}
function nM() {
  (YE = tM), (_h = eM);
}
function rM(t, e, n, r, i, s, o, a, c) {
  let l = e.consts,
    u = go(e, t, 4, o || null, Tc(l, a));
  EE(e, n, u, Tc(l, c)), Qf(e, u);
  let d = (u.tView = gh(
    2,
    u,
    r,
    i,
    s,
    e.directiveRegistry,
    e.pipeRegistry,
    null,
    e.schemas,
    l,
    null
  ));
  return (
    e.queries !== null &&
      (e.queries.template(e, u), (d.queries = e.queries.embeddedTView(u))),
    u
  );
}
function _f(t, e, n, r, i, s, o, a) {
  let c = Me(),
    l = ht(),
    u = t + Ge,
    d = l.firstCreatePass ? rM(u, l, c, e, n, r, i, s, o) : l.data[u];
  co(d, !1);
  let m = XE(l, c, d, t);
  Kf() && ch(l, c, m, d), ei(m, c);
  let E = DE(m, c, m, d);
  return (
    (c[u] = E),
    ll(c, E),
    JI(E, d, c),
    Bf(d) && pE(l, c, d),
    o != null && mE(c, d, a),
    _f
  );
}
var XE = JE;
function JE(t, e, n, r) {
  return wr(!0), e[Be].createComment('');
}
function iM(t, e, n, r) {
  let i = e[nn],
    s = !i || Ji() || ol(i, r);
  if ((wr(s), s)) return JE(t, e, n, r);
  let o = i.data[Yd]?.[r] ?? null;
  o !== null &&
    n.tView !== null &&
    n.tView.ssrId === null &&
    (n.tView.ssrId = o);
  let a = dl(i, t, e, n);
  sl(i, r, a);
  let c = mh(i, r);
  return fl(c, a);
}
function sM() {
  XE = iM;
}
function n6(t, e, n) {
  Dr('NgControlFlow');
  let r = Me(),
    i = es(),
    s = Cf(r, Ge + t),
    o = 0;
  if (Tr(r, i, e)) {
    let a = ut(null);
    try {
      if ((WE(s, o), e !== -1)) {
        let c = If(r[fe], Ge + e),
          l = eo(s, c.tView.ssrId),
          u = hl(r, c, n, { dehydratedView: l });
        pl(s, u, o, to(c, l));
      }
    } finally {
      ut(a);
    }
  } else {
    let a = GE(s, o);
    a !== void 0 && (a[ft] = n);
  }
}
var Df = class {
  constructor(e, n, r) {
    (this.lContainer = e), (this.$implicit = n), (this.$index = r);
  }
  get $count() {
    return this.lContainer.length - ct;
  }
};
function r6(t, e) {
  return e;
}
var Tf = class {
  constructor(e, n, r) {
    (this.hasEmptyBlock = e), (this.trackByFn = n), (this.liveCollection = r);
  }
};
function i6(t, e, n, r, i, s, o, a, c, l, u) {
  Dr('NgControlFlow');
  let d = c !== void 0,
    m = Me(),
    E = a ? o.bind(m[Tt][ft]) : o,
    I = new Tf(d, E);
  (m[Ge + t] = I), _f(t + 1, e, n, r, i, s), d && _f(t + 2, c, l, u);
}
var Sf = class extends bf {
  constructor(e, n, r) {
    super(),
      (this.lContainer = e),
      (this.hostLView = n),
      (this.templateTNode = r),
      (this.needsIndexUpdate = !1);
  }
  get length() {
    return this.lContainer.length - ct;
  }
  at(e) {
    return this.getLView(e)[ft].$implicit;
  }
  attach(e, n) {
    let r = n[nn];
    (this.needsIndexUpdate ||= e !== this.length),
      pl(this.lContainer, n, e, to(this.templateTNode, r));
  }
  detach(e) {
    return (
      (this.needsIndexUpdate ||= e !== this.length - 1), oM(this.lContainer, e)
    );
  }
  create(e, n) {
    let r = eo(this.lContainer, this.templateTNode.tView.ssrId);
    return hl(
      this.hostLView,
      this.templateTNode,
      new Df(this.lContainer, n, e),
      { dehydratedView: r }
    );
  }
  destroy(e) {
    nl(e[fe], e);
  }
  updateValue(e, n) {
    this.getLView(e)[ft].$implicit = n;
  }
  reset() {
    this.needsIndexUpdate = !1;
  }
  updateIndexes() {
    if (this.needsIndexUpdate)
      for (let e = 0; e < this.length; e++) this.getLView(e)[ft].$index = e;
  }
  getLView(e) {
    return aM(this.lContainer, e);
  }
};
function s6(t) {
  let e = ut(null),
    n = br();
  try {
    let r = Me(),
      i = r[fe],
      s = r[n];
    if (s.liveCollection === void 0) {
      let a = n + 1,
        c = Cf(r, a),
        l = If(i, a);
      s.liveCollection = new Sf(c, r, l);
    } else s.liveCollection.reset();
    let o = s.liveCollection;
    if ((QI(o, t, s.trackByFn), o.updateIndexes(), s.hasEmptyBlock)) {
      let a = es(),
        c = o.length === 0;
      if (Tr(r, a, c)) {
        let l = n + 2,
          u = Cf(r, l);
        if (c) {
          let d = If(i, l),
            m = eo(u, d.tView.ssrId),
            E = hl(r, d, void 0, { dehydratedView: m });
          pl(u, E, 0, to(d, m));
        } else WE(u, 0);
      }
    }
  } finally {
    ut(e);
  }
}
function Cf(t, e) {
  return t[e];
}
function oM(t, e) {
  return Ks(t, e);
}
function aM(t, e) {
  return GE(t, e);
}
function If(t, e) {
  return Uf(t, e);
}
function cM(t, e, n, r, i, s) {
  let o = e.consts,
    a = Tc(o, i),
    c = go(e, t, 2, r, a);
  return (
    EE(e, n, c, Tc(o, s)),
    c.attrs !== null && ff(c, c.attrs, !1),
    c.mergedAttrs !== null && ff(c, c.mergedAttrs, !0),
    e.queries !== null && e.queries.elementStart(e, c),
    c
  );
}
function eb(t, e, n, r) {
  let i = Me(),
    s = ht(),
    o = Ge + t,
    a = i[Be],
    c = s.firstCreatePass ? cM(o, s, i, e, n, r) : s.data[o],
    l = nb(s, i, c, a, e, t);
  i[o] = l;
  let u = Bf(c);
  return (
    co(c, !0),
    qv(a, l, c),
    (c.flags & 32) !== 32 && Kf() && ch(s, i, l, c),
    PT() === 0 && ei(l, i),
    FT(),
    u && (pE(s, i, c), hE(s, c, i)),
    r !== null && mE(i, c),
    eb
  );
}
function tb() {
  let t = Ot();
  Ky() ? Qy() : ((t = t.parent), co(t, !1));
  let e = t;
  HT(e) && VT(), jT();
  let n = ht();
  return (
    n.firstCreatePass && (Qf(n, t), Py(t) && n.queries.elementEnd(t)),
    e.classesWithoutHost != null &&
      nS(e) &&
      yf(n, e, Me(), e.classesWithoutHost, !0),
    e.stylesWithoutHost != null &&
      rS(e) &&
      yf(n, e, Me(), e.stylesWithoutHost, !1),
    tb
  );
}
function Dh(t, e, n, r) {
  return eb(t, e, n, r), tb(), Dh;
}
var nb = (t, e, n, r, i, s) => (wr(!0), sh(r, i, rv()));
function lM(t, e, n, r, i, s) {
  let o = e[nn],
    a = !o || Ji() || ol(o, s);
  if ((wr(a), a)) return sh(r, i, rv());
  let c = dl(o, t, e, n);
  return (
    rE(o, s) && sl(o, s, c.nextSibling),
    o && (Mv(n) || Nv(c)) && Xi(n) && (BT(n), Vv(c)),
    c
  );
}
function uM() {
  nb = lM;
}
var dM = (t, e, n, r) => (wr(!0), Lv(e[Be], ''));
function fM(t, e, n, r) {
  let i,
    s = e[nn],
    o = !s || Ji();
  if ((wr(o), o)) return Lv(e[Be], '');
  let a = dl(s, t, e, n),
    c = FC(s, r);
  return sl(s, r, a), (i = fl(c, a)), i;
}
function hM() {
  dM = fM;
}
function o6() {
  return Me();
}
function pM(t, e, n) {
  let r = Me(),
    i = es();
  if (Tr(r, i, e)) {
    let s = ht(),
      o = Wf();
    vE(s, o, r, t, e, r[Be], n, !0);
  }
  return pM;
}
var Yi = 'en-US';
var mM = Yi;
function rb(t) {
  KD(t, 'Expected localeId to be defined'),
    typeof t == 'string' && (mM = t.toLowerCase().replace(/_/g, '-'));
}
function yo(t) {
  return !!t && typeof t.then == 'function';
}
function ib(t) {
  return !!t && typeof t.subscribe == 'function';
}
function sb(t, e, n, r) {
  let i = Me(),
    s = ht(),
    o = Ot();
  return yM(s, i, i[Be], o, t, e, r), sb;
}
function gM(t, e, n, r) {
  let i = t.cleanup;
  if (i != null)
    for (let s = 0; s < i.length - 1; s += 2) {
      let o = i[s];
      if (o === n && i[s + 1] === r) {
        let a = e[Us],
          c = i[s + 2];
        return a.length > c ? a[c] : null;
      }
      typeof o == 'string' && (s += 2);
    }
  return null;
}
function yM(t, e, n, r, i, s, o) {
  let a = Bf(r),
    l = t.firstCreatePass && CE(t),
    u = e[ft],
    d = SE(e),
    m = !0;
  if (r.type & 3 || o) {
    let M = Ft(r, e),
      j = o ? o(M) : M,
      O = d.length,
      D = o ? (S) => o(ot(S[r.index])) : r.index,
      _ = null;
    if ((!o && a && (_ = gM(t, e, i, r.index)), _ !== null)) {
      let S = _.__ngLastListenerFn__ || _;
      (S.__ngNextListenerFn__ = s), (_.__ngLastListenerFn__ = s), (m = !1);
    } else {
      s = cy(r, e, u, s, !1);
      let S = n.listen(j, i, s);
      d.push(s, S), l && l.push(i, D, O, O + 1);
    }
  } else s = cy(r, e, u, s, !1);
  let E = r.outputs,
    I;
  if (m && E !== null && (I = E[i])) {
    let M = I.length;
    if (M)
      for (let j = 0; j < M; j += 2) {
        let O = I[j],
          D = I[j + 1],
          b = e[O][D].subscribe(s),
          ne = d.length;
        d.push(s, b), l && l.push(i, r.index, ne, -(ne + 1));
      }
  }
}
function ay(t, e, n, r) {
  try {
    return fn(6, e, n), n(r) !== !1;
  } catch (i) {
    return IE(t, i), !1;
  } finally {
    fn(7, e, n);
  }
}
function cy(t, e, n, r, i) {
  return function s(o) {
    if (o === Function) return r;
    let a = t.componentOffset > -1 ? Er(t.index, e) : e;
    vh(a);
    let c = ay(e, n, r, o),
      l = s.__ngNextListenerFn__;
    for (; l; ) (c = ay(e, n, l, o) && c), (l = l.__ngNextListenerFn__);
    return i && c === !1 && o.preventDefault(), c;
  };
}
function a6(t = 1) {
  return YT(t);
}
function vM(t, e) {
  let n = null,
    r = fT(t);
  for (let i = 0; i < e.length; i++) {
    let s = e[i];
    if (s === '*') {
      n = i;
      continue;
    }
    if (r === null ? Iy(t, s, !0) : mT(r, s)) return i;
  }
  return n;
}
function c6(t) {
  let e = Me()[Tt][Pt];
  if (!e.projection) {
    let n = t ? t.length : 1,
      r = (e.projection = vv(n, null)),
      i = r.slice(),
      s = e.child;
    for (; s !== null; ) {
      let o = t ? vM(s, t) : 0;
      o !== null && (i[o] ? (i[o].projectionNext = s) : (r[o] = s), (i[o] = s)),
        (s = s.next);
    }
  }
}
function l6(t, e = 0, n) {
  let r = Me(),
    i = ht(),
    s = go(i, Ge + t, 16, null, n || null);
  s.projection === null && (s.projection = e),
    Qy(),
    (!r[nn] || Ji()) && (s.flags & 32) !== 32 && uC(i, r, s);
}
function u6(t) {
  let e = $T();
  return AT(e, Ge + t);
}
function d6(t, e = '') {
  let n = Me(),
    r = ht(),
    i = t + Ge,
    s = r.firstCreatePass ? go(r, i, 1, e, null) : r.data[i],
    o = ob(r, n, s, e, t);
  (n[i] = o), Kf() && ch(r, n, o, s), co(s, !1);
}
var ob = (t, e, n, r, i) => (wr(!0), kv(e[Be], r));
function EM(t, e, n, r, i) {
  let s = e[nn],
    o = !s || Ji() || ol(s, i);
  return wr(o), o ? kv(e[Be], r) : dl(s, t, e, n);
}
function bM() {
  ob = EM;
}
function wM(t) {
  return ab('', t, ''), wM;
}
function ab(t, e, n) {
  let r = Me(),
    i = nI(r, t, e, n);
  return i !== _r && w1(r, br(), i), ab;
}
function _M(t, e, n) {
  let r = ht();
  if (r.firstCreatePass) {
    let i = mr(t);
    Mf(n, r.data, r.blueprint, i, !0), Mf(e, r.data, r.blueprint, i, !1);
  }
}
function Mf(t, e, n, r, i) {
  if (((t = wt(t)), Array.isArray(t)))
    for (let s = 0; s < t.length; s++) Mf(t[s], e, n, r, i);
  else {
    let s = ht(),
      o = Me(),
      a = Ot(),
      c = Gi(t) ? t : wt(t.provide),
      l = Sv(t),
      u = a.providerIndexes & 1048575,
      d = a.directiveStart,
      m = a.providerIndexes >> 20;
    if (Gi(t) || !t.multi) {
      let E = new Zr(l, i, rs),
        I = Dd(c, e, i ? u : u + m, d);
      I === -1
        ? (Od(Ic(a, o), s, c),
          _d(s, t, e.length),
          e.push(c),
          a.directiveStart++,
          a.directiveEnd++,
          i && (a.providerIndexes += 1048576),
          n.push(E),
          o.push(E))
        : ((n[I] = E), (o[I] = E));
    } else {
      let E = Dd(c, e, u + m, d),
        I = Dd(c, e, u, u + m),
        M = E >= 0 && n[E],
        j = I >= 0 && n[I];
      if ((i && !j) || (!i && !M)) {
        Od(Ic(a, o), s, c);
        let O = SM(i ? TM : DM, n.length, i, r, l);
        !i && j && (n[I].providerFactory = O),
          _d(s, t, e.length, 0),
          e.push(c),
          a.directiveStart++,
          a.directiveEnd++,
          i && (a.providerIndexes += 1048576),
          n.push(O),
          o.push(O);
      } else {
        let O = cb(n[i ? I : E], l, !i && r);
        _d(s, t, E > -1 ? E : I, O);
      }
      !i && r && j && n[I].componentProviders++;
    }
  }
}
function _d(t, e, n, r) {
  let i = Gi(e),
    s = AS(e);
  if (i || s) {
    let c = (s ? wt(e.useClass) : e).prototype.ngOnDestroy;
    if (c) {
      let l = t.destroyHooks || (t.destroyHooks = []);
      if (!i && e.multi) {
        let u = l.indexOf(n);
        u === -1 ? l.push(n, [r, c]) : l[u + 1].push(r, c);
      } else l.push(n, c);
    }
  }
}
function cb(t, e, n) {
  return n && t.componentProviders++, t.multi.push(e) - 1;
}
function Dd(t, e, n, r) {
  for (let i = n; i < r; i++) if (e[i] === t) return i;
  return -1;
}
function DM(t, e, n, r) {
  return Nf(this.multi, []);
}
function TM(t, e, n, r) {
  let i = this.multi,
    s;
  if (this.providerFactory) {
    let o = this.providerFactory.componentProviders,
      a = Xr(n, n[fe], this.providerFactory.index, r);
    (s = a.slice(0, o)), Nf(i, s);
    for (let c = o; c < a.length; c++) s.push(a[c]);
  } else (s = []), Nf(i, s);
  return s;
}
function Nf(t, e) {
  for (let n = 0; n < t.length; n++) {
    let r = t[n];
    e.push(r());
  }
  return e;
}
function SM(t, e, n, r, i) {
  let s = new Zr(t, n, rs);
  return (
    (s.multi = []),
    (s.index = e),
    (s.componentProviders = 0),
    cb(s, i, r && !n),
    s
  );
}
function f6(t, e = []) {
  return (n) => {
    n.providersResolver = (r, i) => _M(r, i ? i(t) : t, e);
  };
}
var gr = class {},
  no = class {};
var Vc = class extends gr {
    constructor(e, n, r) {
      super(),
        (this._parent = n),
        (this._bootstrapComponents = []),
        (this.destroyCbs = []),
        (this.componentFactoryResolver = new Pc(this));
      let i = Ry(e);
      (this._bootstrapComponents = Iv(i.bootstrap)),
        (this._r3Injector = Cv(
          e,
          n,
          [
            { provide: gr, useValue: this },
            { provide: al, useValue: this.componentFactoryResolver },
            ...r,
          ],
          Dt(e),
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
        this.destroyCbs.forEach((n) => n()),
        (this.destroyCbs = null);
    }
    onDestroy(e) {
      this.destroyCbs.push(e);
    }
  },
  Uc = class extends no {
    constructor(e) {
      super(), (this.moduleType = e);
    }
    create(e) {
      return new Vc(this.moduleType, e, []);
    }
  };
function CM(t, e, n) {
  return new Vc(t, e, n);
}
var $c = class extends gr {
  constructor(e) {
    super(),
      (this.componentFactoryResolver = new Pc(this)),
      (this.instance = null);
    let n = new Gs(
      [
        ...e.providers,
        { provide: gr, useValue: this },
        { provide: al, useValue: this.componentFactoryResolver },
      ],
      e.parent || th(),
      e.debugName,
      new Set(['environment'])
    );
    (this.injector = n),
      e.runEnvironmentInitializers && n.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(e) {
    this.injector.onDestroy(e);
  }
};
function ml(t, e, n = null) {
  return new $c({
    providers: t,
    parent: e,
    debugName: n,
    runEnvironmentInitializers: !0,
  }).injector;
}
var IM = (() => {
  let e = class e {
    constructor(r) {
      (this._injector = r), (this.cachedInjectors = new Map());
    }
    getOrCreateStandaloneInjector(r) {
      if (!r.standalone) return null;
      if (!this.cachedInjectors.has(r)) {
        let i = _v(!1, r.type),
          s =
            i.length > 0
              ? ml([i], this._injector, `Standalone[${r.type.name}]`)
              : null;
        this.cachedInjectors.set(r, s);
      }
      return this.cachedInjectors.get(r);
    }
    ngOnDestroy() {
      try {
        for (let r of this.cachedInjectors.values()) r !== null && r.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
  };
  e.ɵprov = J({
    token: e,
    providedIn: 'environment',
    factory: () => new e(X(Rt)),
  });
  let t = e;
  return t;
})();
function lb(t) {
  Dr('NgStandalone'),
    (t.getStandaloneInjector = (e) =>
      e.get(IM).getOrCreateStandaloneInjector(t));
}
function MM() {
  return this._results[Symbol.iterator]();
}
var Af = class t {
    get changes() {
      return (this._changes ??= new gt());
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
      let n = t.prototype;
      n[Symbol.iterator] || (n[Symbol.iterator] = MM);
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
    reduce(e, n) {
      return this._results.reduce(e, n);
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
    reset(e, n) {
      this.dirty = !1;
      let r = yS(e);
      (this._changesDetected = !gS(this._results, r, n)) &&
        ((this._results = r),
        (this.length = r.length),
        (this.last = r[this.length - 1]),
        (this.first = r[0]));
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
  ro = (() => {
    let e = class e {};
    e.__NG_ELEMENT_ID__ = xM;
    let t = e;
    return t;
  })(),
  NM = ro,
  AM = class extends NM {
    constructor(e, n, r) {
      super(),
        (this._declarationLView = e),
        (this._declarationTContainer = n),
        (this.elementRef = r);
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(e, n) {
      return this.createEmbeddedViewImpl(e, n);
    }
    createEmbeddedViewImpl(e, n, r) {
      let i = hl(this._declarationLView, this._declarationTContainer, e, {
        injector: n,
        dehydratedView: r,
      });
      return new ni(i);
    }
  };
function xM() {
  return gl(Ot(), Me());
}
function gl(t, e) {
  return t.type & 4 ? new AM(e, t, ns(t, e)) : null;
}
var xf = class t {
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
  Rf = class t {
    constructor(e = []) {
      this.queries = e;
    }
    createEmbeddedView(e) {
      let n = e.queries;
      if (n !== null) {
        let r = e.contentQueries !== null ? e.contentQueries[0] : n.length,
          i = [];
        for (let s = 0; s < r; s++) {
          let o = n.getByIndex(s),
            a = this.queries[o.indexInDeclarationView];
          i.push(a.clone());
        }
        return new t(i);
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
      for (let n = 0; n < this.queries.length; n++)
        hb(e, n).matches !== null && this.queries[n].setDirty();
    }
  },
  qc = class {
    constructor(e, n, r = null) {
      (this.predicate = e), (this.flags = n), (this.read = r);
    }
  },
  Of = class t {
    constructor(e = []) {
      this.queries = e;
    }
    elementStart(e, n) {
      for (let r = 0; r < this.queries.length; r++)
        this.queries[r].elementStart(e, n);
    }
    elementEnd(e) {
      for (let n = 0; n < this.queries.length; n++)
        this.queries[n].elementEnd(e);
    }
    embeddedTView(e) {
      let n = null;
      for (let r = 0; r < this.length; r++) {
        let i = n !== null ? n.length : 0,
          s = this.getByIndex(r).embeddedTView(e, i);
        s &&
          ((s.indexInDeclarationView = r), n !== null ? n.push(s) : (n = [s]));
      }
      return n !== null ? new t(n) : null;
    }
    template(e, n) {
      for (let r = 0; r < this.queries.length; r++)
        this.queries[r].template(e, n);
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
  kf = class t {
    constructor(e, n = -1) {
      (this.metadata = e),
        (this.matches = null),
        (this.indexInDeclarationView = -1),
        (this.crossesNgTemplate = !1),
        (this._appliesToNextNode = !0),
        (this._declarationNodeIndex = n);
    }
    elementStart(e, n) {
      this.isApplyingToNode(n) && this.matchTNode(e, n);
    }
    elementEnd(e) {
      this._declarationNodeIndex === e.index && (this._appliesToNextNode = !1);
    }
    template(e, n) {
      this.elementStart(e, n);
    }
    embeddedTView(e, n) {
      return this.isApplyingToNode(e)
        ? ((this.crossesNgTemplate = !0),
          this.addMatch(-e.index, n),
          new t(this.metadata))
        : null;
    }
    isApplyingToNode(e) {
      if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
        let n = this._declarationNodeIndex,
          r = e.parent;
        for (; r !== null && r.type & 8 && r.index !== n; ) r = r.parent;
        return n === (r !== null ? r.index : -1);
      }
      return this._appliesToNextNode;
    }
    matchTNode(e, n) {
      let r = this.metadata.predicate;
      if (Array.isArray(r))
        for (let i = 0; i < r.length; i++) {
          let s = r[i];
          this.matchTNodeWithReadOption(e, n, RM(n, s)),
            this.matchTNodeWithReadOption(e, n, gc(n, e, s, !1, !1));
        }
      else
        r === ro
          ? n.type & 4 && this.matchTNodeWithReadOption(e, n, -1)
          : this.matchTNodeWithReadOption(e, n, gc(n, e, r, !1, !1));
    }
    matchTNodeWithReadOption(e, n, r) {
      if (r !== null) {
        let i = this.metadata.read;
        if (i !== null)
          if (i === si || i === oi || (i === ro && n.type & 4))
            this.addMatch(n.index, -2);
          else {
            let s = gc(n, e, i, !1, !1);
            s !== null && this.addMatch(n.index, s);
          }
        else this.addMatch(n.index, r);
      }
    }
    addMatch(e, n) {
      this.matches === null ? (this.matches = [e, n]) : this.matches.push(e, n);
    }
  };
function RM(t, e) {
  let n = t.localNames;
  if (n !== null) {
    for (let r = 0; r < n.length; r += 2) if (n[r] === e) return n[r + 1];
  }
  return null;
}
function OM(t, e) {
  return t.type & 11 ? ns(t, e) : t.type & 4 ? gl(t, e) : null;
}
function kM(t, e, n, r) {
  return n === -1 ? OM(e, t) : n === -2 ? LM(t, e, r) : Xr(t, t[fe], n, e);
}
function LM(t, e, n) {
  if (n === si) return ns(e, t);
  if (n === ro) return gl(e, t);
  if (n === oi) return QE(e, t);
}
function ub(t, e, n, r) {
  let i = e[pn].queries[r];
  if (i.matches === null) {
    let s = t.data,
      o = n.matches,
      a = [];
    for (let c = 0; c < o.length; c += 2) {
      let l = o[c];
      if (l < 0) a.push(null);
      else {
        let u = s[l];
        a.push(kM(e, u, o[c + 1], n.metadata.read));
      }
    }
    i.matches = a;
  }
  return i.matches;
}
function Lf(t, e, n, r) {
  let i = t.queries.getByIndex(n),
    s = i.matches;
  if (s !== null) {
    let o = ub(t, e, i, n);
    for (let a = 0; a < s.length; a += 2) {
      let c = s[a];
      if (c > 0) r.push(o[a / 2]);
      else {
        let l = s[a + 1],
          u = e[-c];
        for (let d = ct; d < u.length; d++) {
          let m = u[d];
          m[oo] === m[Ze] && Lf(m[fe], m, l, r);
        }
        if (u[$i] !== null) {
          let d = u[$i];
          for (let m = 0; m < d.length; m++) {
            let E = d[m];
            Lf(E[fe], E, l, r);
          }
        }
      }
    }
  }
  return r;
}
function PM(t) {
  let e = Me(),
    n = ht(),
    r = Zy();
  qf(r + 1);
  let i = hb(n, r);
  if (t.dirty && xT(e) === ((i.metadata.flags & 2) === 2)) {
    if (i.matches === null) t.reset([]);
    else {
      let s = i.crossesNgTemplate ? Lf(n, e, r, []) : ub(n, e, i, r);
      t.reset(s, VC), t.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function p6(t, e, n) {
  let r = ht();
  r.firstCreatePass &&
    (fb(r, new qc(t, e, n), -1), (e & 2) === 2 && (r.staticViewQueries = !0)),
    db(r, Me(), e);
}
function FM(t, e, n, r) {
  let i = ht();
  if (i.firstCreatePass) {
    let s = Ot();
    fb(i, new qc(e, n, r), s.index),
      BM(i, t),
      (n & 2) === 2 && (i.staticContentQueries = !0);
  }
  db(i, Me(), n);
}
function jM() {
  return HM(Me(), Zy());
}
function HM(t, e) {
  return t[pn].queries[e].queryList;
}
function db(t, e, n) {
  let r = new Af((n & 4) === 4);
  n1(t, e, r, r.destroy),
    e[pn] === null && (e[pn] = new Rf()),
    e[pn].queries.push(new xf(r));
}
function fb(t, e, n) {
  t.queries === null && (t.queries = new Of()), t.queries.track(new kf(e, n));
}
function BM(t, e) {
  let n = t.contentQueries || (t.contentQueries = []),
    r = n.length ? n[n.length - 1] : -1;
  e !== r && n.push(t.queries.length - 1, e);
}
function hb(t, e) {
  return t.queries.getByIndex(e);
}
function m6(t, e) {
  return gl(t, e);
}
var fc = null;
function VM(t) {
  (fc !== null &&
    (t.defaultEncapsulation !== fc.defaultEncapsulation ||
      t.preserveWhitespaces !== fc.preserveWhitespaces)) ||
    (fc = t);
}
var yl = (() => {
    let e = class e {
      log(r) {
        console.log(r);
      }
      warn(r) {
        console.warn(r);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'platform' }));
    let t = e;
    return t;
  })(),
  Pf = class {
    constructor(e, n) {
      (this.ngModuleFactory = e), (this.componentFactories = n);
    }
  },
  vl = (() => {
    let e = class e {
      compileModuleSync(r) {
        return new Uc(r);
      }
      compileModuleAsync(r) {
        return Promise.resolve(this.compileModuleSync(r));
      }
      compileModuleAndAllComponentsSync(r) {
        let i = this.compileModuleSync(r),
          s = Ry(r),
          o = Iv(s.declarations).reduce((a, c) => {
            let l = Ln(c);
            return l && a.push(new Ki(l)), a;
          }, []);
        return new Pf(i, o);
      }
      compileModuleAndAllComponentsAsync(r) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(r));
      }
      clearCache() {}
      clearCacheFor(r) {}
      getModuleId(r) {}
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  UM = new le('compilerOptions');
var vo = (() => {
  let e = class e {
    constructor() {
      (this.taskId = 0),
        (this.pendingTasks = new Set()),
        (this.hasPendingTasks = new dt(!1));
    }
    get _hasPendingTasks() {
      return this.hasPendingTasks.value;
    }
    add() {
      this._hasPendingTasks || this.hasPendingTasks.next(!0);
      let r = this.taskId++;
      return this.pendingTasks.add(r), r;
    }
    remove(r) {
      this.pendingTasks.delete(r),
        this.pendingTasks.size === 0 &&
          this._hasPendingTasks &&
          this.hasPendingTasks.next(!1);
    }
    ngOnDestroy() {
      this.pendingTasks.clear(),
        this._hasPendingTasks && this.hasPendingTasks.next(!1);
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
var El = new le(''),
  pb = new le(''),
  Th = (() => {
    let e = class e {
      constructor(r, i, s) {
        (this._ngZone = r),
          (this.registry = i),
          (this._pendingCount = 0),
          (this._isZoneStable = !0),
          (this._didWork = !1),
          (this._callbacks = []),
          (this.taskTrackingZone = null),
          Sh || ($M(s), s.addToWindow(i)),
          this._watchAngularEvents(),
          r.run(() => {
            this.taskTrackingZone =
              typeof Zone > 'u' ? null : Zone.current.get('TaskTrackingZone');
          });
      }
      _watchAngularEvents() {
        this._ngZone.onUnstable.subscribe({
          next: () => {
            (this._didWork = !0), (this._isZoneStable = !1);
          },
        }),
          this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable.subscribe({
              next: () => {
                Fe.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    (this._isZoneStable = !0), this._runCallbacksIfReady();
                  });
              },
            });
          });
      }
      increasePendingRequestCount() {
        return (
          (this._pendingCount += 1), (this._didWork = !0), this._pendingCount
        );
      }
      decreasePendingRequestCount() {
        if (((this._pendingCount -= 1), this._pendingCount < 0))
          throw new Error('pending async requests below zero');
        return this._runCallbacksIfReady(), this._pendingCount;
      }
      isStable() {
        return (
          this._isZoneStable &&
          this._pendingCount === 0 &&
          !this._ngZone.hasPendingMacrotasks
        );
      }
      _runCallbacksIfReady() {
        if (this.isStable())
          queueMicrotask(() => {
            for (; this._callbacks.length !== 0; ) {
              let r = this._callbacks.pop();
              clearTimeout(r.timeoutId), r.doneCb(this._didWork);
            }
            this._didWork = !1;
          });
        else {
          let r = this.getPendingTasks();
          (this._callbacks = this._callbacks.filter((i) =>
            i.updateCb && i.updateCb(r) ? (clearTimeout(i.timeoutId), !1) : !0
          )),
            (this._didWork = !0);
        }
      }
      getPendingTasks() {
        return this.taskTrackingZone
          ? this.taskTrackingZone.macroTasks.map((r) => ({
              source: r.source,
              creationLocation: r.creationLocation,
              data: r.data,
            }))
          : [];
      }
      addCallback(r, i, s) {
        let o = -1;
        i &&
          i > 0 &&
          (o = setTimeout(() => {
            (this._callbacks = this._callbacks.filter(
              (a) => a.timeoutId !== o
            )),
              r(this._didWork, this.getPendingTasks());
          }, i)),
          this._callbacks.push({ doneCb: r, timeoutId: o, updateCb: s });
      }
      whenStable(r, i, s) {
        if (s && !this.taskTrackingZone)
          throw new Error(
            'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
          );
        this.addCallback(r, i, s), this._runCallbacksIfReady();
      }
      getPendingRequestCount() {
        return this._pendingCount;
      }
      registerApplication(r) {
        this.registry.registerApplication(r, this);
      }
      unregisterApplication(r) {
        this.registry.unregisterApplication(r);
      }
      findProviders(r, i, s) {
        return [];
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(X(Fe), X(mb), X(pb));
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  mb = (() => {
    let e = class e {
      constructor() {
        this._applications = new Map();
      }
      registerApplication(r, i) {
        this._applications.set(r, i);
      }
      unregisterApplication(r) {
        this._applications.delete(r);
      }
      unregisterAllApplications() {
        this._applications.clear();
      }
      getTestability(r) {
        return this._applications.get(r) || null;
      }
      getAllTestabilities() {
        return Array.from(this._applications.values());
      }
      getAllRootElements() {
        return Array.from(this._applications.keys());
      }
      findTestabilityInTree(r, i = !0) {
        return Sh?.findTestabilityInTree(this, r, i) ?? null;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'platform' }));
    let t = e;
    return t;
  })();
function $M(t) {
  Sh = t;
}
var Sh,
  bl = new le('Application Initializer'),
  Ch = (() => {
    let e = class e {
      constructor() {
        (this.initialized = !1),
          (this.done = !1),
          (this.donePromise = new Promise((r, i) => {
            (this.resolve = r), (this.reject = i);
          })),
          (this.appInits = W(bl, { optional: !0 }) ?? []);
      }
      runInitializers() {
        if (this.initialized) return;
        let r = [];
        for (let s of this.appInits) {
          let o = s();
          if (yo(o)) r.push(o);
          else if (ib(o)) {
            let a = new Promise((c, l) => {
              o.subscribe({ complete: c, error: l });
            });
            r.push(a);
          }
        }
        let i = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(r)
          .then(() => {
            i();
          })
          .catch((s) => {
            this.reject(s);
          }),
          r.length === 0 && i(),
          (this.initialized = !0);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  ai = new le('appBootstrapListener');
function qM(t, e, n) {
  let r = new Uc(n);
  return Promise.resolve(r);
}
function gb() {
  eg(() => {
    throw new z(600, !1);
  });
}
function zM(t) {
  return t.isBoundToModule;
}
function yb(t, e, n) {
  try {
    let r = n();
    return yo(r)
      ? r.catch((i) => {
          throw (e.runOutsideAngular(() => t.handleError(i)), i);
        })
      : r;
  } catch (r) {
    throw (e.runOutsideAngular(() => t.handleError(r)), r);
  }
}
function vb(t, e) {
  return Array.isArray(e) ? e.reduce(vb, t) : te(te({}, t), e);
}
var jt = (() => {
  let e = class e {
    constructor() {
      (this._bootstrapListeners = []),
        (this._runningTick = !1),
        (this._destroyed = !1),
        (this._destroyListeners = []),
        (this._views = []),
        (this.internalErrorHandler = W(oE)),
        (this.componentTypes = []),
        (this.components = []),
        (this.isStable = W(vo).hasPendingTasks.pipe(we((r) => !r))),
        (this._injector = W(Rt));
    }
    get destroyed() {
      return this._destroyed;
    }
    get injector() {
      return this._injector;
    }
    bootstrap(r, i) {
      let s = r instanceof Lc;
      if (!this._injector.get(Ch).done) {
        let I =
          'Cannot bootstrap as there are still asynchronous initializers running.' +
          (!s && xy(r)
            ? ''
            : ' Bootstrap components in the `ngDoBootstrap` method of the root module.');
        throw new z(405, !1);
      }
      let a;
      s ? (a = r) : (a = this._injector.get(al).resolveComponentFactory(r)),
        this.componentTypes.push(a.componentType);
      let c = zM(a) ? void 0 : this._injector.get(gr),
        l = i || a.selector,
        u = a.create(Ct.NULL, [], l, c),
        d = u.location.nativeElement,
        m = u.injector.get(El, null);
      return (
        m?.registerApplication(d),
        u.onDestroy(() => {
          this.detachView(u.hostView),
            bc(this.components, u),
            m?.unregisterApplication(d);
        }),
        this._loadComponent(u),
        u
      );
    }
    tick() {
      if (this._runningTick) throw new z(101, !1);
      try {
        this._runningTick = !0;
        for (let r of this._views) r.detectChanges();
      } catch (r) {
        this.internalErrorHandler(r);
      } finally {
        this._runningTick = !1;
      }
    }
    attachView(r) {
      let i = r;
      this._views.push(i), i.attachToAppRef(this);
    }
    detachView(r) {
      let i = r;
      bc(this._views, i), i.detachFromAppRef();
    }
    _loadComponent(r) {
      this.attachView(r.hostView), this.tick(), this.components.push(r);
      let i = this._injector.get(ai, []);
      [...this._bootstrapListeners, ...i].forEach((s) => s(r));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach((r) => r()),
            this._views.slice().forEach((r) => r.destroy());
        } finally {
          (this._destroyed = !0),
            (this._views = []),
            (this._bootstrapListeners = []),
            (this._destroyListeners = []);
        }
    }
    onDestroy(r) {
      return (
        this._destroyListeners.push(r), () => bc(this._destroyListeners, r)
      );
    }
    destroy() {
      if (this._destroyed) throw new z(406, !1);
      let r = this._injector;
      r.destroy && !r.destroyed && r.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    warnIfDestroyed() {}
  };
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
function bc(t, e) {
  let n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
function ly(t) {
  for (let e = t.length - 1; e >= 0; e--) if (t[e] !== void 0) return t[e];
}
var hc;
function Eo(t) {
  hc ??= new WeakMap();
  let e = hc.get(t);
  if (e) return e;
  let n = t.isStable
    .pipe(Zt((r) => r))
    .toPromise()
    .then(() => {});
  return hc.set(t, n), t.onDestroy(() => hc?.delete(t)), n;
}
var GM = (() => {
  let e = class e {
    constructor() {
      (this.zone = W(Fe)), (this.applicationRef = W(jt));
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
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
function Eb(t) {
  return [
    { provide: Fe, useFactory: t },
    {
      provide: Jr,
      multi: !0,
      useFactory: () => {
        let e = W(GM, { optional: !0 });
        return () => e.initialize();
      },
    },
    {
      provide: Jr,
      multi: !0,
      useFactory: () => {
        let e = W(QM);
        return () => {
          e.initialize();
        };
      },
    },
    { provide: oE, useFactory: WM },
  ];
}
function WM() {
  let t = W(Fe),
    e = W(rn);
  return (n) => t.runOutsideAngular(() => e.handleError(n));
}
function KM(t) {
  let e = Eb(() => new Fe(bb(t)));
  return Bn([[], e]);
}
function bb(t) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: t?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: t?.runCoalescing ?? !1,
  };
}
var QM = (() => {
  let e = class e {
    constructor() {
      (this.subscription = new Je()),
        (this.initialized = !1),
        (this.zone = W(Fe)),
        (this.pendingTasks = W(vo));
    }
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let r = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (r = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              Fe.assertNotInAngularZone(),
                queueMicrotask(() => {
                  r !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(r), (r = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            Fe.assertInAngularZone(), (r ??= this.pendingTasks.add());
          })
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
function YM() {
  return (typeof $localize < 'u' && $localize.locale) || Yi;
}
var wl = new le('LocaleId', {
  providedIn: 'root',
  factory: () => W(wl, De.Optional | De.SkipSelf) || YM(),
});
var Ih = new le('PlatformDestroyListeners'),
  wb = (() => {
    let e = class e {
      constructor(r) {
        (this._injector = r),
          (this._modules = []),
          (this._destroyListeners = []),
          (this._destroyed = !1);
      }
      bootstrapModuleFactory(r, i) {
        let s = F1(
          i?.ngZone,
          bb({
            eventCoalescing: i?.ngZoneEventCoalescing,
            runCoalescing: i?.ngZoneRunCoalescing,
          })
        );
        return s.run(() => {
          let o = CM(
              r.moduleType,
              this.injector,
              Eb(() => s)
            ),
            a = o.injector.get(rn, null);
          return (
            s.runOutsideAngular(() => {
              let c = s.onError.subscribe({
                next: (l) => {
                  a.handleError(l);
                },
              });
              o.onDestroy(() => {
                bc(this._modules, o), c.unsubscribe();
              });
            }),
            yb(a, s, () => {
              let c = o.injector.get(Ch);
              return (
                c.runInitializers(),
                c.donePromise.then(() => {
                  let l = o.injector.get(wl, Yi);
                  return rb(l || Yi), this._moduleDoBootstrap(o), o;
                })
              );
            })
          );
        });
      }
      bootstrapModule(r, i = []) {
        let s = vb({}, i);
        return qM(this.injector, s, r).then((o) =>
          this.bootstrapModuleFactory(o, s)
        );
      }
      _moduleDoBootstrap(r) {
        let i = r.injector.get(jt);
        if (r._bootstrapComponents.length > 0)
          r._bootstrapComponents.forEach((s) => i.bootstrap(s));
        else if (r.instance.ngDoBootstrap) r.instance.ngDoBootstrap(i);
        else throw new z(-403, !1);
        this._modules.push(r);
      }
      onDestroy(r) {
        this._destroyListeners.push(r);
      }
      get injector() {
        return this._injector;
      }
      destroy() {
        if (this._destroyed) throw new z(404, !1);
        this._modules.slice().forEach((i) => i.destroy()),
          this._destroyListeners.forEach((i) => i());
        let r = this._injector.get(Ih, null);
        r && (r.forEach((i) => i()), r.clear()), (this._destroyed = !0);
      }
      get destroyed() {
        return this._destroyed;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(X(Ct));
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'platform' }));
    let t = e;
    return t;
  })(),
  pr = null,
  _l = new le('AllowMultipleToken');
function ZM(t) {
  if (pr && !pr.get(_l, !1)) throw new z(400, !1);
  gb(), (pr = t);
  let e = t.get(wb);
  return Tb(t), e;
}
function Dl(t, e, n = []) {
  let r = `Platform: ${e}`,
    i = new le(r);
  return (s = []) => {
    let o = Db();
    if (!o || o.injector.get(_l, !1)) {
      let a = [...n, ...s, { provide: i, useValue: !0 }];
      t ? t(a) : ZM(_b(a, r));
    }
    return XM(i);
  };
}
function _b(t = [], e) {
  return Ct.create({
    name: e,
    providers: [
      { provide: Xc, useValue: 'platform' },
      { provide: Ih, useValue: new Set([() => (pr = null)]) },
      ...t,
    ],
  });
}
function XM(t) {
  let e = Db();
  if (!e) throw new z(401, !1);
  return e;
}
function Db() {
  return pr?.get(wb) ?? null;
}
function JM(t = []) {
  if (pr) return pr;
  let e = _b(t);
  return (pr = e), gb(), Tb(e), e;
}
function Tb(t) {
  t.get(fo, null)?.forEach((n) => n());
}
var Mh = Dl(null, 'core', []);
function Sb(t) {
  try {
    let { rootComponent: e, appProviders: n, platformProviders: r } = t,
      i = JM(r),
      s = [KM(), ...(n || [])],
      a = new $c({
        providers: s,
        parent: i,
        debugName: '',
        runEnvironmentInitializers: !1,
      }).injector,
      c = a.get(Fe);
    return c.run(() => {
      a.resolveInjectorInitializers();
      let l = a.get(rn, null),
        u;
      c.runOutsideAngular(() => {
        u = c.onError.subscribe({
          next: (E) => {
            l.handleError(E);
          },
        });
      });
      let d = () => a.destroy(),
        m = i.get(Ih);
      return (
        m.add(d),
        a.onDestroy(() => {
          u.unsubscribe(), m.delete(d);
        }),
        yb(l, c, () => {
          let E = a.get(Ch);
          return (
            E.runInitializers(),
            E.donePromise.then(() => {
              let I = a.get(wl, Yi);
              rb(I || Yi);
              let M = a.get(jt);
              return e !== void 0 && M.bootstrap(e), M;
            })
          );
        })
      );
    });
  } catch (e) {
    return Promise.reject(e);
  }
}
var Ff = class {
    constructor() {
      (this.views = []), (this.indexByContent = new Map());
    }
    add(e) {
      let n = JSON.stringify(e);
      if (!this.indexByContent.has(n)) {
        let r = this.views.length;
        return this.views.push(e), this.indexByContent.set(n, r), r;
      }
      return this.indexByContent.get(n);
    }
    getAll() {
      return this.views;
    }
  },
  eN = 0;
function Cb(t) {
  return t.ssrId || (t.ssrId = `t${eN++}`), t.ssrId;
}
function Ib(t, e, n) {
  let r = [];
  return Zs(t, e, n, r), r.length;
}
function tN(t) {
  let e = [];
  return iE(t, e), e.length;
}
function Mb(t, e) {
  let n = t[et];
  return n && !n.hasAttribute(Ws) ? Gc(n, t, e) : null;
}
function Nb(t, e) {
  let n = Vy(t[et]),
    r = Mb(n, e),
    i = ot(n[et]),
    s = t[Ze],
    o = Gc(i, s, e),
    a = n[Be],
    c = `${r}|${o}`;
  a.setAttribute(i, Hs, c);
}
function Ab(t, e) {
  let n = new Ff(),
    r = new Map(),
    i = t._views;
  for (let a of i) {
    let c = nE(a);
    if (c !== null) {
      let l = { serializedViewCollection: n, corruptedTextNodes: r };
      St(c) ? Nb(c, l) : Mb(c, l), sN(r, e);
    }
  }
  let s = n.getAll();
  t.injector.get(yn).set(fh, s);
}
function nN(t, e) {
  let n = [],
    r = '';
  for (let i = ct; i < t.length; i++) {
    let s = t[i],
      o,
      a,
      c;
    if (Vf(s) && ((s = s[Ge]), St(s))) {
      (a = tN(s) + 1), Nb(s, e);
      let u = Vy(s[et]);
      c = { [Zd]: u[fe].ssrId, [Wi]: a };
    }
    if (!c) {
      let u = s[fe];
      u.type === 1
        ? ((o = u.ssrId), (a = 1))
        : ((o = Cb(u)), (a = Ib(u, s, u.firstChild))),
        (c = te({ [Zd]: o, [Wi]: a }, xb(t[i], e)));
    }
    let l = JSON.stringify(c);
    if (n.length > 0 && l === r) {
      let u = n[n.length - 1];
      (u[kc] ??= 1), u[kc]++;
    } else (r = l), n.push(c);
  }
  return n;
}
function zc(t, e, n) {
  let r = e.index - Ge;
  (t[Xd] ??= {}), (t[Xd][r] = zI(e, n));
}
function uy(t, e) {
  let n = e.index - Ge;
  (t[vc] ??= []), t[vc].includes(n) || t[vc].push(n);
}
function xb(t, e) {
  let n = {},
    r = t[fe];
  for (let i = Ge; i < r.bindingStartIndex; i++) {
    let s = r.data[i],
      o = i - Ge;
    if (tS(s)) {
      if (Js(s, t) && oN(s)) {
        uy(n, s);
        continue;
      }
      if (Array.isArray(s.projection)) {
        for (let a of s.projection)
          if (a)
            if (!Array.isArray(a))
              !_T(a) && !Rc(a) && (Js(a, t) ? uy(n, a) : zc(n, a, t));
            else throw II(ot(t[i]));
      }
      if ((rN(n, s, t), St(t[i]))) {
        let a = s.tView;
        a !== null && ((n[Yd] ??= {}), (n[Yd][o] = Cb(a)));
        let c = t[i][et];
        if (Array.isArray(c)) {
          let l = ot(c);
          l.hasAttribute(Ws) || Gc(l, c, e);
        }
        (n[Ys] ??= {}), (n[Ys][o] = nN(t[i], e));
      } else if (Array.isArray(t[i])) {
        let a = ot(t[i][et]);
        a.hasAttribute(Ws) || Gc(a, t[i], e);
      } else if (s.type & 8) (n[Qd] ??= {}), (n[Qd][o] = Ib(r, t, s.child));
      else if (s.type & 16) {
        let a = s.next;
        for (; a !== null && a.type & 16; ) a = a.next;
        a && !Rc(a) && zc(n, a, t);
      } else if (s.type & 1) {
        let a = ot(t[i]);
        a.textContent === ''
          ? e.corruptedTextNodes.set(a, 'ngetn')
          : a.nextSibling?.nodeType === Node.TEXT_NODE &&
            e.corruptedTextNodes.set(a, 'ngtns');
      }
    }
  }
  return n;
}
function rN(t, e, n) {
  e.projectionNext &&
    e.projectionNext !== e.next &&
    !Rc(e.projectionNext) &&
    zc(t, e.projectionNext, n),
    e.prev === null &&
      e.parent !== null &&
      Js(e.parent, n) &&
      !Js(e, n) &&
      zc(t, e, n);
}
function iN(t) {
  let e = t[ft];
  return e?.constructor
    ? Ln(e.constructor)?.encapsulation === tn.ShadowDom
    : !1;
}
function Gc(t, e, n) {
  let r = e[Be];
  if (DT(e) || iN(e)) return r.setAttribute(t, Ws, ''), null;
  {
    let i = xb(e, n),
      s = n.serializedViewCollection.add(i);
    return r.setAttribute(t, Hs, s.toString()), s;
  }
}
function sN(t, e) {
  for (let [n, r] of t) n.after(e.createComment(r));
}
function oN(t) {
  let e = t;
  for (; e != null; ) {
    if (Xi(e)) return !0;
    e = e.parent;
  }
  return !1;
}
var dy = !1;
function aN() {
  dy || ((dy = !0), kC(), uM(), bM(), hM(), sM(), nM(), KI(), t1());
}
function cN(t, e) {
  return Eo(t);
}
function Rb() {
  return Bn([
    {
      provide: Fi,
      useFactory: () => {
        let t = !0;
        return (
          Ps() && (t = !!W(yn, { optional: !0 })?.get(fh, null)),
          t && Dr('NgHydration'),
          t
        );
      },
    },
    {
      provide: Jr,
      useValue: () => {
        Ps() && W(Fi) && (lN(), aN());
      },
      multi: !0,
    },
    { provide: cE, useFactory: () => Ps() && W(Fi) },
    {
      provide: ai,
      useFactory: () => {
        if (Ps() && W(Fi)) {
          let t = W(jt),
            e = W(Ct);
          return () => {
            cN(t, e).then(() => {
              Fe.assertInAngularZone(), FI(t);
            });
          };
        }
        return () => {};
      },
      multi: !0,
    },
  ]);
}
function lN() {
  let t = el(),
    e;
  for (let n of t.body.childNodes)
    if (n.nodeType === Node.COMMENT_NODE && n.textContent?.trim() === hh) {
      e = n;
      break;
    }
  if (!e) throw new z(-507, !1);
}
function Ob(t) {
  return typeof t == 'boolean' ? t : t != null && t !== 'false';
}
function uN(t, e = NaN) {
  return !isNaN(parseFloat(t)) && !isNaN(Number(t)) ? Number(t) : e;
}
function kb(t) {
  let e = Ln(t);
  if (!e) return null;
  let n = new Ki(e);
  return {
    get selector() {
      return n.selector;
    },
    get type() {
      return n.componentType;
    },
    get inputs() {
      return n.inputs;
    },
    get outputs() {
      return n.outputs;
    },
    get ngContentSelectors() {
      return n.ngContentSelectors;
    },
    get isStandalone() {
      return e.standalone;
    },
    get isSignal() {
      return e.signals;
    },
  };
}
function g6(...t) {
  return t.reduce(
    (e, n) =>
      Object.assign(e, n, { providers: [...e.providers, ...n.providers] }),
    { providers: [] }
  );
}
var Nh = null;
function vn() {
  return Nh;
}
function Cl(t) {
  Nh || (Nh = t);
}
var Tl = class {},
  Ve = new le('DocumentToken'),
  ss = (() => {
    let e = class e {
      historyGo(r) {
        throw new Error('Not implemented');
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({
        token: e,
        factory: () => (() => W(dN))(),
        providedIn: 'platform',
      }));
    let t = e;
    return t;
  })(),
  Fb = new le('Location Initialized'),
  dN = (() => {
    let e = class e extends ss {
      constructor() {
        super(),
          (this._doc = W(Ve)),
          (this._location = window.location),
          (this._history = window.history);
      }
      getBaseHrefFromDOM() {
        return vn().getBaseHref(this._doc);
      }
      onPopState(r) {
        let i = vn().getGlobalEventTarget(this._doc, 'window');
        return (
          i.addEventListener('popstate', r, !1),
          () => i.removeEventListener('popstate', r)
        );
      }
      onHashChange(r) {
        let i = vn().getGlobalEventTarget(this._doc, 'window');
        return (
          i.addEventListener('hashchange', r, !1),
          () => i.removeEventListener('hashchange', r)
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
      set pathname(r) {
        this._location.pathname = r;
      }
      pushState(r, i, s) {
        this._history.pushState(r, i, s);
      }
      replaceState(r, i, s) {
        this._history.replaceState(r, i, s);
      }
      forward() {
        this._history.forward();
      }
      back() {
        this._history.back();
      }
      historyGo(r = 0) {
        this._history.go(r);
      }
      getState() {
        return this._history.state;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({
        token: e,
        factory: () => (() => new e())(),
        providedIn: 'platform',
      }));
    let t = e;
    return t;
  })();
function Rh(t, e) {
  if (t.length == 0) return e;
  if (e.length == 0) return t;
  let n = 0;
  return (
    t.endsWith('/') && n++,
    e.startsWith('/') && n++,
    n == 2 ? t + e.substring(1) : n == 1 ? t + e : t + '/' + e
  );
}
function Lb(t) {
  let e = t.match(/#|\?|$/),
    n = (e && e.index) || t.length,
    r = n - (t[n - 1] === '/' ? 1 : 0);
  return t.slice(0, r) + t.slice(n);
}
function qn(t) {
  return t && t[0] !== '?' ? '?' + t : t;
}
var li = (() => {
    let e = class e {
      historyGo(r) {
        throw new Error('Not implemented');
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({
        token: e,
        factory: () => (() => W(Oh))(),
        providedIn: 'root',
      }));
    let t = e;
    return t;
  })(),
  jb = new le('appBaseHref'),
  Oh = (() => {
    let e = class e extends li {
      constructor(r, i) {
        super(),
          (this._platformLocation = r),
          (this._removeListenerFns = []),
          (this._baseHref =
            i ??
            this._platformLocation.getBaseHrefFromDOM() ??
            W(Ve).location?.origin ??
            '');
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(r) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(r),
          this._platformLocation.onHashChange(r)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(r) {
        return Rh(this._baseHref, r);
      }
      path(r = !1) {
        let i =
            this._platformLocation.pathname + qn(this._platformLocation.search),
          s = this._platformLocation.hash;
        return s && r ? `${i}${s}` : i;
      }
      pushState(r, i, s, o) {
        let a = this.prepareExternalUrl(s + qn(o));
        this._platformLocation.pushState(r, i, a);
      }
      replaceState(r, i, s, o) {
        let a = this.prepareExternalUrl(s + qn(o));
        this._platformLocation.replaceState(r, i, a);
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
      historyGo(r = 0) {
        this._platformLocation.historyGo?.(r);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(X(ss), X(jb, 8));
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  Hb = (() => {
    let e = class e extends li {
      constructor(r, i) {
        super(),
          (this._platformLocation = r),
          (this._baseHref = ''),
          (this._removeListenerFns = []),
          i != null && (this._baseHref = i);
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(r) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(r),
          this._platformLocation.onHashChange(r)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      path(r = !1) {
        let i = this._platformLocation.hash;
        return i == null && (i = '#'), i.length > 0 ? i.substring(1) : i;
      }
      prepareExternalUrl(r) {
        let i = Rh(this._baseHref, r);
        return i.length > 0 ? '#' + i : i;
      }
      pushState(r, i, s, o) {
        let a = this.prepareExternalUrl(s + qn(o));
        a.length == 0 && (a = this._platformLocation.pathname),
          this._platformLocation.pushState(r, i, a);
      }
      replaceState(r, i, s, o) {
        let a = this.prepareExternalUrl(s + qn(o));
        a.length == 0 && (a = this._platformLocation.pathname),
          this._platformLocation.replaceState(r, i, a);
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
      historyGo(r = 0) {
        this._platformLocation.historyGo?.(r);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(X(ss), X(jb, 8));
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  os = (() => {
    let e = class e {
      constructor(r) {
        (this._subject = new gt()),
          (this._urlChangeListeners = []),
          (this._urlChangeSubscription = null),
          (this._locationStrategy = r);
        let i = this._locationStrategy.getBaseHref();
        (this._basePath = pN(Lb(Pb(i)))),
          this._locationStrategy.onPopState((s) => {
            this._subject.emit({
              url: this.path(!0),
              pop: !0,
              state: s.state,
              type: s.type,
            });
          });
      }
      ngOnDestroy() {
        this._urlChangeSubscription?.unsubscribe(),
          (this._urlChangeListeners = []);
      }
      path(r = !1) {
        return this.normalize(this._locationStrategy.path(r));
      }
      getState() {
        return this._locationStrategy.getState();
      }
      isCurrentPathEqualTo(r, i = '') {
        return this.path() == this.normalize(r + qn(i));
      }
      normalize(r) {
        return e.stripTrailingSlash(hN(this._basePath, Pb(r)));
      }
      prepareExternalUrl(r) {
        return (
          r && r[0] !== '/' && (r = '/' + r),
          this._locationStrategy.prepareExternalUrl(r)
        );
      }
      go(r, i = '', s = null) {
        this._locationStrategy.pushState(s, '', r, i),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(r + qn(i)), s);
      }
      replaceState(r, i = '', s = null) {
        this._locationStrategy.replaceState(s, '', r, i),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(r + qn(i)), s);
      }
      forward() {
        this._locationStrategy.forward();
      }
      back() {
        this._locationStrategy.back();
      }
      historyGo(r = 0) {
        this._locationStrategy.historyGo?.(r);
      }
      onUrlChange(r) {
        return (
          this._urlChangeListeners.push(r),
          this._urlChangeSubscription ||
            (this._urlChangeSubscription = this.subscribe((i) => {
              this._notifyUrlChangeListeners(i.url, i.state);
            })),
          () => {
            let i = this._urlChangeListeners.indexOf(r);
            this._urlChangeListeners.splice(i, 1),
              this._urlChangeListeners.length === 0 &&
                (this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeSubscription = null));
          }
        );
      }
      _notifyUrlChangeListeners(r = '', i) {
        this._urlChangeListeners.forEach((s) => s(r, i));
      }
      subscribe(r, i, s) {
        return this._subject.subscribe({ next: r, error: i, complete: s });
      }
    };
    (e.normalizeQueryParams = qn),
      (e.joinWithSlash = Rh),
      (e.stripTrailingSlash = Lb),
      (e.ɵfac = function (i) {
        return new (i || e)(X(li));
      }),
      (e.ɵprov = J({ token: e, factory: () => fN(), providedIn: 'root' }));
    let t = e;
    return t;
  })();
function fN() {
  return new os(X(li));
}
function hN(t, e) {
  if (!t || !e.startsWith(t)) return e;
  let n = e.substring(t.length);
  return n === '' || ['/', ';', '?', '#'].includes(n[0]) ? n : e;
}
function Pb(t) {
  return t.replace(/\/index.html$/, '');
}
function pN(t) {
  if (new RegExp('^(https?:)?//').test(t)) {
    let [, n] = t.split(/\/\/[^\/]+/);
    return n;
  }
  return t;
}
function Bb(t, e) {
  e = encodeURIComponent(e);
  for (let n of t.split(';')) {
    let r = n.indexOf('='),
      [i, s] = r == -1 ? [n, ''] : [n.slice(0, r), n.slice(r + 1)];
    if (i.trim() === e) return decodeURIComponent(s);
  }
  return null;
}
var V6 = (() => {
  let e = class e {
    constructor(r) {
      (this._viewContainerRef = r),
        (this._viewRef = null),
        (this.ngTemplateOutletContext = null),
        (this.ngTemplateOutlet = null),
        (this.ngTemplateOutletInjector = null);
    }
    ngOnChanges(r) {
      if (this._shouldRecreateView(r)) {
        let i = this._viewContainerRef;
        if (
          (this._viewRef && i.remove(i.indexOf(this._viewRef)),
          !this.ngTemplateOutlet)
        ) {
          this._viewRef = null;
          return;
        }
        let s = this._createContextForwardProxy();
        this._viewRef = i.createEmbeddedView(this.ngTemplateOutlet, s, {
          injector: this.ngTemplateOutletInjector ?? void 0,
        });
      }
    }
    _shouldRecreateView(r) {
      return !!r.ngTemplateOutlet || !!r.ngTemplateOutletInjector;
    }
    _createContextForwardProxy() {
      return new Proxy(
        {},
        {
          set: (r, i, s) =>
            this.ngTemplateOutletContext
              ? Reflect.set(this.ngTemplateOutletContext, i, s)
              : !1,
          get: (r, i, s) => {
            if (this.ngTemplateOutletContext)
              return Reflect.get(this.ngTemplateOutletContext, i, s);
          },
        }
      );
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(rs(oi));
  }),
    (e.ɵdir = Yc({
      type: e,
      selectors: [['', 'ngTemplateOutlet', '']],
      inputs: {
        ngTemplateOutletContext: 'ngTemplateOutletContext',
        ngTemplateOutlet: 'ngTemplateOutlet',
        ngTemplateOutletInjector: 'ngTemplateOutletInjector',
      },
      standalone: !0,
      features: [ao],
    }));
  let t = e;
  return t;
})();
var mN = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵmod = vr({ type: e })),
      (e.ɵinj = yr({}));
    let t = e;
    return t;
  })(),
  kh = 'browser',
  Lh = 'server';
function U6(t) {
  return t === kh;
}
function Ph(t) {
  return t === Lh;
}
var Il = (() => {
    let e = class e {};
    e.ɵprov = J({
      token: e,
      providedIn: 'root',
      factory: () => new Ah(X(Ve), window),
    });
    let t = e;
    return t;
  })(),
  Ah = class {
    constructor(e, n) {
      (this.document = e), (this.window = n), (this.offset = () => [0, 0]);
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
      let n = gN(this.document, e);
      n && (this.scrollToElement(n), n.focus());
    }
    setHistoryScrollRestoration(e) {
      this.supportsScrolling() && (this.window.history.scrollRestoration = e);
    }
    scrollToElement(e) {
      let n = e.getBoundingClientRect(),
        r = n.left + this.window.pageXOffset,
        i = n.top + this.window.pageYOffset,
        s = this.offset();
      this.window.scrollTo(r - s[0], i - s[1]);
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
function gN(t, e) {
  let n = t.getElementById(e) || t.getElementsByName(e)[0];
  if (n) return n;
  if (
    typeof t.createTreeWalker == 'function' &&
    t.body &&
    typeof t.body.attachShadow == 'function'
  ) {
    let r = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT),
      i = r.currentNode;
    for (; i; ) {
      let s = i.shadowRoot;
      if (s) {
        let o = s.getElementById(e) || s.querySelector(`[name="${e}"]`);
        if (o) return o;
      }
      i = r.nextNode();
    }
  }
  return null;
}
var Sl = class {
    setOffset(e) {}
    getScrollPosition() {
      return [0, 0];
    }
    scrollToPosition(e) {}
    scrollToAnchor(e) {}
    setHistoryScrollRestoration(e) {}
  },
  is = class {};
var jh = class {};
var ui = class t {
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
                  .forEach((n) => {
                    let r = n.indexOf(':');
                    if (r > 0) {
                      let i = n.slice(0, r),
                        s = i.toLowerCase(),
                        o = n.slice(r + 1).trim();
                      this.maybeSetNormalizedName(i, s),
                        this.headers.has(s)
                          ? this.headers.get(s).push(o)
                          : this.headers.set(s, [o]);
                    }
                  });
            })
          : typeof Headers < 'u' && e instanceof Headers
          ? ((this.headers = new Map()),
            e.forEach((n, r) => {
              this.setHeaderEntries(r, n);
            }))
          : (this.lazyInit = () => {
              (this.headers = new Map()),
                Object.entries(e).forEach(([n, r]) => {
                  this.setHeaderEntries(n, r);
                });
            })
        : (this.headers = new Map());
  }
  has(e) {
    return this.init(), this.headers.has(e.toLowerCase());
  }
  get(e) {
    this.init();
    let n = this.headers.get(e.toLowerCase());
    return n && n.length > 0 ? n[0] : null;
  }
  keys() {
    return this.init(), Array.from(this.normalizedNames.values());
  }
  getAll(e) {
    return this.init(), this.headers.get(e.toLowerCase()) || null;
  }
  append(e, n) {
    return this.clone({ name: e, value: n, op: 'a' });
  }
  set(e, n) {
    return this.clone({ name: e, value: n, op: 's' });
  }
  delete(e, n) {
    return this.clone({ name: e, value: n, op: 'd' });
  }
  maybeSetNormalizedName(e, n) {
    this.normalizedNames.has(n) || this.normalizedNames.set(n, e);
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
      Array.from(e.headers.keys()).forEach((n) => {
        this.headers.set(n, e.headers.get(n)),
          this.normalizedNames.set(n, e.normalizedNames.get(n));
      });
  }
  clone(e) {
    let n = new t();
    return (
      (n.lazyInit =
        this.lazyInit && this.lazyInit instanceof t ? this.lazyInit : this),
      (n.lazyUpdate = (this.lazyUpdate || []).concat([e])),
      n
    );
  }
  applyUpdate(e) {
    let n = e.name.toLowerCase();
    switch (e.op) {
      case 'a':
      case 's':
        let r = e.value;
        if ((typeof r == 'string' && (r = [r]), r.length === 0)) return;
        this.maybeSetNormalizedName(e.name, n);
        let i = (e.op === 'a' ? this.headers.get(n) : void 0) || [];
        i.push(...r), this.headers.set(n, i);
        break;
      case 'd':
        let s = e.value;
        if (!s) this.headers.delete(n), this.normalizedNames.delete(n);
        else {
          let o = this.headers.get(n);
          if (!o) return;
          (o = o.filter((a) => s.indexOf(a) === -1)),
            o.length === 0
              ? (this.headers.delete(n), this.normalizedNames.delete(n))
              : this.headers.set(n, o);
        }
        break;
    }
  }
  setHeaderEntries(e, n) {
    let r = (Array.isArray(n) ? n : [n]).map((s) => s.toString()),
      i = e.toLowerCase();
    this.headers.set(i, r), this.maybeSetNormalizedName(e, i);
  }
  forEach(e) {
    this.init(),
      Array.from(this.normalizedNames.keys()).forEach((n) =>
        e(this.normalizedNames.get(n), this.headers.get(n))
      );
  }
};
var Hh = class {
  encodeKey(e) {
    return Vb(e);
  }
  encodeValue(e) {
    return Vb(e);
  }
  decodeKey(e) {
    return decodeURIComponent(e);
  }
  decodeValue(e) {
    return decodeURIComponent(e);
  }
};
function vN(t, e) {
  let n = new Map();
  return (
    t.length > 0 &&
      t
        .replace(/^\?/, '')
        .split('&')
        .forEach((i) => {
          let s = i.indexOf('='),
            [o, a] =
              s == -1
                ? [e.decodeKey(i), '']
                : [e.decodeKey(i.slice(0, s)), e.decodeValue(i.slice(s + 1))],
            c = n.get(o) || [];
          c.push(a), n.set(o, c);
        }),
    n
  );
}
var EN = /%(\d[a-f0-9])/gi,
  bN = {
    40: '@',
    '3A': ':',
    24: '$',
    '2C': ',',
    '3B': ';',
    '3D': '=',
    '3F': '?',
    '2F': '/',
  };
function Vb(t) {
  return encodeURIComponent(t).replace(EN, (e, n) => bN[n] ?? e);
}
function Ml(t) {
  return `${t}`;
}
var Sr = class t {
  constructor(e = {}) {
    if (
      ((this.updates = null),
      (this.cloneFrom = null),
      (this.encoder = e.encoder || new Hh()),
      e.fromString)
    ) {
      if (e.fromObject)
        throw new Error('Cannot specify both fromString and fromObject.');
      this.map = vN(e.fromString, this.encoder);
    } else
      e.fromObject
        ? ((this.map = new Map()),
          Object.keys(e.fromObject).forEach((n) => {
            let r = e.fromObject[n],
              i = Array.isArray(r) ? r.map(Ml) : [Ml(r)];
            this.map.set(n, i);
          }))
        : (this.map = null);
  }
  has(e) {
    return this.init(), this.map.has(e);
  }
  get(e) {
    this.init();
    let n = this.map.get(e);
    return n ? n[0] : null;
  }
  getAll(e) {
    return this.init(), this.map.get(e) || null;
  }
  keys() {
    return this.init(), Array.from(this.map.keys());
  }
  append(e, n) {
    return this.clone({ param: e, value: n, op: 'a' });
  }
  appendAll(e) {
    let n = [];
    return (
      Object.keys(e).forEach((r) => {
        let i = e[r];
        Array.isArray(i)
          ? i.forEach((s) => {
              n.push({ param: r, value: s, op: 'a' });
            })
          : n.push({ param: r, value: i, op: 'a' });
      }),
      this.clone(n)
    );
  }
  set(e, n) {
    return this.clone({ param: e, value: n, op: 's' });
  }
  delete(e, n) {
    return this.clone({ param: e, value: n, op: 'd' });
  }
  toString() {
    return (
      this.init(),
      this.keys()
        .map((e) => {
          let n = this.encoder.encodeKey(e);
          return this.map
            .get(e)
            .map((r) => n + '=' + this.encoder.encodeValue(r))
            .join('&');
        })
        .filter((e) => e !== '')
        .join('&')
    );
  }
  clone(e) {
    let n = new t({ encoder: this.encoder });
    return (
      (n.cloneFrom = this.cloneFrom || this),
      (n.updates = (this.updates || []).concat(e)),
      n
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
              let n = (e.op === 'a' ? this.map.get(e.param) : void 0) || [];
              n.push(Ml(e.value)), this.map.set(e.param, n);
              break;
            case 'd':
              if (e.value !== void 0) {
                let r = this.map.get(e.param) || [],
                  i = r.indexOf(Ml(e.value));
                i !== -1 && r.splice(i, 1),
                  r.length > 0
                    ? this.map.set(e.param, r)
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
var Bh = class {
  constructor() {
    this.map = new Map();
  }
  set(e, n) {
    return this.map.set(e, n), this;
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
function wN(t) {
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
function Ub(t) {
  return typeof ArrayBuffer < 'u' && t instanceof ArrayBuffer;
}
function $b(t) {
  return typeof Blob < 'u' && t instanceof Blob;
}
function qb(t) {
  return typeof FormData < 'u' && t instanceof FormData;
}
function _N(t) {
  return typeof URLSearchParams < 'u' && t instanceof URLSearchParams;
}
var bo = class t {
    constructor(e, n, r, i) {
      (this.url = n),
        (this.body = null),
        (this.reportProgress = !1),
        (this.withCredentials = !1),
        (this.responseType = 'json'),
        (this.method = e.toUpperCase());
      let s;
      if (
        (wN(this.method) || i
          ? ((this.body = r !== void 0 ? r : null), (s = i))
          : (s = r),
        s &&
          ((this.reportProgress = !!s.reportProgress),
          (this.withCredentials = !!s.withCredentials),
          s.responseType && (this.responseType = s.responseType),
          s.headers && (this.headers = s.headers),
          s.context && (this.context = s.context),
          s.params && (this.params = s.params),
          (this.transferCache = s.transferCache)),
        this.headers || (this.headers = new ui()),
        this.context || (this.context = new Bh()),
        !this.params)
      )
        (this.params = new Sr()), (this.urlWithParams = n);
      else {
        let o = this.params.toString();
        if (o.length === 0) this.urlWithParams = n;
        else {
          let a = n.indexOf('?'),
            c = a === -1 ? '?' : a < n.length - 1 ? '&' : '';
          this.urlWithParams = n + c + o;
        }
      }
    }
    serializeBody() {
      return this.body === null
        ? null
        : Ub(this.body) ||
          $b(this.body) ||
          qb(this.body) ||
          _N(this.body) ||
          typeof this.body == 'string'
        ? this.body
        : this.body instanceof Sr
        ? this.body.toString()
        : typeof this.body == 'object' ||
          typeof this.body == 'boolean' ||
          Array.isArray(this.body)
        ? JSON.stringify(this.body)
        : this.body.toString();
    }
    detectContentTypeHeader() {
      return this.body === null || qb(this.body)
        ? null
        : $b(this.body)
        ? this.body.type || null
        : Ub(this.body)
        ? null
        : typeof this.body == 'string'
        ? 'text/plain'
        : this.body instanceof Sr
        ? 'application/x-www-form-urlencoded;charset=UTF-8'
        : typeof this.body == 'object' ||
          typeof this.body == 'number' ||
          typeof this.body == 'boolean'
        ? 'application/json'
        : null;
    }
    clone(e = {}) {
      let n = e.method || this.method,
        r = e.url || this.url,
        i = e.responseType || this.responseType,
        s = e.body !== void 0 ? e.body : this.body,
        o =
          e.withCredentials !== void 0
            ? e.withCredentials
            : this.withCredentials,
        a =
          e.reportProgress !== void 0 ? e.reportProgress : this.reportProgress,
        c = e.headers || this.headers,
        l = e.params || this.params,
        u = e.context ?? this.context;
      return (
        e.setHeaders !== void 0 &&
          (c = Object.keys(e.setHeaders).reduce(
            (d, m) => d.set(m, e.setHeaders[m]),
            c
          )),
        e.setParams &&
          (l = Object.keys(e.setParams).reduce(
            (d, m) => d.set(m, e.setParams[m]),
            l
          )),
        new t(n, r, s, {
          params: l,
          headers: c,
          context: u,
          reportProgress: a,
          responseType: i,
          withCredentials: o,
        })
      );
    }
  },
  Zb = (function (t) {
    return (
      (t[(t.Sent = 0)] = 'Sent'),
      (t[(t.UploadProgress = 1)] = 'UploadProgress'),
      (t[(t.ResponseHeader = 2)] = 'ResponseHeader'),
      (t[(t.DownloadProgress = 3)] = 'DownloadProgress'),
      (t[(t.Response = 4)] = 'Response'),
      (t[(t.User = 5)] = 'User'),
      t
    );
  })(Zb || {}),
  Vh = class {
    constructor(e, n = 200, r = 'OK') {
      (this.headers = e.headers || new ui()),
        (this.status = e.status !== void 0 ? e.status : n),
        (this.statusText = e.statusText || r),
        (this.url = e.url || null),
        (this.ok = this.status >= 200 && this.status < 300);
    }
  };
var wo = class t extends Vh {
  constructor(e = {}) {
    super(e),
      (this.type = Zb.Response),
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
function Fh(t, e) {
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
var J6 = (() => {
  let e = class e {
    constructor(r) {
      this.handler = r;
    }
    request(r, i, s = {}) {
      let o;
      if (r instanceof bo) o = r;
      else {
        let l;
        s.headers instanceof ui ? (l = s.headers) : (l = new ui(s.headers));
        let u;
        s.params &&
          (s.params instanceof Sr
            ? (u = s.params)
            : (u = new Sr({ fromObject: s.params }))),
          (o = new bo(r, i, s.body !== void 0 ? s.body : null, {
            headers: l,
            context: s.context,
            params: u,
            reportProgress: s.reportProgress,
            responseType: s.responseType || 'json',
            withCredentials: s.withCredentials,
            transferCache: s.transferCache,
          }));
      }
      let a = ue(o).pipe(On((l) => this.handler.handle(l)));
      if (r instanceof bo || s.observe === 'events') return a;
      let c = a.pipe(mt((l) => l instanceof wo));
      switch (s.observe || 'body') {
        case 'body':
          switch (o.responseType) {
            case 'arraybuffer':
              return c.pipe(
                we((l) => {
                  if (l.body !== null && !(l.body instanceof ArrayBuffer))
                    throw new Error('Response is not an ArrayBuffer.');
                  return l.body;
                })
              );
            case 'blob':
              return c.pipe(
                we((l) => {
                  if (l.body !== null && !(l.body instanceof Blob))
                    throw new Error('Response is not a Blob.');
                  return l.body;
                })
              );
            case 'text':
              return c.pipe(
                we((l) => {
                  if (l.body !== null && typeof l.body != 'string')
                    throw new Error('Response is not a string.');
                  return l.body;
                })
              );
            case 'json':
            default:
              return c.pipe(we((l) => l.body));
          }
        case 'response':
          return c;
        default:
          throw new Error(`Unreachable: unhandled observe type ${s.observe}}`);
      }
    }
    delete(r, i = {}) {
      return this.request('DELETE', r, i);
    }
    get(r, i = {}) {
      return this.request('GET', r, i);
    }
    head(r, i = {}) {
      return this.request('HEAD', r, i);
    }
    jsonp(r, i) {
      return this.request('JSONP', r, {
        params: new Sr().append(i, 'JSONP_CALLBACK'),
        observe: 'body',
        responseType: 'json',
      });
    }
    options(r, i = {}) {
      return this.request('OPTIONS', r, i);
    }
    patch(r, i, s = {}) {
      return this.request('PATCH', r, Fh(s, i));
    }
    post(r, i, s = {}) {
      return this.request('POST', r, Fh(s, i));
    }
    put(r, i, s = {}) {
      return this.request('PUT', r, Fh(s, i));
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(X(jh));
  }),
    (e.ɵprov = J({ token: e, factory: e.ɵfac }));
  let t = e;
  return t;
})();
var Uh = new le('');
var zb = 'b',
  Gb = 'h',
  Wb = 's',
  Kb = 'st',
  Qb = 'u',
  Yb = 'rt',
  Nl = new le(''),
  DN = ['GET', 'HEAD'];
function TN(t, e) {
  let u = W(Nl),
    { isCacheActive: n } = u,
    r = Km(u, ['isCacheActive']),
    { transferCache: i, method: s } = t;
  if (
    !n ||
    (s === 'POST' && !r.includePostRequests && !i) ||
    (s !== 'POST' && !DN.includes(s)) ||
    i === !1 ||
    r.filter?.(t) === !1
  )
    return e(t);
  let o = W(yn),
    a = CN(t),
    c = o.get(a, null),
    l = r.includeHeaders;
  if ((typeof i == 'object' && i.includeHeaders && (l = i.includeHeaders), c)) {
    let { [zb]: d, [Yb]: m, [Gb]: E, [Wb]: I, [Kb]: M, [Qb]: j } = c,
      O = d;
    switch (m) {
      case 'arraybuffer':
        O = new TextEncoder().encode(d).buffer;
        break;
      case 'blob':
        O = new Blob([d]);
        break;
    }
    let D = new ui(E);
    return ue(
      new wo({ body: O, headers: D, status: I, statusText: M, url: j })
    );
  }
  return e(t).pipe(
    it((d) => {
      d instanceof wo &&
        o.set(a, {
          [zb]: d.body,
          [Gb]: SN(d.headers, l),
          [Wb]: d.status,
          [Kb]: d.statusText,
          [Qb]: d.url || '',
          [Yb]: t.responseType,
        });
    })
  );
}
function SN(t, e) {
  if (!e) return {};
  let n = {};
  for (let r of e) {
    let i = t.getAll(r);
    i !== null && (n[r] = i);
  }
  return n;
}
function CN(t) {
  let { params: e, method: n, responseType: r, url: i } = t,
    s = e
      .keys()
      .sort()
      .map((c) => `${c}=${e.getAll(c)}`)
      .join('&'),
    o = n + '.' + r + '.' + i + '?' + s,
    a = IN(o);
  return a;
}
function IN(t) {
  let e = 0;
  for (let n of t) e = (Math.imul(31, e) + n.charCodeAt(0)) << 0;
  return (e += 2147483647 + 1), e.toString();
}
function Xb(t) {
  return [
    {
      provide: Nl,
      useFactory: () => (
        Dr('NgHttpTransferCache'), te({ isCacheActive: !0 }, t)
      ),
    },
    { provide: Uh, useValue: TN, multi: !0, deps: [yn, Nl] },
    {
      provide: ai,
      multi: !0,
      useFactory: () => {
        let e = W(jt),
          n = W(Nl);
        return () => {
          Eo(e).then(() => {
            n.isCacheActive = !1;
          });
        };
      },
    },
  ];
}
var zh = class extends Tl {
    constructor() {
      super(...arguments), (this.supportsDOMEvents = !0);
    }
  },
  Do = class t extends zh {
    static makeCurrent() {
      Cl(new t());
    }
    onAndCancel(e, n, r) {
      return (
        e.addEventListener(n, r),
        () => {
          e.removeEventListener(n, r);
        }
      );
    }
    dispatchEvent(e, n) {
      e.dispatchEvent(n);
    }
    remove(e) {
      e.parentNode && e.parentNode.removeChild(e);
    }
    createElement(e, n) {
      return (n = n || this.getDefaultDocument()), n.createElement(e);
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
    getGlobalEventTarget(e, n) {
      return n === 'window'
        ? window
        : n === 'document'
        ? e
        : n === 'body'
        ? e.body
        : null;
    }
    getBaseHref(e) {
      let n = MN();
      return n == null ? null : NN(n);
    }
    resetBaseElement() {
      _o = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(e) {
      return Bb(document.cookie, e);
    }
  },
  _o = null;
function MN() {
  return (
    (_o = _o || document.querySelector('base')),
    _o ? _o.getAttribute('href') : null
  );
}
function NN(t) {
  return new URL(t, document.baseURI).pathname;
}
var AN = (() => {
    let e = class e {
      build() {
        return new XMLHttpRequest();
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  To = new le('EventManagerPlugins'),
  t0 = (() => {
    let e = class e {
      constructor(r, i) {
        (this._zone = i),
          (this._eventNameToPlugin = new Map()),
          r.forEach((s) => {
            s.manager = this;
          }),
          (this._plugins = r.slice().reverse());
      }
      addEventListener(r, i, s) {
        return this._findPluginFor(i).addEventListener(r, i, s);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(r) {
        let i = this._eventNameToPlugin.get(r);
        if (i) return i;
        if (((i = this._plugins.find((o) => o.supports(r))), !i))
          throw new z(5101, !1);
        return this._eventNameToPlugin.set(r, i), i;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(X(To), X(Fe));
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  as = class {
    constructor(e) {
      this._doc = e;
    }
  },
  $h = 'ng-app-id',
  n0 = (() => {
    let e = class e {
      constructor(r, i, s, o = {}) {
        (this.doc = r),
          (this.appId = i),
          (this.nonce = s),
          (this.platformId = o),
          (this.styleRef = new Map()),
          (this.hostNodes = new Set()),
          (this.styleNodesInDOM = this.collectServerRenderedStyles()),
          (this.platformIsServer = Ph(o)),
          this.resetHostNodes();
      }
      addStyles(r) {
        for (let i of r)
          this.changeUsageCount(i, 1) === 1 && this.onStyleAdded(i);
      }
      removeStyles(r) {
        for (let i of r)
          this.changeUsageCount(i, -1) <= 0 && this.onStyleRemoved(i);
      }
      ngOnDestroy() {
        let r = this.styleNodesInDOM;
        r && (r.forEach((i) => i.remove()), r.clear());
        for (let i of this.getAllStyles()) this.onStyleRemoved(i);
        this.resetHostNodes();
      }
      addHost(r) {
        this.hostNodes.add(r);
        for (let i of this.getAllStyles()) this.addStyleToHost(r, i);
      }
      removeHost(r) {
        this.hostNodes.delete(r);
      }
      getAllStyles() {
        return this.styleRef.keys();
      }
      onStyleAdded(r) {
        for (let i of this.hostNodes) this.addStyleToHost(i, r);
      }
      onStyleRemoved(r) {
        let i = this.styleRef;
        i.get(r)?.elements?.forEach((s) => s.remove()), i.delete(r);
      }
      collectServerRenderedStyles() {
        let r = this.doc.head?.querySelectorAll(`style[${$h}="${this.appId}"]`);
        if (r?.length) {
          let i = new Map();
          return (
            r.forEach((s) => {
              s.textContent != null && i.set(s.textContent, s);
            }),
            i
          );
        }
        return null;
      }
      changeUsageCount(r, i) {
        let s = this.styleRef;
        if (s.has(r)) {
          let o = s.get(r);
          return (o.usage += i), o.usage;
        }
        return s.set(r, { usage: i, elements: [] }), i;
      }
      getStyleElement(r, i) {
        let s = this.styleNodesInDOM,
          o = s?.get(i);
        if (o?.parentNode === r) return s.delete(i), o.removeAttribute($h), o;
        {
          let a = this.doc.createElement('style');
          return (
            this.nonce && a.setAttribute('nonce', this.nonce),
            (a.textContent = i),
            this.platformIsServer && a.setAttribute($h, this.appId),
            r.appendChild(a),
            a
          );
        }
      }
      addStyleToHost(r, i) {
        let s = this.getStyleElement(r, i),
          o = this.styleRef,
          a = o.get(i)?.elements;
        a ? a.push(s) : o.set(i, { elements: [s], usage: 1 });
      }
      resetHostNodes() {
        let r = this.hostNodes;
        r.clear(), r.add(this.doc.head);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(X(Ve), X(ts), X(nh, 8), X(sn));
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  qh = {
    svg: 'http://www.w3.org/2000/svg',
    xhtml: 'http://www.w3.org/1999/xhtml',
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace',
    xmlns: 'http://www.w3.org/2000/xmlns/',
    math: 'http://www.w3.org/1998/MathML/',
  },
  Wh = /%COMP%/g,
  r0 = '%COMP%',
  xN = `_nghost-${r0}`,
  RN = `_ngcontent-${r0}`,
  ON = !0,
  kN = new le('RemoveStylesOnCompDestroy', {
    providedIn: 'root',
    factory: () => ON,
  });
function LN(t) {
  return RN.replace(Wh, t);
}
function PN(t) {
  return xN.replace(Wh, t);
}
function i0(t, e) {
  return e.map((n) => n.replace(Wh, t));
}
var Al = (() => {
    let e = class e {
      constructor(r, i, s, o, a, c, l, u = null) {
        (this.eventManager = r),
          (this.sharedStylesHost = i),
          (this.appId = s),
          (this.removeStylesOnCompDestroy = o),
          (this.doc = a),
          (this.platformId = c),
          (this.ngZone = l),
          (this.nonce = u),
          (this.rendererByCompId = new Map()),
          (this.platformIsServer = Ph(c)),
          (this.defaultRenderer = new So(r, a, l, this.platformIsServer));
      }
      createRenderer(r, i) {
        if (!r || !i) return this.defaultRenderer;
        this.platformIsServer &&
          i.encapsulation === tn.ShadowDom &&
          (i = nt(te({}, i), { encapsulation: tn.Emulated }));
        let s = this.getOrCreateRenderer(r, i);
        return (
          s instanceof xl
            ? s.applyToHost(r)
            : s instanceof Co && s.applyStyles(),
          s
        );
      }
      getOrCreateRenderer(r, i) {
        let s = this.rendererByCompId,
          o = s.get(i.id);
        if (!o) {
          let a = this.doc,
            c = this.ngZone,
            l = this.eventManager,
            u = this.sharedStylesHost,
            d = this.removeStylesOnCompDestroy,
            m = this.platformIsServer;
          switch (i.encapsulation) {
            case tn.Emulated:
              o = new xl(l, u, i, this.appId, d, a, c, m);
              break;
            case tn.ShadowDom:
              return new Gh(l, u, r, i, a, c, this.nonce, m);
            default:
              o = new Co(l, u, i, d, a, c, m);
              break;
          }
          s.set(i.id, o);
        }
        return o;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(
        X(t0),
        X(n0),
        X(ts),
        X(kN),
        X(Ve),
        X(sn),
        X(Fe),
        X(nh)
      );
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  So = class {
    constructor(e, n, r, i) {
      (this.eventManager = e),
        (this.doc = n),
        (this.ngZone = r),
        (this.platformIsServer = i),
        (this.data = Object.create(null)),
        (this.throwOnSyntheticProps = !0),
        (this.destroyNode = null);
    }
    destroy() {}
    createElement(e, n) {
      return n
        ? this.doc.createElementNS(qh[n] || n, e)
        : this.doc.createElement(e);
    }
    createComment(e) {
      return this.doc.createComment(e);
    }
    createText(e) {
      return this.doc.createTextNode(e);
    }
    appendChild(e, n) {
      (Jb(e) ? e.content : e).appendChild(n);
    }
    insertBefore(e, n, r) {
      e && (Jb(e) ? e.content : e).insertBefore(n, r);
    }
    removeChild(e, n) {
      e && e.removeChild(n);
    }
    selectRootElement(e, n) {
      let r = typeof e == 'string' ? this.doc.querySelector(e) : e;
      if (!r) throw new z(-5104, !1);
      return n || (r.textContent = ''), r;
    }
    parentNode(e) {
      return e.parentNode;
    }
    nextSibling(e) {
      return e.nextSibling;
    }
    setAttribute(e, n, r, i) {
      if (i) {
        n = i + ':' + n;
        let s = qh[i];
        s ? e.setAttributeNS(s, n, r) : e.setAttribute(n, r);
      } else e.setAttribute(n, r);
    }
    removeAttribute(e, n, r) {
      if (r) {
        let i = qh[r];
        i ? e.removeAttributeNS(i, n) : e.removeAttribute(`${r}:${n}`);
      } else e.removeAttribute(n);
    }
    addClass(e, n) {
      e.classList.add(n);
    }
    removeClass(e, n) {
      e.classList.remove(n);
    }
    setStyle(e, n, r, i) {
      i & (jn.DashCase | jn.Important)
        ? e.style.setProperty(n, r, i & jn.Important ? 'important' : '')
        : (e.style[n] = r);
    }
    removeStyle(e, n, r) {
      r & jn.DashCase ? e.style.removeProperty(n) : (e.style[n] = '');
    }
    setProperty(e, n, r) {
      e != null && (e[n] = r);
    }
    setValue(e, n) {
      e.nodeValue = n;
    }
    listen(e, n, r) {
      if (
        typeof e == 'string' &&
        ((e = vn().getGlobalEventTarget(this.doc, e)), !e)
      )
        throw new Error(`Unsupported event target ${e} for event ${n}`);
      return this.eventManager.addEventListener(
        e,
        n,
        this.decoratePreventDefault(r)
      );
    }
    decoratePreventDefault(e) {
      return (n) => {
        if (n === '__ngUnwrap__') return e;
        (this.platformIsServer ? this.ngZone.runGuarded(() => e(n)) : e(n)) ===
          !1 && n.preventDefault();
      };
    }
  };
function Jb(t) {
  return t.tagName === 'TEMPLATE' && t.content !== void 0;
}
var Gh = class extends So {
    constructor(e, n, r, i, s, o, a, c) {
      super(e, s, o, c),
        (this.sharedStylesHost = n),
        (this.hostEl = r),
        (this.shadowRoot = r.attachShadow({ mode: 'open' })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let l = i0(i.id, i.styles);
      for (let u of l) {
        let d = document.createElement('style');
        a && d.setAttribute('nonce', a),
          (d.textContent = u),
          this.shadowRoot.appendChild(d);
      }
    }
    nodeOrShadowRoot(e) {
      return e === this.hostEl ? this.shadowRoot : e;
    }
    appendChild(e, n) {
      return super.appendChild(this.nodeOrShadowRoot(e), n);
    }
    insertBefore(e, n, r) {
      return super.insertBefore(this.nodeOrShadowRoot(e), n, r);
    }
    removeChild(e, n) {
      return super.removeChild(this.nodeOrShadowRoot(e), n);
    }
    parentNode(e) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  Co = class extends So {
    constructor(e, n, r, i, s, o, a, c) {
      super(e, s, o, a),
        (this.sharedStylesHost = n),
        (this.removeStylesOnCompDestroy = i),
        (this.styles = c ? i0(c, r.styles) : r.styles);
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        this.sharedStylesHost.removeStyles(this.styles);
    }
  },
  xl = class extends Co {
    constructor(e, n, r, i, s, o, a, c) {
      let l = i + '-' + r.id;
      super(e, n, r, s, o, a, c, l),
        (this.contentAttr = LN(l)),
        (this.hostAttr = PN(l));
    }
    applyToHost(e) {
      this.applyStyles(), this.setAttribute(e, this.hostAttr, '');
    }
    createElement(e, n) {
      let r = super.createElement(e, n);
      return super.setAttribute(r, this.contentAttr, ''), r;
    }
  },
  FN = (() => {
    let e = class e extends as {
      constructor(r) {
        super(r);
      }
      supports(r) {
        return !0;
      }
      addEventListener(r, i, s) {
        return (
          r.addEventListener(i, s, !1), () => this.removeEventListener(r, i, s)
        );
      }
      removeEventListener(r, i, s) {
        return r.removeEventListener(i, s);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(X(Ve));
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  e0 = ['alt', 'control', 'meta', 'shift'],
  jN = {
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
  HN = {
    alt: (t) => t.altKey,
    control: (t) => t.ctrlKey,
    meta: (t) => t.metaKey,
    shift: (t) => t.shiftKey,
  },
  BN = (() => {
    let e = class e extends as {
      constructor(r) {
        super(r);
      }
      supports(r) {
        return e.parseEventName(r) != null;
      }
      addEventListener(r, i, s) {
        let o = e.parseEventName(i),
          a = e.eventCallback(o.fullKey, s, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => vn().onAndCancel(r, o.domEventName, a));
      }
      static parseEventName(r) {
        let i = r.toLowerCase().split('.'),
          s = i.shift();
        if (i.length === 0 || !(s === 'keydown' || s === 'keyup')) return null;
        let o = e._normalizeKey(i.pop()),
          a = '',
          c = i.indexOf('code');
        if (
          (c > -1 && (i.splice(c, 1), (a = 'code.')),
          e0.forEach((u) => {
            let d = i.indexOf(u);
            d > -1 && (i.splice(d, 1), (a += u + '.'));
          }),
          (a += o),
          i.length != 0 || o.length === 0)
        )
          return null;
        let l = {};
        return (l.domEventName = s), (l.fullKey = a), l;
      }
      static matchEventFullKeyCode(r, i) {
        let s = jN[r.key] || r.key,
          o = '';
        return (
          i.indexOf('code.') > -1 && ((s = r.code), (o = 'code.')),
          s == null || !s
            ? !1
            : ((s = s.toLowerCase()),
              s === ' ' ? (s = 'space') : s === '.' && (s = 'dot'),
              e0.forEach((a) => {
                if (a !== s) {
                  let c = HN[a];
                  c(r) && (o += a + '.');
                }
              }),
              (o += s),
              o === i)
        );
      }
      static eventCallback(r, i, s) {
        return (o) => {
          e.matchEventFullKeyCode(o, r) && s.runGuarded(() => i(o));
        };
      }
      static _normalizeKey(r) {
        return r === 'esc' ? 'escape' : r;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(X(Ve));
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })();
function f9(t, e) {
  return Sb(te({ rootComponent: t }, VN(e)));
}
function VN(t) {
  return {
    appProviders: [...GN, ...(t?.providers ?? [])],
    platformProviders: zN,
  };
}
function UN() {
  Do.makeCurrent();
}
function $N() {
  return new rn();
}
function qN() {
  return Jc(document), document;
}
var zN = [
  { provide: sn, useValue: kh },
  { provide: fo, useValue: UN, multi: !0 },
  { provide: Ve, useFactory: qN, deps: [] },
];
var GN = [
  { provide: Xc, useValue: 'root' },
  { provide: rn, useFactory: $N, deps: [] },
  { provide: To, useClass: FN, multi: !0, deps: [Ve, Fe, sn] },
  { provide: To, useClass: BN, multi: !0, deps: [Ve] },
  Al,
  n0,
  t0,
  { provide: ti, useExisting: Al },
  { provide: is, useClass: AN, deps: [] },
  [],
];
function WN() {
  return new Kh(X(Ve));
}
var Kh = (() => {
  let e = class e {
    constructor(r) {
      this._doc = r;
    }
    getTitle() {
      return this._doc.title;
    }
    setTitle(r) {
      this._doc.title = r || '';
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(X(Ve));
  }),
    (e.ɵprov = J({
      token: e,
      factory: function (i) {
        let s = null;
        return i ? (s = new i()) : (s = WN()), s;
      },
      providedIn: 'root',
    }));
  let t = e;
  return t;
})();
var KN = (() => {
  let e = class e {};
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵprov = J({
      token: e,
      factory: function (i) {
        let s = null;
        return i ? (s = new (i || e)()) : (s = X(s0)), s;
      },
      providedIn: 'root',
    }));
  let t = e;
  return t;
})();
function QN(t) {
  return new s0(t.get(Ve));
}
var s0 = (() => {
  let e = class e extends KN {
    constructor(r) {
      super(), (this._doc = r);
    }
    sanitize(r, i) {
      if (i == null) return null;
      switch (r) {
        case $n.NONE:
          return i;
        case $n.HTML:
          return ii(i, 'HTML') ? gn(i) : eE(this._doc, String(i)).toString();
        case $n.STYLE:
          return ii(i, 'Style') ? gn(i) : i;
        case $n.SCRIPT:
          if (ii(i, 'Script')) return gn(i);
          throw new z(5200, !1);
        case $n.URL:
          return ii(i, 'URL') ? gn(i) : il(String(i));
        case $n.RESOURCE_URL:
          if (ii(i, 'ResourceURL')) return gn(i);
          throw new z(5201, !1);
        default:
          throw new z(5202, !1);
      }
    }
    bypassSecurityTrustHtml(r) {
      return zv(r);
    }
    bypassSecurityTrustStyle(r) {
      return Gv(r);
    }
    bypassSecurityTrustScript(r) {
      return Wv(r);
    }
    bypassSecurityTrustUrl(r) {
      return Kv(r);
    }
    bypassSecurityTrustResourceUrl(r) {
      return Qv(r);
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(X(Ve));
  }),
    (e.ɵprov = J({
      token: e,
      factory: function (i) {
        let s = null;
        return i ? (s = new i()) : (s = QN(X(Ct))), s;
      },
      providedIn: 'root',
    }));
  let t = e;
  return t;
})();
function h9(...t) {
  let e = [],
    n = new Set(),
    r = n.has(1);
  for (let { ɵproviders: i, ɵkind: s } of t) n.add(s), i.length && e.push(i);
  return Bn([[], Rb(), n.has(0) || r ? [] : Xb({}), e]);
}
var En = '*';
function m9(t, e) {
  return { type: 7, name: t, definitions: e, options: {} };
}
function g9(t, e = null) {
  return { type: 4, styles: e, timings: t };
}
function o0(t, e = null) {
  return { type: 2, steps: t, options: e };
}
function Qh(t) {
  return { type: 6, styles: t, offset: null };
}
function y9(t, e, n) {
  return { type: 0, name: t, styles: e, options: n };
}
function v9(t, e, n = null) {
  return { type: 1, expr: t, animation: e, options: n };
}
var Cr = class {
    constructor(e = 0, n = 0) {
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
        (this.totalTime = e + n);
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
      let n = e == 'start' ? this._onStartFns : this._onDoneFns;
      n.forEach((r) => r()), (n.length = 0);
    }
  },
  Io = class {
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
      let n = 0,
        r = 0,
        i = 0,
        s = this.players.length;
      s == 0
        ? queueMicrotask(() => this._onFinish())
        : this.players.forEach((o) => {
            o.onDone(() => {
              ++n == s && this._onFinish();
            }),
              o.onDestroy(() => {
                ++r == s && this._onDestroy();
              }),
              o.onStart(() => {
                ++i == s && this._onStart();
              });
          }),
        (this.totalTime = this.players.reduce(
          (o, a) => Math.max(o, a.totalTime),
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
      let n = e * this.totalTime;
      this.players.forEach((r) => {
        let i = r.totalTime ? Math.min(1, n / r.totalTime) : 1;
        r.setPosition(i);
      });
    }
    getPosition() {
      let e = this.players.reduce(
        (n, r) => (n === null || r.totalTime > n.totalTime ? r : n),
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
      let n = e == 'start' ? this._onStartFns : this._onDoneFns;
      n.forEach((r) => r()), (n.length = 0);
    }
  },
  Rl = '!';
function a0(t) {
  return new z(3e3, !1);
}
function ZN() {
  return new z(3100, !1);
}
function XN() {
  return new z(3101, !1);
}
function JN(t) {
  return new z(3001, !1);
}
function eA(t) {
  return new z(3003, !1);
}
function tA(t) {
  return new z(3004, !1);
}
function nA(t, e) {
  return new z(3005, !1);
}
function rA() {
  return new z(3006, !1);
}
function iA() {
  return new z(3007, !1);
}
function sA(t, e) {
  return new z(3008, !1);
}
function oA(t) {
  return new z(3002, !1);
}
function aA(t, e, n, r, i) {
  return new z(3010, !1);
}
function cA() {
  return new z(3011, !1);
}
function lA() {
  return new z(3012, !1);
}
function uA() {
  return new z(3200, !1);
}
function dA() {
  return new z(3202, !1);
}
function fA() {
  return new z(3013, !1);
}
function hA(t) {
  return new z(3014, !1);
}
function pA(t) {
  return new z(3015, !1);
}
function mA(t) {
  return new z(3016, !1);
}
function gA(t, e) {
  return new z(3404, !1);
}
function yA(t) {
  return new z(3502, !1);
}
function vA(t) {
  return new z(3503, !1);
}
function EA() {
  return new z(3300, !1);
}
function bA(t) {
  return new z(3504, !1);
}
function wA(t) {
  return new z(3301, !1);
}
function _A(t, e) {
  return new z(3302, !1);
}
function DA(t) {
  return new z(3303, !1);
}
function TA(t, e) {
  return new z(3400, !1);
}
function SA(t) {
  return new z(3401, !1);
}
function CA(t) {
  return new z(3402, !1);
}
function IA(t, e) {
  return new z(3505, !1);
}
function Ir(t) {
  switch (t.length) {
    case 0:
      return new Cr();
    case 1:
      return t[0];
    default:
      return new Io(t);
  }
}
function w0(t, e, n = new Map(), r = new Map()) {
  let i = [],
    s = [],
    o = -1,
    a = null;
  if (
    (e.forEach((c) => {
      let l = c.get('offset'),
        u = l == o,
        d = (u && a) || new Map();
      c.forEach((m, E) => {
        let I = E,
          M = m;
        if (E !== 'offset')
          switch (((I = t.normalizePropertyName(I, i)), M)) {
            case Rl:
              M = n.get(E);
              break;
            case En:
              M = r.get(E);
              break;
            default:
              M = t.normalizeStyleValue(E, I, M, i);
              break;
          }
        d.set(I, M);
      }),
        u || s.push(d),
        (a = d),
        (o = l);
    }),
    i.length)
  )
    throw yA(i);
  return s;
}
function yp(t, e, n, r) {
  switch (e) {
    case 'start':
      t.onStart(() => r(n && Yh(n, 'start', t)));
      break;
    case 'done':
      t.onDone(() => r(n && Yh(n, 'done', t)));
      break;
    case 'destroy':
      t.onDestroy(() => r(n && Yh(n, 'destroy', t)));
      break;
  }
}
function Yh(t, e, n) {
  let r = n.totalTime,
    i = !!n.disabled,
    s = vp(
      t.element,
      t.triggerName,
      t.fromState,
      t.toState,
      e || t.phaseName,
      r ?? t.totalTime,
      i
    ),
    o = t._data;
  return o != null && (s._data = o), s;
}
function vp(t, e, n, r, i = '', s = 0, o) {
  return {
    element: t,
    triggerName: e,
    fromState: n,
    toState: r,
    phaseName: i,
    totalTime: s,
    disabled: !!o,
  };
}
function Bt(t, e, n) {
  let r = t.get(e);
  return r || t.set(e, (r = n)), r;
}
function c0(t) {
  let e = t.indexOf(':'),
    n = t.substring(1, e),
    r = t.slice(e + 1);
  return [n, r];
}
var MA = (() => (typeof document > 'u' ? null : document.documentElement))();
function Ep(t) {
  let e = t.parentNode || t.host || null;
  return e === MA ? null : e;
}
function NA(t) {
  return t.substring(1, 6) == 'ebkit';
}
var di = null,
  l0 = !1;
function AA(t) {
  di ||
    ((di = xA() || {}), (l0 = di.style ? 'WebkitAppearance' in di.style : !1));
  let e = !0;
  return (
    di.style &&
      !NA(t) &&
      ((e = t in di.style),
      !e &&
        l0 &&
        (e = 'Webkit' + t.charAt(0).toUpperCase() + t.slice(1) in di.style)),
    e
  );
}
function xA() {
  return typeof document < 'u' ? document.body : null;
}
function _0(t, e) {
  for (; e; ) {
    if (e === t) return !0;
    e = Ep(e);
  }
  return !1;
}
function D0(t, e, n) {
  if (n) return Array.from(t.querySelectorAll(e));
  let r = t.querySelector(e);
  return r ? [r] : [];
}
var bp = (() => {
    let e = class e {
      validateStyleProperty(r) {
        return AA(r);
      }
      matchesElement(r, i) {
        return !1;
      }
      containsElement(r, i) {
        return _0(r, i);
      }
      getParentElement(r) {
        return Ep(r);
      }
      query(r, i, s) {
        return D0(r, i, s);
      }
      computeStyle(r, i, s) {
        return s || '';
      }
      animate(r, i, s, o, a, c = [], l) {
        return new Cr(s, o);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  ko = (() => {
    let e = class e {};
    e.NOOP = new bp();
    let t = e;
    return t;
  })(),
  pi = class {};
var RA = 1e3,
  T0 = '{{',
  OA = '}}',
  S0 = 'ng-enter',
  np = 'ng-leave',
  Ol = 'ng-trigger',
  jl = '.ng-trigger',
  u0 = 'ng-animating',
  rp = '.ng-animating';
function zn(t) {
  if (typeof t == 'number') return t;
  let e = t.match(/^(-?[\.\d]+)(m?s)/);
  return !e || e.length < 2 ? 0 : ip(parseFloat(e[1]), e[2]);
}
function ip(t, e) {
  switch (e) {
    case 's':
      return t * RA;
    default:
      return t;
  }
}
function Hl(t, e, n) {
  return t.hasOwnProperty('duration') ? t : kA(t, e, n);
}
function kA(t, e, n) {
  let r =
      /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i,
    i,
    s = 0,
    o = '';
  if (typeof t == 'string') {
    let a = t.match(r);
    if (a === null) return e.push(a0(t)), { duration: 0, delay: 0, easing: '' };
    i = ip(parseFloat(a[1]), a[2]);
    let c = a[3];
    c != null && (s = ip(parseFloat(c), a[4]));
    let l = a[5];
    l && (o = l);
  } else i = t;
  if (!n) {
    let a = !1,
      c = e.length;
    i < 0 && (e.push(ZN()), (a = !0)),
      s < 0 && (e.push(XN()), (a = !0)),
      a && e.splice(c, 0, a0(t));
  }
  return { duration: i, delay: s, easing: o };
}
function Lo(t, e = {}) {
  return (
    Object.keys(t).forEach((n) => {
      e[n] = t[n];
    }),
    e
  );
}
function C0(t) {
  let e = new Map();
  return (
    Object.keys(t).forEach((n) => {
      let r = t[n];
      e.set(n, r);
    }),
    e
  );
}
function LA(t) {
  return t.length ? (t[0] instanceof Map ? t : t.map((e) => C0(e))) : [];
}
function ls(t, e = new Map(), n) {
  if (n) for (let [r, i] of n) e.set(r, i);
  for (let [r, i] of t) e.set(r, i);
  return e;
}
function bn(t, e, n) {
  e.forEach((r, i) => {
    let s = wp(i);
    n && !n.has(i) && n.set(i, t.style[s]), (t.style[s] = r);
  });
}
function hi(t, e) {
  e.forEach((n, r) => {
    let i = wp(r);
    t.style[i] = '';
  });
}
function Mo(t) {
  return Array.isArray(t) ? (t.length == 1 ? t[0] : o0(t)) : t;
}
function PA(t, e, n) {
  let r = e.params || {},
    i = I0(t);
  i.length &&
    i.forEach((s) => {
      r.hasOwnProperty(s) || n.push(JN(s));
    });
}
var sp = new RegExp(`${T0}\\s*(.+?)\\s*${OA}`, 'g');
function I0(t) {
  let e = [];
  if (typeof t == 'string') {
    let n;
    for (; (n = sp.exec(t)); ) e.push(n[1]);
    sp.lastIndex = 0;
  }
  return e;
}
function Ao(t, e, n) {
  let r = t.toString(),
    i = r.replace(sp, (s, o) => {
      let a = e[o];
      return a == null && (n.push(eA(o)), (a = '')), a.toString();
    });
  return i == r ? t : i;
}
function Bl(t) {
  let e = [],
    n = t.next();
  for (; !n.done; ) e.push(n.value), (n = t.next());
  return e;
}
var FA = /-+([a-z0-9])/g;
function wp(t) {
  return t.replace(FA, (...e) => e[1].toUpperCase());
}
function jA(t, e) {
  return t === 0 || e === 0;
}
function HA(t, e, n) {
  if (n.size && e.length) {
    let r = e[0],
      i = [];
    if (
      (n.forEach((s, o) => {
        r.has(o) || i.push(o), r.set(o, s);
      }),
      i.length)
    )
      for (let s = 1; s < e.length; s++) {
        let o = e[s];
        i.forEach((a) => o.set(a, M0(t, a)));
      }
  }
  return e;
}
function Ht(t, e, n) {
  switch (e.type) {
    case 7:
      return t.visitTrigger(e, n);
    case 0:
      return t.visitState(e, n);
    case 1:
      return t.visitTransition(e, n);
    case 2:
      return t.visitSequence(e, n);
    case 3:
      return t.visitGroup(e, n);
    case 4:
      return t.visitAnimate(e, n);
    case 5:
      return t.visitKeyframes(e, n);
    case 6:
      return t.visitStyle(e, n);
    case 8:
      return t.visitReference(e, n);
    case 9:
      return t.visitAnimateChild(e, n);
    case 10:
      return t.visitAnimateRef(e, n);
    case 11:
      return t.visitQuery(e, n);
    case 12:
      return t.visitStagger(e, n);
    default:
      throw tA(e.type);
  }
}
function M0(t, e) {
  return window.getComputedStyle(t)[e];
}
var BA = new Set([
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
  Vl = class extends pi {
    normalizePropertyName(e, n) {
      return wp(e);
    }
    normalizeStyleValue(e, n, r, i) {
      let s = '',
        o = r.toString().trim();
      if (BA.has(n) && r !== 0 && r !== '0')
        if (typeof r == 'number') s = 'px';
        else {
          let a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
          a && a[1].length == 0 && i.push(nA(e, r));
        }
      return o + s;
    }
  };
var Ul = '*';
function VA(t, e) {
  let n = [];
  return (
    typeof t == 'string'
      ? t.split(/\s*,\s*/).forEach((r) => UA(r, n, e))
      : n.push(t),
    n
  );
}
function UA(t, e, n) {
  if (t[0] == ':') {
    let c = $A(t, n);
    if (typeof c == 'function') {
      e.push(c);
      return;
    }
    t = c;
  }
  let r = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
  if (r == null || r.length < 4) return n.push(pA(t)), e;
  let i = r[1],
    s = r[2],
    o = r[3];
  e.push(d0(i, o));
  let a = i == Ul && o == Ul;
  s[0] == '<' && !a && e.push(d0(o, i));
}
function $A(t, e) {
  switch (t) {
    case ':enter':
      return 'void => *';
    case ':leave':
      return '* => void';
    case ':increment':
      return (n, r) => parseFloat(r) > parseFloat(n);
    case ':decrement':
      return (n, r) => parseFloat(r) < parseFloat(n);
    default:
      return e.push(mA(t)), '* => *';
  }
}
var kl = new Set(['true', '1']),
  Ll = new Set(['false', '0']);
function d0(t, e) {
  let n = kl.has(t) || Ll.has(t),
    r = kl.has(e) || Ll.has(e);
  return (i, s) => {
    let o = t == Ul || t == i,
      a = e == Ul || e == s;
    return (
      !o && n && typeof i == 'boolean' && (o = i ? kl.has(t) : Ll.has(t)),
      !a && r && typeof s == 'boolean' && (a = s ? kl.has(e) : Ll.has(e)),
      o && a
    );
  };
}
var N0 = ':self',
  qA = new RegExp(`s*${N0}s*,?`, 'g');
function A0(t, e, n, r) {
  return new op(t).build(e, n, r);
}
var f0 = '',
  op = class {
    constructor(e) {
      this._driver = e;
    }
    build(e, n, r) {
      let i = new ap(n);
      return this._resetContextStyleTimingState(i), Ht(this, Mo(e), i);
    }
    _resetContextStyleTimingState(e) {
      (e.currentQuerySelector = f0),
        (e.collectedStyles = new Map()),
        e.collectedStyles.set(f0, new Map()),
        (e.currentTime = 0);
    }
    visitTrigger(e, n) {
      let r = (n.queryCount = 0),
        i = (n.depCount = 0),
        s = [],
        o = [];
      return (
        e.name.charAt(0) == '@' && n.errors.push(rA()),
        e.definitions.forEach((a) => {
          if ((this._resetContextStyleTimingState(n), a.type == 0)) {
            let c = a,
              l = c.name;
            l
              .toString()
              .split(/\s*,\s*/)
              .forEach((u) => {
                (c.name = u), s.push(this.visitState(c, n));
              }),
              (c.name = l);
          } else if (a.type == 1) {
            let c = this.visitTransition(a, n);
            (r += c.queryCount), (i += c.depCount), o.push(c);
          } else n.errors.push(iA());
        }),
        {
          type: 7,
          name: e.name,
          states: s,
          transitions: o,
          queryCount: r,
          depCount: i,
          options: null,
        }
      );
    }
    visitState(e, n) {
      let r = this.visitStyle(e.styles, n),
        i = (e.options && e.options.params) || null;
      if (r.containsDynamicStyles) {
        let s = new Set(),
          o = i || {};
        if (
          (r.styles.forEach((a) => {
            a instanceof Map &&
              a.forEach((c) => {
                I0(c).forEach((l) => {
                  o.hasOwnProperty(l) || s.add(l);
                });
              });
          }),
          s.size)
        ) {
          let a = Bl(s.values());
          n.errors.push(sA(e.name, a));
        }
      }
      return {
        type: 0,
        name: e.name,
        style: r,
        options: i ? { params: i } : null,
      };
    }
    visitTransition(e, n) {
      (n.queryCount = 0), (n.depCount = 0);
      let r = Ht(this, Mo(e.animation), n);
      return {
        type: 1,
        matchers: VA(e.expr, n.errors),
        animation: r,
        queryCount: n.queryCount,
        depCount: n.depCount,
        options: fi(e.options),
      };
    }
    visitSequence(e, n) {
      return {
        type: 2,
        steps: e.steps.map((r) => Ht(this, r, n)),
        options: fi(e.options),
      };
    }
    visitGroup(e, n) {
      let r = n.currentTime,
        i = 0,
        s = e.steps.map((o) => {
          n.currentTime = r;
          let a = Ht(this, o, n);
          return (i = Math.max(i, n.currentTime)), a;
        });
      return (n.currentTime = i), { type: 3, steps: s, options: fi(e.options) };
    }
    visitAnimate(e, n) {
      let r = KA(e.timings, n.errors);
      n.currentAnimateTimings = r;
      let i,
        s = e.styles ? e.styles : Qh({});
      if (s.type == 5) i = this.visitKeyframes(s, n);
      else {
        let o = e.styles,
          a = !1;
        if (!o) {
          a = !0;
          let l = {};
          r.easing && (l.easing = r.easing), (o = Qh(l));
        }
        n.currentTime += r.duration + r.delay;
        let c = this.visitStyle(o, n);
        (c.isEmptyStep = a), (i = c);
      }
      return (
        (n.currentAnimateTimings = null),
        { type: 4, timings: r, style: i, options: null }
      );
    }
    visitStyle(e, n) {
      let r = this._makeStyleAst(e, n);
      return this._validateStyleAst(r, n), r;
    }
    _makeStyleAst(e, n) {
      let r = [],
        i = Array.isArray(e.styles) ? e.styles : [e.styles];
      for (let a of i)
        typeof a == 'string'
          ? a === En
            ? r.push(a)
            : n.errors.push(oA(a))
          : r.push(C0(a));
      let s = !1,
        o = null;
      return (
        r.forEach((a) => {
          if (
            a instanceof Map &&
            (a.has('easing') && ((o = a.get('easing')), a.delete('easing')), !s)
          ) {
            for (let c of a.values())
              if (c.toString().indexOf(T0) >= 0) {
                s = !0;
                break;
              }
          }
        }),
        {
          type: 6,
          styles: r,
          easing: o,
          offset: e.offset,
          containsDynamicStyles: s,
          options: null,
        }
      );
    }
    _validateStyleAst(e, n) {
      let r = n.currentAnimateTimings,
        i = n.currentTime,
        s = n.currentTime;
      r && s > 0 && (s -= r.duration + r.delay),
        e.styles.forEach((o) => {
          typeof o != 'string' &&
            o.forEach((a, c) => {
              let l = n.collectedStyles.get(n.currentQuerySelector),
                u = l.get(c),
                d = !0;
              u &&
                (s != i &&
                  s >= u.startTime &&
                  i <= u.endTime &&
                  (n.errors.push(aA(c, u.startTime, u.endTime, s, i)),
                  (d = !1)),
                (s = u.startTime)),
                d && l.set(c, { startTime: s, endTime: i }),
                n.options && PA(a, n.options, n.errors);
            });
        });
    }
    visitKeyframes(e, n) {
      let r = { type: 5, styles: [], options: null };
      if (!n.currentAnimateTimings) return n.errors.push(cA()), r;
      let i = 1,
        s = 0,
        o = [],
        a = !1,
        c = !1,
        l = 0,
        u = e.steps.map((O) => {
          let D = this._makeStyleAst(O, n),
            _ = D.offset != null ? D.offset : WA(D.styles),
            S = 0;
          return (
            _ != null && (s++, (S = D.offset = _)),
            (c = c || S < 0 || S > 1),
            (a = a || S < l),
            (l = S),
            o.push(S),
            D
          );
        });
      c && n.errors.push(lA()), a && n.errors.push(uA());
      let d = e.steps.length,
        m = 0;
      s > 0 && s < d ? n.errors.push(dA()) : s == 0 && (m = i / (d - 1));
      let E = d - 1,
        I = n.currentTime,
        M = n.currentAnimateTimings,
        j = M.duration;
      return (
        u.forEach((O, D) => {
          let _ = m > 0 ? (D == E ? 1 : m * D) : o[D],
            S = _ * j;
          (n.currentTime = I + M.delay + S),
            (M.duration = S),
            this._validateStyleAst(O, n),
            (O.offset = _),
            r.styles.push(O);
        }),
        r
      );
    }
    visitReference(e, n) {
      return {
        type: 8,
        animation: Ht(this, Mo(e.animation), n),
        options: fi(e.options),
      };
    }
    visitAnimateChild(e, n) {
      return n.depCount++, { type: 9, options: fi(e.options) };
    }
    visitAnimateRef(e, n) {
      return {
        type: 10,
        animation: this.visitReference(e.animation, n),
        options: fi(e.options),
      };
    }
    visitQuery(e, n) {
      let r = n.currentQuerySelector,
        i = e.options || {};
      n.queryCount++, (n.currentQuery = e);
      let [s, o] = zA(e.selector);
      (n.currentQuerySelector = r.length ? r + ' ' + s : s),
        Bt(n.collectedStyles, n.currentQuerySelector, new Map());
      let a = Ht(this, Mo(e.animation), n);
      return (
        (n.currentQuery = null),
        (n.currentQuerySelector = r),
        {
          type: 11,
          selector: s,
          limit: i.limit || 0,
          optional: !!i.optional,
          includeSelf: o,
          animation: a,
          originalSelector: e.selector,
          options: fi(e.options),
        }
      );
    }
    visitStagger(e, n) {
      n.currentQuery || n.errors.push(fA());
      let r =
        e.timings === 'full'
          ? { duration: 0, delay: 0, easing: 'full' }
          : Hl(e.timings, n.errors, !0);
      return {
        type: 12,
        animation: Ht(this, Mo(e.animation), n),
        timings: r,
        options: null,
      };
    }
  };
function zA(t) {
  let e = !!t.split(/\s*,\s*/).find((n) => n == N0);
  return (
    e && (t = t.replace(qA, '')),
    (t = t
      .replace(/@\*/g, jl)
      .replace(/@\w+/g, (n) => jl + '-' + n.slice(1))
      .replace(/:animating/g, rp)),
    [t, e]
  );
}
function GA(t) {
  return t ? Lo(t) : null;
}
var ap = class {
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
function WA(t) {
  if (typeof t == 'string') return null;
  let e = null;
  if (Array.isArray(t))
    t.forEach((n) => {
      if (n instanceof Map && n.has('offset')) {
        let r = n;
        (e = parseFloat(r.get('offset'))), r.delete('offset');
      }
    });
  else if (t instanceof Map && t.has('offset')) {
    let n = t;
    (e = parseFloat(n.get('offset'))), n.delete('offset');
  }
  return e;
}
function KA(t, e) {
  if (t.hasOwnProperty('duration')) return t;
  if (typeof t == 'number') {
    let s = Hl(t, e).duration;
    return Zh(s, 0, '');
  }
  let n = t;
  if (n.split(/\s+/).some((s) => s.charAt(0) == '{' && s.charAt(1) == '{')) {
    let s = Zh(0, 0, '');
    return (s.dynamic = !0), (s.strValue = n), s;
  }
  let i = Hl(n, e);
  return Zh(i.duration, i.delay, i.easing);
}
function fi(t) {
  return t ? ((t = Lo(t)), t.params && (t.params = GA(t.params))) : (t = {}), t;
}
function Zh(t, e, n) {
  return { duration: t, delay: e, easing: n };
}
function _p(t, e, n, r, i, s, o = null, a = !1) {
  return {
    type: 1,
    element: t,
    keyframes: e,
    preStyleProps: n,
    postStyleProps: r,
    duration: i,
    delay: s,
    totalTime: i + s,
    easing: o,
    subTimeline: a,
  };
}
var xo = class {
    constructor() {
      this._map = new Map();
    }
    get(e) {
      return this._map.get(e) || [];
    }
    append(e, n) {
      let r = this._map.get(e);
      r || this._map.set(e, (r = [])), r.push(...n);
    }
    has(e) {
      return this._map.has(e);
    }
    clear() {
      this._map.clear();
    }
  },
  QA = 1,
  YA = ':enter',
  ZA = new RegExp(YA, 'g'),
  XA = ':leave',
  JA = new RegExp(XA, 'g');
function x0(t, e, n, r, i, s = new Map(), o = new Map(), a, c, l = []) {
  return new cp().buildKeyframes(t, e, n, r, i, s, o, a, c, l);
}
var cp = class {
    buildKeyframes(e, n, r, i, s, o, a, c, l, u = []) {
      l = l || new xo();
      let d = new lp(e, n, l, i, s, u, []);
      d.options = c;
      let m = c.delay ? zn(c.delay) : 0;
      d.currentTimeline.delayNextStep(m),
        d.currentTimeline.setStyles([o], null, d.errors, c),
        Ht(this, r, d);
      let E = d.timelines.filter((I) => I.containsAnimation());
      if (E.length && a.size) {
        let I;
        for (let M = E.length - 1; M >= 0; M--) {
          let j = E[M];
          if (j.element === n) {
            I = j;
            break;
          }
        }
        I &&
          !I.allowOnlyTimelineStyles() &&
          I.setStyles([a], null, d.errors, c);
      }
      return E.length
        ? E.map((I) => I.buildKeyframes())
        : [_p(n, [], [], [], 0, m, '', !1)];
    }
    visitTrigger(e, n) {}
    visitState(e, n) {}
    visitTransition(e, n) {}
    visitAnimateChild(e, n) {
      let r = n.subInstructions.get(n.element);
      if (r) {
        let i = n.createSubContext(e.options),
          s = n.currentTimeline.currentTime,
          o = this._visitSubInstructions(r, i, i.options);
        s != o && n.transformIntoNewTimeline(o);
      }
      n.previousNode = e;
    }
    visitAnimateRef(e, n) {
      let r = n.createSubContext(e.options);
      r.transformIntoNewTimeline(),
        this._applyAnimationRefDelays([e.options, e.animation.options], n, r),
        this.visitReference(e.animation, r),
        n.transformIntoNewTimeline(r.currentTimeline.currentTime),
        (n.previousNode = e);
    }
    _applyAnimationRefDelays(e, n, r) {
      for (let i of e) {
        let s = i?.delay;
        if (s) {
          let o =
            typeof s == 'number' ? s : zn(Ao(s, i?.params ?? {}, n.errors));
          r.delayNextStep(o);
        }
      }
    }
    _visitSubInstructions(e, n, r) {
      let s = n.currentTimeline.currentTime,
        o = r.duration != null ? zn(r.duration) : null,
        a = r.delay != null ? zn(r.delay) : null;
      return (
        o !== 0 &&
          e.forEach((c) => {
            let l = n.appendInstructionToTimeline(c, o, a);
            s = Math.max(s, l.duration + l.delay);
          }),
        s
      );
    }
    visitReference(e, n) {
      n.updateOptions(e.options, !0),
        Ht(this, e.animation, n),
        (n.previousNode = e);
    }
    visitSequence(e, n) {
      let r = n.subContextCount,
        i = n,
        s = e.options;
      if (
        s &&
        (s.params || s.delay) &&
        ((i = n.createSubContext(s)),
        i.transformIntoNewTimeline(),
        s.delay != null)
      ) {
        i.previousNode.type == 6 &&
          (i.currentTimeline.snapshotCurrentStyles(), (i.previousNode = $l));
        let o = zn(s.delay);
        i.delayNextStep(o);
      }
      e.steps.length &&
        (e.steps.forEach((o) => Ht(this, o, i)),
        i.currentTimeline.applyStylesToKeyframe(),
        i.subContextCount > r && i.transformIntoNewTimeline()),
        (n.previousNode = e);
    }
    visitGroup(e, n) {
      let r = [],
        i = n.currentTimeline.currentTime,
        s = e.options && e.options.delay ? zn(e.options.delay) : 0;
      e.steps.forEach((o) => {
        let a = n.createSubContext(e.options);
        s && a.delayNextStep(s),
          Ht(this, o, a),
          (i = Math.max(i, a.currentTimeline.currentTime)),
          r.push(a.currentTimeline);
      }),
        r.forEach((o) => n.currentTimeline.mergeTimelineCollectedStyles(o)),
        n.transformIntoNewTimeline(i),
        (n.previousNode = e);
    }
    _visitTiming(e, n) {
      if (e.dynamic) {
        let r = e.strValue,
          i = n.params ? Ao(r, n.params, n.errors) : r;
        return Hl(i, n.errors);
      } else return { duration: e.duration, delay: e.delay, easing: e.easing };
    }
    visitAnimate(e, n) {
      let r = (n.currentAnimateTimings = this._visitTiming(e.timings, n)),
        i = n.currentTimeline;
      r.delay && (n.incrementTime(r.delay), i.snapshotCurrentStyles());
      let s = e.style;
      s.type == 5
        ? this.visitKeyframes(s, n)
        : (n.incrementTime(r.duration),
          this.visitStyle(s, n),
          i.applyStylesToKeyframe()),
        (n.currentAnimateTimings = null),
        (n.previousNode = e);
    }
    visitStyle(e, n) {
      let r = n.currentTimeline,
        i = n.currentAnimateTimings;
      !i && r.hasCurrentStyleProperties() && r.forwardFrame();
      let s = (i && i.easing) || e.easing;
      e.isEmptyStep
        ? r.applyEmptyStep(s)
        : r.setStyles(e.styles, s, n.errors, n.options),
        (n.previousNode = e);
    }
    visitKeyframes(e, n) {
      let r = n.currentAnimateTimings,
        i = n.currentTimeline.duration,
        s = r.duration,
        a = n.createSubContext().currentTimeline;
      (a.easing = r.easing),
        e.styles.forEach((c) => {
          let l = c.offset || 0;
          a.forwardTime(l * s),
            a.setStyles(c.styles, c.easing, n.errors, n.options),
            a.applyStylesToKeyframe();
        }),
        n.currentTimeline.mergeTimelineCollectedStyles(a),
        n.transformIntoNewTimeline(i + s),
        (n.previousNode = e);
    }
    visitQuery(e, n) {
      let r = n.currentTimeline.currentTime,
        i = e.options || {},
        s = i.delay ? zn(i.delay) : 0;
      s &&
        (n.previousNode.type === 6 ||
          (r == 0 && n.currentTimeline.hasCurrentStyleProperties())) &&
        (n.currentTimeline.snapshotCurrentStyles(), (n.previousNode = $l));
      let o = r,
        a = n.invokeQuery(
          e.selector,
          e.originalSelector,
          e.limit,
          e.includeSelf,
          !!i.optional,
          n.errors
        );
      n.currentQueryTotal = a.length;
      let c = null;
      a.forEach((l, u) => {
        n.currentQueryIndex = u;
        let d = n.createSubContext(e.options, l);
        s && d.delayNextStep(s),
          l === n.element && (c = d.currentTimeline),
          Ht(this, e.animation, d),
          d.currentTimeline.applyStylesToKeyframe();
        let m = d.currentTimeline.currentTime;
        o = Math.max(o, m);
      }),
        (n.currentQueryIndex = 0),
        (n.currentQueryTotal = 0),
        n.transformIntoNewTimeline(o),
        c &&
          (n.currentTimeline.mergeTimelineCollectedStyles(c),
          n.currentTimeline.snapshotCurrentStyles()),
        (n.previousNode = e);
    }
    visitStagger(e, n) {
      let r = n.parentContext,
        i = n.currentTimeline,
        s = e.timings,
        o = Math.abs(s.duration),
        a = o * (n.currentQueryTotal - 1),
        c = o * n.currentQueryIndex;
      switch (s.duration < 0 ? 'reverse' : s.easing) {
        case 'reverse':
          c = a - c;
          break;
        case 'full':
          c = r.currentStaggerTime;
          break;
      }
      let u = n.currentTimeline;
      c && u.delayNextStep(c);
      let d = u.currentTime;
      Ht(this, e.animation, n),
        (n.previousNode = e),
        (r.currentStaggerTime =
          i.currentTime - d + (i.startTime - r.currentTimeline.startTime));
    }
  },
  $l = {},
  lp = class t {
    constructor(e, n, r, i, s, o, a, c) {
      (this._driver = e),
        (this.element = n),
        (this.subInstructions = r),
        (this._enterClassName = i),
        (this._leaveClassName = s),
        (this.errors = o),
        (this.timelines = a),
        (this.parentContext = null),
        (this.currentAnimateTimings = null),
        (this.previousNode = $l),
        (this.subContextCount = 0),
        (this.options = {}),
        (this.currentQueryIndex = 0),
        (this.currentQueryTotal = 0),
        (this.currentStaggerTime = 0),
        (this.currentTimeline = c || new ql(this._driver, n, 0)),
        a.push(this.currentTimeline);
    }
    get params() {
      return this.options.params;
    }
    updateOptions(e, n) {
      if (!e) return;
      let r = e,
        i = this.options;
      r.duration != null && (i.duration = zn(r.duration)),
        r.delay != null && (i.delay = zn(r.delay));
      let s = r.params;
      if (s) {
        let o = i.params;
        o || (o = this.options.params = {}),
          Object.keys(s).forEach((a) => {
            (!n || !o.hasOwnProperty(a)) && (o[a] = Ao(s[a], o, this.errors));
          });
      }
    }
    _copyOptions() {
      let e = {};
      if (this.options) {
        let n = this.options.params;
        if (n) {
          let r = (e.params = {});
          Object.keys(n).forEach((i) => {
            r[i] = n[i];
          });
        }
      }
      return e;
    }
    createSubContext(e = null, n, r) {
      let i = n || this.element,
        s = new t(
          this._driver,
          i,
          this.subInstructions,
          this._enterClassName,
          this._leaveClassName,
          this.errors,
          this.timelines,
          this.currentTimeline.fork(i, r || 0)
        );
      return (
        (s.previousNode = this.previousNode),
        (s.currentAnimateTimings = this.currentAnimateTimings),
        (s.options = this._copyOptions()),
        s.updateOptions(e),
        (s.currentQueryIndex = this.currentQueryIndex),
        (s.currentQueryTotal = this.currentQueryTotal),
        (s.parentContext = this),
        this.subContextCount++,
        s
      );
    }
    transformIntoNewTimeline(e) {
      return (
        (this.previousNode = $l),
        (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
        this.timelines.push(this.currentTimeline),
        this.currentTimeline
      );
    }
    appendInstructionToTimeline(e, n, r) {
      let i = {
          duration: n ?? e.duration,
          delay: this.currentTimeline.currentTime + (r ?? 0) + e.delay,
          easing: '',
        },
        s = new up(
          this._driver,
          e.element,
          e.keyframes,
          e.preStyleProps,
          e.postStyleProps,
          i,
          e.stretchStartingKeyframe
        );
      return this.timelines.push(s), i;
    }
    incrementTime(e) {
      this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
    }
    delayNextStep(e) {
      e > 0 && this.currentTimeline.delayNextStep(e);
    }
    invokeQuery(e, n, r, i, s, o) {
      let a = [];
      if ((i && a.push(this.element), e.length > 0)) {
        (e = e.replace(ZA, '.' + this._enterClassName)),
          (e = e.replace(JA, '.' + this._leaveClassName));
        let c = r != 1,
          l = this._driver.query(this.element, e, c);
        r !== 0 &&
          (l = r < 0 ? l.slice(l.length + r, l.length) : l.slice(0, r)),
          a.push(...l);
      }
      return !s && a.length == 0 && o.push(hA(n)), a;
    }
  },
  ql = class t {
    constructor(e, n, r, i) {
      (this._driver = e),
        (this.element = n),
        (this.startTime = r),
        (this._elementTimelineStylesLookup = i),
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
        (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(n)),
        this._globalTimelineStyles ||
          ((this._globalTimelineStyles = this._localTimelineStyles),
          this._elementTimelineStylesLookup.set(n, this._localTimelineStyles)),
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
      let n = this._keyframes.size === 1 && this._pendingStyles.size;
      this.duration || n
        ? (this.forwardTime(this.currentTime + e),
          n && this.snapshotCurrentStyles())
        : (this.startTime += e);
    }
    fork(e, n) {
      return (
        this.applyStylesToKeyframe(),
        new t(
          this._driver,
          e,
          n || this.currentTime,
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
      (this.duration += QA), this._loadKeyframe();
    }
    forwardTime(e) {
      this.applyStylesToKeyframe(), (this.duration = e), this._loadKeyframe();
    }
    _updateStyle(e, n) {
      this._localTimelineStyles.set(e, n),
        this._globalTimelineStyles.set(e, n),
        this._styleSummary.set(e, { time: this.currentTime, value: n });
    }
    allowOnlyTimelineStyles() {
      return this._currentEmptyStepKeyframe !== this._currentKeyframe;
    }
    applyEmptyStep(e) {
      e && this._previousKeyframe.set('easing', e);
      for (let [n, r] of this._globalTimelineStyles)
        this._backFill.set(n, r || En), this._currentKeyframe.set(n, En);
      this._currentEmptyStepKeyframe = this._currentKeyframe;
    }
    setStyles(e, n, r, i) {
      n && this._previousKeyframe.set('easing', n);
      let s = (i && i.params) || {},
        o = ex(e, this._globalTimelineStyles);
      for (let [a, c] of o) {
        let l = Ao(c, s, r);
        this._pendingStyles.set(a, l),
          this._localTimelineStyles.has(a) ||
            this._backFill.set(a, this._globalTimelineStyles.get(a) ?? En),
          this._updateStyle(a, l);
      }
    }
    applyStylesToKeyframe() {
      this._pendingStyles.size != 0 &&
        (this._pendingStyles.forEach((e, n) => {
          this._currentKeyframe.set(n, e);
        }),
        this._pendingStyles.clear(),
        this._localTimelineStyles.forEach((e, n) => {
          this._currentKeyframe.has(n) || this._currentKeyframe.set(n, e);
        }));
    }
    snapshotCurrentStyles() {
      for (let [e, n] of this._localTimelineStyles)
        this._pendingStyles.set(e, n), this._updateStyle(e, n);
    }
    getFinalKeyframe() {
      return this._keyframes.get(this.duration);
    }
    get properties() {
      let e = [];
      for (let n in this._currentKeyframe) e.push(n);
      return e;
    }
    mergeTimelineCollectedStyles(e) {
      e._styleSummary.forEach((n, r) => {
        let i = this._styleSummary.get(r);
        (!i || n.time > i.time) && this._updateStyle(r, n.value);
      });
    }
    buildKeyframes() {
      this.applyStylesToKeyframe();
      let e = new Set(),
        n = new Set(),
        r = this._keyframes.size === 1 && this.duration === 0,
        i = [];
      this._keyframes.forEach((a, c) => {
        let l = ls(a, new Map(), this._backFill);
        l.forEach((u, d) => {
          u === Rl ? e.add(d) : u === En && n.add(d);
        }),
          r || l.set('offset', c / this.duration),
          i.push(l);
      });
      let s = e.size ? Bl(e.values()) : [],
        o = n.size ? Bl(n.values()) : [];
      if (r) {
        let a = i[0],
          c = new Map(a);
        a.set('offset', 0), c.set('offset', 1), (i = [a, c]);
      }
      return _p(
        this.element,
        i,
        s,
        o,
        this.duration,
        this.startTime,
        this.easing,
        !1
      );
    }
  },
  up = class extends ql {
    constructor(e, n, r, i, s, o, a = !1) {
      super(e, n, o.delay),
        (this.keyframes = r),
        (this.preStyleProps = i),
        (this.postStyleProps = s),
        (this._stretchStartingKeyframe = a),
        (this.timings = {
          duration: o.duration,
          delay: o.delay,
          easing: o.easing,
        });
    }
    containsAnimation() {
      return this.keyframes.length > 1;
    }
    buildKeyframes() {
      let e = this.keyframes,
        { delay: n, duration: r, easing: i } = this.timings;
      if (this._stretchStartingKeyframe && n) {
        let s = [],
          o = r + n,
          a = n / o,
          c = ls(e[0]);
        c.set('offset', 0), s.push(c);
        let l = ls(e[0]);
        l.set('offset', h0(a)), s.push(l);
        let u = e.length - 1;
        for (let d = 1; d <= u; d++) {
          let m = ls(e[d]),
            E = m.get('offset'),
            I = n + E * r;
          m.set('offset', h0(I / o)), s.push(m);
        }
        (r = o), (n = 0), (i = ''), (e = s);
      }
      return _p(
        this.element,
        e,
        this.preStyleProps,
        this.postStyleProps,
        r,
        n,
        i,
        !0
      );
    }
  };
function h0(t, e = 3) {
  let n = Math.pow(10, e - 1);
  return Math.round(t * n) / n;
}
function ex(t, e) {
  let n = new Map(),
    r;
  return (
    t.forEach((i) => {
      if (i === '*') {
        r = r || e.keys();
        for (let s of r) n.set(s, En);
      } else ls(i, n);
    }),
    n
  );
}
function p0(t, e, n, r, i, s, o, a, c, l, u, d, m) {
  return {
    type: 0,
    element: t,
    triggerName: e,
    isRemovalTransition: i,
    fromState: n,
    fromStyles: s,
    toState: r,
    toStyles: o,
    timelines: a,
    queriedElements: c,
    preStyleProps: l,
    postStyleProps: u,
    totalTime: d,
    errors: m,
  };
}
var Xh = {},
  zl = class {
    constructor(e, n, r) {
      (this._triggerName = e), (this.ast = n), (this._stateStyles = r);
    }
    match(e, n, r, i) {
      return tx(this.ast.matchers, e, n, r, i);
    }
    buildStyles(e, n, r) {
      let i = this._stateStyles.get('*');
      return (
        e !== void 0 && (i = this._stateStyles.get(e?.toString()) || i),
        i ? i.buildStyles(n, r) : new Map()
      );
    }
    build(e, n, r, i, s, o, a, c, l, u) {
      let d = [],
        m = (this.ast.options && this.ast.options.params) || Xh,
        E = (a && a.params) || Xh,
        I = this.buildStyles(r, E, d),
        M = (c && c.params) || Xh,
        j = this.buildStyles(i, M, d),
        O = new Set(),
        D = new Map(),
        _ = new Map(),
        S = i === 'void',
        b = { params: nx(M, m), delay: this.ast.options?.delay },
        ne = u ? [] : x0(e, n, this.ast.animation, s, o, I, j, b, l, d),
        se = 0;
      if (
        (ne.forEach((q) => {
          se = Math.max(q.duration + q.delay, se);
        }),
        d.length)
      )
        return p0(n, this._triggerName, r, i, S, I, j, [], [], D, _, se, d);
      ne.forEach((q) => {
        let R = q.element,
          F = Bt(D, R, new Set());
        q.preStyleProps.forEach((y) => F.add(y));
        let Y = Bt(_, R, new Set());
        q.postStyleProps.forEach((y) => Y.add(y)), R !== n && O.add(R);
      });
      let Ie = Bl(O.values());
      return p0(n, this._triggerName, r, i, S, I, j, ne, Ie, D, _, se);
    }
  };
function tx(t, e, n, r, i) {
  return t.some((s) => s(e, n, r, i));
}
function nx(t, e) {
  let n = Lo(e);
  for (let r in t) t.hasOwnProperty(r) && t[r] != null && (n[r] = t[r]);
  return n;
}
var dp = class {
  constructor(e, n, r) {
    (this.styles = e), (this.defaultParams = n), (this.normalizer = r);
  }
  buildStyles(e, n) {
    let r = new Map(),
      i = Lo(this.defaultParams);
    return (
      Object.keys(e).forEach((s) => {
        let o = e[s];
        o !== null && (i[s] = o);
      }),
      this.styles.styles.forEach((s) => {
        typeof s != 'string' &&
          s.forEach((o, a) => {
            o && (o = Ao(o, i, n));
            let c = this.normalizer.normalizePropertyName(a, n);
            (o = this.normalizer.normalizeStyleValue(a, c, o, n)), r.set(a, o);
          });
      }),
      r
    );
  }
};
function rx(t, e, n) {
  return new fp(t, e, n);
}
var fp = class {
  constructor(e, n, r) {
    (this.name = e),
      (this.ast = n),
      (this._normalizer = r),
      (this.transitionFactories = []),
      (this.states = new Map()),
      n.states.forEach((i) => {
        let s = (i.options && i.options.params) || {};
        this.states.set(i.name, new dp(i.style, s, r));
      }),
      m0(this.states, 'true', '1'),
      m0(this.states, 'false', '0'),
      n.transitions.forEach((i) => {
        this.transitionFactories.push(new zl(e, i, this.states));
      }),
      (this.fallbackTransition = ix(e, this.states, this._normalizer));
  }
  get containsQueries() {
    return this.ast.queryCount > 0;
  }
  matchTransition(e, n, r, i) {
    return this.transitionFactories.find((o) => o.match(e, n, r, i)) || null;
  }
  matchStyles(e, n, r) {
    return this.fallbackTransition.buildStyles(e, n, r);
  }
};
function ix(t, e, n) {
  let s = {
    type: 1,
    animation: { type: 2, steps: [], options: null },
    matchers: [(o, a) => !0],
    options: null,
    queryCount: 0,
    depCount: 0,
  };
  return new zl(t, s, e);
}
function m0(t, e, n) {
  t.has(e) ? t.has(n) || t.set(n, t.get(e)) : t.has(n) && t.set(e, t.get(n));
}
var sx = new xo(),
  hp = class {
    constructor(e, n, r) {
      (this.bodyNode = e),
        (this._driver = n),
        (this._normalizer = r),
        (this._animations = new Map()),
        (this._playersById = new Map()),
        (this.players = []);
    }
    register(e, n) {
      let r = [],
        i = [],
        s = A0(this._driver, n, r, i);
      if (r.length) throw vA(r);
      i.length && void 0, this._animations.set(e, s);
    }
    _buildPlayer(e, n, r) {
      let i = e.element,
        s = w0(this._normalizer, e.keyframes, n, r);
      return this._driver.animate(i, s, e.duration, e.delay, e.easing, [], !0);
    }
    create(e, n, r = {}) {
      let i = [],
        s = this._animations.get(e),
        o,
        a = new Map();
      if (
        (s
          ? ((o = x0(
              this._driver,
              n,
              s,
              S0,
              np,
              new Map(),
              new Map(),
              r,
              sx,
              i
            )),
            o.forEach((u) => {
              let d = Bt(a, u.element, new Map());
              u.postStyleProps.forEach((m) => d.set(m, null));
            }))
          : (i.push(EA()), (o = [])),
        i.length)
      )
        throw bA(i);
      a.forEach((u, d) => {
        u.forEach((m, E) => {
          u.set(E, this._driver.computeStyle(d, E, En));
        });
      });
      let c = o.map((u) => {
          let d = a.get(u.element);
          return this._buildPlayer(u, new Map(), d);
        }),
        l = Ir(c);
      return (
        this._playersById.set(e, l),
        l.onDestroy(() => this.destroy(e)),
        this.players.push(l),
        l
      );
    }
    destroy(e) {
      let n = this._getPlayer(e);
      n.destroy(), this._playersById.delete(e);
      let r = this.players.indexOf(n);
      r >= 0 && this.players.splice(r, 1);
    }
    _getPlayer(e) {
      let n = this._playersById.get(e);
      if (!n) throw wA(e);
      return n;
    }
    listen(e, n, r, i) {
      let s = vp(n, '', '', '');
      return yp(this._getPlayer(e), r, s, i), () => {};
    }
    command(e, n, r, i) {
      if (r == 'register') {
        this.register(e, i[0]);
        return;
      }
      if (r == 'create') {
        let o = i[0] || {};
        this.create(e, n, o);
        return;
      }
      let s = this._getPlayer(e);
      switch (r) {
        case 'play':
          s.play();
          break;
        case 'pause':
          s.pause();
          break;
        case 'reset':
          s.reset();
          break;
        case 'restart':
          s.restart();
          break;
        case 'finish':
          s.finish();
          break;
        case 'init':
          s.init();
          break;
        case 'setPosition':
          s.setPosition(parseFloat(i[0]));
          break;
        case 'destroy':
          this.destroy(e);
          break;
      }
    }
  },
  g0 = 'ng-animate-queued',
  ox = '.ng-animate-queued',
  Jh = 'ng-animate-disabled',
  ax = '.ng-animate-disabled',
  cx = 'ng-star-inserted',
  lx = '.ng-star-inserted',
  ux = [],
  R0 = {
    namespaceId: '',
    setForRemoval: !1,
    setForMove: !1,
    hasAnimation: !1,
    removedBeforeQueried: !1,
  },
  dx = {
    namespaceId: '',
    setForMove: !1,
    setForRemoval: !1,
    hasAnimation: !1,
    removedBeforeQueried: !0,
  },
  on = '__ng_removed',
  Ro = class {
    get params() {
      return this.options.params;
    }
    constructor(e, n = '') {
      this.namespaceId = n;
      let r = e && e.hasOwnProperty('value'),
        i = r ? e.value : e;
      if (((this.value = hx(i)), r)) {
        let s = Lo(e);
        delete s.value, (this.options = s);
      } else this.options = {};
      this.options.params || (this.options.params = {});
    }
    absorbOptions(e) {
      let n = e.params;
      if (n) {
        let r = this.options.params;
        Object.keys(n).forEach((i) => {
          r[i] == null && (r[i] = n[i]);
        });
      }
    }
  },
  No = 'void',
  ep = new Ro(No),
  pp = class {
    constructor(e, n, r) {
      (this.id = e),
        (this.hostElement = n),
        (this._engine = r),
        (this.players = []),
        (this._triggers = new Map()),
        (this._queue = []),
        (this._elementListeners = new Map()),
        (this._hostClassName = 'ng-tns-' + e),
        Gt(n, this._hostClassName);
    }
    listen(e, n, r, i) {
      if (!this._triggers.has(n)) throw _A(r, n);
      if (r == null || r.length == 0) throw DA(n);
      if (!px(r)) throw TA(r, n);
      let s = Bt(this._elementListeners, e, []),
        o = { name: n, phase: r, callback: i };
      s.push(o);
      let a = Bt(this._engine.statesByElement, e, new Map());
      return (
        a.has(n) || (Gt(e, Ol), Gt(e, Ol + '-' + n), a.set(n, ep)),
        () => {
          this._engine.afterFlush(() => {
            let c = s.indexOf(o);
            c >= 0 && s.splice(c, 1), this._triggers.has(n) || a.delete(n);
          });
        }
      );
    }
    register(e, n) {
      return this._triggers.has(e) ? !1 : (this._triggers.set(e, n), !0);
    }
    _getTrigger(e) {
      let n = this._triggers.get(e);
      if (!n) throw SA(e);
      return n;
    }
    trigger(e, n, r, i = !0) {
      let s = this._getTrigger(n),
        o = new Oo(this.id, n, e),
        a = this._engine.statesByElement.get(e);
      a ||
        (Gt(e, Ol),
        Gt(e, Ol + '-' + n),
        this._engine.statesByElement.set(e, (a = new Map())));
      let c = a.get(n),
        l = new Ro(r, this.id);
      if (
        (!(r && r.hasOwnProperty('value')) && c && l.absorbOptions(c.options),
        a.set(n, l),
        c || (c = ep),
        !(l.value === No) && c.value === l.value)
      ) {
        if (!yx(c.params, l.params)) {
          let M = [],
            j = s.matchStyles(c.value, c.params, M),
            O = s.matchStyles(l.value, l.params, M);
          M.length
            ? this._engine.reportError(M)
            : this._engine.afterFlush(() => {
                hi(e, j), bn(e, O);
              });
        }
        return;
      }
      let m = Bt(this._engine.playersByElement, e, []);
      m.forEach((M) => {
        M.namespaceId == this.id &&
          M.triggerName == n &&
          M.queued &&
          M.destroy();
      });
      let E = s.matchTransition(c.value, l.value, e, l.params),
        I = !1;
      if (!E) {
        if (!i) return;
        (E = s.fallbackTransition), (I = !0);
      }
      return (
        this._engine.totalQueuedPlayers++,
        this._queue.push({
          element: e,
          triggerName: n,
          transition: E,
          fromState: c,
          toState: l,
          player: o,
          isFallbackTransition: I,
        }),
        I ||
          (Gt(e, g0),
          o.onStart(() => {
            cs(e, g0);
          })),
        o.onDone(() => {
          let M = this.players.indexOf(o);
          M >= 0 && this.players.splice(M, 1);
          let j = this._engine.playersByElement.get(e);
          if (j) {
            let O = j.indexOf(o);
            O >= 0 && j.splice(O, 1);
          }
        }),
        this.players.push(o),
        m.push(o),
        o
      );
    }
    deregister(e) {
      this._triggers.delete(e),
        this._engine.statesByElement.forEach((n) => n.delete(e)),
        this._elementListeners.forEach((n, r) => {
          this._elementListeners.set(
            r,
            n.filter((i) => i.name != e)
          );
        });
    }
    clearElementCache(e) {
      this._engine.statesByElement.delete(e), this._elementListeners.delete(e);
      let n = this._engine.playersByElement.get(e);
      n &&
        (n.forEach((r) => r.destroy()),
        this._engine.playersByElement.delete(e));
    }
    _signalRemovalForInnerTriggers(e, n) {
      let r = this._engine.driver.query(e, jl, !0);
      r.forEach((i) => {
        if (i[on]) return;
        let s = this._engine.fetchNamespacesByElement(i);
        s.size
          ? s.forEach((o) => o.triggerLeaveAnimation(i, n, !1, !0))
          : this.clearElementCache(i);
      }),
        this._engine.afterFlushAnimationsDone(() =>
          r.forEach((i) => this.clearElementCache(i))
        );
    }
    triggerLeaveAnimation(e, n, r, i) {
      let s = this._engine.statesByElement.get(e),
        o = new Map();
      if (s) {
        let a = [];
        if (
          (s.forEach((c, l) => {
            if ((o.set(l, c.value), this._triggers.has(l))) {
              let u = this.trigger(e, l, No, i);
              u && a.push(u);
            }
          }),
          a.length)
        )
          return (
            this._engine.markElementAsRemoved(this.id, e, !0, n, o),
            r && Ir(a).onDone(() => this._engine.processLeaveNode(e)),
            !0
          );
      }
      return !1;
    }
    prepareLeaveAnimationListeners(e) {
      let n = this._elementListeners.get(e),
        r = this._engine.statesByElement.get(e);
      if (n && r) {
        let i = new Set();
        n.forEach((s) => {
          let o = s.name;
          if (i.has(o)) return;
          i.add(o);
          let c = this._triggers.get(o).fallbackTransition,
            l = r.get(o) || ep,
            u = new Ro(No),
            d = new Oo(this.id, o, e);
          this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: e,
              triggerName: o,
              transition: c,
              fromState: l,
              toState: u,
              player: d,
              isFallbackTransition: !0,
            });
        });
      }
    }
    removeNode(e, n) {
      let r = this._engine;
      if (
        (e.childElementCount && this._signalRemovalForInnerTriggers(e, n),
        this.triggerLeaveAnimation(e, n, !0))
      )
        return;
      let i = !1;
      if (r.totalAnimations) {
        let s = r.players.length ? r.playersByQueriedElement.get(e) : [];
        if (s && s.length) i = !0;
        else {
          let o = e;
          for (; (o = o.parentNode); )
            if (r.statesByElement.get(o)) {
              i = !0;
              break;
            }
        }
      }
      if ((this.prepareLeaveAnimationListeners(e), i))
        r.markElementAsRemoved(this.id, e, !1, n);
      else {
        let s = e[on];
        (!s || s === R0) &&
          (r.afterFlush(() => this.clearElementCache(e)),
          r.destroyInnerAnimations(e),
          r._onRemovalComplete(e, n));
      }
    }
    insertNode(e, n) {
      Gt(e, this._hostClassName);
    }
    drainQueuedTransitions(e) {
      let n = [];
      return (
        this._queue.forEach((r) => {
          let i = r.player;
          if (i.destroyed) return;
          let s = r.element,
            o = this._elementListeners.get(s);
          o &&
            o.forEach((a) => {
              if (a.name == r.triggerName) {
                let c = vp(
                  s,
                  r.triggerName,
                  r.fromState.value,
                  r.toState.value
                );
                (c._data = e), yp(r.player, a.phase, c, a.callback);
              }
            }),
            i.markedForDestroy
              ? this._engine.afterFlush(() => {
                  i.destroy();
                })
              : n.push(r);
        }),
        (this._queue = []),
        n.sort((r, i) => {
          let s = r.transition.ast.depCount,
            o = i.transition.ast.depCount;
          return s == 0 || o == 0
            ? s - o
            : this._engine.driver.containsElement(r.element, i.element)
            ? 1
            : -1;
        })
      );
    }
    destroy(e) {
      this.players.forEach((n) => n.destroy()),
        this._signalRemovalForInnerTriggers(this.hostElement, e);
    }
  },
  mp = class {
    _onRemovalComplete(e, n) {
      this.onRemovalComplete(e, n);
    }
    constructor(e, n, r) {
      (this.bodyNode = e),
        (this.driver = n),
        (this._normalizer = r),
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
        (this.onRemovalComplete = (i, s) => {});
    }
    get queuedPlayers() {
      let e = [];
      return (
        this._namespaceList.forEach((n) => {
          n.players.forEach((r) => {
            r.queued && e.push(r);
          });
        }),
        e
      );
    }
    createNamespace(e, n) {
      let r = new pp(e, n, this);
      return (
        this.bodyNode && this.driver.containsElement(this.bodyNode, n)
          ? this._balanceNamespaceList(r, n)
          : (this.newHostElements.set(n, r), this.collectEnterElement(n)),
        (this._namespaceLookup[e] = r)
      );
    }
    _balanceNamespaceList(e, n) {
      let r = this._namespaceList,
        i = this.namespacesByHostElement;
      if (r.length - 1 >= 0) {
        let o = !1,
          a = this.driver.getParentElement(n);
        for (; a; ) {
          let c = i.get(a);
          if (c) {
            let l = r.indexOf(c);
            r.splice(l + 1, 0, e), (o = !0);
            break;
          }
          a = this.driver.getParentElement(a);
        }
        o || r.unshift(e);
      } else r.push(e);
      return i.set(n, e), e;
    }
    register(e, n) {
      let r = this._namespaceLookup[e];
      return r || (r = this.createNamespace(e, n)), r;
    }
    registerTrigger(e, n, r) {
      let i = this._namespaceLookup[e];
      i && i.register(n, r) && this.totalAnimations++;
    }
    destroy(e, n) {
      e &&
        (this.afterFlush(() => {}),
        this.afterFlushAnimationsDone(() => {
          let r = this._fetchNamespace(e);
          this.namespacesByHostElement.delete(r.hostElement);
          let i = this._namespaceList.indexOf(r);
          i >= 0 && this._namespaceList.splice(i, 1),
            r.destroy(n),
            delete this._namespaceLookup[e];
        }));
    }
    _fetchNamespace(e) {
      return this._namespaceLookup[e];
    }
    fetchNamespacesByElement(e) {
      let n = new Set(),
        r = this.statesByElement.get(e);
      if (r) {
        for (let i of r.values())
          if (i.namespaceId) {
            let s = this._fetchNamespace(i.namespaceId);
            s && n.add(s);
          }
      }
      return n;
    }
    trigger(e, n, r, i) {
      if (Pl(n)) {
        let s = this._fetchNamespace(e);
        if (s) return s.trigger(n, r, i), !0;
      }
      return !1;
    }
    insertNode(e, n, r, i) {
      if (!Pl(n)) return;
      let s = n[on];
      if (s && s.setForRemoval) {
        (s.setForRemoval = !1), (s.setForMove = !0);
        let o = this.collectedLeaveElements.indexOf(n);
        o >= 0 && this.collectedLeaveElements.splice(o, 1);
      }
      if (e) {
        let o = this._fetchNamespace(e);
        o && o.insertNode(n, r);
      }
      i && this.collectEnterElement(n);
    }
    collectEnterElement(e) {
      this.collectedEnterElements.push(e);
    }
    markElementAsDisabled(e, n) {
      n
        ? this.disabledNodes.has(e) || (this.disabledNodes.add(e), Gt(e, Jh))
        : this.disabledNodes.has(e) &&
          (this.disabledNodes.delete(e), cs(e, Jh));
    }
    removeNode(e, n, r) {
      if (Pl(n)) {
        let i = e ? this._fetchNamespace(e) : null;
        i ? i.removeNode(n, r) : this.markElementAsRemoved(e, n, !1, r);
        let s = this.namespacesByHostElement.get(n);
        s && s.id !== e && s.removeNode(n, r);
      } else this._onRemovalComplete(n, r);
    }
    markElementAsRemoved(e, n, r, i, s) {
      this.collectedLeaveElements.push(n),
        (n[on] = {
          namespaceId: e,
          setForRemoval: i,
          hasAnimation: r,
          removedBeforeQueried: !1,
          previousTriggersValues: s,
        });
    }
    listen(e, n, r, i, s) {
      return Pl(n) ? this._fetchNamespace(e).listen(n, r, i, s) : () => {};
    }
    _buildInstruction(e, n, r, i, s) {
      return e.transition.build(
        this.driver,
        e.element,
        e.fromState.value,
        e.toState.value,
        r,
        i,
        e.fromState.options,
        e.toState.options,
        n,
        s
      );
    }
    destroyInnerAnimations(e) {
      let n = this.driver.query(e, jl, !0);
      n.forEach((r) => this.destroyActiveAnimationsForElement(r)),
        this.playersByQueriedElement.size != 0 &&
          ((n = this.driver.query(e, rp, !0)),
          n.forEach((r) => this.finishActiveQueriedAnimationOnElement(r)));
    }
    destroyActiveAnimationsForElement(e) {
      let n = this.playersByElement.get(e);
      n &&
        n.forEach((r) => {
          r.queued ? (r.markedForDestroy = !0) : r.destroy();
        });
    }
    finishActiveQueriedAnimationOnElement(e) {
      let n = this.playersByQueriedElement.get(e);
      n && n.forEach((r) => r.finish());
    }
    whenRenderingDone() {
      return new Promise((e) => {
        if (this.players.length) return Ir(this.players).onDone(() => e());
        e();
      });
    }
    processLeaveNode(e) {
      let n = e[on];
      if (n && n.setForRemoval) {
        if (((e[on] = R0), n.namespaceId)) {
          this.destroyInnerAnimations(e);
          let r = this._fetchNamespace(n.namespaceId);
          r && r.clearElementCache(e);
        }
        this._onRemovalComplete(e, n.setForRemoval);
      }
      e.classList?.contains(Jh) && this.markElementAsDisabled(e, !1),
        this.driver.query(e, ax, !0).forEach((r) => {
          this.markElementAsDisabled(r, !1);
        });
    }
    flush(e = -1) {
      let n = [];
      if (
        (this.newHostElements.size &&
          (this.newHostElements.forEach((r, i) =>
            this._balanceNamespaceList(r, i)
          ),
          this.newHostElements.clear()),
        this.totalAnimations && this.collectedEnterElements.length)
      )
        for (let r = 0; r < this.collectedEnterElements.length; r++) {
          let i = this.collectedEnterElements[r];
          Gt(i, cx);
        }
      if (
        this._namespaceList.length &&
        (this.totalQueuedPlayers || this.collectedLeaveElements.length)
      ) {
        let r = [];
        try {
          n = this._flushAnimations(r, e);
        } finally {
          for (let i = 0; i < r.length; i++) r[i]();
        }
      } else
        for (let r = 0; r < this.collectedLeaveElements.length; r++) {
          let i = this.collectedLeaveElements[r];
          this.processLeaveNode(i);
        }
      if (
        ((this.totalQueuedPlayers = 0),
        (this.collectedEnterElements.length = 0),
        (this.collectedLeaveElements.length = 0),
        this._flushFns.forEach((r) => r()),
        (this._flushFns = []),
        this._whenQuietFns.length)
      ) {
        let r = this._whenQuietFns;
        (this._whenQuietFns = []),
          n.length
            ? Ir(n).onDone(() => {
                r.forEach((i) => i());
              })
            : r.forEach((i) => i());
      }
    }
    reportError(e) {
      throw CA(e);
    }
    _flushAnimations(e, n) {
      let r = new xo(),
        i = [],
        s = new Map(),
        o = [],
        a = new Map(),
        c = new Map(),
        l = new Map(),
        u = new Set();
      this.disabledNodes.forEach((v) => {
        u.add(v);
        let C = this.driver.query(v, ox, !0);
        for (let x = 0; x < C.length; x++) u.add(C[x]);
      });
      let d = this.bodyNode,
        m = Array.from(this.statesByElement.keys()),
        E = E0(m, this.collectedEnterElements),
        I = new Map(),
        M = 0;
      E.forEach((v, C) => {
        let x = S0 + M++;
        I.set(C, x), v.forEach((U) => Gt(U, x));
      });
      let j = [],
        O = new Set(),
        D = new Set();
      for (let v = 0; v < this.collectedLeaveElements.length; v++) {
        let C = this.collectedLeaveElements[v],
          x = C[on];
        x &&
          x.setForRemoval &&
          (j.push(C),
          O.add(C),
          x.hasAnimation
            ? this.driver.query(C, lx, !0).forEach((U) => O.add(U))
            : D.add(C));
      }
      let _ = new Map(),
        S = E0(m, Array.from(O));
      S.forEach((v, C) => {
        let x = np + M++;
        _.set(C, x), v.forEach((U) => Gt(U, x));
      }),
        e.push(() => {
          E.forEach((v, C) => {
            let x = I.get(C);
            v.forEach((U) => cs(U, x));
          }),
            S.forEach((v, C) => {
              let x = _.get(C);
              v.forEach((U) => cs(U, x));
            }),
            j.forEach((v) => {
              this.processLeaveNode(v);
            });
        });
      let b = [],
        ne = [];
      for (let v = this._namespaceList.length - 1; v >= 0; v--)
        this._namespaceList[v].drainQueuedTransitions(n).forEach((x) => {
          let U = x.player,
            Q = x.element;
          if ((b.push(U), this.collectedEnterElements.length)) {
            let at = Q[on];
            if (at && at.setForMove) {
              if (
                at.previousTriggersValues &&
                at.previousTriggersValues.has(x.triggerName)
              ) {
                let Dn = at.previousTriggersValues.get(x.triggerName),
                  It = this.statesByElement.get(x.element);
                if (It && It.has(x.triggerName)) {
                  let vi = It.get(x.triggerName);
                  (vi.value = Dn), It.set(x.triggerName, vi);
                }
              }
              U.destroy();
              return;
            }
          }
          let pe = !d || !this.driver.containsElement(d, Q),
            T = _.get(Q),
            k = I.get(Q),
            $ = this._buildInstruction(x, r, k, T, pe);
          if ($.errors && $.errors.length) {
            ne.push($);
            return;
          }
          if (pe) {
            U.onStart(() => hi(Q, $.fromStyles)),
              U.onDestroy(() => bn(Q, $.toStyles)),
              i.push(U);
            return;
          }
          if (x.isFallbackTransition) {
            U.onStart(() => hi(Q, $.fromStyles)),
              U.onDestroy(() => bn(Q, $.toStyles)),
              i.push(U);
            return;
          }
          let Te = [];
          $.timelines.forEach((at) => {
            (at.stretchStartingKeyframe = !0),
              this.disabledNodes.has(at.element) || Te.push(at);
          }),
            ($.timelines = Te),
            r.append(Q, $.timelines);
          let vt = { instruction: $, player: U, element: Q };
          o.push(vt),
            $.queriedElements.forEach((at) => Bt(a, at, []).push(U)),
            $.preStyleProps.forEach((at, Dn) => {
              if (at.size) {
                let It = c.get(Dn);
                It || c.set(Dn, (It = new Set())),
                  at.forEach((vi, ws) => It.add(ws));
              }
            }),
            $.postStyleProps.forEach((at, Dn) => {
              let It = l.get(Dn);
              It || l.set(Dn, (It = new Set())),
                at.forEach((vi, ws) => It.add(ws));
            });
        });
      if (ne.length) {
        let v = [];
        ne.forEach((C) => {
          v.push(IA(C.triggerName, C.errors));
        }),
          b.forEach((C) => C.destroy()),
          this.reportError(v);
      }
      let se = new Map(),
        Ie = new Map();
      o.forEach((v) => {
        let C = v.element;
        r.has(C) &&
          (Ie.set(C, C),
          this._beforeAnimationBuild(v.player.namespaceId, v.instruction, se));
      }),
        i.forEach((v) => {
          let C = v.element;
          this._getPreviousPlayers(
            C,
            !1,
            v.namespaceId,
            v.triggerName,
            null
          ).forEach((U) => {
            Bt(se, C, []).push(U), U.destroy();
          });
        });
      let q = j.filter((v) => b0(v, c, l)),
        R = new Map();
      v0(R, this.driver, D, l, En).forEach((v) => {
        b0(v, c, l) && q.push(v);
      });
      let Y = new Map();
      E.forEach((v, C) => {
        v0(Y, this.driver, new Set(v), c, Rl);
      }),
        q.forEach((v) => {
          let C = R.get(v),
            x = Y.get(v);
          R.set(v, new Map([...(C?.entries() ?? []), ...(x?.entries() ?? [])]));
        });
      let y = [],
        g = [],
        p = {};
      o.forEach((v) => {
        let { element: C, player: x, instruction: U } = v;
        if (r.has(C)) {
          if (u.has(C)) {
            x.onDestroy(() => bn(C, U.toStyles)),
              (x.disabled = !0),
              x.overrideTotalTime(U.totalTime),
              i.push(x);
            return;
          }
          let Q = p;
          if (Ie.size > 1) {
            let T = C,
              k = [];
            for (; (T = T.parentNode); ) {
              let $ = Ie.get(T);
              if ($) {
                Q = $;
                break;
              }
              k.push(T);
            }
            k.forEach(($) => Ie.set($, Q));
          }
          let pe = this._buildAnimation(x.namespaceId, U, se, s, Y, R);
          if ((x.setRealPlayer(pe), Q === p)) y.push(x);
          else {
            let T = this.playersByElement.get(Q);
            T && T.length && (x.parentPlayer = Ir(T)), i.push(x);
          }
        } else
          hi(C, U.fromStyles),
            x.onDestroy(() => bn(C, U.toStyles)),
            g.push(x),
            u.has(C) && i.push(x);
      }),
        g.forEach((v) => {
          let C = s.get(v.element);
          if (C && C.length) {
            let x = Ir(C);
            v.setRealPlayer(x);
          }
        }),
        i.forEach((v) => {
          v.parentPlayer ? v.syncPlayerEvents(v.parentPlayer) : v.destroy();
        });
      for (let v = 0; v < j.length; v++) {
        let C = j[v],
          x = C[on];
        if ((cs(C, np), x && x.hasAnimation)) continue;
        let U = [];
        if (a.size) {
          let pe = a.get(C);
          pe && pe.length && U.push(...pe);
          let T = this.driver.query(C, rp, !0);
          for (let k = 0; k < T.length; k++) {
            let $ = a.get(T[k]);
            $ && $.length && U.push(...$);
          }
        }
        let Q = U.filter((pe) => !pe.destroyed);
        Q.length ? mx(this, C, Q) : this.processLeaveNode(C);
      }
      return (
        (j.length = 0),
        y.forEach((v) => {
          this.players.push(v),
            v.onDone(() => {
              v.destroy();
              let C = this.players.indexOf(v);
              this.players.splice(C, 1);
            }),
            v.play();
        }),
        y
      );
    }
    afterFlush(e) {
      this._flushFns.push(e);
    }
    afterFlushAnimationsDone(e) {
      this._whenQuietFns.push(e);
    }
    _getPreviousPlayers(e, n, r, i, s) {
      let o = [];
      if (n) {
        let a = this.playersByQueriedElement.get(e);
        a && (o = a);
      } else {
        let a = this.playersByElement.get(e);
        if (a) {
          let c = !s || s == No;
          a.forEach((l) => {
            l.queued || (!c && l.triggerName != i) || o.push(l);
          });
        }
      }
      return (
        (r || i) &&
          (o = o.filter(
            (a) => !((r && r != a.namespaceId) || (i && i != a.triggerName))
          )),
        o
      );
    }
    _beforeAnimationBuild(e, n, r) {
      let i = n.triggerName,
        s = n.element,
        o = n.isRemovalTransition ? void 0 : e,
        a = n.isRemovalTransition ? void 0 : i;
      for (let c of n.timelines) {
        let l = c.element,
          u = l !== s,
          d = Bt(r, l, []);
        this._getPreviousPlayers(l, u, o, a, n.toState).forEach((E) => {
          let I = E.getRealPlayer();
          I.beforeDestroy && I.beforeDestroy(), E.destroy(), d.push(E);
        });
      }
      hi(s, n.fromStyles);
    }
    _buildAnimation(e, n, r, i, s, o) {
      let a = n.triggerName,
        c = n.element,
        l = [],
        u = new Set(),
        d = new Set(),
        m = n.timelines.map((I) => {
          let M = I.element;
          u.add(M);
          let j = M[on];
          if (j && j.removedBeforeQueried) return new Cr(I.duration, I.delay);
          let O = M !== c,
            D = gx((r.get(M) || ux).map((se) => se.getRealPlayer())).filter(
              (se) => {
                let Ie = se;
                return Ie.element ? Ie.element === M : !1;
              }
            ),
            _ = s.get(M),
            S = o.get(M),
            b = w0(this._normalizer, I.keyframes, _, S),
            ne = this._buildPlayer(I, b, D);
          if ((I.subTimeline && i && d.add(M), O)) {
            let se = new Oo(e, a, M);
            se.setRealPlayer(ne), l.push(se);
          }
          return ne;
        });
      l.forEach((I) => {
        Bt(this.playersByQueriedElement, I.element, []).push(I),
          I.onDone(() => fx(this.playersByQueriedElement, I.element, I));
      }),
        u.forEach((I) => Gt(I, u0));
      let E = Ir(m);
      return (
        E.onDestroy(() => {
          u.forEach((I) => cs(I, u0)), bn(c, n.toStyles);
        }),
        d.forEach((I) => {
          Bt(i, I, []).push(E);
        }),
        E
      );
    }
    _buildPlayer(e, n, r) {
      return n.length > 0
        ? this.driver.animate(e.element, n, e.duration, e.delay, e.easing, r)
        : new Cr(e.duration, e.delay);
    }
  },
  Oo = class {
    constructor(e, n, r) {
      (this.namespaceId = e),
        (this.triggerName = n),
        (this.element = r),
        (this._player = new Cr()),
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
        this._queuedCallbacks.forEach((n, r) => {
          n.forEach((i) => yp(e, r, void 0, i));
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
      let n = this._player;
      n.triggerCallback && e.onStart(() => n.triggerCallback('start')),
        e.onDone(() => this.finish()),
        e.onDestroy(() => this.destroy());
    }
    _queueEvent(e, n) {
      Bt(this._queuedCallbacks, e, []).push(n);
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
      let n = this._player;
      n.triggerCallback && n.triggerCallback(e);
    }
  };
function fx(t, e, n) {
  let r = t.get(e);
  if (r) {
    if (r.length) {
      let i = r.indexOf(n);
      r.splice(i, 1);
    }
    r.length == 0 && t.delete(e);
  }
  return r;
}
function hx(t) {
  return t ?? null;
}
function Pl(t) {
  return t && t.nodeType === 1;
}
function px(t) {
  return t == 'start' || t == 'done';
}
function y0(t, e) {
  let n = t.style.display;
  return (t.style.display = e ?? 'none'), n;
}
function v0(t, e, n, r, i) {
  let s = [];
  n.forEach((c) => s.push(y0(c)));
  let o = [];
  r.forEach((c, l) => {
    let u = new Map();
    c.forEach((d) => {
      let m = e.computeStyle(l, d, i);
      u.set(d, m), (!m || m.length == 0) && ((l[on] = dx), o.push(l));
    }),
      t.set(l, u);
  });
  let a = 0;
  return n.forEach((c) => y0(c, s[a++])), o;
}
function E0(t, e) {
  let n = new Map();
  if ((t.forEach((a) => n.set(a, [])), e.length == 0)) return n;
  let r = 1,
    i = new Set(e),
    s = new Map();
  function o(a) {
    if (!a) return r;
    let c = s.get(a);
    if (c) return c;
    let l = a.parentNode;
    return n.has(l) ? (c = l) : i.has(l) ? (c = r) : (c = o(l)), s.set(a, c), c;
  }
  return (
    e.forEach((a) => {
      let c = o(a);
      c !== r && n.get(c).push(a);
    }),
    n
  );
}
function Gt(t, e) {
  t.classList?.add(e);
}
function cs(t, e) {
  t.classList?.remove(e);
}
function mx(t, e, n) {
  Ir(n).onDone(() => t.processLeaveNode(e));
}
function gx(t) {
  let e = [];
  return O0(t, e), e;
}
function O0(t, e) {
  for (let n = 0; n < t.length; n++) {
    let r = t[n];
    r instanceof Io ? O0(r.players, e) : e.push(r);
  }
}
function yx(t, e) {
  let n = Object.keys(t),
    r = Object.keys(e);
  if (n.length != r.length) return !1;
  for (let i = 0; i < n.length; i++) {
    let s = n[i];
    if (!e.hasOwnProperty(s) || t[s] !== e[s]) return !1;
  }
  return !0;
}
function b0(t, e, n) {
  let r = n.get(t);
  if (!r) return !1;
  let i = e.get(t);
  return i ? r.forEach((s) => i.add(s)) : e.set(t, r), n.delete(t), !0;
}
var us = class {
  constructor(e, n, r) {
    (this._driver = n),
      (this._normalizer = r),
      (this._triggerCache = {}),
      (this.onRemovalComplete = (i, s) => {}),
      (this._transitionEngine = new mp(e.body, n, r)),
      (this._timelineEngine = new hp(e.body, n, r)),
      (this._transitionEngine.onRemovalComplete = (i, s) =>
        this.onRemovalComplete(i, s));
  }
  registerTrigger(e, n, r, i, s) {
    let o = e + '-' + i,
      a = this._triggerCache[o];
    if (!a) {
      let c = [],
        l = [],
        u = A0(this._driver, s, c, l);
      if (c.length) throw gA(i, c);
      l.length && void 0,
        (a = rx(i, u, this._normalizer)),
        (this._triggerCache[o] = a);
    }
    this._transitionEngine.registerTrigger(n, i, a);
  }
  register(e, n) {
    this._transitionEngine.register(e, n);
  }
  destroy(e, n) {
    this._transitionEngine.destroy(e, n);
  }
  onInsert(e, n, r, i) {
    this._transitionEngine.insertNode(e, n, r, i);
  }
  onRemove(e, n, r) {
    this._transitionEngine.removeNode(e, n, r);
  }
  disableAnimations(e, n) {
    this._transitionEngine.markElementAsDisabled(e, n);
  }
  process(e, n, r, i) {
    if (r.charAt(0) == '@') {
      let [s, o] = c0(r),
        a = i;
      this._timelineEngine.command(s, n, o, a);
    } else this._transitionEngine.trigger(e, n, r, i);
  }
  listen(e, n, r, i, s) {
    if (r.charAt(0) == '@') {
      let [o, a] = c0(r);
      return this._timelineEngine.listen(o, n, a, s);
    }
    return this._transitionEngine.listen(e, n, r, i, s);
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
function vx(t, e) {
  let n = null,
    r = null;
  return (
    Array.isArray(e) && e.length
      ? ((n = tp(e[0])), e.length > 1 && (r = tp(e[e.length - 1])))
      : e instanceof Map && (n = tp(e)),
    n || r ? new Ex(t, n, r) : null
  );
}
var Ex = (() => {
  let e = class e {
    constructor(r, i, s) {
      (this._element = r),
        (this._startStyles = i),
        (this._endStyles = s),
        (this._state = 0);
      let o = e.initialStylesByElement.get(r);
      o || e.initialStylesByElement.set(r, (o = new Map())),
        (this._initialStyles = o);
    }
    start() {
      this._state < 1 &&
        (this._startStyles &&
          bn(this._element, this._startStyles, this._initialStyles),
        (this._state = 1));
    }
    finish() {
      this.start(),
        this._state < 2 &&
          (bn(this._element, this._initialStyles),
          this._endStyles &&
            (bn(this._element, this._endStyles), (this._endStyles = null)),
          (this._state = 1));
    }
    destroy() {
      this.finish(),
        this._state < 3 &&
          (e.initialStylesByElement.delete(this._element),
          this._startStyles &&
            (hi(this._element, this._startStyles), (this._endStyles = null)),
          this._endStyles &&
            (hi(this._element, this._endStyles), (this._endStyles = null)),
          bn(this._element, this._initialStyles),
          (this._state = 3));
    }
  };
  e.initialStylesByElement = new WeakMap();
  let t = e;
  return t;
})();
function tp(t) {
  let e = null;
  return (
    t.forEach((n, r) => {
      bx(r) && ((e = e || new Map()), e.set(r, n));
    }),
    e
  );
}
function bx(t) {
  return t === 'display' || t === 'position';
}
var Gl = class {
    constructor(e, n, r, i) {
      (this.element = e),
        (this.keyframes = n),
        (this.options = r),
        (this._specialStyles = i),
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
        (this._duration = r.duration),
        (this._delay = r.delay || 0),
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
      let n = () => this._onFinish();
      this.domPlayer.addEventListener('finish', n),
        this.onDestroy(() => {
          this.domPlayer.removeEventListener('finish', n);
        });
    }
    _preparePlayerBeforeStart() {
      this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
    }
    _convertKeyframesToObject(e) {
      let n = [];
      return (
        e.forEach((r) => {
          n.push(Object.fromEntries(r));
        }),
        n
      );
    }
    _triggerWebAnimation(e, n, r) {
      return e.animate(this._convertKeyframesToObject(n), r);
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
        this._finalKeyframe.forEach((r, i) => {
          i !== 'offset' && e.set(i, this._finished ? r : M0(this.element, i));
        }),
        (this.currentSnapshot = e);
    }
    triggerCallback(e) {
      let n = e === 'start' ? this._onStartFns : this._onDoneFns;
      n.forEach((r) => r()), (n.length = 0);
    }
  },
  Wl = class {
    validateStyleProperty(e) {
      return !0;
    }
    validateAnimatableStyleProperty(e) {
      return !0;
    }
    matchesElement(e, n) {
      return !1;
    }
    containsElement(e, n) {
      return _0(e, n);
    }
    getParentElement(e) {
      return Ep(e);
    }
    query(e, n, r) {
      return D0(e, n, r);
    }
    computeStyle(e, n, r) {
      return window.getComputedStyle(e)[n];
    }
    animate(e, n, r, i, s, o = []) {
      let a = i == 0 ? 'both' : 'forwards',
        c = { duration: r, delay: i, fill: a };
      s && (c.easing = s);
      let l = new Map(),
        u = o.filter((E) => E instanceof Gl);
      jA(r, i) &&
        u.forEach((E) => {
          E.currentSnapshot.forEach((I, M) => l.set(M, I));
        });
      let d = LA(n).map((E) => ls(E));
      d = HA(e, d, l);
      let m = vx(e, d);
      return new Gl(e, d, c, m);
    }
  };
var Fl = '@',
  k0 = '@.disabled',
  Kl = class {
    constructor(e, n, r, i) {
      (this.namespaceId = e),
        (this.delegate = n),
        (this.engine = r),
        (this._onDestroy = i),
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
    createElement(e, n) {
      return this.delegate.createElement(e, n);
    }
    createComment(e) {
      return this.delegate.createComment(e);
    }
    createText(e) {
      return this.delegate.createText(e);
    }
    appendChild(e, n) {
      this.delegate.appendChild(e, n),
        this.engine.onInsert(this.namespaceId, n, e, !1);
    }
    insertBefore(e, n, r, i = !0) {
      this.delegate.insertBefore(e, n, r),
        this.engine.onInsert(this.namespaceId, n, e, i);
    }
    removeChild(e, n, r) {
      this.engine.onRemove(this.namespaceId, n, this.delegate);
    }
    selectRootElement(e, n) {
      return this.delegate.selectRootElement(e, n);
    }
    parentNode(e) {
      return this.delegate.parentNode(e);
    }
    nextSibling(e) {
      return this.delegate.nextSibling(e);
    }
    setAttribute(e, n, r, i) {
      this.delegate.setAttribute(e, n, r, i);
    }
    removeAttribute(e, n, r) {
      this.delegate.removeAttribute(e, n, r);
    }
    addClass(e, n) {
      this.delegate.addClass(e, n);
    }
    removeClass(e, n) {
      this.delegate.removeClass(e, n);
    }
    setStyle(e, n, r, i) {
      this.delegate.setStyle(e, n, r, i);
    }
    removeStyle(e, n, r) {
      this.delegate.removeStyle(e, n, r);
    }
    setProperty(e, n, r) {
      n.charAt(0) == Fl && n == k0
        ? this.disableAnimations(e, !!r)
        : this.delegate.setProperty(e, n, r);
    }
    setValue(e, n) {
      this.delegate.setValue(e, n);
    }
    listen(e, n, r) {
      return this.delegate.listen(e, n, r);
    }
    disableAnimations(e, n) {
      this.engine.disableAnimations(e, n);
    }
  },
  gp = class extends Kl {
    constructor(e, n, r, i, s) {
      super(n, r, i, s), (this.factory = e), (this.namespaceId = n);
    }
    setProperty(e, n, r) {
      n.charAt(0) == Fl
        ? n.charAt(1) == '.' && n == k0
          ? ((r = r === void 0 ? !0 : !!r), this.disableAnimations(e, r))
          : this.engine.process(this.namespaceId, e, n.slice(1), r)
        : this.delegate.setProperty(e, n, r);
    }
    listen(e, n, r) {
      if (n.charAt(0) == Fl) {
        let i = wx(e),
          s = n.slice(1),
          o = '';
        return (
          s.charAt(0) != Fl && ([s, o] = _x(s)),
          this.engine.listen(this.namespaceId, i, s, o, (a) => {
            let c = a._data || -1;
            this.factory.scheduleListenerCallback(c, r, a);
          })
        );
      }
      return this.delegate.listen(e, n, r);
    }
  };
function wx(t) {
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
function _x(t) {
  let e = t.indexOf('.'),
    n = t.substring(0, e),
    r = t.slice(e + 1);
  return [n, r];
}
var Ql = class {
  constructor(e, n, r) {
    (this.delegate = e),
      (this.engine = n),
      (this._zone = r),
      (this._currentId = 0),
      (this._microtaskId = 1),
      (this._animationCallbacksBuffer = []),
      (this._rendererCache = new Map()),
      (this._cdRecurDepth = 0),
      (n.onRemovalComplete = (i, s) => {
        let o = s?.parentNode(i);
        o && s.removeChild(o, i);
      });
  }
  createRenderer(e, n) {
    let r = '',
      i = this.delegate.createRenderer(e, n);
    if (!e || !n?.data?.animation) {
      let l = this._rendererCache,
        u = l.get(i);
      if (!u) {
        let d = () => l.delete(i);
        (u = new Kl(r, i, this.engine, d)), l.set(i, u);
      }
      return u;
    }
    let s = n.id,
      o = n.id + '-' + this._currentId;
    this._currentId++, this.engine.register(o, e);
    let a = (l) => {
      Array.isArray(l)
        ? l.forEach(a)
        : this.engine.registerTrigger(s, o, e, l.name, l);
    };
    return n.data.animation.forEach(a), new gp(this, o, i, this.engine);
  }
  begin() {
    this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
  }
  _scheduleCountTask() {
    queueMicrotask(() => {
      this._microtaskId++;
    });
  }
  scheduleListenerCallback(e, n, r) {
    if (e >= 0 && e < this._microtaskId) {
      this._zone.run(() => n(r));
      return;
    }
    let i = this._animationCallbacksBuffer;
    i.length == 0 &&
      queueMicrotask(() => {
        this._zone.run(() => {
          i.forEach((s) => {
            let [o, a] = s;
            o(a);
          }),
            (this._animationCallbacksBuffer = []);
        });
      }),
      i.push([n, r]);
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
var Sx = (() => {
  let e = class e extends us {
    constructor(r, i, s, o) {
      super(r, i, s);
    }
    ngOnDestroy() {
      this.flush();
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(X(Ve), X(ko), X(pi), X(jt));
  }),
    (e.ɵprov = J({ token: e, factory: e.ɵfac }));
  let t = e;
  return t;
})();
function Cx() {
  return new Vl();
}
function Ix(t, e, n) {
  return new Ql(t, e, n);
}
var L0 = [
    { provide: pi, useFactory: Cx },
    { provide: us, useClass: Sx },
    { provide: ti, useFactory: Ix, deps: [Al, us, Fe] },
  ],
  Mx = [
    { provide: ko, useFactory: () => new Wl() },
    { provide: tl, useValue: 'BrowserAnimations' },
    ...L0,
  ],
  Nx = [
    { provide: ko, useClass: bp },
    { provide: tl, useValue: 'NoopAnimations' },
    ...L0,
  ];
function A9() {
  return [...Mx];
}
function P0() {
  return [...Nx];
}
var Ax = Object.getOwnPropertyNames,
  oe = (t, e) =>
    function () {
      return e || (0, t[Ax(t)[0]])((e = { exports: {} }).exports, e), e.exports;
    },
  Po = oe({
    'external/npm/node_modules/domino/lib/Event.js'(t, e) {
      'use strict';
      (e.exports = n),
        (n.CAPTURING_PHASE = 1),
        (n.AT_TARGET = 2),
        (n.BUBBLING_PHASE = 3);
      function n(r, i) {
        if (
          ((this.type = ''),
          (this.target = null),
          (this.currentTarget = null),
          (this.eventPhase = n.AT_TARGET),
          (this.bubbles = !1),
          (this.cancelable = !1),
          (this.isTrusted = !1),
          (this.defaultPrevented = !1),
          (this.timeStamp = Date.now()),
          (this._propagationStopped = !1),
          (this._immediatePropagationStopped = !1),
          (this._initialized = !0),
          (this._dispatching = !1),
          r && (this.type = r),
          i)
        )
          for (var s in i) this[s] = i[s];
      }
      n.prototype = Object.create(Object.prototype, {
        constructor: { value: n },
        stopPropagation: {
          value: function () {
            this._propagationStopped = !0;
          },
        },
        stopImmediatePropagation: {
          value: function () {
            (this._propagationStopped = !0),
              (this._immediatePropagationStopped = !0);
          },
        },
        preventDefault: {
          value: function () {
            this.cancelable && (this.defaultPrevented = !0);
          },
        },
        initEvent: {
          value: function (i, s, o) {
            (this._initialized = !0),
              !this._dispatching &&
                ((this._propagationStopped = !1),
                (this._immediatePropagationStopped = !1),
                (this.defaultPrevented = !1),
                (this.isTrusted = !1),
                (this.target = null),
                (this.type = i),
                (this.bubbles = s),
                (this.cancelable = o));
          },
        },
      });
    },
  }),
  F0 = oe({
    'external/npm/node_modules/domino/lib/UIEvent.js'(t, e) {
      'use strict';
      var n = Po();
      e.exports = r;
      function r() {
        n.call(this), (this.view = null), (this.detail = 0);
      }
      r.prototype = Object.create(n.prototype, {
        constructor: { value: r },
        initUIEvent: {
          value: function (i, s, o, a, c) {
            this.initEvent(i, s, o), (this.view = a), (this.detail = c);
          },
        },
      });
    },
  }),
  j0 = oe({
    'external/npm/node_modules/domino/lib/MouseEvent.js'(t, e) {
      'use strict';
      var n = F0();
      e.exports = r;
      function r() {
        n.call(this),
          (this.screenX = this.screenY = this.clientX = this.clientY = 0),
          (this.ctrlKey = this.altKey = this.shiftKey = this.metaKey = !1),
          (this.button = 0),
          (this.buttons = 1),
          (this.relatedTarget = null);
      }
      r.prototype = Object.create(n.prototype, {
        constructor: { value: r },
        initMouseEvent: {
          value: function (i, s, o, a, c, l, u, d, m, E, I, M, j, O, D) {
            switch (
              (this.initEvent(i, s, o, a, c),
              (this.screenX = l),
              (this.screenY = u),
              (this.clientX = d),
              (this.clientY = m),
              (this.ctrlKey = E),
              (this.altKey = I),
              (this.shiftKey = M),
              (this.metaKey = j),
              (this.button = O),
              O)
            ) {
              case 0:
                this.buttons = 1;
                break;
              case 1:
                this.buttons = 4;
                break;
              case 2:
                this.buttons = 2;
                break;
              default:
                this.buttons = 0;
                break;
            }
            this.relatedTarget = D;
          },
        },
        getModifierState: {
          value: function (i) {
            switch (i) {
              case 'Alt':
                return this.altKey;
              case 'Control':
                return this.ctrlKey;
              case 'Shift':
                return this.shiftKey;
              case 'Meta':
                return this.metaKey;
              default:
                return !1;
            }
          },
        },
      });
    },
  }),
  Sp = oe({
    'external/npm/node_modules/domino/lib/DOMException.js'(t, e) {
      'use strict';
      e.exports = R;
      var n = 1,
        r = 3,
        i = 4,
        s = 5,
        o = 7,
        a = 8,
        c = 9,
        l = 11,
        u = 12,
        d = 13,
        m = 14,
        E = 15,
        I = 17,
        M = 18,
        j = 19,
        O = 20,
        D = 21,
        _ = 22,
        S = 23,
        b = 24,
        ne = 25,
        se = [
          null,
          'INDEX_SIZE_ERR',
          null,
          'HIERARCHY_REQUEST_ERR',
          'WRONG_DOCUMENT_ERR',
          'INVALID_CHARACTER_ERR',
          null,
          'NO_MODIFICATION_ALLOWED_ERR',
          'NOT_FOUND_ERR',
          'NOT_SUPPORTED_ERR',
          'INUSE_ATTRIBUTE_ERR',
          'INVALID_STATE_ERR',
          'SYNTAX_ERR',
          'INVALID_MODIFICATION_ERR',
          'NAMESPACE_ERR',
          'INVALID_ACCESS_ERR',
          null,
          'TYPE_MISMATCH_ERR',
          'SECURITY_ERR',
          'NETWORK_ERR',
          'ABORT_ERR',
          'URL_MISMATCH_ERR',
          'QUOTA_EXCEEDED_ERR',
          'TIMEOUT_ERR',
          'INVALID_NODE_TYPE_ERR',
          'DATA_CLONE_ERR',
        ],
        Ie = [
          null,
          'INDEX_SIZE_ERR (1): the index is not in the allowed range',
          null,
          'HIERARCHY_REQUEST_ERR (3): the operation would yield an incorrect nodes model',
          'WRONG_DOCUMENT_ERR (4): the object is in the wrong Document, a call to importNode is required',
          'INVALID_CHARACTER_ERR (5): the string contains invalid characters',
          null,
          'NO_MODIFICATION_ALLOWED_ERR (7): the object can not be modified',
          'NOT_FOUND_ERR (8): the object can not be found here',
          'NOT_SUPPORTED_ERR (9): this operation is not supported',
          'INUSE_ATTRIBUTE_ERR (10): setAttributeNode called on owned Attribute',
          'INVALID_STATE_ERR (11): the object is in an invalid state',
          'SYNTAX_ERR (12): the string did not match the expected pattern',
          'INVALID_MODIFICATION_ERR (13): the object can not be modified in this way',
          'NAMESPACE_ERR (14): the operation is not allowed by Namespaces in XML',
          'INVALID_ACCESS_ERR (15): the object does not support the operation or argument',
          null,
          'TYPE_MISMATCH_ERR (17): the type of the object does not match the expected type',
          'SECURITY_ERR (18): the operation is insecure',
          'NETWORK_ERR (19): a network error occurred',
          'ABORT_ERR (20): the user aborted an operation',
          'URL_MISMATCH_ERR (21): the given URL does not match another URL',
          'QUOTA_EXCEEDED_ERR (22): the quota has been exceeded',
          'TIMEOUT_ERR (23): a timeout occurred',
          'INVALID_NODE_TYPE_ERR (24): the supplied node is invalid or has an invalid ancestor for this operation',
          'DATA_CLONE_ERR (25): the object can not be cloned.',
        ],
        q = {
          INDEX_SIZE_ERR: n,
          DOMSTRING_SIZE_ERR: 2,
          HIERARCHY_REQUEST_ERR: r,
          WRONG_DOCUMENT_ERR: i,
          INVALID_CHARACTER_ERR: s,
          NO_DATA_ALLOWED_ERR: 6,
          NO_MODIFICATION_ALLOWED_ERR: o,
          NOT_FOUND_ERR: a,
          NOT_SUPPORTED_ERR: c,
          INUSE_ATTRIBUTE_ERR: 10,
          INVALID_STATE_ERR: l,
          SYNTAX_ERR: u,
          INVALID_MODIFICATION_ERR: d,
          NAMESPACE_ERR: m,
          INVALID_ACCESS_ERR: E,
          VALIDATION_ERR: 16,
          TYPE_MISMATCH_ERR: I,
          SECURITY_ERR: M,
          NETWORK_ERR: j,
          ABORT_ERR: O,
          URL_MISMATCH_ERR: D,
          QUOTA_EXCEEDED_ERR: _,
          TIMEOUT_ERR: S,
          INVALID_NODE_TYPE_ERR: b,
          DATA_CLONE_ERR: ne,
        };
      function R(y) {
        Error.call(this),
          Error.captureStackTrace(this, this.constructor),
          (this.code = y),
          (this.message = Ie[y]),
          (this.name = se[y]);
      }
      R.prototype.__proto__ = Error.prototype;
      for (Y in q)
        (F = { value: q[Y] }),
          Object.defineProperty(R, Y, F),
          Object.defineProperty(R.prototype, Y, F);
      var F, Y;
    },
  }),
  Cp = oe({
    'external/npm/node_modules/domino/lib/config.js'(t) {
      t.isApiWritable = !globalThis.__domino_frozen__;
    },
  }),
  tt = oe({
    'external/npm/node_modules/domino/lib/utils.js'(t) {
      'use strict';
      var e = Sp(),
        n = e,
        r = Cp().isApiWritable;
      (t.NAMESPACE = {
        HTML: 'http://www.w3.org/1999/xhtml',
        XML: 'http://www.w3.org/XML/1998/namespace',
        XMLNS: 'http://www.w3.org/2000/xmlns/',
        MATHML: 'http://www.w3.org/1998/Math/MathML',
        SVG: 'http://www.w3.org/2000/svg',
        XLINK: 'http://www.w3.org/1999/xlink',
      }),
        (t.IndexSizeError = function () {
          throw new e(n.INDEX_SIZE_ERR);
        }),
        (t.HierarchyRequestError = function () {
          throw new e(n.HIERARCHY_REQUEST_ERR);
        }),
        (t.WrongDocumentError = function () {
          throw new e(n.WRONG_DOCUMENT_ERR);
        }),
        (t.InvalidCharacterError = function () {
          throw new e(n.INVALID_CHARACTER_ERR);
        }),
        (t.NoModificationAllowedError = function () {
          throw new e(n.NO_MODIFICATION_ALLOWED_ERR);
        }),
        (t.NotFoundError = function () {
          throw new e(n.NOT_FOUND_ERR);
        }),
        (t.NotSupportedError = function () {
          throw new e(n.NOT_SUPPORTED_ERR);
        }),
        (t.InvalidStateError = function () {
          throw new e(n.INVALID_STATE_ERR);
        }),
        (t.SyntaxError = function () {
          throw new e(n.SYNTAX_ERR);
        }),
        (t.InvalidModificationError = function () {
          throw new e(n.INVALID_MODIFICATION_ERR);
        }),
        (t.NamespaceError = function () {
          throw new e(n.NAMESPACE_ERR);
        }),
        (t.InvalidAccessError = function () {
          throw new e(n.INVALID_ACCESS_ERR);
        }),
        (t.TypeMismatchError = function () {
          throw new e(n.TYPE_MISMATCH_ERR);
        }),
        (t.SecurityError = function () {
          throw new e(n.SECURITY_ERR);
        }),
        (t.NetworkError = function () {
          throw new e(n.NETWORK_ERR);
        }),
        (t.AbortError = function () {
          throw new e(n.ABORT_ERR);
        }),
        (t.UrlMismatchError = function () {
          throw new e(n.URL_MISMATCH_ERR);
        }),
        (t.QuotaExceededError = function () {
          throw new e(n.QUOTA_EXCEEDED_ERR);
        }),
        (t.TimeoutError = function () {
          throw new e(n.TIMEOUT_ERR);
        }),
        (t.InvalidNodeTypeError = function () {
          throw new e(n.INVALID_NODE_TYPE_ERR);
        }),
        (t.DataCloneError = function () {
          throw new e(n.DATA_CLONE_ERR);
        }),
        (t.nyi = function () {
          throw new Error('NotYetImplemented');
        }),
        (t.shouldOverride = function () {
          throw new Error(
            'Abstract function; should be overriding in subclass.'
          );
        }),
        (t.assert = function (i, s) {
          if (!i)
            throw new Error(
              'Assertion failed: ' +
                (s || '') +
                `
` +
                new Error().stack
            );
        }),
        (t.expose = function (i, s) {
          for (var o in i)
            Object.defineProperty(s.prototype, o, { value: i[o], writable: r });
        }),
        (t.merge = function (i, s) {
          for (var o in s) i[o] = s[o];
        }),
        (t.documentOrder = function (i, s) {
          return 3 - (i.compareDocumentPosition(s) & 6);
        }),
        (t.toASCIILowerCase = function (i) {
          return i.replace(/[A-Z]+/g, function (s) {
            return s.toLowerCase();
          });
        }),
        (t.toASCIIUpperCase = function (i) {
          return i.replace(/[a-z]+/g, function (s) {
            return s.toUpperCase();
          });
        });
    },
  }),
  H0 = oe({
    'external/npm/node_modules/domino/lib/EventTarget.js'(t, e) {
      'use strict';
      var n = Po(),
        r = j0(),
        i = tt();
      e.exports = s;
      function s() {}
      s.prototype = {
        addEventListener: function (a, c, l) {
          if (c) {
            l === void 0 && (l = !1),
              this._listeners || (this._listeners = Object.create(null)),
              this._listeners[a] || (this._listeners[a] = []);
            for (var u = this._listeners[a], d = 0, m = u.length; d < m; d++) {
              var E = u[d];
              if (E.listener === c && E.capture === l) return;
            }
            var I = { listener: c, capture: l };
            typeof c == 'function' && (I.f = c), u.push(I);
          }
        },
        removeEventListener: function (a, c, l) {
          if ((l === void 0 && (l = !1), this._listeners)) {
            var u = this._listeners[a];
            if (u)
              for (var d = 0, m = u.length; d < m; d++) {
                var E = u[d];
                if (E.listener === c && E.capture === l) {
                  u.length === 1
                    ? (this._listeners[a] = void 0)
                    : u.splice(d, 1);
                  return;
                }
              }
          }
        },
        dispatchEvent: function (a) {
          return this._dispatchEvent(a, !1);
        },
        _dispatchEvent: function (a, c) {
          typeof c != 'boolean' && (c = !1);
          function l(M, j) {
            var O = j.type,
              D = j.eventPhase;
            if (
              ((j.currentTarget = M),
              D !== n.CAPTURING_PHASE && M._handlers && M._handlers[O])
            ) {
              var _ = M._handlers[O],
                S;
              if (typeof _ == 'function') S = _.call(j.currentTarget, j);
              else {
                var b = _.handleEvent;
                if (typeof b != 'function')
                  throw new TypeError(
                    'handleEvent property of event handler object isnot a function.'
                  );
                S = b.call(_, j);
              }
              switch (j.type) {
                case 'mouseover':
                  S === !0 && j.preventDefault();
                  break;
                case 'beforeunload':
                default:
                  S === !1 && j.preventDefault();
                  break;
              }
            }
            var ne = M._listeners && M._listeners[O];
            if (ne) {
              ne = ne.slice();
              for (var se = 0, Ie = ne.length; se < Ie; se++) {
                if (j._immediatePropagationStopped) return;
                var q = ne[se];
                if (
                  !(
                    (D === n.CAPTURING_PHASE && !q.capture) ||
                    (D === n.BUBBLING_PHASE && q.capture)
                  )
                )
                  if (q.f) q.f.call(j.currentTarget, j);
                  else {
                    var R = q.listener.handleEvent;
                    if (typeof R != 'function')
                      throw new TypeError(
                        'handleEvent property of event listener object is not a function.'
                      );
                    R.call(q.listener, j);
                  }
              }
            }
          }
          (!a._initialized || a._dispatching) && i.InvalidStateError(),
            (a.isTrusted = c),
            (a._dispatching = !0),
            (a.target = this);
          for (var u = [], d = this.parentNode; d; d = d.parentNode) u.push(d);
          a.eventPhase = n.CAPTURING_PHASE;
          for (
            var m = u.length - 1;
            m >= 0 && (l(u[m], a), !a._propagationStopped);
            m--
          );
          if (
            (a._propagationStopped ||
              ((a.eventPhase = n.AT_TARGET), l(this, a)),
            a.bubbles && !a._propagationStopped)
          ) {
            a.eventPhase = n.BUBBLING_PHASE;
            for (
              var E = 0, I = u.length;
              E < I && (l(u[E], a), !a._propagationStopped);
              E++
            );
          }
          if (
            ((a._dispatching = !1),
            (a.eventPhase = n.AT_TARGET),
            (a.currentTarget = null),
            c && !a.defaultPrevented && a instanceof r)
          )
            switch (a.type) {
              case 'mousedown':
                this._armed = { x: a.clientX, y: a.clientY, t: a.timeStamp };
                break;
              case 'mouseout':
              case 'mouseover':
                this._armed = null;
                break;
              case 'mouseup':
                this._isClick(a) && this._doClick(a), (this._armed = null);
                break;
            }
          return !a.defaultPrevented;
        },
        _isClick: function (o) {
          return (
            this._armed !== null &&
            o.type === 'mouseup' &&
            o.isTrusted &&
            o.button === 0 &&
            o.timeStamp - this._armed.t < 1e3 &&
            Math.abs(o.clientX - this._armed.x) < 10 &&
            Math.abs(o.clientY - this._armed.Y) < 10
          );
        },
        _doClick: function (o) {
          if (!this._click_in_progress) {
            this._click_in_progress = !0;
            for (var a = this; a && !a._post_click_activation_steps; )
              a = a.parentNode;
            a &&
              a._pre_click_activation_steps &&
              a._pre_click_activation_steps();
            var c = this.ownerDocument.createEvent('MouseEvent');
            c.initMouseEvent(
              'click',
              !0,
              !0,
              this.ownerDocument.defaultView,
              1,
              o.screenX,
              o.screenY,
              o.clientX,
              o.clientY,
              o.ctrlKey,
              o.altKey,
              o.shiftKey,
              o.metaKey,
              o.button,
              null
            );
            var l = this._dispatchEvent(c, !0);
            a &&
              (l
                ? a._post_click_activation_steps &&
                  a._post_click_activation_steps(c)
                : a._cancelled_activation_steps &&
                  a._cancelled_activation_steps());
          }
        },
        _setEventHandler: function (a, c) {
          this._handlers || (this._handlers = Object.create(null)),
            (this._handlers[a] = c);
        },
        _getEventHandler: function (a) {
          return (this._handlers && this._handlers[a]) || null;
        },
      };
    },
  }),
  B0 = oe({
    'external/npm/node_modules/domino/lib/LinkedList.js'(t, e) {
      'use strict';
      var n = tt(),
        r = (e.exports = {
          valid: function (i) {
            return (
              n.assert(i, 'list falsy'),
              n.assert(i._previousSibling, 'previous falsy'),
              n.assert(i._nextSibling, 'next falsy'),
              !0
            );
          },
          insertBefore: function (i, s) {
            n.assert(r.valid(i) && r.valid(s));
            var o = i,
              a = i._previousSibling,
              c = s,
              l = s._previousSibling;
            (o._previousSibling = l),
              (a._nextSibling = c),
              (l._nextSibling = o),
              (c._previousSibling = a),
              n.assert(r.valid(i) && r.valid(s));
          },
          replace: function (i, s) {
            n.assert(r.valid(i) && (s === null || r.valid(s))),
              s !== null && r.insertBefore(s, i),
              r.remove(i),
              n.assert(r.valid(i) && (s === null || r.valid(s)));
          },
          remove: function (i) {
            n.assert(r.valid(i));
            var s = i._previousSibling;
            if (s !== i) {
              var o = i._nextSibling;
              (s._nextSibling = o),
                (o._previousSibling = s),
                (i._previousSibling = i._nextSibling = i),
                n.assert(r.valid(i));
            }
          },
        });
    },
  }),
  V0 = oe({
    'external/npm/node_modules/domino/lib/NodeUtils.js'(t, e) {
      'use strict';
      e.exports = {
        serializeOne: j,
        ɵescapeMatchingClosingTag: m,
        ɵescapeClosingCommentTag: I,
        ɵescapeProcessingInstructionContent: M,
      };
      var n = tt(),
        r = n.NAMESPACE,
        i = {
          STYLE: !0,
          SCRIPT: !0,
          XMP: !0,
          IFRAME: !0,
          NOEMBED: !0,
          NOFRAMES: !0,
          PLAINTEXT: !0,
        },
        s = {
          area: !0,
          base: !0,
          basefont: !0,
          bgsound: !0,
          br: !0,
          col: !0,
          embed: !0,
          frame: !0,
          hr: !0,
          img: !0,
          input: !0,
          keygen: !0,
          link: !0,
          meta: !0,
          param: !0,
          source: !0,
          track: !0,
          wbr: !0,
        },
        o = {},
        a = /[&<>\u00A0]/g,
        c = /[&"<>\u00A0]/g;
      function l(O) {
        return a.test(O)
          ? O.replace(a, (D) => {
              switch (D) {
                case '&':
                  return '&amp;';
                case '<':
                  return '&lt;';
                case '>':
                  return '&gt;';
                case '\xA0':
                  return '&nbsp;';
              }
            })
          : O;
      }
      function u(O) {
        return c.test(O)
          ? O.replace(c, (D) => {
              switch (D) {
                case '<':
                  return '&lt;';
                case '>':
                  return '&gt;';
                case '&':
                  return '&amp;';
                case '"':
                  return '&quot;';
                case '\xA0':
                  return '&nbsp;';
              }
            })
          : O;
      }
      function d(O) {
        var D = O.namespaceURI;
        return D
          ? D === r.XML
            ? 'xml:' + O.localName
            : D === r.XLINK
            ? 'xlink:' + O.localName
            : D === r.XMLNS
            ? O.localName === 'xmlns'
              ? 'xmlns'
              : 'xmlns:' + O.localName
            : O.name
          : O.localName;
      }
      function m(O, D) {
        let _ = '</' + D;
        if (!O.toLowerCase().includes(_)) return O;
        let S = [...O],
          b = O.matchAll(new RegExp(_, 'ig'));
        for (let ne of b) S[ne.index] = '&lt;';
        return S.join('');
      }
      var E = /--!?>/;
      function I(O) {
        return E.test(O) ? O.replace(/(--\!?)>/g, '$1&gt;') : O;
      }
      function M(O) {
        return O.includes('>') ? O.replaceAll('>', '&gt;') : O;
      }
      function j(O, D) {
        var _ = '';
        switch (O.nodeType) {
          case 1:
            var S = O.namespaceURI,
              b = S === r.HTML,
              ne = b || S === r.SVG || S === r.MATHML ? O.localName : O.tagName;
            _ += '<' + ne;
            for (var se = 0, Ie = O._numattrs; se < Ie; se++) {
              var q = O._attr(se);
              (_ += ' ' + d(q)),
                q.value !== void 0 && (_ += '="' + u(q.value) + '"');
            }
            if (((_ += '>'), !(b && s[ne]))) {
              var R = O.serialize();
              i[ne.toUpperCase()] && (R = m(R, ne)),
                b &&
                  o[ne] &&
                  R.charAt(0) ===
                    `
` &&
                  (_ += `
`),
                (_ += R),
                (_ += '</' + ne + '>');
            }
            break;
          case 3:
          case 4:
            var F;
            D.nodeType === 1 && D.namespaceURI === r.HTML
              ? (F = D.tagName)
              : (F = ''),
              i[F] || (F === 'NOSCRIPT' && D.ownerDocument._scripting_enabled)
                ? (_ += O.data)
                : (_ += l(O.data));
            break;
          case 8:
            _ += '<!--' + I(O.data) + '-->';
            break;
          case 7:
            let Y = M(O.data);
            _ += '<?' + O.target + ' ' + Y + '?>';
            break;
          case 10:
            (_ += '<!DOCTYPE ' + O.name), (_ += '>');
            break;
          default:
            n.InvalidStateError();
        }
        return _;
      }
    },
  }),
  yt = oe({
    'external/npm/node_modules/domino/lib/Node.js'(t, e) {
      'use strict';
      e.exports = o;
      var n = H0(),
        r = B0(),
        i = V0(),
        s = tt();
      function o() {
        n.call(this),
          (this.parentNode = null),
          (this._nextSibling = this._previousSibling = this),
          (this._index = void 0);
      }
      var a = (o.ELEMENT_NODE = 1),
        c = (o.ATTRIBUTE_NODE = 2),
        l = (o.TEXT_NODE = 3),
        u = (o.CDATA_SECTION_NODE = 4),
        d = (o.ENTITY_REFERENCE_NODE = 5),
        m = (o.ENTITY_NODE = 6),
        E = (o.PROCESSING_INSTRUCTION_NODE = 7),
        I = (o.COMMENT_NODE = 8),
        M = (o.DOCUMENT_NODE = 9),
        j = (o.DOCUMENT_TYPE_NODE = 10),
        O = (o.DOCUMENT_FRAGMENT_NODE = 11),
        D = (o.NOTATION_NODE = 12),
        _ = (o.DOCUMENT_POSITION_DISCONNECTED = 1),
        S = (o.DOCUMENT_POSITION_PRECEDING = 2),
        b = (o.DOCUMENT_POSITION_FOLLOWING = 4),
        ne = (o.DOCUMENT_POSITION_CONTAINS = 8),
        se = (o.DOCUMENT_POSITION_CONTAINED_BY = 16),
        Ie = (o.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32);
      o.prototype = Object.create(n.prototype, {
        baseURI: { get: s.nyi },
        parentElement: {
          get: function () {
            return this.parentNode && this.parentNode.nodeType === a
              ? this.parentNode
              : null;
          },
        },
        hasChildNodes: { value: s.shouldOverride },
        firstChild: { get: s.shouldOverride },
        lastChild: { get: s.shouldOverride },
        isConnected: {
          get: function () {
            let q = this;
            for (; q != null; ) {
              if (q.nodeType === o.DOCUMENT_NODE) return !0;
              (q = q.parentNode),
                q != null &&
                  q.nodeType === o.DOCUMENT_FRAGMENT_NODE &&
                  (q = q.host);
            }
            return !1;
          },
        },
        previousSibling: {
          get: function () {
            var q = this.parentNode;
            return !q || this === q.firstChild ? null : this._previousSibling;
          },
        },
        nextSibling: {
          get: function () {
            var q = this.parentNode,
              R = this._nextSibling;
            return !q || R === q.firstChild ? null : R;
          },
        },
        textContent: {
          get: function () {
            return null;
          },
          set: function (q) {},
        },
        innerText: {
          get: function () {
            return null;
          },
          set: function (q) {},
        },
        _countChildrenOfType: {
          value: function (q) {
            for (var R = 0, F = this.firstChild; F !== null; F = F.nextSibling)
              F.nodeType === q && R++;
            return R;
          },
        },
        _ensureInsertValid: {
          value: function (R, F, Y) {
            var y = this,
              g,
              p;
            if (!R.nodeType) throw new TypeError('not a node');
            switch (y.nodeType) {
              case M:
              case O:
              case a:
                break;
              default:
                s.HierarchyRequestError();
            }
            switch (
              (R.isAncestor(y) && s.HierarchyRequestError(),
              (F !== null || !Y) && F.parentNode !== y && s.NotFoundError(),
              R.nodeType)
            ) {
              case O:
              case j:
              case a:
              case l:
              case E:
              case I:
                break;
              default:
                s.HierarchyRequestError();
            }
            if (y.nodeType === M)
              switch (R.nodeType) {
                case l:
                  s.HierarchyRequestError();
                  break;
                case O:
                  switch (
                    (R._countChildrenOfType(l) > 0 && s.HierarchyRequestError(),
                    R._countChildrenOfType(a))
                  ) {
                    case 0:
                      break;
                    case 1:
                      if (F !== null)
                        for (
                          Y && F.nodeType === j && s.HierarchyRequestError(),
                            p = F.nextSibling;
                          p !== null;
                          p = p.nextSibling
                        )
                          p.nodeType === j && s.HierarchyRequestError();
                      (g = y._countChildrenOfType(a)),
                        Y
                          ? g > 0 && s.HierarchyRequestError()
                          : (g > 1 || (g === 1 && F.nodeType !== a)) &&
                            s.HierarchyRequestError();
                      break;
                    default:
                      s.HierarchyRequestError();
                  }
                  break;
                case a:
                  if (F !== null)
                    for (
                      Y && F.nodeType === j && s.HierarchyRequestError(),
                        p = F.nextSibling;
                      p !== null;
                      p = p.nextSibling
                    )
                      p.nodeType === j && s.HierarchyRequestError();
                  (g = y._countChildrenOfType(a)),
                    Y
                      ? g > 0 && s.HierarchyRequestError()
                      : (g > 1 || (g === 1 && F.nodeType !== a)) &&
                        s.HierarchyRequestError();
                  break;
                case j:
                  if (F === null)
                    y._countChildrenOfType(a) && s.HierarchyRequestError();
                  else
                    for (
                      p = y.firstChild;
                      p !== null && p !== F;
                      p = p.nextSibling
                    )
                      p.nodeType === a && s.HierarchyRequestError();
                  (g = y._countChildrenOfType(j)),
                    Y
                      ? g > 0 && s.HierarchyRequestError()
                      : (g > 1 || (g === 1 && F.nodeType !== j)) &&
                        s.HierarchyRequestError();
                  break;
              }
            else R.nodeType === j && s.HierarchyRequestError();
          },
        },
        insertBefore: {
          value: function (R, F) {
            var Y = this;
            Y._ensureInsertValid(R, F, !0);
            var y = F;
            return (
              y === R && (y = R.nextSibling),
              Y.doc.adoptNode(R),
              R._insertOrReplace(Y, y, !1),
              R
            );
          },
        },
        appendChild: {
          value: function (q) {
            return this.insertBefore(q, null);
          },
        },
        _appendChild: {
          value: function (q) {
            q._insertOrReplace(this, null, !1);
          },
        },
        removeChild: {
          value: function (R) {
            var F = this;
            if (!R.nodeType) throw new TypeError('not a node');
            return R.parentNode !== F && s.NotFoundError(), R.remove(), R;
          },
        },
        replaceChild: {
          value: function (R, F) {
            var Y = this;
            return (
              Y._ensureInsertValid(R, F, !1),
              R.doc !== Y.doc && Y.doc.adoptNode(R),
              R._insertOrReplace(Y, F, !0),
              F
            );
          },
        },
        contains: {
          value: function (R) {
            return R === null
              ? !1
              : this === R
              ? !0
              : (this.compareDocumentPosition(R) & se) !== 0;
          },
        },
        compareDocumentPosition: {
          value: function (R) {
            if (this === R) return 0;
            if (this.doc !== R.doc || this.rooted !== R.rooted) return _ + Ie;
            for (var F = [], Y = [], y = this; y !== null; y = y.parentNode)
              F.push(y);
            for (y = R; y !== null; y = y.parentNode) Y.push(y);
            if ((F.reverse(), Y.reverse(), F[0] !== Y[0])) return _ + Ie;
            y = Math.min(F.length, Y.length);
            for (var g = 1; g < y; g++)
              if (F[g] !== Y[g]) return F[g].index < Y[g].index ? b : S;
            return F.length < Y.length ? b + se : S + ne;
          },
        },
        isSameNode: {
          value: function (R) {
            return this === R;
          },
        },
        isEqualNode: {
          value: function (R) {
            if (!R || R.nodeType !== this.nodeType || !this.isEqual(R))
              return !1;
            for (
              var F = this.firstChild, Y = R.firstChild;
              F && Y;
              F = F.nextSibling, Y = Y.nextSibling
            )
              if (!F.isEqualNode(Y)) return !1;
            return F === null && Y === null;
          },
        },
        cloneNode: {
          value: function (q) {
            var R = this.clone();
            if (q)
              for (var F = this.firstChild; F !== null; F = F.nextSibling)
                R._appendChild(F.cloneNode(!0));
            return R;
          },
        },
        lookupPrefix: {
          value: function (R) {
            var F;
            if (R === '' || R === null || R === void 0) return null;
            switch (this.nodeType) {
              case a:
                return this._lookupNamespacePrefix(R, this);
              case M:
                return (F = this.documentElement), F ? F.lookupPrefix(R) : null;
              case m:
              case D:
              case O:
              case j:
                return null;
              case c:
                return (F = this.ownerElement), F ? F.lookupPrefix(R) : null;
              default:
                return (F = this.parentElement), F ? F.lookupPrefix(R) : null;
            }
          },
        },
        lookupNamespaceURI: {
          value: function (R) {
            (R === '' || R === void 0) && (R = null);
            var F;
            switch (this.nodeType) {
              case a:
                return s.shouldOverride();
              case M:
                return (
                  (F = this.documentElement), F ? F.lookupNamespaceURI(R) : null
                );
              case m:
              case D:
              case j:
              case O:
                return null;
              case c:
                return (
                  (F = this.ownerElement), F ? F.lookupNamespaceURI(R) : null
                );
              default:
                return (
                  (F = this.parentElement), F ? F.lookupNamespaceURI(R) : null
                );
            }
          },
        },
        isDefaultNamespace: {
          value: function (R) {
            (R === '' || R === void 0) && (R = null);
            var F = this.lookupNamespaceURI(null);
            return F === R;
          },
        },
        index: {
          get: function () {
            var q = this.parentNode;
            if (this === q.firstChild) return 0;
            var R = q.childNodes;
            if (this._index === void 0 || R[this._index] !== this) {
              for (var F = 0; F < R.length; F++) R[F]._index = F;
              s.assert(R[this._index] === this);
            }
            return this._index;
          },
        },
        isAncestor: {
          value: function (q) {
            if (this.doc !== q.doc || this.rooted !== q.rooted) return !1;
            for (var R = q; R; R = R.parentNode) if (R === this) return !0;
            return !1;
          },
        },
        ensureSameDoc: {
          value: function (q) {
            q.ownerDocument === null
              ? (q.ownerDocument = this.doc)
              : q.ownerDocument !== this.doc && s.WrongDocumentError();
          },
        },
        removeChildren: { value: s.shouldOverride },
        _insertOrReplace: {
          value: function (R, F, Y) {
            var y = this,
              g,
              p;
            if (
              (y.nodeType === O && y.rooted && s.HierarchyRequestError(),
              R._childNodes &&
                ((g = F === null ? R._childNodes.length : F.index),
                y.parentNode === R))
            ) {
              var v = y.index;
              v < g && g--;
            }
            Y && (F.rooted && F.doc.mutateRemove(F), (F.parentNode = null));
            var C = F;
            C === null && (C = R.firstChild);
            var x = y.rooted && R.rooted;
            if (y.nodeType === O) {
              for (
                var U = [0, Y ? 1 : 0], Q, pe = y.firstChild;
                pe !== null;
                pe = Q
              )
                (Q = pe.nextSibling), U.push(pe), (pe.parentNode = R);
              var T = U.length;
              if (
                (Y
                  ? r.replace(C, T > 2 ? U[2] : null)
                  : T > 2 && C !== null && r.insertBefore(U[2], C),
                R._childNodes)
              )
                for (
                  U[0] = F === null ? R._childNodes.length : F._index,
                    R._childNodes.splice.apply(R._childNodes, U),
                    p = 2;
                  p < T;
                  p++
                )
                  U[p]._index = U[0] + (p - 2);
              else
                R._firstChild === F &&
                  (T > 2
                    ? (R._firstChild = U[2])
                    : Y && (R._firstChild = null));
              if (
                (y._childNodes
                  ? (y._childNodes.length = 0)
                  : (y._firstChild = null),
                R.rooted)
              )
                for (R.modify(), p = 2; p < T; p++) R.doc.mutateInsert(U[p]);
            } else {
              if (F === y) return;
              x ? y._remove() : y.parentNode && y.remove(),
                (y.parentNode = R),
                Y
                  ? (r.replace(C, y),
                    R._childNodes
                      ? ((y._index = g), (R._childNodes[g] = y))
                      : R._firstChild === F && (R._firstChild = y))
                  : (C !== null && r.insertBefore(y, C),
                    R._childNodes
                      ? ((y._index = g), R._childNodes.splice(g, 0, y))
                      : R._firstChild === F && (R._firstChild = y)),
                x
                  ? (R.modify(), R.doc.mutateMove(y))
                  : R.rooted && (R.modify(), R.doc.mutateInsert(y));
            }
          },
        },
        lastModTime: {
          get: function () {
            return (
              this._lastModTime || (this._lastModTime = this.doc.modclock),
              this._lastModTime
            );
          },
        },
        modify: {
          value: function () {
            if (this.doc.modclock)
              for (
                var q = ++this.doc.modclock, R = this;
                R;
                R = R.parentElement
              )
                R._lastModTime && (R._lastModTime = q);
          },
        },
        doc: {
          get: function () {
            return this.ownerDocument || this;
          },
        },
        rooted: {
          get: function () {
            return !!this._nid;
          },
        },
        normalize: {
          value: function () {
            for (var q, R = this.firstChild; R !== null; R = q)
              if (
                ((q = R.nextSibling),
                R.normalize && R.normalize(),
                R.nodeType === o.TEXT_NODE)
              ) {
                if (R.nodeValue === '') {
                  this.removeChild(R);
                  continue;
                }
                var F = R.previousSibling;
                F !== null &&
                  F.nodeType === o.TEXT_NODE &&
                  (F.appendData(R.nodeValue), this.removeChild(R));
              }
          },
        },
        serialize: {
          value: function () {
            if (this._innerHTML) return this._innerHTML;
            for (var q = '', R = this.firstChild; R !== null; R = R.nextSibling)
              q += i.serializeOne(R, this);
            return q;
          },
        },
        outerHTML: {
          get: function () {
            return i.serializeOne(this, { nodeType: 0 });
          },
          set: s.nyi,
        },
        ELEMENT_NODE: { value: a },
        ATTRIBUTE_NODE: { value: c },
        TEXT_NODE: { value: l },
        CDATA_SECTION_NODE: { value: u },
        ENTITY_REFERENCE_NODE: { value: d },
        ENTITY_NODE: { value: m },
        PROCESSING_INSTRUCTION_NODE: { value: E },
        COMMENT_NODE: { value: I },
        DOCUMENT_NODE: { value: M },
        DOCUMENT_TYPE_NODE: { value: j },
        DOCUMENT_FRAGMENT_NODE: { value: O },
        NOTATION_NODE: { value: D },
        DOCUMENT_POSITION_DISCONNECTED: { value: _ },
        DOCUMENT_POSITION_PRECEDING: { value: S },
        DOCUMENT_POSITION_FOLLOWING: { value: b },
        DOCUMENT_POSITION_CONTAINS: { value: ne },
        DOCUMENT_POSITION_CONTAINED_BY: { value: se },
        DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: { value: Ie },
      });
    },
  }),
  xx = oe({
    'external/npm/node_modules/domino/lib/NodeList.es6.js'(t, e) {
      'use strict';
      e.exports = class extends Array {
        constructor(r) {
          if ((super((r && r.length) || 0), r)) for (var i in r) this[i] = r[i];
        }
        item(r) {
          return this[r] || null;
        }
      };
    },
  }),
  Rx = oe({
    'external/npm/node_modules/domino/lib/NodeList.es5.js'(t, e) {
      'use strict';
      function n(i) {
        return this[i] || null;
      }
      function r(i) {
        return i || (i = []), (i.item = n), i;
      }
      e.exports = r;
    },
  }),
  ds = oe({
    'external/npm/node_modules/domino/lib/NodeList.js'(t, e) {
      'use strict';
      var n;
      try {
        n = xx();
      } catch {
        n = Rx();
      }
      e.exports = n;
    },
  }),
  Ip = oe({
    'external/npm/node_modules/domino/lib/ContainerNode.js'(t, e) {
      'use strict';
      e.exports = i;
      var n = yt(),
        r = ds();
      function i() {
        n.call(this), (this._firstChild = this._childNodes = null);
      }
      i.prototype = Object.create(n.prototype, {
        hasChildNodes: {
          value: function () {
            return this._childNodes
              ? this._childNodes.length > 0
              : this._firstChild !== null;
          },
        },
        childNodes: {
          get: function () {
            return this._ensureChildNodes(), this._childNodes;
          },
        },
        firstChild: {
          get: function () {
            return this._childNodes
              ? this._childNodes.length === 0
                ? null
                : this._childNodes[0]
              : this._firstChild;
          },
        },
        lastChild: {
          get: function () {
            var s = this._childNodes,
              o;
            return s
              ? s.length === 0
                ? null
                : s[s.length - 1]
              : ((o = this._firstChild),
                o === null ? null : o._previousSibling);
          },
        },
        _ensureChildNodes: {
          value: function () {
            if (!this._childNodes) {
              var s = this._firstChild,
                o = s,
                a = (this._childNodes = new r());
              if (s)
                do a.push(o), (o = o._nextSibling);
                while (o !== s);
              this._firstChild = null;
            }
          },
        },
        removeChildren: {
          value: function () {
            for (
              var o = this.rooted ? this.ownerDocument : null,
                a = this.firstChild,
                c;
              a !== null;

            )
              (c = a),
                (a = c.nextSibling),
                o && o.mutateRemove(c),
                (c.parentNode = null);
            this._childNodes
              ? (this._childNodes.length = 0)
              : (this._firstChild = null),
              this.modify();
          },
        },
      });
    },
  }),
  Mp = oe({
    'external/npm/node_modules/domino/lib/xmlnames.js'(t) {
      'use strict';
      (t.isValidName = M), (t.isValidQName = j);
      var e = /^[_:A-Za-z][-.:\w]+$/,
        n = /^([_A-Za-z][-.\w]+|[_A-Za-z][-.\w]+:[_A-Za-z][-.\w]+)$/,
        r =
          '_A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD',
        i =
          '-._A-Za-z0-9\xB7\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0300-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD',
        s = '[' + r + '][' + i + ']*',
        o = r + ':',
        a = i + ':',
        c = new RegExp('^[' + o + '][' + a + ']*$'),
        l = new RegExp('^(' + s + '|' + s + ':' + s + ')$'),
        u = /[\uD800-\uDB7F\uDC00-\uDFFF]/,
        d = /[\uD800-\uDB7F\uDC00-\uDFFF]/g,
        m = /[\uD800-\uDB7F][\uDC00-\uDFFF]/g;
      (r += '\uD800-\u{EFC00}-\uDFFF'),
        (i += '\uD800-\u{EFC00}-\uDFFF'),
        (s = '[' + r + '][' + i + ']*'),
        (o = r + ':'),
        (a = i + ':');
      var E = new RegExp('^[' + o + '][' + a + ']*$'),
        I = new RegExp('^(' + s + '|' + s + ':' + s + ')$');
      function M(O) {
        if (e.test(O) || c.test(O)) return !0;
        if (!u.test(O) || !E.test(O)) return !1;
        var D = O.match(d),
          _ = O.match(m);
        return _ !== null && 2 * _.length === D.length;
      }
      function j(O) {
        if (n.test(O) || l.test(O)) return !0;
        if (!u.test(O) || !I.test(O)) return !1;
        var D = O.match(d),
          _ = O.match(m);
        return _ !== null && 2 * _.length === D.length;
      }
    },
  }),
  U0 = oe({
    'external/npm/node_modules/domino/lib/attributes.js'(t) {
      'use strict';
      var e = tt();
      t.property = function (r) {
        if (Array.isArray(r.type)) {
          var i = Object.create(null);
          r.type.forEach(function (a) {
            i[a.value || a] = a.alias || a;
          });
          var s = r.missing;
          s === void 0 && (s = null);
          var o = r.invalid;
          return (
            o === void 0 && (o = s),
            {
              get: function () {
                var a = this._getattr(r.name);
                return a === null
                  ? s
                  : ((a = i[a.toLowerCase()]),
                    a !== void 0 ? a : o !== null ? o : a);
              },
              set: function (a) {
                this._setattr(r.name, a);
              },
            }
          );
        } else {
          if (r.type === Boolean)
            return {
              get: function () {
                return this.hasAttribute(r.name);
              },
              set: function (a) {
                a ? this._setattr(r.name, '') : this.removeAttribute(r.name);
              },
            };
          if (
            r.type === Number ||
            r.type === 'long' ||
            r.type === 'unsigned long' ||
            r.type === 'limited unsigned long with fallback'
          )
            return n(r);
          if (!r.type || r.type === String)
            return {
              get: function () {
                return this._getattr(r.name) || '';
              },
              set: function (a) {
                r.treatNullAsEmptyString && a === null && (a = ''),
                  this._setattr(r.name, a);
              },
            };
          if (typeof r.type == 'function') return r.type(r.name, r);
        }
        throw new Error('Invalid attribute definition');
      };
      function n(r) {
        var i;
        typeof r.default == 'function'
          ? (i = r.default)
          : typeof r.default == 'number'
          ? (i = function () {
              return r.default;
            })
          : (i = function () {
              e.assert(!1, typeof r.default);
            });
        var s = r.type === 'unsigned long',
          o = r.type === 'long',
          a = r.type === 'limited unsigned long with fallback',
          c = r.min,
          l = r.max,
          u = r.setmin;
        return (
          c === void 0 && (s && (c = 0), o && (c = -2147483648), a && (c = 1)),
          l === void 0 && (s || o || a) && (l = 2147483647),
          {
            get: function () {
              var d = this._getattr(r.name),
                m = r.float ? parseFloat(d) : parseInt(d, 10);
              if (
                d === null ||
                !isFinite(m) ||
                (c !== void 0 && m < c) ||
                (l !== void 0 && m > l)
              )
                return i.call(this);
              if (s || o || a) {
                if (!/^[ \t\n\f\r]*[-+]?[0-9]/.test(d)) return i.call(this);
                m = m | 0;
              }
              return m;
            },
            set: function (d) {
              r.float || (d = Math.floor(d)),
                u !== void 0 &&
                  d < u &&
                  e.IndexSizeError(r.name + ' set to ' + d),
                s
                  ? (d = d < 0 || d > 2147483647 ? i.call(this) : d | 0)
                  : a
                  ? (d = d < 1 || d > 2147483647 ? i.call(this) : d | 0)
                  : o &&
                    (d =
                      d < -2147483648 || d > 2147483647 ? i.call(this) : d | 0),
                this._setattr(r.name, String(d));
            },
          }
        );
      }
      t.registerChangeHandler = function (r, i, s) {
        var o = r.prototype;
        Object.prototype.hasOwnProperty.call(o, '_attributeChangeHandlers') ||
          (o._attributeChangeHandlers = Object.create(
            o._attributeChangeHandlers || null
          )),
          (o._attributeChangeHandlers[i] = s);
      };
    },
  }),
  Ox = oe({
    'external/npm/node_modules/domino/lib/FilteredElementList.js'(t, e) {
      'use strict';
      e.exports = r;
      var n = yt();
      function r(i, s) {
        (this.root = i),
          (this.filter = s),
          (this.lastModTime = i.lastModTime),
          (this.done = !1),
          (this.cache = []),
          this.traverse();
      }
      r.prototype = Object.create(Object.prototype, {
        length: {
          get: function () {
            return (
              this.checkcache(), this.done || this.traverse(), this.cache.length
            );
          },
        },
        item: {
          value: function (i) {
            return (
              this.checkcache(),
              !this.done && i >= this.cache.length && this.traverse(),
              this.cache[i]
            );
          },
        },
        checkcache: {
          value: function () {
            if (this.lastModTime !== this.root.lastModTime) {
              for (var i = this.cache.length - 1; i >= 0; i--) this[i] = void 0;
              (this.cache.length = 0),
                (this.done = !1),
                (this.lastModTime = this.root.lastModTime);
            }
          },
        },
        traverse: {
          value: function (i) {
            i !== void 0 && i++;
            for (var s; (s = this.next()) !== null; )
              if (
                ((this[this.cache.length] = s),
                this.cache.push(s),
                i && this.cache.length === i)
              )
                return;
            this.done = !0;
          },
        },
        next: {
          value: function () {
            var i =
                this.cache.length === 0
                  ? this.root
                  : this.cache[this.cache.length - 1],
              s;
            for (
              i.nodeType === n.DOCUMENT_NODE
                ? (s = i.documentElement)
                : (s = i.nextElement(this.root));
              s;

            ) {
              if (this.filter(s)) return s;
              s = s.nextElement(this.root);
            }
            return null;
          },
        },
      });
    },
  }),
  $0 = oe({
    'external/npm/node_modules/domino/lib/DOMTokenList.js'(t, e) {
      'use strict';
      var n = tt();
      e.exports = r;
      function r(c, l) {
        (this._getString = c),
          (this._setString = l),
          (this._length = 0),
          (this._lastStringValue = ''),
          this._update();
      }
      Object.defineProperties(r.prototype, {
        length: {
          get: function () {
            return this._length;
          },
        },
        item: {
          value: function (c) {
            var l = a(this);
            return c < 0 || c >= l.length ? null : l[c];
          },
        },
        contains: {
          value: function (c) {
            c = String(c);
            var l = a(this);
            return l.indexOf(c) > -1;
          },
        },
        add: {
          value: function () {
            for (var c = a(this), l = 0, u = arguments.length; l < u; l++) {
              var d = s(arguments[l]);
              c.indexOf(d) < 0 && c.push(d);
            }
            this._update(c);
          },
        },
        remove: {
          value: function () {
            for (var c = a(this), l = 0, u = arguments.length; l < u; l++) {
              var d = s(arguments[l]),
                m = c.indexOf(d);
              m > -1 && c.splice(m, 1);
            }
            this._update(c);
          },
        },
        toggle: {
          value: function (l, u) {
            return (
              (l = s(l)),
              this.contains(l)
                ? u === void 0 || u === !1
                  ? (this.remove(l), !1)
                  : !0
                : u === void 0 || u === !0
                ? (this.add(l), !0)
                : !1
            );
          },
        },
        replace: {
          value: function (l, u) {
            String(u) === '' && n.SyntaxError(), (l = s(l)), (u = s(u));
            var d = a(this),
              m = d.indexOf(l);
            if (m < 0) return !1;
            var E = d.indexOf(u);
            return (
              E < 0
                ? (d[m] = u)
                : m < E
                ? ((d[m] = u), d.splice(E, 1))
                : d.splice(m, 1),
              this._update(d),
              !0
            );
          },
        },
        toString: {
          value: function () {
            return this._getString();
          },
        },
        value: {
          get: function () {
            return this._getString();
          },
          set: function (c) {
            this._setString(c), this._update();
          },
        },
        _update: {
          value: function (c) {
            c
              ? (i(this, c), this._setString(c.join(' ').trim()))
              : i(this, a(this)),
              (this._lastStringValue = this._getString());
          },
        },
      });
      function i(c, l) {
        var u = c._length,
          d;
        for (c._length = l.length, d = 0; d < l.length; d++) c[d] = l[d];
        for (; d < u; d++) c[d] = void 0;
      }
      function s(c) {
        return (
          (c = String(c)),
          c === '' && n.SyntaxError(),
          /[ \t\r\n\f]/.test(c) && n.InvalidCharacterError(),
          c
        );
      }
      function o(c) {
        for (var l = c._length, u = Array(l), d = 0; d < l; d++) u[d] = c[d];
        return u;
      }
      function a(c) {
        var l = c._getString();
        if (l === c._lastStringValue) return o(c);
        var u = l.replace(/(^[ \t\r\n\f]+)|([ \t\r\n\f]+$)/g, '');
        if (u === '') return [];
        var d = Object.create(null);
        return u.split(/[ \t\r\n\f]+/g).filter(function (m) {
          var E = '$' + m;
          return d[E] ? !1 : ((d[E] = !0), !0);
        });
      }
    },
  }),
  Np = oe({
    'external/npm/node_modules/domino/lib/select.js'(t, e) {
      'use strict';
      var n = Object.create(null, {
          location: {
            get: function () {
              throw new Error('window.location is not supported.');
            },
          },
        }),
        r = function (y, g) {
          return y.compareDocumentPosition(g);
        },
        i = function (y, g) {
          return r(y, g) & 2 ? 1 : -1;
        },
        s = function (y) {
          for (; (y = y.nextSibling) && y.nodeType !== 1; );
          return y;
        },
        o = function (y) {
          for (; (y = y.previousSibling) && y.nodeType !== 1; );
          return y;
        },
        a = function (y) {
          if ((y = y.firstChild))
            for (; y.nodeType !== 1 && (y = y.nextSibling); );
          return y;
        },
        c = function (y) {
          if ((y = y.lastChild))
            for (; y.nodeType !== 1 && (y = y.previousSibling); );
          return y;
        },
        l = function (y) {
          if (!y.parentNode) return !1;
          var g = y.parentNode.nodeType;
          return g === 1 || g === 9;
        },
        u = function (y) {
          if (!y) return y;
          var g = y[0];
          return g === '"' || g === "'"
            ? (y[y.length - 1] === g ? (y = y.slice(1, -1)) : (y = y.slice(1)),
              y.replace(b.str_escape, function (p) {
                var v = /^\\(?:([0-9A-Fa-f]+)|([\r\n\f]+))/.exec(p);
                if (!v) return p.slice(1);
                if (v[2]) return '';
                var C = parseInt(v[1], 16);
                return String.fromCodePoint
                  ? String.fromCodePoint(C)
                  : String.fromCharCode(C);
              }))
            : b.ident.test(y)
            ? d(y)
            : y;
        },
        d = function (y) {
          return y.replace(b.escape, function (g) {
            var p = /^\\([0-9A-Fa-f]+)/.exec(g);
            if (!p) return g[1];
            var v = parseInt(p[1], 16);
            return String.fromCodePoint
              ? String.fromCodePoint(v)
              : String.fromCharCode(v);
          });
        },
        m = (function () {
          return Array.prototype.indexOf
            ? Array.prototype.indexOf
            : function (y, g) {
                for (var p = this.length; p--; ) if (this[p] === g) return p;
                return -1;
              };
        })(),
        E = function (y, g) {
          var p = b.inside.source.replace(/</g, y).replace(/>/g, g);
          return new RegExp(p);
        },
        I = function (y, g, p) {
          return (
            (y = y.source), (y = y.replace(g, p.source || p)), new RegExp(y)
          );
        },
        M = function (y, g) {
          return y
            .replace(/^(?:\w+:\/\/|\/+)/, '')
            .replace(/(?:\/+|\/*#.*?)$/, '')
            .split('/', g)
            .join('/');
        },
        j = function (y, g) {
          var p = y.replace(/\s+/g, ''),
            v;
          return (
            p === 'even'
              ? (p = '2n+0')
              : p === 'odd'
              ? (p = '2n+1')
              : p.indexOf('n') === -1 && (p = '0n' + p),
            (v = /^([+-])?(\d+)?n([+-])?(\d+)?$/.exec(p)),
            {
              group: v[1] === '-' ? -(v[2] || 1) : +(v[2] || 1),
              offset: v[4] ? (v[3] === '-' ? -v[4] : +v[4]) : 0,
            }
          );
        },
        O = function (y, g, p) {
          var v = j(y),
            C = v.group,
            x = v.offset,
            U = p ? c : a,
            Q = p ? o : s;
          return function (pe) {
            if (l(pe))
              for (var T = U(pe.parentNode), k = 0; T; ) {
                if ((g(T, pe) && k++, T === pe))
                  return (k -= x), C && k ? k % C === 0 && k < 0 == C < 0 : !k;
                T = Q(T);
              }
          };
        },
        D = {
          '*': (function () {
            return function () {
              return !0;
            };
          })(),
          type: function (y) {
            return (
              (y = y.toLowerCase()),
              function (g) {
                return g.nodeName.toLowerCase() === y;
              }
            );
          },
          attr: function (y, g, p, v) {
            return (
              (g = _[g]),
              function (C) {
                var x;
                switch (y) {
                  case 'for':
                    x = C.htmlFor;
                    break;
                  case 'class':
                    (x = C.className),
                      x === '' && C.getAttribute('class') == null && (x = null);
                    break;
                  case 'href':
                  case 'src':
                    x = C.getAttribute(y, 2);
                    break;
                  case 'title':
                    x = C.getAttribute('title') || null;
                    break;
                  case 'id':
                  case 'lang':
                  case 'dir':
                  case 'accessKey':
                  case 'hidden':
                  case 'tabIndex':
                  case 'style':
                    if (C.getAttribute) {
                      x = C.getAttribute(y);
                      break;
                    }
                  default:
                    if (C.hasAttribute && !C.hasAttribute(y)) break;
                    x =
                      C[y] != null ? C[y] : C.getAttribute && C.getAttribute(y);
                    break;
                }
                if (x != null)
                  return (
                    (x = x + ''),
                    v && ((x = x.toLowerCase()), (p = p.toLowerCase())),
                    g(x, p)
                  );
              }
            );
          },
          ':first-child': function (y) {
            return !o(y) && l(y);
          },
          ':last-child': function (y) {
            return !s(y) && l(y);
          },
          ':only-child': function (y) {
            return !o(y) && !s(y) && l(y);
          },
          ':nth-child': function (y, g) {
            return O(
              y,
              function () {
                return !0;
              },
              g
            );
          },
          ':nth-last-child': function (y) {
            return D[':nth-child'](y, !0);
          },
          ':root': function (y) {
            return y.ownerDocument.documentElement === y;
          },
          ':empty': function (y) {
            return !y.firstChild;
          },
          ':not': function (y) {
            var g = F(y);
            return function (p) {
              return !g(p);
            };
          },
          ':first-of-type': function (y) {
            if (l(y)) {
              for (var g = y.nodeName; (y = o(y)); )
                if (y.nodeName === g) return;
              return !0;
            }
          },
          ':last-of-type': function (y) {
            if (l(y)) {
              for (var g = y.nodeName; (y = s(y)); )
                if (y.nodeName === g) return;
              return !0;
            }
          },
          ':only-of-type': function (y) {
            return D[':first-of-type'](y) && D[':last-of-type'](y);
          },
          ':nth-of-type': function (y, g) {
            return O(
              y,
              function (p, v) {
                return p.nodeName === v.nodeName;
              },
              g
            );
          },
          ':nth-last-of-type': function (y) {
            return D[':nth-of-type'](y, !0);
          },
          ':checked': function (y) {
            return !!(y.checked || y.selected);
          },
          ':indeterminate': function (y) {
            return !D[':checked'](y);
          },
          ':enabled': function (y) {
            return !y.disabled && y.type !== 'hidden';
          },
          ':disabled': function (y) {
            return !!y.disabled;
          },
          ':target': function (y) {
            return y.id === n.location.hash.substring(1);
          },
          ':focus': function (y) {
            return y === y.ownerDocument.activeElement;
          },
          ':is': function (y) {
            return F(y);
          },
          ':matches': function (y) {
            return D[':is'](y);
          },
          ':nth-match': function (y, g) {
            var p = y.split(/\s*,\s*/),
              v = p.shift(),
              C = F(p.join(','));
            return O(v, C, g);
          },
          ':nth-last-match': function (y) {
            return D[':nth-match'](y, !0);
          },
          ':links-here': function (y) {
            return y + '' == n.location + '';
          },
          ':lang': function (y) {
            return function (g) {
              for (; g; ) {
                if (g.lang) return g.lang.indexOf(y) === 0;
                g = g.parentNode;
              }
            };
          },
          ':dir': function (y) {
            return function (g) {
              for (; g; ) {
                if (g.dir) return g.dir === y;
                g = g.parentNode;
              }
            };
          },
          ':scope': function (y, g) {
            var p = g || y.ownerDocument;
            return p.nodeType === 9 ? y === p.documentElement : y === p;
          },
          ':any-link': function (y) {
            return typeof y.href == 'string';
          },
          ':local-link': function (y) {
            if (y.nodeName) return y.href && y.host === n.location.host;
            var g = +y + 1;
            return function (p) {
              if (p.href) {
                var v = n.location + '',
                  C = p + '';
                return M(v, g) === M(C, g);
              }
            };
          },
          ':default': function (y) {
            return !!y.defaultSelected;
          },
          ':valid': function (y) {
            return y.willValidate || (y.validity && y.validity.valid);
          },
          ':invalid': function (y) {
            return !D[':valid'](y);
          },
          ':in-range': function (y) {
            return y.value > y.min && y.value <= y.max;
          },
          ':out-of-range': function (y) {
            return !D[':in-range'](y);
          },
          ':required': function (y) {
            return !!y.required;
          },
          ':optional': function (y) {
            return !y.required;
          },
          ':read-only': function (y) {
            if (y.readOnly) return !0;
            var g = y.getAttribute('contenteditable'),
              p = y.contentEditable,
              v = y.nodeName.toLowerCase();
            return (
              (v = v !== 'input' && v !== 'textarea'),
              (v || y.disabled) && g == null && p !== 'true'
            );
          },
          ':read-write': function (y) {
            return !D[':read-only'](y);
          },
          ':hover': function () {
            throw new Error(':hover is not supported.');
          },
          ':active': function () {
            throw new Error(':active is not supported.');
          },
          ':link': function () {
            throw new Error(':link is not supported.');
          },
          ':visited': function () {
            throw new Error(':visited is not supported.');
          },
          ':column': function () {
            throw new Error(':column is not supported.');
          },
          ':nth-column': function () {
            throw new Error(':nth-column is not supported.');
          },
          ':nth-last-column': function () {
            throw new Error(':nth-last-column is not supported.');
          },
          ':current': function () {
            throw new Error(':current is not supported.');
          },
          ':past': function () {
            throw new Error(':past is not supported.');
          },
          ':future': function () {
            throw new Error(':future is not supported.');
          },
          ':contains': function (y) {
            return function (g) {
              var p = g.innerText || g.textContent || g.value || '';
              return p.indexOf(y) !== -1;
            };
          },
          ':has': function (y) {
            return function (g) {
              return Y(y, g).length > 0;
            };
          },
        },
        _ = {
          '-': function () {
            return !0;
          },
          '=': function (y, g) {
            return y === g;
          },
          '*=': function (y, g) {
            return y.indexOf(g) !== -1;
          },
          '~=': function (y, g) {
            var p, v, C, x;
            for (v = 0; ; v = p + 1) {
              if (((p = y.indexOf(g, v)), p === -1)) return !1;
              if (
                ((C = y[p - 1]),
                (x = y[p + g.length]),
                (!C || C === ' ') && (!x || x === ' '))
              )
                return !0;
            }
          },
          '|=': function (y, g) {
            var p = y.indexOf(g),
              v;
            if (p === 0) return (v = y[p + g.length]), v === '-' || !v;
          },
          '^=': function (y, g) {
            return y.indexOf(g) === 0;
          },
          '$=': function (y, g) {
            var p = y.lastIndexOf(g);
            return p !== -1 && p + g.length === y.length;
          },
          '!=': function (y, g) {
            return y !== g;
          },
        },
        S = {
          ' ': function (y) {
            return function (g) {
              for (; (g = g.parentNode); ) if (y(g)) return g;
            };
          },
          '>': function (y) {
            return function (g) {
              if ((g = g.parentNode)) return y(g) && g;
            };
          },
          '+': function (y) {
            return function (g) {
              if ((g = o(g))) return y(g) && g;
            };
          },
          '~': function (y) {
            return function (g) {
              for (; (g = o(g)); ) if (y(g)) return g;
            };
          },
          noop: function (y) {
            return function (g) {
              return y(g) && g;
            };
          },
          ref: function (y, g) {
            var p;
            function v(C) {
              for (
                var x = C.ownerDocument,
                  U = x.getElementsByTagName('*'),
                  Q = U.length;
                Q--;

              )
                if (((p = U[Q]), v.test(C))) return (p = null), !0;
              p = null;
            }
            return (
              (v.combinator = function (C) {
                if (!(!p || !p.getAttribute)) {
                  var x = p.getAttribute(g) || '';
                  if (
                    (x[0] === '#' && (x = x.substring(1)), x === C.id && y(p))
                  )
                    return p;
                }
              }),
              v
            );
          },
        },
        b = {
          escape: /\\(?:[^0-9A-Fa-f\r\n]|[0-9A-Fa-f]{1,6}[\r\n\t ]?)/g,
          str_escape: /(escape)|\\(\n|\r\n?|\f)/g,
          nonascii: /[\u00A0-\uFFFF]/,
          cssid: /(?:(?!-?[0-9])(?:escape|nonascii|[-_a-zA-Z0-9])+)/,
          qname: /^ *(cssid|\*)/,
          simple: /^(?:([.#]cssid)|pseudo|attr)/,
          ref: /^ *\/(cssid)\/ */,
          combinator: /^(?: +([^ \w*.#\\]) +|( )+|([^ \w*.#\\]))(?! *$)/,
          attr: /^\[(cssid)(?:([^\w]?=)(inside))?\]/,
          pseudo: /^(:cssid)(?:\((inside)\))?/,
          inside:
            /(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|<[^"'>]*>|\\["'>]|[^"'>])*/,
          ident: /^(cssid)$/,
        };
      (b.cssid = I(b.cssid, 'nonascii', b.nonascii)),
        (b.cssid = I(b.cssid, 'escape', b.escape)),
        (b.qname = I(b.qname, 'cssid', b.cssid)),
        (b.simple = I(b.simple, 'cssid', b.cssid)),
        (b.ref = I(b.ref, 'cssid', b.cssid)),
        (b.attr = I(b.attr, 'cssid', b.cssid)),
        (b.pseudo = I(b.pseudo, 'cssid', b.cssid)),
        (b.inside = I(b.inside, `[^"'>]*`, b.inside)),
        (b.attr = I(b.attr, 'inside', E('\\[', '\\]'))),
        (b.pseudo = I(b.pseudo, 'inside', E('\\(', '\\)'))),
        (b.simple = I(b.simple, 'pseudo', b.pseudo)),
        (b.simple = I(b.simple, 'attr', b.attr)),
        (b.ident = I(b.ident, 'cssid', b.cssid)),
        (b.str_escape = I(b.str_escape, 'escape', b.escape));
      var ne = function (y) {
          for (
            var g = y.replace(/^\s+|\s+$/g, ''),
              p,
              v = [],
              C = [],
              x,
              U,
              Q,
              pe,
              T;
            g;

          ) {
            if ((Q = b.qname.exec(g)))
              (g = g.substring(Q[0].length)), (U = d(Q[1])), C.push(se(U, !0));
            else if ((Q = b.simple.exec(g)))
              (g = g.substring(Q[0].length)),
                (U = '*'),
                C.push(se(U, !0)),
                C.push(se(Q));
            else throw new SyntaxError('Invalid selector.');
            for (; (Q = b.simple.exec(g)); )
              (g = g.substring(Q[0].length)), C.push(se(Q));
            if (
              (g[0] === '!' &&
                ((g = g.substring(1)),
                (x = R()),
                (x.qname = U),
                C.push(x.simple)),
              (Q = b.ref.exec(g)))
            ) {
              (g = g.substring(Q[0].length)),
                (T = S.ref(Ie(C), d(Q[1]))),
                v.push(T.combinator),
                (C = []);
              continue;
            }
            if ((Q = b.combinator.exec(g))) {
              if (
                ((g = g.substring(Q[0].length)),
                (pe = Q[1] || Q[2] || Q[3]),
                pe === ',')
              ) {
                v.push(S.noop(Ie(C)));
                break;
              }
            } else pe = 'noop';
            if (!S[pe]) throw new SyntaxError('Bad combinator.');
            v.push(S[pe](Ie(C))), (C = []);
          }
          return (
            (p = q(v)),
            (p.qname = U),
            (p.sel = g),
            x &&
              ((x.lname = p.qname),
              (x.test = p),
              (x.qname = x.qname),
              (x.sel = p.sel),
              (p = x)),
            T && ((T.test = p), (T.qname = p.qname), (T.sel = p.sel), (p = T)),
            p
          );
        },
        se = function (y, g) {
          if (g) return y === '*' ? D['*'] : D.type(y);
          if (y[1])
            return y[1][0] === '.'
              ? D.attr('class', '~=', d(y[1].substring(1)), !1)
              : D.attr('id', '=', d(y[1].substring(1)), !1);
          if (y[2]) return y[3] ? D[d(y[2])](u(y[3])) : D[d(y[2])];
          if (y[4]) {
            var p = y[6],
              v = /["'\s]\s*I$/i.test(p);
            return (
              v && (p = p.replace(/\s*I$/i, '')),
              D.attr(d(y[4]), y[5] || '-', u(p), v)
            );
          }
          throw new SyntaxError('Unknown Selector.');
        },
        Ie = function (y) {
          var g = y.length,
            p;
          return g < 2
            ? y[0]
            : function (v) {
                if (v) {
                  for (p = 0; p < g; p++) if (!y[p](v)) return;
                  return !0;
                }
              };
        },
        q = function (y) {
          return y.length < 2
            ? function (g) {
                return !!y[0](g);
              }
            : function (g) {
                for (var p = y.length; p--; ) if (!(g = y[p](g))) return;
                return !0;
              };
        },
        R = function () {
          var y;
          function g(p) {
            for (
              var v = p.ownerDocument,
                C = v.getElementsByTagName(g.lname),
                x = C.length;
              x--;

            )
              if (g.test(C[x]) && y === p) return (y = null), !0;
            y = null;
          }
          return (
            (g.simple = function (p) {
              return (y = p), !0;
            }),
            g
          );
        },
        F = function (y) {
          for (var g = ne(y), p = [g]; g.sel; ) (g = ne(g.sel)), p.push(g);
          return p.length < 2
            ? g
            : function (v) {
                for (var C = p.length, x = 0; x < C; x++)
                  if (p[x](v)) return !0;
              };
        },
        Y = function (y, g) {
          for (
            var p = [],
              v = ne(y),
              C = g.getElementsByTagName(v.qname),
              x = 0,
              U;
            (U = C[x++]);

          )
            v(U) && p.push(U);
          if (v.sel) {
            for (; v.sel; )
              for (
                v = ne(v.sel), C = g.getElementsByTagName(v.qname), x = 0;
                (U = C[x++]);

              )
                v(U) && m.call(p, U) === -1 && p.push(U);
            p.sort(i);
          }
          return p;
        };
      (e.exports = t =
        function (y, g) {
          var p, v;
          if (g.nodeType !== 11 && y.indexOf(' ') === -1) {
            if (
              y[0] === '#' &&
              g.rooted &&
              /^#[A-Z_][-A-Z0-9_]*$/i.test(y) &&
              g.doc._hasMultipleElementsWithId &&
              ((p = y.substring(1)), !g.doc._hasMultipleElementsWithId(p))
            )
              return (v = g.doc.getElementById(p)), v ? [v] : [];
            if (y[0] === '.' && /^\.\w+$/.test(y))
              return g.getElementsByClassName(y.substring(1));
            if (/^\w+$/.test(y)) return g.getElementsByTagName(y);
          }
          return Y(y, g);
        }),
        (t.selectors = D),
        (t.operators = _),
        (t.combinators = S),
        (t.matches = function (y, g) {
          var p = { sel: g };
          do if (((p = ne(p.sel)), p(y))) return !0;
          while (p.sel);
          return !1;
        });
    },
  }),
  Ap = oe({
    'external/npm/node_modules/domino/lib/ChildNode.js'(t, e) {
      'use strict';
      var n = yt(),
        r = B0(),
        i = function (o, a) {
          for (var c = o.createDocumentFragment(), l = 0; l < a.length; l++) {
            var u = a[l],
              d = u instanceof n;
            c.appendChild(d ? u : o.createTextNode(String(u)));
          }
          return c;
        },
        s = {
          after: {
            value: function () {
              var a = Array.prototype.slice.call(arguments),
                c = this.parentNode,
                l = this.nextSibling;
              if (c !== null) {
                for (
                  ;
                  l &&
                  a.some(function (d) {
                    return d === l;
                  });

                )
                  l = l.nextSibling;
                var u = i(this.doc, a);
                c.insertBefore(u, l);
              }
            },
          },
          before: {
            value: function () {
              var a = Array.prototype.slice.call(arguments),
                c = this.parentNode,
                l = this.previousSibling;
              if (c !== null) {
                for (
                  ;
                  l &&
                  a.some(function (m) {
                    return m === l;
                  });

                )
                  l = l.previousSibling;
                var u = i(this.doc, a),
                  d = l ? l.nextSibling : c.firstChild;
                c.insertBefore(u, d);
              }
            },
          },
          remove: {
            value: function () {
              this.parentNode !== null &&
                (this.doc &&
                  (this.doc._preremoveNodeIterators(this),
                  this.rooted && this.doc.mutateRemove(this)),
                this._remove(),
                (this.parentNode = null));
            },
          },
          _remove: {
            value: function () {
              var a = this.parentNode;
              a !== null &&
                (a._childNodes
                  ? a._childNodes.splice(this.index, 1)
                  : a._firstChild === this &&
                    (this._nextSibling === this
                      ? (a._firstChild = null)
                      : (a._firstChild = this._nextSibling)),
                r.remove(this),
                a.modify());
            },
          },
          replaceWith: {
            value: function () {
              var a = Array.prototype.slice.call(arguments),
                c = this.parentNode,
                l = this.nextSibling;
              if (c !== null) {
                for (
                  ;
                  l &&
                  a.some(function (d) {
                    return d === l;
                  });

                )
                  l = l.nextSibling;
                var u = i(this.doc, a);
                this.parentNode === c
                  ? c.replaceChild(u, this)
                  : c.insertBefore(u, l);
              }
            },
          },
        };
      e.exports = s;
    },
  }),
  q0 = oe({
    'external/npm/node_modules/domino/lib/NonDocumentTypeChildNode.js'(t, e) {
      'use strict';
      var n = yt(),
        r = {
          nextElementSibling: {
            get: function () {
              if (this.parentNode) {
                for (var i = this.nextSibling; i !== null; i = i.nextSibling)
                  if (i.nodeType === n.ELEMENT_NODE) return i;
              }
              return null;
            },
          },
          previousElementSibling: {
            get: function () {
              if (this.parentNode) {
                for (
                  var i = this.previousSibling;
                  i !== null;
                  i = i.previousSibling
                )
                  if (i.nodeType === n.ELEMENT_NODE) return i;
              }
              return null;
            },
          },
        };
      e.exports = r;
    },
  }),
  z0 = oe({
    'external/npm/node_modules/domino/lib/NamedNodeMap.js'(t, e) {
      'use strict';
      e.exports = r;
      var n = tt();
      function r(i) {
        this.element = i;
      }
      Object.defineProperties(r.prototype, {
        length: { get: n.shouldOverride },
        item: { value: n.shouldOverride },
        getNamedItem: {
          value: function (s) {
            return this.element.getAttributeNode(s);
          },
        },
        getNamedItemNS: {
          value: function (s, o) {
            return this.element.getAttributeNodeNS(s, o);
          },
        },
        setNamedItem: { value: n.nyi },
        setNamedItemNS: { value: n.nyi },
        removeNamedItem: {
          value: function (s) {
            var o = this.element.getAttributeNode(s);
            if (o) return this.element.removeAttribute(s), o;
            n.NotFoundError();
          },
        },
        removeNamedItemNS: {
          value: function (s, o) {
            var a = this.element.getAttributeNodeNS(s, o);
            if (a) return this.element.removeAttributeNS(s, o), a;
            n.NotFoundError();
          },
        },
      });
    },
  }),
  Fo = oe({
    'external/npm/node_modules/domino/lib/Element.js'(t, e) {
      'use strict';
      e.exports = D;
      var n = Mp(),
        r = tt(),
        i = r.NAMESPACE,
        s = U0(),
        o = yt(),
        a = ds(),
        c = V0(),
        l = Ox(),
        u = Sp(),
        d = $0(),
        m = Np(),
        E = Ip(),
        I = Ap(),
        M = q0(),
        j = z0(),
        O = Object.create(null);
      function D(g, p, v, C) {
        E.call(this),
          (this.nodeType = o.ELEMENT_NODE),
          (this.ownerDocument = g),
          (this.localName = p),
          (this.namespaceURI = v),
          (this.prefix = C),
          (this._tagName = void 0),
          (this._attrsByQName = Object.create(null)),
          (this._attrsByLName = Object.create(null)),
          (this._attrKeys = []);
      }
      function _(g, p) {
        if (g.nodeType === o.TEXT_NODE) p.push(g._data);
        else
          for (var v = 0, C = g.childNodes.length; v < C; v++)
            _(g.childNodes[v], p);
      }
      (D.prototype = Object.create(E.prototype, {
        isHTML: {
          get: function () {
            return this.namespaceURI === i.HTML && this.ownerDocument.isHTML;
          },
        },
        tagName: {
          get: function () {
            if (this._tagName === void 0) {
              var p;
              if (
                (this.prefix === null
                  ? (p = this.localName)
                  : (p = this.prefix + ':' + this.localName),
                this.isHTML)
              ) {
                var v = O[p];
                v || (O[p] = v = r.toASCIIUpperCase(p)), (p = v);
              }
              this._tagName = p;
            }
            return this._tagName;
          },
        },
        nodeName: {
          get: function () {
            return this.tagName;
          },
        },
        nodeValue: {
          get: function () {
            return null;
          },
          set: function () {},
        },
        textContent: {
          get: function () {
            var g = [];
            return _(this, g), g.join('');
          },
          set: function (g) {
            this.removeChildren(),
              g != null &&
                g !== '' &&
                this._appendChild(this.ownerDocument.createTextNode(g));
          },
        },
        innerText: {
          get: function () {
            var g = [];
            return (
              _(this, g),
              g
                .join('')
                .replace(/[ \t\n\f\r]+/g, ' ')
                .trim()
            );
          },
          set: function (g) {
            this.removeChildren(),
              g != null &&
                g !== '' &&
                this._appendChild(this.ownerDocument.createTextNode(g));
          },
        },
        innerHTML: {
          get: function () {
            return this.serialize();
          },
          set: r.nyi,
        },
        outerHTML: {
          get: function () {
            return c.serializeOne(this, { nodeType: 0 });
          },
          set: function (g) {
            var p = this.ownerDocument,
              v = this.parentNode;
            if (v !== null) {
              v.nodeType === o.DOCUMENT_NODE && r.NoModificationAllowedError(),
                v.nodeType === o.DOCUMENT_FRAGMENT_NODE &&
                  (v = v.ownerDocument.createElement('body'));
              var C = p.implementation.mozHTMLParser(p._address, v);
              C.parse(g === null ? '' : String(g), !0),
                this.replaceWith(C._asDocumentFragment());
            }
          },
        },
        _insertAdjacent: {
          value: function (p, v) {
            var C = !1;
            switch (p) {
              case 'beforebegin':
                C = !0;
              case 'afterend':
                var x = this.parentNode;
                return x === null
                  ? null
                  : x.insertBefore(v, C ? this : this.nextSibling);
              case 'afterbegin':
                C = !0;
              case 'beforeend':
                return this.insertBefore(v, C ? this.firstChild : null);
              default:
                return r.SyntaxError();
            }
          },
        },
        insertAdjacentElement: {
          value: function (p, v) {
            if (v.nodeType !== o.ELEMENT_NODE)
              throw new TypeError('not an element');
            return (
              (p = r.toASCIILowerCase(String(p))), this._insertAdjacent(p, v)
            );
          },
        },
        insertAdjacentText: {
          value: function (p, v) {
            var C = this.ownerDocument.createTextNode(v);
            (p = r.toASCIILowerCase(String(p))), this._insertAdjacent(p, C);
          },
        },
        insertAdjacentHTML: {
          value: function (p, v) {
            (p = r.toASCIILowerCase(String(p))), (v = String(v));
            var C;
            switch (p) {
              case 'beforebegin':
              case 'afterend':
                (C = this.parentNode),
                  (C === null || C.nodeType === o.DOCUMENT_NODE) &&
                    r.NoModificationAllowedError();
                break;
              case 'afterbegin':
              case 'beforeend':
                C = this;
                break;
              default:
                r.SyntaxError();
            }
            (!(C instanceof D) ||
              (C.ownerDocument.isHTML &&
                C.localName === 'html' &&
                C.namespaceURI === i.HTML)) &&
              (C = C.ownerDocument.createElementNS(i.HTML, 'body'));
            var x = this.ownerDocument.implementation.mozHTMLParser(
              this.ownerDocument._address,
              C
            );
            x.parse(v, !0), this._insertAdjacent(p, x._asDocumentFragment());
          },
        },
        children: {
          get: function () {
            return (
              this._children || (this._children = new se(this)), this._children
            );
          },
        },
        attributes: {
          get: function () {
            return (
              this._attributes || (this._attributes = new b(this)),
              this._attributes
            );
          },
        },
        firstElementChild: {
          get: function () {
            for (var g = this.firstChild; g !== null; g = g.nextSibling)
              if (g.nodeType === o.ELEMENT_NODE) return g;
            return null;
          },
        },
        lastElementChild: {
          get: function () {
            for (var g = this.lastChild; g !== null; g = g.previousSibling)
              if (g.nodeType === o.ELEMENT_NODE) return g;
            return null;
          },
        },
        childElementCount: {
          get: function () {
            return this.children.length;
          },
        },
        nextElement: {
          value: function (g) {
            g || (g = this.ownerDocument.documentElement);
            var p = this.firstElementChild;
            if (!p) {
              if (this === g) return null;
              p = this.nextElementSibling;
            }
            if (p) return p;
            for (var v = this.parentElement; v && v !== g; v = v.parentElement)
              if (((p = v.nextElementSibling), p)) return p;
            return null;
          },
        },
        getElementsByTagName: {
          value: function (p) {
            var v;
            return p
              ? (p === '*'
                  ? (v = function () {
                      return !0;
                    })
                  : this.isHTML
                  ? (v = q(p))
                  : (v = Ie(p)),
                new l(this, v))
              : new a();
          },
        },
        getElementsByTagNameNS: {
          value: function (p, v) {
            var C;
            return (
              p === '*' && v === '*'
                ? (C = function () {
                    return !0;
                  })
                : p === '*'
                ? (C = Ie(v))
                : v === '*'
                ? (C = R(p))
                : (C = F(p, v)),
              new l(this, C)
            );
          },
        },
        getElementsByClassName: {
          value: function (p) {
            if (((p = String(p).trim()), p === '')) {
              var v = new a();
              return v;
            }
            return (p = p.split(/[ \t\r\n\f]+/)), new l(this, Y(p));
          },
        },
        getElementsByName: {
          value: function (p) {
            return new l(this, y(String(p)));
          },
        },
        clone: {
          value: function () {
            var p;
            this.namespaceURI !== i.HTML ||
            this.prefix ||
            !this.ownerDocument.isHTML
              ? (p = this.ownerDocument.createElementNS(
                  this.namespaceURI,
                  this.prefix !== null
                    ? this.prefix + ':' + this.localName
                    : this.localName
                ))
              : (p = this.ownerDocument.createElement(this.localName));
            for (var v = 0, C = this._attrKeys.length; v < C; v++) {
              var x = this._attrKeys[v],
                U = this._attrsByLName[x],
                Q = U.cloneNode();
              Q._setOwnerElement(p), (p._attrsByLName[x] = Q), p._addQName(Q);
            }
            return (p._attrKeys = this._attrKeys.concat()), p;
          },
        },
        isEqual: {
          value: function (p) {
            if (
              this.localName !== p.localName ||
              this.namespaceURI !== p.namespaceURI ||
              this.prefix !== p.prefix ||
              this._numattrs !== p._numattrs
            )
              return !1;
            for (var v = 0, C = this._numattrs; v < C; v++) {
              var x = this._attr(v);
              if (
                !p.hasAttributeNS(x.namespaceURI, x.localName) ||
                p.getAttributeNS(x.namespaceURI, x.localName) !== x.value
              )
                return !1;
            }
            return !0;
          },
        },
        _lookupNamespacePrefix: {
          value: function (p, v) {
            if (
              this.namespaceURI &&
              this.namespaceURI === p &&
              this.prefix !== null &&
              v.lookupNamespaceURI(this.prefix) === p
            )
              return this.prefix;
            for (var C = 0, x = this._numattrs; C < x; C++) {
              var U = this._attr(C);
              if (
                U.prefix === 'xmlns' &&
                U.value === p &&
                v.lookupNamespaceURI(U.localName) === p
              )
                return U.localName;
            }
            var Q = this.parentElement;
            return Q ? Q._lookupNamespacePrefix(p, v) : null;
          },
        },
        lookupNamespaceURI: {
          value: function (p) {
            if (
              ((p === '' || p === void 0) && (p = null),
              this.namespaceURI !== null && this.prefix === p)
            )
              return this.namespaceURI;
            for (var v = 0, C = this._numattrs; v < C; v++) {
              var x = this._attr(v);
              if (
                x.namespaceURI === i.XMLNS &&
                ((x.prefix === 'xmlns' && x.localName === p) ||
                  (p === null && x.prefix === null && x.localName === 'xmlns'))
              )
                return x.value || null;
            }
            var U = this.parentElement;
            return U ? U.lookupNamespaceURI(p) : null;
          },
        },
        getAttribute: {
          value: function (p) {
            var v = this.getAttributeNode(p);
            return v ? v.value : null;
          },
        },
        getAttributeNS: {
          value: function (p, v) {
            var C = this.getAttributeNodeNS(p, v);
            return C ? C.value : null;
          },
        },
        getAttributeNode: {
          value: function (p) {
            (p = String(p)),
              /[A-Z]/.test(p) && this.isHTML && (p = r.toASCIILowerCase(p));
            var v = this._attrsByQName[p];
            return v ? (Array.isArray(v) && (v = v[0]), v) : null;
          },
        },
        getAttributeNodeNS: {
          value: function (p, v) {
            (p = p == null ? '' : String(p)), (v = String(v));
            var C = this._attrsByLName[p + '|' + v];
            return C || null;
          },
        },
        hasAttribute: {
          value: function (p) {
            return (
              (p = String(p)),
              /[A-Z]/.test(p) && this.isHTML && (p = r.toASCIILowerCase(p)),
              this._attrsByQName[p] !== void 0
            );
          },
        },
        hasAttributeNS: {
          value: function (p, v) {
            (p = p == null ? '' : String(p)), (v = String(v));
            var C = p + '|' + v;
            return this._attrsByLName[C] !== void 0;
          },
        },
        hasAttributes: {
          value: function () {
            return this._numattrs > 0;
          },
        },
        toggleAttribute: {
          value: function (p, v) {
            (p = String(p)),
              n.isValidName(p) || r.InvalidCharacterError(),
              /[A-Z]/.test(p) && this.isHTML && (p = r.toASCIILowerCase(p));
            var C = this._attrsByQName[p];
            return C === void 0
              ? v === void 0 || v === !0
                ? (this._setAttribute(p, ''), !0)
                : !1
              : v === void 0 || v === !1
              ? (this.removeAttribute(p), !1)
              : !0;
          },
        },
        _setAttribute: {
          value: function (p, v) {
            var C = this._attrsByQName[p],
              x;
            C
              ? Array.isArray(C) && (C = C[0])
              : ((C = this._newattr(p)), (x = !0)),
              (C.value = v),
              this._attributes && (this._attributes[p] = C),
              x && this._newattrhook && this._newattrhook(p, v);
          },
        },
        setAttribute: {
          value: function (p, v) {
            (p = String(p)),
              n.isValidName(p) || r.InvalidCharacterError(),
              /[A-Z]/.test(p) && this.isHTML && (p = r.toASCIILowerCase(p)),
              this._setAttribute(p, String(v));
          },
        },
        _setAttributeNS: {
          value: function (p, v, C) {
            var x = v.indexOf(':'),
              U,
              Q;
            x < 0
              ? ((U = null), (Q = v))
              : ((U = v.substring(0, x)), (Q = v.substring(x + 1))),
              (p === '' || p === void 0) && (p = null);
            var pe = (p === null ? '' : p) + '|' + Q,
              T = this._attrsByLName[pe],
              k;
            T ||
              ((T = new S(this, Q, U, p)),
              (k = !0),
              (this._attrsByLName[pe] = T),
              this._attributes && (this._attributes[this._attrKeys.length] = T),
              this._attrKeys.push(pe),
              this._addQName(T)),
              (T.value = C),
              k && this._newattrhook && this._newattrhook(v, C);
          },
        },
        setAttributeNS: {
          value: function (p, v, C) {
            (p = p == null || p === '' ? null : String(p)),
              (v = String(v)),
              n.isValidQName(v) || r.InvalidCharacterError();
            var x = v.indexOf(':'),
              U = x < 0 ? null : v.substring(0, x);
            ((U !== null && p === null) ||
              (U === 'xml' && p !== i.XML) ||
              ((v === 'xmlns' || U === 'xmlns') && p !== i.XMLNS) ||
              (p === i.XMLNS && !(v === 'xmlns' || U === 'xmlns'))) &&
              r.NamespaceError(),
              this._setAttributeNS(p, v, String(C));
          },
        },
        setAttributeNode: {
          value: function (p) {
            if (p.ownerElement !== null && p.ownerElement !== this)
              throw new u(u.INUSE_ATTRIBUTE_ERR);
            var v = null,
              C = this._attrsByQName[p.name];
            if (C) {
              if (
                (Array.isArray(C) || (C = [C]),
                C.some(function (x) {
                  return x === p;
                }))
              )
                return p;
              if (p.ownerElement !== null) throw new u(u.INUSE_ATTRIBUTE_ERR);
              C.forEach(function (x) {
                this.removeAttributeNode(x);
              }, this),
                (v = C[0]);
            }
            return this.setAttributeNodeNS(p), v;
          },
        },
        setAttributeNodeNS: {
          value: function (p) {
            if (p.ownerElement !== null) throw new u(u.INUSE_ATTRIBUTE_ERR);
            var v = p.namespaceURI,
              C = (v === null ? '' : v) + '|' + p.localName,
              x = this._attrsByLName[C];
            return (
              x && this.removeAttributeNode(x),
              p._setOwnerElement(this),
              (this._attrsByLName[C] = p),
              this._attributes && (this._attributes[this._attrKeys.length] = p),
              this._attrKeys.push(C),
              this._addQName(p),
              this._newattrhook && this._newattrhook(p.name, p.value),
              x || null
            );
          },
        },
        removeAttribute: {
          value: function (p) {
            (p = String(p)),
              /[A-Z]/.test(p) && this.isHTML && (p = r.toASCIILowerCase(p));
            var v = this._attrsByQName[p];
            if (v) {
              Array.isArray(v)
                ? v.length > 2
                  ? (v = v.shift())
                  : ((this._attrsByQName[p] = v[1]), (v = v[0]))
                : (this._attrsByQName[p] = void 0);
              var C = v.namespaceURI,
                x = (C === null ? '' : C) + '|' + v.localName;
              this._attrsByLName[x] = void 0;
              var U = this._attrKeys.indexOf(x);
              this._attributes &&
                (Array.prototype.splice.call(this._attributes, U, 1),
                (this._attributes[p] = void 0)),
                this._attrKeys.splice(U, 1);
              var Q = v.onchange;
              v._setOwnerElement(null),
                Q && Q.call(v, this, v.localName, v.value, null),
                this.rooted && this.ownerDocument.mutateRemoveAttr(v);
            }
          },
        },
        removeAttributeNS: {
          value: function (p, v) {
            (p = p == null ? '' : String(p)), (v = String(v));
            var C = p + '|' + v,
              x = this._attrsByLName[C];
            if (x) {
              this._attrsByLName[C] = void 0;
              var U = this._attrKeys.indexOf(C);
              this._attributes &&
                Array.prototype.splice.call(this._attributes, U, 1),
                this._attrKeys.splice(U, 1),
                this._removeQName(x);
              var Q = x.onchange;
              x._setOwnerElement(null),
                Q && Q.call(x, this, x.localName, x.value, null),
                this.rooted && this.ownerDocument.mutateRemoveAttr(x);
            }
          },
        },
        removeAttributeNode: {
          value: function (p) {
            var v = p.namespaceURI,
              C = (v === null ? '' : v) + '|' + p.localName;
            return (
              this._attrsByLName[C] !== p && r.NotFoundError(),
              this.removeAttributeNS(v, p.localName),
              p
            );
          },
        },
        getAttributeNames: {
          value: function () {
            var p = this;
            return this._attrKeys.map(function (v) {
              return p._attrsByLName[v].name;
            });
          },
        },
        _getattr: {
          value: function (p) {
            var v = this._attrsByQName[p];
            return v ? v.value : null;
          },
        },
        _setattr: {
          value: function (p, v) {
            var C = this._attrsByQName[p],
              x;
            C || ((C = this._newattr(p)), (x = !0)),
              (C.value = String(v)),
              this._attributes && (this._attributes[p] = C),
              x && this._newattrhook && this._newattrhook(p, v);
          },
        },
        _newattr: {
          value: function (p) {
            var v = new S(this, p, null, null),
              C = '|' + p;
            return (
              (this._attrsByQName[p] = v),
              (this._attrsByLName[C] = v),
              this._attributes && (this._attributes[this._attrKeys.length] = v),
              this._attrKeys.push(C),
              v
            );
          },
        },
        _addQName: {
          value: function (g) {
            var p = g.name,
              v = this._attrsByQName[p];
            v
              ? Array.isArray(v)
                ? v.push(g)
                : (this._attrsByQName[p] = [v, g])
              : (this._attrsByQName[p] = g),
              this._attributes && (this._attributes[p] = g);
          },
        },
        _removeQName: {
          value: function (g) {
            var p = g.name,
              v = this._attrsByQName[p];
            if (Array.isArray(v)) {
              var C = v.indexOf(g);
              r.assert(C !== -1),
                v.length === 2
                  ? ((this._attrsByQName[p] = v[1 - C]),
                    this._attributes &&
                      (this._attributes[p] = this._attrsByQName[p]))
                  : (v.splice(C, 1),
                    this._attributes &&
                      this._attributes[p] === g &&
                      (this._attributes[p] = v[0]));
            } else
              r.assert(v === g),
                (this._attrsByQName[p] = void 0),
                this._attributes && (this._attributes[p] = void 0);
          },
        },
        _numattrs: {
          get: function () {
            return this._attrKeys.length;
          },
        },
        _attr: {
          value: function (g) {
            return this._attrsByLName[this._attrKeys[g]];
          },
        },
        id: s.property({ name: 'id' }),
        className: s.property({ name: 'class' }),
        classList: {
          get: function () {
            var g = this;
            if (this._classList) return this._classList;
            var p = new d(
              function () {
                return g.className || '';
              },
              function (v) {
                g.className = v;
              }
            );
            return (this._classList = p), p;
          },
          set: function (g) {
            this.className = g;
          },
        },
        matches: {
          value: function (g) {
            return m.matches(this, g);
          },
        },
        closest: {
          value: function (g) {
            var p = this;
            do {
              if (p.matches && p.matches(g)) return p;
              p = p.parentElement || p.parentNode;
            } while (p !== null && p.nodeType === o.ELEMENT_NODE);
            return null;
          },
        },
        querySelector: {
          value: function (g) {
            return m(g, this)[0];
          },
        },
        querySelectorAll: {
          value: function (g) {
            var p = m(g, this);
            return p.item ? p : new a(p);
          },
        },
      })),
        Object.defineProperties(D.prototype, I),
        Object.defineProperties(D.prototype, M),
        s.registerChangeHandler(D, 'id', function (g, p, v, C) {
          g.rooted &&
            (v && g.ownerDocument.delId(v, g),
            C && g.ownerDocument.addId(C, g));
        }),
        s.registerChangeHandler(D, 'class', function (g, p, v, C) {
          g._classList && g._classList._update();
        });
      function S(g, p, v, C, x) {
        (this.localName = p),
          (this.prefix = v === null || v === '' ? null : '' + v),
          (this.namespaceURI = C === null || C === '' ? null : '' + C),
          (this.data = x),
          this._setOwnerElement(g);
      }
      (S.prototype = Object.create(Object.prototype, {
        ownerElement: {
          get: function () {
            return this._ownerElement;
          },
        },
        _setOwnerElement: {
          value: function (p) {
            (this._ownerElement = p),
              this.prefix === null && this.namespaceURI === null && p
                ? (this.onchange = p._attributeChangeHandlers[this.localName])
                : (this.onchange = null);
          },
        },
        name: {
          get: function () {
            return this.prefix
              ? this.prefix + ':' + this.localName
              : this.localName;
          },
        },
        specified: {
          get: function () {
            return !0;
          },
        },
        value: {
          get: function () {
            return this.data;
          },
          set: function (g) {
            var p = this.data;
            (g = g === void 0 ? '' : g + ''),
              g !== p &&
                ((this.data = g),
                this.ownerElement &&
                  (this.onchange &&
                    this.onchange(this.ownerElement, this.localName, p, g),
                  this.ownerElement.rooted &&
                    this.ownerElement.ownerDocument.mutateAttr(this, p)));
          },
        },
        cloneNode: {
          value: function (p) {
            return new S(
              null,
              this.localName,
              this.prefix,
              this.namespaceURI,
              this.data
            );
          },
        },
        nodeType: {
          get: function () {
            return o.ATTRIBUTE_NODE;
          },
        },
        nodeName: {
          get: function () {
            return this.name;
          },
        },
        nodeValue: {
          get: function () {
            return this.value;
          },
          set: function (g) {
            this.value = g;
          },
        },
        textContent: {
          get: function () {
            return this.value;
          },
          set: function (g) {
            g == null && (g = ''), (this.value = g);
          },
        },
        innerText: {
          get: function () {
            return this.value;
          },
          set: function (g) {
            g == null && (g = ''), (this.value = g);
          },
        },
      })),
        (D._Attr = S);
      function b(g) {
        j.call(this, g);
        for (var p in g._attrsByQName) this[p] = g._attrsByQName[p];
        for (var v = 0; v < g._attrKeys.length; v++)
          this[v] = g._attrsByLName[g._attrKeys[v]];
      }
      b.prototype = Object.create(j.prototype, {
        length: {
          get: function () {
            return this.element._attrKeys.length;
          },
          set: function () {},
        },
        item: {
          value: function (g) {
            return (
              (g = g >>> 0),
              g >= this.length
                ? null
                : this.element._attrsByLName[this.element._attrKeys[g]]
            );
          },
        },
      });
      var ne;
      (ne = globalThis.Symbol) != null &&
        ne.iterator &&
        (b.prototype[globalThis.Symbol.iterator] = function () {
          var g = 0,
            p = this.length,
            v = this;
          return {
            next: function () {
              return g < p ? { value: v.item(g++) } : { done: !0 };
            },
          };
        });
      function se(g) {
        (this.element = g), this.updateCache();
      }
      se.prototype = Object.create(Object.prototype, {
        length: {
          get: function () {
            return this.updateCache(), this.childrenByNumber.length;
          },
        },
        item: {
          value: function (p) {
            return this.updateCache(), this.childrenByNumber[p] || null;
          },
        },
        namedItem: {
          value: function (p) {
            return this.updateCache(), this.childrenByName[p] || null;
          },
        },
        namedItems: {
          get: function () {
            return this.updateCache(), this.childrenByName;
          },
        },
        updateCache: {
          value: function () {
            var p =
              /^(a|applet|area|embed|form|frame|frameset|iframe|img|object)$/;
            if (this.lastModTime !== this.element.lastModTime) {
              this.lastModTime = this.element.lastModTime;
              for (
                var v =
                    (this.childrenByNumber && this.childrenByNumber.length) ||
                    0,
                  C = 0;
                C < v;
                C++
              )
                this[C] = void 0;
              (this.childrenByNumber = []),
                (this.childrenByName = Object.create(null));
              for (
                var x = this.element.firstChild;
                x !== null;
                x = x.nextSibling
              )
                if (x.nodeType === o.ELEMENT_NODE) {
                  (this[this.childrenByNumber.length] = x),
                    this.childrenByNumber.push(x);
                  var U = x.getAttribute('id');
                  U && !this.childrenByName[U] && (this.childrenByName[U] = x);
                  var Q = x.getAttribute('name');
                  Q &&
                    this.element.namespaceURI === i.HTML &&
                    p.test(this.element.localName) &&
                    !this.childrenByName[Q] &&
                    (this.childrenByName[U] = x);
                }
            }
          },
        },
      });
      function Ie(g) {
        return function (p) {
          return p.localName === g;
        };
      }
      function q(g) {
        var p = r.toASCIILowerCase(g);
        return p === g
          ? Ie(g)
          : function (v) {
              return v.isHTML ? v.localName === p : v.localName === g;
            };
      }
      function R(g) {
        return function (p) {
          return p.namespaceURI === g;
        };
      }
      function F(g, p) {
        return function (v) {
          return v.namespaceURI === g && v.localName === p;
        };
      }
      function Y(g) {
        return function (p) {
          return g.every(function (v) {
            return p.classList.contains(v);
          });
        };
      }
      function y(g) {
        return function (p) {
          return p.namespaceURI !== i.HTML ? !1 : p.getAttribute('name') === g;
        };
      }
    },
  }),
  G0 = oe({
    'external/npm/node_modules/domino/lib/Leaf.js'(t, e) {
      'use strict';
      e.exports = a;
      var n = yt(),
        r = ds(),
        i = tt(),
        s = i.HierarchyRequestError,
        o = i.NotFoundError;
      function a() {
        n.call(this);
      }
      a.prototype = Object.create(n.prototype, {
        hasChildNodes: {
          value: function () {
            return !1;
          },
        },
        firstChild: { value: null },
        lastChild: { value: null },
        insertBefore: {
          value: function (c, l) {
            if (!c.nodeType) throw new TypeError('not a node');
            s();
          },
        },
        replaceChild: {
          value: function (c, l) {
            if (!c.nodeType) throw new TypeError('not a node');
            s();
          },
        },
        removeChild: {
          value: function (c) {
            if (!c.nodeType) throw new TypeError('not a node');
            o();
          },
        },
        removeChildren: { value: function () {} },
        childNodes: {
          get: function () {
            return (
              this._childNodes || (this._childNodes = new r()), this._childNodes
            );
          },
        },
      });
    },
  }),
  Xl = oe({
    'external/npm/node_modules/domino/lib/CharacterData.js'(t, e) {
      'use strict';
      e.exports = o;
      var n = G0(),
        r = tt(),
        i = Ap(),
        s = q0();
      function o() {
        n.call(this);
      }
      (o.prototype = Object.create(n.prototype, {
        substringData: {
          value: function (c, l) {
            if (arguments.length < 2)
              throw new TypeError('Not enough arguments');
            return (
              (c = c >>> 0),
              (l = l >>> 0),
              (c > this.data.length || c < 0 || l < 0) && r.IndexSizeError(),
              this.data.substring(c, c + l)
            );
          },
        },
        appendData: {
          value: function (c) {
            if (arguments.length < 1)
              throw new TypeError('Not enough arguments');
            this.data += String(c);
          },
        },
        insertData: {
          value: function (c, l) {
            return this.replaceData(c, 0, l);
          },
        },
        deleteData: {
          value: function (c, l) {
            return this.replaceData(c, l, '');
          },
        },
        replaceData: {
          value: function (c, l, u) {
            var d = this.data,
              m = d.length;
            (c = c >>> 0),
              (l = l >>> 0),
              (u = String(u)),
              (c > m || c < 0) && r.IndexSizeError(),
              c + l > m && (l = m - c);
            var E = d.substring(0, c),
              I = d.substring(c + l);
            this.data = E + u + I;
          },
        },
        isEqual: {
          value: function (c) {
            return this._data === c._data;
          },
        },
        length: {
          get: function () {
            return this.data.length;
          },
        },
      })),
        Object.defineProperties(o.prototype, i),
        Object.defineProperties(o.prototype, s);
    },
  }),
  W0 = oe({
    'external/npm/node_modules/domino/lib/Text.js'(t, e) {
      'use strict';
      e.exports = s;
      var n = tt(),
        r = yt(),
        i = Xl();
      function s(a, c) {
        i.call(this),
          (this.nodeType = r.TEXT_NODE),
          (this.ownerDocument = a),
          (this._data = c),
          (this._index = void 0);
      }
      var o = {
        get: function () {
          return this._data;
        },
        set: function (a) {
          a == null ? (a = '') : (a = String(a)),
            a !== this._data &&
              ((this._data = a),
              this.rooted && this.ownerDocument.mutateValue(this),
              this.parentNode &&
                this.parentNode._textchangehook &&
                this.parentNode._textchangehook(this));
        },
      };
      s.prototype = Object.create(i.prototype, {
        nodeName: { value: '#text' },
        nodeValue: o,
        textContent: o,
        innerText: o,
        data: {
          get: o.get,
          set: function (a) {
            o.set.call(this, a === null ? '' : String(a));
          },
        },
        splitText: {
          value: function (c) {
            (c > this._data.length || c < 0) && n.IndexSizeError();
            var l = this._data.substring(c),
              u = this.ownerDocument.createTextNode(l);
            this.data = this.data.substring(0, c);
            var d = this.parentNode;
            return d !== null && d.insertBefore(u, this.nextSibling), u;
          },
        },
        wholeText: {
          get: function () {
            for (
              var c = this.textContent, l = this.nextSibling;
              l && l.nodeType === r.TEXT_NODE;
              l = l.nextSibling
            )
              c += l.textContent;
            return c;
          },
        },
        replaceWholeText: { value: n.nyi },
        clone: {
          value: function () {
            return new s(this.ownerDocument, this._data);
          },
        },
      });
    },
  }),
  K0 = oe({
    'external/npm/node_modules/domino/lib/Comment.js'(t, e) {
      'use strict';
      e.exports = i;
      var n = yt(),
        r = Xl();
      function i(o, a) {
        r.call(this),
          (this.nodeType = n.COMMENT_NODE),
          (this.ownerDocument = o),
          (this._data = a);
      }
      var s = {
        get: function () {
          return this._data;
        },
        set: function (o) {
          o == null ? (o = '') : (o = String(o)),
            (this._data = o),
            this.rooted && this.ownerDocument.mutateValue(this);
        },
      };
      i.prototype = Object.create(r.prototype, {
        nodeName: { value: '#comment' },
        nodeValue: s,
        textContent: s,
        innerText: s,
        data: {
          get: s.get,
          set: function (o) {
            s.set.call(this, o === null ? '' : String(o));
          },
        },
        clone: {
          value: function () {
            return new i(this.ownerDocument, this._data);
          },
        },
      });
    },
  }),
  Q0 = oe({
    'external/npm/node_modules/domino/lib/DocumentFragment.js'(t, e) {
      'use strict';
      e.exports = c;
      var n = yt(),
        r = ds(),
        i = Ip(),
        s = Fo(),
        o = Np(),
        a = tt();
      function c(l) {
        i.call(this),
          (this.nodeType = n.DOCUMENT_FRAGMENT_NODE),
          (this.ownerDocument = l);
      }
      c.prototype = Object.create(i.prototype, {
        nodeName: { value: '#document-fragment' },
        nodeValue: {
          get: function () {
            return null;
          },
          set: function () {},
        },
        textContent: Object.getOwnPropertyDescriptor(
          s.prototype,
          'textContent'
        ),
        innerText: Object.getOwnPropertyDescriptor(s.prototype, 'innerText'),
        querySelector: {
          value: function (l) {
            var u = this.querySelectorAll(l);
            return u.length ? u[0] : null;
          },
        },
        querySelectorAll: {
          value: function (l) {
            var u = Object.create(this);
            (u.isHTML = !0),
              (u.getElementsByTagName = s.prototype.getElementsByTagName),
              (u.nextElement = Object.getOwnPropertyDescriptor(
                s.prototype,
                'firstElementChild'
              ).get);
            var d = o(l, u);
            return d.item ? d : new r(d);
          },
        },
        clone: {
          value: function () {
            return new c(this.ownerDocument);
          },
        },
        isEqual: {
          value: function (u) {
            return !0;
          },
        },
        innerHTML: {
          get: function () {
            return this.serialize();
          },
          set: a.nyi,
        },
        outerHTML: {
          get: function () {
            return this.serialize();
          },
          set: a.nyi,
        },
      });
    },
  }),
  Y0 = oe({
    'external/npm/node_modules/domino/lib/ProcessingInstruction.js'(t, e) {
      'use strict';
      e.exports = i;
      var n = yt(),
        r = Xl();
      function i(o, a, c) {
        r.call(this),
          (this.nodeType = n.PROCESSING_INSTRUCTION_NODE),
          (this.ownerDocument = o),
          (this.target = a),
          (this._data = c);
      }
      var s = {
        get: function () {
          return this._data;
        },
        set: function (o) {
          o == null ? (o = '') : (o = String(o)),
            (this._data = o),
            this.rooted && this.ownerDocument.mutateValue(this);
        },
      };
      i.prototype = Object.create(r.prototype, {
        nodeName: {
          get: function () {
            return this.target;
          },
        },
        nodeValue: s,
        textContent: s,
        innerText: s,
        data: {
          get: s.get,
          set: function (o) {
            s.set.call(this, o === null ? '' : String(o));
          },
        },
        clone: {
          value: function () {
            return new i(this.ownerDocument, this.target, this._data);
          },
        },
        isEqual: {
          value: function (a) {
            return this.target === a.target && this._data === a._data;
          },
        },
      });
    },
  }),
  Jl = oe({
    'external/npm/node_modules/domino/lib/NodeFilter.js'(t, e) {
      'use strict';
      var n = {
        FILTER_ACCEPT: 1,
        FILTER_REJECT: 2,
        FILTER_SKIP: 3,
        SHOW_ALL: 4294967295,
        SHOW_ELEMENT: 1,
        SHOW_ATTRIBUTE: 2,
        SHOW_TEXT: 4,
        SHOW_CDATA_SECTION: 8,
        SHOW_ENTITY_REFERENCE: 16,
        SHOW_ENTITY: 32,
        SHOW_PROCESSING_INSTRUCTION: 64,
        SHOW_COMMENT: 128,
        SHOW_DOCUMENT: 256,
        SHOW_DOCUMENT_TYPE: 512,
        SHOW_DOCUMENT_FRAGMENT: 1024,
        SHOW_NOTATION: 2048,
      };
      e.exports = n.constructor = n.prototype = n;
    },
  }),
  Z0 = oe({
    'external/npm/node_modules/domino/lib/NodeTraversal.js'(t, e) {
      'use strict';
      var n = (e.exports = {
        nextSkippingChildren: r,
        nextAncestorSibling: i,
        next: s,
        previous: a,
        deepLastChild: o,
      });
      function r(c, l) {
        return c === l
          ? null
          : c.nextSibling !== null
          ? c.nextSibling
          : i(c, l);
      }
      function i(c, l) {
        for (c = c.parentNode; c !== null; c = c.parentNode) {
          if (c === l) return null;
          if (c.nextSibling !== null) return c.nextSibling;
        }
        return null;
      }
      function s(c, l) {
        var u;
        return (
          (u = c.firstChild),
          u !== null
            ? u
            : c === l
            ? null
            : ((u = c.nextSibling), u !== null ? u : i(c, l))
        );
      }
      function o(c) {
        for (; c.lastChild; ) c = c.lastChild;
        return c;
      }
      function a(c, l) {
        var u;
        return (
          (u = c.previousSibling),
          u !== null ? o(u) : ((u = c.parentNode), u === l ? null : u)
        );
      }
    },
  }),
  kx = oe({
    'external/npm/node_modules/domino/lib/TreeWalker.js'(t, e) {
      'use strict';
      e.exports = u;
      var n = yt(),
        r = Jl(),
        i = Z0(),
        s = tt(),
        o = {
          first: 'firstChild',
          last: 'lastChild',
          next: 'firstChild',
          previous: 'lastChild',
        },
        a = {
          first: 'nextSibling',
          last: 'previousSibling',
          next: 'nextSibling',
          previous: 'previousSibling',
        };
      function c(d, m) {
        var E, I, M, j, O;
        for (I = d._currentNode[o[m]]; I !== null; ) {
          if (((j = d._internalFilter(I)), j === r.FILTER_ACCEPT))
            return (d._currentNode = I), I;
          if (j === r.FILTER_SKIP && ((E = I[o[m]]), E !== null)) {
            I = E;
            continue;
          }
          for (; I !== null; ) {
            if (((O = I[a[m]]), O !== null)) {
              I = O;
              break;
            }
            if (
              ((M = I.parentNode),
              M === null || M === d.root || M === d._currentNode)
            )
              return null;
            I = M;
          }
        }
        return null;
      }
      function l(d, m) {
        var E, I, M;
        if (((E = d._currentNode), E === d.root)) return null;
        for (;;) {
          for (M = E[a[m]]; M !== null; ) {
            if (((E = M), (I = d._internalFilter(E)), I === r.FILTER_ACCEPT))
              return (d._currentNode = E), E;
            (M = E[o[m]]),
              (I === r.FILTER_REJECT || M === null) && (M = E[a[m]]);
          }
          if (
            ((E = E.parentNode),
            E === null ||
              E === d.root ||
              d._internalFilter(E) === r.FILTER_ACCEPT)
          )
            return null;
        }
      }
      function u(d, m, E) {
        (!d || !d.nodeType) && s.NotSupportedError(),
          (this._root = d),
          (this._whatToShow = Number(m) || 0),
          (this._filter = E || null),
          (this._active = !1),
          (this._currentNode = d);
      }
      Object.defineProperties(u.prototype, {
        root: {
          get: function () {
            return this._root;
          },
        },
        whatToShow: {
          get: function () {
            return this._whatToShow;
          },
        },
        filter: {
          get: function () {
            return this._filter;
          },
        },
        currentNode: {
          get: function () {
            return this._currentNode;
          },
          set: function (m) {
            if (!(m instanceof n)) throw new TypeError('Not a Node');
            this._currentNode = m;
          },
        },
        _internalFilter: {
          value: function (m) {
            var E, I;
            if (
              (this._active && s.InvalidStateError(),
              !((1 << (m.nodeType - 1)) & this._whatToShow))
            )
              return r.FILTER_SKIP;
            if (((I = this._filter), I === null)) E = r.FILTER_ACCEPT;
            else {
              this._active = !0;
              try {
                typeof I == 'function' ? (E = I(m)) : (E = I.acceptNode(m));
              } finally {
                this._active = !1;
              }
            }
            return +E;
          },
        },
        parentNode: {
          value: function () {
            for (var m = this._currentNode; m !== this.root; ) {
              if (((m = m.parentNode), m === null)) return null;
              if (this._internalFilter(m) === r.FILTER_ACCEPT)
                return (this._currentNode = m), m;
            }
            return null;
          },
        },
        firstChild: {
          value: function () {
            return c(this, 'first');
          },
        },
        lastChild: {
          value: function () {
            return c(this, 'last');
          },
        },
        previousSibling: {
          value: function () {
            return l(this, 'previous');
          },
        },
        nextSibling: {
          value: function () {
            return l(this, 'next');
          },
        },
        previousNode: {
          value: function () {
            var m, E, I, M;
            for (m = this._currentNode; m !== this._root; ) {
              for (I = m.previousSibling; I; I = m.previousSibling)
                if (
                  ((m = I),
                  (E = this._internalFilter(m)),
                  E !== r.FILTER_REJECT)
                ) {
                  for (
                    M = m.lastChild;
                    M &&
                    ((m = M),
                    (E = this._internalFilter(m)),
                    E !== r.FILTER_REJECT);
                    M = m.lastChild
                  );
                  if (E === r.FILTER_ACCEPT) return (this._currentNode = m), m;
                }
              if (m === this.root || m.parentNode === null) return null;
              if (
                ((m = m.parentNode),
                this._internalFilter(m) === r.FILTER_ACCEPT)
              )
                return (this._currentNode = m), m;
            }
            return null;
          },
        },
        nextNode: {
          value: function () {
            var m, E, I, M;
            (m = this._currentNode), (E = r.FILTER_ACCEPT);
            e: for (;;) {
              for (I = m.firstChild; I; I = m.firstChild) {
                if (
                  ((m = I),
                  (E = this._internalFilter(m)),
                  E === r.FILTER_ACCEPT)
                )
                  return (this._currentNode = m), m;
                if (E === r.FILTER_REJECT) break;
              }
              for (
                M = i.nextSkippingChildren(m, this.root);
                M;
                M = i.nextSkippingChildren(m, this.root)
              ) {
                if (
                  ((m = M),
                  (E = this._internalFilter(m)),
                  E === r.FILTER_ACCEPT)
                )
                  return (this._currentNode = m), m;
                if (E === r.FILTER_SKIP) continue e;
              }
              return null;
            }
          },
        },
        toString: {
          value: function () {
            return '[object TreeWalker]';
          },
        },
      });
    },
  }),
  Lx = oe({
    'external/npm/node_modules/domino/lib/NodeIterator.js'(t, e) {
      'use strict';
      e.exports = c;
      var n = Jl(),
        r = Z0(),
        i = tt();
      function s(l, u, d) {
        return d ? r.next(l, u) : l === u ? null : r.previous(l, null);
      }
      function o(l, u) {
        for (; u; u = u.parentNode) if (l === u) return !0;
        return !1;
      }
      function a(l, u) {
        var d, m;
        for (d = l._referenceNode, m = l._pointerBeforeReferenceNode; ; ) {
          if (m === u) m = !m;
          else if (((d = s(d, l._root, u)), d === null)) return null;
          var E = l._internalFilter(d);
          if (E === n.FILTER_ACCEPT) break;
        }
        return (l._referenceNode = d), (l._pointerBeforeReferenceNode = m), d;
      }
      function c(l, u, d) {
        (!l || !l.nodeType) && i.NotSupportedError(),
          (this._root = l),
          (this._referenceNode = l),
          (this._pointerBeforeReferenceNode = !0),
          (this._whatToShow = Number(u) || 0),
          (this._filter = d || null),
          (this._active = !1),
          l.doc._attachNodeIterator(this);
      }
      Object.defineProperties(c.prototype, {
        root: {
          get: function () {
            return this._root;
          },
        },
        referenceNode: {
          get: function () {
            return this._referenceNode;
          },
        },
        pointerBeforeReferenceNode: {
          get: function () {
            return this._pointerBeforeReferenceNode;
          },
        },
        whatToShow: {
          get: function () {
            return this._whatToShow;
          },
        },
        filter: {
          get: function () {
            return this._filter;
          },
        },
        _internalFilter: {
          value: function (u) {
            var d, m;
            if (
              (this._active && i.InvalidStateError(),
              !((1 << (u.nodeType - 1)) & this._whatToShow))
            )
              return n.FILTER_SKIP;
            if (((m = this._filter), m === null)) d = n.FILTER_ACCEPT;
            else {
              this._active = !0;
              try {
                typeof m == 'function' ? (d = m(u)) : (d = m.acceptNode(u));
              } finally {
                this._active = !1;
              }
            }
            return +d;
          },
        },
        _preremove: {
          value: function (u) {
            if (!o(u, this._root) && o(u, this._referenceNode)) {
              if (this._pointerBeforeReferenceNode) {
                for (var d = u; d.lastChild; ) d = d.lastChild;
                if (((d = r.next(d, this.root)), d)) {
                  this._referenceNode = d;
                  return;
                }
                this._pointerBeforeReferenceNode = !1;
              }
              if (u.previousSibling === null)
                this._referenceNode = u.parentNode;
              else {
                this._referenceNode = u.previousSibling;
                var m;
                for (
                  m = this._referenceNode.lastChild;
                  m;
                  m = this._referenceNode.lastChild
                )
                  this._referenceNode = m;
              }
            }
          },
        },
        nextNode: {
          value: function () {
            return a(this, !0);
          },
        },
        previousNode: {
          value: function () {
            return a(this, !1);
          },
        },
        detach: { value: function () {} },
        toString: {
          value: function () {
            return '[object NodeIterator]';
          },
        },
      });
    },
  }),
  xp = oe({
    'external/npm/node_modules/domino/lib/URL.js'(t, e) {
      'use strict';
      e.exports = n;
      function n(r) {
        if (!r) return Object.create(n.prototype);
        this.url = r.replace(/^[ \t\n\r\f]+|[ \t\n\r\f]+$/g, '');
        var i = n.pattern.exec(this.url);
        if (i) {
          if ((i[2] && (this.scheme = i[2]), i[4])) {
            var s = i[4].match(n.userinfoPattern);
            if (
              (s &&
                ((this.username = s[1]),
                (this.password = s[3]),
                (i[4] = i[4].substring(s[0].length))),
              i[4].match(n.portPattern))
            ) {
              var o = i[4].lastIndexOf(':');
              (this.host = i[4].substring(0, o)),
                (this.port = i[4].substring(o + 1));
            } else this.host = i[4];
          }
          i[5] && (this.path = i[5]),
            i[6] && (this.query = i[7]),
            i[8] && (this.fragment = i[9]);
        }
      }
      (n.pattern =
        /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/),
        (n.userinfoPattern = /^([^@:]*)(:([^@]*))?@/),
        (n.portPattern = /:\d+$/),
        (n.authorityPattern = /^[^:\/?#]+:\/\//),
        (n.hierarchyPattern = /^[^:\/?#]+:\//),
        (n.percentEncode = function (i) {
          var s = i.charCodeAt(0);
          if (s < 256) return '%' + s.toString(16);
          throw Error("can't percent-encode codepoints > 255 yet");
        }),
        (n.prototype = {
          constructor: n,
          isAbsolute: function () {
            return !!this.scheme;
          },
          isAuthorityBased: function () {
            return n.authorityPattern.test(this.url);
          },
          isHierarchical: function () {
            return n.hierarchyPattern.test(this.url);
          },
          toString: function () {
            var r = '';
            return (
              this.scheme !== void 0 && (r += this.scheme + ':'),
              this.isAbsolute() &&
                ((r += '//'),
                (this.username || this.password) &&
                  ((r += this.username || ''),
                  this.password && (r += ':' + this.password),
                  (r += '@')),
                this.host && (r += this.host)),
              this.port !== void 0 && (r += ':' + this.port),
              this.path !== void 0 && (r += this.path),
              this.query !== void 0 && (r += '?' + this.query),
              this.fragment !== void 0 && (r += '#' + this.fragment),
              r
            );
          },
          resolve: function (r) {
            var i = this,
              s = new n(r),
              o = new n();
            return (
              s.scheme !== void 0
                ? ((o.scheme = s.scheme),
                  (o.username = s.username),
                  (o.password = s.password),
                  (o.host = s.host),
                  (o.port = s.port),
                  (o.path = c(s.path)),
                  (o.query = s.query))
                : ((o.scheme = i.scheme),
                  s.host !== void 0
                    ? ((o.username = s.username),
                      (o.password = s.password),
                      (o.host = s.host),
                      (o.port = s.port),
                      (o.path = c(s.path)),
                      (o.query = s.query))
                    : ((o.username = i.username),
                      (o.password = i.password),
                      (o.host = i.host),
                      (o.port = i.port),
                      s.path
                        ? (s.path.charAt(0) === '/'
                            ? (o.path = c(s.path))
                            : ((o.path = a(i.path, s.path)),
                              (o.path = c(o.path))),
                          (o.query = s.query))
                        : ((o.path = i.path),
                          s.query !== void 0
                            ? (o.query = s.query)
                            : (o.query = i.query)))),
              (o.fragment = s.fragment),
              o.toString()
            );
            function a(l, u) {
              if (i.host !== void 0 && !i.path) return '/' + u;
              var d = l.lastIndexOf('/');
              return d === -1 ? u : l.substring(0, d + 1) + u;
            }
            function c(l) {
              if (!l) return l;
              for (var u = ''; l.length > 0; ) {
                if (l === '.' || l === '..') {
                  l = '';
                  break;
                }
                var d = l.substring(0, 2),
                  m = l.substring(0, 3),
                  E = l.substring(0, 4);
                if (m === '../') l = l.substring(3);
                else if (d === './') l = l.substring(2);
                else if (m === '/./') l = '/' + l.substring(3);
                else if (d === '/.' && l.length === 2) l = '/';
                else if (E === '/../' || (m === '/..' && l.length === 3))
                  (l = '/' + l.substring(4)), (u = u.replace(/\/?[^\/]*$/, ''));
                else {
                  var I = l.match(/(\/?([^\/]*))/)[0];
                  (u += I), (l = l.substring(I.length));
                }
              }
              return u;
            }
          },
        });
    },
  }),
  Px = oe({
    'external/npm/node_modules/domino/lib/CustomEvent.js'(t, e) {
      'use strict';
      e.exports = r;
      var n = Po();
      function r(i, s) {
        n.call(this, i, s);
      }
      r.prototype = Object.create(n.prototype, { constructor: { value: r } });
    },
  }),
  X0 = oe({
    'external/npm/node_modules/domino/lib/events.js'(t, e) {
      'use strict';
      e.exports = {
        Event: Po(),
        UIEvent: F0(),
        MouseEvent: j0(),
        CustomEvent: Px(),
      };
    },
  }),
  Fx = oe({
    'external/npm/node_modules/domino/lib/style_parser.js'(t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.hyphenate = t.parse = void 0);
      function e(r) {
        let i = [],
          s = 0,
          o = 0,
          a = 0,
          c = 0,
          l = 0,
          u = null;
        for (; s < r.length; )
          switch (r.charCodeAt(s++)) {
            case 40:
              o++;
              break;
            case 41:
              o--;
              break;
            case 39:
              a === 0
                ? (a = 39)
                : a === 39 && r.charCodeAt(s - 1) !== 92 && (a = 0);
              break;
            case 34:
              a === 0
                ? (a = 34)
                : a === 34 && r.charCodeAt(s - 1) !== 92 && (a = 0);
              break;
            case 58:
              !u &&
                o === 0 &&
                a === 0 &&
                ((u = n(r.substring(l, s - 1).trim())), (c = s));
              break;
            case 59:
              if (u && c > 0 && o === 0 && a === 0) {
                let m = r.substring(c, s - 1).trim();
                i.push(u, m), (l = s), (c = 0), (u = null);
              }
              break;
          }
        if (u && c) {
          let d = r.slice(c).trim();
          i.push(u, d);
        }
        return i;
      }
      t.parse = e;
      function n(r) {
        return r
          .replace(/[a-z][A-Z]/g, (i) => i.charAt(0) + '-' + i.charAt(1))
          .toLowerCase();
      }
      t.hyphenate = n;
    },
  }),
  Rp = oe({
    'external/npm/node_modules/domino/lib/CSSStyleDeclaration.js'(t, e) {
      'use strict';
      var { parse: n } = Fx();
      e.exports = function (c) {
        let l = new i(c),
          u = {
            get: function (d, m) {
              return m in d ? d[m] : d.getPropertyValue(r(m));
            },
            has: function (d, m) {
              return !0;
            },
            set: function (d, m, E) {
              return m in d ? (d[m] = E) : d.setProperty(r(m), E ?? void 0), !0;
            },
          };
        return new Proxy(l, u);
      };
      function r(c) {
        return c.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      }
      function i(c) {
        this._element = c;
      }
      var s = '!important';
      function o(c) {
        let l = { property: {}, priority: {} };
        if (!c) return l;
        let u = n(c);
        if (u.length < 2) return l;
        for (let d = 0; d < u.length; d += 2) {
          let m = u[d],
            E = u[d + 1];
          E.endsWith(s) &&
            ((l.priority[m] = 'important'), (E = E.slice(0, -s.length).trim())),
            (l.property[m] = E);
        }
        return l;
      }
      var a = {};
      i.prototype = Object.create(Object.prototype, {
        _parsed: {
          get: function () {
            if (!this._parsedStyles || this.cssText !== this._lastParsedText) {
              var c = this.cssText;
              (this._parsedStyles = o(c)),
                (this._lastParsedText = c),
                delete this._names;
            }
            return this._parsedStyles;
          },
        },
        _serialize: {
          value: function () {
            var c = this._parsed,
              l = '';
            for (var u in c.property)
              l && (l += ' '),
                (l += u + ': ' + c.property[u]),
                c.priority[u] && (l += ' !' + c.priority[u]),
                (l += ';');
            (this.cssText = l), (this._lastParsedText = l), delete this._names;
          },
        },
        cssText: {
          get: function () {
            return this._element.getAttribute('style');
          },
          set: function (c) {
            this._element.setAttribute('style', c);
          },
        },
        length: {
          get: function () {
            return (
              this._names ||
                (this._names = Object.getOwnPropertyNames(
                  this._parsed.property
                )),
              this._names.length
            );
          },
        },
        item: {
          value: function (c) {
            return (
              this._names ||
                (this._names = Object.getOwnPropertyNames(
                  this._parsed.property
                )),
              this._names[c]
            );
          },
        },
        getPropertyValue: {
          value: function (c) {
            return (c = c.toLowerCase()), this._parsed.property[c] || '';
          },
        },
        getPropertyPriority: {
          value: function (c) {
            return (c = c.toLowerCase()), this._parsed.priority[c] || '';
          },
        },
        setProperty: {
          value: function (c, l, u) {
            if (
              ((c = c.toLowerCase()),
              l == null && (l = ''),
              u == null && (u = ''),
              l !== a && (l = '' + l),
              (l = l.trim()),
              l === '')
            ) {
              this.removeProperty(c);
              return;
            }
            if (!(u !== '' && u !== a && !/^important$/i.test(u))) {
              var d = this._parsed;
              if (l === a) {
                if (!d.property[c]) return;
                u !== '' ? (d.priority[c] = 'important') : delete d.priority[c];
              } else {
                if (l.indexOf(';') !== -1) return;
                var m = o(c + ':' + l);
                if (
                  Object.getOwnPropertyNames(m.property).length === 0 ||
                  Object.getOwnPropertyNames(m.priority).length !== 0
                )
                  return;
                for (var E in m.property)
                  (d.property[E] = m.property[E]),
                    u !== a &&
                      (u !== ''
                        ? (d.priority[E] = 'important')
                        : d.priority[E] && delete d.priority[E]);
              }
              this._serialize();
            }
          },
        },
        setPropertyValue: {
          value: function (c, l) {
            return this.setProperty(c, l, a);
          },
        },
        setPropertyPriority: {
          value: function (c, l) {
            return this.setProperty(c, a, l);
          },
        },
        removeProperty: {
          value: function (c) {
            c = c.toLowerCase();
            var l = this._parsed;
            c in l.property &&
              (delete l.property[c], delete l.priority[c], this._serialize());
          },
        },
      });
    },
  }),
  J0 = oe({
    'external/npm/node_modules/domino/lib/URLUtils.js'(t, e) {
      'use strict';
      var n = xp();
      e.exports = r;
      function r() {}
      (r.prototype = Object.create(Object.prototype, {
        _url: {
          get: function () {
            return new n(this.href);
          },
        },
        protocol: {
          get: function () {
            var i = this._url;
            return i && i.scheme ? i.scheme + ':' : ':';
          },
          set: function (i) {
            var s = this.href,
              o = new n(s);
            o.isAbsolute() &&
              ((i = i.replace(/:+$/, '')),
              (i = i.replace(/[^-+\.a-zA-Z0-9]/g, n.percentEncode)),
              i.length > 0 && ((o.scheme = i), (s = o.toString()))),
              (this.href = s);
          },
        },
        host: {
          get: function () {
            var i = this._url;
            return i.isAbsolute() && i.isAuthorityBased()
              ? i.host + (i.port ? ':' + i.port : '')
              : '';
          },
          set: function (i) {
            var s = this.href,
              o = new n(s);
            o.isAbsolute() &&
              o.isAuthorityBased() &&
              ((i = i.replace(
                /[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g,
                n.percentEncode
              )),
              i.length > 0 &&
                ((o.host = i), delete o.port, (s = o.toString()))),
              (this.href = s);
          },
        },
        hostname: {
          get: function () {
            var i = this._url;
            return i.isAbsolute() && i.isAuthorityBased() ? i.host : '';
          },
          set: function (i) {
            var s = this.href,
              o = new n(s);
            o.isAbsolute() &&
              o.isAuthorityBased() &&
              ((i = i.replace(/^\/+/, '')),
              (i = i.replace(
                /[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g,
                n.percentEncode
              )),
              i.length > 0 && ((o.host = i), (s = o.toString()))),
              (this.href = s);
          },
        },
        port: {
          get: function () {
            var i = this._url;
            return i.isAbsolute() && i.isAuthorityBased() && i.port !== void 0
              ? i.port
              : '';
          },
          set: function (i) {
            var s = this.href,
              o = new n(s);
            o.isAbsolute() &&
              o.isAuthorityBased() &&
              ((i = '' + i),
              (i = i.replace(/[^0-9].*$/, '')),
              (i = i.replace(/^0+/, '')),
              i.length === 0 && (i = '0'),
              parseInt(i, 10) <= 65535 && ((o.port = i), (s = o.toString()))),
              (this.href = s);
          },
        },
        pathname: {
          get: function () {
            var i = this._url;
            return i.isAbsolute() && i.isHierarchical() ? i.path : '';
          },
          set: function (i) {
            var s = this.href,
              o = new n(s);
            o.isAbsolute() &&
              o.isHierarchical() &&
              (i.charAt(0) !== '/' && (i = '/' + i),
              (i = i.replace(
                /[^-+\._~!$&'()*,;:=@\/a-zA-Z0-9]/g,
                n.percentEncode
              )),
              (o.path = i),
              (s = o.toString())),
              (this.href = s);
          },
        },
        search: {
          get: function () {
            var i = this._url;
            return i.isAbsolute() && i.isHierarchical() && i.query !== void 0
              ? '?' + i.query
              : '';
          },
          set: function (i) {
            var s = this.href,
              o = new n(s);
            o.isAbsolute() &&
              o.isHierarchical() &&
              (i.charAt(0) === '?' && (i = i.substring(1)),
              (i = i.replace(
                /[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g,
                n.percentEncode
              )),
              (o.query = i),
              (s = o.toString())),
              (this.href = s);
          },
        },
        hash: {
          get: function () {
            var i = this._url;
            return i == null || i.fragment == null || i.fragment === ''
              ? ''
              : '#' + i.fragment;
          },
          set: function (i) {
            var s = this.href,
              o = new n(s);
            i.charAt(0) === '#' && (i = i.substring(1)),
              (i = i.replace(
                /[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g,
                n.percentEncode
              )),
              (o.fragment = i),
              (s = o.toString()),
              (this.href = s);
          },
        },
        username: {
          get: function () {
            var i = this._url;
            return i.username || '';
          },
          set: function (i) {
            var s = this.href,
              o = new n(s);
            o.isAbsolute() &&
              ((i = i.replace(
                /[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\:]/g,
                n.percentEncode
              )),
              (o.username = i),
              (s = o.toString())),
              (this.href = s);
          },
        },
        password: {
          get: function () {
            var i = this._url;
            return i.password || '';
          },
          set: function (i) {
            var s = this.href,
              o = new n(s);
            o.isAbsolute() &&
              (i === ''
                ? (o.password = null)
                : ((i = i.replace(
                    /[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\]/g,
                    n.percentEncode
                  )),
                  (o.password = i)),
              (s = o.toString())),
              (this.href = s);
          },
        },
        origin: {
          get: function () {
            var i = this._url;
            if (i == null) return '';
            var s = function (o) {
              var a = [i.scheme, i.host, +i.port || o];
              return a[0] + '://' + a[1] + (a[2] === o ? '' : ':' + a[2]);
            };
            switch (i.scheme) {
              case 'ftp':
                return s(21);
              case 'gopher':
                return s(70);
              case 'http':
              case 'ws':
                return s(80);
              case 'https':
              case 'wss':
                return s(443);
              default:
                return i.scheme + '://';
            }
          },
        },
      })),
        (r._inherit = function (i) {
          Object.getOwnPropertyNames(r.prototype).forEach(function (s) {
            if (!(s === 'constructor' || s === 'href')) {
              var o = Object.getOwnPropertyDescriptor(r.prototype, s);
              Object.defineProperty(i, s, o);
            }
          });
        });
    },
  }),
  ew = oe({
    'external/npm/node_modules/domino/lib/defineElement.js'(t, e) {
      'use strict';
      var n = U0(),
        r = Cp().isApiWritable;
      e.exports = function (a, c, l, u) {
        var d = a.ctor;
        if (d) {
          var m = a.props || {};
          if (a.attributes)
            for (var E in a.attributes) {
              var I = a.attributes[E];
              (typeof I != 'object' || Array.isArray(I)) && (I = { type: I }),
                I.name || (I.name = E.toLowerCase()),
                (m[E] = n.property(I));
            }
          (m.constructor = { value: d, writable: r }),
            (d.prototype = Object.create((a.superclass || c).prototype, m)),
            a.events && o(d, a.events),
            (l[a.name] = d);
        } else d = c;
        return (
          (a.tags || (a.tag && [a.tag]) || []).forEach(function (M) {
            u[M] = d;
          }),
          d
        );
      };
      function i(a, c, l, u) {
        (this.body = a),
          (this.document = c),
          (this.form = l),
          (this.element = u);
      }
      i.prototype.build = function () {
        return () => {};
      };
      function s(a, c, l, u) {
        var d = a.ownerDocument || Object.create(null),
          m = a.form || Object.create(null);
        a[c] = new i(u, d, m, a).build();
      }
      function o(a, c) {
        var l = a.prototype;
        c.forEach(function (u) {
          Object.defineProperty(l, 'on' + u, {
            get: function () {
              return this._getEventHandler(u);
            },
            set: function (d) {
              this._setEventHandler(u, d);
            },
          }),
            n.registerChangeHandler(a, 'on' + u, s);
        });
      }
    },
  }),
  Op = oe({
    'external/npm/node_modules/domino/lib/htmlelts.js'(t) {
      'use strict';
      var e = yt(),
        n = Fo(),
        r = Rp(),
        i = tt(),
        s = J0(),
        o = ew(),
        a = (t.elements = {}),
        c = Object.create(null);
      t.createElement = function (D, _, S) {
        var b = c[_] || j;
        return new b(D, _, S);
      };
      function l(D) {
        return o(D, M, a, c);
      }
      function u(D) {
        return {
          get: function () {
            var _ = this._getattr(D);
            if (_ === null) return '';
            var S = this.doc._resolve(_);
            return S === null ? _ : S;
          },
          set: function (_) {
            this._setattr(D, _);
          },
        };
      }
      function d(D) {
        return {
          get: function () {
            var _ = this._getattr(D);
            return _ === null
              ? null
              : _.toLowerCase() === 'use-credentials'
              ? 'use-credentials'
              : 'anonymous';
          },
          set: function (_) {
            _ == null ? this.removeAttribute(D) : this._setattr(D, _);
          },
        };
      }
      var m = {
          type: [
            '',
            'no-referrer',
            'no-referrer-when-downgrade',
            'same-origin',
            'origin',
            'strict-origin',
            'origin-when-cross-origin',
            'strict-origin-when-cross-origin',
            'unsafe-url',
          ],
          missing: '',
        },
        E = {
          A: !0,
          LINK: !0,
          BUTTON: !0,
          INPUT: !0,
          SELECT: !0,
          TEXTAREA: !0,
          COMMAND: !0,
        },
        I = function (D, _, S) {
          M.call(this, D, _, S), (this._form = null);
        },
        M = (t.HTMLElement = l({
          superclass: n,
          name: 'HTMLElement',
          ctor: function (_, S, b) {
            n.call(this, _, S, i.NAMESPACE.HTML, b);
          },
          props: {
            dangerouslySetInnerHTML: {
              set: function (D) {
                this._innerHTML = D;
              },
            },
            innerHTML: {
              get: function () {
                return this.serialize();
              },
              set: function (D) {
                var _ = this.ownerDocument.implementation.mozHTMLParser(
                  this.ownerDocument._address,
                  this
                );
                _.parse(D === null ? '' : String(D), !0);
                for (
                  var S = this instanceof c.template ? this.content : this;
                  S.hasChildNodes();

                )
                  S.removeChild(S.firstChild);
                S.appendChild(_._asDocumentFragment());
              },
            },
            style: {
              get: function () {
                return this._style || (this._style = new r(this)), this._style;
              },
              set: function (D) {
                D == null && (D = ''), this._setattr('style', String(D));
              },
            },
            blur: { value: function () {} },
            focus: { value: function () {} },
            forceSpellCheck: { value: function () {} },
            click: {
              value: function () {
                if (!this._click_in_progress) {
                  this._click_in_progress = !0;
                  try {
                    this._pre_click_activation_steps &&
                      this._pre_click_activation_steps();
                    var D = this.ownerDocument.createEvent('MouseEvent');
                    D.initMouseEvent(
                      'click',
                      !0,
                      !0,
                      this.ownerDocument.defaultView,
                      1,
                      0,
                      0,
                      0,
                      0,
                      !1,
                      !1,
                      !1,
                      !1,
                      0,
                      null
                    );
                    var _ = this.dispatchEvent(D);
                    _
                      ? this._post_click_activation_steps &&
                        this._post_click_activation_steps(D)
                      : this._cancelled_activation_steps &&
                        this._cancelled_activation_steps();
                  } finally {
                    this._click_in_progress = !1;
                  }
                }
              },
            },
            submit: { value: i.nyi },
          },
          attributes: {
            title: String,
            lang: String,
            dir: { type: ['ltr', 'rtl', 'auto'], missing: '' },
            draggable: { type: ['true', 'false'], treatNullAsEmptyString: !0 },
            spellcheck: { type: ['true', 'false'], missing: '' },
            enterKeyHint: {
              type: [
                'enter',
                'done',
                'go',
                'next',
                'previous',
                'search',
                'send',
              ],
              missing: '',
            },
            autoCapitalize: {
              type: ['off', 'on', 'none', 'sentences', 'words', 'characters'],
              missing: '',
            },
            autoFocus: Boolean,
            accessKey: String,
            nonce: String,
            hidden: Boolean,
            translate: { type: ['no', 'yes'], missing: '' },
            tabIndex: {
              type: 'long',
              default: function () {
                return this.tagName in E || this.contentEditable ? 0 : -1;
              },
            },
          },
          events: [
            'abort',
            'canplay',
            'canplaythrough',
            'change',
            'click',
            'contextmenu',
            'cuechange',
            'dblclick',
            'drag',
            'dragend',
            'dragenter',
            'dragleave',
            'dragover',
            'dragstart',
            'drop',
            'durationchange',
            'emptied',
            'ended',
            'input',
            'invalid',
            'keydown',
            'keypress',
            'keyup',
            'loadeddata',
            'loadedmetadata',
            'loadstart',
            'mousedown',
            'mousemove',
            'mouseout',
            'mouseover',
            'mouseup',
            'mousewheel',
            'pause',
            'play',
            'playing',
            'progress',
            'ratechange',
            'readystatechange',
            'reset',
            'seeked',
            'seeking',
            'select',
            'show',
            'stalled',
            'submit',
            'suspend',
            'timeupdate',
            'volumechange',
            'waiting',
            'blur',
            'error',
            'focus',
            'load',
            'scroll',
          ],
        })),
        j = l({
          name: 'HTMLUnknownElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
        }),
        O = {
          form: {
            get: function () {
              return this._form;
            },
          },
        };
      l({
        tag: 'a',
        name: 'HTMLAnchorElement',
        ctor: function (_, S, b) {
          M.call(this, _, S, b);
        },
        props: {
          _post_click_activation_steps: {
            value: function (D) {
              this.href &&
                (this.ownerDocument.defaultView.location = this.href);
            },
          },
        },
        attributes: {
          href: u,
          ping: String,
          download: String,
          target: String,
          rel: String,
          media: String,
          hreflang: String,
          type: String,
          referrerPolicy: m,
          coords: String,
          charset: String,
          name: String,
          rev: String,
          shape: String,
        },
      }),
        s._inherit(c.a.prototype),
        l({
          tag: 'area',
          name: 'HTMLAreaElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: {
            alt: String,
            target: String,
            download: String,
            rel: String,
            media: String,
            href: u,
            hreflang: String,
            type: String,
            shape: String,
            coords: String,
            ping: String,
            referrerPolicy: m,
            noHref: Boolean,
          },
        }),
        s._inherit(c.area.prototype),
        l({
          tag: 'br',
          name: 'HTMLBRElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { clear: String },
        }),
        l({
          tag: 'base',
          name: 'HTMLBaseElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { target: String },
        }),
        l({
          tag: 'body',
          name: 'HTMLBodyElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          events: [
            'afterprint',
            'beforeprint',
            'beforeunload',
            'blur',
            'error',
            'focus',
            'hashchange',
            'load',
            'message',
            'offline',
            'online',
            'pagehide',
            'pageshow',
            'popstate',
            'resize',
            'scroll',
            'storage',
            'unload',
          ],
          attributes: {
            text: { type: String, treatNullAsEmptyString: !0 },
            link: { type: String, treatNullAsEmptyString: !0 },
            vLink: { type: String, treatNullAsEmptyString: !0 },
            aLink: { type: String, treatNullAsEmptyString: !0 },
            bgColor: { type: String, treatNullAsEmptyString: !0 },
            background: String,
          },
        }),
        l({
          tag: 'button',
          name: 'HTMLButtonElement',
          ctor: function (_, S, b) {
            I.call(this, _, S, b);
          },
          props: O,
          attributes: {
            name: String,
            value: String,
            disabled: Boolean,
            autofocus: Boolean,
            type: {
              type: ['submit', 'reset', 'button', 'menu'],
              missing: 'submit',
            },
            formTarget: String,
            formAction: u,
            formNoValidate: Boolean,
            formMethod: {
              type: ['get', 'post', 'dialog'],
              invalid: 'get',
              missing: '',
            },
            formEnctype: {
              type: [
                'application/x-www-form-urlencoded',
                'multipart/form-data',
                'text/plain',
              ],
              invalid: 'application/x-www-form-urlencoded',
              missing: '',
            },
          },
        }),
        l({
          tag: 'dl',
          name: 'HTMLDListElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { compact: Boolean },
        }),
        l({
          tag: 'data',
          name: 'HTMLDataElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { value: String },
        }),
        l({
          tag: 'datalist',
          name: 'HTMLDataListElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
        }),
        l({
          tag: 'details',
          name: 'HTMLDetailsElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { open: Boolean },
        }),
        l({
          tag: 'div',
          name: 'HTMLDivElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { align: String },
        }),
        l({
          tag: 'embed',
          name: 'HTMLEmbedElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: {
            src: u,
            type: String,
            width: String,
            height: String,
            align: String,
            name: String,
          },
        }),
        l({
          tag: 'fieldset',
          name: 'HTMLFieldSetElement',
          ctor: function (_, S, b) {
            I.call(this, _, S, b);
          },
          props: O,
          attributes: { disabled: Boolean, name: String },
        }),
        l({
          tag: 'form',
          name: 'HTMLFormElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: {
            action: String,
            autocomplete: { type: ['on', 'off'], missing: 'on' },
            name: String,
            acceptCharset: { name: 'accept-charset' },
            target: String,
            noValidate: Boolean,
            method: {
              type: ['get', 'post', 'dialog'],
              invalid: 'get',
              missing: 'get',
            },
            enctype: {
              type: [
                'application/x-www-form-urlencoded',
                'multipart/form-data',
                'text/plain',
              ],
              invalid: 'application/x-www-form-urlencoded',
              missing: 'application/x-www-form-urlencoded',
            },
            encoding: {
              name: 'enctype',
              type: [
                'application/x-www-form-urlencoded',
                'multipart/form-data',
                'text/plain',
              ],
              invalid: 'application/x-www-form-urlencoded',
              missing: 'application/x-www-form-urlencoded',
            },
          },
        }),
        l({
          tag: 'hr',
          name: 'HTMLHRElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: {
            align: String,
            color: String,
            noShade: Boolean,
            size: String,
            width: String,
          },
        }),
        l({
          tag: 'head',
          name: 'HTMLHeadElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
        }),
        l({
          tags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          name: 'HTMLHeadingElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { align: String },
        }),
        l({
          tag: 'html',
          name: 'HTMLHtmlElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { xmlns: u, version: String },
        }),
        l({
          tag: 'iframe',
          name: 'HTMLIFrameElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: {
            src: u,
            srcdoc: String,
            name: String,
            width: String,
            height: String,
            seamless: Boolean,
            allow: Boolean,
            allowFullscreen: Boolean,
            allowUserMedia: Boolean,
            allowPaymentRequest: Boolean,
            referrerPolicy: m,
            loading: { type: ['eager', 'lazy'], treatNullAsEmptyString: !0 },
            align: String,
            scrolling: String,
            frameBorder: String,
            longDesc: u,
            marginHeight: { type: String, treatNullAsEmptyString: !0 },
            marginWidth: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        l({
          tag: 'img',
          name: 'HTMLImageElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: {
            alt: String,
            src: u,
            srcset: String,
            crossOrigin: d,
            useMap: String,
            isMap: Boolean,
            sizes: String,
            height: { type: 'unsigned long', default: 0 },
            width: { type: 'unsigned long', default: 0 },
            referrerPolicy: m,
            loading: { type: ['eager', 'lazy'], missing: '' },
            name: String,
            lowsrc: u,
            align: String,
            hspace: { type: 'unsigned long', default: 0 },
            vspace: { type: 'unsigned long', default: 0 },
            longDesc: u,
            border: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        l({
          tag: 'input',
          name: 'HTMLInputElement',
          ctor: function (_, S, b) {
            I.call(this, _, S, b);
          },
          props: {
            form: O.form,
            _post_click_activation_steps: {
              value: function (D) {
                if (this.type === 'checkbox') this.checked = !this.checked;
                else if (this.type === 'radio')
                  for (
                    var _ = this.form.getElementsByName(this.name),
                      S = _.length - 1;
                    S >= 0;
                    S--
                  ) {
                    var b = _[S];
                    b.checked = b === this;
                  }
              },
            },
          },
          attributes: {
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            accept: String,
            alt: String,
            max: String,
            min: String,
            pattern: String,
            placeholder: String,
            step: String,
            dirName: String,
            defaultValue: { name: 'value' },
            multiple: Boolean,
            required: Boolean,
            readOnly: Boolean,
            checked: Boolean,
            value: String,
            src: u,
            defaultChecked: { name: 'checked', type: Boolean },
            size: { type: 'unsigned long', default: 20, min: 1, setmin: 1 },
            width: { type: 'unsigned long', min: 0, setmin: 0, default: 0 },
            height: { type: 'unsigned long', min: 0, setmin: 0, default: 0 },
            minLength: {
              type: 'unsigned long',
              min: 0,
              setmin: 0,
              default: -1,
            },
            maxLength: {
              type: 'unsigned long',
              min: 0,
              setmin: 0,
              default: -1,
            },
            autocomplete: String,
            type: {
              type: [
                'text',
                'hidden',
                'search',
                'tel',
                'url',
                'email',
                'password',
                'datetime',
                'date',
                'month',
                'week',
                'time',
                'datetime-local',
                'number',
                'range',
                'color',
                'checkbox',
                'radio',
                'file',
                'submit',
                'image',
                'reset',
                'button',
              ],
              missing: 'text',
            },
            formTarget: String,
            formNoValidate: Boolean,
            formMethod: { type: ['get', 'post'], invalid: 'get', missing: '' },
            formEnctype: {
              type: [
                'application/x-www-form-urlencoded',
                'multipart/form-data',
                'text/plain',
              ],
              invalid: 'application/x-www-form-urlencoded',
              missing: '',
            },
            inputMode: {
              type: [
                'verbatim',
                'latin',
                'latin-name',
                'latin-prose',
                'full-width-latin',
                'kana',
                'kana-name',
                'katakana',
                'numeric',
                'tel',
                'email',
                'url',
              ],
              missing: '',
            },
            align: String,
            useMap: String,
          },
        }),
        l({
          tag: 'keygen',
          name: 'HTMLKeygenElement',
          ctor: function (_, S, b) {
            I.call(this, _, S, b);
          },
          props: O,
          attributes: {
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            challenge: String,
            keytype: { type: ['rsa'], missing: '' },
          },
        }),
        l({
          tag: 'li',
          name: 'HTMLLIElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { value: { type: 'long', default: 0 }, type: String },
        }),
        l({
          tag: 'label',
          name: 'HTMLLabelElement',
          ctor: function (_, S, b) {
            I.call(this, _, S, b);
          },
          props: O,
          attributes: { htmlFor: { name: 'for', type: String } },
        }),
        l({
          tag: 'legend',
          name: 'HTMLLegendElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { align: String },
        }),
        l({
          tag: 'link',
          name: 'HTMLLinkElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: {
            href: u,
            rel: String,
            media: String,
            hreflang: String,
            type: String,
            crossOrigin: d,
            nonce: String,
            integrity: String,
            referrerPolicy: m,
            imageSizes: String,
            imageSrcset: String,
            charset: String,
            rev: String,
            target: String,
          },
        }),
        l({
          tag: 'map',
          name: 'HTMLMapElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { name: String },
        }),
        l({
          tag: 'menu',
          name: 'HTMLMenuElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: {
            type: { type: ['context', 'popup', 'toolbar'], missing: 'toolbar' },
            label: String,
            compact: Boolean,
          },
        }),
        l({
          tag: 'meta',
          name: 'HTMLMetaElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: {
            name: String,
            content: String,
            httpEquiv: { name: 'http-equiv', type: String },
            scheme: String,
          },
        }),
        l({
          tag: 'meter',
          name: 'HTMLMeterElement',
          ctor: function (_, S, b) {
            I.call(this, _, S, b);
          },
          props: O,
        }),
        l({
          tags: ['ins', 'del'],
          name: 'HTMLModElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { cite: u, dateTime: String },
        }),
        l({
          tag: 'ol',
          name: 'HTMLOListElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          props: {
            _numitems: {
              get: function () {
                var D = 0;
                return (
                  this.childNodes.forEach(function (_) {
                    _.nodeType === e.ELEMENT_NODE && _.tagName === 'LI' && D++;
                  }),
                  D
                );
              },
            },
          },
          attributes: {
            type: String,
            reversed: Boolean,
            start: {
              type: 'long',
              default: function () {
                return this.reversed ? this._numitems : 1;
              },
            },
            compact: Boolean,
          },
        }),
        l({
          tag: 'object',
          name: 'HTMLObjectElement',
          ctor: function (_, S, b) {
            I.call(this, _, S, b);
          },
          props: O,
          attributes: {
            data: u,
            type: String,
            name: String,
            useMap: String,
            typeMustMatch: Boolean,
            width: String,
            height: String,
            align: String,
            archive: String,
            code: String,
            declare: Boolean,
            hspace: { type: 'unsigned long', default: 0 },
            standby: String,
            vspace: { type: 'unsigned long', default: 0 },
            codeBase: u,
            codeType: String,
            border: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        l({
          tag: 'optgroup',
          name: 'HTMLOptGroupElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { disabled: Boolean, label: String },
        }),
        l({
          tag: 'option',
          name: 'HTMLOptionElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          props: {
            form: {
              get: function () {
                for (
                  var D = this.parentNode;
                  D && D.nodeType === e.ELEMENT_NODE;

                ) {
                  if (D.localName === 'select') return D.form;
                  D = D.parentNode;
                }
              },
            },
            value: {
              get: function () {
                return this._getattr('value') || this.text;
              },
              set: function (D) {
                this._setattr('value', D);
              },
            },
            text: {
              get: function () {
                return this.textContent.replace(/[ \t\n\f\r]+/g, ' ').trim();
              },
              set: function (D) {
                this.textContent = D;
              },
            },
          },
          attributes: {
            disabled: Boolean,
            defaultSelected: { name: 'selected', type: Boolean },
            label: String,
          },
        }),
        l({
          tag: 'output',
          name: 'HTMLOutputElement',
          ctor: function (_, S, b) {
            I.call(this, _, S, b);
          },
          props: O,
          attributes: { name: String },
        }),
        l({
          tag: 'p',
          name: 'HTMLParagraphElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { align: String },
        }),
        l({
          tag: 'param',
          name: 'HTMLParamElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: {
            name: String,
            value: String,
            type: String,
            valueType: String,
          },
        }),
        l({
          tags: ['pre', 'listing', 'xmp'],
          name: 'HTMLPreElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { width: { type: 'long', default: 0 } },
        }),
        l({
          tag: 'progress',
          name: 'HTMLProgressElement',
          ctor: function (_, S, b) {
            I.call(this, _, S, b);
          },
          props: O,
          attributes: { max: { type: Number, float: !0, default: 1, min: 0 } },
        }),
        l({
          tags: ['q', 'blockquote'],
          name: 'HTMLQuoteElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { cite: u },
        }),
        l({
          tag: 'script',
          name: 'HTMLScriptElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          props: {
            text: {
              get: function () {
                for (
                  var D = '', _ = 0, S = this.childNodes.length;
                  _ < S;
                  _++
                ) {
                  var b = this.childNodes[_];
                  b.nodeType === e.TEXT_NODE && (D += b._data);
                }
                return D;
              },
              set: function (D) {
                this.removeChildren(),
                  D !== null &&
                    D !== '' &&
                    this.appendChild(this.ownerDocument.createTextNode(D));
              },
            },
          },
          attributes: {
            src: u,
            type: String,
            charset: String,
            referrerPolicy: m,
            defer: Boolean,
            async: Boolean,
            nomodule: Boolean,
            crossOrigin: d,
            nonce: String,
            integrity: String,
          },
        }),
        l({
          tag: 'select',
          name: 'HTMLSelectElement',
          ctor: function (_, S, b) {
            I.call(this, _, S, b);
          },
          props: {
            form: O.form,
            options: {
              get: function () {
                return this.getElementsByTagName('option');
              },
            },
          },
          attributes: {
            autocomplete: String,
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            multiple: Boolean,
            required: Boolean,
            size: { type: 'unsigned long', default: 0 },
          },
        }),
        l({
          tag: 'span',
          name: 'HTMLSpanElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
        }),
        l({
          tag: 'style',
          name: 'HTMLStyleElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { media: String, type: String, scoped: Boolean },
        }),
        l({
          tag: 'caption',
          name: 'HTMLTableCaptionElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { align: String },
        }),
        l({
          name: 'HTMLTableCellElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: {
            colSpan: { type: 'unsigned long', default: 1 },
            rowSpan: { type: 'unsigned long', default: 1 },
            scope: {
              type: ['row', 'col', 'rowgroup', 'colgroup'],
              missing: '',
            },
            abbr: String,
            align: String,
            axis: String,
            height: String,
            width: String,
            ch: { name: 'char', type: String },
            chOff: { name: 'charoff', type: String },
            noWrap: Boolean,
            vAlign: String,
            bgColor: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        l({
          tags: ['col', 'colgroup'],
          name: 'HTMLTableColElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: {
            span: {
              type: 'limited unsigned long with fallback',
              default: 1,
              min: 1,
            },
            align: String,
            ch: { name: 'char', type: String },
            chOff: { name: 'charoff', type: String },
            vAlign: String,
            width: String,
          },
        }),
        l({
          tag: 'table',
          name: 'HTMLTableElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          props: {
            rows: {
              get: function () {
                return this.getElementsByTagName('tr');
              },
            },
          },
          attributes: {
            align: String,
            border: String,
            frame: String,
            rules: String,
            summary: String,
            width: String,
            bgColor: { type: String, treatNullAsEmptyString: !0 },
            cellPadding: { type: String, treatNullAsEmptyString: !0 },
            cellSpacing: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        l({
          tag: 'template',
          name: 'HTMLTemplateElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b),
              (this._contentFragment = _._templateDoc.createDocumentFragment());
          },
          props: {
            content: {
              get: function () {
                return this._contentFragment;
              },
            },
            serialize: {
              value: function () {
                return this.content.serialize();
              },
            },
          },
        }),
        l({
          tag: 'tr',
          name: 'HTMLTableRowElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          props: {
            cells: {
              get: function () {
                return this.querySelectorAll('td,th');
              },
            },
          },
          attributes: {
            align: String,
            ch: { name: 'char', type: String },
            chOff: { name: 'charoff', type: String },
            vAlign: String,
            bgColor: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        l({
          tags: ['thead', 'tfoot', 'tbody'],
          name: 'HTMLTableSectionElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          props: {
            rows: {
              get: function () {
                return this.getElementsByTagName('tr');
              },
            },
          },
          attributes: {
            align: String,
            ch: { name: 'char', type: String },
            chOff: { name: 'charoff', type: String },
            vAlign: String,
          },
        }),
        l({
          tag: 'textarea',
          name: 'HTMLTextAreaElement',
          ctor: function (_, S, b) {
            I.call(this, _, S, b);
          },
          props: {
            form: O.form,
            type: {
              get: function () {
                return 'textarea';
              },
            },
            defaultValue: {
              get: function () {
                return this.textContent;
              },
              set: function (D) {
                this.textContent = D;
              },
            },
            value: {
              get: function () {
                return this.defaultValue;
              },
              set: function (D) {
                this.defaultValue = D;
              },
            },
            textLength: {
              get: function () {
                return this.value.length;
              },
            },
          },
          attributes: {
            autocomplete: String,
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            placeholder: String,
            wrap: String,
            dirName: String,
            required: Boolean,
            readOnly: Boolean,
            rows: { type: 'limited unsigned long with fallback', default: 2 },
            cols: { type: 'limited unsigned long with fallback', default: 20 },
            maxLength: {
              type: 'unsigned long',
              min: 0,
              setmin: 0,
              default: -1,
            },
            minLength: {
              type: 'unsigned long',
              min: 0,
              setmin: 0,
              default: -1,
            },
            inputMode: {
              type: [
                'verbatim',
                'latin',
                'latin-name',
                'latin-prose',
                'full-width-latin',
                'kana',
                'kana-name',
                'katakana',
                'numeric',
                'tel',
                'email',
                'url',
              ],
              missing: '',
            },
          },
        }),
        l({
          tag: 'time',
          name: 'HTMLTimeElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { dateTime: String, pubDate: Boolean },
        }),
        l({
          tag: 'title',
          name: 'HTMLTitleElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          props: {
            text: {
              get: function () {
                return this.textContent;
              },
            },
          },
        }),
        l({
          tag: 'ul',
          name: 'HTMLUListElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { type: String, compact: Boolean },
        }),
        l({
          name: 'HTMLMediaElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: {
            src: u,
            crossOrigin: d,
            preload: {
              type: ['metadata', 'none', 'auto', { value: '', alias: 'auto' }],
              missing: 'auto',
            },
            loop: Boolean,
            autoplay: Boolean,
            mediaGroup: String,
            controls: Boolean,
            defaultMuted: { name: 'muted', type: Boolean },
          },
        }),
        l({
          name: 'HTMLAudioElement',
          tag: 'audio',
          superclass: a.HTMLMediaElement,
          ctor: function (_, S, b) {
            a.HTMLMediaElement.call(this, _, S, b);
          },
        }),
        l({
          name: 'HTMLVideoElement',
          tag: 'video',
          superclass: a.HTMLMediaElement,
          ctor: function (_, S, b) {
            a.HTMLMediaElement.call(this, _, S, b);
          },
          attributes: {
            poster: u,
            width: { type: 'unsigned long', min: 0, default: 0 },
            height: { type: 'unsigned long', min: 0, default: 0 },
          },
        }),
        l({
          tag: 'td',
          name: 'HTMLTableDataCellElement',
          superclass: a.HTMLTableCellElement,
          ctor: function (_, S, b) {
            a.HTMLTableCellElement.call(this, _, S, b);
          },
        }),
        l({
          tag: 'th',
          name: 'HTMLTableHeaderCellElement',
          superclass: a.HTMLTableCellElement,
          ctor: function (_, S, b) {
            a.HTMLTableCellElement.call(this, _, S, b);
          },
        }),
        l({
          tag: 'frameset',
          name: 'HTMLFrameSetElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
        }),
        l({
          tag: 'frame',
          name: 'HTMLFrameElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
        }),
        l({
          tag: 'canvas',
          name: 'HTMLCanvasElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          props: {
            getContext: { value: i.nyi },
            probablySupportsContext: { value: i.nyi },
            setContext: { value: i.nyi },
            transferControlToProxy: { value: i.nyi },
            toDataURL: { value: i.nyi },
            toBlob: { value: i.nyi },
          },
          attributes: {
            width: { type: 'unsigned long', default: 300 },
            height: { type: 'unsigned long', default: 150 },
          },
        }),
        l({
          tag: 'dialog',
          name: 'HTMLDialogElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          props: {
            show: { value: i.nyi },
            showModal: { value: i.nyi },
            close: { value: i.nyi },
          },
          attributes: { open: Boolean, returnValue: String },
        }),
        l({
          tag: 'menuitem',
          name: 'HTMLMenuItemElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          props: {
            _label: {
              get: function () {
                var D = this._getattr('label');
                return D !== null && D !== ''
                  ? D
                  : ((D = this.textContent),
                    D.replace(/[ \t\n\f\r]+/g, ' ').trim());
              },
            },
            label: {
              get: function () {
                var D = this._getattr('label');
                return D !== null ? D : this._label;
              },
              set: function (D) {
                this._setattr('label', D);
              },
            },
          },
          attributes: {
            type: {
              type: ['command', 'checkbox', 'radio'],
              missing: 'command',
            },
            icon: u,
            disabled: Boolean,
            checked: Boolean,
            radiogroup: String,
            default: Boolean,
          },
        }),
        l({
          tag: 'source',
          name: 'HTMLSourceElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: {
            srcset: String,
            sizes: String,
            media: String,
            src: u,
            type: String,
            width: String,
            height: String,
          },
        }),
        l({
          tag: 'track',
          name: 'HTMLTrackElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: {
            src: u,
            srclang: String,
            label: String,
            default: Boolean,
            kind: {
              type: [
                'subtitles',
                'captions',
                'descriptions',
                'chapters',
                'metadata',
              ],
              missing: 'subtitles',
              invalid: 'metadata',
            },
          },
          props: {
            NONE: {
              get: function () {
                return 0;
              },
            },
            LOADING: {
              get: function () {
                return 1;
              },
            },
            LOADED: {
              get: function () {
                return 2;
              },
            },
            ERROR: {
              get: function () {
                return 3;
              },
            },
            readyState: { get: i.nyi },
            track: { get: i.nyi },
          },
        }),
        l({
          tag: 'font',
          name: 'HTMLFontElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: {
            color: { type: String, treatNullAsEmptyString: !0 },
            face: { type: String },
            size: { type: String },
          },
        }),
        l({
          tag: 'dir',
          name: 'HTMLDirectoryElement',
          ctor: function (_, S, b) {
            M.call(this, _, S, b);
          },
          attributes: { compact: Boolean },
        }),
        l({
          tags: [
            'abbr',
            'address',
            'article',
            'aside',
            'b',
            'bdi',
            'bdo',
            'cite',
            'content',
            'code',
            'dd',
            'dfn',
            'dt',
            'em',
            'figcaption',
            'figure',
            'footer',
            'header',
            'hgroup',
            'i',
            'kbd',
            'main',
            'mark',
            'nav',
            'noscript',
            'rb',
            'rp',
            'rt',
            'rtc',
            'ruby',
            's',
            'samp',
            'section',
            'small',
            'strong',
            'sub',
            'summary',
            'sup',
            'u',
            'var',
            'wbr',
            'acronym',
            'basefont',
            'big',
            'center',
            'nobr',
            'noembed',
            'noframes',
            'plaintext',
            'strike',
            'tt',
          ],
        });
    },
  }),
  tw = oe({
    'external/npm/node_modules/domino/lib/svg.js'(t) {
      'use strict';
      var e = Fo(),
        n = ew(),
        r = tt(),
        i = Rp(),
        s = (t.elements = {}),
        o = Object.create(null);
      t.createElement = function (l, u, d) {
        var m = o[u] || c;
        return new m(l, u, d);
      };
      function a(l) {
        return n(l, c, s, o);
      }
      var c = a({
        superclass: e,
        name: 'SVGElement',
        ctor: function (u, d, m) {
          e.call(this, u, d, r.NAMESPACE.SVG, m);
        },
        props: {
          style: {
            get: function () {
              return this._style || (this._style = new i(this)), this._style;
            },
          },
        },
      });
      a({
        name: 'SVGSVGElement',
        ctor: function (u, d, m) {
          c.call(this, u, d, m);
        },
        tag: 'svg',
        props: {
          createSVGRect: {
            value: function () {
              return t.createElement(this.ownerDocument, 'rect', null);
            },
          },
        },
      }),
        a({
          tags: [
            'a',
            'altGlyph',
            'altGlyphDef',
            'altGlyphItem',
            'animate',
            'animateColor',
            'animateMotion',
            'animateTransform',
            'circle',
            'clipPath',
            'color-profile',
            'cursor',
            'defs',
            'desc',
            'ellipse',
            'feBlend',
            'feColorMatrix',
            'feComponentTransfer',
            'feComposite',
            'feConvolveMatrix',
            'feDiffuseLighting',
            'feDisplacementMap',
            'feDistantLight',
            'feFlood',
            'feFuncA',
            'feFuncB',
            'feFuncG',
            'feFuncR',
            'feGaussianBlur',
            'feImage',
            'feMerge',
            'feMergeNode',
            'feMorphology',
            'feOffset',
            'fePointLight',
            'feSpecularLighting',
            'feSpotLight',
            'feTile',
            'feTurbulence',
            'filter',
            'font',
            'font-face',
            'font-face-format',
            'font-face-name',
            'font-face-src',
            'font-face-uri',
            'foreignObject',
            'g',
            'glyph',
            'glyphRef',
            'hkern',
            'image',
            'line',
            'linearGradient',
            'marker',
            'mask',
            'metadata',
            'missing-glyph',
            'mpath',
            'path',
            'pattern',
            'polygon',
            'polyline',
            'radialGradient',
            'rect',
            'script',
            'set',
            'stop',
            'style',
            'switch',
            'symbol',
            'text',
            'textPath',
            'title',
            'tref',
            'tspan',
            'use',
            'view',
            'vkern',
          ],
        });
    },
  }),
  jx = oe({
    'external/npm/node_modules/domino/lib/MutationConstants.js'(t, e) {
      'use strict';
      e.exports = {
        VALUE: 1,
        ATTR: 2,
        REMOVE_ATTR: 3,
        REMOVE: 4,
        MOVE: 5,
        INSERT: 6,
      };
    },
  }),
  kp = oe({
    'external/npm/node_modules/domino/lib/Document.js'(t, e) {
      'use strict';
      e.exports = q;
      var n = yt(),
        r = ds(),
        i = Ip(),
        s = Fo(),
        o = W0(),
        a = K0(),
        c = Po(),
        l = Q0(),
        u = Y0(),
        d = eu(),
        m = kx(),
        E = Lx(),
        I = Jl(),
        M = xp(),
        j = Np(),
        O = X0(),
        D = Mp(),
        _ = Op(),
        S = tw(),
        b = tt(),
        ne = jx(),
        se = b.NAMESPACE,
        Ie = Cp().isApiWritable;
      function q(T, k) {
        i.call(this),
          (this.nodeType = n.DOCUMENT_NODE),
          (this.isHTML = T),
          (this._address = k || 'about:blank'),
          (this.readyState = 'loading'),
          (this.implementation = new d(this)),
          (this.ownerDocument = null),
          (this._contentType = T ? 'text/html' : 'application/xml'),
          (this.doctype = null),
          (this.documentElement = null),
          (this._templateDocCache = null),
          (this._nodeIterators = null),
          (this._nid = 1),
          (this._nextnid = 2),
          (this._nodes = [null, this]),
          (this.byId = Object.create(null)),
          (this.modclock = 0);
      }
      var R = {
          event: 'Event',
          customevent: 'CustomEvent',
          uievent: 'UIEvent',
          mouseevent: 'MouseEvent',
        },
        F = {
          events: 'event',
          htmlevents: 'event',
          mouseevents: 'mouseevent',
          mutationevents: 'mutationevent',
          uievents: 'uievent',
        },
        Y = function (T, k, $) {
          return {
            get: function () {
              var Te = T.call(this);
              return Te ? Te[k] : $;
            },
            set: function (Te) {
              var vt = T.call(this);
              vt && (vt[k] = Te);
            },
          };
        };
      function y(T, k) {
        var $, Te, vt;
        return (
          T === '' && (T = null),
          D.isValidQName(k) || b.InvalidCharacterError(),
          ($ = null),
          (Te = k),
          (vt = k.indexOf(':')),
          vt >= 0 && (($ = k.substring(0, vt)), (Te = k.substring(vt + 1))),
          $ !== null && T === null && b.NamespaceError(),
          $ === 'xml' && T !== se.XML && b.NamespaceError(),
          ($ === 'xmlns' || k === 'xmlns') &&
            T !== se.XMLNS &&
            b.NamespaceError(),
          T === se.XMLNS &&
            !($ === 'xmlns' || k === 'xmlns') &&
            b.NamespaceError(),
          { namespace: T, prefix: $, localName: Te }
        );
      }
      q.prototype = Object.create(i.prototype, {
        _setMutationHandler: {
          value: function (T) {
            this.mutationHandler = T;
          },
        },
        _dispatchRendererEvent: {
          value: function (T, k, $) {
            var Te = this._nodes[T];
            Te && Te._dispatchEvent(new c(k, $), !0);
          },
        },
        nodeName: { value: '#document' },
        nodeValue: {
          get: function () {
            return null;
          },
          set: function () {},
        },
        documentURI: {
          get: function () {
            return this._address;
          },
          set: b.nyi,
        },
        compatMode: {
          get: function () {
            return this._quirks ? 'BackCompat' : 'CSS1Compat';
          },
        },
        createTextNode: {
          value: function (T) {
            return new o(this, String(T));
          },
        },
        createComment: {
          value: function (T) {
            return new a(this, T);
          },
        },
        createDocumentFragment: {
          value: function () {
            return new l(this);
          },
        },
        createProcessingInstruction: {
          value: function (T, k) {
            return (
              (!D.isValidName(T) || k.indexOf('?>') !== -1) &&
                b.InvalidCharacterError(),
              new u(this, T, k)
            );
          },
        },
        createAttribute: {
          value: function (T) {
            return (
              (T = String(T)),
              D.isValidName(T) || b.InvalidCharacterError(),
              this.isHTML && (T = b.toASCIILowerCase(T)),
              new s._Attr(null, T, null, null, '')
            );
          },
        },
        createAttributeNS: {
          value: function (T, k) {
            (T = T == null || T === '' ? null : String(T)), (k = String(k));
            var $ = y(T, k);
            return new s._Attr(null, $.localName, $.prefix, $.namespace, '');
          },
        },
        createElement: {
          value: function (T) {
            return (
              (T = String(T)),
              D.isValidName(T) || b.InvalidCharacterError(),
              this.isHTML
                ? (/[A-Z]/.test(T) && (T = b.toASCIILowerCase(T)),
                  _.createElement(this, T, null))
                : this.contentType === 'application/xhtml+xml'
                ? _.createElement(this, T, null)
                : new s(this, T, null, null)
            );
          },
          writable: Ie,
        },
        createElementNS: {
          value: function (T, k) {
            (T = T == null || T === '' ? null : String(T)), (k = String(k));
            var $ = y(T, k);
            return this._createElementNS($.localName, $.namespace, $.prefix);
          },
          writable: Ie,
        },
        _createElementNS: {
          value: function (T, k, $) {
            return k === se.HTML
              ? _.createElement(this, T, $)
              : k === se.SVG
              ? S.createElement(this, T, $)
              : new s(this, T, k, $);
          },
        },
        createEvent: {
          value: function (k) {
            k = k.toLowerCase();
            var $ = F[k] || k,
              Te = O[R[$]];
            if (Te) {
              var vt = new Te();
              return (vt._initialized = !1), vt;
            } else b.NotSupportedError();
          },
        },
        createTreeWalker: {
          value: function (T, k, $) {
            if (!T) throw new TypeError('root argument is required');
            if (!(T instanceof n)) throw new TypeError('root not a node');
            return (
              (k = k === void 0 ? I.SHOW_ALL : +k),
              ($ = $ === void 0 ? null : $),
              new m(T, k, $)
            );
          },
        },
        createNodeIterator: {
          value: function (T, k, $) {
            if (!T) throw new TypeError('root argument is required');
            if (!(T instanceof n)) throw new TypeError('root not a node');
            return (
              (k = k === void 0 ? I.SHOW_ALL : +k),
              ($ = $ === void 0 ? null : $),
              new E(T, k, $)
            );
          },
        },
        _attachNodeIterator: {
          value: function (T) {
            this._nodeIterators || (this._nodeIterators = []),
              this._nodeIterators.push(T);
          },
        },
        _detachNodeIterator: {
          value: function (T) {
            var k = this._nodeIterators.indexOf(T);
            this._nodeIterators.splice(k, 1);
          },
        },
        _preremoveNodeIterators: {
          value: function (T) {
            this._nodeIterators &&
              this._nodeIterators.forEach(function (k) {
                k._preremove(T);
              });
          },
        },
        _updateDocTypeElement: {
          value: function () {
            this.doctype = this.documentElement = null;
            for (var k = this.firstChild; k !== null; k = k.nextSibling)
              k.nodeType === n.DOCUMENT_TYPE_NODE
                ? (this.doctype = k)
                : k.nodeType === n.ELEMENT_NODE && (this.documentElement = k);
          },
        },
        insertBefore: {
          value: function (k, $) {
            return (
              n.prototype.insertBefore.call(this, k, $),
              this._updateDocTypeElement(),
              k
            );
          },
        },
        replaceChild: {
          value: function (k, $) {
            return (
              n.prototype.replaceChild.call(this, k, $),
              this._updateDocTypeElement(),
              $
            );
          },
        },
        removeChild: {
          value: function (k) {
            return (
              n.prototype.removeChild.call(this, k),
              this._updateDocTypeElement(),
              k
            );
          },
        },
        getElementById: {
          value: function (T) {
            var k = this.byId[T];
            return k ? (k instanceof pe ? k.getFirst() : k) : null;
          },
        },
        _hasMultipleElementsWithId: {
          value: function (T) {
            return this.byId[T] instanceof pe;
          },
        },
        getElementsByName: { value: s.prototype.getElementsByName },
        getElementsByTagName: { value: s.prototype.getElementsByTagName },
        getElementsByTagNameNS: { value: s.prototype.getElementsByTagNameNS },
        getElementsByClassName: { value: s.prototype.getElementsByClassName },
        adoptNode: {
          value: function (k) {
            return (
              k.nodeType === n.DOCUMENT_NODE && b.NotSupportedError(),
              k.nodeType === n.ATTRIBUTE_NODE ||
                (k.parentNode && k.parentNode.removeChild(k),
                k.ownerDocument !== this && Q(k, this)),
              k
            );
          },
        },
        importNode: {
          value: function (k, $) {
            return this.adoptNode(k.cloneNode($));
          },
          writable: Ie,
        },
        origin: {
          get: function () {
            return null;
          },
        },
        characterSet: {
          get: function () {
            return 'UTF-8';
          },
        },
        contentType: {
          get: function () {
            return this._contentType;
          },
        },
        URL: {
          get: function () {
            return this._address;
          },
        },
        domain: { get: b.nyi, set: b.nyi },
        referrer: { get: b.nyi },
        cookie: { get: b.nyi, set: b.nyi },
        lastModified: { get: b.nyi },
        location: {
          get: function () {
            return this.defaultView ? this.defaultView.location : null;
          },
          set: b.nyi,
        },
        _titleElement: {
          get: function () {
            return this.getElementsByTagName('title').item(0) || null;
          },
        },
        title: {
          get: function () {
            var T = this._titleElement,
              k = T ? T.textContent : '';
            return k.replace(/[ \t\n\r\f]+/g, ' ').replace(/(^ )|( $)/g, '');
          },
          set: function (T) {
            var k = this._titleElement,
              $ = this.head;
            (!k && !$) ||
              (k || ((k = this.createElement('title')), $.appendChild(k)),
              (k.textContent = T));
          },
        },
        dir: Y(
          function () {
            var T = this.documentElement;
            if (T && T.tagName === 'HTML') return T;
          },
          'dir',
          ''
        ),
        fgColor: Y(
          function () {
            return this.body;
          },
          'text',
          ''
        ),
        linkColor: Y(
          function () {
            return this.body;
          },
          'link',
          ''
        ),
        vlinkColor: Y(
          function () {
            return this.body;
          },
          'vLink',
          ''
        ),
        alinkColor: Y(
          function () {
            return this.body;
          },
          'aLink',
          ''
        ),
        bgColor: Y(
          function () {
            return this.body;
          },
          'bgColor',
          ''
        ),
        charset: {
          get: function () {
            return this.characterSet;
          },
        },
        inputEncoding: {
          get: function () {
            return this.characterSet;
          },
        },
        scrollingElement: {
          get: function () {
            return this._quirks ? this.body : this.documentElement;
          },
        },
        body: {
          get: function () {
            return p(this.documentElement, 'body');
          },
          set: b.nyi,
        },
        head: {
          get: function () {
            return p(this.documentElement, 'head');
          },
        },
        images: { get: b.nyi },
        embeds: { get: b.nyi },
        plugins: { get: b.nyi },
        links: { get: b.nyi },
        forms: { get: b.nyi },
        scripts: { get: b.nyi },
        applets: {
          get: function () {
            return [];
          },
        },
        activeElement: {
          get: function () {
            return null;
          },
        },
        innerHTML: {
          get: function () {
            return this.serialize();
          },
          set: b.nyi,
        },
        outerHTML: {
          get: function () {
            return this.serialize();
          },
          set: b.nyi,
        },
        write: {
          value: function (T) {
            if ((this.isHTML || b.InvalidStateError(), !!this._parser)) {
              this._parser;
              var k = arguments.join('');
              this._parser.parse(k);
            }
          },
        },
        writeln: {
          value: function (k) {
            this.write(
              Array.prototype.join.call(arguments, '') +
                `
`
            );
          },
        },
        open: {
          value: function () {
            this.documentElement = null;
          },
        },
        close: {
          value: function () {
            (this.readyState = 'interactive'),
              this._dispatchEvent(new c('readystatechange'), !0),
              this._dispatchEvent(new c('DOMContentLoaded'), !0),
              (this.readyState = 'complete'),
              this._dispatchEvent(new c('readystatechange'), !0),
              this.defaultView &&
                this.defaultView._dispatchEvent(new c('load'), !0);
          },
        },
        clone: {
          value: function () {
            var k = new q(this.isHTML, this._address);
            return (
              (k._quirks = this._quirks),
              (k._contentType = this._contentType),
              k
            );
          },
        },
        cloneNode: {
          value: function (k) {
            var $ = n.prototype.cloneNode.call(this, !1);
            if (k)
              for (var Te = this.firstChild; Te !== null; Te = Te.nextSibling)
                $._appendChild($.importNode(Te, !0));
            return $._updateDocTypeElement(), $;
          },
        },
        isEqual: {
          value: function (k) {
            return !0;
          },
        },
        mutateValue: {
          value: function (T) {
            this.mutationHandler &&
              this.mutationHandler({ type: ne.VALUE, target: T, data: T.data });
          },
        },
        mutateAttr: {
          value: function (T, k) {
            this.mutationHandler &&
              this.mutationHandler({
                type: ne.ATTR,
                target: T.ownerElement,
                attr: T,
              });
          },
        },
        mutateRemoveAttr: {
          value: function (T) {
            this.mutationHandler &&
              this.mutationHandler({
                type: ne.REMOVE_ATTR,
                target: T.ownerElement,
                attr: T,
              });
          },
        },
        mutateRemove: {
          value: function (T) {
            this.mutationHandler &&
              this.mutationHandler({
                type: ne.REMOVE,
                target: T.parentNode,
                node: T,
              }),
              U(T);
          },
        },
        mutateInsert: {
          value: function (T) {
            x(T),
              this.mutationHandler &&
                this.mutationHandler({
                  type: ne.INSERT,
                  target: T.parentNode,
                  node: T,
                });
          },
        },
        mutateMove: {
          value: function (T) {
            this.mutationHandler &&
              this.mutationHandler({ type: ne.MOVE, target: T });
          },
        },
        addId: {
          value: function (k, $) {
            var Te = this.byId[k];
            Te
              ? (Te instanceof pe || ((Te = new pe(Te)), (this.byId[k] = Te)),
                Te.add($))
              : (this.byId[k] = $);
          },
        },
        delId: {
          value: function (k, $) {
            var Te = this.byId[k];
            b.assert(Te),
              Te instanceof pe
                ? (Te.del($),
                  Te.length === 1 && (this.byId[k] = Te.downgrade()))
                : (this.byId[k] = void 0);
          },
        },
        _resolve: {
          value: function (T) {
            return new M(this._documentBaseURL).resolve(T);
          },
        },
        _documentBaseURL: {
          get: function () {
            var T = this._address;
            T === 'about:blank' && (T = '/');
            var k = this.querySelector('base[href]');
            return k ? new M(T).resolve(k.getAttribute('href')) : T;
          },
        },
        _templateDoc: {
          get: function () {
            if (!this._templateDocCache) {
              var T = new q(this.isHTML, this._address);
              this._templateDocCache = T._templateDocCache = T;
            }
            return this._templateDocCache;
          },
        },
        querySelector: {
          value: function (T) {
            return j(T, this)[0];
          },
        },
        querySelectorAll: {
          value: function (T) {
            var k = j(T, this);
            return k.item ? k : new r(k);
          },
        },
      });
      var g = [
        'abort',
        'canplay',
        'canplaythrough',
        'change',
        'click',
        'contextmenu',
        'cuechange',
        'dblclick',
        'drag',
        'dragend',
        'dragenter',
        'dragleave',
        'dragover',
        'dragstart',
        'drop',
        'durationchange',
        'emptied',
        'ended',
        'input',
        'invalid',
        'keydown',
        'keypress',
        'keyup',
        'loadeddata',
        'loadedmetadata',
        'loadstart',
        'mousedown',
        'mousemove',
        'mouseout',
        'mouseover',
        'mouseup',
        'mousewheel',
        'pause',
        'play',
        'playing',
        'progress',
        'ratechange',
        'readystatechange',
        'reset',
        'seeked',
        'seeking',
        'select',
        'show',
        'stalled',
        'submit',
        'suspend',
        'timeupdate',
        'volumechange',
        'waiting',
        'blur',
        'error',
        'focus',
        'load',
        'scroll',
      ];
      g.forEach(function (T) {
        Object.defineProperty(q.prototype, 'on' + T, {
          get: function () {
            return this._getEventHandler(T);
          },
          set: function (k) {
            this._setEventHandler(T, k);
          },
        });
      });
      function p(T, k) {
        if (T && T.isHTML) {
          for (var $ = T.firstChild; $ !== null; $ = $.nextSibling)
            if (
              $.nodeType === n.ELEMENT_NODE &&
              $.localName === k &&
              $.namespaceURI === se.HTML
            )
              return $;
        }
        return null;
      }
      function v(T) {
        if (
          ((T._nid = T.ownerDocument._nextnid++),
          (T.ownerDocument._nodes[T._nid] = T),
          T.nodeType === n.ELEMENT_NODE)
        ) {
          var k = T.getAttribute('id');
          k && T.ownerDocument.addId(k, T), T._roothook && T._roothook();
        }
      }
      function C(T) {
        if (T.nodeType === n.ELEMENT_NODE) {
          var k = T.getAttribute('id');
          k && T.ownerDocument.delId(k, T);
        }
        (T.ownerDocument._nodes[T._nid] = void 0), (T._nid = void 0);
      }
      function x(T) {
        if ((v(T), T.nodeType === n.ELEMENT_NODE))
          for (var k = T.firstChild; k !== null; k = k.nextSibling) x(k);
      }
      function U(T) {
        C(T);
        for (var k = T.firstChild; k !== null; k = k.nextSibling) U(k);
      }
      function Q(T, k) {
        (T.ownerDocument = k),
          (T._lastModTime = void 0),
          Object.prototype.hasOwnProperty.call(T, '_tagName') &&
            (T._tagName = void 0);
        for (var $ = T.firstChild; $ !== null; $ = $.nextSibling) Q($, k);
      }
      function pe(T) {
        (this.nodes = Object.create(null)),
          (this.nodes[T._nid] = T),
          (this.length = 1),
          (this.firstNode = void 0);
      }
      (pe.prototype.add = function (T) {
        this.nodes[T._nid] ||
          ((this.nodes[T._nid] = T), this.length++, (this.firstNode = void 0));
      }),
        (pe.prototype.del = function (T) {
          this.nodes[T._nid] &&
            (delete this.nodes[T._nid],
            this.length--,
            (this.firstNode = void 0));
        }),
        (pe.prototype.getFirst = function () {
          if (!this.firstNode) {
            var T;
            for (T in this.nodes)
              (this.firstNode === void 0 ||
                this.firstNode.compareDocumentPosition(this.nodes[T]) &
                  n.DOCUMENT_POSITION_PRECEDING) &&
                (this.firstNode = this.nodes[T]);
          }
          return this.firstNode;
        }),
        (pe.prototype.downgrade = function () {
          if (this.length === 1) {
            var T;
            for (T in this.nodes) return this.nodes[T];
          }
          return this;
        });
    },
  }),
  Lp = oe({
    'external/npm/node_modules/domino/lib/DocumentType.js'(t, e) {
      'use strict';
      e.exports = s;
      var n = yt(),
        r = G0(),
        i = Ap();
      function s(o, a, c, l) {
        r.call(this),
          (this.nodeType = n.DOCUMENT_TYPE_NODE),
          (this.ownerDocument = o || null),
          (this.name = a),
          (this.publicId = c || ''),
          (this.systemId = l || '');
      }
      (s.prototype = Object.create(r.prototype, {
        nodeName: {
          get: function () {
            return this.name;
          },
        },
        nodeValue: {
          get: function () {
            return null;
          },
          set: function () {},
        },
        clone: {
          value: function () {
            return new s(
              this.ownerDocument,
              this.name,
              this.publicId,
              this.systemId
            );
          },
        },
        isEqual: {
          value: function (a) {
            return (
              this.name === a.name &&
              this.publicId === a.publicId &&
              this.systemId === a.systemId
            );
          },
        },
      })),
        Object.defineProperties(s.prototype, i);
    },
  }),
  Pp = oe({
    'external/npm/node_modules/domino/lib/HTMLParser.js'(t, e) {
      'use strict';
      e.exports = Ne;
      var n = kp(),
        r = Lp(),
        i = yt(),
        s = tt().NAMESPACE,
        o = Op(),
        a = o.elements,
        c = Function.prototype.apply.bind(Array.prototype.push),
        l = -1,
        u = 1,
        d = 2,
        m = 3,
        E = 4,
        I = 5,
        M = [],
        j =
          /^HTML$|^-\/\/W3O\/\/DTD W3 HTML Strict 3\.0\/\/EN\/\/$|^-\/W3C\/DTD HTML 4\.0 Transitional\/EN$|^\+\/\/Silmaril\/\/dtd html Pro v0r11 19970101\/\/|^-\/\/AdvaSoft Ltd\/\/DTD HTML 3\.0 asWedit \+ extensions\/\/|^-\/\/AS\/\/DTD HTML 3\.0 asWedit \+ extensions\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Level 1\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Level 2\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict Level 1\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict Level 2\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict\/\/|^-\/\/IETF\/\/DTD HTML 2\.0\/\/|^-\/\/IETF\/\/DTD HTML 2\.1E\/\/|^-\/\/IETF\/\/DTD HTML 3\.0\/\/|^-\/\/IETF\/\/DTD HTML 3\.2 Final\/\/|^-\/\/IETF\/\/DTD HTML 3\.2\/\/|^-\/\/IETF\/\/DTD HTML 3\/\/|^-\/\/IETF\/\/DTD HTML Level 0\/\/|^-\/\/IETF\/\/DTD HTML Level 1\/\/|^-\/\/IETF\/\/DTD HTML Level 2\/\/|^-\/\/IETF\/\/DTD HTML Level 3\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 0\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 1\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 2\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 3\/\/|^-\/\/IETF\/\/DTD HTML Strict\/\/|^-\/\/IETF\/\/DTD HTML\/\/|^-\/\/Metrius\/\/DTD Metrius Presentational\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 HTML Strict\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 HTML\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 Tables\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 HTML Strict\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 HTML\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 Tables\/\/|^-\/\/Netscape Comm\. Corp\.\/\/DTD HTML\/\/|^-\/\/Netscape Comm\. Corp\.\/\/DTD Strict HTML\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML 2\.0\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML Extended 1\.0\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML Extended Relaxed 1\.0\/\/|^-\/\/SoftQuad Software\/\/DTD HoTMetaL PRO 6\.0::19990601::extensions to HTML 4\.0\/\/|^-\/\/SoftQuad\/\/DTD HoTMetaL PRO 4\.0::19971010::extensions to HTML 4\.0\/\/|^-\/\/Spyglass\/\/DTD HTML 2\.0 Extended\/\/|^-\/\/SQ\/\/DTD HTML 2\.0 HoTMetaL \+ extensions\/\/|^-\/\/Sun Microsystems Corp\.\/\/DTD HotJava HTML\/\/|^-\/\/Sun Microsystems Corp\.\/\/DTD HotJava Strict HTML\/\/|^-\/\/W3C\/\/DTD HTML 3 1995-03-24\/\/|^-\/\/W3C\/\/DTD HTML 3\.2 Draft\/\/|^-\/\/W3C\/\/DTD HTML 3\.2 Final\/\/|^-\/\/W3C\/\/DTD HTML 3\.2\/\/|^-\/\/W3C\/\/DTD HTML 3\.2S Draft\/\/|^-\/\/W3C\/\/DTD HTML 4\.0 Frameset\/\/|^-\/\/W3C\/\/DTD HTML 4\.0 Transitional\/\/|^-\/\/W3C\/\/DTD HTML Experimental 19960712\/\/|^-\/\/W3C\/\/DTD HTML Experimental 970421\/\/|^-\/\/W3C\/\/DTD W3 HTML\/\/|^-\/\/W3O\/\/DTD W3 HTML 3\.0\/\/|^-\/\/WebTechs\/\/DTD Mozilla HTML 2\.0\/\/|^-\/\/WebTechs\/\/DTD Mozilla HTML\/\//i,
        O = 'http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd',
        D =
          /^-\/\/W3C\/\/DTD HTML 4\.01 Frameset\/\/|^-\/\/W3C\/\/DTD HTML 4\.01 Transitional\/\//i,
        _ =
          /^-\/\/W3C\/\/DTD XHTML 1\.0 Frameset\/\/|^-\/\/W3C\/\/DTD XHTML 1\.0 Transitional\/\//i,
        S = Object.create(null);
      (S[s.HTML] = {
        __proto__: null,
        address: !0,
        applet: !0,
        area: !0,
        article: !0,
        aside: !0,
        base: !0,
        basefont: !0,
        bgsound: !0,
        blockquote: !0,
        body: !0,
        br: !0,
        button: !0,
        caption: !0,
        center: !0,
        col: !0,
        colgroup: !0,
        dd: !0,
        details: !0,
        dir: !0,
        div: !0,
        dl: !0,
        dt: !0,
        embed: !0,
        fieldset: !0,
        figcaption: !0,
        figure: !0,
        footer: !0,
        form: !0,
        frame: !0,
        frameset: !0,
        h1: !0,
        h2: !0,
        h3: !0,
        h4: !0,
        h5: !0,
        h6: !0,
        head: !0,
        header: !0,
        hgroup: !0,
        hr: !0,
        html: !0,
        iframe: !0,
        img: !0,
        input: !0,
        li: !0,
        link: !0,
        listing: !0,
        main: !0,
        marquee: !0,
        menu: !0,
        meta: !0,
        nav: !0,
        noembed: !0,
        noframes: !0,
        noscript: !0,
        object: !0,
        ol: !0,
        p: !0,
        param: !0,
        plaintext: !0,
        pre: !0,
        script: !0,
        section: !0,
        select: !0,
        source: !0,
        style: !0,
        summary: !0,
        table: !0,
        tbody: !0,
        td: !0,
        template: !0,
        textarea: !0,
        tfoot: !0,
        th: !0,
        thead: !0,
        title: !0,
        tr: !0,
        track: !0,
        ul: !0,
        wbr: !0,
        xmp: !0,
      }),
        (S[s.SVG] = {
          __proto__: null,
          foreignObject: !0,
          desc: !0,
          title: !0,
        }),
        (S[s.MATHML] = {
          __proto__: null,
          mi: !0,
          mo: !0,
          mn: !0,
          ms: !0,
          mtext: !0,
          'annotation-xml': !0,
        });
      var b = Object.create(null);
      b[s.HTML] = { __proto__: null, address: !0, div: !0, p: !0 };
      var ne = Object.create(null);
      ne[s.HTML] = { __proto__: null, dd: !0, dt: !0 };
      var se = Object.create(null);
      se[s.HTML] = {
        __proto__: null,
        table: !0,
        thead: !0,
        tbody: !0,
        tfoot: !0,
        tr: !0,
      };
      var Ie = Object.create(null);
      Ie[s.HTML] = {
        __proto__: null,
        dd: !0,
        dt: !0,
        li: !0,
        menuitem: !0,
        optgroup: !0,
        option: !0,
        p: !0,
        rb: !0,
        rp: !0,
        rt: !0,
        rtc: !0,
      };
      var q = Object.create(null);
      q[s.HTML] = {
        __proto__: null,
        caption: !0,
        colgroup: !0,
        dd: !0,
        dt: !0,
        li: !0,
        optgroup: !0,
        option: !0,
        p: !0,
        rb: !0,
        rp: !0,
        rt: !0,
        rtc: !0,
        tbody: !0,
        td: !0,
        tfoot: !0,
        th: !0,
        thead: !0,
        tr: !0,
      };
      var R = Object.create(null);
      R[s.HTML] = { __proto__: null, table: !0, template: !0, html: !0 };
      var F = Object.create(null);
      F[s.HTML] = {
        __proto__: null,
        tbody: !0,
        tfoot: !0,
        thead: !0,
        template: !0,
        html: !0,
      };
      var Y = Object.create(null);
      Y[s.HTML] = { __proto__: null, tr: !0, template: !0, html: !0 };
      var y = Object.create(null);
      y[s.HTML] = {
        __proto__: null,
        button: !0,
        fieldset: !0,
        input: !0,
        keygen: !0,
        object: !0,
        output: !0,
        select: !0,
        textarea: !0,
        img: !0,
      };
      var g = Object.create(null);
      (g[s.HTML] = {
        __proto__: null,
        applet: !0,
        caption: !0,
        html: !0,
        table: !0,
        td: !0,
        th: !0,
        marquee: !0,
        object: !0,
        template: !0,
      }),
        (g[s.MATHML] = {
          __proto__: null,
          mi: !0,
          mo: !0,
          mn: !0,
          ms: !0,
          mtext: !0,
          'annotation-xml': !0,
        }),
        (g[s.SVG] = {
          __proto__: null,
          foreignObject: !0,
          desc: !0,
          title: !0,
        });
      var p = Object.create(g);
      (p[s.HTML] = Object.create(g[s.HTML])),
        (p[s.HTML].ol = !0),
        (p[s.HTML].ul = !0);
      var v = Object.create(g);
      (v[s.HTML] = Object.create(g[s.HTML])), (v[s.HTML].button = !0);
      var C = Object.create(null);
      C[s.HTML] = { __proto__: null, html: !0, table: !0, template: !0 };
      var x = Object.create(null);
      x[s.HTML] = { __proto__: null, optgroup: !0, option: !0 };
      var U = Object.create(null);
      U[s.MATHML] = {
        __proto__: null,
        mi: !0,
        mo: !0,
        mn: !0,
        ms: !0,
        mtext: !0,
      };
      var Q = Object.create(null);
      Q[s.SVG] = { __proto__: null, foreignObject: !0, desc: !0, title: !0 };
      var pe = {
          __proto__: null,
          'xlink:actuate': s.XLINK,
          'xlink:arcrole': s.XLINK,
          'xlink:href': s.XLINK,
          'xlink:role': s.XLINK,
          'xlink:show': s.XLINK,
          'xlink:title': s.XLINK,
          'xlink:type': s.XLINK,
          'xml:base': s.XML,
          'xml:lang': s.XML,
          'xml:space': s.XML,
          xmlns: s.XMLNS,
          'xmlns:xlink': s.XMLNS,
        },
        T = {
          __proto__: null,
          attributename: 'attributeName',
          attributetype: 'attributeType',
          basefrequency: 'baseFrequency',
          baseprofile: 'baseProfile',
          calcmode: 'calcMode',
          clippathunits: 'clipPathUnits',
          diffuseconstant: 'diffuseConstant',
          edgemode: 'edgeMode',
          filterunits: 'filterUnits',
          glyphref: 'glyphRef',
          gradienttransform: 'gradientTransform',
          gradientunits: 'gradientUnits',
          kernelmatrix: 'kernelMatrix',
          kernelunitlength: 'kernelUnitLength',
          keypoints: 'keyPoints',
          keysplines: 'keySplines',
          keytimes: 'keyTimes',
          lengthadjust: 'lengthAdjust',
          limitingconeangle: 'limitingConeAngle',
          markerheight: 'markerHeight',
          markerunits: 'markerUnits',
          markerwidth: 'markerWidth',
          maskcontentunits: 'maskContentUnits',
          maskunits: 'maskUnits',
          numoctaves: 'numOctaves',
          pathlength: 'pathLength',
          patterncontentunits: 'patternContentUnits',
          patterntransform: 'patternTransform',
          patternunits: 'patternUnits',
          pointsatx: 'pointsAtX',
          pointsaty: 'pointsAtY',
          pointsatz: 'pointsAtZ',
          preservealpha: 'preserveAlpha',
          preserveaspectratio: 'preserveAspectRatio',
          primitiveunits: 'primitiveUnits',
          refx: 'refX',
          refy: 'refY',
          repeatcount: 'repeatCount',
          repeatdur: 'repeatDur',
          requiredextensions: 'requiredExtensions',
          requiredfeatures: 'requiredFeatures',
          specularconstant: 'specularConstant',
          specularexponent: 'specularExponent',
          spreadmethod: 'spreadMethod',
          startoffset: 'startOffset',
          stddeviation: 'stdDeviation',
          stitchtiles: 'stitchTiles',
          surfacescale: 'surfaceScale',
          systemlanguage: 'systemLanguage',
          tablevalues: 'tableValues',
          targetx: 'targetX',
          targety: 'targetY',
          textlength: 'textLength',
          viewbox: 'viewBox',
          viewtarget: 'viewTarget',
          xchannelselector: 'xChannelSelector',
          ychannelselector: 'yChannelSelector',
          zoomandpan: 'zoomAndPan',
        },
        k = {
          __proto__: null,
          altglyph: 'altGlyph',
          altglyphdef: 'altGlyphDef',
          altglyphitem: 'altGlyphItem',
          animatecolor: 'animateColor',
          animatemotion: 'animateMotion',
          animatetransform: 'animateTransform',
          clippath: 'clipPath',
          feblend: 'feBlend',
          fecolormatrix: 'feColorMatrix',
          fecomponenttransfer: 'feComponentTransfer',
          fecomposite: 'feComposite',
          feconvolvematrix: 'feConvolveMatrix',
          fediffuselighting: 'feDiffuseLighting',
          fedisplacementmap: 'feDisplacementMap',
          fedistantlight: 'feDistantLight',
          feflood: 'feFlood',
          fefunca: 'feFuncA',
          fefuncb: 'feFuncB',
          fefuncg: 'feFuncG',
          fefuncr: 'feFuncR',
          fegaussianblur: 'feGaussianBlur',
          feimage: 'feImage',
          femerge: 'feMerge',
          femergenode: 'feMergeNode',
          femorphology: 'feMorphology',
          feoffset: 'feOffset',
          fepointlight: 'fePointLight',
          fespecularlighting: 'feSpecularLighting',
          fespotlight: 'feSpotLight',
          fetile: 'feTile',
          feturbulence: 'feTurbulence',
          foreignobject: 'foreignObject',
          glyphref: 'glyphRef',
          lineargradient: 'linearGradient',
          radialgradient: 'radialGradient',
          textpath: 'textPath',
        },
        $ = {
          __proto__: null,
          0: 65533,
          128: 8364,
          130: 8218,
          131: 402,
          132: 8222,
          133: 8230,
          134: 8224,
          135: 8225,
          136: 710,
          137: 8240,
          138: 352,
          139: 8249,
          140: 338,
          142: 381,
          145: 8216,
          146: 8217,
          147: 8220,
          148: 8221,
          149: 8226,
          150: 8211,
          151: 8212,
          152: 732,
          153: 8482,
          154: 353,
          155: 8250,
          156: 339,
          158: 382,
          159: 376,
        },
        Te = {
          __proto__: null,
          AElig: 198,
          'AElig;': 198,
          AMP: 38,
          'AMP;': 38,
          Aacute: 193,
          'Aacute;': 193,
          'Abreve;': 258,
          Acirc: 194,
          'Acirc;': 194,
          'Acy;': 1040,
          'Afr;': [55349, 56580],
          Agrave: 192,
          'Agrave;': 192,
          'Alpha;': 913,
          'Amacr;': 256,
          'And;': 10835,
          'Aogon;': 260,
          'Aopf;': [55349, 56632],
          'ApplyFunction;': 8289,
          Aring: 197,
          'Aring;': 197,
          'Ascr;': [55349, 56476],
          'Assign;': 8788,
          Atilde: 195,
          'Atilde;': 195,
          Auml: 196,
          'Auml;': 196,
          'Backslash;': 8726,
          'Barv;': 10983,
          'Barwed;': 8966,
          'Bcy;': 1041,
          'Because;': 8757,
          'Bernoullis;': 8492,
          'Beta;': 914,
          'Bfr;': [55349, 56581],
          'Bopf;': [55349, 56633],
          'Breve;': 728,
          'Bscr;': 8492,
          'Bumpeq;': 8782,
          'CHcy;': 1063,
          COPY: 169,
          'COPY;': 169,
          'Cacute;': 262,
          'Cap;': 8914,
          'CapitalDifferentialD;': 8517,
          'Cayleys;': 8493,
          'Ccaron;': 268,
          Ccedil: 199,
          'Ccedil;': 199,
          'Ccirc;': 264,
          'Cconint;': 8752,
          'Cdot;': 266,
          'Cedilla;': 184,
          'CenterDot;': 183,
          'Cfr;': 8493,
          'Chi;': 935,
          'CircleDot;': 8857,
          'CircleMinus;': 8854,
          'CirclePlus;': 8853,
          'CircleTimes;': 8855,
          'ClockwiseContourIntegral;': 8754,
          'CloseCurlyDoubleQuote;': 8221,
          'CloseCurlyQuote;': 8217,
          'Colon;': 8759,
          'Colone;': 10868,
          'Congruent;': 8801,
          'Conint;': 8751,
          'ContourIntegral;': 8750,
          'Copf;': 8450,
          'Coproduct;': 8720,
          'CounterClockwiseContourIntegral;': 8755,
          'Cross;': 10799,
          'Cscr;': [55349, 56478],
          'Cup;': 8915,
          'CupCap;': 8781,
          'DD;': 8517,
          'DDotrahd;': 10513,
          'DJcy;': 1026,
          'DScy;': 1029,
          'DZcy;': 1039,
          'Dagger;': 8225,
          'Darr;': 8609,
          'Dashv;': 10980,
          'Dcaron;': 270,
          'Dcy;': 1044,
          'Del;': 8711,
          'Delta;': 916,
          'Dfr;': [55349, 56583],
          'DiacriticalAcute;': 180,
          'DiacriticalDot;': 729,
          'DiacriticalDoubleAcute;': 733,
          'DiacriticalGrave;': 96,
          'DiacriticalTilde;': 732,
          'Diamond;': 8900,
          'DifferentialD;': 8518,
          'Dopf;': [55349, 56635],
          'Dot;': 168,
          'DotDot;': 8412,
          'DotEqual;': 8784,
          'DoubleContourIntegral;': 8751,
          'DoubleDot;': 168,
          'DoubleDownArrow;': 8659,
          'DoubleLeftArrow;': 8656,
          'DoubleLeftRightArrow;': 8660,
          'DoubleLeftTee;': 10980,
          'DoubleLongLeftArrow;': 10232,
          'DoubleLongLeftRightArrow;': 10234,
          'DoubleLongRightArrow;': 10233,
          'DoubleRightArrow;': 8658,
          'DoubleRightTee;': 8872,
          'DoubleUpArrow;': 8657,
          'DoubleUpDownArrow;': 8661,
          'DoubleVerticalBar;': 8741,
          'DownArrow;': 8595,
          'DownArrowBar;': 10515,
          'DownArrowUpArrow;': 8693,
          'DownBreve;': 785,
          'DownLeftRightVector;': 10576,
          'DownLeftTeeVector;': 10590,
          'DownLeftVector;': 8637,
          'DownLeftVectorBar;': 10582,
          'DownRightTeeVector;': 10591,
          'DownRightVector;': 8641,
          'DownRightVectorBar;': 10583,
          'DownTee;': 8868,
          'DownTeeArrow;': 8615,
          'Downarrow;': 8659,
          'Dscr;': [55349, 56479],
          'Dstrok;': 272,
          'ENG;': 330,
          ETH: 208,
          'ETH;': 208,
          Eacute: 201,
          'Eacute;': 201,
          'Ecaron;': 282,
          Ecirc: 202,
          'Ecirc;': 202,
          'Ecy;': 1069,
          'Edot;': 278,
          'Efr;': [55349, 56584],
          Egrave: 200,
          'Egrave;': 200,
          'Element;': 8712,
          'Emacr;': 274,
          'EmptySmallSquare;': 9723,
          'EmptyVerySmallSquare;': 9643,
          'Eogon;': 280,
          'Eopf;': [55349, 56636],
          'Epsilon;': 917,
          'Equal;': 10869,
          'EqualTilde;': 8770,
          'Equilibrium;': 8652,
          'Escr;': 8496,
          'Esim;': 10867,
          'Eta;': 919,
          Euml: 203,
          'Euml;': 203,
          'Exists;': 8707,
          'ExponentialE;': 8519,
          'Fcy;': 1060,
          'Ffr;': [55349, 56585],
          'FilledSmallSquare;': 9724,
          'FilledVerySmallSquare;': 9642,
          'Fopf;': [55349, 56637],
          'ForAll;': 8704,
          'Fouriertrf;': 8497,
          'Fscr;': 8497,
          'GJcy;': 1027,
          GT: 62,
          'GT;': 62,
          'Gamma;': 915,
          'Gammad;': 988,
          'Gbreve;': 286,
          'Gcedil;': 290,
          'Gcirc;': 284,
          'Gcy;': 1043,
          'Gdot;': 288,
          'Gfr;': [55349, 56586],
          'Gg;': 8921,
          'Gopf;': [55349, 56638],
          'GreaterEqual;': 8805,
          'GreaterEqualLess;': 8923,
          'GreaterFullEqual;': 8807,
          'GreaterGreater;': 10914,
          'GreaterLess;': 8823,
          'GreaterSlantEqual;': 10878,
          'GreaterTilde;': 8819,
          'Gscr;': [55349, 56482],
          'Gt;': 8811,
          'HARDcy;': 1066,
          'Hacek;': 711,
          'Hat;': 94,
          'Hcirc;': 292,
          'Hfr;': 8460,
          'HilbertSpace;': 8459,
          'Hopf;': 8461,
          'HorizontalLine;': 9472,
          'Hscr;': 8459,
          'Hstrok;': 294,
          'HumpDownHump;': 8782,
          'HumpEqual;': 8783,
          'IEcy;': 1045,
          'IJlig;': 306,
          'IOcy;': 1025,
          Iacute: 205,
          'Iacute;': 205,
          Icirc: 206,
          'Icirc;': 206,
          'Icy;': 1048,
          'Idot;': 304,
          'Ifr;': 8465,
          Igrave: 204,
          'Igrave;': 204,
          'Im;': 8465,
          'Imacr;': 298,
          'ImaginaryI;': 8520,
          'Implies;': 8658,
          'Int;': 8748,
          'Integral;': 8747,
          'Intersection;': 8898,
          'InvisibleComma;': 8291,
          'InvisibleTimes;': 8290,
          'Iogon;': 302,
          'Iopf;': [55349, 56640],
          'Iota;': 921,
          'Iscr;': 8464,
          'Itilde;': 296,
          'Iukcy;': 1030,
          Iuml: 207,
          'Iuml;': 207,
          'Jcirc;': 308,
          'Jcy;': 1049,
          'Jfr;': [55349, 56589],
          'Jopf;': [55349, 56641],
          'Jscr;': [55349, 56485],
          'Jsercy;': 1032,
          'Jukcy;': 1028,
          'KHcy;': 1061,
          'KJcy;': 1036,
          'Kappa;': 922,
          'Kcedil;': 310,
          'Kcy;': 1050,
          'Kfr;': [55349, 56590],
          'Kopf;': [55349, 56642],
          'Kscr;': [55349, 56486],
          'LJcy;': 1033,
          LT: 60,
          'LT;': 60,
          'Lacute;': 313,
          'Lambda;': 923,
          'Lang;': 10218,
          'Laplacetrf;': 8466,
          'Larr;': 8606,
          'Lcaron;': 317,
          'Lcedil;': 315,
          'Lcy;': 1051,
          'LeftAngleBracket;': 10216,
          'LeftArrow;': 8592,
          'LeftArrowBar;': 8676,
          'LeftArrowRightArrow;': 8646,
          'LeftCeiling;': 8968,
          'LeftDoubleBracket;': 10214,
          'LeftDownTeeVector;': 10593,
          'LeftDownVector;': 8643,
          'LeftDownVectorBar;': 10585,
          'LeftFloor;': 8970,
          'LeftRightArrow;': 8596,
          'LeftRightVector;': 10574,
          'LeftTee;': 8867,
          'LeftTeeArrow;': 8612,
          'LeftTeeVector;': 10586,
          'LeftTriangle;': 8882,
          'LeftTriangleBar;': 10703,
          'LeftTriangleEqual;': 8884,
          'LeftUpDownVector;': 10577,
          'LeftUpTeeVector;': 10592,
          'LeftUpVector;': 8639,
          'LeftUpVectorBar;': 10584,
          'LeftVector;': 8636,
          'LeftVectorBar;': 10578,
          'Leftarrow;': 8656,
          'Leftrightarrow;': 8660,
          'LessEqualGreater;': 8922,
          'LessFullEqual;': 8806,
          'LessGreater;': 8822,
          'LessLess;': 10913,
          'LessSlantEqual;': 10877,
          'LessTilde;': 8818,
          'Lfr;': [55349, 56591],
          'Ll;': 8920,
          'Lleftarrow;': 8666,
          'Lmidot;': 319,
          'LongLeftArrow;': 10229,
          'LongLeftRightArrow;': 10231,
          'LongRightArrow;': 10230,
          'Longleftarrow;': 10232,
          'Longleftrightarrow;': 10234,
          'Longrightarrow;': 10233,
          'Lopf;': [55349, 56643],
          'LowerLeftArrow;': 8601,
          'LowerRightArrow;': 8600,
          'Lscr;': 8466,
          'Lsh;': 8624,
          'Lstrok;': 321,
          'Lt;': 8810,
          'Map;': 10501,
          'Mcy;': 1052,
          'MediumSpace;': 8287,
          'Mellintrf;': 8499,
          'Mfr;': [55349, 56592],
          'MinusPlus;': 8723,
          'Mopf;': [55349, 56644],
          'Mscr;': 8499,
          'Mu;': 924,
          'NJcy;': 1034,
          'Nacute;': 323,
          'Ncaron;': 327,
          'Ncedil;': 325,
          'Ncy;': 1053,
          'NegativeMediumSpace;': 8203,
          'NegativeThickSpace;': 8203,
          'NegativeThinSpace;': 8203,
          'NegativeVeryThinSpace;': 8203,
          'NestedGreaterGreater;': 8811,
          'NestedLessLess;': 8810,
          'NewLine;': 10,
          'Nfr;': [55349, 56593],
          'NoBreak;': 8288,
          'NonBreakingSpace;': 160,
          'Nopf;': 8469,
          'Not;': 10988,
          'NotCongruent;': 8802,
          'NotCupCap;': 8813,
          'NotDoubleVerticalBar;': 8742,
          'NotElement;': 8713,
          'NotEqual;': 8800,
          'NotEqualTilde;': [8770, 824],
          'NotExists;': 8708,
          'NotGreater;': 8815,
          'NotGreaterEqual;': 8817,
          'NotGreaterFullEqual;': [8807, 824],
          'NotGreaterGreater;': [8811, 824],
          'NotGreaterLess;': 8825,
          'NotGreaterSlantEqual;': [10878, 824],
          'NotGreaterTilde;': 8821,
          'NotHumpDownHump;': [8782, 824],
          'NotHumpEqual;': [8783, 824],
          'NotLeftTriangle;': 8938,
          'NotLeftTriangleBar;': [10703, 824],
          'NotLeftTriangleEqual;': 8940,
          'NotLess;': 8814,
          'NotLessEqual;': 8816,
          'NotLessGreater;': 8824,
          'NotLessLess;': [8810, 824],
          'NotLessSlantEqual;': [10877, 824],
          'NotLessTilde;': 8820,
          'NotNestedGreaterGreater;': [10914, 824],
          'NotNestedLessLess;': [10913, 824],
          'NotPrecedes;': 8832,
          'NotPrecedesEqual;': [10927, 824],
          'NotPrecedesSlantEqual;': 8928,
          'NotReverseElement;': 8716,
          'NotRightTriangle;': 8939,
          'NotRightTriangleBar;': [10704, 824],
          'NotRightTriangleEqual;': 8941,
          'NotSquareSubset;': [8847, 824],
          'NotSquareSubsetEqual;': 8930,
          'NotSquareSuperset;': [8848, 824],
          'NotSquareSupersetEqual;': 8931,
          'NotSubset;': [8834, 8402],
          'NotSubsetEqual;': 8840,
          'NotSucceeds;': 8833,
          'NotSucceedsEqual;': [10928, 824],
          'NotSucceedsSlantEqual;': 8929,
          'NotSucceedsTilde;': [8831, 824],
          'NotSuperset;': [8835, 8402],
          'NotSupersetEqual;': 8841,
          'NotTilde;': 8769,
          'NotTildeEqual;': 8772,
          'NotTildeFullEqual;': 8775,
          'NotTildeTilde;': 8777,
          'NotVerticalBar;': 8740,
          'Nscr;': [55349, 56489],
          Ntilde: 209,
          'Ntilde;': 209,
          'Nu;': 925,
          'OElig;': 338,
          Oacute: 211,
          'Oacute;': 211,
          Ocirc: 212,
          'Ocirc;': 212,
          'Ocy;': 1054,
          'Odblac;': 336,
          'Ofr;': [55349, 56594],
          Ograve: 210,
          'Ograve;': 210,
          'Omacr;': 332,
          'Omega;': 937,
          'Omicron;': 927,
          'Oopf;': [55349, 56646],
          'OpenCurlyDoubleQuote;': 8220,
          'OpenCurlyQuote;': 8216,
          'Or;': 10836,
          'Oscr;': [55349, 56490],
          Oslash: 216,
          'Oslash;': 216,
          Otilde: 213,
          'Otilde;': 213,
          'Otimes;': 10807,
          Ouml: 214,
          'Ouml;': 214,
          'OverBar;': 8254,
          'OverBrace;': 9182,
          'OverBracket;': 9140,
          'OverParenthesis;': 9180,
          'PartialD;': 8706,
          'Pcy;': 1055,
          'Pfr;': [55349, 56595],
          'Phi;': 934,
          'Pi;': 928,
          'PlusMinus;': 177,
          'Poincareplane;': 8460,
          'Popf;': 8473,
          'Pr;': 10939,
          'Precedes;': 8826,
          'PrecedesEqual;': 10927,
          'PrecedesSlantEqual;': 8828,
          'PrecedesTilde;': 8830,
          'Prime;': 8243,
          'Product;': 8719,
          'Proportion;': 8759,
          'Proportional;': 8733,
          'Pscr;': [55349, 56491],
          'Psi;': 936,
          QUOT: 34,
          'QUOT;': 34,
          'Qfr;': [55349, 56596],
          'Qopf;': 8474,
          'Qscr;': [55349, 56492],
          'RBarr;': 10512,
          REG: 174,
          'REG;': 174,
          'Racute;': 340,
          'Rang;': 10219,
          'Rarr;': 8608,
          'Rarrtl;': 10518,
          'Rcaron;': 344,
          'Rcedil;': 342,
          'Rcy;': 1056,
          'Re;': 8476,
          'ReverseElement;': 8715,
          'ReverseEquilibrium;': 8651,
          'ReverseUpEquilibrium;': 10607,
          'Rfr;': 8476,
          'Rho;': 929,
          'RightAngleBracket;': 10217,
          'RightArrow;': 8594,
          'RightArrowBar;': 8677,
          'RightArrowLeftArrow;': 8644,
          'RightCeiling;': 8969,
          'RightDoubleBracket;': 10215,
          'RightDownTeeVector;': 10589,
          'RightDownVector;': 8642,
          'RightDownVectorBar;': 10581,
          'RightFloor;': 8971,
          'RightTee;': 8866,
          'RightTeeArrow;': 8614,
          'RightTeeVector;': 10587,
          'RightTriangle;': 8883,
          'RightTriangleBar;': 10704,
          'RightTriangleEqual;': 8885,
          'RightUpDownVector;': 10575,
          'RightUpTeeVector;': 10588,
          'RightUpVector;': 8638,
          'RightUpVectorBar;': 10580,
          'RightVector;': 8640,
          'RightVectorBar;': 10579,
          'Rightarrow;': 8658,
          'Ropf;': 8477,
          'RoundImplies;': 10608,
          'Rrightarrow;': 8667,
          'Rscr;': 8475,
          'Rsh;': 8625,
          'RuleDelayed;': 10740,
          'SHCHcy;': 1065,
          'SHcy;': 1064,
          'SOFTcy;': 1068,
          'Sacute;': 346,
          'Sc;': 10940,
          'Scaron;': 352,
          'Scedil;': 350,
          'Scirc;': 348,
          'Scy;': 1057,
          'Sfr;': [55349, 56598],
          'ShortDownArrow;': 8595,
          'ShortLeftArrow;': 8592,
          'ShortRightArrow;': 8594,
          'ShortUpArrow;': 8593,
          'Sigma;': 931,
          'SmallCircle;': 8728,
          'Sopf;': [55349, 56650],
          'Sqrt;': 8730,
          'Square;': 9633,
          'SquareIntersection;': 8851,
          'SquareSubset;': 8847,
          'SquareSubsetEqual;': 8849,
          'SquareSuperset;': 8848,
          'SquareSupersetEqual;': 8850,
          'SquareUnion;': 8852,
          'Sscr;': [55349, 56494],
          'Star;': 8902,
          'Sub;': 8912,
          'Subset;': 8912,
          'SubsetEqual;': 8838,
          'Succeeds;': 8827,
          'SucceedsEqual;': 10928,
          'SucceedsSlantEqual;': 8829,
          'SucceedsTilde;': 8831,
          'SuchThat;': 8715,
          'Sum;': 8721,
          'Sup;': 8913,
          'Superset;': 8835,
          'SupersetEqual;': 8839,
          'Supset;': 8913,
          THORN: 222,
          'THORN;': 222,
          'TRADE;': 8482,
          'TSHcy;': 1035,
          'TScy;': 1062,
          'Tab;': 9,
          'Tau;': 932,
          'Tcaron;': 356,
          'Tcedil;': 354,
          'Tcy;': 1058,
          'Tfr;': [55349, 56599],
          'Therefore;': 8756,
          'Theta;': 920,
          'ThickSpace;': [8287, 8202],
          'ThinSpace;': 8201,
          'Tilde;': 8764,
          'TildeEqual;': 8771,
          'TildeFullEqual;': 8773,
          'TildeTilde;': 8776,
          'Topf;': [55349, 56651],
          'TripleDot;': 8411,
          'Tscr;': [55349, 56495],
          'Tstrok;': 358,
          Uacute: 218,
          'Uacute;': 218,
          'Uarr;': 8607,
          'Uarrocir;': 10569,
          'Ubrcy;': 1038,
          'Ubreve;': 364,
          Ucirc: 219,
          'Ucirc;': 219,
          'Ucy;': 1059,
          'Udblac;': 368,
          'Ufr;': [55349, 56600],
          Ugrave: 217,
          'Ugrave;': 217,
          'Umacr;': 362,
          'UnderBar;': 95,
          'UnderBrace;': 9183,
          'UnderBracket;': 9141,
          'UnderParenthesis;': 9181,
          'Union;': 8899,
          'UnionPlus;': 8846,
          'Uogon;': 370,
          'Uopf;': [55349, 56652],
          'UpArrow;': 8593,
          'UpArrowBar;': 10514,
          'UpArrowDownArrow;': 8645,
          'UpDownArrow;': 8597,
          'UpEquilibrium;': 10606,
          'UpTee;': 8869,
          'UpTeeArrow;': 8613,
          'Uparrow;': 8657,
          'Updownarrow;': 8661,
          'UpperLeftArrow;': 8598,
          'UpperRightArrow;': 8599,
          'Upsi;': 978,
          'Upsilon;': 933,
          'Uring;': 366,
          'Uscr;': [55349, 56496],
          'Utilde;': 360,
          Uuml: 220,
          'Uuml;': 220,
          'VDash;': 8875,
          'Vbar;': 10987,
          'Vcy;': 1042,
          'Vdash;': 8873,
          'Vdashl;': 10982,
          'Vee;': 8897,
          'Verbar;': 8214,
          'Vert;': 8214,
          'VerticalBar;': 8739,
          'VerticalLine;': 124,
          'VerticalSeparator;': 10072,
          'VerticalTilde;': 8768,
          'VeryThinSpace;': 8202,
          'Vfr;': [55349, 56601],
          'Vopf;': [55349, 56653],
          'Vscr;': [55349, 56497],
          'Vvdash;': 8874,
          'Wcirc;': 372,
          'Wedge;': 8896,
          'Wfr;': [55349, 56602],
          'Wopf;': [55349, 56654],
          'Wscr;': [55349, 56498],
          'Xfr;': [55349, 56603],
          'Xi;': 926,
          'Xopf;': [55349, 56655],
          'Xscr;': [55349, 56499],
          'YAcy;': 1071,
          'YIcy;': 1031,
          'YUcy;': 1070,
          Yacute: 221,
          'Yacute;': 221,
          'Ycirc;': 374,
          'Ycy;': 1067,
          'Yfr;': [55349, 56604],
          'Yopf;': [55349, 56656],
          'Yscr;': [55349, 56500],
          'Yuml;': 376,
          'ZHcy;': 1046,
          'Zacute;': 377,
          'Zcaron;': 381,
          'Zcy;': 1047,
          'Zdot;': 379,
          'ZeroWidthSpace;': 8203,
          'Zeta;': 918,
          'Zfr;': 8488,
          'Zopf;': 8484,
          'Zscr;': [55349, 56501],
          aacute: 225,
          'aacute;': 225,
          'abreve;': 259,
          'ac;': 8766,
          'acE;': [8766, 819],
          'acd;': 8767,
          acirc: 226,
          'acirc;': 226,
          acute: 180,
          'acute;': 180,
          'acy;': 1072,
          aelig: 230,
          'aelig;': 230,
          'af;': 8289,
          'afr;': [55349, 56606],
          agrave: 224,
          'agrave;': 224,
          'alefsym;': 8501,
          'aleph;': 8501,
          'alpha;': 945,
          'amacr;': 257,
          'amalg;': 10815,
          amp: 38,
          'amp;': 38,
          'and;': 8743,
          'andand;': 10837,
          'andd;': 10844,
          'andslope;': 10840,
          'andv;': 10842,
          'ang;': 8736,
          'ange;': 10660,
          'angle;': 8736,
          'angmsd;': 8737,
          'angmsdaa;': 10664,
          'angmsdab;': 10665,
          'angmsdac;': 10666,
          'angmsdad;': 10667,
          'angmsdae;': 10668,
          'angmsdaf;': 10669,
          'angmsdag;': 10670,
          'angmsdah;': 10671,
          'angrt;': 8735,
          'angrtvb;': 8894,
          'angrtvbd;': 10653,
          'angsph;': 8738,
          'angst;': 197,
          'angzarr;': 9084,
          'aogon;': 261,
          'aopf;': [55349, 56658],
          'ap;': 8776,
          'apE;': 10864,
          'apacir;': 10863,
          'ape;': 8778,
          'apid;': 8779,
          'apos;': 39,
          'approx;': 8776,
          'approxeq;': 8778,
          aring: 229,
          'aring;': 229,
          'ascr;': [55349, 56502],
          'ast;': 42,
          'asymp;': 8776,
          'asympeq;': 8781,
          atilde: 227,
          'atilde;': 227,
          auml: 228,
          'auml;': 228,
          'awconint;': 8755,
          'awint;': 10769,
          'bNot;': 10989,
          'backcong;': 8780,
          'backepsilon;': 1014,
          'backprime;': 8245,
          'backsim;': 8765,
          'backsimeq;': 8909,
          'barvee;': 8893,
          'barwed;': 8965,
          'barwedge;': 8965,
          'bbrk;': 9141,
          'bbrktbrk;': 9142,
          'bcong;': 8780,
          'bcy;': 1073,
          'bdquo;': 8222,
          'becaus;': 8757,
          'because;': 8757,
          'bemptyv;': 10672,
          'bepsi;': 1014,
          'bernou;': 8492,
          'beta;': 946,
          'beth;': 8502,
          'between;': 8812,
          'bfr;': [55349, 56607],
          'bigcap;': 8898,
          'bigcirc;': 9711,
          'bigcup;': 8899,
          'bigodot;': 10752,
          'bigoplus;': 10753,
          'bigotimes;': 10754,
          'bigsqcup;': 10758,
          'bigstar;': 9733,
          'bigtriangledown;': 9661,
          'bigtriangleup;': 9651,
          'biguplus;': 10756,
          'bigvee;': 8897,
          'bigwedge;': 8896,
          'bkarow;': 10509,
          'blacklozenge;': 10731,
          'blacksquare;': 9642,
          'blacktriangle;': 9652,
          'blacktriangledown;': 9662,
          'blacktriangleleft;': 9666,
          'blacktriangleright;': 9656,
          'blank;': 9251,
          'blk12;': 9618,
          'blk14;': 9617,
          'blk34;': 9619,
          'block;': 9608,
          'bne;': [61, 8421],
          'bnequiv;': [8801, 8421],
          'bnot;': 8976,
          'bopf;': [55349, 56659],
          'bot;': 8869,
          'bottom;': 8869,
          'bowtie;': 8904,
          'boxDL;': 9559,
          'boxDR;': 9556,
          'boxDl;': 9558,
          'boxDr;': 9555,
          'boxH;': 9552,
          'boxHD;': 9574,
          'boxHU;': 9577,
          'boxHd;': 9572,
          'boxHu;': 9575,
          'boxUL;': 9565,
          'boxUR;': 9562,
          'boxUl;': 9564,
          'boxUr;': 9561,
          'boxV;': 9553,
          'boxVH;': 9580,
          'boxVL;': 9571,
          'boxVR;': 9568,
          'boxVh;': 9579,
          'boxVl;': 9570,
          'boxVr;': 9567,
          'boxbox;': 10697,
          'boxdL;': 9557,
          'boxdR;': 9554,
          'boxdl;': 9488,
          'boxdr;': 9484,
          'boxh;': 9472,
          'boxhD;': 9573,
          'boxhU;': 9576,
          'boxhd;': 9516,
          'boxhu;': 9524,
          'boxminus;': 8863,
          'boxplus;': 8862,
          'boxtimes;': 8864,
          'boxuL;': 9563,
          'boxuR;': 9560,
          'boxul;': 9496,
          'boxur;': 9492,
          'boxv;': 9474,
          'boxvH;': 9578,
          'boxvL;': 9569,
          'boxvR;': 9566,
          'boxvh;': 9532,
          'boxvl;': 9508,
          'boxvr;': 9500,
          'bprime;': 8245,
          'breve;': 728,
          brvbar: 166,
          'brvbar;': 166,
          'bscr;': [55349, 56503],
          'bsemi;': 8271,
          'bsim;': 8765,
          'bsime;': 8909,
          'bsol;': 92,
          'bsolb;': 10693,
          'bsolhsub;': 10184,
          'bull;': 8226,
          'bullet;': 8226,
          'bump;': 8782,
          'bumpE;': 10926,
          'bumpe;': 8783,
          'bumpeq;': 8783,
          'cacute;': 263,
          'cap;': 8745,
          'capand;': 10820,
          'capbrcup;': 10825,
          'capcap;': 10827,
          'capcup;': 10823,
          'capdot;': 10816,
          'caps;': [8745, 65024],
          'caret;': 8257,
          'caron;': 711,
          'ccaps;': 10829,
          'ccaron;': 269,
          ccedil: 231,
          'ccedil;': 231,
          'ccirc;': 265,
          'ccups;': 10828,
          'ccupssm;': 10832,
          'cdot;': 267,
          cedil: 184,
          'cedil;': 184,
          'cemptyv;': 10674,
          cent: 162,
          'cent;': 162,
          'centerdot;': 183,
          'cfr;': [55349, 56608],
          'chcy;': 1095,
          'check;': 10003,
          'checkmark;': 10003,
          'chi;': 967,
          'cir;': 9675,
          'cirE;': 10691,
          'circ;': 710,
          'circeq;': 8791,
          'circlearrowleft;': 8634,
          'circlearrowright;': 8635,
          'circledR;': 174,
          'circledS;': 9416,
          'circledast;': 8859,
          'circledcirc;': 8858,
          'circleddash;': 8861,
          'cire;': 8791,
          'cirfnint;': 10768,
          'cirmid;': 10991,
          'cirscir;': 10690,
          'clubs;': 9827,
          'clubsuit;': 9827,
          'colon;': 58,
          'colone;': 8788,
          'coloneq;': 8788,
          'comma;': 44,
          'commat;': 64,
          'comp;': 8705,
          'compfn;': 8728,
          'complement;': 8705,
          'complexes;': 8450,
          'cong;': 8773,
          'congdot;': 10861,
          'conint;': 8750,
          'copf;': [55349, 56660],
          'coprod;': 8720,
          copy: 169,
          'copy;': 169,
          'copysr;': 8471,
          'crarr;': 8629,
          'cross;': 10007,
          'cscr;': [55349, 56504],
          'csub;': 10959,
          'csube;': 10961,
          'csup;': 10960,
          'csupe;': 10962,
          'ctdot;': 8943,
          'cudarrl;': 10552,
          'cudarrr;': 10549,
          'cuepr;': 8926,
          'cuesc;': 8927,
          'cularr;': 8630,
          'cularrp;': 10557,
          'cup;': 8746,
          'cupbrcap;': 10824,
          'cupcap;': 10822,
          'cupcup;': 10826,
          'cupdot;': 8845,
          'cupor;': 10821,
          'cups;': [8746, 65024],
          'curarr;': 8631,
          'curarrm;': 10556,
          'curlyeqprec;': 8926,
          'curlyeqsucc;': 8927,
          'curlyvee;': 8910,
          'curlywedge;': 8911,
          curren: 164,
          'curren;': 164,
          'curvearrowleft;': 8630,
          'curvearrowright;': 8631,
          'cuvee;': 8910,
          'cuwed;': 8911,
          'cwconint;': 8754,
          'cwint;': 8753,
          'cylcty;': 9005,
          'dArr;': 8659,
          'dHar;': 10597,
          'dagger;': 8224,
          'daleth;': 8504,
          'darr;': 8595,
          'dash;': 8208,
          'dashv;': 8867,
          'dbkarow;': 10511,
          'dblac;': 733,
          'dcaron;': 271,
          'dcy;': 1076,
          'dd;': 8518,
          'ddagger;': 8225,
          'ddarr;': 8650,
          'ddotseq;': 10871,
          deg: 176,
          'deg;': 176,
          'delta;': 948,
          'demptyv;': 10673,
          'dfisht;': 10623,
          'dfr;': [55349, 56609],
          'dharl;': 8643,
          'dharr;': 8642,
          'diam;': 8900,
          'diamond;': 8900,
          'diamondsuit;': 9830,
          'diams;': 9830,
          'die;': 168,
          'digamma;': 989,
          'disin;': 8946,
          'div;': 247,
          divide: 247,
          'divide;': 247,
          'divideontimes;': 8903,
          'divonx;': 8903,
          'djcy;': 1106,
          'dlcorn;': 8990,
          'dlcrop;': 8973,
          'dollar;': 36,
          'dopf;': [55349, 56661],
          'dot;': 729,
          'doteq;': 8784,
          'doteqdot;': 8785,
          'dotminus;': 8760,
          'dotplus;': 8724,
          'dotsquare;': 8865,
          'doublebarwedge;': 8966,
          'downarrow;': 8595,
          'downdownarrows;': 8650,
          'downharpoonleft;': 8643,
          'downharpoonright;': 8642,
          'drbkarow;': 10512,
          'drcorn;': 8991,
          'drcrop;': 8972,
          'dscr;': [55349, 56505],
          'dscy;': 1109,
          'dsol;': 10742,
          'dstrok;': 273,
          'dtdot;': 8945,
          'dtri;': 9663,
          'dtrif;': 9662,
          'duarr;': 8693,
          'duhar;': 10607,
          'dwangle;': 10662,
          'dzcy;': 1119,
          'dzigrarr;': 10239,
          'eDDot;': 10871,
          'eDot;': 8785,
          eacute: 233,
          'eacute;': 233,
          'easter;': 10862,
          'ecaron;': 283,
          'ecir;': 8790,
          ecirc: 234,
          'ecirc;': 234,
          'ecolon;': 8789,
          'ecy;': 1101,
          'edot;': 279,
          'ee;': 8519,
          'efDot;': 8786,
          'efr;': [55349, 56610],
          'eg;': 10906,
          egrave: 232,
          'egrave;': 232,
          'egs;': 10902,
          'egsdot;': 10904,
          'el;': 10905,
          'elinters;': 9191,
          'ell;': 8467,
          'els;': 10901,
          'elsdot;': 10903,
          'emacr;': 275,
          'empty;': 8709,
          'emptyset;': 8709,
          'emptyv;': 8709,
          'emsp13;': 8196,
          'emsp14;': 8197,
          'emsp;': 8195,
          'eng;': 331,
          'ensp;': 8194,
          'eogon;': 281,
          'eopf;': [55349, 56662],
          'epar;': 8917,
          'eparsl;': 10723,
          'eplus;': 10865,
          'epsi;': 949,
          'epsilon;': 949,
          'epsiv;': 1013,
          'eqcirc;': 8790,
          'eqcolon;': 8789,
          'eqsim;': 8770,
          'eqslantgtr;': 10902,
          'eqslantless;': 10901,
          'equals;': 61,
          'equest;': 8799,
          'equiv;': 8801,
          'equivDD;': 10872,
          'eqvparsl;': 10725,
          'erDot;': 8787,
          'erarr;': 10609,
          'escr;': 8495,
          'esdot;': 8784,
          'esim;': 8770,
          'eta;': 951,
          eth: 240,
          'eth;': 240,
          euml: 235,
          'euml;': 235,
          'euro;': 8364,
          'excl;': 33,
          'exist;': 8707,
          'expectation;': 8496,
          'exponentiale;': 8519,
          'fallingdotseq;': 8786,
          'fcy;': 1092,
          'female;': 9792,
          'ffilig;': 64259,
          'fflig;': 64256,
          'ffllig;': 64260,
          'ffr;': [55349, 56611],
          'filig;': 64257,
          'fjlig;': [102, 106],
          'flat;': 9837,
          'fllig;': 64258,
          'fltns;': 9649,
          'fnof;': 402,
          'fopf;': [55349, 56663],
          'forall;': 8704,
          'fork;': 8916,
          'forkv;': 10969,
          'fpartint;': 10765,
          frac12: 189,
          'frac12;': 189,
          'frac13;': 8531,
          frac14: 188,
          'frac14;': 188,
          'frac15;': 8533,
          'frac16;': 8537,
          'frac18;': 8539,
          'frac23;': 8532,
          'frac25;': 8534,
          frac34: 190,
          'frac34;': 190,
          'frac35;': 8535,
          'frac38;': 8540,
          'frac45;': 8536,
          'frac56;': 8538,
          'frac58;': 8541,
          'frac78;': 8542,
          'frasl;': 8260,
          'frown;': 8994,
          'fscr;': [55349, 56507],
          'gE;': 8807,
          'gEl;': 10892,
          'gacute;': 501,
          'gamma;': 947,
          'gammad;': 989,
          'gap;': 10886,
          'gbreve;': 287,
          'gcirc;': 285,
          'gcy;': 1075,
          'gdot;': 289,
          'ge;': 8805,
          'gel;': 8923,
          'geq;': 8805,
          'geqq;': 8807,
          'geqslant;': 10878,
          'ges;': 10878,
          'gescc;': 10921,
          'gesdot;': 10880,
          'gesdoto;': 10882,
          'gesdotol;': 10884,
          'gesl;': [8923, 65024],
          'gesles;': 10900,
          'gfr;': [55349, 56612],
          'gg;': 8811,
          'ggg;': 8921,
          'gimel;': 8503,
          'gjcy;': 1107,
          'gl;': 8823,
          'glE;': 10898,
          'gla;': 10917,
          'glj;': 10916,
          'gnE;': 8809,
          'gnap;': 10890,
          'gnapprox;': 10890,
          'gne;': 10888,
          'gneq;': 10888,
          'gneqq;': 8809,
          'gnsim;': 8935,
          'gopf;': [55349, 56664],
          'grave;': 96,
          'gscr;': 8458,
          'gsim;': 8819,
          'gsime;': 10894,
          'gsiml;': 10896,
          gt: 62,
          'gt;': 62,
          'gtcc;': 10919,
          'gtcir;': 10874,
          'gtdot;': 8919,
          'gtlPar;': 10645,
          'gtquest;': 10876,
          'gtrapprox;': 10886,
          'gtrarr;': 10616,
          'gtrdot;': 8919,
          'gtreqless;': 8923,
          'gtreqqless;': 10892,
          'gtrless;': 8823,
          'gtrsim;': 8819,
          'gvertneqq;': [8809, 65024],
          'gvnE;': [8809, 65024],
          'hArr;': 8660,
          'hairsp;': 8202,
          'half;': 189,
          'hamilt;': 8459,
          'hardcy;': 1098,
          'harr;': 8596,
          'harrcir;': 10568,
          'harrw;': 8621,
          'hbar;': 8463,
          'hcirc;': 293,
          'hearts;': 9829,
          'heartsuit;': 9829,
          'hellip;': 8230,
          'hercon;': 8889,
          'hfr;': [55349, 56613],
          'hksearow;': 10533,
          'hkswarow;': 10534,
          'hoarr;': 8703,
          'homtht;': 8763,
          'hookleftarrow;': 8617,
          'hookrightarrow;': 8618,
          'hopf;': [55349, 56665],
          'horbar;': 8213,
          'hscr;': [55349, 56509],
          'hslash;': 8463,
          'hstrok;': 295,
          'hybull;': 8259,
          'hyphen;': 8208,
          iacute: 237,
          'iacute;': 237,
          'ic;': 8291,
          icirc: 238,
          'icirc;': 238,
          'icy;': 1080,
          'iecy;': 1077,
          iexcl: 161,
          'iexcl;': 161,
          'iff;': 8660,
          'ifr;': [55349, 56614],
          igrave: 236,
          'igrave;': 236,
          'ii;': 8520,
          'iiiint;': 10764,
          'iiint;': 8749,
          'iinfin;': 10716,
          'iiota;': 8489,
          'ijlig;': 307,
          'imacr;': 299,
          'image;': 8465,
          'imagline;': 8464,
          'imagpart;': 8465,
          'imath;': 305,
          'imof;': 8887,
          'imped;': 437,
          'in;': 8712,
          'incare;': 8453,
          'infin;': 8734,
          'infintie;': 10717,
          'inodot;': 305,
          'int;': 8747,
          'intcal;': 8890,
          'integers;': 8484,
          'intercal;': 8890,
          'intlarhk;': 10775,
          'intprod;': 10812,
          'iocy;': 1105,
          'iogon;': 303,
          'iopf;': [55349, 56666],
          'iota;': 953,
          'iprod;': 10812,
          iquest: 191,
          'iquest;': 191,
          'iscr;': [55349, 56510],
          'isin;': 8712,
          'isinE;': 8953,
          'isindot;': 8949,
          'isins;': 8948,
          'isinsv;': 8947,
          'isinv;': 8712,
          'it;': 8290,
          'itilde;': 297,
          'iukcy;': 1110,
          iuml: 239,
          'iuml;': 239,
          'jcirc;': 309,
          'jcy;': 1081,
          'jfr;': [55349, 56615],
          'jmath;': 567,
          'jopf;': [55349, 56667],
          'jscr;': [55349, 56511],
          'jsercy;': 1112,
          'jukcy;': 1108,
          'kappa;': 954,
          'kappav;': 1008,
          'kcedil;': 311,
          'kcy;': 1082,
          'kfr;': [55349, 56616],
          'kgreen;': 312,
          'khcy;': 1093,
          'kjcy;': 1116,
          'kopf;': [55349, 56668],
          'kscr;': [55349, 56512],
          'lAarr;': 8666,
          'lArr;': 8656,
          'lAtail;': 10523,
          'lBarr;': 10510,
          'lE;': 8806,
          'lEg;': 10891,
          'lHar;': 10594,
          'lacute;': 314,
          'laemptyv;': 10676,
          'lagran;': 8466,
          'lambda;': 955,
          'lang;': 10216,
          'langd;': 10641,
          'langle;': 10216,
          'lap;': 10885,
          laquo: 171,
          'laquo;': 171,
          'larr;': 8592,
          'larrb;': 8676,
          'larrbfs;': 10527,
          'larrfs;': 10525,
          'larrhk;': 8617,
          'larrlp;': 8619,
          'larrpl;': 10553,
          'larrsim;': 10611,
          'larrtl;': 8610,
          'lat;': 10923,
          'latail;': 10521,
          'late;': 10925,
          'lates;': [10925, 65024],
          'lbarr;': 10508,
          'lbbrk;': 10098,
          'lbrace;': 123,
          'lbrack;': 91,
          'lbrke;': 10635,
          'lbrksld;': 10639,
          'lbrkslu;': 10637,
          'lcaron;': 318,
          'lcedil;': 316,
          'lceil;': 8968,
          'lcub;': 123,
          'lcy;': 1083,
          'ldca;': 10550,
          'ldquo;': 8220,
          'ldquor;': 8222,
          'ldrdhar;': 10599,
          'ldrushar;': 10571,
          'ldsh;': 8626,
          'le;': 8804,
          'leftarrow;': 8592,
          'leftarrowtail;': 8610,
          'leftharpoondown;': 8637,
          'leftharpoonup;': 8636,
          'leftleftarrows;': 8647,
          'leftrightarrow;': 8596,
          'leftrightarrows;': 8646,
          'leftrightharpoons;': 8651,
          'leftrightsquigarrow;': 8621,
          'leftthreetimes;': 8907,
          'leg;': 8922,
          'leq;': 8804,
          'leqq;': 8806,
          'leqslant;': 10877,
          'les;': 10877,
          'lescc;': 10920,
          'lesdot;': 10879,
          'lesdoto;': 10881,
          'lesdotor;': 10883,
          'lesg;': [8922, 65024],
          'lesges;': 10899,
          'lessapprox;': 10885,
          'lessdot;': 8918,
          'lesseqgtr;': 8922,
          'lesseqqgtr;': 10891,
          'lessgtr;': 8822,
          'lesssim;': 8818,
          'lfisht;': 10620,
          'lfloor;': 8970,
          'lfr;': [55349, 56617],
          'lg;': 8822,
          'lgE;': 10897,
          'lhard;': 8637,
          'lharu;': 8636,
          'lharul;': 10602,
          'lhblk;': 9604,
          'ljcy;': 1113,
          'll;': 8810,
          'llarr;': 8647,
          'llcorner;': 8990,
          'llhard;': 10603,
          'lltri;': 9722,
          'lmidot;': 320,
          'lmoust;': 9136,
          'lmoustache;': 9136,
          'lnE;': 8808,
          'lnap;': 10889,
          'lnapprox;': 10889,
          'lne;': 10887,
          'lneq;': 10887,
          'lneqq;': 8808,
          'lnsim;': 8934,
          'loang;': 10220,
          'loarr;': 8701,
          'lobrk;': 10214,
          'longleftarrow;': 10229,
          'longleftrightarrow;': 10231,
          'longmapsto;': 10236,
          'longrightarrow;': 10230,
          'looparrowleft;': 8619,
          'looparrowright;': 8620,
          'lopar;': 10629,
          'lopf;': [55349, 56669],
          'loplus;': 10797,
          'lotimes;': 10804,
          'lowast;': 8727,
          'lowbar;': 95,
          'loz;': 9674,
          'lozenge;': 9674,
          'lozf;': 10731,
          'lpar;': 40,
          'lparlt;': 10643,
          'lrarr;': 8646,
          'lrcorner;': 8991,
          'lrhar;': 8651,
          'lrhard;': 10605,
          'lrm;': 8206,
          'lrtri;': 8895,
          'lsaquo;': 8249,
          'lscr;': [55349, 56513],
          'lsh;': 8624,
          'lsim;': 8818,
          'lsime;': 10893,
          'lsimg;': 10895,
          'lsqb;': 91,
          'lsquo;': 8216,
          'lsquor;': 8218,
          'lstrok;': 322,
          lt: 60,
          'lt;': 60,
          'ltcc;': 10918,
          'ltcir;': 10873,
          'ltdot;': 8918,
          'lthree;': 8907,
          'ltimes;': 8905,
          'ltlarr;': 10614,
          'ltquest;': 10875,
          'ltrPar;': 10646,
          'ltri;': 9667,
          'ltrie;': 8884,
          'ltrif;': 9666,
          'lurdshar;': 10570,
          'luruhar;': 10598,
          'lvertneqq;': [8808, 65024],
          'lvnE;': [8808, 65024],
          'mDDot;': 8762,
          macr: 175,
          'macr;': 175,
          'male;': 9794,
          'malt;': 10016,
          'maltese;': 10016,
          'map;': 8614,
          'mapsto;': 8614,
          'mapstodown;': 8615,
          'mapstoleft;': 8612,
          'mapstoup;': 8613,
          'marker;': 9646,
          'mcomma;': 10793,
          'mcy;': 1084,
          'mdash;': 8212,
          'measuredangle;': 8737,
          'mfr;': [55349, 56618],
          'mho;': 8487,
          micro: 181,
          'micro;': 181,
          'mid;': 8739,
          'midast;': 42,
          'midcir;': 10992,
          middot: 183,
          'middot;': 183,
          'minus;': 8722,
          'minusb;': 8863,
          'minusd;': 8760,
          'minusdu;': 10794,
          'mlcp;': 10971,
          'mldr;': 8230,
          'mnplus;': 8723,
          'models;': 8871,
          'mopf;': [55349, 56670],
          'mp;': 8723,
          'mscr;': [55349, 56514],
          'mstpos;': 8766,
          'mu;': 956,
          'multimap;': 8888,
          'mumap;': 8888,
          'nGg;': [8921, 824],
          'nGt;': [8811, 8402],
          'nGtv;': [8811, 824],
          'nLeftarrow;': 8653,
          'nLeftrightarrow;': 8654,
          'nLl;': [8920, 824],
          'nLt;': [8810, 8402],
          'nLtv;': [8810, 824],
          'nRightarrow;': 8655,
          'nVDash;': 8879,
          'nVdash;': 8878,
          'nabla;': 8711,
          'nacute;': 324,
          'nang;': [8736, 8402],
          'nap;': 8777,
          'napE;': [10864, 824],
          'napid;': [8779, 824],
          'napos;': 329,
          'napprox;': 8777,
          'natur;': 9838,
          'natural;': 9838,
          'naturals;': 8469,
          nbsp: 160,
          'nbsp;': 160,
          'nbump;': [8782, 824],
          'nbumpe;': [8783, 824],
          'ncap;': 10819,
          'ncaron;': 328,
          'ncedil;': 326,
          'ncong;': 8775,
          'ncongdot;': [10861, 824],
          'ncup;': 10818,
          'ncy;': 1085,
          'ndash;': 8211,
          'ne;': 8800,
          'neArr;': 8663,
          'nearhk;': 10532,
          'nearr;': 8599,
          'nearrow;': 8599,
          'nedot;': [8784, 824],
          'nequiv;': 8802,
          'nesear;': 10536,
          'nesim;': [8770, 824],
          'nexist;': 8708,
          'nexists;': 8708,
          'nfr;': [55349, 56619],
          'ngE;': [8807, 824],
          'nge;': 8817,
          'ngeq;': 8817,
          'ngeqq;': [8807, 824],
          'ngeqslant;': [10878, 824],
          'nges;': [10878, 824],
          'ngsim;': 8821,
          'ngt;': 8815,
          'ngtr;': 8815,
          'nhArr;': 8654,
          'nharr;': 8622,
          'nhpar;': 10994,
          'ni;': 8715,
          'nis;': 8956,
          'nisd;': 8954,
          'niv;': 8715,
          'njcy;': 1114,
          'nlArr;': 8653,
          'nlE;': [8806, 824],
          'nlarr;': 8602,
          'nldr;': 8229,
          'nle;': 8816,
          'nleftarrow;': 8602,
          'nleftrightarrow;': 8622,
          'nleq;': 8816,
          'nleqq;': [8806, 824],
          'nleqslant;': [10877, 824],
          'nles;': [10877, 824],
          'nless;': 8814,
          'nlsim;': 8820,
          'nlt;': 8814,
          'nltri;': 8938,
          'nltrie;': 8940,
          'nmid;': 8740,
          'nopf;': [55349, 56671],
          not: 172,
          'not;': 172,
          'notin;': 8713,
          'notinE;': [8953, 824],
          'notindot;': [8949, 824],
          'notinva;': 8713,
          'notinvb;': 8951,
          'notinvc;': 8950,
          'notni;': 8716,
          'notniva;': 8716,
          'notnivb;': 8958,
          'notnivc;': 8957,
          'npar;': 8742,
          'nparallel;': 8742,
          'nparsl;': [11005, 8421],
          'npart;': [8706, 824],
          'npolint;': 10772,
          'npr;': 8832,
          'nprcue;': 8928,
          'npre;': [10927, 824],
          'nprec;': 8832,
          'npreceq;': [10927, 824],
          'nrArr;': 8655,
          'nrarr;': 8603,
          'nrarrc;': [10547, 824],
          'nrarrw;': [8605, 824],
          'nrightarrow;': 8603,
          'nrtri;': 8939,
          'nrtrie;': 8941,
          'nsc;': 8833,
          'nsccue;': 8929,
          'nsce;': [10928, 824],
          'nscr;': [55349, 56515],
          'nshortmid;': 8740,
          'nshortparallel;': 8742,
          'nsim;': 8769,
          'nsime;': 8772,
          'nsimeq;': 8772,
          'nsmid;': 8740,
          'nspar;': 8742,
          'nsqsube;': 8930,
          'nsqsupe;': 8931,
          'nsub;': 8836,
          'nsubE;': [10949, 824],
          'nsube;': 8840,
          'nsubset;': [8834, 8402],
          'nsubseteq;': 8840,
          'nsubseteqq;': [10949, 824],
          'nsucc;': 8833,
          'nsucceq;': [10928, 824],
          'nsup;': 8837,
          'nsupE;': [10950, 824],
          'nsupe;': 8841,
          'nsupset;': [8835, 8402],
          'nsupseteq;': 8841,
          'nsupseteqq;': [10950, 824],
          'ntgl;': 8825,
          ntilde: 241,
          'ntilde;': 241,
          'ntlg;': 8824,
          'ntriangleleft;': 8938,
          'ntrianglelefteq;': 8940,
          'ntriangleright;': 8939,
          'ntrianglerighteq;': 8941,
          'nu;': 957,
          'num;': 35,
          'numero;': 8470,
          'numsp;': 8199,
          'nvDash;': 8877,
          'nvHarr;': 10500,
          'nvap;': [8781, 8402],
          'nvdash;': 8876,
          'nvge;': [8805, 8402],
          'nvgt;': [62, 8402],
          'nvinfin;': 10718,
          'nvlArr;': 10498,
          'nvle;': [8804, 8402],
          'nvlt;': [60, 8402],
          'nvltrie;': [8884, 8402],
          'nvrArr;': 10499,
          'nvrtrie;': [8885, 8402],
          'nvsim;': [8764, 8402],
          'nwArr;': 8662,
          'nwarhk;': 10531,
          'nwarr;': 8598,
          'nwarrow;': 8598,
          'nwnear;': 10535,
          'oS;': 9416,
          oacute: 243,
          'oacute;': 243,
          'oast;': 8859,
          'ocir;': 8858,
          ocirc: 244,
          'ocirc;': 244,
          'ocy;': 1086,
          'odash;': 8861,
          'odblac;': 337,
          'odiv;': 10808,
          'odot;': 8857,
          'odsold;': 10684,
          'oelig;': 339,
          'ofcir;': 10687,
          'ofr;': [55349, 56620],
          'ogon;': 731,
          ograve: 242,
          'ograve;': 242,
          'ogt;': 10689,
          'ohbar;': 10677,
          'ohm;': 937,
          'oint;': 8750,
          'olarr;': 8634,
          'olcir;': 10686,
          'olcross;': 10683,
          'oline;': 8254,
          'olt;': 10688,
          'omacr;': 333,
          'omega;': 969,
          'omicron;': 959,
          'omid;': 10678,
          'ominus;': 8854,
          'oopf;': [55349, 56672],
          'opar;': 10679,
          'operp;': 10681,
          'oplus;': 8853,
          'or;': 8744,
          'orarr;': 8635,
          'ord;': 10845,
          'order;': 8500,
          'orderof;': 8500,
          ordf: 170,
          'ordf;': 170,
          ordm: 186,
          'ordm;': 186,
          'origof;': 8886,
          'oror;': 10838,
          'orslope;': 10839,
          'orv;': 10843,
          'oscr;': 8500,
          oslash: 248,
          'oslash;': 248,
          'osol;': 8856,
          otilde: 245,
          'otilde;': 245,
          'otimes;': 8855,
          'otimesas;': 10806,
          ouml: 246,
          'ouml;': 246,
          'ovbar;': 9021,
          'par;': 8741,
          para: 182,
          'para;': 182,
          'parallel;': 8741,
          'parsim;': 10995,
          'parsl;': 11005,
          'part;': 8706,
          'pcy;': 1087,
          'percnt;': 37,
          'period;': 46,
          'permil;': 8240,
          'perp;': 8869,
          'pertenk;': 8241,
          'pfr;': [55349, 56621],
          'phi;': 966,
          'phiv;': 981,
          'phmmat;': 8499,
          'phone;': 9742,
          'pi;': 960,
          'pitchfork;': 8916,
          'piv;': 982,
          'planck;': 8463,
          'planckh;': 8462,
          'plankv;': 8463,
          'plus;': 43,
          'plusacir;': 10787,
          'plusb;': 8862,
          'pluscir;': 10786,
          'plusdo;': 8724,
          'plusdu;': 10789,
          'pluse;': 10866,
          plusmn: 177,
          'plusmn;': 177,
          'plussim;': 10790,
          'plustwo;': 10791,
          'pm;': 177,
          'pointint;': 10773,
          'popf;': [55349, 56673],
          pound: 163,
          'pound;': 163,
          'pr;': 8826,
          'prE;': 10931,
          'prap;': 10935,
          'prcue;': 8828,
          'pre;': 10927,
          'prec;': 8826,
          'precapprox;': 10935,
          'preccurlyeq;': 8828,
          'preceq;': 10927,
          'precnapprox;': 10937,
          'precneqq;': 10933,
          'precnsim;': 8936,
          'precsim;': 8830,
          'prime;': 8242,
          'primes;': 8473,
          'prnE;': 10933,
          'prnap;': 10937,
          'prnsim;': 8936,
          'prod;': 8719,
          'profalar;': 9006,
          'profline;': 8978,
          'profsurf;': 8979,
          'prop;': 8733,
          'propto;': 8733,
          'prsim;': 8830,
          'prurel;': 8880,
          'pscr;': [55349, 56517],
          'psi;': 968,
          'puncsp;': 8200,
          'qfr;': [55349, 56622],
          'qint;': 10764,
          'qopf;': [55349, 56674],
          'qprime;': 8279,
          'qscr;': [55349, 56518],
          'quaternions;': 8461,
          'quatint;': 10774,
          'quest;': 63,
          'questeq;': 8799,
          quot: 34,
          'quot;': 34,
          'rAarr;': 8667,
          'rArr;': 8658,
          'rAtail;': 10524,
          'rBarr;': 10511,
          'rHar;': 10596,
          'race;': [8765, 817],
          'racute;': 341,
          'radic;': 8730,
          'raemptyv;': 10675,
          'rang;': 10217,
          'rangd;': 10642,
          'range;': 10661,
          'rangle;': 10217,
          raquo: 187,
          'raquo;': 187,
          'rarr;': 8594,
          'rarrap;': 10613,
          'rarrb;': 8677,
          'rarrbfs;': 10528,
          'rarrc;': 10547,
          'rarrfs;': 10526,
          'rarrhk;': 8618,
          'rarrlp;': 8620,
          'rarrpl;': 10565,
          'rarrsim;': 10612,
          'rarrtl;': 8611,
          'rarrw;': 8605,
          'ratail;': 10522,
          'ratio;': 8758,
          'rationals;': 8474,
          'rbarr;': 10509,
          'rbbrk;': 10099,
          'rbrace;': 125,
          'rbrack;': 93,
          'rbrke;': 10636,
          'rbrksld;': 10638,
          'rbrkslu;': 10640,
          'rcaron;': 345,
          'rcedil;': 343,
          'rceil;': 8969,
          'rcub;': 125,
          'rcy;': 1088,
          'rdca;': 10551,
          'rdldhar;': 10601,
          'rdquo;': 8221,
          'rdquor;': 8221,
          'rdsh;': 8627,
          'real;': 8476,
          'realine;': 8475,
          'realpart;': 8476,
          'reals;': 8477,
          'rect;': 9645,
          reg: 174,
          'reg;': 174,
          'rfisht;': 10621,
          'rfloor;': 8971,
          'rfr;': [55349, 56623],
          'rhard;': 8641,
          'rharu;': 8640,
          'rharul;': 10604,
          'rho;': 961,
          'rhov;': 1009,
          'rightarrow;': 8594,
          'rightarrowtail;': 8611,
          'rightharpoondown;': 8641,
          'rightharpoonup;': 8640,
          'rightleftarrows;': 8644,
          'rightleftharpoons;': 8652,
          'rightrightarrows;': 8649,
          'rightsquigarrow;': 8605,
          'rightthreetimes;': 8908,
          'ring;': 730,
          'risingdotseq;': 8787,
          'rlarr;': 8644,
          'rlhar;': 8652,
          'rlm;': 8207,
          'rmoust;': 9137,
          'rmoustache;': 9137,
          'rnmid;': 10990,
          'roang;': 10221,
          'roarr;': 8702,
          'robrk;': 10215,
          'ropar;': 10630,
          'ropf;': [55349, 56675],
          'roplus;': 10798,
          'rotimes;': 10805,
          'rpar;': 41,
          'rpargt;': 10644,
          'rppolint;': 10770,
          'rrarr;': 8649,
          'rsaquo;': 8250,
          'rscr;': [55349, 56519],
          'rsh;': 8625,
          'rsqb;': 93,
          'rsquo;': 8217,
          'rsquor;': 8217,
          'rthree;': 8908,
          'rtimes;': 8906,
          'rtri;': 9657,
          'rtrie;': 8885,
          'rtrif;': 9656,
          'rtriltri;': 10702,
          'ruluhar;': 10600,
          'rx;': 8478,
          'sacute;': 347,
          'sbquo;': 8218,
          'sc;': 8827,
          'scE;': 10932,
          'scap;': 10936,
          'scaron;': 353,
          'sccue;': 8829,
          'sce;': 10928,
          'scedil;': 351,
          'scirc;': 349,
          'scnE;': 10934,
          'scnap;': 10938,
          'scnsim;': 8937,
          'scpolint;': 10771,
          'scsim;': 8831,
          'scy;': 1089,
          'sdot;': 8901,
          'sdotb;': 8865,
          'sdote;': 10854,
          'seArr;': 8664,
          'searhk;': 10533,
          'searr;': 8600,
          'searrow;': 8600,
          sect: 167,
          'sect;': 167,
          'semi;': 59,
          'seswar;': 10537,
          'setminus;': 8726,
          'setmn;': 8726,
          'sext;': 10038,
          'sfr;': [55349, 56624],
          'sfrown;': 8994,
          'sharp;': 9839,
          'shchcy;': 1097,
          'shcy;': 1096,
          'shortmid;': 8739,
          'shortparallel;': 8741,
          shy: 173,
          'shy;': 173,
          'sigma;': 963,
          'sigmaf;': 962,
          'sigmav;': 962,
          'sim;': 8764,
          'simdot;': 10858,
          'sime;': 8771,
          'simeq;': 8771,
          'simg;': 10910,
          'simgE;': 10912,
          'siml;': 10909,
          'simlE;': 10911,
          'simne;': 8774,
          'simplus;': 10788,
          'simrarr;': 10610,
          'slarr;': 8592,
          'smallsetminus;': 8726,
          'smashp;': 10803,
          'smeparsl;': 10724,
          'smid;': 8739,
          'smile;': 8995,
          'smt;': 10922,
          'smte;': 10924,
          'smtes;': [10924, 65024],
          'softcy;': 1100,
          'sol;': 47,
          'solb;': 10692,
          'solbar;': 9023,
          'sopf;': [55349, 56676],
          'spades;': 9824,
          'spadesuit;': 9824,
          'spar;': 8741,
          'sqcap;': 8851,
          'sqcaps;': [8851, 65024],
          'sqcup;': 8852,
          'sqcups;': [8852, 65024],
          'sqsub;': 8847,
          'sqsube;': 8849,
          'sqsubset;': 8847,
          'sqsubseteq;': 8849,
          'sqsup;': 8848,
          'sqsupe;': 8850,
          'sqsupset;': 8848,
          'sqsupseteq;': 8850,
          'squ;': 9633,
          'square;': 9633,
          'squarf;': 9642,
          'squf;': 9642,
          'srarr;': 8594,
          'sscr;': [55349, 56520],
          'ssetmn;': 8726,
          'ssmile;': 8995,
          'sstarf;': 8902,
          'star;': 9734,
          'starf;': 9733,
          'straightepsilon;': 1013,
          'straightphi;': 981,
          'strns;': 175,
          'sub;': 8834,
          'subE;': 10949,
          'subdot;': 10941,
          'sube;': 8838,
          'subedot;': 10947,
          'submult;': 10945,
          'subnE;': 10955,
          'subne;': 8842,
          'subplus;': 10943,
          'subrarr;': 10617,
          'subset;': 8834,
          'subseteq;': 8838,
          'subseteqq;': 10949,
          'subsetneq;': 8842,
          'subsetneqq;': 10955,
          'subsim;': 10951,
          'subsub;': 10965,
          'subsup;': 10963,
          'succ;': 8827,
          'succapprox;': 10936,
          'succcurlyeq;': 8829,
          'succeq;': 10928,
          'succnapprox;': 10938,
          'succneqq;': 10934,
          'succnsim;': 8937,
          'succsim;': 8831,
          'sum;': 8721,
          'sung;': 9834,
          sup1: 185,
          'sup1;': 185,
          sup2: 178,
          'sup2;': 178,
          sup3: 179,
          'sup3;': 179,
          'sup;': 8835,
          'supE;': 10950,
          'supdot;': 10942,
          'supdsub;': 10968,
          'supe;': 8839,
          'supedot;': 10948,
          'suphsol;': 10185,
          'suphsub;': 10967,
          'suplarr;': 10619,
          'supmult;': 10946,
          'supnE;': 10956,
          'supne;': 8843,
          'supplus;': 10944,
          'supset;': 8835,
          'supseteq;': 8839,
          'supseteqq;': 10950,
          'supsetneq;': 8843,
          'supsetneqq;': 10956,
          'supsim;': 10952,
          'supsub;': 10964,
          'supsup;': 10966,
          'swArr;': 8665,
          'swarhk;': 10534,
          'swarr;': 8601,
          'swarrow;': 8601,
          'swnwar;': 10538,
          szlig: 223,
          'szlig;': 223,
          'target;': 8982,
          'tau;': 964,
          'tbrk;': 9140,
          'tcaron;': 357,
          'tcedil;': 355,
          'tcy;': 1090,
          'tdot;': 8411,
          'telrec;': 8981,
          'tfr;': [55349, 56625],
          'there4;': 8756,
          'therefore;': 8756,
          'theta;': 952,
          'thetasym;': 977,
          'thetav;': 977,
          'thickapprox;': 8776,
          'thicksim;': 8764,
          'thinsp;': 8201,
          'thkap;': 8776,
          'thksim;': 8764,
          thorn: 254,
          'thorn;': 254,
          'tilde;': 732,
          times: 215,
          'times;': 215,
          'timesb;': 8864,
          'timesbar;': 10801,
          'timesd;': 10800,
          'tint;': 8749,
          'toea;': 10536,
          'top;': 8868,
          'topbot;': 9014,
          'topcir;': 10993,
          'topf;': [55349, 56677],
          'topfork;': 10970,
          'tosa;': 10537,
          'tprime;': 8244,
          'trade;': 8482,
          'triangle;': 9653,
          'triangledown;': 9663,
          'triangleleft;': 9667,
          'trianglelefteq;': 8884,
          'triangleq;': 8796,
          'triangleright;': 9657,
          'trianglerighteq;': 8885,
          'tridot;': 9708,
          'trie;': 8796,
          'triminus;': 10810,
          'triplus;': 10809,
          'trisb;': 10701,
          'tritime;': 10811,
          'trpezium;': 9186,
          'tscr;': [55349, 56521],
          'tscy;': 1094,
          'tshcy;': 1115,
          'tstrok;': 359,
          'twixt;': 8812,
          'twoheadleftarrow;': 8606,
          'twoheadrightarrow;': 8608,
          'uArr;': 8657,
          'uHar;': 10595,
          uacute: 250,
          'uacute;': 250,
          'uarr;': 8593,
          'ubrcy;': 1118,
          'ubreve;': 365,
          ucirc: 251,
          'ucirc;': 251,
          'ucy;': 1091,
          'udarr;': 8645,
          'udblac;': 369,
          'udhar;': 10606,
          'ufisht;': 10622,
          'ufr;': [55349, 56626],
          ugrave: 249,
          'ugrave;': 249,
          'uharl;': 8639,
          'uharr;': 8638,
          'uhblk;': 9600,
          'ulcorn;': 8988,
          'ulcorner;': 8988,
          'ulcrop;': 8975,
          'ultri;': 9720,
          'umacr;': 363,
          uml: 168,
          'uml;': 168,
          'uogon;': 371,
          'uopf;': [55349, 56678],
          'uparrow;': 8593,
          'updownarrow;': 8597,
          'upharpoonleft;': 8639,
          'upharpoonright;': 8638,
          'uplus;': 8846,
          'upsi;': 965,
          'upsih;': 978,
          'upsilon;': 965,
          'upuparrows;': 8648,
          'urcorn;': 8989,
          'urcorner;': 8989,
          'urcrop;': 8974,
          'uring;': 367,
          'urtri;': 9721,
          'uscr;': [55349, 56522],
          'utdot;': 8944,
          'utilde;': 361,
          'utri;': 9653,
          'utrif;': 9652,
          'uuarr;': 8648,
          uuml: 252,
          'uuml;': 252,
          'uwangle;': 10663,
          'vArr;': 8661,
          'vBar;': 10984,
          'vBarv;': 10985,
          'vDash;': 8872,
          'vangrt;': 10652,
          'varepsilon;': 1013,
          'varkappa;': 1008,
          'varnothing;': 8709,
          'varphi;': 981,
          'varpi;': 982,
          'varpropto;': 8733,
          'varr;': 8597,
          'varrho;': 1009,
          'varsigma;': 962,
          'varsubsetneq;': [8842, 65024],
          'varsubsetneqq;': [10955, 65024],
          'varsupsetneq;': [8843, 65024],
          'varsupsetneqq;': [10956, 65024],
          'vartheta;': 977,
          'vartriangleleft;': 8882,
          'vartriangleright;': 8883,
          'vcy;': 1074,
          'vdash;': 8866,
          'vee;': 8744,
          'veebar;': 8891,
          'veeeq;': 8794,
          'vellip;': 8942,
          'verbar;': 124,
          'vert;': 124,
          'vfr;': [55349, 56627],
          'vltri;': 8882,
          'vnsub;': [8834, 8402],
          'vnsup;': [8835, 8402],
          'vopf;': [55349, 56679],
          'vprop;': 8733,
          'vrtri;': 8883,
          'vscr;': [55349, 56523],
          'vsubnE;': [10955, 65024],
          'vsubne;': [8842, 65024],
          'vsupnE;': [10956, 65024],
          'vsupne;': [8843, 65024],
          'vzigzag;': 10650,
          'wcirc;': 373,
          'wedbar;': 10847,
          'wedge;': 8743,
          'wedgeq;': 8793,
          'weierp;': 8472,
          'wfr;': [55349, 56628],
          'wopf;': [55349, 56680],
          'wp;': 8472,
          'wr;': 8768,
          'wreath;': 8768,
          'wscr;': [55349, 56524],
          'xcap;': 8898,
          'xcirc;': 9711,
          'xcup;': 8899,
          'xdtri;': 9661,
          'xfr;': [55349, 56629],
          'xhArr;': 10234,
          'xharr;': 10231,
          'xi;': 958,
          'xlArr;': 10232,
          'xlarr;': 10229,
          'xmap;': 10236,
          'xnis;': 8955,
          'xodot;': 10752,
          'xopf;': [55349, 56681],
          'xoplus;': 10753,
          'xotime;': 10754,
          'xrArr;': 10233,
          'xrarr;': 10230,
          'xscr;': [55349, 56525],
          'xsqcup;': 10758,
          'xuplus;': 10756,
          'xutri;': 9651,
          'xvee;': 8897,
          'xwedge;': 8896,
          yacute: 253,
          'yacute;': 253,
          'yacy;': 1103,
          'ycirc;': 375,
          'ycy;': 1099,
          yen: 165,
          'yen;': 165,
          'yfr;': [55349, 56630],
          'yicy;': 1111,
          'yopf;': [55349, 56682],
          'yscr;': [55349, 56526],
          'yucy;': 1102,
          yuml: 255,
          'yuml;': 255,
          'zacute;': 378,
          'zcaron;': 382,
          'zcy;': 1079,
          'zdot;': 380,
          'zeetrf;': 8488,
          'zeta;': 950,
          'zfr;': [55349, 56631],
          'zhcy;': 1078,
          'zigrarr;': 8669,
          'zopf;': [55349, 56683],
          'zscr;': [55349, 56527],
          'zwj;': 8205,
          'zwnj;': 8204,
        },
        vt =
          /(A(?:Elig;?|MP;?|acute;?|breve;|c(?:irc;?|y;)|fr;|grave;?|lpha;|macr;|nd;|o(?:gon;|pf;)|pplyFunction;|ring;?|s(?:cr;|sign;)|tilde;?|uml;?)|B(?:a(?:ckslash;|r(?:v;|wed;))|cy;|e(?:cause;|rnoullis;|ta;)|fr;|opf;|reve;|scr;|umpeq;)|C(?:Hcy;|OPY;?|a(?:cute;|p(?:;|italDifferentialD;)|yleys;)|c(?:aron;|edil;?|irc;|onint;)|dot;|e(?:dilla;|nterDot;)|fr;|hi;|ircle(?:Dot;|Minus;|Plus;|Times;)|lo(?:ckwiseContourIntegral;|seCurly(?:DoubleQuote;|Quote;))|o(?:lon(?:;|e;)|n(?:gruent;|int;|tourIntegral;)|p(?:f;|roduct;)|unterClockwiseContourIntegral;)|ross;|scr;|up(?:;|Cap;))|D(?:D(?:;|otrahd;)|Jcy;|Scy;|Zcy;|a(?:gger;|rr;|shv;)|c(?:aron;|y;)|el(?:;|ta;)|fr;|i(?:a(?:critical(?:Acute;|Do(?:t;|ubleAcute;)|Grave;|Tilde;)|mond;)|fferentialD;)|o(?:pf;|t(?:;|Dot;|Equal;)|uble(?:ContourIntegral;|Do(?:t;|wnArrow;)|L(?:eft(?:Arrow;|RightArrow;|Tee;)|ong(?:Left(?:Arrow;|RightArrow;)|RightArrow;))|Right(?:Arrow;|Tee;)|Up(?:Arrow;|DownArrow;)|VerticalBar;)|wn(?:Arrow(?:;|Bar;|UpArrow;)|Breve;|Left(?:RightVector;|TeeVector;|Vector(?:;|Bar;))|Right(?:TeeVector;|Vector(?:;|Bar;))|Tee(?:;|Arrow;)|arrow;))|s(?:cr;|trok;))|E(?:NG;|TH;?|acute;?|c(?:aron;|irc;?|y;)|dot;|fr;|grave;?|lement;|m(?:acr;|pty(?:SmallSquare;|VerySmallSquare;))|o(?:gon;|pf;)|psilon;|qu(?:al(?:;|Tilde;)|ilibrium;)|s(?:cr;|im;)|ta;|uml;?|x(?:ists;|ponentialE;))|F(?:cy;|fr;|illed(?:SmallSquare;|VerySmallSquare;)|o(?:pf;|rAll;|uriertrf;)|scr;)|G(?:Jcy;|T;?|amma(?:;|d;)|breve;|c(?:edil;|irc;|y;)|dot;|fr;|g;|opf;|reater(?:Equal(?:;|Less;)|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;)|scr;|t;)|H(?:ARDcy;|a(?:cek;|t;)|circ;|fr;|ilbertSpace;|o(?:pf;|rizontalLine;)|s(?:cr;|trok;)|ump(?:DownHump;|Equal;))|I(?:Ecy;|Jlig;|Ocy;|acute;?|c(?:irc;?|y;)|dot;|fr;|grave;?|m(?:;|a(?:cr;|ginaryI;)|plies;)|n(?:t(?:;|e(?:gral;|rsection;))|visible(?:Comma;|Times;))|o(?:gon;|pf;|ta;)|scr;|tilde;|u(?:kcy;|ml;?))|J(?:c(?:irc;|y;)|fr;|opf;|s(?:cr;|ercy;)|ukcy;)|K(?:Hcy;|Jcy;|appa;|c(?:edil;|y;)|fr;|opf;|scr;)|L(?:Jcy;|T;?|a(?:cute;|mbda;|ng;|placetrf;|rr;)|c(?:aron;|edil;|y;)|e(?:ft(?:A(?:ngleBracket;|rrow(?:;|Bar;|RightArrow;))|Ceiling;|Do(?:ubleBracket;|wn(?:TeeVector;|Vector(?:;|Bar;)))|Floor;|Right(?:Arrow;|Vector;)|T(?:ee(?:;|Arrow;|Vector;)|riangle(?:;|Bar;|Equal;))|Up(?:DownVector;|TeeVector;|Vector(?:;|Bar;))|Vector(?:;|Bar;)|arrow;|rightarrow;)|ss(?:EqualGreater;|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;))|fr;|l(?:;|eftarrow;)|midot;|o(?:ng(?:Left(?:Arrow;|RightArrow;)|RightArrow;|left(?:arrow;|rightarrow;)|rightarrow;)|pf;|wer(?:LeftArrow;|RightArrow;))|s(?:cr;|h;|trok;)|t;)|M(?:ap;|cy;|e(?:diumSpace;|llintrf;)|fr;|inusPlus;|opf;|scr;|u;)|N(?:Jcy;|acute;|c(?:aron;|edil;|y;)|e(?:gative(?:MediumSpace;|Thi(?:ckSpace;|nSpace;)|VeryThinSpace;)|sted(?:GreaterGreater;|LessLess;)|wLine;)|fr;|o(?:Break;|nBreakingSpace;|pf;|t(?:;|C(?:ongruent;|upCap;)|DoubleVerticalBar;|E(?:lement;|qual(?:;|Tilde;)|xists;)|Greater(?:;|Equal;|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;)|Hump(?:DownHump;|Equal;)|Le(?:ftTriangle(?:;|Bar;|Equal;)|ss(?:;|Equal;|Greater;|Less;|SlantEqual;|Tilde;))|Nested(?:GreaterGreater;|LessLess;)|Precedes(?:;|Equal;|SlantEqual;)|R(?:everseElement;|ightTriangle(?:;|Bar;|Equal;))|S(?:quareSu(?:bset(?:;|Equal;)|perset(?:;|Equal;))|u(?:bset(?:;|Equal;)|cceeds(?:;|Equal;|SlantEqual;|Tilde;)|perset(?:;|Equal;)))|Tilde(?:;|Equal;|FullEqual;|Tilde;)|VerticalBar;))|scr;|tilde;?|u;)|O(?:Elig;|acute;?|c(?:irc;?|y;)|dblac;|fr;|grave;?|m(?:acr;|ega;|icron;)|opf;|penCurly(?:DoubleQuote;|Quote;)|r;|s(?:cr;|lash;?)|ti(?:lde;?|mes;)|uml;?|ver(?:B(?:ar;|rac(?:e;|ket;))|Parenthesis;))|P(?:artialD;|cy;|fr;|hi;|i;|lusMinus;|o(?:incareplane;|pf;)|r(?:;|ecedes(?:;|Equal;|SlantEqual;|Tilde;)|ime;|o(?:duct;|portion(?:;|al;)))|s(?:cr;|i;))|Q(?:UOT;?|fr;|opf;|scr;)|R(?:Barr;|EG;?|a(?:cute;|ng;|rr(?:;|tl;))|c(?:aron;|edil;|y;)|e(?:;|verse(?:E(?:lement;|quilibrium;)|UpEquilibrium;))|fr;|ho;|ight(?:A(?:ngleBracket;|rrow(?:;|Bar;|LeftArrow;))|Ceiling;|Do(?:ubleBracket;|wn(?:TeeVector;|Vector(?:;|Bar;)))|Floor;|T(?:ee(?:;|Arrow;|Vector;)|riangle(?:;|Bar;|Equal;))|Up(?:DownVector;|TeeVector;|Vector(?:;|Bar;))|Vector(?:;|Bar;)|arrow;)|o(?:pf;|undImplies;)|rightarrow;|s(?:cr;|h;)|uleDelayed;)|S(?:H(?:CHcy;|cy;)|OFTcy;|acute;|c(?:;|aron;|edil;|irc;|y;)|fr;|hort(?:DownArrow;|LeftArrow;|RightArrow;|UpArrow;)|igma;|mallCircle;|opf;|q(?:rt;|uare(?:;|Intersection;|Su(?:bset(?:;|Equal;)|perset(?:;|Equal;))|Union;))|scr;|tar;|u(?:b(?:;|set(?:;|Equal;))|c(?:ceeds(?:;|Equal;|SlantEqual;|Tilde;)|hThat;)|m;|p(?:;|erset(?:;|Equal;)|set;)))|T(?:HORN;?|RADE;|S(?:Hcy;|cy;)|a(?:b;|u;)|c(?:aron;|edil;|y;)|fr;|h(?:e(?:refore;|ta;)|i(?:ckSpace;|nSpace;))|ilde(?:;|Equal;|FullEqual;|Tilde;)|opf;|ripleDot;|s(?:cr;|trok;))|U(?:a(?:cute;?|rr(?:;|ocir;))|br(?:cy;|eve;)|c(?:irc;?|y;)|dblac;|fr;|grave;?|macr;|n(?:der(?:B(?:ar;|rac(?:e;|ket;))|Parenthesis;)|ion(?:;|Plus;))|o(?:gon;|pf;)|p(?:Arrow(?:;|Bar;|DownArrow;)|DownArrow;|Equilibrium;|Tee(?:;|Arrow;)|arrow;|downarrow;|per(?:LeftArrow;|RightArrow;)|si(?:;|lon;))|ring;|scr;|tilde;|uml;?)|V(?:Dash;|bar;|cy;|dash(?:;|l;)|e(?:e;|r(?:bar;|t(?:;|ical(?:Bar;|Line;|Separator;|Tilde;))|yThinSpace;))|fr;|opf;|scr;|vdash;)|W(?:circ;|edge;|fr;|opf;|scr;)|X(?:fr;|i;|opf;|scr;)|Y(?:Acy;|Icy;|Ucy;|acute;?|c(?:irc;|y;)|fr;|opf;|scr;|uml;)|Z(?:Hcy;|acute;|c(?:aron;|y;)|dot;|e(?:roWidthSpace;|ta;)|fr;|opf;|scr;)|a(?:acute;?|breve;|c(?:;|E;|d;|irc;?|ute;?|y;)|elig;?|f(?:;|r;)|grave;?|l(?:e(?:fsym;|ph;)|pha;)|m(?:a(?:cr;|lg;)|p;?)|n(?:d(?:;|and;|d;|slope;|v;)|g(?:;|e;|le;|msd(?:;|a(?:a;|b;|c;|d;|e;|f;|g;|h;))|rt(?:;|vb(?:;|d;))|s(?:ph;|t;)|zarr;))|o(?:gon;|pf;)|p(?:;|E;|acir;|e;|id;|os;|prox(?:;|eq;))|ring;?|s(?:cr;|t;|ymp(?:;|eq;))|tilde;?|uml;?|w(?:conint;|int;))|b(?:Not;|a(?:ck(?:cong;|epsilon;|prime;|sim(?:;|eq;))|r(?:vee;|wed(?:;|ge;)))|brk(?:;|tbrk;)|c(?:ong;|y;)|dquo;|e(?:caus(?:;|e;)|mptyv;|psi;|rnou;|t(?:a;|h;|ween;))|fr;|ig(?:c(?:ap;|irc;|up;)|o(?:dot;|plus;|times;)|s(?:qcup;|tar;)|triangle(?:down;|up;)|uplus;|vee;|wedge;)|karow;|l(?:a(?:ck(?:lozenge;|square;|triangle(?:;|down;|left;|right;))|nk;)|k(?:1(?:2;|4;)|34;)|ock;)|n(?:e(?:;|quiv;)|ot;)|o(?:pf;|t(?:;|tom;)|wtie;|x(?:D(?:L;|R;|l;|r;)|H(?:;|D;|U;|d;|u;)|U(?:L;|R;|l;|r;)|V(?:;|H;|L;|R;|h;|l;|r;)|box;|d(?:L;|R;|l;|r;)|h(?:;|D;|U;|d;|u;)|minus;|plus;|times;|u(?:L;|R;|l;|r;)|v(?:;|H;|L;|R;|h;|l;|r;)))|prime;|r(?:eve;|vbar;?)|s(?:cr;|emi;|im(?:;|e;)|ol(?:;|b;|hsub;))|u(?:ll(?:;|et;)|mp(?:;|E;|e(?:;|q;))))|c(?:a(?:cute;|p(?:;|and;|brcup;|c(?:ap;|up;)|dot;|s;)|r(?:et;|on;))|c(?:a(?:ps;|ron;)|edil;?|irc;|ups(?:;|sm;))|dot;|e(?:dil;?|mptyv;|nt(?:;|erdot;|))|fr;|h(?:cy;|eck(?:;|mark;)|i;)|ir(?:;|E;|c(?:;|eq;|le(?:arrow(?:left;|right;)|d(?:R;|S;|ast;|circ;|dash;)))|e;|fnint;|mid;|scir;)|lubs(?:;|uit;)|o(?:lon(?:;|e(?:;|q;))|m(?:ma(?:;|t;)|p(?:;|fn;|le(?:ment;|xes;)))|n(?:g(?:;|dot;)|int;)|p(?:f;|rod;|y(?:;|sr;|)))|r(?:arr;|oss;)|s(?:cr;|u(?:b(?:;|e;)|p(?:;|e;)))|tdot;|u(?:darr(?:l;|r;)|e(?:pr;|sc;)|larr(?:;|p;)|p(?:;|brcap;|c(?:ap;|up;)|dot;|or;|s;)|r(?:arr(?:;|m;)|ly(?:eq(?:prec;|succ;)|vee;|wedge;)|ren;?|vearrow(?:left;|right;))|vee;|wed;)|w(?:conint;|int;)|ylcty;)|d(?:Arr;|Har;|a(?:gger;|leth;|rr;|sh(?:;|v;))|b(?:karow;|lac;)|c(?:aron;|y;)|d(?:;|a(?:gger;|rr;)|otseq;)|e(?:g;?|lta;|mptyv;)|f(?:isht;|r;)|har(?:l;|r;)|i(?:am(?:;|ond(?:;|suit;)|s;)|e;|gamma;|sin;|v(?:;|ide(?:;|ontimes;|)|onx;))|jcy;|lc(?:orn;|rop;)|o(?:llar;|pf;|t(?:;|eq(?:;|dot;)|minus;|plus;|square;)|ublebarwedge;|wn(?:arrow;|downarrows;|harpoon(?:left;|right;)))|r(?:bkarow;|c(?:orn;|rop;))|s(?:c(?:r;|y;)|ol;|trok;)|t(?:dot;|ri(?:;|f;))|u(?:arr;|har;)|wangle;|z(?:cy;|igrarr;))|e(?:D(?:Dot;|ot;)|a(?:cute;?|ster;)|c(?:aron;|ir(?:;|c;?)|olon;|y;)|dot;|e;|f(?:Dot;|r;)|g(?:;|rave;?|s(?:;|dot;))|l(?:;|inters;|l;|s(?:;|dot;))|m(?:acr;|pty(?:;|set;|v;)|sp(?:1(?:3;|4;)|;))|n(?:g;|sp;)|o(?:gon;|pf;)|p(?:ar(?:;|sl;)|lus;|si(?:;|lon;|v;))|q(?:c(?:irc;|olon;)|s(?:im;|lant(?:gtr;|less;))|u(?:als;|est;|iv(?:;|DD;))|vparsl;)|r(?:Dot;|arr;)|s(?:cr;|dot;|im;)|t(?:a;|h;?)|u(?:ml;?|ro;)|x(?:cl;|ist;|p(?:ectation;|onentiale;)))|f(?:allingdotseq;|cy;|emale;|f(?:ilig;|l(?:ig;|lig;)|r;)|ilig;|jlig;|l(?:at;|lig;|tns;)|nof;|o(?:pf;|r(?:all;|k(?:;|v;)))|partint;|r(?:a(?:c(?:1(?:2;?|3;|4;?|5;|6;|8;)|2(?:3;|5;)|3(?:4;?|5;|8;)|45;|5(?:6;|8;)|78;)|sl;)|own;)|scr;)|g(?:E(?:;|l;)|a(?:cute;|mma(?:;|d;)|p;)|breve;|c(?:irc;|y;)|dot;|e(?:;|l;|q(?:;|q;|slant;)|s(?:;|cc;|dot(?:;|o(?:;|l;))|l(?:;|es;)))|fr;|g(?:;|g;)|imel;|jcy;|l(?:;|E;|a;|j;)|n(?:E;|ap(?:;|prox;)|e(?:;|q(?:;|q;))|sim;)|opf;|rave;|s(?:cr;|im(?:;|e;|l;))|t(?:;|c(?:c;|ir;)|dot;|lPar;|quest;|r(?:a(?:pprox;|rr;)|dot;|eq(?:less;|qless;)|less;|sim;)|)|v(?:ertneqq;|nE;))|h(?:Arr;|a(?:irsp;|lf;|milt;|r(?:dcy;|r(?:;|cir;|w;)))|bar;|circ;|e(?:arts(?:;|uit;)|llip;|rcon;)|fr;|ks(?:earow;|warow;)|o(?:arr;|mtht;|ok(?:leftarrow;|rightarrow;)|pf;|rbar;)|s(?:cr;|lash;|trok;)|y(?:bull;|phen;))|i(?:acute;?|c(?:;|irc;?|y;)|e(?:cy;|xcl;?)|f(?:f;|r;)|grave;?|i(?:;|i(?:int;|nt;)|nfin;|ota;)|jlig;|m(?:a(?:cr;|g(?:e;|line;|part;)|th;)|of;|ped;)|n(?:;|care;|fin(?:;|tie;)|odot;|t(?:;|cal;|e(?:gers;|rcal;)|larhk;|prod;))|o(?:cy;|gon;|pf;|ta;)|prod;|quest;?|s(?:cr;|in(?:;|E;|dot;|s(?:;|v;)|v;))|t(?:;|ilde;)|u(?:kcy;|ml;?))|j(?:c(?:irc;|y;)|fr;|math;|opf;|s(?:cr;|ercy;)|ukcy;)|k(?:appa(?:;|v;)|c(?:edil;|y;)|fr;|green;|hcy;|jcy;|opf;|scr;)|l(?:A(?:arr;|rr;|tail;)|Barr;|E(?:;|g;)|Har;|a(?:cute;|emptyv;|gran;|mbda;|ng(?:;|d;|le;)|p;|quo;?|rr(?:;|b(?:;|fs;)|fs;|hk;|lp;|pl;|sim;|tl;)|t(?:;|ail;|e(?:;|s;)))|b(?:arr;|brk;|r(?:ac(?:e;|k;)|k(?:e;|sl(?:d;|u;))))|c(?:aron;|e(?:dil;|il;)|ub;|y;)|d(?:ca;|quo(?:;|r;)|r(?:dhar;|ushar;)|sh;)|e(?:;|ft(?:arrow(?:;|tail;)|harpoon(?:down;|up;)|leftarrows;|right(?:arrow(?:;|s;)|harpoons;|squigarrow;)|threetimes;)|g;|q(?:;|q;|slant;)|s(?:;|cc;|dot(?:;|o(?:;|r;))|g(?:;|es;)|s(?:approx;|dot;|eq(?:gtr;|qgtr;)|gtr;|sim;)))|f(?:isht;|loor;|r;)|g(?:;|E;)|h(?:ar(?:d;|u(?:;|l;))|blk;)|jcy;|l(?:;|arr;|corner;|hard;|tri;)|m(?:idot;|oust(?:;|ache;))|n(?:E;|ap(?:;|prox;)|e(?:;|q(?:;|q;))|sim;)|o(?:a(?:ng;|rr;)|brk;|ng(?:left(?:arrow;|rightarrow;)|mapsto;|rightarrow;)|oparrow(?:left;|right;)|p(?:ar;|f;|lus;)|times;|w(?:ast;|bar;)|z(?:;|enge;|f;))|par(?:;|lt;)|r(?:arr;|corner;|har(?:;|d;)|m;|tri;)|s(?:aquo;|cr;|h;|im(?:;|e;|g;)|q(?:b;|uo(?:;|r;))|trok;)|t(?:;|c(?:c;|ir;)|dot;|hree;|imes;|larr;|quest;|r(?:Par;|i(?:;|e;|f;))|)|ur(?:dshar;|uhar;)|v(?:ertneqq;|nE;))|m(?:DDot;|a(?:cr;?|l(?:e;|t(?:;|ese;))|p(?:;|sto(?:;|down;|left;|up;))|rker;)|c(?:omma;|y;)|dash;|easuredangle;|fr;|ho;|i(?:cro;?|d(?:;|ast;|cir;|dot;?)|nus(?:;|b;|d(?:;|u;)))|l(?:cp;|dr;)|nplus;|o(?:dels;|pf;)|p;|s(?:cr;|tpos;)|u(?:;|ltimap;|map;))|n(?:G(?:g;|t(?:;|v;))|L(?:eft(?:arrow;|rightarrow;)|l;|t(?:;|v;))|Rightarrow;|V(?:Dash;|dash;)|a(?:bla;|cute;|ng;|p(?:;|E;|id;|os;|prox;)|tur(?:;|al(?:;|s;)))|b(?:sp;?|ump(?:;|e;))|c(?:a(?:p;|ron;)|edil;|ong(?:;|dot;)|up;|y;)|dash;|e(?:;|Arr;|ar(?:hk;|r(?:;|ow;))|dot;|quiv;|s(?:ear;|im;)|xist(?:;|s;))|fr;|g(?:E;|e(?:;|q(?:;|q;|slant;)|s;)|sim;|t(?:;|r;))|h(?:Arr;|arr;|par;)|i(?:;|s(?:;|d;)|v;)|jcy;|l(?:Arr;|E;|arr;|dr;|e(?:;|ft(?:arrow;|rightarrow;)|q(?:;|q;|slant;)|s(?:;|s;))|sim;|t(?:;|ri(?:;|e;)))|mid;|o(?:pf;|t(?:;|in(?:;|E;|dot;|v(?:a;|b;|c;))|ni(?:;|v(?:a;|b;|c;))|))|p(?:ar(?:;|allel;|sl;|t;)|olint;|r(?:;|cue;|e(?:;|c(?:;|eq;))))|r(?:Arr;|arr(?:;|c;|w;)|ightarrow;|tri(?:;|e;))|s(?:c(?:;|cue;|e;|r;)|hort(?:mid;|parallel;)|im(?:;|e(?:;|q;))|mid;|par;|qsu(?:be;|pe;)|u(?:b(?:;|E;|e;|set(?:;|eq(?:;|q;)))|cc(?:;|eq;)|p(?:;|E;|e;|set(?:;|eq(?:;|q;)))))|t(?:gl;|ilde;?|lg;|riangle(?:left(?:;|eq;)|right(?:;|eq;)))|u(?:;|m(?:;|ero;|sp;))|v(?:Dash;|Harr;|ap;|dash;|g(?:e;|t;)|infin;|l(?:Arr;|e;|t(?:;|rie;))|r(?:Arr;|trie;)|sim;)|w(?:Arr;|ar(?:hk;|r(?:;|ow;))|near;))|o(?:S;|a(?:cute;?|st;)|c(?:ir(?:;|c;?)|y;)|d(?:ash;|blac;|iv;|ot;|sold;)|elig;|f(?:cir;|r;)|g(?:on;|rave;?|t;)|h(?:bar;|m;)|int;|l(?:arr;|c(?:ir;|ross;)|ine;|t;)|m(?:acr;|ega;|i(?:cron;|d;|nus;))|opf;|p(?:ar;|erp;|lus;)|r(?:;|arr;|d(?:;|er(?:;|of;)|f;?|m;?)|igof;|or;|slope;|v;)|s(?:cr;|lash;?|ol;)|ti(?:lde;?|mes(?:;|as;))|uml;?|vbar;)|p(?:ar(?:;|a(?:;|llel;|)|s(?:im;|l;)|t;)|cy;|er(?:cnt;|iod;|mil;|p;|tenk;)|fr;|h(?:i(?:;|v;)|mmat;|one;)|i(?:;|tchfork;|v;)|l(?:an(?:ck(?:;|h;)|kv;)|us(?:;|acir;|b;|cir;|d(?:o;|u;)|e;|mn;?|sim;|two;))|m;|o(?:intint;|pf;|und;?)|r(?:;|E;|ap;|cue;|e(?:;|c(?:;|approx;|curlyeq;|eq;|n(?:approx;|eqq;|sim;)|sim;))|ime(?:;|s;)|n(?:E;|ap;|sim;)|o(?:d;|f(?:alar;|line;|surf;)|p(?:;|to;))|sim;|urel;)|s(?:cr;|i;)|uncsp;)|q(?:fr;|int;|opf;|prime;|scr;|u(?:at(?:ernions;|int;)|est(?:;|eq;)|ot;?))|r(?:A(?:arr;|rr;|tail;)|Barr;|Har;|a(?:c(?:e;|ute;)|dic;|emptyv;|ng(?:;|d;|e;|le;)|quo;?|rr(?:;|ap;|b(?:;|fs;)|c;|fs;|hk;|lp;|pl;|sim;|tl;|w;)|t(?:ail;|io(?:;|nals;)))|b(?:arr;|brk;|r(?:ac(?:e;|k;)|k(?:e;|sl(?:d;|u;))))|c(?:aron;|e(?:dil;|il;)|ub;|y;)|d(?:ca;|ldhar;|quo(?:;|r;)|sh;)|e(?:al(?:;|ine;|part;|s;)|ct;|g;?)|f(?:isht;|loor;|r;)|h(?:ar(?:d;|u(?:;|l;))|o(?:;|v;))|i(?:ght(?:arrow(?:;|tail;)|harpoon(?:down;|up;)|left(?:arrows;|harpoons;)|rightarrows;|squigarrow;|threetimes;)|ng;|singdotseq;)|l(?:arr;|har;|m;)|moust(?:;|ache;)|nmid;|o(?:a(?:ng;|rr;)|brk;|p(?:ar;|f;|lus;)|times;)|p(?:ar(?:;|gt;)|polint;)|rarr;|s(?:aquo;|cr;|h;|q(?:b;|uo(?:;|r;)))|t(?:hree;|imes;|ri(?:;|e;|f;|ltri;))|uluhar;|x;)|s(?:acute;|bquo;|c(?:;|E;|a(?:p;|ron;)|cue;|e(?:;|dil;)|irc;|n(?:E;|ap;|sim;)|polint;|sim;|y;)|dot(?:;|b;|e;)|e(?:Arr;|ar(?:hk;|r(?:;|ow;))|ct;?|mi;|swar;|tm(?:inus;|n;)|xt;)|fr(?:;|own;)|h(?:arp;|c(?:hcy;|y;)|ort(?:mid;|parallel;)|y;?)|i(?:gma(?:;|f;|v;)|m(?:;|dot;|e(?:;|q;)|g(?:;|E;)|l(?:;|E;)|ne;|plus;|rarr;))|larr;|m(?:a(?:llsetminus;|shp;)|eparsl;|i(?:d;|le;)|t(?:;|e(?:;|s;)))|o(?:ftcy;|l(?:;|b(?:;|ar;))|pf;)|pa(?:des(?:;|uit;)|r;)|q(?:c(?:ap(?:;|s;)|up(?:;|s;))|su(?:b(?:;|e;|set(?:;|eq;))|p(?:;|e;|set(?:;|eq;)))|u(?:;|ar(?:e;|f;)|f;))|rarr;|s(?:cr;|etmn;|mile;|tarf;)|t(?:ar(?:;|f;)|r(?:aight(?:epsilon;|phi;)|ns;))|u(?:b(?:;|E;|dot;|e(?:;|dot;)|mult;|n(?:E;|e;)|plus;|rarr;|s(?:et(?:;|eq(?:;|q;)|neq(?:;|q;))|im;|u(?:b;|p;)))|cc(?:;|approx;|curlyeq;|eq;|n(?:approx;|eqq;|sim;)|sim;)|m;|ng;|p(?:1;?|2;?|3;?|;|E;|d(?:ot;|sub;)|e(?:;|dot;)|hs(?:ol;|ub;)|larr;|mult;|n(?:E;|e;)|plus;|s(?:et(?:;|eq(?:;|q;)|neq(?:;|q;))|im;|u(?:b;|p;))))|w(?:Arr;|ar(?:hk;|r(?:;|ow;))|nwar;)|zlig;?)|t(?:a(?:rget;|u;)|brk;|c(?:aron;|edil;|y;)|dot;|elrec;|fr;|h(?:e(?:re(?:4;|fore;)|ta(?:;|sym;|v;))|i(?:ck(?:approx;|sim;)|nsp;)|k(?:ap;|sim;)|orn;?)|i(?:lde;|mes(?:;|b(?:;|ar;)|d;|)|nt;)|o(?:ea;|p(?:;|bot;|cir;|f(?:;|ork;))|sa;)|prime;|r(?:ade;|i(?:angle(?:;|down;|left(?:;|eq;)|q;|right(?:;|eq;))|dot;|e;|minus;|plus;|sb;|time;)|pezium;)|s(?:c(?:r;|y;)|hcy;|trok;)|w(?:ixt;|ohead(?:leftarrow;|rightarrow;)))|u(?:Arr;|Har;|a(?:cute;?|rr;)|br(?:cy;|eve;)|c(?:irc;?|y;)|d(?:arr;|blac;|har;)|f(?:isht;|r;)|grave;?|h(?:ar(?:l;|r;)|blk;)|l(?:c(?:orn(?:;|er;)|rop;)|tri;)|m(?:acr;|l;?)|o(?:gon;|pf;)|p(?:arrow;|downarrow;|harpoon(?:left;|right;)|lus;|si(?:;|h;|lon;)|uparrows;)|r(?:c(?:orn(?:;|er;)|rop;)|ing;|tri;)|scr;|t(?:dot;|ilde;|ri(?:;|f;))|u(?:arr;|ml;?)|wangle;)|v(?:Arr;|Bar(?:;|v;)|Dash;|a(?:ngrt;|r(?:epsilon;|kappa;|nothing;|p(?:hi;|i;|ropto;)|r(?:;|ho;)|s(?:igma;|u(?:bsetneq(?:;|q;)|psetneq(?:;|q;)))|t(?:heta;|riangle(?:left;|right;))))|cy;|dash;|e(?:e(?:;|bar;|eq;)|llip;|r(?:bar;|t;))|fr;|ltri;|nsu(?:b;|p;)|opf;|prop;|rtri;|s(?:cr;|u(?:bn(?:E;|e;)|pn(?:E;|e;)))|zigzag;)|w(?:circ;|e(?:d(?:bar;|ge(?:;|q;))|ierp;)|fr;|opf;|p;|r(?:;|eath;)|scr;)|x(?:c(?:ap;|irc;|up;)|dtri;|fr;|h(?:Arr;|arr;)|i;|l(?:Arr;|arr;)|map;|nis;|o(?:dot;|p(?:f;|lus;)|time;)|r(?:Arr;|arr;)|s(?:cr;|qcup;)|u(?:plus;|tri;)|vee;|wedge;)|y(?:ac(?:ute;?|y;)|c(?:irc;|y;)|en;?|fr;|icy;|opf;|scr;|u(?:cy;|ml;?))|z(?:acute;|c(?:aron;|y;)|dot;|e(?:etrf;|ta;)|fr;|hcy;|igrarr;|opf;|scr;|w(?:j;|nj;)))|[\s\S]/g,
        at = 32,
        Dn = /[^\r"&\u0000]+/g,
        It = /[^\r'&\u0000]+/g,
        vi = /[^\r\t\n\f &>\u0000]+/g,
        ws = /[^\r\t\n\f \/>A-Z\u0000]+/g,
        e_ = /[^\r\t\n\f \/=>A-Z\u0000]+/g,
        t_ = /[^\]\r\u0000\uffff]*/g,
        n_ = /[^&<\r\u0000\uffff]*/g,
        wm = /[^<\r\u0000\uffff]*/g,
        r_ = /[^\r\u0000\uffff]*/g,
        _m = /(?:(\/)?([a-z]+)>)|[\s\S]/g,
        Dm =
          /(?:([-a-z]+)[ \t\n\f]*=[ \t\n\f]*('[^'&\r\u0000]*'|"[^"&\r\u0000]*"|[^\t\n\r\f "&'\u0000>][^&> \t\n\r\f\u0000]*[ \t\n\f]))|[\s\S]/g,
        oa = /[^\x09\x0A\x0C\x0D\x20]/,
        Eu = /[^\x09\x0A\x0C\x0D\x20]/g,
        i_ = /[^\x00\x09\x0A\x0C\x0D\x20]/,
        Or = /^[\x09\x0A\x0C\x0D\x20]+/,
        aa = /\x00/g;
      function pt(H) {
        var V = 16384;
        if (H.length < V) return String.fromCharCode.apply(String, H);
        for (var ie = '', Z = 0; Z < H.length; Z += V)
          ie += String.fromCharCode.apply(String, H.slice(Z, Z + V));
        return ie;
      }
      function s_(H) {
        for (var V = [], ie = 0; ie < H.length; ie++) V[ie] = H.charCodeAt(ie);
        return V;
      }
      function ke(H, V) {
        if (typeof V == 'string')
          return H.namespaceURI === s.HTML && H.localName === V;
        var ie = V[H.namespaceURI];
        return ie && ie[H.localName];
      }
      function Tm(H) {
        return ke(H, U);
      }
      function Sm(H) {
        if (ke(H, Q)) return !0;
        if (H.namespaceURI === s.MATHML && H.localName === 'annotation-xml') {
          var V = H.getAttribute('encoding');
          if (
            (V && (V = V.toLowerCase()),
            V === 'text/html' || V === 'application/xhtml+xml')
          )
            return !0;
        }
        return !1;
      }
      function o_(H) {
        return H in k ? k[H] : H;
      }
      function Cm(H) {
        for (var V = 0, ie = H.length; V < ie; V++)
          H[V][0] in T && (H[V][0] = T[H[V][0]]);
      }
      function Im(H) {
        for (var V = 0, ie = H.length; V < ie; V++)
          if (H[V][0] === 'definitionurl') {
            H[V][0] = 'definitionURL';
            break;
          }
      }
      function bu(H) {
        for (var V = 0, ie = H.length; V < ie; V++)
          H[V][0] in pe && H[V].push(pe[H[V][0]]);
      }
      function Mm(H, V) {
        for (var ie = 0, Z = H.length; ie < Z; ie++) {
          var $e = H[ie][0],
            ee = H[ie][1];
          V.hasAttribute($e) || V._setAttribute($e, ee);
        }
      }
      (Ne.ElementStack = function () {
        (this.elements = []), (this.top = null);
      }),
        (Ne.ElementStack.prototype.push = function (H) {
          this.elements.push(H), (this.top = H);
        }),
        (Ne.ElementStack.prototype.pop = function (H) {
          this.elements.pop(),
            (this.top = this.elements[this.elements.length - 1]);
        }),
        (Ne.ElementStack.prototype.popTag = function (H) {
          for (var V = this.elements.length - 1; V > 0; V--) {
            var ie = this.elements[V];
            if (ke(ie, H)) break;
          }
          (this.elements.length = V), (this.top = this.elements[V - 1]);
        }),
        (Ne.ElementStack.prototype.popElementType = function (H) {
          for (
            var V = this.elements.length - 1;
            V > 0 && !(this.elements[V] instanceof H);
            V--
          );
          (this.elements.length = V), (this.top = this.elements[V - 1]);
        }),
        (Ne.ElementStack.prototype.popElement = function (H) {
          for (
            var V = this.elements.length - 1;
            V > 0 && this.elements[V] !== H;
            V--
          );
          (this.elements.length = V), (this.top = this.elements[V - 1]);
        }),
        (Ne.ElementStack.prototype.removeElement = function (H) {
          if (this.top === H) this.pop();
          else {
            var V = this.elements.lastIndexOf(H);
            V !== -1 && this.elements.splice(V, 1);
          }
        }),
        (Ne.ElementStack.prototype.clearToContext = function (H) {
          for (
            var V = this.elements.length - 1;
            V > 0 && !ke(this.elements[V], H);
            V--
          );
          (this.elements.length = V + 1), (this.top = this.elements[V]);
        }),
        (Ne.ElementStack.prototype.contains = function (H) {
          return this.inSpecificScope(H, Object.create(null));
        }),
        (Ne.ElementStack.prototype.inSpecificScope = function (H, V) {
          for (var ie = this.elements.length - 1; ie >= 0; ie--) {
            var Z = this.elements[ie];
            if (ke(Z, H)) return !0;
            if (ke(Z, V)) return !1;
          }
          return !1;
        }),
        (Ne.ElementStack.prototype.elementInSpecificScope = function (H, V) {
          for (var ie = this.elements.length - 1; ie >= 0; ie--) {
            var Z = this.elements[ie];
            if (Z === H) return !0;
            if (ke(Z, V)) return !1;
          }
          return !1;
        }),
        (Ne.ElementStack.prototype.elementTypeInSpecificScope = function (
          H,
          V
        ) {
          for (var ie = this.elements.length - 1; ie >= 0; ie--) {
            var Z = this.elements[ie];
            if (Z instanceof H) return !0;
            if (ke(Z, V)) return !1;
          }
          return !1;
        }),
        (Ne.ElementStack.prototype.inScope = function (H) {
          return this.inSpecificScope(H, g);
        }),
        (Ne.ElementStack.prototype.elementInScope = function (H) {
          return this.elementInSpecificScope(H, g);
        }),
        (Ne.ElementStack.prototype.elementTypeInScope = function (H) {
          return this.elementTypeInSpecificScope(H, g);
        }),
        (Ne.ElementStack.prototype.inButtonScope = function (H) {
          return this.inSpecificScope(H, v);
        }),
        (Ne.ElementStack.prototype.inListItemScope = function (H) {
          return this.inSpecificScope(H, p);
        }),
        (Ne.ElementStack.prototype.inTableScope = function (H) {
          return this.inSpecificScope(H, C);
        }),
        (Ne.ElementStack.prototype.inSelectScope = function (H) {
          for (var V = this.elements.length - 1; V >= 0; V--) {
            var ie = this.elements[V];
            if (ie.namespaceURI !== s.HTML) return !1;
            var Z = ie.localName;
            if (Z === H) return !0;
            if (Z !== 'optgroup' && Z !== 'option') return !1;
          }
          return !1;
        }),
        (Ne.ElementStack.prototype.generateImpliedEndTags = function (H, V) {
          for (var ie = V ? q : Ie, Z = this.elements.length - 1; Z >= 0; Z--) {
            var $e = this.elements[Z];
            if ((H && ke($e, H)) || !ke(this.elements[Z], ie)) break;
          }
          (this.elements.length = Z + 1), (this.top = this.elements[Z]);
        }),
        (Ne.ActiveFormattingElements = function () {
          (this.list = []), (this.attrs = []);
        }),
        (Ne.ActiveFormattingElements.prototype.MARKER = { localName: '|' }),
        (Ne.ActiveFormattingElements.prototype.insertMarker = function () {
          this.list.push(this.MARKER), this.attrs.push(this.MARKER);
        }),
        (Ne.ActiveFormattingElements.prototype.push = function (H, V) {
          for (
            var ie = 0, Z = this.list.length - 1;
            Z >= 0 && this.list[Z] !== this.MARKER;
            Z--
          )
            if (kr(H, this.list[Z], this.attrs[Z]) && (ie++, ie === 3)) {
              this.list.splice(Z, 1), this.attrs.splice(Z, 1);
              break;
            }
          this.list.push(H);
          for (var $e = [], ee = 0; ee < V.length; ee++) $e[ee] = V[ee];
          this.attrs.push($e);
          function kr(Wn, Lr, Tn) {
            if (Wn.localName !== Lr.localName || Wn._numattrs !== Tn.length)
              return !1;
            for (var Mt = 0, ca = Tn.length; Mt < ca; Mt++) {
              var Pr = Tn[Mt][0],
                A = Tn[Mt][1];
              if (!Wn.hasAttribute(Pr) || Wn.getAttribute(Pr) !== A) return !1;
            }
            return !0;
          }
        }),
        (Ne.ActiveFormattingElements.prototype.clearToMarker = function () {
          for (
            var H = this.list.length - 1;
            H >= 0 && this.list[H] !== this.MARKER;
            H--
          );
          H < 0 && (H = 0), (this.list.length = H), (this.attrs.length = H);
        }),
        (Ne.ActiveFormattingElements.prototype.findElementByTag = function (H) {
          for (var V = this.list.length - 1; V >= 0; V--) {
            var ie = this.list[V];
            if (ie === this.MARKER) break;
            if (ie.localName === H) return ie;
          }
          return null;
        }),
        (Ne.ActiveFormattingElements.prototype.indexOf = function (H) {
          return this.list.lastIndexOf(H);
        }),
        (Ne.ActiveFormattingElements.prototype.remove = function (H) {
          var V = this.list.lastIndexOf(H);
          V !== -1 && (this.list.splice(V, 1), this.attrs.splice(V, 1));
        }),
        (Ne.ActiveFormattingElements.prototype.replace = function (H, V, ie) {
          var Z = this.list.lastIndexOf(H);
          Z !== -1 && ((this.list[Z] = V), (this.attrs[Z] = ie));
        }),
        (Ne.ActiveFormattingElements.prototype.insertAfter = function (H, V) {
          var ie = this.list.lastIndexOf(H);
          ie !== -1 &&
            (this.list.splice(ie, 0, V), this.attrs.splice(ie, 0, V));
        });
      function Ne(H, V, ie) {
        var Z = null,
          $e = 0,
          ee = 0,
          kr = !1,
          Wn = !1,
          Lr = 0,
          Tn = [],
          Mt = '',
          ca = !0,
          Pr = 0,
          A = Se,
          Kn,
          Ke,
          Le = '',
          la = '',
          Pe = [],
          kt = '',
          Nt = '',
          Ue = [],
          Qn = [],
          Yn = [],
          Zn = [],
          Kt = [],
          ua = !1,
          B = rD,
          Sn = null,
          Cn = [],
          N = new Ne.ElementStack(),
          _e = new Ne.ActiveFormattingElements(),
          Fr = V !== void 0,
          da = null,
          In = null,
          fa = !0;
        V && (fa = V.ownerDocument._scripting_enabled),
          ie && ie.scripting_enabled === !1 && (fa = !1);
        var Qe = !0,
          wu = !1,
          ha,
          _u,
          G = [],
          Xn = !1,
          jr = !1,
          pa = {
            document: function () {
              return Ae;
            },
            _asDocumentFragment: function () {
              for (
                var f = Ae.createDocumentFragment(), h = Ae.firstChild;
                h.hasChildNodes();

              )
                f.appendChild(h.firstChild);
              return f;
            },
            pause: function () {
              Pr++;
            },
            resume: function () {
              Pr--, this.parse('');
            },
            parse: function (f, h, w) {
              var L;
              return Pr > 0
                ? ((Mt += f), !0)
                : (Lr === 0
                    ? (Mt && ((f = Mt + f), (Mt = '')),
                      h && ((f += '\uFFFF'), (kr = !0)),
                      (Z = f),
                      ($e = f.length),
                      (ee = 0),
                      ca && ((ca = !1), Z.charCodeAt(0) === 65279 && (ee = 1)),
                      Lr++,
                      (L = Am(w)),
                      (Mt = Z.substring(ee, $e)),
                      Lr--)
                    : (Lr++,
                      Tn.push(Z, $e, ee),
                      (Z = f),
                      ($e = f.length),
                      (ee = 0),
                      Am(),
                      (L = !1),
                      (Mt = Z.substring(ee, $e)),
                      (ee = Tn.pop()),
                      ($e = Tn.pop()),
                      (Z = Tn.pop()),
                      Mt &&
                        ((Z = Mt + Z.substring(ee)),
                        ($e = Z.length),
                        (ee = 0),
                        (Mt = '')),
                      Lr--),
                  L);
            },
          },
          Ae = new n(!0, H);
        if (((Ae._parser = pa), (Ae._scripting_enabled = fa), V)) {
          if (
            (V.ownerDocument._quirks && (Ae._quirks = !0),
            V.ownerDocument._limitedQuirks && (Ae._limitedQuirks = !0),
            V.namespaceURI === s.HTML)
          )
            switch (V.localName) {
              case 'title':
              case 'textarea':
                A = nr;
                break;
              case 'style':
              case 'xmp':
              case 'iframe':
              case 'noembed':
              case 'noframes':
              case 'script':
              case 'plaintext':
                A = Iu;
                break;
            }
          var Nm = Ae.createElement('html');
          Ae._appendChild(Nm),
            N.push(Nm),
            V instanceof a.HTMLTemplateElement && Cn.push(Fu),
            Is();
          for (var _s = V; _s !== null; _s = _s.parentElement)
            if (_s instanceof a.HTMLFormElement) {
              In = _s;
              break;
            }
        }
        function Am(f) {
          for (var h, w, L, P; ee < $e; ) {
            if (Pr > 0 || (f && f())) return !0;
            switch (typeof A.lookahead) {
              case 'undefined':
                if (((h = Z.charCodeAt(ee++)), Wn && ((Wn = !1), h === 10))) {
                  ee++;
                  continue;
                }
                switch (h) {
                  case 13:
                    ee < $e ? Z.charCodeAt(ee) === 10 && ee++ : (Wn = !0),
                      A(10);
                    break;
                  case 65535:
                    if (kr && ee === $e) {
                      A(l);
                      break;
                    }
                  default:
                    A(h);
                    break;
                }
                break;
              case 'number':
                h = Z.charCodeAt(ee);
                var K = A.lookahead,
                  ce = !0;
                if ((K < 0 && ((ce = !1), (K = -K)), K < $e - ee))
                  (w = ce ? Z.substring(ee, ee + K) : null), (P = !1);
                else if (kr)
                  (w = ce ? Z.substring(ee, $e) : null),
                    (P = !0),
                    h === 65535 && ee === $e - 1 && (h = l);
                else return !0;
                A(h, w, P);
                break;
              case 'string':
                (h = Z.charCodeAt(ee)), (L = A.lookahead);
                var Ce = Z.indexOf(L, ee);
                if (Ce !== -1) (w = Z.substring(ee, Ce + L.length)), (P = !1);
                else {
                  if (!kr) return !0;
                  (w = Z.substring(ee, $e)),
                    h === 65535 && ee === $e - 1 && (h = l),
                    (P = !0);
                }
                A(h, w, P);
                break;
            }
          }
          return !1;
        }
        function Jn(f, h) {
          for (var w = 0; w < Kt.length; w++) if (Kt[w][0] === f) return;
          h !== void 0 ? Kt.push([f, h]) : Kt.push([f]);
        }
        function a_() {
          Dm.lastIndex = ee - 1;
          var f = Dm.exec(Z);
          if (!f) throw new Error('should never happen');
          var h = f[1];
          if (!h) return !1;
          var w = f[2],
            L = w.length;
          switch (w[0]) {
            case '"':
            case "'":
              (w = w.substring(1, L - 1)), (ee += f[0].length - 1), (A = xu);
              break;
            default:
              (A = un), (ee += f[0].length - 1), (w = w.substring(0, L - 1));
              break;
          }
          for (var P = 0; P < Kt.length; P++) if (Kt[P][0] === h) return !0;
          return Kt.push([h, w]), !0;
        }
        function c_() {
          (ua = !1), (Le = ''), (Kt.length = 0);
        }
        function Ds() {
          (ua = !0), (Le = ''), (Kt.length = 0);
        }
        function Mn() {
          Pe.length = 0;
        }
        function Du() {
          kt = '';
        }
        function Tu() {
          Nt = '';
        }
        function xm() {
          Ue.length = 0;
        }
        function Ei() {
          (Qn.length = 0), (Yn = null), (Zn = null);
        }
        function ma() {
          Yn = [];
        }
        function er() {
          Zn = [];
        }
        function Re() {
          wu = !0;
        }
        function l_() {
          return N.top && N.top.namespaceURI !== 'http://www.w3.org/1999/xhtml';
        }
        function Ut(f) {
          return la === f;
        }
        function bi() {
          if (G.length > 0) {
            var f = pt(G);
            if (
              ((G.length = 0),
              jr &&
                ((jr = !1),
                f[0] ===
                  `
` && (f = f.substring(1)),
                f.length === 0))
            )
              return;
            Xe(u, f), (Xn = !1);
          }
          jr = !1;
        }
        function Ts(f) {
          f.lastIndex = ee - 1;
          var h = f.exec(Z);
          if (h && h.index === ee - 1)
            return (
              (h = h[0]),
              (ee += h.length - 1),
              kr && ee === $e && ((h = h.slice(0, -1)), ee--),
              h
            );
          throw new Error('should never happen');
        }
        function Ss(f) {
          f.lastIndex = ee - 1;
          var h = f.exec(Z)[0];
          return h ? (u_(h), (ee += h.length - 1), !0) : !1;
        }
        function u_(f) {
          G.length > 0 && bi(),
            !(
              jr &&
              ((jr = !1),
              f[0] ===
                `
` && (f = f.substring(1)),
              f.length === 0)
            ) && Xe(u, f);
        }
        function Nn() {
          if (ua) Xe(m, Le);
          else {
            var f = Le;
            (Le = ''), (la = f), Xe(d, f, Kt);
          }
        }
        function d_() {
          if (ee === $e) return !1;
          _m.lastIndex = ee;
          var f = _m.exec(Z);
          if (!f) throw new Error('should never happen');
          var h = f[2];
          if (!h) return !1;
          var w = f[1];
          return (
            w
              ? ((ee += h.length + 2), Xe(m, h))
              : ((ee += h.length + 1), (la = h), Xe(d, h, M)),
            !0
          );
        }
        function f_() {
          ua ? Xe(m, Le, null, !0) : Xe(d, Le, Kt, !0);
        }
        function Oe() {
          Xe(I, pt(Qn), Yn ? pt(Yn) : void 0, Zn ? pt(Zn) : void 0);
        }
        function ge() {
          bi(), B(l), (Ae.modclock = 1);
        }
        var Xe = (pa.insertToken = function (h, w, L, P) {
          bi();
          var K = N.top;
          !K || K.namespaceURI === s.HTML
            ? B(h, w, L, P)
            : h !== d && h !== u
            ? Wm(h, w, L, P)
            : (Tm(K) &&
                (h === u ||
                  (h === d && w !== 'mglyph' && w !== 'malignmark'))) ||
              (h === d &&
                w === 'svg' &&
                K.namespaceURI === s.MATHML &&
                K.localName === 'annotation-xml') ||
              Sm(K)
            ? ((_u = !0), B(h, w, L, P), (_u = !1))
            : Wm(h, w, L, P);
        });
        function an(f) {
          var h = N.top;
          tr && ke(h, se)
            ? ya(function (w) {
                return w.createComment(f);
              })
            : (h instanceof a.HTMLTemplateElement && (h = h.content),
              h._appendChild(h.ownerDocument.createComment(f)));
        }
        function cn(f) {
          var h = N.top;
          if (tr && ke(h, se))
            ya(function (L) {
              return L.createTextNode(f);
            });
          else {
            h instanceof a.HTMLTemplateElement && (h = h.content);
            var w = h.lastChild;
            w && w.nodeType === i.TEXT_NODE
              ? w.appendData(f)
              : h._appendChild(h.ownerDocument.createTextNode(f));
          }
        }
        function Cs(f, h, w) {
          var L = o.createElement(f, h, null);
          if (w)
            for (var P = 0, K = w.length; P < K; P++)
              L._setAttribute(w[P][0], w[P][1]);
          return L;
        }
        var tr = !1;
        function he(f, h) {
          var w = ga(function (L) {
            return Cs(L, f, h);
          });
          return ke(w, y) && (w._form = In), w;
        }
        function ga(f) {
          var h;
          return (
            tr && ke(N.top, se)
              ? (h = ya(f))
              : N.top instanceof a.HTMLTemplateElement
              ? ((h = f(N.top.content.ownerDocument)),
                N.top.content._appendChild(h))
              : ((h = f(N.top.ownerDocument)), N.top._appendChild(h)),
            N.push(h),
            h
          );
        }
        function Su(f, h, w) {
          return ga(function (L) {
            var P = L._createElementNS(f, w, null);
            if (h)
              for (var K = 0, ce = h.length; K < ce; K++) {
                var Ce = h[K];
                Ce.length === 2
                  ? P._setAttribute(Ce[0], Ce[1])
                  : P._setAttributeNS(Ce[2], Ce[0], Ce[1]);
              }
            return P;
          });
        }
        function Rm(f) {
          for (var h = N.elements.length - 1; h >= 0; h--)
            if (N.elements[h] instanceof f) return h;
          return -1;
        }
        function ya(f) {
          var h,
            w,
            L = -1,
            P = -1,
            K;
          if (
            ((L = Rm(a.HTMLTableElement)),
            (P = Rm(a.HTMLTemplateElement)),
            P >= 0 && (L < 0 || P > L)
              ? (h = N.elements[P])
              : L >= 0 &&
                ((h = N.elements[L].parentNode),
                h ? (w = N.elements[L]) : (h = N.elements[L - 1])),
            h || (h = N.elements[0]),
            h instanceof a.HTMLTemplateElement && (h = h.content),
            (K = f(h.ownerDocument)),
            K.nodeType === i.TEXT_NODE)
          ) {
            var ce;
            if (
              (w ? (ce = w.previousSibling) : (ce = h.lastChild),
              ce && ce.nodeType === i.TEXT_NODE)
            )
              return ce.appendData(K.data), K;
          }
          return w ? h.insertBefore(K, w) : h._appendChild(K), K;
        }
        function Is() {
          for (var f = !1, h = N.elements.length - 1; h >= 0; h--) {
            var w = N.elements[h];
            if (
              (h === 0 && ((f = !0), Fr && (w = V)), w.namespaceURI === s.HTML)
            ) {
              var L = w.localName;
              switch (L) {
                case 'select':
                  for (var P = h; P > 0; ) {
                    var K = N.elements[--P];
                    if (K instanceof a.HTMLTemplateElement) break;
                    if (K instanceof a.HTMLTableElement) {
                      B = xa;
                      return;
                    }
                  }
                  B = An;
                  return;
                case 'tr':
                  B = As;
                  return;
                case 'tbody':
                case 'tfoot':
                case 'thead':
                  B = Ur;
                  return;
                case 'caption':
                  B = Pu;
                  return;
                case 'colgroup':
                  B = Aa;
                  return;
                case 'table':
                  B = $t;
                  return;
                case 'template':
                  B = Cn[Cn.length - 1];
                  return;
                case 'body':
                  B = ae;
                  return;
                case 'frameset':
                  B = ju;
                  return;
                case 'html':
                  da === null ? (B = Ma) : (B = Lu);
                  return;
                default:
                  if (!f) {
                    if (L === 'head') {
                      B = Ye;
                      return;
                    }
                    if (L === 'td' || L === 'th') {
                      B = wi;
                      return;
                    }
                  }
              }
            }
            if (f) {
              B = ae;
              return;
            }
          }
        }
        function va(f, h) {
          he(f, h), (A = Ms), (Sn = B), (B = Na);
        }
        function h_(f, h) {
          he(f, h), (A = nr), (Sn = B), (B = Na);
        }
        function Cu(f, h) {
          return {
            elt: Cs(f, _e.list[h].localName, _e.attrs[h]),
            attrs: _e.attrs[h],
          };
        }
        function Et() {
          if (_e.list.length !== 0) {
            var f = _e.list[_e.list.length - 1];
            if (f !== _e.MARKER && N.elements.lastIndexOf(f) === -1) {
              for (
                var h = _e.list.length - 2;
                h >= 0 &&
                ((f = _e.list[h]),
                !(f === _e.MARKER || N.elements.lastIndexOf(f) !== -1));
                h--
              );
              for (h = h + 1; h < _e.list.length; h++) {
                var w = ga(function (L) {
                  return Cu(L, h).elt;
                });
                _e.list[h] = w;
              }
            }
          }
        }
        var Ea = { localName: 'BM' };
        function p_(f) {
          if (ke(N.top, f) && _e.indexOf(N.top) === -1) return N.pop(), !0;
          for (var h = 0; h < 8; ) {
            h++;
            var w = _e.findElementByTag(f);
            if (!w) return !1;
            var L = N.elements.lastIndexOf(w);
            if (L === -1) return _e.remove(w), !0;
            if (!N.elementInScope(w)) return !0;
            for (var P = null, K, ce = L + 1; ce < N.elements.length; ce++)
              if (ke(N.elements[ce], S)) {
                (P = N.elements[ce]), (K = ce);
                break;
              }
            if (P) {
              var Ce = N.elements[L - 1];
              _e.insertAfter(w, Ea);
              for (
                var We = P, lt = P, qt = K, Qt, $r = 0;
                $r++, (We = N.elements[--qt]), We !== w;

              ) {
                if (
                  ((Qt = _e.indexOf(We)),
                  $r > 3 && Qt !== -1 && (_e.remove(We), (Qt = -1)),
                  Qt === -1)
                ) {
                  N.removeElement(We);
                  continue;
                }
                var ar = Cu(Ce.ownerDocument, Qt);
                _e.replace(We, ar.elt, ar.attrs),
                  (N.elements[qt] = ar.elt),
                  (We = ar.elt),
                  lt === P && (_e.remove(Ea), _e.insertAfter(ar.elt, Ea)),
                  We._appendChild(lt),
                  (lt = We);
              }
              tr && ke(Ce, se)
                ? ya(function () {
                    return lt;
                  })
                : Ce instanceof a.HTMLTemplateElement
                ? Ce.content._appendChild(lt)
                : Ce._appendChild(lt);
              for (
                var xs = Cu(P.ownerDocument, _e.indexOf(w));
                P.hasChildNodes();

              )
                xs.elt._appendChild(P.firstChild);
              P._appendChild(xs.elt),
                _e.remove(w),
                _e.replace(Ea, xs.elt, xs.attrs),
                N.removeElement(w);
              var cD = N.elements.lastIndexOf(P);
              N.elements.splice(cD + 1, 0, xs.elt);
            } else return N.popElement(w), _e.remove(w), !0;
          }
          return !0;
        }
        function m_() {
          N.pop(), (B = Sn);
        }
        function Hr() {
          delete Ae._parser,
            (N.elements.length = 0),
            Ae.defaultView &&
              Ae.defaultView.dispatchEvent(new a.Event('load', {}));
        }
        function re(f, h) {
          (A = h), ee--;
        }
        function Se(f) {
          switch (f) {
            case 38:
              (Kn = Se), (A = Ns);
              break;
            case 60:
              if (d_()) break;
              A = g_;
              break;
            case 0:
              G.push(f), (Xn = !0);
              break;
            case -1:
              ge();
              break;
            default:
              Ss(n_) || G.push(f);
              break;
          }
        }
        function nr(f) {
          switch (f) {
            case 38:
              (Kn = nr), (A = Ns);
              break;
            case 60:
              A = v_;
              break;
            case 0:
              G.push(65533), (Xn = !0);
              break;
            case -1:
              ge();
              break;
            default:
              G.push(f);
              break;
          }
        }
        function Ms(f) {
          switch (f) {
            case 60:
              A = w_;
              break;
            case 0:
              G.push(65533);
              break;
            case -1:
              ge();
              break;
            default:
              Ss(wm) || G.push(f);
              break;
          }
        }
        function rr(f) {
          switch (f) {
            case 60:
              A = T_;
              break;
            case 0:
              G.push(65533);
              break;
            case -1:
              ge();
              break;
            default:
              Ss(wm) || G.push(f);
              break;
          }
        }
        function Iu(f) {
          switch (f) {
            case 0:
              G.push(65533);
              break;
            case -1:
              ge();
              break;
            default:
              Ss(r_) || G.push(f);
              break;
          }
        }
        function g_(f) {
          switch (f) {
            case 33:
              A = Pm;
              break;
            case 47:
              A = y_;
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              c_(), re(f, Om);
              break;
            case 63:
              re(f, Da);
              break;
            default:
              G.push(60), re(f, Se);
              break;
          }
        }
        function y_(f) {
          switch (f) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              Ds(), re(f, Om);
              break;
            case 62:
              A = Se;
              break;
            case -1:
              G.push(60), G.push(47), ge();
              break;
            default:
              re(f, Da);
              break;
          }
        }
        function Om(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              A = un;
              break;
            case 47:
              A = sr;
              break;
            case 62:
              (A = Se), Nn();
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              Le += String.fromCharCode(f + 32);
              break;
            case 0:
              Le += String.fromCharCode(65533);
              break;
            case -1:
              ge();
              break;
            default:
              Le += Ts(ws);
              break;
          }
        }
        function v_(f) {
          f === 47 ? (Mn(), (A = E_)) : (G.push(60), re(f, nr));
        }
        function E_(f) {
          switch (f) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              Ds(), re(f, b_);
              break;
            default:
              G.push(60), G.push(47), re(f, nr);
              break;
          }
        }
        function b_(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              if (Ut(Le)) {
                A = un;
                return;
              }
              break;
            case 47:
              if (Ut(Le)) {
                A = sr;
                return;
              }
              break;
            case 62:
              if (Ut(Le)) {
                (A = Se), Nn();
                return;
              }
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              (Le += String.fromCharCode(f + 32)), Pe.push(f);
              return;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              (Le += String.fromCharCode(f)), Pe.push(f);
              return;
            default:
              break;
          }
          G.push(60), G.push(47), c(G, Pe), re(f, nr);
        }
        function w_(f) {
          f === 47 ? (Mn(), (A = __)) : (G.push(60), re(f, Ms));
        }
        function __(f) {
          switch (f) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              Ds(), re(f, D_);
              break;
            default:
              G.push(60), G.push(47), re(f, Ms);
              break;
          }
        }
        function D_(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              if (Ut(Le)) {
                A = un;
                return;
              }
              break;
            case 47:
              if (Ut(Le)) {
                A = sr;
                return;
              }
              break;
            case 62:
              if (Ut(Le)) {
                (A = Se), Nn();
                return;
              }
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              (Le += String.fromCharCode(f + 32)), Pe.push(f);
              return;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              (Le += String.fromCharCode(f)), Pe.push(f);
              return;
            default:
              break;
          }
          G.push(60), G.push(47), c(G, Pe), re(f, Ms);
        }
        function T_(f) {
          switch (f) {
            case 47:
              Mn(), (A = S_);
              break;
            case 33:
              (A = I_), G.push(60), G.push(33);
              break;
            default:
              G.push(60), re(f, rr);
              break;
          }
        }
        function S_(f) {
          switch (f) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              Ds(), re(f, C_);
              break;
            default:
              G.push(60), G.push(47), re(f, rr);
              break;
          }
        }
        function C_(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              if (Ut(Le)) {
                A = un;
                return;
              }
              break;
            case 47:
              if (Ut(Le)) {
                A = sr;
                return;
              }
              break;
            case 62:
              if (Ut(Le)) {
                (A = Se), Nn();
                return;
              }
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              (Le += String.fromCharCode(f + 32)), Pe.push(f);
              return;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              (Le += String.fromCharCode(f)), Pe.push(f);
              return;
            default:
              break;
          }
          G.push(60), G.push(47), c(G, Pe), re(f, rr);
        }
        function I_(f) {
          f === 45 ? ((A = M_), G.push(45)) : re(f, rr);
        }
        function M_(f) {
          f === 45 ? ((A = km), G.push(45)) : re(f, rr);
        }
        function ln(f) {
          switch (f) {
            case 45:
              (A = N_), G.push(45);
              break;
            case 60:
              A = Mu;
              break;
            case 0:
              G.push(65533);
              break;
            case -1:
              ge();
              break;
            default:
              G.push(f);
              break;
          }
        }
        function N_(f) {
          switch (f) {
            case 45:
              (A = km), G.push(45);
              break;
            case 60:
              A = Mu;
              break;
            case 0:
              (A = ln), G.push(65533);
              break;
            case -1:
              ge();
              break;
            default:
              (A = ln), G.push(f);
              break;
          }
        }
        function km(f) {
          switch (f) {
            case 45:
              G.push(45);
              break;
            case 60:
              A = Mu;
              break;
            case 62:
              (A = rr), G.push(62);
              break;
            case 0:
              (A = ln), G.push(65533);
              break;
            case -1:
              ge();
              break;
            default:
              (A = ln), G.push(f);
              break;
          }
        }
        function Mu(f) {
          switch (f) {
            case 47:
              Mn(), (A = A_);
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              Mn(), G.push(60), re(f, R_);
              break;
            default:
              G.push(60), re(f, ln);
              break;
          }
        }
        function A_(f) {
          switch (f) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              Ds(), re(f, x_);
              break;
            default:
              G.push(60), G.push(47), re(f, ln);
              break;
          }
        }
        function x_(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              if (Ut(Le)) {
                A = un;
                return;
              }
              break;
            case 47:
              if (Ut(Le)) {
                A = sr;
                return;
              }
              break;
            case 62:
              if (Ut(Le)) {
                (A = Se), Nn();
                return;
              }
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              (Le += String.fromCharCode(f + 32)), Pe.push(f);
              return;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              (Le += String.fromCharCode(f)), Pe.push(f);
              return;
            default:
              break;
          }
          G.push(60), G.push(47), c(G, Pe), re(f, ln);
        }
        function R_(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
            case 47:
            case 62:
              pt(Pe) === 'script' ? (A = ir) : (A = ln), G.push(f);
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              Pe.push(f + 32), G.push(f);
              break;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              Pe.push(f), G.push(f);
              break;
            default:
              re(f, ln);
              break;
          }
        }
        function ir(f) {
          switch (f) {
            case 45:
              (A = O_), G.push(45);
              break;
            case 60:
              (A = Nu), G.push(60);
              break;
            case 0:
              G.push(65533);
              break;
            case -1:
              ge();
              break;
            default:
              G.push(f);
              break;
          }
        }
        function O_(f) {
          switch (f) {
            case 45:
              (A = k_), G.push(45);
              break;
            case 60:
              (A = Nu), G.push(60);
              break;
            case 0:
              (A = ir), G.push(65533);
              break;
            case -1:
              ge();
              break;
            default:
              (A = ir), G.push(f);
              break;
          }
        }
        function k_(f) {
          switch (f) {
            case 45:
              G.push(45);
              break;
            case 60:
              (A = Nu), G.push(60);
              break;
            case 62:
              (A = rr), G.push(62);
              break;
            case 0:
              (A = ir), G.push(65533);
              break;
            case -1:
              ge();
              break;
            default:
              (A = ir), G.push(f);
              break;
          }
        }
        function Nu(f) {
          f === 47 ? (Mn(), (A = L_), G.push(47)) : re(f, ir);
        }
        function L_(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
            case 47:
            case 62:
              pt(Pe) === 'script' ? (A = ln) : (A = ir), G.push(f);
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              Pe.push(f + 32), G.push(f);
              break;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              Pe.push(f), G.push(f);
              break;
            default:
              re(f, ir);
              break;
          }
        }
        function un(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 47:
              A = sr;
              break;
            case 62:
              (A = Se), Nn();
              break;
            case -1:
              ge();
              break;
            case 61:
              Du(), (kt += String.fromCharCode(f)), (A = Au);
              break;
            default:
              if (a_()) break;
              Du(), re(f, Au);
              break;
          }
        }
        function Au(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
            case 47:
            case 62:
            case -1:
              re(f, P_);
              break;
            case 61:
              A = Lm;
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              kt += String.fromCharCode(f + 32);
              break;
            case 0:
              kt += String.fromCharCode(65533);
              break;
            case 34:
            case 39:
            case 60:
            default:
              kt += Ts(e_);
              break;
          }
        }
        function P_(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 47:
              Jn(kt), (A = sr);
              break;
            case 61:
              A = Lm;
              break;
            case 62:
              (A = Se), Jn(kt), Nn();
              break;
            case -1:
              Jn(kt), ge();
              break;
            default:
              Jn(kt), Du(), re(f, Au);
              break;
          }
        }
        function Lm(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 34:
              Tu(), (A = ba);
              break;
            case 39:
              Tu(), (A = wa);
              break;
            case 62:
            default:
              Tu(), re(f, _a);
              break;
          }
        }
        function ba(f) {
          switch (f) {
            case 34:
              Jn(kt, Nt), (A = xu);
              break;
            case 38:
              (Kn = ba), (A = Ns);
              break;
            case 0:
              Nt += String.fromCharCode(65533);
              break;
            case -1:
              ge();
              break;
            case 10:
              Nt += String.fromCharCode(f);
              break;
            default:
              Nt += Ts(Dn);
              break;
          }
        }
        function wa(f) {
          switch (f) {
            case 39:
              Jn(kt, Nt), (A = xu);
              break;
            case 38:
              (Kn = wa), (A = Ns);
              break;
            case 0:
              Nt += String.fromCharCode(65533);
              break;
            case -1:
              ge();
              break;
            case 10:
              Nt += String.fromCharCode(f);
              break;
            default:
              Nt += Ts(It);
              break;
          }
        }
        function _a(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              Jn(kt, Nt), (A = un);
              break;
            case 38:
              (Kn = _a), (A = Ns);
              break;
            case 62:
              Jn(kt, Nt), (A = Se), Nn();
              break;
            case 0:
              Nt += String.fromCharCode(65533);
              break;
            case -1:
              ee--, (A = Se);
              break;
            case 34:
            case 39:
            case 60:
            case 61:
            case 96:
            default:
              Nt += Ts(vi);
              break;
          }
        }
        function xu(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              A = un;
              break;
            case 47:
              A = sr;
              break;
            case 62:
              (A = Se), Nn();
              break;
            case -1:
              ge();
              break;
            default:
              re(f, un);
              break;
          }
        }
        function sr(f) {
          switch (f) {
            case 62:
              (A = Se), f_(!0);
              break;
            case -1:
              ge();
              break;
            default:
              re(f, un);
              break;
          }
        }
        function Da(f, h, w) {
          var L = h.length;
          w ? (ee += L - 1) : (ee += L);
          var P = h.substring(0, L - 1);
          (P = P.replace(/\u0000/g, '\uFFFD')),
            (P = P.replace(
              /\u000D\u000A/g,
              `
`
            )),
            (P = P.replace(
              /\u000D/g,
              `
`
            )),
            Xe(E, P),
            (A = Se);
        }
        Da.lookahead = '>';
        function Pm(f, h, w) {
          if (h[0] === '-' && h[1] === '-') {
            (ee += 2), xm(), (A = F_);
            return;
          }
          h.toUpperCase() === 'DOCTYPE'
            ? ((ee += 7), (A = q_))
            : h === '[CDATA[' && l_()
            ? ((ee += 7), (A = ku))
            : (A = Da);
        }
        Pm.lookahead = 7;
        function F_(f) {
          switch ((xm(), f)) {
            case 45:
              A = j_;
              break;
            case 62:
              (A = Se), Xe(E, pt(Ue));
              break;
            default:
              re(f, Br);
              break;
          }
        }
        function j_(f) {
          switch (f) {
            case 45:
              A = Ta;
              break;
            case 62:
              (A = Se), Xe(E, pt(Ue));
              break;
            case -1:
              Xe(E, pt(Ue)), ge();
              break;
            default:
              Ue.push(45), re(f, Br);
              break;
          }
        }
        function Br(f) {
          switch (f) {
            case 60:
              Ue.push(f), (A = H_);
              break;
            case 45:
              A = Ru;
              break;
            case 0:
              Ue.push(65533);
              break;
            case -1:
              Xe(E, pt(Ue)), ge();
              break;
            default:
              Ue.push(f);
              break;
          }
        }
        function H_(f) {
          switch (f) {
            case 33:
              Ue.push(f), (A = B_);
              break;
            case 60:
              Ue.push(f);
              break;
            default:
              re(f, Br);
              break;
          }
        }
        function B_(f) {
          switch (f) {
            case 45:
              A = V_;
              break;
            default:
              re(f, Br);
              break;
          }
        }
        function V_(f) {
          switch (f) {
            case 45:
              A = U_;
              break;
            default:
              re(f, Ru);
              break;
          }
        }
        function U_(f) {
          switch (f) {
            case 62:
            case -1:
              re(f, Ta);
              break;
            default:
              re(f, Ta);
              break;
          }
        }
        function Ru(f) {
          switch (f) {
            case 45:
              A = Ta;
              break;
            case -1:
              Xe(E, pt(Ue)), ge();
              break;
            default:
              Ue.push(45), re(f, Br);
              break;
          }
        }
        function Ta(f) {
          switch (f) {
            case 62:
              (A = Se), Xe(E, pt(Ue));
              break;
            case 33:
              A = $_;
              break;
            case 45:
              Ue.push(45);
              break;
            case -1:
              Xe(E, pt(Ue)), ge();
              break;
            default:
              Ue.push(45), Ue.push(45), re(f, Br);
              break;
          }
        }
        function $_(f) {
          switch (f) {
            case 45:
              Ue.push(45), Ue.push(45), Ue.push(33), (A = Ru);
              break;
            case 62:
              (A = Se), Xe(E, pt(Ue));
              break;
            case -1:
              Xe(E, pt(Ue)), ge();
              break;
            default:
              Ue.push(45), Ue.push(45), Ue.push(33), re(f, Br);
              break;
          }
        }
        function q_(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              A = Fm;
              break;
            case -1:
              Ei(), Re(), Oe(), ge();
              break;
            default:
              re(f, Fm);
              break;
          }
        }
        function Fm(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              Ei(), Qn.push(f + 32), (A = Ou);
              break;
            case 0:
              Ei(), Qn.push(65533), (A = Ou);
              break;
            case 62:
              Ei(), Re(), (A = Se), Oe();
              break;
            case -1:
              Ei(), Re(), Oe(), ge();
              break;
            default:
              Ei(), Qn.push(f), (A = Ou);
              break;
          }
        }
        function Ou(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              A = jm;
              break;
            case 62:
              (A = Se), Oe();
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              Qn.push(f + 32);
              break;
            case 0:
              Qn.push(65533);
              break;
            case -1:
              Re(), Oe(), ge();
              break;
            default:
              Qn.push(f);
              break;
          }
        }
        function jm(f, h, w) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              ee += 1;
              break;
            case 62:
              (A = Se), (ee += 1), Oe();
              break;
            case -1:
              Re(), Oe(), ge();
              break;
            default:
              (h = h.toUpperCase()),
                h === 'PUBLIC'
                  ? ((ee += 6), (A = z_))
                  : h === 'SYSTEM'
                  ? ((ee += 6), (A = K_))
                  : (Re(), (A = or));
              break;
          }
        }
        jm.lookahead = 6;
        function z_(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              A = G_;
              break;
            case 34:
              ma(), (A = Hm);
              break;
            case 39:
              ma(), (A = Bm);
              break;
            case 62:
              Re(), (A = Se), Oe();
              break;
            case -1:
              Re(), Oe(), ge();
              break;
            default:
              Re(), (A = or);
              break;
          }
        }
        function G_(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 34:
              ma(), (A = Hm);
              break;
            case 39:
              ma(), (A = Bm);
              break;
            case 62:
              Re(), (A = Se), Oe();
              break;
            case -1:
              Re(), Oe(), ge();
              break;
            default:
              Re(), (A = or);
              break;
          }
        }
        function Hm(f) {
          switch (f) {
            case 34:
              A = Vm;
              break;
            case 0:
              Yn.push(65533);
              break;
            case 62:
              Re(), (A = Se), Oe();
              break;
            case -1:
              Re(), Oe(), ge();
              break;
            default:
              Yn.push(f);
              break;
          }
        }
        function Bm(f) {
          switch (f) {
            case 39:
              A = Vm;
              break;
            case 0:
              Yn.push(65533);
              break;
            case 62:
              Re(), (A = Se), Oe();
              break;
            case -1:
              Re(), Oe(), ge();
              break;
            default:
              Yn.push(f);
              break;
          }
        }
        function Vm(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              A = W_;
              break;
            case 62:
              (A = Se), Oe();
              break;
            case 34:
              er(), (A = Sa);
              break;
            case 39:
              er(), (A = Ca);
              break;
            case -1:
              Re(), Oe(), ge();
              break;
            default:
              Re(), (A = or);
              break;
          }
        }
        function W_(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 62:
              (A = Se), Oe();
              break;
            case 34:
              er(), (A = Sa);
              break;
            case 39:
              er(), (A = Ca);
              break;
            case -1:
              Re(), Oe(), ge();
              break;
            default:
              Re(), (A = or);
              break;
          }
        }
        function K_(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              A = Q_;
              break;
            case 34:
              er(), (A = Sa);
              break;
            case 39:
              er(), (A = Ca);
              break;
            case 62:
              Re(), (A = Se), Oe();
              break;
            case -1:
              Re(), Oe(), ge();
              break;
            default:
              Re(), (A = or);
              break;
          }
        }
        function Q_(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 34:
              er(), (A = Sa);
              break;
            case 39:
              er(), (A = Ca);
              break;
            case 62:
              Re(), (A = Se), Oe();
              break;
            case -1:
              Re(), Oe(), ge();
              break;
            default:
              Re(), (A = or);
              break;
          }
        }
        function Sa(f) {
          switch (f) {
            case 34:
              A = Um;
              break;
            case 0:
              Zn.push(65533);
              break;
            case 62:
              Re(), (A = Se), Oe();
              break;
            case -1:
              Re(), Oe(), ge();
              break;
            default:
              Zn.push(f);
              break;
          }
        }
        function Ca(f) {
          switch (f) {
            case 39:
              A = Um;
              break;
            case 0:
              Zn.push(65533);
              break;
            case 62:
              Re(), (A = Se), Oe();
              break;
            case -1:
              Re(), Oe(), ge();
              break;
            default:
              Zn.push(f);
              break;
          }
        }
        function Um(f) {
          switch (f) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 62:
              (A = Se), Oe();
              break;
            case -1:
              Re(), Oe(), ge();
              break;
            default:
              A = or;
              break;
          }
        }
        function or(f) {
          switch (f) {
            case 62:
              (A = Se), Oe();
              break;
            case -1:
              Oe(), ge();
              break;
            default:
              break;
          }
        }
        function ku(f) {
          switch (f) {
            case 93:
              A = Y_;
              break;
            case -1:
              ge();
              break;
            case 0:
              Xn = !0;
            default:
              Ss(t_) || G.push(f);
              break;
          }
        }
        function Y_(f) {
          switch (f) {
            case 93:
              A = Z_;
              break;
            default:
              G.push(93), re(f, ku);
              break;
          }
        }
        function Z_(f) {
          switch (f) {
            case 93:
              G.push(93);
              break;
            case 62:
              bi(), (A = Se);
              break;
            default:
              G.push(93), G.push(93), re(f, ku);
              break;
          }
        }
        function Ns(f) {
          switch ((Mn(), Pe.push(38), f)) {
            case 9:
            case 10:
            case 12:
            case 32:
            case 60:
            case 38:
            case -1:
              re(f, Vr);
              break;
            case 35:
              Pe.push(f), (A = X_);
              break;
            default:
              re(f, $m);
              break;
          }
        }
        function $m(f) {
          vt.lastIndex = ee;
          var h = vt.exec(Z);
          if (!h) throw new Error('should never happen');
          var w = h[1];
          if (!w) {
            A = Vr;
            return;
          }
          switch (((ee += w.length), c(Pe, s_(w)), Kn)) {
            case ba:
            case wa:
            case _a:
              if (w[w.length - 1] !== ';' && /[=A-Za-z0-9]/.test(Z[ee])) {
                A = Vr;
                return;
              }
              break;
            default:
              break;
          }
          Mn();
          var L = Te[w];
          typeof L == 'number' ? Pe.push(L) : c(Pe, L), (A = Vr);
        }
        $m.lookahead = -at;
        function X_(f) {
          switch (((Ke = 0), f)) {
            case 120:
            case 88:
              Pe.push(f), (A = J_);
              break;
            default:
              re(f, eD);
              break;
          }
        }
        function J_(f) {
          switch (f) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
              re(f, tD);
              break;
            default:
              re(f, Vr);
              break;
          }
        }
        function eD(f) {
          switch (f) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              re(f, nD);
              break;
            default:
              re(f, Vr);
              break;
          }
        }
        function tD(f) {
          switch (f) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
              (Ke *= 16), (Ke += f - 55);
              break;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
              (Ke *= 16), (Ke += f - 87);
              break;
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              (Ke *= 16), (Ke += f - 48);
              break;
            case 59:
              A = Ia;
              break;
            default:
              re(f, Ia);
              break;
          }
        }
        function nD(f) {
          switch (f) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              (Ke *= 10), (Ke += f - 48);
              break;
            case 59:
              A = Ia;
              break;
            default:
              re(f, Ia);
              break;
          }
        }
        function Ia(f) {
          Ke in $
            ? (Ke = $[Ke])
            : (Ke > 1114111 || (Ke >= 55296 && Ke < 57344)) && (Ke = 65533),
            Mn(),
            Ke <= 65535
              ? Pe.push(Ke)
              : ((Ke = Ke - 65536),
                Pe.push(55296 + (Ke >> 10)),
                Pe.push(56320 + (Ke & 1023))),
            re(f, Vr);
        }
        function Vr(f) {
          switch (Kn) {
            case ba:
            case wa:
            case _a:
              Nt += pt(Pe);
              break;
            default:
              c(G, Pe);
              break;
          }
          re(f, Kn);
        }
        function rD(f, h, w, L) {
          switch (f) {
            case 1:
              if (((h = h.replace(Or, '')), h.length === 0)) return;
              break;
            case 4:
              Ae._appendChild(Ae.createComment(h));
              return;
            case 5:
              var P = h,
                K = w,
                ce = L;
              Ae.appendChild(new r(Ae, P, K, ce)),
                wu ||
                P.toLowerCase() !== 'html' ||
                j.test(K) ||
                (ce && ce.toLowerCase() === O) ||
                (ce === void 0 && D.test(K))
                  ? (Ae._quirks = !0)
                  : (_.test(K) || (ce !== void 0 && D.test(K))) &&
                    (Ae._limitedQuirks = !0),
                (B = qm);
              return;
          }
          (Ae._quirks = !0), (B = qm), B(f, h, w, L);
        }
        function qm(f, h, w, L) {
          var P;
          switch (f) {
            case 1:
              if (((h = h.replace(Or, '')), h.length === 0)) return;
              break;
            case 5:
              return;
            case 4:
              Ae._appendChild(Ae.createComment(h));
              return;
            case 2:
              if (h === 'html') {
                (P = Cs(Ae, h, w)), N.push(P), Ae.appendChild(P), (B = Ma);
                return;
              }
              break;
            case 3:
              switch (h) {
                case 'html':
                case 'head':
                case 'body':
                case 'br':
                  break;
                default:
                  return;
              }
          }
          (P = Cs(Ae, 'html', null)),
            N.push(P),
            Ae.appendChild(P),
            (B = Ma),
            B(f, h, w, L);
        }
        function Ma(f, h, w, L) {
          switch (f) {
            case 1:
              if (((h = h.replace(Or, '')), h.length === 0)) return;
              break;
            case 5:
              return;
            case 4:
              an(h);
              return;
            case 2:
              switch (h) {
                case 'html':
                  ae(f, h, w, L);
                  return;
                case 'head':
                  var P = he(h, w);
                  (da = P), (B = Ye);
                  return;
              }
              break;
            case 3:
              switch (h) {
                case 'html':
                case 'head':
                case 'body':
                case 'br':
                  break;
                default:
                  return;
              }
          }
          Ma(d, 'head', null), B(f, h, w, L);
        }
        function Ye(f, h, w, L) {
          switch (f) {
            case 1:
              var P = h.match(Or);
              if (
                (P && (cn(P[0]), (h = h.substring(P[0].length))),
                h.length === 0)
              )
                return;
              break;
            case 4:
              an(h);
              return;
            case 5:
              return;
            case 2:
              switch (h) {
                case 'html':
                  ae(f, h, w, L);
                  return;
                case 'meta':
                case 'base':
                case 'basefont':
                case 'bgsound':
                case 'link':
                  he(h, w), N.pop();
                  return;
                case 'title':
                  h_(h, w);
                  return;
                case 'noscript':
                  if (!fa) {
                    he(h, w), (B = zm);
                    return;
                  }
                case 'noframes':
                case 'style':
                  va(h, w);
                  return;
                case 'script':
                  ga(function (K) {
                    var ce = Cs(K, h, w);
                    return (
                      (ce._parser_inserted = !0),
                      (ce._force_async = !1),
                      Fr && (ce._already_started = !0),
                      bi(),
                      ce
                    );
                  }),
                    (A = rr),
                    (Sn = B),
                    (B = Na);
                  return;
                case 'template':
                  he(h, w), _e.insertMarker(), (Qe = !1), (B = Fu), Cn.push(B);
                  return;
                case 'head':
                  return;
              }
              break;
            case 3:
              switch (h) {
                case 'head':
                  N.pop(), (B = Lu);
                  return;
                case 'body':
                case 'html':
                case 'br':
                  break;
                case 'template':
                  if (!N.contains('template')) return;
                  N.generateImpliedEndTags(null, 'thorough'),
                    N.popTag('template'),
                    _e.clearToMarker(),
                    Cn.pop(),
                    Is();
                  return;
                default:
                  return;
              }
              break;
          }
          Ye(m, 'head', null), B(f, h, w, L);
        }
        function zm(f, h, w, L) {
          switch (f) {
            case 5:
              return;
            case 4:
              Ye(f, h);
              return;
            case 1:
              var P = h.match(Or);
              if (
                (P && (Ye(f, P[0]), (h = h.substring(P[0].length))),
                h.length === 0)
              )
                return;
              break;
            case 2:
              switch (h) {
                case 'html':
                  ae(f, h, w, L);
                  return;
                case 'basefont':
                case 'bgsound':
                case 'link':
                case 'meta':
                case 'noframes':
                case 'style':
                  Ye(f, h, w);
                  return;
                case 'head':
                case 'noscript':
                  return;
              }
              break;
            case 3:
              switch (h) {
                case 'noscript':
                  N.pop(), (B = Ye);
                  return;
                case 'br':
                  break;
                default:
                  return;
              }
              break;
          }
          zm(m, 'noscript', null), B(f, h, w, L);
        }
        function Lu(f, h, w, L) {
          switch (f) {
            case 1:
              var P = h.match(Or);
              if (
                (P && (cn(P[0]), (h = h.substring(P[0].length))),
                h.length === 0)
              )
                return;
              break;
            case 4:
              an(h);
              return;
            case 5:
              return;
            case 2:
              switch (h) {
                case 'html':
                  ae(f, h, w, L);
                  return;
                case 'body':
                  he(h, w), (Qe = !1), (B = ae);
                  return;
                case 'frameset':
                  he(h, w), (B = ju);
                  return;
                case 'base':
                case 'basefont':
                case 'bgsound':
                case 'link':
                case 'meta':
                case 'noframes':
                case 'script':
                case 'style':
                case 'template':
                case 'title':
                  N.push(da), Ye(d, h, w), N.removeElement(da);
                  return;
                case 'head':
                  return;
              }
              break;
            case 3:
              switch (h) {
                case 'template':
                  return Ye(f, h, w, L);
                case 'body':
                case 'html':
                case 'br':
                  break;
                default:
                  return;
              }
              break;
          }
          Lu(d, 'body', null), (Qe = !0), B(f, h, w, L);
        }
        function ae(f, h, w, L) {
          var P, K, ce, Ce;
          switch (f) {
            case 1:
              if (Xn && ((h = h.replace(aa, '')), h.length === 0)) return;
              Qe && oa.test(h) && (Qe = !1), Et(), cn(h);
              return;
            case 5:
              return;
            case 4:
              an(h);
              return;
            case -1:
              if (Cn.length) return Fu(f);
              Hr();
              return;
            case 2:
              switch (h) {
                case 'html':
                  if (N.contains('template')) return;
                  Mm(w, N.elements[0]);
                  return;
                case 'base':
                case 'basefont':
                case 'bgsound':
                case 'link':
                case 'meta':
                case 'noframes':
                case 'script':
                case 'style':
                case 'template':
                case 'title':
                  Ye(d, h, w);
                  return;
                case 'body':
                  if (
                    ((P = N.elements[1]),
                    !P ||
                      !(P instanceof a.HTMLBodyElement) ||
                      N.contains('template'))
                  )
                    return;
                  (Qe = !1), Mm(w, P);
                  return;
                case 'frameset':
                  if (
                    !Qe ||
                    ((P = N.elements[1]),
                    !P || !(P instanceof a.HTMLBodyElement))
                  )
                    return;
                  for (
                    P.parentNode && P.parentNode.removeChild(P);
                    !(N.top instanceof a.HTMLHtmlElement);

                  )
                    N.pop();
                  he(h, w), (B = ju);
                  return;
                case 'address':
                case 'article':
                case 'aside':
                case 'blockquote':
                case 'center':
                case 'details':
                case 'dialog':
                case 'dir':
                case 'div':
                case 'dl':
                case 'fieldset':
                case 'figcaption':
                case 'figure':
                case 'footer':
                case 'header':
                case 'hgroup':
                case 'main':
                case 'nav':
                case 'ol':
                case 'p':
                case 'section':
                case 'summary':
                case 'ul':
                  N.inButtonScope('p') && ae(m, 'p'), he(h, w);
                  return;
                case 'menu':
                  N.inButtonScope('p') && ae(m, 'p'),
                    ke(N.top, 'menuitem') && N.pop(),
                    he(h, w);
                  return;
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                  N.inButtonScope('p') && ae(m, 'p'),
                    N.top instanceof a.HTMLHeadingElement && N.pop(),
                    he(h, w);
                  return;
                case 'pre':
                case 'listing':
                  N.inButtonScope('p') && ae(m, 'p'),
                    he(h, w),
                    (jr = !0),
                    (Qe = !1);
                  return;
                case 'form':
                  if (In && !N.contains('template')) return;
                  N.inButtonScope('p') && ae(m, 'p'),
                    (Ce = he(h, w)),
                    N.contains('template') || (In = Ce);
                  return;
                case 'li':
                  for (Qe = !1, K = N.elements.length - 1; K >= 0; K--) {
                    if (((ce = N.elements[K]), ce instanceof a.HTMLLIElement)) {
                      ae(m, 'li');
                      break;
                    }
                    if (ke(ce, S) && !ke(ce, b)) break;
                  }
                  N.inButtonScope('p') && ae(m, 'p'), he(h, w);
                  return;
                case 'dd':
                case 'dt':
                  for (Qe = !1, K = N.elements.length - 1; K >= 0; K--) {
                    if (((ce = N.elements[K]), ke(ce, ne))) {
                      ae(m, ce.localName);
                      break;
                    }
                    if (ke(ce, S) && !ke(ce, b)) break;
                  }
                  N.inButtonScope('p') && ae(m, 'p'), he(h, w);
                  return;
                case 'plaintext':
                  N.inButtonScope('p') && ae(m, 'p'), he(h, w), (A = Iu);
                  return;
                case 'button':
                  N.inScope('button')
                    ? (ae(m, 'button'), B(f, h, w, L))
                    : (Et(), he(h, w), (Qe = !1));
                  return;
                case 'a':
                  var We = _e.findElementByTag('a');
                  We && (ae(m, h), _e.remove(We), N.removeElement(We));
                case 'b':
                case 'big':
                case 'code':
                case 'em':
                case 'font':
                case 'i':
                case 's':
                case 'small':
                case 'strike':
                case 'strong':
                case 'tt':
                case 'u':
                  Et(), _e.push(he(h, w), w);
                  return;
                case 'nobr':
                  Et(), N.inScope(h) && (ae(m, h), Et()), _e.push(he(h, w), w);
                  return;
                case 'applet':
                case 'marquee':
                case 'object':
                  Et(), he(h, w), _e.insertMarker(), (Qe = !1);
                  return;
                case 'table':
                  !Ae._quirks && N.inButtonScope('p') && ae(m, 'p'),
                    he(h, w),
                    (Qe = !1),
                    (B = $t);
                  return;
                case 'area':
                case 'br':
                case 'embed':
                case 'img':
                case 'keygen':
                case 'wbr':
                  Et(), he(h, w), N.pop(), (Qe = !1);
                  return;
                case 'input':
                  Et(), (Ce = he(h, w)), N.pop();
                  var lt = Ce.getAttribute('type');
                  (!lt || lt.toLowerCase() !== 'hidden') && (Qe = !1);
                  return;
                case 'param':
                case 'source':
                case 'track':
                  he(h, w), N.pop();
                  return;
                case 'hr':
                  N.inButtonScope('p') && ae(m, 'p'),
                    ke(N.top, 'menuitem') && N.pop(),
                    he(h, w),
                    N.pop(),
                    (Qe = !1);
                  return;
                case 'image':
                  ae(d, 'img', w, L);
                  return;
                case 'textarea':
                  he(h, w), (jr = !0), (Qe = !1), (A = nr), (Sn = B), (B = Na);
                  return;
                case 'xmp':
                  N.inButtonScope('p') && ae(m, 'p'), Et(), (Qe = !1), va(h, w);
                  return;
                case 'iframe':
                  (Qe = !1), va(h, w);
                  return;
                case 'noembed':
                  va(h, w);
                  return;
                case 'select':
                  Et(),
                    he(h, w),
                    (Qe = !1),
                    B === $t || B === Pu || B === Ur || B === As || B === wi
                      ? (B = xa)
                      : (B = An);
                  return;
                case 'optgroup':
                case 'option':
                  N.top instanceof a.HTMLOptionElement && ae(m, 'option'),
                    Et(),
                    he(h, w);
                  return;
                case 'menuitem':
                  ke(N.top, 'menuitem') && N.pop(), Et(), he(h, w);
                  return;
                case 'rb':
                case 'rtc':
                  N.inScope('ruby') && N.generateImpliedEndTags(), he(h, w);
                  return;
                case 'rp':
                case 'rt':
                  N.inScope('ruby') && N.generateImpliedEndTags('rtc'),
                    he(h, w);
                  return;
                case 'math':
                  Et(), Im(w), bu(w), Su(h, w, s.MATHML), L && N.pop();
                  return;
                case 'svg':
                  Et(), Cm(w), bu(w), Su(h, w, s.SVG), L && N.pop();
                  return;
                case 'caption':
                case 'col':
                case 'colgroup':
                case 'frame':
                case 'head':
                case 'tbody':
                case 'td':
                case 'tfoot':
                case 'th':
                case 'thead':
                case 'tr':
                  return;
              }
              Et(), he(h, w);
              return;
            case 3:
              switch (h) {
                case 'template':
                  Ye(m, h, w);
                  return;
                case 'body':
                  if (!N.inScope('body')) return;
                  B = Gm;
                  return;
                case 'html':
                  if (!N.inScope('body')) return;
                  (B = Gm), B(f, h, w);
                  return;
                case 'address':
                case 'article':
                case 'aside':
                case 'blockquote':
                case 'button':
                case 'center':
                case 'details':
                case 'dialog':
                case 'dir':
                case 'div':
                case 'dl':
                case 'fieldset':
                case 'figcaption':
                case 'figure':
                case 'footer':
                case 'header':
                case 'hgroup':
                case 'listing':
                case 'main':
                case 'menu':
                case 'nav':
                case 'ol':
                case 'pre':
                case 'section':
                case 'summary':
                case 'ul':
                  if (!N.inScope(h)) return;
                  N.generateImpliedEndTags(), N.popTag(h);
                  return;
                case 'form':
                  if (N.contains('template')) {
                    if (!N.inScope('form')) return;
                    N.generateImpliedEndTags(), N.popTag('form');
                  } else {
                    var qt = In;
                    if (((In = null), !qt || !N.elementInScope(qt))) return;
                    N.generateImpliedEndTags(), N.removeElement(qt);
                  }
                  return;
                case 'p':
                  N.inButtonScope(h)
                    ? (N.generateImpliedEndTags(h), N.popTag(h))
                    : (ae(d, h, null), B(f, h, w, L));
                  return;
                case 'li':
                  if (!N.inListItemScope(h)) return;
                  N.generateImpliedEndTags(h), N.popTag(h);
                  return;
                case 'dd':
                case 'dt':
                  if (!N.inScope(h)) return;
                  N.generateImpliedEndTags(h), N.popTag(h);
                  return;
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                  if (!N.elementTypeInScope(a.HTMLHeadingElement)) return;
                  N.generateImpliedEndTags(),
                    N.popElementType(a.HTMLHeadingElement);
                  return;
                case 'sarcasm':
                  break;
                case 'a':
                case 'b':
                case 'big':
                case 'code':
                case 'em':
                case 'font':
                case 'i':
                case 'nobr':
                case 's':
                case 'small':
                case 'strike':
                case 'strong':
                case 'tt':
                case 'u':
                  var Qt = p_(h);
                  if (Qt) return;
                  break;
                case 'applet':
                case 'marquee':
                case 'object':
                  if (!N.inScope(h)) return;
                  N.generateImpliedEndTags(), N.popTag(h), _e.clearToMarker();
                  return;
                case 'br':
                  ae(d, h, null);
                  return;
              }
              for (K = N.elements.length - 1; K >= 0; K--)
                if (((ce = N.elements[K]), ke(ce, h))) {
                  N.generateImpliedEndTags(h), N.popElement(ce);
                  break;
                } else if (ke(ce, S)) return;
              return;
          }
        }
        function Na(f, h, w, L) {
          switch (f) {
            case 1:
              cn(h);
              return;
            case -1:
              N.top instanceof a.HTMLScriptElement &&
                (N.top._already_started = !0),
                N.pop(),
                (B = Sn),
                B(f);
              return;
            case 3:
              h === 'script' ? m_() : (N.pop(), (B = Sn));
              return;
            default:
              return;
          }
        }
        function $t(f, h, w, L) {
          function P(ce) {
            for (var Ce = 0, We = ce.length; Ce < We; Ce++)
              if (ce[Ce][0] === 'type') return ce[Ce][1].toLowerCase();
            return null;
          }
          switch (f) {
            case 1:
              if (_u) {
                ae(f, h, w, L);
                return;
              } else if (ke(N.top, se)) {
                (ha = []), (Sn = B), (B = iD), B(f, h, w, L);
                return;
              }
              break;
            case 4:
              an(h);
              return;
            case 5:
              return;
            case 2:
              switch (h) {
                case 'caption':
                  N.clearToContext(R), _e.insertMarker(), he(h, w), (B = Pu);
                  return;
                case 'colgroup':
                  N.clearToContext(R), he(h, w), (B = Aa);
                  return;
                case 'col':
                  $t(d, 'colgroup', null), B(f, h, w, L);
                  return;
                case 'tbody':
                case 'tfoot':
                case 'thead':
                  N.clearToContext(R), he(h, w), (B = Ur);
                  return;
                case 'td':
                case 'th':
                case 'tr':
                  $t(d, 'tbody', null), B(f, h, w, L);
                  return;
                case 'table':
                  if (!N.inTableScope(h)) return;
                  $t(m, h), B(f, h, w, L);
                  return;
                case 'style':
                case 'script':
                case 'template':
                  Ye(f, h, w, L);
                  return;
                case 'input':
                  var K = P(w);
                  if (K !== 'hidden') break;
                  he(h, w), N.pop();
                  return;
                case 'form':
                  if (In || N.contains('template')) return;
                  (In = he(h, w)), N.popElement(In);
                  return;
              }
              break;
            case 3:
              switch (h) {
                case 'table':
                  if (!N.inTableScope(h)) return;
                  N.popTag(h), Is();
                  return;
                case 'body':
                case 'caption':
                case 'col':
                case 'colgroup':
                case 'html':
                case 'tbody':
                case 'td':
                case 'tfoot':
                case 'th':
                case 'thead':
                case 'tr':
                  return;
                case 'template':
                  Ye(f, h, w, L);
                  return;
              }
              break;
            case -1:
              ae(f, h, w, L);
              return;
          }
          (tr = !0), ae(f, h, w, L), (tr = !1);
        }
        function iD(f, h, w, L) {
          if (f === u) {
            if (Xn && ((h = h.replace(aa, '')), h.length === 0)) return;
            ha.push(h);
          } else {
            var P = ha.join('');
            (ha.length = 0),
              oa.test(P) ? ((tr = !0), ae(u, P), (tr = !1)) : cn(P),
              (B = Sn),
              B(f, h, w, L);
          }
        }
        function Pu(f, h, w, L) {
          function P() {
            return N.inTableScope('caption')
              ? (N.generateImpliedEndTags(),
                N.popTag('caption'),
                _e.clearToMarker(),
                (B = $t),
                !0)
              : !1;
          }
          switch (f) {
            case 2:
              switch (h) {
                case 'caption':
                case 'col':
                case 'colgroup':
                case 'tbody':
                case 'td':
                case 'tfoot':
                case 'th':
                case 'thead':
                case 'tr':
                  P() && B(f, h, w, L);
                  return;
              }
              break;
            case 3:
              switch (h) {
                case 'caption':
                  P();
                  return;
                case 'table':
                  P() && B(f, h, w, L);
                  return;
                case 'body':
                case 'col':
                case 'colgroup':
                case 'html':
                case 'tbody':
                case 'td':
                case 'tfoot':
                case 'th':
                case 'thead':
                case 'tr':
                  return;
              }
              break;
          }
          ae(f, h, w, L);
        }
        function Aa(f, h, w, L) {
          switch (f) {
            case 1:
              var P = h.match(Or);
              if (
                (P && (cn(P[0]), (h = h.substring(P[0].length))),
                h.length === 0)
              )
                return;
              break;
            case 4:
              an(h);
              return;
            case 5:
              return;
            case 2:
              switch (h) {
                case 'html':
                  ae(f, h, w, L);
                  return;
                case 'col':
                  he(h, w), N.pop();
                  return;
                case 'template':
                  Ye(f, h, w, L);
                  return;
              }
              break;
            case 3:
              switch (h) {
                case 'colgroup':
                  if (!ke(N.top, 'colgroup')) return;
                  N.pop(), (B = $t);
                  return;
                case 'col':
                  return;
                case 'template':
                  Ye(f, h, w, L);
                  return;
              }
              break;
            case -1:
              ae(f, h, w, L);
              return;
          }
          ke(N.top, 'colgroup') && (Aa(m, 'colgroup'), B(f, h, w, L));
        }
        function Ur(f, h, w, L) {
          function P() {
            (!N.inTableScope('tbody') &&
              !N.inTableScope('thead') &&
              !N.inTableScope('tfoot')) ||
              (N.clearToContext(F),
              Ur(m, N.top.localName, null),
              B(f, h, w, L));
          }
          switch (f) {
            case 2:
              switch (h) {
                case 'tr':
                  N.clearToContext(F), he(h, w), (B = As);
                  return;
                case 'th':
                case 'td':
                  Ur(d, 'tr', null), B(f, h, w, L);
                  return;
                case 'caption':
                case 'col':
                case 'colgroup':
                case 'tbody':
                case 'tfoot':
                case 'thead':
                  P();
                  return;
              }
              break;
            case 3:
              switch (h) {
                case 'table':
                  P();
                  return;
                case 'tbody':
                case 'tfoot':
                case 'thead':
                  N.inTableScope(h) && (N.clearToContext(F), N.pop(), (B = $t));
                  return;
                case 'body':
                case 'caption':
                case 'col':
                case 'colgroup':
                case 'html':
                case 'td':
                case 'th':
                case 'tr':
                  return;
              }
              break;
          }
          $t(f, h, w, L);
        }
        function As(f, h, w, L) {
          function P() {
            return N.inTableScope('tr')
              ? (N.clearToContext(Y), N.pop(), (B = Ur), !0)
              : !1;
          }
          switch (f) {
            case 2:
              switch (h) {
                case 'th':
                case 'td':
                  N.clearToContext(Y), he(h, w), (B = wi), _e.insertMarker();
                  return;
                case 'caption':
                case 'col':
                case 'colgroup':
                case 'tbody':
                case 'tfoot':
                case 'thead':
                case 'tr':
                  P() && B(f, h, w, L);
                  return;
              }
              break;
            case 3:
              switch (h) {
                case 'tr':
                  P();
                  return;
                case 'table':
                  P() && B(f, h, w, L);
                  return;
                case 'tbody':
                case 'tfoot':
                case 'thead':
                  N.inTableScope(h) && P() && B(f, h, w, L);
                  return;
                case 'body':
                case 'caption':
                case 'col':
                case 'colgroup':
                case 'html':
                case 'td':
                case 'th':
                  return;
              }
              break;
          }
          $t(f, h, w, L);
        }
        function wi(f, h, w, L) {
          switch (f) {
            case 2:
              switch (h) {
                case 'caption':
                case 'col':
                case 'colgroup':
                case 'tbody':
                case 'td':
                case 'tfoot':
                case 'th':
                case 'thead':
                case 'tr':
                  N.inTableScope('td')
                    ? (wi(m, 'td'), B(f, h, w, L))
                    : N.inTableScope('th') && (wi(m, 'th'), B(f, h, w, L));
                  return;
              }
              break;
            case 3:
              switch (h) {
                case 'td':
                case 'th':
                  if (!N.inTableScope(h)) return;
                  N.generateImpliedEndTags(),
                    N.popTag(h),
                    _e.clearToMarker(),
                    (B = As);
                  return;
                case 'body':
                case 'caption':
                case 'col':
                case 'colgroup':
                case 'html':
                  return;
                case 'table':
                case 'tbody':
                case 'tfoot':
                case 'thead':
                case 'tr':
                  if (!N.inTableScope(h)) return;
                  wi(m, N.inTableScope('td') ? 'td' : 'th'), B(f, h, w, L);
                  return;
              }
              break;
          }
          ae(f, h, w, L);
        }
        function An(f, h, w, L) {
          switch (f) {
            case 1:
              if (Xn && ((h = h.replace(aa, '')), h.length === 0)) return;
              cn(h);
              return;
            case 4:
              an(h);
              return;
            case 5:
              return;
            case -1:
              ae(f, h, w, L);
              return;
            case 2:
              switch (h) {
                case 'html':
                  ae(f, h, w, L);
                  return;
                case 'option':
                  N.top instanceof a.HTMLOptionElement && An(m, h), he(h, w);
                  return;
                case 'optgroup':
                  N.top instanceof a.HTMLOptionElement && An(m, 'option'),
                    N.top instanceof a.HTMLOptGroupElement && An(m, h),
                    he(h, w);
                  return;
                case 'select':
                  An(m, h);
                  return;
                case 'input':
                case 'keygen':
                case 'textarea':
                  if (!N.inSelectScope('select')) return;
                  An(m, 'select'), B(f, h, w, L);
                  return;
                case 'script':
                case 'template':
                  Ye(f, h, w, L);
                  return;
              }
              break;
            case 3:
              switch (h) {
                case 'optgroup':
                  N.top instanceof a.HTMLOptionElement &&
                    N.elements[N.elements.length - 2] instanceof
                      a.HTMLOptGroupElement &&
                    An(m, 'option'),
                    N.top instanceof a.HTMLOptGroupElement && N.pop();
                  return;
                case 'option':
                  N.top instanceof a.HTMLOptionElement && N.pop();
                  return;
                case 'select':
                  if (!N.inSelectScope(h)) return;
                  N.popTag(h), Is();
                  return;
                case 'template':
                  Ye(f, h, w, L);
                  return;
              }
              break;
          }
        }
        function xa(f, h, w, L) {
          switch (h) {
            case 'caption':
            case 'table':
            case 'tbody':
            case 'tfoot':
            case 'thead':
            case 'tr':
            case 'td':
            case 'th':
              switch (f) {
                case 2:
                  xa(m, 'select'), B(f, h, w, L);
                  return;
                case 3:
                  N.inTableScope(h) && (xa(m, 'select'), B(f, h, w, L));
                  return;
              }
          }
          An(f, h, w, L);
        }
        function Fu(f, h, w, L) {
          function P(K) {
            (B = K), (Cn[Cn.length - 1] = B), B(f, h, w, L);
          }
          switch (f) {
            case 1:
            case 4:
            case 5:
              ae(f, h, w, L);
              return;
            case -1:
              N.contains('template')
                ? (N.popTag('template'),
                  _e.clearToMarker(),
                  Cn.pop(),
                  Is(),
                  B(f, h, w, L))
                : Hr();
              return;
            case 2:
              switch (h) {
                case 'base':
                case 'basefont':
                case 'bgsound':
                case 'link':
                case 'meta':
                case 'noframes':
                case 'script':
                case 'style':
                case 'template':
                case 'title':
                  Ye(f, h, w, L);
                  return;
                case 'caption':
                case 'colgroup':
                case 'tbody':
                case 'tfoot':
                case 'thead':
                  P($t);
                  return;
                case 'col':
                  P(Aa);
                  return;
                case 'tr':
                  P(Ur);
                  return;
                case 'td':
                case 'th':
                  P(As);
                  return;
              }
              P(ae);
              return;
            case 3:
              switch (h) {
                case 'template':
                  Ye(f, h, w, L);
                  return;
                default:
                  return;
              }
          }
        }
        function Gm(f, h, w, L) {
          switch (f) {
            case 1:
              if (oa.test(h)) break;
              ae(f, h);
              return;
            case 4:
              N.elements[0]._appendChild(Ae.createComment(h));
              return;
            case 5:
              return;
            case -1:
              Hr();
              return;
            case 2:
              if (h === 'html') {
                ae(f, h, w, L);
                return;
              }
              break;
            case 3:
              if (h === 'html') {
                if (Fr) return;
                B = oD;
                return;
              }
              break;
          }
          (B = ae), B(f, h, w, L);
        }
        function ju(f, h, w, L) {
          switch (f) {
            case 1:
              (h = h.replace(Eu, '')), h.length > 0 && cn(h);
              return;
            case 4:
              an(h);
              return;
            case 5:
              return;
            case -1:
              Hr();
              return;
            case 2:
              switch (h) {
                case 'html':
                  ae(f, h, w, L);
                  return;
                case 'frameset':
                  he(h, w);
                  return;
                case 'frame':
                  he(h, w), N.pop();
                  return;
                case 'noframes':
                  Ye(f, h, w, L);
                  return;
              }
              break;
            case 3:
              if (h === 'frameset') {
                if (Fr && N.top instanceof a.HTMLHtmlElement) return;
                N.pop(),
                  !Fr && !(N.top instanceof a.HTMLFrameSetElement) && (B = sD);
                return;
              }
              break;
          }
        }
        function sD(f, h, w, L) {
          switch (f) {
            case 1:
              (h = h.replace(Eu, '')), h.length > 0 && cn(h);
              return;
            case 4:
              an(h);
              return;
            case 5:
              return;
            case -1:
              Hr();
              return;
            case 2:
              switch (h) {
                case 'html':
                  ae(f, h, w, L);
                  return;
                case 'noframes':
                  Ye(f, h, w, L);
                  return;
              }
              break;
            case 3:
              if (h === 'html') {
                B = aD;
                return;
              }
              break;
          }
        }
        function oD(f, h, w, L) {
          switch (f) {
            case 1:
              if (oa.test(h)) break;
              ae(f, h, w, L);
              return;
            case 4:
              Ae._appendChild(Ae.createComment(h));
              return;
            case 5:
              ae(f, h, w, L);
              return;
            case -1:
              Hr();
              return;
            case 2:
              if (h === 'html') {
                ae(f, h, w, L);
                return;
              }
              break;
          }
          (B = ae), B(f, h, w, L);
        }
        function aD(f, h, w, L) {
          switch (f) {
            case 1:
              (h = h.replace(Eu, '')), h.length > 0 && ae(f, h, w, L);
              return;
            case 4:
              Ae._appendChild(Ae.createComment(h));
              return;
            case 5:
              ae(f, h, w, L);
              return;
            case -1:
              Hr();
              return;
            case 2:
              switch (h) {
                case 'html':
                  ae(f, h, w, L);
                  return;
                case 'noframes':
                  Ye(f, h, w, L);
                  return;
              }
              break;
          }
        }
        function Wm(f, h, w, L) {
          function P(We) {
            for (var lt = 0, qt = We.length; lt < qt; lt++)
              switch (We[lt][0]) {
                case 'color':
                case 'face':
                case 'size':
                  return !0;
              }
            return !1;
          }
          var K;
          switch (f) {
            case 1:
              Qe && i_.test(h) && (Qe = !1),
                Xn && (h = h.replace(aa, '\uFFFD')),
                cn(h);
              return;
            case 4:
              an(h);
              return;
            case 5:
              return;
            case 2:
              switch (h) {
                case 'font':
                  if (!P(w)) break;
                case 'b':
                case 'big':
                case 'blockquote':
                case 'body':
                case 'br':
                case 'center':
                case 'code':
                case 'dd':
                case 'div':
                case 'dl':
                case 'dt':
                case 'em':
                case 'embed':
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                case 'head':
                case 'hr':
                case 'i':
                case 'img':
                case 'li':
                case 'listing':
                case 'menu':
                case 'meta':
                case 'nobr':
                case 'ol':
                case 'p':
                case 'pre':
                case 'ruby':
                case 's':
                case 'small':
                case 'span':
                case 'strong':
                case 'strike':
                case 'sub':
                case 'sup':
                case 'table':
                case 'tt':
                case 'u':
                case 'ul':
                case 'var':
                  if (Fr) break;
                  do N.pop(), (K = N.top);
                  while (K.namespaceURI !== s.HTML && !Tm(K) && !Sm(K));
                  Xe(f, h, w, L);
                  return;
              }
              (K = N.elements.length === 1 && Fr ? V : N.top),
                K.namespaceURI === s.MATHML
                  ? Im(w)
                  : K.namespaceURI === s.SVG && ((h = o_(h)), Cm(w)),
                bu(w),
                Su(h, w, K.namespaceURI),
                L && (h === 'script' && (K.namespaceURI, s.SVG), N.pop());
              return;
            case 3:
              if (
                ((K = N.top),
                h === 'script' &&
                  K.namespaceURI === s.SVG &&
                  K.localName === 'script')
              )
                N.pop();
              else
                for (var ce = N.elements.length - 1, Ce = N.elements[ce]; ; ) {
                  if (Ce.localName.toLowerCase() === h) {
                    N.popElement(Ce);
                    break;
                  }
                  if (((Ce = N.elements[--ce]), Ce.namespaceURI === s.HTML)) {
                    B(f, h, w, L);
                    break;
                  }
                }
              return;
          }
        }
        return (
          (pa.testTokenizer = function (f, h, w, L) {
            var P = [];
            switch (h) {
              case 'PCDATA state':
                A = Se;
                break;
              case 'RCDATA state':
                A = nr;
                break;
              case 'RAWTEXT state':
                A = Ms;
                break;
              case 'PLAINTEXT state':
                A = Iu;
                break;
            }
            if (
              (w && (la = w),
              (Xe = function (ce, Ce, We, lt) {
                switch ((bi(), ce)) {
                  case 1:
                    P.length > 0 && P[P.length - 1][0] === 'Character'
                      ? (P[P.length - 1][1] += Ce)
                      : P.push(['Character', Ce]);
                    break;
                  case 4:
                    P.push(['Comment', Ce]);
                    break;
                  case 5:
                    P.push([
                      'DOCTYPE',
                      Ce,
                      We === void 0 ? null : We,
                      lt === void 0 ? null : lt,
                      !wu,
                    ]);
                    break;
                  case 2:
                    for (
                      var qt = Object.create(null), Qt = 0;
                      Qt < We.length;
                      Qt++
                    ) {
                      var $r = We[Qt];
                      $r.length === 1 ? (qt[$r[0]] = '') : (qt[$r[0]] = $r[1]);
                    }
                    var ar = ['StartTag', Ce, qt];
                    lt && ar.push(!0), P.push(ar);
                    break;
                  case 3:
                    P.push(['EndTag', Ce]);
                    break;
                  case -1:
                    break;
                }
              }),
              !L)
            )
              this.parse(f, !0);
            else {
              for (var K = 0; K < f.length; K++) this.parse(f[K]);
              this.parse('', !0);
            }
            return P;
          }),
          pa
        );
      }
    },
  }),
  eu = oe({
    'external/npm/node_modules/domino/lib/DOMImplementation.js'(t, e) {
      'use strict';
      e.exports = a;
      var n = kp(),
        r = Lp(),
        i = Pp(),
        s = tt(),
        o = Mp();
      function a(l) {
        this.contextObject = l;
      }
      var c = {
        xml: { '': !0, '1.0': !0, '2.0': !0 },
        core: { '': !0, '2.0': !0 },
        html: { '': !0, '1.0': !0, '2.0': !0 },
        xhtml: { '': !0, '1.0': !0, '2.0': !0 },
      };
      a.prototype = {
        hasFeature: function (u, d) {
          var m = c[(u || '').toLowerCase()];
          return (m && m[d || '']) || !1;
        },
        createDocumentType: function (u, d, m) {
          return (
            o.isValidQName(u) || s.InvalidCharacterError(),
            new r(this.contextObject, u, d, m)
          );
        },
        createDocument: function (u, d, m) {
          var E = new n(!1, null),
            I;
          return (
            d ? (I = E.createElementNS(u, d)) : (I = null),
            m && E.appendChild(m),
            I && E.appendChild(I),
            u === s.NAMESPACE.HTML
              ? (E._contentType = 'application/xhtml+xml')
              : u === s.NAMESPACE.SVG
              ? (E._contentType = 'image/svg+xml')
              : (E._contentType = 'application/xml'),
            E
          );
        },
        createHTMLDocument: function (u) {
          var d = new n(!0, null);
          d.appendChild(new r(d, 'html'));
          var m = d.createElement('html');
          d.appendChild(m);
          var E = d.createElement('head');
          if ((m.appendChild(E), u !== void 0)) {
            var I = d.createElement('title');
            E.appendChild(I), I.appendChild(d.createTextNode(u));
          }
          return m.appendChild(d.createElement('body')), (d.modclock = 1), d;
        },
        mozSetOutputMutationHandler: function (l, u) {
          l.mutationHandler = u;
        },
        mozGetInputMutationHandler: function (l) {
          s.nyi();
        },
        mozHTMLParser: i,
      };
    },
  }),
  Hx = oe({
    'external/npm/node_modules/domino/lib/Location.js'(t, e) {
      'use strict';
      var n = xp(),
        r = J0();
      e.exports = i;
      function i(s, o) {
        (this._window = s), (this._href = o);
      }
      i.prototype = Object.create(r.prototype, {
        constructor: { value: i },
        href: {
          get: function () {
            return this._href;
          },
          set: function (s) {
            this.assign(s);
          },
        },
        assign: {
          value: function (s) {
            var o = new n(this._href),
              a = o.resolve(s);
            this._href = a;
          },
        },
        replace: {
          value: function (s) {
            this.assign(s);
          },
        },
        reload: {
          value: function () {
            this.assign(this.href);
          },
        },
        toString: {
          value: function () {
            return this.href;
          },
        },
      });
    },
  }),
  Bx = oe({
    'external/npm/node_modules/domino/lib/NavigatorID.js'(t, e) {
      'use strict';
      var n = Object.create(null, {
        appCodeName: { value: 'Mozilla' },
        appName: { value: 'Netscape' },
        appVersion: { value: '4.0' },
        platform: { value: '' },
        product: { value: 'Gecko' },
        productSub: { value: '20100101' },
        userAgent: { value: '' },
        vendor: { value: '' },
        vendorSub: { value: '' },
        taintEnabled: {
          value: function () {
            return !1;
          },
        },
      });
      e.exports = n;
    },
  }),
  Vx = oe({
    'external/npm/node_modules/domino/lib/WindowTimers.js'(t, e) {
      'use strict';
      var n = { setTimeout, clearTimeout, setInterval, clearInterval };
      e.exports = n;
    },
  }),
  nw = oe({
    'external/npm/node_modules/domino/lib/impl.js'(t, e) {
      'use strict';
      var n = tt();
      (t = e.exports =
        {
          CSSStyleDeclaration: Rp(),
          CharacterData: Xl(),
          Comment: K0(),
          DOMException: Sp(),
          DOMImplementation: eu(),
          DOMTokenList: $0(),
          Document: kp(),
          DocumentFragment: Q0(),
          DocumentType: Lp(),
          Element: Fo(),
          HTMLParser: Pp(),
          NamedNodeMap: z0(),
          Node: yt(),
          NodeList: ds(),
          NodeFilter: Jl(),
          ProcessingInstruction: Y0(),
          Text: W0(),
          Window: rw(),
        }),
        n.merge(t, X0()),
        n.merge(t, Op().elements),
        n.merge(t, tw().elements);
    },
  }),
  rw = oe({
    'external/npm/node_modules/domino/lib/Window.js'(t, e) {
      'use strict';
      var n = eu(),
        r = H0(),
        i = Hx(),
        s = tt();
      e.exports = o;
      function o(a) {
        (this.document = a || new n(null).createHTMLDocument('')),
          (this.document._scripting_enabled = !0),
          (this.document.defaultView = this),
          (this.location = new i(
            this,
            this.document._address || 'about:blank'
          ));
      }
      (o.prototype = Object.create(r.prototype, {
        console: { value: console },
        history: { value: { back: s.nyi, forward: s.nyi, go: s.nyi } },
        navigator: { value: Bx() },
        window: {
          get: function () {
            return this;
          },
        },
        self: {
          get: function () {
            return this;
          },
        },
        frames: {
          get: function () {
            return this;
          },
        },
        parent: {
          get: function () {
            return this;
          },
        },
        top: {
          get: function () {
            return this;
          },
        },
        length: { value: 0 },
        frameElement: { value: null },
        opener: { value: null },
        onload: {
          get: function () {
            return this._getEventHandler('load');
          },
          set: function (a) {
            this._setEventHandler('load', a);
          },
        },
        getComputedStyle: {
          value: function (c) {
            return c.style;
          },
        },
      })),
        s.expose(Vx(), o),
        s.expose(nw(), o);
    },
  }),
  Ux = oe({
    'external/npm/node_modules/domino/lib/index.js'(t) {
      var e = eu(),
        n = Pp(),
        r = rw(),
        i = nw();
      (t.createDOMImplementation = function () {
        return new e(null);
      }),
        (t.createDocument = function (s, o) {
          if (s || o) {
            var a = new n();
            return a.parse(s || '', !0), a.document();
          }
          return new e(null).createHTMLDocument('');
        }),
        (t.createIncrementalHTMLParser = function () {
          var s = new n();
          return {
            write: function (o) {
              o.length > 0 &&
                s.parse(o, !1, function () {
                  return !0;
                });
            },
            end: function (o) {
              s.parse(o || '', !0, function () {
                return !0;
              });
            },
            process: function (o) {
              return s.parse('', !1, o);
            },
            document: function () {
              return s.document();
            },
          };
        }),
        (t.createWindow = function (s, o) {
          var a = t.createDocument(s);
          return o !== void 0 && (a._address = o), new i.Window(a);
        }),
        (t.impl = i);
    },
  }),
  Zl = Ux();
function $x() {
  Object.assign(globalThis, Zl.impl),
    (globalThis.KeyboardEvent = Zl.impl.Event);
}
function iw(t, e = '/') {
  return Zl.createWindow(t, e).document;
}
function qx(t) {
  return t.serialize();
}
var Tp = class t extends Do {
    constructor() {
      super(...arguments), (this.supportsDOMEvents = !1);
    }
    static makeCurrent() {
      $x(), Cl(new t());
    }
    createHtmlDocument() {
      return iw(
        '<html><head><title>fakeTitle</title></head><body></body></html>'
      );
    }
    getDefaultDocument() {
      return t.defaultDoc || (t.defaultDoc = Zl.createDocument()), t.defaultDoc;
    }
    isElementNode(e) {
      return e ? e.nodeType === t.defaultDoc.ELEMENT_NODE : !1;
    }
    isShadowRoot(e) {
      return e.shadowRoot == e;
    }
    getGlobalEventTarget(e, n) {
      return n === 'window'
        ? e.defaultView
        : n === 'document'
        ? e
        : n === 'body'
        ? e.body
        : null;
    }
    getBaseHref(e) {
      return (
        e.documentElement.querySelector('base')?.getAttribute('href') || ''
      );
    }
    dispatchEvent(e, n) {
      e.dispatchEvent(n);
      let i = (e.ownerDocument || e).defaultView;
      i && i.dispatchEvent(n);
    }
    getUserAgent() {
      return 'Fake user agent';
    }
    getCookie(e) {
      throw new Error('getCookie has not been implemented');
    }
  },
  sw = (() => {
    let e = class e {
      constructor(r) {
        this._doc = r;
      }
      renderToString() {
        return qx(this._doc);
      }
      getDocument() {
        return this._doc;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(X(Ve));
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  zx = (() => {
    let e = class e {
      ɵloadImpl() {
        return _i(this, null, function* () {
          if (!this.xhrImpl) {
            let { default: r } = yield import('./chunk-REXDUWBJ.mjs');
            this.xhrImpl = r;
          }
        });
      }
      build() {
        let r = this.xhrImpl;
        if (!r)
          throw new Error(
            'Unexpected state in ServerXhr: XHR implementation is not loaded.'
          );
        return new r.XMLHttpRequest();
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })();
function Gx(t, e) {
  let n = W(ss),
    { href: r, protocol: i, hostname: s, port: o } = n;
  if (!i.startsWith('http')) return e(t);
  let a = `${i}//${s}`;
  o && (a += `:${o}`);
  let c = n.getBaseHrefFromDOM() || r,
    l = new URL(c, a),
    u = new URL(t.url, l).toString();
  return e(t.clone({ url: u }));
}
var Wx = [
    { provide: is, useClass: zx },
    { provide: Uh, useValue: Gx, multi: !0 },
  ],
  tu = new le('Server.INITIAL_CONFIG'),
  ow = new le('Server.RENDER_MODULE_HOOK'),
  Yl = 'resolve:';
function Dp(t) {
  let {
    hostname: e,
    protocol: n,
    port: r,
    pathname: i,
    search: s,
    hash: o,
  } = new URL(t, Yl + '//');
  return (
    n !== Yl &&
      r === '' &&
      /\:(80|443)/.test(t) &&
      (r = n === 'http:' ? '80' : '443'),
    n === Yl && t.charAt(0) !== '/' && (i = i.slice(1)),
    {
      hostname: e,
      protocol: n === Yl ? '' : n,
      port: r,
      pathname: i,
      search: s,
      hash: o,
    }
  );
}
var Kx = (() => {
    let e = class e {
      constructor(r, i) {
        (this._doc = r),
          (this.href = '/'),
          (this.hostname = '/'),
          (this.protocol = '/'),
          (this.port = '/'),
          (this.pathname = '/'),
          (this.search = ''),
          (this.hash = ''),
          (this._hashUpdate = new st());
        let s = i;
        if (s) {
          if (s.url) {
            let o = Dp(s.url);
            (this.protocol = o.protocol),
              (this.hostname = o.hostname),
              (this.port = o.port),
              (this.pathname = o.pathname),
              (this.search = o.search),
              (this.hash = o.hash),
              (this.href = r.location.href);
          }
          if (s.useAbsoluteUrl) {
            if (!s.baseUrl)
              throw new Error(
                '"PlatformConfig.baseUrl" must be set if "useAbsoluteUrl" is true'
              );
            let o = Dp(s.baseUrl);
            (this.protocol = o.protocol),
              (this.hostname = o.hostname),
              (this.port = o.port);
          }
        }
      }
      getBaseHrefFromDOM() {
        return vn().getBaseHref(this._doc);
      }
      onPopState(r) {
        return () => {};
      }
      onHashChange(r) {
        let i = this._hashUpdate.subscribe(r);
        return () => i.unsubscribe();
      }
      get url() {
        return `${this.pathname}${this.search}${this.hash}`;
      }
      setHash(r, i) {
        if (this.hash === r) return;
        this.hash = r;
        let s = this.url;
        queueMicrotask(() =>
          this._hashUpdate.next({
            type: 'hashchange',
            state: null,
            oldUrl: i,
            newUrl: s,
          })
        );
      }
      replaceState(r, i, s) {
        let o = this.url,
          a = Dp(s);
        (this.pathname = a.pathname),
          (this.search = a.search),
          this.setHash(a.hash, o);
      }
      pushState(r, i, s) {
        this.replaceState(r, i, s);
      }
      forward() {
        throw new Error('Not implemented');
      }
      back() {
        throw new Error('Not implemented');
      }
      getState() {}
    };
    (e.ɵfac = function (i) {
      return new (i || e)(X(Ve), X(tu, 8));
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  Qx = (() => {
    let e = class e extends as {
      constructor(r) {
        super(r), (this.doc = r);
      }
      supports(r) {
        return !0;
      }
      addEventListener(r, i, s) {
        return vn().onAndCancel(r, i, s);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(X(Ve));
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  Yx = [{ provide: ow, useFactory: Zx, deps: [Ve, ts, yn], multi: !0 }];
function Zx(t, e, n) {
  return () => {
    let r = n.toJson();
    if (n.isEmpty) return;
    let i = t.createElement('script');
    (i.id = e + '-state'),
      i.setAttribute('type', 'application/json'),
      (i.textContent = r),
      t.body.appendChild(i);
  };
}
var Xx = [
  { provide: Ve, useFactory: nR, deps: [Ct] },
  { provide: sn, useValue: Lh },
  { provide: fo, useFactory: Jx, multi: !0 },
  { provide: ss, useClass: Kx, deps: [Ve, [uo, tu]] },
  { provide: sw, deps: [Ve] },
  { provide: _l, useValue: !0 },
];
function Jx() {
  return () => {
    Tp.makeCurrent();
  };
}
var eR = [{ provide: To, multi: !0, useClass: Qx }],
  tR = [
    Yx,
    eR,
    Wx,
    { provide: Th, useValue: null },
    { provide: El, useValue: null },
    { provide: Il, useClass: Sl },
  ];
function nR(t) {
  let e = t.get(tu, null),
    n;
  return (
    e && e.document
      ? (n = typeof e.document == 'string' ? iw(e.document, e.url) : e.document)
      : (n = vn().createHtmlDocument()),
    Jc(n),
    n
  );
}
var rR = Dl(Mh, 'server', Xx);
function z9() {
  return Bn([P0(), ...tR]);
}
function aw(t) {
  let e = t.platformProviders ?? [];
  return rR([
    { provide: tu, useValue: { document: t.document, url: t.url } },
    e,
  ]);
}
function iR(t) {
  let e = t.createComment(hh);
  t.body.firstChild
    ? t.body.insertBefore(e, t.body.firstChild)
    : t.body.append(e);
}
function sR(t) {
  let e = t.injector,
    n = aR(e.get(oR, lw));
  t.components.forEach((r) => {
    let i = r.injector.get(mo),
      s = r.location.nativeElement;
    s && i.setAttribute(s, 'ng-server-context', n);
  });
}
function cw(t, e) {
  return _i(this, null, function* () {
    let n = e.injector;
    yield Eo(e);
    let r = t.injector.get(sw);
    if (e.injector.get(Fi, !1)) {
      let o = r.getDocument();
      iR(o), Ab(e, o);
    }
    let i = n.get(ow, null);
    if (i) {
      let o = [];
      for (let a of i)
        try {
          let c = a();
          c && o.push(c);
        } catch (c) {
          console.warn('Ignoring BEFORE_APP_SERIALIZED Exception: ', c);
        }
      if (o.length)
        for (let a of yield Promise.allSettled(o))
          a.status === 'rejected' &&
            console.warn(
              'Ignoring BEFORE_APP_SERIALIZED Exception: ',
              a.reason
            );
    }
    sR(e);
    let s = r.renderToString();
    return (
      yield new Promise((o) => {
        setTimeout(() => {
          t.destroy(), o();
        }, 0);
      }),
      s
    );
  });
}
var lw = 'other',
  oR = new le('SERVER_CONTEXT');
function aR(t) {
  let e = t.replace(/[^a-zA-Z0-9\-]/g, '');
  return e.length > 0 ? e : lw;
}
function G9(t, e) {
  return _i(this, null, function* () {
    let { document: n, url: r, extraProviders: i } = e,
      s = aw({ document: n, url: r, platformProviders: i }),
      a = (yield s.bootstrapModule(t)).injector.get(jt);
    return cw(s, a);
  });
}
function W9(t, e) {
  return _i(this, null, function* () {
    let n = aw(e),
      r = yield t();
    return cw(n, r);
  });
}
var ve = 'primary',
  Jo = Symbol('RouteTitle'),
  Vp = class {
    constructor(e) {
      this.params = e || {};
    }
    has(e) {
      return Object.prototype.hasOwnProperty.call(this.params, e);
    }
    get(e) {
      if (this.has(e)) {
        let n = this.params[e];
        return Array.isArray(n) ? n[0] : n;
      }
      return null;
    }
    getAll(e) {
      if (this.has(e)) {
        let n = this.params[e];
        return Array.isArray(n) ? n : [n];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function gs(t) {
  return new Vp(t);
}
function cR(t, e, n) {
  let r = n.path.split('/');
  if (
    r.length > t.length ||
    (n.pathMatch === 'full' && (e.hasChildren() || r.length < t.length))
  )
    return null;
  let i = {};
  for (let s = 0; s < r.length; s++) {
    let o = r[s],
      a = t[s];
    if (o.startsWith(':')) i[o.substring(1)] = a;
    else if (o !== a.path) return null;
  }
  return { consumed: t.slice(0, r.length), posParams: i };
}
function lR(t, e) {
  if (t.length !== e.length) return !1;
  for (let n = 0; n < t.length; ++n) if (!wn(t[n], e[n])) return !1;
  return !0;
}
function wn(t, e) {
  let n = t ? Up(t) : void 0,
    r = e ? Up(e) : void 0;
  if (!n || !r || n.length != r.length) return !1;
  let i;
  for (let s = 0; s < n.length; s++)
    if (((i = n[s]), !vw(t[i], e[i]))) return !1;
  return !0;
}
function Up(t) {
  return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)];
}
function vw(t, e) {
  if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length) return !1;
    let n = [...t].sort(),
      r = [...e].sort();
    return n.every((i, s) => r[s] === i);
  } else return t === e;
}
function Ew(t) {
  return t.length > 0 ? t[t.length - 1] : null;
}
function Rr(t) {
  return Ju(t) ? t : yo(t) ? ze(Promise.resolve(t)) : ue(t);
}
var uR = { exact: ww, subset: _w },
  bw = { exact: dR, subset: fR, ignored: () => !0 };
function uw(t, e, n) {
  return (
    uR[n.paths](t.root, e.root, n.matrixParams) &&
    bw[n.queryParams](t.queryParams, e.queryParams) &&
    !(n.fragment === 'exact' && t.fragment !== e.fragment)
  );
}
function dR(t, e) {
  return wn(t, e);
}
function ww(t, e, n) {
  if (
    !gi(t.segments, e.segments) ||
    !iu(t.segments, e.segments, n) ||
    t.numberOfChildren !== e.numberOfChildren
  )
    return !1;
  for (let r in e.children)
    if (!t.children[r] || !ww(t.children[r], e.children[r], n)) return !1;
  return !0;
}
function fR(t, e) {
  return (
    Object.keys(e).length <= Object.keys(t).length &&
    Object.keys(e).every((n) => vw(t[n], e[n]))
  );
}
function _w(t, e, n) {
  return Dw(t, e, e.segments, n);
}
function Dw(t, e, n, r) {
  if (t.segments.length > n.length) {
    let i = t.segments.slice(0, n.length);
    return !(!gi(i, n) || e.hasChildren() || !iu(i, n, r));
  } else if (t.segments.length === n.length) {
    if (!gi(t.segments, n) || !iu(t.segments, n, r)) return !1;
    for (let i in e.children)
      if (!t.children[i] || !_w(t.children[i], e.children[i], r)) return !1;
    return !0;
  } else {
    let i = n.slice(0, t.segments.length),
      s = n.slice(t.segments.length);
    return !gi(t.segments, i) || !iu(t.segments, i, r) || !t.children[ve]
      ? !1
      : Dw(t.children[ve], e, s, r);
  }
}
function iu(t, e, n) {
  return e.every((r, i) => bw[n](t[i].parameters, r.parameters));
}
var Mr = class {
    constructor(e = new je([], {}), n = {}, r = null) {
      (this.root = e), (this.queryParams = n), (this.fragment = r);
    }
    get queryParamMap() {
      return (
        this._queryParamMap || (this._queryParamMap = gs(this.queryParams)),
        this._queryParamMap
      );
    }
    toString() {
      return mR.serialize(this);
    }
  },
  je = class {
    constructor(e, n) {
      (this.segments = e),
        (this.children = n),
        (this.parent = null),
        Object.values(n).forEach((r) => (r.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return su(this);
    }
  },
  mi = class {
    constructor(e, n) {
      (this.path = e), (this.parameters = n);
    }
    get parameterMap() {
      return (
        this._parameterMap || (this._parameterMap = gs(this.parameters)),
        this._parameterMap
      );
    }
    toString() {
      return Sw(this);
    }
  };
function hR(t, e) {
  return gi(t, e) && t.every((n, r) => wn(n.parameters, e[r].parameters));
}
function gi(t, e) {
  return t.length !== e.length ? !1 : t.every((n, r) => n.path === e[r].path);
}
function pR(t, e) {
  let n = [];
  return (
    Object.entries(t.children).forEach(([r, i]) => {
      r === ve && (n = n.concat(e(i, r)));
    }),
    Object.entries(t.children).forEach(([r, i]) => {
      r !== ve && (n = n.concat(e(i, r)));
    }),
    n
  );
}
var ea = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({
        token: e,
        factory: () => (() => new qo())(),
        providedIn: 'root',
      }));
    let t = e;
    return t;
  })(),
  qo = class {
    parse(e) {
      let n = new qp(e);
      return new Mr(
        n.parseRootSegment(),
        n.parseQueryParams(),
        n.parseFragment()
      );
    }
    serialize(e) {
      let n = `/${jo(e.root, !0)}`,
        r = vR(e.queryParams),
        i = typeof e.fragment == 'string' ? `#${gR(e.fragment)}` : '';
      return `${n}${r}${i}`;
    }
  },
  mR = new qo();
function su(t) {
  return t.segments.map((e) => Sw(e)).join('/');
}
function jo(t, e) {
  if (!t.hasChildren()) return su(t);
  if (e) {
    let n = t.children[ve] ? jo(t.children[ve], !1) : '',
      r = [];
    return (
      Object.entries(t.children).forEach(([i, s]) => {
        i !== ve && r.push(`${i}:${jo(s, !1)}`);
      }),
      r.length > 0 ? `${n}(${r.join('//')})` : n
    );
  } else {
    let n = pR(t, (r, i) =>
      i === ve ? [jo(t.children[ve], !1)] : [`${i}:${jo(r, !1)}`]
    );
    return Object.keys(t.children).length === 1 && t.children[ve] != null
      ? `${su(t)}/${n[0]}`
      : `${su(t)}/(${n.join('//')})`;
  }
}
function Tw(t) {
  return encodeURIComponent(t)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',');
}
function nu(t) {
  return Tw(t).replace(/%3B/gi, ';');
}
function gR(t) {
  return encodeURI(t);
}
function $p(t) {
  return Tw(t)
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/%26/gi, '&');
}
function ou(t) {
  return decodeURIComponent(t);
}
function dw(t) {
  return ou(t.replace(/\+/g, '%20'));
}
function Sw(t) {
  return `${$p(t.path)}${yR(t.parameters)}`;
}
function yR(t) {
  return Object.keys(t)
    .map((e) => `;${$p(e)}=${$p(t[e])}`)
    .join('');
}
function vR(t) {
  let e = Object.keys(t)
    .map((n) => {
      let r = t[n];
      return Array.isArray(r)
        ? r.map((i) => `${nu(n)}=${nu(i)}`).join('&')
        : `${nu(n)}=${nu(r)}`;
    })
    .filter((n) => !!n);
  return e.length ? `?${e.join('&')}` : '';
}
var ER = /^[^\/()?;#]+/;
function Fp(t) {
  let e = t.match(ER);
  return e ? e[0] : '';
}
var bR = /^[^\/()?;=#]+/;
function wR(t) {
  let e = t.match(bR);
  return e ? e[0] : '';
}
var _R = /^[^=?&#]+/;
function DR(t) {
  let e = t.match(_R);
  return e ? e[0] : '';
}
var TR = /^[^&#]+/;
function SR(t) {
  let e = t.match(TR);
  return e ? e[0] : '';
}
var qp = class {
  constructor(e) {
    (this.url = e), (this.remaining = e);
  }
  parseRootSegment() {
    return (
      this.consumeOptional('/'),
      this.remaining === '' ||
      this.peekStartsWith('?') ||
      this.peekStartsWith('#')
        ? new je([], {})
        : new je([], this.parseChildren())
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
    let n = {};
    this.peekStartsWith('/(') &&
      (this.capture('/'), (n = this.parseParens(!0)));
    let r = {};
    return (
      this.peekStartsWith('(') && (r = this.parseParens(!1)),
      (e.length > 0 || Object.keys(n).length > 0) && (r[ve] = new je(e, n)),
      r
    );
  }
  parseSegment() {
    let e = Fp(this.remaining);
    if (e === '' && this.peekStartsWith(';')) throw new z(4009, !1);
    return this.capture(e), new mi(ou(e), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let e = {};
    for (; this.consumeOptional(';'); ) this.parseParam(e);
    return e;
  }
  parseParam(e) {
    let n = wR(this.remaining);
    if (!n) return;
    this.capture(n);
    let r = '';
    if (this.consumeOptional('=')) {
      let i = Fp(this.remaining);
      i && ((r = i), this.capture(r));
    }
    e[ou(n)] = ou(r);
  }
  parseQueryParam(e) {
    let n = DR(this.remaining);
    if (!n) return;
    this.capture(n);
    let r = '';
    if (this.consumeOptional('=')) {
      let o = SR(this.remaining);
      o && ((r = o), this.capture(r));
    }
    let i = dw(n),
      s = dw(r);
    if (e.hasOwnProperty(i)) {
      let o = e[i];
      Array.isArray(o) || ((o = [o]), (e[i] = o)), o.push(s);
    } else e[i] = s;
  }
  parseParens(e) {
    let n = {};
    for (
      this.capture('(');
      !this.consumeOptional(')') && this.remaining.length > 0;

    ) {
      let r = Fp(this.remaining),
        i = this.remaining[r.length];
      if (i !== '/' && i !== ')' && i !== ';') throw new z(4010, !1);
      let s;
      r.indexOf(':') > -1
        ? ((s = r.slice(0, r.indexOf(':'))), this.capture(s), this.capture(':'))
        : e && (s = ve);
      let o = this.parseChildren();
      (n[s] = Object.keys(o).length === 1 ? o[ve] : new je([], o)),
        this.consumeOptional('//');
    }
    return n;
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
    if (!this.consumeOptional(e)) throw new z(4011, !1);
  }
};
function Cw(t) {
  return t.segments.length > 0 ? new je([], { [ve]: t }) : t;
}
function Iw(t) {
  let e = {};
  for (let r of Object.keys(t.children)) {
    let i = t.children[r],
      s = Iw(i);
    if (r === ve && s.segments.length === 0 && s.hasChildren())
      for (let [o, a] of Object.entries(s.children)) e[o] = a;
    else (s.segments.length > 0 || s.hasChildren()) && (e[r] = s);
  }
  let n = new je(t.segments, e);
  return CR(n);
}
function CR(t) {
  if (t.numberOfChildren === 1 && t.children[ve]) {
    let e = t.children[ve];
    return new je(t.segments.concat(e.segments), e.children);
  }
  return t;
}
function ys(t) {
  return t instanceof Mr;
}
function IR(t, e, n = null, r = null) {
  let i = Mw(t);
  return Nw(i, e, n, r);
}
function Mw(t) {
  let e;
  function n(s) {
    let o = {};
    for (let c of s.children) {
      let l = n(c);
      o[c.outlet] = l;
    }
    let a = new je(s.url, o);
    return s === t && (e = a), a;
  }
  let r = n(t.root),
    i = Cw(r);
  return e ?? i;
}
function Nw(t, e, n, r) {
  let i = t;
  for (; i.parent; ) i = i.parent;
  if (e.length === 0) return jp(i, i, i, n, r);
  let s = MR(e);
  if (s.toRoot()) return jp(i, i, new je([], {}), n, r);
  let o = NR(s, i, t),
    a = o.processChildren
      ? Vo(o.segmentGroup, o.index, s.commands)
      : xw(o.segmentGroup, o.index, s.commands);
  return jp(i, o.segmentGroup, a, n, r);
}
function au(t) {
  return typeof t == 'object' && t != null && !t.outlets && !t.segmentPath;
}
function zo(t) {
  return typeof t == 'object' && t != null && t.outlets;
}
function jp(t, e, n, r, i) {
  let s = {};
  r &&
    Object.entries(r).forEach(([c, l]) => {
      s[c] = Array.isArray(l) ? l.map((u) => `${u}`) : `${l}`;
    });
  let o;
  t === e ? (o = n) : (o = Aw(t, e, n));
  let a = Cw(Iw(o));
  return new Mr(a, s, i);
}
function Aw(t, e, n) {
  let r = {};
  return (
    Object.entries(t.children).forEach(([i, s]) => {
      s === e ? (r[i] = n) : (r[i] = Aw(s, e, n));
    }),
    new je(t.segments, r)
  );
}
var cu = class {
  constructor(e, n, r) {
    if (
      ((this.isAbsolute = e),
      (this.numberOfDoubleDots = n),
      (this.commands = r),
      e && r.length > 0 && au(r[0]))
    )
      throw new z(4003, !1);
    let i = r.find(zo);
    if (i && i !== Ew(r)) throw new z(4004, !1);
  }
  toRoot() {
    return (
      this.isAbsolute && this.commands.length === 1 && this.commands[0] == '/'
    );
  }
};
function MR(t) {
  if (typeof t[0] == 'string' && t.length === 1 && t[0] === '/')
    return new cu(!0, 0, t);
  let e = 0,
    n = !1,
    r = t.reduce((i, s, o) => {
      if (typeof s == 'object' && s != null) {
        if (s.outlets) {
          let a = {};
          return (
            Object.entries(s.outlets).forEach(([c, l]) => {
              a[c] = typeof l == 'string' ? l.split('/') : l;
            }),
            [...i, { outlets: a }]
          );
        }
        if (s.segmentPath) return [...i, s.segmentPath];
      }
      return typeof s != 'string'
        ? [...i, s]
        : o === 0
        ? (s.split('/').forEach((a, c) => {
            (c == 0 && a === '.') ||
              (c == 0 && a === ''
                ? (n = !0)
                : a === '..'
                ? e++
                : a != '' && i.push(a));
          }),
          i)
        : [...i, s];
    }, []);
  return new cu(n, e, r);
}
var ps = class {
  constructor(e, n, r) {
    (this.segmentGroup = e), (this.processChildren = n), (this.index = r);
  }
};
function NR(t, e, n) {
  if (t.isAbsolute) return new ps(e, !0, 0);
  if (!n) return new ps(e, !1, NaN);
  if (n.parent === null) return new ps(n, !0, 0);
  let r = au(t.commands[0]) ? 0 : 1,
    i = n.segments.length - 1 + r;
  return AR(n, i, t.numberOfDoubleDots);
}
function AR(t, e, n) {
  let r = t,
    i = e,
    s = n;
  for (; s > i; ) {
    if (((s -= i), (r = r.parent), !r)) throw new z(4005, !1);
    i = r.segments.length;
  }
  return new ps(r, !1, i - s);
}
function xR(t) {
  return zo(t[0]) ? t[0].outlets : { [ve]: t };
}
function xw(t, e, n) {
  if ((t || (t = new je([], {})), t.segments.length === 0 && t.hasChildren()))
    return Vo(t, e, n);
  let r = RR(t, e, n),
    i = n.slice(r.commandIndex);
  if (r.match && r.pathIndex < t.segments.length) {
    let s = new je(t.segments.slice(0, r.pathIndex), {});
    return (
      (s.children[ve] = new je(t.segments.slice(r.pathIndex), t.children)),
      Vo(s, 0, i)
    );
  } else
    return r.match && i.length === 0
      ? new je(t.segments, {})
      : r.match && !t.hasChildren()
      ? zp(t, e, n)
      : r.match
      ? Vo(t, 0, i)
      : zp(t, e, n);
}
function Vo(t, e, n) {
  if (n.length === 0) return new je(t.segments, {});
  {
    let r = xR(n),
      i = {};
    if (
      Object.keys(r).some((s) => s !== ve) &&
      t.children[ve] &&
      t.numberOfChildren === 1 &&
      t.children[ve].segments.length === 0
    ) {
      let s = Vo(t.children[ve], e, n);
      return new je(t.segments, s.children);
    }
    return (
      Object.entries(r).forEach(([s, o]) => {
        typeof o == 'string' && (o = [o]),
          o !== null && (i[s] = xw(t.children[s], e, o));
      }),
      Object.entries(t.children).forEach(([s, o]) => {
        r[s] === void 0 && (i[s] = o);
      }),
      new je(t.segments, i)
    );
  }
}
function RR(t, e, n) {
  let r = 0,
    i = e,
    s = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; i < t.segments.length; ) {
    if (r >= n.length) return s;
    let o = t.segments[i],
      a = n[r];
    if (zo(a)) break;
    let c = `${a}`,
      l = r < n.length - 1 ? n[r + 1] : null;
    if (i > 0 && c === void 0) break;
    if (c && l && typeof l == 'object' && l.outlets === void 0) {
      if (!hw(c, l, o)) return s;
      r += 2;
    } else {
      if (!hw(c, {}, o)) return s;
      r++;
    }
    i++;
  }
  return { match: !0, pathIndex: i, commandIndex: r };
}
function zp(t, e, n) {
  let r = t.segments.slice(0, e),
    i = 0;
  for (; i < n.length; ) {
    let s = n[i];
    if (zo(s)) {
      let c = OR(s.outlets);
      return new je(r, c);
    }
    if (i === 0 && au(n[0])) {
      let c = t.segments[e];
      r.push(new mi(c.path, fw(n[0]))), i++;
      continue;
    }
    let o = zo(s) ? s.outlets[ve] : `${s}`,
      a = i < n.length - 1 ? n[i + 1] : null;
    o && a && au(a)
      ? (r.push(new mi(o, fw(a))), (i += 2))
      : (r.push(new mi(o, {})), i++);
  }
  return new je(r, {});
}
function OR(t) {
  let e = {};
  return (
    Object.entries(t).forEach(([n, r]) => {
      typeof r == 'string' && (r = [r]),
        r !== null && (e[n] = zp(new je([], {}), 0, r));
    }),
    e
  );
}
function fw(t) {
  let e = {};
  return Object.entries(t).forEach(([n, r]) => (e[n] = `${r}`)), e;
}
function hw(t, e, n) {
  return t == n.path && wn(e, n.parameters);
}
var Uo = 'imperative',
  Wt = class {
    constructor(e, n) {
      (this.id = e), (this.url = n);
    }
  },
  vs = class extends Wt {
    constructor(e, n, r = 'imperative', i = null) {
      super(e, n),
        (this.type = 0),
        (this.navigationTrigger = r),
        (this.restoredState = i);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  Gn = class extends Wt {
    constructor(e, n, r) {
      super(e, n), (this.urlAfterRedirects = r), (this.type = 1);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  Nr = class extends Wt {
    constructor(e, n, r, i) {
      super(e, n), (this.reason = r), (this.code = i), (this.type = 2);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  Ar = class extends Wt {
    constructor(e, n, r, i) {
      super(e, n), (this.reason = r), (this.code = i), (this.type = 16);
    }
  },
  Go = class extends Wt {
    constructor(e, n, r, i) {
      super(e, n), (this.error = r), (this.target = i), (this.type = 3);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  lu = class extends Wt {
    constructor(e, n, r, i) {
      super(e, n),
        (this.urlAfterRedirects = r),
        (this.state = i),
        (this.type = 4);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Gp = class extends Wt {
    constructor(e, n, r, i) {
      super(e, n),
        (this.urlAfterRedirects = r),
        (this.state = i),
        (this.type = 7);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Wp = class extends Wt {
    constructor(e, n, r, i, s) {
      super(e, n),
        (this.urlAfterRedirects = r),
        (this.state = i),
        (this.shouldActivate = s),
        (this.type = 8);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  Kp = class extends Wt {
    constructor(e, n, r, i) {
      super(e, n),
        (this.urlAfterRedirects = r),
        (this.state = i),
        (this.type = 5);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Qp = class extends Wt {
    constructor(e, n, r, i) {
      super(e, n),
        (this.urlAfterRedirects = r),
        (this.state = i),
        (this.type = 6);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Yp = class {
    constructor(e) {
      (this.route = e), (this.type = 9);
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  Zp = class {
    constructor(e) {
      (this.route = e), (this.type = 10);
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  Xp = class {
    constructor(e) {
      (this.snapshot = e), (this.type = 11);
    }
    toString() {
      return `ChildActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
      }')`;
    }
  },
  Jp = class {
    constructor(e) {
      (this.snapshot = e), (this.type = 12);
    }
    toString() {
      return `ChildActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
      }')`;
    }
  },
  em = class {
    constructor(e) {
      (this.snapshot = e), (this.type = 13);
    }
    toString() {
      return `ActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
      }')`;
    }
  },
  tm = class {
    constructor(e) {
      (this.snapshot = e), (this.type = 14);
    }
    toString() {
      return `ActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''
      }')`;
    }
  },
  uu = class {
    constructor(e, n, r) {
      (this.routerEvent = e),
        (this.position = n),
        (this.anchor = r),
        (this.type = 15);
    }
    toString() {
      let e = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
      return `Scroll(anchor: '${this.anchor}', position: '${e}')`;
    }
  },
  Wo = class {},
  Ko = class {
    constructor(e) {
      this.url = e;
    }
  };
var nm = class {
    constructor() {
      (this.outlet = null),
        (this.route = null),
        (this.injector = null),
        (this.children = new ta()),
        (this.attachRef = null);
    }
  },
  ta = (() => {
    let e = class e {
      constructor() {
        this.contexts = new Map();
      }
      onChildOutletCreated(r, i) {
        let s = this.getOrCreateContext(r);
        (s.outlet = i), this.contexts.set(r, s);
      }
      onChildOutletDestroyed(r) {
        let i = this.getContext(r);
        i && ((i.outlet = null), (i.attachRef = null));
      }
      onOutletDeactivated() {
        let r = this.contexts;
        return (this.contexts = new Map()), r;
      }
      onOutletReAttached(r) {
        this.contexts = r;
      }
      getOrCreateContext(r) {
        let i = this.getContext(r);
        return i || ((i = new nm()), this.contexts.set(r, i)), i;
      }
      getContext(r) {
        return this.contexts.get(r) || null;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  du = class {
    constructor(e) {
      this._root = e;
    }
    get root() {
      return this._root.value;
    }
    parent(e) {
      let n = this.pathFromRoot(e);
      return n.length > 1 ? n[n.length - 2] : null;
    }
    children(e) {
      let n = rm(e, this._root);
      return n ? n.children.map((r) => r.value) : [];
    }
    firstChild(e) {
      let n = rm(e, this._root);
      return n && n.children.length > 0 ? n.children[0].value : null;
    }
    siblings(e) {
      let n = im(e, this._root);
      return n.length < 2
        ? []
        : n[n.length - 2].children.map((i) => i.value).filter((i) => i !== e);
    }
    pathFromRoot(e) {
      return im(e, this._root).map((n) => n.value);
    }
  };
function rm(t, e) {
  if (t === e.value) return e;
  for (let n of e.children) {
    let r = rm(t, n);
    if (r) return r;
  }
  return null;
}
function im(t, e) {
  if (t === e.value) return [e];
  for (let n of e.children) {
    let r = im(t, n);
    if (r.length) return r.unshift(e), r;
  }
  return [];
}
var Vt = class {
  constructor(e, n) {
    (this.value = e), (this.children = n);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function hs(t) {
  let e = {};
  return t && t.children.forEach((n) => (e[n.value.outlet] = n)), e;
}
var fu = class extends du {
  constructor(e, n) {
    super(e), (this.snapshot = n), pm(this, e);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function Rw(t, e) {
  let n = kR(t, e),
    r = new dt([new mi('', {})]),
    i = new dt({}),
    s = new dt({}),
    o = new dt({}),
    a = new dt(''),
    c = new yi(r, i, o, a, s, ve, e, n.root);
  return (c.snapshot = n.root), new fu(new Vt(c, []), n);
}
function kR(t, e) {
  let n = {},
    r = {},
    i = {},
    s = '',
    o = new Qo([], n, i, s, r, ve, e, null, {});
  return new hu('', new Vt(o, []));
}
var yi = class {
  constructor(e, n, r, i, s, o, a, c) {
    (this.urlSubject = e),
      (this.paramsSubject = n),
      (this.queryParamsSubject = r),
      (this.fragmentSubject = i),
      (this.dataSubject = s),
      (this.outlet = o),
      (this.component = a),
      (this._futureSnapshot = c),
      (this.title = this.dataSubject?.pipe(we((l) => l[Jo])) ?? ue(void 0)),
      (this.url = e),
      (this.params = n),
      (this.queryParams = r),
      (this.fragment = i),
      (this.data = s);
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
      this._paramMap || (this._paramMap = this.params.pipe(we((e) => gs(e)))),
      this._paramMap
    );
  }
  get queryParamMap() {
    return (
      this._queryParamMap ||
        (this._queryParamMap = this.queryParams.pipe(we((e) => gs(e)))),
      this._queryParamMap
    );
  }
  toString() {
    return this.snapshot
      ? this.snapshot.toString()
      : `Future(${this._futureSnapshot})`;
  }
};
function hm(t, e, n = 'emptyOnly') {
  let r,
    { routeConfig: i } = t;
  return (
    e !== null &&
    (n === 'always' ||
      i?.path === '' ||
      (!e.component && !e.routeConfig?.loadComponent))
      ? (r = {
          params: te(te({}, e.params), t.params),
          data: te(te({}, e.data), t.data),
          resolve: te(te(te(te({}, t.data), e.data), i?.data), t._resolvedData),
        })
      : (r = {
          params: te({}, t.params),
          data: te({}, t.data),
          resolve: te(te({}, t.data), t._resolvedData ?? {}),
        }),
    i && kw(i) && (r.resolve[Jo] = i.title),
    r
  );
}
var Qo = class {
    get title() {
      return this.data?.[Jo];
    }
    constructor(e, n, r, i, s, o, a, c, l) {
      (this.url = e),
        (this.params = n),
        (this.queryParams = r),
        (this.fragment = i),
        (this.data = s),
        (this.outlet = o),
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
        this._paramMap || (this._paramMap = gs(this.params)), this._paramMap
      );
    }
    get queryParamMap() {
      return (
        this._queryParamMap || (this._queryParamMap = gs(this.queryParams)),
        this._queryParamMap
      );
    }
    toString() {
      let e = this.url.map((r) => r.toString()).join('/'),
        n = this.routeConfig ? this.routeConfig.path : '';
      return `Route(url:'${e}', path:'${n}')`;
    }
  },
  hu = class extends du {
    constructor(e, n) {
      super(n), (this.url = e), pm(this, n);
    }
    toString() {
      return Ow(this._root);
    }
  };
function pm(t, e) {
  (e.value._routerState = t), e.children.forEach((n) => pm(t, n));
}
function Ow(t) {
  let e = t.children.length > 0 ? ` { ${t.children.map(Ow).join(', ')} } ` : '';
  return `${t.value}${e}`;
}
function Hp(t) {
  if (t.snapshot) {
    let e = t.snapshot,
      n = t._futureSnapshot;
    (t.snapshot = n),
      wn(e.queryParams, n.queryParams) ||
        t.queryParamsSubject.next(n.queryParams),
      e.fragment !== n.fragment && t.fragmentSubject.next(n.fragment),
      wn(e.params, n.params) || t.paramsSubject.next(n.params),
      lR(e.url, n.url) || t.urlSubject.next(n.url),
      wn(e.data, n.data) || t.dataSubject.next(n.data);
  } else
    (t.snapshot = t._futureSnapshot),
      t.dataSubject.next(t._futureSnapshot.data);
}
function sm(t, e) {
  let n = wn(t.params, e.params) && hR(t.url, e.url),
    r = !t.parent != !e.parent;
  return n && !r && (!t.parent || sm(t.parent, e.parent));
}
function kw(t) {
  return typeof t.title == 'string' || t.title === null;
}
var LR = (() => {
    let e = class e {
      constructor() {
        (this.activated = null),
          (this._activatedRoute = null),
          (this.name = ve),
          (this.activateEvents = new gt()),
          (this.deactivateEvents = new gt()),
          (this.attachEvents = new gt()),
          (this.detachEvents = new gt()),
          (this.parentContexts = W(ta)),
          (this.location = W(oi)),
          (this.changeDetector = W(ul)),
          (this.environmentInjector = W(Rt)),
          (this.inputBinder = W(yu, { optional: !0 })),
          (this.supportsBindingToComponentInputs = !0);
      }
      get activatedComponentRef() {
        return this.activated;
      }
      ngOnChanges(r) {
        if (r.name) {
          let { firstChange: i, previousValue: s } = r.name;
          if (i) return;
          this.isTrackedInParentContexts(s) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(s)),
            this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        this.isTrackedInParentContexts(this.name) &&
          this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(r) {
        return this.parentContexts.getContext(r)?.outlet === this;
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
        let r = this.parentContexts.getContext(this.name);
        r?.route &&
          (r.attachRef
            ? this.attach(r.attachRef, r.route)
            : this.activateWith(r.route, r.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new z(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new z(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new z(4012, !1);
        this.location.detach();
        let r = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(r.instance),
          r
        );
      }
      attach(r, i) {
        (this.activated = r),
          (this._activatedRoute = i),
          this.location.insert(r.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(r.instance);
      }
      deactivate() {
        if (this.activated) {
          let r = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(r);
        }
      }
      activateWith(r, i) {
        if (this.isActivated) throw new z(4013, !1);
        this._activatedRoute = r;
        let s = this.location,
          a = r.snapshot.component,
          c = this.parentContexts.getOrCreateContext(this.name).children,
          l = new om(r, c, s.injector);
        (this.activated = s.createComponent(a, {
          index: s.length,
          injector: l,
          environmentInjector: i ?? this.environmentInjector,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵdir = Yc({
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
        features: [ao],
      }));
    let t = e;
    return t;
  })(),
  om = class {
    constructor(e, n, r) {
      (this.route = e), (this.childContexts = n), (this.parent = r);
    }
    get(e, n) {
      return e === yi
        ? this.route
        : e === ta
        ? this.childContexts
        : this.parent.get(e, n);
    }
  },
  yu = new le(''),
  pw = (() => {
    let e = class e {
      constructor() {
        this.outletDataSubscriptions = new Map();
      }
      bindActivatedRouteToOutletComponent(r) {
        this.unsubscribeFromRouteData(r), this.subscribeToRouteData(r);
      }
      unsubscribeFromRouteData(r) {
        this.outletDataSubscriptions.get(r)?.unsubscribe(),
          this.outletDataSubscriptions.delete(r);
      }
      subscribeToRouteData(r) {
        let { activatedRoute: i } = r,
          s = Ls([i.queryParams, i.params, i.data])
            .pipe(
              Lt(
                ([o, a, c], l) => (
                  (c = te(te(te({}, o), a), c)),
                  l === 0 ? ue(c) : Promise.resolve(c)
                )
              )
            )
            .subscribe((o) => {
              if (
                !r.isActivated ||
                !r.activatedComponentRef ||
                r.activatedRoute !== i ||
                i.component === null
              ) {
                this.unsubscribeFromRouteData(r);
                return;
              }
              let a = kb(i.component);
              if (!a) {
                this.unsubscribeFromRouteData(r);
                return;
              }
              for (let { templateName: c } of a.inputs)
                r.activatedComponentRef.setInput(c, o[c]);
            });
        this.outletDataSubscriptions.set(r, s);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })();
function PR(t, e, n) {
  let r = Yo(t, e._root, n ? n._root : void 0);
  return new fu(r, e);
}
function Yo(t, e, n) {
  if (n && t.shouldReuseRoute(e.value, n.value.snapshot)) {
    let r = n.value;
    r._futureSnapshot = e.value;
    let i = FR(t, e, n);
    return new Vt(r, i);
  } else {
    if (t.shouldAttach(e.value)) {
      let s = t.retrieve(e.value);
      if (s !== null) {
        let o = s.route;
        return (
          (o.value._futureSnapshot = e.value),
          (o.children = e.children.map((a) => Yo(t, a))),
          o
        );
      }
    }
    let r = jR(e.value),
      i = e.children.map((s) => Yo(t, s));
    return new Vt(r, i);
  }
}
function FR(t, e, n) {
  return e.children.map((r) => {
    for (let i of n.children)
      if (t.shouldReuseRoute(r.value, i.value.snapshot)) return Yo(t, r, i);
    return Yo(t, r);
  });
}
function jR(t) {
  return new yi(
    new dt(t.url),
    new dt(t.params),
    new dt(t.queryParams),
    new dt(t.fragment),
    new dt(t.data),
    t.outlet,
    t.component,
    t
  );
}
var Lw = 'ngNavigationCancelingError';
function Pw(t, e) {
  let { redirectTo: n, navigationBehaviorOptions: r } = ys(e)
      ? { redirectTo: e, navigationBehaviorOptions: void 0 }
      : e,
    i = Fw(!1, 0, e);
  return (i.url = n), (i.navigationBehaviorOptions = r), i;
}
function Fw(t, e, n) {
  let r = new Error('NavigationCancelingError: ' + (t || ''));
  return (r[Lw] = !0), (r.cancellationCode = e), n && (r.url = n), r;
}
function HR(t) {
  return jw(t) && ys(t.url);
}
function jw(t) {
  return t && t[Lw];
}
var BR = (() => {
  let e = class e {};
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵcmp = My({
      type: e,
      selectors: [['ng-component']],
      standalone: !0,
      features: [lb],
      decls: 1,
      vars: 0,
      template: function (i, s) {
        i & 1 && Dh(0, 'router-outlet');
      },
      dependencies: [LR],
      encapsulation: 2,
    }));
  let t = e;
  return t;
})();
function VR(t, e) {
  return (
    t.providers &&
      !t._injector &&
      (t._injector = ml(t.providers, e, `Route: ${t.path}`)),
    t._injector ?? e
  );
}
function mm(t) {
  let e = t.children && t.children.map(mm),
    n = e ? nt(te({}, t), { children: e }) : te({}, t);
  return (
    !n.component &&
      !n.loadComponent &&
      (e || n.loadChildren) &&
      n.outlet &&
      n.outlet !== ve &&
      (n.component = BR),
    n
  );
}
function _n(t) {
  return t.outlet || ve;
}
function UR(t, e) {
  let n = t.filter((r) => _n(r) === e);
  return n.push(...t.filter((r) => _n(r) !== e)), n;
}
function na(t) {
  if (!t) return null;
  if (t.routeConfig?._injector) return t.routeConfig._injector;
  for (let e = t.parent; e; e = e.parent) {
    let n = e.routeConfig;
    if (n?._loadedInjector) return n._loadedInjector;
    if (n?._injector) return n._injector;
  }
  return null;
}
var $R = (t, e, n, r) =>
    we(
      (i) => (
        new am(e, i.targetRouterState, i.currentRouterState, n, r).activate(t),
        i
      )
    ),
  am = class {
    constructor(e, n, r, i, s) {
      (this.routeReuseStrategy = e),
        (this.futureState = n),
        (this.currState = r),
        (this.forwardEvent = i),
        (this.inputBindingEnabled = s);
    }
    activate(e) {
      let n = this.futureState._root,
        r = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(n, r, e),
        Hp(this.futureState.root),
        this.activateChildRoutes(n, r, e);
    }
    deactivateChildRoutes(e, n, r) {
      let i = hs(n);
      e.children.forEach((s) => {
        let o = s.value.outlet;
        this.deactivateRoutes(s, i[o], r), delete i[o];
      }),
        Object.values(i).forEach((s) => {
          this.deactivateRouteAndItsChildren(s, r);
        });
    }
    deactivateRoutes(e, n, r) {
      let i = e.value,
        s = n ? n.value : null;
      if (i === s)
        if (i.component) {
          let o = r.getContext(i.outlet);
          o && this.deactivateChildRoutes(e, n, o.children);
        } else this.deactivateChildRoutes(e, n, r);
      else s && this.deactivateRouteAndItsChildren(n, r);
    }
    deactivateRouteAndItsChildren(e, n) {
      e.value.component &&
      this.routeReuseStrategy.shouldDetach(e.value.snapshot)
        ? this.detachAndStoreRouteSubtree(e, n)
        : this.deactivateRouteAndOutlet(e, n);
    }
    detachAndStoreRouteSubtree(e, n) {
      let r = n.getContext(e.value.outlet),
        i = r && e.value.component ? r.children : n,
        s = hs(e);
      for (let o of Object.keys(s)) this.deactivateRouteAndItsChildren(s[o], i);
      if (r && r.outlet) {
        let o = r.outlet.detach(),
          a = r.children.onOutletDeactivated();
        this.routeReuseStrategy.store(e.value.snapshot, {
          componentRef: o,
          route: e,
          contexts: a,
        });
      }
    }
    deactivateRouteAndOutlet(e, n) {
      let r = n.getContext(e.value.outlet),
        i = r && e.value.component ? r.children : n,
        s = hs(e);
      for (let o of Object.keys(s)) this.deactivateRouteAndItsChildren(s[o], i);
      r &&
        (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()),
        (r.attachRef = null),
        (r.route = null));
    }
    activateChildRoutes(e, n, r) {
      let i = hs(n);
      e.children.forEach((s) => {
        this.activateRoutes(s, i[s.value.outlet], r),
          this.forwardEvent(new tm(s.value.snapshot));
      }),
        e.children.length && this.forwardEvent(new Jp(e.value.snapshot));
    }
    activateRoutes(e, n, r) {
      let i = e.value,
        s = n ? n.value : null;
      if ((Hp(i), i === s))
        if (i.component) {
          let o = r.getOrCreateContext(i.outlet);
          this.activateChildRoutes(e, n, o.children);
        } else this.activateChildRoutes(e, n, r);
      else if (i.component) {
        let o = r.getOrCreateContext(i.outlet);
        if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(i.snapshot);
          this.routeReuseStrategy.store(i.snapshot, null),
            o.children.onOutletReAttached(a.contexts),
            (o.attachRef = a.componentRef),
            (o.route = a.route.value),
            o.outlet && o.outlet.attach(a.componentRef, a.route.value),
            Hp(a.route.value),
            this.activateChildRoutes(e, null, o.children);
        } else {
          let a = na(i.snapshot);
          (o.attachRef = null),
            (o.route = i),
            (o.injector = a),
            o.outlet && o.outlet.activateWith(i, o.injector),
            this.activateChildRoutes(e, null, o.children);
        }
      } else this.activateChildRoutes(e, null, r);
    }
  },
  pu = class {
    constructor(e) {
      (this.path = e), (this.route = this.path[this.path.length - 1]);
    }
  },
  ms = class {
    constructor(e, n) {
      (this.component = e), (this.route = n);
    }
  };
function qR(t, e, n) {
  let r = t._root,
    i = e ? e._root : null;
  return Ho(r, i, n, [r.value]);
}
function zR(t) {
  let e = t.routeConfig ? t.routeConfig.canActivateChild : null;
  return !e || e.length === 0 ? null : { node: t, guards: e };
}
function bs(t, e) {
  let n = Symbol(),
    r = e.get(t, n);
  return r === n ? (typeof t == 'function' && !gy(t) ? t : e.get(t)) : r;
}
function Ho(
  t,
  e,
  n,
  r,
  i = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let s = hs(e);
  return (
    t.children.forEach((o) => {
      GR(o, s[o.value.outlet], n, r.concat([o.value]), i),
        delete s[o.value.outlet];
    }),
    Object.entries(s).forEach(([o, a]) => $o(a, n.getContext(o), i)),
    i
  );
}
function GR(
  t,
  e,
  n,
  r,
  i = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let s = t.value,
    o = e ? e.value : null,
    a = n ? n.getContext(t.value.outlet) : null;
  if (o && s.routeConfig === o.routeConfig) {
    let c = WR(o, s, s.routeConfig.runGuardsAndResolvers);
    c
      ? i.canActivateChecks.push(new pu(r))
      : ((s.data = o.data), (s._resolvedData = o._resolvedData)),
      s.component ? Ho(t, e, a ? a.children : null, r, i) : Ho(t, e, n, r, i),
      c &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        i.canDeactivateChecks.push(new ms(a.outlet.component, o));
  } else
    o && $o(e, a, i),
      i.canActivateChecks.push(new pu(r)),
      s.component
        ? Ho(t, null, a ? a.children : null, r, i)
        : Ho(t, null, n, r, i);
  return i;
}
function WR(t, e, n) {
  if (typeof n == 'function') return n(t, e);
  switch (n) {
    case 'pathParamsChange':
      return !gi(t.url, e.url);
    case 'pathParamsOrQueryParamsChange':
      return !gi(t.url, e.url) || !wn(t.queryParams, e.queryParams);
    case 'always':
      return !0;
    case 'paramsOrQueryParamsChange':
      return !sm(t, e) || !wn(t.queryParams, e.queryParams);
    case 'paramsChange':
    default:
      return !sm(t, e);
  }
}
function $o(t, e, n) {
  let r = hs(t),
    i = t.value;
  Object.entries(r).forEach(([s, o]) => {
    i.component
      ? e
        ? $o(o, e.children.getContext(s), n)
        : $o(o, null, n)
      : $o(o, e, n);
  }),
    i.component
      ? e && e.outlet && e.outlet.isActivated
        ? n.canDeactivateChecks.push(new ms(e.outlet.component, i))
        : n.canDeactivateChecks.push(new ms(null, i))
      : n.canDeactivateChecks.push(new ms(null, i));
}
function ra(t) {
  return typeof t == 'function';
}
function KR(t) {
  return typeof t == 'boolean';
}
function QR(t) {
  return t && ra(t.canLoad);
}
function YR(t) {
  return t && ra(t.canActivate);
}
function ZR(t) {
  return t && ra(t.canActivateChild);
}
function XR(t) {
  return t && ra(t.canDeactivate);
}
function JR(t) {
  return t && ra(t.canMatch);
}
function Hw(t) {
  return t instanceof Rn || t?.name === 'EmptyError';
}
var ru = Symbol('INITIAL_VALUE');
function Es() {
  return Lt((t) =>
    Ls(t.map((e) => e.pipe(kn(1), sd(ru)))).pipe(
      we((e) => {
        for (let n of e)
          if (n !== !0) {
            if (n === ru) return ru;
            if (n === !1 || n instanceof Mr) return n;
          }
        return !0;
      }),
      mt((e) => e !== ru),
      kn(1)
    )
  );
}
function eO(t, e) {
  return rt((n) => {
    let {
      targetSnapshot: r,
      currentSnapshot: i,
      guards: { canActivateChecks: s, canDeactivateChecks: o },
    } = n;
    return o.length === 0 && s.length === 0
      ? ue(nt(te({}, n), { guardsResult: !0 }))
      : tO(o, r, i, t).pipe(
          rt((a) => (a && KR(a) ? nO(r, s, t, e) : ue(a))),
          we((a) => nt(te({}, n), { guardsResult: a }))
        );
  });
}
function tO(t, e, n, r) {
  return ze(t).pipe(
    rt((i) => aO(i.component, i.route, n, e, r)),
    Zt((i) => i !== !0, !0)
  );
}
function nO(t, e, n, r) {
  return ze(e).pipe(
    On((i) =>
      xi(
        iO(i.route.parent, r),
        rO(i.route, r),
        oO(t, i.path, n),
        sO(t, i.route, n)
      )
    ),
    Zt((i) => i !== !0, !0)
  );
}
function rO(t, e) {
  return t !== null && e && e(new em(t)), ue(!0);
}
function iO(t, e) {
  return t !== null && e && e(new Xp(t)), ue(!0);
}
function sO(t, e, n) {
  let r = e.routeConfig ? e.routeConfig.canActivate : null;
  if (!r || r.length === 0) return ue(!0);
  let i = r.map((s) =>
    ic(() => {
      let o = na(e) ?? n,
        a = bs(s, o),
        c = YR(a) ? a.canActivate(e, t) : Vn(o, () => a(e, t));
      return Rr(c).pipe(Zt());
    })
  );
  return ue(i).pipe(Es());
}
function oO(t, e, n) {
  let r = e[e.length - 1],
    s = e
      .slice(0, e.length - 1)
      .reverse()
      .map((o) => zR(o))
      .filter((o) => o !== null)
      .map((o) =>
        ic(() => {
          let a = o.guards.map((c) => {
            let l = na(o.node) ?? n,
              u = bs(c, l),
              d = ZR(u) ? u.canActivateChild(r, t) : Vn(l, () => u(r, t));
            return Rr(d).pipe(Zt());
          });
          return ue(a).pipe(Es());
        })
      );
  return ue(s).pipe(Es());
}
function aO(t, e, n, r, i) {
  let s = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
  if (!s || s.length === 0) return ue(!0);
  let o = s.map((a) => {
    let c = na(e) ?? i,
      l = bs(a, c),
      u = XR(l) ? l.canDeactivate(t, e, n, r) : Vn(c, () => l(t, e, n, r));
    return Rr(u).pipe(Zt());
  });
  return ue(o).pipe(Es());
}
function cO(t, e, n, r) {
  let i = e.canLoad;
  if (i === void 0 || i.length === 0) return ue(!0);
  let s = i.map((o) => {
    let a = bs(o, t),
      c = QR(a) ? a.canLoad(e, n) : Vn(t, () => a(e, n));
    return Rr(c);
  });
  return ue(s).pipe(Es(), Bw(r));
}
function Bw(t) {
  return Ku(
    it((e) => {
      if (ys(e)) throw Pw(t, e);
    }),
    we((e) => e === !0)
  );
}
function lO(t, e, n, r) {
  let i = e.canMatch;
  if (!i || i.length === 0) return ue(!0);
  let s = i.map((o) => {
    let a = bs(o, t),
      c = JR(a) ? a.canMatch(e, n) : Vn(t, () => a(e, n));
    return Rr(c);
  });
  return ue(s).pipe(Es(), Bw(r));
}
var Zo = class {
    constructor(e) {
      this.segmentGroup = e || null;
    }
  },
  mu = class extends Error {
    constructor(e) {
      super(), (this.urlTree = e);
    }
  };
function fs(t) {
  return Ai(new Zo(t));
}
function uO(t) {
  return Ai(new z(4e3, !1));
}
function dO(t) {
  return Ai(Fw(!1, 3));
}
var cm = class {
    constructor(e, n) {
      (this.urlSerializer = e), (this.urlTree = n);
    }
    lineralizeSegments(e, n) {
      let r = [],
        i = n.root;
      for (;;) {
        if (((r = r.concat(i.segments)), i.numberOfChildren === 0))
          return ue(r);
        if (i.numberOfChildren > 1 || !i.children[ve]) return uO(e.redirectTo);
        i = i.children[ve];
      }
    }
    applyRedirectCommands(e, n, r) {
      let i = this.applyRedirectCreateUrlTree(
        n,
        this.urlSerializer.parse(n),
        e,
        r
      );
      if (n.startsWith('/')) throw new mu(i);
      return i;
    }
    applyRedirectCreateUrlTree(e, n, r, i) {
      let s = this.createSegmentGroup(e, n.root, r, i);
      return new Mr(
        s,
        this.createQueryParams(n.queryParams, this.urlTree.queryParams),
        n.fragment
      );
    }
    createQueryParams(e, n) {
      let r = {};
      return (
        Object.entries(e).forEach(([i, s]) => {
          if (typeof s == 'string' && s.startsWith(':')) {
            let a = s.substring(1);
            r[i] = n[a];
          } else r[i] = s;
        }),
        r
      );
    }
    createSegmentGroup(e, n, r, i) {
      let s = this.createSegments(e, n.segments, r, i),
        o = {};
      return (
        Object.entries(n.children).forEach(([a, c]) => {
          o[a] = this.createSegmentGroup(e, c, r, i);
        }),
        new je(s, o)
      );
    }
    createSegments(e, n, r, i) {
      return n.map((s) =>
        s.path.startsWith(':')
          ? this.findPosParam(e, s, i)
          : this.findOrReturn(s, r)
      );
    }
    findPosParam(e, n, r) {
      let i = r[n.path.substring(1)];
      if (!i) throw new z(4001, !1);
      return i;
    }
    findOrReturn(e, n) {
      let r = 0;
      for (let i of n) {
        if (i.path === e.path) return n.splice(r), i;
        r++;
      }
      return e;
    }
  },
  lm = {
    matched: !1,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {},
  };
function fO(t, e, n, r, i) {
  let s = gm(t, e, n);
  return s.matched
    ? ((r = VR(e, r)),
      lO(r, e, n, i).pipe(we((o) => (o === !0 ? s : te({}, lm)))))
    : ue(s);
}
function gm(t, e, n) {
  if (e.path === '**') return hO(n);
  if (e.path === '')
    return e.pathMatch === 'full' && (t.hasChildren() || n.length > 0)
      ? te({}, lm)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: n,
          parameters: {},
          positionalParamSegments: {},
        };
  let i = (e.matcher || cR)(n, t, e);
  if (!i) return te({}, lm);
  let s = {};
  Object.entries(i.posParams ?? {}).forEach(([a, c]) => {
    s[a] = c.path;
  });
  let o =
    i.consumed.length > 0
      ? te(te({}, s), i.consumed[i.consumed.length - 1].parameters)
      : s;
  return {
    matched: !0,
    consumedSegments: i.consumed,
    remainingSegments: n.slice(i.consumed.length),
    parameters: o,
    positionalParamSegments: i.posParams ?? {},
  };
}
function hO(t) {
  return {
    matched: !0,
    parameters: t.length > 0 ? Ew(t).parameters : {},
    consumedSegments: t,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function mw(t, e, n, r) {
  return n.length > 0 && gO(t, n, r)
    ? {
        segmentGroup: new je(e, mO(r, new je(n, t.children))),
        slicedSegments: [],
      }
    : n.length === 0 && yO(t, n, r)
    ? {
        segmentGroup: new je(t.segments, pO(t, e, n, r, t.children)),
        slicedSegments: n,
      }
    : { segmentGroup: new je(t.segments, t.children), slicedSegments: n };
}
function pO(t, e, n, r, i) {
  let s = {};
  for (let o of r)
    if (vu(t, n, o) && !i[_n(o)]) {
      let a = new je([], {});
      s[_n(o)] = a;
    }
  return te(te({}, i), s);
}
function mO(t, e) {
  let n = {};
  n[ve] = e;
  for (let r of t)
    if (r.path === '' && _n(r) !== ve) {
      let i = new je([], {});
      n[_n(r)] = i;
    }
  return n;
}
function gO(t, e, n) {
  return n.some((r) => vu(t, e, r) && _n(r) !== ve);
}
function yO(t, e, n) {
  return n.some((r) => vu(t, e, r));
}
function vu(t, e, n) {
  return (t.hasChildren() || e.length > 0) && n.pathMatch === 'full'
    ? !1
    : n.path === '';
}
function vO(t, e, n, r) {
  return _n(t) !== r && (r === ve || !vu(e, n, t)) ? !1 : gm(e, t, n).matched;
}
function EO(t, e, n) {
  return e.length === 0 && !t.children[n];
}
var um = class {};
function bO(t, e, n, r, i, s, o = 'emptyOnly') {
  return new dm(t, e, n, r, i, o, s).recognize();
}
var wO = 31,
  dm = class {
    constructor(e, n, r, i, s, o, a) {
      (this.injector = e),
        (this.configLoader = n),
        (this.rootComponentType = r),
        (this.config = i),
        (this.urlTree = s),
        (this.paramsInheritanceStrategy = o),
        (this.urlSerializer = a),
        (this.applyRedirects = new cm(this.urlSerializer, this.urlTree)),
        (this.absoluteRedirectCount = 0),
        (this.allowRedirects = !0);
    }
    noMatchError(e) {
      return new z(4002, `'${e.segmentGroup}'`);
    }
    recognize() {
      let e = mw(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(e).pipe(
        we((n) => {
          let r = new Qo(
              [],
              Object.freeze({}),
              Object.freeze(te({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              ve,
              this.rootComponentType,
              null,
              {}
            ),
            i = new Vt(r, n),
            s = new hu('', i),
            o = IR(r, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (o.queryParams = this.urlTree.queryParams),
            (s.url = this.urlSerializer.serialize(o)),
            this.inheritParamsAndData(s._root, null),
            { state: s, tree: o }
          );
        })
      );
    }
    match(e) {
      return this.processSegmentGroup(this.injector, this.config, e, ve).pipe(
        lr((r) => {
          if (r instanceof mu)
            return (this.urlTree = r.urlTree), this.match(r.urlTree.root);
          throw r instanceof Zo ? this.noMatchError(r) : r;
        })
      );
    }
    inheritParamsAndData(e, n) {
      let r = e.value,
        i = hm(r, n, this.paramsInheritanceStrategy);
      (r.params = Object.freeze(i.params)),
        (r.data = Object.freeze(i.data)),
        e.children.forEach((s) => this.inheritParamsAndData(s, r));
    }
    processSegmentGroup(e, n, r, i) {
      return r.segments.length === 0 && r.hasChildren()
        ? this.processChildren(e, n, r)
        : this.processSegment(e, n, r, r.segments, i, !0).pipe(
            we((s) => (s instanceof Vt ? [s] : []))
          );
    }
    processChildren(e, n, r) {
      let i = [];
      for (let s of Object.keys(r.children))
        s === 'primary' ? i.unshift(s) : i.push(s);
      return ze(i).pipe(
        On((s) => {
          let o = r.children[s],
            a = UR(n, s);
          return this.processSegmentGroup(e, a, o, s);
        }),
        nd((s, o) => (s.push(...o), s)),
        ur(null),
        td(),
        rt((s) => {
          if (s === null) return fs(r);
          let o = Vw(s);
          return _O(o), ue(o);
        })
      );
    }
    processSegment(e, n, r, i, s, o) {
      return ze(n).pipe(
        On((a) =>
          this.processSegmentAgainstRoute(
            a._injector ?? e,
            n,
            a,
            r,
            i,
            s,
            o
          ).pipe(
            lr((c) => {
              if (c instanceof Zo) return ue(null);
              throw c;
            })
          )
        ),
        Zt((a) => !!a),
        lr((a) => {
          if (Hw(a)) return EO(r, i, s) ? ue(new um()) : fs(r);
          throw a;
        })
      );
    }
    processSegmentAgainstRoute(e, n, r, i, s, o, a) {
      return vO(r, i, s, o)
        ? r.redirectTo === void 0
          ? this.matchSegmentAgainstRoute(e, i, r, s, o)
          : this.allowRedirects && a
          ? this.expandSegmentAgainstRouteUsingRedirect(e, i, n, r, s, o)
          : fs(i)
        : fs(i);
    }
    expandSegmentAgainstRouteUsingRedirect(e, n, r, i, s, o) {
      let {
        matched: a,
        consumedSegments: c,
        positionalParamSegments: l,
        remainingSegments: u,
      } = gm(n, i, s);
      if (!a) return fs(n);
      i.redirectTo.startsWith('/') &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > wO && (this.allowRedirects = !1));
      let d = this.applyRedirects.applyRedirectCommands(c, i.redirectTo, l);
      return this.applyRedirects
        .lineralizeSegments(i, d)
        .pipe(rt((m) => this.processSegment(e, r, n, m.concat(u), o, !1)));
    }
    matchSegmentAgainstRoute(e, n, r, i, s) {
      let o = fO(n, r, i, e, this.urlSerializer);
      return (
        r.path === '**' && (n.children = {}),
        o.pipe(
          Lt((a) =>
            a.matched
              ? ((e = r._injector ?? e),
                this.getChildConfig(e, r, i).pipe(
                  Lt(({ routes: c }) => {
                    let l = r._loadedInjector ?? e,
                      {
                        consumedSegments: u,
                        remainingSegments: d,
                        parameters: m,
                      } = a,
                      E = new Qo(
                        u,
                        m,
                        Object.freeze(te({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        TO(r),
                        _n(r),
                        r.component ?? r._loadedComponent ?? null,
                        r,
                        SO(r)
                      ),
                      { segmentGroup: I, slicedSegments: M } = mw(n, u, d, c);
                    if (M.length === 0 && I.hasChildren())
                      return this.processChildren(l, c, I).pipe(
                        we((O) => (O === null ? null : new Vt(E, O)))
                      );
                    if (c.length === 0 && M.length === 0)
                      return ue(new Vt(E, []));
                    let j = _n(r) === s;
                    return this.processSegment(l, c, I, M, j ? ve : s, !0).pipe(
                      we((O) => new Vt(E, O instanceof Vt ? [O] : []))
                    );
                  })
                ))
              : fs(n)
          )
        )
      );
    }
    getChildConfig(e, n, r) {
      return n.children
        ? ue({ routes: n.children, injector: e })
        : n.loadChildren
        ? n._loadedRoutes !== void 0
          ? ue({ routes: n._loadedRoutes, injector: n._loadedInjector })
          : cO(e, n, r, this.urlSerializer).pipe(
              rt((i) =>
                i
                  ? this.configLoader.loadChildren(e, n).pipe(
                      it((s) => {
                        (n._loadedRoutes = s.routes),
                          (n._loadedInjector = s.injector);
                      })
                    )
                  : dO(n)
              )
            )
        : ue({ routes: [], injector: e });
    }
  };
function _O(t) {
  t.sort((e, n) =>
    e.value.outlet === ve
      ? -1
      : n.value.outlet === ve
      ? 1
      : e.value.outlet.localeCompare(n.value.outlet)
  );
}
function DO(t) {
  let e = t.value.routeConfig;
  return e && e.path === '';
}
function Vw(t) {
  let e = [],
    n = new Set();
  for (let r of t) {
    if (!DO(r)) {
      e.push(r);
      continue;
    }
    let i = e.find((s) => r.value.routeConfig === s.value.routeConfig);
    i !== void 0 ? (i.children.push(...r.children), n.add(i)) : e.push(r);
  }
  for (let r of n) {
    let i = Vw(r.children);
    e.push(new Vt(r.value, i));
  }
  return e.filter((r) => !n.has(r));
}
function TO(t) {
  return t.data || {};
}
function SO(t) {
  return t.resolve || {};
}
function CO(t, e, n, r, i, s) {
  return rt((o) =>
    bO(t, e, n, r, o.extractedUrl, i, s).pipe(
      we(({ state: a, tree: c }) =>
        nt(te({}, o), { targetSnapshot: a, urlAfterRedirects: c })
      )
    )
  );
}
function IO(t, e) {
  return rt((n) => {
    let {
      targetSnapshot: r,
      guards: { canActivateChecks: i },
    } = n;
    if (!i.length) return ue(n);
    let s = new Set(i.map((c) => c.route)),
      o = new Set();
    for (let c of s) if (!o.has(c)) for (let l of Uw(c)) o.add(l);
    let a = 0;
    return ze(o).pipe(
      On((c) =>
        s.has(c)
          ? MO(c, r, t, e)
          : ((c.data = hm(c, c.parent, t).resolve), ue(void 0))
      ),
      it(() => a++),
      Oi(1),
      rt((c) => (a === o.size ? ue(n) : At))
    );
  });
}
function Uw(t) {
  let e = t.children.map((n) => Uw(n)).flat();
  return [t, ...e];
}
function MO(t, e, n, r) {
  let i = t.routeConfig,
    s = t._resolve;
  return (
    i?.title !== void 0 && !kw(i) && (s[Jo] = i.title),
    NO(s, t, e, r).pipe(
      we(
        (o) => (
          (t._resolvedData = o), (t.data = hm(t, t.parent, n).resolve), null
        )
      )
    )
  );
}
function NO(t, e, n, r) {
  let i = Up(t);
  if (i.length === 0) return ue({});
  let s = {};
  return ze(i).pipe(
    rt((o) =>
      AO(t[o], e, n, r).pipe(
        Zt(),
        it((a) => {
          s[o] = a;
        })
      )
    ),
    Oi(1),
    ed(s),
    lr((o) => (Hw(o) ? At : Ai(o)))
  );
}
function AO(t, e, n, r) {
  let i = na(e) ?? r,
    s = bs(t, i),
    o = s.resolve ? s.resolve(e, n) : Vn(i, () => s(e, n));
  return Rr(o);
}
function Bp(t) {
  return Lt((e) => {
    let n = t(e);
    return n ? ze(n).pipe(we(() => e)) : ue(e);
  });
}
var $w = (() => {
    let e = class e {
      buildTitle(r) {
        let i,
          s = r.root;
        for (; s !== void 0; )
          (i = this.getResolvedTitleForRoute(s) ?? i),
            (s = s.children.find((o) => o.outlet === ve));
        return i;
      }
      getResolvedTitleForRoute(r) {
        return r.data[Jo];
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({
        token: e,
        factory: () => (() => W(xO))(),
        providedIn: 'root',
      }));
    let t = e;
    return t;
  })(),
  xO = (() => {
    let e = class e extends $w {
      constructor(r) {
        super(), (this.title = r);
      }
      updateTitle(r) {
        let i = this.buildTitle(r);
        i !== void 0 && this.title.setTitle(i);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(X(Kh));
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  ia = new le('', { providedIn: 'root', factory: () => ({}) }),
  Xo = new le('ROUTES'),
  ym = (() => {
    let e = class e {
      constructor() {
        (this.componentLoaders = new WeakMap()),
          (this.childrenLoaders = new WeakMap()),
          (this.compiler = W(vl));
      }
      loadComponent(r) {
        if (this.componentLoaders.get(r)) return this.componentLoaders.get(r);
        if (r._loadedComponent) return ue(r._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(r);
        let i = Rr(r.loadComponent()).pipe(
            we(qw),
            it((o) => {
              this.onLoadEndListener && this.onLoadEndListener(r),
                (r._loadedComponent = o);
            }),
            Ri(() => {
              this.componentLoaders.delete(r);
            })
          ),
          s = new Mi(i, () => new st()).pipe(Ii());
        return this.componentLoaders.set(r, s), s;
      }
      loadChildren(r, i) {
        if (this.childrenLoaders.get(i)) return this.childrenLoaders.get(i);
        if (i._loadedRoutes)
          return ue({ routes: i._loadedRoutes, injector: i._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(i);
        let o = RO(i, this.compiler, r, this.onLoadEndListener).pipe(
            Ri(() => {
              this.childrenLoaders.delete(i);
            })
          ),
          a = new Mi(o, () => new st()).pipe(Ii());
        return this.childrenLoaders.set(i, a), a;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })();
function RO(t, e, n, r) {
  return Rr(t.loadChildren()).pipe(
    we(qw),
    rt((i) =>
      i instanceof no || Array.isArray(i) ? ue(i) : ze(e.compileModuleAsync(i))
    ),
    we((i) => {
      r && r(t);
      let s,
        o,
        a = !1;
      return (
        Array.isArray(i)
          ? ((o = i), (a = !0))
          : ((s = i.create(n).injector),
            (o = s.get(Xo, [], { optional: !0, self: !0 }).flat())),
        { routes: o.map(mm), injector: s }
      );
    })
  );
}
function OO(t) {
  return t && typeof t == 'object' && 'default' in t;
}
function qw(t) {
  return OO(t) ? t.default : t;
}
var vm = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({
        token: e,
        factory: () => (() => W(kO))(),
        providedIn: 'root',
      }));
    let t = e;
    return t;
  })(),
  kO = (() => {
    let e = class e {
      shouldProcessUrl(r) {
        return !0;
      }
      extract(r) {
        return r;
      }
      merge(r, i) {
        return r;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  zw = new le(''),
  Gw = new le('');
function LO(t, e, n) {
  let r = t.get(Gw),
    i = t.get(Ve);
  return t.get(Fe).runOutsideAngular(() => {
    if (!i.startViewTransition || r.skipNextTransition)
      return (r.skipNextTransition = !1), Promise.resolve();
    let s,
      o = new Promise((l) => {
        s = l;
      }),
      a = i.startViewTransition(() => (s(), PO(t))),
      { onViewTransitionCreated: c } = r;
    return c && Vn(t, () => c({ transition: a, from: e, to: n })), o;
  });
}
function PO(t) {
  return new Promise((e) => {
    bh(e, { injector: t });
  });
}
var Em = (() => {
  let e = class e {
    get hasRequestedNavigation() {
      return this.navigationId !== 0;
    }
    constructor() {
      (this.currentNavigation = null),
        (this.currentTransition = null),
        (this.lastSuccessfulNavigation = null),
        (this.events = new st()),
        (this.transitionAbortSubject = new st()),
        (this.configLoader = W(ym)),
        (this.environmentInjector = W(Rt)),
        (this.urlSerializer = W(ea)),
        (this.rootContexts = W(ta)),
        (this.location = W(os)),
        (this.inputBindingEnabled = W(yu, { optional: !0 }) !== null),
        (this.titleStrategy = W($w)),
        (this.options = W(ia, { optional: !0 }) || {}),
        (this.paramsInheritanceStrategy =
          this.options.paramsInheritanceStrategy || 'emptyOnly'),
        (this.urlHandlingStrategy = W(vm)),
        (this.createViewTransition = W(zw, { optional: !0 })),
        (this.navigationId = 0),
        (this.afterPreactivation = () => ue(void 0)),
        (this.rootComponentType = null);
      let r = (s) => this.events.next(new Yp(s)),
        i = (s) => this.events.next(new Zp(s));
      (this.configLoader.onLoadEndListener = i),
        (this.configLoader.onLoadStartListener = r);
    }
    complete() {
      this.transitions?.complete();
    }
    handleNavigationRequest(r) {
      let i = ++this.navigationId;
      this.transitions?.next(
        nt(te(te({}, this.transitions.value), r), { id: i })
      );
    }
    setupNavigations(r, i, s) {
      return (
        (this.transitions = new dt({
          id: 0,
          currentUrlTree: i,
          currentRawUrl: i,
          extractedUrl: this.urlHandlingStrategy.extract(i),
          urlAfterRedirects: this.urlHandlingStrategy.extract(i),
          rawUrl: i,
          extras: {},
          resolve: null,
          reject: null,
          promise: Promise.resolve(!0),
          source: Uo,
          restoredState: null,
          currentSnapshot: s.snapshot,
          targetSnapshot: null,
          currentRouterState: s,
          targetRouterState: null,
          guards: { canActivateChecks: [], canDeactivateChecks: [] },
          guardsResult: null,
        })),
        this.transitions.pipe(
          mt((o) => o.id !== 0),
          we((o) =>
            nt(te({}, o), {
              extractedUrl: this.urlHandlingStrategy.extract(o.rawUrl),
            })
          ),
          Lt((o) => {
            this.currentTransition = o;
            let a = !1,
              c = !1;
            return ue(o).pipe(
              it((l) => {
                this.currentNavigation = {
                  id: l.id,
                  initialUrl: l.rawUrl,
                  extractedUrl: l.extractedUrl,
                  trigger: l.source,
                  extras: l.extras,
                  previousNavigation: this.lastSuccessfulNavigation
                    ? nt(te({}, this.lastSuccessfulNavigation), {
                        previousNavigation: null,
                      })
                    : null,
                };
              }),
              Lt((l) => {
                let u =
                    !r.navigated ||
                    this.isUpdatingInternalState() ||
                    this.isUpdatedBrowserUrl(),
                  d = l.extras.onSameUrlNavigation ?? r.onSameUrlNavigation;
                if (!u && d !== 'reload') {
                  let m = '';
                  return (
                    this.events.next(
                      new Ar(l.id, this.urlSerializer.serialize(l.rawUrl), m, 0)
                    ),
                    l.resolve(null),
                    At
                  );
                }
                if (this.urlHandlingStrategy.shouldProcessUrl(l.rawUrl))
                  return ue(l).pipe(
                    Lt((m) => {
                      let E = this.transitions?.getValue();
                      return (
                        this.events.next(
                          new vs(
                            m.id,
                            this.urlSerializer.serialize(m.extractedUrl),
                            m.source,
                            m.restoredState
                          )
                        ),
                        E !== this.transitions?.getValue()
                          ? At
                          : Promise.resolve(m)
                      );
                    }),
                    CO(
                      this.environmentInjector,
                      this.configLoader,
                      this.rootComponentType,
                      r.config,
                      this.urlSerializer,
                      this.paramsInheritanceStrategy
                    ),
                    it((m) => {
                      (o.targetSnapshot = m.targetSnapshot),
                        (o.urlAfterRedirects = m.urlAfterRedirects),
                        (this.currentNavigation = nt(
                          te({}, this.currentNavigation),
                          { finalUrl: m.urlAfterRedirects }
                        ));
                      let E = new lu(
                        m.id,
                        this.urlSerializer.serialize(m.extractedUrl),
                        this.urlSerializer.serialize(m.urlAfterRedirects),
                        m.targetSnapshot
                      );
                      this.events.next(E);
                    })
                  );
                if (
                  u &&
                  this.urlHandlingStrategy.shouldProcessUrl(l.currentRawUrl)
                ) {
                  let {
                      id: m,
                      extractedUrl: E,
                      source: I,
                      restoredState: M,
                      extras: j,
                    } = l,
                    O = new vs(m, this.urlSerializer.serialize(E), I, M);
                  this.events.next(O);
                  let D = Rw(E, this.rootComponentType).snapshot;
                  return (
                    (this.currentTransition = o =
                      nt(te({}, l), {
                        targetSnapshot: D,
                        urlAfterRedirects: E,
                        extras: nt(te({}, j), {
                          skipLocationChange: !1,
                          replaceUrl: !1,
                        }),
                      })),
                    (this.currentNavigation.finalUrl = E),
                    ue(o)
                  );
                } else {
                  let m = '';
                  return (
                    this.events.next(
                      new Ar(
                        l.id,
                        this.urlSerializer.serialize(l.extractedUrl),
                        m,
                        1
                      )
                    ),
                    l.resolve(null),
                    At
                  );
                }
              }),
              it((l) => {
                let u = new Gp(
                  l.id,
                  this.urlSerializer.serialize(l.extractedUrl),
                  this.urlSerializer.serialize(l.urlAfterRedirects),
                  l.targetSnapshot
                );
                this.events.next(u);
              }),
              we(
                (l) => (
                  (this.currentTransition = o =
                    nt(te({}, l), {
                      guards: qR(
                        l.targetSnapshot,
                        l.currentSnapshot,
                        this.rootContexts
                      ),
                    })),
                  o
                )
              ),
              eO(this.environmentInjector, (l) => this.events.next(l)),
              it((l) => {
                if (((o.guardsResult = l.guardsResult), ys(l.guardsResult)))
                  throw Pw(this.urlSerializer, l.guardsResult);
                let u = new Wp(
                  l.id,
                  this.urlSerializer.serialize(l.extractedUrl),
                  this.urlSerializer.serialize(l.urlAfterRedirects),
                  l.targetSnapshot,
                  !!l.guardsResult
                );
                this.events.next(u);
              }),
              mt((l) =>
                l.guardsResult
                  ? !0
                  : (this.cancelNavigationTransition(l, '', 3), !1)
              ),
              Bp((l) => {
                if (l.guards.canActivateChecks.length)
                  return ue(l).pipe(
                    it((u) => {
                      let d = new Kp(
                        u.id,
                        this.urlSerializer.serialize(u.extractedUrl),
                        this.urlSerializer.serialize(u.urlAfterRedirects),
                        u.targetSnapshot
                      );
                      this.events.next(d);
                    }),
                    Lt((u) => {
                      let d = !1;
                      return ue(u).pipe(
                        IO(
                          this.paramsInheritanceStrategy,
                          this.environmentInjector
                        ),
                        it({
                          next: () => (d = !0),
                          complete: () => {
                            d || this.cancelNavigationTransition(u, '', 2);
                          },
                        })
                      );
                    }),
                    it((u) => {
                      let d = new Qp(
                        u.id,
                        this.urlSerializer.serialize(u.extractedUrl),
                        this.urlSerializer.serialize(u.urlAfterRedirects),
                        u.targetSnapshot
                      );
                      this.events.next(d);
                    })
                  );
              }),
              Bp((l) => {
                let u = (d) => {
                  let m = [];
                  d.routeConfig?.loadComponent &&
                    !d.routeConfig._loadedComponent &&
                    m.push(
                      this.configLoader.loadComponent(d.routeConfig).pipe(
                        it((E) => {
                          d.component = E;
                        }),
                        we(() => {})
                      )
                    );
                  for (let E of d.children) m.push(...u(E));
                  return m;
                };
                return Ls(u(l.targetSnapshot.root)).pipe(ur(null), kn(1));
              }),
              Bp(() => this.afterPreactivation()),
              Lt(() => {
                let { currentSnapshot: l, targetSnapshot: u } = o,
                  d = this.createViewTransition?.(
                    this.environmentInjector,
                    l.root,
                    u.root
                  );
                return d ? ze(d).pipe(we(() => o)) : ue(o);
              }),
              we((l) => {
                let u = PR(
                  r.routeReuseStrategy,
                  l.targetSnapshot,
                  l.currentRouterState
                );
                return (
                  (this.currentTransition = o =
                    nt(te({}, l), { targetRouterState: u })),
                  (this.currentNavigation.targetRouterState = u),
                  o
                );
              }),
              it(() => {
                this.events.next(new Wo());
              }),
              $R(
                this.rootContexts,
                r.routeReuseStrategy,
                (l) => this.events.next(l),
                this.inputBindingEnabled
              ),
              kn(1),
              it({
                next: (l) => {
                  (a = !0),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    this.events.next(
                      new Gn(
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
              od(
                this.transitionAbortSubject.pipe(
                  it((l) => {
                    throw l;
                  })
                )
              ),
              Ri(() => {
                if (!a && !c) {
                  let l = '';
                  this.cancelNavigationTransition(o, l, 1);
                }
                this.currentNavigation?.id === o.id &&
                  (this.currentNavigation = null);
              }),
              lr((l) => {
                if (((c = !0), jw(l)))
                  this.events.next(
                    new Nr(
                      o.id,
                      this.urlSerializer.serialize(o.extractedUrl),
                      l.message,
                      l.cancellationCode
                    )
                  ),
                    HR(l) ? this.events.next(new Ko(l.url)) : o.resolve(!1);
                else {
                  this.events.next(
                    new Go(
                      o.id,
                      this.urlSerializer.serialize(o.extractedUrl),
                      l,
                      o.targetSnapshot ?? void 0
                    )
                  );
                  try {
                    o.resolve(r.errorHandler(l));
                  } catch (u) {
                    o.reject(u);
                  }
                }
                return At;
              })
            );
          })
        )
      );
    }
    cancelNavigationTransition(r, i, s) {
      let o = new Nr(r.id, this.urlSerializer.serialize(r.extractedUrl), i, s);
      this.events.next(o), r.resolve(!1);
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
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'root' }));
  let t = e;
  return t;
})();
function FO(t) {
  return t !== Uo;
}
var jO = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({
        token: e,
        factory: () => (() => W(HO))(),
        providedIn: 'root',
      }));
    let t = e;
    return t;
  })(),
  fm = class {
    shouldDetach(e) {
      return !1;
    }
    store(e, n) {}
    shouldAttach(e) {
      return !1;
    }
    retrieve(e) {
      return null;
    }
    shouldReuseRoute(e, n) {
      return e.routeConfig === n.routeConfig;
    }
  },
  HO = (() => {
    let e = class e extends fm {};
    (e.ɵfac = (() => {
      let r;
      return function (s) {
        return (r || (r = Zf(e)))(s || e);
      };
    })()),
      (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  Ww = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({
        token: e,
        factory: () => (() => W(BO))(),
        providedIn: 'root',
      }));
    let t = e;
    return t;
  })(),
  BO = (() => {
    let e = class e extends Ww {
      constructor() {
        super(...arguments),
          (this.location = W(os)),
          (this.urlSerializer = W(ea)),
          (this.options = W(ia, { optional: !0 }) || {}),
          (this.canceledNavigationResolution =
            this.options.canceledNavigationResolution || 'replace'),
          (this.urlHandlingStrategy = W(vm)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || 'deferred'),
          (this.currentUrlTree = new Mr()),
          (this.rawUrlTree = this.currentUrlTree),
          (this.currentPageId = 0),
          (this.lastSuccessfulId = -1),
          (this.routerState = Rw(this.currentUrlTree, null)),
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
      registerNonRouterCurrentEntryChangeListener(r) {
        return this.location.subscribe((i) => {
          i.type === 'popstate' && r(i.url, i.state);
        });
      }
      handleRouterEvent(r, i) {
        if (r instanceof vs) this.stateMemento = this.createStateMemento();
        else if (r instanceof Ar) this.rawUrlTree = i.initialUrl;
        else if (r instanceof lu) {
          if (
            this.urlUpdateStrategy === 'eager' &&
            !i.extras.skipLocationChange
          ) {
            let s = this.urlHandlingStrategy.merge(i.finalUrl, i.initialUrl);
            this.setBrowserUrl(s, i);
          }
        } else
          r instanceof Wo
            ? ((this.currentUrlTree = i.finalUrl),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                i.finalUrl,
                i.initialUrl
              )),
              (this.routerState = i.targetRouterState),
              this.urlUpdateStrategy === 'deferred' &&
                (i.extras.skipLocationChange ||
                  this.setBrowserUrl(this.rawUrlTree, i)))
            : r instanceof Nr && (r.code === 3 || r.code === 2)
            ? this.restoreHistory(i)
            : r instanceof Go
            ? this.restoreHistory(i, !0)
            : r instanceof Gn &&
              ((this.lastSuccessfulId = r.id),
              (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(r, i) {
        let s = this.urlSerializer.serialize(r);
        if (this.location.isCurrentPathEqualTo(s) || i.extras.replaceUrl) {
          let o = this.browserPageId,
            a = te(te({}, i.extras.state), this.generateNgRouterState(i.id, o));
          this.location.replaceState(s, '', a);
        } else {
          let o = te(
            te({}, i.extras.state),
            this.generateNgRouterState(i.id, this.browserPageId + 1)
          );
          this.location.go(s, '', o);
        }
      }
      restoreHistory(r, i = !1) {
        if (this.canceledNavigationResolution === 'computed') {
          let s = this.browserPageId,
            o = this.currentPageId - s;
          o !== 0
            ? this.location.historyGo(o)
            : this.currentUrlTree === r.finalUrl &&
              o === 0 &&
              (this.resetState(r), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === 'replace' &&
            (i && this.resetState(r), this.resetUrlToCurrentUrlTree());
      }
      resetState(r) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            r.finalUrl ?? this.rawUrlTree
          ));
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.rawUrlTree),
          '',
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(r, i) {
        return this.canceledNavigationResolution === 'computed'
          ? { navigationId: r, ɵrouterPageId: i }
          : { navigationId: r };
      }
    };
    (e.ɵfac = (() => {
      let r;
      return function (s) {
        return (r || (r = Zf(e)))(s || e);
      };
    })()),
      (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  Bo = (function (t) {
    return (
      (t[(t.COMPLETE = 0)] = 'COMPLETE'),
      (t[(t.FAILED = 1)] = 'FAILED'),
      (t[(t.REDIRECTING = 2)] = 'REDIRECTING'),
      t
    );
  })(Bo || {});
function Kw(t, e) {
  t.events
    .pipe(
      mt(
        (n) =>
          n instanceof Gn ||
          n instanceof Nr ||
          n instanceof Go ||
          n instanceof Ar
      ),
      we((n) =>
        n instanceof Gn || n instanceof Ar
          ? Bo.COMPLETE
          : (n instanceof Nr ? n.code === 0 || n.code === 1 : !1)
          ? Bo.REDIRECTING
          : Bo.FAILED
      ),
      mt((n) => n !== Bo.REDIRECTING),
      kn(1)
    )
    .subscribe(() => {
      e();
    });
}
function VO(t) {
  throw t;
}
var UO = {
    paths: 'exact',
    fragment: 'ignored',
    matrixParams: 'ignored',
    queryParams: 'exact',
  },
  $O = {
    paths: 'subset',
    fragment: 'ignored',
    matrixParams: 'ignored',
    queryParams: 'subset',
  },
  xr = (() => {
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
          (this.console = W(yl)),
          (this.stateManager = W(Ww)),
          (this.options = W(ia, { optional: !0 }) || {}),
          (this.pendingTasks = W(vo)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || 'deferred'),
          (this.navigationTransitions = W(Em)),
          (this.urlSerializer = W(ea)),
          (this.location = W(os)),
          (this.urlHandlingStrategy = W(vm)),
          (this._events = new st()),
          (this.errorHandler = this.options.errorHandler || VO),
          (this.navigated = !1),
          (this.routeReuseStrategy = W(jO)),
          (this.onSameUrlNavigation =
            this.options.onSameUrlNavigation || 'ignore'),
          (this.config = W(Xo, { optional: !0 })?.flat() ?? []),
          (this.componentInputBindingEnabled = !!W(yu, { optional: !0 })),
          (this.eventsSubscription = new Je()),
          (this.isNgZoneEnabled = W(Fe) instanceof Fe && Fe.isInAngularZone()),
          this.resetConfig(this.config),
          this.navigationTransitions
            .setupNavigations(this, this.currentUrlTree, this.routerState)
            .subscribe({
              error: (r) => {
                this.console.warn(r);
              },
            }),
          this.subscribeToNavigationEvents();
      }
      subscribeToNavigationEvents() {
        let r = this.navigationTransitions.events.subscribe((i) => {
          try {
            let s = this.navigationTransitions.currentTransition,
              o = this.navigationTransitions.currentNavigation;
            if (s !== null && o !== null) {
              if (
                (this.stateManager.handleRouterEvent(i, o),
                i instanceof Nr && i.code !== 0 && i.code !== 1)
              )
                this.navigated = !0;
              else if (i instanceof Gn) this.navigated = !0;
              else if (i instanceof Ko) {
                let a = this.urlHandlingStrategy.merge(i.url, s.currentRawUrl),
                  c = {
                    skipLocationChange: s.extras.skipLocationChange,
                    replaceUrl:
                      this.urlUpdateStrategy === 'eager' || FO(s.source),
                  };
                this.scheduleNavigation(a, Uo, null, c, {
                  resolve: s.resolve,
                  reject: s.reject,
                  promise: s.promise,
                });
              }
            }
            zO(i) && this._events.next(i);
          } catch (s) {
            this.navigationTransitions.transitionAbortSubject.next(s);
          }
        });
        this.eventsSubscription.add(r);
      }
      resetRootComponentType(r) {
        (this.routerState.root.component = r),
          (this.navigationTransitions.rootComponentType = r);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              Uo,
              this.stateManager.restoredState()
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ||
          (this.nonRouterCurrentEntryChangeSubscription =
            this.stateManager.registerNonRouterCurrentEntryChangeListener(
              (r, i) => {
                setTimeout(() => {
                  this.navigateToSyncWithBrowser(r, 'popstate', i);
                }, 0);
              }
            ));
      }
      navigateToSyncWithBrowser(r, i, s) {
        let o = { replaceUrl: !0 },
          a = s?.navigationId ? s : null;
        if (s) {
          let l = te({}, s);
          delete l.navigationId,
            delete l.ɵrouterPageId,
            Object.keys(l).length !== 0 && (o.state = l);
        }
        let c = this.parseUrl(r);
        this.scheduleNavigation(c, i, a, o);
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
      resetConfig(r) {
        (this.config = r.map(mm)), (this.navigated = !1);
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
      createUrlTree(r, i = {}) {
        let {
            relativeTo: s,
            queryParams: o,
            fragment: a,
            queryParamsHandling: c,
            preserveFragment: l,
          } = i,
          u = l ? this.currentUrlTree.fragment : a,
          d = null;
        switch (c) {
          case 'merge':
            d = te(te({}, this.currentUrlTree.queryParams), o);
            break;
          case 'preserve':
            d = this.currentUrlTree.queryParams;
            break;
          default:
            d = o || null;
        }
        d !== null && (d = this.removeEmptyProps(d));
        let m;
        try {
          let E = s ? s.snapshot : this.routerState.snapshot.root;
          m = Mw(E);
        } catch {
          (typeof r[0] != 'string' || !r[0].startsWith('/')) && (r = []),
            (m = this.currentUrlTree.root);
        }
        return Nw(m, r, d, u ?? null);
      }
      navigateByUrl(r, i = { skipLocationChange: !1 }) {
        let s = ys(r) ? r : this.parseUrl(r),
          o = this.urlHandlingStrategy.merge(s, this.rawUrlTree);
        return this.scheduleNavigation(o, Uo, null, i);
      }
      navigate(r, i = { skipLocationChange: !1 }) {
        return qO(r), this.navigateByUrl(this.createUrlTree(r, i), i);
      }
      serializeUrl(r) {
        return this.urlSerializer.serialize(r);
      }
      parseUrl(r) {
        try {
          return this.urlSerializer.parse(r);
        } catch {
          return this.urlSerializer.parse('/');
        }
      }
      isActive(r, i) {
        let s;
        if (
          (i === !0 ? (s = te({}, UO)) : i === !1 ? (s = te({}, $O)) : (s = i),
          ys(r))
        )
          return uw(this.currentUrlTree, r, s);
        let o = this.parseUrl(r);
        return uw(this.currentUrlTree, o, s);
      }
      removeEmptyProps(r) {
        return Object.keys(r).reduce((i, s) => {
          let o = r[s];
          return o != null && (i[s] = o), i;
        }, {});
      }
      scheduleNavigation(r, i, s, o, a) {
        if (this.disposed) return Promise.resolve(!1);
        let c, l, u;
        a
          ? ((c = a.resolve), (l = a.reject), (u = a.promise))
          : (u = new Promise((m, E) => {
              (c = m), (l = E);
            }));
        let d = this.pendingTasks.add();
        return (
          Kw(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(d));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: i,
            restoredState: s,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: r,
            extras: o,
            resolve: c,
            reject: l,
            promise: u,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          u.catch((m) => Promise.reject(m))
        );
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })();
function qO(t) {
  for (let e = 0; e < t.length; e++) if (t[e] == null) throw new z(4008, !1);
}
function zO(t) {
  return !(t instanceof Wo) && !(t instanceof Ko);
}
var gu = class {};
var GO = (() => {
    let e = class e {
      constructor(r, i, s, o, a) {
        (this.router = r),
          (this.injector = s),
          (this.preloadingStrategy = o),
          (this.loader = a);
      }
      setUpPreloading() {
        this.subscription = this.router.events
          .pipe(
            mt((r) => r instanceof Gn),
            On(() => this.preload())
          )
          .subscribe(() => {});
      }
      preload() {
        return this.processRoutes(this.injector, this.router.config);
      }
      ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
      }
      processRoutes(r, i) {
        let s = [];
        for (let o of i) {
          o.providers &&
            !o._injector &&
            (o._injector = ml(o.providers, r, `Route: ${o.path}`));
          let a = o._injector ?? r,
            c = o._loadedInjector ?? a;
          ((o.loadChildren && !o._loadedRoutes && o.canLoad === void 0) ||
            (o.loadComponent && !o._loadedComponent)) &&
            s.push(this.preloadConfig(a, o)),
            (o.children || o._loadedRoutes) &&
              s.push(this.processRoutes(c, o.children ?? o._loadedRoutes));
        }
        return ze(s).pipe(cr());
      }
      preloadConfig(r, i) {
        return this.preloadingStrategy.preload(i, () => {
          let s;
          i.loadChildren && i.canLoad === void 0
            ? (s = this.loader.loadChildren(r, i))
            : (s = ue(null));
          let o = s.pipe(
            rt((a) =>
              a === null
                ? ue(void 0)
                : ((i._loadedRoutes = a.routes),
                  (i._loadedInjector = a.injector),
                  this.processRoutes(a.injector ?? r, a.routes))
            )
          );
          if (i.loadComponent && !i._loadedComponent) {
            let a = this.loader.loadComponent(i);
            return ze([o, a]).pipe(cr());
          } else return o;
        });
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(X(xr), X(vl), X(Rt), X(gu), X(ym));
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac, providedIn: 'root' }));
    let t = e;
    return t;
  })(),
  Qw = new le(''),
  WO = (() => {
    let e = class e {
      constructor(r, i, s, o, a = {}) {
        (this.urlSerializer = r),
          (this.transitions = i),
          (this.viewportScroller = s),
          (this.zone = o),
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
        return this.transitions.events.subscribe((r) => {
          r instanceof vs
            ? ((this.store[this.lastId] =
                this.viewportScroller.getScrollPosition()),
              (this.lastSource = r.navigationTrigger),
              (this.restoredId = r.restoredState
                ? r.restoredState.navigationId
                : 0))
            : r instanceof Gn
            ? ((this.lastId = r.id),
              this.scheduleScrollEvent(
                r,
                this.urlSerializer.parse(r.urlAfterRedirects).fragment
              ))
            : r instanceof Ar &&
              r.code === 0 &&
              ((this.lastSource = void 0),
              (this.restoredId = 0),
              this.scheduleScrollEvent(
                r,
                this.urlSerializer.parse(r.url).fragment
              ));
        });
      }
      consumeScrollEvents() {
        return this.transitions.events.subscribe((r) => {
          r instanceof uu &&
            (r.position
              ? this.options.scrollPositionRestoration === 'top'
                ? this.viewportScroller.scrollToPosition([0, 0])
                : this.options.scrollPositionRestoration === 'enabled' &&
                  this.viewportScroller.scrollToPosition(r.position)
              : r.anchor && this.options.anchorScrolling === 'enabled'
              ? this.viewportScroller.scrollToAnchor(r.anchor)
              : this.options.scrollPositionRestoration !== 'disabled' &&
                this.viewportScroller.scrollToPosition([0, 0]));
        });
      }
      scheduleScrollEvent(r, i) {
        this.zone.runOutsideAngular(() => {
          setTimeout(() => {
            this.zone.run(() => {
              this.transitions.events.next(
                new uu(
                  r,
                  this.lastSource === 'popstate'
                    ? this.store[this.restoredId]
                    : null,
                  i
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
    (e.ɵfac = function (i) {
      uE();
    }),
      (e.ɵprov = J({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })();
function h3(t, ...e) {
  return Bn([
    { provide: Xo, multi: !0, useValue: t },
    [],
    { provide: yi, useFactory: Yw, deps: [xr] },
    { provide: ai, multi: !0, useFactory: Zw },
    e.map((n) => n.ɵproviders),
  ]);
}
function Yw(t) {
  return t.routerState.root;
}
function sa(t, e) {
  return { ɵkind: t, ɵproviders: e };
}
function Zw() {
  let t = W(Ct);
  return (e) => {
    let n = t.get(jt);
    if (e !== n.components[0]) return;
    let r = t.get(xr),
      i = t.get(Xw);
    t.get(bm) === 1 && r.initialNavigation(),
      t.get(Jw, null, De.Optional)?.setUpPreloading(),
      t.get(Qw, null, De.Optional)?.init(),
      r.resetRootComponentType(n.componentTypes[0]),
      i.closed || (i.next(), i.complete(), i.unsubscribe());
  };
}
var Xw = new le('', { factory: () => new st() }),
  bm = new le('', { providedIn: 'root', factory: () => 1 });
function KO() {
  return sa(2, [
    { provide: bm, useValue: 0 },
    {
      provide: bl,
      multi: !0,
      deps: [Ct],
      useFactory: (e) => {
        let n = e.get(Fb, Promise.resolve());
        return () =>
          n.then(
            () =>
              new Promise((r) => {
                let i = e.get(xr),
                  s = e.get(Xw);
                Kw(i, () => {
                  r(!0);
                }),
                  (e.get(Em).afterPreactivation = () => (
                    r(!0), s.closed ? ue(void 0) : s
                  )),
                  i.initialNavigation();
              })
          );
      },
    },
  ]);
}
function QO() {
  return sa(3, [
    {
      provide: bl,
      multi: !0,
      useFactory: () => {
        let e = W(xr);
        return () => {
          e.setUpLocationChangeListener();
        };
      },
    },
    { provide: bm, useValue: 2 },
  ]);
}
var Jw = new le('');
function YO(t) {
  return sa(0, [
    { provide: Jw, useExisting: GO },
    { provide: gu, useExisting: t },
  ]);
}
function ZO() {
  return sa(8, [pw, { provide: yu, useExisting: pw }]);
}
function XO(t) {
  let e = [
    { provide: zw, useValue: LO },
    {
      provide: Gw,
      useValue: te({ skipNextTransition: !!t?.skipInitialTransition }, t),
    },
  ];
  return sa(9, e);
}
var gw = new le('ROUTER_FORROOT_GUARD'),
  JO = [
    os,
    { provide: ea, useClass: qo },
    xr,
    ta,
    { provide: yi, useFactory: Yw, deps: [xr] },
    ym,
    [],
  ],
  p3 = (() => {
    let e = class e {
      constructor(r) {}
      static forRoot(r, i) {
        return {
          ngModule: e,
          providers: [
            JO,
            [],
            { provide: Xo, multi: !0, useValue: r },
            { provide: gw, useFactory: r8, deps: [[xr, new uo(), new Ev()]] },
            { provide: ia, useValue: i || {} },
            i?.useHash ? t8() : n8(),
            e8(),
            i?.preloadingStrategy ? YO(i.preloadingStrategy).ɵproviders : [],
            i?.initialNavigation ? i8(i) : [],
            i?.bindToComponentInputs ? ZO().ɵproviders : [],
            i?.enableViewTransitions ? XO().ɵproviders : [],
            s8(),
          ],
        };
      }
      static forChild(r) {
        return {
          ngModule: e,
          providers: [{ provide: Xo, multi: !0, useValue: r }],
        };
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(X(gw, 8));
    }),
      (e.ɵmod = vr({ type: e })),
      (e.ɵinj = yr({}));
    let t = e;
    return t;
  })();
function e8() {
  return {
    provide: Qw,
    useFactory: () => {
      let t = W(Il),
        e = W(Fe),
        n = W(ia),
        r = W(Em),
        i = W(ea);
      return (
        n.scrollOffset && t.setOffset(n.scrollOffset), new WO(i, r, t, e, n)
      );
    },
  };
}
function t8() {
  return { provide: li, useClass: Hb };
}
function n8() {
  return { provide: li, useClass: Oh };
}
function r8(t) {
  return 'guarded';
}
function i8(t) {
  return [
    t.initialNavigation === 'disabled' ? QO().ɵproviders : [],
    t.initialNavigation === 'enabledBlocking' ? KO().ɵproviders : [],
  ];
}
var yw = new le('');
function s8() {
  return [
    { provide: yw, useFactory: Zw },
    { provide: ai, multi: !0, useExisting: yw },
  ];
}
export {
  Je as a,
  xe as b,
  st as c,
  dt as d,
  At as e,
  ze as f,
  ue as g,
  Ai as h,
  we as i,
  Ls as j,
  xi as k,
  OD as l,
  kD as m,
  mt as n,
  lr as o,
  LD as p,
  kn as q,
  PD as r,
  Ri as s,
  id as t,
  HD as u,
  BD as v,
  sd as w,
  od as x,
  it as y,
  fy as z,
  z as A,
  J as B,
  yr as C,
  le as D,
  X as E,
  W as F,
  My as G,
  vr as H,
  Yc as I,
  ao as J,
  K5 as K,
  Q5 as L,
  Y5 as M,
  Z5 as N,
  Zf as O,
  mv as P,
  sn as Q,
  tl as R,
  nh as S,
  $n as T,
  X5 as U,
  si as V,
  mo as W,
  rn as X,
  J5 as Y,
  rs as Z,
  uE as _,
  ul as $,
  gt as aa,
  Fe as ba,
  Z1 as ca,
  OE as da,
  kE as ea,
  hI as fa,
  FE as ga,
  pI as ha,
  e6 as ia,
  _f as ja,
  n6 as ka,
  r6 as la,
  i6 as ma,
  s6 as na,
  eb as oa,
  tb as pa,
  Dh as qa,
  o6 as ra,
  pM as sa,
  yo as ta,
  sb as ua,
  a6 as va,
  c6 as wa,
  l6 as xa,
  u6 as ya,
  d6 as za,
  wM as Aa,
  ab as Ba,
  f6 as Ca,
  lb as Da,
  PM as Ea,
  p6 as Fa,
  FM as Ga,
  jM as Ha,
  m6 as Ia,
  yl as Ja,
  vl as Ka,
  jt as La,
  Eo as Ma,
  Dl as Na,
  Mh as Oa,
  Ob as Pa,
  uN as Qa,
  g6 as Ra,
  vn as Sa,
  Ve as Ta,
  jb as Ua,
  V6 as Va,
  mN as Wa,
  U6 as Xa,
  J6 as Ya,
  f9 as Za,
  KN as _a,
  h9 as $a,
  m9 as ab,
  g9 as bb,
  Qh as cb,
  y9 as db,
  v9 as eb,
  A9 as fb,
  tu as gb,
  Xx as hb,
  z9 as ib,
  oR as jb,
  G9 as kb,
  W9 as lb,
  LR as mb,
  RO as nb,
  xr as ob,
  h3 as pb,
  p3 as qb,
};
//# sourceMappingURL=chunk-7YSW2TDQ.mjs.map
