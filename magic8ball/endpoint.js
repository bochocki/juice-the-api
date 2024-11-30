const express = require("express");
const axios = require("axios");
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
    try {
        // Safely access req.body.text
        const question = req.body.text?.trim() || "<user asked the question in their heart>";
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        // Immediately respond to Slack
        res.status(200).send();

        // Send the follow-up response via response_url
        const responseUrl = req.body.response_url;
        await axios.post(responseUrl, {
            response_type: "in_channel", // Message visible to everyone
            text: `> _${question}_\n**${randomResponse}**`,
        });
    } catch (error) {
        console.error("Error handling /magic8ball:", error);

        // Ensure we don't try to send multiple responses
    }
});

module.exports = router;
