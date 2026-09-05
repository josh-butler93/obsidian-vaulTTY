# ==**Ansible**==

## <u>Links</u>
## <u>Definitions</u>
- <u>ping module</u>:
	- is useful for checking connectivity to hosts
- <u>command module</u>:
	- allows you to run arbitrary commands on target hosts. It's the default module, so -m command can be omitted
- <u>copy module</u>:
	- for copying files to remote hosts
- <u>file</u>:
	- for managing files and directories
- <u>setup</u>:
	- for gathering facts about remote hosts
- <u>Ad-hoc commands</u>:
	- are a powerful feature of Ansible that allow you to perform quick tasks across your infrastructure

## <u>Commands</u>
- Ad-hoc Command Structure
	- ansible [pattern] -m [module] -a "[module options]"
		- [pattern] is the host or group of hosts from your inventory that you want to target
		- -m [module] specifies which Ansible module to use
		- -a "[module options]" provides arguments to the module
	- ansible all -i inventory.ini -m ping
			- This command uses the ping module to check connectivity to all hosts in the inventory
			- The all keyword targets all hosts
		- all: is the pattern, targeting all hosts in the inventory
		- -i /home/labex/project/inventory: specifies the inventory file to use
		- -m ping: tells Ansible to use the ping module
	- ansible all -i inventory.ini -m command -a "df -h"
		- The command module is the default module, so you can omit -m command if you're using this module. For example:
	- ansible webservers -i /home/labex/project/inventory -m command -a "uptime"
	- ansible dbservers -i inventory.ini -a "free -m"
		- This command will show the memory usage on all hosts in the dbservers group
	- ansible all -i /home/labex/project/inventory -m copy -a "src=/home/labex/project/hello.txt dest=/tmp/hello.txt"
		- This command copies the hello.txt file from the local machine to the /tmp directory on all remote hosts
	- ansible webservers -i /home/labex/project/inventory -m file -a "path=/tmp/test_dir state=directory mode=0755"
	- ansible dbservers -i /home/labex/project/inventory -m setup
		- This command will display a large amount of information about the hosts in the dbservers group
	- ansible dbservers -i /home/labex/project/inventory -m setup -a "filter=ansible_distribution*"
		- This will only show facts related to the OS distribution

## <u>Command Oneliners</u>
- ansible all -i inventory.ini -m ping | less -r
- ansible all -i inventory.ini -m command -a "df -h"
- ansible all -i inventory.ini -a "free -m"
- ansible all -i inventory.ini -m command -a "uptime"
- ansible nginx -i inventory.ini -m file -a "path=/tmp/test_dir state=directory mode=0755"
- ansible nginx -i inventory.ini -m setup -a "filter=ansible_distribution*"
## <u>Playbooks</u>
### file_creation.yaml
 
```
---
- name: My First Playbook
  hosts: localhost
  connection: local
  tasks:
    - name: Create a directory
      file: #file module
        path: /home/labex/project/test_directory #this shows the directory path
        state: directory #this tells it that it should be a directory
        mode: "0755" #permissions of the directory

    - name: Create a file
      copy: #copy module
        content: "Hello from Ansible!"
        dest: /home/labex/project/test_directory/hello.txt
```

### file_creation_w_variables.yaml

```
---
- name: My First Playbook
  hosts: localhost
  connection: local
  vars:
    dir_path: /home/sysadmin/project/test_directory
    file_content: "Hello from Ansible! The time is {{ ansible_date_time.iso8601 }}"

  tasks:
    - name: Create a directory
      file:
        path: "{{ dir_path }}"
        state: directory
        mode: "0755"

    - name: Create a file
      copy:
        content: "{{ file_content }}"
        dest: "{{ dir_path }}/hello.txt"

    - name: Display file content
      debug:
        msg: "The content of the file is: {{ file_content }}"
```
### file_module.yaml
```
---
- name: File Module
  hosts: localhost
  become: true
  gather_facts: true
  tasks:
    - name: Create a file on remote host
      file:
        path: /home/labex/file.txt
        state: touch

    - name: Set file permissions
      file:
        path: /home/labex/file.txt
        mode: "0644"

    - name: Delete a file on remote host
      file:
        path: /home/labex/file.txt
        state: absent #This parameter indicates that the file should be in the absent state 
    - name: Check file existence on remote host
      stat:
        path: /home/labex/file.txt
      register: file_info

    - name: Print file existence
      debug:
        msg: "File exists: {{ file_info.stat.exists }}"
```

## <u>Running Playbooks</u>

