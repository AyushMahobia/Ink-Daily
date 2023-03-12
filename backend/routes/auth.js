const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/',[
    body('name',"Minium length should be 3").isLength({min: 3}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password must be atleast of 8 characters").isLength({min: 8})
], (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err=>{console.log("Enter the uniqe value for email")
            res.json({error:"Enter unique email address", msg:err.message})
        })
})

module.exports = router