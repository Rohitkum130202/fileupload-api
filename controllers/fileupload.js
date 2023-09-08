const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
//Local file upload => handler function
exports.localFileupload = async (req, res) => {
  try {
    //Fetching file from request

    const file = req.files.file;
    console.log("File aa gyi ji", file);
    //Creating a path for which file is going to upload  on the server
    //pwd cmd for current running directory (__dirname ) it gives the current working directory
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("PATH => ", path);

    //adding path to move function

    file.mv(path, (err) => {
      console.log(err);
    });

    //creating a successfull response

    res.json({
      success: true,
      message: "Local file  uploaded successfully",
    });
  } catch (error) {
    console.log("Facing some eroor while uploading");
    console.log(error);
  }
};

function isFileSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

// Function to upload file to Cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  const response = await cloudinary.uploader.upload(file.tempFilePath, options);
  return response;
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, email, tags);

    const file = req.files.imageFile;
    console.log(file);

    // Validation
    const supportedFileTypes = ["png", "jpg", "jpeg"];
    const fileType = file.name.split(".")[1].toLowerCase();
    if (!isFileSupported(fileType, supportedFileTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // File format supported, upload and create record
    const response = await uploadFileToCloudinary(file, "fileupload", 30);
    console.log(response);
    // Create a record in your model (assuming File is your model)
    const fileRecord = await File.create({
      name,
      tags,
      email,
      imageurl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image File successfully uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    //data Fetch
    const { name, email, tags } = req.body;
    const file = req.files.videoFile;
    // Validation
    const supportedFileTypes = ["mp4", "mov", "webm"];
    const fileType = file.name.split(".")[1].toLowerCase();
    if (!isFileSupported(fileType, supportedFileTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // File format supported, upload and create record
    const response = await uploadFileToCloudinary(file, "fileupload");
    console.log(response);
    // Create a record in your model (assuming File is your model)
    const fileRecord = await File.create({
      name,
      tags,
      email,
      imageurl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Video File successfully uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.imageReducerUpload = async (req, res) => {
  try {
    const { name, email, tags } = req.body;
    const file = req.files.videoFile;
    // Validation
    const supportedFileTypes = ["mp4", "mov", "webm"];
    const fileType = file.name.split(".")[1].toLowerCase();
    if (!isFileSupported(fileType, supportedFileTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    // File format supported, upload and create record
    const response = await uploadFileToCloudinary(file, "fileupload");
    console.log(response);
    // Create a record in your model (assuming File is your model)
    const fileRecord = await File.create({
      name,
      tags,
      email,
      imageurl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Video File size reduced successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
