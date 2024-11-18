// We will be using Express as our HTTP server.
const express = require("express");

// We will be needing a static path, not a relative path.
const path = require("path");

// Our Express HTTP server variable.
const app = express();

/*
 * We will be parsing our .env file into environment variables
 *  on the Docker guest container.
 *
 * This will be utilized in our Pug template and as such all
 *  site-wide modifications can be done through CSS and the env file.
 */
require("dotenv").config();

/*
 * Though this is optional, it's always good practice to avoid
 *  exposing the software running the backend of a website in
 *  case a vulnerability is discovered.
 *
 * I am aware that "security through obscurity" is not good practice,
 *  and this is something that will most likely be only accessible
 *  locally on the host system.
 */
app.disable("x-powered-by");

// We will be using Pug templating for this application.
app.set("view engine", "pug");

// We will be needing a way to access our stylesheets, images, and scripts.
app.use("/assets", express.static(path.join(__dirname, "assets")));

// We need a route for the dark mode CSS from GitHub.
app.get("/swagger-ui-dark.css", async (req, res) => {
    try {
        const response = await fetch(
            "https://raw.githubusercontent.com//Amoenus/SwaggerDark/refs/heads/master/SwaggerDark.css",
        );
        if (!response.ok) {
            res.send(response.statusText);
        }

        res.set("Content-Type", "text/css");
        res.send(await response.text());
    } catch (error) {
        res.send(error);
    }
});

// We only need a single route for this application.
app.get("/", (req, res) => {
    res.render("index", { title: process.env.SITE_NAME });
});

// Start the Express server on port 8080 (or whichever one is set in the env file).
app.listen(process.env.SITE_PORT);
