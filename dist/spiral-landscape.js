import {campusTerrainHeight as existingTerrain} from './electrical-landscape.js?v=73a8847b0449';
import {spiralGroundHeight} from './spiral-data.js?v=73a8847b0449';

// The source NSW grid is unchanged. Only the explicitly bounded Grad Shop
// lower passage / approach is reconstructed beneath the coarse terrain.
export function campusTerrainHeight(x,z){return spiralGroundHeight(x,z)??existingTerrain(x,z);}
