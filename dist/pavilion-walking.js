import {pavilionGeometry} from './pavilion-data.js?v=1815a9b0ff0f';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=1815a9b0ff0f';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
