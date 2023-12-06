const mongoose = require("mongoose");
const app = require("../app");

const { DB_HOST, APP_PORT = 5000 } = process.env;

mongoose.set("strictQuery", false);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(APP_PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
