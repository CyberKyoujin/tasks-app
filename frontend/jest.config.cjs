// jest.config.js
module.exports = {
    preset: 'ts-jest', 
    testEnvironment: 'jsdom', 
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
      
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      '^axiosInstance$': '<rootDir>/__mocks__/axiosInstance.ts',
      
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], 
}