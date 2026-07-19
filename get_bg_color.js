const sharp = require('sharp');
async function run() {
  const img = sharp('public/01.jpg');
  const metadata = await img.metadata();
  const raw = await img.extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer();
  console.log('01.jpg top-left pixel RGB:', raw[0], raw[1], raw[2]);
  
  const img2 = sharp('public/02.jpg');
  const raw2 = await img2.extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer();
  console.log('02.jpg top-left pixel RGB:', raw2[0], raw2[1], raw2[2]);
}
run();
