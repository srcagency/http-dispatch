'use strict';

module.exports = dispatch;

function dispatch( match, request ){
	return match.value.fn.apply(null, match.args.concat([ match.query, request ]));
}
