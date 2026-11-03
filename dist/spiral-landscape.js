import {campusTerrainHeight as existingTerrain} from './electrical-landscape.js?v=b468e6aa825e';
import {spiralGroundHeight} from './spiral-data.js?v=b468e6aa825e';

// The source NSW grid is unchanged. Only the explicitly bounded Grad Shop
// lower passage / approach is reconstructed beneath the coarse terrain.
export function campusTerrainHeight(x,z){return spiralGroundHeight(x,z)??existingTerrain(x,z);}
