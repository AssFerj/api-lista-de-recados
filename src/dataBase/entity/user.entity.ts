import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

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

    @Column({
        name: 'created_at'
    })
    createdAt: Date;

    @Column({
        name: 'updated_at'
    })
    updatedAt: Date;

}