# Docker/Podman Daily Practice Guide
## 12-Week Journey from Beginner to DevOps Foundation

---

## Quick Reference: Essential Commands

```bash
# Container Lifecycle
podman run        # Create and start container
podman ps -a      # List all containers
podman exec -it   # Execute command in running container
podman start      # Start stopped container
podman stop       # Stop running container
podman rm         # Remove container
podman logs       # View container logs

# Image Management
podman images     # List local images
podman pull       # Download image
podman rmi        # Remove image
podman build      # Build from Dockerfile

# Advanced
podman network    # Manage networks
podman volume     # Manage volumes
podman compose    # Multi-container orchestration
```

---

## Week 1: Container Lifecycle Basics

### Goal: Master the run/exec/rm cycle

### Daily Exercise (Days 1-7)

```bash
# Day 1-2: nginx basics
podman pull nginx
podman run -dit --name practice nginx
podman ps
podman exec -it practice sh
# Inside container:
ls -la /usr/share/nginx/html/
cat /etc/nginx/nginx.conf
ps aux
whoami
exit

# Day 3-4: Ubuntu container
podman run -dit --name ubuntu-practice ubuntu
podman exec -it ubuntu-practice bash
# Inside:
apt update && apt install -y curl vim
curl --version
which curl
exit

# Day 5-7: Alpine (minimal)
podman run -dit --name alpine-practice alpine
podman exec -it alpine-practice sh
# Inside:
apk add curl
curl -I https://example.com
exit
```

### Commands to Master
- [ ] `podman run -d` (detached)
- [ ] `podman run -it` (interactive)
- [ ] `podman exec` to enter running container
- [ ] `podman stop` / `podman start`
- [ ] `podman rm` (with and without -f)

---

## Week 2: Port Mapping & Networking

### Goal: Access containers and understand networking

### Daily Exercise

```bash
# Day 1-2: Port mapping
podman run -d --name web -p 8080:80 nginx
curl localhost:8080
podman port web

# Day 3-4: Multiple ports
podman run -d --name app -p 3000:3000 -p 9229:9229 node:alpine
podman logs app

# Day 5: Inspect networking
podman inspect web | grep -A 20 Networks
podman network ls
podman network inspect podman

# Day 6-7: Custom networks
podman network create mynet
podman run -d --name db --network mynet postgres
podman run -dit --name app --network mynet alpine
podman exec app ping -c 2 db
```

### Commands to Master
- [ ] `-p HOST:CONTAINER` port mapping
- [ ] `podman port` to see mappings
- [ ] `podman network create`
- [ ] Container-to-container communication

---

## Week 3: Volumes & Data Persistence

### Goal: Store data outside containers

### Daily Exercise

```bash
# Day 1-2: Bind mounts (host directory)
mkdir -p ~/container-data
podman run -d --name webdata -v ~/container-data:/usr/share/nginx/html nginx
echo "<h1>Hello from host</h1>" > ~/container-data/index.html
curl localhost:8080  # Should show your content

# Day 3-4: Named volumes
podman volume create mydata
podman run -dit --name data-test -v mydata:/data alpine
podman exec data-test sh -c "echo 'persistent data' > /data/file.txt"
podman rm -f data-test
podman run -dit --name data-test2 -v mydata:/data alpine
podman exec data-test2 cat /data/file.txt  # Data preserved!

# Day 5-6: Database with volume
podman run -d --name postgresdb -v pgdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=secret postgres
podman exec -it postgresdb psql -U postgres
# SQL: CREATE DATABASE testdb; \l; \q

# Day 7: Backup and restore
podman run --rm -v mydata:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz /data
```

### Commands to Master
- [ ] `-v HOST_PATH:CONTAINER_PATH` (bind mount)
- [ ] `podman volume create`
- [ ] `podman volume ls`
- [ ] Data backup/restore with tar

---

## Week 4: Building Custom Images

### Goal: Create your own container images

### Daily Exercise

