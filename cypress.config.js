const { defineConfig } = require('cypress');
const dotenv = require('dotenv').config();
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/feature/*.feature', // Recognizes feature files
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber()); // Enables Cucumber preprocessor
      return config;
    },
    env: {
      BASE_URL: process.env.CYPRESS_BASE_URL,
      USER_EMAIL: process.env.CYPRESS_USER_EMAIL,
      PASSWORD: process.env.CYPRESS_PASSWORD,
    },
  },
});