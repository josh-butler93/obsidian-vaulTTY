=========
NPM Setup 
=========
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
