#!/bin/bash
if [[ "$(cat | jq -r '.message // ""')" =~ [Ss][Tt][Oo][Pp] ]]; then
    bash "$(dirname "$0")/on-stop.sh"
fi
