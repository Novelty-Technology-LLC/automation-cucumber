import { WAIT } from '../../util/constants.js';

class ExceptionTaskPage {
  constructor() {
    this.exceptionCode = 'SERVICE-LINE-INFO-MISSING';
    this.missingBillingExceptionCode = 'BILLING-INFO-MISSING';
  }

  getExceptionAccordionSelector() {
    return `[data-cy="exception-accordion-${this.exceptionCode}"]`;
  }

  getExceptionDescriptionSelector() {
    return `[data-cy="exception-accordion-${this.exceptionCode}-description"]`;
  }

  getMissingBillingExceptionAccordionSelector() {
    return `[data-cy="exception-accordion-${this.missingBillingExceptionCode}"]`;
  }

  getMissingBillingExceptionDescriptionSelector() {
    return `[data-cy="exception-accordion-${this.missingBillingExceptionCode}-description"]`;
  }

  getSftpConfig() {
    return {
      host: Cypress.env('SFTP_HOST') || 'your-sftp-server.com',
      port: parseInt(Cypress.env('SFTP_PORT')) || 22,
      username: Cypress.env('SFTP_USERNAME') || 'your-username',
      password: Cypress.env('SFTP_PASSWORD') || 'your-password',
    };
  }

  uploadFileToSftp(localPath, remotePath) {
    const sftpConfig = this.getSftpConfig();
    cy.task("uploadToSftp", { localPath, remotePath, sftpConfig });
  }

  goToARModule() {
    cy.viewport(1380, 720);
    cy.wait(WAIT.NORMAL);
    cy.url().should("eq", `${Cypress.env("BASE_URL")}/dashboard`);
    cy.wait(WAIT.NORMAL);
  }

  uploadIBFileOnly() {
    this.uploadFileToSftp('cypress/fixtures/missing-serviceline-exception/3361074(IB).xlsx', '/qa/ardb/3361074(IB).xlsx');
    cy.wait(WAIT.SFTP_UPLOAD);
  }

  uploadIBDFile() {
    this.uploadFileToSftp('cypress/fixtures/missing-serviceline-exception/3361074(IBD).xlsx', '/qa/ardb/3361074(IBD).xlsx');
    cy.wait(WAIT.SFTP_UPLOAD);
  }

  upload835EDIFile() {
    this.uploadFileToSftp('cypress/fixtures/missing-serviceline-exception/3361074.edi', '/qa/edi_835/3361074.edi');
    cy.wait(WAIT.EDI_PROCESSING);
  }

  verifyTaskInMissingBillingQueue() {
    cy.get('[data-cy="queue-header"]', { timeout: 20000 })
      .contains('Missing billing')
      .scrollIntoView()
      .should('be.visible');
  }

  clickOnTask() {
    cy.get('[data-cy="task-list-item-button"]', { timeout: 20000 })
      .contains('3361074')
      .click();
    cy.wait(WAIT.NORMAL);
  }

  verifyMissingServiceLineExceptionAccordion() {
    cy.get(this.getExceptionAccordionSelector(), { timeout: 10000 })
      .should('be.visible');
    cy.get(this.getExceptionAccordionSelector())
      .should('contain', 'Missing Service Line Info');
  }

  hoverOverAccordion() {
    cy.get(this.getExceptionAccordionSelector(), { timeout: 10000 })
      .trigger('mouseover');
    cy.wait(WAIT.SHORT);
  }

  verifyExceptionDetailText() {
    cy.get(this.getExceptionDescriptionSelector(), { timeout: 10000 })
      .should('be.visible');
    cy.get(this.getExceptionDescriptionSelector())
      .invoke('text')
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, ' ');
        expect(normalizedText).to.include('Unable to process');
        expect(normalizedText).to.include('service line information is missing');
        expect(normalizedText).to.include('task will update automatically');
      });
  }

  waitForExceptionResolution() {
    cy.get('[data-cy="btn_go_back"]')
      .contains('Go Back')
      .click();
      cy.wait(WAIT.FILE_UPLOAD);
  }

  uploadIBDFileOnly() {
    this.uploadFileToSftp('cypress/fixtures/missing-billing-info/3395969(IBD).xlsx', '/qa/ardb/3395969(IBD).xlsx');
    cy.wait(WAIT.SFTP_UPLOAD);
  }

  uploadIBFile() {
    this.uploadFileToSftp('cypress/fixtures/missing-billing-info/3395969(IB).xlsx', '/qa/ardb/3395969(IB).xlsx');
    cy.wait(WAIT.SFTP_UPLOAD);
  }

  upload835EDIFileForMissingBillingInfo() {
    this.uploadFileToSftp('cypress/fixtures/missing-billing-info/3395969.DAT', '/qa/edi_835/3395969.DAT');
    cy.wait(WAIT.EDI_PROCESSING);
  }

  clickOnTaskForMissingBillingInfo() {
    cy.get('[data-cy="task-list-item-button"]', { timeout: 20000 })
      .contains('3395969')
      .click();
    cy.wait(WAIT.NORMAL);
  }

  verifyMissingBillingInfoExceptionAccordion() {
    cy.get(this.getMissingBillingExceptionAccordionSelector(), { timeout: 10000 })
      .should('be.visible');
    cy.get(this.getMissingBillingExceptionAccordionSelector())
      .should('contain', 'Missing Billing Info');
  }

  hoverOverMissingBillingInfoAccordion() {
    cy.get(this.getMissingBillingExceptionAccordionSelector(), { timeout: 10000 })
      .trigger('mouseover');
    cy.wait(WAIT.SHORT);
  }

  verifyMissingBillingInfoExceptionDetailText() {
    cy.get(this.getMissingBillingExceptionDescriptionSelector(), { timeout: 10000 })
      .should('be.visible');
    cy.get(this.getMissingBillingExceptionDescriptionSelector())
      .invoke('text')
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, ' ');
        expect(normalizedText).to.include('Unable to process');
        expect(normalizedText).to.include('billing information is missing');
        expect(normalizedText).to.include('task will update automatically');
        expect(normalizedText).to.include('once we receive all the required details');
      });
  }

  verifyTaskMovedToCommercialQueue() {
    cy.get('[data-cy="queue-header"]', { timeout: 20000 })
      .contains('Commercial')
      .scrollIntoView()
      .should('be.visible');
    
    cy.get('[data-cy="queue-header"]')
      .contains('Commercial')
      .click();
    cy.wait(WAIT.LONG);
    
    cy.get('[data-cy="task-list-item-button"]', { timeout: 20000 })
      .contains('3361074')
      .should('be.visible');
  }

  verifyTaskMovedToCommercialQueueForMissingBillingInfo() {
    cy.get('[data-cy="queue-header"]', { timeout: 20000 })
      .contains('Commercial')
      .scrollIntoView()
      .should('be.visible');
    
    cy.get('[data-cy="queue-header"]')
      .contains('Commercial')
      .click();
    cy.wait(WAIT.LONG);
    
    cy.get('[data-cy="task-list-item-button"]', { timeout: 20000 })
      .contains('3395969')
      .should('be.visible');
  }
}

export const exceptionTaskPage = new ExceptionTaskPage();

