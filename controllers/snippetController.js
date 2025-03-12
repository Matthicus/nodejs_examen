const snippet = require("../models/snippets");

exports.createSnippet = async (req, res) => {
  try {
    const { title, code, language, tags, expiresIn } = req.body;
    const encodedCode = Buffer.from(code).toString("base64");

    const expiresAt = expiresIn
      ? new Date(Date.now() + expiresIn * 1000)
      : null;

    const snippet = new Snippet({
      title,
      code: encodedCode,
      language,
      tags,
      expiresAt,
    });
    await snippet.save();

    res.status(201).json(snippet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllSnippets = async (req, res) => {
  try {
    const {
      language,
      tags,
      page = 1,
      limit = 10,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    let query = {};
    if (language) query.language = new regExp(language, "i");
    if (tags) query.tags = { $all: tags.split(",") };

    const snippets = await Snippet.find(query)
      .where("expiresAt")
      .gt(new Date())
      .sort({ [sort]: order === "desc" ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const decodedSnippets = snippets.map((snippet) => ({
      ...snippet._doc,
      code: Buffer.from(snippet.code, "base64").toString("utf-8"),
    }));

    res.json(decodedSnippets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet || (snippet.expiresAt && snippet.expiresAt < new Date())) {
      return res.status(404).json({ error: "Snippet not found or expired" });
    }

    snippet.code = Buffer.from(snippet.code, "base64").toString("utf-8");
    res.json(snippet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSnippet = async (req, res) => {
  try {
    const { code } = req.body;
    if (code) req.body.code = Buffer.from(code).toString("base64");

    const snippet = await Snippet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(snippet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSnippet = async (req, res) => {
  try {
    await Snippet.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
