import HashSet from "./hashSet.js";

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = arr;
  }
}

function buildTree(arr) {
  const uniqueArray = new HashSet();

  arr.forEach((item) => {
    uniqueArray.set(item);
  });

  const sortedArray = uniqueArray.keys().sort((a, b) => a - b);

  return buildTreeRecursive(sortedArray, 0, sortedArray.length - 1);
}

// Recursive function to construct BST
function buildTreeRecursive(arr, start, end) {
  if (start > end) {
    return null;
  }

  const middle = start + Math.floor((end - start) / 2);

  const root = new Node(arr[middle]);
  root.left = buildTreeRecursive(arr, start, middle - 1);
  root.right = buildTreeRecursive(arr, middle + 1, end);

  return root;
}

// Print the Tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }

  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }

  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const root = buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const tree = new Tree(root);
prettyPrint(tree.root)
