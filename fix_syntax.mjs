import fs from 'fs';
import path from 'path';

// Fix Navbar
let navbar = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
navbar = navbar.replace(/<\/Link>/g, '</button>');
fs.writeFileSync('src/components/Navbar.tsx', navbar);

// Fix duplicated ROUTES imports
const pages = ['src/pages/AboutPage.tsx', 'src/pages/ProgramsPage.tsx', 'src/pages/HomePage.tsx', 'src/pages/TeamPage.tsx', 'src/pages/MediaPage.tsx', 'src/pages/MembershipPage.tsx'];
for (const p of pages) {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    // Just replace duplicate imports
    const match = content.match(/import \{ ROUTES \} from ".*?";/g);
    if (match && match.length > 1) {
      content = content.replace(/import \{ ROUTES \} from ".*?";/, '');
    }
    const match2 = content.match(/import \{ ROUTES \} from '.*?';/g);
    if (match2 && match2.length > 1) {
      content = content.replace(/import \{ ROUTES \} from '.*?';/, '');
    }
    
    // Also fix mixed quotes duplication
    if (content.includes(`import { ROUTES } from "../lib/routes";`) && content.includes(`import { ROUTES } from '../lib/routes';`)) {
        content = content.replace(`import { ROUTES } from "../lib/routes";\n`, '');
    }

    fs.writeFileSync(p, content);
  }
}

// Fix ArticleReaderModal
let article = fs.readFileSync('src/components/ArticleReaderModal.tsx', 'utf8');
article = article.replace(/=======\r?\n([\s\S]*?)\r?\n>>>>>>> origin\/dev/g, '');
fs.writeFileSync('src/components/ArticleReaderModal.tsx', article);
