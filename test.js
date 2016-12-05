'use strict';

const test = require('tape');
const dispatch = require('./');

test(function( t ){
	t.plan(4);

	const request = {};

	dispatch({
		value: {
			fn: function(){
				t.deepEqual(Object.values(arguments), [
					'a',
					'b',
					'd=e',
					request,
				]);
			},
		},
		args: [ 'a', 'b' ],
		query: 'd=e',
	}, request);

	dispatch({
		value: {
			fn: function(){
				t.deepEqual(Object.values(arguments), [
					'd=e',
					request,
				]);
			},
		},
		args: [],
		query: 'd=e',
	}, request);

	dispatch({
		value: {
			fn: function(){
				t.deepEqual(Object.values(arguments), [
					'',
					request,
				]);
			},
		},
		args: [],
		query: '',
	}, request);

	dispatch({
		value: {
			fn: function(){
				t.deepEqual(Object.values(arguments), [
					'a',
					'',
					request,
				]);
			},
		},
		args: [ 'a' ],
		query: '',
	}, request);
});
