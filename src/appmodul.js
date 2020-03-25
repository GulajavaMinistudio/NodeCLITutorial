const pesanMessage = 'Halo modul node js';
module.exports.pesanMessage = pesanMessage;

// Dengan default export
// module.exports = pesanMessage;
let counterdata = 0;

function incrementCounter() {
    counterdata += 1;
}

function getCounter() {
    return counterdata;
}

module.exports = {
    incrementCounter,
    getCounter,
};
