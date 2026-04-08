# Git Commands Cheatsheet

## Table of Contents
1. [Initial Setup & Configuration](#1-initial-setup--configuration)
2. [SSH Key Setup](#2-ssh-key-setup)
3. [Creating & Cloning Repositories](#3-creating--cloning-repositories)
4. [Basic File Operations](#4-basic-file-operations)
5. [Staging & Committing](#5-staging--committing)
6. [Branching](#6-branching)
7. [Remote Operations](#7-remote-operations)
8. [Syncing with Remote](#8-syncing-with-remote)
9. [Viewing History & Changes](#9-viewing-history--changes)
10. [Undoing Changes](#10-undoing-changes)
11. [Stashing](#11-stashing)
12. [Tags & Releases](#12-tags--releases)
13. [Inspection & Comparison](#13-inspection--comparison)
14. [Gitignore](#14-gitignore)
15. [Advanced Operations](#15-advanced-operations)
16. [GitHub/GitLab Specific](#16-githubgitlab-specific)

---

## 1. Initial Setup & Configuration

### Set your identity (required before first commit)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Set your identity for a single repo only
```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Set default branch name
```bash
git config --global init.defaultBranch main
```

### Set default editor
```bash
git config --global core.editor vim
git config --global core.editor code --wait  # VS Code
```

### List all configuration
```bash
git config --list
git config --list --show-origin  # Shows file location of each setting
```

### Set up credential caching (avoids re-entering password)
```bash
git config --global credential.helper cache        # Linux/Mac
git config --global credential.helper store        # Stores permanently (less secure)
git config --global credential.helper manager      # Windows - Git Credential Manager
```

### Set line ending preference (cross-platform)
```bash
git config --global core.autocrlf input    # Linux/Mac: LF only
git config --global core.autocrlf true     # Windows: Auto-convert CRLF to LF
```

### Create shortcut (alias) for common commands
```bash
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'
```

### View/edit global config file
```bash
git config --global --edit
```

---

## 2. SSH Key Setup

### Check for existing SSH keys
```bash
ls -la ~/.ssh
```

### Generate a new SSH key (Ed25519 - recommended)
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
# Or RSA (older but widely compatible)
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"
```

### Add SSH key to ssh-agent
```bash
eval "$(ssh-agent -s)"                    # Start ssh-agent
ssh-add ~/.ssh/id_ed25519                # Add your private key
```

### Add SSH key to your GitHub account
```bash
cat ~/.ssh/id_ed25519.pub                 # Copy output to GitHub > Settings > SSH Keys
```

### Add SSH key to your GitLab account
```bash
cat ~/.ssh/id_ed25519.pub                 # Copy output to GitLab > Preferences > SSH Keys
```

### Test SSH connection
```bash
ssh -T git@github.com                     # GitHub
ssh -T git@gitlab.com                     # GitLab
ssh -T git@bitbucket.org                  # Bitbucket
```

### Use specific SSH key for a host
```bash
# Add to ~/.ssh/config:
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_ed25519
    IdentitiesOnly yes
```

### Clone using SSH (instead of HTTPS)
```bash
git clone git@github.com:username/repository.git
git clone git@gitlab.com:username/repository.git
```

---

## 3. Creating & Cloning Repositories

### Clone an existing repository
```bash
git clone https://github.com/user/repo.git                     # HTTPS
git clone git@github.com:user/repo.git                         # SSH
git clone git@github.com:user/repo.git my-folder               # Clone to specific folder
git clone --depth 1 https://github.com/user/repo.git           # Shallow clone (single commit)
git clone --branch branch-name https://github.com/user/repo.git # Clone specific branch
```

### Initialize a new repository
```bash
git init                                  # Create .git in current directory
git init repo-name                        # Create folder and initialize
git init --initial-branch=main            # Set default branch
```

### Remote a repository (after git init)
```bash
git remote add origin https://github.com/user/repo.git
git remote add upstream https://github.com/original/repo.git   # For forks
git remote -v                             # List remotes
git remote rename origin old-origin       # Rename remote
git remote set-url origin git@github.com:user/repo.git # Change URL (e.g., HTTPS to SSH)
```

---

## 4. Basic File Operations

### Check repository status
```bash
git status                                # Full status
git status -s                             # Short format
git status -sb                            # Short with branch info
```

### Track new files (add to staging)
```bash
git add filename.txt                      # Add specific file
git add file1.txt file2.txt               # Add multiple files
git add *.txt                             # Add all matching files
git add .                                 # Add all changes in current directory
git add -A                                # Add all changes (entire repo)
git add --patch                           # Interactive staging (hunk by hunk)
```

### Remove files
```bash
git rm filename.txt                       # Remove from working tree and staging
git rm --cached filename.txt              # Remove from staging only (untrack)
git rm -r directory/                      # Remove directory recursively
```

### Move/rename files
```bash
git mv oldname.txt newname.txt            # Git-aware rename
# Equivalent to: mv oldname.txt newname.txt && git rm oldname.txt && git add newname.txt
```

### Copy files (Git doesn't track copies, only modifications)
```bash
cp existing.txt new.txt && git add new.txt
```

---

## 5. Staging & Committing

### Stage changes
```bash
git add filename                          # Stage specific file
git add -u                                # Stage modified tracked files only (no new files)
git add -A                                # Stage everything
git add .                                 # Stage current directory changes
```

### Commit changes
```bash
git commit -m "Commit message"            # Commit staged changes
git commit -am "Commit message"           # Add all tracked changes and commit (skip staging)
git commit --amend                        # Modify last commit (change message or add files)
git commit --amend --no-edit              # Amend without changing message
```

### Interactive commit
```bash
git commit -v                             # Verbose mode (shows diff in editor)
git commit -e                            # Open default editor with diff
```

### Commit message best practices
```
feat: add user authentication
fix: resolve login timeout issue
docs: update README
style: format code (no logic change)
refactor: restructure payment module
test: add unit tests for auth
chore: update dependencies
```

### Empty commit (for CI/CD triggers)
```bash
git commit --allow-empty -m "Trigger CI build"
```

---

## 6. Branching

### List branches
```bash
git branch                                # List local branches
git branch -a                             # List all (local + remote)
git branch -r                             # List remote branches only
git branch -vv                            # List with tracking info
```

### Create branches
```bash
git branch new-branch                     # Create but don't switch
git branch new-branch main                # Create from specific branch
git checkout -b new-branch                # Create and switch
git switch -c new-branch                  # Create and switch (modern)
git switch -c new-branch main            # Create from specific branch
git checkout -b new-branch origin/main    # Create from remote branch
```

### Switch branches
```bash
git checkout branch-name                 # Switch to branch
git switch branch-name                    # Modern switch
git switch -                              # Switch to previous branch
git checkout -                            # Abbreviation for previous
```

### Rename branches
```bash
git branch -m old-name new-name           # Rename current branch
git branch -M old-name new-name          # Force rename (if new-name exists)
```

### Delete branches
```bash
git branch -d branch-name                 # Delete (safe - won't delete unmerged)
git branch -D branch-name                  # Force delete (even if unmerged)
git push origin --delete branch-name      # Delete remote branch
```

### Merge branches
```bash
git merge branch-name                     # Merge into current branch
git merge --no-ff branch-name             # Merge with a merge commit (even if fast-forward)
git merge --squash branch-name            # Squash all commits into one
git merge --abort                         # Cancel merge in progress
```

### Rebase (alternative to merge)
```bash
git rebase main                           # Rebase current branch onto main
git rebase -i main                        # Interactive rebase (rewrite history)
git rebase --onto new-base old-base branch  # Rebase branch onto different base
git rebase --continue                     # Continue after resolving conflicts
git rebase --abort                        # Cancel rebase
```

---

## 7. Remote Operations

### List remotes
```bash
git remote -v                             # Verbose list
git remote show origin                    # Show remote details
```

### Add/remove remotes
```bash
git remote add origin https://github.com/user/repo.git
git remote add upstream https://github.com/original/repo.git
git remote remove origin
```

### Change remote URL
```bash
git remote set-url origin https://github.com/user/repo.git
git remote set-url origin git@github.com:user/repo.git
```

### Fetch from remote
```bash
git fetch                                # Fetch all remotes
git fetch origin                          # Fetch from origin
git fetch --all                           # Fetch all remotes
git fetch --prune                         # Fetch and remove deleted remote branches
```

---

## 8. Syncing with Remote

### Push (upload to remote)
```bash
git push                                  # Push to default remote/branch
git push origin main                      # Push main to origin
git push -u origin feature-branch         # Push and set upstream (track)
git push origin --delete branch-name      # Delete remote branch
git push --force                          # Force push (dangerous!)
git push --force-with-lease              # Safer force push
git push --tags                           # Push all tags
```

### Pull (fetch + merge)
```bash
git pull                                  # Pull current branch
git pull origin main                      # Pull main from origin
git pull --rebase                         # Pull with rebase instead of merge
git pull --rebase=preserve               # Rebase, preserving merges
```

### Fetch (download but don't merge)
```bash
git fetch origin                          # Download objects/refs
git fetch --all                           # Fetch all remotes
git fetch --prune                         # Fetch and prune deleted branches
```

### Sync fork with upstream
```bash
git fetch upstream                        # Fetch from upstream
git merge upstream/main                   # Merge upstream into your branch
# OR
git rebase upstream/main                  # Rebase onto upstream
```

---

## 9. Viewing History & Changes

### View commit history
```bash
git log                                   # Full log
git log --oneline                         # One line per commit
git log --oneline --graph                 # With ASCII graph
git log --oneline -10                     # Last 10 commits
git log --author="name"                   # Filter by author
git log --since="2024-01-01"              # Filter by date
git log --grep="fix"                      # Filter by commit message
git log -p filename.txt                  # Show changes for specific file
git log --stat                            # Show file change statistics
git log --graph --all --oneline           # Visual branch history
```

### View specific commit
```bash
git show <commit-hash>                   # Show commit details
git show HEAD~3                           # Show 3 commits ago
git show :0:filename.txt                 # Show file from index (staged)
```

### View diffs
```bash
git diff                                  # Diff of unstaged changes
git diff --staged                         # Diff of staged changes
git diff HEAD                             # Diff of all changes vs HEAD
git diff branch1..branch2                 # Diff between branches
git diff HEAD~3 HEAD                      # Diff for last 3 commits
git diff --stat                           # Diff summary (files changed, insertions, deletions)
git diff --name-only                      # Only list changed file names
git diff HEAD~5 --name-only               # Files changed in last 5 commits
```

---

## 10. Undoing Changes

### Discard uncommitted changes
```bash
git checkout -- filename.txt              # Discard changes to file (before staging)
git restore filename.txt                  # Restore file to last commit (modern)
git restore --source=HEAD~1 filename.txt # Restore from specific commit
git checkout .                            # Discard all unstaged changes
git restore .                             # Discard all unstaged changes (modern)
```

### Unstage files (remove from staging)
```bash
git reset HEAD filename.txt              # Unstage single file
git restore --staged filename.txt         # Unstage (modern)
git reset HEAD .                          # Unstage all
git restore --staged .                    # Unstage all (modern)
```

### Undo commits
```bash
git reset --soft HEAD~1                  # Undo last commit, keep changes staged
git reset --mixed HEAD~1                 # Undo last commit, keep changes unstaged (default)
git reset --hard HEAD~1                  # Undo commit, discard ALL changes (DANGEROUS!)
git reset --hard origin/main             # Reset to remote state
```

### Revert a commit (creates new commit that undoes changes)
```bash
git revert HEAD                           # Revert last commit
git revert <commit-hash>                  # Revert specific commit
git revert --no-commit HEAD~3..HEAD       # Revert range without committing
```

### Reset vs Revert
- **Reset**: Rewrites history (use for local commits only)
- **Revert**: Creates new commit (safe for shared history)

---

## 11. Stashing

Stashing temporarily saves uncommitted changes so you can switch branches or pull.

### Basic stash operations
```bash
git stash                                 # Stash current changes
git stash push -m "Work in progress"      # Stash with message
git stash save "message"                  # Stash with message (older syntax)
git stash pop                             # Apply stash and remove from stash list
git stash apply                           # Apply stash but keep it in list
git stash apply stash@{2}                 # Apply specific stash
```

### List stashes
```bash
git stash list                            # List all stashes
```

### Show stash contents
```bash
git stash show                            # Show summary
git stash show -p                         # Show full diff
git stash show stash@{0}                  # Show specific stash
```

### Manage stashes
```bash
git stash drop stash@{0}                  # Delete specific stash
git stash clear                           # Delete all stashes
git stash branch new-branch stash@{0}     # Create branch from stash
```

### Partial stash
```bash
git stash -p                             # Interactive partial stash (select specific changes)
```

---

## 12. Tags & Releases

### List tags
```bash
git tag                                   # List all tags
git tag -l "v1.*"                         # List tags matching pattern
```

### Create tags
```bash
git tag v1.0.0                            # Lightweight tag at current commit
git tag -a v1.0.0 -m "Version 1.0.0"      # Annotated tag with message
git tag -a v1.0.0 <commit-hash>           # Tag specific commit
git tag -a v0.1.0 -m "Alpha release" develop  # Tag on different branch
```

### View tag info
```bash
git show v1.0.0                           # Show tag details and commit
git tag -n                                # Show tag messages
```

### Push tags
```bash
git push origin v1.0.0                    # Push single tag
git push origin --tags                    # Push all tags
git push --follow-tags                   # Push only annotated tags
```

### Delete tags
```bash
git tag -d v1.0.0                         # Delete local tag
git push origin --delete v1.0.0           # Delete remote tag
```

---

## 13. Inspection & Comparison

### Blame (who changed what)
```bash
git blame filename.txt                    # Show who changed each line
git blame -L 10,20 filename.txt          # Blame specific line range
```

### Bisect (find buggy commit)
```bash
git bisect start                          # Start bisect
git bisect bad                            # Mark current commit as bad
git bisect good v1.0.0                    # Mark known good commit
git bisect good                           # When test passes
git bisect bad                            # When test fails
git bisect reset                          # End bisect
```

### Grep (search commits, files, etc.)
```bash
git grep "search term"                    # Search tracked files
git grep "term" v1.0.0                    # Search at specific tag
git log --grep="term"                    # Search commit messages
```

### Shortcuts
```bash
git rev-parse HEAD                        # Get current commit hash
git rev-parse --short HEAD               # Short hash
git symbolic-ref HEAD                    # Current branch name
git rev-parse --abbrev-ref HEAD          # Short branch name
```

---

## 14. Gitignore

### Common patterns
```
# Comments

# Ignore all .log files
*.log

# Ignore specific file
config.txt

# Ignore entire directory
logs/
build/
node_modules/

# But not this specific file (negation)
!important.log

# Ignore files in root only
/*.txt

# Ignore files in any subdirectory
**/*.tmp

# Ignore .txt in current directory only
*.txt
```

### Create .gitignore for common languages
```bash
# Node.js
curl -o .gitignore https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore

# Python
curl -o .gitignore https://raw.githubusercontent.com/github/gitignore/main/Python.gitignore

# Java
curl -o .gitignore https://raw.githubusercontent.com/github/gitignore/main/Java.gitignore
```

### Untrack already committed files
```bash
git rm --cached filename.txt              # Remove from index
git rm -r --cached .                      # Remove all cached files
# Then commit the changes
```

### Check if file is ignored
```bash
git check-ignore -v filename.txt          # Shows which rule ignores the file
git status --ignored                      # Shows ignored files
```

---

## 15. Advanced Operations

### Clean (remove untracked files)
```bash
git clean -n                             # Dry run (preview)
git clean -f                             # Remove untracked files
git clean -fd                            # Remove untracked files and directories
git clean -fX                            # Remove only ignored files
git clean -fx                            # Remove all (ignored + not ignored)
```

### Cherry-pick (apply specific commits)
```bash
git cherry-pick <commit-hash>            # Apply commit to current branch
git cherry-pick <commit-hash>..<commit-hash>  # Apply range
git cherry-pick --continue                # After resolving conflicts
git cherry-pick --abort                  # Cancel cherry-pick
```

### Work with submodules
```bash
git submodule add https://github.com/user/repo.git path/to/submodule
git submodule init                        # Initialize submodules
git submodule update                      # Update submodules
git submodule update --init --recursive   # Update all submodules
git submodule deinit -f path/to/submodule # Remove submodule
```

### Bundle (create archive)
```bash
git bundle create backup.bundle HEAD~10..HEAD
git bundle verify backup.bundle
git clone backup.bundle -b branch-name
```

### Reflog (recovery)
```bash
git reflog                                # View all ref updates
git reflog --date=relative                # With relative dates
git checkout HEAD@{2}                     # Go to state 2 operations ago
git reset --hard HEAD@{5}                # Reset to state 5 operations ago
```

### Archive repository
```bash
git archive -o ../backup.tar HEAD         # Create tar archive
git archive -o ../backup.zip HEAD         # Create zip archive
git archive -o ../backup.tar HEAD --prefix=project/  # With prefix
```

---

## 16. GitHub/GitLab Specific

### GitHub CLI
```bash
gh auth login                             # Authenticate with GitHub
gh repo clone user/repo                   # Clone via GitHub CLI
gh repo create                            # Create new repo
gh repo fork                              # Fork a repo
gh pr create                              # Create pull request
gh pr merge                               # Merge PR
gh issue create                           # Create issue
gh release create                         # Create release
gh workflow run                           # Trigger workflow
```

### GitHub Actions basics
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm test
```

### GitLab CLI
```bash
glab auth login                           # Authenticate with GitLab
glab repo clone user/repo                 # Clone via GitLab CLI
glab mr create                            # Create merge request
glab mr merge                             # Merge MR
glab issue create                         # Create issue
```

### Work with Pull Requests/Merge Requests locally
```bash
# GitHub
git fetch origin pull/123/head:pr-123    # Fetch PR locally
git checkout pr-123                      # Work on PR

# GitLab
git fetch origin merge-requests/123/head:mr-123
git checkout mr-123
```

### GitHub Codespaces
```bash
# Open in codespaces
gh codespace create --repo user/repo
gh codespace ssh                         # SSH into codespace
gh codespace stop                        # Stop codespace
```

---

## Quick Reference Card

### Essential Daily Commands
```bash
# Start working
git switch main && git pull              # Update local main
git checkout -b feature/my-feature       # Create feature branch

# Throughout the day
git add .                                 # Stage changes
git commit -m "description"               # Commit
git push -u origin HEAD                  # Push to remote

# Before merging
git fetch origin                         # Get latest
git rebase origin/main                   # Rebase on latest
git push --force-with-lease             # Update remote

# Resolve conflicts
git status                                # Find conflicts
# Edit conflicted files
git add .
git rebase --continue
git push --force-with-lease
```

### Emergency Recovery
```bash
git reflog                                # Find last good commit
git reset --hard HEAD@{n}               # Reset to good state
git stash                                 # Quick save current state
git stash pop                             # Restore stashed state
```

---

## Common Workflows

### Feature Branch Workflow
```
1. git checkout main && git pull
2. git checkout -b feature/my-feature
3. Make changes
4. git add . && git commit -m "description"
5. git push -u origin HEAD
6. Create PR on GitHub/GitLab
7. Merge after approval
8. git checkout main && git pull
```

### Git Flow
```
main: production code (tagged releases)
develop: integration branch
feature/*: new features
release/*: release preparation
hotfix/*: urgent production fixes
```

### Trunk-Based Development
```
1. Keep branches short-lived (< 1 day)
2. Commit to main frequently
3. Use feature flags
4. Integrate and test continuously
```

---

## Troubleshooting

### Connection Issues
```bash
# Test SSH
ssh -T git@github.com

# Use HTTPS instead of SSH
git config --global url."https://github.com/".insteadOf "git@github.com:"

# Update Git
git --version
# On Ubuntu: sudo apt update && sudo apt install git
```

### Permission Denied
```bash
# Fix SSH key permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/id_ed25519
chmod 644 ~/.ssh/id_ed25519.pub

# Add SSH key to agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### Detached HEAD
```bash
# You're in detached HEAD state
git checkout main                         # Return to branch
git checkout -b new-branch                # Or create branch from this state
```

### Large File Issues
```bash
# Install Git LFS
git lfs install
git lfs track "*.psd"
git add .gitattributes
```

### Merge Conflicts
```bash
git merge --abort                         # Cancel merge
git rebase --abort                        # Cancel rebase
git mergetool                             # Open merge tool
```

---

*Last updated: 2026-04-07*
