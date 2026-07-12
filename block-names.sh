#!/bin/bash
M=$(cat | jq -r '(.tool_input.new_string // "") + "\n" + (.tool_input.content // "")'); if echo "$M" | grep -iqEw "($(echo "$@" | sed 's/ /|/g'))"; then echo "Blocked: Not allowed to use that name or write it to files. Must use another name instead." >&2 && exit 2; fi; exit 0
