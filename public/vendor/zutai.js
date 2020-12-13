function dragImage(e) {
    e.dataTransfer.setData("text", stageOper.moudleObj[e.target.id])
}

function getStageStr() {
    return stageOper.getStageJson()
}! function (win) {
    "use strict";
    var StageOperation = function () {
        this.v = "1.0.1", this.moudleObj = {}
    };
    StageOperation.prototype = {
        constructor: StageOperation,
        initStage: function (stage_id, element) {
            var hardwareData = eval("initConfig." + initjson.hardwareDataFunction + "()");
            win.jyzt_hardwareData = hardwareData, console.log(win.jyzt_hardwareData);
            var stage, layer, layer_grid;
            if ("undefined" == typeof stage_id) {
                stage = new Konva.Stage({
                    container: "container",
                    width: 1024,
                    height: 768,
                    id: Math.uuid()
                }),
                 layer_grid = new Konva.Layer({
                    name: "layer_grid",
                    id: Math.uuid(),
                    clip: {
                        x: 0,
                        y: 0,
                        width: 1024,
                        height: 768
                    }
                }), stage.add(layer_grid);
                var background = new Konva.Rect({
                    x: 0,
                    y: 0,
                    stroke: "#000000",
                    width: stage.width(),
                    height: stage.height(),
                    fill: "rgba(255, 255, 255, 1)",
                    listening: !1,
                    strokeWidth: 1,
                    name: "layer_background"
                });
                layer_grid.add(background), layer_grid.draw(), layer = new Konva.Layer({
                        id: Math.uuid()
                    }), stage.add(layer), $("#container")
                    .height(768), $("#container")
                    .width(1024)
            } else {
                var stageObjJson = eval("initConfig." + initjson.editCallbackFunction + "(stage_id)");
                stage = Konva.Node.create(stageObjJson, "container"),
                layer_grid = stage.getLayers()[0],
                layer = stage.getLayers()[1],
                this.stage = stage,
                this.layer = layer;
                var groups = stage.find("Group");
                groups.each(function (e) {
                        stageOper.addModuleEvent(e),
                        stageOper.setGroupImage(e)
                    }), layer.draw(), $("#container")
                    .height(stage.height()), $("#container")
                    .width(stage.width())
            }
            this.element = element,
            this.stage = stage,
            this.layer = layer,
            this.layer_grid = layer_grid,
            this.initResolution(),
            this.initBackground()
        }, initResolution: function () {
            for (var e = this.stage.width(), t = this.stage.height(), a = initjson.stageResolution, r = "", i = 0; i < a.length; i++) {
                var o = a[i],
                    n = o.name,
                    l = o.value;
                r += " <option value='" + l + "'>" + n + "</option>"
            }
            $("#selectResolution")
                .html(r), $("#selectResolution")
                .val(e + "*" + t), form.render("select"), form.on("select(selectResolution)", function (e) {
                    var t = new Array;
                    t = e.value.split("*"), stageOper.setStageSize({
                        width: t[0],
                        height: t[1]
                    }), stageOper.setStageGrid($("#hbfzx")
                        .is(":checked")), stageOper.setStageBackground()
                })
        },
        initBackground: function () {
            var e = this.stage.findOne(".layer_background"),
                t = e.fill();
            $("#stageBackgroundColor")
                .val(t), colorpicker.render({
                    elem: "#stageBackgroundColorSelect",
                    color: t,
                    predefine: !0,
                    alpha: !0,
                    format: "rgb",
                    change: function (e) {
                        $("#stageBackgroundColor")
                            .val(e), stageOper.setStageBackground(e)
                    }
                })
        }, getStageJson: function () {
            try {
                var e = stageOper.layer.find("Group");
                e.each(function (e) {
                    var t = e.attrs.moduleType;
                    "BASELINE" == t && stageOper.removeLineEdit(e), "FLOWLINE" == t && stageOper.removeFlowLineEdit(e)
                }), this.layer.find(".transformer")[0].destroy(), this.layer.draw()
            } catch (t) {}
            return this.stage.toJSON()
        }, setStageSize: function (e) {
            this.stageMaxMin("restore"), this.stage.width(e.width), this.stage.height(e.height), this.layer_grid.clip({
                    x: 0,
                    y: 0,
                    width: e.width,
                    height: e.height
                }), $("#container")
                .height(e.height), $("#container")
                .width(e.width), this.stage.draw()
        }, setStageBackground: function (e) {
            var t = this.stage.findOne(".layer_background");
            t.width(this.stage.width()), t.height(this.stage.height()), null == e && (e = t.fill()), t.fill(e), this.stage.getLayers()[0].draw()
        }, setGridColor: function (e) {
            var t = this.stage.find(".gridLine");
            t.each(function (t) {
                t.stroke(e)
            }), this.stage.getLayers()[0].draw()
        }, setStageGrid: function (e) {
            var t = this.stage.find(".gridLine");
            if (!e) return t.each(function (e) {
                e.destroy()
            }), this.stage.getLayers()[0].draw(), void 0;
            this.stageMaxMin("restore"), t.length > 0 && t.each(function (e) {
                e.destroy()
            });
            var a = this.stage.getLayers()[0].getSize(),
                r = this.stage.position();
            console.log(r.x + "   " + r.y);
            var i = 20,
                o = Math.ceil(a.width / i),
                n = Math.ceil(a.height / i),
                l = new Array,
                d = -10;
            r.y < 0 && (d = 0 - r.y - 10), r.y > 0 && (d = 0 - r.y - 10), 0 == r.y;
            var s = n * i - r.y,
                c = new Array,
                u = -10;
            r.x < 0 && (u = 0 - r.x - 10), r.x > 0 && (u = 0 - r.x - 10), 0 == r.x;
            for (var h = o * i - r.x, m = 1; o > m; m++) {
                var g = m * i - r.x,
                    y = g;
                0 == m % 2 ? l.push(y, s, g, d) : l.push(g, d, y, s)
            }
            for (var m = 1; n > m; m++) {
                var f = m * i - r.y,
                    p = f;
                0 == m % 2 ? c.push(h, p, u, f) : c.push(u, f, h, p)
            }
            var v = new Konva.Line({
                    points: l,
                    stroke: "#e3d7ff",
                    strokeWidth: 1,
                    lineCap: "round",
                    lineJoin: "round",
                    name: "gridLine"
                }),
                b = new Konva.Line({
                    points: c,
                    stroke: "#e3d7ff",
                    strokeWidth: 1,
                    lineCap: "round",
                    lineJoin: "round",
                    name: "gridLine"
                }),
                w = 0,
                O = 0 - r.y,
                _ = 0,
                j = a.height - r.y,
                S = 0 - r.x,
                x = 0,
                k = a.width - r.x,
                T = 0,
                A = new Konva.Line({
                    points: [w, O, _, j],
                    stroke: "#dfc7ff",
                    strokeWidth: 2,
                    lineCap: "round",
                    lineJoin: "round",
                    name: "gridLine"
                }),
                C = new Konva.Line({
                    points: [S, x, k, T],
                    stroke: "#dfc7ff",
                    strokeWidth: 2,
                    lineCap: "round",
                    lineJoin: "round",
                    name: "gridLine"
                });
            this.stage.getLayers()[0].add(v), this.stage.getLayers()[0].add(b), this.stage.getLayers()[0].add(A), this.stage.getLayers()[0].add(C), this.stage.getLayers()[0].batchDraw()
        }, setStageDrag: function (e) {
            this.stage.draggable(e)
        }, setLeftModulePanel: function (e) {
            for (var t = "", a = 0; a < e.length; a++) {
                var r = e[a].groupName,
                    i = e[a].moduleItem;
                t += ' <div class="layui-colla-item">', t += '<h2 class="layui-colla-title">' + r + "</h2>", t += 0 == a ? '<div class="layui-colla-content layui-show" style="padding: 5px">' : '<div class="layui-colla-content" style="padding: 5px">', t += '<div class="module_panel">';
                for (var o = 0; o < i.length; o++) {
                    var n = i[o].moduleName,
                        l = i[o].iconBase64,
                        d = i[o].moduleJson,
                        s = Math.uuid();
                    this.moudleObj[s] = d, t += "<div class=\"module_img_d\" style='display: flex;justify-content:safe center; align-items: center;flex-direction: column;'>", t += "<img alt='" + n + "' id='" + s + "' style='cursor:move' draggable='true' ondragstart='dragImage(event)'  class=\"module_img\"  src=\"" + l + '">', t += "</div>"
                }
                t += "</div>", t += "</div>", t += "</div>"
            }
            $(".main_page_center .main_page_center_left .layui-tab .layui-tab-content .layui-tab-item .basemodule ")
                .html(t), this.element.render("collapse", "module_panel")
        }, setLeftMapStorageModulePanel: function (e) {
            for (var t = "", a = 0; a < e.length; a++) {
                var r = e[a].groupName,
                    i = e[a].moduleItem;
                t += ' <div class="layui-colla-item">', t += '<h2 class="layui-colla-title">' + r + "</h2>", t += 0 == a ? '<div class="layui-colla-content layui-show" style="padding: 5px">' : '<div class="layui-colla-content" style="padding: 5px">', t += '<div class="module_panel">';
                for (var o = 0; o < i.length; o++) {
                    i[o].moduleName;
                    var n = i[o].iconBase64,
                        l = i[o].moduleJson,
                        d = Math.uuid();
                    this.moudleObj[d] = l, t += "<div class=\"module_img_d\" style='display: flex;justify-content:safe center; align-items: center;'>", t += "<img id='" + d + "' style='cursor:move' draggable='true' ondragstart='dragImage(event)'  class=\"module_img\"  src=\"" + n + '">', t += "</div>"
                }
                t += "</div>", t += "</div>", t += "</div>"
            }
            $(".main_page_center .main_page_center_left .layui-tab .layui-tab-content .layui-tab-item .mapStorageModule ")
                .html(t), this.element.render("collapse", "module_panel")
        }, addModuleToStage: function (e, t) {
            var a = Konva.Node.create(e);
            return a.position(t),
            a.dragBoundFunc(function () {}),
            this.layer.add(a),
            this.setGroupImage(a),
            this.addModuleEvent(a),
            a.draw(), a
        }, setGroupImage: function (moduleObject) {
            var moduleType = moduleObject.attrs.moduleType;
            if ((-1 != moduleType.indexOf("IMAGES") || -1 != moduleType.indexOf("SVG")) && "undefined" != typeof moduleType) {
                var urlImage = moduleObject.attrs.imageURL,
                    nodes = moduleObject.find("Image");
                nodes.each(function (e) {
                    e.destroy()
                }), Konva.Image.fromURL(urlImage, function (e) {
                    e.name("myShape"), e.setAttr("offset", {
                        x: e.width() / 2,
                        y: e.height() / 2
                    }), moduleObject.add(e), stageOper.layer.draw()
                })
            }
            if (-1 != moduleType.indexOf("GIF") && "undefined" != typeof moduleType) {
                var urlImage = moduleObject.attrs.imageURL,
                    nodes = moduleObject.find("Image");
                nodes.each(function (e) {
                    e.destroy()
                });
                var canvas = document.createElement("canvas");
                gifler(urlImage)
                    .frames(canvas, function (e, t) {
                        canvas.width = t.width, canvas.height = t.height, e.drawImage(t.buffer, 0, 0), stageOper.layer.draw()
                    });
                var image = new Konva.Image({
                    image: canvas
                });
                moduleObject.add(image)
            }
            if (-1 != moduleType.indexOf("ECHART") && "undefined" != typeof moduleType) {
                var urlImage = moduleObject.attrs.echartURL,
                    divWidth = moduleObject.attrs.width,
                    divHeight = moduleObject.attrs.height,
                    nodes = moduleObject.find("Image");
                nodes.each(function (e) {
                    e.destroy()
                });
                var stageBox = stageOper.stage.container()
                    .getBoundingClientRect(),
                    areaPosition = {
                        x: stageBox.left + moduleObject.x(),
                        y: stageBox.top + moduleObject.y()
                    },
                    divnode = document.createElement("div");
                document.body.appendChild(divnode), divnode.style.height = divHeight + "px", divnode.style.width = divWidth + "px", divnode.style.position = "absolute", divnode.style.top = areaPosition.y + "px", divnode.style.left = areaPosition.x + "px";
                var myChart = echarts.init(divnode);
                "ECHART_GAUGE" == moduleType && myChart.setOption(eval(moduleObject.attrs.echartURL + "()")), "ECHART_THERMOMETER" == moduleType && myChart.setOption(eval(moduleObject.attrs.echartURL + "(0,100,20)")), "ECHART_realTimeLine" == moduleType && myChart.setOption(eval(moduleObject.attrs.echartURL + "('')")), "ECHART_realTimeLine" == moduleType && myChart.setOption(eval(moduleObject.attrs.echartURL + "('')")), "ECHART_Pool" == moduleType && myChart.setOption(eval(moduleObject.attrs.echartURL + "(0.5)")), "ECHART_Pool" == moduleType ? setTimeout(function () {
                    var e = myChart.getDataURL({
                        pixelRatio: 1
                    });
                    Konva.Image.fromURL(e, function (e) {
                        divnode.style.display = "none", moduleObject.add(e), stageOper.layer.add(moduleObject), stageOper.layer.draw()
                    })
                }, 1e3) : myChart.on("finished", function () {
                    var e = myChart.getDataURL({
                        pixelRatio: 1
                    });
                    Konva.Image.fromURL(e, function (e) {
                        divnode.style.display = "none", moduleObject.add(e), stageOper.layer.add(moduleObject), stageOper.layer.draw()
                    })
                })
            }
        }, addModuleEvent: function (e) {
            e.on("mouseover", function (e) {
                var t = e.target;
                document.body.style.cursor = -1 != t.name()
                    .indexOf("edit_anchor") ? "crosshair" : "move"
            }), e.on("mouseout", function () {
                document.body.style.cursor = "default"
            }), e.on("click", function () {
                try {} catch (e) {} finally {}
            })
        }, addModuleTransformEvent: function () {
            var e, t, a, r, i = null,
                o = null;
            this.stage.on("mousedown touchstart", function (i) {
                if (i.target === stageOper.stage) {
                    $("#zjsx")
                        .html(""), e = stageOper.stage.getPointerPosition()
                        .x, t = stageOper.stage.getPointerPosition()
                        .y, a = stageOper.stage.getPointerPosition()
                        .x, r = stageOper.stage.getPointerPosition()
                        .y;
                    var n = stageOper.stage.find(".selectionRectangle");
                    n.each(function (e) {
                        e.destroy(), stageOper.layer.draw()
                    }), o = new Konva.Rect({
                        name: "selectionRectangle",
                        id: Math.uuid(),
                        fill: "rgba(0,0,255,0.5)"
                    }), stageOper.layer.add(o), o.visible(!0), o.width(0), o.height(0), stageOper.layer.draw()
                }
            }), this.stage.on("mousemove touchmove", function () {
                null != o && 1 === stageOper.stage.scaleX() && (a = stageOper.stage.getPointerPosition()
                    .x, r = stageOper.stage.getPointerPosition()
                    .y, o.setAttrs({
                        x: Math.min(e, a) * stageOper.layer.scaleX(),
                        y: Math.min(t, r) * stageOper.layer.scaleY(),
                        width: Math.abs(a - e) * stageOper.layer.scaleX(),
                        height: Math.abs(r - t) * stageOper.layer.scaleY()
                    }), stageOper.layer.draw())
            }), this.stage.on("mouseup touchend", function (e) {
                try {
                    var t = stageOper.stage.findOne(".transformer"),
                        a = t.nodes();
                    if (1 == a.length);
                    else {
                        var r = e.target,
                            n = r.parent()
                            .attrs.moduleType;
                        (-1 == r.name()
                            .indexOf("edit_anchor") || "FLOWLINE" != n && "BASELINE" != n) && $("#zjsx")
                            .html("")
                    }
                } catch (e) {}
                var l = stageOper.stage.find(".jyzt_module_group")
                    .toArray(),
                    d = 0;
                try {
                    var s = o.getClientRect(),
                        c = l.filter(function (e) {
                            return Konva.Util.haveIntersection(s, e.getClientRect()) && "FLOWLINE" != e.attrs.moduleType && "BASELINE" != e.attrs.moduleType && "Arrow" != e.attrs.moduleType
                        });
                    d = c.length
                } catch (e) {
                    d = 0
                }
                if ("selectionRectangle" == e.target.attrs.name || e.target === stageOper.stage || d > 0) {
                    var u = o.getClientRect();
                    if (isNaN(u.x) && isNaN(u.y) && isNaN(u.width) && isNaN(u.height)) alert("223"), i.nodes([]), i.moveToTop();
                    else {
                        var h = l.filter(function (e) {
                                return Konva.Util.haveIntersection(u, e.getClientRect()) && "FLOWLINE" != e.attrs.moduleType && "BASELINE" != e.attrs.moduleType && "Arrow" != e.attrs.moduleType
                            }),
                            m = stageOper.layer.find("Group");
                        if (m.each(function (e) {
                            var t = e.attrs.moduleType;
                            "BASELINE" == t && stageOper.removeLineEdit(e), "FLOWLINE" == t && stageOper.removeFlowLineEdit(e)
                        }), h.length > 0) {
                            1 == h.length && (console.log(h[0]), stageOper.showModuleAttr(h[0]));
                            try {
                                i.destroy(), i = null
                            } catch (e) {}
                            i = new Konva.Transformer({
                                name: "transformer",
                                id: Math.uuid(),
                                padding: 5,
                                ignoreStroke: !0,
                                rotationSnaps: [0, 90, 180, 270]
                            }), stageOper.layer.add(i), i.nodes(h), i.moveToTop()
                        } else try {
                            i.destroy(), i = null
                        } catch (e) {}
                    }
                    o.destroy(), setTimeout(function () {
                        o = null, stageOper.layer.draw()
                    }), stageOper.layer.draw()
                }
            }), this.stage.on("click tap", function (e) {
                if (null == o) {
                    if ($("#zjsx")
                        .html(""), e.target === stageOper.stage) {
                        try {
                            i.nodes([]), i.destroy(), i = null
                        } catch (e) {}
                        return stageOper.layer.draw(), void 0
                    }
                    const t = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
                    var a, r = 0;
                    try {
                        i = stageOper.stage.findOne(".transformer"), r = i.nodes(), 1 == r.length && i.setAttrs({
                            ignoreStroke: !0,
                            enabledAnchors: ["top-left", "top-center", "top-right", "middle-right", "middle-left", "bottom-left", "bottom-center", "bottom-right"]
                        })
                    } catch (e) {
                        i = new Konva.Transformer({
                            name: "transformer",
                            id: Math.uuid(),
                            padding: 5,
                            ignoreStroke: !0,
                            rotationSnaps: [0, 90, 180, 270]
                        }), i.nodes([]), stageOper.layer.add(i)
                    }
                    if (a = 0 == r ? !1 : i.nodes()
                        .indexOf(e.target.getParent()) >= 0, t || a) {
                        if (t && a) {
                            const n = i.nodes()
                                .slice();
                            n.splice(n.indexOf(e.target.getParent()), 1), i.nodes(n)
                        } else if (t && !a) {
                            var l = stageOper.layer.find("Group");
                            if (l.each(function (e) {
                                    var t = e.attrs.moduleType;
                                    "BASELINE" == t && stageOper.removeLineEdit(e), "FLOWLINE" == t && stageOper.removeFlowLineEdit(e)
                                }), 1 == i.nodes()
                                .length && ("FLOWLINE" == i.nodes()[0].attrs.moduleType || "Arrow" == i.nodes()[0].attrs.moduleType || "BASELINE" == i.nodes()[0].attrs.moduleType)) return layer.msg("已有组件类型为[" + i.nodes()[0].attrs.moduleType + "]不能参与多选", {
                                    offset: "t",
                                    anim: 6,
                                    icon: 2
                                }), 1 == i.nodes()
                                .length && stageOper.showModuleAttr(i.nodes()[0]), void 0;
                            if ("FLOWLINE" != e.target.getParent()
                                .attrs.moduleType && "Arrow" != e.target.getParent()
                                .attrs.moduleType && "BASELINE" != e.target.getParent()
                                .attrs.moduleType) {
                                const d = i.nodes()
                                    .concat([e.target.getParent()]);
                                i.nodes(d)
                            } else layer.msg("组件类型为[ " + e.target.getParent()
                                .attrs.moduleType + " ]不能参与多选", {
                                    offset: "t",
                                    anim: 6,
                                    icon: 2
                                })
                        }
                    } else {
                        var s = e.target.getParent(),
                            c = s.attrs.moduleType;
                        if ("BASELINE" == c) {
                            currentModule = s;
                            var l = stageOper.layer.find("Group");
                            return l.each(function (e) {
                                var t = e.attrs.moduleType;
                                "BASELINE" == t && (s == e || stageOper.removeLineEdit(e)), "FLOWLINE" == t && stageOper.removeFlowLineEdit(e)
                            }), i.nodes([]), i.destroy(), i = null, stageOper.showModuleAttr(s), stageOper.addLineEdit(s), void 0
                        }
                        if ("FLOWLINE" == c) {
                            currentModule = s;
                            var l = stageOper.layer.find("Group");
                            return l.each(function (e) {
                                var t = e.attrs.moduleType;
                                "FLOWLINE" == t && (s == e || stageOper.removeFlowLineEdit(e)), "BASELINE" == t && stageOper.removeLineEdit(e)
                            }), i.nodes([]), i.destroy(), i = null, stageOper.showModuleAttr(s), stageOper.addFlowLineEdit(s), void 0
                        }
                        var l = stageOper.layer.find("Group");
                        l.each(function (e) {
                            var t = e.attrs.moduleType;
                            "BASELINE" == t && stageOper.removeLineEdit(e), "FLOWLINE" == t && stageOper.removeFlowLineEdit(e)
                        }), i.nodes([e.target.getParent()])
                    }
                    1 == i.nodes()
                        .length && stageOper.showModuleAttr(i.nodes()[0]), i.moveToTop(), stageOper.layer.draw()
                }
            })
        }, addLineEdit: function (e) {
            var t = e.attrs.moduleType,
                a = e.find("Circle");
            if (a.each(function (e) {
                e.destroy()
            }), stageOper.layer.draw(), "BASELINE" == t) {
                var r = e.find(".edit_anchor");
                if (r.length > 0) return;
                for (var i = e.find(".line1")[0], o = i.points(), n = i.strokeWidth(), l = 0; l < o.length / 2; l++) {
                    var d = 2 * l,
                        s = d + 1,
                        c = o[d],
                        u = o[s],
                        h = new Konva.Circle({
                            name: "edit_anchor",
                            x: c,
                            y: u,
                            radius: n / 2 + 5,
                            stroke: "#000000",
                            strokeWidth: 2,
                            draggable: !0,
                            indexLable: l
                        });
                    if (0 != l) {
                        var m = o[d - 2],
                            g = o[s - 2],
                            y = new Konva.Circle({
                                name: "edit_anchor" + (l - 1 + .5),
                                x: m + (c - m) / 2,
                                y: g + (u - g) / 2,
                                radius: n / 2 + 5,
                                stroke: "#c2b5b5",
                                strokeWidth: 2,
                                draggable: !0,
                                indexLable: l
                            });
                        y.on("dragend", function (t) {
                            var a = t.currentTarget,
                                r = a.attrs.indexLable,
                                n = a.x(),
                                l = a.y();
                            o.splice(2 * r, 0, n, l), i.points(o), stageOper.addLineEdit(e)
                        }), e.add(y)
                    }
                    h.on("dragmove", function (t) {
                        var a = t.currentTarget,
                            r = a.x(),
                            n = a.y(),
                            l = a.attrs.indexLable,
                            d = "edit_anchor" + (l - .5),
                            s = "edit_anchor" + (l + .5),
                            c = e.find("." + d)[0],
                            u = e.find("." + s)[0],
                            h = o[2 * l - 2],
                            m = o[2 * l - 1],
                            g = o[2 * l + 2],
                            y = o[2 * l + 3];
                        o[2 * l] = r, o[2 * l + 1] = n, i.points(o), "undefined" != typeof c && (c.x(h + (r - h) / 2), c.y(m + (n - m) / 2)), "undefined" != typeof u && (u.x(r + (g - r) / 2), u.y(n + (y - n) / 2)), e.getLayer()
                            .batchDraw()
                    }), e.add(h)
                }
                e.draw()
            }
        }, addFlowLineEdit: function (e) {
            var t = e.attrs.moduleType,
                a = e.find("Circle");
            if (a.each(function (e) {
                e.destroy()
            }), stageOper.layer.draw(), "FLOWLINE" == t) {
                var r = e.find(".edit_anchor");
                if (r.length > 0) return;
                for (var i = e.find(".backgroundLine")[0], o = e.find(".dynamicLine")[0], n = i.points(), l = i.strokeWidth(), d = 0; d < n.length / 2; d++) {
                    var s = 2 * d,
                        c = s + 1,
                        u = n[s],
                        h = n[c],
                        m = new Konva.Circle({
                            name: "edit_anchor",
                            x: u,
                            y: h,
                            radius: l / 2 + 5,
                            stroke: "#000000",
                            strokeWidth: 2,
                            draggable: !0,
                            indexLable: d
                        });
                    if (0 != d) {
                        var g = n[s - 2],
                            y = n[c - 2],
                            f = new Konva.Circle({
                                name: "edit_anchor" + (d - 1 + .5),
                                x: g + (u - g) / 2,
                                y: y + (h - y) / 2,
                                radius: l / 2 + 5,
                                stroke: "#c2b5b5",
                                strokeWidth: 2,
                                draggable: !0,
                                indexLable: d
                            });
                        f.on("dragend", function (t) {
                            var a = t.currentTarget,
                                r = a.attrs.indexLable,
                                l = a.x(),
                                d = a.y();
                            n.splice(2 * r, 0, l, d), i.points(n), o.points(n), stageOper.addFlowLineEdit(e)
                        }), e.add(f)
                    }
                    m.on("dragmove", function (t) {
                        var a = t.currentTarget,
                            r = a.x(),
                            l = a.y(),
                            d = a.attrs.indexLable,
                            s = "edit_anchor" + (d - .5),
                            c = "edit_anchor" + (d + .5),
                            u = e.find("." + s)[0],
                            h = e.find("." + c)[0],
                            m = n[2 * d - 2],
                            g = n[2 * d - 1],
                            y = n[2 * d + 2],
                            f = n[2 * d + 3];
                        n[2 * d] = r, n[2 * d + 1] = l, i.points(n), o.points(n), "undefined" != typeof u && (u.x(m + (r - m) / 2), u.y(g + (l - g) / 2)), "undefined" != typeof h && (h.x(r + (y - r) / 2), h.y(l + (f - l) / 2)), e.getLayer()
                            .batchDraw()
                    }), e.add(m)
                }
                e.draw()
            }
        }, removeLineEdit: function (e) {
            e.attrs.moduleType;
            var t = e.find("Circle");
            t.each(function (e) {
                e.destroy()
            }), stageOper.layer.draw()
        }, removeFlowLineEdit: function (e) {
            e.attrs.moduleType;
            var t = e.find("Circle");
            t.each(function (e) {
                e.destroy()
            }), stageOper.layer.draw()
        }, addModuleContextmenu: function () {
            this.stage.on("contextmenu", function (e) {
                if (e.evt.preventDefault(), e.target !== stageOper.stage) {
                    currentModule = e.target.getParent(), currentModule_shape = e.target, menuNode.style.display = "initial";
                    var t = stageOper.stage.container()
                        .getBoundingClientRect();
                    menuNode.style.top = t.top + stageOper.stage.getPointerPosition()
                        .y + 4 + "px", menuNode.style.left = t.left + stageOper.stage.getPointerPosition()
                        .x + 4 + "px"
                }
            })
        }, changeModuleZindex: function (e) {
            "up" == e ? currentModule.moveUp() : "down" == e ? currentModule.moveDown() : "top" == e ? currentModule.moveToTop() : "bottom" == e && currentModule.moveToBottom(), this.layer.draw()
        }, deleteModule: function (e) {
            $("#zjsx")
                .html("");
            try {
                for (var t = this.stage.findOne(".transformer"), a = t.nodes(), r = 0; r < a.length; r++) a[r].destroy();
                t.destroy()
            } catch (i) {}
            try {
                e.destroy()
            } catch (i) {}
            this.layer.draw()
        }, deleteModuleAnchor: function () {
            var e = currentModule.attrs.moduleType;
            if ("BASELINE" == e && "edit_anchor" == currentModule_shape.name()) {
                var t = currentModule.find(".line1")[0],
                    a = t.points();
                if (a.length > 4) {
                    var r = currentModule_shape.attrs.indexLable;
                    a.splice(2 * r, 2), t.points(a), currentModule_shape.destroy();
                    try {
                        var i = "edit_anchor" + (r - .5),
                            o = currentModule.find("." + i)[0];
                        o.destroy()
                    } catch (n) {}
                    try {
                        var l = "edit_anchor" + (r + .5),
                            d = currentModule.find("." + l)[0];
                        d.destroy()
                    } catch (n) {}
                    this.addLineEdit(currentModule)
                } else layer.msg("锚点不可删除", {
                    offset: "t",
                    anim: 6,
                    icon: 2
                })
            }
            if ("FLOWLINE" == e && "edit_anchor" == currentModule_shape.name()) {
                var t = currentModule.find(".backgroundLine")[0],
                    s = currentModule.find(".dynamicLine")[0],
                    a = t.points();
                if (a.length > 4) {
                    var r = currentModule_shape.attrs.indexLable;
                    a.splice(2 * r, 2), t.points(a), s.points(a), currentModule_shape.destroy();
                    try {
                        var i = "edit_anchor" + (r - .5),
                            o = currentModule.find("." + i)[0];
                        o.destroy()
                    } catch (n) {}
                    try {
                        var l = "edit_anchor" + (r + .5),
                            d = currentModule.find("." + l)[0];
                        d.destroy()
                    } catch (n) {}
                    this.addFlowLineEdit(currentModule)
                } else layer.msg("锚点不可删除", {
                    offset: "t",
                    anim: 6,
                    icon: 2
                })
            }
            this.layer.draw()
        }, showModuleAttr: function (moduleObject) {
            $("#zjsx")
                .html("");
            var moduleAttrs = moduleObject.attrs.moduleAttr;
            if ("undefined" != typeof moduleAttrs) {
                for (var color_array = new Array, input_text_array = new Array, slider_array = new Array, font_array = new Array, fontSize_array = new Array, hardware_array = new Array, where_array = new Array, whereStatus_array = new Array, whereStatusLight_array = new Array, whereStatusSwitch_array = new Array, click_array = new Array, rotate_array = new Array, hide_array = new Array, sparkling_array = new Array, moduleAttrHtml = "", i = 0; i < moduleAttrs.length; i++) {
                    var attrName = moduleAttrs[i].attrName,
                        attrCode = moduleAttrs[i].attrCode,
                        attrType = moduleAttrs[i].attrType,
                        attrWhere = moduleAttrs[i].attrWhere,
                        moudleShape, attrValue;
                    if ("this" === attrWhere.split(",")[0] ? (moudleShape = moduleObject, attrValue = moudleShape.getAttr(attrCode)) : (moudleShape = moduleObject.findOne("." + attrWhere.split(",")[0]), attrValue = moudleShape.getAttr(attrCode)), console.log("点击组件时要显示的属性: 属性名:" + attrName + "       属性代码" + attrCode + "      属性值:" + attrValue + "       属性类型" + attrType + "       属性所属形状" + attrWhere), "undefined" == typeof attrValue && (attrValue = ""), "color" == attrType && (moduleAttrHtml += '<div class="layui-form-item"><label class="layui-form-label">' + attrName + "</label>" + '<div class="layui-input-inline" style="margin-left: 5px;width: 120px;">' + '<input type="text" value="' + attrValue + '" placeholder="请选择颜色" class="layui-input" id="' + attrCode + "_" + attrWhere.split(",")[0] + '_input_color">' + "</div>" + '<div class="layui-inline" style="margin-bottom: 0px; margin-right: 0px;left: -11px;">' + '<div id="' + attrCode + "_" + attrWhere.split(",")[0] + '_ico_color"></div>' + "</div>" + "</div>", color_array.push({
                        attrCode: attrCode,
                        attrValue: attrValue,
                        attrWhere: attrWhere
                    })), "input" == attrType && (moduleAttrHtml += '<div class="layui-form-item"><label class="layui-form-label">' + attrName + "</label>" + '<div class="layui-input-block">' + '<input id="' + attrCode + "_" + attrWhere + '_input_text" type="text" lay-verify="borderSize" value="' + attrValue + '" autocomplete="off"  class="layui-input">' + "</div>" + "</div>", input_text_array.push({
                        attrCode: attrCode,
                        attrValue: attrValue,
                        attrWhere: attrWhere
                    })), "slider" == attrType && (moduleAttrHtml += '<div class="layui-form-item"><label class="layui-form-label">' + attrName + "</label>" + '<div id="' + attrCode + '_slider"  class="layui-input-block"></div>' + "</div>", slider_array.push({
                        attrCode: attrCode,
                        attrValue: attrValue,
                        attrWhere: attrWhere
                    })), "font" == attrType) {
                        moduleAttrHtml += '<div class="layui-form-item"><label class="layui-form-label">' + attrName + "</label>" + '<div class="layui-input-block">' + '<select name="select_font" lay-filter="select_font">';
                        for (var z = 0; z < initjson.font.length; z++) moduleAttrHtml += initjson.font[z] == attrValue ? '<option selected value="' + initjson.font[z] + '">' + initjson.font[z] + "</option>" : '<option  value="' + initjson.font[z] + '">' + initjson.font[z] + "</option>";
                        moduleAttrHtml += "</select></div></div>", font_array.push({
                            attrCode: attrCode,
                            attrValue: attrValue,
                            attrWhere: attrWhere
                        })
                    }
                    if ("fontSize" == attrType) {
                        moduleAttrHtml += '<div class="layui-form-item"><label class="layui-form-label">' + attrName + "</label>" + '<div class="layui-input-block">' + '<select name="select_fontSize" lay-filter="select_fontSize">';
                        for (var z = 0; z < initjson.fontSize.length; z++) moduleAttrHtml += initjson.fontSize[z] == attrValue ? '<option selected value="' + initjson.fontSize[z] + '">' + initjson.fontSize[z] + "</option>" : '<option  value="' + initjson.fontSize[z] + '">' + initjson.fontSize[z] + "</option>";
                        moduleAttrHtml += "</select></div></div>", fontSize_array.push({
                            attrCode: attrCode,
                            attrValue: attrValue,
                            attrWhere: attrWhere
                        })
                    }
                    if ("hardwareSelect" == attrType) {
                        var attrValueTemp = eval(attrValue)[0];
                        moduleAttrHtml += '<div class="layui-form-item"><label class="layui-form-label">' + attrName + "</label>" + '<div class="layui-input-block">' + '<select name="select_hardware" lay-filter="select_hardware">', moduleAttrHtml += '<option  value="">请选择</option>';
                        for (var z = 0; z < jyzt_hardwareData.length; z++) {
                            var hardwareObj = jyzt_hardwareData[z];
                            moduleAttrHtml += hardwareObj.code == attrValueTemp ? '<option selected value="' + hardwareObj.code + '">' + hardwareObj.name + "(" + hardwareObj.code + ")</option>" : '<option  value="' + hardwareObj.code + '">' + hardwareObj.name + "(" + hardwareObj.code + ")</option>"
                        }
                        moduleAttrHtml += "</select></div></div>", hardware_array.push({
                            attrCode: attrCode,
                            attrValue: attrValue,
                            attrWhere: attrWhere
                        })
                    }
                    "whereSelectTable" == attrType && (moduleAttrHtml += '<table class="layui-hide" lay-filter="' + attrType + '"  id="' + attrType + '"></table>', where_array.push({
                        attrCode: attrCode,
                        attrValue: attrValue,
                        attrWhere: attrWhere,
                        attrType: attrType,
                        attrName: attrName
                    })), "whereStatusTable" == attrType && (moduleAttrHtml += '<table class="layui-hide" lay-filter="' + attrType + '"  id="' + attrType + '"></table>', whereStatus_array.push({
                        attrCode: attrCode,
                        attrValue: attrValue,
                        attrWhere: attrWhere,
                        attrType: attrType,
                        attrName: attrName
                    })), "whereStatusLightTable" == attrType && (moduleAttrHtml += '<table class="layui-hide" lay-filter="' + attrType + '"  id="' + attrType + '"></table>', whereStatusLight_array.push({
                        attrCode: attrCode,
                        attrValue: attrValue,
                        attrWhere: attrWhere,
                        attrType: attrType,
                        attrName: attrName
                    })), "whereStatusSwitchTable" == attrType && (moduleAttrHtml += '<table class="layui-hide" lay-filter="' + attrType + '"  id="' + attrType + '"></table>', whereStatusSwitch_array.push({
                        attrCode: attrCode,
                        attrValue: attrValue,
                        attrWhere: attrWhere,
                        attrType: attrType,
                        attrName: attrName
                    })), "clickTable" == attrType && (moduleAttrHtml += '<table class="layui-hide" lay-filter="' + attrType + '"  id="' + attrType + '"></table>', click_array.push({
                        attrCode: attrCode,
                        attrValue: attrValue,
                        attrWhere: attrWhere,
                        attrType: attrType,
                        attrName: attrName
                    })), "rotateTable" == attrType && (moduleAttrHtml += '<table class="layui-hide" lay-filter="' + attrType + '"  id="' + attrType + '"></table>', rotate_array.push({
                        attrCode: attrCode,
                        attrValue: attrValue,
                        attrWhere: attrWhere,
                        attrType: attrType,
                        attrName: attrName
                    })), "hideTable" == attrType && (moduleAttrHtml += '<table class="layui-hide" lay-filter="' + attrType + '"  id="' + attrType + '"></table>', hide_array.push({
                        attrCode: attrCode,
                        attrValue: attrValue,
                        attrWhere: attrWhere,
                        attrType: attrType,
                        attrName: attrName
                    })), "sparklingTable" == attrType && (moduleAttrHtml += '<table class="layui-hide" lay-filter="' + attrType + '"  id="' + attrType + '"></table>', sparkling_array.push({
                        attrCode: attrCode,
                        attrValue: attrValue,
                        attrWhere: attrWhere,
                        attrType: attrType,
                        attrName: attrName
                    }))
                }
                $("#zjsx")
                    .html(moduleAttrHtml), layui.form.render("select", "zjsx");
                for (var j = 0; j < color_array.length; j++) {
                    var color_attr_id = color_array[j].attrCode + "_" + color_array[j].attrWhere.split(",")[0],
                        color_attr = color_array[j].attrCode,
                        color_attr_value = color_array[j].attrValue,
                        color_attr_Where = color_array[j].attrWhere;
                    ! function (e, t, a, r) {
                        colorpicker.render({
                            elem: "#" + e + "_ico_color",
                            color: a,
                            predefine: !0,
                            change: function (a) {
                                $("#" + e + "_input_color")
                                    .val(a), stageOper.setModuleAttr(moduleObject, r, t, a)
                            }
                        })
                    }(color_attr_id, color_attr, color_attr_value, color_attr_Where)
                }
                for (var j = 0; j < input_text_array.length; j++) {
                    var text_attr_id = input_text_array[j].attrCode + "_" + input_text_array[j].attrWhere,
                        text_attr = input_text_array[j].attrCode,
                        text_attr_value = input_text_array[j].attrValue,
                        text_attr_Where = input_text_array[j].attrWhere;
                    ! function (e, t, a, r) {
                        $("#" + e + "_input_text")
                            .on("input", function () {
                                var e = $(this)
                                    .val();
                                stageOper.setModuleAttr(moduleObject, r, t, e)
                            })
                    }(text_attr_id, text_attr, text_attr_value, text_attr_Where)
                }
                for (var j = 0; j < slider_array.length; j++) {
                    var slider_attr_id = slider_array[j].attrCode,
                        slider_attr_value = slider_array[j].attrValue,
                        slider_attr_Where = slider_array[j].attrWhere;
                    ! function (e, t, a) {
                        slider.render({
                            elem: "#" + e + "_slider",
                            value: 100 * t,
                            input: !0,
                            change: function (t) {
                                stageOper.setModuleAttr(moduleObject, a, e, t / 100)
                            }
                        })
                    }(slider_attr_id, slider_attr_value, slider_attr_Where)
                }
                for (var j = 0; j < font_array.length; j++) {
                    var font_attr_id = font_array[j].attrCode,
                        font_attr_value = font_array[j].attrValue,
                        font_attr_Where = font_array[j].attrWhere;
                    ! function (e, t, a) {
                        layui.form.on("select(select_font)", function (t) {
                            var r = t.value;
                            stageOper.setModuleAttr(moduleObject, a, e, r)
                        })
                    }(font_attr_id, font_attr_value, font_attr_Where)
                }
                for (var j = 0; j < fontSize_array.length; j++) {
                    var fontSize_attr_id = fontSize_array[j].attrCode,
                        fontSize_attr_value = fontSize_array[j].attrValue,
                        fontSize_attr_Where = fontSize_array[j].attrWhere;
                    ! function (e, t, a) {
                        layui.form.on("select(select_fontSize)", function (t) {
                            var r = t.value;
                            stageOper.setModuleAttr(moduleObject, a, e, r)
                        })
                    }(fontSize_attr_id, fontSize_attr_value, fontSize_attr_Where)
                }
                for (var j = 0; j < hardware_array.length; j++) {
                    var hardware_attr_id = hardware_array[j].attrCode,
                        hardware_attr_value = hardware_array[j].attrValue,
                        hardware_attr_Where = hardware_array[j].attrWhere;
                    ! function (e, t, a) {
                        layui.form.on("select(select_hardware)", function (t) {
                            var r = "['" + t.value + "']";
                            stageOper.setModuleAttr(moduleObject, a, e, r)
                        })
                    }(hardware_attr_id, hardware_attr_value, hardware_attr_Where)
                }
                if (where_array.length > 0) {
                    var where_attr_id = where_array[0].attrCode,
                        where_attr_value = where_array[0].attrValue,
                        where_attr_Where = where_array[0].attrWhere,
                        where_attr_Type = where_array[0].attrType,
                        where_attr_Name = where_array[0].attrName,
                        whereObjArray = eval("(" + where_attr_value + ")");
                    ! function (e, t, a, r, i, o) {
                        for (var n = new Array, l = 0; l < o.length; l++) {
                            var d = o[l],
                                s = {};
                            s.code = d.direction;
                            var c = d.where;
                            s.min = c.min, s.max = c.max, n.push(s)
                        }
                        table.render({
                            elem: "#" + r,
                            toolbar: '<div style="float: left">' + i + "</div>",
                            defaultToolbar: [{
                                title: "添加条件",
                                layEvent: "addWhere",
                                icon: "layui-icon-add-1"
                            }, {
                                title: "保存条件配置",
                                layEvent: "flowAnimationSaveButton",
                                icon: "layui-icon-ok"
                            }],
                            even: !0,
                            limit: Number.MAX_VALUE,
                            data: n,
                            cols: [[{
                                field: "selectfx",
                                align: "center",
                                width: "46%",
                                title: "流动效果",
                                templet: "#flowAnimationOption"
                            }, {
                                field: "min",
                                align: "center",
                                width: "18%",
                                title: "小值(>=)",
                                edit: "text"
                            }, {
                                field: "max",
                                align: "center",
                                width: "18%",
                                title: "大值(<=)",
                                edit: "text"
                            }, {
                                title: "操作",
                                align: "center",
                                width: "18%",
                                toolbar: "#wherebar"
                            }]]
                        }), table.on("toolbar(" + r + ")", function (e) {
                            switch (e.event) {
                            case "addWhere":
                                var t = e.config.id,
                                    a = table.cache[t];
                                a.push({
                                    code: "",
                                    min: "",
                                    max: ""
                                }), table.reload(t, {
                                    data: a
                                });
                                break;
                            case "flowAnimationSaveButton":
                                layer.msg("保存成功", {
                                    offset: "t",
                                    anim: 6,
                                    icon: 1
                                })
                            }
                        }), table.on("tool(" + r + ")", function (t) {
                            "delWhere" === t.event && layer.confirm("真的删除行么", function (r) {
                                var i = t.tr,
                                    o = i.closest(".layui-table-view"),
                                    n = table.cache[o.attr("lay-id")];
                                t.tr.data("index") >= 0 && (n.splice(t.tr.data("index"), 1), table.reload(o.attr("lay-id"), {
                                    data: n
                                }), stageOper.setModuleAttr(moduleObject, a, e, table.cache[o.attr("lay-id")])), layer.close(r)
                            })
                        }), table.on("edit(" + r + ")", function (t) {
                            var r = t.tr,
                                i = r.closest(".layui-table-view");
                            stageOper.setModuleAttr(moduleObject, a, e, table.cache[i.attr("lay-id")])
                        }), form.on("select(flowAnimationOption_select)", function (t) {
                            var r = $(t.elem),
                                i = r.closest("td"),
                                o = i.closest("tr"),
                                n = o.closest(".layui-table-view");
                            n.attr("lay-id"), table.cache[n.attr("lay-id")][o.data("index")].code = t.value, stageOper.setModuleAttr(moduleObject, a, e, table.cache[n.attr("lay-id")])
                        })
                    }(where_attr_id, where_attr_value, where_attr_Where, where_attr_Type, where_attr_Name, whereObjArray)
                }
                if (whereStatus_array.length > 0) {
                    var whereStatus_attr_id = whereStatus_array[0].attrCode,
                        whereStatus_attr_value = whereStatus_array[0].attrValue,
                        whereStatus_attr_Where = whereStatus_array[0].attrWhere,
                        whereStatus_attr_Type = whereStatus_array[0].attrType,
                        whereStatus_attr_Name = whereStatus_array[0].attrName,
                        whereObjArray = eval("(" + whereStatus_attr_value + ")");
                    ! function (e, t, a, r, i, o) {
                        for (var n = new Array, l = 0; l < o.length; l++) {
                            var d = o[l],
                                s = {};
                            s.description = d.description;
                            var c = d.where;
                            s.min = c.min, s.max = c.max, n.push(s)
                        }
                        table.render({
                            elem: "#" + r,
                            toolbar: '<div style="float: left">' + i + "</div>",
                            defaultToolbar: [{
                                title: "添加条件",
                                layEvent: "addWhere",
                                icon: "layui-icon-add-1"
                            }, {
                                title: "保存条件配置",
                                layEvent: "flowAnimationSaveButton",
                                icon: "layui-icon-ok"
                            }],
                            even: !0,
                            limit: Number.MAX_VALUE,
                            data: n,
                            cols: [[{
                                field: "min",
                                align: "center",
                                width: "18%",
                                title: "小值(>=)",
                                edit: "text"
                            }, {
                                field: "max",
                                align: "center",
                                width: "18%",
                                title: "大值(<=)",
                                edit: "text"
                            }, {
                                field: "description",
                                align: "center",
                                width: "46%",
                                title: "对应翻译文字",
                                edit: "text"
                            }, {
                                title: "操作",
                                align: "center",
                                width: "18%",
                                toolbar: "#wherebar"
                            }]]
                        }), table.on("toolbar(" + r + ")", function (e) {
                            switch (e.event) {
                            case "addWhere":
                                var t = e.config.id,
                                    a = table.cache[t];
                                a.push({
                                    description: "",
                                    min: "",
                                    max: ""
                                }), table.reload(t, {
                                    data: a
                                });
                                break;
                            case "flowAnimationSaveButton":
                                layer.msg("保存成功", {
                                    offset: "t",
                                    anim: 6,
                                    icon: 1
                                })
                            }
                        }), table.on("tool(" + r + ")", function (t) {
                            "delWhere" === t.event && layer.confirm("真的删除行么", function (r) {
                                var i = t.tr,
                                    o = i.closest(".layui-table-view"),
                                    n = table.cache[o.attr("lay-id")];
                                t.tr.data("index") >= 0 && (n.splice(t.tr.data("index"), 1), table.reload(o.attr("lay-id"), {
                                    data: n
                                }), stageOper.setModuleAttr(moduleObject, a, e, table.cache[o.attr("lay-id")])), layer.close(r)
                            })
                        }), table.on("edit(" + r + ")", function (t) {
                            var r = t.tr,
                                i = r.closest(".layui-table-view");
                            stageOper.setModuleAttr(moduleObject, a, e, table.cache[i.attr("lay-id")])
                        })
                    }(whereStatus_attr_id, whereStatus_attr_value, whereStatus_attr_Where, whereStatus_attr_Type, whereStatus_attr_Name, whereObjArray)
                }
                if (whereStatusLight_array.length > 0) {
                    var whereStatusLight_attr_id = whereStatusLight_array[0].attrCode,
                        whereStatusLight_attr_value = whereStatusLight_array[0].attrValue,
                        whereStatusLight_attr_Where = whereStatusLight_array[0].attrWhere,
                        whereStatusLight_attr_Type = whereStatusLight_array[0].attrType,
                        whereStatusLight_attr_Name = whereStatusLight_array[0].attrName,
                        whereObjArray = eval("(" + whereStatusLight_attr_value + ")");
                    ! function (e, t, a, r, i, o) {
                        for (var n = new Array, l = 0; l < o.length; l++) {
                            var d = o[l],
                                s = {};
                            s.color = d.color;
                            var c = d.where;
                            s.min = c.min, s.max = c.max, n.push(s)
                        }
                        table.render({
                            elem: "#" + r,
                            toolbar: '<div style="float: left">' + i + "</div>",
                            defaultToolbar: [{
                                title: "添加条件",
                                layEvent: "addWhere",
                                icon: "layui-icon-add-1"
                            }, {
                                title: "保存条件配置",
                                layEvent: "flowAnimationSaveButton",
                                icon: "layui-icon-ok"
                            }],
                            done: function () {
                                var t = $('div[id^="selectTableColor_"]');
                                $.each(t, function (t, r) {
                                    colorpicker.render({
                                        elem: "#" + r.id,
                                        color: r.attributes.color.value,
                                        predefine: !0,
                                        change: function (t) {
                                            var r = $(this.elem),
                                                i = r.closest("td"),
                                                o = i.closest("tr"),
                                                n = o.closest(".layui-table-view");
                                            n.attr("lay-id"), table.cache[n.attr("lay-id")][o.data("index")].color = t, stageOper.setModuleAttr(moduleObject, a, e, table.cache[n.attr("lay-id")])
                                        }
                                    })
                                })
                            }, even: !0,
                            limit: Number.MAX_VALUE,
                            data: n,
                            cols: [[{
                                field: "min",
                                align: "center",
                                width: "31%",
                                title: "小值(>=)",
                                edit: "text"
                            }, {
                                field: "max",
                                align: "center",
                                width: "31%",
                                title: "大值(<=)",
                                edit: "text"
                            }, {
                                field: "colorSelect",
                                align: "center",
                                width: "20%",
                                title: "对应的颜色",
                                toolbar: "#layuiTableColorSelect"
                            }, {
                                title: "操作",
                                align: "center",
                                width: "18%",
                                toolbar: "#wherebar"
                            }]]
                        }), table.on("toolbar(" + r + ")", function (e) {
                            switch (e.event) {
                            case "addWhere":
                                var t = e.config.id,
                                    a = table.cache[t];
                                a.push({
                                    color: "",
                                    min: "",
                                    max: ""
                                }), table.reload(t, {
                                    data: a
                                });
                                break;
                            case "flowAnimationSaveButton":
                                layer.msg("保存成功", {
                                    offset: "t",
                                    anim: 6,
                                    icon: 1
                                })
                            }
                        }), table.on("tool(" + r + ")", function (t) {
                            "delWhere" === t.event && layer.confirm("真的删除行么", function (r) {
                                var i = t.tr,
                                    o = i.closest(".layui-table-view"),
                                    n = table.cache[o.attr("lay-id")];
                                t.tr.data("index") >= 0 && (n.splice(t.tr.data("index"), 1), table.reload(o.attr("lay-id"), {
                                    data: n
                                }), stageOper.setModuleAttr(moduleObject, a, e, table.cache[o.attr("lay-id")])), layer.close(r)
                            })
                        }), table.on("edit(" + r + ")", function (t) {
                            var r = t.tr,
                                i = r.closest(".layui-table-view");
                            stageOper.setModuleAttr(moduleObject, a, e, table.cache[i.attr("lay-id")])
                        })
                    }(whereStatusLight_attr_id, whereStatusLight_attr_value, whereStatusLight_attr_Where, whereStatusLight_attr_Type, whereStatusLight_attr_Name, whereObjArray)
                }
                if (whereStatusSwitch_array.length > 0) {
                    var whereStatusSwitch_attr_id = whereStatusSwitch_array[0].attrCode,
                        whereStatusSwitch_attr_value = whereStatusSwitch_array[0].attrValue,
                        whereStatusSwitch_attr_Where = whereStatusSwitch_array[0].attrWhere,
                        whereStatusSwitch_attr_Type = whereStatusSwitch_array[0].attrType,
                        whereStatusSwitch_attr_Name = whereStatusSwitch_array[0].attrName,
                        whereObjArray = eval("(" + whereStatusSwitch_attr_value + ")");
                    ! function (e, t, a, r, i, o) {
                        for (var n = new Array, l = 0; l < o.length; l++) {
                            var d = o[l],
                                s = {};
                            s.description = d.description, s.status = d.status, s.command = d.command, s.icon = d.icon, n.push(s)
                        }
                        table.render({
                            elem: "#" + r,
                            toolbar: '<div style="float: left">' + i + "</div>",
                            defaultToolbar: [{
                                title: "保存条件配置",
                                layEvent: "flowAnimationSaveButton",
                                icon: "layui-icon-ok"
                            }],
                            done: function () {
                                var t = $('img[id^="selectTableSwitch_"]');
                                $.each(t, function (t, r) {
                                    $("#" + r.id)
                                        .click(function () {
                                            var t = $(this),
                                                r = t.closest("td"),
                                                i = r.closest("tr"),
                                                o = i.closest(".layui-table-view");
                                            layer.open({
                                                title: "请选择开关图标",
                                                type: 2,
                                                area: ["700px", "450px"],
                                                fixed: !1,
                                                maxmin: !0,
                                                content: "switchIconList.html",
                                                end: function () {
                                                    "" !== switchIconUrl && (table.cache[o.attr("lay-id")][i.data("index")].icon = switchIconUrl, table.reload(o.attr("lay-id"), {
                                                        data: table.cache[o.attr("lay-id")]
                                                    }), stageOper.setModuleAttr(moduleObject, a, e, table.cache[o.attr("lay-id")]))
                                                }
                                            })
                                        })
                                })
                            }, even: !0,
                            limit: Number.MAX_VALUE,
                            data: n,
                            cols: [[{
                                field: "description",
                                align: "center",
                                width: "20%",
                                title: "开关描述"
                            }, {
                                field: "status",
                                align: "center",
                                width: "30%",
                                title: "状态值",
                                edit: "text"
                            }, {
                                field: "command",
                                align: "center",
                                width: "30%",
                                title: "点击命令",
                                edit: "text"
                            }, {
                                field: "icon",
                                align: "center",
                                width: "20%",
                                title: "开关图标",
                                toolbar: "#layuiTableSwitchSelect"
                            }]]
                        }), table.on("toolbar(" + r + ")", function (e) {
                            switch (e.event) {
                            case "flowAnimationSaveButton":
                                layer.msg("保存成功", {
                                    offset: "t",
                                    anim: 6,
                                    icon: 1
                                })
                            }
                        }), table.on("edit(" + r + ")", function (t) {
                            var r = t.tr,
                                i = r.closest(".layui-table-view");
                            stageOper.setModuleAttr(moduleObject, a, e, table.cache[i.attr("lay-id")])
                        })
                    }(whereStatusSwitch_attr_id, whereStatusSwitch_attr_value, whereStatusSwitch_attr_Where, whereStatusSwitch_attr_Type, whereStatusSwitch_attr_Name, whereObjArray)
                }
                if (click_array.length > 0) {
                    var click_attr_id = click_array[0].attrCode,
                        click_attr_value = click_array[0].attrValue,
                        click_attr_Where = click_array[0].attrWhere,
                        click_attr_Type = click_array[0].attrType,
                        click_attr_Name = click_array[0].attrName,
                        clickObjArray = eval("(" + click_attr_value + ")");
                    ! function (e, t, a, r, i, o) {
                        for (var n = new Array, l = 0; l < o.length; l++) {
                            var d = o[l],
                                s = {};
                            s.code = d.code, s.content = d.content, n.push(s)
                        }
                        table.render({
                            elem: "#" + r,
                            toolbar: '<div style="float: left">' + i + "</div>",
                            defaultToolbar: [{
                                title: "保存条件配置",
                                layEvent: "flowAnimationSaveButton",
                                icon: "layui-icon-ok"
                            }],
                            even: !0,
                            limit: Number.MAX_VALUE,
                            data: n,
                            cols: [[{
                                field: "selectClickType",
                                align: "center",
                                width: "50%",
                                title: "触发类型",
                                templet: "#selectClickType"
                            }, {
                                field: "content",
                                align: "center",
                                width: "50%",
                                title: "触发内容",
                                edit: "text"
                            }]]
                        }), table.on("toolbar(" + r + ")", function (e) {
                            switch (e.event) {
                            case "flowAnimationSaveButton":
                                layer.msg("保存成功", {
                                    offset: "t",
                                    anim: 6,
                                    icon: 1
                                })
                            }
                        }), table.on("edit(" + r + ")", function (t) {
                            var r = t.tr,
                                i = r.closest(".layui-table-view");
                            stageOper.setModuleAttr(moduleObject, a, e, table.cache[i.attr("lay-id")])
                        }), form.on("select(selectClickType_select)", function (t) {
                            var r = $(t.elem),
                                i = r.closest("td"),
                                o = i.closest("tr"),
                                n = o.closest(".layui-table-view");
                            n.attr("lay-id"), table.cache[n.attr("lay-id")][o.data("index")].code = t.value, stageOper.setModuleAttr(moduleObject, a, e, table.cache[n.attr("lay-id")])
                        })
                    }(click_attr_id, click_attr_value, click_attr_Where, click_attr_Type, click_attr_Name, clickObjArray)
                }
                if (rotate_array.length > 0) {
                    var rotate_attr_id = rotate_array[0].attrCode,
                        rotate_attr_value = rotate_array[0].attrValue,
                        rotate_attr_Where = rotate_array[0].attrWhere,
                        rotate_attr_Type = rotate_array[0].attrType,
                        rotate_attr_Name = rotate_array[0].attrName,
                        whereObjArray = eval("(" + rotate_attr_value + ")");
                    ! function (e, t, a, r, i, o) {
                        for (var n = new Array, l = 0; l < o.length; l++) {
                            var d = o[l],
                                s = {};
                            s.devicecode = d.devicecode, s.min = d.min, s.max = d.max, n.push(s)
                        }
                        table.render({
                            elem: "#" + r,
                            toolbar: '<div style="float: left">' + i + "</div>",
                            defaultToolbar: [{
                                title: "添加条件",
                                layEvent: "addWhere",
                                icon: "layui-icon-add-1"
                            }, {
                                title: "保存条件配置",
                                layEvent: "flowAnimationSaveButton",
                                icon: "layui-icon-ok"
                            }],
                            even: !0,
                            limit: Number.MAX_VALUE,
                            data: n,
                            cols: [[{
                                field: "device_Select",
                                align: "center",
                                width: "46%",
                                title: "选择设备",
                                templet: "#device_Select"
                            }, {
                                field: "min",
                                align: "center",
                                width: "18%",
                                title: "小值(>=)",
                                edit: "text"
                            }, {
                                field: "max",
                                align: "center",
                                width: "18%",
                                title: "大值(<=)",
                                edit: "text"
                            }, {
                                title: "操作",
                                align: "center",
                                width: "18%",
                                toolbar: "#wherebar"
                            }]]
                        }), table.on("toolbar(" + r + ")", function (e) {
                            switch (e.event) {
                            case "addWhere":
                                var t = e.config.id,
                                    a = table.cache[t];
                                a.push({
                                    code: "",
                                    min: "",
                                    max: ""
                                }), table.reload(t, {
                                    data: a
                                });
                                break;
                            case "flowAnimationSaveButton":
                                layer.msg("保存成功", {
                                    offset: "t",
                                    anim: 6,
                                    icon: 1
                                })
                            }
                        }), table.on("tool(" + r + ")", function (t) {
                            "delWhere" === t.event && layer.confirm("真的删除行么", function (r) {
                                var i = t.tr,
                                    o = i.closest(".layui-table-view"),
                                    n = table.cache[o.attr("lay-id")];
                                t.tr.data("index") >= 0 && (n.splice(t.tr.data("index"), 1), table.reload(o.attr("lay-id"), {
                                    data: n
                                }), stageOper.setModuleAttr(moduleObject, a, e, table.cache[o.attr("lay-id")])), layer.close(r)
                            })
                        }), table.on("edit(" + r + ")", function (t) {
                            var r = t.tr,
                                i = r.closest(".layui-table-view");
                            stageOper.setModuleAttr(moduleObject, a, e, table.cache[i.attr("lay-id")])
                        }), form.on("select(deviceSelect_select)", function (t) {
                            var r = $(t.elem),
                                i = r.closest("td"),
                                o = i.closest("tr"),
                                n = o.closest(".layui-table-view");
                            n.attr("lay-id"), table.cache[n.attr("lay-id")][o.data("index")].devicecode = t.value, stageOper.setModuleAttr(moduleObject, a, e, table.cache[n.attr("lay-id")])
                        })
                    }(rotate_attr_id, rotate_attr_value, rotate_attr_Where, rotate_attr_Type, rotate_attr_Name, whereObjArray)
                }
                if (hide_array.length > 0) {
                    var hide_attr_id = hide_array[0].attrCode,
                        hide_attr_value = hide_array[0].attrValue,
                        hide_attr_Where = hide_array[0].attrWhere,
                        hide_attr_Type = hide_array[0].attrType,
                        hide_attr_Name = hide_array[0].attrName,
                        whereObjArray = eval("(" + hide_attr_value + ")");
                    ! function (e, t, a, r, i, o) {
                        for (var n = new Array, l = 0; l < o.length; l++) {
                            var d = o[l],
                                s = {};
                            s.devicecode = d.devicecode, s.min = d.min, s.max = d.max, n.push(s)
                        }
                        table.render({
                            elem: "#" + r,
                            toolbar: '<div style="float: left">' + i + "</div>",
                            defaultToolbar: [{
                                title: "添加条件",
                                layEvent: "addWhere",
                                icon: "layui-icon-add-1"
                            }, {
                                title: "保存条件配置",
                                layEvent: "flowAnimationSaveButton",
                                icon: "layui-icon-ok"
                            }],
                            even: !0,
                            limit: Number.MAX_VALUE,
                            data: n,
                            cols: [[{
                                field: "device_Select",
                                align: "center",
                                width: "46%",
                                title: "选择设备",
                                templet: "#device_Select"
                            }, {
                                field: "min",
                                align: "center",
                                width: "18%",
                                title: "小值(>=)",
                                edit: "text"
                            }, {
                                field: "max",
                                align: "center",
                                width: "18%",
                                title: "大值(<=)",
                                edit: "text"
                            }, {
                                title: "操作",
                                align: "center",
                                width: "18%",
                                toolbar: "#wherebar"
                            }]]
                        }), table.on("toolbar(" + r + ")", function (e) {
                            switch (e.event) {
                            case "addWhere":
                                var t = e.config.id,
                                    a = table.cache[t];
                                a.push({
                                    code: "",
                                    min: "",
                                    max: ""
                                }), table.reload(t, {
                                    data: a
                                });
                                break;
                            case "flowAnimationSaveButton":
                                layer.msg("保存成功", {
                                    offset: "t",
                                    anim: 6,
                                    icon: 1
                                })
                            }
                        }), table.on("tool(" + r + ")", function (t) {
                            "delWhere" === t.event && layer.confirm("真的删除行么", function (r) {
                                var i = t.tr,
                                    o = i.closest(".layui-table-view"),
                                    n = table.cache[o.attr("lay-id")];
                                t.tr.data("index") >= 0 && (n.splice(t.tr.data("index"), 1), table.reload(o.attr("lay-id"), {
                                    data: n
                                }), stageOper.setModuleAttr(moduleObject, a, e, table.cache[o.attr("lay-id")])), layer.close(r)
                            })
                        }), table.on("edit(" + r + ")", function (t) {
                            var r = t.tr,
                                i = r.closest(".layui-table-view");
                            stageOper.setModuleAttr(moduleObject, a, e, table.cache[i.attr("lay-id")])
                        }), form.on("select(deviceSelect_select)", function (t) {
                            var r = $(t.elem),
                                i = r.closest("td"),
                                o = i.closest("tr"),
                                n = o.closest(".layui-table-view");
                            n.attr("lay-id"), table.cache[n.attr("lay-id")][o.data("index")].devicecode = t.value, stageOper.setModuleAttr(moduleObject, a, e, table.cache[n.attr("lay-id")])
                        })
                    }(hide_attr_id, hide_attr_value, hide_attr_Where, hide_attr_Type, hide_attr_Name, whereObjArray)
                }
                if (sparkling_array.length > 0) {
                    var sparkling_attr_id = sparkling_array[0].attrCode,
                        sparkling_attr_value = sparkling_array[0].attrValue,
                        sparkling_attr_Where = sparkling_array[0].attrWhere,
                        sparkling_attr_Type = sparkling_array[0].attrType,
                        sparkling_attr_Name = sparkling_array[0].attrName,
                        whereObjArray = eval("(" + sparkling_attr_value + ")");
                    ! function (e, t, a, r, i, o) {
                        for (var n = new Array, l = 0; l < o.length; l++) {
                            var d = o[l],
                                s = {};
                            s.devicecode = d.devicecode, s.min = d.min, s.max = d.max, n.push(s)
                        }
                        table.render({
                            elem: "#" + r,
                            toolbar: '<div style="float: left">' + i + "</div>",
                            defaultToolbar: [{
                                title: "添加条件",
                                layEvent: "addWhere",
                                icon: "layui-icon-add-1"
                            }, {
                                title: "保存条件配置",
                                layEvent: "flowAnimationSaveButton",
                                icon: "layui-icon-ok"
                            }],
                            even: !0,
                            limit: Number.MAX_VALUE,
                            data: n,
                            cols: [[{
                                field: "device_Select",
                                align: "center",
                                width: "46%",
                                title: "选择设备",
                                templet: "#device_Select"
                            }, {
                                field: "min",
                                align: "center",
                                width: "18%",
                                title: "小值(>=)",
                                edit: "text"
                            }, {
                                field: "max",
                                align: "center",
                                width: "18%",
                                title: "大值(<=)",
                                edit: "text"
                            }, {
                                title: "操作",
                                align: "center",
                                width: "18%",
                                toolbar: "#wherebar"
                            }]]
                        }), table.on("toolbar(" + r + ")", function (e) {
                            switch (e.event) {
                            case "addWhere":
                                var t = e.config.id,
                                    a = table.cache[t];
                                a.push({
                                    code: "",
                                    min: "",
                                    max: ""
                                }), table.reload(t, {
                                    data: a
                                });
                                break;
                            case "flowAnimationSaveButton":
                                layer.msg("保存成功", {
                                    offset: "t",
                                    anim: 6,
                                    icon: 1
                                })
                            }
                        }), table.on("tool(" + r + ")", function (t) {
                            "delWhere" === t.event && layer.confirm("真的删除行么", function (r) {
                                var i = t.tr,
                                    o = i.closest(".layui-table-view"),
                                    n = table.cache[o.attr("lay-id")];
                                t.tr.data("index") >= 0 && (n.splice(t.tr.data("index"), 1), table.reload(o.attr("lay-id"), {
                                    data: n
                                }), stageOper.setModuleAttr(moduleObject, a, e, table.cache[o.attr("lay-id")])), layer.close(r)
                            })
                        }), table.on("edit(" + r + ")", function (t) {
                            var r = t.tr,
                                i = r.closest(".layui-table-view");
                            stageOper.setModuleAttr(moduleObject, a, e, table.cache[i.attr("lay-id")])
                        }), form.on("select(deviceSelect_select)", function (t) {
                            var r = $(t.elem),
                                i = r.closest("td"),
                                o = i.closest("tr"),
                                n = o.closest(".layui-table-view");
                            n.attr("lay-id"), table.cache[n.attr("lay-id")][o.data("index")].devicecode = t.value, stageOper.setModuleAttr(moduleObject, a, e, table.cache[n.attr("lay-id")])
                        })
                    }(sparkling_attr_id, sparkling_attr_value, sparkling_attr_Where, sparkling_attr_Type, sparkling_attr_Name, whereObjArray)
                }
            }
        }, setModuleAttr: function (e, t, a, r) {
            for (var i = t.split(","), o = 0; o < i.length; o++) {
                var n, l = i[o],
                    d = e.attrs.moduleType;
                if (n = "this" === l ? e : e.findOne("." + l), "text" == a && (r = "" == r ? "-" : r), "strokeWidth" == a && (r = parseFloat(r)), "FLOWLINE" === d && "strokeWidth" === a) {
                    var s = e.findOne(".backgroundLine"),
                        c = e.findOne(".dynamicLine");
                    s.setAttr(a, r), c.setAttr(a, 4 * (s.attrs.strokeWidth / 5)), c.setAttr("dash", [s.attrs.strokeWidth, 2 * s.attrs.strokeWidth])
                } else if ("FLOWLINE" === d && "where" === a) {
                    for (var u = new Array, h = 0; h < r.length; h++)
                        if ("" !== r[h].code && "" !== r[h].min && "" !== r[h].max) {
                            var m = new Object;
                            m.direction = r[h].code, m.where = {
                                min: r[h].min,
                                max: r[h].max
                            }, u.push(m)
                        }
                    n.setAttr(a, JSON.stringify(u))
                } else if ("STATUSVALUE" === d && "where" === a) {
                    for (var u = new Array, h = 0; h < r.length; h++)
                        if ("" !== r[h].description && "" !== r[h].min && "" !== r[h].max) {
                            var m = new Object;
                            m.description = r[h].description, m.where = {
                                min: r[h].min,
                                max: r[h].max
                            }, u.push(m)
                        }
                    n.setAttr(a, JSON.stringify(u))
                } else if ("STATUSLIGHT" === d && "where" === a) {
                    for (var u = new Array, h = 0; h < r.length; h++)
                        if ("" !== r[h].color && "" !== r[h].min && "" !== r[h].max) {
                            var m = new Object;
                            m.color = r[h].color, m.where = {
                                min: r[h].min,
                                max: r[h].max
                            }, u.push(m)
                        }
                    n.setAttr(a, JSON.stringify(u))
                } else if ("IMAGES_SWITCH" === d && "where" === a) {
                    for (var u = new Array, g = "", h = 0; h < r.length; h++)
                        if ("" !== r[h].status && "" !== r[h].icon) {
                            var m = new Object;
                            m.description = r[h].description, m.status = r[h].status, m.command = r[h].command, m.icon = r[h].icon, 0 == h && (g = m.icon.split("_")[0] + "." + m.icon.split(".")[1]), u.push(m)
                        }
                    n.setAttr(a, JSON.stringify(u)), n.setAttr("imageURL", g);
                    var y = e.find("Image");
                    y.each(function (e) {
                        e.destroy()
                    });
                    var f = g;
                    Konva.Image.fromURL(f, function (t) {
                        t.name("myShape"), t.setAttr("offset", {
                            x: t.width() / 2,
                            y: t.height() / 2
                        }), e.add(t), stageOper.layer.get(".transformer")[0].nodes([e]), stageOper.layer.draw()
                    })
                } else if ("clickWhere" === a) {
                    for (var u = new Array, h = 0; h < r.length; h++) {
                        var m = new Object;
                        m.code = r[h].code, m.content = r[h].content, u.push(m)
                    }
                    u.length > 0 && n.setAttr(a, JSON.stringify(u))
                } else if ("rotateWhere" === a) {
                    for (var u = new Array, h = 0; h < r.length; h++)
                        if ("" !== r[h].devicecode && "" !== r[h].min && "" !== r[h].max) {
                            var m = new Object;
                            m.devicecode = r[h].devicecode, m.min = r[h].min, m.max = r[h].max, u.push(m)
                        }
                    n.setAttr(a, JSON.stringify(u))
                } else if ("hideWhere" === a) {
                    for (var u = new Array, h = 0; h < r.length; h++)
                        if ("" !== r[h].devicecode && "" !== r[h].min && "" !== r[h].max) {
                            var m = new Object;
                            m.devicecode = r[h].devicecode, m.min = r[h].min, m.max = r[h].max, u.push(m)
                        }
                    n.setAttr(a, JSON.stringify(u))
                } else if ("sparklingWhere" === a) {
                    for (var u = new Array, h = 0; h < r.length; h++)
                        if ("" !== r[h].devicecode && "" !== r[h].min && "" !== r[h].max) {
                            var m = new Object;
                            m.devicecode = r[h].devicecode, m.min = r[h].min, m.max = r[h].max, u.push(m)
                        }
                    n.setAttr(a, JSON.stringify(u))
                } else if ("TextLableValue" === d && "text" === a) {
                    n.setAttr(a, r);
                    var p = e.get(".descriptionRect")[0];
                    p.width(n.getWidth()), p.height(n.getHeight());
                    var v = e.get(".complexTextValue")[0];
                    v.x(n.x() + n.getWidth()), v.y(n.y());
                    var b = e.get(".rectValue")[0];
                    b.x(n.x() + n.getWidth()), b.y(n.y())
                } else if ("TextLableValue" === d && "fontSize" === a) {
                    n.setAttr(a, r);
                    var w = e.get(".description")[0],
                        p = e.get(".descriptionRect")[0];
                    p.width(w.getWidth()), p.height(w.getHeight());
                    var v = e.get(".complexTextValue")[0];
                    v.x(w.x() + w.getWidth()), v.y(w.y());
                    var b = e.get(".rectValue")[0];
                    b.x(w.x() + w.getWidth()), b.y(w.y()), b.width(v.getWidth()), b.height(v.getHeight())
                } else if ("BUTTON" === d) {
                    n.setAttr(a, r);
                    var w = e.get(".buttonText")[0],
                        p = e.get(".buttonRect")[0];
                    p.width(w.getWidth()), p.height(w.getHeight())
                } else "BASELINE" === d && "strokeWidth" === a ? 2 > r ? layer.msg("线段粗细不能小于2", {
                    offset: "t",
                    anim: 6,
                    icon: 2
                }) : n.setAttr(a, r) : n.setAttr(a, r);
                "BASELINE" == d ? this.addLineEdit(e) : "FLOWLINE" == d ? this.addFlowLineEdit(e) : this.layer.get(".transformer")[0].nodes([e]), this.layer.draw()
            }
        }, setStageKeyboardEvent: function () {
            var e = this.stage.container();
            e.tabIndex = 1, e.focus(), e.addEventListener("keydown", function (e) {
                var t;
                try {
                    t = stageOper.layer.get(".transformer")[0].nodes()
                } catch (e) {
                    t = []
                }
                if (0 != t.length)
                    for (var a = 0; a < t.length; a++) {
                        var r = t[a];
                        if (37 === e.which) r.x(r.x() - 1);
                        else if (38 === e.which) r.y(r.y() - 1);
                        else if (39 === e.which) r.x(r.x() + 1);
                        else if (40 === e.which) r.y(r.y() + 1);
                        else if (46 === e.which) stageOper.deleteModule();
                        else {
                            if (86 !== e.which || !e.ctrlKey) return;
                            var i = r.toJSON();
                            stageOper.addModuleToStage(i, {
                                x: r.x() + 10,
                                y: r.y() + 10
                            })
                        }
                    } else {
                        var r = currentModule;
                        if (37 === e.which) r.x(r.x() - 1);
                        else if (38 === e.which) r.y(r.y() - 1);
                        else if (39 === e.which) r.x(r.x() + 1);
                        else if (40 === e.which) r.y(r.y() + 1);
                        else if (46 === e.which) stageOper.deleteModule(r);
                        else {
                            if (86 !== e.which || !e.ctrlKey) return;
                            var i = r.toJSON(),
                                o = stageOper.addModuleToStage(i, {
                                    x: r.x() + 10,
                                    y: r.y() + 10
                                });
                            stageOper.removeFlowLineEdit(o), stageOper.removeLineEdit(o)
                        }
                    }
                e.preventDefault(), stageOper.layer.batchDraw()
            })
        }, topButtonFun: function (e) {
            var t;
            try {
                t = stageOper.layer.get(".transformer")[0].nodes()
            } catch (a) {
                t = []
            }
            if (0 != t.length)
                for (var r = 0; r < t.length; r++) {
                    var i = t[r];
                    if ("copy" == e) {
                        var o = i.toJSON();
                        stageOper.addModuleToStage(o, {
                            x: i.x() + 10,
                            y: i.y() + 10
                        })
                    }
                    "delete" == e && stageOper.deleteModule(), "up" == e && i.moveUp(), "down" == e && i.moveDown(), "top" == e && i.moveToTop(), "bottom" == e && i.moveToBottom()
                } else {
                    var i = currentModule;
                    if ("copy" == e) {
                        var o = i.toJSON(),
                            n = stageOper.addModuleToStage(o, {
                                x: i.x() + 10,
                                y: i.y() + 10
                            });
                        stageOper.removeFlowLineEdit(n), stageOper.removeLineEdit(n)
                    }
                    "delete" == e && stageOper.deleteModule(i), "up" == e && i.moveUp(), "down" == e && i.moveDown(), "top" == e && i.moveToTop(), "bottom" == e && i.moveToBottom()
                }
            this.stage.draw()
        }, stageMaxMin: function (e) {
            var t = 1,
                a = 1;
            "max" == e && (t = this.stage.scale()
                    .x + .05, a = this.stage.scale()
                    .y + .05, this.stage.draggable(!0), layer.msg("放大或缩小状态下不可以框选组件", {
                        offset: "48px",
                        anim: 6,
                        icon: 4
                    })), "min" == e && (t = this.stage.scale()
                    .x - .05, a = this.stage.scale()
                    .y - .05, this.stage.draggable(!0), layer.msg("放大或缩小状态下不可以框选组件", {
                        offset: "48px",
                        anim: 6,
                        icon: 4
                    })), ("restore" == e || 1 == t) && (this.stage.position({
                    x: 0,
                    y: 0
                }), this.stage.draggable(!1)), this.stage.scale({
                    x: t,
                    y: t
                }), this.stage.draw(), $("#stageProportion")
                .val(parseInt(100 * t) + "%")
        }, addMouseListens: function (e) {
            var t = e.container();
            document.addEventListener && t.addEventListener("DOMMouseScroll", this.scrollFunc, !1), t.onmousewheel = t.onmousewheel = this.scrollFunc
        }, scrollFunc: function (e) {
            e = e || window.event, e.wheelDelta ? (e.wheelDelta > 0 && stageOper.stageMaxMin("max"), e.wheelDelta < 0 && stageOper.stageMaxMin("min")) : e.detail && (e.detail > 0 && stageOper.stageMaxMin("max"), e.detail < 0 && stageOper.stageMaxMin("min"))
        }
    }, win.StageOperation = StageOperation
}(window);
var stageOper, container, initConfig, initjson, jyztEchartOption, currentModule, currentModule_shape, switchIconUrl = "",
    menuNode, colorpicker, slider, tree, table, form;
