const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dataSchema = new Schema({
  origin: Map,
  destination: Map
});

module.exports = mongoose.model("Place", dataSchema);
