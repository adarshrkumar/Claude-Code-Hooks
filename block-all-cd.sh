#!/bin/bash
M=$(cat | jq -r '.tool_input.command // ""'); if echo "$M" | grep -qE '(^|[[:space:]])cd([[:space:]]|$)'; then echo "Blocked: Not allowed to use cd. Must use relative paths instead." >&2 && exit 2; fi; exit 0
