/// <reference types="Cypress" />

describe('contact form', () => {
  it('should submit the form', () => {
    cy.visit('http://localhost:5173/about');
    cy.get('[data-cy="contact-input-message"]').type('This is a test');
    cy.get('[data-cy="contact-input-name"]').type('John Doe');
    cy.get('[data-cy="contact-input-email"]').type('test@email.com');

    // Get Submit Button
    cy.get('[data-cy="contact-btn-submit"]').as('submitBtn');

    // Check Initial Condition Of Button
    cy.get('@submitBtn')
      .contains('Send Message')
      .and('not.have.attr', 'disabled');

    //Check Condition Of Button After Click
    cy.get('@submitBtn').click();
    cy.get('@submitBtn').contains('Sending...').and('have.attr', 'disabled');
  });

  it('should validate the form input', () => {
    cy.visit('http://localhost:5173/about');
    cy.get('[data-cy="contact-btn-submit"]')
      .as('submitBtn')
      .click()
      .should((el) => {
        expect(el).to.not.have.attr('disabled');
        expect(el.text()).to.not.equal('Sending...');
      });

    cy.get('[data-cy="contact-input-message"]')
      .as('messageInput')
      .focus()
      .blur()
      .parent()
      .should((el) => {
        expect(el.attr('class')).to.contain('invalid');
      });

    cy.get('[data-cy="contact-input-name"]')
      .as('nameInput')
      .focus()
      .blur()
      .parent()
      .should((el) => {
        expect(el.attr('class')).to.contain('invalid');
      });

    cy.get('[data-cy="contact-input-email"]')
      .as('emailInput')
      .focus()
      .blur()
      .parent()
      .should((el) => {
        expect(el.attr('class')).to.contain('invalid');
      });
  });
});
