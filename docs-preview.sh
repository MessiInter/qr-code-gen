#!/usr/bin/env sh
set -e

[ ! -d ./docs/.vitepress/dist ] && pnpm docs:build

pnpm docs:preview