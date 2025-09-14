const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, async (req, res) => {
  res.json({ records: [], message: 'Health records feature coming soon' });
});

router.post('/', authenticate, async (req, res) => {
  res.json({ message: 'Record created', id: 'REC-001' });
});

module.exports = router;