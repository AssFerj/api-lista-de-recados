import { Database } from '../../../../../src/main/database/database.connection';
import { UserRepository } from '../../../../../src/app/features/user/repository/user.repository';
import { LoginParams, LoginUsecase } from '../../../../../src/app/features/user/usecases/login.usecase';
import { User } from '../../../../../src/app/models/User';
import { JwtService } from '../../../../../src/app/shared/services/jwt.service';

describe('Teste do login usecase', ()=>{
    beforeAll(async () => {
        await Database.connect();
    })
    afterAll(async () => {
        await Database.connection.destroy()
    })
    const userParams: LoginParams = {
        email: 'any_email',
        password: 'any_pass'
    }
    const mockUser = new User('', '', 'any_email', 'any_pass')
    test('Deve retornar unauthorized quando não encontrar email e senha', async ()=> {
        const sut = new LoginUsecase();
        jest.spyOn(UserRepository.prototype, 'login').mockResolvedValue(undefined)
        
        const result = await sut.execute(userParams)

        expect(result).toBeDefined();
        expect(result.ok).toBe(false);
        expect(result.message).toEqual('Invalid credentials');
        expect(result.code).toBe(401);
        expect(result).not.toHaveProperty('data')
    })
    test('Deve retornar usuario logado e token quando sucesso', async ()=> {
        const sut = new LoginUsecase();
        const token = new JwtService().createToken(mockUser.toJson())
        jest.spyOn(UserRepository.prototype, 'login').mockResolvedValue(mockUser)
        jest.spyOn(JwtService.prototype, 'createToken').mockReturnValue(token)


        const result = await sut.execute(userParams)

        expect(result).toBeDefined();
        expect(result.ok).toBe(true);
        expect(result.message).toEqual('Login successfully done');
        expect(result.code).toBe(200);
        expect(result.data).toEqual({result: mockUser, token})
    })
})