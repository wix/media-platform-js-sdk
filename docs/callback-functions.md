---
layout: simple
---

_PLEASE NOTE: Callback functions are to be deprecated in v6 and removed in v7. Use promises instead._

In this SDK, some methods expect a callback function as a parameter.  
After sending the HTTP request, the method calls the callback function with the HTTP response as either the _error_ or
 _response_ parameter. These methods' description in this Wiki specify what object is passed on to them success.  
 
To pass the callback function as a parameter, you can either use an anonymous function:

```javascript
aMethod(aRequest, function(error, response) {
    if (error) {
        // TODO:  handle failure
		return;
	}
    // TODO: handle success
});
```

or declare a callback function:

```javascript
function callbackFunction(error, response) {
    if (error) {
        // TODO:  handle failure
		return;
	}
    // TODO: handle success
}

aMethod(aRequest, callbackFunction);
```
