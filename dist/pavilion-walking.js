import {pavilionGeometry} from './pavilion-data.js?v=3f92c7de99b8';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=3f92c7de99b8';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
