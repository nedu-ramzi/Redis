import express from "express";

//importing files
import config from "./config/main.js";
import cache from "./middleware/cach.middleware.js";
import getGitHubData from "./controller/redis.controller.js";


// Initialize Redis client and connect
config.redis();

const app = express();

//Cache Middleware
app.get("/gitdata/:username", cache, getGitHubData);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
