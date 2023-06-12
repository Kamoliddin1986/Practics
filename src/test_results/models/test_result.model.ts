import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { TestGroup } from "../../test_group/models/test_group.model";
import { Student } from "../../students/models/student.model";
import { ResultDetail } from "../../result_detail/models/result_detail.model";

interface TestResultCreationAttr {
    student_id: number;
    test_group_id: number;
    corrects_count: number
}
@Table({tableName: 'test_result'})
export class TestResult extends Model<TestResult, TestResultCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;


    @ForeignKey(() => Student)
    @Column({
        type: DataType.INTEGER,
    })
    student_id: number;

    @ForeignKey(() => TestGroup)
    @Column({
        type: DataType.INTEGER,
    })
    test_group_id: number;

    @Column({
        type: DataType.INTEGER,
    })
    corrects_count: number

    @BelongsTo(() => Student)
    student: Student[]

    @BelongsTo(() => TestGroup)
    test_group: TestGroup

    @HasMany(() => ResultDetail)
    result_detail: ResultDetail[]
}
