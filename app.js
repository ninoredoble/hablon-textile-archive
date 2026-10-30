// Hablon: an interactive study of a shaft loom.
// Every crossing of the cloth is decided by threading (end -> shaft),
// tie-up (treadle -> shafts) and treadling (the order the treadles are pressed).
// The four cloths are the author's own sketches, not records of real textiles.

(function () {
  "use strict";

  var ENDS = 48, PICKS = 60, SHAFTS = 8, TREADLES = 8;
  var CELL = 10, GAP = 0.9;
  var MAT = "#1B1A19";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // ---------------------------------------------------------------- drafts

  function pointed(i) {
    var k = i % 14;
    return k < 8 ? k : 14 - k;
  }

  function makeTieup(lifts) {
    var rows = [];
    for (var t = 0; t < TREADLES; t++) {
      var row = [];
      for (var s = 0; s < SHAFTS; s++) row.push((lifts[t] || []).indexOf(s) !== -1);
      rows.push(row);
    }
    return rows;
  }

  // Warp ends of an ikat are tied in bundles, so a bundle's dye edge sits a pick or so
  // away from its neighbours'. A fixed offset per bundle of four ends imitates that.
  function ikatShift(e) {
    return [0, 1, 0, -1, 1, 0, -1, 0, 0, -1, 1, 0][(e >> 2) % 12];
  }

  function spiral(dx, dy, dir) {
    var pitch = 6, width = 3.2;
    var rho = Math.sqrt(dx * dx + dy * dy);
    if (rho > 11.5) return false;
    var t = rho - (pitch * dir * Math.atan2(dy, dx)) / (2 * Math.PI);
    var m = ((t % pitch) + pitch) % pitch;
    return m < width;
  }

  var PRESETS = {
    tnalak: {
      id: "tnalak",
      name: "T'nalak",
      people: "The T'boli",
      place: "Lake Sebu, South Cotabato",
      about: "T'nalak is the cloth of the T'boli of the Lake Sebu highlands, woven from abaca fibre on a backstrap loom. The pattern is made before weaving begins: the warp is tied in bundles and dyed with plant dyes, so the design is already in the threads when the weaver sits down. Weavers are often called dreamweavers, because designs are said to come to them in dreams.",
      study: "Here a stepped diamond is dyed into the warp and woven in a warp-faced plain weave, where the warp covers the weft. The edges of the diamond are shifted from one end to the next, the way tied and dyed threads blur in real ikat. The diamond is invented for this page; it is not a T'boli design.",
      structure: "Warp-faced plain weave on 2 shafts, with the pattern dyed into the warp (ikat)",
      palette: [
        { name: "dark plant dye", hex: "#1B1714" },
        { name: "red-brown plant dye", hex: "#8C3022" },
        { name: "undyed abaca", hex: "#D8CDB4" }
      ],
      thread: function (e) { return e % 2; },
      lifts: [[0], [1]],
      sequence: function (i) { return i % 2; },
      follows: "Weave a pick alternates treadle 1 and treadle 2, which is plain weave.",
      faced: true,
      warp: function (e, p) {
        var u = e % 16, v = (((p + ikatShift(e)) % 16) + 16) % 16;
        var d = Math.abs(u - 7.5) + Math.abs(v - 7.5);
        return [1, 0, 2, 0, 1, 0, 2, 0][Math.floor(d / 2)];
      },
      weft: function () { return 0; }
    },

    yakan: {
      id: "yakan",
      name: "Seputangan",
      people: "The Yakan",
      place: "Basilan",
      about: "The seputangan is a square cloth of the Yakan people of Basilan, worn as a headcloth. Yakan weaving is known for bold geometric designs built from diamonds and steps, many of them laid in with extra pattern threads, called supplementary weft, on a plain ground.",
      study: "A plain-weave ground carries a pattern weft that floats on the surface wherever the nested diamond calls for it. The diamond is a generic stepped motif I drew; it is not a record of a named Yakan pattern, and a real seputangan is far richer.",
      structure: "Plain weave ground on 2 shafts, with a supplementary pattern weft on treadle 3",
      palette: [
        { name: "indigo warp", hex: "#22405C" },
        { name: "deep indigo weft", hex: "#16293C" },
        { name: "turmeric yellow", hex: "#D9A21E" },
        { name: "red", hex: "#A33A2A" },
        { name: "undyed cotton", hex: "#E8E1D0" }
      ],
      thread: function (e) { return e % 2; },
      lifts: [[0], [1], [0]],
      sequence: function (i) { return [0, 2, 1, 2][i % 4]; },
      follows: "Weave a pick repeats: ground, pattern, ground, pattern. Treadle 3 lays the pattern weft.",
      suppTreadle: 2,
      supp: function (e, r) {
        var dx = (e % 24) + 0.5 - 12, dy = ((r % 12) + 0.5) * 2 - 12;
        var d = Math.abs(dx) + Math.abs(dy);
        if (Math.abs(dx) >= 10 && Math.abs(dy) >= 10) return 2;
        if (d >= 15) return -1;
        return [2, -1, 3, -1, 4][Math.floor(d / 3)];
      },
      warp: function () { return 0; },
      weft: function () { return 1; }
    },

    inaul: {
      id: "inaul",
      name: "Inaul",
      people: "The Maguindanaon",
      place: "Cotabato region",
      about: "Inaul is the handwoven cloth of the Maguindanaon people of central Mindanao, made in bright colours and geometric designs and worn in forms such as the malong, a tubular cloth.",
      study: "A shaft loom can make zigzags and diamonds just by lifting different shafts on each pick. This study uses an eight-shaft pointed twill so you can see, and change, how the tie-up makes a diamond. I chose the structure to illustrate the idea; I do not know it to be the structure of any particular inaul.",
      structure: "Pointed 4/4 twill on 8 shafts, crimson warp against gold weft",
      palette: [
        { name: "green warp", hex: "#1F5A47" },
        { name: "crimson warp", hex: "#8A1E2D" },
        { name: "gold weft", hex: "#C9A04A" }
      ],
      thread: function (e) { return pointed(e); },
      lifts: [[0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6], [4, 5, 6, 7], [5, 6, 7, 0], [6, 7, 0, 1], [7, 0, 1, 2]],
      sequence: function (i) { return pointed(i); },
      follows: "Weave a pick presses the treadles in a point, 1 to 8 and back to 2. Each treadle lifts four neighbouring shafts, so the diagonals turn at the point.",
      warp: function (e) { return e % 12 === 5 || e % 12 === 6 ? 0 : 1; },
      weft: function () { return 2; }
    },

    maranao: {
      id: "maranao",
      name: "Landap",
      people: "The Maranao",
      place: "Lake Lanao",
      about: "The Maranao of Lake Lanao are known for the malong, a tubular cloth worn in many ways, and for okir, a flowing curved ornament best known from carved wood and metalwork. Landap refers to the woven, banded designs of the malong.",
      study: "Warp stripes make the bands, in a warp-faced weave where the warp covers the weft, and a pair of mirrored scrolls is laid in with a supplementary weft, drawn loosely in the manner of okir. Okir is a carved and painted tradition; the scrolls here are a coarse, thread-by-thread sketch I made, not a Maranao design.",
      structure: "Warp-faced plain weave on 2 shafts, striped warp, supplementary scroll weft on treadle 3",
      palette: [
        { name: "lampblack", hex: "#1E1A1E" },
        { name: "sappanwood red", hex: "#8C2F4E" },
        { name: "turmeric yellow", hex: "#D8A32A" },
        { name: "undyed cotton", hex: "#E6DCC6" }
      ],
      thread: function (e) { return e % 2; },
      lifts: [[0], [1], [0]],
      sequence: function (i) { return [0, 2, 1, 2][i % 4]; },
      follows: "Weave a pick repeats: ground, pattern, ground, pattern. Treadle 3 lays the scroll weft.",
      suppTreadle: 2,
      thumbRow: 12,
      faced: true,
      supp: function (e, r) {
        var x = e + 0.5, y = ((r % 24) + 0.5) * 2;
        var a = spiral(x - 12, y - 24, 1), b = spiral(x - 36, y - 24, -1);
        return a || b ? 2 : -1;
      },
      warp: function (e) { return [1, 1, 1, 1, 1, 0, 0, 3, 0, 0, 1, 1][e % 12]; },
      weft: function () { return 0; }
    }
  };

  var ORDER = ["tnalak", "yakan", "inaul", "maranao"];

  // ----------------------------------------------------------------- state

  var state = {
    preset: PRESETS.tnalak,
    tieup: null,
    picks: [],
    running: null,
    probe: null,
    lastTreadle: -1
  };

  Object.keys(PRESETS).forEach(function (id) {
    var p = PRESETS[id];
    p.threadArr = [];
    for (var e = 0; e < ENDS; e++) p.threadArr.push(p.thread(e));
    p.used = [];
    for (var s = 0; s < SHAFTS; s++) p.used.push(p.threadArr.indexOf(s) !== -1);
  });

  function makePick(preset, tieup, picks, t) {
    var supp = preset.suppTreadle === t;
    var r = 0;
    if (supp) {
      for (var i = 0; i < picks.length; i++) if (picks[i].supp) r++;
    }
    return { t: t, lift: tieup[t].slice(), supp: supp, r: r };
  }

  function cellAt(preset, picks, e, p) {
    var pk = picks[p], s = preset.threadArr[e], up = pk.lift[s];
    if (pk.supp) {
      var sc = preset.supp(e, pk.r);
      if (sc >= 0) return { kind: "supp", c: sc, up: up, s: s };
    }
    if (p + 1 < picks.length && picks[p + 1].supp) {
      // a pattern weft laid on the next pick floats over this ground pick too
      var cover = preset.supp(e, picks[p + 1].r);
      if (cover >= 0) return { kind: "supp", c: cover, up: up, s: s };
    }
    if (preset.faced) return { kind: "warp", c: preset.warp(e, p), up: up, s: s };
    if (up) return { kind: "warp", c: preset.warp(e, p), up: up, s: s };
    return { kind: "weft", c: preset.weft(p), up: up, s: s };
  }

  // ------------------------------------------------------------- rendering

  function clothMarkup(preset, picks, from, to) {
    var d = preset.palette.map(function () { return ""; });
    var shade = "";
    for (var p = from; p < to; p++) {
      for (var e = 0; e < ENDS; e++) {
        var c = cellAt(preset, picks, e, p);
        var x = e * CELL, y = p * CELL, w = CELL - 2 * GAP, seg;
        if (c.kind === "warp") {
          seg = "M" + (x + GAP) + " " + y + "h" + w + "v" + CELL + "h" + (-w) + "z";
        } else {
          seg = "M" + x + " " + (y + GAP) + "h" + CELL + "v" + w + "h" + (-CELL) + "z";
        }
        d[c.c] += seg;
        if (preset.faced && c.kind === "warp" && !c.up) shade += seg;
      }
    }
    var out = "";
    preset.palette.forEach(function (col, i) {
      if (d[i]) out += '<path fill="' + col.hex + '" d="' + d[i] + '"/>';
    });
    if (shade) out += '<path fill="#000" fill-opacity="0.12" d="' + shade + '"/>';
    return out;
  }

  function ghostMarkup(preset, from) {
    var d = preset.palette.map(function () { return ""; });
    for (var p = from; p < PICKS; p++) {
      for (var e = 0; e < ENDS; e++) {
        var c = preset.warp(e, p);
        d[c] += "M" + (e * CELL + 3) + " " + (p * CELL) + "h4v" + CELL + "h-4z";
      }
    }
    var out = "";
    preset.palette.forEach(function (col, i) {
      if (d[i]) out += '<path fill="' + col.hex + '" d="' + d[i] + '"/>';
    });
    return out;
  }

  var $ = function (id) { return document.getElementById(id); };
  var el = {
    loom: $("loom"), ghost: $("ghost"), cloth: $("cloth"), lastRow: $("lastRow"),
    fell: $("fell"), shuttle: $("shuttle"), probe: $("probe"), readout: $("readout"),
    count: $("pickCount"), name: $("plateName"), status: $("status"),
    weave: $("btnWeave"), run: $("btnRun"), undo: $("btnUndo"), clear: $("btnClear"),
    svg: $("btnSvg"), json: $("btnJson"), restore: $("btnRestore"),
    tieup: $("tieup"), follows: $("follows")
  };

  var DEFAULT_READOUT = el.readout.textContent;

  function render(animate) {
    var P = state.preset, n = state.picks.length;
    el.ghost.innerHTML = ghostMarkup(P, n);
    el.cloth.innerHTML = clothMarkup(P, state.picks, 0, Math.max(0, n - 1));
    el.lastRow.innerHTML = n ? clothMarkup(P, state.picks, n - 1, n) : "";

    el.lastRow.classList.remove("sweep");
    el.shuttle.classList.remove("fly");
    if (animate && n && !reduceMotion.matches) {
      void el.loom.getBoundingClientRect();
      el.lastRow.classList.add("sweep");
      el.shuttle.classList.add("fly");
    }
    el.fell.setAttribute("y", n * CELL - 0.8);
    el.shuttle.setAttribute("transform", "translate(0 " + (n * CELL - 3) + ")");

    el.count.textContent = "Pick " + n + " of " + PICKS;
    el.weave.disabled = n >= PICKS;
    el.undo.disabled = n === 0;
    el.clear.disabled = n === 0;
    el.svg.disabled = n === 0;
    el.json.disabled = n === 0;
    el.loom.setAttribute("aria-label", P.name + " cloth, " + n + " of " + PICKS + " picks woven. Use the arrow keys to move along the threads.");
    if (state.probe) showProbe(state.probe.e, state.probe.p, false);
  }

  function announce(text) {
    el.status.textContent = "";
    window.setTimeout(function () { el.status.textContent = text; }, 30);
  }

  // ----------------------------------------------------------------- tie-up

  function buildTieup() {
    var P = state.preset, html = '<span class="tu-corner"></span>';
    for (var s = 0; s < SHAFTS; s++) {
      html += '<span class="tu-head' + (P.used[s] ? "" : " idle") + '">' + (s + 1) + "</span>";
    }
    for (var t = 0; t < TREADLES; t++) {
      html += '<button type="button" class="treadle" data-t="' + t + '" aria-label="Treadle ' + (t + 1) + ', weave a pick">Treadle ' + (t + 1) + "</button>";
      for (var s2 = 0; s2 < SHAFTS; s2++) {
        var on = state.tieup[t][s2];
        html += '<button type="button" class="tu-cell' + (P.used[s2] ? "" : " idle") + '" data-t="' + t + '" data-s="' + s2 +
          '" aria-pressed="' + on + '" aria-label="Treadle ' + (t + 1) + " lifts shaft " + (s2 + 1) + '"></button>';
      }
    }
    el.tieup.innerHTML = html;
    el.follows.textContent = P.follows + " Shafts with no thread on them are dimmed.";
    markTieupChanged();
  }

  function tieupChanged() {
    var base = makeTieup(state.preset.lifts);
    for (var t = 0; t < TREADLES; t++) for (var s = 0; s < SHAFTS; s++) if (base[t][s] !== state.tieup[t][s]) return true;
    return false;
  }

  function markTieupChanged() {
    el.restore.hidden = !tieupChanged();
  }

  function flashTreadle(t) {
    state.lastTreadle = t;
    var btns = el.tieup.querySelectorAll(".treadle");
    for (var i = 0; i < btns.length; i++) btns[i].classList.toggle("last", i === t);
  }

  // ----------------------------------------------------------------- weaving

  function weaveWith(t, animate) {
    if (state.picks.length >= PICKS) return false;
    state.picks.push(makePick(state.preset, state.tieup, state.picks, t));
    flashTreadle(t);
    render(animate);
    return true;
  }

  function weaveNext(animate) {
    return weaveWith(state.preset.sequence(state.picks.length), animate);
  }

  function stopRun() {
    if (state.running) {
      window.clearInterval(state.running);
      state.running = null;
    }
    el.run.textContent = "Run";
    el.run.setAttribute("aria-pressed", "false");
  }

  function startRun() {
    if (state.picks.length >= PICKS) return;
    el.run.textContent = "Pause";
    el.run.setAttribute("aria-pressed", "true");
    var gap = reduceMotion.matches ? 400 : 150;
    state.running = window.setInterval(function () {
      if (!weaveNext(true)) {
        stopRun();
        announce("The cloth is full. Download it, or clear the loom.");
      }
    }, gap);
  }

  function prewoven(count) {
    state.picks = [];
    for (var i = 0; i < count; i++) {
      state.picks.push(makePick(state.preset, state.tieup, state.picks, state.preset.sequence(i)));
    }
  }

  function selectPreset(id, quiet) {
    stopRun();
    state.preset = PRESETS[id];
    state.tieup = makeTieup(state.preset.lifts);
    state.probe = null;
    el.probe.setAttribute("visibility", "hidden");
    el.readout.textContent = DEFAULT_READOUT;
    prewoven(16);
    el.name.textContent = state.preset.name;
    var btns = document.querySelectorAll(".pick");
    for (var i = 0; i < btns.length; i++) btns[i].setAttribute("aria-pressed", btns[i].dataset.id === id ? "true" : "false");
    $("entryName").textContent = state.preset.name;
    $("entryAbout").textContent = state.preset.about;
    $("entryStudy").textContent = state.preset.study;
    $("factPeople").textContent = state.preset.people;
    $("factPlace").textContent = state.preset.place;
    $("factStructure").textContent = state.preset.structure;
    buildTieup();
    render(false);
    if (!quiet) announce(state.preset.name + " selected. Sixteen picks are already woven; clear the loom to start again.");
  }

  // ------------------------------------------------------------------ probe

  function describe(e, p) {
    var P = state.preset, s = P.threadArr[e];
    if (p >= state.picks.length) {
      return "End " + (e + 1) + ", pick " + (p + 1) + ": not woven yet. This warp end is threaded on shaft " + (s + 1) + ".";
    }
    var pk = state.picks[p], c = cellAt(P, state.picks, e, p), what;
    if (c.kind === "supp") what = "the pattern weft floats on top";
    else if (c.kind === "weft") what = "the weft shows on top";
    else if (P.faced) what = "the warp covers the weft";
    else what = "the warp shows on top";
    return "End " + (e + 1) + ", pick " + (p + 1) + ": " + what + ". Shaft " + (s + 1) + " was " +
      (pk.lift[s] ? "raised" : "lowered") + " by treadle " + (pk.t + 1) + ". Colour: " + P.palette[c.c].name + ".";
  }

  function showProbe(e, p, say) {
    state.probe = { e: e, p: p };
    el.probe.setAttribute("x", e * CELL);
    el.probe.setAttribute("y", p * CELL);
    el.probe.setAttribute("visibility", "visible");
    el.readout.textContent = describe(e, p);
  }

  function clearProbe() {
    state.probe = null;
    el.probe.setAttribute("visibility", "hidden");
    el.readout.textContent = DEFAULT_READOUT;
  }

  function cellFromEvent(ev) {
    var m = el.loom.getScreenCTM();
    if (!m) return null;
    var pt = el.loom.createSVGPoint();
    pt.x = ev.clientX;
    pt.y = ev.clientY;
    var q = pt.matrixTransform(m.inverse());
    var e = Math.floor(q.x / CELL), p = Math.floor(q.y / CELL);
    if (e < 0 || e >= ENDS || p < 0 || p >= PICKS) return null;
    return { e: e, p: p };
  }

  el.loom.addEventListener("pointermove", function (ev) {
    if (ev.pointerType === "touch") return;
    var c = cellFromEvent(ev);
    if (c) showProbe(c.e, c.p); else clearProbe();
  });
  el.loom.addEventListener("pointerdown", function (ev) {
    var c = cellFromEvent(ev);
    if (c) showProbe(c.e, c.p);
  });
  el.loom.addEventListener("pointerleave", function (ev) {
    if (ev.pointerType === "mouse" && document.activeElement !== el.loom) clearProbe();
  });
  el.loom.addEventListener("keydown", function (ev) {
    var d = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[ev.key];
    if (ev.key === "Escape") { clearProbe(); return; }
    if (!d) return;
    ev.preventDefault();
    var cur = state.probe || { e: 0, p: 0 };
    var e = Math.min(ENDS - 1, Math.max(0, cur.e + d[0]));
    var p = Math.min(PICKS - 1, Math.max(0, cur.p + d[1]));
    showProbe(e, p);
  });

  // ---------------------------------------------------------------- exports

  function download(name, text, type) {
    var url = URL.createObjectURL(new Blob([text], { type: type }));
    var a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function treadling() {
    return state.picks.map(function (pk) { return pk.t + 1; });
  }

  function exportSvg() {
    var P = state.preset, n = state.picks.length, w = ENDS * CELL, h = n * CELL;
    var desc = "A cloth woven in the Hablon loom study: " + P.name + ", " + n + " picks on " + ENDS +
      " warp ends. Structure: " + P.structure + ". Treadling: " + treadling().join(",") + ". " +
      "This is an original sketch in the manner of a tradition, not a record of a real textile.";
    var svg = '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + " " + h + '" width="' + w + '" height="' + h + '" role="img" aria-labelledby="t d">\n' +
      "<title id=\"t\">Hablon study: " + P.name + " cloth</title>\n" +
      '<desc id="d">' + desc + "</desc>\n" +
      '<rect width="' + w + '" height="' + h + '" fill="' + MAT + '"/>\n' +
      '<g id="cloth">' + clothMarkup(P, state.picks, 0, n) + "</g>\n</svg>\n";
    download("hablon-" + P.id + "-" + n + "-picks.svg", svg, "image/svg+xml");
    announce("Downloaded " + P.name + " as an SVG.");
  }

  function exportJson() {
    var P = state.preset;
    var draft = {
      format: "hablon-draft/1",
      note: "A weave draft from the Hablon loom study. The motifs are original sketches, not records of real textiles.",
      cloth: P.name,
      structure: P.structure,
      warpEnds: ENDS,
      picks: state.picks.length,
      shafts: SHAFTS,
      treadles: TREADLES,
      threading: P.threadArr.map(function (s) { return s + 1; }),
      tieup: state.tieup.map(function (row) {
        var out = [];
        row.forEach(function (on, s) { if (on) out.push(s + 1); });
        return out;
      }),
      treadling: treadling(),
      supplementaryTreadle: typeof P.suppTreadle === "number" ? P.suppTreadle + 1 : null,
      palette: P.palette
    };
    download("hablon-" + P.id + "-draft.json", JSON.stringify(draft, null, 2) + "\n", "application/json");
    announce("Downloaded the " + P.name + " draft as JSON.");
  }

  // --------------------------------------------------------------- controls

  el.weave.addEventListener("click", function () {
    stopRun();
    weaveNext(true);
  });
  el.run.addEventListener("click", function () {
    if (state.running) { stopRun(); announce("Paused at pick " + state.picks.length + "."); } else startRun();
  });
  el.undo.addEventListener("click", function () {
    stopRun();
    state.picks.pop();
    render(false);
  });
  el.clear.addEventListener("click", function () {
    stopRun();
    state.picks = [];
    render(false);
    announce("Loom cleared.");
  });
  el.svg.addEventListener("click", exportSvg);
  el.json.addEventListener("click", exportJson);
  el.restore.addEventListener("click", function () {
    state.tieup = makeTieup(state.preset.lifts);
    buildTieup();
    announce("Original tie-up restored for the next picks.");
  });

  el.tieup.addEventListener("click", function (ev) {
    var b = ev.target.closest("button");
    if (!b) return;
    var t = Number(b.dataset.t);
    if (b.classList.contains("treadle")) {
      stopRun();
      if (!weaveWith(t, true)) announce("The cloth is full.");
      return;
    }
    var s = Number(b.dataset.s);
    state.tieup[t][s] = !state.tieup[t][s];
    b.setAttribute("aria-pressed", String(state.tieup[t][s]));
    markTieupChanged();
  });

  document.getElementById("chooser").addEventListener("click", function (ev) {
    var b = ev.target.closest(".pick");
    if (b && b.getAttribute("aria-pressed") !== "true") selectPreset(b.dataset.id);
  });

  document.addEventListener("keydown", function (ev) {
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    if (/^[1-8]$/.test(ev.key)) {
      var tag = (ev.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      stopRun();
      if (!weaveWith(Number(ev.key) - 1, true)) announce("The cloth is full.");
    }
  });

  // ----------------------------------------------------------- start up

  function thumbs() {
    var btns = document.querySelectorAll(".pick");
    for (var i = 0; i < btns.length; i++) {
      var P = PRESETS[btns[i].dataset.id], tu = makeTieup(P.lifts), picks = [], top = (P.thumbRow || 0) * CELL;
      for (var k = 0; k < 40; k++) picks.push(makePick(P, tu, picks, P.sequence(k)));
      var thumb = btns[i].querySelector(".thumb");
      thumb.setAttribute("viewBox", "0 " + top + " 240 240");
      thumb.innerHTML = '<rect y="' + top + '" width="240" height="240" fill="' + MAT + '"/>' + clothMarkup(P, picks, 0, 40);
    }
  }

  function reveal() {
    var items = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || reduceMotion.matches) {
      for (var i = 0; i < items.length; i++) items[i].classList.add("is-in");
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    for (var j = 0; j < items.length; j++) io.observe(items[j]);
  }

  thumbs();
  selectPreset("tnalak", true);
  reveal();
})();
