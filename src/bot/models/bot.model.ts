import { Column, DataType, Model, Table } from "sequelize-typescript";
import { toDefaultValue } from "sequelize/types/utils";


interface IBotCreationAttr {
    user_id: number| undefined
    user_name: string | undefined
    first_name: string| undefined
    last_name: string| undefined
    lang:string | undefined
}

@Table({ tableName: "bot" })
export class Bot extends Model<Bot, IBotCreationAttr> {
    @Column({
        type: DataType.BIGINT,
        primaryKey: true
    })
    user_id:number| undefined
    
    @Column({
        type: DataType.STRING,
    })
    user_name: string | undefined
    
    @Column({
        type: DataType.STRING,
    })
    first_name:string| undefined
    
    @Column({
        type: DataType.STRING,
    })
    last_name:string| undefined

    @Column({
        type: DataType.STRING,
    })
    phone:string| undefined

    @Column({
        type: DataType.STRING,
    })
    lang:string| undefined

    @Column({
        type: DataType.BOOLEAN,
        defaultValue:false
    })
    status :boolean


}