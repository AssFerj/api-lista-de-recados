import request from 'supertest'
import  { Database } from '../../../../../src/main/database/database.connection'
import { RedisDatabase } from '../../../../../src/main/database/redis.connection'
import { createApp } from '../../../../../src/main/config/express.config'
import { CreateUserUsecase } from '../../../../../src/app/features/user/usecases/create-user.usecase'
import { UsecaseResponse } from '../../../../../src/app/shared/util/usecase.response'

describe('Testes de API do controller de user - método create', () => {
    beforeAll(async () => {
        await Database.connect()
        await RedisDatabase.connect()

        jest.setTimeout(20000)
    })

    beforeEach(() => {
        jest.clearAllMocks()
        jest.resetAllMocks()

        jest.setTimeout(20000)
      })

    afterAll(async () => {
        await Database.connection.destroy()
        await RedisDatabase.connection.quit()

        jest.setTimeout(20000)
    })

    const createSut = () => {
        return createApp()
    }

    test('Deveria retornar 200 se o usecase for executado com sucesso', async () => {
        const app = createSut()

        // jest.spyOn(CreateUserUsecase.prototype, 'execute').mockResolvedValue(UsecaseResponse.success('User succesfully created', {}))

        const result = await request(app).post('users/').send({
            firtName: 'teste',
            lastName: '1',
            email: 'teste@mail.com',
            password: '123456'
        }).expect(200)

        expect(result).toBeDefined()
        expect(result.ok).toBe(true)
        expect(result.status).toEqual(200)
        expect(result).toHaveProperty('body')

        expect(result.body).toHaveProperty('ok', true)
    })

    test('Deveria retornar 500 se o usecase disparar uma esceção', async () => {
        const app = createSut()

        jest.spyOn(CreateUserUsecase.prototype, 'execute').mockRejectedValue('Erro simulado')

        const result = await request(app).post('users/').send({
            firtName: 'teste',
            lastName: '1',
            email: 'teste@mail.com',
            password: '123456'
        })

        expect(result).toBeDefined()
        expect(result.ok).toBe(true)
        expect(result.status).toEqual(500)
        expect(result).toHaveProperty('body')

        expect(result.body).toHaveProperty('ok', true)
    })
})