const { defineConfig } = require('cypress');
const dotenv = require('dotenv').config();
const cucumber = require('cypress-cucumber-preprocessor').default;
const mochawesome = require('cypress-mochawesome-reporter/plugin');

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/feature/*.feature', // Recognizes feature files
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber()); // Enables Cucumber preprocessor
      mochawesome(on); // Enables Mochawesome reporter
      return config;
    },
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: true,
      html: true,
      json: true,
    },
    env: {
      BASE_URL: process.env.CYPRESS_BASE_URL,
      USER_EMAIL: process.env.CYPRESS_USER_EMAIL,
      PASSWORD: process.env.CYPRESS_PASSWORD,
    },
  },
});