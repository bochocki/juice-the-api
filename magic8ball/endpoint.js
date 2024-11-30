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
        const userName = req.body.user_name; // Slack includes the user's handle here
        const question = req.body.text?.trim();
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        // Determine the message for empty questions
        const formattedQuestion = question
            ? `${userName}: _${question}_`
            : `${userName} asked a private question :face_with_finger_covering_closed_lips:`;

        // Respond to Slack immediately to prevent dispatch_failed errors
        res.status(200).send();

        // Format the response with Slack markdown
        const formattedResponse = `> ${formattedQuestion}\n*${randomResponse}*`;

        // Send the follow-up response via response_url
        const responseUrl = req.body.response_url;
        await axios.post(responseUrl, {
            response_type: "in_channel", // Message visible to everyone
            text: formattedResponse,
        });
    } catch (error) {
        console.error("Error handling /magic8ball:", error);

        // Ensure we don't attempt to send another response to Slack
    }
});

module.exports = router;
