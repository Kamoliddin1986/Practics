import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { TestGroup } from "../../test_group/models/test_group.model";
import { ResultDetail } from "../../result_detail/models/result_detail.model";
import { Answer } from "../../answers/models/answer.model";

interface QuestionCreationAttr {
    question: string;
    test_group_id: number;
    is_multi_answer: boolean;
}

@Table({tableName: 'question'})
export class Question extends Model<Question, QuestionCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING
    })
    question: string;

    @ForeignKey(() => TestGroup)
    @Column({
        type: DataType.INTEGER
    })
    test_group_id: number;

    @Column({
        type: DataType.BOOLEAN
        
    })
    is_multi_answer: boolean;

    @BelongsTo(() => TestGroup)
    test_group: TestGroup[]

    @HasMany(() => ResultDetail)
    result_detail: ResultDetail[]

    @HasMany(() => Answer)
    answer: Answer[]
}
