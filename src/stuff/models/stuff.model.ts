import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { StuffRole } from "../../stuff_role/models/stuff_role.model";
import { StuffGroup } from "../../stuff_group/models/stuff_group.model";
import { StuffSubject } from "../../stuff_subjects/models/stuff_subject.model";

interface StuffCreationAttr {
    first_name?: string;
    last_name?: string;
    image: string;
    tel?: string;
    login?: string;
    hashed_password?: string;
    email?: string;
    telegram_name: string;
    hashed_refresh_token: string;
    is_active: boolean
}

@Table({tableName: "stuff"})
export class Stuff extends Model<Stuff, StuffCreationAttr>{
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
    tel: string;

    @Column({
        type: DataType.STRING
    })
    login: string;

    @Column({
        type: DataType.STRING
    })
    hashed_password: string;

    @Column({
        type: DataType.STRING
    })
    email: string;

    @Column({
        type: DataType.STRING
    })
    telegram_name: string
    
    @Column({
        type: DataType.STRING
    })
    hashed_refresh_token: string;


    @Column({
        type: DataType.BOOLEAN
    })
    is_active: boolean

    @HasMany(() => StuffRole)
    roles: StuffRole[]

    @HasMany(() => StuffGroup)
    group: StuffGroup[]

    @HasMany(()=> StuffSubject)
    subject: StuffSubject[]
}
