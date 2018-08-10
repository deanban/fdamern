const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dataSchema = new Schema({
  from: String,
  to: String
});

module.exports = mongoose.model("Geocode", dataSchema);
