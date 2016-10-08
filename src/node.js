class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left == null){
			this.left = node;
			this.left.parent = this;
		}else if(this.right == null){
			this.right = node;
			this.right.parent = this;
		}else{
			return;
		}
	}

	removeChild(node) {
		if(this.left == node){
			this.left.parent = null;
			this.left = null;
		}else if(this.right == node){
			this.right.parent = null;
			this.right = null;
		}else{
			throw ('Error: Passed node is not a child of this node.');
		}
	}

	remove() {
		if(this.parent == null){
			return;
		}
		this.parent.removeChild(this);
	}

	swapWithParent() {
		if(this.parent == null){
			return;
		}

		// Copy an environment of node.
		var parentParent = this.parent.parent;
		var parent = this.parent;
		var parentLeft = this.parent.left;
		var parentRight = this.parent.right;
		var thisCopy = this;
		var thisLeft = this.left;
		var thisRight = this.right;

		// Change parent property in swappedUp node and swappedDown node.
		parent.parent = thisCopy;
		thisCopy.parent = parentParent;

		// If parent of parent exist, set swappedUp node to correct place of parent.parent node.
		if(parentParent != null){
			if(parentParent.left == parent){
				parentParent.left = thisCopy;
			}else if(parentParent.right == parent){
				parentParent.right = thisCopy;
			}
		}

		// Set swappedDown node to correct left or right place of swappedUp node
		if(parentLeft == thisCopy){
			thisCopy.left = parent;
			thisCopy.right = parentRight;
			// If parent.right node exist, set feedback with swappedUp node
			if(parentRight != null){
				parentRight.parent = thisCopy;
			}
		}else if(parentRight == thisCopy){
			thisCopy.right = parent;
			thisCopy.left = parentLeft;
			// If parent.left exist, set feedback with swappedUp node
			if(parentLeft != null){
				parentLeft.parent = thisCopy;
			}
		}

		// Update left and right properties of swappedDown node
		parent.left = thisLeft;
		parent.right = thisRight;

		// If children of swappedUp node are exist, set feedback with swappedDown node.
		if(thisLeft != null){
			thisLeft.parent = parent;
		}
		if(thisRight != null){
			thisRight.parent = parent;
		}
	}
}

module.exports = Node;
