const admin = require('firebase-admin');
const userModel = require('../models/userModel');
const bcryptUtil = require('../utils/bcrypt');
const jwtUtil = require('../utils/jwt');

const register = async (req, res) => {
  try {
    const userData = req.body;
    const photo = req.file || null;

    // Panggil fungsi createUser di userModel
    await userModel.createUser(userData, photo);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Dapatkan informasi pengguna dari Firebase Authentication
    await admin.auth().getUserByEmail(email);

    // Dapatkan informasi pengguna dari basis data
    const user = await userModel.getUserByEmail(email);

    // Periksa apakah user dan user.password ada
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verifikasi kata sandi dengan bcrypt
    const isPasswordValid = await bcryptUtil.comparePasswords(password, user.password);

    if (isPasswordValid) {
      // Jika kata sandi valid, hasilkan token autentikasi menggunakan jsonwebtoken
      const token = jwtUtil.generateToken({ uid: user.uid });

      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const update = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const photo = req.file ? req.file.buffer : null;

    if (photo) {
      userData.photoUrl = `data:${req.file.mimetype};base64,${photo.toString('base64')}`;
    }

    await userModel.updateUser(userId, userData);
    res.status(200).send('User updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const destroy = async (req, res) => {
  try {
    const userId = req.params.id;
    await userModel.deleteUser(userId);
    res.status(200).send('User deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.getUserById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const { ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    const usersWithId = Object.entries(users || {}).map(([id, user]) => ({ id, ...user }));
    res.status(200).json(usersWithId);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await userModel.getUserByEmail(email);

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Return user data without password
    const { ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  register,
  login,
  update,
  destroy,
  getUserById,
  getAllUsers,
  getUserByEmail,
};