const { execSync } = require('child_process');

const fs = require('fs');
const path = require('path');

function getDirectories(source) {
  const files = fs.readdirSync(source, { withFileTypes: true });
  return files
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

let domains = getDirectories('./src')
console.log(domains)

domains.forEach(domain => {
  let contexts = getDirectories(path.join("./src", domain))
  contexts.forEach(context => {
    console.log(`npm run build -- ${domain} ${context}`);
    execSync(`npm run build -- ${domain} ${context}`, { stdio: 'inherit' });
  })
})
