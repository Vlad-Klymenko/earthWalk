import {campusTerrainHeight as baselineTerrain} from './spiral-landscape.js?v=eb4acc4e0f1c';
import {oldMainEntryHeight} from './old-main-entry-data.js?v=eb4acc4e0f1c';
// Raw public elevation samples are unchanged. This bounded exterior depression
// uses source RL anchors with fitted connections; its exact plan is estimated.
export function campusTerrainHeight(x,z){return oldMainEntryHeight(x,z)??baselineTerrain(x,z);}
