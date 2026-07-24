const fs = require('fs');
const img = fs.readFileSync('src/media/logo-volcan.png');
const b64 = img.toString('base64');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 161 161">
  <!-- The image is 386x161. The triangle is on the left (approx 161x161). -->
  <image href="data:image/png;base64,${b64}" width="386" height="161" x="0" y="0" />
</svg>`;
fs.writeFileSync('public/favicon.svg', svg);
console.log('Done SVG crop!');
