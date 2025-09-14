# Create stub React components for remaining pages

$stubContent = @'
import React from 'react';
import { Typography } from '@mui/material';

const COMPONENT_NAME = () => {
  return (
    <Typography variant="h4">COMPONENT_NAME - Coming Soon</Typography>
  );
};

export default COMPONENT_NAME;
'@

$components = @(
  "Register",
  "Consultations", 
  "VideoCall",
  "HealthRecords",
  "MedicineTracker",
  "SymptomChecker",
  "Profile"
)

foreach ($comp in $components) {
  $content = $stubContent -replace "COMPONENT_NAME", $comp
  $path = "frontend\src\pages\$comp.js"
  Set-Content -Path $path -Value $content
  Write-Host "Created $path"
}