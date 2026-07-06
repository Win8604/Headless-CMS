const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '../assets/images');

const filesToOptimize = [
  'Main-Banner-1.png',
  'Main-Banner-2.png',
  'Main-Banner-3.png',
  'fpt-play-ngoai-hang-anh-desktop.png',
  'fpt-play-ngoai-hang-anh-mobile.png',
  'Wifi-7.png',
  'Bộ-Giải-Mã-FPT-Play-Box.png',
  'Giga-Desktop.png',
  'Giga-Mobile-1.png',
  'Giga-Mobile-2.png',
  'Sky-Desktop.png',
  'Sky-Mobile-1.png',
  'Sky-Mobile-2.png',
  'Meta-Desktop.png',
  'Meta-Mobile-1.png',
  'Meta-Mobile-2.png',
  'Combo-Giga-Desktop.png',
  'Combo-Giga-Mobile-1.png',
  'Combo-Giga-Mobile-2.png',
  'Combo-Sky-Desktop.png',
  'Combo-Sky-Mobile-1.png',
  'Combo-Sky-Mobile-2.png',
  'Combo-VVIP-Desktop.png',
  'Combo-VVIP-Mobile-1.png',
  'Combo-VVIP-Mobile-2.png'
];

async function run() {
  console.log('Starting image optimization and WebP conversion...');

  for (const filename of filesToOptimize) {
    const inputPath = path.join(IMAGES_DIR, filename);
    
    if (!fs.existsSync(inputPath)) {
      console.warn(`File ${filename} does not exist. Skipping.`);
      continue;
    }

    const ext = path.extname(filename);
    const basename = path.basename(filename, ext);
    const outputPath = path.join(IMAGES_DIR, `${basename}.webp`);

    console.log(`Processing: ${filename} ...`);

    try {
      let pipeline = sharp(inputPath);
      const metadata = await pipeline.metadata();

      // Limit max width to 1920px
      if (metadata.width > 1920) {
        pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
        console.log(` - Resized from width ${metadata.width}px to 1920px`);
      }

      // Convert to webp with 80% quality
      await pipeline
        .webp({ quality: 80 })
        .toFile(outputPath);

      const beforeStats = fs.statSync(inputPath);
      const afterStats = fs.statSync(outputPath);
      const savings = ((beforeStats.size - afterStats.size) / beforeStats.size * 100).toFixed(1);

      console.log(` - WebP successfully generated: ${basename}.webp`);
      console.log(` - Size before: ${(beforeStats.size / 1024).toFixed(1)} KB`);
      console.log(` - Size after: ${(afterStats.size / 1024).toFixed(1)} KB (Saved ${savings}%)`);
    } catch (err) {
      console.error(`Error processing ${filename}:`, err);
    }
  }

  console.log('Image optimization process complete.');
}

run();
