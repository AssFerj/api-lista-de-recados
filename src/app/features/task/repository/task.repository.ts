import { Database } from "../../../../main/database/database.connection";
import { Task } from "../../../models/Task";
import { TaskEntity } from "../../../shared/database/entities/task.entity";


export class TaskRepository {
  private repository = Database.connection.getRepository(TaskEntity);

  public async addTask(task: Task) {
    const taskEntity = this.repository.create({
      userId: task.userId,
      description: task.description,
      archived: task.type
    });

    await this.repository.save(taskEntity);
    }
  
    public async listTasks(userId: string, type: boolean) {
      const result = await this.repository.findBy({
        userId: userId,
        archived: type
      });
      return result.map((entity) => TaskRepository.mapRowToModel(entity));    
    }
  
    public async getTaskById(taskId: string) {
      const result = await this.repository.findOne({
        where: {
          id: taskId,
        },
        relations: {
          user: true
        }
      })
  
      if(!result) {
        return undefined;
      }
  
      return TaskRepository.mapRowToModel(result);
    }
  
    public async updateTask(task: Task) {
      this.repository.update({
        id: task.id
      },{
        description: task.description,
        archived: task.type
      })
    }
  
    public async deleteTask(taskId: string) {     
      const result = await this.repository.delete(taskId);
      return result.affected ?? 0;
    }

    public static mapRowToModel(row: TaskEntity) {
      return Task.create(row);
    }
}