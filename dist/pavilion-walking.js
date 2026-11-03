import {pavilionGeometry} from './pavilion-data.js?v=b468e6aa825e';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=b468e6aa825e';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
