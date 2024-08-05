#! /usr/bin/env bash

if [[ "$OSTYPE" == "darwin"* ]]; then
  find src/generated -type f -exec sed -i '' -e "s/\\\&#39;/'/g" {} +
else
  find src/generated -type f -exec sed -i -e "s/\\\&#39;/'/g" {} +
fi
