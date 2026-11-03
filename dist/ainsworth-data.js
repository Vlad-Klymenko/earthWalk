import { CAMPUS as SOURCE } from './campus-data.js?v=ef86122637ee';
import { orientedFrame, framePoint, frameRectangle } from './geometry.js?v=ef86122637ee';
import { buildingBase, terrainHeight } from './terrain.js?v=ef86122637ee';

export const AINSWORTH_ID='osm-way-616805099';
export const AINSWORTH_HEIGHT_REPORT={title:'J17 / J18 · JBA response to submissions, March 2013',url:'https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-5572%2120190227T040752.811+GMT',pdfPage:1,linkLabel:'Height source · planning response p. 1',maximumRL:63.88,existingLiftRL:62.22};
export const AINSWORTH_DESIGN={title:'Bates Smart · J17 / J18 design report, October 2012',url:'https://majorprojects.planningportal.nsw.gov.au/prweb/PRRestService/mp/01/getContent?AttachRef=SSD-5572%2120190227T040746.402+GMT',facadePage:25,sitePage:28,groundPage:29};
export const AINSWORTH_FRAME=orientedFrame(SOURCE.buildings.find(b=>b.id===AINSWORTH_ID).points,{x:-.16,z:1});

// The maximum RL is planning evidence. All smaller component dimensions,
// façade subdivisions and landscape positions below are reconstructions.
export function ainsworthGeometry(b){
  const frame=AINSWORTH_FRAME,base=buildingBase(b.points),local=p=>({u:(p.x-frame.x)*frame.u.x+(p.z-frame.z)*frame.u.z,v:(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z});
  const bodyRoofRL=57.88,soffitRL=40.5,screenBottomRL=40.72,splitV=-7.7;
  const northRecess={points:frameRectangle(frame,46,3.8,0,-27.6),reconstructed:true};
  const courtRecess={points:frameRectangle(frame,25,3,-10,-9.2),reconstructed:true};
  const canopy={points:frameRectangle(frame,44.4,5.3,0,-28.3),heightAt:p=>40.72+Math.max(0,Math.min(1,(-local(p).v-25.65)/5.3))*.3,reconstructed:true};
  const plant={points:frameRectangle(frame,10,26,13,10),topRL:AINSWORTH_HEIGHT_REPORT.maximumRL,reconstructed:true};
  const lift={points:frameRectangle(frame,4.2,5.4,8,-16),topRL:AINSWORTH_HEIGHT_REPORT.existingLiftRL,reconstructed:true};
  const rows=Array.from({length:5},(_,i)=>({low:screenBottomRL+i*(bodyRoofRL-screenBottomRL)/5,high:screenBottomRL+(i+1)*(bodyRoofRL-screenBottomRL)/5-.16}));
  const northBays=[[-20.8,-1.3,3],[9,20.9,2]].flatMap(([left,right,count])=>Array.from({length:count},(_,i)=>({left:left+(right-left)*i/count+.55,right:left+(right-left)*(i+1)/count-.55})));
  const columns=[...[-18,-8,2,12,19].map(u=>[u,-27.0]),...[-19,-10,-1].map(u=>[u,-9.6])].map(([u,v])=>({...framePoint(frame,u,v),u,v,radius:.3,reconstructed:true}));
  const trees=[[-13,5,14],[-9,21,13]].map(([u,v,height])=>({...framePoint(frame,u,v),u,v,height,form:'rupert-courtyard',reconstructed:true}));
  const beds=[[-.4,4.5],[14.5,7.0]].map(([v,length])=>({points:frameRectangle(frame,.9,length,1.17,v),reconstructed:true}));
  const arrival=framePoint(frame,-25,13),target=framePoint(frame,8,8),northArrival=framePoint(frame,4,-57),northTarget=framePoint(frame,4,-23),stairArrival=framePoint(frame,6.4,-29.9),stairTarget=framePoint(frame,24,-29.7);
  const heading=(a,c)=>Math.atan2(c.x-a.x,a.z-c.z);
  return {frame,base,local,splitV,bodyRoofRL,soffitRL,screenBottomRL,northRecess,courtRecess,canopy,plant,lift,rows,northBays,columns,trees,beds,arrival,target,heading:heading(arrival,target),northArrival,northTarget,northHeading:heading(northArrival,northTarget),stairArrival,stairTarget,stairHeading:heading(stairArrival,stairTarget),floorAt:p=>terrainHeight(p.x,p.z)+.22,theatre:{center:framePoint(frame,11,12),radius:7.1,bottomRL:33.5,topRL:39.8,reconstructed:true},reconstructed:true};
}
export function inAinsworthGarden(x,z){const f=AINSWORTH_FRAME,u=(x-f.x)*f.u.x+(z-f.z)*f.u.z,v=(x-f.x)*f.v.x+(z-f.z)*f.v.z;return u>-23&&u<2&&v>-8&&v<29;}
