const express = require("express");
const Category = require("../models/category.model");
const router = express.Router();

router.get("/", async (req, res) => {
  const category = await Category.find();
  res.status(200).json({ data: category });
});

module.exports = router;
