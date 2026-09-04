// HABLON - Indigenous Mindanao Textile Generative Geometry Engine
// Character Encoding: 100% 7-Bit ASCII - Clean Typography & Ethnographic Accuracy

const TRADITIONS = {
  "tnalak": {
    title: "T'nalak Sacred Abaca Tapestry",
    origin: "Lake Sebu, South Cotabato // T'boli Dreamweavers",
    summary: "Woven from wild abaca fibers conditioned with beeswax and dyed using boiled roots and bark. Traditionally known as 'woven dreams' bestowed by Fu Dalu, the spirit of abaca. Motifs embody non-repeating symmetry and rhythmic geometric permutations.",
    fiber: "Musa textilis (Wild Abaca)",
    pigments: "K'nalum tree bark (Black), Lokob root (Red), Natural Ecru",
    loom: "Backstrap Tension Loom (Ikatan)",
    symmetry: "D4 Dihedral Diamond Group",
    totem: "G'mayaw (Sacred Hawk) & Kleng (Crab)",
    caption: "FIG. 04-A // T'NALAK DIAMOND LATTICE MATRIX",
    bg: "#141312",
    colors: ["#141312", "#8c2f1f", "#e6ded1"],
    pigmentNames: ["K'nalum Black (Bark)", "Lokob Red (Roots)", "Bleached Abaca Ecru"]
  },
  "yakan": {
    title: "Seputangan Square Tapestry",
    origin: "Lamitan, Basilan // Yakan Weaving Guild",
    summary: "The most intricate textile in the Philippine archipelago. Utilizing supplementary weft techniques on backstrap looms, Yakan weavers construct fractal diamonds, pythons (bubu), and bamboo flower motifs through strict mental arithmetic with zero written patterns.",
    fiber: "Handspun Cotton & Mercerized Thread",
    pigments: "Indigofera (Deep Indigo), Turmeric (Gold), Sappanwood (Terra Red)",
    loom: "Five-Harness Backstrap Loom",
    symmetry: "P4m Wallpaper Group (Fractal Stepped Rhombus)",
    totem: "Bunga-Sama (Python Skin / Diamond Flower)",
    caption: "FIG. 04-B // SEPUTANGAN STEPPED DIAMOND HIERARCHY",
    bg: "#181c22",
    colors: ["#181c22", "#d9822b", "#1f6e8c", "#eae2cf"],
    pigmentNames: ["Charcoal Black", "Turmeric Gold", "Indigo Dye", "Unbleached Cotton"]
  },
  "inaul": {
    title: "Inaul Royal Heirloom Weave",
    origin: "Sultan Kudarat & Maguindanao // Bangsamoro Artisans",
    summary: "Woven by royal Maguindanao lineages symbolizing noble status and bravery. The 'Binaludtu' (rainbow) and 'Karanda' (geometric vessel) patterns interlock metallic lurex threads with raw silk in sharp zig-zag herringbone chevrons.",
    fiber: "Raw Mulberry Silk & Metallic Lurex Thread",
    pigments: "Bark tannins (Emerald), Mangosteen peel (Crimson), Gold thread",
    loom: "Foot-Pedal Reed Floor Loom",
    symmetry: "Pm Chevron & Alternating Zig-zag Grid",
    totem: "Binaludtu (Royal Rainbow Wave)",
    caption: "FIG. 04-C // BINALUDTU ROYAL CHEVRON WAVE",
    bg: "#0c1813",
    colors: ["#0c1813", "#c29b38", "#8b1e2c", "#f3edd8"],
    pigmentNames: ["Forest Green Tannin", "Metallic Gold Lurex", "Royal Crimson Dye", "Raw Mulberry Silk"]
  },
  "maranao": {
    title: "Landap & Okir Vector Scroll",
    origin: "Marawi City & Lake Lanao // Maranao Cultural Masters",
    summary: "Distinguished by flowing curvilinear Okir motifs (Okir a Dato and Okir a Bay). Contrasting continuous vertical panels (lakit) with horizontal geometry, honoring geometric precision without figurative representation.",
    fiber: "Fine Cotton & Raw Tussar Silk",
    pigments: "Sappanwood (Violet), Turmeric (Sunburst Yellow), Lampblack",
    loom: "Indigenous Framed Backstrap Loom",
    symmetry: "C2 Curvilinear Scroll Permutation",
    totem: "Matilak (Lakit Center Strip) & Pako Rabong (Fern)",
    caption: "FIG. 04-D // LAKIT LONGITUDINAL VECTOR BAND",
    bg: "#1a131f",
    colors: ["#1a131f", "#94385a", "#d4a73b", "#ede4d1"],
    pigmentNames: ["Deep Violet Dye", "Maranao Crimson", "Sunburst Turmeric", "Natural Tussar"]
  }
};

