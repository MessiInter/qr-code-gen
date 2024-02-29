#!/usr/bin/env sh
set -e

REPO_NAME=$(node -p "require(\"git-repo-name\").sync()")

pnpm build -- --baseHref=\"/$REPO_NAME/\" --outputPath=\"./docs/app\"
mv ./docs/app/browser/* ./docs/app
rimraf --glob ./docs/app/{browser,server}
cnp

exit $?