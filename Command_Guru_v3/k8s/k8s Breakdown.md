# Definitions
- **<u>minikube:</u>**
	- creates and manages local Kubernetes clusters
		- A named Minikube environment is called a profile
		- This lab uses the labex-v135 profile
- **<u>kubectl</u>:**
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

# Command
- minikube version --short
- kubectl version
- kubectl cluster-info
- kubectl get nodes
- kubectl get pods -n default
- kubectl get pods -n kube-system -l tier=control-plane
- kubectl get pods -n kube-system -l tier=control-plane --show-labels
# Labs

## *<u>Exploring k8s cluster</u>*
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
# Command Breakdowns
