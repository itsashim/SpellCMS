module.exports = function () {
  return {
    files: [
      'src/**/*.+(ts|tsx|js|jsx|json)',
      '!src/**/*.test.tsx',
    ],

    tests: ['src/**/*.test.tsx'],

    env: {
      type: 'node',
      runner: 'node',
    },

    testFramework: 'jest',

    setup: function (w) {
      const jestConfig = require('./jest.config.js');
      w.testFramework.configure(jestConfig);
    },

    compilers: {
      '**/*.ts?(x)': w.compilers.typeScript({}),
    },
  };
};
