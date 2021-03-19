module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '@modules/(.*)': '<rootDir>/src/app/modules/$1',
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
    '@env/(.*)': '<rootDir>/src/environments/$1',
    '@src/(.*)': '<rootDir>/src/$1'
  },
  testMatch: ['**/src/**/*.spec.ts'],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/"
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/"
  ],
  modulePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/"
  ],
  globals: {
    "ts-jest": {
      "tsConfig": "<rootDir>/tsconfig.spec.json",
      "stringifyContentPathRegex": "\\.html$"
    }
  }
};