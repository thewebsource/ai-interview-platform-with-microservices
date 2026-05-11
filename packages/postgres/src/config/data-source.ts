import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path";
import { UserEntity } from "../entities/userEntity";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [
    UserEntity
  ],
  extra: {
    min: Number(process.env.DB_MIN_POOL_CONNECTIONS) || 2,
    max: Number(process.env.DB_MAX_POOL_CONNECTIONS) || 10,
    idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT) || 30000,
    connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT) || 2000,
  },
});
