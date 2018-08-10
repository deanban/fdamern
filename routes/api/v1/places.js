const express = require("express");
const router = express.Router();
const places = require("../../../db/controllers/places_controller");
// const cors = require("cors");

router.get("/place", (req, res) => {
  res.json({
    msg: "Places works"
  });
});
router.get("places", places.findAll);

module.exports = router;
