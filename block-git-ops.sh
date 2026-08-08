#!/bin/bash
M=$(cat | jq -r '.tool_input.command // ""'); if echo "$M" | grep -qE '(^|[[:space:]])git[[:space:]](checkout|reset|stash|branch)([[:space:]]|$)'; then echo "Blocked: Certain git operations are not allowed. Must not use checkout, reset, stash, and branch operations." >&2 && exit 2; fi; exit 0
