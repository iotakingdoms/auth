import { ComponentsManager } from 'componentsjs';
import * as Path from 'path';
import { IApp } from './IApp';

export default class AppRunner {
  async start() {
    const manager = await ComponentsManager.build({
      mainModulePath: Path.join(__dirname, '/../..'),
    });
    await manager.configRegistry.register('config/config.jsonld');
    const app = await manager.instantiate('urn:@iotakingdoms/auth:app') as IApp;
    await app.start();
  }
}
