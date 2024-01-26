const express=require('express')
const router=express.Router()
const bcrypt=require('bcryptjs')
const { body, validationResult } = require('express-validator');
const jwt=require('jsonwebtoken')
const jwtSecret="MyNameIsEnduvasiSrihariDinesh!@#"
const user=require('../model/userschema')

router.post("/loginuser", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const userRecord = await user.findOne({ email: req.body.email });
  
      if (!userRecord) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Email Address' }] });
      }
  
      const pwdcompare = await bcrypt.compare(req.body.password, userRecord.password);
  
      if (!pwdcompare) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Password' }] });
      }
  
      const data = {
        user: {
          id: userRecord.id
        }
      };
  
      const authtoken = jwt.sign(data, jwtSecret);
      res.json({ success: true, authtoken: authtoken });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

module.exports=router