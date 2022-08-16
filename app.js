const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const languagesRouter = require("./routes/api/languagesApi");
const countriesRouter = require("./routes/api/countriesApi");
const regionLoc3Router = require("./routes/api/regionLoc3Api");
const cityLoc2Router = require("./routes/api/cityLoc2Api");
const districtLoc1Router = require("./routes/api/districtLoc1Api");
const languageById = require("./routes/api/languagesById");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/languages", languagesRouter);
app.use("/api/countries", countriesRouter);
app.use("/api/location-state", regionLoc3Router);
app.use("/api/location-city", cityLoc2Router);
app.use("/api/location-district", districtLoc1Router);
app.use("/api/language", languageById);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
