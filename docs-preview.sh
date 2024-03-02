#!/usr/bin/env sh
set -e

build_docs() {
  [ ! -d .vitepress/dist ] && pnpm docs:build
}

force_build_docs() {
  [ -d .vitepress/dist ] && build_docs
}

case $1 in
  "--force") force_build_docs ;;
  "--f") force_build_docs ;;
  *) build_docs;
esac

vitepress preview docs

exit $?