## <u>Labs</u>
### *Understanding Ansible Ad-hoc Command Structure*
- ansible [pattern] -m [module] -a "[module options]"
- nano /home/labex/project/inventory
		localhost ansible_connection=local
		
		[webservers] localhost
		
		[dbservers] localhost
- ansible all -i /home/labex/project/inventory -m ping
#### *Command Module*
	- Command Module Explained:
		- command module: allows you to run arbitrary commands on the target hosts
		- Remember, the command module doesn't support shell variables or operations like |, >, <, &. For those, you'd need to use the shell module
- ansible all -i /home/labex/project/inventory -m command -a "df -h"
	- The command module is the default module, so you can omit -m command if you're using this module -- For example: see the next command
- ansible webservers -i /home/labex/project/inventory -m command -a "uptime"
- ansible dbservers -i /home/labex/project/inventory -a "free -m"
#### *Copy Module*
	- Copy Module Explained:
		- copy module: is used to copy files from the local machine to the remote hosts
- echo "Hello from Ansible" > /home/labex/project/hello.txt
- ansible all -i /home/labex/project/inventory -m copy -a "src=/home/labex/project/hello.txt dest=/tmp/hello.txt"

#### *File Module*
	- File Module Explained:
		- file module: This module is used to manage files and directories
- ansible webservers -i /home/labex/project/inventory -m file -a "path=/tmp/test_dir state=directory mode=0755"
	- This command creates a directory named test_dir in the /tmp directory on all webservers, with permissions set to 0755

#### *Setup Module*
		- Setup Module Explained:
			- setup module: This module is used to gather facts about the remote hosts
			- It's automatically run at the beginning of playbooks, but can also be used in ad-hoc commands
- ansible dbservers -i /home/labex/project/inventory -m setup
	- This command will display a large amount of information about the hosts in the dbservers group
- ansible dbservers -i /home/labex/project/inventory -m setup -a "filter=ansible_distribution*"
### *Ansible Playbook Basics*

```
Understanding Playbook Structure
---
# Playbook starts with three dashes
- name: My First Playbook # Name of the play
  hosts: localhost # Target host(s) for this play
  connection: local # Connection type (local in this case)

  tasks: # List of tasks to be executed
    - name: Create a directory # Name of the first task
      file: # The 'file' module is used for this task
        path: /home/labex/project/test_directory # Path of the directory to create
        state: directory # Desired state (create the directory)
        mode: "0755" # Permissions for the directory

    - name: Create a file # Name of the second task
      copy: # The 'copy' module is used for this task
        content: "Hello from Ansible!" # Content to be written to the file
        dest: /home/labex/project/test_directory/hello.txt # Destination path for the file
```

```
Adding Variables to Playbooks
---
- name: My First Playbook
  hosts: localhost
  connection: local
  vars:
    dir_path: /home/labex/project/test_directory
    file_content: "Hello from Ansible! The time is {{ ansible_date_time.iso8601 }}"

  tasks:
    - name: Create a directory
      file:
        path: "{{ dir_path }}"
        state: directory
        mode: "0755"

    - name: Create a file
      copy:
        content: "{{ file_content }}"
        dest: "{{ dir_path }}/hello.txt"

    - name: Display file content
      debug:
        msg: "The content of the file is: {{ file_content }}"

```
# ==**Docker**==
# ==**Linux**==
## <u>Links</u>
## <u>Commands</u>
- <u>autofs</u>
		- **`auto.master` tells autofs which map files control which directories**
			- the map file then tells it which remote filesystems to mount
	- sudo systemctl enable --now autofs
	- cat /etc/auto.master ==> default config
	- **sudo vim /etc/auto.master.d/nfs.autofs** => creating master map entry
		```/shares /etc/auto.nfs```
		- This tells it:
			- =="For anything underneath `/shares`, look in `/etc/auto.nfs` to determine what should be mounted."
	- sudo vim /etc/auto.nfs
		```shared -fstype=nfs,rw 10.0.0.2:/exports/shared```
		- shared: directory name ==>/shares/shared
		- -fstype=nfs,rw: 
			- ├── filesystem = NFS
			- └── read/write
		- 10.0.0.2:/exports/shared
			- └── actual NFS share location
	- sudo systemctl reload autofs
	- cd /shares/shared ==> to trigger autofs mount
	- mount | grep /shares ==> to verify its been mounted

