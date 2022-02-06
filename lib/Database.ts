import { Logger } from '@iotakingdoms/common';
import { MongoClient, Db } from 'mongodb';

export interface IDatabase {
  ensureConnection(): Promise<Db>,
  getDb(): Promise<Db>,
}

export interface DatabaseArgs {
  logger: Logger,
  protocol: string,
  host: string,
  name: string,
  user: string,
  pass: string,
  params: string,
}

export class Database implements IDatabase {
  private readonly logger: Logger;

  private readonly protocol: string;

  private readonly host: string;

  private readonly name: string;

  private readonly user: string;

  private readonly pass: string;

  private readonly params: string;

  private client: MongoClient;

  private db: Db | undefined;

  constructor(args: DatabaseArgs) {
    this.logger = args.logger;
    this.protocol = args.protocol;
    this.host = args.host;
    this.name = args.name;
    this.user = args.user;
    this.pass = args.pass;
    this.params = args.params;

    const uri = `${this.protocol}://${this.user}:${this.pass}@${this.host}/${this.name}${this.params}`;

    this.client = new MongoClient(uri);
  }

  async ensureConnection() {
    try {
      await this.client.connect();
      this.logger.info(`Database[${this.name}] connected`);
      this.db = this.client.db(this.name);
      return this.db;
    } catch (err) {
      throw new Error(`Database[${this.name}] failed to connect! Error: ${err}`);
    }
  }

  async getDb() {
    try {
      return this.ensureConnection();
    } catch (err) {
      throw new Error(`Failed to get database connection! Error: ${err}`);
    }
  }
}
