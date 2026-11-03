import {campusTerrainHeight as existingTerrain} from './electrical-landscape.js?v=bc9eb748a7cf';
import {spiralGroundHeight} from './spiral-data.js?v=bc9eb748a7cf';

// The source NSW grid is unchanged. Only the explicitly bounded Grad Shop
// lower passage / approach is reconstructed beneath the coarse terrain.
export function campusTerrainHeight(x,z){return spiralGroundHeight(x,z)??existingTerrain(x,z);}
