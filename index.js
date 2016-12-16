'use strict';

var Promise = require('bluebird');

module.exports = dispatch;

function dispatch( match, ctx, request, cb ){
	if (typeof match.value !== 'function')
		throw new Error('Route\'s match value must be a function');

	return Promise
		.resolve(match.value.apply(null, [ ctx ].concat(match.args.concat([ match.query, request ]))))
		.asCallback(cb);
}
