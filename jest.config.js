module.exports = {
  moduleNameMapper: {
    '\\.scss$': '<rootDir>/__mocks__/styleMock.js',
  },
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
};
