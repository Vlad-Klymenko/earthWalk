# Campus visual realism — ongoing work

The goal remains a detailed, recognizable recreation of the entire main Kensington campus. This pass does not establish photorealistic accuracy for the whole campus.

## Evidence added

- Public NSW 5 m elevation raster retained at dist/data/unsw-elevation.tif with SHA-256 provenance. Base terrain sampling and foundations use metres in the same coordinate frame. Photo-led landscape additions use explicitly reconstructed dimensions.
- Lower University Mall sample: about 27.6 m; library forecourt: about 52.5 m. Full raster values span 20.2–65.3 m, including surrounding streets.
- 50/98 campus footprints have an explicit OSM height tag. Two now use stronger public planning evidence instead: Library 57.74 m and Mathews 54 m (NSW B22 assessment, June 2020, printed p. 22 / PDF p. 28). Both OSM tags said 60 m; those conflicting values are retained as mappedHeight. The other 48 tagged footprints use community data, not a survey guarantee; 48 have estimated heights. Building cards identify the source category and link to the report when used.
- Five actual library building-part outlines separate the tower and lower podium. Tower maximum uses the report's 57.74 m figure; lower parts estimate height from mapped levels.
- 33 campus footprints have a specific source-linked appearance profile, within 54 visual/data references. This includes the existing custom Roundhouse and Scientia models, now correctly registered in the profile audit. Some additional buildings use type-based appearance rather than building-specific research.
- Two Google Street View headings at University Mall were visually inspected, alongside Google Images and original architect/university galleries. Photographs are linked as research references, not redistributed as game textures.
- 95 OSM furniture positions are retained; object designs remain approximate. Mapped stair locations use DEM endpoint rises; individual risers, railings and terrain below 5 m resolution are not surveyed reproductions.

- Ainsworth now has a photo-led folded terracotta screen, horizontal ceramic courses, grey ledges, glazed base and brick ends. The 24 m reconstruction and panel spacing remain estimates; neither is presented as surveyed.

- Kensington Colleges: five mapped college wings now use photo-led brick patterns, narrow window bays, recessed / projecting balconies, floor ledges and light concrete cores. Public Street View panorama Slvij_TxFht4mcZH294sFw was inspected at -33.9162366, 151.23194; its location is a new map destination. The architect journal (printed pp. 180–183, PDF pp. 92–93), official Fig Tree Hall exterior and contractor aerial inform the model. Rooftop lawns, pergolas and vent rows are reconstructed details.
- College courtyard paving, a 0.55 m raised planted edge and timber seating are photo-led approximations. The underlying garden boundary is actual OSM way 926419123; the added paving extent and landscape dimensions are marked as reconstructions. Terrain remains the NSW raster; no survey-grade terrace geometry is claimed.

- Village Green: eight retained OSM sports features now supply the running trace, main field, four courts and two activity areas. Soccer markings and goal placement use the real 9.28-degree pitch frame, replacing the former world-aligned rectangle. Court colours and equipment are reconstructed from the architect aerial. The mapped running trace includes an access spur and is retained without a fabricated closing edge.
- Moya Dodd Grandstand: the solid generic building is replaced with three rounded canopy leaves, steel beams, supports, yellow / black seating terraces, walkable aisles and a rear earth bank. The roof height (6.2 m), seat layout, risers and mound are photo-led estimates; their positions use the mapped grandstand outline and the field axis. The walking surface shares the reconstructed mound geometry.
- Blockhouse now uses brown brick, narrow framed bays and a pale fascia above shop fronts. Sam Cracknell Pavilion uses a white body with a curved glazed balcony and pergola edge. Its original exterior was inspected in July 2015 Street View, with 2023 upgrade photographs recorded separately; the model does not reproduce every later amenities alteration.

- Home Ground Café: the public Google place coordinate (-33.9180069, 151.2286064) falls within OSM H11. The name and alias are now connected to that outline. A low glazed kiosk replaces the generic 9.6 m block; the 3.7 m roof height, rounded eaves, covered seating, forecourt paving and three palms are photo-led reconstructions, with estimated dimensions and positions. H11 remains searchable.

