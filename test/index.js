/* eslint-disable no-console */
const fastify = require('fastify')({ logger: false });
const generateImage = require('../api/generateImage');

fastify.get('/', async (req, res) => {
  generateImage('4940371919752396480', '4c71f5768c571968ef597a552e877f98').then((image) => {
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
