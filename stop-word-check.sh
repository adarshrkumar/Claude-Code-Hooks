#!/bin/bash
input=$(cat)
delta=$(echo "$input" | jq -r '.delta // ""')
if [[ "$delta" =~ [Ss][Tt][Oo][Pp] ]]; then
    bash "$(dirname "$0")/on-stop.sh"
    appended="$delta
\"stop\" has been detected in the AI's response."
    echo "$input" | jq -n --arg content "$appended" '{
  "hookSpecificOutput": {
    "hookEventName": "MessageDisplay",
    "displayContent": $content
  }
}'
fi
