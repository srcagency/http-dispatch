'use strict';

module.exports = dispatch;

function dispatch( match, request ){
	if (typeof match.value !== 'function')
		throw new Error('Route\'s match value must be a function');

	return match.value.apply(null, match.args.concat([ match.query, request ]));
}
