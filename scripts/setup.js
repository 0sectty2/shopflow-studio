const fs = require('fs');
const path = require('path');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));

// Create a minimal package-lock.json structure
const lockFile = {
  name: packageJson.name,
  version: packageJson.version,
  lockfileVersion: 3,
  requires: true,
  packages: {
    "": {
      name: packageJson.name,
      version: packageJson.version,
      dependencies: packageJson.dependencies || {},
      devDependencies: packageJson.devDependencies || {}
    }
  }
};

// Write package-lock.json
fs.writeFileSync(path.join(__dirname, '../package-lock.json'), JSON.stringify(lockFile, null, 2));
console.log('Generated package-lock.json');
