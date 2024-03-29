navigator = {};
window = this, window.navigator = navigator;
var n1 = {
    utf8: {
        stringToBytes: function (t) {
            return n1.bin.stringToBytes(unescape(encodeURIComponent(t)))
        },
        bytesToString: function (t) {
            return decodeURIComponent(escape(n.bin.bytesToString(t)))
        }
    },
    bin: {
        stringToBytes: function (t) {
            for (var e = [], n = 0; n < t.length; n++)
                e.push(255 & t.charCodeAt(n));
            return e
        },
        bytesToString: function (t) {
            for (var e = [], n = 0; n < t.length; n++)
                e.push(String.fromCharCode(t[n]));
            return e.join("")
        }
    }
};

var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    , n2 = {
    rotl: function (t, e) {
        return t << e | t >>> 32 - e
    },
    rotr: function (t, e) {
        return t << 32 - e | t >>> e
    },
    endian: function (t) {
        if (t.constructor == Number)
            return 16711935 & n2.rotl(t, 8) | 4278255360 & n2.rotl(t, 24);
        for (var e = 0; e < t.length; e++)
            t[e] = n2.endian(t[e]);
        return t
    },
    randomBytes: function (t) {
        for (var e = []; t > 0; t--)
            e.push(Math.floor(256 * Math.random()));
        return e
    },
    bytesToWords: function (t) {
        for (var e = [], n = 0, r = 0; n < t.length; n++,
            r += 8)
            e[r >>> 5] |= t[n] << 24 - r % 32;
        return e
    },
    wordsToBytes: function (t) {
        for (var e = [], n = 0; n < 32 * t.length; n += 8)
            e.push(t[n >>> 5] >>> 24 - n % 32 & 255);
        return e
    },
    bytesToHex: function (t) {
        for (var e = [], n = 0; n < t.length; n++)
            e.push((t[n] >>> 4).toString(16)),
                e.push((15 & t[n]).toString(16));
        return e.join("")
    },
    hexToBytes: function (t) {
        for (var e = [], n = 0; n < t.length; n += 2)
            e.push(parseInt(t.substr(n, 2), 16));
        return e
    },
    bytesToBase64: function (t) {
        for (var n = [], r = 0; r < t.length; r += 3)
            for (var o = t[r] << 16 | t[r + 1] << 8 | t[r + 2], i = 0; i < 4; i++)
                8 * r + 6 * i <= 8 * t.length ? n.push(e.charAt(o >>> 6 * (3 - i) & 63)) : n.push("=");
        return n.join("")
    },
    base64ToBytes: function (t) {
        t = t.replace(/[^A-Z0-9+\/]/gi, "");
        for (var n = [], r = 0, o = 0; r < t.length; o = ++r % 4)
            0 != o && n.push((e.indexOf(t.charAt(r - 1)) & Math.pow(2, -2 * o + 8) - 1) << 2 * o | e.indexOf(t.charAt(r)) >>> 6 - 2 * o);
        return n
    }
};

r = n1.utf8;
i = n1.bin;
a = function (t, n) {
    t.constructor == String ? t = n && "binary" === n.encoding ? i.stringToBytes(t) : r.stringToBytes(t) : o(t) ? t = Array.prototype.slice.call(t, 0) : Array.isArray(t) || (t = t.toString());
    for (var u = n2.bytesToWords(t), s = 8 * t.length, c = 1732584193, l = -271733879, f = -1732584194, p = 271733878, h = 0; h < u.length; h++)
        u[h] = 16711935 & (u[h] << 8 | u[h] >>> 24) | 4278255360 & (u[h] << 24 | u[h] >>> 8);
    u[s >>> 5] |= 128 << s % 32,
        u[14 + (s + 64 >>> 9 << 4)] = s;
    var d = a._ff
        , v = a._gg
        , y = a._hh
        , g = a._ii;
    for (h = 0; h < u.length; h += 16) {
        var m = c
            , b = l
            , w = f
            , E = p;
        l = g(l = g(l = g(l = g(l = y(l = y(l = y(l = y(l = v(l = v(l = v(l = v(l = d(l = d(l = d(l = d(l, f = d(f, p = d(p, c = d(c, l, f, p, u[h + 0], 7, -680876936), l, f, u[h + 1], 12, -389564586), c, l, u[h + 2], 17, 606105819), p, c, u[h + 3], 22, -1044525330), f = d(f, p = d(p, c = d(c, l, f, p, u[h + 4], 7, -176418897), l, f, u[h + 5], 12, 1200080426), c, l, u[h + 6], 17, -1473231341), p, c, u[h + 7], 22, -45705983), f = d(f, p = d(p, c = d(c, l, f, p, u[h + 8], 7, 1770035416), l, f, u[h + 9], 12, -1958414417), c, l, u[h + 10], 17, -42063), p, c, u[h + 11], 22, -1990404162), f = d(f, p = d(p, c = d(c, l, f, p, u[h + 12], 7, 1804603682), l, f, u[h + 13], 12, -40341101), c, l, u[h + 14], 17, -1502002290), p, c, u[h + 15], 22, 1236535329), f = v(f, p = v(p, c = v(c, l, f, p, u[h + 1], 5, -165796510), l, f, u[h + 6], 9, -1069501632), c, l, u[h + 11], 14, 643717713), p, c, u[h + 0], 20, -373897302), f = v(f, p = v(p, c = v(c, l, f, p, u[h + 5], 5, -701558691), l, f, u[h + 10], 9, 38016083), c, l, u[h + 15], 14, -660478335), p, c, u[h + 4], 20, -405537848), f = v(f, p = v(p, c = v(c, l, f, p, u[h + 9], 5, 568446438), l, f, u[h + 14], 9, -1019803690), c, l, u[h + 3], 14, -187363961), p, c, u[h + 8], 20, 1163531501), f = v(f, p = v(p, c = v(c, l, f, p, u[h + 13], 5, -1444681467), l, f, u[h + 2], 9, -51403784), c, l, u[h + 7], 14, 1735328473), p, c, u[h + 12], 20, -1926607734), f = y(f, p = y(p, c = y(c, l, f, p, u[h + 5], 4, -378558), l, f, u[h + 8], 11, -2022574463), c, l, u[h + 11], 16, 1839030562), p, c, u[h + 14], 23, -35309556), f = y(f, p = y(p, c = y(c, l, f, p, u[h + 1], 4, -1530992060), l, f, u[h + 4], 11, 1272893353), c, l, u[h + 7], 16, -155497632), p, c, u[h + 10], 23, -1094730640), f = y(f, p = y(p, c = y(c, l, f, p, u[h + 13], 4, 681279174), l, f, u[h + 0], 11, -358537222), c, l, u[h + 3], 16, -722521979), p, c, u[h + 6], 23, 76029189), f = y(f, p = y(p, c = y(c, l, f, p, u[h + 9], 4, -640364487), l, f, u[h + 12], 11, -421815835), c, l, u[h + 15], 16, 530742520), p, c, u[h + 2], 23, -995338651), f = g(f, p = g(p, c = g(c, l, f, p, u[h + 0], 6, -198630844), l, f, u[h + 7], 10, 1126891415), c, l, u[h + 14], 15, -1416354905), p, c, u[h + 5], 21, -57434055), f = g(f, p = g(p, c = g(c, l, f, p, u[h + 12], 6, 1700485571), l, f, u[h + 3], 10, -1894986606), c, l, u[h + 10], 15, -1051523), p, c, u[h + 1], 21, -2054922799), f = g(f, p = g(p, c = g(c, l, f, p, u[h + 8], 6, 1873313359), l, f, u[h + 15], 10, -30611744), c, l, u[h + 6], 15, -1560198380), p, c, u[h + 13], 21, 1309151649), f = g(f, p = g(p, c = g(c, l, f, p, u[h + 4], 6, -145523070), l, f, u[h + 11], 10, -1120210379), c, l, u[h + 2], 15, 718787259), p, c, u[h + 9], 21, -343485551),
            c = c + m >>> 0,
            l = l + b >>> 0,
            f = f + w >>> 0,
            p = p + E >>> 0
    }
    return n2.endian([c, l, f, p])
};
a._ff = function (t, e, n, r, o, i, a) {
    var u = t + (e & n | ~e & r) + (o >>> 0) + a;
    return (u << i | u >>> 32 - i) + e
};
a._gg = function (t, e, n, r, o, i, a) {
    var u = t + (e & r | n & ~r) + (o >>> 0) + a;
    return (u << i | u >>> 32 - i) + e
};
a._hh = function (t, e, n, r, o, i, a) {
    var u = t + (e ^ n ^ r) + (o >>> 0) + a;
    return (u << i | u >>> 32 - i) + e
};
a._ii = function (t, e, n, r, o, i, a) {
    var u = t + (n ^ (e | ~r)) + (o >>> 0) + a;
    return (u << i | u >>> 32 - i) + e
};
a._blocksize = 16;
a._digestsize = 16;

function get_signature(t, n) {
    var r = n2.wordsToBytes(a(t, n));
    return n2.bytesToHex(r)
}

// console.log(get_signature("xuzhihai0723"));


var e = "0123456789abcdefghijklmnopqrstuvwxyz";

function n(t) {
    return e.charAt(t)
}

function r(t, e) {
    return t & e
}

function o(t, e) {
    return t | e
}

function i(t, e) {
    return t ^ e
}

function a(t, e) {
    return t & ~e
}

function u(t) {
    if (0 == t)
        return -1;
    var e = 0;
    return 0 == (65535 & t) && (t >>= 16,
        e += 16),
    0 == (255 & t) && (t >>= 8,
        e += 8),
    0 == (15 & t) && (t >>= 4,
        e += 4),
    0 == (3 & t) && (t >>= 2,
        e += 2),
    0 == (1 & t) && ++e,
        e
}

function s(t) {
    for (var e = 0; 0 != t;)
        t &= t - 1,
            ++e;
    return e
}

var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    , l = "=";

function f(t) {
    var e, n, r = "";
    for (e = 0; e + 3 <= t.length; e += 3)
        n = parseInt(t.substring(e, e + 3), 16),
            r += c.charAt(n >> 6) + c.charAt(63 & n);
    for (e + 1 == t.length ? (n = parseInt(t.substring(e, e + 1), 16),
        r += c.charAt(n << 2)) : e + 2 == t.length && (n = parseInt(t.substring(e, e + 2), 16),
        r += c.charAt(n >> 2) + c.charAt((3 & n) << 4)); (3 & r.length) > 0;)
        r += l;
    return r
}

