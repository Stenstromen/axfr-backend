const express = require("express");
const compression = require("compression");
const app = express();
const axfrRouter = require("./routers/axfr.router");

app.use(compression());
app.use(axfrRouter);

app.listen(8080, () => {
    console.log("Server listening on localhost:8080")
})