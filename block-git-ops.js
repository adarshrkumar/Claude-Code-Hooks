let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    if (/(^|\s)git\s(checkout|reset|stash|branch)(\s|$)/m.test(JSON.parse(input).tool_input?.command || '')) {
        console.error('Blocked: Certain git operations are not allowed. Must not use checkout, reset, stash, and branch operations.');
        process.exit(2);
    }

    process.exit(0);
});
