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
    // Immediately respond to Slack to prevent dispatch_failed error
    res.status(200).send(); // Send 200 response immediately

    try {
        const question = req.body.text?.trim() || "What do you want to know?";
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        // Send the follow-up response via Slack's response_url
        const responseUrl = req.body.response_url;
        await axios.post(responseUrl, {
            response_type: "in_channel", // Makes the message visible to everyone
            text: `🎱 *${question}*\n> ${randomResponse}`,
        });
    } catch (error) {
        console.error("Error handling /magic8ball:", error);

        // Log the error, but do not attempt to send another response
        // The immediate 200 response has already been sent
    }
});

module.exports = router;
