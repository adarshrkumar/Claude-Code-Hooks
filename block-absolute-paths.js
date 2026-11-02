let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    if (/(^|[^A-Za-z0-9_.])(\/[^\/\s"']+){5,}|(^|[^A-Za-z0-9_.])~(\/[^\/\s"']+){5,}|\$\{?\w+\}?(\/[^\/\s"']+){5,}|(?<![\w.])(\.\.\/){4,}\.\./m.test((JSON.parse(input).tool_input?.command || '').replace(/\b(?:https?|ftp|wss?):\/\/[^\s"']*/gi, ''))) {
        console.error('Blocked: Not allowed to use absolute paths this deep. Must use a relative path instead (or a not so deep absolute path, or using [a windows envvar OR "~"] to start the path).');
        process.exit(2);
    }

    process.exit(0);
});
