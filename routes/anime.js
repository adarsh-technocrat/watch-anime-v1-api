const express = require("express");
const { getAnimeDetails } = require("../controllers/getAnimeDetailsController");
const { initialRoute } = require("../controllers/initialRouteController");
const { searchAnime } = require("../controllers/searchAnimeController");

const router = express.Router();

router.route("/").get(initialRoute);
router.route("/search").get(searchAnime);
router.route("/details/:slug").get(getAnimeDetails);

module.exports = router;
