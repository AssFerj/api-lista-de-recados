import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity('users')
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    email: string;
    
    @Column({
        type: 'varchar',
        length: 50
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