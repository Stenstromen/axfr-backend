const express = require("express");

const axfrController = require("../controllers/axfr.controller");
const axfrRouter = express.Router();

axfrRouter.get("/se", axfrController.sendSeDates)
axfrRouter.get("/se/:date/:page", axfrController.sendSeRows);
axfrRouter.get("/nu/:date/:page", axfrController.sendNuRows);

module.exports = axfrRouter;