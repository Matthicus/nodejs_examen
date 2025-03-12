const express = require("express");
const router = express.Router();
const Snippet = require("../models/snippets");

router.get("/dashboard", async (req, res) => {
  try {
    let query = {};

    if (req.query.language) {
      query.language = { $regex: req.query.language, $options: "i" }; // Case-insensitive
    }

    if (req.query.tags) {
      query.tags = { $in: req.query.tags.split(",") };
    }

    const snippets = await Snippet.find(query).sort({ createdAt: -1 });

    res.render("dashboard", { snippets });
  } catch (error) {
    console.error("Error fetching snippets:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
