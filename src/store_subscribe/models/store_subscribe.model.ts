import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { Store } from "../../store/models/store.model";

interface IStoreSubscribeCreationAttr {
    userId: number;
    storeId: number;
}

@Table({ tableName: "store_subscribe" })
export class StoreSubscribe extends Model<StoreSubscribe, IStoreSubscribeCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number
    
    @ForeignKey(()=>User)
    @Column({
        type: DataType.INTEGER,
    })
    userId: number;
    
    @ForeignKey(()=>Store)
    @Column({
        type: DataType.INTEGER,
    })
    storeId: number;

    @BelongsTo(()=>User)
    user:User
    
    @BelongsTo(()=>Store)
    store:Store
}
