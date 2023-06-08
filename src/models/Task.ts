import { v4 as createUuid } from "uuid";

export class Task {
    private _id: string;

    constructor(private _description: string, private _userId: string) {
        this._id = createUuid();
    }

    public get id(): string{
        return this._id;
    }

    public get userId(): string{
        return this._userId;
    }

    public get description(): string{
        return this._description;
    }

    public toJson() {
        return {
            id: this._id,
            userId: this._userId,
            description: this._description
        }
    }

    public set userId(newUserId: string){
        this._userId = newUserId;
    }

    public set description(newDescription: string){
        this._description = newDescription;
    }
}