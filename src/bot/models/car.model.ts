import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICarCreationAttr {
  user_id: number | undefined;
  car_number: string | undefined;
  model: string | undefined;
  color: string| undefined;
  year: string| undefined;
  last_state: string;
}

@Table({ tableName: "cars" })
export class Car extends Model<Car, ICarCreationAttr> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.BIGINT,
  })
  user_id: number;

  @Column({
    type: DataType.STRING,
  })
  car_number: string;

  @Column({
    type: DataType.STRING,
  })
  model: string;

  @Column({
    type: DataType.STRING,
  })
  color: string;

  @Column({
    type: DataType.STRING,
  })
  year: string;

  @Column({
    type: DataType.STRING,
  })
  last_state: string;
}
