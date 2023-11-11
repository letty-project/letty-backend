import sequelize from "src/database";
import {
  DataTypes,
  Model,
  Optional,
} from "sequelize";
import {
  User,
} from "src/core";

interface PostAttributes {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> { };

export class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public title!: string;
  public content!: string;
  public thumbnail!: string;
  public userId!: number;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: "id",
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: "title",
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    field: "content",
  },
  thumbnail: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "thumbnail",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
  createdAt: {
    type: 'timestamptz',
    allowNull: false,
    field: "created_at",
  },
  updatedAt: {
    type: 'timestamptz',
    allowNull: false,
    field: "updated_at",
  },
}, {
  sequelize,
  tableName: "post",
  modelName: "Post",
});
Post.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'user'
});
User.hasMany(Post, {
  sourceKey: "id",
  foreignKey: 'userId',
  as: "posts",
});
