import {campusTerrainHeight as existingTerrain} from './electrical-landscape.js?v=e438308695cd';
import {spiralGroundHeight} from './spiral-data.js?v=e438308695cd';

// The source NSW grid is unchanged. Only the explicitly bounded Grad Shop
// lower passage / approach is reconstructed beneath the coarse terrain.
export function campusTerrainHeight(x,z){return spiralGroundHeight(x,z)??existingTerrain(x,z);}
