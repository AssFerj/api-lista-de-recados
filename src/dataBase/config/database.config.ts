import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    },
    logging: true,
    synchronize: false,
    schema: 'lista_recados',
    entities: ["src/database/entity/**/*entity.ts"],
})

export default dataSource;