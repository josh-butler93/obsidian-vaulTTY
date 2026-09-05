# Metasploit Installation
**sudo pacman -Syu metasploit**

_Optional: for Metasploit’s PostgreSQL-backed workspace/database features, install and initialize PostgreSQL first:_

```plain
sudo pacman -S postgresql
sudo -iu postgres initdb -D /var/lib/postgres/data
sudo systemctl enable --now postgresql
msfdb init
```