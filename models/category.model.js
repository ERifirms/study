const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    enum: ["pakaian", "elektronik", "mananan", "gamers"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
