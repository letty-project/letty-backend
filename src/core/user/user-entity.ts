import sequelize from "src/database";
import {
  DataTypes,
  Model,
  Optional
} from 'sequelize';

interface UserAttributes {
  id: number;
  nickname: string;
  email: string;
  password: string;
  salt: string;
  isWriter: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { };

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public nickname!: string;
  public email!: string;
  public password!: string;
  public salt!: string;
  public isWriter: boolean = false;
};

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isWriter: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: "user",
});