function p(t) {
    var e, r = "", o = 0, i = 0;
    for (e = 0; e < t.length && t.charAt(e) != l; ++e) {
        var a = c.indexOf(t.charAt(e));
        a < 0 || (0 == o ? (r += n(a >> 2),
            i = 3 & a,
            o = 1) : 1 == o ? (r += n(i << 2 | a >> 4),
            i = 15 & a,
            o = 2) : 2 == o ? (r += n(i),
            r += n(a >> 2),
            i = 3 & a,
            o = 3) : (r += n(i << 2 | a >> 4),
            r += n(15 & a),
            o = 0))
    }
    return 1 == o && (r += n(i << 2)),
        r
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var h, d, v = function (t, e) {
        return (v = Object.setPrototypeOf || {
                    __proto__: []
                } instanceof Array && function (t, e) {
                    t.__proto__ = e
                }
                || function (t, e) {
                    for (var n in e)
                        e.hasOwnProperty(n) && (t[n] = e[n])
                }
        )(t, e)
    }, y = {
        decode: function (t) {
            var e;
            if (void 0 === h) {
                var n = "0123456789ABCDEF"
                    , r = " \f\n\r\t \u2028\u2029";
                for (h = {},
                         e = 0; e < 16; ++e)
                    h[n.charAt(e)] = e;
                for (n = n.toLowerCase(),
                         e = 10; e < 16; ++e)
                    h[n.charAt(e)] = e;
                for (e = 0; e < r.length; ++e)
                    h[r.charAt(e)] = -1
            }
            var o = []
                , i = 0
                , a = 0;
            for (e = 0; e < t.length; ++e) {
                var u = t.charAt(e);
                if ("=" == u)
                    break;
                if (-1 != (u = h[u])) {
                    if (void 0 === u)
                        throw new Error("Illegal character at offset " + e);
                    i |= u,
                        ++a >= 2 ? (o[o.length] = i,
                            i = 0,
                            a = 0) : i <<= 4
                }
            }
            if (a)
                throw new Error("Hex encoding incomplete: 4 bits missing");
            return o
        }
    }, g = {
        decode: function (t) {
            var e;
            if (void 0 === d) {
                var n = "= \f\n\r\t \u2028\u2029";
                for (d = Object.create(null),
                         e = 0; e < 64; ++e)
                    d["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e;
                for (e = 0; e < n.length; ++e)
                    d[n.charAt(e)] = -1
            }
            var r = []
                , o = 0
                , i = 0;
            for (e = 0; e < t.length; ++e) {
                var a = t.charAt(e);
                if ("=" == a)
                    break;
                if (-1 != (a = d[a])) {
                    if (void 0 === a)
                        throw new Error("Illegal character at offset " + e);
                    o |= a,
                        ++i >= 4 ? (r[r.length] = o >> 16,
                            r[r.length] = o >> 8 & 255,
                            r[r.length] = 255 & o,
                            o = 0,
                            i = 0) : o <<= 6
                }
            }
            switch (i) {
                case 1:
                    throw new Error("Base64 encoding incomplete: at least 2 bits missing");
                case 2:
                    r[r.length] = o >> 10;
                    break;
                case 3:
                    r[r.length] = o >> 16,
                        r[r.length] = o >> 8 & 255
            }
            return r
        },
        re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
        unarmor: function (t) {
            var e = g.re.exec(t);
            if (e)
                if (e[1])
                    t = e[1];
                else {
                    if (!e[2])
                        throw new Error("RegExp out of sync");
                    t = e[2]
                }
            return g.decode(t)
        }
    }, m = function () {
        function t(t) {
            this.buf = [+t || 0]
        }

        return t.prototype.mulAdd = function (t, e) {
            var n, r, o = this.buf, i = o.length;
            for (n = 0; n < i; ++n)
                (r = o[n] * t + e) < 1e13 ? e = 0 : r -= 1e13 * (e = 0 | r / 1e13),
                    o[n] = r;
            e > 0 && (o[n] = e)
        }
            ,
            t.prototype.sub = function (t) {
                var e, n, r = this.buf, o = r.length;
                for (e = 0; e < o; ++e)
                    (n = r[e] - t) < 0 ? (n += 1e13,
                        t = 1) : t = 0,
                        r[e] = n;
                for (; 0 === r[r.length - 1];)
                    r.pop()
            }
            ,
            t.prototype.toString = function (t) {
                if (10 != (t || 10))
                    throw new Error("only base 10 is supported");
                for (var e = this.buf, n = e[e.length - 1].toString(), r = e.length - 2; r >= 0; --r)
                    n += (1e13 + e[r]).toString().substring(1);
                return n
            }
            ,
            t.prototype.valueOf = function () {
                for (var t = this.buf, e = 0, n = t.length - 1; n >= 0; --n)
                    e = 1e13 * e + t[n];
                return e
            }
            ,
            t.prototype.simplify = function () {
                var t = this.buf;
                return 1 == t.length ? t[0] : this
            }
            ,
            t
    }(), b = "…",
    w = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
    E = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

function _(t, e) {
    return t.length > e && (t = t.substring(0, e) + b),
        t
}

var x, S = function () {
        function t(e, n) {
            this.hexDigits = "0123456789ABCDEF",
                e instanceof t ? (this.enc = e.enc,
                    this.pos = e.pos) : (this.enc = e,
                    this.pos = n)
        }

        return t.prototype.get = function (t) {
            if (void 0 === t && (t = this.pos++),
            t >= this.enc.length)
                throw new Error("Requesting byte offset " + t + " on a stream of length " + this.enc.length);
            return "string" == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
        }
            ,
            t.prototype.hexByte = function (t) {
                return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
            }
            ,
            t.prototype.hexDump = function (t, e, n) {
                for (var r = "", o = t; o < e; ++o)
                    if (r += this.hexByte(this.get(o)),
                    !0 !== n)
                        switch (15 & o) {
                            case 7:
                                r += "  ";
                                break;
                            case 15:
                                r += "\n";
                                break;
                            default:
                                r += " "
                        }
                return r
            }
            ,
            t.prototype.isASCII = function (t, e) {
                for (var n = t; n < e; ++n) {
                    var r = this.get(n);
                    if (r < 32 || r > 176)
                        return !1
                }
                return !0
            }
            ,
            t.prototype.parseStringISO = function (t, e) {
                for (var n = "", r = t; r < e; ++r)
                    n += String.fromCharCode(this.get(r));
                return n
            }
            ,
            t.prototype.parseStringUTF = function (t, e) {
                for (var n = "", r = t; r < e;) {
                    var o = this.get(r++);
                    n += o < 128 ? String.fromCharCode(o) : o > 191 && o < 224 ? String.fromCharCode((31 & o) << 6 | 63 & this.get(r++)) : String.fromCharCode((15 & o) << 12 | (63 & this.get(r++)) << 6 | 63 & this.get(r++))
                }
                return n
            }
            ,
            t.prototype.parseStringBMP = function (t, e) {
                for (var n, r, o = "", i = t; i < e;)
                    n = this.get(i++),
                        r = this.get(i++),
                        o += String.fromCharCode(n << 8 | r);
                return o
            }
            ,
            t.prototype.parseTime = function (t, e, n) {
                var r = this.parseStringISO(t, e)
                    , o = (n ? w : E).exec(r);
                return o ? (n && (o[1] = +o[1],
                    o[1] += +o[1] < 70 ? 2e3 : 1900),
                    r = o[1] + "-" + o[2] + "-" + o[3] + " " + o[4],
                o[5] && (r += ":" + o[5],
                o[6] && (r += ":" + o[6],
                o[7] && (r += "." + o[7]))),
                o[8] && (r += " UTC",
                "Z" != o[8] && (r += o[8],
                o[9] && (r += ":" + o[9]))),
                    r) : "Unrecognized time: " + r
            }
            ,
            t.prototype.parseInteger = function (t, e) {
                for (var n, r = this.get(t), o = r > 127, i = o ? 255 : 0, a = ""; r == i && ++t < e;)
                    r = this.get(t);
                if (0 == (n = e - t))
                    return o ? -1 : 0;
                if (n > 4) {
                    for (a = r,
                             n <<= 3; 0 == (128 & (+a ^ i));)
                        a = +a << 1,
                            --n;
                    a = "(" + n + " bit)\n"
                }
                o && (r -= 256);
                for (var u = new m(r), s = t + 1; s < e; ++s)
                    u.mulAdd(256, this.get(s));
                return a + u.toString()
            }
            ,
            t.prototype.parseBitString = function (t, e, n) {
                for (var r = this.get(t), o = (e - t - 1 << 3) - r, i = "(" + o + " bit)\n", a = "", u = t + 1; u < e; ++u) {
                    for (var s = this.get(u), c = u == e - 1 ? r : 0, l = 7; l >= c; --l)
                        a += s >> l & 1 ? "1" : "0";
                    if (a.length > n)
                        return i + _(a, n)
                }
                return i + a
            }
            ,
            t.prototype.parseOctetString = function (t, e, n) {
                if (this.isASCII(t, e))
                    return _(this.parseStringISO(t, e), n);
                var r = e - t
                    , o = "(" + r + " byte)\n";
                r > (n /= 2) && (e = t + n);
                for (var i = t; i < e; ++i)
                    o += this.hexByte(this.get(i));
                return r > n && (o += b),
                    o
            }
            ,
            t.prototype.parseOID = function (t, e, n) {
                for (var r = "", o = new m, i = 0, a = t; a < e; ++a) {
                    var u = this.get(a);
                    if (o.mulAdd(128, 127 & u),
                        i += 7,
                        !(128 & u)) {
                        if ("" === r)
                            if ((o = o.simplify()) instanceof m)
                                o.sub(80),
                                    r = "2." + o.toString();
                            else {
                                var s = o < 80 ? o < 40 ? 0 : 1 : 2;
                                r = s + "." + (o - 40 * s)
                            }
                        else
                            r += "." + o.toString();
                        if (r.length > n)
                            return _(r, n);
                        o = new m,
                            i = 0
                    }
                }
                return i > 0 && (r += ".incomplete"),
                    r
            }
            ,
            t
    }(), T = function () {
        function t(t, e, n, r, o) {
            if (!(r instanceof O))
                throw new Error("Invalid tag value.");
            this.stream = t,
                this.header = e,
                this.length = n,
                this.tag = r,
                this.sub = o
        }

        return t.prototype.typeName = function () {
            switch (this.tag.tagClass) {
                case 0:
                    switch (this.tag.tagNumber) {
                        case 0:
                            return "EOC";
                        case 1:
                            return "BOOLEAN";
                        case 2:
                            return "INTEGER";
                        case 3:
                            return "BIT_STRING";
                        case 4:
                            return "OCTET_STRING";
                        case 5:
                            return "NULL";
                        case 6:
                            return "OBJECT_IDENTIFIER";
                        case 7:
                            return "ObjectDescriptor";
                        case 8:
                            return "EXTERNAL";
                        case 9:
                            return "REAL";
                        case 10:
                            return "ENUMERATED";
                        case 11:
                            return "EMBEDDED_PDV";
                        case 12:
                            return "UTF8String";
                        case 16:
                            return "SEQUENCE";
                        case 17:
                            return "SET";
                        case 18:
                            return "NumericString";
                        case 19:
                            return "PrintableString";
                        case 20:
                            return "TeletexString";
                        case 21:
                            return "VideotexString";
                        case 22:
                            return "IA5String";
                        case 23:
                            return "UTCTime";
                        case 24:
                            return "GeneralizedTime";
                        case 25:
                            return "GraphicString";
                        case 26:
                            return "VisibleString";
                        case 27:
                            return "GeneralString";
                        case 28:
                            return "UniversalString";
                        case 30:
                            return "BMPString"
                    }
                    return "Universal_" + this.tag.tagNumber.toString();
                case 1:
                    return "Application_" + this.tag.tagNumber.toString();
                case 2:
                    return "[" + this.tag.tagNumber.toString() + "]";
                case 3:
                    return "Private_" + this.tag.tagNumber.toString()
            }
        }
            ,
            t.prototype.content = function (t) {
                if (void 0 === this.tag)
                    return null;
                void 0 === t && (t = 1 / 0);
                var e = this.posContent()
                    , n = Math.abs(this.length);
                if (!this.tag.isUniversal())
                    return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + n, t);
                switch (this.tag.tagNumber) {
                    case 1:
                        return 0 === this.stream.get(e) ? "false" : "true";
                    case 2:
                        return this.stream.parseInteger(e, e + n);
                    case 3:
                        return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + n, t);
                    case 4:
                        return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + n, t);
                    case 6:
                        return this.stream.parseOID(e, e + n, t);
                    case 16:
                    case 17:
                        return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
                    case 12:
                        return _(this.stream.parseStringUTF(e, e + n), t);
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 26:
                        return _(this.stream.parseStringISO(e, e + n), t);
                    case 30:
                        return _(this.stream.parseStringBMP(e, e + n), t);
                    case 23:
                    case 24:
                        return this.stream.parseTime(e, e + n, 23 == this.tag.tagNumber)
                }
                return null
            }
            ,
            t.prototype.toString = function () {
                return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
            }
            ,
            t.prototype.toPrettyString = function (t) {
                void 0 === t && (t = "");
                var e = t + this.typeName() + " @" + this.stream.pos;
                if (this.length >= 0 && (e += "+"),
                    e += this.length,
                    this.tag.tagConstructed ? e += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (e += " (encapsulates)"),
                    e += "\n",
                null !== this.sub) {
                    t += "  ";
                    for (var n = 0, r = this.sub.length; n < r; ++n)
                        e += this.sub[n].toPrettyString(t)
                }
                return e
            }
            ,
            t.prototype.posStart = function () {
                return this.stream.pos
            }
            ,
            t.prototype.posContent = function () {
                return this.stream.pos + this.header
            }
            ,
            t.prototype.posEnd = function () {
                return this.stream.pos + this.header + Math.abs(this.length)
            }
            ,
            t.prototype.toHexString = function () {
                return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
            }
            ,
            t.decodeLength = function (t) {
                var e = t.get()
                    , n = 127 & e;
                if (n == e)
                    return n;
                if (n > 6)
                    throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
                if (0 === n)
                    return null;
                e = 0;
                for (var r = 0; r < n; ++r)
                    e = 256 * e + t.get();
                return e
            }
            ,
            t.prototype.getHexStringValue = function () {
                var t = this.toHexString()
                    , e = 2 * this.header
                    , n = 2 * this.length;
                return t.substr(e, n)
            }
            ,
            t.decode = function (e) {
                var n;
                n = e instanceof S ? e : new S(e, 0);
                var r = new S(n)
                    , o = new O(n)
                    , i = t.decodeLength(n)
                    , a = n.pos
                    , u = a - r.pos
                    , s = null
                    , c = function () {
                    var e = [];
                    if (null !== i) {
                        for (var r = a + i; n.pos < r;)
                            e[e.length] = t.decode(n);
                        if (n.pos != r)
                            throw new Error("Content size is not correct for container starting at offset " + a)
                    } else
                        try {
                            for (; ;) {
                                var o = t.decode(n);
                                if (o.tag.isEOC())
                                    break;
                                e[e.length] = o
                            }
                            i = a - n.pos
                        } catch (t) {
                            throw new Error("Exception while decoding undefined length content: " + t)
                        }
                    return e
                };
                if (o.tagConstructed)
                    s = c();
                else if (o.isUniversal() && (3 == o.tagNumber || 4 == o.tagNumber))
                    try {
                        if (3 == o.tagNumber && 0 != n.get())
                            throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                        s = c();
                        for (var l = 0; l < s.length; ++l)
                            if (s[l].tag.isEOC())
                                throw new Error("EOC is not supposed to be actual content.")
                    } catch (t) {
                        s = null
                    }
                if (null === s) {
                    if (null === i)
                        throw new Error("We can't skip over an invalid tag with undefined length at offset " + a);
                    n.pos = a + Math.abs(i)
                }
                return new t(r, u, i, o, s)
            }
            ,
            t
    }(), O = function () {
        function t(t) {
            var e = t.get();
            if (this.tagClass = e >> 6,
                this.tagConstructed = 0 != (32 & e),
                this.tagNumber = 31 & e,
            31 == this.tagNumber) {
                var n = new m;
                do {
                    e = t.get(),
                        n.mulAdd(128, 127 & e)
                } while (128 & e);
                this.tagNumber = n.simplify()
            }
        }

        return t.prototype.isUniversal = function () {
            return 0 === this.tagClass
        }
            ,
            t.prototype.isEOC = function () {
                return 0 === this.tagClass && 0 === this.tagNumber
            }
            ,
            t
    }(),
    C = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
    P = (1 << 26) / C[C.length - 1], k = function () {
        function t(t, e, n) {
            null != t && ("number" == typeof t ? this.fromNumber(t, e, n) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
        }

        return t.prototype.toString = function (t) {
            if (this.s < 0)
                return "-" + this.negate().toString(t);
            var e;
            if (16 == t)
                e = 4;
            else if (8 == t)
                e = 3;
            else if (2 == t)
                e = 1;
            else if (32 == t)
                e = 5;
            else {
                if (4 != t)
                    return this.toRadix(t);
                e = 2
            }
            var r, o = (1 << e) - 1, i = !1, a = "", u = this.t, s = this.DB - u * this.DB % e;
            if (u-- > 0)
                for (s < this.DB && (r = this[u] >> s) > 0 && (i = !0,
                    a = n(r)); u >= 0;)
                    s < e ? (r = (this[u] & (1 << s) - 1) << e - s,
                        r |= this[--u] >> (s += this.DB - e)) : (r = this[u] >> (s -= e) & o,
                    s <= 0 && (s += this.DB,
                        --u)),
                    r > 0 && (i = !0),
                    i && (a += n(r));
            return i ? a : "0"
        }
            ,
            t.prototype.negate = function () {
                var e = D();
                return t.ZERO.subTo(this, e),
                    e
            }
            ,
            t.prototype.abs = function () {
                return this.s < 0 ? this.negate() : this
            }
            ,
            t.prototype.compareTo = function (t) {
                var e = this.s - t.s;
                if (0 != e)
                    return e;
                var n = this.t;
                if (0 != (e = n - t.t))
                    return this.s < 0 ? -e : e;
                for (; --n >= 0;)
                    if (0 != (e = this[n] - t[n]))
                        return e;
                return 0
            }
            ,
            t.prototype.bitLength = function () {
                return this.t <= 0 ? 0 : this.DB * (this.t - 1) + F(this[this.t - 1] ^ this.s & this.DM)
            }
            ,
            t.prototype.mod = function (e) {
                var n = D();
                return this.abs().divRemTo(e, null, n),
                this.s < 0 && n.compareTo(t.ZERO) > 0 && e.subTo(n, n),
                    n
            }
            ,
            t.prototype.modPowInt = function (t, e) {
                var n;
                return n = t < 256 || e.isEven() ? new A(e) : new R(e),
                    this.exp(t, n)
            }
            ,
            t.prototype.clone = function () {
                var t = D();
                return this.copyTo(t),
                    t
            }
            ,
            t.prototype.intValue = function () {
                if (this.s < 0) {
                    if (1 == this.t)
                        return this[0] - this.DV;
                    if (0 == this.t)
                        return -1
                } else {
                    if (1 == this.t)
                        return this[0];
                    if (0 == this.t)
                        return 0
                }
                return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
            }
            ,
            t.prototype.byteValue = function () {
                return 0 == this.t ? this.s : this[0] << 24 >> 24
            }
            ,
            t.prototype.shortValue = function () {
                return 0 == this.t ? this.s : this[0] << 16 >> 16
            }
            ,
            t.prototype.signum = function () {
                return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
            }
            ,
            t.prototype.toByteArray = function () {
                var t = this.t
                    , e = [];
                e[0] = this.s;
                var n, r = this.DB - t * this.DB % 8, o = 0;
                if (t-- > 0)
                    for (r < this.DB && (n = this[t] >> r) != (this.s & this.DM) >> r && (e[o++] = n | this.s << this.DB - r); t >= 0;)
                        r < 8 ? (n = (this[t] & (1 << r) - 1) << 8 - r,
                            n |= this[--t] >> (r += this.DB - 8)) : (n = this[t] >> (r -= 8) & 255,
                        r <= 0 && (r += this.DB,
                            --t)),
                        0 != (128 & n) && (n |= -256),
                        0 == o && (128 & this.s) != (128 & n) && ++o,
                        (o > 0 || n != this.s) && (e[o++] = n);
                return e
            }
            ,
            t.prototype.equals = function (t) {
                return 0 == this.compareTo(t)
            }
            ,
            t.prototype.min = function (t) {
                return this.compareTo(t) < 0 ? this : t
            }
            ,
            t.prototype.max = function (t) {
                return this.compareTo(t) > 0 ? this : t
            }
            ,
            t.prototype.and = function (t) {
                var e = D();
                return this.bitwiseTo(t, r, e),
                    e
            }
            ,
            t.prototype.or = function (t) {
                var e = D();
                return this.bitwiseTo(t, o, e),
                    e
            }
            ,
            t.prototype.xor = function (t) {
                var e = D();
                return this.bitwiseTo(t, i, e),
                    e
            }
            ,
            t.prototype.andNot = function (t) {
                var e = D();
                return this.bitwiseTo(t, a, e),
                    e
            }
            ,
            t.prototype.not = function () {
                for (var t = D(), e = 0; e < this.t; ++e)
                    t[e] = this.DM & ~this[e];
                return t.t = this.t,
                    t.s = ~this.s,
                    t
            }
            ,
            t.prototype.shiftLeft = function (t) {
                var e = D();
                return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
                    e
            }
            ,
            t.prototype.shiftRight = function (t) {
                var e = D();
                return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
                    e
            }
            ,
            t.prototype.getLowestSetBit = function () {
                for (var t = 0; t < this.t; ++t)
                    if (0 != this[t])
                        return t * this.DB + u(this[t]);
                return this.s < 0 ? this.t * this.DB : -1
            }
            ,
            t.prototype.bitCount = function () {
                for (var t = 0, e = this.s & this.DM, n = 0; n < this.t; ++n)
                    t += s(this[n] ^ e);
                return t
            }
            ,
            t.prototype.testBit = function (t) {
                var e = Math.floor(t / this.DB);
                return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
            }
            ,
            t.prototype.setBit = function (t) {
                return this.changeBit(t, o)
            }
            ,
            t.prototype.clearBit = function (t) {
                return this.changeBit(t, a)
            }
            ,
            t.prototype.flipBit = function (t) {
                return this.changeBit(t, i)
            }
            ,
            t.prototype.add = function (t) {
                var e = D();
                return this.addTo(t, e),
                    e
            }
            ,
            t.prototype.subtract = function (t) {
                var e = D();
                return this.subTo(t, e),
                    e
            }
            ,
            t.prototype.multiply = function (t) {
                var e = D();
                return this.multiplyTo(t, e),
                    e
            }
            ,
            t.prototype.divide = function (t) {
                var e = D();
                return this.divRemTo(t, e, null),
                    e
            }
            ,
            t.prototype.remainder = function (t) {
                var e = D();
                return this.divRemTo(t, null, e),
                    e
            }
            ,
            t.prototype.divideAndRemainder = function (t) {
                var e = D()
                    , n = D();
                return this.divRemTo(t, e, n),
                    [e, n]
            }
            ,
            t.prototype.modPow = function (t, e) {
                var n, r, o = t.bitLength(), i = H(1);
                if (o <= 0)
                    return i;
                n = o < 18 ? 1 : o < 48 ? 3 : o < 144 ? 4 : o < 768 ? 5 : 6,
                    r = o < 8 ? new A(e) : e.isEven() ? new M(e) : new R(e);
                var a = []
                    , u = 3
                    , s = n - 1
                    , c = (1 << n) - 1;
                if (a[1] = r.convert(this),
                n > 1) {
                    var l = D();
                    for (r.sqrTo(a[1], l); u <= c;)
                        a[u] = D(),
                            r.mulTo(l, a[u - 2], a[u]),
                            u += 2
                }
                var f, p, h = t.t - 1, d = !0, v = D();
                for (o = F(t[h]) - 1; h >= 0;) {
                    for (o >= s ? f = t[h] >> o - s & c : (f = (t[h] & (1 << o + 1) - 1) << s - o,
                    h > 0 && (f |= t[h - 1] >> this.DB + o - s)),
                             u = n; 0 == (1 & f);)
                        f >>= 1,
                            --u;
                    if ((o -= u) < 0 && (o += this.DB,
                        --h),
                        d)
                        a[f].copyTo(i),
                            d = !1;
                    else {
                        for (; u > 1;)
                            r.sqrTo(i, v),
                                r.sqrTo(v, i),
                                u -= 2;
                        u > 0 ? r.sqrTo(i, v) : (p = i,
                            i = v,
                            v = p),
                            r.mulTo(v, a[f], i)
                    }
                    for (; h >= 0 && 0 == (t[h] & 1 << o);)
                        r.sqrTo(i, v),
                            p = i,
                            i = v,
                            v = p,
                        --o < 0 && (o = this.DB - 1,
                            --h)
                }
                return r.revert(i)
            }
            ,
            t.prototype.modInverse = function (e) {
                var n = e.isEven();
                if (this.isEven() && n || 0 == e.signum())
                    return t.ZERO;
                for (var r = e.clone(), o = this.clone(), i = H(1), a = H(0), u = H(0), s = H(1); 0 != r.signum();) {
                    for (; r.isEven();)
                        r.rShiftTo(1, r),
                            n ? (i.isEven() && a.isEven() || (i.addTo(this, i),
                                a.subTo(e, a)),
                                i.rShiftTo(1, i)) : a.isEven() || a.subTo(e, a),
                            a.rShiftTo(1, a);
                    for (; o.isEven();)
                        o.rShiftTo(1, o),
                            n ? (u.isEven() && s.isEven() || (u.addTo(this, u),
                                s.subTo(e, s)),
                                u.rShiftTo(1, u)) : s.isEven() || s.subTo(e, s),
                            s.rShiftTo(1, s);
                    r.compareTo(o) >= 0 ? (r.subTo(o, r),
                    n && i.subTo(u, i),
                        a.subTo(s, a)) : (o.subTo(r, o),
                    n && u.subTo(i, u),
                        s.subTo(a, s))
                }
                return 0 != o.compareTo(t.ONE) ? t.ZERO : s.compareTo(e) >= 0 ? s.subtract(e) : s.signum() < 0 ? (s.addTo(e, s),
                    s.signum() < 0 ? s.add(e) : s) : s
            }
            ,
            t.prototype.pow = function (t) {
                return this.exp(t, new j)
            }
            ,
            t.prototype.gcd = function (t) {
                var e = this.s < 0 ? this.negate() : this.clone()
                    , n = t.s < 0 ? t.negate() : t.clone();
                if (e.compareTo(n) < 0) {
                    var r = e;
                    e = n,
                        n = r
                }
                var o = e.getLowestSetBit()
                    , i = n.getLowestSetBit();
                if (i < 0)
                    return e;
                for (o < i && (i = o),
                     i > 0 && (e.rShiftTo(i, e),
                         n.rShiftTo(i, n)); e.signum() > 0;)
                    (o = e.getLowestSetBit()) > 0 && e.rShiftTo(o, e),
                    (o = n.getLowestSetBit()) > 0 && n.rShiftTo(o, n),
                        e.compareTo(n) >= 0 ? (e.subTo(n, e),
                            e.rShiftTo(1, e)) : (n.subTo(e, n),
                            n.rShiftTo(1, n));
                return i > 0 && n.lShiftTo(i, n),
                    n
            }
            ,
            t.prototype.isProbablePrime = function (t) {
                var e, n = this.abs();
                if (1 == n.t && n[0] <= C[C.length - 1]) {
                    for (e = 0; e < C.length; ++e)
                        if (n[0] == C[e])
                            return !0;
                    return !1
                }
                if (n.isEven())
                    return !1;
                for (e = 1; e < C.length;) {
                    for (var r = C[e], o = e + 1; o < C.length && r < P;)
                        r *= C[o++];
                    for (r = n.modInt(r); e < o;)
                        if (r % C[e++] == 0)
                            return !1
                }
                return n.millerRabin(t)
            }
            ,
            t.prototype.copyTo = function (t) {
                for (var e = this.t - 1; e >= 0; --e)
                    t[e] = this[e];
                t.t = this.t,
                    t.s = this.s
            }
            ,
            t.prototype.fromInt = function (t) {
                this.t = 1,
                    this.s = t < 0 ? -1 : 0,
                    t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
            }
            ,
            t.prototype.fromString = function (e, n) {
                var r;
                if (16 == n)
                    r = 4;
                else if (8 == n)
                    r = 3;
                else if (256 == n)
                    r = 8;
                else if (2 == n)
                    r = 1;
                else if (32 == n)
                    r = 5;
                else {
                    if (4 != n)
                        return void this.fromRadix(e, n);
                    r = 2
                }
                this.t = 0,
                    this.s = 0;
                for (var o = e.length, i = !1, a = 0; --o >= 0;) {
                    var u = 8 == r ? 255 & +e[o] : U(e, o);
                    u < 0 ? "-" == e.charAt(o) && (i = !0) : (i = !1,
                        0 == a ? this[this.t++] = u : a + r > this.DB ? (this[this.t - 1] |= (u & (1 << this.DB - a) - 1) << a,
                            this[this.t++] = u >> this.DB - a) : this[this.t - 1] |= u << a,
                    (a += r) >= this.DB && (a -= this.DB))
                }
                8 == r && 0 != (128 & +e[0]) && (this.s = -1,
                a > 0 && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)),
                    this.clamp(),
                i && t.ZERO.subTo(this, this)
            }
            ,
            t.prototype.clamp = function () {
                for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;)
                    --this.t
            }
            ,
            t.prototype.dlShiftTo = function (t, e) {
                var n;
                for (n = this.t - 1; n >= 0; --n)
                    e[n + t] = this[n];
                for (n = t - 1; n >= 0; --n)
                    e[n] = 0;
                e.t = this.t + t,
                    e.s = this.s
            }
            ,
            t.prototype.drShiftTo = function (t, e) {
                for (var n = t; n < this.t; ++n)
                    e[n - t] = this[n];
                e.t = Math.max(this.t - t, 0),
                    e.s = this.s
            }
            ,
            t.prototype.lShiftTo = function (t, e) {
                for (var n = t % this.DB, r = this.DB - n, o = (1 << r) - 1, i = Math.floor(t / this.DB), a = this.s << n & this.DM, u = this.t - 1; u >= 0; --u)
                    e[u + i + 1] = this[u] >> r | a,
                        a = (this[u] & o) << n;
                for (var u = i - 1; u >= 0; --u)
                    e[u] = 0;
                e[i] = a,
                    e.t = this.t + i + 1,
                    e.s = this.s,
                    e.clamp()
            }
            ,
            t.prototype.rShiftTo = function (t, e) {
                e.s = this.s;
                var n = Math.floor(t / this.DB);
                if (n >= this.t)
                    e.t = 0;
                else {
                    var r = t % this.DB
                        , o = this.DB - r
                        , i = (1 << r) - 1;
                    e[0] = this[n] >> r;
                    for (var a = n + 1; a < this.t; ++a)
                        e[a - n - 1] |= (this[a] & i) << o,
                            e[a - n] = this[a] >> r;
                    r > 0 && (e[this.t - n - 1] |= (this.s & i) << o),
                        e.t = this.t - n,
                        e.clamp()
                }
            }
            ,
            t.prototype.subTo = function (t, e) {
                for (var n = 0, r = 0, o = Math.min(t.t, this.t); n < o;)
                    r += this[n] - t[n],
                        e[n++] = r & this.DM,
                        r >>= this.DB;
                if (t.t < this.t) {
                    for (r -= t.s; n < this.t;)
                        r += this[n],
                            e[n++] = r & this.DM,
                            r >>= this.DB;
                    r += this.s
                } else {
                    for (r += this.s; n < t.t;)
                        r -= t[n],
                            e[n++] = r & this.DM,
                            r >>= this.DB;
                    r -= t.s
                }
                e.s = r < 0 ? -1 : 0,
                    r < -1 ? e[n++] = this.DV + r : r > 0 && (e[n++] = r),
                    e.t = n,
                    e.clamp()
            }
            ,
            t.prototype.multiplyTo = function (e, n) {
                var r = this.abs()
                    , o = e.abs()
                    , i = r.t;
                for (n.t = i + o.t; --i >= 0;)
                    n[i] = 0;
                for (i = 0; i < o.t; ++i)
                    n[i + r.t] = r.am(0, o[i], n, i, 0, r.t);
                n.s = 0,
                    n.clamp(),
                this.s != e.s && t.ZERO.subTo(n, n)
            }
            ,
            t.prototype.squareTo = function (t) {
                for (var e = this.abs(), n = t.t = 2 * e.t; --n >= 0;)
                    t[n] = 0;
                for (n = 0; n < e.t - 1; ++n) {
                    var r = e.am(n, e[n], t, 2 * n, 0, 1);
                    (t[n + e.t] += e.am(n + 1, 2 * e[n], t, 2 * n + 1, r, e.t - n - 1)) >= e.DV && (t[n + e.t] -= e.DV,
                        t[n + e.t + 1] = 1)
                }
                t.t > 0 && (t[t.t - 1] += e.am(n, e[n], t, 2 * n, 0, 1)),
                    t.s = 0,
                    t.clamp()
            }
            ,
            t.prototype.divRemTo = function (e, n, r) {
                var o = e.abs();
                if (!(o.t <= 0)) {
                    var i = this.abs();
                    if (i.t < o.t)
                        return null != n && n.fromInt(0),
                            void (null != r && this.copyTo(r));
                    null == r && (r = D());
                    var a = D()
                        , u = this.s
                        , s = e.s
                        , c = this.DB - F(o[o.t - 1]);
                    c > 0 ? (o.lShiftTo(c, a),
                        i.lShiftTo(c, r)) : (o.copyTo(a),
                        i.copyTo(r));
                    var l = a.t
                        , f = a[l - 1];
                    if (0 != f) {
                        var p = f * (1 << this.F1) + (l > 1 ? a[l - 2] >> this.F2 : 0)
                            , h = this.FV / p
                            , d = (1 << this.F1) / p
                            , v = 1 << this.F2
                            , y = r.t
                            , g = y - l
                            , m = null == n ? D() : n;
                        for (a.dlShiftTo(g, m),
                             r.compareTo(m) >= 0 && (r[r.t++] = 1,
                                 r.subTo(m, r)),
                                 t.ONE.dlShiftTo(l, m),
                                 m.subTo(a, a); a.t < l;)
                            a[a.t++] = 0;
                        for (; --g >= 0;) {
                            var b = r[--y] == f ? this.DM : Math.floor(r[y] * h + (r[y - 1] + v) * d);
                            if ((r[y] += a.am(0, b, r, g, 0, l)) < b)
                                for (a.dlShiftTo(g, m),
                                         r.subTo(m, r); r[y] < --b;)
                                    r.subTo(m, r)
                        }
                        null != n && (r.drShiftTo(l, n),
                        u != s && t.ZERO.subTo(n, n)),
                            r.t = l,
                            r.clamp(),
                        c > 0 && r.rShiftTo(c, r),
                        u < 0 && t.ZERO.subTo(r, r)
                    }
                }
            }
            ,
            t.prototype.invDigit = function () {
                if (this.t < 1)
                    return 0;
                var t = this[0];
                if (0 == (1 & t))
                    return 0;
                var e = 3 & t;
                return (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) > 0 ? this.DV - e : -e
            }
            ,
            t.prototype.isEven = function () {
                return 0 == (this.t > 0 ? 1 & this[0] : this.s)
            }
            ,
            t.prototype.exp = function (e, n) {
                if (e > 4294967295 || e < 1)
                    return t.ONE;
                var r = D()
                    , o = D()
                    , i = n.convert(this)
                    , a = F(e) - 1;
                for (i.copyTo(r); --a >= 0;)
                    if (n.sqrTo(r, o),
                    (e & 1 << a) > 0)
                        n.mulTo(o, i, r);
                    else {
                        var u = r;
                        r = o,
                            o = u
                    }
                return n.revert(r)
            }
            ,
            t.prototype.chunkSize = function (t) {
                return Math.floor(Math.LN2 * this.DB / Math.log(t))
            }
            ,
            t.prototype.toRadix = function (t) {
                if (null == t && (t = 10),
                0 == this.signum() || t < 2 || t > 36)
                    return "0";
                var e = this.chunkSize(t)
                    , n = Math.pow(t, e)
                    , r = H(n)
                    , o = D()
                    , i = D()
                    , a = "";
                for (this.divRemTo(r, o, i); o.signum() > 0;)
                    a = (n + i.intValue()).toString(t).substr(1) + a,
                        o.divRemTo(r, o, i);
                return i.intValue().toString(t) + a
            }
            ,
            t.prototype.fromRadix = function (e, n) {
                this.fromInt(0),
                null == n && (n = 10);
                for (var r = this.chunkSize(n), o = Math.pow(n, r), i = !1, a = 0, u = 0, s = 0; s < e.length; ++s) {
                    var c = U(e, s);
                    c < 0 ? "-" == e.charAt(s) && 0 == this.signum() && (i = !0) : (u = n * u + c,
                    ++a >= r && (this.dMultiply(o),
                        this.dAddOffset(u, 0),
                        a = 0,
                        u = 0))
                }
                a > 0 && (this.dMultiply(Math.pow(n, a)),
                    this.dAddOffset(u, 0)),
                i && t.ZERO.subTo(this, this)
            }
            ,
            t.prototype.fromNumber = function (e, n, r) {
                if ("number" == typeof n)
                    if (e < 2)
                        this.fromInt(1);
                    else
                        for (this.fromNumber(e, r),
                             this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), o, this),
                             this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(n);)
                            this.dAddOffset(2, 0),
                            this.bitLength() > e && this.subTo(t.ONE.shiftLeft(e - 1), this);
                else {
                    var i = []
                        , a = 7 & e;
                    i.length = 1 + (e >> 3),
                        n.nextBytes(i),
                        a > 0 ? i[0] &= (1 << a) - 1 : i[0] = 0,
                        this.fromString(i, 256)
                }
            }
            ,
            t.prototype.bitwiseTo = function (t, e, n) {
                var r, o, i = Math.min(t.t, this.t);
                for (r = 0; r < i; ++r)
                    n[r] = e(this[r], t[r]);
                if (t.t < this.t) {
                    for (o = t.s & this.DM,
                             r = i; r < this.t; ++r)
                        n[r] = e(this[r], o);
                    n.t = this.t
                } else {
                    for (o = this.s & this.DM,
                             r = i; r < t.t; ++r)
                        n[r] = e(o, t[r]);
                    n.t = t.t
                }
                n.s = e(this.s, t.s),
                    n.clamp()
            }
            ,
            t.prototype.changeBit = function (e, n) {
                var r = t.ONE.shiftLeft(e);
                return this.bitwiseTo(r, n, r),
                    r
            }
            ,
            t.prototype.addTo = function (t, e) {
                for (var n = 0, r = 0, o = Math.min(t.t, this.t); n < o;)
                    r += this[n] + t[n],
                        e[n++] = r & this.DM,
                        r >>= this.DB;
                if (t.t < this.t) {
                    for (r += t.s; n < this.t;)
                        r += this[n],
                            e[n++] = r & this.DM,
                            r >>= this.DB;
                    r += this.s
                } else {
                    for (r += this.s; n < t.t;)
                        r += t[n],
                            e[n++] = r & this.DM,
                            r >>= this.DB;
                    r += t.s
                }
                e.s = r < 0 ? -1 : 0,
                    r > 0 ? e[n++] = r : r < -1 && (e[n++] = this.DV + r),
                    e.t = n,
                    e.clamp()
            }
            ,
            t.prototype.dMultiply = function (t) {
                this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
                    ++this.t,
                    this.clamp()
            }
            ,
            t.prototype.dAddOffset = function (t, e) {
                if (0 != t) {
                    for (; this.t <= e;)
                        this[this.t++] = 0;
                    for (this[e] += t; this[e] >= this.DV;)
                        this[e] -= this.DV,
                        ++e >= this.t && (this[this.t++] = 0),
                            ++this[e]
                }
            }
            ,
            t.prototype.multiplyLowerTo = function (t, e, n) {
                var r = Math.min(this.t + t.t, e);
                for (n.s = 0,
                         n.t = r; r > 0;)
                    n[--r] = 0;
                for (var o = n.t - this.t; r < o; ++r)
                    n[r + this.t] = this.am(0, t[r], n, r, 0, this.t);
                for (var o = Math.min(t.t, e); r < o; ++r)
                    this.am(0, t[r], n, r, 0, e - r);
                n.clamp()
            }
            ,
            t.prototype.multiplyUpperTo = function (t, e, n) {
                --e;
                var r = n.t = this.t + t.t - e;
                for (n.s = 0; --r >= 0;)
                    n[r] = 0;
                for (r = Math.max(e - this.t, 0); r < t.t; ++r)
                    n[this.t + r - e] = this.am(e - r, t[r], n, 0, 0, this.t + r - e);
                n.clamp(),
                    n.drShiftTo(1, n)
            }
            ,
            t.prototype.modInt = function (t) {
                if (t <= 0)
                    return 0;
                var e = this.DV % t
                    , n = this.s < 0 ? t - 1 : 0;
                if (this.t > 0)
                    if (0 == e)
                        n = this[0] % t;
                    else
                        for (var r = this.t - 1; r >= 0; --r)
                            n = (e * n + this[r]) % t;
                return n
            }
            ,
            t.prototype.millerRabin = function (e) {
                var n = this.subtract(t.ONE)
                    , r = n.getLowestSetBit();
                if (r <= 0)
                    return !1;
                var o = n.shiftRight(r);
                (e = e + 1 >> 1) > C.length && (e = C.length);
                for (var i = D(), a = 0; a < e; ++a) {
                    i.fromInt(C[Math.floor(Math.random() * C.length)]);
                    var u = i.modPow(o, this);
                    if (0 != u.compareTo(t.ONE) && 0 != u.compareTo(n)) {
                        for (var s = 1; s++ < r && 0 != u.compareTo(n);)
                            if (0 == (u = u.modPowInt(2, this)).compareTo(t.ONE))
                                return !1;
                        if (0 != u.compareTo(n))
                            return !1
                    }
                }
                return !0
            }
            ,
            t.prototype.square = function () {
                var t = D();
                return this.squareTo(t),
                    t
            }
            ,
            t.prototype.gcda = function (t, e) {
                var n = this.s < 0 ? this.negate() : this.clone()
                    , r = t.s < 0 ? t.negate() : t.clone();
                if (n.compareTo(r) < 0) {
                    var o = n;
                    n = r,
                        r = o
                }
                var i = n.getLowestSetBit()
                    , a = r.getLowestSetBit();
                if (a < 0)
                    e(n);
                else {
                    i < a && (a = i),
                    a > 0 && (n.rShiftTo(a, n),
                        r.rShiftTo(a, r));
                    var u = function () {
                        (i = n.getLowestSetBit()) > 0 && n.rShiftTo(i, n),
                        (i = r.getLowestSetBit()) > 0 && r.rShiftTo(i, r),
                            n.compareTo(r) >= 0 ? (n.subTo(r, n),
                                n.rShiftTo(1, n)) : (r.subTo(n, r),
                                r.rShiftTo(1, r)),
                            n.signum() > 0 ? setTimeout(u, 0) : (a > 0 && r.lShiftTo(a, r),
                                setTimeout(function () {
                                    e(r)
                                }, 0))
                    };
                    setTimeout(u, 10)
                }
            }
            ,
            t.prototype.fromNumberAsync = function (e, n, r, i) {
                if ("number" == typeof n)
                    if (e < 2)
                        this.fromInt(1);
                    else {
                        this.fromNumber(e, r),
                        this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), o, this),
                        this.isEven() && this.dAddOffset(1, 0);
                        var a = this
                            , u = function () {
                            a.dAddOffset(2, 0),
                            a.bitLength() > e && a.subTo(t.ONE.shiftLeft(e - 1), a),
                                a.isProbablePrime(n) ? setTimeout(function () {
                                    i()
                                }, 0) : setTimeout(u, 0)
                        };
                        setTimeout(u, 0)
                    }
                else {
                    var s = []
                        , c = 7 & e;
                    s.length = 1 + (e >> 3),
                        n.nextBytes(s),
                        c > 0 ? s[0] &= (1 << c) - 1 : s[0] = 0,
                        this.fromString(s, 256)
                }
            }
            ,
            t
    }(), j = function () {
        function t() {
        }

        return t.prototype.convert = function (t) {
            return t
        }
            ,
            t.prototype.revert = function (t) {
                return t
            }
            ,
            t.prototype.mulTo = function (t, e, n) {
                t.multiplyTo(e, n)
            }
            ,
            t.prototype.sqrTo = function (t, e) {
                t.squareTo(e)
            }
            ,
            t
    }(), A = function () {
        function t(t) {
            this.m = t
        }

        return t.prototype.convert = function (t) {
            return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
        }
            ,
            t.prototype.revert = function (t) {
                return t
            }
            ,
            t.prototype.reduce = function (t) {
                t.divRemTo(this.m, null, t)
            }
            ,
            t.prototype.mulTo = function (t, e, n) {
                t.multiplyTo(e, n),
                    this.reduce(n)
            }
            ,
            t.prototype.sqrTo = function (t, e) {
                t.squareTo(e),
                    this.reduce(e)
            }
            ,
            t
    }(), R = function () {
        function t(t) {
            this.m = t,
                this.mp = t.invDigit(),
                this.mpl = 32767 & this.mp,
                this.mph = this.mp >> 15,
                this.um = (1 << t.DB - 15) - 1,
                this.mt2 = 2 * t.t
        }

        return t.prototype.convert = function (t) {
            var e = D();
            return t.abs().dlShiftTo(this.m.t, e),
                e.divRemTo(this.m, null, e),
            t.s < 0 && e.compareTo(k.ZERO) > 0 && this.m.subTo(e, e),
                e
        }
            ,
            t.prototype.revert = function (t) {
                var e = D();
                return t.copyTo(e),
                    this.reduce(e),
                    e
            }
            ,
            t.prototype.reduce = function (t) {
                for (; t.t <= this.mt2;)
                    t[t.t++] = 0;
                for (var e = 0; e < this.m.t; ++e) {
                    var n = 32767 & t[e]
                        , r = n * this.mpl + ((n * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                    for (n = e + this.m.t,
                             t[n] += this.m.am(0, r, t, e, 0, this.m.t); t[n] >= t.DV;)
                        t[n] -= t.DV,
                            t[++n]++
                }
                t.clamp(),
                    t.drShiftTo(this.m.t, t),
                t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
            }
            ,
            t.prototype.mulTo = function (t, e, n) {
                t.multiplyTo(e, n),
                    this.reduce(n)
            }
            ,
            t.prototype.sqrTo = function (t, e) {
                t.squareTo(e),
                    this.reduce(e)
            }
            ,
            t
    }(), M = function () {
        function t(t) {
            this.m = t,
                this.r2 = D(),
                this.q3 = D(),
                k.ONE.dlShiftTo(2 * t.t, this.r2),
                this.mu = this.r2.divide(t)
        }

        return t.prototype.convert = function (t) {
            if (t.s < 0 || t.t > 2 * this.m.t)
                return t.mod(this.m);
            if (t.compareTo(this.m) < 0)
                return t;
            var e = D();
            return t.copyTo(e),
                this.reduce(e),
                e
        }
            ,
            t.prototype.revert = function (t) {
                return t
            }
            ,
            t.prototype.reduce = function (t) {
                for (t.drShiftTo(this.m.t - 1, this.r2),
                     t.t > this.m.t + 1 && (t.t = this.m.t + 1,
                         t.clamp()),
                         this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
                         this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;)
                    t.dAddOffset(1, this.m.t + 1);
                for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0;)
                    t.subTo(this.m, t)
            }
            ,
            t.prototype.mulTo = function (t, e, n) {
                t.multiplyTo(e, n),
                    this.reduce(n)
            }
            ,
            t.prototype.sqrTo = function (t, e) {
                t.squareTo(e),
                    this.reduce(e)
            }
            ,
            t
    }();

function D() {
    return new k(null)
}

function N(t, e) {
    return new k(t, e)
}

"Microsoft Internet Explorer" == navigator.appName ? (k.prototype.am = function (t, e, n, r, o, i) {
    for (var a = 32767 & e, u = e >> 15; --i >= 0;) {
        var s = 32767 & this[t]
            , c = this[t++] >> 15
            , l = u * s + c * a;
        s = a * s + ((32767 & l) << 15) + n[r] + (1073741823 & o),
            o = (s >>> 30) + (l >>> 15) + u * c + (o >>> 30),
            n[r++] = 1073741823 & s
    }
    return o
}
    ,
    x = 30) : "Netscape" != navigator.appName ? (k.prototype.am = function (t, e, n, r, o, i) {
    for (; --i >= 0;) {
        var a = e * this[t++] + n[r] + o;
        o = Math.floor(a / 67108864),
            n[r++] = 67108863 & a
    }
    return o
}
    ,
    x = 26) : (k.prototype.am = function (t, e, n, r, o, i) {
    for (var a = 16383 & e, u = e >> 14; --i >= 0;) {
        var s = 16383 & this[t]
            , c = this[t++] >> 14
            , l = u * s + c * a;
        s = a * s + ((16383 & l) << 14) + n[r] + o,
            o = (s >> 28) + (l >> 14) + u * c,
            n[r++] = 268435455 & s
    }
    return o
}
    ,
    x = 28),
    k.prototype.DB = x,
    k.prototype.DM = (1 << x) - 1,
    k.prototype.DV = 1 << x,
    k.prototype.FV = Math.pow(2, 52),
    k.prototype.F1 = 52 - x,
    k.prototype.F2 = 2 * x - 52;
var L, I, B = [];
for (L = "0".charCodeAt(0),
         I = 0; I <= 9; ++I)
    B[L++] = I;
for (L = "a".charCodeAt(0),
         I = 10; I < 36; ++I)
    B[L++] = I;
for (L = "A".charCodeAt(0),
         I = 10; I < 36; ++I)
    B[L++] = I;

function U(t, e) {
    var n = B[t.charCodeAt(e)];
    return null == n ? -1 : n
}

function H(t) {
    var e = D();
    return e.fromInt(t),
        e
}

function F(t) {
    var e, n = 1;
    return 0 != (e = t >>> 16) && (t = e,
        n += 16),
    0 != (e = t >> 8) && (t = e,
        n += 8),
    0 != (e = t >> 4) && (t = e,
        n += 4),
    0 != (e = t >> 2) && (t = e,
        n += 2),
    0 != (e = t >> 1) && (t = e,
        n += 1),
        n
}

k.ZERO = H(0),
    k.ONE = H(1);
var V, z, W = function () {
    function t() {
        this.i = 0,
            this.j = 0,
            this.S = []
    }

    return t.prototype.init = function (t) {
        var e, n, r;
        for (e = 0; e < 256; ++e)
            this.S[e] = e;
        for (n = 0,
                 e = 0; e < 256; ++e)
            n = n + this.S[e] + t[e % t.length] & 255,
                r = this.S[e],
                this.S[e] = this.S[n],
                this.S[n] = r;
        this.i = 0,
            this.j = 0
    }
        ,
        t.prototype.next = function () {
            var t;
            return this.i = this.i + 1 & 255,
                this.j = this.j + this.S[this.i] & 255,
                t = this.S[this.i],
                this.S[this.i] = this.S[this.j],
                this.S[this.j] = t,
                this.S[t + this.S[this.i] & 255]
        }
        ,
        t
}(), $ = 256, q = null;
if (null == q) {
    q = [],
        z = 0;
    var K = void 0;
    if (window.crypto && window.crypto.getRandomValues) {
        var X = new Uint32Array(256);
        for (window.crypto.getRandomValues(X),
                 K = 0; K < X.length; ++K)
            q[z++] = 255 & X[K]
    }
    var G = function (t) {
        if (this.count = this.count || 0,
        this.count >= 256 || z >= $)
            window.removeEventListener ? window.removeEventListener("mousemove", G, !1) : window.detachEvent && window.detachEvent("onmousemove", G);
        else
            try {
                var e = t.x + t.y;
                q[z++] = 255 & e,
                    this.count += 1
            } catch (t) {
            }
    };
    window.addEventListener ? window.addEventListener("mousemove", G, !1) : window.attachEvent && window.attachEvent("onmousemove", G)
}

function Y() {
    if (null == V) {
        for (V = new W; z < $;) {
            var t = Math.floor(65536 * Math.random());
            q[z++] = 255 & t
        }
        for (V.init(q),
                 z = 0; z < q.length; ++z)
            q[z] = 0;
        z = 0
    }
    return V.next()
}

var Q = function () {
    function t() {
    }

    return t.prototype.nextBytes = function (t) {
        for (var e = 0; e < t.length; ++e)
            t[e] = Y()
    }
        ,
        t
}()
    , Z = function () {
    function t() {
        this.n = null,
            this.e = 0,
            this.d = null,
            this.p = null,
            this.q = null,
            this.dmp1 = null,
            this.dmq1 = null,
            this.coeff = null
    }

    return t.prototype.doPublic = function (t) {
        return t.modPowInt(this.e, this.n)
    }
        ,
        t.prototype.doPrivate = function (t) {
            if (null == this.p || null == this.q)
                return t.modPow(this.d, this.n);
            for (var e = t.mod(this.p).modPow(this.dmp1, this.p), n = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(n) < 0;)
                e = e.add(this.p);
            return e.subtract(n).multiply(this.coeff).mod(this.p).multiply(this.q).add(n)
        }
        ,
        t.prototype.setPublic = function (t, e) {
            null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = N(t, 16),
                this.e = parseInt(e, 16)) : console.error("Invalid RSA public key")
        }
        ,
        t.prototype.encrypt = function (t) {
            var e = function (t, e) {
                if (e < t.length + 11)
                    return console.error("Message too long for RSA"),
                        null;
                for (var n = [], r = t.length - 1; r >= 0 && e > 0;) {
                    var o = t.charCodeAt(r--);
                    o < 128 ? n[--e] = o : o > 127 && o < 2048 ? (n[--e] = 63 & o | 128,
                        n[--e] = o >> 6 | 192) : (n[--e] = 63 & o | 128,
                        n[--e] = o >> 6 & 63 | 128,
                        n[--e] = o >> 12 | 224)
                }
                n[--e] = 0;
                for (var i = new Q, a = []; e > 2;) {
                    for (a[0] = 0; 0 == a[0];)
                        i.nextBytes(a);
                    n[--e] = a[0]
                }
                return n[--e] = 2,
                    n[--e] = 0,
                    new k(n)
            }(t, this.n.bitLength() + 7 >> 3);
            if (null == e)
                return null;
            var n = this.doPublic(e);
            if (null == n)
                return null;
            var r = n.toString(16);
            return 0 == (1 & r.length) ? r : "0" + r
        }
        ,
        t.prototype.setPrivate = function (t, e, n) {
            null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = N(t, 16),
                this.e = parseInt(e, 16),
                this.d = N(n, 16)) : console.error("Invalid RSA private key")
        }
        ,
        t.prototype.setPrivateEx = function (t, e, n, r, o, i, a, u) {
            null != t && null != e && t.length > 0 && e.length > 0 ? (this.n = N(t, 16),
                this.e = parseInt(e, 16),
                this.d = N(n, 16),
                this.p = N(r, 16),
                this.q = N(o, 16),
                this.dmp1 = N(i, 16),
                this.dmq1 = N(a, 16),
                this.coeff = N(u, 16)) : console.error("Invalid RSA private key")
        }
        ,
        t.prototype.generate = function (t, e) {
            var n = new Q
                , r = t >> 1;
            this.e = parseInt(e, 16);
            for (var o = new k(e, 16); ;) {
                for (; this.p = new k(t - r, 1, n),
                       0 != this.p.subtract(k.ONE).gcd(o).compareTo(k.ONE) || !this.p.isProbablePrime(10);)
                    ;
                for (; this.q = new k(r, 1, n),
                       0 != this.q.subtract(k.ONE).gcd(o).compareTo(k.ONE) || !this.q.isProbablePrime(10);)
                    ;
                if (this.p.compareTo(this.q) <= 0) {
                    var i = this.p;
                    this.p = this.q,
                        this.q = i
                }
                var a = this.p.subtract(k.ONE)
                    , u = this.q.subtract(k.ONE)
                    , s = a.multiply(u);
                if (0 == s.gcd(o).compareTo(k.ONE)) {
                    this.n = this.p.multiply(this.q),
                        this.d = o.modInverse(s),
                        this.dmp1 = this.d.mod(a),
                        this.dmq1 = this.d.mod(u),
                        this.coeff = this.q.modInverse(this.p);
                    break
                }
            }
        }
        ,
        t.prototype.decrypt = function (t) {
            var e = N(t, 16)
                , n = this.doPrivate(e);
            return null == n ? null : function (t, e) {
                for (var n = t.toByteArray(), r = 0; r < n.length && 0 == n[r];)
                    ++r;
                if (n.length - r != e - 1 || 2 != n[r])
                    return null;
                for (++r; 0 != n[r];)
                    if (++r >= n.length)
                        return null;
                for (var o = ""; ++r < n.length;) {
                    var i = 255 & n[r];
                    i < 128 ? o += String.fromCharCode(i) : i > 191 && i < 224 ? (o += String.fromCharCode((31 & i) << 6 | 63 & n[r + 1]),
                        ++r) : (o += String.fromCharCode((15 & i) << 12 | (63 & n[r + 1]) << 6 | 63 & n[r + 2]),
                        r += 2)
                }
                return o
            }(n, this.n.bitLength() + 7 >> 3)
        }
        ,
        t.prototype.generateAsync = function (t, e, n) {
            var r = new Q
                , o = t >> 1;
            this.e = parseInt(e, 16);
            var i = new k(e, 16)
                , a = this
                , u = function () {
                var e = function () {
                    if (a.p.compareTo(a.q) <= 0) {
                        var t = a.p;
                        a.p = a.q,
                            a.q = t
                    }
                    var e = a.p.subtract(k.ONE)
                        , r = a.q.subtract(k.ONE)
                        , o = e.multiply(r);
                    0 == o.gcd(i).compareTo(k.ONE) ? (a.n = a.p.multiply(a.q),
                        a.d = i.modInverse(o),
                        a.dmp1 = a.d.mod(e),
                        a.dmq1 = a.d.mod(r),
                        a.coeff = a.q.modInverse(a.p),
                        setTimeout(function () {
                            n()
                        }, 0)) : setTimeout(u, 0)
                }
                    , s = function () {
                    a.q = D(),
                        a.q.fromNumberAsync(o, 1, r, function () {
                            a.q.subtract(k.ONE).gcda(i, function (t) {
                                0 == t.compareTo(k.ONE) && a.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(s, 0)
                            })
                        })
                }
                    , c = function () {
                    a.p = D(),
                        a.p.fromNumberAsync(t - o, 1, r, function () {
                            a.p.subtract(k.ONE).gcda(i, function (t) {
                                0 == t.compareTo(k.ONE) && a.p.isProbablePrime(10) ? setTimeout(s, 0) : setTimeout(c, 0)
                            })
                        })
                };
                setTimeout(c, 0)
            };
            setTimeout(u, 0)
        }
        ,
        t.prototype.sign = function (t, e, n) {
            var r = function (t) {
                return J[t] || ""
            }(n)
                , o = r + e(t).toString()
                , i = function (t, e) {
                if (e < t.length + 22)
                    return console.error("Message too long for RSA"),
                        null;
                for (var n = e - t.length - 6, r = "", o = 0; o < n; o += 2)
                    r += "ff";
                return N("0001" + r + "00" + t, 16)
            }(o, this.n.bitLength() / 4);
            if (null == i)
                return null;
            var a = this.doPrivate(i);
            if (null == a)
                return null;
            var u = a.toString(16);
            return 0 == (1 & u.length) ? u : "0" + u
        }
        ,
        t.prototype.verify = function (t, e, n) {
            var r = N(e, 16)
                , o = this.doPublic(r);
            if (null == o)
                return null;
            var i = o.toString(16).replace(/^1f+00/, "")
                , a = function (t) {
                for (var e in J)
                    if (J.hasOwnProperty(e)) {
                        var n = J[e]
                            , r = n.length;
                        if (t.substr(0, r) == n)
                            return t.substr(r)
                    }
                return t
            }/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
            (i);
            return a == n(t).toString()
        }
        ,
        t
}()
    , J = {
    md2: "3020300c06082a864886f70d020205000410",
    md5: "3020300c06082a864886f70d020505000410",
    sha1: "3021300906052b0e03021a05000414",
    sha224: "302d300d06096086480165030402040500041c",
    sha256: "3031300d060960864801650304020105000420",
    sha384: "3041300d060960864801650304020205000430",
    sha512: "3051300d060960864801650304020305000440",
    ripemd160: "3021300906052b2403020105000414"
}
    , tt = {};
