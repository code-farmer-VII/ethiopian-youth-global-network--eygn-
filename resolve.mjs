import fs from 'fs';
import path from 'path';

const filesToResolve = [
  'src/components/ArticleReaderModal.tsx',
  'src/components/ChapterMap.tsx',
  'src/components/EventRegistrationModal.tsx',
  'src/components/Footer.tsx',
  'src/components/GlobalSearchModal.tsx',
  'src/components/Navbar.tsx',
  'src/pages/AboutPage.tsx',
  'src/pages/HomePage.tsx',
  'src/pages/MediaPage.tsx',
  'src/pages/MembershipPage.tsx',
  'src/pages/ProgramsPage.tsx',
  'src/pages/TeamPage.tsx'
];

for (const file of filesToResolve) {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  // Strip conflict markers by always taking HEAD (the top part before =======)
  // Accommodate \r\n line endings
  const markerRegex = /<<<<<<< HEAD\r?\n([\s\S]*?)\r?\n=======\r?\n([\s\S]*?)\r?\n>>>>>>> origin\/dev/g;
  content = content.replace(markerRegex, '$1');

  // Now, inject useNavigate and useLinkClickHandler where appropriate
  // Replace `onNavigate: (page: PageType) => void;` with nothing (or make it optional)
  content = content.replace(/onNavigate:\s*\(\s*page:\s*PageType\s*\)\s*=>\s*void;/g, '');
  content = content.replace(/onNavigate\s*={handleNavigate}/g, '');
  content = content.replace(/onNavigate\s*={onNavigate}/g, '');
  content = content.replace(/onNavigate\??\s*,\n/g, '');
  content = content.replace(/onNavigate\??\s*,/g, '');
  content = content.replace(/\{?onNavigate\}?\s*:\s*\{onNavigate:[^\}]+\}/g, '');

  // Add useNavigate import if not exists
  if (!content.includes('useNavigate') && content.includes('onNavigate')) {
    content = content.replace(/import React(.*?)from 'react';/, "import React$1from 'react';\nimport { useNavigate } from 'react-router-dom';\nimport { ROUTES } from '../lib/routes';");
  }

  // Inside the functional component, add `const navigate = useNavigate();` if onNavigate was used
  if (content.includes('onNavigate(')) {
    content = content.replace(/(const \[.*?\].*?\r?\n)/, "$1  const navigate = useNavigate();\n");
    // Also change `onNavigate('page')` to `navigate(ROUTES.page)`
    content = content.replace(/onNavigate\('([^']+)'\)/g, "navigate(ROUTES.$1)");
  }

  // Cleanup any trailing unresolved markers if origin/dev wasn't exactly matched
  // Just in case it's something like >>>>>>> origin/dev...
  const fallbackRegex = /<<<<<<< HEAD\r?\n([\s\S]*?)\r?\n=======\r?\n([\s\S]*?)\r?\n>>>>>>> .*/g;
  content = content.replace(fallbackRegex, '$1');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Resolved ${file} by keeping HEAD and patching onNavigate`);
}
