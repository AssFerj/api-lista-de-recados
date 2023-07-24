import { Database } from "../dataBase/config/database.connection";
import { users } from "../dataBase/dataUsers";
import { UserEntity } from "../dataBase/entity/user.entity";

export class UserRepository {
  private connection = Database.connection;
  private repository = Database.connection.getRepository(UserEntity);


    static getByEmail: any;
  public async getById(id: string) {
    return users.find((user) => user.id === id);
  }

  public async getByEmail(email: string) {
    return users.find((user) => user.email === email);
  }

  public async findIndex(id: string) {
    return users.findIndex((user) => user.id === id);
  }
}