import redis_client from "../config/redis.js";
import { setResponse } from "../utils/redisResponse.js";

const cache = async (req, res, next) => {
    const { username } = req.params;

    try {
        // Check if data exists in cache
        const cachedData = await redis_client.get(username); 
         
        if (cachedData) {
            const { repos, followers, following, bio, hireable } = JSON.parse(cachedData);

            console.log("Data retrieved from cache.");
            return res.send(setResponse(username, repos, followers, following, bio, hireable));
        }

        next();
    } catch (error) {
        console.error(`Error retrieving data from cache: ${error}`);
        next();
    }   
}

export default cache;