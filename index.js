const express = require("express");
const app = express();

// Import and register endpoints
const magic8ball = require("magic8ball/endpoint.js");
const hello = require("hello_world/endpoint.js");

app.use("/magic8ball", magic8ball);
app.use("/hello", hello);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
