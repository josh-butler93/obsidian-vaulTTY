- Command: 
  - apt update -y && apt install -y openssh-server vim net-tools

- Command: 
   - mkdir -p /var/run/sshd 
    - passwd # for initial access with root account

- Command: Paste ssh public key from host machine
  - mkdir -p ~/.ssh 
    - vim ~/.ssh/authorized_keys
      - Command:
        - From host machine 
          - Key Location:
            - cat ~/.ssh/id_ed25519.pub
            - cat ~/.ssh/id_rsa.pub

        - Command: permissions on container
          - chmod 700 ~/.ssh 
          - chmod 600 ~/.ssh/authorized_keys
          - Manually copy pulic ssh keys from another machine to the container to the ssh authorized_keys folder
- Command: Start ssh server 
  - /usr/sbin/sshd 

- Command: ssh into container 
  - ssh root@localhost -p 2222
  - ssh root@podmandesktophostmachineip -p 2222 
    - host:2222 → container:22 (SSH) # its pointing to podman but at port 2222
    - remember to create ssh keys from the machine your trying to remote into the container from and copy them over to the container 

Disable password login (after keys work)

Edit config:

vim /etc/ssh/sshd_config

Set:

PasswordAuthentication no
PermitRootLogin prohibit-password

Restart SSH:

pkill sshd
/usr/sbin/sshd

Pro tip (very useful for you)

Instead of attaching, you can now:

podman start devbox

Then SSH in:

ssh root@localhost -p 2222

attach vs exec (this is important)
🔹 podman attach devbox
Connects to the main process
Same terminal session
If you exit → you might stop the container

👉 Think:

“Reconnect to the original console”

podman exec -it devbox bash
Starts a new shell inside container
Container keeps running regardless
Multiple exec sessions possible

👉 Think:

“Open a new terminal into a running server”
