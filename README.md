# http-dispatch

Pass this function the result of a http routing lookup (of the format `{
value, args, query }`) and have the `value` be a function, then it will call
that function in a manner of `fn(...args, query, req)`.

## Examples

```js
http.createServer(function( request, response ){
	const match = route(request);
	// -> { value: { fn }, args, query }

	if (!match)
		return;	// probably send 404

	const result = dispatch(match, request);

	// probably send the result as a response
})
	.listen(8000);
```
