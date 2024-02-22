#!/bin/sh

set -e

find /usr/src/app/ \
  -type f \
  -name '*.*' \
  -exec sed -i "s+%%NEXT_PUBLIC_API_URL%%+${NEXT_PUBLIC_API_URL:?}+g" '{}' \; \


pm2-runtime /usr/src/app/server.js