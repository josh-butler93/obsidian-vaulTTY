# Git Commands Cheat Sheet

## 1. Initial setup (first time on a machine)
```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@example.com"
git config --list
git config --list --show-origin

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

---Setting up Git workspace

*mkdir git-staging-lab && cd git-staging-lab
*git init
*echo "print ('Hello, Git!')" > hello.py
==Adding files to staging Area
	*git add hello.py
		*side command: git rm -cache <file> is used to unstage a commit
	*git status
	*echo "*.log" > .gitignore
	*echo "This is a log file" > debug.log
		*git status # you will not see the debug.log file in there but the .gitignore file will be listed
		==.gitignore log file can ignore specific files/directories or using pattern maktching ot ignore files matching certain criteria
	*git add .gitignore
	*git commit -m "Initial commit with hello.py and .gitignore"

---Viewing changes with git diff
	*echo "print("Hello, Git! Welcome to the stagin area.')" > hello.py
	*git diff --> this will show the differences between the changes
	*git diff --staged -->This command will show the changes you've staged but haven't commit yet

---Unstaged Changes
	* git add hello.py
	* git restore --staged hello.py 
	*git status
