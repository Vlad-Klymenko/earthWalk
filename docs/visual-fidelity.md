# Campus visual realism — ongoing work

The goal remains a detailed, recognizable recreation of the entire main Kensington campus. This pass does not establish photorealistic accuracy for the whole campus.

## Evidence added

- Public NSW 5 m elevation raster retained at dist/data/unsw-elevation.tif with SHA-256 provenance. Base terrain sampling and foundations use metres in the same coordinate frame. Photo-led landscape additions use explicitly reconstructed dimensions.
- Lower University Mall sample: about 27.6 m; library forecourt: about 52.5 m. Full raster values span 20.2–65.3 m, including surrounding streets.
- 50/98 campus footprints have an explicit OSM height tag. Two now use stronger public planning evidence instead: Library 57.74 m and Mathews 54 m (NSW B22 assessment, June 2020, printed p. 22 / PDF p. 28). Both OSM tags said 60 m; those conflicting values are retained as mappedHeight. NIDA / Parade Theatre now uses the maximum 19 m mapped building-part tag rather than its old 12 m overall tag, retained separately. Goldstein Dining Hall retains a conflicting 20 m map tag while its model uses a clearly labelled 12 m photograph-led estimate. F10 now uses a derived parapet height from an approximate public planning RL, with its original 45 m tag retained. Clancy retains its old 8 m tag while using a scaled-section 14.5 m model estimate. The remaining 44 parent height tags are used unchanged; 50 footprints use estimates. Mapped building-part heights also remain community data, not a survey guarantee. Building cards identify the source category and link to its public source when used.
- Five actual library building-part outlines separate the tower and lower podium. Tower maximum uses the report's 57.74 m figure; lower parts estimate height from mapped levels.
- 48 campus footprints have a specific source-linked appearance profile, within 98 visual/data references. This includes the existing custom Roundhouse and Scientia models, now correctly registered in the profile audit. Some additional buildings use type-based appearance rather than building-specific research.
- Two Google Street View headings at University Mall were visually inspected, alongside Google Images and original architect/university galleries. Photographs are linked as research references, not redistributed as game textures.
- 95 OSM furniture positions are retained; object designs remain approximate. Mapped stair locations use DEM endpoint rises; individual risers, railings and terrain below 5 m resolution are not surveyed reproductions.

- Ainsworth now has a photo-led folded terracotta screen, horizontal ceramic courses, grey ledges, glazed base and brick ends. The 24 m reconstruction and panel spacing remain estimates; neither is presented as surveyed.

- Kensington Colleges: five mapped college wings now use photo-led brick patterns, narrow window bays, recessed / projecting balconies, floor ledges and light concrete cores. Public Street View panorama Slvij_TxFht4mcZH294sFw was inspected at -33.9162366, 151.23194; its location is a new map destination. The architect journal (printed pp. 180–183, PDF pp. 92–93), official Fig Tree Hall exterior and contractor aerial inform the model. Rooftop lawns, pergolas and vent rows are reconstructed details.
- College courtyard paving, a 0.55 m raised planted edge and timber seating are photo-led approximations. The underlying garden boundary is actual OSM way 926419123; the added paving extent and landscape dimensions are marked as reconstructions. Terrain remains the NSW raster; no survey-grade terrace geometry is claimed.

- Village Green: eight retained OSM sports features now supply the running trace, main field, four courts and two activity areas. Soccer markings and goal placement use the real 9.28-degree pitch frame, replacing the former world-aligned rectangle. Court colours and equipment are reconstructed from the architect aerial. The mapped running trace includes an access spur and is retained without a fabricated closing edge.
- Moya Dodd Grandstand: the solid generic building is replaced with three rounded canopy leaves, steel beams, supports, yellow / black seating terraces, walkable aisles and a rear earth bank. The roof height (6.2 m), seat layout, risers and mound are photo-led estimates; their positions use the mapped grandstand outline and the field axis. The walking surface shares the reconstructed mound geometry.
- Blockhouse now uses brown brick, narrow framed bays and a pale fascia above shop fronts. Sam Cracknell Pavilion uses a white body with a curved glazed balcony and pergola edge. Its original exterior was inspected in July 2015 Street View, with 2023 upgrade photographs recorded separately; the model does not reproduce every later amenities alteration.

