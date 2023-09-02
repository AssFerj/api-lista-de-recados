import { Database } from '../../../../../src/main/database/database.connection';
import { RedisDatabase } from '../../../../../src/main/database/redis.connection';
import { CacheRepository } from '../../../../../src/app/shared/database/repository/cache.repositiry'
import { CreateTaskUsecase } from '../../../../../src/app/features/task/usecases/create-task.usecase'
import { TaskRepository } from '../../../../../src/app/features/task/repository/task.repository';
import { Task } from '../../../../../src/app/models/Task';
import { User } from '../../../../../src/app/models/User';

describe('Testes unitários do create task usecase', () => {
    beforeAll(async () => {
        await Database.connect();
        await RedisDatabase.connect();
    })

    afterAll(async () => {
        await Database.connection.destroy()
        await RedisDatabase.connection.quit()
    })

    const user = new User('fName', 'lName', 'email', 'pass')
    const taskMock = new Task('desc', 'userId', false, user)

    test('Deveria retornar task already exist quando já tiver uma task cadastrada com o id informado', async () => {
        const sut = new CreateTaskUsecase()

        jest.spyOn(TaskRepository.prototype, 'getTaskById').mockResolvedValue(taskMock)

        const result = await sut.execute(taskMock)

        expect(result).toBeDefined()
        expect(result.ok).toBe(false)
        expect(result.message).toBe('Task already exist')
        expect(result.code).toBe(400)
        expect(result).not.toHaveProperty('data')
    })

    test('Deveria retornar task succesfully created quando houver sucesso na criação', async () => {
        const sut = new CreateTaskUsecase()

        jest.spyOn(TaskRepository.prototype, 'getTaskById').mockResolvedValue(undefined)
        jest.spyOn(TaskRepository.prototype, 'addTask').mockResolvedValue(taskMock)

        const result = await sut.execute(taskMock)

        expect(result).toBeDefined()
        expect(result.ok).toBe(true)
        expect(result.message).toBe('Task succesfully created')
        expect(result.code).toBe(200)
        expect(result).toHaveProperty('data')
    })
})