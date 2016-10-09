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

	}

	detachRoot() {
		var detachedRoot = this.root;
		this.root = null;
		this.parentNodes.shift();
		return detachedRoot;
	}

	restoreRootFromLastInsertedNode(detached) {

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

	}
}

module.exports = MaxHeap;
