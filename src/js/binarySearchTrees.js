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

function insert(root, value) {
  if (root === null) {
    return new Node(value);
  }

  if (value === root.data) {
    return root;
  }

  if (value < root.data) {
    root.left = insert(root.left, value);
  } else if (value > root.data) {
    root.right = insert(root.right, value);
  }

  return root;
}

function deleteItem(root, value) {
  if (root === null) {
    return root;
  }

  if (value < root.data) {
    root.left = deleteItem(root.left, value);
  } else if (value > root.data) {
    root.right = deleteItem(root.right, value);
  } else {
    if (root.left === null) {
      return root.right;
    }

    if (root.right === null) {
      return root.left;
    }

    let parent = root;
    let successorParent = root.right;

    while (successorParent.left !== null) {
      parent = successorParent;
      successorParent = successorParent.left;
    }

    root.data = successorParent.data;

    if (parent.left === successorParent) {
      parent.left = successorParent.right;
    } else {
      parent.right = successorParent.right;
    }
  }

  return root;
}

function find(root, value) {
  if (root !== null) {
    if (value === root.data) {
      return root;
    }

    if (value < root.data) {
      return find(root.left, value);
    } else if (value > root.data) {
      return find(root.right, value);
    }
  }

  return null;
}

function levelOrder(root, callback) {
  if (typeof callback !== "function") {
    throw new Error("A callback is required");
  }

  function traverse(queue) {
    if (queue.length === 0) {
      return;
    }

    const currentNode = queue.shift();

    callback(currentNode);

    if (currentNode.left !== null) {
      queue.push(currentNode.left);
    }

    if (currentNode.right !== null) {
      queue.push(currentNode.right);
    }

    traverse(queue);
  }

  if (root !== null) {
    traverse([root]);
  }
}

function preOrder(root, callback) {
  if (typeof callback !== "function") {
    throw new Error("A callback is required");
  }

  if (root === null) {
    return;
  }

  callback(root);
  preOrder(root.left, callback);
  preOrder(root.right, callback);
}

function inOrder(root, callback) {
  if (typeof callback !== "function") {
    throw new Error("A callback is required");
  }

  if (root === null) {
    return;
  }

  inOrder(root.left, callback);
  callback(root);
  inOrder(root.right, callback);
}

function postOrder(root, callback) {
  if (typeof callback !== "function") {
    throw new Error("A callback is required");
  }

  if (root === null) {
    return;
  }

  postOrder(root.left, callback);
  postOrder(root.right, callback);
  callback(root.data);
}

function height(node) {
  if (node === null) {
    return -1;
  }

  const leftHeight = height(node.left);
  const rightHeight = height(node.right);

  return 1 + Math.max(leftHeight, rightHeight);
}

function heightNode(root, value) {
  const node = find(root, value);

  if (node === null) {
    return node;
  }

  return height(node);
}

function depth(root, value) {
  if (root === null) {
    return null;
  }

  if (value === root.data) {
    return 0;
  }

  const leftDepth = depth(root.left, value);

  if (leftDepth !== null) {
    return leftDepth + 1;
  }

  const rightDepth = depth(root.right, value);

  if (rightDepth !== null) {
    return rightDepth + 1;
  }

  return null;
}

function isBalance(root) {
  if (root === null) {
    return true;
  }

  const leftHeight = height(root.left);
  const rightHeight = height(root.right);

  if (Math.abs(leftHeight - rightHeight) > 1) {
    return false;
  }

  return isBalance(root.left) && isBalance(root.right);
}

function rebalance(root) {
  if (root === null) {
    return true;
  }

  const valueNodes = [];

  preOrder(root, (node) => {
    valueNodes.push(node.data);
  });

  const newRoot = buildTree(valueNodes);
  const tree = new Tree(newRoot);
  return tree.root;
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
insert(tree.root, 30);
insert(tree.root, 20);
insert(tree.root, 40);
// deleteItem(tree.root, 1);
// deleteItem(tree.root, 7);
// console.log(find(tree.root, 3));
prettyPrint(tree.root);
// levelOrder(tree.root, (node) => {
//   console.log(node);
// });

// preOrder(tree.root, (node) => {
//   console.log(node.data);
// });

// inOrder(tree.root, (node) => {
//   console.log(node);
// });

// postOrder(tree.root, (node) => {
//   console.log(node);
// });

// console.log(heightNode(tree.root, 4));
// console.log(depth(tree.root, 50));

// console.log(isBalance(tree.root));

tree.root = rebalance(tree.root);
prettyPrint(tree.root);
