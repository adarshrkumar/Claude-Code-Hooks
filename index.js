const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const validExtensions = ['.sh', '.js', '.py', '.ts', '.c', '.cpp'];
const noRunFiles = ['on-stop.sh', 'index.js'];

const files = fs.readdirSync(__dirname);

const hooks = files.filter(file => validExtensions.includes(path.extname(file)) && !noRunFiles.includes(path.basename(file)));

let code = 0;

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
        stdio: ['pipe', 'inherit', 'ignore']
    });

    result.stderr && console.error(hook, result.stderr);

    code = result.status;
}

     if (code === 2) process.exit(2);
else if (code === 1) process.exit(1);
else if (code === 0) process.exit(0);
