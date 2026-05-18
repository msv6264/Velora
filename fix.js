const fs = require('fs');
const path = require('path');

function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (let f of fs.readdirSync(dir)) {
        let p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) walk(p);
        else if (f === 'page.tsx') {
            let c = fs.readFileSync(p, 'utf8');
            c = c.replace(/from '\.\.views/g, "from '../views");
            fs.writeFileSync(p, c);
        }
    }
}
walk(path.join(__dirname, 'app'));
