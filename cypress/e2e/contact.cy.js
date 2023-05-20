/// <reference types="Cypress" />

describe('contact form', () => {
  beforeEach(() => {
    cy.visit('/about');
    cy.getById('contact-btn-submit').as('submitBtn');
  });

  it('should submit the form', () => {
    cy.getById('contact-input-message').type('This is a test');
    cy.getById('contact-input-name').type('John Doe');
    cy.getById('contact-input-email').type('test@email.com');

    // Check Initial Condition Of Button
    cy.get('@submitBtn')
      .contains('Send Message')
      .and('not.have.attr', 'disabled');

    //Check Condition Of Button After Click
    cy.submitForm();
    cy.get('@submitBtn').contains('Sending...').and('have.attr', 'disabled');
  });

  it('should validate the form input', () => {
    cy.submitForm();
    cy.get('@submitBtn').should((el) => {
      expect(el).to.not.have.attr('disabled');
      expect(el.text()).to.not.equal('Sending...');
    });

    cy.getById('contact-input-message')
      .as('messageInput')
      .focus()
      .blur()
      .parent()
      .should((el) => {
        expect(el.attr('class')).to.contain('invalid');
      });

    cy.getById('contact-input-name')
      .as('nameInput')
      .focus()
      .blur()
      .parent()
      .should((el) => {
        expect(el.attr('class')).to.contain('invalid');
      });

    cy.getById('contact-input-email')
      .as('emailInput')
      .focus()
      .blur()
      .parent()
      .should((el) => {
        expect(el.attr('class')).to.contain('invalid');
      });
  });
});
