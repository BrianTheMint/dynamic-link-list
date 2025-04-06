const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the SQLite database
const dbPath = path.resolve(__dirname, '../sqlite.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Function to create the links table if it doesn't exist
const createLinksTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS links (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            url TEXT NOT NULL
        )
    `;
    db.run(sql, (err) => {
        if (err) {
            console.error('Error creating table ' + err.message);
        }
    });
};

// Function to add a new link
const addLink = (title, url, callback) => {
    const sql = 'INSERT INTO links (title, url) VALUES (?, ?)';
    db.run(sql, [title, url], function(err) {
        if (err) {
            return callback(err);
        }
        callback(null, { id: this.lastID, title, url });
    });
};

// Function to retrieve all links
const getLinks = (callback) => {
    const sql = 'SELECT * FROM links';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return callback(err);
        }
        callback(null, rows);
    });
};

// Create the links table on startup
createLinksTable();

// Export the functions for use in other modules
module.exports = {
    addLink,
    getLinks
};