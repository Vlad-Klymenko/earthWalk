import {pavilionGeometry} from './pavilion-data.js?v=dfa1c50ac01f';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=dfa1c50ac01f';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
