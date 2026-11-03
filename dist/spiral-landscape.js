import {campusTerrainHeight as existingTerrain} from './electrical-landscape.js?v=41994a53b8ae';
import {spiralGroundHeight} from './spiral-data.js?v=41994a53b8ae';

// The source NSW grid is unchanged. Only the explicitly bounded Grad Shop
// lower passage / approach is reconstructed beneath the coarse terrain.
export function campusTerrainHeight(x,z){return spiralGroundHeight(x,z)??existingTerrain(x,z);}
