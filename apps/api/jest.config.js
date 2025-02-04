/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testEnvironment: 'node',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+.tsx?$': ['ts-jest', {}]
    }
}
