const express = require("express");
const router = express.Router();
const recalls = require("../../../db/controllers/recall_controller");

router.get("/index", (req, res) => {
  res.json({
    msg: "index works"
  });
});
router.get("/recalls", recalls.findAll);

module.exports = router;
