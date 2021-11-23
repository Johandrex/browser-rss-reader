/**
 * RssFeed.js - a class for each rss feed being used
 */

// npm package that parses rss
const Parser = require('rss-parser');
const parser = new Parser();
"use strict";

class RssFeed {
    constructor() {} // not used since we want async

    /**
     * Fetch data and store it in this class this.feed object.
     * If we don't succeed in fetching data, an exception is thrown and handled by RssList.
     * @param {rss feed url} url 
     * @returns 
     */
    async fetch(url) {
        try {
            this.feed = await parser.parseURL(url);
            this.items = this.feed.items; // each article in this feed
            this.link = this.feed.link;

            return this.feed;
        } catch (exception) {
            throw exception;
        }
    }
}

// export class
module.exports = {
    RssFeed: RssFeed,
}