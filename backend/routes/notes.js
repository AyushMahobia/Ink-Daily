const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

// Route1:- add new notes using:- http://localhost:5000/api/notes/addnote login required
router.post('/addnote', fetchuser, [
    body('title', "Minium length of Tilte should be 3").isLength({ min: 3 }),
    body('description', "Minium length of Description should be 5").isLength({ min: 5 })
], async (req, res) => {
    try {
        // if some error occured while writing name or email or password than show this👇
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, tags } = req.body;
        const notes = await Notes.create({ title, description, tags, user: req.user.id })
        res.send(notes);
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ error: "Internal server error" })
    }
})

//-----XXX-----XXX--------XXX---------XXX------XXX------XXX-------XXX------XXX------

// Route2:- get all notes using:- http://localhost:5000/api/notes/fetchallnotesr login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ error: "Internal server error" })
    }
})

module.exports = router