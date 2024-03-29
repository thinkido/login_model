var nocache = (new Date).getTime();

navigator = {
    // WT-JS_DEBUG v1.7.5 - NLiger2018
    appCodeName: "Mozilla",
    appMinorVersion: "0",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko",
    browserLanguage: "zh-CN",
    cookieEnabled: true,
    cpuClass: "x86",
    language: "zh-CN",
    maxTouchPoints: 0,
    msManipulationViewsEnabled: true,
    msMaxTouchPoints: 0,
    msPointerEnabled: true,
    onLine: true,
    platform: "Win32",
    pointerEnabled: true,
    product: "Gecko",
    systemLanguage: "zh-CN",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko",
    userLanguage: "zh-CN",
    vendor: "",
    vendorSub: "",
    webdriver: false
}, window = this, window.navigator = navigator;

function Montgomery(e) {
    this.m = e;
    this.mp = e.invDigit();
    this.mpl = 32767 & this.mp;
    this.mph = this.mp >> 15;
    this.um = (1 << e.DB - 15) - 1;
    this.mt2 = 2 * e.t
}
function montConvert(e) {
    var t = nbi();
    e.abs().dlShiftTo(this.m.t, t);
    t.divRemTo(this.m, null, t);
    if (e.s < 0 && t.compareTo(BigInteger.ZERO) > 0)
        this.m.subTo(t, t);
    return t
}
function montRevert(e) {
    var t = nbi();
    e.copyTo(t);
    this.reduce(t);
    return t
}
function montReduce(e) {
    for (; e.t <= this.mt2; )
        e[e.t++] = 0;
    for (var t = 0; t < this.m.t; ++t) {
        var i = 32767 & e[t];
        var n = i * this.mpl + ((i * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
        i = t + this.m.t;
        e[i] += this.m.am(0, n, e, t, 0, this.m.t);
        for (; e[i] >= e.DV; ) {
            e[i] -= e.DV;
            e[++i]++
        }
    }
    e.clamp();
    e.drShiftTo(this.m.t, e);
    if (e.compareTo(this.m) >= 0)
        e.subTo(this.m, e)
}
function montSqrTo(e, t) {
    e.squareTo(t);
    this.reduce(t)
}
function montMulTo(e, t, i) {
    e.multiplyTo(t, i);
    this.reduce(i)
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

function BigInteger(e, t, i) {
    if (null != e)
        if ("number" == typeof e)
            this.fromNumber(e, t, i);
        else if (null == t && "string" != typeof e)
            this.fromString(e, 256);
        else
            this.fromString(e, t)
}
function bnpCopyTo(e) {
    for (var t = this.t - 1; t >= 0; --t)
        e[t] = this[t];
    e.t = this.t;
    e.s = this.s
}
function bnpFromInt(e) {
    this.t = 1;
    this.s = e < 0 ? -1 : 0;
    if (e > 0)
        this[0] = e;
    else if (e < -1)
        this[0] = e + DV;
    else
        this.t = 0
}
function bnpFromString(e, t) {
    var i;
    if (16 == t)
        i = 4;
    else if (8 == t)
        i = 3;
    else if (256 == t)
        i = 8;
    else if (2 == t)
        i = 1;
    else if (32 == t)
        i = 5;
    else if (4 == t)
        i = 2;
    else {
        this.fromRadix(e, t);
        return
    }
    this.t = 0;
    this.s = 0;
    var n = e.length
      , s = !1
      , a = 0;
    for (; --n >= 0; ) {
        var r = 8 == i ? 255 & e[n] : intAt(e, n);
        if (!(r < 0)) {
            s = !1;
            if (0 == a)
                this[this.t++] = r;
            else if (a + i > this.DB) {
                this[this.t - 1] |= (r & (1 << this.DB - a) - 1) << a;
                this[this.t++] = r >> this.DB - a
            } else
                this[this.t - 1] |= r << a;
            a += i;
            if (a >= this.DB)
                a -= this.DB
        } else if ("-" == e.charAt(n))
            s = !0
    }
    if (8 == i && 0 != (128 & e[0])) {
        this.s = -1;
        if (a > 0)
            this[this.t - 1] |= (1 << this.DB - a) - 1 << a
    }
    this.clamp();
    if (s)
        BigInteger.ZERO.subTo(this, this)
}
function bnpClamp() {
    var e = this.s & this.DM;
    for (; this.t > 0 && this[this.t - 1] == e; )
        --this.t
}
function bnpDLShiftTo(e, t) {
    var i;
    for (i = this.t - 1; i >= 0; --i)
        t[i + e] = this[i];
    for (i = e - 1; i >= 0; --i)
        t[i] = 0;
    t.t = this.t + e;
    t.s = this.s
}
function bnpDRShiftTo(e, t) {
    for (var i = e; i < this.t; ++i)
        t[i - e] = this[i];
    t.t = Math.max(this.t - e, 0);
    t.s = this.s
}
function bnpLShiftTo(e, t) {
    var i = e % this.DB;
    var n = this.DB - i;
    var s = (1 << n) - 1;
    var a = Math.floor(e / this.DB), r = this.s << i & this.DM, o;
    for (o = this.t - 1; o >= 0; --o) {
        t[o + a + 1] = this[o] >> n | r;
        r = (this[o] & s) << i
    }
    for (o = a - 1; o >= 0; --o)
        t[o] = 0;
    t[a] = r;
    t.t = this.t + a + 1;
    t.s = this.s;
    t.clamp()
}
function bnpRShiftTo(e, t) {
    t.s = this.s;
    var i = Math.floor(e / this.DB);
    if (!(i >= this.t)) {
        var n = e % this.DB;
        var s = this.DB - n;
        var a = (1 << n) - 1;
        t[0] = this[i] >> n;
        for (var r = i + 1; r < this.t; ++r) {
            t[r - i - 1] |= (this[r] & a) << s;
            t[r - i] = this[r] >> n
        }
        if (n > 0)
            t[this.t - i - 1] |= (this.s & a) << s;
        t.t = this.t - i;
        t.clamp()
    } else
        t.t = 0
}
function bnpSubTo(e, t) {
    var i = 0
      , n = 0
      , s = Math.min(e.t, this.t);
    for (; i < s; ) {
        n += this[i] - e[i];
        t[i++] = n & this.DM;
        n >>= this.DB
    }
    if (e.t < this.t) {
        n -= e.s;
        for (; i < this.t; ) {
            n += this[i];
            t[i++] = n & this.DM;
            n >>= this.DB
        }
        n += this.s
    } else {
        n += this.s;
        for (; i < e.t; ) {
            n -= e[i];
            t[i++] = n & this.DM;
            n >>= this.DB
        }
        n -= e.s
    }
    t.s = n < 0 ? -1 : 0;
    if (n < -1)
        t[i++] = this.DV + n;
    else if (n > 0)
        t[i++] = n;
    t.t = i;
    t.clamp()
}
function bnpMultiplyTo(e, t) {
    var i = this.abs()
      , n = e.abs();
    var s = i.t;
    t.t = s + n.t;
    for (; --s >= 0; )
        t[s] = 0;
    for (s = 0; s < n.t; ++s)
        t[s + i.t] = i.am(0, n[s], t, s, 0, i.t);
    t.s = 0;
    t.clamp();
    if (this.s != e.s)
        BigInteger.ZERO.subTo(t, t)
}
function bnpSquareTo(e) {
    var t = this.abs();
    var i = e.t = 2 * t.t;
    for (; --i >= 0; )
        e[i] = 0;
    for (i = 0; i < t.t - 1; ++i) {
        var n = t.am(i, t[i], e, 2 * i, 0, 1);
        if ((e[i + t.t] += t.am(i + 1, 2 * t[i], e, 2 * i + 1, n, t.t - i - 1)) >= t.DV) {
            e[i + t.t] -= t.DV;
            e[i + t.t + 1] = 1
        }
    }
    if (e.t > 0)
        e[e.t - 1] += t.am(i, t[i], e, 2 * i, 0, 1);
    e.s = 0;
    e.clamp()
}
function bnpDivRemTo(e, t, i) {
    var n = e.abs();
    if (!(n.t <= 0)) {
        var s = this.abs();
        if (!(s.t < n.t)) {
            if (null == i)
                i = nbi();
            var a = nbi()
              , r = this.s
              , o = e.s;
            var c = this.DB - nbits(n[n.t - 1]);
            if (c > 0) {
                n.lShiftTo(c, a);
                s.lShiftTo(c, i)
            } else {
                n.copyTo(a);
                s.copyTo(i)
            }
            var d = a.t;
            var _ = a[d - 1];
            if (0 != _) {
                var h = _ * (1 << this.F1) + (d > 1 ? a[d - 2] >> this.F2 : 0);
                var f = this.FV / h
                  , l = (1 << this.F1) / h
                  , u = 1 << this.F2;
                var p = i.t
                  , m = p - d
                  , v = null == t ? nbi() : t;
                a.dlShiftTo(m, v);
                if (i.compareTo(v) >= 0) {
                    i[i.t++] = 1;
                    i.subTo(v, i)
                }
                BigInteger.ONE.dlShiftTo(d, v);
                v.subTo(a, a);
                for (; a.t < d; )
                    a[a.t++] = 0;
                for (; --m >= 0; ) {
                    var g = i[--p] == _ ? this.DM : Math.floor(i[p] * f + (i[p - 1] + u) * l);
                    if ((i[p] += a.am(0, g, i, m, 0, d)) < g) {
                        a.dlShiftTo(m, v);
                        i.subTo(v, i);
                        for (; i[p] < --g; )
                            i.subTo(v, i)
                    }
                }
                if (null != t) {
                    i.drShiftTo(d, t);
                    if (r != o)
                        BigInteger.ZERO.subTo(t, t)
                }
                i.t = d;
                i.clamp();
                if (c > 0)
                    i.rShiftTo(c, i);
                if (r < 0)
                    BigInteger.ZERO.subTo(i, i)
            }
        } else {
            if (null != t)
                t.fromInt(0);
            if (null != i)
                this.copyTo(i)
        }
    }
}
function bnMod(e) {
    var t = nbi();
    this.abs().divRemTo(e, null, t);
    if (this.s < 0 && t.compareTo(BigInteger.ZERO) > 0)
        e.subTo(t, t);
    return t
}
function bnpInvDigit() {
    if (this.t < 1)
        return 0;
    var e = this[0];
    if (0 == (1 & e))
        return 0;
    var t = 3 & e;
    t = t * (2 - (15 & e) * t) & 15;
    t = t * (2 - (255 & e) * t) & 255;
    t = t * (2 - ((65535 & e) * t & 65535)) & 65535;
    t = t * (2 - e * t % this.DV) % this.DV;
    return t > 0 ? this.DV - t : -t
}
function bnpIsEven() {
    return 0 == (this.t > 0 ? 1 & this[0] : this.s)
}
function bnpExp(e, t) {
    if (e > 4294967295 || e < 1)
        return BigInteger.ONE;
    var i = nbi()
      , n = nbi()
      , s = t.convert(this)
      , a = nbits(e) - 1;
    s.copyTo(i);
    for (; --a >= 0; ) {
        t.sqrTo(i, n);
        if ((e & 1 << a) > 0)
            t.mulTo(n, s, i);
        else {
            var r = i;
            i = n;
            n = r
        }
    }
    return t.revert(i)
}
function bnModPowInt(e, t) {
    var i;
    if (e < 256 || t.isEven())
        i = new Classic(t);
    else
        i = new Montgomery(t);
    return this.exp(e, i)
}
function bnToString(e) {
    if (this.s < 0)
        return "-" + this.negate().toString(e);
    var t;
    if (16 == e)
        t = 4;
    else if (8 == e)
        t = 3;
    else if (2 == e)
        t = 1;
    else if (32 == e)
        t = 5;
    else if (4 == e)
        t = 2;
    else
        return this.toRadix(e);
    var i = (1 << t) - 1, n, s = !1, a = "", r = this.t;
    var o = this.DB - r * this.DB % t;
    if (r-- > 0) {
        if (o < this.DB && (n = this[r] >> o) > 0) {
            s = !0;
            a = int2char(n)
        }
        for (; r >= 0; ) {
            if (o < t) {
                n = (this[r] & (1 << o) - 1) << t - o;
                n |= this[--r] >> (o += this.DB - t)
            } else {
                n = this[r] >> (o -= t) & i;
                if (o <= 0) {
                    o += this.DB;
                    --r
                }
            }
            if (n > 0)
                s = !0;
            if (s)
                a += int2char(n)
        }
    }
    return s ? a : "0"
}
function bnNegate() {
    var e = nbi();
    BigInteger.ZERO.subTo(this, e);
    return e
}
function bnAbs() {
    return this.s < 0 ? this.negate() : this
}
function bnCompareTo(e) {
    var t = this.s - e.s;
    if (0 != t)
        return t;
    var i = this.t;
    t = i - e.t;
    if (0 != t)
        return this.s < 0 ? -t : t;
    for (; --i >= 0; )
        if (0 != (t = this[i] - e[i]))
            return t;
    return 0
}
function nbits(e) {
    var t = 1, i;
    if (0 != (i = e >>> 16)) {
        e = i;
        t += 16
    }
    if (0 != (i = e >> 8)) {
        e = i;
        t += 8
    }
    if (0 != (i = e >> 4)) {
        e = i;
        t += 4
    }
    if (0 != (i = e >> 2)) {
        e = i;
        t += 2
    }
    if (0 != (i = e >> 1)) {
        e = i;
        t += 1
    }
    return t
}
function bnBitLength() {
    if (this.t <= 0)
        return 0;
    else
        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}
function bnClone() {
    var e = nbi();
    this.copyTo(e);
    return e
}
function bnIntValue() {
    if (this.s < 0) {
        if (1 == this.t)
            return this[0] - this.DV;
        else if (0 == this.t)
            return -1
    } else if (1 == this.t)
        return this[0];
    else if (0 == this.t)
        return 0;
    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
}
function bnByteValue() {
    return 0 == this.t ? this.s : this[0] << 24 >> 24
}
function bnShortValue() {
    return 0 == this.t ? this.s : this[0] << 16 >> 16
}
function bnpChunkSize(e) {
    return Math.floor(Math.LN2 * this.DB / Math.log(e))
}
function bnSigNum() {
    if (this.s < 0)
        return -1;
    else if (this.t <= 0 || 1 == this.t && this[0] <= 0)
        return 0;
    else
        return 1
}
function bnpToRadix(e) {
    if (null == e)
        e = 10;
    if (0 == this.signum() || e < 2 || e > 36)
        return "0";
    var t = this.chunkSize(e);
    var i = Math.pow(e, t);
    var n = nbv(i)
      , s = nbi()
      , a = nbi()
      , r = "";
    this.divRemTo(n, s, a);
    for (; s.signum() > 0; ) {
        r = (i + a.intValue()).toString(e).substr(1) + r;
        s.divRemTo(n, s, a)
    }
    return a.intValue().toString(e) + r
}
function bnpFromRadix(e, t) {
    this.fromInt(0);
    if (null == t)
        t = 10;
    var i = this.chunkSize(t);
    var n = Math.pow(t, i)
      , s = !1
      , a = 0
      , r = 0;
    for (var o = 0; o < e.length; ++o) {
        var c = intAt(e, o);
        if (!(c < 0)) {
            r = t * r + c;
            if (++a >= i) {
                this.dMultiply(n);
                this.dAddOffset(r, 0);
                a = 0;
                r = 0
            }
        } else if ("-" == e.charAt(o) && 0 == this.signum())
            s = !0
    }
    if (a > 0) {
        this.dMultiply(Math.pow(t, a));
        this.dAddOffset(r, 0)
    }
    if (s)
        BigInteger.ZERO.subTo(this, this)
}
function bnpFromNumber(e, t, i) {
    if ("number" == typeof t)
        if (e < 2)
            this.fromInt(1);
        else {
            this.fromNumber(e, i);
            if (!this.testBit(e - 1))
                this.bitwiseTo(BigInteger.ONE.shiftLeft(e - 1), op_or, this);
            if (this.isEven())
                this.dAddOffset(1, 0);
            for (; !this.isProbablePrime(t); ) {
                this.dAddOffset(2, 0);
                if (this.bitLength() > e)
                    this.subTo(BigInteger.ONE.shiftLeft(e - 1), this)
            }
        }
    else {
        var n = new Array
          , s = 7 & e;
        n.length = (e >> 3) + 1;
        t.nextBytes(n);
        if (s > 0)
            n[0] &= (1 << s) - 1;
        else
            n[0] = 0;
        this.fromString(n, 256)
    }
}
function bnToByteArray() {
    var e = this.t
      , t = new Array;
    t[0] = this.s;
    var i = this.DB - e * this.DB % 8, n, s = 0;
    if (e-- > 0) {
        if (i < this.DB && (n = this[e] >> i) != (this.s & this.DM) >> i)
            t[s++] = n | this.s << this.DB - i;
        for (; e >= 0; ) {
            if (i < 8) {
                n = (this[e] & (1 << i) - 1) << 8 - i;
                n |= this[--e] >> (i += this.DB - 8)
            } else {
                n = this[e] >> (i -= 8) & 255;
                if (i <= 0) {
                    i += this.DB;
                    --e
                }
            }
            if (0 != (128 & n))
                n |= -256;
            if (0 == s && (128 & this.s) != (128 & n))
                ++s;
            if (s > 0 || n != this.s)
                t[s++] = n
        }
    }
    return t
}
function bnEquals(e) {
    return 0 == this.compareTo(e)
}
function bnMin(e) {
    return this.compareTo(e) < 0 ? this : e
}
function bnMax(e) {
    return this.compareTo(e) > 0 ? this : e
}
function bnpBitwiseTo(e, t, i) {
    var n, s, a = Math.min(e.t, this.t);
    for (n = 0; n < a; ++n)
        i[n] = t(this[n], e[n]);
    if (e.t < this.t) {
        s = e.s & this.DM;
        for (n = a; n < this.t; ++n)
            i[n] = t(this[n], s);
        i.t = this.t
    } else {
        s = this.s & this.DM;
        for (n = a; n < e.t; ++n)
            i[n] = t(s, e[n]);
        i.t = e.t
    }
    i.s = t(this.s, e.s);
    i.clamp()
}
function bnBitCount() {
    var e = 0
      , t = this.s & this.DM;
    for (var i = 0; i < this.t; ++i)
        e += cbit(this[i] ^ t);
    return e
}
function bnTestBit(e) {
    var t = Math.floor(e / this.DB);
    if (t >= this.t)
        return 0 != this.s;
    else
        return 0 != (this[t] & 1 << e % this.DB)
}
function bnpChangeBit(e, t) {
    var i = BigInteger.ONE.shiftLeft(e);
    this.bitwiseTo(i, t, i);
    return i
}
function bnSetBit(e) {
    return this.changeBit(e, op_or)
}
function bnClearBit(e) {
    return this.changeBit(e, op_andnot)
}
function bnFlipBit(e) {
    return this.changeBit(e, op_xor)
}
function bnpAddTo(e, t) {
    var i = 0
      , n = 0
      , s = Math.min(e.t, this.t);
    for (; i < s; ) {
        n += this[i] + e[i];
        t[i++] = n & this.DM;
        n >>= this.DB
    }
    if (e.t < this.t) {
        n += e.s;
        for (; i < this.t; ) {
            n += this[i];
            t[i++] = n & this.DM;
            n >>= this.DB
        }
        n += this.s
    } else {
        n += this.s;
        for (; i < e.t; ) {
            n += e[i];
            t[i++] = n & this.DM;
            n >>= this.DB
        }
        n += e.s
    }
    t.s = n < 0 ? -1 : 0;
    if (n > 0)
        t[i++] = n;
    else if (n < -1)
        t[i++] = this.DV + n;
    t.t = i;
    t.clamp()
}
function bnAdd(e) {
    var t = nbi();
    this.addTo(e, t);
    return t
}
function bnSubtract(e) {
    var t = nbi();
    this.subTo(e, t);
    return t
}
function bnMultiply(e) {
    var t = nbi();
    this.multiplyTo(e, t);
    return t
}
function bnSquare() {
    var e = nbi();
    this.squareTo(e);
    return e
}
function bnDivide(e) {
    var t = nbi();
    this.divRemTo(e, t, null);
    return t
}
function bnRemainder(e) {
    var t = nbi();
    this.divRemTo(e, null, t);
    return t
}
function bnDivideAndRemainder(e) {
    var t = nbi()
      , i = nbi();
    this.divRemTo(e, t, i);
    return new Array(t,i)
}
function bnpDMultiply(e) {
    this[this.t] = this.am(0, e - 1, this, 0, 0, this.t);
    ++this.t;
    this.clamp()
}
function bnpDAddOffset(e, t) {
    if (0 != e) {
        for (; this.t <= t; )
            this[this.t++] = 0;
        this[t] += e;
        for (; this[t] >= this.DV; ) {
            this[t] -= this.DV;
            if (++t >= this.t)
                this[this.t++] = 0;
            ++this[t]
        }
    }
}
function bnPow(e) {
    return this.exp(e, new NullExp)
}
function bnpMultiplyLowerTo(e, t, i) {
    var n = Math.min(this.t + e.t, t);
    i.s = 0;
    i.t = n;
    for (; n > 0; )
        i[--n] = 0;
    var s;
    for (s = i.t - this.t; n < s; ++n)
        i[n + this.t] = this.am(0, e[n], i, n, 0, this.t);
    for (s = Math.min(e.t, t); n < s; ++n)
        this.am(0, e[n], i, n, 0, t - n);
    i.clamp()
}
function bnpMultiplyUpperTo(e, t, i) {
    --t;
    var n = i.t = this.t + e.t - t;
    i.s = 0;
    for (; --n >= 0; )
        i[n] = 0;
    for (n = Math.max(t - this.t, 0); n < e.t; ++n)
        i[this.t + n - t] = this.am(t - n, e[n], i, 0, 0, this.t + n - t);
    i.clamp();
    i.drShiftTo(1, i)
}
function bnpModInt(e) {
    if (e <= 0)
        return 0;
    var t = this.DV % e
      , i = this.s < 0 ? e - 1 : 0;
    if (this.t > 0)
        if (0 == t)
            i = this[0] % e;
        else
            for (var n = this.t - 1; n >= 0; --n)
                i = (t * i + this[n]) % e;
    return i
}
function bnModInverse(e) {
    var t = e.isEven();
    if (this.isEven() && t || 0 == e.signum())
        return BigInteger.ZERO;
    var i = e.clone()
      , n = this.clone();
    var s = nbv(1)
      , a = nbv(0)
      , r = nbv(0)
      , o = nbv(1);
    for (; 0 != i.signum(); ) {
        for (; i.isEven(); ) {
            i.rShiftTo(1, i);
            if (t) {
                if (!s.isEven() || !a.isEven()) {
                    s.addTo(this, s);
                    a.subTo(e, a)
                }
                s.rShiftTo(1, s)
            } else if (!a.isEven())
                a.subTo(e, a);
            a.rShiftTo(1, a)
        }
        for (; n.isEven(); ) {
            n.rShiftTo(1, n);
            if (t) {
                if (!r.isEven() || !o.isEven()) {
                    r.addTo(this, r);
                    o.subTo(e, o)
                }
                r.rShiftTo(1, r)
            } else if (!o.isEven())
                o.subTo(e, o);
            o.rShiftTo(1, o)
        }
        if (i.compareTo(n) >= 0) {
            i.subTo(n, i);
            if (t)
                s.subTo(r, s);
            a.subTo(o, a)
        } else {
            n.subTo(i, n);
            if (t)
                r.subTo(s, r);
            o.subTo(a, o)
        }
    }
    if (0 != n.compareTo(BigInteger.ONE))
        return BigInteger.ZERO;
    if (o.compareTo(e) >= 0)
        return o.subtract(e);
    if (o.signum() < 0)
        o.addTo(e, o);
    else
        return o;
    if (o.signum() < 0)
        return o.add(e);
    else
        return o
}
function bnpMillerRabin(e) {
    var t = this.subtract(BigInteger.ONE);
    var i = t.getLowestSetBit();
    if (i <= 0)
        return !1;
    var n = t.shiftRight(i);
    e = e + 1 >> 1;
    if (e > lowprimes.length)
        e = lowprimes.length;
    var s = nbi();
    for (var a = 0; a < e; ++a) {
        s.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var r = s.modPow(n, this);
        if (0 != r.compareTo(BigInteger.ONE) && 0 != r.compareTo(t)) {
            var o = 1;
            for (; o++ < i && 0 != r.compareTo(t); ) {
                r = r.modPowInt(2, this);
                if (0 == r.compareTo(BigInteger.ONE))
                    return !1
            }
            if (0 != r.compareTo(t))
                return !1
        }
    }
    return !0
}
function bnAnd(e) {
    var t = nbi();
    this.bitwiseTo(e, op_and, t);
    return t
}
function bnOr(e) {
    var t = nbi();
    this.bitwiseTo(e, op_or, t);
    return t
}
function bnXor(e) {
    var t = nbi();
    this.bitwiseTo(e, op_xor, t);
    return t
}
function bnAndNot(e) {
    var t = nbi();
    this.bitwiseTo(e, op_andnot, t);
    return t
}
function bnNot() {
    var e = nbi();
    for (var t = 0; t < this.t; ++t)
        e[t] = this.DM & ~this[t];
    e.t = this.t;
    e.s = ~this.s;
    return e
}
function bnShiftLeft(e) {
    var t = nbi();
    if (e < 0)
        this.rShiftTo(-e, t);
    else
        this.lShiftTo(e, t);
    return t
}
function bnShiftRight(e) {
    var t = nbi();
    if (e < 0)
        this.lShiftTo(-e, t);
    else
        this.rShiftTo(e, t);
    return t
}
function bnGetLowestSetBit() {
    for (var e = 0; e < this.t; ++e)
        if (0 != this[e])
            return e * this.DB + lbit(this[e]);
    if (this.s < 0)
        return this.t * this.DB;
    else
        return -1
}
function bnModPow(e, t) {
    var i = e.bitLength(), n, s = nbv(1), a;
    if (i <= 0)
        return s;
    else if (i < 18)
        n = 1;
    else if (i < 48)
        n = 3;
    else if (i < 144)
        n = 4;
    else if (i < 768)
        n = 5;
    else
        n = 6;
    if (i < 8)
        a = new Classic(t);
    else if (t.isEven())
        a = new Barrett(t);
    else
        a = new Montgomery(t);
    var r = new Array
      , o = 3
      , c = n - 1
      , d = (1 << n) - 1;
    r[1] = a.convert(this);
    if (n > 1) {
        var _ = nbi();
        a.sqrTo(r[1], _);
        for (; o <= d; ) {
            r[o] = nbi();
            a.mulTo(_, r[o - 2], r[o]);
            o += 2
        }
    }
    var h = e.t - 1, f, l = !0, u = nbi(), p;
    i = nbits(e[h]) - 1;
    for (; h >= 0; ) {
        if (i >= c)
            f = e[h] >> i - c & d;
        else {
            f = (e[h] & (1 << i + 1) - 1) << c - i;
            if (h > 0)
                f |= e[h - 1] >> this.DB + i - c
        }
        o = n;
        for (; 0 == (1 & f); ) {
            f >>= 1;
            --o
        }
        if ((i -= o) < 0) {
            i += this.DB;
            --h
        }
        if (l) {
            r[f].copyTo(s);
            l = !1
        } else {
            for (; o > 1; ) {
                a.sqrTo(s, u);
                a.sqrTo(u, s);
                o -= 2
            }
            if (o > 0)
                a.sqrTo(s, u);
            else {
                p = s;
                s = u;
                u = p
            }
            a.mulTo(u, r[f], s)
        }
        for (; h >= 0 && 0 == (e[h] & 1 << i); ) {
            a.sqrTo(s, u);
            p = s;
            s = u;
            u = p;
            if (--i < 0) {
                i = this.DB - 1;
                --h
            }
        }
    }
    return a.revert(s)
}
function bnGCD(e) {
    var t = this.s < 0 ? this.negate() : this.clone();
    var i = e.s < 0 ? e.negate() : e.clone();
    if (t.compareTo(i) < 0) {
        var n = t;
        t = i;
        i = n
    }
    var s = t.getLowestSetBit()
      , a = i.getLowestSetBit();
    if (a < 0)
        return t;
    if (s < a)
        a = s;
    if (a > 0) {
        t.rShiftTo(a, t);
        i.rShiftTo(a, i)
    }
    for (; t.signum() > 0; ) {
        if ((s = t.getLowestSetBit()) > 0)
            t.rShiftTo(s, t);
        if ((s = i.getLowestSetBit()) > 0)
            i.rShiftTo(s, i);
        if (t.compareTo(i) >= 0) {
            t.subTo(i, t);
            t.rShiftTo(1, t)
        } else {
            i.subTo(t, i);
            i.rShiftTo(1, i)
        }
    }
    if (a > 0)
        i.lShiftTo(a, i);
    return i
}
function bnIsProbablePrime(e) {
    var t, i = this.abs();
    if (1 == i.t && i[0] <= lowprimes[lowprimes.length - 1]) {
        for (t = 0; t < lowprimes.length; ++t)
            if (i[0] == lowprimes[t])
                return !0;
        return !1
    }
    if (i.isEven())
        return !1;
    t = 1;
    for (; t < lowprimes.length; ) {
        var n = lowprimes[t]
          , s = t + 1;
        for (; s < lowprimes.length && n < lplim; )
            n *= lowprimes[s++];
        n = i.modInt(n);
        for (; t < s; )
            if (n % lowprimes[t++] == 0)
                return !1
    }
    return i.millerRabin(e)
}
function nbv(e) {
    var t = nbi();
    t.fromInt(e);
    return t
}
function nbi() {
    return new BigInteger(null)
}
function intAt(e, t) {
    var i = BI_RC[e.charCodeAt(t)];
    return null == i ? -1 : i
}
var dbits;
var canary = 0xdeadbeefcafe;
var j_lm = 15715070 == (16777215 & canary);
function am1(e, t, i, n, s, a) {
    for (; --a >= 0; ) {
        var r = t * this[e++] + i[n] + s;
        s = Math.floor(r / 67108864);
        i[n++] = 67108863 & r
    }
    return s
}
function am2(e, t, i, n, s, a) {
    var r = 32767 & t
      , o = t >> 15;
    for (; --a >= 0; ) {
        var c = 32767 & this[e];
        var d = this[e++] >> 15;
        var _ = o * c + d * r;
        c = r * c + ((32767 & _) << 15) + i[n] + (1073741823 & s);
        s = (c >>> 30) + (_ >>> 15) + o * d + (s >>> 30);
        i[n++] = 1073741823 & c
    }
    return s
}
function am3(e, t, i, n, s, a) {
    var r = 16383 & t
      , o = t >> 14;
    for (; --a >= 0; ) {
        var c = 16383 & this[e];
        var d = this[e++] >> 14;
        var _ = o * c + d * r;
        c = r * c + ((16383 & _) << 14) + i[n] + s;
        s = (c >> 28) + (_ >> 14) + o * d;
        i[n++] = 268435455 & c
    }
    return s
}
if (j_lm && "Microsoft Internet Explorer" == navigator.appName) {
    BigInteger.prototype.am = am2;
    dbits = 30
} else if (j_lm && "Netscape" != navigator.appName) {
    BigInteger.prototype.am = am1;
    dbits = 26
} else {
    BigInteger.prototype.am = am3;
    dbits = 28
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array;
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv)
    BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv)
    BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv)
    BI_RC[rr++] = vv;
function int2char(e) {
    return BI_RM.charAt(e)
}
BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin;
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
BigInteger.prototype.square = bnSquare;
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);

