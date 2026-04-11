# Git Commands Cheat Sheet

## 1. Initial setup (first time on a machine)
```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"

## 2. Intialize the repository

cd /path/to/folder
git init

Add a remote repository
# For SSH
git remote add origin git@github.com:username/repo.git

# Verify
git remote -v

#Stage and commit changes

git add .                 # Stage all changes
git add filename.md       # Stage a single file
git commit -m "Commit message"

# Push changes

git push -u origin main   # Push initial commit and set upstream
git push                  # Push future commits

Pull changes from github

git fetch 
git status
git pull 
git pull origin main

Branching 
git branch                 # List branches
git branch new-branch      # Create new branch
git checkout new-branch    # Switch to branch
git checkout main          # Switch back to main
git push -u origin new-branch   # Push branch to GitHub

Rename Branch 
git branch -M main
