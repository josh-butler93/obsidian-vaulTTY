I installed docker first and then built it out as a container

mkdir -p ~/portainer
cd ~/portainer

nano docker-compose.yml

version: "3.8"

services:
  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    restart: always
    ports:
      - "8000:8000"
      - "9443:9443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - portainer_data:/data

volumes:
  portainer_data:

docker compose up -d

sudo firewall-cmd --add-port=9443/tcp --permanent
sudo firewall-cmd --add-port=8000/tcp --permanent
sudo firewall-cmd --reload

https://server_ip:9443
