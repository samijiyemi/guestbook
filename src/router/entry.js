const express = require("express");
const router = express.Router();
const Entry = require("../model/entries");

router.get("/", async (req, res) => {
  res.render("new-entry");
});

// define a route handler when post to new entry
router.post("/", async (req, res) => {
  if (!(req.body.title || req.body.body)) {
    res.send("Entries must have title and body");
    return;
  }

  const entries = new Entry({
    title: req.body.title,
    body: req.body.body,
  });

  await entries.save();

  res.redirect("/");
});

module.exports = router;
