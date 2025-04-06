const express = require('express');
const router = express.Router();
const db = require('../database');

// Get all links
router.get('/', (req, res) => {
    db.getLinks((err, links) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve links' });
        }
        res.json(links);
    });
});

// Add a new link
router.post('/', (req, res) => {
    const { title, url } = req.body;
    if (!title || !url) {
        return res.status(400).json({ error: 'Title and URL are required' });
    }
    db.addLink(title, url, (err, newLink) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add link' });
        }
        res.status(201).json(newLink);
    });
});

module.exports = router;