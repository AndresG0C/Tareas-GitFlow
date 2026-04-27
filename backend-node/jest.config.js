module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],  // ← Agregar esta línea
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts',
        '!src/server.ts'
    ],
    coverageDirectory: 'coverage',
};