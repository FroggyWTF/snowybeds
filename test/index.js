/* eslint-disable no-console */
const fastify = require('fastify')({ logger: false });
const generateImage = require('../api/generateImage');

fastify.get('/', async (req, res) => {
  generateImage('494037191975239680', '6f1621f2c949674e96b9be3f09d48b8d').then((image) => {
    res.status(200).type('image/png').send(image.toBuffer('image/png'));
  }).catch((err) => res.status(500).send(err));
});

fastify.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Listening on ${address}`);
});
