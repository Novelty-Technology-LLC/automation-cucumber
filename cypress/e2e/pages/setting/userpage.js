class UserPage {
  // Navigation and Setup
  goToUserManagementPage() {
    cy.viewport(1380, 720);
    cy.wait(1000);
    cy.get('[data-cy="header-setting"]').click();
  }

  // Add User Operations
  clickAddUserButton() {
    cy.get('[data-cy="user-add-btn"]').click();
  }

  enterValidUserDetails(userData = {}) {
    const defaultData = {
      firstName: "Deepsana",
      lastName: "Thapa",
      dob: "04/10/1981",
      gender: "female",
      role: "representative",
      email: "deepsana+1@noveltytechnology.com"
    };
    
    const data = { ...defaultData, ...userData };
    
    cy.get('[data-cy="user_form-firstname-input"]').type(data.firstName);
    cy.get('[data-cy="user_form-lastname-input"]').type(data.lastName);
    cy.get('[data-cy="user_form-dob-input"]').type(data.dob);
    cy.get('[data-cy="user_form-gender-input"]').click({ force: true });
    cy.get(`[data-cy=gender-${data.gender}]`).click();
    cy.get('[data-cy=user_form-role-input]').click({ force: true });
    cy.get(`[data-cy=role-${data.role}]`).click();
    cy.get('[data-cy="user_form-email-input"]').type(data.email);
  }

  enterInvalidUserDetails() {
    cy.get('[data-cy="user_form-firstname-input"]').type("deepsna");
    cy.get('[data-cy="user_form-lastname-input"]').type("thapa");
    cy.get('[data-cy="user_form-email-input"]').type("deepsana@");
  }

  leaveRequiredFieldsEmpty() {
    cy.get('[data-cy="user_form-firstname-input"]').type(" ");
    cy.get('[data-cy="user_form-lastname-input"]').type(" ");
    cy.get('[data-cy="user_form-email-input"]').type(" ");
  }

  saveUser() {
    cy.get('[data-cy=user-submit-btn]').click();
  }

  // Success Messages and Validation
  verifyUserAddedSuccessfully() {
    cy.get('[data-cy="snackbar-user-add"]').contains('User created successfully.').should('be.visible');
    cy.get('[data-cy="btn_confirm"]').click();
  }

  verifyUserInList(firstName) {
    cy.get('[data-cy="user-list-table"]').each(($el) => {
      const text = $el.text().trim();
      if (text === firstName) {
        cy.wrap($el).should('be.visible');
      }
    });
  }

  verifyValidationMessages() {
    cy.get('[data-cy="user_form-firstname-helpertext"]').should('be.visible');
  }

  verifyEmailValidationMessage() {
    cy.get('[data-cy="user_form-email-helpertext"]').should('be.visible');
  }

  verifyExistingEmailError() {
    cy.get('[data-cy="user-add-edit-error"]').should('be.visible');
  }

  // User Management Operations
  clickManagePermissions() {
    cy.get('[data-cy="user_table-ellipsis-menu"]').first().click();
    cy.wait(3000);
    cy.get('[data-cy="user_manage-permission-btn"]').click();
  }

  updateSettingPermission() {
    cy.get('[data-cy="checkbox_role-SETTING"]').click();
  }

  savePermissions() {
    cy.get('[data-cy="btn_save"]').click();
    cy.get('[data-cy="snackbar-assign-user-permission"]').contains('Resource Permission updated successfully').should('be.visible');
  }

  logout() {
    cy.get('[data-cy="account_popover"]').click();
    cy.get('[data-cy="item_Log Out"]').click();
  }

  verifySettingTabVisible() {
    cy.visit(Cypress.env("BASE_URL"));
    cy.get('[data-cy="login_username-input"]').type(Cypress.env("USER1_EMAIL"));
    cy.get('[data-cy="login_password-input"]').type(Cypress.env("PASSWORD"));
    cy.get('button[type="submit"]').click();
    cy.viewport(1380, 720);
    cy.get('[data-cy="header-setting"]').should('be.visible').click();
    cy.get('[data-cy="account_popover"]').click();
    cy.get('[data-cy="item_Log Out"]').click();
    cy.wait(2000);
  }

  // Edit User Operations
  clickEditUser() {
    cy.get('[data-cy="user_table-ellipsis-menu"]').first().click();
    cy.wait(3000);
    cy.get('[data-cy="user_edit-btn"]').click();
  }

  updateUserDetails(phone = "1234567896") {
    cy.get('[data-cy="user_form-phone-input"]').type(phone);
  }

  verifyUserUpdatedSuccessfully() {
    cy.get('[data-cy="snackbar-user-edit"]').contains('User updated successfully.').should('be.visible');
  }

  // Delete User Operations
  clickDeleteUser() {
    cy.get('[data-cy="user_table-ellipsis-menu"]').first().click();
    cy.wait(3000);
    cy.get('[data-cy="user_delete-btn"]').click();
  }

  confirmUserDeletion() {
    cy.get('[data-cy="btn_delete"]').click();
  }

  verifyUserDeletedSuccessfully() {
    cy.get('[data-cy="snackbar-user-delete"]').contains('User deleted successfully.').should('be.visible');
  }

  // Search Operations
  searchUser(searchTerm) {
    cy.get('[data-cy="search-input"]').type(searchTerm);
  }

  verifySearchResults(searchTerm) {
    cy.get('[data-cy="user-list-table"]').each(($el) => {
      const text = $el.text().trim();
      if (text === searchTerm) {
        cy.wrap($el).should('be.visible');
      }
    });
  }

  // Advanced Search Operations
  clickAdvancedSearch() {
    cy.get('[data-cy="user-adv-filter-btn"]').click();
  }

  selectRole(role) {
    cy.get('#select-role').click();
    cy.get(`[data-cy=role-${role.toLowerCase()}]`).click();
  }

  selectStatus(status) {
    cy.get('#select-status').click({ force: true });
    cy.get(`[role="option"][data-value="${status.toUpperCase()}"]`).click({ force: true });
  }

  applyAdvancedFilter() {
    cy.get('[data-cy=user_apply-adv-filter-btn]').click();
  }

  clearAdvancedFilter() {
    cy.get('[data-cy=user_clear-adv-filter-btn]').click();
  }

  verifyRoleFilterResults(role) {
    cy.get('[data-cy=user-table-header-useRole]').each(($el) => {
      const text = $el.text().trim();
      if (text === role) {
        cy.wrap($el).should('be.visible');
      }
    });
  }

  verifyStatusFilterResults(status) {
    cy.get('[data-cy=user-table-header-status]').each(($el) => {
      const text = $el.text().trim();
      if (text === status) {
        cy.wrap($el).should('be.visible');
      }
    });
  }
}

export const userPage = new UserPage();
