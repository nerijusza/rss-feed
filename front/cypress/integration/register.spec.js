
const VALID_EMAIL = 'valid@email.com';
const SUCCESS_MESSAGE = VALID_EMAIL + ' has been registered!';

describe('Test "register" page success case', function() {
    it('After successful registration message should be shown and user redirected to login page', function() {
        // given
        cy.server({'force404' : true});
        cy.route({method: 'POST', url: '/auth/register', response: {"success": SUCCESS_MESSAGE}})
            .as('postAuthRegister');
        cy.route({method: 'GET', url: '/validate/email/*', response: {'valid': true}})
            .as('getEmailCheck');

        // when
        cy.visit('/register');
        cy.get('[data-cy=email]').type(VALID_EMAIL);
        cy.get('[data-cy=password]').type('valid_password');
        cy.get('[data-cy=auth-button]').click();
        cy.wait('@postAuthRegister');
        // then
        cy.contains(SUCCESS_MESSAGE);
        cy.url().should('equal', Cypress.config().baseUrl + '/register');


        // when
        cy.wait(3050); // for user to read message, then redirect to login
        // then
        cy.url().should('equal', Cypress.config().baseUrl + '/');
    });
});
