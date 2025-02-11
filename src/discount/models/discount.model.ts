import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Store } from "../../store/models/store.model";
import { Category } from "../../category/models/category.model";
import { DiscountType } from "../../discount_type/models/discount_type.model";
import { Review } from "../../reviews/models/review.model";
import { Favorite } from "../../favorites/models/favorite.model";

interface IDiscountCreationAttr {
    storeId: number;
    title: string;
    description: string;
    discount_percent: number;
    start_date: string;
    end_date: string;
    categoryId: number;
    discount_value: number;
    special_link: string;
    is_active: boolean;
    discountTypeId: number
}

@Table({ tableName: "discount" })
export class Discount extends Model<Discount, IDiscountCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @ForeignKey(() => Store)
    @Column({
        type: DataType.INTEGER,
    })
    storeId: number;

    @BelongsTo(() => Store)
    store: Store;


    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string;

    @Column({
        type: DataType.INTEGER,
    })
    discount_percent: number;

    @Column({
        type: DataType.STRING,
    })
    start_date: string;

    @Column({
        type: DataType.STRING,
    })
    end_date: string;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
    })
    categoryId: number;

    @BelongsTo(() => Category)
    category: Category;


    @Column({
        type: DataType.INTEGER,
    })
    discount_value: number;

    @Column({
        type: DataType.STRING,
    })
    special_link: string;

    @Column({
        type: DataType.BOOLEAN,
    })
    is_active: boolean;

    @ForeignKey(() => DiscountType)
    @Column({
        type: DataType.INTEGER,
    })
    discountTypeId: number;


    @BelongsTo(() => DiscountType)
    discountType: DiscountType;

    @HasMany(() => Review)
    review: Review[]

    @BelongsToMany(() => Discount, () => Favorite)
    discount: Discount[]
}
