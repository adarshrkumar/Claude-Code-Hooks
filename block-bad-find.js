const folders = [
    'scenes',
    'chapters',
    'parts',
    'books',
    'people',
    'locations',
    'uniforms',
    'images',
    'videos',
    'media',
]

let input = '';
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
    const data = JSON.parse(input);
    const V = v => `find ${v} -type f`;

    let F = folders.filter(v => (data.tool_input?.command || '').toLowerCase().includes(V(v))).map(v => V(v));
    if (F.length > 0) {
        console.error(`Blocked: Not allowed to use find commands instead of a simple \`ls\`. This is called overheadfucking. Commands blocked: "${F.join(', ')}". Must use an \`ls\` instead`);
        process.exit(2);
    }

    process.exit(0);
});
