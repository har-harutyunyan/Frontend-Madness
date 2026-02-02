/* !0 = 1,!1 = 0,!n = (n−1)(!(n−1) + !(n−2)) for n ≥ 2
So subfactorial is “how many ways to completely scramble n items without leaving anything in its original place.”

A memoize function is a higher‑order function that:
Takes a pure (deterministic) function fn

Returns a new function that:

1. On first call with some arguments: computes fn(args), stores result in a cache
2. On later calls with the same arguments: returns the result from cache instead of recomputing
*/


function subfactorial(n) {
    if (n === 0) return 1;
    if (n === 1) return 0;
  
    let prev2 = 1; // !0
    let prev1 = 0; // !1
  
    for (let k = 2; k <= n; k++) {
      const current = (k - 1) * (prev1 + prev2);
      prev2 = prev1;
      prev1 = current;
    }
  
    return prev1;
}  


function memoize(fn) {
    const cache = {};
    return (...args) => {
      const key = JSON.stringify(args);  // serialize arguments for lookup
      if (!(key in cache)) {
        cache[key] = fn(...args);
      }
      return cache[key];
    };
}

const sub = memoize(subfactorial);
console.log(sub(7));
console.log(sub(7));