var RSAPublicKey = function(e, t) {
    this.modulus = new BigInteger(Hex.encode(e),16);
    this.encryptionExponent = new BigInteger(Hex.encode(t),16)
}

var Base64 = {
    base64: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        if (!e)
            return !1;
        var t = "";
        var i, n, s;
        var a, r, o, c;
        var d = 0;
        do {
            i = e.charCodeAt(d++);
            n = e.charCodeAt(d++);
            s = e.charCodeAt(d++);
            a = i >> 2;
            r = (3 & i) << 4 | n >> 4;
            o = (15 & n) << 2 | s >> 6;
            c = 63 & s;
            if (isNaN(n))
                o = c = 64;
            else if (isNaN(s))
                c = 64;
            t += this.base64.charAt(a) + this.base64.charAt(r) + this.base64.charAt(o) + this.base64.charAt(c)
        } while (d < e.length);return t
    },
    decode: function(e) {
        if (!e)
            return !1;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        var t = "";
        var i, n, s, a;
        var r = 0;
        do {
            i = this.base64.indexOf(e.charAt(r++));
            n = this.base64.indexOf(e.charAt(r++));
            s = this.base64.indexOf(e.charAt(r++));
            a = this.base64.indexOf(e.charAt(r++));
            t += String.fromCharCode(i << 2 | n >> 4);
            if (64 != s)
                t += String.fromCharCode((15 & n) << 4 | s >> 2);
            if (64 != a)
                t += String.fromCharCode((3 & s) << 6 | a)
        } while (r < e.length);return t
    }
}
var Hex = {
    hex: "0123456789abcdef",
    encode: function(e) {
        if (!e)
            return !1;
        var t = "";
        var i;
        var n = 0;
        do {
            i = e.charCodeAt(n++);
            t += this.hex.charAt(i >> 4 & 15) + this.hex.charAt(15 & i)
        } while (n < e.length);return t
    },
    decode: function(e) {
        if (!e)
            return !1;
        e = e.replace(/[^0-9abcdef]/g, "");
        var t = "";
        var i = 0;
        do
            t += String.fromCharCode(this.hex.indexOf(e.charAt(i++)) << 4 & 240 | 15 & this.hex.indexOf(e.charAt(i++)));
        while (i < e.length);return t
    }
}

