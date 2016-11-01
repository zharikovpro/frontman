const autoprefixer = require('autoprefixer');
const lost = require('lost');

module.exports = {
	// plugins: [lost(), autoprefixer()],
	// map: true,
	plugins: {
		'autoprefixer': {},
		'lost': {},
	},
	map: true
};

