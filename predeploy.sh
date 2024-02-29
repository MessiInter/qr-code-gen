#!/usr/bin/env sh
set -e

REPO_NAME=$(node -p "require(\"git-repo-name\").sync()")

pnpm build -- --baseHref=\"/$REPO_NAME/\" --outputPath=\"./docs\"
mv ./docs/browser/* ./docs
rimraf --glob ./docs/{browser,server}
cnp

exit $?