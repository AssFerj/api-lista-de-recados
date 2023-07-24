import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity({name: 'tasks'})
export class TaskEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    userId: string;

    @Column()
    description: string;

    @Column()
    archived: boolean;

}