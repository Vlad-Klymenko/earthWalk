import {pavilionGeometry} from './pavilion-data.js?v=edb7a7e79d1b';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=edb7a7e79d1b';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
