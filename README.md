# Earthwalk — UNSW Kensington

An unofficial browser walking sandbox of UNSW's Kensington campus. Explore the campus outdoors in first person, find a building on the interactive map, and teleport to a landmark. The terrain now follows the public NSW 5 m elevation grid, with source-guided façades and mapped furniture.

## Latest visual update: Southern Drive / Gate 14 streetscape

The junction beside Barker Apartments now uses public UNSW GIS road, garden and lawn boundaries. A separate brick pedestrian refuge, zebra crossing, pale kerbs, curved twin-arm lamps, two green bins, a blue noticeboard and a yellow-bordered planted median follow July 2015 Street View. Herringbone paving is procedural; no source photo pixels are copied. Original OSM paths and NSW terrain samples remain intact. GIS supplies plan geometry, while fixture dimensions, fine levels, seasonal planting and inferred brick surfaces remain estimates. Two new map destinations reach the crossing and median. All 300 checks pass, including surface partition / triangulation and full path clearances; native browser checks cross the junction and climb / descend the adjacent Barker stair. The library now has 386 linked reference records; explicit building profiles remain 90 of 98. Campus fidelity is still ongoing.

## Previous visual update: Barker’s detached eastern wings

The two unnamed blocks beside Southern Drive now read as Barker apartment wings: red-brick bases, two yellow-brick upper window rows, pale corners, grey courses, red tiled hips, small roof caps and Barker Apartments lettering. The larger wing has a reconstructed external steel stair / access galleries; the lower footpath stays separate from the raised walking layers. Clipped hedge beds, brick aprons and a mature gum follow public photographs / aerial context. Original source footprints, paths, null storey tags and 9.6 m estimated maxima remain. Detailed roof, stair and landscape dimensions are estimates; the independent N13 compound GIS fields are not assigned to these smaller wings. 382 linked references, explicit appearance profiles for 90 of 98 original footprints and 295 checks document progress rather than completed campus fidelity.

## Previous visual update: B21 Repository and service yard

Three formerly generic blocks north of Chancellery now have separate forms: the Repository's dark gravel roof / six square vents, a lower sloping metal annex and a small eastern block with a shallow parapet. Pale service cladding, green roof edges, bounded asphalt hardstand and mature aerial-led trees replace the uniform 9.6 m blocks / grass. New map destinations reach each component. Official public GIS supplies B21 identity and a two-floor field, but no usable measured height; detailed component heights and screened elevations remain estimates. Source outlines, null OSM level tags, original estimates, terrain and paths remain separate from the reconstruction. 379 linked references and explicit profiles for 88 of 98 original footprints document progress rather than finished campus fidelity.

## Previous visual update: Morven Brown spiral stair

The Grad Shop stair is now an open, walkable reconstruction with white concrete treads, blue balusters, silver handrails, orange columns, a raised annular gallery and a glazed northern shop annex. Separate map destinations reach the stair foot, upper gallery and Basser approach. The 3.55 m gallery rise, 24 treads, radii and component levels are photo-fitted estimates. A bounded lower-passage grade resolves coarse NSW terrain beneath the structure; raw elevation samples, original source footprint, path coordinates and the original 9.6 m estimated maximum remain intact. Linked July 2015 Street View, aerial context and official Grad Shop location evidence are in the reference library. 375 references, 85 of 98 original footprints with explicit appearance profiles and 283 checks do not imply finished campus fidelity.

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

NIDA's original school now has six principal hipped teaching-room roofs with small glazed lanterns, separate street-side rooms, open courtyards, terrain-following covered galleries, planting, benches and a folded shade. The Anzac frontage has a low brick boundary and a photo-led mature tree row. The formerly unnamed western wing is searchable, alongside courtyard and gallery viewpoints; searching NIDA also finds the Parade Theatre. Original outlines / level tags and the 6.4 m estimated maxima remain separate from the fitted internal geometry. Regenerate with `node scripts/make-nida-school.mjs`.

H1 Army Hall now has photo-led pale walls, three closed roller doors, a continuous high window strip, a shallow corrugated gable roof, small ridge vents, asphalt with yellow door hatching and a yardarm pole. The main map destination remains on the mapped Western Campus Drive footway, with a separate game-only courtyard comparison viewpoint. The source six-point outline, two-level tag and 6.4 m estimated maximum remain; the university GIS height field is zero and is not treated as a measured height. Component dimensions, courtyard boundaries and unseen surfaces remain reconstructed.