- <u>firewalld</u>
	- sudo firewall-cmd --list-all
		- Ouput:
			public (active)
			  target: default
			  icmp-block-inversion: no
			  interfaces: ens18
			  sources: 
			  services: cockpit dhcpv6-client ssh
			  ports: 
			  protocols: 
			  forward: yes
			  masquerade: no
			  forward-ports: 
			  source-ports: 
			  icmp-blocks: 
			  rich rules:
		- Output Breakdown
			- `public (active)` is the firewall **zone** currently protecting `ens18`
				- Firewalld uses zones as groups of rules
				- You can have different interfaces assigned to different zones
			- `interfaces: ens18` means your network card/interface is assigned to the `public` zone
				- Therefore, traffic arriving through `ens18` is evaluated against the `public` zone's rules
			- `services:` shows predefined services currently allowed through the firewall
				- services: cockpit dhcpv6-client ssh
					- cockpit → RHEL web administration
					- dhcpv6-client → DHCPv6 client traffic
					- ssh → SSH
			- `ports:` is for ports you've manually opened rather than using a predefined service
			- `masquerade` is related to NAT
			- `forward-ports` to port forwarding
			- `icmp-blocks` to blocking particular ICMP types
			- `rich rules` gives you more advanced conditional firewall rules
	- firewall-cmd --add-service=ssh
	- sudo firewall-cmd --permanent --add-service=nfs
		- The `--permanent` part means:
			- Save these rules so they're still present after reboot
	- sudo firewall-cmd --permanent --add-service=nfs
		- --add-service=nfs
			- allows that NFS traffic through firewalld
	- sudo firewall-cmd --permanent --add-service=mountd
	- sudo firewall-cmd --permanent --add-service=rpc-bind
	- sudo firewall-cmd --reload
	- sudo firewall-cmd --list-services
	- sudo firewall-cmd --list-ports
	- sudo firewall-cmd --list-interfaces
	- sudo firewall-cmd --list-icmp-block

- <u>nfs</u>
	- systemctl status nfs-server
	- sudo exportfs -rav
	- sudo exportfs -v
	- showmount -e 10.0.0.2 <--IP of the nfs Server ran from the client
			- This confirms whether or not the client can reach the nfs server meaning 10.0.0.2 is advertising on that port
			- "Contact the NFS/RPC services on `10.0.0.2` and ask for its exports."
			- "What NFS directories does this server export?"
		- ==showmount → query an NFS server
		- ===-e → show its export list===
	- sudo mount -t nfs 10.0.0.2:/exports/shared /mnt/shared
		- run this on the client machine to mount the shared folder
		- Mount the NFS share `/exports/shared` from server `10.0.0.2` onto my local `/mnt/shared` directory
	- mount | grep nfs
	- df -hT /mnt/shared

- <u>fstab</u>
	- /etc/fstab
		- An `/etc/fstab` entry essentially has six fields:
		- WHAT                WHERE         TYPE   OPTIONS           DUMP  CHECK
		- 10.0.0.2:/exports/shared   /mnt/shared   nfs    defaults,_netdev  0     0
			- 10.0.0.2:/exports/shared: Remote filesystem to use
			- /mnt/shared: Where to attach it locally
			- nfs: Filesystem TYPE
			- defaults,_netdev: Mount options
			- 0 0 ==> Backup/fsck settings
	- sudo cp /etc/fstab /etc/fstab.bak
	- sudo vim /etc/fstab ==> to edit the file
	- sudo umount /mnt/shared ==> unmount for testing
	- df -hT /mnt/shared --> verify its been unmounted
	- **sudo mount** -a ==> remount
	- df -hT /mnt/shared --> verify its been remounted
	- sudo systemctl daemon-reload

- <u>df</u>
	- df -hT /mnt/shared

## <u>Services</u>
- <u>nfs</u>
	- This is the actual **file-sharing service**
	- It's the part clients communicate with when they're reading/writing files over NFS
		- Modern NFS primarily uses TCP port **2049**
		- NFS client
			    │
			    │ :2049
			   ▼
			NFS server
			    │
			   ▼
			/exports/shared
- <u>rpc-bind</u>
	- `rpc-bind` is essentially a **directory/service locator for RPC services**
	- `rpcbind` listens primarily on port **111**
		- NFS historically consists of multiple RPC services
- <u>mountd</u>
	- `mountd` helps handle **NFS mount requests**, particularly with NFSv3
	- `mountd` checks the server's export information to determine whether a client is allowed access

# **==k8s==**
## *Links*
## *Definitions*
#### minikube
	- creates and manages local Kubernetes clusters
		- A named Minikube environment is called a profile
		- This lab uses the labex-v135 profile
#### kubectl
	- is the standard Kubernetes command-line client
		- It sends requests to the Kubernetes API server to list, create, update, and delete objects
- <u>Pod</u>: 
	- is the smallest deployable Kubernetes unit
		- It wraps one or more closely related containers and gives them shared networking and storage context
