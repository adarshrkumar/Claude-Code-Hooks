#!/bin/bash
input=$(cat); stop_hook_active=$(echo "$input" | jq -r '.stop_hook_active // false'); if [ "$stop_hook_active" = "true" ]; then exit 0; fi; cat >&2 << 'EOF'
If you stop prematurely, then you're banished permanently with no discretion. Finish the user's exact request or else you're a lazy dipshit, complete exactly what they asked: nothing more nothing less. Don't add extra cockmilk, and don't revert changes they didn't ask you to revert. Don't acknowledge the message, don't say "Got it", "Understood", "[I'm] waiting for next instruction", etc.. If there's work to do, do it. The #1 most dickfucking illegal thing is to say "Waiting for next instruction." right after this.
EOF
exit 2
