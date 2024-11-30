const express = require("express");
const app = express();

// Import and register endpoints
const magic8ball = require("./magic8ball/endpoint.js");
const hello = require("./hello_world/endpoint.js");

// Use built-in Express middleware for parsing request bodies
app.use(express.urlencoded({ extended: true })); // Parses `application/x-www-form-urlencoded`
app.use(express.json()); // Parses JSON if needed for future requests

app.use("/magic8ball", magic8ball);
app.use("/hello", hello);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
