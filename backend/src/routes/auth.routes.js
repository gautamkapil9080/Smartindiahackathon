const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// POST /register - simple registration
router.post('/register',
  body('phone').isLength({ min: 10 }),
  body('name').notEmpty(),
  body('password').isLength({ min: 6 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { phone, name, password, language = 'punjabi' } = req.body;
      const existing = await User.findOne({ where: { phone } });
      if (existing) return res.status(409).json({ error: 'User already exists' });

      const user = await User.create({ phone, name, password, language, role: 'patient' });
      // For MVP, auto verify
      user.isVerified = true;
      await user.save();

      res.status(201).json({ message: 'Registered successfully' });
    } catch (err) {
      next(err);
    }
  }
);

// POST /login - simple login returning JWT
router.post('/login',
  body('phone').notEmpty(),
  body('password').notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { phone, password } = req.body;
      const user = await User.findOne({ where: { phone, isActive: true } });
      if (!user) return res.status(401).json({ error: 'Invalid credentials' });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
      res.json({ token, user: { id: user.id, name: user.name, role: user.role, language: user.language } });
    } catch (err) {
      next(err);
    }
  }
);

// POST /verify-otp - placeholder for OTP verification
router.post('/verify-otp', async (req, res) => {
  res.json({ verified: true });
});

module.exports = router;