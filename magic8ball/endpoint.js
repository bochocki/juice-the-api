const express = require("express");
const axios = require("axios"); // For sending follow-up responses
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
router.post("/", async (req, res) => {
    const question = req.body.text?.trim() || "What do you want to know?";
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Suppress the original command by returning no content
    res.status(200).send();

    // Post the response back to Slack
    const responseUrl = req.body.response_url; // Provided by Slack in the request body
    await axios.post(responseUrl, {
        response_type: "in_channel", // Visible to everyone in the channel
        text: `🎱 *${question}*\n> ${randomResponse}`,
    });
});

module.exports = router;
