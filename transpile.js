const esbuild = require('esbuild');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const domain = process.argv[2];
const event = process.argv[3];
// && zip -r  ../../../dist/books/borrow.zip

const sourceDir = path.join(__dirname, "functions", domain, event);
const outputDir = path.join(__dirname, ".dist", domain, event);

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
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
  execSync(`zip -r ${path.join(outputDir, "bundle.zip")} ${outputDir}`, { stdio: 'inherit' });
  console.log('ZIP file created successfully.');
}).catch(() => process.exit(1));