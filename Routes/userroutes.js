const express=require('express')
const router=express.Router()
const bcrypt=require('bcryptjs')
const { body, validationResult } = require('express-validator');
const user=require('../model/userschema')

router.post("/newuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
  ], async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      const newUser = new user({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  module.exports=router