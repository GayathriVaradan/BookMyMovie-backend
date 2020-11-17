const express = require("express");
const cors = require("cors");
const app = express();
const stripe = require("stripe")(
  "sk_test_51HmbeNKaGaw448OOoJwRuxVMGhDw6q5SaB0jVgJLdkZdqGOFDKad2A0oYNHncAJEwH83FPlFrKIWgFGHttjDIbBE00qTpm3BZ2"
);
const uuid = require("uuid/v4");
app.use(express.json({ limit: "50mb" }));
app.use(cors());
const movies = require("./controllers/movie-controller");
const theaters = require("./controllers/theater-controller");
app.use("/api/v1/movies", movies);
app.use("/api/v1/theaters", theaters);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/payment", async (req, res) => {
  const {
    product,
    token,
    selectedMovie,
    selectedDate,
    selectedTheater,
    selectedShow,
    selectedSeats,
  } = req.body;
  console.log("product", product);
  console.log("price", product.price);
  console.log(selectedMovie.title, selectedSeats);
  const idempotencyKey = uuid();
  return await stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "SEK",
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
          selectedMovie: selectedMovie.title,
          selectedDate: selectedDate,
          selectedTheater: selectedTheater.theaterName,
          selectedShow: selectedShow.show,
          selectedSeats: selectedSeats,
        },
        { idempotencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});
// eslint-disable-next-line no-console
module.exports = app;
