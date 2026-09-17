var PureMD5 = function(exports) {
    'use strict';
    // src/hex_chr.ts
    var hex_chr = "0123456789abcdef".split("");
    // src/hex.ts
    function rhex(n) {
        var s = "";
        for(var j = 0; j < 4; j++)s += hex_chr[n >> j * 8 + 4 & 15] + hex_chr[n >> j * 8 & 15];
        return s;
    }
    function hex(x) {
        var l = x.length;
        var result = new Array(l);
        for(var i = 0; i < l; i++)result[i] = rhex(x[i]);
        return result.join("");
    }
    // src/add32.ts
    function add32(x, y) {
        return x + y & 4294967295;
    }
    // src/round-functions.ts
    function cmn1(q, a, x, t, fn) {
        var add = fn || add32;
        a = add(add(a, q), add(x, t));
        return a;
    }
    function cmn2(a, s, b, fn) {
        var add = fn || add32;
        var result = add(a << s | a >>> 32 - s, b);
        return result;
    }
    function cmn(q, a, b, x, s, t, fn) {
        a = cmn1(q, a, x, t, fn);
        return cmn2(a, s, b, fn);
    }
    function ff(fn, a, b, c, d, x, s, t) {
        return cmn(b & c | ~b & d, a, b, x, s, t, fn);
    }
    function gg(fn, a, b, c, d, x, s, t) {
        return cmn(b & d | c & ~d, a, b, x, s, t, fn);
    }
    function hh(fn, a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t, fn);
    }
    function ii(fn, a, b, c, d, x, s, t) {
        return cmn(c ^ (b | ~d), a, b, x, s, t, fn);
    }
    // src/md5cycle.ts
    function md5cycle(x, k, fn) {
        if (typeof fn === "undefined") {
            fn = add32;
        }
        var a = x[0];
        var b = x[1];
        var c = x[2];
        var d = x[3];
        var fff = ff.bind(null, fn);
        a = fff(a, b, c, d, k[0], 7, -680876936);
        d = fff(d, a, b, c, k[1], 12, -389564586);
        c = fff(c, d, a, b, k[2], 17, 606105819);
        b = fff(b, c, d, a, k[3], 22, -1044525330);
        a = fff(a, b, c, d, k[4], 7, -176418897);
        d = fff(d, a, b, c, k[5], 12, 1200080426);
        c = fff(c, d, a, b, k[6], 17, -1473231341);
        b = fff(b, c, d, a, k[7], 22, -45705983);
        a = fff(a, b, c, d, k[8], 7, 1770035416);
        d = fff(d, a, b, c, k[9], 12, -1958414417);
        c = fff(c, d, a, b, k[10], 17, -42063);
        b = fff(b, c, d, a, k[11], 22, -1990404162);
        a = fff(a, b, c, d, k[12], 7, 1804603682);
        d = fff(d, a, b, c, k[13], 12, -40341101);
        c = fff(c, d, a, b, k[14], 17, -1502002290);
        b = fff(b, c, d, a, k[15], 22, 1236535329);
        var ggg = gg.bind(null, fn);
        a = ggg(a, b, c, d, k[1], 5, -165796510);
        d = ggg(d, a, b, c, k[6], 9, -1069501632);
        c = ggg(c, d, a, b, k[11], 14, 643717713);
        b = ggg(b, c, d, a, k[0], 20, -373897302);
        a = ggg(a, b, c, d, k[5], 5, -701558691);
        d = ggg(d, a, b, c, k[10], 9, 38016083);
        c = ggg(c, d, a, b, k[15], 14, -660478335);
        b = ggg(b, c, d, a, k[4], 20, -405537848);
        a = ggg(a, b, c, d, k[9], 5, 568446438);
        d = ggg(d, a, b, c, k[14], 9, -1019803690);
        c = ggg(c, d, a, b, k[3], 14, -187363961);
        b = ggg(b, c, d, a, k[8], 20, 1163531501);
        a = ggg(a, b, c, d, k[13], 5, -1444681467);
        d = ggg(d, a, b, c, k[2], 9, -51403784);
        c = ggg(c, d, a, b, k[7], 14, 1735328473);
        b = ggg(b, c, d, a, k[12], 20, -1926607734);
        var hhh = hh.bind(null, fn);
        a = hhh(a, b, c, d, k[5], 4, -378558);
        d = hhh(d, a, b, c, k[8], 11, -2022574463);
        c = hhh(c, d, a, b, k[11], 16, 1839030562);
        b = hhh(b, c, d, a, k[14], 23, -35309556);
        a = hhh(a, b, c, d, k[1], 4, -1530992060);
        d = hhh(d, a, b, c, k[4], 11, 1272893353);
        c = hhh(c, d, a, b, k[7], 16, -155497632);
        b = hhh(b, c, d, a, k[10], 23, -1094730640);
        a = hhh(a, b, c, d, k[13], 4, 681279174);
        d = hhh(d, a, b, c, k[0], 11, -358537222);
        c = hhh(c, d, a, b, k[3], 16, -722521979);
        b = hhh(b, c, d, a, k[6], 23, 76029189);
        a = hhh(a, b, c, d, k[9], 4, -640364487);
        d = hhh(d, a, b, c, k[12], 11, -421815835);
        c = hhh(c, d, a, b, k[15], 16, 530742520);
        b = hhh(b, c, d, a, k[2], 23, -995338651);
        var iii = ii.bind(null, fn);
        a = iii(a, b, c, d, k[0], 6, -198630844);
        d = iii(d, a, b, c, k[7], 10, 1126891415);
        c = iii(c, d, a, b, k[14], 15, -1416354905);
        b = iii(b, c, d, a, k[5], 21, -57434055);
        a = iii(a, b, c, d, k[12], 6, 1700485571);
        d = iii(d, a, b, c, k[3], 10, -1894986606);
        c = iii(c, d, a, b, k[10], 15, -1051523);
        b = iii(b, c, d, a, k[1], 21, -2054922799);
        a = iii(a, b, c, d, k[8], 6, 1873313359);
        d = iii(d, a, b, c, k[15], 10, -30611744);
        c = iii(c, d, a, b, k[6], 15, -1560198380);
        b = iii(b, c, d, a, k[13], 21, 1309151649);
        a = iii(a, b, c, d, k[4], 6, -145523070);
        d = iii(d, a, b, c, k[11], 10, -1120210379);
        c = iii(c, d, a, b, k[2], 15, 718787259);
        b = iii(b, c, d, a, k[9], 21, -343485551);
        x[0] = fn(a, x[0]);
        x[1] = fn(b, x[1]);
        x[2] = fn(c, x[2]);
        x[3] = fn(d, x[3]);
    }
    // src/md51.ts
    function strToUTF8Bytes(s) {
        var bytes = [];
        for(var i = 0; i < s.length; i++){
            var code = s.charCodeAt(i);
            if (code >= 55296 && code <= 56319 && i + 1 < s.length) {
                var next = s.charCodeAt(i + 1);
                if (next >= 56320 && next <= 57343) {
                    code = (code - 55296 << 10) + (next - 56320) + 65536;
                    i++;
                }
            }
            if (code <= 127) {
                bytes.push(code);
            } else if (code <= 2047) {
                bytes.push(192 | code >> 6);
                bytes.push(128 | code & 63);
            } else if (code <= 65535) {
                bytes.push(224 | code >> 12);
                bytes.push(128 | code >> 6 & 63);
                bytes.push(128 | code & 63);
            } else {
                bytes.push(240 | code >> 18);
                bytes.push(128 | code >> 12 & 63);
                bytes.push(128 | code >> 6 & 63);
                bytes.push(128 | code & 63);
            }
        }
        return bytes;
    }
    function uint8ArrayToNumberArray(bytes) {
        var result = [];
        for(var i = 0; i < 16; i++){
            result[i] = bytes[i * 4] + (bytes[i * 4 + 1] << 8) + (bytes[i * 4 + 2] << 16) + (bytes[i * 4 + 3] << 24);
        }
        return result;
    }
    function md51(s, add322) {
        var bytes = strToUTF8Bytes(s);
        var n = bytes.length;
        var state = [
            1732584193,
            -271733879,
            -1732584194,
            271733878
        ];
        var i;
        for(i = 64; i <= n; i += 64){
            var block = bytes.slice(i - 64, i);
            md5cycle(state, uint8ArrayToNumberArray(block), add322);
        }
        var remainder = bytes.slice(i - 64);
        var tail = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ];
        var sl = remainder.length;
        for(i = 0; i < sl; i++){
            tail[i >> 2] |= remainder[i] << (i % 4 << 3);
        }
        tail[i >> 2] |= 128 << (i % 4 << 3);
        if (i > 55) {
            md5cycle(state, tail, add322);
            i = 16;
            while(i--){
                tail[i] = 0;
            }
        }
        tail[14] = n * 8;
        md5cycle(state, tail, add322);
        return state;
    }
    // src/md5.ts
    function md5(data) {
        return hex(md51(data, add32));
    }
    exports.md5 = md5;
    return exports;
}({});
