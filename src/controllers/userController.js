'use strict';

const userService = require('../services/userService');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAll();

    res.status(200).json(users);
  } catch (error) {
    // console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    // console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};

// Create new user
const createUser = async (req, res) => {
  try {
    const newUser = await userService.create(req.body);

    res.status(201).json(newUser);
  } catch (error) {
    // console.error('Error creating user:', error);
    res.status(400).json({ message: 'Failed to create user' });
  }
};

// Update existing user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await userService.update({ id, ...req.body });

    if (updated[0] === 0) {
      // Sequelize returns [0] if no rows updated
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    // console.error('Error updating user:', error);
    res.status(400).json({ message: 'Failed to update user' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await userService.remove(id);

    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    // console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
