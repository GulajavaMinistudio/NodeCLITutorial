#!/usr/bin/env node
// Perlu Hash bang karena di registrasikan di package json /bin
const fs = require('fs');

// Gunakan promises untuk async proses
const { promises } = fs;

// fs.readdir('.', { encoding: 'utf-8', withFileTypes: true }, (err, files) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(files);
//     }
// });

// Membaca isi folder atau tidak
// Menyebabkan promise race
function cekFolderPromiseRace(filenamesArr) {
    const panjangArr = filenamesArr.length;

    for (let i = 0; i < panjangArr; i += 1) {
        const filename = filenamesArr[i];

        // filename berbentuk Object
        console.log(filename);
        // gunakan promise method
        promises
            .lstat(filename.name)
            .then(result => {
                console.log(`nama ${filename.name}`, result.isFile());
            })
            .catch(err => {
                console.log(err);
            });
    }
}

function cekFolderPromiseAllSettled(filenamesArr) {
    const panjangArr = filenamesArr.length;
    const arrPromiseAll = [];

    for (let i = 0; i < panjangArr; i += 1) {
        const filename = filenamesArr[i];

        // gunakan promise method
        const proms = promises.lstat(filename.name);
        arrPromiseAll.push(proms);
    }

    Promise.allSettled(arrPromiseAll)
        .then(arresult => {
            // cek hasil promise
            const folderFileStatus = [];

            for (let i = 0; i < arresult.length; i += 1) {
                const resultdata = arresult[i];
                if (resultdata.status === 'fulfilled') {
                    const valueResultStat = resultdata.value;
                    const dataFile = {
                        file: `${filenamesArr[i].name}`,
                        isFiles: `${valueResultStat.isFile()}`,
                    };

                    folderFileStatus.push(dataFile);
                }
            }

            console.log(JSON.stringify(folderFileStatus));
        })
        .catch(err => {
            console.log(err);
        });
}

// process.cwd untuk menampilkan kondisi directory sekarang
// atau cwd = current working directory
// Eksekusi dengan chmod +x index.js
function readDirektoriFolder() {
    promises
        .readdir(process.cwd(), { encoding: 'utf-8', withFileTypes: true })
        .then(valuesFilename => {
            // cekFolderPromiseRace(valuesFilename);
            cekFolderPromiseAllSettled(valuesFilename);
        })
        .catch(err => {
            console.log(err);
        });
}

readDirektoriFolder();
