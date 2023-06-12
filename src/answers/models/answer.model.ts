import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Question } from "../../questions/models/question.model";
import { ResultDetail } from "../../result_detail/models/result_detail.model";

interface AnswerCreationAttr {
    answer: string;
    is_true: boolean;
    question_id: number
}


@Table({tableName: 'answer'})
export class Answer extends Model<Answer, AnswerCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    answer: string;

    @Column({
        type: DataType.BOOLEAN
    })
    is_true: boolean;

    @ForeignKey(() => Question)
    @Column({
        type: DataType.INTEGER
    })
    question_id: number

    @BelongsTo(() => Question)
    question: Question[]

    @HasMany(() => ResultDetail)
    result_detail: ResultDetail[]
}
