import {campusTerrainHeight as baselineTerrain} from './spiral-landscape.js?v=a5f9f679a82f';
import {oldMainEntryHeight} from './old-main-entry-data.js?v=a5f9f679a82f';
// Raw public elevation samples are unchanged. This bounded exterior depression
// uses source RL anchors with fitted connections; its exact plan is estimated.
export function campusTerrainHeight(x,z){return oldMainEntryHeight(x,z)??baselineTerrain(x,z);}
