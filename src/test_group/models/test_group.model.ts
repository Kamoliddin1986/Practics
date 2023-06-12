import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Subject } from "../../subjects/models/subject.model";
import { Question } from "../../questions/models/question.model";
import { TestResult } from "../../test_results/models/test_result.model";

interface TestGroupCreationAttr {
    title: string;
    subject_id: number;
    test_count: string;
    test_time: number
}

@Table({tableName: 'Test_group'})
export class TestGroup extends Model<TestGroup, TestGroupCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    title: string;
    
    @ForeignKey(()=> Subject)
    @Column({
        type: DataType.INTEGER
    })
    subject_id: number;

    @Column({
        type: DataType.STRING
    })
    test_count: string;


    @Column({
        type: DataType.INTEGER
    })
    test_time: number

    @BelongsTo(()=> Subject)
    subject: Subject[]

    @HasMany(() => Question)
    question: Question[]

    @HasMany(() => TestResult)
    test_result: TestResult[]
    
}
