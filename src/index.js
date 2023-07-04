const Node = require('./Node')

class Tree {
    constructor (array) {
        const sortedArray = [...new Set(array)].sort((a,b) => a - b);
        this.root = this.buildTree(sortedArray);
       
    }

    buildTree (array) {
        if(array.length === 0) return null;
        let mid = Math.floor(array.length / 2);
        let root = Node(array[mid]);
        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid+1));
        return root
    }

    insert (value, current = this.root) {
        if (current === null) return Node(value);
        if (current.value === value) return;
        if (current.value < value) {
            current.right = this.insert(value, current.right) 
        } else {
            current.left = this.insert(value, current.left) 
        }
        return current;
    }

    delete (value, current = this.root) {
      if(current === null) return null;
      if (current.value === value) return this.#removeNode(current);
      if (current.value > value) {
        current.left = this.delete(value, current.left);
      } else if (current.value < value) {
        current.right = this.delete(value, current.right)
      }
      return current;
    }

    #removeNode (current) {
      if (current.left && current.right) {
        const successorNode = this.#leftNode(current.right);
        current.value = successorNode.value;
        current.right = this.delete(successorNode.value, current.right);
        return current;
      } else {
        const replacementNode = current.right || current.left;
        current = null;
        return replacementNode;
      }
    }

    #leftNode (current) {
      while(current.left) {
        current = current.left;
      }
      return current;
    }

    find (value, current = this.root) {
      if (current === null) return null;
      // if (current.value === value) return current;
      if (current.value > value) {
        return this.find(value, current.left);
      } else if (current.value < value) {
        return this.find(value, current.right)
      }
      return current;
    }

    // Level Orders require the use of shift() and push() methods to use the "queue" call method!
    levelOrder (callbackFn) {
      let current = this.root;
      let queue = [current];
      let showArray = [];
      console.log(queue);
      while (queue.length !== 0) {
        current = queue.shift();
        showArray.push(current.value);
        if (current.left !== null) queue.push(current.left);
        if (current.right !== null) queue.push(current.right);
      }
      return showArray;
    }

    inorder(callbackFn, current = this.root, result = []) {
      if (current === null) return;
      this.inorder(callbackFn, current.left, result);
      result.push(current.value);
      this.inorder(callbackFn, current.right, result)
      return result;
    }

    postorder(callbackFn, current = this.root, result = []) {
      if (current === null) return;
      this.postorder(callbackFn, current.left, result);
      this.postorder(callbackFn, current.right, result)
      result.push(current.value);
      return result;
    }

    preorder (callbackFn, current = this.root, result = []) {  
      if (current === null) return;
      result.push(current.value);
      this.preorder(callbackFn, current.left, result);
      this.preorder(callbackFn, current.right, result)
      return result;
    }

    height (current = this.root) {
      if (current === null) return 0;
      // if (current.value === value) return leftHeight;
      // if (current.value > value) {
      //   return this.height(value, current.left);
      // } else if (current.value < value) {
      //   return this.height(value, current.right)
      // }
      let leftHeight = this.height(current.left)
      let rightHeight = this.height(current.right)
      const maxHeight = Math.max(leftHeight, rightHeight) + 1;
      return maxHeight;
    }

    depth (value) {
      let current = this.root;
      let count = 0;
      if (current === null) return 0;

      while (current.value !== value) {
        count++;
        if (current.value > value) {
          current = current.left;

        } else if (current.value < value) {
          current = current.right;

        }
      }
      return count;
    }

    isBalanced (current = this.root) {
      let leftHeight = this.height(current.left);
      let rightHeight = this.height(current.right);
      if(Math.abs(leftHeight - rightHeight) >= 2) return false;
      else return true;
    }

    rebalance (current = this.root) {
      if (this.isBalanced()) return 'This binary tree is already balanced';
      else {
        var newArray = this.inorder(current);
      }
      return this.root = this.buildTree(newArray);
    }

    prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      };
}

let arrayForTree = [5, 4, 1, 3, 2, 5, 6];

const tree = new Tree(arrayForTree);
tree.insert(7);
tree.insert(10);
tree.insert(25);
tree.insert(8);
tree.prettyPrint();
tree.find(2);
console.log(tree.levelOrder());
console.log(tree.inorder());
console.log(tree.postorder())
console.log(tree.preorder());
console.log(tree.height())
console.log(tree.depth(25))
console.log(tree.isBalanced())
console.log(tree.rebalance())
tree.prettyPrint();