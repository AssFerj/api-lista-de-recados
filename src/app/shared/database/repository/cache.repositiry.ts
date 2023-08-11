import { RedisDatabase } from "../../../../main/database/redis.connection";

export class CacheRepository {
    private _repository = RedisDatabase.connection;

    // GET - Buscar no banco

    public async get(key: string) {
        const result = await this._repository.get(key);

        if(!result) {
            return null
        }
        return JSON.parse(result);
    } 

    // SET - Salvar no banco

    public async set(key: string, value: any) {
        const result = await this._repository.set(key, JSON.stringify(value));
    } 

    // SETX - Salvar no banco com tempo de expiração

    public async setEx(key: string, seconds: number, value: any) {
        await this._repository.setex(key, seconds, value)
    }

    // DELETE - Deletar uma ou mais chaves

    public async delete(key: string) {
        await this._repository.del(key)
    }
}