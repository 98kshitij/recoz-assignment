// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  const { name, email, age } = req.body;
  const user = new User({ name, email, age });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a user by id
router.put('/:id', async (req, res) => {
  const { name, email, age } = req.body;
  
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, age }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
