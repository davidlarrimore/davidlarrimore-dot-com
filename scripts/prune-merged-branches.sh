#!/usr/bin/env bash
# Deletes branches (on GitHub and locally) whose pull request has been merged.
# Works with squash merges: it asks GitHub which PRs merged instead of relying on git ancestry.
# A branch is kept if it has no merged PR, or has commits pushed after its PR merged
# whose changes are not on the default branch. A local branch is deleted only when it has
# no commits beyond the remote branch and is not checked out in any worktree.
#
# Usage: scripts/prune-merged-branches.sh        # list, then ask before deleting
#        scripts/prune-merged-branches.sh --yes  # delete without asking
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"
default=$(gh repo view --json defaultBranchRef --jq .defaultBranchRef.name)
git fetch --prune --quiet origin

# head branch -> last commit of each merged PR
merged=$(gh pr list --state merged --limit 500 --json headRefName,headRefOid --jq '.[] | "\(.headRefName) \(.headRefOid)"')

to_delete=()
while read -r branch; do
  [ "$branch" = "$default" ] && continue
  tip=$(git rev-parse "origin/$branch")
  if grep -qx "$branch $tip" <<<"$merged"; then
    to_delete+=("$branch")
  elif grep -q "^$branch " <<<"$merged" && git diff --quiet "origin/$default" "origin/$branch"; then
    to_delete+=("$branch")  # later commits, but every file already matches the default branch
  elif grep -q "^$branch " <<<"$merged"; then
    echo "keep $branch (commits pushed after its PR merged that are not on $default)"
  fi
done < <(git for-each-ref --format='%(refname:lstrip=3)' refs/remotes/origin | grep -vx HEAD)

if [ ${#to_delete[@]} -eq 0 ]; then
  echo "No merged branches to delete."
  exit 0
fi

echo "Merged branches to delete from GitHub and locally:"
printf '  %s\n' "${to_delete[@]}"
if [ "${1:-}" != "--yes" ]; then
  read -r -p "Delete these ${#to_delete[@]} branches? [y/N] " answer
  [[ "$answer" =~ ^[Yy]$ ]] || { echo "Nothing deleted."; exit 0; }
fi

for branch in "${to_delete[@]}"; do
  remote_tip=$(git rev-parse "origin/$branch")
  git push --quiet origin --delete "$branch" && echo "deleted origin/$branch"
  git show-ref --verify --quiet "refs/heads/$branch" || continue
  # Delete the local branch only when every commit on it was on the remote branch,
  # so unpushed local work is never lost.
  if ! git merge-base --is-ancestor "refs/heads/$branch" "$remote_tip"; then
    echo "kept local $branch (has commits that were never pushed)"
  elif ! git branch -D --quiet "$branch" 2>/dev/null; then
    echo "kept local $branch (checked out in a worktree)"
  else
    echo "deleted local $branch"
  fi
done
