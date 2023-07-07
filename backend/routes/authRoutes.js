const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// register an user
router.post('/register', async (req, res) => {

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  // check for required fields
  if(name == null || email == null || password == null || confirmpassword == null) {
    return res.status(400).json({ error: 'Please fill the fields' });
  }

  // check if passwords match
  if(password != confirmpassword) {
    return res.status(400).json({ error: "Passwords don't match" });
  }

  // check if user exists 
  const emailExists = await User.findOne({ email: email });

  if(emailExists) {
    return res.status(400).json({ error: "Email already registered" });
  }

  // create hash password
  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  // create user
  const user = new User({
    name: name,
    email: email,
    password: hashPassword
  });

  try {

    const newUser = await user.save();

    // create token
    const token = jwt.sign(
      // payload
      {
        name: newUser.name,
        id: newUser._id
      },
      'ourSecret'
    );

    // return token
    res.json({ error: null, msg: 'Successful registration', token: token, userId: newUser._id });

  } catch(error) {
    res.status(400).json({ error });
  }

});

// login an user
router.post('/login', async (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  // check if user exists
  const user = await User.findOne({ email: email });

  if(!user) {
    return res.status(400).json({ error: "There is no user registered with this email" });
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password);

  if(!checkPassword) {
    return res.status(400).json({ error: "Invalid password" })
  }

  // create token
  const token = jwt.sign(
    // payload
    {
      name: user.name,
      id: user._id
    },
    'ourSecret'
  );

  // return token
  res.json({ error: null, msg: 'Successful authentication', token: token, userId: user._id });

});


module.exports = router;