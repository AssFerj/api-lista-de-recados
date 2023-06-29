import { v4 as createUuid } from "uuid";

// export interface TaskArqchive {
//     archived: boolean,
// }

export class Task {
    private _id: string;

    constructor(private _description: string, private _userId: string, private _type: boolean) {
        this._id = createUuid();
        this._type = false;
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
    
    public get type(): boolean{
        return this._type;
    }

    public toJson() {
        return {
            id: this._id,
            userId: this._userId,
            description: this._description,
            type: this._type
        }
    }

    public set userId(newUserId: string){
        this._userId = newUserId;
    }

    public set description(newDescription: string){
        this._description = newDescription;
    }

    public set type(newType: boolean) {
        this._type = newType;
    }
}