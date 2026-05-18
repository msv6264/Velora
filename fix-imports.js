const fs = require('fs');
const path = require('path');

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (let f of fs.readdirSync(dir)) {
        let p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) walk(p);
        else if (f === 'page.jsx') {
            let c = fs.readFileSync(p, 'utf8');
            // page.jsx files used to import from ../../views or ../views
            // Now views is at src/views, and page.jsx is at src/app/xxx/page.jsx
            // so the relative path from src/app/xxx to src/views is ../../views
            // From src/app to src/views is ../views
            // The generator made paths like ../../views/... or ../views/...
            // which already work since everything is inside src now. No change needed.
            // But let's log to confirm.
            console.log(p);
            console.log(c.match(/from '.*views.*/)?.[0] || '  (no views import)');
        }
    }
}

walk(path.join(__dirname, 'src', 'app'));