- Home Ground Café: the public Google place coordinate (-33.9180069, 151.2286064) falls within OSM H11. The name and alias are now connected to that outline. A low glazed kiosk replaces the generic 9.6 m block; the 3.7 m roof height, rounded eaves, covered seating, forecourt paving and three palms are photo-led reconstructions, with estimated dimensions and positions. H11 remains searchable.

NIDA and western residences now have additional photo-led models. The Parade Theatre uses the real E2 outline, fine-framed transparent glazing, a sloping roof with a drum opening, horizontal louvres and entrance signage. Hassell explicitly states an 11 m curtain wall. The former circular drum approximation has been replaced by actual OSM part 609912640: a D-shaped 17 m shell. Parts 609912635 and 609912638 provide two 19 m upper volumes with min_height=12. These are retained public map tags and outlines, not a survey guarantee. Roof pitch, perforated artwork, precise interior supports and entrance details remain reconstructed / incomplete. A level foyer floor sits above the highest DEM outline vertex to avoid terrain penetrating the transparent interior.

New College retains its 15 m mapped height and detailed footprint. Three brick room rows, a light communal base, pale green upper cladding, a single eastern central glass bay and raised white / green roof sections follow two official UNSW photographs. Warrane retains its 27 m mapped height and outline; eight upper rows of paired narrow window strips, pale spandrel panels, brick wall fields and communal base follow its official exterior. Exact bay spacing, room dimensions, roof sections and services remain estimates. These are four researched footprints, not a claim that the surrounding residential precinct is finished.

Browser checks: New College's single central glass bay and raised clerestory are visible from across the sports courts; Warrane's eight upper rows and communal base were inspected from Anzac Parade. The NIDA foyer floor no longer intersects the regional terrain. Holding forward at the glass boundary leaves the walking distance unchanged after arrival. No browser warnings or errors were captured in these checks. Geometry tests verify the theatre roof opening stays inside its mapped outline and triangulates without covering the drum.

Residential precinct: the actual UNSW Village multipolygon, including its three holes, is partitioned into photo-led tall wings and lower boundary blocks. The 25.6 / 12.8 / 9.6 m heights are estimates guided by Clare / Architectus photographs and their eight-storey description. Four mapped through-footways now pass under reconstructed bridges. Their source coordinates are preserved; 3 m doorway widths, end clearances and 3.2 / 5.8 m overhead clearances are estimates. A browser walking check moved 37 m through the first bridge into the next court. Boolean geometry tests prove complete footprint / hole preservation, no overlapping volumes and clearance for the player at every mapped threshold.

New College Postgraduate Village retains its U-shaped outline, now with a blue-glass southern screen and lower ochre side wing. Its 25.6 / 13.2 m split is reconstructed from the official exterior, not mapped height evidence. The official college page describes seven floors; the original eight-level OSM tag remains in the data. Shalom uses three visible rows and projecting open metal balconies; its 12 m mapped height and conflicting four-level tag are both retained. International House uses a 7.8 m estimated exterior with light brick, pale upper panels, small upper windows and a dark roof fascia. Its two visible exterior rows differ from its retained three-level tag. Its mapped courtyard opening now contains a photo-led pond, pergola, picnic furniture and tropical planting; individual feature positions and dimensions are estimates.

Heritage precinct: the White House now has weatherboards, two levels of French windows, wraparound X balustrades, curved brackets and a climbable exterior stair to the upper verandah. Old Tote uses three visible storeys, informed by exterior photographs and the public heritage history, while retaining its conflicting two-level map tag. Fig Tree Theatre has corrugated cladding, an offset gable, lower side annex and a reconstructed foyer window box. Their 9.6 / 11.2 / 5.7 m model heights are estimates. Four additional mature fig trees have explicitly reconstructed positions and heights; the original 30 mapped trees remain.

Goldstein Dining Hall now uses a tall concrete frame, timber glazing and a lower service wing within its original mapped outline. No measured replacement height was found: the 12 m model estimate and original 20 m OSM tag are both disclosed in its building card. The formal pool, sculpture and precise courtyard terraces remain incomplete. Other heritage details, including Old Tote’s fire stair, also remain incomplete.

Arrival headings were corrected from the map exporter’s south-based convention to the renderer’s north-based convention, so legacy map destinations face their buildings. The elevation HUD now reports the walker’s feet altitude, including raised decks, with terrain altitude retained separately.

