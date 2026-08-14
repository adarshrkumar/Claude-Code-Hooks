const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const validExtensions = {
    '.sh': {
        cmd: 'bash'
    },
    '.js': {
        cmd: 'node'
    },
    '.ts': {
        cmd: 'node',
        args: ['--experimental-strip-types']
    },
    '.py': {
        cmd: 'python3'
    },
    '.c': {
        compileCmd: 'gcc'
    },
    '.cpp': {
        compileCmd: 'g++'
    }
};
const noRunFiles = ['on-stop.sh', 'index.js'];

const hooks = fs.readdirSync(__dirname).filter(file => Object.keys(validExtensions).includes(path.extname(file)) && !noRunFiles.includes(path.basename(file)));

let code = 0;

const input = fs.readFileSync(0, 'utf-8');

for (const hook of hooks) {
    const ext = path.extname(hook);
    const outfile = `./${hook}.out`;

    let compileCmd = validExtensions[ext]?.compileCmd;
    let cmd = validExtensions[ext]?.cmd;
    let args = validExtensions[ext]?.args || [];

    if (ext === '.c' || ext === '.cpp') {
        cp.spawnSync(compileCmd, [`${__dirname}/${hook}`, '-o', outfile], { stdio: 'inherit' });

        if (!fs.existsSync(outfile)) {
            code = Math.max(code, 1);
            continue;
        }
        
        cmd = outfile;
    }

    if (ext !== '.c' && ext !== '.cpp') args.push(`${__dirname}/${hook}`);

    const result = cp.spawnSync(cmd, args, {
        input: input,
        encoding: 'utf-8',
        stdio: ['pipe', 'inherit', 'pipe']
    });

    result.stderr && console.error(hook, result.stderr);

    code = Math.max(code, result.status);

    if (ext === '.c' || ext === '.cpp') fs.rmSync(outfile, { force: true });
}

     if (code === 2) process.exit(2);
else if (code === 1) process.exit(1);
else if (code === 0) process.exit(0);
