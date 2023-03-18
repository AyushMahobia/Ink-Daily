const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

// Route1 (Create):- add new notes using:- http://localhost:5000/api/notes/addnote login required
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

// Route2 (Read):- get all notes using:- http://localhost:5000/api/notes/fetchallnotes login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ error: "Internal server error" })
    }
})

//-----XXX-----XXX--------XXX---------XXX------XXX------XXX-------XXX------XXX------

// Route3 (Update):- Update an existing note using:- PUT http://localhost:5000/api/notes/updatenote login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        let newNotes = {};
        if (title) { newNotes.title = title }
        if (description) { newNotes.description = description }
        if (tags) { newNotes.tags = tags }

        //Find the note to be updated and update it
        let notes = await Notes.findById(req.params.id);

        //If original note not found
        if (!notes) { return res.status(400).send("Notes not found") };

        //If user id of both notes and user not match
        if (notes.user.toString() !== req.user.id) { return res.status(400).send("Not Allowed") };

        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
        res.json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ error: "Internal server error" })
    }
})

//-----XXX-----XXX--------XXX---------XXX------XXX------XXX-------XXX------XXX------

// Route4 (Delete):- Delete an existing note using:- DELETE http://localhost:5000/api/notes/deletenote login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        let notes = await Notes.findById(req.params.id);

        //If original note not found
        if (!notes) { return res.status(404).send("Notes not found") };

        ////Allow deletion onlyif user owns this note
        if (notes.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };

        notes = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been successfully deleted"})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ error: "Internal server error" })
    }
})
module.exports = router