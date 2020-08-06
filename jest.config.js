module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: ['src/**/*.{js,vue}', '!src/main.js', '!src/router/index.js']
}
