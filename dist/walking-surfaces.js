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

// Suspended steps can cross an independently mapped ground-level stair.
// Only explicit priority layers participate; all other campus decks retain
// their existing resolution and minimum-height guard.
export function priorityWalkingSurface(patches,x,z,referenceY,inside){
 let height=-Infinity;
 for(const patch of patches){
  if(!patch.priority||(patch.minimumY!==undefined&&referenceY<patch.minimumY))continue;
  if(inside(x,z,patch.points)&&!(patch.holes||[]).some(h=>inside(x,z,h)))height=Math.max(height,patch.heightAt(x,z));
 }
 return Number.isFinite(height)?height:undefined;
}

// Keep the selected vertical layer when a landmark's safe X/Z arrival is
// cached. A first-floor court can have occupied rooms at the same X/Z below.
export function walkingDestination(landmark,point=landmark.walkPoint??landmark.teleport??landmark){
 return {x:point.x,z:point.z,walkFloor:landmark.walkFloor??point.walkFloor};
}
