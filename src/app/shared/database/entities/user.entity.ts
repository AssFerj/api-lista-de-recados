import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryColumn({
        type: 'uuid'
    })
    id: string;

    @Column({
        name: 'first_name',
        type: 'varchar',
        length: 30,
        nullable: false
    })
    firstName: string;

    @Column({
        name: 'last_name',
        type: 'varchar',
        length: 30,
        nullable: false
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 30,
        nullable: false,
        unique: true
    })
    password: string;

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date;
}