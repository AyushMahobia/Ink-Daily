const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "ayushisagood@boy";

// Route 1:- Creating authentication of user request:- http://localhost:5000/api/auth/createuser
router.post('/createuser', [
    body('name', "Minium length should be 3").isLength(
        { min: 3 }
    ),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast of 8 characters").isLength(
        { min: 8 }
    )
], async (req, res) => {

    try { // if some error occured while writing name or email or password than show this👇
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // checking if the email is unique or not, if not than show this👇
        let isEmailExist = await User.findOne({ email: req.body.email })
        if (isEmailExist) {
            return res.status(400).json({ error: "Sorry user with this email already exist" })
        }

        // securing passord by adding hash and salt
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        // if all above cases are checked than it create user and save on database
        let user = await User.create({ name: req.body.name, email: req.body.email, password: securePassword })

        // Generating token
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        res.status(200).json({ authToken });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error occur while creating user")
    }

})

// Route 2:- Checking authentication of user request:- http://localhost:5000/api/auth/login
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists()
], async (req, res) => {
    try { // if some error occured while writing email or password than show this👇
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        // checking email and password
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        // Generating token
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        res.status(200).json({ authToken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({error:"Error occur while creating user"})
    }
})

// Route 3:- Get loggedin user details using:- http://localhost:5000/api/auth/getuser  login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findById(userId).select("-password");
        res.status(200).send(userDetails)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({error:"Error occur while getting user details"})
    }

})
module.exports = router
