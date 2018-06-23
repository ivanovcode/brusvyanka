    $(function() {
        var $ = jQuery = jquery_2_1_4;
        jQuery.effects || function(e, t) {
                var i = e.uiBackCompat !== !1,
                    n = "ui-effects-";
                e.effects = {
                        effect: {}
                    },
                    function(t, i) {
                        function n(e, t, i) {
                            var n = d[t.type] || {};
                            return null == e ? i || !t.def ? null : t.def : (e = n.floor ? ~~e : parseFloat(e), isNaN(e) ? t.def : n.mod ? (e + n.mod) % n.mod : 0 > e ? 0 : e > n.max ? n.max : e)
                        }

                        function s(e) {
                            var n = u(),
                                s = n._rgba = [];
                            return e = e.toLowerCase(), m(l, function(t, o) {
                                var r, a = o.re.exec(e),
                                    c = a && o.parse(a),
                                    l = o.space || "rgba";
                                return c ? (r = n[l](c), n[f[l].cache] = r[f[l].cache], s = n._rgba = r._rgba, !1) : i
                            }), s.length ? ("0,0,0,0" === s.join() && t.extend(s, r.transparent), n) : r[e]
                        }

                        function o(e, t, i) {
                            return i = (i + 1) % 1, 1 > 6 * i ? e + 6 * (t - e) * i : 1 > 2 * i ? t : 2 > 3 * i ? e + 6 * (t - e) * (2 / 3 - i) : e
                        }
                        var r, a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor".split(" "),
                            c = /^([\-+])=\s*(\d+\.?\d*)/,
                            l = [{
                                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                                parse: function(e) {
                                    return [e[1], e[2], e[3], e[4]]
                                }
                            }, {
                                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                                parse: function(e) {
                                    return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]]
                                }
                            }, {
                                re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                                parse: function(e) {
                                    return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
                                }
                            }, {
                                re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                                parse: function(e) {
                                    return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
                                }
                            }, {
                                re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                                space: "hsla",
                                parse: function(e) {
                                    return [e[1], e[2] / 100, e[3] / 100, e[4]]
                                }
                            }],
                            u = t.Color = function(e, i, n, s) {
                                return new t.Color.fn.parse(e, i, n, s)
                            },
                            f = {
                                rgba: {
                                    props: {
                                        red: {
                                            idx: 0,
                                            type: "byte"
                                        },
                                        green: {
                                            idx: 1,
                                            type: "byte"
                                        },
                                        blue: {
                                            idx: 2,
                                            type: "byte"
                                        }
                                    }
                                },
                                hsla: {
                                    props: {
                                        hue: {
                                            idx: 0,
                                            type: "degrees"
                                        },
                                        saturation: {
                                            idx: 1,
                                            type: "percent"
                                        },
                                        lightness: {
                                            idx: 2,
                                            type: "percent"
                                        }
                                    }
                                }
                            },
                            d = {
                                byte: {
                                    floor: !0,
                                    max: 255
                                },
                                percent: {
                                    max: 1
                                },
                                degrees: {
                                    mod: 360,
                                    floor: !0
                                }
                            },
                            p = u.support = {},
                            g = t("<p>")[0],
                            m = t.each;
                        g.style.cssText = "background-color:rgba(1,1,1,.5)", p.rgba = g.style.backgroundColor.indexOf("rgba") > -1, m(f, function(e, t) {
                            t.cache = "_" + e, t.props.alpha = {
                                idx: 3,
                                type: "percent",
                                def: 1
                            }
                        }), u.fn = t.extend(u.prototype, {
                            parse: function(o, a, c, l) {
                                if (o === i) return this._rgba = [null, null, null, null], this;
                                (o.jquery || o.nodeType) && (o = t(o).css(a), a = i);
                                var d = this,
                                    p = t.type(o),
                                    g = this._rgba = [];
                                return a !== i && (o = [o, a, c, l], p = "array"), "string" === p ? this.parse(s(o) || r._default) : "array" === p ? (m(f.rgba.props, function(e, t) {
                                    g[t.idx] = n(o[t.idx], t)
                                }), this) : "object" === p ? (o instanceof u ? m(f, function(e, t) {
                                    o[t.cache] && (d[t.cache] = o[t.cache].slice())
                                }) : m(f, function(t, i) {
                                    var s = i.cache;
                                    m(i.props, function(e, t) {
                                        if (!d[s] && i.to) {
                                            if ("alpha" === e || null == o[e]) return;
                                            d[s] = i.to(d._rgba)
                                        }
                                        d[s][t.idx] = n(o[e], t, !0)
                                    }), d[s] && 0 > e.inArray(null, d[s].slice(0, 3)) && (d[s][3] = 1, i.from && (d._rgba = i.from(d[s])))
                                }), this) : i
                            },
                            is: function(e) {
                                var t = u(e),
                                    n = !0,
                                    s = this;
                                return m(f, function(e, o) {
                                    var r, a = t[o.cache];
                                    return a && (r = s[o.cache] || o.to && o.to(s._rgba) || [], m(o.props, function(e, t) {
                                        return null != a[t.idx] ? n = a[t.idx] === r[t.idx] : i
                                    })), n
                                }), n
                            },
                            _space: function() {
                                var e = [],
                                    t = this;
                                return m(f, function(i, n) {
                                    t[n.cache] && e.push(i)
                                }), e.pop()
                            },
                            transition: function(e, t) {
                                var i = u(e),
                                    s = i._space(),
                                    o = f[s],
                                    r = 0 === this.alpha() ? u("transparent") : this,
                                    a = r[o.cache] || o.to(r._rgba),
                                    c = a.slice();
                                return i = i[o.cache], m(o.props, function(e, s) {
                                    var o = s.idx,
                                        r = a[o],
                                        l = i[o],
                                        u = d[s.type] || {};
                                    null !== l && (null === r ? c[o] = l : (u.mod && (l - r > u.mod / 2 ? r += u.mod : r - l > u.mod / 2 && (r -= u.mod)), c[o] = n((l - r) * t + r, s)))
                                }), this[s](c)
                            },
                            blend: function(e) {
                                if (1 === this._rgba[3]) return this;
                                var i = this._rgba.slice(),
                                    n = i.pop(),
                                    s = u(e)._rgba;
                                return u(t.map(i, function(e, t) {
                                    return (1 - n) * s[t] + n * e
                                }))
                            },
                            toRgbaString: function() {
                                var e = "rgba(",
                                    i = t.map(this._rgba, function(e, t) {
                                        return null == e ? t > 2 ? 1 : 0 : e
                                    });
                                return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
                            },
                            toHslaString: function() {
                                var e = "hsla(",
                                    i = t.map(this.hsla(), function(e, t) {
                                        return null == e && (e = t > 2 ? 1 : 0), t && 3 > t && (e = Math.round(100 * e) + "%"), e
                                    });
                                return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
                            },
                            toHexString: function(e) {
                                var i = this._rgba.slice(),
                                    n = i.pop();
                                return e && i.push(~~(255 * n)), "#" + t.map(i, function(e) {
                                    return e = (e || 0).toString(16), 1 === e.length ? "0" + e : e
                                }).join("")
                            },
                            toString: function() {
                                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                            }
                        }), u.fn.parse.prototype = u.fn, f.hsla.to = function(e) {
                            if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
                            var t, i, n = e[0] / 255,
                                s = e[1] / 255,
                                o = e[2] / 255,
                                r = e[3],
                                a = Math.max(n, s, o),
                                c = Math.min(n, s, o),
                                l = a - c,
                                u = a + c,
                                f = .5 * u;
                            return t = c === a ? 0 : n === a ? 60 * (s - o) / l + 360 : s === a ? 60 * (o - n) / l + 120 : 60 * (n - s) / l + 240, i = 0 === f || 1 === f ? f : .5 >= f ? l / u : l / (2 - u), [Math.round(t) % 360, i, f, null == r ? 1 : r]
                        }, f.hsla.from = function(e) {
                            if (null == e[0] || null == e[1] || null == e[2]) return [null, null, null, e[3]];
                            var t = e[0] / 360,
                                i = e[1],
                                n = e[2],
                                s = e[3],
                                r = .5 >= n ? n * (1 + i) : n + i - n * i,
                                a = 2 * n - r;
                            return [Math.round(255 * o(a, r, t + 1 / 3)), Math.round(255 * o(a, r, t)), Math.round(255 * o(a, r, t - 1 / 3)), s]
                        }, m(f, function(e, s) {
                            var o = s.props,
                                r = s.cache,
                                a = s.to,
                                l = s.from;
                            u.fn[e] = function(e) {
                                if (a && !this[r] && (this[r] = a(this._rgba)), e === i) return this[r].slice();
                                var s, c = t.type(e),
                                    f = "array" === c || "object" === c ? e : arguments,
                                    d = this[r].slice();
                                return m(o, function(e, t) {
                                    var i = f["object" === c ? e : t.idx];
                                    null == i && (i = d[t.idx]), d[t.idx] = n(i, t)
                                }), l ? (s = u(l(d)), s[r] = d, s) : u(d)
                            }, m(o, function(i, n) {
                                u.fn[i] || (u.fn[i] = function(s) {
                                    var o, r = t.type(s),
                                        a = "alpha" === i ? this._hsla ? "hsla" : "rgba" : e,
                                        l = this[a](),
                                        u = l[n.idx];
                                    return "undefined" === r ? u : ("function" === r && (s = s.call(this, u), r = t.type(s)), null == s && n.empty ? this : ("string" === r && (o = c.exec(s), o && (s = u + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1))), l[n.idx] = s, this[a](l)))
                                })
                            })
                        }), m(a, function(e, i) {
                            t.cssHooks[i] = {
                                set: function(e, n) {
                                    var o, r, a = "";
                                    if ("string" !== t.type(n) || (o = s(n))) {
                                        if (n = u(o || n), !p.rgba && 1 !== n._rgba[3]) {
                                            for (r = "backgroundColor" === i ? e.parentNode : e;
                                                ("" === a || "transparent" === a) && r && r.style;) try {
                                                a = t.css(r, "backgroundColor"), r = r.parentNode
                                            } catch (e) {}
                                            n = n.blend(a && "transparent" !== a ? a : "_default")
                                        }
                                        n = n.toRgbaString()
                                    }
                                    try {
                                        e.style[i] = n
                                    } catch (e) {}
                                }
                            }, t.fx.step[i] = function(e) {
                                e.colorInit || (e.start = u(e.elem, i), e.end = u(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                            }
                        }), t.cssHooks.borderColor = {
                            expand: function(e) {
                                var t = {};
                                return m(["Top", "Right", "Bottom", "Left"], function(i, n) {
                                    t["border" + n + "Color"] = e
                                }), t
                            }
                        }, r = t.Color.names = {
                            aqua: "#00ffff",
                            black: "#000000",
                            blue: "#0000ff",
                            fuchsia: "#ff00ff",
                            gray: "#808080",
                            green: "#008000",
                            lime: "#00ff00",
                            maroon: "#800000",
                            navy: "#000080",
                            olive: "#808000",
                            purple: "#800080",
                            red: "#ff0000",
                            silver: "#c0c0c0",
                            teal: "#008080",
                            white: "#ffffff",
                            yellow: "#ffff00",
                            transparent: [null, null, null, 0],
                            _default: "#ffffff"
                        }
                    }(jQuery),
                    function() {
                        function i() {
                            var t, i, n = this.ownerDocument.defaultView ? this.ownerDocument.defaultView.getComputedStyle(this, null) : this.currentStyle,
                                s = {};
                            if (n && n.length && n[0] && n[n[0]])
                                for (i = n.length; i--;) t = n[i], "string" == typeof n[t] && (s[e.camelCase(t)] = n[t]);
                            else
                                for (t in n) "string" == typeof n[t] && (s[t] = n[t]);
                            return s
                        }

                        function n(t, i) {
                            var n, s, r = {};
                            for (n in i) s = i[n], t[n] !== s && (o[n] || (e.fx.step[n] || !isNaN(parseFloat(s))) && (r[n] = s));
                            return r
                        }
                        var s = ["add", "remove", "toggle"],
                            o = {
                                border: 1,
                                borderBottom: 1,
                                borderColor: 1,
                                borderLeft: 1,
                                borderRight: 1,
                                borderTop: 1,
                                borderWidth: 1,
                                margin: 1,
                                padding: 1
                            };
                        e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, i) {
                            e.fx.step[i] = function(e) {
                                ("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (jQuery.style(e.elem, i, e.end), e.setAttr = !0)
                            }
                        }), e.effects.animateClass = function(t, o, r, a) {
                            var c = e.speed(o, r, a);
                            return this.queue(function() {
                                var o, r = e(this),
                                    a = r.attr("class") || "",
                                    l = c.children ? r.find("*").andSelf() : r;
                                l = l.map(function() {
                                    var t = e(this);
                                    return {
                                        el: t,
                                        start: i.call(this)
                                    }
                                }), o = function() {
                                    e.each(s, function(e, i) {
                                        t[i] && r[i + "Class"](t[i])
                                    })
                                }, o(), l = l.map(function() {
                                    return this.end = i.call(this.el[0]), this.diff = n(this.start, this.end), this
                                }), r.attr("class", a), l = l.map(function() {
                                    var t = this,
                                        i = e.Deferred(),
                                        n = jQuery.extend({}, c, {
                                            queue: !1,
                                            complete: function() {
                                                i.resolve(t)
                                            }
                                        });
                                    return this.el.animate(this.diff, n), i.promise()
                                }), e.when.apply(e, l.get()).done(function() {
                                    o(), e.each(arguments, function() {
                                        var t = this.el;
                                        e.each(this.diff, function(e) {
                                            t.css(e, "")
                                        })
                                    }), c.complete.call(r[0])
                                })
                            })
                        }, e.fn.extend({
                            _addClass: e.fn.addClass,
                            addClass: function(t, i, n, s) {
                                return i ? e.effects.animateClass.call(this, {
                                    add: t
                                }, i, n, s) : this._addClass(t)
                            },
                            _removeClass: e.fn.removeClass,
                            removeClass: function(t, i, n, s) {
                                return i ? e.effects.animateClass.call(this, {
                                    remove: t
                                }, i, n, s) : this._removeClass(t)
                            },
                            _toggleClass: e.fn.toggleClass,
                            toggleClass: function(i, n, s, o, r) {
                                return "boolean" == typeof n || n === t ? s ? e.effects.animateClass.call(this, n ? {
                                    add: i
                                } : {
                                    remove: i
                                }, s, o, r) : this._toggleClass(i, n) : e.effects.animateClass.call(this, {
                                    toggle: i
                                }, n, s, o)
                            },
                            switchClass: function(t, i, n, s, o) {
                                return e.effects.animateClass.call(this, {
                                    add: i,
                                    remove: t
                                }, n, s, o)
                            }
                        })
                    }(),
                    function() {
                        function s(t, i, n, s) {
                            return e.isPlainObject(t) && (i = t, t = t.effect), t = {
                                effect: t
                            }, null == i && (i = {}), e.isFunction(i) && (s = i, n = null, i = {}), ("number" == typeof i || e.fx.speeds[i]) && (s = n, n = i, i = {}), e.isFunction(n) && (s = n, n = null), i && e.extend(t, i), n = n || i.duration, t.duration = e.fx.off ? 0 : "number" == typeof n ? n : n in e.fx.speeds ? e.fx.speeds[n] : e.fx.speeds._default, t.complete = s || i.complete, t
                        }

                        function o(t) {
                            return !(t && "number" != typeof t && !e.fx.speeds[t]) || "string" == typeof t && !e.effects.effect[t] && (!i || !e.effects[t])
                        }
                        e.extend(e.effects, {
                            version: "1.9.2",
                            save: function(e, t) {
                                for (var i = 0; t.length > i; i++) null !== t[i] && e.data(n + t[i], e[0].style[t[i]])
                            },
                            restore: function(e, i) {
                                var s, o;
                                for (o = 0; i.length > o; o++) null !== i[o] && (s = e.data(n + i[o]), s === t && (s = ""), e.css(i[o], s))
                            },
                            setMode: function(e, t) {
                                return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"), t
                            },
                            getBaseline: function(e, t) {
                                var i, n;
                                switch (e[0]) {
                                    case "top":
                                        i = 0;
                                        break;
                                    case "middle":
                                        i = .5;
                                        break;
                                    case "bottom":
                                        i = 1;
                                        break;
                                    default:
                                        i = e[0] / t.height
                                }
                                switch (e[1]) {
                                    case "left":
                                        n = 0;
                                        break;
                                    case "center":
                                        n = .5;
                                        break;
                                    case "right":
                                        n = 1;
                                        break;
                                    default:
                                        n = e[1] / t.width
                                }
                                return {
                                    x: n,
                                    y: i
                                }
                            },
                            createWrapper: function(t) {
                                if (t.parent().is(".ui-effects-wrapper")) return t.parent();
                                var i = {
                                        width: t.outerWidth(!0),
                                        height: t.outerHeight(!0),
                                        float: t.css("float")
                                    },
                                    n = e("<div></div>").addClass("ui-effects-wrapper").css({
                                        fontSize: "100%",
                                        background: "transparent",
                                        border: "none",
                                        margin: 0,
                                        padding: 0
                                    }),
                                    s = {
                                        width: t.width(),
                                        height: t.height()
                                    },
                                    o = document.activeElement;
                                try {
                                    o.id
                                } catch (e) {
                                    o = document.body
                                }
                                return t.wrap(n), (t[0] === o || e.contains(t[0], o)) && e(o).focus(), n = t.parent(), "static" === t.css("position") ? (n.css({
                                    position: "relative"
                                }), t.css({
                                    position: "relative"
                                })) : (e.extend(i, {
                                    position: t.css("position"),
                                    zIndex: t.css("z-index")
                                }), e.each(["top", "left", "bottom", "right"], function(e, n) {
                                    i[n] = t.css(n), isNaN(parseInt(i[n], 10)) && (i[n] = "auto")
                                }), t.css({
                                    position: "relative",
                                    top: 0,
                                    left: 0,
                                    right: "auto",
                                    bottom: "auto"
                                })), t.css(s), n.css(i).show()
                            },
                            removeWrapper: function(t) {
                                var i = document.activeElement;
                                return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === i || e.contains(t[0], i)) && e(i).focus()), t
                            },
                            setTransition: function(t, i, n, s) {
                                return s = s || {}, e.each(i, function(e, i) {
                                    var o = t.cssUnit(i);
                                    o[0] > 0 && (s[i] = o[0] * n + o[1])
                                }), s
                            }
                        }), e.fn.extend({
                            effect: function() {
                                function t(t) {
                                    function i() {
                                        e.isFunction(o) && o.call(s[0]), e.isFunction(t) && t()
                                    }
                                    var s = e(this),
                                        o = n.complete,
                                        r = n.mode;
                                    (s.is(":hidden") ? "hide" === r : "show" === r) ? i(): a.call(s[0], n, i)
                                }
                                var n = s.apply(this, arguments),
                                    o = n.mode,
                                    r = n.queue,
                                    a = e.effects.effect[n.effect],
                                    c = !a && i && e.effects[n.effect];
                                return e.fx.off || !a && !c ? o ? this[o](n.duration, n.complete) : this.each(function() {
                                    n.complete && n.complete.call(this)
                                }) : a ? r === !1 ? this.each(t) : this.queue(r || "fx", t) : c.call(this, {
                                    options: n,
                                    duration: n.duration,
                                    callback: n.complete,
                                    mode: n.mode
                                })
                            },
                            _show: e.fn.show,
                            show: function(e) {
                                if (o(e)) return this._show.apply(this, arguments);
                                var t = s.apply(this, arguments);
                                return t.mode = "show", this.effect.call(this, t)
                            },
                            _hide: e.fn.hide,
                            hide: function(e) {
                                if (o(e)) return this._hide.apply(this, arguments);
                                var t = s.apply(this, arguments);
                                return t.mode = "hide", this.effect.call(this, t)
                            },
                            __toggle: e.fn.toggle,
                            toggle: function(t) {
                                if (o(t) || "boolean" == typeof t || e.isFunction(t)) return this.__toggle.apply(this, arguments);
                                var i = s.apply(this, arguments);
                                return i.mode = "toggle", this.effect.call(this, i)
                            },
                            cssUnit: function(t) {
                                var i = this.css(t),
                                    n = [];
                                return e.each(["em", "px", "%", "pt"], function(e, t) {
                                    i.indexOf(t) > 0 && (n = [parseFloat(i), t])
                                }), n
                            }
                        })
                    }(),
                    function() {
                        var t = {};
                        e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(e, i) {
                            t[i] = function(t) {
                                return Math.pow(t, e + 2)
                            }
                        }), e.extend(t, {
                            Sine: function(e) {
                                return 1 - Math.cos(e * Math.PI / 2)
                            },
                            Circ: function(e) {
                                return 1 - Math.sqrt(1 - e * e)
                            },
                            Elastic: function(e) {
                                return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
                            },
                            Back: function(e) {
                                return e * e * (3 * e - 2)
                            },
                            Bounce: function(e) {
                                for (var t, i = 4;
                                    ((t = Math.pow(2, --i)) - 1) / 11 > e;);
                                return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
                            }
                        }), e.each(t, function(t, i) {
                            e.easing["easeIn" + t] = i, e.easing["easeOut" + t] = function(e) {
                                return 1 - i(1 - e)
                            }, e.easing["easeInOut" + t] = function(e) {
                                return .5 > e ? i(2 * e) / 2 : 1 - i(-2 * e + 2) / 2
                            }
                        })
                    }()
            }(jQuery),
            function($) {
                function sc_setScroll(e, t, i) {
                    return "transition" == i.transition && "swing" == t && (t = "ease"), {
                        anims: [],
                        duration: e,
                        orgDuration: e,
                        easing: t,
                        startTime: getTime()
                    }
                }

                function sc_startScroll(e, t) {
                    for (var i = 0, n = e.anims.length; i < n; i++) {
                        var s = e.anims[i];
                        s && s[0][t.transition](s[1], e.duration, e.easing, s[2])
                    }
                }

                function sc_stopScroll(e, t) {
                    is_boolean(t) || (t = !0), is_object(e.pre) && sc_stopScroll(e.pre, t);
                    for (var i = 0, n = e.anims.length; i < n; i++) {
                        var s = e.anims[i];
                        s[0].stop(!0), t && (s[0].css(s[1]), is_function(s[2]) && s[2]())
                    }
                    is_object(e.post) && sc_stopScroll(e.post, t)
                }

                function sc_afterScroll(e, t, i) {
                    switch (t && t.remove(), i.fx) {
                        case "fade":
                        case "crossfade":
                        case "cover-fade":
                        case "uncover-fade":
                            e.css("opacity", 1), e.css("filter", "")
                    }
                }

                function sc_fireCallbacks(e, t, i, n, s) {
                    if (t[i] && t[i].call(e, n), s[i].length)
                        for (var o = 0, r = s[i].length; o < r; o++) s[i][o].call(e, n);
                    return []
                }

                function sc_fireQueue(e, t, i) {
                    return t.length && (e.trigger(cf_e(t[0][0], i), t[0][1]), t.shift()), t
                }

                function sc_hideHiddenItems(e) {
                    e.each(function() {
                        var e = $(this);
                        e.data("_cfs_isHidden", e.is(":hidden")).hide()
                    })
                }

                function sc_showHiddenItems(e) {
                    e && e.each(function() {
                        var e = $(this);
                        e.data("_cfs_isHidden") || e.show()
                    })
                }

                function sc_clearTimers(e) {
                    return e.auto && clearTimeout(e.auto), e.progress && clearInterval(e.progress), e
                }

                function sc_mapCallbackArguments(e, t, i, n, s, o, r) {
                    return {
                        width: r.width,
                        height: r.height,
                        items: {
                            old: e,
                            skipped: t,
                            visible: i
                        },
                        scroll: {
                            items: n,
                            direction: s,
                            duration: o
                        }
                    }
                }

                function sc_getDuration(e, t, i, n) {
                    var s = e.duration;
                    return "none" == e.fx ? 0 : ("auto" == s ? s = t.scroll.duration / t.scroll.items * i : s < 10 && (s = n / s), s < 1 ? 0 : ("fade" == e.fx && (s /= 2), Math.round(s)))
                }

                function nv_showNavi(e, t, i) {
                    var n = is_number(e.items.minimum) ? e.items.minimum : e.items.visible + 1;
                    if ("show" == t || "hide" == t) var s = t;
                    else if (n > t) {
                        debug(i, "Not enough items (" + t + " total, " + n + " needed): Hiding navigation.");
                        var s = "hide"
                    } else var s = "show";
                    var o = "show" == s ? "removeClass" : "addClass",
                        r = cf_c("hidden", i);
                    e.auto.button && e.auto.button[s]()[o](r), e.prev.button && e.prev.button[s]()[o](r), e.next.button && e.next.button[s]()[o](r), e.pagination.container && e.pagination.container[s]()[o](r)
                }

                function nv_enableNavi(e, t, i) {
                    if (!e.circular && !e.infinite) {
                        var n = ("removeClass" == t || "addClass" == t) && t,
                            s = cf_c("disabled", i);
                        if (e.auto.button && n && e.auto.button[n](s), e.prev.button) {
                            var o = n || 0 == t ? "addClass" : "removeClass";
                            e.prev.button[o](s)
                        }
                        if (e.next.button) {
                            var o = n || t == e.items.visible ? "addClass" : "removeClass";
                            e.next.button[o](s)
                        }
                    }
                }

                function go_getObject(e, t) {
                    return is_function(t) ? t = t.call(e) : is_undefined(t) && (t = {}), t
                }

                function go_getItemsObject(e, t) {
                    return t = go_getObject(e, t), is_number(t) ? t = {
                        visible: t
                    } : "variable" == t ? t = {
                        visible: t,
                        width: t,
                        height: t
                    } : is_object(t) || (t = {}), t
                }

                function go_getScrollObject(e, t) {
                    return t = go_getObject(e, t), is_number(t) ? t = t <= 50 ? {
                        items: t
                    } : {
                        duration: t
                    } : is_string(t) ? t = {
                        easing: t
                    } : is_object(t) || (t = {}), t
                }

                function go_getNaviObject(e, t) {
                    if (t = go_getObject(e, t), is_string(t)) {
                        var i = cf_getKeyCode(t);
                        t = i == -1 ? $(t) : i
                    }
                    return t
                }

                function go_getAutoObject(e, t) {
                    return t = go_getNaviObject(e, t), is_jquery(t) ? t = {
                        button: t
                    } : is_boolean(t) ? t = {
                        play: t
                    } : is_number(t) && (t = {
                        timeoutDuration: t
                    }), t.progress && (is_string(t.progress) || is_jquery(t.progress)) && (t.progress = {
                        bar: t.progress
                    }), t
                }

                function go_complementAutoObject(e, t) {
                    return is_function(t.button) && (t.button = t.button.call(e)), is_string(t.button) && (t.button = $(t.button)), is_boolean(t.play) || (t.play = !0), is_number(t.delay) || (t.delay = 0), is_undefined(t.pauseOnEvent) && (t.pauseOnEvent = !0), is_boolean(t.pauseOnResize) || (t.pauseOnResize = !0), is_number(t.timeoutDuration) || (t.timeoutDuration = t.duration < 10 ? 2500 : 5 * t.duration), t.progress && (is_function(t.progress.bar) && (t.progress.bar = t.progress.bar.call(e)), is_string(t.progress.bar) && (t.progress.bar = $(t.progress.bar)), t.progress.bar ? (is_function(t.progress.updater) || (t.progress.updater = $.fn.carouFredSel.progressbarUpdater), is_number(t.progress.interval) || (t.progress.interval = 50)) : t.progress = !1), t
                }

                function go_getPrevNextObject(e, t) {
                    return t = go_getNaviObject(e, t), is_jquery(t) ? t = {
                        button: t
                    } : is_number(t) && (t = {
                        key: t
                    }), t
                }

                function go_complementPrevNextObject(e, t) {
                    return is_function(t.button) && (t.button = t.button.call(e)), is_string(t.button) && (t.button = $(t.button)), is_string(t.key) && (t.key = cf_getKeyCode(t.key)), t
                }

                function go_getPaginationObject(e, t) {
                    return t = go_getNaviObject(e, t), is_jquery(t) ? t = {
                        container: t
                    } : is_boolean(t) && (t = {
                        keys: t
                    }), t
                }

                function go_complementPaginationObject(e, t) {
                    return is_function(t.container) && (t.container = t.container.call(e)), is_string(t.container) && (t.container = $(t.container)), is_number(t.items) || (t.items = !1), is_boolean(t.keys) || (t.keys = !1), is_function(t.anchorBuilder) || is_false(t.anchorBuilder) || (t.anchorBuilder = $.fn.carouFredSel.pageAnchorBuilder), is_number(t.deviation) || (t.deviation = 0), t
                }

                function go_getSwipeObject(e, t) {
                    return is_function(t) && (t = t.call(e)), is_undefined(t) && (t = {
                        onTouch: !1
                    }), is_true(t) ? t = {
                        onTouch: t
                    } : is_number(t) && (t = {
                        items: t
                    }), t
                }

                function go_complementSwipeObject(e, t) {
                    return is_boolean(t.onTouch) || (t.onTouch = !0), is_boolean(t.onMouse) || (t.onMouse = !1), is_object(t.options) || (t.options = {}), is_boolean(t.options.triggerOnTouchEnd) || (t.options.triggerOnTouchEnd = !1), t
                }

                function go_getMousewheelObject(e, t) {
                    return is_function(t) && (t = t.call(e)), is_true(t) ? t = {} : is_number(t) ? t = {
                        items: t
                    } : is_undefined(t) && (t = !1), t
                }

                function go_complementMousewheelObject(e, t) {
                    return t
                }

                function gn_getItemIndex(e, t, i, n, s) {
                    if (is_string(e) && (e = $(e, s)), is_object(e) && (e = $(e, s)), is_jquery(e) ? (e = s.children().index(e), is_boolean(i) || (i = !1)) : is_boolean(i) || (i = !0), is_number(e) || (e = 0), is_number(t) || (t = 0), i && (e += n.first), e += t, n.total > 0) {
                        for (; e >= n.total;) e -= n.total;
                        for (; e < 0;) e += n.total
                    }
                    return e
                }

                function gn_getVisibleItemsPrev(e, t, i) {
                    for (var n = 0, s = 0, o = i; o >= 0; o--) {
                        var r = e.eq(o);
                        if (n += r.is(":visible") ? r[t.d.outerWidth](!0) : 0, n > t.maxDimension) return s;
                        0 == o && (o = e.length), s++
                    }
                }

                function gn_getVisibleItemsPrevFilter(e, t, i) {
                    return gn_getItemsPrevFilter(e, t.items.filter, t.items.visibleConf.org, i)
                }

                function gn_getScrollItemsPrevFilter(e, t, i, n) {
                    return gn_getItemsPrevFilter(e, t.items.filter, n, i)
                }

                function gn_getItemsPrevFilter(e, t, i, n) {
                    for (var s = 0, o = 0, r = n, a = e.length; r >= 0; r--) {
                        if (o++, o == a) return o;
                        var c = e.eq(r);
                        if (c.is(t) && (s++, s == i)) return o;
                        0 == r && (r = a)
                    }
                }

                function gn_getVisibleOrg(e, t) {
                    return t.items.visibleConf.org || e.children().slice(0, t.items.visible).filter(t.items.filter).length
                }

                function gn_getVisibleItemsNext(e, t, i) {
                    for (var n = 0, s = 0, o = i, r = e.length - 1; o <= r; o++) {
                        var a = e.eq(o);
                        if (n += a.is(":visible") ? a[t.d.outerWidth](!0) : 0, n > t.maxDimension) return s;
                        if (s++, s == r + 1) return s;
                        o == r && (o = -1)
                    }
                }

                function gn_getVisibleItemsNextTestCircular(e, t, i, n) {
                    var s = gn_getVisibleItemsNext(e, t, i);
                    return t.circular || i + s > n && (s = n - i), s
                }

                function gn_getVisibleItemsNextFilter(e, t, i) {
                    return gn_getItemsNextFilter(e, t.items.filter, t.items.visibleConf.org, i, t.circular)
                }

                function gn_getScrollItemsNextFilter(e, t, i, n) {
                    return gn_getItemsNextFilter(e, t.items.filter, n + 1, i, t.circular) - 1
                }

                function gn_getItemsNextFilter(e, t, i, n, s) {
                    for (var o = 0, r = 0, a = n, c = e.length - 1; a <= c; a++) {
                        if (r++, r >= c) return r;
                        var l = e.eq(a);
                        if (l.is(t) && (o++, o == i)) return r;
                        a == c && (a = -1)
                    }
                }

                function gi_getCurrentItems(e, t) {
                    return e.slice(0, t.items.visible)
                }

                function gi_getOldItemsPrev(e, t, i) {
                    return e.slice(i, t.items.visibleConf.old + i)
                }

                function gi_getNewItemsPrev(e, t) {
                    return e.slice(0, t.items.visible)
                }

                function gi_getOldItemsNext(e, t) {
                    return e.slice(0, t.items.visibleConf.old)
                }

                function gi_getNewItemsNext(e, t, i) {
                    return e.slice(i, t.items.visible + i)
                }

                function sz_storeMargin(e, t, i) {
                    t.usePadding && (is_string(i) || (i = "_cfs_origCssMargin"), e.each(function() {
                        var e = $(this),
                            n = parseInt(e.css(t.d.marginRight), 10);
                        is_number(n) || (n = 0), e.data(i, n)
                    }))
                }

                function sz_resetMargin(e, t, i) {
                    if (t.usePadding) {
                        var n = !!is_boolean(i) && i;
                        is_number(i) || (i = 0), sz_storeMargin(e, t, "_cfs_tempCssMargin"), e.each(function() {
                            var e = $(this);
                            e.css(t.d.marginRight, n ? e.data("_cfs_tempCssMargin") : i + e.data("_cfs_origCssMargin"))
                        })
                    }
                }

                function sz_storeOrigCss(e) {
                    e.each(function() {
                        var e = $(this);
                        e.data("_cfs_origCss", e.attr("style") || "")
                    })
                }

                function sz_restoreOrigCss(e) {
                    e.each(function() {
                        var e = $(this);
                        e.attr("style", e.data("_cfs_origCss") || "")
                    })
                }

                function sz_setResponsiveSizes(e, t) {
                    var i = (e.items.visible, e.items[e.d.width]),
                        n = e[e.d.height],
                        s = is_percentage(n);
                    t.each(function() {
                        var t = $(this),
                            o = i - ms_getPaddingBorderMargin(t, e, "Width");
                        t[e.d.width](o), s && t[e.d.height](ms_getPercentage(o, n))
                    })
                }

                function sz_setSizes(e, t) {
                    var i = e.parent(),
                        n = e.children(),
                        s = gi_getCurrentItems(n, t),
                        o = cf_mapWrapperSizes(ms_getSizes(s, t, !0), t, !1);
                    if (i.css(o), t.usePadding) {
                        var r = t.padding,
                            a = r[t.d[1]];
                        t.align && a < 0 && (a = 0);
                        var c = s.last();
                        c.css(t.d.marginRight, c.data("_cfs_origCssMargin") + a), e.css(t.d.top, r[t.d[0]]), e.css(t.d.left, r[t.d[3]])
                    }
                    return e.css(t.d.width, o[t.d.width] + 2 * ms_getTotalSize(n, t, "width")), e.css(t.d.height, ms_getLargestSize(n, t, "height")), o
                }

                function ms_getSizes(e, t, i) {
                    return [ms_getTotalSize(e, t, "width", i), ms_getLargestSize(e, t, "height", i)]
                }

                function ms_getLargestSize(e, t, i, n) {
                    return is_boolean(n) || (n = !1), is_number(t[t.d[i]]) && n ? t[t.d[i]] : is_number(t.items[t.d[i]]) ? t.items[t.d[i]] : (i = i.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight", ms_getTrueLargestSize(e, t, i))
                }

                function ms_getTrueLargestSize(e, t, i) {
                    for (var n = 0, s = 0, o = e.length; s < o; s++) {
                        var r = e.eq(s),
                            a = r.is(":visible") ? r[t.d[i]](!0) : 0;
                        n < a && (n = a)
                    }
                    return n
                }

                function ms_getTotalSize(e, t, i, n) {
                    if (is_boolean(n) || (n = !1), is_number(t[t.d[i]]) && n) return t[t.d[i]];
                    if (is_number(t.items[t.d[i]])) return t.items[t.d[i]] * e.length;
                    for (var s = i.toLowerCase().indexOf("width") > -1 ? "outerWidth" : "outerHeight", o = 0, r = 0, a = e.length; r < a; r++) {
                        var c = e.eq(r);
                        o += c.is(":visible") ? c[t.d[s]](!0) : 0
                    }
                    return o
                }

                function ms_getParentSize(e, t, i) {
                    var n = e.is(":visible");
                    n && e.hide();
                    var s = e.parent()[t.d[i]]();
                    return n && e.show(), s
                }

                function ms_getMaxDimension(e, t) {
                    return is_number(e[e.d.width]) ? e[e.d.width] : t
                }

                function ms_hasVariableSizes(e, t, i) {
                    for (var n = !1, s = !1, o = 0, r = e.length; o < r; o++) {
                        var a = e.eq(o),
                            c = a.is(":visible") ? a[t.d[i]](!0) : 0;
                        n === !1 ? n = c : n != c && (s = !0), 0 == n && (s = !0)
                    }
                    return s
                }

                function ms_getPaddingBorderMargin(e, t, i) {
                    return e[t.d["outer" + i]](!0) - e[t.d[i.toLowerCase()]]()
                }

                function ms_getPercentage(e, t) {
                    if (is_percentage(t)) {
                        if (t = parseInt(t.slice(0, -1), 10), !is_number(t)) return e;
                        e *= t / 100
                    }
                    return e
                }

                function cf_e(e, t, i, n, s) {
                    return is_boolean(i) || (i = !0), is_boolean(n) || (n = !0), is_boolean(s) || (s = !1), i && (e = t.events.prefix + e), n && (e = e + "." + t.events.namespace), n && s && (e += t.serialNumber), e
                }

                function cf_c(e, t) {
                    return is_string(t.classnames[e]) ? t.classnames[e] : e
                }

                function cf_mapWrapperSizes(e, t, i) {
                    is_boolean(i) || (i = !0);
                    var n = t.usePadding && i ? t.padding : [0, 0, 0, 0],
                        s = {};
                    return s[t.d.width] = e[0] + n[1] + n[3], s[t.d.height] = e[1] + n[0] + n[2], s
                }

                function cf_sortParams(e, t) {
                    for (var i = [], n = 0, s = e.length; n < s; n++)
                        for (var o = 0, r = t.length; o < r; o++)
                            if (t[o].indexOf(typeof e[n]) > -1 && is_undefined(i[o])) {
                                i[o] = e[n];
                                break
                            }
                    return i
                }

                function cf_getPadding(e) {
                    if (is_undefined(e)) return [0, 0, 0, 0];
                    if (is_number(e)) return [e, e, e, e];
                    if (is_string(e) && (e = e.split("px").join("").split("em").join("").split(" ")), !is_array(e)) return [0, 0, 0, 0];
                    for (var t = 0; t < 4; t++) e[t] = parseInt(e[t], 10);
                    switch (e.length) {
                        case 0:
                            return [0, 0, 0, 0];
                        case 1:
                            return [e[0], e[0], e[0], e[0]];
                        case 2:
                            return [e[0], e[1], e[0], e[1]];
                        case 3:
                            return [e[0], e[1], e[2], e[1]];
                        default:
                            return [e[0], e[1], e[2], e[3]]
                    }
                }

                function cf_getAlignPadding(e, t) {
                    var i = is_number(t[t.d.width]) ? Math.ceil(t[t.d.width] - ms_getTotalSize(e, t, "width")) : 0;
                    switch (t.align) {
                        case "left":
                            return [0, i];
                        case "right":
                            return [i, 0];
                        case "center":
                        default:
                            return [Math.ceil(i / 2), Math.floor(i / 2)]
                    }
                }

                function cf_getDimensions(e) {
                    for (var t = [
                            ["width", "innerWidth", "outerWidth", "height", "innerHeight", "outerHeight", "left", "top", "marginRight", 0, 1, 2, 3],
                            ["height", "innerHeight", "outerHeight", "width", "innerWidth", "outerWidth", "top", "left", "marginBottom", 3, 2, 1, 0]
                        ], i = t[0].length, n = "right" == e.direction || "left" == e.direction ? 0 : 1, s = {}, o = 0; o < i; o++) s[t[0][o]] = t[n][o];
                    return s
                }

                function cf_getAdjust(e, t, i, n) {
                    var s = e;
                    if (is_function(i)) s = i.call(n, s);
                    else if (is_string(i)) {
                        var o = i.split("+"),
                            r = i.split("-");
                        if (r.length > o.length) var a = !0,
                            c = r[0],
                            l = r[1];
                        else var a = !1,
                            c = o[0],
                            l = o[1];
                        switch (c) {
                            case "even":
                                s = e % 2 == 1 ? e - 1 : e;
                                break;
                            case "odd":
                                s = e % 2 == 0 ? e - 1 : e;
                                break;
                            default:
                                s = e
                        }
                        l = parseInt(l, 10), is_number(l) && (a && (l = -l), s += l)
                    }
                    return (!is_number(s) || s < 1) && (s = 1), s
                }

                function cf_getItemsAdjust(e, t, i, n) {
                    return cf_getItemAdjustMinMax(cf_getAdjust(e, t, i, n), t.items.visibleConf)
                }

                function cf_getItemAdjustMinMax(e, t) {
                    return is_number(t.min) && e < t.min && (e = t.min), is_number(t.max) && e > t.max && (e = t.max), e < 1 && (e = 1), e
                }

                function cf_getSynchArr(e) {
                    is_array(e) || (e = [
                        [e]
                    ]), is_array(e[0]) || (e = [e]);
                    for (var t = 0, i = e.length; t < i; t++) is_string(e[t][0]) && (e[t][0] = $(e[t][0])), is_boolean(e[t][1]) || (e[t][1] = !0), is_boolean(e[t][2]) || (e[t][2] = !0), is_number(e[t][3]) || (e[t][3] = 0);
                    return e
                }

                function cf_getKeyCode(e) {
                    return "right" == e ? 39 : "left" == e ? 37 : "up" == e ? 38 : "down" == e ? 40 : -1
                }

                function cf_setCookie(e, t, i) {
                    if (e) {
                        var n = t.triggerHandler(cf_e("currentPosition", i));
                        $.fn.carouFredSel.cookie.set(e, n)
                    }
                }

                function cf_getCookie(e) {
                    var t = $.fn.carouFredSel.cookie.get(e);
                    return "" == t ? 0 : t
                }

                function in_mapCss(e, t) {
                    for (var i = {}, n = 0, s = t.length; n < s; n++) i[t[n]] = e.css(t[n]);
                    return i
                }

                function in_complementItems(e, t, i, n) {
                    return is_object(e.visibleConf) || (e.visibleConf = {}), is_object(e.sizesConf) || (e.sizesConf = {}), 0 == e.start && is_number(n) && (e.start = n), is_object(e.visible) ? (e.visibleConf.min = e.visible.min, e.visibleConf.max = e.visible.max, e.visible = !1) : is_string(e.visible) ? ("variable" == e.visible ? e.visibleConf.variable = !0 : e.visibleConf.adjust = e.visible, e.visible = !1) : is_function(e.visible) && (e.visibleConf.adjust = e.visible, e.visible = !1), is_string(e.filter) || (e.filter = i.filter(":hidden").length > 0 ? ":visible" : "*"), e[t.d.width] || (t.responsive ? (debug(!0, "Set a " + t.d.width + " for the items!"), e[t.d.width] = ms_getTrueLargestSize(i, t, "outerWidth")) : e[t.d.width] = ms_hasVariableSizes(i, t, "outerWidth") ? "variable" : i[t.d.outerWidth](!0)), e[t.d.height] || (e[t.d.height] = ms_hasVariableSizes(i, t, "outerHeight") ? "variable" : i[t.d.outerHeight](!0)), e.sizesConf.width = e.width, e.sizesConf.height = e.height, e
                }

                function in_complementVisibleItems(e, t) {
                    return "variable" == e.items[e.d.width] && (e.items.visibleConf.variable = !0), e.items.visibleConf.variable || (is_number(e[e.d.width]) ? e.items.visible = Math.floor(e[e.d.width] / e.items[e.d.width]) : (e.items.visible = Math.floor(t / e.items[e.d.width]), e[e.d.width] = e.items.visible * e.items[e.d.width], e.items.visibleConf.adjust || (e.align = !1)), ("Infinity" == e.items.visible || e.items.visible < 1) && (debug(!0, 'Not a valid number of visible items: Set to "variable".'), e.items.visibleConf.variable = !0)), e
                }

                function in_complementPrimarySize(e, t, i) {
                    return "auto" == e && (e = ms_getTrueLargestSize(i, t, "outerWidth")), e
                }

                function in_complementSecondarySize(e, t, i) {
                    return "auto" == e && (e = ms_getTrueLargestSize(i, t, "outerHeight")), e || (e = t.items[t.d.height]), e
                }

                function in_getAlignPadding(e, t) {
                    var i = cf_getAlignPadding(gi_getCurrentItems(t, e), e);
                    return e.padding[e.d[1]] = i[1], e.padding[e.d[3]] = i[0], e
                }

                function in_getResponsiveValues(e, t, i) {
                    var n = cf_getItemAdjustMinMax(Math.ceil(e[e.d.width] / e.items[e.d.width]), e.items.visibleConf);
                    n > t.length && (n = t.length);
                    var s = Math.floor(e[e.d.width] / n);
                    return e.items.visible = n, e.items[e.d.width] = s, e[e.d.width] = n * s, e
                }

                function bt_pauseOnHoverConfig(e) {
                    if (is_string(e)) var t = e.indexOf("immediate") > -1,
                        i = e.indexOf("resume") > -1;
                    else var t = i = !1;
                    return [t, i]
                }

                function bt_mousesheelNumber(e) {
                    return is_number(e) ? e : null
                }

                function is_null(e) {
                    return null === e
                }

                function is_undefined(e) {
                    return is_null(e) || "undefined" == typeof e || "" === e || "undefined" === e
                }

                function is_array(e) {
                    return e instanceof Array
                }

                function is_jquery(e) {
                    return e instanceof jQuery
                }

                function is_object(e) {
                    return (e instanceof Object || "object" == typeof e) && !is_null(e) && !is_jquery(e) && !is_array(e) && !is_function(e)
                }

                function is_number(e) {
                    return (e instanceof Number || "number" == typeof e) && !isNaN(e)
                }

                function is_string(e) {
                    return (e instanceof String || "string" == typeof e) && !is_undefined(e) && !is_true(e) && !is_false(e)
                }

                function is_function(e) {
                    return e instanceof Function || "function" == typeof e
                }

                function is_boolean(e) {
                    return e instanceof Boolean || "boolean" == typeof e || is_true(e) || is_false(e)
                }

                function is_true(e) {
                    return e === !0 || "true" === e
                }

                function is_false(e) {
                    return e === !1 || "false" === e
                }

                function is_percentage(e) {
                    return is_string(e) && "%" == e.slice(-1)
                }

                function getTime() {
                    return (new Date).getTime()
                }

                function deprecated(e, t) {
                    debug(!0, e + " is DEPRECATED, support for it will be removed. Use " + t + " instead.")
                }

                function debug(e, t) {
                    if (!is_undefined(window.console) && !is_undefined(window.console.log)) {
                        if (is_object(e)) {
                            var i = " (" + e.selector + ")";
                            e = e.debug
                        } else var i = "";
                        if (!e) return !1;
                        t = is_string(t) ? "carouFredSel" + i + ": " + t : ["carouFredSel" + i + ":", t], window.console.log(t)
                    }
                    return !1
                }
                $.fn.carouFredSel || ($.fn.caroufredsel = $.fn.carouFredSel = function(options, configs) {
                    if (0 == this.length) return debug(!0, 'No element found for "' + this.selector + '".'), this;
                    if (this.length > 1) return this.each(function() {
                        $(this).carouFredSel(options, configs)
                    });
                    var $cfs = this,
                        $tt0 = this[0],
                        starting_position = !1;
                    $cfs.data("_cfs_isCarousel") && (starting_position = $cfs.triggerHandler("_cfs_triggerEvent", "currentPosition"), $cfs.trigger("_cfs_triggerEvent", ["destroy", !0]));
                    var FN = {};
                    FN._init = function(e, t, i) {
                        e = go_getObject($tt0, e), e.items = go_getItemsObject($tt0, e.items), e.scroll = go_getScrollObject($tt0, e.scroll), e.auto = go_getAutoObject($tt0, e.auto), e.prev = go_getPrevNextObject($tt0, e.prev), e.next = go_getPrevNextObject($tt0, e.next), e.pagination = go_getPaginationObject($tt0, e.pagination), e.swipe = go_getSwipeObject($tt0, e.swipe), e.mousewheel = go_getMousewheelObject($tt0, e.mousewheel), t && (opts_orig = $.extend(!0, {}, $.fn.carouFredSel.defaults, e)), opts = $.extend(!0, {}, $.fn.carouFredSel.defaults, e), opts.d = cf_getDimensions(opts), crsl.direction = "up" == opts.direction || "left" == opts.direction ? "next" : "prev";
                        var n = $cfs.children(),
                            s = ms_getParentSize($wrp, opts, "width");
                        if (is_true(opts.cookie) && (opts.cookie = "caroufredsel_cookie_" + conf.serialNumber), opts.maxDimension = ms_getMaxDimension(opts, s), opts.items = in_complementItems(opts.items, opts, n, i), opts[opts.d.width] = in_complementPrimarySize(opts[opts.d.width], opts, n), opts[opts.d.height] = in_complementSecondarySize(opts[opts.d.height], opts, n), opts.responsive && (is_percentage(opts[opts.d.width]) || (opts[opts.d.width] = "100%")), is_percentage(opts[opts.d.width]) && (crsl.upDateOnWindowResize = !0, crsl.primarySizePercentage = opts[opts.d.width], opts[opts.d.width] = ms_getPercentage(s, crsl.primarySizePercentage), opts.items.visible || (opts.items.visibleConf.variable = !0)), opts.responsive ? (opts.usePadding = !1, opts.padding = [0, 0, 0, 0], opts.align = !1, opts.items.visibleConf.variable = !1) : (opts.items.visible || (opts = in_complementVisibleItems(opts, s)), opts[opts.d.width] || (!opts.items.visibleConf.variable && is_number(opts.items[opts.d.width]) && "*" == opts.items.filter ? (opts[opts.d.width] = opts.items.visible * opts.items[opts.d.width], opts.align = !1) : opts[opts.d.width] = "variable"), is_undefined(opts.align) && (opts.align = !!is_number(opts[opts.d.width]) && "center"), opts.items.visibleConf.variable && (opts.items.visible = gn_getVisibleItemsNext(n, opts, 0))), "*" == opts.items.filter || opts.items.visibleConf.variable || (opts.items.visibleConf.org = opts.items.visible, opts.items.visible = gn_getVisibleItemsNextFilter(n, opts, 0)), opts.items.visible = cf_getItemsAdjust(opts.items.visible, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts.responsive) opts.items.visibleConf.min || (opts.items.visibleConf.min = opts.items.visible),
                            opts.items.visibleConf.max || (opts.items.visibleConf.max = opts.items.visible), opts = in_getResponsiveValues(opts, n, s);
                        else switch (opts.padding = cf_getPadding(opts.padding), "top" == opts.align ? opts.align = "left" : "bottom" == opts.align && (opts.align = "right"), opts.align) {
                            case "center":
                            case "left":
                            case "right":
                                "variable" != opts[opts.d.width] && (opts = in_getAlignPadding(opts, n), opts.usePadding = !0);
                                break;
                            default:
                                opts.align = !1, opts.usePadding = 0 != opts.padding[0] || 0 != opts.padding[1] || 0 != opts.padding[2] || 0 != opts.padding[3]
                        }
                        is_number(opts.scroll.duration) || (opts.scroll.duration = 500), is_undefined(opts.scroll.items) && (opts.scroll.items = opts.responsive || opts.items.visibleConf.variable || "*" != opts.items.filter ? "visible" : opts.items.visible), opts.auto = $.extend(!0, {}, opts.scroll, opts.auto), opts.prev = $.extend(!0, {}, opts.scroll, opts.prev), opts.next = $.extend(!0, {}, opts.scroll, opts.next), opts.pagination = $.extend(!0, {}, opts.scroll, opts.pagination), opts.auto = go_complementAutoObject($tt0, opts.auto), opts.prev = go_complementPrevNextObject($tt0, opts.prev), opts.next = go_complementPrevNextObject($tt0, opts.next), opts.pagination = go_complementPaginationObject($tt0, opts.pagination), opts.swipe = go_complementSwipeObject($tt0, opts.swipe), opts.mousewheel = go_complementMousewheelObject($tt0, opts.mousewheel), opts.synchronise && (opts.synchronise = cf_getSynchArr(opts.synchronise)), opts.auto.onPauseStart && (opts.auto.onTimeoutStart = opts.auto.onPauseStart, deprecated("auto.onPauseStart", "auto.onTimeoutStart")), opts.auto.onPausePause && (opts.auto.onTimeoutPause = opts.auto.onPausePause, deprecated("auto.onPausePause", "auto.onTimeoutPause")), opts.auto.onPauseEnd && (opts.auto.onTimeoutEnd = opts.auto.onPauseEnd, deprecated("auto.onPauseEnd", "auto.onTimeoutEnd")), opts.auto.pauseDuration && (opts.auto.timeoutDuration = opts.auto.pauseDuration, deprecated("auto.pauseDuration", "auto.timeoutDuration"))
                    }, FN._build = function() {
                        $cfs.data("_cfs_isCarousel", !0);
                        var e = $cfs.children(),
                            t = in_mapCss($cfs, ["textAlign", "float", "position", "top", "right", "bottom", "left", "zIndex", "width", "height", "marginTop", "marginRight", "marginBottom", "marginLeft"]),
                            i = "relative";
                        switch (t.position) {
                            case "absolute":
                            case "fixed":
                                i = t.position
                        }
                        "parent" == conf.wrapper ? sz_storeOrigCss($wrp) : $wrp.css(t), $wrp.css({
                            overflow: "hidden",
                            position: i
                        }), sz_storeOrigCss($cfs), $cfs.data("_cfs_origCssZindex", t.zIndex), $cfs.css({
                            textAlign: "left",
                            float: "none",
                            position: "absolute",
                            top: 0,
                            right: "auto",
                            bottom: "auto",
                            left: 0,
                            marginTop: 0,
                            marginRight: 0,
                            marginBottom: 0,
                            marginLeft: 0
                        }), sz_storeMargin(e, opts), sz_storeOrigCss(e), opts.responsive && sz_setResponsiveSizes(opts, e)
                    }, FN._bind_events = function() {
                        FN._unbind_events(), $cfs.bind(cf_e("stop", conf), function(e, t) {
                            return e.stopPropagation(), crsl.isStopped || opts.auto.button && opts.auto.button.addClass(cf_c("stopped", conf)), crsl.isStopped = !0, opts.auto.play && (opts.auto.play = !1, $cfs.trigger(cf_e("pause", conf), t)), !0
                        }), $cfs.bind(cf_e("finish", conf), function(e) {
                            return e.stopPropagation(), crsl.isScrolling && sc_stopScroll(scrl), !0
                        }), $cfs.bind(cf_e("pause", conf), function(e, t, i) {
                            if (e.stopPropagation(), tmrs = sc_clearTimers(tmrs), t && crsl.isScrolling) {
                                scrl.isStopped = !0;
                                var n = getTime() - scrl.startTime;
                                scrl.duration -= n, scrl.pre && (scrl.pre.duration -= n), scrl.post && (scrl.post.duration -= n), sc_stopScroll(scrl, !1)
                            }
                            if (crsl.isPaused || crsl.isScrolling || i && (tmrs.timePassed += getTime() - tmrs.startTime), crsl.isPaused || opts.auto.button && opts.auto.button.addClass(cf_c("paused", conf)), crsl.isPaused = !0, opts.auto.onTimeoutPause) {
                                var s = opts.auto.timeoutDuration - tmrs.timePassed,
                                    o = 100 - Math.ceil(100 * s / opts.auto.timeoutDuration);
                                opts.auto.onTimeoutPause.call($tt0, o, s)
                            }
                            return !0
                        }), $cfs.bind(cf_e("play", conf), function(e, t, i, n) {
                            e.stopPropagation(), tmrs = sc_clearTimers(tmrs);
                            var s = [t, i, n],
                                o = ["string", "number", "boolean"],
                                r = cf_sortParams(s, o);
                            if (t = r[0], i = r[1], n = r[2], "prev" != t && "next" != t && (t = crsl.direction), is_number(i) || (i = 0), is_boolean(n) || (n = !1), n && (crsl.isStopped = !1, opts.auto.play = !0), !opts.auto.play) return e.stopImmediatePropagation(), debug(conf, "Carousel stopped: Not scrolling.");
                            crsl.isPaused && opts.auto.button && (opts.auto.button.removeClass(cf_c("stopped", conf)), opts.auto.button.removeClass(cf_c("paused", conf))), crsl.isPaused = !1, tmrs.startTime = getTime();
                            var a = opts.auto.timeoutDuration + i;
                            return dur2 = a - tmrs.timePassed, perc = 100 - Math.ceil(100 * dur2 / a), opts.auto.progress && (tmrs.progress = setInterval(function() {
                                var e = getTime() - tmrs.startTime + tmrs.timePassed,
                                    t = Math.ceil(100 * e / a);
                                opts.auto.progress.updater.call(opts.auto.progress.bar[0], t)
                            }, opts.auto.progress.interval)), tmrs.auto = setTimeout(function() {
                                opts.auto.progress && opts.auto.progress.updater.call(opts.auto.progress.bar[0], 100), opts.auto.onTimeoutEnd && opts.auto.onTimeoutEnd.call($tt0, perc, dur2), crsl.isScrolling ? $cfs.trigger(cf_e("play", conf), t) : $cfs.trigger(cf_e(t, conf), opts.auto)
                            }, dur2), opts.auto.onTimeoutStart && opts.auto.onTimeoutStart.call($tt0, perc, dur2), !0
                        }), $cfs.bind(cf_e("resume", conf), function(e) {
                            return e.stopPropagation(), scrl.isStopped ? (scrl.isStopped = !1, crsl.isPaused = !1, crsl.isScrolling = !0, scrl.startTime = getTime(), sc_startScroll(scrl, conf)) : $cfs.trigger(cf_e("play", conf)), !0
                        }), $cfs.bind(cf_e("prev", conf) + " " + cf_e("next", conf), function(e, t, i, n, s) {
                            if (e.stopPropagation(), crsl.isStopped || $cfs.is(":hidden")) return e.stopImmediatePropagation(), debug(conf, "Carousel stopped or hidden: Not scrolling.");
                            var o = is_number(opts.items.minimum) ? opts.items.minimum : opts.items.visible + 1;
                            if (o > itms.total) return e.stopImmediatePropagation(), debug(conf, "Not enough items (" + itms.total + " total, " + o + " needed): Not scrolling.");
                            var r = [t, i, n, s],
                                a = ["object", "number/string", "function", "boolean"],
                                c = cf_sortParams(r, a);
                            t = c[0], i = c[1], n = c[2], s = c[3];
                            var l = e.type.slice(conf.events.prefix.length);
                            if (is_object(t) || (t = {}), is_function(n) && (t.onAfter = n), is_boolean(s) && (t.queue = s), t = $.extend(!0, {}, opts[l], t), t.conditions && !t.conditions.call($tt0, l)) return e.stopImmediatePropagation(), debug(conf, 'Callback "conditions" returned false.');
                            if (!is_number(i)) {
                                if ("*" != opts.items.filter) i = "visible";
                                else
                                    for (var u = [i, t.items, opts[l].items], c = 0, f = u.length; c < f; c++)
                                        if (is_number(u[c]) || "page" == u[c] || "visible" == u[c]) {
                                            i = u[c];
                                            break
                                        } switch (i) {
                                    case "page":
                                        return e.stopImmediatePropagation(), $cfs.triggerHandler(cf_e(l + "Page", conf), [t, n]);
                                    case "visible":
                                        opts.items.visibleConf.variable || "*" != opts.items.filter || (i = opts.items.visible)
                                }
                            }
                            if (scrl.isStopped) return $cfs.trigger(cf_e("resume", conf)), $cfs.trigger(cf_e("queue", conf), [l, [t, i, n]]), e.stopImmediatePropagation(), debug(conf, "Carousel resumed scrolling.");
                            if (t.duration > 0 && crsl.isScrolling) return t.queue && ("last" == t.queue && (queu = []), "first" == t.queue && 0 != queu.length || $cfs.trigger(cf_e("queue", conf), [l, [t, i, n]])), e.stopImmediatePropagation(), debug(conf, "Carousel currently scrolling.");
                            if (tmrs.timePassed = 0, $cfs.trigger(cf_e("slide_" + l, conf), [t, i]), opts.synchronise)
                                for (var d = opts.synchronise, p = [t, i], g = 0, f = d.length; g < f; g++) {
                                    var m = l;
                                    d[g][2] || (m = "prev" == m ? "next" : "prev"), d[g][1] || (p[0] = d[g][0].triggerHandler("_cfs_triggerEvent", ["configuration", m])), p[1] = i + d[g][3], d[g][0].trigger("_cfs_triggerEvent", ["slide_" + m, p])
                                }
                            return !0
                        }), $cfs.bind(cf_e("slide_prev", conf), function(e, t, i) {
                            e.stopPropagation();
                            var n = $cfs.children();
                            if (!opts.circular && 0 == itms.first) return opts.infinite && $cfs.trigger(cf_e("next", conf), itms.total - 1), e.stopImmediatePropagation();
                            if (sz_resetMargin(n, opts), !is_number(i)) {
                                if (opts.items.visibleConf.variable) i = gn_getVisibleItemsPrev(n, opts, itms.total - 1);
                                else if ("*" != opts.items.filter) {
                                    var s = is_number(t.items) ? t.items : gn_getVisibleOrg($cfs, opts);
                                    i = gn_getScrollItemsPrevFilter(n, opts, itms.total - 1, s)
                                } else i = opts.items.visible;
                                i = cf_getAdjust(i, opts, t.items, $tt0)
                            }
                            if (opts.circular || itms.total - i < itms.first && (i = itms.total - itms.first), opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) {
                                var o = cf_getItemsAdjust(gn_getVisibleItemsNext(n, opts, itms.total - i), opts, opts.items.visibleConf.adjust, $tt0);
                                opts.items.visible + i <= o && i < itms.total && (i++, o = cf_getItemsAdjust(gn_getVisibleItemsNext(n, opts, itms.total - i), opts, opts.items.visibleConf.adjust, $tt0)), opts.items.visible = o
                            } else if ("*" != opts.items.filter) {
                                var o = gn_getVisibleItemsNextFilter(n, opts, itms.total - i);
                                opts.items.visible = cf_getItemsAdjust(o, opts, opts.items.visibleConf.adjust, $tt0)
                            }
                            if (sz_resetMargin(n, opts, !0), 0 == i) return e.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling.");
                            for (debug(conf, "Scrolling " + i + " items backward."), itms.first += i; itms.first >= itms.total;) itms.first -= itms.total;
                            opts.circular || (0 == itms.first && t.onEnd && t.onEnd.call($tt0, "prev"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), $cfs.children().slice(itms.total - i, itms.total).prependTo($cfs), itms.total < opts.items.visible + i && $cfs.children().slice(0, opts.items.visible + i - itms.total).clone(!0).appendTo($cfs);
                            var n = $cfs.children(),
                                r = gi_getOldItemsPrev(n, opts, i),
                                a = gi_getNewItemsPrev(n, opts),
                                c = n.eq(i - 1),
                                l = r.last(),
                                u = a.last();
                            sz_resetMargin(n, opts);
                            var f = 0,
                                d = 0;
                            if (opts.align) {
                                var p = cf_getAlignPadding(a, opts);
                                f = p[0], d = p[1]
                            }
                            var g = f < 0 ? opts.padding[opts.d[3]] : 0,
                                m = !1,
                                b = $();
                            if (opts.items.visible < i && (b = n.slice(opts.items.visibleConf.old, i), "directscroll" == t.fx)) {
                                var T = opts.items[opts.d.width];
                                m = b, c = u, sc_hideHiddenItems(m), opts.items[opts.d.width] = "variable"
                            }
                            var h = !1,
                                S = ms_getTotalSize(n.slice(0, i), opts, "width"),
                                v = cf_mapWrapperSizes(ms_getSizes(a, opts, !0), opts, !opts.usePadding),
                                _ = 0,
                                P = {},
                                A = {},
                                M = {},
                                G = {},
                                C = {},
                                H = {},
                                w = {},
                                I = sc_getDuration(t, opts, i, S);
                            switch (t.fx) {
                                case "cover":
                                case "cover-fade":
                                    _ = ms_getTotalSize(n.slice(0, opts.items.visible), opts, "width")
                            }
                            m && (opts.items[opts.d.width] = T), sz_resetMargin(n, opts, !0), d >= 0 && sz_resetMargin(l, opts, opts.padding[opts.d[1]]), f >= 0 && sz_resetMargin(c, opts, opts.padding[opts.d[3]]), opts.align && (opts.padding[opts.d[1]] = d, opts.padding[opts.d[3]] = f), H[opts.d.left] = -(S - g), w[opts.d.left] = -(_ - g), A[opts.d.left] = v[opts.d.width];
                            var B = function() {},
                                y = function() {},
                                E = function() {},
                                x = function() {},
                                D = function() {},
                                N = function() {},
                                k = function() {},
                                V = function() {},
                                O = function() {},
                                F = function() {},
                                R = function() {};
                            switch (t.fx) {
                                case "crossfade":
                                case "cover":
                                case "cover-fade":
                                case "uncover":
                                case "uncover-fade":
                                    h = $cfs.clone(!0).appendTo($wrp)
                            }
                            switch (t.fx) {
                                case "crossfade":
                                case "uncover":
                                case "uncover-fade":
                                    h.children().slice(0, i).remove(), h.children().slice(opts.items.visibleConf.old).remove();
                                    break;
                                case "cover":
                                case "cover-fade":
                                    h.children().slice(opts.items.visible).remove(), h.css(w)
                            }
                            if ($cfs.css(H), scrl = sc_setScroll(I, t.easing, conf), P[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0, "variable" != opts[opts.d.width] && "variable" != opts[opts.d.height] || (B = function() {
                                    $wrp.css(v)
                                }, y = function() {
                                    scrl.anims.push([$wrp, v])
                                }), opts.usePadding) {
                                switch (u.not(c).length && (M[opts.d.marginRight] = c.data("_cfs_origCssMargin"), f < 0 ? c.css(M) : (k = function() {
                                    c.css(M)
                                }, V = function() {
                                    scrl.anims.push([c, M])
                                })), t.fx) {
                                    case "cover":
                                    case "cover-fade":
                                        h.children().eq(i - 1).css(M)
                                }
                                u.not(l).length && (G[opts.d.marginRight] = l.data("_cfs_origCssMargin"), E = function() {
                                    l.css(G)
                                }, x = function() {
                                    scrl.anims.push([l, G])
                                }), d >= 0 && (C[opts.d.marginRight] = u.data("_cfs_origCssMargin") + opts.padding[opts.d[1]], D = function() {
                                    u.css(C)
                                }, N = function() {
                                    scrl.anims.push([u, C])
                                })
                            }
                            R = function() {
                                $cfs.css(P)
                            };
                            var L = opts.items.visible + i - itms.total;
                            F = function() {
                                if (L > 0 && ($cfs.children().slice(itms.total).remove(), r = $($cfs.children().slice(itms.total - (opts.items.visible - L)).get().concat($cfs.children().slice(0, L).get()))), sc_showHiddenItems(m), opts.usePadding) {
                                    var e = $cfs.children().eq(opts.items.visible + i - 1);
                                    e.css(opts.d.marginRight, e.data("_cfs_origCssMargin"))
                                }
                            };
                            var W = sc_mapCallbackArguments(r, b, a, i, "prev", I, v);
                            switch (O = function() {
                                sc_afterScroll($cfs, h, t), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, t, "onAfter", W, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf))
                            }, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, t, "onBefore", W, clbk), t.fx) {
                                case "none":
                                    $cfs.css(P), B(), E(), D(), k(), R(), F(), O();
                                    break;
                                case "fade":
                                    scrl.anims.push([$cfs, {
                                        opacity: 0
                                    }, function() {
                                        B(), E(), D(), k(), R(), F(), scrl = sc_setScroll(I, t.easing, conf), scrl.anims.push([$cfs, {
                                            opacity: 1
                                        }, O]), sc_startScroll(scrl, conf)
                                    }]);
                                    break;
                                case "crossfade":
                                    $cfs.css({
                                        opacity: 0
                                    }), scrl.anims.push([h, {
                                        opacity: 0
                                    }]), scrl.anims.push([$cfs, {
                                        opacity: 1
                                    }, O]), y(), E(), D(), k(), R(), F();
                                    break;
                                case "cover":
                                    scrl.anims.push([h, P, function() {
                                        E(), D(), k(), R(), F(), O()
                                    }]), y();
                                    break;
                                case "cover-fade":
                                    scrl.anims.push([$cfs, {
                                        opacity: 0
                                    }]), scrl.anims.push([h, P, function() {
                                        E(), D(), k(), R(), F(), O()
                                    }]), y();
                                    break;
                                case "uncover":
                                    scrl.anims.push([h, A, O]), y(), E(), D(), k(), R(), F();
                                    break;
                                case "uncover-fade":
                                    $cfs.css({
                                        opacity: 0
                                    }), scrl.anims.push([$cfs, {
                                        opacity: 1
                                    }]), scrl.anims.push([h, A, O]), y(), E(), D(), k(), R(), F();
                                    break;
                                default:
                                    scrl.anims.push([$cfs, P, function() {
                                        F(), O()
                                    }]), y(), x(), N(), V()
                            }
                            return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, v]), !0
                        }), $cfs.bind(cf_e("slide_next", conf), function(e, t, i) {
                            e.stopPropagation();
                            var n = $cfs.children();
                            if (!opts.circular && itms.first == opts.items.visible) return opts.infinite && $cfs.trigger(cf_e("prev", conf), itms.total - 1), e.stopImmediatePropagation();
                            if (sz_resetMargin(n, opts), !is_number(i)) {
                                if ("*" != opts.items.filter) {
                                    var s = is_number(t.items) ? t.items : gn_getVisibleOrg($cfs, opts);
                                    i = gn_getScrollItemsNextFilter(n, opts, 0, s)
                                } else i = opts.items.visible;
                                i = cf_getAdjust(i, opts, t.items, $tt0)
                            }
                            var o = 0 == itms.first ? itms.total : itms.first;
                            if (!opts.circular) {
                                if (opts.items.visibleConf.variable) var r = gn_getVisibleItemsNext(n, opts, i),
                                    s = gn_getVisibleItemsPrev(n, opts, o - 1);
                                else var r = opts.items.visible,
                                    s = opts.items.visible;
                                i + r > o && (i = o - s)
                            }
                            if (opts.items.visibleConf.old = opts.items.visible, opts.items.visibleConf.variable) {
                                for (var r = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(n, opts, i, o), opts, opts.items.visibleConf.adjust, $tt0); opts.items.visible - i >= r && i < itms.total;) i++, r = cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(n, opts, i, o), opts, opts.items.visibleConf.adjust, $tt0);
                                opts.items.visible = r
                            } else if ("*" != opts.items.filter) {
                                var r = gn_getVisibleItemsNextFilter(n, opts, i);
                                opts.items.visible = cf_getItemsAdjust(r, opts, opts.items.visibleConf.adjust, $tt0)
                            }
                            if (sz_resetMargin(n, opts, !0), 0 == i) return e.stopImmediatePropagation(), debug(conf, "0 items to scroll: Not scrolling.");
                            for (debug(conf, "Scrolling " + i + " items forward."), itms.first -= i; itms.first < 0;) itms.first += itms.total;
                            opts.circular || (itms.first == opts.items.visible && t.onEnd && t.onEnd.call($tt0, "next"), opts.infinite || nv_enableNavi(opts, itms.first, conf)), itms.total < opts.items.visible + i && $cfs.children().slice(0, opts.items.visible + i - itms.total).clone(!0).appendTo($cfs);
                            var n = $cfs.children(),
                                a = gi_getOldItemsNext(n, opts),
                                c = gi_getNewItemsNext(n, opts, i),
                                l = n.eq(i - 1),
                                u = a.last(),
                                f = c.last();
                            sz_resetMargin(n, opts);
                            var d = 0,
                                p = 0;
                            if (opts.align) {
                                var g = cf_getAlignPadding(c, opts);
                                d = g[0], p = g[1]
                            }
                            var m = !1,
                                b = $();
                            if (opts.items.visibleConf.old < i && (b = n.slice(opts.items.visibleConf.old, i), "directscroll" == t.fx)) {
                                var T = opts.items[opts.d.width];
                                m = b, l = u, sc_hideHiddenItems(m), opts.items[opts.d.width] = "variable"
                            }
                            var h = !1,
                                S = ms_getTotalSize(n.slice(0, i), opts, "width"),
                                v = cf_mapWrapperSizes(ms_getSizes(c, opts, !0), opts, !opts.usePadding),
                                _ = 0,
                                P = {},
                                A = {},
                                M = {},
                                G = {},
                                C = {},
                                H = sc_getDuration(t, opts, i, S);
                            switch (t.fx) {
                                case "uncover":
                                case "uncover-fade":
                                    _ = ms_getTotalSize(n.slice(0, opts.items.visibleConf.old), opts, "width")
                            }
                            m && (opts.items[opts.d.width] = T), opts.align && opts.padding[opts.d[1]] < 0 && (opts.padding[opts.d[1]] = 0), sz_resetMargin(n, opts, !0), sz_resetMargin(u, opts, opts.padding[opts.d[1]]), opts.align && (opts.padding[opts.d[1]] = p, opts.padding[opts.d[3]] = d), C[opts.d.left] = opts.usePadding ? opts.padding[opts.d[3]] : 0;
                            var w = function() {},
                                I = function() {},
                                B = function() {},
                                y = function() {},
                                E = function() {},
                                x = function() {},
                                D = function() {},
                                N = function() {},
                                k = function() {};
                            switch (t.fx) {
                                case "crossfade":
                                case "cover":
                                case "cover-fade":
                                case "uncover":
                                case "uncover-fade":
                                    h = $cfs.clone(!0).appendTo($wrp), h.children().slice(opts.items.visibleConf.old).remove()
                            }
                            switch (t.fx) {
                                case "crossfade":
                                case "cover":
                                case "cover-fade":
                                    $cfs.css("zIndex", 1), h.css("zIndex", 0)
                            }
                            if (scrl = sc_setScroll(H, t.easing, conf), P[opts.d.left] = -S, A[opts.d.left] = -_, d < 0 && (P[opts.d.left] += d), "variable" != opts[opts.d.width] && "variable" != opts[opts.d.height] || (w = function() {
                                    $wrp.css(v)
                                }, I = function() {
                                    scrl.anims.push([$wrp, v])
                                }), opts.usePadding) {
                                var V = f.data("_cfs_origCssMargin");
                                p >= 0 && (V += opts.padding[opts.d[1]]), f.css(opts.d.marginRight, V), l.not(u).length && (G[opts.d.marginRight] = u.data("_cfs_origCssMargin")), B = function() {
                                    u.css(G)
                                }, y = function() {
                                    scrl.anims.push([u, G])
                                };
                                var O = l.data("_cfs_origCssMargin");
                                d > 0 && (O += opts.padding[opts.d[3]]), M[opts.d.marginRight] = O, E = function() {
                                    l.css(M)
                                }, x = function() {
                                    scrl.anims.push([l, M])
                                }
                            }
                            k = function() {
                                $cfs.css(C)
                            };
                            var F = opts.items.visible + i - itms.total;
                            N = function() {
                                F > 0 && $cfs.children().slice(itms.total).remove();
                                var e = $cfs.children().slice(0, i).appendTo($cfs).last();
                                if (F > 0 && (c = gi_getCurrentItems(n, opts)), sc_showHiddenItems(m), opts.usePadding) {
                                    if (itms.total < opts.items.visible + i) {
                                        var t = $cfs.children().eq(opts.items.visible - 1);
                                        t.css(opts.d.marginRight, t.data("_cfs_origCssMargin") + opts.padding[opts.d[1]])
                                    }
                                    e.css(opts.d.marginRight, e.data("_cfs_origCssMargin"))
                                }
                            };
                            var R = sc_mapCallbackArguments(a, b, c, i, "next", H, v);
                            switch (D = function() {
                                $cfs.css("zIndex", $cfs.data("_cfs_origCssZindex")), sc_afterScroll($cfs, h, t), crsl.isScrolling = !1, clbk.onAfter = sc_fireCallbacks($tt0, t, "onAfter", R, clbk), queu = sc_fireQueue($cfs, queu, conf), crsl.isPaused || $cfs.trigger(cf_e("play", conf))
                            }, crsl.isScrolling = !0, tmrs = sc_clearTimers(tmrs), clbk.onBefore = sc_fireCallbacks($tt0, t, "onBefore", R, clbk), t.fx) {
                                case "none":
                                    $cfs.css(P), w(), B(), E(), k(), N(), D();
                                    break;
                                case "fade":
                                    scrl.anims.push([$cfs, {
                                        opacity: 0
                                    }, function() {
                                        w(), B(), E(), k(), N(), scrl = sc_setScroll(H, t.easing, conf), scrl.anims.push([$cfs, {
                                            opacity: 1
                                        }, D]), sc_startScroll(scrl, conf)
                                    }]);
                                    break;
                                case "crossfade":
                                    $cfs.css({
                                        opacity: 0
                                    }), scrl.anims.push([h, {
                                        opacity: 0
                                    }]), scrl.anims.push([$cfs, {
                                        opacity: 1
                                    }, D]), I(), B(), E(), k(), N();
                                    break;
                                case "cover":
                                    $cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([$cfs, C, D]), I(), B(), E(), N();
                                    break;
                                case "cover-fade":
                                    $cfs.css(opts.d.left, $wrp[opts.d.width]()), scrl.anims.push([h, {
                                        opacity: 0
                                    }]), scrl.anims.push([$cfs, C, D]), I(), B(), E(), N();
                                    break;
                                case "uncover":
                                    scrl.anims.push([h, A, D]), I(), B(), E(), k(), N();
                                    break;
                                case "uncover-fade":
                                    $cfs.css({
                                        opacity: 0
                                    }), scrl.anims.push([$cfs, {
                                        opacity: 1
                                    }]), scrl.anims.push([h, A, D]), I(), B(), E(), k(), N();
                                    break;
                                default:
                                    scrl.anims.push([$cfs, P, function() {
                                        k(), N(), D()
                                    }]), I(), y(), x()
                            }
                            return sc_startScroll(scrl, conf), cf_setCookie(opts.cookie, $cfs, conf), $cfs.trigger(cf_e("updatePageStatus", conf), [!1, v]), !0
                        }), $cfs.bind(cf_e("slideTo", conf), function(e, t, i, n, s, o, r) {
                            e.stopPropagation();
                            var a = [t, i, n, s, o, r],
                                c = ["string/number/object", "number", "boolean", "object", "string", "function"],
                                l = cf_sortParams(a, c);
                            return s = l[3], o = l[4], r = l[5], t = gn_getItemIndex(l[0], l[1], l[2], itms, $cfs), 0 != t && (is_object(s) || (s = !1), "prev" != o && "next" != o && (o = opts.circular ? t <= itms.total / 2 ? "next" : "prev" : 0 == itms.first || itms.first > t ? "next" : "prev"), "prev" == o && (t = itms.total - t), $cfs.trigger(cf_e(o, conf), [s, t, r]), !0)
                        }), $cfs.bind(cf_e("prevPage", conf), function(e, t, i) {
                            e.stopPropagation();
                            var n = $cfs.triggerHandler(cf_e("currentPage", conf));
                            return $cfs.triggerHandler(cf_e("slideToPage", conf), [n - 1, t, "prev", i])
                        }), $cfs.bind(cf_e("nextPage", conf), function(e, t, i) {
                            e.stopPropagation();
                            var n = $cfs.triggerHandler(cf_e("currentPage", conf));
                            return $cfs.triggerHandler(cf_e("slideToPage", conf), [n + 1, t, "next", i])
                        }), $cfs.bind(cf_e("slideToPage", conf), function(e, t, i, n, s) {
                            e.stopPropagation(), is_number(t) || (t = $cfs.triggerHandler(cf_e("currentPage", conf)));
                            var o = opts.pagination.items || opts.items.visible,
                                r = Math.ceil(itms.total / o) - 1;
                            return t < 0 && (t = r), t > r && (t = 0), $cfs.triggerHandler(cf_e("slideTo", conf), [t * o, 0, !0, i, n, s])
                        }), $cfs.bind(cf_e("jumpToStart", conf), function(e, t) {
                            if (e.stopPropagation(), t = t ? gn_getItemIndex(t, 0, !0, itms, $cfs) : 0, t += itms.first, 0 != t) {
                                if (itms.total > 0)
                                    for (; t > itms.total;) t -= itms.total;
                                $cfs.prepend($cfs.children().slice(t, itms.total))
                            }
                            return !0
                        }), $cfs.bind(cf_e("synchronise", conf), function(e, t) {
                            if (e.stopPropagation(), t) t = cf_getSynchArr(t);
                            else {
                                if (!opts.synchronise) return debug(conf, "No carousel to synchronise.");
                                t = opts.synchronise
                            }
                            for (var i = $cfs.triggerHandler(cf_e("currentPosition", conf)), n = !0, s = 0, o = t.length; s < o; s++) t[s][0].triggerHandler(cf_e("slideTo", conf), [i, t[s][3], !0]) || (n = !1);
                            return n
                        }), $cfs.bind(cf_e("queue", conf), function(e, t, i) {
                            return e.stopPropagation(), is_function(t) ? t.call($tt0, queu) : is_array(t) ? queu = t : is_undefined(t) || queu.push([t, i]), queu
                        }), $cfs.bind(cf_e("insertItem", conf), function(e, t, i, n, s) {
                            e.stopPropagation();
                            var o = [t, i, n, s],
                                r = ["string/object", "string/number/object", "boolean", "number"],
                                a = cf_sortParams(o, r);
                            if (t = a[0], i = a[1], n = a[2], s = a[3], is_object(t) && !is_jquery(t) ? t = $(t) : is_string(t) && (t = $(t)), !is_jquery(t) || 0 == t.length) return debug(conf, "Not a valid object.");
                            is_undefined(i) && (i = "end"), sz_storeMargin(t, opts), sz_storeOrigCss(t);
                            var c = i,
                                l = "before";
                            "end" == i ? n ? (0 == itms.first ? (i = itms.total - 1, l = "after") : (i = itms.first, itms.first += t.length), i < 0 && (i = 0)) : (i = itms.total - 1, l = "after") : i = gn_getItemIndex(i, s, n, itms, $cfs);
                            var u = $cfs.children().eq(i);
                            return u.length ? u[l](t) : (debug(conf, "Correct insert-position not found! Appending item to the end."), $cfs.append(t)), "end" == c || n || i < itms.first && (itms.first += t.length), itms.total = $cfs.children().length, itms.first >= itms.total && (itms.first -= itms.total), $cfs.trigger(cf_e("updateSizes", conf)), $cfs.trigger(cf_e("linkAnchors", conf)), !0
                        }), $cfs.bind(cf_e("removeItem", conf), function(e, t, i, n) {
                            e.stopPropagation();
                            var s = [t, i, n],
                                o = ["string/number/object", "boolean", "number"],
                                r = cf_sortParams(s, o);
                            t = r[0], i = r[1], n = r[2];
                            if (t instanceof $ && t.length > 1) return a = $(), t.each(function(e, t) {
                                var s = $cfs.trigger(cf_e("removeItem", conf), [$(this), i, n]);
                                s && (a = a.add(s))
                            }), a;
                            if (is_undefined(t) || "end" == t) a = $cfs.children().last();
                            else {
                                t = gn_getItemIndex(t, n, i, itms, $cfs);
                                var a = $cfs.children().eq(t);
                                a.length && t < itms.first && (itms.first -= a.length)
                            }
                            return a && a.length && (a.detach(), itms.total = $cfs.children().length, $cfs.trigger(cf_e("updateSizes", conf))), a
                        }), $cfs.bind(cf_e("onBefore", conf) + " " + cf_e("onAfter", conf), function(e, t) {
                            e.stopPropagation();
                            var i = e.type.slice(conf.events.prefix.length);
                            return is_array(t) && (clbk[i] = t), is_function(t) && clbk[i].push(t), clbk[i]
                        }), $cfs.bind(cf_e("currentPosition", conf), function(e, t) {
                            if (e.stopPropagation(), 0 == itms.first) var i = 0;
                            else var i = itms.total - itms.first;
                            return is_function(t) && t.call($tt0, i), i
                        }), $cfs.bind(cf_e("currentPage", conf), function(e, t) {
                            e.stopPropagation();
                            var i, n = opts.pagination.items || opts.items.visible,
                                s = Math.ceil(itms.total / n - 1);
                            return i = 0 == itms.first ? 0 : itms.first < itms.total % n ? 0 : itms.first != n || opts.circular ? Math.round((itms.total - itms.first) / n) : s, i < 0 && (i = 0), i > s && (i = s), is_function(t) && t.call($tt0, i), i
                        }), $cfs.bind(cf_e("currentVisible", conf), function(e, t) {
                            e.stopPropagation();
                            var i = gi_getCurrentItems($cfs.children(), opts);
                            return is_function(t) && t.call($tt0, i), i
                        }), $cfs.bind(cf_e("slice", conf), function(e, t, i, n) {
                            if (e.stopPropagation(), 0 == itms.total) return !1;
                            var s = [t, i, n],
                                o = ["number", "number", "function"],
                                r = cf_sortParams(s, o);
                            if (t = is_number(r[0]) ? r[0] : 0, i = is_number(r[1]) ? r[1] : itms.total, n = r[2], t += itms.first, i += itms.first, items.total > 0) {
                                for (; t > itms.total;) t -= itms.total;
                                for (; i > itms.total;) i -= itms.total;
                                for (; t < 0;) t += itms.total;
                                for (; i < 0;) i += itms.total
                            }
                            var a, c = $cfs.children();
                            return a = i > t ? c.slice(t, i) : $(c.slice(t, itms.total).get().concat(c.slice(0, i).get())), is_function(n) && n.call($tt0, a), a
                        }), $cfs.bind(cf_e("isPaused", conf) + " " + cf_e("isStopped", conf) + " " + cf_e("isScrolling", conf), function(e, t) {
                            e.stopPropagation();
                            var i = e.type.slice(conf.events.prefix.length),
                                n = crsl[i];
                            return is_function(t) && t.call($tt0, n), n
                        }), $cfs.bind(cf_e("configuration", conf), function(e, a, b, c) {
                            e.stopPropagation();
                            var reInit = !1;
                            if (is_function(a)) a.call($tt0, opts);
                            else if (is_object(a)) opts_orig = $.extend(!0, {}, opts_orig, a), b !== !1 ? reInit = !0 : opts = $.extend(!0, {}, opts, a);
                            else if (!is_undefined(a))
                                if (is_function(b)) {
                                    var val = eval("opts." + a);
                                    is_undefined(val) && (val = ""), b.call($tt0, val)
                                } else {
                                    if (is_undefined(b)) return eval("opts." + a);
                                    "boolean" != typeof c && (c = !0), eval("opts_orig." + a + " = b"), c !== !1 ? reInit = !0 : eval("opts." + a + " = b")
                                }
                            if (reInit) {
                                sz_resetMargin($cfs.children(), opts), FN._init(opts_orig), FN._bind_buttons();
                                var sz = sz_setSizes($cfs, opts);
                                $cfs.trigger(cf_e("updatePageStatus", conf), [!0, sz])
                            }
                            return opts
                        }), $cfs.bind(cf_e("linkAnchors", conf), function(e, t, i) {
                            return e.stopPropagation(), is_undefined(t) ? t = $("body") : is_string(t) && (t = $(t)), is_jquery(t) && 0 != t.length ? (is_string(i) || (i = "a.caroufredsel"), t.find(i).each(function() {
                                var e = this.hash || "";
                                e.length > 0 && $cfs.children().index($(e)) != -1 && $(this).unbind("click").click(function(t) {
                                    t.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), e)
                                })
                            }), !0) : debug(conf, "Not a valid object.")
                        }), $cfs.bind(cf_e("updatePageStatus", conf), function(e, t, i) {
                            if (e.stopPropagation(), opts.pagination.container) {
                                var n = opts.pagination.items || opts.items.visible,
                                    s = Math.ceil(itms.total / n);
                                t && (opts.pagination.anchorBuilder && (opts.pagination.container.children().remove(), opts.pagination.container.each(function() {
                                    for (var e = 0; e < s; e++) {
                                        var t = $cfs.children().eq(gn_getItemIndex(e * n, 0, !0, itms, $cfs));
                                        $(this).append(opts.pagination.anchorBuilder.call(t[0], e + 1))
                                    }
                                })), opts.pagination.container.each(function() {
                                    $(this).children().unbind(opts.pagination.event).each(function(e) {
                                        $(this).bind(opts.pagination.event, function(t) {
                                            t.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [e * n, -opts.pagination.deviation, !0, opts.pagination])
                                        })
                                    })
                                }));
                                var o = $cfs.triggerHandler(cf_e("currentPage", conf)) + opts.pagination.deviation;
                                return o >= s && (o = 0), o < 0 && (o = s - 1), opts.pagination.container.each(function() {
                                    $(this).children().removeClass(cf_c("selected", conf)).eq(o).addClass(cf_c("selected", conf))
                                }), !0
                            }
                        }), $cfs.bind(cf_e("updateSizes", conf), function(e) {
                            var t = opts.items.visible,
                                i = $cfs.children(),
                                n = ms_getParentSize($wrp, opts, "width");
                            if (itms.total = i.length, crsl.primarySizePercentage ? (opts.maxDimension = n, opts[opts.d.width] = ms_getPercentage(n, crsl.primarySizePercentage)) : opts.maxDimension = ms_getMaxDimension(opts, n), opts.responsive ? (opts.items.width = opts.items.sizesConf.width, opts.items.height = opts.items.sizesConf.height, opts = in_getResponsiveValues(opts, i, n), t = opts.items.visible, sz_setResponsiveSizes(opts, i)) : opts.items.visibleConf.variable ? t = gn_getVisibleItemsNext(i, opts, 0) : "*" != opts.items.filter && (t = gn_getVisibleItemsNextFilter(i, opts, 0)), !opts.circular && 0 != itms.first && t > itms.first) {
                                if (opts.items.visibleConf.variable) var s = gn_getVisibleItemsPrev(i, opts, itms.first) - itms.first;
                                else if ("*" != opts.items.filter) var s = gn_getVisibleItemsPrevFilter(i, opts, itms.first) - itms.first;
                                else var s = opts.items.visible - itms.first;
                                debug(conf, "Preventing non-circular: sliding " + s + " items backward."), $cfs.trigger(cf_e("prev", conf), s)
                            }
                            opts.items.visible = cf_getItemsAdjust(t, opts, opts.items.visibleConf.adjust, $tt0), opts.items.visibleConf.old = opts.items.visible, opts = in_getAlignPadding(opts, i);
                            var o = sz_setSizes($cfs, opts);
                            return $cfs.trigger(cf_e("updatePageStatus", conf), [!0, o]), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), o
                        }), $cfs.bind(cf_e("destroy", conf), function(e, t) {
                            return e.stopPropagation(), tmrs = sc_clearTimers(tmrs), $cfs.data("_cfs_isCarousel", !1), $cfs.trigger(cf_e("finish", conf)), t && $cfs.trigger(cf_e("jumpToStart", conf)), sz_restoreOrigCss($cfs.children()), sz_restoreOrigCss($cfs), FN._unbind_events(), FN._unbind_buttons(), "parent" == conf.wrapper ? sz_restoreOrigCss($wrp) : $wrp.replaceWith($cfs), !0
                        }), $cfs.bind(cf_e("debug", conf), function(e) {
                            return debug(conf, "Carousel width: " + opts.width), debug(conf, "Carousel height: " + opts.height), debug(conf, "Item widths: " + opts.items.width), debug(conf, "Item heights: " + opts.items.height), debug(conf, "Number of items visible: " + opts.items.visible), opts.auto.play && debug(conf, "Number of items scrolled automatically: " + opts.auto.items), opts.prev.button && debug(conf, "Number of items scrolled backward: " + opts.prev.items), opts.next.button && debug(conf, "Number of items scrolled forward: " + opts.next.items), conf.debug
                        }), $cfs.bind("_cfs_triggerEvent", function(e, t, i) {
                            return e.stopPropagation(), $cfs.triggerHandler(cf_e(t, conf), i)
                        })
                    }, FN._unbind_events = function() {
                        $cfs.unbind(cf_e("", conf)), $cfs.unbind(cf_e("", conf, !1)), $cfs.unbind("_cfs_triggerEvent")
                    }, FN._bind_buttons = function() {
                        if (FN._unbind_buttons(), nv_showNavi(opts, itms.total, conf), nv_enableNavi(opts, itms.first, conf), opts.auto.pauseOnHover) {
                            var e = bt_pauseOnHoverConfig(opts.auto.pauseOnHover);
                            $wrp.bind(cf_e("mouseenter", conf, !1), function() {
                                $cfs.trigger(cf_e("pause", conf), e)
                            }).bind(cf_e("mouseleave", conf, !1), function() {
                                $cfs.trigger(cf_e("resume", conf))
                            })
                        }
                        if (opts.auto.button && opts.auto.button.bind(cf_e(opts.auto.event, conf, !1), function(e) {
                                e.preventDefault();
                                var t = !1,
                                    i = null;
                                crsl.isPaused ? t = "play" : opts.auto.pauseOnEvent && (t = "pause", i = bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)), t && $cfs.trigger(cf_e(t, conf), i)
                            }), opts.prev.button && (opts.prev.button.bind(cf_e(opts.prev.event, conf, !1), function(e) {
                                e.preventDefault(), $cfs.trigger(cf_e("prev", conf))
                            }), opts.prev.pauseOnHover)) {
                            var e = bt_pauseOnHoverConfig(opts.prev.pauseOnHover);
                            opts.prev.button.bind(cf_e("mouseenter", conf, !1), function() {
                                $cfs.trigger(cf_e("pause", conf), e)
                            }).bind(cf_e("mouseleave", conf, !1), function() {
                                $cfs.trigger(cf_e("resume", conf))
                            })
                        }
                        if (opts.next.button && (opts.next.button.bind(cf_e(opts.next.event, conf, !1), function(e) {
                                e.preventDefault(), $cfs.trigger(cf_e("next", conf))
                            }), opts.next.pauseOnHover)) {
                            var e = bt_pauseOnHoverConfig(opts.next.pauseOnHover);
                            opts.next.button.bind(cf_e("mouseenter", conf, !1), function() {
                                $cfs.trigger(cf_e("pause", conf), e)
                            }).bind(cf_e("mouseleave", conf, !1), function() {
                                $cfs.trigger(cf_e("resume", conf))
                            })
                        }
                        if (opts.pagination.container && opts.pagination.pauseOnHover) {
                            var e = bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);
                            opts.pagination.container.bind(cf_e("mouseenter", conf, !1), function() {
                                $cfs.trigger(cf_e("pause", conf), e)
                            }).bind(cf_e("mouseleave", conf, !1), function() {
                                $cfs.trigger(cf_e("resume", conf))
                            })
                        }
                        if ((opts.prev.key || opts.next.key) && $(document).bind(cf_e("keyup", conf, !1, !0, !0), function(e) {
                                var t = e.keyCode;
                                t == opts.next.key && (e.preventDefault(), $cfs.trigger(cf_e("next", conf))), t == opts.prev.key && (e.preventDefault(), $cfs.trigger(cf_e("prev", conf)))
                            }), opts.pagination.keys && $(document).bind(cf_e("keyup", conf, !1, !0, !0), function(e) {
                                var t = e.keyCode;
                                t >= 49 && t < 58 && (t = (t - 49) * opts.items.visible, t <= itms.total && (e.preventDefault(), $cfs.trigger(cf_e("slideTo", conf), [t, 0, !0, opts.pagination])))
                            }), $.fn.swipe) {
                            var t = "ontouchstart" in window;
                            if (t && opts.swipe.onTouch || !t && opts.swipe.onMouse) {
                                var i = $.extend(!0, {}, opts.prev, opts.swipe),
                                    n = $.extend(!0, {}, opts.next, opts.swipe),
                                    s = function() {
                                        $cfs.trigger(cf_e("prev", conf), [i])
                                    },
                                    o = function() {
                                        $cfs.trigger(cf_e("next", conf), [n])
                                    };
                                switch (opts.direction) {
                                    case "up":
                                    case "down":
                                        opts.swipe.options.swipeUp = o, opts.swipe.options.swipeDown = s;
                                        break;
                                    default:
                                        opts.swipe.options.swipeLeft = o, opts.swipe.options.swipeRight = s
                                }
                                crsl.swipe && $cfs.swipe("destroy"), $wrp.swipe(opts.swipe.options), $wrp.css("cursor", "move"), crsl.swipe = !0
                            }
                        }
                        if ($.fn.mousewheel && opts.mousewheel) {
                            var r = $.extend(!0, {}, opts.prev, opts.mousewheel),
                                a = $.extend(!0, {}, opts.next, opts.mousewheel);
                            crsl.mousewheel && $wrp.unbind(cf_e("mousewheel", conf, !1)), $wrp.bind(cf_e("mousewheel", conf, !1), function(e, t) {
                                e.preventDefault(), t > 0 ? $cfs.trigger(cf_e("prev", conf), [r]) : $cfs.trigger(cf_e("next", conf), [a])
                            }), crsl.mousewheel = !0
                        }
                        if (opts.auto.play && $cfs.trigger(cf_e("play", conf), opts.auto.delay), crsl.upDateOnWindowResize) {
                            var c = function(e) {
                                    $cfs.trigger(cf_e("finish", conf)), opts.auto.pauseOnResize && !crsl.isPaused && $cfs.trigger(cf_e("play", conf)), sz_resetMargin($cfs.children(), opts), $cfs.trigger(cf_e("updateSizes", conf))
                                },
                                l = $(window),
                                u = null;
                            if ($.debounce && "debounce" == conf.onWindowResize) u = $.debounce(200, c);
                            else if ($.throttle && "throttle" == conf.onWindowResize) u = $.throttle(300, c);
                            else {
                                var f = 0,
                                    d = 0;
                                u = function() {
                                    var e = l.width(),
                                        t = l.height();
                                    e == f && t == d || (c(), f = e, d = t)
                                }
                            }
                            l.bind(cf_e("resize", conf, !1, !0, !0), u)
                        }
                    }, FN._unbind_buttons = function() {
                        var e = (cf_e("", conf), cf_e("", conf, !1));
                        ns3 = cf_e("", conf, !1, !0, !0), $(document).unbind(ns3), $(window).unbind(ns3), $wrp.unbind(e), opts.auto.button && opts.auto.button.unbind(e), opts.prev.button && opts.prev.button.unbind(e),
                            opts.next.button && opts.next.button.unbind(e), opts.pagination.container && (opts.pagination.container.unbind(e), opts.pagination.anchorBuilder && opts.pagination.container.children().remove()), crsl.swipe && ($cfs.swipe("destroy"), $wrp.css("cursor", "default"), crsl.swipe = !1), crsl.mousewheel && (crsl.mousewheel = !1), nv_showNavi(opts, "hide", conf), nv_enableNavi(opts, "removeClass", conf)
                    }, is_boolean(configs) && (configs = {
                        debug: configs
                    });
                    var crsl = {
                            direction: "next",
                            isPaused: !0,
                            isScrolling: !1,
                            isStopped: !1,
                            mousewheel: !1,
                            swipe: !1
                        },
                        itms = {
                            total: $cfs.children().length,
                            first: 0
                        },
                        tmrs = {
                            auto: null,
                            progress: null,
                            startTime: getTime(),
                            timePassed: 0
                        },
                        scrl = {
                            isStopped: !1,
                            duration: 0,
                            startTime: 0,
                            easing: "",
                            anims: []
                        },
                        clbk = {
                            onBefore: [],
                            onAfter: []
                        },
                        queu = [],
                        conf = $.extend(!0, {}, $.fn.carouFredSel.configs, configs),
                        opts = {},
                        opts_orig = $.extend(!0, {}, options),
                        $wrp = "parent" == conf.wrapper ? $cfs.parent() : $cfs.wrap("<" + conf.wrapper.element + ' class="' + conf.wrapper.classname + '" />').parent();
                    if (conf.selector = $cfs.selector, conf.serialNumber = $.fn.carouFredSel.serialNumber++, conf.transition = conf.transition && $.fn.transition ? "transition" : "animate", FN._init(opts_orig, !0, starting_position), FN._build(), FN._bind_events(), FN._bind_buttons(), is_array(opts.items.start)) var start_arr = opts.items.start;
                    else {
                        var start_arr = [];
                        0 != opts.items.start && start_arr.push(opts.items.start)
                    }
                    if (opts.cookie && start_arr.unshift(parseInt(cf_getCookie(opts.cookie), 10)), start_arr.length > 0)
                        for (var a = 0, l = start_arr.length; a < l; a++) {
                            var s = start_arr[a];
                            if (0 != s) {
                                if (s === !0) {
                                    if (s = window.location.hash, s.length < 1) continue
                                } else "random" === s && (s = Math.floor(Math.random() * itms.total));
                                if ($cfs.triggerHandler(cf_e("slideTo", conf), [s, 0, !0, {
                                        fx: "none"
                                    }])) break
                            }
                        }
                    var siz = sz_setSizes($cfs, opts),
                        itm = gi_getCurrentItems($cfs.children(), opts);
                    return opts.onCreate && opts.onCreate.call($tt0, {
                        width: siz.width,
                        height: siz.height,
                        items: itm
                    }), $cfs.trigger(cf_e("updatePageStatus", conf), [!0, siz]), $cfs.trigger(cf_e("linkAnchors", conf)), conf.debug && $cfs.trigger(cf_e("debug", conf)), $cfs
                }, $.fn.carouFredSel.serialNumber = 1, $.fn.carouFredSel.defaults = {
                    synchronise: !1,
                    infinite: !0,
                    circular: !0,
                    responsive: !1,
                    direction: "left",
                    items: {
                        start: 0
                    },
                    scroll: {
                        easing: "swing",
                        duration: 500,
                        pauseOnHover: !1,
                        event: "click",
                        queue: !1
                    }
                }, $.fn.carouFredSel.configs = {
                    debug: !1,
                    transition: !1,
                    onWindowResize: "throttle",
                    events: {
                        prefix: "",
                        namespace: "cfs"
                    },
                    wrapper: {
                        element: "div",
                        classname: "caroufredsel_wrapper"
                    },
                    classnames: {}
                }, $.fn.carouFredSel.pageAnchorBuilder = function(e) {
                    return '<a href="#"><span>' + e + "</span></a>"
                }, $.fn.carouFredSel.progressbarUpdater = function(e) {
                    $(this).css("width", e + "%")
                }, $.fn.carouFredSel.cookie = {
                    get: function(e) {
                        e += "=";
                        for (var t = document.cookie.split(";"), i = 0, n = t.length; i < n; i++) {
                            for (var s = t[i];
                                " " == s.charAt(0);) s = s.slice(1);
                            if (0 == s.indexOf(e)) return s.slice(e.length)
                        }
                        return 0
                    },
                    set: function(e, t, i) {
                        var n = "";
                        if (i) {
                            var s = new Date;
                            s.setTime(s.getTime() + 24 * i * 60 * 60 * 1e3), n = "; expires=" + s.toGMTString()
                        }
                        document.cookie = e + "=" + t + n + "; path=/"
                    },
                    remove: function(e) {
                        $.fn.carouFredSel.cookie.set(e, "", -1)
                    }
                }, $.extend($.easing, {
                    quadratic: function(e) {
                        var t = e * e;
                        return e * (-t * e + 4 * t - 6 * e + 4)
                    },
                    cubic: function(e) {
                        return e * (4 * e * e - 9 * e + 6)
                    },
                    elastic: function(e) {
                        var t = e * e;
                        return e * (33 * t * t - 106 * t * e + 126 * t - 67 * e + 15)
                    }
                }))
            }(jQuery),
            function(e) {
                e.fn.idiotscroll = function(t) {
                    t = e.extend({
                        width_element: 410,
                        element: "a",
                        scrollInterval: 20,
                        scrollStep: 1
                    }, t);
                    var i = 0,
                        n = 1,
                        s = 1;
                    return this.each(function() {
                        var o = e(this),
                            r = e("#" + o.attr("id") + " .scrollWrapper .scrollableArea div").length,
                            a = 3 * r * t.width_element + 42 * r,
                            c = r * t.width_element + 14 * r;
                        i = c, o.children(".scrollingHotSpotLeft").css("opacity", "0.35"), o.children(".scrollingHotSpotRight").css("opacity", "0.35"), e(document).on("mouseup touchend", ".scrollingHotSpotRight, .scrollingHotSpotLeft", function() {
                            n = 1
                        }), e(document).on("mousedown touchstart", ".scrollingHotSpotRight", function() {
                            n = 10, s = 1
                        }), e(document).on("mousedown touchstart", ".scrollingHotSpotLeft", function() {
                            n = 10, s = -1
                        }), o.children(".scrollWrapper").children(".scrollableArea").css("width", a);
                        var l = e(".scrollableArea").html();
                        e(".scrollableArea").append(l), e(".scrollableArea").prepend(l);
                        var u = a - e(".scrollWrapper").width(),
                            f = 0;
                        setInterval(function() {
                            i > u && (i = c - e(".scrollWrapper").width()), i < f + 40 && (i = c + 40), i += s * t.scrollStep * n, e(".scrollWrapper").scrollLeft(i)
                        }, t.scrollInterval)
                    })
                }
            }(jQuery),
            function(e, t, i) {
                "use strict";

                function n(i) {
                    if (s = t.documentElement, o = t.body, X(), ae = this, i = i || {}, de = i.constants || {}, i.easing)
                        for (var n in i.easing) U[n] = i.easing[n];
                    Se = i.edgeStrategy || "set", ue = {
                        beforerender: i.beforerender,
                        render: i.render,
                        keyframe: i.keyframe
                    }, fe = i.forceHeight !== !1, fe && (Ne = i.scale || 1), pe = i.mobileDeceleration || M, me = i.smoothScrolling !== !1, be = i.smoothScrollingDuration || C, Te = {
                        targetTop: ae.getScrollTop()
                    }, ze = (i.mobileCheck || function() {
                        return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || e.opera)
                    })(), ze ? (le = t.getElementById(i.skrollrBody || G), le && re(), q(), Be(s, [h, _], [S])) : Be(s, [h, v], [S]), ae.refresh(), Pe(e, "resize orientationchange", function() {
                        var e = s.clientWidth,
                            t = s.clientHeight;
                        t === Re && e === Fe || (Re = t, Fe = e, Le = !0)
                    });
                    var r = j();
                    return function e() {
                        Y(), _e = r(e)
                    }(), ae
                }
                var s, o, r = {
                        get: function() {
                            return ae
                        },
                        init: function(e) {
                            return ae || new n(e)
                        },
                        VERSION: "0.6.29"
                    },
                    a = Object.prototype.hasOwnProperty,
                    c = e.Math,
                    l = e.getComputedStyle,
                    u = "touchstart",
                    f = "touchmove",
                    d = "touchcancel",
                    p = "touchend",
                    g = "skrollable",
                    m = g + "-before",
                    b = g + "-between",
                    T = g + "-after",
                    h = "skrollr",
                    S = "no-" + h,
                    v = h + "-desktop",
                    _ = h + "-mobile",
                    P = "linear",
                    A = 1e3,
                    M = .004,
                    G = "skrollr-body",
                    C = 200,
                    H = "start",
                    w = "end",
                    I = "center",
                    B = "bottom",
                    y = "___skrollable_id",
                    E = /^(?:input|textarea|button|select)$/i,
                    x = /^\s+|\s+$/g,
                    D = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,
                    $ = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,
                    N = /^(@?[a-z\-]+)\[(\w+)\]$/,
                    k = /-([a-z0-9_])/g,
                    V = function(e, t) {
                        return t.toUpperCase()
                    },
                    O = /[\-+]?[\d]*\.?[\d]+/g,
                    F = /\{\?\}/g,
                    R = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,
                    L = /[a-z\-]+-gradient/g,
                    W = "",
                    z = "",
                    X = function() {
                        var e = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
                        if (l) {
                            var t = l(o, null);
                            for (var i in t)
                                if (W = i.match(e) || +i == i && t[i].match(e)) break;
                            if (!W) return void(W = z = "");
                            W = W[0], "-" === W.slice(0, 1) ? (z = W, W = {
                                "-webkit-": "webkit",
                                "-moz-": "Moz",
                                "-ms-": "ms",
                                "-o-": "O"
                            }[W]) : z = "-" + W.toLowerCase() + "-"
                        }
                    },
                    j = function() {
                        var t = e.requestAnimationFrame || e[W.toLowerCase() + "RequestAnimationFrame"],
                            i = xe();
                        return !ze && t || (t = function(t) {
                            var n = xe() - i,
                                s = c.max(0, 1e3 / 60 - n);
                            return e.setTimeout(function() {
                                i = xe(), t()
                            }, s)
                        }), t
                    },
                    K = function() {
                        var t = e.cancelAnimationFrame || e[W.toLowerCase() + "CancelAnimationFrame"];
                        return !ze && t || (t = function(t) {
                            return e.clearTimeout(t)
                        }), t
                    },
                    U = {
                        begin: function() {
                            return 0
                        },
                        end: function() {
                            return 1
                        },
                        linear: function(e) {
                            return e
                        },
                        quadratic: function(e) {
                            return e * e
                        },
                        cubic: function(e) {
                            return e * e * e
                        },
                        swing: function(e) {
                            return -c.cos(e * c.PI) / 2 + .5
                        },
                        sqrt: function(e) {
                            return c.sqrt(e)
                        },
                        outCubic: function(e) {
                            return c.pow(e - 1, 3) + 1
                        },
                        bounce: function(e) {
                            var t;
                            if (e <= .5083) t = 3;
                            else if (e <= .8489) t = 9;
                            else if (e <= .96208) t = 27;
                            else {
                                if (!(e <= .99981)) return 1;
                                t = 91
                            }
                            return 1 - c.abs(3 * c.cos(e * t * 1.028) / t)
                        }
                    };
                n.prototype.refresh = function(e) {
                    var n, s, o = !1;
                    for (e === i ? (o = !0, ce = [], We = 0, e = t.getElementsByTagName("*")) : e.length === i && (e = [e]), n = 0, s = e.length; n < s; n++) {
                        var r = e[n],
                            a = r,
                            c = [],
                            l = me,
                            u = Se,
                            f = !1;
                        if (o && y in r && delete r[y], r.attributes) {
                            for (var d = 0, p = r.attributes.length; d < p; d++) {
                                var m = r.attributes[d];
                                if ("data-anchor-target" !== m.name)
                                    if ("data-smooth-scrolling" !== m.name)
                                        if ("data-edge-strategy" !== m.name)
                                            if ("data-emit-events" !== m.name) {
                                                var b = m.name.match(D);
                                                if (null !== b) {
                                                    var T = {
                                                        props: m.value,
                                                        element: r,
                                                        eventType: m.name.replace(k, V)
                                                    };
                                                    c.push(T);
                                                    var h = b[1];
                                                    h && (T.constant = h.substr(1));
                                                    var S = b[2];
                                                    /p$/.test(S) ? (T.isPercentage = !0, T.offset = (0 | S.slice(0, -1)) / 100) : T.offset = 0 | S;
                                                    var v = b[3],
                                                        _ = b[4] || v;
                                                    v && v !== H && v !== w ? (T.mode = "relative", T.anchors = [v, _]) : (T.mode = "absolute", v === w ? T.isEnd = !0 : T.isPercentage || (T.offset = T.offset * Ne))
                                                }
                                            } else f = !0;
                                else u = m.value;
                                else l = "off" !== m.value;
                                else if (a = t.querySelector(m.value), null === a) throw 'Unable to find anchor target "' + m.value + '"'
                            }
                            if (c.length) {
                                var P, A, M;
                                !o && y in r ? (M = r[y], P = ce[M].styleAttr, A = ce[M].classAttr) : (M = r[y] = We++, P = r.style.cssText, A = Ie(r)), ce[M] = {
                                    element: r,
                                    styleAttr: P,
                                    classAttr: A,
                                    anchorTarget: a,
                                    keyFrames: c,
                                    smoothScrolling: l,
                                    edgeStrategy: u,
                                    emitEvents: f,
                                    lastFrameIndex: -1
                                }, Be(r, [g], [])
                            }
                        }
                    }
                    for (Ce(), n = 0, s = e.length; n < s; n++) {
                        var G = ce[e[n][y]];
                        G !== i && (J(G), te(G))
                    }
                    return ae
                }, n.prototype.relativeToAbsolute = function(e, t, i) {
                    var n = s.clientHeight,
                        o = e.getBoundingClientRect(),
                        r = o.top,
                        a = o.bottom - o.top;
                    return t === B ? r -= n : t === I && (r -= n / 2), i === B ? r += a : i === I && (r += a / 2), r += ae.getScrollTop(), r + .5 | 0
                }, n.prototype.animateTo = function(e, t) {
                    t = t || {};
                    var n = xe(),
                        s = ae.getScrollTop();
                    return ge = {
                        startTop: s,
                        topDiff: e - s,
                        targetTop: e,
                        duration: t.duration || A,
                        startTime: n,
                        endTime: n + (t.duration || A),
                        easing: U[t.easing || P],
                        done: t.done
                    }, ge.topDiff || (ge.done && ge.done.call(ae, !1), ge = i), ae
                }, n.prototype.stopAnimateTo = function() {
                    ge && ge.done && ge.done.call(ae, !0), ge = i
                }, n.prototype.isAnimatingTo = function() {
                    return !!ge
                }, n.prototype.isMobile = function() {
                    return ze
                }, n.prototype.setScrollTop = function(t, i) {
                    return he = i === !0, ze ? Xe = c.min(c.max(t, 0), $e) : e.scrollTo(0, t), ae
                }, n.prototype.getScrollTop = function() {
                    return ze ? Xe : e.pageYOffset || s.scrollTop || o.scrollTop || 0
                }, n.prototype.getMaxScrollTop = function() {
                    return $e
                }, n.prototype.on = function(e, t) {
                    return ue[e] = t, ae
                }, n.prototype.off = function(e) {
                    return delete ue[e], ae
                }, n.prototype.destroy = function() {
                    var e = K();
                    e(_e), Me(), Be(s, [S], [h, v, _]);
                    for (var t = 0, n = ce.length; t < n; t++) oe(ce[t].element);
                    s.style.overflow = o.style.overflow = "", s.style.height = o.style.height = "", le && r.setStyle(le, "transform", "none"), ae = i, le = i, ue = i, fe = i, $e = 0, Ne = 1, de = i, pe = i, ke = "down", Ve = -1, Fe = 0, Re = 0, Le = !1, ge = i, me = i, be = i, Te = i, he = i, We = 0, Se = i, ze = !1, Xe = 0, ve = i
                };
                var q = function() {
                        var n, r, a, l, g, m, b, T, h, S, v, _;
                        Pe(s, [u, f, d, p].join(" "), function(e) {
                            var s = e.changedTouches[0];
                            for (l = e.target; 3 === l.nodeType;) l = l.parentNode;
                            switch (g = s.clientY, m = s.clientX, S = e.timeStamp, E.test(l.tagName) || e.preventDefault(), e.type) {
                                case u:
                                    n && n.blur(), ae.stopAnimateTo(), n = l, r = b = g, a = m, h = S;
                                    break;
                                case f:
                                    E.test(l.tagName) && t.activeElement !== l && e.preventDefault(), T = g - b, _ = S - v, ae.setScrollTop(Xe - T, !0), b = g, v = S;
                                    break;
                                default:
                                case d:
                                case p:
                                    var o = r - g,
                                        P = a - m,
                                        A = P * P + o * o;
                                    if (A < 49) {
                                        if (!E.test(n.tagName)) {
                                            n.focus();
                                            var M = t.createEvent("MouseEvents");
                                            M.initMouseEvent("click", !0, !0, e.view, 1, s.screenX, s.screenY, s.clientX, s.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), n.dispatchEvent(M)
                                        }
                                        return
                                    }
                                    n = i;
                                    var G = T / _;
                                    G = c.max(c.min(G, 3), -3);
                                    var C = c.abs(G / pe),
                                        H = G * C + .5 * pe * C * C,
                                        w = ae.getScrollTop() - H,
                                        I = 0;
                                    w > $e ? (I = ($e - w) / H, w = $e) : w < 0 && (I = -w / H, w = 0), C *= 1 - I, ae.animateTo(w + .5 | 0, {
                                        easing: "outCubic",
                                        duration: C
                                    })
                            }
                        }), e.scrollTo(0, 0), s.style.overflow = o.style.overflow = "hidden"
                    },
                    Q = function() {
                        var e, t, i, n, o, r, a, l, u, f, d, p = s.clientHeight,
                            g = He();
                        for (l = 0, u = ce.length; l < u; l++)
                            for (e = ce[l], t = e.element, i = e.anchorTarget, n = e.keyFrames, o = 0, r = n.length; o < r; o++) a = n[o], f = a.offset, d = g[a.constant] || 0, a.frame = f, a.isPercentage && (f *= p, a.frame = f), "relative" === a.mode && (oe(t), a.frame = ae.relativeToAbsolute(i, a.anchors[0], a.anchors[1]) - f, oe(t, !0)), a.frame += d, fe && !a.isEnd && a.frame > $e && ($e = a.frame);
                        for ($e = c.max($e, we()), l = 0, u = ce.length; l < u; l++) {
                            for (e = ce[l], n = e.keyFrames, o = 0, r = n.length; o < r; o++) a = n[o], d = g[a.constant] || 0, a.isEnd && (a.frame = $e - a.offset + d);
                            e.keyFrames.sort(De)
                        }
                    },
                    Z = function(e, t) {
                        for (var i = 0, n = ce.length; i < n; i++) {
                            var s, o, c = ce[i],
                                l = c.element,
                                u = c.smoothScrolling ? e : t,
                                f = c.keyFrames,
                                d = f.length,
                                p = f[0],
                                h = f[f.length - 1],
                                S = u < p.frame,
                                v = u > h.frame,
                                _ = S ? p : h,
                                P = c.emitEvents,
                                A = c.lastFrameIndex;
                            if (S || v) {
                                if (S && c.edge === -1 || v && 1 === c.edge) continue;
                                switch (S ? (Be(l, [m], [T, b]), P && A > -1 && (Ge(l, p.eventType, ke), c.lastFrameIndex = -1)) : (Be(l, [T], [m, b]), P && A < d && (Ge(l, h.eventType, ke), c.lastFrameIndex = d)), c.edge = S ? -1 : 1, c.edgeStrategy) {
                                    case "reset":
                                        oe(l);
                                        continue;
                                    case "ease":
                                        u = _.frame;
                                        break;
                                    default:
                                    case "set":
                                        var M = _.props;
                                        for (s in M) a.call(M, s) && (o = se(M[s].value), 0 === s.indexOf("@") ? l.setAttribute(s.substr(1), o) : r.setStyle(l, s, o));
                                        continue
                                }
                            } else 0 !== c.edge && (Be(l, [g, b], [m, T]), c.edge = 0);
                            for (var G = 0; G < d - 1; G++)
                                if (u >= f[G].frame && u <= f[G + 1].frame) {
                                    var C = f[G],
                                        H = f[G + 1];
                                    for (s in C.props)
                                        if (a.call(C.props, s)) {
                                            var w = (u - C.frame) / (H.frame - C.frame);
                                            w = C.props[s].easing(w), o = ne(C.props[s].value, H.props[s].value, w), o = se(o), 0 === s.indexOf("@") ? l.setAttribute(s.substr(1), o) : r.setStyle(l, s, o)
                                        }
                                    P && A !== G && ("down" === ke ? Ge(l, C.eventType, ke) : Ge(l, H.eventType, ke), c.lastFrameIndex = G);
                                    break
                                }
                        }
                    },
                    Y = function() {
                        Le && (Le = !1, Ce());
                        var e, t, n = ae.getScrollTop(),
                            s = xe();
                        if (ge) s >= ge.endTime ? (n = ge.targetTop, e = ge.done, ge = i) : (t = ge.easing((s - ge.startTime) / ge.duration), n = ge.startTop + t * ge.topDiff | 0), ae.setScrollTop(n, !0);
                        else if (!he) {
                            var o = Te.targetTop - n;
                            o && (Te = {
                                startTop: Ve,
                                topDiff: n - Ve,
                                targetTop: n,
                                startTime: Oe,
                                endTime: Oe + be
                            }), s <= Te.endTime && (t = U.sqrt((s - Te.startTime) / be), n = Te.startTop + t * Te.topDiff | 0)
                        }
                        if (ze && le && r.setStyle(le, "transform", "translate(0, " + -Xe + "px) " + ve), he || Ve !== n) {
                            ke = n > Ve ? "down" : n < Ve ? "up" : ke, he = !1;
                            var a = {
                                    curTop: n,
                                    lastTop: Ve,
                                    maxTop: $e,
                                    direction: ke
                                },
                                c = ue.beforerender && ue.beforerender.call(ae, a);
                            c !== !1 && (Z(n, ae.getScrollTop()), Ve = n, ue.render && ue.render.call(ae, a)), e && e.call(ae, !1)
                        }
                        Oe = s
                    },
                    J = function(e) {
                        for (var t = 0, i = e.keyFrames.length; t < i; t++) {
                            for (var n, s, o, r, a = e.keyFrames[t], c = {}; null !== (r = $.exec(a.props));) o = r[1], s = r[2], n = o.match(N), null !== n ? (o = n[1], n = n[2]) : n = P, s = s.indexOf("!") ? ee(s) : [s.slice(1)], c[o] = {
                                value: s,
                                easing: U[n]
                            };
                            a.props = c
                        }
                    },
                    ee = function(e) {
                        var t = [];
                        return R.lastIndex = 0, e = e.replace(R, function(e) {
                            return e.replace(O, function(e) {
                                return e / 255 * 100 + "%"
                            })
                        }), z && (L.lastIndex = 0, e = e.replace(L, function(e) {
                            return z + e
                        })), e = e.replace(O, function(e) {
                            return t.push(+e), "{?}"
                        }), t.unshift(e), t
                    },
                    te = function(e) {
                        var t, i, n = {};
                        for (t = 0, i = e.keyFrames.length; t < i; t++) ie(e.keyFrames[t], n);
                        for (n = {}, t = e.keyFrames.length - 1; t >= 0; t--) ie(e.keyFrames[t], n)
                    },
                    ie = function(e, t) {
                        var i;
                        for (i in t) a.call(e.props, i) || (e.props[i] = t[i]);
                        for (i in e.props) t[i] = e.props[i]
                    },
                    ne = function(e, t, i) {
                        var n, s = e.length;
                        if (s !== t.length) throw "Can't interpolate between \"" + e[0] + '" and "' + t[0] + '"';
                        var o = [e[0]];
                        for (n = 1; n < s; n++) o[n] = e[n] + (t[n] - e[n]) * i;
                        return o
                    },
                    se = function(e) {
                        var t = 1;
                        return F.lastIndex = 0, e[0].replace(F, function() {
                            return e[t++]
                        })
                    },
                    oe = function(e, t) {
                        e = [].concat(e);
                        for (var i, n, s = 0, o = e.length; s < o; s++) n = e[s], i = ce[n[y]], i && (t ? (n.style.cssText = i.dirtyStyleAttr, Be(n, i.dirtyClassAttr)) : (i.dirtyStyleAttr = n.style.cssText, i.dirtyClassAttr = Ie(n), n.style.cssText = i.styleAttr, Be(n, i.classAttr)))
                    },
                    re = function() {
                        ve = "translateZ(0)", r.setStyle(le, "transform", ve);
                        var e = l(le),
                            t = e.getPropertyValue("transform"),
                            i = e.getPropertyValue(z + "transform"),
                            n = t && "none" !== t || i && "none" !== i;
                        n || (ve = "")
                    };
                r.setStyle = function(e, t, i) {
                    var n = e.style;
                    if (t = t.replace(k, V).replace("-", ""), "zIndex" === t) isNaN(i) ? n[t] = i : n[t] = "" + (0 | i);
                    else if ("float" === t) n.styleFloat = n.cssFloat = i;
                    else try {
                        W && (n[W + t.slice(0, 1).toUpperCase() + t.slice(1)] = i), n[t] = i
                    } catch (e) {}
                };
                var ae, ce, le, ue, fe, de, pe, ge, me, be, Te, he, Se, ve, _e, Pe = r.addEvent = function(t, i, n) {
                        var s = function(t) {
                            return t = t || e.event, t.target || (t.target = t.srcElement), t.preventDefault || (t.preventDefault = function() {
                                t.returnValue = !1, t.defaultPrevented = !0
                            }), n.call(this, t)
                        };
                        i = i.split(" ");
                        for (var o, r = 0, a = i.length; r < a; r++) o = i[r], t.addEventListener ? t.addEventListener(o, n, !1) : t.attachEvent("on" + o, s), je.push({
                            element: t,
                            name: o,
                            listener: n
                        })
                    },
                    Ae = r.removeEvent = function(e, t, i) {
                        t = t.split(" ");
                        for (var n = 0, s = t.length; n < s; n++) e.removeEventListener ? e.removeEventListener(t[n], i, !1) : e.detachEvent("on" + t[n], i)
                    },
                    Me = function() {
                        for (var e, t = 0, i = je.length; t < i; t++) e = je[t], Ae(e.element, e.name, e.listener);
                        je = []
                    },
                    Ge = function(e, t, i) {
                        ue.keyframe && ue.keyframe.call(ae, e, t, i)
                    },
                    Ce = function() {
                        var e = ae.getScrollTop();
                        $e = 0, fe && !ze && (o.style.height = ""), Q(), fe && !ze && (o.style.height = $e + s.clientHeight + "px"), ze ? ae.setScrollTop(c.min(ae.getScrollTop(), $e)) : ae.setScrollTop(e, !0), he = !0
                    },
                    He = function() {
                        var e, t, i = s.clientHeight,
                            n = {};
                        for (e in de) t = de[e], "function" == typeof t ? t = t.call(ae) : /p$/.test(t) && (t = t.slice(0, -1) / 100 * i), n[e] = t;
                        return n
                    },
                    we = function() {
                        var e, t = 0;
                        return le && (t = c.max(le.offsetHeight, le.scrollHeight)), e = c.max(t, o.scrollHeight, o.offsetHeight, s.scrollHeight, s.offsetHeight, s.clientHeight), e - s.clientHeight
                    },
                    Ie = function(t) {
                        var i = "className";
                        return e.SVGElement && t instanceof e.SVGElement && (t = t[i], i = "baseVal"), t[i]
                    },
                    Be = function(t, n, s) {
                        var o = "className";
                        if (e.SVGElement && t instanceof e.SVGElement && (t = t[o], o = "baseVal"), s === i) return void(t[o] = n);
                        for (var r = t[o], a = 0, c = s.length; a < c; a++) r = Ee(r).replace(Ee(s[a]), " ");
                        r = ye(r);
                        for (var l = 0, u = n.length; l < u; l++) Ee(r).indexOf(Ee(n[l])) === -1 && (r += " " + n[l]);
                        t[o] = ye(r)
                    },
                    ye = function(e) {
                        return e.replace(x, "")
                    },
                    Ee = function(e) {
                        return " " + e + " "
                    },
                    xe = Date.now || function() {
                        return +new Date
                    },
                    De = function(e, t) {
                        return e.frame - t.frame
                    },
                    $e = 0,
                    Ne = 1,
                    ke = "down",
                    Ve = -1,
                    Oe = xe(),
                    Fe = 0,
                    Re = 0,
                    Le = !1,
                    We = 0,
                    ze = !1,
                    Xe = 0,
                    je = [];
                "function" == typeof define && define.amd ? define([], function() {
                    return r
                }) : "undefined" != typeof module && module.exports ? module.exports = r : e.skrollr = r
            }(window, document),
            function(e, t, i, n) {
                "use strict";

                function s(e) {
                    return ("string" == typeof e || e instanceof String) && (e = e.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, "")), e
                }

                function o(e) {
                    this.selector = e, this.query = ""
                }
                var r = function(t) {
                    var i = e("head");
                    i.prepend(e.map(t, function(e) {
                        if (0 === i.has("." + e).length) return '<meta class="' + e + '" />'
                    }))
                };
                r(["foundation-mq-small", "foundation-mq-small-only", "foundation-mq-medium", "foundation-mq-medium-only", "foundation-mq-large", "foundation-mq-large-only", "foundation-mq-xlarge", "foundation-mq-xlarge-only", "foundation-mq-xxlarge", "foundation-data-attribute-namespace"]), e(function() {
                    "undefined" != typeof FastClick && "undefined" != typeof i.body && FastClick.attach(i.body)
                });
                var a = function(t, n) {
                        if ("string" == typeof t) {
                            if (n) {
                                var s;
                                if (n.jquery) {
                                    if (s = n[0], !s) return n
                                } else s = n;
                                return e(s.querySelectorAll(t))
                            }
                            return e(i.querySelectorAll(t))
                        }
                        return e(t, n)
                    },
                    c = function(e) {
                        var t = [];
                        return e || t.push("data"), this.namespace.length > 0 && t.push(this.namespace), t.push(this.name), t.join("-")
                    },
                    l = function(e) {
                        for (var t = e.split("-"), i = t.length, n = []; i--;) 0 !== i ? n.push(t[i]) : this.namespace.length > 0 ? n.push(this.namespace, t[i]) : n.push(t[i]);
                        return n.reverse().join("-")
                    },
                    u = function(t, i) {
                        var n = this,
                            s = function() {
                                var s = a(this),
                                    o = !s.data(n.attr_name(!0) + "-init");
                                s.data(n.attr_name(!0) + "-init", e.extend({}, n.settings, i || t, n.data_options(s))), o && n.events(this)
                            };
                        if (a(this.scope).is("[" + this.attr_name() + "]") ? s.call(this.scope) : a("[" + this.attr_name() + "]", this.scope).each(s), "string" == typeof t) return this[t].call(this, i)
                    },
                    f = function(e, t) {
                        function i() {
                            t(e[0])
                        }

                        function n() {
                            if (this.one("load", i), /MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                                var e = this.attr("src"),
                                    t = e.match(/\?/) ? "&" : "?";
                                t += "random=" + (new Date).getTime(), this.attr("src", e + t)
                            }
                        }
                        return e.attr("src") ? void(e[0].complete || 4 === e[0].readyState ? i() : n.call(e)) : void i()
                    };
                t.matchMedia || (t.matchMedia = function() {
                        var e = t.styleMedia || t.media;
                        if (!e) {
                            var n = i.createElement("style"),
                                s = i.getElementsByTagName("script")[0],
                                o = null;
                            n.type = "text/css", n.id = "matchmediajs-test", s.parentNode.insertBefore(n, s), o = "getComputedStyle" in t && t.getComputedStyle(n, null) || n.currentStyle, e = {
                                matchMedium: function(e) {
                                    var t = "@media " + e + "{ #matchmediajs-test { width: 1px; } }";
                                    return n.styleSheet ? n.styleSheet.cssText = t : n.textContent = t, "1px" === o.width
                                }
                            }
                        }
                        return function(t) {
                            return {
                                matches: e.matchMedium(t || "all"),
                                media: t || "all"
                            }
                        }
                    }()),
                    function(e) {
                        function i() {
                            n && (r(i), c && e.fx.tick())
                        }
                        for (var n, s = 0, o = ["webkit", "moz"], r = t.requestAnimationFrame, a = t.cancelAnimationFrame, c = "undefined" != typeof e.fx; s < o.length && !r; s++) r = t[o[s] + "RequestAnimationFrame"], a = a || t[o[s] + "CancelAnimationFrame"] || t[o[s] + "CancelRequestAnimationFrame"];
                        r ? (t.requestAnimationFrame = r, t.cancelAnimationFrame = a, c && (e.fx.timer = function(t) {
                            t() && e.timers.push(t) && !n && (n = !0, i())
                        }, e.fx.stop = function() {
                            n = !1
                        })) : (t.requestAnimationFrame = function(e) {
                            var i = (new Date).getTime(),
                                n = Math.max(0, 16 - (i - s)),
                                o = t.setTimeout(function() {
                                    e(i + n)
                                }, n);
                            return s = i + n, o
                        }, t.cancelAnimationFrame = function(e) {
                            clearTimeout(e)
                        })
                    }(e), o.prototype.toString = function() {
                        return this.query || (this.query = a(this.selector).css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""))
                    }, t.Foundation = {
                        name: "Foundation",
                        version: "5.5.3",
                        media_queries: {
                            small: new o(".foundation-mq-small"),
                            "small-only": new o(".foundation-mq-small-only"),
                            medium: new o(".foundation-mq-medium"),
                            "medium-only": new o(".foundation-mq-medium-only"),
                            large: new o(".foundation-mq-large"),
                            "large-only": new o(".foundation-mq-large-only"),
                            xlarge: new o(".foundation-mq-xlarge"),
                            "xlarge-only": new o(".foundation-mq-xlarge-only"),
                            xxlarge: new o(".foundation-mq-xxlarge")
                        },
                        stylesheet: e("<style></style>").appendTo("head")[0].sheet,
                        global: {
                            namespace: n
                        },
                        init: function(e, i, n, s, o) {
                            var r = [e, n, s, o],
                                c = [];
                            if (this.rtl = /rtl/i.test(a("html").attr("dir")), this.scope = e || this.scope, this.set_namespace(), i && "string" == typeof i && !/reflow/i.test(i)) this.libs.hasOwnProperty(i) && c.push(this.init_lib(i, r));
                            else
                                for (var l in this.libs) c.push(this.init_lib(l, i));
                            return a(t).load(function() {
                                a(t).trigger("resize.fndtn.clearing").trigger("resize.fndtn.dropdown").trigger("resize.fndtn.equalizer").trigger("resize.fndtn.interchange").trigger("resize.fndtn.joyride").trigger("resize.fndtn.magellan").trigger("resize.fndtn.topbar").trigger("resize.fndtn.slider")
                            }), e
                        },
                        init_lib: function(t, i) {
                            return this.libs.hasOwnProperty(t) ? (this.patch(this.libs[t]), i && i.hasOwnProperty(t) ? ("undefined" != typeof this.libs[t].settings ? e.extend(!0, this.libs[t].settings, i[t]) : "undefined" != typeof this.libs[t].defaults && e.extend(!0, this.libs[t].defaults, i[t]), this.libs[t].init.apply(this.libs[t], [this.scope, i[t]])) : (i = i instanceof Array ? i : new Array(i), this.libs[t].init.apply(this.libs[t], i))) : function() {}
                        },
                        patch: function(e) {
                            e.scope = this.scope, e.namespace = this.global.namespace, e.rtl = this.rtl, e.data_options = this.utils.data_options, e.attr_name = c, e.add_namespace = l, e.bindings = u, e.S = this.utils.S
                        },
                        inherit: function(e, t) {
                            for (var i = t.split(" "), n = i.length; n--;) this.utils.hasOwnProperty(i[n]) && (e[i[n]] = this.utils[i[n]])
                        },
                        set_namespace: function() {
                            var t = this.global.namespace === n ? e(".foundation-data-attribute-namespace").css("font-family") : this.global.namespace;
                            this.global.namespace = t === n || /false/i.test(t) ? "" : t
                        },
                        libs: {},
                        utils: {
                            S: a,
                            throttle: function(e, t) {
                                var i = null;
                                return function() {
                                    var n = this,
                                        s = arguments;
                                    null == i && (i = setTimeout(function() {
                                        e.apply(n, s), i = null
                                    }, t))
                                }
                            },
                            debounce: function(e, t, i) {
                                var n, s;
                                return function() {
                                    var o = this,
                                        r = arguments,
                                        a = function() {
                                            n = null, i || (s = e.apply(o, r))
                                        },
                                        c = i && !n;
                                    return clearTimeout(n), n = setTimeout(a, t), c && (s = e.apply(o, r)), s
                                }
                            },
                            data_options: function(t, i) {
                                function n(e) {
                                    return !isNaN(e - 0) && null !== e && "" !== e && e !== !1 && e !== !0
                                }

                                function s(t) {
                                    return "string" == typeof t ? e.trim(t) : t
                                }
                                i = i || "options";
                                var o, r, a, c = {},
                                    l = function(e) {
                                        var t = Foundation.global.namespace;
                                        return t.length > 0 ? e.data(t + "-" + i) : e.data(i)
                                    },
                                    u = l(t);
                                if ("object" == typeof u) return u;
                                for (a = (u || ":").split(";"), o = a.length; o--;) r = a[o].split(":"), r = [r[0], r.slice(1).join(":")], /true/i.test(r[1]) && (r[1] = !0), /false/i.test(r[1]) && (r[1] = !1), n(r[1]) && (r[1].indexOf(".") === -1 ? r[1] = parseInt(r[1], 10) : r[1] = parseFloat(r[1])), 2 === r.length && r[0].length > 0 && (c[s(r[0])] = s(r[1]));
                                return c
                            },
                            register_media: function(t, i) {
                                Foundation.media_queries[t] === n && (e("head").append('<meta class="' + i + '"/>'), Foundation.media_queries[t] = s(e("." + i).css("font-family")))
                            },
                            add_custom_rule: function(e, t) {
                                if (t === n && Foundation.stylesheet) Foundation.stylesheet.insertRule(e, Foundation.stylesheet.cssRules.length);
                                else {
                                    var i = Foundation.media_queries[t];
                                    i !== n && Foundation.stylesheet.insertRule("@media " + Foundation.media_queries[t] + "{ " + e + " }", Foundation.stylesheet.cssRules.length)
                                }
                            },
                            image_loaded: function(e, t) {
                                function i(e) {
                                    for (var t = e.length, i = t - 1; i >= 0; i--)
                                        if (e.attr("height") === n) return !1;
                                    return !0
                                }
                                var s = this,
                                    o = e.length;
                                (0 === o || i(e)) && t(e), e.each(function() {
                                    f(s.S(this), function() {
                                        o -= 1, 0 === o && t(e)
                                    })
                                })
                            },
                            random_str: function() {
                                return this.fidx || (this.fidx = 0), this.prefix = this.prefix || [this.name || "F", (+new Date).toString(36)].join("-"), this.prefix + (this.fidx++).toString(36)
                            },
                            match: function(e) {
                                return t.matchMedia(e).matches
                            },
                            is_small_up: function() {
                                return this.match(Foundation.media_queries.small)
                            },
                            is_medium_up: function() {
                                return this.match(Foundation.media_queries.medium)
                            },
                            is_large_up: function() {
                                return this.match(Foundation.media_queries.large)
                            },
                            is_xlarge_up: function() {
                                return this.match(Foundation.media_queries.xlarge)
                            },
                            is_xxlarge_up: function() {
                                return this.match(Foundation.media_queries.xxlarge)
                            },
                            is_small_only: function() {
                                return !(this.is_medium_up() || this.is_large_up() || this.is_xlarge_up() || this.is_xxlarge_up())
                            },
                            is_medium_only: function() {
                                return this.is_medium_up() && !this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up()
                            },
                            is_large_only: function() {
                                return this.is_medium_up() && this.is_large_up() && !this.is_xlarge_up() && !this.is_xxlarge_up()
                            },
                            is_xlarge_only: function() {
                                return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && !this.is_xxlarge_up()
                            },
                            is_xxlarge_only: function() {
                                return this.is_medium_up() && this.is_large_up() && this.is_xlarge_up() && this.is_xxlarge_up()
                            }
                        }
                    }, e.fn.foundation = function() {
                        var e = Array.prototype.slice.call(arguments, 0);
                        return this.each(function() {
                            return Foundation.init.apply(Foundation, [this].concat(e)), this
                        })
                    }
            }(jQuery, window, window.document),
            function(e, t, i, n) {
                "use strict";
                Foundation.libs.offcanvas = {
                    name: "offcanvas",
                    version: "5.5.3",
                    settings: {
                        open_method: "move",
                        close_on_click: !1
                    },
                    init: function(e, t, i) {
                        this.bindings(t, i)
                    },
                    events: function() {
                        var t = this,
                            i = t.S,
                            n = "",
                            s = "",
                            o = "",
                            r = "",
                            a = "";
                        "move" === this.settings.open_method ? (n = "move-", s = "right", o = "left", r = "top", a = "bottom") : "overlap_single" === this.settings.open_method ? (n = "offcanvas-overlap-", s = "right", o = "left", r = "top", a = "bottom") : "overlap" === this.settings.open_method && (n = "offcanvas-overlap"), i(this.scope).off(".offcanvas").on("click.fndtn.offcanvas", ".left-off-canvas-toggle", function(o) {
                            t.click_toggle_class(o, n + s), "overlap" !== t.settings.open_method && i(".left-submenu").removeClass(n + s), e(".left-off-canvas-toggle").attr("aria-expanded", "true")
                        }).on("click.fndtn.offcanvas", ".left-off-canvas-menu a", function(o) {
                            var r = t.get_settings(o),
                                a = i(this).parent();
                            !r.close_on_click || a.hasClass("has-submenu") || a.hasClass("back") ? i(this).parent().hasClass("has-submenu") ? (o.preventDefault(), i(this).siblings(".left-submenu").toggleClass(n + s)) : a.hasClass("back") && (o.preventDefault(), a.parent().removeClass(n + s)) : (t.hide.call(t, n + s, t.get_wrapper(o)), a.parent().removeClass(n + s)), e(".left-off-canvas-toggle").attr("aria-expanded", "true")
                        }).on("click.fndtn.offcanvas", ".right-off-canvas-toggle", function(s) {
                            t.click_toggle_class(s, n + o), "overlap" !== t.settings.open_method && i(".right-submenu").removeClass(n + o), e(".right-off-canvas-toggle").attr("aria-expanded", "true")
                        }).on("click.fndtn.offcanvas", ".right-off-canvas-menu a", function(s) {
                            var r = t.get_settings(s),
                                a = i(this).parent();
                            !r.close_on_click || a.hasClass("has-submenu") || a.hasClass("back") ? i(this).parent().hasClass("has-submenu") ? (s.preventDefault(), i(this).siblings(".right-submenu").toggleClass(n + o)) : a.hasClass("back") && (s.preventDefault(), a.parent().removeClass(n + o)) : (t.hide.call(t, n + o, t.get_wrapper(s)), a.parent().removeClass(n + o)), e(".right-off-canvas-toggle").attr("aria-expanded", "true")
                        }).on("click.fndtn.offcanvas", ".top-off-canvas-toggle", function(s) {
                            t.click_toggle_class(s, n + a), "overlap" !== t.settings.open_method && i(".top-submenu").removeClass(n + a), e(".top-off-canvas-toggle").attr("aria-expanded", "true")
                        }).on("click.fndtn.offcanvas", ".top-off-canvas-menu a", function(s) {
                            var o = t.get_settings(s),
                                r = i(this).parent();
                            !o.close_on_click || r.hasClass("has-submenu") || r.hasClass("back") ? i(this).parent().hasClass("has-submenu") ? (s.preventDefault(), i(this).siblings(".top-submenu").toggleClass(n + a)) : r.hasClass("back") && (s.preventDefault(), r.parent().removeClass(n + a)) : (t.hide.call(t, n + a, t.get_wrapper(s)), r.parent().removeClass(n + a)), e(".top-off-canvas-toggle").attr("aria-expanded", "true")
                        }).on("click.fndtn.offcanvas", ".bottom-off-canvas-toggle", function(s) {
                            t.click_toggle_class(s, n + r), "overlap" !== t.settings.open_method && i(".bottom-submenu").removeClass(n + r), e(".bottom-off-canvas-toggle").attr("aria-expanded", "true")
                        }).on("click.fndtn.offcanvas", ".bottom-off-canvas-menu a", function(s) {
                            var o = t.get_settings(s),
                                a = i(this).parent();
                            !o.close_on_click || a.hasClass("has-submenu") || a.hasClass("back") ? i(this).parent().hasClass("has-submenu") ? (s.preventDefault(), i(this).siblings(".bottom-submenu").toggleClass(n + r)) : a.hasClass("back") && (s.preventDefault(), a.parent().removeClass(n + r)) : (t.hide.call(t, n + r, t.get_wrapper(s)), a.parent().removeClass(n + r)), e(".bottom-off-canvas-toggle").attr("aria-expanded", "true")
                        }).on("click.fndtn.offcanvas", ".exit-off-canvas", function(r) {
                            t.click_remove_class(r, n + o), i(".right-submenu").removeClass(n + o), s && (t.click_remove_class(r, n + s), i(".left-submenu").removeClass(n + o)), e(".right-off-canvas-toggle").attr("aria-expanded", "true")
                        }).on("click.fndtn.offcanvas", ".exit-off-canvas", function(i) {
                            t.click_remove_class(i, n + o), e(".left-off-canvas-toggle").attr("aria-expanded", "false"), s && (t.click_remove_class(i, n + s), e(".right-off-canvas-toggle").attr("aria-expanded", "false"))
                        }).on("click.fndtn.offcanvas", ".exit-off-canvas", function(s) {
                            t.click_remove_class(s, n + r), i(".bottom-submenu").removeClass(n + r), a && (t.click_remove_class(s, n + a), i(".top-submenu").removeClass(n + r)), e(".bottom-off-canvas-toggle").attr("aria-expanded", "true")
                        }).on("click.fndtn.offcanvas", ".exit-off-canvas", function(i) {
                            t.click_remove_class(i, n + r), e(".top-off-canvas-toggle").attr("aria-expanded", "false"), a && (t.click_remove_class(i, n + a), e(".bottom-off-canvas-toggle").attr("aria-expanded", "false"))
                        })
                    },
                    toggle: function(e, t) {
                        t = t || this.get_wrapper(), t.is("." + e) ? this.hide(e, t) : this.show(e, t)
                    },
                    show: function(e, t) {
                        t = t || this.get_wrapper(), t.trigger("open.fndtn.offcanvas"), t.addClass(e)
                    },
                    hide: function(e, t) {
                        t = t || this.get_wrapper(), t.trigger("close.fndtn.offcanvas"), t.removeClass(e)
                    },
                    click_toggle_class: function(e, t) {
                        e.preventDefault();
                        var i = this.get_wrapper(e);
                        this.toggle(t, i)
                    },
                    click_remove_class: function(e, t) {
                        e.preventDefault();
                        var i = this.get_wrapper(e);
                        this.hide(t, i)
                    },
                    get_settings: function(e) {
                        var t = this.S(e.target).closest("[" + this.attr_name() + "]");
                        return t.data(this.attr_name(!0) + "-init") || this.settings
                    },
                    get_wrapper: function(e) {
                        var t = this.S(e ? e.target : this.scope).closest(".off-canvas-wrap");
                        return 0 === t.length && (t = this.S(".off-canvas-wrap")), t
                    },
                    reflow: function() {}
                }
            }(jQuery, window, window.document),
            function(e) {
                function t() {
                    var e = document.createElement("input"),
                        t = "onpaste";
                    return e.setAttribute(t, ""), "function" == typeof e[t] ? "paste" : "input"
                }
                var i, n = t() + ".mask",
                    s = navigator.userAgent,
                    o = /iphone/i.test(s),
                    r = /android/i.test(s);
                e.mask = {
                    definitions: {
                        9: "[0-9]",
                        a: "[A-Za-z]",
                        "*": "[A-Za-z0-9]"
                    },
                    dataName: "rawMaskFn",
                    placeholder: "_"
                }, e.fn.extend({
                    caret: function(e, t) {
                        var i;
                        if (0 !== this.length && !this.is(":hidden")) return "number" == typeof e ? (t = "number" == typeof t ? t : e, this.each(function() {
                            this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && (i = this.createTextRange(), i.collapse(!0), i.moveEnd("character", t), i.moveStart("character", e), i.select())
                        })) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (i = document.selection.createRange(), e = 0 - i.duplicate().moveStart("character", -1e5), t = e + i.text.length), {
                            begin: e,
                            end: t
                        })
                    },
                    unmask: function() {
                        return this.trigger("unmask")
                    },
                    mask: function(t, s) {
                        var a, c, l, u, f, d;
                        return !t && this.length > 0 ? (a = e(this[0]), a.data(e.mask.dataName)()) : (s = e.extend({
                            placeholder: e.mask.placeholder,
                            completed: null
                        }, s), c = e.mask.definitions, l = [], u = d = t.length, f = null, e.each(t.split(""), function(e, t) {
                            "?" == t ? (d--, u = e) : c[t] ? (l.push(RegExp(c[t])), null === f && (f = l.length - 1)) : l.push(null)
                        }), this.trigger("unmask").each(function() {
                            function a(e) {
                                for (; d > ++e && !l[e];);
                                return e
                            }

                            function p(e) {
                                for (; --e >= 0 && !l[e];);
                                return e
                            }

                            function g(e, t) {
                                var i, n;
                                if (!(0 > e)) {
                                    for (i = e, n = a(t); d > i; i++)
                                        if (l[i]) {
                                            if (!(d > n && l[i].test(P[n]))) break;
                                            P[i] = P[n], P[n] = s.placeholder, n = a(n)
                                        }
                                    S(), _.caret(Math.max(f, e))
                                }
                            }

                            function m(e) {
                                var t, i, n, o;
                                for (t = e, i = s.placeholder; d > t; t++)
                                    if (l[t]) {
                                        if (n = a(t), o = P[t], P[t] = i, !(d > n && l[n].test(o))) break;
                                        i = o
                                    }
                            }

                            function b(e) {
                                var t, i, n, s = e.which;
                                8 === s || 46 === s || o && 127 === s ? (t = _.caret(), i = t.begin, n = t.end, 0 === n - i && (i = 46 !== s ? p(i) : n = a(i - 1), n = 46 === s ? a(n) : n), h(i, n), g(i, n - 1), e.preventDefault()) : 27 == s && (_.val(A), _.caret(0, v()), e.preventDefault())
                            }

                            function T(t) {
                                var i, n, o, c = t.which,
                                    u = _.caret();
                                t.ctrlKey || t.altKey || t.metaKey || 32 > c || c && (0 !== u.end - u.begin && (h(u.begin, u.end), g(u.begin, u.end - 1)), i = a(u.begin - 1), d > i && (n = String.fromCharCode(c), l[i].test(n) && (m(i), P[i] = n, S(), o = a(i), r ? setTimeout(e.proxy(e.fn.caret, _, o), 0) : _.caret(o), s.completed && o >= d && s.completed.call(_))), t.preventDefault())
                            }

                            function h(e, t) {
                                var i;
                                for (i = e; t > i && d > i; i++) l[i] && (P[i] = s.placeholder)
                            }

                            function S() {
                                _.val(P.join(""))
                            }

                            function v(e) {
                                var t, i, n = _.val(),
                                    o = -1;
                                for (t = 0, pos = 0; d > t; t++)
                                    if (l[t]) {
                                        for (P[t] = s.placeholder; pos++ < n.length;)
                                            if (i = n.charAt(pos - 1), l[t].test(i)) {
                                                P[t] = i, o = t;
                                                break
                                            }
                                        if (pos > n.length) break
                                    } else P[t] === n.charAt(pos) && t !== u && (pos++, o = t);
                                return e ? S() : u > o + 1 ? (_.val(""), h(0, d)) : (S(), _.val(_.val().substring(0, o + 1))), u ? t : f
                            }
                            var _ = e(this),
                                P = e.map(t.split(""), function(e) {
                                    return "?" != e ? c[e] ? s.placeholder : e : void 0
                                }),
                                A = _.val();
                            _.data(e.mask.dataName, function() {
                                return e.map(P, function(e, t) {
                                    return l[t] && e != s.placeholder ? e : null
                                }).join("")
                            }), _.attr("readonly") || _.one("unmask", function() {
                                _.unbind(".mask").removeData(e.mask.dataName)
                            }).bind("focus.mask", function() {
                                clearTimeout(i);
                                var e;
                                A = _.val(), e = v(), i = setTimeout(function() {
                                    S(), e == t.length ? _.caret(0, e) : _.caret(e)
                                }, 10)
                            }).bind("blur.mask", function() {
                                v(), _.val() != A && _.change()
                            }).bind("keydown.mask", b).bind("keypress.mask", T).bind(n, function() {
                                setTimeout(function() {
                                    var e = v(!0);
                                    _.caret(e), s.completed && e == _.val().length && s.completed.call(_)
                                }, 0)
                            }), v()
                        }))
                    }
                })
            }(jQuery),
            function(e, t) {
                e(function() {
                    "use strict";

                    function e(e, t) {
                        return null != e && null != t && e.toLowerCase() === t.toLowerCase()
                    }

                    function i(e, t) {
                        var i, n, s = e.length;
                        if (!s || !t) return !1;
                        for (i = t.toLowerCase(), n = 0; n < s; ++n)
                            if (i === e[n].toLowerCase()) return !0;
                        return !1
                    }

                    function n(e) {
                        for (var t in e) a.call(e, t) && (e[t] = new RegExp(e[t], "i"))
                    }

                    function s(e, t) {
                        this.ua = e || "", this._cache = {}, this.maxPhoneWidth = t || 600
                    }
                    var o = {};
                    o.mobileDetectRules = {
                        phones: {
                            iPhone: "\\biPhone\\b|\\biPod\\b",
                            BlackBerry: "BlackBerry|\\bBB10\\b|rim[0-9]+",
                            HTC: "HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m",
                            Nexus: "Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 6",
                            Dell: "Dell.*Streak|Dell.*Aero|Dell.*Venue|DELL.*Venue Pro|Dell Flash|Dell Smoke|Dell Mini 3iX|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b",
                            Motorola: "Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b",
                            Samsung: "Samsung|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205|SM-G9350|SM-J120F",
                            LG: "\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802|MS323)",
                            Sony: "SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533",
                            Asus: "Asus.*Galaxy|PadFone.*Mobile",
                            NokiaLumia: "Lumia [0-9]{3,4}",
                            Micromax: "Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b",
                            Palm: "PalmSource|Palm",
                            Vertu: "Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature",
                            Pantech: "PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790",
                            Fly: "IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250",
                            Wiko: "KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA(?!nna)|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM",
                            iMobile: "i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)",
                            SimValley: "\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b",
                            Wolfgang: "AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q",
                            Alcatel: "Alcatel",
                            Nintendo: "Nintendo 3DS",
                            Amoi: "Amoi",
                            INQ: "INQ",
                            GenericPhone: "Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser"
                        },
                        tablets: {
                            iPad: "iPad|iPad.*Mobile",
                            NexusTablet: "Android.*Nexus[\\s]+(7|9|10)",
                            SamsungTablet: "SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T815|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715|SM-T560|SM-T670|SM-T677|SM-T377|SM-T567|SM-T357T|SM-T555|SM-T561",
                            Kindle: "Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI|KFARWI)\\b",
                            SurfaceTablet: "Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)",
                            HPTablet: "HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10",
                            AsusTablet: "^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K017 |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C|P01Y|PO1MA",
                            BlackBerryTablet: "PlayBook|RIM Tablet",
                            HTCtablet: "HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410",
                            MotorolaTablet: "xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617",
                            NookTablet: "Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2",
                            AcerTablet: "Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b|\\bA3-A20",
                            ToshibaTablet: "Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO",
                            LGTablet: "\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b",
                            FujitsuTablet: "Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b",
                            PrestigioTablet: "PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002",
                            LenovoTablet: "Lenovo TAB|Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|YT3-X90L|YT3-X90F|YT3-X90X|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)",
                            DellTablet: "Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7",
                            YarvikTablet: "Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b",
                            MedionTablet: "Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB",
                            ArnovaTablet: "AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2",
                            IntensoTablet: "INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004",
                            IRUTablet: "M702pro",
                            MegafonTablet: "MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b",
                            EbodaTablet: "E-Boda (Supreme|Impresspeed|Izzycomm|Essential)",
                            AllViewTablet: "Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)",
                            ArchosTablet: "\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b",
                            AinolTablet: "NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark",
                            NokiaLumiaTablet: "Lumia 2520",
                            SonyTablet: "Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP612|SOT31",
                            PhilipsTablet: "\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b",
                            CubeTablet: "Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT",
                            CobyTablet: "MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010",
                            MIDTablet: "M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733|MID4X10",
                            MSITablet: "MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b",
                            SMiTTablet: "Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)",
                            RockChipTablet: "Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A",
                            FlyTablet: "IQ310|Fly Vision",
                            bqTablet: "Android.*(bq)?.*(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris E10)|Maxwell.*Lite|Maxwell.*Plus",
                            HuaweiTablet: "MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim",
                            NecTablet: "\\bN-06D|\\bN-08D",
                            PantechTablet: "Pantech.*P4100",
                            BronchoTablet: "Broncho.*(N701|N708|N802|a710)",
                            VersusTablet: "TOUCHPAD.*[78910]|\\bTOUCHTAB\\b",
                            ZyncTablet: "z1000|Z99 2G|z99|z930|z999|z990|z909|Z919|z900",
                            PositivoTablet: "TB07STA|TB10STA|TB07FTA|TB10FTA",
                            NabiTablet: "Android.*\\bNabi",
                            KoboTablet: "Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build",
                            DanewTablet: "DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b",
                            TexetTablet: "NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE",
                            PlaystationTablet: "Playstation.*(Portable|Vita)",
                            TrekstorTablet: "ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab",
                            PyleAudioTablet: "\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b",
                            AdvanTablet: "Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ",
                            DanyTechTablet: "Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1",
                            GalapadTablet: "Android.*\\bG1\\b",
                            MicromaxTablet: "Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b",
                            KarbonnTablet: "Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b",
                            AllFineTablet: "Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide",
                            PROSCANTablet: "\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b",
                            YONESTablet: "BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026",
                            ChangJiaTablet: "TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503",
                            GUTablet: "TX-A1301|TX-M9002|Q702|kf026",
                            PointOfViewTablet: "TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10",
                            OvermaxTablet: "OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)",
                            HCLTablet: "HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync",
                            DPSTablet: "DPS Dream 9|DPS Dual 7",
                            VistureTablet: "V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10",
                            CrestaTablet: "CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989",
                            MediatekTablet: "\\bMT8125|MT8389|MT8135|MT8377\\b",
                            ConcordeTablet: "Concorde([ ]+)?Tab|ConCorde ReadMan",
                            GoCleverTablet: "GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042",
                            ModecomTablet: "FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003",
                            VoninoTablet: "\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b",
                            ECSTablet: "V07OT2|TM105A|S10OT1|TR10CS1",
                            StorexTablet: "eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab",
                            VodafoneTablet: "SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7|VF-1497",
                            EssentielBTablet: "Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2",
                            RossMoorTablet: "RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711",
                            iMobileTablet: "i-mobile i-note",
                            TolinoTablet: "tolino tab [0-9.]+|tolino shine",
                            AudioSonicTablet: "\\bC-22Q|T7-QC|T-17B|T-17P\\b",
                            AMPETablet: "Android.* A78 ",
                            SkkTablet: "Android.* (SKYPAD|PHOENIX|CYCLOPS)",
                            TecnoTablet: "TECNO P9",
                            JXDTablet: "Android.* \\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b",
                            iJoyTablet: "Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)",
                            FX2Tablet: "FX2 PAD7|FX2 PAD10",
                            XoroTablet: "KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151",
                            ViewsonicTablet: "ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a",
                            OdysTablet: "LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10",
                            CaptivaTablet: "CAPTIVA PAD",
                            IconbitTablet: "NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S",
                            TeclastTablet: "T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi",
                            OndaTablet: "\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+",
                            JaytechTablet: "TPC-PA762",
                            BlaupunktTablet: "Endeavour 800NG|Endeavour 1010",
                            DigmaTablet: "\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b",
                            EvolioTablet: "ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b",
                            LavaTablet: "QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b",
                            AocTablet: "MW0811|MW0812|MW0922|MTK8382|MW1031|MW0831|MW0821|MW0931|MW0712",
                            MpmanTablet: "MP11 OCTA|MP10 OCTA|MPQC1114|MPQC1004|MPQC994|MPQC974|MPQC973|MPQC804|MPQC784|MPQC780|\\bMPG7\\b|MPDCG75|MPDCG71|MPDC1006|MP101DC|MPDC9000|MPDC905|MPDC706HD|MPDC706|MPDC705|MPDC110|MPDC100|MPDC99|MPDC97|MPDC88|MPDC8|MPDC77|MP709|MID701|MID711|MID170|MPDC703|MPQC1010",
                            CelkonTablet: "CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b",
                            WolderTablet: "miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b",
                            MiTablet: "\\bMI PAD\\b|\\bHM NOTE 1W\\b",
                            NibiruTablet: "Nibiru M1|Nibiru Jupiter One",
                            NexoTablet: "NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI",
                            LeaderTablet: "TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100",
                            UbislateTablet: "UbiSlate[\\s]?7C",
                            PocketBookTablet: "Pocketbook",
                            KocasoTablet: "\\b(TB-1207)\\b",
                            Hudl: "Hudl HT7S3|Hudl 2",
                            TelstraTablet: "T-Hub2",
                            GenericTablet: "Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bJolla\\b|\\bTP750\\b"
                        },
                        oss: {
                            AndroidOS: "Android",
                            BlackBerryOS: "blackberry|\\bBB10\\b|rim tablet os",
                            PalmOS: "PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino",
                            SymbianOS: "Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b",
                            WindowsMobileOS: "Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Window Mobile|Windows Phone [0-9.]+|WCE;",
                            WindowsPhoneOS: "Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;",
                            iOS: "\\biPhone.*Mobile|\\biPod|\\biPad",
                            MeeGoOS: "MeeGo",
                            MaemoOS: "Maemo",
                            JavaOS: "J2ME/|\\bMIDP\\b|\\bCLDC\\b",
                            webOS: "webOS|hpwOS",
                            badaOS: "\\bBada\\b",
                            BREWOS: "BREW"
                        },
                        uas: {
                            Vivaldi: "Vivaldi",
                            Chrome: "\\bCrMo\\b|CriOS|Android.*Chrome/[.0-9]* (Mobile)?",
                            Dolfin: "\\bDolfin\\b",
                            Opera: "Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR/[0-9.]+|Coast/[0-9.]+",
                            Skyfire: "Skyfire",
                            Edge: "Mobile Safari/[.0-9]* Edge",
                            IE: "IEMobile|MSIEMobile",
                            Firefox: "fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile",
                            Bolt: "bolt",
                            TeaShark: "teashark",
                            Blazer: "Blazer",
                            Safari: "Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari",
                            Tizen: "Tizen",
                            UCBrowser: "UC.*Browser|UCWEB",
                            baiduboxapp: "baiduboxapp",
                            baidubrowser: "baidubrowser",
                            DiigoBrowser: "DiigoBrowser",
                            Puffin: "Puffin",
                            Mercury: "\\bMercury\\b",
                            ObigoBrowser: "Obigo",
                            NetFront: "NF-Browser",
                            GenericBrowser: "NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger",
                            PaleMoon: "Android.*PaleMoon|Mobile.*PaleMoon"
                        },
                        props: {
                            Mobile: "Mobile/[VER]",
                            Build: "Build/[VER]",
                            Version: "Version/[VER]",
                            VendorID: "VendorID/[VER]",
                            iPad: "iPad.*CPU[a-z ]+[VER]",
                            iPhone: "iPhone.*CPU[a-z ]+[VER]",
                            iPod: "iPod.*CPU[a-z ]+[VER]",
                            Kindle: "Kindle/[VER]",
                            Chrome: ["Chrome/[VER]", "CriOS/[VER]", "CrMo/[VER]"],
                            Coast: ["Coast/[VER]"],
                            Dolfin: "Dolfin/[VER]",
                            Firefox: "Firefox/[VER]",
                            Fennec: "Fennec/[VER]",
                            Edge: "Edge/[VER]",
                            IE: ["IEMobile/[VER];", "IEMobile [VER]", "MSIE [VER];", "Trident/[0-9.]+;.*rv:[VER]"],
                            NetFront: "NetFront/[VER]",
                            NokiaBrowser: "NokiaBrowser/[VER]",
                            Opera: [" OPR/[VER]", "Opera Mini/[VER]", "Version/[VER]"],
                            "Opera Mini": "Opera Mini/[VER]",
                            "Opera Mobi": "Version/[VER]",
                            "UC Browser": "UC Browser[VER]",
                            MQQBrowser: "MQQBrowser/[VER]",
                            MicroMessenger: "MicroMessenger/[VER]",
                            baiduboxapp: "baiduboxapp/[VER]",
                            baidubrowser: "baidubrowser/[VER]",
                            Iron: "Iron/[VER]",
                            Safari: ["Version/[VER]", "Safari/[VER]"],
                            Skyfire: "Skyfire/[VER]",
                            Tizen: "Tizen/[VER]",
                            Webkit: "webkit[ /][VER]",
                            PaleMoon: "PaleMoon/[VER]",
                            Gecko: "Gecko/[VER]",
                            Trident: "Trident/[VER]",
                            Presto: "Presto/[VER]",
                            Goanna: "Goanna/[VER]",
                            iOS: " \\bi?OS\\b [VER][ ;]{1}",
                            Android: "Android [VER]",
                            BlackBerry: ["BlackBerry[\\w]+/[VER]", "BlackBerry.*Version/[VER]", "Version/[VER]"],
                            BREW: "BREW [VER]",
                            Java: "Java/[VER]",
                            "Windows Phone OS": ["Windows Phone OS [VER]", "Windows Phone [VER]"],
                            "Windows Phone": "Windows Phone [VER]",
                            "Windows CE": "Windows CE/[VER]",
                            "Windows NT": "Windows NT [VER]",
                            Symbian: ["SymbianOS/[VER]", "Symbian/[VER]"],
                            webOS: ["webOS/[VER]", "hpwOS/[VER];"]
                        },
                        utils: {
                            Bot: "Googlebot|facebookexternalhit|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom",
                            MobileBot: "Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker/M1A1-R2D2",
                            DesktopMode: "WPDesktop",
                            TV: "SonyDTV|HbbTV",
                            WebKit: "(webkit)[ /]([\\w.]+)",
                            Console: "\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|PLAYSTATION|Xbox)\\b",
                            Watch: "SM-V700"
                        }
                    }, o.detectMobileBrowsers = {
                        fullPattern: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
                        shortPattern: /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
                        tabletPattern: /android|ipad|playbook|silk/i
                    };
                    var r, a = Object.prototype.hasOwnProperty;
                    return o.FALLBACK_PHONE = "UnknownPhone", o.FALLBACK_TABLET = "UnknownTablet", o.FALLBACK_MOBILE = "UnknownMobile", r = "isArray" in Array ? Array.isArray : function(e) {
                            return "[object Array]" === Object.prototype.toString.call(e)
                        },
                        function() {
                            var e, t, i, s, c, l, u = o.mobileDetectRules;
                            for (e in u.props)
                                if (a.call(u.props, e)) {
                                    for (t = u.props[e], r(t) || (t = [t]), c = t.length, s = 0; s < c; ++s) i = t[s], l = i.indexOf("[VER]"), l >= 0 && (i = i.substring(0, l) + "([\\w._\\+]+)" + i.substring(l + 5)), t[s] = new RegExp(i, "i");
                                    u.props[e] = t
                                }
                            n(u.oss), n(u.phones), n(u.tablets), n(u.uas), n(u.utils), u.oss0 = {
                                WindowsPhoneOS: u.oss.WindowsPhoneOS,
                                WindowsMobileOS: u.oss.WindowsMobileOS
                            }
                        }(), o.findMatch = function(e, t) {
                            for (var i in e)
                                if (a.call(e, i) && e[i].test(t)) return i;
                            return null
                        }, o.findMatches = function(e, t) {
                            var i = [];
                            for (var n in e) a.call(e, n) && e[n].test(t) && i.push(n);
                            return i
                        }, o.getVersionStr = function(e, t) {
                            var i, n, s, r, c = o.mobileDetectRules.props;
                            if (a.call(c, e))
                                for (i = c[e], s = i.length, n = 0; n < s; ++n)
                                    if (r = i[n].exec(t), null !== r) return r[1];
                            return null
                        }, o.getVersion = function(e, t) {
                            var i = o.getVersionStr(e, t);
                            return i ? o.prepareVersionNo(i) : NaN
                        }, o.prepareVersionNo = function(e) {
                            var t;
                            return t = e.split(/[a-z._ \/\-]/i), 1 === t.length && (e = t[0]), t.length > 1 && (e = t[0] + ".", t.shift(), e += t.join("")), Number(e)
                        }, o.isMobileFallback = function(e) {
                            return o.detectMobileBrowsers.fullPattern.test(e) || o.detectMobileBrowsers.shortPattern.test(e.substr(0, 4))
                        }, o.isTabletFallback = function(e) {
                            return o.detectMobileBrowsers.tabletPattern.test(e)
                        }, o.prepareDetectionCache = function(e, i, n) {
                            if (e.mobile === t) {
                                var r, a, c;
                                return (a = o.findMatch(o.mobileDetectRules.tablets, i)) ? (e.mobile = e.tablet = a, void(e.phone = null)) : (r = o.findMatch(o.mobileDetectRules.phones, i)) ? (e.mobile = e.phone = r, void(e.tablet = null)) : void(o.isMobileFallback(i) ? (c = s.isPhoneSized(n), c === t ? (e.mobile = o.FALLBACK_MOBILE, e.tablet = e.phone = null) : c ? (e.mobile = e.phone = o.FALLBACK_PHONE, e.tablet = null) : (e.mobile = e.tablet = o.FALLBACK_TABLET, e.phone = null)) : o.isTabletFallback(i) ? (e.mobile = e.tablet = o.FALLBACK_TABLET, e.phone = null) : e.mobile = e.tablet = e.phone = null)
                            }
                        }, o.mobileGrade = function(e) {
                            var t = null !== e.mobile();
                            return e.os("iOS") && e.version("iPad") >= 4.3 || e.os("iOS") && e.version("iPhone") >= 3.1 || e.os("iOS") && e.version("iPod") >= 3.1 || e.version("Android") > 2.1 && e.is("Webkit") || e.version("Windows Phone OS") >= 7 || e.is("BlackBerry") && e.version("BlackBerry") >= 6 || e.match("Playbook.*Tablet") || e.version("webOS") >= 1.4 && e.match("Palm|Pre|Pixi") || e.match("hp.*TouchPad") || e.is("Firefox") && e.version("Firefox") >= 12 || e.is("Chrome") && e.is("AndroidOS") && e.version("Android") >= 4 || e.is("Skyfire") && e.version("Skyfire") >= 4.1 && e.is("AndroidOS") && e.version("Android") >= 2.3 || e.is("Opera") && e.version("Opera Mobi") > 11 && e.is("AndroidOS") || e.is("MeeGoOS") || e.is("Tizen") || e.is("Dolfin") && e.version("Bada") >= 2 || (e.is("UC Browser") || e.is("Dolfin")) && e.version("Android") >= 2.3 || e.match("Kindle Fire") || e.is("Kindle") && e.version("Kindle") >= 3 || e.is("AndroidOS") && e.is("NookTablet") || e.version("Chrome") >= 11 && !t || e.version("Safari") >= 5 && !t || e.version("Firefox") >= 4 && !t || e.version("MSIE") >= 7 && !t || e.version("Opera") >= 10 && !t ? "A" : e.os("iOS") && e.version("iPad") < 4.3 || e.os("iOS") && e.version("iPhone") < 3.1 || e.os("iOS") && e.version("iPod") < 3.1 || e.is("Blackberry") && e.version("BlackBerry") >= 5 && e.version("BlackBerry") < 6 || e.version("Opera Mini") >= 5 && e.version("Opera Mini") <= 6.5 && (e.version("Android") >= 2.3 || e.is("iOS")) || e.match("NokiaN8|NokiaC7|N97.*Series60|Symbian/3") || e.version("Opera Mobi") >= 11 && e.is("SymbianOS") ? "B" : (e.version("BlackBerry") < 5 || e.match("MSIEMobile|Windows CE.*Mobile") || e.version("Windows Mobile") <= 5.2, "C")
                        }, o.detectOS = function(e) {
                            return o.findMatch(o.mobileDetectRules.oss0, e) || o.findMatch(o.mobileDetectRules.oss, e)
                        }, o.getDeviceSmallerSide = function() {
                            return window.screen.width < window.screen.height ? window.screen.width : window.screen.height
                        }, s.prototype = {
                            constructor: s,
                            mobile: function() {
                                return o.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.mobile
                            },
                            phone: function() {
                                return o.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.phone
                            },
                            tablet: function() {
                                return o.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth), this._cache.tablet
                            },
                            userAgent: function() {
                                return this._cache.userAgent === t && (this._cache.userAgent = o.findMatch(o.mobileDetectRules.uas, this.ua)), this._cache.userAgent
                            },
                            userAgents: function() {
                                return this._cache.userAgents === t && (this._cache.userAgents = o.findMatches(o.mobileDetectRules.uas, this.ua)), this._cache.userAgents
                            },
                            os: function() {
                                return this._cache.os === t && (this._cache.os = o.detectOS(this.ua)), this._cache.os
                            },
                            version: function(e) {
                                return o.getVersion(e, this.ua)
                            },
                            versionStr: function(e) {
                                return o.getVersionStr(e, this.ua)
                            },
                            is: function(t) {
                                return i(this.userAgents(), t) || e(t, this.os()) || e(t, this.phone()) || e(t, this.tablet()) || i(o.findMatches(o.mobileDetectRules.utils, this.ua), t)
                            },
                            match: function(e) {
                                return e instanceof RegExp || (e = new RegExp(e, "i")), e.test(this.ua)
                            },
                            isPhoneSized: function(e) {
                                return s.isPhoneSized(e || this.maxPhoneWidth)
                            },
                            mobileGrade: function() {
                                return this._cache.grade === t && (this._cache.grade = o.mobileGrade(this)), this._cache.grade
                            }
                        }, "undefined" != typeof window && window.screen ? s.isPhoneSized = function(e) {
                            return e < 0 ? t : o.getDeviceSmallerSide() <= e
                        } : s.isPhoneSized = function() {}, s._impl = o, s.version = "1.3.3 2016-07-31", s
                })
            }(function(e) {
                if ("undefined" != typeof module && module.exports) return function(e) {
                    module.exports = e()
                };
                if ("function" == typeof define && define.amd) return define;
                if ("undefined" != typeof window) return function(e) {
                    window.MobileDetect = e()
                };
                throw new Error("unknown environment")
            }()),
            function(e, t, i) {
                e(function() {
                    "use strict";
                    "function" == typeof e.fancybox && jQuery.extend(jQuery.fancybox.defaults, {
                        margin: [80, 20, 20, 20]
                    }), e(document).foundation(), jQuery('input[type="tel"]').mask("+7 (999) 999 99 99"), e("#divscrolls").idiotscroll({
                        width_element: 706
                    }), e(".post-item_body div[id*=flash]").each(function() {
                        var t = e(this).data("swf"),
                            i = e(this).attr("id");
                        e("#" + i).flashembed({
                            src: t,
                            width: "650px",
                            height: "475px",
                            wmode: "opaque"
                        })
                    });
                    var t = e(".orbit_cats");
                    if (t.carouFredSel({
                            circular: !1,
                            infinite: !1,
                            width: 1182,
                            align: "center",
                            items: {
                                visible: 8,
                                start: 0
                            },
                            scroll: {
                                items: "page",
                                fx: "directscroll",
                                easing: "linear",
                                duration: 0
                            },
                            auto: !1,
                            prev: "#prev",
                            next: "#next",
                            onCreate: function(i) {
                                if (t.trigger("configuration", ["scroll.duration", 500]), e(window).width() < 1217)
                                    if (t.trigger("configuration", ["items.visible", 6]), t.trigger("configuration", ["width", 880]), t.trigger("configuration", ["scroll.items", 6]), t.find("li.current").length) {
                                        var n = t.find("li.current").index(),
                                            s = Math.ceil((n + 1) / 6),
                                            o = 6 * s - 6;
                                        o > t.find("li").length ? t.trigger("slideTo", n) : t.trigger("slideTo", o)
                                    } else var n = 0;
                                else if (t.trigger("configuration", ["items.visible", 8]), t.trigger("configuration", ["width", 1182]), t.trigger("configuration", ["scroll.items", 8]), t.find("li.current").length) {
                                    var n = t.find("li.current").index(),
                                        s = Math.ceil((n + 1) / 8),
                                        o = 8 * s - 8;
                                    o > t.find("li").length ? t.trigger("slideTo", n) : t.trigger("slideTo", o)
                                } else var n = 0
                            }
                        }), e(window).resize(function() {
                            var t = e(".orbit_cats");
                            e(window).width() < 1217 ? (t.trigger("configuration", ["items.visible", 6]), t.trigger("configuration", ["width", 880]), t.trigger("configuration", ["scroll.items", 6])) : (t.trigger("configuration", ["items.visible", 8]), t.trigger("configuration", ["width", 1182]), t.trigger("configuration", ["scroll.items", 8]))
                        }), e(".post-full").length > 0) {
                        var i = e(".post-full"),
                            n = i.offset(),
                            s = n.top,                    
                            o2 = i.find(".order-form2");
                        e(document).height();
                        e(window).width() > 1217 && e(window).scroll(function() {
                            var t = e(document).scrollTop();
                            t > s - 50 && t < s + i.height() - o2.height() - 100 ? o2.css("top", t - s + 50) : t >= s + i.height() - o2.height() - 100 ? o2.css("top", n) : o2.css("top", 0);
                            var n = o2.css("top")
                        });
                    }
                    if (e(".projects-cont").length > 0) {
                        var i = e(".projects-cont"),
                            n = i.offset(),
                            s = n.top,                       
                            o2 = i.find(".order-form2");
                        e(document).height();
                        e(window).width() > 1217 && e(window).scroll(function() {
                            var t = e(document).scrollTop();
                            t > s - 100 && t < s + i.height() - o2.height() - 100 ? o2.css("top", t - s + 100) : t >= s + i.height() - o2.height() - 100 ? o2.css("top", n) : o2.css("top", 0);
                            var n = o2.css("top")
                        });
                    }
                    e(window).width();
                    e(".search .close").click(function() {
                        e(".search form").removeClass("active")
                    }), e(document).on("click", ".search form", function(t) {
                        e(this).addClass("active"), e('.search input[type="text"]').focus()
                    }), e(".search form input[type=submit]").click(function() {
                        if (e(".search form").is(":not(.active)") || "" == e('.search input[type="text"]').val()) return !1
                    }), e(window).scroll(function() {
                        e(document).scrollTop() > 120 ? e("body").addClass("fixed-menu") : e("body").removeClass("fixed-menu")
                    }), e(".js__call-order").click(function() {
                        return e("body").addClass("opened-modal"), e("#call-order").fadeIn(), !1
                    }), e(".js__project-order").click(function() {
                        return e("body").addClass("opened-modal"), e("#project-order").fadeIn(), !1
                    }), e(".modal_close").click(function() {
                        return e("body").removeClass("opened-modal"), e(this).parents(".modal").fadeOut(), !1
                    }), e(".block--port .item a").hover(function() {
                        e(this).parent().addClass("hovered")
                    }, function() {
                        e(this).parent().removeClass("hovered")
                    }), e(window).load(function() {
                        var t = skrollr.init({
                            forceHeight: !1,
                            smoothScrolling: !1,
                            mobileCheck: function() {
                                return !1
                            }
                        });
                        e(".block--parralax").each(function() {
                            t.refresh(e(this))
                        })
                    });
                    var r = new MobileDetect(window.navigator.userAgent);
                    e(window).load(function() {
                        if (null == r.phone()) {
                            var t = e(".soda-grid_row .col1");
                            t.height(e(".soda-grid_row").height())
                        }
                    })
                })
            }(jQuery, this);
    })