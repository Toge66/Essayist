(function () {
	'use strict';

	const math = require("./math-require.js");
	console.log(math);
	const result = math.add(1, 2);

	module.exports = result;

}());