let currentTraditionKey = "tnalak";
let currentSeed = 42;
let currentWeftRow = 0;
let autoWeaveInterval = null;

document.addEventListener("DOMContentLoaded", () => {
  renderTradition(currentTraditionKey);
  generateLoomPattern();
  initThreadProbe();
});

function selectTradition(key, btnEl) {
  currentTraditionKey = key;
  resetWeaveProgress();

  document.querySelectorAll(".tradition-btn").forEach(b => b.classList.remove("active"));
  if (btnEl) {
    btnEl.classList.add("active");
  } else {
    const matching = Array.from(document.querySelectorAll(".tradition-btn")).find(b => 
      b.getAttribute("onclick") && b.getAttribute("onclick").includes(key)
    );
    if (matching) matching.classList.add("active");
  }

  renderTradition(key);
  generateLoomPattern();
}

function renderTradition(key) {
  const data = TRADITIONS[key];
  if (!data) return;

  document.getElementById("traditionTitle").innerText = data.title;
  document.getElementById("traditionOrigin").innerText = data.origin;
  document.getElementById("traditionSummary").innerText = data.summary;
  document.getElementById("traditionFiber").innerText = data.fiber;
  document.getElementById("traditionPigments").innerText = data.pigments;
  document.getElementById("traditionLoom").innerText = data.loom;
  document.getElementById("traditionSymmetry").innerText = data.symmetry;
  document.getElementById("traditionTotem").innerText = data.totem;
  document.getElementById("patternSpecId").innerText = data.caption;
  document.getElementById("loomBg").setAttribute("fill", data.bg);

  const swatchesEl = document.getElementById("paletteSwatches");
  swatchesEl.innerHTML = data.colors.map((c, i) => `
    <div class="swatch-box" style="background-color: ${c};" title="${data.pigmentNames[i]}"></div>
  `).join("");
}

function regeneratePattern() {
  const density = parseInt(document.getElementById("warpDensity").value, 10);
  document.getElementById("densityVal").innerText = `${density} x ${density}`;
  resetWeaveProgress();
  generateLoomPattern();
}

function randomizeLoomSeed() {
  currentSeed = Math.floor(Math.random() * 10000);
  resetWeaveProgress();
  generateLoomPattern();
}

