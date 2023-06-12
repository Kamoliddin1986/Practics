
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "../../role/models/role.model";
import { Stuff } from "../../stuff/models/stuff.model";

interface StuffRoleCreationAttr {
    role_id: number;
    stuff_id: number
}


@Table({tableName: "stuff_role"})
export class StuffRole extends Model<StuffRole, StuffRoleCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER
    })
    role_id: number;


    @ForeignKey(() => Stuff)
    @Column({
        type: DataType.INTEGER
    })
    stuff_id: number;

    @BelongsTo(() => Role)
    roles: Role

    
    @BelongsTo(() => Stuff)
    stuff: Stuff

}
