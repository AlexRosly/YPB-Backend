const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const upload = require("./upload");
const uploadVideo = require("./verificationVideo");
const createRegistrationCode = require("./createRegistrationCode");
const createSignInCode = require("./createSignInCode");
const auth = require("./auth");
const { authCacheService } = require("./authCacheService");
const authAdmin = require("./authAdmin");
const authHotelier = require("./authHotelier");
const authUser = require("./authUser");
const authAgent = require("./authAgent");

module.exports = {
  validation,
  ctrlWrapper,
  upload,
  uploadVideo,
  createRegistrationCode,
  createSignInCode,
  auth,
  authCacheService,
  authAdmin,
  authHotelier,
  authUser,
  authAgent,
};
