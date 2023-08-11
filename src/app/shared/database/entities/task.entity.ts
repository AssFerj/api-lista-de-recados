import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('tasks')
export class UserEntity {
    @PrimaryColumn({
        type: 'uuid'
    })
    id: string;

    @Column({
        name: 'user_id',
    })
    userId: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    description: string;

    @Column({
        default: false
    })
    archived: boolean;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;

    @ManyToOne(() => UserEntity, (entity) => UserEntity)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user: UserEntity;
}