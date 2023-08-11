import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export class JwtService {

    // FAZ LOGIN
    public createToken(data: any): string {
        return jwt.sign(data, process.env.JWT_SECRET!);
    }

    //VALIDA O TOKEN
    public verifyTopken(token: string): boolean {
        try {
            jwt.verify(token, process.env.JWT_SECRET!);
            return true;
        } catch (error) {
            return false;
        }
    }

    //RECEBE O TOKEN PARA DECODIFICAÇAO
    public decodeToken(token: string): any {
        const result = jwt.decode(token);

        if(!result){
            return null;
        }

        return result;
    }
}