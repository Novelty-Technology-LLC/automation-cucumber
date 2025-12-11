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
    this.uploadFileToSftp('cypress/fixtures/3452772(IB-IBD).xlsx', '/qa/ardb/3452772(IB-IBD).xlsx');
    cy.wait(20000);
  }

  upload835EDIFile() {
    this.uploadFileToSftp('cypress/fixtures/3452772.edi', '/qa/edi_835/3452772.edi');
    cy.wait(30000);
  }

  uploadIBAndIBDFilesForCommercial() {
    this.uploadFileToSftp('cypress/fixtures/commercial/3452772(IB-IBD).xlsx', '/qa/ardb/3452772(IB-IBD).xlsx');
    cy.wait(20000);
  }

  upload835EDIFileForCommercial() {
    this.uploadFileToSftp('cypress/fixtures/commercial/3452772.edi', '/qa/edi_835/3452772.edi');
    cy.wait(30000);
  }

  uploadIBAndIBDFilesForSignature() {
    this.uploadFileToSftp('cypress/fixtures/signature/3395358(IB-IBD).xlsx', '/qa/ardb/3395969(IB-IBD).xlsx');
    cy.wait(20000);
  }

  upload835EDIFileForSignature() {
    this.uploadFileToSftp('cypress/fixtures/signature/3395358(partial).edi', '/qa/edi_835/3395358(partial).edi');
    cy.wait(30000);
    this.uploadFileToSftp('cypress/fixtures/signature/3395358(partial2).edi', '/qa/edi_835/3395358(partial2).edi');
    cy.wait(30000);
  }

  verifyInvoiceBillingTaskCreated() {
    cy.get('[data-cy="queue-header"]').should('contain', 'Commercial');
  }

  verifyTaskCreatedInCommercialQueue() {
    cy.get('[data-cy="queue-header"]', { timeout: 30000 })
      .contains('Commercial')
      .should('be.visible');
  }

  verifyTaskCreatedInSignatureQueue() {
    cy.get('[data-cy="queue-header"]', { timeout: 30000 })
      .contains('Signature')
      .should('be.visible');
  }

  uploadIBAndIBDFilesForAHF() {
    this.uploadFileToSftp('cypress/fixtures/ahf/3394368(IB-IBD).xlsx', '/qa/ardb/3394368(IB-IBD).xlsx');
    cy.wait(20000);
  }

  upload835EDIFileForAHF() {
    this.uploadFileToSftp('cypress/fixtures/ahf/3394368.edi', '/qa/edi_835/3394368.edi');
    cy.wait(30000);
  }

  uploadIBAndIBDFilesForMedicare() {
    this.uploadFileToSftp('cypress/fixtures/medicare/3453300(IB-IBD).xlsx', '/qa/ardb/3453300(IB-IBD).xlsx');
    cy.wait(20000);
  }

  upload835EDIFileForMedicare() {
    this.uploadFileToSftp('cypress/fixtures/medicare/3453300.edi', '/qa/edi_835/3453300.edi');
    cy.wait(30000);
  }

  uploadIBAndIBDFilesForMedical() {
    this.uploadFileToSftp('cypress/fixtures/medical/3314780(IB-IBD).xlsx', '/qa/ardb/3314780(IB-IBD).xlsx');
    cy.wait(20000);
  }

  upload835EDIFileForMedical() {
    this.uploadFileToSftp('cypress/fixtures/medical/3314780(x288).edi', '/qa/edi_835/3314780(x288).edi');
    cy.wait(30000);
  }

  verifyTaskCreatedInAHFQueue() {
    cy.get('[data-cy="queue-header"]', { timeout: 30000 })
      .contains('AHF')
      .scrollIntoView()
      .should('be.visible');
  }

  verifyTaskCreatedInMedicareQueue() {
    cy.get('[data-cy="queue-header"]', { timeout: 30000 })
      .contains('Medicare')
      .scrollIntoView()
      .should('be.visible');
  }

  verifyTaskCreatedInMedicalQueue() {
    cy.get('[data-cy="queue-header"]', { timeout: 30000 })
      .contains('Medical')
      .scrollIntoView()
      .should('be.visible');
  }
}

export const taskCreationPage = new TaskCreationPage();