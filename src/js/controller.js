/**
 * controller.js - a class that handles the users interaction with the user and the console
 */

// readline - for input by the user
const readline = require('readline');
const rss = require("./rss");
"use strict";

/**
 * @returns prints a welcome message
 */
function printWelcome() {
    return (
        "\n~~~ Welcome to the RSS Reader ~~~" +
        "\nEnter a command in the console to control the rss reader, or visit the website at http://127.0.0.1:5500/" +
        "\n\n" + listCommands() +
        "\n"
    );
}

/**
 * @returns list available commands
 */
function listCommands() {
    return (
        "~~~ List Of Commands ~~~" +
        "\nHELP - show a list of commands" +
        "\nADD {url} - add rss feed with link, example: ADD https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt/" +
        "\nREMOVE {url} - remove rss feed with feed url, example: REMOVE https://www.expressen.se/" +
        "\nLIST - lists all rss feeds with links" +
        "\n\nRSS {format} - print rss data in selected format, example: RSS HTML" +
        "\n- formats: { json, text, html }" +
        "\n\nSORT {property} {boolean} - sort rss data by property and a boolean indicating if it's ascending, example: SORT TITLE TRUE" +
        "\n- properties: { title, date }" +
        "\n- booleans: { true, false }"
    );
}

/**
 * Create interface for input by user in the console
 */
const rl = readline.createInterface({
    input: process.stdin
});

/**
 * Function asks for input by the user, until the program is exited or the user writes "exit"
 */
function handleUserInput() {
    rl.question("", (input) => {
        let command = input.toLowerCase().split(' '); // lower-case command, split the words in an array

        try {
            switch (command[0]) { // control the first word in the command
                case "help":
                    console.log(listCommands());
                    break;
                case "add":
                    if (command.length != 2) {
                        console.log("You must enter two words for add, for example: \"ADD https://rss.aftonbladet.se/rss2/small/pages/sections/senastenytt/\"");
                        break;
                    } // control amound commands
                    rss.rssList.addFeed(command[1]);
                    break;
                case "remove":
                    if (command.length != 2) {
                        console.log("You must enter two words for remove, for example: \"REMOVE https://www.expressen.se/\"");
                        break;
                    } // control amound commands
                    console.log(rss.rssList.removeFeed(command[1]));
                    break;
                case "list":
                    rss.rssList.listFeeds();
                    break;
                case "rss":
                    if (command.length != 2) {
                        console.log("You must enter two words for rss, for example: \"RSS HTML\"");
                        break;
                    } // control amound commands
                    rss.rssList.print(command[1]);
                    break;
                case "sort":
                    if (command.length != 3) {
                        console.log("You must enter three words for sorting, for example: \"SORT TITLE TRUE\"");
                        break;
                    } // control amound commands
                    if (command[1] === "date") command[1] = "isoDate"; // date to isoDate
                    rss.rssList.sortData(command[1], command[2]);
                    break;
                case "exit":
                    rl.close();
                    console.log("Closing console controller... website will still run");
                    return; // exit from the console and let browser continue
                default:
                    console.log("Command \"" + input + "\" not found. Type \"help\" for a list of commands."); // unknown command, inform the user
            }
        } catch (exception) {
            console.log(exception);
        }

        handleUserInput(); // run function again
    });
}

/**
 * Print welcome message for user, and ask for input with commands.
 */
function main() {
    console.log(printWelcome());
    handleUserInput();
}

module.exports = {
    main: main,
}