#!/usr/bin/env sh

concurrently -p "[{name}]" \
  -c "bgGray.bold,bgYellow.bold" -n "HUSKY,PNPM" \
  "husky install" \
  "pnpm link -g"

exit $?