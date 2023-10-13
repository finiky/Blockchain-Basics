require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// sample endpoint
app.get("/test", async (request, response) => {
  response.status(200).json({ message: "Hello testing the route" });
});

module.exports = app;
