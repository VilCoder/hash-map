import HashMap from "./hashMap.js";
// import HashSet from "./hashSet.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.length());
console.log(test.capacity);
console.log(test.entries());

test.set("bear", "brown");
console.log(test.length());
console.log(test.capacity);

console.log(test.entries());
console.log(test.has("cherry"));
