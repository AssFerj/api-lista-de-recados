import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();

let entities = ['src/app/chared/database/entities/**/*.ts']
let migrations = ['src/app/shared/database/migrations/**/*.ts']

if (process.env.DB_ENV === 'production') {
    entities = ['build/database/entities/**/*.js']
    migrations = ['build/database/migrations/**/*.js']
}

if(process.env.DB_ENV === 'test') {
    new DataSource({
        // type: 'sqlite',
        // database: 'db.sqlite3',
        type: 'postgres',
        url: process.env.DB_TEST_URL,
        port: 5432,
        ssl: {
            rejectUnauthorized: false,
        },
        synchronize: false,
        migrations: ["tests/app/shared/database/migrations/**/*.ts"],
        entities: ["src/app/shared/database/entities/**/*.ts"],
        schema: "lista-recados"
    });
}

export default new DataSource({

    type: 'postgres',
    url: process.env.DB_URL,
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
    },
    migrations: ["src/app/shared/database/migrations/**/*.ts"],
    entities: ["src/app/shared/database/entities/**/*.ts"],
    schema: "lista-recados"
});

// let entities = ['src/app/chared/database/entities/**/*.ts']
// let migrations = ['src/app/shared/database/migrations/**/*.ts']

// if (process.env.DB_ENV === 'production') {
//     entities = ['build/database/entities/**/*.js']
//     migrations = ['build/database/migrations/**/*.js']
// }

// let config =  new DataSource({
//     type: 'postgres',
//     url: process.env.DB_URL,
//     port: 5432,
//     ssl: {
//         rejectUnauthorized: false,
//     },
//     migrations: ["src/app/shared/database/migrations/**/*.ts"],
//     entities: ["src/app/shared/database/entities/**/*.ts"],
//     schema: "lista_recados",
// });

// if(process.env.DB_ENV === 'test') {
//     config =  new DataSource({
//         type: 'postgres',
//         database: 'db.sqlite3',
//         synchronize: false,
//         migrations: ["tests/app/shared/database/migrations/**/*.ts"]
//     });
// }

// export default config;