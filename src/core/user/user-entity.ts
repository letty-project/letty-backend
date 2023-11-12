import sequelize from "src/database";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

interface User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id: CreationOptional<number>;
  nickname: string;
  email: string;
  password?: string;
  salt?: string;
  googleId?: string;
  isWriter?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
export const User = sequelize.define<User>('User', {
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
    type: 'timestamp',
    allowNull: false,
    field: "created_at",
  },
  updatedAt: {
    type: 'timestamp',
    allowNull: false,
    field: "updated_at",
  },
}, {
  tableName: "user",
  defaultScope: {
    attributes: {
      exclude: ["password", "salt", "googleId"]
    },
  },
});
