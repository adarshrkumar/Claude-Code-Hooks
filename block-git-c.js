let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    if (/(?:^|\s)git\s+-C(?:\s|$)/.test(JSON.parse(input).tool_input?.command || '')) {
        console.error('Blocked: Not allowed to use git -C. Must work in current directory only.');
        process.exit(2);
    }

    process.exit(0);
});
