const Places = require("../models/Places");

exports.findAll = (req, res) => {
  Places.find()
    .then(codes => {
      res.send(codes);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};
