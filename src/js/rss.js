/**
 * rss.js - handles rss feeds
 */

// import rss list class
const RssList = require('./models/RssList');
let rssList = new RssList.RssList("default"); // initiate default feed list
"use strict";

/**
 * initiate rssList incase object doesn't have any data.
 */
async function initialize() {
    console.log("Initializing RssList object with default feeds");
    await rssList.addFeed("http://expressen.se/rss/nyheter");
    await rssList.addFeed("http://www.svd.se/?service=rss");
    await rssList.addFeed("http://www.svt.se/nyheter/rss.xml");
}

async function main() {
    if (rssList.getSize() === 0) {
        await initialize();
    } // initiate if empty, which it always is. The pages doesn't store in any file as of now.
}

// export functions from the module
module.exports = {
    main: main,
    rssList: rssList,
}