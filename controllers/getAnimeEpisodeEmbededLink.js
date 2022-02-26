const cheerio = require("cheerio");
const axios = require("axios");

exports.getAnimeEpisodeEmbededLink = async (req, res) => {
  try {
    const episodeId = req.params.episodeId;

    if (!episodeId) {
      res.status(400).json({
        success: false,
        message: "Please enter episode Id !",
      });
    } else {
      axios({
        url: `https://chia-anime.su/${episodeId}`,
        method: "GET",
        headers: {
          authority: "chia-anime.su",
          "cache-control": "max-age=0",
          "sec-ch-ua":
            '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
          "sec-ch-ua-mobile": "?1",
          "sec-ch-ua-platform": '"Android"',
          "upgrade-insecure-requests": "1",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Mobile Safari/537.36",
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "sec-fetch-site": "same-origin",
          "sec-fetch-mode": "navigate",
          "sec-fetch-user": "?1",
          "sec-fetch-dest": "document",
          referer: "https://chia-anime.su/anime/rymans-club",
          "accept-language": "en-US,en;q=0.9",
          cookie:
            "_ga=GA1.2.1853216771.1645686967; __gads=ID=5693538ddca9de63-22db29afb5d00018:T=1645686966:RT=1645686966:S=ALNI_MY7pzYuTypD7vTKTaURqCPwhzB4bg; _gid=GA1.2.1487788457.1645788322; dom3ic8zudi28v8lr6fgphwffqoz0j6c=8b3ed4dd-a25b-41bd-96cb-8347506dadda%3A3%3A1; ppu_main_25c620ace5e1a8afe31a816375bcb012=1; ppu_sub_25c620ace5e1a8afe31a816375bcb012=3; _gat_gtag_UA_190249823_1=1",
        },
      }).then((result) => {
        const $ = cheerio.load(result.data);

        const playerEmbed = $(".player-embed");

        const entryTitle = $(".entry-title");

        const footer = $(".footer-az").children("ul");

        const embeded = playerEmbed.find("iframe").attr("src");

        const title = entryTitle.text();

        const episodes = [];

        footer.find("li a").each((index, element) => {
          let data = $(element).attr("href").split("/")[3];
          if (
            data !== "anime" &&
            data.match(episodeId.split("-")[0]) !== null
          ) {
            episodes.push(data);
          }
        });

        res.status(200).json({
          success: 200,
          data: {
            title: title,
            embeded_url: embeded,
            other_episode_id: episodes,
          },
        });
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
