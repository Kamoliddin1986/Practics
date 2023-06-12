import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Subject } from "../../subjects/models/subject.model";
import { Stuff } from "../../stuff/models/stuff.model";

interface StuffSubjectCreationattr {
    stuff_id: number;
    subject_id: number
}

@Table({tableName: 'stuff_subject'})
export class StuffSubject extends Model<StuffSubject, StuffSubjectCreationattr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @ForeignKey(()=> Stuff)
    @Column({
        type: DataType.INTEGER
    })
    stuff_id: number;

    @ForeignKey(()=> Subject)
    @Column({
        type: DataType.INTEGER
    })
    subject_id: number;

    @BelongsTo(() => Subject)
    subject: Subject[]

    @BelongsTo(() => Stuff)
    stuff: Stuff[]
}
