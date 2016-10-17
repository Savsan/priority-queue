const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if(!maxSize){
			this.maxSize = 30;
		}else{
			this.maxSize = maxSize;
		}
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		var maxSize = this.maxSize;
		if(this.size() < this.maxSize){
			this.heap.push(data, priority);
		}else{
			throw "Can't add element to queue. The queue has max size (" + maxSize + " elements)";
		}
	}

	shift() {
		if(!this.isEmpty()){
			return this.heap.pop();
		}else {
			throw "Shift operation wasn't done. The queue is empty.";
		}
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
