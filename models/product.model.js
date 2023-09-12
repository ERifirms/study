const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: String,
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  price: String,
  location: String,
  description: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Product", productSchema);
