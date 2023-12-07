#!/bin/bash

LANG=C.UTF-8

git add --all

git -c color.status=false status \
  | sed -n -r -e '1,/Changes to be committed:/ d' \
              -e '/Changes not staged for commit:/ d' \
              -e '/(use "git add <file>..." to update what will be committed)/ d' \
              -e '/(use "git restore <file>..." to discard changes in working directory)/ d' \
              -e '/(use "git restore --staged <file>..." to unstage)/ d' \
              -e '1,1 d' \
              -e '/^Untracked files:/,$ d' \
              -e 's/^\s*//' \
              -e '/./p' \
  | awk '!seen[$0]++' \
  | tr -s ' ' \
  | git commit -F -

git push -u origin $(git rev-parse --abbrev-ref HEAD)