var ASN1Data = function(e) {
    this.error = !1;
    this.parse = function(e) {
        if (!e) {
            this.error = !0;
            return null
        }
        var t = [];
        for (; e.length > 0; ) {
            var i = e.charCodeAt(0);
            e = e.substr(1);
            var n = 0;
            if (5 == (31 & i))
                e = e.substr(1);
            else if (128 & e.charCodeAt(0)) {
                var s = 127 & e.charCodeAt(0);
                e = e.substr(1);
                if (s > 0)
                    n = e.charCodeAt(0);
                if (s > 1)
                    n = n << 8 | e.charCodeAt(1);
                if (s > 2) {
                    this.error = !0;
                    return null
                }
                e = e.substr(s)
            } else {
                n = e.charCodeAt(0);
                e = e.substr(1)
            }
            var a = "";
            if (n) {
                if (n > e.length) {
                    this.error = !0;
                    return null
                }
                a = e.substr(0, n);
                e = e.substr(n)
            }
            if (32 & i)
                t.push(this.parse(a));
            else
                t.push(this.value(128 & i ? 4 : 31 & i, a))
        }
        return t
    }
    ;
    this.value = function(e, t) {
        if (1 == e)
            return t ? !0 : !1;
        else if (2 == e)
            return t;
        else if (3 == e)
            return this.parse(t.substr(1));
        else if (5 == e)
            return null;
        else if (6 == e) {
            var i = [];
            var n = t.charCodeAt(0);
            i.push(Math.floor(n / 40));
            i.push(n - 40 * i[0]);
            var s = [];
            var a = 0;
            var r;
            for (r = 1; r < t.length; r++) {
                var o = t.charCodeAt(r);
                s.push(127 & o);
                if (128 & o)
                    a++;
                else {
                    var c;
                    var d = 0;
                    for (c = 0; c < s.length; c++)
                        d += s[c] * Math.pow(128, a--);
                    i.push(d);
                    a = 0;
                    s = []
                }
            }
            return i.join(".")
        }
        return null
    }
    ;
    this.data = this.parse(e)
}

