const mongoose = require("mongoose");

const snippetSchema = new mongoose.schema(
  {
    title: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    tags: [String],
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

const Snippet = mongoose.model("Snippet", snippetSchema);

module.exports = Snippet;
