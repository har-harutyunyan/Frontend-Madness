/* Trace is a higher-order function that:

1. Wraps a function f
2. Records every input and/or output of f
3. Stores the history in a structure (list, log, state)
4. Returns a new function that behaves like f but tracks everything
*/

function trace(fn) {
    function wrapped(...args) {
      const output = fn(...args);
      wrapped.history.push({ args, output });
      return output;
    }
  
    wrapped.history = [];
    return wrapped;
}


function foo(a, b) {
   return a % b;
}
  
const tracedFunc = trace(foo);
  
console.log(tracedFunc(5, 2));    
console.log(tracedFunc(7, 5)); 
  
console.log(tracedFunc.history);