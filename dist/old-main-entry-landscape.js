import {campusTerrainHeight as baselineTerrain} from './spiral-landscape.js?v=b468e6aa825e';
import {oldMainEntryHeight} from './old-main-entry-data.js?v=b468e6aa825e';
// Raw public elevation samples are unchanged. This bounded exterior depression
// uses source RL anchors with fitted connections; its exact plan is estimated.
export function campusTerrainHeight(x,z){return oldMainEntryHeight(x,z)??baselineTerrain(x,z);}
