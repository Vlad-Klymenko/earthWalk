import {campusTerrainHeight as baselineTerrain} from './spiral-landscape.js?v=2345090190a8';
import {oldMainEntryHeight} from './old-main-entry-data.js?v=2345090190a8';
// Raw public elevation samples are unchanged. This bounded exterior depression
// uses source RL anchors with fitted connections; its exact plan is estimated.
export function campusTerrainHeight(x,z){return oldMainEntryHeight(x,z)??baselineTerrain(x,z);}
