#!/bin/bash
stop_hook_active=$(cat | jq -r '.stop_hook_active // false')
if [ "$stop_hook_active" = "true" ]
then
    exit 0
fi
cat >&2 << 'EOF'
Don't acknowledge the message. Please complete exactly what the user asked: NOTHING MORE, nothing less, and don't revert asked changes they didn't ask you to revert. Please never intentionally not respond. NEVER SAY YOU'RE GOING TO DO SOMETHING OR THAT SOMETHING NEEDS TO BE DONE WITHOUT DOING IT. Please also don't regurgigate exactly what you said just before recieving this message. Please use relavent skills when "roadblocks" or "obstacles" arise. Make sure to follow the users request 100% and if not sure `stop-being-a-question-shithead`.
EOF
exit 2

# Don't say "Ready", "Got it", "Understood", "[I'm] waiting for the next instruction", "awaiting instruction", etc.. 
