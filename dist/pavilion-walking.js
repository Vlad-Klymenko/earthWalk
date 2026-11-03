import {pavilionGeometry} from './pavilion-data.js?v=41994a53b8ae';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=41994a53b8ae';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
