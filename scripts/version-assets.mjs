import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

// A single content revision across the ESM graph prevents a browser from mixing
// an old geometry module with a newly published scene. No bundler is required.
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
  const file=path.join(dir,entry.name);
  return entry.isDirectory()?walk(file):/\.(js|css)$/.test(entry.name)?[file]:[];
});
const files=[...walk(root),path.join(root,'index.html')].sort();
const canonical=text=>text.replace(/(\.(?:js|css))\?v=[a-f0-9]{12}(?=['"])/g,'$1');
const sources=files.map(file=>({file,text:canonical(fs.readFileSync(file,'utf8'))}));
const hash=crypto.createHash('sha256');
for(const source of sources)hash.update(path.relative(root,source.file)+'\0'+source.text+'\0');
const revision=hash.digest('hex').slice(0,12);
for(const {file,text} of sources){
  const versioned=text.replace(/(['"])(\.\.?\/[^'"\s?]+\.(?:js|css))\1/g,(_,quote,url)=>`${quote}${url}?v=${revision}${quote}`);
  fs.writeFileSync(file,versioned);
}
console.log(`Browser asset revision ${revision}`);
