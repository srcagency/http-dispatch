'use strict';

const test = require('tape');
const dispatch = require('./');
const values = require('object.values');

if (!Object.values)
    values.shim();

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
	}, /Route\'s match value must be a function/);
});

test('Support callbacks', function( t ){
	t.plan(3);

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
	}, request, function( err, result ){
		t.notOk(err);
		t.equal(result, 'result');
	});
});
