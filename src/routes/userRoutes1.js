// routes/categoryRoutes.js
const express = require('express');
// const { getAllUsers } = require('../controllers/userController');
const router = express.Router();
const User = require('../models/User.model'); // Your model for Category

// Create a new category
router.post('/', async (req, res) => {
  try {
    const { id, name } = req.body;
    const newUser = new User({ id, name });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching users', error });
  }
});

// Get a single category by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching user', error });
  }
});

// Update a category
router.put('/:id', async (req, res) => {
  try {
    const { id, name } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { id, name },
      { new: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error });
  }
});

module.exports = router;
