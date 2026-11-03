import {campusTerrainHeight as existingTerrain} from './electrical-landscape.js?v=08020e70591f';
import {spiralGroundHeight} from './spiral-data.js?v=08020e70591f';

// The source NSW grid is unchanged. Only the explicitly bounded Grad Shop
// lower passage / approach is reconstructed beneath the coarse terrain.
export function campusTerrainHeight(x,z){return spiralGroundHeight(x,z)??existingTerrain(x,z);}
