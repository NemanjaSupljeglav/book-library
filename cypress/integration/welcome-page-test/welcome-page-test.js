/// <reference types="cypress" />

describe("wlcome", () => {
  it("Every basic element exists", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Welcome page").should("exist");
    cy.contains("Laboris excepteur est minim ").should("exist");
    cy.contains("Developed by:Virtual biopsiess").should("exist");
    cy.contains("Book").should("exist");
    cy.contains("Author").should("exist");
    cy.contains("Category").should("exist");
  });
  it("Navbar redirect", () => {
    cy.get("[datacy=book-btn]").click();
    cy.contains("Name").should("exist");
    cy.contains("Tagline").should("exist");
    cy.contains("Published").should("exist");
    cy.contains("Edit").should("exist");
    cy.contains("Delete").should("exist");

    cy.get("[datacy=author-btn]").click();
    cy.contains("Name").should("exist");
    cy.contains("About").should("exist");

    cy.get("[datacy=category-btn]").click();
    cy.contains("Type").should("exist");
    cy.contains("Describe").should("exist");

    cy.get("[datacy=home-book-btn]").click();
    cy.contains("Welcome page").should("exist");
    cy.contains("Laboris excepteur est minim ").should("exist");
  });
  it("Navbar burger icon exist", () => {
    cy.viewport(700, 500);
    cy.get("[datacy=navbar-toggler-btn]").click();
    cy.contains("Book").should("exist");
    cy.contains("Author").should("exist");
    cy.contains("Category").should("exist");
  });
});
