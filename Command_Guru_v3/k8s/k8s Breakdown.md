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

## group_creation.yaml

```
---
- name: Create and verify a Linux group
  hosts: all
  become: true

  vars_prompt:
    - name: group_name
      prompt: "Enter the group name you want to create"
      private: false

  tasks:
    - name: Create the group
      ansible.builtin.group:
        name: "{{ group_name }}"
        state: present

    - name: Verify the group exists
      ansible.builtin.command:
        cmd: "getent group {{ group_name }}"
      register: group_check
      changed_when: false

    - name: Display verification output
      ansible.builtin.debug:
        msg: "Group created successfully: {{ group_check.stdout }}"
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
## <u>Definitions</u>
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

## *<u>k8s Commands</u>*
- minikube version --short
- kubectl version
- kubectl version --client
- kubectl cluster-info
- kubectl cluster-info dump
- kubectl get nodes
- kubectl describe node | grep Taints
	- ==**Note:** The `node-role.kubernetes.io/control-plane` taint prevents regular pods from being scheduled onto the node
		- In a multi-node cluster, this taint keeps application workloads off the control plane
		- ==This cluster has only one node, so application pods cannot run until the taint is removed which is what the below command is for
- kubectl describe node controlplane | grep Taints
- kubectl taint nodes --all node-role.kubernetes.io/control-plane-
	- This removes the control-plane taint
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
- kubectl get all -n globomantics
- **kubectl create deployment globomantics-web --image=nginx:1.31**
	- ==**Note:** The `kubectl create deployment` command builds this full object specification for you, including the pod template, labels, and selector fields
- kubectl rollout status deployment/globomantics-web
- kubectl get pods -o wide
- kubectl get deployment globomantics-web -o yaml
- kubectl **scale** deployment globomantics-web --replicas=2
- kubectl get pods
	- **Expected output:** Two pods are listed with a `Running` status and a `READY` value of `1/1`
- kubectl get deployments -n default 
	- ==> run this command to get the deployment name <==
- kubectl expose deployment globomantics-web --type=NodePort --port=80
- kubectl get service globomantics-web
	- Record the port number displayed in the `PORT(S)` column after `80:`
		- globomantics-web   NodePort    10.110.75.94   none       80:30375/TCP   5s 
- kubectl apply -f globomantics-frontend.yaml
- kubectl get pods -n globomantics -l app.kubernetes.io/name=wordpress -w
- kubectl get pods -n globomantics

## <u>Helm Commands</u>
- helm version
- helm repo add bitnami https://charts.bitnami.com/bitnami
- helm repo update
- helm search repo bitnami/wordpress
- helm show values bitnami/wordpress | head -30
- helm create globomantics-mysql
- ls globomantics-mysql
- helm lint globomantics-mysql
- helm install mysql-release ./globomantics-mysql -n globomantics
- helm list 
- helm list -n globomantics
- helm list -A
- helm uninstall mysql-release -n globomantics
- helm get manifest release-name
- helm status mysql-release -n globomantics
- helm install wordpress-release bitnami/wordpress -f wordpress-values.yaml -n globomantics --timeout 2m
- helm package globomantics-mysql
	- This creates a zip file of the ...-mysql chart
		- **Expected output:** `Successfully packaged chart and saved it to: /home/cloud_user/globomantics-mysql-0.1.0.tgz`
- mv globomantics-mysql-0.1.0.tgz helm-repo
- helm repo index helm-repo --url http://localhost:8080
	- This generates the repository index file that Helm uses to discover available charts:
- python3 -m http.server 8080 --directory helm-repo &
- helm repo add globomantics-private http://localhost:8080
- helm search repo globomantics-private
- helm install mysql-private-release globomantics-private/globomantics-mysql -n globomantics
- helm list -n globomantics
- helm dependency update ./globomantics-stack
	- Download and bundle the declared dependencies into the `charts/` directory
- 
### <u>Charts</u>
#### Wordpress
##### wordpress-values.yaml

```
cat > wordpress-values.yaml << 'EOF'
wordpressUsername: admin
wordpressPassword: "GloboCMS123!"
wordpressBlogName: "Globomantics Blog"
wordpressEmail: "admin@globomantics.com"
service:
  type: NodePort
persistence:
  enabled: false
mariadb:
  enabled: false
externalDatabase:
  host: mysql-release.globomantics.svc.cluster.local
  port: 3306
  user: globouser
  password: "GloboPass123!"
  database: globomanticsdb
