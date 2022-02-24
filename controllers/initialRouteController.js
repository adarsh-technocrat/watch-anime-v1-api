exports.initialRoute = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Welcome to Watch Anime Api 😊",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Opps!! Server Error 😔",
    });
  }
};
