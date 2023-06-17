import express from 'express';
import cors from 'cors';
import { userRoutes } from './routes/user.routes';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes());

app.listen(3030, ()=>{
    console.log('API is runing!')
});
