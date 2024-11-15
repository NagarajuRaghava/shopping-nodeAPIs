const mongoose = require("mongoose");
const uri =
  "mongodb+srv://NagarajuRaghava:nagraj11@cluster0.xegz9.mongodb.net/";
const db_name = "ecomm";
const Product = require("./shop-product");
const cors = require("cors");

mongoose
  .connect(uri, { dbName: db_name })
  .then(() => {
    console.log("mongo db connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

// mongoose connected to db
mongoose.connection.on("connected", () => {
  console.log("mongoose connected to db");
});
mongoose.connection.on("error", (err) => {
  console.log(err.message);
});
mongoose.connection.on("disconnected", () => {
  console.log("connection disconnected");
});

const express = require("express");
//initializing express app
const app = express();
app.use(cors());
// URI connection
app.listen(3000, () => {
  console.log("server listening on port 3000");
});

//importing the schema model
const ProductCategory = require("./models");
const SignUp = require("./signup-model");
//parsing the data when being communicated from express server
const bodyparser = require("body-parser");
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.post("/user", (request, response) => {
  (email = request.body.email), (password = request.body.password);

  let newSignUp = new SignUp({
    email: email,
    password: password,
  });

  newSignUp
    .save()
    .then((user) => {
      response.send(user);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

app.post("/signin", async (request, response) => {
  try {
    const email = request.body.email;
    const password = request.body.password;
    const users = await SignUp.findOne({ email, password });
    response.json(users);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

app.get("/shop", async (request, response) => {
  try {
    const categories = await ProductCategory.find();
    response.json(categories);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

app.get("/product", async (request, response) => {
  try {
    const products = await Product.find();
    response.json(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// node js process to get exit
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
