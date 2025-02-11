import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Discount } from "../../discount/models/discount.model";

interface ICategoryCreationAttr {
    name: string;
    description: string;
    parentCategoryId: number | null
}
@Table({ tableName: "category" })
export class Category extends Model<Category, ICategoryCreationAttr> {
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
    description: string | null; 

    @HasMany(() => Discount)
    discount: Discount[]
}
