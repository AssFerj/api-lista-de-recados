import { v4 as createUuid } from "uuid";
import { UserEntity } from "../shared/database/entities/user.entity";

export class User{
    private _id: string;

    constructor(
        private _firstName: string, 
        private _lastName: string, 
        private _email: string, 
        private _password: string
    ){
        this._id = createUuid();
    }

    public get id(): string {
        return this._id;
    }

    public get firstName(): string {
        return this._firstName;
    }

    public get lastName(): string {
        return this._lastName;
    }

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._password;
    }

    public toJson() {
        return {
            id: this._id,
            firstName: this._firstName,
            lastName: this._lastName,
            email: this._email,
        };
    }

    public static create(entity: UserEntity){
        const user = new User(
            entity.firstName,
            entity.lastName,
            entity.email,
            entity.password
        );
        user._id = entity.id;

        return user;
    }

    public set firstName(newFirstName: string) {
        this._firstName = newFirstName;
    }

    public set lastName(newLastName: string) {
        this._lastName = newLastName;
    }

    public set email(newEmail: string) {
        this._email = newEmail;
    }

    public set password(newPassword: string) {
        this._password = newPassword;
    }
}