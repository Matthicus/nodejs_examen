const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const snippetRoutes = require("./routes/snippetRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/snippets", snippetRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`server is running on ${PORT} xp`));
});
.catch(err => console.error(err));
