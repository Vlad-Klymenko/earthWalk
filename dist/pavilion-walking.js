import {pavilionGeometry} from './pavilion-data.js?v=0ec802769c04';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=0ec802769c04';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
