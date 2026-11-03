import {campusTerrainHeight as existingTerrain} from './electrical-landscape.js?v=5c6b85277d47';
import {spiralGroundHeight} from './spiral-data.js?v=5c6b85277d47';

// The source NSW grid is unchanged. Only the explicitly bounded Grad Shop
// lower passage / approach is reconstructed beneath the coarse terrain.
export function campusTerrainHeight(x,z){return spiralGroundHeight(x,z)??existingTerrain(x,z);}