// Algorithmic Weaving Pattern Synthesis
function generateLoomPattern() {
  const group = document.getElementById("loomPatternGroup");
  group.innerHTML = "";

  const density = parseInt(document.getElementById("warpDensity").value, 10);
  const data = TRADITIONS[currentTraditionKey];
  const colors = data.colors;
  const canvasSize = 640;
  const cellSize = canvasSize / density;

  // Max row rendered by simulator
  const maxRow = currentWeftRow > 0 ? currentWeftRow : density;

  if (currentTraditionKey === "tnalak") {
    // T'nalak: Stepped Dihedral Diamond Lattice
    for (let r = 0; r < maxRow; r++) {
      for (let c = 0; c < density; c++) {
        const cx = c * cellSize + cellSize / 2;
        const cy = r * cellSize + cellSize / 2;
        const dist = Math.abs(c - density / 2) + Math.abs(r - density / 2);
        const colorIndex = (dist + (currentSeed % 3)) % colors.length;

        // Diamond polygon with authentic ikat stepped edge
        const diamond = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        const s = cellSize * 0.48;
        diamond.setAttribute("points", `${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`);
        diamond.setAttribute("fill", colors[colorIndex]);
        diamond.setAttribute("stroke", colors[0]);
        diamond.setAttribute("stroke-width", "1");
        diamond.setAttribute("data-warp", c);
        diamond.setAttribute("data-weft", r);
        diamond.setAttribute("data-color", colors[colorIndex]);
        group.appendChild(diamond);

        // Core totem marker
        if (dist % 2 === 0) {
          const core = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          core.setAttribute("cx", cx);
          core.setAttribute("cy", cy);
          core.setAttribute("r", cellSize * 0.14);
          core.setAttribute("fill", colors[colors.length - 1]);
          core.setAttribute("data-warp", c);
          core.setAttribute("data-weft", r);
          group.appendChild(core);
        }
      }
    }
  } else if (currentTraditionKey === "yakan") {
    // Yakan: Fractal Stepped Rhombus & Cross Grid (Bunga-Sama)
    for (let r = 0; r < maxRow; r++) {
      for (let c = 0; c < density; c++) {
        const x = c * cellSize;
        const y = r * cellSize;
        const isEven = (r + c) % 2 === 0;
        const colorIndex = isEven ? 1 : 2;

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x + 1.5);
        rect.setAttribute("y", y + 1.5);
        rect.setAttribute("width", cellSize - 3);
        rect.setAttribute("height", cellSize - 3);
        rect.setAttribute("fill", colors[colorIndex]);
        rect.setAttribute("stroke", colors[colors.length - 1]);
        rect.setAttribute("stroke-width", "0.75");
        rect.setAttribute("data-warp", c);
        rect.setAttribute("data-weft", r);
        group.appendChild(rect);

        // Supplementary weft cross flower
        if (isEven) {
          const cross = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
          const m = cellSize / 2;
          cross.setAttribute("points", `
            ${x + m - 2},${y + 4} ${x + m + 2},${y + 4} 
            ${x + m + 2},${y + m - 2} ${x + cellSize - 4},${y + m - 2} 
            ${x + cellSize - 4},${y + m + 2} ${x + m + 2},${y + m + 2} 
            ${x + m + 2},${y + cellSize - 4} ${x + m - 2},${y + cellSize - 4} 
            ${x + m - 2},${y + m + 2} ${x + 4},${y + m + 2} 
            ${x + 4},${y + m - 2} ${x + m - 2},${y + m - 2}
          `);
          cross.setAttribute("fill", colors[3] || "#ffffff");
          cross.setAttribute("data-warp", c);
          cross.setAttribute("data-weft", r);
          group.appendChild(cross);
        }
      }
    }
  } else if (currentTraditionKey === "inaul") {
    // Inaul: Binaludtu Royal Herringbone Chevron Wave
    for (let r = 0; r < maxRow; r++) {
      const y = r * cellSize + cellSize / 2;
      const poly = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      let points = "";
      for (let c = 0; c <= density; c++) {
        const x = c * cellSize;
        const offset = (c % 2 === 0) ? -cellSize * 0.45 : cellSize * 0.45;
        points += `${x},${y + offset} `;
      }
      poly.setAttribute("points", points);
      poly.setAttribute("fill", "none");
      const cIdx = (r % (colors.length - 1)) + 1;
      poly.setAttribute("stroke", colors[cIdx]);
      poly.setAttribute("stroke-width", cellSize * 0.4);
      poly.setAttribute("stroke-linecap", "square");
      poly.setAttribute("data-weft", r);
      group.appendChild(poly);
    }
  } else if (currentTraditionKey === "maranao") {
    // Maranao: Longitudinal Lakit Bands with Okir Curvilinear Vines
    for (let c = 0; c < density; c++) {
      const x = c * cellSize;
      const isBand = (c % 4 === 1 || c % 4 === 2);

      const band = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      band.setAttribute("x", x + 1);
      band.setAttribute("y", 0);
      band.setAttribute("width", cellSize - 2);
      band.setAttribute("height", maxRow * cellSize);
      band.setAttribute("fill", isBand ? colors[1] : colors[0]);
      band.setAttribute("stroke", colors[2]);
      band.setAttribute("stroke-width", "0.5");
      band.setAttribute("data-warp", c);
      group.appendChild(band);

      if (isBand) {
        for (let r = 0; r < maxRow; r++) {
          const cy = r * cellSize + cellSize / 2;
          const leaf = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          leaf.setAttribute("cx", x + cellSize / 2);
          leaf.setAttribute("cy", cy);
          leaf.setAttribute("r", cellSize * 0.28);
          leaf.setAttribute("fill", colors[colors.length - 1]);
          leaf.setAttribute("data-warp", c);
          leaf.setAttribute("data-weft", r);
          group.appendChild(leaf);
        }
      }
    }
  }
}

// Backstrap Loom Weaving Simulator
function stepWeaveRow() {
  const density = parseInt(document.getElementById("warpDensity").value, 10);
  if (currentWeftRow >= density) {
    currentWeftRow = density;
    document.getElementById("loomStatusTxt").innerText = "Textile Complete // Full Tension";
    return;
  }

  currentWeftRow++;
  updateSimulatorUI(density);
  generateLoomPattern();
  animateShuttle(currentWeftRow, density);
}