tt.lang = {
    extend: function (t, e, n) {
        if (!e || !t)
            throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
        var r = function () {
        };
        if (r.prototype = e.prototype,
            t.prototype = new r,
            t.prototype.constructor = t,
            t.superclass = e.prototype,
        e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e),
            n) {
            var o;
            for (o in n)
                t.prototype[o] = n[o];
            var i = function () {
            }
                , a = ["toString", "valueOf"];
            try {
                /MSIE/.test(navigator.userAgent) && (i = function (t, e) {
                        for (o = 0; o < a.length; o += 1) {
                            var n = a[o]
                                , r = e[n];
                            "function" == typeof r && r != Object.prototype[n] && (t[n] = r)
                        }
                    }
                )
            } catch (t) {
            }
            i(t.prototype, n)
        }
    }
};
/**
 * @fileOverview
 * @name asn1-1.0.js
 * @author Kenji Urushima kenji.urushima@gmail.com
 * @version asn1 1.0.13 (2017-Jun-02)
 * @since jsrsasign 2.1
 * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
 */
var et = {};
void 0 !== et.asn1 && et.asn1 || (et.asn1 = {}),
    et.asn1.ASN1Util = new function () {
        this.integerToByteHex = function (t) {
            var e = t.toString(16);
            return e.length % 2 == 1 && (e = "0" + e),
                e
        }
            ,
            this.bigIntToMinTwosComplementsHex = function (t) {
                var e = t.toString(16);
                if ("-" != e.substr(0, 1))
                    e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
                else {
                    var n = e.substr(1)
                        , r = n.length;
                    r % 2 == 1 ? r += 1 : e.match(/^[0-7]/) || (r += 2);
                    for (var o = "", i = 0; i < r; i++)
                        o += "f";
                    var a = new k(o, 16)
                        , u = a.xor(t).add(k.ONE);
                    e = u.toString(16).replace(/^-/, "")
                }
                return e
            }
            ,
            this.getPEMStringFromHex = function (t, e) {
                return hextopem(t, e)
            }
            ,
            this.newObject = function (t) {
                var e = et
                    , n = e.asn1
                    , r = n.DERBoolean
                    , o = n.DERInteger
                    , i = n.DERBitString
                    , a = n.DEROctetString
                    , u = n.DERNull
                    , s = n.DERObjectIdentifier
                    , c = n.DEREnumerated
                    , l = n.DERUTF8String
                    , f = n.DERNumericString
                    , p = n.DERPrintableString
                    , h = n.DERTeletexString
                    , d = n.DERIA5String
                    , v = n.DERUTCTime
                    , y = n.DERGeneralizedTime
                    , g = n.DERSequence
                    , m = n.DERSet
                    , b = n.DERTaggedObject
                    , w = n.ASN1Util.newObject
                    , E = Object.keys(t);
                if (1 != E.length)
                    throw "key of param shall be only one.";
                var _ = E[0];
                if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + _ + ":"))
                    throw "undefined key: " + _;
                if ("bool" == _)
                    return new r(t[_]);
                if ("int" == _)
                    return new o(t[_]);
                if ("bitstr" == _)
                    return new i(t[_]);
                if ("octstr" == _)
                    return new a(t[_]);
                if ("null" == _)
                    return new u(t[_]);
                if ("oid" == _)
                    return new s(t[_]);
                if ("enum" == _)
                    return new c(t[_]);
                if ("utf8str" == _)
                    return new l(t[_]);
                if ("numstr" == _)
                    return new f(t[_]);
                if ("prnstr" == _)
                    return new p(t[_]);
                if ("telstr" == _)
                    return new h(t[_]);
                if ("ia5str" == _)
                    return new d(t[_]);
                if ("utctime" == _)
                    return new v(t[_]);
                if ("gentime" == _)
                    return new y(t[_]);
                if ("seq" == _) {
                    for (var x = t[_], S = [], T = 0; T < x.length; T++) {
                        var O = w(x[T]);
                        S.push(O)
                    }
                    return new g({
                        array: S
                    })
                }
                if ("set" == _) {
                    for (var x = t[_], S = [], T = 0; T < x.length; T++) {
                        var O = w(x[T]);
                        S.push(O)
                    }
                    return new m({
                        array: S
                    })
                }
                if ("tag" == _) {
                    var C = t[_];
                    if ("[object Array]" === Object.prototype.toString.call(C) && 3 == C.length) {
                        var P = w(C[2]);
                        return new b({
                            tag: C[0],
                            explicit: C[1],
                            obj: P
                        })
                    }
                    var k = {};
                    if (void 0 !== C.explicit && (k.explicit = C.explicit),
                    void 0 !== C.tag && (k.tag = C.tag),
                    void 0 === C.obj)
                        throw "obj shall be specified for 'tag'.";
                    return k.obj = w(C.obj),
                        new b(k)
                }
            }
            ,
            this.jsonToASN1HEX = function (t) {
                var e = this.newObject(t);
                return e.getEncodedHex()
            }
    }
    ,
    et.asn1.ASN1Util.oidHexToInt = function (t) {
        for (var e = "", n = parseInt(t.substr(0, 2), 16), r = Math.floor(n / 40), o = n % 40, e = r + "." + o, i = "", a = 2; a < t.length; a += 2) {
            var u = parseInt(t.substr(a, 2), 16)
                , s = ("00000000" + u.toString(2)).slice(-8);
            if (i += s.substr(1, 7),
            "0" == s.substr(0, 1)) {
                var c = new k(i, 2);
                e = e + "." + c.toString(10),
                    i = ""
            }
        }
        return e
    }
    ,
    et.asn1.ASN1Util.oidIntToHex = function (t) {
        var e = function (t) {
            var e = t.toString(16);
            return 1 == e.length && (e = "0" + e),
                e
        }
            , n = function (t) {
            var n = ""
                , r = new k(t, 10)
                , o = r.toString(2)
                , i = 7 - o.length % 7;
            7 == i && (i = 0);
            for (var a = "", u = 0; u < i; u++)
                a += "0";
            o = a + o;
            for (var u = 0; u < o.length - 1; u += 7) {
                var s = o.substr(u, 7);
                u != o.length - 7 && (s = "1" + s),
                    n += e(parseInt(s, 2))
            }
            return n
        };
        if (!t.match(/^[0-9.]+$/))
            throw "malformed oid string: " + t;
        var r = ""
            , o = t.split(".")
            , i = 40 * parseInt(o[0]) + parseInt(o[1]);
        r += e(i),
            o.splice(0, 2);
        for (var a = 0; a < o.length; a++)
            r += n(o[a]);
        return r
    }
    ,
    et.asn1.ASN1Object = function () {
        this.getLengthHexFromValue = function () {
            if (void 0 === this.hV || null == this.hV)
                throw "this.hV is null or undefined.";
            if (this.hV.length % 2 == 1)
                throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
            var t = this.hV.length / 2
                , e = t.toString(16);
            if (e.length % 2 == 1 && (e = "0" + e),
            t < 128)
                return e;
            var n = e.length / 2;
            if (n > 15)
                throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
            var r = 128 + n;
            return r.toString(16) + e
        }
            ,
            this.getEncodedHex = function () {
                return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
                    this.hL = this.getLengthHexFromValue(),
                    this.hTLV = this.hT + this.hL + this.hV,
                    this.isModified = !1),
                    this.hTLV
            }
            ,
            this.getValueHex = function () {
                return this.getEncodedHex(),
                    this.hV
            }
            ,
            this.getFreshValueHex = function () {
                return ""
            }
    }
    ,
    et.asn1.DERAbstractString = function (t) {
        et.asn1.DERAbstractString.superclass.constructor.call(this),
            this.getString = function () {
                return this.s
            }
            ,
            this.setString = function (t) {
                this.hTLV = null,
                    this.isModified = !0,
                    this.s = t,
                    this.hV = stohex(this.s)
            }
            ,
            this.setStringHex = function (t) {
                this.hTLV = null,
                    this.isModified = !0,
                    this.s = null,
                    this.hV = t
            }
            ,
            this.getFreshValueHex = function () {
                return this.hV
            }
            ,
        void 0 !== t && ("string" == typeof t ? this.setString(t) : void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex))
    }
    ,
    tt.lang.extend(et.asn1.DERAbstractString, et.asn1.ASN1Object),
    et.asn1.DERAbstractTime = function (t) {
        et.asn1.DERAbstractTime.superclass.constructor.call(this),
            this.localDateToUTC = function (t) {
                utc = t.getTime() + 6e4 * t.getTimezoneOffset();
                var e = new Date(utc);
                return e
            }
            ,
            this.formatDate = function (t, e, n) {
                var r = this.zeroPadding
                    , o = this.localDateToUTC(t)
                    , i = String(o.getFullYear());
                "utc" == e && (i = i.substr(2, 2));
                var a = r(String(o.getMonth() + 1), 2)
                    , u = r(String(o.getDate()), 2)
                    , s = r(String(o.getHours()), 2)
                    , c = r(String(o.getMinutes()), 2)
                    , l = r(String(o.getSeconds()), 2)
                    , f = i + a + u + s + c + l;
                if (!0 === n) {
                    var p = o.getMilliseconds();
                    if (0 != p) {
                        var h = r(String(p), 3);
                        h = h.replace(/[0]+$/, ""),
                            f = f + "." + h
                    }
                }
                return f + "Z"
            }
            ,
            this.zeroPadding = function (t, e) {
                return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
            }
            ,
            this.getString = function () {
                return this.s
            }
            ,
            this.setString = function (t) {
                this.hTLV = null,
                    this.isModified = !0,
                    this.s = t,
                    this.hV = stohex(t)
            }
            ,
            this.setByDateValue = function (t, e, n, r, o, i) {
                var a = new Date(Date.UTC(t, e - 1, n, r, o, i, 0));
                this.setByDate(a)
            }
            ,
            this.getFreshValueHex = function () {
                return this.hV
            }
    }
    ,
    tt.lang.extend(et.asn1.DERAbstractTime, et.asn1.ASN1Object),
    et.asn1.DERAbstractStructured = function (t) {
        et.asn1.DERAbstractString.superclass.constructor.call(this),
            this.setByASN1ObjectArray = function (t) {
                this.hTLV = null,
                    this.isModified = !0,
                    this.asn1Array = t
            }
            ,
            this.appendASN1Object = function (t) {
                this.hTLV = null,
                    this.isModified = !0,
                    this.asn1Array.push(t)
            }
            ,
            this.asn1Array = new Array,
        void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array)
    }
    ,
    tt.lang.extend(et.asn1.DERAbstractStructured, et.asn1.ASN1Object),
    et.asn1.DERBoolean = function () {
        et.asn1.DERBoolean.superclass.constructor.call(this),
            this.hT = "01",
            this.hTLV = "0101ff"
    }
    ,
    tt.lang.extend(et.asn1.DERBoolean, et.asn1.ASN1Object),
    et.asn1.DERInteger = function (t) {
        et.asn1.DERInteger.superclass.constructor.call(this),
            this.hT = "02",
            this.setByBigInteger = function (t) {
                this.hTLV = null,
                    this.isModified = !0,
                    this.hV = et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
            }
            ,
            this.setByInteger = function (t) {
                var e = new k(String(t), 10);
                this.setByBigInteger(e)
            }
            ,
            this.setValueHex = function (t) {
                this.hV = t
            }
            ,
            this.getFreshValueHex = function () {
                return this.hV
            }
            ,
        void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
    }
    ,
    tt.lang.extend(et.asn1.DERInteger, et.asn1.ASN1Object),
    et.asn1.DERBitString = function (t) {
        if (void 0 !== t && void 0 !== t.obj) {
            var e = et.asn1.ASN1Util.newObject(t.obj);
            t.hex = "00" + e.getEncodedHex()
        }
        et.asn1.DERBitString.superclass.constructor.call(this),
            this.hT = "03",
            this.setHexValueIncludingUnusedBits = function (t) {
                this.hTLV = null,
                    this.isModified = !0,
                    this.hV = t
            }
            ,
            this.setUnusedBitsAndHexValue = function (t, e) {
                if (t < 0 || 7 < t)
                    throw "unused bits shall be from 0 to 7: u = " + t;
                var n = "0" + t;
                this.hTLV = null,
                    this.isModified = !0,
                    this.hV = n + e
            }
            ,
            this.setByBinaryString = function (t) {
                var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
                8 == e && (e = 0);
                for (var n = 0; n <= e; n++)
                    t += "0";
                for (var r = "", n = 0; n < t.length - 1; n += 8) {
                    var o = t.substr(n, 8)
                        , i = parseInt(o, 2).toString(16);
                    1 == i.length && (i = "0" + i),
                        r += i
                }
                this.hTLV = null,
                    this.isModified = !0,
                    this.hV = "0" + e + r
            }
            ,
            this.setByBooleanArray = function (t) {
                for (var e = "", n = 0; n < t.length; n++)
                    1 == t[n] ? e += "1" : e += "0";
                this.setByBinaryString(e)
            }
            ,
            this.newFalseArray = function (t) {
                for (var e = new Array(t), n = 0; n < t; n++)
                    e[n] = !1;
                return e
            }
            ,
            this.getFreshValueHex = function () {
                return this.hV
            }
            ,
        void 0 !== t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array))
    }
    ,
    tt.lang.extend(et.asn1.DERBitString, et.asn1.ASN1Object),
    et.asn1.DEROctetString = function (t) {
        if (void 0 !== t && void 0 !== t.obj) {
            var e = et.asn1.ASN1Util.newObject(t.obj);
            t.hex = e.getEncodedHex()
        }
        et.asn1.DEROctetString.superclass.constructor.call(this, t),
            this.hT = "04"
    }
    ,
    tt.lang.extend(et.asn1.DEROctetString, et.asn1.DERAbstractString),
    et.asn1.DERNull = function () {
        et.asn1.DERNull.superclass.constructor.call(this),
            this.hT = "05",
            this.hTLV = "0500"
    }
    ,
    tt.lang.extend(et.asn1.DERNull, et.asn1.ASN1Object),
    et.asn1.DERObjectIdentifier = function (t) {
        var e = function (t) {
            var e = t.toString(16);
            return 1 == e.length && (e = "0" + e),
                e
        }
            , n = function (t) {
            var n = ""
                , r = new k(t, 10)
                , o = r.toString(2)
                , i = 7 - o.length % 7;
            7 == i && (i = 0);
            for (var a = "", u = 0; u < i; u++)
                a += "0";
            o = a + o;
            for (var u = 0; u < o.length - 1; u += 7) {
                var s = o.substr(u, 7);
                u != o.length - 7 && (s = "1" + s),
                    n += e(parseInt(s, 2))
            }
            return n
        };
        et.asn1.DERObjectIdentifier.superclass.constructor.call(this),
            this.hT = "06",
            this.setValueHex = function (t) {
                this.hTLV = null,
                    this.isModified = !0,
                    this.s = null,
                    this.hV = t
            }
            ,
            this.setValueOidString = function (t) {
                if (!t.match(/^[0-9.]+$/))
                    throw "malformed oid string: " + t;
                var r = ""
                    , o = t.split(".")
                    , i = 40 * parseInt(o[0]) + parseInt(o[1]);
                r += e(i),
                    o.splice(0, 2);
                for (var a = 0; a < o.length; a++)
                    r += n(o[a]);
                this.hTLV = null,
                    this.isModified = !0,
                    this.s = null,
                    this.hV = r
            }
            ,
            this.setValueName = function (t) {
                var e = et.asn1.x509.OID.name2oid(t);
                if ("" === e)
                    throw "DERObjectIdentifier oidName undefined: " + t;
                this.setValueOidString(e)
            }
            ,
            this.getFreshValueHex = function () {
                return this.hV
            }
            ,
        void 0 !== t && ("string" == typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
    }
    ,
    tt.lang.extend(et.asn1.DERObjectIdentifier, et.asn1.ASN1Object),
    et.asn1.DEREnumerated = function (t) {
        et.asn1.DEREnumerated.superclass.constructor.call(this),
            this.hT = "0a",
            this.setByBigInteger = function (t) {
                this.hTLV = null,
                    this.isModified = !0,
                    this.hV = et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
            }
            ,
            this.setByInteger = function (t) {
                var e = new k(String(t), 10);
                this.setByBigInteger(e)
            }
            ,
            this.setValueHex = function (t) {
                this.hV = t
            }
            ,
            this.getFreshValueHex = function () {
                return this.hV
            }
            ,
        void 0 !== t && (void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
    }
    ,
    tt.lang.extend(et.asn1.DEREnumerated, et.asn1.ASN1Object),
    et.asn1.DERUTF8String = function (t) {
        et.asn1.DERUTF8String.superclass.constructor.call(this, t),
            this.hT = "0c"
    }
    ,
    tt.lang.extend(et.asn1.DERUTF8String, et.asn1.DERAbstractString),
    et.asn1.DERNumericString = function (t) {
        et.asn1.DERNumericString.superclass.constructor.call(this, t),
            this.hT = "12"
    }
    ,
    tt.lang.extend(et.asn1.DERNumericString, et.asn1.DERAbstractString),
    et.asn1.DERPrintableString = function (t) {
        et.asn1.DERPrintableString.superclass.constructor.call(this, t),
            this.hT = "13"
    }
    ,
    tt.lang.extend(et.asn1.DERPrintableString, et.asn1.DERAbstractString),
    et.asn1.DERTeletexString = function (t) {
        et.asn1.DERTeletexString.superclass.constructor.call(this, t),
            this.hT = "14"
    }
    ,
    tt.lang.extend(et.asn1.DERTeletexString, et.asn1.DERAbstractString),
    et.asn1.DERIA5String = function (t) {
        et.asn1.DERIA5String.superclass.constructor.call(this, t),
            this.hT = "16"
    }
    ,
    tt.lang.extend(et.asn1.DERIA5String, et.asn1.DERAbstractString),
    et.asn1.DERUTCTime = function (t) {
        et.asn1.DERUTCTime.superclass.constructor.call(this, t),
            this.hT = "17",
            this.setByDate = function (t) {
                this.hTLV = null,
                    this.isModified = !0,
                    this.date = t,
                    this.s = this.formatDate(this.date, "utc"),
                    this.hV = stohex(this.s)
            }
            ,
            this.getFreshValueHex = function () {
                return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                    this.s = this.formatDate(this.date, "utc"),
                    this.hV = stohex(this.s)),
                    this.hV
            }
            ,
        void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
    }
    ,
    tt.lang.extend(et.asn1.DERUTCTime, et.asn1.DERAbstractTime),
    et.asn1.DERGeneralizedTime = function (t) {
        et.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
            this.hT = "18",
            this.withMillis = !1,
            this.setByDate = function (t) {
                this.hTLV = null,
                    this.isModified = !0,
                    this.date = t,
                    this.s = this.formatDate(this.date, "gen", this.withMillis),
                    this.hV = stohex(this.s)
            }
            ,
            this.getFreshValueHex = function () {
                return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                    this.s = this.formatDate(this.date, "gen", this.withMillis),
                    this.hV = stohex(this.s)),
                    this.hV
            }
            ,
        void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date),
        !0 === t.millis && (this.withMillis = !0))
    }
    ,
    tt.lang.extend(et.asn1.DERGeneralizedTime, et.asn1.DERAbstractTime),
    et.asn1.DERSequence = function (t) {
        et.asn1.DERSequence.superclass.constructor.call(this, t),
            this.hT = "30",
            this.getFreshValueHex = function () {
                for (var t = "", e = 0; e < this.asn1Array.length; e++) {
                    var n = this.asn1Array[e];
                    t += n.getEncodedHex()
                }
                return this.hV = t,
                    this.hV
            }
    }
    ,
    tt.lang.extend(et.asn1.DERSequence, et.asn1.DERAbstractStructured),
    et.asn1.DERSet = function (t) {
        et.asn1.DERSet.superclass.constructor.call(this, t),
            this.hT = "31",
            this.sortFlag = !0,
            this.getFreshValueHex = function () {
                for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
                    var n = this.asn1Array[e];
                    t.push(n.getEncodedHex())
                }
                return 1 == this.sortFlag && t.sort(),
                    this.hV = t.join(""),
                    this.hV
            }
            ,
        void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
    }
    ,
    tt.lang.extend(et.asn1.DERSet, et.asn1.DERAbstractStructured),
    et.asn1.DERTaggedObject = function (t) {
        et.asn1.DERTaggedObject.superclass.constructor.call(this),
            this.hT = "a0",
            this.hV = "",
            this.isExplicit = !0,
            this.asn1Object = null,
            this.setASN1Object = function (t, e, n) {
                this.hT = e,
                    this.isExplicit = t,
                    this.asn1Object = n,
                    this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
                        this.hTLV = null,
                        this.isModified = !0) : (this.hV = null,
                        this.hTLV = n.getEncodedHex(),
                        this.hTLV = this.hTLV.replace(/^../, e),
                        this.isModified = !1)
            }
            ,
            this.getFreshValueHex = function () {
                return this.hV
            }
            ,
        void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag),
        void 0 !== t.explicit && (this.isExplicit = t.explicit),
        void 0 !== t.obj && (this.asn1Object = t.obj,
            this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
    }
    ,
    tt.lang.extend(et.asn1.DERTaggedObject, et.asn1.ASN1Object);
