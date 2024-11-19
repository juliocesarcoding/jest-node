import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import db from "../instances/database";

dotenv.config();

export const sequelize = new Sequelize(db.db, db.user, db.password, {
 dialectOptions: {
  ssl: {
   require: true,
  },
 },
 host: db.host,
 dialect: "postgres",
 port: parseInt(db.port),
});
