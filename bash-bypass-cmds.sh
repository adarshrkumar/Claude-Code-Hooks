#!/bin/bash
M=$(cat | jq -r '.tool_input.command // ""'); if echo "$M" | grep -qE '(^sh[[:space:]]|[[:space:]]sh[[:space:]]|^bash[[:space:]]|[[:space:]]bash[[:space:]]|^zsh[[:space:]]|[[:space:]]zsh[[:space:]])'; then echo "Blocked: Direct shell invocation is not allowed. Must run the command directly." >&2 && exit 2; fi; exit 0
