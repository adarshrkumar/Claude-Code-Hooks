const fs = require('fs');
const cp = require('child_process');
const path = require('path');

const noRunFiles = ['on-stop.sh', 'stop-word-check.sh', 'index.js'];

const skipOnArgValue = {
    'git-mode=all': ['block-git-ops.js', 'block-git-c.js'],
    'grep-mode=readonly': ['block-read-only-grep.js'],
};

const args = process.argv.slice(2).filter(arg => arg.startsWith('--')).map(arg => arg.toLowerCase().slice('--'.length).split('=')).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
}, {});

const validExtensions = [
    {
        exts: ['.sh', '.bash'],
        cmd: 'bash'
    },
    {
        exts: ['.js', '.mjs', '.cjs'],
        cmd: 'node'
    },
    {
        exts: ['.ts', '.mts'],
        cmd: 'node',
        args: ['--experimental-strip-types']
    },
    {
        exts: ['.py'],
        cmd: 'python3'
    },
    {
        exts: ['.cmd', '.bat'],
        cmd: 'cmd',
        args: ['/c']
    },
    {
        exts: ['.ps1'],
        cmd: 'powershell',
        args: ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File']
    },
    {
        exts: ['.zsh'],
        cmd: 'zsh'
    },
    {
        exts: ['.c'],
        compileCmd: 'gcc'
    },
    {
        exts: ['.cpp'],
        compileCmd: 'g++'
    }
];

const hooks = fs.readdirSync(__dirname).filter(file => validExtensions.some(e => e.exts.includes(path.extname(file))) && !noRunFiles.includes(path.basename(file)));

let code = 0;

let input;
try {
    input = fs.readFileSync(0, 'utf-8');
} catch {
    input = undefined;
}

for (const hook of hooks) {
    const ext = path.extname(hook);
    const outfile = `./${hook}.out`;

    const validExtension = validExtensions.find(e => e.exts.includes(ext));

    let compileCmd = validExtension?.compileCmd;
    let cmd = validExtension?.cmd;
    let hookArgs = [...(validExtension?.args || [])];

    if (ext === '.c' || ext === '.cpp') {
        cp.spawnSync(compileCmd, [`${__dirname}/${hook}`, '-o', outfile], { stdio: 'inherit' });

        if (!fs.existsSync(outfile)) {
            code = Math.max(code, 1);
            continue;
        }
        
        cmd = outfile;
    }

    if (ext !== '.c' && ext !== '.cpp') hookArgs.push(`${__dirname}/${hook}`);

    if (!Object.keys(skipOnArgValue).filter(k => 'global' in args || Object.keys(args).map(k => `${k}=${args[k]}`).includes(k)).map(k => skipOnArgValue[k]).flat().includes(hook)) {
        const result = cp.spawnSync(cmd, hookArgs, {
            input,
            encoding: 'utf-8',
            stdio: ['pipe', 'inherit', 'pipe']
        });

        if (result.error) result.status = 2;
        result.stderr && console.error(hook, result.stderr);
        code = Math.max(code, result.status);
    }
    else code = Math.max(code, 0)

    if (ext === '.c' || ext === '.cpp') fs.rmSync(outfile, { force: true });
}

     if (code === 2) process.exit(2);
else if (code === 1) process.exit(1);
else if (code === 0) process.exit(0);
