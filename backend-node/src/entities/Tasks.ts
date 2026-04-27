import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tasks")
export class Task {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    title!: string;

    @Column({ default: false })
    completed!: boolean;
}