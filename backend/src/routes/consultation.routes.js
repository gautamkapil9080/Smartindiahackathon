const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// GET /consultations - list consultations
router.get('/', authenticate, async (req, res) => {
  res.json({ consultations: [], message: 'Consultations feature coming soon' });
});

// POST /consultations/book - book appointment
router.post('/book', authenticate, async (req, res) => {
  res.json({ message: 'Appointment booking coming soon', appointmentId: 'MVP-001' });
});

// GET /consultations/:id - get consultation details
router.get('/:id', authenticate, async (req, res) => {
  res.json({ id: req.params.id, status: 'scheduled', message: 'Details coming soon' });
});

// POST /consultations/:id/join - join video call
router.post('/:id/join', authenticate, async (req, res) => {
  res.json({ roomId: `room-${req.params.id}`, message: 'Video call feature coming soon' });
});

module.exports = router;