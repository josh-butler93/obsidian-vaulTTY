sudo apt install -y docker.io 
sudo systemctl enable docker 
sudo systemctl start docker
sudo systemctl status docker 
sudo groupadd docker 
sudo usermod -aG docker $USER 
sudo newgrp docker 
docker ps -a 
or 
docker run hello-world

sudo apt install docker-compose-v2
docker compose version
or 
docker compose up #see if it gives you a response
