import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('cards')
export class CardEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    type: 'major' | 'minor';

    @Column({ type: 'varchar', length: 50, nullable: true })
    suit: string;

    @Column({ type: 'int', nullable: true })
    number: number;

    @Column({ type: 'text', nullable: false })
    uprightMeaning: string;

    @Column({ type: 'text', nullable: false })
    reversedMeaning: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    imageUrl: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}