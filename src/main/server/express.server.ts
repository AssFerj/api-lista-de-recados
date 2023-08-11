import { createApp } from "../config/express.config"

export class Server {
    public static listen() {
        const app = createApp();
        app.listen(process.env.PORT, () => {
            console.log('API is running on port ' + process.env.PORT);
            
        })
    }
}