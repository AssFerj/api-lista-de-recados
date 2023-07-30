import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { UserEntity } from "../entity/user.entity";
import { TaskEntity } from "../entity/task.entity";

dotenv.config();

const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DB_URL,
    // host: process.env.DB_HOST,
    // username: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    },
    // logging: true,
    synchronize: false,
    schema: 'lista_recados',
    entities: [UserEntity, TaskEntity],
})

export default dataSource;