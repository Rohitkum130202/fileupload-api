const mongoose = require("mongoose");
const transporter = require("../config/nodemailer");
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  imageurl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

//Post middlewares
fileSchema.post("save", async function (doc) {
  try {
    console.log("DOC => ", doc);

    let info = await transporter.sendMail({
      from: `forsec`,
      to: doc.email,
      subject: "File successfully uploaded",
      html: `<h2> Hello ji </h2> <p>File uploaded successfully <p/>`,
    });
    console.log("INFO => ", info);
  } catch (error) {
    console.log(error);
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
