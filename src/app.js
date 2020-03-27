#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

// Gunakan promises untuk async proses
// Metode ketiga #3
const { promises } = fs;
const { lstat } = fs.promises;

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
            }
        });
    } else {
        console.log('Tidak ada folder di dalamnya');
    }
}

readDirPromiseAll();
