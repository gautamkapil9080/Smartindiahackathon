const ghpages = require('gh-pages');

console.log('Starting manual deployment to GitHub Pages...');

ghpages.publish('build', {
  branch: 'gh-pages',
  repo: 'https://github.com/gautamkapil9080/SIH-MVP.git',
  message: 'Deploy Rural Healthcare MVP with Home Tab Features - Updated'
}, function(err) {
  if (err) {
    console.error('Deployment failed:', err);
  } else {
    console.log('✅ Successfully deployed to GitHub Pages!');
    console.log('🌐 Your app will be available at: https://gautamkapil9080.github.io/SIH-MVP');
    console.log('📋 Demo URL: https://gautamkapil9080.github.io/SIH-MVP/working-demo.html');
    console.log('🕒 It may take 2-3 minutes to go live.');
    console.log('🏠 New Features: Home Tab with 6 portals integrated!');
  }
});
