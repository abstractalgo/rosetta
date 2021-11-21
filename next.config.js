const currentGitBranchName = require('current-git-branch');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    GIT_BRANCH: currentGitBranchName(),
  },
};
