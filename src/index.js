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

/**
 * Latihan menggunakan Debugger di Node JS
 * Jalankan node inspect app.js , maka akan masuk ke debugger
 * ketik c untuk continue proses sampai akhir
 * ketik n untuk jalankan node sampai baris berikut
 * ketik s untuk masuk ke dalam fungsi dari baris yang di debug
 * ketik o untuk keluar dari eksekusi fungsi setelah menekan s
 *
 * Ketika masuk mode debugger, bisa mengetikkan repl untuk ke mode
 * interaktif dan mulai inspect parameter yang ada
 */

/**
 * Jalankan node --inspect index.js
 * Menjalankan debugger interaktif dengan bantuan Chrome browser
 * Buka Chrome dan akses chrome://inspect
 * Atau bisa juga dengan jalankan node --inspect-brk index.js
 * Untuk menjalankan debugger di Chrome dan memasang break point di dalamnya
 */
