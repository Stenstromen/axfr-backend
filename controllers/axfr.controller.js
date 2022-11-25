const { validationResult } = require("express-validator");
const seCon = require("../mysql/se.mysql");
const nuCon = require("../mysql/nu.mysql");
const seDumpCon = require("../mysql/seDump.mysql");
const nuDumpCon = require("../mysql/nuDump.mysql")

function sendSeDates(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors[0].author });
  }

  const pageordate = req.params.pageordate;
  const sql = "SELECT date, amount FROM dates ORDER BY date DESC;";

  if (pageordate.length < 8) {
    let rows1 = pageordate * 20;
    let rows2;
    pageordate === "0" ? (rows2 = 0) : (rows2 = rows1);
    const sql = `SELECT date, amount FROM dates ORDER BY date DESC OFFSET ${rows2} ROWS FETCH FIRST 20 ROWS ONLY;`;
    seCon.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  } else {
    seCon.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  }
}

function sendSeRows(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors[0].author });
  }

  const date = req.params.date;
  const page = req.params.page;
  let rows1 = page * 20;
  let rows2 = page * 20;

  const sql = `SELECT domain FROM domains JOIN dates ON domains.dategrp = dates.id WHERE date = ${date} ORDER BY domain ASC OFFSET ${rows2} ROWS FETCH FIRST 20 ROWS ONLY;`;
  seCon.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
}

function sendNuDates(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors[0].author });
  }

  const pageordate = req.params.pageordate;
  const sql = "SELECT date, amount FROM dates ORDER BY date DESC;";

  if (pageordate.length < 8) {
    let rows1 = pageordate * 20;
    let rows2;
    pageordate === "0" ? (rows2 = 0) : (rows2 = rows1);
    const sql = `SELECT date, amount FROM dates ORDER BY date DESC OFFSET ${rows2} ROWS FETCH FIRST 20 ROWS ONLY;`;
    nuCon.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  } else {
    nuCon.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  }
}

function sendNuRows(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors[0].author });
  }

  const date = req.params.date;
  const page = req.params.page;
  let rows1 = page * 20;
  let rows2 = page * 20;

  const sql = `SELECT domain FROM domains JOIN dates ON domains.dategrp = dates.id WHERE date = ${date} ORDER BY domain ASC OFFSET ${rows2} ROWS FETCH FIRST 20 ROWS ONLY;`;
  nuCon.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
}

function searchDomains(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(400).json({ errors: extractedErrors[0].author });
  }

  const tld = req.params.tld;
  const query = req.params.query;

  const querySql = `SELECT domain FROM domains WHERE domain like "%${query}%" ORDER BY CHAR_LENGTH(domain) ASC;`;
  //const dateSql = `SELECT date FROM dates ORDER BY date DESC LIMIT 1;`

  switch (tld) {
    case "se":
      /* seCon.query(dateSql, (err, result) => {
        if (err) throw err;
        date = result[0].date.toString().replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3")
      }) */
      seDumpCon.query(querySql, (err, result) => {
        if (err) throw err;
        res.json(result);
      });
      break;
    case "nu":
      nuDumpCon.query(querySql, (err, result) => {
        if (err) throw err;
        res.json(result);
      });
      break;
    default:
      res.end();
      break;
  }
}

module.exports = {
  sendSeDates,
  sendSeRows,
  sendNuDates,
  sendNuRows,
  searchDomains,
};
