# HABLON: Indigenous Mindanao Textile Geometry & Vector Loom Archive

> **Open-Access Digital Museum & Generative Backstrap Weaving Simulator**  
> An interactive algorithmic archive exploring the sacred mathematical permutations, botanical dye chemistry, and tension loom structures of indigenous Mindanao weaving traditions -- from Lake Sebu to Basilan and the Bangsamoro region.

---

## Overview

Mindanao's indigenous textile heritage preserves complex geometric knowledge passed down across centuries through strict mental arithmetic and oral tradition. **HABLON** models these cultural textiles as dynamic vector algorithms, mapping authentic warp-and-weft interlacements, dihedral symmetries, and supplementary weft structures.

Built without external dependencies, HABLON provides textile historians, cultural researchers, and digital fabricators with an interactive workstation to simulate the step-by-step passage of the backstrap shuttle, inspect thread tension and botanical pigment recipes, and export production-ready vector patterns and weaving draft specifications.

---

## Documented Weaving Traditions

### 1. T'nalak // T'boli (Lake Sebu, South Cotabato)
- **Cultural Provenance**: Sacred abaca tapestries bestowed in dreams by *Fu Dalu*, the spirit of abaca. Woven exclusively by master T'boli dreamweavers on backstrap tension looms (*ikatan*).
- **Material Science**: Wild *Musa textilis* abaca fibers softened with beeswax and dyed over months with *K'nalum* tree bark (black) and boiled *Lokob* roots (red).
- **Mathematical Symmetry**: **D4 Dihedral Diamond Group** -- stepped diamond lattices embedding *G'mayaw* (sacred hawk) and *Kleng* (crab) totemic silhouettes.

### 2. Seputangan // Yakan (Lamitan, Basilan)
- **Cultural Provenance**: Worn as an intricate headcloth or waistband during royal ceremonies. Regarded as the most mathematically complex textile in the Philippine archipelago.
- **Material Science**: Handspun cotton and mercerized yarns colored with fermented *Indigofera tinctoria*, turmeric rhizomes, and annatto.
- **Mathematical Symmetry**: **P4m Wallpaper Group** -- nested stepped rhombi with fourfold reflection and rotation, featuring *Bunga-Sama* (python skin / diamond cross flowers).

### 3. Inaul // Maguindanao (Sultan Kudarat & Cotabato)
- **Cultural Provenance**: Royal heritage weave of Maguindanao sultans symbolizing nobility, dignity (*maratabat*), and martial bravery.
- **Material Science**: Fine mulberry silk interlocked with metallic gold lurex threads on foot-pedal reed floor looms.
- **Mathematical Symmetry**: **Pm Chevron Group** -- alternating *Binaludtu* (royal rainbow wave) herringbone zig-zag grids and interlocking diamond vessels (*Karanda*).

### 4. Landap & Okir // Maranao (Lake Lanao, Marawi)
- **Cultural Provenance**: Celebrated tube skirts (*malong*) of Maranao nobility. Features stark longitudinal color blocks contrasted with intricate curvilinear scrolls.
- **Material Science**: Fine cotton and raw tussar silk dyed with sappanwood, sunburst turmeric, and carbon lampblack.
- **Mathematical Symmetry**: **C2 Curvilinear Scroll Permutation** -- vertical *Lakit* panels accented with spiral *Okir a Dato* vine motifs and *Pako Rabong* (fern fronds).

---

## Interactive Capabilities

1. **Backstrap Loom Weaving Simulator**:
   - Step through individual weft picks with real-time shuttle animation.
   - Run the automatic weaver to watch the complete tapestry materialize row by row.
   - Adjust warp and weft grid densities from 8x8 up to 24x24 ends.
2. **Interactive Thread Inspection Probe**:
   - Hover over any thread intersection to display exact warp and weft coordinates, botanical pigment source, fiber composition, and symmetry classification.
3. **Dual Export System**:
   - **Vector Pattern (.SVG)**: Generates scale 1:1 crisp vector geometry suitable for CAD and laser cutting.
   - **Weaving Draft Spec (.JSON)**: Exports point-paper dimensions, thread counts, and cultural provenance metadata.

---

## Technical Specifications

- **Stack**: Vanilla HTML5, SVG DOM Manipulation, Vanilla ES6+ JavaScript, Pure CSS3.
- **Typography**: Museum serif (`Cinzel`), readable body sans (`Inter`), and technical monospace (`JetBrains Mono`).
- **Character Encoding**: 100% 7-bit clean ASCII (zero mojibake / multi-byte UTF-8 errors).

---

## Running Locally

```bash
# Clone the repository
git clone https://github.com/ninoredoble/hablon-textile-archive.git

# Navigate into directory
cd hablon-textile-archive

# Open index.html in any modern browser
# (Windows)
start index.html

# (macOS)
open index.html

# (Linux)
xdg-open index.html
```

---

## Ethical Cultural Acknowledgment

This project models geometric and algorithmic principles for educational, cultural preservation, and open-access research purposes. Intellectual and cultural ownership of T'nalak, Seputangan, Inaul, and Landap patterns belongs eternally to the T'boli, Yakan, Maguindanaon, and Maranao indigenous nations.