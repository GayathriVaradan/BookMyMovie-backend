const express = require('express');
const cors = require('cors');

const app = express();
const stripe = require('stripe')(
  'sk_test_51HmbeNKaGaw448OOoJwRuxVMGhDw6q5SaB0jVgJLdkZdqGOFDKad2A0oYNHncAJEwH83FPlFrKIWgFGHttjDIbBE00qTpm3BZ2'
);
const { v4: uuidv4 } = require('uuid');

app.use(express.json({ limit: '50mb' }));
app.use(cors());
const movies = require('./controllers/movie');
const theaters = require('./controllers/theater');
const seatsUnavailable = require('./controllers/seatsUnavailable');

app.use('/api/v1/movies', movies);
app.use('/api/v1/theaters', theaters);
app.use('/api/v1/seatsUnavailable', seatsUnavailable);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/payment', async (req, res) => {
  const { price, token, selectedMovie } = req.body;
  const idempotency_key = uuidv4();

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
      metadata: {
        userId: selectedMovie.title,
      },
    });
    const charge = await stripe.charges.create(
      {
        amount: price * 100,
        currency: 'USD',
        customer: customer.id,
        description: selectedMovie.title,
      },
      {
        idempotency_key,
      }
    );

    res.status(200).json({ status: 'success', charge });
  } catch (err) {
    res.json({ err });
  }
});
module.exports = app;
