/**
 * CommonJS wrapper to re-export the shared Tailwind v4 config for apps expecting CJS resolution.
 */
const config = require('./tailwind.config.ts');

module.exports = config.default || config;
