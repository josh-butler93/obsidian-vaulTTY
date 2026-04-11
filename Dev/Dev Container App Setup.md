From your project folder on your host machine:

Command: mkdir my-node-env && cd my-node-env

Create the file:

Command: nvim Containerfile

Paste:

FROM ubuntu:22.04
RUN apt update && apt install -y curl && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt install -y nodejs
WORKDIR /app

Save it.

Then build the image:
Command: podman build -t my-node-image .

Now you have your own image called:

my-node-image

Command: podman run -it --rm -p 3000:3000 -v $(pwd):/app my-node-image bash
