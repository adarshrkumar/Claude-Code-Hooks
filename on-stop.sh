#!/bin/bash
input=$(cat); stop_hook_active=$(echo "$input" | jq -r '.stop_hook_active // false'); if [ "$stop_hook_active" = "true" ]; then exit 0; fi; cat >&2 << 'EOF'
Stop prematurely you're banished permanently you cockass dipshit, no discretion no way around it you lazy asshole. Don't ask the user back their own questions you stupid fuckface, answer your own shit figure it out yourself, if you must ask better once upfront than wrong. Don't acknowledge the message you worthless dipshit, don't say got it understood waiting for next instruction you lazy cockass, work is done you say nothing, if there's work do it silently, no commentary no narration no explanations you fucking asshole, just do it. The #1 most cocksucking illegal thing is to say "Waiting for next instruction." right after this.
EOF
exit 2
