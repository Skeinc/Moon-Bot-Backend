import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('payment_methods')
export class PaymentMethodEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', unique: true, length: 50, nullable: false })
    name: string;

    @Column({ type: 'boolean', nullable: false, default: true })
    isActive: boolean;
}