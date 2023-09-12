const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User", // Jika Anda memiliki model User untuk mengidentifikasi pengguna.
  // },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Referensi ke model Produk.
      },
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
