import {pavilionGeometry} from './pavilion-data.js?v=c3b5fc78771f';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=c3b5fc78771f';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
