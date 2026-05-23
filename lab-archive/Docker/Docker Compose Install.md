link: to docker && docker desktop https://docs.docker.com/compose/
https://docs.docker.com/reference/compose-file/

docker hub link below:
link: https://hub.docker.com/?uuid=D2F757CA-A9CE-497B-8E2C-1C63CB72D523

sudo apt install -y docker.io

sudo apt install -y docker-compose-plugin

sudo systemctl enable docker
sudo systemctl start docker

sudo usermod -aG docker $USER

newgrp docker

docker compose version

nano docker-compose.yml

version: "3.8"
services:
  hello:
    image: hello-world

docker compose up
monitoring-stack.yml
docker compose -f monitoring-stack.yml up -d
docker compose watch --> run this command to watch the docker compose stack while its running
docker compose down

rm docker-compose.yml

###Commands

docker compose up -d   # start services
docker compose down    # stop services
docker compose pull    # update images

##Container SEtup 
mkdir -p ~/docker/monitoring
cd ~/docker/monitoring
👉 Every stack gets its own folder + compose file
This is how people avoid chaos later

##Publishing an Image
*docker pull <<image_name>> || docker run -d -p 8088:80 --name welcome-to-docker docker/welcome-to-docker
---Renaming the image
	*docker tag docker/welcome-to-docker YOUR_USERNAME/welcome-to-docker

	
