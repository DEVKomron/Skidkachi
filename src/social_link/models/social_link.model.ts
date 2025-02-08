import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { StoreSocialLink } from "../../store-social_link/models/store-social_link.model";

interface ISocialLinkCreationAttr {
    name: string;
    icon: string;
}

@Table({ tableName: "social_link" })
export class SocialLink extends Model<SocialLink, ISocialLinkCreationAttr> {
    @ApiProperty({
        example: 1,
    })
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
    icon: string;

    @HasMany(() => StoreSocialLink)
    storeSocialLinks: StoreSocialLink[];
}