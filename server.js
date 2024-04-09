const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = 3005;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const initserver = async () => {
  await mongoose.connect(process.env.DBURL);
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

initserver();
