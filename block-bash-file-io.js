let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    if (/(?<![\w.-])(?:perl\s+-\w*[eE]|ruby\s+-\w*e|php\s+-r|osascript\s+-e|bun\s+(?:-e|--eval)|deno\s+eval|lua\s+-e|swift\s+-e|tclsh|(?:npx|npm\s+exec)\s+(?:[^;&|]*\s)?(?:-c|--call)|python[\d.]*\s+-m\s+json\.tool)(?![\w.-])|(?:^|[\s;&|(])(?:node(?:\s+--?[\w-]+(?:=\S+)?)*\s+(?:-e|-p|--eval|--print|-|<<)(?=\s|$|['"])|python[\d.]*(?:\s+--?[\w-]+(?:=\S+)?)*\s+(?:(?:-c|-)(?=\s|$|['"])|<<))/.test(JSON.parse(input).tool_input?.command || '')) {
        console.error('Blocked: Not allowed to edit files with inline scripts. Must use relative Edit() instead.');
        process.exit(2);
    }

    if (/(?<![\w.-])(?:head|tail)(?![\w.-])/.test(JSON.parse(input).tool_input?.command || '')) {
        console.error('Blocked: head and tail are specifically not allowed in Bash. Use the Read tool with offset and limit instead.');
        process.exit(2);
    }

    if (/(?<![\w.-])(?:cat|sed|awk|tee|less|more|tac|nl|od|xxd|hexdump|strings|bat|cut|paste|rev|fold|column|sort|uniq|tr|jq|wc|cmp|comm|join|expand|unexpand|base64|source|vi|vim|nano|touch|ln|dd|eval|zcat|gzcat|bzcat|xzcat|iconv|sqlite3|rsync|ditto|pbcopy|plutil)(?![\w.-])|(?<![\w.-])git\s+(?:grep|cat-file|apply)(?![\w.-])|--no-index|\/dev\/(?:stdout|stderr|tty|fd\/\d)|(?<![\w.-])diff(?![\w.-])[^;&|]*\/dev\/null|(?<![\w.-])unzip\s+(?:[^;&|]*\s)?-\w*p\b|(?<![\w.-])tar\s+(?:[^;&|]*\s)?-\w*O|(?<![\w.-])tar\s+\w*O\w*\s|--to-stdout|(?<![\w.-])curl(?![\w.-])[^;&|]*(?:\s-\w*o\b|--output|file:\/\/)|(?<![\w.-])wget(?![\w.-])[^;&|]*\s-\w*O\b|(?:^|[;&|(`]|\$\()\s*(?:patch|ed|ex|pr)(?=\s|$)|(?:^|[;&|(`]|\$\()\s*\.\s|xargs\s(?:[^;&|]*\s)?-a(?![\w-])|\|\s*(?:perl|ruby|php|lua|node|python[\d.]*|deno|bun)\s*(?:$|[;&|)]|-(?:\s|$))|(?:^|[;&|(`]|\$\()\s*(?:[^\s;&|()\[*?]*[*?]|[^\s;&|()\[*?]+\[|\[[^\s\]]+\])|(?:^|[;&|(`]|\$\()\s*[^\s;&|()=]*\$/i.test((JSON.parse(input).tool_input?.command || '').replace(/['"\\]/g, ''))) {
        console.error('Blocked: Not allowed to read or edit files with Bash. Use the Read, Edit, and Write tools instead.');
        process.exit(2);
    }

    if (/(?:^|[\s(])\d*<(?![<(&])\s*[^\s=]|(?:^|\s)\d*>>?\s*[^&=\s]/.test((JSON.parse(input).tool_input?.command || '').replace(/\d*>&[\d-]/g, ''))) {
        console.error('Blocked: Not allowed to use shell redirection. Use the Read, Write, or Edit tool instead.');
        process.exit(2);
    }

    process.exit(0);
});
