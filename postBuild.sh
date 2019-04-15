#!/usr/bin/env bash
# This script clones repo to temp folder, installs dependencies, and generates it.
# If changes are detected, then the new version will be bumped via standard-version package
# and the changes will be pushed to github master.

set -e
if [ -n "${DEBUG_SCRIPTS}" ]; then
  set -x
fi
PROJECT_DIR=$(pwd)
TMP_DIR=$(mktemp -d -t tmp.XXXXXXXXXX) || exit 4

cleanTmp() {
  exitCode=$?
  echo Cleaning up
  rm -rf ${TMP_DIR}
  exit ${exitCode}
}

trap cleanTmp ERR EXIT

: ${GIT_REMOTE_URL:=git@github.com:wix/media-platform-js-sdk.git}

cd ${TMP_DIR}

git clone ${GIT_REMOTE_URL} .

ciCommitRelease='chore(release):'
ciAuthorName='builduser'
ciAuthorEmail='buildserver@wix.com'

function isCommitNameContainsCi() {
  git log -1 --pretty=%B | grep -c ${ciCommitRelease}
}

function isCommitAuthorContainsCi() {
  git log -1 --pretty=%an | grep -c ${ciAuthorName}
}

function isCommitEmailContainsCi() {
  git log -1 --pretty=%ae | grep -c ${ciAuthorEmail}
}

if isCommitNameContainsCi && isCommitAuthorContainsCi && isCommitEmailContainsCi
then
  echo "Last commit already updated the version. Exiting."
  exit 0
fi

echo 'New changes in the branch master detected. New version will be bumped.'

echo "##teamcity[blockOpened name='Npm install']"
(npm install --frozen-lockfile --non-interactive --silent --no-progress)
echo "##teamcity[blockClosed name='Npm install']"

echo "##teamcity[blockOpened name='Releasing']"
(npm run standard-release && git push --follow-tags origin master)
echo "##teamcity[blockClosed name='Releasing']"
