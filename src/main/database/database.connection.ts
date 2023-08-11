import { DataSource } from "typeorm";
import databaseConfig from "../config/database.config";

export class Database {
    public static _connection: DataSource;

    public static async connect() {
        this._connection = await databaseConfig.initialize();
        console.log('Postgres Database is connected');
    }
    
    public static get connection() {
        return this._connection;
    }

}