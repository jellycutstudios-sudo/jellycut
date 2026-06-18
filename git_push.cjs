const { execSync } = require('child_process');

try {
  console.log('Staging files...');
  execSync('git add .', { stdio: 'inherit' });
  
  console.log('Committing changes...');
  execSync('git commit -m "fix: resolve navigation scroll behavior and restore local image assets"', { stdio: 'inherit' });
  
  console.log('Pushing to live...');
  execSync('git push', { stdio: 'inherit' });
  
  console.log('Successfully pushed to live!');
} catch (err) {
  console.error('Git operation failed:', err.message);
}
