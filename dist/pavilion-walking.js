import {pavilionGeometry} from './pavilion-data.js?v=e9883400adb4';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=e9883400adb4';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
