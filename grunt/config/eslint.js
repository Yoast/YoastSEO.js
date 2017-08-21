// See https://github.com/sindresorhus/grunt-eslint
module.exports = {
	target: {
		src: [ "<%= files.js %>", "!build/templates.js" ],
		options: {
			maxWarnings: 22,
		},
	},
};
