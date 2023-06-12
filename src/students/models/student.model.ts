import { BelongsTo, Column, DataType, ForeignKey, Table, Model, HasMany} from "sequelize-typescript";
import { Group } from "../../group/models/group.model";
import { TestResult } from "../../test_results/models/test_result.model";

interface StudentCreationAttr {
    first_name?: string;
    last_name?: string;
    image: string;
    phone_number: string;
    username: string;
    hashed_password: string;
    hashed_refresh_token: string;
    group_id: number;
    is_active: boolean
}

@Table({tableName: 'student'})
export class Student extends Model<Student, StudentCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;


    @Column({
        type: DataType.STRING
    })
    first_name: string;

    @Column({
        type: DataType.STRING
    })
    last_name: string;

    @Column({
        type: DataType.STRING
    })
    image: string;

    @Column({
        type: DataType.STRING
    })
    phone_number: string;

    @Column({
        type: DataType.STRING
    })
    username: string;

    @Column({
        type: DataType.STRING
    })
    hashed_password: string;

    @Column({
        type: DataType.STRING
    })
    hashed_refresh_token: string;


    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    is_active: boolean;

    @ForeignKey(() => Group)
    @Column({
        type: DataType.INTEGER
    })
    group_id: number

    @BelongsTo(() => Group)
    group: Group[]

    @HasMany(() => TestResult)
    test_result: TestResult[]
}
