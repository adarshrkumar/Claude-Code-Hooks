let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    if ((JSON.parse(input).tool_input?.command || '').toLowerCase().startsWith('find')) {
        console.error(`Blocked: Not allowed to use find commands instead of a simple \`ls\`. This is called overheadcreating. Must use an \`ls\` instead`);
        process.exit(2);
    }

    process.exit(0);
});
