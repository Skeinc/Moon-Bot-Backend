import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('referrals')
export class ReferralEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false, onDelete: 'CASCADE' })
    referrer: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false, onDelete: 'CASCADE' })
    referredUser: UserEntity;

    @Column({ type: 'int', default: 0, nullable: false })
    bonusCount: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}