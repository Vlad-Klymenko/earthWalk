import {pavilionGeometry} from './pavilion-data.js?v=ef86122637ee';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=ef86122637ee';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
