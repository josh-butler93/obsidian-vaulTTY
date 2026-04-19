- curl -fsSL https://ollama.com/install.sh | sh 
- ollama serve
- sudo ss -tulpn | grep 11434
- ollama run phi
  - if it error stop the service 
    - *sudo systemctl stop ollama
    - sudo ss -tulpm | grep 11434 - there sould be nothing running 
  - run the serve command again there should be a bunch of output leave that running
  - open another terminal session and run the below command
    - *ollama run phi -> if it installs correctly you should see below prompt
What you should see
 - model downloads (first time only)
 - then a prompt like:

>>> 
- Type something like:
  - explain podman in simple terms
- In the ~/.zshrc or ~/.bashrc
  - alias phi="ollama run phi"
  - source ~/.zshrc 
- Or just run the 'ollama run phi' command manually everytime

#Container setup 
- *sudo systemctl enable --now ollama
- *sudo systemctl start ollama
- *sudo systemctl status ollama
- *curl http://localhost:11434/api/tags
  - {"models":[{"name":"phi"}]}
- Container setup

podman run -d \
  --name open-webui \
  --network=host \
  -e OLLAMA_BASE_URL=http://127.0.0.1:11434 \
  ghcr.io/open-webui/open-webui:latest

sudo firewall-cmd --add-port=8080/tcp --permanent
sudo firewall-cmd --reload
sudo firewall-cmd --list-ports
http://<vm-ip>:8080

podman run -d \
  --name open-webui \
  -p 3000:8080 \
  -e OLLAMA_BASE_URL=http://localhost:11434 \
  ghcr.io/open-webui/open-webui:latest

What this does
- runs web UI in container
- exposes it on port 3000
- connects it to your local Ollama API
- stays running in background
