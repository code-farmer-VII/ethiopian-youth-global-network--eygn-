import fs from 'fs';

function fixFile(file, hookStr) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Only inject if navigate is used but useNavigate isn't called
  if (content.includes('navigate(') && !content.includes('const navigate = useNavigate()')) {
    // Find the first block of useState or useEffect or just the opening of the component
    content = content.replace(/(const \[.*?\] = useState.*?;)/, `$1\n  const navigate = useNavigate();`);
    
    // If there is no useState (like in AboutPage)
    if (!content.includes('const navigate = useNavigate()')) {
      content = content.replace(/(const .*?: React\.FC.*?=> \{)/, `$1\n  const navigate = useNavigate();`);
    }
    
    fs.writeFileSync(file, content);
    console.log('Fixed ' + file);
  }
}

const files = [
  'src/pages/AboutPage.tsx',
  'src/pages/HomePage.tsx',
  'src/pages/ProgramsPage.tsx',
  'src/pages/TeamPage.tsx',
  'src/components/Footer.tsx'
];

for (const f of files) {
  fixFile(f);
}

// Special fix for Footer.tsx SocialLinks
let footer = fs.readFileSync('src/components/Footer.tsx', 'utf8');
if (footer.includes('<SocialLinks />') && !footer.includes('import { SocialLinks }')) {
  footer = footer.replace(/import \{ Mail, MapPin/, "import { SocialLinks } from './SocialLinks';\nimport { Mail, MapPin");
  fs.writeFileSync('src/components/Footer.tsx', footer);
  console.log('Fixed Footer SocialLinks');
}
