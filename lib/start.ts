import AppRunner from './app/AppRunner';

const appRunner = new AppRunner();

// eslint-disable-next-line import/prefer-default-export
export const start = async () => {
  await appRunner.initialize();
};

start();
