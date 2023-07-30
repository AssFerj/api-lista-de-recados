import { Database } from "../dataBase/config/database.connection";
import { UserEntity } from "../dataBase/entity/user.entity";
import { User } from "../models/User";

export class UserRepository {
  private repository = Database.connection.getRepository(UserEntity);

  public async listUsers() {
    const result = await this.repository.find();
    return result.map((entity) => UserRepository.mapRowToModel(entity));    
  }

  public async createUser(user: User) {
    const userEntity = this.repository.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });

    await this.repository.save(userEntity);
  }

  public async login(logedUser: User) {
    const result = await this.repository.findOne({
      where: {
        email: logedUser.email,
        password: logedUser.password,
      },
    });

    if (!result) {
      return undefined;
    }

    return UserRepository.mapRowToModel(result);
  }

  public async getByEmail(email: string) {
    const result = await this.repository.findOneBy({
      email
    })
    return !!result;
  }

  public async getById(id: string) {
    const result = await this.repository.findOne({
      where: {
        id: id
      }
    })

    if(!result) {
      return undefined;
    }
    console.log(result);
    

    return UserRepository.mapRowToModel(result);
  }

  public static mapRowToModel(row: UserEntity) {
    return User.create(row);
  }
}
