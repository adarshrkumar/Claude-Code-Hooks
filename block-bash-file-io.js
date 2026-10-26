let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    if (/(?:^|[\s;&|(])(?:node(?:\s+--?[\w-]+(?:=\S+)?)*\s+(?:-e|-p|--eval|--print|-|<<)(?=\s|$|['"])|python[\d.]*(?:\s+--?[\w-]+(?:=\S+)?)*\s+(?:(?:-c|-)(?=\s|$|['"])|<<))/.test(JSON.parse(input).tool_input?.command || '')) {
        console.error('Blocked: Not allowed to edit files with inline scripts. Must use relative Edit() instead.');
        process.exit(2);
    }

    if (/(?:^|[;&|(`]|\$\()\s*(?:cat|sed|awk|tee|less|more)(?:\s|$)|(?:^|[;&(`]|\|\||\$\()\s*(?:head|tail)(?:\s|$)|(?:^|\s)cat(?:\s|$)/.test((JSON.parse(input).tool_input?.command || '').replace(/\d*>&[\d-]/g, ''))) {
        console.error('Blocked: Not allowed to read or edit files with Bash. Use the Read, Edit, and Write tools instead.');
        process.exit(2);
    }

    if (/(?:^|\s)\d*>>?\s*[^&=\s]/.test((JSON.parse(input).tool_input?.command || '').replace(/\d*>&[\d-]/g, ''))) {
        console.error('Blocked: Not allowed to write files with shell redirection. Use the Write or Edit tool instead.');
        process.exit(2);
    }

    process.exit(0);
});
