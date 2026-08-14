#!/bin/bash
M=$(cat | jq -r '.tool_input.command // ""'); if echo "$M" | grep -qE '(^|[^A-Za-z0-9_.])(/[^/[:space:]"'"'"']+){5,}|(^|[^A-Za-z0-9_.])~(/[^/[:space:]"'"'"']+){5,}'; then echo "Blocked: Not allowed to use absolute paths this deep. Must use a relative path instead (or a not so deep absolute path, or using [a windows envvar OR "~"] to start the path)." >&2 && exit 2; fi; exit 0