Modernist precinct: Science Theatre now retains its 15 m overall map height while using a reconstructed sloping auditorium roof, pale panel joints, tall entrance glazing, side clerestories and a post-and-beam covered forecourt. Its original five-level tag remains in the data; it is not interpreted as five office-window rows. A level foundation samples the front-centre DEM as well as outline vertices; a lower plinth and individually grounded canopy supports avoid gaps and low head clearance. The paving and two added trees have estimated extents, heights and positions. The original 30 mapped trees remain unchanged.

Dalton retains its 15 m height, three-level tag and original detailed outline. The west side has narrow letterbox windows, while the east has two broad upper glazing bands. The southern end uses a procedural aggregate texture, current F12 / Dalton Building lettering and wraparound ground-floor glazing informed by NBRS’s Teaching Commons photographs. A hedge is reconstructed from the current exterior. July 2015 Google panorama 5AWedBzlsx7s4Zuwx6QdHw at -33.9176319, 151.2293187 was visually inspected; its café fitout is not treated as current. The mosaic artworks and interior fitout are not reproduced.

Robert Webster retains its 16 m height and mapped outline. Its west end now has closely spaced pale fins over three upper rows and a brown ground floor; the mall elevation has a reflective curtain wall, fine mullions, small opening lights and an entrance portico. A single 512 px cube reflection captures the reconstructed campus after loading and lighting changes. It is an approximate static local reflection with parallax limitations, not a continuously updated mirror. Unseen elevations, exact panel divisions and portal dimensions remain reconstructed. Comparison destinations show Webster’s west corner and Dalton’s eastern elevation.

F10 / June Griffith: the former extrusion of the whole complex to 45 m is replaced by a tower and lower teaching wings. The reconstructed internal split follows returns already present in the mapped perimeter; boolean checks prove the volumes exactly partition that original outline without overlap. The original 45 m map tag and 14-level tag remain. Four Grimshaw massing views in the July 2016 SSD report (printed pp. 30–31 / PDF pp. 3–4) place the long tower through the central-west portion of the footprint and label its parapet approximately RL 75.6 m. The model places the parapet at that elevation and derives about 47.4 m above its DEM foundation, assuming the report RL and NSW ground datums are compatible. This is a derived approximation, not a surveyed overall height. Roof services extend an estimated 2.6 m above the parapet. Internal split lines, 15 m lower wings, visible glazing rows and equipment dimensions remain estimates. The public OSM map API was checked for separate building parts in this precinct and returned none; these generated parts are not claimed as mapped parts.

Public Google panorama hrqvG25FXbeVUiwgZjnVOQ at -33.9175718, 151.2290574 (July 2015) was visually inspected alongside the official Learning Environments exterior, front / back StudentVIP photographs, contractor cladding account and Google aerial. The model now has light horizontal tower bands, brick ends, external duct bundles, estimated roof-service banks, lower front fins, a glazed stair bay, grey rear panels with narrow slots and photo-led succulent beds. Individual plant positions, detailed services, exact internal boundaries and unseen elevations remain reconstructed.

Webster Theatres G15 retains its mapped perimeter and two-level tag with an estimated 6.4 m model height. The west entrance now has tall glazing, pale panels and curved light canopy sheets on dark steel supports. Its paving and canopy dimensions / positions are estimates; the northern end is shortened to clear the mapped Quadrangle perimeter. The entrance photographs show the neighbouring curved Quadrangle wall separately. A browser check walked 13 m into and along the covered route. Exact door placement, entrance treads and surrounding terrace levels still need better dimensioned evidence.

Clancy Auditorium C24 now uses an inset concrete hall, a flared northern copper hood with a procedural diamond-shingle soffit, tall transparent glazing, suspended entrance canopy, smaller side hoods and simplified blue foyer fitout. The original 8 m map tag and two-level tag remain. The architect’s public scaled section and exterior photographs support a **14.5 m model estimate**, not a surveyed overall height. The architect describes 10 m glazing; an indexed TTW engineering account gives 8 m frontage and a 23 m portal, while its old live URL now redirects. These differing component figures are disclosed separately. Three real mapped roof outlines are retained and integrated with the hoods, removing duplicate generic roofs and invented posts. Their dimensions and canopy clearances remain reconstructed.

