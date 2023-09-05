import { Database } from '../../../../../src/main/database/database.connection';
import { RedisDatabase } from '../../../../../src/main/database/redis.connection';
import { GetTaskByIdUsecase } from '../../../../../src/app/features/task/usecases/get-task-by-id.usecase'
import { Task } from '../../../../../src/app/models/Task';
import { User } from '../../../../../src/app/models/User';
import { TaskRepository } from '../../../../../src/app/features/task/repository/task.repository';
import { CacheRepository } from '../../../../../src/app/shared/database/repository/cache.repositiry';

describe('Testes unitários do create task usecase', () => {
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
    
    test('Deveria retornar Task successfully listed in cache quando houver task em cache', async () => {
        const sut = new GetTaskByIdUsecase()
        const mockTaskId = 'any_taskId' 

        jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue(mockTaskId)

        const result = await sut.execute(mockTaskId)

        expect(result).toBeDefined()
        expect(result.ok).toBe(true)
        expect(result.message).toBe('Task successfully listed in cache')
        expect(result.code).toBe(200)
        expect(result).toHaveProperty('data')
    })

    test('Deveria retornar Task not found quando não houver task com o id passado', async () => {
        const sut = new GetTaskByIdUsecase()
        const mockTaskId = '' 

        jest.spyOn(TaskRepository.prototype, 'getTaskById').mockResolvedValue(undefined)

        const result = await sut.execute(mockTaskId)

        expect(result).toBeDefined()
        expect(result.ok).toBe(false)
        expect(result.message).toBe('Task not found')
        expect(result.code).toBe(404)
        expect(result).not.toHaveProperty('data')
    })

    test('Deveria retornar Task successfully listed quando houver sucesso na requisição', async () => {
        const sut = new GetTaskByIdUsecase()
        const mockTaskId = '' 

        jest.spyOn(TaskRepository.prototype, 'getTaskById').mockResolvedValue(task)

        const result = await sut.execute(mockTaskId)

        expect(result).toBeDefined()
        expect(result.ok).toBe(true)
        expect(result.message).toBe('Task successfully listed')
        expect(result.code).toBe(200)
        expect(result).toHaveProperty('data')
    })
})