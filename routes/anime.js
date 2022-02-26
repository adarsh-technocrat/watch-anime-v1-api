const express = require("express");
const { getAnimeDetails } = require("../controllers/getAnimeDetailsController");
const {
  getAnimeEpisodeEmbededLink,
} = require("../controllers/getAnimeEpisodeEmbededLink");
const { initialRoute } = require("../controllers/initialRouteController");
const { searchAnime } = require("../controllers/searchAnimeController");

const router = express.Router();

router.route("/").get(initialRoute);
router.route("/search").get(searchAnime);
router.route("/details/:slug").get(getAnimeDetails);
router.route("/get-embeded-link/:episodeId").get(getAnimeEpisodeEmbededLink);

module.exports = router;
