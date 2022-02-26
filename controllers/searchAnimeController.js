const axios = require("axios");

exports.searchAnime = async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery;

    if (!searchQuery) {
      res.status(400).json({
        success: false,
        message: "Please enter some query !",
      });
    } else {
      axios({
        url: `https://chia-anime.su/wp-admin/admin-ajax.php`,
        method: "POST",
        headers: {
          authority: "chia-anime.su",
          "sec-ch-ua":
            '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
          accept: "*/*",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "x-requested-with": "XMLHttpRequest",
          "sec-ch-ua-mobile": "?0",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
          "sec-ch-ua-platform": '"Windows"',
          origin: "https://chia-anime.su",
          "sec-fetch-site": "same-origin",
          "sec-fetch-mode": "cors",
          "sec-fetch-dest": "empty",
          referer: "https://chia-anime.su/",
          "accept-language": "en-US,en;q=0.9",
          cookie:
            "_ga=GA1.2.1853216771.1645686967; _gid=GA1.2.293072013.1645686967; __gads=ID=5693538ddca9de63-22db29afb5d00018:T=1645686966:RT=1645686966:S=ALNI_MY7pzYuTypD7vTKTaURqCPwhzB4bg; _gat_gtag_UA_190249823_1=1",
        },

        data: `action=ajaxy_sf&sf_value=${searchQuery}&search=false`,
      }).then((result) => {
        let newMapData = result.data["anime"][0]["all"].map((data) => {
          return {
            anime_image: data["post_image"],
            anime_title: data["post_title"],
            anime_genres: data["post_genres"],
            anime_type: data["post_type"],
            anime_episodes: data["post_latest"],
            anime_sub: data["post_sub"],
            anime_link: data["post_link"],
            anime_slug: data["post_link"].split("/")[4],
          };
        });
        res.status(200).json({
          success: 200,
          data: {
            anime: newMapData,
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
