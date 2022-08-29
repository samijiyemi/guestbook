// Require all modules
const http = require("http");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
require("./db/mongoose");

const Entry = require("./model/entries");

// Make an express app
const app = express();

// Set the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// use morgan to log every request
app.use(logger("dev"));

// populate a variable called req.body if the user submit a form
app.use(bodyParser.urlencoded({ extended: true }));

const entriesRouter = require("./router/entry");
app.use("/entries", entriesRouter);

// render homepage when visiting the site root
app.get("/", async (req, res) => {
  const entries = await Entry.find();

  res.render("index", { entries: entries });
});

// If error render 404 page to user
app.use(function (req, res) {
  res.status(404).render("404");
});

// start the server
http.createServer(app).listen(3001, function () {
  console.log(`GuestBook started on port 3001`);
});
