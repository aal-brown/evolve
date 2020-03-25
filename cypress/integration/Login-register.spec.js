describe("Login/register", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("New user should be able to login", () => {
    cy.contains("Register").click();
    cy.get('[alt="name"]').click().type("Testing");
    cy.get('[alt="email"]').click().type("test@test12345678.com");
    cy.get('[alt="username"]').click().type("test123");
    cy.get('[alt="password"]').click().type("password");
    cy.get('[alt="confirm-password"]').click().type("password");
    cy.get(".button").click();
    cy.contains('Logout').should('exist');
    cy.contains('Welcome: Testing').should('exist');
  });
  it("User should be able to login", () => {
    cy.contains("Login").click();
    cy.get('[alt="email"]').click().type("jane@jane.com");
    cy.get('[alt="password"]').click().type("password");
    cy.get(".button").click()
    cy.contains('Logout').should('exist')
    cy.contains('Welcome: Jane Eyre').should('exist')
  });
});