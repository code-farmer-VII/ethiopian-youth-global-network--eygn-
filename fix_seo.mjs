import fs from 'fs';

const files = [
  'src/pages/TeamPage.tsx',
  'src/pages/MediaPage.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('<SEO') && !content.includes('import { SEO }')) {
    content = content.replace(/import \{ ROUTES \} from '\.\.\/lib\/routes';/, "import { ROUTES } from '../lib/routes';\nimport { SEO } from '../components/SEO';");
    fs.writeFileSync(file, content);
    console.log(`Added SEO import to ${file}`);
  }
}
