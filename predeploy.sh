#!/usr/bin/env sh
set -e

REPO_NAME=$(node -p "require(\"git-repo-name\").sync()")
BUILD_OUTPUT=./docs/app

[ -d $BUILD_OUTPUT ] && rimraf $BUILD_OUTPUT

pnpm build -- --baseHref=\"/$REPO_NAME/\" --outputPath=\"$BUILD_OUTPUT\"
mv $BUILD_OUTPUT/browser/* ./docs/app
rimraf --glob $BUILD_OUTPUT/{browser,server}
cnp

exit $?