Google Street View panorama 2eariXTnlgfVb6_HXbUA1Q at -33.9163674, 151.2349538 (February 2022) was visually inspected at 175° and 210°. Trees obscure portions of the post-refurbishment façade; the architect’s photographs provide the clearer detail. A browser walk reached the closed glass boundary after 25 m and remained blocked when continuing forward. This is an outdoor map; the foyer is visible but not entered.

Chancellery C22 retains its detailed H-shaped footprint, 15 m OSM height and five-level tag. NBRS’s 2019 heritage report (printed pp. 16–17 / PDF pp. 22–23, photos May 2018) describes four wings, with five storeys including basement and sub-basement. The eastern entrance faces Michael Birt Gardens. The model now has brown brick, recessed glazing, a white canopy, reconstructed tree ferns, stone bollards and paving; the western Executive wing has repeated concrete piers, segmental barrel vaults and northern balcony parapets. Roof regions exactly partition the original footprint without overlap. Vault count, pitch, window divisions and landscape dimensions are estimates. The heritage report does not supply the 15 m height; the map tag remains its numeric source. Current official Library Lawn photography was also visually checked. The former proposed B22 replacement is not represented as an existing building.

Structural surface correction: the previous square beam helper emitted inward-facing side surfaces. Shared outward-facing tube geometry now makes railings, brackets and canopy beams visible from outside. Geometry tests cover vertical, horizontal and angled runs, including end caps.

## Remaining fidelity work

All-campus, exact visual fidelity is **not proven**. Many façades still use a generic academic/residential pattern. Exact window placements, entrances, roof services, retaining walls and landscaping require more building-by-building photo comparison. The college models still need precise stepped massing / terrace levels and a survey or approved dimensioned plans; retained OSM overall heights and reconstructed six-row façade patterns do not establish those details. Estimated building heights need better primary or LiDAR evidence. Precise stairs, platforms and retaining edges require data finer than the current elevation grid.

Named buildings still without a source-linked profile:

- Barker Street Carpark (N18)
- Botany Street Carpark (H25)
- Willis Annex - J18 (J18)
- Civil Engineering - H20 (H20)
- Patricia O'Shane Building K-E19 (E19)
- Newton - J12 (J12)
- Keith Burrows Theatre - J14 (J14)
- Physics Theatre - K14 (K14)
- Mathews Theatres (D23)
- Barker Street Apartments - N13 (N13)
- SDN House at Pooh Corner (osm-way-45561523)
- John Goodsell - F20 (F20)
- Swimming Pool - B4 (B4)
- Gym - B5, B6, B7 (B5)
- Vallentine Annexe - H22 (H22)
- Solar Industrial Research Facility (SIRF) - G23 (G23)
- Australian Graduate School of Management - G27 (G27)
- University Regiment - H1 (H1)
- J2 (J2)
- J2 (J2)
- Rex Vowels Theatre (F17)
- Samuels Building - F25 (F25)
- Campus Village Cafe (osm-way-584816505)
- Biological Sciences North (D26)
- Biological Sciences South (E26)
- Computer Science and Engineering (K17) (K17)
- Esme Timbery Creative Studio (D8) (D8)
- Rupert Myers Building (M15)

## Reproduction

- node scripts/make-building-parts.mjs
- node scripts/make-campus-details.mjs
- node scripts/make-sports-data.mjs
- node scripts/make-chemical-parts.mjs (reconstructed F10 split, preserving the mapped perimeter)
- node scripts/make-chancellery-roofs.mjs (reconstructed roof split within the mapped Chancellery outline)
- node scripts/make-residential-parts.mjs (polygon-clipping is a development dependency; output contains data only)
- python3 scripts/fetch-elevation.py (uses retained TIFF when present; Pillow and NumPy required)
- node scripts/build-reference-library.mjs
- npm run prepare:site (reference index and browser asset revision, before publication)
- npm test

NSW terrain: © State of New South Wales (Spatial Services, Department of Customer Service NSW), extracted 2 November 2026. Source grid resampled via the public ImageServer and interpolated over rendered triangles; CC BY 4.0. Current source: https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_5M_Elevation/ImageServer

Height reference: [NSW B22 Redevelopment assessment, June 2020](https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-9673%2120200623T070714.309+GMT), printed p. 22 / PDF p. 28. The document provides overall heights, not detailed roof-part or facade dimensions. The report is linked at its original source, not redistributed.
