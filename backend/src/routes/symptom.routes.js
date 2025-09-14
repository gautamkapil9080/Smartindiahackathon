const express = require('express');
const router = express.Router();
const { symptomDatabase, analyzeSymptoms } = require('../utils/symptomData');

// POST /symptoms/check - analyze symptoms
router.post('/check', async (req, res) => {
  const { symptoms, language = 'english' } = req.body;
  
  if (!symptoms || !Array.isArray(symptoms)) {
    return res.status(400).json({ error: 'Invalid symptoms data' });
  }
  
  const analysis = analyzeSymptoms(symptoms, language);
  res.json(analysis);
});

// GET /symptoms/conditions - list common conditions
router.get('/conditions', async (req, res) => {
  const { language = 'english' } = req.query;
  
  const conditions = symptomDatabase.conditions.map(c => ({
    id: c.id,
    name: c.name[language],
    severity: c.severity
  }));
  
  res.json({ 
    conditions,
    symptomCategories: Object.keys(symptomDatabase.symptoms)
  });
});

module.exports = router;