/**
 * server.js use express as a framework for webbapplications,
 * the module is creating the website with multiple pages where the rss feeds are presented with multiple outformats.
 */
const express = require('express');
const path = require('path');
const rss = require("./rss");
"use strict";

const app = express();
const port = 5500;

app.use(express.static('src'))
app.set("views", path.join(__dirname, "../html"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// functions which starts the server with the website on a port.
async function main() {

  let rssList = rss.rssList;

  app.get('/', function (req, res) {
    res.render('../html/index.html', {
      rss: rssList.list
    });
  })

  app.get('/sort=:id', function (req, res) { // sort by parameters in a webbpage, t.ex. on id that works: name, date
    if (req.params.id === "name_ascending") {
      rssList.sortData("title", true);
    } else if (req.params.id === "name_descending") {
      rssList.sortData("title", false);
    } else if (req.params.id === "date_ascending") {
      rssList.sortData("isoDate", true);
    } else { // default is date_descending
      rssList.sortData("isoDate", false);
    }

    res.render('../html/index.html', {
      rss: rssList.list
    });
  })

  app.get('/data/json', function (req, res) { // usual json data
    res.setHeader("content-type", "application/json");
    res.send(rssList.getJson());
  })

  app.get('/data/text', function (req, res) { // unformatted plaintext data
    res.setHeader("content-type", "text/plain");
    res.send(rssList.getText());
  })

  app.get('/data/html', function (req, res) { // data but in html tags
    res.setHeader("content-type", "text/plain");
    res.send(rssList.getHtml());
  })

  app.listen(port); // start website with the port
}

// export functions from the module
module.exports = {
  main: main,
}