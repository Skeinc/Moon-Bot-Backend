import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { ReferralEntity } from "./referral.entity";

@Entity('bonuses')
export class BonusEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.id, { nullable: false, onDelete: 'CASCADE' })
    user: UserEntity;

    @ManyToOne(() => ReferralEntity, (referral) => referral.id, { nullable: true, onDelete: 'SET NULL' })
    referral: ReferralEntity;

    @Column({ type: 'varchar', length: '50', nullable: false })
    bonusType: string;

    @Column({ type: 'int', nullable: false })
    bonusValue: number;

    @Column({ type: 'boolean', default: false, nullable: false })
    isRedeemed: boolean;

    @Column({ type: 'timestamp', nullable: true })
    expiresAt: Date;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}