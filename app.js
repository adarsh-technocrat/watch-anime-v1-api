const express = require("express");

const app = express();

require("dotenv").config({ path: "config/config.env" });

// using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
