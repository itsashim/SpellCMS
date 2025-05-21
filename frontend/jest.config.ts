import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.app.json',
        useESM: true, // Add this line
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/src/jest.setup.ts'], // if it's inside src/
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^(\\.{1,2}/.*)\\.js$': '$1', // Add this for ESM support
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Add this for ESM support
};

export default config;