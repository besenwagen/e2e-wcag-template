import { audit } from '../e2e.js';

// Dynamic page fragments are declared with an object that takes
// CSS query selectors as property names and values; only the
// first matching element in the document is used.
// - property name:  a dynamic page fragment to test with axe-core
// - property value: interactive element(s) that reveal the fragment

// NB: This only works for synchronous operations. See the fetch example
//     for dealing with HTTP requests by using objects as property values.

audit([
	'/about/', {
		// One to one relation:
		'section#foo': 'body > div:nth-of-type(1) button',
		'section#bar': 'body > div:nth-of-type(2) button',
		'section#quux': 'body > div:nth-of-type(3) button',
		// One to many relation:
		'section#dropbox': [
			'button[name="copy"][value="foo"]',
			'button[name="copy"][value="bar"]',
			'button[name="copy"][value="quux"]',
		],
	},
]);
