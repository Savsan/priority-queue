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
		this.heap.push(data, priority);
	}

	shift() {

	}

	size() {

	}

	isEmpty() {

	}
}

module.exports = PriorityQueue;
