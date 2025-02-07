import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
    name: string;
    email: string;
    phone: string;
    hashed_password: string;
    activation_link: string;
}

@Table({tableName:"admin"})
export class Admin extends Model<Admin, IAdminCreationAttr> {
    @ApiProperty({
        example: 1,
        description: "Admin ID raqami"
    })
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        type: DataType.STRING(30),
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING(20),
    })
    phone: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    email: string;

    @Column({
        type: DataType.STRING,
    })
    hashed_password: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    is_active: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    is_creator: boolean;

    @Column({
        type: DataType.STRING,
    })
    hashed_refresh_token: string | null;

    @Column({
        type: DataType.STRING,
    })
    activation_link: string;

}
