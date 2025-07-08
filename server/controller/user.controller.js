const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Helper = require('../helper/index');
const niv = require('node-input-validator');

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';

exports.registerUser = async (req, res) => {
  try {
    const validator = new niv.Validator(req.body, {
      name: 'required|string',
      email: 'required|email',
      password: 'required|string|minLength:6',
    });

    const matched = await validator.check();
    if (!matched) {
      return res.status(400).json({ errors: validator.errors });
    }

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    Helper.writeErrorLog(req, error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const validator = new niv.Validator(req.body, {
      email: 'required|email',
      password: 'required|string|minLength:6',
    });

    const matched = await validator.check();
    if (!matched) {
      return res.status(400).json({ errors: validator.errors });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    Helper.writeErrorLog(req, error);
    res.status(500).json({ message: 'Login failed' });
  }
};