var RSA = {
    getPublicKey: function(e) {
        if (e.length < 50)
            return !1;
        if ("-----BEGIN PUBLIC KEY-----" != e.substr(0, 26))
            return !1;
        e = e.substr(26);
        if ("-----END PUBLIC KEY-----" != e.substr(e.length - 24))
            return !1;
        e = e.substr(0, e.length - 24);
        e = new ASN1Data(Base64.decode(e));
        if (e.error)
            return !1;
        e = e.data;
        if ("1.2.840.113549.1.1.1" == e[0][0][0])
            return new RSAPublicKey(e[0][1][0][0],e[0][1][0][1]);
        else
            return !1
    },
    encrypt: function(e, t) {
        if (!t)
            return !1;
        var i = t.modulus.bitLength() + 7 >> 3;
        e = this.pkcs1pad2(e, i);
        if (!e)
            return !1;
        e = e.modPowInt(t.encryptionExponent, t.modulus);
        if (!e)
            return !1;
        e = e.toString(16);
        for (; e.length < 2 * i; )
            e = "0" + e;
        return Base64.encode(Hex.decode(e))
    },
    decrypt: function(e) {
        var t = new BigInteger(e,16)
    },
    pkcs1pad2: function(e, t) {
        if (t < e.length + 11)
            return null;
        var i = [];
        var n = e.length - 1;
        for (; n >= 0 && t > 0; )
            i[--t] = e.charCodeAt(n--);
        i[--t] = 0;
        for (; t > 2; )
            i[--t] = Math.floor(254 * Math.random()) + 1;
        i[--t] = 2;
        i[--t] = 0;
        return new BigInteger(i)
    }
}

