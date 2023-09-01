import { UserRepository } from '../../../../../src/app/features/user/repository/user.repository';
import { CreateUserUsecase } from '../../../../../src/app/features/user/usecases/create-user.usecase'
import { User } from '../../../../../src/app/models/User';
import { Database } from '../../../../../src/main/database/database.connection';
import { RedisDatabase } from '../../../../../src/main/database/redis.connection'


describe('Testes unitários do create user usecase', () => {
    beforeAll(async () => {
        await Database.connect();
        await RedisDatabase.connect();
    })
    afterAll(async () => {
        await Database.connection.destroy()
        await RedisDatabase.connection.quit()
    })

    // 1-Verificar se há um usuário cadastrado com o email passado
    test('Deveria retornar usuário já existe quando o user existir', async () => {
        const sut = new CreateUserUsecase()
        const userMock = new User('any_firtName', 'any_lastName', 'any_email', 'any_password')

        jest.spyOn(UserRepository.prototype, 'getUserByEmail').mockResolvedValue(userMock)

        const result = await sut.execute(userMock)

        expect(result).toBeDefined()
        expect(result.ok).toBe(false)
        expect(result.message).toBe('User already exist')
        expect(result.code).toBe(400)
        expect(result).not.toHaveProperty('data')
    })
    // 2-Testar o sucesso do create
    test('Deveria retornar user succesfully created', async () => {
        const sut = new CreateUserUsecase()
        const newUser = new User('any_firtName', 'any_lastName', 'any_email', 'any_password')

        jest.spyOn(UserRepository.prototype, 'getUserByEmail').mockResolvedValue(undefined)
        jest.spyOn(UserRepository.prototype, 'createUser').mockResolvedValue(newUser)
        const result = await sut.execute(newUser)

        expect(result).toBeDefined()
        expect(result.ok).toBe(true)
        expect(result.message).toBe('User succesfully created')
        expect(result.code).toBe(200)
        expect(result.data).toEqual(newUser.toJson())
    })
});