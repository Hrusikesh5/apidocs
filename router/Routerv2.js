const express = require("express");

const {
  addApi2,
  getApiDocs2,
  updateApiDocs2,
} = require("../controller/controllerversion2");

const router2 = express.Router();

router2.post("/addApi", addApi2);
router2.get("/getApi", getApiDocs2);
router2.patch("/update/:id", updateApiDocs2);

module.exports = router2;
