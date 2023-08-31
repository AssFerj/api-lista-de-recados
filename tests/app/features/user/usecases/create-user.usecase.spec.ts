import { UserRepository } from '../../../../../src/app/features/user/repository/user.repository';
import { CreateUserUsecase } from '../../../../../src/app/features/user/usecases/create-user.usecase'
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

    // 1-Verificar se retorna um usuário e se a mensagem de retorno é User succesfully created
    test('Deveria retornar usuário já existe quando o user existir', async () => {
        const sut = new CreateUserUsecase()

        jest.spyOn(UserRepository.prototype, 'getUserByEmail')

        const result = sut.execute({
            firstName: 'any_firtName',
            lastName: 'any_lastName',
            email: 'any_email',
            password: 'any_password'
        })

        expect(result).toBeDefined()
        console.log('teste login usecase ',result);
        
    })
    // 2-Validar quando existe usuário mas o email está divergente, retorno deve ser invalidCredentials
    // 3-Validar quando existe usuário mas a senha está divergente, retorno deve ser invalidCredentials
});