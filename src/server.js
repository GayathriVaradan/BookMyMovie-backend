const express = require("express");
const cors = require("cors");
const app = express();
const stripe = require("stripe")(
  "sk_test_51HmbeNKaGaw448OOoJwRuxVMGhDw6q5SaB0jVgJLdkZdqGOFDKad2A0oYNHncAJEwH83FPlFrKIWgFGHttjDIbBE00qTpm3BZ2"
);
const { v4: uuidv4 } = require("uuid");
app.use(express.json({ limit: "50mb" }));
app.use(cors());
const movies = require("./controllers/movie-controller");
const theaters = require("./controllers/theater-controller");
const seatsUnavailable = require("./controllers/seatsUnavailable-controller");
app.use("/api/v1/movies", movies);
app.use("/api/v1/theaters", theaters);
app.use("/api/v1/seatsUnavailable", seatsUnavailable);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/payment", async (req, res) => {
  const { price, token, selectedMovie } = req.body;
  //console.log("price", price);
  const idempotency_key = uuidv4();

  try {
    // 1. Create checkout session
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
        currency: "USD",
        customer: customer.id,
        description: selectedMovie.title,
      },
      {
        idempotency_key,
      }
    );

    //console.log("charge", JSON.stringify(charge));
    res.status(200).json({ status: "success", charge });
  } catch (err) {
    console.log("error : ", err);
  }
});
// return stripe.customers
//   .create({
//     email: token.email,
//     source: token.id,
//   })
//   .then((customer) => {
//     stripe.charges.create(
//       {
//         amount: product.price * 100,
//         currency: "SEK",
//         customer: customer.id,
//         receipt_email: token.email,
//         description: product.name,
//         selectedMovie: selectedMovie.title,
//         selectedDate: selectedDate,
//         selectedTheater: selectedTheater.theaterName,
//         selectedShow: selectedShow.show,
//         selectedSeats: selectedSeats,
//       },
//       { idempotencyKey }
//     );
//   })
//   .then((result) => res.status(200).json(result))
//   .catch((err) => console.log(err));

// eslint-disable-next-line no-console
module.exports = app;
