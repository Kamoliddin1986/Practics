import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Stuff } from "../../stuff/models/stuff.model";
import { Group } from "../../group/models/group.model";

interface StuffGroupCreationAttr {
    stuff_id: number;
    group_id: number;
}

@Table({tableName: 'stuff_group'})
export class StuffGroup extends Model<StuffGroup, StuffGroupCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;
    @ForeignKey(() => Stuff)
    @Column({
        type: DataType.INTEGER
    })
    stuff_id: number;
    
    @ForeignKey(() => Group)
    @Column({
        type: DataType.INTEGER
    })
    group_id: number;

    @BelongsTo(() => Group)
    group: Group[]

    @BelongsTo(() => Stuff)
    stuff: Stuff[]

}
