import { audit } from '../e2e.js';

// This is an extension of testing dynamic fragments. Property names are
// CSS query selectors for the first matching element in the document.
// - property name:  a dynamic page fragment to test with axe-core
// - property value: an object with the format
//   - property name:  interactive element that fetches a resource
//   - property value: a glob pattern matching the resource URL

// NB: This results in the exact same tests as the custom API example.

audit([
	'/about/', {
		'section#dropbox': {
			'button[name="fetch"][value="foo"]': '**/foo.json',
			'button[name="fetch"][value="bar"]': '**/bar.json',
			'button[name="fetch"][value="quux"]': '**/quux.json',
		},
	},
]);
