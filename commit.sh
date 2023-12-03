#!/bin/bash
LANG=C.UTF-8 git -c color.status=false status \
  | sed -n -r -e '1,/Changes to be commited:/ d' \
  -e '1,1 d' \
  -e '/^Untracked files:/,$ d' \
  -e 's/^\s*//' \
  -e '/./p' \
  | git commit -m - \
  && git push