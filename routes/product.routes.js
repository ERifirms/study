const express = require("express");
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const upload = require("../config/multer");
const { validateProduct } = require("../middlewares/validateSchemas");
const fs = require("fs");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ data: products });
});

router.post(
  "/",
  upload.array("image", 5),
  validateProduct,
  async (req, res) => {
    try {
      const images = req.files.map((file) => ({
        url: file.path,
        filename: file.filename,
      }));
      const { title, price, location, description, category } = req.body;
      let newcategory = await Category.findOne({ name: category });

      if (!newcategory) {
        newcategory = new Category({ name: category });
        await newcategory.save();
      }

      const product = new Product({
        title: title,
        price: price,
        location: location,
        description: description,
        category: newcategory._id,
      });
      product.images = images;

      await product.save();

      res.status(201).json({
        data: product,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

router.put("/:id", upload.array("image", 5), async (req, res) => {
  const { title, price, location, description } = req.body;
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, {
    title: title,
    price: price,
    location: location,
    description: description,
  });

  if (req.files && req.files.length > 0) {
    product.images.forEach((image) => {
      fs.unlinkSync(image.url, (err) => console.log(err));
    });

    const images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));
    product.images = images;
    await product.save();
  }
  res.json({
    data: product,
  });
});

router.delete("/:id", upload.array("image", 5), async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (product.images.length > 0) {
    product.images.forEach((image) => {
      fs.unlinkSync(image.url, (err) => console.log(err));
    });
  }

  await product.deleteOne();

  res.status(200).json({
    msg: "Deleted successfully",
  });
});

module.exports = router;
