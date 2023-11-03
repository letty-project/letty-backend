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
  password?: string;
  salt?: string;
  googleId?: string;
  isWriter: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { };

// 왜 Model로 안 쓰고 Model<UserAttributes, UserCreationAttributes>로 쓰는지 모르겠음
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public nickname!: string;
  public email!: string;
  public password!: string;
  public salt!: string;
  public googleId!: string;
  public isWriter: boolean = false;
  public createdAt?: Date;
  public updatedAt?: Date;
};

// 모델 정의
User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: "id",
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "nickname",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "email",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "password",
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "salt",
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "google_id",
  },
  isWriter: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: "is_writer",
  },
  createdAt: {
    type: 'timestampz',
    allowNull: false,
    field: "created_at",
  },
  updatedAt: {
    type: 'timestampz',
    allowNull: false,
    field: "updated_at",
  },
}, {
  sequelize,
  tableName: "user",
});
