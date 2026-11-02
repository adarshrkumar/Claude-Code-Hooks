let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    if (/(?<![\w.-])find(?![\w.-])/i.test(JSON.parse(input).tool_input?.command || '')) {
        console.error(`Blocked: Not allowed to use find commands instead of a simple \`ls\`. This is called overheadcreating. Must use an \`ls\` instead`);
        process.exit(2);
    }

    if (/(?<![\w.-])ls(?![\w.-])[^;&]*\|\s*(?:grep|egrep|fgrep|rg)(?![\w.-])|(?<![\w.-])rg(?![\w.-])[^;&|]*--files/.test(JSON.parse(input).tool_input?.command || '')) {
        console.error('Blocked: Not allowed to use grep to filter file names. Use `ls` with a glob or flags and read the full output instead.');
        process.exit(2);
    }

    process.exit(0);
});
