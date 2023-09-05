import { Database } from '../../../../../src/main/database/database.connection';
import { RedisDatabase } from '../../../../../src/main/database/redis.connection';
import { UpdateTaskUsecase } from '../../../../../src/app/features/task/usecases/update-task.usecase'
import { TaskRepository } from '../../../../../src/app/features/task/repository/task.repository';
import { CacheRepository } from '../../../../../src/app/shared/database/repository/cache.repositiry';
import { Task } from '../../../../../src/app/models/Task';
import { User } from '../../../../../src/app/models/User';

describe('Testes unitários do update task usecase', () => {
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

    const user = new User('fName', 'lName', 'email', 'pass')
    const task = new Task('any_desc', 'any_userId', false, user)

    test('Deveria retornar user not found quando não for encontrado um usuário', async () => {
        const sut = new UpdateTaskUsecase()
        const params = {
            userId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
            taskId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
            description: 'any_desc',
            archived: false
        }

        jest.spyOn(TaskRepository.prototype, 'getTaskById').mockResolvedValue(undefined)
        
        const result = await sut.execute(params)

        expect(result).toBeDefined()
        expect(result.ok).toBe(false)
        expect(result.message).toBe('Task not found')
        expect(result.code).toBe(404)
        expect(result).not.toHaveProperty('data')
    })

    test('Deveria retornar Description is not provided quando não for passado uma descrição', async () => {
        const sut = new UpdateTaskUsecase()
        const params = {
            userId: 'any_userId',
            taskId: 'any_taskId',
            description: '',
            archived: false
        }

        jest.spyOn(TaskRepository.prototype, 'getTaskById').mockResolvedValue(task)
        
        const result = await sut.execute(params)

        expect(result).toBeDefined()
        expect(result.ok).toBe(false)
        expect(result.message).toEqual('Description is not provided')
        expect(result.code).toBe(404)
        expect(result).not.toHaveProperty('data')
    })

    test('Deveria retornar Task succesfully updated quando houver sucesso na atualização', async () => {
        const sut = new UpdateTaskUsecase()
        const params = {
            userId: 'any_userId',
            taskId: 'any_taskId',
            description: 'any_description',
            archived: false
        }

        jest.spyOn(TaskRepository.prototype, 'getTaskById').mockResolvedValue(task)
        jest.spyOn(TaskRepository.prototype, 'updateTask').mockResolvedValue()
        
        const result = await sut.execute(params)

        expect(result).toBeDefined()
        expect(result.ok).toBe(true)
        expect(result.message).toEqual('Task succesfully updated')
        expect(result.code).toBe(200)
        expect(result).toHaveProperty('data')
    })
})