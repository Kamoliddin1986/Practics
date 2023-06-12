import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { StuffRole } from "../../stuff_role/models/stuff_role.model";

interface RoleCreationAttr {
    name: string;
    description: string;
    status: number
}


@Table({tableName: "role"})
export class Role extends Model<Role, RoleCreationAttr>{
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
    description: string;

    @Column({
        type: DataType.INTEGER
    })
    status: number;

    @HasMany(() => StuffRole)
    stuff: StuffRole[]
}
