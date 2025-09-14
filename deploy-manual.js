const ghpages = require('gh-pages');

console.log('Starting manual deployment to GitHub Pages...');

ghpages.publish('build', {
  branch: 'gh-pages',
  repo: 'https://github.com/gautamkapil9080/NEW-SIHMVP.git',
  message: 'Deploy Rural Healthcare MVP to GitHub Pages'
}, function(err) {
  if (err) {
    console.error('Deployment failed:', err);
  } else {
    console.log('✅ Successfully deployed to GitHub Pages!');
    console.log('🌐 Your app will be available at: https://gautamkapil9080.github.io/NEW-SIHMVP');
    console.log('🕒 It may take 2-3 minutes to go live.');
  }
});