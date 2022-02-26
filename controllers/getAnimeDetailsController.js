const cheerio = require("cheerio");
const axios = require("axios");

exports.getAnimeDetails = async (req, res) => {
  try {
    const slug = req.params.slug;

    if (!slug) {
      res.status(400).json({
        success: false,
        message: "Please enter anime slug !",
      });
    } else {
      axios({
        url: `https://chia-anime.su/anime/${slug}`,
        method: "GET",
        headers: {
          authority: "chia-anime.su",
          "cache-control": "max-age=0",
          "sec-ch-ua":
            '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "upgrade-insecure-requests": "1",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "sec-fetch-site": "none",
          "sec-fetch-mode": "navigate",
          "sec-fetch-user": "?1",
          "sec-fetch-dest": "document",
          "accept-language": "en-US,en;q=0.9",
          cookie:
            "_ga=GA1.2.1853216771.1645686967; __gads=ID=5693538ddca9de63-22db29afb5d00018:T=1645686966:RT=1645686966:S=ALNI_MY7pzYuTypD7vTKTaURqCPwhzB4bg; _gid=GA1.2.1487788457.1645788322; dom3ic8zudi28v8lr6fgphwffqoz0j6c=8b3ed4dd-a25b-41bd-96cb-8347506dadda%3A3%3A1; ppu_main_25c620ace5e1a8afe31a816375bcb012=1; ppu_sub_25c620ace5e1a8afe31a816375bcb012=3; _gat_gtag_UA_190249823_1=1",
        },
      }).then((result) => {
        const $ = cheerio.load(result.data);

        const infox = $(".infox");

        const thumb = $(".thumb img");

        const num = $(".num");

        const genres = [];

        const spanData = {};

        const episodes = [];

        infox.find(".genxed a").each((i, element) => {
          genres.push($(element).text());
        });

        infox.find(".spe span").each((index, element) => {
          const data = $(element).text().split(":");
          spanData[data[0]] = data[1];
        });

        num.find("li a ").each((index, element) => {
          let data = $(element).attr("href").split("/")[3];
          if (data !== "anime") {
            episodes.push(data);
          }
        });

        const anime_image = thumb.attr("src");
        const anime_title = infox.children("h1").text();
        const rating = $(".rating")
          .children("strong")
          .text()
          .split("Rating")[1]
          .trim();

        const anime_short_summary = infox
          .find(".entry-content")
          .text()
          .trim()
          .split("\n")[0];

        res.status(200).json({
          success: 200,

          data: {
            anime_image: anime_image,
            anime_title: anime_title,
            anime_info: spanData,
            genres: genres,
            rating: rating,
            anime_short_summary: anime_short_summary,
            episode_id: episodes,
          },
        });
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Opps!! Server Error 😔",
    });
  }
};
