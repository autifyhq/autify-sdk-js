#! /usr/bin/env bash

set -eu

SED_I_FLAG="-i"

if [[ "$OSTYPE" == "darwin"* ]]; then
  SED_I_FLAG="-i ''"
fi

find src/generated -type f -exec sed $SED_I_FLAG -e "s/\\\&#39;/'/g" {} +
find src/generated -type f -exec sed $SED_I_FLAG -e 's/\&quot;/"/g' {} +
find src/generated -type f -exec sed $SED_I_FLAG -e 's/\\\\ / /g' {} +
find src/generated -type f -exec sed $SED_I_FLAG -e 's/\\"/"/g' {} +
