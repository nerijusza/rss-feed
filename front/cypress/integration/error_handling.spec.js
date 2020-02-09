const EXISTING_EMAIL = 'existing@email.com';
const EXISTING_EMAIL_ERROR_MESSAGE = 'Email ' + EXISTING_EMAIL +' already registered, please login';

const NOT_VALID_EMAIL_MESSAGE = 'Email is not valid';
const NOT_VALID_PASSWORD_MESSAGE = 'Password is too short';

const commonLoginRegisterPageChecks = (url) => {
    // given
    cy.server({'force404' : true});
    // when
    cy.visit(url);
    // then
    cy.url().should('equal', Cypress.config().baseUrl + url);
    cy.get(NOT_VALID_EMAIL_MESSAGE).should('not.exist');
    cy.get(NOT_VALID_PASSWORD_MESSAGE).should('not.exist');


    // when
    cy.get('[data-cy=auth-button]').click();
    // then
    cy.contains(NOT_VALID_EMAIL_MESSAGE);
    cy.contains(NOT_VALID_PASSWORD_MESSAGE);


    // when
    cy.get('[data-cy=email]').type('not@valid.e');
    cy.get('[data-cy=password]').type('12');
    cy.get('[data-cy=auth-button]').click();
    // then
    cy.contains(NOT_VALID_EMAIL_MESSAGE);
    cy.contains(NOT_VALID_PASSWORD_MESSAGE);


    // when
    cy.get('[data-cy=password]').type('3456');
    cy.get('[data-cy=auth-button]').click();
    // then
    cy.contains(NOT_VALID_EMAIL_MESSAGE);
    cy.get(NOT_VALID_PASSWORD_MESSAGE).should('not.exist');
};

describe('User form error handling', function() {
    it('Check error handling for "login" page', function () {
        commonLoginRegisterPageChecks('/');

        // when
        cy.route({
            method: 'POST',
            url: '/auth/login',
            status: 401,
            response: {
                'code': 401,
                'message': 'Invalid credentials.'
            },
        }).as('postAuthLogin');
        cy.get('[data-cy=email] input').clear().type('correct@email.com');
        cy.get('[data-cy=auth-button]').click();
        cy.wait('@postAuthLogin');
        // then
        cy.url().should('equal', Cypress.config().baseUrl + '/');
        cy.get(NOT_VALID_EMAIL_MESSAGE).should('not.exist');
        cy.get(NOT_VALID_PASSWORD_MESSAGE).should('not.exist');
        cy.contains('Wrong user/email');


        // when
        cy.route({
            method: 'POST',
            url: '/auth/login',
            status: 500,
            response: 'not JSON',
        }).as('postAuthLogin');
        cy.get('[data-cy=auth-button]').click();
        cy.wait('@postAuthLogin');
        // then
        cy.url().should('equal', Cypress.config().baseUrl + '/');
        cy.contains('Unknown server error');
    });

    it('Check error handling for "register" page', function () {
        commonLoginRegisterPageChecks('/register');

        // when
        cy.route({
            method: 'GET',
            url: '/validate/email/*',
            response: {'valid': false},
        }).as('getEmailCheck');
        cy.get('[data-cy=email] input').clear().type(EXISTING_EMAIL);
        cy.wait('@getEmailCheck');
        // then
        cy.contains(EXISTING_EMAIL_ERROR_MESSAGE);


        // when
        cy.route({
            method: 'POST',
            url: '/auth/register',
            status: 500,
            response: {"error": EXISTING_EMAIL_ERROR_MESSAGE},
        }).as('postAuthRegister');
        cy.get('[data-cy=auth-button]').click();
        cy.wait('@postAuthRegister');
        // then
        cy.url().should('equal', Cypress.config().baseUrl + '/register');
        cy.contains(EXISTING_EMAIL_ERROR_MESSAGE);
    });
});