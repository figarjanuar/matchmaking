class Node{
  constructor(data){
    this.next = null;
    this.previous = null;
    this.data = data;
  }
}

function createPlayerNode(id, mmr){
  return new Node({'id': id, 'mmr': mmr});
}

function NotANodeError(message,extra){
  Error.captureStackTrace(this, this.constructor);
  this.message = message;
  this.constructor.name;
  this.extra = extra;
}

class Queue{
  /*
    This is essentially a linked list implementation of a queue.
  */
  constructor(){
    this.head = null;
    this.tail = null;
  }

  enqueue(node){

    if (!node || !node.hasOwnProperty('data')){
      throw(new NotANodeError("No null/undefined nodes are allowed. \
        Must have data property."));
    }

    if(!this.tail && !this.head){
       // Empty queue
       this.head = node;
    }

    else if(!this.tail && this.head){
       // Only 1 enqueued 
       node.next = this.head;
       this.head.previous = node
       this.tail = node;
       
    }

    else{
       // More than 1 enqueued
       this.tail.previous = node
       node.next = this.tail;
       this.tail = node;
    }
  };

  dequeue(){
    /* Pop the head from the queue by changing head, previous, and
       next connections. Rely on GC to clean up unreferenced objects.
    */
    if (this.head){
      var node = this.head;

      if (this.head.previous){
        this.head.previous.next = null;
        this.head = this.head.previous;
      }
      else{
        this.head = null;
      }
      return node;
    }

  };

}


function genKeyLookup() {
  // Generate an array to lookup hard coded keys of bin ranges.
  // For example, index 20 should have the value: '0-20', and so on.
  // TODO: Generate these bins based off of MMR freq data
  var key_array = [];
  for (i = 0; i < 100; i++) {
    var lowerBound = Math.floor(i / 20) * 20;
    var upperBound = lowerBound + 20;
    key_array.push(`${lowerBound + 1}-${upperBound}`);
  }
  return key_array;
}

function binRanges() {
  // Create the bins (queues) for hard coded example MMR bin ranges.
  // TODO: Create these bins based off of MMR frequency data
  var bin1 = new Queue();
  var bin2 = new Queue();
  var bin3 = new Queue();
  var bin4 = new Queue();
  var bin5 = new Queue();

  return {
    '1-20': bin1,
    '21-40': bin2,
    '41-60': bin3,
    '61-80': bin4,
    '81-100': bin5,
  };
}

module.exports.Queue = Queue
module.exports.Node = Node
module.exports.NotANodeError = NotANodeError
module.exports.binRanges = binRanges
module.exports.genKeyLookup = genKeyLookup
module.exports.createPlayerNode = createPlayerNode
