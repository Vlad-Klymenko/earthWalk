import {pavilionGeometry} from './pavilion-data.js?v=79caa9a39ff3';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=79caa9a39ff3';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
