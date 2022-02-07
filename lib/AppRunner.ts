import 'dotenv/config';
import { ComponentsManager } from 'componentsjs';
import * as Path from 'path';
import yargs from 'yargs';
import { Initializable } from '@iotakingdoms/common';

export default class AppRunner implements Initializable {
  private app: Initializable | undefined;

  async initialize() {
    const argv = await yargs(process.argv.slice(2))
      .env('APP')
      .usage('node ./dist/start.js [args]')
      .options({
        baseUrl: {
          type: 'string',
          alias: 'b',
          default: 'http://localhost:8080',
          requiresArg: true,
        },
        config: {
          type: 'string',
          alias: 'c',
          default: 'config/config.jsonld',
          requiresArg: true,
        },
        entrypoint: {
          type: 'string',
          alias: 'e',
          default: 'urn:@iotakingdoms/auth:app',
          requiresArg: true,
        },
        logLevel: {
          type: 'string',
          alias: 'l',
          default: 'Info',
          requiresArg: true,
        },
        port: {
          type: 'number',
          alias: 'p',
          default: 8080,
          requiresArg: true,
        },
        dbProtocol: {
          type: 'string',
          requiresArg: true,
        },
        dbHost: {
          type: 'string',
          requiresArg: true,
        },
        dbName: {
          type: 'string',
          requiresArg: true,
        },
        dbUser: {
          type: 'string',
          requiresArg: true,
        },
        dbPass: {
          type: 'string',
          requiresArg: true,
        },
        dbParams: {
          type: 'string',
          requiresArg: true,
        },
      })
      .parse();

    const variables = {
      'urn:@iotakingdoms/auth:variable:baseUrl': argv.baseUrl,
      'urn:@iotakingdoms/auth:variable:port': argv.port,
      'urn:@iotakingdoms/auth:variable:logLevel': argv.logLevel,
      'urn:@iotakingdoms/auth:variable:dbProtocol': argv.dbProtocol || process.env.DB_PROTOCOL,
      'urn:@iotakingdoms/auth:variable:dbHost': argv.dbHost || process.env.DB_HOST,
      'urn:@iotakingdoms/auth:variable:dbName': argv.dbName || process.env.DB_NAME,
      'urn:@iotakingdoms/auth:variable:dbUser': argv.dbUser || process.env.DB_USER,
      'urn:@iotakingdoms/auth:variable:dbPass': argv.dbPass || process.env.DB_PASS,
      'urn:@iotakingdoms/auth:variable:dbParams': argv.dbParams || process.env.DB_PARAMS,
    };

    const manager = await ComponentsManager.build({
      mainModulePath: Path.join(__dirname, '/../..'),
    });
    await manager.configRegistry.register(argv.config);
    const app: Initializable | undefined = await manager.instantiate(argv.entrypoint, {
      variables,
    });

    if (!app) {
      throw new Error('Failed to instantiate application');
    }

    this.app = app;

    await this.app.initialize();
  }

  async terminate(): Promise<void> {
    if (this.app) {
      await this.app.terminate();
    }
  }
}
