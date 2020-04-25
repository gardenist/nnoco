const EventEmitter = require('events');

let queue = [];

setInterval(() => {
    if(queue.length > 0) {
        console.log(queue.shift());
    }
}, 1000);

let eventEmitter = new EventEmitter();
eventEmitter.on('save', function(id) {
    queue.push(id);
})

eventEmitter.emit('save', 1);
eventEmitter.emit('save', 2);
eventEmitter.emit('save', 3);
eventEmitter.emit('save', 4);
eventEmitter.emit('save', 5);