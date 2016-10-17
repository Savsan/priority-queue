const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		var node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if(this.isEmpty()){
			return;
		}

		var detachedRoot = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detachedRoot);
		this.shiftNodeDown(this.root);
		return detachedRoot.data;
	}

	detachRoot() {
		var detachedRoot = this.root;
		this.root = null;
		if(this.parentNodes.indexOf(detachedRoot) != -1){
			this.parentNodes.shift();
		}
		this.heapSize--;
		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		if(!(detached instanceof Node)){
			return;
		}

		var lastNode = this.parentNodes.pop();
		var parentNode;

		if(lastNode != undefined){

			this.root = lastNode;
			parentNode = lastNode.parent;

			if(parentNode != null){
				lastNode.remove();

				if(parentNode.left != null && parentNode.right == null && parentNode != detached){
					this.parentNodes.unshift(parentNode);
				}
			}

			if(detached.left != null){
				lastNode.appendChild(detached.left);
			}
			if(detached.right != null){
				lastNode.appendChild(detached.right);
				return;
			}

			this.parentNodes.unshift(lastNode);
		}
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		var result = this.root == null ? true : false;
		return result;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		if (this.isEmpty()) {
			this.root = node;
		} else {
			this.parentNodes[0].appendChild(node);
		}
		this.parentNodes.push(node);
		if (this.parentNodes[0].right != null) {
			this.parentNodes.shift();
		}
		this.heapSize++;
	}

	shiftNodeUp(node) {
		if(node.parent == null){
			this.root = node;
			return;
		}else if(node.parent != null && node.parent.priority < node.priority){

			var nodeIndex = this.parentNodes.indexOf(node);
			var parentIndex = this.parentNodes.indexOf(node.parent);

			if(parentIndex > -1){
				this.parentNodes[parentIndex] = node;
			}
			if(nodeIndex > -1) {
				this.parentNodes[nodeIndex] = node.parent;
			}

			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if(node == null){
			return;
		}
		var parentIndex;
		var childIndex;
		var childNodeToSwap;
		if(node.left != null){
			childNodeToSwap = node.left;
			if(node.right != null){
				if(childNodeToSwap.priority <= node.right.priority){
					childNodeToSwap = node.right;
				}
			}
			if(node.priority < childNodeToSwap.priority){
				if(this.root == node){
					this.root = childNodeToSwap;
				}

				parentIndex = this.parentNodes.indexOf(node);
				childIndex = this.parentNodes.indexOf(childNodeToSwap);

				if(parentIndex > -1){
					this.parentNodes[parentIndex] = childNodeToSwap;
				}
				if(childIndex > -1) {
					this.parentNodes[childIndex] = node;
				}

				childNodeToSwap.swapWithParent();
				this.shiftNodeDown(node);
			}
		}
	}
}

module.exports = MaxHeap;