The Library Lawn covered-walk network now has corrugated curved roofs, framed narrow glazing, two translucent crossing nodes, paired brown steel supports, ceiling fixtures, paving and Lawn-side benches. The concrete Library entrance canopy uses four mapped roof-network corners and renders once, replacing the previous overlapping wide / short approximation. Roof clearances and detailed canopy levels remain explicit visual estimates; the original roof outline, footways and NSW terrain remain. Added paving excludes original stair ribbons. Regenerate with `node scripts/make-library-walk.mjs`.

Mathews Pavilions E24 now has five separate roof regions with curved shells / narrow skylights, silver glazing, paired dark branching supports, a paved entrance and the retained tree courtyard. A large bark-textured tree, low pale planter, grey / lime benches, broad-leaf pots and simplified furniture behind the glazing follow public photographs, 2017 UNSW archive photography and January 2022 panoramas. Overall roof height is explicitly reconstructed rather than surveyed; source perimeter / courtyard / path coordinates remain. The lower western lightwells and fine stepped terrace fabric still need work. Regenerate with `node scripts/make-mathews-pavilions.mjs`.

New College L6 now opens its covered first-floor courtyard inside the retained mapped envelope: four white gallery rows, orange timber bridge, glazed common-room pavilion, striped paving, timber sitting platform and a framed translucent roof. Both exterior green-glass bays, recessed white ground colonnades and the five-tread Anzac entrance follow official photographs / the public tour and June 2023 Street View. The 15 m mapped height stays separate from university GIS fields; detailed dimensions are reconstructed. Regenerate with `node scripts/make-new-college-parts.mjs`.

Shalom College N9 now separates the stepped northern balcony wings, central western block, lower common-room / entrance wing and curved-roof Barker Street frontage. It has cream brick, brown balcony rails, exposed rafters, two fitted lightwell openings, an open northern garden, tree ferns, northern boulders, boundary walls and a closed southern gate. The 12 m mapped maximum and four-level tag remain separate from the university GIS fields. Fine levels, roof boundaries and plant positions remain approximate. Regenerate with `node scripts/make-shalom-parts.mjs`.

Warrane College M7 now has separate northern / southern residential wings, a taller glazed stair core, concrete podium and a genuinely open timber courtyard. Six photo-led upper window rows replace the earlier eight-row approximation. The entrance has sloping piers, a suspended glass canopy and twelve climbable treads; the court has a deck, pergola, planting and seating. The original 27 m / nine-level map evidence stays separate from university GIS and residential-use counts. Internal boundaries and detailed levels remain estimates. Regenerate with `node scripts/make-warrane-parts.mjs`.

The Bank F22 now has a searchable identity, brown brick, broad glazing, dark metal fascias, pale entrance steps and a walkable outdoor switchback ramp with silver double rails. The 6.4 m generic height estimate and two-level map tag remain independent from the university GIS 7.99 / three-floor fields. Fine dimensions, entrance orientation and levels remain reconstructed from a university exterior photograph.

Sam Cracknell Pavilion H8 now has an open curved viewing balcony, inset glazed upper room, pergola, yellow seating, painted brick, orange northern amenities screen and signed yellow panels. The reconstructed northern stair reaches its landing; the balcony has a separate map destination. Ground and balcony walking surfaces are selected by vertical layer so the lower seating area stays usable. Detailed dimensions / furniture remain estimates. Reproduce the parts with `node scripts/make-pavilion-parts.mjs`.

L5 at 223 Anzac Parade now has separate tall street / lower rear wings around a raised timber courtyard, deep concrete blades, recessed glazing, a broad climbable entrance stair, bamboo, seating and shade panels. The original 30 m map height and nine-level tag remain independent from builder component counts and university GIS fields. Internal boundaries and detailed dimensions remain reconstructed. Reproduce the parts with `node scripts/make-l5-parts.mjs`.

New College Postgraduate Village H3 now uses all three retained source outlines as one complex: a blue Anzac Parade glass screen, white / blue residential wings, low red northern common-room block, roof pergola and central lawn. Its approximate council context height is distinguished from OSM level tags and independent university GIS fields. Detailed façade dimensions, foundation / courtyard levels and planting remain reconstructed. Regenerate geometry with `node scripts/make-ncpv-parts.mjs`; regenerate the independent public attribute snapshot with `node scripts/make-unsw-gis-evidence.mjs`.

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
- `dist/visual-data.js` records appearance profiles and 371 visual/data sources, including Google Street View references and architect galleries. `dist/references.html` is the browsable source index.
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
