#!/bin/bash
M=$(cat | jq -r '.tool_input.command // ""'); if echo "$M" | grep -qE '(^|[[:space:]])cat([[:space:]]|$)'; then echo "Blocked: cat command is not allowed. Use the Read tool instead." >&2 && exit 2; fi; exit 0
