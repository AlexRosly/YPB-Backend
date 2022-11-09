const { Hotels } = require("../../models");

const hotelsVerificationVideo = async (req, res) => {
  const { id } = req.params;

  const hotel = await Hotels.findById(id);
  console.log(req.file);
};

module.exports = hotelsVerificationVideo;
