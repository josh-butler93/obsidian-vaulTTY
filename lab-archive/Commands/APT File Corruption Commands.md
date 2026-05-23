Apt keeps a local cache in the below location:
- /var/lib/apt/lists/
	- If something breaks i.e.- bad downloads, repo mismatch, interruption
		- corrupted cache
		- invalid archive
		- failed to fetch

Clean the cache
- command:
	- sudo apt clean

Remove the broken package lists
- command:
	- sudo rm -rf /var/lib/apt/lists/*

Rebuild package lists
- sudo apt update -y

Fix Broken Packages
- sudo apt --fix-broken install

Try the install or update again
- sudo apt install -y <package_name>