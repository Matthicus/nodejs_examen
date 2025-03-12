const express = require("express");

const {
  createSnippet,
  getAllSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
} = require("..controllers/snippetController");

const router = express.Router();

router.post("/", createSnippet);
router.post("/", getAllSnippets);
router.post("/", getSnippetById);
router.put("/:id", updateSnippet);
router.delete("/:id", deleteSnippet);

module.exports = router;
