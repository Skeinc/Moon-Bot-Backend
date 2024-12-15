import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('tariffs')
export class TariffEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: 'varchar', length: 10, default: 'RUB', nullable: false })
    currency: string;

    @Column({ type: 'int', nullable: true })
    requestLimit: number;

    @Column({ type: 'int', nullable: true })
    duration: number;

    @Column({ type: 'boolean', default: true, nullable: false })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}