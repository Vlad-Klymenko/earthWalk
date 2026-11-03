import {createCampusLighting} from './campus-lighting.js?v=eb4acc4e0f1c';
import {keithEntranceGeometry,keithEntrancePaving} from './keith-entrance-data.js?v=eb4acc4e0f1c';
import {mathewsTheatreFacades,mathewsTheatreAprons} from './mathews-theatres-facade.js?v=eb4acc4e0f1c';
import {CATHERINE_PATTERN,CATHERINE_VIEW,catherineUV} from './catherine-court-data.js?v=eb4acc4e0f1c';
import {CATHERINE_MESH,CATHERINE_PITS,CATHERINE_BENCHES,CATHERINE_REMNANTS} from './catherine-court-parts.js?v=eb4acc4e0f1c';
import {catherineCourtHeight,inCatherineCourt} from './catherine-court-landscape.js?v=eb4acc4e0f1c';
import {GOODSELL,GOODSELL_ENTRY_FACE,GOODSELL_DOOR,GOODSELL_WINDOWS,GOODSELL_BRICK_PANELS,GOODSELL_CANOPY,GOODSELL_RAFTERS,GOODSELL_GLASS_PANES,GOODSELL_CANOPY_COLLISION,goodsellFacePoint,goodsellCanopyPoint,goodsellCanopyGlassHeight} from './goodsell-entrance-data.js?v=eb4acc4e0f1c';
import {SAMUELS_LIBRARY_FACE,SAMUELS_SCREEN,SAMUELS_UPPER_WINDOWS,SAMUELS_UPPER_PANELS,SAMUELS_SCREEN_PANELS,SAMUELS_SCREEN_BLADES,SAMUELS_SCREEN_SUPPORTS,samuelsFacadePoint} from './samuels-facade-data.js?v=eb4acc4e0f1c';
import {SIRF,SIRF_PORTALS,sirfPoint,sirfGlassTop,sirfGlassSpan} from './sirf-shell-data.js?v=eb4acc4e0f1c';
import {SIRF_FACETS,SIRF_PANEL_SEAMS,SIRF_HOOD,SIRF_LOWER_BODY,SIRF_RECESS,SIRF_HOOD_COLLIDERS} from './sirf-shell-parts.js?v=eb4acc4e0f1c';
import {AGSM_MASSING,AGSM_COURT_BANDS,agsmFacadeFace,agsmFaceCells,agsmScreen,agsmOffsetPoint} from './agsm-facade-data.js?v=eb4acc4e0f1c';
import {AGSM_FACADE_PARTS,AGSM_FACADE_WALLS} from './agsm-facade-parts.js?v=eb4acc4e0f1c';
import {AGSM_COURT,AGSM_TABLES,AGSM_TRELLISES,AGSM_PERGOLA,agsmCourtPoint,agsmVineForm} from './agsm-court-data.js?v=eb4acc4e0f1c';
import {AGSM_COURT_TRIANGLES,AGSM_COURT_RISERS,AGSM_COURT_REMOVED_TRIANGLES,AGSM_COURT_GROUND_EDGES,AGSM_COURT_REMNANTS} from './agsm-court-parts.js?v=eb4acc4e0f1c';
import {agsmCourtHeight} from './agsm-court-landscape.js?v=eb4acc4e0f1c';
import {CLANCY_CANOPY,CLANCY_GLAZING,CLANCY_COPPER,CLANCY_CANOPY_POINTS,CLANCY_HANGERS,CLANCY_GLASS_FINS,clancySurfaceUV} from './clancy-foyer-data.js?v=eb4acc4e0f1c';
import {WALLACE_SCREEN,WALLACE_FLOORS,WALLACE_BANDS,WALLACE_EAST_FACES,WALLACE_PIERS,wallaceFaceKind,wallaceWestSurface,wallaceCells,wallaceFacePoint,wallaceBandProfile,wallaceBayAppearance,wallaceFins,wallaceFinPoints,wallaceEave} from './wallace-facade-data.js?v=eb4acc4e0f1c';
import {lowyStreetPavingHeight} from './lowy-street-landscape.js?v=eb4acc4e0f1c';
import {LOWY_STREET,LOWY_STREET_WINDOW,LOWY_NORTH_BOX,lowyStreetBottom,lowyStreetFeature,lowyStreetLocal,LOWY_WEST_POST} from './lowy-street-data.js?v=eb4acc4e0f1c';
import {LOWY_STREET_LOWER_PARTS,LOWY_STREET_RECESS,LOWY_STREET_LOWER_WALLS,LOWY_STREET_COLLIDERS,LOWY_STREET_PAVING_TRIANGLES} from './lowy-street-parts.js?v=eb4acc4e0f1c';
import {LOWY_SCREEN,LOWY_LINK,LOWY_GREEN,lowyScreenPanels,lowyFacadeFaces} from './lowy-facade-data.js?v=eb4acc4e0f1c';
import {BIO_STREET_GARDEN,BIO_STREET_FRAME} from './bioscience-street-data.js?v=eb4acc4e0f1c';
import {BIO_STREET_BEDS,BIO_STREET_WALLS,BIO_STREET_SOIL_TRIANGLES,BIO_STREET_PLANTS} from './bioscience-street-parts.js?v=eb4acc4e0f1c';
import {bioStreetWalkingHeight,bioStreetTreeRoot} from './bioscience-street-landscape.js?v=eb4acc4e0f1c';
import {BIOSCIENCE_SCREEN,BIOSCIENCE_GLASS,BIOSCIENCE_PIER,bioscienceFin,bioscienceGreyPanel,biosciencePanelGrid,baguetteProfile} from './bioscience-facade-data.js?v=eb4acc4e0f1c';
import {MORVEN_CANOPY as MC,MORVEN_CANOPY_RING,MORVEN_CANOPY_WALL_RL,MORVEN_CANOPY_POSTS,MORVEN_CANOPY_RIBS,MORVEN_COUNTER_ANGLES,MORVEN_COUNTER_RL,MORVEN_COUNTER_FOOTPRINT,MORVEN_CANOPY_STOOLS,MORVEN_FRONTAGE,MORVEN_FRONTAGE_BAYS,morvenCanopyPoint,morvenCanopyUnderRL,morvenFrontagePoint} from './morven-canopy-data.js?v=eb4acc4e0f1c';
import {MORVEN_GARDEN_FRAME,MORVEN_BENCHES,MORVEN_SHRUBS,morvenBenchPoint,morvenShrubForm} from './morven-garden-data.js?v=eb4acc4e0f1c';
import {MORVEN_GARDEN_BEDS,MORVEN_BENCH_PADS,MORVEN_PAVING_BANDS} from './morven-garden-parts.js?v=eb4acc4e0f1c';
import {BOURKE_FRAME,BOURKE_POOL,BOURKE_STONES,BOURKE_DISH,BOURKE_PLAQUE,bourkePoint} from './morven-fountain-data.js?v=eb4acc4e0f1c';
import {bourkeStoneGeometry} from './morven-fountain-geometry.js?v=eb4acc4e0f1c';
import {WEBSTER_REPLACED_STEP_ID,WEBSTER_FRAME,WEBSTER_ENTRY,WEBSTER_PIERS,WEBSTER_ISLANDS,WEBSTER_LOWER_FLIGHTS,websterPoint,websterLocal,websterSurfaceRL,websterFacadeSpans,websterEntrySurface} from './webster-entry-data.js?v=eb4acc4e0f1c';
import {DALTON_COMMONS,DALTON_FRAME,DALTON_PANELS,DALTON_SCREEN,DALTON_MEETING_TABLES,DALTON_LOUNGE_CHAIRS,daltonPoint,daltonLocal,daltonFacadeSpans} from './dalton-commons-data.js?v=eb4acc4e0f1c';
import {daltonMosaicComposition} from './dalton-mosaic-data.js?v=eb4acc4e0f1c';
import {WEBSTER_SOLIDS,WEBSTER_RECESS_PARTS,WEBSTER_FLOORS,WEBSTER_REMOVED_TRIANGLES,WEBSTER_GROUND_EDGES,WEBSTER_REMNANTS,WEBSTER_MALL_REMNANTS} from './webster-entry-parts.js?v=eb4acc4e0f1c';
import {foliageKind,foliageSprites} from './foliage-data.js?v=eb4acc4e0f1c';
import {scienceTheatreFacades,scienceTheatreCanopy} from './science-theatre-facade.js?v=eb4acc4e0f1c';
import {civilWestFacade} from './civil-west-data.js?v=eb4acc4e0f1c';
import {SCIENTIA_STEP_IDS,SCIENTIA_STEP_SECTIONS,SCIENTIA_FLIGHTS,scientiaStepHeight,scientiaSectionHeight,scientiaOutsideStepSegments} from './scientia-steps-data.js?v=eb4acc4e0f1c';
import {SCIENTIA_STEP_GROUND,SCIENTIA_STEP_FLOORS,SCIENTIA_STEP_TIERS,SCIENTIA_STEP_REMNANTS,SCIENTIA_STEP_REMOVED_TRIANGLES,SCIENTIA_STEP_GROUND_EDGES} from './scientia-steps-parts.js?v=eb4acc4e0f1c';
import {SCIENTIA_HEDGES,SCIENTIA_STEP_PARAPET} from './scientia-steps-geometry.js?v=eb4acc4e0f1c';
import {SCIENTIA_LINKS,SCIENTIA_SOLAR,SCIENTIA_PASSAGE} from './scientia-geometry.js?v=eb4acc4e0f1c';
import {SCIENTIA_ID,SCIENTIA_NORTH_ID,SCIENTIA,SCIENTIA_FRAME,SCIENTIA_TREES,scientiaPoint,scientiaLocal,scientiaRoofPoint} from './scientia-data.js?v=eb4acc4e0f1c';
import {SCIENTIA_NORTH,SCIENTIA_SOUTH} from './scientia-parts.js?v=eb4acc4e0f1c';
import {GLOBE,GLOBE_LIGHTS,globeGround} from './globe-data.js?v=eb4acc4e0f1c';
import {globeLatticeGeometry,globeCupGeometry} from './globe-geometry.js?v=eb4acc4e0f1c';
import {OLD_MAIN_MAIN_ENTRY as MAIN_ENTRY,OLD_MAIN_FIN,OLD_MAIN_WEST_PROFILE,FALCONER} from './old-main-front-data.js?v=eb4acc4e0f1c';
import {OLD_MAIN_ROOFS,OLD_MAIN_FRONT_APRON,OLD_MAIN_FRONT_REMNANTS} from './old-main-front-parts.js?v=eb4acc4e0f1c';
import {falconerGeometry} from './falconer-geometry.js?v=eb4acc4e0f1c';
import {CHANCELLOR_ART,chancellorBlossoms,chancellorPoint,chancellorPavingHeight} from './chancellors-garden-data.js?v=eb4acc4e0f1c';
import {CHANCELLOR_GARDENS,CHANCELLOR_MESH,CHANCELLOR_POOL,CHANCELLOR_PLANTS,CHANCELLOR_REMNANTS} from './chancellors-garden-parts.js?v=eb4acc4e0f1c';
import {fountainFigureGeometry} from './fountain-figure.js?v=eb4acc4e0f1c';
import {OLD_NORTH_FRAME,OLD_NORTH_ANNEX,OLD_NORTH_BRIDGE,OLD_NORTH_PLANTER,oldNorthPoint,oldNorthRectangle,oldNorthLocal,oldNorthPavingHeight} from './old-main-north-data.js?v=eb4acc4e0f1c';
import {OLD_NORTH_ANNEX_PARTS,OLD_NORTH_COURT,OLD_NORTH_PAVING_MESH,OLD_NORTH_REMNANTS,OLD_NORTH_POSTS} from './old-main-north-parts.js?v=eb4acc4e0f1c';
import {OLD_MAIN_ENTRY,OLD_MAIN_ENTRY_BIKES,OLD_MAIN_LOWER_DOOR,oldMainEntryHeight,oldMainEntryFloorHeight,oldMainEntryWalkingPatches,oldMainEastFacadePoint,oldMainEastWindowBayVisible} from './old-main-entry-data.js?v=eb4acc4e0f1c';
import {OLD_MAIN_ENTRY_FLOORS,OLD_MAIN_ENTRY_CUTOUT,OLD_MAIN_ENTRY_REMOVED_TRIANGLES,OLD_MAIN_ENTRY_GROUND_EDGES,OLD_MAIN_ENTRY_REMNANTS} from './old-main-entry-parts.js?v=eb4acc4e0f1c';
import {ENGINEERING_FRAME,ENGINEERING_EDGE,ENGINEERING_WALLS,engineeringPoint,engineeringPavingHeight,engineeringPlantLeaves} from './engineering-street-data.js?v=eb4acc4e0f1c';
import {ENGINEERING_GARDENS,ENGINEERING_PAVING,ENGINEERING_REMNANTS,ENGINEERING_BOLLARDS,ENGINEERING_PLANTS} from './engineering-street-parts.js?v=eb4acc4e0f1c';
import {PATH_MATERIALS,pathGeometry,pathMaterial} from './path-materials.js?v=eb4acc4e0f1c';
import {MALL_PATH_IDS,MALL_PATTERN,MALL_LIGHT,mallPathKey,mallCoordinates,mallLightCandidates} from './mall-landscape-data.js?v=eb4acc4e0f1c';
import {MALL_GROUND,MALL_GREEN,MALL_PAVING,MALL_PAVING_MESH,MALL_GREEN_MESH,MALL_REMNANTS} from './mall-landscape-parts.js?v=eb4acc4e0f1c';
import {mallGreenOffset} from './mall-landscape.js?v=eb4acc4e0f1c';
import {TREE_INVENTORY} from './tree-inventory-data.js?v=eb4acc4e0f1c';
import {inventoryTree,inventoryTreeGeometry,treeClearsRoutes} from './tree-geometry.js?v=eb4acc4e0f1c';
import {SOUTHERN_SCOPE,SOUTHERN_FRAME,SOUTHERN_FIXTURES,inSouthernGround} from './southern-drive-data.js?v=eb4acc4e0f1c';
import {SOUTHERN_ROAD,SOUTHERN_PAVING,SOUTHERN_GRASS,SOUTHERN_PLANTING,SOUTHERN_HEDGES,SOUTHERN_MEDIAN,SOUTHERN_REFUGE,SOUTHERN_STRIPES,SOUTHERN_REMNANTS,SOUTHERN_BARKER_PAVING} from './southern-drive-parts.js?v=eb4acc4e0f1c';
import {BARKER_EAST_TREE,barkerEastGeometry,inBarkerEastGround} from './barker-east-data.js?v=eb4acc4e0f1c';
import {BARKER_EAST_HEDGES} from './barker-east-parts.js?v=eb4acc4e0f1c';
import {repositoryGeometry,repositoryTrees,inRepositoryYard} from './repository-data.js?v=eb4acc4e0f1c';
import {REPOSITORY_PAVING} from './repository-parts.js?v=eb4acc4e0f1c';
import {SPIRAL_STAIRS,SPIRAL_TREADS,spiralPoint,spiralGeometry,inSpiralGround,inSpiralSource} from './spiral-data.js?v=eb4acc4e0f1c';
import {SPIRAL_DECKS,SPIRAL_LANDINGS,SPIRAL_PAVING,SPIRAL_GROUND_CUTOUT,SPIRAL_REMOVED_TRIANGLES,SPIRAL_GROUND_EDGES} from './spiral-parts.js?v=eb4acc4e0f1c';
import {campusTerrainHeight as terrainHeight} from './old-main-entry-landscape.js?v=eb4acc4e0f1c';
import {websterWalkingHeight} from './webster-entry-landscape.js?v=eb4acc4e0f1c';
import {NIDA_SCHOOL_ID,nidaSchoolGeometry,nidaSchoolRoofHeight,nidaSchoolColumns,nidaSchoolBoundarySegments,inNidaSchoolGround} from './nida-school-data.js?v=eb4acc4e0f1c';
import {NIDA_SCHOOL_PARTS,NIDA_SCHOOL_COURTS,NIDA_SCHOOL_PAVING,NIDA_SCHOOL_GARDENS} from './nida-school-parts.js?v=eb4acc4e0f1c';
import {regimentHallGeometry,inRegimentHallCourt} from './regiment-hall-data.js?v=eb4acc4e0f1c';
import {libraryWalkGeometry,inLibraryCoveredWalk} from './library-walk-data.js?v=eb4acc4e0f1c';
import {LIBRARY_WALK_ROOFS,LIBRARY_WALK_CELLS,LIBRARY_WALK_PAVING} from './library-walk-parts.js?v=eb4acc4e0f1c';
import {mathewsPavilionsGeometry,inMathewsPavilions} from './mathews-pavilions-data.js?v=eb4acc4e0f1c';
import {MATHEWS_PAVILION_ROOFS,MATHEWS_PAVILION_STRIPS,MATHEWS_PAVILION_ROOMS,MATHEWS_PAVILION_PAVING} from './mathews-pavilions-parts.js?v=eb4acc4e0f1c';
import {newCollegeGeometry,inNewCollegeGround} from './new-college-data.js?v=eb4acc4e0f1c';
import {NEW_COLLEGE_PARTS,NEW_COLLEGE_FACES,NEW_COLLEGE_ROOFS,NEW_COLLEGE_COURT} from './new-college-parts.js?v=eb4acc4e0f1c';
import {shalomGeometry,inShalomGround} from './shalom-data.js?v=eb4acc4e0f1c';
import {SHALOM_PARTS,SHALOM_FACES,SHALOM_ROOFS,SHALOM_GARDEN,SHALOM_LIGHTWELLS} from './shalom-parts.js?v=eb4acc4e0f1c';
import {warraneGeometry,inWarraneGround} from './warrane-data.js?v=eb4acc4e0f1c';
import {WARRANE_PARTS,WARRANE_FACES,WARRANE_ROOFS,WARRANE_COURT} from './warrane-parts.js?v=eb4acc4e0f1c';
import {BANK_ID,BANK_STEPS_ID,bankGeometry,inBankForecourt} from './bank-data.js?v=eb4acc4e0f1c';
import {walkingSurfaceHeight,walkingDestination,priorityWalkingSurface} from './walking-surfaces.js?v=eb4acc4e0f1c';
import {pavilionDeckPatches} from './pavilion-walking.js?v=eb4acc4e0f1c';
import {pavilionGeometry,pavilionRibbon,inPavilionGround} from './pavilion-data.js?v=eb4acc4e0f1c';
import {PAVILION_PITCHED_ROOF,PAVILION_PARTS,PAVILION_FACES,PAVILION_BALCONY,PAVILION_LANDING,PAVILION_PAVING,PAVILION_APRON,PAVILION_SEATS,PAVILION_COLUMNS} from './pavilion-parts.js?v=eb4acc4e0f1c';
import {l5Geometry,inL5Court} from './l5-data.js?v=eb4acc4e0f1c';
import {L5_PARTS,L5_FACES,L5_DECK} from './l5-parts.js?v=eb4acc4e0f1c';
import { ncpvGeometry,inNcpvStreet } from './ncpv-data.js?v=eb4acc4e0f1c';
import { NCPV_PARTS,NCPV_FACES,NCPV_PAVING } from './ncpv-parts.js?v=eb4acc4e0f1c';
import { Reflector } from './vendor/Reflector.js?v=eb4acc4e0f1c';
import { goldsteinCourtGeometry,GOLDSTEIN_ART_POINT,inGoldsteinCourt } from './goldstein-courtyard-data.js?v=eb4acc4e0f1c';
import { goldsteinSculptureGeometry } from './goldstein-sculpture.js?v=eb4acc4e0f1c';
import { GOLDSTEIN_PAVING,GOLDSTEIN_STAIR_CHEEKS } from './goldstein-courtyard-parts.js?v=eb4acc4e0f1c';
import { terracesGeometry } from './terraces-data.js?v=eb4acc4e0f1c';
import { TERRACES_PARTS,TERRACES_FACES,TERRACES_PAVING } from './terraces-parts.js?v=eb4acc4e0f1c';
import { VILLAGE_FACADE,VILLAGE_AXIS,VILLAGE_CROSS } from './village-data.js?v=eb4acc4e0f1c';
import { VILLAGE_FACADES,VILLAGE_ENTRY_PAVING } from './village-facades.js?v=eb4acc4e0f1c';
import { VILLAGE_CAFE_ID,villageCafeGeometry } from './village-cafe-data.js?v=eb4acc4e0f1c';
import { VILLAGE_CAFE_DECK } from './village-cafe-parts.js?v=eb4acc4e0f1c';
import { regimentGeometry,REGIMENT_STREET,inRegimentStreet } from './regiment-data.js?v=eb4acc4e0f1c';
import { roundhouseEntryGeometry,inRoundhouseEntrance } from './roundhouse-entry.js?v=eb4acc4e0f1c';
import { ROUNDHOUSE_PLANE,ROUNDHOUSE_GARDEN_SEATS,roundDisc,inRoundhouseForecourt } from './roundhouse-landscape.js?v=eb4acc4e0f1c';
import { ROUNDHOUSE_ID, roundhouseGeometry } from './roundhouse-data.js?v=eb4acc4e0f1c';
import { ROUNDHOUSE_MAIN, ROUNDHOUSE_UPPER, ROUNDHOUSE_GROUND, ROUNDHOUSE_ROOFS, ROUNDHOUSE_DECK, ROUNDHOUSE_PARAPET, ROUNDHOUSE_STEPS, ROUNDHOUSE_PAVING, ROUNDHOUSE_CANOPY } from './roundhouse-parts.js?v=eb4acc4e0f1c';
import { WILLIS_LANE_COVER, WILLIS_LANE_PAVING, WILLIS_COVER_FRAME, WILLIS_ENTRY_CANOPY, WILLIS_ENTRY_PAVING } from './willis-parts.js?v=eb4acc4e0f1c';
import { ainsworthGeometry, inAinsworthGarden } from './ainsworth-data.js?v=eb4acc4e0f1c';
import { AINSWORTH_UPPER, AINSWORTH_GROUND, AINSWORTH_ROOFS, AINSWORTH_CANOPY, AINSWORTH_PAVING } from './ainsworth-parts.js?v=eb4acc4e0f1c';
import { mathewsGeometry, inMathewsForecourt } from './mathews-data.js?v=eb4acc4e0f1c';
import { MATHEWS_ROOFS, MATHEWS_LOWER, MATHEWS_TOWER, MATHEWS_ENTRY_FLOOR, MATHEWS_PODIUM_FACES } from './mathews-parts.js?v=eb4acc4e0f1c';
import { libraryGeometry, libraryFacadeRing } from './library-data.js?v=eb4acc4e0f1c';
import { tyreeGeometry, inTyreeForecourt, TYREE_REPLACED_STEPS } from './tyree-data.js?v=eb4acc4e0f1c';
import { TYREE_PARTS, TYREE_ROOFS, TYREE_PLATFORM, TYREE_STEPS, TYREE_APRON } from './tyree-parts.js?v=eb4acc4e0f1c';
import { blockhouseGeometry, inBlockhouseForecourt } from './blockhouse-data.js?v=eb4acc4e0f1c';
import { BLOCKHOUSE_PARTS, BLOCKHOUSE_ROOFS, BLOCKHOUSE_AWNING, BLOCKHOUSE_PAVING } from './blockhouse-parts.js?v=eb4acc4e0f1c';
import { morvenGeometry, inMorvenCourt } from './morven-brown-data.js?v=eb4acc4e0f1c';
import { MORVEN_PARTS, MORVEN_PAVING } from './morven-brown-parts.js?v=eb4acc4e0f1c';
import { squarehouseGeometry } from './squarehouse-data.js?v=eb4acc4e0f1c';
import { SQUAREHOUSE_PARTS } from './squarehouse-parts.js?v=eb4acc4e0f1c';
import { redCentreGeometry, inLawrenceForecourt } from './red-centre-data.js?v=eb4acc4e0f1c';
import { RED_CENTRE_PARTS, RED_CENTRE_ROOFS, RED_CENTRE_PAVING } from './red-centre-parts.js?v=eb4acc4e0f1c';
import { oldMainGeometry } from './old-main-data.js?v=eb4acc4e0f1c';
import { businessGeometry, businessCanopyFaces } from './business-data.js?v=eb4acc4e0f1c';
import { lawGeometry } from './law-data.js?v=eb4acc4e0f1c';
import { BASSER_STEP_IDS } from './basser-ground-parts.js?v=eb4acc4e0f1c';
import { quadrangleGeometry } from './quadrangle-data.js?v=eb4acc4e0f1c';
import { QUADRANGLE_PARTS } from './quadrangle-parts.js?v=eb4acc4e0f1c';
import { ELECTRICAL_LANDSCAPE as electricalGround, inElectricalCourt, courtGround, ELECTRICAL_REPLACED_STEPS } from './electrical-landscape.js?v=eb4acc4e0f1c';
import { ELECTRICAL_REMOVED_TRIANGLES, ELECTRICAL_GROUND_EDGES } from './electrical-landscape-parts.js?v=eb4acc4e0f1c';
import { electricalGeometry, ELECTRICAL_LEVELS } from './electrical-data.js?v=eb4acc4e0f1c';
import { REX_LINK_ID, rexGeometry, sdnGeometry } from './small-buildings-data.js?v=eb4acc4e0f1c';
import { BARKER_APARTMENTS_PARTS } from './barker-apartments-parts.js?v=eb4acc4e0f1c';
import { barkerApartmentsGeometry } from './barker-apartments-data.js?v=eb4acc4e0f1c';
import { vallentineGeometry } from './vallentine-data.js?v=eb4acc4e0f1c';
import { parkingGeometry, parkingEntry, parkingCars } from './parking-data.js?v=eb4acc4e0f1c';
import { esmeGeometry, scienceLabGeometry, scienceLinks } from './science-precinct-data.js?v=eb4acc4e0f1c';
import { poolGeometry, gymGeometry } from './aquatic-data.js?v=eb4acc4e0f1c';
import { newtonGeometry, keithGeometry, physicsGeometry } from './physics-precinct-data.js?v=eb4acc4e0f1c';
import { k17Geometry, willisGeometry, inWillisForecourt } from './engineering-lane-data.js?v=eb4acc4e0f1c';
import { RUPERT_ID, rupertGeometry } from './rupert-data.js?v=eb4acc4e0f1c';
import { RUPERT_PARTS } from './rupert-parts.js?v=eb4acc4e0f1c';
import * as THREE from './vendor/three.module.js?v=eb4acc4e0f1c';
import { terrainHeight as demHeight, buildingBase, TERRAIN_GRID } from './terrain.js?v=eb4acc4e0f1c';
import { buildingAppearance } from './visual-data.js?v=eb4acc4e0f1c';
import { CAMPUS_DETAILS } from './campus-details.js?v=eb4acc4e0f1c';
import { VILLAGE_SPORTS } from './sports-data.js?v=eb4acc4e0f1c';
import { theatreGeometry } from './architecture-data.js?v=eb4acc4e0f1c';
import { NIDA_PARTS } from './nida-parts.js?v=eb4acc4e0f1c';
import { CHEMICAL_PARTS } from './chemical-parts.js?v=eb4acc4e0f1c';
import { tubeFaces } from './structure-data.js?v=eb4acc4e0f1c';
import { clancyGeometry, chancelleryGeometry } from './upper-campus-data.js?v=eb4acc4e0f1c';
import { CHANCELLERY_ROOFS } from './chancellery-roofs.js?v=eb4acc4e0f1c';
import { bioscienceGeometry, mathewsTheatreGeometry } from './bioscience-data.js?v=eb4acc4e0f1c';
import { BIOSCIENCE_PARTS } from './bioscience-parts.js?v=eb4acc4e0f1c';
import { medicalGeometry } from './medical-data.js?v=eb4acc4e0f1c';
import { sirfGeometry, agsmGeometry } from './eastern-landmarks-data.js?v=eb4acc4e0f1c';
import { civilGeometry, patriciaGeometry, lectureFacadeRing } from './lecture-precinct-data.js?v=eb4acc4e0f1c';
import { samuelsGeometry, goodsellGeometry } from './eastern-faculty-data.js?v=eb4acc4e0f1c';
import { MEDICAL_PARTS, MEDICAL_GROUND_FLOORS } from './medical-parts.js?v=eb4acc4e0f1c';
import { RESIDENTIAL_PARTS } from './residential-parts.js?v=eb4acc4e0f1c';
import { heritageGeometry, whiteHouseStair, goldsteinGeometry } from './heritage-data.js?v=eb4acc4e0f1c';
import { scienceTheatreGeometry, modernFacadeFrame, scienceTheatreFoundation, websterTheatresGeometry } from './modernism-data.js?v=eb4acc4e0f1c';
import { orientedFrame, framePoint, frameRectangle, roundedFrameRectangle, clipFrameStrip } from './geometry.js?v=eb4acc4e0f1c';

// Everything is measured in metres. East is +x; south is +z.
const UP = new THREE.Vector3(0, 1, 0);
const TAU = Math.PI * 2;
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const distance2 = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);
const point = (p) => Array.isArray(p) ? { x: p[0], z: p[1] } : p;

function polygonArea(points) {
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const a = points[i], b = points[(i + 1) % points.length];
    area += a.x * b.z - b.x * a.z;
  }
  return area / 2;
}

function inPolygon(x, z, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[i], b = points[j];
    if (((a.z > z) !== (b.z > z)) && x < (b.x - a.x) * (z - a.z) / (b.z - a.z) + a.x) inside = !inside;
  }
  return inside;
}

function nearestOnSegment(x, z, a, b) {
  const dx = b.x - a.x, dz = b.z - a.z;
  const t = clamp(((x - a.x) * dx + (z - a.z) * dz) / (dx * dx + dz * dz || 1), 0, 1);
  return { x: a.x + dx * t, z: a.z + dz * t, t };
}

function circleTouchesPolygon(x, z, radius, points, holes = []) {
  if (inPolygon(x, z, points) && !holes.some(hole => inPolygon(x, z, hole))) return true;
  for (const loop of [points, ...holes]) {
    for (let i = 0; i < loop.length; i++) {
      const q = nearestOnSegment(x, z, loop[i], loop[(i + 1) % loop.length]);
      if (Math.hypot(x - q.x, z - q.z) < radius) return true;
    }
  }
  return false;
}

function extent(points) {
  const xs = points.map(p => p.x), zs = points.map(p => p.z);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minZ = Math.min(...zs), maxZ = Math.max(...zs);
  return { minX, maxX, minZ, maxZ, x: (minX + maxX) / 2, z: (minZ + maxZ) / 2, width: maxX - minX, depth: maxZ - minZ };
}

function rng(seed = 48271) {
  return () => { seed = (Math.imul(seed, 1664525) + 1013904223) | 0; return (seed >>> 0) / 4294967296; };
}

// Small triangle batches keep the campus inexpensive even with all its windows.
class Batch {
  constructor() { this.positions = []; this.colors = []; this.uvs = []; this.base = null; }
  triangle(a, b, c, color, uv = null) {
    const col = color instanceof THREE.Color ? color : new THREE.Color(color);
    for (let i = 0; i < 3; i++) {
      const p = [a, b, c][i];
      this.positions.push(p[0], p[1] + (this.base ?? terrainHeight(p[0],p[2])), p[2]);
      this.colors.push(col.r, col.g, col.b);
      this.uvs.push(...(uv?.[i] || [p[0] / 2, p[2] / 2]));
    }
  }
  quad(a, b, c, d, color, uv = null) { this.triangle(a, b, c, color, uv && [uv[0],uv[1],uv[2]]); this.triangle(a, c, d, color, uv && [uv[0],uv[2],uv[3]]); }
  box(x, y, z, width, height, depth, color, angle = 0) {
    const co = Math.cos(angle), si = Math.sin(angle);
    const v = (a, b, c) => [x + a * co + c * si, y + b, z - a * si + c * co];
    const w = width / 2, h = height / 2, d = depth / 2;
    const a = v(-w,-h,-d), b = v(w,-h,-d), c = v(w,h,-d), e = v(-w,h,-d);
    const f = v(-w,-h,d), g = v(w,-h,d), i = v(w,h,d), j = v(-w,h,d);
    // Local face UVs keep vertical masonry / concrete surfaces from sampling
    // a single horizontal texture row and stretching it into vertical stripes.
    const uw=width/2,uh=height/2,ud=depth/2;
    this.quad(a,e,c,b,color,[[0,0],[0,uh],[uw,uh],[uw,0]]);
    this.quad(f,g,i,j,color,[[0,0],[uw,0],[uw,uh],[0,uh]]);
    this.quad(a,f,j,e,color,[[0,0],[ud,0],[ud,uh],[0,uh]]);
    this.quad(b,c,i,g,color,[[0,0],[0,uh],[ud,uh],[ud,0]]);
    this.quad(e,j,i,c,color,[[0,0],[0,ud],[uw,ud],[uw,0]]);
    this.quad(a,b,g,f,color,[[0,0],[uw,0],[uw,ud],[0,ud]]);
  }
  mesh(material, castShadow = true) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(this.colors, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(this.uvs, 2));
    geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, material);
    mesh.castShadow = castShadow; mesh.receiveShadow = true;
    return mesh;
  }
}

function polygon(batch, points, y, color, holes = [], down = false) {
  if (points.length < 3) return;
  const contour = points.map(p => new THREE.Vector2(p.x, p.z));
  const holeContours = holes.map(hole => hole.map(p => new THREE.Vector2(p.x, p.z)));
  const allPoints = [...points, ...holes.flat()];
  for (const [a,b,c] of THREE.ShapeUtils.triangulateShape(contour, holeContours)) {
    const vertices = (down?[a,b,c]:[a,c,b]).map(i=>[allPoints[i].x,y,allPoints[i].z]);
    const subdivide=(v,depth=0)=>{
      const lengths=v.map((p,i)=>Math.hypot(p[0]-v[(i+1)%3][0],p[2]-v[(i+1)%3][2]));
      if(batch.base!==null||Math.max(...lengths)<3||depth>11){batch.triangle(...v,color);return;}
      const edge=lengths.indexOf(Math.max(...lengths)),next=(edge+1)%3,other=(edge+2)%3;
      const mid=v[edge].map((n,i)=>(n+v[next][i])/2);
      subdivide([v[edge],mid,v[other]],depth+1);subdivide([mid,v[next],v[other]],depth+1);
    };
    subdivide(vertices);
  }
}

function shapedRoof(batch,points,heightAt,color,holes=[]){
  const contour=points.map(p=>new THREE.Vector2(p.x,p.z)),holeContours=holes.map(r=>r.map(p=>new THREE.Vector2(p.x,p.z))),all=[...points,...holes.flat()];
  const triangle=(a,b,c)=>{
    if(Math.max(distance2(a,b),distance2(b,c),distance2(c,a))>.65){
      const ab={x:(a.x+b.x)/2,z:(a.z+b.z)/2},bc={x:(b.x+c.x)/2,z:(b.z+c.z)/2},ca={x:(c.x+a.x)/2,z:(c.z+a.z)/2};
      triangle(a,ab,ca);triangle(ab,b,bc);triangle(ca,bc,c);triangle(ab,bc,ca);return;
    }
    batch.triangle(...[a,b,c].map(p=>[p.x,heightAt(p),p.z]),color);
  };
  for(const [a,b,c] of THREE.ShapeUtils.triangulateShape(contour,holeContours))triangle(all[a],all[c],all[b]);
}

function batchBeam(batch,a,b,r,color){
  for(const face of tubeFaces(a,b,r,4,false))batch.quad(...face,color);
}

function batchPipe(batch,a,b,r,color){
  for(const face of tubeFaces(a,b,r,8,true)){
    if(face.length===3)batch.triangle(...face,color);else batch.quad(...face,color);
  }
}

function ribbon(batch, points, width, y, color) {
  if(points.length<2)return;
  const sampled=[];
  for(let i=0;i<points.length-1;i++){
    const a=points[i],b=points[i+1],count=Math.max(1,Math.ceil(distance2(a,b)));
    for(let k=0;k<count;k++)sampled.push({x:a.x+(b.x-a.x)*k/count,z:a.z+(b.z-a.z)*k/count});
  }
  sampled.push(points.at(-1));
  const across=Math.max(1,Math.ceil(width)),rows=[];
  for(let i=0;i<sampled.length;i++){
    const p=sampled[i],a=sampled[Math.max(0,i-1)],b=sampled[Math.min(sampled.length-1,i+1)];
    const dx=b.x-a.x,dz=b.z-a.z,length=Math.hypot(dx,dz)||1,nx=-dz/length,nz=dx/length;
    const row=[];
    for(let j=0;j<=across;j++){const offset=(j/across-.5)*width;row.push([p.x+nx*offset,y,p.z+nz*offset]);}
    rows.push(row);
  }
  for(let i=0;i<rows.length-1;i++)for(let j=0;j<across;j++)batch.quad(rows[i][j+1],rows[i+1][j+1],rows[i+1][j],rows[i][j],color);
}

function canvasTexture(width, height, draw) {
  const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
  draw(canvas.getContext('2d'), width, height);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function brickTexture() {
  return canvasTexture(512, 512, (ctx) => {
    const random = rng(17);
    ctx.fillStyle = '#a9a296'; ctx.fillRect(0,0,512,512);
    for (let row = 0; row < 16; row++) {
      for (let col = -1; col < 9; col++) {
        const l = 50 + random()*13;
        ctx.fillStyle = `hsl(${19+random()*8} 26% ${l}%)`;
        ctx.fillRect(col*64+(row%2)*32+1,row*32+1,62,30);
      }
    }
    ctx.fillStyle = '#fff2';
    for (let i = 0; i < 8000; i++) ctx.fillRect(random()*512,random()*512,1,1);
  });
}

function clinkerTexture() {
  return canvasTexture(512,512,ctx=>{
    const random=rng(718);ctx.fillStyle='#a9a9a1';ctx.fillRect(0,0,512,512);
    const bh=512/26,bw=512/9;
    for(let row=0;row<26;row++)for(let col=-1;col<10;col++){
      const light=71+Math.floor(random()*4)*4+random()*3;
      ctx.fillStyle=`hsl(${24+random()*12} ${3+random()*9}% ${light}%)`;
      ctx.fillRect(col*bw+(row%2)*bw/2+.8,row*bh+.8,bw-1.6,bh-1.6);
    }
    for(let i=0;i<14000;i++){ctx.fillStyle=random()>.5?'#ffffff18':'#34332d15';ctx.fillRect(random()*512,random()*512,1,1);}
  });
}

function copperShingles(){
  const texture=canvasTexture(512,512,ctx=>{
    const random=rng(390);ctx.fillStyle='#c4a256';ctx.fillRect(0,0,512,512);
    for(let row=-1;row<=CLANCY_COPPER.rows;row++)for(let col=-1;col<=CLANCY_COPPER.diamondsAcross;col++){
      const x=col*64+(row%2)*32,y=row*32,light=57+random()*13;
      ctx.beginPath();ctx.moveTo(x,y-32);ctx.lineTo(x+32,y);ctx.lineTo(x,y+32);ctx.lineTo(x-32,y);ctx.closePath();
      ctx.fillStyle=`hsl(${39+random()*7} ${42+random()*17}% ${light}%)`;ctx.fill();ctx.strokeStyle='#7e622c88';ctx.lineWidth=1;ctx.stroke();
    }
  });texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.anisotropy=8;return texture;
}

const surfaceCache = new Map();
function surfaceTexture(kind) {
  if(surfaceCache.has(kind))return surfaceCache.get(kind);
  const texture=canvasTexture(512,512,ctx=>{
    const random=rng(kind==='brick'?200:kind==='paving'?300:400);
    if(kind.startsWith('path-')){
      ctx.fillStyle=kind==='path-asphalt'?'#d1d3ce':kind==='path-timber'?'#b5a78b':'#d6d3c7';ctx.fillRect(0,0,512,512);
      if(kind==='path-concrete'||kind==='path-plates'){
        ctx.strokeStyle=kind==='path-plates'?'#7d8176':'#b9bbae';ctx.lineWidth=kind==='path-plates'?3:1;
        for(const x of kind==='path-plates'?[0,256,512]:[0,512]){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,512);ctx.stroke();}ctx.strokeRect(0,0,512,512);
      }
      if(kind==='path-pavers')for(let row=0;row<10;row++)for(let col=-1;col<6;col++){ctx.fillStyle=`hsl(${27+random()*8} ${3+random()*5}% ${77+random()*13}%)`;ctx.fillRect(col*102.4+(row%2)*51.2+1,row*51.2+1,100.4,49.2);}
      if(kind==='path-interlocking'){
        ctx.fillStyle='#91938b';ctx.fillRect(0,0,512,512);const bw=51.2,bh=25.6;
        for(let row=0;row<20;row++)for(let col=-1;col<11;col++){
          const boundary=n=>{const x=n*bw+(row%2)*bw/2,y=row*bh,neck=((n+row)%2?1:-1)*bw*.13;return [[x,y],[x,y+bh*.25],[x+neck,y+bh*.25],[x+neck,y+bh*.75],[x,y+bh*.75],[x,y+bh]];},ring=[...boundary(col),...boundary(col+1).reverse()];
          ctx.beginPath();ring.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fillStyle=`hsl(${16+random()*14} ${3+random()*6}% ${76+random()*13}%)`;ctx.fill();ctx.strokeStyle='#81847a';ctx.lineWidth=1.2;ctx.stroke();
        }
      }
      if(kind==='path-pebble')for(let i=0;i<4500;i++){ctx.beginPath();ctx.ellipse(random()*512,random()*512,2+random()*5,2+random()*5,random()*Math.PI,0,TAU);const light=56+random()*35;ctx.fillStyle=`hsl(${28+random()*20} ${5+random()*11}% ${light}%)`;ctx.fill();ctx.strokeStyle='#696a5f35';ctx.lineWidth=.7;ctx.stroke();}
      if(kind==='path-timber')for(let col=0;col<14;col++){
        const x=col*512/14,w=512/14;ctx.fillStyle=`hsl(${31+random()*6} ${13+random()*14}% ${65+random()*15}%)`;ctx.fillRect(x+1,0,w-2,512);
        for(let i=0;i<10;i++){ctx.strokeStyle=i%2?'#ffffff28':'#5249343b';ctx.lineWidth=.5+random();const gx=x+2+random()*(w-4);ctx.beginPath();ctx.moveTo(gx,0);ctx.bezierCurveTo(gx+random()*5,150,gx-random()*5,320,gx,512);ctx.stroke();}
      }
      for(let i=0;i<32000;i++){ctx.fillStyle=i%2?'#ffffff20':'#32362c22';ctx.fillRect(random()*512,random()*512,.6+random()*.8,.6+random()*.8);}return;
    }
    ctx.fillStyle=kind==='brick'?'#b6b3a7':kind==='grass'?'#a7b195':'#d7d6cc';ctx.fillRect(0,0,512,512);
    if(kind==='paving'||kind==='brick'){
      const rows=kind==='brick'?24:5,cols=kind==='brick'?9:3,bw=512/cols,bh=512/rows;
      for(let row=0;row<rows;row++)for(let col=-1;col<cols+1;col++){
        const light=(kind==='brick'?80:82)+random()*12;
        ctx.fillStyle=`hsl(${kind==='brick'?33:28} ${kind==='brick'?9:7}% ${light}%)`;
        ctx.fillRect(col*bw+(row%2)*bw/2+1,row*bh+1,bw-2,bh-2);
      }
    }
    if(kind==='bark')for(let i=0;i<180;i++){
      ctx.fillStyle=['#a9a99b','#8e9487','#c0bfb0','#aaa491'][i%4];ctx.beginPath();ctx.ellipse(random()*512,random()*512,8+random()*25,15+random()*70,random(),0,TAU);ctx.fill();
    }
    if(kind==='aggregate')for(let i=0;i<42000;i++){
      const light=42+random()*50;ctx.fillStyle=`hsl(${27+random()*12} ${5+random()*12}% ${light}%)`;
      ctx.fillRect(random()*512,random()*512,.5+random()*2,.5+random()*2);
    }
    for(let i=0;i<24000;i++){
      const c=kind==='grass'?90+random()*80:random()>.5?255:70;
      ctx.fillStyle=kind==='grass'?`rgba(${c*.8},${c},${c*.63},.2)`:`rgba(${c},${c},${c},${kind==='concrete'?.05:.07})`;
      ctx.fillRect(random()*512,random()*512,random()*2+.4,kind==='grass'?random()*5+1:random()*2+.4);
    }
    if(kind==='concrete'){
      ctx.strokeStyle='#77777717';ctx.lineWidth=1;
      for(let y=0;y<512;y+=128){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(512,y);ctx.stroke();}
    }
  });
  texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.anisotropy=8;surfaceCache.set(kind,texture);return texture;
}

const foliageCache=new Map();
function foliageTexture(kind='broad'){
  if(foliageCache.has(kind))return foliageCache.get(kind);
  const texture=canvasTexture(256,256,ctx=>{
    ctx.clearRect(0,0,256,256);
    for(const p of foliageSprites(kind)){
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);
      ctx.fillStyle=`hsl(90 22% ${p.light}%)`;
      ctx.beginPath();ctx.ellipse(0,0,p.rx,p.ry,0,0,TAU);ctx.fill();
      if(kind!=='needle'){ctx.strokeStyle='#4e674c55';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(0,-p.ry*.7);ctx.lineTo(0,p.ry*.7);ctx.stroke();}
      ctx.restore();
    }
  });
  foliageCache.set(kind,texture);return texture;
}

const daltonMosaicCache=new Map();
function daltonMosaicTexture(kind){
  if(daltonMosaicCache.has(kind))return daltonMosaicCache.get(kind);
  const texture=canvasTexture(1024,664,(ctx,w,h)=>{
    const art=daltonMosaicComposition(kind);ctx.fillStyle=art.background;ctx.fillRect(0,0,w,h);ctx.save();ctx.scale(w,h);
    for(const shape of art.shapes){ctx.fillStyle=ctx.strokeStyle=shape.color;ctx.beginPath();
      if(shape.type==='ellipse')ctx.ellipse(shape.x,shape.y,shape.rx,shape.ry,shape.rotation,0,TAU);
      else{shape.points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));if(shape.type==='polygon')ctx.closePath();}
      if(shape.type==='line'){ctx.lineWidth=shape.width;ctx.lineJoin='round';ctx.stroke();}else ctx.fill();
    }
    ctx.restore();
    // Sample only this original vector drawing, then rebuild it as tesserae.
    // No remote photograph, pixel sampling or source-image texture is used.
    const pixels=ctx.getImageData(0,0,w,h).data,random=rng(1958+kind.length),cols=284,rows=184,cw=w/cols,ch=h/rows;
    ctx.fillStyle='#a4b6a4';ctx.fillRect(0,0,w,h);
    for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
      const px=Math.min(w-1,Math.floor((x+.5)*cw)),py=Math.min(h-1,Math.floor((y+.5)*ch)),offset=(py*w+px)*4,light=(random()-.5)*34,pale=random()<.035?35:0;
      ctx.fillStyle=`rgb(${clamp(pixels[offset]+light+pale,0,255)} ${clamp(pixels[offset+1]+light+pale,0,255)} ${clamp(pixels[offset+2]+light+pale,0,255)})`;ctx.save();ctx.translate((x+.5)*cw,(y+.5)*ch);ctx.rotate((random()-.5)*.11);ctx.fillRect(-cw*.47,-ch*.47,cw*.94,ch*.94);ctx.restore();
    }
  });texture.anisotropy=8;daltonMosaicCache.set(kind,texture);return texture;
}

function textTexture(title, subtitle = '') {
  return canvasTexture(640,1024,(ctx,w,h)=>{
    ctx.fillStyle='#293b3b';ctx.fillRect(0,0,w,h);ctx.fillStyle='#e0b844';ctx.fillRect(0,0,22,h);
    ctx.fillStyle='#f0f0e7';ctx.font='700 65px sans-serif';ctx.fillText('UNSW',60,118);
    ctx.fillStyle='#e0b844';ctx.font='600 52px sans-serif';ctx.fillText(subtitle||'KENSINGTON',60,210,520);
    ctx.strokeStyle='#9ca39b66';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(60,270);ctx.lineTo(580,270);ctx.stroke();
    ctx.fillStyle='#f1f1e8';ctx.font='500 56px sans-serif';let line='',y=365;
    for(const word of title.split(' ')){
      if(ctx.measureText(line+word).width>510&&line){ctx.fillText(line,60,y);y+=78;line='';}
      line+=word+' ';
    }
    ctx.fillText(line,60,y);ctx.font='42px sans-serif';ctx.fillText('Campus map',60,900);ctx.fillText('↗',520,900);
  });
}

export function createGame({ canvas, minimap, onUpdate = () => {}, onError = () => {} }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = .94;
  const scene = new THREE.Scene();
  const lighting=createCampusLighting({THREE,renderer,scene,canvasTexture});
  const camera = new THREE.PerspectiveCamera(68, 1, .08, 950); camera.rotation.order = 'YXZ';

  let world = new THREE.Group(); scene.add(world);
  let stairSegments=[],surfaceCells=new Map(),groundPatches=[],forestTrees=[],mallLightCount=0;
  let campus = null, buildings = [], paths = [], greens = [], landmarks = [], bounds = null;
  let colliders = [], spatial = new Map(), spawn = {x:0,z:0,heading:Math.PI/2};
  let paused = true, hidden = false, destroyed = false, locked = false, dragging = false, timeOfDay = 'day', hasStarted = false;
  let player = {x:0,y:0,z:0,vx:0,vz:0,vy:0,heading:Math.PI/2,pitch:0,grounded:true};
  let totalDistance = 0, lastFrame = performance.now(), reportTime = 0, elapsed = 0, animation = 0;
  let curiosities = [], found = new Set(), ball = null, ballSpawn = null, lastInteraction = '';
  let minimapBase = null, minimapInfo = null, shadowAnchor = { x:1e6,z:1e6 };
  const campusReflections=[],campusPlanarReflections=[];
  const inputs = {forward:false,backward:false,left:false,right:false,sprint:false};
  const listeners = [];
  const listen = (target,type,fn,options) => { target.addEventListener(type,fn,options); listeners.push(() => target.removeEventListener(type,fn,options)); };
  const style = (color, extras={}) => new THREE.MeshStandardMaterial({color,roughness:.88,flatShading:false,envMapIntensity:.35,...extras});
  const pointCache = new WeakMap();
  const validPoints = (item) => {
    if(pointCache.has(item))return pointCache.get(item);
    const points=(item.points || item.polygon || item.coordinates || []).map(point).filter(p => Number.isFinite(p.x) && Number.isFinite(p.z));
    pointCache.set(item,points);return points;
  };

  function addCollider(c) {
    const e = c.points ? extent(c.points) : {minX:c.x-c.radius,maxX:c.x+c.radius,minZ:c.z-c.radius,maxZ:c.z+c.radius};
    const base=c.base ?? (c.points?buildingBase(c.points):terrainHeight(c.x,c.z));
    c.bottom=(c.bottom||0)+base;c.top=(c.top||100)+base;
    c.extent = e; const index = colliders.push(c)-1;
    for (let x = Math.floor(e.minX/20); x <= Math.floor(e.maxX/20); x++) {
      for (let z = Math.floor(e.minZ/20); z <= Math.floor(e.maxZ/20); z++) {
        const key = `${x},${z}`; if (!spatial.has(key)) spatial.set(key,[]); spatial.get(key).push(index);
      }
    }
  }

  function nearbyColliders(x,z,radius=.5) {
    const result = new Set();
    for (let gx=Math.floor((x-radius)/20);gx<=Math.floor((x+radius)/20);gx++) {
      for (let gz=Math.floor((z-radius)/20);gz<=Math.floor((z+radius)/20);gz++) {
        for (const index of spatial.get(`${gx},${gz}`)||[]) result.add(colliders[index]);
      }
    }
    return result;
  }

  function blocked(x,z,y=null,radius=.34) {
    y=y??terrainHeight(x,z);
    if (!bounds || x < bounds.minX+1 || x > bounds.maxX-1 || z < bounds.minZ+1 || z > bounds.maxZ-1) return true;
    for (const c of nearbyColliders(x,z,radius)) {
      if (y >= colliderTop(c,x,z)-(c.stepHeight||.1) || y+1.65 <= colliderBottom(c,x,z)+.03) continue;
      if (c.points ? circleTouchesPolygon(x,z,radius,c.points,c.holes) : Math.hypot(x-c.x,z-c.z) < radius+c.radius) return true;
    }
    return false;
  }

  function colliderTop(c,x,z){return c.terrainOffset!==undefined?terrainHeight(x,z)+c.terrainOffset:c.top;}
  function colliderBottom(c,x,z){return c.terrainBottom!==undefined?terrainHeight(x,z)+c.terrainBottom:(c.bottom||0);}

  function clearInputs() { for (const key in inputs) inputs[key]=false; dragging=false; }
  function surfaceHeight(x,z,referenceY=player.y){
    const catherine=catherineCourtHeight(x,z,referenceY);if(catherine!==undefined)return catherine;
    const webster=websterWalkingHeight(x,z);if(webster!==undefined)return webster;
    const agsm=agsmCourtHeight(x,z);if(agsm!==undefined)return agsm;
    const lowy=lowyStreetPavingHeight(x,z);if(lowy!==undefined)return lowy;
    const bio=bioStreetWalkingHeight(x,z);if(bio!==undefined)return bio;
    if(inElectricalCourt(x,z))return courtGround(x,z)+.22;
    const raised=priorityWalkingSurface(groundPatches,x,z,referenceY,inPolygon);
    if(raised!==undefined)return raised;
    for(const s of stairSegments){
      const q=nearestOnSegment(x,z,s.a,s.b);
      if(Math.hypot(x-q.x,z-q.z)<=s.width/2+.04){
        return s.h0+(s.h1-s.h0)*(s.continuous?q.t:Math.floor(q.t*s.count)/s.count)+.06;
      }
    }
    let offset=0;
    for(const plaza of campus?.plazas||[])if(plaza.surface==='stone'&&inPolygon(x,z,plaza.points)&&!(plaza.holes||[]).some(h=>inPolygon(x,z,h)))offset=.22;
    for(const garden of greens)if(garden.raisedBy&&inPolygon(x,z,garden.points))offset=Math.max(offset,garden.raisedBy);
    for(const s of surfaceCells.get(`${Math.floor(x/20)},${Math.floor(z/20)}`)||[]){
      const q=nearestOnSegment(x,z,s.a,s.b);
      if(Math.hypot(x-q.x,z-q.z)<=s.width/2)offset=Math.max(offset,s.road?.055:.22);
    }
    return walkingSurfaceHeight(terrainHeight(x,z)+offset,groundPatches,x,z,referenceY,inPolygon);
  }
  function safePoint(desired) {
    if (!blocked(desired.x,desired.z,surfaceHeight(desired.x,desired.z,desired.walkFloor??terrainHeight(desired.x,desired.z)))) return desired;
    for (let radius=1;radius<90;radius+=radius<10?1:2) for (let i=0;i<24;i++) {
      const p={...desired,x:desired.x+Math.cos(i/24*TAU)*radius,z:desired.z+Math.sin(i/24*TAU)*radius};
      if (!blocked(p.x,p.z,surfaceHeight(p.x,p.z,p.walkFloor??terrainHeight(p.x,p.z)))) return p;
    }
    return {...spawn};
  }

  function groundAndPaths() {
    const grid=TERRAIN_GRID,pad=65,gx=grid.cols-1+pad*2,gz=grid.rows-1+pad*2;
    const groundGeo=new THREE.PlaneGeometry(gx*grid.dx,gz*grid.dz,gx,gz);groundGeo.rotateX(-Math.PI/2);groundGeo.translate(grid.x0+(grid.cols-1)*grid.dx/2,0,grid.z0+(grid.rows-1)*grid.dz/2);
    const groundVertices=groundGeo.getAttribute('position');
    for(let i=0;i<groundVertices.count;i++)groundVertices.setY(i,demHeight(groundVertices.getX(i),groundVertices.getZ(i))-.08);
    // Exact clipped DEM boundaries avoid stretching coarse terrain triangles
    // across the reconstructed court and through the visible bleacher floors.
    const removed=new Set([...AGSM_COURT_REMOVED_TRIANGLES,...WEBSTER_REMOVED_TRIANGLES,...SCIENTIA_STEP_REMOVED_TRIANGLES,...ELECTRICAL_REMOVED_TRIANGLES,...SPIRAL_REMOVED_TRIANGLES,...OLD_MAIN_ENTRY_REMOVED_TRIANGLES].map(([col,row,i])=>((row+pad)*gx+col+pad)*2+i));
    const oldIndex=groundGeo.index.array,kept=[];
    for(let triangle=0;triangle<oldIndex.length/3;triangle++)if(!removed.has(triangle))kept.push(...oldIndex.subarray(triangle*3,triangle*3+3));
    groundGeo.setIndex(kept);groundGeo.computeVertexNormals();
    const groundTexture=surfaceTexture('grass');groundTexture.repeat.set(280,190);
    const ground = new THREE.Mesh(groundGeo,style('#82916b',{map:groundTexture,flatShading:false}));
    ground.receiveShadow=true; world.add(ground);
    const groundEdges=new Batch();groundEdges.base=0;
    for(const part of [...AGSM_COURT_GROUND_EDGES,...WEBSTER_GROUND_EDGES,...SCIENTIA_STEP_GROUND_EDGES,...ELECTRICAL_GROUND_EDGES,...SPIRAL_GROUND_EDGES,...OLD_MAIN_ENTRY_GROUND_EDGES]){
      const all=[...part.points,...part.holes.flat()],contour=part.points.map(p=>new THREE.Vector2(p.x,p.z)),holes=part.holes.map(r=>r.map(p=>new THREE.Vector2(p.x,p.z)));
      for(const [a,b,c] of THREE.ShapeUtils.triangulateShape(contour,holes))groundEdges.triangle(...[a,c,b].map(i=>[all[i].x,demHeight(all[i].x,all[i].z)-.08,all[i].z]),'#82916b');
    }
    world.add(groundEdges.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('grass')}),false));
    const landscape = new Batch(), paving = new Batch(), edges = new Batch(),stairs=new Batch(),rails=new Batch(),pathMaterials=new Map(Object.keys(PATH_MATERIALS).map(key=>[key,new Batch()]));
    stairs.base=rails.base=0;
    for (const green of greens) {
      const pts=validPoints(green); if (pts.length<3) continue;
      const sport=/pitch|sport|village|field/i.test(`${green.kind} ${green.name} ${green.id}`);
      for(const part of CATHERINE_REMNANTS.greens[green.id]||AGSM_COURT_REMNANTS.greens[green.id]||WEBSTER_REMNANTS.greens[green.id]||SCIENTIA_STEP_REMNANTS.greens[green.id]||OLD_MAIN_FRONT_REMNANTS.greens[green.id]||CHANCELLOR_REMNANTS.greens[green.id]||OLD_NORTH_REMNANTS.greens[green.id]||OLD_MAIN_ENTRY_REMNANTS.greens[green.id]||MALL_REMNANTS.greens[green.id]||SOUTHERN_REMNANTS.greens[green.id]||[{points:pts,holes:green.holes||[]}])polygon(landscape,part.points,green.raisedBy||.005,sport?'#739a70':'#9daf89',part.holes);
      if(green.raisedBy)addCollider({points:pts,top:green.raisedBy,base:0,terrainOffset:green.raisedBy});
    }
    for(const plaza of campus.plazas||[])for(const part of CATHERINE_REMNANTS.plazas[plaza.id]||AGSM_COURT_REMNANTS.plazas[plaza.id]||WEBSTER_REMNANTS.plazas[plaza.id]||SCIENTIA_STEP_REMNANTS.plazas[plaza.id]||OLD_MAIN_FRONT_REMNANTS.plazas[plaza.id]||CHANCELLOR_REMNANTS.plazas[plaza.id]||OLD_NORTH_REMNANTS.plazas[plaza.id]||OLD_MAIN_ENTRY_REMNANTS.plazas[plaza.id]||MALL_REMNANTS.plazas[plaza.id]||SOUTHERN_REMNANTS.plazas[plaza.id]||[plaza])polygon(plaza.surface==='stone'?paving:edges,part.points,plaza.surface==='stone'?.22:.022,plaza.color||'#d6d1c6',part.holes||[]);
    for (const path of paths) {
      const pts=validPoints(path); if(pts.length<2) continue;
      const appearance=pathMaterial(path),{road,width,height}=appearance,profile=PATH_MATERIALS[appearance.material],batch=pathMaterials.get(appearance.material);
      if(path.kind!=='steps'){
        const remnant=CATHERINE_REMNANTS.paths[mallPathKey(path)]||WEBSTER_REMNANTS.paths[mallPathKey(path)]||SCIENTIA_STEP_REMNANTS.paths[mallPathKey(path)]||OLD_MAIN_FRONT_REMNANTS.paths[mallPathKey(path)]||CHANCELLOR_REMNANTS.paths[mallPathKey(path)]||OLD_NORTH_REMNANTS.paths[mallPathKey(path)]||ENGINEERING_REMNANTS.paths[mallPathKey(path)]||MALL_REMNANTS.paths[mallPathKey(path)]||SOUTHERN_REMNANTS.paths[path.id];
        if(remnant){for(const part of remnant.edge)polygon(edges,part.points,.035,road?'#d9d6c7':'#b0aea0',part.holes);for(const part of remnant.surface)polygon(batch,part.points,height,profile.color,part.holes);}
        else{ribbon(edges,pts,width+.5,.035,road?'#d9d6c7':'#b0aea0');ribbon(batch,pts,width,height,profile.color);}
      }

    }
    for(const s of stairSegments){
      const dx=s.b.x-s.a.x,dz=s.b.z-s.a.z,len=Math.hypot(dx,dz),nx=-dz/len,nz=dx/len;
      for(let i=0;i<s.count;i++){
        const t=i/s.count,u=(i+1)/s.count,h=s.h0+(s.h1-s.h0)*t+.05,previous=s.h0+(s.h1-s.h0)*Math.max(0,i-1)/s.count+.05;
        const p=(v,side,y)=>[s.a.x+dx*v+nx*s.width/2*side,y,s.a.z+dz*v+nz*s.width/2*side];
        stairs.quad(p(t,1,h),p(u,1,h),p(u,-1,h),p(t,-1,h),'#b5b3a7');
        stairs.quad(p(t,1,previous),p(t,1,h),p(t,-1,h),p(t,-1,previous),'#93958c');
        if(BASSER_STEP_IDS.includes(s.pathId)){
          for(const side of [-1,1]){
            const a=p(t,side,h),b=p(u,side,h),lo=Math.min(h,terrainHeight(a[0],a[2]),terrainHeight(b[0],b[2]))-.2,ha=Math.max(h,terrainHeight(a[0],a[2])+.02),hb=Math.max(h,terrainHeight(b[0],b[2])+.02),v=[[a[0],lo,a[2]],[a[0],ha,a[2]],[b[0],hb,b[2]],[b[0],lo,b[2]]];
            stairs.quad(...(side<0?v:v.reverse()),'#a8ad9c');
          }
          if(i===0||i===s.count-1){const v=i===0?t:u,lo=Math.min(h,s.h0,s.h1)-.15,a=p(v,1,h),b=p(v,-1,h),face=[[a[0],lo,a[2]],[a[0],h,a[2]],[b[0],h,b[2]],[b[0],lo,b[2]]];stairs.quad(...(i===0?face:face.reverse()),'#a6ad9b');}
        }
      }
      if(Math.abs(s.h1-s.h0)>1.1&&len>5)for(const side of [-1,1]){
        for(let d=0;d<=len;d+=2.5){const t=d/len,x=s.a.x+dx*t+nx*(s.width/2-.2)*side,z=s.a.z+dz*t+nz*(s.width/2-.2)*side;rails.box(x,s.h0+(s.h1-s.h0)*t+.5,z,.055,1,.055,'#727c78');}
      }
    }
    const texture=surfaceTexture('paving');
    const lawnTexture=surfaceTexture('grass').clone();lawnTexture.repeat.set(1,1);
    world.add(landscape.mesh(style('#ffffff',{vertexColors:true,map:lawnTexture,bumpMap:lawnTexture,bumpScale:.018}),false));
    world.add(edges.mesh(style('#ffffff',{vertexColors:true}),false));
    world.add(paving.mesh(style('#ffffff',{map:texture,bumpMap:texture,bumpScale:.035,vertexColors:true}),false));
    for(const [key,batch] of pathMaterials){if(!batch.positions.length)continue;const profile=PATH_MATERIALS[key],map=surfaceTexture(profile.texture);world.add(batch.mesh(style('#ffffff',{vertexColors:true,map,bumpMap:map,bumpScale:profile.bump,roughness:.96}),false));}
    world.add(stairs.mesh(style('#ffffff',{vertexColors:true})),rails.mesh(style('#ffffff',{vertexColors:true,metalness:.3})));
  }

  function mallGround(){
    const pavement=new Batch(),lawn=new Batch();pavement.base=lawn.base=0;
    const draw=(batch,part,heightAt,uvAt)=>{
      const all=[...part.points,...part.holes.flat()],contour=part.points.map(p=>new THREE.Vector2(p.x,p.z)),holes=part.holes.map(r=>r.map(p=>new THREE.Vector2(p.x,p.z)));
      const triangle=(a,b,c)=>{const ps=[a,b,c],lengths=ps.map((p,i)=>distance2(p,ps[(i+1)%3])),edge=lengths.indexOf(Math.max(...lengths));if(lengths[edge]>1.5){const next=(edge+1)%3,other=(edge+2)%3,mid={x:(ps[edge].x+ps[next].x)/2,z:(ps[edge].z+ps[next].z)/2};triangle(ps[edge],mid,ps[other]);triangle(mid,ps[next],ps[other]);return;}batch.triangle(...ps.map(p=>[p.x,heightAt(p),p.z]),'#ffffff',uvAt?ps.map(uvAt):null);};
      for(const [a,b,c] of THREE.ShapeUtils.triangulateShape(contour,holes))triangle(all[a],all[c],all[b]);
    };
    const pavingHeight=p=>terrainHeight(p.x,p.z)+.22,greenHeight=p=>terrainHeight(p.x,p.z)+mallGreenOffset(p.x,p.z);
    for(const [index,original] of MALL_PAVING_MESH.entries())for(const part of WEBSTER_MALL_REMNANTS.pavingMesh[index]||[original])draw(pavement,part,pavingHeight,p=>{const q=mallCoordinates(p);return [q.u/MALL_PATTERN.bandSpacing,q.v/3.2];});
    for(const [index,original] of MALL_GREEN_MESH.entries())for(const part of WEBSTER_MALL_REMNANTS.greenMesh[index]||[original])draw(lawn,part,greenHeight);
    for(const [index,original] of MALL_PAVING.entries())for(const part of WEBSTER_MALL_REMNANTS.paving[index]||[original])groundPatches.push({...part,priority:true,heightAt:(x,z)=>pavingHeight({x,z})});
    for(const [index,original] of MALL_GREEN.entries())for(const part of WEBSTER_MALL_REMNANTS.green[index]||[original])groundPatches.push({...part,priority:true,heightAt:(x,z)=>greenHeight({x,z})});
    const texture=canvasTexture(1024,1024,ctx=>{
      const random=rng(3302),bw=1024*MALL_PATTERN.paverLength/MALL_PATTERN.bandSpacing,bh=1024*MALL_PATTERN.paverWidth/3.2;
      ctx.fillStyle='#8b8980';ctx.fillRect(0,0,1024,1024);
      for(let row=0;row<8;row++)for(let col=-1;col<8;col++){ctx.fillStyle=`hsl(${27+random()*8} ${5+random()*5}% ${73+random()*9}%)`;ctx.fillRect(col*bw+(row%2)*bw/2+1,row*bh+1,bw-2,bh-2);}
      ctx.fillStyle='#646760';ctx.fillRect(0,0,1024*MALL_PATTERN.bandWidth/MALL_PATTERN.bandSpacing,1024);
      for(let i=0;i<50000;i++){ctx.fillStyle=i%2?'#ffffff20':'#49463d22';ctx.fillRect(random()*1024,random()*1024,.7+random()*1.1,.7+random()*1.1);}
    });texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.anisotropy=8;
    const grassTexture=surfaceTexture('grass').clone();grassTexture.repeat.set(1,1);
    world.add(pavement.mesh(style('#ffffff',{map:texture,bumpMap:texture,bumpScale:.008,roughness:.92}),false),lawn.mesh(style('#8a9d73',{map:grassTexture,roughness:.96}),false));
  }

  function mallLights(){
    const metal=new Batch(),diffuser=new Batch();metal.base=diffuser.base=0;
    for(const p of mallLightCandidates()){
      const routes=surfaceCells.get(`${Math.floor(p.x/20)},${Math.floor(p.z/20)}`)||[];if(!treeClearsRoutes(p,routes)||blocked(p.x,p.z,null,.48))continue;
      if(landmarks.some(l=>distance2(p,l.walkPoint||l.position||l)<1))continue;
      const root=surfaceHeight(p.x,p.z,terrainHeight(p.x,p.z));
      if([...nearbyColliders(p.x,p.z,p.radius)].some(c=>root+p.height>colliderBottom(c,p.x,p.z)+.03&&root<colliderTop(c,p.x,p.z)-.03&&(c.points?circleTouchesPolygon(p.x,p.z,p.radius,c.points,c.holes):Math.hypot(c.x-p.x,c.z-p.z)<c.radius+p.radius)))continue;
      const co=Math.cos(p.angle),si=Math.sin(p.angle),P=(x,y,z)=>[p.x+x*co+z*si,root+y,p.z-x*si+z*co],cross=y=>{const scale=1-.2*y/p.height;return [[-p.width/2,-p.depth/2],[p.width/2,-p.depth/2],[0,p.depth/2]].map(([x,z])=>({x:x*scale,z:z*scale}));};
      for(let i=0;i<3;i++){
        const face=(batch,lo,hi,start,end,color,inset=0)=>{const r0=cross(lo),r1=cross(hi),a=r0[i],b=r0[(i+1)%3],c=r1[i],d=r1[(i+1)%3],length=Math.hypot(b.x-a.x,b.z-a.z),nx=(b.z-a.z)/length*inset,nz=-(b.x-a.x)/length*inset,at=(a,b,t,y)=>P(a.x+(b.x-a.x)*t+nx,y,a.z+(b.z-a.z)*t+nz);batch.quad(at(a,b,start,lo),at(c,d,start,hi),at(c,d,end,hi),at(a,b,end,lo),color);};
        face(metal,0,p.diffuserBottom,0,1,'#b6c0b8');face(metal,p.diffuserBottom,p.diffuserTop,0,.15,'#ccd2c5');face(metal,p.diffuserBottom,p.diffuserTop,.85,1,'#ccd2c5');face(metal,p.diffuserBottom,p.diffuserBottom+.065,0,1,'#9daea5');face(metal,p.diffuserTop-.065,p.diffuserTop,0,1,'#d0d5c8');face(diffuser,p.diffuserBottom+.065,p.diffuserTop-.065,.15,.85,'#ece8c8',-.008);
        const r=cross(p.diffuserTop),a=r[i],b=r[(i+1)%3];metal.triangle(P(a.x,p.diffuserTop,a.z),P(0,p.height,0),P(b.x,p.diffuserTop,b.z),'#cbd2c6');
        if(i===0)face(metal,.42,1.05,.17,.83,'#94a69d',.002);
      }
      addCollider({x:p.x,z:p.z,radius:p.radius,base:0,bottom:root,top:root+p.height});mallLightCount++;
    }
    world.add(metal.mesh(style('#ffffff',{vertexColors:true,metalness:.58,roughness:.43})),diffuser.mesh(style('#ffffff',{vertexColors:true,emissive:'#ddd1a6',emissiveIntensity:.13,roughness:.62})));
  }

  function wallPanel(batch,a,b,bottom,top,color,offset=0,start=0,end=1) {
    const dx=b.x-a.x,dz=b.z-a.z,length=Math.hypot(dx,dz)||1;
    const nx=dz/length, nz=-dx/length;
    const p=(t,y)=>[a.x+dx*t+nx*offset,y,a.z+dz*t+nz*offset];
    batch.quad(p(start,bottom),p(start,top),p(end,top),p(end,bottom),color,[[length*start/2,bottom/2],[length*start/2,top/2],[length*end/2,top/2],[length*end/2,bottom/2]]);
  }

  function ceramicScreen(a,b,height,glass,detail,profile) {
    // Photo-led Ainsworth reconstruction: five pleated screen rows above glazing.
    // Panel pitch and storey heights are estimates, not measured facade drawings.
    const dx=b.x-a.x,dz=b.z-a.z,len=Math.hypot(dx,dz),nx=dz/len,nz=-dx/len;
    const p=(t,y,off)=>[a.x+dx*t+nx*off,y,a.z+dz*t+nz*off];
    const ground=5.4,storey=(height-ground)/5,bays=Math.max(1,Math.round(len/1.45));
    wallPanel(glass,a,b,.5,height-.3,profile.glass,.07,.01,.99);
    wallPanel(detail,a,b,1.1,2.05,'#8b3931',.08,.02,.98);
    for(let d=1.5;d<len;d+=2.9)wallPanel(detail,a,b,.5,ground,'#697e7d',.13,(d-.04)/len,(d+.04)/len);
    const shades=['#d3aa7d','#bb825f','#b98a65','#d8ba8c','#bd956e','#ce9d74'];
    for(let floor=0;floor<5;floor++){
      const low=ground+floor*storey,high=ground+(floor+1)*storey-.16;
      wallPanel(detail,a,b,low-.12,low+.02,'#a9aeaa',.52,.005,.995);
      for(let bay=0;bay<bays;bay++){
        const t0=(bay+.03)/bays,t1=(bay+.95)/bays,rows=Math.ceil((high-low)/.20);
        for(let row=0;row<rows;row++){
          const y=low+(high-low)*row/rows,top=low+(high-low)*(row+1)/rows-.015;
          const shade=shades[(row+bay*3+floor)%shades.length];
          detail.quad(p(t0,y,.18),p(t0,top,.18),p(t1,top,.45),p(t1,y,.45),shade);
          const end=(bay+.98)/bays;
          detail.quad(p(t1,y,.45),p(t1,top,.45),p(end,top,.18),p(end,y,.18),shade);
        }
        detail.quad(p(t1,low,.45),p(t1,high,.45),p(t1+.015/bays,high,.45),p(t1+.015/bays,low,.45),'#626e69');
      }
    }
    wallPanel(detail,a,b,ground-.3,ground,'#5b6c6b',.7);
  }

  function collegeFacade(b,a,c,profile,brick,glass,detail) {
    // Room rhythm and balcony depths are reconstructed from the architect's
    // journal, contractor aerial and public courtyard Street View, not surveyed.
    const dx=c.x-a.x,dz=c.z-a.z,len=Math.hypot(dx,dz),nx=dz/len,nz=-dx/len;
    const midpoint={x:(a.x+c.x)/2,z:(a.z+c.z)/2};
    const inner=profile.courtyard&&(profile.courtyard.x-midpoint.x)*nx+(profile.courtyard.z-midpoint.z)*nz>1;
    const color=inner?profile.innerColor:profile.color,floors=profile.floors||6,level=b.height/floors;
    const count=Math.max(1,Math.round(len/3.3)),phase=Math.abs(Math.round((midpoint.x+midpoint.z)/3.3));
    const p=(t,y,off=0)=>[a.x+dx*t+nx*off,y,a.z+dz*t+nz*off];
    const panel=(batch,start,end,low,high,shade,offA=.02,offB=offA)=>{
      batch.quad(p(start,low,offA),p(start,high,offA),p(end,high,offB),p(end,low,offB),shade,
        [[start*len/2,low/2],[start*len/2,high/2],[end*len/2,high/2],[end*len/2,low/2]]);
    };
    wallPanel(brick,a,c,0,b.height,color);
    wallPanel(detail,a,c,0,.48,'#878d83',.03);
    for(let floor=0;floor<floors;floor++){
      const bottom=floor*level,top=(floor+1)*level;
      if(floor===0&&inner&&len>8){
        panel(glass,.02,.98,.45,level-.25,profile.glass,.06);
        for(let d=.6;d<len;d+=5.3){const t=d/len;panel(detail,t-.22/len,t+.22/len,0,level,profile.trim,.78);}
        panel(detail,.005,.995,level-.22,level,profile.trim,.9);
        continue;
      }
      for(let bay=0;bay<count;bay++){
        const start=(bay+.04)/count,end=(bay+.96)/count,width=(end-start)*len;
        const balcony=floor>0&&len>2.5&&(inner?(bay+phase)%3===1:(bay+floor+phase)%4===1);
        const faceted=inner&&!profile.footprintFacets&&count>2;
        const offA=.08,offB=faceted?.7:.08;
        const offset=t=>offA+(offB-offA)*(t-start)/(end-start);
        if(balcony){
          panel(glass,start+.06/count,end-.06/count,bottom+.12,top-.22,'#263b42',.075);
          // Horizontal slab with narrow vertical metal balusters.
          const front=inner?1.05:1.2,back=.07;
          detail.quad(p(start,bottom+.18,back),p(end,bottom+.18,back),p(end,bottom+.18,front),p(start,bottom+.18,front),profile.trim);
          detail.quad(p(start,bottom,back),p(start,bottom,front),p(end,bottom,front),p(end,bottom,back),profile.trim);
          panel(detail,start,end,bottom,bottom+.18,profile.trim,front);
          panel(detail,start,end,bottom+1.23,bottom+1.28,'#424d4d',front);
          for(let d=.05;d<width;d+=.14){const t=start+d/len;panel(detail,t,t+.025/len,bottom+.18,bottom+1.25,'#424d4d',front);}
          if(!inner)for(const side of [start,end]){
            detail.quad(p(side,bottom,back),p(side,top-.2,back),p(side,top-.2,front),p(side,bottom,front),profile.color);
            detail.quad(p(side,bottom,front),p(side,top-.2,front),p(side,top-.2,back),p(side,bottom,back),profile.color);
          }
        }else{
          if(faceted)panel(brick,start,end,bottom+.05,top-.13,color,offA,offB);
          const centre=start+(end-start)*(inner?.72:.48),half=Math.min(.49/len,(end-start)*.22);
          const left=centre-half,right=centre+half,low=bottom+.5,high=top-.3;
          panel(glass,left,right,low,high,profile.glass,offset(left)+.025,offset(right)+.025);
          for(const t of [left,right])panel(detail,t-.035/len,t+.035/len,low-.02,high+.02,'#657472',offset(t)+.05,offset(t)+.05);
          panel(detail,left,right,low-.05,low,'#8a9186',offset(left)+.06,offset(right)+.06);
          panel(detail,centre-.025/len,centre+.025/len,low,high,'#5f716f',offset(centre)+.06);
          if(faceted){
            panel(brick,end,(bay+1)/count,bottom+.05,top-.13,color,offB,.08);
            detail.quad(p(start,top-.12,.03),p(start,top-.12,offA+.2),p(end,top-.12,offB+.2),p(end,top-.12,.03),profile.trim);
            detail.quad(p(start,top,.03),p(end,top,.03),p(end,top,offB+.2),p(start,top,offA+.2),profile.trim);
            panel(detail,start,end,top-.12,top,profile.trim,offA+.2,offB+.2);
          }
        }
      }
      if(inner||profile.footprintFacets)panel(detail,0,1,top-.13,top,profile.trim,.18);
    }
    wallPanel(detail,a,c,b.height-.13,b.height+.25,profile.trim,.23);
    // Light concrete end blades contrast with the brick accommodation wings.
    if(len>12)wallPanel(detail,a,c,0,b.height+.3,'#b6b8ae',.11,0,Math.min(.8/len,.07));
  }

  function collegeRoof(b,profile,detail,roofs){
    const ring=b.points,e=extent(ring),co=Math.cos(.165),si=Math.sin(.165);
    const local=(x,z,centre)=>({x:centre.x+x*co-z*si,z:centre.z+x*si+z*co});
    const garden=profile.roofGarden;
    if(garden){
      const corners=[[-4,-2.5],[4,-2.5],[4,2.5],[-4,2.5]].map(([x,z])=>local(x,z,garden));
      if(corners.every(p=>inPolygon(p.x,p.z,ring))){
        polygon(roofs,corners,b.height+.17,'#84986a');
        for(let i=0;i<4;i++){
          const a=corners[i],c=corners[(i+1)%4],len=distance2(a,c);
          wallPanel(detail,a,c,b.height+.1,b.height+.35,'#bfc1b2');
          wallPanel(detail,a,c,b.height+1.12,b.height+1.17,'#53625f');
          for(let d=.15;d<len;d+=.65){const x=a.x+(c.x-a.x)*d/len,z=a.z+(c.z-a.z)*d/len;detail.box(x,b.height+.74,z,.035,.94,.035,'#53625f');}
        }
        const h=b.height+2.6;
        for(const x of [-1.8,1.8])for(const z of [-1.5,1.5]){const p=local(x,z,garden);detail.box(p.x,b.height+1.38,p.z,.07,2.5,.07,'#969f99');}
        for(let x=-1.8;x<2;x+=.45){const p=local(x,0,garden);detail.box(p.x,h,p.z,.055,.09,3.15,'#a9b1a9',-.165);}
      }
    }
    // Small ventilation terminals are visible in repeated rows in the aerial.
    for(let x=e.minX+4;x<e.maxX-2;x+=6)for(let z=e.minZ+4;z<e.maxZ-2;z+=7){
      if(!inPolygon(x,z,ring)||[[-1,-1],[1,-1],[1,1],[-1,1]].some(([dx,dz])=>!inPolygon(x+dx,z+dz,ring)))continue;
      if(garden&&Math.hypot(x-garden.x,z-garden.z)<6)continue;
      for(let i=0;i<8;i++){
        const a=i/8*TAU,c=(i+1)/8*TAU,low=b.height+.05,high=b.height+.36;
        detail.quad([x+Math.cos(a)*.13,low,z+Math.sin(a)*.13],[x+Math.cos(a)*.13,high,z+Math.sin(a)*.13],[x+Math.cos(c)*.13,high,z+Math.sin(c)*.13],[x+Math.cos(c)*.13,low,z+Math.sin(c)*.13],'#979e96');
        detail.triangle([x,high+.05,z],[x+Math.cos(c)*.23,high,z+Math.sin(c)*.23],[x+Math.cos(a)*.23,high,z+Math.sin(a)*.23],'#b6bcb2');
      }
    }
  }

  function nidaTheatre(b,concrete,detail,roofs){
    const {front,drum,opening,roofHeight,curtainWallHeight}=theatreGeometry(b);
    const ordered=polygonArea(b.points)<0?[...b.points].reverse():b.points,glazing=new Batch();glazing.base=b.base;
    polygon(concrete,b.points,.12,'#8a9290');
    for(let i=0;i<ordered.length;i++){
      const a=ordered[i],c=ordered[(i+1)%ordered.length],len=distance2(a,c);if(len<.3)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
      const visible=nx>.45||nz>.7;
      if(visible){
        glazing.quad(p(0,.2,.02),p(0,roofHeight(a)),p(1,roofHeight(c)),p(1,.2,.02),'#8aa9ad');
        const count=Math.max(1,Math.round(len/2.25));
        for(let j=0;j<=count;j++){
          const t=j/count,roof=roofHeight({x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t});
          wallPanel(detail,a,c,.12,roof,'#6c7975',.07,Math.max(0,t-.055/len),Math.min(1,t+.055/len));
        }
        for(const y of [3.45,7.1])wallPanel(detail,a,c,y,y+.045,'#6a7a78',.08);
      }else wallPanel(concrete,a,c,0,9.8,'#a6aaa0');
      wallPanel(detail,a,c,0,.2,'#687b77',.14);
      const h0=roofHeight(a),h1=roofHeight(c);
      roofs.quad(p(0,h0-.22,.8),p(0,h0,.8),p(1,h1,.8),p(1,h1-.22,.8),'#b9bfb5');
      roofs.quad(p(0,h0-.22,.8),p(1,h1-.22,.8),p(1,h1-.22,-.2),p(0,h0-.22,-.2),'#b2b9b0');
    }
    // Triangulated roof with an actual opening around the reconstructed drum.
    const contours=[ordered,opening],vertices=contours.flat();
    for(const [a,c,d] of THREE.ShapeUtils.triangulateShape(ordered.map(p=>new THREE.Vector2(p.x,p.z)),[opening.map(p=>new THREE.Vector2(p.x,p.z))])){
      const v=i=>[vertices[i].x,roofHeight(vertices[i]),vertices[i].z];
      roofs.triangle(v(a),v(d),v(c),'#c4c9bd');
      const under=i=>[vertices[i].x,roofHeight(vertices[i])-.22,vertices[i].z];
      roofs.triangle(under(a),under(c),under(d),'#b8c0b6');
    }
    const drumRing=polygonArea(drum.points)<0?[...drum.points].reverse():drum.points;
    polygon(roofs,drumRing,drum.height,'#929d93');
    for(let i=0;i<drumRing.length;i++){
      const a=drumRing[i],c=drumRing[(i+1)%drumRing.length];
      wallPanel(concrete,a,c,0,drum.height,'#4b5550');
      for(let y=3.3;y<drum.height-.1;y+=.27){
        wallPanel(detail,a,c,y,y+.08,'#b7bdb1',.18);
      }
    }
    // The public OSM parts distinguish the 17 m auditorium shell from two
    // 19 m upper volumes. Their min_height=12 tags locate the added storeys.
    for(const part of NIDA_PARTS.filter(p=>p.osmId!==drum.osmId)){
      const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points;
      polygon(roofs,ring,part.height,'#b4bdb7');
      const floor=new Batch();floor.base=b.base;
      polygon(floor,ring,part.minHeight,'#b4bdb7');
      world.add(floor.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
        const glazed=nz>.7&&len<25;
        wallPanel(glazed?glazing:concrete,a,c,part.minHeight,part.height,glazed?'#486b70':'#9eaca9');
        for(let d=.12;d<len;d+=glazed?1.45:1.1)wallPanel(detail,a,c,part.minHeight,part.height,glazed?'#344f50':'#7a8b87',.055,d/len,Math.min(1,(d+.035)/len));
        for(let y=part.minHeight+1;y<part.height;y+=glazed?2.4:.55)wallPanel(detail,a,c,y,y+.035,'#7a8b87',.06);
        // Pale structural frame and thin edge reveal around the added boxes.
        wallPanel(detail,a,c,part.height-.13,part.height+.04,'#c9cec0',.2);
        for(const p of [a,c])detail.box(p.x+nx*.05,part.minHeight/2,p.z+nz*.05,.16,part.minHeight,.16,'#879b91');
      }
    }
    const a=front[0],c=front[1],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,t=.1;
    const x=a.x+(c.x-a.x)*t,z=a.z+(c.z-a.z)*t,angle=Math.atan2(-(c.z-a.z),c.x-a.x);
    detail.box(x+nx*.7,3.75,z+nz*.7,7.6,.24,2.4,'#c6cbbb',angle);
    const tex=canvasTexture(1024,128,(ctx,w,h)=>{ctx.fillStyle='#36413e';ctx.fillRect(0,0,w,h);ctx.fillStyle='#e7e9db';ctx.font='500 74px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('NIDA THEATRES',w/2,h/2);});
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(7.4,.92),new THREE.MeshBasicMaterial({map:tex}));
    sign.position.set(x+nx*1.92,b.base+4.4,z+nz*1.92);sign.rotation.y=Math.atan2(nx,nz);world.add(sign);
    world.add(glazing.mesh(style('#c0d4d1',{vertexColors:true,transparent:true,opacity:.3,roughness:.13,metalness:.18,depthWrite:false,side:THREE.DoubleSide}),false));
    // Preserve the mapped solid building boundary: the detailed foyer is viewed
    // from outside. The architect's 11 m dimension describes the curtain wall.
    addCollider({points:b.points,top:Math.max(b.height,curtainWallHeight),base:b.base});
  }

  function universityTerraces(b){
    const g=terracesGeometry(b),f=g.frame,brick=new Batch(),stone=new Batch(),metal=new Batch(),glass=new Batch(),orange=new Batch(),plants=new Batch();
    for(const q of [brick,stone,metal,glass,orange,plants])q.base=g.base;
    const absolute=(p,y)=>[p.x,y,p.z];
    for(const face of TERRACES_FACES){
      const {a,b:c,normal:n,bottom,top}=face,len=distance2(a,c);if(len<.03)continue;
      const panel=(batch,lo,hi,color,off=0,start=0,end=1)=>{lo=Math.max(bottom,lo);hi=Math.min(top,hi);start=Math.max(0,start);end=Math.min(1,end);if(hi>lo&&end>start)wallPanel(batch,a,c,lo,hi,color,off,start,end);};
      const p=(t,y,off)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
      const slab=(y,depth=1.1)=>{if(y<bottom-1e-6||y>top+1e-6)return;stone.quad(p(0,y,-depth),p(1,y,-depth),p(1,y,.06),p(0,y,.06),'#b5b8a8');};
      if(face.kind==='retail'){
        panel(brick,bottom,top,'#a29b83');panel(glass,.28,3.52,'#344e4c',.025,.025,.975);panel(metal,3.5,3.94,'#666e61',.05);
        for(let d=.1;d<len;d+=3.4){const t=d/len;panel(stone,.2,3.5,'#aeb3a1',.08,t-.09/len,t+.09/len);}
      }else if(face.kind==='south-link')panel(stone,bottom,top,'#b1b5a2');
      else{
        const long=Math.abs(n.x*f.u.x+n.z*f.u.z)>.75||face.kind==='north-link',rows=face.rows,level=(face.height-g.retail-.2)/rows;
        if(long){
          panel(brick,bottom,top,face.kind==='north-link'?'#7f7868':'#b0a992',-g.balconyDepth);
          const bays=Math.max(1,Math.round(len/g.panelPitch));
          for(let row=0;row<rows;row++){
            const y=g.retail+row*level,ceiling=y+level;
            slab(y);panel(stone,y,y+.17,'#b9bcab',.07);panel(stone,ceiling-.18,ceiling,'#b7baa8',.07);slab(ceiling-.18);
            for(let bay=0;bay<bays;bay++){
              const start=bay/bays,end=(bay+1)/bays,mid=(start+end)/2;
              panel(glass,y+.23,ceiling-.29,'#394f4c',-g.balconyDepth+.035,start+.15/bays,end-.13/bays);
              for(const t of [start+.15/bays,mid,end-.13/bays])panel(metal,y+.23,ceiling-.29,'#737e73',-g.balconyDepth+.065,t-.025/len,t+.025/len);
              if(face.kind!=='north-link'){
                const t=start+.035/bays,depth=g.balconyDepth-.04;
                if(y>=bottom&&ceiling<=top+.01){orange.quad(p(t,y+.17,-depth),p(t,ceiling-.18,-depth),p(t,ceiling-.18,.04),p(t,y+.17,.04),bay%2?'#d2852b':'#d99435');
                  for(const [lo,hi]of [[y+.26,ceiling-.26],[ceiling-.26,y+.26]])batchBeam(metal,p(t,lo,-depth+.04),p(t,hi,.045),.012,'#c9c5a8');}
              }
            }
            // Thin vertical silver railings, with open gaps and a genuine
            // balcony recess; all detail remains inside the retained envelope.
            panel(metal,y+1.12,y+1.17,'#b9c0b3',.11);
            for(let d=.07;d<len;d+=.125)panel(metal,y+.18,y+1.14,'#a6b1a6',.1,d/len,Math.min(1,(d+.019)/len));
            for(const t of [0,1])if(y>=bottom&&y+1.17<=top){batchBeam(metal,p(t,y+1.15,-g.balconyDepth),p(t,y+1.15,.12),.035,'#aeb8ab');}
          }
        }else{
          panel(brick,bottom,top,'#c3bfaa');panel(glass,bottom+.15,top-.25,'#485953',.025,.23,.77);
          for(let y=g.retail+.2;y<face.height-.2;y+=.15)panel(metal,y,y+.06,'#869284',.13,.21,.79);
          for(const t of [.2,.8])panel(stone,bottom,top,'#c4c3ad',.17,t-.1/len,t+.1/len);
        }
        panel(stone,face.height-.2,face.height,'#b8bba8',.08);
      }
    }
    for(const part of TERRACES_PARTS){polygon(stone,part.points,part.height,'#9caa9b',part.holes);if(part.minHeight)polygon(stone,part.points,part.minHeight,'#b8bda9',part.holes,true);addCollider({...part,base:g.base,bottom:part.minHeight,top:part.height});}
    for(const p of g.columns){const y=terrainHeight(p.x,p.z)-g.base,column=new THREE.Mesh(new THREE.CylinderGeometry(.24,.24,g.retail-y,12),style('#b8bdab'));column.position.set(p.x,g.base+(y+g.retail)/2,p.z);column.castShadow=column.receiveShadow=true;world.add(column);addCollider({x:p.x,z:p.z,radius:p.radius,base:g.base,bottom:y,top:g.retail});}
    for(const patch of TERRACES_PAVING){shapedRoof(stone,patch.points,p=>terrainHeight(p.x,p.z)-g.base+.22,'#b6b4a1',patch.holes);groundPatches.push({...patch,heightAt:(x,z)=>terrainHeight(x,z)+.22});}
    // Two raised planted courts leave the mapped east-west retail lightwell
    // open. They are suspended slabs, not ground-height patches.
    for(const garden of g.gardens){
      polygon(stone,garden.points,g.retail,'#aaa995');polygon(stone,garden.points,g.retail-g.gardenSlab,'#b4b8a4',[],true);
      const ring=polygonArea(garden.points)>0?garden.points:[...garden.points].reverse();for(let i=0;i<ring.length;i++)wallPanel(stone,ring[i],ring[(i+1)%ring.length],g.retail-g.gardenSlab,g.retail,'#a6ac99');
      addCollider({points:garden.points,base:g.base,bottom:g.retail-g.gardenSlab,top:g.retail});
      const gardenFrame=orientedFrame(garden.points,{x:f.v.x,z:f.v.z}),lawn=frameRectangle(gardenFrame,gardenFrame.width-3.2,gardenFrame.length-2.2);
      polygon(plants,lawn,g.retail+.13,'#687e4c');
      const lawnRing=polygonArea(lawn)>0?lawn:[...lawn].reverse();for(let i=0;i<lawnRing.length;i++)wallPanel(stone,lawnRing[i],lawnRing[(i+1)%lawnRing.length],g.retail,g.retail+.18,'#9f9e88');
    }
    for(const v of [-4,4]){
      const a=framePoint(f,-11.3,v),c=framePoint(f,11.3,v);wallPanel(metal,a,c,g.retail+1.08,g.retail+1.13,'#b4bcae',.015);
      for(let u=-11.3;u<11.3;u+=.13){const q=framePoint(f,u,v);metal.box(q.x,g.retail+.58,q.z,.025,1.1,.025,'#a7b2a4');}
      for(let u=-10.7;u<11;u+=.6){const q=framePoint(f,u,v>0?4.3:-4.3);plants.box(q.x,g.retail+.4,q.z,.55,.65,.6,'#567444');}
    }
    // Procedural small courtyard trees, rooted above the suspended lawn.
    const leafMaterial=style('#a3af79',{map:foliageTexture(),alphaTest:.42,side:THREE.DoubleSide}),foliage=new THREE.InstancedMesh(new THREE.PlaneGeometry(.8,.8),leafMaterial,g.trees.length*130),dummy=new THREE.Object3D(),random=rng(4419);
    let leaf=0;for(const t of g.trees){
      batchBeam(stone,[t.x,g.retail+.12,t.z],[t.x+.2,g.retail+t.height*.62,t.z],.16,'#a2a58e');
      for(let branch=0;branch<4;branch++){const angle=branch*TAU/4+.4;batchBeam(stone,[t.x,g.retail+t.height*.42,t.z],[t.x+Math.cos(angle)*1.5,g.retail+t.height*.82,t.z+Math.sin(angle)*1.5],.075,'#9a9f85');}
      for(let j=0;j<130;j++){const angle=random()*TAU,r=Math.sqrt(random())*2.2;dummy.position.set(t.x+Math.cos(angle)*r,g.base+g.retail+t.height*.82+(random()-.5)*2.6,t.z+Math.sin(angle)*r);dummy.rotation.set(random()*Math.PI,random()*TAU,random()*Math.PI);const size=.8+random()*.6;dummy.scale.set(size,size,size);dummy.updateMatrix();foliage.setMatrixAt(leaf,dummy.matrix);foliage.setColorAt(leaf,new THREE.Color(['#6c844e','#87985d','#a0aa75'][leaf%3]));leaf++;}
    }foliage.castShadow=foliage.receiveShadow=true;world.add(foliage);
    const tex=canvasTexture(768,384,(ctx,w,h)=>{ctx.fillStyle='#b99b75';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#8b775e';for(let x=0;x<w;x+=29){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}ctx.fillStyle='#303d37';ctx.textAlign='center';ctx.font='600 72px Arial';ctx.fillText('UNIVERSITY',w/2,154);ctx.fillText('TERRACES',w/2,250);});
    const q=framePoint(f,f.width/2-2.19,-5.8),sign=new THREE.Mesh(new THREE.PlaneGeometry(3.1,1.5),new THREE.MeshBasicMaterial({map:tex}));sign.position.set(q.x,g.base+2.15,q.z);sign.rotation.y=Math.atan2(f.u.x,f.u.z);world.add(sign);
    world.add(brick.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('brick')})),stone.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.28,roughness:.48})),glass.mesh(style('#ffffff',{vertexColors:true,roughness:.25,metalness:.25})),orange.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.76})),plants.mesh(style('#ffffff',{vertexColors:true})));
  }

  function newCollege(b){
    const g=newCollegeGeometry(b),f=g.frame,brick=new Batch(),stone=new Batch(),metal=new Batch(),glass=new Batch(),wood=new Batch(),roof=new Batch(),canopy=new Batch(),clearRoof=new Batch();
    for(const batch of [brick,stone,metal,glass,wood,roof,canopy,clearRoof])batch.base=g.base;
    const angle=Math.atan2(-f.u.z,f.u.x),at=(u,v,y)=>{const p=g.at(u,v);return [p.x,y,p.z];},box=(batch,u,v,y,w,h,d,color)=>{const p=g.at(u,v);batch.box(p.x,y,p.z,w,h,d,color,angle);};
    for(const face of NEW_COLLEGE_FACES){
      const {a,b:c,normal:n,bottom,top,kind}=face,len=distance2(a,c),mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2}),nu=n.x*f.u.x+n.z*f.u.z,inner=kind==='rooms'&&Math.abs(mid.u)<10.31&&Math.abs(mid.v)<26.41;
      const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off],panel=(batch,lo,hi,color,off=0,start=0,end=1)=>{lo=Math.max(bottom,lo);hi=Math.min(top,hi);start=Math.max(0,start);end=Math.min(1,end);if(hi>lo&&end>start)wallPanel(batch,a,c,lo,hi,color,off,start,end);};
      panel(inner||kind==='communal'?stone:brick,bottom,top,inner?'#d8dcd2':kind==='communal'?'#d1d7cc':'#92775a');
      if(inner){
        const count=Math.max(1,Math.round(len/3.4));
        for(let row=0;row<4;row++){
          const y=g.floor+row*g.level;
          for(let bay=0;bay<count;bay++){
            const t=(bay+.5)/count,door=t-.48/len,win=t+.62/len;
            panel(glass,y+.08,y+2.16,'#5a6d64',.025,door-.38/len,door+.38/len);panel(glass,y+.65,y+2.15,'#789086',.03,win-.33/len,win+.33/len);
            for(const x of [door-.41/len,door+.41/len,win-.36/len,win+.36/len])panel(metal,y+.08,y+2.2,'#d6dfd2',.065,x-.025/len,x+.025/len);
            panel(metal,y+2.16,y+2.22,'#e2e7dc',.06,t-.95/len,t+1/len);panel(metal,y+1.16,y+1.21,'#cad4c6',.075,win-.33/len,win+.33/len);
          }
        }
        continue;
      }
      if(kind==='communal'){
        if(len>2){panel(glass,.38,3.1,'#728f84',.035,.04,.96);for(let d=.1;d<len;d+=1.7)panel(metal,.35,3.2,'#d6dfd1',.08,d/len,Math.min(1,(d+.085)/len));}
        continue;
      }
      // Both opposed centre projections have green glazing, not only the oval side.
      if(Math.abs(mid.u)>18&&Math.abs(mid.v)<6&&Math.abs(nu)>.8&&len>6){
        panel(glass,g.floor-.08,g.body,'#82aea0',.16);
        for(let d=0;d<=len+.1;d+=len/5)panel(metal,g.floor-.08,g.body,'#43645b',.25,Math.max(0,(d-.055)/len),Math.min(1,(d+.055)/len));
        for(let y=g.floor;y<g.body;y+=1.3)panel(metal,y,y+.075,'#4c7065',.27);
        panel(stone,g.floor-.22,g.floor,'#d8ddcf',.035);continue;
      }
      // Three original brick room rows and a distinct pale green fourth row.
      for(let row=0;row<3;row++){
        const y=g.floor+row*g.level,count=Math.max(1,Math.round(len/2.45));
        panel(stone,y-.09,y+.04,'#d3d7cc',.08);
        if(len<1.3)continue;
        for(let bay=0;bay<count;bay++){
          const t=(bay+.5)/count,left=t-.36/len,right=t+.36/len;
          panel(glass,y+.58,y+2.18,(bay+row)%5?'#43544c':'#758879',.035,left,right);
          panel(brick,y+.52,y+2.23,'#695943',.17,left-.11/len,left);
          panel(stone,y+.5,y+.57,'#b5b8a6',.13,left-.11/len,right+.08/len);
          stone.quad(p(left-.13/len,y+.5,.03),p(right+.12/len,y+.5,.03),p(right+.12/len,y+.5,.46),p(left-.13/len,y+.5,.46),'#b6b8a8');
        }
      }
      panel(stone,11.22,11.35,'#d9dfcf',.1);panel(metal,11.35,g.body,'#bfcdb4',.025);
      for(let d=.1;d<len;d+=.34)panel(metal,11.35,g.body,'#879b84',.055,d/len,Math.min(1,(d+.02)/len));
      if(len>1.4)for(let bay=0,count=Math.max(1,Math.round(len/2.45));bay<count;bay++){const t=(bay+.5)/count;panel(glass,11.75,13.2,'#647e70',.08,t-.36/len,t+.36/len);}
      // Thin white soffit / beam over the recessed ground colonnade.
      panel(stone,g.floor-.22,g.floor,'#d8ddcf',.035);
    }
    for(const part of NEW_COLLEGE_PARTS){addCollider({...part,base:g.base,bottom:part.minHeight,top:part.height});if(part.kind==='rooms')polygon(stone,part.points,g.floor-.04,'#bfc7b9',part.holes,true);}
    for(const part of NEW_COLLEGE_ROOFS)shapedRoof(roof,part.points,g.lowerRoof,'#aabb9f',part.holes);
    // Recessed communal frontage, supported by square white outer piers.
    for(const side of [-1,1])for(let v=-29;v<=29;v+=5.8){if(Math.abs(v)<5.5)continue;const q=g.at(side*17.35,v),low=terrainHeight(q.x,q.z)-g.base+.22;box(stone,side*17.35,v,(low+g.floor-.16)/2,.42,g.floor-.16-low,.45,'#d6ddce');addCollider({points:g.rect(side*17.35-.21,side*17.35+.21,v-.225,v+.225),base:g.base,bottom:low,top:g.floor});}
    const colonnade={points:g.rect(-19.1,19.1,-33.8,33.8),holes:[g.groundRoom.points]};shapedRoof(stone,colonnade.points,p=>terrainHeight(p.x,p.z)-g.base+.22,'#adb8a6',colonnade.holes);groundPatches.push({...colonnade,heightAt:(x,z)=>terrainHeight(x,z)+.22});
    // First-floor court: four levels of doors face recessed white galleries.
    for(const part of NEW_COLLEGE_COURT){polygon(stone,part.points,g.floor,'#b6bcb2');groundPatches.push({...part,minimumY:g.floorRL-.4,heightAt:()=>g.floorRL+.015});}
    const palette=['#d2d5c9','#aab1a7','#89958e','#bcc2b8','#788982'];
    for(let u=-10.25,col=0;u<10.2;u+=.47,col++)for(let v=-26.3,row=0;v<26.3;v+=3.4,row++)polygon(stone,g.rect(u,Math.min(10.25,u+.445),v,Math.min(26.3,v+3.38)),g.floor+.008,palette[(col*3)%palette.length]);
    for(let row=1;row<4;row++){
      const y=g.floor+row*g.level;
      for(const side of [-1,1]){
        box(stone,side*9.52,0,y-.1,1.56,.2,52.8,'#cbd3c5');box(stone,side*8.76,0,y+.48,.11,.96,52.8,'#d8dfd3');box(metal,side*8.76,0,y+1.01,.14,.06,52.8,'#d4ddcf');
        for(let h=.18;h<.95;h+=.19)box(stone,side*8.69,0,y+h,.018,.012,52.8,'#bfcbbb');
      }
      for(const v of [-25.62,25.62]){box(stone,0,v,y-.1,17.5,.2,1.56,'#cbd3c5');box(stone,0,Math.sign(v)*24.86,y+.48,17.5,.96,.11,'#d8dfd3');}
    }
    // Orange timber bridge at the independently described third-floor level.
    polygon(wood,g.bridge.points,g.bridge.floor,'#b77835');polygon(stone,g.bridge.points,g.bridge.floor-.22,'#a7b1a2',[],true);addCollider({...g.bridge,base:g.base,bottom:g.bridge.floor-.22,top:g.bridge.floor});
    for(const v of [-3.4,-1.1]){box(wood,0,v,g.bridge.floor+.5,20.6,1,.095,'#b7833e');for(let u=-10.2;u<10.3;u+=.12)box(wood,u,v+Math.sign(v+2.25)*.055,g.bridge.floor+.5,.02,1.02,.018,'#996329');box(metal,0,v,g.bridge.floor+1.04,20.6,.045,.11,'#58675b');}
    // Central glazed common-room pavilion and the long timber sitting platform.
    const pp=g.pavilion,pr=pp.points;
    for(let i=0;i<pr.length;i++){const a=pr[i],c=pr[(i+1)%pr.length],mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2}),length=distance2(a,c),end=Math.abs(mid.v-pp.v0)<.01||Math.abs(mid.v-pp.v1)<.01;wallPanel(end?wood:glass,a,c,g.floor+.05,g.floor+pp.height,end?'#bc7d36':'#75968b');if(end){for(let d=.04;d<length;d+=.16)wallPanel(wood,a,c,g.floor+.05,g.floor+pp.height,'#a46b30',.015,d/length,Math.min(1,(d+.016)/length));}else for(let d=.05;d<length;d+=1.3)wallPanel(metal,a,c,g.floor,g.floor+pp.height,'#728879',.04,d/length,Math.min(1,(d+.04)/length));}
    polygon(wood,pr,g.floor+pp.height,'#c08a45');addCollider({...pp,base:g.base,bottom:g.floor,top:g.floor+pp.height});
    polygon(wood,g.deck.points,g.floor+.022,'#b47e40');for(let u=-8.6;u<-.4;u+=.13)polygon(wood,g.rect(u,u+.014,5,24.6),g.floor+.025,'#825e36');
    for(const side of [-1,1])for(const [v0,v1]of [[-23,-15],[-11,-5],[7,15],[18,24]]){box(stone,side*9.65,(v0+v1)/2,g.floor+.22,.8,.44,v1-v0,'#abb7a7');box(wood,side*9.65,(v0+v1)/2,g.floor+.47,.92,.07,v1-v0+.08,'#b07c3d');}
    for(const [u,v]of [[3.2,-20],[3.8,-13],[3.5,11],[3.3,18]]){
      box(stone,u,v,g.floor+.74,1.1,.055,1.1,'#d4d6c9');box(metal,u,v,g.floor+.35,.065,.7,.065,'#6b796c');
      for(const side of [-1,1]){const cv=v+side*.95;box(metal,u,cv,g.floor+.43,.64,.055,.62,'#6b776a');box(metal,u,cv+side*.28,g.floor+.73,.64,.56,.045,'#758274');for(const dx of [-.27,.27])for(const dz of [-.25,.25])box(metal,u+dx,cv+dz,g.floor+.2,.026,.4,.026,'#647265');addCollider({points:g.rect(u-.34,u+.34,cv-.32,cv+.32),base:g.base,bottom:g.floor,top:g.floor+1.02});}
      addCollider({points:g.rect(u-.56,u+.56,v-.56,v+.56),base:g.base,bottom:g.floor,top:g.floor+.78});
    }
    // Square glass-block roof lights in the paved court are visual panels only.
    for(const v of [-16,13]){polygon(glass,g.rect(5.5,7.3,v-2,v+2),g.floor+.014,'#87a39a');for(let u=5.5;u<=7.31;u+=.3)polygon(stone,g.rect(u,u+.025,v-2,v+2),g.floor+.02,'#d7ddd0');for(let z=v-2;z<=v+2;z+=.3)polygon(stone,g.rect(5.5,7.3,z,z+.025),g.floor+.02,'#d7ddd0');}
    // Steel columns and framed translucent roof with a clearer central strip.
    for(const p of g.columns){batchPipe(metal,at(p.u,p.v,g.floor),at(p.u,p.v,g.canopyHeight(p)-.05),.125,'#6c796d');addCollider({x:p.x,z:p.z,radius:p.radius,base:g.base,bottom:g.floor,top:g.canopyHeight(p)});}
    for(let v=-28.2;v<28.2;v+=2.35){const end=Math.min(28.2,v+2.35);for(const [u0,u1]of [[-12.6,-2.2],[-2.2,0],[0,2.2],[2.2,12.6]]){const a=at(u0,v,g.canopyHeight(g.at(u0,v))),bb=at(u1,v,g.canopyHeight(g.at(u1,v))),c=at(u1,end,g.canopyHeight(g.at(u1,end))),d=at(u0,end,g.canopyHeight(g.at(u0,end)));(Math.abs(u0+u1)<3?clearRoof:canopy).quad(a,d,c,bb,Math.abs(u0+u1)<3?'#b0d4dd':'#e4e6d9');}for(const side of [-1,1])batchBeam(metal,at(side*12.6,v,14.18),at(0,v,14.97),.055,'#7b887c');}
    for(const u of [-12.6,-8.8,-2.2,0,2.2,8.8,12.6])batchBeam(metal,at(u,-28.2,g.canopyHeight(g.at(u,0))-.035),at(u,28.2,g.canopyHeight(g.at(u,0))-.035),.045,'#7f8b7e');
    for(const side of [-1,1]){
      const a=g.at(side*12.3,side*-28.2),c=g.at(side*12.3,side*28.2);wallPanel(glass,a,c,g.body,14.18,'#768b7c');for(let v=-28.2;v<28.2;v+=2.35)box(metal,side*12.3,v,13.9,.05,.6,.06,'#b6c5af');
      const v=side*28.2;for(let u=-12.3;u<12.3;u+=.6){const y=g.canopyHeight(g.at(u,v));metal.quad(at(u,v,g.body),at(u,v,y),at(u+.6,v,g.canopyHeight(g.at(u+.6,v))),at(u+.6,v,g.body),'#c3ceba');}
    }
    // Five visible entrance treads lead to recessed closed doors, not a route
    // through private rooms to the separately selectable first-floor court.
    polygon(stone,g.landing.points,g.entryFloor,'#b9c1b2');groundPatches.push({...g.landing,heightAt:()=>g.entryFloorRL+.015});addCollider({...g.landing,base:0,bottom:g.entryFloorRL-.16,top:g.entryFloorRL,stepHeight:.27});
    shapedRoof(stone,g.apron.points,p=>terrainHeight(p.x,p.z)-g.base+.22,'#bac3b3');groundPatches.push({...g.apron,heightAt:(x,z)=>terrainHeight(x,z)+.22});stairSegments.push(g.stair);
    for(const t of g.stairTreads){polygon(stone,t.points,t.rl-g.base,'#bdc4b6');wallPanel(stone,t.points[3],t.points[0],t.rl-g.base-.15,t.rl-g.base,'#aeb9a7');addCollider({...t,base:0,bottom:g.entryLow-.12,top:t.rl,stepHeight:.27});}
    for(const v of [-2.75,0,2.75]){addCollider({points:g.rect(-20.85,-18.75,v-.035,v+.035),base:0,bottom:g.entryLow,top:g.entryFloorRL+.95});for(const u of [-20.8,-19.3,-18.8]){const y=u<-19.3?g.entryLow:g.entryFloorRL;batchPipe(metal,at(u,v,y-g.base+.05),at(u,v,y-g.base+.92),.025,'#9cafa0');}batchPipe(metal,at(-20.8,v,g.entryLow-g.base+.92),at(-19.3,v,g.entryFloor+.92),.025,'#b8c8b5');batchPipe(metal,at(-19.3,v,g.entryFloor+.92),at(-18.8,v,g.entryFloor+.92),.025,'#b8c8b5');}
    const da=g.at(-14.25,3.3),dc=g.at(-14.25,-3.3);wallPanel(glass,da,dc,g.entryFloor+.03,g.entryFloor+2.3,'#3b574e');for(const v of [-3.3,-1.1,1.1,3.3])batchBeam(metal,at(-14.3,v,g.entryFloor),at(-14.3,v,g.entryFloor+2.32),.035,'#bdcdbb');addCollider({points:g.rect(-14.35,-14.15,-3.6,3.6),base:g.base,bottom:g.entryFloor,top:g.entryFloor+2.35});
    const tex=canvasTexture(1024,128,(ctx,w,h)=>{ctx.fillStyle='#d2dacb';ctx.fillRect(0,0,w,h);ctx.fillStyle='#3f5143';ctx.font='500 70px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('NEW COLLEGE',w/2,h/2);}),sign=new THREE.Mesh(new THREE.PlaneGeometry(4.8,.38),new THREE.MeshBasicMaterial({map:tex})),sq=g.at(-18.72,0);sign.position.set(sq.x,g.base+3.28,sq.z);sign.rotation.y=Math.atan2(-f.u.x,-f.u.z);world.add(sign);
    for(const v of [-20,-11,13,23]){const q=g.at(-18.6,v),y=terrainHeight(q.x,q.z)-g.base+.22;box(brick,-18.6,v,y+.65,.22,1.3,6,'#8c7457');box(stone,-18.6,v,y+1.32,.28,.06,6.1,'#a8b19f');addCollider({points:g.rect(-18.74,-18.46,v-3,v+3),base:0,top:1.55,terrainOffset:1.55});}
    const dummy=new THREE.Object3D(),random=rng(6060),foliage=new THREE.InstancedMesh(new THREE.PlaneGeometry(.72,.72),style('#ffffff',{map:foliageTexture(),alphaTest:.42,side:THREE.DoubleSide}),g.trees.length*160);
    for(let i=0;i<g.trees.length*160;i++){const p=g.trees[Math.floor(i/160)],low=terrainHeight(p.x,p.z)-g.base+.22;if(i%160===0){batchPipe(wood,[p.x,low,p.z],[p.x+.25,low+p.height*.8,p.z],.13,'#8a8971');addCollider({x:p.x,z:p.z,radius:p.radius,base:0,top:terrainHeight(p.x,p.z)+p.height});}const a=random()*TAU,r=Math.sqrt(random())*2.1;dummy.position.set(p.x+Math.cos(a)*r,g.base+low+p.height*.85+(random()-.5)*2.7,p.z+Math.sin(a)*r);dummy.rotation.set(random()*Math.PI,random()*TAU,random()*Math.PI);dummy.scale.setScalar(.65+random()*.8);dummy.updateMatrix();foliage.setMatrixAt(i,dummy.matrix);foliage.setColorAt(i,new THREE.Color(['#78925b','#91a66e','#647e4b'][i%3]));}foliage.castShadow=foliage.receiveShadow=true;world.add(foliage);
    const texture=surfaceTexture('brick').clone();texture.repeat.set(1.6,1.6);const translucent=canopy.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,transparent:true,opacity:.87,depthWrite:false,roughness:.6}));translucent.castShadow=false;const clear=clearRoof.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,transparent:true,opacity:.28,depthWrite:false,roughness:.2}));clear.castShadow=false;
    world.add(brick.mesh(style('#ffffff',{vertexColors:true,map:texture})),stone.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.84})),metal.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,metalness:.35,roughness:.48})),glass.mesh(style('#ffffff',{vertexColors:true,roughness:.22,metalness:.2})),wood.mesh(style('#ffffff',{vertexColors:true,roughness:.8})),roof.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),translucent,clear);
  }

  function shalomCollege(b){
    const g=shalomGeometry(b),f=g.frame,brick=new Batch(),wood=new Batch(),metal=new Batch(),glass=new Batch(),roof=new Batch(),stone=new Batch(),green=new Batch();
    for(const q of [brick,wood,metal,glass,roof,stone,green])q.base=g.base;
    const angle=Math.atan2(-f.u.z,f.u.x),at=(u,v,y)=>{const p=g.at(u,v);return [p.x,y,p.z];};
    for(const face of SHALOM_FACES){
      const {a,b:c,normal:n,bottom,top,kind}=face,len=distance2(a,c),mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2}),nv=n.x*f.v.x+n.z*f.v.z;
      const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
      const panel=(batch,lo,hi,color,off=0,start=0,end=1)=>{lo=Math.max(bottom,lo);hi=Math.min(top,hi);start=Math.max(0,start);end=Math.min(1,end);if(hi>lo&&end>start)wallPanel(batch,a,c,lo,hi,color,off,start,end);};
      panel(kind==='common-upper'?wood:brick,bottom,top,kind==='common-upper'?'#796250':'#c1b79a');
      if(['balcony-wing','south-wing','common-upper'].includes(kind)){
        const height=q=>kind==='balcony-wing'?g.northRoof(q):kind==='south-wing'?g.southRoof(q):g.commonBody+.9*Math.max(0,1-Math.abs(g.local(q).v-7.2)/8.6),batch=kind==='south-wing'?brick:wood,color=kind==='south-wing'?'#c1b79a':'#756b54';
        for(let d=0;d<len;d+=.6){const t=d/len,u=Math.min(1,(d+.6)/len),a0=p(t,top),b0=p(u,top),ha=height({x:a0[0],z:a0[2]})-.04,hb=height({x:b0[0],z:b0[2]})-.04;if(ha>top&&hb>top)batch.quad(a0,p(t,ha),p(u,hb),b0,color,[[d/2,top/2],[d/2,ha/2],[Math.min(len,d+.6)/2,hb/2],[Math.min(len,d+.6)/2,top/2]]);if(kind==='south-wing')batchPipe(metal,p(t,ha+.055,.07),p(u,hb+.055,.07),.025,'#6c7768');}
      }

      if(kind==='common-upper'){
        panel(glass,4.7,6.2,'#3f5b50',.03,.07,.93);for(let d=.15;d<len;d+=1.6)panel(wood,4.5,6.6,'#5c5140',.08,d/len,Math.min(1,(d+.065)/len));for(let y=4.5;y<g.commonBody;y+=.19)if(y<4.7||y>6.2)panel(wood,y,y+.018,'#574b3c',.045);
      }else if(kind==='common-ground'){
        panel(glass,g.entryFloor+.12,4.28,'#3f5a51',.035,.06,.94);for(let d=.15;d<len;d+=1.7)panel(wood,g.entryFloor,4.4,'#514f3f',.07,d/len,Math.min(1,(d+.07)/len));
      }else{
        const isNorth=kind==='balcony-wing',isSouth=kind==='south-wing',rows=isSouth?2:3,level=isSouth?3.0:3.3,floor=isNorth?.75:isSouth?.6:1.55,bays=Math.max(1,Math.round(len/(isNorth?3.35:isSouth?5.6:3.3))),balconies=isNorth&&nv<-.7&&mid.v<-15||isSouth&&nv>.7;
        for(let bay=0;bay<bays;bay++){
          const centre=(bay+.5)/bays,half=(isSouth?.43:.53)/len;
          for(let row=0;row<rows;row++){
            const y=floor+row*level,lo=y+.15,hi=Math.min(top-.25,y+(isSouth?2.65:2.9));
            panel(glass,lo,hi,(bay+row)%4?'#3f5b54':'#7e8e7b',.035,centre-half,centre+half);
            for(const t of [centre-half,centre+half])panel(wood,lo-.025,hi+.025,'#4b4d3e',.085,t-.025/len,t+.025/len);
            panel(wood,hi-.03,hi+.025,'#4b4d3e',.085,centre-half,centre+half);
            if(isSouth){const t=centre+1.25/len;panel(glass,y+1.8,y+2.3,'#53685b',.035,t-.22/len,t+.22/len);}
            if(balconies&&row>0){
              const left=centre-.82/len,right=centre+.82/len,depth=1.06;
              stone.quad(p(left,y-.1,.01),p(right,y-.1,.01),p(right,y-.1,depth),p(left,y-.1,depth),'#adb09d');
              stone.quad(p(left,y-.24,depth),p(left,y-.1,depth),p(right,y-.1,depth),p(right,y-.24,depth),'#afb29e');
              const rail=isSouth?metal:wood,color=isSouth?'#354b40':'#76614d';panel(rail,y+.94,y+1.01,color,depth,left,right);
              for(let d=-.79;d<=.8;d+=.13)panel(rail,y-.08,y+.96,color,depth,centre+(d-.014)/len,centre+(d+.014)/len);
              for(const t of [left,right]){batchBeam(rail,p(t,y+.98,.03),p(t,y+.98,depth),.025,color);for(let d=.05;d<depth;d+=.14)batchBeam(rail,p(t,y-.08,d),p(t,y+.97,d),.016,color);}
              const points=[p(left,0,.02),p(right,0,.02),p(right,0,depth),p(left,0,depth)].map(q=>({x:q[0],z:q[2]}));addCollider({points,base:g.base,bottom:y-.24,top:y-.1});
            }
          }
        }
        if(isNorth&&nv<-.7){
          // A narrow white soffit and projecting dark rafter ends distinguish
          // the older room wings from the central flat-roof component.
          const y=g.northRoof({x:(a.x+c.x)/2,z:(a.z+c.z)/2});
          roof.quad(p(0,y,-.02),p(1,y,-.02),p(1,y,.65),p(0,y,.65),'#8e9181');roof.quad(p(0,y-.15,.65),p(1,y-.15,.65),p(1,y-.15,-.02),p(0,y-.15,-.02),'#bfc2ac');
          for(let d=.18;d<len;d+=.67)batchBeam(wood,p(d/len,y-.2,-.02),p(d/len,y-.2,.66),.045,'#5e5947');
          panel(wood,top-.16,top,'#615b49',.07);
          for(let d=.15;d<len;d+=.55){const q=p(d/len,.35,.5);green.box(q[0],terrainHeight(q[0],q[2])-g.base+.53,q[2],.55,.65,.48,'#607a4c',Math.atan2(-(c.z-a.z),c.x-a.x));}
        }
      }
    }
    for(const part of SHALOM_PARTS){addCollider({...part,base:g.base,bottom:part.minHeight,top:part.height});if(part.minHeight)polygon(stone,part.points,part.minHeight,'#aaa992',part.holes,true);}
    for(const part of SHALOM_ROOFS){
      const height=p=>part.kind==='balcony-wing'?g.northRoof(p):part.kind==='south-wing'?g.southRoof(p):part.kind==='common-upper'?g.commonBody+.9*Math.max(0,1-Math.abs(g.local(p).v-7.2)/8.6):part.height;
      shapedRoof(roof,part.points,height,part.kind==='common-upper'?'#9c917b':part.kind==='west-wing'?'#6b7569':'#9b9e8c',part.holes);
    }
    // The source outline is untouched; these garden / lightwell surfaces sit
    // inside explicit reconstructed openings and keep the regional ground.
    for(const part of SHALOM_GARDEN){shapedRoof(green,part.points,p=>terrainHeight(p.x,p.z)-g.base+.22,'#7c9159',part.holes);groundPatches.push({...part,heightAt:(x,z)=>terrainHeight(x,z)+.22});}
    for(const part of SHALOM_LIGHTWELLS)shapedRoof(stone,part.points,p=>terrainHeight(p.x,p.z)-g.base+.22,'#9caa93',part.holes);
    shapedRoof(stone,g.northWalk.points,p=>terrainHeight(p.x,p.z)-g.base+.22,'#aeb5a2');groundPatches.push({...g.northWalk,heightAt:(x,z)=>terrainHeight(x,z)+.22});
    polygon(stone,g.entryLanding.points,g.entryFloor,'#7f8b7d');groundPatches.push({...g.entryLanding,heightAt:()=>g.entryFloorRL+.015});addCollider({points:g.entryLanding.points,base:0,bottom:g.entryFloorRL-.16,top:g.entryFloorRL,stepHeight:.27});
    shapedRoof(stone,g.entryApproach.points,p=>g.entryGrade(p.x,p.z)-g.base,'#8a9585');groundPatches.push({...g.entryApproach,heightAt:(x,z)=>g.entryGrade(x,z)+.015});
    for(let v=16.2;v<22;v+=.78)polygon(metal,g.rect(-28.3,-25.7,v,v+.018),g.entryGrade(...Object.values(g.at(-27,v)))-g.base+.022,'#bbc0ac');
    // Bark beds and small strappy plants border the stone entrance path.
    for(const [u0,u1]of [[-31.3,-28.6],[-25.4,-22.7]]){shapedRoof(wood,g.rect(u0,u1,16.15,21.6),p=>terrainHeight(p.x,p.z)-g.base+.235,'#796f57');for(let u=u0+.25;u<u1;u+=.55)for(let v=16.5;v<21.5;v+=.6){const q=g.at(u,v),y=terrainHeight(q.x,q.z)-g.base+.25;for(let j=0;j<5;j++){const a=j*TAU/5+(u+v)*.3,dx=Math.cos(a),dz=Math.sin(a),r=.28;green.triangle([q.x-dz*.022,y,q.z+dx*.022],[q.x+dx*r,y+.45+(j%2)*.12,q.z+dz*r],[q.x+dz*.022,y,q.z-dx*.022],j%2?'#6b8050':'#84945d');green.triangle([q.x+dz*.022,y,q.z-dx*.022],[q.x+dx*r,y+.45+(j%2)*.12,q.z+dz*r],[q.x-dz*.022,y,q.z+dx*.022],j%2?'#6b8050':'#84945d');}}}
    const da=g.at(-28.15,11.9),dc=g.at(-25.85,11.9);wallPanel(glass,da,dc,g.entryFloor+.04,g.entryFloor+2.32,'#3a554b');
    for(const u of [-28.15,-27,-25.85])batchBeam(metal,at(u,11.95,g.entryFloor),at(u,11.95,g.entryFloor+2.35),.03,'#424d41');
    for(const y of [g.entryFloor+.06,g.entryFloor+1.18,g.entryFloor+2.35])batchBeam(metal,at(-28.15,11.95,y),at(-25.85,11.95,y),.03,'#424d41');
    addCollider({points:g.rect(-28.3,-25.7,11.85,12),base:g.base,bottom:g.entryFloor,top:g.entryFloor+2.4});
    const random=rng(9090),treeLeaves=new THREE.InstancedMesh(new THREE.PlaneGeometry(.7,.7),style('#ffffff',{map:foliageTexture(),alphaTest:.42,side:THREE.DoubleSide}),g.trees.length*250),dummy=new THREE.Object3D();
    for(let i=0;i<g.trees.length*250;i++){
      const t=g.trees[Math.floor(i/250)],y=terrainHeight(t.x,t.z)-g.base+.22;
      if(i%250===0){batchPipe(wood,[t.x,y,t.z],[t.x+.25,y+t.height*.75,t.z],.14,'#a39c82');for(let j=0;j<5;j++){const a=j*TAU/5;batchBeam(wood,[t.x,y+t.height*.5,t.z],[t.x+Math.cos(a)*2.5,y+t.height*.92,t.z+Math.sin(a)*2.5],.055,'#a39c82');}addCollider({x:t.x,z:t.z,radius:t.radius,base:0,top:terrainHeight(t.x,t.z)+t.height});}
      const a=random()*TAU,r=Math.sqrt(random())*2.65;dummy.position.set(t.x+Math.cos(a)*r,g.base+y+t.height*.87+(random()-.5)*2.5,t.z+Math.sin(a)*r);dummy.rotation.set(random()*Math.PI,random()*TAU,random()*Math.PI);dummy.scale.setScalar(.6+random()*.9);dummy.updateMatrix();treeLeaves.setMatrixAt(i,dummy.matrix);treeLeaves.setColorAt(i,new THREE.Color(t.v<0&&i%5===0?'#ad94c7':t.v<0&&i%5===1?'#947eb7':['#6c8651','#8fa568','#768f54'][i%3]));
    }treeLeaves.castShadow=treeLeaves.receiveShadow=true;world.add(treeLeaves);
    // Geometric tree-fern fronds use many small paired leaflets rather than a
    // single opaque cone; stems and planting locations remain approximations.
    for(const fern of g.ferns){
      const y=terrainHeight(fern.x,fern.z)-g.base+.22;batchPipe(wood,[fern.x,y,fern.z],[fern.x,y+fern.height,fern.z],.09,'#85785d');addCollider({x:fern.x,z:fern.z,radius:fern.radius,base:0,top:terrainHeight(fern.x,fern.z)+fern.height});
      for(let j=0;j<11;j++){const a=j*TAU/11,dx=Math.cos(a),dz=Math.sin(a),length=1.3+fern.height*.25;for(let k=0;k<13;k++){const t=k/13,tt=(k+1)/13,r=length*t,rr=length*tt,h=fern.height+.3*Math.sin(t*Math.PI)-.95*t*t,hh=fern.height+.3*Math.sin(tt*Math.PI)-.95*tt*tt;batchBeam(green,[fern.x+dx*r,y+h,fern.z+dz*r],[fern.x+dx*rr,y+hh,fern.z+dz*rr],.014,'#6c8650');const width=.36*Math.sin(Math.PI*t)+.04;for(const side of [-1,1]){const p=[fern.x+dx*r,y+h,fern.z+dz*r],q=[fern.x+dx*(r+.13)-dz*width*side,y+h-.1,fern.z+dz*(r+.13)+dx*width*side],c=[fern.x+dx*rr,y+hh,fern.z+dz*rr];green.triangle(p,q,c,j%2?'#789756':'#8da45d');green.triangle(c,q,p,j%2?'#789756':'#8da45d');}}}
    }
    for(const boulder of g.boulders){const y=terrainHeight(boulder.x,boulder.z)+.22,mesh=new THREE.Mesh(new THREE.IcosahedronGeometry(boulder.radius,2),style('#aeb2a2',{map:surfaceTexture('concrete'),roughness:.96}));mesh.position.set(boulder.x,y+boulder.radius*.47,boulder.z);mesh.rotation.set(boulder.u,.4,boulder.v);mesh.castShadow=mesh.receiveShadow=true;world.add(mesh);addCollider({x:boulder.x,z:boulder.z,radius:boulder.radius,base:0,top:y+boulder.radius*1.45});}
    // The southern photograph shows a planted boundary, masonry privacy wall
    // and dark gate in front of the lower wing, rather than exposed doors.
    for(const part of g.boundary){const ring=polygonArea(part.points)>0?part.points:[...part.points].reverse();for(let i=0;i<ring.length;i++){const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);for(let d=0;d<len;d+=.65){const t=d/len,u=Math.min(1,(d+.65)/len),p=t=>({x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t}),aa=p(t),bb=p(u),ya=terrainHeight(aa.x,aa.z)-g.base+.22,yb=terrainHeight(bb.x,bb.z)-g.base+.22;wood.quad([aa.x,ya,aa.z],[aa.x,ya+1.5,aa.z],[bb.x,yb+1.5,bb.z],[bb.x,yb,bb.z],'#6f6555');batchBeam(metal,[aa.x,ya+1.53,aa.z],[bb.x,yb+1.53,bb.z],.045,'#4c594a');}}addCollider({...part,base:0,top:1.72,terrainOffset:1.72});}
    for(let u=6;u<=10.01;u+=.13){const q=g.at(u,19.08),y=terrainHeight(q.x,q.z)-g.base+.22;batchBeam(metal,[q.x,y,q.z],[q.x,y+1.9,q.z],.022,'#35493e');}addCollider({...g.gate,base:0,top:2.12,terrainOffset:2.12});
    const southTex=canvasTexture(768,256,(ctx,w,h)=>{ctx.fillStyle='#45564a';ctx.fillRect(0,0,w,h);ctx.fillStyle='#d8dfd0';ctx.textAlign='center';ctx.font='600 67px Arial';ctx.fillText('B’NAI B’RITH',w/2,110);ctx.fillText('CENTRE',w/2,202);}),southSign=new THREE.Mesh(new THREE.PlaneGeometry(2.8,.95),new THREE.MeshBasicMaterial({map:southTex})),sq=g.at(3.7,19.23);southSign.position.set(sq.x,terrainHeight(sq.x,sq.z)+1.0,sq.z);southSign.rotation.y=Math.atan2(f.v.x,f.v.z);world.add(southSign);
    const signTexture=canvasTexture(640,256,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.fillStyle='#424d3f';ctx.font='700 75px Arial';ctx.textAlign='center';ctx.fillText('SHALOM',w/2,110);ctx.fillText('COLLEGE',w/2,205);}),sign=new THREE.Mesh(new THREE.PlaneGeometry(1.95,.8),new THREE.MeshBasicMaterial({map:signTexture,transparent:true,depthWrite:false})),q=g.at(28.9,-16.9);sign.position.set(q.x,g.base+2.55,q.z);sign.rotation.y=Math.atan2(-f.v.x,-f.v.z);world.add(sign);
    const texture=surfaceTexture('brick').clone();texture.repeat.set(1.6,1.6);
    world.add(brick.mesh(style('#ffffff',{vertexColors:true,map:texture})),wood.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.35,roughness:.45})),glass.mesh(style('#ffffff',{vertexColors:true,metalness:.2,roughness:.24})),roof.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.82})),stone.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),side:THREE.DoubleSide})),green.mesh(style('#ffffff',{vertexColors:true})));
  }

  function warraneCollege(b){
    const g=warraneGeometry(b),f=g.frame,brick=new Batch(),stone=new Batch(),metal=new Batch(),glass=new Batch(),roof=new Batch(),wood=new Batch(),green=new Batch();
    for(const q of [brick,stone,metal,glass,roof,wood,green])q.base=g.base;
    const angle=Math.atan2(-f.u.z,f.u.x),point=(u,v,y)=>{const p=g.at(u,v);return [p.x,y,p.z];};
    for(const face of WARRANE_FACES){
      const {a,b:c,normal:n,bottom,top}=face,len=distance2(a,c),mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2}),west=n.x*f.u.x+n.z*f.u.z<-.7;
      const panel=(batch,lo,hi,color,off=0,start=0,end=1)=>{lo=Math.max(bottom,lo);hi=Math.min(top,hi);start=Math.max(0,start);end=Math.min(1,end);if(hi>lo&&end>start)wallPanel(batch,a,c,lo,hi,color,off,start,end);};
      if(face.kind==='podium'){
        const inner=mid.u>-3.3&&mid.u<9.7&&mid.v>-22.9&&mid.v<1.1;
        panel(inner?stone:brick,bottom,top,inner?'#c1c3ae':'#847862');
        if(inner){
          panel(glass,g.floor+.12,g.podium-.24,'#49625b',.025,.025,.975);
          for(let d=.1;d<len;d+=2.1){const t=d/len;panel(stone,g.floor,g.podium,'#c6c8b5',.08,t-.065/len,t+.065/len);}
          for(const y of [g.floor+1.1,g.floor+2.35])panel(metal,y,y+.045,'#bcc6ba',.06);
        }else{
          panel(glass,g.podium-1.2,g.podium-.3,'#4c6258',.03,.025,.975);
          panel(stone,g.podium-.18,g.podium,'#c7c8b5',.15);
          if(west&&len>5)for(let d=1;d<len;d+=7.5){const t=d/len;panel(glass,.55,g.podium-1.35,'#50675c',.035,t-.48/len,t+.48/len);for(let y=1;y<g.podium-1.3;y+=1.1)panel(metal,y,y+.045,'#c1c9bb',.08,t-.5/len,t+.5/len);}
        }
      }else{
        panel(brick,bottom,top,'#93856c');
        if(face.kind==='stair-core'&&west){
          panel(stone,g.podium,top,'#c8c6af',.035,.28,.72);
          const level=(g.maximum-g.podium)/g.upperRows;
          for(let row=0;row<g.upperRows;row++){const lo=g.podium+row*level+.35,hi=lo+level*.59;panel(glass,lo,hi,'#425d59',.065,.285,.715);for(const t of [.285,.5,.715])panel(metal,lo,hi,'#c6cec1',.1,t-.025/len,t+.025/len);panel(metal,lo+.65,lo+.69,'#c5cdbe',.1,.285,.715);}
        }else{
          const bays=Math.max(1,Math.round(len/7.2)),level=(face.height-g.podium)/g.upperRows;
          for(let bay=0;bay<bays;bay++)for(const offset of [-.65,.65]){
            const centre=(bay+.5)/bays+offset/len,half=.48/len;
            panel(stone,g.podium,face.height-.18,'#c5c3ad',.035,centre-half,centre+half);
            for(let row=0;row<g.upperRows;row++){
              const lo=g.podium+row*level+.63,hi=g.podium+(row+1)*level-.23;
              panel(glass,lo,hi,(bay+row)%4===0?'#65766a':'#435d58',.065,centre-half+.045/len,centre+half-.045/len);
              for(const y of [lo,hi,lo+(hi-lo)*.48])panel(metal,y-.022,y+.022,'#cbd0c3',.09,centre-half,centre+half);
              for(const t of [centre-half,centre+half])panel(metal,lo,hi,'#bec9bc',.09,t-.018/len,t+.018/len);
              if((row+bay)%3===0)panel(stone,hi-.43,hi-.06,'#a8ad9a',.08,centre-half+.06/len,centre+half-.06/len);
            }
          }
        }
        panel(stone,face.height-.14,face.height,'#aaa999',.16);
      }
    }
    for(const p of WARRANE_PARTS){addCollider({...p,base:g.base,bottom:p.minHeight,top:p.height});if(p.minHeight)polygon(stone,p.points,p.minHeight,'#c5c6b4',p.holes,true);}
    for(const p of WARRANE_ROOFS){
      if(p.kind==='north-wing'||p.kind==='south-wing'){const centre=p.kind==='north-wing'?-10.39:-.975,half=p.kind==='north-wing'?7.19:7.075;shapedRoof(roof,p.points,q=>g.wingRoof-.45*Math.min(1,Math.abs(g.local(q).u-centre)/half),'#958b74',p.holes);}
      else polygon(roof,p.points,p.height,p.kind==='podium'?'#c4c1ab':'#9c9d8e',p.holes);
    }
    // The real open court is fitted inside the unchanged source perimeter.
    for(const p of WARRANE_COURT){polygon(stone,p.points,g.floor,'#b7baa7',p.holes);groundPatches.push({...p,heightAt:()=>g.floorRL+.015});}
    polygon(wood,g.deck.points,g.floor+.025,'#997452');
    for(let i=0,v=-20.2;v<-6.3;v+=.17,i++){polygon(wood,g.rect(-.8,6.5,v,Math.min(-6.3,v+.154)),g.floor+.029,['#99764f','#a47e54','#8d6e4c','#aa8258'][i%4]);for(let u=-.65+(i%3)*.8;u<6.5;u+=2.15)polygon(metal,g.rect(u,u+.012,v,Math.min(-6.3,v+.154)),g.floor+.032,'#67583e');}
    for(const p of g.garden){polygon(green,p.points,g.floor+.15,'#576d43');const ring=polygonArea(p.points)>0?p.points:[...p.points].reverse();for(let i=0;i<ring.length;i++)wallPanel(stone,ring[i],ring[(i+1)%ring.length],g.floor,g.floor+.14,'#b1b59f');}
    // Covered perimeter and broad southern gallery seen from the official tour.
    const galleries=[g.rect(-3.2,-1.35,-22.8,1),g.rect(7.8,9.6,-22.8,1),g.rect(-3.2,9.6,-22.8,-21.15),g.rect(-3.2,9.6,-6.5,1)];
    for(const p of galleries){polygon(stone,p,g.podium-.18,'#c3c5b0',[],true);polygon(stone,p,g.podium,'#b9bca8');addCollider({points:p,base:g.base,bottom:g.podium-.18,top:g.podium});}
    for(const p of g.columns){stone.box(p.x,(g.floor+g.podium)/2,p.z,.27,g.podium-g.floor,.27,'#bdc2ad',angle);addCollider({x:p.x,z:p.z,radius:.18,base:g.base,bottom:g.floor,top:g.podium});}
    const pergola=g.pergola;
    for(const p of pergola.posts){wood.box(p.x,g.floor+pergola.height/2,p.z,.18,pergola.height,.18,'#956844',angle);addCollider({x:p.x,z:p.z,radius:.13,base:g.base,bottom:g.floor,top:g.floor+pergola.height});}
    for(const u of [pergola.u0,pergola.u1])batchBeam(wood,point(u,pergola.v0,g.floor+3.0),point(u,pergola.v1,g.floor+3.0),.12,'#a7774e');
    for(let v=pergola.v0;v<=pergola.v1+.01;v+=1.4)batchBeam(wood,point(pergola.u0-.3,v,g.floor+3.16),point(pergola.u1+.3,v,g.floor+3.16),.09,'#a7774e');
    // Four timber chairs and a round table: a simplified outdoor furniture set.
    const centre=g.at(2.85,-13.0);polygon(wood,roundDisc(centre,.75,32),g.floor+.76,'#a48458');wood.box(centre.x,g.floor+.38,centre.z,.12,.76,.12,'#725d40');addCollider({x:centre.x,z:centre.z,radius:.76,base:g.base,bottom:g.floor,top:g.floor+.8});
    for(const [u,v,rot]of [[1.3,-13,Math.PI/2],[4.4,-13,-Math.PI/2],[2.85,-14.55,0],[2.85,-11.45,Math.PI]]){
      const q=g.at(u,v),a=angle+rot;wood.box(q.x,g.floor+.46,q.z,.6,.075,.57,'#a8814f',a);for(const dx of [-.23,.23])for(const dz of [-.21,.21]){const x=q.x+dx*Math.cos(a)+dz*Math.sin(a),z=q.z-dx*Math.sin(a)+dz*Math.cos(a);wood.box(x,g.floor+.23,z,.055,.46,.055,'#8f6e44');}const bx=q.x+Math.sin(a)*.25,bz=q.z+Math.cos(a)*.25;wood.box(bx,g.floor+.79,bz,.6,.6,.06,'#ac8855',a);addCollider({x:q.x,z:q.z,radius:.37,base:g.base,bottom:g.floor,top:g.floor+1.1});
    }
    const leafMap=foliageTexture(),leafMaterial=style('#a4af7b',{map:leafMap,alphaTest:.42,side:THREE.DoubleSide}),leaves=new THREE.InstancedMesh(new THREE.PlaneGeometry(.8,.8),leafMaterial,900),dummy=new THREE.Object3D(),random=rng(7007),tree=g.magnolia;
    batchPipe(wood,[tree.x,g.floor,tree.z],[tree.x+.2,g.floor+5.2,tree.z],.16,'#8b8268');addCollider({x:tree.x,z:tree.z,radius:tree.radius,base:g.base,bottom:g.floor,top:g.floor+tree.height});
    for(let j=0;j<5;j++){const a=j*TAU/5;batchBeam(wood,[tree.x,g.floor+3.4,tree.z],[tree.x+Math.cos(a)*2,g.floor+6,tree.z+Math.sin(a)*2],.07,'#9a8e73');}
    for(let i=0;i<900;i++){let x,z,y;if(i<260){const a=random()*TAU,r=Math.sqrt(random())*2.25;x=tree.x+Math.cos(a)*r;z=tree.z+Math.sin(a)*r;y=g.floor+6.1+(random()-.5)*2.5;}else if(i<420){const q=g.at(-.3+random()*3.0,-19.8+random()*13.0);x=q.x;z=q.z;y=g.floor+3.28+(random()-.5)*.55;}else{const q=g.at((i%2?-2.9:7.45)+random()*1.55,-20.8+random()*13.4);x=q.x;z=q.z;y=g.floor+.35+random()*.7;}dummy.position.set(x,g.base+y,z);dummy.rotation.set(random()*Math.PI,random()*TAU,random()*Math.PI);dummy.scale.setScalar((i>=420?.4:.65)+random()*(i>=420?.45:.7));dummy.updateMatrix();leaves.setMatrixAt(i,dummy.matrix);leaves.setColorAt(i,new THREE.Color(['#69854c','#8a9a60','#587747','#9aaa72'][i%4]));}leaves.castShadow=leaves.receiveShadow=true;world.add(leaves);
    // Entrance treads / landing use the very same levels as walking physics.
    stairSegments.push(g.stair);
    for(const t of g.stairTreads){polygon(stone,t.points,t.rl-g.base,'#777d73');for(let i=0;i<t.points.length;i++)wallPanel(stone,t.points[i],t.points[(i+1)%t.points.length],t.rl-g.base-.15,t.rl-g.base,'#626c63');}
    polygon(stone,g.landing.points,g.floor,'#a6ad9c');groundPatches.push({...g.landing,heightAt:()=>g.floorRL+.015});addCollider({points:g.landing.points,base:0,bottom:g.floorRL-.18,top:g.floorRL,stepHeight:.27});
    shapedRoof(stone,g.apron.points,p=>terrainHeight(p.x,p.z)-g.base+.22,'#b4b8a8');groundPatches.push({...g.apron,heightAt:(x,z)=>terrainHeight(x,z)+.22});
    for(const v of [-4.95,.95]){
      batchBeam(stone,point(-18.7,v,g.floor-.1),point(-17.65,v,g.podium),.32,'#bec0ad');
      batchPipe(metal,point(-21.7,v,g.low-g.base+.9),point(-18.1,v,g.floor+.9),.025,'#9eada0');batchPipe(metal,point(-18.1,v,g.floor+.9),point(-13.1,v,g.floor+.9),.025,'#9eada0');
      addCollider({points:g.rect(-18.9,-17.35,v-.28,v+.28),base:g.base,bottom:g.floor,top:g.podium});
    }
    for(const v of [-28,-20,-12,8.5,15.5])batchBeam(stone,point(-18.4,v,.25),point(-17.6,v,g.podium-.05),.27,'#c0c2af');
    // Closed silver-framed doors behind the glass canopy; no invented interior.
    const da=g.at(-13.05,.75),dc=g.at(-13.05,-4.75);wallPanel(glass,da,dc,g.floor+.08,g.floor+2.65,'#415f56');
    for(let v=-4.75;v<=.76;v+=1.375)batchPipe(metal,point(-13.1,v,g.floor),point(-13.1,v,g.floor+2.7),.035,'#c7cfc0');
    for(const y of [g.floor+.08,g.floor+1.1,g.floor+2.7])batchPipe(metal,point(-13.1,-4.75,y),point(-13.1,.75,y),.035,'#c7cfc0');
    addCollider({points:g.rect(-13.15,-12.95,-4.8,.8),base:g.base,bottom:g.floor,top:g.floor+2.75});
    // Thin suspended glass roof and steel tie rods visible in both entry photos.
    const canopy=g.rect(-19.7,-16.5,-5,.95);polygon(glass,canopy,g.floor+2.8,'#7a9490');polygon(glass,canopy,g.floor+2.8,'#7a9490',[],true);
    for(let v=-5;v<=.96;v+=1.19){batchBeam(metal,point(-19.7,v,g.floor+2.78),point(-16.5,v,g.floor+2.78),.035,'#344b41');batchPipe(metal,point(-19.65,v,g.floor+2.8),point(-17.5,v,g.podium-.2),.018,'#4e6256');}
    const tex=canvasTexture(1024,128,(ctx,w,h)=>{ctx.fillStyle='#d0cdb8';ctx.fillRect(0,0,w,h);ctx.fillStyle='#38473d';ctx.font='500 72px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('WARRANE COLLEGE',w/2,h/2);}),sign=new THREE.Mesh(new THREE.PlaneGeometry(5.4,.32),new THREE.MeshBasicMaterial({map:tex})),q=g.at(-19.74,-2);sign.position.set(q.x,g.floorRL+2.76,q.z);sign.rotation.y=Math.atan2(-f.u.x,-f.u.z);world.add(sign);
    for(const [v0,v1]of [[-30,-6],[2,16]]){
      const points=g.rect(-21.25,-19.4,v0,v1);shapedRoof(green,points,p=>terrainHeight(p.x,p.z)-g.base+.45,'#60754c');for(let v=v0+.5;v<v1;v+=.7){const q=g.at(-18.6,v);green.box(q.x,terrainHeight(q.x,q.z)-g.base+.67,q.z,1.35,.75,.75,'#617c4b',angle);}
      addCollider({points,base:0,top:1,terrainOffset:.85});
    }
    const texture=surfaceTexture('brick').clone();texture.repeat.set(1.6,1.6);
    world.add(brick.mesh(style('#ffffff',{vertexColors:true,map:texture})),stone.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),side:THREE.DoubleSide})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.45,roughness:.38})),glass.mesh(style('#ffffff',{vertexColors:true,metalness:.2,roughness:.22,side:THREE.DoubleSide})),roof.mesh(style('#ffffff',{vertexColors:true,roughness:.85})),wood.mesh(style('#ffffff',{vertexColors:true,roughness:.8})),green.mesh(style('#ffffff',{vertexColors:true})));
  }

  function bankBuilding(b){
    const g=bankGeometry(b),f=g.frame,brick=new Batch(),metal=new Batch(),glass=new Batch(),roof=new Batch(),stone=new Batch(),rails=new Batch();
    for(const q of [brick,metal,glass,roof])q.base=g.base;stone.base=rails.base=0;
    const ring=polygonArea(g.room)>0?g.room:[...g.room].reverse();
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},centre=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2}),north=n.x*f.v.x+n.z*f.v.z<-.6,returnFace=centre.v<-9.3&&n.x*f.u.x+n.z*f.u.z>.6;
      wallPanel(brick,a,c,0,g.fascia,'#776c5c');
      if((north||returnFace)&&len>1){
        const lo=g.entryFloor+.12,hi=g.fascia-.09,bays=Math.max(1,Math.round(len/2.25));
        wallPanel(glass,a,c,lo,hi,'#3a4c47',.025,.035,.965);
        for(let j=0;j<=bays;j++){const t=.035+.93*j/bays;wallPanel(metal,a,c,lo,hi,'#303e39',.065,t-.032/len,t+.032/len);}
        for(const y of [lo,lo+.95,hi])wallPanel(metal,a,c,y-.028,y+.028,'#37433d',.07,.035,.965);
        // Pale translucent manifestation band, drawn procedurally.
        wallPanel(glass,a,c,lo+1.14,lo+1.42,'#a8b4aa',.075,.035,.965);
        for(const t of [.025,.975]){const x=a.x+(c.x-a.x)*t+n.x*.14,z=a.z+(c.z-a.z)*t+n.z*.14;metal.box(x,(g.entryFloor+g.fascia)/2,z,.17,g.fascia-g.entryFloor,.17,'#2f3d36');}
      }else if(len>5&&centre.v>-8){
        // Rear elevations are simplified, rather than inferred from another
        // campus building: a restrained lower window band beneath brickwork.
        const bays=Math.max(1,Math.floor(len/4.2));for(let j=0;j<bays;j++){const t0=(j+.22)/bays,t1=(j+.78)/bays;wallPanel(glass,a,c,.9,2.45,'#42514b',.025,t0,t1);for(const t of [t0,t1])wallPanel(metal,a,c,.88,2.48,'#38483f',.06,t-.025/len,t+.025/len);}
      }
      wallPanel(metal,a,c,g.fascia-.12,g.fascia,'#293a32',.1);
    }
    const outer=polygonArea(b.points)>0?b.points:[...b.points].reverse();polygon(roof,outer,g.roof,'#657267');polygon(metal,outer,g.fascia,'#303e35',[],true);
    for(let i=0;i<outer.length;i++){const a=outer[i],c=outer[(i+1)%outer.length];wallPanel(metal,a,c,g.fascia,g.roof,'#344139',.035);for(const y of [g.fascia+.11,g.roof-.08])wallPanel(metal,a,c,y,y+.025,'#566156',.045);}
    addCollider({points:g.room,base:g.base,top:g.fascia});addCollider({points:b.points,base:g.base,bottom:g.fascia,top:g.roof});
    // Photo-led outdoor switchback, fitted clear of the retained northern and
    // western paths. Continuous walking patches use these exact rendered grades.
    for(const part of [...g.rampParts,g.landing,g.topApron,g.approach]){shapedRoof(stone,part.points,p=>part.heightAt(p.x,p.z),'#b8b6a4');groundPatches.push({...part,heightAt:(x,z)=>part.heightAt(x,z)+.015});}
    addCollider({points:g.landing.points,base:0,bottom:g.high-.16,top:g.high,stepHeight:.27});
    const rail=(a,c,h0,h1,brickEdge=true)=>{
      const len=distance2(a,c),point=(t,y)=>[a.x+(c.x-a.x)*t,y,a.z+(c.z-a.z)*t];
      if(brickEdge){brick.base=0;brick.quad(point(0,Math.min(terrainHeight(a.x,a.z),h0)-.08),point(0,h0+.14),point(1,h1+.14),point(1,Math.min(terrainHeight(c.x,c.z),h1)-.08),'#887762',[[0,(Math.min(terrainHeight(a.x,a.z),h0)-.08)/2],[0,(h0+.14)/2],[len/2,(h1+.14)/2],[len/2,(Math.min(terrainHeight(c.x,c.z),h1)-.08)/2]]);brick.base=g.base;}
      for(const y of [.66,1.0])batchPipe(rails,point(0,h0+y),point(1,h1+y),.024,'#b4bdb2');
      for(let d=0;d<=len+.01;d+=Math.min(1.65,len)){const t=d/len,y=h0+(h1-h0)*t;batchPipe(rails,point(t,y+.14),point(t,y+1.02),.021,'#a7b3a7');}
      const frame=orientedFrame([a,c],{x:c.x-a.x,z:c.z-a.z});addCollider({points:frameRectangle(frame,.075,len),base:0,bottom:Math.min(h0,h1)-.1,top:Math.max(h0,h1)+1.02});
    };
    for(const r of g.rampRails)rail(g.at(r.u0,r.v),g.at(r.u1,r.v),r.y0,r.y1);
    rail(g.at(-3.98,-13.38),g.at(-3.98,-10.48),g.mid,g.mid);
    // Dark-capped brick cheek walls and round silver double rails at the
    // mapped stair location. Keep the turn and entry landing open.
    for(const side of [-1,1]){const a=g.stair.a,c=g.stair.b,dx=c.x-a.x,dz=c.z-a.z,len=Math.hypot(dx,dz),n={x:dz/len,z:-dx/len};rail({x:a.x+n.x*(g.stair.width/2+.1)*side,z:a.z+n.z*(g.stair.width/2+.1)*side},{x:c.x+n.x*(g.stair.width/2+.1)*side,z:c.z+n.z*(g.stair.width/2+.1)*side},g.low,g.high);}
    const tex=canvasTexture(384,192,(ctx,w,h)=>{ctx.fillStyle='#334037';ctx.fillRect(0,0,w,h);ctx.fillStyle='#e2dfcb';ctx.font='500 64px Arial';ctx.textAlign='center';ctx.fillText('THE BANK',w/2,85);ctx.font='34px Arial';ctx.fillText('F22',w/2,143);});
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(1.45,.72),new THREE.MeshBasicMaterial({map:tex})),q=g.at(-6.2,-13.94);sign.position.set(q.x,g.high+1.35,q.z);sign.rotation.y=Math.atan2(-f.v.x,-f.v.z);world.add(sign);
    const texture=surfaceTexture('brick').clone();texture.repeat.set(1.6,1.6);
    world.add(brick.mesh(style('#ffffff',{vertexColors:true,map:texture,side:THREE.DoubleSide})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.45,roughness:.42,side:THREE.DoubleSide})),glass.mesh(style('#ffffff',{vertexColors:true,metalness:.2,roughness:.22})),roof.mesh(style('#ffffff',{vertexColors:true})),stone.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),rails.mesh(style('#ffffff',{vertexColors:true,metalness:.65,roughness:.28,side:THREE.DoubleSide})));
  }

  function l5Building(b){
    const g=l5Geometry(b),f=g.frame,concrete=new Batch(),metal=new Batch(),glass=new Batch(),wood=new Batch(),green=new Batch(),roof=new Batch();
    for(const batch of [concrete,metal,glass,wood,green,roof])batch.base=g.base;
    for(const face of L5_FACES){
      const {a,b:c,normal:n,bottom,top,kind}=face,len=distance2(a,c);if(len<.01)continue;
      const east=n.x*f.u.x+n.z*f.u.z>.8,west=n.x*f.u.x+n.z*f.u.z<-.8,along={x:(c.x-a.x)/len,z:(c.z-a.z)/len},angle=Math.atan2(-along.z,along.x);
      const point=(t,off=0)=>({x:a.x+(c.x-a.x)*t+n.x*off,z:a.z+(c.z-a.z)*t+n.z*off});
      const panel=(batch,lo,hi,col,off=0,start=0,end=1)=>{lo=Math.max(bottom,lo);hi=Math.min(top,hi);if(hi>lo&&end>start)wallPanel(batch,a,c,lo,hi,col,off,start,end);};
      panel(glass,bottom,top,'#405e71',-.28);
      // Deep pale structural blades with recessed blue glass. Every fine
      // floor line is independent of the broad two-floor concrete grouping.
      const bays=Math.max(1,Math.round(len/(east?2.38:3.05))),depth=east?.84:.46;
      for(let i=0;i<=bays;i++){
        const p=point(i/bays,.03);concrete.box(p.x,(bottom+top)/2,p.z,.16,top-bottom,depth,'#c0c4b8',angle);
      }
      const levels=kind==='west-wing'?[g.deck,8.38,12.44,g.westRoof]:[0,g.deck,8.8,12.74,16.68,20.62,24.56,g.roof];
      for(const y of levels){
        const broad=!east||[0,8.8,16.68,g.roof].some(h=>Math.abs(h-y)<.01),lo=Math.max(bottom,y-.1),hi=Math.min(top,y+.1);if(hi<=lo)continue;
        const p=point(.5,broad?.05:-.22);(broad?concrete:metal).box(p.x,(lo+hi)/2,p.z,len,hi-lo,broad?depth:.06,broad?'#bcc2b3':'#334a52',angle);
      }
      for(let i=0;i<bays;i++){
        const start=(i+.1)/bays,end=(i+.9)/bays;
        for(let row=0;row<levels.length-1;row++){
          const low=levels[row],high=levels[row+1];if(high<=bottom||low>=top)continue;
          // Variable blinds and fine transoms are procedural, not photos.
          if((i+row*3)%7<3)panel(metal,low+(high-low)*.62,high-.18,(i+row)%3?'#8f9c95':'#afb2a3',-.245,start,end);
          panel(metal,low+1.05,low+1.09,'#30454e',-.23,start,end);
          const mid=(start+end)/2;panel(metal,low,high,'#293e47',-.21,mid-.014/len,mid+.014/len);
        }
      }
      if(kind==='podium'){
        panel(concrete,bottom,bottom+.12,'#aeb6a6',.12);const low=Math.min(terrainHeight(a.x,a.z),terrainHeight(c.x,c.z))-g.base-.12;if(low<bottom)wallPanel(concrete,a,c,low,bottom+.01,'#a4afa1');
      }
      if(!east&&!west&&kind==='east-tower'){
        // Dark end service panels contrast with the open concrete street grid.
        panel(metal,bottom+.22,top-.22,'#34464b',-.20,.025,.18);for(let y=bottom+.25;y<top-.2;y+=.16)panel(metal,y,y+.018,'#758983',-.17,.025,.18);
      }
    }
    for(const p of L5_PARTS){polygon(roof,p.points,p.height,'#a4ad9e',p.holes);if(p.minHeight)polygon(roof,p.points,p.minHeight,'#c1c6b7',p.holes,true);addCollider({...p,base:g.base,bottom:p.minHeight,top:p.height,stepHeight:.25});}
    // The courtyard sits above teaching rooms. Keep the ceremonial stair
    // opening clear through the podium and the first east-wing floor.
    for(const p of L5_DECK){polygon(wood,p.points,g.deck+.015,'#9b7959',p.holes);groundPatches.push({...p,heightAt:()=>g.deckRL+.015});}
    for(let u=-8.3;u<7.4;u+=.15){const a=framePoint(f,u,-18.65),c=framePoint(f,u,18.65);batchBeam(wood,[a.x,g.deck+.023,a.z],[c.x,g.deck+.023,c.z],.009,'#705b44');}
    const s=g.stair,run=distance2(s.a,s.b),along={x:(s.b.x-s.a.x)/run,z:(s.b.z-s.a.z)/run},side={x:-along.z,z:along.x};stairSegments.push({...s,h0:s.h0+.015,h1:s.h1+.015});
    for(let i=0;i<s.count;i++){
      const t=i/s.count,next=(i+1)/s.count,y=s.h0+(s.h1-s.h0)*i/s.count-g.base+.075;
      const a={x:s.a.x+(s.b.x-s.a.x)*t,z:s.a.z+(s.b.z-s.a.z)*t},c={x:s.a.x+(s.b.x-s.a.x)*next,z:s.a.z+(s.b.z-s.a.z)*next};
      const points=[{x:a.x+side.x*s.width/2,z:a.z+side.z*s.width/2},{x:a.x-side.x*s.width/2,z:a.z-side.z*s.width/2},{x:c.x-side.x*s.width/2,z:c.z-side.z*s.width/2},{x:c.x+side.x*s.width/2,z:c.z+side.z*s.width/2}];
      polygon(wood,points,y,'#8e684b');wallPanel(wood,points[0],points[1],y-(s.h1-s.h0)/s.count,y,'#75543d');
      for(const off of [-s.width/2+.12,s.width/2-.12]){const a0={x:a.x+side.x*off,z:a.z+side.z*off},b0={x:c.x+side.x*off,z:c.z+side.z*off};batchBeam(metal,[a0.x,y+.01,a0.z],[b0.x,y+.01,b0.z],.018,'#bcc7bc');}
    }
    for(const offset of [-s.width/2+.28,0,s.width/2-.28]){
      const rail=(p,y)=>[p.x+side.x*offset,y-g.base,p.z+side.z*offset];batchPipe(metal,rail(s.a,s.h0+.95),rail(s.b,s.h1+.95),.027,'#abbcb5');
      for(let i=0;i<=6;i++){const t=i/6,p={x:s.a.x+(s.b.x-s.a.x)*t,z:s.a.z+(s.b.z-s.a.z)*t},y=s.h0+(s.h1-s.h0)*t;batchPipe(metal,rail(p,y),rail(p,y+.95),.023,'#9dafaa');}
    }
    for(const bench of g.benches){wood.box(bench.x,g.deck+.44,bench.z,bench.depth,.09,bench.width,'#92744e',-Math.atan2(f.u.z,f.u.x));for(const v of [-bench.width*.36,bench.width*.36]){const p=framePoint(f,bench.u,bench.v+v);metal.box(p.x,g.deck+.22,p.z,.35,.4,.1,'#4c5f57',-Math.atan2(f.u.z,f.u.x));}addCollider({points:bench.points,base:g.base,bottom:g.deck,top:g.deck+.49});}
    for(const p of g.planters){
      const pit=new THREE.Mesh(new THREE.CylinderGeometry(p.radius,p.radius,.09,16),style('#43563c'));pit.position.set(p.x,g.deckRL+.035,p.z);world.add(pit);
      for(let j=0;j<7;j++){
        const a=j*2.399,r=.15+(j%3)*.11,x=p.x+Math.cos(a)*r,z=p.z+Math.sin(a)*r,height=p.height-(j%3)*.5;
        batchPipe(green,[x,g.deck,z],[x+.12,g.deck+height,z-.09],.022,'#617e3e');
        for(let y=.4;y<height;y+=.38){
          green.box(x+.12*y/height,g.deck+y,z-.09*y/height,.052,.017,.052,'#869151');if(y<height*.42)continue;
          for(const side of [-1,1]){const angle=a+y*1.7,dx=Math.cos(angle)*side,dz=Math.sin(angle)*side,tip=[x+dx*.72,g.deck+y+.18,z+dz*.72];batchPipe(green,[x,g.deck+y,z],tip,.009,'#647d3c');
            for(let leaf=1;leaf<=6;leaf++){const t=leaf/7,cx=x+dx*.72*t,cz=z+dz*.72*t,cy=g.deck+y+.18*t,sign=leaf%2?1:-1,lx=dx*.45-dz*sign*.65,lz=dz*.45+dx*sign*.65,length=.21+(leaf%3)*.035;
              green.quad([cx,cy,cz],[cx+lx*length*.48-lz*.025,cy+.045,cz+lz*length*.48+lx*.025],[cx+lx*length,cy-.055,cz+lz*length],[cx+lx*length*.48+lz*.025,cy+.025,cz+lz*length*.48-lx*.025],leaf%2?'#5e803f':'#7c954e');
            }
          }
        }
      }
      addCollider({x:p.x,z:p.z,radius:p.radius,base:g.base,bottom:g.deck,top:g.deck+.15});
    }
    // Current official photographs show planted bench edges and shade sails;
    // positions / dimensions are estimates. Leave the entry route unobstructed.
    const shade=new Batch();shade.base=g.base;for(const v of [2,11]){const a=framePoint(f,-7.3,v-3.7),c=framePoint(f,6.8,v-3.7),d=framePoint(f,6.8,v+3.7),e=framePoint(f,-7.3,v+3.7);shade.quad([a.x,g.deck+5.1,a.z],[c.x,g.deck+5.45,c.z],[d.x,g.deck+5.45,d.z],[e.x,g.deck+5.1,e.z],'#ddd7bd');for(const [p,y]of [[a,5.1],[c,5.45],[d,5.45],[e,5.1]]){const q=g.local(p),anchor=framePoint(f,q.u<0?-8.5:7.4,q.v);batchPipe(metal,[p.x,g.deck+y,p.z],[anchor.x,g.deck+y+.1,anchor.z],.024,'#758a7d');}}
    // Low rooftop service masses stay within their respective source wings.
    const plant=framePoint(f,15.5,6);roof.box(plant.x,29.25,plant.z,6.5,1.5,19,'#9ba79b',-Math.atan2(f.u.z,f.u.x));for(let v=-1;v<14;v+=3){const p=framePoint(f,15.5,v);metal.box(p.x,29.98,p.z,3.4,.04,1.3,'#6b7b71',-Math.atan2(f.u.z,f.u.x));}
    const glazing=glass.mesh(style('#ffffff',{vertexColors:true,roughness:.12,metalness:.24,envMapIntensity:.65}));world.add(glazing);medicalReflection(glazing,framePoint(f,35,0),g.base+12);
    world.add(concrete.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),bumpMap:surfaceTexture('concrete'),bumpScale:.012})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.3,roughness:.5})),wood.mesh(style('#ffffff',{vertexColors:true,roughness:.86})),green.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),roof.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),shade.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.96})));
  }

  function postgraduateVillage(b){
    const g=ncpvGeometry(b),f=g.frame,wall=new Batch(),metal=new Batch(),glass=new Batch(),red=new Batch(),roof=new Batch(),garden=new Batch();for(const q of [wall,metal,glass,red,roof,garden])q.base=g.base;
    for(const face of NCPV_FACES){
      const {a,b:c,normal:n,bottom,top,kind}=face,len=distance2(a,c);if(len<.02)continue;
      const panel=(batch,lo,hi,color,off=0,start=0,end=1)=>{lo=Math.max(bottom,lo);hi=Math.min(top,hi);start=Math.max(0,start);end=Math.min(1,end);if(hi>lo&&end>start)wallPanel(batch,a,c,lo,hi,color,off,start,end);};
      const p=(t,y,off)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off],south=n.x*f.v.x+n.z*f.v.z>.8;
      if(bottom===0)wallPanel(wall,a,c,Math.min(terrainHeight(a.x,a.z),terrainHeight(c.x,c.z))-g.base-.15,.05,'#8f9e94');
      if(kind==='red'){
        panel(red,bottom,top,'#ad4d35');for(let y=3.16;y<g.redHeight;y+=.18)panel(metal,y,y+.008,'#814936',.012);for(let d=.08;d<len;d+=.14)panel(metal,bottom,top,'#93442f',.016,d/len,Math.min(1,(d+.008)/len));
        const bays=Math.max(1,Math.round(len/5.4));for(let row=0;row<2;row++)for(let j=0;j<bays;j++){
          const y=3.1+row*3.25,lo=y+1.05,hi=y+1.95,start=(j+.18)/bays,end=(j+.86)/bays;
          panel(wall,lo-.07,hi+.07,'#c5c7b6',.13,start-.06/len,end+.06/len);panel(glass,lo,hi,'#405966',.16,start,end);
          panel(metal,lo,hi,'#8b9d9c',.19,(start+end)/2-.035/len,(start+end)/2+.035/len);
          if(j===0){panel(wall,lo-.2,hi+.32,'#b8bdb0',.37,start,start+.18/len);panel(metal,hi+.1,hi+.25,'#63777a',.64,start-.02,end+.02);}
        }
        for(const y of [3.1,g.redHeight-.16])panel(wall,y,y+.14,'#c5c8b8',.15);
      }else if(kind==='ground'){
        panel(wall,bottom,top,'#adb6a6');panel(glass,.14,2.89,'#49656c',.035,.02,.98);for(let d=.1;d<len;d+=1.5)panel(metal,.14,2.91,'#8b9b9c',.08,d/len,Math.min(1,(d+.045)/len));
      }else{
        const blue=kind==='blue',color=blue?'#638194':'#c9cbbd',level=(g.bodyHeight-.15)/7,bays=Math.max(1,Math.round(len/(blue?2.1:3.1)));
        panel(wall,bottom,top,color);
        for(let row=0;row<7;row++)for(let bay=0;bay<bays;bay++){
          const y=row*level,balcony=!blue&&south&&bay>=Math.floor(bays*.4)&&bay<Math.ceil(bays*.65)&&row>0,start=(bay+(balcony?.07:.24))/bays,end=(bay+(balcony?.94:.74))/bays,lo=y+.55,hi=y+(blue?1.65:2.32);
          panel(metal,lo-.045,hi+.045,'#aebcbd',.05,start-.04/len,end+.04/len);panel(glass,lo,hi,blue?'#3e5968':'#4a6978',.075,start,end);
          panel(metal,lo,hi,'#9bb0b6',.1,(start+end)/2-.02/len,(start+end)/2+.02/len);
          panel(wall,hi+.06,hi+.17,blue?'#bdc6c3':'#d5d5c3',.32,start-.09/len,end+.09/len);
          if(balcony&&y>=bottom&&y+1.2<=top){wall.quad(p(start,y+.08,.05),p(end,y+.08,.05),p(end,y+.08,.72),p(start,y+.08,.72),'#c7caba');panel(wall,y+.08,y+.38,'#c9ccba',.73,start,end);panel(metal,y+1.03,y+1.08,'#aabbb6',.75,start,end);for(let d=start*len;d<end*len;d+=.16)panel(metal,y+.38,y+1.05,'#9aada8',.74,d/len,Math.min(end,(d+.018)/len));}
        }
        panel(wall,g.bodyHeight-.16,g.bodyHeight,'#cbd0bf',.25);
      }
    }
    for(const part of NCPV_PARTS){polygon(roof,part.points,part.height,'#9ba99e',part.holes);if(part.minHeight)polygon(roof,part.points,part.minHeight,'#bfc8b6',part.holes,true);addCollider({...part,base:g.base,bottom:part.minHeight,top:part.height});}
    // Two exposed, originally separate mapped blocks belong to this same H3
    // complex: the low north common-room wing and blue Day Avenue corner.
    for(const v of [-18.9,-11.5])for(let u=-10.5;u<13;u+=4){const p=framePoint(f,u,v),low=terrainHeight(p.x,p.z)-g.base;wall.box(p.x,(low+3.1)/2,p.z,.34,3.1-low,.34,'#c9cebd');addCollider({x:p.x,z:p.z,radius:.21,base:g.base,bottom:low,top:3.1});}
    const terrace=ringOfNcpv(g.redTerrace);polygon(roof,terrace,g.redHeight+.025,'#999f90');
    for(let i=0;i<terrace.length;i++){const a=terrace[i],c=terrace[(i+1)%terrace.length],len=distance2(a,c);wallPanel(metal,a,c,g.redHeight+1.05,g.redHeight+1.1,'#657c7a');for(let d=0;d<len;d+=1.7){const t=d/len,p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t};metal.box(p.x,g.redHeight+.57,p.z,.045,1.1,.045,'#657c7a');}}
    const beam=(u0,v0,u1,v1,y,width=.09)=>{const a=framePoint(f,u0,v0),c=framePoint(f,u1,v1);batchBeam(metal,[a.x,y,a.z],[c.x,y,c.z],width,'#465a5b');};
    for(const u of [-10.5,11.5])for(const v of [-17.7,-12.5]){const p=framePoint(f,u,v);metal.box(p.x,g.redHeight+1.08,p.z,.11,2.16,.11,'#4c6060');}
    for(const v of [-17.7,-15.1,-12.5])beam(-10.5,v,11.5,v,g.redHeight+2.16,.11);for(let u=-10.5;u<12;u+=2.2)beam(u,-17.7,u,-12.5,g.redHeight+2.2,.08);
    for(const uv of [[-17,0],[0,14]]){const p=framePoint(f,...uv);if(inPolygon(p.x,p.z,b.points))roof.box(p.x,g.bodyHeight+.325,p.z,2.2,.65,1.8,'#aab4a8',-Math.atan2(f.u.z,f.u.x));}
    // Stand-off blue double skin on Anzac Parade, separate from the white
    // bedroom wall behind it; curtain wall and small frit motifs are procedural.
    const sc=g.screen,sa=framePoint(f,sc.u,sc.v0),sb=framePoint(f,sc.u,sc.v1),screen=new Batch(),frit=new Batch();screen.base=frit.base=g.base;
    const skin=(t,y,off=0)=>[sa.x+(sb.x-sa.x)*t+f.u.x*off,y,sa.z+(sb.z-sa.z)*t+f.u.z*off],length=sc.v1-sc.v0;
    screen.quad(skin(0,sc.bottom),skin(0,sc.top-.18),skin(1,sc.top-.18),skin(1,sc.bottom),'#7ab0c3');
    for(let d=0;d<=length;d+=1.2){const p=framePoint(f,sc.u,sc.v0+d);metal.box(p.x,(sc.bottom+sc.top)/2,p.z,.07,sc.top-sc.bottom,.07,'#8ca2a2');}
    for(let y=sc.bottom;y<sc.top;y+=1.36)batchBeam(metal,skin(0,y,.07),skin(1,y,.07),.075,'#9aadaa');
    for(const t of [0,1]){const p=framePoint(f,sc.u,sc.v0+length*t);metal.box(p.x,sc.top/2,p.z,.11,sc.top,.11,'#9aafad');addCollider({x:p.x,z:p.z,radius:.11,base:g.base,top:sc.top});}
    const random=rng(2733);for(const mid of [.2,.76])for(let d=-.4;d<.4;d+=.1)for(let y=sc.bottom+.2;y<sc.top-.4;y+=.12)if(random()<.29){const t=mid+d/length,w=.035/length;frit.quad(skin(t-w,y,.06),skin(t-w,y+.045,.06),skin(t+w,y+.045,.06),skin(t+w,y,.06),'#c9dfd7');}
    const glassSkin=screen.mesh(style('#b5d3dd',{vertexColors:true,transparent:true,opacity:.3,depthWrite:false,roughness:.065,metalness:.18,side:THREE.DoubleSide,envMapIntensity:.65}));world.add(glassSkin,frit.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));medicalReflection(glassSkin,framePoint(f,31,-4),g.base+10);
    const text=canvasTexture(256,2048,(ctx,w,h)=>{ctx.fillStyle='#e2e6d7';ctx.fillRect(0,0,w,h);ctx.save();ctx.translate(w/2,h/2);ctx.rotate(-Math.PI/2);ctx.fillStyle='#40555a';ctx.font='600 90px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('NEW COLLEGE POSTGRADUATE VILLAGE',0,0,h-60);ctx.restore();});
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(.95,17.5),new THREE.MeshBasicMaterial({map:text})),sp=framePoint(f,sc.u+.13,sc.v0-.65);sign.position.set(sp.x,g.base+11,sp.z);sign.rotation.y=Math.atan2(f.u.x,f.u.z);world.add(sign);
    // The inner lawn is an outdoor map viewpoint. Residence interiors and
    // present access conditions are not represented by the game.
    for(const patch of NCPV_PAVING){polygon(wall,patch.points,g.courtFloor-g.base,'#b5b8a3',patch.holes);groundPatches.push({...patch,heightAt:()=>g.courtFloor});}
    polygon(garden,g.courtLawn,g.courtFloor-g.base-.015,'#789451');groundPatches.push({points:g.courtLawn,heightAt:()=>g.courtFloor-.015});
    for(const uv of [[-8,4],[7,4]]){const p=framePoint(f,...uv);wall.box(p.x,g.courtFloor-g.base+.23,p.z,2.2,.46,.55,'#a9b09d',-Math.atan2(f.u.z,f.u.x));addCollider({points:frameRectangle(f,2.2,.55,...uv),base:0,top:g.courtFloor+.46});}
    for(const p of g.hedges){const low=terrainHeight(p.x,p.z)-g.base;garden.box(p.x,low+p.height/2,p.z,p.radius*2,p.height,p.radius*2,'#4d703e');}
    world.add(wall.mesh(style('#ffffff',{vertexColors:true,roughness:.88})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.35,roughness:.45})),glass.mesh(style('#ffffff',{vertexColors:true,roughness:.14,metalness:.2})),red.mesh(style('#ffffff',{vertexColors:true,roughness:.82})),roof.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),garden.mesh(style('#ffffff',{vertexColors:true})));
  }
  function ringOfNcpv(points){return polygonArea(points)>0?points:[...points].reverse();}

  function villageResidence(b){
    const plaster=new Batch(),metal=new Batch(),glazing=new Batch(),timber=new Batch(),roof=new Batch(),paving=new Batch();
    for(const q of [plaster,metal,glazing,timber,roof,paving])q.base=0;
    const cfg=VILLAGE_FACADE;
    // Only exposed vertical intervals receive a facade. Internal partition
    // edges stay invisible, including those across the mapped public passages.
    for(const face of VILLAGE_FACADES){
      const {a,b:c,normal:n,base,bottom,top,kind}=face,len=distance2(a,c);if(len<.025)continue;
      const panel=(batch,lo,hi,color,off=0,start=0,end=1)=>{lo=Math.max(bottom,lo);hi=Math.min(top,hi);start=Math.max(0,start);end=Math.min(1,end);if(hi>lo&&end>start)wallPanel(batch,a,c,base+lo,base+hi,color,off,start,end);};
      const p=(t,y,off)=>[a.x+(c.x-a.x)*t+n.x*off,base+y,a.z+(c.z-a.z)*t+n.z*off];
      const shelf=(y,inner,outer,color)=>{if(y<bottom||y>top)return;plaster.quad(p(0,y,inner),p(1,y,inner),p(1,y,outer),p(0,y,outer),color);};
      if(kind==='core'){
        panel(plaster,bottom,top,'#d1d0bf');panel(metal,bottom,top,'#d2b044',.025,.04,Math.min(1,.04+.65/len));
        for(let y=6.7;y<face.height;y+=cfg.level){panel(glazing,y,y+.48,'#344b4b',.04,.36,.88);for(const t of [.36,.88])panel(metal,y,y+.48,'#6a7770',.065,t-.02/len,t+.02/len);}
      }else if(kind==='end'){
        panel(metal,bottom,top,'#46534f');
        for(let d=.2;d<len;d+=1.25)panel(metal,bottom,top,'#606964',.025,d/len,Math.min(1,(d+.018)/len));
        for(let f=0;f<face.floors;f++){
          const y=f*cfg.level;panel(metal,y,y+.025,'#718076',.03);
          const bays=Math.max(1,Math.round(len/3.1));for(let j=0;j<bays;j++){
            const start=(j+.29)/bays,end=(j+.8)/bays;panel(plaster,y+.75,y+2.44,'#b2b9aa',.08,start-.06/len,end+.06/len);panel(glazing,y+.82,y+2.37,'#334e50',.1,start,end);panel(metal,y+.82,y+2.37,'#929e90',.12,(start+end)/2-.025/len,(start+end)/2+.025/len);
          }
        }
      }else{
        for(let f=0;f<face.floors;f++){
          const y=f*cfg.level,ceiling=Math.min(face.height,y+cfg.level),screen=kind==='screen'&&f>0;
          if(screen){
            panel(glazing,y+.12,ceiling-.18,'#304b4a',-cfg.screenDepth);
            shelf(y+.1,-cfg.screenDepth,.15,'#b9bca9');shelf(ceiling-.17,.15,-cfg.screenDepth,'#c3c4b3');
            panel(plaster,y,y+.17,'#b8bba9',.15);panel(plaster,ceiling-.18,ceiling,'#c5c6b5',.15);
            for(let h=y+.24;h<ceiling-.2;h+=cfg.slatPitch)panel(timber,h,h+cfg.slatHeight,'#a28a5f',.1);
            for(let d=.04;d<len;d+=2.5)panel(metal,y+.16,ceiling-.16,'#77857c',.16,d/len,Math.min(1,(d+.055)/len));
          }else{
            const parapet=f===0?.12:cfg.bandParapet,low=y+parapet,hi=ceiling-.22;
            panel(plaster,y,y+parapet,f===0?'#928972':'#c7c8b5',f===0?.015:cfg.balconyDepth);
            panel(glazing,y+.015,ceiling-.015,'#354d4d',f===0?.025:-.34);
            shelf(hi,.12,-.34,'#b8bead');
            panel(plaster,hi,ceiling,'#bfc3b0',.12);
            if(f>0){shelf(y+.1,-.34,cfg.balconyDepth,'#c4c5b1');shelf(y+parapet,cfg.balconyDepth,-.05,'#d0d0bb');}
            // Aligned vertical mullions and sliding opaque panels within the
            // dark strip replace the old random yellow window checkerboard.
            const along=Math.abs(n.x*VILLAGE_AXIS.x+n.z*VILLAGE_AXIS.z)>.8?VILLAGE_CROSS:VILLAGE_AXIS;
            const origin=a.x*along.x+a.z*along.z,direction=((c.x-a.x)*along.x+(c.z-a.z)*along.z)/len;
            const span=direction*len,minimum=Math.min(origin,origin+span),maximum=Math.max(origin,origin+span);
            if(Math.abs(span)>.01){
              for(let coord=Math.ceil(minimum/1.7)*1.7;coord<=maximum;coord+=1.7){const t=(coord-origin)/span;panel(metal,low,hi,'#7c8980',-.27,t-.025/len,t+.025/len);}
              const shift=(f%3)*.31;for(let coord=Math.floor(minimum/3.4)*3.4-3.4;coord<maximum+3.4;coord+=3.4){const t1=(coord+shift-origin)/span,t2=(coord+shift+1.02-origin)/span;panel(metal,low,hi,f%2?'#8f9990':'#a1a79b',-.05,Math.min(t1,t2),Math.max(t1,t2));}
            }
            if(f===0)panel(timber,ceiling-.67,ceiling-.22,'#9f967e',.13);
          }
        }
      }
      panel(plaster,face.height-.13,face.height,'#d1d1bd',.18);
      if(face.security){
        const low=base+.12,high=base+2.73;
        wallPanel(glazing,a,c,low,high,'#3c5556',.08,.02,.98);
        for(let j=0;j<=6;j++){const t=.02+.96*j/6;wallPanel(metal,a,c,low,high,'#83928b',.13,Math.max(0,t-.035/len),Math.min(1,t+.035/len));}
        wallPanel(metal,a,c,base+2.71,base+3.08,'#a4a58e',.13);
        const tex=canvasTexture(1024,256,(ctx,w,h)=>{ctx.fillStyle='#e8d792';ctx.fillRect(0,0,w,h);ctx.fillStyle='#304e57';ctx.font='600 88px Arial';ctx.textAlign='center';ctx.fillText('Campus Security',w/2,112);ctx.font='500 50px Arial';ctx.fillText('UNSW',w/2,198);});
        const sign=new THREE.Mesh(new THREE.PlaneGeometry(Math.min(5.3,len-.4),1.15),new THREE.MeshBasicMaterial({map:tex}));sign.position.set((a.x+c.x)/2+n.x*.155,base+1.98,(a.z+c.z)/2+n.z*.155);sign.rotation.y=Math.atan2(n.x,n.z);world.add(sign);
      }
    }
    for(const part of RESIDENTIAL_PARTS.filter(p=>p.parent===b.id)){
      const base=buildingBase(part.points);roof.base=base;polygon(roof,part.points,part.height,'#a0a998',part.holes);
      if(part.minHeight)polygon(roof,part.points,part.minHeight,'#bfc2af',part.holes,true);
      addCollider({points:part.points,holes:part.holes,bottom:part.minHeight,top:part.height,base});
    }
    for(const part of VILLAGE_ENTRY_PAVING){shapedRoof(paving,part.points,p=>terrainHeight(p.x,p.z)+.22,'#b9b8a5',part.holes);groundPatches.push({...part,heightAt:(x,z)=>terrainHeight(x,z)+.22});}
    world.add(plaster.mesh(style('#ffffff',{vertexColors:true})),metal.mesh(style('#ffffff',{vertexColors:true,roughness:.66})),glazing.mesh(style('#ffffff',{vertexColors:true,roughness:.23,metalness:.25})),timber.mesh(style('#ffffff',{vertexColors:true,roughness:.92})),roof.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),paving.mesh(style('#ffffff',{vertexColors:true})));
  }

  function residentialComplex(b,profile,concrete,glass,detail,roofs){
    const village=profile.facade==='village',parts=RESIDENTIAL_PARTS.filter(p=>p.parent===b.id);
    for(const part of parts){
      const base=buildingBase(part.points),bottom=part.minHeight||0,height=part.height,level=height/part.floors;
      for(const batch of [concrete,glass,detail,roofs])batch.base=base;
      polygon(roofs,part.points,height,'#9aa79c',part.holes);
      if(bottom){
        const underside=new Batch();underside.base=base;polygon(underside,part.points,bottom,'#c9cbbc',part.holes);
        world.add(underside.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
      }
      const outer=polygonArea(part.points)<0?[...part.points].reverse():part.points;
      for(const ring of [outer,...part.holes.map(h=>polygonArea(h)>0?[...h].reverse():h)])for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.35)continue;
        const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
        const southern=nz>.7,screen=village&&Math.abs(nz)>.7;
        const color=village?(screen?'#c5b38c':'#bac0b7'):(height<20?'#c3ad78':'#687f85');
        wallPanel(concrete,a,c,bottom,height,color);
        wallPanel(detail,a,c,height-.12,height+.18,'#cdd1c0',.16);
        for(let f=Math.floor(bottom/level);f<part.floors;f++){
          const low=Math.max(bottom,f*level+(village&&f>0?1.2:.5)),top=(f+1)*level-.3;if(top<=low)continue;
          if(!village&&southern&&len>20){
            wallPanel(glass,a,c,low,top,'#548e97',.5,.005,.995);
            wallPanel(detail,a,c,f*level+.05,f*level+.13,'#c0d2c9',.57);
            for(let d=.25;d<len;d+=2.8)wallPanel(detail,a,c,low,top,'#9db7b0',.56,d/len,Math.min(1,(d+.045)/len));
          }else{
            const bays=Math.max(1,Math.round(len/(screen?3.6:4.2)));
            for(let bay=0;bay<bays;bay++){
              const start=(bay+.12)/bays,end=(bay+.9)/bays;
              wallPanel(glass,a,c,low,top,profile.glass,.065,start,end);
              if(screen){
                for(let y=low;y<top;y+=.19)wallPanel(detail,a,c,y,y+.045,'#bca16b',.28,start,end);
                wallPanel(detail,a,c,low,top,'#a7b5a8',.32,start,start+.06/len);
              }else{
                const fascia=village?(f%3===1?'#98a49e':'#d4d6c9'):'#c5cebe';
                wallPanel(detail,a,c,Math.max(bottom,f*level),low,fascia,village?.55:.22);
                if(village&&f>0&&f*level>=bottom){
                  const p=(t,y,off)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
                  detail.quad(p(start,f*level+.08,.05),p(end,f*level+.08,.05),p(end,f*level+.08,.55),p(start,f*level+.08,.55),'#c5cdbd');
                  detail.quad(p(start,f*level,.05),p(start,top,.05),p(start,top,.55),p(start,f*level,.55),'#b7c0b5');
                }
                for(const t of [start,end])wallPanel(detail,a,c,low,top,'#c5cebf',.1,t-.025/len,t+.025/len);
                if(village&&(bay+f)%4===1)wallPanel(detail,a,c,low,top,'#cfad3d',.12,start,Math.min(end,start+.75/len));
              }
            }
          }
        }
      }
      addCollider({points:part.points,holes:part.holes,bottom,top:height,base});
    }
  }

  function olderResidence(b,profile,brick,glass,detail,roofs){
    const shalom=profile.facade==='shalom',floors=shalom?3:2,level=b.height/floors;
    const ordered=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    polygon(roofs,b.points,b.height,'#737d71',b.holes);
    for(const ring of [ordered,...b.holes.map(h=>polygonArea(h)>0?[...h].reverse():h)])for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.3)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
      wallPanel(brick,a,c,0,b.height,profile.color);
      wallPanel(detail,a,c,b.height-.35,b.height+.1,'#655f4f',.45);
      if(!shalom)wallPanel(detail,a,c,level+.3,b.height-.6,'#c6cbbb',.035,.14,.86);
      const bays=Math.max(1,Math.round(len/(shalom?3.5:3.1)));
      for(let f=0;f<floors;f++)for(let bay=0;bay<bays;bay++){
        const mid=(bay+.5)/bays,half=(shalom?.55:1.05)/len;
        const low=f*level+(shalom?.25:f?2.05:.55),top=Math.min((f+1)*level-.6,low+(shalom?2.8:1.35));
        wallPanel(glass,a,c,low,top,profile.glass,.075,mid-half,mid+half);
        for(const t of [mid-half,mid+half])wallPanel(detail,a,c,low-.04,top+.04,'#444f45',.1,t-.035/len,t+.035/len);
        if(shalom&&f>0&&len>6){
          const left=mid-.82/len,right=mid+.82/len,y=f*level+.12,depth=1.05;
          detail.quad(p(left,y,.03),p(right,y,.03),p(right,y,depth),p(left,y,depth),'#9c9d89');
          wallPanel(detail,a,c,y-.16,y,'#b2ad94',depth,left,right);
          wallPanel(detail,a,c,y+1.08,y+1.14,'#615742',depth,left,right);
          for(let d=-.8;d<=.8;d+=.15)wallPanel(detail,a,c,y,y+1.12,'#675c47',depth,mid+(d-.015)/len,mid+(d+.015)/len);
          for(const t of [left,right]){
            for(let d=0;d<=depth;d+=.15){const q=p(t,y+.56,d);detail.box(q[0],q[1],q[2],.025,1.12,.025,'#675c47');}
            const q=p(t,y+1.11,depth/2);detail.box(q[0],q[1],q[2],depth,.045,.04,'#615742',Math.atan2(-nz,nx));
          }
        }
      }
    }
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
    if(!shalom)internationalCourtyard(b);
  }

  function internationalCourtyard(b){
    const f=orientedFrame(b.holes[0]),base=terrainHeight(f.x,f.z),stone=new Batch(),wood=new Batch(),plants=new Batch(),water=new Batch();
    for(const batch of [stone,wood,plants,water])batch.base=base;
    // Pond and pergola positions are photograph-led estimates inside the mapped
    // courtyard opening. No survey of the individual garden features is claimed.
    const pond=roundedFrameRectangle(f,3.8,10,.75,1.5,0),ring=polygonArea(pond)<0?[...pond].reverse():pond;
    polygon(water,pond,.12,'#3b6460');
    for(let i=0;i<ring.length;i++)wallPanel(stone,ring[i],ring[(i+1)%ring.length],-.1,.3,'#778b72',.12);
    addCollider({points:pond,top:.5,base});
    const beamAngle=Math.atan2(-f.v.z,f.v.x),crossAngle=Math.atan2(-f.u.z,f.u.x);
    for(const u of [-f.width/2+1,f.width/2-1])for(const v of [-f.length/2+1,f.length/2-1]){
      const p=framePoint(f,u,v);wood.box(p.x,1.5,p.z,.16,3,.16,'#5d6450');addCollider({x:p.x,z:p.z,radius:.13,top:3,base});
    }
    for(let v=-f.length/2+1;v<f.length/2;v+=2.7){const p=framePoint(f,0,v);wood.box(p.x,3,p.z,f.width-2,.14,.13,'#59634e',crossAngle);}
    for(const u of [-f.width/2+1,f.width/2-1]){const p=framePoint(f,u,0);wood.box(p.x,2.97,p.z,f.length-2,.18,.16,'#59634e',beamAngle);}
    for(const v of [-f.length/2+3,f.length/2-3]){
      const p=framePoint(f,-2.6,v);wood.box(p.x,.8,p.z,2,.12,1.25,'#867353',beamAngle);
      for(const u of [-3.05,-2.15])for(const dv of [-.7,.7]){const q=framePoint(f,u,v+dv);wood.box(q.x,.37,q.z,.09,.74,.09,'#64664f');}
      for(const u of [-3.5,-1.7]){
        const q=framePoint(f,u,v);wood.box(q.x,.46,q.z,2,.1,.32,'#867353',beamAngle);
        for(const dv of [-.7,.7]){const leg=framePoint(f,u,v+dv);wood.box(leg.x,.2,leg.z,.08,.4,.08,'#64664f');}
      }
      addCollider({x:p.x,z:p.z,radius:1.05,top:.9,base});
    }
    for(let v=-f.length/2+2;v<f.length/2-1;v+=1.05)for(const u of [-f.width/2+.6,-f.width/2+1.3,f.width/2-.6,f.width/2-1.3]){
      const p=framePoint(f,u,v);
      for(let leaf=0;leaf<12;leaf++){
        const a=leaf/12*TAU,dx=Math.cos(a),dz=Math.sin(a),h=1.1+(leaf%3)*.25,shade=leaf%2?'#466936':'#658543';
        const left=[p.x+dx*.4-dz*.14,h*.8,p.z+dz*.4+dx*.14],right=[p.x+dx*.4+dz*.14,h*.8,p.z+dz*.4-dx*.14];
        plants.quad([p.x-dz*.025,.05,p.z+dx*.025],left,right,[p.x+dz*.025,.05,p.z-dx*.025],shade);
        plants.triangle(left,[p.x+dx*.95,h*.65,p.z+dz*.95],right,shade);
      }
    }
    for(const u of [-f.width/2+1,f.width/2-1])for(const v of [-6,0,6]){
      const p=framePoint(f,u,v),height=3.5+(v+6)/30;
      for(let i=0;i<8;i++){
        const a=i/8*TAU,c=(i+1)/8*TAU;
        wood.quad([p.x+Math.cos(a)*.085,0,p.z+Math.sin(a)*.085],[p.x+Math.cos(a)*.065,height,p.z+Math.sin(a)*.065],[p.x+Math.cos(c)*.065,height,p.z+Math.sin(c)*.065],[p.x+Math.cos(c)*.085,0,p.z+Math.sin(c)*.085],'#89916b');
      }
      for(let leaf=0;leaf<10;leaf++){
        const a=leaf/10*TAU+v*.2,dx=Math.cos(a),dz=Math.sin(a),px=-dz,pz=dx;
        for(let i=0;i<12;i++){
          const t=i/12,q={x:p.x+dx*1.9*t,z:p.z+dz*1.9*t},y=height+.55*Math.sin(t*Math.PI)-.8*t*t,w=.5*(1-t)+.08;
          for(const side of [-1,1])plants.triangle([q.x-dx*.025,y,q.z-dz*.025],[q.x+dx*.025,y,q.z+dz*.025],[q.x+px*w*side+dx*.1,y-.15,q.z+pz*w*side+dz*.1],leaf%2?'#688846':'#8aa357');
        }
      }
      addCollider({x:p.x,z:p.z,radius:.11,top:height,base});
    }
    world.add(stone.mesh(style('#ffffff',{vertexColors:true})),wood.mesh(style('#ffffff',{vertexColors:true})),plants.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),water.mesh(style('#ffffff',{vertexColors:true,roughness:.13,metalness:.35})));
  }

  function heritageBuilding(b,type,masonry,brick,glass,detail,roofs){
    const g=heritageGeometry(b,type),f=g.frame,white=type==='whitehouse',theatre=type==='figtree';
    const body=white?g.body:b.points,ordered=polygonArea(body)<0?[...body].reverse():body,wallTop=white?6.4:8.8;
    for(let i=0;i<ordered.length;i++){
      const a=ordered[i],c=ordered[(i+1)%ordered.length],len=distance2(a,c);if(len<.2)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
      if(theatre){
        const count=Math.ceil(len/.18);
        for(let j=0;j<count;j++){
          const t=j/count,u=(j+1)/count,q=v=>({x:a.x+(c.x-a.x)*v,z:a.z+(c.z-a.z)*v});
          masonry.quad(p(t,0),p(t,g.roofHeight(q(t))-.06),p(u,g.roofHeight(q(u))-.06),p(u,0),j%2?'#8d9792':'#9ca6a0');
          wallPanel(detail,a,c,.12,Math.min(g.roofHeight(q(t)),g.roofHeight(q(u)))-.08,'#6d7e78',.035,t,t+.018/len);
        }
        continue;
      }
      wallPanel(masonry,a,c,0,wallTop,white?'#d5d0bf':'#c5c6b9');
      if(!white){
        const count=Math.ceil(len/.4);
        for(let j=0;j<count;j++){
          const t=j/count,u=(j+1)/count,q=v=>({x:a.x+(c.x-a.x)*v,z:a.z+(c.z-a.z)*v});
          masonry.quad(p(t,wallTop),p(t,g.roofHeight(q(t))),p(u,g.roofHeight(q(u))),p(u,wallTop),'#c5c6b9');
        }
      }
      if(white){for(let y=.3;y<wallTop;y+=.18)wallPanel(detail,a,c,y,y+.012,'#9fa590',.025);}
      else{
        wallPanel(brick,a,c,0,1.15,'#735b4c',.035);
        wallPanel(detail,a,c,2.85,3.04,'#d9dacb',.14);wallPanel(detail,a,c,5.85,6.02,'#d9dacb',.14);
      }
      const floors=white?2:3,storey=white?3.15:2.9,bays=Math.max(1,Math.round(len/(white?2.8:2.5)));
      for(let floor=0;floor<floors;floor++)for(let bay=0;bay<bays;bay++){
        const mid=(bay+.5)/bays,half=(white?.47:floor===2?.36:.5)/len;
        const low=(white?.25:.1)+floor*storey+.45,top=low+(white?2.2:floor===2?1.25:2.1);
        const shutter=!white&&floor===1;
        wallPanel(shutter?masonry:glass,a,c,low,top,shutter?'#acb3a2':'#48605a',.06,mid-half,mid+half);
        for(const t of [mid-half,mid,mid+half])wallPanel(detail,a,c,low-.04,top+.04,white?'#e0e1ce':'#747f74',.1,t-.035/len,t+.035/len);
        for(const y of [low-.06,top])wallPanel(detail,a,c,y,y+.07,'#dddcc8',.12,mid-half-.04/len,mid+half+.04/len);
        if(!shutter)wallPanel(detail,a,c,(low+top)/2,(low+top)/2+.04,'#b8c3af',.105,mid-half,mid+half);
      }
    }
    shapedRoof(roofs,b.points,g.roofHeight,theatre?'#929e96':white?'#d4d9ce':'#9fa99f');
    if(theatre){
      const mainU=(-f.width/2+f.width*.18)/2,angle=Math.atan2(-f.u.z,f.u.x),centre=framePoint(f,mainU,f.length/2+.85);
      detail.box(centre.x,1.35,centre.z,4.2,2.7,1.7,'#a2aca3',angle);
      polygon(roofs,frameRectangle(f,4.45,1.95,mainU,f.length/2+.85),2.78,'#9ca79b');
      const front=(batch,u0,u1,v,y0,y1,color)=>{
        const a=framePoint(f,u1,v),c=framePoint(f,u0,v);wallPanel(batch,a,c,y0,y1,color);
      };
      front(glass,mainU-1.65,mainU+1.65,f.length/2+1.711,.75,2.3,'#6b8274');
      for(let u=mainU-1.65;u<mainU+1.7;u+=.825)front(detail,u-.03,u+.03,f.length/2+1.73,.7,2.35,'#d3cfb3');
      for(const y of [.7,1.72,2.3])front(detail,mainU-1.7,mainU+1.7,f.length/2+1.73,y,y+.055,'#d3cfb3');
      const door=f.width*.18+1.35;
      front(glass,door-.7,door+.7,f.length/2+.07,.05,2.4,'#445e54');
      for(const u of [door-.78,door+.72])front(detail,u,u+.07,f.length/2+.1,0,2.5,'#cbb778');
      addCollider({points:frameRectangle(f,4.2,1.7,mainU,f.length/2+.85),top:2.8,base:b.base});
      addCollider({points:b.points,top:b.height,base:b.base});
    }else if(white)whiteHouseVerandah(b,g,masonry,detail,roofs);
    else addCollider({points:b.points,top:b.height,base:b.base});
  }

  function whiteHouseVerandah(b,g,concrete,detail,roofs){
    const {body}=g,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points,s=whiteHouseStair(b),upper=3.35;
    polygon(detail,b.points,.25,'#b9bca6',[body]);polygon(detail,b.points,upper,'#b4b7a1',[body]);
    groundPatches.push({points:b.points,heightAt:()=>b.base+.25});
    addCollider({points:body,top:6.4,base:b.base});
    addCollider({points:b.points,holes:[body],bottom:upper-.16,top:upper,stepHeight:.27,base:b.base});
    addCollider({points:b.points,bottom:6.5,top:b.height,base:b.base});
    const ceiling=new Batch();ceiling.base=b.base;polygon(ceiling,b.points,6.5,'#c8d0be');
    world.add(ceiling.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),dx=(c.x-a.x)/len,dz=(c.z-a.z)/len;
      const p=(d,y)=>[a.x+dx*d,y,a.z+dz*d],bays=Math.max(1,Math.round(len/2.7));
      wallPanel(detail,a,c,upper-.18,upper+.02,'#d0d4bd',.035);wallPanel(detail,a,c,6.37,6.65,'#dce0cc',.08);
      for(let j=0;j<bays;j++){
        const d=j*len/bays,u=(j+1)*len/bays,post=p(d,3.3);detail.box(post[0],3.3,post[2],.12,6.5,.12,'#e0e2cf');
        addCollider({x:post[0],z:post[2],radius:.075,top:6.6,base:b.base});
        const landing=i===s.index&&Math.abs((d+u)/2-(s.length-.7))<1.4;
        if(!landing){
          batchBeam(detail,p(d,upper+1.05),p(u,upper+1.05),.045,'#dbe0c9');
          batchBeam(detail,p(d+.08,upper+.18),p(u-.08,upper+1.01),.032,'#dbe0c9');
          batchBeam(detail,p(d+.08,upper+1.01),p(u-.08,upper+.18),.032,'#dbe0c9');
          const nx=dz*.045,nz=-dx*.045,start=p(d,0),end=p(u,0);
          addCollider({points:[{x:start[0]+nx,z:start[2]+nz},{x:end[0]+nx,z:end[2]+nz},{x:end[0]-nx,z:end[2]-nz},{x:start[0]-nx,z:start[2]-nz}],bottom:upper+.02,top:upper+1.1,base:b.base});
        }
        for(const direction of [-1,1]){
          const arc=[p(d,6.25),p(d+direction*.24,6.24),p(d+direction*.32,6.0),p(d+direction*.17,5.85)];
          for(let k=0;k<arc.length-1;k++)batchBeam(detail,arc[k],arc[k+1],.034,'#dde1cb');
        }
      }
    }
    // The photo shows an exterior stair. Its position, treads and landing are
    // reconstructed; the upper deck is a real physical surface in this model.
    stairSegments.push({a:s.a,b:s.b,width:s.width,count:s.count,h0:b.base+s.low,h1:b.base+s.high});
    const dx=s.b.x-s.a.x,dz=s.b.z-s.a.z,len=Math.hypot(dx,dz),nx=-dz/len,nz=dx/len;
    const p=(t,side,y)=>[s.a.x+dx*t+nx*s.width/2*side,y,s.a.z+dz*t+nz*s.width/2*side];
    for(let i=0;i<s.count;i++){
      const t=i/s.count,u=(i+1)/s.count,y=s.low+(s.high-s.low)*i/s.count;
      detail.quad(p(t,1,y),p(u,1,y),p(u,-1,y),p(t,-1,y),'#c8ceba');
      detail.quad(p(t,1,y-(s.high-s.low)/s.count),p(t,1,y),p(t,-1,y),p(t,-1,y-(s.high-s.low)/s.count),'#b3bea8');
    }
    for(const side of [-1,1]){
      batchBeam(detail,p(0,side,s.low+1.05),p(1,side,s.high+1.05),.04,'#e0e2ca');
      for(let i=0;i<=s.count;i+=2){const t=i/s.count,y=s.low+(s.high-s.low)*t;batchBeam(detail,p(t,side,y),p(t,side,y+1.05),.027,'#e0e2ca');}
    }
    const start={x:s.b.x+s.direction.x*s.landingOffset,z:s.b.z+s.direction.z*s.landingOffset};
    const landing=[start,{x:start.x+s.direction.x*1.1,z:start.z+s.direction.z*1.1},
      {x:start.x+s.direction.x*1.1-s.nx*1.4,z:start.z+s.direction.z*1.1-s.nz*1.4},{x:start.x-s.nx*1.4,z:start.z-s.nz*1.4}];
    polygon(detail,landing,upper,'#bfc6b0');addCollider({points:landing,bottom:upper-.16,top:upper,stepHeight:.27,base:b.base});
    const peak=g.frame;detail.box(peak.x,9.4,peak.z,.12,.4,.12,'#e0e2ce');
  }

  function goldsteinCourtyard(b){
    const g=goldsteinCourtGeometry(b),f=g.frame,stone=new Batch(),metal=new Batch(),soil=new Batch(),lights=new Batch();for(const q of [stone,metal,soil,lights])q.base=0;
    const ringOf=points=>polygonArea(points)>0?points:[...points].reverse(),at=(p,y)=>[p.x,y,p.z];
    for(const patch of GOLDSTEIN_PAVING){
      shapedRoof(stone,patch.points,p=>g.floorAt(p)+.005,'#b8b6a3',patch.holes);groundPatches.push({...patch,heightAt:(x,z)=>g.floorAt({x,z})+.01});
      const ring=ringOf(patch.points);for(let i=0;i<ring.length;i++){const a=ring[i],c=ring[(i+1)%ring.length];stone.quad(at(a,terrainHeight(a.x,a.z)-.03),at(a,g.floorAt(a)),at(c,g.floorAt(c)),at(c,terrainHeight(c.x,c.z)-.03),'#a2a794');}
    }
    shapedRoof(stone,g.entry.apron.points,p=>g.entry.apron.heightAt(p)+.005,'#b7b7a4');groundPatches.push({points:g.entry.apron.points,heightAt:(x,z)=>g.entry.apron.heightAt({x,z})+.01});
    for(const step of g.entry.steps){polygon(stone,step.points,step.rl,'#b8b9a8');const ring=ringOf(step.points);for(let i=0;i<ring.length;i++)wallPanel(stone,ring[i],ring[(i+1)%ring.length],g.entry.low-.06,step.rl,'#9ca48f');groundPatches.push({points:step.points,heightAt:()=>step.rl+.01});addCollider({points:step.points,base:0,top:step.rl,stepHeight:.22});}
    // Flat dark water and coping around the photo-led rectangle. The source
    // sculpture point remains fixed; the surrounding dimensions are estimated.
    polygon(stone,g.pool.outer,g.pool.copingRL,'#929d8d',[g.pool.points]);groundPatches.push({points:g.pool.outer,holes:[g.pool.points],heightAt:()=>g.pool.copingRL+.01});
    for(const ring of [ringOf(g.pool.outer),[...ringOf(g.pool.points)].reverse()])for(let i=0;i<ring.length;i++)wallPanel(stone,ring[i],ring[(i+1)%ring.length],g.pool.waterRL-.25,g.pool.copingRL,'#6b7a70');
    addCollider({points:g.pool.outer,base:0,top:g.pool.copingRL,stepHeight:.01});
    const pedestalBase=frameRectangle(f,5.72,1.5,g.local(GOLDSTEIN_ART_POINT).u,g.local(GOLDSTEIN_ART_POINT).v);
    for(const [points,top,color]of [[pedestalBase,g.floor+.09,'#606c65'],[g.plinth.points,g.plinth.top,'#a0a28e']]){polygon(stone,points,top,color);const ring=ringOf(points);for(let i=0;i<ring.length;i++)wallPanel(stone,ring[i],ring[(i+1)%ring.length],g.plinth.bottom,top,color);}
    const sculpture=new THREE.Mesh(goldsteinSculptureGeometry(),style('#ffffff',{vertexColors:true,metalness:.45,roughness:.77}));sculpture.position.set(GOLDSTEIN_ART_POINT.x,g.plinth.top,GOLDSTEIN_ART_POINT.z);sculpture.rotation.y=-Math.atan2(f.u.z,f.u.x);sculpture.castShadow=sculpture.receiveShadow=true;world.add(sculpture);
    const water=new Reflector(new THREE.PlaneGeometry(g.pool.width,g.pool.depth),{clipBias:.003,textureWidth:512,textureHeight:512,multisample:0,color:0x6e7976});
    water.position.set(g.pool.x,g.pool.waterRL,g.pool.z);water.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3(f.u.x,0,f.u.z),new THREE.Vector3(-f.v.x,0,-f.v.z),UP));
    const renderReflection=water.onBeforeRender;water.onBeforeRender=function(...args){if(args[2]!==camera||Math.hypot(camera.position.x-g.pool.x,camera.position.z-g.pool.z)>65)return;renderReflection.apply(this,args);};
    campusPlanarReflections.push(water);world.add(water);
    for(const bench of g.benches){const h=g.floorAt(bench);stone.box(bench.x,h+.225,bench.z,bench.width,.45,bench.depth,'#b8bdab',-Math.atan2(f.u.z,f.u.x));stone.box(bench.x,h+.459,bench.z,bench.width,.018,bench.depth,'#a7ae9c',-Math.atan2(f.u.z,f.u.x));addCollider({points:bench.points,base:0,top:h+.46,stepHeight:.06});}
    const s=g.stair,dx=s.c.x-s.a.x,dz=s.c.z-s.a.z,len2=dx*dx+dz*dz,topAt=p=>s.h0+(s.h1-s.h0)*clamp(((p.x-s.a.x)*dx+(p.z-s.a.z)*dz)/len2,0,1)+.84;
    for(const part of GOLDSTEIN_STAIR_CHEEKS){shapedRoof(metal,part.points,p=>topAt(p)+.035,'#5c6d67',part.holes);for(const ring of [ringOf(part.points),...part.holes.map(h=>[...ringOf(h)].reverse())])for(let i=0;i<ring.length;i++){const a=ring[i],c=ring[(i+1)%ring.length];stone.quad(at(a,terrainHeight(a.x,a.z)-.1),at(a,topAt(a)),at(c,topAt(c)),at(c,terrainHeight(c.x,c.z)-.1),'#c1c5b2');}addCollider({...part,base:0,top:Math.max(...part.points.map(topAt))+.035});}
    for(const p of g.bollards){const h=g.floorAt(p),post=new THREE.Mesh(new THREE.CylinderGeometry(p.radius,p.radius,p.height,12),style('#8b9c91'));post.position.set(p.x,h+p.height/2,p.z);post.castShadow=true;world.add(post);metal.box(p.x,h+p.height+.025,p.z,.26,.05,.26,'#354b47');lights.box(p.x,h+p.height-.12,p.z,.205,.19,.205,'#dbdfc1');addCollider({x:p.x,z:p.z,radius:p.radius,base:0,top:h+p.height});}
    for(const edge of [[g.pool.outer[0],g.pool.outer[1]],[g.pool.outer[1],g.pool.outer[2]],[g.pool.outer[3],g.pool.outer[0]]])batchBeam(lights,at(edge[0],g.floor+.015),at(edge[1],g.floor+.015),.025,'#cbd3b2');
    const tree=g.tree,base=g.floor-.035;polygon(soil,tree.pit,base,'#ab9f7f');groundPatches.push({points:tree.pit,heightAt:()=>base});addCollider({x:tree.x,z:tree.z,radius:tree.radius,base:0,top:base+tree.height});
    const branch=(a,c,r0,r1)=>{const d=new THREE.Vector3(c[0]-a[0],c[1]-a[1],c[2]-a[2]),mesh=new THREE.Mesh(new THREE.CylinderGeometry(r1,r0,d.length(),9),style('#a5aa90',{map:surfaceTexture('bark')}));mesh.position.set((a[0]+c[0])/2,(a[1]+c[1])/2,(a[2]+c[2])/2);mesh.quaternion.setFromUnitVectors(UP,d.normalize());mesh.castShadow=mesh.receiveShadow=true;world.add(mesh);};
    const fork=[tree.x+f.u.x*.8,base+3.4,tree.z+f.u.z*.8];branch([tree.x,base,tree.z],fork,.38,.26);const crowns=[];
    for(let j=0;j<6;j++){const a=j*TAU/6,reach=3+j%3,tip=[fork[0]+f.u.x*3.5+Math.cos(a)*reach,base+8.2+j%3, fork[2]+f.u.z*3.5+Math.sin(a)*reach],mid=[(fork[0]+tip[0])/2,base+5+j%2,(fork[2]+tip[2])/2];branch(fork,mid,.23,.11);branch(mid,tip,.11,.035);crowns.push(tip);}
    const leaves=new THREE.InstancedMesh(new THREE.PlaneGeometry(1.25,1.25),style('#a1ad7d',{map:foliageTexture(),alphaTest:.42,side:THREE.DoubleSide}),420),dummy=new THREE.Object3D(),random=rng(6501);
    for(let i=0;i<420;i++){const c=crowns[i%6],a=random()*TAU,r=Math.sqrt(random())*2.5;dummy.position.set(c[0]+Math.cos(a)*r,c[1]+(random()-.5)*2.8,c[2]+Math.sin(a)*r);dummy.rotation.set(random()*Math.PI,random()*TAU,random()*Math.PI);const size=.85+random()*.6;dummy.scale.set(size,size,size);dummy.updateMatrix();leaves.setMatrixAt(i,dummy.matrix);leaves.setColorAt(i,new THREE.Color(['#71854c','#8e9d65','#5f7944'][i%3]));}leaves.castShadow=leaves.receiveShadow=true;world.add(leaves);
    world.add(stone.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.3,roughness:.6})),soil.mesh(style('#ffffff',{vertexColors:true})),lights.mesh(style('#ffffff',{vertexColors:true,emissive:'#c3c9a1',emissiveIntensity:.12})));
  }

  function goldsteinHall(b,concrete,brick,glass,detail,roofs){
    const {frame:f,split}=goldsteinGeometry(b),axis={...f,v:f.u};
    for(const [points,high] of [[clipFrameStrip(b.points,axis,-f.width,split),true],[clipFrameStrip(b.points,axis,split,f.width),false]]){
      const ring=polygonArea(points)<0?[...points].reverse():points;
      const roofAt=p=>(high?12:7.5)-((p.x-f.x)*f.v.x+(p.z-f.z)*f.v.z+f.length/2)*.045;
      shapedRoof(roofs,points,roofAt,'#b6bfb2');
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.2)continue;
        const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,north=nx*(-f.v.x)+nz*(-f.v.z)>.8,top=Math.min(roofAt(a),roofAt(c));
        wallPanel(north?concrete:brick,a,c,0,top,north?'#adb5a4':'#776a54');
        if(north){
          wallPanel(glass,a,c,.2,2.85,'#3f5c54',.08,.01,.99);
          wallPanel(glass,a,c,3.65,top-1.55,'#4c655a',.08,.01,.99);
          wallPanel(detail,a,c,3.05,3.65,'#c7cdbb',.65);
          wallPanel(concrete,a,c,top-.75,top+.1,'#c9cfbd',.95);
          for(let d=.2;d<len;d+=1.1)wallPanel(detail,a,c,.15,top-1.4,'#7b6548',.14,d/len,Math.min(1,(d+.09)/len));
          for(let d=0;d<=len;d+=len/3){const x=a.x+(c.x-a.x)*d/len+nx*.45,z=a.z+(c.z-a.z)*d/len+nz*.45;detail.box(x,top/2,z,.55,top,.6,'#c4cbbb');}
          for(const y of [4.95,6.65,8.35])if(y<top-1.4)wallPanel(detail,a,c,y,y+.1,'#7a6244',.17);
        }else{
          wallPanel(detail,a,c,top-.35,top+.08,'#bdc6b4',.18);
          const bays=Math.max(1,Math.round(len/5));
          for(let j=0;j<bays;j++)wallPanel(glass,a,c,3.8,Math.min(6.1,top-1),'#405b51',.06,(j+.3)/bays,(j+.7)/bays);
        }
      }
      addCollider({points,top:high?12:7.5,base:b.base});
    }
  }

  function facadeLabel(b,a,c,title,code,width,y,color='#252c29'){
    const len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
    const texture=canvasTexture(1536,320,(ctx,w,h)=>{
      ctx.clearRect(0,0,w,h);ctx.fillStyle=color;ctx.textBaseline='middle';
      ctx.font='600 65px sans-serif';ctx.fillText(code,30,65);
      ctx.font='600 155px sans-serif';ctx.fillText(title,30,210,w-60);
    });
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(width,width*320/1536),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}));
    sign.position.set((a.x+c.x)/2+nx*.16,b.base+y,(a.z+c.z)/2+nz*.16);sign.rotation.y=Math.atan2(nx,nz);world.add(sign);
  }

  function scienceTheatre(b,aggregate,glass,detail,roofs){
    const g=scienceTheatreGeometry(b),f=g.frame,canopy=g.canopy,structure=scienceTheatreCanopy(g),angle=Math.atan2(-f.u.z,f.u.x);
    const entranceGlass=new Batch();entranceGlass.base=b.base;
    for(const face of scienceTheatreFacades(b)){
      const p=(t,y,offset=0)=>{const q=face.point(t,y,offset);return [q.x,q.y,q.z];},panel=(batch,l,r,lo,hi,color,offset=0)=>batch.quad(p(l,lo,offset),p(l,hi,offset),p(r,hi,offset),p(r,lo,offset),color);
      for(const cell of face.masonry){
        const {left:l,right:r,bottom:lo,topLeft:tl,topRight:tr}=cell;
        aggregate.quad(p(l,lo),p(l,tl),p(r,tr),p(r,lo),'#c0bcb7',[[l*face.length/2,lo/2],[l*face.length/2,tl/2],[r*face.length/2,tr/2],[r*face.length/2,lo/2]]);
        for(let t=Math.ceil(l*face.length/1.7)*1.7/face.length;t<r;t+=1.7/face.length){const high=Math.min(tl,tr);if(t>l+.0001)panel(detail,t,t+.014/face.length,lo,high,'#92948c',.022);}
        for(let y=Math.ceil(Math.max(0,lo)/1.7)*1.7;y<Math.min(tl,tr)-.01;y+=1.7)if(y>lo+.01)panel(detail,l,r,y,y+.014,'#96988f',.022);
      }
      detail.quad(p(0,face.roof(0)-.16,.06),p(0,face.roof(0),.06),p(1,face.roof(1),.06),p(1,face.roof(1)-.16,.06),'#8d9690');
      for(const h of face.holes){
        const fw=.07/face.length,depth=-h.recess,span=h.right-h.left;
        panel(entranceGlass,h.left,h.right,h.bottom,h.top,'#788b86',depth);
        // Solid returns surround the genuinely recessed pane.
        for(const t of [h.left,h.right])aggregate.quad(p(t,h.bottom,.025),p(t,h.top,.025),p(t,h.top,depth),p(t,h.bottom,depth),'#b1b5ac');
        for(const y of [h.bottom,h.top])aggregate.quad(p(h.left,y,.025),p(h.right,y,.025),p(h.right,y,depth),p(h.left,y,depth),'#c8cac1');
        panel(detail,h.left,h.right,h.bottom,h.bottom+.065,'#dbe0d8',-.07);panel(detail,h.left,h.right,h.top-.065,h.top,'#dbe0d8',-.07);
        for(const t of [h.left,h.right-fw])panel(detail,t,t+fw,h.bottom,h.top,'#d8ded6',-.065);
        const bays=h.id==='east-glazed-foyer'?8:Math.max(2,Math.round(span*face.length/1.65));
        for(let j=1;j<bays;j++){
          const t=h.left+span*j/bays,width=h.id==='east-glazed-foyer'?.23:.075;
          panel(detail,t-width/face.length/2,t+width/face.length/2,h.bottom,h.top,'#d7ded5',-.05);
        }
        const horizontals=h.id==='east-glazed-foyer'?[1.25,2.7,3.25,5,6.2]:h.id==='south-gallery'?[5.8]:h.id==='south-doors'?[2.45]:[];
        for(const y of horizontals)panel(detail,h.left,h.right,y,y+(y===3.25?.18:.065),'#d8ded5',-.045);
        if(h.id==='east-glazed-foyer')for(let j=0;j<bays;j++){
          const t=h.left+span*(j+.5)/bays;panel(detail,t-.035/face.length,t+.035/face.length,h.bottom,h.top,'#d7ded5',-.06);
        }
        if(/doors|foyer/.test(h.id)){
          const centre=(h.left+h.right)/2,half=.92/face.length;
          for(const t of [centre-half,centre,centre+half])panel(detail,t-fw/2,t+fw/2,h.bottom,2.45,'#e0e3db',-.025);
          panel(detail,centre-half,centre+half,2.4,2.49,'#e0e3db',-.02);
          for(const t of [centre-.11/face.length,centre+.11/face.length]){const a=face.point(t,.95,.01),c=face.point(t,1.42,.01);batchBeam(detail,[a.x,a.y,a.z],[c.x,c.y,c.z],.023,'#a9b4aa');}
        }
      }
      // The west auditorium retains a narrow clerestory, distinct from the
      // full-height eastern foyer. Other service faces remain approximate.
      if(face.mode==='west'&&face.length>5)glass.quad(p(.03,face.roof(.03)-.95,.04),p(.03,face.roof(.03)-.25,.04),p(.97,face.roof(.97)-.25,.04),p(.97,face.roof(.97)-.95,.04),'#516966');
    }
    shapedRoof(roofs,b.points,g.roofHeight,'#8e9890');
    for(const v of structure.rows){const q=framePoint(f,0,v);detail.box(q.x,canopy.height,q.z,canopy.width,.25,.3,'#929b8f',angle);}
    for(const post of structure.posts){
      const q=framePoint(f,post.u,post.v),low=Math.min(0,terrainHeight(q.x,q.z)-b.base),height=post.top-low;
      detail.box(q.x,low+height/2,q.z,.3,height,.3,'#a7afa1',angle);
      for(const side of [-1,1]){const end=framePoint(f,post.u+side*1.05,post.v);batchBeam(detail,[q.x,canopy.height-.38,q.z],[end.x,canopy.height+.12,end.z],.075,'#8b958a');}
      addCollider({x:q.x,z:q.z,radius:.21,bottom:low,top:post.top,base:b.base});
    }
    for(const u of structure.slats){const a=framePoint(f,u,f.length/2+.15),c=framePoint(f,u,canopy.front+.3);batchBeam(detail,[a.x,canopy.height+.12,a.z],[c.x,canopy.height+.12,c.z],.065,'#aab2a4');}
    const skin=entranceGlass.mesh(style('#ffffff',{vertexColors:true,roughness:.07,metalness:.72,envMapIntensity:1.1}));world.add(skin);
    medicalReflection(skin,framePoint(f,f.width/2+1.5,f.length/2+1.5),b.base+4.6);
    // A bounded fitted connection reconciles the coarse DEM with a level door
    // sill. Fine paving levels are reconstructed, not surveyed access grades.
    for(const triangle of g.pavingMesh.triangles)aggregate.triangle(...triangle.map(i=>{const p=g.pavingMesh.vertices[i];return [p.x,p.y-b.base,p.z];}),'#b4aaa0');
    groundPatches.push({points:g.paving,priority:true,heightAt:(x,z)=>g.pavingHeight({x,z})});
    addCollider({points:b.points,bottom:buildingBase(b.points)-b.base,top:b.height,base:b.base});
  }

  function daltonCommons(b){
    const g=DALTON_COMMONS,f=DALTON_FRAME,room=new Batch(),wood=new Batch(),metal=new Batch(),angle=Math.atan2(-f.u.z,f.u.x);for(const batch of [room,wood,metal])batch.base=b.base;
    shapedRoof(room,g.points,()=>g.floor-b.base,'#c9c1af');
    const ceiling=new Batch();ceiling.base=b.base;shapedRoof(ceiling,g.points,()=>g.ceiling-b.base,'#e2e1d6');world.add(ceiling.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.9})));
    const backA=daltonPoint(f.width/2,g.v0),backB=daltonPoint(-f.width/2,g.v0);wallPanel(room,backA,backB,g.floor-b.base,g.ceiling-b.base,'#c5bba5');
    wallPanel(wood,backA,backB,g.floor-b.base,g.ceiling-b.base,'#b69b78',.055,0,.56);
    const cabinet=daltonPoint(2.8,g.v0+.3);wood.box(cabinet.x,g.floor-b.base+.56,cabinet.z,5.1,1.12,.5,'#ad9371',angle);
    const display=new THREE.Mesh(new THREE.PlaneGeometry(3.5,1.8),style('#17262a',{roughness:.38,metalness:.08})),screenSite=daltonPoint(2.8,g.v0+.07);display.position.set(screenSite.x,g.floor+2.25,screenSite.z);display.rotation.y=Math.atan2(f.v.x,f.v.z);world.add(display);
    for(const s of DALTON_SCREEN){const q=daltonPoint(s.u,s.v);wood.box(q.x,(s.top+s.bottom)/2-b.base,q.z,s.width,s.top-s.bottom,s.width,'#9f7d50',angle);}
    const tile=canvasTexture(512,512,ctx=>{const random=rng(1958);ctx.fillStyle='#38423d';ctx.fillRect(0,0,512,512);for(let y=0;y<64;y++)for(let x=0;x<64;x++){const c=26+random()*16;ctx.fillStyle=`rgb(${c*.84} ${c} ${c*.98})`;ctx.fillRect(x*8+.45,y*8+.45,7.1,7.1);}});tile.wrapS=tile.wrapT=THREE.RepeatWrapping;tile.repeat.set(1,3);
    const tileMaterial=style('#ffffff',{map:tile,roughness:.5,metalness:.08}),columnGeo=new THREE.CylinderGeometry(.235,.235,g.ceiling-g.floor,16);
    for(const u of [-f.width/2+.75,f.width/2-.75])for(const v of [g.v0+2,g.v0+8.4,g.v0+15.6]){const q=daltonPoint(u,v),mesh=new THREE.Mesh(columnGeo,tileMaterial);mesh.position.set(q.x,(g.ceiling+g.floor)/2,q.z);world.add(mesh);}
    for(const v of g.ductCentres){const q=daltonPoint(g.ductU,v);room.box(q.x,(g.floor+g.ceiling)/2-b.base,q.z,g.ductThickness,g.ceiling-g.floor,5.68,'#56605a',angle);}
    for(const panel of DALTON_PANELS){const texture=daltonMosaicTexture(panel.motif),mesh=new THREE.Mesh(new THREE.PlaneGeometry(panel.width,panel.height),style('#ffffff',{map:texture,roughness:.64,metalness:.025,emissive:'#ffffff',emissiveMap:texture,emissiveIntensity:.14})),q=daltonPoint(panel.u,panel.v);mesh.position.set(q.x,panel.bottom+panel.height/2,q.z);mesh.rotation.y=Math.atan2(panel.side*f.u.x,panel.side*f.u.z);world.add(mesh);}
    const pier=daltonPoint(-2.25,f.length/2-.25);room.box(pier.x,(g.floor+g.ceiling)/2-b.base,pier.z,.78,g.ceiling-g.floor,.8,'#b9b7a8',angle);
    for(const t of DALTON_MEETING_TABLES){const q=daltonPoint(t.u,t.v);room.box(q.x,g.floor-b.base+.75,q.z,t.width,.055,t.length,'#eeeade',angle);for(const u of [-t.width*.35,t.width*.35])for(const v of [-t.length*.35,t.length*.35]){const leg=daltonPoint(t.u+u,t.v+v);metal.box(leg.x,g.floor-b.base+.37,leg.z,.035,.72,.035,'#dce0d4',angle);}
      if(t.length<1)for(const du of [-.62,.62])for(const side of [-1,1]){const u=t.u+du,v=t.v+side*.82,p=daltonPoint(u,v),back=daltonPoint(u,v+side*.21);room.box(p.x,g.floor-b.base+.46,p.z,.43,.055,.43,'#394740',angle);wood.box(back.x,g.floor-b.base+.74,back.z,.43,.46,.045,'#9b8060',angle);for(const su of [-.17,.17])for(const sv of [-.17,.17]){const leg=daltonPoint(u+su,v+sv);metal.box(leg.x,g.floor-b.base+.225,leg.z,.02,.45,.02,'#dce1d7',angle);}}
    }
    const cushion=new THREE.SphereGeometry(1,12,8),chairMaterial=style('#5c7658',{roughness:.91});
    for(const t of DALTON_LOUNGE_CHAIRS){const q=daltonPoint(t.u,t.v),seat=new THREE.Mesh(cushion,chairMaterial),back=new THREE.Mesh(cushion,chairMaterial),rear=daltonPoint(t.u-Math.sin(t.yaw)*.28,t.v-Math.cos(t.yaw)*.28);seat.position.set(q.x,g.floor+.5,q.z);seat.scale.set(.45,.14,.42);seat.rotation.y=angle+t.yaw;back.position.set(rear.x,g.floor+.78,rear.z);back.scale.set(.46,.39,.15);back.rotation.y=angle+t.yaw;world.add(seat,back);metal.box(q.x,g.floor-b.base+.25,q.z,.035,.42,.035,'#a9b4aa');for(let i=0;i<4;i++){const a=i/4*TAU,p=daltonPoint(t.u+Math.cos(a)*.38,t.v+Math.sin(a)*.38);batchBeam(metal,[q.x,g.floor-b.base+.14,q.z],[p.x,g.floor-b.base+.055,p.z],.024,'#aab4ad');}}
    const tableMaterial=style('#a4ae73',{roughness:.8});for(const v of [g.v0+4.7,g.v0+12.8])for(const [du,dv,r] of [[0,0,.48],[.4,.12,.33],[-.25,.31,.32]]){const q=daltonPoint(-4.15+du,v+dv),top=new THREE.Mesh(new THREE.CylinderGeometry(r,r,.055,20),tableMaterial);top.position.set(q.x,g.floor+.49,q.z);world.add(top);const leg=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,.45,12),tableMaterial);leg.position.set(q.x,g.floor+.24,q.z);world.add(leg);}
    for(const v of [g.v0+4.4,g.v0+12.2]){const q=daltonPoint(2.4,v),bar=new THREE.Mesh(new THREE.BoxGeometry(3.1,.025,.08),style('#fff6d4',{emissive:'#ffe7ac',emissiveIntensity:1.2}));bar.position.set(q.x,g.ceiling-.11,q.z);bar.rotation.y=angle;world.add(bar);const light=new THREE.PointLight('#ffedc8',16,9,2);light.position.set(q.x,g.ceiling-.2,q.z);world.add(light);}
    const woodTexture=canvasTexture(256,512,ctx=>{const random=rng(1948);ctx.fillStyle='#b79b76';ctx.fillRect(0,0,256,512);for(let i=0;i<650;i++){const x=random()*256;ctx.strokeStyle=i%2?'#604c3629':'#f3dec72e';ctx.lineWidth=.5+random();ctx.beginPath();ctx.moveTo(x,0);ctx.bezierCurveTo(x+random()*6,170,x-random()*6,340,x,512);ctx.stroke();}});
    world.add(room.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),roughness:.9})),wood.mesh(style('#ffffff',{vertexColors:true,map:woodTexture,roughness:.8})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.55,roughness:.35})));
  }

  function daltonBuilding(b,masonry,aggregate,glass,detail,roofs){
    const {frame:f,classify}=modernFacadeFrame(b),ring=polygonArea(b.points)<0?[...b.points].reverse():b.points,commonGlass=new Batch(),g=DALTON_COMMONS;commonGlass.base=b.base;
    for(let i=0;i<ring.length;i++)for(const span of daltonFacadeSpans(ring[i],ring[(i+1)%ring.length])){
      const a=span.a,c=span.b,e=classify(a,c);if(e.length<.05)continue;const end=Math.abs(e.v)>.9,lower=span.commons?g.ceiling-b.base:3.3;
      wallPanel(end?aggregate:masonry,a,c,lower,b.height,end?'#b6a592':'#d0d4ce');if(!span.commons)wallPanel(masonry,a,c,0,3.3,'#b6b3a2');wallPanel(detail,a,c,b.height-.16,b.height+.04,'#c4c9be',.16);
      if(end){
        const bays=Math.max(2,Math.round(e.length/2.4));for(let j=1;j<bays;j++)wallPanel(detail,a,c,lower,b.height-.2,'#cecab9',.025,j/bays,j/bays+.018/e.length);for(let y=5.6;y<b.height-.5;y+=2.4)if(y>lower)wallPanel(detail,a,c,y,y+.017,'#c8bca8',.03);
      }else{
        const eastern=e.u>.7,band=eastern?[[5.25,7.5],[10.25,12.55]]:[[6.9,7.8],[11.9,12.8]];for(const [lo,hi] of band){wallPanel(glass,a,c,lo,hi,eastern?'#778c8a':'#596c69',.065);wallPanel(detail,a,c,lo-.055,lo,'#9da89e',.12);wallPanel(detail,a,c,hi,hi+.055,'#d8ddd2',.12);}
        for(let d=.2;d<e.length;d+=2.3){wallPanel(detail,a,c,lower+.05,b.height-.1,'#e0e3d9',.13,d/e.length,Math.min(1,(d+.065)/e.length));if(!eastern&&Math.round(d/2.3)%6===2)for(const [lo,hi] of band){wallPanel(detail,a,c,lo+.02,hi-.02,'#485953',.14,d/e.length,Math.min(1,(d+1.1)/e.length));for(let y=lo+.1;y<hi;y+=.13)wallPanel(detail,a,c,y,y+.025,'#a4afa3',.16,d/e.length,Math.min(1,(d+1.1)/e.length));}}
        if(!span.commons){const steps=Math.ceil(e.length/2);for(let j=0;j<steps;j++)wallPanel(glass,a,c,2.2,3,'#4b615b',.06,(j+.08)/steps,(j+.92)/steps);}
      }
      if(span.commons){
        const cuts=[0,1];if(end&&e.v>0){const ua=daltonLocal(a).u,uc=daltonLocal(c).u;for(const u of [-2.64,-1.86]){const t=(u-ua)/(uc-ua);if(t>0&&t<1)cuts.push(t);}}cuts.sort((a,b)=>a-b);
        for(let j=1;j<cuts.length;j++){const lo=cuts[j-1],hi=cuts[j],q={x:a.x+(c.x-a.x)*(lo+hi)/2,z:a.z+(c.z-a.z)*(lo+hi)/2};if(end&&e.v>0&&Math.abs(daltonLocal(q).u+2.25)<.39)continue;wallPanel(commonGlass,a,c,g.floor-b.base+.07,g.ceiling-b.base-.12,'#c6d8d4',.055,lo,hi);}
        for(let d=.02;d<e.length;d+=end?3.2:2.9)wallPanel(detail,a,c,g.floor-b.base,g.ceiling-b.base,'#38453e',.085,d/e.length,Math.min(1,(d+.045)/e.length));wallPanel(detail,a,c,g.floor-b.base,g.floor-b.base+.07,'#535f54',.1);wallPanel(detail,a,c,g.ceiling-b.base-.12,g.ceiling-b.base+.06,'#b7c0b2',.12);
      }else wallPanel(detail,a,c,3.2,3.4,'#d8dccf',.22);
    }
    polygon(roofs,b.points,b.height,'#a0aaa0');daltonCommons(b);
    const glazing=commonGlass.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.2,depthWrite:false,side:THREE.DoubleSide,roughness:.07,metalness:.12,envMapIntensity:.35}));world.add(glazing);medicalReflection(glazing,daltonPoint(0,f.length/2+1.4),g.floor+2.2);
    const frontSign=canvasTexture(1024,256,ctx=>{ctx.clearRect(0,0,1024,256);ctx.fillStyle='#202923';ctx.font='600 48px sans-serif';ctx.fillText('F12',20,65);ctx.font='600 100px sans-serif';ctx.fillText('Dalton Building',20,190,990);}),sign=new THREE.Mesh(new THREE.PlaneGeometry(6.2,1.55),new THREE.MeshBasicMaterial({map:frontSign,transparent:true,depthWrite:false})),site=daltonPoint(1.8,f.length/2+.17);sign.position.set(site.x,b.base+5.8,site.z);sign.rotation.y=Math.atan2(f.v.x,f.v.z);world.add(sign);
    const hedgePoint=framePoint(f,0,f.length/2+2.5),hedgeBase=terrainHeight(hedgePoint.x,hedgePoint.z),angle=Math.atan2(-f.u.z,f.u.x),hedge=new THREE.Mesh(new THREE.BoxGeometry(f.width+1.1,.65,1.05),style('#5d7749',{map:surfaceTexture('grass')}));hedge.position.set(hedgePoint.x,hedgeBase+.475,hedgePoint.z);hedge.rotation.y=angle;hedge.castShadow=true;hedge.receiveShadow=true;world.add(hedge);addCollider({points:frameRectangle(f,f.width+1.1,1.05,0,f.length/2+2.5),bottom:.1,top:.8,base:hedgeBase});
    addCollider({points:b.points,top:b.height,base:b.base});
  }

  function websterEntrance(b,masonry,glass,detail,roofs){
    const E=WEBSTER_ENTRY,stone=new Batch(),portal=new Batch(),silver=new Batch(),angle=Math.atan2(-WEBSTER_FRAME.u.z,WEBSTER_FRAME.u.x),p=(u,v,y)=>{const q=websterPoint(u,v);return [q.x,y-b.base,q.z];};
    stone.base=portal.base=silver.base=b.base;
    for(const part of WEBSTER_FLOORS){
      shapedRoof(stone,part.points,q=>websterSurfaceRL(part,q)-b.base,'#b7aa94',part.holes);
      for(let i=0;i<part.points.length;i++){const a=part.points[i],c=part.points[(i+1)%part.points.length],ya=websterSurfaceRL(part,a)-b.base,yc=websterSurfaceRL(part,c)-b.base,low=Math.min(ya,yc,demHeight(a.x,a.z)-b.base-.1,demHeight(c.x,c.z)-b.base-.1);stone.quad([a.x,low,a.z],[a.x,ya,a.z],[c.x,yc,c.z],[c.x,low,c.z],'#a99b83');}
    }
    for(const island of WEBSTER_ISLANDS){shapedRoof(stone,island.points,()=>island.top-b.base,'#b4a58b');for(let i=0;i<island.points.length;i++){const a=island.points[i],c=island.points[(i+1)%island.points.length],low=Math.min(demHeight(a.x,a.z),demHeight(c.x,c.z))-b.base;stone.quad([a.x,low,a.z],[a.x,island.top-b.base,a.z],[c.x,island.top-b.base,c.z],[c.x,low,c.z],'#9e9078');}addCollider({...island,top:island.top-b.base,base:b.base});}
    for(const part of WEBSTER_RECESS_PARTS)shapedRoof(portal,part.points,()=>E.ceilingRL-b.base,'#9b9e8f',part.holes);
    const beam=websterPoint(-11.48,(E.west+E.east)/2);portal.box(beam.x,E.ceilingRL-b.base+.12,beam.z,1.05,.28,E.east-E.west,'#c4c8b9',angle);
    for(const s of WEBSTER_PIERS){const q=websterPoint(s.u,s.v);portal.box(q.x,(s.bottom+s.top)/2-b.base,q.z,s.depth,s.top-s.bottom,s.width,'#939888',angle);addCollider({points:frameRectangle(WEBSTER_FRAME,s.depth,s.width,s.u,s.v),bottom:s.bottom-b.base,top:s.top-b.base,base:b.base});}
    // Closed inner door and side returns define the exterior portico. The
    // overhead occupied floor remains collidable independently of the ground.
    const a=websterPoint(E.back,E.east),c=websterPoint(E.back,E.west),floor=E.mainRL-b.base;
    wallPanel(portal,a,c,floor,floor+3.2,'#6b6b58');
    wallPanel(glass,a,c,floor+.06,floor+2.65,'#3f5551',.075,.5,.78);
    for(const t of [.5,.64,.78])wallPanel(detail,a,c,floor+.02,floor+2.7,'#b8c3b5',.11,t,t+.055/(E.east-E.west));
    wallPanel(detail,a,c,floor+2.62,floor+2.7,'#c4cdbf',.1,.5,.78);
    for(const v of [E.west,E.east])portal.quad(p(-10.95,v,E.mainRL),p(-10.95,v,E.ceilingRL),p(E.back,v,E.ceilingRL),p(E.back,v,E.mainRL),'#818475');
    // The inset panel is visible in the historical panorama. Its identity and
    // fine artwork are unverified, so only its plain material/recess is fitted.
    portal.quad(p(-10.92,16.2,E.mainRL+.4),p(-10.92,16.2,E.mainRL+2.8),p(-10.92,18.65,E.mainRL+2.8),p(-10.92,18.65,E.mainRL+.4),'#8d7150');
    const rail=(points,height=.93,pickets=false)=>{
      for(let i=1;i<points.length;i++)batchBeam(silver,[points[i-1].x,points[i-1].y+height-b.base,points[i-1].z],[points[i].x,points[i].y+height-b.base,points[i].z],.026,'#aeb9b1');
      for(let i=0;i<points.length;i++){const q=points[i];batchBeam(silver,[q.x,q.y-b.base,q.z],[q.x,q.y+height-b.base,q.z],.022,'#9caaa1');if(i&&pickets){const a=points[i-1],length=Math.hypot(q.x-a.x,q.z-a.z);for(let d=.14;d<length;d+=.14){const t=d/length,x=a.x+(q.x-a.x)*t,z=a.z+(q.z-a.z)*t,y=a.y+(q.y-a.y)*t;batchBeam(silver,[x,y-b.base,z],[x,y+height-b.base,z],.01,'#9caaa1');}}}
    };
    const railLine=(u0,u1,v,heightAt,pickets=false)=>{const n=Math.ceil(Math.abs(u1-u0)/1.2),ps=Array.from({length:n+1},(_,i)=>{const u=u0+(u1-u0)*i/n,q=websterPoint(u,v);return {...q,y:heightAt(u,v)};});rail(ps,.93,pickets);};
    for(const [index,v] of [[0,10.65],[1,19.9],[1,26.35],[2,35.35]]){const f=WEBSTER_LOWER_FLIGHTS[index];railLine(E.front-.2,E.lowerEnd+.2,v,(u,v)=>{const t=clamp((u-E.front)/(E.lowerEnd-E.front),0,1),low=f.low0+(f.low1-f.low0)*clamp((v-f.v0)/(f.v1-f.v0),0,1);return low+(E.middleRL-low)*t;});}
    for(const v of [15.9,21.45,27.65])railLine(E.upperStart-.25,E.upperEnd+.25,v,u=>E.middleRL+(E.mainRL-E.middleRL)*clamp((u-E.upperStart)/(E.upperEnd-E.upperStart),0,1));
    railLine(E.lowerEnd,-11.65,10.6,()=>E.middleRL,true);railLine(E.lowerEnd,-6.65,35.4,()=>E.middleRL,true);
    const signTexture=canvasTexture(1024,128,ctx=>{ctx.clearRect(0,0,1024,128);ctx.fillStyle='#4e584f';ctx.textBaseline='middle';ctx.font='500 58px sans-serif';ctx.fillText('ROBERT WEBSTER BUILDING',0,64,1024);}),sign=new THREE.Mesh(new THREE.PlaneGeometry(4.8,.6),new THREE.MeshBasicMaterial({map:signTexture,transparent:true,depthWrite:false})),site=websterPoint(-12.02,(E.west+E.east)/2);
    sign.position.set(site.x,E.ceilingRL+.12,site.z);sign.rotation.y=Math.atan2(-WEBSTER_FRAME.u.x,-WEBSTER_FRAME.u.z);world.add(sign);
    world.add(stone.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving'),bumpMap:surfaceTexture('paving'),bumpScale:.015})),portal.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,map:surfaceTexture('concrete')})),silver.mesh(style('#ffffff',{vertexColors:true,metalness:.7,roughness:.25})));
  }

  function websterBuilding(b,masonry,glass,detail,roofs){
    const {frame:f,classify}=modernFacadeFrame(b),ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    const mirror=new Batch();mirror.base=b.base;
    for(let i=0;i<ring.length;i++){
      for(const span of websterFacadeSpans(ring[i],ring[(i+1)%ring.length])){
      const a=span.a,c=span.b,e=classify(a,c),cut=span.recess?WEBSTER_ENTRY.ceilingRL-b.base:0;if(e.length<.02)continue;
      wallPanel(masonry,a,c,cut,b.height,'#bfc8bf');
      if(!span.recess)wallPanel(masonry,a,c,0,3.55,'#857462',.025);
      const south=e.u<-.8,west=e.v<-.8;
      if(south){
        wallPanel(mirror,a,c,Math.max(3.6,cut),b.height-.14,'#b5c8ce',.085);
        for(let y=3.6;y<b.height;y+=.92)if(y>=cut)wallPanel(detail,a,c,y,y+.035,'#758a87',.15);
        const bays=Math.max(1,Math.round(e.length/1.55));
        for(let j=0;j<=bays;j++)wallPanel(detail,a,c,Math.max(3.55,cut),b.height,'#b0bcb3',.17,j/bays,Math.min(1,j/bays+.045/e.length));
        if(!span.recess)for(let j=3;j<bays-1;j+=6){
          const t=j/bays,u=(j+.75)/bays,y=7.3;
          const p=(v,h,off)=>[a.x+(c.x-a.x)*v+e.nx*off,h,a.z+(c.z-a.z)*v+e.nz*off];
          // Small top-hung opening lights break the curtain-wall grid.
          mirror.quad(p(t,y,.28),p(t,y+.65,.09),p(u,y+.65,.09),p(u,y,.28),'#9cafb6');
          batchBeam(detail,p(t,y,.3),p(u,y,.3),.025,'#87958c');
        }
      }else{
        wallPanel(glass,a,c,Math.max(4,cut),b.height-1.25,'#647b75',.07);
        for(let row=0;row<=3;row++){const y=4+(b.height-5.25)*row/3;if(y>=cut)wallPanel(detail,a,c,y,y+.16,'#c4cfc1',.14);}
        for(let d=.12;d<e.length;d+=west?.43:.7){
          const p={x:a.x+(c.x-a.x)*d/e.length+e.nx*.2,z:a.z+(c.z-a.z)*d/e.length+e.nz*.2};
          const angle=Math.atan2(-e.nz,e.nx);
          const lo=Math.max(4,cut);detail.box(p.x,(lo+b.height-1.25)/2,p.z,.32,b.height-1.25-lo,.055,'#d7ddcf',angle);
        }
        wallPanel(detail,a,c,b.height-1.25,b.height,'#d6dace',.12);
        if(west&&e.length>10){wallPanel(detail,a,c,.25,2.95,'#3d4640',.05,.38,.59);wallPanel(glass,a,c,.3,2.85,'#506b65',.065,.395,.575);for(const t of [.395,.485,.575])wallPanel(detail,a,c,.28,2.9,'#bfc9bd',.09,t,t+.065/e.length);wallPanel(detail,a,c,1.1,1.53,'#d6dbce',.12,.475,.48);const labelA={x:a.x+(c.x-a.x)*.02,z:a.z+(c.z-a.z)*.02},labelB={x:a.x+(c.x-a.x)*.31,z:a.z+(c.z-a.z)*.31};facadeLabel(b,labelA,labelB,'Robert Webster Building','G14',3.6,2.2,'#dcded0');}
      }
      const bays=Math.max(1,Math.round(e.length/3.1));
      if(!west&&!span.recess)for(let j=0;j<bays;j++){
        if(west&&j>bays*.5)continue;
        wallPanel(glass,a,c,.15,3.25,'#4f6c62',.07,(j+.12)/bays,(j+.88)/bays);
        wallPanel(detail,a,c,.1,3.4,'#c1c9b7',.13,j/bays,Math.min(1,j/bays+.1/e.length));
      }
    }}
    polygon(roofs,b.points,b.height,'#acb5a8');
    websterEntrance(b,masonry,glass,detail,roofs);
    const mesh=mirror.mesh(style('#ffffff',{vertexColors:true,roughness:.035,metalness:.82,envMapIntensity:1.2}));world.add(mesh);
    const front=framePoint(f,-f.width/2-1.5,0),target=new THREE.WebGLCubeRenderTarget(512,{type:THREE.HalfFloatType,generateMipmaps:true,minFilter:THREE.LinearMipmapLinearFilter});
    const probe=new THREE.CubeCamera(.3,380,target);probe.position.set(front.x,b.base+9,front.z);
    campusReflections.push({mesh,probe,target});mesh.material.envMap=target.texture;
    for(const part of WEBSTER_SOLIDS)addCollider({...part,top:b.height,base:b.base});
    for(const part of WEBSTER_RECESS_PARTS)addCollider({...part,bottom:WEBSTER_ENTRY.ceilingRL-b.base,top:b.height,base:b.base});
  }

  function updateCampusReflection(){
    // Static local probes update after loading or a lighting change;
    // walking never triggers six additional scene renders per probe per frame.
    for(const mesh of campusPlanarReflections)mesh.visible=false;
    for(const {mesh}of campusReflections)mesh.visible=false;
    try{for(const {probe}of campusReflections)probe.update(renderer,scene);}
    finally{for(const {mesh}of campusReflections)mesh.visible=true;for(const mesh of campusPlanarReflections)mesh.visible=true;}
  }

  function chemicalComplex(b,masonry,brick,glass,detail,roofs){
    const f=orientedFrame(b.points),classify=modernFacadeFrame(b).classify;
    const parts=CHEMICAL_PARTS.filter(p=>p.parent===b.id);
    for(const part of parts){
      const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points,tower=part.role==='tower',roof=tower?b.height-.12:part.roof;
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],e=classify(a,c);if(e.length<.15)continue;
        if(tower){
          wallPanel(brick,a,c,0,roof,'#9b6d50');
          if(Math.abs(e.u)>.8){
            wallPanel(masonry,a,c,7.3,roof,'#d2d1c1',.04);
            const storey=(roof-7.3)/11;
            for(let row=0;row<11;row++){
              const lo=7.3+row*storey+.22,hi=lo+1.12;
              wallPanel(glass,a,c,lo,hi,'#687f7d',.08,.015,.985);
              for(let d=.6;d<e.length-.3;d+=1.05)wallPanel(detail,a,c,lo,hi,'#c5cbbd',.15,d/e.length,Math.min(.99,(d+.045)/e.length));
              wallPanel(detail,a,c,hi,hi+.13,'#e1e0d1',.28,.01,.99);
              wallPanel(detail,a,c,lo-.06,lo,'#a2afa5',.17,.01,.99);
            }
          }else{
            for(let row=0;row<11;row++){
              const y=8+row*3.1;
              wallPanel(glass,a,c,y,y+.55,'#596f69',.065,.42,.57);
              wallPanel(detail,a,c,y-.04,y,'#b0b7a5',.12,.41,.58);
            }
          }
          wallPanel(detail,a,c,roof-.18,roof+.12,'#aeb6a8',.13);
        }else{
          const front=e.u<-.8,east=e.v>.8;
          wallPanel(masonry,a,c,0,part.height,'#a0a9a3');
          if(front){
            wallPanel(glass,a,c,.15,3.8,'#899d86',.07);
            wallPanel(glass,a,c,4.0,14.7,'#91a9ae',.07);
            for(let d=.2;d<e.length;d+=1.1){
              const p={x:a.x+(c.x-a.x)*d/e.length+e.nx*.3,z:a.z+(c.z-a.z)*d/e.length+e.nz*.3};
              detail.box(p.x,9.4,p.z,.42,10.8,.07,'#d6ddd4',Math.atan2(-e.nz,e.nx));
              wallPanel(detail,a,c,.1,3.85,'#354b44',.14,d/e.length,Math.min(1,(d+.065)/e.length));
            }
            for(const y of [1.2,2.4,3.8])wallPanel(detail,a,c,y,y+.075,'#344941',.15);
            for(const y of [7.5,11.15])wallPanel(detail,a,c,y,y+.13,'#8f9c96',.22);
            if(e.length>20){
              const sub=t=>({x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t});
              wallPanel(detail,a,c,.75,2.8,'#394942',.19,.78,.98);
              facadeLabel(b,sub(.78),sub(.98),'June Griffith Building','F10',Math.min(5,e.length*.19),1.8,'#e7e9da');
            }
          }else if(east){
            // Glazed stair bay visible beside the eastern front wing.
            wallPanel(glass,a,c,1.1,part.height-.18,'#819fa9',.08);
            for(let y=1.2;y<part.height;y+=1.6)wallPanel(detail,a,c,y,y+.08,'#c5d2c9',.16);
            const bays=Math.max(1,Math.round(e.length/2));
            for(let j=0;j<=bays;j++)wallPanel(detail,a,c,1,part.height,'#d0d9ce',.18,j/bays,Math.min(1,j/bays+.06/e.length));
            for(const y of [4.5,8.5,12.5])wallPanel(detail,a,c,y,y+.28,'#849b9b',.11);
          }else{
            const bays=Math.max(1,Math.round(e.length/3.1));
            for(let row=0;row<3;row++)for(let j=0;j<bays;j++){
              const mid=(j+.45+(row%2)*.2)/bays,lo=3.8+row*3.4;
              wallPanel(glass,a,c,lo,lo+1.9,'#526c68',.07,mid-.16/e.length,Math.min(.99,mid+.16/e.length));
            }
            for(let d=.1;d<e.length;d+=1.55)wallPanel(detail,a,c,3.3,part.height-.1,'#7f918b',.03,d/e.length,Math.min(1,(d+.014)/e.length));
            wallPanel(glass,a,c,.2,3.2,'#748d83',.06,.03,.97);
            for(let d=.2;d<e.length;d+=2.2)wallPanel(detail,a,c,.15,3.3,'#c1ccc0',.12,d/e.length,Math.min(1,(d+.075)/e.length));
          }
          wallPanel(detail,a,c,part.height-.18,part.height+.02,'#c2cec4',.18);
        }
      }
      polygon(roofs,part.points,roof,tower?'#82918a':'#a0aba1',part.holes);
      addCollider({points:part.points,holes:part.holes,top:roof,base:b.base});
      if(tower){
        const tf=orientedFrame(part.points);
        for(const v of [-tf.length*.3,0,tf.length*.3]){
          const p=framePoint(tf,0,v);detail.box(p.x,roof+.75,p.z,4.8,1.4,3.2,'#94a49b',Math.atan2(-tf.u.z,tf.u.x));
        }
        for(let i=0;i<6;i++){
          const u=-tf.width/2+(i<2?2.4+i*1.2:5.3+(i-2)*.45);
          const p=framePoint(tf,u,tf.length/2+.6),r=i<2?.48:.16,lo=7.2,hi=roof+2.4;
          batchPipe(detail,[p.x,lo,p.z],[p.x,hi,p.z],r,i<2?'#83938e':'#d8dcd2');
          for(let y=lo+2;y<hi;y+=2.4)batchPipe(detail,[p.x,y,p.z],[p.x,y+.08,p.z],r+.028,'#b4c0b5');
          detail.box(p.x,hi+.08,p.z,r*2.1,.16,r*2.1,'#4c625b');
        }
      }else{
        // The repeated white service banks occupy the lower northeast roof,
        // distinct from the old tower's mixed rooftop plant and tall flues.
        const at=(u,v,y)=>{const p=framePoint(f,u,v);return[p.x,y,p.z];};
        for(let u=-3;u<19;u+=4.5)for(let v=27;v<39;v+=2.8){
          const points=[at(u,v,roof+.12),at(u,v,roof+1.3),at(u+.35,v,roof+1.65),at(u+.9,v,roof+1.65),at(u+1.2,v,roof+1.35)];
          if(points.some(p=>!inPolygon(p[0],p[2],part.points)))continue;
          for(let k=0;k<points.length-1;k++)batchPipe(detail,points[k],points[k+1],.12,'#d2d8d0');
        }
      }
    }
    chemicalPlanting(b,f);
  }

  function chemicalPlanting(b,f){
    const beds=new Batch(),plants=new Batch(),random=rng(211);plants.base=0;
    // Photo-led succulent beds along the main glazed wing, outside its mapped
    // perimeter. Dimensions and individual plant positions are estimates.
    for(const [lo,hi]of [[-32,-12],[-7,14]]){
      const points=frameRectangle(f,2.4,hi-lo,-f.width/2-2.7,(lo+hi)/2);
      polygon(beds,points,.13,'#9c9d85');
      for(let v=lo+.8;v<hi;v+=1.25){
        const p=framePoint(f,-f.width/2-2.7+(random()-.5)*.6,v),base=terrainHeight(p.x,p.z)+.16;
        const path=nearestPath(p.x,p.z);if(path.distance<(path.path?.width||3)/2+.3)continue;
        for(let leaf=0;leaf<11;leaf++){
          const a=leaf/11*TAU+random()*.25,dx=Math.cos(a),dz=Math.sin(a),px=-dz,pz=dx,len=.55+random()*.55,w=.1;
          const left=[p.x+dx*len*.5+px*w,base+.35,p.z+dz*len*.5+pz*w],right=[p.x+dx*len*.5-px*w,base+.35,p.z+dz*len*.5-pz*w];
          plants.quad([p.x,base,p.z],left,[p.x+dx*len,base+.6+random()*.2,p.z+dz*len],right,leaf%2?'#6d9281':'#8ca49a');
        }
      }
    }
    world.add(beds.mesh(style('#ffffff',{vertexColors:true})),plants.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
  }

  function websterTheatres(b,masonry,aggregate,glass,detail,roofs){
    const g=websterTheatresGeometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points,classify=modernFacadeFrame(b).classify;
    const low=buildingBase(b.points)-b.base;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],e=classify(a,c);if(e.length<.2)continue;
      const west=e.u<-.8;
      wallPanel(west?masonry:aggregate,a,c,low,b.height,west?'#c9d1c7':'#b1b5a8');
      wallPanel(detail,a,c,b.height-.12,b.height+.03,'#cbd2c5',.12);
      for(let y=1.5;y<b.height;y+=1.5)wallPanel(detail,a,c,y,y+.014,'#a9b8ac',.025);
      if(Math.abs(e.u)>.8){
        wallPanel(glass,a,c,4.55,5.05,'#415b53',.06,.04,.96);
        for(let d=.7;d<e.length;d+=1.9)wallPanel(detail,a,c,4.5,5.1,'#dce2d4',.14,d/e.length,Math.min(1,(d+.18)/e.length));
        if(west){
          wallPanel(glass,a,c,.15,3.15,'#68867e',.07,.08,.92);
          wallPanel(glass,a,c,3.75,5.95,'#92aaa3',.07,.32,.68);
          wallPanel(detail,a,c,3.25,3.65,'#bfc8b6',.5,.3,.7);
          for(let d=.6;d<e.length;d+=1.7)wallPanel(detail,a,c,.1,3.25,'#d4ddd1',.16,d/e.length,Math.min(1,(d+.065)/e.length));
          wallPanel(detail,a,c,1.5,1.56,'#cbd6ca',.17,.08,.92);
          const t=.5,door=[a.x+(c.x-a.x)*t+e.nx*.2,a.z+(c.z-a.z)*t+e.nz*.2];
          detail.box(door[0],1.5,door[1],.045,.6,.045,'#b7c8ba');
        }
      }
    }
    polygon(roofs,b.points,b.height,'#aeb8ab');
    const canopy=new Batch();canopy.base=b.base;
    for(let v=g.canopy.start;v<g.canopy.end;v+=3.6){
      for(let i=0;i<10;i++){
        const t=i/10,u=(i+1)/10,point=(s,w)=>{const p=framePoint(f,g.canopy.west+s*g.canopy.depth,w);return[p.x,g.roofHeight(s),p.z];};
        canopy.quad(point(t,v),point(u,v),point(u,Math.min(g.canopy.end,v+3.5)),point(t,Math.min(g.canopy.end,v+3.5)),'#d2d3be');
        if(v===g.canopy.start||v+3.6>=g.canopy.end){const end=v===g.canopy.start?g.canopy.start:g.canopy.end;batchBeam(detail,point(t,end),point(u,end),.06,'#3e5551');}
      }
      const a=framePoint(f,g.canopy.west,v),c=framePoint(f,g.west,v);
      batchBeam(detail,[a.x,g.roofHeight(0)-.08,a.z],[c.x,g.roofHeight(1)-.08,c.z],.07,'#405550');
    }
    for(const p of g.posts){
      const bottom=terrainHeight(p.x,p.z)-b.base,top=g.roofHeight(0)-.02;
      detail.box(p.x,(bottom+top)/2,p.z,.13,top-bottom,.13,'#3c5550');
      addCollider({x:p.x,z:p.z,radius:.105,bottom,top,base:b.base});
    }
    world.add(canopy.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.86})));
    addCollider({points:b.points,bottom:low,top:b.height,base:b.base});
    addCollider({points:frameRectangle(f,g.canopy.depth,g.canopy.length,g.west-g.canopy.depth/2,(g.canopy.start+g.canopy.end)/2),bottom:3.38,top:4.05,base:b.base});
  }

  function clancyAuditorium(b,detail){
    const g=clancyGeometry(b),f=g.frame,h=g.hood,concrete=new Batch(),outer=new Batch(),gold=new Batch(),glazing=new Batch(),floor=new Batch(),canopyGlass=new Batch(),glassFins=new Batch(),seams=new Batch();
    for(const batch of [concrete,outer,gold,glazing,floor,canopyGlass,glassFins,seams])batch.base=b.base;
    const p=(u,v,y)=>{const q=framePoint(f,u,v);return[q.x,y,q.z];};
    const low=Math.min(0,buildingBase(b.points)-b.base),ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    // The opaque auditorium is inset from the glazed wraparound foyer.
    const core=polygonArea(g.core)<0?[...g.core].reverse():g.core;
    for(let i=0;i<core.length;i++)wallPanel(concrete,core[i],core[(i+1)%core.length],0,12.5,'#adb6aa');
    polygon(concrete,g.core,12.5,'#9fa99e');
    polygon(floor,b.points,.055,'#233d72');
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.2)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,normalV=nx*f.v.x+nz*f.v.z,normalU=nx*f.u.x+nz*f.u.z;
      wallPanel(concrete,a,c,low,.04,'#a4aea1');
      // Long side faces are glazed; diagonal corners and the stage end retain
      // the faceted concrete shell seen around the new foyer hoods.
      if(normalV<-.9)continue;
      if(Math.abs(normalU)>.9)continue;
      const top=q=>normalV>.8?8.5:Math.max(2.6,8.8-(Math.abs(g.local(q).u)-12)*.5);
      concrete.quad([a.x,0,a.z],[a.x,top(a),a.z],[c.x,top(c),c.z],[c.x,0,c.z],'#bdc3b5');
      if(normalV>.8){wallPanel(detail,a,c,.2,2.6,'#696d59',.07,.46,.54);wallPanel(detail,a,c,7.9,8.4,'#a3ac9b',.08);}
    }
    // North civic hood: oxidised outer copper and a warm shingle-lined interior.
    const rearLeft=p(h.centreU-h.width/2,h.backV,h.backHeight),rearRight=p(h.centreU+h.width/2,h.backV,h.backHeight);
    const lipLeft=p(h.centreU-h.lipWidth/2,h.lipV,h.lipHeight),lipRight=p(h.centreU+h.lipWidth/2,h.lipV,h.lipHeight);
    outer.quad(rearLeft,rearRight,lipRight,lipLeft,'#42463e');
    const beneath=q=>[q[0],q[1]-.24,q[2]],shingles=(points,color)=>gold.quad(...points,color,clancySurfaceUV(points));
    shingles([beneath(lipLeft),beneath(lipRight),beneath(rearRight),beneath(rearLeft)],'#fff1cd');
    outer.quad(lipLeft,lipRight,beneath(lipRight),beneath(lipLeft),'#343e38');
    for(const side of [-1,1]){
      const base=p(h.centreU+side*h.width/2,h.glassV,0),backBase=p(h.centreU+side*h.width/2,h.backV,0),rear=side<0?rearLeft:rearRight,lip=side<0?lipLeft:lipRight;
      shingles([base,lip,rear,backBase],'#f3dda2');
      const shift=q=>[q[0]+f.u.x*side*.2,q[1],q[2]+f.u.z*side*.2];
      outer.quad(shift(backBase),shift(rear),shift(lip),shift(base),'#4a4940');
      outer.quad(base,shift(base),shift(lip),lip,'#3c443c');
      // Standing seams run up the triangular oxidised outer cheeks.
      for(let v=h.lipV+.35;v<h.backV;v+=CLANCY_COPPER.seamPitch){
        const t=(v-h.lipV)/(h.backV-h.lipV),u=h.centreU+side*(h.lipWidth/2+(h.width-h.lipWidth)/2*t+.215),front=Math.max(0,(h.glassV-v)/(h.glassV-h.lipV)),bottomU=h.centreU+side*(h.width/2+(h.lipWidth-h.width)/2*front+.215);
        batchBeam(seams,p(bottomU,v,front*h.lipHeight+.02),p(u,v,g.roofHeight(v)-.03),.025,'#252f2c');
      }
    }
    for(let u=-h.lipWidth/2+.25;u<h.lipWidth/2;u+=CLANCY_COPPER.seamPitch){
      const t=(u+h.lipWidth/2)/h.lipWidth,front=p(h.centreU+u,h.lipV+.14,g.roofHeight(h.lipV+.14)+.012),back=p(h.centreU-h.width/2+t*h.width,h.backV,h.backHeight+.012);
      batchBeam(seams,front,back,.018,'#2c3430');
    }
    const ga=framePoint(f,h.centreU-h.width/2,h.glassV),gc=framePoint(f,h.centreU+h.width/2,h.glassV);
    wallPanel(glazing,ga,gc,.08,h.glassHeight,'#b9d0c6');
    wallPanel(gold,ga,gc,h.glassHeight,g.roofHeight(h.glassV)-.24,'#f2dfaa');
    for(const fin of CLANCY_GLASS_FINS){
      const a=p(fin.u,fin.frontV,fin.bottom),c=p(fin.u,fin.frontV,fin.top),centre=framePoint(f,fin.u,(fin.frontV+fin.backV)/2);
      glassFins.box(centre.x,(fin.bottom+fin.top)/2,centre.z,CLANCY_GLAZING.finThickness,fin.top-fin.bottom,fin.backV-fin.frontV,'#b4d3c5',Math.atan2(-f.u.z,f.u.x));batchBeam(seams,a,c,.012,'#7f9b8f');
    }
    wallPanel(detail,ga,gc,3.58,3.64,'#35463e',.05);
    for(const u of [-8.6,-2.9,2.9,8.6]){
      batchPipe(detail,p(h.centreU+u,h.glassV-.12,.95),p(h.centreU+u,h.glassV-.12,1.65),.022,'#c3d0c2');
    }
    // Slender beams and translucent panes replace the opaque canopy slab.
    const c=CLANCY_CANOPY;
    const canopyVertices=CLANCY_CANOPY_POINTS.map(q=>[q.x,c.height,q.z]);canopyGlass.quad(...canopyVertices,'#c2d1c3');
    for(const v of [c.frontV,c.backV])batchBeam(detail,p(h.centreU-c.width/2,v,c.height),p(h.centreU+c.width/2,v,c.height),.045,'#35453d');
    for(let i=0;i<=c.bays;i++){
      const u=h.centreU-c.width/2+i*c.width/c.bays;batchBeam(detail,p(u,c.frontV,c.height-.065),p(u,c.backV,c.height-.065),.065,'#36463e');
    }
    for(let v=c.frontV+.16;v<c.backV;v+=c.slatPitch)batchBeam(seams,p(h.centreU-c.width/2,v,c.height+.025),p(h.centreU+c.width/2,v,c.height+.025),.012,'#7a8c7d');
    for(const cable of CLANCY_HANGERS){
      batchPipe(detail,p(cable.u,cable.v,cable.bottom),p(cable.u,cable.v,cable.top),.014,'#758b7c');
      for(const y of [cable.bottom,cable.top]){const q=framePoint(f,cable.u,cable.v);detail.box(q.x,y,q.z,.12,.06,.12,'#485c4f');}
    }
    const angle=Math.atan2(-f.u.z,f.u.x);
    // Smaller east and west glazed hoods wrap around the original hall.
    for(const side of [-1,1]){
      const u=side*21.5,lipU=side*24.4;
      const a=framePoint(f,u,side>0?-10:12),c=framePoint(f,u,side>0?12:-10);
      wallPanel(glazing,a,c,.08,5.1,'#a7c1b7');
      for(let v=-10;v<=12;v+=2.2)batchPipe(detail,p(u,v,.1),p(u,v,5.1),.014,'#93a69a');
      shingles([p(u,-10,5.2),p(u,12,5.2),p(lipU,12,7),p(lipU,-10,7)],'#f4dfa5');
      outer.quad(p(u,12,5.43),p(u,-10,5.43),p(lipU,-10,7.23),p(lipU,12,7.23),'#454a40');
      outer.quad(p(lipU,-10,7.23),p(lipU,12,7.23),p(lipU,12,7),p(lipU,-10,7),'#3b443a');
    }
    // A restrained foyer fitout is visible through the glazing. The tapestry
    // and interior artworks are not replaced with invented reproductions.
    for(const u of [-10.5,10.5]){const q=framePoint(f,u,-8);detail.box(q.x,1.2,q.z,3,2.4,2.6,'#244477',angle);}
    for(let i=0;i<20;i++){
      const u0=-7+i*.7,u1=u0+.7,v=u=>-8.7-.7*(1-(u/7)**2),a=framePoint(f,u0,v(u0)),c=framePoint(f,u1,v(u1));
      wallPanel(concrete,a,c,.05,1.15,'#c5cabe');
      const d=framePoint(f,u0,v(u0)+1),e=framePoint(f,u1,v(u1)+1);polygon(detail,[a,c,e,d],1.18,'#a7afa4');
    }
    const logo=canvasTexture(1024,384,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.fillStyle='#e9ead5';ctx.textAlign='center';ctx.font='500 220px sans-serif';ctx.fillText('UNSW',w/2,240);ctx.font='500 63px sans-serif';ctx.fillText('S Y D N E Y',w/2,330);});
    const wordmark=new THREE.Mesh(new THREE.PlaneGeometry(8,3),new THREE.MeshBasicMaterial({map:logo,transparent:true,opacity:.7,depthWrite:false})),q=framePoint(f,h.centreU,h.glassV-.08);
    wordmark.position.set(q.x,b.base+7,q.z);wordmark.rotation.y=Math.atan2(-f.v.x,-f.v.z);world.add(wordmark);
    const copper=copperShingles(),clancyGlass=glazing.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.44,roughness:.08,metalness:.38,envMapIntensity:.8,side:THREE.DoubleSide,depthWrite:false}));
    medicalReflection(clancyGlass,framePoint(f,h.centreU,h.glassV-5),b.base+5);
    world.add(concrete.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),bumpMap:surfaceTexture('concrete'),bumpScale:.045})),outer.mesh(style('#ffffff',{vertexColors:true,metalness:.55,roughness:.6,side:THREE.DoubleSide})),gold.mesh(style('#ffffff',{vertexColors:true,map:copper,bumpMap:copper,bumpScale:.018,metalness:.58,roughness:.36,emissive:'#a37225',emissiveIntensity:.13,side:THREE.DoubleSide})),clancyGlass,floor.mesh(style('#ffffff',{vertexColors:true})));
    world.add(seams.mesh(style('#ffffff',{vertexColors:true,metalness:.55,roughness:.6})),canopyGlass.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.32,roughness:.14,metalness:.15,side:THREE.DoubleSide,depthWrite:false})),glassFins.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.14,roughness:.08,metalness:.15,depthWrite:false})));
    addCollider({points:CLANCY_CANOPY_POINTS,bottom:c.height-c.beamDepth,top:c.height+c.thickness,base:b.base});
    addCollider({points:b.points,bottom:low,top:b.height,base:b.base});
    for(const hood of buildings.filter(q=>q.modelledWith===b.id))addCollider({points:hood.points,bottom:hood.id==='osm-way-1178531028'?6.86:5.1,top:hood.id==='osm-way-1178531028'?14.5:7.23,base:b.base});
  }

  function chancelleryBuilding(b,brick,glass,detail,roofs){
    const g=chancelleryGeometry(b),f=g.frame,w=g.west,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.2)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,normalV=nx*f.v.x+nz*f.v.z,normalU=nx*f.u.x+nz*f.u.z,mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2});
      const western=mid.u<4.14&&mid.v>w.minV-.1&&mid.v<w.maxV+.1;
      wallPanel(brick,a,c,0,western?w.eave:14.8,'#796d58');
      if(western&&Math.abs(normalV)>.8){
        const bays=w.bays;
        for(let j=0;j<bays;j++){
          const u=w.minU+(j+.5)*g.pitch;
          for(let floor=0;floor<4;floor++){
            const lo=2.5+floor*2.9+.4,hi=lo+1.85,p0=framePoint(f,u-g.pitch*.35,mid.v),p1=framePoint(f,u+g.pitch*.35,mid.v);
            const aa=normalV>0?p1:p0,cc=normalV>0?p0:p1;
            wallPanel(glass,aa,cc,lo,hi,'#526c66',.08);
            wallPanel(detail,aa,cc,hi,hi+.1,'#b4bfb0',.13);
            if(normalV<0&&floor===3){wallPanel(detail,aa,cc,lo-.35,lo+.55,'#bfc8b5',.75);}
          }
        }
        for(let j=0;j<=bays;j++){
          const p=framePoint(f,w.minU+j*g.pitch,mid.v),column={x:p.x+nx*.16,z:p.z+nz*.16};
          detail.box(column.x,7.2,column.z,.27,14.4,.42,'#c4ccba',Math.atan2(-f.u.z,f.u.x));
        }
      }else{
        const entrance=normalU>.85&&mid.u>15&&mid.u<16&&Math.abs(mid.v)<26,bays=Math.max(1,Math.round(len/2.5));
        for(let floor=0;floor<5;floor++)for(let bay=0;bay<bays;bay++){
          const midT=(bay+.5)/bays,half=(entrance&&floor<3?.43:.28)/bays,lo=floor*3+.38,hi=lo+2.25;
          wallPanel(glass,a,c,lo,hi,entrance&&floor<3?'#637c70':'#4b625c',.07,midT-half,midT+half);
          wallPanel(detail,a,c,hi,hi+.055,'#b4beac',.16,midT-half,midT+half);
          wallPanel(detail,a,c,(lo+hi)/2,(lo+hi)/2+.035,'#819586',.12,midT-half,midT+half);
        }
        for(let floor=1;floor<5;floor++)wallPanel(detail,a,c,floor*3-.12,floor*3+.04,'#575f50',.07);
        if(western&&Math.abs(normalU)>.8)wallPanel(detail,a,c,13.1,13.45,'#3e564b',.08,.3,.7);
      }
      if(!western)wallPanel(detail,a,c,14.6,15,'#c5ccbb',.28);
    }
    for(const region of CHANCELLERY_ROOFS){
      if(region.kind==='vaults')shapedRoof(roofs,region.points,g.roofHeight,'#c1c9b8');
      else polygon(roofs,region.points,15,'#a4afa0',region.holes);
    }
    // Thin concrete arch edges make the repeated barrel vaults legible from
    // Library Lawn and the northern courtyard.
    for(const v of [w.minV,w.maxV])for(let bay=0;bay<w.bays;bay++)for(let i=0;i<12;i++){
      const u=w.minU+(bay+i/12)*g.pitch,t=u+g.pitch/12,a=framePoint(f,u,v),c=framePoint(f,t,v),ya=g.roofHeight(a),yc=g.roofHeight(c);
      const edge=[[a.x,w.eave-.12,a.z],[a.x,ya,a.z],[c.x,yc,c.z],[c.x,w.eave-.12,c.z]];
      detail.quad(...(v===w.maxV?edge.reverse():edge),'#d4d9c8');
    }
    const entry=framePoint(f,17.2,0),angle=Math.atan2(-f.v.z,f.v.x);
    detail.box(entry.x,8.15,entry.z,10,.2,3.6,'#d6dccb',angle);
    for(const v of [-4.7,4.7]){
      const p=framePoint(f,18.6,v),bottom=terrainHeight(p.x,p.z)-b.base;
      detail.box(p.x,(bottom+8.1)/2,p.z,.16,8.1-bottom,.16,'#b8c7b4');addCollider({x:p.x,z:p.z,radius:.1,bottom,top:8.2,base:b.base});
    }
    const ea=framePoint(f,19, -4.5),ec=framePoint(f,19,4.5);
    facadeLabel(b,ea,ec,'The Chancellery','',2.4,8.16,'#354b3f');
    chancelleryGarden(b,g);
    addCollider({points:b.points,top:b.height,base:b.base});
  }

  function chancelleryGarden(b,g){
    const wood=new Batch(),fronds=new Batch();wood.base=fronds.base=0;
    const mulch=new Batch();
    for(const bed of g.beds)polygon(mulch,bed,.07,'#9b7959');
    for(const [index,fern]of g.ferns.entries()){
      const base=terrainHeight(fern.x,fern.z),top=base+fern.height;
      batchPipe(wood,[fern.x,base,fern.z],[fern.x,top,fern.z],.12,'#7b7151');
      for(let leaf=0;leaf<12;leaf++){
        const angle=leaf/12*TAU+index*.7,dx=Math.cos(angle),dz=Math.sin(angle),px=-dz,pz=dx;
        for(let i=0;i<9;i++){
          const t=i/9,r=t*2.3,y=top+.55*Math.sin(t*Math.PI)-.45*t,x=fern.x+dx*r,z=fern.z+dz*r;
          const width=.42*Math.sin((t+.1)*Math.PI);
          for(const side of [-1,1])fronds.triangle([x,y,z],[x+dx*.18,y-.02,z+dz*.18],[x+dx*.35+px*width*side,y-.12,z+dz*.35+pz*width*side],leaf%2?'#638844':'#86a85d');
        }
      }
      addCollider({x:fern.x,z:fern.z,radius:.17,top:fern.height,base});
    }
    for(const v of [-10,-5,5,10]){
      const p=framePoint(g.frame,26,v),base=terrainHeight(p.x,p.z),ball=new THREE.Mesh(new THREE.SphereGeometry(.34,10,7),style('#a3a68d',{map:surfaceTexture('aggregate'),bumpMap:surfaceTexture('aggregate'),bumpScale:.025}));
      ball.position.set(p.x,base+.29,p.z);ball.castShadow=true;world.add(ball);addCollider({x:p.x,z:p.z,radius:.34,top:.63,base});
    }
    world.add(mulch.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('aggregate')})),wood.mesh(style('#ffffff',{vertexColors:true})),fronds.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
  }

  function bioscienceBuilding(b,detail,roofs){
    const g=bioscienceGeometry(b),f=g.frame,panels=new Batch(),glazing=new Batch(),greyPanels=new Batch(),terracotta=new Batch(),piers=new Batch(),screenGlass=new Batch();for(const batch of [panels,glazing,greyPanels,terracotta,piers,screenGlass])batch.base=b.base;
    const northPalette=['#c4cdc7','#aab6b1','#d4d8ce','#8b9e9a','#bdc5bd','#dae0d6'];
    const clay=['#b9653d','#bd7d50','#d3aa77','#b45236','#d8be8b','#996244','#d1cdc0'];
    for(const part of BIOSCIENCE_PARTS.filter(p=>p.buildingId===b.id)){
      const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points,top=part.roofRL-b.base;
      const floating=part.kind==='glass-box',bottom=floating?57.57-b.base:0;
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
        const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z,nv=nx*f.v.x+nz*f.v.z;
        const mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2});
        const grayEnd=g.north&&part.kind==='main'&&nu>.8,clayScreen=!g.north&&part.kind==='main'&&(nu>.55||nv>.55);
        const allGlass=floating||part.kind==='atrium'||g.north&&part.kind==='main'&&nv<-.7&&mid.u>30;
        wallPanel(panels,a,c,bottom,top,part.kind==='biolink'?'#9baba2':grayEnd?'#bdc5b8':g.north?'#a9b8b1':'#745a46');
        if(grayEnd){
          const {columns:cols,rows}=biosciencePanelGrid(len,top-bottom);
          for(let j=0;j<cols;j++)for(let r=0;r<rows;r++)wallPanel(greyPanels,a,c,bottom+(top-bottom)*r/rows,bottom+(top-bottom)*(r+1)/rows-.009,bioscienceGreyPanel(j,r,cols,rows),.025,(j+.012)/cols,(j+.988)/cols);
        }else if(part.kind==='biolink'){
          for(let r=1;r<8;r++){
            const lo=g.levels[r]-b.base+.32,hi=Math.min(top-.25,lo+2.35);if(hi<=lo)continue;
            wallPanel(glazing,a,c,lo,hi,'#69858a',.055,.015,.985);
            wallPanel(detail,a,c,hi,hi+.19,'#d2d9ce',.17);
            for(let d=.4;d<len;d+=1.2)wallPanel(detail,a,c,lo,hi,'#b5c5bb',.09,d/len,Math.min(1,(d+.05)/len));
          }
        }else{
          // Raised glass base and repeated laboratory levels follow the
          // planning floor RLs. Missing map-level tags are never fabricated.
          const count=Math.max(1,Math.round(len/(allGlass?1.5:g.north?1.05:BIOSCIENCE_SCREEN.pitch)));
          for(let r=0;r<g.levels.length-1;r++){
            const lo=Math.max(bottom,g.levels[r]-b.base+.1),hi=Math.min(top-.16,g.levels[r+1]-b.base-.12);if(hi<=lo)continue;
            const baseLevel=g.north?g.levels[r]<61.53:floating?false:g.levels[r]<(clayScreen?BIOSCIENCE_SCREEN.firstRL:61.53);
            for(let j=0;j<count;j++){
              const start=j/count,end=(j+1)/count,cell=(j*13+r*7)%17;
              const blue=baseLevel?'#2f423e':clayScreen?'#293d36':floating?'#859da4':['#90abb3','#a4b9b8','#b8c8bf','#96b0b5','#c1cfc5'][Math.floor(j/4+r)%5];
              wallPanel(clayScreen?screenGlass:glazing,a,c,lo,hi,blue,.065,start+.018/count,end-.018/count);
              if(baseLevel&&clayScreen){
                if(j%8===0)wallPanel(detail,a,c,lo,hi,'#4b5c55',.1,start,Math.min(end,start+.045/len));
              }else if(allGlass||baseLevel){
                wallPanel(detail,a,c,lo,hi,'#657f7c',.1,start,Math.min(end,start+.045/len));
              }else if(g.north){
                const shade=northPalette[(Math.floor(j/3)+r*2)%northPalette.length],width=cell<5?.8:cell<11?.52:.24;
                wallPanel(panels,a,c,lo,hi,shade,.14,start,Math.min(end,start+width/count));
                wallPanel(detail,a,c,lo,hi,'#d3dcd2',.31,Math.min(end,start+.08/count),Math.min(end,start+.15/count));
              }else if(clayScreen){
                const fin=bioscienceFin(j,r,count),q={x:a.x+(c.x-a.x)*(start+end)/2+nx*BIOSCIENCE_SCREEN.offset,z:a.z+(c.z-a.z)*(start+end)/2+nz*BIOSCIENCE_SCREEN.offset},theta=Math.atan2(-(c.z-a.z),c.x-a.x),profile=baguetteProfile(fin.width,fin.depth),at=(p,y)=>[q.x+p[0]*Math.cos(theta)+p[1]*Math.sin(theta),y,q.z-p[0]*Math.sin(theta)+p[1]*Math.cos(theta)],low=lo+fin.trimBottom,high=hi-fin.trimTop;
                for(let k=0;k<profile.length;k++){const p=profile[k],t=profile[(k+1)%profile.length];terracotta.quad(at(p,low),at(p,high),at(t,high),at(t,low),fin.color);terracotta.triangle([q.x,high,q.z],at(t,high),at(p,high),fin.color);terracotta.triangle([q.x,low,q.z],at(p,low),at(t,low),fin.color);}
              }else{
                const shade=clay[(Math.floor(j/3)+r+Math.floor(j/11))%clay.length];
                const p={x:a.x+(c.x-a.x)*(start+end)/2+nx*.3,z:a.z+(c.z-a.z)*(start+end)/2+nz*.3};
                detail.box(p.x,(lo+hi)/2,p.z,.105,hi-lo,.36,shade,Math.atan2(-(c.z-a.z),c.x-a.x));
                if(cell<5)wallPanel(panels,a,c,lo,lo+(hi-lo)*.34,shade,.1,start,end);
              }
            }
            if(floating){wallPanel(detail,a,c,lo+(hi-lo)*BIOSCIENCE_GLASS.midTransom,lo+(hi-lo)*BIOSCIENCE_GLASS.midTransom+BIOSCIENCE_GLASS.mullionWidth,'#647d80',.102);if(r<4)wallPanel(glazing,a,c,lo+.03,Math.min(hi,lo+BIOSCIENCE_GLASS.lowerSpandrel),'#507483',.075);}
            if(baseLevel&&clayScreen)for(let y=lo+.14;y<hi;y+=.16)wallPanel(detail,a,c,y,y+.025,'#46554f',.10);
            wallPanel(detail,a,c,hi,hi+.08,allGlass?'#5f7b7f':g.north?'#7e938e':'#826b52',.18);
          }
        }
        wallPanel(detail,a,c,top-.15,top+.04,g.north?'#c6cfc4':'#8f7963',.22);
      }
      polygon(roofs,part.points,top,g.north?'#aab7ac':'#9c9d87',part.holes);
      if(floating){
        polygon(panels,part.points,bottom,'#586e6a',part.holes);
        for(const p of g.supports){
          const ground=terrainHeight(p.x,p.z)-b.base;
          const at=(x,z,y)=>[p.x+f.u.x*x+f.v.x*z,y,p.z+f.u.z*x+f.v.z*z],w=BIOSCIENCE_PIER.bottomWidth/2,W=BIOSCIENCE_PIER.topWidth/2,lower=[[-w,-w],[w,-w],[w,w],[-w,w]],upper=[[-W,-W],[W,-W],[W,W],[-W,W]];
          for(let i=0;i<4;i++){const j=(i+1)%4;piers.quad(at(...lower[i],ground),at(...upper[i],bottom),at(...upper[j],bottom),at(...lower[j],ground),'#c0c8bc');}addCollider({x:p.x,z:p.z,radius:BIOSCIENCE_PIER.collisionRadius,top:bottom,base:b.base});
        }
      }
      addCollider({points:part.points,holes:part.holes,bottom,top,base:b.base});
    }
    for(const plant of g.plants){
      const low=plant.bottomRL-b.base,high=plant.roofRL-b.base,ring=polygonArea(plant.points)<0?[...plant.points].reverse():plant.points;
      polygon(roofs,ring,high,'#77867b');
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length];wallPanel(panels,a,c,low,high,g.north?'#7c877d':'#95795e');
        for(let y=low+.12;y<high;y+=.18)wallPanel(detail,a,c,y,y+.035,g.north?'#626f65':'#665e4b',.055);
      }
    }
    if(g.north){
      const c=g.canopy,start=c.start,end=c.end,roof=c.roofRL-b.base;
      const canopy=frameRectangle(f,end-start,c.depth,(start+end)/2,c.v-c.depth/2),underside=new Batch();underside.base=b.base;
      polygon(detail,canopy,roof,'#6a7c70');polygon(underside,canopy,roof-.17,'#aa7947');
      world.add(underside.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
      const a=framePoint(f,start,c.v-c.depth),z=framePoint(f,end,c.v-c.depth);wallPanel(detail,a,z,roof-.2,roof,'#344d46');
      addCollider({points:canopy,bottom:roof-.2,top:roof,base:b.base});
    }
    const clayGrain=canvasTexture(256,256,ctx=>{const random=rng(2017);ctx.fillStyle='#d9d5c8';ctx.fillRect(0,0,256,256);for(let i=0;i<13000;i++){ctx.fillStyle=i%2?'#7b6d5c16':'#fff8e91c';ctx.fillRect(random()*256,random()*256,.6+random(),.6+random());}});world.add(screenGlass.mesh(style('#ffffff',{vertexColors:true,roughness:.20,metalness:.12,envMapIntensity:.18})),greyPanels.mesh(style('#ffffff',{vertexColors:true,metalness:.18,roughness:.67})),terracotta.mesh(style('#ffffff',{vertexColors:true,map:clayGrain,bumpMap:clayGrain,bumpScale:.003,roughness:.88,side:THREE.DoubleSide})),piers.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),bumpMap:surfaceTexture('concrete'),bumpScale:.004,roughness:.9,side:THREE.DoubleSide})));
    const mesh=glazing.mesh(style('#ffffff',{vertexColors:true,roughness:.065,metalness:.76,envMapIntensity:1.25}));
    world.add(panels.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),bumpMap:surfaceTexture('concrete'),bumpScale:.014,side:THREE.DoubleSide})),mesh);
    const front=framePoint(f,g.north?0:39,g.north?-29:-6),target=new THREE.WebGLCubeRenderTarget(512,{type:THREE.HalfFloatType,generateMipmaps:true,minFilter:THREE.LinearMipmapLinearFilter});
    const probe=new THREE.CubeCamera(.3,300,target);probe.position.set(front.x,72,front.z);
    mesh.material.envMap=target.texture;campusReflections.push({mesh,probe,target});
    if(!g.north)bioscienceStreetGarden();
  }

  function bioscienceStreetGarden(){
    const soil=new Batch(),brick=new Batch(),cap=new Batch(),straps=new Batch();for(const batch of [soil,brick,cap,straps])batch.base=0;
    for(const t of BIO_STREET_SOIL_TRIANGLES)soil.triangle(...t.map(p=>[p.x,p.y,p.z]),'#746c4f');
    const f=BIO_STREET_FRAME,at=(p,y,d)=>[p.x+f.u.x*d,y,p.z+f.u.z*d];
    for(const w of BIO_STREET_WALLS){const a=w.a,b=w.b,d=BIO_STREET_GARDEN.wallWidth/2,s0=(w.v0-BIO_STREET_GARDEN.v0)/2,s1=(w.v1-BIO_STREET_GARDEN.v0)/2;
      brick.quad(at(a,w.base0,d),at(a,w.top0,d),at(b,w.top1,d),at(b,w.base1,d),'#a99b89',[[s0,w.base0/2],[s0,w.top0/2],[s1,w.top1/2],[s1,w.base1/2]]);
      brick.quad(at(b,w.base1,-d),at(b,w.top1,-d),at(a,w.top0,-d),at(a,w.base0,-d),'#928a74',[[s1,w.base1/2],[s1,w.top1/2],[s0,w.top0/2],[s0,w.base0/2]]);
      cap.quad(at(a,w.top0+.025,-d-.02),at(b,w.top1+.025,-d-.02),at(b,w.top1+.025,d+.02),at(a,w.top0+.025,d+.02),'#b7b6a2');
      for(const side of [-1,1])cap.quad(at(a,w.top0-.035,side*(d+.02)),at(b,w.top1-.035,side*(d+.02)),at(b,w.top1+.025,side*(d+.02)),at(a,w.top0+.025,side*(d+.02)),'#a6ab98');
      addCollider({points:w.points,base:0,bottom:Math.min(w.base0,w.base1),top:Math.max(w.top0,w.top1)+.025});
    }
    const cover=BIO_STREET_PLANTS.filter(p=>p.kind!=='strap'),cores=new THREE.InstancedMesh(new THREE.SphereGeometry(1,8,5),style('#ffffff',{map:surfaceTexture('grass'),roughness:.98}),cover.length*2),leaves=new THREE.InstancedMesh(new THREE.PlaneGeometry(1,1),style('#ffffff',{map:foliageTexture('fig'),alphaTest:.4,side:THREE.DoubleSide,roughness:.95}),cover.length*14),dummy=new THREE.Object3D(),color=new THREE.Color();
    let ci=0,li=0;for(const plant of BIO_STREET_PLANTS){const random=rng(plant.seed),root=bioStreetWalkingHeight(plant.x,plant.z)??demHeight(plant.x,plant.z);
      if(plant.kind!=='strap'){
        for(let i=0;i<2;i++){dummy.position.set(plant.x+(random()-.5)*.2*plant.size,root+.13*plant.size,plant.z+(random()-.5)*.2*plant.size);dummy.rotation.set(0,random()*TAU,0);dummy.scale.set(.34*plant.size,.15*plant.size,.36*plant.size);dummy.updateMatrix();cores.setMatrixAt(ci,dummy.matrix);cores.setColorAt(ci++,color.set(i?'#657e4b':'#597240'));}
        for(let i=0;i<14;i++){const a=random()*TAU,r=Math.sqrt(random())*.36*plant.size;dummy.position.set(plant.x+Math.cos(a)*r,root+.10+random()*.20*plant.size,plant.z+Math.sin(a)*r);dummy.rotation.set(random()*Math.PI,random()*TAU,random()*Math.PI);dummy.scale.setScalar((.28+random()*.15)*plant.size);dummy.updateMatrix();leaves.setMatrixAt(li,dummy.matrix);leaves.setColorAt(li++,color.set(['#627a48','#778b50','#607c43'][i%3]));}
      }else{
        for(let i=0;i<16;i++){const a=i/16*TAU+random()*.2,l=plant.size*(.58+random()*.22),h=plant.size*(.52+random()*.22),dx=Math.cos(a),dz=Math.sin(a),centres=[[0,0],[.12,h*.45],[l*.45,h],[l*.79,h*.74],[l,h*.3]],widths=[.003,.023,.029,.017,0],point=(j,side)=>[plant.x+dx*centres[j][0]-dz*widths[j]*side,root+centres[j][1],plant.z+dz*centres[j][0]+dx*widths[j]*side];for(let j=1;j<centres.length;j++)straps.quad(point(j-1,-1),point(j,-1),point(j,1),point(j-1,1),['#7a9050','#a5ac61','#607c43','#899e56'][i%4]);}
      }
    }
    for(const mesh of [cores,leaves]){mesh.receiveShadow=true;mesh.computeBoundingSphere();world.add(mesh);}
    const mulch=canvasTexture(256,256,ctx=>{const random=rng(2019);ctx.fillStyle='#b5aa8c';ctx.fillRect(0,0,256,256);for(let i=0;i<6500;i++){ctx.fillStyle=i%2?'#534d3e60':'#ded0ab5e';ctx.fillRect(random()*256,random()*256,1+random()*5,.5+random()*1.5);}});mulch.wrapS=mulch.wrapT=THREE.RepeatWrapping;
    world.add(soil.mesh(style('#ffffff',{vertexColors:true,map:mulch,roughness:.99}),false),brick.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('brick'),roughness:.92,side:THREE.DoubleSide})),cap.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),roughness:.9,side:THREE.DoubleSide})),straps.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.95})));
  }

  function mathewsTheatre(b,concrete,glass,detail,roofs){
    const g=mathewsTheatreGeometry(b),f=g.frame,formed=new Batch(),panes=new Batch(),lights=new Batch();
    for(const batch of [formed,panes,lights])batch.base=b.base;
    for(const face of mathewsTheatreFacades(b)){
      const p=face.point,panel=(batch,l,r,lo,hi,color,offset=0)=>batch.quad(p(l,lo,offset),p(l,hi,offset),p(r,hi,offset),p(r,lo,offset),color,[[l*face.length/2,lo/2],[l*face.length/2,hi/2],[r*face.length/2,hi/2],[r*face.length/2,lo/2]]);
      for(const c of face.masonry)panel(formed,c.left,c.right,c.bottom,c.top,'#b8b8ad');
      // A blue-grey plinth and narrow formwork joints continue around the
      // retained slab. Every glazed opening is actually cut from this wall.
      for(const c of face.masonry){
        if(c.bottom<.45)panel(detail,c.left,c.right,c.bottom,Math.min(.45,c.top),'#536d7c',.018);
        for(let t=Math.ceil(c.left*face.length/2.6)*2.6/face.length;t<c.right;t+=2.6/face.length)if(t>c.left+1e-5)panel(detail,t,Math.min(t+.012/face.length,c.right),c.bottom,c.top,'#91978e',.008);
      }
      if(face.mode!=='end'){
        const low=face.floor+2.98,high=face.floor+3.42;
        panel(formed,0,1,low,high,'#c4c5b8',.72);
        formed.quad(p(0,low,-.01),p(1,low,-.01),p(1,low,.72),p(0,low,.72),'#d0d0c3');
        formed.quad(p(0,high,-.01),p(0,high,.72),p(1,high,.72),p(1,high,-.01),'#c3c6bb');
        for(let d=1.3;d<face.length;d+=2.6){
          const t=d/face.length,y=low-.025,centre=p(t,y,.38),rim=.14;
          for(let j=0;j<16;j++){const a=j/16*TAU,c=(j+1)/16*TAU;lights.triangle(centre,[centre[0]+Math.cos(c)*rim,y,centre[2]+Math.sin(c)*rim],[centre[0]+Math.cos(a)*rim,y,centre[2]+Math.sin(a)*rim],'#e3e0cd');}
        }
      }
      for(const h of face.holes){
        const dep=-h.recess,fw=.055/face.length,span=h.right-h.left,doors=h.id.includes('doors')||h.id==='lower-food-court';
        panel(panes,h.left,h.right,h.bottom,h.top,'#748b86',dep);
        for(const t of [h.left,h.right])formed.quad(p(t,h.bottom,.005),p(t,h.top,.005),p(t,h.top,dep),p(t,h.bottom,dep),'#a5aaa0');
        for(const y of [h.bottom,h.top])formed.quad(p(h.left,y,.005),p(h.left,y,dep),p(h.right,y,dep),p(h.right,y,.005),'#bfc1b5');
        for(const t of [h.left,h.right-fw])panel(detail,t,t+fw,h.bottom,h.top,'#d5ded7',dep+.035);
        for(const y of [h.bottom,h.top-.055])panel(detail,h.left,h.right,y,y+.055,'#d5ded7',dep+.035);
        const bays=doors?Math.max(2,Math.round(span*face.length/1.2)):Math.max(1,Math.round(span*face.length/1.7));
        for(let i=1;i<bays;i++){const t=h.left+span*i/bays;panel(detail,t-fw/2,t+fw/2,h.bottom,h.top,'#d4ddd6',dep+.035);}
        for(const y of doors?[h.bottom+.95,h.bottom+1.8]:[h.bottom+1.1])panel(detail,h.left,h.right,y,y+.04,'#d2dcd5',dep+.045);
        if(doors){
          const centre=(h.left+h.right)/2;
          for(const side of [-1,1]){const t=centre+side*.12/face.length;batchBeam(detail,p(t,h.bottom+1.0,dep+.09),p(t,h.bottom+1.42,dep+.09),.018,'#a6b6ad');}
          // Thick white portal legs and sign band sit in front of the reveal.
          for(const t of [h.left,h.right])panel(detail,t-.12/face.length,t+.12/face.length,h.bottom,h.top+.4,'#dedfd7',.07);
          panel(detail,h.left-.12/face.length,h.right+.12/face.length,h.top,h.top+.42,'#dedfd7',.07);
          if(h.id!=='lower-food-court'){
            const width=Math.min(span*face.length*.9,4.6),texture=canvasTexture(1536,160,ctx=>{ctx.clearRect(0,0,1536,160);ctx.fillStyle='#36443c';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='500 110px serif';ctx.fillText('Mathews Theatres'+(face.mode==='east'?'  A B C D':''),768,80,1480);}),sign=new THREE.Mesh(new THREE.PlaneGeometry(width,.32),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false})),q=p((h.left+h.right)/2,h.top+.21,.80);sign.position.set(q[0],b.base+q[1],q[2]);sign.rotation.y=Math.atan2(face.nx,face.nz);world.add(sign);
          }
        }
      }
      panel(detail,0,1,b.height-.22,b.height,'#bdc2b5',.12);
    }
    const board=canvasTexture(256,256,ctx=>{const random=rng(23023);ctx.fillStyle='#f2f1ec';ctx.fillRect(0,0,256,256);for(let x=0;x<256;x+=12){ctx.fillStyle=x%24?'#a8a99e0b':'#fffffb09';ctx.fillRect(x,0,11,256);ctx.fillStyle='#858b7c13';ctx.fillRect(x,0,1,256);}for(let i=0;i<1600;i++){ctx.fillStyle=i%2?'#717c6b09':'#ffffff0c';ctx.fillRect(random()*256,random()*256,.5+random()*1.5,1+random()*7);}});board.wrapS=board.wrapT=THREE.RepeatWrapping;board.anisotropy=8;
    world.add(formed.mesh(style('#ffffff',{vertexColors:true,map:board,roughness:.95,side:THREE.DoubleSide})),lights.mesh(style('#ffffff',{vertexColors:true,emissive:'#e2d7aa',emissiveIntensity:.25,side:THREE.DoubleSide}),false));
    const windows=panes.mesh(style('#ffffff',{vertexColors:true,roughness:.08,metalness:.72,envMapIntensity:1.05}));world.add(windows);medicalReflection(windows,framePoint(f,f.width/2+1,3),b.base+3);
    const apron=new Batch();apron.base=0;
    for(const part of mathewsTheatreAprons(b)){
      for(const tri of part.triangles)apron.triangle(...tri.map(i=>{const p=part.vertices[i];return [p.x,p.y,p.z];}),'#b7b5a8');
      groundPatches.push({...part,priority:true,heightAt:part.heightAt});
    }
    world.add(apron.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),roughness:.94,side:THREE.DoubleSide})));
    polygon(roofs,b.points,b.height,'#939e97');
    addCollider({points:b.points,top:b.height,base:b.base});
  }

  function mathewsPavilions(b){
    const g=mathewsPavilionsGeometry(b),f=g.frame,roof=new Batch(),soffit=new Batch(),metal=new Batch(),glass=new Batch(),frost=new Batch(),skylights=new Batch(),paving=new Batch(),stone=new Batch(),wood=new Batch(),plants=new Batch();
    for(const batch of [roof,soffit,metal,glass,frost,skylights,paving,stone,wood,plants])batch.base=0;
    const at=(u,v,y)=>{const p=g.at(u,v);return [p.x,y,p.z];},angle=Math.atan2(-f.u.z,f.u.x),box=(batch,u,v,y,w,h,d,color,turn=0)=>{const p=g.at(u,v);batch.box(p.x,y,p.z,w,h,d,color,angle+turn);};
    for(const part of MATHEWS_PAVILION_STRIPS){
      const mid=part.points.reduce((s,p)=>({x:s.x+p.x/part.points.length,z:s.z+p.z/part.points.length}),{x:0,z:0}),m=g.local(mid),cross=part.kind==='north'?m.v+16.15:part.kind==='south'?m.v-20.6:part.kind==='west'?m.u+15.3:part.kind==='east'?m.u-17.8:100,sky=Math.abs(cross)<.67;
      const height=p=>g.roofAt(part.kind,p);
      shapedRoof(sky?skylights:roof,part.points,height,sky?'#b5ced0':'#c9cec2',part.holes);
      if(!sky)shapedRoof(soffit,part.points,p=>height(p)-.15,'#e0e1d5',part.holes,true);
    }
    // Fascias preserve the chamfered source edges; the curved roof is clipped
    // into narrow strips rather than interpolating a flat full-footprint cap.
    for(const part of MATHEWS_PAVILION_ROOFS){
      const rings=[part.points,...part.holes||[]];
      for(const points of rings)for(let i=0;i<points.length;i++){
        const a=points[i],c=points[(i+1)%points.length],len=distance2(a,c);
        for(let d=0;d<len;d+=.5){const t=d/len,u=Math.min(1,(d+.5)/len),p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t},q={x:a.x+(c.x-a.x)*u,z:a.z+(c.z-a.z)*u},ya=g.roofAt(part.kind,p),yb=g.roofAt(part.kind,q);soffit.quad([p.x,ya-.17,p.z],[p.x,ya,p.z],[q.x,yb,q.z],[q.x,yb-.17,q.z],'#c2cabc');}
      }
      const minimum=Math.min(...part.points.map(p=>g.roofAt(part.kind,p)))-.18,maximum=Math.max(...part.points.map(p=>g.roofAt(part.kind,p)),g.peakRL);
      if(part.kind==='link')addCollider({...part,base:0,terrainBottom:3.55,terrainOffset:3.8});else addCollider({...part,base:0,bottom:minimum,top:maximum});
    }
    // Thin transverse ribs, flashing and framed ridge lights follow the arch.
    for(const part of MATHEWS_PAVILION_ROOFS){
      const uAxis=['west','east'].includes(part.kind),samples=part.kind==='north'?[-22,-15,-8,-1,6,13,20]:part.kind==='south'?[-12,-5,2,9,16]:[-5,1,7,13];
      if(part.kind==='link')continue;
      for(const axis of samples)for(let cross=-29;cross<29;cross+=.6){const p=g.at(uAxis?cross:axis,uAxis?axis:cross),q=g.at(uAxis?cross+.6:axis,uAxis?axis:cross+.6);if(!inPolygon(p.x,p.z,part.points)||(part.holes||[]).some(h=>inPolygon(p.x,p.z,h))||!inPolygon(q.x,q.z,part.points)||(part.holes||[]).some(h=>inPolygon(q.x,q.z,h)))continue;batchBeam(metal,[p.x,g.roofAt(part.kind,p)+.015,p.z],[q.x,g.roofAt(part.kind,q)+.015,q.z],.018,'#a4afa1');}
    }
    for(const p of g.columns){
      const low=terrainHeight(p.x,p.z)+.22,top=g.roofAt(p.kind,p)-.22,joint=Math.min(top-.5,g.eaveRL-.3),along={x:f.u.x*p.du+f.v.x*p.dv,z:f.u.z*p.du+f.v.z*p.dv},side=along;
      metal.box(p.x,low+.045,p.z,.36,.09,.36,'#44574b',angle);
      for(const d of [-.08,.08])batchBeam(metal,[p.x+side.x*d,low,p.z+side.z*d],[p.x+side.x*d,joint,p.z+side.z*d],.047,'#374c43');
      for(const d of [-1,1]){let end={x:p.x+along.x*d*2.3,z:p.z+along.z*d*2.3};if(!inPolygon(end.x,end.z,b.points)||(b.holes||[]).some(h=>inPolygon(end.x,end.z,h)))end={x:p.x+along.x*d*1.0,z:p.z+along.z*d*1.0};batchBeam(metal,[p.x,joint-.1,p.z],[end.x,g.roofAt(p.kind,end)-.19,end.z],.075,'#3d5147');}
      addCollider({x:p.x,z:p.z,radius:p.radius,base:0,bottom:low,top});
    }
    for(const room of MATHEWS_PAVILION_ROOMS){
      const points=polygonArea(room.points)>0?room.points:[...room.points].reverse();
      for(let i=0;i<points.length;i++){
        const a=points[i],c=points[(i+1)%points.length],len=distance2(a,c);if(len<.1)continue;const n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},p=(d,y,off=0)=>[a.x+(c.x-a.x)*d+n.x*off,y,a.z+(c.z-a.z)*d+n.z*off];
        for(let d=0;d<len;d+=.6){const t=d/len,u=Math.min(1,(d+.6)/len),aa=p(t,0),cc=p(u,0),ya=terrainHeight(aa[0],aa[2])+.22,yb=terrainHeight(cc[0],cc[2])+.22,ta=g.roofAt(room.kind,{x:aa[0],z:aa[2]})-.21,tb=g.roofAt(room.kind,{x:cc[0],z:cc[2]})-.21;
          stone.quad(p(t,ya),p(t,ya+.25),p(u,yb+.25),p(u,yb),'#b4bcaa');frost.quad(p(t,ya+.25),p(t,ya+1.2),p(u,yb+1.2),p(u,yb+.25),'#91aa92');glass.quad(p(t,ya+1.24),p(t,ta),p(u,tb),p(u,yb+1.24),'#75988c');
        }
        const count=Math.max(1,Math.round(len/1.45));
        for(let j=0;j<=count;j++){const t=j/count,q=p(t,0),lo=terrainHeight(q[0],q[2])+.22,hi=g.roofAt(room.kind,{x:q[0],z:q[2]})-.17;batchBeam(metal,p(t,lo,.025),p(t,hi,.025),.03,'#8f9f91');}
        for(const y of [.27,1.2,2.75])for(let d=0;d<len;d+=1){const t=d/len,u=Math.min(1,(d+1)/len),aa=p(t,0),cc=p(u,0),ya=terrainHeight(aa[0],aa[2])+.22+y,yb=terrainHeight(cc[0],cc[2])+.22+y;if(ya<g.roofAt(room.kind,{x:aa[0],z:aa[2]})-.2&&yb<g.roofAt(room.kind,{x:cc[0],z:cc[2]})-.2)batchBeam(metal,p(t,ya,.04),p(u,yb,.04),.025,'#a8b9a8');}
      }
      addCollider({...room,base:0,bottom:0,top:g.peakRL});
    }
    // Paving follows the regional terrain and excludes occupied neighbours.
    for(const p of MATHEWS_PAVILION_PAVING){shapedRoof(paving,p.points,q=>terrainHeight(q.x,q.z)+.22,'#c6c2ad',p.holes);groundPatches.push({...p,heightAt:(x,z)=>terrainHeight(x,z)+.22});}
    // A large tree and low pale planter organise the actual open courtyard.
    const ring=polygonArea(g.planter.points)>0?g.planter.points:[...g.planter.points].reverse();
    for(let i=0;i<ring.length;i++){const a=ring[i],c=ring[(i+1)%ring.length],ya=terrainHeight(a.x,a.z)+.22,yb=terrainHeight(c.x,c.z)+.22;stone.quad([a.x,ya,a.z],[a.x,ya+.52,a.z],[c.x,yb+.52,c.z],[c.x,yb,c.z],'#abb2a0');batchBeam(stone,[a.x,ya+.54,a.z],[c.x,yb+.54,c.z],.075,'#c6c9b4');}
    shapedRoof(wood,g.planter.points,p=>terrainHeight(p.x,p.z)+.62,'#7a735b');addCollider({...g.planter,base:0,terrainOffset:.78,top:.78});
    for(const p of g.benches){const y=terrainHeight(p.x,p.z)+.22,turn=p.along==='v'?Math.PI/2:0,col=p.lime?'#a8b653':'#74826b';
      box(metal,p.u,p.v,y+.42,p.length,.08,p.width,'#4a5d4c',turn);for(let z=-.26;z<=.27;z+=.11){const q=p.along==='v'?{u:p.u+z,v:p.v}:{u:p.u,v:p.v+z};box(wood,q.u,q.v,y+.49,p.length,.075,.08,col,turn);}
      for(let h=.65;h<1.07;h+=.11){const q=p.along==='v'?{u:p.u+.3,v:p.v}:{u:p.u,v:p.v+.3};box(wood,q.u,q.v,y+h,p.length,.075,.075,col,turn);}
      for(const d of [-1.15,1.15]){const q=p.along==='v'?g.at(p.u,p.v+d):g.at(p.u+d,p.v);metal.box(q.x,y+.22,q.z,.08,.44,.45,'#405843',angle+turn);}
      addCollider({points:p.along==='v'?g.rect(p.u-.36,p.u+.36,p.v-p.length/2,p.v+p.length/2):g.rect(p.u-p.length/2,p.u+p.length/2,p.v-.36,p.v+.36),base:0,bottom:y,top:y+1.12});
    }
    // Abstracted furniture behind the glazing uses the photographed tan chairs
    // / dark green booths. Closed rooms do not claim a public through-route.
    for(let u=-18;u<=18;u+=4.5){const q=g.at(u,-16.2),y=terrainHeight(q.x,q.z)+.25;box(stone,u,-16.2,y+.74,1.7,.055,1.05,'#d2ceba');for(const side of [-1,1]){box(wood,u,-16.2+side*.9,y+.45,1.1,.07,.48,'#b99b72');box(wood,u,-16.2+side*1.12,y+.74,1.1,.52,.06,'#b99b72');for(const d of [-.45,.45])box(metal,u+d,-16.2+side*.9,y+.22,.035,.44,.035,'#405245');}}
    const t=g.tree,y=terrainHeight(t.x,t.z)+.62,random=rng(2424),dummy=new THREE.Object3D(),leaves=new THREE.InstancedMesh(new THREE.PlaneGeometry(1.0,1.0),style('#ffffff',{map:foliageTexture(),alphaTest:.42,side:THREE.DoubleSide}),1400);
    const branch=(a,c,r0,r1)=>{const d=new THREE.Vector3(c[0]-a[0],c[1]-a[1],c[2]-a[2]),mesh=new THREE.Mesh(new THREE.CylinderGeometry(r1,r0,d.length(),10),style('#a2a48a',{map:surfaceTexture('bark')}));mesh.position.set((a[0]+c[0])/2,(a[1]+c[1])/2,(a[2]+c[2])/2);mesh.quaternion.setFromUnitVectors(UP,d.normalize());mesh.castShadow=mesh.receiveShadow=true;world.add(mesh);};
    branch([t.x,y,t.z],[t.x+.2,y+t.height*.37,t.z-.1],.49,.34);branch([t.x+.2,y+t.height*.37,t.z-.1],[t.x+.85,y+t.height*.72,t.z-.35],.34,.17);branch([t.x+.85,y+t.height*.72,t.z-.35],[t.x+.5,y+t.height*.94,t.z-.1],.17,.055);addCollider({x:t.x,z:t.z,radius:t.radius,base:0,bottom:y,top:y+t.height});
    for(let j=0;j<9;j++){const a=j*TAU/9,r=4.0+(j%3)*.7;branch([t.x+.15,y+t.height*(.36+j*.032),t.z],[t.x+Math.cos(a)*r,y+t.height*.8+(j%2)*1.1,t.z+Math.sin(a)*r],.15,.035);}
    for(let i=0;i<1400;i++){const a=random()*TAU,r=Math.sqrt(random())*7.7;dummy.position.set(t.x+Math.cos(a)*r,y+t.height*.84+(random()-.5)*4.6,t.z+Math.sin(a)*r);dummy.rotation.set(random()*Math.PI,random()*TAU,random()*Math.PI);dummy.scale.setScalar(.7+random());dummy.updateMatrix();leaves.setMatrixAt(i,dummy.matrix);leaves.setColorAt(i,new THREE.Color(['#68815c','#8c9e71','#798e64'][i%3]));}leaves.castShadow=leaves.receiveShadow=true;world.add(leaves);
    for(const p of g.pots){const low=terrainHeight(p.x,p.z)+.22,pot=new THREE.Mesh(new THREE.CylinderGeometry(.36,.26,.58,16),style('#c6cebb'));pot.position.set(p.x,low+.29,p.z);world.add(pot);addCollider({x:p.x,z:p.z,radius:p.radius,base:0,bottom:low,top:low+.6});for(let j=0;j<7;j++){const a=j*TAU/7,dx=Math.cos(a),dz=Math.sin(a),height=1.6+(j%3)*.35,tip=[p.x+dx*.65,low+.5+height,p.z+dz*.65];batchPipe(plants,[p.x,low+.5,p.z],tip,.014,'#7f9855');const edge=(t,side)=>{const w=.23*Math.sin(Math.PI*t);return [tip[0]+dx*.8*t-dz*w*side,tip[1]+.72*t-.1*t*t,tip[2]+dz*.8*t+dx*w*side];};for(let k=0;k<7;k++){const t=k/7,c=(k+1)/7;plants.quad(edge(t,-1),edge(t,1),edge(c,1),edge(c,-1),j%2?'#718e4f':'#839957');}batchPipe(plants,tip,edge(1,0),.006,'#a2b66b');}}
    // Explicit closed double doors below the photographed entrance nameplate.
    for(const v of [-17.6,-16.2,-14.8]){const p=g.at(23.06,v),lo=terrainHeight(p.x,p.z)+.25;batchBeam(metal,[p.x,lo,p.z],[p.x,lo+2.35,p.z],.04,'#98aa9a');}
    for(const v of [-16.4,-16]){const p=g.at(23.12,v),y=terrainHeight(p.x,p.z)+1.35;batchPipe(metal,[p.x,y-.16,p.z],[p.x,y+.16,p.z],.018,'#bccabc');}
    const tex=canvasTexture(768,160,(ctx,w,h)=>{ctx.fillStyle='#4d5d52';ctx.fillRect(0,0,w,h);ctx.fillStyle='#e3e7d9';ctx.font='500 100px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('Pavilions',w/2,h/2);}),sign=new THREE.Mesh(new THREE.PlaneGeometry(3,.62),new THREE.MeshBasicMaterial({map:tex})),sq=g.at(23.05,-16.2);sign.position.set(sq.x,terrainHeight(sq.x,sq.z)+2.8,sq.z);sign.rotation.y=Math.atan2(f.u.x,f.u.z);world.add(sign);
    const pavers=canvasTexture(768,768,(ctx,w,h)=>{const random=rng(2433);ctx.fillStyle='#a4a897';ctx.fillRect(0,0,w,h);for(let x=0;x<3;x++)for(let y=0;y<3;y++){const l=80+random()*7;ctx.fillStyle=`hsl(43 10% ${l}%)`;ctx.fillRect(x*256+2,y*256+2,252,252);}for(let j=0;j<18000;j++){ctx.fillStyle=j%2?'#565b4912':'#ffffff35';ctx.fillRect(random()*w,random()*h,1+random()*2,1+random()*2);}});pavers.wrapS=pavers.wrapT=THREE.RepeatWrapping;pavers.anisotropy=8;
    for(let j=0;j<paving.positions.length/3;j++){const p=g.local({x:paving.positions[j*3],z:paving.positions[j*3+2]});paving.uvs[j*2]=p.u/2;paving.uvs[j*2+1]=p.v/2;}
    world.add(paving.mesh(style('#ffffff',{vertexColors:true,map:pavers,roughness:.95})));
    const sky=skylights.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.48,depthWrite:false,side:THREE.DoubleSide,roughness:.22}));sky.castShadow=false;
    world.add(roof.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.8})),soffit.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),metal.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,metalness:.4,roughness:.45})),glass.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.30,depthWrite:false,side:THREE.DoubleSide,roughness:.17,metalness:.15})),frost.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),sky,stone.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.88})),wood.mesh(style('#ffffff',{vertexColors:true,roughness:.88})),plants.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
  }

  function libraryCoveredWalk(b){
    const g=libraryWalkGeometry(b),roof=new Batch(),soffit=new Batch(),glass=new Batch(),steel=new Batch(),floor=new Batch(),wood=new Batch();
    for(const batch of [roof,soffit,glass,steel,floor,wood])batch.base=0;
    const f=g.frame,angle=Math.atan2(-f.u.z,f.u.x),point=(u,v,y)=>{const p=g.at(u,v);return [p.x,y,p.z];},setUV=(batch,start,axis)=>{for(let j=start;j<batch.positions.length/3;j++){const p=g.local({x:batch.positions[j*3],z:batch.positions[j*3+2]});batch.uvs[j*2]=(axis==='u'?p.u:p.v)/1.6;batch.uvs[j*2+1]=(axis==='u'?p.v:p.u)/2;}};
    for(const cell of LIBRARY_WALK_CELLS){
      const material=cell.glazed?glass:roof,start=material.positions.length/3;
      // Small generated cells retain source edges and sample the real ground
      // without a large planar cap interpolating across the regional slope.
      const draw=(batch,offset,reverse=false)=>{const contour=cell.points.map(p=>new THREE.Vector2(p.x,p.z)),holes=cell.holes.map(r=>r.map(p=>new THREE.Vector2(p.x,p.z))),all=[...cell.points,...cell.holes.flat()];for(const tri of THREE.ShapeUtils.triangulateShape(contour,holes)){const ids=reverse?tri:[tri[0],tri[2],tri[1]];batch.triangle(...ids.map(i=>[all[i].x,g.roofAt(all[i])+offset,all[i].z]),cell.glazed?'#b3cbd0':'#d4d6c9');}};
      draw(material,0);if(!cell.glazed)draw(soffit,-.15,true);setUV(material,start,cell.axis);if(!cell.glazed)setUV(soffit,soffit.positions.length/3-(material.positions.length/3-start),cell.axis);
    }
    for(const part of LIBRARY_WALK_ROOFS){
      const ring=polygonArea(part.points)>0?part.points:[...part.points].reverse();
      for(let i=0;i<ring.length;i++){const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,mid={x:(a.x+c.x)/2+nx*.02,z:(a.z+c.z)/2+nz*.02};
        if(inPolygon(mid.x,mid.z,b.points)&&!inPolygon(mid.x,mid.z,g.library.canopy.points))continue;
        for(let d=0;d<len;d+=.6){const t=d/len,u=Math.min(1,(d+.6)/len),p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t},q={x:a.x+(c.x-a.x)*u,z:a.z+(c.z-a.z)*u},ya=g.roofAt(p),yb=g.roofAt(q);steel.quad([p.x,ya-.17,p.z],[p.x,ya+.025,p.z],[q.x,yb+.025,q.z],[q.x,yb-.17,q.z],'#a7b2a1');}
      }
      addCollider({...part,base:0,terrainBottom:3.05,terrainOffset:4.2});
    }
    // Fine frames cross each narrow glazed strip, with diagonal framing at
    // the two translucent crossing nodes visible in the public aerial view.
    for(const branch of g.branches){const from=branch.axis==='u'?branch.u0:branch.v0,to=branch.axis==='u'?branch.u1:branch.v1;
      for(let n=from+.25;n<to;n+=1.3){const a=g.at(branch.axis==='u'?n:branch.cross-.36,branch.axis==='u'?branch.cross-.36:n),c=g.at(branch.axis==='u'?n:branch.cross+.36,branch.axis==='u'?branch.cross+.36:n),mid={x:(a.x+c.x)/2,z:(a.z+c.z)/2};if(!inPolygon(mid.x,mid.z,b.points)||inPolygon(mid.x,mid.z,g.library.canopy.points))continue;batchBeam(steel,[a.x,g.roofAt(a)+.015,a.z],[c.x,g.roofAt(c)+.015,c.z],.024,'#78897d');}
    }
    for(const part of LIBRARY_WALK_ROOFS.filter(p=>p.junction)){const mid=part.points.reduce((s,p)=>({x:s.x+p.x/part.points.length,z:s.z+p.z/part.points.length}),{x:0,z:0}),j=g.junctions.reduce((a,c)=>distance2(g.at(a.u,a.v),mid)<distance2(g.at(c.u,c.v),mid)?a:c),centre=g.at(j.u,j.v);for(let i=0;i<part.points.length;i++){const p=part.points[i],q=part.points[(i+1)%part.points.length];batchBeam(steel,[p.x,g.roofAt(p)+.018,p.z],[centre.x,g.roofAt(centre)+.018,centre.z],.045,'#718375');batchBeam(steel,[p.x,g.roofAt(p)+.018,p.z],[q.x,g.roofAt(q)+.018,q.z],.035,'#718375');}}
    for(const col of g.columns){
      const low=terrainHeight(col.x,col.z)+.23,joint=terrainHeight(col.x,col.z)+2.55,along=col.axis==='u'?f.u:f.v,cross=col.axis==='u'?f.v:f.u;
      steel.box(col.x,low+.035,col.z,.38,.07,.38,'#534c3e',angle);
      for(const off of [-.085,.085])batchBeam(steel,[col.x+along.x*off,low,col.z+along.z*off],[col.x+along.x*off,joint,col.z+along.z*off],.047,'#514b3e');
      for(const side of [-1,1]){let p={x:col.x+cross.x*side*1.45,z:col.z+cross.z*side*1.45};if(!inPolygon(p.x,p.z,b.points)||inPolygon(p.x,p.z,g.library.canopy.points))p={x:col.x+cross.x*side*.4,z:col.z+cross.z*side*.4};batchBeam(steel,[col.x,joint-.12,col.z],[p.x,g.roofAt(p)-.16,p.z],.07,'#554e41');}
      addCollider({x:col.x,z:col.z,radius:.16,base:0,bottom:low,top:g.roofAt(col)});
    }
    for(const patch of LIBRARY_WALK_PAVING){shapedRoof(floor,patch.points,p=>terrainHeight(p.x,p.z)+.23,'#b8b2a5',patch.holes);groundPatches.push({...patch,heightAt:(x,z)=>terrainHeight(x,z)+.23});}
    for(const bench of g.benches){const y=terrainHeight(bench.x,bench.z)+.23,back=g.at(bench.u-.32,bench.v);
      for(let d=-.25;d<.3;d+=.12){const p=g.at(bench.u+d,bench.v);wood.box(p.x,y+.48,p.z,.095,.08,bench.length,'#8f7153',angle);}
      for(let h=.63;h<1.03;h+=.12)wood.box(back.x,y+h,back.z,.08,.08,bench.length,'#977958',angle);
      for(const v of [bench.v-1,bench.v+1]){const p=g.at(bench.u,v);steel.box(p.x,y+.23,p.z,.52,.46,.07,'#4b5344',angle);}
      addCollider({points:g.rect(bench.u-.38,bench.u+.38,bench.v-1.35,bench.v+1.35),base:0,bottom:y,top:y+1.1});
    }
    for(const lamp of g.lamps){const fixture=new THREE.Mesh(new THREE.CylinderGeometry(.14,.14,.035,12),style('#dedfd1',{emissive:'#ddd5ac',emissiveIntensity:.15}));fixture.position.set(lamp.x,g.roofAt(lamp)-.175,lamp.z);world.add(fixture);}
    const corrugation=canvasTexture(1024,128,(ctx,w,h)=>{ctx.fillStyle='#dddcd1';ctx.fillRect(0,0,w,h);for(let n=0;n<22;n++){const x=n*w/22;ctx.fillStyle='#8c948252';ctx.fillRect(x,0,3,h);ctx.fillStyle='#ffffffaa';ctx.fillRect(x+3,0,4,h);ctx.fillStyle='#a5ad9828';ctx.fillRect(x+7,0,10,h);}});corrugation.wrapS=corrugation.wrapT=THREE.RepeatWrapping;corrugation.anisotropy=8;
    const sky=glass.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.42,depthWrite:false,roughness:.2,side:THREE.DoubleSide}));sky.castShadow=false;
    world.add(roof.mesh(style('#ffffff',{vertexColors:true,map:corrugation,side:THREE.DoubleSide,roughness:.85})),soffit.mesh(style('#ffffff',{vertexColors:true,map:corrugation,side:THREE.DoubleSide,roughness:.9})),sky,steel.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,metalness:.35,roughness:.55})),floor.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving'),roughness:.94})),wood.mesh(style('#ffffff',{vertexColors:true,roughness:.9})));
  }

  function terrainCanopy(b){
    const roof=new Batch(),supports=new Batch();supports.base=0;
    polygon(roof,b.points,3.8,'#bcc5b8',b.holes||[]);
    const ring=polygonArea(b.points)<0?[...b.points].reverse():b.points,posts=[];
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length];wallPanel(roof,a,c,3.55,3.8,'#a0aea3');
      if(posts.some(p=>distance2(p,a)<8)||nearestPath(a.x,a.z).distance<.6)continue;
      posts.push(a);const base=terrainHeight(a.x,a.z),top=base+3.58;
      batchPipe(supports,[a.x,base,a.z],[a.x,top,a.z],.055,'#526962');addCollider({x:a.x,z:a.z,radius:.075,top:3.6,base});
    }
    world.add(roof.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),supports.mesh(style('#ffffff',{vertexColors:true,metalness:.4})));
    addCollider({points:b.points,holes:b.holes,base:0,terrainBottom:3.55,terrainOffset:3.8});
  }

  function facadeCaption(b,a,c,text,width,y,color){
    const len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
    const texture=canvasTexture(2048,128,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.fillStyle=color;ctx.textBaseline='middle';ctx.font='500 76px sans-serif';ctx.fillText(text,24,h/2,w-48);});
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(width,width/16),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}));
    sign.position.set((a.x+c.x)/2+nx*.8,b.base+y,(a.z+c.z)/2+nz*.8);sign.rotation.y=Math.atan2(nx,nz);world.add(sign);
  }

  function ainsworthBuilding(b){
    const g=ainsworthGeometry(b),f=g.frame,brick=new Batch(),concrete=new Batch(),metal=new Batch(),officeGlass=new Batch(),lowerGlass=new Batch(),northGlass=new Batch(),clay=new Batch(),roof=new Batch(),cover=new Batch(),floor=new Batch(),red=new Batch(),garden=new Batch(),lattice=new Batch(),angle=Math.atan2(-f.u.z,f.u.x);
    for(const batch of [brick,concrete,metal,officeGlass,lowerGlass,northGlass,clay,roof,cover,floor,red,garden,lattice])batch.base=0;
    const ordered=(points,hole=false)=>(polygonArea(points)>0)!==hole?points:[...points].reverse();
    const at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];};
    const box=(batch,u,v,y,w,h,d,color)=>{const p=framePoint(f,u,v);batch.box(p.x,y,p.z,w,h,d,color,angle);};
    for(const part of AINSWORTH_GROUND){
      if(part.kind==='arcade'){
        polygon(cover,part.points,g.soffitRL,'#d3d7c6',part.holes,true);
        groundPatches.push({points:part.points,heightAt:(x,z)=>g.floorAt({x,z})});continue;
      }
      // A simple floor behind the closed glazing keeps the outdoor terrain
      // from appearing as lawn inside the visible foyer / theatre envelope.
      shapedRoof(floor,part.points,g.floorAt,'#a5ad9b',part.holes);
      const glazingBatch=part.kind==='north'?northGlass:lowerGlass;
      for(const raw of [part.points,...part.holes]){const ring=ordered(raw,raw!==part.points);for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.15)continue;
        const la=g.local(a),lc=g.local(c),p=(t,y,off=0)=>{const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;return [a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];};
        const lower=g.base-.25;
        if(part.kind==='south'&&Math.abs(lc.v-la.v)>15){
          const t0=(-5.6-la.v)/(lc.v-la.v),t1=(25.3-la.v)/(lc.v-la.v),l=Math.max(0,Math.min(t0,t1)),r=Math.min(1,Math.max(t0,t1));
          if(l>0)wallPanel(brick,a,c,lower,g.soffitRL,'#a88966',0,0,l);if(r<1)wallPanel(brick,a,c,lower,g.soffitRL,'#a88966',0,r,1);
          if(r>l)wallPanel(glazingBatch,a,c,lower,g.soffitRL,'#a7c0b1',.055,l,r);
        }else wallPanel(glazingBatch,a,c,lower,g.soffitRL,'#729487',.055);
        for(let d=.15;d<len;d+=2.0)batchBeam(metal,p(d/len,lower,.09),p(d/len,g.soffitRL,.09),.07,'#465e58');
        for(const y of [36.6,40.35])wallPanel(metal,a,c,y,y+.1,'#50665b',.11);
      }}
      addCollider({points:part.points,holes:part.holes,base:0,bottom:g.base-1,top:g.soffitRL});
    }
    addCollider({points:b.points,holes:b.holes,base:0,bottom:g.soffitRL,top:g.bodyRoofRL});
    const palette=['#bd8966','#c7956e','#d2ab82','#af7857','#d9b98a','#c48e67','#b97e5b','#cfaa7f'];
    for(const part of AINSWORTH_UPPER){
      const ring=ordered(part.points);
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.15)continue;
        const la=g.local(a),lc=g.local(c),du=lc.u-la.u,dv=lc.v-la.v,n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len};
        const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
        const north=part.kind==='north'&&n.x*f.v.x+n.z*f.v.z<-.7,screen=part.kind==='south'&&Math.abs(dv)>20;
        wallPanel(brick,a,c,g.soffitRL,g.bodyRoofRL,part.kind==='north'?'#b3946b':'#a48664');
        if(screen){
          const tv=v=>(v-la.v)/dv,l=Math.max(0,Math.min(tv(-5.6),tv(25.3))),r=Math.min(1,Math.max(tv(-5.6),tv(25.3)));
          if(r>l){
            wallPanel(officeGlass,a,c,g.screenBottomRL,g.bodyRoofRL-.2,'#3f5b55',.04,l,r);
            const count=Math.max(1,Math.round((r-l)*len/1.4));
            for(const [floor,row] of g.rows.entries()){
              wallPanel(metal,a,c,row.low-.16,row.low-.035,'#a5afa2',1.06,l,r);
              for(let k=0;k<count;k++){
                const t0=l+(r-l)*(k+.025)/count,t1=l+(r-l)*(k+.82)/count,t2=l+(r-l)*(k+.88)/count,tiles=Math.ceil((row.high-row.low)/.2);
                for(let j=0;j<tiles;j++){
                  const low=row.low+j*(row.high-row.low)/tiles,high=row.low+(j+1)*(row.high-row.low)/tiles-.012,color=palette[(j+floor*2+(k%3===0?1:0))%palette.length];
                  clay.quad(p(t0,low,.22),p(t0,high,.22),p(t1,high,.92),p(t1,low,.92),color);
                  clay.quad(p(t1,low,.92),p(t1,high,.92),p(t2,high,.22),p(t2,low,.22),color);
                }
                batchBeam(metal,p(t2,row.low,.24),p(t2,row.high,.24),.035,'#687b70');
              }
            }
          }
        }else{
          const bays=north?g.northBays:Array.from({length:Math.max(1,Math.round(len/5.8))},(_,k)=>({l:(k+.12)/Math.max(1,Math.round(len/5.8)),r:(k+.88)/Math.max(1,Math.round(len/5.8))}));
          for(const bay of bays){
            let l=bay.l,r=bay.r;
            if(north){const left=Math.max(Math.min(la.u,lc.u),bay.left),right=Math.min(Math.max(la.u,lc.u),bay.right);if(right-left<.15)continue;const t0=(left-la.u)/du,t1=(right-la.u)/du;l=Math.min(t0,t1);r=Math.max(t0,t1);}
            for(const row of g.rows){
              wallPanel(concrete,a,c,row.low,row.low+.95,'#7e8c7b',.045,l,r);
              for(let y=row.low+.12;y<row.low+.95;y+=.16)wallPanel(metal,a,c,y,y+.014,'#a2ad98',.06,l,r);
              wallPanel(officeGlass,a,c,row.low+1.0,row.high-.1,'#4e6d68',.07,l,r);
              wallPanel(metal,a,c,row.low+.94,row.low+1.0,'#c5d0bd',.15,l,r);wallPanel(metal,a,c,row.high-.1,row.high,'#c7d1bf',.15,l,r);
              for(let k=0;k<=4;k++){const t=l+(r-l)*k/4;batchBeam(metal,p(t,row.low,.15),p(t,row.high,.15),.065,'#c9d2c0');}
              wallPanel(metal,a,c,row.low+1.75,row.low+1.8,'#c8d2bf',.15,l,r);
            }
          }
          if(north){
            const tu=u=>(u-la.u)/du,l=Math.max(0,Math.min(tu(1),tu(7))),r=Math.min(1,Math.max(tu(1),tu(7)));
            if(r>l){
              wallPanel(concrete,a,c,g.screenBottomRL,g.bodyRoofRL-.25,'#697a6d',.05,l,r);
              lattice.quad(p(l,g.screenBottomRL,.18),p(l,g.bodyRoofRL-.25,.18),p(r,g.bodyRoofRL-.25,.18),p(r,g.screenBottomRL,.18),'#ffffff',[[0,0],[0,(g.bodyRoofRL-.25-g.screenBottomRL)/.24],[(r-l)*len/.24,(g.bodyRoofRL-.25-g.screenBottomRL)/.24],[(r-l)*len/.24,0]]);
              for(const row of g.rows)wallPanel(concrete,a,c,row.low,row.low+.1,'#d0d6c4',.2,l,r);
              for(const t of [l,r])batchBeam(concrete,p(t,g.screenBottomRL,.18),p(t,g.bodyRoofRL,.18),.2,'#d4dac9');
            }
          }
        }
      }
    }
    for(const part of AINSWORTH_ROOFS){
      polygon(roof,part.points,part.rl,'#8f9b89',part.holes);
      if(['plant','lift'].includes(part.kind)){
        const ring=ordered(part.points);for(let i=0;i<ring.length;i++){
          const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(metal,a,c,g.bodyRoofRL,part.rl,'#737f75');
          for(let y=g.bodyRoofRL+.15;y<part.rl;y+=.22)wallPanel(metal,a,c,y,y+.045,'#a5b0a0',.045);
          for(let d=.4;d<len;d+=1.5)wallPanel(metal,a,c,g.bodyRoofRL,part.rl,'#b6c0ac',.075,d/len,Math.min(1,(d+.035)/len));
        }
        addCollider({points:part.points,holes:part.holes,base:0,bottom:g.bodyRoofRL,top:part.rl});
      }
    }
    // The old north wing retains its gently scalloped / raked white cornice.
    for(let i=0;i<28;i++){
      const u0=-22+i*44/28,u1=-22+(i+1)*44/28,va=-30.15+Math.abs(Math.sin(i*Math.PI/2))*.28,vb=-30.15+Math.abs(Math.sin((i+1)*Math.PI/2))*.28;
      cover.quad(at(u0,-28.9,g.bodyRoofRL),at(u0,va,g.bodyRoofRL+.08),at(u1,vb,g.bodyRoofRL+.08),at(u1,-28.9,g.bodyRoofRL),'#dbe0cb');
      cover.quad(at(u0,va,g.bodyRoofRL-.17),at(u0,va,g.bodyRoofRL+.08),at(u1,vb,g.bodyRoofRL+.08),at(u1,vb,g.bodyRoofRL-.17),'#d0d8c2');
    }
    for(const part of AINSWORTH_CANOPY){shapedRoof(cover,part.points,g.canopy.heightAt,'#d5dcc7',part.holes);shapedRoof(cover,part.points,p=>g.canopy.heightAt(p)-.22,'#c8d3bb',part.holes);addCollider({points:part.points,holes:part.holes,base:0,bottom:g.soffitRL,top:41.02});}
    for(const part of AINSWORTH_PAVING)shapedRoof(floor,part.points,g.floorAt,'#a1a692',part.holes);
    groundPatches.push({points:g.canopy.points,heightAt:(x,z)=>g.floorAt({x,z})});
    for(const col of g.columns){const ground=terrainHeight(col.x,col.z);batchPipe(concrete,[col.x,ground,col.z],[col.x,g.soffitRL,col.z],col.radius,'#d6ddc9');addCollider({x:col.x,z:col.z,radius:col.radius,base:0,bottom:ground,top:g.soffitRL});}
    const theatre=Array.from({length:64},(_,i)=>({x:g.theatre.center.x+Math.cos(i*TAU/64)*g.theatre.radius,z:g.theatre.center.z+Math.sin(i*TAU/64)*g.theatre.radius}));
    for(let i=0;i<theatre.length;i++)wallPanel(red,theatre[i],theatre[(i+1)%theatre.length],g.theatre.bottomRL,g.theatre.topRL,i%8===0?'#bb3829':'#d53b2b');polygon(red,theatre,g.theatre.topRL,'#d95236');
    for(const bed of g.beds){shapedRoof(garden,bed.points,p=>terrainHeight(p.x,p.z)+.08,'#74684e');const local=bed.points.map(g.local),minV=Math.min(...local.map(p=>p.v)),maxV=Math.max(...local.map(p=>p.v));for(let v=minV+.3;v<maxV;v+=.65){const p=framePoint(f,1.17,v),y=terrainHeight(p.x,p.z);garden.box(p.x,y+.27,p.z,.4,.4,.45,'#6f8954',v);}}
    const tex=canvasTexture(1024,512,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.fillStyle='#e4e4d7';ctx.textAlign='center';ctx.font='normal 155px Georgia';ctx.fillText('Ainsworth',w/2,235);ctx.font='52px sans-serif';ctx.fillText('BUILDING',w/2,330);});
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(2.7,1.35),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false})),sp=framePoint(f,1.65,-6.5);sign.position.set(sp.x,37.8,sp.z);sign.rotation.y=Math.atan2(-f.u.x,-f.u.z);world.add(sign);
    const holes=canvasTexture(128,128,ctx=>{ctx.fillStyle='#d5dbcd';ctx.fillRect(0,0,128,128);ctx.globalCompositeOperation='destination-out';for(const [x,y]of [[42,42],[86,42],[42,86],[86,86]]){ctx.beginPath();ctx.moveTo(x,y-13);ctx.lineTo(x+11,y);ctx.lineTo(x,y+13);ctx.lineTo(x-11,y);ctx.closePath();ctx.fill();}});holes.wrapS=holes.wrapT=THREE.RepeatWrapping;
    const brickTex=clinkerTexture(),concreteTex=surfaceTexture('concrete');brickTex.wrapS=brickTex.wrapT=THREE.RepeatWrapping;brickTex.anisotropy=8;
    world.add(brick.mesh(style('#ffffff',{vertexColors:true,map:brickTex,bumpMap:brickTex,bumpScale:.025})),concrete.mesh(style('#ffffff',{vertexColors:true,map:concreteTex,bumpMap:concreteTex,bumpScale:.02})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.25})),clay.mesh(style('#ffffff',{vertexColors:true})),officeGlass.mesh(style('#ffffff',{vertexColors:true,roughness:.18,metalness:.45})),roof.mesh(style('#ffffff',{vertexColors:true})),cover.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),floor.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})),red.mesh(style('#ffffff',{vertexColors:true,roughness:.45})),garden.mesh(style('#ffffff',{vertexColors:true})),lattice.mesh(style('#ffffff',{vertexColors:true,map:holes,alphaTest:.5,side:THREE.DoubleSide})));
    const glazing=lowerGlass.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.28,depthWrite:false,side:THREE.DoubleSide,roughness:.06,metalness:.28,envMapIntensity:.65}));world.add(glazing);medicalReflection(glazing,framePoint(f,-2,8),37.2);
    const northGlazing=northGlass.mesh(style('#ffffff',{vertexColors:true,roughness:.055,metalness:.75,envMapIntensity:1.1}));world.add(northGlazing);medicalReflection(northGlazing,framePoint(f,4,-33),37.2);
  }

  function mathewsBuilding(b,concrete,glass,detail,roofs){
    const g=mathewsGeometry(b),f=g.frame,soffit=new Batch(),entryGlass=new Batch(),garden=new Batch(),fronds=new Batch(),floor=new Batch(),angle=Math.atan2(-f.u.z,f.u.x);
    soffit.base=entryGlass.base=b.base;garden.base=fronds.base=floor.base=0;
    const ordered=(points,hole=false)=>(polygonArea(points)>0)!==hole?points:[...points].reverse();
    const at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];};
    const box=(batch,u,v,y,w,h,d,color)=>{const p=framePoint(f,u,v);batch.box(p.x,y,p.z,w,h,d,color,angle);};
    // Only the photographed entrance recess opens the retained lower outline.
    for(const part of MATHEWS_LOWER){
      if(part.kind==='ground')for(const raw of [part.points,...part.holes]){const ring=ordered(raw,raw!==part.points);for(let i=0;i<ring.length;i++)wallPanel(concrete,ring[i],ring[(i+1)%ring.length],0,g.entry.ceiling,'#647775');}
      else{
        polygon(soffit,part.points,g.entry.ceiling,'#3d4940',part.holes,true);
        groundPatches.push({points:part.points,heightAt:(x,z)=>g.entryFloor({x,z})});
      }
      addCollider({points:part.points,holes:part.holes,base:b.base,bottom:part.bottom,top:g.entry.ceiling});
    }
    addCollider({points:b.points,holes:b.holes,base:b.base,bottom:g.entry.ceiling,top:g.podiumHeight});
    for(const part of MATHEWS_ENTRY_FLOOR)shapedRoof(floor,part.points,g.entryFloor,'#9ca08a',part.holes);
    groundPatches.push({points:g.entryApron,heightAt:(x,z)=>g.entryFloor({x,z})});
    for(const {a,c} of MATHEWS_PODIUM_FACES){
      const len=distance2(a,c);if(len<.2)continue;
      const la=g.local(a),lc=g.local(c),mid={u:(la.u+lc.u)/2,v:(la.v+lc.v)/2},n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len};
      const p=(d,y,off=0)=>[a.x+(c.x-a.x)*d/len+n.x*off,y,a.z+(c.z-a.z)*d/len+n.z*off];
      wallPanel(concrete,a,c,g.entry.ceiling,g.podiumHeight,'#a9b0a0');
      if(len<1.3)continue;
      // Fine horizontal courses and deep blue-grey structural piers follow
      // the public Library Walk photograph; they are not generic glazing bands.
      for(let y=g.entry.ceiling+.12;y<g.podiumHeight;y+=.16)wallPanel(detail,a,c,y,y+.012,'#919e90',.024);
      const bays=Math.max(1,Math.round(len/7.1)),pitch=len/bays;
      for(let k=0;k<bays;k++){
        const l=(k*pitch+.55)/len,r=((k+1)*pitch-.55)/len;
        for(const row of g.podiumRows){
          wallPanel(glass,a,c,row.low,row.high,'#4d6561',.075,l,r);
          wallPanel(detail,a,c,row.high,row.high+.18,'#6e7d72',.18,l,r);
          for(let j=0;j<=6;j++){const d=(k*pitch+.55)+(pitch-1.1)*j/6;batchBeam(detail,p(d,row.low,.12),p(d,row.high,.12),.065,'#758478');}
          wallPanel(detail,a,c,row.low+.8,row.low+.85,'#87998a',.14,l,r);
        }
        const d=k*pitch,foot=p(d,0,.33),low=inPolygon(foot[0],foot[2],g.entry.points)?g.entry.ceiling:.1;
        // A source vertex falls at the entrance centre. The upper structural
        // pier stops at its soffit instead of growing through the open recess.
        batchBeam(detail,p(d,low,.33),p(d,g.podiumHeight,.18),.52,'#718681');
        addCollider({x:foot[0],z:foot[2],radius:.27,base:b.base,bottom:low,top:g.podiumHeight});
        if(mid.v>23&&len>20){
          wallPanel(detail,a,c,1.8,5.1,k%3?'#5d6c60':'#3c524b',.045,Math.max(0,l+.015),Math.min(1,r-.015));
          if(k%3)for(let y=1.9;y<5.1;y+=.17)wallPanel(detail,a,c,y,y+.035,'#84917d',.08,Math.max(0,l+.015),Math.min(1,r-.015));
        }
      }
      wallPanel(detail,a,c,g.podiumHeight-.2,g.podiumHeight,'#c4cbb6',.18);
    }
    // A distinct, narrow, set-back tower replaces the former tall L-shaped slab.
    for(const part of MATHEWS_TOWER){
      const ring=ordered(part.points);
      addCollider({points:part.points,holes:part.holes,base:b.base,bottom:g.podiumHeight,top:g.tower.top});
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
        const la=g.local(a),lc=g.local(c),n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
        wallPanel(concrete,a,c,0,g.tower.top,'#c3b494',.035);
        for(let y=3.5;y<g.tower.top;y+=3.35)wallPanel(detail,a,c,y,y+.025,'#abac94',.075);
        if(Math.abs(lc.u-la.u)>4){
          const minU=Math.min(la.u,lc.u),maxU=Math.max(la.u,lc.u),tu=u=>(u-la.u)/(lc.u-la.u);
          for(const bay of g.towerBays){
            const left=Math.max(minU,bay.left),right=Math.min(maxU,bay.right);if(right-left<.1)continue;
            const l=Math.min(tu(left),tu(right)),r=Math.max(tu(left),tu(right));
            for(const [j,row] of g.towerRows.entries()){
              wallPanel(glass,a,c,row.low,row.high,j%3===0?'#4b5d50':'#3e5149',.105,l,r);
              wallPanel(detail,a,c,row.low-.12,row.low,'#9b9e83',.45,l,r);
              wallPanel(detail,a,c,row.high,row.high+.1,'#a9ad92',.45,l,r);
              for(let u=left+.8;u<right;u+=1.1)batchBeam(detail,p(tu(u),row.low,.14),p(tu(u),row.high,.14),.045,'#829181');
            }
            for(const u of [bay.left-.3,bay.right+.3])if(u>=minU-.01&&u<=maxU+.01)batchBeam(detail,p(tu(u),3.4,.35),p(tu(u),g.tower.top,.35),.48,'#d0c5a6');
          }
        }else if(len>8){
          for(const row of g.towerRows){wallPanel(glass,a,c,row.low,row.high,'#40564b',.105,.33,.67);wallPanel(detail,a,c,row.low-.1,row.low,'#a3a58c',.3,.33,.67);}
          for(const t of [.3,.7])batchBeam(detail,p(t,0,.15),p(t,g.tower.top,.15),.08,'#a6ac94');
        }
        wallPanel(detail,a,c,g.tower.top-.2,g.tower.top,'#c4bea1',.18);
      }
    }
    for(const part of MATHEWS_ROOFS){
      polygon(roofs,part.points,part.height,part.kind==='teaching-podium'?'#8c9688':'#8d9485',part.holes);
      if(part.kind==='plant'){
        const ring=ordered(part.points);for(let i=0;i<ring.length;i++){
          const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(concrete,a,c,g.tower.top,part.height,'#b5b39b');
          for(let d=2;d<len;d+=3.2)wallPanel(detail,a,c,g.tower.top,part.height,'#9b9f89',.035,d/len,(d+.03)/len);
        }
        addCollider({points:part.points,holes:part.holes,base:b.base,bottom:g.tower.top,top:part.height});
      }
    }
    // Set-back glass, turquoise infill, dark soffit and lights at the western entry.
    const e0=framePoint(f,-36.5,.95),e1=framePoint(f,-36.5,-5.55),ground=g.entryFloor(framePoint(f,-37,-2.3))-b.base;
    wallPanel(entryGlass,e0,e1,ground,g.entry.ceiling-.12,'#466b62',.07);
    wallPanel(detail,e0,e1,ground+.12,g.entry.ceiling-.2,'#4d9290',.12,0,.45);
    for(const v of [-5.3,-3.7,-2.1,-.5,.8])box(detail,-36.67,v,(ground+g.entry.ceiling)/2,.075,g.entry.ceiling-ground,.065,'#566d5d');
    box(detail,-38.55,-2.3,g.entry.ceiling+.1,.3,.35,7.9,'#7d8b78');
    for(const post of g.entry.posts){const bottom=terrainHeight(post.x,post.z)-b.base,top=bottom+3.55;box(detail,post.u,post.v,(bottom+top)/2,.14,top-bottom,.2,'#91a58a');addCollider({x:post.x,z:post.z,radius:.1,base:b.base,top});}
    for(const v of [-4.8,-2.3,.2]){const p=framePoint(f,-37.7,v),ring=Array.from({length:16},(_,i)=>({x:p.x+Math.cos(i*TAU/16)*.15,z:p.z+Math.sin(i*TAU/16)*.15}));polygon(soffit,ring,g.entry.ceiling-.015,'#ebe8c9',[],true);}
    facadeCaption(b,framePoint(f,-38.9,-5.4),framePoint(f,-38.9,-6.2),'Mathews · F23',1.0,ground+2.3,'#e2ddbd');
    // Cordyline / palm forms and stone-edged planted beds from the south photo.
    for(const bed of g.planters){
      const ring=ordered(bed.points);shapedRoof(garden,ring,p=>terrainHeight(p.x,p.z)+bed.height,'#7d855e');
      for(let i=0;i<ring.length;i++){const a=ring[i],c=ring[(i+1)%ring.length],ha=terrainHeight(a.x,a.z),hc=terrainHeight(c.x,c.z);garden.quad([a.x,ha,a.z],[a.x,ha+bed.height,a.z],[c.x,hc+bed.height,c.z],[c.x,hc,c.z],'#9e9c7d');}
      addCollider({points:bed.points,base:0,top:bed.height,terrainOffset:bed.height});
    }
    for(const tree of g.palms){
      const bottom=terrainHeight(tree.x,tree.z)+.58,top=bottom+tree.height;
      batchPipe(garden,[tree.x,bottom,tree.z],[tree.x+.08,top,tree.z],.15,'#918970');
      for(let j=0;j<20;j++){
        const a=j*TAU/20,reach=j%3===0?1.4:2.0,level=top+(j%3)*.18,co=Math.cos(a),si=Math.sin(a),cross={x:-si*.18,z:co*.18};
        const root=[tree.x,level,tree.z],mid=[tree.x+co*reach*.55,level+.38,tree.z+si*reach*.55],tip=[tree.x+co*reach,level-.8,tree.z+si*reach];
        fronds.quad(root,[mid[0]+cross.x,mid[1],mid[2]+cross.z],tip,[mid[0]-cross.x,mid[1],mid[2]-cross.z],j%2?'#65834d':'#8d9b60');
      }
      addCollider({x:tree.x,z:tree.z,radius:.2,base:0,bottom,top});
    }
    world.add(soffit.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),floor.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})),garden.mesh(style('#ffffff',{vertexColors:true})),fronds.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    const glazing=entryGlass.mesh(style('#ffffff',{vertexColors:true,roughness:.055,metalness:.7,envMapIntensity:1.25}));world.add(glazing);medicalReflection(glazing,framePoint(f,-41,-2.3),g.base+3.2);
  }

  function libraryBuilding(b,concrete,brick,glass,detail,roofs){
    const g=libraryGeometry(b),f=g.frame,metal=new Batch(),cover=new Batch(),entryGlass=new Batch(),angle=Math.atan2(-f.u.z,f.u.x);
    metal.base=cover.base=entryGlass.base=b.base;
    const at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];};
    const box=(batch,u,v,y,w,h,d,color)=>{const p=framePoint(f,u,v);batch.box(p.x,y,p.z,w,h,d,color,angle);};
    const ordered=points=>polygonArea(points)>0?points:[...points].reverse();
    // Exact mapped outlines are used for roofs and collision. The former
    // single tall parent collider incorrectly extended above the low wings.
    polygon(roofs,b.points,5.6,'#96998c',b.holes||[]);
    const plinth=ordered(b.points);
    for(let i=0;i<plinth.length;i++)wallPanel(concrete,plinth[i],plinth[(i+1)%plinth.length],0,5.6,'#a4a99b');
    addCollider({points:b.points,holes:b.holes||[],base:b.base,top:5.6});
    for(const part of g.parts){
      const tower=part.id===g.tower.id,height=part.height,ring=ordered(libraryFacadeRing(part.points));
      polygon(roofs,part.points,height,tower?'#777c75':'#92998a');
      addCollider({points:part.points,base:b.base,top:height});
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
        const la=g.local(a),lc=g.local(c),mid={u:(la.u+lc.u)/2,v:(la.v+lc.v)/2},n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len};
        const point=(d,y,offset=0)=>[a.x+(c.x-a.x)*d/len+n.x*offset,y,a.z+(c.z-a.z)*d/len+n.z*offset];
        const beam=(d,low,high,size,color,offset=.4)=>batchBeam(detail,point(d,low,offset),point(d,high,offset),size,color);
        wallPanel(tower?concrete:brick,a,c,0,height,tower?'#b8b7a9':'#85775f');
        if(tower){
          const west=mid.u<-12&&Math.abs(lc.v-la.v)>5;
          if(west){
            // The Scientia face is mostly blank concrete, with one deep slot.
            for(let y=3;y<g.fasciaBottom;y+=4.16)wallPanel(detail,a,c,y,y+.025,'#92988b',.025);
            for(let d=4;d<len;d+=5.8)beam(d,0,g.fasciaBottom,.035,'#979e90',.045);
            if(Math.min(la.v,lc.v)<-1&&Math.max(la.v,lc.v)>-1){
              const t=(-1-la.v)/(lc.v-la.v),start=Math.max(0,t-1.65/len),end=Math.min(1,t+1.65/len);
              for(const row of g.slotRows){
                wallPanel(glass,a,c,row.low,row.high,'#344946',.075,start,end);
                wallPanel(detail,a,c,row.low-.18,row.low,'#868e80',.5,start,end);
              }
              beam(t*len-1.95,.4,g.fasciaBottom,.35,'#c0c0b0');beam(t*len+1.95,.4,g.fasciaBottom,.35,'#c0c0b0');
            }
          }else if(len>25){
            const start=mid.v<-10?1.0:2.0,end=len-(mid.v<-10?7.0:1.0),count=4,pitch=(end-start)/count;
            for(let k=0;k<count;k++){
              const d0=start+k*pitch+.35,d1=start+(k+1)*pitch-.35;
              for(const [j,row] of g.northRows.entries()){
                wallPanel(glass,a,c,row.low,row.high,j%3===0?'#40564f':'#4e5f53',.065,d0/len,d1/len);
                wallPanel(detail,a,c,row.low-.25,row.low,'#929984',.5,d0/len,d1/len);
                wallPanel(detail,a,c,row.high,row.high+.24,'#a7ae98',.52,d0/len,d1/len);
                beam((d0+d1)/2,row.low,row.high,.055,'#9ba99a',.12);
              }
              beam(start+k*pitch,16,g.fasciaBottom,.65,'#c1c2ad',.48);
            }
            beam(end,16,g.fasciaBottom,.65,'#c1c2ad',.48);
          }
          wallPanel(metal,a,c,g.fasciaBottom,height,'#424b47',.14);
          for(let d=.12;d<len;d+=.26)beam(d,g.fasciaBottom,height,.055,'#7c8578',.25);
          wallPanel(detail,a,c,height-.13,height,'#a9ae9b',.24);
        }else{
          const rows=height>14?[[3.3,6.6],[8.2,11.3],[12.4,15.3]]:height>8?[[1.0,3.4],[5.0,7.4],[9.1,11.3]]:[[.5,3.25]];
          if(len>4)for(const [low,high] of rows){
            wallPanel(glass,a,c,low,high,'#3c5650',.06,.018,.982);
            wallPanel(detail,a,c,high,Math.min(height,high+.3),'#c9d0b7',.4);
            for(let d=.3;d<len;d+=1.7)beam(d,low,high,.07,'#a3b6a6',.13);
          }
          if(height>14)for(let d=0;d<len;d+=8.0)beam(d,.1,height,.46,'#b6c1a5',.31);
          wallPanel(detail,a,c,height-.26,height,'#c6ccb3',.48);
        }
      }
    }
    for(const annex of g.annexes){
      const base=buildingBase(annex.points),offset=base-b.base,ring=ordered(annex.points);
      polygon(roofs,annex.points,offset+annex.height,'#a0a797');
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length];wallPanel(brick,a,c,offset,offset+annex.height,'#8c8065');
        wallPanel(detail,a,c,offset+annex.height-.2,offset+annex.height,'#c1c8b1',.1);
        if(g.local(a).v<-51&&g.local(c).v<-51)wallPanel(metal,a,c,offset+.2,offset+2.8,'#46584c',.04,.32,.68);
      }
      addCollider({points:annex.points,base,top:annex.height});
    }
    // The main canopy flares in both plan and elevation. No photo is used
    // as a texture, and its dimensions are deliberately labelled estimates.
    shapedRoof(cover,g.canopy.points,p=>g.canopy.heightAt(p),'#d3d9c7');
    shapedRoof(cover,g.canopy.points,p=>g.canopy.heightAt(p)-g.canopy.thickness,'#e0e3d4');
    const cr=ordered(g.canopy.points);
    for(let i=0;i<cr.length;i++){
      const a=cr[i],c=cr[(i+1)%cr.length],len=distance2(a,c);for(let d=0;d<len;d+=.65){const t=d/len,u=Math.min(1,(d+.65)/len),p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t},q={x:a.x+(c.x-a.x)*u,z:a.z+(c.z-a.z)*u};cover.quad([p.x,g.canopy.heightAt(p)-.26,p.z],[p.x,g.canopy.heightAt(p),p.z],[q.x,g.canopy.heightAt(q),q.z],[q.x,g.canopy.heightAt(q)-.26,q.z],'#c8d0be');}
    }
    for(const col of g.columns){
      const ground=terrainHeight(col.x,col.z)-b.base;
      box(brick,col.u,col.v,(ground+col.top)/2,1.05,col.top-ground,1.65,'#8c7e65');
      addCollider({points:col.points,base:b.base,top:col.top});
      for(const du of [-1.3,1.3])batchBeam(metal,at(col.u,col.v,col.top-.3),at(col.u+du,-55,g.canopy.heightAt(framePoint(f,col.u+du,-55))-.3),.12,'#45564e');
    }
    addCollider({points:g.canopy.points,base:b.base,bottom:g.canopy.low-g.canopy.thickness,top:g.canopy.high});
    // Low white Scientia portal follows the existing ground-floor wall.
    box(detail,g.portal.u,g.portal.v,g.portal.top,.6,.35,6.7,'#d9ddcf');
    const doorA=framePoint(f,-18.65,1.65),doorC=framePoint(f,-18.65,-4.15);
    wallPanel(entryGlass,doorA,doorC,.65,3.92,'#46655c',.12);
    for(const v of [-3.7,-1.8,.1,1.5])box(detail,-18.91,v,2.3,.12,3.1,.07,'#b7c4b4');
    for(const post of g.portal.posts){box(detail,post.u,post.v,2.3,.5,3.6,.35,'#d9ddcf');addCollider({points:post.points,base:b.base,top:4.1});}
    // A wide entrance fascia and door frames, behind the northern canopy.
    box(detail,5.5,-48.95,6.9,15.4,.7,.4,'#d8dccb');
    for(let u=-1;u<=12;u+=2.15)box(detail,u,-49,4.75,.11,3.45,.16,'#d1d9c9');
    facadeCaption(b,framePoint(f,-2,-49),framePoint(f,13,-49),'University Library',12.8,6.9,'#354840');
    const logo=(a,c)=>{
      const len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
      const tex=canvasTexture(1024,256,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.fillStyle='#e6e9db';ctx.font='500 180px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('UNSW',w/2,h/2);});
      const sign=new THREE.Mesh(new THREE.PlaneGeometry(25,4.3),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}));
      sign.position.set((a.x+c.x)/2+nx*.32,b.base+55.55,(a.z+c.z)/2+nz*.32);sign.rotation.y=Math.atan2(nx,nz);world.add(sign);
    };
    logo(framePoint(f,-16.1,-13.1),framePoint(f,20,-12.8));
    logo(framePoint(f,-17.35,20.4),framePoint(f,-16.5,-12.95));
    world.add(metal.mesh(style('#ffffff',{vertexColors:true,metalness:.3})),cover.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    const glazing=entryGlass.mesh(style('#ffffff',{vertexColors:true,roughness:.055,metalness:.7,envMapIntensity:1.25}));world.add(glazing);medicalReflection(glazing,framePoint(f,-25,3),b.base+3);
  }

  function tyreeBuilding(b,concrete,clay,glass,detail,roofs){
    glass=new Batch();clay=new Batch();glass.base=clay.base=b.base;
    const portal=new Batch();portal.base=0;
    const g=tyreeGeometry(b),f=g.frame,metal=new Batch(),roof=new Batch(),soffit=new Batch(),floor=new Batch(),stone=new Batch(),garden=new Batch(),angle=Math.atan2(-f.u.z,f.u.x);
    for(const batch of [metal,roof,soffit,floor,stone,garden])batch.base=0;
    const at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];},box=(batch,u,v,y,w,h,d,color)=>{const p=framePoint(f,u,v);batch.box(p.x,y,p.z,w,h,d,color,angle);};
    const ringOf=(raw,hole=false)=>(polygonArea(raw)>0)!==hole?raw:[...raw].reverse();
    // Lower ground is partitioned around the retained western footway and
    // reconstructed Anzac-side recess. The upper building remains occupied.
    for(const part of TYREE_PARTS){
      if(part.kind==='ground')for(const raw of [part.points,...part.holes]){const ring=ringOf(raw,raw!==part.points);for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len};
        wallPanel(glass,a,c,g.report.groundRL-b.base,g.report.level1RL-b.base,'#4e6964');
        wallPanel(concrete,a,c,0,g.report.groundRL-b.base,'#87978a');
        for(let d=.1;d<len;d+=1.5){const t=d/len;batchBeam(detail,[a.x+(c.x-a.x)*t+n.x*.04,g.report.groundRL-b.base,a.z+(c.z-a.z)*t+n.z*.04],[a.x+(c.x-a.x)*t+n.x*.04,g.report.level1RL-b.base,a.z+(c.z-a.z)*t+n.z*.04],.04,'#8fa897');}
      }}
      if(part.kind!=='ground'){
        polygon(soffit,part.points,g.passageCeilingRL,'#b0baaa',part.holes,true);
        shapedRoof(floor,part.points,p=>g.passageFloor(p)+.005,'#a3a594',part.holes);
        groundPatches.push({points:part.points,heightAt:(x,z)=>g.passageFloor({x,z})});
      }
      addCollider({points:part.points,holes:part.holes,base:0,bottom:part.minRL,top:g.report.level1RL});
    }
    addCollider({points:b.points,holes:b.holes,base:0,bottom:g.report.level1RL,top:g.report.pvRL});
    const ring=ringOf(b.points);
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),la=g.local(a),lc=g.local(c),mid={u:(la.u+lc.u)/2,v:(la.v+lc.v)/2},n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},north=n.x*f.v.x+n.z*f.v.z<-.8&&mid.v<-25,east=n.x*f.u.x+n.z*f.u.z>.7&&mid.u>35;
      const p=(t,rl,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,rl-b.base,a.z+(c.z-a.z)*t+n.z*off];
      const segs=Math.max(1,Math.ceil(len/.6));
      for(let j=0;j<segs;j++){
        const l=j/segs,r=(j+1)/segs,pa={x:a.x+(c.x-a.x)*l,z:a.z+(c.z-a.z)*l},pc={x:a.x+(c.x-a.x)*r,z:a.z+(c.z-a.z)*r},ha=g.roofRL(pa),hc=g.roofRL(pc);
        (north?glass:clay).quad(p(l,g.report.level1RL),p(l,ha),p(r,hc),p(r,g.report.level1RL),north?'#5f7f77':'#b1815e');
        soffit.quad([pa.x,ha-.23,pa.z],[pa.x,ha,pa.z],[pc.x,hc,pc.z],[pc.x,hc-.23,pc.z],'#dce0ce');
      }
      if(north){
        const minU=Math.min(la.u,lc.u),maxU=Math.max(la.u,lc.u),left=Math.max(-45,minU),right=Math.min(12,maxU);
        // Horizontal ceramic baguettes have real depth and separate supports.
        if(right>left)for(let y=32.9;y<44.2;y+=.53)for(let u=Math.floor(left/1.25)*1.25;u<right;u+=1.25){
          const u0=Math.max(left,u+.025),u1=Math.min(right,u+1.225);if(u1<=u0)continue;const ts=[(u0-la.u)/(lc.u-la.u),(u1-la.u)/(lc.u-la.u)].sort((a,b)=>a-b),l=ts[0],r=ts[1];
          clay.quad(p(l,y,.68),p(l,y+.15,.56),p(r,y+.15,.56),p(r,y,.68),'#b18a63');
          clay.quad(p(l,y+.15,.56),p(l,y+.20,.20),p(r,y+.20,.20),p(r,y+.15,.56),'#c09b74');
          clay.quad(p(l,y,.20),p(l,y,.68),p(r,y,.68),p(r,y,.20),'#8e6b47');
        }
        for(let u=Math.ceil(minU/1.5)*1.5;u<maxU;u+=1.5){const t=(u-la.u)/(lc.u-la.u),h=g.roofRL({x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t});batchBeam(detail,p(t,g.report.groundRL,.08),p(t,h-.1,.08),.045,'#91a89b');}
        for(const y of [28.2,32.7,37.2,41.7,46.2])if(y<Math.min(g.roofRL(a),g.roofRL(c)))wallPanel(detail,a,c,y-b.base,y-b.base+.045,'#8fa99b',.08);
      }else{
        const height=Math.min(g.roofRL(a),g.roofRL(c)),glazedSouth=east&&mid.v>5;
        if(east){
          const low=glazedSouth?32.7:41.7,high=Math.min(height,glazedSouth?47.3:50.7);
          if(high>low)wallPanel(glass,a,c,low-b.base,high-b.base,'#5d7c75',.035);
          for(let d=.2;d<len;d+=1.45){const t=d/len;batchBeam(detail,p(t,low,.09),p(t,high,.09),.045,'#9eafa1');}
          for(let y=low;y<high;y+=4.5)wallPanel(detail,a,c,y-b.base,y-b.base+.07,'#a9b7a6',.10);
        }
        // Panel courses, narrow inset glazing and deep ceramic blades retain
        // the mapped angular western / southern folds.
        for(let y=32.7;y<height;y+=4.5)wallPanel(detail,a,c,y-b.base,y-b.base+.03,'#8e735a',.04);
        for(let y=32.9;y<Math.min(height,41.7);y+=.24)wallPanel(detail,a,c,y-b.base,y-b.base+.008,'#aa8867',.041);
        for(let d=.75;d<len;d+=1.2){const t=d/len;batchBeam(detail,p(t,32.7,.05),p(t,Math.min(height,50.7),.05),.014,'#977b60');}
        if(len>7)for(const centre of [.28,.66]){
          const lo=Math.max(0,centre-1.5/len),hi=Math.min(1,centre+1.5/len),top=Math.min(height-.25,50.7);
          wallPanel(glass,a,c,32.7-b.base,top-b.base,'#354f4c',.065,lo,hi);
          for(let d=lo*len;d<hi*len;d+=.64){const t=d/len;batchBeam(detail,p(t,32.7,.09),p(t,top,.09),.04,'#b2bdae');
            clay.quad(p(t,32.7,.12),p(t,top,.12),p(t+.13/len,top,.95),p(t+.13/len,32.7,.95),'#b88b65');
            clay.quad(p(t+.13/len,32.7,.95),p(t+.13/len,top,.95),p(t+.20/len,top,.12),p(t+.20/len,32.7,.12),'#9e7957');
          }
        }
      }
    }
    for(const part of TYREE_ROOFS)shapedRoof(roof,part.points,p=>part.kind==='pv'?part.rl:g.roofRL(p),'#bbc3ad',part.holes);
    shapedRoof(roof,g.canopy.points,g.roofRL,'#d5dbc7');shapedRoof(soffit,g.canopy.points,p=>g.roofRL(p)-.23,'#e3e4d1');
    for(const part of TYREE_APRON)shapedRoof(floor,part.points,g.apron.heightAt,'#a5a594',part.holes);
    groundPatches.push({points:g.apron.points,heightAt:(x,z)=>g.apron.heightAt({x,z})});
    for(const part of TYREE_PLATFORM){polygon(stone,part.points,part.rl,'#9c9f91',part.holes);groundPatches.push({points:part.points,heightAt:()=>part.rl+.01});addCollider({points:part.points,holes:part.holes,base:0,top:part.rl,stepHeight:.27});}
    for(const step of TYREE_STEPS){polygon(stone,step.points,step.rl,'#a6aa9a',step.holes);const ring=ringOf(step.points);for(let i=0;i<ring.length;i++)wallPanel(stone,ring[i],ring[(i+1)%ring.length],step.rl-.23,step.rl,'#8d9688');groundPatches.push({points:step.points,heightAt:()=>step.rl+.01});addCollider({points:step.points,holes:step.holes,base:0,top:step.rl,stepHeight:.27});}
    // Pale tactile / paving strips continue across the raised terrace.
    for(let u=-32;u<42;u+=1.1)batchBeam(stone,at(u,-33.4,28.215),at(u,-27.8,28.215),.035,'#c6c7b5');
    for(const col of g.columns){batchPipe(metal,[col.x,28.2,col.z],[col.x,g.roofRL(col)-.2,col.z],col.radius,'#adb9ab');addCollider({x:col.x,z:col.z,radius:col.radius,base:0,bottom:28.2,top:g.roofRL(col)});}
    for(const col of g.westColumns){const bottom=g.passageFloor(col);batchPipe(metal,[col.x,bottom,col.z],[col.x,32.7,col.z],col.radius,'#a3afa0');addCollider({x:col.x,z:col.z,radius:col.radius,base:0,bottom,top:32.7});}
    for(const u of [-16,16])for(const s of [-.85,.85]){const start=framePoint(f,u+s,-36.1),end=framePoint(f,u+s,-33.4),low=terrainHeight(start.x,start.z)+1.1;batchPipe(metal,[start.x,low,start.z],[end.x,29.12,end.z],.027,'#c6d0bd');for(const [p,y]of [[start,low],[end,29.12]])batchPipe(metal,[p.x,y-.85,p.z],[p.x,y,p.z],.023,'#bdc8b5');}
    // A dark stone portal marks the glazed Mall entry; dimensions are estimated.
    for(const u of [15.8,20.2])box(portal,u,-28.15,30.55,.30,4.7,1.45,'#4e4840');box(portal,18,-28.15,32.75,4.7,.3,1.45,'#4e4840');
    portal.quad(at(15.95,-28.87,28.2),at(15.95,-28.87,32.6),at(16.8,-27.43,31.2),at(16.8,-27.43,28.2),'#4f4941');
    portal.quad(at(19.2,-27.43,28.2),at(19.2,-27.43,31.2),at(20.05,-28.87,32.6),at(20.05,-28.87,28.2),'#4f4941');
    portal.quad(at(15.95,-28.87,32.6),at(20.05,-28.87,32.6),at(19.2,-27.43,31.2),at(16.8,-27.43,31.2),'#5b554a');
    for(const plant of g.plants){
      const ring=ringOf(plant.points);for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(metal,a,c,plant.bottom,plant.top,'#aab6a5');
        for(let y=plant.bottom+.15;y<plant.top;y+=.23)wallPanel(metal,a,c,y,y+.035,'#718577',.035);
        for(let d=.5;d<len;d+=1.0)wallPanel(metal,a,c,plant.bottom,plant.top,'#c0c9b6',.065,d/len,(d+.035)/len);
      }polygon(roof,plant.points,plant.top,'#b1bca7');
    }
    // Illustrative photovoltaic modules on the documented plant / PV level.
    for(let u=-14;u<=28;u+=3.4)for(const v of [11,15]){
      const points=frameRectangle(f,2.9,2.1,u,v);if(!points.every(p=>inPolygon(p.x,p.z,b.points))||g.plants.some(p=>points.some(q=>inPolygon(q.x,q.z,p.points))))continue;
      shapedRoof(roof,points,p=>50.95+(g.local(p).v-v+1.05)*.18,'#324d59');
      for(let k=0;k<4;k++)batchBeam(metal,at(u-1.42+k*.94,v-1,50.97),at(u-1.42+k*.94,v+1,51.33),.018,'#a5b8b2');
    }
    for(const u of [15.8,20.2])addCollider({points:frameRectangle(f,.3,1.45,u,-28.15),base:0,bottom:28.2,top:32.9});
    for(const table of g.tables){
      box(garden,table.u,table.v,28.94,1.15,.07,.65,'#cbd2c1');for(const u of [table.u-.45,table.u+.45])box(garden,u,table.v,28.55,.055,.7,.5,'#a2b4a7');
      for(const v of [table.v-.7,table.v+.7])for(const u of [table.u-.35,table.u+.35]){box(garden,u,v,28.67,.42,.06,.40,'#d3d8c7');box(garden,u,v+.18,28.94,.42,.5,.045,'#cbd2c0');for(const du of [-.15,.15])for(const dv of [-.13,.13])box(garden,u+du,v+dv,28.43,.035,.43,.035,'#a1b1a2');}
      addCollider({points:frameRectangle(f,1.7,2.3,table.u,table.v),base:0,bottom:28.2,top:29.2});
    }
    facadeCaption(b,framePoint(f,20.3,-27.7),framePoint(f,16.2,-27.7),'Tyree Energy Technologies',3.8,33.25-b.base,'#d5dbc9');
    const glazing=glass.mesh(style('#ffffff',{vertexColors:true,roughness:.045,metalness:.75,envMapIntensity:1.25}));world.add(glazing,clay.mesh(style('#ffffff',{vertexColors:true,roughness:.85})),portal.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('aggregate'),bumpMap:surfaceTexture('aggregate'),bumpScale:.025})));medicalReflection(glazing,framePoint(f,18,-32),36.2);
    world.add(metal.mesh(style('#ffffff',{vertexColors:true,metalness:.35})),roof.mesh(style('#ffffff',{vertexColors:true})),soffit.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),floor.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})),stone.mesh(style('#ffffff',{vertexColors:true})),garden.mesh(style('#ffffff',{vertexColors:true})));
  }

  function blockhouseBuilding(b,concrete,brick,glass,detail,roofs){
    const g=blockhouseGeometry(b),f=g.frame,metal=new Batch(),soffits=new Batch(),paving=new Batch(),garden=new Batch(),angle=Math.atan2(-f.u.z,f.u.x);
    metal.base=soffits.base=b.base;
    const at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];},box=(batch,u,v,y,w,h,d,color)=>{const p=framePoint(f,u,v);batch.box(p.x,y,p.z,w,h,d,color,angle);};
    const ordered=(raw,hole=false)=>(polygonArea(raw)>0)!==hole?raw:[...raw].reverse();
    for(const part of BLOCKHOUSE_PARTS){
      if(part.kind==='ground')for(const raw of [part.points,...part.holes]){const ring=ordered(raw,raw!==part.points);for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2}),shop=len>4&&(mid.v>5.5||(mid.v<-4&&mid.u>3)),n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len};
        wallPanel(shop?glass:brick,a,c,0,3.8,shop?'#455e58':'#857054');
        if(shop){
          for(let d=.15;d<len;d+=1.3){const t=d/len;batchBeam(detail,[a.x+(c.x-a.x)*t+n.x*.06,.1,a.z+(c.z-a.z)*t+n.z*.06],[a.x+(c.x-a.x)*t+n.x*.06,3.4,a.z+(c.z-a.z)*t+n.z*.06],.055,'#bcc8b5');}
          for(const y of [.14,.8,2.85,3.4])wallPanel(detail,a,c,y,y+.045,'#bbc8b4',.065);
        }
      }}
      if(part.minHeight)polygon(soffits,part.points,part.minHeight,'#c6c9b7',part.holes,true);
      addCollider({points:part.points,holes:part.holes,base:b.base,bottom:part.minHeight,top:3.8});
    }
    addCollider({points:b.points,holes:b.holes,base:b.base,bottom:3.8,top:g.roof});
    const ring=ordered(b.points),faces=[],cb=g.core.bounds;
    // Split original façade edges at the reconstructed core. Its concrete
    // shell replaces these spans instead of competing with brick / fascia.
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],la=g.local(a),lc=g.local(c),cuts=[0,1];
      if(Math.max(la.u,lc.u)<cb.u0||Math.min(la.u,lc.u)>cb.u1||Math.max(la.v,lc.v)<cb.v0||Math.min(la.v,lc.v)>cb.v1){faces.push({a,c});continue;}
      for(const [key,value] of [['u',cb.u0],['u',cb.u1],['v',cb.v0],['v',cb.v1]])if(Math.abs(lc[key]-la[key])>1e-8){const t=(value-la[key])/(lc[key]-la[key]);if(t>0&&t<1)cuts.push(t);}
      cuts.sort((a,b)=>a-b);
      for(let j=0;j<cuts.length-1;j++){
        const l=cuts[j],r=cuts[j+1],t=(l+r)/2,u=la.u+(lc.u-la.u)*t,v=la.v+(lc.v-la.v)*t;
        if(r-l<1e-8||u>cb.u0-1e-7&&u<cb.u1+1e-7&&v>cb.v0-1e-7&&v<cb.v1+1e-7)continue;
        faces.push({a:{x:a.x+(c.x-a.x)*l,z:a.z+(c.z-a.z)*l},c:{x:a.x+(c.x-a.x)*r,z:a.z+(c.z-a.z)*r}});
      }
    }
    for(let i=0;i<faces.length;i++){
      const {a,c}=faces[i],len=distance2(a,c),la=g.local(a),lc=g.local(c),mid={u:(la.u+lc.u)/2,v:(la.v+lc.v)/2},n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},long=Math.abs(lc.u-la.u)>4;
      const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
      wallPanel(brick,a,c,3.8,g.roof,'#857054');
      if(long){
        const count=Math.max(1,Math.round(len/3.4));
        for(const row of g.rows)for(let j=0;j<count;j++){
          const t=(j+.5)/count,u=la.u+(lc.u-la.u)*t;if(Math.abs(u)>32.5||mid.v<-7)continue;
          const l=t-.32/len,r=t+.32/len;
          wallPanel(glass,a,c,row.low,row.high,'#435b57',.025,l,r);
          for(const q of [l,r])batchBeam(detail,p(q,row.low,.07),p(q,row.high,.07),.035,'#bec8b6');
          for(const y of [row.low,row.low+.67,row.high])batchBeam(detail,p(l,y,.08),p(r,y,.08),.04,'#bec8b6');
          if((i+j)%3===0)wallPanel(detail,a,c,row.low+.05,row.low+.61,'#8e9e94',.05,l+.025/len,r-.025/len);
          // Small pale reveals project beyond the glazing and brick face.
          batchBeam(metal,p(l,row.low-.04,.16),p(r,row.low-.04,.16),.08,'#a8b29d');
          brick.quad(p(l-.06/len,row.low,.22),p(l-.06/len,row.high,.22),p(l,row.high,0),p(l,row.low,0),'#74644d');
          brick.quad(p(r,row.low,0),p(r,row.high,0),p(r+.06/len,row.high,.22),p(r+.06/len,row.low,.22),'#74644d');
        }
        for(const y of [3.78,7.72,11.65])batchBeam(metal,p(0,y,.10),p(1,y,.10),y===3.78?.18:.10,'#d0d3bf');
        if(mid.v>6){
          wallPanel(concrete,a,c,3.0,3.68,'#d1d1bd',.06);
          // End rooms retain a high horizontal ground window above the hedge.
          for(const [u0,u1] of [[-37.5,-34.2],[30.2,37.5]]){const ts=[(u0-la.u)/(lc.u-la.u),(u1-la.u)/(lc.u-la.u)].sort((a,b)=>a-b),l=Math.max(0,ts[0]),r=Math.min(1,ts[1]);if(r>l){wallPanel(glass,a,c,2.1,2.65,'#465e57',.03,l,r);for(let d=l*len;d<r*len;d+=1.2)batchBeam(detail,p(d/len,2.1,.08),p(d/len,2.65,.08),.035,'#c2c9b5');}}
        }
      }
      batchBeam(metal,p(0,11.78,.14),p(1,11.78,.14),.15,'#c3c9b5');
    }
    for(const part of BLOCKHOUSE_ROOFS){
      polygon(roofs,part.points,part.height,'#a4ac98',part.holes);
      if(part.kind!=='core')continue;
      const ring=ordered(part.points);
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len};
        wallPanel(concrete,a,c,0,part.height,'#abb5a5',.04);
        for(const y of [3.9,7.75,11.8,14.8])wallPanel(detail,a,c,y,y+.025,'#839383',.055);
        for(let d=.85;d<len;d+=1.1)wallPanel(detail,a,c,3.8,part.height,'#8b9b8c',.055,d/len,(d+.018)/len);
        if(len>3){wallPanel(glass,a,c,4.2,13.9,'#526c65',.06,.12,.27);for(const y of [7.7,11.5])wallPanel(detail,a,c,y,y+.06,'#bbc7b5',.08,.12,.27);}
        if(n.x*f.v.x+n.z*f.v.z<-.7)wallPanel(glass,a,c,.2,3.2,'#455e58',.08,.36,.72);
        batchBeam(metal,[a.x+n.x*.07,part.height,a.z+n.z*.07],[c.x+n.x*.07,part.height,c.z+n.z*.07],.09,'#c1c9b3');
      }
      addCollider({points:part.points,holes:part.holes,base:b.base,bottom:g.roof,top:part.height});
    }
    // Pillars remain on the original south perimeter, outside the source
    // through-route buffer. Recessed glazing stays behind the covered walk.
    for(const u of [-33.5,-29,-23,-17,-11,-5,1,7,13,19,25,29.5]){
      box(brick,u,8.65,1.9,.46,3.8,.55,'#857054');addCollider({points:frameRectangle(f,.46,.55,u,8.65),base:b.base,top:3.8});
    }
    for(const part of BLOCKHOUSE_AWNING){
      polygon(metal,part.points,part.top,'#8d9b8e',part.holes);polygon(soffits,part.points,part.bottom,'#b9c1b1',part.holes,true);
      const ring=ordered(part.points);for(let i=0;i<ring.length;i++)wallPanel(metal,ring[i],ring[(i+1)%ring.length],part.bottom,part.top,'#58695d');
      addCollider({points:part.points,holes:part.holes,base:b.base,bottom:part.bottom,top:part.top});
    }
    for(let u=-36;u<37;u+=3.4){
      // Thin cantilever rafters and pale parallel soffit strips.
      batchBeam(metal,at(u,-12.7,3.65),at(u,-4.7,3.65),.12,'#4a5c51');
      for(let v=-12.6;v<-5;v+=.38)batchBeam(metal,at(u,v,3.705),at(Math.min(37,u+3.4),v,3.705),.016,'#8f9b8a');
    }
    for(const floor of BLOCKHOUSE_PAVING)polygon(paving,floor.points,.22,'#aca893',floor.holes);
    for(const hedge of g.hedges){
      for(let u=hedge.u-hedge.width/2+.3;u<hedge.u+hedge.width/2;u+=.65){box(garden,u,hedge.v,.32,.07,.64,.07,'#857356');box(garden,u,hedge.v,.85,.76,.55,.72,'#55784b');box(garden,u+.12,hedge.v-.05,1.12,.55,.15,.65,'#698957');}
    }
    // Discreet campus identity on the fascia; historical tenant names are not
    // presented as current businesses.
    facadeCaption(b,framePoint(f,17.5,9.05),framePoint(f,4.5,8.93),'G6 | Blockhouse',7.5,3.38,'#566655');
    world.add(metal.mesh(style('#ffffff',{vertexColors:true,metalness:.18})),soffits.mesh(style('#ffffff',{vertexColors:true})),paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})),garden.mesh(style('#ffffff',{vertexColors:true})));
  }

  function morvenBrownBuilding(b,brick,glass,detail,roofs){
    const g=morvenGeometry(b),f=g.frame,metal=new Batch(),paving=new Batch(),shade=new Batch();
    for(const batch of [metal,shade])batch.base=b.base;
    const parts=MORVEN_PARTS,upper=6.8;
    for(const part of parts){
      for(const raw of [part.points,...part.holes]){const ring=(polygonArea(raw)<0)===(raw===part.points)?[...raw].reverse():raw;for(let i=0;i<ring.length;i++)wallPanel(brick,ring[i],ring[(i+1)%ring.length],part.minHeight,upper,'#8c8067');}
      if(part.minHeight)polygon(shade,part.points,part.minHeight,'#b0b3a2',part.holes,true);
      addCollider({points:part.points,holes:part.holes,base:b.base,bottom:part.minHeight,top:upper});
    }
    addCollider({points:b.points,holes:b.holes,base:b.base,bottom:upper,top:b.height});
    for(const floor of MORVEN_PAVING)polygon(paving,floor.points,.22,'#ad978d',floor.holes);
    for(let ri=0;ri<1+b.holes.length;ri++){
      const raw=ri?b.holes[ri-1]:b.points,ring=(polygonArea(raw)>0)===(ri===0)?raw:[...raw].reverse();
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),n={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},la=g.local(a),lc=g.local(c),cuts=[0,1];
        if(Math.abs(lc.u-la.u)>1)for(const u of [-10.8,-6.6,...(ri===1&&la.v>16&&lc.v>16?[MORVEN_FRONTAGE.u0,MORVEN_FRONTAGE.u1]:[])]){const t=(u-la.u)/(lc.u-la.u);if(t>0&&t<1)cuts.push(t);}cuts.sort((a,c)=>a-c);
        const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
        wallPanel(brick,a,c,upper,g.roof,'#8c8067');
        // Deep projecting masonry strips frame narrow stacked windows. Lower
        // glazing disappears into the real slope rather than adding a floor.
        const count=Math.max(1,Math.round(len/2.45));
        for(let j=0;j<count;j++){
          const t=(j+.5)/count,u=la.u+(lc.u-la.u)*t,v=la.v+(lc.v-la.v)*t,opening=Math.abs(lc.u-la.u)>1&&u>-10.8&&u<-6.6;
          const bottom=opening?(v<0?4.6:6.8):0,l=t-.5/len,r=t+.5/len;
          for(const row of g.rows){if(row.low<bottom+.12||ri===1&&la.v>16&&lc.v>16&&u>MORVEN_FRONTAGE.u0&&u<MORVEN_FRONTAGE.u1&&row.low<6)continue;
            wallPanel(glass,a,c,row.low,row.high,'#405b58',.025,Math.max(0,l),Math.min(1,r));
            for(const q of [l,r])batchBeam(detail,p(q,row.low,.10),p(q,row.high,.10),.045,'#c2c6b4');
            for(const y of [row.low,row.low+.65,row.high])batchBeam(detail,p(l,y,.11),p(r,y,.11),.045,'#c2c6b4');
            // Staggered pale blinds add variation without copied photographs.
            if((i+j+Math.round(row.low))%4===0)wallPanel(detail,a,c,row.high-.65,row.high-.07,'#a9afa0',.06,l+.04/len,r-.04/len);
            metal.quad(p(l,row.low-.05,.35),p(r,row.low-.05,.35),p(r,row.low+.05,.04),p(l,row.low+.05,.04),'#a0a895');
            batchBeam(metal,p(l,row.high+.06,.34),p(r,row.high+.06,.34),.12,'#8f9587');
          }
        }
        for(let k=0;k<cuts.length-1;k++){
          const l=cuts[k],r=cuts[k+1],u=la.u+(lc.u-la.u)*(l+r)/2,v=la.v+(lc.v-la.v)*(l+r)/2,bottom=ri===1&&la.v>16&&lc.v>16&&u>MORVEN_FRONTAGE.u0&&u<MORVEN_FRONTAGE.u1?MORVEN_FRONTAGE.topRL-b.base:Math.abs(lc.u-la.u)>1&&u>-10.8&&u<-6.6?(v<0?4.6:6.8):0;
          for(let j=0;j<=count;j++){const t=j/count,lo=Math.max(l,t-.3/len),hi=Math.min(r,t+.3/len);if(hi<=lo)continue;
            wallPanel(brick,a,c,bottom,g.roof,'#91866d',.36,lo,hi);
            brick.quad(p(lo,bottom,0),p(lo,g.roof,0),p(lo,g.roof,.36),p(lo,bottom,.36),'#82785f');
            brick.quad(p(hi,bottom,.36),p(hi,g.roof,.36),p(hi,g.roof,0),p(hi,bottom,0),'#82785f');
          }
        }
        batchBeam(metal,p(0,17.72,.48),p(1,17.72,.48),.42,'#545d52');
        shade.quad(p(0,17.5,0),p(0,17.5,.65),p(1,17.5,.65),p(1,17.5,0),'#a4ab97');
      }
    }
    polygon(roofs,b.points,g.roof,'#939d89',b.holes);
    morvenCourtyardCanopy();
    morvenCourtGarden();
    bourkeFountain();
    facadeCaption(b,framePoint(f,28,27.45),framePoint(f,3,27.3),'C20 | Morven Brown',10.0,4.0,'#e4e1cb');
    world.add(metal.mesh(style('#ffffff',{vertexColors:true,metalness:.25})),shade.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),paving.mesh(morvenPaverMaterial(paving,g)));
  }

  function morvenCourtyardCanopy(){
    const roof=new Batch(),soffit=new Batch(),steel=new Batch(),wood=new Batch(),front=new Batch(),glazing=new Batch();for(const batch of [roof,soffit,steel,wood,front,glazing])batch.base=0;
    const centre=morvenCanopyPoint(Math.PI,0),C=MORVEN_CANOPY_WALL_RL,at=(p,y)=>[p.x,y,p.z];
    for(let i=0;i<MC.segments;i++){
      const a=Math.PI+i/MC.segments*Math.PI,b=Math.PI+(i+1)/MC.segments*Math.PI,p=morvenCanopyPoint(a),q=morvenCanopyPoint(b),y=morvenCanopyUnderRL(1);
      roof.triangle(at(centre,C+MC.thickness),at(q,y+MC.thickness),at(p,y+MC.thickness),'#a9b1a7');
      soffit.triangle(at(centre,C),at(p,y),at(q,y),'#d8dccd');
      steel.quad(at(p,y-MC.fasciaDepth/2),at(q,y-MC.fasciaDepth/2),at(q,y+MC.thickness+.025),at(p,y+MC.thickness+.025),'#46565a');
      batchBeam(steel,at(p,y-.10),at(q,y-.10),.055,'#34464b');
      if(i%4===0)batchBeam(steel,at(morvenCanopyPoint(a,.12),morvenCanopyUnderRL(.12)+MC.thickness+.006),at(morvenCanopyPoint(a,1.014),y+MC.thickness+.006),.012,'#7c8b84');
    }
    for(const r of MORVEN_CANOPY_RIBS)batchBeam(steel,at(r.a,r.fromRL),at(r.b,r.toRL),.105,'#3e5053');
    for(const p of MORVEN_CANOPY_POSTS){const ground=terrainHeight(p.x,p.z)+.22;batchPipe(steel,[p.x,ground,p.z],[p.x,p.topRL,p.z],p.radius,'#4a5c5d');steel.box(p.x,ground+.025,p.z,p.radius*3.4,.05,p.radius*3.4,'#536563');addCollider({x:p.x,z:p.z,radius:p.radius+.045,base:0,bottom:ground,top:p.topRL});}
    // Pale fascia and dark glazed bays follow structural photos. Interiors,
    // current tenants and historical branding are deliberately unasserted.
    const F=MORVEN_FRONTAGE;
    for(const bay of MORVEN_FRONTAGE_BAYS){const a=morvenFrontagePoint(bay.u0),b=morvenFrontagePoint(bay.u1),low=Math.max(terrainHeight(a.x,a.z),terrainHeight(b.x,b.z))+.22;
      front.quad(at(a,F.glassTopRL),at(b,F.glassTopRL),at(b,F.topRL),at(a,F.topRL),'#c4c6b7');
      glazing.quad(at(a,low+.035),at(b,low+.035),at(b,F.glassTopRL),at(a,F.glassTopRL),'#3c514e');
      for(const u of [bay.u0+.025,(bay.u0+bay.u1)/2,bay.u1-.025]){const p=morvenFrontagePoint(u,.105);batchBeam(steel,[p.x,low,p.z],[p.x,F.glassTopRL,p.z],.045,'#303f3d');}
      for(const y of [low+.045,low+2.14,F.glassTopRL-.035])batchBeam(steel,[a.x,y,a.z],[b.x,y,b.z],.045,'#374742');
      const handle=morvenFrontagePoint((bay.u0+bay.u1)/2+.12,.14);batchPipe(steel,[handle.x,low+.90,handle.z],[handle.x,low+1.18,handle.z],.011,'#b4bdb3');
    }
    for(const u of [MORVEN_FRONTAGE_BAYS[1].u1,MORVEN_FRONTAGE_BAYS[3].u1]){const p=morvenFrontagePoint(u,.11),low=terrainHeight(p.x,p.z)+.22,angle=Math.atan2(-MORVEN_GARDEN_FRAME.u.z,MORVEN_GARDEN_FRAME.u.x);front.box(p.x,(low+F.topRL)/2,p.z,.58,F.topRL-low,.16,'#c4c6b7',angle);}
    for(let i=1;i<MORVEN_COUNTER_ANGLES.length;i++){
      const a=MORVEN_COUNTER_ANGLES[i-1],b=MORVEN_COUNTER_ANGLES[i],p=morvenCanopyPoint(a,.935),q=morvenCanopyPoint(b,.935),r=morvenCanopyPoint(b,.985),t=morvenCanopyPoint(a,.985);
      wood.quad(at(p,MORVEN_COUNTER_RL),at(q,MORVEN_COUNTER_RL),at(r,MORVEN_COUNTER_RL),at(t,MORVEN_COUNTER_RL),'#a47b52');
      wood.quad(at(p,MORVEN_COUNTER_RL-.065),at(q,MORVEN_COUNTER_RL-.065),at(q,MORVEN_COUNTER_RL),at(p,MORVEN_COUNTER_RL),'#806347');
      for(let k=0;k<5;k++){const h=.24+k*.12,p=morvenCanopyPoint(a,.963),q=morvenCanopyPoint(b,.963);batchPipe(steel,at(p,MORVEN_COUNTER_RL-1.02+h),at(q,MORVEN_COUNTER_RL-1.02+h),.006,'#8e9a89');}
      if(i%4===0||i===1){const p=morvenCanopyPoint(a,.96),ground=terrainHeight(p.x,p.z)+.22;batchBeam(wood,at(p,ground),at(p,MORVEN_COUNTER_RL),.075,'#957147');}
    }
    const seatMaterial=style('#a58b62',{map:surfaceTexture('path-timber'),roughness:.85}),seatGeo=new THREE.CylinderGeometry(.18,.18,.05,24);
    for(const s of MORVEN_CANOPY_STOOLS){const seat=new THREE.Mesh(seatGeo,seatMaterial);seat.position.set(s.x,s.baseRL+.75,s.z);world.add(seat);batchPipe(steel,[s.x,s.baseRL+.04,s.z],[s.x,s.baseRL+.73,s.z],.027,'#839084');steel.box(s.x,s.baseRL+.025,s.z,.23,.05,.23,'#7e8d82');const ring=new THREE.Mesh(new THREE.TorusGeometry(.14,.011,6,24),style('#96a192',{metalness:.55,roughness:.4}));ring.rotation.x=Math.PI/2;ring.position.set(s.x,s.baseRL+.27,s.z);world.add(ring);addCollider({x:s.x,z:s.z,radius:.21,base:s.baseRL,bottom:0,top:.8});}
    addCollider({points:MORVEN_COUNTER_FOOTPRINT,base:0,bottom:MORVEN_COUNTER_RL-1.15,top:MORVEN_COUNTER_RL+.04});
    addCollider({points:MORVEN_CANOPY_RING,base:0,bottom:morvenCanopyUnderRL(1)-MC.fasciaDepth/2,top:C+MC.thickness+.03});
    const glassMesh=glazing.mesh(style('#ffffff',{vertexColors:true,metalness:.2,roughness:.13,envMapIntensity:.55,side:THREE.DoubleSide}));world.add(glassMesh);medicalReflection(glassMesh,morvenCanopyPoint(Math.PI*1.5,.7),C-1.5);
    world.add(roof.mesh(style('#ffffff',{vertexColors:true,metalness:.35,roughness:.65,side:THREE.DoubleSide})),soffit.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),steel.mesh(style('#ffffff',{vertexColors:true,metalness:.4,roughness:.45,side:THREE.DoubleSide})),wood.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('path-timber'),side:THREE.DoubleSide})),front.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),side:THREE.DoubleSide})));
  }

  function morvenPaverMaterial(batch,g){
    const texture=canvasTexture(512,512,ctx=>{const random=rng(2015),cell=64;ctx.fillStyle='#797c70';ctx.fillRect(0,0,512,512);for(let y=-2;y<11;y++)for(let x=-2;x<11;x++){const k=((x-y)%4+4)%4;if(k!==0&&k!==2)continue;ctx.fillStyle=`hsl(${18+random()*15} ${9+random()*8}% ${62+random()*14}%)`;const px=x*cell,py=(k===2?y-1:y)*cell;ctx.fillRect(px+1.2,py+1.2,(k===0?2:1)*cell-2.4,(k===0?1:2)*cell-2.4);}for(let i=0;i<17000;i++){ctx.fillStyle=i%2?'#ffffff1a':'#292b2519';ctx.fillRect(random()*512,random()*512,1,1);}});texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.anisotropy=8;
    // A 0.8 m repeat contains eight 100 mm cells. This is photo-fitted, not
    // a measured paver specification; angle follows the courtyard frame.
    batch.uvs=[];for(let i=0;i<batch.positions.length;i+=3){const p=g.local({x:batch.positions[i],z:batch.positions[i+2]});batch.uvs.push((p.u+p.v)/Math.SQRT2/.8,(p.v-p.u)/Math.SQRT2/.8);}
    return style('#ffffff',{vertexColors:true,map:texture,bumpMap:texture,bumpScale:.006,roughness:.92});
  }

  function morvenCourtGarden(){
    const floor=new Batch(),soil=new Batch(),wood=new Batch(),metal=new Batch(),branches=new Batch();for(const b of [floor,soil,wood,metal,branches])b.base=0;
    for(const [parts,batch,offset,color] of [[MORVEN_GARDEN_BEDS,soil,.245,'#5b5742'],[MORVEN_BENCH_PADS,floor,.235,'#c8af75'],[MORVEN_PAVING_BANDS,floor,.228,'#c3c4b2']])for(const p of parts)shapedRoof(batch,p.points,q=>demHeight(q.x,q.z)+offset,color,p.holes);
    const f=MORVEN_GARDEN_FRAME,angle=Math.atan2(-f.u.z,f.u.x);
    for(const bench of MORVEN_BENCHES){
      const at=(a,d,y)=>{const p=morvenBenchPoint(bench,a,d);return [p.x,y,p.z];};
      const box=(a,d,y,w,h,l,c)=>{const p=morvenBenchPoint(bench,a,d);wood.box(p.x,y,p.z,w,h,l,c,angle+bench.yaw);};
      for(let i=0;i<6;i++)box(0,(i-2.5)*.095,bench.baseRL+.46,2.5,.045,.077,'#75544a');
      for(let i=0;i<6;i++)box(0,.29+i*.008,bench.baseRL+.66+i*.073,2.5,.056,.038,'#6d5149');
      for(const a of [-1.08,0,1.08]){
        const foot=morvenBenchPoint(bench,a,.04),y=demHeight(foot.x,foot.z)+.22;
        batchPipe(metal,at(a,.04,y+.035),at(a,.04,bench.baseRL+.43),.032,'#929b92');
        batchPipe(metal,at(a,-.24,bench.baseRL+.40),at(a,.31,bench.baseRL+.40),.024,'#7b877d');
        batchPipe(metal,at(a,.31,bench.baseRL+.32),at(a,.37,bench.baseRL+1.08),.027,'#8b968a');
        metal.box(foot.x,y+.025,foot.z,.14,.05,.12,'#7c877e',angle+bench.yaw);
      }
      batchPipe(metal,at(-1.12,.34,bench.baseRL+.58),at(1.12,.34,bench.baseRL+.58),.022,'#778578');
      addCollider({points:bench.points,base:bench.baseRL,bottom:0,top:1.08});
    }
    const forms=MORVEN_SHRUBS.map(p=>({p,form:morvenShrubForm(p)})),count=forms.reduce((n,{form})=>n+form.leaves.length,0),flowerCount=forms.reduce((n,{form})=>n+form.flowers.length,0),dummy=new THREE.Object3D(),color=new THREE.Color();
    const leaves=new THREE.InstancedMesh(new THREE.PlaneGeometry(1,1),style('#ffffff',{map:foliageTexture('fig'),alphaTest:.4,side:THREE.DoubleSide,roughness:.93}),count);
    const flowerTexture=canvasTexture(128,128,ctx=>{ctx.clearRect(0,0,128,128);for(let i=0;i<8;i++){const a=i/8*TAU;ctx.fillStyle=i%2?'#c85368':'#d36b7d';ctx.beginPath();ctx.ellipse(64+Math.cos(a)*25,64+Math.sin(a)*25,17,22,a,0,TAU);ctx.fill();}ctx.fillStyle='#bda65d';ctx.beginPath();ctx.arc(64,64,8,0,TAU);ctx.fill();});
    const flowers=new THREE.InstancedMesh(new THREE.PlaneGeometry(1,1),style('#ffffff',{map:flowerTexture,alphaTest:.4,side:THREE.DoubleSide,roughness:.95}),flowerCount);
    let index=0,fi=0;for(const {p,form} of forms){const base=demHeight(p.x,p.z)+.245,worldPoint=q=>[p.x+q[0],base+q[1],p.z+q[2]];for(const branch of form.branches)batchPipe(branches,worldPoint(branch.a),worldPoint(branch.b),branch.radius,'#746b52');for(const leaf of form.leaves){dummy.position.set(p.x+leaf.x,base+leaf.y,p.z+leaf.z);dummy.rotation.set(leaf.rx,leaf.ry,leaf.rz);dummy.scale.setScalar(leaf.size);dummy.updateMatrix();leaves.setMatrixAt(index,dummy.matrix);leaves.setColorAt(index++,color.set(['#718762','#5d7956','#7a8d6a','#637b57'][index%4]));}for(const flower of form.flowers){dummy.position.set(p.x+flower.x,base+flower.y,p.z+flower.z);dummy.rotation.set(flower.rx,flower.ry,flower.rz);dummy.scale.setScalar(flower.size);dummy.updateMatrix();flowers.setMatrixAt(fi++,dummy.matrix);}}
    leaves.receiveShadow=flowers.receiveShadow=true;leaves.computeBoundingSphere();flowers.computeBoundingSphere();world.add(leaves,flowers);
    const grain=canvasTexture(256,512,ctx=>{const random=rng(1965);ctx.fillStyle='#b3a493';ctx.fillRect(0,0,256,512);for(let i=0;i<400;i++){const y=random()*512;ctx.strokeStyle=i%2?'#76675b44':'#e5d6c73a';ctx.lineWidth=.5+random();ctx.beginPath();ctx.moveTo(0,y);ctx.bezierCurveTo(80,y+random()*4,170,y-random()*4,256,y);ctx.stroke();}});
    world.add(floor.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),roughness:.94}),false),soil.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('grass'),roughness:1}),false),wood.mesh(style('#ffffff',{vertexColors:true,map:grain,roughness:.87})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.55,roughness:.44})),branches.mesh(style('#ffffff',{vertexColors:true,roughness:.95})));
  }

  function bourkeFountain(){
    const p=BOURKE_POOL,f=BOURKE_FRAME,D=BOURKE_DISH,stone=new Batch(),copper=new Batch();for(const batch of [stone,copper])batch.base=0;
    polygon(stone,p.rim,p.rimRL,'#c5c1ad',[p.points]);
    const shape=new THREE.Shape(p.points.map(q=>new THREE.Vector2(q.x,-q.z))),poolWater=new Reflector(new THREE.ShapeGeometry(shape),{clipBias:.003,textureWidth:512,textureHeight:512,multisample:0,color:0x627369});poolWater.rotation.x=-Math.PI/2;poolWater.position.y=p.waterRL;const reflect=poolWater.onBeforeRender,centre=bourkePoint(0,0);poolWater.onBeforeRender=function(...args){if(args[2]!==camera||Math.hypot(camera.position.x-centre.x,camera.position.z-centre.z)>50)return;reflect.apply(this,args);};campusPlanarReflections.push(poolWater);world.add(poolWater);
    for(const ring of [p.points,[...p.rim].reverse()])for(let i=0;i<ring.length;i++)wallPanel(stone,ring[i],ring[(i+1)%ring.length],p.bottomRL,p.rimRL,'#777e70');
    // Individual pale coping joints, unlike the previous continuous pipe rim.
    for(let i=0;i<p.rim.length;i++){const a=p.points[i],b=p.rim[i];batchBeam(stone,[a.x,p.rimRL+.003,a.z],[b.x,p.rimRL+.003,b.z],.012,'#77796b');}
    const angle=Math.atan2(-f.u.z,f.u.x),rockTexture=canvasTexture(512,512,(ctx,w,h)=>{const random=rng(1967);ctx.fillStyle='#7a7d76';ctx.fillRect(0,0,w,h);for(let i=0;i<2500;i++){const c=60+random()*115;ctx.fillStyle=`rgba(${c},${c+2},${c-4},.3)`;ctx.beginPath();ctx.ellipse(random()*w,random()*h,2+random()*8,2+random()*7,random()*TAU,0,TAU);ctx.fill();}for(let i=0;i<44000;i++){const c=55+random()*130;ctx.fillStyle=`rgba(${c},${c},${c-5},${.2+random()*.65})`;const r=.3+random()*1.7;ctx.fillRect(random()*w,random()*h,r,r);}}),rockMaterial=style('#a4aba5',{map:rockTexture,bumpMap:rockTexture,bumpScale:.026,roughness:.98});
    // Triplanar-like world-coordinate UVs keep the own generated mineral grain
    // visible on all irregular stone faces without stretching one photograph.
    for(const r of BOURKE_STONES){const geometry=bourkeStoneGeometry(r),positions=geometry.getAttribute('position'),normals=geometry.getAttribute('normal'),uv=[];for(let i=0;i<positions.count;i++){const nx=Math.abs(normals.getX(i)),ny=Math.abs(normals.getY(i)),nz=Math.abs(normals.getZ(i));uv.push((ny>nx&&ny>nz?positions.getX(i):nx>nz?positions.getZ(i):positions.getX(i))*1.8,(ny>nx&&ny>nz?positions.getZ(i):positions.getY(i))*1.8);}geometry.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));const mesh=new THREE.Mesh(geometry,rockMaterial);mesh.position.set(r.x,r.baseRL,r.z);mesh.rotation.y=angle;mesh.castShadow=mesh.receiveShadow=true;world.add(mesh);}
    rockTexture.wrapS=rockTexture.wrapT=THREE.RepeatWrapping;
    const dishCorners=[[D.frontU,D.v-D.length*.5],[D.frontU,D.v+D.length*.5],[D.u+D.width*.5,D.v+D.length*.36],[D.u+D.width*.5,D.v-D.length*.36]].map(([u,v])=>bourkePoint(u,v));
    const dishY=q=>D.lipRL+(D.backRL-D.lipRL)*(q.x-dishCorners[0].x)*f.u.x/D.width+(D.backRL-D.lipRL)*(q.z-dishCorners[0].z)*f.u.z/D.width;
    copper.quad(...dishCorners.map(q=>[q.x,dishY(q),q.z]),'#4a5344');
    for(let i=0;i<4;i++){const a=dishCorners[i],b=dishCorners[(i+1)%4];batchBeam(copper,[a.x,dishY(a),a.z],[b.x,dishY(b),b.z],.035,'#7a7960');}
    const splash=new Batch();splash.base=0;
    const spillRandom=rng(1966);for(let i=0;i<23;i++){const v=D.v-D.length*.42+spillRandom()*D.length*.84,a=bourkePoint(D.frontU,v),b=bourkePoint(D.frontU-.06-spillRandom()*.08,v+.012*Math.sin(i)),bottom=p.waterRL+.01+spillRandom()*.06;batchPipe(splash,[a.x,D.lipRL-.01-spillRandom()*.035,a.z],[b.x,bottom,b.z],.002+spillRandom()*.004,i%3?'#a5c1ae':'#c7d2c2');}
    for(let ring=0;ring<5;ring++)for(let j=0;j<38;j++){const a=j/38*TAU,b=(j+1)/38*TAU,r=.22+ring*.13;if(j%7===ring)continue;const q=bourkePoint(D.frontU-.16+Math.cos(a)*r*.55,D.v+Math.sin(a)*r),t=bourkePoint(D.frontU-.16+Math.cos(b)*r*.55,D.v+Math.sin(b)*r);batchBeam(splash,[q.x,p.waterRL+.004,q.z],[t.x,p.waterRL+.004,t.z],.006,'#a5b8a8');}
    const P=BOURKE_PLAQUE,site=bourkePoint(P.u,P.v),relief=new THREE.Group();relief.position.set(site.x,P.bottomRL+P.height/2,site.z);relief.rotation.y=angle-Math.PI/2;
    const bronze=style('#675e45',{metalness:.72,roughness:.58}),back=new THREE.Mesh(new THREE.BoxGeometry(P.width,P.height,.008),bronze);back.position.z=.004;relief.add(back);
    const oval=(x,y,z,rx,ry,rz)=>{const mesh=new THREE.Mesh(new THREE.SphereGeometry(1,16,12),bronze);mesh.position.set(x,y,z);mesh.scale.set(rx,ry,rz);relief.add(mesh);};
    // A small original relief study: swept hair, brow, nose, cheek, ear and
    // collar fit inside the catalogue envelope; no portrait pixels are used.
    oval(.003,.035,.021,.066,.093,.019);oval(.024,.100,.022,.065,.035,.018);oval(-.051,.025,.025,.025,.014,.015);oval(-.039,-.019,.025,.026,.036,.014);oval(.054,.015,.022,.014,.023,.013);oval(.019,-.083,.020,.040,.057,.015);oval(.001,-.119,.016,.098,.024,.012);
    world.add(relief);world.add(stone.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),roughness:.94})),copper.mesh(style('#ffffff',{vertexColors:true,metalness:.72,roughness:.36,side:THREE.DoubleSide})),splash.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.42,roughness:.16}),false));
    // Keep the entire basin and its bordering stones out of walking space.
    addCollider({points:p.rim,base:p.bottomRL,bottom:0,top:1.9});
  }

  function squarehouseBuilding(b,concrete,brick,glass,detail,roofs){
    const g=squarehouseGeometry(b),f=g.frame,angle=Math.atan2(-f.u.z,f.u.x),at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];};
    const grey='#737d79',light='#adb7a7',cream='#c0b18b',deck=new Batch(),soffits=new Batch(),paving=new Batch(),stairMesh=new Batch(),plants=new Batch();
    deck.base=soffits.base=plants.base=b.base;paving.base=null;stairMesh.base=0;
    const rail=(a,c,bottom,top,cap=true)=>{
      const len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,theta=Math.atan2(-(c.z-a.z),c.x-a.x);
      const x=(a.x+c.x)/2,z=(a.z+c.z)/2;
      concrete.box(x,bottom+.085,z,len,.17,.22,grey,theta);concrete.box(x,top-.115,z,len,.23,.22,grey,theta);
      for(let d=.12;d<len;d+=2.15){const t=d/len,x=a.x+(c.x-a.x)*t+nx*.05,z=a.z+(c.z-a.z)*t+nz*.05;concrete.box(x,(bottom+top)/2,z,.18,top-bottom,.22,light,theta);}
      if(cap)detail.box(x,top-.015,z,len,.03,.26,'#b6bfb0',theta);
    };
    for(const face of g.faces){
      const {a,c,len,n,kind}=face,p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
      wallPanel(brick,a,c,0,g.roof,cream);
      // Ground workshop glazing sits behind the open outer colonnade.
      if(kind==='pier-windows'){
        wallPanel(glass,a,c,.5,3.18,'#405954',.025,.03,.97);
        const bays=Math.max(1,Math.round(len/3.5));
        for(let i=0;i<=bays;i++){const t=i/bays;batchBeam(detail,p(t,.4,.08),p(t,3.2,.08),.045,'#a2b2a0');}
        wallPanel(detail,a,c,2.68,2.76,light,.08);
      }else{
        wallPanel(glass,a,c,.35,3.2,'#415852',.025,.08,.92);
        for(let d=1;d<len;d+=2.1)batchBeam(detail,p(d/len,.35,.08),p(d/len,3.2,.08),.035,light);
      }
      if(kind==='pier-windows'){
        const bays=Math.max(1,Math.round(len/3.5)),width=Math.min(1.18,len*.5/bays);
        for(let i=0;i<bays;i++){
          const t=(i+.5)/bays,l=t-width/len/2,r=t+width/len/2;
          wallPanel(concrete,a,c,3.7,10.95,'#626e67',.04,l-.12/len,r+.12/len);
          for(const row of g.rows){
            wallPanel(glass,a,c,row.low,row.high,'#536c64',.08,l,r);
            for(const x of [l,r])batchBeam(detail,p(x,row.low,.12),p(x,row.high,.12),.025,'#8b9d8b');
            batchBeam(detail,p(l,row.high-.45,.13),p(r,row.high-.45,.13),.022,'#9bad98');
            // Projecting square concrete blocks interrupt the narrow strips.
            const q=p(t,row.low-.13,.24);concrete.box(q[0],q[1],q[2],width+.35,.34,.52,grey,Math.atan2(-(c.z-a.z),c.x-a.x));
            // A few tilted awning lights echo the photographed opening panes.
            if(i%3===1){const y=row.high-.5;glass.quad(p(l,y,.12),p(l,row.high,.32),p(r,row.high,.32),p(r,y,.12),'#637e72');}
          }
        }
      }
      for(const t of [0,1]){const q=p(t,7.25,.22);concrete.box(q[0],q[1],q[2],.24,7.7,.46,grey,Math.atan2(-(c.z-a.z),c.x-a.x));}
      wallPanel(concrete,a,c,g.roof-.23,g.roof,grey,.22);rail(a,c,g.roof,g.top);
    }
    polygon(roofs,b.points,g.roof,'#929f8c',b.holes);
    // An enclosed lower workshop occupies the stepped Anzac Parade edge.
    for(const part of SQUAREHOUSE_PARTS.annex){
      const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points;
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(brick,a,c,0,g.underside,cream);
        if(len>2.0){wallPanel(glass,a,c,1.6,2.4,'#425852',.035,.03,.97);for(let d=.4;d<len;d+=1.1)wallPanel(detail,a,c,1.58,2.43,'#7d9181',.07,d/len,Math.min(1,(d+.05)/len));}
      }
      addCollider({points:part.points,holes:part.holes,base:b.base,top:g.underside});
    }
    for(const part of SQUAREHOUSE_PARTS.deck){
      polygon(deck,part.points,g.floor,'#a1aaa0',part.holes);polygon(soffits,part.points,g.underside,'#c1c9b6',part.holes,true);
      for(let i=0;i<part.points.length;i++)wallPanel(concrete,part.points[i],part.points[(i+1)%part.points.length],g.underside,g.floor,grey);
      // Existing vertical landing collision supports walking above a suspended
      // slab without raising the walking floor for people beneath it.
      addCollider({points:part.points,holes:part.holes,base:b.base,bottom:g.underside,top:g.floor,stepHeight:.27});
    }
    for(const floor of SQUAREHOUSE_PARTS.paving)polygon(paving,floor.points,.22,'#abae9a',floor.holes);
    const podium=polygonArea(g.podium)<0?[...g.podium].reverse():g.podium;
    for(let i=0;i<podium.length;i++){
      const a=podium[i],c=podium[(i+1)%podium.length],len=distance2(a,c),au=g.local(a),cu=g.local(c),cuts=[0,1];
      if(Math.abs(au.v+24)<.01&&Math.abs(cu.v+24)<.01)for(const u of [g.stairs.u-1.6,g.stairs.u+1.6]){const t=(u-au.u)/(cu.u-au.u);if(t>0&&t<1)cuts.push(t);}cuts.sort((a,c)=>a-c);
      for(let j=0;j<cuts.length-1;j++){
        const l=cuts[j],r=cuts[j+1],u=au.u+(cu.u-au.u)*(l+r)/2;if(Math.abs(au.v+24)<.01&&Math.abs(cu.v+24)<.01&&Math.abs(u-g.stairs.u)<1.6)continue;
        const p={x:a.x+(c.x-a.x)*l,z:a.z+(c.z-a.z)*l},q={x:a.x+(c.x-a.x)*r,z:a.z+(c.z-a.z)*r};
        wallPanel(concrete,p,q,3.05,3.6,grey,.04);rail(p,q,3.65,4.65);
        const dx=q.x-p.x,dz=q.z-p.z,length=Math.hypot(dx,dz),nx=-dz/length*.12,nz=dx/length*.12;
        addCollider({points:[{x:p.x+nx,z:p.z+nz},{x:p.x-nx,z:p.z-nz},{x:q.x-nx,z:q.z-nz},{x:q.x+nx,z:q.z+nz}],base:b.base,bottom:g.floor,top:4.65});
      }
      for(let d=.8;d<len;d+=2.15){const t=d/len,u=au.u+(cu.u-au.u)*t;if(Math.abs(au.v+24)<.01&&Math.abs(cu.v+24)<.01&&Math.abs(u-g.stairs.u)<1.6)continue;const p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t};detail.box(p.x,3.25,p.z,.13,.11,.12,'#c5c9b3');}
    }
    for(const p of g.supports){
      const low=terrainHeight(p.x,p.z)-b.base;concrete.box(p.x,(low+g.underside)/2,p.z,p.width,g.underside-low,p.width,grey,angle);
      addCollider({points:frameRectangle(f,p.width,p.width,p.u,p.v),base:b.base,top:g.underside});
    }
    for(const canopy of SQUAREHOUSE_PARTS.canopies){
      polygon(deck,canopy.points,canopy.top,'#69766b',canopy.holes);polygon(soffits,canopy.points,canopy.bottom,'#aab6a0',canopy.holes,true);
      for(let i=0;i<canopy.points.length;i++){const a=canopy.points[i],c=canopy.points[(i+1)%canopy.points.length];wallPanel(detail,a,c,canopy.bottom,canopy.top,grey);}
      addCollider({points:canopy.points,holes:canopy.holes,base:b.base,bottom:canopy.bottom,top:canopy.top});
    }
    // Slender posts and roof battens distinguish the terrace shade awnings.
    for(const u of [-18,-12,-6,0,6,12]){const p=framePoint(f,u,-22.6);detail.box(p.x,5.2,p.z,.09,3.2,.09,'#4c5c52',angle);}
    for(const v of [-12,-6,0,6,12,18]){const p=framePoint(f,19.1,v);detail.box(p.x,5.2,p.z,.09,3.2,.09,'#4c5c52',angle);}
    for(let u=-19;u<15.5;u+=.42)batchBeam(detail,at(u,-23.0,7.02),at(u,-19.8,7.02),.02,'#8b9b86');
    for(let v=-13.8;v<20.5;v+=.42)batchBeam(detail,at(16,v,7.02),at(19.5,v,7.02),.02,'#8b9b86');
    // Bounded stair treads prevent a raised walking surface leaking into the
    // covered ground floor or out over neighbouring mapped paths.
    for(const step of g.stairs.steps){
      polygon(stairMesh,step.points,step.rl,'#939d8c');
      for(let i=0;i<step.points.length;i++){const a=step.points[i],c=step.points[(i+1)%step.points.length];wallPanel(stairMesh,a,c,Math.min(terrainHeight(a.x,a.z),terrainHeight(c.x,c.z))-.03,step.rl,'#818d7f');}
      groundPatches.push({points:step.points,heightAt:()=>step.rl+.01});addCollider({points:step.points,base:0,top:step.rl,stepHeight:.27});
    }
    const low=g.stairs.low-b.base,top=g.floor;
    for(const side of [-1,1]){
      const u=g.stairs.u+side*1.23,a=at(u,g.stairs.bottomV,low+.12),c=at(u,g.stairs.topV,top+.12),d=at(u,g.stairs.topV,top+1.08),e=at(u,g.stairs.bottomV,low+1.08);
      soffits.quad(a,c,d,e,grey);batchPipe(detail,at(u-side*.1,g.stairs.bottomV,low+.9),at(u-side*.1,g.stairs.topV,top+.9),.025,'#b5c4b0');
      addCollider({points:frameRectangle(f,.14,g.stairs.topV-g.stairs.bottomV,u,(g.stairs.bottomV+g.stairs.topV)/2),base:b.base,top:top+1.08});
    }
    // Small projecting service balcony on the broad southern brick end.
    const balcony=frameRectangle(f,4.4,1.3,5.3,17.1);polygon(concrete,balcony,7.45,grey);polygon(soffits,balcony,7.2,'#a7b19d',[],true);
    const r=polygonArea(balcony)<0?[...balcony].reverse():balcony;for(let i=0;i<r.length;i++)rail(r[i],r[(i+1)%r.length],7.5,8.45,false);
    for(const pot of g.planters){
      const p=framePoint(f,pot.u,pot.v);brick.box(p.x,g.floor+.25,p.z,pot.width,.5,pot.depth,'#a6a17e',angle);detail.box(p.x,g.floor+.51,p.z,pot.width-.1,.035,pot.depth-.1,'#5c6748',angle);
      addCollider({points:frameRectangle(f,pot.width,pot.depth,pot.u,pot.v),base:b.base,bottom:g.floor,top:g.floor+.6});
      for(let leaf=0;leaf<12;leaf++){
        const a=leaf/12*TAU,dx=Math.cos(a),dz=Math.sin(a),px=-dz,pz=dx,y=g.floor+.52;
        for(let j=0;j<7;j++){const t0=j/7,t1=(j+1)/7,width=.1*Math.sin((t0+.1)*Math.PI),q=t=>[p.x+dx*.75*t,y+.8*Math.sin(t*Math.PI*.75),p.z+dz*.75*t],s=q(t0),t=q(t1);plants.quad([s[0]+px*width,s[1],s[2]+pz*width],[t[0]+px*width,t[1],t[2]+pz*width],[t[0]-px*width,t[1],t[2]-pz*width],[s[0]-px*width,s[1],s[2]-pz*width],leaf%2?'#879a5f':'#6e8654');}
      }
    }
    facadeCaption(b,framePoint(f,18.8,22),framePoint(f,-6.8,22),'E4 | Squarehouse',9.8,4.43,'#dbe1cd');
    facadeCaption(b,b.points[1],b.points[2],'Design Futures Lab',10,2.85,'#d9dfc7');
    addCollider({points:b.points,holes:b.holes,base:b.base,top:g.roof});
    world.add(deck.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),soffits.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})),stairMesh.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),plants.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
  }

  function redCentreBuilding(b,concrete,brick,glass,detail,roofs){
    const g=redCentreGeometry(b),f=g.frame,angle=Math.atan2(-f.u.z,f.u.x),ceramic=new Batch(),metal=new Batch(),soffits=new Batch(),paving=new Batch();
    for(const batch of [ceramic,metal,soffits])batch.base=b.base;paving.base=null;
    const at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];},terracotta='#ba7e5e',silver='#c9d0bd',charcoal='#3c504f';
    const parts=RED_CENTRE_PARTS.filter(p=>p.building===b.id),upper=11.8;
    // Occupied lower regions stop around source footways. Ceiling regions
    // have matching suspended colliders, leaving outdoor links open below.
    for(const part of parts){
      const bottom=part.minHeight,top=upper;
      if(top>bottom+.01){
        const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points;
        for(let i=0;i<ring.length;i++){
          const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(glass,a,c,bottom,top,charcoal,.015);
          for(let d=.5;d<len;d+=2.3)wallPanel(detail,a,c,bottom,top,'#b0bdac',.04,d/len,Math.min(1,(d+.055)/len));
          for(const y of [5.8,8.7])if(y>bottom&&y<top)wallPanel(metal,a,c,y-.12,y+.12,silver,.06);
        }
        if(bottom>0)polygon(soffits,part.points,bottom,'#c5cab6',part.holes,true);
        addCollider({points:part.points,holes:part.holes,base:b.base,bottom,top});
      }

    }
    for(const floor of RED_CENTRE_PAVING.filter(p=>p.building===b.id))polygon(paving,floor.points,.22,'#aaa994',floor.holes);
    polygon(soffits,b.points,upper,'#c0c6b3',b.holes,true);
    addCollider({points:b.points,holes:b.holes,base:b.base,bottom:upper,top:g.bodyRoof});
    const routeU=g.routes.map(p=>g.local(p.points[0]).u);
    for(const face of g.faces){
      const {a,c,len,n,mid,north}=face,au=g.local(a).u,cu=g.local(c).u;
      const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
      const panel=(batch,low,high,color,off=0,l=0,r=1)=>{if(high>low+.001&&r>l+.00001)wallPanel(batch,a,c,low,high,color,off,l,r);};
      const line=(l,r,y,off,width,color)=>batchBeam(detail,p(l,y,off),p(r,y,off),width,color);
      if(north){
        // The metal/glass occupied volume sits behind the independent screen.
        panel(glass,upper,g.bodyRoof,'#577570',-1.9);
        for(let y=upper+.2;y<g.bodyRoof;y+=4.8)panel(metal,y,y+.8,silver,-1.86);
        const cuts=[0,1],limits=[-65,67,g.recess.u0,g.recess.u1,...routeU.flatMap(u=>[u-1.9,u+1.9])];
        if(Math.abs(cu-au)>.1)for(const u of limits){const t=(u-au)/(cu-au);if(t>0&&t<1)cuts.push(t);}cuts.sort((a,c)=>a-c);
        for(let k=0;k<cuts.length-1;k++){
          const l=cuts[k],r=cuts[k+1],u=au+(cu-au)*(l+r)/2;
          if(u<-65||u>67){
            panel(glass,upper,g.bodyRoof,'#617c77',.03,l,r);
            for(let y=upper;y<g.bodyRoof;y+=4.6)panel(metal,y,y+.7,silver,.18,l,r);
            for(let d=l*len;d<r*len;d+=1.1)batchBeam(detail,p(d/len,upper,.25),p(d/len,g.bodyRoof,.25),.07,'#acbdad');
            continue;
          }
          const floor=u>g.recess.u0&&u<g.recess.u1?g.recess.ceiling:routeU.some(q=>Math.abs(q-u)<1.9)?g.passageCeiling:0;
          const slots=[2.2,6.15,7.7,10.1,...g.rows.map(r=>r.low)].map(low=>({low,high:low+1.02})).filter(row=>row.low>floor+.25&&row.high<g.screenTop-.5);
          let y0=floor;
          const band=(lo,hi)=>{
            panel(ceramic,lo,hi,terracotta,.08,l,r);
            for(let y=Math.ceil(lo/.45)*.45;y<hi;y+=.45)line(l,r,y,.091,.008,'#95684f');
            const start=Math.min(au+(cu-au)*l,au+(cu-au)*r),end=Math.max(au+(cu-au)*l,au+(cu-au)*r);
            for(let u=Math.ceil(start/1.05)*1.05;u<end;u+=1.05){const t=(u-au)/(cu-au);batchBeam(detail,p(t,lo,.091),p(t,hi,.091),.008,'#9e6d51');}
          };
          for(const row of slots){
            band(y0,row.low);panel(glass,row.low+.08,row.high-.06,'#344c4b',-.65,l,r);
            // Deep angled pale sills and dark upper reveals are real geometry.
            soffits.quad(p(l,row.low,.10),p(r,row.low,.10),p(r,row.low+.16,-.65),p(l,row.low+.16,-.65),'#c2c8b7');
            soffits.quad(p(l,row.high,.10),p(l,row.high,-.65),p(r,row.high,-.65),p(r,row.high,.10),'#777f72');
            line(l,r,row.low+.03,.12,.045,'#d0d2bc');
            for(let d=l*len+.4;d<r*len;d+=4.1){const t=d/len;panel(detail,row.low,row.high,silver,.06,Math.max(l,t-.14/len),Math.min(r,t+.14/len));}
            y0=row.high;
          }
          band(y0,g.screenTop);
          soffits.quad(p(l,g.screenTop,.1),p(l,g.screenTop,-1.95),p(r,g.screenTop,-1.95),p(r,g.screenTop,.1),'#c0c7b1');
        }
        // Exposed upper studio volume above the shorter terracotta plane.
        panel(metal,g.screenTop+.1,g.bodyRoof,silver,-1.85);
        panel(glass,g.screenTop+.3,g.screenTop+1.0,'#617b72',-1.8);
        panel(glass,g.bodyRoof-1.0,g.bodyRoof-.12,'#536e63',-1.8);
        for(let d=.5;d<len;d+=1.0)batchBeam(detail,p(d/len,g.bodyRoof-1.05,-1.73),p(d/len,g.bodyRoof-.1,-1.73),.025,'#bec9b4');
      }else{
        const end=g.west?mid.u<-64:mid.u>62,southGlass=g.west&&!end;
        // Rear court façades are fragmented glass / metal and retained brick.
        panel(end||southGlass?glass:brick,upper,g.bodyRoof,end||southGlass?'#607c76':'#a27b60');
        if(end||southGlass){
          for(let y=upper;y<g.bodyRoof;y+=4.8){
            panel(metal,y,y+.8,silver,.06);
            for(let d=.5;d<len;d+=2.0)batchBeam(detail,p(d/len,Math.max(upper,y),.10),p(d/len,Math.min(g.bodyRoof,y+4.7),.10),.032,'#bac9b5');
          }
          if(end)for(let d=.15;d<len;d+=.58){const t=d/len;batchBeam(metal,p(t,6.2,.32),p(t,g.bodyRoof,.32),.065,'#a8b9a8');}
        }else{
          const cuts=[0,1];if(Math.abs(cu-au)>.1)for(const u of routeU.flatMap(u=>[u-2.1,u+2.1])){const t=(u-au)/(cu-au);if(t>0&&t<1)cuts.push(t);}cuts.sort((a,c)=>a-c);
          for(let i=0;i<cuts.length-1;i++){const l=cuts[i],r=cuts[i+1],u=au+(cu-au)*(l+r)/2;panel(brick,routeU.some(q=>Math.abs(q-u)<2.1)?g.passageCeiling:0,upper,'#a27b60',.035,l,r);}
          // Six visible rows are a façade estimate, independent of the nine-
          // level map tag. Narrow service projections keep simpler masonry.
          const count=Math.max(1,Math.round(len/3.1));
          for(let y=2.1;y<30;y+=4.9)for(let j=0;j<count;j++){
            const t=(j+.5)/count,u=au+(cu-au)*t;if(y<g.passageCeiling&&routeU.some(q=>Math.abs(q-u)<2.9))continue;
            const w=Math.min(.9,len*.65/count),l=Math.max(0,t-w/len),r=Math.min(1,t+w/len);
            panel(brick,y-.2,y+2.8,'#a27b60',.02,l,r);panel(glass,y,y+2.5,'#647c70',.06,l,r);
            for(const x of [l,t,r])batchBeam(detail,p(x,y,.10),p(x,y+2.5,.10),.028,'#cbd0b6');line(l,r,y+1.8,.11,.028,'#cbd0b6');line(l,r,y-.06,.15,.055,'#c3c4aa');
          }
        }
      }
      line(0,1,g.bodyRoof,north?-1.8:.08,.065,'#c7d0bb');
    }
    for(const part of RED_CENTRE_ROOFS.filter(p=>p.building===b.id))polygon(roofs,part.points,part.height-.03,'#a5b29f',part.holes);
    if(g.gallery){
      const {points,floor,columns}=g.gallery;polygon(concrete,points,floor,'#c5cbb5');polygon(soffits,points,floor-.22,'#bec6af',[],true);
      addCollider({points,base:b.base,bottom:floor-.22,top:floor});
      for(const col of columns){
        const bottom=terrainHeight(col.x,col.z)-b.base;batchPipe(concrete,[col.x,bottom,col.z],[col.x,floor,col.z],.27,'#c2c8b1');addCollider({x:col.x,z:col.z,radius:.3,base:b.base,bottom,top:floor});
      }
      const l=-48,r=-4,v=-6.7;
      wallPanel(glass,framePoint(f,l,v),framePoint(f,r,v),floor+.1,floor+1.05,'#709393',.02);
      batchPipe(detail,at(l,v,floor+1.05),at(r,v,floor+1.05),.035,'#c6cebb');
      for(let u=l;u<=r;u+=2.2)batchBeam(detail,at(u,v,floor),at(u,v,floor+1.05),.024,'#c4cfb8');
      for(const u of [-43,-32,-22,-6]){
        concrete.quad(at(u-.3,-11.5,11.8),at(u-.3,-5.2,11.8),at(u-.3,-5.2,10.1),at(u-.3,-11.5,10.1),'#d1d1b8');
        concrete.quad(at(u+.3,-11.5,10.1),at(u+.3,-5.2,10.1),at(u+.3,-5.2,11.8),at(u+.3,-11.5,11.8),'#d1d1b8');
        soffits.quad(at(u-.3,-11.5,10.1),at(u+.3,-11.5,10.1),at(u+.3,-5.2,10.1),at(u-.3,-5.2,10.1),'#c0c6af');
      }
    }
    // Yellow portals follow the verified Mall view; their precise dimensions
    // and placement on reconstructed recess side walls remain estimates.
    for(const route of g.routes){const u=g.local(route.points[0]).u-2.0,v=-5.5;wallPanel(detail,framePoint(f,u,v),framePoint(f,u,v+3.5),.3,5.5,'#d7b93b',.06);}
    for(const plant of g.plants){
      const ring=plant.points;for(let i=0;i<4;i++){wallPanel(metal,ring[i],ring[(i+1)%4],plant.bottom,plant.top,silver);for(let y=plant.bottom+.4;y<plant.top;y+=.75)wallPanel(detail,ring[i],ring[(i+1)%4],y,y+.018,'#a6b4a0',.02);}
      polygon(roofs,ring,plant.top,'#bdc8b0');
    }
    for(const stack of g.stacks){
      for(let j=0;j<stack.count;j++){
        const u=stack.u+(j-(stack.count-1)/2)*.83,p=framePoint(f,u,stack.v);
        batchPipe(metal,[p.x,stack.bottom,p.z],[p.x,stack.top,p.z],.30,'#c7d1bd');
        for(const h of [34.0,36.7,39.3]){const q=framePoint(f,u,stack.v);detail.box(q.x,h,q.z,.66,.06,.66,'#8f9f8d',angle);}
        for(let h=39.35;h<39.9;h+=.14){const q=framePoint(f,u,stack.v);detail.box(q.x,h,q.z,.62,.025,.62,'#7e9180',angle);}
      }
    }
    for(const seat of g.benches){
      const y=terrainHeight(seat.x,seat.z)-b.base+.22;
      for(const v of [-.2,0,.2]){const p=framePoint(f,seat.u,seat.v+v);detail.box(p.x,y+.48,p.z,seat.width,.08,.15,'#9a8060',angle);}
      for(const u of [-.85,.85]){const p=framePoint(f,seat.u+u,seat.v);detail.box(p.x,y+.25,p.z,.12,.5,.5,'#52675a',angle);}
      addCollider({points:frameRectangle(f,seat.width,seat.depth,seat.u,seat.v),base:b.base,top:y+.55});
    }
    world.add(ceramic.mesh(style('#ffffff',{vertexColors:true,roughness:.8})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.35,roughness:.46})),soffits.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})));
  }

  function oldMainBuilding(b,concrete,brick,glass,detail,roofs){
    const g=oldMainGeometry(b),f=g.frame,angle=Math.atan2(-f.u.z,f.u.x),stone=new Batch(),retaining=new Batch(),stairs=new Batch(),apron=new Batch();stone.base=retaining.base=b.base;stairs.base=apron.base=0;
    for(const part of OLD_MAIN_FRONT_APRON){shapedRoof(apron,part.points,p=>terrainHeight(p.x,p.z)+.055,'#afa69a',part.holes);groundPatches.push({...part,priority:true,heightAt:(x,z)=>terrainHeight(x,z)+.055});}
    const at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];},ivory='#d4d3bb',split=OLD_MAIN_WEST_PROFILE.splitU,faces=[];
    for(const face of g.faces){const au=g.local(face.a).u,cu=g.local(face.c).u;if((au-split)*(cu-split)<-1e-8){const t=(split-au)/(cu-au),p={x:face.a.x+(face.c.x-face.a.x)*t,z:face.a.z+(face.c.z-face.a.z)*t};faces.push({...face,c:p,len:distance2(face.a,p)},{...face,a:p,len:distance2(p,face.c)});}else faces.push(face);}
    for(const face of faces){
      const {a,c,len,normal:n}=face,au=g.local(a).u,cu=g.local(c).u,mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2}),south=mid.v>28&&n.x*f.v.x+n.z*f.v.z>.7,west=mid.u<split,roof=west?g.westRoof:g.roof;
      const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];wallPanel(brick,a,c,0,roof,'#a4765c');wallPanel(concrete,a,c,0,1.0,'#999586',.025);
      const rows=west?g.westRows:face.surveyEast?g.eastRows:south?g.southRows:g.rows;
      if(len>1.3)for(const [r,row]of rows.entries()){
        const count=Math.max(1,Math.round(len/3.5)),w=Math.min(1.9,len*.68/count);
        for(let j=0;j<count;j++){
          const t=(j+.5)/count,u=au+(cu-au)*t;if(face.surveyEast&&!oldMainEastWindowBayVisible(r,{x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t}))continue;if(south&&west&&r<2&&u>-.8&&u<12.5)continue;
          const l=t-w/len/2,h=t+w/len/2,low=row.low,high=row.high;wallPanel(detail,a,c,low-.13,high+.13,'#c5c0a5',.045,l-.09/len,h+.09/len);wallPanel(glass,a,c,low,high,(j+r)%4?'#627c79':'#8b9a8b',.075,l,h);
          for(const q of [l,t,h])batchBeam(detail,p(q,low,.10),p(q,high,.10),.032,ivory);for(const y of [low,low+(high-low)*.72,high])batchBeam(detail,p(l,y,.11),p(h,y,.11),.035,ivory);batchBeam(detail,p(l-.08/len,low-.14,.18),p(h+.08/len,low-.14,.18),.065,'#bdb9a0');if((j+r)%5===0)wallPanel(detail,a,c,high-.8,high-.12,'#b8bdac',.085,l+.05/len,h-.05/len);
        }
      }
      wallPanel(detail,a,c,roof-.35,roof,'#4c524b',.28);batchBeam(detail,p(0,roof-.38,.30),p(1,roof-.38,.30),.055,'#535c53');
    }
    for(const [kind,parts]of Object.entries(OLD_MAIN_ROOFS)){const height=kind==='west'?g.westRoof:g.roof;for(const part of parts){polygon(roofs,part.points,height-.04,'#6d776b',part.holes);if(kind==='west')for(let i=0;i<part.points.length;i++){const a=part.points[i],c=part.points[(i+1)%part.points.length];if(Math.abs(g.local(a).u-split)<1e-5&&Math.abs(g.local(c).u-split)<1e-5)wallPanel(brick,a,c,g.roof-.04,g.westRoof,'#a4765c');}}}
    const fin=OLD_MAIN_FIN,finCentre=framePoint(f,(fin.u0+fin.u1)/2,(fin.v0+fin.v1)/2),finTop=fin.roofRL-b.base;
    stone.box(finCentre.x,finTop/2,finCentre.z,fin.u1-fin.u0,finTop,fin.v1-fin.v0,'#c8af88',angle);
    const random=rng(1955),tileWidth=(fin.v1-fin.v0)/3;
    for(let y=0;y<finTop;y+=1)for(let j=0;j<3;j++){const a=framePoint(f,fin.u0-.012,fin.v0+j*tileWidth+.012),c=framePoint(f,fin.u0-.012,fin.v0+(j+1)*tileWidth-.012),shade=new THREE.Color('#c7a97e').multiplyScalar(.91+random()*.17);wallPanel(stone,c,a,y+.012,Math.min(finTop,y+.988),shade);}
    addCollider({points:fin.points,base:b.base,bottom:0,top:finTop});
    const E=MAIN_ENTRY,floor=E.floorRL-b.base,doorTop=E.doorHeadRL-b.base;
    wallPanel(stone,framePoint(f,10.0,29.04),framePoint(f,-.3,29.04),floor-.05,doorTop+.2,'#b8a68c');wallPanel(glass,framePoint(f,9.6,29.1),framePoint(f,.1,29.1),floor,doorTop,'#455d55');
    for(const u of [.1,2.5,4.8,7.2,9.6])batchBeam(detail,at(u,29.18,floor),at(u,29.18,doorTop),.04,'#bec5b8');batchBeam(detail,at(.1,29.18,doorTop-.42),at(9.6,29.18,doorTop-.42),.035,'#bbc3b7');
    for(const part of g.stairs.parts){polygon(stairs,part.points,part.rl,'#a8a291');for(let i=0;i<part.points.length;i++){const a=part.points[i],c=part.points[(i+1)%part.points.length];wallPanel(stairs,a,c,Math.min(terrainHeight(a.x,a.z),terrainHeight(c.x,c.z))-.05,part.rl,'#8e8b7d');}groundPatches.push({points:part.points,heightAt:()=>part.rl+.01});addCollider({points:part.points,base:0,top:part.rl,stepHeight:.27});}
    const retainingRandom=rng(3359);for(let row=0,y=Math.min(...g.stairs.landing.points.map(p=>terrainHeight(p.x,p.z)))-b.base;y<floor;y+=.3,row++)for(let u=E.upperEndU-(row%2)*.35;u<E.landingEast;u+=.7){const left=Math.max(E.upperEndU,u+.008),right=Math.min(E.landingEast,u+.685);if(right<=left)continue;const a=framePoint(f,right,E.landingSouth+.018),c=framePoint(f,left,E.landingSouth+.018);wallPanel(retaining,a,c,y+.006,Math.min(floor,y+.294),new THREE.Color('#999480').multiplyScalar(.92+retainingRandom()*.16));}
    const rail=(a,c,y0,y1)=>{batchPipe(detail,at(...a,y0+.96),at(...c,y1+.96),.025,'#c5cbbf');const count=Math.ceil(Math.hypot(c[0]-a[0],c[1]-a[1])/.9);for(let i=0;i<=count;i++){const t=i/count,u=a[0]+(c[0]-a[0])*t,v=a[1]+(c[1]-a[1])*t,y=y0+(y1-y0)*t;batchPipe(detail,at(u,v,y),at(u,v,y+.96),.021,'#bac4b8');}};
    for(const side of [-1,1])rail([E.bottomU+side*(E.lowerWidth/2-.12),E.bottomV],[E.bottomU+side*(E.lowerWidth/2-.12),E.lowerTopV],E.bottomRL-b.base,E.lowerLandingRL-b.base);
    for(const side of [-1,1])rail([E.turnU,E.upperCentreV+side*(E.upperWidth/2-.12)],[E.upperEndU,E.upperCentreV+side*(E.upperWidth/2-.12)],E.lowerLandingRL-b.base,floor);
    rail([E.upperEndU,E.landingSouth],[E.landingEast,E.landingSouth],floor,floor);rail([E.landingEast,E.landingSouth],[E.landingEast,E.wallV+.2],floor,floor);
    for(let u=E.upperEndU;u<E.landingEast;u+=.22)batchPipe(detail,at(u,E.landingSouth,floor),at(u,E.landingSouth,floor+.96),.014,'#bbc4b8');
    const artwork=new THREE.Mesh(falconerGeometry(),style('#ffffff',{vertexColors:true,metalness:.6,roughness:.43})),artPoint=framePoint(f,FALCONER.u,FALCONER.v);artwork.position.set(artPoint.x,FALCONER.baseRL,artPoint.z);artwork.rotation.y=Math.atan2(-f.v.z,f.v.x);artwork.castShadow=artwork.receiveShadow=true;world.add(artwork);
    for(const [kind,parts]of Object.entries(OLD_MAIN_ROOFS))for(const part of parts)addCollider({...part,base:b.base,top:kind==='west'?g.westRoof:g.roof});
    world.add(stone.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),retaining.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),apron.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('path-pavers')}),false),stairs.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})));
  }

  function businessSchool(b,concrete,brick,glass,detail,roofs){
    const g=businessGeometry(b),f=g.frame,angle=Math.atan2(-f.u.z,f.u.x),metal=new Batch(),awningGlass=new Batch(),undersides=new Batch();
    for(const batch of [metal,awningGlass,undersides])batch.base=b.base;
    const dark='#354a4b',pale='#d7ddd1',at=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];};
    for(const face of g.faces){
      const {a,c,len,normal:n,kind}=face,au=g.local(a).u,cu=g.local(c).u;
      const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
      const band=(batch,low,high,color,off=0,l=0,r=1)=>wallPanel(batch,a,c,low,high,color,off,l,r);
      const rail=(low,off=.15,radius=.025,color='#83958a',l=0,r=1)=>batchBeam(detail,p(l,low,off),p(r,low,off),radius,color);
      band(kind==='east-brick'?brick:concrete,0,b.height,kind==='east-brick'?'#92725b':'#c5cfc2');
      band(detail,0,.6,'#929c8b',.03);
      if(kind==='west-cladding'){
        band(metal,.6,b.height-.5,pale,.035);
        for(let h=1;h<b.height-.5;h+=1.9)rail(h,.055,.012,'#a3afa3');
        for(let d=1.4;d<len;d+=2.1)batchBeam(detail,p(d/len,.6,.055),p(d/len,b.height-.5,.055),.012,'#a6b1a4');
        if(len>12)for(const [i,text]of ['UNSW','Business','School'].entries())facadeCaption(b,a,c,text,2.6,4.5-i*.48,'#344a47');
      }else if(kind==='east-brick'){
        for(const row of g.rows){
          band(detail,row.low-.5,row.low-.32,'#c2c4ad',.06);
          const av=g.local(a).v,cv=g.local(c).v,den=cv-av,t=Math.abs(den)>.01?Math.max(.12,Math.min(.88,(10.2-av)/den)):.5,w=Math.min(.15,.56/len);
          band(glass,row.low+.3,row.high-.3,'#315456',.065,t-w,t+w);
          band(detail,row.low+.25,row.low+.35,'#9caea0',.085,t-w,t+w);
        }
      }else if(kind==='stair-core'){
        band(metal,.6,b.height-.5,'#ced8cb',.035);
        for(const row of g.rows){band(glass,row.low+.75,row.low+1.45,'#425d59',.06,.06,.94);band(detail,row.low+1.45,row.low+1.55,'#a7b9a8',.12,.05,.95);}
        for(let d=2;d<len;d+=2.3)batchBeam(detail,p(d/len,.7,.06),p(d/len,b.height-.5,.06),.012,'#a5b5a6');
      }else{
        // Recessed dark ground frontage, vent grilles and slim structural piers.
        band(glass,.72,4.72,'#3f615c',.055,.005,.995);
        band(detail,4.72,5.02,'#354d49',.07);
        for(let h=4.3;h<4.69;h+=.13)band(detail,h,h+.055,'#4a6059',.13);
        const groundBays=Math.max(1,Math.round(len/4.4));
        for(let i=0;i<=groundBays;i++){
          const t=i/groundBays,q=p(t,2.7,.24);detail.box(q[0],2.7,q[2],.27,4.25,.48,'#52675e',Math.atan2(-(c.z-a.z),c.x-a.x));
          if(i<groundBays){const m=(i+.5)/groundBays;batchBeam(detail,p(m,.72,.08),p(m,4.3,.08),.025,'#97a99a');}
        }
        for(const [rowIndex,row]of g.rows.entries()){
          const count=Math.max(1,Math.round(len/3.0));
          band(glass,row.low,row.high,kind==='south-grid'?'#5b8287':'#597d7a',.055,.005,.995);
          if(kind==='north-shades'){
            band(metal,row.low-.63,row.low-.03,pale,.1);
            // Five horizontal blades sit in front of each upper window band.
            for(let k=0;k<5;k++){
              const h=row.low+.35+k*(row.high-row.low-.5)/5;
              metal.quad(p(.005,h-.10,.18),p(.995,h-.10,.18),p(.995,h+.08,.94),p(.005,h+.08,.94),'#d0dbce');
              metal.quad(p(.005,h-.16,.18),p(.005,h+.02,.94),p(.995,h+.02,.94),p(.995,h-.16,.18),'#abbcae');
              metal.quad(p(.005,h+.02,.94),p(.005,h+.08,.94),p(.995,h+.08,.94),p(.995,h+.02,.94),'#d5e0d1');
            }
            for(let i=0;i<=count;i++){const t=i/count;batchBeam(detail,p(t,row.low-.05,1.0),p(t,row.high+.04,1.0),.045,'#bacfbd');}
            rail(row.high,.12,.025,'#a7bfae');
          }else{
            band(metal,row.low-.62,row.low-.07,pale,.56);
            undersides.quad(p(0,row.low-.62,.03),p(1,row.low-.62,.03),p(1,row.low-.62,.65),p(0,row.low-.62,.65),'#abbda9');
            for(let i=0;i<=count;i++){
              const t=i/count,q=p(t,(row.low+row.high)/2,.35),h=row.high-row.low+.2;
              concrete.box(q[0],q[1],q[2],.18,h,.70,'#d3dfcc',Math.atan2(-(c.z-a.z),c.x-a.x));
            }
            // A blue glazed zone interrupts the regular grid at the middle.
            const t0=(-2-au)/(cu-au),t1=(10-au)/(cu-au),l=Math.max(0,Math.min(t0,t1)),r=Math.min(1,Math.max(t0,t1));
            if(rowIndex>=3&&r>l){band(glass,row.low-.55,row.high+.05,'#668fa4',.74,l,r);for(let d=l*len;d<r*len;d+=2)batchBeam(detail,p(d/len,row.low-.55,.77),p(d/len,row.high+.05,.77),.026,'#b1c7c5');}
            for(const h of [row.low+.5,row.low+.9])rail(h,.13,.025,'#9db4a8');
            for(let i=0;i<count;i++){
              const l=(i+.08)/count,r=(i+.92)/count;
              band(detail,row.high-.72,row.high-.67,'#7e9d92',.14,l,r);
              if(rowIndex>=2)for(let h=row.low+.10;h<row.low+.5;h+=.12)band(detail,h,h+.035,'#9eb9aa',.16,l,r);
              batchBeam(detail,p((i+.5)/count,row.low,.12),p((i+.5)/count,row.high,.12),.025,'#a8bfb1');
            }
          }
        }
        if(kind==='south-grid'){
          const y=g.awningHeight,d=g.awningDepth;
          const cuts=[0,1];if(Math.abs(cu-au)>.01)for(const u of [g.canopy.u-g.canopy.width/2,g.canopy.u+g.canopy.width/2]){const t=(u-au)/(cu-au);if(t>0&&t<1)cuts.push(t);}cuts.sort((a,c)=>a-c);
          for(let i=0;i<cuts.length-1;i++){const l=cuts[i],r=cuts[i+1],u=au+(cu-au)*(l+r)/2;if(Math.abs(u-g.canopy.u)<g.canopy.width/2)continue;awningGlass.quad(p(l,y,.08),p(l,y,d),p(r,y,d),p(r,y,.08),'#a2c4bd');rail(y-.1,d,.055,'#b0c8b8',l,r);}
          for(let d0=.4;d0<len;d0+=2.2){const t=d0/len,u=au+(cu-au)*t;if(Math.abs(u-g.canopy.u)<g.canopy.width/2)continue;batchBeam(detail,p(t,y-.1,.04),p(t,y-.1,d),.055,'#c0d2c0');}
        }
      }
      band(metal,b.height-.55,b.height,'#d0dac8',.30);
      undersides.quad(p(0,b.height-.55,.01),p(1,b.height-.55,.01),p(1,b.height-.55,.52),p(0,b.height-.55,.52),'#adbda8');
    }
    polygon(roofs,b.points,b.height-.04,'#abb8aa',b.holes);
    // The entrance stair uses exact bounded tread patches, avoiding the round
    // end caps of the general mapped-stair walking helper on a broad flight.
    const stairMesh=new Batch();stairMesh.base=0;
    for(const [i,step]of g.stairs.steps.entries()){
      polygon(stairMesh,step.points,step.rl,'#aeb6a7');
      const previous=i?g.stairs.steps[i-1].rl:g.stairs.low-.08;
      for(let j=0;j<step.points.length;j++){
        const a=step.points[j],c=step.points[(j+1)%step.points.length],bottom=j===2?previous:Math.min(terrainHeight(a.x,a.z),terrainHeight(c.x,c.z))-.05;
        wallPanel(stairMesh,a,c,bottom,step.rl,'#929e90');
      }
      groundPatches.push({points:step.points,heightAt:()=>step.rl+.01});addCollider({points:step.points,base:0,top:step.rl,stepHeight:.27});
    }
    polygon(stairMesh,g.stairs.landing.points,g.stairs.landing.rl,'#b1b9aa');
    for(let i=0;i<g.stairs.landing.points.length;i++){const a=g.stairs.landing.points[i],c=g.stairs.landing.points[(i+1)%g.stairs.landing.points.length];wallPanel(stairMesh,a,c,Math.min(terrainHeight(a.x,a.z),terrainHeight(c.x,c.z))-.05,g.stairs.landing.rl,'#929f8f');}
    groundPatches.push({points:g.stairs.landing.points,heightAt:()=>g.stairs.landing.rl+.01});addCollider({points:g.stairs.landing.points,base:0,top:g.stairs.landing.rl,stepHeight:.27});
    const floor=g.stairs.landing.rl-b.base,doorLeft=g.stairs.u-3.7,doorRight=g.stairs.u+3.7;
    const doorA=framePoint(f,doorLeft,14.11),doorC=framePoint(f,doorRight,14.11);
    wallPanel(glass,doorC,doorA,floor,floor+3.0,'#3a6059',.09);
    for(const u of [doorLeft,g.stairs.u,doorRight])batchBeam(detail,at(u,14.24,floor),at(u,14.24,floor+3),.035,'#adc0aa');
    for(const side of [-1,1]){
      const u=g.stairs.u+side*(g.stairs.width/2-.2),a=at(u,g.stairs.bottomV,g.stairs.low-b.base+.85),c=at(u,g.stairs.topV,floor+.85);
      batchPipe(detail,a,c,.027,'#bac8b1');batchPipe(detail,c,at(u,g.stairs.wallV,floor+.85),.027,'#bac8b1');
      for(let i=0;i<4;i++){const t=i/3,v=g.stairs.bottomV+(g.stairs.topV-g.stairs.bottomV)*t,y=g.stairs.low+g.stairs.rise*t-b.base;batchPipe(detail,at(u,v,y),at(u,v,y+.85),.025,'#a6b6a1');}
    }
    const canopy=g.canopy,w=canopy.width/2,canopyPoint=(u,v,y)=>at(canopy.u+u,v,y);
    const canopyFaces=businessCanopyFaces(g);
    metal.quad(...canopyFaces.top,'#c0ccba');undersides.quad(...canopyFaces.bottom,'#d0d6c3');
    for(const face of canopyFaces.sides)metal.quad(...face,'#bac8b6');
    for(let u=-w+1.8;u<w;u+=1.8){batchBeam(detail,canopyPoint(u,canopy.backV,canopy.back+.015),canopyPoint(u,canopy.frontV-.35,canopy.front+.015),.014,'#667f71');batchBeam(detail,canopyPoint(u,canopy.frontV-.345,canopy.front),canopyPoint(u,canopy.frontV+.01,canopy.frontBottom),.014,'#6d8273');}
    addCollider({points:frameRectangle(f,canopy.width,canopy.frontV-canopy.backV,canopy.u,(canopy.frontV+canopy.backV)/2),base:b.base,bottom:canopy.frontBottom,top:canopy.back});
    facadeCaption(b,doorC,doorA,'UNSW Business School',6.8,floor+3.25,'#cbd5bf');
    // Two timber seats use photographed forecourt character and clear every
    // retained path envelope; their precise positions are estimates.
    const seats=new Batch(),seatPaving=new Batch();seatPaving.base=null;
    for(const seat of g.benches){
      const y=terrainHeight(seat.x,seat.z);seats.base=y;
      for(const v of [-.2,0,.2]){const p=framePoint(f,seat.u,seat.v+v);seats.box(p.x,.53,p.z,seat.width,.08,.15,'#897660',angle);}
      for(const u of [-.8,.8]){const p=framePoint(f,seat.u+u,seat.v);seats.box(p.x,.28,p.z,.12,.5,.48,'#52645a',angle);}
      const points=frameRectangle(f,2.7,1.6,seat.u,seat.v);polygon(seatPaving,points,.22,'#a7b3a0');addCollider({points:frameRectangle(f,seat.width,seat.depth,seat.u,seat.v),top:.57,base:y});
    }
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
    world.add(metal.mesh(style('#ffffff',{vertexColors:true,metalness:.32,roughness:.48})),awningGlass.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.28,depthWrite:false,side:THREE.DoubleSide,roughness:.15})),undersides.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),stairMesh.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),seats.mesh(style('#ffffff',{vertexColors:true})),seatPaving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})));
  }

  function lawBuilding(b){
    const g=lawGeometry(b),metal=new Batch(),glass=new Batch(),joints=new Batch(),concrete=new Batch(),roof=new Batch();
    for(const batch of [metal,glass,joints,concrete,roof])batch.base=b.base;
    const charcoal='#303c41',seam='#697574',silver=['#bfc3b6','#c9cabb','#d1ccae'],gold=['#c2b77f','#cfc395','#b8af83'];
    for(const face of g.faces){
      const {a,c,len,normal:n,kind}=face,au=g.local(a).u,cu=g.local(c).u;
      const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+n.x*off,y,a.z+(c.z-a.z)*t+n.z*off];
      const top=t=>g.roofAt({x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t});
      const plane=(batch,l,r,low,high,color,off=0)=>{
        if(r-l<.00001)return;const lo=t=>typeof low==='function'?low(t):low,hi=t=>typeof high==='function'?high(t):high;
        if(Math.min(hi(l)-lo(l),hi(r)-lo(r))<=0)return;
        batch.quad(p(l,lo(l),off),p(l,hi(l),off),p(r,hi(r),off),p(r,lo(r),off),color,[[l*len/2,lo(l)/2],[l*len/2,hi(l)/2],[r*len/2,hi(r)/2],[r*len/2,lo(r)/2]]);
      };
      const line=(l,r,y,off=.1,width=.025,color=seam)=>batchBeam(joints,p(l,typeof y==='function'?y(l):y,off),p(r,typeof y==='function'?y(r):y,off),width,color);
      // Smooth metal shell and a low concrete plinth follow the retained ring.
      plane(metal,0,1,0,top,charcoal);
      plane(concrete,0,1,0,.82,'#93998b',.015);
      plane(glass,0,1,.82,t=>top(t)-.26,'#527472',.055);
      const cut=kind==='mall'?-3:2;
      const cuts=[0,1];if(Math.abs(cu-au)>.01){const t=(cut-au)/(cu-au);if(t>0&&t<1)cuts.splice(1,0,t);}
      if(kind==='mall'||kind==='union')for(let section=0;section<cuts.length-1;section++){
        const l=cuts[section],r=cuts[section+1],u=(au+(cu-au)*(l+r)/2),folded=u>cut;
        if(!folded){
          const bands=kind==='mall'?g.mallBands:g.unionBands;
          for(const [low,high] of bands){
            // Projecting dark spandrels have a pale underside and beveled return.
            metal.quad(p(l,low,1.02),p(l,high,.67),p(r,high,.67),p(r,low,1.02),charcoal);
            concrete.quad(p(l,low,.04),p(r,low,.04),p(r,low,1.02),p(l,low,1.02),'#c6cabb');
            for(const t of [l,r])metal.quad(p(t,low,.04),p(t,high,.04),p(t,high,.67),p(t,low,1.02),'#253439');
            line(l,r,low,1.04,.028,'#697774');line(l,r,high,.69,.025,'#7c8983');
            const count=Math.max(1,Math.ceil((r-l)*len/2.6));
            for(let i=1;i<count;i++){const t=l+(r-l)*i/count;batchBeam(joints,p(t,low+.05,1.02),p(t,high-.04,.69),.012,'#1f3033');}
          }
          plane(metal,l,r,t=>top(t)-.65,top,charcoal,.76);line(l,r,t=>top(t),.79,.045,'#8c9890');
          const rows=kind==='mall'?[[.86,5.6],[6.8,8.7],[10,11.9],[12.85,14.6]]:[[.86,3.35],[4.7,6.8],[8.05,10.15],[11.45,14.6]];
          for(const [low,high]of rows){
            const count=Math.max(1,Math.round((r-l)*len/1.55));
            for(let i=0;i<=count;i++){const t=l+(r-l)*i/count,h=Math.min(high,top(t)-.68);if(h>low)batchBeam(joints,p(t,low,.075),p(t,h,.075),.022,'#8f9f92');}
            if(low<5.5)line(l,r,(low+high)/2,.08,.021,'#819586');
          }
          for(const t of [l,r]){
            const h=top(t),w=Math.min(.42/len,(r-l)/6);
            plane(metal,Math.max(l,t-w),Math.min(r,t+w),.8,h,charcoal,.82);
          }
        }else{
          const south=kind==='mall',uAt=t=>au+(cu-au)*t;
          const slope=t=>south?Math.max(.95,Math.min(5.0,1.0+(uAt(t)+3)*.14)):3.25;
          const count=Math.max(1,Math.ceil((r-l)*len/3.2));
          for(let k=0;k<count;k++){
            const x=l+(r-l)*k/count,y=l+(r-l)*(k+1)/count,shift=Math.min((y-x)*.12,.32/len),off=k%3===0?.58:.32;
            // Large uninterrupted gold planes, separated by diagonal glazing slits.
            metal.quad(p(x+shift,slope(x)+1.04,off+.18),p(x,top(x)-.23,off),p(y-.025/len,top(y)-.23,off),p(y+shift-.04/len,slope(y)+1.04,off+.18),gold[k%3]);
            for(const h of [6.65,10.1])if(h>Math.max(slope(x),slope(y))+1.2)line(x+.035/len,y-.04/len,h,off+.2,.014,'#a39f7c');
            if(k>0)batchBeam(joints,p(x+shift,slope(x)+1.05,off+.2),p(x,top(x)-.23,off+.02),.019,'#9a9f84');
          }
          metal.quad(p(l,slope(l),.95),p(l,slope(l)+1.05,.76),p(r,slope(r)+1.05,.76),p(r,slope(r),.95),charcoal);
          concrete.quad(p(l,slope(l),.02),p(r,slope(r),.02),p(r,slope(r),.95),p(l,slope(l),.95),'#d0d2bc');
          line(l,r,slope,.96,.035,'#6b7a73');
          for(let d=l*len+.6;d<r*len;d+=1.6){const t=d/len;batchBeam(joints,p(t,.85,.08),p(t,Math.max(1.6,slope(t)),.08),.025,'#778e85');}
          plane(metal,l,r,t=>top(t)-.25,top,charcoal,.42);
        }
      }else{
        // The side elevation is a sequence of full-height folded silver piers,
        // not the small decorative triangles of the old generic facade.
        const count=Math.max(1,Math.round(len/3.8));
        for(let k=0;k<count;k++){
          const l=k/count,r=(k+1)/count,w=r-l,shift=w*.28;
          const lower=l+w*.08,upper=l+w*.05,right=r-w*.21;
          const off=k%3===1?.7:.42;
          metal.quad(p(lower+shift,.25,off+.15),p(upper,top(upper)-.2,off),p(right,top(right)-.2,off),p(right-shift,.25,off+.15),silver[k%3]);
          metal.quad(p(lower+shift,.25,.05),p(upper,top(upper)-.2,.05),p(upper,top(upper)-.2,off),p(lower+shift,.25,off+.15),'#4e5f61');
          for(const h of [4.3,8.25,11.55]){
            const leftMix=(h-.25)/(top(upper)-.45),rightMix=(h-.25)/(top(right)-.45),left=lower+shift+(upper-lower-shift)*leftMix,rightAt=right-shift+shift*rightMix;
            line(left+.02/len,rightAt-.02/len,h,off+.15*(1-leftMix)+.012,.012,'#8e9b91');
          }
        }
        for(const h of [4.3,8.25,11.55])line(0,1,h,.08,.022,'#84998f');
        plane(metal,0,1,t=>top(t)-.2,top,'#9ca99e',.24);
      }
      // A fine continuous folded perimeter edge replaces the flat parapet.
      line(0,1,top,.28,.035,'#88958e');
    }
    shapedRoof(roof,b.points,g.roofAt,'#9aa59d');
    // Closed entrance glazing is exterior detail; the occupied shell stays solid.
    for(const face of g.faces.filter(f=>(f.kind==='mall'||f.kind==='union')&&f.mid.u>0&&f.len>5)){
      const {a,c,len,normal:n}=face,t=.5,w=Math.min(.24,1.7/len),ground=Math.max(terrainHeight(a.x,a.z),terrainHeight(c.x,c.z))-b.base;
      wallPanel(glass,a,c,ground+.05,ground+2.55,'#365652',.13,t-w,t+w);
      for(const x of [t-w,t,t+w])batchBeam(joints,[a.x+(c.x-a.x)*x+n.x*.16,ground+.05,a.z+(c.z-a.z)*x+n.z*.16],[a.x+(c.x-a.x)*x+n.x*.16,ground+2.55,a.z+(c.z-a.z)*x+n.z*.16],.025,'#a6b0a0');
      for(const x of [t-.08,t+.08]){const px=a.x+(c.x-a.x)*x+n.x*.19,pz=a.z+(c.z-a.z)*x+n.z*.19;batchPipe(joints,[px,ground+.85,pz],[px,ground+1.35,pz],.018,'#c2c9b7');}
    }
    const label=g.faces.find(f=>f.kind==='mall'&&f.mid.u>15&&f.len>8);
    if(label)facadeCaption(b,label.a,label.c,'Law & Justice Building',5.5,3.0,'#c6ccbb');
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
    const glazing=glass.mesh(style('#ffffff',{vertexColors:true,roughness:.12,metalness:.62,envMapIntensity:1.0}));
    world.add(metal.mesh(style('#ffffff',{vertexColors:true,roughness:.39,metalness:.48})),joints.mesh(style('#ffffff',{vertexColors:true,roughness:.42,metalness:.35})),concrete.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),bumpScale:.02})),roof.mesh(style('#ffffff',{vertexColors:true,roughness:.7,metalness:.25})),glazing);
    medicalReflection(glazing,framePoint(g.frame,-13,29),b.base+7);
  }

  function quadrangleBuilding(b,concrete,brick,glass,detail,roofs){
    const g=quadrangleGeometry(b),f=g.frame,y=rl=>rl-b.base,angle=Math.atan2(-f.u.z,f.u.x);
    const original=(a,c)=>b.points.some((p,i)=>{const q=b.points[(i+1)%b.points.length],dx=q.x-p.x,dz=q.z-p.z,len=Math.hypot(dx,dz),t=r=>((r.x-p.x)*dx+(r.z-p.z)*dz)/(len*len);return Math.abs(dx*(a.z-p.z)-dz*(a.x-p.x))/len<.015&&Math.abs(dx*(c.z-p.z)-dz*(c.x-p.x))/len<.015&&Math.min(t(a),t(c))>-.001&&Math.max(t(a),t(c))<1.001;});
    const floor=new Batch();
    for(const part of QUADRANGLE_PARTS){
      const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points,covered=part.kind!=='main',bottom=covered?y(part.kind==='east-link'?g.eastBottom:g.ceilingRL):0;
      shapedRoof(roofs,part.points,p=>y(g.roofAt(p)),'#a8b4a6',part.holes);
      if(covered&&bottom<y(g.ceilingRL)+.3)polygon(concrete,part.points,y(g.galleryTopRL),'#c4cbb9',part.holes,true);
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2}),ext=original(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z,nv=nx*f.v.x+nz*f.v.z;
        const court=ext&&(nv<-.7&&mid.v<10&&mid.v>0&&mid.u>-31&&mid.u<53||nu>.7&&mid.u>-35&&mid.u<-28&&mid.v<10||nu<-.7&&mid.u>51&&mid.u<57&&mid.v<10);
        const clock=ext&&mid.u>g.tower.u-3.7&&mid.u<g.tower.u+3.7&&mid.v<10;
        const top=Math.min(y(g.roofAt(a)),y(g.roofAt(c))),deck=y(g.ceilingRL)+.24,galleryTop=y(g.galleryTopRL),clerestory=y(g.clerestoryRL);
        const p=(t,h,off=0)=>[a.x+(c.x-a.x)*t+nx*off,h,a.z+(c.z-a.z)*t+nz*off];
        if(clock)continue;
        if(court&&covered&&bottom<deck+.1){
          wallPanel(brick,a,c,bottom,deck+.68,'#b8a274');
          // A real recess between the gallery parapet and soffit, with the
          // occupied wing wall behind, replaces the former opaque fake arcade.
          for(const h of [deck+.9,deck+1.15])batchBeam(detail,p(0,h,.11),p(1,h,.11),.035,'#55716d');
          for(let d=.2;d<len;d+=2.2)batchBeam(detail,p(d/len,deck+.6,.11),p(d/len,deck+1.15,.11),.03,'#627c75');
          for(let d=.3;d<len;d+=4.4)batchBeam(detail,p(d/len,deck,.12),p(d/len,galleryTop,.12),.055,'#607c78');
        }else wallPanel(brick,a,c,bottom,Math.max(bottom,galleryTop),'#b99c6e');
        if(ext){
          wallPanel(concrete,a,c,Math.max(bottom,galleryTop),clerestory,'#d4c08e',.025);
          wallPanel(glass,a,c,Math.max(bottom,clerestory),top-.14,'#456d72',.045);
          wallPanel(detail,a,c,clerestory-.16,clerestory+.02,'#546d69',.09);
          wallPanel(detail,a,c,top-.15,top+.05,'#c8cbb6',.38);
          if(len>3){
            const bays=Math.max(1,Math.round(len/3.1)),w=1/bays;
            for(let k=0;k<bays;k++){
              const l=k*w+w*.16,r=(k+1)*w-w*.16,low=Math.max(galleryTop+.55,bottom+.3),high=clerestory-.45;
              if(high>low){
                wallPanel(glass,a,c,low,high,'#35575b',.075,l,r);
                for(const h of [low-.07,high])wallPanel(detail,a,c,h,h+.08,'#b3b99e',.10,l-.08/len,r+.08/len);
                if(k%4!==2){for(let h=low+.12;h<high;h+=.18)wallPanel(detail,a,c,h,h+.035,'#7a8980',.11,l,r);}
                else wallPanel(detail,a,c,low,high,'#aab6a4',.12,(l+r)/2-.04/len,(l+r)/2+.04/len);
              }
              wallPanel(detail,a,c,Math.max(bottom,clerestory),top-.15,'#54716c',.10,k*w-.035/len,k*w+.035/len);
              if(!court&&bottom<galleryTop-2){
                const l0=l+.1*w,r0=r-.1*w;
                wallPanel(glass,a,c,Math.max(bottom+.7,y(g.courtRL)+.7),Math.max(bottom+1.3,y(g.courtRL)+2.7),'#48615c',.055,l0,r0);
              }
              if(court&&k%6===3&&len>12){
                const bl=Math.max(0,k*w-w*.7),br=Math.min(1,(k+1)*w+w*.7),level=galleryTop+.12,hood=clerestory-.05;
                detail.quad(p(bl,level,.03),p(br,level,.03),p(br,level,1.35),p(bl,level,1.35),'#b4bea9');
                detail.quad(p(bl,level-.17,1.35),p(br,level-.17,1.35),p(br,level,1.35),p(bl,level,1.35),'#aab59f');
                for(const h of [level+.45,level+.75,level+1.0])batchBeam(detail,p(bl,h,1.28),p(br,h,1.28),.027,'#4e6c69');
                for(const t of [bl,br]){batchBeam(detail,p(t,level,1.28),p(t,level+1.0,1.28),.04,'#506e6a');batchBeam(detail,p(t,hood+.35,.1),p(t,hood,1.45),.055,'#59736d');}
                detail.quad(p(bl,hood,.02),p(br,hood,.02),p(br,hood,1.5),p(bl,hood,1.5),'#6c8276');
                wallPanel(glass,a,c,level+.05,hood-.15,'#406b70',.13,bl+.12/len,br-.12/len);
                for(let i=1;i<4;i++){const t=bl+(br-bl)*i/4;wallPanel(detail,a,c,level+.05,hood-.15,'#97afa1',.145,t-.04/len,t+.04/len);}
              }
            }
          }
          // Angled blue-grey brackets support the high glazing and eave.
          if(court)for(let d=.5;d<len;d+=6.2)batchBeam(detail,p(d/len,clerestory+.1,.13),p(d/len,top-.1,.6),.07,'#426564');
        }else wallPanel(brick,a,c,Math.max(bottom,galleryTop),top,'#b99c6e');
        const galleryBack=!ext&&part.kind==='main'&&(Math.abs(mid.v-10.3)<.03&&nv<-.7||Math.abs(mid.u+34.7)<.03&&nu>.7||Math.abs(mid.u-56.5)<.03&&nu<-.7);
        if(galleryBack){
          for(const [lo,hi]of [[y(g.courtRL)+.45,y(g.ceilingRL)-.35],[deck+.45,galleryTop-.25]]){
            wallPanel(glass,a,c,lo,hi,'#2d4644',.05,.02,.98);
            for(let d=.4;d<len;d+=3.2)wallPanel(detail,a,c,lo,hi,'#81917e',.075,d/len,Math.min(.98,(d+.07)/len));
          }
        }
      }
      if(covered){
        polygon(concrete,part.points,bottom,'#c5cbb8',part.holes,true);polygon(concrete,part.points,bottom+.24,'#b8c1ac',part.holes);
        polygon(floor,part.points,.225,'#acaa91',part.holes);
        groundPatches.push({points:part.points,heightAt:(x,z)=>terrainHeight(x,z)+.225});
      }
      addCollider({points:part.points,holes:part.holes,bottom,top:Math.max(...part.points.map(p=>y(g.roofAt(p)))),base:b.base});
    }
    for(const column of g.columns){
      const bottom=terrainHeight(column.x,column.z)-b.base,top=y(g.ceilingRL),h=top-bottom;
      brick.box(column.x,bottom+h/2,column.z,.48,h,.65,'#b99a67',angle);
      detail.box(column.x+f.u.x*.25,bottom+h/2,column.z+f.u.z*.25,.10,h,.68,'#dbd6b8',angle);
      if(Math.abs(column.v-5.65)<.01)detail.box(column.x+f.v.x*.5,top+.10,column.z+f.v.z*.5,.56,.20,1.5,'#c4cbb9',angle);
      addCollider({x:column.x,z:column.z,radius:.32,base:b.base,top});
    }
    // Stepped brick tower at the mapped central projection. The open ground
    // portal, upper arch and open steel-tied crown are independent components.
    const t=g.tower,towerBase=t.ground-b.base,at=(u,v)=>framePoint(f,t.u+u,t.northV+v);
    const box=(u,v,w,d,lo,hi,color,batch=brick)=>{const p=at(u,v);batch.box(p.x,towerBase+(lo+hi)/2,p.z,w,hi-lo,d,color,angle);};
    for(const u of [-2.7,2.7])for(const v of [.5,6.7]){box(u,v,1.2,1.05,0,4.25,'#b49a6a');const p=at(u,v);addCollider({points:frameRectangle(f,1.2,1.05,t.u+u,t.northV+v),base:t.ground,top:4.25});}
    box(0,3.6,6.8,7.35,4.25,4.55,'#d6d4ba',detail);
    for(const u of [-2.7,2.7])box(u,3.6,1.2,7.2,4.55,8.3,'#b49a6a');
    const spring=6.0,apex=7.85;
    wallPanel(glass,at(-2.1,3.5),at(2.1,3.5),towerBase+4.55,towerBase+7.9,'#2b4240',.04);
    for(const h of [5.0,5.3,5.6]){const a=at(-2.1,-.12),c=at(2.1,-.12);batchBeam(detail,[a.x,towerBase+h,a.z],[c.x,towerBase+h,c.z],.025,'#526c61');}
    for(let k=0;k<20;k++){
      const u0=-2.1+4.2*k/20,u1=-2.1+4.2*(k+1)/20,a=at(u0,-.02),c=at(u1,-.02),h0=spring+(apex-spring)*Math.sqrt(Math.max(0,1-(u0/2.1)**2)),h1=spring+(apex-spring)*Math.sqrt(Math.max(0,1-(u1/2.1)**2));
      brick.quad([a.x,towerBase+h0,a.z],[a.x,towerBase+8.3,a.z],[c.x,towerBase+8.3,c.z],[c.x,towerBase+h1,c.z],'#b49a6a');
    }
    box(0,3.6,6.6,7.2,8.3,22.8,'#b49a6a');
    for(const level of [8.3,12,17.7,22.8])box(0,3.6,6.85,7.45,level,level+.14,'#d0c7a6',detail);
    const fa=at(-3.3,-.025),fc=at(3.3,-.025);
    for(const [lo,hi,width]of [[9.1,11.3,.9],[18.2,19.2,1.4],[19.9,22.45,3.3]]){
      const l=(6.6-width)/13.2,r=1-l;wallPanel(detail,fa,fc,towerBase+lo-.07,towerBase+hi+.07,'#c1c3a8',.03,l-.01,r+.01);wallPanel(detail,fa,fc,towerBase+lo,towerBase+hi,'#3e514e',.05,l,r);
      for(let h=lo+.13;h<hi;h+=.16)wallPanel(detail,fa,fc,towerBase+h,towerBase+h+.045,'#7f8f82',.08,l,r);
    }
    for(const u of [-2.85,2.85])for(const v of [.45,6.75])box(u,v,.9,.9,22.8,26.95,'#b49a6a');
    for(const h of [23,24.7,26.85])for(const v of [.4,6.8]){const a=at(-3.25,v),c=at(3.25,v);batchBeam(detail,[a.x,towerBase+h,a.z],[c.x,towerBase+h,c.z],.12,'#3c5c5d');}
    for(const h of [23,26.85])for(const u of [-2.85,2.85]){const a=at(u,.05),c=at(u,7.15);batchBeam(detail,[a.x,towerBase+h,a.z],[c.x,towerBase+h,c.z],.10,'#3c5c5d');}
    // Procedural Roman-hour motif follows the square sundial, rather than the
    // circular clock texture used by the old placeholder.
    const dial=canvasTexture(1024,1024,(ctx,w,h)=>{
      ctx.clearRect(0,0,w,h);ctx.fillStyle='#433e30';ctx.strokeStyle='rgba(75,65,45,.65)';ctx.lineWidth=2;ctx.font='64px serif';ctx.textAlign='center';ctx.textBaseline='middle';
      const hours=[['VI',.08,.12],['V',.09,.29],['IV',.09,.47],['III',.16,.65],['II',.28,.81],['I',.41,.91],['XII',.53,.94],['XI',.66,.89],['X',.79,.78],['IX',.89,.61],['VIII',.91,.43],['VII',.91,.27],['VI',.91,.12]];
      for(const [text,x,z]of hours){ctx.beginPath();ctx.moveTo(w*.5,h*.28);ctx.lineTo(w*x,h*z);ctx.stroke();ctx.fillText(text,w*x,h*z);}ctx.fillText('M M I',w*.5,h*.09);
    });
    const clock=new THREE.Mesh(new THREE.PlaneGeometry(4.7,4.7),new THREE.MeshStandardMaterial({map:dial,transparent:true,roughness:.85,depthWrite:false})),face=at(0,-.09);
    clock.position.set(face.x,t.ground+14.75,face.z);clock.rotation.y=Math.atan2(-f.v.x,-f.v.z);world.add(clock);
    const root=at(0,-.14),tip=at(0,-1.6);detail.triangle([root.x,towerBase+15.7,root.z],[root.x,towerBase+14.7,root.z],[tip.x,towerBase+13.7,tip.z],'#4b5144');
    facadeCaption(b,at(-2.1,-.02),at(2.1,-.02),'Quadrangle',4.5,towerBase+4.4,'#344b40');
    world.add(floor.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')}),false));
    basserCanopies(g);
  }

  function basserCanopies(g){
    const f=g.frame,b=g.basser,roof=new Batch(),steel=new Batch();roof.base=steel.base=0;
    const at=(u,v)=>framePoint(f,u,v),point=(u,v)=>{const p=at(u,v);return [p.x,b.roofAt(p),p.z];};
    for(let leaf=0;leaf<b.leaves;leaf++){
      const u0=b.startU+(b.endU-b.startU)*leaf/b.leaves+.08,u1=b.startU+(b.endU-b.startU)*(leaf+1)/b.leaves-.08;
      for(let i=0;i<16;i++){
        const v0=b.centreV-b.width/2+b.width*i/16,v1=b.centreV-b.width/2+b.width*(i+1)/16;
        roof.quad(point(u0,v0),point(u0,v1),point(u1,v1),point(u1,v0),i%2?'#b8c3ae':'#a9b9a7');
      }
      for(const u of [u0,u1])for(let i=0;i<16;i++)batchBeam(steel,point(u,b.centreV-b.width/2+b.width*i/16),point(u,b.centreV-b.width/2+b.width*(i+1)/16),.065,'#3d6272');
      for(const v of [b.centreV-b.width/2,b.centreV+b.width/2])batchBeam(steel,point(u0,v),point(u1,v),.075,'#456b78');
      // Fine corrugations along the barrel-shaped sheet.
      for(let u=u0+.15;u<u1;u+=.25)for(let i=0;i<8;i++)batchBeam(roof,point(u,b.centreV-b.width/2+b.width*i/8),point(u,b.centreV-b.width/2+b.width*(i+1)/8),.013,'#c4ccba');
    }
    for(const p of b.supports){
      const {u,v}=p,top=point(u,v),base=terrainHeight(p.x,p.z)+.1;
      batchPipe(steel,[p.x,base,p.z],top,.10,'#416776');addCollider({x:p.x,z:p.z,radius:.15,top:top[1],base:0});
      const c=point(u,b.centreV+(v-b.centreV)*.5);batchBeam(steel,[p.x,top[1]-.8,p.z],c,.065,'#416776');
    }
    world.add(roof.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,metalness:.18,roughness:.6})),steel.mesh(style('#ffffff',{vertexColors:true,metalness:.2})));
  }

  function electricalBuilding(b,concrete,brick,glass,detail,roofs){
    const g=electricalGeometry(b),f=g.frame,top=ELECTRICAL_LEVELS.parapetRL-b.base,angle=Math.atan2(-f.u.z,f.u.x);
    const ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    // Original brick piers stay proud of the recessed glazed base. Five upper
    // window rows are independent of the retained eight-level map tag.
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),mid=g.local({x:(a.x+c.x)/2,z:(a.z+c.z)/2});
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
      const p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
      const south=mid.v>24,low=south?35.05-b.base:38.6-b.base;
      wallPanel(brick,a,c,0,top,'#aa775e');
      if(len>7&&!(south&&mid.u>-20&&mid.u<-10&&mid.v>46)){
        const bays=Math.max(1,Math.round(len/6)),step=len/bays;
        for(let k=0;k<bays;k++){
          const l=(k*step+.68)/len,r=((k+1)*step-.68)/len;
          if(r<=l)continue;
          // Glazing is recessed behind pale concrete undercroft columns.
          wallPanel(glass,a,c,Math.max(.3,low+.1),g.upperFloorRL-b.base-.2,'#425f61',.025,l,r);
          wallPanel(detail,a,c,g.upperFloorRL-b.base-.25,g.upperFloorRL-b.base,'#dddcc8',.12,l,r);
          for(let row=0;row<g.upperRows;row++){
            const bottom=g.upperFloorRL+row*g.storey-b.base,high=Math.min(top-.32,bottom+g.storey-.12);
            wallPanel(detail,a,c,bottom,high,'#465562',.035,l,r);
            // Small ceramic joints in the blue-grey spandrel panels.
            for(let y=bottom+.24;y<bottom+1.02;y+=.23)wallPanel(detail,a,c,y,y+.018,'#647079',.045,l,r);
            for(let t=l;t<r;t+=.52/len)wallPanel(detail,a,c,bottom+.08,bottom+1.04,'#606973',.05,t,Math.min(r,t+.016/len));
            const projected=south&&nz>.5&&mid.u>-10&&mid.u<21&&row<3,off=projected?.62:.10;
            wallPanel(glass,a,c,bottom+1.1,high,'#496c82',off,l,r);
            const edge=projected?'#252c30':'#d2cdbc';
            for(const t of [l,(l+r)/2,r])wallPanel(detail,a,c,bottom+1.02,high+.04,edge,off+.025,Math.max(l-.014,t-.045/len),Math.min(r+.014,t+.045/len));
            if(!projected)for(const t of [l+(r-l)/4,l+(r-l)*3/4])wallPanel(detail,a,c,bottom+1.15,high,'#b9c8c5',off+.02,t-.025/len,t+.025/len);
            for(const y of [bottom+1.04,high])wallPanel(detail,a,c,y,y+.065,edge,off+.045,l,r);
            if(projected){
              for(const t of [l,r])detail.quad(p(t,bottom+1.04,.07),p(t,high+.07,.07),p(t,high+.07,.66),p(t,bottom+1.04,.66),'#262f31');
              detail.quad(p(l,bottom+1.04,.07),p(r,bottom+1.04,.07),p(r,bottom+1.04,.66),p(l,bottom+1.04,.66),'#263033');
            }
          }
          // Retained concrete undercroft structure at each brick-pier line.
          if(south){const q=p(k/bays,(low+g.upperFloorRL-b.base)/2,.15);detail.box(q[0],q[1],q[2],.42,g.upperFloorRL-b.base-low,.42,'#d4d7c7');}
        }
      }
      wallPanel(detail,a,c,top-.2,top,'#d8d5bf',.34);
      detail.quad(p(0,top-.2,.04),p(1,top-.2,.04),p(1,top-.2,.42),p(0,top-.2,.42),'#c9cbb8');
      // Fine roof terrace guard, separate from the translucent plant screens.
      batchBeam(detail,p(0,top+.95,.04),p(1,top+.95,.04),.045,'#6f7b78');
      for(let d=.4;d<len;d+=.72)batchBeam(detail,p(d/len,top,.04),p(d/len,top+.95,.04),.026,'#7f8983');
    }
    polygon(roofs,b.points,top-.08,'#9eaba1',b.holes);
    const prism=(points,bottom,high,color,batch)=>{
      const r=polygonArea(points)<0?[...points].reverse():points;
      for(let i=0;i<r.length;i++)wallPanel(batch,r[i],r[(i+1)%r.length],bottom,high,color);
      polygon(roofs,r,high,'#b7c1b4');
    };
    for(const core of g.cores){
      const h=core.roofRL-b.base;prism(core.points,0,h,'#aa7b5e',brick);
      const q=framePoint(f,core.u,core.v);detail.box(q.x,h+.1,q.z,core.width+.5,.2,core.length+.5,'#d7d7c2',angle);
    }
    // White breeze-block stair screen on the south frontage, seen in the
    // completed contractor photograph. Perforations are actual open geometry.
    const screenV=46.13;
    const s0=framePoint(f,28.5,screenV),s1=framePoint(f,34.1,screenV);
    wallPanel(detail,s1,s0,6.1,top-.5,'#344342',-.03);
    for(let y=6.2;y<top-.6;y+=.38)for(let u=28.6;u<34;u+=.38){
      const q=framePoint(f,u,screenV+.16);detail.box(q.x,y,q.z,.38,.055,.18,'#d2d3bf',angle);
      const q2=framePoint(f,u,screenV+.16);detail.box(q2.x,y+.17,q2.z,.055,.34,.18,'#d2d3bf',angle);
      const a=framePoint(f,u+.04,screenV+.27),c=framePoint(f,u+.29,screenV+.27);
      batchBeam(detail,[a.x,y+.04,a.z],[c.x,y+.30,c.z],.044,'#d4d5c0');
    }
    // Folded translucent polycarbonate enclosures have labelled plant RL;
    // their dimensions, corrugation pitch and positions remain estimates.
    const plants=new Batch();plants.base=b.base;
    for(const enclosure of g.plants){
      const r=enclosure.points,roof=ELECTRICAL_LEVELS.plantRL-b.base;
      prism(r,top,top+.7,'#394745',detail);
      for(let j=0;j<r.length;j++){
        const a=r[j],c=r[(j+1)%r.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
        const n=Math.max(1,Math.round(len/5.2));
        for(let k=0;k<n*2;k++){
          const make=(t,y,off)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
          const t0=k/(n*2),t1=(k+1)/(n*2),o0=k%2?.55:0,o1=k%2?0:.55;
          plants.quad(make(t0,top+.7,o0),make(t0,roof-(k%2?.35:0),o0),make(t1,roof-(k%2?0:.35),o1),make(t1,top+.7,o1),k%2?'#cad9d9':'#afc7cf');
          batchBeam(detail,make(t0,top+.7,o0+.025),make(t0,roof-(k%2?.35:0),o0+.025),.055,'#d1d9cd');
          batchBeam(detail,make(t0,roof-(k%2?.35:0),o0),make(t1,roof-(k%2?0:.35),o1),.075,'#ccd4c8');
          for(let t=t0+.32/len;t<t1;t+=.32/len){const off=o0+(o1-o0)*(t-t0)/(t1-t0);batchBeam(plants,make(t,top+.7,off+.015),make(t,roof-.4,off+.015),.018,'#d3dddb');}
        }
      }
      polygon(roofs,r,roof-.4,'#bdcbc5');
    }
    world.add(plants.mesh(style('#ffffff',{vertexColors:true,roughness:.5,metalness:.12})));
    // Stair enclosure and exhaust / lightning components use separate labels.
    const stair=frameRectangle(f,10.5,7,-35.5,35.2);prism(stair,top-.1,ELECTRICAL_LEVELS.stairRL-b.base,'#c5c9b9',detail);
    for(const mast of g.masts)batchPipe(detail,[mast.x,mast.from-b.base,mast.z],[mast.x,mast.rl-b.base,mast.z],.065,'#9aa9a0');
    for(const flue of g.flues){batchPipe(detail,[flue.x,ELECTRICAL_LEVELS.plantRL-b.base-.2,flue.z],[flue.x,flue.rl-b.base,flue.z],.23,'#aab5ac');detail.box(flue.x,flue.rl-b.base,flue.z,.58,.12,.58,'#c3cabe');}
    const labelA=framePoint(f,-18.6,49.57),labelB=framePoint(f,-12,49.57);
    facadeCaption(b,labelB,labelA,'Electrical Engineering Building',6.8,2.5,'#26392f');
    // Exterior model: original building perimeter remains solid. The separately
    // mapped Rex covered link is outside this collider and stays walkable.
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
  }

  function electricalOutdoor(){
    const g=electricalGround,f=g.frame,angle=Math.atan2(-f.u.z,f.u.x);
    const concrete=new Batch(),paving=new Batch(),wood=new Batch(),rails=new Batch(),leaves=new Batch();
    for(const batch of [concrete,paving,wood,rails,leaves])batch.base=0;
    const solid=(points,top,color,batch=concrete)=>{
      const ring=polygonArea(points)<0?[...points].reverse():points;
      polygon(batch,ring,top,color);
      for(let i=0;i<ring.length;i++)wallPanel(batch,ring[i],ring[(i+1)%ring.length],g.lowGround-.3,top,color);
    };
    for(const points of g.lowParts)solid(points,g.lowGround+.22,'#b5b9a8',paving);
    for(const tier of g.tiers){
      const top=tier.ground+.22;solid(tier.points,top,'#bfc5b3');
      addCollider({points:tier.points,bottom:g.lowGround,top,base:0,stepHeight:.18});
      const us=tier.points.map(p=>g.local(p).u),front=Math.min(...us);
      for(let plank=0;plank<4;plank++){
        const strip=clipFrameStrip(tier.points,{...f,v:f.u},front+.1+plank*.13,front+.21+plank*.13);
        polygon(wood,strip,top+.035,plank%2?'#937653':'#80694a');
      }
    }
    for(const step of g.steps)solid(step.points,step.ground+.22,'#b7bda9');
    shapedRoof(paving,g.ramp,p=>courtGround(p.x,p.z)+.22,'#b5b9a8');
    // Retaining skirts close the refined link's cut in the coarser ground.
    const bridgeRing=polygonArea(g.bridge)<0?[...g.bridge].reverse():g.bridge;
    for(let i=0;i<bridgeRing.length;i++){
      const a=bridgeRing[i],b=bridgeRing[(i+1)%bridgeRing.length],n=Math.max(1,Math.ceil(distance2(a,b)/.5));
      for(let k=0;k<n;k++){const p={x:a.x+(b.x-a.x)*k/n,z:a.z+(b.z-a.z)*k/n},q={x:a.x+(b.x-a.x)*(k+1)/n,z:a.z+(b.z-a.z)*(k+1)/n};
        if(inElectricalCourt((p.x+q.x)/2,(p.z+q.z)/2))continue;
        const ph=Math.max(g.lowGround+.22,demHeight(p.x,p.z)+.22),qh=Math.max(g.lowGround+.22,demHeight(q.x,q.z)+.22);
        concrete.quad([p.x,g.lowGround+.21,p.z],[p.x,ph,p.z],[q.x,qh,q.z],[q.x,g.lowGround+.21,q.z],'#a1aa96');
      }
    }
    // The stair aisle has the same eighteen discrete levels in rendering and
    // movement. The handrail rises continuously along its northern side.
    const railPoint=(t,y)=>{const p=framePoint(f,g.startU+(g.endU-g.startU)*t,g.aisleV+.13);return [p.x,g.lowGround+g.rise*t+y,p.z];};
    batchPipe(rails,railPoint(0,1.16),railPoint(1,1.16),.035,'#8b9c91');
    for(let i=0;i<=6;i++)batchPipe(rails,railPoint(i/6,.22),railPoint(i/6,1.16),.028,'#87998d');
    const shrub=(u,v,y,scale=1)=>{
      const p=framePoint(f,u,v);
      for(let leaf=0;leaf<9;leaf++){
        const a=leaf/9*TAU,dx=Math.cos(a),dz=Math.sin(a),h=(.3+(leaf%3)*.08)*scale;
        leaves.triangle([p.x-dz*.06*scale,y,p.z+dx*.06*scale],[p.x+dx*.36*scale,y+h,p.z+dz*.36*scale],[p.x+dz*.06*scale,y,p.z-dx*.06*scale],leaf%2?'#617b4e':'#7e8d57');
      }
    };
    for(const index of [1,3,5]){
      const tier=g.tiers[index];if(!tier)continue;
      const p=tier.points.map(p=>g.local(p)),u=(Math.min(...p.map(p=>p.u))+Math.max(...p.map(p=>p.u)))/2;
      const bed=frameRectangle(f,.82,1.4,u,18.2),top=tier.ground+.67;
      solid(bed,top,'#89917a');addCollider({points:bed,bottom:tier.ground+.22,top,base:0});
      polygon(paving,frameRectangle(f,.68,1.25,u,18.2),top+.01,'#66674e');
      for(const v of [17.8,18.2,18.6])shrub(u,v,top+.02,.85);
    }
    // Southern forecourt planting follows the public plan's low planted edge;
    // the mapped stair corridor immediately south remains clear.
    for(const bed of g.beds){
      const top=p=>demHeight(p.x,p.z)+.67;shapedRoof(concrete,bed.points,top,'#a2a58a');
      for(let i=0;i<bed.points.length;i++){
        const a=bed.points[i],b=bed.points[(i+1)%bed.points.length],n=Math.max(1,Math.ceil(distance2(a,b)/.6));
        for(let k=0;k<n;k++){const p={x:a.x+(b.x-a.x)*k/n,z:a.z+(b.z-a.z)*k/n},q={x:a.x+(b.x-a.x)*(k+1)/n,z:a.z+(b.z-a.z)*(k+1)/n};concrete.quad([p.x,demHeight(p.x,p.z)+.22,p.z],[p.x,top(p),p.z],[q.x,top(q),q.z],[q.x,demHeight(q.x,q.z)+.22,q.z],'#acaf98');}
      }
      addCollider({points:bed.points,base:0,terrainBottom:.22,terrainOffset:.67});
      for(let u=bed.u0+.35;u<bed.u1;u+=.52){const p=framePoint(f,u,bed.v);shrub(u,bed.v,top(p)+.02,.9);}
    }
    // Completed Hassell photographs show dark vertical metal balusters,
    // superseding the glazed edge drawn in the earlier landscape proposal.
    for(let u=-9.6;u<17.4;u+=1.7){
      const a=framePoint(f,u,53.05),b=framePoint(f,Math.min(17.4,u+1.7),53.05),h0=demHeight(a.x,a.z)+.22,h1=demHeight(b.x,b.z)+.22;
      for(let j=0;j<11;j++){const t=j/11,x=a.x+(b.x-a.x)*t,z=a.z+(b.z-a.z)*t,y=h0+(h1-h0)*t;batchPipe(rails,[x,y+.1,z],[x,y+.96,z],.013,'#3e4b43');}
      batchPipe(rails,[a.x,h0,a.z],[a.x,h0+1,a.z],.026,'#4b5a50');batchPipe(rails,[a.x,h0+1,a.z],[b.x,h1+1,b.z],.03,'#627367');
    }
    addCollider({points:g.rail,base:0,terrainBottom:.22,terrainOffset:1.22});
    // Seats stand back from the mapped through-path along the forecourt.
    for(const seat of g.seats){
      const {u,v}=seat,p=framePoint(f,u,v),h=demHeight(p.x,p.z)+.22;
      addCollider({points:seat.points,base:0,terrainBottom:.22,terrainOffset:.72,stepHeight:.1});
      for(let k=0;k<4;k++){const q=framePoint(f,u,v-.21+k*.12);wood.box(q.x,h+.43,q.z,2.5,.065,.105,'#887051',angle);}
      for(const du of [-.9,.9]){const q=framePoint(f,u+du,v);rails.box(q.x,h+.2,q.z,.08,.4,.45,'#6e7e71',angle);}
    }
    world.add(concrete.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),bumpMap:surfaceTexture('concrete'),bumpScale:.025})),paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')}),false));
    world.add(wood.mesh(style('#ffffff',{vertexColors:true})),rails.mesh(style('#ffffff',{vertexColors:true,metalness:.3})),leaves.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
  }

  function rexTheatre(b,concrete,brick,glass,detail,roofs){
    const g=rexGeometry(b,buildings.find(q=>q.id===REX_LINK_ID)),ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),ha=g.roofAt(a),hc=g.roofAt(c);
      brick.quad([a.x,0,a.z],[a.x,ha-.22,a.z],[c.x,hc-.22,c.z],[c.x,0,c.z],'#bca47a',[[0,0],[0,ha/2],[len/2,hc/2],[len/2,0]]);
      wallPanel(concrete,a,c,0,.7,'#d1d5c6',.025);
      const p=(t,y,off)=>{const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;return [a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];};
      // The auditorium has one high window band, rather than the former
      // generic three-storey academic window grid.
      if(len>4.2){
        const low=Math.max(.85,Math.min(ha,hc)-1.9),high=Math.min(ha,hc)-.4;
        wallPanel(detail,a,c,low-.08,high+.08,'#d5dbcf',.08,.035,.965);
        wallPanel(glass,a,c,low,high,'#557075',.105,.045,.955);
        for(let d=.3;d<len-.15;d+=.72)wallPanel(detail,a,c,low,high,'#cbd4c8',.13,d/len,Math.min(1,(d+.055)/len));
        wallPanel(detail,a,c,low+.65,low+.70,'#bccbc4',.135,.04,.96);
      }
      detail.quad(p(0,ha-.23,.03),p(0,ha+.025,.03),p(1,hc+.025,.03),p(1,hc-.23,.03),'#d4dcce');
      detail.quad(p(0,ha,.03),p(1,hc,.03),p(1,hc,.48),p(0,ha,.48),'#d6dfd2');
      detail.quad(p(0,ha-.15,.48),p(1,hc-.15,.48),p(1,hc-.15,.03),p(0,ha-.15,.03),'#bdcbbf');
    }
    shapedRoof(roofs,b.points,g.roofAt,'#c8d3c7');
    const vent=framePoint(g.frame,-2,-1),vy=g.roofAt(vent);detail.box(vent.x,vy+.08,vent.z,1.35,.16,1.1,'#aebeb2');
    for(let z=-.4;z<=.4;z+=.16)detail.box(vent.x,vy+.17,vent.z+z,1.15,.025,.025,'#788d85');
    addCollider({points:b.points,top:b.height,base:b.base});
    const cover=new Batch(),paving=new Batch();cover.base=0;
    const roof=g.bridge.roofRL;polygon(cover,g.bridge.points,roof,'#c7d2c5',g.bridge.holes);polygon(cover,g.bridge.points,roof-.24,'#b3c3b6',g.bridge.holes,true);
    const cr=polygonArea(g.bridge.points)<0?[...g.bridge.points].reverse():g.bridge.points;
    for(let i=0;i<cr.length;i++)wallPanel(cover,cr[i],cr[(i+1)%cr.length],roof-.24,roof,'#c6d2c3');
    // Portal beams on each end of the existing covered east/west link.
    for(const [a,c] of [[g.bridge.points[0],g.bridge.points[2]],[g.bridge.points[8],g.bridge.points[4]]]){
      batchBeam(cover,[a.x,roof-.25,a.z],[c.x,roof-.25,c.z],.16,'#d1dacb');
      for(const p of [a,c]){const ground=terrainHeight(p.x,p.z);batchBeam(cover,[p.x,ground,p.z],[p.x,roof-.25,p.z],.15,'#d2d9c9');addCollider({x:p.x,z:p.z,radius:.18,top:roof,base:0});}
    }
    polygon(paving,g.bridge.points,.225,'#a29883',g.bridge.holes);groundPatches.push({points:g.bridge.points,heightAt:(x,z)=>terrainHeight(x,z)+.225});
    world.add(cover.mesh(style('#ffffff',{vertexColors:true})),paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')}),false));
    addCollider({points:g.bridge.points,holes:g.bridge.holes,bottom:roof-.24,top:roof,base:0});
  }

  function sdnCentre(b,concrete,brick,glass,detail,roofs){
    const g=sdnGeometry(b),f=g.frame,angle=Math.atan2(-f.u.z,f.u.x),roof=new Batch(),fences=new Batch(),garden=new Batch();roof.base=b.base;
    const external=(a,c)=>b.points.some((p,i)=>{const q=b.points[(i+1)%b.points.length],dx=q.x-p.x,dz=q.z-p.z,len=Math.hypot(dx,dz);return Math.abs(dx*(a.z-p.z)-dz*(a.x-p.x))/len<.02&&Math.abs(dx*(c.z-p.z)-dz*(c.x-p.x))/len<.02;});
    for(const r of g.regions){
      const ring=polygonArea(r.points)<0?[...r.points].reverse():r.points;
      shapedRoof(roofs,r.points,p=>g.roofAt(p,r.kind),r.kind==='veranda'?'#becbbd':'#9c9b89');
      if(r.kind==='veranda'){
        polygon(roof,r.points,Math.min(...r.points.map(p=>g.roofAt(p,r.kind)))-.12,'#c5d1be',[],true);polygon(detail,r.points,r.floor+.14,'#68897f');
        const front=Math.min(...r.points.map(p=>(p.x-f.x)*f.v.x+(p.z-f.z)*f.v.z));
        for(let u=-15;u<7;u+=3.45){const p=framePoint(f,u,front+.15);const height=g.roofAt(p,r.kind)-r.floor-.1;detail.box(p.x,r.floor+height/2,p.z,.1,height,.1,'#b6c8b3',angle);}
        for(let u=-15.7;u<7;u+=1.1){const a=framePoint(f,u,front+.1),c=framePoint(f,u,5);batchBeam(detail,[a.x,g.roofAt(a,r.kind)-.13,a.z],[c.x,g.roofAt(c,r.kind)-.13,c.z],.045,'#d0d8c5');}
        const a=framePoint(f,-15.7,front+.1),c=framePoint(f,7,front+.1);batchBeam(detail,[a.x,g.roofAt(a,r.kind)-.12,a.z],[c.x,g.roofAt(c,r.kind)-.12,c.z],.075,'#bfcfb9');
      }
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nv=nx*f.v.x+nz*f.v.z,ha=g.roofAt(a,r.kind),hc=g.roofAt(c,r.kind);
        wallPanel(detail,a,c,Math.min(ha,hc)-.12,Math.min(ha,hc)+.045,r.kind==='wing'?'#a17762':'#b8c5b3',.12);
        if(r.kind==='veranda'||(!external(a,c)&&nv>-.8))continue;
        if(r.kind==='hall'&&nv<-.8){
          wallPanel(concrete,a,c,0,r.floor+.3,'#c3c8b9');wallPanel(glass,a,c,r.floor+.3,r.floor+2.65,'#57736c',.055);
          for(let d=.15;d<len;d+=1.1)wallPanel(detail,a,c,r.floor+.25,r.floor+2.7,'#c4d1bf',.1,d/len,Math.min(1,(d+.055)/len));
          wallPanel(detail,a,c,r.floor+1.35,r.floor+1.41,'#b9cbb9',.12);
        }else{
          const count=Math.ceil(len/.4);
          for(let k=0;k<count;k++){const t=k/count,u=(k+1)/count,p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t},q={x:a.x+(c.x-a.x)*u,z:a.z+(c.z-a.z)*u},hp=g.roofAt(p,r.kind),hq=g.roofAt(q,r.kind);brick.quad([p.x,0,p.z],[p.x,hp-.12,p.z],[q.x,hq-.12,q.z],[q.x,0,q.z],'#d8c071',[[t*len/2,0],[t*len/2,hp/2],[u*len/2,hq/2],[u*len/2,0]]);}
          wallPanel(detail,a,c,.4,.46,'#a3b8a5',.04);
          if(len>3)for(let d=1.1;d<len-.8;d+=3.9){const mid=d/len,p={x:a.x+(c.x-a.x)*mid,z:a.z+(c.z-a.z)*mid},lo=Math.max(.95,terrainHeight(p.x,p.z)-b.base+.65),hi=Math.min(lo+1.45,g.roofAt(p,r.kind)-.3);wallPanel(detail,a,c,lo,hi,'#b9cbb7',.06,mid-.65/len,mid+.65/len);wallPanel(glass,a,c,lo+.07,hi-.08,'#4c6d69',.09,mid-.59/len,mid+.59/len);wallPanel(detail,a,c,lo+.07,hi-.08,'#c4d2be',.12,mid-.025/len,mid+.025/len);}
        }
      }
    }
    // The original roof outline is retained. The front strip represents the
    // observed open verandah, while the perimeter remains exterior-only here.
    addCollider({points:b.points,top:b.height,base:b.base});
    const tex=canvasTexture(128,128,ctx=>{ctx.clearRect(0,0,128,128);ctx.strokeStyle='#ffffff';ctx.lineWidth=1.6;for(let d=0;d<=128;d+=16){ctx.beginPath();ctx.moveTo(d,0);ctx.lineTo(d,128);ctx.stroke();ctx.beginPath();ctx.moveTo(0,d);ctx.lineTo(128,d);ctx.stroke();}});tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(3,3);tex.anisotropy=8;
    for(const {a,b:c} of g.fences){
      const len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
      wallPanel(fences,a,c,.08,1.55,'#94aaa0');
      for(let d=0;d<=len;d+=2.4){const t=d/len,p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t};garden.box(p.x,.8,p.z,.065,1.6,.065,'#627f70');}
      const points=[{x:a.x+nx*.05,z:a.z+nz*.05},{x:c.x+nx*.05,z:c.z+nz*.05},{x:c.x-nx*.05,z:c.z-nz*.05},{x:a.x-nx*.05,z:a.z-nz*.05}];addCollider({points,base:0,terrainOffset:1.55});
    }
    // Simple pots, garden edging and logs use the long-standing photo gallery;
    // the announced future playground refurbishment is not shown as completed.
    for(const [u,v] of [[-12,-8],[-4,-11],[3,-2]]){
      const p=framePoint(f,u,v);garden.box(p.x,.22,p.z,.65,.44,.65,'#ae8a6d',angle);garden.box(p.x,.46,p.z,.73,.06,.73,'#be9c7f',angle);garden.box(p.x,.5,p.z,.56,.04,.56,'#67705a',angle);
      for(const [dx,dz,h]of [[-.12,0,.9],[.16,.12,1.2],[0,-.18,.75]]){const q=framePoint(f,u+dx,v+dz);garden.box(q.x,.48+h/2,q.z,.028,h,.028,'#708568');garden.box(q.x,.5+h,q.z,.34,.2,.26,'#84956b',angle);}
    }
    const log=framePoint(f,-6,-4);garden.box(log.x,.22,log.z,3.2,.43,.38,'#85765e',angle);
    const [a,c]=g.signEdge;wallPanel(detail,a,c,2.6,3.04,'#c8be8b',.15);facadeCaption(b,a,c,'SDN KENSINGTON · UNSW SYDNEY',3.5,2.82,'#354c3c');
    world.add(roof.mesh(style('#ffffff',{vertexColors:true})),fences.mesh(style('#ffffff',{map:tex,vertexColors:true,transparent:true,alphaTest:.1,depthWrite:false,side:THREE.DoubleSide}),false),garden.mesh(style('#ffffff',{vertexColors:true})));
  }

  function barkerApartments(b,brick,glass,detail,roofs){
    const g=barkerApartmentsGeometry(b),f=g.frame;
    for(const part of BARKER_APARTMENTS_PARTS){
      const bottom=part.kind==='passage'?g.passageBottom(part.points):0;
      const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points;
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
        const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nv=nx*f.v.x+nz*f.v.z;
        const subdivisions=Math.ceil(len/.45);
        for(let k=0;k<subdivisions;k++){
          const t=k/subdivisions,u=(k+1)/subdivisions,p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t},q={x:a.x+(c.x-a.x)*u,z:a.z+(c.z-a.z)*u},hp=g.roofAt(p),hq=g.roofAt(q);
          brick.quad([p.x,bottom,p.z],[p.x,hp,p.z],[q.x,hq,q.z],[q.x,bottom,q.z],'#c4ab77',[[t*len/2,bottom/2],[t*len/2,hp/2],[u*len/2,hq/2],[u*len/2,bottom/2]]);
        }
        if(bottom<2.45)wallPanel(brick,a,c,bottom,2.45,'#945e4a',.025);
        for(const y of [2.42,5.5,8.15])if(y>bottom)wallPanel(detail,a,c,y,y+.09,'#929b97',.045);
        if(len<2.8)continue;
        const bays=Math.max(1,Math.round(len/3.9)),p=(t,y,off=.055)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
        for(let k=0;k<bays;k++){
          const mid=(k+.5)/bays,w=Math.min(1.55,len/bays*.55),t0=mid-w/2/len,t1=mid+w/2/len;
          for(const y of [.7,3.05,5.85,8.6]){
            const roof=Math.min(g.roofAt({x:a.x+(c.x-a.x)*mid,z:a.z+(c.z-a.z)*mid})-.4,11.4),h=Math.min(1.7,roof-y);
            if(y<bottom+.08||h<.7)continue;
            wallPanel(detail,a,c,y-.06,y+h+.06,'#cbd0c4',.07,t0-.045/len,t1+.045/len);
            wallPanel(glass,a,c,y,y+h,'#4a6570',.085,t0,t1);
            wallPanel(detail,a,c,y,y+h,'#d1d7cf',.1,mid-.025/len,mid+.025/len);
            wallPanel(detail,a,c,y+.22,y+.26,'#c0cabe',.1,t0,t1);
            // Pale curtains are visible behind many of the apartment windows.
            wallPanel(detail,a,c,y+.05,y+h-.05,'#bfc8bd',.095,t0,t0+.24/len);
          }
        }
        if(nv>.75&&len>6.7&&len<16.5){
          const width=Math.min(6.5,len-1),lo=.5-width/2/len,hi=.5+width/2/len;
          for(const slab of [2.75,5.55]){
            if(slab<bottom)continue;
            detail.quad(p(lo,slab,.06),p(hi,slab,.06),p(hi,slab,1.25),p(lo,slab,1.25),'#79878a');
            detail.quad(p(lo,slab-.13,1.25),p(hi,slab-.13,1.25),p(hi,slab-.13,.06),p(lo,slab-.13,.06),'#58696d');
            wallPanel(detail,a,c,slab-.13,slab,'#56666d',1.25,lo,hi);
            for(const t of [lo,hi])batchPipe(detail,p(t,slab,1.2),p(t,slab+2.65,1.2),.026,'#3c4a50');
            batchPipe(detail,p(lo,slab+1.03,1.2),p(hi,slab+1.03,1.2),.028,'#3c4a50');
            for(let d=0;d<=width;d+=.16)batchPipe(detail,p(lo+d/len,slab+.1,1.2),p(lo+d/len,slab+1.03,1.2),.012,'#455256');
            for(const t of [lo,hi])batchPipe(detail,p(t,slab+1.03,.05),p(t,slab+1.03,1.2),.025,'#3c4a50');
          }
          const shade=8.3;detail.quad(p(lo,shade,.04),p(hi,shade,.04),p(hi,shade,1.35),p(lo,shade,1.35),'#50626c');
        }
      }
      shapedRoof(roofs,part.points,g.roofAt,'#7b8583');
      if(bottom){polygon(detail,ring,bottom,'#8c8877',part.holes,true);addCollider({points:part.points,holes:part.holes,bottom,top:b.height,base:b.base});}
      else addCollider({points:part.points,holes:part.holes,top:b.height,base:b.base});
    }
  }

  function vallentineAnnexe(b,concrete,brick,glass,detail,roofs){
    const g=vallentineGeometry(b),paving=new Batch(),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z,nv=nx*f.v.x+nz*f.v.z;
      const east=nu>.8,north=nv<-.8,p=(t,y,off)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
      wallPanel(east?concrete:brick,a,c,0,b.height-.25,east?'#c6ccc3':'#b8a77e');
      wallPanel(concrete,a,c,0,1,'#c2c8bc',.03);
      if(east){
        for(let d=0;d<len;d+=3.25){
          wallPanel(detail,a,c,1,b.height-.25,'#a1ada8',.035,d/len,Math.min(1,(d+.035)/len));
          const t0=d/len,t1=Math.min(1,(d+3.25)/len);
          for(let y=2;y<9;y+=3.25){batchBeam(detail,p(t0,y,.06),p(t1,y+3.25,.06),.018,'#889c96');batchBeam(detail,p(t0,y+3.25,.06),p(t1,y,.06),.018,'#889c96');}
        }
        for(let d=2.1;d<len-1.2;d+=4.6){
          const t=d/len,l=.64/len;
          wallPanel(detail,a,c,7.2,8.95,'#d2d8ca',.2,t-l,t+l);wallPanel(glass,a,c,7.3,8.8,'#516d6d',.23,t-.5/len,t+.5/len);
          detail.quad(p(t-l,9.05,.05),p(t+l,9.05,.05),p(t+l,9.05,.95),p(t-l,9.05,.95),'#c7cec0');
          detail.triangle(p(t-l,8.1,.05),p(t-l,9.05,.05),p(t-l,9.05,.95),'#b4c2b8');
          detail.triangle(p(t+l,9.05,.95),p(t+l,9.05,.05),p(t+l,8.1,.05),'#b4c2b8');
        }
        // Large pale roller shutter beside the raised pedestrian entrance.
        const t=.33;wallPanel(detail,a,c,1.1,6.1,'#a8b4ac',.08,t-.04,t+.04);
        for(let y=1.2;y<6.1;y+=.12)wallPanel(detail,a,c,y,y+.017,'#81938b',.105,t-.04,t+.04);
      }else{
        wallPanel(glass,a,c,1.6,3.25,'#485f5d',.04,.015,.985);
        wallPanel(glass,a,c,9.8,10.7,'#496263',.04,.015,.985);
        for(let d=.2;d<len;d+=1.65){const t=d/len;wallPanel(detail,a,c,1.6,3.25,'#b8c4b6',.1,t-.035/len,t+.035/len);wallPanel(detail,a,c,9.7,10.8,'#c7d0bf',.1,t-.04/len,t+.04/len);}
        for(let d=3;d<len-1;d+=4.7){const t=d/len;wallPanel(detail,a,c,5.35,7.2,'#c9cbb7',.05,t-.4/len,t+.4/len);wallPanel(glass,a,c,5.45,7.1,'#405957',.07,t-.3/len,t+.3/len);}
        const hood=north?1.35:.75;
        detail.quad(p(0,4.05,.04),p(1,4.05,.04),p(1,4.05,hood),p(0,4.05,hood),'#c8cebf');
        detail.quad(p(0,3.85,hood),p(1,3.85,hood),p(1,3.85,.04),p(0,3.85,.04),'#a7b4aa');
        wallPanel(detail,a,c,3.85,4.05,'#afbab0',hood);
        wallPanel(concrete,a,c,10.9,11.65,'#bfc7b9',.12);
        detail.quad(p(0,11.85,.04),p(1,11.85,.04),p(1,11.85,1.15),p(0,11.85,1.15),'#c9d1c2');
        detail.quad(p(0,11.65,1.15),p(1,11.65,1.15),p(1,11.65,.04),p(0,11.65,.04),'#afc0b3');
        wallPanel(detail,a,c,11.65,12,'#becbbb',1.15);
        for(let d=.4;d<len;d+=1.15)batchBeam(detail,p(d/len,10.75,.12),p(d/len,11.67,.9),.045,'#b8c4b9');
      }
    }
    polygon(roofs,b.points,b.height,'#b4c1b5');addCollider({points:b.points,top:b.height,base:b.base});
    polygon(paving,g.apron,.025,'#ad8a72');world.add(paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')}),false));
    const stairBatch=new Batch(),rails=new Batch();stairBatch.base=rails.base=0;
    const st=g.stair,fp=(u,v)=>framePoint(f,u,v),landingY=g.topRL;
    polygon(stairBatch,g.landing.points,landingY,'#b47c62');
    groundPatches.push({points:g.landing.points,heightAt:()=>landingY});addCollider({points:g.landing.points,bottom:landingY-.18,top:landingY,base:0,stepHeight:.27});
    stairSegments.push(st);
    for(let k=0;k<st.count;k++){
      const t=k/st.count,next=(k+1)/st.count,y=st.h0+(st.h1-st.h0)*t+.03;
      const a={x:st.a.x+(st.b.x-st.a.x)*t,z:st.a.z+(st.b.z-st.a.z)*t},c={x:st.a.x+(st.b.x-st.a.x)*next,z:st.a.z+(st.b.z-st.a.z)*next};
      const points=[{x:a.x-f.u.x*st.width/2,z:a.z-f.u.z*st.width/2},{x:c.x-f.u.x*st.width/2,z:c.z-f.u.z*st.width/2},{x:c.x+f.u.x*st.width/2,z:c.z+f.u.z*st.width/2},{x:a.x+f.u.x*st.width/2,z:a.z+f.u.z*st.width/2}];
      polygon(stairBatch,points,y,'#b8795e');wallPanel(stairBatch,points[3],points[0],y-.16,y,'#9f674f');
      const p=points[0],q=points[3];batchBeam(stairBatch,[p.x,y+.013,p.z],[q.x,y+.013,q.z],.018,'#c7d3c3');
    }
    const wallU=g.east+.72,a=fp(wallU,10-6.3-1.1),c=fp(wallU,11.1);
    stairBatch.quad([a.x,st.h0,a.z],[c.x,st.h0,c.z],[c.x,landingY+2.6,c.z],[a.x,st.h0+.6,a.z],'#3f817f');
    for(const side of [-1,1]){
      const off=st.width/2*side,point=(p,y)=>[p.x+f.u.x*off,y,p.z+f.u.z*off];
      batchPipe(rails,point(st.a,st.h0+1),point(st.b,st.h1+1),.032,'#d0d9cc');
      batchPipe(rails,point(st.a,st.h0+.5),point(st.b,st.h1+.5),.021,'#c0d0c5');
      for(let k=0;k<=4;k++){const t=k/4,p={x:st.a.x+(st.b.x-st.a.x)*t,z:st.a.z+(st.b.z-st.a.z)*t},y=st.h0+(st.h1-st.h0)*t;batchPipe(rails,point(p,y),point(p,y+1.05),.025,'#cad5c7');}
    }
    // The raised landing joins the east face; guard only its exposed front edge.
    const lp0=fp(g.east+.925,11.1),lp1=fp(g.east+3.275,11.1);
    for(const y of [.5,1])batchPipe(rails,[lp0.x,landingY+y,lp0.z],[lp1.x,landingY+y,lp1.z],.026,'#cad5c7');
    const top=new Batch();top.base=0;
    for(let k=0;k<32;k++){
      const v0=g.canopy.v0+(g.canopy.v1-g.canopy.v0)*k/32,v1=g.canopy.v0+(g.canopy.v1-g.canopy.v0)*(k+1)/32;
      const a=fp(g.canopy.u0,v0),c=fp(g.canopy.u0,v1),d=fp(g.canopyEdge(v1),v1),e=fp(g.canopyEdge(v0),v0),y=g.canopy.rl;
      top.quad([a.x,y,a.z],[c.x,y,c.z],[d.x,y,d.z],[e.x,y,e.z],'#ccd3c5');top.quad([a.x,y-.15,a.z],[e.x,y-.15,e.z],[d.x,y-.15,d.z],[c.x,y-.15,c.z],'#b4c4b8');
      batchBeam(top,[e.x,y-.08,e.z],[d.x,y-.08,d.z],.075,'#bdcbbd');
    }
    for(const v of [g.canopy.v0+.8,g.canopy.v1-.7]){const p=fp(g.canopyEdge(v)-.12,v),bottom=terrainHeight(p.x,p.z);batchPipe(rails,[p.x,bottom,p.z],[p.x,g.canopy.rl-.12,p.z],.048,'#b9cbbf');addCollider({x:p.x,z:p.z,radius:.075,top:g.canopy.rl-.12,base:0});}
    const doorA=fp(g.east,9.1),doorC=fp(g.east,10.9);wallPanel(glass,doorA,doorC,landingY-b.base,landingY-b.base+2.4,'#355b5c',.08);
    world.add(stairBatch.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),rails.mesh(style('#ffffff',{vertexColors:true,metalness:.3})),top.mesh(style('#ffffff',{vertexColors:true})));
  }

  function parkingStation(b,concrete,brick,glass,detail){
    const g=parkingGeometry(b),screen=new Batch(),paving=new Batch();screen.base=b.base;
    polygon(paving,b.points,.035,'#727c76');world.add(paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('asphalt')}),false));
    const texture=canvasTexture(128,128,ctx=>{
      ctx.clearRect(0,0,128,128);ctx.strokeStyle='#ffffff';ctx.lineWidth=g.barker?2.5:1.15;
      for(let k=-128;k<256;k+=16){ctx.beginPath();ctx.moveTo(k,0);ctx.lineTo(k+128,128);ctx.stroke();ctx.beginPath();ctx.moveTo(k,0);ctx.lineTo(k-128,128);ctx.stroke();}
    });texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.repeat.set(4,4);texture.anisotropy=8;
    for(const region of g.regions){
      for(const [level,rl] of region.decks.entries()){
        const y=rl-b.base;
        polygon(concrete,region.points,y,'#a9ada5');polygon(concrete,region.points,y-.19,'#7a817d',[],true);
        for(const {a,b:c} of region.faces){
          const len=distance2(a,c),top=level<region.decks.length-1?region.decks[level+1]-b.base-.2:region.screenRL-b.base;
          wallPanel(concrete,a,c,y-.19,y,'#b4bbb1',.02);
          wallPanel(screen,a,c,y+.06,top,g.barker?'#697773':'#818e8b',.09);
          for(const h of [y+.08,(y+top)/2,top])wallPanel(detail,a,c,h-.025,h+.025,g.barker?'#8f9b91':'#c0c8bf',.14);
          // A recessed structural plane gives the permeable screen visual depth.
          if(level<region.decks.length-1)wallPanel(concrete,a,c,y,top,'#424e4d',-5);
          for(let d=.1;d<len;d+=2.6)wallPanel(detail,a,c,y,top,g.barker?'#83928a':'#b0bab2',.15,Math.max(0,(d-.035)/len),Math.min(1,(d+.035)/len));
          if(level<region.decks.length-1)for(let d=1;d<len-.5;d+=8.3)wallPanel(concrete,a,c,y,top,'#b7bdb2',-.32,(d-.16)/len,(d+.16)/len);
        }
      }
    }
    for(const ramp of g.ramps){
      const ys=ramp.points.map(p=>{const u=(p.x-g.frame.x)*g.frame.u.x+(p.z-g.frame.z)*g.frame.u.z;return u;});
      const lo=Math.min(...ys),hi=Math.max(...ys),vertices=ramp.points.map((p,i)=>[p.x,ramp.lowRL-b.base+(ramp.highRL-ramp.lowRL)*(ys[i]-lo)/(hi-lo),p.z]);
      concrete.quad(...[...vertices].reverse(),'#9caaa1');concrete.quad(...vertices.map(p=>[p[0],p[1]-.18,p[2]]),'#7f8b82');
    }
    for(const core of g.cores){
      const ring=polygonArea(core.points)<0?[...core.points].reverse():core.points,top=core.topRL-b.base,material=g.barker?brick:concrete;
      polygon(concrete,ring,top,'#bfc3b6');
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(material,a,c,0,top,g.barker?'#ad806b':'#c3c8bc',.19);
        if(len>2)for(let y=2;y<top-1;y+=2.65)wallPanel(glass,a,c,y,y+1.15,'#3c5354',.22,.43,.57);
      }
    }
    for(const car of parkingCars(b,g)){
      const y=car.rl-b.base,angle=car.angle,co=Math.cos(angle),si=Math.sin(angle),at=(x,z)=>({x:car.x+x*co+z*si,z:car.z-x*si+z*co});
      detail.box(car.x,y+.48,car.z,1.68,.53,3.65,car.color,angle);
      const cabin=at(0,-.15);glass.box(cabin.x,y+.98,cabin.z,1.4,.56,1.85,'#304a50',angle);
      for(const x of [-.85,.85])for(const z of [-1.15,1.15]){const p=at(x,z);detail.box(p.x,y+.27,p.z,.2,.43,.58,'#293332',angle);}
      const front=at(0,1.84);detail.box(front.x,y+.53,front.z,1.35,.12,.04,'#cbd8cb',angle);
      if(car.roof){const p=at(1.19,0);detail.box(p.x,y+.015,p.z,.07,.025,4.8,'#dde0d0',angle);}
    }
    const entry=parkingEntry(g),{a,c,region}=entry,len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
    // Historical fascia styling only; the card records Botany's relocated access.
    const bottom=Math.max(region.decks[0]-b.base,terrainHeight((a.x+c.x)/2,(a.z+c.z)/2)-b.base),top=bottom+2.65;
    wallPanel(detail,a,c,top-.45,top+.17,g.barker?'#306786':'#d1aa29',.35);
    facadeCaption(b,a,c,g.barker?'BARKER STREET CAR PARK':'BOTANY STREET CAR PARK',Math.min(10.5,len-.3),top-.13,g.barker?'#e2e8dd':'#273a38');
    const p=(q,y,off)=>[q.x+nx*off,y,q.z+nz*off];
    detail.quad(p(a,top+.17,.1),p(c,top+.17,.1),p(c,top+.17,1.2),p(a,top+.17,1.2),'#b9c4b8');
    wallPanel(detail,a,c,top-.72,top-.63,'#d4ad34',.8,.03,.97);
    world.add(screen.mesh(style('#ffffff',{map:texture,vertexColors:true,transparent:true,alphaTest:.1,depthWrite:false,side:THREE.DoubleSide,roughness:.65,metalness:.18}),false));
    // Outdoor map: transparent façades expose visual detail, not a navigable garage.
    addCollider({points:b.points,top:b.height,base:b.base});
  }

  function esmeTheatre(b,concrete,glass,detail){
    const g=esmeGeometry(b),f=g.frame,deck=new Batch();deck.base=0;
    for(let k=0;k<g.regions.length;k++){
      const r=g.regions[k],ring=polygonArea(r.points)<0?[...r.points].reverse():r.points;
      polygon(deck,ring,r.rl,k%2?'#c0c5b6':'#b8bfb0');
      if(k>=2)for(let j=0;j<ring.length;j++)wallPanel(deck,ring[j],ring[(j+1)%ring.length],r.rl-.13,r.rl,'#8e9e90');
      groundPatches.push({points:r.points,heightAt:()=>r.rl+.02});
      addCollider({points:r.points,bottom:0,top:r.rl,stepHeight:.27,base:0});
    }
    const ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,count=Math.ceil(len/.7);
      for(let k=0;k<count;k++){
        const p={x:a.x+(c.x-a.x)*k/count,z:a.z+(c.z-a.z)*k/count},q={x:a.x+(c.x-a.x)*(k+1)/count,z:a.z+(c.z-a.z)*(k+1)/count};
        const top=g.surfaceRL({x:(p.x+q.x)/2,z:(p.z+q.z)/2})-b.base,visible=Math.max(0,top-.42);
        wallPanel(concrete,p,q,0,top,'#a6b0a0');
        if(visible>1.8){wallPanel(glass,p,q,.1,visible,'#54766d',.06);wallPanel(detail,p,q,.1,visible,'#343f39',.12,0,.06);}
        // Sloping concrete edge and glass balustrade follow the terraced surface.
        wallPanel(concrete,p,q,top-.35,top,'#bbc3b3',.14);
        if(top>1.8){wallPanel(glass,p,q,top+.08,top+1.08,'#8aafa2',.04);batchBeam(detail,[p.x+nx*.08,top+1.1,p.z+nz*.08],[q.x+nx*.08,top+1.1,q.z+nz*.08],.018,'#b3c7b4');}
      }
      if(len>30){
        const t=.25,centre={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t};
        if(g.surfaceRL(centre)-b.base>3)facadeCaption(b,a,c,'ESME TIMBERY · CREATIVE PRACTICE LAB',Math.min(16,len-1),1.7,'#883f40');
      }
    }
    const liftRing=polygonArea(g.lift.points)<0?[...g.lift.points].reverse():g.lift.points;
    polygon(deck,liftRing,g.lift.topRL,'#4a5450');
    for(let i=0;i<liftRing.length;i++){
      const a=liftRing[i],c=liftRing[(i+1)%liftRing.length],len=distance2(a,c);
      wallPanel(detail,a,c,g.lift.bottomRL-b.base,g.lift.topRL-b.base,'#303b39');
      for(let d=.12;d<len;d+=.18)wallPanel(detail,a,c,g.lift.bottomRL-b.base,g.lift.topRL-b.base,'#45514a',.035,d/len,Math.min(1,(d+.025)/len));
    }
    addCollider({points:g.lift.points,bottom:g.lift.bottomRL,top:g.lift.topRL,base:0});
    world.add(deck.mesh(style('#ffffff',{vertexColors:true})));
  }

  function scienceLaboratory(b,concrete,glass,detail,roofs){
    const g=scienceLabGeometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
      const tx=(c.x-a.x)/len,tz=(c.z-a.z)/len,nx=tz,nz=-tx,nv=nx*f.v.x+nz*f.v.z,nu=nx*f.u.x+nz*f.u.z,inner=g.seb?nu>.65:nu<-.65;
      wallPanel(glass,a,c,0,g.mainHeight,'#54767b');
      wallPanel(concrete,a,c,0,.35,'#a6b2a2',.06);
      for(let d=.2;d<len;d+=1.2)wallPanel(detail,a,c,.2,g.foyerTop-.2,'#3c514b',.1,d/len,Math.min(1,(d+.055)/len));
      for(let d=2;d<len;d+=7.2){const p={x:a.x+tx*d+nx*.3,z:a.z+tz*d+nz*.3};batchBeam(concrete,[p.x,.1,p.z],[p.x,g.foyerTop,p.z],.17,'#b9c2af');}
      wallPanel(concrete,a,c,g.foyerTop-.3,g.foyerTop,'#adb9a6',.3);
      const bays=Math.max(1,Math.floor(len/.95));
      for(let row=0;row<g.rows;row++){
        const low=g.bands[row].low,high=g.bands[row].high-.04;
        wallPanel(detail,a,c,low,low+.055,'#a8b9a9',.08);
        if(inner){
          const p=(q,offset,y)=>[q.x+nx*offset,y,q.z+nz*offset];
          concrete.quad(p(a,0,low),p(c,0,low),p(c,.7,low),p(a,.7,low),'#a7b6a3');
          wallPanel(concrete,a,c,low-.2,low,'#a1b09d',.7);
          wallPanel(glass,a,c,low+.05,low+1.1,'#6f9b91',.7);
          wallPanel(detail,a,c,low+1.1,low+1.14,'#b1c4b1',.72);
          for(let d=.6;d<len;d+=1.8)wallPanel(detail,a,c,low,low+1.14,'#647b6b',.74,d/len,Math.min(1,(d+.035)/len));
          continue;
        }
        for(let k=0;k<bays;k++){
          const t=(k+.5)/bays,d=t*len,x=a.x+tx*d+nx*.45,z=a.z+tz*d+nz*.45;
          // Coherent diagonal fields of open and closed blades, reconstructed from photographs.
          const field=Math.sin(t*Math.PI*2+(row-3)*.38+(nv>.5?.5:0)),angle=field>.2?1.12:.12;
          const orientation=-Math.atan2(tz,tx)+angle;
          detail.box(x,(low+high)/2,z,.82,high-low,.045,k%4?'#d2d9c8':'#c7d1c1',orientation);
        }
      }
      wallPanel(concrete,a,c,g.mainHeight-.22,g.mainHeight,'#a9b6a5',.18);
    }
    polygon(roofs,b.points,g.mainHeight,'#9caa9a');
    const plant=polygonArea(g.plant.points)<0?[...g.plant.points].reverse():g.plant.points;
    polygon(roofs,plant,g.plant.top,'#48514a');
    for(let i=0;i<plant.length;i++){
      const a=plant[i],c=plant[(i+1)%plant.length],len=distance2(a,c);
      wallPanel(detail,a,c,g.plant.bottom,g.plant.top,'#333d3b');
      for(let d=.2;d<len;d+=.42)wallPanel(detail,a,c,g.plant.bottom,g.plant.top,'#526058',.035,d/len,Math.min(1,(d+.035)/len));
    }
    for(const flue of g.flues){batchPipe(detail,[flue.x,flue.bottom,flue.z],[flue.x,flue.top-.12,flue.z],flue.radius,'#acb8aa');detail.box(flue.x,flue.top-.15,flue.z,.72,.3,.72,'#788b7d');}
    addCollider({points:b.points,holes:b.holes,top:g.mainHeight,base:b.base});
  }

  function scienceGlazedLinks(data){
    const seb=data.buildings.find(b=>b.id==='science-engineering'),hilmer=data.buildings.find(b=>b.id==='hilmer'),g=scienceLinks(seb,hilmer),links=new Batch(),glazing=new Batch();links.base=glazing.base=0;
    const ring=polygonArea(g.points)<0?[...g.points].reverse():g.points;
    for(const level of g.levels){
      const top=level.topRL,bottom=level.bottomRL;
      polygon(links,ring,top,'#b9c4b2');
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);
        wallPanel(links,a,c,bottom,bottom+.3,'#acbba8');
        wallPanel(glazing,a,c,bottom+.3,top-.25,'#729e98');
        wallPanel(links,a,c,top-.25,top,'#b1c0ae');
        for(let d=.8;d<len;d+=1.4)wallPanel(links,a,c,bottom+.25,top-.25,'#405b51',.025,d/len,Math.min(1,(d+.04)/len));
      }
      addCollider({points:ring,bottom,top,base:0});
    }
    world.add(links.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    world.add(glazing.mesh(style('#ffffff',{vertexColors:true,roughness:.16,metalness:.45,side:THREE.DoubleSide})));
  }

  function aquaticPool(b,concrete,brick,glass,detail,roofs){
    const g=poolGeometry(b),ordered=r=>polygonArea(r)<0?[...r].reverse():r;
    shapedRoof(roofs,g.hall,g.roofHeight,'#a6b2a6');polygon(roofs,g.front,g.frontTop,'#7b8a82');
    for(const [points,front] of [[g.hall,false],[g.front,true]]){
      const ring=ordered(points);
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
        const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,top=front?g.frontTop:g.eave;
        wallPanel(brick,a,c,0,top,front?'#a79d80':'#b3a17e');
        if(front&&nz>.45&&len>7){
          wallPanel(concrete,a,c,0,.55,'#b5baad',.12);
          wallPanel(glass,a,c,.55,3.35,'#487e8a',.08);
          wallPanel(detail,a,c,.55,2.18,'#237e9e',.1);
          for(let d=.8;d<len;d+=1.65)wallPanel(detail,a,c,.5,3.4,'#424f48',.14,d/len,Math.min(1,(d+.055)/len));
          wallPanel(detail,a,c,3.4,g.frontTop,'#303e3c',.12);
          if(len>20)facadeCaption(b,a,c,'UNSW FITNESS & AQUATIC CENTRE',Math.min(22,len-.8),4.1,'#e7c538');
          // A few coloured notices are procedural shapes, never copied photographs.
          for(const [t,color] of [[.65,'#d8c856'],[.69,'#a5c5a5'],[.73,'#cc925f']])wallPanel(detail,a,c,1.1,2.8,color,.17,t,t+.025);
        }else if(front){
          wallPanel(detail,a,c,3.45,g.frontTop,'#354640',.08);
          if(nx>.4&&len>5){wallPanel(glass,a,c,.2,3.3,'#46695f',.08,.25,.75);wallPanel(detail,a,c,.2,3.3,'#303c36',.13,.49,.51);}
        }else{
          const bays=Math.max(1,Math.round(len/5.8));
          for(let k=0;k<=bays;k++){const t=k/bays,p={x:a.x+(c.x-a.x)*t+nx*.11,z:a.z+(c.z-a.z)*t+nz*.11};batchBeam(detail,[p.x,0,p.z],[p.x,g.eave,p.z],.09,'#919d8c');}
          wallPanel(glass,a,c,6.8,g.eave-.25,'#495b54',.08);
          for(let d=.4;d<len;d+=1.4)wallPanel(detail,a,c,6.75,g.eave-.2,'#333f38',.15,d/len,Math.min(1,(d+.055)/len));
          wallPanel(detail,a,c,g.eave-.15,g.eave,'#a8b9ab',.2);
          const count=Math.max(1,Math.ceil(len));
          for(let k=0;k<count;k++){
            const p={x:a.x+(c.x-a.x)*k/count,z:a.z+(c.z-a.z)*k/count},q={x:a.x+(c.x-a.x)*(k+1)/count,z:a.z+(c.z-a.z)*(k+1)/count};
            roofs.quad([p.x,g.eave,p.z],[p.x,g.roofHeight(p),p.z],[q.x,g.roofHeight(q),q.z],[q.x,g.eave,q.z],'#9aab9c');
          }
        }
      }
      addCollider({points,top:front?g.frontTop:b.height,base:b.base});
    }
    // Thin standing seams follow the pitched hall roof, staying below its mapped maximum.
    for(let x=-240;x<-181;x+=3.2){
      const north={x,z:Math.min(...g.hall.map(p=>p.z))+.4},south={x,z:g.splitZ-.4},mid={x,z:g.ridgeZ};
      if([north,south,mid].every(p=>inPolygon(p.x,p.z,g.hall))){batchBeam(detail,[north.x,g.roofHeight(north)-.025,north.z],[mid.x,b.height-.025,mid.z],.025,'#b6c2b1');batchBeam(detail,[mid.x,b.height-.025,mid.z],[south.x,g.roofHeight(south)-.025,south.z],.025,'#b6c2b1');}
    }
  }

  function aquaticGym(b,concrete,brick,glass,detail,roofs){
    const g=gymGeometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    shapedRoof(roofs,b.points,g.roofHeight,'#aab8ac');
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z,nv=nx*f.v.x+nz*f.v.z;
      wallPanel(brick,a,c,0,g.eave,'#ad9d78');
      wallPanel(concrete,a,c,0,2.85,nv<-.3?'#bba14f':'#5b6456');
      if(len>4){
        wallPanel(glass,a,c,nv<-.3?1.45:.15,2.85,'#3c514b',.07);
        wallPanel(detail,a,c,2.85,3.4,'#c2a34a',.15);
        wallPanel(detail,a,c,3.48,4.45,'#4c5950',.06);
        for(let y=3.5;y<4.45;y+=.14)wallPanel(concrete,a,c,y,y+.04,'#a5ad98',.15);
        const bays=Math.max(1,Math.round(len/5.2));
        for(let k=0;k<=bays;k++){
          const t=k/bays,dx=.11/len;
          wallPanel(brick,a,c,3.35,g.eave,'#998969',.15,Math.max(0,t-dx),Math.min(1,t+dx));
          wallPanel(detail,a,c,0,2.85,'#303e37',.17,Math.max(0,t-dx),Math.min(1,t+dx));
        }
        if(nu<-.65||nv>.65){
          wallPanel(glass,a,c,g.eave-1.1,g.eave-.15,'#798d83',.08);
          for(let d=.5;d<len;d+=1.6)wallPanel(detail,a,c,g.eave-1.1,g.eave-.1,'#bdc6b4',.13,d/len,Math.min(1,(d+.04)/len));
        }
        if(g.entryEdge.includes(a)&&g.entryEdge.includes(c)){
          wallPanel(glass,a,c,.05,2.7,'#426156',.13,.38,.68);
          wallPanel(concrete,a,c,.15,1.05,'#b8c7b2',.16,.38,.68);
          wallPanel(detail,a,c,.05,2.75,'#273830',.18,.51,.525);
          wallPanel(detail,a,c,1.15,1.3,'#bec9b7',.2,.48,.5);wallPanel(detail,a,c,1.15,1.3,'#bec9b7',.2,.54,.56);
          facadeCaption(b,a,c,'FITNESS & AQUATIC CENTRE · B5',Math.min(8,len-1),3.12,'#34463a');
        }
      }
      wallPanel(concrete,a,c,g.eave-.13,g.eave,'#c2caba',.4);
      const count=Math.max(1,Math.ceil(len));
      for(let k=0;k<count;k++){
        const p={x:a.x+(c.x-a.x)*k/count,z:a.z+(c.z-a.z)*k/count},q={x:a.x+(c.x-a.x)*(k+1)/count,z:a.z+(c.z-a.z)*(k+1)/count};
        roofs.quad([p.x,g.eave,p.z],[p.x,g.roofHeight(p),p.z],[q.x,g.roofHeight(q),q.z],[q.x,g.eave,q.z],'#a7b4a5');
      }
    }
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
  }

  function newtonBuilding(b,concrete,brick,glass,detail,roofs){
    const g=newtonGeometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z;
      wallPanel(brick,a,c,0,b.height,'#8c6550');
      if(Math.abs(nu)>.8&&len>15){
        const bays=Math.max(1,Math.round(len/6));
        for(let bay=0;bay<bays;bay++){
          const centre=(bay+.5)/bays,pitch=b.height/g.rows;
          for(let row=0;row<g.rows;row++){
            const y=row*pitch,blind=(bay+row*3)%5;
            wallPanel(concrete,a,c,y+.25,y+pitch-.2,'#baac86',.04,centre-.15/bays,centre+.15/bays);
            wallPanel(glass,a,c,y+.3,y+pitch*.61,'#82958a',.07,centre-.14/bays,centre+.14/bays);
            if(blind<2)wallPanel(detail,a,c,y+.85,y+pitch*.61,'#c7d0ba',.08,centre-.14/bays,centre+.14/bays);
            wallPanel(detail,a,c,y+.3,y+pitch*.61,'#b4c1aa',.1,centre-.01/bays,centre+.01/bays);
            for(const side of [-1,1]){
              const u=centre+side*.25/bays;
              wallPanel(concrete,a,c,y+pitch*.6,y+pitch-.2,'#b9aa80',.04,u-.055/bays,u+.055/bays);
              wallPanel(glass,a,c,y+.35,y+pitch*.61,'#768e82',.07,u-.05/bays,u+.05/bays);
              wallPanel(brick,a,c,0,b.height,'#765643',.12,Math.min(u+side*.07/bays,u+side*.09/bays),Math.max(u+side*.07/bays,u+side*.09/bays));
            }
          }
        }
        if(nu<-.8){
          const t=((g.entry.x-a.x)*(c.x-a.x)+(g.entry.z-a.z)*(c.z-a.z))/(len*len),left=t-2/len,right=t+2/len,low=g.stair.highRL-b.base;
          wallPanel(glass,a,c,low,low+2.8,'#5d7c70',.15,left,right);
          wallPanel(concrete,a,c,low+2.8,low+3.55,'#d3dbca',1.65,left-.03,right+.03);
          const p=t=>({x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t});
          facadeCaption(b,p(left),p(right),'Newton · J12',5.6,low+3.1,'#526e67');
        }
      }else if(len>7){
        for(let row=0;row<4;row++){
          wallPanel(concrete,a,c,row*4+.1,row*4+3.8,'#b6a680',.035,.4,.6);
          wallPanel(glass,a,c,row*4+.4,row*4+2.3,'#7b9183',.07,.42,.58);
        }
      }
      wallPanel(concrete,a,c,b.height-.4,b.height,'#b8b8a0',.2);
      for(let d=.7;d<len;d+=6.2){const t=d/len,x=a.x+(c.x-a.x)*t+nx*.16,z=a.z+(c.z-a.z)*t+nz*.16;batchPipe(detail,[x,0,z],[x,b.height-.3,z],.032,'#6f7c69');}
    }
    polygon(roofs,b.points,b.height,'#a4af98');
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
    const steps=new Batch();steps.base=0;
    const flight=(s,ramp=false)=>{
      const dx=s.b.x-s.a.x,dz=s.b.z-s.a.z,len=Math.hypot(dx,dz),nx=-dz/len,nz=dx/len,p=(t,side,y)=>[s.a.x+dx*t+nx*side*s.width/2,y,s.a.z+dz*t+nz*side*s.width/2];
      stairSegments.push({a:s.a,b:s.b,width:s.width,count:s.count,h0:s.lowRL,h1:s.highRL,continuous:ramp});
      if(ramp){steps.quad(p(0,-1,s.lowRL),p(1,-1,s.highRL),p(1,1,s.highRL),p(0,1,s.lowRL),'#adb9a4');}
      else for(let k=0;k<s.count;k++){
        const low=k/s.count,high=(k+1)/s.count,y=s.lowRL+(s.highRL-s.lowRL)*low;
        steps.quad(p(low,-1,y),p(high,-1,y),p(high,1,y),p(low,1,y),'#b4bea8');steps.quad(p(low,-1,y-(s.highRL-s.lowRL)/s.count),p(low,-1,y),p(low,1,y),p(low,1,y-(s.highRL-s.lowRL)/s.count),'#939f8c');
      }
      for(const side of [-1,1]){
        batchBeam(steps,p(0,side,s.lowRL+.95),p(1,side,s.highRL+.95),.025,'#789383');
        for(let k=0;k<=6;k++){const t=k/6,y=s.lowRL+(s.highRL-s.lowRL)*t;batchBeam(steps,p(t,side,y),p(t,side,y+.95),.018,'#789383');}
      }
      if(ramp){
        const a=p(0,1,s.lowRL+.05),c=p(1,1,s.highRL+.05),d=p(1,1,s.highRL+.9),e=p(0,1,s.lowRL+1.4);
        steps.quad(a,c,d,e,'#258d91');steps.quad(e,d,c,a,'#258d91');
      }
    };
    flight(g.stair);flight(g.ramp,true);
    polygon(steps,g.landing,g.stair.highRL,'#b6c1aa');addCollider({points:g.landing,bottom:g.stair.highRL-.12,top:g.stair.highRL,stepHeight:.27,base:0});
    world.add(steps.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
  }

  function keithBurrows(b,concrete,brick,glass,detail,roofs){
    const g=keithEntranceGeometry(b),masonry=new Batch(),panes=new Batch(),soffit=new Batch(),metal=new Batch(),soil=new Batch(),leaves=new Batch();for(const batch of [masonry,panes,soffit,metal,soil,leaves])batch.base=b.base;
    for(const face of [...g.upper,...g.lower]){
      const p=face.point,panel=(batch,l,r,lo,hi,color,offset=0)=>batch.quad(p(l,lo,offset),p(l,hi,offset),p(r,hi,offset),p(r,lo,offset),color,[face.uv(l,lo),face.uv(l,hi),face.uv(r,hi),face.uv(r,lo)]);
      for(const c of face.masonry)panel(masonry,c.left,c.right,c.bottom,c.top,'#ffffff');
      if(face.upper){panel(metal,0,1,g.overhang-.10,g.overhang+.035,'#a9b5a8',.025);panel(metal,0,1,b.height-.09,b.height,'#9ea99f',.025);}
      for(const h of face.holes){
        panel(panes,h.left,h.right,h.bottom,h.top,'#667572',-h.recess);
        for(const t of [h.left,h.right])soffit.quad(p(t,h.bottom),p(t,h.top),p(t,h.top,-h.recess),p(t,h.bottom,-h.recess),'#7d867d');
        for(const y of [h.bottom,h.top])soffit.quad(p(h.left,y),p(h.left,y,-h.recess),p(h.right,y,-h.recess),p(h.right,y),'#9ca497');
        const fw=.055/face.length,dep=-h.recess+.025,door=h.id==='entrance-door';
        for(const t of [h.left,h.right-fw])panel(metal,t,t+fw,h.bottom,h.top,'#45514e',dep);
        for(const y of [h.bottom,h.top-.055])panel(metal,h.left,h.right,y,y+.055,'#45514e',dep);
        const count=door?2:Math.max(2,Math.round((h.right-h.left)*face.length/.85));
        for(let i=1;i<count;i++){const t=h.left+(h.right-h.left)*i/count;panel(metal,t-fw/2,t+fw/2,h.bottom,h.top,'#45514e',dep);}
        if(door){
          panel(metal,h.left,h.right,h.bottom+1.0,h.bottom+1.04,'#8b9a91',dep+.01);
          for(const side of [-1,1]){const t=(h.left+h.right)/2+side*.11/face.length;batchBeam(metal,p(t,h.bottom+.9,dep+.06),p(t,h.bottom+1.3,dep+.06),.016,'#bac2b7');}
        }
      }
    }
    // The canopy is a continuous strip of five fitted facets, with mitred
    // outer corners. It remains within the mapped upper projection.
    for(const h of g.hood){
      polygon(soffit,h.points,h.top,'#9ba69d');polygon(soffit,h.points,h.bottom,'#aeb6ac',[],true);
      const ring=polygonArea(h.points)>0?h.points:[...h.points].reverse();for(let i=0;i<ring.length;i++)wallPanel(soffit,ring[i],ring[(i+1)%ring.length],h.bottom,h.top,'#909d94');
      addCollider({...h,base:b.base});
    }
    polygon(soffit,b.points,g.overhang,'#c4cdc1',[g.lowerPoints],true);
    polygon(roofs,b.points,b.height,'#8f9892');
    const texture=canvasTexture(1024,512,ctx=>{
      const random=rng(14014),colors=['#8b5c42','#976746','#a26f47','#9e6b45','#8f6142','#a27651','#744f3a','#9b6948'];ctx.fillStyle='#766957';ctx.fillRect(0,0,1024,512);
      for(let row=0;row<20;row++)for(let col=-1;col<21;col++){
        const x=(col+(row%2)*.5)*51.2,y=row*25.6;ctx.fillStyle=colors[Math.floor(random()*colors.length)];ctx.fillRect(x+.7,y+.8,49.8,24.0);
        for(let j=0;j<12;j++){ctx.fillStyle=j%2?'#201b1520':'#e9c99d20';ctx.fillRect(x+random()*49,y+random()*22,1+random()*5,.6+random()*2);}
      }
    });texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.anisotropy=8;
    const skin=panes.mesh(style('#ffffff',{vertexColors:true,roughness:.08,metalness:.7,envMapIntensity:1.0}));world.add(skin);medicalReflection(skin,g.entryArrival,b.base+g.overhang-1);
    const bed=g.bed,level=bed.floor-b.base,ring=polygonArea(bed.points)>0?bed.points:[...bed.points].reverse();
    for(let i=0;i<ring.length;i++)wallPanel(soffit,ring[i],ring[(i+1)%ring.length],level,level+bed.height,'#a4a594');polygon(soil,bed.points,level+bed.height-.06,'#5f5845');
    const random=rng(1414);for(let i=0;i<12;i++){
      const along=(i/11-.5)*1.95,p={x:bed.centre.x+bed.frame.u.x*along,z:bed.centre.z+bed.frame.u.z*along};
      for(let j=0;j<12;j++){
        const a=j/12*TAU+random()*.3,dx=Math.cos(a),dz=Math.sin(a),size=.8+random()*.4,low=level+bed.height-.05,profile=[[0,.02,.009],[.06,.21,.014],[.18,.34,.016],[.29,.26,.01],[.36,.12,0]],point=(k,side)=>{const [r,h,w]=profile[k];return [p.x+dx*r*size-dz*w*side,low+h*size,p.z+dz*r*size+dx*w*side];};
        for(let k=1;k<profile.length;k++)leaves.quad(point(k-1,-1),point(k,-1),point(k,1),point(k-1,1),j%3?'#718c50':'#8b9c5b');
      }
    }
    addCollider({...bed,base:0,bottom:bed.floor,top:bed.floor+bed.height});groundPatches.push({...bed,priority:true,minimumY:bed.floor+bed.height-.18,heightAt:()=>bed.floor+bed.height});
    world.add(masonry.mesh(style('#ffffff',{vertexColors:true,map:texture,roughness:.94})),soffit.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),side:THREE.DoubleSide,roughness:.92})),metal.mesh(style('#ffffff',{vertexColors:true,roughness:.4,metalness:.55})),soil.mesh(style('#ffffff',{vertexColors:true,roughness:1})),leaves.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.95})));
    const paving=keithEntrancePaving(b),stone=new Batch();stone.base=0;
    for(const tri of paving.triangles){const ps=tri.map(p=>[p.x,p.y,p.z]),a=tri[0],c=tri[1],d=tri[2];if((c.x-a.x)*(d.z-a.z)-(c.z-a.z)*(d.x-a.x)>0)ps.reverse();stone.triangle(...ps,'#b4b0a0');}
    world.add(stone.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),roughness:.95})));groundPatches.push({...paving,priority:true});
    addCollider({points:b.points,holes:b.holes,bottom:g.overhang-.14,top:b.height,base:b.base});addCollider({points:g.lowerPoints,top:g.overhang,base:b.base});
  }

  function physicsTheatre(b,concrete,brick,glass,detail,roofs){
    const g=physicsGeometry(b),ring=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*g.frame.u.x+nz*g.frame.u.z;
      wallPanel(brick,a,c,0,g.bodyRoof,'#a17b58');wallPanel(concrete,a,c,0,2.6,'#8c7d71',.02);
      if(nu<-.3&&len>5){
        wallPanel(glass,a,c,g.bodyRoof-1.3,g.bodyRoof-.65,'#a5b6a1',.06,.1,.48);
        for(const t of [.1,.22,.35,.48])wallPanel(detail,a,c,g.bodyRoof-1.3,g.bodyRoof-.65,'#657b6c',.1,t,t+.04/len);
        wallPanel(detail,a,c,.1,2.35,'#8b8071',.055,.57,.73);
        wallPanel(detail,a,c,.1,2.35,'#b3b9a0',.09,.645,.65);
        for(const t of [.03,.94]){const x=a.x+(c.x-a.x)*t+nx*.17,z=a.z+(c.z-a.z)*t+nz*.17;batchPipe(detail,[x,0,z],[x,g.bodyRoof,z],.04,'#6b806e');}
      }
      wallPanel(detail,a,c,g.bodyRoof-.12,g.bodyRoof,'#9cae96',.3);
    }
    polygon(roofs,b.points,g.bodyRoof,'#aab7a1');polygon(roofs,g.plant.points,g.plant.top,'#b0bdab');
    for(let i=0;i<g.plant.points.length;i++){
      const a=g.plant.points[i],c=g.plant.points[(i+1)%g.plant.points.length],len=distance2(a,c);wallPanel(concrete,a,c,g.plant.bottom,g.plant.top,'#c5cec0');
      for(let d=.2;d<len;d+=.7)wallPanel(detail,a,c,g.plant.bottom,g.plant.top,'#99ac99',.03,d/len,Math.min(1,(d+.025)/len));
    }
    addCollider({points:b.points,holes:b.holes,top:g.bodyRoof,base:b.base});
  }

  function k17Building(b,concrete,glass,detail,roofs){
    const g=k17Geometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points,board=new Batch(),foyer=new Batch(),shade=new Batch(),steel=new Batch(),orange=new Batch(),garden=new Batch();
    for(const batch of [board,foyer,shade,steel,orange])batch.base=b.base;garden.base=0;
    const front=g.front,p=(t,y,offset=0)=>{const q=front.along(t,offset);return [q.x,y,q.z];};
    const isFront=(a,c)=>a===b.points[7]&&c===b.points[0],isWest=(a,c)=>a===b.points[6]&&c===b.points[7];
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z;
      if(isFront(a,c)){
        // Glazing and dark floor bands sit behind a separate perforated skin.
        wallPanel(board,a,c,g.foyerTop,b.height,'#9ea497',-.18);
        for(let row=0;row<g.screen.bands;row++){
          const h=(g.screen.top-g.screen.bottom)/g.screen.bands,low=g.screen.bottom+row*h;
          wallPanel(glass,a,c,low+.35,low+h-.3,'#526967',-.12,.01,.99);
          for(let col=1;col<g.screen.columns;col++)wallPanel(steel,a,c,low+.3,low+h-.25,'#a0aca3',-.09,col/g.screen.columns-.002,col/g.screen.columns+.002);
        }
        for(const [i,panel] of g.screenPanels.entries())wallPanel(shade,a,c,panel.bottom,panel.top,i%5===1?'#c6cac2':i%7===3?'#b9bfb7':'#c0c6bd',g.screen.offset,panel.start,panel.end);
        for(let col=0;col<=g.screen.columns;col++){
          const t=col/g.screen.columns*g.screen.end;
          batchBeam(steel,p(t,g.foyerTop+.55,.77),p(t,b.height,.77),.035,'#8e9b93');
          // Triangular outriggers support the lower edge of the screen.
          batchBeam(steel,p(t,g.foyerTop+.7,.02),p(t,g.screen.bottom+.2,.76),.032,'#87968e');
          batchBeam(steel,p(t,g.screen.bottom+.2,.76),p(Math.min(g.screen.end,t+g.screen.end/g.screen.columns),g.screen.bottom+.2,.76),.025,'#a9b4aa');
        }
        for(let row=0;row<=g.screen.bands;row++){const y=g.screen.bottom+row*(g.screen.top-g.screen.bottom)/g.screen.bands;batchBeam(steel,p(0,y,.76),p(g.screen.end,y,.76),.035,'#89978e');}
        wallPanel(concrete,a,c,g.floor,g.foyerTop,'#cbd0c2',-4.1);
        wallPanel(foyer,a,c,g.floor,g.foyerTop-.16,'#9db9b4',.08,0,g.screen.end);
        wallPanel(steel,a,c,g.foyerTop-.25,g.foyerTop+.55,'#283e3e',.78,0,g.screen.end);
        steel.quad(p(0,g.foyerTop-.22,.78),p(g.screen.end,g.foyerTop-.22,.78),p(g.screen.end,g.foyerTop-.22,-4.1),p(0,g.foyerTop-.22,-4.1),'#a8b4a8');
        for(let d=0;d<=len*g.screen.end+.01;d+=len*g.screen.end/12)batchBeam(steel,p(d/len,g.floor,.13),p(d/len,g.foyerTop-.22,.13),.025,'#9fb5b1');
        for(const t of [.14,.48,.83]){const q=front.along(t,-.65);batchPipe(detail,[q.x,g.floor,q.z],[q.x,g.foyerTop,q.z],.21,'#d6ddd0');}
        // Dark stone strip at the glazing base, with a narrow gravel margin.
        wallPanel(steel,a,c,g.floor-.2,g.floor+.05,'#5c6861',.16,0,g.screen.end);
      }else if(isWest(a,c)){
        const w=g.west,s=w.slotStart,e=w.slotEnd,r=w.returnStart;
        // The concrete wall is interrupted by a recessed stair stack and glass
        // corner. The source footprint and outdoor collision boundary remain.
        wallPanel(board,a,c,0,b.height,'#a6ab9f',0,0,s);
        wallPanel(board,a,c,0,b.height,'#a6ab9f',0,e,r);
        wallPanel(board,a,c,g.foyerTop,b.height,'#a6ab9f',0,r,1);
        wallPanel(board,a,c,0,g.floor,'#a6ab9f',0,r,1);
        wallPanel(foyer,a,c,g.floor,g.foyerTop,'#9db9b4',.06,r,1);
        wallPanel(steel,a,c,g.foyerTop-.25,g.foyerTop+.55,'#283e3e',.2,r,1);
        for(const t of [r,r+.04,r+.08,1])wallPanel(steel,a,c,g.floor,g.foyerTop,'#a0b4ac',.1,t,Math.min(1,t+.0018));
        wallPanel(board,a,c,0,b.height,'#626e66',-w.depth,s,e);
        const wp=(t,y,off)=>{const q=w.along(t,off);return [q.x,y,q.z];};
        for(const t of [s,e]){const face=[wp(t,0,0),wp(t,b.height,0),wp(t,b.height,-w.depth),wp(t,0,-w.depth)];board.quad(...face,'#a4ab9e');board.quad(...[...face].reverse(),'#a4ab9e');}
        for(let row=0;row<7;row++){
          const y=row*g.pitch;
          wallPanel(board,a,c,y,y+.22,'#b1b8a9',0,0,1);
          if(row>0){
            const center=w.along((s+e)/2,(w.projection-w.depth)/2),width=(e-s)*len;
            board.box(center.x,y+.03,center.z,width,.24,w.projection+w.depth,'#aeb4a6',Math.atan2(-(c.z-a.z),c.x-a.x));
            wallPanel(board,a,c,y+.12,y+1.05,'#aab0a2',w.projection,s-.012,e+.012);
            for(const t of [s-.012,e+.012]){const q=w.along(t,(w.projection-.12)/2);board.box(q.x,y+.57,q.z,.18,.94,w.projection+.12,'#aab0a2',Math.atan2(-(c.z-a.z),c.x-a.x));}
            const q=w.along(.61,.035);board.box(q.x,y+1.25,q.z,.8,.85,.035,'#687c73',Math.atan2(-(c.z-a.z),c.x-a.x));
            for(let d=0;d<.8;d+=.1)wallPanel(steel,a,c,y+.85+d,y+.88+d,'#a0aea1',.07,.61-.4/len,.61+.4/len);
          }
          for(let d=2;d<len;d+=3.0)wallPanel(steel,a,c,y+.23,Math.min(b.height,y+g.pitch),'#8b9688',.018,d/len,Math.min(1,(d+.012)/len));
        }
        // Closed lower stair door and a few visible treads are a visual glimpse.
        wallPanel(glass,a,c,.15,2.6,'#344b47',-w.depth+.02,s+.02,e-.02);
        for(let step=0;step<7;step++){const q=w.along((s+e)/2,-.22-step*.15);board.box(q.x,.12+step*.14,q.z,(e-s)*len-.2,.1,.19,'#a6afa0',Math.atan2(-(c.z-a.z),c.x-a.x));}
      }else{
        wallPanel(board,a,c,0,b.height,'#b7b9a7');
        const bays=Math.max(1,Math.round(len/5.8));
        for(let row=0;row<g.rows;row++){
          const y=row*g.pitch;
          wallPanel(detail,a,c,y+.24,y+g.pitch-.22,'#3b4845',.035,.01,.99);
          for(let bay=0;bay<bays;bay++){
            const s=(bay+.07)/bays,e=(bay+.93)/bays;
            wallPanel(glass,a,c,y+g.pitch*.43,y+g.pitch-.35,'#7a8a87',.06,s,e);
            for(const t of [.25,.5,.75])wallPanel(detail,a,c,y+g.pitch*.43,y+g.pitch-.32,'#3e504b',.1,s+(e-s)*t,s+(e-s)*t+.035/len);
            wallPanel(detail,a,c,y+g.pitch*.71,y+g.pitch*.71+.035,'#3e504b',.1,s,e);
            if((row*3+bay)%7===1)wallPanel(detail,a,c,y+g.pitch*.44,y+g.pitch-.37,'#b7bda9',.075,s+(e-s)*.26,s+(e-s)*.49);
            wallPanel(concrete,a,c,y,y+g.pitch,'#b9bead',.18,bay/bays,Math.min(1,(bay+.07)/bays));
          }
          wallPanel(concrete,a,c,y,y+.3,'#bec2af',.22);
        }
      }
      wallPanel(detail,a,c,b.height-.15,b.height,'#899586',.18);
    }
    // Orange folded stair stringers have actual circular cutouts, rather than
    // dark dots painted on a solid sheet. They remain behind closed glazing.
    const flights=[[.2,.65,g.floor+.15,g.floor+3,-1.3],[.65,.2,g.floor+3,g.foyerTop-.35,-2.8]];
    for(const [s,e,low,high,offset] of flights){
      const panel=[p(s,low-.25,offset),p(e,high-.25,offset),p(e,high+.8,offset),p(s,low+.8,offset)];
      orange.quad(...panel,'#df782f',[[0,0],[8,0],[8,1],[0,1]]);
      for(let i=0;i<17;i++){const t=i/17,q=front.along(s+(e-s)*t,offset-.65);detail.box(q.x,low+(high-low)*t,q.z,front.len*Math.abs(e-s)/17,.06,1.2,'#d38a47',Math.atan2(-(front.c.z-front.a.z),front.c.x-front.a.x));}
      batchBeam(steel,p(s,low+1.05,offset),p(e,high+1.05,offset),.026,'#9fada2');
    }
    for(const landing of g.west.landings)addCollider({points:landing.points,bottom:landing.bottom,top:landing.top,base:b.base});
    polygon(roofs,b.points,b.height,'#9ca795');polygon(detail,g.foyerFloor,g.floor-.02,'#c7d1bf');
    const ceiling=g.foyerFloor.map(q=>[q.x,g.foyerTop,q.z]);detail.quad(ceiling[0],ceiling[1],ceiling[2],ceiling[3],'#d2dbcb');
    for(const t of [.18,.42,.67,.87]){const q=front.along(t,-1.2);detail.box(q.x,g.foyerTop-.1,q.z,.65,.035,.18,'#eef0d7');}
    const formed=canvasTexture(256,256,ctx=>{ctx.fillStyle='#c7c9b9';ctx.fillRect(0,0,256,256);const random=rng(416);for(let i=0;i<5000;i++){const x=random()*256,y=random()*256;ctx.fillStyle=i%2?'#a8b09e':'#d3d6c7';ctx.globalAlpha=.25;ctx.fillRect(x,y,.5,2+random()*15);}ctx.globalAlpha=.15;ctx.fillStyle='#6b786a';for(let x=5;x<256;x+=9)ctx.fillRect(x,0,.8,256);ctx.globalAlpha=.6;ctx.fillStyle='#6e7b6c';for(let x=10;x<256;x+=64)for(let y=22;y<256;y+=64){ctx.beginPath();ctx.arc(x,y,2.1,0,TAU);ctx.fill();}});formed.wrapS=formed.wrapT=THREE.RepeatWrapping;
    const screenTexture=canvasTexture(64,64,ctx=>{ctx.fillStyle='#dde1d8';ctx.fillRect(0,0,64,64);ctx.globalCompositeOperation='destination-out';for(const [x,y]of [[16,16],[48,16],[16,48],[48,48]]){ctx.beginPath();ctx.moveTo(x,y-13);ctx.lineTo(x+13,y);ctx.lineTo(x,y+13);ctx.lineTo(x-13,y);ctx.closePath();ctx.fill();}});screenTexture.wrapS=screenTexture.wrapT=THREE.RepeatWrapping;screenTexture.repeat.set(12,12);screenTexture.anisotropy=8;
    const stairTexture=canvasTexture(128,128,ctx=>{ctx.fillStyle='#ffffff';ctx.fillRect(0,0,128,128);ctx.globalCompositeOperation='destination-out';for(const [x,y]of [[32,32],[96,32],[32,96],[96,96]]){ctx.beginPath();ctx.arc(x,y,13,0,TAU);ctx.fill();}});stairTexture.wrapS=stairTexture.wrapT=THREE.RepeatWrapping;
    world.add(board.mesh(style('#ffffff',{vertexColors:true,map:formed,bumpMap:formed,bumpScale:.018})),steel.mesh(style('#ffffff',{vertexColors:true,metalness:.4,roughness:.35})),shade.mesh(style('#ffffff',{vertexColors:true,map:screenTexture,alphaTest:.5,side:THREE.DoubleSide,roughness:.48,metalness:.45})),orange.mesh(style('#ffffff',{vertexColors:true,map:stairTexture,alphaTest:.5,side:THREE.DoubleSide})));
    const glazing=foyer.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.22,side:THREE.DoubleSide,depthWrite:false,roughness:.055,metalness:.25,envMapIntensity:.6}));world.add(glazing);medicalReflection(glazing,front.along(.5,2),b.base+g.floor+3.5);
    const vertical=canvasTexture(512,2048,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.translate(w/2,h/2);ctx.rotate(Math.PI/2);ctx.fillStyle='rgba(236,244,238,.73)';ctx.textAlign='center';ctx.font='100px sans-serif';ctx.fillText('COMPUTER SCIENCE',0,-28,h-80);ctx.fillText('& ENGINEERING',0,85,h-80);});
    const label=new THREE.Mesh(new THREE.PlaneGeometry(1.5,5.9),new THREE.MeshBasicMaterial({map:vertical,transparent:true,depthWrite:false})),lp=front.along(.035,.16);label.position.set(lp.x,b.base+g.floor+3.15,lp.z);label.rotation.y=Math.atan2(front.nx,front.nz);world.add(label);
    const badgeTexture=canvasTexture(256,128,(ctx,w,h)=>{ctx.fillStyle='#21627e';ctx.fillRect(0,0,w,h);ctx.fillStyle='#e4ebe3';ctx.font='74px sans-serif';ctx.textAlign='center';ctx.fillText('K17',w/2,91);}),badge=new THREE.Mesh(new THREE.PlaneGeometry(.85,.43),new THREE.MeshBasicMaterial({map:badgeTexture})),bp=front.along(.035,.8);badge.position.set(bp.x,b.base+g.foyerTop+.1,bp.z);badge.rotation.y=Math.atan2(front.nx,front.nz);world.add(badge);
    for(const bed of g.beds)shapedRoof(garden,bed.points,q=>terrainHeight(q.x,q.z)+.08,'#8e7d5e');
    for(const shrub of g.shrubs){const y=terrainHeight(shrub.x,shrub.z);for(let blade=0;blade<9;blade++){const t=blade*TAU/9,tip=[shrub.x+Math.cos(t)*.65,y+shrub.height,shrub.z+Math.sin(t)*.65],base=[shrub.x,y+.08,shrub.z],side=[shrub.x+Math.cos(t+.5)*.12,y+.1,shrub.z+Math.sin(t+.5)*.12];garden.triangle(base,tip,side,blade%2?'#71894d':'#8b9a5c');garden.triangle(side,tip,base,blade%2?'#71894d':'#8b9a5c');}}
    world.add(garden.mesh(style('#ffffff',{vertexColors:true,roughness:.9})));
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
  }

  function willisAnnexe(b,concrete,brick,glass,detail,roofs){
    const g=willisGeometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points,masonry=new Batch(),tile=new Batch(),blocks=new Batch(),lattice=new Batch(),glazing=new Batch(),metal=new Batch(),roof=new Batch(),cover=new Batch(),coverGlass=new Batch(),paving=new Batch(),laneFloor=new Batch();
    for(const batch of [masonry,tile,blocks,lattice,glazing,metal,roof])batch.base=b.base;
    cover.base=coverGlass.base=paving.base=laneFloor.base=0;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
      const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nv=nx*f.v.x+nz*f.v.z,la=g.local(a),lc=g.local(c),p=(t,y,off=0)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
      wallPanel(masonry,a,c,0,g.eave,'#efe1c8');
      masonry.quad(p(0,g.eave),p(0,g.roofHeight(a)),p(1,g.roofHeight(c)),p(1,g.eave),'#efe1c8');
      if(nv<-.7){
        const strip=(left,right,bottom,top,batch,color,off=.05)=>{const t0=(left-la.u)/(lc.u-la.u),t1=(right-la.u)/(lc.u-la.u),s=Math.max(0,Math.min(t0,t1)),e=Math.min(1,Math.max(t0,t1));if(e>s)wallPanel(batch,a,c,bottom,top,color,off,s,e);};
        for(const window of g.northStrips){
          strip(window.left,window.right,window.bottom,window.top,blocks,'#b5c4c4');
          for(const u of [window.left,window.right])strip(u-.035,u+.035,window.bottom,window.top,metal,'#d4d8cc',.12);
          for(const [low,high] of [[g.ground+.65,g.ground+1.35],[g.ground+3.3,g.ground+4.05]]){
            strip(window.left,window.right,low-.07,high+.07,metal,'#c8cec4',.13);
            strip(window.left+.07,window.right-.07,low,high,glazing,'#526e70',.15);
            strip((window.left+window.right)/2-.025,(window.left+window.right)/2+.025,low,high,metal,'#d0d7cb',.17);
          }
          strip(window.left-.05,window.right+.05,window.bottom-.08,window.bottom,metal,'#d4d7c9',.2);
        }
        // The original northern entrance lies in the western mapped facet.
        if(Math.max(la.u,lc.u)>g.entryU-2.7&&Math.min(la.u,lc.u)<g.entryU+2.7){
          const entryStrip=(l,r,...args)=>strip(g.entryU+l,g.entryU+r,...args);
          entryStrip(-2.35,2.35,g.ground,g.ground+3.28,glazing,'#8ba4a0',.08);
          for(const u of [-2.35,-.78,.78,2.35])entryStrip(u-.035,u+.035,g.ground,g.ground+3.28,metal,'#d5ddcf',.15);
          for(const y of [g.ground+.1,g.ground+1.1,g.ground+2.4,g.ground+3.2])entryStrip(-2.35,2.35,y,y+.06,metal,'#d5ddcf',.16);
          entryStrip(-2.7,2.7,g.ground+3.65,g.eave-.35,tile,'#7b8982',.035);
          entryStrip(-2.7,2.7,g.ground+3.65,g.eave-.35,lattice,'#edf0e2',.09);
        }
      }else if(Math.abs(nv)<.7){
        const bays=Math.max(1,Math.round(len/5.8));
        for(let bay=0;bay<bays;bay++){
          const s=(bay+.11)/bays,e=(bay+.89)/bays;
          wallPanel(tile,a,c,5.25,7.0,'#bec4c7',.04,s,e);
          for(const [low,high] of [[.3,5.12],[7.08,10.9]]){
            wallPanel(glazing,a,c,low,high,'#a4b8b2',.065,s,e);
            for(let col=0;col<=4;col++)wallPanel(metal,a,c,low,high,'#c3ccbd',.13,s+(e-s)*col/4,Math.min(e,s+(e-s)*col/4+.04/len));
            for(let y=low+.85;y<high;y+=1.0)wallPanel(metal,a,c,y,y+.045,'#bac6b8',.14,s,e);
          }
          // A few tilted opening lights make the upper workshop grid legible.
          if(bay%3!==2){const ss=s+(e-s)*.25,ee=s+(e-s)*.5;glazing.quad(p(ss,7.2,.32),p(ss,7.85,.1),p(ee,7.85,.1),p(ee,7.2,.32),'#8daba5');batchBeam(metal,p(ss,7.2,.32),p(ee,7.2,.32),.04,'#c1cbbb');}
          const qa=p(s,5.12,.025),qc=p(e,5.12,.025),ra=p(s,5.12,.62),rc=p(e,5.12,.62);
          metal.quad(qa,qc,rc,ra,'#ced5c4');metal.quad(...[qa,qc,rc,ra].reverse(),'#ced5c4');
          wallPanel(metal,a,c,5.12,5.29,'#d5d9cb',.62,s,e);
          wallPanel(masonry,a,c,0,g.eave,'#f3e4cd',.26,bay/bays,Math.min(1,(bay+.095)/bays));
          wallPanel(metal,a,c,.3,.42,'#858f83',.2,s,e);
        }
      }else{
        // Unseen southern details remain a restrained reconstruction.
        const bays=Math.max(1,Math.round(len/5.6));
        for(let bay=0;bay<bays;bay++)for(const [low,high]of[[1.4,4.5],[7.2,10.8]]){
          const s=(bay+.22)/bays,e=(bay+.78)/bays;wallPanel(glazing,a,c,low,high,'#8ba69e',.07,s,e);
          for(let y=low+.8;y<high;y+=.9)wallPanel(metal,a,c,y,y+.04,'#c2cbbb',.12,s,e);
        }
      }
      // White eave fascia follows each true mapped edge instead of an oversized
      // rectangular roof overhanging the source perimeter.
      metal.quad(p(0,g.roofHeight(a)-.13,.08),p(0,g.roofHeight(a),.08),p(1,g.roofHeight(c),.08),p(1,g.roofHeight(c)-.13,.08),'#d5dccb');
    }
    for(const points of g.roofFaces)shapedRoof(roof,points,g.roofHeight,'#aab5aa');
    for(const part of WILLIS_LANE_COVER){
      shapedRoof(coverGlass,part.points,g.cover.heightAt,'#cad9d3',part.holes);
      addCollider({points:part.points,holes:part.holes,base:0,bottom:g.cover.bottomRL,top:g.cover.topRL});
    }
    for(const part of WILLIS_COVER_FRAME){
      shapedRoof(cover,part.points,p=>g.cover.heightAt(p)-.06,'#526b67',part.holes);
      for(const raw of [part.points,...part.holes]){const loop=(polygonArea(raw)>0)===(raw===part.points)?raw:[...raw].reverse();for(let i=0;i<loop.length;i++){const a=loop[i],c=loop[(i+1)%loop.length];cover.quad([a.x,g.cover.heightAt(a)-.24,a.z],[a.x,g.cover.heightAt(a)-.06,a.z],[c.x,g.cover.heightAt(c)-.06,c.z],[c.x,g.cover.heightAt(c)-.24,c.z],'#526b67');}}
    }
    for(const part of WILLIS_ENTRY_CANOPY){
      polygon(metal,part.points,g.entryCanopy.top,'#d7dfcf',part.holes);polygon(metal,part.points,g.entryCanopy.bottom,'#c4cebd',part.holes,true);
      for(let i=0;i<part.points.length;i++)wallPanel(metal,part.points[i],part.points[(i+1)%part.points.length],g.entryCanopy.bottom,g.entryCanopy.top,'#d7dfcf');
      addCollider({points:part.points,holes:part.holes,bottom:g.entryCanopy.bottom,top:g.entryCanopy.top,base:b.base});
    }
    for(const part of WILLIS_LANE_PAVING){shapedRoof(laneFloor,part.points,p=>terrainHeight(p.x,p.z)+.075,'#bfc3b9',part.holes);groundPatches.push({points:part.points,holes:part.holes,heightAt:(x,z)=>terrainHeight(x,z)+.075});}
    for(const part of WILLIS_ENTRY_PAVING)shapedRoof(paving,part.points,p=>terrainHeight(p.x,p.z)+.12,'#aab0a4',part.holes);
    for(const shrub of g.shrubs){const y=terrainHeight(shrub.x,shrub.z);for(let i=0;i<12;i++){const t=i*TAU/12,a=[shrub.x,y+.05,shrub.z],c=[shrub.x+Math.cos(t)*.75,y+shrub.height,shrub.z+Math.sin(t)*.75],d=[shrub.x+Math.cos(t+.45)*.14,y+.15,shrub.z+Math.sin(t+.45)*.14];paving.triangle(a,c,d,i%2?'#657d44':'#849451');paving.triangle(d,c,a,i%2?'#657d44':'#849451');}}
    const bricks=canvasTexture(512,512,ctx=>{ctx.fillStyle='#bfb9a3';ctx.fillRect(0,0,512,512);const random=rng(18012),colors=['#cbb18a','#a98763','#c7b89b','#d7c09b','#b99b77'];for(let row=0;row<20;row++)for(let col=-1;col<7;col++){ctx.fillStyle=colors[Math.floor(random()*colors.length)];ctx.fillRect(col*85+(row%2?42:0)+1,row*25.6+1,82,23.5);}});bricks.wrapS=bricks.wrapT=THREE.RepeatWrapping;
    const tiles=canvasTexture(256,256,ctx=>{const random=rng(1804);ctx.fillStyle='#778380';ctx.fillRect(0,0,256,256);for(let y=0;y<8;y++)for(let x=0;x<8;x++){const n=65+Math.floor(random()*20);ctx.fillStyle=`rgb(${n},${n+8},${n+13})`;ctx.fillRect(x*32+1,y*32+1,30,30);}});tiles.wrapS=tiles.wrapT=THREE.RepeatWrapping;
    const glassBlocks=canvasTexture(256,256,ctx=>{ctx.fillStyle='#c3c9bf';ctx.fillRect(0,0,256,256);for(let x=0;x<8;x++)for(let y=0;y<8;y++){ctx.fillStyle=(x+y)%3?'#829a9b':'#718f94';ctx.fillRect(x*32+2,y*32+2,28,28);ctx.fillStyle='#a2b5b2';ctx.fillRect(x*32+4,y*32+4,24,2);}});glassBlocks.wrapS=glassBlocks.wrapT=THREE.RepeatWrapping;
    const breeze=canvasTexture(128,128,ctx=>{ctx.fillStyle='#e7edde';ctx.fillRect(0,0,128,128);ctx.globalCompositeOperation='destination-out';for(const [x,y]of[[32,32],[96,32],[32,96],[96,96]]){ctx.beginPath();ctx.moveTo(x,y-23);ctx.lineTo(x+19,y);ctx.lineTo(x,y+23);ctx.lineTo(x-19,y);ctx.closePath();ctx.fill();}});breeze.wrapS=breeze.wrapT=THREE.RepeatWrapping;breeze.repeat.set(3,3);
    world.add(masonry.mesh(style('#ffffff',{vertexColors:true,map:bricks,bumpMap:bricks,bumpScale:.02})),tile.mesh(style('#ffffff',{vertexColors:true,map:tiles,bumpMap:tiles,bumpScale:.014})),blocks.mesh(style('#ffffff',{vertexColors:true,map:glassBlocks,roughness:.27,metalness:.1})),lattice.mesh(style('#ffffff',{vertexColors:true,map:breeze,alphaTest:.5,side:THREE.DoubleSide})),metal.mesh(style('#ffffff',{vertexColors:true,roughness:.4})),roof.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),cover.mesh(style('#ffffff',{vertexColors:true,metalness:.35})),coverGlass.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.42,side:THREE.DoubleSide,depthWrite:false,roughness:.16})),paving.mesh(style('#ffffff',{vertexColors:true})),laneFloor.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),bumpMap:surfaceTexture('concrete'),bumpScale:.015})));
    const windows=glazing.mesh(style('#ffffff',{vertexColors:true,roughness:.12,metalness:.5,envMapIntensity:.8}));world.add(windows);medicalReflection(windows,framePoint(f,-19,-25),b.base+4.5);
    const signTexture=canvasTexture(512,1024,(ctx,w,h)=>{ctx.fillStyle='#465664';ctx.fillRect(0,0,w,h);ctx.fillStyle='#e3c94d';ctx.fillRect(0,0,w,125);ctx.fillStyle='#293e45';ctx.font='58px sans-serif';ctx.fillText('UNSW',34,87);ctx.fillStyle='#e2e8de';ctx.font='48px sans-serif';ctx.fillText('Willis Annexe',30,235);ctx.font='42px sans-serif';ctx.fillText('J18',30,335);});
    const plaque=new THREE.Mesh(new THREE.BoxGeometry(g.sign.width,g.sign.height,.08),[style('#465664'),style('#465664'),style('#465664'),style('#465664'),new THREE.MeshBasicMaterial({map:signTexture}),style('#465664')]);
    plaque.position.set(g.sign.x,terrainHeight(g.sign.x,g.sign.z)+g.sign.height/2,g.sign.z);plaque.rotation.y=Math.atan2(-f.v.x,-f.v.z);world.add(plaque);addCollider({x:g.sign.x,z:g.sign.z,radius:.45,top:g.sign.height});
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
  }

  function rupertMyers(b,concrete,brick,detail,roofs){
    const g=rupertGeometry(b),f=g.frame,undersides=new Batch(),glass=new Batch();undersides.base=glass.base=b.base;
    const pointAt=(u,v,y)=>{const p=framePoint(f,u,v);return [p.x,y,p.z];};
    const gridFacade=(a,c,low,high,north=false)=>{
      const len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z,nv=nx*f.v.x+nz*f.v.z;
      if(north&&(nv<-.6||nu<-.6)){
        if(low<11.3)wallPanel(brick,a,c,low,Math.min(high,11.3),'#806e61');
        if(high>11.6){wallPanel(glass,a,c,11.6,high-.35,'#5b7174',.05);for(let d=.25;d<len;d+=1.5)wallPanel(detail,a,c,11.6,high-.3,'#bdc1b5',.22,d/len,Math.min(1,(d+.25)/len));}
      }else{
        wallPanel(concrete,a,c,low,high,'#bfc4b9');
        const rows=low===g.northUpper?[[low+.25,high-.25,low]]:Array.from({length:5},(_,row)=>[Math.max(low,row*4+.25),Math.min(high-.25,(row+1)*4-.2),row*4]);
        for(const [bottom,top,band] of rows){
          if(top-bottom<.3)continue;
          const count=Math.max(1,Math.round(len/3.1));
          wallPanel(glass,a,c,bottom,top,'#506a70',.04);
          for(let bay=0;bay<count;bay++){
            const l=(bay+.05)/count,r=(bay+.38)/count;
            wallPanel(detail,a,c,bottom,top,bay%4===0?'#b1b9af':'#d1d5c8',.15,l,r);
            wallPanel(detail,a,c,bottom,bottom+(top-bottom)*.32,'#81928b',.07,(bay+.4)/count,(bay+.98)/count);
            wallPanel(detail,a,c,bottom,top,'#b9c4b9',.1,(bay+.66)/count,(bay+.68)/count);
          }
          const bandLow=Math.max(low,band),bandHigh=Math.min(high,band+.25);
          if(bandHigh>bandLow)wallPanel(detail,a,c,bandLow,bandHigh,'#354c4b',.35);
        }
        for(let d=.1;d<len;d+=9.4)wallPanel(detail,a,c,low,high,'#324946',.39,d/len,Math.min(1,(d+.28)/len));
      }
      wallPanel(detail,a,c,high-.25,high,'#3e5150',.4);
    };
    const prism=(part,low,high,mode)=>{
      const ring=polygonArea(part.points)<0?[...part.points].reverse():part.points;
      polygon(roofs,ring,high,mode==='white'?'#c7cdc0':'#939f96',part.holes);
      // Double-sided undersides are explicit physical floors over the drive.
      if(low>0)polygon(undersides,ring,low,'#d4d8ca',part.holes);
      for(const loop of [ring,...part.holes.map(h=>polygonArea(h)>0?[...h].reverse():h)])for(let i=0;i<loop.length;i++){
        const a=loop[i],c=loop[(i+1)%loop.length],len=distance2(a,c);if(len<.1)continue;
        if(mode==='white'){
          const nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,tilt=.65;
          const p=(t,y,offset)=>[a.x+(c.x-a.x)*t+nx*offset,y,a.z+(c.z-a.z)*t+nz*offset];
          const count=Math.max(1,Math.round(len/2.2));
          for(let k=0;k<count;k++){
            const l=(k+.006)/count,r=(k+.994)/count,y=low+(high-low)*(.47+(k%2)*.12);
            for(const [y0,y1] of [[low,y-.018],[y+.018,high]]){
              const off0=tilt*(y0-low)/(high-low),off1=tilt*(y1-low)/(high-low);
              concrete.quad(p(l,y0,off0),p(l,y1,off1),p(r,y1,off1),p(r,y0,off0),'#d4d8ce');
            }
            batchBeam(detail,p(r,low,0),p(r,high,tilt),.012,'#8d9e94');
          }
        }else gridFacade(a,c,low,high,mode==='north');
      }
      addCollider({points:ring,holes:part.holes,bottom:low,top:high,base:b.base});
    };
    for(const part of RUPERT_PARTS){
      if(part.kind==='north-portico'){
        prism(part,g.whiteBoxBottom,g.whiteBoxTop,'white');prism(part,g.northUpper,g.northTop,'north');
      }else if(part.kind==='west-bridge')prism(part,g.corridor.westBottom,g.northTop,'grid');
      else if(part.kind==='east-bridge')prism(part,g.corridor.eastBottom,b.height,'grid');
      else if(part.kind==='north')prism(part,0,g.northTop,'north');
      else prism(part,0,b.height,'grid');
    }
    // Black entrance frame and open middle terrace. Columns stay outside the
    // mapped drive / footway envelope; their precise positions are estimated.
    for(const p of g.columns){
      const ground=terrainHeight(p.x,p.z)-b.base;
      detail.box(p.x,(ground+g.northUpper)/2,p.z,.38,g.northUpper-ground,.38,'#2c4140',Math.atan2(-f.u.z,f.u.x));
      addCollider({x:p.x,z:p.z,radius:p.radius,base:b.base,bottom:ground,top:g.northUpper});
    }
    for(const v of [-8.8,4.8])for(const y of [g.whiteBoxTop-.1,g.northUpper,g.northTop-.1])batchBeam(detail,pointAt(-22.1,v,y),pointAt(-10,v,y),.18,'#304442');
    for(const u of [-22.1,-10])for(const y of [g.northUpper,g.northTop-.1])batchBeam(detail,pointAt(u,-16,y),pointAt(u,4.8,y),.18,'#304442');
    const cover=frameRectangle(f,12.1,1.9,-16.05,-7.6);polygon(roofs,cover,g.whiteBoxTop,'#a8b4a6');polygon(undersides,cover,g.whiteBoxTop-.22,'#d4d8ca');
    const labelA=framePoint(f,-10,-8.85),labelC=framePoint(f,-22.1,-8.85);
    facadeCaption(b,labelA,labelC,'Rupert Myers · North Wing',7.6,g.whiteBoxTop-.6,'#d3ddcc');
    // The southern lawn is already a source courtyard hole. Seats follow the
    // photographed black brick edges while leaving the longitudinal footway open.
    for(const u of [-7,8.5]){
      const a=framePoint(f,u,12),c=framePoint(f,u,25),y=Math.max(terrainHeight(a.x,a.z),terrainHeight(c.x,c.z))-b.base+.35;
      batchBeam(brick,[a.x,y,a.z],[c.x,y,c.z],.2,'#3f4e45');
    }
    const glazing=glass.mesh(style('#ffffff',{vertexColors:true,roughness:.08,metalness:.62,envMapIntensity:1.1}));
    world.add(glazing,undersides.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    medicalReflection(glazing,framePoint(f,1,8),b.base+9);
  }

  function sirfBuilding(b,concrete,glass,detail,roofs){
    const metal=new Batch(),screen=new Batch(),soffit=new Batch(),glazing=new Batch(),interior=new Batch(),apron=new Batch();
    for(const batch of [metal,screen,soffit,glazing,interior,apron])batch.base=b.base;
    const at=p=>[p.x,p.y,p.z],mix=(a,c,t)=>({x:a.x+(c.x-a.x)*t,y:a.y+(c.y-a.y)*t,z:a.z+(c.z-a.z)*t});
    // Preserve the source roof and quieter service elevations. Visible folds,
    // opening positions and recesses are photo-fitted, unmeasured components.
    for(const i of [1,2])wallPanel(concrete,b.points[i],b.points[(i+1)%b.points.length],0,b.height,'#b6beb8');
    for(const [i,f] of SIRF_FACETS.entries())metal.triangle(...f.points.map(at),['#bec7c4','#cbd1cd','#b2beba'][i%3],f.local.map(p=>[p.x/2,p.z/2]));
    for(const seam of SIRF_PANEL_SEAMS)batchBeam(detail,at(seam.a),at(seam.c),.009,'#82948d');
    // The photograph separates a perforated outer strip from a solid soffit.
    // Only the strip uses cut-outs; the main recess keeps a continuous ceiling.
    for(const q of SIRF_HOOD){
      const a=mix(q[0],q[3],.23),c=mix(q[1],q[2],.23),len=Math.hypot(q[1].x-q[0].x,q[1].y-q[0].y,q[1].z-q[0].z),depth=Math.hypot(q[3].x-q[0].x,q[3].y-q[0].y,q[3].z-q[0].z);
      screen.quad(at(q[0]),at(q[1]),at(c),at(a),'#82918a',[[0,0],[len*5,0],[len*5,depth*1.15],[0,depth*1.15]]);
      soffit.quad(at(a),at(c),at(q[2]),at(q[3]),'#74776b',[[0,0],[len/2,0],[len/2,depth/2],[0,depth/2]]);
      for(let t=.08;t<1;t+=.08)batchBeam(detail,at(mix(a,c,t)),at(mix(q[3],q[2],t)),.012,'#58675e');
      batchBeam(detail,at(a),at(c),.022,'#52685e');
    }
    for(const q of SIRF_PORTALS){
      const face=SIRF.facades.find(f=>f.index===q.faceIndex),p=(t,y,offset=0)=>at(sirfPoint(face,t,y,-q.recess+offset));
      glazing.triangle(...q.innerWorld.map(at),'#a4b7aa',q.inner.map(([t,y])=>[t*face.len/2,y/2]));
      // Muted backing and sparse yellow structure give the visible glass depth;
      // these are fitted exterior cues, not a recreated laboratory interior.
      interior.triangle(...q.inner.map(([t,y])=>p(t,y,-1.0)),'#364b42');
      for(let t=q.l+.7/face.len;t<q.r;t+=3/face.len){const h=sirfGlassTop(q,t);if(h>1.3)batchBeam(interior,p(t,q.bottom,-.38),p(t,h,-.38),.11,'#c2a451');}
      for(let t=q.l;t<=q.r;t+=1.4/face.len){const h=sirfGlassTop(q,t);if(h>q.bottom+.05)batchBeam(detail,p(t,q.bottom,.035),p(t,h,.035),.035,'#a5b4a8');}
      for(const y of [2.6,4.65])if(y<q.glassPeak){const [l,r]=sirfGlassSpan(q,y);batchBeam(detail,p(l,y,.04),p(r,y,.04),.035,'#9eafa2');}
      for(let i=0;i<3;i++)batchBeam(detail,at(q.innerWorld[i]),at(q.innerWorld[(i+1)%3]),.045,'#aab9ad');
    }
    for(const part of SIRF_LOWER_BODY){
      for(const ring of [part.points,...part.holes])for(let i=0;i<ring.length;i++)wallPanel(concrete,ring[i],ring[(i+1)%ring.length],0,.25,'#b8bcae');
      addCollider({...part,base:b.base,top:b.height});
    }
    for(const patch of SIRF_RECESS){shapedRoof(apron,patch.points,p=>terrainHeight(p.x,p.z)-b.base+.22,'#b3b7aa',patch.holes);groundPatches.push({...patch,heightAt:(x,z)=>terrainHeight(x,z)+.22});}
    for(const slice of SIRF_HOOD_COLLIDERS)addCollider({...slice,base:b.base});
    addCollider({points:b.points,base:b.base,bottom:b.height-.12,top:b.height});
    const perforation=canvasTexture(64,64,ctx=>{ctx.fillStyle='white';ctx.fillRect(0,0,64,64);ctx.fillStyle='black';for(let y=0;y<64;y+=16)for(let x=-8;x<72;x+=16){ctx.beginPath();ctx.ellipse(x+(y%32?8:0),y,4,2.2,-.35,0,TAU);ctx.fill();}});
    perforation.wrapS=perforation.wrapT=THREE.RepeatWrapping;perforation.anisotropy=4;
    const glassMesh=glazing.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,transparent:true,opacity:.76,roughness:.1,metalness:.35,envMapIntensity:1.0}));
    world.add(metal.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,metalness:.55,roughness:.48})),screen.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,alphaMap:perforation,alphaTest:.5,metalness:.5,roughness:.55})),soffit.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.85})),interior.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),apron.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),roughness:.96}),false),glassMesh);
    medicalReflection(glassMesh,b.points[0],b.base+3);
    polygon(roofs,b.points,b.height,'#a9b5ab');
  }

  function agsmCourtyard(){
    const paving=new Batch(),stone=new Batch(),metal=new Batch(),wood=new Batch(),fabric=new Batch();for(const b of [paving,stone,metal,wood,fabric])b.base=0;
    const f=AGSM_COURT.frame,y=(x,z)=>agsmCourtHeight(x,z)??terrainHeight(x,z)+.22,at=(p,h)=>[p.x,h,p.z];
    for(const tri of AGSM_COURT_TRIANGLES)paving.triangle(...tri.map(p=>[p.x,p.y,p.z]),'#c8ad7c');
    for(const r of AGSM_COURT_RISERS)stone.quad([r.a.x,r.top0-r.height,r.a.z],[r.a.x,r.top0,r.a.z],[r.c.x,r.top1,r.c.z],[r.c.x,r.top1-r.height,r.c.z],'#b3aa91');
    const angle=Math.atan2(-f.u.z,f.u.x);
    for(const table of AGSM_TABLES){
      const floor=y(table.x,table.z);metal.box(table.x,floor+.76,table.z,.86,.055,.86,'#b7c1b7',angle);batchPipe(metal,[table.x,floor+.03,table.z],[table.x,floor+.74,table.z],.04,'#929e93');
      batchBeam(metal,[table.x-f.u.x*.34,floor+.045,table.z-f.u.z*.34],[table.x+f.u.x*.34,floor+.045,table.z+f.u.z*.34],.025,'#87968a');
      batchBeam(metal,[table.x-f.v.x*.34,floor+.045,table.z-f.v.z*.34],[table.x+f.v.x*.34,floor+.045,table.z+f.v.z*.34],.025,'#87968a');
      addCollider({x:table.x,z:table.z,radius:table.radius,base:0,bottom:floor,top:floor+.80});
      for(const chair of table.chairs){
        const n={x:f.u.x*Math.cos(chair.theta)+f.v.x*Math.sin(chair.theta),z:f.u.z*Math.cos(chair.theta)+f.v.z*Math.sin(chair.theta)},t={x:-f.u.x*Math.sin(chair.theta)+f.v.x*Math.cos(chair.theta),z:-f.u.z*Math.sin(chair.theta)+f.v.z*Math.cos(chair.theta)},floor=y(chair.x,chair.z),point=(s,d,h)=>[chair.x+t.x*s+n.x*d,h,chair.z+t.z*s+n.z*d];
        for(let d=-.18;d<=.18;d+=.06)batchBeam(metal,point(-.2,d,floor+.45),point(.2,d,floor+.45),.018,'#c0c8bb');
        for(const side of [-.2,.2]){batchPipe(metal,point(side,-.18,floor+.025),point(side,-.18,floor+.45),.015,'#a8b7a8');batchPipe(metal,point(side,.18,floor+.025),point(side,.18,floor+.92),.015,'#a8b7a8');}
        for(let side=-.18;side<=.18;side+=.06)batchPipe(metal,point(side,.19,floor+.54),point(side,.19,floor+.90),.013,'#c0c8b9');batchPipe(metal,point(-.20,.19,floor+.92),point(.20,.19,floor+.92),.017,'#aab9a9');
        addCollider({x:chair.x,z:chair.z,radius:chair.radius,base:0,bottom:floor,top:floor+.94});
      }
      if(table.shade){
        const points=Array.from({length:8},(_,i)=>({x:table.x+Math.cos(i*TAU/8)*table.shadeRadius,z:table.z+Math.sin(i*TAU/8)*table.shadeRadius}));
        for(let i=0;i<8;i++){const a=points[i],c=points[(i+1)%8];fabric.triangle(at(a,floor+table.shadeEave),[table.x,floor+table.shadePeak,table.z],at(c,floor+table.shadeEave),i%2?'#ded5b9':'#e7dfc6');batchPipe(metal,at(a,floor+table.shadeEave-.025),[table.x,floor+table.shadePeak-.025,table.z],.012,'#a5ad9a');}
        batchPipe(metal,[table.x,floor+.03,table.z],[table.x,floor+table.shadePeak,table.z],.025,'#8c9988');addCollider({points,base:0,bottom:floor+table.shadeEave-.025,top:floor+table.shadePeak});
      }
    }
    const vines=[];
    for(const screen of AGSM_TRELLISES){
      const floor=y(screen.x,screen.z),point=(u,h,d=0)=>[screen.x+screen.t.x*u+screen.n.x*d,floor+h,screen.z+screen.t.z*u+screen.n.z*d];
      for(const side of [-screen.width/2,screen.width/2])batchBeam(metal,point(side,.05),point(side,screen.height),.035,'#3f4b3d');
      for(let h=.45;h<=screen.height;h+=.22)batchBeam(metal,point(-screen.width/2,h),point(screen.width/2,h),.013,'#52614c');
      for(let u=-screen.width/2+.16;u<screen.width/2;u+=.22)batchBeam(metal,point(u,.3),point(u,screen.height),.012,'#52614c');
      polygon(stone,screen.planter,floor+.31,'#94947e');for(let i=0;i<4;i++)wallPanel(stone,screen.planter[i],screen.planter[(i+1)%4],floor,floor+.31,'#ada58d');
      for(const side of [-1,1]){const p=point(side*screen.width*.38,.175,.55);stone.box(p[0],p[1],p[2],.14,.35,.36,'#a7a18b',Math.atan2(-screen.t.z,screen.t.x));}
      polygon(wood,screen.bench,floor+.44,'#8e7f60');for(let i=0;i<4;i++)wallPanel(wood,screen.bench[i],screen.bench[(i+1)%4],floor+.35,floor+.44,'#7e7057');
      addCollider({points:screen.planter,base:0,bottom:floor,top:floor+screen.height});addCollider({points:screen.bench,base:0,bottom:floor,top:floor+.44});
      const form=agsmVineForm(screen);for(const branch of form.branches)batchPipe(wood,point(branch.a[0],branch.a[1],branch.a[2]),point(branch.b[0],branch.b[1],branch.b[2]),.023,'#6b6146');
      for(const leaf of form.leaves)vines.push({leaf,p:point(leaf.along,leaf.y,leaf.off)});
    }
    const leaves=new THREE.InstancedMesh(new THREE.PlaneGeometry(1,.52),style('#53724a',{side:THREE.DoubleSide,roughness:.92}),vines.length),dummy=new THREE.Object3D();
    for(let i=0;i<vines.length;i++){const {leaf,p}=vines[i];dummy.position.set(...p);dummy.rotation.set(leaf.rx,leaf.ry,leaf.rz);dummy.scale.set(leaf.size,leaf.size,1);dummy.updateMatrix();leaves.setMatrixAt(i,dummy.matrix);}leaves.instanceMatrix.needsUpdate=true;leaves.castShadow=true;leaves.receiveShadow=true;world.add(leaves);
    const texture=canvasTexture(512,512,ctx=>{const random=rng(1997);ctx.fillStyle='#8d8b7b';ctx.fillRect(0,0,512,512);for(let row=0;row<8;row++)for(let col=-1;col<5;col++){const x=col*128+(row%2)*64,y=row*64;ctx.fillStyle=`hsl(${38+random()*6} ${12+random()*8}% ${69+random()*9}%)`;ctx.fillRect(x+1,y+1,126,62);for(let i=0;i<20;i++){ctx.fillStyle=random()>.5?'#ffffff14':'#4b493b13';ctx.fillRect(x+random()*128,y+random()*64,random()*12,1);}}});texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.anisotropy=8;
    world.add(paving.mesh(style('#ffffff',{vertexColors:true,map:texture,bumpMap:texture,bumpScale:.012,roughness:.95}),false),stone.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),roughness:.94,side:THREE.DoubleSide})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.55,roughness:.45})),wood.mesh(style('#ffffff',{vertexColors:true,roughness:.9})),fabric.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.95})));
  }

  function agsmBuilding(b,concrete,brick,glass,detail,roofs){
    const g=agsmGeometry(b),f=g.frame,curveGlass=new Batch(),screens=new Batch(),trim=new Batch(),done=new Set();curveGlass.base=screens.base=trim.base=b.base;
    const courtyardFace=face=>{
      const a=face.a,c=face.c,len=face.length,at=(d,y,off=0)=>{const p=agsmOffsetPoint(face,d,off);return [p.x,y,p.z];},rect=(batch,l,r,lo,hi,color,off=0)=>{if(r>l&&hi>lo)batch.quad(at(l,lo,off),at(l,hi,off),at(r,hi,off),at(r,lo,off),color,[[l/2,lo/2],[l/2,hi/2],[r/2,hi/2],[r/2,lo/2]]);},B=AGSM_COURT_BANDS;
      // Recessed gallery windows sit behind the real front railing / piers.
      rect(concrete,0,len,0,AGSM_MASSING.courtRoof,'#a9afa0',-1.05);
      rect(curveGlass,0,len,B.groundBottom,B.groundTop,'#496c69',.03);
      rect(curveGlass,0,len,B.screenBottom,B.screenTop,'#566d68',.02);
      rect(curveGlass,0,len,B.galleryFloor+.3,B.galleryTop,'#3f5e59',-.82);
      rect(detail,0,len,0,.4,'#899588',.05);rect(trim,0,len,3.76,4.17,'#aab9ae',.14);
      rect(trim,0,len,7.82,8.12,'#8c9e95',.21);
      trim.quad(at(0,B.galleryFloor,.24),at(len,B.galleryFloor,.24),at(len,B.galleryFloor,-.95),at(0,B.galleryFloor,-.95),'#bdc7b9');
      for(let i=0;i<5;i++)rect(trim,0,len,B.galleryFloor+.24+i*.17,B.galleryFloor+.29+i*.17,'#b7c4bb',.25);
      rect(trim,0,len,B.galleryFloor+1.10,B.galleryFloor+1.15,'#99572f',.25);
      // Thin projecting roof edge and striped metal soffit, visible in the archive.
      rect(trim,0,len,B.roofBottom,AGSM_MASSING.courtRoof,'#c5cdbd',.65);
      trim.quad(at(0,AGSM_MASSING.courtRoof,.65),at(0,AGSM_MASSING.courtRoof,0),at(len,AGSM_MASSING.courtRoof,0),at(len,AGSM_MASSING.courtRoof,.65),'#c6cdbd');
      trim.quad(at(0,B.roofBottom,.65),at(len,B.roofBottom,.65),at(len,B.roofBottom,-.95),at(0,B.roofBottom,-.95),'#5d7068');
      for(let d=.1;d<len;d+=.32)batchBeam(trim,at(d,B.roofBottom-.016,.62),at(d,B.roofBottom-.016,-.92),.014,'#8b9c93');
      for(const cell of agsmFaceCells(face)){
        const l=Math.max(cell.start,cell.fullStart+.16),r=Math.min(cell.end,cell.fullEnd-.16);if(r-l<.08)continue;
        const screen=agsmScreen(cell),points=[at(l,screen.bottom,screen.bottomProjection),at(l,screen.top,screen.topProjection),at(r,screen.top,screen.topProjection),at(r,screen.bottom,screen.bottomProjection)];
        screens.quad(...points,cell.index%3?'#d3d4c3':'#c7ccbc',[[l/2,0],[l/2,(screen.top-screen.bottom)/2],[r/2,(screen.top-screen.bottom)/2],[r/2,0]]);
        for(const d of [l,r]){batchBeam(trim,at(d,screen.bottom,screen.bottomProjection+.015),at(d,screen.top,screen.topProjection+.015),.024,'#55635a');batchBeam(trim,at(d,screen.bottom,.02),at(d,screen.bottom,screen.bottomProjection),.017,'#64756a');}
        const mid=(screen.bottom+screen.top)/2,projection=(screen.bottomProjection+screen.topProjection)/2;batchBeam(trim,at(l,mid,projection+.008),at(r,mid,projection+.008),.012,'#a5af9f');
        // Pale square portal with recessed dark glazing and a paired door seam.
        rect(trim,l,r,.4,.58,'#c7d1bf',.24);rect(trim,l,r,3.28,3.52,'#d2d8c7',.27);
        for(const d of [l,r])rect(trim,d-.08,d+.08,.4,3.52,'#c8d0be',.24);
        const centre=(l+r)/2;rect(trim,centre-.015,centre+.015,.58,3.27,'#71867a',.10);
        for(const d of [centre-.12,centre+.12])batchPipe(trim,at(d,1.2,.16),at(d,1.64,.16),.017,'#a8b9a7');
        if(cell.anchor>=-1e-7&&cell.anchor<len-1e-7){
          const q=at(cell.anchor,0,.10),yaw=Math.atan2(-(c.z-a.z),c.x-a.x);
          for(const [bottom,top,width,color] of [[.35,3.73,.20,'#965b36'],[4.18,7.82,.11,'#485f55'],[8.1,11.86,.24,'#965b36']])trim.box(q[0],(bottom+top)/2,q[2],width,top-bottom,.22,color,yaw);
          rect(trim,cell.anchor-.015,cell.anchor+.015,8.12,9.22,'#9aaea0',.25);
          rect(trim,cell.anchor-.02,cell.anchor+.02,8.4,11.7,'#a4b7a8',-.78);
        }
      }
    };
    for(const wall of AGSM_FACADE_WALLS){
      const {a,c,bottom,top}=wall,len=distance2(a,c);if(len<1e-7)continue;
      const face=agsmFacadeFace(a,c);
      if(face?.kind==='glazed'&&bottom===0){if(!done.has(face.index)){courtyardFace(face);done.add(face.index);}continue;}
      if(wall.shared){
        wallPanel(concrete,a,c,bottom,top,'#c5c7b7');
        if(wall.kind==='upper'){
          wallPanel(curveGlass,a,c,bottom+.67,top-.75,'#57746c',.035);
          for(let d=.1;d<len;d+=1.4)wallPanel(trim,a,c,bottom+.67,top-.75,'#b0bfb0',.08,d/len,Math.min(1,(d+.045)/len));
          wallPanel(trim,a,c,bottom+.48,bottom+.70,'#d0d6c5',.12);wallPanel(trim,a,c,top-.3,top,'#d1d6c8',.14);
        }
        continue;
      }
      // Retained brick street treatments and older courtyard wing. Roof limits
      // follow their clipped component rather than an unbroken twenty-metre wall.
      wallPanel(brick,a,c,0,top,'#b3a27c');wallPanel(detail,a,c,0,.4,'#8d9383',.04);
      if(len>1){const bays=Math.max(1,Math.round(len/2.6));for(let row=0;row<5;row++){
        const low=row*g.rowPitch+.75,high=Math.min((row+1)*g.rowPitch-1.1,top-.7);if(high<=low)continue;
        wallPanel(detail,a,c,low-.1,high+.12,'#46584f',.055,.015,.985);
        for(let bay=0;bay<bays;bay++){const start=(bay+.05)/bays,end=(bay+.95)/bays;wallPanel(glass,a,c,low,high,'#7c8f80',.075,start,end);if((bay+row)%4!==0)wallPanel(detail,a,c,low+.1,high-.05,'#bbc3ad',.085,start+.02/bays,end-.02/bays);wallPanel(detail,a,c,low-.08,high+.1,'#647567',.13,(bay+.96)/bays,(bay+1)/bays);}
        wallPanel(concrete,a,c,high+.13,high+.3,'#c8cabb',.19);
      }}wallPanel(detail,a,c,top-.25,top,'#d0d4c4',.3);
    }
    for(const part of AGSM_FACADE_PARTS){polygon(roofs,part.points,part.height,'#a6b1a0',part.holes);addCollider({...part,base:b.base,top:part.height});}
    const skin=curveGlass.mesh(style('#ffffff',{vertexColors:true,metalness:.4,roughness:.11,envMapIntensity:.8,side:THREE.DoubleSide}));world.add(skin,screens.mesh(style('#ffffff',{vertexColors:true,roughness:.92,side:THREE.DoubleSide})),trim.mesh(style('#ffffff',{vertexColors:true,metalness:.23,roughness:.6,side:THREE.DoubleSide})));medicalReflection(skin,agsmCourtPoint(3,15),b.base+5);
    // Slatted pergola follows the mapped curved courtyard wall. The passage
    // below remains open, with physically collidable slender support posts.
    const roof=new Batch();roof.base=b.base;
    for(let i=0;i<g.pergola.length-1;i++){
      const a=g.pergola[i],c=g.pergola[i+1],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
      const p=(t,y,off)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off];
      const high=AGSM_PERGOLA.front,low=AGSM_PERGOLA.back;
      batchBeam(roof,p(0,low,.15),p(1,low,.15),.08,'#566a5d');batchBeam(roof,p(0,high,1.8),p(1,high,1.8),.1,'#546b5b');
      for(let d=0;d<len;d+=.4)batchBeam(roof,p(d/len,low,.1),p(d/len,high,1.95),.045,'#6d8170');
      if(i%2===0){const q=p(.5,0,1.75),ground=(agsmCourtHeight(q[0],q[2])??terrainHeight(q[0],q[2]))-b.base;batchPipe(detail,[q[0],ground,q[2]],[q[0],high,q[2]],.07,'#738473');addCollider({x:q[0],z:q[2],radius:.09,base:b.base,bottom:ground,top:high});}
      addCollider({points:[p(0,0,.1),p(1,0,.1),p(1,0,1.95),p(0,0,1.95)].map(q=>({x:q[0],z:q[2]})),base:b.base,bottom:low-.08,top:high+.1});
    }
    world.add(roof.mesh(style('#ffffff',{vertexColors:true,metalness:.35})));
    agsmCourtyard();
  }

  function civilBuilding(b,brick,concrete,aggregate,glass,detail,roofs){
    const g=civilGeometry(b),f=g.frame,outline=lectureFacadeRing(b.points),ring=polygonArea(outline)<0?[...outline].reverse():outline;
    const west=civilWestFacade(b);
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nv=nx*f.v.x+nz*f.v.z;
      if(nx*f.u.x+nz*f.u.z<-.8){
        const W=west,at=(u,y,off=0)=>[a.x+(c.x-a.x)*u/len+nx*off,y,a.z+(c.z-a.z)*u/len+nz*off],rect=(batch,q,color,off=0)=>batch.quad(at(q.left,q.bottom,off),at(q.left,q.top,off),at(q.right,q.top,off),at(q.right,q.bottom,off),color,[[q.left/2,q.bottom/2],[q.left/2,q.top/2],[q.right/2,q.top/2],[q.right/2,q.bottom/2]]);
        for(const q of W.masonry)rect(brick,q,'#966e50');
        for(const w of W.windows){
          rect(glass,w,'#405957',-w.recess);
          const corners=[[w.left,w.bottom],[w.left,w.top],[w.right,w.top],[w.right,w.bottom]];for(let j=0;j<4;j++){const p=corners[j],q=corners[(j+1)%4];detail.quad(at(...p,.025),at(...q,.025),at(...q,-w.recess),at(...p,-w.recess),j===0?'#b0b5a3':'#c6c6ad');}
          for(const q of [{left:w.left,right:w.left+w.frame,bottom:w.bottom,top:w.top},{left:w.right-w.frame,right:w.right,bottom:w.bottom,top:w.top},{left:w.left,right:w.right,bottom:w.bottom,top:w.bottom+w.frame},{left:w.left,right:w.right,bottom:w.top-w.frame,top:w.top}])rect(detail,q,'#d0cdb7',.035);
          const mid=(w.left+w.right)/2;rect(detail,{left:mid-.012,right:mid+.012,bottom:w.bottom+w.frame,top:w.top-w.frame},'#aab4a2',-.09);
          if((w.row*7+w.column*3)%9<3)rect(detail,{left:w.left+w.frame,right:w.right-w.frame,bottom:w.bottom+.54,top:w.top-w.frame},'#b7b8a8',-.115);
        }
        for(const pipe of W.pipes){batchPipe(detail,at(pipe.s,pipe.bottom,.105),at(pipe.s,pipe.top,.105),pipe.radius,'#d1d0b8');for(let y=pipe.bottom+.4;y<pipe.top;y+=g.pitch)batchBeam(detail,at(pipe.s,y,.01),at(pipe.s,y,.16),.025,'#7f8d7b');}
        wallPanel(aggregate,a,c,g.bodyRoof-.22,g.bodyRoof,'#bfc4b4',.22);continue;
      }
      wallPanel(concrete,a,c,0,g.bodyRoof,'#a6aba7');
      wallPanel(detail,a,c,0,g.upperBase,'#46545a',.04);
      if(Math.abs(nv)>.7){
        const bays=Math.max(1,Math.round(len/2.35));
        for(let row=0;row<g.rows;row++){
          const low=g.upperBase+row*g.pitch,high=low+g.pitch;
          wallPanel(aggregate,a,c,low,low+g.pitch*.48,'#bdc1b8',.48);
          for(let bay=0;bay<bays;bay++){
            const left=(bay+.025)/bays,right=(bay+.975)/bays,blind=(bay*3+row*7)%11;
            wallPanel(glass,a,c,low+g.pitch*.51,high-.1,'#627977',.06,left,right);
            if(blind<4)wallPanel(detail,a,c,low+g.pitch*(blind===0?.52:.7),high-.1,'#d2d7ca',.08,left,right);
            if(blind===7)wallPanel(detail,a,c,low+g.pitch*.51,high-.1,'#7c8378',.09,left,right);
            wallPanel(detail,a,c,low+g.pitch*.74,low+g.pitch*.755,'#a4b0a4',.1,left,right);
            wallPanel(detail,a,c,low+g.pitch*.48,high,'#9ca99e',.12,(bay+.97)/bays,(bay+1)/bays);
          }
        }
        for(let d=2;d<len;d+=5.7){
          const t=d/len,x=a.x+(c.x-a.x)*t+nx*.63,z=a.z+(c.z-a.z)*t+nz*.63;
          batchPipe(detail,[x,g.upperBase-.2,z],[x,g.bodyRoof+.15,z],.045,'#4d5d56');
          for(let y=g.upperBase+1;y<g.bodyRoof;y+=g.pitch)batchBeam(detail,[x,y,z],[x-nx*.6,y,z-nz*.6],.025,'#7f8d7f');
        }
        if(nv<-.7){
          const centre=(g.entry.x-a.x)*(c.x-a.x)/(len*len)+(g.entry.z-a.z)*(c.z-a.z)/(len*len),start=Math.max(.01,centre-6/len),end=Math.min(.99,centre+6/len),ground=g.entryGround-b.base;
          wallPanel(glass,a,c,ground+.05,ground+3.1,'#687f78',.12,start,end);
          wallPanel(detail,a,c,ground+3.1,ground+4.05,'#495a60',.75,start-.015,end+.015);
          for(let d=start*len;d<end*len;d+=1.45)wallPanel(detail,a,c,ground,ground+3.1,'#bdc8b5',.18,d/len,Math.min(end,(d+.07)/len));
          const p=t=>({x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t});
          facadeCaption(b,p(start),p(end),'Civil & Environmental Engineering · H20',10,ground+3.65,'#e0e6d6');
        }
      }else{
        // Short tower ends are mostly solid, with a service strip and small bays.
        for(let row=0;row<g.rows;row++){
          const low=g.upperBase+row*g.pitch;
          wallPanel(aggregate,a,c,low,low+g.pitch*.5,'#bdc1b8',.25);
          wallPanel(glass,a,c,low+g.pitch*.55,low+g.pitch-.2,'#5b716f',.06,.36,.6);
          wallPanel(detail,a,c,g.upperBase,g.bodyRoof,'#7e8e82',.09,.62,.66);
        }
      }
      wallPanel(aggregate,a,c,g.bodyRoof-.25,g.bodyRoof,'#c4c9bc',.5);
    }
    polygon(roofs,b.points,g.bodyRoof,'#a5b0a1');
    const p=g.plant,ringP=p.points;
    polygon(roofs,ringP,p.top,'#abb5a7');
    for(let i=0;i<ringP.length;i++)wallPanel(concrete,ringP[i],ringP[(i+1)%ringP.length],p.bottom,p.top,'#c2c7bc');
    addCollider({points:b.points,holes:b.holes,top:g.bodyRoof,base:b.base});
  }

  function patriciaBuilding(b,concrete,brick,glass,detail,roofs){
    const g=patriciaGeometry(b),f=g.frame,outline=lectureFacadeRing(b.points),ring=polygonArea(outline)<0?[...outline].reverse():outline,y=rl=>rl-b.base;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z;
      wallPanel(brick,a,c,0,b.height,'#8d7958');
      wallPanel(detail,a,c,b.height-.2,b.height,'#a9b49f',.15);
      if(Math.abs(nu)>.8&&len>12){
        const ground=terrainHeight((a.x+c.x)/2,(a.z+c.z)/2)-b.base,baseTop=ground+3.4;
        // Faceted pale foyer panels surround an inset glass entrance.
        for(let d=0;d<len;d+=3.1){
          const t=d/len,u=Math.min(1,(d+3.1)/len),p=(t,h,off)=>[a.x+(c.x-a.x)*t+nx*off,h,a.z+(c.z-a.z)*t+nz*off];
          const entrance=nu>.8&&d>len*.3&&d<len*.68;
          if(entrance){
            wallPanel(glass,a,c,ground+.05,baseTop-.15,'#647e75',.055,t,u);
            for(const edge of [t,(t+u)/2,u])wallPanel(detail,a,c,ground,baseTop-.1,'#aab9a5',.085,edge,Math.min(1,edge+.06/len));
            wallPanel(detail,a,c,ground+1.05,ground+1.1,'#bfc9b3',.09,t,u);
          }
          else{
            concrete.quad(p(t,0,.5),p(t,baseTop,0),p(u,baseTop,0),p(u,0,.5),'#bdbfae');
            wallPanel(detail,a,c,ground+1.05,ground+1.08,'#929f91',.39,t,u);
            wallPanel(glass,a,c,baseTop-1.15,baseTop-.35,'#8b9f8d',.12,t+.12/len,Math.max(t,Math.min(u,u-.12/len)));
          }
        }
        if(nu>.8){
          wallPanel(glass,a,c,baseTop+.6,b.height-1.8,'#7c9284',.05,.39,.57);
          for(let t=.4;t<.58;t+=.04)wallPanel(detail,a,c,baseTop+.6,b.height-1.8,'#b8c3ac',.1,t,t+.002);
          // Dark ribs carry the transparent canopy along the east foyer.
          const canopy=new Batch();canopy.base=b.base;
          const p=(t,h,off)=>[a.x+(c.x-a.x)*t+nx*off,h,a.z+(c.z-a.z)*t+nz*off];
          canopy.quad(p(0,baseTop+.15,0),p(1,baseTop+.15,0),p(1,baseTop+.15,2),p(0,baseTop+.15,2),'#8baea6');
          for(let d=.1;d<len;d+=1.35)batchBeam(detail,p(d/len,baseTop+.08,0),p(d/len,baseTop+.08,2.15),.07,'#344c45');
          batchBeam(detail,p(0,baseTop+.05,2),p(1,baseTop+.05,2),.09,'#364d46');
          world.add(canopy.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,transparent:true,opacity:.55,roughness:.18})));
          facadeCaption(b,a,c,'Patricia O’Shane · E19',6.5,ground+2.7,'#d1dac7');
        }
      }
    }
    polygon(roofs,b.points,b.height,'#a0ac98');
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
    // The external north-east stair occupies the mapped recess. Its dimensions
    // and terrace level are reconstructed from the publicly photographed stair.
    const s=g.stair,dx=s.b.x-s.a.x,dz=s.b.z-s.a.z,len=Math.hypot(dx,dz),nx=-dz/len,nz=dx/len;
    const p=(t,side,h)=>[s.a.x+dx*t+nx*s.width/2*side,y(h),s.a.z+dz*t+nz*s.width/2*side];
    stairSegments.push({a:s.a,b:s.b,width:s.width,count:s.count,h0:s.lowRL,h1:s.highRL});
    for(let i=0;i<s.count;i++){
      const t=i/s.count,u=(i+1)/s.count,h=s.lowRL+(s.highRL-s.lowRL)*i/s.count,previous=h-(s.highRL-s.lowRL)/s.count;
      detail.quad(p(t,1,h),p(u,1,h),p(u,-1,h),p(t,-1,h),'#b8bea7');
      detail.quad(p(t,1,previous),p(t,1,h),p(t,-1,h),p(t,-1,previous),'#919e87');
    }
    for(const side of [-1,1]){
      const low=s.lowRL,high=s.highRL;
      detail.quad(p(0,side,low-.15),p(0,side,low+1.03),p(1,side,high+1.03),p(1,side,high-.15),'#c7c7a5');
      detail.quad(p(1,side,high-.15),p(1,side,high+1.03),p(0,side,low+1.03),p(0,side,low-.15),'#c7c7a5');
      batchBeam(detail,p(0,side,low+1.08),p(1,side,high+1.08),.035,'#6b7966');
      for(let t=0;t<=1;t+=.1){const q=p(t,side,low+(high-low)*t+.4);addCollider({x:q[0],z:q[2],radius:.09,bottom:q[1]-.5,top:q[1]+.7,base:b.base});}
    }
    polygon(detail,g.landing,y(g.firstRL),'#b5bca4');
    addCollider({points:g.landing,bottom:y(g.firstRL)-.16,top:y(g.firstRL),stepHeight:.27,base:b.base});
    const soffit=new Batch();soffit.base=b.base;polygon(soffit,g.landing,y(g.firstRL)-.16,'#c3c8ad');world.add(soffit.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    for(let i=0;i<g.landing.length;i++){
      const a=g.landing[i],c=g.landing[(i+1)%g.landing.length],length=distance2(a,c);
      if(i===2||i===3||i===4)continue;
      batchBeam(detail,[a.x,y(g.firstRL)+1.05,a.z],[c.x,y(g.firstRL)+1.05,c.z],.035,'#475e50');
      for(let d=.1;d<length;d+=.15){const t=d/length,x=a.x+(c.x-a.x)*t,z=a.z+(c.z-a.z)*t;batchBeam(detail,[x,y(g.firstRL)+.05,z],[x,y(g.firstRL)+1.05,z],.012,'#5e7560');if(Math.round(d/.15)%3===0)addCollider({x,z,radius:.025,bottom:y(g.firstRL),top:y(g.firstRL)+1.1,base:b.base});}
    }
    for(const q of g.columns){
      const low=terrainHeight(q.x,q.z);batchPipe(detail,[q.x,y(low),q.z],[q.x,y(g.coverRL),q.z],q.radius,'#b44135');addCollider({x:q.x,z:q.z,radius:q.radius,top:y(g.coverRL),base:b.base});
    }
    const cover=new Batch();cover.base=b.base;polygon(cover,g.landing,y(g.coverRL),'#9bb6a6');
    for(let i=0;i<g.landing.length;i++){const a=g.landing[i],c=g.landing[(i+1)%g.landing.length];batchBeam(detail,[a.x,y(g.coverRL),a.z],[c.x,y(g.coverRL),c.z],.065,'#3b5248');}
    for(let u=0;u<16.6;u+=1.4){const a=framePoint(f,u,-23),c=framePoint(f,u,-20.5);batchBeam(detail,[a.x,y(g.coverRL),a.z],[c.x,y(g.coverRL),c.z],.045,'#3b5248');}
    world.add(cover.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.55,side:THREE.DoubleSide,roughness:.18})));
    addCollider({points:g.landing,bottom:y(g.coverRL)-.1,top:y(g.coverRL)+.1,base:b.base});
  }

  function samuelsBuilding(b,concrete,brick,glass,detail,roofs){
    const g=samuelsGeometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points,screens=new Batch(),sheet=new Batch(),libraryMesh=new Batch(),webs=new Batch(),windowGlass=new Batch();for(const batch of [screens,sheet,libraryMesh,webs,windowGlass])batch.base=b.base;
    const claddingBase=7.2,rows=5,pitch=(g.bodyRoof-claddingBase)/rows;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,nu=nx*f.u.x+nz*f.u.z;
      wallPanel(brick,a,c,0,claddingBase,'#a37555');
      const libraryFace=Math.hypot(a.x-SAMUELS_LIBRARY_FACE.a.x,a.z-SAMUELS_LIBRARY_FACE.a.z)<.01;
      if(!libraryFace)wallPanel(concrete,a,c,claddingBase,g.bodyRoof,'#c6cdca');
      if(!libraryFace)for(let d=.15;d<len;d+=.65)wallPanel(detail,a,c,claddingBase,g.bodyRoof,'#acbab5',.015,d/len,Math.min(1,(d+.018)/len));
      const bays=Math.max(1,Math.round(len/2.7));
      for(let bay=0;bay<bays;bay++){
        const lo=(bay+.17)/bays,hi=(bay+.83)/bays;
        if(!libraryFace)for(let row=0;row<rows;row++){
          const bottom=claddingBase+row*pitch+.85,top=bottom+1.02;
          wallPanel(detail,a,c,bottom-.08,top+.08,'#71837f',.04,lo-.035/bays,hi+.035/bays);
          wallPanel(glass,a,c,bottom,top,'#4d686d',.065,lo,hi);
          wallPanel(detail,a,c,bottom+.45,bottom+.49,'#91a29b',.085,lo,hi);
        }
        for(const [bottom,height] of [[1.2,.65],[4.5,1.25]]){
          wallPanel(detail,a,c,bottom-.08,bottom+height+.08,'#929b8d',.04,lo+.12/bays,hi-.12/bays);
          wallPanel(glass,a,c,bottom,bottom+height,'#526968',.07,lo+.15/bays,hi-.15/bays);
        }
      }
      if(len>12&&!libraryFace){
        const screenCount=Math.max(2,Math.round(len/8.2));
        for(let j=1;j<screenCount;j++){
          const t=j/screenCount,w=1.15/len;
          wallPanel(screens,a,c,claddingBase-.8,g.bodyRoof+.35,'#e0e5dc',.68,t-w/2,t+w/2);
          for(const side of [t-w/2,t+w/2]){
            const x=a.x+(c.x-a.x)*side+nx*.7,z=a.z+(c.z-a.z)*side+nz*.7;
            batchPipe(detail,[x,claddingBase-.8,z],[x,g.bodyRoof+.35,z],.026,'#dce5db');
          }
        }
        for(let row=0;row<=rows;row++){
          const low=claddingBase+row*pitch-.45;
          wallPanel(screens,a,c,low,low+.48,'#d9e2d7',.65);
          wallPanel(detail,a,c,low,low+.04,'#d3dfd2',.69);
        }
      }
      if(nu<-.8){
        wallPanel(glass,a,c,.25,4.1,'#648179',.085,.1,.9);
        for(let d=.5;d<len;d+=1.35)wallPanel(detail,a,c,.2,4.3,'#657b73',.13,d/len,Math.min(1,(d+.07)/len));
        wallPanel(detail,a,c,4.1,4.65,'#c3cfc0',.55);
        facadeLabel(b,a,c,'Samuels','F25',5.6,5.6,'#3f5149');
      }
      wallPanel(detail,a,c,g.bodyRoof-.22,g.bodyRoof,'#dde5d9',.24);
    }
    const sf=SAMUELS_LIBRARY_FACE,at=p=>[p.x,p.y,p.z],p=(d,y,o=0)=>at(samuelsFacadePoint(d,y,o));
    const panel=(batch,r,color,offset=0)=>batch.quad(p(r.l,r.bottom,offset),p(r.l,r.top,offset),p(r.r,r.top,offset),p(r.r,r.bottom,offset),color,[[r.l/2,r.bottom/2],[r.l/2,r.top/2],[r.r/2,r.top/2],[r.r/2,r.bottom/2]]);
    for(const r of SAMUELS_UPPER_PANELS){
      panel(sheet,r,'#c1c9c6');
      for(let d=Math.ceil(r.l/.65)*.65;d<r.r;d+=.65)batchBeam(detail,p(d,r.bottom,.008),p(d,r.top,.008),.006,'#a0ada7');
    }
    for(const r of SAMUELS_UPPER_WINDOWS){
      panel(windowGlass,r,'#859e9b',-r.recess);
      // Reveal faces close the cut-outs back to the glass; the source body
      // remains occupied and the windows do not introduce traversable rooms.
      const corners=[[r.l,r.bottom],[r.l,r.top],[r.r,r.top],[r.r,r.bottom]];
      for(let i=0;i<4;i++){const a=corners[i],c=corners[(i+1)%4];webs.quad(p(...a,.012),p(...c,.012),p(...c,-r.recess),p(...a,-r.recess),'#657b76');batchBeam(detail,p(...a,-r.recess+.035),p(...c,-r.recess+.035),.027,'#8f9f97');}
      const mid=(r.l+r.r)/2;batchBeam(detail,p(mid,r.bottom,-.13),p(mid,r.top,-.13),.021,'#8c9c94');batchBeam(detail,p(r.l,r.bottom+.45,-.13),p(r.r,r.bottom+.45,-.13),.018,'#8c9c94');
      panel(webs,{...r,bottom:r.bottom-.035,top:r.bottom+.015},'#89998e',.11);
    }
    for(const r of SAMUELS_SCREEN_PANELS)libraryMesh.quad(...r.points.map(at),'#dce3d9',r.uv);
    for(const r of SAMUELS_SCREEN_BLADES)webs.triangle(...r.points.map(at),'#d2ddd2');
    for(const beam of SAMUELS_SCREEN_SUPPORTS)batchBeam(detail,at(beam.a),at(beam.c),beam.radius,'#c1d1c5');
    polygon(roofs,b.points,g.bodyRoof,'#a4afa0');
    const h=g.glasshouse,hring=h.points;
    for(let i=0;i<hring.length;i++){
      const a=hring[i],c=hring[(i+1)%hring.length],len=distance2(a,c),topA=g.roofHeight(a),topC=g.roofHeight(c);
      const p=(t,y)=>[a.x+(c.x-a.x)*t,y,a.z+(c.z-a.z)*t];
      glass.quad(p(0,h.floor+.3),p(0,topA),p(1,topC),p(1,h.floor+.3),'#89a7a3');
      wallPanel(concrete,a,c,h.floor,h.floor+.3,'#a3aea0');
      for(let d=0;d<=len;d+=1.25){const t=d/len,top=topA+(topC-topA)*t;batchPipe(detail,p(t,h.floor),p(t,top),.035,'#d4e0d5');}
      batchPipe(detail,p(0,topA),p(1,topC),.055,'#d9e3d8');
      wallPanel(detail,a,c,h.floor+1.45,h.floor+1.5,'#c5d3c6',.04);
    }
    const roofPoint=(u,v)=>{const p=framePoint(f,u,v);return [p.x,g.roofHeight(p),p.z];};
    for(let u=-33;u<21;u+=1.5){
      const end=Math.min(21,u+1.5);glass.quad(roofPoint(u,-4),roofPoint(u,4),roofPoint(end,4),roofPoint(end,-4),'#a1bdb3');
      batchPipe(detail,roofPoint(u,-4),roofPoint(u,4),.028,'#d6e1d5');
    }
    for(const v of [-4,-1.35,1.35,4])batchPipe(detail,roofPoint(-33,v),roofPoint(21,v),.035,'#d1dfd0');
    const plant=g.plant,pr=plant.points;
    polygon(roofs,pr,plant.top,'#9eaaa1');
    for(let i=0;i<pr.length;i++){
      const a=pr[i],c=pr[(i+1)%pr.length];wallPanel(detail,a,c,plant.bottom,plant.top,'#9daaa0');
      for(let y=plant.bottom+.15;y<plant.top;y+=.22)wallPanel(detail,a,c,y,y+.04,'#63796c',.06);
    }
    const meshTexture=canvasTexture(256,256,ctx=>{
      ctx.clearRect(0,0,256,256);ctx.strokeStyle='#fff';ctx.lineWidth=1.25;
      for(let i=0;i<=256;i+=8){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,256);ctx.moveTo(0,i);ctx.lineTo(256,i);ctx.stroke();}
    });
    meshTexture.wrapS=meshTexture.wrapT=THREE.RepeatWrapping;meshTexture.anisotropy=4;
    world.add(screens.mesh(style('#ffffff',{vertexColors:true,map:meshTexture,alphaTest:.25,side:THREE.DoubleSide,roughness:.75})));
    const wire=canvasTexture(128,128,ctx=>{ctx.fillStyle='black';ctx.fillRect(0,0,128,128);ctx.strokeStyle='white';ctx.lineWidth=1.2;for(let d=0;d<=128;d+=8){ctx.beginPath();ctx.moveTo(d,0);ctx.lineTo(d,128);ctx.moveTo(0,d);ctx.lineTo(128,d);ctx.stroke();}});wire.wrapS=wire.wrapT=THREE.RepeatWrapping;wire.colorSpace=THREE.NoColorSpace;wire.anisotropy=8;
    const brushed=canvasTexture(128,128,ctx=>{ctx.fillStyle='#cbd0cb';ctx.fillRect(0,0,128,128);for(let x=0;x<128;x++){ctx.fillStyle=x%3?'#ffffff09':'#536b5f0b';ctx.fillRect(x,0,1,128);}});brushed.wrapS=brushed.wrapT=THREE.RepeatWrapping;
    const glazing=windowGlass.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.13,metalness:.55,envMapIntensity:1.0}));
    const porous=libraryMesh.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,alphaMap:wire,transparent:true,depthWrite:false,metalness:.35,roughness:.7}));
    porous.customDepthMaterial=new THREE.MeshDepthMaterial({depthPacking:THREE.RGBADepthPacking,alphaMap:wire,alphaTest:.35,side:THREE.DoubleSide});
    world.add(sheet.mesh(style('#ffffff',{vertexColors:true,map:brushed,metalness:.35,roughness:.64})),porous,webs.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.7})),glazing);
    const reflection=samuelsFacadePoint(sf.length*.5,0,1.5);medicalReflection(glazing,reflection,b.base+11);
    addCollider({points:b.points,holes:b.holes,top:g.bodyRoof,base:b.base});
  }

  function goodsellBuilding(b,legacyBrick,glass,detail,roofs){
    const g=goodsellGeometry(b),f=g.frame,ring=polygonArea(b.points)<0?[...b.points].reverse():b.points,brick=new Batch(),recessGlass=new Batch(),metal=new Batch(),cover=new Batch();
    for(const batch of [brick,recessGlass,metal,cover])batch.base=b.base;
    const pitch=(b.height-.6)/4,face=GOODSELL_ENTRY_FACE,at=p=>[p.x,p.y,p.z],p=(d,y,o=0)=>at(goodsellFacePoint(d,y,o));
    const rect=(batch,r,color,off=0)=>batch.quad(p(r.l,r.bottom,off),p(r.l,r.top,off),p(r.r,r.top,off),p(r.r,r.bottom,off),color,[[r.l/2,r.bottom/2],[r.l/2,r.top/2],[r.r/2,r.top/2],[r.r/2,r.bottom/2]]);
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),bays=Math.max(1,Math.round(len/2.55)),entryFace=distance2(a,face.a)<.01&&distance2(c,face.c)<.01;
      wallPanel(brick,a,c,g.minimumGround-b.base,entryFace?0:b.height,'#f4f2e9');
      if(!entryFace)for(let bay=0;bay<bays;bay++){
        const mid=(bay+.5)/bays,half=.53/len,left=mid-half,right=mid+half;
        for(let row=-2;row<4;row++){
          const low=row*pitch+.55,high=low+2.3;
          wallPanel(detail,a,c,low-.08,high+.1,'#c5c4ad',.035,left-.06/len,right+.06/len);
          wallPanel(glass,a,c,low,high,'#5a6f6c',.06,left,right);
          wallPanel(detail,a,c,high-.42,high,'#c3ccba',.075,left,right);
          wallPanel(detail,a,c,low+.72,low+.77,'#a2b3a3',.085,left,right);
          wallPanel(detail,a,c,low-.1,low,'#a0aa96',.16,left-.04/len,right+.04/len);
        }
        const t=(bay+.97)/bays;wallPanel(brick,a,c,0,b.height-.35,'#e7e5db',.12,t,Math.min(1,t+.1/len));
      }
      wallPanel(detail,a,c,b.height-.5,b.height-.32,'#b4bfb0',.15);
      wallPanel(detail,a,c,b.height-.3,b.height-.15,'#cbd1bd',.23);
      wallPanel(detail,a,c,b.height-.12,b.height,'#dce0cc',.3);
    }
    for(const r of GOODSELL_BRICK_PANELS)rect(brick,r,'#ffffff');
    const reveal=r=>{
      const corners=[[r.l,r.bottom],[r.l,r.top],[r.r,r.top],[r.r,r.bottom]];
      for(let i=0;i<4;i++){const a=corners[i],c=corners[(i+1)%4],len=Math.hypot(c[0]-a[0],c[1]-a[1]);brick.quad(p(...a),p(...c),p(...c,-r.recess),p(...a,-r.recess),'#e5e4d9',[[0,0],[0,len/2],[r.recess/2,len/2],[r.recess/2,0]]);}
    };
    for(const r of GOODSELL_WINDOWS){
      reveal(r);rect(recessGlass,{...r,top:r.top-r.header},'#8b9d99',-r.recess);
      rect(detail,{...r,bottom:r.top-r.header},'#bfccb9',-r.recess+.02);
      for(const d of [r.l,r.r])batchBeam(detail,p(d,r.bottom,-r.recess+.025),p(d,r.top,-r.recess+.025),.027,'#aab7aa');
      for(const y of [r.bottom,r.bottom+.74,r.top-r.header,r.top])batchBeam(detail,p(r.l,y,-r.recess+.025),p(r.r,y,-r.recess+.025),.025,'#aab7aa');
      rect(detail,{...r,bottom:r.bottom-.04,top:r.bottom+.025},'#b7bfb0',.08);
    }
    const door=GOODSELL_DOOR;reveal(door);rect(recessGlass,{...door,top:door.glassTop},'#8fa59b',-door.recess);
    rect(detail,{...door,bottom:door.glassTop},'#343b37',.01);
    for(let j=0;j<=3;j++){const d=door.l+(door.r-door.l)*j/3;batchBeam(detail,p(d,door.bottom,-.12),p(d,door.glassTop,-.12),.033,'#ccd3c7');}
    for(const y of [door.bottom,door.glassTop])batchBeam(detail,p(door.l,y,-.12),p(door.r,y,-.12),.033,'#ccd3c7');
    rect(detail,{...door,bottom:1.08,top:1.13},'#c1bd49',-.11);
    const sign=canvasTexture(2048,192,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.fillStyle='#e3e6dc';ctx.textBaseline='middle';ctx.font='500 68px sans-serif';ctx.fillText('F20 |',32,h/2);ctx.font='600 116px sans-serif';ctx.fillText('John Goodsell',260,h/2,w-290);});
    const label=new THREE.Mesh(new THREE.PlaneGeometry(3.45,.325),new THREE.MeshBasicMaterial({map:sign,transparent:true,depthWrite:false})),labelPoint=goodsellFacePoint((door.l+door.r)/2,2.845,.045);label.position.set(labelPoint.x,b.base+labelPoint.y,labelPoint.z);label.rotation.y=Math.atan2(face.n.x,face.n.z);world.add(label);
    polygon(roofs,b.points,b.height,'#9ba594');
    const cp=(u,v,y)=>at(goodsellCanopyPoint(u,v,y)),C=GOODSELL_CANOPY;
    // Deep I-sections have distinct web / upper and lower flange geometry.
    for(const v of C.beams){
      metal.quad(cp(-3.9,v-.02,C.mainBottom),cp(-3.9,v-.02,C.mainTop),cp(3.9,v-.02,C.mainTop),cp(3.9,v-.02,C.mainBottom),'#36433e');
      metal.quad(cp(3.9,v+.02,C.mainBottom),cp(3.9,v+.02,C.mainTop),cp(-3.9,v+.02,C.mainTop),cp(-3.9,v+.02,C.mainBottom),'#36433e');
      for(const y of [C.mainBottom+.012,C.mainTop-.012]){const mid=goodsellCanopyPoint(0,v,y);metal.box(mid.x,y,mid.z,7.8,.024,.23,'#35413c',Math.atan2(-f.u.z,f.u.x));}
    }
    for(const r of GOODSELL_RAFTERS){
      const vertices=r.profile.map(([v,y])=>cp(r.u-r.webWidth/2,v,y)),back=r.profile.map(([v,y])=>cp(r.u+r.webWidth/2,v,y));metal.quad(...vertices,'#3d4943');metal.quad(...back.toReversed(),'#3d4943');
      for(let j=0;j<4;j++)metal.quad(vertices[j],back[j],back[(j+1)%4],vertices[(j+1)%4],'#34403a');
      const [front,rear]=[r.profile[0],r.profile[3]],w=r.flangeWidth/2;
      for(const off of [0,-.02])metal.quad(cp(r.u-w,front[0],front[1]+off),cp(r.u-w,rear[0],rear[1]+off),cp(r.u+w,rear[0],rear[1]+off),cp(r.u+w,front[0],front[1]+off),'#39473f');
      const mid=goodsellCanopyPoint(r.u,.2,3.385);metal.box(mid.x,3.385,mid.z,.14,.025,3.1,'#34413a',Math.atan2(-f.u.z,f.u.x));
    }
    for(const pane of GOODSELL_GLASS_PANES){
      const q=[[pane.l,pane.front],[pane.l,pane.back],[pane.r,pane.back],[pane.r,pane.front]].map(([u,v])=>cp(u,v,goodsellCanopyGlassHeight(v)));
      cover.quad(...q,'#8ea9a1',[[0,0],[0,1],[1,1],[1,0]]);
    }
    for(const column of g.supports){
      const ground=terrainHeight(column.x,column.z)-b.base,redTop=C.columnTop;
      for(const q of tubeFaces([column.x,ground,column.z],[column.x,redTop,column.z],column.radius,16,false))detail.quad(...q,'#a84037');
      const u=(column.x-g.canopy.frame.x)*f.u.x+(column.z-g.canopy.frame.z)*f.u.z,v=(column.x-g.canopy.frame.x)*f.v.x+(column.z-g.canopy.frame.z)*f.v.z;
      for(const y of [redTop+.015,C.bracketTop-.015]){const q=goodsellCanopyPoint(u,v,y);metal.box(q.x,y,q.z,.43,.03,.43,'#404b43',Math.atan2(-f.u.z,f.u.x));}
      for(const d of [-.09,.09])batchBeam(metal,cp(u+d,v,redTop+.03),cp(u+d,v,C.bracketTop-.03),.02,'#3f4941');
      batchBeam(metal,cp(u-.10,v-.08,redTop+.04),cp(u+.10,v-.08,C.bracketTop-.04),.014,'#596157');batchBeam(metal,cp(u+.10,v-.08,redTop+.04),cp(u-.10,v-.08,C.bracketTop-.04),.014,'#596157');
      addCollider({x:column.x,z:column.z,radius:column.radius,base:b.base,bottom:ground,top:C.mainTop});
    }
    const texture=canvasTexture(1024,1024,ctx=>{const random=rng(1971),rowHeight=1024/26;ctx.fillStyle='#8b8b7c';ctx.fillRect(0,0,1024,1024);for(let row=0;row<26;row++)for(let col=-1;col<9;col++){const x=col*128+(row%2)*64,y=row*rowHeight;ctx.fillStyle=`hsl(${30+random()*8} ${12+random()*10}% ${43+random()*17}%)`;ctx.fillRect(x+1.4,y+1.4,125.2,rowHeight-2.8);for(let n=0;n<18;n++){ctx.fillStyle=n%2?'#ffffff10':'#434b4215';ctx.fillRect(x+random()*128,y+random()*rowHeight,random()*12+1,1.3);}}});texture.wrapS=texture.wrapT=THREE.RepeatWrapping;texture.anisotropy=8;
    const glazing=recessGlass.mesh(style('#ffffff',{vertexColors:true,roughness:.11,metalness:.62,envMapIntensity:1.0}));
    world.add(brick.mesh(style('#ffffff',{vertexColors:true,map:texture,bumpMap:texture,bumpScale:.012,roughness:.92})),metal.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,metalness:.45,roughness:.54})),cover.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.50,depthWrite:false,side:THREE.DoubleSide,metalness:.25,roughness:.12})),glazing);
    medicalReflection(glazing,goodsellFacePoint((door.l+door.r)/2,0,1.5),b.base+5.5);
    addCollider({...GOODSELL_CANOPY_COLLISION,base:b.base});
    addCollider({points:b.points,holes:b.holes,top:b.height,base:b.base});
  }

  function medicalReflection(mesh,p,y,resolution=256){
    const target=new THREE.WebGLCubeRenderTarget(resolution,{type:THREE.HalfFloatType,generateMipmaps:true,minFilter:THREE.LinearMipmapLinearFilter});
    const probe=new THREE.CubeCamera(.3,300,target);probe.position.set(p.x,y,p.z);
    mesh.material.envMap=target.texture;campusReflections.push({mesh,probe,target});
  }

  function wallaceWurth(b,concrete,detail,roofs){
    const g=medicalGeometry(b),f=g.frame,glass=new Batch(),atriumGlass=new Batch(),undersides=new Batch();glass.base=atriumGlass.base=undersides.base=b.base;
    const folded=new Batch(),brickEnd=new Batch();folded.base=brickEnd.base=b.base;
    const y=rl=>rl-b.base,angle=Math.atan2(-f.u.z,f.u.x);
    const perimeter=points=>polygonArea(points)<0?[...points].reverse():points;
    const upperFacade=(a,c)=>{
      const len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,bays=Math.max(1,Math.round(len/2.6)),at=(t,h,off)=>[a.x+(c.x-a.x)*t+nx*off,h,a.z+(c.z-a.z)*t+nz*off];
      wallPanel(concrete,a,c,y(g.upperBaseRL),y(g.upperOfficeRL)+.6,'#b7b6a5');
      for(let row=0;row<4;row++)for(let bay=0;bay<bays;bay++){
        const start=(bay+.1)/bays,end=(bay+.91)/bays,lo=y(g.upperBaseRL)+row*3.96+.2,hi=lo+2.65;
        wallPanel(glass,a,c,lo,hi,'#788e8d',.08,start,end);
        // Coloured shutters fill only part of selected window bays.
        if((bay*3+row*5)%7<4){
          const tint=['#c28c32','#d8a84c','#ba7434','#d2b26f'][(bay+row)%4];
          wallPanel(detail,a,c,lo,hi,tint,.14,start,start+(end-start)*.45);
        }
        wallPanel(detail,a,c,hi,hi+.07,'#7a877c',.09,start,end);
      }
      for(let bay=1;bay<bays;bay++){
        const t=bay/bays,off=bay%5<3?.82:.5,low=y(g.upperBaseRL)+(bay%6===0?3.96:0),high=y(g.upperOfficeRL)+(bay%6===0?-3.96:.8),p=at(t,(low+high)/2,off/2);
        detail.box(p[0],p[1],p[2],.11,high-low,off,'#d5d8c9',Math.atan2(-(c.z-a.z),c.x-a.x));
      }
    };
    const shadePrism=(points,bottom,top,color)=>{const r=perimeter(points);polygon(folded,r,bottom,color,[],true);polygon(folded,r,top,color);for(let i=0;i<r.length;i++)wallPanel(folded,r[i],r[(i+1)%r.length],bottom,top,color);};
    const foldedEast=face=>{
      const a=face.a,c=face.c,kind=wallaceFaceKind(face),lo=y(g.upperBaseRL),hi=y(g.upperOfficeRL)+.6;
      wallPanel(concrete,a,c,lo,hi,'#bdbbab');
      if(kind!=='folded-east'&&kind!=='folded-north'){
        if(kind==='atrium-grid'){
          for(let row=0;row<4;row++){const low=y(WALLACE_FLOORS[row])+.3,high=low+2.9;wallPanel(glass,a,c,low,high,'#91a79b',.04,.015,.985);for(let d=.2;d<face.length;d+=2.6)wallPanel(detail,a,c,low,high,'#c6d0bf',.09,d/face.length,Math.min(1,(d+.10)/face.length));}
        }else{
          for(let d=2.5;d<face.length;d+=2.5)wallPanel(detail,a,c,lo,hi,'#979f92',.025,d/face.length,Math.min(1,(d+.019)/face.length));
          for(const floor of WALLACE_FLOORS)wallPanel(detail,a,c,y(floor),y(floor)+.018,'#959d90',.026);
        }
        return;
      }
      const point=(v,rl,d=0)=>{const p=wallaceFacePoint(face,v,rl,d);return [p.x,p.y-b.base,p.z];};
      const plane=(batch,v0,v1,rl0,rl1,color,d)=>{if(v1<=v0||rl1<=rl0)return;batch.quad(point(v0,rl0,d),point(v0,rl1,d),point(v1,rl1,d),point(v1,rl0,d),color);};
      for(const cell of wallaceCells(face)){
        // Folded horizontal precast follows the same projecting profile as its
        // primary vertical shade. Window-sized fins meet the bands at edges.
        const profile=wallaceBandProfile(cell);
        for(const band of WALLACE_BANDS)for(let i=1;i<profile.length;i++){
          const l=profile[i-1],r=profile[i],bottom=band.bottom,top=band.top;
          folded.quad(point(l.v,bottom,l.d),point(l.v,top,l.d),point(r.v,top,r.d),point(r.v,bottom,r.d),'#c6c5b5');
          folded.quad(point(l.v,top,.015),point(l.v,top,l.d),point(r.v,top,r.d),point(r.v,top,.015),'#ced0c0');
          folded.quad(point(l.v,bottom,l.d),point(l.v,bottom,.015),point(r.v,bottom,.015),point(r.v,bottom,r.d),'#aab3a2');
          if(i===1&&Math.abs(cell.start-face.v0)<1e-7)folded.quad(point(l.v,bottom,.015),point(l.v,top,.015),point(l.v,top,l.d),point(l.v,bottom,l.d),'#b8bfaf');
          if(i===profile.length-1&&Math.abs(cell.end-face.v1)<1e-7)folded.quad(point(r.v,bottom,r.d),point(r.v,top,r.d),point(r.v,top,.015),point(r.v,bottom,.015),'#b8bfaf');
        }
        for(let row=0;row<4;row++){
          const bottom=WALLACE_FLOORS[row]+.55,top=bottom+2.65,left=cell.windowStart,right=cell.windowEnd,appearance=wallaceBayAppearance(cell,row);
          plane(glass,left,right,bottom,top,'#75918c',.065);
          for(const v of [left,right])plane(detail,v-.014,v+.014,bottom,top,'#65776d',.095);
          plane(detail,left,right,bottom,bottom+.045,'#819184',.10);plane(detail,left,right,top-.045,top,'#819184',.10);
          const clearLeft=appearance.selected?Math.max(left,appearance.panelEnd):left;plane(detail,clearLeft,right,bottom+1.31,bottom+1.34,'#6c7e73',.098);
          if(appearance.selected){
            const end=Math.min(right,appearance.panelEnd),begin=Math.max(left,cell.gridStart+.4),strip=Math.min(end,begin+.11);plane(detail,begin,end,bottom+.02,top-.02,appearance.color,.12);plane(detail,begin,strip,bottom+.02,top-.02,appearance.accent,.125);
            if(appearance.louvre){const l=Math.max(left,cell.gridEnd-.43),r=Math.min(right,cell.gridEnd-.15);plane(detail,l,r,bottom+.03,top-.03,'#2b3f35',.105);for(let rl=bottom+.1;rl<top-.05;rl+=.14)plane(detail,l,r,rl,rl+.025,'#647669',.15);}
          }
          for(const fin of wallaceFins(face,cell,row))shadePrism(wallaceFinPoints(face,fin),y(fin.bottom),y(fin.top),fin.extra?'#d2d5c6':'#d3d5c5');
        }
      }
    };
    for(const part of MEDICAL_PARTS.filter(p=>p.buildingId===b.id)){
      const ring=perimeter(part.points);
      if(part.kind==='east'){
        for(const face of WALLACE_EAST_FACES)foldedEast(face);
        const inset=ring.map(p=>{const q=g.local(p);return framePoint(f,14+(q.u-14)*.65,q.v*.96);});
        for(let i=0;i<inset.length;i++){
          const a=inset[i],c=inset[(i+1)%inset.length],len=distance2(a,c);wallPanel(glass,a,c,y(g.upperOfficeRL)+.6,y(86.55),'#697f79');
          for(let d=.4;d<len;d+=1.2)wallPanel(detail,a,c,y(g.upperOfficeRL)+.6,y(86.55),'#82948a',.06,d/len,Math.min(1,(d+.045)/len));
        }
        polygon(undersides,part.points,y(g.upperBaseRL)-.15,'#8f9d90');
        const eave=wallaceEave(ring),roof=y(g.roofRL);polygon(roofs,eave,roof,'#b5bfaf');polygon(undersides,eave,roof-.20,'#34483d',[],true);
        for(let i=0;i<eave.length;i++)wallPanel(detail,eave[i],eave[(i+1)%eave.length],roof-.20,roof,'#d7ddcd');
        addCollider({points:part.points,holes:part.holes,bottom:y(g.upperBaseRL)-.15,top:y(g.roofRL),base:b.base});
      }else if(part.kind==='west'){
        for(let i=0;i<ring.length;i++){
          const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c),surface=wallaceWestSurface(a,c);
          if(surface==='south-brick'){
            wallPanel(brickEnd,a,c,0,y(g.roofRL)-.25,'#b56c43');
            wallPanel(detail,a,c,y(g.roofRL)-.25,y(g.roofRL),'#d5dac9',.16);
            for(const t of [0,.987])wallPanel(detail,a,c,0,y(g.roofRL),'#cbd3c1',.055,t,Math.min(1,t+.013));
          }else{
            wallPanel(concrete,a,c,0,y(g.roofRL),'#bcbcab');
            if(surface==='north-pale'){for(let d=2.5;d<len;d+=2.5)wallPanel(detail,a,c,0,y(g.roofRL),'#9fa99b',.025,d/len,Math.min(1,(d+.025)/len));continue;}
            upperFacade(a,c);
            wallPanel(glass,a,c,y(g.groundRL)+.1,y(g.upperBaseRL)-.25,'#496961',.07,.03,.97);
            for(const rl of [61.53,65.53])wallPanel(detail,a,c,y(rl)-.18,y(rl),'#c7d0bf',.18);
          }
        }
        polygon(roofs,part.points,y(g.roofRL),'#a0aea0');addCollider({points:part.points,holes:part.holes,top:y(g.roofRL),base:b.base});
      }
    }
    for(const part of MEDICAL_GROUND_FLOORS){
      const ring=perimeter(part.points);polygon(roofs,ring,y(g.upperBaseRL)-.2,'#839a89');
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(concrete,a,c,0,y(g.groundRL),'#9cae9b');
        wallPanel(glass,a,c,y(g.groundRL),y(g.upperBaseRL)-.22,'#526d69',.03);
        wallPanel(detail,a,c,y(61.53)-.12,y(61.53),'#aab9a8',.12);
        for(let d=.3;d<len;d+=1.4)wallPanel(detail,a,c,y(g.groundRL),y(g.upperBaseRL)-.2,'#859a8b',.09,d/len,Math.min(1,(d+.045)/len));
        for(let d=1.6;d<len;d+=4.2)wallPanel(detail,a,c,y(g.groundRL),y(g.upperBaseRL)-.22,'#344b43',.055,d/len,Math.min(1,(d+.48)/len));
        for(const rl of [58.3,62.25])wallPanel(detail,a,c,y(rl)-.025,y(rl)+.025,'#8da093',.10);
      }
      addCollider({points:part.points,holes:part.holes,top:y(g.upperBaseRL),base:b.base});
    }
    // The central glazed atrium is shown in the architect's plan, including
    // its northern recess omitted from the exterior OSM footprint.
    for(const points of [...MEDICAL_PARTS.filter(p=>p.buildingId===b.id&&p.kind==='atrium').map(p=>p.points),g.atrium]){
      const ring=perimeter(points);polygon(concrete,ring,y(g.groundRL),'#9eac9b');
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(atriumGlass,a,c,y(g.groundRL),y(86.5),'#a8bcb0');
        for(let d=.1;d<len;d+=1.6)wallPanel(detail,a,c,y(g.groundRL),y(86.5),'#a0b0a2',.03,d/len,Math.min(1,(d+.045)/len));
        for(const rl of [61.53,65.53,69.49,73.45,77.41,81.37])wallPanel(detail,a,c,y(rl)-.08,y(rl),'#81988b',.04);
      }
      polygon(atriumGlass,ring,y(86.5),'#b4c9bd');addCollider({points:ring,top:y(86.5),base:b.base});
    }
    for(const support of WALLACE_PIERS){
      const ground=terrainHeight(support.x,support.z)-b.base,top=y(g.upperBaseRL),local=g.local(support),lower=frameRectangle(f,support.bottomWidth,support.bottomDepth,local.u,local.v),upper=support.points;
      for(let i=0;i<4;i++){const j=(i+1)%4;detail.quad([lower[i].x,ground,lower[i].z],[upper[i].x,top,upper[i].z],[upper[j].x,top,upper[j].z],[lower[j].x,ground,lower[j].z],'#bfcab7');}
      addCollider({points:upper,bottom:ground,top,base:b.base});
    }
    for(const plant of g.plants){
      const ring=perimeter(plant.points);polygon(roofs,ring,y(plant.roofRL),'#86978a');
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length];wallPanel(concrete,a,c,y(plant.bottomRL),y(plant.roofRL),'#a2af9f');
        for(let rl=plant.bottomRL+.1;rl<plant.roofRL;rl+=.18)wallPanel(detail,a,c,y(rl),y(rl)+.035,'#667f70',.06);
      }
    }
    for(const p of g.flues)batchPipe(detail,[p.x,y(90.55),p.z],[p.x,y(95),p.z],p.radius,'#c9d4c2');
    world.add(folded.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),roughness:.9})),brickEnd.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('brick'),roughness:.95})));
    world.add(undersides.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));
    const mesh=glass.mesh(style('#ffffff',{vertexColors:true,metalness:.28,roughness:.10,envMapIntensity:.75}));world.add(mesh,atriumGlass.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.25,depthWrite:false,side:THREE.DoubleSide,roughness:.13})));
    medicalReflection(mesh,framePoint(f,32,-8),71,512);
  }

  function lowyBuilding(b,concrete,detail,roofs){
    const g=medicalGeometry(b),f=g.frame,glass=new Batch(),streetGlass=new Batch();glass.base=streetGlass.base=b.base;
    const skins=new Batch(),frames=new Batch();skins.base=frames.base=b.base;
    const panelBox=(batch,a,c,lo,hi,color,front,start=0,end=1,back=.015)=>{
      if(hi<=lo||end<=start)return;const len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,p=(t,y,d)=>[a.x+(c.x-a.x)*t+nx*d,y,a.z+(c.z-a.z)*t+nz*d];
      batch.quad(p(start,lo,front),p(start,hi,front),p(end,hi,front),p(end,lo,front),color);
      batch.quad(p(start,lo,back),p(start,hi,back),p(start,hi,front),p(start,lo,front),color);
      batch.quad(p(end,lo,front),p(end,hi,front),p(end,hi,back),p(end,lo,back),color);
      batch.quad(p(start,hi,front),p(start,hi,back),p(end,hi,back),p(end,hi,front),color);
      batch.quad(p(start,lo,back),p(start,lo,front),p(end,lo,front),p(end,lo,back),color);
    };
    const framedWindow=(a,c,lo,hi,start,end,frame,projection,glassOffset,color,rows=1,screen=false,glazing=glass)=>{
      const len=distance2(a,c),left=start+frame/len,right=end-frame/len,from=lo+frame,to=hi-frame,nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,p=(t,y,d)=>[a.x+(c.x-a.x)*t+nx*d,y,a.z+(c.z-a.z)*t+nz*d];
      wallPanel(skins,a,c,lo,hi,'#253c31',.035,start,end);
      wallPanel(screen?skins:glazing,a,c,from,to,screen?'#293c32':'#82998f',glassOffset,left,right);
      panelBox(frames,a,c,lo,from,color,projection,start,end);
      panelBox(frames,a,c,to,hi,color,projection,start,end);
      panelBox(frames,a,c,from,to,color,projection,start,left,glassOffset);
      panelBox(frames,a,c,from,to,color,projection,right,end,glassOffset);
      skins.quad(p(left,from+.008,glassOffset),p(left,from+.008,projection-.015),p(right,from+.008,projection-.015),p(right,from+.008,glassOffset),'#40533b');
      skins.quad(p(left,to-.008,projection-.015),p(left,to-.008,glassOffset),p(right,to-.008,glassOffset),p(right,to-.008,projection-.015),'#31452f');
      if(screen){
        for(let d=left*len+.05;d<right*len;d+=.19)panelBox(frames,a,c,from,to,'#293d35',projection-.15,d/len,Math.min(right,(d+.035)/len),glassOffset+.05);
      }else{
        const count=Math.max(2,Math.round((right-left)*len/1.05));for(let j=1;j<count;j++)wallPanel(frames,a,c,from,to,'#6e807a',glassOffset+.03,left+(right-left)*j/count-.018/len,left+(right-left)*j/count+.018/len);
        for(let row=1;row<rows;row++){const y=from+(to-from)*row/rows;wallPanel(frames,a,c,y-.025,y+.025,'#7a8d83',glassOffset+.035,left,right);}
      }
    };
    for(const face of lowyFacadeFaces(b)){
      const {a,c,length:len,nu,nv,top:high,kind:originalKind}=face,feature=lowyStreetFeature(face),kind=feature==='west-core-glass'||feature==='west-core-return'?'laboratory':originalKind,low=face.bridge?face.bottom:Math.max(face.bottom,LOWY_STREET.beam);
      if(kind==='joint'){wallPanel(concrete,a,c,low,high,'#bcc5b1');continue;}
      if(kind==='courtyard'){
        wallPanel(skins,a,c,low,high,'#263c38');
        const start=LOWY_SCREEN.sill,top=high-LOWY_SCREEN.headInset;
        wallPanel(glass,a,c,start,top,'#90a9a4',.075,.006,.994);
        wallPanel(glass,a,c,low,start-.18,'#47635c',.075,.008,.992);
        // Fine grey curtain-wall bars continue behind broad irregular green panels.
        const panes=Math.max(1,Math.round(len/LOWY_SCREEN.panePitch));
        for(let i=1;i<panes;i++)wallPanel(frames,a,c,low,top,'#64756d',.10,(i/panes-LOWY_SCREEN.mullion/len/2),(i/panes+LOWY_SCREEN.mullion/len/2));
        for(let y=start;y<top;y+=4.35)wallPanel(frames,a,c,y,y+.055,'#7c8b7b',.11);
        for(const p of lowyScreenPanels(len)){
          const lo=p.start/len,hi=p.end/len;
          panelBox(frames,a,c,start,high,p.color,p.depth,lo,hi);
          if(!p.blade)for(let y=start+3.15;y<high;y+=3.15)wallPanel(skins,a,c,y,y+.018,'#4e7935',p.depth+.006,lo,hi);
        }
        panelBox(frames,a,c,start-.15,start+.06,'#b5c3a7',.18);
        panelBox(frames,a,c,top,high,'#7fa449',.12);
        // The pale floor edge and low glazing have their own visible window grid.
        for(let i=1;i<Math.ceil(len/3.1);i++)wallPanel(frames,a,c,low,start-.2,'#87988b',.12,i*3.1/len,Math.min(.995,(i*3.1+.06)/len));
      }else if(kind==='link-frame'){
        const l=LOWY_LINK,lo=l.jamb/len,hi=1-lo,from=low+l.sill,to=high-l.head;
        wallPanel(skins,a,c,low,high,'#24413a');
        wallPanel(glass,a,c,from,to,'#a4b4ac',l.glassOffset,lo,hi);
        panelBox(frames,a,c,low,from,LOWY_GREEN[0],l.projection);
        panelBox(frames,a,c,to,high,LOWY_GREEN[1],l.projection);
        panelBox(frames,a,c,from,to,LOWY_GREEN[0],l.projection,0,lo,l.glassOffset);
        panelBox(frames,a,c,from,to,LOWY_GREEN[1],l.projection,hi,1,l.glassOffset);
        // Dark inner reveals make the glass visibly recessed within the green frame.
        for(const t of [lo+.008/len,hi-.008/len]){const dx=c.x-a.x,dz=c.z-a.z,nx=dz/len,nz=-dx/len,p=(y,d)=>[a.x+dx*t+nx*d,y,a.z+dz*t+nz*d];skins.quad(p(from,l.glassOffset),p(to,l.glassOffset),p(to,l.projection-.02),p(from,l.projection-.02),'#3b522f');}
        const panes=Math.max(2,Math.round((len-2*l.jamb)/l.panePitch));
        for(let i=1;i<panes;i++){const t=lo+(hi-lo)*i/panes;wallPanel(frames,a,c,from,to,'#687b70',.102,t-.018/len,t+.018/len);}
        for(let row=1;row<l.rows;row++){const y=from+(to-from)*row/l.rows;wallPanel(frames,a,c,y-.08,y+.07,'#788c7e',.11,lo,hi);wallPanel(skins,a,c,y-l.spandrel,y-.08,'#566f6b',.098,lo,hi);}
      }else if(kind==='link-panel'){
        wallPanel(frames,a,c,low,high,LOWY_GREEN[0],.04);
        for(let d=1.15;d<len;d+=1.15)wallPanel(skins,a,c,low,high,'#507e33',.046,d/len,Math.min(1,(d+.018)/len));
        for(let y=low+3.2;y<high;y+=3.2)wallPanel(skins,a,c,y,y+.018,'#507e33',.047);
      }else{
        const mid=lowyStreetLocal({x:(a.x+c.x)/2,z:(a.z+c.z)/2});
        if(feature==='west-screen'||feature==='west-screen-side'){
          wallPanel(frames,a,c,low,high,'#79a23d',.035);
          if(feature==='west-screen')framedWindow(a,c,6.4,high-.65,0,1,.53,.6,.07,'#89ac44',1,true);
          else{for(let d=1.1;d<len;d+=1.1)wallPanel(skins,a,c,6.4,high,'#537a36',.045,d/len,Math.min(1,(d+.018)/len));for(let y=6.4;y<high;y+=3.2)wallPanel(skins,a,c,y,y+.018,'#537a36',.046);}
        }else{
          wallPanel(concrete,a,c,low,high,'#c6c2b7');
          for(let d=.1;d<len;d+=2.5)wallPanel(detail,a,c,low,high,'#a6aa9d',.025,d/len,Math.min(1,(d+.024)/len));
          for(let y=LOWY_STREET.beam;y<high;y+=5.2)wallPanel(detail,a,c,y,y+.018,'#9da498',.026);
          if(feature==='north-wall'){
            // Recessed service slots with real sloping louvre blades and pale jambs.
            for(let j=0;j<14;j++){
              const centre=.13+(.84-.13)*j/13,start=centre-.275/len,end=centre+.275/len,from=5.4,to=21.1,nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len,p=(t,y,d)=>[a.x+(c.x-a.x)*t+nx*d,y,a.z+(c.z-a.z)*t+nz*d];
              wallPanel(skins,a,c,from,to,'#33463d',.045,start,end);
              panelBox(frames,a,c,from,to,'#b6b9ab',.22,start-.06/len,start,.05);panelBox(frames,a,c,from,to,'#c1c3b4',.22,end,end+.06/len,.05);
              for(let y=from+.1;y<to-.05;y+=.22){frames.quad(p(start,y,.08),p(start,y+.055,.22),p(end,y+.055,.22),p(end,y,.08),'#88988a');frames.quad(p(start,y+.055,.22),p(start,y+.075,.22),p(end,y+.075,.22),p(end,y+.055,.22),'#aab4a5');}
            }
            const w=LOWY_STREET_WINDOW;framedWindow(a,c,w.bottom,w.top,w.start,w.end,w.frame,w.projection,w.glass,'#d5d8ca',2,false,streetGlass);
            panelBox(frames,a,c,LOWY_STREET.beam-.18,LOWY_STREET.beam+.25,'#adb7a6',.25);
          }
          if(feature==='west-core-glass'){
            wallPanel(glass,a,c,.25,high-.6,'#8da39b',.08,.45,.96);
            for(let y=LOWY_STREET.beam;y<high-.6;y+=3.7)panelBox(frames,a,c,y,y+.16,'#d1d6c6',.38,.43,.98);
            for(const t of [.45,.70,.96])wallPanel(frames,a,c,.25,high-.6,'#aab9aa',.12,t-.02/len,t+.02/len);
          }
          if(feature==='north-box'){const q=LOWY_NORTH_BOX;framedWindow(a,c,q.bottom,q.top,.015,.985,q.frame,q.projection,q.glass,'#82aa43',q.rows,false,streetGlass);}
          if(nu<-.95&&mid.u<-37&&mid.v<-10)facadeLabel(b,a,c,'LOWY CANCER','RESEARCH CENTRE',Math.min(7,len*.8),6.2,'#4d5a4c');
        }

      }
    }
    for(const w of LOWY_STREET_LOWER_WALLS){
      const {a,c}=w,len=distance2(a,c),p=(t,y)=>[a.x+(c.x-a.x)*t,y,a.z+(c.z-a.z)*t],b0=w.bottom0,b1=w.bottom1,t0=w.top0,t1=w.top1;
      if(w.kind==='glass'){
        glass.quad(p(0,Math.max(.25,b0)),p(0,t0),p(1,t1),p(1,Math.max(.25,b1)),'#47635c');
        for(let d=.06;d<len;d+=1.15){const q0={x:a.x+(c.x-a.x)*d/len,z:a.z+(c.z-a.z)*d/len},q1={x:a.x+(c.x-a.x)*Math.min(len,d+.035)/len,z:a.z+(c.z-a.z)*Math.min(len,d+.035)/len};wallPanel(frames,q0,q1,.25,LOWY_STREET.beam,'#7b8d80',.03);}
        skins.quad(p(0,b0),p(0,Math.max(.25,b0)),p(1,Math.max(.25,b1)),p(1,b1),'#a4b09f');
      }else concrete.quad(p(0,b0),p(0,t0),p(1,t1),p(1,b1),'#aeb6a8',[[0,b0/2],[0,t0/2],[len/2,t1/2],[len/2,b1/2]]);
    }
    const streetPaving=new Batch();streetPaving.base=0;
    for(const tri of LOWY_STREET_PAVING_TRIANGLES)streetPaving.triangle(...tri.map(p=>[p.x,p.y,p.z]),'#c0c5b4');
    world.add(streetPaving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving'),roughness:.94}),false));
    const undersides=new Batch();undersides.base=b.base;
    for(const part of LOWY_STREET_LOWER_PARTS.filter(p=>p.taper))shapedRoof(undersides,part.points,p=>lowyStreetBottom(p),'#a8b0a2',part.holes);
    for(const part of LOWY_STREET_RECESS)polygon(undersides,part.points,LOWY_STREET.beam,'#bfc6b5',part.holes,true);
    world.add(undersides.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),side:THREE.DoubleSide,roughness:.96})));
    world.add(skins.mesh(style('#ffffff',{vertexColors:true,roughness:.83,side:THREE.DoubleSide})),frames.mesh(style('#ffffff',{vertexColors:true,roughness:.49,metalness:.12,side:THREE.DoubleSide})));
    for(const part of MEDICAL_PARTS.filter(p=>p.buildingId===b.id)){
      const bridge=part.kind==='bridge',low=bridge?g.bridgeBottom:0,high=bridge?g.bridgeRoof:g.roofRL-b.base;
      polygon(roofs,part.points,high,bridge?'#7a9a4b':'#9ca995');
      if(bridge){const underside=new Batch();underside.base=b.base;polygon(underside,part.points,low,'#c8d1b7');world.add(underside.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})));}
      addCollider({points:part.points,holes:part.holes,bottom:bridge?low:LOWY_STREET.beam,top:high,base:b.base});
    }
    for(const part of LOWY_STREET_COLLIDERS)addCollider({...part,base:b.base});
    {const p=LOWY_WEST_POST,lo=terrainHeight(p.x,p.z)-b.base;batchPipe(detail,[p.x,lo,p.z],[p.x,p.top,p.z],p.radius,'#c4cbbb');addCollider({x:p.x,z:p.z,radius:p.radius,base:b.base,top:p.top});}
    for(const p of g.supports){
      const lo=terrainHeight(p.x,p.z)-b.base;batchPipe(detail,[p.x,lo,p.z],[p.x,g.bridgeBottom,p.z],p.radius,'#cbd4bc');addCollider({x:p.x,z:p.z,radius:p.radius,top:g.bridgeBottom,base:b.base});
    }
    for(const plant of g.plants){
      const ring=polygonArea(plant.points)<0?[...plant.points].reverse():plant.points,lo=plant.bottomRL-b.base,hi=plant.roofRL-b.base;
      polygon(roofs,ring,hi,'#8c9b89');
      for(let i=0;i<ring.length;i++){const a=ring[i],c=ring[(i+1)%ring.length];wallPanel(detail,a,c,lo,hi,'#8b9b87');for(let y=lo+.1;y<hi;y+=.14)wallPanel(detail,a,c,y,y+.03,'#576f5c',.05);}
    }
    const streetSkin=streetGlass.mesh(style('#ffffff',{vertexColors:true,roughness:.10,metalness:.35,envMapIntensity:.75}));world.add(streetSkin);medicalReflection(streetSkin,framePoint(f,0,-26),b.base+25,512);
    const mesh=glass.mesh(style('#ffffff',{vertexColors:true,roughness:.065,metalness:.65,envMapIntensity:1.15}));world.add(mesh);medicalReflection(mesh,framePoint(f,10,10),b.base+18,512);
  }

  function grandstand(b,concrete,detail,roofs){
    const pitch=orientedFrame(VILLAGE_SPORTS.find(s=>s.sport==='soccer').points);
    const f=orientedFrame(b.points,pitch.v),rows=6,rise=.37,depth=.85,front=f.width/2-1.1;
    const angle=Math.atan2(-f.v.z,f.v.x),beamAngle=Math.atan2(-f.u.z,f.u.x);
    const aisles=[-f.length*.33,0,f.length*.33],aisleWidth=1.3;
    const cuts=[-f.length/2+.4,...aisles.flatMap(z=>[z-aisleWidth/2,z+aisleWidth/2]),f.length/2-.4];
    for(let row=0;row<rows;row++){
      const x=front-(row+.5)*depth,top=(row+1)*rise;
      for(let k=0;k<cuts.length-1;k+=2){
        const z=(cuts[k]+cuts[k+1])/2,length=cuts[k+1]-cuts[k],p=framePoint(f,x,z);
        concrete.box(p.x,top/2,p.z,length,top,depth,'#b6b7a9',angle);
        addCollider({points:frameRectangle(f,depth,length,x,z),top,base:b.base});
      }
      for(let z=-f.length/2+.8,index=0;z<f.length/2-.6;z+=.56,index++){
        if(aisles.some(a=>Math.abs(z-a)<aisleWidth/2+.25))continue;
        const p=framePoint(f,x,z),back=framePoint(f,x-.19,z),color=(index+row*3)%9<2?'#333d3a':'#d5b535';
        detail.box(p.x,top+.29,p.z,.44,.085,.42,color,angle);
        detail.box(back.x,top+.55,back.z,.44,.48,.065,color,angle);
        detail.box(p.x,top+.13,p.z,.055,.26,.27,'#53605a',angle);
      }
    }
    for(const z of aisles){
      const a=framePoint(f,front,z),end=framePoint(f,front-rows*depth,z),count=rows*2;
      stairSegments.push({a,b:end,h0:b.base,h1:b.base+rows*rise,width:aisleWidth,count});
      for(let step=0;step<count;step++){
        const t=step/count,u=(step+1)/count,y=step/count*rows*rise+.05;
        const x0=front-rows*depth*t,x1=front-rows*depth*u;
        const points=[framePoint(f,x0,z-aisleWidth/2),framePoint(f,x0,z+aisleWidth/2),framePoint(f,x1,z+aisleWidth/2),framePoint(f,x1,z-aisleWidth/2)];
        polygon(concrete,points,y,'#bfc0b2');
        wallPanel(concrete,points[0],points[1],y-rise/2,y,'#939c92');
      }
    }
    // The architect's photograph shows an earth bank behind the seating. The
    // regional 5 m DEM does not resolve the bank detail: reconstruct it as
    // a small, explicitly modelled ramp, shared by drawing and walking.
    const mound=new Batch();mound.base=0;
    const inner=front-rows*depth,outer=-f.width/2-3;
    const heightAt=(x,z)=>{
      const dx=x-f.x,dz=z-f.z,u=dx*f.u.x+dz*f.u.z,v=dx*f.v.x+dz*f.v.z;
      return Math.max(terrainHeight(x,z),b.base+rows*rise*clamp((u-outer)/(inner-outer),0,1)*clamp((f.length/2-Math.abs(v))/3,0,1));
    };
    groundPatches.push({points:frameRectangle(f,inner-outer,f.length,(inner+outer)/2),heightAt});
    const nx=Math.ceil((inner-outer)/1.5),nz=Math.ceil(f.length/1.5);
    for(let i=0;i<nx;i++)for(let j=0;j<nz;j++){
      const x0=outer+(inner-outer)*i/nx,x1=outer+(inner-outer)*(i+1)/nx,z0=-f.length/2+f.length*j/nz,z1=-f.length/2+f.length*(j+1)/nz;
      const verts=[[x0,z0],[x0,z1],[x1,z1],[x1,z0]].map(([x,z])=>{const p=framePoint(f,x,z);return [p.x,heightAt(p.x,p.z)+.015,p.z];});
      mound.quad(...verts,'#829665');
    }
    world.add(mound.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('grass')})));
    // Three softly rounded, cantilevered roof leaves, observed in SCA's photos.
    // Roof height, section sizes and seat spacing are visual estimates.
    for(let leaf=0;leaf<3;leaf++){
      const centreZ=(leaf-1)*f.length/3,height=b.height,width=f.width+.25,length=f.length/3-.45;
      const ring=roundedFrameRectangle(f,width,length,.9,0,centreZ);
      polygon(roofs,ring,height,'#d0cbb7');
      const centre=framePoint(f,0,centreZ);
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length];
        detail.triangle([centre.x,height-.18,centre.z],[a.x,height-.18,a.z],[c.x,height-.18,c.z],'#aaa995');
        wallPanel(detail,a,c,height-.18,height,'#b8b8a5');
      }
      for(let z=centreZ-length/2+.8;z<centreZ+length/2-.5;z+=.28){const p=framePoint(f,0,z);detail.box(p.x,height-.2,p.z,width-.8,.025,.025,'#989d93',beamAngle);}
      for(const offset of [-length*.29,length*.29]){
        const p=framePoint(f,-f.width/2+1.8,centreZ+offset),beam=framePoint(f,.3,centreZ+offset);
        concrete.box(p.x,(height-.5)/2,p.z,.5,height-.5,.58,'#b5b8aa',angle);
        addCollider({x:p.x,z:p.z,radius:.34,top:height-.5,base:b.base});
        detail.box(beam.x,height-.4,beam.z,width-.7,.23,.22,'#343c38',beamAngle);
      }
      addCollider({points:ring,bottom:height-.18,top:height,base:b.base});
    }
  }

  function samCracknellPavilion(b){
    const g=pavilionGeometry(b),wall=new Batch(),concrete=new Batch(),glass=new Batch(),metal=new Batch(),orange=new Batch(),wood=new Batch(),roof=new Batch(),seat=new Batch(),railing=new Batch(),ground=new Batch();
    for(const batch of [wall,concrete,glass,metal,orange,wood,roof,seat,railing])batch.base=g.base;ground.base=0;
    for(const face of PAVILION_FACES){
      const {a,b:c,normal:n,bottom,top,kind}=face,len=distance2(a,c),upper=kind==='upper-room';if(len<.01)continue;
      const nearCurve=g.segments.some(s=>{const q=nearestOnSegment((a.x+c.x)/2,(a.z+c.z)/2,s.a,s.b);return Math.hypot((a.x+c.x)/2-q.x,(a.z+c.z)/2-q.z)<4.8&&n.x*s.n.x+n.z*s.n.z>.7;});
      wallPanel(wall,a,c,bottom,top,'#c8cbbf');
      if(upper&&nearCurve){
        wallPanel(glass,a,c,g.floor+.32,g.roof-.25,'#42646f',.035,.01,.99);
        for(let d=.2;d<len;d+=1.05)wallPanel(metal,a,c,g.floor+.32,g.roof-.23,'#899c9d',.09,d/len,Math.min(1,(d+.045)/len));
        wallPanel(wall,a,c,g.floor,g.floor+.23,'#d6d9c9',.12);wallPanel(wall,a,c,g.roof-.2,g.roof,'#d6dacb',.13);
      }else if(upper&&len>4){
        wallPanel(glass,a,c,4.45,5.55,'#4b6d7a',.035,.12,.86);for(let d=len*.12;d<len*.86;d+=1.0)wallPanel(metal,a,c,4.45,5.55,'#b6c2b7',.07,d/len,Math.min(.86,(d+.035)/len));
      }else if(!upper&&len>3){
        const north=n.x*g.n.x+n.z*g.n.z>.65;
        if(north){
          const bays=Math.max(1,Math.round(len/3.4));for(let j=0;j<bays;j++){
            const start=(j+.2)/bays,end=(j+.65)/bays;wallPanel(metal,a,c,.08,2.55,'#617777',.035,start,end);wallPanel(glass,a,c,.24,2.35,'#3d565d',.065,start+.035/len,end-.035/len);wallPanel(wall,a,c,2.55,2.7,'#d3d7c5',.1,start-.04/len,end+.04/len);
          }
        }else{
          wallPanel(metal,a,c,2.0,2.5,'#445854',.035,.25,.65);for(let y=2.04;y<2.5;y+=.09)wallPanel(metal,a,c,y,y+.018,'#839487',.055,.25,.65);
        }
      }
    }
    for(const part of PAVILION_PARTS){polygon(roof,part.points,part.height,'#c0c7b9',part.holes);if(part.minHeight)polygon(roof,part.points,part.minHeight,'#d0d5c7',part.holes,true);addCollider({...part,base:g.base,bottom:part.minHeight,top:part.height});}
    for(const patch of PAVILION_PAVING){polygon(ground,patch.points,g.base+.025,'#aeb7a8',patch.holes);groundPatches.push({...patch,heightAt:()=>g.base+.025});}
    const curveDistance=p=>Math.min(...g.segments.map(s=>{const q=nearestOnSegment(p.x,p.z,s.a,s.b);return Math.hypot(p.x-q.x,p.z-q.z);}));
    for(const patch of PAVILION_APRON){const height=p=>{const t=clamp(curveDistance(p)/2.2,0,1);return (g.base+.025)*(1-t)+(terrainHeight(p.x,p.z)+.22)*t;};
      // Subdivide the graded apron to follow the underlying 5 m terrain.
      shapedRoof(ground,patch.points,height,'#a6b3a1',patch.holes);groundPatches.push({...patch,heightAt:(x,z)=>height({x,z})});
    }
    for(const p of [...PAVILION_BALCONY,...PAVILION_LANDING]){
      polygon(concrete,p.points,g.floor,'#c6cebf',p.holes);polygon(concrete,p.points,g.floor-.18,'#bac4b7',p.holes,true);addCollider({...p,base:g.base,bottom:g.floor-.18,top:g.floor,stepHeight:g.landingStepHeight});
    }
    groundPatches.push(...pavilionDeckPatches(g));
    // All curved viewing structure sits within the retained source perimeter.
    for(const s of g.segments){
      const low=(t,inside=0)=>({x:s.a.x+(s.b.x-s.a.x)*t-s.n.x*inside,z:s.a.z+(s.b.z-s.a.z)*t-s.n.z*inside});
      const a=low(0,.1),c=low(1,.1);wallPanel(concrete,a,c,g.floor-.18,g.floor,'#c9d1c1');wallPanel(railing,a,c,g.floor+.08,g.floor+1.03,'#9fbdb4');wallPanel(metal,a,c,g.floor+1.03,g.floor+1.08,'#839c97',.02);
      const railPoints=pavilionRibbon(a,c,.06,.06,0);addCollider({points:railPoints,base:g.base,bottom:g.floor,top:g.floor+1.08});
      for(let d=.2;d<s.len;d+=1.8){const p=low(d/s.len,.1);metal.box(p.x,g.floor+.54,p.z,.035,1.08,.035,'#97aaa1');}
      const pa=low(0,.55),pc=low(1,.55);batchBeam(wood,[pa.x,7.1,pa.z],[pc.x,7.1,pc.z],.11,'#776e55');
      for(let d=.12;d<s.len;d+=.43){const p=low(d/s.len,.12),q=low(d/s.len,2.95);batchBeam(wood,[p.x,7.17,p.z],[q.x,7.17,q.z],.075,'#8e8168');}
    }
    for(const p of PAVILION_COLUMNS){concrete.box(p.x,g.floor/2,p.z,.24,g.floor,.24,'#cdd2c3');metal.box(p.x,(g.floor+p.roof)/2,p.z,.075,p.roof-g.floor,.075,'#677971');addCollider({x:p.x,z:p.z,radius:p.radius,base:g.base,top:p.roof});}
    for(const p of PAVILION_SEATS){
      const angle=Math.atan2(-p.u.z,p.u.x),back={x:p.x-p.n.x*.2,z:p.z-p.n.z*.2};
      seat.box(p.x,p.seat,p.z,p.width,.085,p.depth,'#d4ac4f',angle);seat.box(back.x,p.seat+.24,back.z,p.width,.47,.075,'#d9b45e',angle);
      for(const side of [-.17,.17]){const x=p.x+p.u.x*side,z=p.z+p.u.z*side;metal.box(x,p.seat/2,z,.045,p.seat,.29,'#586a62',angle);}
      addCollider({points:p.points,base:g.base,top:p.seat+.48});
    }
    // Orange metal blades screen the upgraded northern amenities corridor.
    const screenRuns=[[.035,.565]];
    for(const [lo,hi]of screenRuns){
      for(let t=lo;t<=hi;t+=.17/distance2(g.a,g.c)){const p=g.at(t,.31),angle=Math.atan2(-g.u.z,g.u.x)+.25;orange.box(p.x,1.56,p.z,.062,2.86,.28,'#b7642e',angle);}
      const a=g.at(lo,.31),c=g.at(hi,.31);batchBeam(metal,[a.x,.1,a.z],[c.x,.1,c.z],.055,'#8b795c');batchBeam(metal,[a.x,3.0,a.z],[c.x,3.0,c.z],.06,'#a9b3a5');
      const points=pavilionRibbon(a,c,.12,.12,0);addCollider({points,base:g.base,bottom:.08,top:3.05});
    }
    const officeA=g.at(.84,.15),officeB=g.at(.985,.15);wallPanel(glass,officeA,officeB,.1,2.8,'#4a686c');
    for(const t of [.84,.912,.985]){const p=g.at(t,.15);metal.box(p.x,1.45,p.z,.045,2.8,.045,'#b4c1b6');}
    addCollider({points:pavilionRibbon(officeA,officeB,.08,.08,0),base:g.base,top:2.8});
    for(const t of [.02,.58,.82,.99]){const p=g.at(t,.1);concrete.box(p.x,g.floor/2,p.z,.18,g.floor,.22,'#d4d8c8',Math.atan2(-g.u.z,g.u.x));}
    // Distinctive signed yellow panels, redrawn as simple text and colour.
    const banner=(lo,hi,low,high,small)=>{
      const a=g.at(lo,-.12),c=g.at(hi,-.12),width=distance2(a,c),texture=canvasTexture(small?512:1400,512,(ctx,w,h)=>{
        ctx.fillStyle='#c9bf74';ctx.fillRect(0,0,w,h);ctx.fillStyle='#b3ad70';for(let i=0;i<24;i++){ctx.globalAlpha=.07;ctx.fillRect((i*139)%w,0,1+i%3,h);}ctx.globalAlpha=1;ctx.fillStyle='#39494a';ctx.font=small?'700 104px Arial':'700 110px Arial';
        ctx.fillText(small?'UNSW':'SPORT',w*.1,h*.55);if(small)ctx.fillText('SPORT',w*.1,h*.78);ctx.font='500 24px Arial';ctx.fillText('SAM CRACKNELL PAVILION',w*.1,h*.15);ctx.font='400 20px Arial';ctx.fillText('UNSW',w*.1,h*.91);
      });
      const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,high-low),new THREE.MeshStandardMaterial({map:texture,side:THREE.DoubleSide,roughness:.9}));mesh.position.set((a.x+c.x)/2,g.base+(low+high)/2,(a.z+c.z)/2);mesh.rotation.y=Math.atan2(g.n.x,g.n.z);world.add(mesh);
      for(const t of [lo,hi]){const p=g.at(t,-.15);metal.box(p.x,(low+high)/2,p.z,.035,high-low,.035,'#c3cbbb');}
    };
    banner(.02,.57,3.16,6.85,false);banner(.81,.99,2.8,7.2,true);
    const s=g.stair,dx=s.b.x-s.a.x,dz=s.b.z-s.a.z;stairSegments.push({...s,h0:s.h0+.015,h1:s.h1+.015});
    for(const tread of g.stairTreads){const y=tread.rl-g.base;polygon(concrete,tread.points,y,'#c7cfc0');wallPanel(concrete,tread.points[3],tread.points[0],y-.16,y,'#b5c0b0');}
    for(const offset of [-1,1]){
      const point=(p,y)=>[p.x+g.u.x*offset*s.width/2,y-g.base,p.z+g.u.z*offset*s.width/2];batchPipe(metal,point(s.a,s.h0+.98),point(s.b,s.h1+.98),.026,'#697e75');
      for(let i=0;i<=5;i++){const t=i/5,p={x:s.a.x+dx*t,z:s.a.z+dz*t},y=s.h0+(s.h1-s.h0)*t;batchPipe(metal,point(p,y),point(p,y+1),.024,'#7e9186');}
    }
    // A modest pitched rear roof keeps the retained overall eight-metre tag.
    const pitchedHeight=p=>{const inward=-((p.x-g.a.x)*g.n.x+(p.z-g.a.z)*g.n.z);return g.roof+1.2*clamp(1-inward/8,0,1);};
    for(const patch of PAVILION_PITCHED_ROOF){shapedRoof(roof,patch.points,pitchedHeight,'#c0c8ba',patch.holes);for(let i=0;i<patch.points.length;i++){const a=patch.points[i],c=patch.points[(i+1)%patch.points.length];roof.quad([a.x,g.roof,a.z],[a.x,pitchedHeight(a),a.z],[c.x,pitchedHeight(c),c.z],[c.x,g.roof,c.z],'#b7c2b1');}}
    world.add(railing.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.3,depthWrite:false,side:THREE.DoubleSide,roughness:.14,metalness:.14})));
    const reflection=glass.mesh(style('#ffffff',{vertexColors:true,roughness:.14,metalness:.22,envMapIntensity:.55,side:THREE.DoubleSide}));world.add(reflection);medicalReflection(reflection,g.arrival,g.base+4.8);
    const paintedBrick=canvasTexture(512,512,(ctx,w,h)=>{ctx.fillStyle='#e8ecdf';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#cbd3c4';ctx.lineWidth=2;for(let row=0;row<16;row++)for(let col=-1;col<8;col++){const x=col*80+(row%2)*40,y=row*32;ctx.strokeRect(x,y,80,32);}});
    paintedBrick.wrapS=paintedBrick.wrapT=THREE.RepeatWrapping;paintedBrick.repeat.set(1.6,1.6);
    world.add(concrete.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),roughness:.9})),wall.mesh(style('#ffffff',{vertexColors:true,map:paintedBrick,roughness:.9})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.28,roughness:.52})),orange.mesh(style('#ffffff',{vertexColors:true,metalness:.25,roughness:.55})),wood.mesh(style('#ffffff',{vertexColors:true})),roof.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),seat.mesh(style('#ffffff',{vertexColors:true,roughness:.82})),ground.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')}),false));
  }

  function homeGroundCafe(b,masonry,glass,detail,roofs){
    const f=orientedFrame(b.points),ordered=polygonArea(b.points)<0?[...b.points].reverse():b.points;
    for(let i=0;i<ordered.length;i++){
      const a=ordered[i],c=ordered[(i+1)%ordered.length],len=distance2(a,c),nx=(c.z-a.z)/len,nz=-(c.x-a.x)/len;
      wallPanel(masonry,a,c,0,b.height,'#c6ccbf');wallPanel(glass,a,c,.55,b.height-.25,'#4c6769',.04,.01,.99);
      wallPanel(detail,a,c,.52,.61,'#d6dbcc',.09);
      for(let d=.15;d<len;d+=1.1){const t=d/len;wallPanel(detail,a,c,.55,b.height-.2,'#ccd4c8',.09,t-.025/len,t+.025/len);}
      if(len>7&&nx<-.4){
        const texture=canvasTexture(256,256,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.fillStyle='#254b62';ctx.beginPath();ctx.arc(w/2,h/2,121,0,TAU);ctx.fill();ctx.fillStyle='#f1f3e7';ctx.textAlign='center';ctx.font='600 48px sans-serif';ctx.fillText('home',128,112);ctx.fillText('ground',128,166);});
        const logo=new THREE.Mesh(new THREE.PlaneGeometry(.55,.55),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}));logo.position.set((a.x+c.x)/2+nx*.12,b.base+1.7,(a.z+c.z)/2+nz*.12);logo.rotation.y=Math.atan2(nx,nz);world.add(logo);
      }
    }
    addCollider({points:b.points,top:b.height,base:b.base});
    const roof=(frame,width,length,height,open)=>{
      const ring=roundedFrameRectangle(frame,width,length,Math.min(2.6,width/3)),centre=framePoint(frame,0,0);
      polygon(roofs,ring,height,'#bfc4b6');
      for(let i=0;i<ring.length;i++){const a=ring[i],c=ring[(i+1)%ring.length];detail.triangle([centre.x,height-.18,centre.z],[a.x,height-.18,a.z],[c.x,height-.18,c.z],'#b3baab');wallPanel(detail,a,c,height-.18,height,'#c7cbbc');}
      if(open)for(const x of [-width*.33,width*.33])for(const z of [-length*.3,length*.3]){const p=framePoint(frame,x,z);masonry.box(p.x,(height-.18)/2,p.z,.25,height-.18,.25,'#c5cdbe');addCollider({x:p.x,z:p.z,radius:.16,top:height,base:b.base});}
      addCollider({points:ring,bottom:height-.18,top:height,base:b.base});
    };
    roof(f,f.width+2.8,f.length+2.8,b.height,false);
    const outdoor=framePoint(f,0,f.length/2+4.8),shade={...f,...outdoor,width:6.5,length:7.5};
    roof(shade,6.5,7.5,b.height-.45,true);
    const apron=new Batch();polygon(apron,frameRectangle(shade,8,9),.23,'#b4b8ad');world.add(apron.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})));
    const angle=Math.atan2(-f.u.z,f.u.x);
    for(const z of [-1.6,1.6]){
      const p=framePoint(shade,0,z);detail.box(p.x,.77,p.z,2,.1,.65,'#b7837c',angle);
      for(const side of [-.62,.62]){const p=framePoint(shade,0,z+side);detail.box(p.x,.45,p.z,2,.09,.3,'#b7837c',angle);}
      for(const x of [-.7,.7]){const p=framePoint(shade,x,z);detail.box(p.x,.38,p.z,.07,.72,1.5,'#bbc7b7',angle);}
      addCollider({points:frameRectangle(shade,2,1.5,0,z),top:.82,base:b.base});
    }
    const trunks=new Batch(),fronds=new Batch(),beds=new Batch();trunks.base=fronds.base=0;
    for(const [index,z] of [-f.length*.35,0,f.length*.4].entries()){
      const p=framePoint(f,-f.width/2-1.7,z),base=terrainHeight(p.x,p.z),height=7.5+index*.6;
      polygon(beds,Array.from({length:20},(_,i)=>({x:p.x+Math.cos(i/20*TAU)*.75,z:p.z+Math.sin(i/20*TAU)*.75})),.275,'#8c7d5c');
      for(let i=0;i<8;i++){const a=i/8*TAU,c=(i+1)/8*TAU;trunks.quad([p.x+Math.cos(a)*.23,base,p.z+Math.sin(a)*.23],[p.x+Math.cos(a)*.15,base+height,p.z+Math.sin(a)*.15],[p.x+Math.cos(c)*.15,base+height,p.z+Math.sin(c)*.15],[p.x+Math.cos(c)*.23,base,p.z+Math.sin(c)*.23],'#8f7760',[[i/8,0],[i/8,height/2],[(i+1)/8,height/2],[(i+1)/8,0]]);}
      for(let leaf=0;leaf<12;leaf++){
        const angle=leaf/12*TAU+index,dx=Math.cos(angle),dz=Math.sin(angle),px=-dz,pz=dx;
        const centre=t=>({x:p.x+dx*3.1*t,y:base+height+.45*Math.sin(Math.PI*t)-1.25*t*t,z:p.z+dz*3.1*t});
        for(let i=0;i<4;i++){const a=centre(i/4),c=centre((i+1)/4);fronds.quad([a.x+px*.018,a.y,a.z+pz*.018],[c.x+px*.018,c.y,c.z+pz*.018],[c.x-px*.018,c.y,c.z-pz*.018],[a.x-px*.018,a.y,a.z-pz*.018],'#8e9f64');}
        for(let i=0;i<14;i++){
          const t=.1+i/16,q=centre(t),length=.65*(1-t)+.15;
          for(const side of [-1,1])fronds.triangle([q.x-dx*.035,q.y,q.z-dz*.035],[q.x+dx*.035,q.y,q.z+dz*.035],[q.x+px*side*length+dx*.15,q.y-.25,q.z+pz*side*length+dz*.15],leaf%2?'#71844f':'#879c61');
        }
      }
      addCollider({x:p.x,z:p.z,radius:.25,top:height,base});
    }
    world.add(trunks.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('bark')})),fronds.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),beds.mesh(style('#ffffff',{vertexColors:true})));
  }

  function buildingWorld() {
    const masonry=new Batch(),brickwork=new Batch(),clinkerwork=new Batch(),aggregatework=new Batch(),glass=new Batch(),detail=new Batch(),roofs=new Batch();
    const allBatches=[masonry,brickwork,clinkerwork,aggregatework,glass,detail,roofs],random=rng(78);
    for(const b of buildings){
      const pts=validPoints(b);if(pts.length<3)continue;
      b.points=pts;b.extent=extent(pts);b.height=Number(b.height)||12;b.base=buildingBase(pts);
      const profile=buildingAppearance(b);
      if(b.heightSource==='estimated'&&profile.heightEstimate)b.height=profile.heightEstimate;
      // A transparent foyer needs a level floor above the terrain, rather than
      // the embedded low foundation used by opaque building masses.
      if(['nida-theatre','whitehouse'].includes(profile.facade))b.base=Math.max(...pts.map(p=>terrainHeight(p.x,p.z)));
      if(profile.facade==='village-cafe')b.base=villageCafeGeometry(b).floor;
      if(profile.facade==='goldstein')b.base=goldsteinCourtGeometry(b).hallFloor;
      if(profile.facade==='postgraduate')b.base=ncpvGeometry(b).base;
      if(profile.facade==='bank')b.base=bankGeometry(b).base;
      if(profile.facade==='l5')b.base=l5Geometry(b).base;
      if(profile.facade==='sam-cracknell')b.base=pavilionGeometry(b).base;
      if(profile.facade==='goodsell')b.base=goodsellGeometry(b).entryGround;
      if(profile.facade==='science-theatre')b.base=scienceTheatreFoundation(b,terrainHeight);
      if(profile.facade==='webster-theatres'){
        const g=websterTheatresGeometry(b),p=framePoint(g.frame,g.west,0);b.base=terrainHeight(p.x,p.z);
      }
      if(profile.facade==='clancy'){
        const g=clancyGeometry(b),p=framePoint(g.frame,g.hood.centreU,g.hood.glassV);b.base=terrainHeight(p.x,p.z);
      }
      for(const batch of allBatches)batch.base=b.base;
      if(b.modelledWith)continue;
      if(profile.facade==='library-walk'){libraryCoveredWalk(b);continue;}
      if(profile.facade==='mathews-pavilions'){mathewsPavilions(b);continue;}
      if(b.terrainCanopy){terrainCanopy(b);continue;}
      if(b.id===SCIENTIA_ID){scientiaBuilding();continue;}
      if(b.id===SCIENTIA_NORTH_ID)continue;
      if(b.walkableUnder){
        const h=Math.max(3,b.height),ordered=polygonArea(pts)<0?[...pts].reverse():pts;
        polygon(roofs,pts,h,'#b6b8b4');
        for(let i=0;i<ordered.length;i++)wallPanel(detail,ordered[i],ordered[(i+1)%ordered.length],h-.25,h,'#c2c3bb');
        for(let i=0;i<pts.length;i+=Math.max(1,Math.ceil(pts.length/6))){const p=pts[i];detail.box(p.x,h/2,p.z,.2,h,.2,'#939b98');addCollider({x:p.x,z:p.z,radius:.15,top:h,base:b.base});}
        addCollider({points:pts,bottom:h-.25,top:h,base:b.base});continue;
      }
      if(b.id===ROUNDHOUSE_ID){roundhouse(b);continue;}
      if(profile.facade==='new-college'){newCollege(b);continue;}
      if(profile.facade==='shalom'){shalomCollege(b);continue;}
      if(profile.facade==='warrane'){warraneCollege(b);continue;}
      if(profile.facade==='bank'){bankBuilding(b);continue;}
      if(profile.facade==='village-cafe'){villageCafe(b);continue;}
      if(profile.facade==='barker-east'){barkerEastWings(b);continue;}
      if(profile.facade==='repository'){repositoryBuildings(b);continue;}
      if(profile.facade==='spiral'){morvenSpiral(b);continue;}
      if(profile.facade==='nida-school'){nidaSchool(b);continue;}
      if(profile.facade==='regiment-hall'){regimentHall(b);continue;}
      if(profile.facade==='regiment-j2'){regimentBuilding(b,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='grandstand'){grandstand(b,masonry,detail,roofs);continue;}
      if(profile.facade==='cafe'){homeGroundCafe(b,masonry,glass,detail,roofs);continue;}
      if(profile.facade==='nida-theatre'){nidaTheatre(b,masonry,detail,roofs);continue;}
      if(['whitehouse','oldtote','figtree'].includes(profile.facade)){heritageBuilding(b,profile.facade,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='goldstein'){goldsteinHall(b,masonry,brickwork,glass,detail,roofs);goldsteinCourtyard(b);continue;}
      if(profile.facade==='science-theatre'){scienceTheatre(b,aggregatework,glass,detail,roofs);continue;}
      if(profile.facade==='dalton'){daltonBuilding(b,masonry,aggregatework,glass,detail,roofs);continue;}
      if(profile.facade==='webster'){websterBuilding(b,masonry,glass,detail,roofs);continue;}
      if(profile.facade==='chemical-complex'){chemicalComplex(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='webster-theatres'){websterTheatres(b,masonry,aggregatework,glass,detail,roofs);continue;}
      if(profile.facade==='clancy'){clancyAuditorium(b,detail);continue;}
      if(profile.facade==='bioscience'){bioscienceBuilding(b,detail,roofs);continue;}
      if(profile.facade==='ainsworth'){ainsworthBuilding(b);continue;}
      if(profile.facade==='mathews'){mathewsBuilding(b,masonry,glass,detail,roofs);continue;}
      if(profile.facade==='library'){libraryBuilding(b,masonry,clinkerwork,glass,detail,roofs);continue;}
      if(profile.facade==='tyree'){tyreeBuilding(b,masonry,clinkerwork,glass,detail,roofs);continue;}
      if(profile.facade==='blockhouse'){blockhouseBuilding(b,masonry,clinkerwork,glass,detail,roofs);continue;}
      if(profile.facade==='morven-brown'){morvenBrownBuilding(b,clinkerwork,glass,detail,roofs);continue;}
      if(profile.facade==='squarehouse'){squarehouseBuilding(b,masonry,clinkerwork,glass,detail,roofs);continue;}
      if(profile.facade==='red-centre'){redCentreBuilding(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='old-main'){oldMainBuilding(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='business-school'){businessSchool(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='law-pavilion'){lawBuilding(b);continue;}
      if(profile.facade==='quadrangle'){quadrangleBuilding(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='electrical'){electricalBuilding(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='rex-theatre'){rexTheatre(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='sdn-centre'){sdnCentre(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='barker-apartments'){barkerApartments(b,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='vallentine'){vallentineAnnexe(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='parking-station'){parkingStation(b,masonry,brickwork,glass,detail);continue;}
      if(profile.facade==='esme-terrace'){esmeTheatre(b,masonry,glass,detail);continue;}
      if(profile.facade==='science-laboratory'){scienceLaboratory(b,masonry,glass,detail,roofs);continue;}
      if(profile.facade==='aquatic-pool'){aquaticPool(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='aquatic-gym'){aquaticGym(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='newton'){newtonBuilding(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='keith-burrows'){keithBurrows(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='physics-theatre'){physicsTheatre(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='k17'){k17Building(b,masonry,glass,detail,roofs);continue;}
      if(profile.facade==='willis'){willisAnnexe(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='rupert'){rupertMyers(b,masonry,brickwork,detail,roofs);continue;}
      if(profile.facade==='sirf'){sirfBuilding(b,masonry,glass,detail,roofs);continue;}
      if(profile.facade==='agsm'){agsmBuilding(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='civil'){civilBuilding(b,brickwork,masonry,aggregatework,glass,detail,roofs);continue;}
      if(profile.facade==='patricia'){patriciaBuilding(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='samuels'){samuelsBuilding(b,masonry,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='goodsell'){goodsellBuilding(b,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='wallace'){wallaceWurth(b,masonry,detail,roofs);continue;}
      if(profile.facade==='lowy'){lowyBuilding(b,masonry,detail,roofs);continue;}
      if(profile.facade==='mathews-theatre'){mathewsTheatre(b,masonry,glass,detail,roofs);continue;}
      if(profile.facade==='chancellery'){chancelleryBuilding(b,brickwork,glass,detail,roofs);continue;}
      if(profile.facade==='university-terraces'){universityTerraces(b);continue;}
      if(profile.facade==='village'){villageResidence(b);continue;}
      if(profile.facade==='postgraduate'){postgraduateVillage(b);continue;}
      if(profile.facade==='l5'){l5Building(b);continue;}
      if(profile.facade==='sam-cracknell'){samCracknellPavilion(b);continue;}
      if(['shalom','international'].includes(profile.facade)){olderResidence(b,profile,clinkerwork,glass,detail,roofs);continue;}
      if(profile.facade==='college'){
        const ordered=polygonArea(pts)<0?[...pts].reverse():pts;
        polygon(roofs,pts,b.height,'#b5a58b',b.holes||[]);
        for(let i=0;i<ordered.length;i++)if(distance2(ordered[i],ordered[(i+1)%ordered.length])>.2)collegeFacade(b,ordered[i],ordered[(i+1)%ordered.length],profile,clinkerwork,glass,detail);
        collegeRoof(b,profile,detail,roofs);
        addCollider({points:pts,holes:b.holes||[],top:b.height,base:b.base});continue;
      }
      const pieces=[b];
      for(const piece of pieces){
        const ring=piece.points,holes=piece.holes||[],height=piece.height;
        const floors=piece.podium?1:((piece.parent?piece.levels:profile.floors)||piece.levels||Math.max(1,Math.round(height/3.7))),level=height/floors;
        const ordered=polygonArea(ring)<0?[...ring].reverse():ring;
        polygon(roofs,ring,height,'#858c8b',holes);
        for(const loop of [ordered,...holes.map(h=>polygonArea(h)>0?[...h].reverse():h)])for(let i=0;i<loop.length;i++){
          const a=loop[i],next=loop[(i+1)%loop.length],length=distance2(a,next);if(length<.2)continue;
          const nx=(next.z-a.z)/length,nz=-(next.x-a.x)/length,angle=Math.atan2(-(next.z-a.z),next.x-a.x);
          const along=(d,y=0,offset=0)=>({x:a.x+(next.x-a.x)*d/length+nx*offset,z:a.z+(next.z-a.z)*d/length+nz*offset,y});
          const type=piece.podium?'bands':profile.facade==='pleated'&&length<=25?'brick':profile.facade;
          const wallBatch=/brick|arcade/.test(type)?brickwork:masonry;
          wallPanel(wallBatch,a,next,0,height,type==='pleated'?'#667571':profile.color);
          // A weathered stone/concrete plinth and roof coping anchor every mass.
          wallPanel(detail,a,next,0,.48,'#8e9286',.03);
          wallPanel(detail,a,next,height-.25,height+.45,profile.trim,.12);
          wallPanel(detail,a,next,height+.43,height+.54,'#aaa99e',.19);
          if(type==='pleated'){ceramicScreen(a,next,height,glass,detail,profile);continue;}
          for(let f=0;f<floors;f++){
            const low=f*level+(f===0?.55:.72),high=Math.min(height-.45,(f+1)*level-.38);
            if(high<=low)continue;
            if(type==='slots'){
              wallPanel(glass,a,next,f*level+1.25,Math.min(high,f*level+2.02),profile.glass,.045,.015,.985);
              wallPanel(detail,a,next,f*level+2.02,Math.min(high+.13,f*level+2.13),'#794535',.14,.015,.985);
            }else if(['bands','fins','terracotta-fins','green','parking'].includes(type)){
              wallPanel(glass,a,next,low,high,profile.glass,.06,.008,.992);
              wallPanel(detail,a,next,high,high+.12,profile.trim,.14);
              if(type==='green')wallPanel(detail,a,next,f*level+.08,low, f%2?'#91ac55':'#6f8c36',.13);
              for(let d=1;d<length;d+=1.45){const t=d/length;wallPanel(detail,a,next,low,high,'#748285',.1,t-.012/length,t+.012/length);}
            }else{
              const count=Math.max(1,Math.floor(length/(profile.spacing||3.2)));
              for(let k=0;k<count;k++){
                const pad=profile.windowFraction?(1-profile.windowFraction)/2:.13;
                const start=(k+pad)/count,end=(k+1-pad)/count;
                const tint=new THREE.Color(profile.glass).multiplyScalar(.86+random()*.28);
                wallPanel(glass,a,next,low,high,tint,.055,start,end);
                const frame=type==='brick'?'#c0c4bd':'#8c9694';
                const fw=Math.min(.06/length,(end-start)*.12);
                wallPanel(detail,a,next,low-.04,high+.04,frame,.082,start-fw,start);
                wallPanel(detail,a,next,low-.04,high+.04,frame,.082,end,end+fw);
                wallPanel(detail,a,next,low-.05,low,frame,.085,start,end);
                wallPanel(detail,a,next,high,high+.06,frame,.085,start,end);
                if(type==='amber'){
                  const p=along((k+.04)*length/count);detail.box(p.x+nx*.35,(low+high)/2,p.z+nz*.35,.4,high-low,.62,k%3?'#cda038':'#e5bb59',angle+.22);
                }
              }
            }
            if(profile.shopfront&&f===0&&length>10){
              wallPanel(glass,a,next,.3,Math.min(3.2,level-.4),profile.glass,.11,.01,.99);
              wallPanel(detail,a,next,Math.min(3.2,level-.4),Math.min(3.65,level-.1),'#c4c9bb',.3);
              for(let d=.5;d<length;d+=4){const p=along(d);detail.box(p.x+nx*.2,1.7,p.z+nz*.2,.14,3.4,.18,'#b9c2b8',angle);}
            }
            if(type==='faceted'&&length>4){
              const count=Math.max(1,Math.floor(length/4.2));
              for(let k=0;k<count;k++){
                const t0=k/count,t1=(k+1)/count,p=(t,y,off)=>[a.x+(next.x-a.x)*t+nx*off,y,a.z+(next.z-a.z)*t+nz*off];
                const y=f*level,top=Math.min(height,y+.8+(k%3)*.35);
                detail.quad(p(t0,y,.12),p(t0,top,.15),p(t1,Math.min(height,top+.55),.42),p(t1,y,.4),k%3===0?'#424947':k%3===1?'#b09b6a':'#8f815c');
              }
            }
            if(type==='arcade'&&f===0&&length>10){
              wallPanel(glass,a,next,.15,3.05,'#293d40',.09,.015,.985);
              for(let d=1;d<length;d+=5.5){const p=along(d);detail.box(p.x+nx*.5,1.7,p.z+nz*.5,.45,3.4,.55,profile.trim,angle);}
              wallPanel(detail,a,next,3.05,3.35,profile.trim,.6);
            }
          }
          if(['fins','terracotta-fins'].includes(type)&&length>5){
            const spacing=profile.spacing||1.6;
            for(let d=.35;d<length;d+=spacing){const p=along(d);detail.box(p.x+nx*.46,height/2+.8,p.z+nz*.46,type==='fins'?.16:.32,height-1.5,type==='fins'?1.05:.68,profile.trim,angle+.35);}
          }
          if(type==='slots')for(let d=3;d<length;d+=6){const p=along(d);detail.box(p.x+nx*.08,height/2,p.z+nz*.08,.055,height,.08,'#6e3f31',angle);}
          // Recessed glazed entry and thin canopy on long faces.
          if(length>15&&i%2===0){
            const ground=(terrainHeight((a.x+next.x)/2,(a.z+next.z)/2)-b.base),t=.5,w=Math.min(.07,1.4/length);
            wallPanel(glass,a,next,ground+.05,ground+2.7,'#263f45',.14,t-w,t+w);
            for(const side of [-1,1])wallPanel(detail,a,next,ground+.05,ground+2.7,'#929f9e',.16,t+side*w-.025/length,t+side*w+.025/length);
            const p=along(length*.5);detail.box(p.x+nx*.9,ground+2.95,p.z+nz*.9,Math.min(5,length*.35),.12,1.9,profile.trim,angle);
          }
        }
        const e=extent(ring);
        // Roof service cores, ducts and vents stay inside each real footprint.
        if(e.width>18&&e.depth>18&&inPolygon(e.x,e.z,ring)&&!holes.some(h=>inPolygon(e.x,e.z,h))){
          detail.box(e.x,height+1,e.z,4.2,2,3.6,'#878e8d');
          for(let j=0;j<4;j++)detail.box(e.x-1.5+j,height+2.02,e.z,.55,.08,2.6,'#4c595a');
          if(profile.solar)for(let x=e.minX+8;x<e.maxX-5;x+=4)for(let z=e.minZ+6;z<e.maxZ-5;z+=3){if(!inPolygon(x,z,ring))continue;detail.box(x,height+.62,z,3.3,.12,1.8,'#283f51');for(let k=-1;k<=1;k++)detail.box(x+k,height+.69,z,.025,.015,1.8,'#73848b');}
        }

      }
      addCollider({points:pts,holes:b.holes||[],top:b.height,base:b.base});
    }
    scienceGlazedLinks(campus);
    const concrete=surfaceTexture('concrete'),brick=surfaceTexture('brick');
    world.add(masonry.mesh(style('#ffffff',{vertexColors:true,map:concrete,bumpMap:concrete,bumpScale:.035})));
    world.add(brickwork.mesh(style('#ffffff',{vertexColors:true,map:brick,bumpMap:brick,bumpScale:.075})));
    const clinker=clinkerTexture();clinker.wrapS=clinker.wrapT=THREE.RepeatWrapping;clinker.anisotropy=8;
    world.add(clinkerwork.mesh(style('#ffffff',{vertexColors:true,map:clinker,bumpMap:clinker,bumpScale:.028})));
    const aggregate=surfaceTexture('aggregate');
    world.add(aggregatework.mesh(style('#ffffff',{vertexColors:true,map:aggregate,bumpMap:aggregate,bumpScale:.018})));
    world.add(glass.mesh(style('#ffffff',{vertexColors:true,roughness:.16,metalness:.45,envMapIntensity:1.25})));
    world.add(detail.mesh(style('#ffffff',{vertexColors:true,roughness:.72})));
    world.add(roofs.mesh(style('#ffffff',{vertexColors:true,roughness:.95})));
  }

  function scientiaMainSteps(){
    const paving=new Batch(),lawn=new Batch(),stone=new Batch(),soil=new Batch(),metal=new Batch();for(const b of [paving,lawn,stone,soil,metal])b.base=0;
    for(const part of SCIENTIA_STEP_GROUND)groundPatches.push({...part,priority:true,heightAt:scientiaStepHeight});
    for(const part of SCIENTIA_STEP_FLOORS){
      const section=SCIENTIA_STEP_SECTIONS[part.section],batch=part.kind==='lawn'?lawn:paving,offset=part.kind==='lawn'?.008:0;
      shapedRoof(batch,part.points,p=>scientiaSectionHeight(section,p.x,p.z)+offset,part.kind==='lawn'?'#8b9d72':'#bdab99',part.holes);
      if(section.kind==='tread')for(const ring of [part.points,...part.holes])for(let i=0;i<ring.length;i++){
        const a=ring[i],b=ring[(i+1)%ring.length];if(Math.abs(scientiaLocal(a).u-section.u0)>2e-5||Math.abs(scientiaLocal(b).u-section.u0)>2e-5)continue;
        wallPanel(stone,a,b,section.bottom,section.height,'#ac9a89');wallPanel(stone,a,b,section.height-.018,section.height,'#cbbca7',.008);
      }
    }
    for(const part of SCIENTIA_STEP_GROUND)for(const r of [part.points,...part.holes])for(let i=0;i<r.length;i++){
      const a=r[i],b=r[(i+1)%r.length],count=Math.ceil(distance2(a,b)/.3);for(let j=0;j<count;j++){const at=t=>({x:a.x+(b.x-a.x)*t,z:a.z+(b.z-a.z)*t}),p=at(j/count),q=at((j+1)/count);stone.quad([p.x,demHeight(p.x,p.z)-.08,p.z],[p.x,scientiaStepHeight(p.x,p.z),p.z],[q.x,scientiaStepHeight(q.x,q.z),q.z],[q.x,demHeight(q.x,q.z)-.08,q.z],'#aa9e87');}
    }
    for(const part of SCIENTIA_STEP_TIERS){
      polygon(soil,part.points,part.soil+.012,'#73684f',part.holes);for(const r of [part.points,...part.holes])for(let i=0;i<r.length;i++){
        const a=r[i],b=r[(i+1)%r.length],len=distance2(a,b);if(len<.005)continue;wallPanel(stone,a,b,part.base,part.soil+.06,[374,56].includes(part.sourceId)?'#5c665d':'#92917b');
        for(let y=Math.floor(part.base/.3)*.3;y<part.soil;y+=.3)wallPanel(stone,a,b,Math.max(y,part.base),Math.min(y+.012,part.soil),'#777d6c',.006);
        stone.box((a.x+b.x)/2,part.soil+.055,(a.z+b.z)/2,len,.09,.14,'#acaa92',Math.atan2(-(b.z-a.z),b.x-a.x));
      }addCollider({...part,base:0,bottom:part.base,top:part.soil+.52});
    }
    for(const wall of SCIENTIA_STEP_PARAPET){const a=wall.a,b=wall.b;stone.quad([a.x,wall.low,a.z],[a.x,wall.topA,a.z],[b.x,wall.topB,b.z],[b.x,wall.low,b.z],'#9e9c86',[[0,0],[0,(wall.topA-wall.low)/2],[distance2(a,b)/2,(wall.topB-wall.low)/2],[distance2(a,b)/2,0]]);batchPipe(stone,[a.x,wall.topA,a.z],[b.x,wall.topB,b.z],.085,'#b4ae95');addCollider({points:wall.points,base:0,bottom:wall.low,top:Math.max(wall.topA,wall.topB)+.085});}
    // Centre rails divide the stair into two walking lanes, as in the photos.
    for(const f of SCIENTIA_FLIGHTS)for(const v of [4.52,4.88]){
      const at=(u,h)=>{const p=scientiaPoint(u,v);return [p.x,h,p.z];},y=u=>f.low+(f.high-f.low)*Math.max(0,Math.min(1,(u-f.u0)/(f.u1-f.u0)));
      batchPipe(metal,at(f.u0-.3,f.low+.94),at(f.u0,f.low+.94),.026,'#879d99');batchPipe(metal,at(f.u0,f.low+.94),at(f.u1,f.high+.94),.026,'#879d99');batchPipe(metal,at(f.u1,f.high+.94),at(f.u1+.3,f.high+.94),.026,'#879d99');
      for(const u of [f.u0-.2,(f.u0+f.u1)/2,f.u1+.2]){const p=scientiaPoint(u,v),h=y(u);batchPipe(metal,[p.x,h,p.z],[p.x,h+.94,p.z],.023,'#7b918d');addCollider({x:p.x,z:p.z,radius:.023,base:0,bottom:h,top:h+.96});}
    }
    const plants=new THREE.InstancedMesh(new THREE.SphereGeometry(1,8,5),style('#ffffff',{map:surfaceTexture('grass'),roughness:.98}),SCIENTIA_HEDGES.length),dummy=new THREE.Object3D(),color=new THREE.Color();
    for(let i=0;i<SCIENTIA_HEDGES.length;i++){const p=SCIENTIA_HEDGES[i];dummy.position.set(p.x,p.root+p.height/2,p.z);dummy.rotation.set(0,i*2.37,0);dummy.scale.set(p.radius,p.height/2,p.radius);dummy.updateMatrix();plants.setMatrixAt(i,dummy.matrix);plants.setColorAt(i,color.set(['#506544','#61714c','#6b7652'][i%3]));}plants.castShadow=plants.receiveShadow=true;world.add(plants);
    const pavers=surfaceTexture('path-pavers');world.add(paving.mesh(style('#ffffff',{vertexColors:true,map:pavers,bumpMap:pavers,bumpScale:.008}),false),lawn.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('grass')}),false),stone.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('aggregate'),roughness:.93,side:THREE.DoubleSide})),soil.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('grass')}),false),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.65,roughness:.35})));
  }

  function scientiaBuilding(){
    const stone=new Batch(),bands=new Batch(),metal=new Batch(),glass=new Batch(),roof=new Batch(),wood=new Batch();for(const b of [stone,bands,metal,glass,roof,wood])b.base=0;
    const S=SCIENTIA,F=SCIENTIA_FRAME,point=(u,v,y)=>{const p=scientiaPoint(u,v);return [p.x,y,p.z];};
    for(const part of [...SCIENTIA_NORTH,...SCIENTIA_SOUTH]){
      const ring=polygonArea(part.points)>0?part.points:[...part.points].reverse();
      polygon(metal,part.points,S.hallRoofRL,'#b6beb4',part.holes);
      for(const raw of [ring,...part.holes])for(let i=0;i<raw.length;i++){
        const a=raw[i],c=raw[(i+1)%raw.length],len=distance2(a,c),lower=Math.min(terrainHeight(a.x,a.z),terrainHeight(c.x,c.z))-.05;
        wallPanel(stone,a,c,lower,S.podiumRL,'#bcb094');wallPanel(glass,a,c,S.podiumRL,S.hallRoofRL-.13,'#53706b',.02);wallPanel(metal,a,c,S.hallRoofRL-.13,S.hallRoofRL+.04,'#bac1b7',.04);
        // Pale precast courses continue across the sandstone podium. The
        // aluminium hall screens are separate, fine horizontal blades.
        for(let y=Math.floor(lower/.36)*.36;y<S.podiumRL;y+=.36)wallPanel(bands,a,c,Math.max(y,lower),Math.min(y+.038,S.podiumRL),'#b2b09b',.035);
        for(let y=S.podiumRL+.12;y<S.hallRoofRL-.15;y+=.12)wallPanel(metal,a,c,y,y+.04,'#b8c0b5',.1);
        for(let k=0;k<=Math.ceil(len/2.4);k++){const t=Math.min(1,k*2.4/len),p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t};batchPipe(metal,[p.x,S.podiumRL,p.z],[p.x,S.hallRoofRL,p.z],.025,'#88988e');}
      }
      addCollider({...part,base:0,bottom:Math.min(...ring.map(p=>terrainHeight(p.x,p.z)))-.1,top:S.hallRoofRL});
    }
    // The open slot is paved, not an extension of the surrounding lawn.
    // Tessellated ground follows measured terrain beneath retained stair treads.
    const passage=new Batch();passage.base=0;
    for(const cell of SCIENTIA_PASSAGE)passage.quad(...cell.map(p=>[p.x,p.y,p.z]),'#b4b4a3');
    const angle=Math.atan2(-F.u.z,F.u.x);
    for(const link of SCIENTIA_LINKS){const u=link.u;bands.box(link.x,(link.bottom+link.top)/2,link.z,1.7,link.top-link.bottom,9.4,'#b9b49e',angle);for(const side of [u-.8,u+.8]){batchPipe(metal,point(side,.15,link.rail),point(side,9.1,link.rail),.025,'#94a299');for(let v=.3;v<9;v+=1.1)batchPipe(metal,point(side,v,link.top),point(side,v,link.rail),.018,'#94a299');}addCollider({points:link.points,base:0,bottom:link.bottom,top:link.rail+.05});}
    for(const p of SCIENTIA_SOLAR){metal.box(p.x,S.hallRoofRL+.12,p.z,p.width,.12,p.depth,'#a5b3ad',angle);glass.box(p.x,S.hallRoofRL+.19,p.z,2.72,.025,1.6,'#2f4b58',angle);for(const dx of [-.45,.45]){const q=scientiaPoint(p.u+dx,p.v);metal.box(q.x,S.hallRoofRL+.21,q.z,.012,.01,1.6,'#a0b3b2',angle);}}
    world.add(passage.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('path-pavers'),roughness:.9}),false));
    const at=(t,s,dy=0)=>{const p=scientiaRoofPoint(t,s);return [p.x,p.y+dy,p.z];};
    // Two explicitly folded wings use the original tapered canopy perimeter.
    for(let row=0;row<20;row++)for(let side=0;side<2;side++)for(let col=0;col<3;col++){
      const t0=row/20+.001,t1=(row+1)/20-.001,s0=side*.5+col/6+.001,s1=side*.5+(col+1)/6-.001;
      roof.quad(at(t0,s0),at(t1,s0),at(t1,s1),at(t0,s1),'#c4d8d1');
    }
    for(let row=0;row<=20;row++){const t=row/20;for(const side of [0,1])batchPipe(metal,at(t,.5,.045),at(t,side,.045),.035,'#879c94');}
    for(const side of [0,1]){batchPipe(metal,at(0,side,.04),at(1,side,.04),.07,'#9eafa4');batchPipe(metal,at(0,side,-.22),at(1,side,-.22),.045,'#8a9a91');for(let row=0;row<=40;row++)batchPipe(metal,at(row/40,side,-.25),at(row/40,side,.36),.013,'#9eaea1');}
    for(const side of [1/6,2/6,3/6,4/6,5/6])batchPipe(metal,at(0,side,.03),at(1,side,.03),.024,'#94a59d');
    // Three repeated timber trees are fitted to the photographs. Keep the
    // original source stair centre line clear beside the central trunks.
    for(const tree of SCIENTIA_TREES){
      batchPipe(wood,[tree.x,tree.root,tree.z],point(tree.u,tree.v,tree.forkRL),tree.radius,'#754d3b');
      batchPipe(metal,point(tree.u,tree.v,tree.root),point(tree.u,tree.v,tree.root+.23),tree.radius+.035,'#8a998d');
      for(const side of [-1,1])for(const du of [-3.5,0,3.5]){
        const t=Math.max(0,Math.min(1,(tree.u+du)/33.3)),s=side<0?.025:.975,p=scientiaRoofPoint(t,s),start=point(tree.u,tree.v,tree.forkRL+(du===0?2.4:0));
        batchPipe(wood,start,[p.x,p.y-.25,p.z],du===0?.11:.13,'#865844');
        batchPipe(metal,[p.x,p.y-.25,p.z],[p.x,p.y+.02,p.z],.045,'#a6b4a6');
      }
      addCollider({x:tree.x,z:tree.z,radius:tree.radius,base:0,bottom:tree.root,top:S.roofRL});
    }
    addCollider({points:S.footprint,base:0,bottom:S.valleyRL-.3,top:S.roofRL+.4});
    world.add(stone.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('aggregate'),bumpMap:surfaceTexture('aggregate'),bumpScale:.012})),bands.mesh(style('#ffffff',{vertexColors:true})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.5,roughness:.44})),glass.mesh(style('#ffffff',{vertexColors:true,metalness:.35,roughness:.2})),wood.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('wood'),roughness:.6})),roof.mesh(style('#ffffff',{vertexColors:true,transparent:true,opacity:.42,metalness:.12,roughness:.16,side:THREE.DoubleSide}),false));
  }

  function roundhouse(b) {
    const g=roundhouseGeometry(b),concrete=new Batch(),metal=new Batch(),windows=new Batch(),roof=new Batch(),steps=new Batch(),paving=new Batch();
    for(const batch of [concrete,metal,windows,roof])batch.base=b.base;steps.base=paving.base=0;
    const ordered=(r,hole=false)=>(polygonArea(r)>0)!==hole?r:[...r].reverse();
    const at=(a,r,y)=>{const p=g.at(a,r);return [p.x,y,p.z];};
    const facade=(part,low,high,annex=false)=>{
      for(const raw of [part.points,...part.holes]){const ring=ordered(raw,raw!==part.points);for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);if(len<.1)continue;
        // The shared internal arc between the hall and low annex is not an
        // extra exterior service wall. Only source-boundary faces are clad.
        if(annex){const mid={x:(a.x+c.x)/2,z:(a.z+c.z)/2};if(!b.points.some((q,j)=>{const p=nearestOnSegment(mid.x,mid.z,q,b.points[(j+1)%b.points.length]);return Math.hypot(p.x-mid.x,p.z-mid.z)<1e-6;}))continue;}
        wallPanel(windows,a,c,low+.14,high-.12,annex?'#657e7b':'#91aca6',.025);
        const count=Math.max(1,Math.round(len/(annex?2.2:1.7)));
        for(let bay=0;bay<=count;bay++)wallPanel(metal,a,c,low,high,'#c5cebe',.075,Math.max(0,bay/count-.024/len),Math.min(1,bay/count+.024/len));
        for(const y of [low+.25,low+1.1,high-.9,high-.1])wallPanel(metal,a,c,y,y+.045,'#b9c8b8',.08);
        wallPanel(concrete,a,c,low,low+.13,'#b9c2ad',.03);wallPanel(concrete,a,c,high-.12,high,'#d0d7c5',.07);
      }}
    };
    for(const part of ROUNDHOUSE_GROUND){
      if(part.kind==='arcade'){
        shapedRoof(paving,part.points,p=>terrainHeight(p.x,p.z)+.22,'#b8baad',part.holes);
        groundPatches.push({points:part.points,heightAt:(x,z)=>terrainHeight(x,z)+.22});continue;
      }
      facade(part,0,part.kind==='annex'?g.deck:g.underside,part.kind==='annex');
      addCollider({points:part.points,holes:part.holes,base:b.base,top:part.kind==='annex'?g.deck:g.underside});
    }
    for(const part of ROUNDHOUSE_UPPER){facade(part,g.deck,g.eave);addCollider({points:part.points,holes:part.holes,base:b.base,bottom:g.deck,top:g.eave});}
    for(const part of ROUNDHOUSE_DECK){
      polygon(concrete,part.points,g.deck,'#c6caba',part.holes);polygon(concrete,part.points,g.underside,'#d7ddca',part.holes,true);
      for(const raw of [part.points,...part.holes]){const ring=ordered(raw,raw!==part.points);for(let i=0;i<ring.length;i++)wallPanel(concrete,ring[i],ring[(i+1)%ring.length],g.underside,g.deck,'#d2d8c7');}
      addCollider({points:part.points,holes:part.holes,bottom:g.underside,top:g.deck,stepHeight:.27,base:b.base});
    }
    for(const part of ROUNDHOUSE_PARAPET){
      polygon(concrete,part.points,g.deck+1.1,'#e0e3d5',part.holes);
      for(const raw of [part.points,...part.holes]){const ring=ordered(raw,raw!==part.points);for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],len=distance2(a,c);wallPanel(concrete,a,c,g.deck,g.deck+1.1,'#dce0d2');
        const mid={x:(a.x+c.x)/2,z:(a.z+c.z)/2};if(g.outline.some((q,j)=>{const p=nearestOnSegment(mid.x,mid.z,q,g.outline[(j+1)%g.outline.length]);return Math.hypot(p.x-mid.x,p.z-mid.z)<1e-6;})){
          for(const y of [g.deck+1.27,g.deck+1.45])batchBeam(metal,[a.x,y,a.z],[c.x,y,c.z],.025,'#9eada4');
          for(let d=.3;d<len;d+=2.2){const t=d/len;batchBeam(metal,[a.x+(c.x-a.x)*t,g.deck+1.1,a.z+(c.z-a.z)*t],[a.x+(c.x-a.x)*t,g.deck+1.45,a.z+(c.z-a.z)*t],.025,'#9eada4');}
        }
      }}
      addCollider({points:part.points,holes:part.holes,bottom:g.deck,top:g.deck+1.45,base:b.base});
    }
    // Thin black outward-leaning columns and a broad pale soffit define the
    // completed façade, rather than a freestanding disc at balcony height.
    for(let i=0;i<24;i++){
      const a=i*TAU/24,r=g.radiusAt(a),bottom=g.at(a,r*.974),top=g.at(a,r+.02);
      batchBeam(metal,[bottom.x,g.deck,bottom.z],[top.x,g.eave+.06,top.z],.12,'#354845');
      addCollider({x:bottom.x,z:bottom.z,radius:.12,bottom:g.deck,top:g.eave+.06,base:b.base});
    }
    for(const part of ROUNDHOUSE_MAIN){
      polygon(concrete,part.points,g.eave-.16,'#dae0d0',ROUNDHOUSE_UPPER.map(p=>p.points),true);
      for(let i=0;i<part.points.length;i++)wallPanel(metal,part.points[i],part.points[(i+1)%part.points.length],g.eave-.1,g.eave+.12,'#3b5151');
      addCollider({points:part.points,base:b.base,bottom:g.eave-.16,top:g.eave+.12});
    }
    for(const part of ROUNDHOUSE_ROOFS){
      if(part.kind==='cone')shapedRoof(roof,part.points,g.roofHeight,'#a9b1a7',part.holes);
      if(part.kind==='annex')polygon(roof,part.points,g.deck,'#98a69b',part.holes);
    }
    // Fine radial roof seams terminate at the small real oculus. Component
    // heights remain reconstructions contained by the retained 10 m maximum.
    for(let i=0;i<96;i++){const a=i*TAU/96,r=g.radiusAt(a);batchBeam(metal,at(a,g.oculusRadius,g.roofInner+.012),at(a,r,g.eave+.012),.018,'#8c9b94');}
    const curb=new THREE.Mesh(new THREE.CylinderGeometry(g.oculusRadius,g.oculusRadius,.15,64,1,true),style('#5b7474',{side:THREE.DoubleSide,metalness:.25}));curb.position.set(g.center.x,b.base+g.roofInner+.075,g.center.z);world.add(curb);
    const dome=new THREE.Mesh(new THREE.SphereGeometry(g.oculusRadius,48,12,0,TAU,0,Math.PI/2),style('#91b6b8',{roughness:.12,metalness:.35,transparent:true,opacity:.75,side:THREE.DoubleSide}));dome.scale.y=(b.height-g.oculusBase)/g.oculusRadius;dome.position.set(g.center.x,b.base+g.oculusBase,g.center.z);world.add(dome);
    for(let i=0;i<8;i++){const a=i*TAU/8;batchBeam(metal,at(a,g.oculusRadius,g.oculusBase),[g.center.x,b.height,g.center.z],.035,'#6c8582');}
    for(const step of ROUNDHOUSE_STEPS){
      polygon(steps,step.points,step.rl,'#c5cbbb');
      for(let i=0;i<step.points.length;i++){const a=step.points[i],c=step.points[(i+1)%step.points.length];steps.quad([a.x,terrainHeight(a.x,a.z)-.1,a.z],[a.x,step.rl,a.z],[c.x,step.rl,c.z],[c.x,terrainHeight(c.x,c.z)-.1,c.z],'#b6c0ac');}
      groundPatches.push({points:step.points,heightAt:()=>step.rl+.01});addCollider({points:step.points,base:0,top:step.rl,stepHeight:.27});
    }
    for(const stair of g.stairs){
      polygon(steps,stair.landing.points,stair.highRL,'#d2d8c5');polygon(steps,stair.landing.points,stair.highRL-.18,'#c4cdb9',[],true);addCollider({points:stair.landing.points,bottom:stair.highRL-.18,top:stair.highRL,base:0,stepHeight:.27});
      const p=(side,v,y)=>{const q=framePoint(stair.frame,side*1.78,v);return [q.x,y,q.z];};
      for(const side of [-1,1]){
        const points=[p(side,0,stair.highRL-.12),p(side,0,stair.highRL+1.0),p(side,stair.run,stair.lowRL+1.0),p(side,stair.run,stair.lowRL-.12)];steps.quad(...points,'#e0e4d7');steps.quad(...[...points].reverse(),'#e0e4d7');
        batchBeam(steps,p(side,0,stair.highRL+1.02),p(side,stair.run,stair.lowRL+1.02),.12,'#dce2d1');
        const f=stair.frame,q=framePoint(f,side*1.78,-.8),angle=Math.atan2(-f.u.z,f.u.x);addCollider({points:frameRectangle(f,.18,2.4,side*1.78,-.8),base:0,bottom:stair.highRL,top:stair.highRL+1.02});steps.box(q.x,stair.highRL+.5,q.z,.15,1,2.4,'#e0e4d7',angle);
        for(const step of ROUNDHOUSE_STEPS.filter(p=>p.stair===g.stairs.indexOf(stair))){const local=step.points.map(q=>({u:(q.x-f.x)*f.u.x+(q.z-f.z)*f.u.z,v:(q.x-f.x)*f.v.x+(q.z-f.z)*f.v.z})),v=(Math.min(...local.map(p=>p.v))+Math.max(...local.map(p=>p.v)))/2,depth=Math.max(...local.map(p=>p.v))-Math.min(...local.map(p=>p.v)),shape=frameRectangle(f,.18,depth,side*1.78,v);addCollider({points:shape,base:0,top:step.rl+1.02});}
      }
      groundPatches.push({points:stair.apron,heightAt:(x,z)=>terrainHeight(x,z)+.22});
    }
    for(const part of ROUNDHOUSE_PAVING){shapedRoof(paving,part.points,p=>terrainHeight(p.x,p.z)+.22,'#bfc0b0',part.holes);groundPatches.push({points:part.points,holes:part.holes,heightAt:(x,z)=>terrainHeight(x,z)+.22});}
    roundhouseLandscape();roundhouseEntrance(b);
    const word=canvasTexture(1024,160,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.fillStyle='#334744';ctx.font='900 108px Arial Narrow, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('ROUNDHOUSE',w/2,h/2,w-30);});
    const sign=new THREE.Mesh(new THREE.PlaneGeometry(7.5,1),new THREE.MeshBasicMaterial({map:word,transparent:true,depthWrite:false})),q={x:g.center.x,z:Math.max(...g.outline.map(p=>p.z))+.16};sign.position.set(q.x,b.base+g.deck+.53,q.z);sign.rotation.y=0;world.add(sign);
    world.add(concrete.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),bumpMap:surfaceTexture('concrete'),bumpScale:.018})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.35,roughness:.36})),roof.mesh(style('#ffffff',{vertexColors:true,roughness:.65,metalness:.2})),steps.mesh(style('#ffffff',{vertexColors:true})),paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})));
    const glazing=windows.mesh(style('#ffffff',{vertexColors:true,roughness:.09,metalness:.5,envMapIntensity:.8}));world.add(glazing);medicalReflection(glazing,g.at(Math.PI/2,34),b.base+2.1);
  }

  function villageCafe(b){
    const g=villageCafeGeometry(b),f=g.frame,clad=new Batch(),wood=new Batch(),metal=new Batch(),glass=new Batch(),roof=new Batch(),ground=new Batch();for(const q of [clad,wood,metal,glass,roof,ground])q.base=0;
    const floor=g.floor,ordered=polygonArea(b.points)>0?b.points:[...b.points].reverse(),absolute=(p,y)=>[p.x,y,p.z];
    for(let i=0;i<ordered.length;i++){
      const a=ordered[i],c=ordered[(i+1)%ordered.length],len=distance2(a,c),normal={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},south=normal.x*f.v.x+normal.z*f.v.z>.8;
      wallPanel(clad,a,c,floor,floor+3.15,'#b6af95');for(let y=.16;y<3.1;y+=.19)wallPanel(metal,a,c,floor+y,floor+y+.012,'#77786a',.018);
      wallPanel(metal,a,c,floor+3.05,floor+3.3,'#364748',.07);
      if(south){
        wallPanel(glass,a,c,floor+.98,floor+2.48,'#425d58',.07,.08,.92);
        for(const y of [.95,2.48])wallPanel(metal,a,c,floor+y,floor+y+.055,'#293e3b',.14,.065,.935);
        for(let j=0;j<=4;j++){const t=.08+.84*j/4;wallPanel(metal,a,c,floor+1,floor+2.5,'#263c39',.14,t-.018/len,t+.018/len);}
        const q=framePoint(f,0,f.length/2+.26);wood.box(q.x,floor+.97,q.z,f.width*.89,.09,.55,'#b0a98e',Math.atan2(-f.u.z,f.u.x));
        const innerA=framePoint(f,-f.width*.47,f.length/2),innerB=framePoint(f,f.width*.47,f.length/2),outerA=framePoint(f,-f.width*.47,f.length/2+1.05),outerB=framePoint(f,f.width*.47,f.length/2+1.05);
        roof.quad(absolute(innerA,floor+2.77),absolute(innerB,floor+2.77),absolute(outerB,floor+3.18),absolute(outerA,floor+3.18),'#889c93');
        addCollider({points:frameRectangle(f,f.width*.94,1.05,0,f.length/2+.525),base:0,bottom:floor+2.74,top:floor+3.23});
        for(const side of [-1,1]){const p=framePoint(f,side*f.width*.44,f.length/2);batchBeam(metal,absolute(p,floor+2.05),absolute(framePoint(f,side*f.width*.44,f.length/2+1.0),floor+3.14),.035,'#354946');}
      }
    }
    polygon(roof,b.points,floor+3.16,'#5d7670');addCollider({points:b.points,base:floor,top:3.3});
    const label=canvasTexture(768,640,(ctx,w,h)=>{ctx.clearRect(0,0,w,h);ctx.textAlign='center';ctx.fillStyle='#efeee0';ctx.font='600 70px Arial';ctx.fillText('CAMPUS',w/2,100);ctx.fillStyle='#b83830';ctx.font='700 135px Georgia';ctx.fillText('VILLAGE',w/2,300,w-20);ctx.font='700 175px Georgia';ctx.fillText('CAFÉ',w/2,515,w-20);});
    const q=framePoint(f,-f.width/2-.08,0),sign=new THREE.Mesh(new THREE.PlaneGeometry(2.65,2.1),new THREE.MeshBasicMaterial({map:label,transparent:true,depthWrite:false}));sign.position.set(q.x,floor+1.72,q.z);sign.rotation.y=Math.atan2(-f.u.x,-f.u.z);world.add(sign);
    for(const part of VILLAGE_CAFE_DECK){
      polygon(wood,part.points,floor,'#8f7960',part.holes);groundPatches.push({...part,heightAt:()=>floor});addCollider({...part,base:0,bottom:floor-.18,top:floor,stepHeight:.27});
      for(const ring of [part.points,...part.holes])for(let i=0;i<ring.length;i++){const a=ring[i],c=ring[(i+1)%ring.length];ground.quad(absolute(a,terrainHeight(a.x,a.z)-.03),absolute(a,floor-.025),absolute(c,floor-.025),absolute(c,terrainHeight(c.x,c.z)-.03),'#647474');}
    }
    for(const step of g.stairs.steps){polygon(wood,step.points,step.rl,'#9d876b');groundPatches.push({points:step.points,heightAt:()=>step.rl+.01});addCollider({points:step.points,base:0,top:step.rl,stepHeight:.27});for(let i=0;i<step.points.length;i++){const a=step.points[i],c=step.points[(i+1)%step.points.length];ground.quad(absolute(a,terrainHeight(a.x,a.z)-.03),absolute(a,step.rl),absolute(c,step.rl),absolute(c,terrainHeight(c.x,c.z)-.03),'#677670');}}
    shapedRoof(ground,g.stairs.apron,p=>terrainHeight(p.x,p.z)+.22,'#aeb7a7');groundPatches.push({points:g.stairs.apron,heightAt:(x,z)=>terrainHeight(x,z)+.22});
    for(const side of [-1,1]){const a=framePoint(g.stairs.frame,side*1.06,-2.5),c=framePoint(g.stairs.frame,side*1.06,0);batchBeam(metal,absolute(a,g.stairs.lowRL+.92),absolute(c,floor+.92),.035,'#b7c3b8');for(const [p,y]of [[a,g.stairs.lowRL],[c,floor]])batchBeam(metal,absolute(p,y),absolute(p,y+.95),.035,'#b7c3b8');}
    for(const canopy of g.canopies){
      const p=canopy.points,peak=absolute(canopy.centre,canopy.peak);for(let i=0;i<4;i++){roof.triangle(absolute(p[i],canopy.eave),peak,absolute(p[(i+1)%4],canopy.eave),'#e6e4ce');batchBeam(metal,absolute(p[i],canopy.eave-.03),peak,.025,'#a1ad9c');batchBeam(metal,absolute(p[i],canopy.eave),absolute(p[(i+1)%4],canopy.eave),.04,'#a9b2a3');}
      addCollider({points:p,base:0,bottom:canopy.eave-.05,top:canopy.peak});
    }
    for(const p of g.canopyPosts){batchBeam(metal,absolute(p,floor),absolute(p,p.top),.04,'#aab3a3');addCollider({x:p.x,z:p.z,radius:.075,base:0,top:p.top});}
    for(const table of g.tables){
      const circle=Array.from({length:24},(_,i)=>({x:table.x+Math.cos(i*TAU/24)*table.radius,z:table.z+Math.sin(i*TAU/24)*table.radius}));polygon(metal,circle,floor+.75,'#b7bfb3');metal.box(table.x,floor+.37,table.z,.065,.74,.065,'#3c5048');addCollider({x:table.x,z:table.z,radius:table.radius,base:0,top:floor+.78});
      for(const p of table.chairs){const a=Math.atan2(-f.u.z,f.u.x)-p.angle;metal.box(p.x,floor+.46,p.z,.48,.045,.5,'#344943',a);const dx=Math.sin(a),dz=Math.cos(a);for(let j=0;j<3;j++)metal.box(p.x+dx*.23,floor+.63+j*.13,p.z+dz*.23,.48,.06,.035,'#344943',a);for(const x of [-.18,.18])for(const z of [-.18,.18]){const co=Math.cos(a),si=Math.sin(a);metal.box(p.x+x*co+z*si,floor+.23,p.z-x*si+z*co,.025,.46,.025,'#344943');}addCollider({x:p.x,z:p.z,radius:p.radius,base:0,top:floor+.96});}
    }
    const tree=g.tree,outer=Array.from({length:24},(_,i)=>({x:tree.x+Math.cos(i*TAU/24)*tree.planterRadius,z:tree.z+Math.sin(i*TAU/24)*tree.planterRadius}));polygon(ground,outer,floor+.16,'#534c3f');for(let i=0;i<outer.length;i++)wallPanel(metal,outer[i],outer[(i+1)%outer.length],floor,floor+.24,'#434f49');addCollider({x:tree.x,z:tree.z,radius:tree.planterRadius,base:0,top:floor+.25});
    const boards=canvasTexture(512,512,ctx=>{const random=rng(902);ctx.fillStyle='#ded8c4';ctx.fillRect(0,0,512,512);ctx.strokeStyle='#8f866b22';ctx.lineWidth=1;for(let i=0;i<160;i++){const y=random()*512,x=random()*512;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+40+random()*180,y+(random()-.5)*2);ctx.stroke();}});boards.wrapS=boards.wrapT=THREE.RepeatWrapping;boards.anisotropy=8;
    world.add(clad.mesh(style('#ffffff',{vertexColors:true,map:boards})),wood.mesh(style('#ffffff',{vertexColors:true,map:boards})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.3,roughness:.5})),glass.mesh(style('#ffffff',{vertexColors:true,roughness:.12,metalness:.45})),roof.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),ground.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),side:THREE.DoubleSide})));
  }

  function barkerEastWings(b){
    const g=barkerEastGeometry(b),brick=new Batch(),trim=new Batch(),glass=new Batch(),roof=new Batch(),steel=new Batch(),paving=new Batch(),bed=new Batch(),hedge=new Batch();
    for(const batch of [brick,trim,glass,roof])batch.base=g.base;
    for(const batch of [steel,paving,bed,hedge])batch.base=0;
    const ring=polygonArea(b.points)>0?b.points:[...b.points].reverse(),f=g.frame;
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],length=distance2(a,c),nx=(c.z-a.z)/length,nz=-(c.x-a.x)/length,east=nx*f.u.x+nz*f.u.z>.7,north=nx*f.v.x+nz*f.v.z<-.7;
      wallPanel(brick,a,c,-.2,2.45,'#945d49');wallPanel(brick,a,c,2.45,g.eave,'#c7b17a');
      for(const y of [2.43,5.02])wallPanel(trim,a,c,y,y+.105,'#82928c',.03);
      if(!g.main&&north)wallPanel(brick,a,c,2.45,g.eave,'#e3e1cf',.025,0,.29);
      if(!g.main&&east)wallPanel(brick,a,c,2.45,g.eave,'#e3e1cf',.025,.78,1);
      const bays=east?g.main?2:1:Math.max(1,Math.round(length/4.9));
      for(let j=0;j<bays;j++)for(const bottom of [3.05,5.6]){
        const mid=(j+.5)/bays,width=Math.min(1.65,length/bays*.48),lo=mid-width/2/length,hi=mid+width/2/length,top=bottom+1.35;
        wallPanel(trim,a,c,bottom-.06,top+.06,'#d4d9cd',.065,lo-.05/length,hi+.05/length);
        wallPanel(glass,a,c,bottom,top,'#405b60',.08,lo,hi);
        wallPanel(trim,a,c,bottom,top,'#8faaa5',.1,mid-.022/length,mid+.022/length);
        for(const y of [bottom+.42,bottom+.94])wallPanel(trim,a,c,y,y+.035,'#a6b9b0',.11,lo,hi);
        wallPanel(trim,a,c,bottom+.07,top-.06,'#c5cbb9',.095,lo,lo+.13/length);
      }
      if(east&&g.main)facadeCaption({...b,base:g.base},a,c,'BARKER APARTMENTS',3.8,2.68,'#697c73');
      wallPanel(trim,a,c,g.eave-.12,g.eave,'#d7dac8',.08);
    }
    shapedRoof(roof,g.roofPoints,g.roofHeight,'#c3644a');polygon(trim,g.roofPoints,g.eave-.12,'#dedfcf',[],true);
    for(let i=0;i<g.roofPoints.length;i++)wallPanel(trim,g.roofPoints[i],g.roofPoints[(i+1)%g.roofPoints.length],g.eave-.13,g.eave+.015,'#d5d7c4');
    // Procedural tile pattern; Street View supplies the red clay appearance,
    // never a copied image texture. Hip caps follow reconstructed roof ridges.
    const tileTexture=canvasTexture(256,256,ctx=>{const random=rng(36670);ctx.fillStyle='#d6d4c7';ctx.fillRect(0,0,256,256);for(let y=0;y<16;y++)for(let x=-1;x<9;x++){const v=190+Math.floor(random()*45);ctx.fillStyle=`rgb(${v},${v},${v})`;ctx.fillRect(x*32+(y%2)*16+1,y*16+1,30,14);ctx.fillStyle='#ffffff28';ctx.fillRect(x*32+(y%2)*16+3,y*16+2,3,12);}});tileTexture.wrapS=tileTexture.wrapT=THREE.RepeatWrapping;tileTexture.anisotropy=8;
    const ridge=g.ridge,cap=(a,c)=>batchPipe(roof,[a.x,g.roofHeight(a)+.025,a.z],[c.x,g.roofHeight(c)+.025,c.z],.055,'#b65740');cap(ridge[0],ridge[1]);
    for(const p of g.roofPoints){const nearest=distance2(p,ridge[0])<distance2(p,ridge[1])?ridge[0]:ridge[1];cap(p,nearest);}
    for(const [u,v]of g.main?[[-2,-2],[2,1.8]]:[[0,-2]]){const p=g.at(u,v),height=g.roofHeight(p);trim.box(p.x,height+.12,p.z,.22,.24,.22,'#e2e1d1');}
    addCollider({points:b.points,base:g.base,top:g.maximum});
    if(g.main){
      const s=g.stair,P=(u,v,y)=>{const p=g.at(u,v);return [p.x,y,p.z];},railSegment=(a,c,y)=>{for(const h of [.15,.3,.45,.72,1.02])batchPipe(steel,[a.x,y+h,a.z],[c.x,y+h,c.z],.022,'#a7b4af');const dx=c.x-a.x,dz=c.z-a.z,l=Math.hypot(dx,dz),u={x:dx/l,z:dz/l};addCollider({points:frameRectangle({x:(a.x+c.x)/2,z:(a.z+c.z)/2,u,v:{x:-u.z,z:u.x}},l,.045),base:0,bottom:y,top:y+1.04});};
      for(const part of [...g.galleries,...g.landings]){
        polygon(steel,part.points,part.height,'#9aa9a4');polygon(steel,part.points,part.height-.1,'#7c8e89',[],true);
        for(let i=0;i<part.points.length;i++)wallPanel(steel,part.points[i],part.points[(i+1)%part.points.length],part.height-.1,part.height,'#9aa8a2');
        groundPatches.push({...part,priority:true,minimumY:part.height-.24,heightAt:()=>part.height});addCollider({...part,base:0,bottom:part.height-.1,top:part.height,stepHeight:.36});
      }
      for(const tread of g.treads){polygon(steel,tread.points,tread.height,'#a0ada8');polygon(steel,tread.points,tread.height-.075,'#7f928b',[],true);for(let i=0;i<tread.points.length;i++)wallPanel(steel,tread.points[i],tread.points[(i+1)%tread.points.length],tread.height-.075,tread.height,'#98a9a2');groundPatches.push({...tread,priority:true,minimumY:tread.height-.24,heightAt:()=>tread.height});addCollider({points:tread.points,base:0,bottom:tread.height-.075,top:tread.height,stepHeight:.36});}
      for(const v of [s.v0,s.v1])for(let i=0;i<s.count;i++){
        const t=g.treads[i],u=t.u0,w=t.u1,y=t.height,z=g.treads[i+1]?.height??s.upper;
        for(const h of [.35,.7,1.03])batchPipe(steel,P(u,v,y+h),P(w,v,z+h),.025,'#aebbb4');
        if(i%4===0)batchPipe(steel,P(u,v,y),P(u,v,y+1.03),.035,'#9caea5');
        addCollider({points:frameRectangle(f,w-u,.045,(u+w)/2,v),base:0,bottom:y,top:z+1.05});
      }
      railSegment(g.at(-s.middleWidth/2,s.v0),g.at(s.middleWidth/2,s.v0),s.lower);
      for(const level of [s.lower,s.upper]){
        const gap=level===s.lower?[-.75,.75]:[3.8,5.5];
        for(let u=-5.4;u<5.4;u+=.6){const w=Math.min(5.4,u+.6);if((u+w)/2>gap[0]&&(u+w)/2<gap[1])continue;railSegment(g.at(u,-6.1),g.at(w,-6.1),level);}
        railSegment(g.at(-5.4,-6.1),g.at(-5.4,-4.6),level);
        if(level===s.lower)railSegment(g.at(5.4,-6.1),g.at(5.4,-4.6),level);else railSegment(g.at(5.4,-7.2),g.at(5.4,-4.6),level);
      }
      for(const u of [-5.4,5.4])for(const v of [-6.05,-4.5]){const p=g.at(u,v),low=terrainHeight(p.x,p.z);batchPipe(steel,[p.x,low,p.z],[p.x,s.canopy,p.z],.047,'#8faaa0');addCollider({x:p.x,z:p.z,radius:.05,base:0,bottom:low,top:s.canopy});}
      const canopy=frameRectangle(f,11.1,1.8,0,-5.3);polygon(steel,canopy,s.canopy,'#a7b4ac');polygon(steel,canopy,s.canopy-.08,'#85998e',[],true);
      for(let u=-5.5;u<5.6;u+=.18)batchBeam(steel,P(u,-6.2,s.canopy+.025),P(u,-4.4,s.canopy+.025),.026,'#c4ccc0');
      addCollider({points:canopy,base:0,bottom:s.canopy-.1,top:s.canopy+.05});
      for(const part of SOUTHERN_BARKER_PAVING){shapedRoof(paving,part.points,p=>terrainHeight(p.x,p.z)+.22,'#af9a83',part.holes);groundPatches.push({...part,heightAt:(x,z)=>terrainHeight(x,z)+.22});}
      for(const part of BARKER_EAST_HEDGES){
        shapedRoof(hedge,part.points,p=>terrainHeight(p.x,p.z)+.68,'#637b49',part.holes);
        for(const r of [part.points,...part.holes])for(let i=0;i<r.length;i++){const a=r[i],c=r[(i+1)%r.length],ya=terrainHeight(a.x,a.z),yc=terrainHeight(c.x,c.z);bed.quad([a.x,ya,a.z],[a.x,ya+.15,a.z],[c.x,yc+.15,c.z],[c.x,yc,c.z],'#9b6451');hedge.quad([a.x,ya+.15,a.z],[a.x,ya+.68,a.z],[c.x,yc+.68,c.z],[c.x,yc+.15,c.z],'#5c7546');}
        addCollider({...part,base:0,terrainOffset:.68});
      }
    }
    world.add(brick.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('brick'),bumpMap:surfaceTexture('brick'),bumpScale:.012})),trim.mesh(style('#ffffff',{vertexColors:true,roughness:.8})),glass.mesh(style('#ffffff',{vertexColors:true,metalness:.25,roughness:.22})),roof.mesh(style('#ffffff',{vertexColors:true,map:tileTexture,bumpMap:tileTexture,bumpScale:.012,side:THREE.DoubleSide})),steel.mesh(style('#ffffff',{vertexColors:true,metalness:.5,roughness:.45,side:THREE.DoubleSide})),paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving'),side:THREE.DoubleSide})),bed.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('brick')})),hedge.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('grass'),side:THREE.DoubleSide})));
  }

  function globeSculpture(){
    const root=globeGround()+GLOBE.supportLift;
    const copper=style('#ffffff',{vertexColors:true,metalness:.65,roughness:.5});
    const lattice=new THREE.Mesh(globeLatticeGeometry(),copper);lattice.position.set(GLOBE.x,root,GLOBE.z);lattice.castShadow=lattice.receiveShadow=true;world.add(lattice);
    const cup=new THREE.Mesh(globeCupGeometry(),style('#484d42',{metalness:.65,roughness:.52,side:THREE.DoubleSide}));cup.position.copy(lattice.position);cup.castShadow=cup.receiveShadow=true;world.add(cup);
    const soil=new Batch(),feet=new Batch(),lamps=new Batch(),glass=new Batch();for(const b of [soil,feet,lamps,glass])b.base=0;
    const ring=Array.from({length:48},(_,i)=>({x:GLOBE.x+Math.cos(i*TAU/48)*GLOBE.soilRadius,z:GLOBE.z+Math.sin(i*TAU/48)*GLOBE.soilRadius}));shapedRoof(soil,ring,p=>globeGround(p.x,p.z)+.025,'#796348');
    for(let i=0;i<4;i++){const a=i*TAU/4+Math.PI/4,x=GLOBE.x+Math.cos(a)*.28,z=GLOBE.z+Math.sin(a)*.28;batchPipe(feet,[x,globeGround(x,z)+.015,z],[x,root+.065,z],.055,'#43483e');}
    for(const p of GLOBE_LIGHTS){const y=globeGround(p.x,p.z)+.025;for(let j=0;j<16;j++){const a=j*TAU/16,b=(j+1)*TAU/16,at=(angle,r,h)=>[p.x+Math.cos(angle)*r,h,p.z+Math.sin(angle)*r];lamps.quad(at(a,.12,y),at(b,.12,y),at(b,.087,y+.012),at(a,.087,y+.012),'#657268');glass.triangle([p.x,y+.012,p.z],at(a,.087,y+.012),at(b,.087,y+.012),'#c2ccb6');}}
    world.add(soil.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('grass')}),false),feet.mesh(style('#ffffff',{vertexColors:true,metalness:.65,roughness:.5})),lamps.mesh(style('#ffffff',{vertexColors:true,metalness:.65,roughness:.4}),false),glass.mesh(style('#ffffff',{vertexColors:true,metalness:.3,roughness:.25,side:THREE.DoubleSide}),false));
    // Conservative spherical envelope collision prevents entering the artwork.
    addCollider({x:GLOBE.x,z:GLOBE.z,radius:GLOBE.diameter/2,base:0,bottom:globeGround(),top:root+GLOBE.diameter});
  }

  function chancellorsGarden(){
    const paving=new Batch(),lawn=new Batch(),soil=new Batch(),stone=new Batch(),brick=new Batch(),water=new Batch(),copper=new Batch();for(const batch of [paving,lawn,soil,stone,brick,water,copper])batch.base=0;
    for(const [key,batch,offset,color] of [['paving',paving,.22,'#b7a28a'],['lawns',lawn,.025,'#82956e'],['gardens',soil,.055,'#746b51']])for(const part of CHANCELLOR_MESH[key]){shapedRoof(batch,part.points,p=>demHeight(p.x,p.z)+offset,color,part.holes);groundPatches.push({...part,heightAt:(x,z)=>demHeight(x,z)+offset});}
    for(const part of CHANCELLOR_GARDENS)for(const ring of [part.points,...part.holes])for(let i=0;i<ring.length;i++){const a=ring[i],b=ring[(i+1)%ring.length],count=Math.ceil(distance2(a,b));for(let j=0;j<count;j++){const p={x:a.x+(b.x-a.x)*j/count,z:a.z+(b.z-a.z)*j/count},q={x:a.x+(b.x-a.x)*(j+1)/count,z:a.z+(b.z-a.z)*(j+1)/count},y=demHeight(p.x,p.z),z=demHeight(q.x,q.z);brick.quad([p.x,y+.04,p.z],[q.x,z+.04,q.z],[q.x,z+.17,q.z],[p.x,y+.17,p.z],'#96826a');}}
    const P=CHANCELLOR_POOL;polygon(stone,P.points,P.rimRL,'#c3bda6',P.holes);polygon(water,P.holes[0],P.waterRL,'#78978c');
    for(const ring of [P.points,P.holes[0]])for(let i=0;i<ring.length;i++){const a=ring[i],b=ring[(i+1)%ring.length];wallPanel(stone,a,b,P.baseRL,P.rimRL,'#b0a78c');wallPanel(stone,b,a,P.baseRL,P.rimRL,'#b0a78c');}
    const figurePoint=chancellorPoint(44.9,-11.7),F=OLD_NORTH_FRAME,angle=Math.atan2(-F.v.z,F.v.x),figure=new THREE.Mesh(fountainFigureGeometry(),style('#ffffff',{vertexColors:true,metalness:.7,roughness:.44}));figure.position.set(figurePoint.x,P.rimRL+.025,figurePoint.z);figure.rotation.y=angle;figure.castShadow=figure.receiveShadow=true;world.add(figure);
    stone.box(figurePoint.x,P.rimRL-.025,figurePoint.z,2.02,.1,.71,'#bbb199',angle);
    const figureFootprint=oldNorthRectangle(44.9-CHANCELLOR_ART.depth/2,44.9+CHANCELLOR_ART.depth/2,-11.7-CHANCELLOR_ART.width/2,-11.7+CHANCELLOR_ART.width/2);addCollider({points:figureFootprint,base:0,bottom:P.rimRL-.1,top:P.rimRL+.025+CHANCELLOR_ART.height});
    // The photographed shallow dish is an open bowl beside the figure. Exact
    // profile and water level are fitted; the sculpture is not a scanned mesh.
    const dish=chancellorPoint(44.23,-12.18),dishY=P.waterRL+.18;
    for(let i=0;i<24;i++){const a=i/24*TAU,b=(i+1)/24*TAU,at=(t,r,y)=>[dish.x+Math.cos(t)*r,y,dish.z+Math.sin(t)*r*.8];copper.quad(at(a,.1,dishY-.14),at(b,.1,dishY-.14),at(b,.46,dishY),at(a,.46,dishY),i%3?'#7b7865':'#96927a');}
    const dishWater=Array.from({length:24},(_,i)=>({x:dish.x+Math.cos(i/24*TAU)*.43,z:dish.z+Math.sin(i/24*TAU)*.344}));polygon(water,dishWater,dishY-.018,'#8caaa0');
    const shrubs=new THREE.InstancedMesh(new THREE.SphereGeometry(1,8,5),style('#ffffff',{map:surfaceTexture('grass'),roughness:.96}),CHANCELLOR_PLANTS.length),dummy=new THREE.Object3D(),color=new THREE.Color();
    for(let i=0;i<CHANCELLOR_PLANTS.length;i++){const p=CHANCELLOR_PLANTS[i];dummy.position.set(p.x,demHeight(p.x,p.z)+.055+p.height/2,p.z);dummy.rotation.set(0,i*2.37,0);dummy.scale.set(p.radius,p.height/2,p.radius);dummy.updateMatrix();shrubs.setMatrixAt(i,dummy.matrix);shrubs.setColorAt(i,color.set(['#62784f','#74865a','#556c49','#849265'][i%4]));}shrubs.castShadow=shrubs.receiveShadow=true;world.add(shrubs);
    world.add(paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('path-pebble'),bumpMap:surfaceTexture('path-pebble'),bumpScale:.012}),false),lawn.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('grass')}),false),soil.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('grass')}),false),stone.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('aggregate'),bumpMap:surfaceTexture('aggregate'),bumpScale:.012,side:THREE.DoubleSide})),brick.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('brick'),side:THREE.DoubleSide})),water.mesh(style('#ffffff',{vertexColors:true,metalness:.42,roughness:.12,transparent:true,opacity:.83}),false),copper.mesh(style('#ffffff',{vertexColors:true,metalness:.7,roughness:.37,side:THREE.DoubleSide})));
  }

  function oldMainNorthCourt(){
    const paving=new Batch(),green=new Batch(),glass=new Batch(),white=new Batch(),steel=new Batch(),bridge=new Batch(),wood=new Batch(),soil=new Batch(),blue=new Batch();
    for(const batch of [paving,green,glass,white,steel,bridge,wood,soil,blue])batch.base=0;
    const A=OLD_NORTH_ANNEX,B=OLD_NORTH_BRIDGE,F=OLD_NORTH_FRAME,angle=Math.atan2(-F.u.z,F.u.x);
    for(const part of OLD_NORTH_PAVING_MESH){shapedRoof(paving,part.points,p=>oldNorthPavingHeight(p.x,p.z),'#b8b6aa',part.holes);groundPatches.push({...part,heightAt:oldNorthPavingHeight});}
    for(const part of OLD_NORTH_ANNEX_PARTS){
      const ring=polygonArea(part.points)>0?part.points:[...part.points].reverse();polygon(green,part.points,A.roofRL,'#60796a',part.holes);
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],length=distance2(a,c);if(length<.03)continue;const nx=(c.z-a.z)/length,nz=-(c.x-a.x)/length,at=(t,y,off=.02)=>[a.x+(c.x-a.x)*t+nx*off,y,a.z+(c.z-a.z)*t+nz*off],bottom=Math.min(demHeight(a.x,a.z),demHeight(c.x,c.z))-.08;
        wallPanel(green,a,c,bottom,A.floorRL+.2,'#526c59');wallPanel(green,a,c,A.fasciaBottomRL,A.roofRL,'#386657');wallPanel(steel,a,c,A.roofRL-.06,A.roofRL+.035,'#3f5650',.025);
        const bays=Math.max(1,Math.round(length/1.6));for(let j=0;j<bays;j++){const l=j/bays,r=(j+1)/bays,local=oldNorthLocal({x:(a.x+c.x)/2,z:(a.z+c.z)/2}),doorBay=local.v>-.5&&local.v<6&&local.u>-50.5;
          wallPanel(glass,a,c,A.floorRL+.2,A.fasciaBottomRL-.06,doorBay?'#a4b4a6':'#809c90',.012,l+.025/length,r-.025/length);
          for(const t of [l,r])batchPipe(doorBay?white:green,at(t,A.floorRL+.15),at(t,A.fasciaBottomRL),.032,doorBay?'#d7d9c6':'#456655');
          for(const y of [A.floorRL+.18,A.fasciaBottomRL-.06])batchPipe(green,at(l,y),at(r,y),.034,'#36554c');
          if(doorBay){const mid=(l+r)/2;batchPipe(white,at(mid,A.floorRL+.18),at(mid,A.fasciaBottomRL-.06),.027,'#d1d7c1');batchPipe(steel,at(mid+.1/length,A.floorRL+1),at(mid+.1/length,A.floorRL+1.35),.016,'#aab9ab');}
        }
      }
      addCollider({...part,base:0,bottom:Math.min(...part.points.map(p=>demHeight(p.x,p.z)))-.1,top:A.roofRL+.035});
    }
    const centre={x:B.points.reduce((s,p)=>s+p.x,0)/4,z:B.points.reduce((s,p)=>s+p.z,0)/4},width=distance2(B.points[0],B.points[1]),depth=distance2(B.points[1],B.points[2]);
    bridge.box(centre.x,(B.bottomRL+B.roofRL)/2,centre.z,width,B.roofRL-B.bottomRL,depth,'#384748',angle);bridge.box(centre.x,B.roofRL+.04,centre.z,width+.16,.08,depth+.16,'#40514d',angle);
    for(const v of [-32.065,-28.285])for(let u=-51.75;u<-29;u+=.14){const p=oldNorthPoint(u,v);bridge.box(p.x,(B.floorRL+B.roofRL)/2,p.z,.035,B.roofRL-B.floorRL-.05,.025,u%1>.5?'#425253':'#303e42',angle);}
    for(const u of [-50,-45,-40,-35,-30]){const a=oldNorthPoint(u,-31.9),c=oldNorthPoint(u,-28.45);batchBeam(steel,[a.x,B.bottomRL-.03,a.z],[c.x,B.bottomRL-.03,c.z],.06,'#293c39');}
    for(const u of [-46,-39,-32]){const p=oldNorthPoint(u,-30.2);white.box(p.x,B.bottomRL-.025,p.z,1.1,.035,.14,'#d2d4bb',angle);}
    addCollider({...B,base:0,bottom:B.bottomRL-.08,top:B.roofRL+.08});
    const P=OLD_NORTH_PLANTER,local=oldNorthLocal(P),root=terrainHeight(P.x,P.z)+.22;
    shapedRoof(soil,P.holes[0],p=>terrainHeight(p.x,p.z)+.235,'#76674d');
    const board=(u,v,width,depth)=>{const p=oldNorthPoint(u,v);for(let j=0;j<4;j++)wood.box(p.x,root+.065+j*.11,p.z,width,.095,depth,j%2?'#77634c':'#866e52',angle);wood.box(p.x,root+P.height,p.z,width+.08,.08,depth+.08,'#9a8263',angle);};
    board(local.u,local.v-1.35,3.2,.5);board(local.u,local.v+1.35,3.2,.5);board(local.u-1.35,local.v,.5,2.2);board(local.u+1.35,local.v,.5,2.2);
    addCollider({points:P.points,holes:P.holes,base:0,bottom:root-.03,top:root+P.height+.04});
    for(const p of OLD_NORTH_POSTS){const y=terrainHeight(p.x,p.z)+.22;batchPipe(blue,[p.x,y,p.z],[p.x,y+p.height-.04,p.z],p.radius,'#375f68');for(let i=0;i<8;i++){const a=i*TAU/8,b=(i+1)*TAU/8;blue.triangle([p.x+Math.cos(a)*p.radius,y+p.height-.04,p.z+Math.sin(a)*p.radius],[p.x,y+p.height,p.z],[p.x+Math.cos(b)*p.radius,y+p.height-.04,p.z+Math.sin(b)*p.radius],'#4a7278');}addCollider({x:p.x,z:p.z,radius:p.radius,base:0,bottom:y,top:y+p.height});}
    const plaqueTexture=canvasTexture(512,512,ctx=>{ctx.fillStyle='#293b35';ctx.fillRect(0,0,512,512);ctx.fillStyle='#c7b36c';ctx.fillRect(0,0,512,72);ctx.fillStyle='#ececda';ctx.font='bold 52px sans-serif';ctx.fillText('Old Main',32,170);ctx.font='42px sans-serif';ctx.fillText('Building',32,230);ctx.font='bold 60px sans-serif';ctx.fillText('K15',32,350);}),plaquePoint=oldNorthPoint(-57.3,-31.8),plaque=new THREE.Mesh(new THREE.PlaneGeometry(.75,.8),new THREE.MeshBasicMaterial({map:plaqueTexture}));plaque.position.set(plaquePoint.x,terrainHeight(plaquePoint.x,plaquePoint.z)+1.55,plaquePoint.z);plaque.rotation.y=Math.atan2(-F.v.x,-F.v.z);world.add(plaque);
    const glazing=glass.mesh(style('#ffffff',{vertexColors:true,metalness:.6,roughness:.09,envMapIntensity:1.1}));world.add(glazing);medicalReflection(glazing,oldNorthPoint(-40,-15),31.4);
    const timber=canvasTexture(512,128,ctx=>{const random=rng(911);ctx.fillStyle='#c3bca8';ctx.fillRect(0,0,512,128);for(let i=0;i<90;i++){const y=random()*128;ctx.strokeStyle=i%2?'#ffffff20':'#655e4d50';ctx.lineWidth=.4+random()*.7;ctx.beginPath();ctx.moveTo(0,y);ctx.bezierCurveTo(150,y+random()*5,350,y-random()*5,512,y);ctx.stroke();}});timber.wrapS=timber.wrapT=THREE.RepeatWrapping;
    world.add(paving.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving'),bumpMap:surfaceTexture('paving'),bumpScale:.014}),false),green.mesh(style('#ffffff',{vertexColors:true,roughness:.73})),white.mesh(style('#ffffff',{vertexColors:true})),steel.mesh(style('#ffffff',{vertexColors:true,metalness:.45,roughness:.45})),bridge.mesh(style('#ffffff',{vertexColors:true,metalness:.28,roughness:.6})),wood.mesh(style('#ffffff',{vertexColors:true,map:timber,bumpMap:timber,bumpScale:.006})),soil.mesh(style('#ffffff',{vertexColors:true}),false),blue.mesh(style('#ffffff',{vertexColors:true,metalness:.3,roughness:.5})));
  }

  function oldMainLowerEntry(){
    const paving=new Batch(),concrete=new Batch(),brick=new Batch(),metal=new Batch(),door=new Batch();for(const batch of [paving,concrete,brick,metal,door])batch.base=0;
    const E=OLD_MAIN_ENTRY;
    for(const part of OLD_MAIN_ENTRY_FLOORS){
      const stair=part.height!==undefined,heightAt=(x,z)=>oldMainEntryFloorHeight(part,x,z);
      shapedRoof(stair?concrete:paving,part.points,p=>heightAt(p.x,p.z),stair?'#b8b6a6':'#aaa69a',part.holes);
      if(stair){for(let i=0;i<part.points.length;i++){const a=part.points[i],c=part.points[(i+1)%part.points.length];concrete.quad([a.x,E.lowerRL-.08,a.z],[a.x,part.height,a.z],[c.x,part.height,c.z],[c.x,E.lowerRL-.08,c.z],'#999d8c');}addCollider({...part,base:0,bottom:E.lowerRL-.09,top:part.height,stepHeight:.24});}
    }
    groundPatches.push(...oldMainEntryWalkingPatches(OLD_MAIN_ENTRY_FLOORS));
    const rack=OLD_MAIN_ENTRY_BIKES,atRack=(s,o,h)=>{const p=engineeringPoint(s,o);return [p.x,E.upperRL+h,p.z];};
    for(let i=0;i<rack.count;i++){const s=rack.s0+(i+.5)*(rack.s1-rack.s0)/rack.count;batchPipe(metal,atRack(s,rack.o0,.05),atRack(s,(rack.o0+rack.o1)/2,rack.height),.025,'#829793');batchPipe(metal,atRack(s,(rack.o0+rack.o1)/2,rack.height),atRack(s,rack.o1,.05),.025,'#829793');}
    batchPipe(metal,atRack(rack.s0,(rack.o0+rack.o1)/2,rack.height),atRack(rack.s1,(rack.o0+rack.o1)/2,rack.height),.025,'#8ca09a');addCollider({points:rack.points,base:0,bottom:E.upperRL,top:E.upperRL+rack.height});
    const facadeA=oldMainEastFacadePoint(-20,0),facadeB=oldMainEastFacadePoint(40,0);
    for(const part of OLD_MAIN_ENTRY_CUTOUT)for(const ring of [part.points,...part.holes])for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],length=distance2(a,c),count=Math.max(1,Math.ceil(length/.6));
      if(distance2({x:(a.x+c.x)/2,z:(a.z+c.z)/2},nearestOnSegment((a.x+c.x)/2,(a.z+c.z)/2,facadeA,facadeB))<.015)continue;
      for(let j=0;j<count;j++){const p={x:a.x+(c.x-a.x)*j/count,z:a.z+(c.z-a.z)*j/count},q={x:a.x+(c.x-a.x)*(j+1)/count,z:a.z+(c.z-a.z)*(j+1)/count},loP=oldMainEntryHeight(p.x,p.z)??demHeight(p.x,p.z),loQ=oldMainEntryHeight(q.x,q.z)??demHeight(q.x,q.z),hiP=Math.max(loP,demHeight(p.x,p.z)+.055),hiQ=Math.max(loQ,demHeight(q.x,q.z)+.055);
        brick.quad([p.x,loP-.05,p.z],[p.x,hiP,p.z],[q.x,hiQ,q.z],[q.x,loQ-.05,q.z],'#887d66');
        if(Math.max(hiP-loP,hiQ-loQ)>.35){const dx=q.x-p.x,dz=q.z-p.z,l=Math.hypot(dx,dz)||1,nx=-dz/l*.025,nz=dx/l*.025;addCollider({points:[{x:p.x+nx,z:p.z+nz},{x:q.x+nx,z:q.z+nz},{x:q.x-nx,z:q.z-nz},{x:p.x-nx,z:p.z-nz}],base:0,bottom:Math.min(loP,loQ)-.05,top:Math.max(hiP,hiQ)});}
      }
    }
    for(const side of [-1,1]){
      const at=(s,y)=>{const p=side<0?oldMainEastFacadePoint(s,.19):engineeringPoint(s,E.east-.18);return [p.x,y,p.z];};batchPipe(metal,at(E.flightStart-.4,E.lowerRL+.96),at(E.flightEnd+.35,E.upperRL+.96),.025,'#748783');
      for(let i=0;i<=4;i++){const t=i/4,s=E.flightStart+(E.flightEnd-E.flightStart)*t,h=E.lowerRL+(E.upperRL-E.lowerRL)*t;batchPipe(metal,at(s,h+.04),at(s,h+.96),.022,'#6c807c');}
    }
    const d=OLD_MAIN_LOWER_DOOR,a=oldMainEastFacadePoint(d.s0,.135),c=oldMainEastFacadePoint(d.s1,.135);
    wallPanel(door,a,c,d.bottom,d.top,'#c6c7b2');wallPanel(metal,a,c,d.bottom+.12,d.top-.12,'#465f58',.012,.08,.92);
    const point=(t,y)=>[a.x+(c.x-a.x)*t,y,a.z+(c.z-a.z)*t];for(const t of [.07,.5,.93])batchBeam(door,point(t,d.bottom+.05),point(t,d.top-.05),.026,'#d2d2bd');batchBeam(door,point(.07,d.bottom+.8),point(.93,d.bottom+.8),.026,'#c3cab5');batchBeam(metal,point(.57,d.bottom+.8),point(.57,d.bottom+1.12),.018,'#a8b7a9');
    const pavers=surfaceTexture('path-pavers');world.add(paving.mesh(style('#ffffff',{vertexColors:true,map:pavers,bumpMap:pavers,bumpScale:.009}),false),concrete.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),brick.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('brick')})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.4,roughness:.44})),door.mesh(style('#ffffff',{vertexColors:true,roughness:.65})));
  }

  function engineeringStreetscape(){
    const paving=new Batch(),soil=new Batch(),brick=new Batch(),steel=new Batch(),blue=new Batch(),plants=new Batch();
    for(const batch of [paving,soil,brick,steel,blue,plants])batch.base=0;
    const E=ENGINEERING_EDGE,F=ENGINEERING_FRAME,angle=Math.atan2(-F.north.z,F.north.x),absolute=(p,h)=>[p.x,demHeight(p.x,p.z)+h,p.z];
    for(const p of ENGINEERING_PAVING){shapedRoof(paving,p.points,q=>engineeringPavingHeight(q.x,q.z),'#aa9691',p.holes);groundPatches.push({...p,heightAt:(x,z)=>engineeringPavingHeight(x,z)});}
    for(const p of ENGINEERING_GARDENS)shapedRoof(soil,p.points,q=>demHeight(q.x,q.z)+E.soilOffset,'#7c7561',p.holes);
    for(const wall of ENGINEERING_WALLS){
      for(let s=wall.s0;s<wall.s1;s+=.8){const end=Math.min(s+.8,wall.s1),p=engineeringPoint((s+end)/2,wall.o),root=demHeight(p.x,p.z)+E.pavingOffset;
        const inside=engineeringPoint((s+end)/2,OLD_MAIN_ENTRY.east-.05),bottom=Math.min(root-.04,(oldMainEntryHeight(inside.x,inside.z)??root)-.08),top=root+wall.height;
        brick.box(p.x,(bottom+top)/2,p.z,end-s,top-bottom,wall.width,'#706255',angle);
        brick.box(p.x,root+wall.height+.03,p.z,end-s,.06,wall.width+.055,'#8b7c69',angle);
      }
      const at=(s,h)=>absolute(engineeringPoint(s,wall.o),E.pavingOffset+h);
      for(let s=wall.s0;s<wall.s1;s+=2.4){const end=Math.min(s+2.4,wall.s1);batchPipe(steel,at(s,wall.height+.04),at(s,E.railHeight),.024,'#697d7c');batchPipe(steel,at(s,E.railHeight),at(end,E.railHeight),.025,'#788e88');batchPipe(steel,at(s,.69),at(end,.69),.018,'#697c78');}
      batchPipe(steel,at(wall.s1,wall.height+.04),at(wall.s1,E.railHeight),.024,'#697d7c');
      const max=Math.max(...wall.points.map(p=>demHeight(p.x,p.z)))+E.pavingOffset+E.railHeight;
      addCollider({points:wall.points,base:0,bottom:OLD_MAIN_ENTRY.lowerRL-.12,top:max});
    }
    for(const p of ENGINEERING_BOLLARDS){const root=demHeight(p.x,p.z)+E.pavingOffset;if(blocked(p.x,p.z,null,p.radius+.05))continue;
      batchPipe(blue,[p.x,root,p.z],[p.x,root+p.height-.065,p.z],p.radius,'#256184');
      const sides=12,cap=(a,t)=>[p.x+Math.cos(a)*p.radius*Math.cos(t*Math.PI/2),root+p.height-.065+.065*Math.sin(t*Math.PI/2),p.z+Math.sin(a)*p.radius*Math.cos(t*Math.PI/2)];for(let j=0;j<3;j++)for(let i=0;i<sides;i++){const a=i*TAU/sides,b=(i+1)*TAU/sides;if(j===2)blue.triangle(cap(a,j/3),cap(a,1),cap(b,j/3),'#3a7695');else blue.quad(cap(a,j/3),cap(a,(j+1)/3),cap(b,(j+1)/3),cap(b,j/3),'#3a7695');}
      for(const h of [p.height-.11,p.height-.16]){let prev=[p.x+p.radius*1.025,root+h,p.z];for(let i=1;i<=12;i++){const a=i*TAU/12,next=[p.x+Math.cos(a)*p.radius*1.025,root+h,p.z+Math.sin(a)*p.radius*1.025];batchPipe(blue,prev,next,.008,'#284b61');prev=next;}}
      addCollider({x:p.x,z:p.z,radius:p.radius,base:0,bottom:root,top:root+p.height});
    }
    for(let i=0;i<ENGINEERING_PLANTS.length;i++){const p=ENGINEERING_PLANTS[i],root=demHeight(p.x,p.z)+E.soilOffset;
      for(const leaf of engineeringPlantLeaves(p,i)){const at=q=>[q.x,root+q.y,q.z];plants.quad(at(leaf.baseLeft),at(leaf.midLeft),at(leaf.midRight),at(leaf.baseRight),leaf.color);plants.triangle(at(leaf.midLeft),at(leaf.tip),at(leaf.midRight),leaf.color);}
    }
    const pavers=surfaceTexture('path-interlocking'),masonry=surfaceTexture('brick');
    world.add(paving.mesh(style('#ffffff',{vertexColors:true,map:pavers,bumpMap:pavers,bumpScale:.012}),false),soil.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('grass'),roughness:1}),false),brick.mesh(style('#ffffff',{vertexColors:true,map:masonry,bumpMap:masonry,bumpScale:.018})),steel.mesh(style('#ffffff',{vertexColors:true,metalness:.55,roughness:.44})),blue.mesh(style('#ffffff',{vertexColors:true,metalness:.3,roughness:.47})),plants.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.95})));
  }

  function southernDriveStreetscape(){
    const asphalt=new Batch(),brick=new Batch(),grass=new Batch(),soil=new Batch(),kerb=new Batch(),paint=new Batch(),steel=new Batch(),green=new Batch(),flowers=new Batch(),blue=new Batch();
    for(const b of [asphalt,brick,grass,soil,kerb,paint,steel,green,flowers,blue])b.base=0;
    const absolute=(p,h)=>[p.x,terrainHeight(p.x,p.z)+h,p.z];
    const surface=(batch,parts,offset,color)=>{for(const p of parts){shapedRoof(batch,p.points,q=>terrainHeight(q.x,q.z)+offset,color,p.holes);groundPatches.push({...p,priority:true,heightAt:(x,z)=>terrainHeight(x,z)+offset});}};
    surface(asphalt,SOUTHERN_ROAD,.055,'#626763');surface(brick,SOUTHERN_PAVING,.22,'#a99480');surface(grass,SOUTHERN_GRASS,.015,'#889e6a');surface(soil,SOUTHERN_PLANTING,.18,'#696348');
    for(const p of SOUTHERN_STRIPES)shapedRoof(paint,p.points,q=>terrainHeight(q.x,q.z)+.06,'#e1e0cb',p.holes);
    // Boundary faces follow DEM independently at each vertex. No kerb on the artificial scope cut.
    const onCut=(a,c)=>['x','z'].some(k=>[SOUTHERN_SCOPE[k==='x'?'minX':'minZ'],SOUTHERN_SCOPE[k==='x'?'maxX':'maxZ']].some(v=>Math.abs(a[k]-v)<1e-5&&Math.abs(c[k]-v)<1e-5));
    for(const part of SOUTHERN_ROAD)for(const r of [part.points,...part.holes])for(let i=0;i<r.length;i++){
      const a=r[i],c=r[(i+1)%r.length],length=distance2(a,c);if(length<.01||onCut(a,c))continue;
      const n={x:(c.z-a.z)/length*.14,z:-(c.x-a.x)/length*.14},count=Math.ceil(length/.6);
      for(let k=0;k<count;k++){const point=t=>({x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t}),p=point(k/count),q=point((k+1)/count),po={x:p.x+n.x,z:p.z+n.z},qo={x:q.x+n.x,z:q.z+n.z};kerb.quad(absolute(q,.055),absolute(q,.22),absolute(p,.22),absolute(p,.055),'#b7b7a5');kerb.quad(absolute(q,.22),absolute(qo,.22),absolute(po,.22),absolute(p,.22),'#c7c7b3');}
    }
    for(const p of SOUTHERN_HEDGES){shapedRoof(green,p.points,q=>terrainHeight(q.x,q.z)+.62,'#66804c',p.holes);for(const r of [p.points,...p.holes])for(let i=0;i<r.length;i++){const a=r[i],c=r[(i+1)%r.length];green.quad(absolute(a,.18),absolute(a,.62),absolute(c,.62),absolute(c,.18),'#5d7544');}addCollider({...p,base:0,terrainOffset:.62});}
    const distanceToSegment=(p,a,c)=>distance2(p,nearestOnSegment(p.x,p.z,a,c));
    const inPart=(p,part)=>inPolygon(p.x,p.z,part.points)&&!part.holes.some(r=>inPolygon(p.x,p.z,r));
    for(const part of SOUTHERN_MEDIAN){const e=extent(part.points);for(let x=e.minX+.25;x<e.maxX;x+=.43)for(let z=e.minZ+.25;z<e.maxZ;z+=.43){const p={x,z};if(!inPart(p,part)||part.points.some((a,i)=>distanceToSegment(p,a,part.points[(i+1)%part.points.length])<.23))continue;const edge=Math.min(...part.points.map((a,i)=>distanceToSegment(p,a,part.points[(i+1)%part.points.length]))),y=terrainHeight(x,z);green.box(x,y+.3,z,.35,.23,.34,'#6c8546');if(edge<.8)for(let j=0;j<3;j++){const a=j*Math.PI*2/3;flowers.box(x+Math.cos(a)*.1,y+.44+(j%2)*.025,z+Math.sin(a)*.1,.12,.07,.12,j%2?'#e4c944':'#e8d957');}}
    }
    const lamp=p=>{
      const y=terrainHeight(p.x,p.z),h=p.height,at=(u,v,dy)=>[p.x+SOUTHERN_FRAME.u.x*u+SOUTHERN_FRAME.v.x*v,y+dy,p.z+SOUTHERN_FRAME.u.z*u+SOUTHERN_FRAME.v.z*v];
      batchPipe(steel,at(0,0,.22),at(0,0,h-2.2),p.radius,'#b4bdb5');
      for(const side of [-1,1]){let prev=at(0,0,h-2.3);for(let j=1;j<=12;j++){const t=j/12,next=at(side*2.05*t,0,h-2.3+2.1*Math.sin(t*Math.PI/2));batchPipe(steel,prev,next,.047,'#aeb8b1');prev=next;}steel.box(prev[0],prev[1]-.035,prev[2],.55,.13,.28,'#8f9e96',Math.atan2(-SOUTHERN_FRAME.u.z,SOUTHERN_FRAME.u.x));}
      steel.box(p.x,y+.32,p.z,.23,.22,.23,'#929e96');addCollider({x:p.x,z:p.z,radius:p.radius,top:h});
    };
    lamp(SOUTHERN_FIXTURES.refugeLamp);
    if(SOUTHERN_MEDIAN[0]){const f=orientedFrame(SOUTHERN_MEDIAN[0].points,SOUTHERN_FRAME.v);for(const v of [-5,5])lamp({...framePoint(f,0,v),height:6.8,radius:.085});}
    for(const p of SOUTHERN_FIXTURES.bins){const y=terrainHeight(p.x,p.z),angle=Math.atan2(-SOUTHERN_FRAME.u.z,SOUTHERN_FRAME.u.x);green.box(p.x,y+.68,p.z,.55,.9,.5,'#54866b',angle);green.box(p.x,y+1.16,p.z,.62,.09,.57,'#81a28a',angle);steel.box(p.x,y+1.02,p.z,.28,.12,.52,'#344c43',angle);addCollider({x:p.x,z:p.z,radius:p.radius,top:1.22});}
    const b=SOUTHERN_FIXTURES.board,y=terrainHeight(b.x,b.z),angle=Math.atan2(-SOUTHERN_FRAME.u.z,SOUTHERN_FRAME.u.x);
    for(const u of [-.66,.66]){const p={x:b.x+SOUTHERN_FRAME.u.x*u,z:b.z+SOUTHERN_FRAME.u.z*u};batchPipe(blue,[p.x,y+.22,p.z],[p.x,y+2.28,p.z],.04,'#4b6c8b');addCollider({...p,radius:.04,top:2.3});}
    blue.box(b.x,y+1.55,b.z,1.42,1.3,.11,'#58778e',angle);
    const map=canvasTexture(512,512,(ctx,w,h)=>{ctx.fillStyle='#e6e4cb';ctx.fillRect(0,0,w,h);ctx.fillStyle='#36515b';ctx.font='bold 36px sans-serif';ctx.fillText('UNSW',30,50);ctx.font='19px sans-serif';ctx.fillText('Southern Drive',30,82);ctx.fillStyle='#9caf84';for(const r of [[36,130,140,90],[230,120,200,110],[40,270,150,170],[250,300,180,140]])ctx.fillRect(...r);ctx.strokeStyle='#d0ae80';ctx.lineWidth=23;ctx.beginPath();ctx.moveTo(215,110);ctx.lineTo(215,470);ctx.moveTo(10,250);ctx.lineTo(480,250);ctx.stroke();ctx.fillStyle='#b06047';ctx.beginPath();ctx.arc(215,250,10,0,Math.PI*2);ctx.fill();});
    for(const side of [-1,1]){const face=new THREE.Mesh(new THREE.PlaneGeometry(1.25,1.11),new THREE.MeshBasicMaterial({map}));face.position.set(b.x+SOUTHERN_FRAME.v.x*.063*side,y+1.55,b.z+SOUTHERN_FRAME.v.z*.063*side);face.rotation.y=angle+(side<0?Math.PI:0);world.add(face);}
    addCollider({x:b.x,z:b.z,radius:.35,top:2.3});
    const pavers=canvasTexture(512,512,ctx=>{const random=rng(143);ctx.fillStyle='#9c9b89';ctx.fillRect(0,0,512,512);for(let x=-2;x<18;x++)for(let y=-2;y<18;y++){const phase=((x+y)%4+4)%4;if(phase!==0&&phase!==2)continue;ctx.fillStyle=`hsl(${29+random()*9} ${10+random()*10}% ${65+random()*12}%)`;ctx.fillRect(x*32+1,y*32+1,phase===0?62:30,phase===0?30:62);}});pavers.wrapS=pavers.wrapT=THREE.RepeatWrapping;
    world.add(asphalt.mesh(style('#ffffff',{vertexColors:true}),false),brick.mesh(style('#ffffff',{vertexColors:true,map:pavers,bumpMap:pavers,bumpScale:.009}),false),grass.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('grass')}),false),soil.mesh(style('#ffffff',{vertexColors:true}),false),kerb.mesh(style('#ffffff',{vertexColors:true})),paint.mesh(style('#ffffff',{vertexColors:true}),false),steel.mesh(style('#ffffff',{vertexColors:true,metalness:.5,roughness:.45})),green.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('grass')})),flowers.mesh(style('#ffffff',{vertexColors:true})),blue.mesh(style('#ffffff',{vertexColors:true,metalness:.3})));
  }

  function repositoryBuildings(b){
    const g=repositoryGeometry(b),walls=new Batch(),metal=new Batch(),roof=new Batch(),vents=new Batch(),floor=new Batch();
    for(const batch of [walls,metal,roof,vents])batch.base=g.base;floor.base=0;
    const ring=polygonArea(b.points)>0?b.points:[...b.points].reverse(),f=g.frame,angle=Math.atan2(-f.u.z,f.u.x);
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],length=distance2(a,c);if(length<.04)continue;
      const ya=g.roofHeight(a),yc=g.roofHeight(c),top=g.isMain?6.4:g.isAnnex?null:3.8;
      walls.quad([a.x,-.15,a.z],[a.x,top??ya,a.z],[c.x,top??yc,c.z],[c.x,-.15,c.z],g.isMain?'#b7b5a2':'#c4c6b5');
      // Fine joints are simplified service cladding, not invented room windows.
      const nx=(c.z-a.z)/length,nz=-(c.x-a.x)/length,pitch=g.isMain?2.4:.19;
      for(let d=pitch/2;d<length;d+=pitch){const t=d/length,p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t},hi=(top??(ya+(yc-ya)*t))-.12;wallPanel(metal,a,c,.15,hi,g.isMain?'#9fa697':'#a8b3a6',.025,t-.013/length,t+.013/length);}
      const cap=top??null;
      metal.quad([a.x+nx*.025,(cap??ya)-.16,a.z+nz*.025],[a.x+nx*.025,(cap??ya)+.015,a.z+nz*.025],[c.x+nx*.025,(cap??yc)+.015,c.z+nz*.025],[c.x+nx*.025,(cap??yc)-.16,c.z+nz*.025],g.isMain?'#d4d3c0':'#48615a');
      if(length>4){const t=.22,p={x:a.x+(c.x-a.x)*t+nx*.06,z:a.z+(c.z-a.z)*t+nz*.06},hi=(top??(ya+(yc-ya)*t))-.15;batchPipe(metal,[p.x,.12,p.z],[p.x,hi,p.z],.044,'#819286');}
      // A small closed service door is an estimated facade detail. Its
      // position is not asserted by the partially screened panorama.
      const south=nx*f.v.x+nz*f.v.z>.7;
      if(south&&length>5){const lo=.56,hi=lo+Math.min(1.1/length,.26);wallPanel(vents,a,c,.08,2.25,'#606f65',.045,lo,hi);wallPanel(metal,a,c,2.25,2.31,'#b8c3af',.065,lo,hi);for(const t of [lo,hi])wallPanel(metal,a,c,.08,2.31,'#b8c3af',.065,t-.023/length,t+.023/length);}
    }
    const plane=p=>g.isMain?6.24:g.isAnnex?g.roofHeight(p):3.5;
    shapedRoof(roof,b.points,plane,g.isMain?'#726e5d':'#c8cec0');
    if(!g.isAnnex){for(let i=0;i<ring.length;i++)wallPanel(walls,ring[i],ring[(i+1)%ring.length],g.isMain?6.23:3.49,g.isMain?6.4:3.8,'#d1d2bf',-.13);}
    if(g.isAnnex){
      const inside=(p)=>inPolygon(p.x,p.z,b.points);for(let u=-f.width/2+.2;u<f.width/2;u+=.18){const a=g.at(u,-f.length/2),c=g.at(u,f.length/2);if(!inside(g.at(u,0)))continue;batchBeam(metal,[a.x,g.roofHeight(a)+.018,a.z],[c.x,g.roofHeight(c)+.018,c.z],.018,'#aab9ac');}
    }
    for(const vent of g.vents){
      const p=vent.points,low=6.25,shoulder=6.94,peak=7.15;
      for(let i=0;i<p.length;i++)wallPanel(vents,p[i],p[(i+1)%p.length],low,shoulder,'#7d8b7d');
      for(const y of [6.36,6.48,6.6,6.72,6.84])for(let i=0;i<p.length;i++)wallPanel(metal,p[i],p[(i+1)%p.length],y,y+.032,'#adb8aa',.02);
      const centre=[vent.x,peak,vent.z];for(let i=0;i<p.length;i++){const a=p[i],c=p[(i+1)%p.length];metal.triangle([a.x,shoulder,a.z],centre,[c.x,shoulder,c.z],'#d6d9cb');}
      addCollider({points:p,base:g.base,bottom:low,top:peak});
    }
    addCollider({points:b.points,base:g.base,top:g.maximum});
    if(g.isMain)for(const part of REPOSITORY_PAVING){shapedRoof(floor,part.points,p=>terrainHeight(p.x,p.z)+.055,'#737a70',part.holes);groundPatches.push({...part,heightAt:(x,z)=>terrainHeight(x,z)+.055});}
    world.add(walls.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.28,roughness:.64,side:THREE.DoubleSide})),vents.mesh(style('#ffffff',{vertexColors:true,roughness:.7})),roof.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture(g.isMain?'asphalt':'concrete'),side:THREE.DoubleSide})),floor.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('asphalt'),side:THREE.DoubleSide})));
  }

  function morvenSpiral(b){
    const g=spiralGeometry(),concrete=new Batch(),floor=new Batch(),blue=new Batch(),silver=new Batch(),ochre=new Batch(),glass=new Batch();
    for(const batch of [concrete,floor,blue,silver,ochre,glass])batch.base=0;
    const underside=(points,y)=>polygon(concrete,points,y,'#d2d1bc',[],true);
    for(const part of SPIRAL_PAVING){shapedRoof(floor,part.points,p=>terrainHeight(p.x,p.z)+.22,'#b6b5a9',part.holes);groundPatches.push({...part,heightAt:(x,z)=>terrainHeight(x,z)+.22});}
    for(const part of [...SPIRAL_DECKS,...SPIRAL_LANDINGS]){
      polygon(floor,part.points,g.upper,'#bfc2b6',part.holes);polygon(concrete,part.points,g.upper-.22,'#d4d4c2',part.holes,true);
      const ring=polygonArea(part.points)>0?part.points:[...part.points].reverse();
      for(let i=0;i<ring.length;i++)wallPanel(concrete,ring[i],ring[(i+1)%ring.length],g.upper-.22,g.upper,'#d5d4bf');
      addCollider({...part,base:0,bottom:g.upper-.22,top:g.upper,stepHeight:.27});
      groundPatches.push({...part,minimumY:g.upper-.24,priority:true,heightAt:()=>g.upper});
    }
    for(const tread of SPIRAL_TREADS){
      polygon(floor,tread.points,tread.height,'#b7b5a6');underside(tread.points,tread.height-.18);
      const ring=polygonArea(tread.points)>0?tread.points:[...tread.points].reverse();
      for(let i=0;i<ring.length;i++)wallPanel(concrete,ring[i],ring[(i+1)%ring.length],tread.height-.18,tread.height,'#d6d2bd');
      addCollider({points:tread.points,base:0,bottom:tread.height-.18,top:tread.height,stepHeight:.34});
      groundPatches.push({points:tread.points,minimumY:tread.height-.24,priority:true,heightAt:()=>tread.height});
    }
    const s=SPIRAL_STAIRS;
    for(const radius of [s.inner,s.outer])for(let i=0;i<s.count;i++){
      const a=s.start+(s.end-s.start)*i/s.count,c=s.start+(s.end-s.start)*(i+1)/s.count,p=spiralPoint(a,radius),q=spiralPoint(c,radius),py=g.floor+s.rise*i/s.count,qy=g.floor+s.rise*(i+1)/s.count;
      batchPipe(blue,[p.x,py+.84,p.z],[q.x,qy+.84,q.z],.025,'#294d70');
      batchPipe(silver,[p.x,py+1.02,p.z],[q.x,qy+1.02,q.z],.026,'#c3cbc5');
      for(let j=0;j<3;j++){const t=j/3,angle=a+(c-a)*t,r=spiralPoint(angle,radius),y=py+(qy-py)*t;batchPipe(blue,[r.x,y+.03,r.z],[r.x,y+.86,r.z],.014,'#244e74');}
      if(i%3===0){batchPipe(blue,[p.x,py,p.z],[p.x,py+1.02,p.z],.033,'#28577b');addCollider({x:p.x,z:p.z,radius:.035,base:0,bottom:py,top:py+1.02});}
    }
    const rail=(a,c,radius)=>{
      const p=spiralPoint(a,radius),q=spiralPoint(c,radius),middle=spiralPoint((a+c)/2,radius);
      if(!inSpiralSource(middle.x,middle.z)||inPolygon(middle.x,middle.z,g.room))return;
      for(const y of [.85,1.02])batchPipe(y===1.02?silver:blue,[p.x,g.upper+y,p.z],[q.x,g.upper+y,q.z],y===1.02?.025:.023,y===1.02?'#c8cdc3':'#285577');
      for(let j=0;j<3;j++){const r=spiralPoint(a+(c-a)*j/3,radius);batchPipe(blue,[r.x,g.upper+.02,r.z],[r.x,g.upper+.86,r.z],.014,'#254e70');}
      batchPipe(blue,[p.x,g.upper,p.z],[p.x,g.upper+1.02,p.z],.03,'#28577b');
      const length=distance2(p,q),u={x:(q.x-p.x)/length,z:(q.z-p.z)/length},f={x:(p.x+q.x)/2,z:(p.z+q.z)/2,u,v:{x:-u.z,z:u.x}};
      addCollider({points:frameRectangle(f,length,.055),base:0,bottom:g.upper,top:g.upper+1.02});
    };
    for(let i=0;i<96;i++){
      const a=i/96*TAU,c=(i+1)/96*TAU,mid=(a+c)/2;
      rail(a,c,7.46);
      if(mid<s.end-.07||mid>s.end+.28)rail(a,c,5.62);
    }
    for(const column of g.columns){
      batchPipe(ochre,[column.x,g.floor,column.z],[column.x,g.upper-.22,column.z],column.radius,'#cd8c42');
      addCollider({x:column.x,z:column.z,radius:column.radius,base:0,bottom:g.floor,top:g.upper-.2});
    }
    const room=polygonArea(g.room)>0?g.room:[...g.room].reverse(),front=[];
    for(let i=0;i<room.length;i++){
      const a=room[i],c=room[(i+1)%room.length],length=distance2(a,c);if(length<.1)continue;
      const normal={x:(c.z-a.z)/length,z:-(c.x-a.x)/length},south=normal.x*g.frame.v.x+normal.z*g.frame.v.z>.7;
      wallPanel(ochre,a,c,g.floor-.25,g.roof,'#c6b48b');
      const bays=Math.max(1,Math.round(length/2.8));
      for(let j=0;j<bays;j++)for(const [bottom,top]of [[g.floor+.15,g.floor+2.6],[g.upper+.3,g.roof-.5]]){
        const lo=(j+.06)/bays,hi=(j+.94)/bays;
        wallPanel(glass,a,c,bottom,top,'#506b69',.07,lo,hi);
        for(const y of [bottom,top-.045])wallPanel(silver,a,c,y,y+.045,'#bbc5b9',.13,lo,hi);
        for(let k=0;k<=2;k++){const t=lo+(hi-lo)*k/2;wallPanel(silver,a,c,bottom,top,'#adbdb4',.14,t-.025/length,t+.025/length);}
      }
      wallPanel(concrete,a,c,g.roof-.18,g.roof,'#cbd1c0',.16);
      if(south)front.push({a,c,length});
    }
    polygon(concrete,g.room,g.roof,'#aeb9aa');
    addCollider({points:g.room,base:0,bottom:g.floor-.25,top:g.roof});
    const shop=front.sort((a,b)=>b.length-a.length)[0];
    if(shop)facadeCaption({...b,base:0},shop.a,shop.c,'THE GRAD SHOP',Math.min(7,shop.length*.8),g.floor+2.88,'#534c32');
    // The coarse source terrain is retained as data. Exposed edges of the
    // bounded lower passage get simple retaining faces rather than torn DEM.
    for(const part of SPIRAL_GROUND_CUTOUT)for(const ring of [part.points,...part.holes])for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],length=distance2(a,c),nx=(c.z-a.z)/length,nz=-(c.x-a.x)/length,n=Math.max(1,Math.ceil(length/.6));
      for(let j=0;j<n;j++){
        const p={x:a.x+(c.x-a.x)*j/n,z:a.z+(c.z-a.z)*j/n},q={x:a.x+(c.x-a.x)*(j+1)/n,z:a.z+(c.z-a.z)*(j+1)/n};
        const inside=p=>terrainHeight(p.x-nx*.04,p.z-nz*.04)+.22,outside=p=>demHeight(p.x+nx*.04,p.z+nz*.04)-.08,py=inside(p),qy=inside(q),po=outside(p),qo=outside(q);
        if(Math.max(Math.abs(py-po),Math.abs(qy-qo))<.1)continue;
        concrete.quad([p.x,Math.min(py,po),p.z],[p.x,Math.max(py,po),p.z],[q.x,Math.max(qy,qo),q.z],[q.x,Math.min(qy,qo),q.z],'#b9b3a0');
      }
    }
    world.add(concrete.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),side:THREE.DoubleSide})),floor.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving'),side:THREE.DoubleSide})),blue.mesh(style('#ffffff',{vertexColors:true,metalness:.5,roughness:.45})),silver.mesh(style('#ffffff',{vertexColors:true,metalness:.6,roughness:.32})),ochre.mesh(style('#ffffff',{vertexColors:true,roughness:.8})),glass.mesh(style('#ffffff',{vertexColors:true,metalness:.2,roughness:.2})));
  }

  function nidaSchool(b){
    const g=nidaSchoolGeometry(b),f=g.frame,brick=new Batch(),metal=new Batch(),glass=new Batch(),roof=new Batch(),soffit=new Batch(),floor=new Batch(),wood=new Batch();
    for(const batch of [brick,metal,glass,roof,soffit,floor,wood])batch.base=0;
    const parts=NIDA_SCHOOL_PARTS.filter(p=>p.sourceId===b.id),angle=Math.atan2(-f.u.z,f.u.x),columns=nidaSchoolColumns(NIDA_SCHOOL_PARTS).filter(p=>p.sourceId===b.id);
    for(const part of parts){
      const covered=['cover','gallery'].includes(part.kind),heightAt=p=>nidaSchoolRoofHeight(part,p),ring=polygonArea(part.points)>0?part.points:[...part.points].reverse();
      shapedRoof(roof,part.points,heightAt,part.kind==='hip'?'#a69a81':'#b8beb2',[...part.holes,...(part.lantern?[part.lantern]:[])]);
      if(covered){
        shapedRoof(soffit,part.points,p=>heightAt(p)-.18,'#c5c9b8',part.holes);
        addCollider({points:part.points,holes:part.holes,base:0,terrainBottom:3.17,terrainOffset:3.35});
      }else{
        for(let i=0;i<ring.length;i++){
          const a=ring[i],c=ring[(i+1)%ring.length],length=distance2(a,c);if(length<.1)continue;
          const normal={x:(c.z-a.z)/length,z:-(c.x-a.x)/length},east=normal.x*f.u.x+normal.z*f.u.z>.7;
          const eave=part.base+(part.kind==='hip'?4.7:6.1);
          wallPanel(brick,a,c,part.base-.05,eave,'#a78c65');
          // Short vertical brick piers / shadow reveals, with a restrained
          // lower window row on the street and tall glazing in the courts.
          const bays=Math.max(1,Math.round(length/(part.kind==='front'?3.3:3.0))),width=Math.min(2.25,length/bays*.65),frontStreet=part.kind==='front'&&east;
          for(let bay=0;bay<bays;bay++){
            const t=(bay+.5)/bays,lo=t-width/length/2,hi=t+width/length/2,p={x:a.x+(c.x-a.x)*t,z:a.z+(c.z-a.z)*t},ground=terrainHeight(p.x,p.z),bottom=Math.max(part.base+.7,ground+.5),top=Math.min(eave-.42,bottom+(frontStreet?1.2:2.25));
            if(top>bottom+.3){wallPanel(glass,a,c,bottom,top,'#435d58',.055,lo,hi);
              for(const y of [bottom,top-.055])wallPanel(metal,a,c,y,y+.055,'#c7c9b8',.11,lo,hi);
              for(let pane=0;pane<=3;pane++){const q=lo+(hi-lo)*pane/3;wallPanel(metal,a,c,bottom,top,'#b9c2b2',.12,q-.023/length,q+.023/length);}
              wallPanel(brick,a,c,bottom-.12,bottom-.04,'#c0aa83',.16,lo-.05/length,hi+.05/length);
            }
            if(frontStreet&&bay%2===0){const half=.09/length;wallPanel(glass,a,c,eave-1.4,eave-.45,'#48584d',.055,t-half,t+half);}
            if(bay<bays-1){const q=(bay+1)/bays;wallPanel(brick,a,c,part.base+.1,eave,'#aa8c61',.12,q-.11/length,q+.11/length);}
          }
        }
        addCollider({points:part.points,holes:part.holes,base:part.base,top:g.maximum});
      }
      for(let i=0;i<ring.length;i++){
        const a=ring[i],c=ring[(i+1)%ring.length],n=Math.max(1,Math.ceil(distance2(a,c)/.6));
        for(let j=0;j<n;j++){const p={x:a.x+(c.x-a.x)*j/n,z:a.z+(c.z-a.z)*j/n},q={x:a.x+(c.x-a.x)*(j+1)/n,z:a.z+(c.z-a.z)*(j+1)/n};
          metal.quad([p.x,heightAt(p)-.12,p.z],[p.x,heightAt(p),p.z],[q.x,heightAt(q),q.z],[q.x,heightAt(q)-.12,q.z],'#89988c');
        }
      }
      if(part.lantern){
        const ring=polygonArea(part.lantern)>0?part.lantern:[...part.lantern].reverse(),top=part.base+6.25;
        for(let i=0;i<ring.length;i++){
          const a=ring[i],c=ring[(i+1)%ring.length],length=distance2(a,c),bottom=Math.min(heightAt(a),heightAt(c));
          wallPanel(glass,a,c,bottom,top,'#7c9690');
          for(let j=0;j<=Math.ceil(length/.8);j++){const t=j/Math.ceil(length/.8);wallPanel(metal,a,c,bottom,top,'#c4c8b8',.035,t-.02/length,t+.02/length);}
        }
        polygon(roof,ring,part.base+6.4,'#b0b9a8');
        for(let i=0;i<ring.length;i++)wallPanel(metal,ring[i],ring[(i+1)%ring.length],top,part.base+6.4,'#b6bfaf');
      }
    }
    for(const column of columns){
      const y=terrainHeight(column.x,column.z)+.23;batchPipe(metal,[column.x,y,column.z],[column.x,terrainHeight(column.x,column.z)+column.height,column.z],column.radius,'#708d80');
      addCollider({x:column.x,z:column.z,radius:column.radius+.035,base:0,top:y+column.height});
    }
    if(b.id===NIDA_SCHOOL_ID){
      for(const {a,c,length,points}of nidaSchoolBoundarySegments(g.boundaryWall)){
        const nx=(c.z-a.z)/length,nz=-(c.x-a.x)/length,ay=terrainHeight(a.x,a.z)+.05,cy=terrainHeight(c.x,c.z)+.05;
        for(const side of [-1,1]){
          const p=[a.x+nx*.11*side,ay,a.z+nz*.11*side],q=[c.x+nx*.11*side,cy,c.z+nz*.11*side],topP=[p[0],ay+1.3,p[2]],topQ=[q[0],cy+1.3,q[2]];
          brick.quad(...(side>0?[p,topP,topQ,q]:[q,topQ,topP,p]),'#b39773',[[0,0],[0,.65],[length/2,.65],[length/2,0]]);
        }
        metal.quad([a.x-nx*.15,ay+1.32,a.z-nz*.15],[c.x-nx*.15,cy+1.32,c.z-nz*.15],[c.x+nx*.15,cy+1.32,c.z+nz*.15],[a.x+nx*.15,ay+1.32,a.z+nz*.15],'#b4a789');
        addCollider({points,base:0,terrainOffset:1.37});
      }
      for(const patch of NIDA_SCHOOL_PAVING){shapedRoof(floor,patch.points,p=>terrainHeight(p.x,p.z)+.23,'#b0a58d',patch.holes);groundPatches.push({...patch,heightAt:(x,z)=>terrainHeight(x,z)+.23});}
      for(const garden of NIDA_SCHOOL_GARDENS){shapedRoof(floor,garden.points,p=>terrainHeight(p.x,p.z)+.24,'#756b4c');const ring=garden.points;for(let i=0;i<ring.length;i++){const a=ring[i],c=ring[(i+1)%ring.length];brick.quad([a.x,terrainHeight(a.x,a.z)+.23,a.z],[a.x,terrainHeight(a.x,a.z)+.42,a.z],[c.x,terrainHeight(c.x,c.z)+.42,c.z],[c.x,terrainHeight(c.x,c.z)+.23,c.z],'#aa9068');}}
      for(const bench of g.benches){const y=terrainHeight(bench.x,bench.z)+.23;for(let i=0;i<5;i++){const p=g.at(bench.u,bench.v-.25+i*.125);wood.box(p.x,y+.46,p.z,bench.length,.06,.09,'#947e58',angle);}for(const u of [-.9,.9]){const p=g.at(bench.u+u,bench.v);metal.box(p.x,y+.23,p.z,.08,.46,.46,'#617c6d',angle);}addCollider({x:bench.x,z:bench.z,radius:1.32,base:0,top:y+.52});}
      // Folded pale courtyard shade, fitted from the aerial roof arrangement;
      // its precise fabric form / support coordinates remain reconstructed.
      shapedRoof(roof,g.canopy,g.canopyHeight,'#d5d6bf');shapedRoof(soffit,g.canopy,p=>g.canopyHeight(p)-.1,'#d2d4c0');
      for(let i=0;i<g.canopy.length;i++){const p=g.canopy[i],q=g.canopy[(i+1)%g.canopy.length],y=terrainHeight(p.x,p.z)+.23;batchPipe(metal,[p.x,y,p.z],[p.x,g.canopyHeight(p)-.12,p.z],.055,'#a9b8a9');batchPipe(metal,[p.x,g.canopyHeight(p)-.08,p.z],[q.x,g.canopyHeight(q)-.08,q.z],.055,'#a9b8a9');addCollider({x:p.x,z:p.z,radius:.085,base:0,top:g.canopyHeight(p)});}
      addCollider({points:g.canopy,base:0,terrainBottom:3.72,terrainOffset:4.65});
    }
    const brickTexture=surfaceTexture('brick').clone();brickTexture.repeat.set(1.6,1.6);
    world.add(brick.mesh(style('#ffffff',{vertexColors:true,map:brickTexture})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.4,roughness:.5,side:THREE.DoubleSide})),glass.mesh(style('#ffffff',{vertexColors:true,metalness:.22,roughness:.25,side:THREE.DoubleSide})),roof.mesh(style('#ffffff',{vertexColors:true,roughness:.9,side:THREE.DoubleSide})),soffit.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide})),floor.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('paving')})),wood.mesh(style('#ffffff',{vertexColors:true,roughness:.85})));
  }

  function regimentHall(b){
    const g=regimentHallGeometry(b),f=g.frame,wall=new Batch(),metal=new Batch(),glass=new Batch(),roof=new Batch(),ground=new Batch(),paint=new Batch();
    for(const batch of [wall,metal,glass,roof])batch.base=b.base;
    ground.base=paint.base=0;
    const at=(u,v,y)=>{const p=g.at(u,v);return[p.x,y,p.z];},angle=Math.atan2(-f.u.z,f.u.x);
    // Closed hall: windows / shutters sit above an opaque wall shell. Nothing
    // in the public photographs establishes its interiors or present access.
    const ring=polygonArea(b.points)>0?b.points:[...b.points].reverse();
    for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],length=distance2(a,c);if(length<.01)continue;
      wallPanel(wall,a,c,0,g.eave,'#c6c3ae');
      wallPanel(metal,a,c,g.eave-.15,g.eave,'#bbc2b7',.12);
      const n=Math.ceil(length/.6);
      for(let j=0;j<n;j++){const lo=j/n,hi=(j+1)/n,p={x:a.x+(c.x-a.x)*lo,z:a.z+(c.z-a.z)*lo},q={x:a.x+(c.x-a.x)*hi,z:a.z+(c.z-a.z)*hi};
        wall.quad([p.x,g.eave,p.z],[p.x,g.roofHeight(p),p.z],[q.x,g.roofHeight(q),q.z],[q.x,g.eave,q.z],'#c6c3ae');
      }
    }
    const eastSpan=(v0,v1,bottom,top,color,batch=metal,offset=.08)=>wallPanel(batch,...g.eastEdge(v0,v1),bottom,top,color,offset);
    for(const d of g.doors){
      const lo=d.v-d.width/2,hi=d.v+d.width/2;
      eastSpan(lo-.12,hi+.12,d.bottom-.05,d.top+.12,'#737e76');
      eastSpan(lo,hi,d.bottom,d.top,'#8fa39b',metal,.115);
      for(let y=d.bottom+.08;y<d.top;y+=.11)eastSpan(lo,hi,y,y+.015,'#748e86',metal,.13);
      for(const v of [lo-.1,hi+.1])eastSpan(v-.055,v+.055,.15,4.3,'#d1d0ba',metal,.18);
      eastSpan(lo,hi,.16,.24,'#707972',metal,.15);
      eastSpan(d.v-.24,d.v+.24,.95,1.02,'#485952',metal,.16);
    }
    const band=g.clerestory;
    eastSpan(band.v0,band.v1,band.bottom,band.top,'#3d5556',glass,.11);
    for(const y of [band.bottom,band.bottom+.4,band.top-.045])eastSpan(band.v0,band.v1,y,y+.045,'#c2c7b9',metal,.18);
    for(let i=0;i<=band.panes;i++){const v=band.v0+(band.v1-band.v0)*i/band.panes;eastSpan(v-.024,v+.024,band.bottom,band.top,'#c2c7b9',metal,.19);}
    for(const v of [-13.65,-7.0,-.85,5.3,7.8])eastSpan(v-.11,v+.11,.08,g.eave-.18,'#d4d0ba',metal,.24);
    // Narrow windows in the southern end / short office bay, rather than a
    // repeated two-row office facade across the roller-door hall.
    for(const u of [-4.2,4.2])for(const bottom of [1.1,3.7]){
      const [a,c]=g.southEdge(u-.48,u+.48),top=bottom+.85;
      wallPanel(glass,a,c,bottom,top,'#647875',.07);
      for(const y of [bottom,top-.045])wallPanel(metal,a,c,y,y+.045,'#d2d5c7',.12);
      for(let i=0;i<3;i++){const t=i/2;wallPanel(metal,a,c,bottom,top,'#c2c7b9',.13,t-.025,t+.025);}
    }
    for(const bottom of [1.1,3.7]){eastSpan(10.3,11.1,bottom,bottom+.85,'#647875',glass,.1);for(const v of [10.27,10.7,11.13])eastSpan(v-.025,v+.025,bottom,bottom+.85,'#c2c7b9',metal,.17);}
    for(const part of g.roofParts)shapedRoof(roof,part,g.roofHeight,'#d1d5c9');
    // Fine corrugation and sheet seams follow the actual roof slope.
    for(let v=-f.length/2+.12;v<f.length/2;v+=.19)for(const side of [-1,1]){
      const a=g.at(0,v),c=g.at(side*(g.half-.03),v);
      batchBeam(metal,[a.x,g.roofHeight(a)+.012,a.z],[c.x,g.roofHeight(c)+.012,c.z],.008,'#b9c1b6');
    }
    batchPipe(metal,at(0,-f.length/2,g.ridge+.025),at(0,f.length/2,g.ridge+.025),.045,'#e0e1d2');
    for(const side of [-1,1]){
      batchPipe(metal,at(side*(g.half+.09),-f.length/2,g.eave-.08),at(side*(g.half+.09),f.length/2,g.eave-.08),.075,'#8c9990');
      for(const v of [-13.3,7.8,13.3])batchPipe(metal,at(side*(g.half+.13),v,.1),at(side*(g.half+.13),v,g.eave-.09),.045,'#abb5a7');
    }
    // Small pale mushroom vents seen along the roof ridge; capped at the
    // retained estimated maximum rather than inventing a measured roof RL.
    for(const vent of g.vents){
      for(let i=0;i<12;i++){const a=i/12*TAU,c=(i+1)/12*TAU,r=vent.radius;
        const p=(t,rad,y)=>[vent.x+Math.cos(t)*rad,y,vent.z+Math.sin(t)*rad];
        metal.quad(p(a,.11,vent.bottom),p(a,.11,vent.top-.1),p(c,.11,vent.top-.1),p(c,.11,vent.bottom),'#b7c1b3');
        roof.quad(p(a,r,vent.top-.08),p(a,.08,vent.top),p(c,.08,vent.top),p(c,r,vent.top-.08),'#e0e1d3');
        roof.triangle([vent.x,vent.top,vent.z],p(c,.08,vent.top),p(a,.08,vent.top),'#e0e1d3');
      }
    }
    shapedRoof(ground,g.apron,p=>terrainHeight(p.x,p.z)+.06,'#717672');
    groundPatches.push({points:g.apron,heightAt:(x,z)=>terrainHeight(x,z)+.06});
    for(const hatch of g.hatches){
      const lo=g.half+.1,hi=g.half+4.3,v0=hatch.door.v-hatch.door.width/2,v1=hatch.door.v+hatch.door.width/2;
      const line=(a,c)=>{const n=Math.ceil(distance2(a,c)/.5);for(let i=0;i<n;i++){const p={x:a.x+(c.x-a.x)*i/n,z:a.z+(c.z-a.z)*i/n},q={x:a.x+(c.x-a.x)*(i+1)/n,z:a.z+(c.z-a.z)*(i+1)/n};batchBeam(paint,[p.x,terrainHeight(p.x,p.z)+.075,p.z],[q.x,terrainHeight(q.x,q.z)+.075,q.z],.035,'#c8b863');}};
      for(const v of [v0,v1])line(g.at(lo,v),g.at(hi,v));line(g.at(hi,v0),g.at(hi,v1));
      for(let v=v0-4.2;v<v1;v+=.85){const start=Math.max(v0,v),end=Math.min(v1,v+hi-lo);if(end>start)line(g.at(lo+start-v,start),g.at(lo+end-v,end));}
    }
    const pole=g.pole,y=terrainHeight(pole.x,pole.z),pmetal=new Batch();pmetal.base=0;
    batchPipe(pmetal,[pole.x,y,pole.z],[pole.x,y+pole.height,pole.z],pole.radius,'#c7cdc1');
    const a=g.at(pole.u-pole.yardarm/2,pole.v),c=g.at(pole.u+pole.yardarm/2,pole.v);
    batchPipe(pmetal,[a.x,y+pole.armHeight,a.z],[c.x,y+pole.armHeight,c.z],.045,'#b6c0b7');
    for(const p of [a,c])batchBeam(pmetal,[p.x,y+pole.armHeight,p.z],[pole.x,y+1.7,pole.z],.012,'#abae9f');
    pmetal.box(pole.x,y+.15,pole.z,.5,.3,.5,'#a8af9e',angle);
    addCollider({x:pole.x,z:pole.z,radius:.25,base:0,top:y+pole.height});
    addCollider({points:b.points,holes:b.holes||[],base:b.base,top:g.maximum});
    world.add(wall.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.35,roughness:.5})),glass.mesh(style('#ffffff',{vertexColors:true,metalness:.22,roughness:.25})),roof.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.82})),ground.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('asphalt')})),paint.mesh(style('#ffffff',{vertexColors:true})),pmetal.mesh(style('#ffffff',{vertexColors:true,metalness:.55,roughness:.38})));
  }

  function regimentBuilding(b,brick,glass,detail,roofs){
    const g=regimentGeometry(b),f=g.frame,pts=polygonArea(b.points)>0?b.points:[...b.points].reverse();
    for(let i=0;i<pts.length;i++){
      const a=pts[i],c=pts[(i+1)%pts.length],len=distance2(a,c);if(len<.2)continue;
      const normal={x:(c.z-a.z)/len,z:-(c.x-a.x)/len},south=normal.x*f.v.x+normal.z*f.v.z>.8;
      wallPanel(brick,a,c,0,g.eave,'#9a6344');wallPanel(detail,a,c,g.eave-.14,g.eave,'#cdd0c1',.09);
      const bays=south?g.southWindows:Math.max(1,Math.round(len/4.8)),width=south&&g.east?4.8:Math.min(3.0,len/bays*.65);
      for(let j=0;j<bays;j++){
        const centre=(j+.5)/bays,half=width/len/2,lo=centre-half,hi=centre+half;
        for(const row of [g.lower,g.upper]){
          const lower=row===g.lower,bottom=lower&&south&&g.east?.35:row.bottom,top=lower&&south&&g.east?2.65:row.top;
          wallPanel(glass,a,c,bottom,top,lower?'#344947':'#4c6666',.05,lo,hi);
          for(const y of [bottom,top-.045])wallPanel(detail,a,c,y,y+.045,'#d5d8c7',.11,lo,hi);
          for(let pane=0;pane<=3;pane++){const t=lo+(hi-lo)*pane/3;wallPanel(detail,a,c,bottom,top,'#d2d4c2',.12,t-.022/len,t+.022/len);}
          if(!lower)wallPanel(detail,a,c,bottom-.075,bottom,'#c4c9b9',.18,lo-.04/len,hi+.04/len);
        }
        if(south&&!g.east&&j<bays-1){const t=(j+1)/bays;wallPanel(brick,a,c,.12,g.eave-.15,'#a16b48',.1,t-.08/len,t+.08/len);}
      }
    }
    shapedRoof(roofs,b.points,g.roofHeight,'#9ba6a0',b.holes||[]);
    if(g.hood){
      polygon(detail,g.hood.points,g.hood.top,'#d4d5c4');polygon(detail,g.hood.points,g.hood.bottom,'#d8dacb',[],true);
      for(let i=0;i<g.hood.points.length;i++)wallPanel(detail,g.hood.points[i],g.hood.points[(i+1)%g.hood.points.length],g.hood.bottom,g.hood.top,'#c2c6b8');
      addCollider({points:g.hood.points,base:b.base,bottom:g.hood.bottom,top:g.hood.top});
    }else{
      const p=framePoint(f,-f.width/2+1.1,f.length/2+.22),angle=Math.atan2(-f.u.z,f.u.x);detail.box(p.x,.9,p.z,1.1,1.8,.35,'#c8cbbb',angle);
      for(const u of [-.35,.35]){const q=framePoint(f,-f.width/2+1.1+u,f.length/2+.41);detail.box(q.x,.9,q.z,.025,1.5,.025,'#a1aa9d',angle);}
    }
    addCollider({points:b.points,holes:b.holes||[],base:b.base,top:b.height});
  }

  function regimentStreetscape(){
    const metal=new Batch(),mesh=new Batch(),concrete=new Batch();for(const batch of [metal,mesh,concrete])batch.base=0;
    const [a,b]=REGIMENT_STREET.fence,len=distance2(a,b),dx=(b.x-a.x)/len,dz=(b.z-a.z)/len;
    const tex=canvasTexture(128,128,ctx=>{ctx.clearRect(0,0,128,128);ctx.strokeStyle='#ffffff';ctx.lineWidth=1;for(let x=-128;x<=256;x+=32){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+128,128);ctx.stroke();ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x-128,128);ctx.stroke();}});tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(2.5,2.5);tex.anisotropy=8;
    for(let d=0;d<len;d+=2.5){
      const end=Math.min(len,d+2.5),p={x:a.x+dx*d,z:a.z+dz*d},q={x:a.x+dx*end,z:a.z+dz*end},py=terrainHeight(p.x,p.z)+.08,qy=terrainHeight(q.x,q.z)+.08,h=REGIMENT_STREET.height;
      mesh.quad([p.x,py,p.z],[p.x,py+h,p.z],[q.x,qy+h,q.z],[q.x,qy,q.z],'#688c7b',[[d,0],[d,h],[end,h],[end,0]]);
      batchBeam(metal,[p.x,py,p.z],[p.x,py+h+.18,p.z],.045,'#6c8c7b');for(const y of [h,h+.15])batchBeam(metal,[p.x,py+y,p.z],[q.x,qy+y,q.z],.018,'#7a9588');
      const frame={x:(p.x+q.x)/2,z:(p.z+q.z)/2,u:{x:dx,z:dz},v:{x:-dz,z:dx}};
      addCollider({points:frameRectangle(frame,end-d,.12),base:0,terrainOffset:h+.25});
      // Low sloping concrete edge behind the fence; the bank itself is the DEM.
      const nx=dz,nz=-dx;concrete.quad([p.x,py,p.z],[p.x+nx*.4,py+.3,p.z+nz*.4],[q.x+nx*.4,qy+.3,q.z+nz*.4],[q.x,qy,q.z],'#a8afa0');
    }
    for(const p of REGIMENT_STREET.shrubs){const bush=new THREE.Mesh(new THREE.IcosahedronGeometry(p.radius,1),style('#657d4f'));bush.position.set(p.x,terrainHeight(p.x,p.z)+p.height/2,p.z);bush.scale.y=p.height/(p.radius*2);bush.castShadow=bush.receiveShadow=true;world.add(bush);}
    world.add(metal.mesh(style('#ffffff',{vertexColors:true,metalness:.3,roughness:.6})),mesh.mesh(style('#ffffff',{map:tex,vertexColors:true,alphaTest:.35,side:THREE.DoubleSide}),false),concrete.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),side:THREE.DoubleSide})));
  }

  function roundhouseEntrance(b){
    const g=roundhouseEntryGeometry(b),concrete=new Batch(),metal=new Batch(),ribs=new Batch();for(const batch of [concrete,metal,ribs])batch.base=0;
    for(const part of ROUNDHOUSE_CANOPY){
      shapedRoof(concrete,part.points,g.heightAt,'#c6c8bc',part.holes);
      shapedRoof(concrete,part.points,p=>g.heightAt(p)-g.thickness,'#dbdccc',part.holes);
      for(const ring of [part.points,...part.holes])for(let i=0;i<ring.length;i++){const a=ring[i],c=ring[(i+1)%ring.length];concrete.quad([a.x,g.heightAt(a)-g.thickness,a.z],[a.x,g.heightAt(a),a.z],[c.x,g.heightAt(c),c.z],[c.x,g.heightAt(c)-g.thickness,c.z],'#babfb5');}
      addCollider({points:part.points,holes:part.holes,base:0,bottom:Math.min(...part.points.map(g.heightAt))-g.thickness,top:Math.max(...part.points.map(g.heightAt))});
    }
    const circle=roundhouseGeometry(b);
    // Quiet panel joints on the concrete soffit, following the completed photo.
    for(let deg=138;deg<=166;deg+=4)for(let r=31.6;r<38.7;r+=.55){const a=circle.at(deg*Math.PI/180,r),c=circle.at(deg*Math.PI/180,Math.min(r+.55,38.7));batchBeam(concrete,[a.x,g.heightAt(a)-g.thickness-.008,a.z],[c.x,g.heightAt(c)-g.thickness-.008,c.z],.009,'#9ca69a');}
    for(const r of [32.5,35,37.5])for(let deg=136.5;deg<166.5;deg++){const a=circle.at(deg*Math.PI/180,r),c=circle.at((deg+1)*Math.PI/180,r);batchBeam(concrete,[a.x,g.heightAt(a)-g.thickness-.008,a.z],[c.x,g.heightAt(c)-g.thickness-.008,c.z],.009,'#9ca69a');}
    for(const p of g.columns){
      const bottom=terrainHeight(p.x,p.z)+.22,height=p.top-bottom;
      const core=new THREE.Mesh(new THREE.CylinderGeometry(p.radius*.9,p.radius,height,32),style('#564d3d',{metalness:.18,roughness:.65}));core.position.set(p.x,(bottom+p.top)/2,p.z);core.castShadow=core.receiveShadow=true;world.add(core);
      for(let i=0;i<36;i++){const a=i*TAU/36,r=p.radius+.025,topRadius=p.radius*.9+.025;batchBeam(ribs,[p.x+Math.cos(a)*r,bottom,p.z+Math.sin(a)*r],[p.x+Math.cos(a)*topRadius,p.top,p.z+Math.sin(a)*topRadius],.023,i%3?'#8b7960':'#b09d7c');}
      const cap=new THREE.Mesh(new THREE.CylinderGeometry(p.radius*1.13,p.radius*.95,.17,32),style('#b6bbaf'));cap.position.set(p.x,p.top-.025,p.z);cap.castShadow=true;world.add(cap);
      addCollider({x:p.x,z:p.z,radius:p.radius+.055,base:0,top:p.top});
      // Warm uplight apertures are geometry, avoiding extra real-time lights.
      const outward={x:Math.cos(p.angle),z:Math.sin(p.angle)};metal.box(p.x+outward.x*.75,bottom+.025,p.z+outward.z*.75,.22,.04,.22,'#e0bc73');
    }
    const s=g.screen,rotation=Math.PI/2-s.angle,normal={x:Math.cos(s.angle),z:Math.sin(s.angle)};
    metal.box(s.x,s.bottom+s.height/2,s.z,s.width+.16,s.height+.16,.15,'#344642',rotation);
    const texture=canvasTexture(768,432,(ctx,w,h)=>{ctx.fillStyle='#183b36';ctx.fillRect(0,0,w,h);ctx.fillStyle='#efeee2';ctx.beginPath();ctx.arc(w/2,h/2,h*.38,0,TAU);ctx.fill();ctx.fillStyle='#253b36';ctx.font='900 230px Arial Narrow, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('R',w/2,h/2+10);});
    const screen=new THREE.Mesh(new THREE.PlaneGeometry(s.width,s.height),new THREE.MeshBasicMaterial({map:texture}));screen.position.set(s.x+normal.x*.09,s.bottom+s.height/2,s.z+normal.z*.09);screen.rotation.y=rotation;world.add(screen);
    // Handles make the existing divided glazing read as a closed entrance.
    const main=roundhouseGeometry(b);for(const deg of [150,153,156]){const a=deg*Math.PI/180,r=main.radiusAt(a)*.947+.14,p=main.at(a,r),t={x:-Math.sin(a),z:Math.cos(a)};for(const side of [-.16,.16])batchBeam(metal,[p.x+t.x*side,b.base+.85,p.z+t.z*side],[p.x+t.x*side,b.base+1.45,p.z+t.z*side],.025,'#d0d7c8');}
    world.add(concrete.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,map:surfaceTexture('concrete'),bumpMap:surfaceTexture('concrete'),bumpScale:.012})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.3,roughness:.45})),ribs.mesh(style('#ffffff',{vertexColors:true,metalness:.25,roughness:.6})));
  }

  function roundhouseLandscape(){
    const stone=new Batch(),wood=new Batch(),metal=new Batch(),soil=new Batch();
    for(const batch of [stone,wood,metal,soil])batch.base=0;
    const t=ROUNDHOUSE_PLANE,outer=roundDisc(t,t.radius),inner=roundDisc(t,t.innerRadius),seatY=t.base+t.seatHeight;
    polygon(soil,inner,t.base+.31,'#51453a');
    // Low stone block ring with four concentric bands of timber seat slats.
    polygon(stone,outer,seatY-.09,'#a39378',[inner]);
    for(let i=0;i<64;i++){
      const a=outer[i],b=outer[(i+1)%64];stone.quad([a.x,terrainHeight(a.x,a.z)+.18,a.z],[a.x,seatY-.09,a.z],[b.x,seatY-.09,b.z],[b.x,terrainHeight(b.x,b.z)+.18,b.z],i%3?'#9d8d74':'#b3a187');
      const angle=(i+.5)*TAU/64;
      for(let j=0;j<4;j++){const r=t.innerRadius+.1+j*.18,p={x:t.x+Math.cos(angle)*r,z:t.z+Math.sin(angle)*r};wood.box(p.x,seatY,p.z,TAU*r/64-.025,.075,.15,'#796247',Math.PI/2-angle);}
      if(i%4===0){const r=t.radius-.06,x=t.x+Math.cos(angle)*r,z=t.z+Math.sin(angle)*r;metal.box(x,seatY+.29,z,.045,.67,.045,'#303b38');}
      // Back rails cover the outward eastern arc; the building-facing half is open.
      if(i<23||i>52){const r=t.radius-.06,aa=i*TAU/64,bb=(i+1)*TAU/64;for(const y of [seatY+.37,seatY+.62])batchBeam(metal,[t.x+Math.cos(aa)*r,y,t.z+Math.sin(aa)*r],[t.x+Math.cos(bb)*r,y,t.z+Math.sin(bb)*r],.045,'#303b38');}
    }
    addCollider({x:t.x,z:t.z,radius:t.radius,base:0,top:seatY+.08});
    const treeBranch=(a,b,r0,r1,color)=>{const d=new THREE.Vector3(b[0]-a[0],b[1]-a[1],b[2]-a[2]),mesh=new THREE.Mesh(new THREE.CylinderGeometry(r1,r0,d.length(),9),style(color,{map:surfaceTexture('bark')}));mesh.position.set((a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2);mesh.quaternion.setFromUnitVectors(UP,d.normalize());mesh.castShadow=mesh.receiveShadow=true;world.add(mesh);};
    treeBranch([t.x,t.base+.3,t.z],[t.x-.2,t.base+5.8,t.z],.85,.65,'#bfc1ab');
    const random=rng(619),crowns=[];
    for(let j=0;j<7;j++){const a=j*TAU/7+.4,mid=[t.x+Math.cos(a)*3,t.base+10+j%2,t.z+Math.sin(a)*3],tip=[t.x+Math.cos(a)*8,t.base+17+j%3,t.z+Math.sin(a)*8];treeBranch([t.x-.2,t.base+4.8,t.z],mid,.52,.26,j%2?'#b8baa4':'#d0d0b9');treeBranch(mid,tip,.26,.065,'#c8c9b4');crowns.push(tip);}
    const foliage=new THREE.InstancedMesh(new THREE.PlaneGeometry(1.9,1.9),style('#b7bf8f',{map:foliageTexture(),alphaTest:.42,side:THREE.DoubleSide}),280),dummy=new THREE.Object3D();
    foliage.castShadow=foliage.receiveShadow=true;
    for(let i=0;i<280;i++){const c=crowns[i%crowns.length],a=random()*TAU,r=Math.sqrt(random())*4;dummy.position.set(c[0]+Math.cos(a)*r,c[1]+(random()-.5)*4,c[2]+Math.sin(a)*r);dummy.rotation.set(random()*Math.PI,random()*TAU,random()*Math.PI);const size=1.1+random()*.8;dummy.scale.set(size,size,size);dummy.updateMatrix();foliage.setMatrixAt(i,dummy.matrix);foliage.setColorAt(i,new THREE.Color(['#8c9c63','#b0b684','#81945e','#a5af78'][i%4]));}world.add(foliage);
    for(const p of ROUNDHOUSE_GARDEN_SEATS){
      const angle=Math.PI/2-p.angle,dx=-Math.sin(p.angle),dz=Math.cos(p.angle),nx=Math.cos(p.angle),nz=Math.sin(p.angle),q={x:p.x+nx*1.5,z:p.z+nz*1.5};
      polygon(soil,roundDisc(p,.78,24),p.base+.12,'#5a5141');
      treeBranch([p.x,p.base,p.z],[p.x,p.base+3.2,p.z],.08,.045,'#a4a18b');
      for(let i=0;i<3;i++){const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(.85,1),style(['#6f8454','#80905c','#8b9c68'][i]));crown.position.set(p.x+(i-1)*.4,p.base+3.6+(i%2)*.4,p.z);crown.castShadow=true;world.add(crown);}
      // Timber backrest benches and small round pedestal tables seen in Arc's photo.
      for(let i=0;i<5;i++)wood.box(q.x+nx*(i-2)*.105,p.base+.46,q.z+nz*(i-2)*.105,2.25,.07,.085,'#7c6249',angle);
      for(let i=0;i<3;i++)wood.box(q.x+nx*.24,p.base+.74+i*.16,q.z+nz*.24,2.25,.11,.075,'#7c6249',angle);
      for(const side of [-.85,.85])metal.box(q.x+dx*side,p.base+.23,q.z+dz*side,.06,.46,.48,'#35433e',angle);
      const tab={x:q.x+dx*1.7,z:q.z+dz*1.7};polygon(metal,roundDisc(tab,.5,32),p.base+.74,'#65736a');metal.box(tab.x,p.base+.36,tab.z,.09,.72,.09,'#3d4c44');
      addCollider({points:frameRectangle({x:q.x,z:q.z,u:{x:dx,z:dz},v:{x:nx,z:nz}},2.4,.7),base:0,top:p.base+1.1});addCollider({x:tab.x,z:tab.z,radius:.5,base:0,top:p.base+.76});
      addCollider({x:p.x,z:p.z,radius:.13,base:0,top:p.base+p.height});
    }
    world.add(stone.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete')})),wood.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('bark')})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.3,roughness:.5})),soil.mesh(style('#ffffff',{vertexColors:true})));
  }

  function nearestPath(x,z) {
    let best={distance:Infinity};
    for(const path of paths) {
      const pts=validPoints(path);
      for(let i=0;i<pts.length-1;i++) {
        const q=nearestOnSegment(x,z,pts[i],pts[i+1]),d=Math.hypot(q.x-x,q.z-z);
        if(d<best.distance) best={...q,distance:d,path,a:pts[i],b:pts[i+1]};
      }
    }
    return best;
  }

  function catherineCourt(){
    const paving=new Batch(),soil=new Batch(),stone=new Batch(),wood=new Batch(),metal=new Batch();for(const b of [paving,soil,stone,wood,metal])b.base=0;
    const batches={paving,soil,curb:stone},P=CATHERINE_PATTERN;
    for(const tri of CATHERINE_MESH)batches[tri.kind].triangle(...tri.points.map(p=>[p.x,p.y,p.z]),'#ffffff',tri.points.map(catherineUV));
    for(const pit of CATHERINE_PITS)for(const part of pit.inner)for(const ring of [part.points,...part.holes])for(let i=0;i<ring.length;i++){
      const a=ring[i],c=ring[(i+1)%ring.length],y=terrainHeight(a.x,a.z),h=terrainHeight(c.x,c.z);stone.quad([a.x,y+P.soilOffset,a.z],[a.x,y+P.curbOffset,a.z],[c.x,h+P.curbOffset,c.z],[c.x,h+P.soilOffset,c.z],'#9da18f');
    }
    for(const b of CATHERINE_BENCHES){
      const at=(u,d,h)=>[b.x+b.t.x*u+b.n.x*d,b.floor+h,b.z+b.t.z*u+b.n.z*d],angle=Math.atan2(-b.t.z,b.t.x);
      for(let d=-.21;d<=.22;d+=.073){const p=at(0,d,b.seat);wood.box(p[0],p[1],p[2],b.width,.055,.059,'#ffffff',angle);}
      for(let k=0;k<5;k++){const h=.58+k*.066,d=-.23-(h-.54)*.15,p=at(0,d,h);wood.box(p[0],p[1],p[2],b.width,.052,.045,'#ece5d5',angle);}
      for(const u of [-.82,.82]){
        for(const d of [-.20,.20]){const bottom=at(u,d,0);bottom[1]=terrainHeight(bottom[0],bottom[2])+P.pavingOffset;batchPipe(metal,bottom,at(u,d,b.seat-.035),.025,'#35423c');}
        batchPipe(metal,at(u,-.20,b.seat-.035),at(u,-.285,b.back),.023,'#35423c');batchBeam(metal,at(u,-.24,b.seat-.035),at(u,.25,b.seat-.035),.028,'#35423c');
      }
      for(const u of [-1.04,1.04]){batchPipe(metal,at(u,.20,b.seat),at(u,.20,.68),.02,'#37443d');batchPipe(metal,at(u,.20,.68),at(u,-.25,.68),.025,'#37443d');}
      for(const surface of b.surfaces)addCollider({points:surface.points,base:0,bottom:surface.bottom,top:surface.height});
    }
    const tile=canvasTexture(1024,1024,(ctx,w,h)=>{
      const random=rng(2023),unit=w/P.grid*P.paverWidth;ctx.fillStyle='#74766c';ctx.fillRect(0,0,w,h);ctx.save();ctx.translate(w/2,h/2);ctx.rotate(Math.PI/4);
      for(let y=-65;y<=65;y++)for(let x=-65;x<=65;x++){const k=((x+y)%4+4)%4;if(k!==0&&k!==2)continue;const ww=(k===0?2:1)*unit,hh=(k===2?2:1)*unit;ctx.fillStyle=`hsl(${23+random()*6} ${18+random()*6}% ${38+random()*7}%)`;ctx.fillRect(x*unit+.65,y*unit+.65,ww-1.3,hh-1.3);for(let j=0;j<3;j++){ctx.fillStyle=j%2?'#ffffff0c':'#3e46390e';ctx.fillRect(x*unit+random()*ww,y*unit+random()*hh,random()*7+1,.7);}}
      ctx.restore();const band=w/P.grid*P.band/2;ctx.fillStyle='#9b9f94';for(const x of [0,w-band])ctx.fillRect(x,0,band,h);for(const y of [0,h-band])ctx.fillRect(0,y,w,band);ctx.strokeStyle='#7d827261';ctx.lineWidth=.8;for(let d=0;d<w;d+=unit*2){ctx.beginPath();ctx.moveTo(d,0);ctx.lineTo(d,band);ctx.moveTo(d,h-band);ctx.lineTo(d,h);ctx.moveTo(0,d);ctx.lineTo(band,d);ctx.moveTo(w-band,d);ctx.lineTo(w,d);ctx.stroke();}
    });tile.wrapS=tile.wrapT=THREE.RepeatWrapping;tile.anisotropy=8;
    const timber=canvasTexture(256,64,ctx=>{const random=rng(1977);ctx.fillStyle='#806044';ctx.fillRect(0,0,256,64);for(let y=0;y<64;y++){ctx.fillStyle=`hsla(${28+random()*5} 24% ${29+random()*20}% / .5)`;ctx.fillRect(0,y,256,.6+random()*.8);}});timber.wrapS=timber.wrapT=THREE.RepeatWrapping;timber.anisotropy=8;
    const earth=canvasTexture(128,128,ctx=>{const random=rng(1962);ctx.fillStyle='#60513b';ctx.fillRect(0,0,128,128);for(let i=0;i<1500;i++){ctx.fillStyle=i%3?'#90806955':'#302f2540';ctx.fillRect(random()*128,random()*128,1+random()*2,1+random()*2);}});earth.wrapS=earth.wrapT=THREE.RepeatWrapping;
    world.add(paving.mesh(style('#ffffff',{vertexColors:true,map:tile,bumpMap:tile,bumpScale:.009,roughness:.96}),false),soil.mesh(style('#ffffff',{vertexColors:true,map:earth,roughness:1}),false),stone.mesh(style('#b5b8ac',{vertexColors:true,map:surfaceTexture('concrete'),roughness:.95,side:THREE.DoubleSide}),false),wood.mesh(style('#ffffff',{vertexColors:true,map:timber,roughness:.87})),metal.mesh(style('#ffffff',{vertexColors:true,metalness:.3,roughness:.65})));
  }

  function courtyardLandscape(){
    const concrete=new Batch(),wood=new Batch(),plants=new Batch(),random=rng(907);
    for(const garden of greens.filter(g=>g.raisedBy)){
      const pts=validPoints(garden),ring=polygonArea(pts)<0?[...pts].reverse():pts,h=garden.raisedBy;
      let seatEdge=null,north=Infinity;
      for(let i=0;i<ring.length;i++){
        const a=ring[i],b=ring[(i+1)%ring.length],len=distance2(a,b),nx=(b.z-a.z)/len,nz=-(b.x-a.x)/len;
        // Low concrete retaining edge follows the mapped bed and sampled ground.
        wallPanel(concrete,a,b,.03,h,'#bfc4b6',.1);
        wallPanel(concrete,b,a,.03,h,'#bfc4b6',.1);
        const steps=Math.max(1,Math.ceil(len));
        for(let j=0;j<steps;j++){
          const t=j/steps,u=(j+1)/steps,p=(v,side)=>[a.x+(b.x-a.x)*v+nx*side,h+.025,a.z+(b.z-a.z)*v+nz*side];
          concrete.quad(p(t,-.1),p(u,-.1),p(u,.1),p(t,.1),'#d0d1c5');
        }
        if((a.z+b.z)/2<north){north=(a.z+b.z)/2;seatEdge={a,b,len,nx,nz};}
        for(let d=.6;d<len-.3;d+=1)for(const inset of [.4,.8,1.2,1.6]){
          const x=a.x+(b.x-a.x)*d/len-nx*inset,z=a.z+(b.z-a.z)*d/len-nz*inset;
          if(!inPolygon(x,z,ring))continue;
          for(let leaf=0;leaf<13;leaf++){
            const angle=leaf/13*TAU+random()*.3,length=.5+random()*.55,width=.018;
            const dx=Math.cos(angle),dz=Math.sin(angle),px=-dz*width,pz=dx*width;
            const left=[x+dx*.16+px,h+length*.75,z+dz*.16+pz],right=[x+dx*.16-px,h+length*.75,z+dz*.16-pz],shade=['#657b4f','#839262','#4e724d'][leaf%3];
            plants.quad([x+px*.3,h,z+pz*.3],left,right,[x-px*.3,h,z-pz*.3],shade);
            plants.triangle(left,[x+dx*length*.65,h+length,z+dz*length*.65],right,shade);
          }
        }
      }
      // Timber slats attached to the north planter edge, as in the panorama.
      if(seatEdge){
        const {a,b,len,nx,nz}=seatEdge,margin=Math.min(1.5,len*.15),along=d=>({x:a.x+(b.x-a.x)*d/len,z:a.z+(b.z-a.z)*d/len});
        const start=along(margin),end=along(len-margin);
        for(let slat=0;slat<5;slat++){
          const off=.16+slat*.085;
          ribbon(wood,[{x:start.x+nx*off,z:start.z+nz*off},{x:end.x+nx*off,z:end.z+nz*off}],.07,h+.05,'#816c55');
        }
      }
    }
    world.add(concrete.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('concrete'),bumpMap:surfaceTexture('concrete'),bumpScale:.02})));
    world.add(wood.mesh(style('#ffffff',{vertexColors:true})),plants.mesh(style('#ffffff',{vertexColors:true,side:THREE.DoubleSide,roughness:.95})));
  }

  function nearInventoryTree(p,radius){return forestTrees.some(t=>distance2(p,t)<radius);}

  function campusForest(){
    const groups=new Map();
    for(const record of TREE_INVENTORY){
      if(websterEntrySurface(record.x,record.z)!==undefined)continue;
      const t=inventoryTree(record),routes=surfaceCells.get(`${Math.floor(t.x/20)},${Math.floor(t.z/20)}`)||[];
      // Keep the source coordinate; conflicting old records are omitted, never silently moved.
      if(blocked(t.x,t.z,null,t.radius+.04)||!treeClearsRoutes(t,routes))continue;
      const root=bioStreetTreeRoot(t)??terrainHeight(t.x,t.z);
      if([...nearbyColliders(t.x,t.z,t.radius+.04)].some(c=>root+t.height>colliderBottom(c,t.x,t.z)+.03&&root<colliderTop(c,t.x,t.z)-.03&&(c.points?circleTouchesPolygon(t.x,t.z,t.radius+.04,c.points,c.holes):Math.hypot(c.x-t.x,c.z-t.z)<c.radius+t.radius+.04)))continue;
      if(landmarks.some(p=>distance2(t,p.walkPoint||p.position||p)<t.radius+.7))continue;
      if([...nearbyColliders(t.x,t.z,2)].some(c=>!c.points&&c.radius<=1.3&&c.top-c.bottom>3&&Math.hypot(c.x-t.x,c.z-t.z)<2))continue;
      if(greens.some(g=>/village|pitch|sport|field/i.test(`${g.kind} ${g.name} ${g.id}`)&&inPolygon(t.x,t.z,validPoints(g))))continue;
      forestTrees.push(t);addCollider({x:t.x,z:t.z,radius:t.radius,base:root,top:t.height});
      const key=`${Math.floor(t.x/80)},${Math.floor(t.z/80)},${foliageKind(t.botanicalName)}`;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(t);
    }
    const blossomTexture=canvasTexture(128,128,ctx=>{const random=rng(1959);for(let j=0;j<55;j++){const x=6+random()*116,y=6+random()*116;for(let k=0;k<5;k++){const a=k/5*TAU;ctx.fillStyle=['#b9a1ce','#a58bbb','#cab5d8'][j%3];ctx.beginPath();ctx.ellipse(x+Math.cos(a)*2.3,y+Math.sin(a)*2.3,1.8,2.8,a,0,TAU);ctx.fill();}ctx.fillStyle='#d9c8e4';ctx.fillRect(x-.7,y-.7,1.4,1.4);}}),blossomMaterial=style('#ffffff',{map:blossomTexture,alphaTest:.4,side:THREE.DoubleSide,roughness:.95});
    const woodMaterial=style('#ffffff',{map:surfaceTexture('bark')}),leafMaterials=new Map(),palmMaterial=style('#849b64',{side:THREE.DoubleSide,roughness:.94}),dummy=new THREE.Object3D(),color=new THREE.Color(),branchGeometry=new THREE.CylinderGeometry(.72,1,1,7),leafGeometry=new THREE.PlaneGeometry(1,1);
    for(const trees of groups.values()){
      const kind=foliageKind(trees[0].botanicalName);if(!leafMaterials.has(kind))leafMaterials.set(kind,style('#ffffff',{map:foliageTexture(kind),alphaTest:.42,side:THREE.DoubleSide,roughness:.94}));
      const forms=trees.map(t=>({tree:t,geometry:inventoryTreeGeometry(t)})),branchCount=forms.reduce((n,p)=>n+p.geometry.segments.length,0),leafCount=forms.reduce((n,p)=>n+p.geometry.leaves.length,0);
      const branches=new THREE.InstancedMesh(branchGeometry,woodMaterial,branchCount),leaves=new THREE.InstancedMesh(leafGeometry,leafMaterials.get(kind),leafCount),fronds=new Batch();fronds.base=0;
      let bi=0,li=0;
      for(const {tree:t,geometry:g} of forms){const base=bioStreetTreeRoot(t)??terrainHeight(t.x,t.z),absolute=p=>new THREE.Vector3(p.x+t.x,p.y+base,p.z+t.z);
        for(const s of g.segments){const a=absolute(s.a),b=absolute(s.b),d=b.clone().sub(a);dummy.position.copy(a).add(b).multiplyScalar(.5);dummy.quaternion.setFromUnitVectors(UP,d.clone().normalize());dummy.scale.set(s.radius,d.length(),s.radius);dummy.updateMatrix();branches.setMatrixAt(bi,dummy.matrix);branches.setColorAt(bi++,color.set(s.color));}
        for(const p of g.leaves){dummy.position.set(t.x+p.x,base+p.y,t.z+p.z);dummy.rotation.set(p.rx,p.ry,p.rz);dummy.scale.setScalar(p.size);dummy.updateMatrix();leaves.setMatrixAt(li,dummy.matrix);leaves.setColorAt(li++,color.set(p.color));}
        for(const f of g.fronds){const dx=f.tip.x-f.base.x,dz=f.tip.z-f.base.z,l=Math.hypot(dx,dz)||1,nx=-dz/l*f.width,nz=dx/l*f.width,pts=[f.base,{x:f.mid.x+nx,y:f.mid.y,z:f.mid.z+nz},f.tip,{x:f.mid.x-nx,y:f.mid.y,z:f.mid.z-nz}].map(p=>absolute(p).toArray());fronds.quad(...pts,'#829a63');}
      }
      for(const mesh of [branches,leaves]){mesh.castShadow=true;mesh.receiveShadow=true;mesh.computeBoundingSphere();world.add(mesh);}if(fronds.positions.length)world.add(fronds.mesh(palmMaterial));
      const flowers=forms.flatMap(({tree,geometry})=>chancellorBlossoms(tree,geometry).map(p=>({tree,...p})));if(flowers.length){const blossoms=new THREE.InstancedMesh(new THREE.PlaneGeometry(1,1),blossomMaterial,flowers.length);for(let i=0;i<flowers.length;i++){const p=flowers[i],t=p.tree;dummy.position.set(t.x+p.x,terrainHeight(t.x,t.z)+p.y,t.z+p.z);dummy.rotation.set(p.rx,p.ry,p.rz);dummy.scale.setScalar(p.size);dummy.updateMatrix();blossoms.setMatrixAt(i,dummy.matrix);}blossoms.receiveShadow=true;blossoms.computeBoundingSphere();world.add(blossoms);}
    }
  }

  function treesAndFurniture() {
    const random=rng(239),candidates=(campus.trees||[]).map(t=>({...t,big:true,retained:true})),trees=[];
    for(const c of candidates) {
      if(nearInventoryTree(c,4))continue;
      if(!c.retained&&c.x>-11&&c.x<12&&c.z>-234&&c.z<-218)continue;
      if(!c.retained&&(inLawrenceForecourt(c.x,c.z)||inMorvenCourt(c.x,c.z)||inBlockhouseForecourt(c.x,c.z)||inTyreeForecourt(c.x,c.z)||inMathewsForecourt(c.x,c.z)||inAinsworthGarden(c.x,c.z)||inWillisForecourt(c.x,c.z)||inRoundhouseForecourt(c.x,c.z)||inRoundhouseEntrance(c.x,c.z)||inRegimentStreet(c.x,c.z)||inGoldsteinCourt(c.x,c.z)||inNcpvStreet(c.x,c.z)||inL5Court(c.x,c.z)||inPavilionGround(c.x,c.z)||inBankForecourt(c.x,c.z)||inWarraneGround(c.x,c.z)||inShalomGround(c.x,c.z)||inNewCollegeGround(c.x,c.z)||inMathewsPavilions(c.x,c.z)||inBarkerEastGround(c.x,c.z)||inSouthernGround(c.x,c.z)||inRepositoryYard(c.x,c.z)||inSpiralGround(c.x,c.z)||inNidaSchoolGround(c.x,c.z)||inRegimentHallCourt(c.x,c.z)||inLibraryCoveredWalk(c.x,c.z)))continue;
      const fig=c.form==='heritage-fig',fixedTree=['samuels-gum','civil-poplar','rupert-courtyard'].includes(c.form);
      if(inElectricalCourt(c.x,c.z))continue;
      if(c.x<bounds.minX+3||c.x>bounds.maxX-3||c.z<bounds.minZ+3||c.z>bounds.maxZ-3)continue;
      if(blocked(c.x,c.z,null,fixedTree?.55:fig?1:3))continue;
      if(trees.some(t=>distance2(c,t)<(fixedTree?3:c.big?10:8)))continue;
      const n=nearestPath(c.x,c.z);if(n.distance<(n.path?.width||3)/2+(fixedTree?.5:fig?.35:1.4))continue;
      // Keep the actual playing surface clear.
      if(greens.some(g=>/village|pitch|sport|field/i.test(`${g.kind} ${g.name} ${g.id}`)&&inPolygon(c.x,c.z,validPoints(g))))continue;
      trees.push({...c,scale:c.height?c.height/9.5:(c.big?1.1:.8)+random()*.25,rotation:random()*TAU});
      addCollider({x:c.x,z:c.z,radius:fig?.75:c.big?.52:.32,top:c.height||9});
    }
    const morven=morvenGeometry(campus.buildings.find(b=>b.id==='osm-relation-2328645-0'));
    for(const [u,v,height] of [[8,-7,13],[14,3,14]]){const p=framePoint(morven.frame,u,v);if(nearInventoryTree(p,4))continue;trees.push({...p,height,scale:height/9.5,rotation:u,form:'rupert-courtyard'});addCollider({...p,radius:.4,top:height});}
    for(const tree of blockhouseGeometry(campus.buildings.find(b=>b.id==='blockhouse')).trees){if(nearInventoryTree(tree,4))continue;trees.push({...tree,scale:tree.height/9.5,rotation:tree.u});addCollider({x:tree.x,z:tree.z,radius:.75,top:tree.height});}
    for(const tree of tyreeGeometry(campus.buildings.find(b=>b.id==='tyree')).trees){if(nearInventoryTree(tree,4))continue;trees.push({...tree,scale:tree.height/9.5,rotation:tree.u});addCollider({x:tree.x,z:tree.z,radius:.75,top:tree.height});}
    for(const tree of ainsworthGeometry(campus.buildings.find(b=>b.id==='osm-way-616805099')).trees){if(nearInventoryTree(tree,4))continue;trees.push({...tree,scale:tree.height/9.5,rotation:tree.u});addCollider({x:tree.x,z:tree.z,radius:.5,top:tree.height});}
    for(const tree of willisGeometry(campus.buildings.find(b=>b.id==='osm-way-45229601')).trees){if(nearInventoryTree(tree,4))continue;trees.push({...tree,scale:tree.height/9.5,rotation:tree.u});addCollider({x:tree.x,z:tree.z,radius:.5,top:tree.height});}
    for(const tree of warraneGeometry().trees){if(nearInventoryTree(tree,4))continue;trees.push({...tree,form:'regiment-street',scale:tree.height/9.5,rotation:tree.v});addCollider({x:tree.x,z:tree.z,radius:tree.radius,top:tree.height});}
    for(const tree of ncpvGeometry().trees){if(nearInventoryTree(tree,4))continue;trees.push({...tree,form:'regiment-street',scale:tree.height/9.5,rotation:tree.u});addCollider({x:tree.x,z:tree.z,radius:tree.radius,top:tree.height});}
    for(const tree of [...nidaSchoolGeometry().trees,...nidaSchoolGeometry().streetTrees]){if(nearInventoryTree(tree,4))continue;trees.push({...tree,form:'rupert-courtyard',scale:tree.height/9.5,rotation:tree.v});addCollider({x:tree.x,z:tree.z,radius:tree.radius,top:tree.height});}
    {const tree=BARKER_EAST_TREE;if(!nearInventoryTree(tree,4)){trees.push({...tree,form:'samuels-gum',scale:tree.height/9.5,rotation:1.3});addCollider({x:tree.x,z:tree.z,radius:tree.radius,top:tree.height});}}
    for(const tree of repositoryTrees()){if(nearInventoryTree(tree,4))continue;trees.push({...tree,form:'regiment-street',scale:tree.height/9.5,rotation:tree.u});addCollider({x:tree.x,z:tree.z,radius:tree.radius,top:tree.height});}
    for(const tree of REGIMENT_STREET.trees){if(nearInventoryTree(tree,4))continue;trees.push({...tree,scale:tree.height/9.5,rotation:tree.x});addCollider({x:tree.x,z:tree.z,radius:.5,top:tree.height});}
    {const tree=villageCafeGeometry(campus.buildings.find(b=>b.id===VILLAGE_CAFE_ID)).tree;if(!nearInventoryTree(tree,4)){trees.push({...tree,scale:tree.height/9.5,rotation:.7});addCollider({x:tree.x,z:tree.z,radius:tree.radius,top:tree.height});}}
    const branchCount=trees.length*9;
    const branches=new THREE.InstancedMesh(new THREE.CylinderGeometry(.72,1,1,9),style('#c2bfb0',{map:surfaceTexture('bark')}),branchCount);
    const leafCount=trees.reduce((sum,t)=>sum+(t.form==='heritage-fig'?160:64),0);
    const leaves=new THREE.InstancedMesh(new THREE.PlaneGeometry(1.9,1.9),style('#8b9d7b',{map:foliageTexture(),alphaTest:.42,side:THREE.DoubleSide,roughness:.93}),leafCount);
    branches.castShadow=true;branches.receiveShadow=true;leaves.castShadow=true;leaves.receiveShadow=true;
    const dummy=new THREE.Object3D();let branchIndex=0,leafIndex=0;
    const branch=(a,b,radius,color)=>{
      const direction=new THREE.Vector3(b.x-a.x,b.y-a.y,b.z-a.z);
      dummy.position.set((a.x+b.x)/2,(a.y+b.y)/2,(a.z+b.z)/2);dummy.quaternion.setFromUnitVectors(UP,direction.clone().normalize());dummy.scale.set(radius,direction.length(),radius);dummy.updateMatrix();branches.setMatrixAt(branchIndex,dummy.matrix);branches.setColorAt(branchIndex++,new THREE.Color(color));
    };
    for(const t of trees){
      const fig=t.form==='heritage-fig',poplar=t.form==='civil-poplar',regiment=['regiment-street','village-cafe-tree'].includes(t.form),s=t.scale*.86,base=terrainHeight(t.x,t.z),fork=base+(fig?2.7:poplar?3.8:regiment?3:4.4)*s,color=fig?'#887f69':poplar?'#a19c87':regiment?'#9d9a8c':'#ffffff';
      branch({x:t.x,y:base,z:t.z},{x:t.x+.12*s,y:fork,z:t.z},(fig?.65:regiment?.25:.34)*s,color);
      for(let j=0;j<4;j++){
        const a=t.rotation+j/4*TAU,mid={x:t.x+Math.cos(a)*(fig?3.1:poplar?.4:1.5)*s,y:fork+(fig?3.4:2.6)*s,z:t.z+Math.sin(a)*(fig?3.1:poplar?.4:1.5)*s};
        branch({x:t.x,y:fork-.5*s,z:t.z},mid,(fig?.32:.18)*s,color);
        branch(mid,{x:t.x+Math.cos(a)*(fig?5.8:poplar?.8:3)*s,y:base+(9.2+(j%2))*s,z:t.z+Math.sin(a)*(fig?5.8:poplar?.8:3)*s},(fig?.18:.09)*s,color);
      }
      for(let j=0;j<(fig?160:64);j++){
        const a=random()*TAU,r=Math.sqrt(random())*(fig?6:poplar?.7:3.7)*s,cy=base+(poplar?4.8+(j%6):((fig?8.1:8.8)+Math.sin(j)*1.2))*s;
        dummy.position.set(t.x+Math.cos(a)*r,cy+(random()-.5)*(poplar?.6:2.6)*s,t.z+Math.sin(a)*r);
        dummy.rotation.set(random()*Math.PI,random()*TAU,random()*Math.PI);const size=(.75+random()*.5)*s*(fig?1.45:poplar?.55:1);dummy.scale.set(size,size,size);dummy.updateMatrix();leaves.setMatrixAt(leafIndex,dummy.matrix);leaves.setColorAt(leafIndex,new THREE.Color((fig?['#587148','#6a8052','#788956','#556d43']:regiment?['#5e784e','#72875b','#657f51','#879368']:['#8e9d7b','#b4bd9d','#a1b48b','#b9c29f'])[j%4]));leafIndex++;
      }
    }
    world.add(branches,leaves);
    const furniture=new Batch(),metal=new Batch();
    const mallPaths=paths.filter(p=>/mall/i.test(p.name||''));
    const benchSites=[];
    for(const p of mallPaths) {
      const pts=validPoints(p);
      for(let i=0;i<pts.length-1;i++) {
        const a=pts[i],b=pts[i+1],len=distance2(a,b),dx=(b.x-a.x)/(len||1),dz=(b.z-a.z)/(len||1);
        for(let d=16;d<len;d+=36) {
          const side=(Math.floor(d/36)%2)?1:-1,off=(p.width||10)/2+1.3;
          const x=a.x+dx*d-dz*off*side,z=a.z+dz*d+dx*off*side;
          if(blocked(x,z,null,1.6))continue;
          const angle=Math.atan2(-dz,dx);benchSites.push({x,z,angle});
          for(let slat=0;slat<5;slat++)furniture.box(x+Math.sin(angle)*(slat-2)*.12,.48,z+Math.cos(angle)*(slat-2)*.12,2.3,.09,.095,'#88745a',angle);
          const nx=Math.sin(angle),nz=Math.cos(angle);
          for(let slat=0;slat<3;slat++)furniture.box(x+nx*.27,.72+slat*.16,z+nz*.27,2.3,.12,.08,'#88745a',angle);
          for(const s of [-.8,.8]) metal.box(x+dx*s,.24,z+dz*s,.1,.5,.48,'#52615a',angle);
          const co=Math.cos(angle),si=-Math.sin(angle),ptsBench=[[-1.2,-.36],[1.2,-.36],[1.2,.36],[-1.2,.36]].map(([xx,zz])=>({x:x+xx*co-zz*si,z:z+xx*si+zz*co}));
          addCollider({points:ptsBench,top:.58});

        }
      }
    }
    for(const item of CAMPUS_DETAILS){
      if(item.osmId===OLD_MAIN_ENTRY_BIKES.sourceOsmId)continue;
      const {x,z,type}=item;if(blocked(x,z,null,.4))continue;
      const near=nearestPath(x,z),angle=near.a?Math.atan2(-(near.b.z-near.a.z),near.b.x-near.a.x):0;
      if(type==='bench'&&!benchSites.some(p=>Math.hypot(p.x-x,p.z-z)<4)){
        for(let k=0;k<5;k++)furniture.box(x+Math.sin(angle)*(k-2)*.12,.46,z+Math.cos(angle)*(k-2)*.12,1.9,.09,.095,'#82765c',angle);
        for(let k=0;k<3;k++)furniture.box(x+Math.sin(angle)*.27,.7+k*.15,z+Math.cos(angle)*.27,1.9,.1,.08,'#82765c',angle);
        for(const side of [-.7,.7])metal.box(x+Math.cos(angle)*side,.24,z-Math.sin(angle)*side,.09,.48,.48,'#4c5957',angle);
      }else if(type==='bin'){
        metal.box(x,.49,z,.62,.98,.6,'#3e5551',angle);metal.box(x,1.01,z,.65,.12,.64,'#b8a044',angle);metal.box(x,.8,z+.305,.4,.12,.025,'#273d39',angle);
      }else if(type==='bikes'){
        const count=Math.min(6,Math.max(2,Math.ceil((item.capacity||6)/2)));
        for(let i=0;i<count;i++){const dx=(i-(count-1)/2)*.75;for(const side of [-.28,.28])metal.box(x+dx,.4,z+side,.045,.8,.045,'#929e9c');metal.box(x+dx,.8,z,.045,.045,.6,'#929e9c');}
      }else if(type==='water'){
        metal.box(x,.48,z,.18,.96,.18,'#596d64');metal.box(x,.98,z,.5,.12,.42,'#a6b2ae');metal.box(x,1.09,z-.1,.04,.15,.04,'#a6b2ae');
      }else if(type==='bollard')metal.box(x,.45,z,.14,.9,.14,'#626e66');
    }
    world.add(furniture.mesh(style('#ffffff',{vertexColors:true,map:surfaceTexture('bark')})),metal.mesh(style('#ffffff',{vertexColors:true,roughness:.45,metalness:.35})));
  }

  function sportsField() {
    const area=VILLAGE_SPORTS.find(s=>s.sport==='soccer');if(!area)return;
    const f=orientedFrame(area.points),pitch=new Batch(),mark=new Batch(),yellow=new Batch(),metal=new Batch(),track=new Batch(),courts=new Batch();
    const w=Math.min(68,f.width-5),d=Math.min(105,f.length-6),angle=Math.atan2(-f.u.z,f.u.x);
    for(let row=0;row<12;row++)polygon(pitch,clipFrameStrip(area.points,f,-f.length/2+row*f.length/12,-f.length/2+(row+1)*f.length/12),.09,row%2?'#4c714a':'#557b50');
    const line=(frame,a,b,width=.12,batch=mark,height=.125)=>ribbon(batch,[framePoint(frame,...a),framePoint(frame,...b)],width,height,batch===yellow?'#cfb954':'#eeeede');
    const rect=(frame,width,length,x=0,z=0,batch=mark,height=.125)=>{const pts=frameRectangle(frame,width,length,x,z);ribbon(batch,[...pts,pts[0]],.12,height,batch===yellow?'#d8bd57':'#eeeede');};
    const circle=(frame,x,z,radius,batch=mark,height=.125)=>{const pts=[];for(let i=0;i<=64;i++)pts.push(framePoint(frame,x+Math.cos(i/64*TAU)*radius,z+Math.sin(i/64*TAU)*radius));ribbon(batch,pts,.1,height,'#e9eadc');};
    rect(f,w,d);line(f,[-w/2,0],[w/2,0]);circle(f,0,0,9.15);
    for(const side of [-1,1]){
      rect(f,40.32,16.5,0,side*(d/2-8.25));rect(f,18.32,5.5,0,side*(d/2-2.75));
      circle(f,0,side*(d/2-11),.12);
      const arc=[];for(let i=0;i<=96;i++){const t=i/96*TAU,x=Math.cos(t)*9.15,z=side*(d/2-11)+Math.sin(t)*9.15;if(side*z<d/2-16.5)arc.push(framePoint(f,x,z));}ribbon(mark,arc,.1,.125,'#eeeeDF');
      const gz=side*d/2,post=(x,z)=>framePoint(f,x,z),a=post(-3.66,gz),b=post(3.66,gz),centre=post(0,gz);
      metal.box(a.x,1.25,a.z,.1,2.5,.1,'#e1e4d7');metal.box(b.x,1.25,b.z,.1,2.5,.1,'#e1e4d7');metal.box(centre.x,2.45,centre.z,7.42,.1,.1,'#e1e4d7',angle);
      for(let j=0;j<=16;j++){const p=post(-3.66+j*7.32/16,gz+side*1.5);metal.box(p.x,1.15,p.z,.012,2.3,.012,'#aab9a6');}
      for(let j=0;j<9;j++){const p=post(0,gz+side*1.5);metal.box(p.x,.2+j*.27,p.z,7.32,.012,.012,'#aab9a6',angle);}
      // The aerial also shows the multi-sport field's yellow rugby markings.
      for(const distance of [10,28,50]){const z=side*distance;ribbon(yellow,[framePoint(f,-w/2,z),framePoint(f,w/2,z)],.085,.13,'#cfb954');}
      for(let x=-w/2;x<w/2;x+=5)line(f,[x,side*40],[Math.min(w/2,x+1),side*40],.085,yellow,.13);
    }
    const run=VILLAGE_SPORTS.find(s=>s.kind==='track');
    if(run){ribbon(track,run.points,3.2,.265,'#3b8eb9');ribbon(mark,run.points,.08,.276,'#cce0e4');}
    const hoopGeometry=new THREE.TorusGeometry(.23,.018,6,24),hoopMaterial=style('#c36d3f');
    for(const court of VILLAGE_SPORTS.filter(s=>s.kind==='pitch'&&['multi','basketball'].includes(s.sport))){
      const frame=orientedFrame(court.points),cw=Math.min(15,frame.width-1),half=court.id==='osm-way-1178531044',cl=Math.min(half?14:28,frame.length-1),rotation=Math.atan2(-frame.u.z,frame.u.x);
      polygon(courts,frameRectangle(frame,frame.width+2.4,frame.length+2.4),.265,'#3988b6',[court.points]);
      polygon(courts,court.points,.28,'#b87692');rect(frame,cw,cl,0,0,mark,.30);
      if(!half){line(frame,[-cw/2,0],[cw/2,0],.085,mark,.30);circle(frame,0,0,1.8,mark,.30);}
      for(const side of half?[1]:[-1,1]){
        rect(frame,4.9,5.8,0,side*(cl/2-2.9),mark,.30);
        const p=framePoint(frame,0,side*(cl/2+1)),board=framePoint(frame,0,side*(cl/2-.35)),bracket=framePoint(frame,0,side*(cl/2+.3)),rim=framePoint(frame,0,side*(cl/2-.85));
        metal.box(p.x,1.9,p.z,.12,3.8,.12,'#566562');metal.box(bracket.x,3.65,bracket.z,.09,.09,1.5,'#566562',rotation);
        metal.box(board.x,3.55,board.z,1.8,1.05,.08,'#d7dfd8',rotation);
        const hoop=new THREE.Mesh(hoopGeometry,hoopMaterial);hoop.rotation.x=Math.PI/2;hoop.position.set(rim.x,terrainHeight(rim.x,rim.z)+3.05,rim.z);world.add(hoop);
        for(let i=0;i<8;i++){const t=i/8*TAU;metal.box(rim.x+Math.cos(t)*.19,2.86,rim.z+Math.sin(t)*.19,.014,.36,.014,'#d7dfd8');}
      }
    }
    for(const feature of VILLAGE_SPORTS.filter(s=>s.sport==='fitness'||s.sport==='bouldering'))polygon(courts,feature.points,.265,feature.sport==='fitness'?'#3e8db6':'#d1c8ac');
    const texture=surfaceTexture('grass');
    world.add(pitch.mesh(style('#ffffff',{vertexColors:true,map:texture}),false),track.mesh(style('#ffffff',{vertexColors:true}),false),courts.mesh(style('#ffffff',{vertexColors:true}),false));
    world.add(mark.mesh(style('#ffffff',{vertexColors:true}),false),yellow.mesh(style('#ffffff',{vertexColors:true}),false),metal.mesh(style('#ffffff',{vertexColors:true})));
    const spawn=framePoint(f,-w*.2,-d*.26);ballSpawn={...spawn,y:surfaceHeight(spawn.x,spawn.z)+.29};createBall();
  }

  function createBall() {
    const group=new THREE.Group();
    const sphere=new THREE.Mesh(new THREE.SphereGeometry(.28,24,16),style('#eee8d8',{roughness:.72}));sphere.castShadow=true;group.add(sphere);
    const ico=new THREE.IcosahedronGeometry(1,0),attr=ico.getAttribute('position'),unique=new Map();
    for(let i=0;i<attr.count;i++) {
      const v=new THREE.Vector3().fromBufferAttribute(attr,i).normalize();unique.set(`${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`,v);
    }
    const patchGeo=new THREE.CircleGeometry(.096,5),patchMat=style('#3f4944',{side:THREE.DoubleSide});
    for(const v of unique.values()) {
      const patch=new THREE.Mesh(patchGeo,patchMat);patch.position.copy(v).multiplyScalar(.279);patch.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),v);group.add(patch);
    }
    ico.dispose();world.add(group);
    ball={mesh:group,x:ballSpawn.x,y:ballSpawn.y,z:ballSpawn.z,vx:0,vy:0,vz:0};group.position.set(ball.x,ball.y,ball.z);
  }

  function signsAndCuriosities() {
    // The map MVP uses real building wayfinding, with no collectible overlays.
    const selected=[];
    for(const l of landmarks) {
      const b=buildings.find(b=>b.id===l.id),pos=l.position||l;
      let x=pos.x,z=pos.z;
      if(!Number.isFinite(x)||!Number.isFinite(z))continue;
      if(b&&!b.walkableUnder&&inPolygon(x,z,b.points)) {
        const q=nearestPath(b.extent.x,b.extent.z);x=q.x;z=q.z;
      }
      const safe=safePoint(walkingDestination(l,{x,z}));
      l.walkPoint=walkingDestination(l,safe);
      if(l.showSign===false)continue;
      const near=nearestPath(safe.x,safe.z);
      let angle=near.a?Math.atan2(near.b.x-near.a.x,-(near.b.z-near.a.z)):0;
      const sign=new THREE.Group();
      const board=new THREE.Mesh(new THREE.BoxGeometry(.9,1.68,.14),style('#293b3b'));
      board.position.y=1.55;board.castShadow=true;sign.add(board);
      const face=new THREE.Mesh(new THREE.PlaneGeometry(.86,1.64),new THREE.MeshBasicMaterial({map:textTexture(l.name||b?.name||l.id,l.code||b?.campusRef||'')}));
      face.position.set(0,1.55,.077);sign.add(face);
      const post=new THREE.Mesh(new THREE.BoxGeometry(.14,.8,.14),style('#354440'));post.position.set(0,.4,0);post.castShadow=true;sign.add(post);
      sign.position.set(safe.x+Math.cos(angle)*2.5,terrainHeight(safe.x,safe.z),safe.z+Math.sin(angle)*2.5);sign.rotation.y=-angle;world.add(sign);
    }
    curiosities=selected.map((l,index)=> {
      let p=l.walkPoint||{x:l.x,z:l.z};
      if(!Number.isFinite(p.x)){const e=l.extent||extent(l.points);p={x:e.x,z:e.z};}
      p=safePoint({x:p.x+((index%2)?-1.7:1.7),z:p.z+1.8});
      const group=new THREE.Group();
      const pedestal=new THREE.Mesh(new THREE.CylinderGeometry(.48,.58,.28,8),style('#d9d5bd'));pedestal.position.y=.14;pedestal.receiveShadow=true;group.add(pedestal);
      const token=new THREE.Group();
      const disc=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.12,24),style('#eaa85d',{metalness:.25,roughness:.37}));disc.rotation.x=Math.PI/2;disc.castShadow=true;token.add(disc);
      const starShape=new THREE.Shape();for(let i=0;i<10;i++){const a=i/10*TAU-Math.PI/2,r=i%2?.095:.21;if(i===0)starShape.moveTo(Math.cos(a)*r,Math.sin(a)*r);else starShape.lineTo(Math.cos(a)*r,Math.sin(a)*r);}starShape.closePath();
      const star=new THREE.Mesh(new THREE.ShapeGeometry(starShape),new THREE.MeshBasicMaterial({color:'#fff4d5',side:THREE.DoubleSide}));star.position.z=.067;token.add(star);
      token.position.y=1.1;group.add(token);
      const ring=new THREE.Mesh(new THREE.TorusGeometry(.58,.022,5,32),style('#e5ad65'));ring.rotation.x=Math.PI/2;ring.position.y=.3;group.add(ring);
      group.position.set(p.x,terrainHeight(p.x,p.z),p.z);world.add(group);
      return{id:l.id||`curiosity-${index}`,name:l.name||'Campus curiosity',x:p.x,z:p.z,mesh:group,token,index};
    });
  }


  function disposeWorld() {
    const geometries=new Set(),materials=new Set(),textures=new Set();
    world.traverse(object=>{if(object.geometry)geometries.add(object.geometry);for(const mat of Array.isArray(object.material)?object.material:object.material?[object.material]:[]){materials.add(mat);for(const value of Object.values(mat))if(value?.isTexture)textures.add(value);}});
    for(const {target}of campusReflections){textures.delete(target.texture);target.dispose();}campusReflections.length=0;
    for(const mesh of campusPlanarReflections)mesh.getRenderTarget().dispose();campusPlanarReflections.length=0;
    for(const geo of geometries)geo.dispose();for(const mat of materials)mat.dispose();for(const texture of textures)texture.dispose();
    scene.remove(world);world=new THREE.Group();scene.add(world);
  }

  function loadCampus(data) {
    try {
      clearInputs();disposeWorld();campus=data;
      buildings=(data.buildings||[]).map(b=>({...b,points:validPoints(b)})).filter(b=>b.points.length>=3);
      paths=data.paths||data.roads||[];greens=data.greens||data.parks||[];landmarks=(data.landmarks||[]).map(l=>({...l,...(l.position||{})}));
      stairSegments=[];surfaceCells=new Map();groundPatches=[];forestTrees=[];mallLightCount=0;
      for(const path of paths)for(let i=0;i<path.points.length-1;i++){
        const a=path.points[i],b=path.points[i+1],{width,road}=pathGeometry(path);
        const item={a,b,width,road};
        for(let x=Math.floor((Math.min(a.x,b.x)-width)/20);x<=Math.floor((Math.max(a.x,b.x)+width)/20);x++)for(let z=Math.floor((Math.min(a.z,b.z)-width)/20);z<=Math.floor((Math.max(a.z,b.z)+width)/20);z++){
          const key=`${x},${z}`;if(!surfaceCells.has(key))surfaceCells.set(key,[]);surfaceCells.get(key).push(item);
        }
      }
      for(const path of paths.filter(p=>p.kind==='steps'&&p.id!==WEBSTER_REPLACED_STEP_ID&&!SCIENTIA_STEP_IDS.includes(p.id)&&p.id!==BANK_STEPS_ID&&!ELECTRICAL_REPLACED_STEPS.includes(p.id)&&!TYREE_REPLACED_STEPS.includes(p.id)))for(let i=0;i<path.points.length-1;i++){
        const a=path.points[i],b=path.points[i+1],h0=terrainHeight(a.x,a.z)+.17,h1=terrainHeight(b.x,b.z)+.17;
        if(distance2(a,b)>.2)stairSegments.push({a,b,h0,h1,pathId:path.id,width:path.width||3,count:Math.max(1,Math.ceil(Math.abs(h1-h0)/.17))});
      }
      for(const p of paths.filter(p=>SCIENTIA_STEP_IDS.includes(p.id)))stairSegments.push(...scientiaOutsideStepSegments(p));
      if(buildings.some(b=>b.id===BANK_ID))stairSegments.push(bankGeometry().stair);
      const bb=data.bounds||{minX:-245,maxX:290,minZ:-240,maxZ:190};
      bounds={minX:bb.minX??bb.west??-245,maxX:bb.maxX??bb.east??290,minZ:bb.minZ??bb.north??-240,maxZ:bb.maxZ??bb.south??190};
      colliders=[];spatial=new Map();found=new Set();curiosities=[];ball=null;totalDistance=0;
      spawn={x:data.spawn?.x??-125,z:data.spawn?.z??-35,heading:data.spawn?.heading??Math.PI/2};
      groundAndPaths();mallGround();buildingWorld();catherineCourt();scientiaMainSteps();globeSculpture();chancellorsGarden();oldMainNorthCourt();oldMainLowerEntry();engineeringStreetscape();southernDriveStreetscape();regimentStreetscape();electricalOutdoor();courtyardLandscape();campusForest();treesAndFurniture();mallLights();sportsField();signsAndCuriosities();
      updateCampusReflection();
      spawn=safePoint(spawn);reset();makeMinimap();report();
    }catch(error){onError(error);throw error;}
  }

  function reset() {
    clearInputs();player={x:spawn.x,y:surfaceHeight(spawn.x,spawn.z),z:spawn.z,vx:0,vz:0,vy:0,heading:spawn.heading??Math.PI/2,pitch:0,grounded:true};
    if(ball&&ballSpawn){Object.assign(ball,{x:ballSpawn.x,y:ballSpawn.y,z:ballSpawn.z,vx:0,vy:0,vz:0});ball.mesh.position.set(ball.x,ball.y,ball.z);}
    totalDistance=0;lastInteraction='';updateCamera(0);report();
  }

  function teleport(id) {
    let l=landmarks.find(l=>l.id===id)||curiosities.find(l=>l.id===id);
    const building=buildings.find(b=>b.id===id);
    if(!l&&building){const e=building.extent,q=nearestPath(e.x,e.z);l={x:q.x,z:q.z};}
    if(!l)return false;
    const p=safePoint(walkingDestination(l));
    Object.assign(player,{x:p.x,y:surfaceHeight(p.x,p.z,l.walkFloor??terrainHeight(p.x,p.z)),z:p.z,vx:0,vz:0,vy:0,grounded:true,pitch:Number.isFinite(l.pitch)?clamp(l.pitch,-1.1,1.1):0});
    const b=buildings.find(b=>b.id===id);
    if(Number.isFinite(l.heading))player.heading=l.heading;
    else if(b)player.heading=Math.atan2(b.extent.x-p.x,-(b.extent.z-p.z));
    clearInputs();updateCamera(0);report();return true;
  }

  function teleportTo(position) {
    if(!campus||!Number.isFinite(position?.x)||!Number.isFinite(position?.z))return false;
    const p=safePoint({x:clamp(position.x,bounds.minX+2,bounds.maxX-2),z:clamp(position.z,bounds.minZ+2,bounds.maxZ-2)});
    Object.assign(player,{x:p.x,y:surfaceHeight(p.x,p.z,terrainHeight(p.x,p.z)),z:p.z,vx:0,vz:0,vy:0,grounded:true,pitch:0});
    if(Number.isFinite(position.heading))player.heading=position.heading;
    clearInputs();updateCamera(0);report();return true;
  }

  function setPaused(value) {
    paused=Boolean(value);clearInputs();lastFrame=performance.now();
    if(!paused)hasStarted=true;
    if(paused&&document.pointerLockElement===canvas)document.exitPointerLock?.();
    report();
  }

  function setTime(value) {
    timeOfDay=lighting.setMode(value);
    shadowAnchor.x=1e6;updateSun();updateCampusReflection();report();
  }

  function setInput(action,value) {
    const alias={back:'backward',reverse:'backward',down:'backward',up:'forward',run:'sprint'};
    const key=alias[action]||action;
    if(key in inputs)inputs[key]=Boolean(value);
    else if(action==='jump'&&value)jump();else if(action==='interact'&&value)interact();
  }

  function look(dx,dy) {
    if(paused||hidden)return;
    player.heading+=Number(dx||0)*.0023;player.pitch=clamp(player.pitch-Number(dy||0)*.0023,-1.35,1.35);
  }

  function jump() {
    if(paused||hidden||!player.grounded)return;
    player.vy=6.3;player.grounded=false;
  }

  function interact() {
    if(paused||hidden||!ball||Math.hypot(ball.x-player.x,ball.z-player.z)>2.8)return false;
    const dx=Math.sin(player.heading),dz=-Math.cos(player.heading);
    ball.vx=dx*11.5+player.vx*.5;ball.vz=dz*11.5+player.vz*.5;ball.vy=4.6;lastInteraction='kick';report();return true;
  }

  function movePlayer(dt) {
    const forward=Number(inputs.forward)-Number(inputs.backward),right=Number(inputs.right)-Number(inputs.left),norm=Math.hypot(forward,right)||1;
    const speed=inputs.sprint?7.1:3.8;
    const targetX=(Math.sin(player.heading)*forward+Math.cos(player.heading)*right)/norm*speed;
    const targetZ=(-Math.cos(player.heading)*forward+Math.sin(player.heading)*right)/norm*speed;
    const damp=1-Math.exp(-dt*(player.grounded?14:5));
    player.vx+=(targetX-player.vx)*damp;player.vz+=(targetZ-player.vz)*damp;
    const dx=player.vx*dt,dz=player.vz*dt,steps=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.16));
    const oldX=player.x,oldZ=player.z;
    for(let i=0;i<steps;i++) {
      if(!blocked(player.x+dx/steps,player.z,player.y))player.x+=dx/steps;else player.vx=0;
      if(!blocked(player.x,player.z+dz/steps,player.y))player.z+=dz/steps;else player.vz=0;
    }
    const previousY=player.y;player.vy-=18*dt;player.y+=player.vy*dt;
    let floor=surfaceHeight(player.x,player.z);
    for(const c of nearbyColliders(player.x,player.z,.32)) {
      const top=colliderTop(c,player.x,player.z);
      if(previousY<top-(c.stepHeight||.08)||player.y>top)continue;
      if(c.points?circleTouchesPolygon(player.x,player.z,.26,c.points):Math.hypot(player.x-c.x,player.z-c.z)<c.radius+.26)floor=Math.max(floor,top);
    }
    if(player.y<=floor){player.y=floor;player.vy=0;player.grounded=true;}else player.grounded=false;
    totalDistance+=Math.hypot(player.x-oldX,player.z-oldZ);
    for(const c of curiosities) {
      if(!found.has(c.id)&&Math.hypot(player.x-c.x,player.z-c.z)<1.65){found.add(c.id);c.mesh.visible=false;lastInteraction=`discovered:${c.id}`;report();}
    }
  }

  function moveBall(dt) {
    if(!ball)return;
    ball.vy-=13*dt;ball.y+=ball.vy*dt;
    const ballFloor=surfaceHeight(ball.x,ball.z,ball.y-.28)+.28;
    if(ball.y<ballFloor){ball.y=ballFloor;ball.vy=Math.abs(ball.vy)>.8?-ball.vy*.48:0;const drag=Math.exp(-dt*1.05);ball.vx*=drag;ball.vz*=drag;}
    const dx=ball.vx*dt,dz=ball.vz*dt;
    if(!blocked(ball.x+dx,ball.z,Math.max(0,ball.y-.25),.29))ball.x+=dx;else ball.vx*=-.5;
    if(!blocked(ball.x,ball.z+dz,Math.max(0,ball.y-.25),.29))ball.z+=dz;else ball.vz*=-.5;
    const separation=Math.hypot(ball.x-player.x,ball.z-player.z);
    if(separation<.65&&Math.hypot(player.vx,player.vz)>.4){ball.vx+=player.vx*dt*6;ball.vz+=player.vz*dt*6;}
    ball.mesh.position.set(ball.x,ball.y,ball.z);
    ball.mesh.rotation.x+=ball.vz*dt/.28;ball.mesh.rotation.z-=ball.vx*dt/.28;
  }

  function updateSun() {
    if(Math.hypot(player.x-shadowAnchor.x,player.z-shadowAnchor.z)<28)return;
    shadowAnchor={x:Math.round(player.x/20)*20,z:Math.round(player.z/20)*20};
    lighting.setSunAnchor(shadowAnchor.x,shadowAnchor.z,terrainHeight(shadowAnchor.x,shadowAnchor.z));
  }

  function updateCamera(dt) {
    const speed=Math.hypot(player.vx,player.vz),bob=player.grounded?Math.sin(elapsed*(inputs.sprint?14:10))*.018*Math.min(1,speed/3):0;
    camera.position.set(player.x,player.y+1.7+bob,player.z);camera.rotation.set(player.pitch,-player.heading,0,'YXZ');
    const targetFov=inputs.sprint&&speed>4?72:68;
    const fov=camera.fov+(targetFov-camera.fov)*Math.min(1,dt*5);
    if(Math.abs(camera.fov-fov)>.005){camera.fov=fov;camera.updateProjectionMatrix();}
    updateSun();
  }

  function areaName() {
    if(!campus)return 'Kensington campus';
    for(const green of greens)if(green.name&&inPolygon(player.x,player.z,validPoints(green)))return green.name;
    const building=buildings.find(b=>inPolygon(player.x,player.z,b.points)&&!(b.holes||[]).some(h=>inPolygon(player.x,player.z,h)));
    if(building)return building.name;
    if(inCatherineCourt(player.x,player.z))return CATHERINE_VIEW.name;
    if(ROUNDHOUSE_CANOPY.some(p=>inPolygon(player.x,player.z,p.points)&&!p.holes.some(h=>inPolygon(player.x,player.z,h))))return 'Roundhouse · main entrance canopy';
    const nearest=nearestPath(player.x,player.z);
    if(nearest.distance<Math.max(8,(nearest.path?.width||4))) {
      const name=nearest.path?.name;if(name)return name;
    }
    let nearestLandmark=null,distance=Infinity;
    for(const l of landmarks){const p=l.walkPoint||l,d=Math.hypot(player.x-p.x,player.z-p.z);if(d<distance){nearestLandmark=l;distance=d;}}
    return distance<48?nearestLandmark.name:'UNSW Kensington';
  }

  function getState() {
    const nearBall=Boolean(ball&&Math.hypot(ball.x-player.x,ball.z-player.z)<2.8);
    return {position:{x:player.x,y:player.y,z:player.z},speed:Math.hypot(player.vx,player.vz),elevation:player.y,groundElevation:terrainHeight(player.x,player.z),distance:totalDistance,area:areaName(),found:[...found],discoveries:curiosities.filter(c=>found.has(c.id)).map(c=>({id:c.id,name:c.name})),totalDiscoveries:curiosities.length,inventoryTreeCount:forestTrees.length,mallLightCount,locked,paused:paused||hidden,nearBall,canInteract:nearBall,interactionHint:nearBall?'Press E to kick the ball':'',heading:player.heading,pitch:player.pitch,grounded:player.grounded,time:timeOfDay,ball:ball?{x:ball.x,y:ball.y,z:ball.z}:null,interaction:lastInteraction};
  }

  function report() { onUpdate(getState());drawMinimap(); }

  function makeMinimap() {
    if(!minimap||!bounds)return;
    const w=640,h=540,pad=22,scale=Math.min((w-pad*2)/(bounds.maxX-bounds.minX),(h-pad*2)/(bounds.maxZ-bounds.minZ));
    const ox=(w-(bounds.maxX-bounds.minX)*scale)/2-bounds.minX*scale,oz=(h-(bounds.maxZ-bounds.minZ)*scale)/2-bounds.minZ*scale;
    minimapBase=document.createElement('canvas');minimapBase.width=w;minimapBase.height=h;minimapInfo={w,h,scale,ox,oz};
    const ctx=minimapBase.getContext('2d');ctx.fillStyle='#e8ecdf';ctx.fillRect(0,0,w,h);
    const poly=(pts,fill,holes=[])=>{if(!pts.length)return;ctx.beginPath();for(const loop of [pts,...holes]){ctx.moveTo(ox+loop[0].x*scale,oz+loop[0].z*scale);for(const p of loop.slice(1))ctx.lineTo(ox+p.x*scale,oz+p.z*scale);ctx.closePath();}ctx.fillStyle=fill;ctx.fill('evenodd');};
    for(const g of greens)poly(validPoints(g),'#b2c8a2');
    for(const plaza of campus.plazas||[])poly(plaza.points,'#eeeede',plaza.holes||[]);
    for(const area of campus.sportsAreas||[])if(area.sport!=='soccer'&&area.kind!=='track')poly(area.points,area.sport==='fitness'?'#92bad0':area.sport==='bouldering'?'#d6cdbb':'#c99caf');
    ctx.lineCap='round';ctx.lineJoin='round';
    for(const p of paths){const pts=validPoints(p);if(!pts.length)continue;ctx.beginPath();ctx.moveTo(ox+pts[0].x*scale,oz+pts[0].z*scale);for(const q of pts.slice(1))ctx.lineTo(ox+q.x*scale,oz+q.z*scale);ctx.lineWidth=Math.max(1,(p.width||3)*scale);ctx.strokeStyle=p.kind==='track'?'#69acc8':/road|service/i.test(p.kind||'')?'#c0c5bd':'#f9f5e9';ctx.stroke();}
    for(const b of buildings)poly(b.points,/red|lawrence/.test(b.id||'')?'#bc8973':/law/.test(b.id||'')?'#c2ad7e':'#aeb7ac',[...(b.holes||[]),...(b.reconstructedMapHoles||[])]);
    ctx.font='600 11px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
    const labels={'roundhouse':'ROUNDHOUSE','squarehouse':'SQUAREHOUSE','law':'LAW','business-school':'BUSINESS','red-centre-west':'LAWRENCE CENTRE','village-green':'VILLAGE GREEN'};
    for(const l of landmarks){if(!labels[l.id])continue;const b=buildings.find(b=>b.id===l.id),p=b?b.extent:l;const x=ox+p.x*scale,z=oz+p.z*scale;ctx.strokeStyle='#f6f4e9';ctx.lineWidth=3;ctx.strokeText(labels[l.id],x,z);ctx.fillStyle='#465c50';ctx.fillText(labels[l.id],x,z);}
    ctx.fillStyle='#52675a';ctx.font='600 13px sans-serif';ctx.textAlign='right';ctx.fillText('N ↑',w-18,21);
    drawMinimap();
  }

  function drawMinimap() {
    if(!minimap||!minimapBase||!minimapInfo)return;
    const width=minimap.clientWidth||256,height=minimap.clientHeight||216,dpr=Math.min(window.devicePixelRatio||1,2);
    if(minimap.width!==Math.round(width*dpr)||minimap.height!==Math.round(height*dpr)){minimap.width=Math.round(width*dpr);minimap.height=Math.round(height*dpr);}
    const ctx=minimap.getContext('2d'),{w,h,scale,ox,oz}=minimapInfo;
    ctx.setTransform(minimap.width/w,0,0,minimap.height/h,0,0);ctx.drawImage(minimapBase,0,0);
    for(const c of curiosities){if(found.has(c.id))continue;ctx.beginPath();ctx.arc(ox+c.x*scale,oz+c.z*scale,4.5,0,TAU);ctx.fillStyle='#d99c52';ctx.fill();}
    const x=ox+player.x*scale,z=oz+player.z*scale;
    ctx.save();ctx.translate(x,z);ctx.rotate(player.heading);ctx.beginPath();ctx.moveTo(0,-13);ctx.lineTo(9,9);ctx.lineTo(0,5);ctx.lineTo(-9,9);ctx.closePath();ctx.strokeStyle='#fbf8ed';ctx.lineWidth=4;ctx.stroke();ctx.fillStyle='#2c6d62';ctx.fill();ctx.restore();
  }

  function resize() {
    const width=canvas.clientWidth||window.innerWidth,height=canvas.clientHeight||window.innerHeight;
    if(canvas.width!==Math.round(width*renderer.getPixelRatio())||canvas.height!==Math.round(height*renderer.getPixelRatio())) {
      renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();
    }
  }

  function frame(now) {
    if(destroyed)return;
    animation=requestAnimationFrame(frame);
    const dt=clamp((now-lastFrame)/1000,0,.04);lastFrame=now;
    if(!paused&&!hidden&&campus){elapsed+=dt;movePlayer(dt);moveBall(dt);}
    for(const c of curiosities){if(found.has(c.id))continue;c.token.rotation.y=elapsed*.7+c.index;c.token.position.y=1.08+Math.sin(elapsed*2+c.index)*.1;}
    updateCamera(dt);resize();renderer.render(scene,camera);
    if(now-reportTime>125){reportTime=now;report();}
  }

  function formTarget(target) { return target?.isContentEditable||/^(INPUT|TEXTAREA|SELECT)$/.test(target?.tagName||''); }
  const keyActions={KeyW:'forward',ArrowUp:'forward',KeyS:'backward',ArrowDown:'backward',KeyA:'left',ArrowLeft:'left',KeyD:'right',ArrowRight:'right',ShiftLeft:'sprint',ShiftRight:'sprint'};
  listen(window,'keydown',event=>{
    if(formTarget(event.target)||event.metaKey||event.ctrlKey||event.altKey)return;
    const action=keyActions[event.code];
    if(action){if(!paused){event.preventDefault();setInput(action,true);}return;}
    if(event.code==='Space'){if(!paused)event.preventDefault();if(!event.repeat)jump();}
    else if(event.code==='KeyE'&&!event.repeat)interact();
    else if(event.code==='KeyR'&&!event.repeat)reset();
    else if(event.code==='Escape'&&!event.repeat&&hasStarted&&!document.querySelector('dialog[open]'))setPaused(!paused);
  });
  listen(window,'keyup',event=>{const action=keyActions[event.code];if(action)setInput(action,false);});
  listen(window,'blur',()=>{clearInputs();if(!paused)setPaused(true);});
  listen(document,'visibilitychange',()=>{hidden=document.hidden;clearInputs();lastFrame=performance.now();report();});
  listen(document,'pointerlockchange',()=>{const was=locked;locked=document.pointerLockElement===canvas;if(was&&!locked)clearInputs();report();});
  listen(document,'pointerlockerror',()=>{locked=false;report();});
  listen(canvas,'pointerdown',event=>{
    if(paused||event.button!==0)return;dragging=true;
    if(!locked&&canvas.requestPointerLock){try{const result=canvas.requestPointerLock();if(result?.catch)result.catch(()=>{});}catch{/* Embedded browsers can deny pointer lock; dragging still works. */}}
    if(!locked){try{canvas.setPointerCapture(event.pointerId);}catch{}}
  });
  listen(window,'pointerup',()=>{dragging=false;});
  listen(document,'mousemove',event=>{if(locked||dragging)look(event.movementX,event.movementY);});
  listen(canvas,'contextmenu',event=>event.preventDefault());
  listen(window,'resize',resize);
  const observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(resize):null;observer?.observe(canvas);
  resize();animation=requestAnimationFrame(frame);

  function destroy() {
    destroyed=true;cancelAnimationFrame(animation);clearInputs();observer?.disconnect();for(const remove of listeners)remove();
    if(document.pointerLockElement===canvas)document.exitPointerLock?.();disposeWorld();lighting.dispose();renderer.dispose();
  }

  return{loadCampus,setPaused,reset,teleport,teleportTo,setTime,setInput,look,jump,interact,getState,destroy};
}
