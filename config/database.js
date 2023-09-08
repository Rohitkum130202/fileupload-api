const mongoose = require("mongoose");
require("dotenv").config();

const dbconnect = async () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to Database"))
    .catch((error) => {
      console.error("Facing some Problem :", error);
      process.exit(1);
    });
};

module.exports = dbconnect;
