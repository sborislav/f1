/*
 Copyright (c) 2013, Pavel Aleksandrov <inblank@yandex.ru>
 */
(function (c) {
    function m() {
        clearTimeout(s);
        c(".hinted").attr("title", q).removeClass("hinted");
        q = "";
        l.hide()
    }
    var l, s, q;
    l = c("<div>", {
        id: "hint",
        "class": "bottom"
    }).appendTo("body").mouseleave(function (h) {
        c(h.relatedTarget).hasClass("hinted") || m()
    });
    c(".calc").on("mouseenter", "[title],[data-hint]", function () {
        var h = c(this);
        h.attr("id");
        var m, r;
        h.hasClass("hinted") || (clearTimeout(s), q = h.attr("title"), m = ("self" == h.data("hint") ? h : c(h.data("hint")).first()).html() || q, h.attr("title", "").addClass("hinted"), s =
            setTimeout(function () {
                l.removeClass("bottom left right top").addClass(h.data("hintpos") || "top");
                l.html(m).show();
                switch (h.data("hintpos")) {
                    case "right":
                        r = {
                            top: h.offset().top + (h.outerHeight() - l.outerHeight(!0)) / 2,
                            left: h.offset().left + h.outerWidth()
                        };
                        break;
                    case "bottom":
                        r = {
                            top: h.offset().top + h.innerHeight() + 2,
                            left: h.offset().left - (l.outerWidth(!0) - h.outerWidth()) / 2
                        };
                        break;
                    case "left":
                        r = {
                            top: h.offset().top + (h.outerHeight() - l.outerHeight(!0)) / 2,
                            left: h.offset().left - l.outerWidth(!0)
                        };
                        break;
                    default:
                        r = {
                            top: h.offset().top -
                            l.outerHeight(!0),
                            left: h.offset().left - (l.outerWidth(!0) - h.outerWidth()) / 2
                        }
                }
                l.css(r)
            }, 100))
    }).on("mouseout", ".hinted", function (c) {
        "hint" != c.relatedTarget.id && m()
    })
})(jQuery);
(function (c) {
    c(function () {
        c(".calc input[type=radio]").each(function () {
            var m = c(this).hide(),
                l = c("label[for=" + m.attr("id") + "]");
            l.addClass(m.prop("checked") ? "checked" : "");
            if (!c.support.radioValue) l.on("click", function () {
                c("#" + c(this).attr("for")).trigger("change")
            })
        }).on("change", function () {
            var m = c(this);
            c("input[name=" + m.attr("name") + "]").each(function () {
                c(this).prev().removeClass("checked")
            });
            m.prop("checked", !0);
            c("label[for=" + m.attr("id") + "]").addClass("checked")
        })
    })
})(jQuery);
(function (c) {
    function m(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }

    function l(a) {
        a.data("val", a.data("_v").slice(0).sort(m));
        var b = a.data("opt"),
            e = a.data("val"),
            f = a.data("step"),
            d = t[b.type],
            g = 1 == e.length,
            k = a.data("handSize")[b.type] / 2,
            b = [g ? 0 : (e[0] - b.min) * f + k, (e[e.length - 1] - b.min) * f + k];
        c(".mark", a).css(d[1], b[0]).css(d[0].toLowerCase(), b[1] - b[0])
    }

    function s(a, b) {
        var e = a.closest(".sld"),
            f = e.data("opt"),
            d = t[f.type],
            g, k, h;
        e.data("step") || (e.data("handSize", {
            v: a.outerHeight(!0),
            h: a.outerWidth(!0)
        }), e.data("step", (e["inner" +
        d[0]]() - a["outer" + d[0]](!0)) / (f.max - f.min)));
        a.css(d[3], (e["outer" + d[4]](!0) - a["outer" + d[4]](!0)) / 2).css(d[1], h = (e.data("_v")[b] - f.min) * e.data("step"));
        f.showval && (g = c(".val", a), g.text(x(f.render, Math.round(e.data("_v")[b]))), k = g["outer" + d[0]](!0), k = (e.data("handSize")[f.type] - k) / 2, 0 > k + h && (k -= k + h), e = e["inner" + d[0]]() - (h + e.data("handSize")[f.type] - k), 0 > e && (k += e), g.css(d[1], k));
        return a
    }

    function q(a, b) {
        var c = a.data("opt");
        return Math.max(c.min, Math.min(c.max, b))
    }

    function h(a, b) {
        var e, f, d;
        c.isArray(b) ||
        (b = [b]);
        for (d = 0; d < b.length; d++) b[d] = q(a, b[d]), e = a.data("_v").push(b[d]) - 1, a.data("val", a.data("_v").slice(0).sort(m)), a.append(f = c("<div>", {
            "class": "hand",
            data: {
                index: e
            }
        }).on("mousedown touchstart", C).append(c("<span>", {
            "class": "val"
        }))), s(f, e), a.trigger("add");
        l(a);
        return e - b.length + 1
    }

    function u(a, b, e) {
        var f = null,
            d, g;
        c(".hand", a).each(function () {
            if (c(this).data("index") == b) return d = c(this), !1
        });
        if (d) {
            f = a.data("_v")[b];
            a.data("_v")[b] = q(a, e);
            s(d, b);
            l(a);
            for (g = 0; g < a.data("val").length; g++) a.data("val")[g] =
                Math.round(a.data("val")[g]);
            f != e && a.trigger("move")
        }
        return f
    }

    function r(a, b) {
        if (!a.data("_v")[b] || 2 > a.data("_v").length) return !1;
        a.data("_v").splice(b, 1);
        c(".hand", a).each(function () {
            var a = c(this);
            if (a.data("index") == b) return a.remove(), !1
        });
        for (var e = c(".hand", a), f = b + 1; f <= a.data("_v").length; f++) e.eq(f - 1).data("index", f - 1);
        l(a);
        a.trigger("delete");
        return !0
    }

    function x(a, b) {
        return a ? a(b) : b
    }

    function w(a, b) {
        var e = a.data("opt"),
            f = t[e.type],
            d = c("<a>", {
                "class": "label",
                href: "#",
                text: x(e.render, b),
                data: {
                    val: b
                }
            }),
            g, k;
        a.append(d);
        k = d["outer" + f[0]](!0) / 2;
        g = (b - e.min) * a.data("step") - k;
        g = b == e.max ? a["inner" + f[0]]() - 2 * k : b == e.min ? g + k : g + a.data("handSize")[e.type] / 2;
        d.css(f[1], g).css(f[3], a["outer" + f[4]]() + (a.data("handSize")[e.type] / 2 - a["outer" + f[4]]()) + 4)
    }

    function C(a) {
        c(".hand", n = (v = c(this)).parent()).css("zIndex", "");
        v.css("zIndex", 1);
        var b = n.data("opt");
        p = t[b.type];
        y = n.data("handSize")[b.type];
        z = n["inner" + p[0]]();
        c(".mark", n);
        A = Math.round(n.offset()[p[1]]) + (a.originalEvent.touches ? 0 : a["offset" + p[2]] || a.originalEvent["layer" +
        p[2]]);
        n.trigger("start");
        a.preventDefault()
    }

    function B(a) {
        var b = c.isNumeric(a);
        if (b || 2 != a.button && c(a.target).is(".sld, .sld>.mark")) {
            var e = c(this),
                f = e.data("opt"),
                d = t[f.type],
                g = e.data("_v"),
                f = b ? a : f.min + Math.round((a["page" + d[2]] - e.offset()[d[1]] - e.data("handSize")[f.type] / 2) / e.data("step")),
                k, d = -1,
                h, l;
            e.trigger("start");
            for (h = 0; h < g.length; h++)
                if (l = Math.abs(g[h] - f), 0 > d || l < d) d = l, k = h;
            u(e, k, f);
            e.trigger("end");
            b || a.preventDefault()
        }
    }
    var n, z, v, y, p, A, t = {
        v: ["Height", "top", "Y", "left", "Width"],
        h: ["Width",
            "left", "X", "top", "Height"
        ]
    };
    c.fn.slider = function (a, b, e) {
        var f = !1;
        c.each(this, function () {
            var d = c(this),
                g, k;
            if (d.hasClass("sld")) {
                switch (a) {
                    case "add":
                        h(d, b);
                        break;
                    case "set":
                        u(d, b, e);
                        break;
                    case "del":
                        r(d, b)
                }
                if (!c.isPlainObject(a)) return !0
            } else f = !0, d = c(">.sld", this);
            d.length ? (g = c.extend(d.data("opt"), a), k = a.val || d.data("val"), c(".hand, .slider", d).remove(), c(".mark", d).removeAttr("style")) : (g = c.extend({
                type: "h",
                min: 0,
                max: 100,
                val: [0],
                step: 0,
                render: null,
                label: 20,
                showmin: !0,
                showmax: !0,
                showval: !1
            }, a),
                k = c.isArray(g.val) ? g.val : [g.val], c(this).append(d = c("<div>", {
                "class": "sld"
            }).append(c("<div>", {
                "class": "mark"
            })).mousedown(B).on("click", ".label", function (a) {
                var b = c(this);
                B.call(b.parent(), b.data("val"));
                a.preventDefault()
            })));
            d[("v" == g.type ? "add" : "remove") + "Class"]("vertical").data({
                opt: g,
                _v: [],
                val: [],
                step: 0,
                handSize: 0
            });
            h(d, k);
            g.showmin && w(d, g.min);
            g.showmax && w(d, g.max);
            if (g.label) {
                var l = [];
                if (c.isArray(g.label)) l = g.label;
                else
                    for (k = g.min + g.label; k < g.max; k += g.label) l.push(k);
                for (k = 0; k < l.length; k++) w(d,
                    l[k])
            }
        });
        return f ? c(">.sld", this) : this
    };
    c(function () {
        function a(a) {
            a = a.originalEvent.touches ? "touchend" == a.type ? a.originalEvent.changedTouches[0]["page" + p[2]] : a.originalEvent.touches[0]["page" + p[2]] : a["page" + p[2]];
            return n.data("opt").min + Math.min(z - y, Math.max(0, a - A)) / n.data("step")
        }
        c(document).on("mousemove touchmove", function (b) {
            if (n) return u(n, v.data("index"), a(b)), !1
        }).on("mouseup touchend", function (b) {
            n && (u(n, v.data("index"), Math.round(a(b))), n.trigger("end"), n = null, b.preventDefault())
        })
    })
})(jQuery);