import redis_client from "../config/redis.js";
import { setResponse } from "../utils/redisResponse.js";

const getGitHubData = async (req, res) => {
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
        const bio = data.bio || "No bio available.";
        const hireable = data.hireable ?? false;

        //set to redis
        await redis_client.setEx(username, 3600, JSON.stringify({ repos, followers, following, bio, hireable }));

         res.send(setResponse(username, repos, followers, following, bio, hireable));

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error fetching data"
        });
    }
}

export default getGitHubData;
