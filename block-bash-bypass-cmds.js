#!/usr/bin/env node
const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8');
let command = '';
try {
    command = JSON.parse(input).tool_input?.command || '';
} catch {}
if (/(?<![\w.-])(?:sh|bash|zsh)(?:\s|$)/.test(command) && !/^bash\s+(?![\/~]).*\.sh/.test(command)) {
    console.error('Blocked: Direct shell invocation is not allowed. Must run the command directly.');
    process.exit(2);
}
process.exit(0);
