/**
 * Application is a simple RSS reader which shows the feeds at the website http://127.0.0.1:5500/.
 * If the user wants to see and handle RSS in the console as well, they can use the commands which are displayed in the console.
 * When the user is sorting data on the website or the console, the changes is reflected for all rss out-formats.
 * index.js starts the application by importing the js modules and executing their start function.
 * 
 * @author Johannes Seldevall
 * @version 2021-05-10
 */
const server = require("./js/server");
const rss = require("./js/rss")
const controller = require("./js/controller")
"use strict";

// start application
async function main() {
    console.log("Starting program on http://127.0.0.1:5500/")

    await rss.main(); // ensure the rss feeds are fetched before we start the application
    server.main();
    controller.main();
}

main();