import {pavilionGeometry} from './pavilion-data.js?v=93d09dddcf6c';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=93d09dddcf6c';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
