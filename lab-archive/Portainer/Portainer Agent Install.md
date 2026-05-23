Option A: Add standalone Docker VMs (simple multi-host)
On EACH additional VM:

Install Docker (same way you did before).

Then you install the Portainer Agent:

docker run -d \
  -p 9001:9001 \
  --name portainer_agent \
  --restart=always \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /var/lib/docker/volumes:/var/lib/docker/volumes \
  portainer/agent:latest
Then in Portainer UI:
Go to Environments
Click Add environment
Select Docker Standalone
Choose Agent

Enter:

http://<VM-IP>:9001

Now Portainer can:

See containers on that VM
Start/stop them remotely
Deploy stacks per-host
