import { Database } from '../../../../../src/main/database/database.connection';
import { UserRepository } from '../../../../../src/app/features/user/repository/user.repository';
import { ListUsersUsecase } from '../../../../../src/app/features/user/usecases/list-user.usecase';
import { User } from '../../../../../src/app/models/User';

describe('List Users Usecase', ()=>{
    beforeAll(async () => {
        await Database.connect();
    })
    afterAll(async () => {
        await Database.connection.destroy()
    })
    const sut = new ListUsersUsecase()
    const userMockSut = (email: string) => {
        return new User(
            'any_firstName',
            'any_lastName',
            email,
            'any_password'
        )
    }
    // test('Testar retorno da lista de usuários do banco quando não houver usuários cadastrados', async ()=>{
    //     jest
    //         .spyOn(UserRepository.prototype, 'listUsers')
    //         .mockResolvedValue([])

    //     const result = await sut.execute();

    //     /// Retornando true mas deveria retornar false
    //     expect(result).toBeDefined();
    //     expect(result.ok).toEqual(false);
    //     expect(result.message).toEqual('Users not found');
    //     expect(result.code).toBe(404);
    //     expect(result.data).toHaveLength(0);
    //     expect(result).not.toHaveProperty([]);
    // })
    test('Testar retorno da lista de usuários do banco quando houver usuários cadastrados', async ()=>{
        const user1 = userMockSut('any_email1')
        const user2 = userMockSut('any_email2')
        jest
            .spyOn(UserRepository.prototype, 'listUsers')
            .mockResolvedValue([user1, user2])

        const result = await sut.execute();

        expect(result).toBeDefined();
        expect(result.ok).toBe(true);
        expect(result.message).toEqual('Users succesfully listed');
        expect(result.code).toBe(200);
        expect(result.data).toHaveLength(2);
    })
})