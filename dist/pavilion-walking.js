import {pavilionGeometry} from './pavilion-data.js?v=26b79da8da82';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=26b79da8da82';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