- <u>namespace</u>: 
	- provides a logical scope for namespaced objects
- <u>API server</u>: 
	- is Kubernetes' front door
- <u>etcd</u>: 
	- stores cluster state
- <u>scheduler</u>: 
	- chooses Pod placement
- <u>controller manager</u>:
	- runs reconciliation controllers
- <u>Calico</u>:
	- configures Pod networking
- <u>kube-proxy</u>: 
	- maintains node rules that help Services direct traffic to Pods
- <u>kubectl cluster-info</u>:
	- is a purpose-built orientation command
		- ==Unlike kubectl get, it does not list one resource type; it asks the active cluster to report the addresses of important services such as the API server and CoreDNS==
- <u>control-plane URL</u>:
	- is the API server endpoint
- <u>CoreDNS</u>:
	- provides DNS service discovery, allowing workloads to find Services by name instead of tracking changing IPs
		- Addresses vary, so focus on is running, which shows the API server returned information. It does not prove every workload is healthy
- <u>Deployment</u>:
	- declares how many copies of a stateless application should run and manages Pods through a ReplicaSet
- <u>Service</u>:
	- gives selected Pods a stable virtual IP and DNS name because replaceable Pod IPs can change

## *Commands*
- minikube version --short
- kubectl version
- kubectl cluster-info
- kubectl get nodes
- kubectl get pods -n default
- kubectl get pods -n kube-system -l tier=control-plane
- kubectl get pods -n kube-system -l tier=control-plane --show-labels
- kubectl describe node labex-v135
- kubectl get pods -A
- kubectl get deployments -A
- **kubectl get services -A**
	- TYPE describes exposure
	- ClusterIP is reachable inside the cluster
	- NodePort also opens a node port
- kubectl get all -A
## *Labs*
### *<u>Exploring k8s cluster</u>*
- minikube version --short
- kubectl version
- kubectl config current-context
- kubectl config get-contexts
- kubectl config use-context labex-v135
- minikube status -p labex-v135
#### <u>Identify Kubernetes Architecture Components</u>
- kubectl get pods -n kube-system -l tier=control-plane
	- ==Use -l tier=control-plane to select Pods with that label:
	- READY=1/1 means the Pod's one container is ready
- kubectl get pods -n kube-system -l tier=control-plane --show-labels
- kubectl get pods -n kube-system -l 'k8s-app in (kube-proxy,calico-node)'

#### <u>Inspect Cluster and Node Details</u>
- kubectl cluster-info
- kubectl get nodes -o wide
	- Add -o wide to request more columns
- kubectl describe node labex-v135
- kubectl get pods -A
- kubectl get deployments -A
- kubectl get services -A
- kubectl get all -A
## *Command Breakdowns*

# **==Storage==**
## <u>Commands</u>
- systemctl status nfs-server
- sudo exportfs -rav
- sudo exportfs -v
- sudo firewall-cmd --list-all
- showmount -e 10.0.0.2 <--IP of the nfs Server ran from the client
- sudo mount -t nfs 10.0.0.2:/exports/shared /mnt/shared 
- mount | grep nfs
## <u>NFS Concepts</u>
- `/etc/exports` — yes, that's the important NFS server config
- When you installed: *sudo dnf install nfs-utils*
	- the package provides the NFS tooling and supporting configuration
	- Nginx                       NFS

		/etc/nginx/nginx.conf       /etc/exports
           │                                                 │
           ▼                                               ▼
		How Nginx behaves           What directories are shared
- /exports/shared 10.0.0.0/24(rw,sync,no_subtree_check)
	- basically says:
		- "Share `/exports/shared`, allow machines on `10.0.0.x` to connect, and give them these options."
- /exports **is NOT required**
	- ==You could export:
		- /data
		- /srv/files
		- /home
		- /home/users
		- /mnt/storage
		- /company/accounting
		- or almost any suitable directory
	- For example:
		- /srv/company-files 10.0.0.0/24(rw,sync)
		- What directory --> Who can access it --> What are they allowed to do 
			- ==That's what `/etc/exports` describes
- What `exportfs` does
	- After changing `/etc/exports`, the running NFS server needs to know about those changes --> That's what: --> exportfs
- You might have technologies such as:
	- AD / LDAP        → identity
	- Kerberos         → authentication
	- SSSD             → connects Linux identity/auth to AD
	- NFS              → provides files
	- autofs           → mounts them automatically
	- NAS              → physically stores the files
