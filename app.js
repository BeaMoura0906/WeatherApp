// app.js

// Import necessary module
const express = require("express");
const twig = require("twig");
const initDb = require("./initDb");

// Create an express app
const app = express();

// Set up the view engine (Twig) and the views directory
app.set("view engine", "twig");
app.set("views", __dirname + "/views");

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Init the database and start the server
initDb().then(() => {
    console.log("La base de données a été initialisée avec succès.");

    // Serve static files
    app.use(express.static('public'));

    // Set up the routes
    const indexRouter = require("./routes/index");
    app.use("/", indexRouter);

    const weatherRouter = require("./routes/weather");
    app.use("/weather", weatherRouter);
    
    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
}).catch(err => {
    console.error(err);
});