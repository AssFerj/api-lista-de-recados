import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        name: 'first_name',
        type: 'varchar',
        length: 100
    })
    firstName: string;

    @Column({
        name: 'last_name',
        type: 'varchar',
        length: 100
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: 100
    })
    email: string;
    
    @Column({
        type: 'varchar',
        length: 100
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