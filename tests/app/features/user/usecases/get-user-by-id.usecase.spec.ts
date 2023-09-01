import { GetUserByIdUsecase } from '../../../../../src/app/features/user/usecases/get-user-by-id.usecase'
import { UserRepository } from '../../../../../src/app/features/user/repository/user.repository'
import { Database } from '../../../../../src/main/database/database.connection';
import { RedisDatabase } from '../../../../../src/main/database/redis.connection';
import { User } from '../../../../../src/app/models/User';

describe('Teste do metodo get user by id do user usecase', () => {
    beforeAll(async () => {
        await Database.connect();
        await RedisDatabase.connect();
    })
    afterAll(async () => {
        await Database.connection.destroy()
        await RedisDatabase.connection.quit()
    })

    // 1 - Testar se existe um usuário cadastrado com o id passado
    test('Deveria retornar usuário já existe quando o user existir', async () => {
        const sut = new GetUserByIdUsecase()
        const user = new User('any_firtName', 'any_lastName', 'any_email', 'any_password')

        jest.spyOn(UserRepository.prototype, 'getById').mockResolvedValue(undefined)

        const result = await sut.execute(user.id)

        expect(result).toBeDefined()
        expect(result.ok).toBe(false)
        expect(result.message).toBe(`Not found user with id ${user.id}`)
        expect(result.code).toBe(404)
        expect(result).not.toHaveProperty('data')
    })
    // 2 - Testar o retorno de sucesso quando o usuário for buscado
    test('Deveria retornar user succesfully created', async () => {
        const sut = new GetUserByIdUsecase()
        const user = new User('any_firtName', 'any_lastName', 'any_email', 'any_password')

        jest.spyOn(UserRepository.prototype, 'getById').mockResolvedValue(user)
        const result = await sut.execute(user.id)

        expect(result).toBeDefined()
        expect(result.ok).toBe(true)
        expect(result.message).toBe('User succesfully listed')
        expect(result.code).toBe(200)
        expect(result.data).toEqual(user.toJson())
    })
})