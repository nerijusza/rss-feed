describe('Main flow (login, rss content, logout) with mocked API responses', function() {
    it('1. Without login content should not be accessible. ' +
        '2. With correct credentials should be redirected to authorized content page. ' +
        '3. After "Log Out" content should not be available anymore.', function () {
        // given
        cy.server({'force404' : true});

        cy.fixture('login.success.json').as('loginSuccess');
        cy.route('POST', '/auth/login', '@loginSuccess').as('postAuthLogin');

        cy.fixture('frequent.words.json').as('frequentWords');
        cy.route('GET', '/api/frequentWords', '@frequentWords').as('getFrequentWords');

        cy.fixture('rss.feed.json').as('rssFeed');
        cy.route('GET', '/api/rss', '@rssFeed').as('getRssFeed');

        // when
        cy.visit('/rss');
        // then
        cy.url().should('equal', Cypress.config().baseUrl + '/');


        // when
        cy.get('[data-cy=email]').type('good@email.com');
        cy.get('[data-cy=password]').type('good_password');
        cy.get('[data-cy=auth-button]').click();
        cy.wait('@getFrequentWords');
        cy.wait('@getRssFeed');

        // then
        cy.get('@getFrequentWords').then(request => {
            expect(request.requestHeaders).to.have.property('Authorization', 'Bearer mock_token_value');
        });
        cy.get('@getRssFeed').then(request => {
            expect(request.requestHeaders).to.have.property('Authorization', 'Bearer mock_token_value');
        });
        cy.url().should('equal', Cypress.config().baseUrl + '/rss');

        cy.get('[data-cy=frequent-word').should('have.length', 2);
        cy.get('[data-cy=frequent-word').contains('cypress');
        cy.get('[data-cy=frequent-word').contains('rules');

        cy.get('[data-cy=rss-entry').should('have.length', 2);
        cy.get('[data-cy=rss-entry').contains('Come to Five Guys, where the software is as fresh as');


        // when
        cy.contains('Log Out').click();
        // then
        cy.url().should('equal', Cypress.config().baseUrl + '/');
        cy.get('Log Out').should('not.exist');


        // when
        cy.visit('/rss');
        // then
        cy.url().should('equal', Cypress.config().baseUrl + '/');
    });
});