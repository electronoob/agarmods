(function(){
    var elements = document.getElementsByTagName("script");
    var s = elements[elements.length-2]
    s.remove();
})();

(function(h, r) {
    function ta() {
        ea();
        setInterval(ea, 18E4);
        A = X = document.getElementById("canvas");
        d = A.getContext("2d");
        A.onmousedown = function(a) {
            if (fa) {
                var b = a.clientX - (5 + k / 5 / 2), c = a.clientY - (5 + k / 5 / 2);
                if (Math.sqrt(b * b + c * c) <= k / 5 / 2) {
                    J();
                    B(17);
                    return
                }
            }
            mouseX = a.clientX;
            mouseY = a.clientY;
            convertMouse();
            J()
        };
        A.onmousemove = function(a) {
            mouseX = a.clientX;
            mouseY = a.clientY;
            convertMouse()
        };
        A.onmouseup = function(a) {
        };
        var a = !1, b = !1, c = !1;
        h.onkeydown = function(e) {
            32 != e.keyCode || a || (J(), B(17), a = !0);
            81 != e.keyCode || b || (B(18), b = !0);
            87 != e.keyCode || c || (J(), B(21), c = !0);
            27 == e.keyCode && r("#overlays").fadeIn(200)
        };
        h.onkeyup = function(e) {
            32 == e.keyCode && (a = !1);
            87 == e.keyCode && (c = !1);
            81 == e.keyCode && b && (B(19), b = !1)
        };
        h.onblur = function() {
            B(19);
            c = b = a = !1
        };
        h.onresize = resize;
        resize();
        h.requestAnimationFrame ? h.requestAnimationFrame(render) : setInterval(Z, 1E3 / 60);
        setInterval(J, 100);
        ia(r("#region").val())
    }
    function ua() {
        if (.5 > g)
            K = null;
        else {
            for (
                var a = Number.POSITIVE_INFINITY, 
                b = Number.POSITIVE_INFINITY, 
                c = Number.NEGATIVE_INFINITY, 
                e = Number.NEGATIVE_INFINITY, 
                d = 0, 
                f = 0; 
                //
                f < p.length; 
                //
                f++
            )
                p[f].shouldRender() && 
                (
                    d = Math.max(
                        p[f].size,
                        d
                    ), 
                    a = Math.min(p[f].x, a), 
                    b = Math.min(p[f].y, b), 
                    c = Math.max(p[f].x, c), 
                    e = Math.max(p[f].y, e)
                );
            K = QUAD.init({
                minX: a - (d + 100),
                minY: b - (d + 100),
                maxX: c + (d + 100),
                maxY: e + (d + 100)
            });
            for (f = 0; f < p.length; f++)
                if (a = p[f], a.shouldRender())
                    for (b = 0; b < a.points.length; ++b)
                        K.insert(a.points[b])
        }
    }
    function convertMouse() {
        //Real mouse positions
        realMouseX = (mouseX - k / 2) / g + s;
        realMouseY = (mouseY - q / 2) / g + t
    }
    function ea() {
        null == S && (S = {}, r("#region").children().each(function() {
            var a = r(this), b = a.val();
            b && (S[b] = a.text())
        }));
        r.get("http://m.agar.io/info", function(a) {
            for (var b in a.regions)
                r('#region option[value="' + 
                b + '"]').text(S[b] + " (" + a.regions[b].numPlayers + " players)")
        }, "json")
    }
    function ja() {
        r("#adsBottom").hide();
        r("#overlays").hide()
    }
    function ia(a) {
        a && a != $ && ($ = a, ka())
    }
    function la() {
        r.ajax("http://m.agar.io/", {error: function() {
                setTimeout(la, 1E3)
            },success: function(a) {
                a = a.split("\n");
                ma("ws://" + a[0])
            },dataType: "text",method: "POST",cache: !1,crossDomain: !0,data: $ || "?"})
    }
    function ka() {
        r("#connecting").show();
        la()
    }
    function ma(a) {
        l && (l.onopen = null, l.onmessage = null, l.onclose = null, l.close(), l = null);
        C = [];
        m = [];
        v = {};
        p = [];
        D = [];
        w = [];
        console.log("Connecting to " + a);
        l = new WebSocket(a);
        l.binaryType = "arraybuffer";
        l.onopen = va;
        l.onmessage = wa;
        l.onclose = xa;
        l.onerror = function() {
            console.log("socket error")
        }
    }
    function va(a) {
        r("#connecting").hide();
        console.log("socket open");
        a = new ArrayBuffer(5);
        var b = new DataView(a);
        b.setUint8(0, 255);
        b.setUint32(1, 1, !0);
        l.send(a);
        na()
    }
    function xa(a) {
        console.log("socket close");
        setTimeout(ka, 500)
    }
    function wa(a) {
        function b() {
            for (var a = ""; ; ) {
                var b = e.getUint16(c, !0);
                c += 2;
                if (0 == b)
                    break;
                a += String.fromCharCode(b)
            }
            return a
        }
        var c = 1, e = new DataView(a.data);
        switch (e.getUint8(0)) {
            case 16:
                ya(e);
                break;
            case 17:
                x = e.getFloat64(1, !0);
                y = e.getFloat64(9, !0);
                L = e.getFloat64(17, !0);
                break;
            case 20:
                m = [];
                C = [];
                break;
            case 32:
                C.push(e.getUint32(1, !0));
                break;
            case 49:
                a = e.getUint32(c, !0);
                c += 4;
                w = [];
                for (var d = 0; d < a; ++d) {
                    var f = e.getUint32(c, !0), c = c + 4;
                    w.push({id: f,name: b()})
                }
                renderLeaderboard();
                break;
            case 64:
                E = e.getFloat64(1, !0), F = e.getFloat64(9, !0), G = e.getFloat64(17, !0), H = e.getFloat64(25, !0), x = (G + E) / 2, y = (H + F) / 2, L = 1, 0 == m.length && (s = x, t = y, g = L)
        }
    }
    function ya(a) {
        I = 
        +new Date;
        var b = Math.random(), c = 1;
        aa = !1;
        for (var e = a.getUint16(c, !0), c = c + 2, d = 0; d < e; ++d) {
            var f = v[a.getUint32(c, !0)], g = v[a.getUint32(c + 4, !0)], c = c + 8;
            f && g && (g.destroy(), g.ox = g.x, g.oy = g.y, g.oSize = g.size, g.nx = f.x, g.ny = f.y, g.nSize = g.size, g.updateTime = I)
        }
        for (; ; ) {
            e = a.getUint32(c, !0);
            c += 4;
            if (0 == e)
                break;
            d = a.getFloat64(c, !0);
            c += 8;
            f = a.getFloat64(c, !0);
            c += 8;
            g = a.getFloat64(c, !0);
            c += 8;
            a.getUint8(c++);
            for (var h = a.getUint8(c++), l = a.getUint8(c++), k = a.getUint8(c++), h = (h << 16 | l << 8 | k).toString(16); 6 > h.length; )
                h = "0" + h;
            h = "#" + h;
            k = a.getUint8(c++);
            l = !!(k & 1);
            k & 2 && (c += 4);
            k & 4 && (c += 8);
            k & 8 && (c += 16);
            for (k = ""; ; ) {
                var n = a.getUint16(c, !0), c = c + 2;
                if (0 == n)
                    break;
                k += String.fromCharCode(n)
            }
            n = null;
            v.hasOwnProperty(e) ? (n = v[e], n.updatePos(), n.ox = n.x, n.oy = n.y, n.oSize = n.size, n.color = h) : (n = new oa(e, d, f, g, h, l, k), n.pX = d, n.pY = f);
            n.nx = d;
            n.ny = f;
            n.nSize = g;
            n.updateCode = b;
            n.updateTime = I;
            -1 != C.indexOf(e) && -1 == m.indexOf(n) && (document.getElementById("overlays").style.display = "none", m.push(n), 1 == m.length && (s = n.x, t = n.y))
        }
        a.getUint16(c, !0);
        c += 2;
        f = a.getUint32(c, !0);
        c += 4;
        for (d = 0; d < f; d++)
            e = a.getUint32(c, !0), c += 4, v[e] && (v[e].updateCode = b);
        for (d = 0; d < p.length; d++)
            p[d].updateCode != b && p[d--].destroy();
        aa && 0 == m.length && r("#overlays").fadeIn(3E3)
    }
    function J() {
        if (null != l && l.readyState == l.OPEN) {
            var a = mouseX - k / 2, b = mouseY - q / 2;
            //Sends mouse?
            64 > a * a + b * b || 
            pa == realMouseX && qa == realMouseY || 
            (
                pa = realMouseX, 
                qa = realMouseY, 
                a = new ArrayBuffer(21), 
                b = new DataView(a), 
                b.setUint8(0, 16), 
                b.setFloat64(1, realMouseX, !0), 
                b.setFloat64(9, realMouseY, !0), 
                b.setUint32(17, 0, !0),
                l.send(a)
            )
        }
    }
    //Send name + Join
    function na() {
        if (null != l && l.readyState == l.OPEN && null != M) {
            var a = new ArrayBuffer(1 + 2 * M.length), b = new DataView(a);
            b.setUint8(0, 0);
            for (var c = 0; c < M.length; ++c)
                b.setUint16(1 + 2 * c, M.charCodeAt(c), !0);
            l.send(a)
        }
    }
    //Sends keys? D:
    function B(a) {
        if (null != l && l.readyState == l.OPEN) {
            var b = new ArrayBuffer(1);
            (new DataView(b)).setUint8(0, a);
            l.send(b)
        }
    }
    function render() {
        renderFrame();
        h.requestAnimationFrame(render)
    }
    function resize() {
        k = h.innerWidth;

        q = h.innerHeight;
        X.width = A.width = k;
        X.height = A.height = q;
        renderFrame()
    }
    function Aa() {
        if (0 != m.length) {
            for (var a = 0, b = 0; b < m.length; b++)
                a += m[b].size;
            a = Math.pow(Math.min(64 / a, 1), .4) * Math.max(q / 1080, k / 1920);
            g = (9 * g + a) / 10
        }
    }
    //Renders frame (every tick?)
    function renderFrame() {
        var a = +new Date;
        ++Ba;
        I = +new Date;
        if (0 < m.length) {
            Aa();
            for (var b = 0, c = 0, e = 0; e < m.length; e++)
                m[e].updatePos(), b += m[e].x / m.length, c += m[e].y / m.length;
            x = b;
            y = c;
            L = g;
            s = (s + b) / 2;
            t = (t + c) / 2
        } else
            x > G - (k / 2 - 100) / g && (x = G - (k / 2 - 100) / g), y > H - (q / 2 - 100) / g && (y = H - (q / 2 - 100) / g), x < E + (k / 2 - 100) / g && (x = (E + k / 2 - 100) / g), y < F + (q / 2 - 100) / g && (y = (F + q / 2 - 100) / g), s = (29 * s + x) / 30, t = (29 * t + y) / 30, g = (9 * g + L) / 10;
        ua();
        convertMouse();
        //Rendering
        this.minimap=false;
        renderInternals(s, t, k, q, g);
        renderScore(s,t);

        d.save();
        d.translate(k - 500, 10);
        this.minimap=true;
        renderInternals(s, t, 290, 200, .1, true);//Minimap

        d.restore();

        Da();
        a = +new Date - a;
        a > 1E3 / 60 ? u -= .01 : a < 1E3 / 65 && (u += .01);
        .4 > u && (u = .4);
        1 < u && (u = 1)
    }
    //s, t, k, q, g
    function renderInternals(x, y, width, height, scale, disableLines){
        d.clearRect(0, 0, width, height);
        d.fillStyle = ba ? "#111111" : "#F2FBFF";
        d.fillRect(0, 0, width, height);
        //Lines
        if(!disableLines)
            renderLines(x, y, scale, width / scale, height / scale);
        renderPlayers(x, y, width, height, scale);
        z && 0 != w.length && d.drawImage(z, k - z.width - 10, 10);


    }

    function renderLines(x, y, scale, b, c){
        d.save();
        d.strokeStyle = ba ? "#AAAAAA" : "#000000";
        d.globalAlpha = .2;
        d.scale(scale, scale);
        for (e = -.5 + (-x + b / 2) % 50; e < b; e += 50)
                d.beginPath(), d.moveTo(e, 0), d.lineTo(e, c), d.stroke();
            for (e = -.5 + (-y + c / 2) % 50; e < c; e += 50)
                d.beginPath(), d.moveTo(0, e), d.lineTo(b, e), d.stroke();


        d.restore();
    }
    function renderPlayers(x, y, width, height, scale){
        p.sort(function(a, b) {
            return a.size == b.size ? a.id - b.id : a.size - b.size
        });
        d.save();
        d.translate(width / 2, height / 2);
        d.scale(scale, scale);
        d.translate(-x, -y);

        for (e = 0; e < D.length; e++)

            D[e].draw(x, y, scale);

        for (e = 0; e < p.length; e++)
            p[e].draw(x, y, scale);
        d.restore();
    }
    //score here. Nice?
    function renderScore(x,y){
        //TODO make coords
        N = Math.max(N, Ca());
        0 != N && 
        (
            null == T && 
            (T = new U(24, "#FFFFFF")), 
            T.setValue("Score: " + ~~(N / 100)+" X: "+(~~x)+" Y: "+(~~y)),
            c = T.render(), 
            b = c.width,
            d.globalAlpha = .2, 
            d.fillStyle = "#000000", 
            d.fillRect(10, q - 10 - 24 - 10, b + 10, 34), 
            d.globalAlpha = 1, 
            d.drawImage(c, 15, q - 10 - 24 - 5)
        );
    }
    function Da() {
        if (fa && ca.width) {
            var a = k / 5;
            d.drawImage(ca, 5, 5, a, a)
        }
    }
    function Ca() {
        for (var a = 0, b = 0; b < m.length; b++)
            a += m[b].nSize * m[b].nSize;
        return a
    }
    function renderLeaderboard() {
        if (0 != w.length)
            if (V) {
                z = document.createElement("canvas");
                var a = z.getContext("2d"), b = 60 + 24 * w.length, c = Math.min(200, .3 * k) / 200;
                z.width = 200 * c;
                z.height = b * c;
                a.scale(c, c);
                a.globalAlpha = .4;
                a.fillStyle = "#000000";
                a.fillRect(0, 0, 200, b);
                a.globalAlpha = 1;
                a.fillStyle = "#FFFFFF";
                c = null;
                c = "Leaderboard";
                a.font = "30px Ubuntu";
                a.fillText(c, 100 - a.measureText(c).width / 2, 40);
                a.font = "20px Ubuntu";
                for (b = 0; b < w.length; ++b)
                    c = w[b].name || "An unnamed cell", V || (c = "An unnamed cell"), -1 != C.indexOf(w[b].id) ? (m[0].name && (c = m[0].name), a.fillStyle = "#FFAAAA") : a.fillStyle = "#FFFFFF", c = b + 1 + ". " + 
                    c, a.fillText(c, 100 - a.measureText(c).width / 2, 70 + 24 * b)
            } else
                z = null
    }
    function oa(a, b, c, e, d, f, g) {
        p.push(this);
        v[a] = this;
        this.id = a;
        this.ox = this.x = b;
        this.oy = this.y = c;
        this.oSize = this.size = e;
        this.color = d;
        this.isVirus = f;
        this.points = [];
        this.pointsAcc = [];
        this.createPoints();
        this.setName(g)
    }
    function U(a, b, c, e) {
        a && (this._size = a);
        b && (this._color = b);
        this._stroke = !!c;
        e && (this._strokeColor = e)
    }
    if ("agar.io" != h.location.hostname && "localhost" != h.location.hostname && "10.10.2.13" != h.location.hostname)
        h.location = "http://agar.io/";
    else if (h.top != h)
        h.top.location = "http://agar.io/";
    else {
        var X, d, A, k, q, K = null, l = null, s = 0, t = 0, C = [], m = [], v = {}, p = [], D = [], w = [], mouseX = 0, mouseY = 0, realMouseX = -1, realMouseY = -1, Ba = 0, I = 0, M = null, E = 0, F = 0, G = 1E4, H = 1E4, g = 1, $ = null, ra = !0, V = !0, da = !1, aa = !1, N = 0, ba = !1, sa = !1, x = s = ~~((E + G) / 2), y = t = ~~((F + H) / 2), L = 1, fa = "ontouchstart" in h && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), ca = new Image;
        ca.src = "img/split.png";
        var S = null;
        h.setNick = function(a) {
            ja();
            M = a;
            na();
            N = 0
        };
        h.setRegion = ia;
        h.setSkins = function(a) {
            ra = 
            a
        };
        h.setNames = function(a) {
            V = a
        };
        h.setDarkTheme = function(a) {
            ba = a
        };
        h.setColors = function(a) {
            da = a
        };
        h.setShowMass = function(a) {
            sa = a
        };
        h.spectate = function() {
            B(1);
            ja()
        };
        h.connect = ma;
        var pa = -1, qa = -1, z = null, u = 1, T = null, W = {}, Ea = "poland;usa;china;russia;canada;australia;spain;brazil;germany;ukraine;france;sweden;hitler;north korea;south korea;japan;united kingdom;earth;greece;latvia;lithuania;estonia;finland;norway;cia;maldivas;austria;nigeria;reddit;yaranaika;confederate;9gag;indiana;4chan;italy;ussr;pewdiepie;bulgaria;tumblr;2ch.hk;hong kong;portugal;jamaica;german empire;mexico;sanik;switzerland;croatia;chile;indonesia;bangladesh;thailand;iran;iraq;peru;moon;botswana;bosnia;netherlands;european union;taiwan;pakistan;hungary;satanist;qing dynasty;nazi;matriarchy;patriarchy;feminism;ireland;texas;facepunch;prodota;cambodia;steam;piccolo;ea;india;kc;denmark;quebec;ayy lmao;sealand;bait;tsarist russia;origin;vinesauce;stalin;belgium;luxembourg;stussy;prussia;8ch;argentina;scotland;sir;romania;belarus;wojak;isis;doge;nasa;byzantium;imperial japan;kingdom of france;somalia;turkey;mars;pokerface".split(";"), Fa = ["m'blob"];
        oa.prototype = {id: 0,points: null,pointsAcc: null,name: null,nameCache: null,sizeCache: null,x: 0,y: 0,size: 0,ox: 0,oy: 0,oSize: 0,nx: 0,ny: 0,nSize: 0,updateTime: 0,updateCode: 0,drawTime: 0,destroyed: !1,isVirus: !1,destroy: function() {
                var a;
                for (a = 0; a < p.length; a++)
                    if (p[a] == this) {
                        p.splice(a, 1);
                        break
                    }
                delete v[this.id];
                a = m.indexOf(this);
                -1 != a && (aa = !0, m.splice(a, 1));
                a = C.indexOf(this.id);
                -1 != a && C.splice(a, 1);
                this.destroyed = !0;
                D.push(this)
            },getNameSize: function() {
                return Math.max(~~(.3 * this.size), 24)
            },setName: function(a) {
                if (this.name = a)
                    null == this.nameCache ? this.nameCache = new U(this.getNameSize(), "#FFFFFF", !0, "#000000") : this.nameCache.setSize(this.getNameSize()), this.nameCache.setValue(this.name)
            },createPoints: function() {
                for (var a = this.getNumPoints(); this.points.length > a; ) {
                    var b = ~~(Math.random() * this.points.length);
                    this.points.splice(b, 1);
                    this.pointsAcc.splice(b, 1)
                }
                0 == this.points.length && 0 < a && (this.points.push({c: this,v: this.size,x: this.x,y: this.y}), this.pointsAcc.push(Math.random() - .5));
                for (; this.points.length < a; ) {
                    var b = ~~(Math.random() * this.points.length), c = this.points[b];
                    this.points.splice(b, 0, {c: this,v: c.v,x: c.x,y: c.y});
                    this.pointsAcc.splice(b, 0, this.pointsAcc[b])
                }
            },getNumPoints: function() {
                var a = 10;
                20 > this.size && (a = 5);
                this.isVirus && (a = 30);
                return ~~Math.max(this.size * g * (this.isVirus ? Math.min(2 * u, 1) : u), a)
            },movePoints: function() {
                this.createPoints();
                for (var a = this.points, b = this.pointsAcc, c = b.concat(), e = a.concat(), d = e.length, f = 0; f < d; ++f) {
                    var g = c[(f - 1 + d) % d], h = c[(f + 1) % d];
                    b[f] += Math.random() - .5;
                    b[f] *= .7;
                    10 < b[f] && (b[f] = 10);
                    -10 > b[f] && (b[f] = -10);
                    b[f] = (g + h + 8 * b[f]) / 10
                }
                for (var k = this, f = 0; f < d; ++f) {
                    c = e[f].v;
                    g = e[(f - 1 + d) % d].v;
                    h = e[(f + 1) % d].v;
                    if (15 < this.size && null != K) {
                        var l = !1, n = a[f].x, m = a[f].y;
                        K.retrieve2(n - 5, m - 5, 10, 10, function(a) {
                            a.c != k && 25 > (n - a.x) * (n - a.x) + (m - a.y) * (m - a.y) && (l = !0)
                        });
                        !l && (a[f].x < E || a[f].y < F || a[f].x > G || a[f].y > H) && (l = !0);
                        l && (0 < b[f] && (b[f] = 0), b[f] -= 1)
                    }
                    c += b[f];
                    0 > c && (c = 0);
                    c = (12 * c + this.size) / 13;
                    a[f].v = (g + h + 8 * c) / 10;
                    g = 2 * Math.PI / d;
                    h = this.points[f].v;
                    this.isVirus && 0 == f % 2 && (h += 5);
                    a[f].x = this.x + Math.cos(g * f) * h;
                    a[f].y = this.y + Math.sin(g * f) * 
                    h
                }
            },updatePos: function() {
                var a;
                a = (I - this.updateTime) / 120;
                a = 0 > a ? 0 : 1 < a ? 1 : a;
                a = a * a * (3 - 2 * a);
                this.getNameSize();
                if (this.destroyed && 1 <= a) {
                    var b = D.indexOf(this);
                    -1 != b && D.splice(b, 1)
                }
                this.x = a * (this.nx - this.ox) + this.ox;
                this.y = a * (this.ny - this.oy) + this.oy;
                this.size = a * (this.nSize - this.oSize) + this.oSize;
                return a
            },shouldRender: function(x, y, width, height, scale) {
                return this.x + this.size + 40 < x - width / 2 / scale || this.y + this.size + 40 < y - height / 2 / scale || this.x - this.size - 40 > x + width / 2 / scale || this.y - this.size - 40 > y + height / 2 / scale ? !1 : !0
            },draw: function(x, y, width, height, scale) {
                if (this.shouldRender(x, y, width, height, scale)&&(!minimap||~~(this.size * this.size / 100)!=1)) {//Should i render? Is it minimap?
                    //renders viruses/players here

                    var a = !this.isVirus && 
                    .5 > scale;
                    d.save();
                    this.drawTime = I;
                    var b = this.updatePos();
                    this.destroyed && (d.globalAlpha *= 1 - b);
                    d.lineWidth = 10;
                    d.lineCap = "round";
                    d.lineJoin = this.isVirus ? "mitter" : "round";
                    da ? (d.fillStyle = "#FFFFFF", d.strokeStyle = "#AAAAAA") : (d.fillStyle = this.color, d.strokeStyle = this.color);
                    if (a)
                        d.beginPath(), d.arc(this.x, this.y, this.size, 0, 2 * Math.PI, !1);
                    else {
                        this.movePoints();
                        d.beginPath();
                        b = this.getNumPoints();
                        d.moveTo(this.points[0].x, this.points[0].y);
                        for (var c = 1; c <= b; ++c) {
                            var e = c % b;
                            d.lineTo(this.points[e].x, this.points[e].y)
                        }
                    }
                    d.closePath();
                    b = this.name.toLowerCase();


                    ra ? -1 != Ea.indexOf(b) ? (W.hasOwnProperty(b) || (W[b] = new Image, W[b].src = "skins/" + b + ".png"), c = W[b]) : c = null : c = null;
                    if(b.substr(0,6)=="[rddt]"){
                        ra=(W.hasOwnProperty(b) || (W[b] = new Image, W[b].src = "http://frohenk.byethost7.com/agarmods-722a016be242fb83057af5f749d7b11721798921/reddit.png"), c = W[b]);


                    }


                    b = c ? -1 != Fa.indexOf(b) : !1;
                    a || d.stroke();
                    d.fill();
                    null != c && 0 < c.width && !b && (d.save(), d.clip(), d.drawImage(c, this.x - this.size, this.y - this.size, 2 * this.size, 2 * this.size), d.restore());
                    (da || 15 < this.size) && !a && (d.strokeStyle = "#000000", d.globalAlpha *= .1, d.stroke());
                    d.globalAlpha = 1;
                    null != c && 0 < c.width && b && d.drawImage(c, this.x - 2 * this.size, this.y - 2 * this.size, 4 * this.size, 4 * this.size);
                    c = -1 != m.indexOf(this);
                    a = ~~this.y;
                    if ((V || c) && this.name && this.nameCache) {
                    //draws name
                        e = this.nameCache;
                        e.setValue(this.name);

                        e.setSize(this.getNameSize());
                        b = Math.ceil(10 * g) / 10;
                        e.setScale(b);


                        var e = e.render(), h = ~~(e.width / b), f = ~~(e.height / b);

                        d.drawImage(e, ~~this.x - ~~(h / 2), a - ~~(f / 2), h, f);
                        a += e.height / 2 / b + 4
                    }
                    //Value "-1 != m.indexOf(this)" says is it player

                    (
                        null == this.sizeCache && 
                        (
                            this.sizeCache = new U(
                                this.getNameSize() / 2,
                                "#FFFFFF", 
                                !0, 
                                "#000000"
                            )
                        ), 

//draws points or mass mass
                            c = this.sizeCache,
                        c.setSize(this.getNameSize() / 2),
                            (sa? c.setValue(~~(this.size * this.size / 100)) : c.setValue(~~this.size)),
                                b = Math.ceil(10 * g) / 10,
                        c.setScale(b), 
                        e = c.render(), 
                        h = ~~(e.width / b), 
                        f = ~~(e.height / b), 
                        d.drawImage(
                            e, 
                            ~~this.x - ~~(h / 2), 
                            a - ~~(f / 2), 
                            h, 
                            f
                        )
                    );
                    d.restore()
                }
            }};
        U.prototype = {_value: "",_color: "#000000",_stroke: !1,_strokeColor: "#000000",_size: 16,_canvas: null,_ctx: null,_dirty: !1,_scale: 1,setSize: function(a) {
                this._size != a && (this._size = a, this._dirty = !0)
            },setScale: function(a) {
                this._scale != a && (this._scale = a, this._dirty = !0)
            },setColor: function(a) {
                this._color != a && (this._color = a, this._dirty = !0)
            },setStroke: function(a) {
                this._stroke != a && (this._stroke = a, this._dirty = !0)
            },setStrokeColor: function(a) {
                this._strokeColor != a && (this._strokeColor = a, this._dirty = !0)
            },setValue: function(a) {
                a != this._value && (this._value = a, this._dirty = !0)
            },render: function() {
                null == this._canvas && (this._canvas = document.createElement("canvas"), this._ctx = this._canvas.getContext("2d"));
                if (this._dirty) {
                    this._dirty = !1;
                    var a = this._canvas, b = this._ctx, c = this._value, d = this._scale, g = this._size, f = g + "px Ubuntu";
                    b.font = f;
                    var h = b.measureText(c).width, k = ~~(.2 * g);
                    a.width = (h + 6) * d;
                    a.height = (g + k) * d;
                    b.font = f;
                    b.scale(d, d);
                    b.globalAlpha = 1;
                    b.lineWidth = 3;
                    b.strokeStyle = this._strokeColor;
                    b.fillStyle = this._color;
                    this._stroke && b.strokeText(c, 3, g - k / 2);
                    b.fillText(c + " - " + g, 3, g - k / 2)
                }
                return this._canvas
            }};
        h.onload = ta
    }
})(window, jQuery);
