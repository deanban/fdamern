const Geocode = require("../models/Geocode");

exports.findAll = (req, res) => {
  Geocode.find()
    .then(codes => {
      res.send(codes);
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};
