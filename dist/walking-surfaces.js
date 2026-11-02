// Select only surfaces reachable from the caller's current vertical layer.
// Raised decks can share the same X/Z area with a walkable ground arcade.
export function walkingSurfaceHeight(base,patches,x,z,referenceY,inside){
 let height=base;
 for(const patch of patches){
  if(patch.minimumY!==undefined&&referenceY<patch.minimumY)continue;
  if(inside(x,z,patch.points)&&!(patch.holes||[]).some(h=>inside(x,z,h)))height=Math.max(height,patch.heightAt(x,z));
 }
 return height;
}
