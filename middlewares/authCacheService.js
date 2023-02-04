const { createClient } = require("redis");
let redisClient = createClient({
  url: "redis://red-cffc091a6gdma8jkbj1g:6379",
});
redisClient.connect().catch(console.error);

const addToCash = async (key, value) => {
  redisClient.set(key, value);
};

const getFromCache = async (key) => {
  return redisClient.get(key);
};

const deleteFromCache = async (key) => {
  redisClient.del(key);
};

module.exports = {
  addToCash,
  getFromCache,
  deleteFromCache,
};
