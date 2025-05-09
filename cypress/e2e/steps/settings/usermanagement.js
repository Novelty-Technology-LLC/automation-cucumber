import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

 Given("I am on the User Management page", () => {
    cy.visit(Cypress.env("BASE_URL"));
    cy.get('input[data-cy="login_username-input"]').type(Cypress.env("USER_EMAIL"));
    cy.get('input[data-cy="login_password-input"]').type(Cypress.env("PASSWORD"));
    cy.get('button[type="submit"]').click();
    cy.viewport(1380, 720);
    cy.wait(1000);
    cy.get('[data-cy="header-setting"]').click();
  });

 When("I click the Add User button", () => {
    cy.get('[data-cy="user-add-btn"]').click();
  });

  And('I enter valid user details', () => {
    cy.get('[data-cy="user_form-firstname-input"]').type("Deepsana");
    cy.get('[data-cy="user_form-lastname-input"]').type("Thapa");
    cy.get('[data-cy="user_form-dob-input"]').type('04/10/1981');
    cy.get('[data-cy="user_form-gender-input"]').click({ force: true });
    cy.get('[data-cy=gender-female]').click(); 
    cy.get('[data-cy=user_form-role-input]').click({ force: true });
    cy.get('[data-cy=role-representative]').click();
    cy.get('[data-cy="user_form-email-input"]').type('deepsana+1@noveltytechnology.com');
  });
  
 And("I click the Save button on add user modal", () => {
    cy.get('[data-cy=user-submit-btn]').click();
  });

 Then("I should see a success message 'User added successfully'", () => {
    cy.get('[data-cy="snackbar-user-add"]').contains('User created successfully.').should('be.visible');
    cy.get('[data-cy="btn_confirm"]').click();
  });

  And("The new user should appear in the user list", () => {
    cy.get('[data-cy="user-list-table"]').each(($el) => {
      const text = $el.text().trim();
      if (text === 'Deepsana') {
        cy.wrap($el).should('be.visible');
      }
    });
  });

  And('I leave required fields empty while adding user', () => {
    cy.get('[data-cy="user_form-firstname-input"]').type(" ");
    cy.get('[data-cy="user_form-lastname-input"]').type(" ");
    cy.get('[data-cy="user_form-email-input"]').type(" ");
   });
  
   Then("I should see validation messages for missing fields on add user modal", () => {
    cy.get('[data-cy="user_form-firstname-helpertext"]').should('be.visible')
    });
 
  And('I enter an invalid email format', () => {
    cy.get('[data-cy="user_form-firstname-input"]').type("deepsna");
    cy.get('[data-cy="user_form-lastname-input"]').type("thapa");
    cy.get('[data-cy="user_form-email-input"]').type("deepsana@");
   });

   Then("I should see validation message for invalid email format", () => {
    cy.get('[data-cy="user_form-email-helpertext"]').should('be.visible')
    });

   Then("I should see error message for existing email address", () => {
     cy.get('[data-cy="user-add-edit-error"]').should('be.visible')
    });

    When("I click the manage permissions button of particular user", () => {
      cy.get('[data-cy="user_table-ellipsis-menu"]').first().click().wait(3000).get('[data-cy="user_manage-permission-btn"]').click()
      });
  
    And("I update the permission to perform the settings task", () => {
      cy.get('[data-cy="checkbox_role-SETTING"]').click()
     });
  
    And("I click the Save button on roles and permissions", () => {
      cy.get('[data-cy="btn_save"]').click();
      cy.get('[data-cy="snackbar-assign-user-permission"]').contains('Resource Permission updated successfully').should('be.visible')
      cy.get('[data-cy="account_popover"]').click();
      cy.get('[data-cy="item_Log Out"]').click();
     });
  
   Then("I should able to see 'setting' tab", () => {
    cy.visit(Cypress.env("BASE_URL"));
    cy.get('input[data-cy="login_username-input"]').type(Cypress.env("USER1_EMAIL"));
    cy.get('input[data-cy="login_password-input"]').type(Cypress.env("PASSWORD"));
    cy.get('button[type="submit"]').click();
    cy.viewport(1380, 720);
    cy.get('[data-cy="header-setting"]').should('be.visible').click();
    cy.get('[data-cy="account_popover"]').click();
    cy.get('[data-cy="item_Log Out"]').click();
    cy.wait(2000);
    });

  Then("I uncheck the setting permission", () => {
    cy.get('[data-cy="checkbox_role-SETTING"]').click();
   });

  When("I click the edit button of particular user", () => {
    cy.get('[data-cy="user_table-ellipsis-menu"]').first().click().wait(3000).get('[data-cy="user_edit-btn"]').click()
    });

  And("I update the user details", () => {
    cy.get('[data-cy="user_form-phone-input"]').type("1234567896")
   });

  And("I update user details", () => {
    cy.get('[data-cy="user-submit-btn"]').click();
   });

 Then("I should see a success message 'User updated successfully'", () => {
    cy.get('[data-cy="snackbar-user-edit"]').contains('User updated successfully.').should('be.visible');
  });

  When("I click the delete button of particular user", () => {
    cy.get('[data-cy="user_table-ellipsis-menu"]').first().click().wait(3000).get('[data-cy="user_delete-btn"]').click();
    });

   And("I confirm user deletion", () => {
     cy.get('[data-cy="btn_delete"]').click();
   });

   Then("I should see a success message 'User deleted successfully'", () => {
    cy.get('[data-cy="snackbar-user-delete"]').contains('User deleted successfully.').should('be.visible');
    });

     When("I enter 'Deepsana' in the search bar", () => {
     cy.get('[data-cy="search-input"]').type('Deepsana');
     });

     Then("The user table should only display users with names containing 'Deepsana'", () => {
      cy.get('[data-cy="user-list-table"]').each(($el) => {
        const text = $el.text().trim();
        if (text === 'Deepsana') {
          cy.wrap($el).should('be.visible');
        }
      });
      
      });
    
  When("I click on advance search bar on user page", () => {
    cy.get('[data-cy="user-adv-filter-btn"]').click();
  });

 And("I select the role as 'Representative'", () => {
   cy.get('#select-role').click();
   cy.get('[data-cy=role-representative]').click();
   });

  And("I click the apply button", () => {
    cy.get('[data-cy=user_apply-adv-filter-btn]').click();
  });

  Then("The user table should only display users with Role containing 'Representative'", () => {
   cy.get('[data-cy=user-table-header-useRole]').each(($el) => {
      const text = $el.text().trim();
      if (text === 'Representative') {
     cy.wrap($el).should('be.visible');
     }
    });
  });

  And("I select the status as 'Active'", () => {
    cy.get('#select-status').click({ force: true });
    cy.get('[role="option"][data-value="ACTIVE"]').click({ force: true });
  });

  Then("The user table should only display users with Status containing 'Active'", () => {
   cy.get('[data-cy=user-table-header-status]').each(($el) => {
    const text = $el.text().trim();
      if (text === 'Active') {
        cy.wrap($el).should('be.visible');
         }
     });
  });
  
  Then("I click the clear filter button", () => {
    cy.get('[data-cy=user_clear-adv-filter-btn]').click();
  });
        