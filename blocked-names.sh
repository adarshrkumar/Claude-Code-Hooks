#!/bin/bash
set -euo pipefail
command -v jq >/dev/null || { echo "jq not installed" >&2; exit 2; }

MALE=(alexander benjamin christopher daniel david davis charles edward ethan james marcus matthew michael robert stephen thomas)
FEMALE=(aurora clara dorothy dorothea eden eleanor elena emma emily faye grace hope iris jennifer june lily lisa luna margaret maya mia natalie olive patricia patty rose sage sara sarah sophia sophie tara victoria violet zara)
LAST=(anderson ashford bennett chen cooper jackson mercer miller mitchell patterson rivera sterling torres turner ward wells white winters)
N=$(printf '%s\n' "${MALE[@]}" "${FEMALE[@]}" "${LAST[@]}" 2>/dev/null | paste -sd '|' - || echo "")
E=$(printf '%s' "$*" | tr ' ' '|')

M=$(cat | jq -r '[(.tool_input.new_string? // empty),(.tool_input.content? // empty),(.tool_input.new_source? // empty)] | join("\n")')

[ -z "$N" ] && exit 0
if printf '%s' "$M" | grep -iqEw "($N)"; then
    H=$(printf '%s' "$M" | grep -ioEw "($N)" | paste -sd ',' -)
    if [ -z "$E" ] || ! printf '%s' "$H" | grep -iqEw "($E)"; then
        echo "Blocked: the name(s) '$H' are not allowed. Choose a different name." >&2
        exit 2
    fi
fi
exit 0
