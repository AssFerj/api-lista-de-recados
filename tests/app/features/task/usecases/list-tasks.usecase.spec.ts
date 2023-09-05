import { Database } from '../../../../../src/main/database/database.connection';
import { RedisDatabase } from '../../../../../src/main/database/redis.connection';
import { ListTasksUsecase } from '../../../../../src/app/features/task/usecases/list-tasks.usecase'
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

    test('Deveria retornar User ID is not found quando não houver id do usuário', async () => {
        const sut = new ListTasksUsecase()
        const params = {
            userId: '',
            type: 'any_type'
        }

        jest.spyOn(TaskRepository.prototype, 'listTasks').mockResolvedValue([])

        const result = await sut.execute(params)

        expect(result).toBeDefined()
        expect(result.ok).toBe(false)
        expect(result.message).toBe('User ID is not found')
        expect(result.code).toBe(404)
        expect(result).not.toHaveProperty('data')
    })

    test('Deveria retornar Type is not found quando não houver o type da task', async () => {
        const sut = new ListTasksUsecase()
        const params = {
            userId: 'any_userId',
            type: ''
        }

        jest.spyOn(TaskRepository.prototype, 'listTasks').mockResolvedValue([task])

        const result = await sut.execute(params)

        expect(result).toBeDefined()
        expect(result.ok).toBe(false)
        expect(result.message).toBe('Type is not found')
        expect(result.code).toBe(404)
        expect(result).not.toHaveProperty('data')
    })

    test('Deveria retornar Tasks successfully listed in cache quando houver task em cache', async () => {
        const sut = new ListTasksUsecase()
        const params = {
            userId: 'any_userId',
            type: 'any_type'
        }

        jest.spyOn(CacheRepository.prototype, 'get').mockResolvedValue([])

        const result = await sut.execute(params)

        expect(result).toBeDefined()
        expect(result.ok).toBe(true)
        expect(result.message).toBe('Tasks successfully listed in cache')
        expect(result.code).toBe(200)
        expect(result).toHaveProperty('data')
    })

    test('Deveria retornar Tasks succesfully listed quando houver sucesso na requisição', async () => {
        const sut = new ListTasksUsecase()
        const params = {
            userId: 'any_userId',
            type: 'any_type'
        }

        jest.spyOn(TaskRepository.prototype, 'listTasks').mockResolvedValue([])
        jest.spyOn(CacheRepository.prototype, 'set').mockResolvedValue()

        const result = await sut.execute(params)

        expect(result).toBeDefined()
        expect(result.ok).toBe(true)
        expect(result.message).toBe('Tasks successfully listed')
        expect(result.code).toBe(200)
        expect(result).toHaveProperty('data')
    })
})