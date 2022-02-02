import { ComponentsManager } from 'componentsjs';
import * as Path from 'path';
import { Test1App } from "./lib/Test1App";

(async () => {
  const manager = await ComponentsManager.build({
    mainModulePath: Path.join(__dirname, '/..'),
  });

  await manager.configRegistry.register('config/test-1-app.jsonld');

  const app: Test1App = await manager.instantiate('urn:ixuz-test-1:test-1-app');
  app.run();
})();