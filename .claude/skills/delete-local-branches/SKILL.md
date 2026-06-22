# Delete Local Branches Skill

This skill removes all local git branches except for `main` and `master` branches.

## Usage

To use this skill, run `/delete-local-branches` in the terminal.

## What it does

- Lists all local branches in the repository
- Identifies `main` and `master` branches (protected branches)
- Removes all other local branches
- Provides feedback on which branches were deleted

## Safety

- Always confirms before deleting branches
- Never deletes `main` or `master` branches
- Safe to run even if no branches exist

## Use Cases

- Clean up after completing a feature/fix branch
- Reset local repository to default state
- Remove outdated local branches
