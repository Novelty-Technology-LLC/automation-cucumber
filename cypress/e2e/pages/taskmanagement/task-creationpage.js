class TaskCreationPage {
  getSftpConfig() {
    return {
      host: Cypress.env('SFTP_HOST') || 'your-sftp-server.com',
      port: 22,
      username: Cypress.env('SFTP_USERNAME') || 'your-username',
      password: Cypress.env('SFTP_PASSWORD') || 'your-password',
    };
  }

  uploadFileToSftp(localPath, remotePath) {
    const sftpConfig = this.getSftpConfig();
    cy.task("uploadToSftp", { localPath, remotePath, sftpConfig });
  }

  clearCookiesAndWait() {
    cy.clearAllCookies();
    cy.wait(20000);
  }

  goToARModule() {
    cy.viewport(1380, 720);
    cy.wait(1000);
    cy.url().should("eq", `${Cypress.env("BASE_URL")}/dashboard`);
    cy.wait(1000);
  }

  uploadIBAndIBDFiles() {
    this.uploadFileToSftp('cypress/fixtures/3395969(IB-IBD).xlsx', '/qa/ardb/3395969(IB-IBD).xlsx');
    cy.wait(20000);
  }

  upload835EDIFile() {
    this.uploadFileToSftp('cypress/fixtures/3395969.DAT', '/qa/edi_835/3395969.DAT');
    cy.wait(30000);
  }

  verifyInvoiceBillingTaskCreated() {
    cy.get('[data-cy="queue-header"]').should('contain', 'Commercial');
  }
}

export const taskCreationPage = new TaskCreationPage();