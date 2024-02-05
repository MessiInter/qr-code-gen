#!/usr/bin/env sh
set -e

pnpm build -- --baseHref=\"/qr-code-gen/\" --outputPath=\"./docs\"
mv ./docs/browser/* ./docs
rimraf --glob ./docs/{browser,server}
cnp

exit $?