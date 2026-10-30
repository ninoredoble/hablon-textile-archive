# Hablon

An interactive browser study of a shaft loom. Pick one of four cloths inspired by Mindanao weaving traditions, work the loom, and download what you weave as an SVG.

It is a static page: HTML, CSS and plain JavaScript, no build step, no server, no code dependencies. The only outside request is the Newsreader web font, loaded from Google Fonts. It is a study, not a production system, an app, or a museum collection.

## What it does

- **Weaves by the real rules of a shaft loom.** Each crossing of the cloth is decided by the *threading* (which shaft each warp end is on), the *tie-up* (which shafts each treadle lifts) and the *treadling* (the order the treadles are pressed). Lifted warp ends show on top; lowered ends let the weft show.
- **You drive it.** Press a treadle to weave one pick with it, or let the loom follow the pattern for the chosen cloth. Click the tie-up squares to change which shafts a treadle lifts; picks already woven keep the shed they were woven with. Number keys 1 to 8 press the treadles.
- **Inspect any thread.** Hover, tap, or use the arrow keys on the cloth to read which shaft, which treadle, which colour.
- **Exports.** `Download SVG` writes the cloth you wove, thread by thread, as a standalone SVG with a title and description. `Download the draft (JSON)` writes the threading, the current tie-up, the treadling, and a liftplan of the shafts each woven pick actually lifted.

## The four cloths

| Cloth | Made by | Structure used in the study |
| --- | --- | --- |
| T'nalak | The T'boli, Lake Sebu | Warp-faced plain weave on 2 shafts, pattern dyed into the warp (ikat), with the feathered edges ikat gives |
| Seputangan | The Yakan, Basilan | Plain weave ground on 2 shafts, supplementary pattern weft laid in as a nested diamond |
| Inaul | The Maguindanaon, Cotabato region | Pointed 4/4 twill on 8 shafts, crimson warp against gold weft |
| Landap | The Maranao, Lake Lanao | Warp-faced plain weave on 2 shafts, striped warp, supplementary weft in a pair of mirrored scrolls |

## What it is not

- **Not a record of real textiles.** The motifs are my own sketches in the manner of each tradition. None is a documented design, and none has been matched to a particular weaver's cloth. The structures were chosen to show how a loom works, not copied from named cloths.
- **Not reviewed by weavers or cultural bearers.** The short notes on each tradition come from general public knowledge and may be incomplete or wrong. Corrections are welcome as an issue.
- **Not a source of authentic patterns.** The SVG exports are for study and play. Please learn from and buy from the weaving communities themselves.
- **Not the loom these communities use.** The treadled shaft loom is a teaching device. The traditional cloths are woven by their communities on backstrap and other looms.
- **No data.** Nothing you weave is stored or sent, and nothing is measured or sampled; there are no sensors, accounts or backend. The page does load its web font from Google Fonts. The colours are illustrative.

The name is a general Philippine word for handwoven cloth (Hiligaynon), used here as a plain title. The traditions are from Mindanao.

## Design

A quiet catalogue page set in Newsreader (Google Fonts), with a fixed loom plate beside a reading column. The ground is a flat museum-wall grey; the cloths bring all the colour. Motion is limited to the weaving sweep and a soft fade-in of sections, and both are off under `prefers-reduced-motion`. The layout holds from a phone width to a wide desktop without horizontal scroll.

## Run it

Open `index.html` in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 8000
```

It deploys unchanged on GitHub Pages.

## Files

- `index.html`: the page and its copy
- `styles.css`: layout, type and colour
- `app.js`: the loom engine, cloth definitions, rendering, probe and exports
