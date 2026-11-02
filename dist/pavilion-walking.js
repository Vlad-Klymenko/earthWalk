import {pavilionGeometry} from './pavilion-data.js?v=3d885f78072e';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=3d885f78072e';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