EOF
```

#### Globomantics
- helm create globomantics-mysql
- rm -rf globomantics-mysql/templates
- mkdir globomantics-mysql/templates
##### Chart.yaml

```
cat > globomantics-mysql/Chart.yaml << 'EOF'
apiVersion: v2
name: globomantics-mysql
description: A Helm chart for deploying the MySQL database for Globomantics
type: application
version: 0.1.0
appVersion: "8.4"
EOF
```

##### values.yaml
```
cat > globomantics-mysql/values.yaml << 'EOF'
replicaCount: 1

image:
  repository: mysql
  pullPolicy: IfNotPresent
  tag: "8.4"

service:
  type: ClusterIP
  port: 3306

mysql:
  rootPassword: "GlobomanticsDB!"
  database: globomanticsdb
  user: globouser
  password: "GloboPass123!"

resources:
  limits:
    memory: 512Mi
    cpu: 500m
  requests:
    memory: 256Mi
    cpu: 250m
EOF
```

##### deplyment.yaml
```
bomantics-mysql/templates/deployment.yaml << 'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}
  labels:
    app: globomantics-mysql
    release: {{ .Release.Name }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: globomantics-mysql
  template:
    metadata:
      labels:
        app: globomantics-mysql
        release: {{ .Release.Name }}
    spec:
      containers:
      - name: {{ .Chart.Name }}
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
        imagePullPolicy: {{ .Values.image.pullPolicy }}
        ports:
        - containerPort: 3306
          name: mysql
        env:
        - name: MYSQL_ROOT_PASSWORD
          value: {{ .Values.mysql.rootPassword | quote }}
        - name: MYSQL_DATABASE
          value: {{ .Values.mysql.database | quote }}
        - name: MYSQL_USER
          value: {{ .Values.mysql.user | quote }}
        - name: MYSQL_PASSWORD
          value: {{ .Values.mysql.password | quote }}
        resources:
          {{- toYaml .Values.resources | nindent 12 }}
EOF
```

##### services.yaml
```
cat > globomantics-mysql/templates/service.yaml << 'EOF'
apiVersion: v1
kind: Service
metadata:
  name: {{ .Release.Name }}
  labels:
    app: globomantics-mysql
    release: {{ .Release.Name }}
spec:
  type: {{ .Values.service.type }}
  ports:
  - port: {{ .Values.service.port }}
    targetPort: 3306
    protocol: TCP
    name: mysql
  selector:
    app: globomantics-mysql
EOF
```

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

## <u>Manifest Files</u>
### globomantics-frontend.yaml

```
cat > globomantics-frontend.yaml << 'EOF'
apiVersion: apps/v1
kind: Deployment
metadata:
  name: globomantics-frontend
  namespace: globomantics
spec:
  replicas: 2
  selector:
    matchLabels:
      app: globomantics-frontend
  template:
    metadata:
      labels:
        app: globomantics-frontend
    spec:
      containers:
      - name: frontend
        image: nginx:1.31
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: globomantics-frontend-svc
  namespace: globomantics
spec:
  selector:
    app: globomantics-frontend
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP
EOF

kubectl apply -f globomantics-frontend.yaml
```
- **Note:** The manifest file contains a Deployment and a Service for the Globomantics frontend application
	- The Deployment is configured to run 2 replicas of the `nginx:1.31` image, and the Service is configured to expose the frontend on port 80

## <u>Command Breakdowns</u>

# **==Pluaralsight Labs==
## <u>Navigating and Managing Amazon Linux</u>
###  Connecting to an EC2 instance

- ssh ec2-user@*54.197.218.255 _kWk!5f3*
- ssh-keygen -t ed25519 -C "lab-key"
- cat ~/.ssh/id_ed25519.pub >> ~/.ssh/authorized_keys

```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACArqK+qQX/olcKy8YN/ebY8cuHT1mSqVst3RMqzOHOF6wAAAJD/l+Pg/5fj
4AAAAAtzc2gtZWQyNTUxOQAAACArqK+qQX/olcKy8YN/ebY8cuHT1mSqVst3RMqzOHOF6w
AAAEBuP3tRjT242PzYzukWvMjWPk2RF2A73ZDZnX7aOrsU4Cuor6pBf+iVwrLxg395tjxy
4dPWZKpWy3dEyrM4c4XrAAAAB2xhYi1rZXkBAgMEBQY=
-----END OPENSSH PRIVATE KEY-----
```

- exit && mkdir -p ~/.ssh 
	- --> you are running this on the server that will be used to remote into ec2-instance <--
- add_key ==> press i & paster the key from above
- ssh -i /home/cloud_user/.ssh/id_dropbear ec2-user@54.197.218.255
	- ==> to ssh into the lightsail instance <==
- sudo dnf update -y
- sudo dnf install git -y
### **Perform filesystem navigation and file management tasks**
- cd /srv
- sudo git clone https://github.com/ps-interactive/lab_navigating-and-managing-amazon-linux.git && pwd && ls
- cd lab_navigating-and-managing-amazon-linux/
- find . -name "health.html"
- cd public/ && ls && cd ..
- grep -R "DB_NAME"
- cd config/ && cat database.conf && cd && pwd
- cd /srv/lab_navigating-and-managing-amazon-linux/
- sudo mkdir Backend && cd Backend/ && ls -ld
- sudo touch server.js && ls

### **Create and configure users, groups, and sudo access for a multi-team application environment**
- sudo groupadd frontend_group && sudo groupadd backend_group && sudo groupadd admin_group && getent group frontend_group
- sudo useradd -m frontend1 && sudo useradd -m frontend2
- sudo useradd -m backend1 && sudo useradd -m backend2
- sudo useradd -m admin1 && tail -n 5 /etc/passwd
- sudo usermod -aG frontend_group frontend1 && sudo usermod -aG frontend_group frontend2 && groups frontend1 && groups frontend2
- sudo usermod -aG backend_group backend1 && sudo usermod -aG backend_group backend2 && groups backend1 && groups backend2
- sudo usermod -aG frontend_group admin1 && sudo usermod -aG backend_group admin1 && groups admin1
- cd ..
- sudo chown -R root:frontend_group Frontend && ls -ld Frontend
- sudo chown -R root:backend_group Backend && ls -ld Frontend Backend
- sudo chmod -R 770 Frontend && sudo chmod -R 777 Backend && ls -ld Frontend Backend
	- This gives the user owner and group owner full access to the Frontend directory
	- This gives the user owner, group owner, and everyone full access to the `Backend` directory, which will be important later on for practicing troubleshooting
- sudo visudo
		```%admin_group ALL=(ALL) ALL```
	- Add above to the bottom of the file
	- This allows members of the `admin_group` to run commands with `sudo`
- sudo passwd frontend1 && sudo passwd frontend2 ==> Learner123
- sudo passwd backend1 && sudo passwd backend1 && sudo passwd admin1 && su - frontend1 && whoami
- touch /srv/lab_navigating-and-managing-amazon-linux/Frontend/test.txt
	- The command should complete successfully because `frontend1` belongs to the `frontend_group
- exit 
- su - backend1
- whoami && touch /srv/lab_navigating-and-managing-amazon-linux/Frontend/permission_test.txt
	- You should receive a `Permission denied` error because backend1 does not belong to the `frontend_group`
- exit 
- su - admin1
- touch /srv/lab_navigating-and-managing-amazon-linux/Frontend/admin.txt && exit

### **Implement and audit file permissions using special permission bits**
- sudo chmod g+s Frontend
	- This enables the setgid bit on the `Frontend` directory:
	- This sets the setgid (Set Group ID) bit on the `Frontend` directory
	- ==With the setgid bit enabled, all new files and subdirectories inherit the directory's group ownership instead of the creator's primary group
- sudo chmod +t Frontend
	- This sets the sticky bit on the directory. Normally, users with write permission to a directory can delete any file inside it
	- ==With the sticky bit enabled, users can delete only files they own, even if they have write permission to the directory
- ls -ld Frontend
	- drwxrws--T. 10 root frontend_group 16384 Sep  5 18:57 Frontend
- su - frontend1
- touch /srv/lab_navigating-and-managing-amazon-linux/Frontend/app.js && ls -l /srv/lab_navigating-and-managing-amazon-linux/Frontend/app.js
- touch /srv/lab_navigating-and-managing-amazon-linux/Frontend/styles.css && ls -l /srv/lab_navigating-and-managing-amazon-linux/Frontend/styles.css
- exit
- su - frontend2
- rm /srv/lab_navigating-and-managing-amazon-linux/Frontend/style.css
	- You should get an access denied error
- find . -type d -perm -002
- ls -ld Backend && sudo chmod 770 Backend

## <u>Building a Basic Kubernetes Cluster</u>
### **Access the terminal and verify the cluster prerequisites**
- ssh cloud_user@44.202.26.144
	- iZv1(1^l
- kubeadm version
- systemctl status containerd
### **Initialize the Kubernetes cluster with kubeadm**
- swapon --show
	- **Note:** No output confirms that swap is disabled, which Kubernetes requires
- sudo kubeadm init --pod-network-cidr=10.244.0.0/16
	- enter the password of the cloud_user
		- **Expected output:** The message `Your Kubernetes control-plane has initialized successfully!` is displayed, along with a `kubeadm join` command for adding worker nodes
- mkdir -p $HOME/.kube && sudo cp /etc/kubernetes/admin.conf $HOME/.kube/config && sudo chown $(id -u):$(id -g) $HOME/.kube/config
- kubectl cluster-info
- kubectl get nodes
	- **Expected output:** The node's `STATUS` shows `NotReady`
		- This is expected
			- The cluster does not yet have a CNI (Container Network Interface) plugin installed to manage pod networking
- kubectl get pods -n kube-system
	- **Expected output:** The CoreDNS pods show a `Pending` status because they cannot be scheduled until the node is ready
### **Configure cluster networking and make the node schedulable**
- kubectl apply -f kube-flannel.yml
- kubectl get pods -n kube-flannel
- kubectl get nodes
	- 1. **Expected output:** The node's `STATUS` now shows `Ready
- kubectl get pods -n kube-system
- kubectl describe node controlplane | grep Taints
- kubectl taint nodes --all node-role.kubernetes.io/control-plane-

### **Deploy a web server application to the cluster**
- kubectl create deployment globomantics-web --image=nginx:1.31
- kubectl rollout status deployment/globomantics-web
- kubectl get pods -o wide
	- 1. **Expected output:** The `NODE` column shows the pod scheduled onto `controlplane`, since it is the only node in the cluster
- kubectl get deployment globomantics-web -o yaml
- kubectl scale deployment globomantics-web --replicas=2
### **Expose and verify access to the application**
- kubectl expose deployment globomantics-web --type=NodePort --port=80
- kubectl get service globomantics-web
- http://10.0.0.248:32737
- CLUSTER_IP=$(kubectl get service globomantics-web -o jsonpath='{.spec.clusterIP}')
	- This creates a variable to store the service's cluster IP
- curl http://$CLUSTER_IP
- curl http://localhost:80:30375

## <u>Building and Managing Helm Charts for Kubernetes</u>
### **Access the terminal**
- ssh cloud_user@18.209.247.208
	- 6wF(l]C)
- kubectl cluster-info
- helm version
- python3 --version
### **Deploy an application with kubectl to establish a baseline**
- kubectl get nodes
- kubectl create namespace globomantics
- kubectl apply -f globomantics-frontend.yaml
	- **Expected output:** `deployment.apps/globomantics-frontend created` and `service/globomantics-frontend-svc created` are displayed
- kubectl get pods -n globomantics
- kubectl get all -n globomantics

### **Create a Helm chart to deploy a MySQL database**
- helm create globomantics-mysql
- rm -rf globomantics-mysql/templates
- mkdir globomantics-mysql/templates
- helm lint globomantics-mysql
- helm install mysql-release ./globomantics-mysql -n globomantics
- helm status mysql-release -n globomantics
- kubectl get pods -n globomantics -l release=mysql-release
### **Install and validate an existing Helm chart for WordPress**
- helm repo add bitnami https://charts.bitnami.com/bitnami
- helm repo update
- helm search repo bitnami/wordpress
- helm show values bitnami/wordpress | head -30
- helm install wordpress-release bitnami/wordpress -f wordpress-values.yaml -n globomantics --timeout 2m

### **Store and pull Helm charts using a private Helm repository**
- helm package globomantics-mysql
- mkdir helm-repo
	- **Expected output:** `Successfully packaged chart and saved it to: /home/cloud_user/globomantics-mysql-0.1.0.tgz`
- mv globomantics-mysql-0.1.0.tgz helm-repo
- helm repo index helm-repo --url http://localhost:8080
- python3 -m http.server 8080 --directory helm-repo &
	- **Note:** The `&` at the end of the command runs the server in the background
### **Register and use the private repository**
- helm repo add globomantics-private http://localhost:8080
- helm repo update
- helm search repo globomantics-private
- helm search repo globomantics-private
- helm install mysql-private-release globomantics-private/globomantics-mysql -n globomantics
- helm list -n globomantics
### **Manage dependencies between Helm charts**
- helm create globomantics-stack
- rm -rf globomantics-stack/templates/*
- helm dependency update ./globomantics-stack
	- Download and bundle the declared dependencies into the `charts/` directory
- ls globomantics-stack/charts/
- helm install stack-release ./globomantics-stack -n globomantics
- helm list -n globomantics
- kubectl get pods -n globomantics
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