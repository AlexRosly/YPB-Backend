/*
1.Извлекаем из заголовков содержимое заголовка autorization
2.Разделяем его на 2 слова: bearer и token
3.Проверяем равно ли первое слово "Bearer"
4.Проверяем валидность второго слова token
5.Если токен валиден извелекаем из него id
6.Если пользователь с таким id нашли в базе - его нужно прекрепить к запросу

*/

const { Agent, Hotelier, User } = require("../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY_JWT } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY_JWT);
    const agent = await Agent.findById(id);
    const hotelier = await Hotelier.findById(id);
    const user = await User.findById(id);
    // if (!agent) {
    //   throw new Unauthorized("Not authorized");
    // }
    if (agent) {
      req.agent = agent;
    }
    if (hotelier) {
      req.hotelier = hotelier;
    }
    if (user) {
      req.user = user;
    }
    next();
  } catch (error) {
    if ((error.message = "Invalid signature")) {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
