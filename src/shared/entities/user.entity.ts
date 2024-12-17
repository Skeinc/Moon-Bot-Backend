import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoleEntity } from "./role.entity";
import { ReferralEntity } from "./referral.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'bigint', unique: true, nullable: false })
    telegramId: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    username: string;

    @ManyToOne(() => RoleEntity, (role) => role.id, { nullable: true, onDelete: 'SET NULL' })
    role: RoleEntity;

    @Column({ type: 'int', default: 3, nullable: false })
    requestsLeft: number;

    @Column({ type: 'timestamp', nullable: true })
    subscriptionExpiry: Date;

    @ManyToOne(() => UserEntity, { nullable: true, onDelete: 'SET NULL' })
    referrer: UserEntity;

    @Column({ type: 'varchar', length: 255, nullable: false })
    referralLink: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    lastLogin: Date;
}