//console.log(RSA.getPublicKey("-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5gsH+AA4XWONB5TDcUd+xCz7ejOFHZKlcZDx+pF1i7Gsvi1vjyJoQhRtRSn950x498VUkx7rUxg1/ScBVfrRxQOZ8xFBye3pjAzfb22+RCuYApSVpJ3OO3KsEuKExftz9oFBv3ejxPlYc5yq7YiBO8XlTnQN0Sa4R4qhPO3I2MQIDAQAB-----END PUBLIC KEY-----"))

var u = "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5gsH+AA4XWONB5TDcUd+xCz7ejOFHZKlcZDx+pF1i7Gsvi1vjyJoQhRtRSn950x498VUkx7rUxg1/ScBVfrRxQOZ8xFBye3pjAzfb22+RCuYApSVpJ3OO3KsEuKExftz9oFBv3ejxPlYc5yq7YiBO8XlTnQN0Sa4R4qhPO3I2MQIDAQAB-----END PUBLIC KEY-----";

function encrypt2(e) {
    var t = RSA.getPublicKey(u);
    return RSA.encrypt(e, t)
}


function encrypt(t, n) {
    var e = RSA.getPublicKey(u);
    return RSA.encrypt(t + "`" + n, e)
}

var e = function(e, t) {
    this.__xhr.setRequestHeader(t, e)
}

function getRtid() {
    for (var t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", n = 32, e = []; n-- > 0;)
        e[n] = t.charAt(Math.random() * t.length);
    return e.join("")
}

function utid() {
    var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        , t = 32
        , i = [];
    for (; t-- > 0;)
        i[t] = e.charAt(Math.random() * e.length);
    return i.join("")
}

console.log(utid());
