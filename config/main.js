import {connectRedis} from "./redis.js";

const config = {
    port: process.env.PORT || 4000,   
    redis: connectRedis 
}
export default config;