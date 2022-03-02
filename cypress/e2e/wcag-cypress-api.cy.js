import { audit } from '../e2e.js';

/* global cy */

// Use the Cypress API directly for advanced use cases, like
// - dealing with asynchronous updates
// - complex user input like form interaction

// NB: This example is illustrative and results in the exact
//     same tests as the custom API example.

audit([
	'/about/', {
		'section#dropbox': [
			function foo() {
				cy.intercept('**/foo.json').as('foo');
				cy.get('button[name="fetch"][value="foo"]').click();
				cy.wait('@foo');
			},
			function bar() {
				cy.intercept('**/bar.json').as('bar');
				cy.get('button[name="fetch"][value="bar"]').click();
				cy.wait('@bar');
			},
			function quux() {
				cy.intercept('**/quux.json').as('quux');
				cy.get('button[name="fetch"][value="quux"]').click();
				cy.wait('@quux');
			},
		],
	},
]);
