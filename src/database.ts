import {
  Sequelize,
} from "sequelize";

export default new Sequelize({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  database: "letty",
  schema: "public",
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: "postgres",
});