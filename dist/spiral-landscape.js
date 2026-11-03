import {campusTerrainHeight as existingTerrain} from './electrical-landscape.js?v=eb4acc4e0f1c';
import {spiralGroundHeight} from './spiral-data.js?v=eb4acc4e0f1c';

// The source NSW grid is unchanged. Only the explicitly bounded Grad Shop
// lower passage / approach is reconstructed beneath the coarse terrain.
export function campusTerrainHeight(x,z){return spiralGroundHeight(x,z)??existingTerrain(x,z);}
