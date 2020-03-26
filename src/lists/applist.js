const fs = require('fs');

// Gunakan promises untuk async proses
const { promises } = fs;

fs.readdir('.', { encoding: 'utf-8', withFileTypes: true }, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        console.log(files);
    }
});

promises
    .readdir(process.cwd(), { encoding: 'utf-8', withFileTypes: true })
    .then(values => {
        console.log(values);
    })
    .catch(err => {
        console.log(err);
    });
