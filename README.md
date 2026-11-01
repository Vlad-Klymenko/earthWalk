# Earthwalk — UNSW Kensington

An unofficial browser walking sandbox of UNSW's Kensington campus. Explore the campus outdoors in first person, find a building on the interactive map, and teleport to a landmark. The terrain now follows the public NSW 5 m elevation grid, with source-guided façades and mapped furniture.

## Deployment

GitHub Pages is the primary public demo. The user requests publication after every meaningful change. The workflow in `.github/workflows/pages.yml` installs the locked dependencies, regenerates references / asset versions, checks JavaScript, runs the campus tests and deploys `dist/` whenever `main` is pushed. It also supports manual dispatch. Live demo: [vlad-klymenko.github.io/earthWalk](https://vlad-klymenko.github.io/earthWalk/). Source: [Vlad-Klymenko/earthWalk](https://github.com/Vlad-Klymenko/earthWalk).

## Run locally

Requires Node.js and npm. From this directory:

```sh
npm install
npm run dev
```

Open [http://localhost:4173](http://localhost:4173) in a desktop browser with WebGL support. Keep the terminal running. Set `PORT` to use another port. The browser's JavaScript modules need the local server; opening the HTML file directly will not work.

Three.js **0.180.0** is served locally from `dist/vendor/`; the scene does not need a Google Maps API key.

Before publication, run `npm run prepare:site` to regenerate the reference index and version the complete JavaScript import graph / stylesheet. This prevents stale browser modules from hiding newly deployed model changes. The script is deterministic and can be run repeatedly.

## Controls

| Action | Control |
| --- | --- |
| Walk | WASD or arrow keys |
| Sprint | Hold Shift |
| Jump | Space |
| Look around | Click the scene to capture the mouse, or drag to look |
| Release mouse | Esc |
| Reset position | R |
| Find a building | Use the map's search field |
| Teleport | Select a map landmark or destination |

## Implementation

- `dist/campus-data.js` contains the mapped campus layout: real building footprints, paths, landmark names, and source notes. Coordinates are projected into local metres.
- `dist/game.js` builds the Three.js scene and handles first-person movement, collision and rendering.
- `dist/app.js` connects the interface, building search, interactive map and teleport controls.
- `dist/terrain.js` and `dist/elevation-data.js` provide the measured terrain and consistent height sampling for meshes, buildings and walking.
- `dist/visual-data.js` records appearance profiles and 137 visual/data sources, including Google Street View references and architect galleries. `dist/references.html` is the browsable source index.
- `dist/architecture-data.js` holds photo-led NIDA roof / theatre geometry and New College roof sections, with reconstructed dimensions distinguished from mapped heights.
- `dist/modernism-data.js` holds the Science Theatre roof / canopy frame and shares its terrain clearance calculation with tests. Dalton and Robert Webster use photo-led façades; Webster captures a static local campus reflection at load and after lighting changes.
- `dist/lecture-precinct-data.js` records Civil Engineering’s eight upper façade rows / rooftop plant and Patricia O’Shane’s exterior stair / gallery. Source heights and outlines remain; terrace dimensions are reconstructed.
- `dist/eastern-faculty-data.js` records reconstructed Samuels glasshouse / screens and Goodsell canopy / courtyard foundation. The 28 m / seven-level and 15 m / six-level map tags remain. Goodsell’s height is placed above the entrance, with lower masonry extending down the DEM slope; that reference choice is disclosed as reconstruction.
- `dist/medical-data.js` separates Wallace Wurth’s planning parapet, plant and flue levels, and Lowy’s retained 32 m mapped height. `dist/medical-parts.js` partitions their mapped outlines; the atrium enclosure, raised sections, columns and façade spacing are reconstructed from public plans and photographs. Regenerate partitions with `node scripts/make-medical-parts.mjs`.
- `dist/heritage-data.js` records explicitly estimated heritage roofs, the White House exterior stair and reconstructed mature fig trees.
- `dist/building-parts.js` retains five actual library part outlines. `dist/campus-details.js` retains 95 mapped furniture positions.
- `dist/chemical-parts.js` partitions the original F10 footprint into a tower and lower wings. The original 45 m tag is retained for comparison. Its approximate parapet RL of 75.6 m comes from a public 2016 planning drawing; the model derives a ground-relative parapet height using the NSW DEM, assuming compatible datums. The split, 15 m lower wings and roof services are estimates. Reproduce it with `node scripts/make-chemical-parts.mjs`. `dist/structure-data.js` supplies outward-facing rail and pipe surfaces.
- `dist/nida-parts.js` retains three actual OSM upper-part outlines and 17 / 19 m height tags. `dist/residential-parts.js` partitions the original Village outlines into explicitly estimated masses and mapped through-passages. Reproduce them with `node scripts/make-residential-parts.mjs`; the clipping utility runs only during data preparation, not in the browser.
- `dist/campus-enhancements.js` identifies the previously unnamed Scientia wing/canopy outlines without replacing their mapped footprints.
- `server.mjs` serves `dist/` locally. There is no build step.

## Accuracy and credits

The layout uses OpenStreetMap geometry, with landmark names checked against the [official UNSW Kensington campus map](https://www.unsw.edu.au/content/dam/pdfs/estate-management/general/2025-04-estate-management/2025-04-Kensington-Campus-Map_2.pdf). Terrain uses the [public NSW 5 m elevation service](https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_5M_Elevation/ImageServer), retained as a float GeoTIFF with provenance and unit tests. Ground elevation is separate from building height. A public NSW B22 planning assessment (June 2020, printed p. 22 / PDF p. 28) reports Library height as 57.74 m and Mathews as 54 m; these supersede their 60 m OSM tags, which are retained for comparison. Other buildings use explicit OSM height tags where available. Estimated heights, façades, vegetation and stair dimensions remain approximations. Building cards link to the height report when used. Goldstein Dining Hall shows both its conflicting 20 m map tag and the 12 m photograph-led model estimate. This recreation covers campus exteriors; it does not reproduce interiors or guarantee current construction, access restrictions or landscaping. It is an independent project, unaffiliated with UNSW. See [the ongoing fidelity audit](docs/visual-fidelity.md) for remaining work.

Elevation data: © State of New South Wales (Spatial Services, a business unit of the Department of Customer Service NSW), extracted 2 November 2026. For current information go to [spatial.nsw.gov.au](https://www.spatial.nsw.gov.au). The source raster was resampled and interpolated for this recreation; [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Map data **© [OpenStreetMap contributors](https://www.openstreetmap.org/copyright)**, available under the [Open Database License 1.0](https://opendatacommons.org/licenses/odbl/1-0/). The OSM-derived layout data retains that license. See `CAMPUS.sources` and `CAMPUS.notes` in `dist/campus-data.js` for dataset provenance.

Architectural references informed the simplified landmark shapes:

- [Roundhouse — Tonkin Zulaikha Greer](https://tzg.com.au/project/unsw-roundhouse/): circular form, glazing and balcony.
- [Law Building — Lyons](https://www.lyonsarch.com.au/project/faculty-of-law-university-of-nsw/): angular four-level building.
- [Red Centre — FJC Studio](https://fjcstudio.com/projects/red-centre-2/): terracotta screen wall and recessed glass volumes.
- [Business School — lahznimmo](https://www.lahznimmo.com/australian-school-of-business-unsw): six-storey refurbished Heffron Building.
- [Village Green — UNSW](https://www.unsw.edu.au/estate/campus-development/projects/village-green-redevelopment): sports pitch, track and landscape.

Reference photographs were used for visual research only. No copied photographs or Google satellite imagery are included as scene assets. Three.js is distributed under its [MIT license](https://github.com/mrdoob/three.js/blob/r180/LICENSE).

The Kensington Colleges courtyard is available in the map search. Its public Street View location anchors a photo-led reconstruction of five college façades, roof details and planted courtyard edges. Added landscape dimensions and façade spacing are approximations; the mapped garden boundary is preserved.

Village Green sports geometry is reproduced with `node scripts/make-sports-data.mjs`. The track trace, pitch and surrounding sports areas come from retained OSM data. The Moya Dodd Grandstand is an open model with three canopy leaves, seats, walkable aisles and a reconstructed rear earth bank. Stadium details, sports markings and equipment dimensions are estimates guided by Sam Crawford Architects photographs; the underlying field orientation and sports-area outlines are mapped geometry.
