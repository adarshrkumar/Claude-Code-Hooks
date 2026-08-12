const fs = require('fs');
const path = require('path');

const agentsDir = path.join(process.cwd(), '.claude', 'agent-memory');

if (fs.existsSync(agentsDir)) {
    const folders = fs.readdirSync(agentsDir);
    if (folders.length > 0) {
        folders.forEach(folder => {
            const folderPath = path.join(agentsDir, folder);
            if (fs.statSync(folderPath).isDirectory()) {
                const files = fs.readdirSync(folderPath);
                if (files.length < 1) {
                    fs.rmdirSync(folderPath);
                }
            }
        });
    }

    const remainingFolders = fs.readdirSync(agentsDir);
    if (remainingFolders.length < 1) {
        fs.rmdirSync(agentsDir);
    }
}