import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import * as dotenv from "dotenv";
import { userRoutes } from './routes/user.routes';
import { Database } from "./dataBase/config/database.connection";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes());

Database.connect().then(()=>{
    console.log("Database is connected!");

    app.listen(process.env.PORT, ()=>{
        console.log('API is runing on port: '+ process.env.PORT)
    });
});

