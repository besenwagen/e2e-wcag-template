import { audit } from '../e2e.js';

/* global cy */

audit([
	'/',
	'/about/',
	'/contact/',
]);
