// jest.config.js
module.exports = {
    preset: 'ts-jest', 
    testEnvironment: 'jsdom', 
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
      
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
      
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], 
}