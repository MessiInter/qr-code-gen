#!/usr/bin/env sh
set -e

BUILD_OUTPUT=./docs/.vitepress/dist

[ ! -d $BUILD_OUTPUT ] && pnpm docs:build

pnpm docs:preview