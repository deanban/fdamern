const express = require("express");
const mongoose = require("mongoose");
const index = require("./routes/api/v1/index");
const db = require("./db/config/keys").mongoURI;

const app = express();

app.get("/", (req, res) => {
  res.send("hello world!");
});

mongoose
  .connect(db)
  .then(() => console.log("mongodb connection success"))
  .catch(error => console.log(error));

app.use("/api/v1", index);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Node Port is on ${port}`));
