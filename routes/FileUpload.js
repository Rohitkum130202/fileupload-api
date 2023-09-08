const express = require("express");
const router = express.Router();

const {
  imageUpload,
  videoUpload,
  imageReducerUpload,
  localFileupload,
} = require("../controllers/fileupload");

//APi routes
router.post("/localfileupload", localFileupload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageReducer", imageReducerUpload);
module.exports = router;
