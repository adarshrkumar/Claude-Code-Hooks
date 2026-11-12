let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    if (/(?<![\w.-])find(?![\w.-])/i.test(JSON.parse(input).tool_input?.command || '')) {
        console.error(`Blocked: Not allowed to use find commands instead of a simple \`ls\`. This is called overheadcreating. Must use an \`ls\` instead`);
        process.exit(2);
    }

    if (/(?<![\w.-])(?:[efzu]?grep|rg|ag|ack)(?![\w.-])/i.test((JSON.parse(input).tool_input?.command || '').replace(/(?<![\w.-])(?:[efzu]?grep|rg|ag|ack)(?![\w.-])[^;&|]*\s(?:-[A-Za-z]*[lLcq][A-Za-z]*|--(?:files-with-matches|files-without-match|count|count-matches|quiet|silent))(?![\w-])[^;&|]*/gi, ''))) {
        console.error('Blocked: grep/rg (searching or printing matching lines) is not allowed. Use `ls` to list the files and Read them in full instead.');
        process.exit(2);
    }

    process.exit(0);
});
