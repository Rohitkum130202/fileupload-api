const express = require("express");
const dbconnect = require("./config/database");
const app = express();

//Using middlewares
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//Setup for enviroment file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//Cloudinary se connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const startserver = async () => {
  try {
    await dbconnect();
    app.listen(PORT, () => {
      console.log(`Server is already Started on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error while starting server");
  }
};

startserver();

//API route mount karna  hai
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

app.get("/", (req, res) => {
  res.send("This is home page");
});
