/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['<rooDir>/cypress'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/main/test/**/*.test.{ts,tsx}',
    '!<rootDir>/src/domain/models/index.ts',
    '!<rootDir>/src/domain/useCases/index.ts',
    '!<rootDir>/src/presentation/protocols/index.ts',
    '!<rootDir>/src/presentation/pages/index.ts',
    '!<rootDir>/src/presentation/router/index.tsx',
    '!<rootDir>/src/validation/validators/index.ts',
    '!<rootDir>/src/validation/protocols/index.ts',
  ],
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}
