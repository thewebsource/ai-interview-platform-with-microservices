import { BaseEntity, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'common_tbl' })
export class CommonEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    // Auto set timestamp when row is created
    @CreateDateColumn({type: "timestamptz"})
    created_at!: Date;

    // Auto udpate timestamp when row is udpated
    @UpdateDateColumn({ type: "timestamptz"})
    modified_at!: Date;
}