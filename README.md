# browser-rss-reader

The application is a simple RSS reader which shows the feeds at the website http://127.0.0.1:5500/. If the user wants to see and handle RSS in the console as well, they can use the commands which are displayed in the console. When the user is sorting data on the website or the console, the changes is reflected for all rss out-formats.

It's run with the runtime environment node.js that executes javascript code. The application is built with the framework "node express" which serves and handles the website creation. No time was spent on making the website look nice with CSS..

URL: http://127.0.0.1:5500/

## installation

1. install Node.js and npm from https://nodejs.org/en/download/
2. clone this repository with "git clone <url>"
3. when you are in the repository folder, install packages with "npm install rss-parser express ejs"
4. run the node server with "node src/index.js / nodemon src/index.js"

## structure

The applications source code is in the src map, where the maps css, html and js exists. It's in the js map the main logic exists.

Components
* index.js      - starts the application by importing the js modules and executing their start function.
* server.js     - use node express as a framework for webbapplications
* rss.js        - handles rss feeds
* controller.js - handles the users interaction with the user and the console
* RssList.js    - stores the rss feeds in a list.
* RssFeed.js    - a class for each rss feed being used