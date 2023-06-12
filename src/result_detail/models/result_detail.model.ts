import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Question } from "../../questions/models/question.model";
import { TestResult } from "../../test_results/models/test_result.model";
import { Answer } from "../../answers/models/answer.model";

interface ResultDetailCreationAttr {
    question_id: number;
    answer_id: number;
    test_result_id: number
}
@Table({tableName: 'result_detail'})
export class ResultDetail extends Model<ResultDetail, ResultDetailCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;


    @ForeignKey(() => Question)
    @Column({
        type: DataType.INTEGER
    })
    question_id: number;

    @ForeignKey(() => Answer)
    @Column({
        type: DataType.INTEGER
    })
    answer_id: number;

    @ForeignKey(() => TestResult)
    @Column({
        type: DataType.INTEGER
    })
    test_result_id: number

    @BelongsTo(() => Question)
    question: Question[]

    @BelongsTo(() => TestResult)
    test_result: TestResult[]
}
