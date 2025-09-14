const express = require('express');
const router = express.Router();

// Mock medicine data for MVP
const mockMedicines = [
  { id: 1, name: 'Paracetamol', generic: 'Acetaminophen', available: true, price: 10 },
  { id: 2, name: 'ORS Packets', generic: 'Oral Rehydration Salts', available: true, price: 5 },
  { id: 3, name: 'Amoxicillin', generic: 'Amoxicillin', available: false, price: 50 }
];

router.get('/search', async (req, res) => {
  const { q } = req.query;
  const results = q ? mockMedicines.filter(m => 
    m.name.toLowerCase().includes(q.toLowerCase())
  ) : mockMedicines;
  res.json({ medicines: results });
});

router.get('/availability', async (req, res) => {
  res.json({ medicines: mockMedicines, pharmacies: [] });
});

router.get('/pharmacies/nearby', async (req, res) => {
  res.json({ 
    pharmacies: [
      { id: 1, name: 'Nabha Medical Store', distance: '0.5 km', phone: '9876543210' },
      { id: 2, name: 'Punjab Pharmacy', distance: '1.2 km', phone: '9876543211' }
    ]
  });
});

module.exports = router;