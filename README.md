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

Goldstein’s sculpture court now includes the mapped six-figure bronze, a planar reflecting pool, three climbable entry treads, paving, benches, a shade tree and stair-side walls. UNSW’s catalogue supplies the sculpture’s overall size; detailed silhouettes and landscape dimensions remain reconstructed from TKD photographs. Reproduce the clipped court with `node scripts/make-goldstein-courtyard.mjs`. The official Three.js r180 `Reflector` example is included under the existing MIT licence and updates only near the pool.

University Terraces B8 now has two residential wings, an open internal court, orange balcony dividers / silver rails, pale end louvres, a lower northern link and glazed retail beneath raised planted decks. The original east-west footway remains walkable beneath both wings. `dist/terraces-data.js` distinguishes the public context roof RL from reconstructed component dimensions; `node scripts/make-terraces-parts.mjs` reproduces the masses, exposed façades and clipped paving. Source outlines and level tags remain intact, with a separate reconstructed hole displayed on the maps.

The latest UNSW Village pass separates pale balcony bands / grey sliding panels, charcoal tower ends, white and yellow core bays, and dense timber screens with recessed glazing. Only exposed vertical spans are drawn; the existing stepped masses, courtyard holes and four mapped passages stay intact. The Gate 2 security frontage and two exterior map viewpoints follow public architect photos / historical Street View, cross-checked against current university location information. `dist/village-data.js` records reconstructed dimensions; regenerate exposed surfaces with `node scripts/make-village-facades.mjs`. The map now reports the same 25.6 m estimated main-wing height as the renderer, retaining the previous 22.4 m estimate, seven mapped levels and separate eight-storey architect description.

- `dist/campus-data.js` contains the mapped campus layout: real building footprints, paths, landmark names, and source notes. Coordinates are projected into local metres.
- `dist/game.js` builds the Three.js scene and handles first-person movement, collision and rendering.
- `dist/app.js` connects the interface, building search, interactive map and teleport controls.
- `dist/terrain.js` and `dist/elevation-data.js` provide the measured terrain and consistent height sampling for meshes, buildings and walking.
- `dist/squarehouse-data.js` and generated `squarehouse-parts.js` reconstruct E4’s pale brick piers, concrete frame, narrow windows, projecting balcony, terrace rails, shade awnings and planters. A 22-tread exterior stair reaches the 3.6 m terrace above an open north / east colonnade; the Anzac-side workshop stays enclosed. The 12 m mapped maximum and four-level tag remain, while detailed dimensions and the additional lower footprint are explicitly reconstructed. Regenerate with `node scripts/make-squarehouse-parts.mjs`.
- `dist/red-centre-data.js` and generated `red-centre-parts.js` reconstruct the Anita B. Lawrence Centre (formerly Red Centre): twin-slot terracotta screens, recessed glass gallery, metal end fins, stepped roofs and grouped ventilation shafts. Three complete mapped routes now pass beneath the building. The source 40 m maximum and nine-level tags remain; the 30 m screen and 34.5 m body roof are photo-led estimates. Procedural trees are omitted from the photographed open forecourt while source trees remain eligible. Regenerate the partitions with `node scripts/make-red-centre-parts.mjs`.
- `dist/old-main-data.js` supplies K15’s four photo-led window bands and two climbable entrance flights. The custom brick exterior adds pale multi-light frames, a dark roof edge, stone entry bay, handrails and a simplified procedural Falconer relief. The original 24 m height and six-level map tag remain separate from the official four-storey description. Northern links and detailed planting remain incomplete.
- `dist/business-data.js` separates E12’s northern horizontal sunshades, southern deep grid, white west end and brick east end. The custom exterior adds a blue glazed bay, a glass awning, a deep sloping entrance canopy, seven climbable treads and two forecourt benches. Mapped 32 m / eight-level evidence remains independent of the architect’s six-storey account and photographed window bands. Treads use bounded walking patches so the neighbouring 4 m footpath stays level.
- `dist/law-data.js` supplies F8’s folded roof and separate Mall / Union Road / side façades. The custom exterior uses smooth gold and silver metal, deep charcoal spandrels, reflective library glazing and angled piers. The mapped 15 m maximum and five-level tag remain; the architect’s four-level account is separate evidence. New exterior map viewpoints make the northern and western faces easy to inspect. Detailed folds and panel sizes remain reconstructed.
- `dist/quadrangle-data.js` and its generated parts reconstruct E15’s courtyard galleries, central sundial tower and three covered passages. The 27 m tower is a photograph-led estimate above the court; the original 15 m / five-level map tags remain as evidence. Basser Steps now have four curved canopy leaves and terrain cuts confined to the mapped stair ribbons. Regenerate with `node scripts/make-quadrangle-parts.mjs` and `node scripts/make-basser-ground.mjs`.
- `dist/electrical-landscape.js` adds the plan-led outdoor classroom beside Rex Vowels: concrete bleachers, timber seating, planting, eighteen climbable treads and a transition to College Road. The same local profile drives rendering, walking and map elevations. Raw DEM data remains unchanged; generated triangle cuts preserve the surrounding terrain. G17’s southern paved apron, low planted edge and glazed balustrade also follow public plans and built photos. Reproduce derived geometry with `node scripts/make-electrical-landscape.mjs`.
- `dist/electrical-data.js` separates G17’s retained T-shaped footprint, photo-led brick cores and folded plant screens. Public Hassell elevations supply parapet RL 57.141 m, plant RL 63.711 m and maximum mast RL 69.50 m; the derived maximum retains the original 24 m / eight-level map tags. Detailed façade and rooftop positions remain reconstructed.
- `dist/small-buildings-data.js` supplies Rex Vowels Theatre’s shallow roof, its separately mapped open link to G17, and SDN Kensington’s low entry wing, hall, verandah and garden. Old generic 9.6 m estimates remain as provenance; revised heights are explicitly photo-led estimates. The former House at Pooh Corner name remains searchable after the documented 2025 rename.
- `dist/barker-apartments-data.js` and its generated parts split the existing N13 footprint around the retained Gate 15 footways, opening two covered links. Yellow / red brick, angular roofs and black balconies follow existing photographs. `dist/vallentine-data.js` supplies H22’s wave canopy, diamond cladding and climbable red stair. Both retain their 12 m mapped heights; detailed roof, façade and access dimensions are reconstructed.
- `dist/parking-data.js` reconstructs the existing N18 split-level parking decks from public Architectus elevations and renders H25 with photo-led open decks and a pale screen grid. N18 screen RL 47.64 m is converted using DEM ground; H25 remains an estimated 12.8 m with a retained four-level map tag and separate six-deck photographic evidence. Both garages are exterior models; future expansion and current vehicle access are not inferred from old photos.
- `dist/visual-data.js` records appearance profiles and 259 visual/data sources, including Google Street View references and architect galleries. `dist/references.html` is the browsable source index.
- `dist/science-precinct-data.js` separates D8 podium / lift and science-building parapet / plant / flue levels, with reconstructed terrace treads and glazed links.
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
