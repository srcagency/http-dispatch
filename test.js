'use strict';

const test = require('tape');
const dispatch = require('./');
const values = require('object.values');

if (!Object.values)
	values.shim();

var slice = Array.prototype.slice;

const data = {firstKey: 1, secondKey: 2};
const request = {};

test('handles context, arguments and query', function(t) {
	t.plan(2);

	dispatch({
		value: function(ctx) {
			t.deepEqual(ctx, data, 'context received');
			t.deepEqual(Object.values(slice.call(arguments ,1)), [
				'a',
				'b',
				'd=e',
				request
			], 'arguments and query received');
		},
		args: [ 'a', 'b' ],
		query: 'd=e'
	}, data, request);
});

test('handles empty arguments array', function(t) {
	t.plan(2);

	dispatch({
		value: function(ctx) {
			t.deepEqual(ctx, data, 'context received');
			t.deepEqual(Object.values(slice.call(arguments ,1)), [
				'd=e',
				request
			], 'query received');
		},
		args: [],
		query: 'd=e'
	}, data, request);
});

test('handles empty query', function(t) {
	t.plan(2);

	dispatch({
		value: function(ctx) {
			t.deepEqual(ctx, data, 'context received');
			t.deepEqual(Object.values(slice.call(arguments ,1)), [
				'a',
				'',
				request
			], 'arguments and empty query received');
		},
		args: [ 'a' ],
		query: ''
	}, data, request);
});

test('handles empty arguments array and empty query', function(t) {
	t.plan(2);

	dispatch({
		value: function(ctx) {
			t.deepEqual(ctx, data, 'context received');
			t.deepEqual(Object.values(slice.call(arguments ,1)), [
				'',
				request
			], 'empty arguments and empty query received');
		},
		args: [],
		query: ''
	}, data, request);
});

test('throws error non function match value', function(t) {
	t.plan(1);

	t.throws(function(){
		dispatch({
			value: 'not a function',
			args: [],
			query: ''
		}, request);
	}, /Route's match value must be a function/, 'error thrown');
});

test('dispatches response', function(t) {
	t.plan(2);

	const request = {};

	dispatch({
		value: function() {
			return 'result';
		},
		args: [ 'a', 'b' ],
		query: 'd=e'
	}, data, request, function( err, result ){
		t.notOk(err, 'no error returned');
		t.equal(result, 'result', 'response dispatched');
	});
});
