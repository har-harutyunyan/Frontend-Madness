/* Pipe takes any number of pure functions and returns a new function.
When that new function is called with a value, it passes the value
through each function from left to right. The result of fn[i] becomes
the input of fn[i+1], and the final result is returned.
The main idea is a function superposition in math.
*/

const pipe = (...fns) => {
    return (arg) => {
      let result = arg
      for (const fn of fns) {
        result = fn(result)
      }
      return result
    }
}
  

const add7 = a => a + 7;
const modulo5 = a => a % 5;
const sub4 = a => a - 4

const func = pipe(add7, add7, modulo5, sub4)

console.log(func(8));
  