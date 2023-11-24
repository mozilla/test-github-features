#!/usr/bin/env node

const de_layyy = parseInt(process.env.CI_DELAY || 10_000, 10);
const shouldFail = Boolean(process.env.CI_FAIL || '');

console.log('config', {delay: de_layyy, shouldFail, raw: { delay: process.env.CI_DELAY, shouldFail: process.env.CI_FAIL}});

await new Promise((resolve, reject) => {
    console.log(`Running build... for ${de_layyy / 1000} seconds`);
    setTimeout(() => {
        if (shouldFail) {
            return reject('failing.... booo');
        }
        resolve(true);
    }, de_layyy);
});

console.log("Built!");