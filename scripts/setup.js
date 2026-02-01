const fs = require('fs');

// Get the current working directory
const cwd = process.cwd();
console.log('Current working directory:', cwd);

try {
  // Read package.json
  const packageJsonPath = `${cwd}/package.json`;
  console.log('Reading from:', packageJsonPath);
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

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
  const lockPath = `${cwd}/package-lock.json`;
  fs.writeFileSync(lockPath, JSON.stringify(lockFile, null, 2));
  console.log('Generated package-lock.json at:', lockPath);
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
