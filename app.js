const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect("mongodb://127.0.0.1/study", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/users", require());
app.use("/products", require("./routes/product.routes"));
app.use("/category", require("./routes/category.routes"));
app.use("/", require("./routes/card.routes"));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
