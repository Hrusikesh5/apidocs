const express = require("express");

const {
  addApi,
  getApiDocs,
  updateApiDocs,
} = require("../controller/ckeditorController");
const router = express.Router();

router.post("/addApi", addApi);
router.get("/getApi", getApiDocs);
router.patch("/update/:id", updateApiDocs);
module.exports = router;
