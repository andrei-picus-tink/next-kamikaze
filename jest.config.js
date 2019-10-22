const baseConfig = require('tdd-buffet/config/jest.config');

module.exports = {
  ...baseConfig,

  globals: {
    'ts-jest': {
      tsConfig: {
        // next.js is forcing `preserve` on us so we switch back to `react`
        jsx: 'react'
      }
    }
  }
};
