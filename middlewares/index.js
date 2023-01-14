const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const upload = require("./upload");
const uploadVideo = require("./verificationVideo");
const createRegistrationCode = require("./createRegistrationCode");
const createSignInCode = require("./createSignInCode");
const auth = require("./auth");
const { authCacheService } = require("./authCacheService");

module.exports = {
  validation,
  ctrlWrapper,
  upload,
  uploadVideo,
  createRegistrationCode,
  createSignInCode,
  auth,
  authCacheService,
};
