import {pavilionGeometry} from './pavilion-data.js?v=85dc72730a69';
import {PAVILION_BALCONY,PAVILION_LANDING} from './pavilion-parts.js?v=85dc72730a69';
export function pavilionDeckPatches(g=pavilionGeometry()){
 return [...PAVILION_BALCONY,...PAVILION_LANDING].map(p=>({...p,minimumY:g.floorRL-.42,heightAt:()=>g.floorRL+.02}));
}
