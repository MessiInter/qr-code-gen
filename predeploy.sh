#!/usr/bin/env sh
set -e

REPO_NAME=$(node -p "require(\"git-repo-name\").sync()")
BUILD_OUTPUT=./docs

[ -d $BUILD_OUTPUT/{app,.vitepress/dist} ] && rimraf --glob $BUILD_OUTPUT/{app,.vitepress/dist}

pnpm build -- --baseHref="/$REPO_NAME/app/" --outputPath="$BUILD_OUTPUT/app"
mv $BUILD_OUTPUT/app/browser/* ./docs/app
rimraf --glob $BUILD_OUTPUT/app/{browser,server}

pnpm docs:build

cnp
exit $?