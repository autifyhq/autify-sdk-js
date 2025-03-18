#! /usr/bin/env bash

set -eu

# Handle sed differently based on OS
if [[ "$OSTYPE" == "darwin"* ]]; then
  # On macOS, sed requires an extension argument (even if empty)
  find src/generated -type f -exec sed -i "" -e "s/\\\&#39;/'/g" {} +
  find src/generated -type f -exec sed -i "" -e 's/\&quot;/"/g' {} +
  find src/generated -type f -exec sed -i "" -e 's/\\\\ / /g' {} +
  find src/generated -type f -exec sed -i "" -e 's/\\"/"/g' {} +
else
  # On Linux and other systems
  find src/generated -type f -exec sed -i -e "s/\\\&#39;/'/g" {} +
  find src/generated -type f -exec sed -i -e 's/\&quot;/"/g' {} +
  find src/generated -type f -exec sed -i -e 's/\\\\ / /g' {} +
  find src/generated -type f -exec sed -i -e 's/\\"/"/g' {} +
fi
