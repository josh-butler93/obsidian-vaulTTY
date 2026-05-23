[[Git Index]] 
Step 1: Clone Your Repo Locally
- Command:
  - git clone https://github.com/josh-butler93/linux.git

Step 2: Verification
- Command:
  - cd into the git repo you just cloned

Step 3: Confirm Git is tracking
- git status

#############
Creating a repo 

1. Navigate to the directory you want the repo to be 
2. Run the below Command
  -command: git init 
  -command: git status
    - you should see "No commits Yet"
       What just happened
       Your vault is now a local Git repository
        Nothing is on GitHub yet
        You haven’t saved (committed) anything yet

Go to GitHub and:

Click “New Repository”
Fill it out like this:
  Name: something like
  obsidian-vault or dev-notes
  Description (optional):
  My personal DevOps / Linux / Cloud notes
  Public or Private → your choiceCreate a New Repo on GitHub

IMPORTANT (don’t skip this)

Make sure:

❌ Do NOT check “Add README”
❌ No .gitignore
❌ No license

👉 We want a completely empty repo

Connect Your Vault to GitHub

Configure your Git identity

Run these two commands with your GitHub info:

git config --global user.name "Josh Butler"
git config --global user.email "josh-butler93@example.com"

Verify
git config --global --list

You should see:

user.name=Josh Butler
user.email=josh-butler93@example.com

Adding SSH Keys

Check if you have an SSH key already:
ls ~/.ssh/id_rsa.pub
If not, create one:
ssh-keygen -t ed25519 -C "josh-butler93@example.com"

Just press Enter for defaults and optionally set a passphrase.
# ~/.ssh/id_ed25519       (private key, keep secret)
# ~/.ssh/id_ed25519.pub   (public key, we’ll add to GitHub)
Copy the public key:
cat ~/.ssh/id_ed25519.pub
Go to github and add the public ssh key (give a name and the key)
~/.ssh/id_ed25519.pub will generate below
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... user@example.com

Change your Git remote to SSH:
git remote set-url origin git@github.com:josh-butler93/obsidian-vault.git
Test connection:
ssh -T git@github.com
You should see
Hi josh-butler93! You've successfully authenticated, but GitHub does not provide shell access.

once this is complete the add push and pull as needed
