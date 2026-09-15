let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    const data = JSON.parse(input);

    if (/(?:^|\s)git\s+-C(?:\s|$)/.test(data.tool_input?.command || '')) {
        console.error('Blocked: Not allowed to use git -C. Must work in current directory only.');
        process.exit(2);
    }

    process.exit(0);
});
