const seCon = require("../mysql/se.mysql");
const nuCon = require("../mysql/nu.mysql");

function sendSeDates(req, res) {
  const sql = "SELECT date, amount FROM dates;";
  seCon.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
}

function sendSeRows(req, res) {
  const date = req.params.date;
  const page = req.params.page;
  let rows1 = page * 18;
  let rows2;
  let maxPage;
  if (page === "0") {
    rows2 = 0;
  } else {
    rows2 = rows1;
  }

  const maxSql = `SELECT amount FROM dates WHERE date = ${date}`;
  seCon.query(maxSql, function (err, result) {
    if (err) throw err;
    if (result === undefined || result.length == 0) {
      console.log(`(.SE) Date ${date} empty or does not exist`); return
    } else {
      maxPage = Math.floor(result[0].amount / 18) + 1;
    }
  });

  const sql = `SELECT domain FROM domains JOIN dates ON domains.dategrp = dates.id WHERE date = ${date} ORDER BY domain ASC OFFSET ${rows2} ROWS FETCH FIRST 18 ROWS ONLY;`;
  seCon.query(sql, function (err, result) {
    if (err) throw err;
    res.render("sedomains.ejs", {
      result: JSON.stringify(result),
      maxPage: maxPage,
    });
  });
}

function sendNuDates(req, res) {
  const sql = "SELECT date, amount FROM dates;";
  nuCon.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result)
  });
}

function sendNuRows(req, res) {
  const date = req.params.date;
  const page = req.params.page;
  let rows1 = page * 18;
  let rows2;
  let maxPage;
  if (page === "0") {
    rows2 = 18;
  } else {
    rows2 = rows1 + 18;
    console.log(rows2)
  }

  const maxSql = `SELECT amount FROM dates WHERE date = ${date}`;
  nuCon.query(maxSql, function (err, result) {
    if (err) throw err;
    if (result === undefined || result.length == 0) {
      console.log(`(.NU) Date ${date} empty or does not exist`); return
    } else {
      maxPage = Math.floor(result[0].amount / 18) + 1;
    }
  });

  const sql = `SELECT domain FROM domains JOIN dates ON domains.dategrp = dates.id WHERE date = ${date} ORDER BY domain ASC LIMIT ${rows2}`;
  nuCon.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
}

module.exports = {
  sendSeDates,
  sendSeRows,
  sendNuDates,
  sendNuRows,
};