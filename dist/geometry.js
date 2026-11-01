// Shared world-metre frame for rotated pitches, courts and neighbouring roofs.
export function orientedFrame(points,axis=null){
  if(!axis){
    let longest=0;
    for(let i=0;i<points.length;i++){
      const a=points[i],b=points[(i+1)%points.length],length=Math.hypot(b.x-a.x,b.z-a.z);
      if(length>longest){longest=length;axis={x:(b.x-a.x)/length,z:(b.z-a.z)/length};}
    }
  }
  const length=Math.hypot(axis.x,axis.z),sign=axis.z<0?-1:1;
  const v={x:axis.x/length*sign,z:axis.z/length*sign},u={x:v.z,z:-v.x};
  const us=points.map(p=>p.x*u.x+p.z*u.z),vs=points.map(p=>p.x*v.x+p.z*v.z);
  const minU=Math.min(...us),maxU=Math.max(...us),minV=Math.min(...vs),maxV=Math.max(...vs);
  const cu=(minU+maxU)/2,cv=(minV+maxV)/2;
  return {x:cu*u.x+cv*v.x,z:cu*u.z+cv*v.z,u,v,width:maxU-minU,length:maxV-minV};
}

export function framePoint(frame,x,z){return {x:frame.x+frame.u.x*x+frame.v.x*z,z:frame.z+frame.u.z*x+frame.v.z*z};}

export function clipFrameStrip(points,frame,lower,upper){
  const value=p=>(p.x-frame.x)*frame.v.x+(p.z-frame.z)*frame.v.z;
  const cut=(polygon,bound,greater)=>{
    if(!polygon.length)return [];
    const output=[];let previous=polygon.at(-1),pv=value(previous),wasInside=greater?pv>=bound:pv<=bound;
    for(const current of polygon){
      const cv=value(current),inside=greater?cv>=bound:cv<=bound;
      if(inside!==wasInside){const t=(bound-pv)/(cv-pv);output.push({x:previous.x+(current.x-previous.x)*t,z:previous.z+(current.z-previous.z)*t});}
      if(inside)output.push(current);
      previous=current;pv=cv;wasInside=inside;
    }
    return output;
  };
  return cut(cut(points,lower,true),upper,false);
}

export function frameRectangle(frame,width,length,x=0,z=0){
  return [[x-width/2,z-length/2],[x+width/2,z-length/2],[x+width/2,z+length/2],[x-width/2,z+length/2]].map(([u,v])=>framePoint(frame,u,v));
}

export function roundedFrameRectangle(frame,width,length,radius,x=0,z=0){
  const points=[];
  for(const [cx,cz,start] of [[width/2-radius,length/2-radius,0],[-width/2+radius,length/2-radius,Math.PI/2],[-width/2+radius,-length/2+radius,Math.PI],[width/2-radius,-length/2+radius,Math.PI*1.5]]){
    for(let i=0;i<=6;i++){const angle=start+i/6*Math.PI/2;points.push(framePoint(frame,x+cx+Math.cos(angle)*radius,z+cz+Math.sin(angle)*radius));}
  }
  return points;
}
