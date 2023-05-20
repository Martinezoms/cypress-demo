/// <reference types="Cypress" />

describe('page navigation', () => {
  it('should navigate between pages', () => {
    cy.visit('/');
    cy.getById('header-about-link').click();
    cy.location('pathname').should('eq', '/about');
    cy.go('back');
    cy.location('pathname').should('eq', '/');
    cy.getById('header-about-link').click();
    cy.getById('header-home-link').click();
    cy.location('pathname').should('eq', '/');
  });
});
