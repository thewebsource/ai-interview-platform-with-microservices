import { DataSource, QueryRunner } from "typeorm";
import { AppDataSource } from "./data-source";


export class Database {
  private static instance: Database;
  private dataSource!: DataSource;
  private connected: boolean = false;

  private constructor() {}

  // Singleton getter
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  // Call this at server startup
  public async connectToDB(): Promise<void> {
    if (this.connected) {
      console.log("Database already connected");
      return;
    }

    try {
      await AppDataSource.initialize();
      this.connected = true;
      console.log(`Database connected successfully with the user [postgres]`);

    } catch (error) {
      console.error("Failed to connect to database:", error);
      throw error;
    }
  }

  // Generic query executor
  public async query<T = any>(query: string, params?: any[]): Promise<T[]> {
    if (!this.connected)
      throw new Error("Database not connected. Call connectedToDB() first.");
    try {
      return await this.dataSource.query(query, params);
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    }
  }

  // Transaction helper
  public async transaction<T>(
    fn: (queryRunner: QueryRunner) => Promise<T>,
  ): Promise<T> {
    if (!this.connected)
      throw new Error("Database not connected. Call connectToDB() first.");
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await fn(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error("Transaction error:", error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // Close DB gracefully
  public async close(): Promise<void> {
    if (this.dataSource && this.connected) {
      await this.dataSource.destroy();
      this.connected = false;
      console.log("Database connection closed");
    }
  }
}
