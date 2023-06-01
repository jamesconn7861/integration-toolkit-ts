// https://docs.cypress.io/api/introduction/api.html

describe("Root Test", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "You did it!");
  });
});
