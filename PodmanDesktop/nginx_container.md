Pulling an image
  - Command: 
      - podman pull nginx
      - podman pull docker.io/library/nginx:latest
          - Podman on Linux doesn’t automatically search Docker Hub like Docker CLI does.
          - You need either:
          - Use the full image name with registry
          - e.g., docker.io/library/nginx:latest
          - Configure Podman to allow searching Docker Hub with short names
    - Command:
        - podman images 
          -- The above command verifies image was pulled

  - Command: 
      - podman run -d --name webserver -p 8080:80 nginx
  
- Command--syntax
    
    - podman run [options] IMAGE [command]
        
        -d → detached mode (runs in background)
            --Without -d: Your terminal is “attached” to the container
            --Logs and output appear in your terminal. Press Ctrl+C → stops the container.
            --With -d: Container runs in the background, your terminal is free
            --Logs can be checked later with
        
        --name webserver → gives your container a name
        
        -p 8080:80 → maps host port 8080 to container port 80
 
- Command:
    - http://localhost:8080

- Command:
    - podman logs webserver
Container Management

  Command: podman ps        # list running containers

  Command: podman logs webserver   # see output logs

  Command: podman stop webserver   # stop container

  Command: podman start webserver  # start again

  Command: podman rm webserver     # remove container

###################################
Why start with Nginx?

  Lightweight, fast, and instantly gives you something to interact with.

    - Introduces key Podman concepts:
    - Images (podman pull)
    - Containers (podman run)
    - Ports (-p 8080:80)
    - Background vs foreground (-d)
Why add a database container?
Right now, Nginx is just a web server serving static content.
Adding a database (e.g., PostgreSQL or MySQL) lets you store and manage data.

Example scenario:

Nginx → serves a web app
Database → stores user info, blog posts, or any dynamic data
Later, you could add a dynamic app container (like Python Flask, Node.js, or PHP) that talks to the database and is served by Nginx.

Effectively, you start building a multi-container environment:

[Web Browser] --> [Nginx] --> [App Container] --> [Database Container]
