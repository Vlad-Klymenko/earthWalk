import {campusTerrainHeight as baselineTerrain} from './spiral-landscape.js?v=0a6497e5d72b';
import {oldMainEntryHeight} from './old-main-entry-data.js?v=0a6497e5d72b';
// Raw public elevation samples are unchanged. This bounded exterior depression
// uses source RL anchors with fitted connections; its exact plan is estimated.
export function campusTerrainHeight(x,z){return oldMainEntryHeight(x,z)??baselineTerrain(x,z);}
