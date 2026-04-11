=========
NPM Setup 
=========
podman run -it --name devbox -p 5173:5173 -p 3000:3000 node:20 bash
podman run --rm -it --name devbox -p 5173:5173 -p 3000:3000 node:20 bash
*podman run -it --name devbox -p 2222:22 -p 5173:5173 -p 3000:3000 node:20 bash
  the above allows for ssh login 

apt update && apt install -y nodejs npm
or 
apt update && apt install -y curl && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt install -y nodejs
node -v 
npm -v 

#NPM 
  npm create vite@latest
    cd project-name
      npm install
        npm run dev 
          npm run dev -- --host 0.0.0.0
            ip a
              http://*.*.*.*:5173

#NPX 
podman run -it --name devbox -p 5173:5173 -p 3000:3000 node:20 bash
npx -v # naviagte to the folder where the code is 
  echo "<h1>Hello World</h1>" > index.html 
    npx serve .
    # npx serve . -l 3001 -> choose the port you want to run it on 
        npx serve . --listen 0.0.0.0:3000
          http://*.*.*.*:3000
            podman start devbox # to start the container if needed
              podman attach devbox 

You're using mise to manage Node.js. In your nginx container, you'll need to install it directly.
For a Debian/Ubuntu-based container:
- Command:
  - apt update && apt install -y nodejs npm
- Or 
  - install a newer version:
    - Command:


      - curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
      - apt install -y nodejs
- Verify:
  - Command:
    - node -v
    - npm -v
    - npx -v 
      - NPX Setup 
        - Command:
          - naviagte to the directory you where the code is located at and run the below Command 
            - npx serve .
              - podman run -p 3000:3000 
      - Then you can run your Vite/webpack dev server inside the container

      curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt install -y nodejs

---
**Once Node.js + npm are working, the steps are:**
1. Create or enter your project directory
2. Initialize and install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
---
If you have an existing project (like with Vite), just run:
cd /path/to/your/project
npm install
npm run dev

====
npx Setup
====
FROM ubuntu:22.04

RUN apt update && apt install -y curl \
 && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
 && apt install -y nodejs

WORKDIR /app

podman build -t node-dev .

mkdir test && cd test
echo "<h1>Hello</h1>" > index.html
npx serve .

http://localhost:3000
