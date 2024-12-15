import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', unique: true, length: 50, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;
}