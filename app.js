const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
// let RedisStore = require("connect-redis")(session);

const dotenv = require("dotenv");
dotenv.config();

// const { createClient } = require("redis");
// let redisClient = createClient();
// redisClient.connect().catch(console.error);

const SECRET_COOKIE = process.env.SECRET_COOKIE;

const languagesRouter = require("./routes/api/languagesApi");
const countriesRouter = require("./routes/api/countriesApi");
const regionLoc3Router = require("./routes/api/regionLoc3Api");
const cityLoc2Router = require("./routes/api/cityLoc2Api");
const districtLoc1Router = require("./routes/api/districtLoc1Api");
const autoComplete = require("./routes/api/autoComplete");
const hotels = require("./routes/api/hotels");
const hotelsFinder = require("./routes/api/hotelsFinder");
const hotelsVerification = require("./routes/api/hotelsVerification");
const objectType = require("./routes/api/objectType");
const paymentMethod = require("./routes/api/paymentApi");
const servicesRouter = require("./routes/api/servicesApi");
const bookingOption = require("./routes/api/bookingOption");
const bookingOptionHs = require("./routes/api/bookingOptionHs");
const bookingServices = require("./routes/api/servicesForBookingOption");
const authAgents = require("./routes/api/authAgents");
const authUsers = require("./routes/api/authUsers");
const authHoteliers = require("./routes/api/authHoteliers");
const catalogForHotelier = require("./routes/api/catalogForHotelier");
const acsessToAdmin = require("./routes/api/acsessToAdmin");
const currency = require("./routes/api/currency");
const test = require("./routes/api/test");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3002",
      "http://localhost:5000",
      "https://dev-app-gamma.vercel.app",
      "https://dev-app-react-ceotravelvee.vercel.app",
      "https://admin2-alpha.vercel.app",
      "https://xaeycpio.yourpricebooking.com",
      "https://catalog-for-hoteliers-next13.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("verification"));
app.use(bodyParser.json());
app.use(cookieParser(SECRET_COOKIE));
app.use(
  session({
    secret: SECRET_COOKIE,
    // key: "session-key",
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: null,
      // SameSite: "None",
      // Secure: true,
    },
    saveUninitialized: false, //change to => false
    resave: false,
    // store: new RedisStore({ client: redisClient }),
  })
);
app.use("/api/languages", languagesRouter);
app.use("/api/countries", countriesRouter);
app.use("/api/location-state", regionLoc3Router);
app.use("/api/location-city", cityLoc2Router);
app.use("/api/location-district", districtLoc1Router);
app.use("/api/autocomplete", autoComplete);
app.use("/api/hotels", hotels);
app.use("/api/hotelsFinder", hotelsFinder);
app.use("/api/hotels-verification", hotelsVerification);
app.use("/api/get-objects", objectType);
app.use("/api/payments-method", paymentMethod);
app.use("/api/services", servicesRouter);
app.use("/api/bookingOption-hotel", bookingOption);
app.use("/api/bookingOption-hostel", bookingOptionHs);
app.use("/api/booking-services", bookingServices);
app.use("/api/auth-agents", authAgents);
app.use("/api/auth-hoteliers", authHoteliers);
app.use("/api/auth-users", authUsers);
app.use("/api/catalogForHotelier", catalogForHotelier);
app.use("/api/acsess-to-admin", acsessToAdmin);
app.use("/api/currency", currency);
app.use("/api/test", test);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
