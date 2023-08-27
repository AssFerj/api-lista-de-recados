import { LoginUsecase } from '../../../../../src/app/features/user/usecases/login.usecase'


describe('Testes unitários do login usecase', () => {
    beforeAll(() => {
        
    })

    // 1-Verificar se o retorno é invalidCredentials se o usuário não existir
    test('Deveria retornar acesso não autorizado squando o user não existir', () => {
        const sut = new LoginUsecase()

        const result = sut.execute({
            email: 'any_email',
            password: 'any_password'
        })

        expect(result).toBeDefined()
        console.log('teste login usecase ',result);
        
    })
    // 2-Validar quando existe usuário mas o email está divergente, retorno deve ser invalidCredentials
    // 3-Validar quando existe usuário mas a senha está divergente, retorno deve ser invalidCredentials
});