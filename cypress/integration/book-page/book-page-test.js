/// <reference types="cypress" />

describe("welcome", () => {
  it("Every basic element exists", () => {
    cy.visit("http://localhost:3000");
    cy.get("[datacy=author-btn]").should("be.visible");
    cy.get("[datacy=author-btn]").click();
    cy.contains("Name").should("exist");
    cy.contains("About").should("exist");
    cy.get("[datacy=add-author-btn]").should("be.visible");
    cy.get("[datacy=add-author-btn]").click({ multiple: true, force: true });
    cy.contains("Add new author").should("exist");
    cy.contains("Author name").should("exist");
    cy.get("[datacy=cancel-book-btn]").should("exist");
    cy.get("[datacy=confirm-book-btn]").should("exist");
    cy.get("[datacy=cancel-book-btn]").click();
    cy.contains("Add new author").should("not.exist");
    cy.get("[datacy=add-author-btn]").click({ multiple: true, force: true });
  });
  /*
  it("Every basic element exists", () => {
    cy.get("[datacy=book-btn]").should("be.visible");
    cy.get("[datacy=book-btn]").click();
    cy.contains("Name").should("exist");
    cy.contains("Tagline").should("exist");
    cy.contains("Published").should("exist");
    cy.contains("Edit").should("exist");
    cy.contains("Delete").should("exist");
    cy.get("[datacy=add-book-btn]").should("exist");
  });
  
  it("Add new book looks good", () => {
    cy.get("[datacy=add-book-btn]").click({ multiple: true, force: true });
    cy.contains("Add new book").should("exist");
    cy.contains("Book title").should("exist");
    cy.contains("Book description").should("exist");

    cy.get("[datacy=cancel-book-btn]").should("exist");
    cy.get("[datacy=confirm-book-btn]").should("exist");
  });

  it("Close modal works", () => {
    cy.get("[datacy=cancel-book-btn]").click();
    cy.contains("confirm").should("not.exist");
    cy.get("[datacy=add-book-btn]").click({ multiple: true, force: true });
    cy.get("[datacy=cancel-book-icon]").click({
      multiple: true,
      force: true,
    });
    cy.contains("Add new book").should("exist");
  });

  it("Add new book works", () => {
    cy.get("[datacy=add-book-btn]").click({ multiple: true, force: true });
    cy.get("[datacy=input-book-title]").type("Na Drini ćuprija");
    cy.get("[datacy=input-book-description]").type("Kratak opis knjige");
    cy.get("[datacy=input-book-tagline]").type(
      "Knjiga o ćupriji, Tomislavgrad"
    );
    cy.get("[datacy=input-book-author]").last().click({ multiple: true });
    cy.contains("Eve Gates").click();
    cy.get("[datacy=input-book-category]").click({ multiple: true });
    cy.contains("Fantasy").click();
    cy.get("[datacy=confirm-book-btn]").click();
    cy.contains("Na Drini ćuprija").should("exist");
    cy.contains("Knjiga o ćupriji, Tomislavgrad").should("exist");
    cy.contains("Eve Gates").should("exist");
    cy.contains("Fantasy").should("exist");
  });
  it("Edit book works", () => {
    cy.get("[datacy=edit-book-test]").last().click({ multiple: true });
    cy.get("[datacy=input-book-title]").type("Na Drini most");
    cy.get("[datacy=confirm-book-btn]").click();
    cy.contains("Na Drini most").should("exist");
  });
  it("Delete modal exist, and works good ", () => {
    cy.get("[datacy=delete-book-test]").last().click({ multiple: true });
    cy.contains("Are you sure you want to delete this book?").should("exist");
    cy.contains("Confirm Delete").should("exist");
    cy.get("[datacy=delete-cancel-btn]").should("exist");
    cy.get("[datacy=delete-confirm-btn]").should("exist");
    cy.get("[datacy=delete-cancel-btn]").click({ multiple: true, force: true });
    cy.contains("Are you sure you want to delete this book?").should(
      "not.exist"
    );
    cy.get("[datacy=delete-book-test]").last().click({ multiple: true });
    cy.get("[datacy=delete-confirm-btn]").click({
      multiple: true,
      force: true,
    });
    cy.contains("Na Drini most").should("not.exist");
  });
  */
});
