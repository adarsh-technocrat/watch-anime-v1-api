const express = require("express");

const app = express();

require("dotenv").config({ path: "config/config.env" });

// using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// importing [Routes]
const animeRoutes = require("./routes/anime");

// using  [Routes]
app.use(animeRoutes);

module.exports = app;
