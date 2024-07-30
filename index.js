'use strict';

var Promise = require('bluebird');

module.exports = dispatch;

function dispatch( match, request, cb ){
	return Promise
		.resolve(match.value.apply(null, match.args.concat([ match.query, request ])))
		.asCallback(cb);
}
