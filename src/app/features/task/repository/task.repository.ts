import { Database } from "../../../../main/database/database.connection";
import { Task } from "../../../models/Task";
import { User } from "../../../models/User";
import { TaskEntity } from "../../../shared/database/entities/task.entity";

export class TaskRepository {
  private repository = Database.connection.getRepository(TaskEntity);

  public async addTask(task: Task) {
    const taskEntity = this.repository.create({
      userId: task.userId,
      description: task.description,
      archived: task.type
    });

    const result = await this.repository.save(taskEntity);
    return TaskRepository.mapRowToModel(result);
  }
  
    public async listTasks(userId: string, type: boolean) {
      const result = await this.repository.find({
        where : {
          userId: userId,
          archived: type
        },
        relations: {
          user: true
        }
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

    public static mapRowToModel(row?: TaskEntity | null) {
      if(!row) {
        return undefined;
      }
      const user = User.create(row.user)
      return Task.create(row, user);
    }
}