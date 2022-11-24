const express = require("express");
const { param } = require("express-validator");

const axfrController = require("../controllers/axfr.controller");
const axfrRouter = express.Router();

axfrRouter.get(
  "/se/:pageordate",
  [param("pageordate").not().isEmpty(), param("pageordate").isInt()],
  axfrController.sendSeDates
);
axfrRouter.get(
  "/nu/:pageordate",
  [param("pageordate").not().isEmpty(), param("pageordate").isInt()],
  axfrController.sendNuDates
);
axfrRouter.get(
  "/se/:date/:page",
  [
    param("date").not().isEmpty(),
    param("date").isInt(),
    param("page").not().isEmpty(),
    param("page").isInt(),
  ],
  axfrController.sendSeRows
);
axfrRouter.get(
  "/nu/:date/:page",
  [
    param("date").not().isEmpty(),
    param("date").isInt(),
    param("page").not().isEmpty(),
    param("page").isInt(),
  ],
  axfrController.sendNuRows
);

axfrRouter.get(
  "/search/:tld/:query",
  [
    param("tld").isString().not().isEmpty().isLength({ max: 2 }),
    param("query").isString().not().isEmpty().isLength({ min: 3 }),
  ],
  axfrController.searchDomains
);

module.exports = axfrRouter;
