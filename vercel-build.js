const { execSync } = require('child_process');

console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

console.log('Installing client dependencies...');
process.chdir('client');
execSync('npm install', { stdio: 'inherit' });

console.log('Building client...');
execSync('npm run build', { stdio: 'inherit' });

console.log('Build completed successfully!');
