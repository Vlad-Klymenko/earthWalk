import {campusTerrainHeight as baselineTerrain} from './spiral-landscape.js?v=5c6b85277d47';
import {oldMainEntryHeight} from './old-main-entry-data.js?v=5c6b85277d47';
// Raw public elevation samples are unchanged. This bounded exterior depression
// uses source RL anchors with fitted connections; its exact plan is estimated.
export function campusTerrainHeight(x,z){return oldMainEntryHeight(x,z)??baselineTerrain(x,z);}
