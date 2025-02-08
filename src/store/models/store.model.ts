import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Region } from "../../region/model/region.model";
import { District } from "../../district/models/district.model";
import { User } from "../../users/models/user.model";
import { StoreSocialLink } from "../../store-social_link/models/store-social_link.model";
import { StoreSubscribe } from "../../store_subscribe/models/store_subscribe.model";

interface IStoreCreationAttr {
    name: string;
    location: string;
    phone: string;
    ownerId: number;
    storeSocialLinkId: number;
    since: string;
    districtId: number;
    regionId: number;
}

@Table({ tableName: "store" })
export class Store extends Model<Store, IStoreCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column({
        type: DataType.STRING,
    })
    name: string;

    @Column({
        type: DataType.STRING,
    })
    location: string;

    @Column({
        type: DataType.STRING,
    })
    phone: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    ownerId: number;

    @ForeignKey(() => StoreSocialLink)
    @Column({
        type: DataType.INTEGER,
    })
    storeSocialLinkId: number;

    @Column({
        type: DataType.STRING,
    })
    since: string;

    @ForeignKey(() => District)
    @Column({
        type: DataType.INTEGER,
    })
    districtId: number;

    @ForeignKey(() => Region)
    @Column({
        type: DataType.INTEGER,
    })
    regionId: number;

    @BelongsTo(() => User)
    owner: User

    @BelongsTo(() => District)
    district: District

    @BelongsTo(() => Region)
    region: Region

    @BelongsTo(() => StoreSocialLink)
    storeScialLink: StoreSocialLink;

    @HasMany(() => StoreSubscribe)
    store_subscribe: StoreSubscribe[]
}
