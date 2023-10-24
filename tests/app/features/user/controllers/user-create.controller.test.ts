import request from 'supertest'
import  { Database } from '../../../../../src/main/database/database.connection'
import { RedisDatabase } from '../../../../../src/main/database/redis.connection'
import { createApp } from '../../../../../src/main/config/express.config'
import { CreateUserUsecase } from '../../../../../src/app/features/user/usecases/create-user.usecase'
import { UsecaseResponse } from '../../../../../src/app/shared/util/usecase.response'
import { UserEntity } from '../../../../../src/app/shared/database/entities/user.entity'
import { User } from '../../../../../src/app/models/User'
import { UserRepository } from '../../../../../src/app/features/user/repository/user.repository'
import supertest from 'supertest'

describe('Testes de API do controller de user - método create', () => {
    beforeAll(async () => {
        await Database.connect()
        await RedisDatabase.connect()

        jest.setTimeout(20000)
    })

    beforeEach(async () => {
        // jest.clearAllMocks()
        // jest.resetAllMocks()

        // jest.setTimeout(20000)
        const repository = Database.connection.getRepository(UserEntity);

        await repository.clear();
      })

    afterAll(async () => {
        await Database.connection.destroy()
        await RedisDatabase.connection.quit()

        jest.setTimeout(20000)
    })

    const createSut = () => {
        return createApp()
    }

    const createUser = async (user: User) => {
        const repository = new UserRepository();
        await repository.createUser(user);
    };

    test("Deveria retornar erro 400 se não for informado o username", async () => {
        const result = await supertest(createSut()).post("/user").send({});
    
        expect(result).toBeDefined();
        expect(result.status).toBe(400);
        expect(result.status).toEqual(400);
        expect(result).toHaveProperty("status", 400);
        expect(result).toHaveProperty("body.ok");
        // expect(result.body.message).toBe("Fill in the fields and try again");
        expect(result.body.ok).toBe(false);
    });

    // test('Deveria retornar 200 se o usecase for executado com sucesso', async () => {
    //     const app = createSut()


    //     const result = await request(app).post('users/').send({
    //         firtName: 'teste',
    //         lastName: '1',
    //         email: 'teste@mail.com',
    //         password: '123456'
    //     }).expect(200)

    //     expect(result).toBeDefined()
    //     expect(result.ok).toBe(true)
    //     expect(result.status).toEqual(200)
    //     expect(result).toHaveProperty('body')

    //     expect(result.body).toHaveProperty('ok', true)
    // })

    // test('Deveria retornar 500 se o usecase disparar uma esceção', async () => {
    //     const app = createSut()

    //     jest.spyOn(CreateUserUsecase.prototype, 'execute').mockRejectedValue('Erro simulado')

    //     const result = await request(app).post('users/').send({
    //         firtName: 'teste',
    //         lastName: '1',
    //         email: 'teste@mail.com',
    //         password: '123456'
    //     })

    //     expect(result).toBeDefined()
    //     expect(result.ok).toBe(true)
    //     expect(result.status).toEqual(500)
    //     expect(result).toHaveProperty('body')

    //     expect(result.body).toHaveProperty('ok', true)
    // })
})