'use strict';

module.exports = dispatch;

function dispatch( match, request ){
	return Promise.resolve(
		match.value.apply(
			null,
			match.args.concat([ match.query, request ])
		)
	);
}
