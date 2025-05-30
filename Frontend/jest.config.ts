import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/test/fileMock.ts'
  },
  setupFilesAfterEnv:['<rootDir>/src/tests/setupTest.ts']
};

export default config;