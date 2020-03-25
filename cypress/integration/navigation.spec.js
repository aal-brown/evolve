describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/")
  });
  it("should visit root", () => {
  });
  it("should be able to visit about", () => {
    cy.contains("About").click();
  });
  it("should be able to visit Login", () => {
    cy.contains("Login").click();
  });
  it("should be able to visit Register", () => {
    cy.contains("Register").click();
  });
  it("should be able to visit Game", () => {
    cy.contains("Game").click();
    cy.get(".button").click();
  });
});