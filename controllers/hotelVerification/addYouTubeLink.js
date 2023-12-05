const { Verification } = require("../../models");

const addYouTubeLink = async (req, res) => {
  const { id, youTubeLink } = req.body;

  const result = await Verification.findByIdAndUpdate(
    id,
    { youTubeLink },
    { new: true }
  );

  if (!result) {
    return res.json({
      code: 404,
      status: "error",
      message: "link on the youTube wasn't added, try again later",
    });
  }

  res.json({
    code: 201,
    status: "success",
    result,
  });
};

module.exports = addYouTubeLink;
