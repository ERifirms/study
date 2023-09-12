const express = require("express");
const Cart = require("../models/card.model");
const Product = require("../models/product.model");
const router = express.Router();

router.get("/yellow-cart-count", async (req, res) => {
  try {
    const yellowCart = await Cart.findOne();
    if (!yellowCart) {
      return res.json({ count: 0 });
    }

    const totalYelloCart = yellowCart.items.reduce(
      (one, two) => one + two.quantity,
      0
    );

    res.json({ count: totalYelloCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
});

router.post("/add-cart", async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Produk tidak ditemukan" });
    }

    // Membuat atau memperbarui "Keranjang Kuning".
    let yellowCart = await Cart.findOne();

    if (!yellowCart) {
      yellowCart = new Cart({ items: [] });
    }

    // Mengecek apakah produk sudah ada di "Keranjang Kuning".
    const existingItem = yellowCart.items.find((item) =>
      item.productId.equals(productId)
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      yellowCart.items.push({ productId, quantity: quantity || 1 });
    }

    await yellowCart.save();

    res.json({ message: "Produk berhasil ditambahkan ke Keranjang Kuning" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
});

module.exports = router;
