
const fs = require('fs');
const path = '/Users/z/.openclaw/workspace/projects/Switching-04/assets/index-CpvJSoev.js';
let content = fs.readFileSync(path, 'utf8');

const search = 'G=r==="out"?!0:H===100';
// Check if search string exists
if (!content.includes(search)) {
  console.error("Search string not found!");
  // Try to find if it was already modified or slightly different?
  // Previous grep found it.
  process.exit(1);
}

// Logic: G = (SumOut > 0) && (SumIn === 100)
// Variables: N (Out List), g (In List)
// Reduce logic: list.reduce((a,b)=>a+b.percentage,0)
const replacement = 'G=(N.reduce((a,b)=>a+b.percentage,0)>0)&&(g.reduce((a,b)=>a+b.percentage,0)===100)';

content = content.replace(search, replacement);

fs.writeFileSync(path, content);
console.log("Successfully replaced validation logic.");
