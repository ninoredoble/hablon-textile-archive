// HABLON — Indigenous Mindanao Textile Generative Geometry Engine
// Algorithms derived from traditional backstrap mathematical permutations

const TRADITIONS = {
  "tnalak": {
    title: "T'nalak Sacred Abaca Tapestry",
    origin: "Lake Sebu, South Cotabato • T'boli Dreamweavers",
    summary: "Woven from fine abaca fibers conditioned with beeswax and dyed using natural boiled roots and bark. Traditionally known as 'woven dreams' bestowed by Fu Dalu, the spirit of abaca. The motifs embody non-repeating symmetry and rhythmic geometric permutations.",
    fiber: "Musa textilis (Wild Abaca)",
    pigments: "Locust tree bark (Black), Ginger root (Red), Natural ecru",
    loom: "Backstrap Tension Loom",
    symmetry: "D4 Dihedral Diamond Group",
    caption: "FIG. 04-A • T'NALAK DIAMOND LATTICE MATRIX",
    bg: "#161514",
    colors: ["#161514", "#8c2f1f", "#e6ded1"]
  },
  "yakan": {
    title: "Seputangan Square Tapestry",
    origin: "Lamitan, Basilan • Yakan Weaving Guild",
    summary: "The most intricate textile in the Philippine archipelago. Utilizing supplementary weft techniques on backstrap looms, Yakan weavers construct fractal diamonds, pythons (bubu), and bamboo flower motifs through strict mental arithmetic with zero written guides.",
    fiber: "Handspun Cotton & Mercerized Thread",
    pigments: "Indigofera (Deep Blue), Turmeric (Gold), Annatto (Terra)",
    loom: "Five-Harness Backstrap Loom",
    symmetry: "P4m Wallpaper Group (Fractal Stepped Rhombus)",
    caption: "FIG. 04-B • SEPUTANGAN STEPPED DIAMOND HIERARCHY",
    bg: "#1a1e24",
    colors: ["#1a1e24", "#d9822b", "#1f6e8c", "#eae2cf"]
  },
  "inaul": {
    title: "Inaul Royal Heirloom Weave",
    origin: "Sultan Kudarat & Maguindanao • Bangsamoro Artisans",
    summary: "Woven by royal Maguindanao lineages symbolizing noble status and bravery. The 'Binaludtu' (rainbow) and 'Karanda' (geometric vessel) patterns interlock metallic lurex threads with silk in sharp zig-zags and checkerboard chevron vectors.",
    fiber: "Raw Mulberry Silk & Metallic Thread",
    pigments: "Plant bark tannins (Deep Emerald, Royal Crimson, Gold)",
    loom: "Foot-Pedal Reed Floor Loom",
    symmetry: "Pm Chevron & Alternating Zig-zag Grid",
    caption: "FIG. 04-C • BINALUDTU ROYAL CHEVRON WAVE",
    bg: "#0d1a15",
    colors: ["#0d1a15", "#c29b38", "#8b1e2c", "#f3edd8"]
  },
  "maranao": {
    title: "Landap & Okir Vector Scroll",
    origin: "Marawi City & Lake Lanao • Maranao Cultural Masters",
    summary: "Distinguished by the flowing curvilinear Okir motifs (Okir a Dato and Okir a Bay). Contrasting continuous vertical panels (lakit) with horizontal geometry, honoring geometric precision without figurative representation.",
    fiber: "Fine Cotton & Raw Tussar Silk",
    pigments: "Sappanwood (Violet), Turmeric (Sunburst Yellow), Black Carbon",
    loom: "Indigenous Framed Backstrap Loom",
    symmetry: "C2 Curvilinear Scroll Permutation",
    caption: "FIG. 04-D • LAKIT LONGITUDINAL VECTOR BAND",
    bg: "#1c1421",
    colors: ["#1c1421", "#94385a", "#d4a73b", "#ede4d1"]
  }
};

let currentTraditionKey = "tnalak";
let currentSeed = 42;

document.addEventListener("DOMContentLoaded", () => {
  renderTradition(currentTraditionKey);
  generateLoomPattern();
});

function selectTradition(key, btnEl) {
  currentTraditionKey = key;

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
  document.getElementById("patternSpecId").innerText = data.caption;
  document.getElementById("loomBg").setAttribute("fill", data.bg);

  const swatchesEl = document.getElementById("paletteSwatches");
  swatchesEl.innerHTML = data.colors.map(c => `
    <div class="swatch-box" style="background-color: ${c};"></div>
  `).join("");
}

