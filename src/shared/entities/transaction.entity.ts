import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { PaymentMethodEntity } from "./payment-method.entity";
import { TariffEntity } from "./tariff.entity";

@Entity('transactions')
export class TransactionEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, { nullable: false, onDelete: 'CASCADE' })
    user: UserEntity;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    amount: number;

    @Column({ type: 'varchar', length: 10, default: 'RUB', nullable: false })
    currency: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    type: string;

    @Column({ type: 'varchar', length: 20, nullable: false })
    status: string;

    @ManyToOne(() => PaymentMethodEntity, (paymentMethod) => paymentMethod.id, { nullable: false, onDelete: 'RESTRICT' })
    paymentMethod: PaymentMethodEntity;

    @Column({ type: 'varchar', length: 255, nullable: true })
    transactionId: string;

    @ManyToOne(() => TariffEntity, { nullable: true, onDelete: 'SET NULL' })
    tariff: TariffEntity;

    @Column({ type: 'text', nullable: true })
    description: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    finishedAt: Date;
}