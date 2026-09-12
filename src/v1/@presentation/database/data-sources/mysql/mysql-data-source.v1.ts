import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";


import * as dotenv from "dotenv";
dotenv.config();

const isProd = process.env.NODE_ENV === "production";

export const MySQLDataSource = new DataSource({
  type: "mysql",
  url: process.env.DATABASE_URL,
  synchronize: false,
  // logging: ["query", "error", "schema", "warn", "info", "log"],
  logging: ["error", "schema", "warn", "info", "log"],
  entities: [
    isProd
      ? path.join(__dirname, "../@presentation/database/models/**/*.js")
      : "src/v1/@presentation/database/models/**/*.ts",
  ],
  migrations: [
    isProd
      ? path.join(__dirname, "../@presentation/database/migration/**/*.js")
      : "src/v1/@presentation/database/migration/**/*.ts",
  ],
});