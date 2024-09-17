const esbuild = require('esbuild');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const length = process.argv.length;

if(length < 4 ){
  console.log("Parameters are missing");
  console.log("Usage: yarn transpile.js <domain> <context>");
  console.log("Example: yarn transpile.js book borrow");
  process.exit(1);
}
const domain = process.argv[2];
const context = process.argv[3];

const sourceDir = path.join(__dirname, "src", domain, context);
const bundleDir = path.join(__dirname, ".dist", "bundle");
const outputDir = path.join(__dirname, ".dist", "src", domain, context);

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Ensure the bundle directory exists
if (!fs.existsSync(bundleDir)) {
  fs.mkdirSync(bundleDir, { recursive: true });
}

// Transpile and bundle the TypeScript files
esbuild.build({
  entryPoints: [path.join(sourceDir, 'index.ts')],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: path.join(outputDir, 'index.js'),
  minify: true,
}).then(() => {
  console.log('TypeScript transpiled and bundled successfully.');

  // Zip the output for Lambda
  console.log('Zipping the output...');
  execSync(`zip -r ${path.join(bundleDir, `${domain}.${context}.zip`)} ${outputDir}`, { stdio: 'inherit' });
  console.log('ZIP file created successfully.');
}).catch(() => process.exit(1));