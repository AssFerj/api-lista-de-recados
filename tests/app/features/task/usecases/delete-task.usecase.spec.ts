import { Database } from '../../../../../src/main/database/database.connection';
import { RedisDatabase } from '../../../../../src/main/database/redis.connection';
import { DeleteTaskUsecase } from '../../../../../src/app/features/task/usecases/delete-task.usecase'
import { TaskRepository } from '../../../../../src/app/features/task/repository/task.repository';
import { CacheRepository } from '../../../../../src/app/shared/database/repository/cache.repositiry';

describe('Testes unitários do delete task usecase', () => {
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

    test('Deveria retornar task succesfully deleted quando houver sucesso na exclusão da task', async () => {
        const sut = new DeleteTaskUsecase()
        const params = {
            taskIndex: 1,
            taskId: 'any_taskId'
        }

        jest.spyOn(TaskRepository.prototype, 'deleteTask').mockResolvedValue(params.taskIndex)
        jest.spyOn(CacheRepository.prototype, 'delete').mockResolvedValue()
        
        const result = await sut.execute(params.taskId)

        expect(result).toBeDefined()
        expect(result.ok).toBe(true)
        expect(result.message).toBe('Task succesfully deleted')
        expect(result.code).toBe(200)
        expect(result).toHaveProperty('data')
    })
})