let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    if (/(?<![\w.\/-])cd(?![\w.-])/.test((JSON.parse(input).tool_input?.command || '').replace(/['"\\]/g, ''))) {
        console.error('Blocked: Not allowed to use cd. Must use relative paths instead.');
        process.exit(2);
    }

    process.exit(0);
});
