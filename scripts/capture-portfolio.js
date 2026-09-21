const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targets = [
  { id: 'kautilya', name: 'Kautilya Vidyalaya', url: 'https://kautilyavidyalaya.edu.in/' },
  { id: 'bgsnps', name: 'BGS National Public School', url: 'https://bgsnps.edu.in/' },
  { id: 'vishwavidyapeeth', name: 'Vishwa Vidyapeeth', url: 'https://vishwavidyapeeth.edu.in/' },
  { id: 'kidscastle', name: 'Kids Castle Preschool', url: 'https://kidscastlepreschool.com/' },
  { id: 'iamyello', name: 'Yello Life', url: 'https://iamyello.com/' },
  { id: 'pepschool', name: 'PEP School V2', url: 'https://www.pepschoolv2.com/' },
  { id: 'maplebear', name: 'Maple Bear Canadian Preschool', url: 'https://www.maplebearsouthasia.com/jubileehills/' },
  { id: 'kangarookids', name: 'Kangaroo Kids International', url: 'https://www.kangarookids.in/' },
  { id: 'klay', name: 'KLAY Prep Schools and DayCare', url: 'https://klay.co.in/foundational-development-program/chennai/anna-nagar/' },
  { id: 'littlemillennium', name: 'Little Millennium', url: 'https://www.littlemillennium.com/' },
  { id: 'ampasishya', name: 'Ampa Sishya School', url: 'https://ampasishya.com/' },
  { id: 'mylittleberries', name: 'My Little Berries', url: 'https://mylittleberries.in/' },
  { id: 'timekids', name: 'T.I.M.E. Kids Preschool', url: 'https://timekidspreschoolsannanagar.com/' },
];

const outDir = path.resolve(__dirname, '../public/images/portfolio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const chromeBin = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

for (const t of targets) {
  const dest = path.join(outDir, `${t.id}.png`);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
    console.log(`[SKIP] Already captured: ${t.id}`);
    continue;
  }
  console.log(`[START] Capturing ${t.name} (${t.url})...`);
  try {
    const cmd = `"${chromeBin}" --headless=new --disable-gpu --no-first-run --no-default-browser-check --user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36" --window-size=1440,900 --virtual-time-budget=7000 --hide-scrollbars --screenshot="${dest}" "${t.url}"`;
    execSync(cmd, { timeout: 25000, stdio: 'pipe' });
    const sz = fs.existsSync(dest) ? fs.statSync(dest).size : 0;
    console.log(`[OK] Saved ${t.id}.png (${sz} bytes)`);
  } catch (err) {
    console.error(`[FAIL] Error capturing ${t.id}:`, err.message);
  }
}

console.log('All captures complete!');
