import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { StuffSubject } from "../../stuff_subjects/models/stuff_subject.model";
import { TestGroup } from "../../test_group/models/test_group.model";

interface SubjectCreationAttr {
    name: string;
    image: string
}

@Table({tableName: "subject"})
export class Subject extends Model<Subject,SubjectCreationAttr>{
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
    image: string

    @HasMany(()=> StuffSubject )
    stuff: StuffSubject[]

    @HasMany(() => TestGroup)
    test_group: TestGroup[]
}
