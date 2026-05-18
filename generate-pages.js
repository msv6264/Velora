const fs = require('fs');
const path = require('path');

const routes = {
  '': 'Home',
  'login': 'Login',
  'dashboard': 'UserWebApp/Dashboard/Dashboard',
  'add-resource': 'UserWebApp/Resources/AddResource',
  'rediscovery': 'UserWebApp/Rediscovery/Rediscovery',
  'library': 'UserWebApp/Library/Library',
  'collections': 'UserWebApp/Collections/Collections',
  'collections/[id]': 'UserWebApp/Collections/CollectionDetail',
  'insights': 'UserWebApp/Insights/Insights'
};

for (const [routePath, componentPath] of Object.entries(routes)) {
  const dir = path.join(__dirname, 'app', routePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Calculate relative path to views
  const depth = routePath ? routePath.split('/').length : 0;
  const relativePrefix = depth === 0 ? '..' : '../'.repeat(depth + 1);
  const importPath = `${relativePrefix}views/${componentPath}`;
  
  const content = `import PageComponent from '${importPath}';\n\nexport default function Page(props) {\n  return <PageComponent {...props} />;\n}\n`;
  
  fs.writeFileSync(path.join(dir, 'page.tsx'), content);
}
console.log('App pages generated.');