```bash
# Day 1-2: Simple Dockerfile
mkdir ~/myimage && cd ~/myimage
cat > Dockerfile << 'EOF'
FROM alpine:latest
RUN apk add --no-cache curl vim
WORKDIR /app
COPY . .
CMD ["sh"]
EOF

podman build -t myalpine:v1 .
podman run -it myalpine:v1

# Day 3-4: Web app Dockerfile
mkdir ~/webapp && cd ~/webapp
cat > Dockerfile << 'EOF'
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
EOF

# Day 5-6: Multi-stage build
cat > Dockerfile << 'EOF'
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

# Day 7: Best practices
# - Use specific tags, not 'latest'
# - Layer ordering for cache efficiency
# - Use .dockerignore
# - Minimize image size with alpine
```

### Dockerfile Keywords to Master
- [ ] `FROM` - base image
- [ ] `RUN` - execute commands
- [ ] `COPY` / `ADD` - files
- [ ] `WORKDIR` - set directory
- [ ] `EXPOSE` - documentation
- [ ] `CMD` / `ENTRYPOINT` - startup command
- [ ] `ENV` - environment variables

---

## Week 5: Environment Variables & Configuration

### Goal: Configure containers dynamically

### Daily Exercise

```bash
# Day 1-2: -e flag
podman run -e MY_VAR=hello --name envtest alpine echo $MY_VAR
podman run -d --name db -e POSTGRES_USER=admin -e POSTGRES_DB=mydb postgres
podman exec db env | grep POSTGRES

# Day 3-4: .env file
cat > .env << 'EOF'
DB_PASSWORD=secret123
API_KEY=abc123
DEBUG=true
EOF

podman run --env-file .env --name configtest alpine env | grep -E "DB_|API_|DEBUG"

# Day 5-6: Docker secrets (swarm mode)
echo "mysecretpassword" | podman secret create db_pass -
podman secret ls

# Day 7: Configmap patterns
# Practice passing configs as volumes
mkdir ~/nginx-conf
cat > ~/nginx-conf/default.conf << 'EOF'
server {
    listen 80;
    server_name localhost;
    location / {
        return 200 'Custom config!';
    }
}
EOF
podman run -v ~/nginx-conf/default.conf:/etc/nginx/conf.d/default.conf nginx
```

### Commands to Master
- [ ] `-e` for single env var
- [ ] `--env-file` for multiple vars
- [ ] `podman exec env` to inspect
- [ ] Config files via volumes

---

## Week 6: Logs, Inspection & Troubleshooting

### Goal: Debug and monitor containers

### Daily Exercise

```bash
# Day 1-2: Basic logging
podman run -d --name webserver nginx
podman logs webserver
podman logs -f webserver  # Follow logs
curl localhost:8080
podman logs --tail 20 webserver

# Day 3-4: Inspection
podman inspect webserver
podman inspect --format '{{.NetworkSettings.IPAddress}}' webserver
podman inspect --format '{{.Config.Image}}' webserver

# Day 5-6: Resource usage
podman stats webserver  # Live stats
podman top webserver    # Processes inside

# Day 7: Common issues
# Container won't start?
podman logs container
podman inspect container

# Can't connect?
podman ps  # Is it running?
podman port container

# Performance issues?
podman stats --no-stream
```

### Troubleshooting Commands
```bash
podman logs [-f] [--tail] container
podman inspect container
podman stats [--no-stream]
podman top container
podman exec -it container sh  # Investigate inside
```

---

## Week 7: Docker Compose Basics

### Goal: Orchestrate multi-container apps

### Daily Exercise

```bash
# Day 1-2: Install compose
# podman compose or docker-compose

# Day 3-4: First compose file
mkdir ~/compose-test && cd ~/compose-test
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
EOF

podman compose up -d
podman compose ps
podman compose logs web
podman compose down

# Day 5-6: Web app with database
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - DB_PASSWORD=secret
    depends_on:
      - db
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
EOF

# Day 7: Scale services
podman compose up -d --scale app=3
podman compose down
```

### Compose Commands to Master
```bash
podman compose up -d      # Start
podman compose down      # Stop and remove
podman compose ps        # Status
podman compose logs -f   # Follow logs
podman compose exec      # Run command in service
podman compose restart   # Restart services
podman compose build     # Rebuild images
```

---

## Week 8: Docker Compose Advanced

### Goal: Production-ready compose setups

### Daily Exercise

