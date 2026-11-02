const fs = require('fs');
const path = require('path');

const agentsDir = path.join(process.cwd(), '.claude', 'agent-memory');

if (fs.existsSync(agentsDir)) {
    fs.readdirSync(agentsDir).forEach(folder => {
        const folderPath = path.join(agentsDir, folder);
        if (fs.statSync(folderPath).isDirectory() && fs.readdirSync(folderPath).length < 1) fs.rmdirSync(folderPath);
    });

    if (fs.readdirSync(agentsDir).length < 1) fs.rmdirSync(agentsDir);
}