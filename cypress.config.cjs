const baseUrl = 'https://e2e-cypress-axe.netlify.app';

// =====================================================================

const { queue, flush } = require('./vendor/cy-axe-report');

module.exports = {
	e2e: {
		baseUrl,
		fixturesFolder: false,
		screenshotOnRunFailure: false,
		video: false,
		setupNodeEvents(on) {
			on('task', queue);
			on('after:run', flush);
		},
	},
};
