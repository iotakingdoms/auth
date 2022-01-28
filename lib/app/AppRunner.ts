import { ComponentsManager } from 'componentsjs';
import * as Path from 'path';
import yargs from 'yargs';
import { Initializable } from '../common/Initializable';

export default class AppRunner implements Initializable {
  private readonly app: Initializable | undefined;

  async initialize() {
    const argv = await yargs(process.argv.slice(2))
      .usage('node ./dist/start.js [args]')
      .options({
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
      })
      .parse();

    const variables = {
      'urn:@iotakingdoms/auth:variable:port': argv.port,
      'urn:@iotakingdoms/auth:variable:logLevel': argv.logLevel,
    };

    const manager = await ComponentsManager.build({
      mainModulePath: Path.join(__dirname, '/../..'),
    });
    await manager.configRegistry.register(argv.config);
    const app = await manager.instantiate(argv.entrypoint, { variables }) as Initializable;
    await app.initialize();
  }

  async terminate(): Promise<void> {
    if (this.app) {
      await this.app.terminate();
    }
  }
}
