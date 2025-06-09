var MedianFinder = function() {
    this.left = new MaxPriorityQueue();
    this.right = new MinPriorityQueue();
};

MedianFinder.prototype.addNum = function(num) {
    if (this.left.size() === this.right.size()) {
        this.right.enqueue(num);
        this.left.enqueue(this.right.dequeue());
    } else {
        this.left.enqueue(num);
        this.right.enqueue(this.left.dequeue());
    }
};

MedianFinder.prototype.findMedian = function() {
    if (this.left.size() > this.right.size()) {
        return this.left.front();
    }
    return (this.left.front() + this.right.front()) / 2;
};
