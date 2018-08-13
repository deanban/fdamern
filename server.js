const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const index = require("./routes/api/v1/index");
const geocode = require("./routes/api/v1/geocode");
// const places = require("./routes/api/v1/places");
const db = require("./db/config/keys").mongoURI;

const app = express();

app.get("/", (req, res) => {
  res.send("hello world!");
});

mongoose
  .connect(db)
  .then(() => console.log("mongodb connection success"))
  .catch(error => console.log(error));

app.use(cors());
app.use("/api/v1", index);
app.use("/api/v1", geocode);
// app.use("/api/v1", places);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Node Port is on ${port}`));
