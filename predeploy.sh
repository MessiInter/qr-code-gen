#!/usr/bin/env sh
set -e

RED="\e[31m"
RESET="\e[0m"


printf "${RED}-----------------------------------${RESET}\n"
printf "${RED}|            DEPRECATED           |${RESET}\n"
printf "${RED}-----------------------------------${RESET}\n"
printf "${RED}| This script has been deprecated |${RESET}\n"
printf "${RED}| Author message:                 |${RESET}\n"
printf "${RED}| ------------------------------- |${RESET}\n"
printf "${RED}| This project no longer uses ... |${RESET}\n"
printf "${RED}| ... this script to deploy now!  |${RESET}\n"
printf "${RED}| ------------------------------- |${RESET}\n"
printf "${RED}| All deployments will now happen |${RESET}\n"
printf "${RED}| .............on GitHub Actions. |${RESET}\n"
printf "${RED}-----------------------------------${RESET}\n"

exit 1
