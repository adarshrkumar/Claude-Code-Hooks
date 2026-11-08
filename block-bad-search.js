let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    if (/(?<![\w.-])find(?![\w.-])/i.test(JSON.parse(input).tool_input?.command || '')) {
        console.error(`Blocked: Not allowed to use find commands instead of a simple \`ls\`. This is called overheadcreating. Must use an \`ls\` instead`);
        process.exit(2);
    }

    if (/(?<![\w.-])(?:grep|egrep|fgrep|zgrep|ugrep|rg|ag|ack)(?![\w.-])/i.test(JSON.parse(input).tool_input?.command || '')) {
        console.error('Blocked: Not allowed to search files with grep or rg. Use `ls` to list the files and Read them in full instead.');
        process.exit(2);
    }

    process.exit(0);
});
