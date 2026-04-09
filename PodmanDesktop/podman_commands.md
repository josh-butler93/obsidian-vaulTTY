Start the podman machine
- command:
    - podman machine init
        - This initializes the default vm

- command: 
    - podman machine start 
        - This startss the vm

- command: 
    - podman machine ssh
        - This is where you ssh into the vm

Configure short-name searches in Podman
- command:
    - sudo nano /etc/containers/registries.conf
# File setup 
# [registries.search]
# registries = ['docker.io']

Connecting to Containers 
- Command:
  - podman exec -it <container_name> <command>
    - exec -> run a command inside a running container 
    - -it -> interactive
    - <command> -> usually a shel like bash or sh
- Example:
  - podman exec -it webserver bash
  - podman exec -it sh
    - prio to running the above command run the below command to get the name of the container
     - Command:
      - podman ps
