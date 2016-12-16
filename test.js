'use strict';

const test = require('tape');
const dispatch = require('./');
const values = require('object.values');

if (!Object.values)
    values.shim();

var slice = Array.prototype.slice;

const data = {firstKey: 1, secondKey: 2};

test(function( t ){
	t.plan(9);

	const request = {};

	dispatch({
		value: function( ctx ){
			t.deepEqual(ctx, data);
			t.deepEqual(Object.values(slice.call(arguments ,1)), [
				'a',
				'b',
				'd=e',
				request,
			]);
		},
		args: [ 'a', 'b' ],
		query: 'd=e',
	}, data, request);

	dispatch({
		value: function( ctx ){
			t.deepEqual(ctx, data);
			t.deepEqual(Object.values(slice.call(arguments ,1)), [
				'd=e',
				request,
			]);
		},
		args: [],
		query: 'd=e',
	}, data, request);

	dispatch({
		value: function( ctx ){
			t.deepEqual(ctx, data);
			t.deepEqual(Object.values(slice.call(arguments ,1)), [
				'',
				request,
			]);
		},
		args: [],
		query: '',
	}, data, request);

	dispatch({
		value: function( ctx ){
			t.deepEqual(ctx, data);
			t.deepEqual(Object.values(slice.call(arguments ,1)), [
				'a',
				'',
				request,
			]);
		},
		args: [ 'a' ],
		query: '',
	}, data, request);

	t.throws(function(){
		dispatch({
			value: 'not a function',
			args: [],
			query: '',
		}, request);
	}, /Route\'s match value must be a function/);
});

test('Support callbacks', function( t ){
	t.plan(4);

	const request = {};

	dispatch({
		value: function( ctx, a, b, query, request ){
			t.deepEqual(ctx, data);
			t.deepEqual(Object.values(slice.call(arguments ,1)), [
				'a',
				'b',
				'd=e',
				request,
			]);

			return 'result';
		},
		args: [ 'a', 'b' ],
		query: 'd=e',
	}, data, request, function( err, result ){
		t.notOk(err);
		t.equal(result, 'result');
	});
});
