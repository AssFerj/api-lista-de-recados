import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { UserEntity } from "./user.entity";

@Entity({name: 'tasks'})
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        name: 'user_id'
    })
    userId: string;

    @Column()
    description: string;

    @Column()
    archived: boolean;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'id'})
    user: UserEntity
}