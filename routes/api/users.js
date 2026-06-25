const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// @route   POST api/users/register
// @desc    Register user
router.post('/register', async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ email: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.json(savedUser);

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

// @route   POST api/users/login
// @desc    Login user and return JWT token
router.post('/login', async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ emailNotFound: "Email is not registered" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ passwordIncorrect: "Password incorrect" });
        }

        const payload = { id: user.id, name: user.name };

        const token = jwt.sign(payload, config.get('secretOrKey'), { expiresIn: '1h' });

        res.json({
            success: true,
            token: "Bearer " + token
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
