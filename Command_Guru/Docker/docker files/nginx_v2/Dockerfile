FROM nginx
RUN apt-get update && apt-get install -y nano
COPY index.html /usr/share/nginx/html/

# docker build -t my-nginx-nano .
# docker run -d --name nano-container my-nginx-nano
# docker exec nano-container nano --version
# docker exec: This runs a command in a running container
# nano-container: This is the name of our container
# nano --version: This prints the installed nano version from inside the container

# modify your Docker image to include additional software
# We'll add the nano text editor as an example because it is not included in the base nginx image
# This Dockerfile adds a new RUN instruction that updates the package index and installs the nano package by using the apt-get package manager

#------------Breakdown--------------#
# RUN apt-get update && apt-get install -y nano: This line updates the package list (apt-get update) and then installs nano (apt-get install -y nano)
# The -y flag automatically answers "yes" to any prompts during installation