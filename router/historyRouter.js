const express = require("express");
const { getHistory } = require("../controller/HistoryController");
const HistoryRouter = express.Router();

HistoryRouter.get("/:id", getHistory);
module.exports = { HistoryRouter };
