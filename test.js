'use strict';

const test = require('tape');
const dispatch = require('./');

test(function( t ){
	t.plan(5);

	const request = {};

	dispatch({
		value: function(){
			t.deepEqual(Object.values(arguments), [
				'a',
				'b',
				'd=e',
				request,
			]);
		},
		args: [ 'a', 'b' ],
		query: 'd=e',
	}, request);

	dispatch({
		value: function(){
			t.deepEqual(Object.values(arguments), [
				'd=e',
				request,
			]);
		},
		args: [],
		query: 'd=e',
	}, request);

	dispatch({
		value: function(){
			t.deepEqual(Object.values(arguments), [
				'',
				request,
			]);
		},
		args: [],
		query: '',
	}, request);

	dispatch({
		value: function(){
			t.deepEqual(Object.values(arguments), [
				'a',
				'',
				request,
			]);
		},
		args: [ 'a' ],
		query: '',
	}, request);

	t.throws(function(){
		dispatch({
			value: 'not a function',
			args: [],
			query: '',
		}, request);
	}, /is not a function/);
});

test('Returns a promise', function( t ){
	t.plan(2);

	const request = {};

	dispatch({
		value: function( a, b, query, request ){
			t.deepEqual(Object.values(arguments), [
				'a',
				'b',
				'd=e',
				request,
			]);

			return 'result';
		},
		args: [ 'a', 'b' ],
		query: 'd=e',
	}, request).then(function( result ){
		t.equal(result, 'result');
	}, function( err ){
		t.fail(err);
	});
});
