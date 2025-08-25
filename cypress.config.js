const { defineConfig } = require('cypress');
const dotenv = require('dotenv').config();
const cucumber = require('cypress-cucumber-preprocessor').default;
const mochawesome = require('cypress-mochawesome-reporter/plugin');
const registerSftpTasks = require("./cypress/plugins/sftp-tasks");

module.exports = defineConfig({
  e2e: {
      specPattern: '**/*.feature',
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());
      mochawesome(on);
      registerSftpTasks(on);
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
      TAGS: process.env.TAGS || '',
      BASE_URL: process.env.CYPRESS_BASE_URL,
      USER_EMAIL: process.env.CYPRESS_USER_EMAIL,
      PASSWORD: process.env.CYPRESS_PASSWORD,
      USER1_EMAIL: process.env.CYPRESS_USER1_EMAIL,
      SFTP_HOST: process.env.SFTP_HOST,
      SFTP_PORT: process.env.SFTP_PORT,
      SFTP_USERNAME: process.env.SFTP_USERNAME,
      SFTP_PASSWORD: process.env.SFTP_PASSWORD,
    },
  },
});