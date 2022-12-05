const express = require("express");
const compression = require("compression");
const cors = require("cors");
const app = express();
const axfrRouter = require("./routers/axfr.router");
const AUTHHEADER_PASSWORD = process.env.AUTHHEADER_PASSWORD;

app.use(cors({ origin: process.env.CORS_ORIGIN }));

app.use((req, res, next) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization !== AUTHHEADER_PASSWORD
  ) {
    return res.status(403).json({ error: "Invalid or no credentials" });
  }
  next();
});

app.use(compression());
app.use(axfrRouter);

app.listen(8080, () => {
  console.log("Server listening on localhost:8080");
});
