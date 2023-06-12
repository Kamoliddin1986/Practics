import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { StuffGroup } from "../../stuff_group/models/stuff_group.model";
import { Student } from "../../students/models/student.model";

interface GroupCreationAttr {
    name: string;
    start_year: string
}

@Table({tableName: 'group'})
export class Group extends Model<Group, GroupCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;


    @Column({
        type: DataType.STRING
    })
    name: string;

    @Column({
        type: DataType.STRING
    })
    start_year: string

    @HasMany(() => StuffGroup)
    stuff: StuffGroup[]

    @HasMany(() => Student)
    student: Student[]
}
