import Tree from "./binarySearchTrees.js";

function randomNumbers(n) {
  const numbers = [];

  for (let i = 0; i < n; i++) {
    const randomNumber = Math.floor(Math.random() * n + 1);
    numbers.push(randomNumber);
  }

  return numbers;
}

const numbers = randomNumbers(100);

const tree = new Tree(numbers);
tree.buildTree();
tree.prettyPrint();
console.log(tree.isBalanced());
tree.insertItem(2);
tree.insertItem(34);
tree.insertItem(99);
tree.insertItem(45);
tree.insertItem(44);
tree.prettyPrint();
console.log(tree.isBalanced());
tree.rebalance();
tree.prettyPrint();
console.log(tree.isBalanced());
tree.deleteItem(57);
tree.prettyPrint();
console.log(tree.find(undefined));

// tree.postOrder((node) => console.log(node.data));
