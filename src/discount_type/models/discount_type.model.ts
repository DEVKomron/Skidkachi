import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IDiscountTypeCreationAttr {
    name: string;
    description: string;
}

@Table({tableName:'discount_type'})
export class DiscountType extends Model<DiscountType, IDiscountTypeCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;
}
