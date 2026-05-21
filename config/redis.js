import redis from "redis";

const redis_client = redis.createClient();

redis_client.on("error", (err) => {
    console.error("Redis Error:", err);
});

export const connectRedis = async () => {
    await redis_client.connect();
    console.log("Redis connected successfully");
};

export default redis_client;