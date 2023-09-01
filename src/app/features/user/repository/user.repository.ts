import { Database } from '../../../../main/database/database.connection'
import { User } from "../../../../app/models/User";
import { UserEntity } from '../../../shared/database/entities/user.entity'

// interface LoggedUser {
//   email: string;
//   password: string;
// }
export class UserRepository {
  private repository = Database.connection.getRepository(UserEntity);

  public async listUsers() {
    const result = await this.repository.find();    
    
    return result.map((entity) => UserRepository.mapRowToModel(entity));    
  }

  public async createUser(user: User): Promise<User | undefined> {
    const userEntity = this.repository.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    });

    const result = await this.repository.save(userEntity);
    return UserRepository.mapRowToModel(result)
  }

  public async login(logedUser: User): Promise<User | undefined> {
    const result = await this.repository.findOne({
      where: {
        email: logedUser.email,
        password: logedUser.password,
      },
    });
    
    return UserRepository.mapRowToModel(result);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.repository.findOne({
      where: {
        email: email
      }
    })

    if(!result) {
      return undefined;
    }

    return UserRepository.mapRowToModel(result);
  }

  public async getById(id: string): Promise<User | undefined> {
    const result = await this.repository.findOne({
      where: {
        id: id
      }
    })

    return UserRepository.mapRowToModel(result);
  }

  public static mapRowToModel(row?: UserEntity | null): User | undefined {
    if(!row) {
      return undefined;
    }
    return User.create(row);
  }
}
