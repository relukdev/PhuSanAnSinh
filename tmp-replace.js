import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.astro')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('btn-accent')) {
    content = content.replace(/btn-accent/g, 'btn-primary');
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
    count++;
  }
}
console.log(`Total replaced in ${count} files.`);
