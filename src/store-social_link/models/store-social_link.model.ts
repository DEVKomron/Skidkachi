import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { SocialLink } from "../../social_link/models/social_link.model";

interface IStoreSocialLinkCreationAttr{
    url:string;
    description:string;
    socialLinkId:number;
}

@Table({tableName:"store_social_link"})
export class StoreSocialLink extends Model<StoreSocialLink, IStoreSocialLinkCreationAttr>{
    @Column({
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true
    })
    id:number;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    url:string;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    description:string;
    
    @ForeignKey(()=>SocialLink)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    socialLinkId:number;
    
    @BelongsTo(()=>SocialLink)
    socialLink:SocialLink;
}
