const express = require("express");

const app = express();

app.use((req, res, nex) => {
  res.status(200).json({
    message: "Hello",
  });
});

module.exports = app;
