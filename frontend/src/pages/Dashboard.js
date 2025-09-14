import React from 'react';
import { Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const features = [
    { title: 'Book Consultation', path: '/consultations', description: 'Schedule video consultation with doctors' },
    { title: 'Symptom Checker', path: '/symptom-checker', description: 'AI-powered symptom analysis' },
    { title: 'Medicine Tracker', path: '/medicines', description: 'Check medicine availability' },
    { title: 'Health Records', path: '/health-records', description: 'View your medical history' }
  ];

  return (
    <>
      <Typography variant="h4" gutterBottom>Welcome to Rural Healthcare</Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Connecting Nabha's rural communities with quality healthcare
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={3} key={feature.title}>
            <Card>
              <CardContent>
                <Typography variant="h6">{feature.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => navigate(feature.path)}>
                  Open
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;