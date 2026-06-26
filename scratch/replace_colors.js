const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../frontend/src/pages/Admin.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  // Recharts & Hardcoded Color replacements
  ['fill="#B2845E"', 'fill="#684036"'],
  ["['#D3A784', '#B2845E', '#8C5A3C', '#3A332E', '#374151']", "['#D3A784', '#684036', '#9E8B7D', '#231F20', '#555555']"],
  ["color_secundario || '#B2845E'", "color_secundario || '#684036'"],
  ["border: '1px solid #E5DCD3'", "border: '1px solid #9E8B7D'"],
  
  // Magma mapping
  ["volcan-magma", "volcan-clay"],

  // Sand background & border mappings
  ["bg-volcan-sand/50", "bg-volcan-taupe/15"],
  ["bg-volcan-sand/30", "bg-volcan-taupe/10"],
  ["bg-volcan-sand/40", "bg-volcan-taupe/15"],
  ["bg-volcan-sand", "bg-volcan-taupe/15"],
  ["border-volcan-sand", "border-volcan-taupe/20"],
  ["divide-volcan-sand", "divide-volcan-taupe/20"],
  ["placeholder-volcan-sand/30", "placeholder-volcan-taupe/40"],
  
  // Sand text mappings (used on dark bg in admin login / footer)
  ["text-volcan-sand/70", "text-volcan-cream/70"],
  ["text-volcan-sand/40", "text-volcan-taupe/40"],
  ["text-volcan-sand", "text-volcan-cream"],
  
  // Stone hover / background mappings
  ["bg-volcan-stone/40", "bg-volcan-taupe/25"],
  ["bg-volcan-stone/30", "bg-volcan-taupe/15"],
  ["bg-volcan-stone/20", "bg-volcan-taupe/10"],
  ["bg-volcan-stone/10", "bg-volcan-taupe/10"],
  ["hover:bg-volcan-stone/20", "hover:bg-volcan-taupe/15"],
  ["hover:bg-volcan-stone/30", "hover:bg-volcan-taupe/20"],
  ["hover:bg-volcan-stone", "hover:bg-volcan-taupe/20"],
  ["bg-volcan-stone/80", "bg-volcan-taupe/80"],
  ["bg-volcan-stone", "bg-volcan-taupe/20"],
  ["border-volcan-stone/50", "border-volcan-taupe/30"],
  ["border-volcan-stone/30", "border-volcan-taupe/20"],
  ["border-volcan-stone", "border-volcan-taupe/20"],
  
  // Stone text mappings (primary dark text or secondary labels)
  ["text-volcan-stone/85", "text-volcan-night/85"],
  ["text-volcan-stone/80", "text-volcan-night/85"],
  ["text-volcan-stone/75", "text-volcan-night/80"],
  ["text-volcan-stone/70", "text-volcan-taupe"],
  ["text-volcan-stone/60", "text-volcan-taupe"],
  ["text-volcan-stone/50", "text-volcan-taupe"],
  ["text-volcan-stone/40", "text-volcan-taupe/70"],
  ["text-volcan-stone/30", "text-volcan-taupe/40"],
  ["text-volcan-stone", "text-volcan-night"],
];

for (const [oldVal, newVal] of replacements) {
  content = content.split(oldVal).join(newVal);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Admin.tsx updated successfully via Node.js!');
