import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity('users')
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column({
        type: 'varchar',
        length: 100
    })
    firstName: string;

    @Column({
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