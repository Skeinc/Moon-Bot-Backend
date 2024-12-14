import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('requests')
export class RequestEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'CASCADE' })
    user: UserEntity;

    @Column({ type: 'varchar', length: 50, nullable: false })
    type: string;

    @Column({ type: 'varchar', length: 20, nullable: false, default: 'pending' })
    status: string;

    @Column({ type: 'jsonb', nullable: false })
    requestData: any;

    @Column({ type: 'jsonb', nullable: true })
    responseData: any;

    @Column({ type: 'boolean', default: false, nullable: false })
    isPaid: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    finishedAt: Date;
}