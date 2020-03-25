// const appmodul = require('./appmodul');

// default exports import
// const pesan = require('./appmodul');

// console.log(require);
// console.log(module);
// console.log('nama file', __filename);
// require('./appmodul');
// console.log('cache require', require.cache);

// console.log('Hello world node js nodemon');
// console.log('Isi pesan', pesan);
// console.log(pesan.pesanMessage);

const counterObject = require('./appmodul.js');

console.log(counterObject);
console.log(counterObject.getCounter());
counterObject.incrementCounter();
counterObject.incrementCounter();
counterObject.incrementCounter();
console.log(counterObject.getCounter());

const newCounterObject = require('./appmodul');

console.log('counter instance baru', newCounterObject.getCounter());
