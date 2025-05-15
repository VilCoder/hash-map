import HashSet from "./hashSet.js";

const test = new HashSet();

test.set("apple");
test.set("banana");
test.set("carrot");
test.set("dog");
test.set("elephant");
test.set("frog");
test.set("grape");
test.set("hat");
test.set("ice cream");
test.set("jacket");
test.set("kite");
test.set("lion");

console.log(test.length())
console.log(test.keys())
console.log(test.remove("apple"))
console.log(test.keys())
console.log(test.length())
