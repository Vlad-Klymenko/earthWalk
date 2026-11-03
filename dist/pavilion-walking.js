import {pavilionGeometry} from './pavilion-data.js?v=fbfc5011f3c1';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=fbfc5011f3c1';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
