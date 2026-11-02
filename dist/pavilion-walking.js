import {pavilionGeometry} from './pavilion-data.js?v=382061cd44e1';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=382061cd44e1';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
