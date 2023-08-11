import * as dotenv from 'dotenv';
dotenv.config();

export default process.env.REDIS_URL!;