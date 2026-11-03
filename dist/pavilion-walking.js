import {pavilionGeometry} from './pavilion-data.js?v=4f63f148a8ac';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=4f63f148a8ac';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
