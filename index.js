const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("./db/db.connect.js");
const cors = require("cors");
const helmet = require("helmet");
const taskRouter = require("./routes/task.routes");

app.use(
  cors({
    origin: "https://example.com",
  })
);

app.use(helmet());

app.use(express.json());

app.use("/tasks", taskRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.get("/", (req, res) => {
  res.send("Welome to Task Sync");
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
