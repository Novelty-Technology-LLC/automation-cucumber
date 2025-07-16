// let isauth = false;
// Cypress.Commands.add('login', () => {
//   if (isauth) return true;
//   cy.session([Cypress.env("USER_EMAIL"), Cypress.env("PASSWORD")], () => {
//     cy.visit(Cypress.env("BASE_URL") + '/login');
//     cy.get('input[data-cy="login_username-input"]').type(Cypress.env("USER_EMAIL"));
//     cy.get('input[data-cy="login_password-input"]').type(Cypress.env("PASSWORD"));
//     cy.get('button[type="submit"]').click();
//     cy.viewport(1380, 720);
//      cy.url().should('include', '/dashboard');
//      isauth =true;
//   }, {
//     // validate() {

//     //   cy.request({
//     //     method: 'GET',
//     //     url: 'https://qa.api.therapy.noveltytechnology.com/api/user-service/auth/refresh-token',
//     //   }).its('status').should('eq', 200);
//     // },
//   });
// });

Cypress.Commands.add("login", () => {
  const email = Cypress.env("USER_EMAIL");
  const password = Cypress.env("PASSWORD");

  cy.getCookies().then((cookies) => {
    cy.log("Active cookies:", cookies);
  });

  cy.session(
    [email],
    () => {
      cy.visit(Cypress.env("BASE_URL") + "/login");

      cy.get('input[data-cy="login_username-input"]').type(email);
      cy.get('input[data-cy="login_password-input"]').type(password);
      cy.get('button[type="submit"]').click();

      cy.url().should("include", "/dashboard");

      cy.getCookies().then((cookies) => {
        cy.log("Active cookies:", cookies);
      });

      // Wait for auth cookies to set
      cy.getCookie("accessToken").should("exist");
    },
    {
      validate() {
        // Cypress will cache this session, so ensure it's valid
        cy.request({
          method: "GET",
          url: "https://qa.api.therapy.noveltytechnology.com/api/user-service/users/self-permissions",
          failOnStatusCode: false,
        }).then((resp) => {
          expect(resp.status).to.eq(200);
        });
      },
    }
  );
});

Cypress.Commands.add("logout", () => {
  cy.get('[data-cy="account_popover"]').click();
  cy.get('[data-cy="item_Log Out"]').click();
  cy.log("logout session");
});
