import Redis from "ioredis";
import config from "../config/redis.config";

export class RedisDatabase {
    private static _connection: Redis;

    public static async connect() {
        this._connection = new Redis(config);
        console.log('Redis Database is connected');
    }

    public static get connection() {
        return this._connection;
    }
}