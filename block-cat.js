let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    const data = JSON.parse(input);

    if (/(?:^|\s)cat(?:\s|$)/.test(data.tool_input?.command || '')) {
        console.error('Blocked: cat command is not allowed. Use the Read tool instead.');
        process.exit(2);
    }

    process.exit(0);
});
