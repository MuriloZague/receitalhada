export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  }
};