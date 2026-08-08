#!/bin/bash
M=$(cat | jq -r '.tool_input.command // ""'); if echo "$M" | grep -qE '(^|[[:space:]])git[[:space:]]+-C([[:space:]]|$)'; then echo "Blocked: Not allowed to use git -C. Must work in current directory only." >&2 && exit 2; fi; exit 0
