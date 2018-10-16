const config = {
    roots: [
        '<rootDir>/__mocks__',
        '<rootDir>/src/',
        `<rootDir>/test${process.env.E2E ? '-e2e' : ''}/`
    ]
};

if (process.env.COVERAGE) {
    Object.assign(config, {
        collectCoverage: true,
        collectCoverageFrom: [
            'src/**/*.js',
            '!src/index.js',
            '!src/debug.js',
            '!src/components/containers/**/*.js'
        ],
        coverageDirectory: 'coverage'
    });
}

module.exports = config;
