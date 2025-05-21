import HashSet from "./hashSet.js";

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = null;
  }

  buildTree(arr = this.arr) {
    const uniqueArray = new HashSet();

    arr.forEach((item) => {
      uniqueArray.set(item);
    });

    const sortedArray = uniqueArray.keys().sort((a, b) => a - b);

    function traverse(array, start, end) {
      if (start > end) {
        return null;
      }

      const middle = start + Math.floor((end - start) / 2);

      const root = new Node(array[middle]);
      root.left = traverse(array, start, middle - 1);
      root.right = traverse(array, middle + 1, end);

      return root;
    }

    this.root = traverse(sortedArray, 0, sortedArray.length - 1);
  }

  insertItem(value, root = this.root) {
    if (root === null) {
      return new Node(value);
    }

    if (value === root.data) {
      return root;
    }

    if (value < root.data) {
      root.left = this.insertItem(value, root.left);
    } else if (value > root.data) {
      root.right = this.insertItem(value, root.right);
    }

    return root;
  }

  deleteItem(value, root = this.root) {
    if (root === null) {
      return root;
    }

    if (value < root.data) {
      root.left = this.deleteItem(value, root.left);
    } else if (value > root.data) {
      root.right = this.deleteItem(value, root.right);
    } else {
      // If key is same as root's key, then this is the node to be deleted
      // Node with only one child or no child
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

      // Copy the inorder successor's content to this node
      root.data = successorParent.data;

      // Delete the inorder successor
      if (parent.left === successorParent) {
        parent.left = successorParent.right;
      } else {
        parent.right = successorParent.right;
      }
    }

    return root;
  }

  find(value, root = this.root) {
    if (root !== null) {
      if (value === root.data) {
        return root;
      }

      if (value < root.data) {
        return this.find(value, root.left);
      } else if (value > root.data) {
        return this.find(value, root.right);
      }
    }

    return null;
  }

  levelOrder(callback, root = this.root) {
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

  preOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required");
    }

    if (root === null) {
      return;
    }

    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  inOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required");
    }

    if (root === null) {
      return;
    }

    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }

  postOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      throw new Error("A callback is required");
    }

    if (root === null) {
      return;
    }

    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }

  height(node) {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  heightNode(value, root = this.root) {
    const node = this.find(value, root);

    if (node === null) {
      return node;
    }

    return this.height(node);
  }

  // Returns the depth of the node containing the given value
  depth(value, root = this.root) {
    if (root === null) {
      return null;
    }

    if (value === root.data) {
      return 0;
    }

    const leftDepth = this.depth(value, root.left);

    if (leftDepth !== null) {
      return leftDepth + 1;
    }

    const rightDepth = this.depth(value, root.right);

    if (rightDepth !== null) {
      return rightDepth + 1;
    }

    return null;
  }

  isBalanced(root = this.root) {
    if (root === null) {
      return true;
    }

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return this.isBalanced(root.left) && this.isBalanced(root.right);
  }

  rebalance(root = this.root) {
    if (root === null) {
      return true;
    }

    const valueNodes = [];

    this.preOrder((node) => {
      valueNodes.push(node.data);
    }, root);

    const newRoot = this.buildTree(valueNodes);
    const tree = new Tree(newRoot);
    return tree.root;
  }

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }

    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}
