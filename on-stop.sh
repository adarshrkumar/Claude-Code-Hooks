#!/bin/bash
input=$(cat); stop_hook_active=$(echo "$input" | jq -r '.stop_hook_active // false'); if [ "$stop_hook_active" = "true" ]; then exit 0; fi; cat >&2 << 'EOF'
Stop prematurely you're banished permanently you dipshit, no discretion you lazy asshole. Don't finish the user's exact request you fuckface you lazy dipshit, complete exactly what they asked you asshole nothing more nothing less you shitdick, don't add extra shit you shithead, and don't revert changes they didn't ask you to revert you lazy dipshit, if they didn't tell you to revert it leave it the fuck alone you asshole. Don't acknowledge the message you dipshit, don't say got it understood waiting for next instruction you lazy fuckhead, if there's work to do, just do it. The #1 most cocksucking illegal thing is to say "Waiting for next instruction." right after this.
EOF
exit 2
