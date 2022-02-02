module.exports = {
  preset: "jest-puppeteer",
  globals: {
    URL: "http://localhost:8080"
  },
  testMatch: [
    "./**.test.ts"
  ],
  verbose: true,
  transform: {
      "^.+\\.ts?$": "ts-jest"
  },
  collectCoverage: false,
};
