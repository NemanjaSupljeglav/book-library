/// <reference types="cypress" />

describe("welcome", () => {
  it("Author page have all basic element", () => {
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
    cy.contains("confirm").should("not.exist");
  });
  it("Add author works", () => {
    cy.get("[datacy=add-author-btn]").click({ multiple: true, force: true });
    cy.get("[datacy=input-author-name]").type("Ivo Andrić");
    cy.get("[datacy=input-author-about]").type(
      "Ivo  Andrić rodio se u Travniku, u hrvatskoj obitelji[8][9] Antuna Andrića, sudskoga podvornika i Katarine Pejić.[10] Mjesec dana po rođenju, dana 9. studenog 1892. godine, u Crkvi sv. "
    );
    cy.get("[datacy=confirm-book-btn]").click();
    cy.contains("Ivo Andrić").should("exist");
  });
  it("Category page have all basic element", () => {
    cy.get("[datacy=category-btn]").should("be.visible");
    cy.get("[datacy=category-btn]").click();
    cy.contains("Type").should("exist");
    cy.contains("Describe").should("exist");
    cy.get("[datacy=add-category-btn]").should("be.visible");
    cy.get("[datacy=add-category-btn]").click({ multiple: true, force: true });
    cy.contains("Add new category").should("exist");
    cy.contains("Category name").should("exist");
    cy.contains("Description").should("exist");
    cy.get("[datacy=cancel-book-btn]").should("exist");
    cy.get("[datacy=confirm-book-btn]").should("exist");
    cy.get("[datacy=cancel-book-btn]").click();
    cy.contains("confirm").should("not.exist");
    cy.get("[datacy=add-category-btn]").click({ multiple: true, force: true });
  });
  it("Add category works", () => {
    cy.get("[datacy=add-category-btn]").click({ multiple: true, force: true });
    cy.get("[datacy=input-category-name]").type("Roman");
    cy.get("[datacy=input-category-about]").type(
      "Roman je najopširnija prozna književna vrsta, a u današnje vrijeme i najpopularnija. Prvotno se tako nazivao svaki spis koji je pisan pučkim (romanskim) jezikom (za razliku od latinskog). "
    );
    cy.get("[datacy=confirm-book-btn]").click();
    cy.contains("Roman").should("exist");
    cy.contains("Roman je najopširnija prozna književna vrsta").should("exist");
  });

  it("Book page have all basic element", () => {
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
    cy.contains("Ivo Andrić").click();
    cy.get("[datacy=input-book-category]").click({ multiple: true });
    cy.contains("Roman").click();
    cy.get("[datacy=confirm-book-btn]").click();
    cy.contains("Na Drini ćuprija").should("exist");
    cy.contains("Knjiga o ćupriji, Tomislavgrad").should("exist");
    cy.contains("Ivo Andrić").should("exist");
    cy.contains("Roman").should("exist");
  });
  it("Edit book works", () => {
    cy.get("[datacy=edit-book-test]").last().click({ multiple: true });
    cy.get("[datacy=input-book-title]").clear().type("Na Drini most");
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

  it("Delete category looks and works good", () => {
    cy.get("[datacy=category-btn]").click();
    cy.get("[datacy=delete-category-test]").last().click({ multiple: true });
    cy.contains("Confirm Delete").should("exist");
    cy.get("[datacy=delete-cancel-btn]").should("exist");
    cy.get("[datacy=delete-confirm-btn]").should("exist");
    cy.get("[datacy=delete-confirm-btn]").click({
      multiple: true,
      force: true,
    });
    cy.contains("Roman").should("not.exist");
  });

  it("Delete author looks and works good", () => {
    cy.get("[datacy=author-btn]").click();
    cy.get("[datacy=delete-author-test]").last().click({ multiple: true });
    cy.contains("Confirm Delete").should("exist");
    cy.get("[datacy=delete-cancel-btn]").should("exist");
    cy.get("[datacy=delete-confirm-btn]").should("exist");
    cy.get("[datacy=delete-confirm-btn]").click({
      multiple: true,
      force: true,
    });
    cy.contains("Ivo Andrić").should("not.exist");
  });
});
