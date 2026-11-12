let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    if (/(?<![\w.-])(?:[efzu]?grep|rg|ag|ack)(?![\w.-])[^;&|]*\s(?:-[A-Za-z]*[lLcq][A-Za-z]*|--(?:files-with-matches|files-without-match|count|count-matches|quiet|silent))(?![\w-])/i.test(JSON.parse(input).tool_input?.command || '')) {
        console.error('Blocked: Not allowed to use read-only greps (-l, -L, -c, -q). Use `ls` and Read the files instead.');
        process.exit(2);
    }

    process.exit(0);
});
