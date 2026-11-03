import {pavilionGeometry} from './pavilion-data.js?v=bc9eb748a7cf';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=bc9eb748a7cf';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
