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

docker pull vs docker run:
   - docker pull only downloads the image to your local machine without running it
   - docker run does two things: if the image isn't locally available, it pulls it first, then starts a container from that image
You're correct on both points.
Image naming: You don't always need the full name. Docker Hub official images like nginx, postgres, python work with just the short name. For other registries, you need the full path (e.g., quay.io/centos/centos7).
docker pull vs docker run:
- docker pull nginx — Downloads the image to your local machine, but does not run it
- docker run nginx — First checks if the image exists locally, pulls it if not, then starts a container from it

Running a container
- Command:
  - podman run [Options] Image [Command]
    - What each part means
      - podman run:	Create + start a container
      - IMAGE: 	What you’re running (nginx, postgres, etc.)
      - OPTIONS:	How it should run (ports, name, env vars, etc.)
      - COMMAND:	What process runs inside (optional override)
  - Example:
    - podman run -d --name -p 8080:80 nginx:latest
      - Breakdown (this is important)
        - -d:	Run in background
        - --name: webserver	Give container a name
        - -p: 8080:80	Map host → container port
        - IMAGE: nginx
          - What podman run does under the ----------
            1. podman pull nginx
            2. podman create ...
            3. podman start ...
              run = pull + create + start
- Command:
  - podman run nginx # creating a running instance of a container
  - podman run -it ubuntu bash # run interactive
  - podman run -d nginx # run in the background
  - podman run -d -v myvolume:/data nginx # run with persistant storage/volume 
  - podman run -d -e POSTGRES_PASSWORD=secret postgres

Lifecycle commands after spinning up Containers
- Command:
  - podman ps # list running containers
  - podman ps -a # list all containers
  - podman stop webserver # container name
  - podman start webserver # container name
  - podman restart webserver # container_name
  - podman rm webserver # container_name

- Command:
  - podman run -dit --name myubuntu ubuntu bash 
    - keeps container running even after exiting out 
      - -d -> background keeps the container running
      - it -> interactive session
      - bash -> this keeps the container alive 
  - podman exec -it myubuntu bash
  - podman rm -f myubuntu
  - podman run -dit --name test ubuntu sleep infinity

podman run -dit --name test ubuntu bash
podman exec -it test bash
podman stop test
podman rm test

podman run ubuntu apt update --some of the little things you can get a contianer to do 

| Use case                | Command style               |
| ----------------------- | --------------------------- |
| Interactive exploration | `-it bash`                  |
| Background service      | `-d nginx`                  |
| One-time task           | `podman run ubuntu echo hi` |

Images can add up if you pull many of them. You can clean up unused images with:
podman image prune     # removes dangling images
podman system prune    # removes all unused images, containers, networks

Docker:
docker rmi <image_name_or_id>     # remove specific image
docker rmi $(docker images -q)     # remove all images (must stop containers first)
docker image prune -a             # remove all unused images
Podman:
podman rmi <image_name_or_id>     # remove specific image
podman rmi $(podman images -q)     # remove all images
podman image prune -a             # remove all unused images
To remove images, you first need to stop and remove any containers using those images:
docker rm $(docker ps -aq)         # remove all containers
podman rm $(podman ps -aq)         # remove all containers
