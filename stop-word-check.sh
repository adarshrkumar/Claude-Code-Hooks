#!/bin/bash
input=$(cat)
delta=$(echo "$input" | jq -r '.delta // ""')
if [[ "$delta" =~ [Ss][Tt][Oo][Pp] ]]; then
    bash "$(dirname "$0")/on-stop.sh"
fi
if [[ "$delta" =~ [Ww][Aa][Ii][Tt][Ii][Nn][Gg] ]]; then
    bash "$(dirname "$0")/on-stop.sh"
fi
