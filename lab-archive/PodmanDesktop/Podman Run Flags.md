# Podman Run Flags Quick Reference

## The Three Main Patterns

| Flag | What it does | Container stays running after exit? | Can exec later? |
|------|--------------|-------------------------------------|-----------------|
| `-d` | Detached (background) | ✓ | ✓ |
| `-it` | Interactive terminal | ✗ (stops) | ✓ (after `start`) |
| `-dit` | Detached but ready for exec | ✓ | ✓ |

---

## Detailed Breakdown

### `-d` (Detached)
```bash
podman run -d --name web nginx
```
- Container starts in background
- No terminal attached to you
- Container keeps running
- You can exec into it anytime:
  ```bash
  podman exec -it web sh
  ```

### `-it` (Interactive + Terminal)
```bash
podman run -it --name test alpine sh
```
- Container starts, you're dropped into a shell
- When you type `exit`, container **stops**
- To restart and exec later:
  ```bash
  podman start test
  podman exec -it test sh
  ```
- Tip: Press `Ctrl+P, Ctrl+Q` to "detach" without stopping

### `-dit` (Detached + Interactive)
```bash
podman run -dit --name practice alpine
```
- Same as `-d` - container runs in background
- `-it` here means "future exec commands will be interactive"
- Most common pattern for "start and forget" containers

---

## Pro Tips

### Running vs Stopped vs Paused
| State | `run` again? | `start`? | `exec`? |
|-------|--------------|----------|---------|
| Running | ✗ (name conflict) | ✗ | ✓ |
| Stopped | ✗ | ✓ | ✓ (after start) |
| Paused | ✗ | ✗ | ✓ |

### Quick Decision Guide

```
Need shell RIGHT NOW?
├── Yes → -it (you stay in terminal)
└── No (start and leave)
    ├── Will need shell LATER?
    │   ├── Yes → -d
    │   └── No → -d
    └── Not sure → -d (you can always exec later)
```

### The Magic Keys
```
Ctrl+P, Ctrl+Q  → Detach from -it without stopping container
Ctrl+C          → Force stop (if running foreground)
```

---

## Common One-Liners

```bash
# Start and immediately exec (no persist)
podman run -it --rm alpine sh
# --rm = remove container when you exit

# Start in background, named, port exposed
podman run -d --name web -p 8080:80 nginx

# Start for one-off command, auto-cleanup
podman run --rm alpine echo "hello"

# Start with volume mounted
podman run -dit -v $(pwd):/data --name dev alpine
```

---

## When to Use Each Flag (The Mindset)

### `-d` — "Start and Forget"
Use when:
- Running services (web servers, databases, APIs)
- Anything that needs to keep running continuously
- You need to exec in periodically to check/monitor
- The container is a backend process

Example:
```bash
podman run -d --name postgres -e POSTGRES_PASSWORD=secret postgres
podman run -d --name nginx -p 8080:80 nginx
podman run -d --name redis redis
```

### `-it` — "Quick Task, Done When I'm Done"
Use when:
- Testing a tool or exploring an image
- One-time setup or troubleshooting
- Teaching/demos where you want to show what happens inside
- You don't care if the container persists afterward

Example:
```bash
# Check what's in an image
podman run -it --rm alpine sh

# Test a command
podman run -it --rm ubuntu apt update

# Teaching - show students around
podman run -it --rm nginx sh
```

### `-dit` — "Start for Later, But Maybe Exec Now"
Use when:
- Prepping containers you'll need throughout your workday
- Creating a persistent workspace
- Development environments you want running
- You're not sure yet if you'll need to exec

Example:
```bash
# Set up a practice environment
podman run -dit --name practice alpine

# Dev workspace
podman run -dit -v $(pwd):/app --name dev node:alpine

# Lab container
podman run -dit --name lab postgres
```

---

## Real-World Workflow Comparison

```bash
# DATABASE - Use -d (runs all day, exec when needed)
podman run -d --name postgres -e POSTGRES_PASSWORD=secret postgres
podman exec -it postgres psql -U postgres  # Hop in when needed
# Container keeps running, you can exec 10 times today

# QUICK CHECK - Use -it --rm (one glance, done)
podman run -it --rm alpine cat /etc/os-release
# You got your answer, container cleaned up automatically

# DEV WORKSPACE - Use -dit (prep once, use all day)
podman run -dit -v ~/project:/app --name dev alpine
podman exec -it dev sh  # First time: set things up
# Later: podman exec -it dev sh  # Just hop in when ready
```

---

## Quick Reference Summary

| Scenario | Flag | Why |
|----------|------|-----|
| Web server | `-d` | Needs to keep running |
| Database | `-d` | Long-running service |
| Quick test | `-it --rm` | One-off, auto-cleanup |
| Exploring an image | `-it` | Just looking around |
| Dev workspace | `-dit` | Persistent, you'll return |
| One-time script | `-it --rm` | Run and done |
| Monitoring tool | `-d` | Background process |
| Teaching | `-it` | Show and explain |
