const express = require("express");
const server = express();
const helmet = require("helmet");
const actionsRoute = require("./actions/actions-router");
const projectsRoute = require("./projects/projects-router");

server.use(express.json());
server.use(helmet());

server.use("/api/actions", actionsRoute);
server.use("/api/projects", projectsRoute);

server.get("/", (req, res) => {
  res.json({ message: "Server is up." });
});

// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