var nt = function (t) {
    function e(n) {
        var r = t.call(this) || this;
        return n && ("string" == typeof n ? r.parseKey(n) : (e.hasPrivateKeyProperty(n) || e.hasPublicKeyProperty(n)) && r.parsePropertiesFrom(n)),
            r
    }

    return function (t, e) {
        function n() {
            this.constructor = t
        }

        v(t, e),
            t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                new n)
    }(e, t),
        e.prototype.parseKey = function (t) {
            try {
                var e = 0
                    , n = 0
                    , r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? y.decode(t) : g.unarmor(t)
                    , o = T.decode(r);
                if (3 === o.sub.length && (o = o.sub[2].sub[0]),
                9 === o.sub.length) {
                    e = o.sub[1].getHexStringValue(),
                        this.n = N(e, 16),
                        n = o.sub[2].getHexStringValue(),
                        this.e = parseInt(n, 16);
                    var i = o.sub[3].getHexStringValue();
                    this.d = N(i, 16);
                    var a = o.sub[4].getHexStringValue();
                    this.p = N(a, 16);
                    var u = o.sub[5].getHexStringValue();
                    this.q = N(u, 16);
                    var s = o.sub[6].getHexStringValue();
                    this.dmp1 = N(s, 16);
                    var c = o.sub[7].getHexStringValue();
                    this.dmq1 = N(c, 16);
                    var l = o.sub[8].getHexStringValue();
                    this.coeff = N(l, 16)
                } else {
                    if (2 !== o.sub.length)
                        return !1;
                    var f = o.sub[1]
                        , p = f.sub[0];
                    e = p.sub[0].getHexStringValue(),
                        this.n = N(e, 16),
                        n = p.sub[1].getHexStringValue(),
                        this.e = parseInt(n, 16)
                }
                return !0
            } catch (t) {
                return !1
            }
        }
        ,
        e.prototype.getPrivateBaseKey = function () {
            var t = {
                array: [new et.asn1.DERInteger({
                    int: 0
                }), new et.asn1.DERInteger({
                    bigint: this.n
                }), new et.asn1.DERInteger({
                    int: this.e
                }), new et.asn1.DERInteger({
                    bigint: this.d
                }), new et.asn1.DERInteger({
                    bigint: this.p
                }), new et.asn1.DERInteger({
                    bigint: this.q
                }), new et.asn1.DERInteger({
                    bigint: this.dmp1
                }), new et.asn1.DERInteger({
                    bigint: this.dmq1
                }), new et.asn1.DERInteger({
                    bigint: this.coeff
                })]
            }
                , e = new et.asn1.DERSequence(t);
            return e.getEncodedHex()
        }
        ,
        e.prototype.getPrivateBaseKeyB64 = function () {
            return f(this.getPrivateBaseKey())
        }
        ,
        e.prototype.getPublicBaseKey = function () {
            var t = new et.asn1.DERSequence({
                array: [new et.asn1.DERObjectIdentifier({
                    oid: "1.2.840.113549.1.1.1"
                }), new et.asn1.DERNull]
            })
                , e = new et.asn1.DERSequence({
                array: [new et.asn1.DERInteger({
                    bigint: this.n
                }), new et.asn1.DERInteger({
                    int: this.e
                })]
            })
                , n = new et.asn1.DERBitString({
                hex: "00" + e.getEncodedHex()
            })
                , r = new et.asn1.DERSequence({
                array: [t, n]
            });
            return r.getEncodedHex()
        }
        ,
        e.prototype.getPublicBaseKeyB64 = function () {
            return f(this.getPublicBaseKey())
        }
        ,
        e.wordwrap = function (t, e) {
            if (e = e || 64,
                !t)
                return t;
            var n = "(.{1," + e + "})( +|$\n?)|(.{1," + e + "})";
            return t.match(RegExp(n, "g")).join("\n")
        }
        ,
        e.prototype.getPrivateKey = function () {
            var t = "-----BEGIN RSA PRIVATE KEY-----\n";
            return t += e.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
                t += "-----END RSA PRIVATE KEY-----"
        }
        ,
        e.prototype.getPublicKey = function () {
            var t = "-----BEGIN PUBLIC KEY-----\n";
            return t += e.wordwrap(this.getPublicBaseKeyB64()) + "\n",
                t += "-----END PUBLIC KEY-----"
        }
        ,
        e.hasPublicKeyProperty = function (t) {
            return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e")
        }
        ,
        e.hasPrivateKeyProperty = function (t) {
            return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
        }
        ,
        e.prototype.parsePropertiesFrom = function (t) {
            this.n = t.n,
                this.e = t.e,
            t.hasOwnProperty("d") && (this.d = t.d,
                this.p = t.p,
                this.q = t.q,
                this.dmp1 = t.dmp1,
                this.dmq1 = t.dmq1,
                this.coeff = t.coeff)
        }
        ,
        e
}(Z);
encrypter = function t(t) {
    t = t || {},
        this.default_key_size = parseInt(t.default_key_size, 10) || 1024,
        this.default_public_exponent = t.default_public_exponent || "010001",
        this.log = t.log || !1,
        this.key = null
};
encrypter.prototype.setKey = function (t) {
    this.log && this.key && console.warn("A key was already set, overriding existing."),
        this.key = new nt(t)
};
encrypter.prototype.setPrivateKey = function (t) {
    this.setKey(t)
};
encrypter.prototype.setPublicKey = function (t) {
    this.setKey(t)
};
encrypter.prototype.decrypt = function (t) {
    try {
        return this.getKey().decrypt(p(t))
    } catch (t) {
        return !1
    }
};
encrypter.prototype.encrypt = function (t) {
    try {
        return f(this.getKey().encrypt(t))
    } catch (t) {
        return !1
    }
};
encrypter.prototype.sign = function (t, e, n) {
    try {
        return f(this.getKey().sign(t, e, n))
    } catch (t) {
        return !1
    }
};
encrypter.prototype.verify = function (t, e, n) {
    try {
        return this.getKey().verify(t, p(e), n)
    } catch (t) {
        return !1
    }
};
encrypter.prototype.getKey = function (t) {
    if (!this.key) {
        if (this.key = new nt,
        t && "[object Function]" === {}.toString.call(t))
            return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
        this.key.generate(this.default_key_size, this.default_public_exponent)
    }
    return this.key
};
encrypter.prototype.getPrivateKey = function () {
    return this.getKey().getPrivateKey()
};
encrypter.prototype.getPrivateKeyB64 = function () {
    return this.getKey().getPrivateBaseKeyB64()
};
encrypter.prototype.getPublicKey = function () {
    return this.getKey().getPublicKey()
};
encrypter.prototype.getPublicKeyB64 = function () {
    return this.getKey().getPublicBaseKeyB64()
};
encrypter.version = "3.0.0-rc.1";

function encrypwd(e, t) {
    var n = (0, get_signature)(e) + (t || "")
    // var n = "475991cd361f5dba137d00e58c3be6757632380064121120144@bjc|bgi|d|fi"
      , r = encrypter;
    return r.prototype.setPublicKey("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCVhaR3Or7suUlwHUl2Ly36uVmboZ3+HhovogDjLgRE9CbaUokS2eqGaVFfbxAUxFThNDuXq/fBD+SdUgppmcZrIw4HMMP4AtE2qJJQH/KxPWmbXH7Lv+9CisNtPYOlvWJ/GHRqf9x3TBKjjeJ2CjuVxlPBDX63+Ecil2JR9klVawIDAQAB"),
        r.prototype.getPublicKey(),
        r.prototype.encrypt(n)
}
