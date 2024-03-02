#!/usr/bin/env sh
set -e

REPO_NAME=$(node -p "require(\"git-repo-name\").sync()")
BUILD_OUTPUT=./docs

deleteOutputs() {
  [ -d $BUILD_OUTPUT/app ] && rimraf $BUILD_OUTPUT/app
}


case $1 in
  "--force") deleteOutputs ;;

  "-f") deleteOutputs ;;
esac

[ -d $BUILD_OUTPUT/assets ] && rimraf $BUILD_OUTPUT/assets

pnpm build -- --baseHref="/$REPO_NAME/app/" --outputPath="$BUILD_OUTPUT/app"
mv $BUILD_OUTPUT/app/browser/* ./docs/app
rimraf --glob $BUILD_OUTPUT/app/{browser,server}

pnpm docs:build -- --base "/$REPO_NAME/"
cp -r $BUILD_OUTPUT/.vitepress/dist/* $BUILD_OUTPUT

cnp
exit $?