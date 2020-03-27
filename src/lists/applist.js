// #!/usr/bin/env node
// Perlu Hash bang karena di registrasikan di package json /bin
const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const path = require('path');

// lstat diubah menjadi promise
// Metode kedua #2
const lstatprom = util.promisify(fs.lstat);

// Gunakan promises untuk async proses
// Metode ketiga #3
const { promises } = fs;
const { lstat } = fs.promises;

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

// Metode dengan callback untuk pengecekan isFile dengan lstat
function cekFolderAllstatCallback(arrfilename) {
    const allStats = Array(arrfilename.length).fill(null);

    // eslint-disable-next-line no-restricted-syntax
    for (const filename of arrfilename) {
        const indexs = arrfilename.indexOf(filename);
        promises
            .lstat(filename.name)
            .then(resStats => {
                allStats[indexs] = resStats;

                const isReady = allStats.every(stats => {
                    return stats;
                });

                // Jika semua sudah tidak bernilai null lanjutkan langkah berikutnya
                if (isReady) {
                    allStats.forEach((statvalue, index) => {
                        const nameFile = arrfilename[index].name;
                        console.log(nameFile, statvalue.isFile());
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
}

function getLstatPromise(filename) {
    return new Promise((resolve, reject) => {
        fs.lstat(filename.name, (err, stats) => {
            if (err) {
                reject(err);
            } else {
                resolve(stats);
            }
        });
    });
}

function cekFolderLStatPromisied(arrfilename) {
    const allStats = Array(arrfilename.length).fill(null);

    // eslint-disable-next-line no-restricted-syntax
    for (const filename of arrfilename) {
        const indexs = arrfilename.indexOf(filename);
        lstatprom(filename.name)
            .then(resStats => {
                allStats[indexs] = resStats;

                const isReady = allStats.every(stats => {
                    return stats;
                });

                // Jika semua sudah tidak bernilai null lanjutkan langkah berikutnya
                if (isReady) {
                    allStats.forEach((statvalue, index) => {
                        const nameFile = arrfilename[index].name;
                        console.log(nameFile, statvalue.isFile());
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
}

// process.cwd untuk menampilkan kondisi directory sekarang
// atau cwd = current working directory
// Eksekusi dengan chmod +x index.js
function readDirektoriFolder() {
    promises
        .readdir(process.cwd(), { encoding: 'utf-8', withFileTypes: true })
        .then(valuesFilename => {
            // cekFolderPromiseRace(valuesFilename);
            // cekFolderAllstatCallback(valuesFilename);
            // cekFolderPromiseAllSettled(valuesFilename);
            cekFolderLStatPromisied(valuesFilename);
        })
        .catch(err => {
            console.log(err);
        });
}

// readDirektoriFolder();

// Dengan async await dan paralel eksekusi
async function readDirAsyncs() {
    let arrFileName = [];
    const arrPromiseLstat = [];
    try {
        arrFileName = await promises.readdir(process.cwd(), {
            encoding: 'utf-8',
            withFileTypes: true,
        });
        // eslint-disable-next-line no-restricted-syntax
        for (const filename of arrFileName) {
            arrPromiseLstat.push(lstat(filename.name));
        }
    } catch (err) {
        console.log(err);
    }

    if (arrPromiseLstat && arrFileName) {
        const resultLstat = await Promise.allSettled(arrPromiseLstat);
        // eslint-disable-next-line no-restricted-syntax
        for (let i = 0; i < resultLstat.length; i += 1) {
            const result = resultLstat[i];
            if (result.status === 'fulfilled') {
                const isFileNama = result.value.isFile();
                const namaFile = arrFileName[i].name;
                console.log(namaFile, isFileNama);
            }
        }
    }
}

// readDirAsyncs();

async function readDirPromiseAll() {
    const targetDir = process.argv[2] || process.cwd();

    let arrFileName = [];
    let arrPromiseLstat = [];
    let arrStatResult = [];
    try {
        arrFileName = await promises.readdir(targetDir, {
            encoding: 'utf-8',
            withFileTypes: true,
        });

        arrPromiseLstat = arrFileName.map(filename => {
            const joinPath = path.join(targetDir, filename.name);
            return lstat(joinPath);
        });

        arrStatResult = await Promise.allSettled(arrPromiseLstat);
    } catch (err) {
        console.log(err);
    }

    if (arrStatResult.length > 0) {
        arrStatResult.forEach((resultprom, index) => {
            if (resultprom.status === 'fulfilled') {
                const statsFile = resultprom.value;
                const isBentukFile = statsFile.isFile();
                const filename = arrFileName[index];

                if (isBentukFile) {
                    console.log(filename.name);
                } else {
                    console.log(chalk.green(filename.name));
                }
                // console.log(filename.name, isBentukFile);
            }
        });
    } else {
        console.log('Tidak ada folder di dalamnya');
    }
}

readDirPromiseAll();
