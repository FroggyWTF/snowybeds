const generateImage = require('./generateImage');

module.exports = async (req, res) => {
  if (!req.query.hash || !req.query.id) return res.status(400).send('No.');
  return generateImage(req.query.id, req.query.hash).then(async (image) => {
    res.status(200).setHeader('Content-Type', 'image/png').send(await image.toBuffer('image/png'));
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).send(err);
  });
};
