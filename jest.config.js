module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // Transform JS files
    },
    testEnvironment: 'jsdom', // Use jsdom for DOM testing
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Setup file for jest
};