function regeneratePattern() {
  const density = parseInt(document.getElementById("warpDensity").value, 10);
  document.getElementById("densityVal").innerText = `${density} x ${density}`;
  generateLoomPattern();
}

function randomizeLoomSeed() {
  currentSeed = Math.floor(Math.random() * 10000);
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

  if (currentTraditionKey === "tnalak") {
    // T'nalak: Stepped Dihedral Diamond Lattice
    for (let r = 0; r < density; r++) {
      for (let c = 0; c < density; c++) {
        const cx = c * cellSize + cellSize / 2;
        const cy = r * cellSize + cellSize / 2;
        const dist = Math.abs(c - density / 2) + Math.abs(r - density / 2);
        const colorIndex = (dist + (currentSeed % 3)) % colors.length;

        // Concentric diamonds
        const diamond = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        const s = cellSize * 0.45;
        diamond.setAttribute("points", `${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`);
        diamond.setAttribute("fill", colors[colorIndex]);
        diamond.setAttribute("stroke", colors[0]);
        diamond.setAttribute("stroke-width", "1");
        group.appendChild(diamond);

        // Core dot
        if (dist % 2 === 0) {
          const core = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          core.setAttribute("cx", cx);
          core.setAttribute("cy", cy);
          core.setAttribute("r", cellSize * 0.12);
          core.setAttribute("fill", colors[colors.length - 1]);
          group.appendChild(core);
        }
      }
    }
  } else if (currentTraditionKey === "yakan") {
    // Yakan: Fractal Stepped Rhombus & Cross Grid
    for (let r = 0; r < density; r++) {
      for (let c = 0; c < density; c++) {
        const x = c * cellSize;
        const y = r * cellSize;
        const isEven = (r + c) % 2 === 0;
        const colorIndex = isEven ? 1 : 2;

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x + 2);
        rect.setAttribute("y", y + 2);
        rect.setAttribute("width", cellSize - 4);
        rect.setAttribute("height", cellSize - 4);
        rect.setAttribute("fill", colors[colorIndex]);
        rect.setAttribute("stroke", colors[colors.length - 1]);
        rect.setAttribute("stroke-width", "0.75");
        group.appendChild(rect);

        // Inner cross
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
          group.appendChild(cross);
        }
      }
    }
  } else if (currentTraditionKey === "inaul") {
    // Inaul: Royal Chevron Wave
    for (let r = 0; r < density; r++) {
      const y = r * cellSize;
      const poly = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      let points = "";
      for (let c = 0; c <= density; c++) {
        const x = c * cellSize;
        const offset = (c % 2 === 0) ? -cellSize * 0.4 : cellSize * 0.4;
        points += `${x},${y + offset} `;
      }
      poly.setAttribute("points", points);
      poly.setAttribute("fill", "none");
      poly.setAttribute("stroke", colors[(r % (colors.length - 1)) + 1]);
      poly.setAttribute("stroke-width", cellSize * 0.35);
      poly.setAttribute("stroke-linecap", "square");
      group.appendChild(poly);
    }
  } else if (currentTraditionKey === "maranao") {
    // Maranao: Longitudinal Lakit Bands with Curvilinear Accents
    for (let c = 0; c < density; c++) {
      const x = c * cellSize;
      const isBand = c % 3 === 0;

      const band = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      band.setAttribute("x", x + 1);
      band.setAttribute("y", 0);
      band.setAttribute("width", cellSize - 2);
      band.setAttribute("height", canvasSize);
      band.setAttribute("fill", isBand ? colors[1] : colors[0]);
      band.setAttribute("stroke", colors[2]);
      band.setAttribute("stroke-width", "0.5");
      group.appendChild(band);

      if (isBand) {
        for (let r = 0; r < density; r++) {
          const cy = r * cellSize + cellSize / 2;
          const leaf = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          leaf.setAttribute("cx", x + cellSize / 2);
          leaf.setAttribute("cy", cy);
          leaf.setAttribute("r", cellSize * 0.25);
          leaf.setAttribute("fill", colors[colors.length - 1]);
          group.appendChild(leaf);
        }
      }
    }
  }
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
  document.body.removeChild(downloadLink);
}
