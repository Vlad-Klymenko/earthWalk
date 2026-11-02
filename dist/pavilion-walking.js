import {pavilionGeometry} from './pavilion-data.js?v=ea018f24b958';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=ea018f24b958';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
