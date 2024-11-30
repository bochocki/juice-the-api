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
        const question = req.body.text?.trim() || "What do you want to know?";
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        // 1. Immediately respond to Slack to suppress the "dispatch_failed" error
        res.status(200).json({
            response_type: "ephemeral", // This is optional; user will see "working on it"
            text: `🎱 Thinking about your question: *${question}*...`,
        });

        // 2. Post the actual response back to Slack via the response_url
        const responseUrl = req.body.response_url;
        await axios.post(responseUrl, {
            response_type: "in_channel", // Message visible to everyone in the channel
            text: `🎱 *${question}*\n> ${randomResponse}`,
        });
    } catch (error) {
        console.error("Error handling /magic8ball:", error);

        // Handle errors gracefully
        res.status(500).json({
            response_type: "ephemeral",
            text: "❌ Something went wrong with the Magic 8 Ball. Please try again later.",
        });
    }
});

module.exports = router;
