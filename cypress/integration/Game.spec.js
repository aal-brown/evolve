describe("Navigation", () => {
  before(() => {
    cy.visit("/");
    cy.contains("Login").click();
    cy.get('[alt="email"]').click().type("jane@jane.com");
    cy.get('[alt="password"]').click().type("password");
    cy.get(".button").click();
  });
  it("User should be able to create a new game", () => {
    cy.contains("Game").click();
    cy.get('[alt=title]').click().type("test-game");
    cy.get(".button").click();
    cy.contains('Quit Game').should('exist');
    cy.contains('Tour').should('exist');
  });
  it("User should be to load a game", () => {
    cy.contains("Game").click();
    cy.contains('Load').first().click();
    cy.contains('Quit Game').should('exist');
    cy.contains('Tour').should('exist');
  });
  it("User should be able to see a tour", () => {
    cy.contains('Tour').click();
    cy.contains("Greetings from your colony of orgs! They will evolve before your very eyes!").should('exist');
    cy.contains('Skip Tour').click();
  });
  it("User should be able to quit a game", () => {
    cy.contains('Quit Game').click();
    cy.get('.button').first().click();
    cy.contains('Saved Games').should('exist');
  });
});