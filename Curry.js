/* Haskell’s curry and function types
In Haskell, currying is built into the type system:

A type like a -> b -> c means: take an a, return a function b -> c.
Function arrow associates to the right, so a -> b -> c is really a -> (b -> c).​

Application associates to the left: f x y means (f x) y.​


The Prelude defines:

curry   :: ((a, b) -> c) -> a -> b -> c
curry f x y = f (x, y)

uncurry :: (a -> b -> c) -> (a, b) -> c
uncurry f (x, y) = f x y


The conceptual Haskell curry is:

curry(f)=λx.(λy.f(x,y))


Type:

curry:((X×Y)→Z)→(X→(Y→Z))


Lambda Calculus:

Pure lambda calculus only has single‑argument functions.
Currying is the bridge from multi‑argument thinking to this one‑argument core.​

For a 2‑argument function f(x,y):
Uncurried style:  f : X × Y → Z. (Cartesian Product)
Curried style:    f : X → Y → Z,

They are isomorphic: same information, different shape.

Written as - λx.λy.f(x,y)
Evaluation:

f curried12 = (λx.λy.f(x,y))12 → (λy.f(1,y))2 → f(1,2).​


Your JS curry is essentially emulating this lambda‑calculus viewpoint in a language
where functions can take many arguments at once:
*/


function curry(fn) {
    const arity = fn.length;
  
    function curried(...args) {
      if (args.length >= arity) {
        // we have enough args → call original
        return fn(...args);
      }
      // not enough args → return a new function that collects more
      return (...nextArgs) => curried(...args, ...nextArgs);
    }
  
    return curried;
  }


const add = (a, b, c) => a + b + c;
const multiply = (a, b, c, d) => a * b * c * d;
const subtract = (a, b, c) => a - b - c;
const division = (a, b, c, d) => a / b / c / d;
  
const sumFunc = curry(add);
const prodFunc = curry(multiply);
const subFunc = curry(subtract);
const divideFunc = curry(division);

console.log("Add function test: ");
console.log(sumFunc(1)(2, 3));
console.log(sumFunc(1, 2)(3));
console.log(sumFunc(1, 2, 3));

console.log("Subtract function test: ");
console.log(subFunc(1)(2, 3)); 
console.log(subFunc(1, 2)(3));    
console.log(subFunc(1, 2, 3)); 
  
console.log("Multiply function test: ");
console.log(prodFunc(1, 2, 3, 4));  
console.log(prodFunc(1)(2, 3, 4));  
console.log(prodFunc(1, 2)(3, 4)); 
console.log(prodFunc(1, 2, 3)(4));

console.log("Division function test: ");
console.log(divideFunc(1, 2, 3, 4));  
console.log(divideFunc(1)(2, 3, 4));  
console.log(divideFunc(1, 2)(3, 4)); 
console.log(divideFunc(1, 2, 3)(4));    
  