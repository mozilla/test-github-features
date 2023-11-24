#!/usr/bin/env node

const de_lay = parseInt(process.env.CI_DELAY || 3_000, 10);
const shouldFail = Boolean(process.env.CI_FAIL || '');

console.log('config', {delay: de_lay, shouldFail, raw: { delay: process.env.CI_DELAY, shouldFail: process.env.CI_FAIL}});

await new Promise((resolve, reject) => {
    console.log(`Running build... for ${de_lay / 1000} seconds`);
    setTimeout(() => {
        if (shouldFail) {
            return reject('failing.... booo');
        }
        resolve(true);
    }, de_lay);
});

console.log("Built!");