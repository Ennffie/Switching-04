
const fs = require('fs');
const path = '/Users/z/.openclaw/workspace/projects/Switching-04/assets/index-CpvJSoev.js';
let content = fs.readFileSync(path, 'utf8');

// The current state after my previous fix
const search = 'G=r==="out"?H>0:H===100';

if (!content.includes(search)) {
  console.error("Search string not found!");
  console.log("Content around G=:", content.substring(content.indexOf("G="), content.indexOf("G=")+50));
  process.exit(1);
}

const replacement = 'G=(N.reduce((a,b)=>a+b.percentage,0)>0)&&(g.reduce((a,b)=>a+b.percentage,0)===100)';

content = content.replace(search, replacement);

fs.writeFileSync(path, content);
console.log("Successfully replaced validation logic.");
