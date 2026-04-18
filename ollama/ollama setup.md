- curl -fsSL https://ollama.com/install.sh | sh- 
- ollama serve
- sudo ss -tulpn | grep 11434
- ollama run phi
  - if it error stop the service 
    - *sudo systemctl stop ollama
    - sudo ss -tulpm | grep 11434 - there sould be nothing running 
  - run the serve command again there should be a bunch of output leave that running
  - open another terminal session and run the below command
    - *ollama run phi -> if it installs correctly you should see below prompt
- What you should see
model downloads (first time only)
then a prompt like:
>>> 

Type something like:

explain podman in simple terms
