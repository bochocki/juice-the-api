const express = require("express");
const router = express.Router();

// Define the `/hello` route
router.get("/", (req, res) => {
    res.status(200).json({ message: "Hello, World!" });
});

module.exports = router;
