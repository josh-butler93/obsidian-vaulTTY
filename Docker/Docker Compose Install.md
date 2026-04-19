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