NIDA and western residences now have additional photo-led models. The Parade Theatre uses the real E2 outline, fine-framed transparent glazing, a sloping roof with a drum opening, horizontal louvres and entrance signage. Hassell explicitly states an 11 m curtain wall; the 12 m OSM overall height is retained separately. Drum diameter, roof pitch and entrance dimensions are reconstructed. A level foyer floor sits above the highest DEM outline vertex to avoid terrain penetrating the transparent interior. The adjoining D2 brick wing has a source-led treatment, but its later upper Graduate School additions remain incomplete.

New College retains its 15 m mapped height and detailed footprint. Three brick room rows, a light communal base, pale green upper cladding, a single eastern central glass bay and raised white / green roof sections follow two official UNSW photographs. Warrane retains its 27 m mapped height and outline; eight upper rows of paired narrow window strips, pale spandrel panels, brick wall fields and communal base follow its official exterior. Exact bay spacing, room dimensions, roof sections and services remain estimates. These are four researched footprints, not a claim that the surrounding residential precinct is finished.

Browser checks: New College's single central glass bay and raised clerestory are visible from across the sports courts; Warrane's eight upper rows and communal base were inspected from Anzac Parade. The NIDA foyer floor no longer intersects the regional terrain. Holding forward at the glass boundary leaves the walking distance unchanged after arrival. No browser warnings or errors were captured in these checks. Geometry tests verify the theatre roof opening stays inside its mapped outline and triangulates without covering the drum.

## Remaining fidelity work

All-campus, exact visual fidelity is **not proven**. Many façades still use a generic academic/residential pattern. Exact window placements, entrances, roof services, retaining walls and landscaping require more building-by-building photo comparison. The college models still need precise stepped massing / terrace levels and a survey or approved dimensioned plans; retained OSM overall heights and reconstructed six-row façade patterns do not establish those details. Estimated building heights need better primary or LiDAR evidence. Precise stairs, platforms and retaining edges require data finer than the current elevation grid.

Named buildings still without a source-linked profile:

- Barker Street Carpark (N18)
- Botany Street Carpark (H25)
- Science Theatre (F13)
- Dalton Building (F12)
- Willis Annex - J18 (J18)
- Sir John Clancy Auditorium - C24 (C24)
- Civil Engineering - H20 (H20)
- Patricia O'Shane Building K-E19 (E19)
- Robert Webster (G14)
- Webster Theatres - G15 (G15)
- Newton - J12 (J12)
- Keith Burrows Theatre - J14 (J14)
- Physics Theatre - K14 (K14)
- June Griffith Building (F10)
- Mathews Theatres (D23)
- New College Postgraduate Village (H3)
- Shalom College - N9 (N9)
- Barker Street Apartments - N13 (N13)
- SDN House at Pooh Corner (osm-way-45561523)
- John Goodsell - F20 (F20)
- Swimming Pool - B4 (B4)
- Gym - B5, B6, B7 (B5)
- Vallentine Annexe - H22 (H22)
- Solar Industrial Research Facility (SIRF) - G23 (G23)
- Goldstein Dining Hall - D16 (D16)
- Australian Graduate School of Management - G27 (G27)
- Fig Tree Theatre - B14d (osm-way-164552439)
- University Regiment - H1 (H1)
- J2 (J2)
- J2 (J2)
- The White House - C15 (C15)
- David Gonski Chancellery (C22)
- Rex Vowels Theatre (F17)
- Samuels Building - F25 (F25)
- Old Tote Building - B15 (B15)
- Campus Village Cafe (osm-way-584816505)
- Biological Sciences North (D26)
- Biological Sciences South (E26)
- Computer Science and Engineering (K17) (K17)
- Esme Timbery Creative Studio (D8) (D8)
- Rupert Myers Building (M15)
- International House (C6)
- UNSW Village (B10)

## Reproduction

- node scripts/make-building-parts.mjs
- node scripts/make-campus-details.mjs
- node scripts/make-sports-data.mjs
- python3 scripts/fetch-elevation.py (uses retained TIFF when present; Pillow and NumPy required)
- node scripts/build-reference-library.mjs
- npm test

NSW terrain: © State of New South Wales (Spatial Services, Department of Customer Service NSW), extracted 2 November 2026. Source grid resampled via the public ImageServer and interpolated over rendered triangles; CC BY 4.0. Current source: https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_5M_Elevation/ImageServer

Height reference: [NSW B22 Redevelopment assessment, June 2020](https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-9673%2120200623T070714.309+GMT), printed p. 22 / PDF p. 28. The document provides overall heights, not detailed roof-part or facade dimensions. The report is linked at its original source, not redistributed.
