const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const files = fs.readdirSync(__dirname);
const validExtensions = ['.sh', '.js', '.py', '.ts', '.c', '.cpp'];
const noRunFiles = ['on-stop.sh', 'index.js'];
const hooks = files.filter(file => validExtensions.includes(path.extname(file)) && !noRunFiles.includes(path.basename(file)));

let hasCode2 = false;
let hasCode1 = false;
let hasCode0 = false;

const input = fs.readFileSync(0, 'utf-8');

for (const hook of hooks) {
    const ext = path.extname(hook);
    const outfile = `/tmp/${hook}.out`;
    let compileCmd, cmd, args = [];

         if (ext === '.c'  ) compileCmd = 'gcc';
    else if (ext === '.cpp') compileCmd = 'g++';

         if (ext === '.sh') cmd = 'bash';
    else if (ext === '.js') cmd = 'node';
    else if (ext === '.py') cmd = 'python3';
    else if (ext === '.ts') {
        cmd = 'node';
        args.push('--experimental-strip-types');
    }
    else if (ext === '.c' || ext === '.cpp') {
        cp.spawnSync(compileCmd, [`${__dirname}/${hook}`, '-o', outfile], { stdio: 'inherit' });
        cmd = outfile;
    }

    if (ext !== '.c' && ext !== '.cpp') args.push(`${__dirname}/${hook}`);

    const result = cp.spawnSync(cmd, args, {
        input: input,
        encoding: 'utf-8',
        stdio: ['pipe', 'inherit', 'inherit']
    });

         if (result.status === 2) hasCode2 = true;
    else if (result.status === 1) hasCode1 = true;
    else if (result.status === 0) hasCode0 = true;
}

     if (hasCode2) process.exit(2);
else if (hasCode1) process.exit(1);
else if (hasCode0) process.exit(0);
