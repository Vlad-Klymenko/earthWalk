# Campus visual realism — ongoing work

The goal remains a detailed, recognizable recreation of the entire main Kensington campus. This pass does not establish photorealistic accuracy for the whole campus.

## Evidence added

- Public NSW 5 m elevation raster retained at dist/data/unsw-elevation.tif with SHA-256 provenance. All ground sampling, foundations and walking use metres in the same coordinate frame.
- Lower University Mall sample: about 27.6 m; library forecourt: about 52.5 m. Full raster values span 20.2–65.3 m, including surrounding streets.
- 50/98 campus footprints have an explicit OSM height tag. Two now use stronger public planning evidence instead: Library 57.74 m and Mathews 54 m (NSW B22 assessment, June 2020, printed p. 22 / PDF p. 28). Both OSM tags said 60 m; those conflicting values are retained as mappedHeight. The other 48 tagged footprints use community data, not a survey guarantee; 48 have estimated heights. Building cards identify the source category and link to the report when used.
- Five actual library building-part outlines separate the tower and lower podium. Tower maximum uses the report's 57.74 m figure; lower parts estimate height from mapped levels.
- 20 campus footprints have a specific source-linked appearance profile, within 35 visual/data references. This includes the existing custom Roundhouse and Scientia models, now correctly registered in the profile audit. Some additional buildings use type-based appearance rather than building-specific research.
- Two Google Street View headings at University Mall were visually inspected, alongside Google Images and original architect/university galleries. Photographs are linked as research references, not redistributed as game textures.
- 95 OSM furniture positions are retained; object designs remain approximate. Mapped stair locations use DEM endpoint rises; individual risers, railings and terrain below 5 m resolution are not surveyed reproductions.

- Ainsworth now has a photo-led folded terracotta screen, horizontal ceramic courses, grey ledges, glazed base and brick ends. The 24 m reconstruction and panel spacing remain estimates; neither is presented as surveyed.

## Remaining fidelity work

All-campus, exact visual fidelity is **not proven**. Many façades still use a generic academic/residential pattern. Exact window placements, entrances, roof services, retaining walls and landscaping require more building-by-building photo comparison. Estimated building heights need better primary or LiDAR evidence. Precise stairs, platforms and retaining edges require data finer than the current elevation grid.

Named buildings still without a source-linked profile:

- Barker Street Carpark (N18)
- Botany Street Carpark (H25)
- Blockhouse (G6)
- Sam Cracknell Pavilion (H8)
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
- Warrane College - M7 (M7)
- New College Postgraduate Village (H3)
- New College - L6 (L6)
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
- Parade Theatres - E2 (E2)
- NIDA - D2 (D2)
- The White House - C15 (C15)
- David Gonski Chancellery (C22)
- Rex Vowels Theatre (F17)
- Samuels Building - F25 (F25)
- Colombo House - B16 (B16)
- Goldstein College - D17 (D17)
- Fig Tree Hall - B18 (B18)
- Philip Baxter College - D18 (D18)
- Basser College - D17 (D17)
- Old Tote Building - B15 (B15)
- Campus Village Cafe (osm-way-584816505)
- Biological Sciences North (D26)
- Biological Sciences South (E26)
- Computer Science and Engineering (K17) (K17)
- Esme Timbery Creative Studio (D8) (D8)
- Moya Dodd Grandstand (osm-way-1178531040)
- H11 (H11)
- Rupert Myers Building (M15)
- International House (C6)
- UNSW Village (B10)

## Reproduction

- node scripts/make-building-parts.mjs
- node scripts/make-campus-details.mjs
- python3 scripts/fetch-elevation.py (uses retained TIFF when present; Pillow and NumPy required)
- node scripts/build-reference-library.mjs
- npm test

NSW terrain: © State of New South Wales (Spatial Services, Department of Customer Service NSW), extracted 2 November 2026. Source grid resampled via the public ImageServer and interpolated over rendered triangles; CC BY 4.0. Current source: https://maps.six.nsw.gov.au/arcgis/rest/services/public/NSW_5M_Elevation/ImageServer

Height reference: [NSW B22 Redevelopment assessment, June 2020](https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-9673%2120200623T070714.309+GMT), printed p. 22 / PDF p. 28. The document provides overall heights, not detailed roof-part or facade dimensions. The report is linked at its original source, not redistributed.
