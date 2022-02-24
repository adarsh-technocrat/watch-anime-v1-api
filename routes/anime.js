const express = require("express");
const { initialRoute } = require("../controllers/initialRouteController");
const { searchAnime } = require("../controllers/searchAnimeController");

const router = express.Router();

router.route("/").get(initialRoute);
router.route("/search").get(searchAnime);

module.exports = router;