- ==Enterprise Diagram
	- Authentication and Mounting workflow
		- AD      = Who is Josh?
		- Kerberos = Can Josh prove he's Josh?
		- NAS     = Where are Josh's files?
		- NFS/SMB = How do we access those files?
		- autofs  = When/how should Linux mount them?
	- User logs in:
			jbutler
			   │
			   ├── SSSD/AD → "Yes, this user exists."
			   │
			   └── autofs
			         │
			         ▼
				nas01:/home/jbutler
			         │
			         ▼
				/home/jbutler
- Services
	- nfs       = actually serves the files
	- mountd    = helps clients mount exported filesystems
	- rpc-bind  = tells clients where RPC services are
## <u>Setting up NFS Server</u>
- sudo dnf install -y nfs-utils
- sudo systemctl enable --now nfs-server
- systemctl status nfs-server
	- You want to see:
		- ==Active: active (exited)
- sudo mkdir -p /exports/shared
	- ll
- sudo chmod 777 /exports/shared
- ls -ld /exports/shared
- sudo vim /etc/exports
	- `/exports/shared 10.0.0.0/24(rw,sync,no_subtree_check)`
		- ==/exports/shared     directory being shared
		- ==10.0.0.0/24         clients allowed from your LAN
		- ==rw                   read + write
		- ==sync                 commit writes synchronously
		- ==no_subtree_check     disable subtree checking
- **sudo exportfs -rav** <--This applys the export
	- "Read my export configuration again, apply all of it, and show me what you're doing."
	- You should see something similar to:
		- ==exporting 10.0.0.0/24:/exports/shared
			- -r: re-export
				- Synchronize the active exports with /etc/exports
			- -a: all
				- Apply this to all configured exports
			- -v verbose
				- Tell me what you're doing
- **sudo exportfs -v** <-- this verifies the export fs
	- "Show me the currently exported directories and their options."
	- You should see `/exports/shared` listed
	- ==root_squash:== prevents client-side root from automatically having unrestricted root privileges over the exported filesystem
- sudo firewall-cmd --list-all
- sudo firewall-cmd --permanent --add-service=nfs
- sudo firewall-cmd --permanent --add-service=mountd
- sudo firewall-cmd --permanent --add-service=rpc-bind
- sudo firewall-cmd --reload
- sudo firewall-cmd --list-services
	- output should show below:
		- cockpit dhcpv6-client **mountd nfs rpc-bind ssh**
## <u>Setting up NFS Client</u>
- sudo dnf install -y nfs-utils
	- Notice it's the same `nfs-utils` package we installed on the server. It contains both NFS server and client utilities
	- We **do not** need to enable `nfs-server` on this machine just to use it as a client
- sudo mkdir -p /mnt/shared
- ls -ld /mnt/shared
- sudo mount -t nfs 10.0.0.2:/exports/shared /mnt/shared
- mount | grep nfs
- df -hT /mnt/shared
- echo "Created from the NFS client" | sudo tee /mnt/shared/client-test.txt
- ls -l /mnt/shared/
## <u>Setting Up Persistance -> Client Side</u>
* sudo cp /etc/fstab /etc/fstab.bak <== client side command
* sudo vim /etc/fstab => add below to the end of the file
	```10.0.0.2:/exports/shared /mnt/shared nfs defaults,_netdev 0 0```
	- nfs ==> tells linux what type of file system this is
	- `_netdev` is particularly useful for network filesystems. It tells the system:
		- This isn't a local disk. Networking needs to be available for this mount
- sudo umount /mnt/shared
- df -hT /mnt/shared ==> to verify its unmounted
- sudo mount -a
- df -hT /mnt/shared

## <u>Setting up Autofs -> Client Side</u>
- sudo dnf install -y autofs
- sudo systemctl enable --now autofs
- systemctl status autofs
	- You should see:
		- Active: active (running)
- cat /etc/auto.master
- **sudo vim /etc/auto.master.d/nfs.autofs** => creating master map entry
	```/shares /etc/auto.nfs```
	- This tells it:
		- =="For anything underneath `/shares`, look in `/etc/auto.nfs` to determine what should be mounted."
- sudo vim /etc/auto.nfs
	```shared -fstype=nfs,rw 10.0.0.2:/exports/shared```
	- shared: directory name ==>/shares/shared
	- -fstype=nfs,rw: 
		- ├── filesystem = NFS
		- └── read/write
	- 10.0.0.2:/exports/shared
		- └── actual NFS share location
- sudo systemctl reload autofs
- systemctl status autofs
- mount | grep /shares
	- you wont see it until you run the below commands
- cd /shares/shared ==> if your not inside this dir the autofs will auto unmount itself
	- once inside this directory it will the autofs will be triggered
- pwd
- ls -la
- mount | grep /shares
	- you should now see the nfs-server share