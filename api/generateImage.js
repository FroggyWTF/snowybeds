const Canvas = require('@napi-rs/canvas');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// eslint-disable-next-line no-async-promise-executor
module.exports = (id, hash) => new Promise(async (resolve, reject) => {
  try {
    const canvas = Canvas.createCanvas(240, 135);
    const context = canvas.getContext('2d');
    const template = await fs.readFileSync(path.join(__dirname, 'assets', 'template.png'));
    const templateImage = new Canvas.Image();
    templateImage.src = template;
    context.drawImage(templateImage, 0, 0, 240, 135);
    // eslint-disable-next-line consistent-return
    fetch(`https://cdn.discordapp.com/avatars/${id}/${hash}.png?size=128`).then(async (image) => {
      if (!image.ok) return reject(Error('Failed to get profile picture'));
      const profilePicture = new Canvas.Image();
      profilePicture.src = await image.buffer();
      context.drawImage(profilePicture, 88, 11, 64, 64);
      canvas.toBuffer('image/png');
      resolve(canvas);
    });
  } catch (err) {
    reject(err);
  }
});
