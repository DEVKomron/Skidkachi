import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Discount } from "../../discount/models/discount.model";
import { User } from "../../users/models/user.model";

interface IReviewCreationAttr {
    discountId: number;
    userId: number;
    text: string;
    rating: number;
    photo: string | null;
}

@Table({ tableName: 'reviews' })
export class Review extends Model<Review, IReviewCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;


    @ForeignKey(() => Discount)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    discountId: number;

    @BelongsTo(() => Discount)
    discount: Discount;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.STRING,
    })
    text: string;

    @Column({
        type: DataType.INTEGER,
    })
    rating: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    photo: string | null;
}
