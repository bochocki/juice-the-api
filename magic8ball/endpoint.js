const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Load responses from `responses.txt`
const responsesPath = path.join(__dirname, "responses.txt");
const responses = fs
    .readFileSync(responsesPath, "utf-8")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

// Define the `/magic8ball` route
router.get("/", (req, res) => {
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    res.status(200).json({ message: "> 🎱: ${randomResponse}" });
});

module.exports = router;
