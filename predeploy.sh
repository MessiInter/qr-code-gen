#!/usr/bin/env sh
set -e

deleteOutputs() {
  [ -d $BUILD_OUTPUT/app ] && rimraf $BUILD_OUTPUT/app
  [ -d $BUILD_OUTPUT/.vitepress/dist ] && rimraf $BUILD_OUTPUT/.vitepress/dist
}

REPO_NAME=$(node -p "require(\"git-repo-name\").sync()")
BUILD_OUTPUT=./docs

case $1 in
  "--force") deleteOutputs ;;
  "-f") deleteOutputs ;;
esac

[ -d $BUILD_OUTPUT/assets ] && rimraf $BUILD_OUTPUT/assets

pnpm build -- --baseHref="/$REPO_NAME/app/" --outputPath="$BUILD_OUTPUT/app"
mv $BUILD_OUTPUT/app/browser/* ./docs/app
rimraf --glob $BUILD_OUTPUT/app/{browser,server}

pnpm docs:build
mv $BUILD_OUTPUT/.vitepress/dist/* $BUILD_OUTPUT
rimraf $BUILD_OUTPUT/.vitepress/dist

cnp
exit $?