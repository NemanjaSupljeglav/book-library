/// <reference types="cypress" />

describe("wlcome", () => {
  it("Every basic element exists", () => {
    cy.visit("http://localhost:3000");
    cy.url().should("include", "/book");
    cy.get("[data-testid=book-btn]").click();
    cy.contains("Name").should("exist");
    cy.contains("Tagline").should("exist");
    cy.contains("Published").should("exist");
    cy.contains("Edit").should("exist");
    cy.contains("Delete").should("exist");
    cy.get("[data-testid=add-book-btn]").should("exist");
  });
  it("Add new book looks good", () => {
    cy.get("[data-testid=add-book-btn]").click({ multiple: true, force: true });
    cy.contains("Add new book").should("exist");
    cy.contains("Book title").should("exist");
    cy.contains("Book description").should("exist");

    cy.get("[data-testid=cancel-book-btn]").should("exist");
    cy.get("[data-testid=confirm-book-btn]").should("exist");
  });
  /*
  it("Close modal works", () => {
    cy.get("[data-testid=cancel-book-btn]").click();
    cy.contains("Add new book").should("not.exist");
    cy.get("[data-testid=add-book-btn]").click({ multiple: true, force: true });
    cy.get("[data-testid=cancel-book-icon]").click({
      multiple: true,
      force: true,
    });
    cy.contains("Add new book").should("exist");
  });
  */
});
