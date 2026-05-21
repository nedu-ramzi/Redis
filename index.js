import express from "express";
import redis from "redis";

const PORT = process.env.PORT || 5000;

const redis_client = redis.createClient();

redis_client.connect();

const app = express();

function setResponse(username, repos, followers, following, bio, hireable) {
    return `
    <h2><u>Data retrieved from GitHub API.</u></h2>

    <p>${username} has ${repos} public repositories on GitHub.</p>
    <p>${username} has ${followers} followers on GitHub.</p>
    <p>${username} is following ${following} users on GitHub.</p>
    <p>${username}'s bio: ${bio}</p>
    <p>${username} is ${hireable ? "hireable" : "not hireable"}.</p>

    `;
}

async function getRepos(req, res) {
    try {
        console.log("Fetching data...");

        const { username } = req.params;

        const response = await fetch(
            `https://api.github.com/users/${username}`
        );

        const data = await response.json();

        const repos = data.public_repos;
        const followers = data.followers;
        const following = data.following;
        const bio = data.bio;
        const hireable = data.hireable;

        //set to redis
        await redis_client.setEx(username, 3600, JSON.stringify({ repos, followers, following, bio, hireable }));

         res.send(setResponse(username, repos, followers, following, bio, hireable));
        // res.send({ repos, followers, following });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error fetching data"
        });
    }
}

app.get("/gitdata/:username", getRepos);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
