import {campusTerrainHeight as existingTerrain} from './electrical-landscape.js?v=edb7a7e79d1b';
import {spiralGroundHeight} from './spiral-data.js?v=edb7a7e79d1b';

// The source NSW grid is unchanged. Only the explicitly bounded Grad Shop
// lower passage / approach is reconstructed beneath the coarse terrain.
export function campusTerrainHeight(x,z){return spiralGroundHeight(x,z)??existingTerrain(x,z);}
