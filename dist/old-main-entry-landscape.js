import {campusTerrainHeight as baselineTerrain} from './spiral-landscape.js?v=3f92c7de99b8';
import {oldMainEntryHeight} from './old-main-entry-data.js?v=3f92c7de99b8';
// Raw public elevation samples are unchanged. This bounded exterior depression
// uses source RL anchors with fitted connections; its exact plan is estimated.
export function campusTerrainHeight(x,z){return oldMainEntryHeight(x,z)??baselineTerrain(x,z);}
