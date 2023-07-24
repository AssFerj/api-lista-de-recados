import { Database } from "../dataBase/config/database.connection";
import { users } from "../dataBase/dataUsers";
import { TaskEntity } from "../dataBase/entity/task.entity";
import { Task } from "../models/Task";

export class TaskRepository {
  private connection = Database.connection;
  private repository = Database.connection.getRepository(TaskEntity);

  public async addTask(index: number, task: Task) {
      return users[index].task.push(task);
    }
  
    public async listTasks(index: number) {
      return users[index].task;
    }
  
    public async findTaskIndex(userId: string, taskId: string) {
      const userIndex = users.findIndex((user) => user.id === userId);
      return users[userIndex].task.findIndex((task) => task.id === taskId);
    }
  
    public async getTaskById(userId: string, taskId: string) {
      const userIndex = users.findIndex((user) => user.id === userId);
      return users[userIndex].task.find((task) => task.id === taskId);
    }
  
    public async updateTask(userId: string, taskId: string, detail: string, description: string) {
      const userIndex = users.findIndex((user) => user.id === userId);
      const taskIndex = users[userIndex].task.findIndex((task) => task.id === taskId);
  
      users[userIndex].task[taskIndex].detail = detail;
      users[userIndex].task[taskIndex].description = description;
  
      return users[userIndex].task[taskIndex];
    }
  
    public async deleteTask(userId: string, taskId: string) {
      const userIndex = users.findIndex((user) => user.id === userId);
      const taskIndex = users[userIndex].task.findIndex((task) => task.id === taskId);
  
      return users[userIndex].task.splice(taskIndex, 1);
    }
}