$(function () {
    "use strict";
    var stage_id = $_GET.stageId;
    menuNode = document.getElementById("menu"), layui.use(["element", "form", "colorpicker", "slider", "tree", "table"], function () {
        table = layui.table, form = layui.form;
        var element = layui.element;
        colorpicker = layui.colorpicker, slider = layui.slider, tree = layui.tree, form.on("checkbox(hbfzx)", function (e) {
            stageOper.setStageGrid(e.elem.checked), e.elem.checked ? $("#gridColorGroup")
                .show() : ($("#gridColorGroup")
                    .hide(), $("#gridColor")
                    .val(""))
        }), form.on("radio(stagedrag)", function (data) {
            stageOper.setStageDrag(eval(data.value))
        }), colorpicker.render({
            elem: "#gridColorSelect",
            color: "",
            predefine: !0,
            change: function (e) {
                $("#gridColor")
                    .val(e), stageOper.setGridColor(e)
            }
        }), element.on("tab(zt_attr_tab)", function (data) {
            if (2 == data.index) {
                var stageJson = stageOper.stage.toJSON();
                stageJson = stageJson.replace(/className/g, 'spread":"true","title'), tree.reload("stageStructure", {
                    data: eval("([" + stageJson + "])")
                })
            }
        }), tree.render({
            elem: "#stageStructure",
            id: "stageStructure",
            data: "",
            onlyIconControl: !0,
            click: function (e) {
                layer.msg(e.data.attrs.id)
            }
        }), jyztEchartOption = new EchartOption, initConfig = new InitConfig, $.ajaxSettings.async = !1, $.getJSON("config/init.json", function (e) {
            initjson = e
        }), $.ajaxSettings.async = !0, stageOper = new StageOperation, stageOper.initStage(stage_id, element);
        var module_base = eval("initConfig." + initjson.initBaseMoudleFunction + "()");
        stageOper.setLeftModulePanel(module_base);
        var module_base = eval("initConfig." + initjson.initMapStorageMoudleFunction + "()");
        stageOper.setLeftMapStorageModulePanel(module_base),
        container = stageOper.stage.container(),
        container.addEventListener("dragover", function (e) {
                e.preventDefault()
            }), container.addEventListener("drop", function (e) {
                e.preventDefault();
                var t = e.dataTransfer.getData("text");
                stageOper.stage._setPointerPosition(e);
                var a = stageOper.stage.getPointerPosition();
                stageOper.addModuleToStage(t, a)
            }), stageOper.stage.on("dragmove", function () {}), stageOper.addModuleTransformEvent(), stageOper.addModuleContextmenu(),
            stageOper.setStageKeyboardEvent(), $("#left_shrink")
            .click(function () {
                $(".main_page_center_left")
                    .slideToggle(100, function () {
                        $(this)
                            .is(":visible") ? $("#left_shrink")
                            .attr("class", "layui-icon layui-icon-left") : $("#left_shrink")
                            .attr("class", "layui-icon layui-icon-right")
                    })
            }), $("#right_shrink")
            .click(function () {
                $(".main_page_center_right")
                    .slideToggle(100, function () {
                        $(this)
                            .is(":visible") ? $("#right_shrink")
                            .attr("class", "layui-icon layui-icon-right") : $("#right_shrink")
                            .attr("class", "layui-icon layui-icon-left")
                    })
            }), $("#yl")
            .click(function () {
                stageOper.stageMaxMin("restore"), window.open("preview.html", "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes")
            }), $("#bc")
            .click(function () {
                stageOper.stageMaxMin("restore");
                var stageObjJson = stageOper.getStageJson();
                "undefined" == typeof stage_id && (stage_id = ""), stage_id = eval("initConfig." + initjson.saveCallbackFunction + "(stageObjJson,stage_id)")
            }), $("#module_up")
            .click(function () {
                stageOper.changeModuleZindex("up")
            }), $("#module_down")
            .click(function () {
                stageOper.changeModuleZindex("down")
            }), $("#module_top")
            .click(function () {
                stageOper.changeModuleZindex("top")
            }), $("#module_bottom")
            .click(function () {
                stageOper.changeModuleZindex("bottom")
            }), $("#module_delete")
            .click(function () {
                stageOper.deleteModule(currentModule)
            }), $("#anchor_delete")
            .click(function () {
                stageOper.deleteModuleAnchor()
            }), $(document)
            .on("click", function () {
                menuNode.style.display = "none"
            })
    })
});
