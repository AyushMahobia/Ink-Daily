const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/createUser', [
    body('name', "Minium length should be 3").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast of 8 characters").isLength({ min: 8 })
], async (req, res) => {

    try {
        // if some error occured while writing name or email or password than show this👇
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //checking if the email is unique or not, if not than show this👇
        let isEmailExist = await User.findOne({ email: req.body.email })
        if (isEmailExist) {
            return res.status(400).json({ error: "Sorry user with this email already exist" })
        }

        //if all above cases are checked than it create user and save on database
        await Userd.create(
            // {name: req.body.name,
            // email: req.body.email,
            // password: req.body.password}
            req.body
        )

        res.status(200).json(req.body)
        //   .then(user => res.json(user))
        //   .catch(err=>{console.log("Enter the uniqe value for email")
        //         res.json({error:"Enter unique email address", msg:err.message})
        //     })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Error occur while creating user")
    }

})

module.exports = router