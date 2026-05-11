import { Entity, Column } from "typeorm";
import { CommonEntity } from "./baseEntity";


@Entity({name: "users", schema: "auth_schema"})
export class UserEntity extends CommonEntity {
    @Column()
    username!: string;

    @Column({ type: "varchar", nullable: false})
    first_name!: string;

    @Column({ type: "varchar", nullable: true})
    last_name!: string;

    @Column({ type: "varchar", unique: true, nullable: false })
    email!: string;

    @Column({ 
        type: "enum",
        enum: ["ACTIVE", "INACTIVE", 'BLOCKED'],
        default: 'ACTIVE'
    })
    status!: ["ACTIVE", "INACTIVE", 'BLOCKED'];

    @Column({ type: "boolean", default: false })
    is_email_verified!: boolean;

    @Column({ type: "timestamptz", nullable: true })
    email_verified_at?: Date;

    @Column()
    password!: string;
}