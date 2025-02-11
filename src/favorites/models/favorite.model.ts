import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Discount } from "../../discount/models/discount.model";

interface IFavoriteCreationAttr {
    userId: number;
    discountId: number;
}

@Table({ tableName: "favorite" })
export class Favorite extends Model<Favorite, IFavoriteCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    
    @ForeignKey(()=>User)
    @Column({
        type: DataType.INTEGER,
    })
    userId: number;
    
    @ForeignKey(()=>Discount)
    @Column({
        type: DataType.INTEGER,
    })
    discountId: number;
}
