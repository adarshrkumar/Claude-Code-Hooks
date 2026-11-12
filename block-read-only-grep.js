let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    if (/(?<![\w.-])(?:[efzu]?grep|rg|ag|ack)(?![\w.-])[^;&|]*\s(?:-[A-Za-z]*[lLcq][A-Za-z]*|--(?:files-with-matches|files-without-match|count|count-matches|quiet|silent))(?![\w-])/i.test(JSON.parse(input).tool_input?.command || '')) {
        console.error('Blocked: grep/rg with -l, -L, -c or -q (listing matching files or counting matches) is not allowed. Use `ls` and Read the files instead.');
        process.exit(2);
    }

    process.exit(0);
});
