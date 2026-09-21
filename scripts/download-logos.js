const fs = require('fs');
const path = require('path');

const logos = [
  { id: 'kautilya', ext: 'webp', url: 'https://kautilyavidyalaya.edu.in/wp-content/uploads/2025/09/Logo.png.webp' },
  { id: 'bgsnps', ext: 'png', url: 'https://bgsnps.edu.in/wp-content/uploads/2023/11/BGSNPS_500x500.png' },
  { id: 'vishwavidyapeeth', ext: 'webp', url: 'https://vishwavidyapeeth.edu.in/wp-content/uploads/2025/09/VVP-NEW-LOGO-scaled-1.webp' },
  { id: 'kidscastle', ext: 'png', url: 'https://kidscastlepreschool.com/wp-content/uploads/2026/06/Logo-1-1-removebg-preview.png' },
  { id: 'iamyello', ext: 'svg', url: 'https://iamyello.com/wp-content/uploads/YELLO-Logo.svg' },
  { id: 'pepschool', ext: 'png', url: 'http://static1.squarespace.com/static/587c439629687f8f4bb0fc90/t/5bfe8bdcaa4a997165e6702c/1543408606278/pep+logo+square.png' },
  { id: 'maplebear', ext: 'png', url: 'https://www.maplebearsouthasia.com/wp-content/themes/maplebear_CA/images/new_logo.png' },
  { id: 'kangarookids', ext: 'svg', url: 'https://llplbucket.s3.amazonaws.com/KK-Prod-images/Static+images/assets/img/head/kangarookids-logo.svg' },
  { id: 'klay', ext: 'png', url: 'https://s3.ap-south-1.amazonaws.com/assets.klayschools.com/wp-content/uploads/2024/02/03061842/cropped-KLAY-PRESCHOOLS-AND-DAYCARE-1-1.png' },
  { id: 'littlemillennium', ext: 'png', url: 'https://www.littlemillennium.com/wp-content/uploads/2025/09/logo.png' },
  { id: 'ampasishya', ext: 'png', url: 'https://ampasishya.com/wp-content/uploads/2024/05/sishya-logo.png' },
  { id: 'mylittleberries', ext: 'png', url: 'https://mylittleberries.in/img/logo1-304vqrnv7ccxz47xp4tw5m.png' },
  { id: 'timekids', ext: 'png', url: 'https://timekidspreschoolsannanagar.com/wp-content/uploads/2025/04/TK.png' },
];

const outDir = path.resolve(__dirname, '../public/images/logos');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function download() {
  for (const item of logos) {
    const dest = path.join(outDir, `${item.id}.${item.ext}`);
    console.log(`Downloading ${item.id} from ${item.url}...`);
    try {
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
          'Referer': item.url
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(dest, buffer);
      console.log(`[OK] Saved ${item.id}.${item.ext} (${buffer.length} bytes)`);
    } catch (e) {
      console.error(`[FAIL] ${item.id}:`, e.message);
    }
  }
}

download();
