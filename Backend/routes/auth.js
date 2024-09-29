
// importing express and express router
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'Aliisagoodboy'

// for particular router we use router.get 
// Create a User using  Post "api/auth/createuser"
router.post('/createuser',[
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
  success = false;
  // if there are errors return bad request 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  try{
  let user = await User.findOne({email: req.body.email})
  if(user){
    return res.status(400).json({success, error: "Email already exists"})
  }
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt)

   // Create a new user 
   user = await User.create({
    name: req.body.name,
    password: secPass,
    email: req.body.email
  })
  const data = {
    user:{
      id: user.id
    }
  }
  const authToken = jwt.sign(data, JWT_SECRET)
  success = true
  res.json({success, authToken})

} catch(error) {
  console.error(error.message)
  res.status(500).send("Internal Server Error")
}
})

// Authenticate a User using  Post "api/auth/login"
// Authenticate a User using  Post "api/auth/login"
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password Cannot be blanked').isLength({ min: 5 })
], async (req, res) => {
  // if there are errors return bad request 
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { password, email } = req.body; // Removed name from here
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false;
      return res.status(400).json({ success, error: "Please try to Login with correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ success, error: "Please try to Login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    // Include the user's name in the response
    res.json({ success, authToken, name: user.name }); // Add user name here

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Get loggedin User Details using Post : /api/auth/getUser
router.post('/getuser', fetchuser ,  async (req, res) => {
try {
  const userId = req.user.id
  const user = await User.findById(userId).select("-password");
  res.send(user)
} catch (error) {
  console.error(error.message)
  res.status(500).send("Internal Server Error")
}
})
module.exports = router