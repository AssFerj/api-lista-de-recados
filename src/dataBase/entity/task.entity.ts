import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'tasks'})
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    description: string;

    @Column()
    archived: boolean;

}