function toggleAutoWeave() {
  const btn = document.getElementById("btnAutoWeave");
  const density = parseInt(document.getElementById("warpDensity").value, 10);

  if (autoWeaveInterval) {
    clearInterval(autoWeaveInterval);
    autoWeaveInterval = null;
    btn.innerText = "[ AUTO-WEAVE ]";
    btn.style.background = "";
    document.getElementById("loomStatusTxt").innerText = "Weaving Paused";
  } else {
    if (currentWeftRow >= density) currentWeftRow = 0;
    btn.innerText = "[ PAUSE WEAVE ]";
    btn.style.background = "#d4a73b";
    btn.style.color = "#0b0d10";
    document.getElementById("loomStatusTxt").innerText = "Shuttle Flying // Weft Beat Active";

    autoWeaveInterval = setInterval(() => {
      if (currentWeftRow < density) {
        stepWeaveRow();
      } else {
        clearInterval(autoWeaveInterval);
        autoWeaveInterval = null;
        btn.innerText = "[ AUTO-WEAVE ]";
        btn.style.background = "";
        btn.style.color = "";
      }
    }, 180);
  }
}

function resetWeaveProgress() {
  if (autoWeaveInterval) {
    clearInterval(autoWeaveInterval);
    autoWeaveInterval = null;
    const btn = document.getElementById("btnAutoWeave");
    if (btn) {
      btn.innerText = "[ AUTO-WEAVE ]";
      btn.style.background = "";
      btn.style.color = "";
    }
  }

  currentWeftRow = 0;
  const density = parseInt(document.getElementById("warpDensity").value, 10);
  updateSimulatorUI(density);
  document.getElementById("loomStatusTxt").innerText = "Heddle Shed Open // Ready";

  const shuttle = document.getElementById("shuttleLine");
  if (shuttle) shuttle.setAttribute("opacity", "0");

  generateLoomPattern();
}

function updateSimulatorUI(density) {
  const pct = Math.round((currentWeftRow / density) * 100);
  document.getElementById("simProgressFill").style.width = `${pct}%`;
  document.getElementById("weftCountTxt").innerText = `Weft Row: ${currentWeftRow} / ${density}`;
}

function animateShuttle(row, density) {
  const shuttle = document.getElementById("shuttleLine");
  if (!shuttle) return;
  const cellSize = 640 / density;
  const y = row * cellSize;

  shuttle.setAttribute("y1", y);
  shuttle.setAttribute("y2", y);
  shuttle.setAttribute("opacity", "1");

  setTimeout(() => {
    shuttle.setAttribute("opacity", "0");
  }, 160);
}

// Thread Inspection Probe
function initThreadProbe() {
  const svg = document.getElementById("loomSvg");
  const tooltip = document.getElementById("threadTooltip");
  if (!svg || !tooltip) return;

  svg.addEventListener("mousemove", (e) => {
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const density = parseInt(document.getElementById("warpDensity").value, 10);
    const cellSize = rect.width / density;

    const warpCol = Math.min(density, Math.max(1, Math.floor(x / cellSize) + 1));
    const weftRow = Math.min(density, Math.max(1, Math.floor(y / cellSize) + 1));

    const data = TRADITIONS[currentTraditionKey];

    tooltip.style.display = "block";
    tooltip.style.left = `${e.clientX - rect.left}px`;
    tooltip.style.top = `${e.clientY - rect.top}px`;
    tooltip.innerHTML = `
      <strong>Warp #${warpCol}</strong> // <strong>Weft #${weftRow}</strong><br>
      Fiber: <em>${data.fiber}</em><br>
      Organic Dye: <em>${data.pigmentNames[(warpCol + weftRow) % data.pigmentNames.length]}</em><br>
      Symmetry Coord: <strong>${data.symmetry}</strong>
    `;
  });

  svg.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });
}

// Vector SVG Export
function exportVectorSVG() {
  const svgEl = document.getElementById("loomSvg");
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svgEl);

  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
  const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = `hablon_${currentTraditionKey}_pattern.svg`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
}

// Weaving Draft Export (.JSON)
function exportWeavingDraft() {
  const density = parseInt(document.getElementById("warpDensity").value, 10);
  const data = TRADITIONS[currentTraditionKey];

  const draftSpec = {
    archive: "HABLON - Indigenous Mindanao Textile Geometry Archive",
    traditionKey: currentTraditionKey,
    title: data.title,
    provenance: data.origin,
    fiberSpecifications: data.fiber,
    pigmentRecipes: data.pigmentNames,
    loomType: data.loom,
    mathematicalSymmetry: data.symmetry,
    pointPaperDimensions: {
      warpEnds: density,
      weftPicks: density,
      totalInterlacements: density * density
    },
    exportTimestamp: new Date().toISOString()
  };

  const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(draftSpec, null, 2));
  const downloadLink = document.createElement("a");
  downloadLink.href = jsonStr;
  downloadLink.download = `hablon_${currentTraditionKey}_weaving_draft.json`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
}