import AppRunner from './app/AppRunner';

const appRunner = new AppRunner();

(async () => {
  await appRunner.start();
})();
