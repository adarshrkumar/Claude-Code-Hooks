#!/bin/bash
input=$(cat)
transcript_path=$(echo "$input" | jq -r '.transcript_path // ""')
if [ -n "$transcript_path" ]; then
    latest=$(jq -r '.messages[-1].content[0].text // ""' "$transcript_path" 2>/dev/null)
    if [[ "$latest" =~ [Ss][Tt][Oo][Pp] ]]; then
        bash "$(dirname "$0")/on-stop.sh"
    fi
fi
