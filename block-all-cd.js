let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    const data = JSON.parse(input);

    if (/(?:^|\s)cd(?:\s|$)/.test(data.tool_input?.command || '')) {
        console.error('Blocked: Not allowed to use cd. Must use relative paths instead.');
        process.exit(2);
    }

    process.exit(0);
});
