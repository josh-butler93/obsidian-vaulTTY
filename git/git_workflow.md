# Example: add a file or folder
git add foldername
git add filename.md

# Stage the changes
git add .          # Stage all changes in the repo
git add file.md    # Stage a single file
git add folder/    # Stage a folder and its contents

# Commit the changes
git commit -m "Describe your changes here"

# Push the changes
git push origin BRANCH_NAME
ex: git push origin main

# Pull changes
git pull orgin BRANCH_NAME

# Branching Basics
git branch                # List branches
git branch new-feature    # Create a new branch
git checkout new-feature  # Switch to that branch
git push -u origin new-feature  # Push branch to GitHub


# Workflow Diagram

   +-------------------+         git add/commit/push        +-------------------+
   |                   |----------------------------------->|                   |
   |   Obsidian Vault  |                                    |     GitHub Repo   |
   |   (Local Files)   |<-----------------------------------|   (Remote Repo)   |
   |                   |         git pull                  |                   |
   +-------------------+                                    +-------------------+
           ^
           |
           | (Optional terminal edits)
           v
   +-------------------+
   |                   |
   | Terminal / CLI    |
   |  git add/commit   |
   |  git push/pull    |
   +-------------------+
