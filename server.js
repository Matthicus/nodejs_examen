const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dashboardRoutes = require("./routes/dashboardRoutes");
require("dotenv").config();

const snippetRoutes = require("./routes/snippetRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/dashboard", dashboardRoutes);

app.use("/api/snippets", snippetRoutes);
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
