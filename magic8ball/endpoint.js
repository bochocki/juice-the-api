const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Load responses from responses.txt
const responsesPath = path.join(__dirname, "responses.txt");
const responses = fs
    .readFileSync(responsesPath, "utf-8")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

// Define the /magic8ball route
router.post("/", (req, res) => {
    // Select a random response
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Return a response in Slack's expected JSON format
    res.json({
        response_type: "in_channel", // Makes the response visible to everyone in the channel
        text: `🎱 ${randomResponse}`,
    });
});

module.exports = router;
