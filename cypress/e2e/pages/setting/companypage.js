
class CompanyPage {
  goToCompaniesPage() {
    cy.get('[data-cy="header-setting"]').click();
    cy.get('[data-cy="sidebar-company"]').click();
  }

  clickAddButton() {
    cy.get('[data-cy="btn_add"]').click();
  }

  enterCompanyDetails({ name, code, payerId }) {
    cy.get('[data-cy="input_companyName"]').type(name);
    cy.get('[data-cy="input_company-code"]').type(code);
    cy.get('[data-cy="input_payerId"]').type(payerId);
    cy.get('#tpa-company').click();
    cy.get('[data-cy=role-post-n-track]').click();
  }

  saveCompany() {
    cy.get('[data-cy=company-submit-btn]').click();
  }

  verifySuccessMessage(text) {
    cy.get('[data-cy=snackbar-company-add]').should('contain.text', text);
  }

  verifyCompanyInList() {
   cy.get('[data-cy="company-list-table"]').each(($el) => {
      const text = $el.text().trim();
      if (text === 'Test company') {
        cy.wrap($el).should('be.visible');
      }
    });
  }

   leaveRequiredFieldsEmpty() {
    cy.get('[data-cy="input_companyName"]').type(' '); 
    cy.get('[data-cy="input_company-code"]').type(' ');
    cy.get('[data-cy="input_payerId"]').type(' ');
  }

  verifyValidationMessages() {
    cy.get('[data-cy="helpertext_companyName"]').should('be.visible');
    cy.get('[data-cy="helpertext_company-code"]').should('be.visible');
    cy.get('[data-cy="helpertext_payerId"]').should('be.visible');
  }

  enterDuplicateCompanyCode(company) {
    cy.get('[data-cy="input_companyName"]').type(company.name);
    cy.get('[data-cy="input_company-code"]').type(company.code);
    cy.get('[data-cy="input_payerId"]').type(company.payerId);
    cy.get('#tpa-company').click();
    cy.get('[data-cy=role-post-n-track]').click();
  }

   verifyDuplicateCodeError() {
    cy.get('[data-cy="helpertext_company-code"]').should('be.visible')
  }

  clickCompanyEditButton() {
    cy.get('[data-cy="company-ellipse-btn"]').first().click({ force: true });
    cy.wait(3000);
    cy.get('[data-cy="company-add-btn"]').click();
  }

   updateCompanyName(name) {
    cy.get('[data-cy="input_companyName"]').clear().type(name);
  }

  submitCompanyDetails() {
    cy.get('[data-cy="company-submit-btn"]').click();
  }

   verifyCompanyUpdated(name) {
    cy.get('[data-cy="snackbar-company-edit"]').should('be.visible');
    cy.get('[data-cy="company-list-table"]').each(($el) => {
      const text = $el.text().trim();
      if (text === name) {
        cy.wrap($el).should('be.visible');
      }
    });
  }

  clickCompanyDeleteButton() {
    cy.get('[data-cy="company-ellipse-btn"]').first().click({ force: true });
    cy.wait(3000);
    cy.get('[data-cy="company-delete-btn"]').click();
  }

  confirmCompanyDeletion() {
    cy.get('[data-cy="btn_confirm"]').click();
  }

   verifyCompanyDeleted() {
    cy.get('[data-cy="snackbar-company-delete"]')
      .contains('Company deleted successfully.')
      .should('be.visible');
  }
}

export const companyPage = new CompanyPage();