```bash
# Day 1-2: Networks in compose
services:
  frontend:
    networks:
      - webnet
  backend:
    networks:
      - webnet
      - dbnet
  db:
    networks:
      - dbnet

networks:
  webnet:
  dbnet:

# Day 3-4: Healthchecks
services:
  web:
    image: nginx
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3

# Day 5-6: Environment files
.env
.env.production
docker-compose.yml
docker-compose.override.yml  # Local overrides (gitignored)

# Day 7: Complete stack
# Create a LAMP/LEMP stack
# - nginx reverse proxy
# - php-fpm or node app
# - mysql/mariadb
# - phpmyadmin (optional)
```

### Advanced Compose Features
- [ ] Multiple networks (micro-segmentation)
- [ ] Health checks
- [ ] Resource limits
- [ ] Environment files
- [ ] Override files for dev/prod

---

## Week 9: Security & Production Hardening

### Goal: Secure container deployments

### Daily Exercise

```bash
# Day 1-2: Non-root users
# In Dockerfile:
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Day 3-4: Read-only containers
podman run --read-only --name secured alpine sh

# Day 5-6: Resource limits
podman run -d \
  --name limited \
  --memory="512m" \
  --cpus="0.5" \
  nginx

# Day 7: Security scanning
# podman images --format '{{.Name}}:{{.Tag}}'
# Use: trivy image nginx:latest
```

### Security Checklist
```yaml
# Add to docker-compose.yml
security_opt:
  - no-new-privileges:true
read_only: true
tmpfs:
  - /tmp
resources:
  limits:
    memory: 512M
    cpus: 0.5
user: "1000:1000"
```

---

## Week 10-11: CI/CD Integration

### Goal: Integrate containers into workflows

### Daily Exercise

```bash
# Day 1-3: GitHub Actions
cat > .github/workflows/docker.yml << 'EOF'
name: Docker Build

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build image
        run: podman build -t myapp .
      - name: Run tests
        run: podman run myapp ./test.sh
EOF

# Day 4-5: Multi-stage builds for smaller images
# Day 6-7: Push to registry
podman tag myapp:latest localhost:5000/myapp:latest
podman push localhost:5000/myapp:latest
```

---

## Week 12+: Real-World Projects

### Project Ideas

| Project | Skills Applied |
|---------|----------------|
| Personal blog (WordPress/ghost) | Volumes, compose, networking |
| Pi-hole DNS server | Single service, persistence |
| Home media server (Jellyfin) | GPUs, volumes, networking |
| Git server (Gitea) | Database, volumes, reverse proxy |
| Portfolio site (nginx + letsencrypt) | SSL, automation |
| CI runner | Daemon mode, system services |
| Monitoring stack (Prometheus + Grafana) | Multi-container, networking |

---

## Daily Practice Template

```bash
#!/bin/bash
# docker-daily-practice.sh
# Run this every morning (10-15 minutes)

echo "=== Docker Daily Practice ==="
echo ""

# 1. List current containers
echo "Active containers:"
podman ps -a

# 2. Clean up old containers
echo ""
echo "Cleaning stopped containers..."
podman container prune -f

# 3. Pull latest images
echo ""
echo "Updating base images..."
podman pull alpine:latest
podman pull nginx:latest
podman pull ubuntu:latest

# 4. Quick test
echo ""
echo "Running quick test..."
podman run --rm alpine echo "Container runtime works!"

# 5. Check resource usage
echo ""
echo "Resource usage:"
podman stats --no-stream

echo ""
echo "=== Practice complete! ==="
```

---

## Cheat Sheet: Day-to-Day Commands

```bash
# Quick start a service
podman run -d --name SERVICE -p PORT:PORT IMAGE

# Shell into running container
podman exec -it CONTAINER sh

# View logs
podman logs -f CONTAINER

# Stop and remove
podman rm -f CONTAINER

# Clean everything
podman system prune -a -f

# Inspect image
podman inspect IMAGE | less

# Copy file from container
podman cp CONTAINER:/path/file.txt ./

# Copy file to container
podman cp ./file.txt CONTAINER:/path/

# Restart container
podman restart CONTAINER

# Pause/unpause
podman pause CONTAINER
podman unpause CONTAINER
```

---

## Learning Resources

- [Official Docs](https://docs.docker.com/)
- [Play with Docker](https://play.docker.com/)
- [Docker Labs](https://github.com/docker/labs)
- [Container Skills](https://container.training/)

---

*Practice 15-30 minutes daily. Consistency beats intensity.*
