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
    test('Deveria retornar users not found', async ()=>{
        jest
            .spyOn(UserRepository.prototype, 'listUsers').mockResolvedValue([])
            

        const result = await sut.execute();

        expect(result).toBeDefined();
        expect(result.ok).toBe(false);
        expect(result.message).toEqual('Not have Users');
        expect(result.code).toBe(404);
    })
    test('Deveria retornar users seccesfully listed quando for consultado os usuários', async ()=>{
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