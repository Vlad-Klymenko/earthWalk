import {pavilionGeometry} from './pavilion-data.js?v=e438308695cd';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=e438308695cd';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
