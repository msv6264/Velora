const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Add "use client" if not present
    if (!content.includes('"use client"') && !content.includes("'use client'")) {
        content = '"use client";\n' + content;
    }

    // Replace react-router-dom imports
    let hasRouterDom = content.includes('react-router-dom');
    if (hasRouterDom) {
        // Replace useNavigate
        if (content.includes('useNavigate')) {
            content = content.replace(/import\s+{([^}]*?)useNavigate([^}]*?)}\s+from\s+['"]react-router-dom['"];?/, (match, p1, p2) => {
                let otherImports = (p1 + p2).split(',').map(s => s.trim()).filter(s => s && s !== 'useNavigate');
                let res = `import { useRouter } from 'next/navigation';\n`;
                if (otherImports.length > 0) {
                    res += `import { ${otherImports.join(', ')} } from 'react-router-dom';\n`; // temp if there are others
                }
                return res;
            });
            content = content.replace(/const\s+(\w+)\s*=\s*useNavigate\(\)/g, 'const $1 = useRouter()');
            // We assume the variable is `navigate`. If they called it something else, this might not catch it perfectly but usually it's `navigate`
            content = content.replace(/navigate\(/g, 'router.push('); // Might need manual fix if variable was navigate and we changed to router.
            // Actually, if we change `useNavigate()` to `useRouter()`, the variable is usually `navigate`.
            // Let's replace `const navigate = useRouter()` to `const router = useRouter()`
            content = content.replace(/const\s+navigate\s*=\s*useRouter\(\)/g, 'const router = useRouter()');
            content = content.replace(/navigate\(/g, 'router.push(');
        }

        // Replace Link
        if (content.includes('Link')) {
            content = content.replace(/import\s+{([^}]*?)Link([^}]*?)}\s+from\s+['"]react-router-dom['"];?/, (match, p1, p2) => {
                let otherImports = (p1 + p2).split(',').map(s => s.trim()).filter(s => s && s !== 'Link');
                let res = `import Link from 'next/link';\n`;
                if (otherImports.length > 0) {
                    if (otherImports.includes('useLocation')) {
                         res += `import { usePathname } from 'next/navigation';\n`;
                    } else {
                         res += `import { ${otherImports.join(', ')} } from 'react-router-dom';\n`;
                    }
                }
                return res;
            });
            content = content.replace(/<Link([^>]*?)to=/g, '<Link$1href=');
        }
        
        // Handle useLocation
        if (content.includes('useLocation')) {
            content = content.replace(/import\s+{([^}]*?)useLocation([^}]*?)}\s+from\s+['"]react-router-dom['"];?/, (match, p1, p2) => {
                return `import { usePathname } from 'next/navigation';\n`;
            });
            content = content.replace(/const\s+location\s*=\s*useLocation\(\)/g, 'const pathname = usePathname()');
            content = content.replace(/location\.pathname/g, 'pathname');
        }
    }
    
    // Fix image imports. Vite allows `import img from './assets/img.png'`. 
    // In Next.js, it's often easier to keep this and let Next.js handle it, or we can use absolute paths from `/`.
    // Wait, we moved `assets` to `public`. So `/img.png`.
    // We should replace imports from `assets/...` or `../../assets/...` with strings.
    // e.g. `import logo from '../../assets/logo.png'` -> `const logo = '/logo.png'`
    content = content.replace(/import\s+(\w+)\s+from\s+['"](?:\.\.\/)*\.\.\/assets\/([^'"]+)['"]/g, 'const $1 = "/$2"');
    content = content.replace(/import\s+(\w+)\s+from\s+['"]\.\/assets\/([^'"]+)['"]/g, 'const $1 = "/$2"');
    content = content.replace(/import\s+(\w+)\s+from\s+['"](?:\.\.\/)*assets\/([^'"]+)['"]/g, 'const $1 = "/$2"');

    // Also we need to fix relative component imports. `views` vs `pages`.
    // We moved `pages` to `views`. If any component imports from `../components`, it will work.
    
    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    let list = fs.readdirSync(dir);
    for (let file of list) {
        let fullPath = path.join(dir, file);
        let stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            replaceInFile(fullPath);
        }
    }
}

walk(path.join(__dirname, 'components'));
walk(path.join(__dirname, 'views'));
