/**
 * RssList.js - a class that stores the RSS feeds in a list.
 * Handles the logic by printing out an RSS list, or sorting rss list.
 */

const RssFeed = require("./RssFeed");
let rssFeed; // variable for rss feed
"use strict";

class RssList {
    list = []; // contains rss feeds

    constructor(name) {
        this.name = name; // name on the list
    }

    /**
     * Add a feed to the list.
     * If RssFeed isn't fetched, the url is incorrect or is down. Which means it won't be added to the list.
     * @param {*} url 
     */
    async addFeed(url) {
        try {
            rssFeed = new RssFeed.RssFeed();
            let feed = await rssFeed.fetch(url); // wait until the rss feeds have been fetched
            this.list.push(feed); // store objects in the list
            this.list.sort((a, b) => (a.title > b.title) ? 1 : -1); // sort the rss feeds by name every time a feed is added

            console.log("Added feed [" + feed.title + "] to the rss list [" + this.name + "]");
        } catch (exception) {
            console.log("Couldn't add feed, exception while attempting to fetch rss from " + url + ", exception: " + exception);
        }
    }

    /**
     * Remove a feed from the list
     * @param {*} url 
     */
    removeFeed(url) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].link === url) {
                this.list.splice(i--, 1);
                return "Found and removed feed " + url;
            }
        }

        return "Couldn't find " + url + " in the list, nothing were removed";
    }

    /**
     * List all feeds available
     */
    listFeeds() {
        this.list.forEach(function (entry) {
            console.log("title: " + entry.title + "\nlink: " + entry.link + "\n");
        });
    }

    /**
     * Fetch size on the list
     * @returns size on the list
     */
    getSize() {
        return this.list.length;
    }

    /**
     * Sort all items in the rss feed by property in json object
     */
    sortData(property, ascending) {
        // if we get data from the console, convert it to a boolean
        if (ascending === "true") ascending = true;
        else if (ascending === "false") ascending = false;

        if (typeof ascending != "boolean") throw "Error at RssList.sortData(): {boolean} was " + ascending + ", must be true or false.";
        if (this.list[0].items[0][property] === undefined) throw "Error at RssList.sortData(): {property} was " + property + ", property doesn't exist."; // can technically be used with properties as content, guid, and so on. But only title and link works fine.

        console.log("RssList.sortData(): Sorting rss feeds by the property: " + property + ", ascending: " + ascending);

        // Loop through the rss feed items
        this.list.forEach(function (entry) {
            entry.items.sort(sortProperty(property, ascending));
        });

        // Control the properties; t.ex. date or title and sort ascending or descending.
        // Needs to be in sortData to not become undefined.
        function sortProperty(property, ascending) {
            return (a, b) => {
                if (ascending) {
                    if (a[property] > b[property]) return 1;
                    else if (a[property] < b[property]) return -1;
                } else if (!ascending) {
                    if (a[property] > b[property]) return -1;
                    else if (a[property] < b[property]) return 1;
                }

                return 0;
            }
        }
    }

    /**
     * Return all Json data
     * @returns json data
     */
    getJson() {
        return this.list;
    }

    /**
     * Returne rss list in text format
     * @returns text data
     */
    getText() {
        return JSON.stringify(this.list, '\n', " ")
    }

    /**
     * Return list but with made up html tags
     * @returns html data
     */
    getHtml() {
        let html = "";
        this.list.forEach(function (entry) {
            html += ("<rss-feed>" + entry.title.toUpperCase() + "</rss-feed>\n\n");

            entry.items.forEach(function (item) {
                html += ("<title>" + item.title + "</title>\n");
                html += ("<content>" + (item.contentSnippet) + "</content>\n");
                html += ("<date>" + item.pubDate + "<date>\n");
                html += ("<link>" + item.link + "<link>\n\n");
            })
        });
        return html;
    }

    /**
     * Print all data in the console as the user is asking for
     * @param {data-format} format 
     */
    print(format) {
        switch (format) {
            case "json":
                this.getJson().forEach(function (entry) {
                    console.log(entry);
                });
                break;
            case "text":
                console.log(this.getText());
                break;
            case "html":
                console.log(this.getHtml());
                break;
            default:
                throw "Error at RssList.print(): {format} was " + format + ", must be html, text or json."
        }
    }
}

// exporter class
module.exports = {
    RssList: RssList,
    getSize: this.getSize,
    sortData: this.sortData,
}